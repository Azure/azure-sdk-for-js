// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AbortController, AbortError } from "@azure/abort-controller";
import FormData from "form-data";

import { HttpClient } from "./httpClient";
import { TransferProgressEvent, WebResourceLike } from "./webResource";
import { HttpOperationResponse } from "./httpOperationResponse";
import { HttpHeaders, HttpHeadersLike } from "./httpHeaders";
import { RestError } from "./restError";
import { Readable, Transform } from "stream";
import { logger } from "./log";

interface FetchError extends Error {
  code?: string;
  errno?: string;
  type?: string;
}

/**
 * String URLs.
 */
export type CommonRequestInfo = string; // We only ever call fetch() on string urls.

/**
 * An object containing information about the outgoing HTTP request.
 */
export type CommonRequestInit = Omit<RequestInit, "body" | "headers" | "signal"> & {
  body?: any;
  headers?: any;
  signal?: any;
};

/**
 * An object containing information about the incoming HTTP response.
 */
export type CommonResponse = Omit<Response, "body" | "trailer" | "formData"> & {
  body: any;
  trailer: any;
  formData: any;
};

export class ReportTransform extends Transform {
  private loadedBytes: number = 0;
  _transform(chunk: string | Buffer, _encoding: string, callback: (arg: any) => void): void {
    this.push(chunk);
    this.loadedBytes += chunk.length;
    this.progressCallback!({ loadedBytes: this.loadedBytes });
    callback(undefined);
  }

  constructor(private progressCallback: (progress: TransferProgressEvent) => void) {
    super();
  }
}

/**
 * An abstract HTTP client that allows custom methods to prepare and send HTTP requests, as well as a custom method to parse the HTTP response.
 * It implements a simple `sendRequest` method that provides minimum viable error handling, and the logic that executes the abstract methods.
 */
export abstract class FetchHttpClient implements HttpClient {
  /**
   * Provides minimum viable error handling, and the logic that executes the abstract methods.
   * @param httpRequest 
   * @returns 
   */
  async sendRequest(httpRequest: WebResourceLike): Promise<HttpOperationResponse> {
    if (!httpRequest && typeof httpRequest !== "object") {
      throw new Error(
        "'httpRequest' (WebResourceLike) cannot be null or undefined and must be of type object."
      );
    }

    const abortController = new AbortController();
    let abortListener: ((event: any) => void) | undefined;
    if (httpRequest.abortSignal) {
      if (httpRequest.abortSignal.aborted) {
        throw new AbortError("The operation was aborted.");
      }

      abortListener = (event: Event) => {
        if (event.type === "abort") {
          abortController.abort();
        }
      };
      httpRequest.abortSignal.addEventListener("abort", abortListener);
    }

    if (httpRequest.timeout) {
      setTimeout(() => {
        abortController.abort();
      }, httpRequest.timeout);
    }

    if (httpRequest.formData) {
      const formData: any = httpRequest.formData;
      const requestForm = new FormData();
      const appendFormValue = (key: string, value: any): void => {
        // value function probably returns a stream so we can provide a fresh stream on each retry
        if (typeof value === "function") {
          value = value();
        }
        if (
          value &&
          Object.prototype.hasOwnProperty.call(value, "value") &&
          Object.prototype.hasOwnProperty.call(value, "options")
        ) {
          requestForm.append(key, value.value, value.options);
        } else {
          requestForm.append(key, value);
        }
      };
      for (const formKey of Object.keys(formData)) {
        const formValue = formData[formKey];
        if (Array.isArray(formValue)) {
          for (let j = 0; j < formValue.length; j++) {
            appendFormValue(formKey, formValue[j]);
          }
        } else {
          appendFormValue(formKey, formValue);
        }
      }

      httpRequest.body = requestForm;
      httpRequest.formData = undefined;
      const contentType = httpRequest.headers.get("Content-Type");
      if (contentType && contentType.indexOf("multipart/form-data") !== -1) {
        if (typeof requestForm.getBoundary === "function") {
          httpRequest.headers.set(
            "Content-Type",
            `multipart/form-data; boundary=${requestForm.getBoundary()}`
          );
        } else {
          // browser will automatically apply a suitable content-type header
          httpRequest.headers.remove("Content-Type");
        }
      }
    }

    let body = httpRequest.body
      ? typeof httpRequest.body === "function"
        ? httpRequest.body()
        : httpRequest.body
      : undefined;
    if (httpRequest.onUploadProgress && httpRequest.body) {
      const onUploadProgress = httpRequest.onUploadProgress;
      const uploadReportStream = new ReportTransform(onUploadProgress);
      if (isReadableStream(body)) {
        body.pipe(uploadReportStream);
      } else {
        uploadReportStream.end(body);
      }

      body = uploadReportStream;
    }

    const platformSpecificRequestInit: Partial<RequestInit> = await this.prepareRequest(
      httpRequest
    );

    const requestInit: RequestInit = {
      body: body,
      headers: httpRequest.headers.rawHeaders(),
      method: httpRequest.method,
      signal: abortController.signal,
      redirect: "manual",
      ...platformSpecificRequestInit
    };

    let operationResponse: HttpOperationResponse | undefined;
    try {
      const response: CommonResponse = await this.fetch(httpRequest.url, requestInit);

      const headers = parseHeaders(response.headers);

      const streaming =
        httpRequest.streamResponseStatusCodes?.has(response.status) ||
        httpRequest.streamResponseBody;

      operationResponse = {
        headers: headers,
        request: httpRequest,
        status: response.status,
        readableStreamBody: streaming
          ? ((response.body as unknown) as NodeJS.ReadableStream)
          : undefined,
        bodyAsText: !streaming ? await response.text() : undefined
      };

      const onDownloadProgress = httpRequest.onDownloadProgress;
      if (onDownloadProgress) {
        const responseBody: ReadableStream<Uint8Array> | undefined = response.body || undefined;

        if (isReadableStream(responseBody)) {
          const downloadReportStream = new ReportTransform(onDownloadProgress);
          responseBody.pipe(downloadReportStream);
          operationResponse.readableStreamBody = downloadReportStream;
        } else {
          const length = parseInt(headers.get("Content-Length")!) || undefined;
          if (length) {
            // Calling callback for non-stream response for consistency with browser
            onDownloadProgress({ loadedBytes: length });
          }
        }
      }

      await this.processRequest(operationResponse);

      return operationResponse;
    } catch (error) {
      const fetchError: FetchError = error;
      if (fetchError.code === "ENOTFOUND") {
        throw new RestError(
          fetchError.message,
          RestError.REQUEST_SEND_ERROR,
          undefined,
          httpRequest
        );
      } else if (fetchError.type === "aborted") {
        throw new AbortError("The operation was aborted.");
      }

      throw fetchError;
    } finally {
      // clean up event listener
      if (httpRequest.abortSignal && abortListener) {
        let uploadStreamDone = Promise.resolve();
        if (isReadableStream(body)) {
          uploadStreamDone = isStreamComplete(body);
        }
        let downloadStreamDone = Promise.resolve();
        if (isReadableStream(operationResponse?.readableStreamBody)) {
          downloadStreamDone = isStreamComplete(
            operationResponse!.readableStreamBody,
            abortController
          );
        }

        Promise.all([uploadStreamDone, downloadStreamDone])
          .then(() => {
            httpRequest.abortSignal?.removeEventListener("abort", abortListener!);
            return;
          })
          .catch((e) => {
            logger.warning("Error when cleaning up abortListener on httpRequest", e);
          });
      }
    }
  }

  /**
   * Abstract method that allows preparing an outgoing HTTP request.
   * @param httpRequest - Object representing the outgoing HTTP request.
   */
  abstract prepareRequest(httpRequest: WebResourceLike): Promise<Partial<RequestInit>>;
  /**
   * Abstract method that allows processing an incoming HTTP response.
   * @param operationResponse - HTTP response.
   */
  abstract processRequest(operationResponse: HttpOperationResponse): Promise<void>;
  /**
   * Abstract method that defines how to send an HTTP request.
   * @param input - String URL of the target HTTP server.
   * @param init - Object describing the structure of the outgoing HTTP request.
   */
  abstract fetch(input: CommonRequestInfo, init?: CommonRequestInit): Promise<CommonResponse>;
}

function isReadableStream(body: any): body is Readable {
  return body && typeof body.pipe === "function";
}

function isStreamComplete(stream: Readable, aborter?: AbortController): Promise<void> {
  return new Promise((resolve) => {
    stream.once("close", () => {
      aborter?.abort();
      resolve();
    });
    stream.once("end", resolve);
    stream.once("error", resolve);
  });
}

/**
 * Transforms a set of headers into the key/value pair defined by {@link HttpHeadersLike}
 */
export function parseHeaders(headers: Headers): HttpHeadersLike {
  const httpHeaders = new HttpHeaders();

  headers.forEach((value, key) => {
    httpHeaders.set(key, value);
  });

  return httpHeaders;
}

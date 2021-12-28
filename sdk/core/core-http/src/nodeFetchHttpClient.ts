// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import * as http from "http";
import * as https from "https";
import * as tough from "tough-cookie";
import { AbortController, AbortError } from "@azure/abort-controller";
import { HttpHeaders, HttpHeadersLike } from "./httpHeaders";
import { ProxyAgent, createProxyAgent, isUrlHttps } from "./proxyAgent";
import { Readable, Transform } from "stream";
import { TransferProgressEvent, WebResourceLike } from "./webResource";
import FormData from "form-data";
import { HttpClient } from "./httpClient";
import { HttpOperationResponse } from "./httpOperationResponse";
import { RestError } from "./restError";
import { logger } from "./log";
import node_fetch from "node-fetch";

interface AgentCache {
  httpAgent?: http.Agent;
  httpsAgent?: https.Agent;
}

function getCachedAgent(
  isHttps: boolean,
  agentCache: AgentCache
): http.Agent | https.Agent | undefined {
  return isHttps ? agentCache.httpsAgent : agentCache.httpAgent;
}

interface FetchError extends Error {
  code?: string;
  errno?: string;
  type?: string;
}

/**
 * String URLs used when calling to `fetch()`.
 */
export type CommonRequestInfo = string;

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

/**
 * An HTTP client that uses `node-fetch`.
 */
export class NodeFetchHttpClient implements HttpClient {
  /**
   * Provides minimum viable error handling and the logic that executes the abstract methods.
   * @param httpRequest - Object representing the outgoing HTTP request.
   * @returns An object representing the incoming HTTP response.
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
      ...platformSpecificRequestInit,
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
          ? (response.body as unknown as NodeJS.ReadableStream)
          : undefined,
        bodyAsText: !streaming ? await response.text() : undefined,
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

  // a mapping of proxy settings string `${host}:${port}:${username}:${password}` to agent
  private proxyAgentMap: Map<string, AgentCache> = new Map();
  private keepAliveAgents: AgentCache = {};

  private readonly cookieJar = new tough.CookieJar(undefined, { looseMode: true });

  private getOrCreateAgent(httpRequest: WebResourceLike): http.Agent | https.Agent {
    const isHttps = isUrlHttps(httpRequest.url);

    // At the moment, proxy settings and keepAlive are mutually
    // exclusive because the 'tunnel' library currently lacks the
    // ability to create a proxy with keepAlive turned on.
    if (httpRequest.proxySettings) {
      const { host, port, username, password } = httpRequest.proxySettings;
      const key = `${host}:${port}:${username}:${password}`;
      const proxyAgents = this.proxyAgentMap.get(key) ?? {};

      let agent = getCachedAgent(isHttps, proxyAgents);
      if (agent) {
        return agent;
      }

      const tunnel: ProxyAgent = createProxyAgent(
        httpRequest.url,
        httpRequest.proxySettings,
        httpRequest.headers
      );

      agent = tunnel.agent;
      if (tunnel.isHttps) {
        proxyAgents.httpsAgent = tunnel.agent as https.Agent;
      } else {
        proxyAgents.httpAgent = tunnel.agent;
      }
      this.proxyAgentMap.set(key, proxyAgents);

      return agent;
    } else if (httpRequest.keepAlive) {
      let agent = getCachedAgent(isHttps, this.keepAliveAgents);
      if (agent) {
        return agent;
      }

      const agentOptions: http.AgentOptions | https.AgentOptions = {
        keepAlive: httpRequest.keepAlive,
      };

      if (isHttps) {
        agent = this.keepAliveAgents.httpsAgent = new https.Agent(agentOptions);
      } else {
        agent = this.keepAliveAgents.httpAgent = new http.Agent(agentOptions);
      }

      return agent;
    } else {
      return isHttps ? https.globalAgent : http.globalAgent;
    }
  }

  /**
   * Uses `node-fetch` to perform the request.
   */
  // eslint-disable-next-line @azure/azure-sdk/ts-apisurface-standardized-verbs
  async fetch(input: CommonRequestInfo, init?: CommonRequestInit): Promise<CommonResponse> {
    return node_fetch(input, init) as unknown as Promise<CommonResponse>;
  }

  /**
   * Prepares a request based on the provided web resource.
   */
  async prepareRequest(httpRequest: WebResourceLike): Promise<Partial<RequestInit>> {
    const requestInit: Partial<RequestInit & { agent?: any; compress?: boolean }> = {};

    if (this.cookieJar && !httpRequest.headers.get("Cookie")) {
      const cookieString = await new Promise<string>((resolve, reject) => {
        this.cookieJar!.getCookieString(httpRequest.url, (err, cookie) => {
          if (err) {
            reject(err);
          } else {
            resolve(cookie);
          }
        });
      });

      httpRequest.headers.set("Cookie", cookieString);
    }

    // Set the http(s) agent
    requestInit.agent = this.getOrCreateAgent(httpRequest);

    requestInit.compress = httpRequest.decompressResponse;

    return requestInit;
  }

  /**
   * Process an HTTP response. Handles persisting a cookie for subsequent requests if the response has a "Set-Cookie" header.
   */
  async processRequest(operationResponse: HttpOperationResponse): Promise<void> {
    if (this.cookieJar) {
      const setCookieHeader = operationResponse.headers.get("Set-Cookie");
      if (setCookieHeader !== undefined) {
        await new Promise<void>((resolve, reject) => {
          this.cookieJar!.setCookie(
            setCookieHeader,
            operationResponse.request.url,
            { ignoreError: true },
            (err) => {
              if (err) {
                reject(err);
              } else {
                resolve();
              }
            }
          );
        });
      }
    }
  }
}

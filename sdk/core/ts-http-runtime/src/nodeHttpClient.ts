// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import http from "node:http";
import https from "node:https";
import zlib from "node:zlib";
import type { Transform } from "node:stream";
import { AbortError } from "./abort-controller/AbortError.js";
import type {
  HttpClient,
  HttpHeaders,
  PipelineRequest,
  PipelineResponse,
  RequestBodyType,
  TlsSettings,
} from "./interfaces.js";
import { createHttpHeaders } from "./httpHeaders.js";
import { isRestError, RestError } from "./restError.js";
import type { IncomingMessage } from "node:http";
import { logger } from "./log.js";
import { isArrayBuffer } from "./util/nodeArrayBuffer.js";
import { Sanitizer } from "./util/sanitizer.js";
import {
  createExpectContinueRequest,
  isReadableStream,
  prepareExpectContinueHeaders,
  ReportTransform,
  type NodeRequestResult,
} from "./util/nodeExpectContinue.js";
import {
  effectiveHeaders,
  hasExpectContinueHeader,
  headerValues,
} from "./util/expectContinueHeaders.js";
import { destroyBodyStream, disposeBodyStream } from "./util/nodeBody.js";
import { setRequestCompletion } from "./util/requestCompletion.js";

const DEFAULT_TLS_SETTINGS = {};

function monitorStreamCompletion(stream: NodeJS.ReadableStream, onComplete: () => void): void {
  if (stream.readable === false) {
    onComplete();
    return;
  }

  const handler = (): void => {
    stream.removeListener("close", handler);
    stream.removeListener("end", handler);
    stream.removeListener("error", handler);
    onComplete();
  };

  stream.on("close", handler);
  stream.on("end", handler);
  stream.on("error", handler);
}

/**
 * A HttpClient implementation that uses Node's "https" module to send HTTPS requests.
 * @internal
 */
class NodeHttpClient implements HttpClient {
  private cachedHttpAgent?: http.Agent;
  private cachedHttpsAgents: WeakMap<TlsSettings, https.Agent> = new WeakMap();

  /**
   * Makes a request over an underlying transport layer and returns the response.
   * @param request - The request to be made.
   */
  public async sendRequest(request: PipelineRequest): Promise<PipelineResponse> {
    const abortController = new AbortController();
    let abortListener: ((event: any) => void) | undefined;
    const requestAbortSignal = request.abortSignal;
    if (requestAbortSignal) {
      if (requestAbortSignal.aborted) {
        throw new AbortError("The operation was aborted. Request has already been canceled.");
      }

      abortListener = (event: Event) => {
        if (event.type === "abort") {
          abortController.abort();
        }
      };
      requestAbortSignal.addEventListener("abort", abortListener);
    }

    let timeoutId: ReturnType<typeof setTimeout> | undefined;
    if (request.timeout > 0) {
      timeoutId = setTimeout(() => {
        const sanitizer = new Sanitizer();
        logger.info(`request to '${sanitizer.sanitizeUrl(request.url)}' timed out. canceling...`);
        abortController.abort();
      }, request.timeout);
    }

    let responseStream: NodeJS.ReadableStream | undefined;
    let responseAbortListener: (() => void) | undefined;
    let requestTracked = false;
    let responseTracked = false;
    let requestDone = false;
    let responseDone = false;
    let cleanedUp = false;
    const cleanup = (): void => {
      if (cleanedUp) return;
      cleanedUp = true;
      if (abortListener) requestAbortSignal?.removeEventListener("abort", abortListener);
      if (responseAbortListener) {
        abortController.signal.removeEventListener("abort", responseAbortListener);
      }
    };
    const cleanupIfComplete = (): void => {
      if (requestDone && responseDone) cleanup();
    };
    try {
      const result = await this.makeRequest(request, abortController);
      const res = result.response;
      requestTracked = true;
      requestDone = result.isRequestComplete();
      void result.requestComplete.then(() => {
        requestDone = true;
        cleanupIfComplete();
        return undefined;
      });

      const headers = getResponseHeaders(res);

      const status = res.statusCode ?? 0;
      const response: PipelineResponse = {
        status,
        headers,
        request,
      };
      if (!result.isRequestComplete()) {
        setRequestCompletion(response, result.requestComplete);
      }

      // Responses to HEAD must not have a body.
      // If they do return a body, that body must be ignored.
      const method =
        typeof request.requestOverrides?.method === "string"
          ? request.requestOverrides.method.toUpperCase()
          : request.method;
      if (method === "HEAD") {
        // call resume() and not destroy() to avoid closing the socket
        // and losing keep alive
        responseTracked = true;
        monitorStreamCompletion(res, () => {
          responseDone = true;
          cleanupIfComplete();
        });
        res.resume();
        return response;
      }

      const hasExpectHeader = hasExpectContinueHeader(request);
      const acceptEncoding = hasExpectHeader
        ? headerValues(effectiveHeaders(request), "accept-encoding").join(",")
        : request.headers.get("Accept-Encoding");
      const shouldDecompress =
        acceptEncoding?.includes("gzip") || acceptEncoding?.includes("deflate");
      responseStream = shouldDecompress ? getDecodedResponseStream(res, headers) : res;
      responseAbortListener = () => {
        if (responseStream && !responseDone) {
          destroyBodyStream(responseStream, new AbortError("The operation was aborted."));
        }
      };
      abortController.signal.addEventListener("abort", responseAbortListener);

      const onDownloadProgress = request.onDownloadProgress;
      if (onDownloadProgress) {
        const downloadReportStream = new ReportTransform(onDownloadProgress);
        downloadReportStream.on("error", (e) => {
          logger.error("Error in download progress", e);
        });
        pipeResponse(responseStream, downloadReportStream);
        responseStream = downloadReportStream;
      }
      responseTracked = true;
      monitorStreamCompletion(responseStream, () => {
        responseDone = true;
        cleanupIfComplete();
      });

      if (
        // Value of POSITIVE_INFINITY in streamResponseStatusCodes is considered as any status code
        request.streamResponseStatusCodes?.has(Number.POSITIVE_INFINITY) ||
        request.streamResponseStatusCodes?.has(response.status)
      ) {
        response.readableStreamBody = responseStream;
      } else {
        response.bodyAsText = await streamToText(responseStream);
      }

      return response;
    } finally {
      if (timeoutId !== undefined) {
        clearTimeout(timeoutId);
      }

      if (!requestTracked) requestDone = true;
      if (!responseTracked) responseDone = true;
      cleanupIfComplete();
    }
  }

  private makeRequest(
    request: PipelineRequest,
    abortController: AbortController,
  ): Promise<NodeRequestResult> {
    const url = new URL(request.url);

    const isInsecure = url.protocol !== "https:";

    if (isInsecure && !request.allowInsecureConnection) {
      throw new Error(`Cannot connect to ${request.url} while allowInsecureConnection is false.`);
    }

    const agent = (request.agent as http.Agent) ?? this.getOrCreateAgent(request, isInsecure);
    const requestBody = request.body;
    const bodyFromFactory = typeof requestBody === "function";
    const hasExpectHeader = hasExpectContinueHeader(request);
    const body = hasExpectHeader ? requestBody : bodyFromFactory ? requestBody() : requestBody;
    if (!hasExpectHeader && bodyFromFactory && abortController.signal.aborted) {
      if (isReadableStream(body)) disposeBodyStream(body);
      throw new AbortError(
        "The operation was aborted. Request body factory aborted before dispatch.",
      );
    }
    const bodyLength = typeof body === "function" ? null : getBodyLength(body ?? null);
    const headers = effectiveHeaders(request);
    if (
      bodyLength !== null &&
      (Boolean(body) || hasExpectHeader) &&
      headerValues(headers, "content-length").length === 0 &&
      headerValues(headers, "transfer-encoding").length === 0 &&
      !(request.requestOverrides && "headers" in request.requestOverrides)
    ) {
      request.headers.set("Content-Length", bodyLength);
    }
    const options: http.RequestOptions = {
      agent,
      hostname: url.hostname,
      path: `${url.pathname}${url.search}`,
      port: url.port,
      method: request.method,
      headers: request.headers.toJSON({ preserveCase: true }),
      ...request.requestOverrides,
    };

    if (hasExpectHeader) {
      const expectHeaderValue = prepareExpectContinueHeaders(options, bodyLength);
      return createExpectContinueRequest({
        request,
        abortSignal: abortController.signal,
        hasExpectHeader: true,
        body,
        bodyLength,
        expectHeader: expectHeaderValue,
        isInsecure,
        options,
      });
    } else {
      return new Promise<NodeRequestResult>((resolve, reject) => {
        const req = (isInsecure ? http : https).request(options);

        let requestDone = false;
        // eslint-disable-next-line promise/param-names
        const requestComplete = new Promise<void>((resolveComplete) => {
          const onComplete = (): void => {
            requestDone = true;
            req.removeListener("finish", onComplete);
            req.removeListener("close", onComplete);
            resolveComplete();
          };

          req.once("finish", onComplete);
          req.once("close", onComplete);
        });

        req.once("response", (response) => {
          resolve({
            response,
            requestComplete,
            isRequestComplete: () => requestDone,
          });
        });

        req.once("error", (err: Error & { code?: string }) => {
          reject(
            new RestError(err.message, {
              code: err.code ?? RestError.REQUEST_SEND_ERROR,
              request,
            }),
          );
        });

        abortController.signal.addEventListener("abort", () => {
          const abortError = new AbortError(
            "The operation was aborted. Rejecting from abort signal callback while making request.",
          );
          req.destroy(abortError);
          reject(abortError);
        });

        let uploadBody = body;
        if (uploadBody && request.onUploadProgress) {
          const uploadReportStream = new ReportTransform(request.onUploadProgress);
          uploadReportStream.on("error", (e) => {
            logger.error("Error in upload progress", e);
          });

          if (isReadableStream(uploadBody)) {
            uploadBody.pipe(uploadReportStream);
          } else {
            uploadReportStream.end(uploadBody);
          }

          uploadBody = uploadReportStream;
        }

        if (uploadBody && isReadableStream(uploadBody)) {
          uploadBody.pipe(req);
        } else if (uploadBody) {
          if (typeof uploadBody === "string" || Buffer.isBuffer(uploadBody)) {
            req.end(uploadBody);
          } else if (isArrayBuffer(uploadBody)) {
            req.end(
              ArrayBuffer.isView(uploadBody)
                ? Buffer.from(uploadBody.buffer, uploadBody.byteOffset, uploadBody.byteLength)
                : Buffer.from(uploadBody),
            );
          } else {
            logger.error("Unrecognized body type", uploadBody);
            reject(new RestError("Unrecognized body type"));
          }
        } else {
          // streams don't like "undefined" being passed as data
          req.end();
        }
      });
    }
  }

  private getOrCreateAgent(request: PipelineRequest, isInsecure: boolean): http.Agent {
    const disableKeepAlive = request.disableKeepAlive;

    // Handle Insecure requests first
    if (isInsecure) {
      if (disableKeepAlive) {
        // keepAlive:false is the default so we don't need a custom Agent
        return http.globalAgent;
      }

      if (!this.cachedHttpAgent) {
        // If there is no cached agent create a new one and cache it.
        this.cachedHttpAgent = new http.Agent({ keepAlive: true });
      }
      return this.cachedHttpAgent;
    } else {
      if (disableKeepAlive && !request.tlsSettings) {
        // When there are no tlsSettings and keepAlive is false
        // we don't need a custom agent
        return https.globalAgent;
      }

      // We use the tlsSettings to index cached clients
      const tlsSettings = request.tlsSettings ?? DEFAULT_TLS_SETTINGS;

      // Get the cached agent or create a new one with the
      // provided values for keepAlive and tlsSettings
      let agent = this.cachedHttpsAgents.get(tlsSettings);

      if (agent && agent.options.keepAlive === !disableKeepAlive) {
        return agent;
      }

      logger.info("No cached TLS Agent exist, creating a new Agent");
      agent = new https.Agent({
        // keepAlive is true if disableKeepAlive is false.
        keepAlive: !disableKeepAlive,
        // Since we are spreading, if no tslSettings were provided, nothing is added to the agent options.
        ...tlsSettings,
      });

      this.cachedHttpsAgents.set(tlsSettings, agent);
      return agent;
    }
  }
}

function getResponseHeaders(res: IncomingMessage): HttpHeaders {
  const headers = createHttpHeaders();
  for (const header of Object.keys(res.headers)) {
    const value = res.headers[header];
    if (Array.isArray(value)) {
      if (value.length > 0) {
        headers.set(header, value[0]);
      }
    } else if (value) {
      headers.set(header, value);
    }
  }
  return headers;
}

function getDecodedResponseStream(
  stream: IncomingMessage,
  headers: HttpHeaders,
): NodeJS.ReadableStream {
  const contentEncoding = headers.get("Content-Encoding");
  if (contentEncoding === "gzip") {
    const unzip = zlib.createGunzip();
    pipeResponse(stream, unzip);
    return unzip;
  } else if (contentEncoding === "deflate") {
    const inflate = zlib.createInflate();
    pipeResponse(stream, inflate);
    return inflate;
  }

  return stream;
}

function pipeResponse(source: NodeJS.ReadableStream, destination: Transform): void {
  const onError = (error: Error): void => {
    destination.destroy(error);
  };
  const removeErrorListener = (): void => {
    source.removeListener("error", onError);
  };
  source.on("error", onError);
  source.once("close", removeErrorListener);
  destination.once("close", () => {
    source.unpipe(destination);
    if (source.readable) destroyBodyStream(source);
  });
  source.pipe(destination);
}

function streamToText(stream: NodeJS.ReadableStream): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    const buffer: Buffer[] = [];

    stream.on("data", (chunk) => {
      if (Buffer.isBuffer(chunk)) {
        buffer.push(chunk);
      } else {
        buffer.push(Buffer.from(chunk));
      }
    });
    stream.on("end", () => {
      resolve(Buffer.concat(buffer).toString("utf8"));
    });
    stream.on("error", (e) => {
      if (e && (e?.name === "AbortError" || isRestError(e))) {
        reject(e);
      } else {
        reject(
          new RestError(`Error reading response as text: ${e.message}`, {
            code: RestError.PARSE_ERROR,
          }),
        );
      }
    });
  });
}

/** @internal */
export function getBodyLength(body: RequestBodyType): number | null {
  if (!body) {
    return 0;
  } else if (Buffer.isBuffer(body)) {
    return body.length;
  } else if (isReadableStream(body)) {
    return null;
  } else if (isArrayBuffer(body)) {
    return body.byteLength;
  } else if (typeof body === "string") {
    return Buffer.from(body).length;
  } else {
    return null;
  }
}

/**
 * Create a new HttpClient instance for the NodeJS environment.
 * @internal
 */
export function createNodeHttpClient(): HttpClient {
  return new NodeHttpClient();
}

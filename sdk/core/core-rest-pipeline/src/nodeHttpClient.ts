// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import * as https from "https";
import * as zlib from "zlib";
import { Transform } from "stream";
import { HttpsProxyAgent, HttpsProxyAgentOptions } from "https-proxy-agent";
import { AbortController, AbortError } from "@azure/abort-controller";
import {
  HttpClient,
  PipelineRequest,
  PipelineResponse,
  TransferProgressEvent,
  HttpHeaders,
  RequestBodyType
} from "./interfaces";
import { createHttpHeaders } from "./httpHeaders";
import { RestError } from "./restError";
import { URL } from "./util/url";
import { IncomingMessage } from "http";
import { logger } from "./log";

function isReadableStream(body: any): body is NodeJS.ReadableStream {
  return body && typeof body.pipe === "function";
}

function isStreamComplete(stream: NodeJS.ReadableStream): Promise<void> {
  return new Promise((resolve) => {
    stream.on("close", resolve);
    stream.on("end", resolve);
    stream.on("error", resolve);
  });
}

function isArrayBuffer(body: any): body is ArrayBuffer | ArrayBufferView {
  return body && typeof body.byteLength === "number";
}

class ReportTransform extends Transform {
  private loadedBytes = 0;
  private progressCallback: (progress: TransferProgressEvent) => void;

  // eslint-disable-next-line @typescript-eslint/ban-types
  _transform(chunk: string | Buffer, _encoding: string, callback: Function): void {
    this.push(chunk);
    this.loadedBytes += chunk.length;
    try {
      this.progressCallback({ loadedBytes: this.loadedBytes });
      callback();
    } catch (e) {
      callback(e);
    }
  }

  constructor(progressCallback: (progress: TransferProgressEvent) => void) {
    super();
    this.progressCallback = progressCallback;
  }
}

/**
 * A HttpClient implementation that uses Node's "https" module to send HTTPS requests.
 * @internal
 */
class NodeHttpsClient implements HttpClient {
  private keepAliveAgent?: https.Agent;
  private proxyAgent?: https.Agent;

  /**
   * Makes a request over an underlying transport layer and returns the response.
   * @param request - The request to be made.
   */
  public async sendRequest(request: PipelineRequest): Promise<PipelineResponse> {
    const abortController = new AbortController();
    let abortListener: ((event: any) => void) | undefined;
    if (request.abortSignal) {
      if (request.abortSignal.aborted) {
        throw new AbortError("The operation was aborted.");
      }

      abortListener = (event: Event) => {
        if (event.type === "abort") {
          abortController.abort();
        }
      };
      request.abortSignal.addEventListener("abort", abortListener);
    }

    if (request.timeout > 0) {
      setTimeout(() => {
        abortController.abort();
      }, request.timeout);
    }

    const acceptEncoding = request.headers.get("Accept-Encoding");
    const shouldDecompress =
      acceptEncoding?.includes("gzip") || acceptEncoding?.includes("deflate");
    let body = request.body;

    if (body && !request.headers.has("Content-Length")) {
      const bodyLength = getBodyLength(body);
      if (bodyLength !== null) {
        request.headers.set("Content-Length", bodyLength);
      }
    }

    let responseStream: NodeJS.ReadableStream | undefined;
    try {
      const result = await new Promise<PipelineResponse>((resolve, reject) => {
        if (body && request.onUploadProgress) {
          const onUploadProgress = request.onUploadProgress;
          const uploadReportStream = new ReportTransform(onUploadProgress);
          uploadReportStream.on("error", reject);
          if (isReadableStream(body)) {
            body.pipe(uploadReportStream);
          } else {
            uploadReportStream.end(body);
          }

          body = uploadReportStream;
        }
        const options = this.getRequestOptions(request);
        const req = https.request(options, async (res) => {
          const headers = getResponseHeaders(res);

          const status = res.statusCode ?? 0;
          const response: PipelineResponse = {
            status,
            headers,
            request
          };

          responseStream = shouldDecompress ? getDecodedResponseStream(res, headers) : res;

          const onDownloadProgress = request.onDownloadProgress;
          if (onDownloadProgress) {
            const downloadReportStream = new ReportTransform(onDownloadProgress);
            downloadReportStream.on("error", reject);
            responseStream.pipe(downloadReportStream);
            responseStream = downloadReportStream;
          }

          if (request.streamResponseStatusCodes?.has(response.status)) {
            response.readableStreamBody = responseStream;
          } else {
            response.bodyAsText = await streamToText(responseStream);
          }

          resolve(response);
        });
        req.on("error", (err) => {
          reject(new RestError(err.message, { code: RestError.REQUEST_SEND_ERROR, request }));
        });
        abortController.signal.addEventListener("abort", () => {
          if (!req.finished) {
            req.abort();
            reject(new AbortError("The operation was aborted."));
          }
        });
        if (body && isReadableStream(body)) {
          body.pipe(req);
        } else if (body) {
          req.end(body);
        } else {
          // streams don't like "undefined" being passed as data
          req.end();
        }
      });
      return result;
    } finally {
      // clean up event listener
      if (request.abortSignal && abortListener) {
        let uploadStreamDone = Promise.resolve();
        if (isReadableStream(body)) {
          uploadStreamDone = isStreamComplete(body as NodeJS.ReadableStream);
        }
        let downloadStreamDone = Promise.resolve();
        if (isReadableStream(responseStream)) {
          downloadStreamDone = isStreamComplete(responseStream);
        }

        Promise.all([uploadStreamDone, downloadStreamDone])
          .then(() => {
            request.abortSignal?.removeEventListener("abort", abortListener!);
            return;
          })
          .catch((e) => {
            logger.warning("Error when cleaning up abortListener on httpRequest", e);
          });
      }
    }
  }

  private getOrCreateAgent(request: PipelineRequest): https.Agent {
    // At the moment, proxy settings and keepAlive are mutually
    // exclusive because the proxy library currently lacks the
    // ability to create a proxy with keepAlive turned on.
    const proxySettings = request.proxySettings;
    if (proxySettings) {
      if (!this.proxyAgent) {
        let parsedUrl: URL;
        try {
          parsedUrl = new URL(proxySettings.host);
        } catch (_error) {
          throw new Error(
            `Expecting a valid host string in proxy settings, but found "${proxySettings.host}".`
          );
        }

        const proxyAgentOptions: HttpsProxyAgentOptions = {
          hostname: parsedUrl.hostname,
          port: proxySettings.port,
          protocol: parsedUrl.protocol,
          headers: request.headers.toJSON()
        };
        if (proxySettings.username && proxySettings.password) {
          proxyAgentOptions.auth = `${proxySettings.username}:${proxySettings.password}`;
        }
        this.proxyAgent = (new HttpsProxyAgent(proxyAgentOptions) as unknown) as https.Agent;
      }
      return this.proxyAgent;
    } else if (!request.disableKeepAlive) {
      if (!this.keepAliveAgent) {
        this.keepAliveAgent = new https.Agent({
          keepAlive: true
        });
      }

      return this.keepAliveAgent;
    } else {
      return https.globalAgent;
    }
  }

  private getRequestOptions(request: PipelineRequest): https.RequestOptions {
    const agent = this.getOrCreateAgent(request);
    const url = new URL(request.url);
    const options: https.RequestOptions = {
      agent,
      hostname: url.hostname,
      path: `${url.pathname}${url.search}`,
      port: url.port,
      method: request.method,
      headers: request.headers.toJSON()
    };
    return options;
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
  headers: HttpHeaders
): NodeJS.ReadableStream {
  const contentEncoding = headers.get("Content-Encoding");
  if (contentEncoding === "gzip") {
    const unzip = zlib.createGunzip();
    stream.pipe(unzip);
    return unzip;
  } else if (contentEncoding === "deflate") {
    const inflate = zlib.createInflate();
    stream.pipe(inflate);
    return inflate;
  }

  return stream;
}

function streamToText(stream: NodeJS.ReadableStream): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    const buffer: string[] = [];

    stream.on("data", (chunk) => {
      if (typeof chunk === "string") {
        buffer.push(chunk);
      } else {
        buffer.push(chunk.toString());
      }
    });
    stream.on("end", () => {
      resolve(buffer.join(""));
    });
    stream.on("error", (e) => {
      reject(
        new RestError(`Error reading response as text: ${e.message}`, {
          code: RestError.PARSE_ERROR
        })
      );
    });
  });
}

function getBodyLength(body: RequestBodyType): number | null {
  if (!body) {
    return 0;
  } else if (Buffer.isBuffer(body)) {
    return body.length;
  } else if (isReadableStream(body)) {
    return null;
  } else if (isArrayBuffer(body)) {
    return body.byteLength;
  } else {
    return null;
  }
}

/**
 * Create a new HttpClient instance for the NodeJS environment.
 * @internal
 */
export function createNodeHttpClient(): HttpClient {
  return new NodeHttpsClient();
}

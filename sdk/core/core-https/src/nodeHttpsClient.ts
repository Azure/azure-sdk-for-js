// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import * as https from "https";
import * as zlib from "zlib";
import { Transform } from "stream";
import { HttpsProxyAgent, HttpsProxyAgentOptions } from "https-proxy-agent";
import { AbortController, AbortError } from "@azure/abort-controller";
import {
  HttpsClient,
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

function isReadableStream(body: any): body is NodeJS.ReadableStream {
  return body && typeof body.pipe === "function";
}

function isArrayBuffer(body: any): body is ArrayBuffer | ArrayBufferView {
  return body && typeof body.byteLength === "number";
}

class ReportTransform extends Transform {
  private loadedBytes = 0;
  private progressCallback: (progress: TransferProgressEvent) => void;
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
 * A HttpsClient implementation that uses Node's "https" module to send HTTPS requests.
 */
export class NodeHttpsClient implements HttpsClient {
  private keepAliveAgent?: https.Agent;
  private proxyAgent?: https.Agent;

  /**
   * Makes a request over an underlying transport layer and returns the response.
   * @param request The request to be made.
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

    if (!request.skipDecompressResponse) {
      request.headers.set("Accept-Encoding", "gzip,deflate");
    }

    let body = request.body;

    if (body && !request.headers.has("Content-Length")) {
      const bodyLength = getBodyLength(body);
      if (bodyLength !== null) {
        request.headers.set("Content-Length", bodyLength);
      }
    }

    if (body && request.onUploadProgress) {
      const onUploadProgress = request.onUploadProgress;
      const uploadReportStream = new ReportTransform(onUploadProgress);
      if (isReadableStream(body)) {
        body.pipe(uploadReportStream);
      } else {
        uploadReportStream.end(body);
      }

      body = uploadReportStream;
    }

    try {
      const result = await new Promise<PipelineResponse>((resolve, reject) => {
        const options = this.getRequestOptions(request);
        const req = https.request(options, async (res) => {
          const headers = getResponseHeaders(res);

          const status = res.statusCode ?? 0;
          const response: PipelineResponse = {
            status,
            headers,
            request
          };

          let responseStream = getResponseStream(res, headers, request.skipDecompressResponse);

          const onDownloadProgress = request.onDownloadProgress;
          if (onDownloadProgress) {
            const downloadReportStream = new ReportTransform(onDownloadProgress);
            responseStream.pipe(downloadReportStream);
            responseStream = downloadReportStream;
          }

          if (request.streamResponseBody) {
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
        if (body) {
          if (isReadableStream(body)) {
            body.pipe(req);
          } else {
            req.write(body);
          }
        }
        req.end();
      });
      return result;
    } finally {
      // clean up event listener
      if (request.abortSignal && abortListener) {
        request.abortSignal.removeEventListener("abort", abortListener);
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
        const proxyAgentOptions: HttpsProxyAgentOptions = {
          host: proxySettings.host,
          port: proxySettings.port,
          headers: request.headers.toJSON()
        };
        if (proxySettings.username && proxySettings.password) {
          proxyAgentOptions.auth = `${proxySettings.username}:${proxySettings.password}`;
        }
        this.proxyAgent = (new HttpsProxyAgent(proxyAgentOptions) as unknown) as https.Agent;
      }
      return this.proxyAgent;
    } else if (request.keepAlive) {
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

function getResponseStream(
  stream: IncomingMessage,
  headers: HttpHeaders,
  skipDecompressResponse = false
): NodeJS.ReadableStream {
  if (skipDecompressResponse) {
    return stream;
  }

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

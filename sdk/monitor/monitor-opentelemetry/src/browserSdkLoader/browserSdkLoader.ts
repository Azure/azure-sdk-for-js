// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/* eslint-disable no-underscore-dangle*/

import http from "http";
import https from "https";
import { webSnippet as sdkLoader } from "@microsoft/applicationinsights-web-snippet";
import * as browserSdkLoaderHelper from "./browserSdkLoaderHelper";
import * as prefixHelper from "../utils/common";
import * as zlib from "zlib";
import { InternalConfig } from "../shared";
import { ConnectionStringParser } from "../utils/connectionStringParser";
import { IncomingMessage, ServerResponse } from "http";
import { Logger } from "../shared/logging/logger";
import { BROWSER_SDK_LOADER_DEFAULT_SOURCE } from "../types";
import { diag } from "@opentelemetry/api";

export class BrowserSdkLoader {
  private static _instance: BrowserSdkLoader | null;

  private static _sdkLoader: string;
  private static _aiUrl: string;
  private _isIkeyValid: boolean = true;
  private _isInitialized: boolean = false;
  private _browserSdkLoaderIkey?: string;

  constructor(config: InternalConfig) {
    if (BrowserSdkLoader._instance) {
      diag.warn("Browser SDK Loader should be configured from the applicationInsights object");
    }

    BrowserSdkLoader._instance = this;
    // AI URL used to validate if sdk loader already included
    BrowserSdkLoader._aiUrl = BROWSER_SDK_LOADER_DEFAULT_SOURCE;
    let clientWebIkey;
    if (config.browserSdkLoaderOptions?.connectionString) {
      clientWebIkey = this._getBrowserSdkLoaderIkey(
        config?.browserSdkLoaderOptions?.connectionString,
      );
    }
    this._browserSdkLoaderIkey =
      clientWebIkey ||
      ConnectionStringParser.parse(config.azureMonitorExporterOptions.connectionString)
        .instrumentationkey;

    if (this._isIkeyValid) {
      this._initialize();
    }
  }

  public isInitialized(): boolean {
    return this._isInitialized;
  }

  public static getInstance(): BrowserSdkLoader {
    return BrowserSdkLoader._instance!;
  }

  private _getBrowserSdkLoaderIkey(connectionString: string): string | null {
    let iKey = null;
    try {
      const csCode = ConnectionStringParser.parse(connectionString);
      const iKeyCode = csCode.instrumentationkey || "";
      if (!ConnectionStringParser.validateInstrumentationKey(iKeyCode)) {
        this._isIkeyValid = false;
        Logger.getInstance().info(
          "Invalid browser SDK loader connection string, browser SDK loader is not enabled.",
        );
      } else {
        this._isIkeyValid = true;
        iKey = iKeyCode;
      }
    } catch (err) {
      Logger.getInstance().info(`get browser SDK loader ikey error: ${err}`);
    }
    return iKey;
  }

  /**
   * Gets string to inject into the web page
   * @returns The string to inject into the web page
   */
  private _getBrowserSdkLoaderReplacedStr(): string {
    const osStr = prefixHelper.getOsPrefix();
    const rpStr = prefixHelper.getResourceProvider();
    const sdkLoaderReplacedStr = `${this._browserSdkLoaderIkey}",\r\n disableIkeyDeprecationMessage: true,\r\n sdkExtension: "${rpStr}${osStr}d_n_`;
    const replacedSdkLoader = sdkLoader.replace("INSTRUMENTATION_KEY", sdkLoaderReplacedStr);
    return replacedSdkLoader;
  }

  private _initialize(): void {
    this._isInitialized = true;
    BrowserSdkLoader._sdkLoader = this._getBrowserSdkLoaderReplacedStr();
    const originalHttpServer = http.createServer;
    const originalHttpsServer = https.createServer;

    (http.createServer as any) = (
      requestListener?: (request: IncomingMessage, response: ServerResponse) => void,
    ) => {
      const originalRequestListener = requestListener;
      if (originalRequestListener) {
        requestListener = (request: IncomingMessage, response: ServerResponse) => {
          // Patch response write method
          // eslint-disable-next-line @typescript-eslint/unbound-method
          const originalResponseWrite = response.write;
          const isGetRequest = request.method === "GET";
          // eslint-disable-next-line @typescript-eslint/ban-types
          response.write = function wrap(a: Buffer | string, b?: Function | string) {
            // only patch GET request
            try {
              if (isGetRequest) {
                const headers = browserSdkLoaderHelper.getContentEncodingFromHeaders(response);
                let writeBufferType = undefined;
                if (typeof b === "string") {
                  writeBufferType = b;
                }
                if (headers === null || headers === undefined) {
                  if (BrowserSdkLoader._instance?.ValidateInjection(response, a)) {
                    // eslint-disable-next-line prefer-rest-params
                    arguments[0] = BrowserSdkLoader._instance.InjectSdkLoader(
                      response,
                      a,
                      undefined,
                      writeBufferType,
                    );
                  }
                } else if (headers.length) {
                  const encodeType = headers[0];
                  // eslint-disable-next-line prefer-rest-params
                  arguments[0] = BrowserSdkLoader._instance?.InjectSdkLoader(
                    response,
                    a,
                    encodeType,
                  );
                }
              }
            } catch (err) {
              Logger.getInstance().warn(`Inject browser sdk loader error: ${err}`);
            }
            // eslint-disable-next-line prefer-rest-params
            return originalResponseWrite.apply(response, arguments as any);
          };

          // Patch response end method for cases when HTML is added there
          // eslint-disable-next-line @typescript-eslint/unbound-method
          const originalResponseEnd = response.end;

          // eslint-disable-next-line @typescript-eslint/ban-types, @typescript-eslint/no-redundant-type-constituents
          (response.end as any) = function wrap(a?: Buffer | string | any, b?: Function) {
            if (isGetRequest) {
              try {
                if (isGetRequest) {
                  const headers = browserSdkLoaderHelper.getContentEncodingFromHeaders(response);
                  let endBufferType = undefined;
                  if (typeof b === "string") {
                    endBufferType = b;
                  }
                  if (headers === null || headers === undefined) {
                    if (BrowserSdkLoader._instance?.ValidateInjection(response, a)) {
                      // eslint-disable-next-line prefer-rest-params
                      arguments[0] = BrowserSdkLoader._instance.InjectSdkLoader(
                        response,
                        a,
                        undefined,
                        endBufferType,
                      );
                    }
                  } else if (headers.length) {
                    const encodeType = headers[0];
                    // eslint-disable-next-line prefer-rest-params
                    arguments[0] = BrowserSdkLoader._instance?.InjectSdkLoader(
                      response,
                      a,
                      encodeType,
                    );
                  }
                }
              } catch (err) {
                Logger.getInstance().warn(`Inject browser sdk loader error: ${err}`);
              }
            }
            // eslint-disable-next-line prefer-rest-params
            return originalResponseEnd.apply(response, arguments as any);
          };

          return originalRequestListener(request, response);
        };
      }
      return originalHttpServer(requestListener);
    };

    (https.createServer as any) = function (options: any, httpsRequestListener: any): any {
      const originalHttpsRequestListener = httpsRequestListener;
      if (originalHttpsRequestListener) {
        httpsRequestListener = function (req: any, res: any) {
          const isGetHttpsRequest = req.method === "GET";
          const originalHttpsResponseWrite = res.write;
          const originalHttpsResponseEnd = res.end;
          // eslint-disable-next-line @typescript-eslint/ban-types, @typescript-eslint/no-redundant-type-constituents
          res.write = function wrap(a: Buffer | string | any, b?: Function | string) {
            try {
              if (isGetHttpsRequest) {
                const headers = browserSdkLoaderHelper.getContentEncodingFromHeaders(res);
                let writeBufferType = undefined;
                if (typeof b === "string") {
                  writeBufferType = b;
                }
                if (headers === null || headers === undefined) {
                  if (BrowserSdkLoader._instance?.ValidateInjection(res, a)) {
                    // eslint-disable-next-line prefer-rest-params
                    arguments[0] = this.InjectSdkLoader(res, a, undefined, writeBufferType);
                  }
                } else if (headers.length) {
                  const encodeType = headers[0];
                  // eslint-disable-next-line prefer-rest-params
                  arguments[0] = BrowserSdkLoader._instance?.InjectSdkLoader(res, a, encodeType);
                }
              }
            } catch (err) {
              Logger.getInstance().warn(`Inject SDK loader error: ${err}`);
            }
            // eslint-disable-next-line prefer-rest-params, @typescript-eslint/no-unsafe-return
            return originalHttpsResponseWrite.apply(res, arguments);
          };

          // eslint-disable-next-line @typescript-eslint/ban-types, @typescript-eslint/no-redundant-type-constituents
          res.end = function wrap(a: Buffer | string | any, b?: Function | string) {
            try {
              if (isGetHttpsRequest) {
                const headers = browserSdkLoaderHelper.getContentEncodingFromHeaders(res);
                let endBufferType = undefined;
                if (typeof b === "string") {
                  endBufferType = b;
                }
                if (headers === null || headers === undefined) {
                  if (BrowserSdkLoader._instance?.ValidateInjection(res, a)) {
                    // eslint-disable-next-line prefer-rest-params
                    arguments[0] = BrowserSdkLoader._instance.InjectSdkLoader(
                      res,
                      a,
                      undefined,
                      endBufferType,
                    );
                  }
                } else if (headers.length) {
                  const encodeType = headers[0];
                  // eslint-disable-next-line prefer-rest-params
                  arguments[0] = BrowserSdkLoader._instance?.InjectSdkLoader(res, a, encodeType);
                }
              }
            } catch (err) {
              Logger.getInstance().warn(`Inject SDK loader error: ${err}`);
            }
            // eslint-disable-next-line prefer-rest-params, @typescript-eslint/no-unsafe-return
            return originalHttpsResponseEnd.apply(res, arguments);
          };
          // eslint-disable-next-line @typescript-eslint/no-unsafe-return
          return originalHttpsRequestListener(req, res);
        };
        return originalHttpsServer(options, httpsRequestListener);
      }
    };
  }

  /**
   * Validate response and try to inject Browser SDK Loader
   */
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  public ValidateInjection(response: any, input: string | Buffer): boolean {
    try {
      if (!response || !input || response.statusCode !== 200) return false;
      const isContentHtml = browserSdkLoaderHelper.isContentTypeHeaderHtml(response);
      if (!isContentHtml) return false;
      const inputStr = input.slice().toString();
      if (inputStr.indexOf("<head>") >= 0 && inputStr.indexOf("</head>") >= 0) {
        // Check if sdk loader not already present looking for AI Web SDK URL
        if (inputStr.indexOf(BrowserSdkLoader._aiUrl) < 0) {
          return true;
        }
      }
    } catch (err) {
      Logger.getInstance().info(`validate injections error: ${err}`);
    }
    return false;
  }

  /**
   * Inject Browser SDK Loader
   */
  public InjectSdkLoader(
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    response: any,
    input: string | Buffer,
    encodeType?: browserSdkLoaderHelper.contentEncodingMethod,
    bufferEncodeType?: string,
  ): string | Buffer {
    try {
      const isCompressedBuffer = !!encodeType;
      if (!isCompressedBuffer) {
        const html = input.toString();
        const index = html.indexOf("</head>");
        if (index < 0) return input;

        const newHtml = browserSdkLoaderHelper.insertBrowserSdkLoaderByIndex(
          index,
          html,
          BrowserSdkLoader._sdkLoader,
        );
        if (typeof input === "string") {
          response.removeHeader("Content-Length");
          if (newHtml) {
            input = newHtml;
          }
          response.setHeader("Content-Length", Buffer.byteLength(input));
        } else if (Buffer.isBuffer(input)) {
          const bufferType = bufferEncodeType ? bufferEncodeType : "utf8";
          const isValidBufferType = browserSdkLoaderHelper.isBufferType(input, bufferType);
          if (isValidBufferType && newHtml) {
            response.removeHeader("Content-Length");
            const encodedString = Buffer.from(newHtml).toString(bufferType as BufferEncoding);
            input = Buffer.from(encodedString, bufferType as BufferEncoding);
            response.setHeader("Content-Length", input.length);
          }
        }
      } else {
        response.removeHeader("Content-Length");
        input = this._getInjectedCompressBuffer(response, input as Buffer, encodeType);
        response.setHeader("Content-Length", input.length);
      }
    } catch (ex) {
      Logger.getInstance().warn(
        `Failed to inject browser sdk loader and change content-length headers. Exception:${ex}`,
      );
    }
    return input;
  }

  //* **********************
  // should NOT use sync functions here. But currently cannot get async functions to work
  // because reponse.write return boolean
  // and also this function do not support partial compression as well
  // need more investigation
  private _getInjectedCompressBuffer(
    response: any,
    input: Buffer,
    encodeType: browserSdkLoaderHelper.contentEncodingMethod,
  ): Buffer {
    try {
      switch (encodeType) {
        case browserSdkLoaderHelper.contentEncodingMethod.GZIP: {
          const gunzipBuffer = zlib.gunzipSync(input);
          if (this.ValidateInjection(response, gunzipBuffer)) {
            const injectedGunzipBuffer = this.InjectSdkLoader(response, gunzipBuffer);
            input = zlib.gzipSync(injectedGunzipBuffer);
          }
          break;
        }
        case browserSdkLoaderHelper.contentEncodingMethod.DEFLATE: {
          const inflateBuffer = zlib.inflateSync(input);
          if (this.ValidateInjection(response, inflateBuffer)) {
            const injectedInflateBuffer = this.InjectSdkLoader(response, inflateBuffer);
            input = zlib.deflateSync(injectedInflateBuffer);
          }
          break;
        }
        case browserSdkLoaderHelper.contentEncodingMethod.BR: {
          const BrotliDecompressSync = browserSdkLoaderHelper.getBrotliDecompressSync(zlib);
          const BrotliCompressSync = browserSdkLoaderHelper.getBrotliCompressSync(zlib);
          if (BrotliDecompressSync && BrotliCompressSync) {
            const decompressBuffer = BrotliDecompressSync(input);
            if (this.ValidateInjection(response, decompressBuffer)) {
              const injectedDecompressBuffer = this.InjectSdkLoader(response, decompressBuffer);
              input = BrotliCompressSync(injectedDecompressBuffer);
            }
            break;
          }
        }
      }
    } catch (err) {
      Logger.getInstance().info(`get browser SDK loader compress buffer error: ${err}`);
    }

    return input;
  }

  public dispose(): void {
    BrowserSdkLoader._instance = null;
    this._isInitialized = false;
  }
}

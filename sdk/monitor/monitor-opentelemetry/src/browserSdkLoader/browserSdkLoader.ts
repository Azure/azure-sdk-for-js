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
import { IBrowserSdkLoaderConfig } from "../shared/types";

export class BrowserSdkLoader {
  private static _instance: BrowserSdkLoader | null;

  private static _sdkLoader: string;
  private static _aiUrl: string;
  private _isIkeyValid: boolean = true;
  private _isInitialized: boolean = false;
  private _browserSdkLoaderIkey?: string;
  private _clientBrowserSdkLoaderConfig?: IBrowserSdkLoaderConfig;
  private _clientBrowserSdkLoaderSrc?: string;

  constructor(config: InternalConfig) {
    if (!!BrowserSdkLoader._instance) {
      throw new Error(
        "Browser SDK Loader should be configured from the applicationInsights object",
      );
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
    this._clientBrowserSdkLoaderConfig = config.browserSdkLoaderOptions?.config;
    this._clientBrowserSdkLoaderSrc = config.browserSdkLoaderOptions?.src;

    if (this._isIkeyValid) {
      this._initialize();
    }
  }

  public isInitialized() {
    return this._isInitialized;
  }

  public static getInstance(): BrowserSdkLoader {
    return BrowserSdkLoader._instance!;
  }

  private _getBrowserSdkLoaderIkey(connectionString: string) {
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
      Logger.getInstance().info("get browser SDK loader ikey error: " + err);
    }
    return iKey;
  }

  /**
   * Gets string to inject into the web page
   * @returns The string to inject into the web page
   */
  private _getBrowserSdkLoaderReplacedStr() {
    let configStr = this._getClientBrowserSdkLoaderConfigStr(this._clientBrowserSdkLoaderConfig);
    let osStr = prefixHelper.getOsPrefix();
    let rpStr = prefixHelper.getResourceProvider();
    let sdkLoaderReplacedStr = `${this._browserSdkLoaderIkey}\",\r\n${configStr} disableIkeyDeprecationMessage: true,\r\n sdkExtension: \"${rpStr}${osStr}d_n_`;
    let replacedSdkLoader = sdkLoader.replace("INSTRUMENTATION_KEY", sdkLoaderReplacedStr);
    if (this._clientBrowserSdkLoaderSrc) {
      return replacedSdkLoader.replace(
        `${BROWSER_SDK_LOADER_DEFAULT_SOURCE}.2.min.js`,
        this._clientBrowserSdkLoaderSrc,
      );
    }
    return replacedSdkLoader;
  }

  // Do not use string replace here, because double quote should be kept.
  // we want to transfer all values of config to the sdk loader in the following way:
  // cfg: {
  //      config1: "config1 string value",
  //      config2: true,
  //      config3: 1,
  //      ...
  //}});
  private _getClientBrowserSdkLoaderConfigStr(config?: IBrowserSdkLoaderConfig) {
    let configStr = "";
    try {
      if (!!config && Object.keys(config).length > 0) {
        for (let key in config) {
          const value = config[key as keyof IBrowserSdkLoaderConfig];
          let entry = "";
          // NOTE: users should convert object/function to string themselves
          // Type "function" and "object" will be skipped!
          if (typeof value === "string") {
            entry = ` ${key}: \"${value}\",\r\n`;
            configStr += entry;
          }
        }
      }
    } catch (e) {
      // if has any errors here, web Instrumentation will be disabled.
      this.dispose();
      Logger.getInstance().info(
        "Parse client web instrumentation error. Browser SDK Loader is disabled",
      );
    }
    return configStr;
  }

  private _initialize() {
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
          let originalResponseWrite = response.write;
          let isGetRequest = request.method == "GET";
          response.write = function wrap(a: Buffer | string, b?: Function | string) {
            //only patch GET request
            try {
              if (isGetRequest) {
                let headers = browserSdkLoaderHelper.getContentEncodingFromHeaders(response);
                let writeBufferType = undefined;
                if (typeof b === "string") {
                  writeBufferType = b;
                }
                if (headers === null || headers === undefined) {
                  if (BrowserSdkLoader._instance?.ValidateInjection(response, a)) {
                    arguments[0] = BrowserSdkLoader._instance.InjectSdkLoader(
                      response,
                      a,
                      undefined,
                      writeBufferType,
                    );
                  }
                } else if (headers.length) {
                  let encodeType = headers[0];
                  arguments[0] = BrowserSdkLoader._instance?.InjectSdkLoader(
                    response,
                    a,
                    encodeType,
                  );
                }
              }
            } catch (err) {
              Logger.getInstance().warn("Inject browser sdk loader error: " + err);
            }
            return originalResponseWrite.apply(response, arguments as any);
          };

          // Patch response end method for cases when HTML is added there
          let originalResponseEnd = response.end;

          (response.end as any) = function wrap(a?: Buffer | string | any, b?: Function) {
            if (isGetRequest) {
              try {
                if (isGetRequest) {
                  let headers = browserSdkLoaderHelper.getContentEncodingFromHeaders(response);
                  let endBufferType = undefined;
                  if (typeof b === "string") {
                    endBufferType = b;
                  }
                  if (headers === null || headers === undefined) {
                    if (BrowserSdkLoader._instance?.ValidateInjection(response, a)) {
                      arguments[0] = BrowserSdkLoader._instance.InjectSdkLoader(
                        response,
                        a,
                        undefined,
                        endBufferType,
                      );
                    }
                  } else if (headers.length) {
                    let encodeType = headers[0];
                    arguments[0] = BrowserSdkLoader._instance?.InjectSdkLoader(
                      response,
                      a,
                      encodeType,
                    );
                  }
                }
              } catch (err) {
                Logger.getInstance().warn("Inject browser sdk loader error: " + err);
              }
            }
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
          let isGetHttpsRequest = req.method == "GET";
          let originalHttpsResponseWrite = res.write;
          let originalHttpsResponseEnd = res.end;
          res.write = function wrap(a: Buffer | string | any, b?: Function | string) {
            try {
              if (isGetHttpsRequest) {
                let headers = browserSdkLoaderHelper.getContentEncodingFromHeaders(res);
                let writeBufferType = undefined;
                if (typeof b === "string") {
                  writeBufferType = b;
                }
                if (headers === null || headers === undefined) {
                  if (BrowserSdkLoader._instance?.ValidateInjection(res, a)) {
                    arguments[0] = this.InjectSdkLoader(res, a, undefined, writeBufferType);
                  }
                } else if (headers.length) {
                  let encodeType = headers[0];
                  arguments[0] = BrowserSdkLoader._instance?.InjectSdkLoader(res, a, encodeType);
                }
              }
            } catch (err) {
              Logger.getInstance().warn("Inject SDK loader error: " + err);
            }
            return originalHttpsResponseWrite.apply(res, arguments);
          };

          res.end = function wrap(a: Buffer | string | any, b?: Function | string) {
            try {
              if (isGetHttpsRequest) {
                let headers = browserSdkLoaderHelper.getContentEncodingFromHeaders(res);
                let endBufferType = undefined;
                if (typeof b === "string") {
                  endBufferType = b;
                }
                if (headers === null || headers === undefined) {
                  if (BrowserSdkLoader._instance?.ValidateInjection(res, a)) {
                    arguments[0] = BrowserSdkLoader._instance.InjectSdkLoader(
                      res,
                      a,
                      undefined,
                      endBufferType,
                    );
                  }
                } else if (headers.length) {
                  let encodeType = headers[0];
                  arguments[0] = BrowserSdkLoader._instance?.InjectSdkLoader(res, a, encodeType);
                }
              }
            } catch (err) {
              Logger.getInstance().warn("Inject SDK loader error: " + err);
            }
            return originalHttpsResponseEnd.apply(res, arguments);
          };
          return originalHttpsRequestListener(req, res);
        };
        return originalHttpsServer(options, httpsRequestListener);
      }
    };
  }

  /**
   * Validate response and try to inject Browser SDK Loader
   */
  public ValidateInjection(response: any, input: string | Buffer): boolean {
    try {
      if (!response || !input || response.statusCode != 200) return false;
      let isContentHtml = browserSdkLoaderHelper.isContentTypeHeaderHtml(response);
      if (!isContentHtml) return false;
      let inputStr = input.slice().toString();
      if (inputStr.indexOf("<head>") >= 0 && inputStr.indexOf("</head>") >= 0) {
        // Check if sdk loader not already present looking for AI Web SDK URL
        if (inputStr.indexOf(BrowserSdkLoader._aiUrl) < 0) {
          return true;
        }
      }
    } catch (err) {
      Logger.getInstance().info("validate injections error: " + err);
    }
    return false;
  }

  /**
   * Inject Browser SDK Loader
   */
  public InjectSdkLoader(
    response: any,
    input: string | Buffer,
    encodeType?: browserSdkLoaderHelper.contentEncodingMethod,
    bufferEncodeType?: string,
  ): string | Buffer {
    try {
      let isCompressedBuffer = !!encodeType;
      if (!isCompressedBuffer) {
        let html = input.toString();
        let index = html.indexOf("</head>");
        if (index < 0) return input;

        let newHtml = browserSdkLoaderHelper.insertBrowserSdkLoaderByIndex(
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
          let bufferType = bufferEncodeType ? bufferEncodeType : "utf8";
          let isValidBufferType = browserSdkLoaderHelper.isBufferType(input, bufferType);
          if (isValidBufferType && newHtml) {
            response.removeHeader("Content-Length");
            let encodedString = Buffer.from(newHtml).toString(bufferType as BufferEncoding);
            input = Buffer.from(encodedString, bufferType as BufferEncoding);
            response.setHeader("Content-Length", input.length);
          }
        }
      } else {
        response.removeHeader("Content-Length");
        input = this._getInjectedCompressBuffer(
          response,
          input as Buffer,
          encodeType as browserSdkLoaderHelper.contentEncodingMethod,
        );
        response.setHeader("Content-Length", input.length);
      }
    } catch (ex) {
      Logger.getInstance().warn(
        "Failed to inject browser sdk loader and change content-length headers. Exception:" + ex,
      );
    }
    return input;
  }

  //***********************
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
        case browserSdkLoaderHelper.contentEncodingMethod.GZIP:
          let gunzipBuffer = zlib.gunzipSync(input);
          if (this.ValidateInjection(response, gunzipBuffer)) {
            let injectedGunzipBuffer = this.InjectSdkLoader(response, gunzipBuffer);
            input = zlib.gzipSync(injectedGunzipBuffer);
          }
          break;
        case browserSdkLoaderHelper.contentEncodingMethod.DEFLATE:
          let inflateBuffer = zlib.inflateSync(input);
          if (this.ValidateInjection(response, inflateBuffer)) {
            let injectedInflateBuffer = this.InjectSdkLoader(response, inflateBuffer);
            input = zlib.deflateSync(injectedInflateBuffer);
          }
          break;
        case browserSdkLoaderHelper.contentEncodingMethod.BR:
          let BrotliDecompressSync = browserSdkLoaderHelper.getBrotliDecompressSync(zlib);
          let BrotliCompressSync = browserSdkLoaderHelper.getBrotliCompressSync(zlib);
          if (BrotliDecompressSync && BrotliCompressSync) {
            let decompressBuffer = BrotliDecompressSync(input);
            if (this.ValidateInjection(response, decompressBuffer)) {
              let injectedDecompressBuffer = this.InjectSdkLoader(response, decompressBuffer);
              input = BrotliCompressSync(injectedDecompressBuffer);
            }
            break;
          }
      }
    } catch (err) {
      Logger.getInstance().info("get browser SDK loader compress buffer error: " + err);
    }

    return input;
  }

  public dispose() {
    BrowserSdkLoader._instance = null;
    this._isInitialized = false;
  }
}

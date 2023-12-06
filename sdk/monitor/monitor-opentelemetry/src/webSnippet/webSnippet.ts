const http = require("http");
const https = require("https");
import { webSnippet } from "@microsoft/applicationinsights-web-snippet";
import * as snippetInjectionHelper from "./snippetInjectionHelper";
import * as prefixHelper from "../utils/common";
import * as zlib from "zlib";
import { InternalConfig } from "../shared";
import { ConnectionStringParser } from "../utils/connectionStringParser";
import { IncomingMessage, ServerResponse } from "http";
import { Logger } from "../shared/logging/logger";
import {
  WEB_INSTRUMENTATION_DEFAULT_SOURCE,
  WEB_INSTRUMENTATION_DEPRECATED_SOURCE,
} from "../types";
import { IWebInstrumentationConfig } from "../shared/types";

export class WebSnippet {
  private static _instance: WebSnippet | null;

  private static _snippet: string;
  private static _aiUrl: string;
  private static _aiDeprecatedUrl: string;
  private _isIkeyValid: boolean = true;
  private _isInitialized: boolean = false;
  private _webInstrumentationIkey?: string;
  private _clientWebInstrumentationConfig?: IWebInstrumentationConfig;
  private _clientWebInstrumentationSrc?: string;

  constructor(config: InternalConfig) {
    if (!!WebSnippet._instance) {
      throw new Error(
        "Web snippet injection should be configured from the applicationInsights object"
      );
    }

    WebSnippet._instance = this;
    // AI URL used to validate if snippet already included
    WebSnippet._aiUrl = WEB_INSTRUMENTATION_DEFAULT_SOURCE;
    WebSnippet._aiDeprecatedUrl = WEB_INSTRUMENTATION_DEPRECATED_SOURCE;
    let clientWebIkey;
    if (config.applicationInsightsWebInstrumentationOptions?.webInstrumentationConnectionString) {
      clientWebIkey = this._getWebSnippetIkey(
        config?.applicationInsightsWebInstrumentationOptions?.webInstrumentationConnectionString
      );
    }
    this._webInstrumentationIkey =
      clientWebIkey ||
      ConnectionStringParser.parse(config.azureMonitorExporterOptions.connectionString)
        .instrumentationkey;
    this._clientWebInstrumentationConfig =
      config.applicationInsightsWebInstrumentationOptions?.webInstrumentationConfig;
    this._clientWebInstrumentationSrc =
      config.applicationInsightsWebInstrumentationOptions?.webInstrumentationSrc;

    if (this._isIkeyValid) {
      this._initialize();
    }
  }

  public isInitialized() {
    return this._isInitialized;
  }

  public static getInstance(): WebSnippet {
    return WebSnippet._instance!;
  }

  private _getWebSnippetIkey(connectionString: string) {
    let iKey = null;
    try {
      const csCode = ConnectionStringParser.parse(connectionString);
      const iKeyCode = csCode.instrumentationkey || "";
      if (!ConnectionStringParser.isIkeyValid(iKeyCode)) {
        this._isIkeyValid = false;
        Logger.getInstance().info(
          "Invalid web Instrumentation connection string, web Instrumentation is not enabled."
        );
      } else {
        this._isIkeyValid = true;
        iKey = iKeyCode;
      }
    } catch (err) {
      Logger.getInstance().info("get web snippet ikey error: " + err);
    }
    return iKey;
  }

  /**
   * Gets string to inject into the web page
   * @returns The string to inject into the web page
   */
  private _getWebInstrumentationReplacedStr() {
    let configStr = this._getClientWebInstrumentationConfigStr(
      this._clientWebInstrumentationConfig
    );
    let osStr = prefixHelper.getOsPrefix();
    let rpStr = prefixHelper.getResourceProvider();
    let snippetReplacedStr = `${this._webInstrumentationIkey}\",\r\n${configStr} disableIkeyDeprecationMessage: true,\r\n sdkExtension: \"${rpStr}${osStr}d_n_`;
    let replacedSnippet = webSnippet.replace("INSTRUMENTATION_KEY", snippetReplacedStr);
    if (this._clientWebInstrumentationSrc) {
      return replacedSnippet.replace(
        `${WEB_INSTRUMENTATION_DEFAULT_SOURCE}.2.min.js`,
        this._clientWebInstrumentationSrc
      );
    }
    return replacedSnippet;
  }

  // Do not use string replace here, because double quote should be kept.
  // we want to transfer all values of config to the web snippet in the following way:
  // cfg: {
  //      config1: "config1 string value",
  //      config2: true,
  //      config3: 1,
  //      ...
  //}});
  private _getClientWebInstrumentationConfigStr(config?: IWebInstrumentationConfig) {
    let configStr = "";
    try {
      if (!!config && Object.keys(config).length > 0) {
        for (let key in config) {
          const value = config[key as keyof IWebInstrumentationConfig];
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
        "Parse client web instrumentation error. Web Instrumentation is disabled"
      );
    }
    return configStr;
  }

  private _initialize() {
    this._isInitialized = true;
    WebSnippet._snippet = this._getWebInstrumentationReplacedStr();
    const originalHttpServer = http.createServer;
    const originalHttpsServer = https.createServer;

    (http.createServer as any) = (
      requestListener?: (request: IncomingMessage, response: ServerResponse) => void
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
                let headers = snippetInjectionHelper.getContentEncodingFromHeaders(response);
                let writeBufferType = undefined;
                if (typeof b === "string") {
                  writeBufferType = b;
                }
                if (headers === null || headers === undefined) {
                  if (WebSnippet._instance?.ValidateInjection(response, a)) {
                    arguments[0] = WebSnippet._instance.InjectWebSnippet(
                      response,
                      a,
                      undefined,
                      writeBufferType
                    );
                  }
                } else if (headers.length) {
                  let encodeType = headers[0];
                  arguments[0] = WebSnippet._instance?.InjectWebSnippet(response, a, encodeType);
                }
              }
            } catch (err) {
              Logger.getInstance().warn("Inject snippet error: " + err);
            }
            return originalResponseWrite.apply(response, arguments as any);
          };

          // Patch response end method for cases when HTML is added there
          let originalResponseEnd = response.end;

          (response.end as any) = function wrap(a?: Buffer | string | any, b?: Function) {
            if (isGetRequest) {
              try {
                if (isGetRequest) {
                  let headers = snippetInjectionHelper.getContentEncodingFromHeaders(response);
                  let endBufferType = undefined;
                  if (typeof b === "string") {
                    endBufferType = b;
                  }
                  if (headers === null || headers === undefined) {
                    if (WebSnippet._instance?.ValidateInjection(response, a)) {
                      arguments[0] = WebSnippet._instance.InjectWebSnippet(
                        response,
                        a,
                        undefined,
                        endBufferType
                      );
                    }
                  } else if (headers.length) {
                    let encodeType = headers[0];
                    arguments[0] = WebSnippet._instance?.InjectWebSnippet(response, a, encodeType);
                  }
                }
              } catch (err) {
                Logger.getInstance().warn("Inject snippet error: " + err);
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
                let headers = snippetInjectionHelper.getContentEncodingFromHeaders(res);
                let writeBufferType = undefined;
                if (typeof b === "string") {
                  writeBufferType = b;
                }
                if (headers === null || headers === undefined) {
                  if (WebSnippet._instance?.ValidateInjection(res, a)) {
                    arguments[0] = this.InjectWebSnippet(res, a, undefined, writeBufferType);
                  }
                } else if (headers.length) {
                  let encodeType = headers[0];
                  arguments[0] = WebSnippet._instance?.InjectWebSnippet(res, a, encodeType);
                }
              }
            } catch (err) {
              Logger.getInstance().warn("Inject snippet error: " + err);
            }
            return originalHttpsResponseWrite.apply(res, arguments);
          };

          res.end = function wrap(a: Buffer | string | any, b?: Function | string) {
            try {
              if (isGetHttpsRequest) {
                let headers = snippetInjectionHelper.getContentEncodingFromHeaders(res);
                let endBufferType = undefined;
                if (typeof b === "string") {
                  endBufferType = b;
                }
                if (headers === null || headers === undefined) {
                  if (WebSnippet._instance?.ValidateInjection(res, a)) {
                    arguments[0] = WebSnippet._instance.InjectWebSnippet(
                      res,
                      a,
                      undefined,
                      endBufferType
                    );
                  }
                } else if (headers.length) {
                  let encodeType = headers[0];
                  arguments[0] = WebSnippet._instance?.InjectWebSnippet(res, a, encodeType);
                }
              }
            } catch (err) {
              Logger.getInstance().warn("Inject snippet error: " + err);
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
   * Validate response and try to inject Web snippet
   */
  public ValidateInjection(response: any, input: string | Buffer): boolean {
    try {
      if (!response || !input || response.statusCode != 200) return false;
      let isContentHtml = snippetInjectionHelper.isContentTypeHeaderHtml(response);
      if (!isContentHtml) return false;
      let inputStr = input.slice().toString();
      if (inputStr.indexOf("<head>") >= 0 && inputStr.indexOf("</head>") >= 0) {
        // Check if snippet not already present looking for AI Web SDK URL
        if (
          inputStr.indexOf(WebSnippet._aiUrl) < 0 &&
          inputStr.indexOf(WebSnippet._aiDeprecatedUrl) < 0
        ) {
          return true;
        }
      }
    } catch (err) {
      Logger.getInstance().info("validate injections error: " + err);
    }
    return false;
  }

  /**
   * Inject Web snippet
   */
  public InjectWebSnippet(
    response: any,
    input: string | Buffer,
    encodeType?: snippetInjectionHelper.contentEncodingMethod,
    bufferEncodeType?: string
  ): string | Buffer {
    try {
      let isCompressedBuffer = !!encodeType;
      if (!isCompressedBuffer) {
        let html = input.toString();
        let index = html.indexOf("</head>");
        if (index < 0) return input;

        let newHtml = snippetInjectionHelper.insertSnippetByIndex(index, html, WebSnippet._snippet);
        if (typeof input === "string") {
          response.removeHeader("Content-Length");
          if (newHtml) {
            input = newHtml;
          }
          response.setHeader("Content-Length", Buffer.byteLength(input));
        } else if (Buffer.isBuffer(input)) {
          let bufferType = bufferEncodeType ? bufferEncodeType : "utf8";
          let isValidBufferType = snippetInjectionHelper.isBufferType(input, bufferType);
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
          encodeType as snippetInjectionHelper.contentEncodingMethod
        );
        response.setHeader("Content-Length", input.length);
      }
    } catch (ex) {
      Logger.getInstance().warn(
        "Failed to inject web snippet and change content-length headers. Exception:" + ex
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
    encodeType: snippetInjectionHelper.contentEncodingMethod
  ): Buffer {
    try {
      switch (encodeType) {
        case snippetInjectionHelper.contentEncodingMethod.GZIP:
          let gunzipBuffer = zlib.gunzipSync(input);
          if (this.ValidateInjection(response, gunzipBuffer)) {
            let injectedGunzipBuffer = this.InjectWebSnippet(response, gunzipBuffer);
            input = zlib.gzipSync(injectedGunzipBuffer);
          }
          break;
        case snippetInjectionHelper.contentEncodingMethod.DEFLATE:
          let inflateBuffer = zlib.inflateSync(input);
          if (this.ValidateInjection(response, inflateBuffer)) {
            let injectedInflateBuffer = this.InjectWebSnippet(response, inflateBuffer);
            input = zlib.deflateSync(injectedInflateBuffer);
          }
          break;
        case snippetInjectionHelper.contentEncodingMethod.BR:
          let BrotliDecompressSync = snippetInjectionHelper.getBrotliDecompressSync(zlib);
          let BrotliCompressSync = snippetInjectionHelper.getBrotliCompressSync(zlib);
          if (BrotliDecompressSync && BrotliCompressSync) {
            let decompressBuffer = BrotliDecompressSync(input);
            if (this.ValidateInjection(response, decompressBuffer)) {
              let injectedDecompressBuffer = this.InjectWebSnippet(response, decompressBuffer);
              input = BrotliCompressSync(injectedDecompressBuffer);
            }
            break;
          }
      }
    } catch (err) {
      Logger.getInstance().info("get web injection compress buffer error: " + err);
    }

    return input;
  }

  public dispose() {
    WebSnippet._instance = null;
    this._isInitialized = false;
  }
}

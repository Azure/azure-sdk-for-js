// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import axios, { AxiosError, AxiosRequestConfig, AxiosResponse, Method } from "axios";
import { Transform, Readable } from "stream";
import FormData from "form-data";
import * as tough from "tough-cookie";
import { HttpClient } from "./httpClient";
import { HttpHeaders } from "./httpHeaders";
import { HttpOperationResponse } from "./httpOperationResponse";
import { RestError } from "./restError";
import { WebResource, HttpRequestBody } from "./webResource";
import * as tunnel from "tunnel";
import { ProxySettings } from "./serviceClient";
import * as http from "http";
import * as https from "https";
import { URLBuilder } from "./url";

/**
 * A HttpClient implementation that uses axios to send HTTP requests.
 */
export class AxiosHttpClient implements HttpClient {
  private readonly cookieJar = new tough.CookieJar();

  public async sendRequest(httpRequest: WebResource): Promise<HttpOperationResponse> {
    if (typeof httpRequest !== "object") {
      throw new Error("httpRequest (WebResource) cannot be null or undefined and must be of type object.");
    }

    if (httpRequest.formData) {
      const formData: any = httpRequest.formData;
      const requestForm = new FormData();
      const appendFormValue = (key: string, value: any) => {
        // value function probably returns a stream so we can provide a fresh stream on each retry
        if (typeof value === "function") {
          value = value();
        }
        if (value && value.hasOwnProperty("value") && value.hasOwnProperty("options")) {
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
          httpRequest.headers.set("Content-Type", `multipart/form-data; boundary=${requestForm.getBoundary()}`);
        } else {
          // browser will automatically apply a suitable content-type header
          httpRequest.headers.remove("Content-Type");
        }
      }
    }

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

    const abortSignal = httpRequest.abortSignal;
    if (abortSignal && abortSignal.aborted) {
      throw new RestError("The request was aborted", RestError.REQUEST_ABORTED_ERROR, undefined, httpRequest);
    }

    let abortListener: (() => void) | undefined;
    const cancelToken = abortSignal && new axios.CancelToken(canceler => {
      abortListener = () => canceler();
      abortSignal.addEventListener("abort", abortListener);
    });

    const rawHeaders: { [headerName: string]: string } = httpRequest.headers.rawHeaders();

    const httpRequestBody: HttpRequestBody = httpRequest.body;
    let axiosBody =
      // Workaround for https://github.com/axios/axios/issues/755
      // tslint:disable-next-line:no-null-keyword
      typeof httpRequestBody === "undefined" ? null :
        typeof httpRequestBody === "function" ? httpRequestBody() :
          httpRequestBody;

    const onUploadProgress = httpRequest.onUploadProgress;
    if (onUploadProgress && axiosBody) {
      let loadedBytes = 0;
      const uploadReportStream = new Transform({
        transform: (chunk: string | Buffer, _encoding, callback) => {
          loadedBytes += chunk.length;
          onUploadProgress({ loadedBytes });
          callback(undefined, chunk);
        }
      });
      if (isReadableStream(axiosBody)) {
        axiosBody.pipe(uploadReportStream);
      } else {
        uploadReportStream.end(axiosBody);
      }
      axiosBody = uploadReportStream;
    }

    let res: AxiosResponse;
    try {
      const config: AxiosRequestConfig = {
        method: httpRequest.method as Method,
        url: httpRequest.url,
        headers: rawHeaders,
        data: axiosBody,
        transformResponse: (data) => { return data; },
        validateStatus: () => true,
        // Workaround for https://github.com/axios/axios/issues/1362
        maxContentLength: Infinity,
        responseType: httpRequest.streamResponseBody ? "stream" : "text",
        cancelToken,
        timeout: httpRequest.timeout,
        proxy: false
      };

      if (httpRequest.proxySettings) {
        const agent = createProxyAgent(httpRequest.url, httpRequest.proxySettings, httpRequest.headers);
        if (agent.isHttps) {
          config.httpsAgent = agent.agent;
        } else {
          config.httpAgent = agent.agent;
        }
      }
      // This hack is still required with 0.19.0 version of axios since axios tries to merge the
      // Content-Type header from it's config["<method name>"] where the method name is lower-case,
      // into the request header. It could be possible that the Content-Type header is not present
      // in the original request and this would create problems while creating the signature for
      // storage data plane sdks.
      axios.interceptors.request.use((config: AxiosRequestConfig) => ({
        ...config,
        method: (config.method as Method) && (config.method as Method).toUpperCase() as Method
      }));

      res = await axios.request(config);
    } catch (err) {
      if (err instanceof axios.Cancel) {
        throw new RestError(err.message, RestError.REQUEST_SEND_ERROR, undefined, httpRequest);
      } else {
        const axiosErr = err as AxiosError;
        throw new RestError(axiosErr.message, RestError.REQUEST_SEND_ERROR, undefined, httpRequest);
      }
    } finally {
      if (abortSignal && abortListener) {
        abortSignal.removeEventListener("abort", abortListener);
      }
    }

    const headers = new HttpHeaders(res.headers);

    const onDownloadProgress = httpRequest.onDownloadProgress;
    let responseBody: Readable | string = res.data;
    if (onDownloadProgress) {
      if (isReadableStream(responseBody)) {
        let loadedBytes = 0;
        const downloadReportStream = new Transform({
          transform: (chunk: string | Buffer, _encoding, callback) => {
            loadedBytes += chunk.length;
            onDownloadProgress({ loadedBytes });
            callback(undefined, chunk);
          }
        });
        responseBody.pipe(downloadReportStream);
        responseBody = downloadReportStream;
      } else {
        const length = parseInt(headers.get("Content-Length")!) || (responseBody as string).length || undefined;
        if (length) {
          // Calling callback for non-stream response for consistency with browser
          onDownloadProgress({ loadedBytes: length });
        }
      }
    }

    const operationResponse: HttpOperationResponse = {
      request: httpRequest,
      status: res.status,
      headers,
      readableStreamBody: httpRequest.streamResponseBody ? responseBody as Readable : undefined,
      bodyAsText: httpRequest.streamResponseBody ? undefined : responseBody as string
    };

    if (this.cookieJar) {
      const setCookieHeader = operationResponse.headers.get("Set-Cookie");
      if (setCookieHeader != undefined) {
        await new Promise((resolve, reject) => {
          this.cookieJar!.setCookie(setCookieHeader, httpRequest.url, (err) => {
            if (err) {
              reject(err);
            } else {
              resolve();
            }
          });
        });
      }
    }

    return operationResponse;
  }
}

function isReadableStream(body: any): body is Readable {
  return typeof body.pipe === "function";
}

declare type ProxyAgent = { isHttps: boolean; agent: http.Agent | https.Agent };
export function createProxyAgent(requestUrl: string, proxySettings: ProxySettings, headers?: HttpHeaders): ProxyAgent {
  const tunnelOptions: tunnel.HttpsOverHttpsOptions = {
    proxy: {
      // TODO: Handle case where getHost() returns undefined
      host: URLBuilder.parse(proxySettings.host).getHost()!,
      port: proxySettings.port,
      headers: (headers && headers.rawHeaders())
    }
  };

  if ((proxySettings.username && proxySettings.password)) {
    tunnelOptions.proxy!.proxyAuth = `${proxySettings.username}:${proxySettings.password}`;
  }

  const requestScheme = URLBuilder.parse(requestUrl).getScheme() || "";
  const isRequestHttps = requestScheme.toLowerCase() === "https";
  const proxyScheme = URLBuilder.parse(proxySettings.host).getScheme() || "";
  const isProxyHttps = proxyScheme.toLowerCase() === "https";

  const proxyAgent = {
    isHttps: isRequestHttps,
    agent: createTunnel(isRequestHttps, isProxyHttps, tunnelOptions)
  };

  return proxyAgent;
}

export function createTunnel(isRequestHttps: boolean, isProxyHttps: boolean, tunnelOptions: tunnel.HttpsOverHttpsOptions): http.Agent | https.Agent {
  if (isRequestHttps && isProxyHttps) {
    return tunnel.httpsOverHttps(tunnelOptions);
  } else if (isRequestHttps && !isProxyHttps) {
    return tunnel.httpsOverHttp(tunnelOptions);
  } else if (!isRequestHttps && isProxyHttps) {
    return tunnel.httpOverHttps(tunnelOptions);
  } else {
    return tunnel.httpOverHttp(tunnelOptions);
  }
}

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import * as FormData from "form-data";
import * as xml2js from "isomorphic-xml2js";
import axios, { AxiosResponse, AxiosError, AxiosRequestConfig } from "axios";
import { HttpClient } from "./httpClient";
import { HttpOperationResponse } from "./httpOperationResponse";
import { WebResource } from "./webResource";
import { RestError } from "./restError";
import { HttpHeaders } from "./httpHeaders";
import { isNode } from "./util/utils";
import * as tough from "isomorphic-tough-cookie";

const axiosClient = axios.create();

if (isNode) {
  // Workaround for https://github.com/axios/axios/issues/1158
  axiosClient.interceptors.request.use(config => ({ ...config, method: config.method && config.method.toUpperCase() }));
}

/**
 * A HttpClient implementation that uses axios to send HTTP requests.
 */
export class AxiosHttpClient implements HttpClient {
  private readonly cookieJar = isNode ? new tough.CookieJar() : undefined;

  public async sendRequest(httpRequest: WebResource): Promise<HttpOperationResponse> {
    if (!httpRequest) {
      return Promise.reject(new Error("options (WebResource) cannot be null or undefined and must be of type object."));
    }

    if (!httpRequest.headers) {
      httpRequest.headers = {};
    }

    if (httpRequest.formData) {
      const formData: any = httpRequest.formData;
      const requestForm = new FormData();
      const appendFormValue = (key: string, value: any) => {
        if (value && value.hasOwnProperty("value") && value.hasOwnProperty("options")) {
          requestForm.append(key, value.value, value.options);
        } else {
          requestForm.append(key, value);
        }
      };
      for (const formKey in formData) {
        if (formData.hasOwnProperty(formKey)) {
          const formValue = formData[formKey];
          if (formValue instanceof Array) {
            for (let j = 0; j < formValue.length; j++) {
              appendFormValue(formKey, formValue[j]);
            }
          } else {
            appendFormValue(formKey, formValue);
          }
        }
      }

      httpRequest.body = requestForm;
      httpRequest.formData = undefined;
      if (httpRequest.headers && httpRequest.headers["Content-Type"] &&
          httpRequest.headers["Content-Type"].indexOf("multipart/form-data") !== -1) {
        if (typeof requestForm.getBoundary === "function") {
          httpRequest.headers["Content-Type"] = `multipart/form-data; boundary=${requestForm.getBoundary()}`;
        } else {
          // browser will automatically apply a suitable content-type header
          delete httpRequest.headers["Content-Type"];
        }
      }
    }

    if (this.cookieJar) {
      const cookieString = await new Promise<string>((resolve, reject) => {
        this.cookieJar!.getCookieString(httpRequest.url, (err, cookie) => {
          if (err) {
            reject(err);
          } else {
            resolve(cookie);
          }
        });
      });

      httpRequest.headers["Cookie"] = cookieString;
    }

    const abortSignal = httpRequest.abortSignal;
    if (abortSignal && abortSignal.aborted) {
      throw new RestError("The request was aborted", "REQUEST_ABORTED_ERROR", undefined, httpRequest);
    }

    const cancelToken = abortSignal && new axios.CancelToken(canceler => {
      abortSignal.addEventListener("abort", () => canceler());
    });

    let res: AxiosResponse;
    try {
      const config: AxiosRequestConfig = {
        method: httpRequest.method,
        url: httpRequest.url,
        headers: httpRequest.headers,
        // Workaround for https://github.com/axios/axios/issues/755
        // tslint:disable-next-line:no-null-keyword
        data: httpRequest.body === undefined ? null : httpRequest.body,
        transformResponse: undefined,
        validateStatus: () => true,
        withCredentials: true,
        maxContentLength: 1024*1024*1024*10,
        responseType: httpRequest.rawResponse ? (isNode ? "stream" : "blob") : "text",
        cancelToken
      };
      res = await axiosClient(config);
    } catch (err) {
      if (err instanceof axios.Cancel) {
        throw new RestError(err.message, "REQUEST_ABORTED_ERROR", undefined, httpRequest);
      } else {
        const axiosErr = err as AxiosError;
        throw new RestError(axiosErr.message, "REQUEST_SEND_ERROR", undefined, httpRequest);
      }
    }

    const headers = new HttpHeaders(res.headers);

    const operationResponse: HttpOperationResponse = {
      request: httpRequest,
      status: res.status,
      headers,
      readableStreamBody: httpRequest.rawResponse && isNode ? res.data as any : undefined,
      blobBody: !httpRequest.rawResponse || isNode ? undefined : () => res.data
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

    if (!httpRequest.rawResponse) {
      try {
        operationResponse.bodyAsText = res.data;
      } catch (err) {
        const msg = `Error "${err}" occured while converting the raw response body into string.`;
        const errCode = err.code || "RAWTEXT_CONVERSION_ERROR";
        const e = new RestError(msg, errCode, res.status, httpRequest, operationResponse, res.data);
        return Promise.reject(e);
      }

      try {
        if (operationResponse.bodyAsText) {
          const contentType = operationResponse.headers.get("Content-Type");
          if (contentType === "application/xml" || contentType === "text/xml") {
            const xmlParser = new xml2js.Parser(XML2JS_PARSER_OPTS);
            const parseString = new Promise(function (resolve: (result: any) => void, reject: (err: any) => void) {
              xmlParser.parseString(operationResponse.bodyAsText!, function (err: any, result: any) {
                if (err) {
                  reject(err);
                } else {
                  resolve(result);
                }
              });
            });

            operationResponse.parsedBody = await parseString;
          } else if (contentType === "application/json" || contentType === "text/json" || !contentType) {
            operationResponse.parsedBody = JSON.parse(operationResponse.bodyAsText);
          }
        }
      } catch (err) {
        const msg = `Error "${err}" occured while executing JSON.parse on the response body - ${operationResponse.bodyAsText}.`;
        const errCode = err.code || "JSON_PARSE_ERROR";
        const e = new RestError(msg, errCode, res.status, httpRequest, operationResponse, operationResponse.bodyAsText);
        return Promise.reject(e);
      }
    }
    return Promise.resolve(operationResponse);
  }
}

const XML2JS_PARSER_OPTS: xml2js.OptionsV2 = {
  explicitArray: false,
  explicitCharkey: false,
  explicitRoot: false
};
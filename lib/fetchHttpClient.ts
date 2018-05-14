// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import * as FormData from "form-data";
import * as xml2js from "isomorphic-xml2js";
import { HttpClient } from "./httpClient";
import { HttpOperationResponse } from "./httpOperationResponse";
import { WebResource } from "./webResource";
import { RestError } from "./restError";
import { HttpHeaders } from "./httpHeaders";
import { isNode } from "./util/utils";

/**
 * A HttpClient implementation that uses fetch to send HTTP requests.
 */
export class FetchHttpClient implements HttpClient {
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
        httpRequest.headers["Content-Type"].indexOf("multipart/form-data") > -1 && typeof requestForm.getBoundary === "function") {
        httpRequest.headers["Content-Type"] = `multipart/form-data; boundary=${requestForm.getBoundary()}`;
      }
    }

    // allow cross-origin cookies in browser
    (httpRequest as any).credentials = "include";

    let res: Response;
    try {
      res = await myFetch(httpRequest.url, httpRequest);
    } catch (err) {
      return Promise.reject(err);
    }


    const headers = new HttpHeaders();
    res.headers.forEach((value: string, name: string) => {
      headers.set(name, value);
    });

    const operationResponse: HttpOperationResponse = {
      request: httpRequest,
      status: res.status,
      headers,
      readableStreamBody: isNode ? res.body as any : undefined,
      blobBody: isNode ? undefined : () => res.blob()
    };

    if (!httpRequest.rawResponse) {
      try {
        operationResponse.bodyAsText = await res.text();
      } catch (err) {
        const msg = `Error "${err}" occured while converting the raw response body into string.`;
        const errCode = err.code || "RAWTEXT_CONVERSION_ERROR";
        const e = new RestError(msg, errCode, res.status, httpRequest, operationResponse, res.body);
        return Promise.reject(e);
      }

      try {
        if (operationResponse.bodyAsText) {
          const contentType = res.headers.get("Content-Type")!;
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
          } else {
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

/**
 * Provides the fetch() method based on the environment.
 * @returns {fetch} fetch - The fetch() method available in the environment to make requests
 */
export function getFetch(): Function {
  // using window.Fetch in Edge gives a TypeMismatchError
  // (https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/8546263/).
  // Hence we will be using the fetch-ponyfill for Edge.
  if (typeof window !== "undefined" && window.fetch && window.navigator &&
    window.navigator.userAgent && window.navigator.userAgent.indexOf("Edge/") === -1) {
    return window.fetch.bind(window);
  }
  return require("fetch-ponyfill")({ useCookie: true }).fetch;
}

/**
 * A constant that provides the fetch() method based on the environment.
 */
export const myFetch = getFetch();

const XML2JS_PARSER_OPTS: xml2js.OptionsV2 = {
  explicitArray: false,
  explicitCharkey: false,
  explicitRoot: false
};
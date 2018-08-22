// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import { HttpOperationResponse } from "../httpOperationResponse";
import { OperationResponse } from "../operationResponse";
import { OperationSpec } from "../operationSpec";
import { RestError } from "../restError";
import { Mapper, MapperType } from "../serializer";
import * as utils from "../util/utils";
import { parseXML } from "../util/xml";
import { WebResource } from "../webResource";
import { BaseRequestPolicy, RequestPolicy, RequestPolicyFactory, RequestPolicyOptions } from "./requestPolicy";

/**
 * Create a new serialization RequestPolicyCreator that will serialized HTTP request bodies as they
 * pass through the HTTP pipeline.
 */
export function deserializationPolicy(): RequestPolicyFactory {
  return {
    create: (nextPolicy: RequestPolicy, options: RequestPolicyOptions) => {
      return new DeserializationPolicy(nextPolicy, options);
    }
  };
}

/**
 * A RequestPolicy that will deserialize HTTP response bodies and headers as they pass through the
 * HTTP pipeline.
 */
export class DeserializationPolicy extends BaseRequestPolicy {
  constructor(nextPolicy: RequestPolicy, options: RequestPolicyOptions) {
    super(nextPolicy, options);
  }

  public async sendRequest(request: WebResource): Promise<HttpOperationResponse> {
    return this._nextPolicy.sendRequest(request).then(deserializeResponseBody);
  }
}

function deserializeResponseBody(response: HttpOperationResponse): Promise<HttpOperationResponse> {
  return parse(response).then(response => {
    const operationSpec: OperationSpec | undefined = response.request.operationSpec;
    if (operationSpec && operationSpec.responses) {
      const statusCode: number = response.status;

      const expectedStatusCodes: string[] = Object.keys(operationSpec.responses);

      const hasNoExpectedStatusCodes: boolean = (expectedStatusCodes.length === 0 || (expectedStatusCodes.length === 1 && expectedStatusCodes[0] === "default"));

      const responseSpec: OperationResponse = operationSpec.responses[statusCode];

      const isExpectedStatusCode: boolean = hasNoExpectedStatusCodes ? (200 <= statusCode && statusCode < 300) : !!responseSpec;
      if (!isExpectedStatusCode) {
        const defaultResponseSpec: OperationResponse = operationSpec.responses.default;
        if (defaultResponseSpec) {
          const initialErrorMessage: string = isStreamOperation(operationSpec.responses)
            ? `Unexpected status code: ${statusCode}`
            : response.bodyAsText as string;

          const error = new RestError(initialErrorMessage);
          error.statusCode = statusCode;
          error.request = utils.stripRequest(response.request);
          error.response = utils.stripResponse(response);

          let parsedErrorResponse: { [key: string]: any } = response.parsedBody;
          try {
            if (parsedErrorResponse) {
              const defaultResponseBodyMapper: Mapper | undefined = defaultResponseSpec.bodyMapper;
              if (defaultResponseBodyMapper && defaultResponseBodyMapper.serializedName === "CloudError") {
                if (parsedErrorResponse.error) {
                  parsedErrorResponse = parsedErrorResponse.error;
                }
                if (parsedErrorResponse.code) {
                  error.code = parsedErrorResponse.code;
                }
                if (parsedErrorResponse.message) {
                  error.message = parsedErrorResponse.message;
                }
              } else {
                let internalError: any = parsedErrorResponse;
                if (parsedErrorResponse.error) {
                  internalError = parsedErrorResponse.error;
                }

                error.code = internalError.code;
                if (internalError.message) {
                  error.message = internalError.message;
                }
              }

              if (defaultResponseBodyMapper) {
                let valueToDeserialize: any = parsedErrorResponse;
                if (operationSpec.isXML && defaultResponseBodyMapper.type.name === MapperType.Sequence) {
                  valueToDeserialize = typeof parsedErrorResponse === "object"
                    ? parsedErrorResponse[defaultResponseBodyMapper.xmlElementName!]
                    : [];
                }
                error.body = operationSpec.serializer.deserialize(defaultResponseBodyMapper, valueToDeserialize, "error.body");
              }
            }
          } catch (defaultError) {
            error.message = `Error \"${defaultError.message}\" occurred in deserializing the responseBody - \"${response.bodyAsText}\" for the default response.`;
          }
          return Promise.reject(error);
        }
      } else if (responseSpec) {
        if (responseSpec.bodyMapper) {
          let valueToDeserialize: any = response.parsedBody;
          if (operationSpec.isXML && responseSpec.bodyMapper.type.name === MapperType.Sequence) {
            valueToDeserialize = typeof valueToDeserialize === "object" ? valueToDeserialize[responseSpec.bodyMapper.xmlElementName!] : [];
          }
          try {
            response.parsedBody = operationSpec.serializer.deserialize(responseSpec.bodyMapper, valueToDeserialize, "operationRes.parsedBody");
          } catch (error) {
            const restError = new RestError(`Error ${error} occurred in deserializing the responseBody - ${response.bodyAsText}`);
            restError.request = utils.stripRequest(response.request);
            restError.response = utils.stripResponse(response);
            return Promise.reject(restError);
          }
        }

        if (responseSpec.headersMapper) {
          response.parsedHeaders = operationSpec.serializer.deserialize(responseSpec.headersMapper, response.headers.rawHeaders(), "operationRes.parsedHeaders");
        }
      }
    }
    return Promise.resolve(response);
  });
}

function isStreamOperation(responseSpecs: { [statusCode: string]: OperationResponse }): boolean {
  let result = false;
  for (const statusCode in responseSpecs) {
    const operationResponse: OperationResponse = responseSpecs[statusCode];
    if (operationResponse.bodyMapper && operationResponse.bodyMapper.type.name === MapperType.Stream) {
      result = true;
      break;
    }
  }
  return result;
}

function parse(operationResponse: HttpOperationResponse): Promise<HttpOperationResponse> {
  const errorHandler = (err: any) => {
    const msg = `Error "${err}" occurred while parsing the response body - ${operationResponse.bodyAsText}.`;
    const errCode = err.code || "PARSE_ERROR";
    const e = new RestError(msg, errCode, operationResponse.status, operationResponse.request, operationResponse, operationResponse.bodyAsText);
    return Promise.reject(e);
  };

  if (!operationResponse.request.rawResponse && operationResponse.bodyAsText) {
    const text = operationResponse.bodyAsText;
    const contentType = operationResponse.headers.get("Content-Type") || "";
    const contentComponents = contentType.split(";").map(component => component.toLowerCase());
    if (contentComponents.some(component => component === "application/xml" || component === "text/xml")) {
      return parseXML(text)
        .then(body => {
          operationResponse.parsedBody = body;
          return operationResponse;
        })
        .catch(errorHandler);
    } else if (contentComponents.some(component => component === "application/json" || component === "text/json") || !contentType) {
      return new Promise<HttpOperationResponse>(resolve => {
        operationResponse.parsedBody = JSON.parse(text);
        resolve(operationResponse);
      }).catch(errorHandler);
    }
  }

  return Promise.resolve(operationResponse);
}

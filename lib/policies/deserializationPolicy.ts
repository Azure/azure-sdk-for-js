// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import { HttpOperationResponse } from "../httpOperationResponse";
import { OperationResponse } from "../operationResponse";
import { OperationSpec, isStreamOperation } from "../operationSpec";
import { RestError } from "../restError";
import { Mapper, MapperType } from "../serializer";
import * as utils from "../util/utils";
import { parseXML } from "../util/xml";
import { WebResource } from "../webResource";
import { BaseRequestPolicy, RequestPolicy, RequestPolicyFactory, RequestPolicyOptions } from "./requestPolicy";
import { isBoolean } from "util";

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

async function getOperationResponse(parsedResponse: HttpOperationResponse): Promise<undefined | OperationResponse> {
  let result: OperationResponse | undefined;
  const request: WebResource = parsedResponse.request;
  const operationSpec: OperationSpec | undefined = request.operationSpec;
  if (operationSpec) {
    const operationResponseGetter: undefined | ((operationSpec: OperationSpec, response: HttpOperationResponse) => (undefined | OperationResponse | Promise<undefined | OperationResponse>)) = request.operationResponseGetter;
    if (!operationResponseGetter) {
      result = operationSpec.responses[parsedResponse.status];
    } else {
      result = await Promise.resolve(operationResponseGetter(operationSpec, parsedResponse));
    }
  }
  return result;
}

async function shouldDeserializeResponse(parsedResponse: HttpOperationResponse): Promise<boolean> {
  const shouldDeserialize: undefined | boolean | ((response: HttpOperationResponse) => boolean | Promise<boolean>) = parsedResponse.request.shouldDeserialize;
  let result: boolean;
  if (shouldDeserialize === undefined) {
    result = true;
  } else if (isBoolean(shouldDeserialize)) {
    result = shouldDeserialize;
  } else {
    const shouldDeserializeResult: boolean | Promise<boolean> = shouldDeserialize(parsedResponse);
    if (isBoolean(shouldDeserializeResult)) {
      result = shouldDeserializeResult;
    } else {
      result = await shouldDeserializeResult;
    }
  }
  return result;
}

export function deserializeResponseBody(response: HttpOperationResponse): Promise<HttpOperationResponse> {
  return parse(response).then(async parsedResponse => {
    const shouldDeserialize: boolean = await shouldDeserializeResponse(parsedResponse);
    if (shouldDeserialize) {
      const operationSpec: OperationSpec | undefined = parsedResponse.request.operationSpec;
      if (operationSpec && operationSpec.responses) {
        const statusCode: number = parsedResponse.status;

        const expectedStatusCodes: string[] = Object.keys(operationSpec.responses);

        const hasNoExpectedStatusCodes: boolean = (expectedStatusCodes.length === 0 || (expectedStatusCodes.length === 1 && expectedStatusCodes[0] === "default"));

        const responseSpec: OperationResponse | undefined = await getOperationResponse(parsedResponse);

        const isExpectedStatusCode: boolean = hasNoExpectedStatusCodes ? (200 <= statusCode && statusCode < 300) : !!responseSpec;
        if (!isExpectedStatusCode) {
          const defaultResponseSpec: OperationResponse = operationSpec.responses.default;
          if (defaultResponseSpec) {
            const initialErrorMessage: string = isStreamOperation(operationSpec)
              ? `Unexpected status code: ${statusCode}`
              : parsedResponse.bodyAsText as string;

            const error = new RestError(initialErrorMessage);
            error.statusCode = statusCode;
            error.request = utils.stripRequest(parsedResponse.request);
            error.response = utils.stripResponse(parsedResponse);

            let parsedErrorResponse: { [key: string]: any } = parsedResponse.parsedBody;
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
              error.message = `Error \"${defaultError.message}\" occurred in deserializing the responseBody - \"${parsedResponse.bodyAsText}\" for the default response.`;
            }
            return Promise.reject(error);
          }
        } else if (responseSpec) {
          if (responseSpec.bodyMapper) {
            let valueToDeserialize: any = parsedResponse.parsedBody;
            if (operationSpec.isXML && responseSpec.bodyMapper.type.name === MapperType.Sequence) {
              valueToDeserialize = typeof valueToDeserialize === "object" ? valueToDeserialize[responseSpec.bodyMapper.xmlElementName!] : [];
            }
            try {
              parsedResponse.parsedBody = operationSpec.serializer.deserialize(responseSpec.bodyMapper, valueToDeserialize, "operationRes.parsedBody");
            } catch (error) {
              const restError = new RestError(`Error ${error} occurred in deserializing the responseBody - ${parsedResponse.bodyAsText}`);
              restError.request = utils.stripRequest(parsedResponse.request);
              restError.response = utils.stripResponse(parsedResponse);
              return Promise.reject(restError);
            }
          }

          if (responseSpec.headersMapper) {
            parsedResponse.parsedHeaders = operationSpec.serializer.deserialize(responseSpec.headersMapper, parsedResponse.headers.rawHeaders(), "operationRes.parsedHeaders");
          }
        }
      }
    }
    return Promise.resolve(parsedResponse);
  });
}

function parse(operationResponse: HttpOperationResponse): Promise<HttpOperationResponse> {
  const errorHandler = (err: any) => {
    const msg = `Error "${err}" occurred while parsing the response body - ${operationResponse.bodyAsText}.`;
    const errCode = err.code || "PARSE_ERROR";
    const e = new RestError(msg, errCode, operationResponse.status, operationResponse.request, operationResponse, operationResponse.bodyAsText);
    return Promise.reject(e);
  };

  if (!operationResponse.request.streamResponseBody && operationResponse.bodyAsText) {
    const text = operationResponse.bodyAsText;
    const contentType: string = operationResponse.headers.get("Content-Type") || "";
    const contentComponents: string[] = !contentType ? [] : contentType.split(";").map(component => component.toLowerCase());
    if (contentComponents.length === 0 || contentComponents.some(component => component === "application/json" || component === "text/json")) {
      return new Promise<HttpOperationResponse>(resolve => {
        operationResponse.parsedBody = JSON.parse(text);
        resolve(operationResponse);
      }).catch(errorHandler);
    } else if (contentComponents.some(component => component === "application/xml" || component === "text/xml")) {
      return parseXML(text)
        .then(body => {
          operationResponse.parsedBody = body;
          return operationResponse;
        })
        .catch(errorHandler);
    }
  }

  return Promise.resolve(operationResponse);
}

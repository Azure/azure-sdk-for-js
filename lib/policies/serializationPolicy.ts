// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import { HttpOperationResponse } from "../httpOperationResponse";
import { getPathStringFromParameter } from "../operationParameter";
import { OperationResponse } from "../operationResponse";
import { OperationSpec } from "../operationSpec";
import { RestError } from "../restError";
import { Mapper, MapperType } from "../serializer";
import * as utils from "../util/utils";
import { WebResource } from "../webResource";
import { BaseRequestPolicy, RequestPolicy, RequestPolicyCreator, RequestPolicyOptions } from "./requestPolicy";

/**
 * Create a new serialization RequestPolicyCreator that will serialized HTTP request bodies as they
 * pass through the HTTP pipeline.
 */
export function serializationPolicy(): RequestPolicyCreator {
  return (nextPolicy: RequestPolicy, options: RequestPolicyOptions) => {
    return new SerializationPolicy(nextPolicy, options);
  };
}

/**
 * A RequestPolicy that will serialize HTTP request bodies as they pass through the HTTP pipeline.
 */
export class SerializationPolicy extends BaseRequestPolicy {
  constructor(nextPolicy: RequestPolicy, options: RequestPolicyOptions) {
    super(nextPolicy, options);
  }

  public async sendRequest(request: WebResource): Promise<HttpOperationResponse> {
    let result: Promise<HttpOperationResponse>;
    try {
      this.serializeRequestBody(request);
      const operationResponse: HttpOperationResponse = await this._nextPolicy.sendRequest(request);
      result = this.deserializeResponseBody(operationResponse);
    } catch (error) {
      result = Promise.reject(error);
    }
    return result;
  }

  /**
   * Serialize the provided HTTP request's body based on the requestBodyMapper assigned to the HTTP
   * request.
   * @param {WebResource} request - The HTTP request that will have its body serialized.
   */
  public serializeRequestBody(request: WebResource): void {
    const operationSpec: OperationSpec | undefined = request.operationSpec;
    if (operationSpec && operationSpec.requestBody) {
      const bodyMapper: Mapper | undefined = operationSpec.requestBody.mapper;
      if (bodyMapper) {
        try {
          if (request.body != undefined || bodyMapper.required) {
            const requestBodyParameterPathString: string = getPathStringFromParameter(operationSpec.requestBody);
            request.body = operationSpec.serializer.serialize(bodyMapper, request.body, requestBodyParameterPathString);
            if (operationSpec.isXML) {
              if (bodyMapper.type.name === MapperType.Sequence) {
                request.body = utils.stringifyXML(utils.prepareXMLRootList(request.body, bodyMapper.xmlElementName || bodyMapper.xmlName || bodyMapper.serializedName), { rootName: bodyMapper.xmlName || bodyMapper.serializedName });
              }
              else {
                request.body = utils.stringifyXML(request.body, { rootName: bodyMapper.xmlName || bodyMapper.serializedName });
              }
            } else if (bodyMapper.type.name !== MapperType.Stream) {
              request.body = JSON.stringify(request.body);
            }
          }
        } catch (error) {
          throw new Error(`Error "${error.message}" occurred in serializing the payload - ${JSON.stringify(bodyMapper.serializedName, undefined, "  ")}.`);
        }
      }
    }
  }

  public deserializeResponseBody(response: HttpOperationResponse): Promise<HttpOperationResponse> {
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
              if (defaultResponseSpec.isCloudError) {
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

              const defaultResponseBodyMapper: Mapper | undefined = defaultResponseSpec.bodyMapper;
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
      } else {

      }
    }
    return Promise.resolve(response);
  }
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
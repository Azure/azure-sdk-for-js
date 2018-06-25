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
import * as xml2js from "isomorphic-xml2js";

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
    serializeRequestBody(request);
    return this._nextPolicy.sendRequest(request).then(operationResponse => deserializeResponseBody(operationResponse));
  }
}

/**
 * Serialize the provided HTTP request's body based on the requestBodyMapper assigned to the HTTP
 * request.
 * @param {WebResource} request - The HTTP request that will have its body serialized.
 */
function serializeRequestBody(request: WebResource): void {
  const operationSpec: OperationSpec | undefined = request.operationSpec;
  if (operationSpec && operationSpec.requestBody && operationSpec.requestBody.mapper) {
    const bodyMapper = operationSpec.requestBody.mapper;
    const { required, xmlName, xmlElementName, serializedName } = bodyMapper;
    const typeName = bodyMapper.type.name;
    try {
      if (request.body != undefined || required) {
        const requestBodyParameterPathString: string = getPathStringFromParameter(operationSpec.requestBody);
        request.body = operationSpec.serializer.serialize(bodyMapper, request.body, requestBodyParameterPathString);
        if (operationSpec.isXML) {
          if (typeName === MapperType.Sequence) {
            request.body = utils.stringifyXML(utils.prepareXMLRootList(request.body, xmlElementName || xmlName || serializedName), { rootName: xmlName || serializedName });
          }
          else {
            request.body = utils.stringifyXML(request.body, { rootName: xmlName || serializedName });
          }
        } else if (typeName !== MapperType.Stream) {
          request.body = JSON.stringify(request.body);
        }
      }
    } catch (error) {
      throw new Error(`Error "${error.message}" occurred in serializing the payload - ${JSON.stringify(serializedName, undefined, "  ")}.`);
    }
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
      } else {

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
      const xmlParser = new xml2js.Parser({
        explicitArray: false,
        explicitCharkey: false,
        explicitRoot: false
      });
      return new Promise<HttpOperationResponse>(function (resolve, reject) {
        xmlParser.parseString(text, function (err: any, result: any) {
          if (err) {
            reject(err);
          } else {
            operationResponse.parsedBody = result;
            resolve(operationResponse);
          }
        });
      }).catch(errorHandler);
    } else if (contentComponents.some(component => component === "application/json" || component === "text/json") || !contentType) {
      return new Promise<HttpOperationResponse>(resolve => {
        operationResponse.parsedBody = JSON.parse(text);
        resolve(operationResponse);
      }).catch(errorHandler);
    }
  }

  return Promise.resolve(operationResponse);
}

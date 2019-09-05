// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { HttpOperationResponse } from "../httpOperationResponse";
import { WebResource } from "../webResource";
import {
  BaseRequestPolicy,
  RequestPolicy,
  RequestPolicyFactory,
  RequestPolicyOptions
} from "./requestPolicy";
import { Constants } from "../util/constants";
import { deserializeAtomXmlToJson } from "../util/xml";
import { isString } from "../util/utils";
import { ResourceSerializer } from "../resourceSerializer";

/**
 * Create a new serialization RequestPolicyCreator that will serialize/deserialize
 * HTTP request bodies as they pass through the HTTP pipeline.
 */
export function atomSerializationPolicy(): RequestPolicyFactory {
  return {
    create: (nextPolicy: RequestPolicy, options: RequestPolicyOptions) => {
      return new AtomSerializationPolicy(nextPolicy, options);
    }
  };
}

/**
 * A RequestPolicy that will
 *  - serialize HTTP requests with input in JSON to ATOM based XML requests, and
 *  - deserialize the ATOM based XML responses as they pass through the HTTP pipeline.
 */
export class AtomSerializationPolicy extends BaseRequestPolicy {
  constructor(nextPolicy: RequestPolicy, options: RequestPolicyOptions) {
    super(nextPolicy, options);
  }

  public async sendRequest(request: WebResource): Promise<HttpOperationResponse> {
    let shouldParseResponse = false;
    let serializer: ResourceSerializer;
    if (request.atomXmlOperationSpec) {
      serializer = request.atomXmlOperationSpec.serializer;
      shouldParseResponse = request.atomXmlOperationSpec.shouldParseResponse;
      if (request.body) {
        request.body = serializer.serialize(JSON.parse(request.body));
      }
    }

    return this._nextPolicy.sendRequest(request).then((response: HttpOperationResponse) => {
      const parsedResponse: HttpOperationResponse = this.parseResponse(response);

      // Construct response with 'result' to be backward compatibile
      const responseInCustomJson: any = {
        error: parsedResponse.errorBody,
        response: parsedResponse.parsedBody,
        result: shouldParseResponse ? [] : undefined
      };

      if (responseInCustomJson.error == undefined) {
        responseInCustomJson.result =
          shouldParseResponse && serializer
            ? serializer.parse(responseInCustomJson.response)
            : undefined;
      }

      response.parsedBody = responseInCustomJson;
      return response;
    });
  }

  /**
   * Process the response.
   * @ignore
   *
   * @param {WebResource} webResource  The web resource that made the request.
   * @param {Response}    response     The response object.
   * @return The normalized responseObject.
   */
  private parseResponse(response: HttpOperationResponse): HttpOperationResponse {
    const parsedResponse: HttpOperationResponse = this._parseXmlResponseToJson(response);

    if (response.status >= 200 && response.status < 300 && response.errorBody == undefined) {
      return response;
    }

    const HttpResponseCodes: any = Constants.HttpResponseCodes;

    if (parsedResponse.errorBody == undefined) {
      if (Object.keys(HttpResponseCodes).indexOf(response.status.toString()) < 0) {
        parsedResponse.errorBody = {
          error: { code: `UnrecognizedHttpResponseStatus: ${response.status}` }
        };
      } else {
        parsedResponse.errorBody = { error: { code: HttpResponseCodes[response.status] } };
      }
    }

    const normalizedError = this._normalizeError(parsedResponse.errorBody, response);
    parsedResponse.errorBody = normalizedError;
    return parsedResponse;
  }

  private _parseXmlResponseToJson(responseInXml: HttpOperationResponse): HttpOperationResponse {
    const parsedResponse = responseInXml;
    try {
      if (responseInXml.bodyAsText && responseInXml.bodyAsText.toString().length > 0) {
        parsedResponse.parsedBody = deserializeAtomXmlToJson(responseInXml.bodyAsText);
      }
    } catch (e) {
      parsedResponse.errorBody = {
        error: { code: "ResponseNotInAtomXMLFormat" }
      };
    }
    return parsedResponse;
  }

  private _normalizeError(error: any, response: HttpOperationResponse): any {
    if (isString(error)) {
      return new Error(error);
    } else if (error) {
      const normalizedError: any = {};
      const odataErrorFormat = !!error["odata.error"];
      const errorProperties = error.Error || error.error || error["odata.error"] || error;

      if (odataErrorFormat) {
        Object.keys(errorProperties).forEach((property: string) => {
          let value = null;
          if (
            property === Constants.ODATA_ERROR_MESSAGE &&
            !isString(errorProperties[Constants.ODATA_ERROR_MESSAGE])
          ) {
            if (
              errorProperties[Constants.ODATA_ERROR_MESSAGE][Constants.ODATA_ERROR_MESSAGE_VALUE]
            ) {
              value =
                errorProperties[Constants.ODATA_ERROR_MESSAGE][Constants.ODATA_ERROR_MESSAGE_VALUE];
            } else {
              value = "missing value in the message property of the odata error format";
            }
          } else {
            value = errorProperties[property];
          }
          normalizedError[property.toLowerCase()] = value;
        });
      } else {
        Object.keys(errorProperties).forEach((property: any) => {
          {
            let value = null;
            if (property !== Constants.XML_METADATA_MARKER) {
              if (
                errorProperties[property] &&
                errorProperties[property][Constants.XML_VALUE_MARKER]
              ) {
                value = errorProperties[property][Constants.XML_VALUE_MARKER];
              } else {
                value = errorProperties[property];
              }
              normalizedError[property.toLowerCase()] = value;
            }
          }
        });
      }
      let errorMessage = normalizedError.code;
      if (normalizedError.detail) {
        errorMessage += " - " + normalizedError.detail;
      }

      if (response) {
        if (response.status) {
          normalizedError.statusCode = response.status;
        }

        if (response.headers && response.headers.get("x-ms-request-id")) {
          normalizedError.requestId = response.headers.get("x-ms-request-id");
        }
      }

      const errorObject: any = { error: { code: errorMessage } };
      Object.keys(normalizedError).forEach((property: string) => {
        errorObject[property] = normalizedError[property];
      });
      return errorObject;
    }

    return undefined;
  }
}

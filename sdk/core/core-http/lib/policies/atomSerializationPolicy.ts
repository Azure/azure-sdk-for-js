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
    let serializer: ResourceSerializer | undefined;
    if (request.atomXmlOperationSpec) {
      serializer = request.atomXmlOperationSpec.serializer;
      shouldParseResponse = request.atomXmlOperationSpec.shouldParseResponse;
      if (request.body) {
        request.body = serializer.serialize(JSON.parse(request.body));
      }
    }

    let response: HttpOperationResponse = await this._nextPolicy.sendRequest(request);

    // Transform response to contain the parsed data
    response = await this.parseResponse(response);

    // Construct response with 'result' to be backward compatibile
    const responseInCustomJson: any = {
      error: response.errorBody,
      response: response.parsedBody,
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
  }

  /**
   * @ignore
   * Utility to help transform the response to contain normalized JSON based information
   * constructed from the raw Atom XML based data received.
   *
   * @param {Response} response The response object containing data in Atom XML format.
   * @return The normalized responseObject.
   */
  private async parseResponse(response: HttpOperationResponse): Promise<HttpOperationResponse> {
    try {
      if (response.bodyAsText && response.bodyAsText.toString().length > 0) {
        response.parsedBody = await deserializeAtomXmlToJson(response.bodyAsText);
      }
    } catch (e) {
      response.errorBody = {
        error: { code: "ResponseNotInAtomXMLFormat" }
      };
    }

    if (response.status >= 200 && response.status < 300 && response.errorBody == undefined) {
      return response;
    }

    if (response.errorBody == undefined) {
      const HttpResponseCodes = Constants.HttpResponseCodes;
      const statusCode = response.status;
      if (!this.isKnownResponseCode(statusCode)) {
        response.errorBody = {
          error: { code: `UnrecognizedHttpResponseStatus: ${statusCode}` }
        };
      } else {
        response.errorBody = { error: { code: HttpResponseCodes[statusCode] } };
      }
    }

    // Transform the errorBody to a normalized one
    const normalizedError = this._normalizeError(response.errorBody, response);
    response.errorBody = normalizedError;
    return response;
  }

  private isKnownResponseCode(
    statusCode: number
  ): statusCode is keyof typeof Constants.HttpResponseCodes {
    return !!(Constants.HttpResponseCodes as { [statusCode: number]: string })[statusCode];
  }

  /**
   * @ignore
   * Utility to help construct the normalized error object based on given `errorBody`
   * data and other data present in the received `response` object.
   *
   * @param errorBody
   * @param response
   */
  private _normalizeError(errorBody: any, response: HttpOperationResponse): any {
    if (isString(errorBody)) {
      return new Error(errorBody);
    } else if (errorBody) {
      const normalizedError: any = {};
      const odataErrorFormat = !!errorBody["odata.error"];
      const errorProperties =
        errorBody.Error || errorBody.error || errorBody["odata.error"] || errorBody;

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

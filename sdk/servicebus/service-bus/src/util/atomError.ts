// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { Constants as CoreHttpConstants, HttpOperationResponse } from "@azure/core-http";
import { Constants } from "./utils/constants";

/**
 * Represents custom `Error` information returned by ATOM based services.
 */
export class AtomError extends Error {
  code?: string;
  statusCode?: number;
  additionalProperties?: any;
  requestId?: string;

  constructor(message: string) {
    super(message);
    this.additionalProperties = {};
    Object.setPrototypeOf(this, AtomError.prototype);
  }
}

/**
 *
 * Utility to help construct the normalized `AtomError` object based on given `errorBody`
 * data and other data present in the received `response` object.
 *
 * @param errorBody
 * @param response
 */
export function buildAtomError(errorBody: any, response: HttpOperationResponse): AtomError {
  const normalizedError: any = {};
  const odataErrorFormat = !!errorBody["odata.error"];
  const errorProperties =
    errorBody.Error || errorBody.error || errorBody["odata.error"] || errorBody;
  let errorMessage;

  if (typeof errorBody === "string") {
    errorMessage = errorBody;
  } else {
    if (odataErrorFormat) {
      Object.keys(errorProperties).forEach((property: string) => {
        let value = errorProperties[property];
        if (value && typeof value !== "string" && property === Constants.ODATA_ERROR_MESSAGE) {
          value =
            value[Constants.ODATA_ERROR_MESSAGE_VALUE] ||
            "missing value in the message property of the odata error format";
        }
        normalizedError[property.toLowerCase()] = value;
      });
    } else {
      Object.keys(errorProperties).forEach((property: any) => {
        {
          if (property === CoreHttpConstants.XML_METADATA_MARKER) {
            return;
          }
          let value = errorProperties[property];
          if (value && value[CoreHttpConstants.XML_VALUE_MARKER]) {
            value = value[CoreHttpConstants.XML_VALUE_MARKER];
          }
          normalizedError[property.toLowerCase()] = value;
        }
      });
    }
    errorMessage = normalizedError.code;
    if (normalizedError.detail) {
      errorMessage += " - " + normalizedError.detail;
    }
  }

  const errorObject: AtomError = new AtomError(`ATOM Service Error: ${errorMessage}`);

  if (response) {
    if (response.status) {
      errorObject["statusCode"] = response.status;
    }

    if (response.headers && response.headers.get("x-ms-request-id")) {
      errorObject["requestId"] = response.headers.get("x-ms-request-id");
    }
  }

  Object.keys(normalizedError).forEach((property: string) => {
    errorObject.additionalProperties[property] = normalizedError[property];
  });

  return errorObject;
}

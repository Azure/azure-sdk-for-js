// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { Constants } from "./util/constants";
import { isString } from "./util/utils";
import { HttpOperationResponse } from "./httpOperationResponse";

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
  if (isString(errorBody)) {
    return new Error(errorBody);
  }
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
        if (errorProperties[Constants.ODATA_ERROR_MESSAGE][Constants.ODATA_ERROR_MESSAGE_VALUE]) {
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
          if (errorProperties[property] && errorProperties[property][Constants.XML_VALUE_MARKER]) {
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

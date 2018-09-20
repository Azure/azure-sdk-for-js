// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import { CompositeMapper } from "ms-rest-js";

/**
 * @class
 * Provides additional information about an http error response returned from a Microsoft Azure service.
 */
export interface CloudError extends Error {
  /**
   * @property {string} code The error code parsed from the body of the http error response.
   */
  code: string;
  /**
   * @property {string} message The error message parsed from the body of the http error response.
   */
  message: string;
  /**
   * @property {string} [target] The target of the error.
   */
  target?: string;
  /**
   * @property {Array<CloudError>} [details] An array of CloudError objects specifying the details.
   */
  details?: Array<CloudError>;
  /**
   * @property {any} [innerError] The inner error parsed from the body of the http error response
   */
  innerError?: any;
  /**
   * @property {AdditionalInfoElement} [innerError] The additional error information
   */
  additionalInfo?: AdditionalInfoElement;
}

/**
 * @interface
 * Additional data for an instance of CloudError.
 */
export interface AdditionalInfoElement {
  /**
   * @property {string} [type] Type of the data.
   */
  type?: string;

  /**
   * @property {string} [info] Additional info.
   */
  info?: string;
}

export const CloudErrorMapper: CompositeMapper = {
  serializedName: "CloudError",
  type: {
    name: "Composite",
    className: "CloudError",
    modelProperties: {
      code: {
        required: true,
        serializedName: "code",
        type: {
          name: "String"
        }
      },
      message: {
        required: true,
        serializedName: "message",
        type: {
          name: "String"
        }
      },
      target: {
        serializedName: "target",
        type: {
          name: "String"
        }
      },
      details: {
        serializedName: "details",
        type: {
          name: "Sequence",
          element: {
            serializedName: "CloudErrorElementType",
            type: {
              name: "Composite",
              className: "CloudError"
            }
          }
        }
      },
      innerError: {
        required: false,
        serializedName: "innererror",
        type: {
          name: "Object"
        }
      },
      additionalInfo: {
        required: false,
        serializedName: "additionalInfo",
        type: {
          name: "Composite",
          className: "AdditionalInfoElement",
          modelProperties: {
            type: {
              required: true,
              serializedName: "type",
              type: {
                name: "String"
              }
            },
            info: {
              required: false,
              serializedName: "info",
              type: {
                name: "Object"
              }
            }
          }
        }
      }
    }
  }
};

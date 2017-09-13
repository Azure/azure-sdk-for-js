// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

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
}

export const CloudErrorMapper = {
  required: false,
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
        required: false,
        serializedName: "target",
        type: {
          name: "String"
        }
      },
      details: {
        required: false,
        serializedName: "details",
        type: {
          name: "Sequence",
          element: {
            required: false,
            serializedName: "CloudErrorElementType",
            type: {
              name: "Composite",
              className: "CloudError"
            }
          }
        }
      }
    }
  }
};
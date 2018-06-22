// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.


/**
 * Defines constants for long running operation states.
 *
 * @const
 * @type {string}
 */
export type LongRunningOperationStates = "InProgress" | "Succeeded" | "Failed" | "Canceled";

const Constants = {

  /**
   * The default language in the request header.
   *
   * @const
   * @type {string}
   */
  DEFAULT_LANGUAGE: "en-us",

  /**
   * The ms-rest-azure version.
   * @const
   * @type {string}
   */
  msRestAzureVersion: "0.1.0"
};

export default Constants;

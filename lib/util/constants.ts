// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.


/**
 * Defines constants for long running operation states.
 *
 * @const
 * @type {string}
 */
export type LongRunningOperationStates = "InProgress" | "Succeeded" | "Failed" | "Canceled";

/**
 * The default language in the request header.
 *
 * @const
 * @type {string}
 */
export const DEFAULT_LANGUAGE = "en-us";

/**
 * The ms-rest-azure version.
 * @const
 * @type {string}
 */
export const msRestAzureVersion = "0.1.0";
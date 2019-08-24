// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

/**
 * Defines constants for long running operation states.
 *
 * @const
 * @type {string}
 */
export type LongRunningOperationStates =
  | "InProgress"
  | "Succeeded"
  | "Failed"
  | "Canceled"
  | "Cancelled";

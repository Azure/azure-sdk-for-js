// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

export type {
  AzureReservationAPIContext,
  AzureReservationAPIOptionalParams,
} from "./azureReservationAPIContext.js";
export { createAzureReservationAPI } from "./azureReservationAPIContext.js";
export { getAppliedReservationList, getCatalog } from "./operations.js";
export type {
  GetAppliedReservationListOptionalParams,
  GetCatalogOptionalParams,
} from "./options.js";

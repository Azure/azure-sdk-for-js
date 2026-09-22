// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

export type {
  CdnManagementContext,
  CdnManagementClientOptionalParams,
} from "./cdnManagementContext.js";
export { createCdnManagement } from "./cdnManagementContext.js";
export {
  validateProbe,
  checkNameAvailabilityWithSubscription,
  checkNameAvailability,
  checkEndpointNameAvailability,
} from "./operations.js";
export type {
  ValidateProbeOptionalParams,
  CheckNameAvailabilityWithSubscriptionOptionalParams,
  CheckNameAvailabilityOptionalParams,
  CheckEndpointNameAvailabilityOptionalParams,
} from "./options.js";

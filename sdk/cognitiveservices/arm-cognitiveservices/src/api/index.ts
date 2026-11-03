// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

export type {
  CognitiveServicesManagementContext,
  CognitiveServicesManagementClientOptionalParams,
} from "./cognitiveServicesManagementContext.js";
export { createCognitiveServicesManagement } from "./cognitiveServicesManagementContext.js";
export {
  calculateModelCapacity,
  checkDomainAvailability,
  checkSkuAvailability,
} from "./operations.js";
export type {
  CalculateModelCapacityOptionalParams,
  CheckDomainAvailabilityOptionalParams,
  CheckSkuAvailabilityOptionalParams,
} from "./options.js";

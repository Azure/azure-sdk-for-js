// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

export {
  updateDiscoveryEngine,
  stopDiscoveryEngine,
  startDiscoveryEngine,
  getDiscoveryEngineMemory,
  getDiscoveryEngine,
  list,
  $delete,
  update,
  createOrReplace,
  getOperationStatus,
  get,
} from "./operations.js";
export type {
  InvestigationsUpdateDiscoveryEngineOptionalParams,
  InvestigationsStopDiscoveryEngineOptionalParams,
  InvestigationsStartDiscoveryEngineOptionalParams,
  InvestigationsGetDiscoveryEngineMemoryOptionalParams,
  InvestigationsGetDiscoveryEngineOptionalParams,
  InvestigationsListOptionalParams,
  InvestigationsDeleteOptionalParams,
  InvestigationsUpdateOptionalParams,
  InvestigationsCreateOrReplaceOptionalParams,
  InvestigationsGetOperationStatusOptionalParams,
  InvestigationsGetOptionalParams,
} from "./options.js";

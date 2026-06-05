// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

export {
  createEdgeZones,
  type EdgeZonesContext,
  type EdgeZonesClientOptionalParams,
} from "./edgeZonesContext.js";
export {
  type OperationsListOptionalParams,
  type ExtendedZonesGetOptionalParams,
  type ExtendedZonesListBySubscriptionOptionalParams,
  type ExtendedZonesRegisterOptionalParams,
  type ExtendedZonesUnregisterOptionalParams,
} from "./options.js";
export {
  extendedZonesGet,
  extendedZonesListBySubscription,
  extendedZonesRegister,
  extendedZonesUnregister,
} from "./extendedZones/index.js";
export { operationsList } from "./operations/index.js";

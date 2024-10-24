// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

export {
  createWorkloads,
  WorkloadsContext,
  WorkloadsClientOptionalParams,
} from "./workloadsContext.js";
export { operationsList } from "./operations/index.js";
export {
  sAPApplicationServerInstancesGet,
  sAPApplicationServerInstancesCreate,
  sAPApplicationServerInstancesUpdate,
  sAPApplicationServerInstancesDelete,
  sAPApplicationServerInstancesList,
  sAPApplicationServerInstancesStart,
  sAPApplicationServerInstancesStop,
} from "./sAPApplicationServerInstances/index.js";
export {
  sAPCentralServerInstancesGet,
  sAPCentralServerInstancesCreate,
  sAPCentralServerInstancesUpdate,
  sAPCentralServerInstancesDelete,
  sAPCentralServerInstancesList,
  sAPCentralServerInstancesStart,
  sAPCentralServerInstancesStop,
} from "./sAPCentralServerInstances/index.js";
export {
  sAPDatabaseInstancesGet,
  sAPDatabaseInstancesCreate,
  sAPDatabaseInstancesUpdate,
  sAPDatabaseInstancesDelete,
  sAPDatabaseInstancesList,
  sAPDatabaseInstancesStart,
  sAPDatabaseInstancesStop,
} from "./sAPDatabaseInstances/index.js";
export {
  sAPVirtualInstancesGet,
  sAPVirtualInstancesCreate,
  sAPVirtualInstancesUpdate,
  sAPVirtualInstancesDelete,
  sAPVirtualInstancesListByResourceGroup,
  sAPVirtualInstancesListBySubscription,
  sAPVirtualInstancesStart,
  sAPVirtualInstancesStop,
  sAPVirtualInstancesGetSizingRecommendations,
  sAPVirtualInstancesGetSapSupportedSku,
  sAPVirtualInstancesGetDiskConfigurations,
  sAPVirtualInstancesGetAvailabilityZoneDetails,
} from "./sAPVirtualInstances/index.js";

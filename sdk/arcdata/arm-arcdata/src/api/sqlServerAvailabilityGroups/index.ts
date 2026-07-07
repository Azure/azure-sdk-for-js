// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

export {
  removeDatabases,
  deleteMiLink,
  failoverMiLink,
  addDatabases,
  forceFailoverAllowDataLoss,
  failover,
  detailView,
  list,
  $delete,
  update,
  create,
  get,
  createManagedInstanceLink,
  createDistributedAvailabilityGroup,
  createAvailabilityGroup,
} from "./operations.js";
export type {
  SqlServerAvailabilityGroupsRemoveDatabasesOptionalParams,
  SqlServerAvailabilityGroupsDeleteMiLinkOptionalParams,
  SqlServerAvailabilityGroupsFailoverMiLinkOptionalParams,
  SqlServerAvailabilityGroupsAddDatabasesOptionalParams,
  SqlServerAvailabilityGroupsForceFailoverAllowDataLossOptionalParams,
  SqlServerAvailabilityGroupsFailoverOptionalParams,
  SqlServerAvailabilityGroupsDetailViewOptionalParams,
  SqlServerAvailabilityGroupsListOptionalParams,
  SqlServerAvailabilityGroupsDeleteOptionalParams,
  SqlServerAvailabilityGroupsUpdateOptionalParams,
  SqlServerAvailabilityGroupsCreateOptionalParams,
  SqlServerAvailabilityGroupsGetOptionalParams,
  SqlServerAvailabilityGroupsCreateManagedInstanceLinkOptionalParams,
  SqlServerAvailabilityGroupsCreateDistributedAvailabilityGroupOptionalParams,
  SqlServerAvailabilityGroupsCreateAvailabilityGroupOptionalParams,
} from "./options.js";

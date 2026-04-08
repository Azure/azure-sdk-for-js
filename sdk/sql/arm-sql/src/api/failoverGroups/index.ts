// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

export {
  tryPlannedBeforeForcedFailover,
  forceFailoverAllowDataLoss,
  failover,
  listByServer,
  $delete,
  update,
  createOrUpdate,
  get,
} from "./operations.js";
export type {
  FailoverGroupsTryPlannedBeforeForcedFailoverOptionalParams,
  FailoverGroupsForceFailoverAllowDataLossOptionalParams,
  FailoverGroupsFailoverOptionalParams,
  FailoverGroupsListByServerOptionalParams,
  FailoverGroupsDeleteOptionalParams,
  FailoverGroupsUpdateOptionalParams,
  FailoverGroupsCreateOrUpdateOptionalParams,
  FailoverGroupsGetOptionalParams,
} from "./options.js";

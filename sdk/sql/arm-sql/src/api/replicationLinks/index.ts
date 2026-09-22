// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

export {
  listByServer,
  failoverAllowDataLoss,
  failover,
  listByDatabase,
  $delete,
  update,
  createOrUpdate,
  get,
} from "./operations.js";
export type {
  ReplicationLinksListByServerOptionalParams,
  ReplicationLinksFailoverAllowDataLossOptionalParams,
  ReplicationLinksFailoverOptionalParams,
  ReplicationLinksListByDatabaseOptionalParams,
  ReplicationLinksDeleteOptionalParams,
  ReplicationLinksUpdateOptionalParams,
  ReplicationLinksCreateOrUpdateOptionalParams,
  ReplicationLinksGetOptionalParams,
} from "./options.js";

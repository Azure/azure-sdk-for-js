// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

export {
  updateImmutabilityPolicyLock,
  updateImmutabilityPolicy,
  revokeAccess,
  grantAccess,
  list,
  listByResourceGroup,
  $delete,
  update,
  createOrUpdate,
  get,
} from "./operations.js";
export type {
  SnapshotsUpdateImmutabilityPolicyLockOptionalParams,
  SnapshotsUpdateImmutabilityPolicyOptionalParams,
  SnapshotsRevokeAccessOptionalParams,
  SnapshotsGrantAccessOptionalParams,
  SnapshotsListOptionalParams,
  SnapshotsListByResourceGroupOptionalParams,
  SnapshotsDeleteOptionalParams,
  SnapshotsUpdateOptionalParams,
  SnapshotsCreateOrUpdateOptionalParams,
  SnapshotsGetOptionalParams,
} from "./options.js";

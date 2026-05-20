// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

export {
  failover,
  reconcileNSP,
  listNSP,
  getNSP,
  failback,
  list,
  listByResourceGroup,
  $delete,
  update,
  createOrUpdate,
  get,
} from "./operations.js";
export type {
  WorkspacesFailoverOptionalParams,
  WorkspacesReconcileNSPOptionalParams,
  WorkspacesListNSPOptionalParams,
  WorkspacesGetNSPOptionalParams,
  WorkspacesFailbackOptionalParams,
  WorkspacesListOptionalParams,
  WorkspacesListByResourceGroupOptionalParams,
  WorkspacesDeleteOptionalParams,
  WorkspacesUpdateOptionalParams,
  WorkspacesCreateOrUpdateOptionalParams,
  WorkspacesGetOptionalParams,
} from "./options.js";

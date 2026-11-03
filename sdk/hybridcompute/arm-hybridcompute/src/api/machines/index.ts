// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

export {
  installPatches,
  assessPatches,
  listBySubscription,
  listByResourceGroup,
  $delete,
  update,
  createOrUpdate,
  get,
} from "./operations.js";
export type {
  MachinesInstallPatchesOptionalParams,
  MachinesAssessPatchesOptionalParams,
  MachinesListBySubscriptionOptionalParams,
  MachinesListByResourceGroupOptionalParams,
  MachinesDeleteOptionalParams,
  MachinesUpdateOptionalParams,
  MachinesCreateOrUpdateOptionalParams,
  MachinesGetOptionalParams,
} from "./options.js";

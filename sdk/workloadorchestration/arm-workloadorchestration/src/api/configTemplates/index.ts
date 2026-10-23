// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

export {
  listBySubscription,
  listByResourceGroup,
  $delete,
  removeVersion,
  createVersion,
  unLinkFromHierarchies,
  linkToHierarchies,
  update,
  createOrUpdate,
  get,
} from "./operations.js";
export type {
  ConfigTemplatesListBySubscriptionOptionalParams,
  ConfigTemplatesListByResourceGroupOptionalParams,
  ConfigTemplatesDeleteOptionalParams,
  ConfigTemplatesRemoveVersionOptionalParams,
  ConfigTemplatesCreateVersionOptionalParams,
  ConfigTemplatesUnLinkFromHierarchiesOptionalParams,
  ConfigTemplatesLinkToHierarchiesOptionalParams,
  ConfigTemplatesUpdateOptionalParams,
  ConfigTemplatesCreateOrUpdateOptionalParams,
  ConfigTemplatesGetOptionalParams,
} from "./options.js";

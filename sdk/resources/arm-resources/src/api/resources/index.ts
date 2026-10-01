// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

export {
  list,
  $delete,
  update,
  createOrUpdate,
  get,
  checkExistence,
  deleteById,
  updateById,
  createOrUpdateById,
  getById,
  checkExistenceById,
  validateMoveResources,
  moveResources,
  listByResourceGroup,
} from "./operations.js";
export type {
  ResourcesListOptionalParams,
  ResourcesDeleteOptionalParams,
  ResourcesUpdateOptionalParams,
  ResourcesCreateOrUpdateOptionalParams,
  ResourcesGetOptionalParams,
  ResourcesCheckExistenceOptionalParams,
  ResourcesDeleteByIdOptionalParams,
  ResourcesUpdateByIdOptionalParams,
  ResourcesCreateOrUpdateByIdOptionalParams,
  ResourcesGetByIdOptionalParams,
  ResourcesCheckExistenceByIdOptionalParams,
  ResourcesValidateMoveResourcesOptionalParams,
  ResourcesMoveResourcesOptionalParams,
  ResourcesListByResourceGroupOptionalParams,
} from "./options.js";

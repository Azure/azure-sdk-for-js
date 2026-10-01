// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ContainerInstanceManagementContext } from "../../api/containerInstanceManagementContext.js";
import {
  $delete,
  update,
  createOrUpdate,
  get,
  listAllRevisions,
  getByRevisionNumber,
} from "../../api/cgProfile/operations.js";
import type {
  CGProfileDeleteOptionalParams,
  CGProfileUpdateOptionalParams,
  CGProfileCreateOrUpdateOptionalParams,
  CGProfileGetOptionalParams,
  CGProfileListAllRevisionsOptionalParams,
  CGProfileGetByRevisionNumberOptionalParams,
} from "../../api/cgProfile/options.js";
import type { ContainerGroupProfile, ContainerGroupProfilePatch } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a CGProfile operations. */
export interface CGProfileOperations {
  /** Deletes a container group profile. */
  delete: (
    resourceGroupName: string,
    containerGroupProfileName: string,
    options?: CGProfileDeleteOptionalParams,
  ) => Promise<void>;
  /** Update a specified container group profile. */
  update: (
    resourceGroupName: string,
    containerGroupProfileName: string,
    properties: ContainerGroupProfilePatch,
    options?: CGProfileUpdateOptionalParams,
  ) => Promise<ContainerGroupProfile>;
  /** Create a CGProfile if it doesn't exist or update an existing CGProfile. */
  createOrUpdate: (
    resourceGroupName: string,
    containerGroupProfileName: string,
    containerGroupProfile: ContainerGroupProfile,
    options?: CGProfileCreateOrUpdateOptionalParams,
  ) => Promise<ContainerGroupProfile>;
  /** Get the properties of the specified container group profile. */
  get: (
    resourceGroupName: string,
    containerGroupProfileName: string,
    options?: CGProfileGetOptionalParams,
  ) => Promise<ContainerGroupProfile>;
  /** Get a list of all the revisions of the specified container group profile in the given subscription and resource group. This operation returns properties of each revision of the specified container group profile including containers, image registry credentials, restart policy, IP address type, OS type volumes, revision number, etc. */
  listAllRevisions: (
    resourceGroupName: string,
    containerGroupProfileName: string,
    options?: CGProfileListAllRevisionsOptionalParams,
  ) => PagedAsyncIterableIterator<ContainerGroupProfile>;
  /** Gets the properties of the specified revision of the container group profile in the given subscription and resource group. The operation returns the properties of container group profile including containers, image registry credentials, restart policy, IP address type, OS type, volumes, current revision number, etc. */
  getByRevisionNumber: (
    resourceGroupName: string,
    containerGroupProfileName: string,
    revisionNumber: string,
    options?: CGProfileGetByRevisionNumberOptionalParams,
  ) => Promise<ContainerGroupProfile>;
}

function _getCGProfile(context: ContainerInstanceManagementContext) {
  return {
    delete: (
      resourceGroupName: string,
      containerGroupProfileName: string,
      options?: CGProfileDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, containerGroupProfileName, options),
    update: (
      resourceGroupName: string,
      containerGroupProfileName: string,
      properties: ContainerGroupProfilePatch,
      options?: CGProfileUpdateOptionalParams,
    ) => update(context, resourceGroupName, containerGroupProfileName, properties, options),
    createOrUpdate: (
      resourceGroupName: string,
      containerGroupProfileName: string,
      containerGroupProfile: ContainerGroupProfile,
      options?: CGProfileCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        containerGroupProfileName,
        containerGroupProfile,
        options,
      ),
    get: (
      resourceGroupName: string,
      containerGroupProfileName: string,
      options?: CGProfileGetOptionalParams,
    ) => get(context, resourceGroupName, containerGroupProfileName, options),
    listAllRevisions: (
      resourceGroupName: string,
      containerGroupProfileName: string,
      options?: CGProfileListAllRevisionsOptionalParams,
    ) => listAllRevisions(context, resourceGroupName, containerGroupProfileName, options),
    getByRevisionNumber: (
      resourceGroupName: string,
      containerGroupProfileName: string,
      revisionNumber: string,
      options?: CGProfileGetByRevisionNumberOptionalParams,
    ) =>
      getByRevisionNumber(
        context,
        resourceGroupName,
        containerGroupProfileName,
        revisionNumber,
        options,
      ),
  };
}

export function _getCGProfileOperations(
  context: ContainerInstanceManagementContext,
): CGProfileOperations {
  return {
    ..._getCGProfile(context),
  };
}

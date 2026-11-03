// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DataFactoryManagementContext } from "../../api/dataFactoryManagementContext.js";
import {
  listByFactory,
  $delete,
  createOrUpdate,
  get,
} from "../../api/linkedServices/operations.js";
import {
  LinkedServicesListByFactoryOptionalParams,
  LinkedServicesDeleteOptionalParams,
  LinkedServicesCreateOrUpdateOptionalParams,
  LinkedServicesGetOptionalParams,
} from "../../api/linkedServices/options.js";
import { LinkedServiceResource } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a LinkedServices operations. */
export interface LinkedServicesOperations {
  /** Lists linked services. */
  listByFactory: (
    resourceGroupName: string,
    factoryName: string,
    options?: LinkedServicesListByFactoryOptionalParams,
  ) => PagedAsyncIterableIterator<LinkedServiceResource>;
  /** Deletes a linked service. */
  delete: (
    resourceGroupName: string,
    factoryName: string,
    linkedServiceName: string,
    options?: LinkedServicesDeleteOptionalParams,
  ) => Promise<void>;
  /** Creates or updates a linked service. */
  createOrUpdate: (
    resourceGroupName: string,
    factoryName: string,
    linkedServiceName: string,
    linkedService: LinkedServiceResource,
    options?: LinkedServicesCreateOrUpdateOptionalParams,
  ) => Promise<LinkedServiceResource>;
  /** Gets a linked service. */
  get: (
    resourceGroupName: string,
    factoryName: string,
    linkedServiceName: string,
    options?: LinkedServicesGetOptionalParams,
  ) => Promise<LinkedServiceResource>;
}

function _getLinkedServices(context: DataFactoryManagementContext) {
  return {
    listByFactory: (
      resourceGroupName: string,
      factoryName: string,
      options?: LinkedServicesListByFactoryOptionalParams,
    ) => listByFactory(context, resourceGroupName, factoryName, options),
    delete: (
      resourceGroupName: string,
      factoryName: string,
      linkedServiceName: string,
      options?: LinkedServicesDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, factoryName, linkedServiceName, options),
    createOrUpdate: (
      resourceGroupName: string,
      factoryName: string,
      linkedServiceName: string,
      linkedService: LinkedServiceResource,
      options?: LinkedServicesCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        factoryName,
        linkedServiceName,
        linkedService,
        options,
      ),
    get: (
      resourceGroupName: string,
      factoryName: string,
      linkedServiceName: string,
      options?: LinkedServicesGetOptionalParams,
    ) => get(context, resourceGroupName, factoryName, linkedServiceName, options),
  };
}

export function _getLinkedServicesOperations(
  context: DataFactoryManagementContext,
): LinkedServicesOperations {
  return {
    ..._getLinkedServices(context),
  };
}

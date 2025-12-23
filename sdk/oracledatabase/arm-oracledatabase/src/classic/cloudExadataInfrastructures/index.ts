// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OracleDatabaseManagementContext } from "../../api/oracleDatabaseManagementContext.js";
import {
  configureExascale,
  addStorageCapacity,
  listByResourceGroup,
  $delete,
  update,
  get,
  createOrUpdate,
  listBySubscription,
} from "../../api/cloudExadataInfrastructures/operations.js";
import type {
  CloudExadataInfrastructuresConfigureExascaleOptionalParams,
  CloudExadataInfrastructuresAddStorageCapacityOptionalParams,
  CloudExadataInfrastructuresListByResourceGroupOptionalParams,
  CloudExadataInfrastructuresDeleteOptionalParams,
  CloudExadataInfrastructuresUpdateOptionalParams,
  CloudExadataInfrastructuresGetOptionalParams,
  CloudExadataInfrastructuresCreateOrUpdateOptionalParams,
  CloudExadataInfrastructuresListBySubscriptionOptionalParams,
} from "../../api/cloudExadataInfrastructures/options.js";
import type {
  CloudExadataInfrastructure,
  CloudExadataInfrastructureUpdate,
  ConfigureExascaleCloudExadataInfrastructureDetails,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a CloudExadataInfrastructures operations. */
export interface CloudExadataInfrastructuresOperations {
  /** Configures Exascale on Cloud exadata infrastructure resource */
  configureExascale: (
    resourceGroupName: string,
    cloudexadatainfrastructurename: string,
    body: ConfigureExascaleCloudExadataInfrastructureDetails,
    options?: CloudExadataInfrastructuresConfigureExascaleOptionalParams,
  ) => PollerLike<OperationState<CloudExadataInfrastructure>, CloudExadataInfrastructure>;
  /** Perform add storage capacity on exadata infra */
  addStorageCapacity: (
    resourceGroupName: string,
    cloudexadatainfrastructurename: string,
    options?: CloudExadataInfrastructuresAddStorageCapacityOptionalParams,
  ) => PollerLike<OperationState<CloudExadataInfrastructure>, CloudExadataInfrastructure>;
  /** List CloudExadataInfrastructure resources by resource group */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: CloudExadataInfrastructuresListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<CloudExadataInfrastructure>;
  /** Delete a CloudExadataInfrastructure */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    cloudexadatainfrastructurename: string,
    options?: CloudExadataInfrastructuresDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Update a CloudExadataInfrastructure */
  update: (
    resourceGroupName: string,
    cloudexadatainfrastructurename: string,
    properties: CloudExadataInfrastructureUpdate,
    options?: CloudExadataInfrastructuresUpdateOptionalParams,
  ) => PollerLike<OperationState<CloudExadataInfrastructure>, CloudExadataInfrastructure>;
  /** Get a CloudExadataInfrastructure */
  get: (
    resourceGroupName: string,
    cloudexadatainfrastructurename: string,
    options?: CloudExadataInfrastructuresGetOptionalParams,
  ) => Promise<CloudExadataInfrastructure>;
  /** Create a CloudExadataInfrastructure */
  createOrUpdate: (
    resourceGroupName: string,
    cloudexadatainfrastructurename: string,
    resource: CloudExadataInfrastructure,
    options?: CloudExadataInfrastructuresCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<CloudExadataInfrastructure>, CloudExadataInfrastructure>;
  /** List CloudExadataInfrastructure resources by subscription ID */
  listBySubscription: (
    options?: CloudExadataInfrastructuresListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<CloudExadataInfrastructure>;
}

function _getCloudExadataInfrastructures(context: OracleDatabaseManagementContext) {
  return {
    configureExascale: (
      resourceGroupName: string,
      cloudexadatainfrastructurename: string,
      body: ConfigureExascaleCloudExadataInfrastructureDetails,
      options?: CloudExadataInfrastructuresConfigureExascaleOptionalParams,
    ) =>
      configureExascale(context, resourceGroupName, cloudexadatainfrastructurename, body, options),
    addStorageCapacity: (
      resourceGroupName: string,
      cloudexadatainfrastructurename: string,
      options?: CloudExadataInfrastructuresAddStorageCapacityOptionalParams,
    ) => addStorageCapacity(context, resourceGroupName, cloudexadatainfrastructurename, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: CloudExadataInfrastructuresListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      cloudexadatainfrastructurename: string,
      options?: CloudExadataInfrastructuresDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, cloudexadatainfrastructurename, options),
    update: (
      resourceGroupName: string,
      cloudexadatainfrastructurename: string,
      properties: CloudExadataInfrastructureUpdate,
      options?: CloudExadataInfrastructuresUpdateOptionalParams,
    ) => update(context, resourceGroupName, cloudexadatainfrastructurename, properties, options),
    get: (
      resourceGroupName: string,
      cloudexadatainfrastructurename: string,
      options?: CloudExadataInfrastructuresGetOptionalParams,
    ) => get(context, resourceGroupName, cloudexadatainfrastructurename, options),
    createOrUpdate: (
      resourceGroupName: string,
      cloudexadatainfrastructurename: string,
      resource: CloudExadataInfrastructure,
      options?: CloudExadataInfrastructuresCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(context, resourceGroupName, cloudexadatainfrastructurename, resource, options),
    listBySubscription: (options?: CloudExadataInfrastructuresListBySubscriptionOptionalParams) =>
      listBySubscription(context, options),
  };
}

export function _getCloudExadataInfrastructuresOperations(
  context: OracleDatabaseManagementContext,
): CloudExadataInfrastructuresOperations {
  return {
    ..._getCloudExadataInfrastructures(context),
  };
}

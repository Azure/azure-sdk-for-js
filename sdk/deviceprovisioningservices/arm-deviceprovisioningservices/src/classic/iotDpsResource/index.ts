// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { IotDpsContext } from "../../api/iotDpsContext.js";
import {
  checkProvisioningServiceNameAvailability,
  listPrivateEndpointConnections,
  deletePrivateEndpointConnection,
  createOrUpdatePrivateEndpointConnection,
  getPrivateEndpointConnection,
  listPrivateLinkResources,
  getPrivateLinkResources,
  listKeysForKeyName,
  listKeys,
  listValidSkus,
  listBySubscription,
  listByResourceGroup,
  $delete,
  update,
  createOrUpdate,
  get,
  getOperationResult,
} from "../../api/iotDpsResource/operations.js";
import type {
  IotDpsResourceCheckProvisioningServiceNameAvailabilityOptionalParams,
  IotDpsResourceListPrivateEndpointConnectionsOptionalParams,
  IotDpsResourceDeletePrivateEndpointConnectionOptionalParams,
  IotDpsResourceCreateOrUpdatePrivateEndpointConnectionOptionalParams,
  IotDpsResourceGetPrivateEndpointConnectionOptionalParams,
  IotDpsResourceListPrivateLinkResourcesOptionalParams,
  IotDpsResourceGetPrivateLinkResourcesOptionalParams,
  IotDpsResourceListKeysForKeyNameOptionalParams,
  IotDpsResourceListKeysOptionalParams,
  IotDpsResourceListValidSkusOptionalParams,
  IotDpsResourceListBySubscriptionOptionalParams,
  IotDpsResourceListByResourceGroupOptionalParams,
  IotDpsResourceDeleteOptionalParams,
  IotDpsResourceUpdateOptionalParams,
  IotDpsResourceCreateOrUpdateOptionalParams,
  IotDpsResourceGetOptionalParams,
  IotDpsResourceGetOperationResultOptionalParams,
} from "../../api/iotDpsResource/options.js";
import type {
  AsyncOperationResult,
  ProvisioningServiceDescription,
  PrivateEndpointConnection,
  SharedAccessSignatureAuthorizationRuleAccessRightsDescription,
  TagsResource,
  IotDpsSkuDefinition,
  GroupIdInformation,
  OperationInputs,
  NameAvailabilityInfo,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a IotDpsResource operations. */
export interface IotDpsResourceOperations {
  /** Check if a provisioning service name is available. This will validate if the name is syntactically valid and if the name is usable */
  checkProvisioningServiceNameAvailability: (
    argumentsParam: OperationInputs,
    options?: IotDpsResourceCheckProvisioningServiceNameAvailabilityOptionalParams,
  ) => Promise<NameAvailabilityInfo>;
  /** List private endpoint connection properties */
  listPrivateEndpointConnections: (
    resourceGroupName: string,
    resourceName: string,
    options?: IotDpsResourceListPrivateEndpointConnectionsOptionalParams,
  ) => Promise<PrivateEndpointConnection[]>;
  /** Delete private endpoint connection with the specified name */
  deletePrivateEndpointConnection: (
    resourceGroupName: string,
    resourceName: string,
    privateEndpointConnectionName: string,
    options?: IotDpsResourceDeletePrivateEndpointConnectionOptionalParams,
  ) => PollerLike<OperationState<PrivateEndpointConnection>, PrivateEndpointConnection>;
  /** Create or update the status of a private endpoint connection with the specified name */
  createOrUpdatePrivateEndpointConnection: (
    resourceGroupName: string,
    resourceName: string,
    privateEndpointConnectionName: string,
    privateEndpointConnection: PrivateEndpointConnection,
    options?: IotDpsResourceCreateOrUpdatePrivateEndpointConnectionOptionalParams,
  ) => PollerLike<OperationState<PrivateEndpointConnection>, PrivateEndpointConnection>;
  /** Get private endpoint connection properties */
  getPrivateEndpointConnection: (
    resourceGroupName: string,
    resourceName: string,
    privateEndpointConnectionName: string,
    options?: IotDpsResourceGetPrivateEndpointConnectionOptionalParams,
  ) => Promise<PrivateEndpointConnection>;
  /** List private link resources for the given provisioning service */
  listPrivateLinkResources: (
    resourceGroupName: string,
    resourceName: string,
    options?: IotDpsResourceListPrivateLinkResourcesOptionalParams,
  ) => PagedAsyncIterableIterator<GroupIdInformation>;
  /** Get the specified private link resource for the given provisioning service */
  getPrivateLinkResources: (
    resourceGroupName: string,
    resourceName: string,
    groupId: string,
    options?: IotDpsResourceGetPrivateLinkResourcesOptionalParams,
  ) => Promise<GroupIdInformation>;
  /** List primary and secondary keys for a specific key name */
  listKeysForKeyName: (
    provisioningServiceName: string,
    keyName: string,
    resourceGroupName: string,
    options?: IotDpsResourceListKeysForKeyNameOptionalParams,
  ) => Promise<SharedAccessSignatureAuthorizationRuleAccessRightsDescription>;
  /** List the primary and secondary keys for a provisioning service. */
  listKeys: (
    provisioningServiceName: string,
    resourceGroupName: string,
    options?: IotDpsResourceListKeysOptionalParams,
  ) => PagedAsyncIterableIterator<SharedAccessSignatureAuthorizationRuleAccessRightsDescription>;
  /** Gets the list of valid SKUs and tiers for a provisioning service. */
  listValidSkus: (
    provisioningServiceName: string,
    resourceGroupName: string,
    options?: IotDpsResourceListValidSkusOptionalParams,
  ) => PagedAsyncIterableIterator<IotDpsSkuDefinition>;
  /** List all the provisioning services for a given subscription id. */
  listBySubscription: (
    options?: IotDpsResourceListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<ProvisioningServiceDescription>;
  /** Get a list of all provisioning services in the given resource group. */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: IotDpsResourceListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<ProvisioningServiceDescription>;
  /** Deletes the Provisioning Service. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    provisioningServiceName: string,
    options?: IotDpsResourceDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Update an existing provisioning service's tags. to update other fields use the CreateOrUpdate method */
  update: (
    resourceGroupName: string,
    provisioningServiceName: string,
    provisioningServiceTags: TagsResource,
    options?: IotDpsResourceUpdateOptionalParams,
  ) => PollerLike<OperationState<ProvisioningServiceDescription>, ProvisioningServiceDescription>;
  /** Create or update the metadata of the provisioning service. The usual pattern to modify a property is to retrieve the provisioning service metadata and security metadata, and then combine them with the modified values in a new body to update the provisioning service. */
  createOrUpdate: (
    resourceGroupName: string,
    provisioningServiceName: string,
    iotDpsDescription: ProvisioningServiceDescription,
    options?: IotDpsResourceCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<ProvisioningServiceDescription>, ProvisioningServiceDescription>;
  /** Get the metadata of the provisioning service without SAS keys. */
  get: (
    resourceGroupName: string,
    provisioningServiceName: string,
    options?: IotDpsResourceGetOptionalParams,
  ) => Promise<ProvisioningServiceDescription>;
  /** Gets the status of a long running operation, such as create, update or delete a provisioning service. */
  getOperationResult: (
    operationId: string,
    resourceGroupName: string,
    provisioningServiceName: string,
    asyncinfo: string,
    options?: IotDpsResourceGetOperationResultOptionalParams,
  ) => Promise<AsyncOperationResult>;
}

function _getIotDpsResource(context: IotDpsContext) {
  return {
    checkProvisioningServiceNameAvailability: (
      argumentsParam: OperationInputs,
      options?: IotDpsResourceCheckProvisioningServiceNameAvailabilityOptionalParams,
    ) => checkProvisioningServiceNameAvailability(context, argumentsParam, options),
    listPrivateEndpointConnections: (
      resourceGroupName: string,
      resourceName: string,
      options?: IotDpsResourceListPrivateEndpointConnectionsOptionalParams,
    ) => listPrivateEndpointConnections(context, resourceGroupName, resourceName, options),
    deletePrivateEndpointConnection: (
      resourceGroupName: string,
      resourceName: string,
      privateEndpointConnectionName: string,
      options?: IotDpsResourceDeletePrivateEndpointConnectionOptionalParams,
    ) =>
      deletePrivateEndpointConnection(
        context,
        resourceGroupName,
        resourceName,
        privateEndpointConnectionName,
        options,
      ),
    createOrUpdatePrivateEndpointConnection: (
      resourceGroupName: string,
      resourceName: string,
      privateEndpointConnectionName: string,
      privateEndpointConnection: PrivateEndpointConnection,
      options?: IotDpsResourceCreateOrUpdatePrivateEndpointConnectionOptionalParams,
    ) =>
      createOrUpdatePrivateEndpointConnection(
        context,
        resourceGroupName,
        resourceName,
        privateEndpointConnectionName,
        privateEndpointConnection,
        options,
      ),
    getPrivateEndpointConnection: (
      resourceGroupName: string,
      resourceName: string,
      privateEndpointConnectionName: string,
      options?: IotDpsResourceGetPrivateEndpointConnectionOptionalParams,
    ) =>
      getPrivateEndpointConnection(
        context,
        resourceGroupName,
        resourceName,
        privateEndpointConnectionName,
        options,
      ),
    listPrivateLinkResources: (
      resourceGroupName: string,
      resourceName: string,
      options?: IotDpsResourceListPrivateLinkResourcesOptionalParams,
    ) => listPrivateLinkResources(context, resourceGroupName, resourceName, options),
    getPrivateLinkResources: (
      resourceGroupName: string,
      resourceName: string,
      groupId: string,
      options?: IotDpsResourceGetPrivateLinkResourcesOptionalParams,
    ) => getPrivateLinkResources(context, resourceGroupName, resourceName, groupId, options),
    listKeysForKeyName: (
      provisioningServiceName: string,
      keyName: string,
      resourceGroupName: string,
      options?: IotDpsResourceListKeysForKeyNameOptionalParams,
    ) => listKeysForKeyName(context, provisioningServiceName, keyName, resourceGroupName, options),
    listKeys: (
      provisioningServiceName: string,
      resourceGroupName: string,
      options?: IotDpsResourceListKeysOptionalParams,
    ) => listKeys(context, provisioningServiceName, resourceGroupName, options),
    listValidSkus: (
      provisioningServiceName: string,
      resourceGroupName: string,
      options?: IotDpsResourceListValidSkusOptionalParams,
    ) => listValidSkus(context, provisioningServiceName, resourceGroupName, options),
    listBySubscription: (options?: IotDpsResourceListBySubscriptionOptionalParams) =>
      listBySubscription(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: IotDpsResourceListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      provisioningServiceName: string,
      options?: IotDpsResourceDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, provisioningServiceName, options),
    update: (
      resourceGroupName: string,
      provisioningServiceName: string,
      provisioningServiceTags: TagsResource,
      options?: IotDpsResourceUpdateOptionalParams,
    ) =>
      update(context, resourceGroupName, provisioningServiceName, provisioningServiceTags, options),
    createOrUpdate: (
      resourceGroupName: string,
      provisioningServiceName: string,
      iotDpsDescription: ProvisioningServiceDescription,
      options?: IotDpsResourceCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        provisioningServiceName,
        iotDpsDescription,
        options,
      ),
    get: (
      resourceGroupName: string,
      provisioningServiceName: string,
      options?: IotDpsResourceGetOptionalParams,
    ) => get(context, resourceGroupName, provisioningServiceName, options),
    getOperationResult: (
      operationId: string,
      resourceGroupName: string,
      provisioningServiceName: string,
      asyncinfo: string,
      options?: IotDpsResourceGetOperationResultOptionalParams,
    ) =>
      getOperationResult(
        context,
        operationId,
        resourceGroupName,
        provisioningServiceName,
        asyncinfo,
        options,
      ),
  };
}

export function _getIotDpsResourceOperations(context: IotDpsContext): IotDpsResourceOperations {
  return {
    ..._getIotDpsResource(context),
  };
}

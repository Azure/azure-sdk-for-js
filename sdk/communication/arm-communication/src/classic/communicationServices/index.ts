// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { CommunicationServiceManagementContext } from "../../api/communicationServiceManagementContext.js";
import {
  checkNameAvailability,
  regenerateKey,
  listKeys,
  linkNotificationHub,
  listBySubscription,
  listByResourceGroup,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/communicationServices/operations.js";
import type {
  CommunicationServicesCheckNameAvailabilityOptionalParams,
  CommunicationServicesRegenerateKeyOptionalParams,
  CommunicationServicesListKeysOptionalParams,
  CommunicationServicesLinkNotificationHubOptionalParams,
  CommunicationServicesListBySubscriptionOptionalParams,
  CommunicationServicesListByResourceGroupOptionalParams,
  CommunicationServicesDeleteOptionalParams,
  CommunicationServicesUpdateOptionalParams,
  CommunicationServicesCreateOrUpdateOptionalParams,
  CommunicationServicesGetOptionalParams,
} from "../../api/communicationServices/options.js";
import type {
  CommunicationServiceResource,
  CommunicationServiceResourceUpdate,
  LinkedNotificationHub,
  CommunicationServiceKeys,
  RegenerateKeyParameters,
  NameAvailabilityParameters,
  CheckNameAvailabilityResponse,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a CommunicationServices operations. */
export interface CommunicationServicesOperations {
  /** Checks that the CommunicationService name is valid and is not already in use. */
  checkNameAvailability: (
    nameAvailabilityParameters: NameAvailabilityParameters,
    options?: CommunicationServicesCheckNameAvailabilityOptionalParams,
  ) => Promise<CheckNameAvailabilityResponse>;
  /** Regenerate CommunicationService access key. PrimaryKey and SecondaryKey cannot be regenerated at the same time. */
  regenerateKey: (
    resourceGroupName: string,
    communicationServiceName: string,
    parameters: RegenerateKeyParameters,
    options?: CommunicationServicesRegenerateKeyOptionalParams,
  ) => Promise<CommunicationServiceKeys>;
  /** Get the access keys of the CommunicationService resource. */
  listKeys: (
    resourceGroupName: string,
    communicationServiceName: string,
    options?: CommunicationServicesListKeysOptionalParams,
  ) => Promise<CommunicationServiceKeys>;
  /** Links an Azure Notification Hub to this communication service. */
  linkNotificationHub: (
    resourceGroupName: string,
    communicationServiceName: string,
    options?: CommunicationServicesLinkNotificationHubOptionalParams,
  ) => Promise<LinkedNotificationHub>;
  /** Handles requests to list all resources in a subscription. */
  listBySubscription: (
    options?: CommunicationServicesListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<CommunicationServiceResource>;
  /** Handles requests to list all resources in a resource group. */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: CommunicationServicesListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<CommunicationServiceResource>;
  /** Operation to delete a CommunicationService. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    communicationServiceName: string,
    options?: CommunicationServicesDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    communicationServiceName: string,
    options?: CommunicationServicesDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    communicationServiceName: string,
    options?: CommunicationServicesDeleteOptionalParams,
  ) => Promise<void>;
  /** Operation to update an existing CommunicationService. */
  update: (
    resourceGroupName: string,
    communicationServiceName: string,
    parameters: CommunicationServiceResourceUpdate,
    options?: CommunicationServicesUpdateOptionalParams,
  ) => Promise<CommunicationServiceResource>;
  /** Create a new CommunicationService or update an existing CommunicationService. */
  createOrUpdate: (
    resourceGroupName: string,
    communicationServiceName: string,
    parameters: CommunicationServiceResource,
    options?: CommunicationServicesCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<CommunicationServiceResource>, CommunicationServiceResource>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    communicationServiceName: string,
    parameters: CommunicationServiceResource,
    options?: CommunicationServicesCreateOrUpdateOptionalParams,
  ) => Promise<
    SimplePollerLike<OperationState<CommunicationServiceResource>, CommunicationServiceResource>
  >;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    communicationServiceName: string,
    parameters: CommunicationServiceResource,
    options?: CommunicationServicesCreateOrUpdateOptionalParams,
  ) => Promise<CommunicationServiceResource>;
  /** Get the CommunicationService and its properties. */
  get: (
    resourceGroupName: string,
    communicationServiceName: string,
    options?: CommunicationServicesGetOptionalParams,
  ) => Promise<CommunicationServiceResource>;
}

function _getCommunicationServices(context: CommunicationServiceManagementContext) {
  return {
    checkNameAvailability: (
      nameAvailabilityParameters: NameAvailabilityParameters,
      options?: CommunicationServicesCheckNameAvailabilityOptionalParams,
    ) => checkNameAvailability(context, nameAvailabilityParameters, options),
    regenerateKey: (
      resourceGroupName: string,
      communicationServiceName: string,
      parameters: RegenerateKeyParameters,
      options?: CommunicationServicesRegenerateKeyOptionalParams,
    ) => regenerateKey(context, resourceGroupName, communicationServiceName, parameters, options),
    listKeys: (
      resourceGroupName: string,
      communicationServiceName: string,
      options?: CommunicationServicesListKeysOptionalParams,
    ) => listKeys(context, resourceGroupName, communicationServiceName, options),
    linkNotificationHub: (
      resourceGroupName: string,
      communicationServiceName: string,
      options?: CommunicationServicesLinkNotificationHubOptionalParams,
    ) => linkNotificationHub(context, resourceGroupName, communicationServiceName, options),
    listBySubscription: (options?: CommunicationServicesListBySubscriptionOptionalParams) =>
      listBySubscription(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: CommunicationServicesListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      communicationServiceName: string,
      options?: CommunicationServicesDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, communicationServiceName, options),
    beginDelete: async (
      resourceGroupName: string,
      communicationServiceName: string,
      options?: CommunicationServicesDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, communicationServiceName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      communicationServiceName: string,
      options?: CommunicationServicesDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, communicationServiceName, options);
    },
    update: (
      resourceGroupName: string,
      communicationServiceName: string,
      parameters: CommunicationServiceResourceUpdate,
      options?: CommunicationServicesUpdateOptionalParams,
    ) => update(context, resourceGroupName, communicationServiceName, parameters, options),
    createOrUpdate: (
      resourceGroupName: string,
      communicationServiceName: string,
      parameters: CommunicationServiceResource,
      options?: CommunicationServicesCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, communicationServiceName, parameters, options),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      communicationServiceName: string,
      parameters: CommunicationServiceResource,
      options?: CommunicationServicesCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        communicationServiceName,
        parameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      communicationServiceName: string,
      parameters: CommunicationServiceResource,
      options?: CommunicationServicesCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        communicationServiceName,
        parameters,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      communicationServiceName: string,
      options?: CommunicationServicesGetOptionalParams,
    ) => get(context, resourceGroupName, communicationServiceName, options),
  };
}

export function _getCommunicationServicesOperations(
  context: CommunicationServiceManagementContext,
): CommunicationServicesOperations {
  return {
    ..._getCommunicationServices(context),
  };
}

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureNetworkFabricManagementServiceAPIContext } from "../../api/azureNetworkFabricManagementServiceAPIContext.js";
import {
  validateConfiguration,
  resync,
  updateAdministrativeState,
  listBySubscription,
  listByResourceGroup,
  $delete,
  update,
  create,
  get,
} from "../../api/accessControlLists/operations.js";
import type {
  AccessControlListsValidateConfigurationOptionalParams,
  AccessControlListsResyncOptionalParams,
  AccessControlListsUpdateAdministrativeStateOptionalParams,
  AccessControlListsListBySubscriptionOptionalParams,
  AccessControlListsListByResourceGroupOptionalParams,
  AccessControlListsDeleteOptionalParams,
  AccessControlListsUpdateOptionalParams,
  AccessControlListsCreateOptionalParams,
  AccessControlListsGetOptionalParams,
} from "../../api/accessControlLists/options.js";
import type {
  AccessControlList,
  AccessControlListPatch,
  UpdateAdministrativeState,
  CommonPostActionResponseForStateUpdate,
  ValidateConfigurationResponse,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a AccessControlLists operations. */
export interface AccessControlListsOperations {
  /** Implements the operation to the underlying resources. */
  validateConfiguration: (
    resourceGroupName: string,
    accessControlListName: string,
    options?: AccessControlListsValidateConfigurationOptionalParams,
  ) => PollerLike<OperationState<ValidateConfigurationResponse>, ValidateConfigurationResponse>;
  /** @deprecated use validateConfiguration instead */
  beginValidateConfiguration: (
    resourceGroupName: string,
    accessControlListName: string,
    options?: AccessControlListsValidateConfigurationOptionalParams,
  ) => Promise<
    SimplePollerLike<OperationState<ValidateConfigurationResponse>, ValidateConfigurationResponse>
  >;
  /** @deprecated use validateConfiguration instead */
  beginValidateConfigurationAndWait: (
    resourceGroupName: string,
    accessControlListName: string,
    options?: AccessControlListsValidateConfigurationOptionalParams,
  ) => Promise<ValidateConfigurationResponse>;
  /** Implements the operation to the underlying resources. */
  resync: (
    resourceGroupName: string,
    accessControlListName: string,
    options?: AccessControlListsResyncOptionalParams,
  ) => PollerLike<
    OperationState<CommonPostActionResponseForStateUpdate>,
    CommonPostActionResponseForStateUpdate
  >;
  /** @deprecated use resync instead */
  beginResync: (
    resourceGroupName: string,
    accessControlListName: string,
    options?: AccessControlListsResyncOptionalParams,
  ) => Promise<
    SimplePollerLike<
      OperationState<CommonPostActionResponseForStateUpdate>,
      CommonPostActionResponseForStateUpdate
    >
  >;
  /** @deprecated use resync instead */
  beginResyncAndWait: (
    resourceGroupName: string,
    accessControlListName: string,
    options?: AccessControlListsResyncOptionalParams,
  ) => Promise<CommonPostActionResponseForStateUpdate>;
  /** Implements the operation to the underlying resources. */
  updateAdministrativeState: (
    resourceGroupName: string,
    accessControlListName: string,
    body: UpdateAdministrativeState,
    options?: AccessControlListsUpdateAdministrativeStateOptionalParams,
  ) => PollerLike<
    OperationState<CommonPostActionResponseForStateUpdate>,
    CommonPostActionResponseForStateUpdate
  >;
  /** @deprecated use updateAdministrativeState instead */
  beginUpdateAdministrativeState: (
    resourceGroupName: string,
    accessControlListName: string,
    body: UpdateAdministrativeState,
    options?: AccessControlListsUpdateAdministrativeStateOptionalParams,
  ) => Promise<
    SimplePollerLike<
      OperationState<CommonPostActionResponseForStateUpdate>,
      CommonPostActionResponseForStateUpdate
    >
  >;
  /** @deprecated use updateAdministrativeState instead */
  beginUpdateAdministrativeStateAndWait: (
    resourceGroupName: string,
    accessControlListName: string,
    body: UpdateAdministrativeState,
    options?: AccessControlListsUpdateAdministrativeStateOptionalParams,
  ) => Promise<CommonPostActionResponseForStateUpdate>;
  /** Implements AccessControlLists list by subscription GET method. */
  listBySubscription: (
    options?: AccessControlListsListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<AccessControlList>;
  /** Implements AccessControlLists list by resource group GET method. */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: AccessControlListsListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<AccessControlList>;
  /** Implements Access Control List DELETE method. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    accessControlListName: string,
    options?: AccessControlListsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    accessControlListName: string,
    options?: AccessControlListsDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    accessControlListName: string,
    options?: AccessControlListsDeleteOptionalParams,
  ) => Promise<void>;
  /** API to update certain properties of the Access Control List resource. */
  update: (
    resourceGroupName: string,
    accessControlListName: string,
    body: AccessControlListPatch,
    options?: AccessControlListsUpdateOptionalParams,
  ) => PollerLike<OperationState<AccessControlList>, AccessControlList>;
  /** @deprecated use update instead */
  beginUpdate: (
    resourceGroupName: string,
    accessControlListName: string,
    body: AccessControlListPatch,
    options?: AccessControlListsUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<AccessControlList>, AccessControlList>>;
  /** @deprecated use update instead */
  beginUpdateAndWait: (
    resourceGroupName: string,
    accessControlListName: string,
    body: AccessControlListPatch,
    options?: AccessControlListsUpdateOptionalParams,
  ) => Promise<AccessControlList>;
  /** Implements Access Control List PUT method. */
  create: (
    resourceGroupName: string,
    accessControlListName: string,
    body: AccessControlList,
    options?: AccessControlListsCreateOptionalParams,
  ) => PollerLike<OperationState<AccessControlList>, AccessControlList>;
  /** @deprecated use create instead */
  beginCreate: (
    resourceGroupName: string,
    accessControlListName: string,
    body: AccessControlList,
    options?: AccessControlListsCreateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<AccessControlList>, AccessControlList>>;
  /** @deprecated use create instead */
  beginCreateAndWait: (
    resourceGroupName: string,
    accessControlListName: string,
    body: AccessControlList,
    options?: AccessControlListsCreateOptionalParams,
  ) => Promise<AccessControlList>;
  /** Implements Access Control List GET method. */
  get: (
    resourceGroupName: string,
    accessControlListName: string,
    options?: AccessControlListsGetOptionalParams,
  ) => Promise<AccessControlList>;
}

function _getAccessControlLists(context: AzureNetworkFabricManagementServiceAPIContext) {
  return {
    validateConfiguration: (
      resourceGroupName: string,
      accessControlListName: string,
      options?: AccessControlListsValidateConfigurationOptionalParams,
    ) => validateConfiguration(context, resourceGroupName, accessControlListName, options),
    beginValidateConfiguration: async (
      resourceGroupName: string,
      accessControlListName: string,
      options?: AccessControlListsValidateConfigurationOptionalParams,
    ) => {
      const poller = validateConfiguration(
        context,
        resourceGroupName,
        accessControlListName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginValidateConfigurationAndWait: async (
      resourceGroupName: string,
      accessControlListName: string,
      options?: AccessControlListsValidateConfigurationOptionalParams,
    ) => {
      return await validateConfiguration(
        context,
        resourceGroupName,
        accessControlListName,
        options,
      );
    },
    resync: (
      resourceGroupName: string,
      accessControlListName: string,
      options?: AccessControlListsResyncOptionalParams,
    ) => resync(context, resourceGroupName, accessControlListName, options),
    beginResync: async (
      resourceGroupName: string,
      accessControlListName: string,
      options?: AccessControlListsResyncOptionalParams,
    ) => {
      const poller = resync(context, resourceGroupName, accessControlListName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginResyncAndWait: async (
      resourceGroupName: string,
      accessControlListName: string,
      options?: AccessControlListsResyncOptionalParams,
    ) => {
      return await resync(context, resourceGroupName, accessControlListName, options);
    },
    updateAdministrativeState: (
      resourceGroupName: string,
      accessControlListName: string,
      body: UpdateAdministrativeState,
      options?: AccessControlListsUpdateAdministrativeStateOptionalParams,
    ) =>
      updateAdministrativeState(context, resourceGroupName, accessControlListName, body, options),
    beginUpdateAdministrativeState: async (
      resourceGroupName: string,
      accessControlListName: string,
      body: UpdateAdministrativeState,
      options?: AccessControlListsUpdateAdministrativeStateOptionalParams,
    ) => {
      const poller = updateAdministrativeState(
        context,
        resourceGroupName,
        accessControlListName,
        body,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdateAdministrativeStateAndWait: async (
      resourceGroupName: string,
      accessControlListName: string,
      body: UpdateAdministrativeState,
      options?: AccessControlListsUpdateAdministrativeStateOptionalParams,
    ) => {
      return await updateAdministrativeState(
        context,
        resourceGroupName,
        accessControlListName,
        body,
        options,
      );
    },
    listBySubscription: (options?: AccessControlListsListBySubscriptionOptionalParams) =>
      listBySubscription(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: AccessControlListsListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      accessControlListName: string,
      options?: AccessControlListsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, accessControlListName, options),
    beginDelete: async (
      resourceGroupName: string,
      accessControlListName: string,
      options?: AccessControlListsDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, accessControlListName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      accessControlListName: string,
      options?: AccessControlListsDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, accessControlListName, options);
    },
    update: (
      resourceGroupName: string,
      accessControlListName: string,
      body: AccessControlListPatch,
      options?: AccessControlListsUpdateOptionalParams,
    ) => update(context, resourceGroupName, accessControlListName, body, options),
    beginUpdate: async (
      resourceGroupName: string,
      accessControlListName: string,
      body: AccessControlListPatch,
      options?: AccessControlListsUpdateOptionalParams,
    ) => {
      const poller = update(context, resourceGroupName, accessControlListName, body, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdateAndWait: async (
      resourceGroupName: string,
      accessControlListName: string,
      body: AccessControlListPatch,
      options?: AccessControlListsUpdateOptionalParams,
    ) => {
      return await update(context, resourceGroupName, accessControlListName, body, options);
    },
    create: (
      resourceGroupName: string,
      accessControlListName: string,
      body: AccessControlList,
      options?: AccessControlListsCreateOptionalParams,
    ) => create(context, resourceGroupName, accessControlListName, body, options),
    beginCreate: async (
      resourceGroupName: string,
      accessControlListName: string,
      body: AccessControlList,
      options?: AccessControlListsCreateOptionalParams,
    ) => {
      const poller = create(context, resourceGroupName, accessControlListName, body, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateAndWait: async (
      resourceGroupName: string,
      accessControlListName: string,
      body: AccessControlList,
      options?: AccessControlListsCreateOptionalParams,
    ) => {
      return await create(context, resourceGroupName, accessControlListName, body, options);
    },
    get: (
      resourceGroupName: string,
      accessControlListName: string,
      options?: AccessControlListsGetOptionalParams,
    ) => get(context, resourceGroupName, accessControlListName, options),
  };
}

export function _getAccessControlListsOperations(
  context: AzureNetworkFabricManagementServiceAPIContext,
): AccessControlListsOperations {
  return {
    ..._getAccessControlLists(context),
  };
}

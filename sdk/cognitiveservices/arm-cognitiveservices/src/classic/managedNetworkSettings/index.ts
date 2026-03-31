// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { CognitiveServicesManagementContext } from "../../api/cognitiveServicesManagementContext.js";
import { list, $delete, patch, put, get } from "../../api/managedNetworkSettings/operations.js";
import type {
  ManagedNetworkSettingsListOptionalParams,
  ManagedNetworkSettingsDeleteOptionalParams,
  ManagedNetworkSettingsPatchOptionalParams,
  ManagedNetworkSettingsPutOptionalParams,
  ManagedNetworkSettingsGetOptionalParams,
} from "../../api/managedNetworkSettings/options.js";
import type { ManagedNetworkSettingsPropertiesBasicResource } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a ManagedNetworkSettings operations. */
export interface ManagedNetworkSettingsOperations {
  /** List API for managed network settings of a cognitive services account. */
  list: (
    resourceGroupName: string,
    accountName: string,
    options?: ManagedNetworkSettingsListOptionalParams,
  ) => PagedAsyncIterableIterator<ManagedNetworkSettingsPropertiesBasicResource>;
  /** Delete API for managed network settings of a cognitive services account. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    accountName: string,
    managedNetworkName: string,
    options?: ManagedNetworkSettingsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    accountName: string,
    managedNetworkName: string,
    options?: ManagedNetworkSettingsDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    accountName: string,
    managedNetworkName: string,
    options?: ManagedNetworkSettingsDeleteOptionalParams,
  ) => Promise<void>;
  /** Patch API for managed network settings of a cognitive services account. */
  patch: (
    resourceGroupName: string,
    accountName: string,
    managedNetworkName: string,
    options?: ManagedNetworkSettingsPatchOptionalParams,
  ) => PollerLike<
    OperationState<ManagedNetworkSettingsPropertiesBasicResource>,
    ManagedNetworkSettingsPropertiesBasicResource
  >;
  /** @deprecated use patch instead */
  beginPatch: (
    resourceGroupName: string,
    accountName: string,
    managedNetworkName: string,
    options?: ManagedNetworkSettingsPatchOptionalParams,
  ) => Promise<
    SimplePollerLike<
      OperationState<ManagedNetworkSettingsPropertiesBasicResource>,
      ManagedNetworkSettingsPropertiesBasicResource
    >
  >;
  /** @deprecated use patch instead */
  beginPatchAndWait: (
    resourceGroupName: string,
    accountName: string,
    managedNetworkName: string,
    options?: ManagedNetworkSettingsPatchOptionalParams,
  ) => Promise<ManagedNetworkSettingsPropertiesBasicResource>;
  /** PUT API for managed network settings of a cognitive services account. */
  put: (
    resourceGroupName: string,
    accountName: string,
    managedNetworkName: string,
    body: ManagedNetworkSettingsPropertiesBasicResource,
    options?: ManagedNetworkSettingsPutOptionalParams,
  ) => PollerLike<
    OperationState<ManagedNetworkSettingsPropertiesBasicResource>,
    ManagedNetworkSettingsPropertiesBasicResource
  >;
  /** @deprecated use put instead */
  beginPut: (
    resourceGroupName: string,
    accountName: string,
    managedNetworkName: string,
    body: ManagedNetworkSettingsPropertiesBasicResource,
    options?: ManagedNetworkSettingsPutOptionalParams,
  ) => Promise<
    SimplePollerLike<
      OperationState<ManagedNetworkSettingsPropertiesBasicResource>,
      ManagedNetworkSettingsPropertiesBasicResource
    >
  >;
  /** @deprecated use put instead */
  beginPutAndWait: (
    resourceGroupName: string,
    accountName: string,
    managedNetworkName: string,
    body: ManagedNetworkSettingsPropertiesBasicResource,
    options?: ManagedNetworkSettingsPutOptionalParams,
  ) => Promise<ManagedNetworkSettingsPropertiesBasicResource>;
  /** Get API for managed network settings of a cognitive services account. */
  get: (
    resourceGroupName: string,
    accountName: string,
    managedNetworkName: string,
    options?: ManagedNetworkSettingsGetOptionalParams,
  ) => Promise<ManagedNetworkSettingsPropertiesBasicResource>;
}

function _getManagedNetworkSettings(context: CognitiveServicesManagementContext) {
  return {
    list: (
      resourceGroupName: string,
      accountName: string,
      options?: ManagedNetworkSettingsListOptionalParams,
    ) => list(context, resourceGroupName, accountName, options),
    delete: (
      resourceGroupName: string,
      accountName: string,
      managedNetworkName: string,
      options?: ManagedNetworkSettingsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, accountName, managedNetworkName, options),
    beginDelete: async (
      resourceGroupName: string,
      accountName: string,
      managedNetworkName: string,
      options?: ManagedNetworkSettingsDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, accountName, managedNetworkName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      accountName: string,
      managedNetworkName: string,
      options?: ManagedNetworkSettingsDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, accountName, managedNetworkName, options);
    },
    patch: (
      resourceGroupName: string,
      accountName: string,
      managedNetworkName: string,
      options?: ManagedNetworkSettingsPatchOptionalParams,
    ) => patch(context, resourceGroupName, accountName, managedNetworkName, options),
    beginPatch: async (
      resourceGroupName: string,
      accountName: string,
      managedNetworkName: string,
      options?: ManagedNetworkSettingsPatchOptionalParams,
    ) => {
      const poller = patch(context, resourceGroupName, accountName, managedNetworkName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginPatchAndWait: async (
      resourceGroupName: string,
      accountName: string,
      managedNetworkName: string,
      options?: ManagedNetworkSettingsPatchOptionalParams,
    ) => {
      return await patch(context, resourceGroupName, accountName, managedNetworkName, options);
    },
    put: (
      resourceGroupName: string,
      accountName: string,
      managedNetworkName: string,
      body: ManagedNetworkSettingsPropertiesBasicResource,
      options?: ManagedNetworkSettingsPutOptionalParams,
    ) => put(context, resourceGroupName, accountName, managedNetworkName, body, options),
    beginPut: async (
      resourceGroupName: string,
      accountName: string,
      managedNetworkName: string,
      body: ManagedNetworkSettingsPropertiesBasicResource,
      options?: ManagedNetworkSettingsPutOptionalParams,
    ) => {
      const poller = put(
        context,
        resourceGroupName,
        accountName,
        managedNetworkName,
        body,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginPutAndWait: async (
      resourceGroupName: string,
      accountName: string,
      managedNetworkName: string,
      body: ManagedNetworkSettingsPropertiesBasicResource,
      options?: ManagedNetworkSettingsPutOptionalParams,
    ) => {
      return await put(context, resourceGroupName, accountName, managedNetworkName, body, options);
    },
    get: (
      resourceGroupName: string,
      accountName: string,
      managedNetworkName: string,
      options?: ManagedNetworkSettingsGetOptionalParams,
    ) => get(context, resourceGroupName, accountName, managedNetworkName, options),
  };
}

export function _getManagedNetworkSettingsOperations(
  context: CognitiveServicesManagementContext,
): ManagedNetworkSettingsOperations {
  return {
    ..._getManagedNetworkSettings(context),
  };
}

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AppConfigurationManagementContext } from "../../api/appConfigurationManagementContext.js";
import { $delete, createOrUpdate, get } from "../../api/keyValues/operations.js";
import type {
  KeyValuesDeleteOptionalParams,
  KeyValuesCreateOrUpdateOptionalParams,
  KeyValuesGetOptionalParams,
} from "../../api/keyValues/options.js";
import type { KeyValue } from "../../models/models.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a KeyValues operations. */
export interface KeyValuesOperations {
  /** Deletes a key-value. NOTE: This operation is intended for use in ARM Template deployments. For all other scenarios involving App Configuration key-values the data plane API should be used instead. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    configStoreName: string,
    keyValueName: string,
    options?: KeyValuesDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    configStoreName: string,
    keyValueName: string,
    options?: KeyValuesDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    configStoreName: string,
    keyValueName: string,
    options?: KeyValuesDeleteOptionalParams,
  ) => Promise<void>;
  /** Creates a key-value. NOTE: This operation is intended for use in ARM Template deployments. For all other scenarios involving App Configuration key-values the data plane API should be used instead. */
  createOrUpdate: (
    resourceGroupName: string,
    configStoreName: string,
    keyValueName: string,
    keyValueParameters: KeyValue,
    options?: KeyValuesCreateOrUpdateOptionalParams,
  ) => Promise<KeyValue>;
  /** Gets the properties of the specified key-value. NOTE: This operation is intended for use in ARM Template deployments. For all other scenarios involving App Configuration key-values the data plane API should be used instead. */
  get: (
    resourceGroupName: string,
    configStoreName: string,
    keyValueName: string,
    options?: KeyValuesGetOptionalParams,
  ) => Promise<KeyValue>;
}

function _getKeyValues(context: AppConfigurationManagementContext) {
  return {
    delete: (
      resourceGroupName: string,
      configStoreName: string,
      keyValueName: string,
      options?: KeyValuesDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, configStoreName, keyValueName, options),
    beginDelete: async (
      resourceGroupName: string,
      configStoreName: string,
      keyValueName: string,
      options?: KeyValuesDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, configStoreName, keyValueName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      configStoreName: string,
      keyValueName: string,
      options?: KeyValuesDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, configStoreName, keyValueName, options);
    },
    createOrUpdate: (
      resourceGroupName: string,
      configStoreName: string,
      keyValueName: string,
      keyValueParameters: KeyValue,
      options?: KeyValuesCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        configStoreName,
        keyValueName,
        keyValueParameters,
        options,
      ),
    get: (
      resourceGroupName: string,
      configStoreName: string,
      keyValueName: string,
      options?: KeyValuesGetOptionalParams,
    ) => get(context, resourceGroupName, configStoreName, keyValueName, options),
  };
}

export function _getKeyValuesOperations(
  context: AppConfigurationManagementContext,
): KeyValuesOperations {
  return {
    ..._getKeyValues(context),
  };
}

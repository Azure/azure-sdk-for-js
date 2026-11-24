// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SqlManagementContext } from "../../api/sqlManagementContext.js";
import {
  listByInstance,
  createOrUpdate,
  get,
} from "../../api/managedInstanceAdvancedThreatProtectionSettings/operations.js";
import type {
  ManagedInstanceAdvancedThreatProtectionSettingsListByInstanceOptionalParams,
  ManagedInstanceAdvancedThreatProtectionSettingsCreateOrUpdateOptionalParams,
  ManagedInstanceAdvancedThreatProtectionSettingsGetOptionalParams,
} from "../../api/managedInstanceAdvancedThreatProtectionSettings/options.js";
import type {
  AdvancedThreatProtectionName,
  ManagedInstanceAdvancedThreatProtection,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a ManagedInstanceAdvancedThreatProtectionSettings operations. */
export interface ManagedInstanceAdvancedThreatProtectionSettingsOperations {
  /** Get the managed instance's Advanced Threat Protection settings. */
  listByInstance: (
    resourceGroupName: string,
    managedInstanceName: string,
    options?: ManagedInstanceAdvancedThreatProtectionSettingsListByInstanceOptionalParams,
  ) => PagedAsyncIterableIterator<ManagedInstanceAdvancedThreatProtection>;
  /** Creates or updates Advanced Threat Protection settings. */
  createOrUpdate: (
    resourceGroupName: string,
    managedInstanceName: string,
    advancedThreatProtectionName: AdvancedThreatProtectionName,
    parameters: ManagedInstanceAdvancedThreatProtection,
    options?: ManagedInstanceAdvancedThreatProtectionSettingsCreateOrUpdateOptionalParams,
  ) => PollerLike<
    OperationState<ManagedInstanceAdvancedThreatProtection>,
    ManagedInstanceAdvancedThreatProtection
  >;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    managedInstanceName: string,
    advancedThreatProtectionName: AdvancedThreatProtectionName,
    parameters: ManagedInstanceAdvancedThreatProtection,
    options?: ManagedInstanceAdvancedThreatProtectionSettingsCreateOrUpdateOptionalParams,
  ) => Promise<
    SimplePollerLike<
      OperationState<ManagedInstanceAdvancedThreatProtection>,
      ManagedInstanceAdvancedThreatProtection
    >
  >;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    managedInstanceName: string,
    advancedThreatProtectionName: AdvancedThreatProtectionName,
    parameters: ManagedInstanceAdvancedThreatProtection,
    options?: ManagedInstanceAdvancedThreatProtectionSettingsCreateOrUpdateOptionalParams,
  ) => Promise<ManagedInstanceAdvancedThreatProtection>;
  /** Get a managed instance's Advanced Threat Protection state. */
  get: (
    resourceGroupName: string,
    managedInstanceName: string,
    advancedThreatProtectionName: AdvancedThreatProtectionName,
    options?: ManagedInstanceAdvancedThreatProtectionSettingsGetOptionalParams,
  ) => Promise<ManagedInstanceAdvancedThreatProtection>;
}

function _getManagedInstanceAdvancedThreatProtectionSettings(context: SqlManagementContext) {
  return {
    listByInstance: (
      resourceGroupName: string,
      managedInstanceName: string,
      options?: ManagedInstanceAdvancedThreatProtectionSettingsListByInstanceOptionalParams,
    ) => listByInstance(context, resourceGroupName, managedInstanceName, options),
    createOrUpdate: (
      resourceGroupName: string,
      managedInstanceName: string,
      advancedThreatProtectionName: AdvancedThreatProtectionName,
      parameters: ManagedInstanceAdvancedThreatProtection,
      options?: ManagedInstanceAdvancedThreatProtectionSettingsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        managedInstanceName,
        advancedThreatProtectionName,
        parameters,
        options,
      ),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      managedInstanceName: string,
      advancedThreatProtectionName: AdvancedThreatProtectionName,
      parameters: ManagedInstanceAdvancedThreatProtection,
      options?: ManagedInstanceAdvancedThreatProtectionSettingsCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        managedInstanceName,
        advancedThreatProtectionName,
        parameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      managedInstanceName: string,
      advancedThreatProtectionName: AdvancedThreatProtectionName,
      parameters: ManagedInstanceAdvancedThreatProtection,
      options?: ManagedInstanceAdvancedThreatProtectionSettingsCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        managedInstanceName,
        advancedThreatProtectionName,
        parameters,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      managedInstanceName: string,
      advancedThreatProtectionName: AdvancedThreatProtectionName,
      options?: ManagedInstanceAdvancedThreatProtectionSettingsGetOptionalParams,
    ) =>
      get(context, resourceGroupName, managedInstanceName, advancedThreatProtectionName, options),
  };
}

export function _getManagedInstanceAdvancedThreatProtectionSettingsOperations(
  context: SqlManagementContext,
): ManagedInstanceAdvancedThreatProtectionSettingsOperations {
  return {
    ..._getManagedInstanceAdvancedThreatProtectionSettings(context),
  };
}

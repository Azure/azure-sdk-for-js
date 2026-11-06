// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureResilienceManagementContext } from "../../api/azureResilienceManagementContext.js";
import {
  $delete,
  list,
  update,
  createOrUpdate,
  get,
} from "../../api/recoveryConfigProfiles/operations.js";
import type {
  RecoveryConfigProfilesDeleteOptionalParams,
  RecoveryConfigProfilesListOptionalParams,
  RecoveryConfigProfilesUpdateOptionalParams,
  RecoveryConfigProfilesCreateOrUpdateOptionalParams,
  RecoveryConfigProfilesGetOptionalParams,
} from "../../api/recoveryConfigProfiles/options.js";
import type {
  RecoveryConfigProfile,
  RecoveryConfigProfileCreateOrUpdate,
  RecoveryConfigProfileUpdate,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a RecoveryConfigProfiles operations. */
export interface RecoveryConfigProfilesOperations {
  /** Deletes a recovery configuration profile. */
  delete: (
    serviceGroupName: string,
    recoveryPlanName: string,
    recoveryConfigProfileName: string,
    options?: RecoveryConfigProfilesDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    serviceGroupName: string,
    recoveryPlanName: string,
    recoveryConfigProfileName: string,
    options?: RecoveryConfigProfilesDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    serviceGroupName: string,
    recoveryPlanName: string,
    recoveryConfigProfileName: string,
    options?: RecoveryConfigProfilesDeleteOptionalParams,
  ) => Promise<void>;
  /** Lists recovery configuration profiles under a recovery plan. */
  list: (
    serviceGroupName: string,
    recoveryPlanName: string,
    options?: RecoveryConfigProfilesListOptionalParams,
  ) => PagedAsyncIterableIterator<RecoveryConfigProfile>;
  /** Updates a recovery configuration profile. Omitted fields remain unchanged. */
  update: (
    serviceGroupName: string,
    recoveryPlanName: string,
    recoveryConfigProfileName: string,
    properties: RecoveryConfigProfileUpdate,
    options?: RecoveryConfigProfilesUpdateOptionalParams,
  ) => PollerLike<OperationState<RecoveryConfigProfile>, RecoveryConfigProfile>;
  /** @deprecated use update instead */
  beginUpdate: (
    serviceGroupName: string,
    recoveryPlanName: string,
    recoveryConfigProfileName: string,
    properties: RecoveryConfigProfileUpdate,
    options?: RecoveryConfigProfilesUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<RecoveryConfigProfile>, RecoveryConfigProfile>>;
  /** @deprecated use update instead */
  beginUpdateAndWait: (
    serviceGroupName: string,
    recoveryPlanName: string,
    recoveryConfigProfileName: string,
    properties: RecoveryConfigProfileUpdate,
    options?: RecoveryConfigProfilesUpdateOptionalParams,
  ) => Promise<RecoveryConfigProfile>;
  /** Creates or replaces a recovery configuration profile. */
  createOrUpdate: (
    serviceGroupName: string,
    recoveryPlanName: string,
    recoveryConfigProfileName: string,
    resource: RecoveryConfigProfileCreateOrUpdate,
    options?: RecoveryConfigProfilesCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<RecoveryConfigProfile>, RecoveryConfigProfile>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    serviceGroupName: string,
    recoveryPlanName: string,
    recoveryConfigProfileName: string,
    resource: RecoveryConfigProfileCreateOrUpdate,
    options?: RecoveryConfigProfilesCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<RecoveryConfigProfile>, RecoveryConfigProfile>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    serviceGroupName: string,
    recoveryPlanName: string,
    recoveryConfigProfileName: string,
    resource: RecoveryConfigProfileCreateOrUpdate,
    options?: RecoveryConfigProfilesCreateOrUpdateOptionalParams,
  ) => Promise<RecoveryConfigProfile>;
  /** Gets a recovery configuration profile. */
  get: (
    serviceGroupName: string,
    recoveryPlanName: string,
    recoveryConfigProfileName: string,
    options?: RecoveryConfigProfilesGetOptionalParams,
  ) => Promise<RecoveryConfigProfile>;
}

function _getRecoveryConfigProfiles(context: AzureResilienceManagementContext) {
  return {
    delete: (
      serviceGroupName: string,
      recoveryPlanName: string,
      recoveryConfigProfileName: string,
      options?: RecoveryConfigProfilesDeleteOptionalParams,
    ) => $delete(context, serviceGroupName, recoveryPlanName, recoveryConfigProfileName, options),
    beginDelete: async (
      serviceGroupName: string,
      recoveryPlanName: string,
      recoveryConfigProfileName: string,
      options?: RecoveryConfigProfilesDeleteOptionalParams,
    ) => {
      const poller = $delete(
        context,
        serviceGroupName,
        recoveryPlanName,
        recoveryConfigProfileName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      serviceGroupName: string,
      recoveryPlanName: string,
      recoveryConfigProfileName: string,
      options?: RecoveryConfigProfilesDeleteOptionalParams,
    ) => {
      return await $delete(
        context,
        serviceGroupName,
        recoveryPlanName,
        recoveryConfigProfileName,
        options,
      );
    },
    list: (
      serviceGroupName: string,
      recoveryPlanName: string,
      options?: RecoveryConfigProfilesListOptionalParams,
    ) => list(context, serviceGroupName, recoveryPlanName, options),
    update: (
      serviceGroupName: string,
      recoveryPlanName: string,
      recoveryConfigProfileName: string,
      properties: RecoveryConfigProfileUpdate,
      options?: RecoveryConfigProfilesUpdateOptionalParams,
    ) =>
      update(
        context,
        serviceGroupName,
        recoveryPlanName,
        recoveryConfigProfileName,
        properties,
        options,
      ),
    beginUpdate: async (
      serviceGroupName: string,
      recoveryPlanName: string,
      recoveryConfigProfileName: string,
      properties: RecoveryConfigProfileUpdate,
      options?: RecoveryConfigProfilesUpdateOptionalParams,
    ) => {
      const poller = update(
        context,
        serviceGroupName,
        recoveryPlanName,
        recoveryConfigProfileName,
        properties,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdateAndWait: async (
      serviceGroupName: string,
      recoveryPlanName: string,
      recoveryConfigProfileName: string,
      properties: RecoveryConfigProfileUpdate,
      options?: RecoveryConfigProfilesUpdateOptionalParams,
    ) => {
      return await update(
        context,
        serviceGroupName,
        recoveryPlanName,
        recoveryConfigProfileName,
        properties,
        options,
      );
    },
    createOrUpdate: (
      serviceGroupName: string,
      recoveryPlanName: string,
      recoveryConfigProfileName: string,
      resource: RecoveryConfigProfileCreateOrUpdate,
      options?: RecoveryConfigProfilesCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        serviceGroupName,
        recoveryPlanName,
        recoveryConfigProfileName,
        resource,
        options,
      ),
    beginCreateOrUpdate: async (
      serviceGroupName: string,
      recoveryPlanName: string,
      recoveryConfigProfileName: string,
      resource: RecoveryConfigProfileCreateOrUpdate,
      options?: RecoveryConfigProfilesCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        serviceGroupName,
        recoveryPlanName,
        recoveryConfigProfileName,
        resource,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      serviceGroupName: string,
      recoveryPlanName: string,
      recoveryConfigProfileName: string,
      resource: RecoveryConfigProfileCreateOrUpdate,
      options?: RecoveryConfigProfilesCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        serviceGroupName,
        recoveryPlanName,
        recoveryConfigProfileName,
        resource,
        options,
      );
    },
    get: (
      serviceGroupName: string,
      recoveryPlanName: string,
      recoveryConfigProfileName: string,
      options?: RecoveryConfigProfilesGetOptionalParams,
    ) => get(context, serviceGroupName, recoveryPlanName, recoveryConfigProfileName, options),
  };
}

export function _getRecoveryConfigProfilesOperations(
  context: AzureResilienceManagementContext,
): RecoveryConfigProfilesOperations {
  return {
    ..._getRecoveryConfigProfiles(context),
  };
}

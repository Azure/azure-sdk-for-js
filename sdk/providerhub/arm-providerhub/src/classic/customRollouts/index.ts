// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ProviderHubContext } from "../../api/providerHubContext.js";
import {
  stop,
  listByProviderRegistration,
  $delete,
  createOrUpdate,
  get,
} from "../../api/customRollouts/operations.js";
import type {
  CustomRolloutsStopOptionalParams,
  CustomRolloutsListByProviderRegistrationOptionalParams,
  CustomRolloutsDeleteOptionalParams,
  CustomRolloutsCreateOrUpdateOptionalParams,
  CustomRolloutsGetOptionalParams,
} from "../../api/customRollouts/options.js";
import type { CustomRollout } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a CustomRollouts operations. */
export interface CustomRolloutsOperations {
  /** Stops or cancels the custom rollout, if in progress. */
  stop: (
    providerNamespace: string,
    rolloutName: string,
    options?: CustomRolloutsStopOptionalParams,
  ) => Promise<void>;
  /** Gets the list of the custom rollouts for the given provider. */
  listByProviderRegistration: (
    providerNamespace: string,
    options?: CustomRolloutsListByProviderRegistrationOptionalParams,
  ) => PagedAsyncIterableIterator<CustomRollout>;
  /** Deletes the custom rollout resource. Custom rollout must be in terminal state. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    providerNamespace: string,
    rolloutName: string,
    options?: CustomRolloutsDeleteOptionalParams,
  ) => Promise<void>;
  /** Creates or updates the rollout details. */
  createOrUpdate: (
    providerNamespace: string,
    rolloutName: string,
    properties: CustomRollout,
    options?: CustomRolloutsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<CustomRollout>, CustomRollout>;
  /** Gets the custom rollout details. */
  get: (
    providerNamespace: string,
    rolloutName: string,
    options?: CustomRolloutsGetOptionalParams,
  ) => Promise<CustomRollout>;
}

function _getCustomRollouts(context: ProviderHubContext) {
  return {
    stop: (
      providerNamespace: string,
      rolloutName: string,
      options?: CustomRolloutsStopOptionalParams,
    ) => stop(context, providerNamespace, rolloutName, options),
    listByProviderRegistration: (
      providerNamespace: string,
      options?: CustomRolloutsListByProviderRegistrationOptionalParams,
    ) => listByProviderRegistration(context, providerNamespace, options),
    delete: (
      providerNamespace: string,
      rolloutName: string,
      options?: CustomRolloutsDeleteOptionalParams,
    ) => $delete(context, providerNamespace, rolloutName, options),
    createOrUpdate: (
      providerNamespace: string,
      rolloutName: string,
      properties: CustomRollout,
      options?: CustomRolloutsCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, providerNamespace, rolloutName, properties, options),
    get: (
      providerNamespace: string,
      rolloutName: string,
      options?: CustomRolloutsGetOptionalParams,
    ) => get(context, providerNamespace, rolloutName, options),
  };
}

export function _getCustomRolloutsOperations(
  context: ProviderHubContext,
): CustomRolloutsOperations {
  return {
    ..._getCustomRollouts(context),
  };
}

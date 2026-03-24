// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ProviderHubContext } from "../../api/providerHubContext.js";
import {
  stop,
  listByProviderRegistration,
  $delete,
  createOrUpdate,
  get,
} from "../../api/defaultRollouts/operations.js";
import type {
  DefaultRolloutsStopOptionalParams,
  DefaultRolloutsListByProviderRegistrationOptionalParams,
  DefaultRolloutsDeleteOptionalParams,
  DefaultRolloutsCreateOrUpdateOptionalParams,
  DefaultRolloutsGetOptionalParams,
} from "../../api/defaultRollouts/options.js";
import type { DefaultRollout } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a DefaultRollouts operations. */
export interface DefaultRolloutsOperations {
  /** Stops or cancels the rollout, if in progress. */
  stop: (
    providerNamespace: string,
    rolloutName: string,
    options?: DefaultRolloutsStopOptionalParams,
  ) => Promise<void>;
  /** Gets the list of the rollouts for the given provider. */
  listByProviderRegistration: (
    providerNamespace: string,
    options?: DefaultRolloutsListByProviderRegistrationOptionalParams,
  ) => PagedAsyncIterableIterator<DefaultRollout>;
  /** Deletes the rollout resource. Rollout must be in terminal state. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    providerNamespace: string,
    rolloutName: string,
    options?: DefaultRolloutsDeleteOptionalParams,
  ) => Promise<void>;
  /** Creates or updates the rollout details. */
  createOrUpdate: (
    providerNamespace: string,
    rolloutName: string,
    properties: DefaultRollout,
    options?: DefaultRolloutsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<DefaultRollout>, DefaultRollout>;
  /** Gets the default rollout details. */
  get: (
    providerNamespace: string,
    rolloutName: string,
    options?: DefaultRolloutsGetOptionalParams,
  ) => Promise<DefaultRollout>;
}

function _getDefaultRollouts(context: ProviderHubContext) {
  return {
    stop: (
      providerNamespace: string,
      rolloutName: string,
      options?: DefaultRolloutsStopOptionalParams,
    ) => stop(context, providerNamespace, rolloutName, options),
    listByProviderRegistration: (
      providerNamespace: string,
      options?: DefaultRolloutsListByProviderRegistrationOptionalParams,
    ) => listByProviderRegistration(context, providerNamespace, options),
    delete: (
      providerNamespace: string,
      rolloutName: string,
      options?: DefaultRolloutsDeleteOptionalParams,
    ) => $delete(context, providerNamespace, rolloutName, options),
    createOrUpdate: (
      providerNamespace: string,
      rolloutName: string,
      properties: DefaultRollout,
      options?: DefaultRolloutsCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, providerNamespace, rolloutName, properties, options),
    get: (
      providerNamespace: string,
      rolloutName: string,
      options?: DefaultRolloutsGetOptionalParams,
    ) => get(context, providerNamespace, rolloutName, options),
  };
}

export function _getDefaultRolloutsOperations(
  context: ProviderHubContext,
): DefaultRolloutsOperations {
  return {
    ..._getDefaultRollouts(context),
  };
}

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { CognitiveServicesManagementContext } from "../../api/cognitiveServicesManagementContext.js";
import { $delete, createOrUpdate, get } from "../../api/raiExternalSafetyProvider/operations.js";
import type {
  RaiExternalSafetyProviderDeleteOptionalParams,
  RaiExternalSafetyProviderCreateOrUpdateOptionalParams,
  RaiExternalSafetyProviderGetOptionalParams,
} from "../../api/raiExternalSafetyProvider/options.js";
import type {
  RaiExternalSafetyProviderSchema,
  RaiExternalSafetyProviderCreateOrUpdateResponse,
} from "../../models/models.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a RaiExternalSafetyProvider operations. */
export interface RaiExternalSafetyProviderOperations {
  /** Deletes the specified custom topic associated with the subscription. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    safetyProviderName: string,
    options?: RaiExternalSafetyProviderDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    safetyProviderName: string,
    options?: RaiExternalSafetyProviderDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    safetyProviderName: string,
    options?: RaiExternalSafetyProviderDeleteOptionalParams,
  ) => Promise<void>;
  /** Create the rai safety provider associated with the subscription. */
  createOrUpdate: (
    safetyProviderName: string,
    safetyProvider: RaiExternalSafetyProviderSchema,
    options?: RaiExternalSafetyProviderCreateOrUpdateOptionalParams,
  ) => Promise<RaiExternalSafetyProviderCreateOrUpdateResponse>;
  /** Gets the specified external safety provider associated with the Subscription */
  get: (
    safetyProviderName: string,
    options?: RaiExternalSafetyProviderGetOptionalParams,
  ) => Promise<RaiExternalSafetyProviderSchema>;
}

function _getRaiExternalSafetyProvider(context: CognitiveServicesManagementContext) {
  return {
    delete: (safetyProviderName: string, options?: RaiExternalSafetyProviderDeleteOptionalParams) =>
      $delete(context, safetyProviderName, options),
    beginDelete: async (
      safetyProviderName: string,
      options?: RaiExternalSafetyProviderDeleteOptionalParams,
    ) => {
      const poller = $delete(context, safetyProviderName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      safetyProviderName: string,
      options?: RaiExternalSafetyProviderDeleteOptionalParams,
    ) => {
      return await $delete(context, safetyProviderName, options);
    },
    createOrUpdate: (
      safetyProviderName: string,
      safetyProvider: RaiExternalSafetyProviderSchema,
      options?: RaiExternalSafetyProviderCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, safetyProviderName, safetyProvider, options),
    get: (safetyProviderName: string, options?: RaiExternalSafetyProviderGetOptionalParams) =>
      get(context, safetyProviderName, options),
  };
}

export function _getRaiExternalSafetyProviderOperations(
  context: CognitiveServicesManagementContext,
): RaiExternalSafetyProviderOperations {
  return {
    ..._getRaiExternalSafetyProvider(context),
  };
}

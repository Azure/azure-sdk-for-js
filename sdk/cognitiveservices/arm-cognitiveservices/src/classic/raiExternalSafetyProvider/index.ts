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

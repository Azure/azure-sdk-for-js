// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { CognitiveServicesManagementContext } from "../../api/cognitiveServicesManagementContext.js";
import { list, $delete, createOrUpdate, get } from "../../api/raiRegos/operations.js";
import type {
  RaiRegosListOptionalParams,
  RaiRegosDeleteOptionalParams,
  RaiRegosCreateOrUpdateOptionalParams,
  RaiRegosGetOptionalParams,
} from "../../api/raiRegos/options.js";
import type { RaiRego } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a RaiRegos operations. */
export interface RaiRegosOperations {
  /** Lists reusable Rego artifacts on an account. */
  list: (
    resourceGroupName: string,
    accountName: string,
    options?: RaiRegosListOptionalParams,
  ) => PagedAsyncIterableIterator<RaiRego>;
  /** Deletes one reusable Rego artifact. */
  delete: (
    resourceGroupName: string,
    accountName: string,
    raiRegoName: string,
    options?: RaiRegosDeleteOptionalParams,
  ) => Promise<void>;
  /** Creates or replaces one reusable Rego artifact. */
  createOrUpdate: (
    resourceGroupName: string,
    accountName: string,
    raiRegoName: string,
    raiRego: RaiRego,
    options?: RaiRegosCreateOrUpdateOptionalParams,
  ) => Promise<RaiRego>;
  /** Gets one reusable Rego artifact. */
  get: (
    resourceGroupName: string,
    accountName: string,
    raiRegoName: string,
    options?: RaiRegosGetOptionalParams,
  ) => Promise<RaiRego>;
}

function _getRaiRegos(context: CognitiveServicesManagementContext) {
  return {
    list: (resourceGroupName: string, accountName: string, options?: RaiRegosListOptionalParams) =>
      list(context, resourceGroupName, accountName, options),
    delete: (
      resourceGroupName: string,
      accountName: string,
      raiRegoName: string,
      options?: RaiRegosDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, accountName, raiRegoName, options),
    createOrUpdate: (
      resourceGroupName: string,
      accountName: string,
      raiRegoName: string,
      raiRego: RaiRego,
      options?: RaiRegosCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, accountName, raiRegoName, raiRego, options),
    get: (
      resourceGroupName: string,
      accountName: string,
      raiRegoName: string,
      options?: RaiRegosGetOptionalParams,
    ) => get(context, resourceGroupName, accountName, raiRegoName, options),
  };
}

export function _getRaiRegosOperations(
  context: CognitiveServicesManagementContext,
): RaiRegosOperations {
  return {
    ..._getRaiRegos(context),
  };
}

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { CognitiveServicesManagementContext } from "../../api/cognitiveServicesManagementContext.js";
import { list, $delete, createOrUpdate, get } from "../../api/raiToolLabels/operations.js";
import type {
  RaiToolLabelsListOptionalParams,
  RaiToolLabelsDeleteOptionalParams,
  RaiToolLabelsCreateOrUpdateOptionalParams,
  RaiToolLabelsGetOptionalParams,
} from "../../api/raiToolLabels/options.js";
import type { RaiToolLabel } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a RaiToolLabels operations. */
export interface RaiToolLabelsOperations {
  /** Lists all RAI Tool Labels associated with the Azure OpenAI account. */
  list: (
    resourceGroupName: string,
    accountName: string,
    options?: RaiToolLabelsListOptionalParams,
  ) => PagedAsyncIterableIterator<RaiToolLabel>;
  /** Deletes the specified RAI Tool Label associated with the Azure OpenAI account. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    accountName: string,
    raiToolConnectionName: string,
    options?: RaiToolLabelsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    accountName: string,
    raiToolConnectionName: string,
    options?: RaiToolLabelsDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    accountName: string,
    raiToolConnectionName: string,
    options?: RaiToolLabelsDeleteOptionalParams,
  ) => Promise<void>;
  /** Creates the RAI Tool Label associated with the Azure OpenAI account. */
  createOrUpdate: (
    resourceGroupName: string,
    accountName: string,
    raiToolConnectionName: string,
    raiToolLabel: RaiToolLabel,
    options?: RaiToolLabelsCreateOrUpdateOptionalParams,
  ) => Promise<RaiToolLabel>;
  /** Gets the specified RAI Tool Label associated with the Azure OpenAI account. */
  get: (
    resourceGroupName: string,
    accountName: string,
    raiToolConnectionName: string,
    options?: RaiToolLabelsGetOptionalParams,
  ) => Promise<RaiToolLabel>;
}

function _getRaiToolLabels(context: CognitiveServicesManagementContext) {
  return {
    list: (
      resourceGroupName: string,
      accountName: string,
      options?: RaiToolLabelsListOptionalParams,
    ) => list(context, resourceGroupName, accountName, options),
    delete: (
      resourceGroupName: string,
      accountName: string,
      raiToolConnectionName: string,
      options?: RaiToolLabelsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, accountName, raiToolConnectionName, options),
    beginDelete: async (
      resourceGroupName: string,
      accountName: string,
      raiToolConnectionName: string,
      options?: RaiToolLabelsDeleteOptionalParams,
    ) => {
      const poller = $delete(
        context,
        resourceGroupName,
        accountName,
        raiToolConnectionName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      accountName: string,
      raiToolConnectionName: string,
      options?: RaiToolLabelsDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, accountName, raiToolConnectionName, options);
    },
    createOrUpdate: (
      resourceGroupName: string,
      accountName: string,
      raiToolConnectionName: string,
      raiToolLabel: RaiToolLabel,
      options?: RaiToolLabelsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        accountName,
        raiToolConnectionName,
        raiToolLabel,
        options,
      ),
    get: (
      resourceGroupName: string,
      accountName: string,
      raiToolConnectionName: string,
      options?: RaiToolLabelsGetOptionalParams,
    ) => get(context, resourceGroupName, accountName, raiToolConnectionName, options),
  };
}

export function _getRaiToolLabelsOperations(
  context: CognitiveServicesManagementContext,
): RaiToolLabelsOperations {
  return {
    ..._getRaiToolLabels(context),
  };
}

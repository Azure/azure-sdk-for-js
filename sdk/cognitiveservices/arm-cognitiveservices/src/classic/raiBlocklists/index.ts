// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { CognitiveServicesManagementContext } from "../../api/cognitiveServicesManagementContext.js";
import { list, $delete, createOrUpdate, get } from "../../api/raiBlocklists/operations.js";
import type {
  RaiBlocklistsListOptionalParams,
  RaiBlocklistsDeleteOptionalParams,
  RaiBlocklistsCreateOrUpdateOptionalParams,
  RaiBlocklistsGetOptionalParams,
} from "../../api/raiBlocklists/options.js";
import type { RaiBlocklist } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a RaiBlocklists operations. */
export interface RaiBlocklistsOperations {
  /** Gets the custom blocklists associated with the Azure OpenAI account. */
  list: (
    resourceGroupName: string,
    accountName: string,
    options?: RaiBlocklistsListOptionalParams,
  ) => PagedAsyncIterableIterator<RaiBlocklist>;
  /** Deletes the specified custom blocklist associated with the Azure OpenAI account. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    accountName: string,
    raiBlocklistName: string,
    options?: RaiBlocklistsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Update the state of specified blocklist associated with the Azure OpenAI account. */
  createOrUpdate: (
    resourceGroupName: string,
    accountName: string,
    raiBlocklistName: string,
    raiBlocklist: RaiBlocklist,
    options?: RaiBlocklistsCreateOrUpdateOptionalParams,
  ) => Promise<RaiBlocklist>;
  /** Gets the specified custom blocklist associated with the Azure OpenAI account. */
  get: (
    resourceGroupName: string,
    accountName: string,
    raiBlocklistName: string,
    options?: RaiBlocklistsGetOptionalParams,
  ) => Promise<RaiBlocklist>;
}

function _getRaiBlocklists(context: CognitiveServicesManagementContext) {
  return {
    list: (
      resourceGroupName: string,
      accountName: string,
      options?: RaiBlocklistsListOptionalParams,
    ) => list(context, resourceGroupName, accountName, options),
    delete: (
      resourceGroupName: string,
      accountName: string,
      raiBlocklistName: string,
      options?: RaiBlocklistsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, accountName, raiBlocklistName, options),
    createOrUpdate: (
      resourceGroupName: string,
      accountName: string,
      raiBlocklistName: string,
      raiBlocklist: RaiBlocklist,
      options?: RaiBlocklistsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        accountName,
        raiBlocklistName,
        raiBlocklist,
        options,
      ),
    get: (
      resourceGroupName: string,
      accountName: string,
      raiBlocklistName: string,
      options?: RaiBlocklistsGetOptionalParams,
    ) => get(context, resourceGroupName, accountName, raiBlocklistName, options),
  };
}

export function _getRaiBlocklistsOperations(
  context: CognitiveServicesManagementContext,
): RaiBlocklistsOperations {
  return {
    ..._getRaiBlocklists(context),
  };
}

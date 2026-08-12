// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NetworkManagementContext } from "../../api/networkManagementContext.js";
import { listAll } from "../../api/azureFirewallFqdnTags/operations.js";
import type { AzureFirewallFqdnTagsListAllOptionalParams } from "../../api/azureFirewallFqdnTags/options.js";
import type { AzureFirewallFqdnTag } from "../../models/microsoft/network/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a AzureFirewallFqdnTags operations. */
export interface AzureFirewallFqdnTagsOperations {
  /** Gets all the Azure Firewall FQDN Tags in a subscription. */
  listAll: (
    options?: AzureFirewallFqdnTagsListAllOptionalParams,
  ) => PagedAsyncIterableIterator<AzureFirewallFqdnTag>;
}

function _getAzureFirewallFqdnTags(context: NetworkManagementContext) {
  return {
    listAll: (options?: AzureFirewallFqdnTagsListAllOptionalParams) => listAll(context, options),
  };
}

export function _getAzureFirewallFqdnTagsOperations(
  context: NetworkManagementContext,
): AzureFirewallFqdnTagsOperations {
  return {
    ..._getAzureFirewallFqdnTags(context),
  };
}

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementContext } from "../../api/networkManagementContext.js";
import { listAll } from "../../api/azureFirewallFqdnTags/operations.js";
import { AzureFirewallFqdnTagsListAllOptionalParams } from "../../api/azureFirewallFqdnTags/options.js";
import { AzureFirewallFqdnTag } from "../../models/microsoft/network/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

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

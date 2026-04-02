// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NetworkManagementContext as Client } from "../index.js";
import type { AzureFirewallFqdnTag } from "../../models/microsoft/network/models.js";
import { cloudErrorDeserializer } from "../../models/microsoft/network/models.js";
import type { _AzureFirewallFqdnTagListResult } from "../../models/models.js";
import { _azureFirewallFqdnTagListResultDeserializer } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type { AzureFirewallFqdnTagsListAllOptionalParams } from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listAllSend(
  context: Client,
  options: AzureFirewallFqdnTagsListAllOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Network/azureFirewallFqdnTags{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      "api%2Dversion": "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _listAllDeserialize(
  result: PathUncheckedResponse,
): Promise<_AzureFirewallFqdnTagListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return _azureFirewallFqdnTagListResultDeserializer(result.body);
}

/** Gets all the Azure Firewall FQDN Tags in a subscription. */
export function listAll(
  context: Client,
  options: AzureFirewallFqdnTagsListAllOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<AzureFirewallFqdnTag> {
  return buildPagedAsyncIterator(
    context,
    () => _listAllSend(context, options),
    _listAllDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: "2025-05-01" },
  );
}

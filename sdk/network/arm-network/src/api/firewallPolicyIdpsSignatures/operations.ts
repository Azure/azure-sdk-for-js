// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NetworkManagementContext as Client } from "../index.js";
import type { IdpsQueryObject, QueryResults } from "../../models/microsoft/network/models.js";
import {
  cloudErrorDeserializer,
  idpsQueryObjectSerializer,
  queryResultsDeserializer,
} from "../../models/microsoft/network/models.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type { FirewallPolicyIdpsSignaturesListOptionalParams } from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listSend(
  context: Client,
  resourceGroupName: string,
  firewallPolicyName: string,
  parameters: IdpsQueryObject,
  options: FirewallPolicyIdpsSignaturesListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/firewallPolicies/{firewallPolicyName}/listIdpsSignatures{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      firewallPolicyName: firewallPolicyName,
      "api%2Dversion": "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: idpsQueryObjectSerializer(parameters),
  });
}

export async function _listDeserialize(result: PathUncheckedResponse): Promise<QueryResults> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return queryResultsDeserializer(result.body);
}

/** Retrieves the current status of IDPS signatures for the relevant policy. Maximal amount of returned signatures is 1000. */
export async function list(
  context: Client,
  resourceGroupName: string,
  firewallPolicyName: string,
  parameters: IdpsQueryObject,
  options: FirewallPolicyIdpsSignaturesListOptionalParams = { requestOptions: {} },
): Promise<QueryResults> {
  const result = await _listSend(
    context,
    resourceGroupName,
    firewallPolicyName,
    parameters,
    options,
  );
  return _listDeserialize(result);
}

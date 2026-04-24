// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SecurityCenterContext as Client } from "../index.js";
import { errorResponseDeserializer } from "../../models/models.js";
import type { SecurityConnectorsDevOpsAPIGitLabGroupListResponse } from "../../models/securityConnectorsDevOpsAPI/models.js";
import { securityConnectorsDevOpsAPIGitLabGroupListResponseDeserializer } from "../../models/securityConnectorsDevOpsAPI/models.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type { GitLabSubgroupsListOptionalParams } from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listSend(
  context: Client,
  resourceGroupName: string,
  securityConnectorName: string,
  groupFQName: string,
  options: GitLabSubgroupsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Security/securityConnectors/{securityConnectorName}/devops/default/gitLabGroups/{groupFQName}/listSubgroups{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      securityConnectorName: securityConnectorName,
      groupFQName: groupFQName,
      "api%2Dversion": "2025-11-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _listDeserialize(
  result: PathUncheckedResponse,
): Promise<SecurityConnectorsDevOpsAPIGitLabGroupListResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return securityConnectorsDevOpsAPIGitLabGroupListResponseDeserializer(result.body);
}

/** Gets nested subgroups of given GitLab Group which are onboarded to the connector. */
export async function list(
  context: Client,
  resourceGroupName: string,
  securityConnectorName: string,
  groupFQName: string,
  options: GitLabSubgroupsListOptionalParams = { requestOptions: {} },
): Promise<SecurityConnectorsDevOpsAPIGitLabGroupListResponse> {
  const result = await _listSend(
    context,
    resourceGroupName,
    securityConnectorName,
    groupFQName,
    options,
  );
  return _listDeserialize(result);
}

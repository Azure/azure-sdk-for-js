// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SecurityCenterContext as Client } from "../index.js";
import { errorResponseDeserializer } from "../../models/models.js";
import { issueCreationRequestSerializer } from "../../models/securityConnectorsDevOpsAPI/models.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type { GitHubIssuesCreateOptionalParams } from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _createSend(
  context: Client,
  resourceGroupName: string,
  securityConnectorName: string,
  ownerName: string,
  repoName: string,
  options: GitHubIssuesCreateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Security/securityConnectors/{securityConnectorName}/devops/default/gitHubOwners/{ownerName}/repos/{repoName}/issues{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      securityConnectorName: securityConnectorName,
      ownerName: ownerName,
      repoName: repoName,
      "api%2Dversion": "2025-11-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    body: !options["createIssueRequest"]
      ? options["createIssueRequest"]
      : issueCreationRequestSerializer(options["createIssueRequest"]),
  });
}

export async function _createDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Creates a GitHub issue for the specified repository and assessment. */
export function create(
  context: Client,
  resourceGroupName: string,
  securityConnectorName: string,
  ownerName: string,
  repoName: string,
  options: GitHubIssuesCreateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _createDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createSend(context, resourceGroupName, securityConnectorName, ownerName, repoName, options),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: "2025-11-01-preview",
  }) as PollerLike<OperationState<void>, void>;
}

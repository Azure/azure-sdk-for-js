// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NginxManagementContext as Client } from "../index.js";
import type { NginxDeploymentWafPolicyAnalysisResponse } from "../../models/models.js";
import {
  errorResponseDeserializer,
  nginxDeploymentWafPolicyAnalysisCreateRequestSerializer,
  nginxDeploymentWafPolicyAnalysisResponseDeserializer,
} from "../../models/models.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type { NginxDeploymentWafPoliciesAnalysisOptionalParams } from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _analysisSend(
  context: Client,
  resourceGroupName: string,
  deploymentName: string,
  wafPolicyName: string,
  options: NginxDeploymentWafPoliciesAnalysisOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Nginx.NginxPlus/nginxDeployments/{deploymentName}/wafPolicies/{wafPolicyName}/analyzeWafPolicy{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      deploymentName: deploymentName,
      wafPolicyName: wafPolicyName,
      "api%2Dversion": context.apiVersion ?? "2025-11-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: !options["body"]
      ? options["body"]
      : nginxDeploymentWafPolicyAnalysisCreateRequestSerializer(options["body"]),
  });
}

export async function _analysisDeserialize(
  result: PathUncheckedResponse,
): Promise<NginxDeploymentWafPolicyAnalysisResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return nginxDeploymentWafPolicyAnalysisResponseDeserializer(result.body);
}

/** Analyze an Nginx Waf Policy */
export async function analysis(
  context: Client,
  resourceGroupName: string,
  deploymentName: string,
  wafPolicyName: string,
  options: NginxDeploymentWafPoliciesAnalysisOptionalParams = { requestOptions: {} },
): Promise<NginxDeploymentWafPolicyAnalysisResponse> {
  const result = await _analysisSend(
    context,
    resourceGroupName,
    deploymentName,
    wafPolicyName,
    options,
  );
  return _analysisDeserialize(result);
}

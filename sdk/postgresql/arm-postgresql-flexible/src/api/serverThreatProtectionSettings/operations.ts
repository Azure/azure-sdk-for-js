// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { PostgreSQLManagementFlexibleServerContext as Client } from "../index.js";
import type {
  AdvancedThreatProtectionSettingsModel,
  ThreatProtectionName,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  advancedThreatProtectionSettingsModelSerializer,
  advancedThreatProtectionSettingsModelDeserializer,
} from "../../models/models.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type { ServerThreatProtectionSettingsCreateOrUpdateOptionalParams } from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  threatProtectionName: ThreatProtectionName,
  parameters: AdvancedThreatProtectionSettingsModel,
  options: ServerThreatProtectionSettingsCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DBforPostgreSQL/flexibleServers/{serverName}/advancedThreatProtectionSettings/{threatProtectionName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serverName: serverName,
      threatProtectionName: threatProtectionName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    body: advancedThreatProtectionSettingsModelSerializer(parameters),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<AdvancedThreatProtectionSettingsModel> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return advancedThreatProtectionSettingsModelDeserializer(result.body);
}

/** Creates or updates a server's Advanced Threat Protection settings. */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  threatProtectionName: ThreatProtectionName,
  parameters: AdvancedThreatProtectionSettingsModel,
  options: ServerThreatProtectionSettingsCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<
  OperationState<AdvancedThreatProtectionSettingsModel>,
  AdvancedThreatProtectionSettingsModel
> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(
        context,
        resourceGroupName,
        serverName,
        threatProtectionName,
        parameters,
        options,
      ),
    resourceLocationConfig: "azure-async-operation",
  }) as PollerLike<
    OperationState<AdvancedThreatProtectionSettingsModel>,
    AdvancedThreatProtectionSettingsModel
  >;
}

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { BillingBenefitsRPContext as Client } from "../index.js";
import {
  errorResponseDeserializer,
  SavingsPlanOrderAliasModel,
  savingsPlanOrderAliasModelSerializer,
  savingsPlanOrderAliasModelDeserializer,
} from "../../models/models.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  SavingsPlanOrderAliasCreateOptionalParams,
  SavingsPlanOrderAliasGetOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";
import { PollerLike, OperationState } from "@azure/core-lro";

export function _createSend(
  context: Client,
  savingsPlanOrderAliasName: string,
  body: SavingsPlanOrderAliasModel,
  options: SavingsPlanOrderAliasCreateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.BillingBenefits/savingsPlanOrderAliases/{savingsPlanOrderAliasName}{?api%2Dversion}",
    {
      savingsPlanOrderAliasName: savingsPlanOrderAliasName,
      "api%2Dversion": context.apiVersion ?? "2025-12-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: savingsPlanOrderAliasModelSerializer(body),
  });
}

export async function _createDeserialize(
  result: PathUncheckedResponse,
): Promise<SavingsPlanOrderAliasModel> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return savingsPlanOrderAliasModelDeserializer(result.body);
}

/** Create a savings plan. Learn more about permissions needed at https://go.microsoft.com/fwlink/?linkid=2215851 */
export function create(
  context: Client,
  savingsPlanOrderAliasName: string,
  body: SavingsPlanOrderAliasModel,
  options: SavingsPlanOrderAliasCreateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<SavingsPlanOrderAliasModel>, SavingsPlanOrderAliasModel> {
  return getLongRunningPoller(context, _createDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _createSend(context, savingsPlanOrderAliasName, body, options),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2025-12-01-preview",
  }) as PollerLike<OperationState<SavingsPlanOrderAliasModel>, SavingsPlanOrderAliasModel>;
}

export function _getSend(
  context: Client,
  savingsPlanOrderAliasName: string,
  options: SavingsPlanOrderAliasGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.BillingBenefits/savingsPlanOrderAliases/{savingsPlanOrderAliasName}{?api%2Dversion}",
    {
      savingsPlanOrderAliasName: savingsPlanOrderAliasName,
      "api%2Dversion": context.apiVersion ?? "2025-12-01-preview",
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

export async function _getDeserialize(
  result: PathUncheckedResponse,
): Promise<SavingsPlanOrderAliasModel> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return savingsPlanOrderAliasModelDeserializer(result.body);
}

/** Get a savings plan. */
export async function get(
  context: Client,
  savingsPlanOrderAliasName: string,
  options: SavingsPlanOrderAliasGetOptionalParams = { requestOptions: {} },
): Promise<SavingsPlanOrderAliasModel> {
  const result = await _getSend(context, savingsPlanOrderAliasName, options);
  return _getDeserialize(result);
}

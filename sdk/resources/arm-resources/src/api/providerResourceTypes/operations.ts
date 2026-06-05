// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ResourceManagementContext as Client } from "../index.js";
import {
  cloudErrorDeserializer,
  ProviderResourceTypeListResult,
  providerResourceTypeListResultDeserializer,
} from "../../models/models.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import { ProviderResourceTypesListOptionalParams } from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _listSend(
  context: Client,
  resourceProviderNamespace: string,
  options: ProviderResourceTypesListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/{resourceProviderNamespace}/resourceTypes{?api%2Dversion,%24expand}",
    {
      subscriptionId: context.subscriptionId,
      resourceProviderNamespace: resourceProviderNamespace,
      "api%2Dversion": context.apiVersion ?? "2025-04-01",
      "%24expand": options?.expand,
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

export async function _listDeserialize(
  result: PathUncheckedResponse,
): Promise<ProviderResourceTypeListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = cloudErrorDeserializer(result.body);
    }

    throw error;
  }

  return providerResourceTypeListResultDeserializer(result.body);
}

/** List the resource types for a specified resource provider. */
export async function list(
  context: Client,
  resourceProviderNamespace: string,
  options: ProviderResourceTypesListOptionalParams = { requestOptions: {} },
): Promise<ProviderResourceTypeListResult> {
  const result = await _listSend(context, resourceProviderNamespace, options);
  return _listDeserialize(result);
}

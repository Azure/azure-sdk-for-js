// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { PrivateDnsManagementContext as Client } from "../index.js";
import type {
  PrivateDnsResourceReferenceRequest,
  PrivateDnsResourceReferenceResult,
} from "../../models/models.js";
import {
  cloudErrorDeserializer,
  privateDnsResourceReferenceRequestSerializer,
  privateDnsResourceReferenceResultDeserializer,
} from "../../models/models.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type { PrivateDnsResourceReferenceGetByTargetResourcesOptionalParams } from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _getByTargetResourcesSend(
  context: Client,
  parameters: PrivateDnsResourceReferenceRequest,
  options: PrivateDnsResourceReferenceGetByTargetResourcesOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Network/getPrivateDnsResourceReference{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      "api%2Dversion": context.apiVersion ?? "2026-06-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: privateDnsResourceReferenceRequestSerializer(parameters),
  });
}

export async function _getByTargetResourcesDeserialize(
  result: PathUncheckedResponse,
): Promise<PrivateDnsResourceReferenceResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = cloudErrorDeserializer(result.body);
    }

    throw error;
  }

  return privateDnsResourceReferenceResultDeserializer(result.body);
}

/** Returns the private DNS zone records specified by the referencing targetResourceIds. */
export async function getByTargetResources(
  context: Client,
  parameters: PrivateDnsResourceReferenceRequest,
  options: PrivateDnsResourceReferenceGetByTargetResourcesOptionalParams = { requestOptions: {} },
): Promise<PrivateDnsResourceReferenceResult> {
  const result = await _getByTargetResourcesSend(context, parameters, options);
  return _getByTargetResourcesDeserialize(result);
}

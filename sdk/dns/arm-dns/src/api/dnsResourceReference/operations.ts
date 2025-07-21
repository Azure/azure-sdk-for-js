// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkContext as Client } from "../index.js";
import {
  cloudErrorDeserializer,
  DnsResourceReferenceRequest,
  dnsResourceReferenceRequestSerializer,
  DnsResourceReferenceResult,
  dnsResourceReferenceResultDeserializer,
} from "../../models/models.js";
import { DnsResourceReferenceGetByTargetResourcesOptionalParams } from "./options.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _getByTargetResourcesSend(
  context: Client,
  parameters: DnsResourceReferenceRequest,
  options: DnsResourceReferenceGetByTargetResourcesOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Network/getDnsResourceReference{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: dnsResourceReferenceRequestSerializer(parameters),
  });
}

export async function _getByTargetResourcesDeserialize(
  result: PathUncheckedResponse,
): Promise<DnsResourceReferenceResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);
    throw error;
  }

  return dnsResourceReferenceResultDeserializer(result.body);
}

/** Returns the DNS records specified by the referencing targetResourceIds. */
export async function getByTargetResources(
  context: Client,
  parameters: DnsResourceReferenceRequest,
  options: DnsResourceReferenceGetByTargetResourcesOptionalParams = {
    requestOptions: {},
  },
): Promise<DnsResourceReferenceResult> {
  const result = await _getByTargetResourcesSend(context, parameters, options);
  return _getByTargetResourcesDeserialize(result);
}

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SecurityInsightsContext as Client } from "./index.js";
import type {
  EnrichmentIpAddressBody,
  EnrichmentIpGeodata,
  EnrichmentDomainBody,
  EnrichmentDomainWhois,
  EnrichmentType,
} from "../models/models.js";
import {
  enrichmentIpAddressBodySerializer,
  enrichmentIpGeodataDeserializer,
  cloudErrorDeserializer,
  enrichmentDomainBodySerializer,
  enrichmentDomainWhoisDeserializer,
} from "../models/models.js";
import { expandUrlTemplate } from "../static-helpers/urlTemplate.js";
import type { ListWhoisByDomainOptionalParams, ListGeodataByIpOptionalParams } from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listWhoisByDomainSend(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  enrichmentType: EnrichmentType,
  domainBody: EnrichmentDomainBody,
  options: ListWhoisByDomainOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OperationalInsights/workspaces/{workspaceName}/providers/Microsoft.SecurityInsights/enrichment/{enrichmentType}/listWhoisByDomain{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      workspaceName: workspaceName,
      enrichmentType: enrichmentType,
      "api%2Dversion": context.apiVersion ?? "2025-07-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: enrichmentDomainBodySerializer(domainBody),
  });
}

export async function _listWhoisByDomainDeserialize(
  result: PathUncheckedResponse,
): Promise<EnrichmentDomainWhois> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return enrichmentDomainWhoisDeserializer(result.body);
}

/** Get whois information for a single domain name */
export async function listWhoisByDomain(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  enrichmentType: EnrichmentType,
  domainBody: EnrichmentDomainBody,
  options: ListWhoisByDomainOptionalParams = { requestOptions: {} },
): Promise<EnrichmentDomainWhois> {
  const result = await _listWhoisByDomainSend(
    context,
    resourceGroupName,
    workspaceName,
    enrichmentType,
    domainBody,
    options,
  );
  return _listWhoisByDomainDeserialize(result);
}

export function _listGeodataByIpSend(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  enrichmentType: EnrichmentType,
  ipAddressBody: EnrichmentIpAddressBody,
  options: ListGeodataByIpOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OperationalInsights/workspaces/{workspaceName}/providers/Microsoft.SecurityInsights/enrichment/{enrichmentType}/listGeodataByIp{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      workspaceName: workspaceName,
      enrichmentType: enrichmentType,
      "api%2Dversion": context.apiVersion ?? "2025-07-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: enrichmentIpAddressBodySerializer(ipAddressBody),
  });
}

export async function _listGeodataByIpDeserialize(
  result: PathUncheckedResponse,
): Promise<EnrichmentIpGeodata> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return enrichmentIpGeodataDeserializer(result.body);
}

/** Get geodata for a single IP address */
export async function listGeodataByIp(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  enrichmentType: EnrichmentType,
  ipAddressBody: EnrichmentIpAddressBody,
  options: ListGeodataByIpOptionalParams = { requestOptions: {} },
): Promise<EnrichmentIpGeodata> {
  const result = await _listGeodataByIpSend(
    context,
    resourceGroupName,
    workspaceName,
    enrichmentType,
    ipAddressBody,
    options,
  );
  return _listGeodataByIpDeserialize(result);
}

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { PaloAltoNetworksCloudngfwContext as Client } from "../index.js";
import type {
  LogIngestionSettingsResource,
  _LogIngestionSettingsResourceListResult,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  logIngestionSettingsResourceSerializer,
  logIngestionSettingsResourceDeserializer,
  _logIngestionSettingsResourceListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  LogIngestionSettingsResourcesListByFirewallOptionalParams,
  LogIngestionSettingsResourcesDeleteOptionalParams,
  LogIngestionSettingsResourcesCreateOrUpdateOptionalParams,
  LogIngestionSettingsResourcesGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listByFirewallSend(
  context: Client,
  resourceGroupName: string,
  firewallName: string,
  options: LogIngestionSettingsResourcesListByFirewallOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/PaloAltoNetworks.Cloudngfw/firewalls/{firewallName}/logIngestionSettings{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      firewallName: firewallName,
      "api%2Dversion": context.apiVersion ?? "2026-07-29-preview",
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

export async function _listByFirewallDeserialize(
  result: PathUncheckedResponse,
): Promise<_LogIngestionSettingsResourceListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _logIngestionSettingsResourceListResultDeserializer(result.body);
}
/** List the Log Ingestion Settings under a firewall. The resource is a singleton (name is fixed to 'default'), so the response contains at most one entry. */
export function listByFirewall(
  context: Client,
  resourceGroupName: string,
  firewallName: string,
  options: LogIngestionSettingsResourcesListByFirewallOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<LogIngestionSettingsResource> {
  return buildPagedAsyncIterator(
    context,
    () => _listByFirewallSend(context, resourceGroupName, firewallName, options),
    _listByFirewallDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2026-07-29-preview",
    },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  firewallName: string,
  options: LogIngestionSettingsResourcesDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/PaloAltoNetworks.Cloudngfw/firewalls/{firewallName}/logIngestionSettings/default{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      firewallName: firewallName,
      "api%2Dversion": context.apiVersion ?? "2026-07-29-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _$deleteDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200", "204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return;
}
/** Delete (clear) the Log Ingestion Settings for a firewall. SYNC — soft-clears the DCR destination on the partner (logs have no partner delete API). Returns 200 on success or 204 when nothing is configured. */
export async function $delete(
  context: Client,
  resourceGroupName: string,
  firewallName: string,
  options: LogIngestionSettingsResourcesDeleteOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _$deleteSend(context, resourceGroupName, firewallName, options);
  return _$deleteDeserialize(result);
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  firewallName: string,
  resource: LogIngestionSettingsResource,
  options: LogIngestionSettingsResourcesCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/PaloAltoNetworks.Cloudngfw/firewalls/{firewallName}/logIngestionSettings/default{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      firewallName: firewallName,
      "api%2Dversion": context.apiVersion ?? "2026-07-29-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: logIngestionSettingsResourceSerializer(resource),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<LogIngestionSettingsResource> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return logIngestionSettingsResourceDeserializer(result.body);
}
/** Create or update the Log Ingestion Settings for a firewall. SYNC — forwards to the partner and returns 200 OK (or 201 Created on first create) with the persisted settings. commonDestination.monitorConfigurationsV2 (dcrId, logIngestionEndpoint, dcrImmutableId, streamName) drives where the firewall logs are ingested. */
export async function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  firewallName: string,
  resource: LogIngestionSettingsResource,
  options: LogIngestionSettingsResourcesCreateOrUpdateOptionalParams = { requestOptions: {} },
): Promise<LogIngestionSettingsResource> {
  const result = await _createOrUpdateSend(
    context,
    resourceGroupName,
    firewallName,
    resource,
    options,
  );
  return _createOrUpdateDeserialize(result);
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  firewallName: string,
  options: LogIngestionSettingsResourcesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/PaloAltoNetworks.Cloudngfw/firewalls/{firewallName}/logIngestionSettings/default{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      firewallName: firewallName,
      "api%2Dversion": context.apiVersion ?? "2026-07-29-preview",
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
): Promise<LogIngestionSettingsResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return logIngestionSettingsResourceDeserializer(result.body);
}
/** Get the Log Ingestion Settings for a firewall. Live read from the partner. Returns 200 OK with the current settings, or 404 when log ingestion has not been configured. */
export async function get(
  context: Client,
  resourceGroupName: string,
  firewallName: string,
  options: LogIngestionSettingsResourcesGetOptionalParams = { requestOptions: {} },
): Promise<LogIngestionSettingsResource> {
  const result = await _getSend(context, resourceGroupName, firewallName, options);
  return _getDeserialize(result);
}

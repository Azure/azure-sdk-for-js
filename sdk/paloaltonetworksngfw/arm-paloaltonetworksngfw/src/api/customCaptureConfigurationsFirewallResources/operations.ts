// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PaloAltoNetworksCloudngfwContext as Client } from "../index.js";
import {
  errorResponseDeserializer,
  CustomCaptureConfigurationsFirewallResource,
  customCaptureConfigurationsFirewallResourceSerializer,
  customCaptureConfigurationsFirewallResourceDeserializer,
  _CustomCaptureConfigurationsFirewallResourceListResult,
  _customCaptureConfigurationsFirewallResourceListResultDeserializer,
} from "../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  CustomCaptureConfigurationsFirewallResourcesListByFirewallOptionalParams,
  CustomCaptureConfigurationsFirewallResourcesDeleteOptionalParams,
  CustomCaptureConfigurationsFirewallResourcesCreateOrUpdateOptionalParams,
  CustomCaptureConfigurationsFirewallResourcesGetOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _listByFirewallSend(
  context: Client,
  resourceGroupName: string,
  firewallName: string,
  options: CustomCaptureConfigurationsFirewallResourcesListByFirewallOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/PaloAltoNetworks.Cloudngfw/firewalls/{firewallName}/customCaptureConfigurations{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      firewallName: firewallName,
      "api%2Dversion": context.apiVersion ?? "2026-05-11-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: { accept: "application/json", ...options.requestOptions?.headers },
    });
}

export async function _listByFirewallDeserialize(
  result: PathUncheckedResponse,
): Promise<_CustomCaptureConfigurationsFirewallResourceListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _customCaptureConfigurationsFirewallResourceListResultDeserializer(result.body);
}

/** List Custom Capture Configurations under a firewall. The resource is a singleton (name is fixed to 'default'), so the response contains at most one entry. */
export function listByFirewall(
  context: Client,
  resourceGroupName: string,
  firewallName: string,
  options: CustomCaptureConfigurationsFirewallResourcesListByFirewallOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<CustomCaptureConfigurationsFirewallResource> {
  return buildPagedAsyncIterator(
    context,
    () => _listByFirewallSend(context, resourceGroupName, firewallName, options),
    _listByFirewallDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2026-05-11-preview",
    },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  firewallName: string,
  options: CustomCaptureConfigurationsFirewallResourcesDeleteOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/PaloAltoNetworks.Cloudngfw/firewalls/{firewallName}/customCaptureConfigurations/default{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      firewallName: firewallName,
      "api%2Dversion": context.apiVersion ?? "2026-05-11-preview",
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

/** Delete the Custom Capture Configuration on a firewall. SYNC — clears any in-progress or terminal capture state. Returns 200 on success or 204 when no configuration exists. */
export async function $delete(
  context: Client,
  resourceGroupName: string,
  firewallName: string,
  options: CustomCaptureConfigurationsFirewallResourcesDeleteOptionalParams = {
    requestOptions: {},
  },
): Promise<void> {
  const result = await _$deleteSend(context, resourceGroupName, firewallName, options);
  return _$deleteDeserialize(result);
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  firewallName: string,
  resource: CustomCaptureConfigurationsFirewallResource,
  options: CustomCaptureConfigurationsFirewallResourcesCreateOrUpdateOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/PaloAltoNetworks.Cloudngfw/firewalls/{firewallName}/customCaptureConfigurations/default{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      firewallName: firewallName,
      "api%2Dversion": context.apiVersion ?? "2026-05-11-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .put({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/json",
      headers: { accept: "application/json", ...options.requestOptions?.headers },
      body: customCaptureConfigurationsFirewallResourceSerializer(resource),
    });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<CustomCaptureConfigurationsFirewallResource> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return customCaptureConfigurationsFirewallResourceDeserializer(result.body);
}

/** Start a Custom Capture Configuration on a firewall. SYNC — returns 200 OK + body immediately. Body's properties.pcapStatus reflects current state (typically InProgress). Caller polls GET on its own clock using properties.nextCheckInSeconds as the cadence hint. */
export async function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  firewallName: string,
  resource: CustomCaptureConfigurationsFirewallResource,
  options: CustomCaptureConfigurationsFirewallResourcesCreateOrUpdateOptionalParams = {
    requestOptions: {},
  },
): Promise<CustomCaptureConfigurationsFirewallResource> {
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
  options: CustomCaptureConfigurationsFirewallResourcesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/PaloAltoNetworks.Cloudngfw/firewalls/{firewallName}/customCaptureConfigurations/default{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      firewallName: firewallName,
      "api%2Dversion": context.apiVersion ?? "2026-05-11-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: { accept: "application/json", ...options.requestOptions?.headers },
    });
}

export async function _getDeserialize(
  result: PathUncheckedResponse,
): Promise<CustomCaptureConfigurationsFirewallResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return customCaptureConfigurationsFirewallResourceDeserializer(result.body);
}

/** Get the current Custom Capture Configuration for a firewall. Always returns 200 OK + body. Caller reads properties.pcapStatus to know whether to keep polling. Body field properties.nextCheckInSeconds advises when to poll next (omitted on terminal states). */
export async function get(
  context: Client,
  resourceGroupName: string,
  firewallName: string,
  options: CustomCaptureConfigurationsFirewallResourcesGetOptionalParams = { requestOptions: {} },
): Promise<CustomCaptureConfigurationsFirewallResource> {
  const result = await _getSend(context, resourceGroupName, firewallName, options);
  return _getDeserialize(result);
}

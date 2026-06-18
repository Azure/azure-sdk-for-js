// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApplicationInsightsManagementContext as Client } from "../index.js";
import {
  TagsResource,
  tagsResourceSerializer,
} from "../../models/applicationInsightsCommonTypes/models.js";
import {
  ApplicationInsightsComponent,
  applicationInsightsComponentSerializer,
  applicationInsightsComponentDeserializer,
  errorResponseComponentsDeserializer,
  ComponentPurgeBody,
  componentPurgeBodySerializer,
  ComponentPurgeResponse,
  componentPurgeResponseDeserializer,
  ComponentPurgeStatusResponse,
  componentPurgeStatusResponseDeserializer,
} from "../../models/components/models.js";
import {
  _ApplicationInsightsComponentListResult,
  _applicationInsightsComponentListResultDeserializer,
} from "../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  ComponentsGetPurgeStatusOptionalParams,
  ComponentsPurgeOptionalParams,
  ComponentsListOptionalParams,
  ComponentsListByResourceGroupOptionalParams,
  ComponentsDeleteOptionalParams,
  ComponentsUpdateTagsOptionalParams,
  ComponentsCreateOrUpdateOptionalParams,
  ComponentsGetOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _getPurgeStatusSend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  purgeId: string,
  options: ComponentsGetPurgeStatusOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Insights/components/{resourceName}/operations/{purgeId}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceName: resourceName,
      purgeId: purgeId,
      "api%2Dversion": "2020-02-02",
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

export async function _getPurgeStatusDeserialize(
  result: PathUncheckedResponse,
): Promise<ComponentPurgeStatusResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseComponentsDeserializer(result.body);
    }

    throw error;
  }

  return componentPurgeStatusResponseDeserializer(result.body);
}

/** Get status for an ongoing purge operation. */
export async function getPurgeStatus(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  purgeId: string,
  options: ComponentsGetPurgeStatusOptionalParams = { requestOptions: {} },
): Promise<ComponentPurgeStatusResponse> {
  const result = await _getPurgeStatusSend(
    context,
    resourceGroupName,
    resourceName,
    purgeId,
    options,
  );
  return _getPurgeStatusDeserialize(result);
}

export function _purgeSend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  body: ComponentPurgeBody,
  options: ComponentsPurgeOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Insights/components/{resourceName}/purge{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceName: resourceName,
      "api%2Dversion": "2020-02-02",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .post({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/json",
      headers: { accept: "application/json", ...options.requestOptions?.headers },
      body: componentPurgeBodySerializer(body),
    });
}

export async function _purgeDeserialize(
  result: PathUncheckedResponse,
): Promise<ComponentPurgeResponse> {
  const expectedStatuses = ["202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseComponentsDeserializer(result.body);
    }

    throw error;
  }

  return componentPurgeResponseDeserializer(result.body);
}

/**
 * Purges data in an Application Insights component by a set of user-defined filters.
 *
 * In order to manage system resources, purge requests are throttled at 50 requests per hour. You should batch the execution of purge requests by sending a single command whose predicate includes all user identities that require purging. Use the in operator to specify multiple identities. You should run the query prior to using for a purge request to verify that the results are expected.
 * Note: this operation is intended for Classic resources, for  workspace-based Application Insights resource please run purge operation (directly on the workspace)(https://docs.microsoft.com/en-us/rest/api/loganalytics/workspace-purge/purge) , scoped to specific resource id.
 */
export async function purge(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  body: ComponentPurgeBody,
  options: ComponentsPurgeOptionalParams = { requestOptions: {} },
): Promise<ComponentPurgeResponse> {
  const result = await _purgeSend(context, resourceGroupName, resourceName, body, options);
  return _purgeDeserialize(result);
}

export function _listSend(
  context: Client,
  options: ComponentsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Insights/components{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      "api%2Dversion": "2020-02-02",
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

export async function _listDeserialize(
  result: PathUncheckedResponse,
): Promise<_ApplicationInsightsComponentListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseComponentsDeserializer(result.body);
    }

    throw error;
  }

  return _applicationInsightsComponentListResultDeserializer(result.body);
}

/** Gets a list of all Application Insights components within a subscription. */
export function list(
  context: Client,
  options: ComponentsListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<ApplicationInsightsComponent> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: "2020-02-02" },
  );
}

export function _listByResourceGroupSend(
  context: Client,
  resourceGroupName: string,
  options: ComponentsListByResourceGroupOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Insights/components{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      "api%2Dversion": "2020-02-02",
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

export async function _listByResourceGroupDeserialize(
  result: PathUncheckedResponse,
): Promise<_ApplicationInsightsComponentListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseComponentsDeserializer(result.body);
    }

    throw error;
  }

  return _applicationInsightsComponentListResultDeserializer(result.body);
}

/** Gets a list of Application Insights components within a resource group. */
export function listByResourceGroup(
  context: Client,
  resourceGroupName: string,
  options: ComponentsListByResourceGroupOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<ApplicationInsightsComponent> {
  return buildPagedAsyncIterator(
    context,
    () => _listByResourceGroupSend(context, resourceGroupName, options),
    _listByResourceGroupDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: "2020-02-02" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  options: ComponentsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Insights/components/{resourceName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceName: resourceName,
      "api%2Dversion": "2020-02-02",
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
      error.details = errorResponseComponentsDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** Deletes an Application Insights component. */
export async function $delete(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  options: ComponentsDeleteOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _$deleteSend(context, resourceGroupName, resourceName, options);
  return _$deleteDeserialize(result);
}

export function _updateTagsSend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  componentTags: TagsResource,
  options: ComponentsUpdateTagsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Insights/components/{resourceName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceName: resourceName,
      "api%2Dversion": "2020-02-02",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .patch({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/json",
      headers: { accept: "application/json", ...options.requestOptions?.headers },
      body: tagsResourceSerializer(componentTags),
    });
}

export async function _updateTagsDeserialize(
  result: PathUncheckedResponse,
): Promise<ApplicationInsightsComponent> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseComponentsDeserializer(result.body);
    }

    throw error;
  }

  return applicationInsightsComponentDeserializer(result.body);
}

/** Updates an existing component's tags. To update other fields use the CreateOrUpdate method. */
export async function updateTags(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  componentTags: TagsResource,
  options: ComponentsUpdateTagsOptionalParams = { requestOptions: {} },
): Promise<ApplicationInsightsComponent> {
  const result = await _updateTagsSend(
    context,
    resourceGroupName,
    resourceName,
    componentTags,
    options,
  );
  return _updateTagsDeserialize(result);
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  insightProperties: ApplicationInsightsComponent,
  options: ComponentsCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Insights/components/{resourceName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceName: resourceName,
      "api%2Dversion": "2020-02-02",
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
      body: applicationInsightsComponentSerializer(insightProperties),
    });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<ApplicationInsightsComponent> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseComponentsDeserializer(result.body);
    }

    throw error;
  }

  return applicationInsightsComponentDeserializer(result.body);
}

/** Creates (or updates) an Application Insights component. Note: You cannot specify a different value for InstrumentationKey nor AppId in the Put operation. */
export async function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  insightProperties: ApplicationInsightsComponent,
  options: ComponentsCreateOrUpdateOptionalParams = { requestOptions: {} },
): Promise<ApplicationInsightsComponent> {
  const result = await _createOrUpdateSend(
    context,
    resourceGroupName,
    resourceName,
    insightProperties,
    options,
  );
  return _createOrUpdateDeserialize(result);
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  options: ComponentsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Insights/components/{resourceName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceName: resourceName,
      "api%2Dversion": "2020-02-02",
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
): Promise<ApplicationInsightsComponent> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseComponentsDeserializer(result.body);
    }

    throw error;
  }

  return applicationInsightsComponentDeserializer(result.body);
}

/** Returns an Application Insights component. */
export async function get(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  options: ComponentsGetOptionalParams = { requestOptions: {} },
): Promise<ApplicationInsightsComponent> {
  const result = await _getSend(context, resourceGroupName, resourceName, options);
  return _getDeserialize(result);
}

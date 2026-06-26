// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ImageBuilderContext as Client } from "../index.js";
import {
  errorResponseDeserializer,
  Trigger,
  triggerSerializer,
  triggerDeserializer,
  _TriggerCollection,
  _triggerCollectionDeserializer,
} from "../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  TriggersListByImageTemplateOptionalParams,
  TriggersDeleteOptionalParams,
  TriggersCreateOrUpdateOptionalParams,
  TriggersGetOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";
import { PollerLike, OperationState } from "@azure/core-lro";

export function _listByImageTemplateSend(
  context: Client,
  resourceGroupName: string,
  imageTemplateName: string,
  options: TriggersListByImageTemplateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.VirtualMachineImages/imageTemplates/{imageTemplateName}/triggers{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      imageTemplateName: imageTemplateName,
      "api%2Dversion": context.apiVersion ?? "2025-10-01",
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

export async function _listByImageTemplateDeserialize(
  result: PathUncheckedResponse,
): Promise<_TriggerCollection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _triggerCollectionDeserializer(result.body);
}

/** List all triggers for the specified Image Template resource */
export function listByImageTemplate(
  context: Client,
  resourceGroupName: string,
  imageTemplateName: string,
  options: TriggersListByImageTemplateOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<Trigger> {
  return buildPagedAsyncIterator(
    context,
    () => _listByImageTemplateSend(context, resourceGroupName, imageTemplateName, options),
    _listByImageTemplateDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-10-01" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  imageTemplateName: string,
  triggerName: string,
  options: TriggersDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.VirtualMachineImages/imageTemplates/{imageTemplateName}/triggers/{triggerName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      imageTemplateName: imageTemplateName,
      triggerName: triggerName,
      "api%2Dversion": context.apiVersion ?? "2025-10-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _$deleteDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["202", "204", "200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** Delete a trigger for the specified virtual machine image template */
export function $delete(
  context: Client,
  resourceGroupName: string,
  imageTemplateName: string,
  triggerName: string,
  options: TriggersDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(context, resourceGroupName, imageTemplateName, triggerName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-10-01",
  }) as PollerLike<OperationState<void>, void>;
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  imageTemplateName: string,
  triggerName: string,
  parameters: Trigger,
  options: TriggersCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.VirtualMachineImages/imageTemplates/{imageTemplateName}/triggers/{triggerName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      imageTemplateName: imageTemplateName,
      triggerName: triggerName,
      "api%2Dversion": context.apiVersion ?? "2025-10-01",
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
      body: triggerSerializer(parameters),
    });
}

export async function _createOrUpdateDeserialize(result: PathUncheckedResponse): Promise<Trigger> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return triggerDeserializer(result.body);
}

/** Create or update a trigger for the specified virtual machine image template */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  imageTemplateName: string,
  triggerName: string,
  parameters: Trigger,
  options: TriggersCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<Trigger>, Trigger> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(
        context,
        resourceGroupName,
        imageTemplateName,
        triggerName,
        parameters,
        options,
      ),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2025-10-01",
  }) as PollerLike<OperationState<Trigger>, Trigger>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  imageTemplateName: string,
  triggerName: string,
  options: TriggersGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.VirtualMachineImages/imageTemplates/{imageTemplateName}/triggers/{triggerName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      imageTemplateName: imageTemplateName,
      triggerName: triggerName,
      "api%2Dversion": context.apiVersion ?? "2025-10-01",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<Trigger> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return triggerDeserializer(result.body);
}

/** Get the specified trigger for the specified image template resource */
export async function get(
  context: Client,
  resourceGroupName: string,
  imageTemplateName: string,
  triggerName: string,
  options: TriggersGetOptionalParams = { requestOptions: {} },
): Promise<Trigger> {
  const result = await _getSend(
    context,
    resourceGroupName,
    imageTemplateName,
    triggerName,
    options,
  );
  return _getDeserialize(result);
}

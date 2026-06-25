// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ImageBuilderContext as Client } from "../index.js";
import {
  errorResponseDeserializer,
  ImageTemplate,
  imageTemplateSerializer,
  imageTemplateDeserializer,
  ImageTemplateUpdateParameters,
  imageTemplateUpdateParametersSerializer,
  _ImageTemplateListResult,
  _imageTemplateListResultDeserializer,
  RunOutput,
  runOutputDeserializer,
  _RunOutputCollection,
  _runOutputCollectionDeserializer,
} from "../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  VirtualMachineImageTemplatesListRunOutputsOptionalParams,
  VirtualMachineImageTemplatesGetRunOutputOptionalParams,
  VirtualMachineImageTemplatesCancelOptionalParams,
  VirtualMachineImageTemplatesRunOptionalParams,
  VirtualMachineImageTemplatesListOptionalParams,
  VirtualMachineImageTemplatesListByResourceGroupOptionalParams,
  VirtualMachineImageTemplatesDeleteOptionalParams,
  VirtualMachineImageTemplatesUpdateOptionalParams,
  VirtualMachineImageTemplatesCreateOrUpdateOptionalParams,
  VirtualMachineImageTemplatesGetOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";
import { PollerLike, OperationState } from "@azure/core-lro";

export function _listRunOutputsSend(
  context: Client,
  resourceGroupName: string,
  imageTemplateName: string,
  options: VirtualMachineImageTemplatesListRunOutputsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.VirtualMachineImages/imageTemplates/{imageTemplateName}/runOutputs{?api%2Dversion}",
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

export async function _listRunOutputsDeserialize(
  result: PathUncheckedResponse,
): Promise<_RunOutputCollection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _runOutputCollectionDeserializer(result.body);
}

/** List all run outputs for the specified Image Template resource */
export function listRunOutputs(
  context: Client,
  resourceGroupName: string,
  imageTemplateName: string,
  options: VirtualMachineImageTemplatesListRunOutputsOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<RunOutput> {
  return buildPagedAsyncIterator(
    context,
    () => _listRunOutputsSend(context, resourceGroupName, imageTemplateName, options),
    _listRunOutputsDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-10-01" },
  );
}

export function _getRunOutputSend(
  context: Client,
  resourceGroupName: string,
  imageTemplateName: string,
  runOutputName: string,
  options: VirtualMachineImageTemplatesGetRunOutputOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.VirtualMachineImages/imageTemplates/{imageTemplateName}/runOutputs/{runOutputName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      imageTemplateName: imageTemplateName,
      runOutputName: runOutputName,
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

export async function _getRunOutputDeserialize(result: PathUncheckedResponse): Promise<RunOutput> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return runOutputDeserializer(result.body);
}

/** Get the specified run output for the specified image template resource */
export async function getRunOutput(
  context: Client,
  resourceGroupName: string,
  imageTemplateName: string,
  runOutputName: string,
  options: VirtualMachineImageTemplatesGetRunOutputOptionalParams = { requestOptions: {} },
): Promise<RunOutput> {
  const result = await _getRunOutputSend(
    context,
    resourceGroupName,
    imageTemplateName,
    runOutputName,
    options,
  );
  return _getRunOutputDeserialize(result);
}

export function _cancelSend(
  context: Client,
  resourceGroupName: string,
  imageTemplateName: string,
  options: VirtualMachineImageTemplatesCancelOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.VirtualMachineImages/imageTemplates/{imageTemplateName}/cancel{?api%2Dversion}",
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
  return context.path(path).post({ ...operationOptionsToRequestParameters(options) });
}

export async function _cancelDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["202", "200", "204", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** Cancel the long running image build based on the image template */
export function cancel(
  context: Client,
  resourceGroupName: string,
  imageTemplateName: string,
  options: VirtualMachineImageTemplatesCancelOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _cancelDeserialize, ["202", "200", "204", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _cancelSend(context, resourceGroupName, imageTemplateName, options),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2025-10-01",
  }) as PollerLike<OperationState<void>, void>;
}

export function _runSend(
  context: Client,
  resourceGroupName: string,
  imageTemplateName: string,
  options: VirtualMachineImageTemplatesRunOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.VirtualMachineImages/imageTemplates/{imageTemplateName}/run{?api%2Dversion}",
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
  return context.path(path).post({ ...operationOptionsToRequestParameters(options) });
}

export async function _runDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["202", "200", "204", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** Create artifacts from a existing image template */
export function run(
  context: Client,
  resourceGroupName: string,
  imageTemplateName: string,
  options: VirtualMachineImageTemplatesRunOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _runDeserialize, ["202", "200", "204", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _runSend(context, resourceGroupName, imageTemplateName, options),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2025-10-01",
  }) as PollerLike<OperationState<void>, void>;
}

export function _listSend(
  context: Client,
  options: VirtualMachineImageTemplatesListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.VirtualMachineImages/imageTemplates{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
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

export async function _listDeserialize(
  result: PathUncheckedResponse,
): Promise<_ImageTemplateListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _imageTemplateListResultDeserializer(result.body);
}

/** Gets information about the VM image templates associated with the subscription. */
export function list(
  context: Client,
  options: VirtualMachineImageTemplatesListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<ImageTemplate> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-10-01" },
  );
}

export function _listByResourceGroupSend(
  context: Client,
  resourceGroupName: string,
  options: VirtualMachineImageTemplatesListByResourceGroupOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.VirtualMachineImages/imageTemplates{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
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

export async function _listByResourceGroupDeserialize(
  result: PathUncheckedResponse,
): Promise<_ImageTemplateListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _imageTemplateListResultDeserializer(result.body);
}

/** Gets information about the VM image templates associated with the specified resource group. */
export function listByResourceGroup(
  context: Client,
  resourceGroupName: string,
  options: VirtualMachineImageTemplatesListByResourceGroupOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<ImageTemplate> {
  return buildPagedAsyncIterator(
    context,
    () => _listByResourceGroupSend(context, resourceGroupName, options),
    _listByResourceGroupDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-10-01" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  imageTemplateName: string,
  options: VirtualMachineImageTemplatesDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.VirtualMachineImages/imageTemplates/{imageTemplateName}{?api%2Dversion}",
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

/** Delete a virtual machine image template */
export function $delete(
  context: Client,
  resourceGroupName: string,
  imageTemplateName: string,
  options: VirtualMachineImageTemplatesDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _$deleteSend(context, resourceGroupName, imageTemplateName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-10-01",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  imageTemplateName: string,
  parameters: ImageTemplateUpdateParameters,
  options: VirtualMachineImageTemplatesUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.VirtualMachineImages/imageTemplates/{imageTemplateName}{?api%2Dversion}",
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
    .patch({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/json",
      headers: { accept: "application/json", ...options.requestOptions?.headers },
      body: imageTemplateUpdateParametersSerializer(parameters),
    });
}

export async function _updateDeserialize(result: PathUncheckedResponse): Promise<ImageTemplate> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return imageTemplateDeserializer(result.body);
}

/** Update the tags for this Virtual Machine Image Template */
export function update(
  context: Client,
  resourceGroupName: string,
  imageTemplateName: string,
  parameters: ImageTemplateUpdateParameters,
  options: VirtualMachineImageTemplatesUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<ImageTemplate>, ImageTemplate> {
  return getLongRunningPoller(context, _updateDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _updateSend(context, resourceGroupName, imageTemplateName, parameters, options),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2025-10-01",
  }) as PollerLike<OperationState<ImageTemplate>, ImageTemplate>;
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  imageTemplateName: string,
  parameters: ImageTemplate,
  options: VirtualMachineImageTemplatesCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.VirtualMachineImages/imageTemplates/{imageTemplateName}{?api%2Dversion}",
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
    .put({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/json",
      headers: { accept: "application/json", ...options.requestOptions?.headers },
      body: imageTemplateSerializer(parameters),
    });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<ImageTemplate> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return imageTemplateDeserializer(result.body);
}

/** Create or update a virtual machine image template */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  imageTemplateName: string,
  parameters: ImageTemplate,
  options: VirtualMachineImageTemplatesCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<ImageTemplate>, ImageTemplate> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(context, resourceGroupName, imageTemplateName, parameters, options),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2025-10-01",
  }) as PollerLike<OperationState<ImageTemplate>, ImageTemplate>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  imageTemplateName: string,
  options: VirtualMachineImageTemplatesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.VirtualMachineImages/imageTemplates/{imageTemplateName}{?api%2Dversion}",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<ImageTemplate> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return imageTemplateDeserializer(result.body);
}

/** Get information about a virtual machine image template */
export async function get(
  context: Client,
  resourceGroupName: string,
  imageTemplateName: string,
  options: VirtualMachineImageTemplatesGetOptionalParams = { requestOptions: {} },
): Promise<ImageTemplate> {
  const result = await _getSend(context, resourceGroupName, imageTemplateName, options);
  return _getDeserialize(result);
}

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ComputeManagementContext as Client } from "../index.js";
import type {
  VirtualMachineRunCommandUpdate,
  VirtualMachineDiagnosticRunCommand,
  _VirtualMachineDiagnosticRunCommandsListResult,
} from "../../models/compute/models.js";
import {
  virtualMachineRunCommandUpdateSerializer,
  virtualMachineDiagnosticRunCommandSerializer,
  virtualMachineDiagnosticRunCommandDeserializer,
  _virtualMachineDiagnosticRunCommandsListResultDeserializer,
} from "../../models/compute/models.js";
import { errorResponseDeserializer } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  VirtualMachineScaleSetVMDiagnosticRunCommandsDiagnosticListOptionalParams,
  VirtualMachineScaleSetVMDiagnosticRunCommandsDeleteOptionalParams,
  VirtualMachineScaleSetVMDiagnosticRunCommandsUpdateOptionalParams,
  VirtualMachineScaleSetVMDiagnosticRunCommandsCreateOrUpdateOptionalParams,
  VirtualMachineScaleSetVMDiagnosticRunCommandsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _diagnosticListSend(
  context: Client,
  resourceGroupName: string,
  vmScaleSetName: string,
  instanceId: string,
  options: VirtualMachineScaleSetVMDiagnosticRunCommandsDiagnosticListOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/virtualMachines/{instanceId}/diagnosticRunCommands{?api%2Dversion,%24expand}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      vmScaleSetName: vmScaleSetName,
      instanceId: instanceId,
      "api%2Dversion": "2026-04-01",
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

export async function _diagnosticListDeserialize(
  result: PathUncheckedResponse,
): Promise<_VirtualMachineDiagnosticRunCommandsListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _virtualMachineDiagnosticRunCommandsListResultDeserializer(result.body);
}
/** The operation to get all diagnostic run commands of an instance in Virtual Machine Scaleset. */
export function diagnosticList(
  context: Client,
  resourceGroupName: string,
  vmScaleSetName: string,
  instanceId: string,
  options: VirtualMachineScaleSetVMDiagnosticRunCommandsDiagnosticListOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<VirtualMachineDiagnosticRunCommand> {
  return buildPagedAsyncIterator(
    context,
    () => _diagnosticListSend(context, resourceGroupName, vmScaleSetName, instanceId, options),
    _diagnosticListDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: "2026-04-01" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  vmScaleSetName: string,
  instanceId: string,
  runCommandName: string,
  options: VirtualMachineScaleSetVMDiagnosticRunCommandsDeleteOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/virtualMachines/{instanceId}/diagnosticRunCommands/{runCommandName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      vmScaleSetName: vmScaleSetName,
      instanceId: instanceId,
      runCommandName: runCommandName,
      "api%2Dversion": "2026-04-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _$deleteDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200", "202", "204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return;
}
/** The operation to delete the VMSS VM diagnostic run command. */
export function $delete(
  context: Client,
  resourceGroupName: string,
  vmScaleSetName: string,
  instanceId: string,
  runCommandName: string,
  options: VirtualMachineScaleSetVMDiagnosticRunCommandsDeleteOptionalParams = {
    requestOptions: {},
  },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["200", "202", "204"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(context, resourceGroupName, vmScaleSetName, instanceId, runCommandName, options),
    resourceLocationConfig: "location",
    apiVersion: "2026-04-01",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  vmScaleSetName: string,
  instanceId: string,
  runCommandName: string,
  runCommand: VirtualMachineRunCommandUpdate,
  options: VirtualMachineScaleSetVMDiagnosticRunCommandsUpdateOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/virtualMachines/{instanceId}/diagnosticRunCommands/{runCommandName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      vmScaleSetName: vmScaleSetName,
      instanceId: instanceId,
      runCommandName: runCommandName,
      "api%2Dversion": "2026-04-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: virtualMachineRunCommandUpdateSerializer(runCommand),
  });
}

export async function _updateDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return;
}
/** The operation to update the VMSS VM diagnostic run command. */
export function update(
  context: Client,
  resourceGroupName: string,
  vmScaleSetName: string,
  instanceId: string,
  runCommandName: string,
  runCommand: VirtualMachineRunCommandUpdate,
  options: VirtualMachineScaleSetVMDiagnosticRunCommandsUpdateOptionalParams = {
    requestOptions: {},
  },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _updateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _updateSend(
        context,
        resourceGroupName,
        vmScaleSetName,
        instanceId,
        runCommandName,
        runCommand,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: "2026-04-01",
  }) as PollerLike<OperationState<void>, void>;
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  vmScaleSetName: string,
  instanceId: string,
  runCommandName: string,
  runCommand: VirtualMachineDiagnosticRunCommand,
  options: VirtualMachineScaleSetVMDiagnosticRunCommandsCreateOrUpdateOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/virtualMachines/{instanceId}/diagnosticRunCommands/{runCommandName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      vmScaleSetName: vmScaleSetName,
      instanceId: instanceId,
      runCommandName: runCommandName,
      "api%2Dversion": "2026-04-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: virtualMachineDiagnosticRunCommandSerializer(runCommand),
  });
}

export async function _createOrUpdateDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return;
}
/** The operation to create or update the VMSS VM diagnostic run command. */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  vmScaleSetName: string,
  instanceId: string,
  runCommandName: string,
  runCommand: VirtualMachineDiagnosticRunCommand,
  options: VirtualMachineScaleSetVMDiagnosticRunCommandsCreateOrUpdateOptionalParams = {
    requestOptions: {},
  },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(
        context,
        resourceGroupName,
        vmScaleSetName,
        instanceId,
        runCommandName,
        runCommand,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: "2026-04-01",
  }) as PollerLike<OperationState<void>, void>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  vmScaleSetName: string,
  instanceId: string,
  runCommandName: string,
  options: VirtualMachineScaleSetVMDiagnosticRunCommandsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/virtualMachines/{instanceId}/diagnosticRunCommands/{runCommandName}{?api%2Dversion,%24expand}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      vmScaleSetName: vmScaleSetName,
      instanceId: instanceId,
      runCommandName: runCommandName,
      "api%2Dversion": "2026-04-01",
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

export async function _getDeserialize(
  result: PathUncheckedResponse,
): Promise<VirtualMachineDiagnosticRunCommand> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return virtualMachineDiagnosticRunCommandDeserializer(result.body);
}
/** The operation to get the VMSS VM diagnostic run command. */
export async function get(
  context: Client,
  resourceGroupName: string,
  vmScaleSetName: string,
  instanceId: string,
  runCommandName: string,
  options: VirtualMachineScaleSetVMDiagnosticRunCommandsGetOptionalParams = { requestOptions: {} },
): Promise<VirtualMachineDiagnosticRunCommand> {
  const result = await _getSend(
    context,
    resourceGroupName,
    vmScaleSetName,
    instanceId,
    runCommandName,
    options,
  );
  return _getDeserialize(result);
}

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkCloudContext as Client } from "../index.js";
import {
  errorResponseDeserializer,
  OperationStatusResult,
  operationStatusResultDeserializer,
  BareMetalMachine,
  bareMetalMachineSerializer,
  bareMetalMachineDeserializer,
  bareMetalMachinePatchParametersSerializer,
  _BareMetalMachineList,
  _bareMetalMachineListDeserializer,
  bareMetalMachineCordonParametersSerializer,
  bareMetalMachinePowerOffParametersSerializer,
  bareMetalMachineReimageParametersSerializer,
  bareMetalMachineReplaceParametersSerializer,
  BareMetalMachineRunCommandParameters,
  bareMetalMachineRunCommandParametersSerializer,
  BareMetalMachineRunDataExtractsParameters,
  bareMetalMachineRunDataExtractsParametersSerializer,
  BareMetalMachineRunReadCommandsParameters,
  bareMetalMachineRunReadCommandsParametersSerializer,
} from "../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  BareMetalMachinesUncordonOptionalParams,
  BareMetalMachinesStartOptionalParams,
  BareMetalMachinesRunReadCommandsOptionalParams,
  BareMetalMachinesRunDataExtractsRestrictedOptionalParams,
  BareMetalMachinesRunDataExtractsOptionalParams,
  BareMetalMachinesRunCommandOptionalParams,
  BareMetalMachinesRestartOptionalParams,
  BareMetalMachinesReplaceOptionalParams,
  BareMetalMachinesReimageOptionalParams,
  BareMetalMachinesPowerOffOptionalParams,
  BareMetalMachinesCordonOptionalParams,
  BareMetalMachinesListBySubscriptionOptionalParams,
  BareMetalMachinesListByResourceGroupOptionalParams,
  BareMetalMachinesDeleteOptionalParams,
  BareMetalMachinesUpdateOptionalParams,
  BareMetalMachinesCreateOrUpdateOptionalParams,
  BareMetalMachinesGetOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";
import { PollerLike, OperationState } from "@azure/core-lro";

export function _uncordonSend(
  context: Client,
  resourceGroupName: string,
  bareMetalMachineName: string,
  options: BareMetalMachinesUncordonOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkCloud/bareMetalMachines/{bareMetalMachineName}/uncordon{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      bareMetalMachineName: bareMetalMachineName,
      "api%2Dversion": context.apiVersion ?? "2026-05-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({ ...operationOptionsToRequestParameters(options) });
}

export async function _uncordonDeserialize(
  result: PathUncheckedResponse,
): Promise<OperationStatusResult> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return operationStatusResultDeserializer(result.body);
}

/** Uncordon the provided bare metal machine's Kubernetes node. */
export function uncordon(
  context: Client,
  resourceGroupName: string,
  bareMetalMachineName: string,
  options: BareMetalMachinesUncordonOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<OperationStatusResult>, OperationStatusResult> {
  return getLongRunningPoller(context, _uncordonDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _uncordonSend(context, resourceGroupName, bareMetalMachineName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-05-01-preview",
  }) as PollerLike<OperationState<OperationStatusResult>, OperationStatusResult>;
}

export function _startSend(
  context: Client,
  resourceGroupName: string,
  bareMetalMachineName: string,
  options: BareMetalMachinesStartOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkCloud/bareMetalMachines/{bareMetalMachineName}/start{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      bareMetalMachineName: bareMetalMachineName,
      "api%2Dversion": context.apiVersion ?? "2026-05-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({ ...operationOptionsToRequestParameters(options) });
}

export async function _startDeserialize(
  result: PathUncheckedResponse,
): Promise<OperationStatusResult> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return operationStatusResultDeserializer(result.body);
}

/** Start the provided bare metal machine. */
export function start(
  context: Client,
  resourceGroupName: string,
  bareMetalMachineName: string,
  options: BareMetalMachinesStartOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<OperationStatusResult>, OperationStatusResult> {
  return getLongRunningPoller(context, _startDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _startSend(context, resourceGroupName, bareMetalMachineName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-05-01-preview",
  }) as PollerLike<OperationState<OperationStatusResult>, OperationStatusResult>;
}

export function _runReadCommandsSend(
  context: Client,
  resourceGroupName: string,
  bareMetalMachineName: string,
  bareMetalMachineRunReadCommandsParameters: BareMetalMachineRunReadCommandsParameters,
  options: BareMetalMachinesRunReadCommandsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkCloud/bareMetalMachines/{bareMetalMachineName}/runReadCommands{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      bareMetalMachineName: bareMetalMachineName,
      "api%2Dversion": context.apiVersion ?? "2026-05-01-preview",
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
      body: bareMetalMachineRunReadCommandsParametersSerializer(
        bareMetalMachineRunReadCommandsParameters,
      ),
    });
}

export async function _runReadCommandsDeserialize(
  result: PathUncheckedResponse,
): Promise<OperationStatusResult> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return operationStatusResultDeserializer(result.body);
}

/** Run one or more read-only commands on the provided bare metal machine. The URL to storage account with the command execution results and the command exit code can be retrieved from the operation status API once available. */
export function runReadCommands(
  context: Client,
  resourceGroupName: string,
  bareMetalMachineName: string,
  bareMetalMachineRunReadCommandsParameters: BareMetalMachineRunReadCommandsParameters,
  options: BareMetalMachinesRunReadCommandsOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<OperationStatusResult>, OperationStatusResult> {
  return getLongRunningPoller(context, _runReadCommandsDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _runReadCommandsSend(
        context,
        resourceGroupName,
        bareMetalMachineName,
        bareMetalMachineRunReadCommandsParameters,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-05-01-preview",
  }) as PollerLike<OperationState<OperationStatusResult>, OperationStatusResult>;
}

export function _runDataExtractsRestrictedSend(
  context: Client,
  resourceGroupName: string,
  bareMetalMachineName: string,
  bareMetalMachineRunDataExtractsRestrictedParameters: BareMetalMachineRunDataExtractsParameters,
  options: BareMetalMachinesRunDataExtractsRestrictedOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkCloud/bareMetalMachines/{bareMetalMachineName}/runDataExtractsRestricted{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      bareMetalMachineName: bareMetalMachineName,
      "api%2Dversion": context.apiVersion ?? "2026-05-01-preview",
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
      body: bareMetalMachineRunDataExtractsParametersSerializer(
        bareMetalMachineRunDataExtractsRestrictedParameters,
      ),
    });
}

export async function _runDataExtractsRestrictedDeserialize(
  result: PathUncheckedResponse,
): Promise<OperationStatusResult> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return operationStatusResultDeserializer(result.body);
}

/** Run one or more restricted data extractions on the provided bare metal machine. The URL to storage account with the command execution results and the command exit code can be retrieved from the operation status API once available. */
export function runDataExtractsRestricted(
  context: Client,
  resourceGroupName: string,
  bareMetalMachineName: string,
  bareMetalMachineRunDataExtractsRestrictedParameters: BareMetalMachineRunDataExtractsParameters,
  options: BareMetalMachinesRunDataExtractsRestrictedOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<OperationStatusResult>, OperationStatusResult> {
  return getLongRunningPoller(
    context,
    _runDataExtractsRestrictedDeserialize,
    ["202", "200", "201"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _runDataExtractsRestrictedSend(
          context,
          resourceGroupName,
          bareMetalMachineName,
          bareMetalMachineRunDataExtractsRestrictedParameters,
          options,
        ),
      resourceLocationConfig: "location",
      apiVersion: context.apiVersion ?? "2026-05-01-preview",
    },
  ) as PollerLike<OperationState<OperationStatusResult>, OperationStatusResult>;
}

export function _runDataExtractsSend(
  context: Client,
  resourceGroupName: string,
  bareMetalMachineName: string,
  bareMetalMachineRunDataExtractsParameters: BareMetalMachineRunDataExtractsParameters,
  options: BareMetalMachinesRunDataExtractsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkCloud/bareMetalMachines/{bareMetalMachineName}/runDataExtracts{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      bareMetalMachineName: bareMetalMachineName,
      "api%2Dversion": context.apiVersion ?? "2026-05-01-preview",
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
      body: bareMetalMachineRunDataExtractsParametersSerializer(
        bareMetalMachineRunDataExtractsParameters,
      ),
    });
}

export async function _runDataExtractsDeserialize(
  result: PathUncheckedResponse,
): Promise<OperationStatusResult> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return operationStatusResultDeserializer(result.body);
}

/** Run one or more data extractions on the provided bare metal machine. The URL to storage account with the command execution results and the command exit code can be retrieved from the operation status API once available. */
export function runDataExtracts(
  context: Client,
  resourceGroupName: string,
  bareMetalMachineName: string,
  bareMetalMachineRunDataExtractsParameters: BareMetalMachineRunDataExtractsParameters,
  options: BareMetalMachinesRunDataExtractsOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<OperationStatusResult>, OperationStatusResult> {
  return getLongRunningPoller(context, _runDataExtractsDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _runDataExtractsSend(
        context,
        resourceGroupName,
        bareMetalMachineName,
        bareMetalMachineRunDataExtractsParameters,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-05-01-preview",
  }) as PollerLike<OperationState<OperationStatusResult>, OperationStatusResult>;
}

export function _runCommandSend(
  context: Client,
  resourceGroupName: string,
  bareMetalMachineName: string,
  bareMetalMachineRunCommandParameters: BareMetalMachineRunCommandParameters,
  options: BareMetalMachinesRunCommandOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkCloud/bareMetalMachines/{bareMetalMachineName}/runCommand{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      bareMetalMachineName: bareMetalMachineName,
      "api%2Dversion": context.apiVersion ?? "2026-05-01-preview",
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
      body: bareMetalMachineRunCommandParametersSerializer(bareMetalMachineRunCommandParameters),
    });
}

export async function _runCommandDeserialize(
  result: PathUncheckedResponse,
): Promise<OperationStatusResult> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return operationStatusResultDeserializer(result.body);
}

/** Run the command or the script on the provided bare metal machine. The URL to storage account with the command execution results and the command exit code can be retrieved from the operation status API once available. */
export function runCommand(
  context: Client,
  resourceGroupName: string,
  bareMetalMachineName: string,
  bareMetalMachineRunCommandParameters: BareMetalMachineRunCommandParameters,
  options: BareMetalMachinesRunCommandOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<OperationStatusResult>, OperationStatusResult> {
  return getLongRunningPoller(context, _runCommandDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _runCommandSend(
        context,
        resourceGroupName,
        bareMetalMachineName,
        bareMetalMachineRunCommandParameters,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-05-01-preview",
  }) as PollerLike<OperationState<OperationStatusResult>, OperationStatusResult>;
}

export function _restartSend(
  context: Client,
  resourceGroupName: string,
  bareMetalMachineName: string,
  options: BareMetalMachinesRestartOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkCloud/bareMetalMachines/{bareMetalMachineName}/restart{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      bareMetalMachineName: bareMetalMachineName,
      "api%2Dversion": context.apiVersion ?? "2026-05-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({ ...operationOptionsToRequestParameters(options) });
}

export async function _restartDeserialize(
  result: PathUncheckedResponse,
): Promise<OperationStatusResult> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return operationStatusResultDeserializer(result.body);
}

/** Restart the provided bare metal machine. */
export function restart(
  context: Client,
  resourceGroupName: string,
  bareMetalMachineName: string,
  options: BareMetalMachinesRestartOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<OperationStatusResult>, OperationStatusResult> {
  return getLongRunningPoller(context, _restartDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _restartSend(context, resourceGroupName, bareMetalMachineName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-05-01-preview",
  }) as PollerLike<OperationState<OperationStatusResult>, OperationStatusResult>;
}

export function _replaceSend(
  context: Client,
  resourceGroupName: string,
  bareMetalMachineName: string,
  options: BareMetalMachinesReplaceOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkCloud/bareMetalMachines/{bareMetalMachineName}/replace{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      bareMetalMachineName: bareMetalMachineName,
      "api%2Dversion": context.apiVersion ?? "2026-05-01-preview",
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
      body: !options?.bareMetalMachineReplaceParameters
        ? options?.bareMetalMachineReplaceParameters
        : bareMetalMachineReplaceParametersSerializer(options?.bareMetalMachineReplaceParameters),
    });
}

export async function _replaceDeserialize(
  result: PathUncheckedResponse,
): Promise<OperationStatusResult> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return operationStatusResultDeserializer(result.body);
}

/** Replace the provided bare metal machine. */
export function replace(
  context: Client,
  resourceGroupName: string,
  bareMetalMachineName: string,
  options: BareMetalMachinesReplaceOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<OperationStatusResult>, OperationStatusResult> {
  return getLongRunningPoller(context, _replaceDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _replaceSend(context, resourceGroupName, bareMetalMachineName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-05-01-preview",
  }) as PollerLike<OperationState<OperationStatusResult>, OperationStatusResult>;
}

export function _reimageSend(
  context: Client,
  resourceGroupName: string,
  bareMetalMachineName: string,
  options: BareMetalMachinesReimageOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkCloud/bareMetalMachines/{bareMetalMachineName}/reimage{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      bareMetalMachineName: bareMetalMachineName,
      "api%2Dversion": context.apiVersion ?? "2026-05-01-preview",
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
      body: !options?.body
        ? options?.body
        : bareMetalMachineReimageParametersSerializer(options?.body),
    });
}

export async function _reimageDeserialize(
  result: PathUncheckedResponse,
): Promise<OperationStatusResult> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return operationStatusResultDeserializer(result.body);
}

/** Reimage the provided bare metal machine. */
export function reimage(
  context: Client,
  resourceGroupName: string,
  bareMetalMachineName: string,
  options: BareMetalMachinesReimageOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<OperationStatusResult>, OperationStatusResult> {
  return getLongRunningPoller(context, _reimageDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _reimageSend(context, resourceGroupName, bareMetalMachineName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-05-01-preview",
  }) as PollerLike<OperationState<OperationStatusResult>, OperationStatusResult>;
}

export function _powerOffSend(
  context: Client,
  resourceGroupName: string,
  bareMetalMachineName: string,
  options: BareMetalMachinesPowerOffOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkCloud/bareMetalMachines/{bareMetalMachineName}/powerOff{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      bareMetalMachineName: bareMetalMachineName,
      "api%2Dversion": context.apiVersion ?? "2026-05-01-preview",
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
      body: !options?.bareMetalMachinePowerOffParameters
        ? options?.bareMetalMachinePowerOffParameters
        : bareMetalMachinePowerOffParametersSerializer(options?.bareMetalMachinePowerOffParameters),
    });
}

export async function _powerOffDeserialize(
  result: PathUncheckedResponse,
): Promise<OperationStatusResult> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return operationStatusResultDeserializer(result.body);
}

/** Power off the provided bare metal machine. */
export function powerOff(
  context: Client,
  resourceGroupName: string,
  bareMetalMachineName: string,
  options: BareMetalMachinesPowerOffOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<OperationStatusResult>, OperationStatusResult> {
  return getLongRunningPoller(context, _powerOffDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _powerOffSend(context, resourceGroupName, bareMetalMachineName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-05-01-preview",
  }) as PollerLike<OperationState<OperationStatusResult>, OperationStatusResult>;
}

export function _cordonSend(
  context: Client,
  resourceGroupName: string,
  bareMetalMachineName: string,
  options: BareMetalMachinesCordonOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkCloud/bareMetalMachines/{bareMetalMachineName}/cordon{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      bareMetalMachineName: bareMetalMachineName,
      "api%2Dversion": context.apiVersion ?? "2026-05-01-preview",
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
      body: !options?.bareMetalMachineCordonParameters
        ? options?.bareMetalMachineCordonParameters
        : bareMetalMachineCordonParametersSerializer(options?.bareMetalMachineCordonParameters),
    });
}

export async function _cordonDeserialize(
  result: PathUncheckedResponse,
): Promise<OperationStatusResult> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return operationStatusResultDeserializer(result.body);
}

/** Cordon the provided bare metal machine's Kubernetes node. */
export function cordon(
  context: Client,
  resourceGroupName: string,
  bareMetalMachineName: string,
  options: BareMetalMachinesCordonOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<OperationStatusResult>, OperationStatusResult> {
  return getLongRunningPoller(context, _cordonDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _cordonSend(context, resourceGroupName, bareMetalMachineName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-05-01-preview",
  }) as PollerLike<OperationState<OperationStatusResult>, OperationStatusResult>;
}

export function _listBySubscriptionSend(
  context: Client,
  options: BareMetalMachinesListBySubscriptionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.NetworkCloud/bareMetalMachines{?api%2Dversion,%24top,%24skipToken}",
    {
      subscriptionId: context.subscriptionId,
      "api%2Dversion": context.apiVersion ?? "2026-05-01-preview",
      "%24top": options?.top,
      "%24skipToken": options?.skipToken,
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

export async function _listBySubscriptionDeserialize(
  result: PathUncheckedResponse,
): Promise<_BareMetalMachineList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _bareMetalMachineListDeserializer(result.body);
}

/** Get a list of bare metal machines in the provided subscription. */
export function listBySubscription(
  context: Client,
  options: BareMetalMachinesListBySubscriptionOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<BareMetalMachine> {
  return buildPagedAsyncIterator(
    context,
    () => _listBySubscriptionSend(context, options),
    _listBySubscriptionDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2026-05-01-preview",
    },
  );
}

export function _listByResourceGroupSend(
  context: Client,
  resourceGroupName: string,
  options: BareMetalMachinesListByResourceGroupOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkCloud/bareMetalMachines{?api%2Dversion,%24top,%24skipToken}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      "api%2Dversion": context.apiVersion ?? "2026-05-01-preview",
      "%24top": options?.top,
      "%24skipToken": options?.skipToken,
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
): Promise<_BareMetalMachineList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _bareMetalMachineListDeserializer(result.body);
}

/** Get a list of bare metal machines in the provided resource group. */
export function listByResourceGroup(
  context: Client,
  resourceGroupName: string,
  options: BareMetalMachinesListByResourceGroupOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<BareMetalMachine> {
  return buildPagedAsyncIterator(
    context,
    () => _listByResourceGroupSend(context, resourceGroupName, options),
    _listByResourceGroupDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2026-05-01-preview",
    },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  bareMetalMachineName: string,
  options: BareMetalMachinesDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkCloud/bareMetalMachines/{bareMetalMachineName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      bareMetalMachineName: bareMetalMachineName,
      "api%2Dversion": context.apiVersion ?? "2026-05-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .delete({
      ...operationOptionsToRequestParameters(options),
      headers: {
        ...(options?.ifMatch !== undefined ? { "if-match": options?.ifMatch } : {}),
        ...(options?.ifNoneMatch !== undefined ? { "if-none-match": options?.ifNoneMatch } : {}),
        ...options.requestOptions?.headers,
      },
    });
}

export async function _$deleteDeserialize(
  result: PathUncheckedResponse,
): Promise<OperationStatusResult> {
  const expectedStatuses = ["202", "204", "200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return operationStatusResultDeserializer(result.body);
}

/** Delete the provided bare metal machine. All customer initiated requests will be rejected as the life cycle of this resource is managed by the system. */
export function $delete(
  context: Client,
  resourceGroupName: string,
  bareMetalMachineName: string,
  options: BareMetalMachinesDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<OperationStatusResult>, OperationStatusResult> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(context, resourceGroupName, bareMetalMachineName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-05-01-preview",
  }) as PollerLike<OperationState<OperationStatusResult>, OperationStatusResult>;
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  bareMetalMachineName: string,
  options: BareMetalMachinesUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkCloud/bareMetalMachines/{bareMetalMachineName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      bareMetalMachineName: bareMetalMachineName,
      "api%2Dversion": context.apiVersion ?? "2026-05-01-preview",
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
      headers: {
        ...(options?.ifMatch !== undefined ? { "if-match": options?.ifMatch } : {}),
        ...(options?.ifNoneMatch !== undefined ? { "if-none-match": options?.ifNoneMatch } : {}),
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
      body: !options?.bareMetalMachineUpdateParameters
        ? options?.bareMetalMachineUpdateParameters
        : bareMetalMachinePatchParametersSerializer(options?.bareMetalMachineUpdateParameters),
    });
}

export async function _updateDeserialize(result: PathUncheckedResponse): Promise<BareMetalMachine> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return bareMetalMachineDeserializer(result.body);
}

/** Patch properties of the provided bare metal machine, or update tags associated with the bare metal machine. Properties and tag updates can be done independently. */
export function update(
  context: Client,
  resourceGroupName: string,
  bareMetalMachineName: string,
  options: BareMetalMachinesUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<BareMetalMachine>, BareMetalMachine> {
  return getLongRunningPoller(context, _updateDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _updateSend(context, resourceGroupName, bareMetalMachineName, options),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2026-05-01-preview",
  }) as PollerLike<OperationState<BareMetalMachine>, BareMetalMachine>;
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  bareMetalMachineName: string,
  bareMetalMachineParameters: BareMetalMachine,
  options: BareMetalMachinesCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkCloud/bareMetalMachines/{bareMetalMachineName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      bareMetalMachineName: bareMetalMachineName,
      "api%2Dversion": context.apiVersion ?? "2026-05-01-preview",
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
      headers: {
        ...(options?.ifMatch !== undefined ? { "if-match": options?.ifMatch } : {}),
        ...(options?.ifNoneMatch !== undefined ? { "if-none-match": options?.ifNoneMatch } : {}),
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
      body: bareMetalMachineSerializer(bareMetalMachineParameters),
    });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<BareMetalMachine> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return bareMetalMachineDeserializer(result.body);
}

/** Create a new bare metal machine or update the properties of the existing one. All customer initiated requests will be rejected as the life cycle of this resource is managed by the system. */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  bareMetalMachineName: string,
  bareMetalMachineParameters: BareMetalMachine,
  options: BareMetalMachinesCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<BareMetalMachine>, BareMetalMachine> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(
        context,
        resourceGroupName,
        bareMetalMachineName,
        bareMetalMachineParameters,
        options,
      ),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2026-05-01-preview",
  }) as PollerLike<OperationState<BareMetalMachine>, BareMetalMachine>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  bareMetalMachineName: string,
  options: BareMetalMachinesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkCloud/bareMetalMachines/{bareMetalMachineName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      bareMetalMachineName: bareMetalMachineName,
      "api%2Dversion": context.apiVersion ?? "2026-05-01-preview",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<BareMetalMachine> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return bareMetalMachineDeserializer(result.body);
}

/** Get properties of the provided bare metal machine. */
export async function get(
  context: Client,
  resourceGroupName: string,
  bareMetalMachineName: string,
  options: BareMetalMachinesGetOptionalParams = { requestOptions: {} },
): Promise<BareMetalMachine> {
  const result = await _getSend(context, resourceGroupName, bareMetalMachineName, options);
  return _getDeserialize(result);
}

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ComputeContext as Client } from "../index.js";
import type {
  _RunCommandListResult,
  RunCommandDocumentBase,
  RunCommandDocument,
} from "../../models/models.js";
import {
  cloudErrorDeserializer,
  _runCommandListResultDeserializer,
  runCommandDocumentDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  VirtualMachineRunCommandsOperationGroupGetOptionalParams,
  VirtualMachineRunCommandsOperationGroupListOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _getSend(
  context: Client,
  location: string,
  commandId: string,
  options: VirtualMachineRunCommandsOperationGroupGetOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Compute/locations/{location}/runCommands/{commandId}{?api%2Dversion}",
    {
      location: location,
      commandId: commandId,
      subscriptionId: context.subscriptionId,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({ ...operationOptionsToRequestParameters(options) });
}

export async function _getDeserialize(result: PathUncheckedResponse): Promise<RunCommandDocument> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);
    throw error;
  }

  return runCommandDocumentDeserializer(result.body);
}

/** Gets specific run command for a subscription in a location. */
export async function get(
  context: Client,
  location: string,
  commandId: string,
  options: VirtualMachineRunCommandsOperationGroupGetOptionalParams = {
    requestOptions: {},
  },
): Promise<RunCommandDocument> {
  const result = await _getSend(context, location, commandId, options);
  return _getDeserialize(result);
}

export function _listSend(
  context: Client,
  location: string,
  options: VirtualMachineRunCommandsOperationGroupListOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Compute/locations/{location}/runCommands{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      location: location,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({ ...operationOptionsToRequestParameters(options) });
}

export async function _listDeserialize(
  result: PathUncheckedResponse,
): Promise<_RunCommandListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);
    throw error;
  }

  return _runCommandListResultDeserializer(result.body);
}

/** Lists all available run commands for a subscription in a location. */
export function list(
  context: Client,
  location: string,
  options: VirtualMachineRunCommandsOperationGroupListOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<RunCommandDocumentBase> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, location, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

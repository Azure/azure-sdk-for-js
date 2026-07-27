// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AutomationContext as Client } from "../index.js";
import type {
  _SourceControlSyncJobStreamsListBySyncJob,
  SourceControlSyncJobStream,
  SourceControlSyncJobStreamById,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  _sourceControlSyncJobStreamsListBySyncJobDeserializer,
  sourceControlSyncJobStreamByIdDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  SourceControlSyncJobStreamsGetOptionalParams,
  SourceControlSyncJobStreamsListBySyncJobOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _getSend(
  context: Client,
  resourceGroupName: string,
  automationAccountName: string,
  sourceControlName: string,
  sourceControlSyncJobId: string,
  streamId: string,
  options: SourceControlSyncJobStreamsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Automation/automationAccounts/{automationAccountName}/sourceControls/{sourceControlName}/sourceControlSyncJobs/{sourceControlSyncJobId}/streams/{streamId}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      automationAccountName: automationAccountName,
      sourceControlName: sourceControlName,
      sourceControlSyncJobId: sourceControlSyncJobId,
      streamId: streamId,
      "api%2Dversion": context.apiVersion ?? "2024-10-23",
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
): Promise<SourceControlSyncJobStreamById> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return sourceControlSyncJobStreamByIdDeserializer(result.body);
}

/** Retrieve a sync job stream identified by stream id. */
export async function get(
  context: Client,
  resourceGroupName: string,
  automationAccountName: string,
  sourceControlName: string,
  sourceControlSyncJobId: string,
  streamId: string,
  options: SourceControlSyncJobStreamsGetOptionalParams = { requestOptions: {} },
): Promise<SourceControlSyncJobStreamById> {
  const result = await _getSend(
    context,
    resourceGroupName,
    automationAccountName,
    sourceControlName,
    sourceControlSyncJobId,
    streamId,
    options,
  );
  return _getDeserialize(result);
}

export function _listBySyncJobSend(
  context: Client,
  resourceGroupName: string,
  automationAccountName: string,
  sourceControlName: string,
  sourceControlSyncJobId: string,
  options: SourceControlSyncJobStreamsListBySyncJobOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Automation/automationAccounts/{automationAccountName}/sourceControls/{sourceControlName}/sourceControlSyncJobs/{sourceControlSyncJobId}/streams{?api%2Dversion,%24filter}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      automationAccountName: automationAccountName,
      sourceControlName: sourceControlName,
      sourceControlSyncJobId: sourceControlSyncJobId,
      "api%2Dversion": context.apiVersion ?? "2024-10-23",
      "%24filter": options?.filter,
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

export async function _listBySyncJobDeserialize(
  result: PathUncheckedResponse,
): Promise<_SourceControlSyncJobStreamsListBySyncJob> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _sourceControlSyncJobStreamsListBySyncJobDeserializer(result.body);
}

/** Retrieve a list of sync job streams identified by sync job id. */
export function listBySyncJob(
  context: Client,
  resourceGroupName: string,
  automationAccountName: string,
  sourceControlName: string,
  sourceControlSyncJobId: string,
  options: SourceControlSyncJobStreamsListBySyncJobOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<SourceControlSyncJobStream> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _listBySyncJobSend(
        context,
        resourceGroupName,
        automationAccountName,
        sourceControlName,
        sourceControlSyncJobId,
        options,
      ),
    _listBySyncJobDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2024-10-23" },
  );
}

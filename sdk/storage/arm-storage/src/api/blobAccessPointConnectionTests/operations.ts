// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { StorageManagementContext as Client } from "../index.js";
import type {
  BlobAccessPointConnectionTestResponse,
  BlobAccessPointProposedConnectionTestRequest,
} from "../../models/models.js";
import {
  errorResponseDeserializer_1,
  blobAccessPointConnectionTestResponseDeserializer,
  blobAccessPointProposedConnectionTestRequestSerializer,
} from "../../models/models.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type { BlobAccessPointConnectionTestsTestProposedConnectionOptionalParams } from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _testProposedConnectionSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  body: BlobAccessPointProposedConnectionTestRequest,
  options: BlobAccessPointConnectionTestsTestProposedConnectionOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Storage/storageAccounts/{accountName}/testBlobAccessPointConfigurationProposedConnection{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      "api%2Dversion": context.apiVersion ?? "2026-09-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: blobAccessPointProposedConnectionTestRequestSerializer(body),
  });
}

export async function _testProposedConnectionDeserialize(
  result: PathUncheckedResponse,
): Promise<BlobAccessPointConnectionTestResponse> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer_1(result.body);
    }

    throw error;
  }

  return blobAccessPointConnectionTestResponseDeserializer(result.body);
}

/** Test a proposed Blob Access Point connection before the configuration is created. The connection is validated in the context of the storage account in the request path, so no Blob Access Point configuration needs to exist beforehand. */
export function testProposedConnection(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  body: BlobAccessPointProposedConnectionTestRequest,
  options: BlobAccessPointConnectionTestsTestProposedConnectionOptionalParams = {
    requestOptions: {},
  },
): PollerLike<
  OperationState<BlobAccessPointConnectionTestResponse>,
  BlobAccessPointConnectionTestResponse
> {
  return getLongRunningPoller(context, _testProposedConnectionDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _testProposedConnectionSend(context, resourceGroupName, accountName, body, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-09-01",
  }) as PollerLike<
    OperationState<BlobAccessPointConnectionTestResponse>,
    BlobAccessPointConnectionTestResponse
  >;
}

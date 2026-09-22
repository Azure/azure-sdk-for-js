// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NetworkManagementContext as Client } from "../index.js";
import { cloudErrorDeserializer } from "../../models/common/models.js";
import type { _ExpressRouteCrossConnectionListResult } from "../../models/models.js";
import { _expressRouteCrossConnectionListResultDeserializer } from "../../models/models.js";
import type {
  TagsObject,
  ExpressRouteCircuitsArpTableListResult,
  ExpressRouteCircuitsRoutesTableListResult,
  ExpressRouteCrossConnection,
  ExpressRouteCrossConnectionsRoutesTableSummaryListResult,
  MigrateExpressRouteCircuitValidateAndHealthCheckRequest,
  MigrateExpressRouteCircuitValidateResponse,
  MigrateExpressRouteCircuitHealthCheckResponse,
  MigrateExpressRouteCircuitRequest,
} from "../../models/network/models.js";
import {
  tagsObjectSerializer,
  expressRouteCircuitsArpTableListResultDeserializer,
  expressRouteCircuitsRoutesTableListResultDeserializer,
  expressRouteCrossConnectionSerializer,
  expressRouteCrossConnectionDeserializer,
  expressRouteCrossConnectionsRoutesTableSummaryListResultDeserializer,
  migrateExpressRouteCircuitValidateAndHealthCheckRequestSerializer,
  migrateExpressRouteCircuitValidateResponseDeserializer,
  migrateExpressRouteCircuitHealthCheckResponseDeserializer,
  migrateExpressRouteCircuitRequestSerializer,
} from "../../models/network/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  ExpressRouteCrossConnectionsRollbackCircuitMigrationOptionalParams,
  ExpressRouteCrossConnectionsCommitCircuitMigrationOptionalParams,
  ExpressRouteCrossConnectionsMigrateCircuitOptionalParams,
  ExpressRouteCrossConnectionsRestoreBgpForCircuitMigrationOptionalParams,
  ExpressRouteCrossConnectionsShutDownBgpForCircuitMigrationOptionalParams,
  ExpressRouteCrossConnectionsPrepareCircuitMigrationOptionalParams,
  ExpressRouteCrossConnectionsGetCircuitMigrationInfoOptionalParams,
  ExpressRouteCrossConnectionsValidateCircuitMigrationOptionalParams,
  ExpressRouteCrossConnectionsListRoutesTableOptionalParams,
  ExpressRouteCrossConnectionsListRoutesTableSummaryOptionalParams,
  ExpressRouteCrossConnectionsListArpTableOptionalParams,
  ExpressRouteCrossConnectionsListOptionalParams,
  ExpressRouteCrossConnectionsListByResourceGroupOptionalParams,
  ExpressRouteCrossConnectionsUpdateTagsOptionalParams,
  ExpressRouteCrossConnectionsCreateOrUpdateOptionalParams,
  ExpressRouteCrossConnectionsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _rollbackCircuitMigrationSend(
  context: Client,
  resourceGroupName: string,
  crossConnectionName: string,
  parameters: MigrateExpressRouteCircuitRequest,
  options: ExpressRouteCrossConnectionsRollbackCircuitMigrationOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/expressRouteCrossConnections/{crossConnectionName}/rollbackCircuitMigration{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      crossConnectionName: crossConnectionName,
      "api%2Dversion": "2026-01-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: migrateExpressRouteCircuitRequestSerializer(parameters),
  });
}

export async function _rollbackCircuitMigrationDeserialize(
  result: PathUncheckedResponse,
): Promise<MigrateExpressRouteCircuitHealthCheckResponse> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = cloudErrorDeserializer(result.body);
    }

    throw error;
  }

  return migrateExpressRouteCircuitHealthCheckResponseDeserializer(result.body);
}

/** Rolls back the express route circuit migration for a cross connection. */
export function rollbackCircuitMigration(
  context: Client,
  resourceGroupName: string,
  crossConnectionName: string,
  parameters: MigrateExpressRouteCircuitRequest,
  options: ExpressRouteCrossConnectionsRollbackCircuitMigrationOptionalParams = {
    requestOptions: {},
  },
): PollerLike<
  OperationState<MigrateExpressRouteCircuitHealthCheckResponse>,
  MigrateExpressRouteCircuitHealthCheckResponse
> {
  return getLongRunningPoller(
    context,
    _rollbackCircuitMigrationDeserialize,
    ["200", "202", "201"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _rollbackCircuitMigrationSend(
          context,
          resourceGroupName,
          crossConnectionName,
          parameters,
          options,
        ),
      resourceLocationConfig: "location",
      apiVersion: "2026-01-01",
    },
  ) as PollerLike<
    OperationState<MigrateExpressRouteCircuitHealthCheckResponse>,
    MigrateExpressRouteCircuitHealthCheckResponse
  >;
}

export function _commitCircuitMigrationSend(
  context: Client,
  resourceGroupName: string,
  crossConnectionName: string,
  parameters: MigrateExpressRouteCircuitRequest,
  options: ExpressRouteCrossConnectionsCommitCircuitMigrationOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/expressRouteCrossConnections/{crossConnectionName}/commitCircuitMigration{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      crossConnectionName: crossConnectionName,
      "api%2Dversion": "2026-01-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: migrateExpressRouteCircuitRequestSerializer(parameters),
  });
}

export async function _commitCircuitMigrationDeserialize(
  result: PathUncheckedResponse,
): Promise<MigrateExpressRouteCircuitHealthCheckResponse> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = cloudErrorDeserializer(result.body);
    }

    throw error;
  }

  return migrateExpressRouteCircuitHealthCheckResponseDeserializer(result.body);
}

/** Commits the express route circuit migration for a cross connection. */
export function commitCircuitMigration(
  context: Client,
  resourceGroupName: string,
  crossConnectionName: string,
  parameters: MigrateExpressRouteCircuitRequest,
  options: ExpressRouteCrossConnectionsCommitCircuitMigrationOptionalParams = {
    requestOptions: {},
  },
): PollerLike<
  OperationState<MigrateExpressRouteCircuitHealthCheckResponse>,
  MigrateExpressRouteCircuitHealthCheckResponse
> {
  return getLongRunningPoller(context, _commitCircuitMigrationDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _commitCircuitMigrationSend(
        context,
        resourceGroupName,
        crossConnectionName,
        parameters,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: "2026-01-01",
  }) as PollerLike<
    OperationState<MigrateExpressRouteCircuitHealthCheckResponse>,
    MigrateExpressRouteCircuitHealthCheckResponse
  >;
}

export function _migrateCircuitSend(
  context: Client,
  resourceGroupName: string,
  crossConnectionName: string,
  parameters: MigrateExpressRouteCircuitRequest,
  options: ExpressRouteCrossConnectionsMigrateCircuitOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/expressRouteCrossConnections/{crossConnectionName}/migrateCircuit{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      crossConnectionName: crossConnectionName,
      "api%2Dversion": "2026-01-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: migrateExpressRouteCircuitRequestSerializer(parameters),
  });
}

export async function _migrateCircuitDeserialize(
  result: PathUncheckedResponse,
): Promise<MigrateExpressRouteCircuitHealthCheckResponse> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = cloudErrorDeserializer(result.body);
    }

    throw error;
  }

  return migrateExpressRouteCircuitHealthCheckResponseDeserializer(result.body);
}

/** Executes the express route circuit migration for a cross connection. */
export function migrateCircuit(
  context: Client,
  resourceGroupName: string,
  crossConnectionName: string,
  parameters: MigrateExpressRouteCircuitRequest,
  options: ExpressRouteCrossConnectionsMigrateCircuitOptionalParams = { requestOptions: {} },
): PollerLike<
  OperationState<MigrateExpressRouteCircuitHealthCheckResponse>,
  MigrateExpressRouteCircuitHealthCheckResponse
> {
  return getLongRunningPoller(context, _migrateCircuitDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _migrateCircuitSend(context, resourceGroupName, crossConnectionName, parameters, options),
    resourceLocationConfig: "location",
    apiVersion: "2026-01-01",
  }) as PollerLike<
    OperationState<MigrateExpressRouteCircuitHealthCheckResponse>,
    MigrateExpressRouteCircuitHealthCheckResponse
  >;
}

export function _restoreBgpForCircuitMigrationSend(
  context: Client,
  resourceGroupName: string,
  crossConnectionName: string,
  parameters: MigrateExpressRouteCircuitRequest,
  options: ExpressRouteCrossConnectionsRestoreBgpForCircuitMigrationOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/expressRouteCrossConnections/{crossConnectionName}/restoreBgpForCircuitMigration{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      crossConnectionName: crossConnectionName,
      "api%2Dversion": "2026-01-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: migrateExpressRouteCircuitRequestSerializer(parameters),
  });
}

export async function _restoreBgpForCircuitMigrationDeserialize(
  result: PathUncheckedResponse,
): Promise<MigrateExpressRouteCircuitHealthCheckResponse> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = cloudErrorDeserializer(result.body);
    }

    throw error;
  }

  return migrateExpressRouteCircuitHealthCheckResponseDeserializer(result.body);
}

/** Restores BGP sessions as part of an express route circuit migration for a cross connection. */
export function restoreBgpForCircuitMigration(
  context: Client,
  resourceGroupName: string,
  crossConnectionName: string,
  parameters: MigrateExpressRouteCircuitRequest,
  options: ExpressRouteCrossConnectionsRestoreBgpForCircuitMigrationOptionalParams = {
    requestOptions: {},
  },
): PollerLike<
  OperationState<MigrateExpressRouteCircuitHealthCheckResponse>,
  MigrateExpressRouteCircuitHealthCheckResponse
> {
  return getLongRunningPoller(
    context,
    _restoreBgpForCircuitMigrationDeserialize,
    ["200", "202", "201"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _restoreBgpForCircuitMigrationSend(
          context,
          resourceGroupName,
          crossConnectionName,
          parameters,
          options,
        ),
      resourceLocationConfig: "location",
      apiVersion: "2026-01-01",
    },
  ) as PollerLike<
    OperationState<MigrateExpressRouteCircuitHealthCheckResponse>,
    MigrateExpressRouteCircuitHealthCheckResponse
  >;
}

export function _shutDownBgpForCircuitMigrationSend(
  context: Client,
  resourceGroupName: string,
  crossConnectionName: string,
  parameters: MigrateExpressRouteCircuitRequest,
  options: ExpressRouteCrossConnectionsShutDownBgpForCircuitMigrationOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/expressRouteCrossConnections/{crossConnectionName}/shutDownBgpForCircuitMigration{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      crossConnectionName: crossConnectionName,
      "api%2Dversion": "2026-01-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: migrateExpressRouteCircuitRequestSerializer(parameters),
  });
}

export async function _shutDownBgpForCircuitMigrationDeserialize(
  result: PathUncheckedResponse,
): Promise<MigrateExpressRouteCircuitHealthCheckResponse> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = cloudErrorDeserializer(result.body);
    }

    throw error;
  }

  return migrateExpressRouteCircuitHealthCheckResponseDeserializer(result.body);
}

/** Shuts down BGP sessions as part of an express route circuit migration for a cross connection. */
export function shutDownBgpForCircuitMigration(
  context: Client,
  resourceGroupName: string,
  crossConnectionName: string,
  parameters: MigrateExpressRouteCircuitRequest,
  options: ExpressRouteCrossConnectionsShutDownBgpForCircuitMigrationOptionalParams = {
    requestOptions: {},
  },
): PollerLike<
  OperationState<MigrateExpressRouteCircuitHealthCheckResponse>,
  MigrateExpressRouteCircuitHealthCheckResponse
> {
  return getLongRunningPoller(
    context,
    _shutDownBgpForCircuitMigrationDeserialize,
    ["200", "202", "201"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _shutDownBgpForCircuitMigrationSend(
          context,
          resourceGroupName,
          crossConnectionName,
          parameters,
          options,
        ),
      resourceLocationConfig: "location",
      apiVersion: "2026-01-01",
    },
  ) as PollerLike<
    OperationState<MigrateExpressRouteCircuitHealthCheckResponse>,
    MigrateExpressRouteCircuitHealthCheckResponse
  >;
}

export function _prepareCircuitMigrationSend(
  context: Client,
  resourceGroupName: string,
  crossConnectionName: string,
  parameters: MigrateExpressRouteCircuitRequest,
  options: ExpressRouteCrossConnectionsPrepareCircuitMigrationOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/expressRouteCrossConnections/{crossConnectionName}/prepareCircuitMigration{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      crossConnectionName: crossConnectionName,
      "api%2Dversion": "2026-01-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: migrateExpressRouteCircuitRequestSerializer(parameters),
  });
}

export async function _prepareCircuitMigrationDeserialize(
  result: PathUncheckedResponse,
): Promise<MigrateExpressRouteCircuitHealthCheckResponse> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = cloudErrorDeserializer(result.body);
    }

    throw error;
  }

  return migrateExpressRouteCircuitHealthCheckResponseDeserializer(result.body);
}

/** Prepares an express route circuit migration for a cross connection. */
export function prepareCircuitMigration(
  context: Client,
  resourceGroupName: string,
  crossConnectionName: string,
  parameters: MigrateExpressRouteCircuitRequest,
  options: ExpressRouteCrossConnectionsPrepareCircuitMigrationOptionalParams = {
    requestOptions: {},
  },
): PollerLike<
  OperationState<MigrateExpressRouteCircuitHealthCheckResponse>,
  MigrateExpressRouteCircuitHealthCheckResponse
> {
  return getLongRunningPoller(context, _prepareCircuitMigrationDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _prepareCircuitMigrationSend(
        context,
        resourceGroupName,
        crossConnectionName,
        parameters,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: "2026-01-01",
  }) as PollerLike<
    OperationState<MigrateExpressRouteCircuitHealthCheckResponse>,
    MigrateExpressRouteCircuitHealthCheckResponse
  >;
}

export function _getCircuitMigrationInfoSend(
  context: Client,
  resourceGroupName: string,
  crossConnectionName: string,
  parameters: MigrateExpressRouteCircuitValidateAndHealthCheckRequest,
  options: ExpressRouteCrossConnectionsGetCircuitMigrationInfoOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/expressRouteCrossConnections/{crossConnectionName}/getCircuitMigrationInfo{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      crossConnectionName: crossConnectionName,
      "api%2Dversion": "2026-01-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: migrateExpressRouteCircuitValidateAndHealthCheckRequestSerializer(parameters),
  });
}

export async function _getCircuitMigrationInfoDeserialize(
  result: PathUncheckedResponse,
): Promise<MigrateExpressRouteCircuitHealthCheckResponse> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = cloudErrorDeserializer(result.body);
    }

    throw error;
  }

  return migrateExpressRouteCircuitHealthCheckResponseDeserializer(result.body);
}

/** Gets migration health information for an express route circuit cross connection. */
export function getCircuitMigrationInfo(
  context: Client,
  resourceGroupName: string,
  crossConnectionName: string,
  parameters: MigrateExpressRouteCircuitValidateAndHealthCheckRequest,
  options: ExpressRouteCrossConnectionsGetCircuitMigrationInfoOptionalParams = {
    requestOptions: {},
  },
): PollerLike<
  OperationState<MigrateExpressRouteCircuitHealthCheckResponse>,
  MigrateExpressRouteCircuitHealthCheckResponse
> {
  return getLongRunningPoller(context, _getCircuitMigrationInfoDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _getCircuitMigrationInfoSend(
        context,
        resourceGroupName,
        crossConnectionName,
        parameters,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: "2026-01-01",
  }) as PollerLike<
    OperationState<MigrateExpressRouteCircuitHealthCheckResponse>,
    MigrateExpressRouteCircuitHealthCheckResponse
  >;
}

export function _validateCircuitMigrationSend(
  context: Client,
  resourceGroupName: string,
  crossConnectionName: string,
  parameters: MigrateExpressRouteCircuitValidateAndHealthCheckRequest,
  options: ExpressRouteCrossConnectionsValidateCircuitMigrationOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/expressRouteCrossConnections/{crossConnectionName}/validateCircuitMigration{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      crossConnectionName: crossConnectionName,
      "api%2Dversion": "2026-01-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: migrateExpressRouteCircuitValidateAndHealthCheckRequestSerializer(parameters),
  });
}

export async function _validateCircuitMigrationDeserialize(
  result: PathUncheckedResponse,
): Promise<MigrateExpressRouteCircuitValidateResponse> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = cloudErrorDeserializer(result.body);
    }

    throw error;
  }

  return migrateExpressRouteCircuitValidateResponseDeserializer(result.body);
}

/** Validates express route circuit migration for a cross connection. */
export function validateCircuitMigration(
  context: Client,
  resourceGroupName: string,
  crossConnectionName: string,
  parameters: MigrateExpressRouteCircuitValidateAndHealthCheckRequest,
  options: ExpressRouteCrossConnectionsValidateCircuitMigrationOptionalParams = {
    requestOptions: {},
  },
): PollerLike<
  OperationState<MigrateExpressRouteCircuitValidateResponse>,
  MigrateExpressRouteCircuitValidateResponse
> {
  return getLongRunningPoller(
    context,
    _validateCircuitMigrationDeserialize,
    ["200", "202", "201"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _validateCircuitMigrationSend(
          context,
          resourceGroupName,
          crossConnectionName,
          parameters,
          options,
        ),
      resourceLocationConfig: "location",
      apiVersion: "2026-01-01",
    },
  ) as PollerLike<
    OperationState<MigrateExpressRouteCircuitValidateResponse>,
    MigrateExpressRouteCircuitValidateResponse
  >;
}

export function _listRoutesTableSend(
  context: Client,
  resourceGroupName: string,
  crossConnectionName: string,
  peeringName: string,
  devicePath: string,
  options: ExpressRouteCrossConnectionsListRoutesTableOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/expressRouteCrossConnections/{crossConnectionName}/peerings/{peeringName}/routeTables/{devicePath}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      crossConnectionName: crossConnectionName,
      peeringName: peeringName,
      devicePath: devicePath,
      "api%2Dversion": "2026-01-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _listRoutesTableDeserialize(
  result: PathUncheckedResponse,
): Promise<ExpressRouteCircuitsRoutesTableListResult> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = cloudErrorDeserializer(result.body);
    }

    throw error;
  }

  return expressRouteCircuitsRoutesTableListResultDeserializer(result.body);
}

/** Gets the currently advertised routes table associated with the express route cross connection in a resource group. */
export function listRoutesTable(
  context: Client,
  resourceGroupName: string,
  crossConnectionName: string,
  peeringName: string,
  devicePath: string,
  options: ExpressRouteCrossConnectionsListRoutesTableOptionalParams = { requestOptions: {} },
): PollerLike<
  OperationState<ExpressRouteCircuitsRoutesTableListResult>,
  ExpressRouteCircuitsRoutesTableListResult
> {
  return getLongRunningPoller(context, _listRoutesTableDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _listRoutesTableSend(
        context,
        resourceGroupName,
        crossConnectionName,
        peeringName,
        devicePath,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: "2026-01-01",
  }) as PollerLike<
    OperationState<ExpressRouteCircuitsRoutesTableListResult>,
    ExpressRouteCircuitsRoutesTableListResult
  >;
}

export function _listRoutesTableSummarySend(
  context: Client,
  resourceGroupName: string,
  crossConnectionName: string,
  peeringName: string,
  devicePath: string,
  options: ExpressRouteCrossConnectionsListRoutesTableSummaryOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/expressRouteCrossConnections/{crossConnectionName}/peerings/{peeringName}/routeTablesSummary/{devicePath}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      crossConnectionName: crossConnectionName,
      peeringName: peeringName,
      devicePath: devicePath,
      "api%2Dversion": "2026-01-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _listRoutesTableSummaryDeserialize(
  result: PathUncheckedResponse,
): Promise<ExpressRouteCrossConnectionsRoutesTableSummaryListResult> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = cloudErrorDeserializer(result.body);
    }

    throw error;
  }

  return expressRouteCrossConnectionsRoutesTableSummaryListResultDeserializer(result.body);
}

/** Gets the route table summary associated with the express route cross connection in a resource group. */
export function listRoutesTableSummary(
  context: Client,
  resourceGroupName: string,
  crossConnectionName: string,
  peeringName: string,
  devicePath: string,
  options: ExpressRouteCrossConnectionsListRoutesTableSummaryOptionalParams = {
    requestOptions: {},
  },
): PollerLike<
  OperationState<ExpressRouteCrossConnectionsRoutesTableSummaryListResult>,
  ExpressRouteCrossConnectionsRoutesTableSummaryListResult
> {
  return getLongRunningPoller(context, _listRoutesTableSummaryDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _listRoutesTableSummarySend(
        context,
        resourceGroupName,
        crossConnectionName,
        peeringName,
        devicePath,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: "2026-01-01",
  }) as PollerLike<
    OperationState<ExpressRouteCrossConnectionsRoutesTableSummaryListResult>,
    ExpressRouteCrossConnectionsRoutesTableSummaryListResult
  >;
}

export function _listArpTableSend(
  context: Client,
  resourceGroupName: string,
  crossConnectionName: string,
  peeringName: string,
  devicePath: string,
  options: ExpressRouteCrossConnectionsListArpTableOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/expressRouteCrossConnections/{crossConnectionName}/peerings/{peeringName}/arpTables/{devicePath}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      crossConnectionName: crossConnectionName,
      peeringName: peeringName,
      devicePath: devicePath,
      "api%2Dversion": "2026-01-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _listArpTableDeserialize(
  result: PathUncheckedResponse,
): Promise<ExpressRouteCircuitsArpTableListResult> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = cloudErrorDeserializer(result.body);
    }

    throw error;
  }

  return expressRouteCircuitsArpTableListResultDeserializer(result.body);
}

/** Gets the currently advertised ARP table associated with the express route cross connection in a resource group. */
export function listArpTable(
  context: Client,
  resourceGroupName: string,
  crossConnectionName: string,
  peeringName: string,
  devicePath: string,
  options: ExpressRouteCrossConnectionsListArpTableOptionalParams = { requestOptions: {} },
): PollerLike<
  OperationState<ExpressRouteCircuitsArpTableListResult>,
  ExpressRouteCircuitsArpTableListResult
> {
  return getLongRunningPoller(context, _listArpTableDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _listArpTableSend(
        context,
        resourceGroupName,
        crossConnectionName,
        peeringName,
        devicePath,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: "2026-01-01",
  }) as PollerLike<
    OperationState<ExpressRouteCircuitsArpTableListResult>,
    ExpressRouteCircuitsArpTableListResult
  >;
}

export function _listSend(
  context: Client,
  options: ExpressRouteCrossConnectionsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Network/expressRouteCrossConnections{?api%2Dversion,%24filter}",
    {
      subscriptionId: context.subscriptionId,
      "api%2Dversion": "2026-01-01",
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

export async function _listDeserialize(
  result: PathUncheckedResponse,
): Promise<_ExpressRouteCrossConnectionListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = cloudErrorDeserializer(result.body);
    }

    throw error;
  }

  return _expressRouteCrossConnectionListResultDeserializer(result.body);
}

/** Retrieves all the ExpressRouteCrossConnections in a subscription. */
export function list(
  context: Client,
  options: ExpressRouteCrossConnectionsListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<ExpressRouteCrossConnection> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: "2026-01-01" },
  );
}

export function _listByResourceGroupSend(
  context: Client,
  resourceGroupName: string,
  options: ExpressRouteCrossConnectionsListByResourceGroupOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/expressRouteCrossConnections{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      "api%2Dversion": "2026-01-01",
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

export async function _listByResourceGroupDeserialize(
  result: PathUncheckedResponse,
): Promise<_ExpressRouteCrossConnectionListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = cloudErrorDeserializer(result.body);
    }

    throw error;
  }

  return _expressRouteCrossConnectionListResultDeserializer(result.body);
}

/** Retrieves all the ExpressRouteCrossConnections in a resource group. */
export function listByResourceGroup(
  context: Client,
  resourceGroupName: string,
  options: ExpressRouteCrossConnectionsListByResourceGroupOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<ExpressRouteCrossConnection> {
  return buildPagedAsyncIterator(
    context,
    () => _listByResourceGroupSend(context, resourceGroupName, options),
    _listByResourceGroupDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: "2026-01-01" },
  );
}

export function _updateTagsSend(
  context: Client,
  resourceGroupName: string,
  crossConnectionName: string,
  crossConnectionParameters: TagsObject,
  options: ExpressRouteCrossConnectionsUpdateTagsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/expressRouteCrossConnections/{crossConnectionName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      crossConnectionName: crossConnectionName,
      "api%2Dversion": "2026-01-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: tagsObjectSerializer(crossConnectionParameters),
  });
}

export async function _updateTagsDeserialize(
  result: PathUncheckedResponse,
): Promise<ExpressRouteCrossConnection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = cloudErrorDeserializer(result.body);
    }

    throw error;
  }

  return expressRouteCrossConnectionDeserializer(result.body);
}

/** Updates an express route cross connection tags. */
export async function updateTags(
  context: Client,
  resourceGroupName: string,
  crossConnectionName: string,
  crossConnectionParameters: TagsObject,
  options: ExpressRouteCrossConnectionsUpdateTagsOptionalParams = { requestOptions: {} },
): Promise<ExpressRouteCrossConnection> {
  const result = await _updateTagsSend(
    context,
    resourceGroupName,
    crossConnectionName,
    crossConnectionParameters,
    options,
  );
  return _updateTagsDeserialize(result);
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  crossConnectionName: string,
  parameters: ExpressRouteCrossConnection,
  options: ExpressRouteCrossConnectionsCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/expressRouteCrossConnections/{crossConnectionName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      crossConnectionName: crossConnectionName,
      "api%2Dversion": "2026-01-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: expressRouteCrossConnectionSerializer(parameters),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<ExpressRouteCrossConnection> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = cloudErrorDeserializer(result.body);
    }

    throw error;
  }

  return expressRouteCrossConnectionDeserializer(result.body);
}

/** Update the specified ExpressRouteCrossConnection. */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  crossConnectionName: string,
  parameters: ExpressRouteCrossConnection,
  options: ExpressRouteCrossConnectionsCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<ExpressRouteCrossConnection>, ExpressRouteCrossConnection> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(context, resourceGroupName, crossConnectionName, parameters, options),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: "2026-01-01",
  }) as PollerLike<OperationState<ExpressRouteCrossConnection>, ExpressRouteCrossConnection>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  crossConnectionName: string,
  options: ExpressRouteCrossConnectionsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/expressRouteCrossConnections/{crossConnectionName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      crossConnectionName: crossConnectionName,
      "api%2Dversion": "2026-01-01",
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
): Promise<ExpressRouteCrossConnection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = cloudErrorDeserializer(result.body);
    }

    throw error;
  }

  return expressRouteCrossConnectionDeserializer(result.body);
}

/** Gets details about the specified ExpressRouteCrossConnection. */
export async function get(
  context: Client,
  resourceGroupName: string,
  crossConnectionName: string,
  options: ExpressRouteCrossConnectionsGetOptionalParams = { requestOptions: {} },
): Promise<ExpressRouteCrossConnection> {
  const result = await _getSend(context, resourceGroupName, crossConnectionName, options);
  return _getDeserialize(result);
}

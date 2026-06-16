// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { CloudHealthContext } from "../../api/cloudHealthContext.js";
import {
  ingestHealthReport,
  getSignalHistory,
  getHistory,
  listByHealthModel,
  $delete,
  createOrUpdate,
  get,
} from "../../api/entities/operations.js";
import type {
  EntitiesIngestHealthReportOptionalParams,
  EntitiesGetSignalHistoryOptionalParams,
  EntitiesGetHistoryOptionalParams,
  EntitiesListByHealthModelOptionalParams,
  EntitiesDeleteOptionalParams,
  EntitiesCreateOrUpdateOptionalParams,
  EntitiesGetOptionalParams,
} from "../../api/entities/options.js";
import type {
  Entity,
  EntityHistoryRequest,
  EntityHistoryResponse,
  SignalHistoryRequest,
  SignalHistoryResponse,
  HealthReportRequest,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a Entities operations. */
export interface EntitiesOperations {
  /** Ingest a health report for a specific signal on an entity (the entity must already exist) */
  ingestHealthReport: (
    resourceGroupName: string,
    healthModelName: string,
    entityName: string,
    body: HealthReportRequest,
    options?: EntitiesIngestHealthReportOptionalParams,
  ) => Promise<void>;
  /** Retrieve the time series history for a signal on an entity */
  getSignalHistory: (
    resourceGroupName: string,
    healthModelName: string,
    entityName: string,
    body: SignalHistoryRequest,
    options?: EntitiesGetSignalHistoryOptionalParams,
  ) => Promise<SignalHistoryResponse>;
  /** Retrieve the health state transition history for an entity */
  getHistory: (
    resourceGroupName: string,
    healthModelName: string,
    entityName: string,
    body: EntityHistoryRequest,
    options?: EntitiesGetHistoryOptionalParams,
  ) => Promise<EntityHistoryResponse>;
  /** List Entity resources by HealthModel */
  listByHealthModel: (
    resourceGroupName: string,
    healthModelName: string,
    options?: EntitiesListByHealthModelOptionalParams,
  ) => PagedAsyncIterableIterator<Entity>;
  /** Delete a Entity */
  delete: (
    resourceGroupName: string,
    healthModelName: string,
    entityName: string,
    options?: EntitiesDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Create a Entity */
  createOrUpdate: (
    resourceGroupName: string,
    healthModelName: string,
    entityName: string,
    resource: Entity,
    options?: EntitiesCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<Entity>, Entity>;
  /** Get a Entity */
  get: (
    resourceGroupName: string,
    healthModelName: string,
    entityName: string,
    options?: EntitiesGetOptionalParams,
  ) => Promise<Entity>;
}

function _getEntities(context: CloudHealthContext) {
  return {
    ingestHealthReport: (
      resourceGroupName: string,
      healthModelName: string,
      entityName: string,
      body: HealthReportRequest,
      options?: EntitiesIngestHealthReportOptionalParams,
    ) => ingestHealthReport(context, resourceGroupName, healthModelName, entityName, body, options),
    getSignalHistory: (
      resourceGroupName: string,
      healthModelName: string,
      entityName: string,
      body: SignalHistoryRequest,
      options?: EntitiesGetSignalHistoryOptionalParams,
    ) => getSignalHistory(context, resourceGroupName, healthModelName, entityName, body, options),
    getHistory: (
      resourceGroupName: string,
      healthModelName: string,
      entityName: string,
      body: EntityHistoryRequest,
      options?: EntitiesGetHistoryOptionalParams,
    ) => getHistory(context, resourceGroupName, healthModelName, entityName, body, options),
    listByHealthModel: (
      resourceGroupName: string,
      healthModelName: string,
      options?: EntitiesListByHealthModelOptionalParams,
    ) => listByHealthModel(context, resourceGroupName, healthModelName, options),
    delete: (
      resourceGroupName: string,
      healthModelName: string,
      entityName: string,
      options?: EntitiesDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, healthModelName, entityName, options),
    createOrUpdate: (
      resourceGroupName: string,
      healthModelName: string,
      entityName: string,
      resource: Entity,
      options?: EntitiesCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, healthModelName, entityName, resource, options),
    get: (
      resourceGroupName: string,
      healthModelName: string,
      entityName: string,
      options?: EntitiesGetOptionalParams,
    ) => get(context, resourceGroupName, healthModelName, entityName, options),
  };
}

export function _getEntitiesOperations(context: CloudHealthContext): EntitiesOperations {
  return {
    ..._getEntities(context),
  };
}

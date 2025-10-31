// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PlanetaryComputerProContext } from "../../api/planetaryComputerProContext.js";
import {
  listManagedIdentities,
  listSources,
  getSource,
  deleteSource,
  replaceSource,
  createSource,
  update,
  list,
  get,
  $delete,
  create,
  listRuns,
  getRun,
  createRun,
  listOperations,
  getOperation,
  cancelAllOperations,
  cancelOperation,
} from "../../api/ingestion/operations.js";
import {
  IngestionListManagedIdentitiesOptionalParams,
  IngestionListSourcesOptionalParams,
  IngestionGetSourceOptionalParams,
  IngestionDeleteSourceOptionalParams,
  IngestionReplaceSourceOptionalParams,
  IngestionCreateSourceOptionalParams,
  IngestionUpdateOptionalParams,
  IngestionListOptionalParams,
  IngestionGetOptionalParams,
  IngestionDeleteOptionalParams,
  IngestionCreateOptionalParams,
  IngestionListRunsOptionalParams,
  IngestionGetRunOptionalParams,
  IngestionCreateRunOptionalParams,
  IngestionListOperationsOptionalParams,
  IngestionGetOperationOptionalParams,
  IngestionCancelAllOperationsOptionalParams,
  IngestionCancelOperationOptionalParams,
} from "../../api/ingestion/options.js";
import {
  Operation,
  IngestionRun,
  IngestionDefinition,
  IngestionSourceUnion,
  IngestionSourceSummary,
  ManagedIdentityMetadata,
} from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a Ingestion operations. */
export interface IngestionOperations {
  /** Get all managed identities with access to storage accounts configured for a geo-catalog */
  listManagedIdentities: (
    options?: IngestionListManagedIdentitiesOptionalParams,
  ) => PagedAsyncIterableIterator<ManagedIdentityMetadata>;
  /** Get ingestion sources in a geo-catalog */
  listSources: (
    options?: IngestionListSourcesOptionalParams,
  ) => PagedAsyncIterableIterator<IngestionSourceSummary>;
  /** Get an ingestion source in a geo-catalog */
  getSource: (
    id: string,
    options?: IngestionGetSourceOptionalParams,
  ) => Promise<IngestionSourceUnion>;
  /** Delete an ingestion source from a geo-catalog */
  deleteSource: (
    id: string,
    options?: IngestionDeleteSourceOptionalParams,
  ) => Promise<void>;
  /** Update an existing ingestion source in a geo-catalog */
  replaceSource: (
    id: string,
    body: IngestionSourceUnion,
    options?: IngestionReplaceSourceOptionalParams,
  ) => Promise<IngestionSourceUnion>;
  /** Create a new ingestion source in a geo-catalog */
  createSource: (
    body: IngestionSourceUnion,
    options?: IngestionCreateSourceOptionalParams,
  ) => Promise<IngestionSourceUnion>;
  /** Update an existing ingestion */
  update: (
    collectionId: string,
    ingestionId: string,
    body: IngestionDefinition,
    options?: IngestionUpdateOptionalParams,
  ) => Promise<IngestionDefinition>;
  /** Get ingestions of a catalog */
  list: (
    collectionId: string,
    options?: IngestionListOptionalParams,
  ) => PagedAsyncIterableIterator<IngestionDefinition>;
  /** Get the definition of an ingestion */
  get: (
    collectionId: string,
    ingestionId: string,
    options?: IngestionGetOptionalParams,
  ) => Promise<IngestionDefinition>;
  /** Delete an ingestion from a catalog. All runs of the ingestion will be deleted. Ingestion must not have any runs in progress or queued. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    collectionId: string,
    ingestionId: string,
    options?: IngestionDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Create a new ingestion */
  create: (
    collectionId: string,
    body: IngestionDefinition,
    options?: IngestionCreateOptionalParams,
  ) => Promise<IngestionDefinition>;
  /** Get the runs of an ingestion */
  listRuns: (
    collectionId: string,
    ingestionId: string,
    options?: IngestionListRunsOptionalParams,
  ) => PagedAsyncIterableIterator<IngestionRun>;
  /** Get a run of an ingestion */
  getRun: (
    collectionId: string,
    ingestionId: string,
    runId: string,
    options?: IngestionGetRunOptionalParams,
  ) => Promise<IngestionRun>;
  /** Create a new run of an ingestion */
  createRun: (
    collectionId: string,
    ingestionId: string,
    options?: IngestionCreateRunOptionalParams,
  ) => Promise<IngestionRun>;
  /** Get operations of a geo-catalog collection */
  listOperations: (
    options?: IngestionListOperationsOptionalParams,
  ) => PagedAsyncIterableIterator<Operation>;
  /** Get an operation of a geo-catalog collection */
  getOperation: (
    operationId: string,
    options?: IngestionGetOperationOptionalParams,
  ) => Promise<Operation>;
  /** Cancel all running operations of a geo-catalog collection */
  cancelAllOperations: (
    options?: IngestionCancelAllOperationsOptionalParams,
  ) => Promise<void>;
  /** Cancel a running operation of a geo-catalog collection */
  cancelOperation: (
    operationId: string,
    options?: IngestionCancelOperationOptionalParams,
  ) => Promise<void>;
}

function _getIngestion(context: PlanetaryComputerProContext) {
  return {
    listManagedIdentities: (
      options?: IngestionListManagedIdentitiesOptionalParams,
    ) => listManagedIdentities(context, options),
    listSources: (options?: IngestionListSourcesOptionalParams) =>
      listSources(context, options),
    getSource: (id: string, options?: IngestionGetSourceOptionalParams) =>
      getSource(context, id, options),
    deleteSource: (id: string, options?: IngestionDeleteSourceOptionalParams) =>
      deleteSource(context, id, options),
    replaceSource: (
      id: string,
      body: IngestionSourceUnion,
      options?: IngestionReplaceSourceOptionalParams,
    ) => replaceSource(context, id, body, options),
    createSource: (
      body: IngestionSourceUnion,
      options?: IngestionCreateSourceOptionalParams,
    ) => createSource(context, body, options),
    update: (
      collectionId: string,
      ingestionId: string,
      body: IngestionDefinition,
      options?: IngestionUpdateOptionalParams,
    ) => update(context, collectionId, ingestionId, body, options),
    list: (collectionId: string, options?: IngestionListOptionalParams) =>
      list(context, collectionId, options),
    get: (
      collectionId: string,
      ingestionId: string,
      options?: IngestionGetOptionalParams,
    ) => get(context, collectionId, ingestionId, options),
    delete: (
      collectionId: string,
      ingestionId: string,
      options?: IngestionDeleteOptionalParams,
    ) => $delete(context, collectionId, ingestionId, options),
    create: (
      collectionId: string,
      body: IngestionDefinition,
      options?: IngestionCreateOptionalParams,
    ) => create(context, collectionId, body, options),
    listRuns: (
      collectionId: string,
      ingestionId: string,
      options?: IngestionListRunsOptionalParams,
    ) => listRuns(context, collectionId, ingestionId, options),
    getRun: (
      collectionId: string,
      ingestionId: string,
      runId: string,
      options?: IngestionGetRunOptionalParams,
    ) => getRun(context, collectionId, ingestionId, runId, options),
    createRun: (
      collectionId: string,
      ingestionId: string,
      options?: IngestionCreateRunOptionalParams,
    ) => createRun(context, collectionId, ingestionId, options),
    listOperations: (options?: IngestionListOperationsOptionalParams) =>
      listOperations(context, options),
    getOperation: (
      operationId: string,
      options?: IngestionGetOperationOptionalParams,
    ) => getOperation(context, operationId, options),
    cancelAllOperations: (
      options?: IngestionCancelAllOperationsOptionalParams,
    ) => cancelAllOperations(context, options),
    cancelOperation: (
      operationId: string,
      options?: IngestionCancelOperationOptionalParams,
    ) => cancelOperation(context, operationId, options),
  };
}

export function _getIngestionOperations(
  context: PlanetaryComputerProContext,
): IngestionOperations {
  return {
    ..._getIngestion(context),
  };
}

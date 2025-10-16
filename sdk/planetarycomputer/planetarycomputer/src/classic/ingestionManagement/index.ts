// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PlanetaryComputerContext } from "../../api/planetaryComputerContext.js";
import {
  listManagedIdentities,
  listSources,
  getSource,
  deleteSource,
  createOrReplaceSource,
  createSource,
  update,
  lists,
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
} from "../../api/ingestionManagement/operations.js";
import {
  IngestionManagementListManagedIdentitiesOptionalParams,
  IngestionManagementListSourcesOptionalParams,
  IngestionManagementGetSourceOptionalParams,
  IngestionManagementDeleteSourceOptionalParams,
  IngestionManagementCreateOrReplaceSourceOptionalParams,
  IngestionManagementCreateSourceOptionalParams,
  IngestionManagementUpdateOptionalParams,
  IngestionManagementListsOptionalParams,
  IngestionManagementGetOptionalParams,
  IngestionManagementDeleteOptionalParams,
  IngestionManagementCreateOptionalParams,
  IngestionManagementListRunsOptionalParams,
  IngestionManagementGetRunOptionalParams,
  IngestionManagementCreateRunOptionalParams,
  IngestionManagementListOperationsOptionalParams,
  IngestionManagementGetOperationOptionalParams,
  IngestionManagementCancelAllOperationsOptionalParams,
  IngestionManagementCancelOperationOptionalParams,
} from "../../api/ingestionManagement/options.js";
import {
  Operation,
  IngestionRun,
  Ingestion,
  IngestionSourceUnion,
  IngestionSourceSummary,
  ManagedIdentityMetadata,
} from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a IngestionManagement operations. */
export interface IngestionManagementOperations {
  /** Get all managed identities with access to storage accounts configured for a geo-catalog */
  listManagedIdentities: (
    options?: IngestionManagementListManagedIdentitiesOptionalParams,
  ) => PagedAsyncIterableIterator<ManagedIdentityMetadata>;
  /** Get ingestion sources in a geo-catalog */
  listSources: (
    options?: IngestionManagementListSourcesOptionalParams,
  ) => PagedAsyncIterableIterator<IngestionSourceSummary>;
  /** Get an ingestion source in a geo-catalog */
  getSource: (
    id: string,
    options?: IngestionManagementGetSourceOptionalParams,
  ) => Promise<IngestionSourceUnion>;
  /** Delete an ingestion source from a geo-catalog */
  deleteSource: (
    id: string,
    options?: IngestionManagementDeleteSourceOptionalParams,
  ) => Promise<void>;
  /** Update an existing ingestion source in a geo-catalog */
  createOrReplaceSource: (
    id: string,
    ingestionSource: IngestionSourceUnion,
    options?: IngestionManagementCreateOrReplaceSourceOptionalParams,
  ) => Promise<IngestionSourceUnion>;
  /** Create a new ingestion source in a geo-catalog */
  createSource: (
    ingestionSource: IngestionSourceUnion,
    options?: IngestionManagementCreateSourceOptionalParams,
  ) => Promise<IngestionSourceUnion>;
  /** Update an existing ingestion */
  update: (
    collectionId: string,
    ingestionId: string,
    definition: Ingestion,
    options?: IngestionManagementUpdateOptionalParams,
  ) => Promise<Ingestion>;
  /** Get ingestions of a catalog */
  lists: (
    collectionId: string,
    options?: IngestionManagementListsOptionalParams,
  ) => PagedAsyncIterableIterator<Ingestion>;
  /** Get the definition of an ingestion */
  get: (
    collectionId: string,
    ingestionId: string,
    options?: IngestionManagementGetOptionalParams,
  ) => Promise<Ingestion>;
  /** Delete an ingestion from a catalog. All runs of the ingestion will be deleted. Ingestion must not have any runs in progress or queued. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    collectionId: string,
    ingestionId: string,
    options?: IngestionManagementDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Create a new ingestion */
  create: (
    collectionId: string,
    definition: Ingestion,
    options?: IngestionManagementCreateOptionalParams,
  ) => Promise<Ingestion>;
  /** Get the runs of an ingestion */
  listRuns: (
    collectionId: string,
    ingestionId: string,
    options?: IngestionManagementListRunsOptionalParams,
  ) => PagedAsyncIterableIterator<IngestionRun>;
  /** Get a run of an ingestion */
  getRun: (
    collectionId: string,
    ingestionId: string,
    runId: string,
    options?: IngestionManagementGetRunOptionalParams,
  ) => Promise<IngestionRun>;
  /** Create a new run of an ingestion */
  createRun: (
    collectionId: string,
    ingestionId: string,
    options?: IngestionManagementCreateRunOptionalParams,
  ) => Promise<IngestionRun>;
  /** Get operations of a geo-catalog collection */
  listOperations: (
    options?: IngestionManagementListOperationsOptionalParams,
  ) => PagedAsyncIterableIterator<Operation>;
  /** Get an operation of a geo-catalog collection */
  getOperation: (
    operationId: string,
    options?: IngestionManagementGetOperationOptionalParams,
  ) => Promise<Operation>;
  /** Cancel all running operations of a geo-catalog collection */
  cancelAllOperations: (
    options?: IngestionManagementCancelAllOperationsOptionalParams,
  ) => Promise<void>;
  /** Cancel a running operation of a geo-catalog collection */
  cancelOperation: (
    operationId: string,
    options?: IngestionManagementCancelOperationOptionalParams,
  ) => Promise<void>;
}

function _getIngestionManagement(context: PlanetaryComputerContext) {
  return {
    listManagedIdentities: (
      options?: IngestionManagementListManagedIdentitiesOptionalParams,
    ) => listManagedIdentities(context, options),
    listSources: (options?: IngestionManagementListSourcesOptionalParams) =>
      listSources(context, options),
    getSource: (
      id: string,
      options?: IngestionManagementGetSourceOptionalParams,
    ) => getSource(context, id, options),
    deleteSource: (
      id: string,
      options?: IngestionManagementDeleteSourceOptionalParams,
    ) => deleteSource(context, id, options),
    createOrReplaceSource: (
      id: string,
      ingestionSource: IngestionSourceUnion,
      options?: IngestionManagementCreateOrReplaceSourceOptionalParams,
    ) => createOrReplaceSource(context, id, ingestionSource, options),
    createSource: (
      ingestionSource: IngestionSourceUnion,
      options?: IngestionManagementCreateSourceOptionalParams,
    ) => createSource(context, ingestionSource, options),
    update: (
      collectionId: string,
      ingestionId: string,
      definition: Ingestion,
      options?: IngestionManagementUpdateOptionalParams,
    ) => update(context, collectionId, ingestionId, definition, options),
    lists: (
      collectionId: string,
      options?: IngestionManagementListsOptionalParams,
    ) => lists(context, collectionId, options),
    get: (
      collectionId: string,
      ingestionId: string,
      options?: IngestionManagementGetOptionalParams,
    ) => get(context, collectionId, ingestionId, options),
    delete: (
      collectionId: string,
      ingestionId: string,
      options?: IngestionManagementDeleteOptionalParams,
    ) => $delete(context, collectionId, ingestionId, options),
    create: (
      collectionId: string,
      definition: Ingestion,
      options?: IngestionManagementCreateOptionalParams,
    ) => create(context, collectionId, definition, options),
    listRuns: (
      collectionId: string,
      ingestionId: string,
      options?: IngestionManagementListRunsOptionalParams,
    ) => listRuns(context, collectionId, ingestionId, options),
    getRun: (
      collectionId: string,
      ingestionId: string,
      runId: string,
      options?: IngestionManagementGetRunOptionalParams,
    ) => getRun(context, collectionId, ingestionId, runId, options),
    createRun: (
      collectionId: string,
      ingestionId: string,
      options?: IngestionManagementCreateRunOptionalParams,
    ) => createRun(context, collectionId, ingestionId, options),
    listOperations: (
      options?: IngestionManagementListOperationsOptionalParams,
    ) => listOperations(context, options),
    getOperation: (
      operationId: string,
      options?: IngestionManagementGetOperationOptionalParams,
    ) => getOperation(context, operationId, options),
    cancelAllOperations: (
      options?: IngestionManagementCancelAllOperationsOptionalParams,
    ) => cancelAllOperations(context, options),
    cancelOperation: (
      operationId: string,
      options?: IngestionManagementCancelOperationOptionalParams,
    ) => cancelOperation(context, operationId, options),
  };
}

export function _getIngestionManagementOperations(
  context: PlanetaryComputerContext,
): IngestionManagementOperations {
  return {
    ..._getIngestionManagement(context),
  };
}

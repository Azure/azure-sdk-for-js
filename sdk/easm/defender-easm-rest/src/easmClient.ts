// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { EasmContext, EasmClientOptionalParams, createEasm } from "./api/index.js";
import {
  createOrReplacePolicy,
  deletePolicy,
  getPolicy,
  listPolicy,
  getCisaCve,
  getCisaCves,
  downloadTask,
  runTask,
  cancelTask,
  getTask,
  listTask,
  deleteSavedFilter,
  createOrReplaceSavedFilter,
  getSavedFilter,
  listSavedFilter,
  getSnapshotExport,
  getSummary,
  getSnapshot,
  getBillable,
  getDiscoTemplate,
  listDiscoTemplate,
  dismissAssetChain,
  getAssetChainSummary,
  listRuns,
  runDiscoGroup,
  createOrReplaceDiscoGroup,
  deleteDiscoGroup,
  getDiscoGroup,
  validateDiscoGroup,
  listDiscoGroup,
  deleteDataConnection,
  createOrReplaceDataConnection,
  getDataConnection,
  validateDataConnection,
  listDataConnection,
  getDeltaSummary,
  getDeltaDetails,
  getObservations,
  getAssetsExport,
  getAssetResource,
  updateAssets,
  listAssetResource,
} from "./api/operations.js";
import {
  CreateOrReplacePolicyOptionalParams,
  DeletePolicyOptionalParams,
  GetPolicyOptionalParams,
  ListPolicyOptionalParams,
  GetCisaCveOptionalParams,
  GetCisaCvesOptionalParams,
  DownloadTaskOptionalParams,
  RunTaskOptionalParams,
  CancelTaskOptionalParams,
  GetTaskOptionalParams,
  ListTaskOptionalParams,
  DeleteSavedFilterOptionalParams,
  CreateOrReplaceSavedFilterOptionalParams,
  GetSavedFilterOptionalParams,
  ListSavedFilterOptionalParams,
  GetSnapshotExportOptionalParams,
  GetSummaryOptionalParams,
  GetSnapshotOptionalParams,
  GetBillableOptionalParams,
  GetDiscoTemplateOptionalParams,
  ListDiscoTemplateOptionalParams,
  DismissAssetChainOptionalParams,
  GetAssetChainSummaryOptionalParams,
  ListRunsOptionalParams,
  RunDiscoGroupOptionalParams,
  CreateOrReplaceDiscoGroupOptionalParams,
  DeleteDiscoGroupOptionalParams,
  GetDiscoGroupOptionalParams,
  ValidateDiscoGroupOptionalParams,
  ListDiscoGroupOptionalParams,
  DeleteDataConnectionOptionalParams,
  CreateOrReplaceDataConnectionOptionalParams,
  GetDataConnectionOptionalParams,
  ValidateDataConnectionOptionalParams,
  ListDataConnectionOptionalParams,
  GetDeltaSummaryOptionalParams,
  GetDeltaDetailsOptionalParams,
  GetObservationsOptionalParams,
  GetAssetsExportOptionalParams,
  GetAssetResourceOptionalParams,
  UpdateAssetsOptionalParams,
  ListAssetResourceOptionalParams,
} from "./api/options.js";
import {
  AssetResourceUnion,
  AssetUpdateData,
  Task,
  AssetsExportRequest,
  ObservationPageResult,
  DeltaDetailsRequest,
  DeltaResult,
  DeltaSummaryRequest,
  DeltaSummaryResult,
  DataConnectionUnion,
  DataConnectionDataUnion,
  ValidateResult,
  DiscoGroup,
  DiscoRunResult,
  DiscoGroupData,
  AssetChainRequest,
  AssetChainSummaryResult,
  DiscoTemplate,
  ReportBillableAssetSummaryResult,
  ReportAssetSnapshotRequest,
  ReportAssetSnapshotResult,
  ReportAssetSummaryRequest,
  ReportAssetSummaryResult,
  ReportAssetSnapshotExportRequest,
  SavedFilter,
  SavedFilterData,
  CisaCveResult,
  Policy,
} from "./models/models.js";
import { PagedAsyncIterableIterator } from "./static-helpers/pagingHelpers.js";
import { TokenCredential } from "@azure/core-auth";
import { Pipeline } from "@azure/core-rest-pipeline";

export type { EasmClientOptionalParams } from "./api/easmContext.js";

export class EasmClient {
  private _client: EasmContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  constructor(
    endpointParam: string,
    credential: TokenCredential,
    options: EasmClientOptionalParams = {},
  ) {
    const prefixFromOptions = options?.userAgentOptions?.userAgentPrefix;
    const userAgentPrefix = prefixFromOptions
      ? `${prefixFromOptions} azsdk-js-client`
      : `azsdk-js-client`;
    this._client = createEasm(endpointParam, credential, {
      ...options,
      userAgentOptions: { userAgentPrefix },
    });
    this.pipeline = this._client.pipeline;
  }

  /** Create a policy with a given policyName. */
  createOrReplacePolicy(
    policyName: string,
    body: Policy,
    options: CreateOrReplacePolicyOptionalParams = { requestOptions: {} },
  ): Promise<Policy> {
    return createOrReplacePolicy(this._client, policyName, body, options);
  }

  /** Delete a policy with a given policyName. */
  deletePolicy(
    policyName: string,
    options: DeletePolicyOptionalParams = { requestOptions: {} },
  ): Promise<void> {
    return deletePolicy(this._client, policyName, options);
  }

  /** Retrieve a policy with a given policyName. */
  getPolicy(
    policyName: string,
    options: GetPolicyOptionalParams = { requestOptions: {} },
  ): Promise<Policy> {
    return getPolicy(this._client, policyName, options);
  }

  /** Retrieve a list of policies for the provided search parameters. */
  listPolicy(
    options: ListPolicyOptionalParams = { requestOptions: {} },
  ): PagedAsyncIterableIterator<Policy> {
    return listPolicy(this._client, options);
  }

  /** Retrieve details of CisaCve by cveId */
  getCisaCve(
    cveId: string,
    options: GetCisaCveOptionalParams = { requestOptions: {} },
  ): Promise<CisaCveResult> {
    return getCisaCve(this._client, cveId, options);
  }

  /** Retrieve a list of CisaCves for the provided search parameters. */
  getCisaCves(
    options: GetCisaCvesOptionalParams = { requestOptions: {} },
  ): PagedAsyncIterableIterator<CisaCveResult> {
    return getCisaCves(this._client, options);
  }

  /** Download a task. */
  downloadTask(
    taskId: string,
    options: DownloadTaskOptionalParams = { requestOptions: {} },
  ): Promise<Task> {
    return downloadTask(this._client, taskId, options);
  }

  /** Run a task by taskId. */
  runTask(taskId: string, options: RunTaskOptionalParams = { requestOptions: {} }): Promise<Task> {
    return runTask(this._client, taskId, options);
  }

  /** Cancel a task by taskId. */
  cancelTask(
    taskId: string,
    options: CancelTaskOptionalParams = { requestOptions: {} },
  ): Promise<Task> {
    return cancelTask(this._client, taskId, options);
  }

  /** Retrieve a task by taskId. */
  getTask(taskId: string, options: GetTaskOptionalParams = { requestOptions: {} }): Promise<Task> {
    return getTask(this._client, taskId, options);
  }

  /** Retrieve a list of tasks for the provided search parameters. */
  listTask(
    options: ListTaskOptionalParams = { requestOptions: {} },
  ): PagedAsyncIterableIterator<Task> {
    return listTask(this._client, options);
  }

  /** Delete a saved filter with a given filterName. */
  deleteSavedFilter(
    filterName: string,
    options: DeleteSavedFilterOptionalParams = { requestOptions: {} },
  ): Promise<void> {
    return deleteSavedFilter(this._client, filterName, options);
  }

  /** Create or replace a saved filter with a given filterName. */
  createOrReplaceSavedFilter(
    filterName: string,
    body: SavedFilterData,
    options: CreateOrReplaceSavedFilterOptionalParams = { requestOptions: {} },
  ): Promise<SavedFilter> {
    return createOrReplaceSavedFilter(this._client, filterName, body, options);
  }

  /** Retrieve a saved filter by filterName. */
  getSavedFilter(
    filterName: string,
    options: GetSavedFilterOptionalParams = { requestOptions: {} },
  ): Promise<SavedFilter> {
    return getSavedFilter(this._client, filterName, options);
  }

  /** Retrieve a list of saved filters for the provided search parameters. */
  listSavedFilter(
    options: ListSavedFilterOptionalParams = { requestOptions: {} },
  ): PagedAsyncIterableIterator<SavedFilter> {
    return listSavedFilter(this._client, options);
  }

  /** Get the most recent snapshot of asset summary values for the snapshot request exported to a file. */
  getSnapshotExport(
    body: ReportAssetSnapshotExportRequest,
    options: GetSnapshotExportOptionalParams = { requestOptions: {} },
  ): Promise<Task> {
    return getSnapshotExport(this._client, body, options);
  }

  /** Get asset summary details for the summary request. */
  getSummary(
    body: ReportAssetSummaryRequest,
    options: GetSummaryOptionalParams = { requestOptions: {} },
  ): Promise<ReportAssetSummaryResult> {
    return getSummary(this._client, body, options);
  }

  /** Get the most recent snapshot of asset summary values for the snapshot request. */
  getSnapshot(
    body: ReportAssetSnapshotRequest,
    options: GetSnapshotOptionalParams = { requestOptions: {} },
  ): Promise<ReportAssetSnapshotResult> {
    return getSnapshot(this._client, body, options);
  }

  /** Get billable assets summary for the workspace. */
  getBillable(
    options: GetBillableOptionalParams = { requestOptions: {} },
  ): Promise<ReportBillableAssetSummaryResult> {
    return getBillable(this._client, options);
  }

  /** Retrieve a disco template with a given templateId. */
  getDiscoTemplate(
    templateId: string,
    options: GetDiscoTemplateOptionalParams = { requestOptions: {} },
  ): Promise<DiscoTemplate> {
    return getDiscoTemplate(this._client, templateId, options);
  }

  /** Retrieve a list of disco templates for the provided search parameters. */
  listDiscoTemplate(
    options: ListDiscoTemplateOptionalParams = { requestOptions: {} },
  ): PagedAsyncIterableIterator<DiscoTemplate> {
    return listDiscoTemplate(this._client, options);
  }

  /** Dismiss discovery chain for a given asset chain source */
  dismissAssetChain(
    body: AssetChainRequest,
    options: DismissAssetChainOptionalParams = { requestOptions: {} },
  ): Promise<Task> {
    return dismissAssetChain(this._client, body, options);
  }

  /** Retrieve an asset chain summary. */
  getAssetChainSummary(
    body: AssetChainRequest,
    options: GetAssetChainSummaryOptionalParams = { requestOptions: {} },
  ): Promise<AssetChainSummaryResult> {
    return getAssetChainSummary(this._client, body, options);
  }

  /** Retrieve a collection of discovery run results for a discovery group with a given groupName. */
  listRuns(
    groupName: string,
    options: ListRunsOptionalParams = { requestOptions: {} },
  ): PagedAsyncIterableIterator<DiscoRunResult> {
    return listRuns(this._client, groupName, options);
  }

  /** Run a discovery group with a given groupName. */
  runDiscoGroup(
    groupName: string,
    options: RunDiscoGroupOptionalParams = { requestOptions: {} },
  ): Promise<void> {
    return runDiscoGroup(this._client, groupName, options);
  }

  /** Create a discovery group with a given groupName. */
  createOrReplaceDiscoGroup(
    groupName: string,
    body: DiscoGroupData,
    options: CreateOrReplaceDiscoGroupOptionalParams = { requestOptions: {} },
  ): Promise<DiscoGroup> {
    return createOrReplaceDiscoGroup(this._client, groupName, body, options);
  }

  /** Delete a discovery group with a given discovery group name. */
  deleteDiscoGroup(
    groupName: string,
    options: DeleteDiscoGroupOptionalParams = { requestOptions: {} },
  ): Promise<void> {
    return deleteDiscoGroup(this._client, groupName, options);
  }

  /** Retrieve a discovery group with a given groupName. */
  getDiscoGroup(
    groupName: string,
    options: GetDiscoGroupOptionalParams = { requestOptions: {} },
  ): Promise<DiscoGroup> {
    return getDiscoGroup(this._client, groupName, options);
  }

  /** Validate a discovery group with a given groupName. */
  validateDiscoGroup(
    body: DiscoGroupData,
    options: ValidateDiscoGroupOptionalParams = { requestOptions: {} },
  ): Promise<ValidateResult> {
    return validateDiscoGroup(this._client, body, options);
  }

  /** Retrieve a list of discovery group for the provided search parameters. */
  listDiscoGroup(
    options: ListDiscoGroupOptionalParams = { requestOptions: {} },
  ): PagedAsyncIterableIterator<DiscoGroup> {
    return listDiscoGroup(this._client, options);
  }

  /** Delete a data connection with a given dataConnectionName. */
  deleteDataConnection(
    dataConnectionName: string,
    options: DeleteDataConnectionOptionalParams = { requestOptions: {} },
  ): Promise<void> {
    return deleteDataConnection(this._client, dataConnectionName, options);
  }

  /** Create or replace a data connection with a given dataConnectionName. */
  createOrReplaceDataConnection(
    dataConnectionName: string,
    body: DataConnectionDataUnion,
    options: CreateOrReplaceDataConnectionOptionalParams = { requestOptions: {} },
  ): Promise<DataConnectionUnion> {
    return createOrReplaceDataConnection(this._client, dataConnectionName, body, options);
  }

  /** Retrieve a data connection with a given dataConnectionName. */
  getDataConnection(
    dataConnectionName: string,
    options: GetDataConnectionOptionalParams = { requestOptions: {} },
  ): Promise<DataConnectionUnion> {
    return getDataConnection(this._client, dataConnectionName, options);
  }

  /** Validate a data connection with a given dataConnectionName. */
  validateDataConnection(
    body: DataConnectionDataUnion,
    options: ValidateDataConnectionOptionalParams = { requestOptions: {} },
  ): Promise<ValidateResult> {
    return validateDataConnection(this._client, body, options);
  }

  /** Retrieve a list of data connections. */
  listDataConnection(
    options: ListDataConnectionOptionalParams = { requestOptions: {} },
  ): PagedAsyncIterableIterator<DataConnectionUnion> {
    return listDataConnection(this._client, options);
  }

  /** Retrieve a list of deltas with overall summary changes for the provided time range. */
  getDeltaSummary(
    body: DeltaSummaryRequest,
    options: GetDeltaSummaryOptionalParams = { requestOptions: {} },
  ): Promise<DeltaSummaryResult> {
    return getDeltaSummary(this._client, body, options);
  }

  /** Retrieve a list of deltas for the provided time range. */
  getDeltaDetails(
    body: DeltaDetailsRequest,
    options: GetDeltaDetailsOptionalParams = { requestOptions: {} },
  ): PagedAsyncIterableIterator<DeltaResult> {
    return getDeltaDetails(this._client, body, options);
  }

  /** Retrieve observations on an asset */
  getObservations(
    assetId: string,
    options: GetObservationsOptionalParams = { requestOptions: {} },
  ): Promise<ObservationPageResult> {
    return getObservations(this._client, assetId, options);
  }

  /** Export a list of assets for the provided search parameters. */
  getAssetsExport(
    body: AssetsExportRequest,
    options: GetAssetsExportOptionalParams = { requestOptions: {} },
  ): Promise<Task> {
    return getAssetsExport(this._client, body, options);
  }

  /** Retrieve an asset by assetId. */
  getAssetResource(
    assetId: string,
    options: GetAssetResourceOptionalParams = { requestOptions: {} },
  ): Promise<AssetResourceUnion> {
    return getAssetResource(this._client, assetId, options);
  }

  /** Update labels on assets matching the provided filter. */
  updateAssets(
    filter: string,
    body: AssetUpdateData,
    options: UpdateAssetsOptionalParams = { requestOptions: {} },
  ): Promise<Task> {
    return updateAssets(this._client, filter, body, options);
  }

  /** Retrieve a list of assets for the provided search parameters. */
  listAssetResource(
    options: ListAssetResourceOptionalParams = { requestOptions: {} },
  ): PagedAsyncIterableIterator<AssetResourceUnion> {
    return listAssetResource(this._client, options);
  }
}

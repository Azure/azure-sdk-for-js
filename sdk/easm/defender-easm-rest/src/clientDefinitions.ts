// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  ListAssetResourceParameters,
  UpdateAssetsParameters,
  GetAssetResourceParameters,
  GetAssetsExportParameters,
  GetObservationsParameters,
  GetDeltaDetailsParameters,
  GetDeltaSummaryParameters,
  ListDataConnectionParameters,
  ValidateDataConnectionParameters,
  GetDataConnectionParameters,
  CreateOrReplaceDataConnectionParameters,
  DeleteDataConnectionParameters,
  ListDiscoGroupParameters,
  ValidateDiscoGroupParameters,
  GetDiscoGroupParameters,
  CreateOrReplaceDiscoGroupParameters,
  DeleteDiscoGroupParameters,
  RunDiscoGroupParameters,
  ListRunsParameters,
  GetAssetChainSummaryParameters,
  DismissAssetChainParameters,
  ListDiscoTemplateParameters,
  GetDiscoTemplateParameters,
  GetBillableParameters,
  GetSnapshotParameters,
  GetSummaryParameters,
  GetSnapshotExportParameters,
  ListSavedFilterParameters,
  GetSavedFilterParameters,
  CreateOrReplaceSavedFilterParameters,
  DeleteSavedFilterParameters,
  ListTaskParameters,
  GetTaskParameters,
  CancelTaskParameters,
  RunTaskParameters,
  DownloadTaskParameters,
  GetCisaCvesParameters,
  GetCisaCveParameters,
  ListPolicyParameters,
  GetPolicyParameters,
  CreateOrReplacePolicyParameters,
  DeletePolicyParameters,
} from "./parameters.js";
import type {
  ListAssetResource200Response,
  ListAssetResourceDefaultResponse,
  UpdateAssets200Response,
  UpdateAssetsDefaultResponse,
  GetAssetResource200Response,
  GetAssetResourceDefaultResponse,
  GetAssetsExport200Response,
  GetAssetsExportDefaultResponse,
  GetObservations200Response,
  GetObservationsDefaultResponse,
  GetDeltaDetails200Response,
  GetDeltaDetailsDefaultResponse,
  GetDeltaSummary200Response,
  GetDeltaSummaryDefaultResponse,
  ListDataConnection200Response,
  ListDataConnectionDefaultResponse,
  ValidateDataConnection200Response,
  ValidateDataConnectionDefaultResponse,
  GetDataConnection200Response,
  GetDataConnectionDefaultResponse,
  CreateOrReplaceDataConnection200Response,
  CreateOrReplaceDataConnectionDefaultResponse,
  DeleteDataConnection204Response,
  DeleteDataConnectionDefaultResponse,
  ListDiscoGroup200Response,
  ListDiscoGroupDefaultResponse,
  ValidateDiscoGroup200Response,
  ValidateDiscoGroupDefaultResponse,
  GetDiscoGroup200Response,
  GetDiscoGroupDefaultResponse,
  CreateOrReplaceDiscoGroup200Response,
  CreateOrReplaceDiscoGroupDefaultResponse,
  DeleteDiscoGroup204Response,
  DeleteDiscoGroupDefaultResponse,
  RunDiscoGroup204Response,
  RunDiscoGroupDefaultResponse,
  ListRuns200Response,
  ListRunsDefaultResponse,
  GetAssetChainSummary200Response,
  GetAssetChainSummaryDefaultResponse,
  DismissAssetChain200Response,
  DismissAssetChainDefaultResponse,
  ListDiscoTemplate200Response,
  ListDiscoTemplateDefaultResponse,
  GetDiscoTemplate200Response,
  GetDiscoTemplateDefaultResponse,
  GetBillable200Response,
  GetBillableDefaultResponse,
  GetSnapshot200Response,
  GetSnapshotDefaultResponse,
  GetSummary200Response,
  GetSummaryDefaultResponse,
  GetSnapshotExport200Response,
  GetSnapshotExportDefaultResponse,
  ListSavedFilter200Response,
  ListSavedFilterDefaultResponse,
  GetSavedFilter200Response,
  GetSavedFilterDefaultResponse,
  CreateOrReplaceSavedFilter200Response,
  CreateOrReplaceSavedFilterDefaultResponse,
  DeleteSavedFilter204Response,
  DeleteSavedFilterDefaultResponse,
  ListTask200Response,
  ListTaskDefaultResponse,
  GetTask200Response,
  GetTaskDefaultResponse,
  CancelTask200Response,
  CancelTaskDefaultResponse,
  RunTask200Response,
  RunTaskDefaultResponse,
  DownloadTask200Response,
  DownloadTaskDefaultResponse,
  GetCisaCves200Response,
  GetCisaCvesDefaultResponse,
  GetCisaCve200Response,
  GetCisaCveDefaultResponse,
  ListPolicy200Response,
  ListPolicyDefaultResponse,
  GetPolicy200Response,
  GetPolicyDefaultResponse,
  CreateOrReplacePolicy200Response,
  CreateOrReplacePolicyDefaultResponse,
  DeletePolicy204Response,
  DeletePolicyDefaultResponse,
} from "./responses.js";
import type { Client, StreamableMethod } from "@azure-rest/core-client";

export interface ListAssetResource {
  /** Retrieve a list of assets for the provided search parameters. */
  get(
    options?: ListAssetResourceParameters,
  ): StreamableMethod<ListAssetResource200Response | ListAssetResourceDefaultResponse>;
  /** Update labels on assets matching the provided filter. */
  post(
    options: UpdateAssetsParameters,
  ): StreamableMethod<UpdateAssets200Response | UpdateAssetsDefaultResponse>;
}

export interface GetAssetResource {
  /** Retrieve an asset by assetId. */
  get(
    options?: GetAssetResourceParameters,
  ): StreamableMethod<GetAssetResource200Response | GetAssetResourceDefaultResponse>;
}

export interface GetAssetsExport {
  /** Export a list of assets for the provided search parameters. */
  post(
    options: GetAssetsExportParameters,
  ): StreamableMethod<GetAssetsExport200Response | GetAssetsExportDefaultResponse>;
}

export interface GetObservations {
  /** Retrieve observations on an asset */
  post(
    options?: GetObservationsParameters,
  ): StreamableMethod<GetObservations200Response | GetObservationsDefaultResponse>;
}

export interface GetDeltaDetails {
  /** Retrieve a list of deltas for the provided time range. */
  post(
    options: GetDeltaDetailsParameters,
  ): StreamableMethod<GetDeltaDetails200Response | GetDeltaDetailsDefaultResponse>;
}

export interface GetDeltaSummary {
  /** Retrieve a list of deltas with overall summary changes for the provided time range. */
  post(
    options: GetDeltaSummaryParameters,
  ): StreamableMethod<GetDeltaSummary200Response | GetDeltaSummaryDefaultResponse>;
}

export interface ListDataConnection {
  /** Retrieve a list of data connections. */
  get(
    options?: ListDataConnectionParameters,
  ): StreamableMethod<ListDataConnection200Response | ListDataConnectionDefaultResponse>;
}

export interface ValidateDataConnection {
  /** Validate a data connection with a given dataConnectionName. */
  post(
    options: ValidateDataConnectionParameters,
  ): StreamableMethod<ValidateDataConnection200Response | ValidateDataConnectionDefaultResponse>;
}

export interface GetDataConnection {
  /** Retrieve a data connection with a given dataConnectionName. */
  get(
    options?: GetDataConnectionParameters,
  ): StreamableMethod<GetDataConnection200Response | GetDataConnectionDefaultResponse>;
  /** Create or replace a data connection with a given dataConnectionName. */
  put(
    options: CreateOrReplaceDataConnectionParameters,
  ): StreamableMethod<
    CreateOrReplaceDataConnection200Response | CreateOrReplaceDataConnectionDefaultResponse
  >;
  /** Delete a data connection with a given dataConnectionName. */
  delete(
    options?: DeleteDataConnectionParameters,
  ): StreamableMethod<DeleteDataConnection204Response | DeleteDataConnectionDefaultResponse>;
}

export interface ListDiscoGroup {
  /** Retrieve a list of discovery group for the provided search parameters. */
  get(
    options?: ListDiscoGroupParameters,
  ): StreamableMethod<ListDiscoGroup200Response | ListDiscoGroupDefaultResponse>;
}

export interface ValidateDiscoGroup {
  /** Validate a discovery group with a given groupName. */
  post(
    options: ValidateDiscoGroupParameters,
  ): StreamableMethod<ValidateDiscoGroup200Response | ValidateDiscoGroupDefaultResponse>;
}

export interface GetDiscoGroup {
  /** Retrieve a discovery group with a given groupName. */
  get(
    options?: GetDiscoGroupParameters,
  ): StreamableMethod<GetDiscoGroup200Response | GetDiscoGroupDefaultResponse>;
  /** Create a discovery group with a given groupName. */
  put(
    options: CreateOrReplaceDiscoGroupParameters,
  ): StreamableMethod<
    CreateOrReplaceDiscoGroup200Response | CreateOrReplaceDiscoGroupDefaultResponse
  >;
  /** Delete a discovery group with a given discovery group name. */
  delete(
    options?: DeleteDiscoGroupParameters,
  ): StreamableMethod<DeleteDiscoGroup204Response | DeleteDiscoGroupDefaultResponse>;
}

export interface RunDiscoGroup {
  /** Run a discovery group with a given groupName. */
  post(
    options?: RunDiscoGroupParameters,
  ): StreamableMethod<RunDiscoGroup204Response | RunDiscoGroupDefaultResponse>;
}

export interface ListRuns {
  /** Retrieve a collection of discovery run results for a discovery group with a given groupName. */
  get(
    options?: ListRunsParameters,
  ): StreamableMethod<ListRuns200Response | ListRunsDefaultResponse>;
}

export interface GetAssetChainSummary {
  /** Retrieve an asset chain summary. */
  post(
    options: GetAssetChainSummaryParameters,
  ): StreamableMethod<GetAssetChainSummary200Response | GetAssetChainSummaryDefaultResponse>;
}

export interface DismissAssetChain {
  /** Dismiss discovery chain for a given asset chain source */
  post(
    options: DismissAssetChainParameters,
  ): StreamableMethod<DismissAssetChain200Response | DismissAssetChainDefaultResponse>;
}

export interface ListDiscoTemplate {
  /** Retrieve a list of disco templates for the provided search parameters. */
  get(
    options?: ListDiscoTemplateParameters,
  ): StreamableMethod<ListDiscoTemplate200Response | ListDiscoTemplateDefaultResponse>;
}

export interface GetDiscoTemplate {
  /** Retrieve a disco template with a given templateId. */
  get(
    options?: GetDiscoTemplateParameters,
  ): StreamableMethod<GetDiscoTemplate200Response | GetDiscoTemplateDefaultResponse>;
}

export interface GetBillable {
  /** Get billable assets summary for the workspace. */
  post(
    options?: GetBillableParameters,
  ): StreamableMethod<GetBillable200Response | GetBillableDefaultResponse>;
}

export interface GetSnapshot {
  /** Get the most recent snapshot of asset summary values for the snapshot request. */
  post(
    options: GetSnapshotParameters,
  ): StreamableMethod<GetSnapshot200Response | GetSnapshotDefaultResponse>;
}

export interface GetSummary {
  /** Get asset summary details for the summary request. */
  post(
    options: GetSummaryParameters,
  ): StreamableMethod<GetSummary200Response | GetSummaryDefaultResponse>;
}

export interface GetSnapshotExport {
  /** Get the most recent snapshot of asset summary values for the snapshot request exported to a file. */
  post(
    options: GetSnapshotExportParameters,
  ): StreamableMethod<GetSnapshotExport200Response | GetSnapshotExportDefaultResponse>;
}

export interface ListSavedFilter {
  /** Retrieve a list of saved filters for the provided search parameters. */
  get(
    options?: ListSavedFilterParameters,
  ): StreamableMethod<ListSavedFilter200Response | ListSavedFilterDefaultResponse>;
}

export interface GetSavedFilter {
  /** Retrieve a saved filter by filterName. */
  get(
    options?: GetSavedFilterParameters,
  ): StreamableMethod<GetSavedFilter200Response | GetSavedFilterDefaultResponse>;
  /** Create or replace a saved filter with a given filterName. */
  put(
    options: CreateOrReplaceSavedFilterParameters,
  ): StreamableMethod<
    CreateOrReplaceSavedFilter200Response | CreateOrReplaceSavedFilterDefaultResponse
  >;
  /** Delete a saved filter with a given filterName. */
  delete(
    options?: DeleteSavedFilterParameters,
  ): StreamableMethod<DeleteSavedFilter204Response | DeleteSavedFilterDefaultResponse>;
}

export interface ListTask {
  /** Retrieve a list of tasks for the provided search parameters. */
  get(
    options?: ListTaskParameters,
  ): StreamableMethod<ListTask200Response | ListTaskDefaultResponse>;
}

export interface GetTask {
  /** Retrieve a task by taskId. */
  get(options?: GetTaskParameters): StreamableMethod<GetTask200Response | GetTaskDefaultResponse>;
}

export interface CancelTask {
  /** Cancel a task by taskId. */
  post(
    options?: CancelTaskParameters,
  ): StreamableMethod<CancelTask200Response | CancelTaskDefaultResponse>;
}

export interface RunTask {
  /** Run a task by taskId. */
  post(options?: RunTaskParameters): StreamableMethod<RunTask200Response | RunTaskDefaultResponse>;
}

export interface DownloadTask {
  /** Download a task. */
  post(
    options?: DownloadTaskParameters,
  ): StreamableMethod<DownloadTask200Response | DownloadTaskDefaultResponse>;
}

export interface GetCisaCves {
  /** Retrieve a list of CisaCves for the provided search parameters. */
  get(
    options?: GetCisaCvesParameters,
  ): StreamableMethod<GetCisaCves200Response | GetCisaCvesDefaultResponse>;
}

export interface GetCisaCve {
  /** Retrieve details of CisaCve by cveId */
  get(
    options?: GetCisaCveParameters,
  ): StreamableMethod<GetCisaCve200Response | GetCisaCveDefaultResponse>;
}

export interface ListPolicy {
  /** Retrieve a list of policies for the provided search parameters. */
  get(
    options?: ListPolicyParameters,
  ): StreamableMethod<ListPolicy200Response | ListPolicyDefaultResponse>;
}

export interface GetPolicy {
  /** Retrieve a policy with a given policyName. */
  get(
    options?: GetPolicyParameters,
  ): StreamableMethod<GetPolicy200Response | GetPolicyDefaultResponse>;
  /** Create a policy with a given policyName. */
  put(
    options: CreateOrReplacePolicyParameters,
  ): StreamableMethod<CreateOrReplacePolicy200Response | CreateOrReplacePolicyDefaultResponse>;
  /** Delete a policy with a given policyName. */
  delete(
    options?: DeletePolicyParameters,
  ): StreamableMethod<DeletePolicy204Response | DeletePolicyDefaultResponse>;
}

export interface Routes {
  /** Resource for '/assets' has methods for the following verbs: get, post */
  (path: "/assets"): ListAssetResource;
  /** Resource for '/assets/\{assetId\}' has methods for the following verbs: get */
  (path: "/assets/{assetId}", assetId: string): GetAssetResource;
  /** Resource for '/assets:export' has methods for the following verbs: post */
  (path: "/assets:export"): GetAssetsExport;
  /** Resource for '/assets/\{assetId\}:getObservations' has methods for the following verbs: post */
  (path: "/assets/{assetId}:getObservations", assetId: string): GetObservations;
  /** Resource for '/assets:getDeltaDetails' has methods for the following verbs: post */
  (path: "/assets:getDeltaDetails"): GetDeltaDetails;
  /** Resource for '/assets:getDeltaSummary' has methods for the following verbs: post */
  (path: "/assets:getDeltaSummary"): GetDeltaSummary;
  /** Resource for '/dataConnections' has methods for the following verbs: get */
  (path: "/dataConnections"): ListDataConnection;
  /** Resource for '/dataConnections:validate' has methods for the following verbs: post */
  (path: "/dataConnections:validate"): ValidateDataConnection;
  /** Resource for '/dataConnections/\{dataConnectionName\}' has methods for the following verbs: get, put, delete */
  (path: "/dataConnections/{dataConnectionName}", dataConnectionName: string): GetDataConnection;
  /** Resource for '/discoGroups' has methods for the following verbs: get */
  (path: "/discoGroups"): ListDiscoGroup;
  /** Resource for '/discoGroups:validate' has methods for the following verbs: post */
  (path: "/discoGroups:validate"): ValidateDiscoGroup;
  /** Resource for '/discoGroups/\{groupName\}' has methods for the following verbs: get, put, delete */
  (path: "/discoGroups/{groupName}", groupName: string): GetDiscoGroup;
  /** Resource for '/discoGroups/\{groupName\}:run' has methods for the following verbs: post */
  (path: "/discoGroups/{groupName}:run", groupName: string): RunDiscoGroup;
  /** Resource for '/discoGroups/\{groupName\}/runs' has methods for the following verbs: get */
  (path: "/discoGroups/{groupName}/runs", groupName: string): ListRuns;
  /** Resource for '/discoGroups:getAssetChainSummary' has methods for the following verbs: post */
  (path: "/discoGroups:getAssetChainSummary"): GetAssetChainSummary;
  /** Resource for '/discoGroups:dismissAssetChain' has methods for the following verbs: post */
  (path: "/discoGroups:dismissAssetChain"): DismissAssetChain;
  /** Resource for '/discoTemplates' has methods for the following verbs: get */
  (path: "/discoTemplates"): ListDiscoTemplate;
  /** Resource for '/discoTemplates/\{templateId\}' has methods for the following verbs: get */
  (path: "/discoTemplates/{templateId}", templateId: string): GetDiscoTemplate;
  /** Resource for '/reports/assets:getBillable' has methods for the following verbs: post */
  (path: "/reports/assets:getBillable"): GetBillable;
  /** Resource for '/reports/assets:getSnapshot' has methods for the following verbs: post */
  (path: "/reports/assets:getSnapshot"): GetSnapshot;
  /** Resource for '/reports/assets:getSummary' has methods for the following verbs: post */
  (path: "/reports/assets:getSummary"): GetSummary;
  /** Resource for '/reports/assets:getSnapshotExport' has methods for the following verbs: post */
  (path: "/reports/assets:getSnapshotExport"): GetSnapshotExport;
  /** Resource for '/savedFilters' has methods for the following verbs: get */
  (path: "/savedFilters"): ListSavedFilter;
  /** Resource for '/savedFilters/\{filterName\}' has methods for the following verbs: get, put, delete */
  (path: "/savedFilters/{filterName}", filterName: string): GetSavedFilter;
  /** Resource for '/tasks' has methods for the following verbs: get */
  (path: "/tasks"): ListTask;
  /** Resource for '/tasks/\{taskId\}' has methods for the following verbs: get */
  (path: "/tasks/{taskId}", taskId: string): GetTask;
  /** Resource for '/tasks/\{taskId\}:cancel' has methods for the following verbs: post */
  (path: "/tasks/{taskId}:cancel", taskId: string): CancelTask;
  /** Resource for '/tasks/\{taskId\}:run' has methods for the following verbs: post */
  (path: "/tasks/{taskId}:run", taskId: string): RunTask;
  /** Resource for '/tasks/\{taskId\}:download' has methods for the following verbs: post */
  (path: "/tasks/{taskId}:download", taskId: string): DownloadTask;
  /** Resource for '/cisaCves' has methods for the following verbs: get */
  (path: "/cisaCves"): GetCisaCves;
  /** Resource for '/cisaCves/\{cveId\}' has methods for the following verbs: get */
  (path: "/cisaCves/{cveId}", cveId: string): GetCisaCve;
  /** Resource for '/policies' has methods for the following verbs: get */
  (path: "/policies"): ListPolicy;
  /** Resource for '/policies/\{policyName\}' has methods for the following verbs: get, put, delete */
  (path: "/policies/{policyName}", policyName: string): GetPolicy;
}

export type EasmClient = Client & {
  path: Routes;
};

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  ListAssetResourceParameters,
  UpdateAssetsParameters,
  GetAssetResourceParameters,
  ListDataConnectionParameters,
  ValidateDataConnectionParameters,
  GetDataConnectionParameters,
  CreateOrReplaceDataConnectionParameters,
  DeleteDataConnectionParameters,
  ListDiscoGroupParameters,
  ValidateDiscoGroupParameters,
  GetDiscoGroupParameters,
  CreateOrReplaceDiscoGroupParameters,
  RunDiscoGroupParameters,
  ListRunsParameters,
  ListDiscoTemplateParameters,
  GetDiscoTemplateParameters,
  GetBillableParameters,
  GetSnapshotParameters,
  GetSummaryParameters,
  ListSavedFilterParameters,
  GetSavedFilterParameters,
  CreateOrReplaceSavedFilterParameters,
  DeleteSavedFilterParameters,
  ListTaskParameters,
  GetTaskParameters,
  CancelTaskParameters,
} from "./parameters";
import {
  ListAssetResource200Response,
  ListAssetResourceDefaultResponse,
  UpdateAssets200Response,
  UpdateAssetsDefaultResponse,
  GetAssetResource200Response,
  GetAssetResourceDefaultResponse,
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
  RunDiscoGroup204Response,
  RunDiscoGroupDefaultResponse,
  ListRuns200Response,
  ListRunsDefaultResponse,
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
} from "./responses";
import { Client, StreamableMethod } from "@azure-rest/core-client";

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

export interface ListDataConnection {
  /** Retrieve a list of data connections. */
  get(
    options?: ListDataConnectionParameters,
  ): StreamableMethod<ListDataConnection200Response | ListDataConnectionDefaultResponse>;
}

export interface ValidateDataConnection {
  /** Validate a data connection with a given dataConnectionName. */
  post(
    options?: ValidateDataConnectionParameters,
  ): StreamableMethod<ValidateDataConnection200Response | ValidateDataConnectionDefaultResponse>;
}

export interface GetDataConnection {
  /** Retrieve a data connection with a given dataConnectionName. */
  get(
    options?: GetDataConnectionParameters,
  ): StreamableMethod<GetDataConnection200Response | GetDataConnectionDefaultResponse>;
  /** Create or replace a data connection with a given dataConnectionName. */
  put(
    options?: CreateOrReplaceDataConnectionParameters,
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
    options?: ValidateDiscoGroupParameters,
  ): StreamableMethod<ValidateDiscoGroup200Response | ValidateDiscoGroupDefaultResponse>;
}

export interface GetDiscoGroup {
  /** Retrieve a discovery group with a given groupName. */
  get(
    options?: GetDiscoGroupParameters,
  ): StreamableMethod<GetDiscoGroup200Response | GetDiscoGroupDefaultResponse>;
  /** Create a discovery group with a given groupName. */
  put(
    options?: CreateOrReplaceDiscoGroupParameters,
  ): StreamableMethod<
    CreateOrReplaceDiscoGroup200Response | CreateOrReplaceDiscoGroupDefaultResponse
  >;
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
    options?: GetSnapshotParameters,
  ): StreamableMethod<GetSnapshot200Response | GetSnapshotDefaultResponse>;
}

export interface GetSummary {
  /** Get asset summary details for the summary request. */
  post(
    options?: GetSummaryParameters,
  ): StreamableMethod<GetSummary200Response | GetSummaryDefaultResponse>;
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
    options?: CreateOrReplaceSavedFilterParameters,
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

export interface Routes {
  /** Resource for '/assets' has methods for the following verbs: get, post */
  (path: "/assets"): ListAssetResource;
  /** Resource for '/assets/\{assetId\}' has methods for the following verbs: get */
  (path: "/assets/{assetId}", assetId: string): GetAssetResource;
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
  /** Resource for '/discoGroups/\{groupName\}' has methods for the following verbs: get, put */
  (path: "/discoGroups/{groupName}", groupName: string): GetDiscoGroup;
  /** Resource for '/discoGroups/\{groupName\}:run' has methods for the following verbs: post */
  (path: "/discoGroups/{groupName}:run", groupName: string): RunDiscoGroup;
  /** Resource for '/discoGroups/\{groupName\}/runs' has methods for the following verbs: get */
  (path: "/discoGroups/{groupName}/runs", groupName: string): ListRuns;
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
}

export type EasmClient = Client & {
  path: Routes;
};

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { RequestParameters } from "@azure-rest/core-client";
import type {
  AssetResponseType,
  AssetUpdateData,
  AssetsExportRequest,
  DeltaDetailsRequest,
  DeltaSummaryRequest,
  DataConnectionData,
  DiscoGroupData,
  AssetChainRequest,
  ReportAssetSnapshotRequest,
  ReportAssetSummaryRequest,
  ReportAssetSnapshotExportRequest,
  SavedFilterData,
  Policy,
} from "./models.js";

/** This is the wrapper object for the parameter `responseIncludes` with explode set to false and style set to form. */
export interface ListAssetResourceResponseIncludesQueryParam {
  /** Value of the parameter */
  value: string[];
  /** Should we explode the value? */
  explode: false;
  /** Style of the value */
  style: "form";
}

export interface ListAssetResourceQueryParamProperties {
  /** Filter the result list using the given expression. */
  filter?: string;
  /** A list of expressions that specify the order of the returned resources. */
  orderby?: string;
  /** The number of result items to skip. */
  skip?: number;
  /** The maximum number of result items per page. */
  maxpagesize?: number;
  /** Specify this value instead of 'skip' to use cursor-based searching. Initial value is '*' and subsequent values are returned in the response. */
  mark?: string;
  /**
   * Specify the response type. The possible values are: ID, STANDARD, FULL, REDUCED
   *
   * Possible values: "id", "standard", "full", "reduced"
   */
  responseType?: AssetResponseType;
  /** The properties to include in the response. */
  responseIncludes?: string[] | ListAssetResourceResponseIncludesQueryParam;
  /** If it's recent only. */
  recentOnly?: boolean;
}

export interface ListAssetResourceQueryParam {
  queryParameters?: ListAssetResourceQueryParamProperties;
}

export type ListAssetResourceParameters = ListAssetResourceQueryParam & RequestParameters;

export interface UpdateAssetsBodyParam {
  /** Body parameter. */
  body: AssetUpdateData;
}

export interface UpdateAssetsQueryParamProperties {
  /** An expression on the resource type that selects the resources to be returned. */
  filter: string;
}

export interface UpdateAssetsQueryParam {
  queryParameters: UpdateAssetsQueryParamProperties;
}

export type UpdateAssetsParameters = UpdateAssetsQueryParam &
  UpdateAssetsBodyParam &
  RequestParameters;
export type GetAssetResourceParameters = RequestParameters;

export interface GetAssetsExportBodyParam {
  /** Body parameter. */
  body: AssetsExportRequest;
}

export interface GetAssetsExportQueryParamProperties {
  /** Filter the result list using the given expression. */
  filter?: string;
  /** A list of expressions that specify the order of the returned resources. */
  orderby?: string;
}

export interface GetAssetsExportQueryParam {
  queryParameters?: GetAssetsExportQueryParamProperties;
}

export type GetAssetsExportParameters = GetAssetsExportQueryParam &
  GetAssetsExportBodyParam &
  RequestParameters;

export interface GetObservationsQueryParamProperties {
  /** Filter the result list using the given expression. */
  filter?: string;
  /** A list of expressions that specify the order of the returned resources. */
  orderby?: string;
  /** The number of result items to skip. */
  skip?: number;
  /** The maximum number of result items per page. */
  maxpagesize?: number;
}

export interface GetObservationsQueryParam {
  queryParameters?: GetObservationsQueryParamProperties;
}

export type GetObservationsParameters = GetObservationsQueryParam & RequestParameters;

export interface GetDeltaDetailsBodyParam {
  /** Body parameter. */
  body: DeltaDetailsRequest;
}

export interface GetDeltaDetailsQueryParamProperties {
  /** The number of result items to skip. */
  skip?: number;
  /** The maximum number of result items per page. */
  maxpagesize?: number;
}

export interface GetDeltaDetailsQueryParam {
  queryParameters?: GetDeltaDetailsQueryParamProperties;
}

export type GetDeltaDetailsParameters = GetDeltaDetailsQueryParam &
  GetDeltaDetailsBodyParam &
  RequestParameters;

export interface GetDeltaSummaryBodyParam {
  /** Body parameter. */
  body: DeltaSummaryRequest;
}

export type GetDeltaSummaryParameters = GetDeltaSummaryBodyParam & RequestParameters;

export interface ListDataConnectionQueryParamProperties {
  /** The number of result items to skip. */
  skip?: number;
  /** The maximum number of result items per page. */
  maxpagesize?: number;
}

export interface ListDataConnectionQueryParam {
  queryParameters?: ListDataConnectionQueryParamProperties;
}

export type ListDataConnectionParameters = ListDataConnectionQueryParam & RequestParameters;

export interface ValidateDataConnectionBodyParam {
  /** Body parameter. */
  body: DataConnectionData;
}

export type ValidateDataConnectionParameters = ValidateDataConnectionBodyParam & RequestParameters;
export type GetDataConnectionParameters = RequestParameters;

export interface CreateOrReplaceDataConnectionBodyParam {
  /** Body parameter. */
  body: DataConnectionData;
}

export type CreateOrReplaceDataConnectionParameters = CreateOrReplaceDataConnectionBodyParam &
  RequestParameters;
export type DeleteDataConnectionParameters = RequestParameters;

export interface ListDiscoGroupQueryParamProperties {
  /** Filter the result list using the given expression. */
  filter?: string;
  /** The number of result items to skip. */
  skip?: number;
  /** The maximum number of result items per page. */
  maxpagesize?: number;
}

export interface ListDiscoGroupQueryParam {
  queryParameters?: ListDiscoGroupQueryParamProperties;
}

export type ListDiscoGroupParameters = ListDiscoGroupQueryParam & RequestParameters;

export interface ValidateDiscoGroupBodyParam {
  /** Body parameter. */
  body: DiscoGroupData;
}

export type ValidateDiscoGroupParameters = ValidateDiscoGroupBodyParam & RequestParameters;
export type GetDiscoGroupParameters = RequestParameters;

export interface CreateOrReplaceDiscoGroupBodyParam {
  /** Body parameter. */
  body: DiscoGroupData;
}

export type CreateOrReplaceDiscoGroupParameters = CreateOrReplaceDiscoGroupBodyParam &
  RequestParameters;
export type RunDiscoGroupParameters = RequestParameters;

export interface ListRunsQueryParamProperties {
  /** Filter the result list using the given expression. */
  filter?: string;
  /** The number of result items to skip. */
  skip?: number;
  /** The maximum number of result items per page. */
  maxpagesize?: number;
}

export interface ListRunsQueryParam {
  queryParameters?: ListRunsQueryParamProperties;
}

export type ListRunsParameters = ListRunsQueryParam & RequestParameters;
export type DeleteDiscoGroupParameters = RequestParameters;

export interface GetAssetChainSummaryBodyParam {
  /** Body parameter. */
  body: AssetChainRequest;
}

export type GetAssetChainSummaryParameters = GetAssetChainSummaryBodyParam & RequestParameters;

export interface DismissAssetChainBodyParam {
  /** Body parameter. */
  body: AssetChainRequest;
}

export type DismissAssetChainParameters = DismissAssetChainBodyParam & RequestParameters;

export interface ListDiscoTemplateQueryParamProperties {
  /** Filter the result list using the given expression. */
  filter?: string;
  /** The number of result items to skip. */
  skip?: number;
  /** The maximum number of result items per page. */
  maxpagesize?: number;
}

export interface ListDiscoTemplateQueryParam {
  queryParameters?: ListDiscoTemplateQueryParamProperties;
}

export type ListDiscoTemplateParameters = ListDiscoTemplateQueryParam & RequestParameters;
export type GetDiscoTemplateParameters = RequestParameters;
export type GetBillableParameters = RequestParameters;

export interface GetSnapshotBodyParam {
  /** Body parameter. */
  body: ReportAssetSnapshotRequest;
}

export type GetSnapshotParameters = GetSnapshotBodyParam & RequestParameters;

export interface GetSummaryBodyParam {
  /** Body parameter. */
  body: ReportAssetSummaryRequest;
}

export type GetSummaryParameters = GetSummaryBodyParam & RequestParameters;

export interface GetSnapshotExportBodyParam {
  /** Body parameter. */
  body: ReportAssetSnapshotExportRequest;
}

export type GetSnapshotExportParameters = GetSnapshotExportBodyParam & RequestParameters;

export interface ListSavedFilterQueryParamProperties {
  /** Filter the result list using the given expression. */
  filter?: string;
  /** The number of result items to skip. */
  skip?: number;
  /** The maximum number of result items per page. */
  maxpagesize?: number;
}

export interface ListSavedFilterQueryParam {
  queryParameters?: ListSavedFilterQueryParamProperties;
}

export type ListSavedFilterParameters = ListSavedFilterQueryParam & RequestParameters;
export type GetSavedFilterParameters = RequestParameters;

export interface CreateOrReplaceSavedFilterBodyParam {
  /** Body parameter. */
  body: SavedFilterData;
}

export type CreateOrReplaceSavedFilterParameters = CreateOrReplaceSavedFilterBodyParam &
  RequestParameters;
export type DeleteSavedFilterParameters = RequestParameters;

export interface ListTaskQueryParamProperties {
  /** Filter the result list using the given expression. */
  filter?: string;
  /** A list of expressions that specify the order of the returned resources. */
  orderby?: string;
  /** The number of result items to skip. */
  skip?: number;
  /** The maximum number of result items per page. */
  maxpagesize?: number;
}

export interface ListTaskQueryParam {
  queryParameters?: ListTaskQueryParamProperties;
}

export type ListTaskParameters = ListTaskQueryParam & RequestParameters;
export type GetTaskParameters = RequestParameters;
export type CancelTaskParameters = RequestParameters;
export type RunTaskParameters = RequestParameters;
export type DownloadTaskParameters = RequestParameters;
export type GetCisaCvesParameters = RequestParameters;
export type GetCisaCveParameters = RequestParameters;

export interface ListPolicyQueryParamProperties {
  /** Filter the result list using the given expression. */
  filter?: string;
  /** The number of result items to skip. */
  skip?: number;
  /** The maximum number of result items per page. */
  maxpagesize?: number;
}

export interface ListPolicyQueryParam {
  queryParameters?: ListPolicyQueryParamProperties;
}

export type ListPolicyParameters = ListPolicyQueryParam & RequestParameters;
export type GetPolicyParameters = RequestParameters;

export interface CreateOrReplacePolicyBodyParam {
  /** Body parameter. */
  body: Policy;
}

export type CreateOrReplacePolicyParameters = CreateOrReplacePolicyBodyParam & RequestParameters;
export type DeletePolicyParameters = RequestParameters;

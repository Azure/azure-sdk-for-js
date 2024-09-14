// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { RequestParameters } from "@azure-rest/core-client";
import {
  AssetUpdateData,
  DataConnectionData,
  DiscoGroupData,
  ReportAssetSnapshotRequest,
  ReportAssetSummaryRequest,
  SavedFilterData,
} from "./models";

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

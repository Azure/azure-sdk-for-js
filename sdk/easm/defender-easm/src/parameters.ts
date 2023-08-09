// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { RequestParameters } from "@azure-rest/core-client";
import {
  AssetUpdateData,
  DataConnectionData,
  DiscoGroupData,
  ReportAssetSnapshotRequest,
  ReportAssetSummaryRequest,
  SavedFilterData,
} from "./models";

export type ListAssetResourceParameters = RequestParameters;

export interface UpdateAssetsBodyParam {
  body?: AssetUpdateData;
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
export type ListDataConnectionParameters = RequestParameters;

export interface ValidateDataConnectionBodyParam {
  body?: DataConnectionData;
}

export type ValidateDataConnectionParameters = ValidateDataConnectionBodyParam &
  RequestParameters;
export type GetDataConnectionParameters = RequestParameters;

export interface PutDataConnectionBodyParam {
  body?: DataConnectionData;
}

export type PutDataConnectionParameters = PutDataConnectionBodyParam &
  RequestParameters;
export type DeleteDataConnectionParameters = RequestParameters;
export type ListDiscoGroupParameters = RequestParameters;

export interface ValidateDiscoGroupBodyParam {
  body?: DiscoGroupData;
}

export type ValidateDiscoGroupParameters = ValidateDiscoGroupBodyParam &
  RequestParameters;
export type GetDiscoGroupParameters = RequestParameters;

export interface PutDiscoGroupBodyParam {
  body?: DiscoGroupData;
}

export type PutDiscoGroupParameters = PutDiscoGroupBodyParam &
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
export type ListDiscoTemplateParameters = RequestParameters;
export type GetDiscoTemplateParameters = RequestParameters;
export type GetBillableReportsParameters = RequestParameters;

export interface GetSnapshotReportsBodyParam {
  body?: ReportAssetSnapshotRequest;
}

export type GetSnapshotReportsParameters = GetSnapshotReportsBodyParam &
  RequestParameters;

export interface GetSummaryReportsBodyParam {
  body?: ReportAssetSummaryRequest;
}

export type GetSummaryReportsParameters = GetSummaryReportsBodyParam &
  RequestParameters;
export type ListSavedFilterParameters = RequestParameters;
export type GetSavedFilterParameters = RequestParameters;

export interface PutSavedFilterBodyParam {
  body?: SavedFilterData;
}

export type PutSavedFilterParameters = PutSavedFilterBodyParam &
  RequestParameters;
export type DeleteSavedFilterParameters = RequestParameters;
export type ListTaskParameters = RequestParameters;
export type GetTaskParameters = RequestParameters;
export type CancelTaskParameters = RequestParameters;

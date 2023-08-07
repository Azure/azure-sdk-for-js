// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { RawHttpHeaders } from "@azure/core-rest-pipeline";
import { HttpResponse } from "@azure-rest/core-client";
import {
  AssetPageResponseOutput,
  ErrorResponseOutput,
  TaskOutput,
  AssetResourceOutput,
  DataConnectionPageResponseOutput,
  ValidateResponseOutput,
  DataConnectionOutput,
  DiscoGroupPageResponseOutput,
  DiscoGroupOutput,
  DiscoRunPageResponseOutput,
  DiscoTemplatePageResponseOutput,
  DiscoTemplateOutput,
  ReportBillableAssetSummaryResponseOutput,
  ReportAssetSnapshotResponseOutput,
  ReportAssetSummaryResponseOutput,
  SavedFilterPageResponseOutput,
  SavedFilterOutput,
  TaskPageResponseOutput,
} from "./outputModels";

/** The request has succeeded. */
export interface ListAssetResource200Response extends HttpResponse {
  status: "200";
  body: AssetPageResponseOutput;
}

export interface ListAssetResourceDefaultHeaders {
  "x-ms-error-code": string;
}

export interface ListAssetResourceDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & ListAssetResourceDefaultHeaders;
}

/** The request has succeeded. */
export interface UpdateAssets200Response extends HttpResponse {
  status: "200";
  body: TaskOutput;
}

export interface UpdateAssetsDefaultHeaders {
  "x-ms-error-code": string;
}

export interface UpdateAssetsDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & UpdateAssetsDefaultHeaders;
}

/** The request has succeeded. */
export interface GetAssetResource200Response extends HttpResponse {
  status: "200";
  body: AssetResourceOutput;
}

export interface GetAssetResourceDefaultHeaders {
  "x-ms-error-code": string;
}

export interface GetAssetResourceDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & GetAssetResourceDefaultHeaders;
}

/** The request has succeeded. */
export interface ListDataConnection200Response extends HttpResponse {
  status: "200";
  body: DataConnectionPageResponseOutput;
}

export interface ListDataConnectionDefaultHeaders {
  "x-ms-error-code": string;
}

export interface ListDataConnectionDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & ListDataConnectionDefaultHeaders;
}

/** The request has succeeded. */
export interface ValidateDataConnection200Response extends HttpResponse {
  status: "200";
  body: ValidateResponseOutput;
}

export interface ValidateDataConnectionDefaultHeaders {
  "x-ms-error-code": string;
}

export interface ValidateDataConnectionDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & ValidateDataConnectionDefaultHeaders;
}

/** The request has succeeded. */
export interface GetDataConnection200Response extends HttpResponse {
  status: "200";
  body: DataConnectionOutput;
}

export interface GetDataConnectionDefaultHeaders {
  "x-ms-error-code": string;
}

export interface GetDataConnectionDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & GetDataConnectionDefaultHeaders;
}

/** The request has succeeded. */
export interface PutDataConnection200Response extends HttpResponse {
  status: "200";
  body: DataConnectionOutput;
}

export interface PutDataConnectionDefaultHeaders {
  "x-ms-error-code": string;
}

export interface PutDataConnectionDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & PutDataConnectionDefaultHeaders;
}

/** There is no content to send for this request, but the headers may be useful. */
export interface DeleteDataConnection204Response extends HttpResponse {
  status: "204";
}

export interface DeleteDataConnectionDefaultHeaders {
  "x-ms-error-code": string;
}

export interface DeleteDataConnectionDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & DeleteDataConnectionDefaultHeaders;
}

/** The request has succeeded. */
export interface ListDiscoGroup200Response extends HttpResponse {
  status: "200";
  body: DiscoGroupPageResponseOutput;
}

export interface ListDiscoGroupDefaultHeaders {
  "x-ms-error-code": string;
}

export interface ListDiscoGroupDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & ListDiscoGroupDefaultHeaders;
}

/** The request has succeeded. */
export interface ValidateDiscoGroup200Response extends HttpResponse {
  status: "200";
  body: ValidateResponseOutput;
}

export interface ValidateDiscoGroupDefaultHeaders {
  "x-ms-error-code": string;
}

export interface ValidateDiscoGroupDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & ValidateDiscoGroupDefaultHeaders;
}

/** The request has succeeded. */
export interface GetDiscoGroup200Response extends HttpResponse {
  status: "200";
  body: DiscoGroupOutput;
}

export interface GetDiscoGroupDefaultHeaders {
  "x-ms-error-code": string;
}

export interface GetDiscoGroupDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & GetDiscoGroupDefaultHeaders;
}

/** The request has succeeded. */
export interface PutDiscoGroup200Response extends HttpResponse {
  status: "200";
  body: DiscoGroupOutput;
}

export interface PutDiscoGroupDefaultHeaders {
  "x-ms-error-code": string;
}

export interface PutDiscoGroupDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & PutDiscoGroupDefaultHeaders;
}

/** There is no content to send for this request, but the headers may be useful. */
export interface RunDiscoGroup204Response extends HttpResponse {
  status: "204";
}

export interface RunDiscoGroupDefaultHeaders {
  "x-ms-error-code": string;
}

export interface RunDiscoGroupDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & RunDiscoGroupDefaultHeaders;
}

/** The request has succeeded. */
export interface ListRuns200Response extends HttpResponse {
  status: "200";
  body: DiscoRunPageResponseOutput;
}

export interface ListRunsDefaultHeaders {
  "x-ms-error-code": string;
}

export interface ListRunsDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & ListRunsDefaultHeaders;
}

/** The request has succeeded. */
export interface ListDiscoTemplate200Response extends HttpResponse {
  status: "200";
  body: DiscoTemplatePageResponseOutput;
}

export interface ListDiscoTemplateDefaultHeaders {
  "x-ms-error-code": string;
}

export interface ListDiscoTemplateDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & ListDiscoTemplateDefaultHeaders;
}

/** The request has succeeded. */
export interface GetDiscoTemplate200Response extends HttpResponse {
  status: "200";
  body: DiscoTemplateOutput;
}

export interface GetDiscoTemplateDefaultHeaders {
  "x-ms-error-code": string;
}

export interface GetDiscoTemplateDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & GetDiscoTemplateDefaultHeaders;
}

/** The request has succeeded. */
export interface GetBillableReports200Response extends HttpResponse {
  status: "200";
  body: ReportBillableAssetSummaryResponseOutput;
}

export interface GetBillableReportsDefaultHeaders {
  "x-ms-error-code": string;
}

export interface GetBillableReportsDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & GetBillableReportsDefaultHeaders;
}

/** The request has succeeded. */
export interface GetSnapshotReports200Response extends HttpResponse {
  status: "200";
  body: ReportAssetSnapshotResponseOutput;
}

export interface GetSnapshotReportsDefaultHeaders {
  "x-ms-error-code": string;
}

export interface GetSnapshotReportsDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & GetSnapshotReportsDefaultHeaders;
}

/** The request has succeeded. */
export interface GetSummaryReports200Response extends HttpResponse {
  status: "200";
  body: ReportAssetSummaryResponseOutput;
}

export interface GetSummaryReportsDefaultHeaders {
  "x-ms-error-code": string;
}

export interface GetSummaryReportsDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & GetSummaryReportsDefaultHeaders;
}

/** The request has succeeded. */
export interface ListSavedFilter200Response extends HttpResponse {
  status: "200";
  body: SavedFilterPageResponseOutput;
}

export interface ListSavedFilterDefaultHeaders {
  "x-ms-error-code": string;
}

export interface ListSavedFilterDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & ListSavedFilterDefaultHeaders;
}

/** The request has succeeded. */
export interface GetSavedFilter200Response extends HttpResponse {
  status: "200";
  body: SavedFilterOutput;
}

export interface GetSavedFilterDefaultHeaders {
  "x-ms-error-code": string;
}

export interface GetSavedFilterDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & GetSavedFilterDefaultHeaders;
}

/** The request has succeeded. */
export interface PutSavedFilter200Response extends HttpResponse {
  status: "200";
  body: SavedFilterOutput;
}

export interface PutSavedFilterDefaultHeaders {
  "x-ms-error-code": string;
}

export interface PutSavedFilterDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & PutSavedFilterDefaultHeaders;
}

/** There is no content to send for this request, but the headers may be useful. */
export interface DeleteSavedFilter204Response extends HttpResponse {
  status: "204";
}

export interface DeleteSavedFilterDefaultHeaders {
  "x-ms-error-code": string;
}

export interface DeleteSavedFilterDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & DeleteSavedFilterDefaultHeaders;
}

/** The request has succeeded. */
export interface ListTask200Response extends HttpResponse {
  status: "200";
  body: TaskPageResponseOutput;
}

export interface ListTaskDefaultHeaders {
  "x-ms-error-code": string;
}

export interface ListTaskDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & ListTaskDefaultHeaders;
}

/** The request has succeeded. */
export interface GetTask200Response extends HttpResponse {
  status: "200";
  body: TaskOutput;
}

export interface GetTaskDefaultHeaders {
  "x-ms-error-code": string;
}

export interface GetTaskDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & GetTaskDefaultHeaders;
}

/** The request has succeeded. */
export interface CancelTask200Response extends HttpResponse {
  status: "200";
  body: TaskOutput;
}

export interface CancelTaskDefaultHeaders {
  "x-ms-error-code": string;
}

export interface CancelTaskDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders & CancelTaskDefaultHeaders;
}

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { RawHttpHeaders } from "@azure/core-rest-pipeline";
import { HttpResponse, ErrorResponse } from "@azure-rest/core-client";
import {
  PagedAssetResourceOutput,
  TaskOutput,
  AssetResourceOutput,
  PagedDataConnectionOutput,
  ValidateResultOutput,
  DataConnectionOutput,
  PagedDiscoGroupOutput,
  DiscoGroupOutput,
  DiscoRunPageResultOutput,
  PagedDiscoTemplateOutput,
  DiscoTemplateOutput,
  ReportBillableAssetSummaryResultOutput,
  ReportAssetSnapshotResultOutput,
  ReportAssetSummaryResultOutput,
  PagedSavedFilterOutput,
  SavedFilterOutput,
  PagedTaskOutput,
} from "./outputModels";

/** The request has succeeded. */
export interface ListAssetResource200Response extends HttpResponse {
  status: "200";
  body: PagedAssetResourceOutput;
}

export interface ListAssetResourceDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface ListAssetResourceDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & ListAssetResourceDefaultHeaders;
}

/** The request has succeeded. */
export interface UpdateAssets200Response extends HttpResponse {
  status: "200";
  body: TaskOutput;
}

export interface UpdateAssetsDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface UpdateAssetsDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & UpdateAssetsDefaultHeaders;
}

/** The request has succeeded. */
export interface GetAssetResource200Response extends HttpResponse {
  status: "200";
  body: AssetResourceOutput;
}

export interface GetAssetResourceDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface GetAssetResourceDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & GetAssetResourceDefaultHeaders;
}

/** The request has succeeded. */
export interface ListDataConnection200Response extends HttpResponse {
  status: "200";
  body: PagedDataConnectionOutput;
}

export interface ListDataConnectionDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface ListDataConnectionDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & ListDataConnectionDefaultHeaders;
}

/** The request has succeeded. */
export interface ValidateDataConnection200Response extends HttpResponse {
  status: "200";
  body: ValidateResultOutput;
}

export interface ValidateDataConnectionDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface ValidateDataConnectionDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & ValidateDataConnectionDefaultHeaders;
}

/** The request has succeeded. */
export interface GetDataConnection200Response extends HttpResponse {
  status: "200";
  body: DataConnectionOutput;
}

export interface GetDataConnectionDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface GetDataConnectionDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & GetDataConnectionDefaultHeaders;
}

/** The request has succeeded. */
export interface CreateOrReplaceDataConnection200Response extends HttpResponse {
  status: "200";
  body: DataConnectionOutput;
}

export interface CreateOrReplaceDataConnectionDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface CreateOrReplaceDataConnectionDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & CreateOrReplaceDataConnectionDefaultHeaders;
}

/** There is no content to send for this request, but the headers may be useful. */
export interface DeleteDataConnection204Response extends HttpResponse {
  status: "204";
}

export interface DeleteDataConnectionDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface DeleteDataConnectionDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & DeleteDataConnectionDefaultHeaders;
}

/** The request has succeeded. */
export interface ListDiscoGroup200Response extends HttpResponse {
  status: "200";
  body: PagedDiscoGroupOutput;
}

export interface ListDiscoGroupDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface ListDiscoGroupDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & ListDiscoGroupDefaultHeaders;
}

/** The request has succeeded. */
export interface ValidateDiscoGroup200Response extends HttpResponse {
  status: "200";
  body: ValidateResultOutput;
}

export interface ValidateDiscoGroupDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface ValidateDiscoGroupDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & ValidateDiscoGroupDefaultHeaders;
}

/** The request has succeeded. */
export interface GetDiscoGroup200Response extends HttpResponse {
  status: "200";
  body: DiscoGroupOutput;
}

export interface GetDiscoGroupDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface GetDiscoGroupDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & GetDiscoGroupDefaultHeaders;
}

/** The request has succeeded. */
export interface CreateOrReplaceDiscoGroup200Response extends HttpResponse {
  status: "200";
  body: DiscoGroupOutput;
}

export interface CreateOrReplaceDiscoGroupDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface CreateOrReplaceDiscoGroupDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & CreateOrReplaceDiscoGroupDefaultHeaders;
}

/** There is no content to send for this request, but the headers may be useful. */
export interface RunDiscoGroup204Response extends HttpResponse {
  status: "204";
}

export interface RunDiscoGroupDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface RunDiscoGroupDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & RunDiscoGroupDefaultHeaders;
}

/** The request has succeeded. */
export interface ListRuns200Response extends HttpResponse {
  status: "200";
  body: DiscoRunPageResultOutput;
}

export interface ListRunsDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface ListRunsDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & ListRunsDefaultHeaders;
}

/** The request has succeeded. */
export interface ListDiscoTemplate200Response extends HttpResponse {
  status: "200";
  body: PagedDiscoTemplateOutput;
}

export interface ListDiscoTemplateDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface ListDiscoTemplateDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & ListDiscoTemplateDefaultHeaders;
}

/** The request has succeeded. */
export interface GetDiscoTemplate200Response extends HttpResponse {
  status: "200";
  body: DiscoTemplateOutput;
}

export interface GetDiscoTemplateDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface GetDiscoTemplateDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & GetDiscoTemplateDefaultHeaders;
}

/** The request has succeeded. */
export interface GetBillable200Response extends HttpResponse {
  status: "200";
  body: ReportBillableAssetSummaryResultOutput;
}

export interface GetBillableDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface GetBillableDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & GetBillableDefaultHeaders;
}

/** The request has succeeded. */
export interface GetSnapshot200Response extends HttpResponse {
  status: "200";
  body: ReportAssetSnapshotResultOutput;
}

export interface GetSnapshotDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface GetSnapshotDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & GetSnapshotDefaultHeaders;
}

/** The request has succeeded. */
export interface GetSummary200Response extends HttpResponse {
  status: "200";
  body: ReportAssetSummaryResultOutput;
}

export interface GetSummaryDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface GetSummaryDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & GetSummaryDefaultHeaders;
}

/** The request has succeeded. */
export interface ListSavedFilter200Response extends HttpResponse {
  status: "200";
  body: PagedSavedFilterOutput;
}

export interface ListSavedFilterDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface ListSavedFilterDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & ListSavedFilterDefaultHeaders;
}

/** The request has succeeded. */
export interface GetSavedFilter200Response extends HttpResponse {
  status: "200";
  body: SavedFilterOutput;
}

export interface GetSavedFilterDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface GetSavedFilterDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & GetSavedFilterDefaultHeaders;
}

/** The request has succeeded. */
export interface CreateOrReplaceSavedFilter200Response extends HttpResponse {
  status: "200";
  body: SavedFilterOutput;
}

export interface CreateOrReplaceSavedFilterDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface CreateOrReplaceSavedFilterDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & CreateOrReplaceSavedFilterDefaultHeaders;
}

/** There is no content to send for this request, but the headers may be useful. */
export interface DeleteSavedFilter204Response extends HttpResponse {
  status: "204";
}

export interface DeleteSavedFilterDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface DeleteSavedFilterDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & DeleteSavedFilterDefaultHeaders;
}

/** The request has succeeded. */
export interface ListTask200Response extends HttpResponse {
  status: "200";
  body: PagedTaskOutput;
}

export interface ListTaskDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface ListTaskDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & ListTaskDefaultHeaders;
}

/** The request has succeeded. */
export interface GetTask200Response extends HttpResponse {
  status: "200";
  body: TaskOutput;
}

export interface GetTaskDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface GetTaskDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & GetTaskDefaultHeaders;
}

/** The request has succeeded. */
export interface CancelTask200Response extends HttpResponse {
  status: "200";
  body: TaskOutput;
}

export interface CancelTaskDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface CancelTaskDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & CancelTaskDefaultHeaders;
}

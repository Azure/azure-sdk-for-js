// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { RawHttpHeaders } from "@azure/core-rest-pipeline";
import type { HttpResponse, ErrorResponse } from "@azure-rest/core-client";
import type {
  PagedAssetResourceOutput,
  TaskOutput,
  AssetResourceOutput,
  ObservationPageResultOutput,
  DeltaPageResultOutput,
  DeltaSummaryResultOutput,
  PagedDataConnectionOutput,
  ValidateResultOutput,
  DataConnectionOutput,
  PagedDiscoGroupOutput,
  DiscoGroupOutput,
  DiscoRunPageResultOutput,
  AssetChainSummaryResultOutput,
  PagedDiscoTemplateOutput,
  DiscoTemplateOutput,
  ReportBillableAssetSummaryResultOutput,
  ReportAssetSnapshotResultOutput,
  ReportAssetSummaryResultOutput,
  PagedSavedFilterOutput,
  SavedFilterOutput,
  PagedTaskOutput,
  PagedCisaCveResultOutput,
  CisaCveResultOutput,
  PagedPolicyOutput,
  PolicyOutput,
} from "./outputModels.js";

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
export interface GetAssetsExport200Response extends HttpResponse {
  status: "200";
  body: TaskOutput;
}

export interface GetAssetsExportDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface GetAssetsExportDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & GetAssetsExportDefaultHeaders;
}

/** The request has succeeded. */
export interface GetObservations200Response extends HttpResponse {
  status: "200";
  body: ObservationPageResultOutput;
}

export interface GetObservationsDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface GetObservationsDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & GetObservationsDefaultHeaders;
}

/** The request has succeeded. */
export interface GetDeltaDetails200Response extends HttpResponse {
  status: "200";
  body: DeltaPageResultOutput;
}

export interface GetDeltaDetailsDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface GetDeltaDetailsDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & GetDeltaDetailsDefaultHeaders;
}

/** The request has succeeded. */
export interface GetDeltaSummary200Response extends HttpResponse {
  status: "200";
  body: DeltaSummaryResultOutput;
}

export interface GetDeltaSummaryDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface GetDeltaSummaryDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & GetDeltaSummaryDefaultHeaders;
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

export interface CreateOrReplaceDataConnectionDefaultResponse extends HttpResponse {
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

/** There is no content to send for this request, but the headers may be useful. */
export interface DeleteDiscoGroup204Response extends HttpResponse {
  status: "204";
}

export interface DeleteDiscoGroupDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface DeleteDiscoGroupDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & DeleteDiscoGroupDefaultHeaders;
}

/** The request has succeeded. */
export interface GetAssetChainSummary200Response extends HttpResponse {
  status: "200";
  body: AssetChainSummaryResultOutput;
}

export interface GetAssetChainSummaryDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface GetAssetChainSummaryDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & GetAssetChainSummaryDefaultHeaders;
}

/** The request has succeeded. */
export interface DismissAssetChain200Response extends HttpResponse {
  status: "200";
  body: TaskOutput;
}

export interface DismissAssetChainDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface DismissAssetChainDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & DismissAssetChainDefaultHeaders;
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
export interface GetSnapshotExport200Response extends HttpResponse {
  status: "200";
  body: TaskOutput;
}

export interface GetSnapshotExportDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface GetSnapshotExportDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & GetSnapshotExportDefaultHeaders;
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

export interface CreateOrReplaceSavedFilterDefaultResponse extends HttpResponse {
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

/** The request has succeeded. */
export interface RunTask200Response extends HttpResponse {
  status: "200";
  body: TaskOutput;
}

export interface RunTaskDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface RunTaskDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & RunTaskDefaultHeaders;
}

/** The request has succeeded. */
export interface DownloadTask200Response extends HttpResponse {
  status: "200";
  body: TaskOutput;
}

export interface DownloadTaskDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface DownloadTaskDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & DownloadTaskDefaultHeaders;
}

/** The request has succeeded. */
export interface GetCisaCves200Response extends HttpResponse {
  status: "200";
  body: PagedCisaCveResultOutput;
}

export interface GetCisaCvesDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface GetCisaCvesDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & GetCisaCvesDefaultHeaders;
}

/** The request has succeeded. */
export interface GetCisaCve200Response extends HttpResponse {
  status: "200";
  body: CisaCveResultOutput;
}

export interface GetCisaCveDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface GetCisaCveDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & GetCisaCveDefaultHeaders;
}

/** The request has succeeded. */
export interface ListPolicy200Response extends HttpResponse {
  status: "200";
  body: PagedPolicyOutput;
}

export interface ListPolicyDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface ListPolicyDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & ListPolicyDefaultHeaders;
}

/** The request has succeeded. */
export interface GetPolicy200Response extends HttpResponse {
  status: "200";
  body: PolicyOutput;
}

export interface GetPolicyDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface GetPolicyDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & GetPolicyDefaultHeaders;
}

/** The request has succeeded. */
export interface CreateOrReplacePolicy200Response extends HttpResponse {
  status: "200";
  body: PolicyOutput;
}

export interface CreateOrReplacePolicyDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface CreateOrReplacePolicyDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & CreateOrReplacePolicyDefaultHeaders;
}

/** There is no content to send for this request, but the headers may be useful. */
export interface DeletePolicy204Response extends HttpResponse {
  status: "204";
}

export interface DeletePolicyDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface DeletePolicyDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & DeletePolicyDefaultHeaders;
}

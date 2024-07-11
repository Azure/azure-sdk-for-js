// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { RawHttpHeaders } from "@azure/core-rest-pipeline";
import { HttpResponse } from "@azure-rest/core-client";
import {
  PagedOperationDetailsOutput,
  ErrorResponseOutput,
  DocumentModelBuildOperationDetailsOutput,
  DocumentModelComposeOperationDetailsOutput,
  DocumentModelCopyToOperationDetailsOutput,
  DocumentClassifierCopyToOperationDetailsOutput,
  DocumentClassifierBuildOperationDetailsOutput,
  OperationDetailsOutput,
  ResourceDetailsOutput,
  AnalyzeResultOperationOutput,
  AnalyzeBatchResultOperationOutput,
  DocumentModelDetailsOutput,
  CopyAuthorizationOutput,
  PagedDocumentModelDetailsOutput,
  PagedDocumentClassifierDetailsOutput,
  DocumentClassifierDetailsOutput,
  ClassifierCopyAuthorizationOutput,
} from "./outputModels.js";

export interface ListOperations200Headers {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "x-ms-client-request-id"?: string;
}

/** The request has succeeded. */
export interface ListOperations200Response extends HttpResponse {
  status: "200";
  body: PagedOperationDetailsOutput;
  headers: RawHttpHeaders & ListOperations200Headers;
}

export interface ListOperationsDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

export interface GetDocumentModelBuildOperation200Headers {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "x-ms-client-request-id"?: string;
}

/** The request has succeeded. */
export interface GetDocumentModelBuildOperation200Response
  extends HttpResponse {
  status: "200";
  body: DocumentModelBuildOperationDetailsOutput;
  headers: RawHttpHeaders & GetDocumentModelBuildOperation200Headers;
}

export interface GetDocumentModelBuildOperationDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

export interface GetDocumentModelComposeOperation200Headers {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "x-ms-client-request-id"?: string;
}

/** The request has succeeded. */
export interface GetDocumentModelComposeOperation200Response
  extends HttpResponse {
  status: "200";
  body: DocumentModelComposeOperationDetailsOutput;
  headers: RawHttpHeaders & GetDocumentModelComposeOperation200Headers;
}

export interface GetDocumentModelComposeOperationDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

export interface GetDocumentModelCopyToOperation200Headers {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "x-ms-client-request-id"?: string;
}

/** The request has succeeded. */
export interface GetDocumentModelCopyToOperation200Response
  extends HttpResponse {
  status: "200";
  body: DocumentModelCopyToOperationDetailsOutput;
  headers: RawHttpHeaders & GetDocumentModelCopyToOperation200Headers;
}

export interface GetDocumentModelCopyToOperationDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

export interface GetDocumentClassifierCopyToOperation200Headers {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "x-ms-client-request-id"?: string;
}

/** The request has succeeded. */
export interface GetDocumentClassifierCopyToOperation200Response
  extends HttpResponse {
  status: "200";
  body: DocumentClassifierCopyToOperationDetailsOutput;
  headers: RawHttpHeaders & GetDocumentClassifierCopyToOperation200Headers;
}

export interface GetDocumentClassifierCopyToOperationDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

export interface GetDocumentClassifierBuildOperation200Headers {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "x-ms-client-request-id"?: string;
}

/** The request has succeeded. */
export interface GetDocumentClassifierBuildOperation200Response
  extends HttpResponse {
  status: "200";
  body: DocumentClassifierBuildOperationDetailsOutput;
  headers: RawHttpHeaders & GetDocumentClassifierBuildOperation200Headers;
}

export interface GetDocumentClassifierBuildOperationDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

export interface GetOperation200Headers {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "x-ms-client-request-id"?: string;
}

/** The request has succeeded. */
export interface GetOperation200Response extends HttpResponse {
  status: "200";
  body: OperationDetailsOutput;
  headers: RawHttpHeaders & GetOperation200Headers;
}

export interface GetOperationDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** The request has succeeded. */
export interface GetResourceInfo200Response extends HttpResponse {
  status: "200";
  body: ResourceDetailsOutput;
}

export interface GetResourceInfoDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** The request has succeeded. */
export interface GetAnalyzeResult200Response extends HttpResponse {
  status: "200";
  body: AnalyzeResultOperationOutput;
}

export interface GetAnalyzeResultDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

export interface GetAnalyzeResultPdf200Headers {
  /** Response content type. */
  "content-type": "application/pdf";
}

/** The request has succeeded. */
export interface GetAnalyzeResultPdf200Response extends HttpResponse {
  status: "200";
  /** Value may contain any sequence of octets */
  body: Uint8Array;
  headers: RawHttpHeaders & GetAnalyzeResultPdf200Headers;
}

export interface GetAnalyzeResultPdfDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

export interface GetAnalyzeResultFigure200Headers {
  /** Response content type. */
  "content-type": "image/png";
}

/** The request has succeeded. */
export interface GetAnalyzeResultFigure200Response extends HttpResponse {
  status: "200";
  /** Value may contain any sequence of octets */
  body: Uint8Array;
  headers: RawHttpHeaders & GetAnalyzeResultFigure200Headers;
}

export interface GetAnalyzeResultFigureDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

export interface AnalyzeDocumentFromStream202Headers {
  /** The Retry-After header can indicate how long the client should wait before polling the operation status. */
  "retry-after"?: number;
  "operation-location": string;
}

/** The request has been accepted for processing, but processing has not yet completed. */
export interface AnalyzeDocumentFromStream202Response extends HttpResponse {
  status: "202";
  headers: RawHttpHeaders & AnalyzeDocumentFromStream202Headers;
}

export interface AnalyzeDocumentFromStreamDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** The final response for long-running analyzeDocumentFromStream operation */
export interface AnalyzeDocumentFromStreamLogicalResponse extends HttpResponse {
  status: "200";
}

export interface AnalyzeDocument202Headers {
  /** The Retry-After header can indicate how long the client should wait before polling the operation status. */
  "retry-after"?: number;
  "operation-location": string;
}

/** The request has been accepted for processing, but processing has not yet completed. */
export interface AnalyzeDocument202Response extends HttpResponse {
  status: "202";
  headers: RawHttpHeaders & AnalyzeDocument202Headers;
}

export interface AnalyzeDocumentDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** The final response for long-running analyzeDocument operation */
export interface AnalyzeDocumentLogicalResponse extends HttpResponse {
  status: "200";
}

/** The request has succeeded. */
export interface GetAnalyzeBatchResult200Response extends HttpResponse {
  status: "200";
  body: AnalyzeBatchResultOperationOutput;
}

export interface GetAnalyzeBatchResultDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

export interface AnalyzeBatchDocuments202Headers {
  /** The Retry-After header can indicate how long the client should wait before polling the operation status. */
  "retry-after"?: number;
  "operation-location": string;
}

/** The request has been accepted for processing, but processing has not yet completed. */
export interface AnalyzeBatchDocuments202Response extends HttpResponse {
  status: "202";
  headers: RawHttpHeaders & AnalyzeBatchDocuments202Headers;
}

export interface AnalyzeBatchDocumentsDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** The final response for long-running analyzeBatchDocuments operation */
export interface AnalyzeBatchDocumentsLogicalResponse extends HttpResponse {
  status: "200";
}

export interface GetModel200Headers {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "x-ms-client-request-id"?: string;
}

/** The request has succeeded. */
export interface GetModel200Response extends HttpResponse {
  status: "200";
  body: DocumentModelDetailsOutput;
  headers: RawHttpHeaders & GetModel200Headers;
}

export interface GetModelDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

export interface PatchModel200Headers {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "x-ms-client-request-id"?: string;
}

/** The request has succeeded. */
export interface PatchModel200Response extends HttpResponse {
  status: "200";
  body: DocumentModelDetailsOutput;
  headers: RawHttpHeaders & PatchModel200Headers;
}

export interface PatchModelDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

export interface BuildModel202Headers {
  /** The Retry-After header can indicate how long the client should wait before polling the operation status. */
  "retry-after"?: number;
  "operation-location": string;
}

/** The request has been accepted for processing, but processing has not yet completed. */
export interface BuildModel202Response extends HttpResponse {
  status: "202";
  headers: RawHttpHeaders & BuildModel202Headers;
}

export interface BuildModelDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** The final response for long-running buildModel operation */
export interface BuildModelLogicalResponse extends HttpResponse {
  status: "200";
}

export interface ComposeModel202Headers {
  /** The Retry-After header can indicate how long the client should wait before polling the operation status. */
  "retry-after"?: number;
  "operation-location": string;
}

/** The request has been accepted for processing, but processing has not yet completed. */
export interface ComposeModel202Response extends HttpResponse {
  status: "202";
  headers: RawHttpHeaders & ComposeModel202Headers;
}

export interface ComposeModelDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** The final response for long-running composeModel operation */
export interface ComposeModelLogicalResponse extends HttpResponse {
  status: "200";
}

/** The request has succeeded. */
export interface AuthorizeModelCopy200Response extends HttpResponse {
  status: "200";
  body: CopyAuthorizationOutput;
}

export interface AuthorizeModelCopyDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

export interface CopyModelTo202Headers {
  /** The Retry-After header can indicate how long the client should wait before polling the operation status. */
  "retry-after"?: number;
  "operation-location": string;
}

/** The request has been accepted for processing, but processing has not yet completed. */
export interface CopyModelTo202Response extends HttpResponse {
  status: "202";
  headers: RawHttpHeaders & CopyModelTo202Headers;
}

export interface CopyModelToDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** The final response for long-running copyModelTo operation */
export interface CopyModelToLogicalResponse extends HttpResponse {
  status: "200";
}

export interface ListModels200Headers {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "x-ms-client-request-id"?: string;
}

/** The request has succeeded. */
export interface ListModels200Response extends HttpResponse {
  status: "200";
  body: PagedDocumentModelDetailsOutput;
  headers: RawHttpHeaders & ListModels200Headers;
}

export interface ListModelsDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

export interface DeleteModel204Headers {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "x-ms-client-request-id"?: string;
}

/** There is no content to send for this request, but the headers may be useful. */
export interface DeleteModel204Response extends HttpResponse {
  status: "204";
  headers: RawHttpHeaders & DeleteModel204Headers;
}

export interface DeleteModelDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

export interface BuildClassifier202Headers {
  /** The Retry-After header can indicate how long the client should wait before polling the operation status. */
  "retry-after"?: number;
  "operation-location": string;
}

/** The request has been accepted for processing, but processing has not yet completed. */
export interface BuildClassifier202Response extends HttpResponse {
  status: "202";
  headers: RawHttpHeaders & BuildClassifier202Headers;
}

export interface BuildClassifierDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** The final response for long-running buildClassifier operation */
export interface BuildClassifierLogicalResponse extends HttpResponse {
  status: "200";
}

export interface ListClassifiers200Headers {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "x-ms-client-request-id"?: string;
}

/** The request has succeeded. */
export interface ListClassifiers200Response extends HttpResponse {
  status: "200";
  body: PagedDocumentClassifierDetailsOutput;
  headers: RawHttpHeaders & ListClassifiers200Headers;
}

export interface ListClassifiersDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

export interface GetClassifier200Headers {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "x-ms-client-request-id"?: string;
}

/** The request has succeeded. */
export interface GetClassifier200Response extends HttpResponse {
  status: "200";
  body: DocumentClassifierDetailsOutput;
  headers: RawHttpHeaders & GetClassifier200Headers;
}

export interface GetClassifierDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

export interface DeleteClassifier204Headers {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "x-ms-client-request-id"?: string;
}

/** There is no content to send for this request, but the headers may be useful. */
export interface DeleteClassifier204Response extends HttpResponse {
  status: "204";
  headers: RawHttpHeaders & DeleteClassifier204Headers;
}

export interface DeleteClassifierDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

export interface ClassifyDocumentFromStream202Headers {
  /** The Retry-After header can indicate how long the client should wait before polling the operation status. */
  "retry-after"?: number;
  "operation-location": string;
}

/** The request has been accepted for processing, but processing has not yet completed. */
export interface ClassifyDocumentFromStream202Response extends HttpResponse {
  status: "202";
  headers: RawHttpHeaders & ClassifyDocumentFromStream202Headers;
}

export interface ClassifyDocumentFromStreamDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** The final response for long-running classifyDocumentFromStream operation */
export interface ClassifyDocumentFromStreamLogicalResponse
  extends HttpResponse {
  status: "200";
}

export interface ClassifyDocument202Headers {
  /** The Retry-After header can indicate how long the client should wait before polling the operation status. */
  "retry-after"?: number;
  "operation-location": string;
}

/** The request has been accepted for processing, but processing has not yet completed. */
export interface ClassifyDocument202Response extends HttpResponse {
  status: "202";
  headers: RawHttpHeaders & ClassifyDocument202Headers;
}

export interface ClassifyDocumentDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** The final response for long-running classifyDocument operation */
export interface ClassifyDocumentLogicalResponse extends HttpResponse {
  status: "200";
}

/** The request has succeeded. */
export interface GetClassifyResult200Response extends HttpResponse {
  status: "200";
  body: AnalyzeResultOperationOutput;
}

export interface GetClassifyResultDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** The request has succeeded. */
export interface AuthorizeClassifierCopy200Response extends HttpResponse {
  status: "200";
  body: ClassifierCopyAuthorizationOutput;
}

export interface AuthorizeClassifierCopyDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

export interface CopyClassifierTo202Headers {
  /** The Retry-After header can indicate how long the client should wait before polling the operation status. */
  "retry-after"?: number;
  "operation-location": string;
}

/** The request has been accepted for processing, but processing has not yet completed. */
export interface CopyClassifierTo202Response extends HttpResponse {
  status: "202";
  headers: RawHttpHeaders & CopyClassifierTo202Headers;
}

export interface CopyClassifierToDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** The final response for long-running copyClassifierTo operation */
export interface CopyClassifierToLogicalResponse extends HttpResponse {
  status: "200";
}

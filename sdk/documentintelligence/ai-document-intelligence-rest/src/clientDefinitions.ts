// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  ListOperationsParameters,
  GetDocumentModelBuildOperationParameters,
  GetDocumentModelComposeOperationParameters,
  GetDocumentModelCopyToOperationParameters,
  GetDocumentClassifierCopyToOperationParameters,
  GetDocumentClassifierBuildOperationParameters,
  GetOperationParameters,
  GetResourceDetailsParameters,
  GetAnalyzeResultParameters,
  DeleteAnalyzeResultParameters,
  GetAnalyzeResultPdfParameters,
  GetAnalyzeResultFigureParameters,
  AnalyzeDocumentFromStreamParameters,
  AnalyzeDocumentParameters,
  GetAnalyzeBatchResultParameters,
  DeleteAnalyzeBatchResultParameters,
  AnalyzeBatchDocumentsParameters,
  ListAnalyzeBatchResultsParameters,
  GetModelParameters,
  DeleteModelParameters,
  BuildModelParameters,
  ComposeModelParameters,
  AuthorizeModelCopyParameters,
  CopyModelToParameters,
  ListModelsParameters,
  BuildClassifierParameters,
  ListClassifiersParameters,
  GetClassifierParameters,
  DeleteClassifierParameters,
  ClassifyDocumentFromStreamParameters,
  ClassifyDocumentParameters,
  GetClassifyResultParameters,
  AuthorizeClassifierCopyParameters,
  CopyClassifierToParameters,
} from "./parameters.js";
import {
  ListOperations200Response,
  ListOperationsDefaultResponse,
  GetDocumentModelBuildOperation200Response,
  GetDocumentModelBuildOperationDefaultResponse,
  GetDocumentModelComposeOperation200Response,
  GetDocumentModelComposeOperationDefaultResponse,
  GetDocumentModelCopyToOperation200Response,
  GetDocumentModelCopyToOperationDefaultResponse,
  GetDocumentClassifierCopyToOperation200Response,
  GetDocumentClassifierCopyToOperationDefaultResponse,
  GetDocumentClassifierBuildOperation200Response,
  GetDocumentClassifierBuildOperationDefaultResponse,
  GetOperation200Response,
  GetOperationDefaultResponse,
  GetResourceDetails200Response,
  GetResourceDetailsDefaultResponse,
  GetAnalyzeResult200Response,
  GetAnalyzeResultDefaultResponse,
  DeleteAnalyzeResult204Response,
  DeleteAnalyzeResultDefaultResponse,
  GetAnalyzeResultPdf200Response,
  GetAnalyzeResultPdfDefaultResponse,
  GetAnalyzeResultFigure200Response,
  GetAnalyzeResultFigureDefaultResponse,
  AnalyzeDocumentFromStream202Response,
  AnalyzeDocumentFromStreamDefaultResponse,
  AnalyzeDocument202Response,
  AnalyzeDocumentDefaultResponse,
  GetAnalyzeBatchResult200Response,
  GetAnalyzeBatchResultDefaultResponse,
  DeleteAnalyzeBatchResult204Response,
  DeleteAnalyzeBatchResultDefaultResponse,
  AnalyzeBatchDocuments202Response,
  AnalyzeBatchDocumentsDefaultResponse,
  ListAnalyzeBatchResults200Response,
  ListAnalyzeBatchResultsDefaultResponse,
  GetModel200Response,
  GetModelDefaultResponse,
  DeleteModel204Response,
  DeleteModelDefaultResponse,
  BuildModel202Response,
  BuildModelDefaultResponse,
  ComposeModel202Response,
  ComposeModelDefaultResponse,
  AuthorizeModelCopy200Response,
  AuthorizeModelCopyDefaultResponse,
  CopyModelTo202Response,
  CopyModelToDefaultResponse,
  ListModels200Response,
  ListModelsDefaultResponse,
  BuildClassifier202Response,
  BuildClassifierDefaultResponse,
  ListClassifiers200Response,
  ListClassifiersDefaultResponse,
  GetClassifier200Response,
  GetClassifierDefaultResponse,
  DeleteClassifier204Response,
  DeleteClassifierDefaultResponse,
  ClassifyDocumentFromStream202Response,
  ClassifyDocumentFromStreamDefaultResponse,
  ClassifyDocument202Response,
  ClassifyDocumentDefaultResponse,
  GetClassifyResult200Response,
  GetClassifyResultDefaultResponse,
  AuthorizeClassifierCopy200Response,
  AuthorizeClassifierCopyDefaultResponse,
  CopyClassifierTo202Response,
  CopyClassifierToDefaultResponse,
} from "./responses.js";
import { Client, StreamableMethod } from "@azure-rest/core-client";

export interface ListOperations {
  /** Lists all operations. */
  get(
    options?: ListOperationsParameters,
  ): StreamableMethod<
    ListOperations200Response | ListOperationsDefaultResponse
  >;
}

export interface GetDocumentModelBuildOperation {
  /** Gets operation info. */
  get(
    options?: GetDocumentModelBuildOperationParameters,
  ): StreamableMethod<
    | GetDocumentModelBuildOperation200Response
    | GetDocumentModelBuildOperationDefaultResponse
  >;
  /** Gets operation info. */
  get(
    options?: GetDocumentModelComposeOperationParameters,
  ): StreamableMethod<
    | GetDocumentModelComposeOperation200Response
    | GetDocumentModelComposeOperationDefaultResponse
  >;
  /** Gets operation info. */
  get(
    options?: GetDocumentModelCopyToOperationParameters,
  ): StreamableMethod<
    | GetDocumentModelCopyToOperation200Response
    | GetDocumentModelCopyToOperationDefaultResponse
  >;
  /** Gets operation info. */
  get(
    options?: GetDocumentClassifierCopyToOperationParameters,
  ): StreamableMethod<
    | GetDocumentClassifierCopyToOperation200Response
    | GetDocumentClassifierCopyToOperationDefaultResponse
  >;
  /** Gets operation info. */
  get(
    options?: GetDocumentClassifierBuildOperationParameters,
  ): StreamableMethod<
    | GetDocumentClassifierBuildOperation200Response
    | GetDocumentClassifierBuildOperationDefaultResponse
  >;
  /** Gets operation info. */
  get(
    options?: GetOperationParameters,
  ): StreamableMethod<GetOperation200Response | GetOperationDefaultResponse>;
}

export interface GetResourceDetails {
  /** Return information about the current resource. */
  get(
    options?: GetResourceDetailsParameters,
  ): StreamableMethod<
    GetResourceDetails200Response | GetResourceDetailsDefaultResponse
  >;
}

export interface GetAnalyzeResult {
  /** Gets the result of document analysis. */
  get(
    options?: GetAnalyzeResultParameters,
  ): StreamableMethod<
    GetAnalyzeResult200Response | GetAnalyzeResultDefaultResponse
  >;
  /** Mark the result of document analysis for deletion. */
  delete(
    options?: DeleteAnalyzeResultParameters,
  ): StreamableMethod<
    DeleteAnalyzeResult204Response | DeleteAnalyzeResultDefaultResponse
  >;
}

export interface GetAnalyzeResultPdf {
  /** Gets the generated searchable PDF output from document analysis. */
  get(
    options?: GetAnalyzeResultPdfParameters,
  ): StreamableMethod<
    GetAnalyzeResultPdf200Response | GetAnalyzeResultPdfDefaultResponse
  >;
}

export interface GetAnalyzeResultFigure {
  /** Gets the generated cropped image of specified figure from document analysis. */
  get(
    options?: GetAnalyzeResultFigureParameters,
  ): StreamableMethod<
    GetAnalyzeResultFigure200Response | GetAnalyzeResultFigureDefaultResponse
  >;
}

export interface AnalyzeDocumentFromStream {
  /** Analyzes document with document model. */
  post(
    options: AnalyzeDocumentFromStreamParameters,
  ): StreamableMethod<
    | AnalyzeDocumentFromStream202Response
    | AnalyzeDocumentFromStreamDefaultResponse
  >;
  /** Analyzes document with document model. */
  post(
    options: AnalyzeDocumentParameters,
  ): StreamableMethod<
    AnalyzeDocument202Response | AnalyzeDocumentDefaultResponse
  >;
}

export interface GetAnalyzeBatchResult {
  /** Gets the result of batch document analysis. */
  get(
    options?: GetAnalyzeBatchResultParameters,
  ): StreamableMethod<
    GetAnalyzeBatchResult200Response | GetAnalyzeBatchResultDefaultResponse
  >;
  /** Mark the batch document analysis result for deletion. */
  delete(
    options?: DeleteAnalyzeBatchResultParameters,
  ): StreamableMethod<
    | DeleteAnalyzeBatchResult204Response
    | DeleteAnalyzeBatchResultDefaultResponse
  >;
}

export interface AnalyzeBatchDocuments {
  /** Analyzes batch documents with document model. */
  post(
    options: AnalyzeBatchDocumentsParameters,
  ): StreamableMethod<
    AnalyzeBatchDocuments202Response | AnalyzeBatchDocumentsDefaultResponse
  >;
}

export interface ListAnalyzeBatchResults {
  /** List batch document analysis results. */
  get(
    options?: ListAnalyzeBatchResultsParameters,
  ): StreamableMethod<
    ListAnalyzeBatchResults200Response | ListAnalyzeBatchResultsDefaultResponse
  >;
}

export interface GetModel {
  /** Gets detailed document model information. */
  get(
    options?: GetModelParameters,
  ): StreamableMethod<GetModel200Response | GetModelDefaultResponse>;
  /** Deletes document model. */
  delete(
    options?: DeleteModelParameters,
  ): StreamableMethod<DeleteModel204Response | DeleteModelDefaultResponse>;
}

export interface BuildModel {
  /** Builds a custom document analysis model. */
  post(
    options: BuildModelParameters,
  ): StreamableMethod<BuildModel202Response | BuildModelDefaultResponse>;
}

export interface ComposeModel {
  /** Creates a new document model from document types of existing document models. */
  post(
    options: ComposeModelParameters,
  ): StreamableMethod<ComposeModel202Response | ComposeModelDefaultResponse>;
}

export interface AuthorizeModelCopy {
  /**
   * Generates authorization to copy a document model to this location with
   * specified modelId and optional description.
   */
  post(
    options: AuthorizeModelCopyParameters,
  ): StreamableMethod<
    AuthorizeModelCopy200Response | AuthorizeModelCopyDefaultResponse
  >;
}

export interface CopyModelTo {
  /** Copies document model to the target resource, region, and modelId. */
  post(
    options: CopyModelToParameters,
  ): StreamableMethod<CopyModelTo202Response | CopyModelToDefaultResponse>;
}

export interface ListModels {
  /** List all document models */
  get(
    options?: ListModelsParameters,
  ): StreamableMethod<ListModels200Response | ListModelsDefaultResponse>;
}

export interface BuildClassifier {
  /** Builds a custom document classifier. */
  post(
    options: BuildClassifierParameters,
  ): StreamableMethod<
    BuildClassifier202Response | BuildClassifierDefaultResponse
  >;
}

export interface ListClassifiers {
  /** List all document classifiers. */
  get(
    options?: ListClassifiersParameters,
  ): StreamableMethod<
    ListClassifiers200Response | ListClassifiersDefaultResponse
  >;
}

export interface GetClassifier {
  /** Gets detailed document classifier information. */
  get(
    options?: GetClassifierParameters,
  ): StreamableMethod<GetClassifier200Response | GetClassifierDefaultResponse>;
  /** Deletes document classifier. */
  delete(
    options?: DeleteClassifierParameters,
  ): StreamableMethod<
    DeleteClassifier204Response | DeleteClassifierDefaultResponse
  >;
}

export interface ClassifyDocumentFromStream {
  /** Classifies document with document classifier. */
  post(
    options: ClassifyDocumentFromStreamParameters,
  ): StreamableMethod<
    | ClassifyDocumentFromStream202Response
    | ClassifyDocumentFromStreamDefaultResponse
  >;
  /** Classifies document with document classifier. */
  post(
    options: ClassifyDocumentParameters,
  ): StreamableMethod<
    ClassifyDocument202Response | ClassifyDocumentDefaultResponse
  >;
}

export interface GetClassifyResult {
  /** Gets the result of document classifier. */
  get(
    options?: GetClassifyResultParameters,
  ): StreamableMethod<
    GetClassifyResult200Response | GetClassifyResultDefaultResponse
  >;
}

export interface AuthorizeClassifierCopy {
  /**
   * Generates authorization to copy a document classifier to this location with
   * specified classifierId and optional description.
   */
  post(
    options: AuthorizeClassifierCopyParameters,
  ): StreamableMethod<
    AuthorizeClassifierCopy200Response | AuthorizeClassifierCopyDefaultResponse
  >;
}

export interface CopyClassifierTo {
  /** Copies document classifier to the target resource, region, and classifierId. */
  post(
    options: CopyClassifierToParameters,
  ): StreamableMethod<
    CopyClassifierTo202Response | CopyClassifierToDefaultResponse
  >;
}

export interface Routes {
  /** Resource for '/operations' has methods for the following verbs: get */
  (path: "/operations"): ListOperations;
  /** Resource for '/operations/\{operationId\}' has methods for the following verbs: get */
  (
    path: "/operations/{operationId}",
    operationId: string,
  ): GetDocumentModelBuildOperation;
  /** Resource for '/info' has methods for the following verbs: get */
  (path: "/info"): GetResourceDetails;
  /** Resource for '/documentModels/\{modelId\}/analyzeResults/\{resultId\}' has methods for the following verbs: get, delete */
  (
    path: "/documentModels/{modelId}/analyzeResults/{resultId}",
    modelId: string,
    resultId: string,
  ): GetAnalyzeResult;
  /** Resource for '/documentModels/\{modelId\}/analyzeResults/\{resultId\}/pdf' has methods for the following verbs: get */
  (
    path: "/documentModels/{modelId}/analyzeResults/{resultId}/pdf",
    modelId: string,
    resultId: string,
  ): GetAnalyzeResultPdf;
  /** Resource for '/documentModels/\{modelId\}/analyzeResults/\{resultId\}/figures/\{figureId\}' has methods for the following verbs: get */
  (
    path: "/documentModels/{modelId}/analyzeResults/{resultId}/figures/{figureId}",
    modelId: string,
    resultId: string,
    figureId: string,
  ): GetAnalyzeResultFigure;
  /** Resource for '/documentModels/\{modelId\}:analyze' has methods for the following verbs: post */
  (
    path: "/documentModels/{modelId}:analyze",
    modelId: string,
  ): AnalyzeDocumentFromStream;
  /** Resource for '/documentModels/\{modelId\}/analyzeBatchResults/\{resultId\}' has methods for the following verbs: get, delete */
  (
    path: "/documentModels/{modelId}/analyzeBatchResults/{resultId}",
    modelId: string,
    resultId: string,
  ): GetAnalyzeBatchResult;
  /** Resource for '/documentModels/\{modelId\}:analyzeBatch' has methods for the following verbs: post */
  (
    path: "/documentModels/{modelId}:analyzeBatch",
    modelId: string,
  ): AnalyzeBatchDocuments;
  /** Resource for '/documentModels/\{modelId\}/analyzeBatchResults' has methods for the following verbs: get */
  (
    path: "/documentModels/{modelId}/analyzeBatchResults",
    modelId: string,
  ): ListAnalyzeBatchResults;
  /** Resource for '/documentModels/\{modelId\}' has methods for the following verbs: get, delete */
  (path: "/documentModels/{modelId}", modelId: string): GetModel;
  /** Resource for '/documentModels:build' has methods for the following verbs: post */
  (path: "/documentModels:build"): BuildModel;
  /** Resource for '/documentModels:compose' has methods for the following verbs: post */
  (path: "/documentModels:compose"): ComposeModel;
  /** Resource for '/documentModels:authorizeCopy' has methods for the following verbs: post */
  (path: "/documentModels:authorizeCopy"): AuthorizeModelCopy;
  /** Resource for '/documentModels/\{modelId\}:copyTo' has methods for the following verbs: post */
  (path: "/documentModels/{modelId}:copyTo", modelId: string): CopyModelTo;
  /** Resource for '/documentModels' has methods for the following verbs: get */
  (path: "/documentModels"): ListModels;
  /** Resource for '/documentClassifiers:build' has methods for the following verbs: post */
  (path: "/documentClassifiers:build"): BuildClassifier;
  /** Resource for '/documentClassifiers' has methods for the following verbs: get */
  (path: "/documentClassifiers"): ListClassifiers;
  /** Resource for '/documentClassifiers/\{classifierId\}' has methods for the following verbs: get, delete */
  (
    path: "/documentClassifiers/{classifierId}",
    classifierId: string,
  ): GetClassifier;
  /** Resource for '/documentClassifiers/\{classifierId\}:analyze' has methods for the following verbs: post */
  (
    path: "/documentClassifiers/{classifierId}:analyze",
    classifierId: string,
  ): ClassifyDocumentFromStream;
  /** Resource for '/documentClassifiers/\{classifierId\}/analyzeResults/\{resultId\}' has methods for the following verbs: get */
  (
    path: "/documentClassifiers/{classifierId}/analyzeResults/{resultId}",
    classifierId: string,
    resultId: string,
  ): GetClassifyResult;
  /** Resource for '/documentClassifiers:authorizeCopy' has methods for the following verbs: post */
  (path: "/documentClassifiers:authorizeCopy"): AuthorizeClassifierCopy;
  /** Resource for '/documentClassifiers/\{classifierId\}:copyTo' has methods for the following verbs: post */
  (
    path: "/documentClassifiers/{classifierId}:copyTo",
    classifierId: string,
  ): CopyClassifierTo;
}

export type DocumentIntelligenceClient = Client & {
  path: Routes;
};

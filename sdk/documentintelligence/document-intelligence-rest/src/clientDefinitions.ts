// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  ListOperationsParameters,
  GetOperationParameters,
  GetDocumentBuildOperationParameters,
  GetResourceInfoParameters,
  GetAnalyzeResultParameters,
  AnalyzeDocumentFromStreamParameters,
  AnalyzeDocumentParameters,
  GetModelParameters,
  DeleteModelParameters,
  BuildDocumentParameters,
  AuthorizeModelCopyParameters,
  ListModelsParameters,
  ListClassifiersParameters,
  GetClassifierParameters,
  DeleteClassifierParameters,
  ClassifyDocumentFromStreamParameters,
  ClassifyDocumentParameters,
  GetClassifyResultParameters,
} from "./parameters";
import {
  ListOperations200Response,
  ListOperationsDefaultResponse,
  GetOperation200Response,
  GetOperationDefaultResponse,
  GetDocumentBuildOperation200Response,
  GetDocumentBuildOperationDefaultResponse,
  GetResourceInfo200Response,
  GetResourceInfoDefaultResponse,
  GetAnalyzeResult200Response,
  GetAnalyzeResultDefaultResponse,
  AnalyzeDocumentFromStream202Response,
  AnalyzeDocumentFromStreamDefaultResponse,
  AnalyzeDocument202Response,
  AnalyzeDocumentDefaultResponse,
  GetModel200Response,
  GetModelDefaultResponse,
  DeleteModel204Response,
  DeleteModelDefaultResponse,
  BuildDocument202Response,
  BuildDocumentDefaultResponse,
  AuthorizeModelCopy200Response,
  AuthorizeModelCopyDefaultResponse,
  ListModels200Response,
  ListModelsDefaultResponse,
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
} from "./responses";
import { Client, StreamableMethod } from "@azure-rest/core-client";

export interface ListOperations {
  /** Lists all operations. */
  get(
    options?: ListOperationsParameters
  ): StreamableMethod<ListOperations200Response | ListOperationsDefaultResponse>;
}

export interface GetOperation {
  /** Gets operation info. */
  get(
    options?: GetOperationParameters
  ): StreamableMethod<GetOperation200Response | GetOperationDefaultResponse>;
  /** Gets operation info. */
  get(
    options?: GetDocumentBuildOperationParameters
  ): StreamableMethod<
    GetDocumentBuildOperation200Response | GetDocumentBuildOperationDefaultResponse
  >;
}

export interface GetResourceInfo {
  /** Return information about the current resource. */
  get(
    options?: GetResourceInfoParameters
  ): StreamableMethod<GetResourceInfo200Response | GetResourceInfoDefaultResponse>;
}

export interface GetAnalyzeResult {
  /** Gets the result of document analysis. */
  get(
    options?: GetAnalyzeResultParameters
  ): StreamableMethod<GetAnalyzeResult200Response | GetAnalyzeResultDefaultResponse>;
}

export interface AnalyzeDocumentFromStream {
  /** Long running RPC operation template */
  post(
    options: AnalyzeDocumentFromStreamParameters
  ): StreamableMethod<
    AnalyzeDocumentFromStream202Response | AnalyzeDocumentFromStreamDefaultResponse
  >;
  /** Long running RPC operation template */
  post(
    options: AnalyzeDocumentParameters
  ): StreamableMethod<AnalyzeDocument202Response | AnalyzeDocumentDefaultResponse>;
}

export interface GetModel {
  /** Gets detailed document model information. */
  get(
    options?: GetModelParameters
  ): StreamableMethod<GetModel200Response | GetModelDefaultResponse>;
  /** Deletes document model. */
  delete(
    options?: DeleteModelParameters
  ): StreamableMethod<DeleteModel204Response | DeleteModelDefaultResponse>;
}

export interface BuildDocument {
  /** Builds a custom document analysis model. */
  post(
    options: BuildDocumentParameters
  ): StreamableMethod<BuildDocument202Response | BuildDocumentDefaultResponse>;
}

export interface AuthorizeModelCopy {
  /**
   * Generates authorization to copy a document model to this location with
   * specified modelId and optional description.
   */
  post(
    options: AuthorizeModelCopyParameters
  ): StreamableMethod<AuthorizeModelCopy200Response | AuthorizeModelCopyDefaultResponse>;
}

export interface ListModels {
  /** List all document models */
  get(
    options?: ListModelsParameters
  ): StreamableMethod<ListModels200Response | ListModelsDefaultResponse>;
}

export interface ListClassifiers {
  /** List all document classifiers. */
  get(
    options?: ListClassifiersParameters
  ): StreamableMethod<ListClassifiers200Response | ListClassifiersDefaultResponse>;
}

export interface GetClassifier {
  /** Gets detailed document classifier information. */
  get(
    options?: GetClassifierParameters
  ): StreamableMethod<GetClassifier200Response | GetClassifierDefaultResponse>;
  /** Deletes document classifier. */
  delete(
    options?: DeleteClassifierParameters
  ): StreamableMethod<DeleteClassifier204Response | DeleteClassifierDefaultResponse>;
}

export interface ClassifyDocumentFromStream {
  /** Classifies document with document classifier. */
  post(
    options: ClassifyDocumentFromStreamParameters
  ): StreamableMethod<
    ClassifyDocumentFromStream202Response | ClassifyDocumentFromStreamDefaultResponse
  >;
  /** Classifies document with document classifier. */
  post(
    options: ClassifyDocumentParameters
  ): StreamableMethod<ClassifyDocument202Response | ClassifyDocumentDefaultResponse>;
}

export interface GetClassifyResult {
  /** Gets the result of document classifier. */
  get(
    options?: GetClassifyResultParameters
  ): StreamableMethod<GetClassifyResult200Response | GetClassifyResultDefaultResponse>;
}

export interface Routes {
  /** Resource for '/operations' has methods for the following verbs: get */
  (path: "/operations"): ListOperations;
  /** Resource for '/operations/\{operationId\}' has methods for the following verbs: get */
  (path: "/operations/{operationId}", operationId: string): GetOperation;
  /** Resource for '/info' has methods for the following verbs: get */
  (path: "/info"): GetResourceInfo;
  /** Resource for '/documentModels/\{modelId\}/analyzeResults/\{resultId\}' has methods for the following verbs: get */
  (
    path: "/documentModels/{modelId}/analyzeResults/{resultId}",
    modelId: string,
    resultId: string
  ): GetAnalyzeResult;
  /** Resource for '/documentModels/\{modelId\}:analyze' has methods for the following verbs: post */
  (path: "/documentModels/{modelId}:analyze", modelId: string): AnalyzeDocumentFromStream;
  /** Resource for '/documentModels/\{modelId\}' has methods for the following verbs: get, delete */
  (path: "/documentModels/{modelId}", modelId: string): GetModel;
  /** Resource for '/documentModels:build' has methods for the following verbs: post */
  (path: "/documentModels:build"): BuildDocument;
  /** Resource for '/documentModels:authorizeCopy' has methods for the following verbs: post */
  (path: "/documentModels:authorizeCopy"): AuthorizeModelCopy;
  /** Resource for '/documentModels' has methods for the following verbs: get */
  (path: "/documentModels"): ListModels;
  /** Resource for '/documentClassifiers' has methods for the following verbs: get */
  (path: "/documentClassifiers"): ListClassifiers;
  /** Resource for '/documentClassifiers/\{classifierId\}' has methods for the following verbs: get, delete */
  (path: "/documentClassifiers/{classifierId}", classifierId: string): GetClassifier;
  /** Resource for '/documentClassifiers/\{classifierId\}:analyze' has methods for the following verbs: post */
  (
    path: "/documentClassifiers/{classifierId}:analyze",
    classifierId: string
  ): ClassifyDocumentFromStream;
  /** Resource for '/documentClassifiers/\{classifierId\}/analyzeResults/\{resultId\}' has methods for the following verbs: get */
  (
    path: "/documentClassifiers/{classifierId}/analyzeResults/{resultId}",
    classifierId: string,
    resultId: string
  ): GetClassifyResult;
}

export type DocumentIntelligenceClient = Client & {
  path: Routes;
};

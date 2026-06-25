// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  DocumentIntelligenceAdministrationContext,
  DocumentIntelligenceAdministrationClientOptionalParams,
  createDocumentIntelligenceAdministration,
} from "./api/index.js";
import {
  BuildDocumentModelRequest,
  DocumentModelDetails,
  DocumentIntelligenceOperationDetailsUnion,
  DocumentClassifierDetails,
  ComposeDocumentModelRequest,
  AuthorizeCopyRequest,
  ModelCopyAuthorization,
  DocumentIntelligenceResourceDetails,
  BuildDocumentClassifierRequest,
  AuthorizeClassifierCopyRequest,
  ClassifierCopyAuthorization,
} from "../models/models.js";
import { PagedAsyncIterableIterator } from "../static-helpers/pagingHelpers.js";
import {
  deleteClassifier,
  listClassifiers,
  getClassifier,
  copyClassifierTo,
  authorizeClassifierCopy,
  buildClassifier,
  listOperations,
  getOperation,
  getResourceDetails,
  deleteModel,
  listModels,
  getModel,
  copyModelTo,
  authorizeModelCopy,
  composeModel,
  buildDocumentModel,
} from "./api/operations.js";
import {
  DeleteClassifierOptionalParams,
  ListClassifiersOptionalParams,
  GetClassifierOptionalParams,
  CopyClassifierToOptionalParams,
  AuthorizeClassifierCopyOptionalParams,
  BuildClassifierOptionalParams,
  ListOperationsOptionalParams,
  GetOperationOptionalParams,
  GetResourceDetailsOptionalParams,
  DeleteModelOptionalParams,
  ListModelsOptionalParams,
  GetModelOptionalParams,
  CopyModelToOptionalParams,
  AuthorizeModelCopyOptionalParams,
  ComposeModelOptionalParams,
  BuildDocumentModelOptionalParams,
} from "./api/options.js";
import { KeyCredential, TokenCredential } from "@azure/core-auth";
import { PollerLike, OperationState } from "@azure/core-lro";
import { Pipeline } from "@azure/core-rest-pipeline";

export type { DocumentIntelligenceAdministrationClientOptionalParams } from "./api/documentIntelligenceAdministrationContext.js";

export class DocumentIntelligenceAdministrationClient {
  private _client: DocumentIntelligenceAdministrationContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  constructor(
    endpointParam: string,
    credential: KeyCredential | TokenCredential,
    options: DocumentIntelligenceAdministrationClientOptionalParams = {},
  ) {
    const prefixFromOptions = options?.userAgentOptions?.userAgentPrefix;
    const userAgentPrefix = prefixFromOptions
      ? `${prefixFromOptions} azsdk-js-client`
      : `azsdk-js-client`;
    this._client = createDocumentIntelligenceAdministration(endpointParam, credential, {
      ...options,
      userAgentOptions: { userAgentPrefix },
    });
    this.pipeline = this._client.pipeline;
  }

  /** Deletes document classifier. */
  deleteClassifier(
    classifierId: string,
    options: DeleteClassifierOptionalParams = { requestOptions: {} },
  ): Promise<void> {
    return deleteClassifier(this._client, classifierId, options);
  }

  /** List all document classifiers. */
  listClassifiers(
    options: ListClassifiersOptionalParams = { requestOptions: {} },
  ): PagedAsyncIterableIterator<DocumentClassifierDetails> {
    return listClassifiers(this._client, options);
  }

  /** Gets detailed document classifier information. */
  getClassifier(
    classifierId: string,
    options: GetClassifierOptionalParams = { requestOptions: {} },
  ): Promise<DocumentClassifierDetails> {
    return getClassifier(this._client, classifierId, options);
  }

  /** Copies document classifier to the target resource, region, and classifierId. */
  copyClassifierTo(
    classifierId: string,
    copyToRequest: ClassifierCopyAuthorization,
    options: CopyClassifierToOptionalParams = { requestOptions: {} },
  ): PollerLike<OperationState<DocumentClassifierDetails>, DocumentClassifierDetails> {
    return copyClassifierTo(this._client, classifierId, copyToRequest, options);
  }

  /**
   * Generates authorization to copy a document classifier to this location with
   * specified classifierId and optional description.
   */
  authorizeClassifierCopy(
    authorizeCopyRequest: AuthorizeClassifierCopyRequest,
    options: AuthorizeClassifierCopyOptionalParams = { requestOptions: {} },
  ): Promise<ClassifierCopyAuthorization> {
    return authorizeClassifierCopy(this._client, authorizeCopyRequest, options);
  }

  /** Builds a custom document classifier. */
  buildClassifier(
    buildRequest: BuildDocumentClassifierRequest,
    options: BuildClassifierOptionalParams = { requestOptions: {} },
  ): PollerLike<OperationState<DocumentClassifierDetails>, DocumentClassifierDetails> {
    return buildClassifier(this._client, buildRequest, options);
  }

  /** Lists all operations. */
  listOperations(
    options: ListOperationsOptionalParams = { requestOptions: {} },
  ): PagedAsyncIterableIterator<DocumentIntelligenceOperationDetailsUnion> {
    return listOperations(this._client, options);
  }

  /** Gets operation info. */
  getOperation(
    operationId: string,
    options: GetOperationOptionalParams = { requestOptions: {} },
  ): Promise<DocumentIntelligenceOperationDetailsUnion> {
    return getOperation(this._client, operationId, options);
  }

  /** Return information about the current resource. */
  getResourceDetails(
    options: GetResourceDetailsOptionalParams = { requestOptions: {} },
  ): Promise<DocumentIntelligenceResourceDetails> {
    return getResourceDetails(this._client, options);
  }

  /** Deletes document model. */
  deleteModel(
    modelId: string,
    options: DeleteModelOptionalParams = { requestOptions: {} },
  ): Promise<void> {
    return deleteModel(this._client, modelId, options);
  }

  /** List all document models */
  listModels(
    options: ListModelsOptionalParams = { requestOptions: {} },
  ): PagedAsyncIterableIterator<DocumentModelDetails> {
    return listModels(this._client, options);
  }

  /** Gets detailed document model information. */
  getModel(
    modelId: string,
    options: GetModelOptionalParams = { requestOptions: {} },
  ): Promise<DocumentModelDetails> {
    return getModel(this._client, modelId, options);
  }

  /** Copies document model to the target resource, region, and modelId. */
  copyModelTo(
    modelId: string,
    copyToRequest: ModelCopyAuthorization,
    options: CopyModelToOptionalParams = { requestOptions: {} },
  ): PollerLike<OperationState<DocumentModelDetails>, DocumentModelDetails> {
    return copyModelTo(this._client, modelId, copyToRequest, options);
  }

  /**
   * Generates authorization to copy a document model to this location with
   * specified modelId and optional description.
   */
  authorizeModelCopy(
    authorizeCopyRequest: AuthorizeCopyRequest,
    options: AuthorizeModelCopyOptionalParams = { requestOptions: {} },
  ): Promise<ModelCopyAuthorization> {
    return authorizeModelCopy(this._client, authorizeCopyRequest, options);
  }

  /** Creates a new document model from document types of existing document models. */
  composeModel(
    composeRequest: ComposeDocumentModelRequest,
    options: ComposeModelOptionalParams = { requestOptions: {} },
  ): PollerLike<OperationState<DocumentModelDetails>, DocumentModelDetails> {
    return composeModel(this._client, composeRequest, options);
  }

  /** Builds a custom document analysis model. */
  buildDocumentModel(
    buildRequest: BuildDocumentModelRequest,
    options: BuildDocumentModelOptionalParams = { requestOptions: {} },
  ): PollerLike<OperationState<DocumentModelDetails>, DocumentModelDetails> {
    return buildDocumentModel(this._client, buildRequest, options);
  }
}

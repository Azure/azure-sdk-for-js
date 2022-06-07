// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { KeyCredential, TokenCredential } from "@azure/core-auth";
import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { TracingClient, createTracingClient } from "@azure/core-tracing";
import { __decorate } from "tslib";
import { SDK_VERSION } from "./constants";
import {
  CopyAuthorization,
  GeneratedClient,
  GetInfoResponse,
  GetOperationResponse,
  ModelInfo,
  ModelSummary,
  OperationInfo,
} from "./generated";
import { accept1 } from "./generated/models/parameters";
import {
  TrainingOperationDefinition,
  TrainingPollOperationState,
  TrainingPoller,
  toTrainingPollOperationState,
} from "./lro/training";
import { lro } from "./lro/util/poller";
import {
  BuildModelOptions,
  CopyModelOptions,
  DeleteModelOptions,
  DocumentModelAdministrationClientOptions,
  GetCopyAuthorizationOptions,
  GetInfoOptions,
  GetModelOptions,
  GetOperationOptions,
  ListModelsOptions,
  ListOperationsOptions,
} from "./options";
import { DocumentModelBuildMode } from "./options/BuildModelOptions";
import { Mappers, SERIALIZER, makeServiceClient } from "./util";

/**
 * A client for interacting with the Form Recognizer service's model management features, such as creating, reading,
 * listing, deleting, and copying models.
 *
 * ### Examples:
 *
 * #### Azure Active Directory
 *
 * ```typescript
 * import { DocumentModelAdministrationClient } from "@azure/ai-form-recognizer";
 * import { DefaultAzureCredential } from "@azure/identity";
 *
 * const endpoint = "https://<resource name>.cognitiveservices.azure.com";
 * const credential = new DefaultAzureCredential();
 *
 * const client = new DocumentModelAdministrationClient(endpoint, credential);
 * ```
 *
 * #### API Key (Subscription Key)
 *
 * ```typescript
 * import { DocumentModelAdministrationClient, AzureKeyCredential } from "@azure/ai-form-recognizer";
 *
 * const endpoint = "https://<resource name>.cognitiveservices.azure.com";
 * const credential = new AzureKeyCredential("<api key>");
 *
 * const client = new DocumentModelAdministrationClient(endpoint, credential);
 * ```
 */
export class DocumentModelAdministrationClient {
  private _restClient: GeneratedClient;
  private _tracing: TracingClient;

  /**
   * Create a DocumentModelAdministrationClient instance from a resource endpoint and a an Azure Identity `TokenCredential`.
   *
   * See the [`@azure/identity`](https://npmjs.com/package/\@azure/identity) package for more information about
   * authenticating with Azure Active Directory.
   *
   * ### Example:
   *
   * ```javascript
   * import { DocumentModelAdministrationClient } from "@azure/ai-form-recognizer";
   * import { DefaultAzureCredential } from "@azure/identity";
   *
   * const endpoint = "https://<resource name>.cognitiveservices.azure.com";
   * const credential = new DefaultAzureCredential();
   *
   * const client = new DocumentModelAdministrationClient(endpoint, credential);
   * ```
   *
   * @param endpoint - the endpoint URL of an Azure Cognitive Services instance
   * @param credential - a TokenCredential instance from the `@azure/identity` package
   * @param options - optional settings for configuring all methods in the client
   */
  public constructor(
    endpoint: string,
    credential: TokenCredential,
    options?: DocumentModelAdministrationClientOptions
  );
  /**
   * Create a DocumentModelAdministrationClient instance from a resource endpoint and a static API key
   * (`KeyCredential`),
   *
   * ### Example:
   *
   * ```javascript
   * import { DocumentModelAdministrationClient, AzureKeyCredential } from "@azure/ai-form-recognizer";
   *
   * const endpoint = "https://<resource name>.cognitiveservices.azure.com";
   * const credential = new AzureKeyCredential("<api key>");
   *
   * const client = new DocumentModelAdministrationClient(endpoint, credential);
   * ```
   *
   * @param endpoint - the endpoint URL of an Azure Cognitive Services instance
   * @param credential - a KeyCredential containing the Cognitive Services instance subscription key
   * @param options - optional settings for configuring all methods in the client
   */
  public constructor(
    endpoint: string,
    credential: KeyCredential,
    options?: DocumentModelAdministrationClientOptions
  );
  /**
   * @hidden
   */
  public constructor(
    endpoint: string,
    credential: KeyCredential | TokenCredential,
    options?: DocumentModelAdministrationClientOptions
  );
  public constructor(
    endpoint: string,
    credential: KeyCredential | TokenCredential,
    options: DocumentModelAdministrationClientOptions = {}
  ) {
    this._restClient = makeServiceClient(endpoint, credential, options);
    this._tracing = createTracingClient({
      packageName: "@azure/ai-form-recognizer",
      packageVersion: SDK_VERSION,
      namespace: "Microsoft.CognitiveServices",
    });
  }

  // #region Model Creation

  /**
   * Build a new model with a given ID from a set of input documents and labeled fields.
   *
   * The Model ID can consist of any text, so long as it does not begin with "prebuilt-" (as these models refer to
   * prebuilt Form Recognizer models that are common to all resources), and so long as it does not already exist within
   * the resource.
   *
   * The Form Recognizer service reads the training data set from an Azure Storage container, given as a URL to the
   * container with a SAS token that allows the service backend to communicate with the container. At a minimum, the
   * "read" and "list" permissions are required. In addition, the data in the given container must be organized
   * according to a particular convention, which is documented in [the service's documentation for building custom
   * models](https://aka.ms/form-recognizer/custom).
   *
   * ### Example
   *
   * ```javascript
   * const modelId = "aNewModel";
   * const containerUrl = "<training data container SAS URL>";
   *
   * const poller = await client.beginBuildModel(modelId, containerUrl, {
   *   // Optionally, a text description may be attached to the model
   *   description: "This is an example model!"
   * });
   *
   * // Model building, like all other model creation operations, returns a poller that eventually produces a ModelInfo
   * // object
   * const modelInfo = await poller.pollUntilDone();
   *
   * const {
   *   modelId, // identical to the modelId given when creating the model
   *   description, // identical to the description given when creating the model
   *   createdDateTime, // the Date (timestamp) that the model was created
   *   docTypes // information about the document types in the model and their field schemas
   * } = modelInfo;
   * ```
   *
   * @param modelId - the unique ID of the model to create
   * @param containerUrl - SAS-encoded URL to an Azure Storage container holding the training data set
   * @param buildMode - the mode to use when building the model (see `DocumentModelBuildMode`)
   * @param options - optional settings for the model build operation
   * @returns a long-running operation (poller) that will eventually produce the created model information or an error
   */
  public async beginBuildModel(
    modelId: string,
    containerUrl: string,
    buildMode: DocumentModelBuildMode,
    options: BuildModelOptions = {}
  ): Promise<TrainingPoller> {
    return this._tracing.withSpan(
      "DocumentModelAdministrationClient.beginBuildModel",
      options,
      (finalOptions) =>
        this.createTrainingPoller({
          options: finalOptions,
          start: () =>
            this._restClient.buildDocumentModel(
              {
                modelId,
                description: finalOptions.description,
                azureBlobSource: {
                  containerUrl,
                },
                buildMode,
              },
              finalOptions
            ),
        })
    );
  }

  /**
   * Creates a single composed model from several pre-existing submodels.
   *
   * The resulting composed model combines the document types of its component models, and inserts a classification step
   * into the extraction pipeline to determine which of its component submodels is most appropriate for the given input.
   *
   * ### Example
   *
   * ```javascript
   * const modelId = "aNewComposedModel";
   * const subModelIds = [
   *   "documentType1Model",
   *   "documentType2Model",
   *   "documentType3Model"
   * ];
   *
   * // The resulting composed model can classify and extract data from documents
   * // conforming to any of the above document types
   * const poller = await client.beginComposeModel(modelId, subModelIds, {
   *   description: "This is a composed model that can handle several document types."
   * });
   *
   * // Model composition, like all other model creation operations, returns a poller that eventually produces a
   * // ModelInfo object
   * const modelInfo = await poller.pollUntilDone();
   *
   * const {
   *   modelId, // identical to the modelId given when creating the model
   *   description, // identical to the description given when creating the model
   *   createdDateTime, // the Date (timestamp) that the model was created
   *   docTypes // information about the document types of the composed submodels
   * } = modelInfo;
   * ```
   *
   * @param modelId - the unique ID of the model to create
   * @param componentModelIds - an Iterable of strings representing the unique model IDs of the models to compose
   * @param options - optional settings for model creation
   * @returns a long-running operation (poller) that will eventually produce the created model information or an error
   */
  public async beginComposeModel(
    modelId: string,
    componentModelIds: Iterable<string>,
    options: BuildModelOptions = {}
  ): Promise<TrainingPoller> {
    return this._tracing.withSpan(
      "DocumentModelAdministrationClient.beginComposeModel",
      options,
      (finalOptions) =>
        this.createTrainingPoller({
          options: finalOptions,
          start: () =>
            this._restClient.composeDocumentModel(
              {
                modelId,
                componentModels: [...componentModelIds].map((submodelId) => ({
                  modelId: submodelId,
                })),
                description: finalOptions.description,
                tags: finalOptions.tags,
              },
              finalOptions
            ),
        })
    );
  }

  /**
   * Creates an authorization to copy a model into the resource, used with the `beginCopyModelTo` method.
   *
   * The `CopyAuthorization` grants another cognitive service resource the right to create a model in this client's
   * resource with the model ID and optional description that are encoded into the authorization.
   *
   * ### Example
   *
   * ```javascript
   * // The copyAuthorization data structure stored below grants any cognitive services resource the right to copy a
   * // model into the client's resource with the given destination model ID.
   * const copyAuthorization = await client.getCopyAuthorization("<destination model ID>");
   * ```
   *
   * @param destinationModelId - the unique ID of the destination model (the ID to copy the model into)
   * @param options - optional settings for creating the copy authorization
   * @returns a copy authorization that encodes the given modelId and optional description
   */
  public async getCopyAuthorization(
    destinationModelId: string,
    options: GetCopyAuthorizationOptions = {}
  ): Promise<CopyAuthorization> {
    return this._tracing.withSpan(
      "DocumentModelAdministrationClient.getCopyAuthorization",
      options,
      (finalOptions) =>
        this._restClient.authorizeCopyDocumentModel(
          {
            modelId: destinationModelId,
            description: finalOptions.description,
            tags: finalOptions.tags,
          },
          finalOptions
        )
    );
  }

  /**
   * Copies a model with the given ID into the resource and model ID encoded by a given copy authorization.
   *
   * See {@link CopyAuthorization} and {@link getCopyAuthorization}.
   *
   * ### Example
   *
   * ```javascript
   * // We need a client for the source model's resource
   * const sourceEndpoint = "https://<source resource name>.cognitiveservices.azure.com";
   * const sourceCredential = new AzureKeyCredential("<source api key>");
   * const sourceClient = new DocumentModelAdministrationClient(sourceEndpoint, sourceCredential);
   *
   * // We create the copy authorization using a client authenticated with the destination resource. Note that these two
   * // resources can be the same (you can copy a model to a new ID in the same resource).
   * const copyAuthorization = await client.getCopyAuthorization("<destination model ID>");
   *
   * // Finally, use the _source_ client to copy the model and await the copy operation
   * const poller = await sourceClient.beginCopyModelTo("<source model ID>");
   *
   * // Model copying, like all other model creation operations, returns a poller that eventually produces a ModelInfo
   * // object
   * const modelInfo = await poller.pollUntilDone();
   *
   * const {
   *   modelId, // identical to the modelId given when creating the copy authorization
   *   description, // identical to the description given when creating the copy authorization
   *   createdDateTime, // the Date (timestamp) that the model was created
   *   docTypes // information about the document types of the model (identical to the original, source model)
   * } = modelInfo;
   * ```
   *
   * @param sourceModelId - the unique ID of the source model that will be copied
   * @param authorization - an authorization to copy the model, created using the {@link getCopyAuthorization}
   * @param options - optional settings for
   * @returns a long-running operation (poller) that will eventually produce the copied model information or an error
   */
  public async beginCopyModelTo(
    sourceModelId: string,
    authorization: CopyAuthorization,
    options: CopyModelOptions = {}
  ): Promise<TrainingPoller> {
    return this._tracing.withSpan(
      "DocumentModelAdministrationClient.beginCopyModel",
      options,
      (finalOptions) =>
        this.createTrainingPoller({
          options: finalOptions,
          start: () =>
            this._restClient.copyDocumentModelTo(sourceModelId, authorization, finalOptions),
        })
    );
  }

  /**
   * Create an LRO poller that handles training operations.
   *
   * This is the meat of all training polling operations.
   *
   * @param definition - operation definition (start operation method, request options)
   * @returns a training poller that produces a ModelInfo
   */
  private async createTrainingPoller(
    definition: TrainingOperationDefinition
  ): Promise<TrainingPoller> {
    const { resumeFrom } = definition.options;

    const toInit =
      resumeFrom === undefined
        ? () =>
            this._tracing.withSpan(
              "DocumentModelAdministrationClient.createTrainingPoller-start",
              definition.options,
              async (options) => {
                const { operationLocation } = await definition.start();

                if (operationLocation === undefined) {
                  throw new Error(
                    "Unable to start model creation operation: no Operation-Location received."
                  );
                }

                return this._restClient.sendOperationRequest(
                  {
                    options,
                  },
                  {
                    path: operationLocation,
                    httpMethod: "GET",
                    responses: {
                      200: {
                        bodyMapper: Mappers.GetOperationResponse,
                      },
                      default: {
                        bodyMapper: Mappers.ErrorResponse,
                      },
                    },
                    headerParameters: [accept1],
                    serializer: SERIALIZER,
                  }
                ) as Promise<GetOperationResponse>;
              }
            )
        : () =>
            this._tracing.withSpan(
              "DocumentModelAdministrationClient.createTrainingPoller-resume",
              definition.options,
              (options) => {
                const { operationId } = JSON.parse(resumeFrom) as { operationId: string };

                return this._restClient.getOperation(operationId, options);
              }
            );

    const poller = await lro<ModelInfo, TrainingPollOperationState>(
      {
        init: async () => toTrainingPollOperationState(await toInit()),
        poll: async ({ operationId }) =>
          this._tracing.withSpan(
            "DocumentModelAdminstrationClient.createTrainingPoller-poll",
            definition.options,
            async (options) => {
              const res = await this._restClient.getOperation(operationId, options);

              return toTrainingPollOperationState(res);
            }
          ),
        serialize: ({ operationId }) => JSON.stringify({ operationId }),
      },
      definition.options.updateIntervalInMs
    );

    if (definition.options.onProgress !== undefined) {
      poller.onProgress(definition.options.onProgress);
      definition.options.onProgress(poller.getOperationState());
    }

    return poller;
  }

  // #endregion

  // #region Model Management

  /**
   * Retrieve basic information about this client's resource.
   *
   * ### Example
   *
   * ```javascript
   * const {
   *   // Information about the custom models in the current resource
   *   customDocumentModelInfo: {
   *     // The number of custom models in the current resource
   *     count,
   *     // The maximum number of models that the current resource can support
   *     limit
   *   }
   * } = await client.getInfo();
   * ```
   *
   * @param options - optional settings for the request
   * @returns basic information about this client's resource
   */
  public getInfo(options: GetInfoOptions = {}): Promise<GetInfoResponse> {
    return this._tracing.withSpan(
      "DocumentModelAdministrationClient.getInfo",
      options,
      (finalOptions) => this._restClient.getInfo(finalOptions)
    );
  }

  /**
   * Retrieves information about a model ({@link ModelInfo}) by ID.
   *
   * This method can retrieve information about custom as well as prebuilt models.
   *
   * ### **Breaking Change**
   *
   * In previous versions of the Form Recognizer REST API and SDK, the `getModel` method could return any model, even
   * one that failed to create due to errors. In the new service versions, `getModel` and `listModels` _only produce
   * successfully created models_ (i.e. models that are "ready" for use). Failed models are now retrieved through the
   * "operations" APIs, see {@link getOperation} and {@link listOperations}.
   *
   * ### Example
   *
   * ```javascript
   * // The ID of the prebuilt business card model
   * const modelId = "prebuilt-businessCard";
   *
   * const {
   *   modelId, // identical to the modelId given when calling `getModel`
   *   description, // a textual description of the model, if provided during model creation
   *   createdDateTime, // the Date (timestamp) that the model was created
   *   // information about the document types in the model and their field schemas
   *   docTypes: {
   *     // the document type of the prebuilt business card model
   *     "prebuilt:businesscard": {
   *       // an optional, textual description of this document type
   *       description,
   *       // the schema of the fields in this document type, see the FieldSchema type
   *       fieldSchema,
   *       // the service's confidences in the fields (an object with field names as properties and numeric confidence
   *       // values)
   *       fieldConfidence
   *     }
   *   }
   * } = await client.getModel(modelId);
   * ```
   *
   * @param modelId - the unique ID of the model to query
   * @param options - optional settings for the request
   * @returns information about the model with the given ID
   */
  public getModel(modelId: string, options: GetModelOptions = {}): Promise<ModelInfo> {
    return this._tracing.withSpan(
      "DocumentModelAdministrationClient.getModel",
      options,
      (finalOptions) => this._restClient.getModel(modelId, finalOptions)
    );
  }

  /**
   * List summaries of models in the resource. Custom as well as prebuilt models will be included. This operation
   * supports paging.
   *
   * The model summary ({@link ModelSummary}) includes only the basic information about the model, and does not include
   * information about the document types in the model (such as the field schemas and confidence values).
   *
   * To access the full information about the model, use {@link getModel}.
   *
   * ### **Breaking Change**
   *
   * In previous versions of the Form Recognizer REST API and SDK, the `listModels` method would return all models, even
   * those that failed to create due to errors. In the new service versions, `listModels` and `getModels` _only produce
   * successfully created models_ (i.e. models that are "ready" for use). Failed models are now retrieved through the
   * "operations" APIs, see {@link getOperation} and {@link listOperations}.
   *
   * ### Examples
   *
   * #### Async Iteration
   *
   * ```javascript
   * for await (const summary of client.listModels()) {
   *   const {
   *     modelId, // The model's unique ID
   *     description, // a textual description of the model, if provided during model creation
   *   } = summary;
   *
   *   // You can get the full model info using `getModel`
   *   const model = await client.getModel(modelId);
   * }
   * ```
   *
   * #### By Page
   *
   * ```javascript
   * // The listModels method is paged, and you can iterate by page using the `byPage` method.
   * const pages = client.listModels().byPage();
   *
   * for await (const page of pages) {
   *   // Each page is an array of models and can be iterated synchronously
   *   for (const model of page) {
   *     const {
   *       modelId, // The model's unique ID
   *       description, // a textual description of the model, if provided during model creation
   *     } = summary;
   *
   *     // You can get the full model info using `getModel`
   *     const model = await client.getModel(modelId);
   *   }
   * }
   * ```
   *
   * @param options - optional settings for the model requests
   * @returns an async iterable of model summaries that supports paging
   */
  public listModels(options: ListModelsOptions = {}): PagedAsyncIterableIterator<ModelSummary> {
    return this._restClient.listModels(options);
  }

  /**
   * Retrieves information about an operation (`OperationInfo`) by its ID.
   *
   * Operations represent non-analysis tasks, such as building, composing, or copying a model.
   *
   * @param operationId - the ID of the operation to query
   * @param options - optional settings for the request
   * @returns information about the operation with the given ID
   *
   * ### Example
   *
   * ```javascript
   * // The ID of the operation, which should be a GUID
   * const operationId = "<operation GUID>";
   *
   * const {
   *   operationId, // identical to the operationId given when calling `getOperation`
   *   kind, // the operation kind, one of "documentModelBuild", "documentModelCompose", or "documentModelCopyTo"
   *   status, // the status of the operation, one of "notStarted", "running", "failed", "succeeded", or "canceled"
   *   percentCompleted, // a number between 0 and 100 representing the progress of the operation
   *   createdDateTime, // a Date object that reflects the time when the operation was started
   *   lastUpdatedDateTime, // a Date object that reflects the time when the operation state was last modified
   * } = await client.getOperation(operationId);
   * ```
   */
  public getOperation(
    operationId: string,
    options: GetOperationOptions = {}
  ): Promise<OperationInfo> {
    return this._tracing.withSpan(
      "DocumentModelAdministrationClient.getOperation",
      options,
      (finalOptions) => this._restClient.getOperation(operationId, finalOptions)
    );
  }

  /**
   * List model creation operations in the resource. This will produce all operations, including operations that failed
   * to create models successfully. This operation supports paging.
   *
   * ### Examples
   *
   * #### Async Iteration
   *
   * ```javascript
   * for await (const operation of client.listOperations()) {
   *   const {
   *     operationId, // the operation's GUID
   *     status, // the operation status, one of "notStarted", "running", "succeeded", "failed", or "canceled"
   *     percentCompleted // the progress of the operation, from 0 to 100
   *   } = operation;
   * }
   * ```
   *
   * #### By Page
   *
   * ```javascript
   * // The listOperations method is paged, and you can iterate by page using the `byPage` method.
   * const pages = client.listOperations().byPage();
   *
   * for await (const page of pages) {
   *   // Each page is an array of operation info objects and can be iterated synchronously
   *   for (const operation of page) {
   *     const {
   *       operationId, // the operation's GUID
   *       status, // the operation status, one of "notStarted", "running", "succeeded", "failed", or "canceled"
   *       percentCompleted // the progress of the operation, from 0 to 100
   *     } = operation;
   *   }
   * }
   * ```
   *
   * @param options - optional settings for the operation requests
   * @returns an async iterable of operation information objects that supports paging
   */
  public listOperations(
    options: ListOperationsOptions = {}
  ): PagedAsyncIterableIterator<OperationInfo> {
    return this._restClient.listOperations(options);
  }

  /**
   * Deletes a model with the given ID from the client's resource, if it exists. This operation CANNOT be reverted.
   *
   * ### Example
   *
   * ```javascript
   * await client.deleteModel("<model ID to delete>"));
   * ```
   *
   * @param modelId - the unique ID of the model to delete from the resource
   * @param options - optional settings for the request
   */
  public deleteModel(modelId: string, options: DeleteModelOptions = {}): Promise<void> {
    return this._tracing.withSpan(
      "DocumentModelAdministrationClient.deleteModel",
      options,
      (finalOptions) => this._restClient.deleteModel(modelId, finalOptions)
    );
  }

  // #endregion
}

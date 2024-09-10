// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { KeyCredential, TokenCredential } from "@azure/core-auth";
import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { TracingClient, createTracingClient } from "@azure/core-tracing";
import { SDK_VERSION } from "./constants";
import {
  CopyAuthorization,
  GeneratedClient,
  ResourceDetails,
  DocumentModelDetails,
  DocumentModelSummary,
  OperationSummary,
  OperationDetails,
  DocumentClassifierDetails,
} from "./generated";
import { accept1 } from "./generated/models/parameters";
import {
  TrainingOperationDefinition,
  DocumentModelOperationState,
  DocumentModelPoller,
  toTrainingPollOperationState,
  DocumentModelBuildResponse,
  AdministrationOperationState,
  DocumentClassifierPoller,
  DocumentClassifierOperationState,
} from "./lro/administration";
import { OperationContext, lro } from "./lro/util/poller";
import {
  BeginCopyModelOptions,
  DeleteDocumentModelOptions,
  DocumentModelAdministrationClientOptions,
  GetCopyAuthorizationOptions,
  GetResourceDetailsOptions,
  GetModelOptions,
  GetOperationOptions,
  ListModelsOptions,
  ListOperationsOptions,
  PollerOptions,
} from "./options";
import { BeginBuildDocumentClassifierOptions } from "./options/BuildDocumentClassifierOptions";
import {
  BeginBuildDocumentModelOptions,
  BeginComposeDocumentModelOptions,
  DocumentModelBuildMode,
} from "./options/BuildModelOptions";
import { Mappers, SERIALIZER, makeServiceClient } from "./util";
import { FullOperationResponse, OperationOptions } from "@azure/core-client";
import {
  DocumentModelSource,
  DocumentClassifierDocumentTypeSources,
  AzureBlobSource,
} from "./models";

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
    options?: DocumentModelAdministrationClientOptions,
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
    options?: DocumentModelAdministrationClientOptions,
  );
  /**
   * @hidden
   */
  public constructor(
    endpoint: string,
    credential: KeyCredential | TokenCredential,
    options?: DocumentModelAdministrationClientOptions,
  );
  public constructor(
    endpoint: string,
    credential: KeyCredential | TokenCredential,
    options: DocumentModelAdministrationClientOptions = {},
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
   * const poller = await client.beginBuildDocumentModel(modelId, containerUrl, {
   *   // Optionally, a text description may be attached to the model
   *   description: "This is an example model!"
   * });
   *
   * // Model building, like all other model creation operations, returns a poller that eventually produces a ModelDetails
   * // object
   * const modelDetails = await poller.pollUntilDone();
   *
   * const {
   *   modelId, // identical to the modelId given when creating the model
   *   description, // identical to the description given when creating the model
   *   createdOn, // the Date (timestamp) that the model was created
   *   docTypes // information about the document types in the model and their field schemas
   * } = modelDetails;
   * ```
   *
   * @param modelId - the unique ID of the model to create
   * @param containerUrl - SAS-encoded URL to an Azure Storage container holding the training data set
   * @param buildMode - the mode to use when building the model (see `DocumentModelBuildMode`)
   * @param options - optional settings for the model build operation
   * @returns a long-running operation (poller) that will eventually produce the created model information or an error
   */
  public async beginBuildDocumentModel(
    modelId: string,
    containerUrl: string,
    buildMode: DocumentModelBuildMode,
    options?: BeginBuildDocumentModelOptions,
  ): Promise<DocumentModelPoller>;

  /**
   * Build a new model with a given ID from a model content source.
   *
   * The Model ID can consist of any text, so long as it does not begin with "prebuilt-" (as these models refer to
   * prebuilt Form Recognizer models that are common to all resources), and so long as it does not already exist within
   * the resource.
   *
   * The content source describes the mechanism the service will use to read the input training data. See the
   * {@link DocumentModelContentSource} type for more information.
   *
   * ### Example
   *
   * ```javascript
   * const modelId = "aNewModel";
   *
   * const poller = await client.beginBuildDocumentModel(modelId, { containerUrl: "<SAS-encoded blob container URL>" }, {
   *   // Optionally, a text description may be attached to the model
   *   description: "This is an example model!"
   * });
   *
   * // Model building, like all other model creation operations, returns a poller that eventually produces a ModelDetails
   * // object
   * const modelDetails = await poller.pollUntilDone();
   *
   * const {
   *   modelId, // identical to the modelId given when creating the model
   *   description, // identical to the description given when creating the model
   *   createdOn, // the Date (timestamp) that the model was created
   *   docTypes // information about the document types in the model and their field schemas
   * } = modelDetails;
   * ```
   *
   * @param modelId - the unique ID of the model to create
   * @param contentSource - a content source that provides the training data for this model
   * @param buildMode - the mode to use when building the model (see `DocumentModelBuildMode`)
   * @param options - optional settings for the model build operation
   * @returns a long-running operation (poller) that will eventually produce the created model information or an error
   */
  public async beginBuildDocumentModel(
    modelId: string,
    contentSource: DocumentModelSource,
    buildMode: DocumentModelBuildMode,
    options?: BeginBuildDocumentModelOptions,
  ): Promise<DocumentModelPoller>;

  public async beginBuildDocumentModel(
    modelId: string,
    urlOrSource: string | DocumentModelSource,
    buildMode: DocumentModelBuildMode,
    options: BeginBuildDocumentModelOptions = {},
  ): Promise<DocumentModelPoller> {
    const sourceInfo =
      typeof urlOrSource === "string"
        ? ({
            azureBlobSource: {
              containerUrl: urlOrSource,
            },
          } as AzureBlobSource)
        : urlOrSource;

    return this._tracing.withSpan(
      "DocumentModelAdministrationClient.beginBuildDocumentModel",
      options,
      (finalOptions) =>
        this.createAdministrationPoller({
          options: finalOptions,
          start: (ctx) =>
            this._restClient.documentModels.buildModel(
              {
                modelId,
                description: finalOptions.description,
                ...sourceInfo,
                buildMode,
              },
              {
                ...finalOptions,
                abortSignal: ctx.abortSignal,
              },
            ),
        }),
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
   * const poller = await client.beginComposeDocumentModel(modelId, subModelIds, {
   *   description: "This is a composed model that can handle several document types."
   * });
   *
   * // Model composition, like all other model creation operations, returns a poller that eventually produces a
   * // ModelDetails object
   * const modelDetails = await poller.pollUntilDone();
   *
   * const {
   *   modelId, // identical to the modelId given when creating the model
   *   description, // identical to the description given when creating the model
   *   createdOn, // the Date (timestamp) that the model was created
   *   docTypes // information about the document types of the composed submodels
   * } = modelDetails;
   * ```
   *
   * @param modelId - the unique ID of the model to create
   * @param componentModelIds - an Iterable of strings representing the unique model IDs of the models to compose
   * @param options - optional settings for model creation
   * @returns a long-running operation (poller) that will eventually produce the created model information or an error
   */
  public async beginComposeDocumentModel(
    modelId: string,
    componentModelIds: Iterable<string>,
    options: BeginComposeDocumentModelOptions = {},
  ): Promise<DocumentModelPoller> {
    return this._tracing.withSpan(
      "DocumentModelAdministrationClient.beginComposeDocumentModel",
      options,
      (finalOptions) =>
        this.createAdministrationPoller({
          options: finalOptions,
          start: (ctx) =>
            this._restClient.documentModels.composeModel(
              {
                modelId,
                componentModels: [...componentModelIds].map((submodelId) => ({
                  modelId: submodelId,
                })),
                description: finalOptions.description,
                tags: finalOptions.tags,
              },
              {
                ...finalOptions,
                abortSignal: ctx.abortSignal,
              },
            ),
        }),
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
    options: GetCopyAuthorizationOptions = {},
  ): Promise<CopyAuthorization> {
    return this._tracing.withSpan(
      "DocumentModelAdministrationClient.getCopyAuthorization",
      options,
      (finalOptions) =>
        this._restClient.documentModels.authorizeModelCopy(
          {
            modelId: destinationModelId,
            description: finalOptions.description,
            tags: finalOptions.tags,
          },
          finalOptions,
        ),
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
   * // Model copying, like all other model creation operations, returns a poller that eventually produces a ModelDetails
   * // object
   * const modelDetails = await poller.pollUntilDone();
   *
   * const {
   *   modelId, // identical to the modelId given when creating the copy authorization
   *   description, // identical to the description given when creating the copy authorization
   *   createdOn, // the Date (timestamp) that the model was created
   *   docTypes // information about the document types of the model (identical to the original, source model)
   * } = modelDetails;
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
    options: BeginCopyModelOptions = {},
  ): Promise<DocumentModelPoller> {
    return this._tracing.withSpan(
      "DocumentModelAdministrationClient.beginCopyModel",
      options,
      (finalOptions) =>
        this.createAdministrationPoller({
          options: finalOptions,
          start: () =>
            this._restClient.documentModels.copyModelTo(sourceModelId, authorization, finalOptions),
        }),
    );
  }

  // #endregion

  // #region Document Classifiers

  /**
   * Build a new document classifier with the given classifier ID and document types.
   *
   * The classifier ID must be unique among classifiers within the resource.
   *
   * The document types are given as an object that maps the name of the document type to the training data set for that
   * document type. Two training data input methods are supported:
   *
   * - `azureBlobSource`, which trains a classifier using the data in the given Azure Blob Storage container.
   * - `azureBlobFileListSource`, which is similar to `azureBlobSource` but allows for more fine-grained control over
   *   the files that are included in the training data set by using a JSONL-formatted file list.
   *
   * The Form Recognizer service reads the training data set from an Azure Storage container, given as a URL to the
   * container with a SAS token that allows the service backend to communicate with the container. At a minimum, the
   * "read" and "list" permissions are required. In addition, the data in the given container must be organized
   * according to a particular convention, which is documented in [the service's documentation for building custom
   * document classifiers](https://aka.ms/azsdk/formrecognizer/buildclassifiermodel).
   *
   * ### Example
   *
   * ```javascript
   * const classifierId = "aNewClassifier";
   * const containerUrl1 = "<training data container SAS URL 1>";
   * const containerUrl2 = "<training data container SAS URL 2>";
   *
   * const poller = await client.beginBuildDocumentClassifier(
   *   classifierId,
   *   {
   *     // The document types. Each entry in this object should map a document type name to a
   *     // `ClassifierDocumentTypeDetails` object
   *     "formX": {
   *       azureBlobSource: {
   *         containerUrl: containerUrl1,
   *       }
   *     },
   *     "formY": {
   *       azureBlobFileListSource: {
   *         containerUrl: containerUrl2,
   *         fileList: "path/to/fileList.jsonl"
   *       }
   *     },
   *   },
   *   {
   *     // Optionally, a text description may be attached to the classifier
   *     description: "This is an example classifier!"
   *   }
   * );
   *
   * // Classifier building, like model creation operations, returns a poller that eventually produces a
   * // DocumentClassifierDetails object
   * const classifierDetails = await poller.pollUntilDone();
   *
   * const {
   *   classifierId, // identical to the classifierId given when creating the classifier
   *   description, // identical to the description given when creating the classifier (if any)
   *   createdOn, // the Date (timestamp) that the classifier was created
   *   docTypes // information about the document types in the classifier and their details
   * } = classifierDetails;
   * ```
   *
   * @param classifierId - the unique ID of the classifier to create
   * @param docTypeSources - the document types to include in the classifier and their sources (a map of document type
   *                         names to `ClassifierDocumentTypeDetails`)
   * @param options - optional settings for the classifier build operation
   * @returns a long-running operation (poller) that will eventually produce the created classifier details or an error
   */
  public async beginBuildDocumentClassifier(
    classifierId: string,
    docTypeSources: DocumentClassifierDocumentTypeSources,
    options: BeginBuildDocumentClassifierOptions = {},
  ): Promise<DocumentClassifierPoller> {
    return this._tracing.withSpan(
      "DocumentModelAdministrationClient.beginBuildDocumentClassifier",
      options,
      (finalOptions) =>
        this.createAdministrationPoller<DocumentClassifierOperationState>({
          options: finalOptions,
          start: () =>
            this._restClient.documentClassifiers.buildClassifier(
              {
                classifierId,
                description: finalOptions.description,
                docTypes: docTypeSources,
              },
              finalOptions,
            ),
        }),
    );
  }

  // #endregion

  /**
   * Create an LRO poller that handles model creation operations.
   *
   * This is the meat of the above model creation operations.
   *
   * @param definition - operation definition (start operation method, request options)
   * @returns a model poller (produces a ModelDetails)
   */
  private async createAdministrationPoller<State extends AdministrationOperationState>(
    definition: TrainingOperationDefinition<State>,
  ): Promise<
    State extends DocumentModelOperationState ? DocumentModelPoller : DocumentClassifierPoller
  > {
    const { resumeFrom } = definition.options;

    const toInit =
      resumeFrom === undefined
        ? (ctx: OperationContext) =>
            this._tracing.withSpan(
              "DocumentModelAdministrationClient.createDocumentModelPoller-start",
              definition.options,
              async (options) => {
                const { operationLocation } = await definition.start(ctx);

                if (operationLocation === undefined) {
                  throw new Error(
                    "Unable to start model creation operation: no Operation-Location received.",
                  );
                }

                return this._restClient.sendOperationRequest(
                  {
                    options: {
                      onResponse: (rawResponse, ...args) => {
                        return captureRetryAfter(rawResponse, ctx, options, args);
                      },
                      ...options,
                      abortSignal: ctx.abortSignal,
                    },
                  },
                  {
                    path: operationLocation,
                    httpMethod: "GET",
                    responses: {
                      200: {
                        bodyMapper: Mappers.OperationDetails,
                      },
                      default: {
                        bodyMapper: Mappers.ErrorResponse,
                      },
                    },
                    headerParameters: [accept1],
                    serializer: SERIALIZER,
                  },
                ) as Promise<OperationDetails>;
              },
            )
        : (ctx: OperationContext) =>
            this._tracing.withSpan(
              "DocumentModelAdministrationClient.createDocumentModelPoller-resume",
              definition.options,
              (options) => {
                const { operationId } = JSON.parse(resumeFrom) as { operationId: string };

                return this._restClient.miscellaneous.getOperation(operationId, {
                  onResponse: (rawResponse, ...args) => {
                    return captureRetryAfter(rawResponse, ctx, options, args);
                  },
                  ...options,
                });
              },
            );

    const poller = await lro<
      DocumentModelDetails | DocumentClassifierDetails,
      AdministrationOperationState
    >(
      {
        init: async (ctx) => toTrainingPollOperationState(await toInit(ctx)),
        poll: async (ctx, { operationId }) =>
          this._tracing.withSpan(
            "DocumentModelAdminstrationClient.createDocumentModelPoller-poll",
            definition.options,
            async (options) => {
              const res = await this._restClient.miscellaneous.getOperation(operationId, {
                onResponse: (rawResponse, ...args) => {
                  // Capture the `Retry-After` header if it was sent.
                  return captureRetryAfter(rawResponse, ctx, options, args);
                },
                ...options,
                abortSignal: ctx.abortSignal,
              });

              return toTrainingPollOperationState(res as DocumentModelBuildResponse);
            },
          ),
        serialize: ({ operationId }) => JSON.stringify({ operationId }),
      },
      definition.options.updateIntervalInMs,
      definition.options.abortSignal,
    );

    if (definition.options.onProgress !== undefined) {
      poller.onProgress(definition.options.onProgress as () => unknown);
      definition.options.onProgress(poller.getOperationState() as State);
    }

    // Need this assertion. The poller above is dynamic, and we can't infer the conditional return type of this method.
    return poller as never;

    /**
     * An inline helper for capturing the value of the `Retry-After` header if it was sent.
     * @param rawResponse - the raw response from the service
     * @param ctx - the operation context
     * @param options - the operation options
     * @param args - the arguments passed to the response handler
     * @returns
     */
    function captureRetryAfter(
      rawResponse: FullOperationResponse,
      ctx: OperationContext,
      options: PollerOptions<State> & OperationOptions,
      args: [flatResponse: unknown, error?: unknown],
    ) {
      const retryAfterHeader = rawResponse.headers.get("retry-after");
      // Convert the header value to milliseconds. If the header is not a valid number, then it is an HTTP
      // date.
      if (retryAfterHeader) {
        const retryAfterMs = Number(retryAfterHeader) * 1000;
        if (!Number.isNaN(retryAfterMs)) {
          ctx.updateDelay(retryAfterMs);
        } else {
          ctx.updateDelay(Date.parse(retryAfterHeader) - Date.now());
        }
      } else {
        ctx.updateDelay(undefined);
      }

      // Forward the `onResponse` callback if it was provided.
      return options.onResponse?.(rawResponse, ...args);
    }
  }

  // #region Model Management

  /**
   * Retrieve basic information about this client's resource.
   *
   * ### Example
   *
   * ```javascript
   * const {
   *   // Information about the custom models in the current resource
   *   customDocumentModelDetails: {
   *     // The number of custom models in the current resource
   *     count,
   *     // The maximum number of models that the current resource can support
   *     limit
   *   }
   * } = await client.getResourceDetails();
   * ```
   *
   * @param options - optional settings for the request
   * @returns basic information about this client's resource
   */
  public getResourceDetails(options: GetResourceDetailsOptions = {}): Promise<ResourceDetails> {
    return this._tracing.withSpan(
      "DocumentModelAdministrationClient.getResourceDetails",
      options,
      (finalOptions) => this._restClient.miscellaneous.getResourceInfo(finalOptions),
    );
  }

  /**
   * Retrieves information about a model ({@link DocumentModelDetails}) by ID.
   *
   * This method can retrieve information about custom as well as prebuilt models.
   *
   * ### **Breaking Change**
   *
   * In previous versions of the Form Recognizer REST API and SDK, the `getModel` method could return any model, even
   * one that failed to create due to errors. In the new service versions, `getDocumentModel` and `listDocumentModels`
   * _only produce successfully created models_ (i.e. models that are "ready" for use). Failed models are now retrieved
   * through the "operations" APIs, see {@link getOperation} and {@link listOperations}.
   *
   * ### Example
   *
   * ```javascript
   * // The ID of the prebuilt business card model
   * const modelId = "prebuilt-businessCard";
   *
   * const {
   *   modelId, // identical to the modelId given when calling `getDocumentModel`
   *   description, // a textual description of the model, if provided during model creation
   *   createdOn, // the Date (timestamp) that the model was created
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
   * } = await client.getDocumentModel(modelId);
   * ```
   *
   * @param modelId - the unique ID of the model to query
   * @param options - optional settings for the request
   * @returns information about the model with the given ID
   */
  public getDocumentModel(
    modelId: string,
    options: GetModelOptions = {},
  ): Promise<DocumentModelDetails> {
    return this._tracing.withSpan(
      "DocumentModelAdministrationClient.getDocumentModel",
      options,
      (finalOptions) => this._restClient.documentModels.getModel(modelId, finalOptions),
    );
  }

  /**
   * List summaries of models in the resource. Custom as well as prebuilt models will be included. This operation
   * supports paging.
   *
   * The model summary ({@link DocumentModelSummary}) includes only the basic information about the model, and does not include
   * information about the document types in the model (such as the field schemas and confidence values).
   *
   * To access the full information about the model, use {@link getDocumentModel}.
   *
   * ### **Breaking Change**
   *
   * In previous versions of the Form Recognizer REST API and SDK, the `listModels` method would return all models, even
   * those that failed to create due to errors. In the new service versions, `listDocumentModels` and `getDocumentModel`
   * _only produce successfully created models_ (i.e. models that are "ready" for use). Failed models are now retrieved
   * through the "operations" APIs, see {@link getOperation} and {@link listOperations}.
   *
   * ### Examples
   *
   * #### Async Iteration
   *
   * ```javascript
   * for await (const summary of client.listDocumentModels()) {
   *   const {
   *     modelId, // The model's unique ID
   *     description, // a textual description of the model, if provided during model creation
   *   } = summary;
   *
   *   // You can get the full model info using `getDocumentModel`
   *   const model = await client.getDocumentModel(modelId);
   * }
   * ```
   *
   * #### By Page
   *
   * ```javascript
   * // The listDocumentModels method is paged, and you can iterate by page using the `byPage` method.
   * const pages = client.listDocumentModels().byPage();
   *
   * for await (const page of pages) {
   *   // Each page is an array of models and can be iterated synchronously
   *   for (const model of page) {
   *     const {
   *       modelId, // The model's unique ID
   *       description, // a textual description of the model, if provided during model creation
   *     } = summary;
   *
   *     // You can get the full model info using `getDocumentModel`
   *     const model = await client.getDocumentModel(modelId);
   *   }
   * }
   * ```
   *
   * @param options - optional settings for the model requests
   * @returns an async iterable of model summaries that supports paging
   */
  public listDocumentModels(
    options: ListModelsOptions = {},
  ): PagedAsyncIterableIterator<DocumentModelSummary> {
    return this._restClient.documentModels.listModels(options);
  }

  /**
   * Deletes a model with the given ID from the client's resource, if it exists. This operation CANNOT be reverted.
   *
   * ### Example
   *
   * ```javascript
   * await client.deleteDocumentModel("<model ID to delete>"));
   * ```
   *
   * @param modelId - the unique ID of the model to delete from the resource
   * @param options - optional settings for the request
   */
  public deleteDocumentModel(
    modelId: string,
    options: DeleteDocumentModelOptions = {},
  ): Promise<void> {
    return this._tracing.withSpan(
      "DocumentModelAdministrationClient.deleteDocumentModel",
      options,
      (finalOptions) => this._restClient.documentModels.deleteModel(modelId, finalOptions),
    );
  }

  // #endregion

  // #region Classifier Management

  /**
   * Retrieves information about a classifier ({@link DocumentClassifierDetails}) by ID.
   *
   * ### Example
   *
   * ```javascript
   * const classifierId = "<classifier ID";
   *
   * const {
   *   classifierId, // identical to the ID given when calling `getDocumentClassifier`
   *   description, // a textual description of the classifier, if provided during classifier creation
   *   createdOn, // the Date (timestamp) that the classifier was created
   *   // information about the document types in the classifier and their corresponding traning data
   *   docTypes
   * } = await client.getDocumentClassifier(classifierId);
   *
   * // The `docTypes` property is a map of document type names to information about the training data
   * // for that document type.
   * for (const [docTypeName, classifierDocTypeDetails] of Object.entries(docTypes)) {
   *  console.log(`- '${docTypeName}': `, classifierDocTypeDetails);
   * }
   * ```
   *
   * @param classifierId - the unique ID of the classifier to query
   * @param options - optional settings for the request
   * @returns information about the classifier with the given ID
   */
  public getDocumentClassifier(
    classifierId: string,
    options: OperationOptions = {},
  ): Promise<DocumentClassifierDetails> {
    return this._tracing.withSpan(
      "DocumentModelAdministrationClient.getDocumentClassifier",
      options,
      (finalOptions) =>
        this._restClient.documentClassifiers.getClassifier(classifierId, finalOptions),
    );
  }

  /**
   * List details about classifiers in the resource. This operation supports paging.
   *
   * ### Examples
   *
   * #### Async Iteration
   *
   * ```javascript
   * for await (const details of client.listDocumentClassifiers()) {
   *   const {
   *     classifierId, // The classifier's unique ID
   *     description, // a textual description of the classifier, if provided during creation
   *     docTypes, // information about the document types in the classifier and their corresponding traning data
   *   } = details;
   * }
   * ```
   *
   * #### By Page
   *
   * ```javascript
   * // The listDocumentClassifiers method is paged, and you can iterate by page using the `byPage` method.
   * const pages = client.listDocumentClassifiers().byPage();
   *
   * for await (const page of pages) {
   *   // Each page is an array of classifiers and can be iterated synchronously
   *   for (const details of page) {
   *     const {
   *       classifierId, // The classifier's unique ID
   *       description, // a textual description of the classifier, if provided during creation
   *       docTypes, // information about the document types in the classifier and their corresponding traning data
   *     } = details;
   *   }
   * }
   * ```
   *
   * @param options - optional settings for the classifier requests
   * @returns an async iterable of classifier details that supports paging
   */
  public listDocumentClassifiers(
    options: ListModelsOptions = {},
  ): PagedAsyncIterableIterator<DocumentClassifierDetails> {
    return this._restClient.documentClassifiers.listClassifiers(options);
  }

  /**
   * Deletes a classifier with the given ID from the client's resource, if it exists. This operation CANNOT be reverted.
   *
   * ### Example
   *
   * ```javascript
   * await client.deleteDocumentClassifier("<classifier ID to delete>"));
   * ```
   *
   * @param classifierId - the unique ID of the classifier to delete from the resource
   * @param options - optional settings for the request
   */
  public deleteDocumentClassifier(
    classifierId: string,
    options: OperationOptions = {},
  ): Promise<void> {
    return this._tracing.withSpan(
      "DocumentModelAdministrationClient.deleteDocumentClassifier",
      options,
      (finalOptions) =>
        this._restClient.documentClassifiers.deleteClassifier(classifierId, finalOptions),
    );
  }

  // #endregion

  // #region Operations

  /**
   * Retrieves information about an operation (`OperationDetails`) by its ID.
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
   *   createdOn, // a Date object that reflects the time when the operation was started
   *   lastUpdatedOn, // a Date object that reflects the time when the operation state was last modified
   * } = await client.getOperation(operationId);
   * ```
   */
  public getOperation(
    operationId: string,
    options: GetOperationOptions = {},
  ): Promise<OperationDetails> {
    return this._tracing.withSpan(
      "DocumentModelAdministrationClient.getOperation",
      options,
      (finalOptions) => this._restClient.miscellaneous.getOperation(operationId, finalOptions),
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
    options: ListOperationsOptions = {},
  ): PagedAsyncIterableIterator<OperationSummary> {
    return this._restClient.miscellaneous.listOperations(options);
  }

  // #endregion
}

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { KeyCredential, TokenCredential } from "@azure/core-auth";
import { FORM_RECOGNIZER_API_VERSION, SDK_VERSION } from "./constants";
import {
  AnalyzeDocumentRequest,
  AnalyzeResultOperation,
  ContentType,
  GeneratedClient,
} from "./generated";
import { accept1 } from "./generated/models/parameters";
import {
  AnalysisOperationDefinition,
  AnalysisPoller,
  AnalyzeResult,
  DocumentAnalysisPollOperationState,
  FormRecognizerRequestBody,
  toAnalyzeResultFromGenerated,
  toDocumentAnalysisPollOperationState,
} from "./lro/analysis";
import { OperationContext, lro } from "./lro/util/poller";
import { AnalyzeDocumentOptions } from "./options/AnalyzeDocumentOptions";
import { DocumentAnalysisClientOptions } from "./options/FormRecognizerClientOptions";
import { DocumentModel } from "./documentModel";
import { makeServiceClient, Mappers, SERIALIZER } from "./util";
import { AbortSignalLike } from "@azure/abort-controller";
import { ClassifyDocumentOptions } from "./options/ClassifyDocumentOptions";
import { tracingClient } from "./tracing";

/**
 * A client for interacting with the Form Recognizer service's analysis features.
 *
 * ### Examples:
 *
 * The Form Recognizer service and clients support two means of authentication:
 *
 * #### Azure Active Directory
 *
 * ```javascript
 * import { DocumentAnalysisClient } from "@azure/ai-form-recognizer";
 * import { DefaultAzureCredential } from "@azure/identity";
 *
 * const endpoint = "https://<resource name>.cognitiveservices.azure.com";
 * const credential = new DefaultAzureCredential();
 *
 * const client = new DocumentAnalysisClient(endpoint, credential);
 * ```
 *
 * #### API Key (Subscription Key)
 *
 * ```javascript
 * import { DocumentAnalysisClient, AzureKeyCredential } from "@azure/ai-form-recognizer";
 *
 * const endpoint = "https://<resource name>.cognitiveservices.azure.com";
 * const credential = new AzureKeyCredential("<api key>");
 *
 * const client = new DocumentAnalysisClient(endpoint, credential);
 * ```
 */
export class DocumentAnalysisClient {
  private _restClient: GeneratedClient;

  /**
   * Create a `DocumentAnalysisClient` instance from a resource endpoint and a an Azure Identity `TokenCredential`.
   *
   * See the [`@azure/identity`](https://npmjs.com/package/\@azure/identity) package for more information about
   * authenticating with Azure Active Directory.
   *
   * ### Example:
   *
   * ```javascript
   * import { DocumentAnalysisClient } from "@azure/ai-form-recognizer";
   * import { DefaultAzureCredential } from "@azure/identity";
   *
   * const endpoint = "https://<resource name>.cognitiveservices.azure.com";
   * const credential = new DefaultAzureCredential();
   *
   * const client = new DocumentAnalysisClient(endpoint, credential);
   * ```
   *
   * @param endpoint - the endpoint URL of an Azure Cognitive Services instance
   * @param credential - a TokenCredential instance from the `@azure/identity` package
   * @param options - optional settings for configuring all methods in the client
   */
  public constructor(
    endpoint: string,
    credential: TokenCredential,
    options?: DocumentAnalysisClientOptions,
  );
  /**
   * Create a `DocumentAnalysisClient` instance from a resource endpoint and a static API key (`KeyCredential`),
   *
   * ### Example:
   *
   * ```javascript
   * import { DocumentAnalysisClient, AzureKeyCredential } from "@azure/ai-form-recognizer";
   *
   * const endpoint = "https://<resource name>.cognitiveservices.azure.com";
   * const credential = new AzureKeyCredential("<api key>");
   *
   * const client = new DocumentAnalysisClient(endpoint, credential);
   * ```
   *
   * @param endpoint - the endpoint URL of an Azure Cognitive Services instance
   * @param credential - a KeyCredential containing the Cognitive Services instance subscription key
   * @param options - optional settings for configuring all methods in the client
   */
  public constructor(
    endpoint: string,
    credential: KeyCredential,
    options?: DocumentAnalysisClientOptions,
  );
  /**
   * @hidden
   */
  public constructor(
    endpoint: string,
    credential: KeyCredential | TokenCredential,
    options?: DocumentAnalysisClientOptions,
  );
  public constructor(
    endpoint: string,
    credential: KeyCredential | TokenCredential,
    options: DocumentAnalysisClientOptions = {},
  ) {
    this._restClient = makeServiceClient(endpoint, credential, options);
  }

  // #region Analysis

  /**
   * Extract data from an input using a model given by its unique ID.
   *
   * This operation supports custom as well as prebuilt models. For example, to use the prebuilt invoice model, provide
   * the model ID "prebuilt-invoice", or to use the simpler prebuilt layout model, provide the model ID
   * "prebuilt-layout".
   *
   * The fields produced in the `AnalyzeResult` depend on the model that is used for analysis, and the values in any
   * extracted documents' fields depend on the document types in the model (if any) and their corresponding field
   * schemas.
   *
   * ### Examples
   *
   * This method supports streamable request bodies ({@link FormRecognizerRequestBody}) such as Node.JS `ReadableStream`
   * objects, browser `Blob`s, and `ArrayBuffer`s. The contents of the body will be uploaded to the service for analysis.
   *
   * ```javascript
   * import * as fs from "fs";
   *
   * const file = fs.createReadStream("path/to/receipt.pdf");
   *
   * // The model that is passed to the following function call determines the type of the eventual result. In the
   * // example, we will use the prebuilt receipt model, but you could use a custom model ID/name instead.
   * const poller = await client.beginAnalyzeDocument("prebuilt-receipt", file);
   *
   * // The result is a long-running operation (poller), which must itself be polled until the operation completes
   * const {
   *   pages, // pages extracted from the document, which contain lines and words
   *   tables, // extracted tables, organized into cells that contain their contents
   *   styles, // text styles (ex. handwriting) that were observed in the document
   *   keyValuePairs, // extracted pairs of elements  (directed associations from one element in the input to another)
   *   entities, // extracted entities in the input's content, which are categorized (ex. "Location" or "Organization")
   *   documents // extracted documents (instances of one of the model's document types and its field schema)
   * } = await poller.pollUntilDone();
   *
   * // Extract the fields of the first document. These fields constitute a receipt, because we used the receipt model
   * const [{ fields: receipt }] = documents;
   *
   * // The fields correspond to the model's document types and their field schemas. Refer to the Form Recognizer
   * // documentation for information about the document types and field schemas within a model, or use the `getModel`
   * // operation to view this information programmatically.
   * console.log("The type of this receipt is:", receipt?.["ReceiptType"]?.value);
   * ```
   *
   *
   * @param modelId - the unique ID (name) of the model within this client's resource
   * @param document - a {@link FormRecognizerRequestBody} that will be uploaded with the request
   * @param options - optional settings for the analysis operation and poller
   * @returns a long-running operation (poller) that will eventually produce an `AnalyzeResult`
   */
  public async beginAnalyzeDocument(
    modelId: string,
    document: FormRecognizerRequestBody,
    // eslint-disable-next-line @azure/azure-sdk/ts-naming-options
    options?: AnalyzeDocumentOptions,
  ): Promise<AnalysisPoller>;
  /**
   * Extract data from an input using a model that has a known, strongly-typed document schema (a {@link DocumentModel}).
   *
   * The fields produced in the `AnalyzeResult` depend on the model that is used for analysis. In TypeScript, the type
   * of the result for this method overload is inferred from the type of the input `DocumentModel`.
   *
   * ### Examples
   *
   * This method supports streamable request bodies ({@link FormRecognizerRequestBody}) such as Node.JS `ReadableStream`
   * objects, browser `Blob`s, and `ArrayBuffer`s. The contents of the body will be uploaded to the service for analysis.
   *
   * If the input provided is a string, it will be treated as a URL to the location of a document to be analyzed. See the
   * {@link beginAnalyzeDocumentFromUrl} method for more information. Use of that method is preferred when using URLs,
   * and URL support is only provided in this method for backwards compatibility.
   *
   * ```typescript
   * import * as fs from "fs";
   *
   * // See the `prebuilt` folder in the SDK samples (http://aka.ms/azsdk/formrecognizer/js/samples) for examples of
   * // DocumentModels for known prebuilts.
   * import { PrebuiltReceiptModel } from "./prebuilt-receipt.ts";
   *
   * const file = fs.createReadStream("path/to/receipt.pdf");
   *
   * // The model that is passed to the following function call determines the type of the eventual result. In the
   * // example, we will use the prebuilt receipt model.
   * const poller = await client.beginAnalyzeDocument(PrebuiltReceiptModel, file);
   *
   * // The result is a long-running operation (poller), which must itself be polled until the operation completes
   * const {
   *   pages, // pages extracted from the document, which contain lines and words
   *   tables, // extracted tables, organized into cells that contain their contents
   *   styles, // text styles (ex. handwriting) that were observed in the document
   *   keyValuePairs, // extracted pairs of elements  (directed associations from one element in the input to another)
   *
   *   documents // extracted documents (instances of one of the model's document types and its field schema)
   * } = await poller.pollUntilDone();
   *
   * // Extract the fields of the first document. These fields constitute a receipt, because we used the receipt model
   * const [{ fields: receipt }] = documents;
   *
   * // Since we used the strongly-typed PrebuiltReceiptModel object instead of the "prebuilt-receipt" model ID
   * // string, the fields of the receipt are strongly-typed and have camelCase names (as opposed to PascalCase).
   * console.log("The type of this receipt is:", receipt.receiptType?.value);
   * ```
   *
   * @param model - a {@link DocumentModel} representing the model to use for analysis and the expected output type
   * @param document - a {@link FormRecognizerRequestBody} that will be uploaded with the request
   * @param options - optional settings for the analysis operation and poller
   * @returns a long-running operation (poller) that will eventually produce an `AnalyzeResult` with documents that have
   *          the result type associated with the input model
   */
  public async beginAnalyzeDocument<Result>(
    model: DocumentModel<Result>,
    document: FormRecognizerRequestBody,
    // eslint-disable-next-line @azure/azure-sdk/ts-naming-options
    options?: AnalyzeDocumentOptions<Result>,
  ): Promise<AnalysisPoller<Result>>;
  public async beginAnalyzeDocument(
    model: string | DocumentModel<unknown>,
    document: FormRecognizerRequestBody,
    options: AnalyzeDocumentOptions<unknown> = {},
  ): Promise<AnalysisPoller<unknown>> {
    return tracingClient.withSpan(
      "DocumentAnalysisClient.beginAnalyzeDocument",
      options,
      // In the first version of the SDK, the document input was treated as a URL if it was a string, and we preserve
      // this behavior to avoid introducing a breaking change.
      this.analyze.bind(
        this,
        model,
        typeof document === "string" ? source("url", document) : source("body", document),
      ),
    );
  }

  /**
   * Extract data from an input using a model given by its unique ID.
   *
   * This operation supports custom as well as prebuilt models. For example, to use the prebuilt invoice model, provide
   * the model ID "prebuilt-invoice", or to use the simpler prebuilt layout model, provide the model ID
   * "prebuilt-layout".
   *
   * The fields produced in the `AnalyzeResult` depend on the model that is used for analysis, and the values in any
   * extracted documents' fields depend on the document types in the model (if any) and their corresponding field
   * schemas.
   *
   * ### Examples
   *
   * This method supports extracting data from a file at a given URL. The Form Recognizer service will attempt to
   * download a file using the submitted URL, so the URL must be accessible from the public internet. For example, a SAS
   * token can be used to grant read access to a blob in Azure Storage, and the service will use the SAS-encoded URL to
   * request the file.
   *
   * ```javascript
   * // the URL must be publicly accessible
   * const url = "<receipt document url>";
   *
   * // The model that is passed to the following function call determines the type of the eventual result. In the
   * // example, we will use the prebuilt receipt model, but you could use a custom model ID/name instead.
   * const poller = await client.beginAnalyzeDocument("prebuilt-receipt", url);
   *
   * // The result is a long-running operation (poller), which must itself be polled until the operation completes
   * const {
   *   pages, // pages extracted from the document, which contain lines and words
   *   tables, // extracted tables, organized into cells that contain their contents
   *   styles, // text styles (ex. handwriting) that were observed in the document
   *   keyValuePairs, // extracted pairs of elements  (directed associations from one element in the input to another)
   *
   *   documents // extracted documents (instances of one of the model's document types and its field schema)
   * } = await poller.pollUntilDone();
   *
   * // Extract the fields of the first document. These fields constitute a receipt, because we used the receipt model
   * const [{ fields: receipt }] = documents;
   *
   * // The fields correspond to the model's document types and their field schemas. Refer to the Form Recognizer
   * // documentation for information about the document types and field schemas within a model, or use the `getModel`
   * // operation to view this information programmatically.
   * console.log("The type of this receipt is:", receipt?.["ReceiptType"]?.value);
   * ```
   *
   * @param modelId - the unique ID (name) of the model within this client's resource
   * @param documentUrl - a URL (string) to an input document accessible from the public internet
   * @param options - optional settings for the analysis operation and poller
   * @returns a long-running operation (poller) that will eventually produce an `AnalyzeResult`
   */
  public async beginAnalyzeDocumentFromUrl(
    modelId: string,
    documentUrl: string,
    // eslint-disable-next-line @azure/azure-sdk/ts-naming-options
    options?: AnalyzeDocumentOptions,
  ): Promise<AnalysisPoller>;
  /**
   * Extract data from an input using a model that has a known, strongly-typed document schema (a {@link DocumentModel}).
   *
   * The fields produced in the `AnalyzeResult` depend on the model that is used for analysis. In TypeScript, the type
   * of the result for this method overload is inferred from the type of the input `DocumentModel`.
   *
   * ### Examples
   *
   * This method supports extracting data from a file at a given URL. The Form Recognizer service will attempt to
   * download a file using the submitted URL, so the URL must be accessible from the public internet. For example, a SAS
   * token can be used to grant read access to a blob in Azure Storage, and the service will use the SAS-encoded URL to
   * request the file.
   *
   * ```typescript
   * // See the `prebuilt` folder in the SDK samples (http://aka.ms/azsdk/formrecognizer/js/samples) for examples of
   * // DocumentModels for known prebuilts.
   * import { PrebuiltReceiptModel } from "./prebuilt-receipt.ts";
   *
   * // the URL must be publicly accessible
   * const url = "<receipt document url>";
   *
   * // The model that is passed to the following function call determines the type of the eventual result. In the
   * // example, we will use the prebuilt receipt model.
   * const poller = await client.beginAnalyzeDocument(PrebuiltReceiptModel, url);
   *
   * // The result is a long-running operation (poller), which must itself be polled until the operation completes
   * const {
   *   pages, // pages extracted from the document, which contain lines and words
   *   tables, // extracted tables, organized into cells that contain their contents
   *   styles, // text styles (ex. handwriting) that were observed in the document
   *   keyValuePairs, // extracted pairs of elements  (directed associations from one element in the input to another)
   *
   *   documents // extracted documents (instances of one of the model's document types and its field schema)
   * } = await poller.pollUntilDone();
   *
   * // Extract the fields of the first document. These fields constitute a receipt, because we used the receipt model
   * const [{ fields: receipt }] = documents;
   *
   * // Since we used the strongly-typed PrebuiltReceiptModel object instead of the "prebuilt-receipt" model ID
   * // string, the fields of the receipt are strongly-typed and have camelCase names (as opposed to PascalCase).
   * console.log("The type of this receipt is:", receipt.receiptType?.value);
   * ```
   *
   * @param model - a {@link DocumentModel} representing the model to use for analysis and the expected output type
   * @param documentUrl - a URL (string) to an input document accessible from the public internet
   * @param options - optional settings for the analysis operation and poller
   * @returns a long-running operation (poller) that will eventually produce an `AnalyzeResult`
   */
  public async beginAnalyzeDocumentFromUrl<Result>(
    model: DocumentModel<Result>,
    documentUrl: string,
    // eslint-disable-next-line @azure/azure-sdk/ts-naming-options
    options?: AnalyzeDocumentOptions<Result>,
  ): Promise<AnalysisPoller<Result>>;
  public async beginAnalyzeDocumentFromUrl(
    model: string | DocumentModel<unknown>,
    documentUrl: string,
    options: AnalyzeDocumentOptions<unknown> = {},
  ): Promise<AnalysisPoller<unknown>> {
    return tracingClient.withSpan(
      "DocumentAnalysisClient.beginAnalyzeDocumentFromUrl",
      options,
      this.analyze.bind(this, model, source("url", documentUrl)),
    );
  }

  /**
   * A helper method for running analysis polymorphically.
   *
   * @param model - the model ID or DocumentModel to use for analysis
   * @param input - the string URL or request body to use
   * @param options - analysis options
   * @returns - an analysis poller
   */
  private analyze(
    model: string | DocumentModel<unknown>,
    input: DocumentSource,
    options: AnalyzeDocumentOptions<unknown>,
  ) {
    const {
      modelId: initialModelId,
      apiVersion: requestApiVersion,
      transformResult,
    } = typeof model === "string"
      ? { modelId: model, apiVersion: undefined, transformResult: (v: AnalyzeResult) => v }
      : model;

    if (requestApiVersion && requestApiVersion !== FORM_RECOGNIZER_API_VERSION) {
      throw new Error(
        [
          `API Version mismatch: the provided model wants version: ${requestApiVersion},`,
          `but the client is using ${FORM_RECOGNIZER_API_VERSION}.`,
          "The API version of the model must match the client's API version.",
        ].join(" "),
      );
    }

    return this.createUnifiedPoller<unknown>(
      (abortSignal) => {
        const [contentType, analyzeRequest] = toAnalyzeRequest(input);

        return this._restClient.documentModels.analyzeDocument(initialModelId, contentType as any, {
          ...options,
          abortSignal,
          analyzeRequest,
        });
      },
      {
        initialModelId,
        options,
        transformResult: (result) => transformResult(toAnalyzeResultFromGenerated(result)),
      },
    );
  }

  /**
   * Classify a document using a custom classifier given by its ID.
   *
   * This method produces a long-running operation (poller) that will eventually produce an `AnalyzeResult`. This is the
   * same type as `beginAnalyzeDocument` and `beginAnalyzeDocumentFromUrl`, but the result will only contain a small
   * subset of its fields. Only the `documents` field and `pages` field will be populated, and only minimal page
   * information will be returned. The `documents` field will contain information about all the identified documents and
   * the `docType` that they were classified as.
   *
   * ### Example
   *
   * This method supports streamable request bodies ({@link FormRecognizerRequestBody}) such as Node.JS `ReadableStream`
   * objects, browser `Blob`s, and `ArrayBuffer`s. The contents of the body will be uploaded to the service for analysis.
   *
   * ```typescript
   * import * as fs from "fs";
   *
   * const file = fs.createReadStream("path/to/file.pdf");
   *
   * const poller = await client.beginClassifyDocument("<classifier ID>", file);
   *
   * // The result is a long-running operation (poller), which must itself be polled until the operation completes
   * const {
   *   pages, // pages extracted from the document, which contain only basic information for classifiers
   *   documents // extracted documents and their types
   * } = await poller.pollUntilDone();
   *
   * // We'll print the documents and their types
   * for (const { docType } of documents) {
   *   console.log("The type of this document is:", docType);
   * }
   * ```
   *
   * @param classifierId - the ID of the custom classifier to use for analysis
   * @param document - the document to classify
   * @param options - options for the classification operation
   * @returns a long-running operation (poller) that will eventually produce an `AnalyzeResult`
   */
  public async beginClassifyDocument(
    classifierId: string,
    document: FormRecognizerRequestBody,
    // eslint-disable-next-line @azure/azure-sdk/ts-naming-options
    options: ClassifyDocumentOptions = {},
  ): Promise<AnalysisPoller> {
    return tracingClient.withSpan(
      "DocumentAnalysisClient.beginClassifyDocument",
      options,
      this.classify.bind(this, classifierId, source("body", document)),
    );
  }

  /**
   * Classify a document from a URL using a custom classifier given by its ID.
   *
   * This method produces a long-running operation (poller) that will eventually produce an `AnalyzeResult`. This is the
   * same type as `beginAnalyzeDocument` and `beginAnalyzeDocumentFromUrl`, but the result will only contain a small
   * subset of its fields. Only the `documents` field and `pages` field will be populated, and only minimal page
   * information will be returned. The `documents` field will contain information about all the identified documents and
   * the `docType` that they were classified as.
   *
   * ### Example
   *
   * This method supports extracting data from a file at a given URL. The Form Recognizer service will attempt to
   * download a file using the submitted URL, so the URL must be accessible from the public internet. For example, a SAS
   * token can be used to grant read access to a blob in Azure Storage, and the service will use the SAS-encoded URL to
   * request the file.
   *
   * ```typescript
   * // the URL must be publicly accessible
   * const url = "<file url>";
   *
   * const poller = await client.beginClassifyDocument("<classifier ID>", url);
   *
   * // The result is a long-running operation (poller), which must itself be polled until the operation completes
   * const {
   *   pages, // pages extracted from the document, which contain only basic information for classifiers
   *   documents // extracted documents and their types
   * } = await poller.pollUntilDone();
   *
   * // We'll print the documents and their types
   * for (const { docType } of documents) {
   *   console.log("The type of this document is:", docType);
   * }
   * ```
   * @param classifierId - the ID of the custom classifier to use for analysis
   * @param documentUrl - the URL of the document to classify
   * @param options -
   * @returns
   */
  public async beginClassifyDocumentFromUrl(
    classifierId: string,
    documentUrl: string,
    // eslint-disable-next-line @azure/azure-sdk/ts-naming-options
    options: ClassifyDocumentOptions = {},
  ): Promise<AnalysisPoller> {
    return tracingClient.withSpan(
      "DocumentAnalysisClient.beginClassifyDocumentFromUrl",
      options,
      this.classify.bind(this, classifierId, source("url", documentUrl)),
    );
  }

  /**
   * A helper method for running classification polymorphically.
   * @param classifierId - the ID of the classifier to use
   * @param input - the string URL or request body to use
   * @param options - analysis options
   * @returns an analysis poller
   */
  private classify(
    classifierId: string,
    input: DocumentSource,
    options: ClassifyDocumentOptions,
  ): Promise<AnalysisPoller> {
    return this.createUnifiedPoller(
      async (abortSignal) => {
        const [contentType, classifyRequest] = toAnalyzeRequest(input);

        return this._restClient.documentClassifiers.classifyDocument(
          classifierId,
          contentType as any,
          {
            ...options,
            abortSignal,
            classifyRequest,
          },
        );
      },
      {
        initialModelId: classifierId,
        options,
        transformResult: toAnalyzeResultFromGenerated,
      },
    );
  }

  /**
   * Create an LRO poller that handles analysis operations.
   *
   * This is the meat of all analysis polling operations.
   *
   * @param startOperation - function that starts the operation and returns the operation location
   * @param definition - operation definition (initial model ID, operation transforms, request options)
   * @returns - an analysis poller that produces the given return types according to the operation spec
   */
  private async createUnifiedPoller<Result>(
    startOperation: (
      abortSignal: AbortSignalLike | undefined,
    ) => Promise<{ operationLocation?: string }>,
    definition: AnalysisOperationDefinition<Result>,
  ): Promise<AnalysisPoller<Result>> {
    const { resumeFrom } = definition.options;

    // TODO: what should we do if resumeFrom.modelId is different from initialModelId?
    // And what do we do with the redundant input??

    const getAnalyzeResult = (
      ctx: OperationContext,
      operationLocation: string,
    ): Promise<AnalyzeResultOperation> =>
      tracingClient.withSpan(
        "DocumentAnalysisClient.createAnalysisPoller-getAnalyzeResult",
        definition.options,
        (finalOptions) =>
          this._restClient.sendOperationRequest<AnalyzeResultOperation>(
            {
              options: {
                onResponse: async (rawResponse, ...args) => {
                  // Capture the `Retry-After` header if it was sent.
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
                  return finalOptions.onResponse?.(rawResponse, ...args);
                },
                ...finalOptions,
                // We need to pass the abort signal from the context rather than from the options, since the user could
                // poll the LRO with a different AbortSignal than it was instantiated with.
                abortSignal: ctx.abortSignal,
              },
            },
            {
              path: operationLocation,
              httpMethod: "GET",
              responses: {
                200: {
                  bodyMapper: Mappers.AnalyzeResultOperation,
                },
                default: {
                  bodyMapper: Mappers.ErrorResponse,
                },
              },
              // URL is fully-formed, so we don't need any query parameters
              headerParameters: [accept1],
              serializer: SERIALIZER,
            },
          ),
      );

    const toInit =
      // If the user gave us a stored token, we'll poll it again
      resumeFrom !== undefined
        ? async (ctx: OperationContext) =>
            tracingClient.withSpan(
              "DocumentAnalysisClient.createAnalysisPoller-resume",
              definition.options,
              async () => {
                const { clientVersion, operationLocation, modelId } = JSON.parse(resumeFrom) as {
                  clientVersion?: string;
                  operationLocation: string;
                  modelId: string;
                };

                if (!clientVersion || clientVersion !== SDK_VERSION) {
                  throw new Error(
                    [
                      "Cannot restore poller from a serialized state from a different version of the client",
                      `library (restoreFrom: '${clientVersion}', current: '${SDK_VERSION}').`,
                    ].join(" "),
                  );
                }

                const result = await getAnalyzeResult(ctx, operationLocation);

                return toDocumentAnalysisPollOperationState(
                  definition,
                  modelId,
                  operationLocation,
                  result,
                );
              },
            )
        : // Otherwise, we'll start a new operation from the initialModelId
          async (ctx: OperationContext) =>
            tracingClient.withSpan(
              "DocumentAnalysisClient.createAnalysisPoller-start",
              definition.options,
              async () => {
                const { operationLocation } = await startOperation(ctx.abortSignal);

                if (operationLocation === undefined) {
                  throw new Error(
                    "Unable to start analysis operation: no Operation-Location received.",
                  );
                }

                const result = await getAnalyzeResult(ctx, operationLocation);

                return toDocumentAnalysisPollOperationState(
                  definition,
                  definition.initialModelId,
                  operationLocation,
                  result,
                );
              },
            );

    const poller = await lro<Result, DocumentAnalysisPollOperationState<Result>>(
      {
        init: toInit,
        poll: async (ctx, { operationLocation, modelId }) =>
          tracingClient.withSpan(
            "DocumentAnalysisClient.createAnalysisPoller-poll",
            {},
            async () => {
              const result = await getAnalyzeResult(ctx, operationLocation);

              return toDocumentAnalysisPollOperationState(
                definition,
                modelId,
                operationLocation,
                result,
              );
            },
          ),
        serialize: ({ operationLocation, modelId }) =>
          JSON.stringify({ clientVersion: SDK_VERSION, id: modelId, operationLocation }),
      },
      definition.options.updateIntervalInMs,
      definition.options.abortSignal,
    );

    if (definition.options.onProgress !== undefined) {
      poller.onProgress(definition.options.onProgress);
      definition.options.onProgress(poller.getOperationState());
    }

    return poller;
  }

  // #endregion
}

/**
 * Produce an appropriate pair of content-type and analyzeRequest value for the analysis request.
 * @internal
 */
function toAnalyzeRequest(
  input: DocumentSource,
): ["application/json", AnalyzeDocumentRequest] | [ContentType, FormRecognizerRequestBody] {
  switch (input.kind) {
    case "body":
      return ["application/octet-stream", input.body];
    case "url":
      return ["application/json", { urlSource: input.url }];
    case "base64":
      return ["application/json", { base64Source: input.base64 }];
    default: {
      const __exhaust: never = input;
      throw new Error(`Unreachable 'toAnalyzeRequest' case: ${__exhaust}`);
    }
  }
}

/**
 * The input to a document analysis operation.
 */
// type DocumentSource = DocumentBodySource | DocumentUrlSource | DocumentBase64Source;

function source<K extends DocumentSource["kind"]>(
  kind: K,
  value: Extract<DocumentSource, { kind: K }>[K & keyof Extract<DocumentSource, { kind: K }>],
): DocumentSource {
  return {
    kind,
    [kind]: value,
  } as unknown as DocumentSource;
}

/**
 * The input to a document analysis operation.
 *
 * @internal
 */
type DocumentSource = {
  [K in keyof DocumentSourceTypes]: {
    /** The input kind. */
    kind: K;
  } & { [_ in K]: DocumentSourceTypes[K] };
}[keyof DocumentSourceTypes];

/**
 * A map of input discriminants to concrete input types.
 *
 * @internal
 */
interface DocumentSourceTypes {
  /**
   * A document buffer or stream to be uploaded in the request body.
   */
  body: FormRecognizerRequestBody;

  /**
   * A URL to a document to be analyzed.
   */
  url: string;

  /**
   * The data of a document to be analyzed. This is NOT base64-encoded, but will
   * be base64-encoded by the client before uploading.
   *
   * NOTE: This is never used by the client because it is inefficient compared to direct uploads and does not currently
   * support any features that `body` does not.
   */
  base64: Uint8Array;
}

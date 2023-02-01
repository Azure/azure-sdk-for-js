// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { KeyCredential, TokenCredential } from "@azure/core-auth";
import { createTracingClient } from "@azure/core-tracing";
import { TracingClient } from "@azure/core-tracing";
import { SDK_VERSION } from "./constants";
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
import { lro } from "./lro/util/poller";
import { AnalyzeDocumentOptions } from "./options/AnalyzeDocumentsOptions";
import {
  DEFAULT_GENERATED_CLIENT_OPTIONS,
  DocumentAnalysisClientOptions,
  FormRecognizerApiVersion,
} from "./options/FormRecognizerClientOptions";
import { DocumentModel } from "./documentModel";
import { makeServiceClient, Mappers, SERIALIZER } from "./util";

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
  private _tracing: TracingClient;
  private _apiVersion: FormRecognizerApiVersion;

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
    options?: DocumentAnalysisClientOptions
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
    options?: DocumentAnalysisClientOptions
  );
  /**
   * @hidden
   */
  public constructor(
    endpoint: string,
    credential: KeyCredential | TokenCredential,
    options?: DocumentAnalysisClientOptions
  );
  public constructor(
    endpoint: string,
    credential: KeyCredential | TokenCredential,
    options: DocumentAnalysisClientOptions = {}
  ) {
    this._restClient = makeServiceClient(endpoint, credential, options);
    this._tracing = createTracingClient({
      packageName: "@azure/ai-form-recognizer",
      packageVersion: SDK_VERSION,
      namespace: "Microsoft.CognitiveServices",
    });

    this._apiVersion = options.apiVersion ?? DEFAULT_GENERATED_CLIENT_OPTIONS.apiVersion;
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
    options?: AnalyzeDocumentOptions
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
    options?: AnalyzeDocumentOptions<Result>
  ): Promise<AnalysisPoller<Result>>;
  public async beginAnalyzeDocument(
    model: string | DocumentModel<unknown>,
    document: FormRecognizerRequestBody,
    options: AnalyzeDocumentOptions<unknown> = {}
  ): Promise<AnalysisPoller<unknown>> {
    return this._tracing.withSpan(
      "DocumentAnalysisClient.beginAnalyzeDocument",
      options,
      this.analyze.bind(this, model, document)
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
    options?: AnalyzeDocumentOptions
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
    options?: AnalyzeDocumentOptions<Result>
  ): Promise<AnalysisPoller<Result>>;
  public async beginAnalyzeDocumentFromUrl(
    model: string | DocumentModel<unknown>,
    documentUrl: string,
    options: AnalyzeDocumentOptions<unknown> = {}
  ): Promise<AnalysisPoller<unknown>> {
    return this._tracing.withSpan(
      "DocumentAnalysisClient.beginAnalyzeDocumentFromUrl",
      options,
      this.analyze.bind(this, model, documentUrl)
    );
  }

  /**
   * A helper method for running analysis polymorphically.
   * @internal
   * @param model - the model ID or DocumentModel to use for analysis
   * @param input - the string URL or request body to use
   * @param options - analysis options
   * @returns - an analysis poller
   */
  private analyze(
    model: string | DocumentModel<unknown>,
    input: string | FormRecognizerRequestBody,
    options: AnalyzeDocumentOptions<unknown>
  ) {
    const {
      modelId: initialModelId,
      apiVersion: requestApiVersion,
      transformResult,
    } = typeof model === "string"
      ? { modelId: model, apiVersion: undefined, transformResult: (v: AnalyzeResult) => v }
      : model;

    if (requestApiVersion && requestApiVersion !== this._apiVersion) {
      throw new Error(
        [
          `API Version mismatch: the provided model wants version: ${requestApiVersion}, but the client is using ${this._apiVersion}.`,
          "The API version of the model must match the client's API version.",
        ].join("\n")
      );
    }

    return this.createAnalysisPoller<unknown>(input, {
      initialModelId,
      options,
      transformResult: (result) => transformResult(toAnalyzeResultFromGenerated(result)),
    });
  }

  /**
   * Create an LRO poller that handles analysis operations.
   *
   * This is the meat of all analysis polling operations.
   *
   * @param input - either a string for URL inputs or a FormRecognizerRequestBody to upload a file directly to the Form
   *                Recognizer API
   * @param definition - operation definition (initial model ID, operation transforms, request options)
   * @returns - an analysis poller that produces the given return types according to the operation spec
   */
  private async createAnalysisPoller<Result>(
    input: string | FormRecognizerRequestBody,
    definition: AnalysisOperationDefinition<Result>
  ): Promise<AnalysisPoller<Result>> {
    const { resumeFrom } = definition.options;

    // TODO: what should we do if resumeFrom.modelId is different from initialModelId?
    // And what do we do with the redundant input??

    const getAnalyzeResult = (operationLocation: string): Promise<AnalyzeResultOperation> =>
      this._tracing.withSpan(
        "DocumentAnalysisClient.createAnalysisPoller-getAnalyzeResult",
        definition.options,
        (finalOptions) =>
          this._restClient.sendOperationRequest<AnalyzeResultOperation>(
            {
              options: finalOptions,
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
            }
          )
      );

    const toInit =
      // If the user gave us a stored token, we'll poll it again
      resumeFrom !== undefined
        ? async () =>
            this._tracing.withSpan(
              "DocumentAnalysisClient.createAnalysisPoller-resume",
              definition.options,
              async () => {
                const { operationLocation, modelId } = JSON.parse(resumeFrom) as {
                  operationLocation: string;
                  modelId: string;
                };

                const result = await getAnalyzeResult(operationLocation);

                return toDocumentAnalysisPollOperationState(
                  definition,
                  modelId,
                  operationLocation,
                  result
                );
              }
            )
        : // Otherwise, we'll start a new operation from the initialModelId
          async () =>
            this._tracing.withSpan(
              "DocumentAnalysisClient.createAnalysisPoller-start",
              definition.options,
              async () => {
                const [contentType, analyzeRequest] = toAnalyzeRequest(input);

                const { operationLocation } = await this._restClient.analyzeDocument(
                  definition.initialModelId,
                  contentType as any,
                  {
                    ...definition.options,
                    analyzeRequest,
                  }
                );

                if (operationLocation === undefined) {
                  throw new Error(
                    "Unable to start analysis operation: no Operation-Location received."
                  );
                }

                const result = await getAnalyzeResult(operationLocation);

                return toDocumentAnalysisPollOperationState(
                  definition,
                  definition.initialModelId,
                  operationLocation,
                  result
                );
              }
            );

    const poller = await lro<Result, DocumentAnalysisPollOperationState<Result>>(
      {
        init: toInit,
        poll: async ({ operationLocation, modelId }) =>
          this._tracing.withSpan(
            "DocumentAnalysisClient.createAnalysisPoller-poll",
            {},
            async () => {
              const result = await getAnalyzeResult(operationLocation);

              return toDocumentAnalysisPollOperationState(
                definition,
                modelId,
                operationLocation,
                result
              );
            }
          ),
        serialize: ({ operationLocation, modelId }) =>
          JSON.stringify({ modelId, operationLocation }),
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
}

/**
 * Produce an appropriate pair of content-type and analyzeRequest value for the analysis request.
 * @internal
 */
function toAnalyzeRequest(
  input: string | FormRecognizerRequestBody
): ["application/json", AnalyzeDocumentRequest] | [ContentType, FormRecognizerRequestBody] {
  if (typeof input === "string") {
    return [
      "application/json",
      {
        urlSource: input,
      },
    ];
  } else {
    return ["application/octet-stream", input];
  }
}

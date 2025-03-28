// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { KeyCredential, TokenCredential } from "@azure/core-auth";
import { createTracingClient } from "@azure/core-tracing";
import type { TracingClient } from "@azure/core-tracing";
import { FORM_RECOGNIZER_API_VERSION, SDK_VERSION } from "./constants.js";
import type {
  AnalyzeDocumentRequest,
  AnalyzeResultOperation,
  GeneratedClient,
} from "./generated/index.js";
import { accept1 } from "./generated/models/parameters.js";
import type {
  AnalysisOperationDefinition,
  AnalysisPoller,
  AnalyzeResult,
  DocumentAnalysisPollOperationState,
  FormRecognizerRequestBody,
} from "./lro/analysis.js";
import {
  toAnalyzeResultFromGenerated,
  toDocumentAnalysisPollOperationState,
} from "./lro/analysis.js";
import type { OperationContext } from "./lro/util/poller.js";
import { lro } from "./lro/util/poller.js";
import type { AnalyzeDocumentOptions } from "./options/AnalyzeDocumentOptions.js";
import type { DocumentAnalysisClientOptions } from "./options/FormRecognizerClientOptions.js";
import type { DocumentModel } from "./documentModel.js";
import { makeServiceClient, Mappers, SERIALIZER } from "./util.js";
import type { AbortSignalLike } from "@azure/abort-controller";
import type { ClassifyDocumentOptions } from "./options/ClassifyDocumentOptions.js";

/**
 * A client for interacting with the Form Recognizer service's analysis features.
 *
 * ### Examples:
 *
 * The Form Recognizer service and clients support two means of authentication:
 *
 * #### Azure Active Directory
 *
 * ```ts snippet:ReadmeSampleCreateClient_TokenCredential
 * import { DefaultAzureCredential } from "@azure/identity";
 * import { DocumentAnalysisClient } from "@azure/ai-form-recognizer";
 *
 * const credential = new DefaultAzureCredential();
 * const client = new DocumentAnalysisClient(
 *   "https://<resource name>.cognitiveservices.azure.com",
 *   credential,
 * );
 * ```
 *
 * #### API Key (Subscription Key)
 *
 * ```ts snippet:ReadmeSampleCreateClient_KeyCredential
 * import { AzureKeyCredential, DocumentAnalysisClient } from "@azure/ai-form-recognizer";
 *
 * const credential = new AzureKeyCredential("<API key>");
 * const client = new DocumentAnalysisClient(
 *   "https://<resource name>.cognitiveservices.azure.com",
 *   credential,
 * );
 * ```
 */
export class DocumentAnalysisClient {
  private _restClient: GeneratedClient;
  private _tracing: TracingClient;

  /**
   * Create a `DocumentAnalysisClient` instance from a resource endpoint and a an Azure Identity `TokenCredential`.
   *
   * See the [`@azure/identity`](https://npmjs.com/package/\@azure/identity) package for more information about
   * authenticating with Azure Active Directory.
   *
   * ### Example:
   *
   * ```ts snippet:ReadmeSampleCreateClient_TokenCredential
   * import { DefaultAzureCredential } from "@azure/identity";
   * import { DocumentAnalysisClient } from "@azure/ai-form-recognizer";
   *
   * const credential = new DefaultAzureCredential();
   * const client = new DocumentAnalysisClient(
   *   "https://<resource name>.cognitiveservices.azure.com",
   *   credential,
   * );
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
   * ```ts snippet:ReadmeSampleCreateClient_KeyCredential
   * import { AzureKeyCredential, DocumentAnalysisClient } from "@azure/ai-form-recognizer";
   *
   * const credential = new AzureKeyCredential("<API key>");
   * const client = new DocumentAnalysisClient(
   *   "https://<resource name>.cognitiveservices.azure.com",
   *   credential,
   * );
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
    this._tracing = createTracingClient({
      packageName: "@azure/ai-form-recognizer",
      packageVersion: SDK_VERSION,
      namespace: "Microsoft.CognitiveServices",
    });
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
   * ```ts snippet:ReadmeSamplePrebuiltReceipt
   * import { DefaultAzureCredential } from "@azure/identity";
   * import { DocumentAnalysisClient } from "@azure/ai-form-recognizer";
   * import { createReadStream } from "node:fs";
   * import { PrebuiltReceiptModel } from "../samples-dev/prebuilt/prebuilt-receipt.js";
   *
   * const credential = new DefaultAzureCredential();
   * const client = new DocumentAnalysisClient(
   *   "https://<resource name>.cognitiveservices.azure.com",
   *   credential,
   * );
   *
   * const path = "<path to a document>";
   * const readStream = createReadStream(path);
   *
   * // The PrebuiltReceiptModel `DocumentModel` instance encodes both the model ID and a stronger return type for the operation
   * const poller = await client.beginAnalyzeDocument(PrebuiltReceiptModel, readStream, {
   *   onProgress: ({ status }) => {
   *     console.log(`status: ${status}`);
   *   },
   * });
   *
   * const {
   *   documents: [receiptDocument],
   * } = await poller.pollUntilDone();
   *
   * // The fields of the document constitute the extracted receipt data.
   * const receipt = receiptDocument.fields;
   *
   * if (receipt === undefined) {
   *   throw new Error("Expected at least one receipt in analysis result.");
   * }
   *
   * console.log(`Receipt data (${receiptDocument.docType})`);
   * console.log("  Merchant Name:", receipt.merchantName?.value);
   *
   * // The items of the receipt are an example of a `DocumentArrayValue`
   * if (receipt.items !== undefined) {
   *   console.log("Items:");
   *   for (const { properties: item } of receipt.items.values) {
   *     console.log("- Description:", item.description?.value);
   *     console.log("  Total Price:", item.totalPrice?.value);
   *   }
   * }
   *
   * console.log("  Total:", receipt.total?.value);
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
   * ```ts snippet:ReadmeSamplePrebuiltReceipt
   * import { DefaultAzureCredential } from "@azure/identity";
   * import { DocumentAnalysisClient } from "@azure/ai-form-recognizer";
   * import { createReadStream } from "node:fs";
   * import { PrebuiltReceiptModel } from "../samples-dev/prebuilt/prebuilt-receipt.js";
   *
   * const credential = new DefaultAzureCredential();
   * const client = new DocumentAnalysisClient(
   *   "https://<resource name>.cognitiveservices.azure.com",
   *   credential,
   * );
   *
   * const path = "<path to a document>";
   * const readStream = createReadStream(path);
   *
   * // The PrebuiltReceiptModel `DocumentModel` instance encodes both the model ID and a stronger return type for the operation
   * const poller = await client.beginAnalyzeDocument(PrebuiltReceiptModel, readStream, {
   *   onProgress: ({ status }) => {
   *     console.log(`status: ${status}`);
   *   },
   * });
   *
   * const {
   *   documents: [receiptDocument],
   * } = await poller.pollUntilDone();
   *
   * // The fields of the document constitute the extracted receipt data.
   * const receipt = receiptDocument.fields;
   *
   * if (receipt === undefined) {
   *   throw new Error("Expected at least one receipt in analysis result.");
   * }
   *
   * console.log(`Receipt data (${receiptDocument.docType})`);
   * console.log("  Merchant Name:", receipt.merchantName?.value);
   *
   * // The items of the receipt are an example of a `DocumentArrayValue`
   * if (receipt.items !== undefined) {
   *   console.log("Items:");
   *   for (const { properties: item } of receipt.items.values) {
   *     console.log("- Description:", item.description?.value);
   *     console.log("  Total Price:", item.totalPrice?.value);
   *   }
   * }
   *
   * console.log("  Total:", receipt.total?.value);
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
    // eslint-disable-next-line @azure/azure-sdk/ts-naming-options
    options: AnalyzeDocumentOptions<unknown> = {},
  ): Promise<AnalysisPoller<unknown>> {
    return this._tracing.withSpan(
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
   * ```ts snippet:ReadmeSampleReceiptModelID_URL
   * import { DefaultAzureCredential } from "@azure/identity";
   * import {
   *   DocumentAnalysisClient,
   *   DocumentStringField,
   *   DocumentArrayField,
   *   DocumentObjectField,
   * } from "@azure/ai-form-recognizer";
   *
   * const credential = new DefaultAzureCredential();
   * const client = new DocumentAnalysisClient(
   *   "https://<resource name>.cognitiveservices.azure.com",
   *   credential,
   * );
   *
   * const poller = await client.beginAnalyzeDocumentFromUrl(
   *   "prebuilt-receipt",
   *   // The Document Intelligence service will access the following URL to a receipt image and extract data from it
   *   "https://raw.githubusercontent.com/Azure/azure-sdk-for-js/main/sdk/formrecognizer/ai-form-recognizer/assets/receipt/contoso-receipt.png",
   * );
   * poller.onProgress((state) => console.log("Operation:", state.modelId, state.status));
   *
   * const { documents } = await poller.pollUntilDone();
   *
   * const result = documents && documents[0];
   * if (result) {
   *   const receipt = result.fields;
   *   console.log("=== Receipt Information ===");
   *   console.log("Type:", result.docType);
   *   console.log("Merchant:", (receipt["MerchantName"] as DocumentStringField).value);
   *
   *   console.log("Items:");
   *   for (const { properties: item } of ((receipt["Items"] as DocumentArrayField).values ||
   *     []) as DocumentObjectField[]) {
   *     console.log("- Description:", (item["Description"] as DocumentStringField).value);
   *     console.log("  Total Price:", (item["TotalPrice"] as DocumentStringField).value);
   *   }
   * } else {
   *   throw new Error("Expected at least one receipt in the result.");
   * }
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
   * ```ts snippet:ReadmeSampleReceiptPrebuilt_URL
   * import { DefaultAzureCredential } from "@azure/identity";
   * import { DocumentAnalysisClient } from "@azure/ai-form-recognizer";
   * import { PrebuiltReceiptModel } from "../samples-dev/prebuilt/prebuilt-receipt.js";
   *
   * const credential = new DefaultAzureCredential();
   * const client = new DocumentAnalysisClient(
   *   "https://<resource name>.cognitiveservices.azure.com",
   *   credential,
   * );
   *
   * const poller = await client.beginAnalyzeDocumentFromUrl(
   *   PrebuiltReceiptModel,
   *   // The Document Intelligence service will access the following URL to a receipt image and extract data from it
   *   "https://raw.githubusercontent.com/Azure/azure-sdk-for-js/main/sdk/formrecognizer/ai-form-recognizer/assets/receipt/contoso-receipt.png",
   * );
   *
   * const {
   *   documents: [document],
   * } = await poller.pollUntilDone();
   *
   * // Use of PrebuiltModels.Receipt above (rather than the raw model ID), as it adds strong typing of the model's output
   * if (document) {
   *   const { merchantName, items, total } = document.fields;
   *
   *   console.log("=== Receipt Information ===");
   *   console.log("Type:", document.docType);
   *   console.log("Merchant:", merchantName && merchantName.value);
   *
   *   console.log("Items:");
   *   for (const item of (items && items.values) || []) {
   *     const { description, totalPrice } = item.properties;
   *
   *     console.log("- Description:", description && description.value);
   *     console.log("  Total Price:", totalPrice && totalPrice.value);
   *   }
   *
   *   console.log("Total:", total && total.value);
   * } else {
   *   throw new Error("Expected at least one receipt in the result.");
   * }
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
    // eslint-disable-next-line @azure/azure-sdk/ts-naming-options
    options: AnalyzeDocumentOptions<unknown> = {},
  ): Promise<AnalysisPoller<unknown>> {
    return this._tracing.withSpan(
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
  ): Promise<AnalysisPoller<unknown>> {
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

        if (contentType === "application/json") {
          return this._restClient.documentModels.analyzeDocument(initialModelId, contentType, {
            ...options,
            abortSignal,
            analyzeRequest,
          });
        } else {
          return this._restClient.documentModels.analyzeDocument(initialModelId, contentType, {
            ...options,
            abortSignal,
            analyzeRequest,
          });
        }
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
   * ```ts snippet:ReadmeSampleClassifyDocument_File
   * import { DefaultAzureCredential } from "@azure/identity";
   * import { DocumentAnalysisClient } from "@azure/ai-form-recognizer";
   * import { createReadStream } from "node:fs";
   *
   * const credential = new DefaultAzureCredential();
   * const client = new DocumentAnalysisClient(
   *   "https://<resource name>.cognitiveservices.azure.com",
   *   credential,
   * );
   *
   * const path = "<path to a document>";
   * const readStream = createReadStream(path);
   *
   * const poller = await client.beginClassifyDocument("<classifier id>", readStream);
   *
   * const result = await poller.pollUntilDone();
   *
   * if (result?.documents?.length === 0) {
   *   throw new Error("Failed to extract any documents.");
   * }
   *
   * for (const document of result.documents) {
   *   console.log(
   *     `Extracted a document with type '${document.docType}' on page ${document.boundingRegions?.[0].pageNumber} (confidence: ${document.confidence})`,
   *   );
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
    return this._tracing.withSpan(
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
   * ```ts snippet:ReadmeSampleClassifyDocument
   * import { DefaultAzureCredential } from "@azure/identity";
   * import { DocumentAnalysisClient } from "@azure/ai-form-recognizer";
   *
   * const credential = new DefaultAzureCredential();
   * const client = new DocumentAnalysisClient(
   *   "https://<resource name>.cognitiveservices.azure.com",
   *   credential,
   * );
   *
   * const documentUrl =
   *   "https://raw.githubusercontent.com/Azure/azure-sdk-for-js/main/sdk/formrecognizer/ai-form-recognizer/assets/invoice/Invoice_1.pdf";
   *
   * const poller = await client.beginClassifyDocumentFromUrl("<classifier id>", documentUrl);
   *
   * const result = await poller.pollUntilDone();
   *
   * if (result?.documents?.length === 0) {
   *   throw new Error("Failed to extract any documents.");
   * }
   *
   * for (const document of result.documents) {
   *   console.log(
   *     `Extracted a document with type '${document.docType}' on page ${document.boundingRegions?.[0].pageNumber} (confidence: ${document.confidence})`,
   *   );
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
    return this._tracing.withSpan(
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

        if (contentType === "application/json") {
          return this._restClient.documentClassifiers.classifyDocument(
            classifierId,
            contentType as any,
            {
              ...options,
              abortSignal,
              classifyRequest,
            },
          );
        } else {
          return this._restClient.documentClassifiers.classifyDocument(
            classifierId,
            contentType as any,
            {
              ...options,
              abortSignal,
              classifyRequest,
            },
          );
        }
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
      this._tracing.withSpan(
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
            this._tracing.withSpan(
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
            this._tracing.withSpan(
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
          this._tracing.withSpan(
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
):
  | ["application/json", AnalyzeDocumentRequest]
  | ["application/octet-stream", FormRecognizerRequestBody] {
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

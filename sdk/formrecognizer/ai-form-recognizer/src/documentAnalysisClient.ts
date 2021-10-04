// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { KeyCredential, TokenCredential } from "@azure/core-auth";
import { AnalyzeDocumentRequest, ContentType, GeneratedClient } from "./generated";
import {
  AnalysisOperationDefinition,
  AnalysisPoller,
  AnalyzeResult,
  DocumentAnalysisPollOperationState,
  FormRecognizerRequestBody,
  parseOperationLocation,
  toAnalyzedDocumentFromGenerated,
  toAnalyzeResultFromGenerated,
  toDocumentAnalysisPollOperationState,
} from "./lro/analyze";
import { lro } from "./lro/util/poller";
import { GenericDocumentResult, toGenericDocumentResult } from "./models/GenericDocumentResult";
import { LayoutResult, toLayoutResult } from "./models/LayoutResult";
import { AnalyzeDocumentsOptions } from "./options/AnalyzeDocumentsOptions";
import { DocumentAnalysisClientOptions } from "./options/FormRecognizerClientOptions";
import { DocumentModel, getMapper } from "./prebuilt/models";
import { identity, makeServiceClient } from "./util";

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
  }

  // #region Analysis

  /**
   * Extract data from an input using a model given by its unique ID.
   *
   * This operation supports custom as well as prebuilt models. For example, to use the prebuilt invoice model, provide
   * the model ID "prebuilt-invoice", or to use the simpler prebuilt layout model, provide the model ID
   * "prebuilt-layout".
   *
   * The fields produced in the `AnalyzeResponse` depend on the model that is used for analysis, and the values in any
   * extracted documents' fields depend on the document types in the model (if any) and their corresponding field
   * schemas.
   *
   * ### Examples
   *
   * This method supports both URLs (string) and streamable request bodies ({@link FormRecognizerRequestBody}) such as
   * Node.JS `ReadableStream` objects, browser `Blob`s, and `ArrayBuffer`s.
   *
   * #### From URL
   *
   * The Form Recognizer service will attempt to download a file using the submitted URL, so the URL must be accessible
   * from the public internet. For example, a SAS token can be used to grant read access to a blob in Azure Storage, and
   * the service will use the SAS-encoded URL to request the file.
   *
   * ```javascript
   * // the URL must be publicly accessible
   * const url = "<receipt document url>";
   *
   * // The model that is passed to the following function call determines the type of the eventual result. In the
   * // example, we will use the prebuilt receipt model, but you could use a custom model ID/name instead.
   * const poller = await client.beginAnalyzeDocuments("prebuilt-receipt", url);
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
   * #### From Request Body
   *
   * Alternatively, if the file is local (or in memory in the browser), a binary object can be uploaded. The following
   * example uses the Node.JS filesystem API.
   *
   * ```javascript
   * import * as fs from "fs";
   *
   * const file = fs.createReadStream("path/to/receipt.pdf");
   *
   * // The model that is passed to the following function call determines the type of the eventual result. In the
   * // example, we will use the prebuilt receipt model, but you could use a custom model ID/name instead.
   * const poller = await client.beginAnalyzeDocuments("prebuilt-receipt", file);
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
   * @param input - a URL (string) to an input document accessible from the public internet, or a
   *                {@link FormRecognizerRequestBody} that will be uploaded with the request
   * @param options - optional settings for the analysis operation and poller
   * @returns a long-running operation (poller) that will eventually produce an `AnalyzeResult`
   */
  public async beginAnalyzeDocuments(
    modelId: string,
    input: string | FormRecognizerRequestBody,
    // eslint-disable-next-line @azure/azure-sdk/ts-naming-options
    options?: AnalyzeDocumentsOptions
  ): Promise<AnalysisPoller>;
  /**
   * Extract data from an input using a model that has a known, strongly-typed document schema (a `DocumentModel`). It
   * is not currently possible to define a custom `DocumentModel` instance in the SDK, so only the models that are
   * provided as part of `PrebuiltModels` can be used with this method overload.
   *
   * See {@link PrebuiltModels}.
   *
   * The fields produced in the `AnalyzeResponse` depend on the model that is used for analysis. In TypeScript, the type
   * of the result for this method overload is inferred from the type of the input `DocumentModel`.
   *
   * ### Examples
   *
   * This method supports both URLs (string) and streamable request bodies ({@link FormRecognizerRequestBody}) such as
   * Node.JS `ReadableStream` objects, browser `Blob`s, and `ArrayBuffer`s.
   *
   * #### From URL
   *
   * The Form Recognizer service will attempt to download a file using the submitted URL, so the URL must be accessible
   * from the public internet. For example, a SAS token can be used to grant read access to a blob in Azure Storage, and
   * the service will use the SAS-encoded URL to request the file.
   *
   * ```javascript
   * import { PrebuiltModels } from "@azure/ai-form-recognizer";
   *
   * // the URL must be publicly accessible
   * const url = "<receipt document url>";
   *
   * // The model that is passed to the following function call determines the type of the eventual result. In the
   * // example, we will use the prebuilt receipt model.
   * const poller = await client.beginAnalyzeDocuments(PrebuiltModels.Receipt, url);
   *
   * // The result is a long-running operation (poller), which must itself be polled until the operation completes
   * const {
   *   pages, // pages extracted from the document, which contain lines and words
   *   tables, // extracted tables, organized into cells that contain their contents
   *   styles, // text styles (ex. handwriting) that were observed in the document
   *   keyValuePairs, // extracted pairs of elements  (directed associations from one element in the input to another)
   *   entities, // extracted entities in the input's content, which are categorized (ex. "Location" or "Organization")
   *
   *   documents // extracted documents (instances of one of the model's document types and its field schema)
   * } = await poller.pollUntilDone();
   *
   * // Extract the fields of the first document. These fields constitute a receipt, because we used the receipt model
   * const [{ fields: receipt }] = documents;
   *
   * // Since we used the strongly-typed PrebuiltModels.Receipt object instead of the "prebuilt-receipt" model ID
   * // string, the fields of the receipt are strongly-typed and have camelCase names (as opposed to PascalCase).
   * console.log("The type of this receipt is:", receipt.receiptType?.value);
   * ```
   *
   * #### From Request Body
   *
   * Alternatively, if the file is local (or in memory in the browser), a binary object can be uploaded. The following
   * example uses the Node.JS filesystem API.
   *
   * ```javascript
   * import * as fs from "fs";
   * import { PrebuiltModels } from "@azure/ai-form-recognizer";
   *
   * const file = fs.createReadStream("path/to/receipt.pdf");
   *
   * // The model that is passed to the following function call determines the type of the eventual result. In the
   * // example, we will use the prebuilt receipt model.
   * const poller = await client.beginAnalyzeDocuments(PrebuiltModels.Receipt, file);
   *
   * // The result is a long-running operation (poller), which must itself be polled until the operation completes
   * const {
   *   pages, // pages extracted from the document, which contain lines and words
   *   tables, // extracted tables, organized into cells that contain their contents
   *   styles, // text styles (ex. handwriting) that were observed in the document
   *   keyValuePairs, // extracted pairs of elements  (directed associations from one element in the input to another)
   *   entities, // extracted entities in the input's content, which are categorized (ex. "Location" or "Organization")
   *
   *   documents // extracted documents (instances of one of the model's document types and its field schema)
   * } = await poller.pollUntilDone();
   *
   * // Extract the fields of the first document. These fields constitute a receipt, because we used the receipt model
   * const [{ fields: receipt }] = documents;
   *
   * // Since we used the strongly-typed PrebuiltModels.Receipt object instead of the "prebuilt-receipt" model ID
   * // string, the fields of the receipt are strongly-typed and have camelCase names (as opposed to PascalCase).
   * console.log("The type of this receipt is:", receipt.receiptType?.value);
   * ```
   *
   * @param model - a {@link DocumentModel} representing the model to use for analysis and the expected output type
   * @param input - a URL (string) to an input document accessible from the public internet, or a
   *                {@link FormRecognizerRequestBody} that will be uploaded with the request
   * @param options - optional settings for the analysis operation and poller
   * @returns a long-running operation (poller) that will eventually produce an `AnalyzeResult` with documents that have
   *          the result type associated with the input model
   */
  public async beginAnalyzeDocuments<Document>(
    model: DocumentModel<Document>,
    input: string | FormRecognizerRequestBody,
    // eslint-disable-next-line @azure/azure-sdk/ts-naming-options
    options?: AnalyzeDocumentsOptions<AnalyzeResult<Document>>
  ): Promise<AnalysisPoller<AnalyzeResult<Document>>>;
  public async beginAnalyzeDocuments(
    model: string | DocumentModel<unknown>,
    input: string | FormRecognizerRequestBody,
    options: AnalyzeDocumentsOptions<unknown> = {}
  ): Promise<AnalysisPoller<unknown>> {
    const initialModelId = typeof model === "string" ? model : model.modelId;

    const analysisPoller = this.createAnalysisPoller<unknown>(input, {
      initialModelId,
      options,
      transformResult: (result) =>
        toAnalyzeResultFromGenerated(
          result,
          typeof model === "string" ? toAnalyzedDocumentFromGenerated : getMapper(model)
        ),
    });

    return analysisPoller;
  }

  /**
   * Extracts only the layout (basic OCR information) from an input file. The layout result includes information about
   * the pages and their text contents, extracted tables, and identified text styles.
   *
   * ### Examples
   *
   * This method supports both URLs (string) and streamable request bodies ({@link FormRecognizerRequestBody}) such as
   * Node.JS `ReadableStream` objects, browser `Blob`s, and `ArrayBuffer`s.
   *
   * #### From URL
   *
   * The Form Recognizer service will attempt to download a file using the submitted URL, so the URL must be accessible
   * from the public internet. For example, a SAS token can be used to grant read access to a blob in Azure Storage, and
   * the service will use the SAS-encoded URL to request the file.
   *
   * ```javascript
   * // the URL must be publicly accessible
   * const url = "<document url>";
   *
   * const poller = await client.beginExtractLayout(url);
   *
   * // The result is a long-running operation (poller), which must itself be polled until the operation completes
   * const {
   *   pages, // pages extracted from the document, which contain lines and words
   *   tables, // extracted tables, organized into cells that contain their contents
   *   styles // text styles (ex. handwriting) that were observed in the document
   * } = await poller.pollUntilDone();
   * ```
   *
   * #### From Request Body
   *
   * Alternatively, if the file is local (or in memory in the browser), a binary object can be uploaded. The following
   * example uses the Node.JS filesystem API.
   *
   * ```javascript
   * import * as fs from "fs";
   *
   * const file = fs.createReadStream("path/to/file.pdf");
   *
   * const poller = await client.beginExtractLayout(file);
   *
   * // The result is a long-running operation (poller), which must itself be polled until the operation completes
   * const {
   *   pages, // pages extracted from the document, which contain lines and words
   *   tables, // extracted tables, organized into cells that contain their contents
   *   styles // text styles (ex. handwriting) that were observed in the document
   * } = await poller.pollUntilDone();
   * ```
   *
   * @param input - a URL (string) to an input document accessible from the public internet, or a
   *                {@link FormRecognizerRequestBody} that will be uploaded with the request
   * @param options - optional settings for the analysis operation and poller
   * @returns a long-running operation (poller) that will eventually produce a layout result or an error
   */
  public async beginExtractLayout(
    input: string | FormRecognizerRequestBody,
    // eslint-disable-next-line @azure/azure-sdk/ts-naming-options
    options: AnalyzeDocumentsOptions<LayoutResult> = {}
  ): Promise<AnalysisPoller<LayoutResult>> {
    return this.createAnalysisPoller(input, {
      initialModelId: "prebuilt-layout",
      options,
      transformResult: (res) => toLayoutResult(toAnalyzeResultFromGenerated(res, identity)),
    });
  }

  /**
   * Extracts generic document information from an input file. The generic document result includes the information from
   * layout analysis (pages, tables, and styles) as well as extracted key-value pairs and entities.
   *
   * ### Examples
   *
   * This method supports both URLs (string) and streamable request bodies ({@link FormRecognizerRequestBody}) such as
   * Node.JS `ReadableStream` objects, browser `Blob`s, and `ArrayBuffer`s.
   *
   * #### From URL
   *
   * The Form Recognizer service will attempt to download a file using the submitted URL, so the URL must be accessible
   * from the public internet. For example, a SAS token can be used to grant read access to a blob in Azure Storage, and
   * the service will use the SAS-encoded URL to request the file.
   *
   * ```javascript
   * // the URL must be publicly accessible
   * const url = "<document url>";
   *
   * const poller = await client.beginExtractGenericDocument(url);
   *
   * // The result is a long-running operation (poller), which must itself be polled until the operation completes
   * const {
   *   // the operation produces the fields from the layout operation
   *   pages, // pages extracted from the document, which contain lines and words
   *   tables, // extracted tables, organized into cells that contain their contents
   *   styles, // text styles (ex. handwriting) that were observed in the document
   *
   *   // it also produces the following fields in addition
   *   keyValuePairs, // extracted pairs of elements  (directed associations from one element in the input to another)
   *   entities // extracted entities in the input's content, which are categorized (ex. "Location" or "Organization")
   * } = await poller.pollUntilDone();
   * ```
   *
   * #### From Request Body
   *
   * Alternatively, if the file is local (or in memory in the browser), a binary object can be uploaded. The following
   * example uses the Node.JS filesystem API.
   *
   * ```javascript
   * import * as fs from "fs";
   *
   * const file = fs.createReadStream("path/to/file.pdf");
   *
   * const poller = await client.beginExtractGenericDocument(file);
   *
   * // The result is a long-running operation (poller), which must itself be polled until the operation completes
   * const {
   *   // the operation produces the fields from the layout operation
   *   pages, // pages extracted from the document, which contain lines and words
   *   tables, // extracted tables, organized into cells that contain their contents
   *   styles, // text styles (ex. handwriting) that were observed in the document
   *
   *   // it also produces the following fields in addition
   *   keyValuePairs, // extracted pairs of elements  (directed associations from one element in the input to another)
   *   entities // extracted entities in the input's content, which are categorized (ex. "Location" or "Organization")
   * } = await poller.pollUntilDone();
   * ```
   *
   * @param input - a URL (string) to an input document accessible from the public internet, or a
   *                {@link FormRecognizerRequestBody} that will be uploaded with the request
   * @param options - optional settings for the analysis operation and poller
   * @returns a long-running operation (poller) that will eventually produce a generic document result or an error
   */
  public async beginExtractGenericDocument(
    input: string | FormRecognizerRequestBody,
    // eslint-disable-next-line @azure/azure-sdk/ts-naming-options
    options: AnalyzeDocumentsOptions<GenericDocumentResult> = {}
  ): Promise<AnalysisPoller<GenericDocumentResult>> {
    return this.createAnalysisPoller(input, {
      initialModelId: "prebuilt-document",
      options,
      transformResult: (res) =>
        toGenericDocumentResult(toAnalyzeResultFromGenerated(res, identity)),
    });
  }

  /**
   * Create an LRO poller that handles analysis operations.
   *
   * This is the meat of all analysis polling operations.
   *
   * @internal
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

    const toInit =
      // If the user gave us a stored token, we'll poll it again
      resumeFrom !== undefined
        ? async () => {
            const { operationId, modelId } = JSON.parse(resumeFrom) as {
              operationId: string;
              modelId: string;
            };

            const res = await this._restClient.getAnalyzeDocumentResult(
              modelId,
              operationId,
              definition.options
            );

            return toDocumentAnalysisPollOperationState(definition, modelId, operationId, res);
          }
        : // Otherwise, we'll start a new operation from the initialModelId
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

            const [extractedModelId, operationId] = parseOperationLocation(operationLocation);

            const result = await this._restClient.getAnalyzeDocumentResult(
              extractedModelId,
              operationId,
              definition.options
            );

            return toDocumentAnalysisPollOperationState(
              definition,
              extractedModelId,
              operationId,
              result
            );
          };

    const poller = await lro<Result, DocumentAnalysisPollOperationState<Result>>(
      {
        init: toInit,
        poll: async ({ operationId, modelId }) => {
          const res = await this._restClient.getAnalyzeDocumentResult(
            modelId,
            operationId,
            definition.options
          );

          return toDocumentAnalysisPollOperationState(definition, modelId, operationId, res);
        },
        serialize: ({ operationId, modelId }) => JSON.stringify({ modelId, operationId }),
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

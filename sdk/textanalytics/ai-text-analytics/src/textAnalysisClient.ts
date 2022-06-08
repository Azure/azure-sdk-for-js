// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  AnalyzeActionName,
  AnalyzeActionParameters,
  AnalyzeBatchAction,
  AnalyzeBatchOperationState,
  AnalyzeBatchPoller,
  AnalyzeResult,
  BeginAnalyzeBatchOptions,
  PagedAnalyzeBatchResult,
  RestoreAnalyzeBatchPollerOptions,
  TextAnalysisClientOptions,
  TextAnalysisOperationOptions,
} from "./models";
import {
  AnalyzeBatchActionUnion,
  LanguageDetectionInput,
  TextDocumentInput,
} from "./generated/models";
import { DEFAULT_COGNITIVE_SCOPE, SDK_VERSION } from "./constants";
import {
  InternalPipelineOptions,
  bearerTokenAuthenticationPolicy,
} from "@azure/core-rest-pipeline";
import { KeyCredential, TokenCredential, isTokenCredential } from "@azure/core-auth";
import { LongRunningOperation, LroEngine } from "@azure/core-lro";
import { TracingClient, createTracingClient } from "@azure/core-tracing";
import {
  convertToLanguageDetectionInput,
  convertToTextDocumentInput,
  getOperationOptions,
  isStringArray,
} from "./util";
import {
  createAnalyzeBatchLro,
  createCancelOperation,
  createCreateAnalyzeBatchPollerLro,
  createUpdateAnalyzeState,
  getDocsFromState,
  processAnalyzeResult,
} from "./lro";
import { throwError, transformActionResult } from "./transforms";
import { GeneratedClient } from "./generated/generatedClient";
import { logger } from "./logger";
import { textAnalyticsAzureKeyCredentialPolicy } from "./azureKeyCredentialPolicy";

/**
 * A client for interacting with the text analysis features in Azure Cognitive
 * Language Service.
 *
 * The client needs the endpoint of a Language resource and an authentication
 * method such as an API key or AAD. The API key and endpoint can be found in
 * the Language resource page in the Azure portal. They will be located in the
 * resource's Keys and Endpoint page, under Resource Management.
 *
 * ### Examples for authentication:
 *
 * #### API Key
 *
 * ```js
 * import { TextAnalysisClient, AzureKeyCredential } from "@azure/ai-text-analytics";
 *
 * const endpoint = "https://<resource name>.cognitiveservices.azure.com";
 * const credential = new AzureKeyCredential("<api key>");
 *
 * const client = new TextAnalysisClient(endpoint, credential);
 * ```
 *
 * #### Azure Active Directory
 *
 * See the [`@azure/identity`](https://npmjs.com/package/\@azure/identity)
 * package for more information about authenticating with Azure Active Directory.
 *
 * ```js
 * import { TextAnalysisClient } from "@azure/ai-text-analytics";
 * import { DefaultAzureCredential } from "@azure/identity";
 *
 * const endpoint = "https://<resource name>.cognitiveservices.azure.com";
 * const credential = new DefaultAzureCredential();
 *
 * const client = new TextAnalysisClient(endpoint, credential);
 * ```
 */
export class TextAnalysisClient {
  private readonly _client: GeneratedClient;
  private readonly _tracing: TracingClient;
  private readonly defaultCountryHint: string;
  private readonly defaultLanguage: string;

  /**
   * Creates an instance of TextAnalysisClient with the endpoint of a Language
   * resource and an authentication method such as an API key or AAD.
   *
   * The API key and endpoint can be found in the Language resource page in the
   * Azure portal. They will be located in the resource's Keys and Endpoint page,
   * under Resource Management.
   *
   * ### Example
   *
   * ```js
   * import { TextAnalysisClient, AzureKeyCredential } from "@azure/ai-text-analytics";
   *
   * const endpoint = "https://<resource name>.cognitiveservices.azure.com";
   * const credential = new AzureKeyCredential("<api key>");
   *
   * const client = new TextAnalysisClient(endpoint, credential);
   * ```
   *
   * @param endpointUrl - The URL to the endpoint of a Cognitive Language Service resource
   * @param credential - Key credential to be used to authenticate requests to the service.
   * @param options - Used to configure the TextAnalytics client.
   */
  constructor(endpointUrl: string, credential: KeyCredential, options?: TextAnalysisClientOptions);
  /**
   * Creates an instance of TextAnalysisClient with the endpoint of a Language
   * resource and an authentication method such as an API key or AAD.
   *
   * The API key and endpoint can be found in the Language resource page in the
   * Azure portal. They will be located in the resource's Keys and Endpoint page,
   * under Resource Management.
   *
   * ### Example
   *
   * See the [`@azure/identity`](https://npmjs.com/package/\@azure/identity)
   * package for more information about authenticating with Azure Active Directory.
   *
   * ```js
   * import { TextAnalysisClient } from "@azure/ai-text-analytics";
   * import { DefaultAzureCredential } from "@azure/identity";
   *
   * const endpoint = "https://<resource name>.cognitiveservices.azure.com";
   * const credential = new DefaultAzureCredential();
   *
   * const client = new TextAnalysisClient(endpoint, credential);
   * ```
   *
   * @param endpointUrl - The URL to the endpoint of a Cognitive Language Service resource
   * @param credential - Token credential to be used to authenticate requests to the service.
   * @param options - Used to configure the TextAnalytics client.
   */
  constructor(
    endpointUrl: string,
    credential: TokenCredential,
    options?: TextAnalysisClientOptions
  );
  constructor(
    endpointUrl: string,
    credential: TokenCredential | KeyCredential,
    options: TextAnalysisClientOptions = {}
  ) {
    const { defaultCountryHint = "us", defaultLanguage = "en", ...pipelineOptions } = options;
    this.defaultCountryHint = defaultCountryHint;
    this.defaultLanguage = defaultLanguage;

    const internalPipelineOptions: InternalPipelineOptions = {
      ...pipelineOptions,
      ...{
        loggingOptions: {
          logger: logger.info,
          additionalAllowedHeaderNames: ["x-ms-correlation-request-id", "x-ms-request-id"],
        },
      },
    };

    this._client = new GeneratedClient(endpointUrl, internalPipelineOptions);

    const authPolicy = isTokenCredential(credential)
      ? bearerTokenAuthenticationPolicy({ credential, scopes: DEFAULT_COGNITIVE_SCOPE })
      : textAnalyticsAzureKeyCredentialPolicy(credential);

    this._client.pipeline.addPolicy(authPolicy);
    this._tracing = createTracingClient({
      packageName: "@azure/ai-text-analytics",
      packageVersion: SDK_VERSION,
      namespace: "Microsoft.CognitiveServices",
    });
  }

  /**
   * Runs a predictive model to determine the language that the passed-in
   * input strings are written in, and returns, for each one, the detected
   * language as well as a score indicating the model's confidence that the
   * inferred language is correct.  Scores close to 1 indicate high certainty in
   * the result.  120 languages are supported.
   *
   * See {@link https://docs.microsoft.com//azure/cognitive-services/language-service/concepts/data-limits}
   * for data limits.
   *
   * ### Examples
   *
   * #### Language detection
   *
   * ```js
   * const documents = [<input strings>];
   * const countryHint = "us";
   * const results = await client.analyze("LanguageDetection", documents, countryHint);
   *
   * for (let i = 0; i < results.length; i++) {
   *   const result = results[i];
   *   if (result.error) {
   *     // a document has an error instead of results
   *   } else {
   *     const { name, confidenceScore, iso6391Name } = result.primaryLanguage;
   *   }
   * }
   * ```
   *
   * See {@link https://docs.microsoft.com//azure/cognitive-services/language-service/language-detection/overview}
   * for more information on language detection.
   *
   * @param actionName - the name of the action to be performed on the input
   *   documents, see ${@link AnalyzeActionName}
   * @param documents - the input documents to be analyzed
   * @param options - optional action parameters and settings for the operation
   *
   * @returns an array of results where each element contains the primary language
   *   for the corresponding input document.
   */
  public async analyze<ActionName extends "LanguageDetection">(
    actionName: ActionName,
    documents: LanguageDetectionInput[],
    options?: AnalyzeActionParameters<ActionName> & TextAnalysisOperationOptions
  ): Promise<AnalyzeResult<ActionName>>;
  /**
   * Runs a predictive model to determine the language that the passed-in
   * input strings are written in, and returns, for each one, the detected
   * language as well as a score indicating the model's confidence that the
   * inferred language is correct.  Scores close to 1 indicate high certainty in
   * the result.  120 languages are supported.
   *
   * See {@link https://docs.microsoft.com//azure/cognitive-services/language-service/concepts/data-limits}
   * for data limits.
   *
   * ### Examples
   *
   * #### Language detection
   *
   * ```js
   * const documents = [<input strings>];
   * const countryHint = "us";
   * const results = await client.analyze("LanguageDetection", documents, countryHint);
   *
   * for (const result of results) {
   *   if (result.error) {
   *     // a document has an error instead of results
   *   } else {
   *     const { name, confidenceScore, iso6391Name } = result.primaryLanguage;
   *   }
   * }
   * ```
   *
   * See {@link https://docs.microsoft.com//azure/cognitive-services/language-service/language-detection/overview}
   * for more information on language detection.
   *
   * @param actionName - the name of the action to be performed on the input
   *   documents, see ${@link AnalyzeActionName}
   * @param documents - the input documents to be analyzed
   * @param countryHint - Indicates the country of origin for all of
   *   the input strings to assist the model in predicting the language they are
   *   written in.  If unspecified, this value will be set to the default
   *   country hint in `TextAnalysisClientOptions`. If set to an empty string,
   *   or the string "none", the service will apply a model where the country is
   *   explicitly unset. The same country hint is applied to all strings in the
   *   input collection.
   * @param options - optional action parameters and settings for the operation
   *
   * @returns an array of results where each element contains the primary language
   *   for the corresponding input document.
   */
  public async analyze<ActionName extends "LanguageDetection">(
    actionName: ActionName,
    documents: string[],
    countryHint?: string,
    options?: AnalyzeActionParameters<ActionName> & TextAnalysisOperationOptions
  ): Promise<AnalyzeResult<ActionName>>;
  /**
   * Runs a predictive model to perform the action of choice on the input
   * documents. See ${@link AnalyzeActionName} for a list of supported
   * actions.
   *
   * The layout of each item in the results array depends on the action chosen.
   * For example, each PIIEntityRecognition document result consists of both
   * `entities` and `redactedText` where the former is a list of all Pii entities
   * in the text and the latter is the original text after all such Pii entities
   * have been redacted from it.
   *
   * See {@link https://docs.microsoft.com//azure/cognitive-services/language-service/concepts/data-limits}
   * for data limits.
   *
   * ### Examples
   *
   * #### Opinion mining
   *
   * ```js
   * const documents = [{
   *  id: "1",
   *  text: "The food and service aren't the best",
   *  language: "en"
   * }];
   * const results = await client.analyze("SentimentAnalysis", documents, {
   *   includeOpinionMining: true,
   * });
   *
   * for (const result of results) {
   *   if (result.error) {
   *     // a document has an error instead of results
   *   } else {
   *     const { sentiment, confidenceScores, sentences } = result;
   *     for (const { sentiment, confidenceScores, opinions } of sentences) {
   *       for (const { target, assessments } of opinions) {
   *         const { text, sentiment, confidenceScores } = target;
   *         for (const { text, sentiment } of assessments) {
   *           // Do something
   *         }
   *       }
   *     }
   *   }
   * }
   * ```
   *
   * See {@link https://docs.microsoft.com//azure/cognitive-services/language-service/sentiment-opinion-mining/overview}
   * for more information on opinion mining.
   *
   * #### Personally identifiable information
   *
   * ```js
   * const documents = [<input documents>];
   * const categoriesFilter = [KnownPiiCategory.USSocialSecurityNumber];
   * const domainFilter = KnownPiiDomain.Phi;
   * const results = await client.analyze("PiiEntityRecognition", documents, {
   *   domainFilter, categoriesFilter
   * });
   *
   * for (const result of results) {
   *   if (result.error) {
   *     // a document has an error instead of results
   *   } else {
   *     const { entities, redactedText } = result;
   *     for (const { text, category, confidenceScore, length, offset } of entities) {
   *       // Do something
   *     }
   *   }
   * }
   * ```
   *
   * See {@link https://docs.microsoft.com//azure/cognitive-services/language-service/personally-identifiable-information/overview}
   * for more information on personally identifiable information.
   *
   * @param actionName - the name of the action to be performed on the input
   *   documents, see ${@link AnalyzeActionName}
   * @param documents - the input documents to be analyzed
   * @param options - optional action parameters and settings for the operation
   *
   * @returns an array of results corresponding to the input documents
   */
  public async analyze<ActionName extends AnalyzeActionName = AnalyzeActionName>(
    actionName: ActionName,
    documents: TextDocumentInput[],
    options?: AnalyzeActionParameters<ActionName> & TextAnalysisOperationOptions
  ): Promise<AnalyzeResult<ActionName>>;

  /**
   * Runs a predictive model to perform the action of choice on the input
   * strings. See ${@link AnalyzeActionName} for a list of supported
   * actions.
   *
   * The layout of each item in the results array depends on the action chosen.
   * For example, each PIIEntityRecognition document result consists of both
   * `entities` and `redactedText` where the former is a list of all Pii entities
   * in the text and the latter is the original text after all such Pii entities
   * have been redacted from it.
   *
   * See {@link https://docs.microsoft.com//azure/cognitive-services/language-service/concepts/data-limits}
   * for data limits.
   *
   * ### Examples
   *
   * #### Opinion mining
   *
   * ```js
   * const documents = ["The food and service aren't the best"];
   * const results = await client.analyze("SentimentAnalysis", documents, {
   *   includeOpinionMining: true,
   * });
   *
   * for (const result of results) {
   *   if (result.error) {
   *     // a document has an error instead of results
   *   } else {
   *     const { sentiment, confidenceScores, sentences } = result;
   *     for (const { sentiment, confidenceScores, opinions } of sentences) {
   *       for (const { target, assessments } of opinions) {
   *         const { text, sentiment, confidenceScores } = target;
   *         for (const { text, sentiment } of assessments) {
   *           // Do something
   *         }
   *       }
   *     }
   *   }
   * }
   * ```
   *
   * See {@link https://docs.microsoft.com//azure/cognitive-services/language-service/sentiment-opinion-mining/overview}
   * for more information on opinion mining.
   *
   * #### Personally identifiable information
   *
   * ```js
   * const documents = [<input strings>];
   * const languageHint = "en";
   * const categoriesFilter = [KnownPiiCategory.USSocialSecurityNumber];
   * const domainFilter = KnownPiiDomain.Phi;
   * const results = await client.analyze("PiiEntityRecognition", documents, languageHint, {
   *   domainFilter, categoriesFilter
   * });
   *
   * for (const result of results) {
   *   if (result.error) {
   *     // a document has an error instead of results
   *   } else {
   *     const { entities, redactedText } = result;
   *     for (const { text, category, confidenceScore, length, offset } of entities) {
   *       // Do something
   *     }
   *   }
   * }
   * ```
   *
   * See {@link https://docs.microsoft.com//azure/cognitive-services/language-service/personally-identifiable-information/overview}
   * for more information on personally identifiable information.
   *
   * @param actionName - the name of the action to be performed on the input
   *   documents, see ${@link AnalyzeActionName}
   * @param documents - the input documents to be analyzed
   * @param languageCode - the code of the language that all the input strings are
   *    written in. If unspecified, this value will be set to the default
   *    language in `TextAnalysisClientOptions`. If set to an empty string,
   *    the service will apply a model where the language is explicitly set to
   *    "None". Language support varies per action, for example, more information
   *    about the languages supported for Entity Recognition actions can be
   *    found in {@link https://docs.microsoft.com//azure/cognitive-services/language-service/named-entity-recognition/language-support}
   * @param options - optional action parameters and settings for the operation
   *
   * @returns an array of results corresponding to the input documents
   */
  public async analyze<ActionName extends AnalyzeActionName = AnalyzeActionName>(
    actionName: ActionName,
    documents: string[],
    languageCode?: string,
    options?: AnalyzeActionParameters<ActionName> & TextAnalysisOperationOptions
  ): Promise<AnalyzeResult<ActionName>>;
  // implementation
  public async analyze<ActionName extends AnalyzeActionName = AnalyzeActionName>(
    actionName: ActionName,
    documents: string[] | LanguageDetectionInput[] | TextDocumentInput[],
    languageOrCountryHintOrOptions?:
      | string
      | (AnalyzeActionParameters<ActionName> & TextAnalysisOperationOptions),
    options?: AnalyzeActionParameters<ActionName> & TextAnalysisOperationOptions
  ): Promise<AnalyzeResult<ActionName>> {
    let realOptions: AnalyzeActionParameters<ActionName> & TextAnalysisOperationOptions;

    if (documents.length === 0) {
      throw new Error("'documents' must be a non-empty array");
    }

    let realInputs: LanguageDetectionInput[] | TextDocumentInput[];
    if (isStringArray(documents)) {
      if (actionName === "LanguageDetection") {
        realInputs = convertToLanguageDetectionInput(
          documents,
          typeof languageOrCountryHintOrOptions === "string"
            ? languageOrCountryHintOrOptions
            : this.defaultCountryHint
        );
      } else {
        realInputs = convertToTextDocumentInput(
          documents,
          typeof languageOrCountryHintOrOptions === "string"
            ? languageOrCountryHintOrOptions
            : this.defaultLanguage
        );
      }
      realOptions = options || ({} as any);
    } else {
      realInputs = documents;
      realOptions =
        (languageOrCountryHintOrOptions as AnalyzeActionParameters<ActionName> &
          TextAnalysisOperationOptions) || {};
    }
    const { options: operationOptions, rest: action } = getOperationOptions(realOptions);
    return this._tracing.withSpan(
      "TextAnalysisClient.analyze",
      operationOptions,
      async (updatedOptions: TextAnalysisOperationOptions) =>
        throwError(
          this._client
            .analyze(
              {
                kind: actionName,
                analysisInput: {
                  documents: realInputs,
                },
                parameters: action,
              } as any,
              updatedOptions
            )
            .then(
              (result) =>
                transformActionResult(actionName, realInputs, result) as AnalyzeResult<ActionName>
            )
        )
    );
  }

  /**
   * Performs an array (batch) of actions on the input documents. Each action has
   * a `kind` field that specifies the nature of the action. See ${@link AnalyzeBatchActionNames}
   * for a list of supported actions. In addition to `kind`, actions could also
   * have other parameters such as `disableServiceLogs` and `modelVersion`.
   *
   * The results array contains the results for those input actions where each
   * item also has a `kind` field that specifies the type of the results.
   *
   * See {@link https://docs.microsoft.com//azure/cognitive-services/language-service/concepts/data-limits}
   * for data limits.
   *
   * ### Examples
   *
   * #### Key phrase extraction and Pii entity recognition
   *
   * ```js
   * const poller = await client.beginAnalyzeBatch(
   *  [{ kind: "KeyPhraseExtraction" }, { kind: "PiiEntityRecognition" }],
   *  documents
   * );
   * const actionResults = await poller.pollUntilDone();
   *
   * for await (const actionResult of actionResults) {
   *  if (actionResult.error) {
   *    throw new Error(`Unexpected error`);
   *  }
   *  switch (actionResult.kind) {
   *    case "KeyPhraseExtraction": {
   *      for (const doc of actionResult.results) {
   *        // do something
   *      }
   *      break;
   *    }
   *    case "PiiEntityRecognition": {
   *      for (const doc of actionResult.results) {
   *        // do something
   *      }
   *      break;
   *    }
   *  }
   * }
   * ```
   *
   * @param actions - an array of actions that will be run on the input documents
   * @param documents - the input documents to be analyzed
   * @param languageCode - the code of the language that all the input strings are
   *    written in. If unspecified, this value will be set to the default
   *    language in `TextAnalysisClientOptions`. If set to an empty string,
   *    the service will apply a model where the language is explicitly set to
   *    "None". Language support varies per action, for example, more information
   *    about the languages supported for Entity Recognition actions can be
   *    found in {@link https://docs.microsoft.com//azure/cognitive-services/language-service/named-entity-recognition/language-support}
   * @param options - optional settings for the operation
   *
   * @returns an array of results corresponding to the input actions
   */
  async beginAnalyzeBatch(
    actions: AnalyzeBatchAction[],
    documents: string[],
    languageCode?: string,
    options?: BeginAnalyzeBatchOptions
  ): Promise<AnalyzeBatchPoller>;
  /**
   * Performs an array (batch) of actions on the input documents. Each action has
   * a `kind` field that specifies the nature of the action. See ${@link AnalyzeBatchActionNames}
   * for a list of supported actions. In addition to `kind`, actions could also
   * have other parameters such as `disableServiceLogs` and `modelVersion`.
   *
   * The results array contains the results for those input actions where each
   * item also has a `kind` field that specifies the type of the results.
   *
   * See {@link https://docs.microsoft.com//azure/cognitive-services/language-service/concepts/data-limits}
   * for data limits.
   *
   * ### Examples
   *
   * #### Keyphrase extraction and Pii entity recognition
   *
   * ```js
   * const poller = await client.beginAnalyzeBatch(
   *  [{ kind: "KeyPhraseExtraction" }, { kind: "PiiEntityRecognition" }],
   *  documents
   * );
   * const actionResults = await poller.pollUntilDone();
   *
   * for await (const actionResult of actionResults) {
   *  if (actionResult.error) {
   *    throw new Error(`Unexpected error`);
   *  }
   *  switch (actionResult.kind) {
   *    case "KeyPhraseExtraction": {
   *      for (const doc of actionResult.results) {
   *        // do something
   *      }
   *      break;
   *    }
   *    case "PiiEntityRecognition": {
   *      for (const doc of actionResult.results) {
   *        // do something
   *      }
   *      break;
   *    }
   *  }
   * }
   * ```
   *
   * @param actions - an array of actions that will be run on the input documents
   * @param documents - the input documents to be analyzed
   * @param options - optional settings for the operation
   *
   * @returns an array of results corresponding to the input actions
   */
  async beginAnalyzeBatch(
    actions: AnalyzeBatchAction[],
    documents: TextDocumentInput[],
    options?: BeginAnalyzeBatchOptions
  ): Promise<AnalyzeBatchPoller>;
  // implementation
  async beginAnalyzeBatch(
    actions: AnalyzeBatchAction[],
    documents: TextDocumentInput[] | string[],
    languageOrOptions?: BeginAnalyzeBatchOptions | string,
    options: BeginAnalyzeBatchOptions = {}
  ): Promise<AnalyzeBatchPoller> {
    let realOptions: BeginAnalyzeBatchOptions;
    let realInputs: TextDocumentInput[];

    if (!Array.isArray(documents) || documents.length === 0) {
      throw new Error("'documents' must be a non-empty array");
    }

    if (isStringArray(documents)) {
      const language = (languageOrOptions as string) || this.defaultLanguage;
      realInputs = convertToTextDocumentInput(documents, language);
      realOptions = options;
    } else {
      realInputs = documents;
      realOptions = languageOrOptions as BeginAnalyzeBatchOptions;
    }
    const realActions = actions.map(
      ({ kind, actionName, ...rest }): AnalyzeBatchActionUnion => ({
        kind,
        actionName,
        parameters: rest,
      })
    );
    const { includeStatistics, updateIntervalInMs, displayName, ...rest } = realOptions;
    const lro = createAnalyzeBatchLro({
      client: this._client,
      commonOptions: rest,
      documents: realInputs,
      initialRequestOptions: { displayName },
      pollRequestOptions: { includeStatistics },
      tasks: realActions,
      tracing: this._tracing,
    });

    const poller = new LroEngine<PagedAnalyzeBatchResult, AnalyzeBatchOperationState>(
      lro as LongRunningOperation<PagedAnalyzeBatchResult>,
      {
        intervalInMs: updateIntervalInMs,
        processResult: processAnalyzeResult({
          client: this._client,
          tracing: this._tracing,
          documents: realInputs,
          opOptions: { ...rest, includeStatistics },
        }),
        updateState: createUpdateAnalyzeState(realInputs),
        cancel: createCancelOperation({
          client: this._client,
          tracing: this._tracing,
          options: rest,
        }),
      }
    );

    await poller.poll();
    return poller;
  }

  /**
   * Creates a poller from the serialized state of another poller. This can be
   * useful when you want to create pollers on a different host or a poller
   * needs to be constructed after the original one is not in scope.
   *
   * @param serializedState - the serialized state of another poller. It is the
   *                          result of `poller.toString()`
   * @param options - optional settings for the operation
   *
   * # Example
   *
   * `client.beginAnalyzeBatch` returns a promise that will resolve to a poller.
   * The state of the poller can be serialized and used to create another as follows:
   *
   * ```js
   * const serializedState = poller.toString();
   * const rehydratedPoller = await client.createAnalyzeBatchPoller(serializedState);
   * const actionResults = await rehydratedPoller.pollUntilDone();
   * ```
   */
  async restoreAnalyzeBatchPoller(
    serializedState: string,
    options?: RestoreAnalyzeBatchPollerOptions
  ): Promise<AnalyzeBatchPoller>;
  // implementation
  async restoreAnalyzeBatchPoller(
    serializedState: string,
    options: RestoreAnalyzeBatchPollerOptions = {}
  ): Promise<AnalyzeBatchPoller> {
    const { includeStatistics, updateIntervalInMs, ...rest } = options;
    const documents = getDocsFromState(serializedState);
    const lro = createCreateAnalyzeBatchPollerLro({
      client: this._client,
      options: { ...rest, includeStatistics },
      tracing: this._tracing,
    });

    const poller = new LroEngine<PagedAnalyzeBatchResult, AnalyzeBatchOperationState>(
      lro as LongRunningOperation<PagedAnalyzeBatchResult>,
      {
        intervalInMs: updateIntervalInMs,
        resumeFrom: serializedState,
        processResult: processAnalyzeResult({
          client: this._client,
          tracing: this._tracing,
          documents,
          opOptions: { ...rest, includeStatistics },
        }),
        updateState: createUpdateAnalyzeState(),
        cancel: createCancelOperation({
          client: this._client,
          tracing: this._tracing,
          options: rest,
        }),
      }
    );

    await poller.poll();
    return poller;
  }
}

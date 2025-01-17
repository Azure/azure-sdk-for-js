// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  AnalyzeActionName,
  AnalyzeActionParameters,
  AnalyzeBatchAction,
  AnalyzeBatchPoller,
  AnalyzeResult,
  BeginAnalyzeBatchOptions,
  RestoreAnalyzeBatchPollerOptions,
  TextAnalysisClientOptions,
  TextAnalysisOperationOptions,
} from "./models.js";
import type {
  AnalyzeBatchActionUnion,
  GeneratedClientOptionalParams,
  LanguageDetectionInput,
  TextDocumentInput,
} from "./generated/models/index.js";
import { DEFAULT_COGNITIVE_SCOPE, SDK_VERSION } from "./constants.js";
import type { KeyCredential, TokenCredential } from "@azure/core-auth";
import { isTokenCredential } from "@azure/core-auth";
import type { TracingClient } from "@azure/core-tracing";
import { createTracingClient } from "@azure/core-tracing";
import {
  convertToLanguageDetectionInput,
  convertToTextDocumentInput,
  getOperationOptions,
  isStringArray,
} from "./util.js";
import {
  createAnalyzeBatchLro,
  createCreateAnalyzeBatchPollerLro,
  createPollerWithCancellation,
  createUpdateAnalyzeState,
  getDocIDsFromState,
  processAnalyzeResult,
} from "./lro.js";
import { throwError, transformActionResult } from "./transforms.js";
import { GeneratedClient } from "./generated/generatedClient.js";
import { bearerTokenAuthenticationPolicy } from "@azure/core-rest-pipeline";
import { createHttpPoller } from "@azure/core-lro";
import { logger } from "./logger.js";
import { textAnalyticsAzureKeyCredentialPolicy } from "./azureKeyCredentialPolicy.js";

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
 * ```ts snippet:ReadmeSampleCreateClient_Node
 * import { AzureKeyCredential } from "@azure/core-auth";
 * import { TextAnalysisClient } from "@azure/ai-language-text";
 *
 * const endpoint = "https://<resource name>.cognitiveservices.azure.com";
 * const credential = new AzureKeyCredential("<api key>");
 * const client = new TextAnalysisClient(endpoint, credential);
 * ```
 *
 * #### Azure Active Directory
 *
 * See the [`@azure/identity`](https://npmjs.com/package/\@azure/identity)
 * package for more information about authenticating with Azure Active Directory.
 *
 * ```ts snippet:ReadmeSampleCreateClient_ActiveDirectory
 * import { DefaultAzureCredential } from "@azure/identity";
 * import { TextAnalysisClient } from "@azure/ai-language-text";
 *
 * const endpoint = "https://<resource name>.cognitiveservices.azure.com";
 * const credential = new DefaultAzureCredential();
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
   * ```ts snippet:ReadmeSampleCreateClient_Node
   * import { AzureKeyCredential } from "@azure/core-auth";
   * import { TextAnalysisClient } from "@azure/ai-language-text";
   *
   * const endpoint = "https://<resource name>.cognitiveservices.azure.com";
   * const credential = new AzureKeyCredential("<api key>");
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
   * ```ts snippet:ReadmeSampleCreateClient_ActiveDirectory
   * import { DefaultAzureCredential } from "@azure/identity";
   * import { TextAnalysisClient } from "@azure/ai-language-text";
   *
   * const endpoint = "https://<resource name>.cognitiveservices.azure.com";
   * const credential = new DefaultAzureCredential();
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
    options?: TextAnalysisClientOptions,
  );
  constructor(
    endpointUrl: string,
    credential: TokenCredential | KeyCredential,
    options: TextAnalysisClientOptions = {},
  ) {
    const {
      defaultCountryHint = "us",
      defaultLanguage = "en",
      serviceVersion,
      ...pipelineOptions
    } = options;
    this.defaultCountryHint = defaultCountryHint;
    this.defaultLanguage = defaultLanguage;

    const internalPipelineOptions: GeneratedClientOptionalParams = {
      ...pipelineOptions,
      ...{
        loggingOptions: {
          logger: logger.info,
          additionalAllowedHeaderNames: ["x-ms-correlation-request-id", "x-ms-request-id"],
        },
      },
      apiVersion: serviceVersion,
    };

    this._client = new GeneratedClient(endpointUrl, internalPipelineOptions);

    const authPolicy = isTokenCredential(credential)
      ? bearerTokenAuthenticationPolicy({ credential, scopes: DEFAULT_COGNITIVE_SCOPE })
      : textAnalyticsAzureKeyCredentialPolicy(credential);

    this._client.pipeline.addPolicy(authPolicy);
    this._tracing = createTracingClient({
      packageName: "@azure/ai-language-text",
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
   * See {@link https://learn.microsoft.com//azure/cognitive-services/language-service/concepts/data-limits}
   * for data limits.
   *
   * ### Examples
   *
   * #### Language detection
   *
   * ```ts snippet:Sample_LanguageDetection
   * import { TextAnalysisClient } from "@azure/ai-language-text";
   * import { AzureKeyCredential } from "@azure/core-auth";
   *
   * const documents = [
   *   "This document is written in English.",
   *   "Este es un document escrito en Español.",
   *   "这是一个用中文写的文件",
   *   "Dies ist ein Dokument in deutsche Sprache.",
   *   "Detta är ett dokument skrivet på engelska.",
   * ];
   *
   * const client = new TextAnalysisClient("<endpoint>", new AzureKeyCredential("<API key>"));
   *
   * const result = await client.analyze("LanguageDetection", documents, "us", {
   *   modelVersion: "2022-04-10-preview",
   * });
   *
   * for (const doc of result) {
   *   if (!doc.error) {
   *     console.log(
   *       `Primary language: ${doc.primaryLanguage.name} (iso6391 name: ${doc.primaryLanguage.iso6391Name})`,
   *     );
   *   }
   * }
   * ```
   *
   * See {@link https://learn.microsoft.com//azure/cognitive-services/language-service/language-detection/overview}
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
    options?: AnalyzeActionParameters<ActionName> & TextAnalysisOperationOptions,
  ): Promise<AnalyzeResult<ActionName>>;
  /**
   * Runs a predictive model to determine the language that the passed-in
   * input strings are written in, and returns, for each one, the detected
   * language as well as a score indicating the model's confidence that the
   * inferred language is correct.  Scores close to 1 indicate high certainty in
   * the result.  120 languages are supported.
   *
   * See {@link https://learn.microsoft.com//azure/cognitive-services/language-service/concepts/data-limits}
   * for data limits.
   *
   * ### Examples
   *
   * #### Language detection
   *
   * ```ts snippet:Sample_LanguageDetection
   * import { TextAnalysisClient } from "@azure/ai-language-text";
   * import { AzureKeyCredential } from "@azure/core-auth";
   *
   * const documents = [
   *   "This document is written in English.",
   *   "Este es un document escrito en Español.",
   *   "这是一个用中文写的文件",
   *   "Dies ist ein Dokument in deutsche Sprache.",
   *   "Detta är ett dokument skrivet på engelska.",
   * ];
   *
   * const client = new TextAnalysisClient("<endpoint>", new AzureKeyCredential("<API key>"));
   *
   * const result = await client.analyze("LanguageDetection", documents, "us", {
   *   modelVersion: "2022-04-10-preview",
   * });
   *
   * for (const doc of result) {
   *   if (!doc.error) {
   *     console.log(
   *       `Primary language: ${doc.primaryLanguage.name} (iso6391 name: ${doc.primaryLanguage.iso6391Name})`,
   *     );
   *   }
   * }
   * ```
   *
   * See {@link https://learn.microsoft.com//azure/cognitive-services/language-service/language-detection/overview}
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
    options?: AnalyzeActionParameters<ActionName> & TextAnalysisOperationOptions,
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
   * See {@link https://learn.microsoft.com//azure/cognitive-services/language-service/concepts/data-limits}
   * for data limits.
   *
   * ### Examples
   *
   * #### Opinion mining
   *
   * ```ts snippet:Sample_SentimentAnalysis
   * import { TextAnalysisClient } from "@azure/ai-language-text";
   * import { AzureKeyCredential } from "@azure/core-auth";
   *
   * const documents = [
   *   "I had the best day of my life.",
   *   "This was a waste of my time. The speaker put me to sleep.",
   * ];
   *
   * const client = new TextAnalysisClient("<endpoint>", new AzureKeyCredential("<API key>"));
   *
   * const results = await client.analyze("SentimentAnalysis", documents);
   *
   * for (let i = 0; i < results.length; i++) {
   *   const result = results[i];
   *   console.log(`- Document ${result.id}`);
   *   if (!result.error) {
   *     console.log(`\tDocument text: ${documents[i]}`);
   *     console.log(`\tOverall Sentiment: ${result.sentiment}`);
   *     console.log("\tSentiment confidence scores: ", result.confidenceScores);
   *     console.log("\tSentences");
   *     for (const { sentiment, confidenceScores, text } of result.sentences) {
   *       console.log(`\t- Sentence text: ${text}`);
   *       console.log(`\t  Sentence sentiment: ${sentiment}`);
   *       console.log("\t  Confidence scores:", confidenceScores);
   *     }
   *   } else {
   *     console.error(`  Error: ${result.error}`);
   *   }
   * }
   * ```
   *
   * See {@link https://learn.microsoft.com//azure/cognitive-services/language-service/sentiment-opinion-mining/overview}
   * for more information on opinion mining.
   *
   * #### Personally identifiable information
   *
   * ```ts snippet:Sample_PIIEntityRecognition
   * import { TextAnalysisClient } from "@azure/ai-language-text";
   * import { AzureKeyCredential } from "@azure/core-auth";
   *
   * const client = new TextAnalysisClient("<endpoint>", new AzureKeyCredential("<API key>"));
   *
   * const documents = ["My phone number is 555-5555"];
   *
   * const [result] = await client.analyze("PiiEntityRecognition", documents, "en", {
   *   domainFilter: KnownPiiEntityDomain.Phi,
   *   categoriesFilter: [
   *     KnownPiiEntityCategory.PhoneNumber,
   *     KnownPiiEntityCategory.USSocialSecurityNumber,
   *   ],
   * });
   *
   * if (!result.error) {
   *   console.log(`Redacted text: "${result.redactedText}"`);
   *   console.log("Pii Entities: ");
   *   for (const entity of result.entities) {
   *     console.log(`\t- "${entity.text}" of type ${entity.category}`);
   *   }
   * }
   * ```
   *
   * See {@link https://learn.microsoft.com//azure/cognitive-services/language-service/personally-identifiable-information/overview}
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
    options?: AnalyzeActionParameters<ActionName> & TextAnalysisOperationOptions,
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
   * See {@link https://learn.microsoft.com//azure/cognitive-services/language-service/concepts/data-limits}
   * for data limits.
   *
   * ### Examples
   *
   * #### Opinion mining
   *
   * ```ts snippet:Sample_SentimentAnalysis
   * import { TextAnalysisClient } from "@azure/ai-language-text";
   * import { AzureKeyCredential } from "@azure/core-auth";
   *
   * const documents = [
   *   "I had the best day of my life.",
   *   "This was a waste of my time. The speaker put me to sleep.",
   * ];
   *
   * const client = new TextAnalysisClient("<endpoint>", new AzureKeyCredential("<API key>"));
   *
   * const results = await client.analyze("SentimentAnalysis", documents);
   *
   * for (let i = 0; i < results.length; i++) {
   *   const result = results[i];
   *   console.log(`- Document ${result.id}`);
   *   if (!result.error) {
   *     console.log(`\tDocument text: ${documents[i]}`);
   *     console.log(`\tOverall Sentiment: ${result.sentiment}`);
   *     console.log("\tSentiment confidence scores: ", result.confidenceScores);
   *     console.log("\tSentences");
   *     for (const { sentiment, confidenceScores, text } of result.sentences) {
   *       console.log(`\t- Sentence text: ${text}`);
   *       console.log(`\t  Sentence sentiment: ${sentiment}`);
   *       console.log("\t  Confidence scores:", confidenceScores);
   *     }
   *   } else {
   *     console.error(`  Error: ${result.error}`);
   *   }
   * }
   * ```
   *
   * See {@link https://learn.microsoft.com//azure/cognitive-services/language-service/sentiment-opinion-mining/overview}
   * for more information on opinion mining.
   *
   * #### Personally identifiable information
   *
   * ```ts snippet:Sample_PIIEntityRecognition
   * import { TextAnalysisClient } from "@azure/ai-language-text";
   * import { AzureKeyCredential } from "@azure/core-auth";
   *
   * const client = new TextAnalysisClient("<endpoint>", new AzureKeyCredential("<API key>"));
   *
   * const documents = ["My phone number is 555-5555"];
   *
   * const [result] = await client.analyze("PiiEntityRecognition", documents, "en", {
   *   domainFilter: KnownPiiEntityDomain.Phi,
   *   categoriesFilter: [
   *     KnownPiiEntityCategory.PhoneNumber,
   *     KnownPiiEntityCategory.USSocialSecurityNumber,
   *   ],
   * });
   *
   * if (!result.error) {
   *   console.log(`Redacted text: "${result.redactedText}"`);
   *   console.log("Pii Entities: ");
   *   for (const entity of result.entities) {
   *     console.log(`\t- "${entity.text}" of type ${entity.category}`);
   *   }
   * }
   * ```
   *
   * See {@link https://learn.microsoft.com//azure/cognitive-services/language-service/personally-identifiable-information/overview}
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
   *    found in {@link https://learn.microsoft.com//azure/cognitive-services/language-service/named-entity-recognition/language-support}.
   *    If set to "auto", the service will automatically infer the language from
   *    the input text.
   * @param options - optional action parameters and settings for the operation
   *
   * @returns an array of results corresponding to the input documents
   */
  public async analyze<ActionName extends AnalyzeActionName = AnalyzeActionName>(
    actionName: ActionName,
    documents: string[],
    languageCode?: string,
    options?: AnalyzeActionParameters<ActionName> & TextAnalysisOperationOptions,
  ): Promise<AnalyzeResult<ActionName>>;
  // implementation
  public async analyze<ActionName extends AnalyzeActionName = AnalyzeActionName>(
    actionName: ActionName,
    documents: string[] | LanguageDetectionInput[] | TextDocumentInput[],
    languageOrCountryHintOrOptions?:
      | string
      | (AnalyzeActionParameters<ActionName> & TextAnalysisOperationOptions),
    options?: AnalyzeActionParameters<ActionName> & TextAnalysisOperationOptions,
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
            : this.defaultCountryHint,
        );
      } else {
        realInputs = convertToTextDocumentInput(
          documents,
          typeof languageOrCountryHintOrOptions === "string"
            ? languageOrCountryHintOrOptions
            : this.defaultLanguage,
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
              updatedOptions,
            )
            .then(
              (result) =>
                transformActionResult(
                  actionName,
                  realInputs.map(({ id }) => id),
                  result,
                ) as AnalyzeResult<ActionName>,
            ),
        ),
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
   * See {@link https://learn.microsoft.com//azure/cognitive-services/language-service/concepts/data-limits}
   * for data limits.
   *
   * ### Examples
   *
   * #### Key phrase extraction and Pii entity recognition
   *
   * ```ts snippet:Sample_ActionBatching
   * import { TextAnalysisClient } from "@azure/ai-language-text";
   * import { AzureKeyCredential } from "@azure/core-auth";
   *
   * const documents = [
   *   "Microsoft was founded by Bill Gates and Paul Allen.",
   *   "Redmond is a city in King County, Washington, United States, located 15 miles east of Seattle.",
   *   "I need to take my cat to the veterinarian.",
   *   "The employee's SSN is 555-55-5555.",
   *   "We went to Contoso Steakhouse located at midtown NYC last week for a dinner party, and we adore the spot! They provide marvelous food and they have a great menu. The chief cook happens to be the owner (I think his name is John Doe) and he is super nice, coming out of the kitchen and greeted us all. We enjoyed very much dining in the place! The Sirloin steak I ordered was tender and juicy, and the place was impeccably clean. You can even pre-order from their online menu at www.contososteakhouse.com, call 312-555-0176 or send email to order@contososteakhouse.com! The only complaint I have is the food didn't come fast enough. Overall I highly recommend it!",
   * ];
   *
   * const client = new TextAnalysisClient("<endpoint>", new AzureKeyCredential("<API key>"));
   *
   * const actions: AnalyzeBatchAction[] = [
   *   {
   *     kind: "EntityRecognition",
   *     modelVersion: "latest",
   *   },
   *   {
   *     kind: "PiiEntityRecognition",
   *     modelVersion: "latest",
   *   },
   *   {
   *     kind: "KeyPhraseExtraction",
   *     modelVersion: "latest",
   *   },
   * ];
   * const poller = await client.beginAnalyzeBatch(actions, documents, "en");
   *
   * poller.onProgress(() => {
   *   console.log(
   *     `Number of actions still in progress: ${poller.getOperationState().actionInProgressCount}`,
   *   );
   * });
   *
   * console.log(`The operation was created on ${poller.getOperationState().createdOn}`);
   *
   * console.log(`The operation results will expire on ${poller.getOperationState().expiresOn}`);
   *
   * const actionResults = await poller.pollUntilDone();
   *
   * for await (const actionResult of actionResults) {
   *   if (actionResult.error) {
   *     const { code, message } = actionResult.error;
   *     throw new Error(`Unexpected error (${code}): ${message}`);
   *   }
   *   switch (actionResult.kind) {
   *     case "KeyPhraseExtraction": {
   *       for (const doc of actionResult.results) {
   *         console.log(`- Document ${doc.id}`);
   *         if (!doc.error) {
   *           console.log("\tKey phrases:");
   *           for (const phrase of doc.keyPhrases) {
   *             console.log(`\t- ${phrase}`);
   *           }
   *         } else {
   *           console.error("\tError:", doc.error);
   *         }
   *       }
   *       break;
   *     }
   *     case "EntityRecognition": {
   *       for (const doc of actionResult.results) {
   *         console.log(`- Document ${doc.id}`);
   *         if (!doc.error) {
   *           console.log("\tEntities:");
   *           for (const entity of doc.entities) {
   *             console.log(`\t- Entity ${entity.text} of type ${entity.category}`);
   *           }
   *         } else {
   *           console.error("\tError:", doc.error);
   *         }
   *       }
   *       break;
   *     }
   *     case "PiiEntityRecognition": {
   *       for (const doc of actionResult.results) {
   *         console.log(`- Document ${doc.id}`);
   *         if (!doc.error) {
   *           console.log("\tPii Entities:");
   *           for (const entity of doc.entities) {
   *             console.log(`\t- Entity ${entity.text} of type ${entity.category}`);
   *           }
   *         } else {
   *           console.error("\tError:", doc.error);
   *         }
   *       }
   *       break;
   *     }
   *     default: {
   *       throw new Error(`Unexpected action results: ${actionResult.kind}`);
   *     }
   *   }
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
   *    found in {@link https://learn.microsoft.com//azure/cognitive-services/language-service/named-entity-recognition/language-support}.
   *    If set to "auto", the service will automatically infer the language from
   *    the input text.
   * @param options - optional settings for the operation
   *
   * @returns an array of results corresponding to the input actions
   */
  async beginAnalyzeBatch(
    actions: AnalyzeBatchAction[],
    documents: string[],
    languageCode?: string,
    options?: BeginAnalyzeBatchOptions,
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
   * See {@link https://learn.microsoft.com//azure/cognitive-services/language-service/concepts/data-limits}
   * for data limits.
   *
   * ### Examples
   *
   * #### Keyphrase extraction and Pii entity recognition
   *
   * ```ts snippet:Sample_ActionBatching
   * import { TextAnalysisClient } from "@azure/ai-language-text";
   * import { AzureKeyCredential } from "@azure/core-auth";
   *
   * const documents = [
   *   "Microsoft was founded by Bill Gates and Paul Allen.",
   *   "Redmond is a city in King County, Washington, United States, located 15 miles east of Seattle.",
   *   "I need to take my cat to the veterinarian.",
   *   "The employee's SSN is 555-55-5555.",
   *   "We went to Contoso Steakhouse located at midtown NYC last week for a dinner party, and we adore the spot! They provide marvelous food and they have a great menu. The chief cook happens to be the owner (I think his name is John Doe) and he is super nice, coming out of the kitchen and greeted us all. We enjoyed very much dining in the place! The Sirloin steak I ordered was tender and juicy, and the place was impeccably clean. You can even pre-order from their online menu at www.contososteakhouse.com, call 312-555-0176 or send email to order@contososteakhouse.com! The only complaint I have is the food didn't come fast enough. Overall I highly recommend it!",
   * ];
   *
   * const client = new TextAnalysisClient("<endpoint>", new AzureKeyCredential("<API key>"));
   *
   * const actions: AnalyzeBatchAction[] = [
   *   {
   *     kind: "EntityRecognition",
   *     modelVersion: "latest",
   *   },
   *   {
   *     kind: "PiiEntityRecognition",
   *     modelVersion: "latest",
   *   },
   *   {
   *     kind: "KeyPhraseExtraction",
   *     modelVersion: "latest",
   *   },
   * ];
   * const poller = await client.beginAnalyzeBatch(actions, documents, "en");
   *
   * poller.onProgress(() => {
   *   console.log(
   *     `Number of actions still in progress: ${poller.getOperationState().actionInProgressCount}`,
   *   );
   * });
   *
   * console.log(`The operation was created on ${poller.getOperationState().createdOn}`);
   *
   * console.log(`The operation results will expire on ${poller.getOperationState().expiresOn}`);
   *
   * const actionResults = await poller.pollUntilDone();
   *
   * for await (const actionResult of actionResults) {
   *   if (actionResult.error) {
   *     const { code, message } = actionResult.error;
   *     throw new Error(`Unexpected error (${code}): ${message}`);
   *   }
   *   switch (actionResult.kind) {
   *     case "KeyPhraseExtraction": {
   *       for (const doc of actionResult.results) {
   *         console.log(`- Document ${doc.id}`);
   *         if (!doc.error) {
   *           console.log("\tKey phrases:");
   *           for (const phrase of doc.keyPhrases) {
   *             console.log(`\t- ${phrase}`);
   *           }
   *         } else {
   *           console.error("\tError:", doc.error);
   *         }
   *       }
   *       break;
   *     }
   *     case "EntityRecognition": {
   *       for (const doc of actionResult.results) {
   *         console.log(`- Document ${doc.id}`);
   *         if (!doc.error) {
   *           console.log("\tEntities:");
   *           for (const entity of doc.entities) {
   *             console.log(`\t- Entity ${entity.text} of type ${entity.category}`);
   *           }
   *         } else {
   *           console.error("\tError:", doc.error);
   *         }
   *       }
   *       break;
   *     }
   *     case "PiiEntityRecognition": {
   *       for (const doc of actionResult.results) {
   *         console.log(`- Document ${doc.id}`);
   *         if (!doc.error) {
   *           console.log("\tPii Entities:");
   *           for (const entity of doc.entities) {
   *             console.log(`\t- Entity ${entity.text} of type ${entity.category}`);
   *           }
   *         } else {
   *           console.error("\tError:", doc.error);
   *         }
   *       }
   *       break;
   *     }
   *     default: {
   *       throw new Error(`Unexpected action results: ${actionResult.kind}`);
   *     }
   *   }
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
    options?: BeginAnalyzeBatchOptions,
  ): Promise<AnalyzeBatchPoller>;
  // implementation
  async beginAnalyzeBatch(
    actions: AnalyzeBatchAction[],
    documents: TextDocumentInput[] | string[],
    languageOrOptions?: BeginAnalyzeBatchOptions | string,
    options: BeginAnalyzeBatchOptions = {},
  ): Promise<AnalyzeBatchPoller> {
    let realOptions: BeginAnalyzeBatchOptions;
    let realInputs: TextDocumentInput[];

    if (!Array.isArray(documents) || documents.length === 0) {
      throw new Error("'documents' must be a non-empty array");
    }

    if (isStringArray(documents)) {
      const languageCode = (languageOrOptions as string) ?? this.defaultLanguage;
      realInputs = convertToTextDocumentInput(documents, languageCode);
      realOptions = options;
    } else {
      realInputs = documents;
      realOptions = languageOrOptions as BeginAnalyzeBatchOptions;
    }
    const realActions = actions.map(
      ({ kind, actionName, ...rest }): AnalyzeBatchActionUnion & { parameters: unknown } => ({
        kind,
        actionName,
        parameters: rest,
      }),
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

    const docIds = realInputs.map(({ id }) => id);

    const state = { continuationToken: "" };

    const poller = await createHttpPoller(lro, {
      intervalInMs: updateIntervalInMs,
      processResult: processAnalyzeResult({
        client: this._client,
        tracing: this._tracing,
        docIds,
        opOptions: { ...rest, includeStatistics },
        state,
      }),
      updateState: createUpdateAnalyzeState(docIds),
      withOperationLocation(operationLocation: string) {
        state.continuationToken = operationLocation;
      },
    });

    await poller.poll();
    const id = poller.getOperationState().id;
    return createPollerWithCancellation({
      id,
      client: this._client,
      options,
      poller,
      tracing: this._tracing,
    });
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
   */
  async restoreAnalyzeBatchPoller(
    serializedState: string,
    options?: RestoreAnalyzeBatchPollerOptions,
  ): Promise<AnalyzeBatchPoller>;
  // implementation
  async restoreAnalyzeBatchPoller(
    serializedState: string,
    options: RestoreAnalyzeBatchPollerOptions = {},
  ): Promise<AnalyzeBatchPoller> {
    const { includeStatistics, updateIntervalInMs, ...rest } = options;
    const docIds = getDocIDsFromState(serializedState);
    const lro = createCreateAnalyzeBatchPollerLro({
      client: this._client,
      options: { ...rest, includeStatistics },
      tracing: this._tracing,
    });

    const state = { continuationToken: "" };

    const poller = await createHttpPoller(lro, {
      intervalInMs: updateIntervalInMs,
      restoreFrom: serializedState,
      processResult: processAnalyzeResult({
        client: this._client,
        tracing: this._tracing,
        docIds,
        opOptions: { ...rest, includeStatistics },
        state,
      }),
      updateState: createUpdateAnalyzeState(),
      withOperationLocation(operationLocation: string) {
        state.continuationToken = operationLocation;
      },
    });

    await poller.poll();
    const id = poller.getOperationState().id;
    return createPollerWithCancellation({
      id,
      client: this._client,
      options,
      poller,
      tracing: this._tracing,
    });
  }
}

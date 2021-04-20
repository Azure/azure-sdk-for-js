// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { CommonClientOptions } from "@azure/core-client";
import {
  InternalPipelineOptions,
  bearerTokenAuthenticationPolicy
} from "@azure/core-rest-pipeline";
import { TokenCredential, KeyCredential, isTokenCredential } from "@azure/core-auth";
import { SDK_VERSION } from "./constants";
import { GeneratedClient } from "./generated/generatedClient";
import { logger } from "./logger";
import {
  JobManifestTasks as GeneratedActions,
  DetectLanguageInput,
  GeneratedClientEntitiesRecognitionPiiOptionalParams,
  GeneratedClientSentimentOptionalParams,
  TextDocumentInput,
  PiiCategory
} from "./generated/models";
import {
  DetectLanguageResultArray,
  makeDetectLanguageResultArray
} from "./detectLanguageResultArray";
import {
  RecognizeCategorizedEntitiesResultArray,
  makeRecognizeCategorizedEntitiesResultArray
} from "./recognizeCategorizedEntitiesResultArray";
import {
  AnalyzeSentimentResultArray,
  makeAnalyzeSentimentResultArray
} from "./analyzeSentimentResultArray";
import {
  makeExtractKeyPhrasesResultArray,
  ExtractKeyPhrasesResultArray
} from "./extractKeyPhrasesResultArray";
import {
  RecognizePiiEntitiesResultArray,
  makeRecognizePiiEntitiesResultArray
} from "./recognizePiiEntitiesResultArray";
import {
  RecognizeLinkedEntitiesResultArray,
  makeRecognizeLinkedEntitiesResultArray
} from "./recognizeLinkedEntitiesResultArray";
import { createSpan } from "./tracing";
import { SpanStatusCode } from "@azure/core-tracing";
import { textAnalyticsAzureKeyCredentialPolicy } from "./azureKeyCredentialPolicy";
import {
  AddParamsToTask,
  addStrEncodingParam,
  compose,
  handleInvalidDocumentBatch,
  setModelVersionParam,
  setStrEncodingParam,
  StringIndexType
} from "./util";
import {
  BeginAnalyzeHealthcarePoller,
  AnalyzeHealthcareEntitiesPollerLike
} from "./lro/health/poller";
import {
  BeginAnalyzeHealthcareEntitiesOptions,
  AnalyzeHealthcareOperationState
} from "./lro/health/operation";
import { TextAnalyticsOperationOptions } from "./textAnalyticsOperationOptions";
import {
  AnalyzeBatchActionsPollerLike,
  BeginAnalyzeBatchActionsPoller
} from "./lro/analyze/poller";
import {
  AnalyzeBatchActionsOperationMetadata,
  BeginAnalyzeBatchActionsOptions,
  AnalyzeBatchActionsOperationState
} from "./lro/analyze/operation";
import { AnalysisPollOperationState, OperationMetadata } from "./lro/poller";

export {
  BeginAnalyzeBatchActionsOptions,
  AnalyzeBatchActionsPollerLike,
  AnalyzeBatchActionsOperationState,
  BeginAnalyzeHealthcareEntitiesOptions,
  AnalyzeHealthcareEntitiesPollerLike,
  AnalyzeHealthcareOperationState,
  AnalysisPollOperationState,
  OperationMetadata,
  AnalyzeBatchActionsOperationMetadata,
  StringIndexType
};

const DEFAULT_COGNITIVE_SCOPE = "https://cognitiveservices.azure.com/.default";

/**
 * Client options used to configure TextAnalytics API requests.
 */
export interface TextAnalyticsClientOptions extends CommonClientOptions {
  /**
   * The default country hint to use. Defaults to "us".
   */
  defaultCountryHint?: string;

  /**
   * The default language to use. Defaults to "en".
   */
  defaultLanguage?: string;
}

/**
 * Options for the detect languages operation.
 */
export type DetectLanguageOptions = TextAnalyticsOperationOptions;

/**
 * Options for the recognize entities operation.
 */
export interface RecognizeCategorizedEntitiesOptions extends TextAnalyticsOperationOptions {
  /**
   * Specifies the measurement unit used to calculate the offset and length properties.
   * Possible units are "TextElements_v8", "UnicodeCodePoint", and "Utf16CodeUnit".
   * The default is the JavaScript's default which is "Utf16CodeUnit".
   */
  stringIndexType?: StringIndexType;
}

/**
 * Options for the analyze sentiment operation.
 */
export interface AnalyzeSentimentOptions extends TextAnalyticsOperationOptions {
  /**
   * Whether to mine the opinions of a sentence and conduct more  granular
   * analysis around the aspects of a product or service (also known as
   * aspect-based sentiment analysis). If set to true, the returned
   * `SentenceSentiment` objects will have property `opinions` containing
   * the result of this analysis.
   * More information about the feature can be found here: {@link https://docs.microsoft.com/azure/cognitive-services/text-analytics/how-tos/text-analytics-how-to-sentiment-analysis?tabs=version-3-1#opinion-mining}
   */
  includeOpinionMining?: boolean;
  /**
   * Specifies the measurement unit used to calculate the offset and length properties.
   * Possible units are "TextElements_v8", "UnicodeCodePoint", and "Utf16CodeUnit".
   * The default is the JavaScript's default which is "Utf16CodeUnit".
   */
  stringIndexType?: StringIndexType;
}

/**
 * The types of PII domains the user can choose from.
 */
export enum PiiEntityDomainType {
  /**
   * @see {@link https://aka.ms/tanerpii} for more information.
   */
  PROTECTED_HEALTH_INFORMATION = "PHI"
}

/**
 * Options for the recognize PII entities operation.
 */
export interface RecognizePiiEntitiesOptions extends TextAnalyticsOperationOptions {
  /**
   * Filters entities to ones only included in the specified domain (e.g., if
   * set to 'PHI', entities in the Protected Healthcare Information domain will
   * only be returned). @see {@link https://aka.ms/tanerpii} for more information.
   */
  domainFilter?: PiiEntityDomainType;
  /**
   * Specifies the measurement unit used to calculate the offset and length properties.
   * Possible units are "TextElements_v8", "UnicodeCodePoint", and "Utf16CodeUnit".
   * The default is the JavaScript's default which is "Utf16CodeUnit".
   */
  stringIndexType?: StringIndexType;
  /**
   * Specifies the list of Pii categories to return.
   */
  categoriesFilter?: PiiCategory[];
}

/**
 * Options for the extract key phrases operation.
 */
export type ExtractKeyPhrasesOptions = TextAnalyticsOperationOptions;

/**
 * Options for the recognize linked entities operation.
 */
export interface RecognizeLinkedEntitiesOptions extends TextAnalyticsOperationOptions {
  /**
   * Specifies the measurement unit used to calculate the offset and length properties.
   * Possible units are "TextElements_v8", "UnicodeCodePoint", and "Utf16CodeUnit".
   * The default is the JavaScript's default which is "Utf16CodeUnit".
   */
  stringIndexType?: StringIndexType;
}

/**
 * Options for an entities recognition action.
 */
export type RecognizeCategorizedEntitiesAction = {
  /**
   * The version of the text analytics model used by this operation on this
   * batch of input documents.
   */
  modelVersion?: string;
  /**
   * Specifies the measurement unit used to calculate the offset and length properties.
   * Possible units are "TextElements_v8", "UnicodeCodePoint", and "Utf16CodeUnit".
   * The default is the JavaScript's default which is "Utf16CodeUnit".
   */
  stringIndexType?: StringIndexType;
};

/**
 * Options for a Pii entities recognition action.
 */
export type RecognizePiiEntitiesAction = {
  /**
   * Filters entities to ones only included in the specified domain (e.g., if
   * set to 'PHI', entities in the Protected Healthcare Information domain will
   * only be returned). @see {@link https://aka.ms/tanerpii} for more information.
   */
  domain?: PiiEntityDomainType;
  /**
   * The version of the text analytics model used by this operation on this
   * batch of input documents.
   */
  modelVersion?: string;
  /**
   * Specifies the measurement unit used to calculate the offset and length properties.
   * Possible units are "TextElements_v8", "UnicodeCodePoint", and "Utf16CodeUnit".
   * The default is the JavaScript's default which is "Utf16CodeUnit".
   */
  stringIndexType?: StringIndexType;
};

/**
 * Options for a key phrases recognition action.
 */
export interface ExtractKeyPhrasesAction {
  /**
   * The version of the text analytics model used by this operation on this
   * batch of input documents.
   */
  modelVersion?: string;
}

/**
 * Options for an entities linking action.
 */
export type RecognizeLinkedEntitiesAction = {
  /**
   * The version of the text analytics model used by this operation on this
   * batch of input documents.
   */
  modelVersion?: string;
  /**
   * Specifies the measurement unit used to calculate the offset and length properties.
   * Possible units are "TextElements_v8", "UnicodeCodePoint", and "Utf16CodeUnit".
   * The default is the JavaScript's default which is "Utf16CodeUnit".
   */
  stringIndexType?: StringIndexType;
};

/**
 * Description of collection of actions for the analyze API to perform on input documents
 */
export interface TextAnalyticsActions {
  /**
   * A collection of descriptions of entities recognition actions.
   */
  recognizeEntitiesActions?: RecognizeCategorizedEntitiesAction[];
  /**
   * A collection of descriptions of Pii entities recognition actions.
   */
  recognizePiiEntitiesActions?: RecognizePiiEntitiesAction[];
  /**
   * A collection of descriptions of key phrases recognition actions.
   */
  extractKeyPhrasesActions?: ExtractKeyPhrasesAction[];
  /**
   * A collection of descriptions of entities linking actions.
   */
  recognizeLinkedEntitiesActions?: RecognizeLinkedEntitiesAction[];
}
/**
 * Client class for interacting with Azure Text Analytics.
 */
export class TextAnalyticsClient {
  /**
   * The URL to the TextAnalytics endpoint
   */
  public readonly endpointUrl: string;

  /**
   * The default country hint to use. Defaults to "us".
   */
  public defaultCountryHint: string;

  /**
   * The default language to use. Defaults to "en".
   */
  public defaultLanguage: string;

  /**
   * @internal
   * A reference to the auto-generated TextAnalytics HTTP client.
   */
  private readonly client: GeneratedClient;

  /**
   * Creates an instance of TextAnalyticsClient.
   *
   * Example usage:
   * ```ts
   * import { TextAnalyticsClient, AzureKeyCredential } from "@azure/ai-text-analytics";
   *
   * const client = new TextAnalyticsClient(
   *    "<service endpoint>",
   *    new AzureKeyCredential("<api key>")
   * );
   * ```
   * @param endpointUrl - The URL to the TextAnalytics endpoint
   * @param credential - Used to authenticate requests to the service.
   * @param options - Used to configure the TextAnalytics client.
   */
  constructor(
    endpointUrl: string,
    credential: TokenCredential | KeyCredential,
    options: TextAnalyticsClientOptions = {}
  ) {
    this.endpointUrl = endpointUrl;
    const { defaultCountryHint = "us", defaultLanguage = "en", ...pipelineOptions } = options;
    this.defaultCountryHint = defaultCountryHint;
    this.defaultLanguage = defaultLanguage;

    const libInfo = `azsdk-js-ai-textanalytics/${SDK_VERSION}`;
    if (!pipelineOptions.userAgentOptions) {
      pipelineOptions.userAgentOptions = {};
    }
    if (pipelineOptions.userAgentOptions.userAgentPrefix) {
      pipelineOptions.userAgentOptions.userAgentPrefix = `${pipelineOptions.userAgentOptions.userAgentPrefix} ${libInfo}`;
    } else {
      pipelineOptions.userAgentOptions.userAgentPrefix = libInfo;
    }

    const internalPipelineOptions: InternalPipelineOptions = {
      ...pipelineOptions,
      ...{
        loggingOptions: {
          logger: logger.info,
          additionalAllowedHeaderNames: ["x-ms-correlation-request-id", "x-ms-request-id"]
        }
      }
    };

    this.client = new GeneratedClient(this.endpointUrl, internalPipelineOptions);

    const authPolicy = isTokenCredential(credential)
      ? bearerTokenAuthenticationPolicy({ credential, scopes: DEFAULT_COGNITIVE_SCOPE })
      : textAnalyticsAzureKeyCredentialPolicy(credential);

    this.client.pipeline.addPolicy(authPolicy);
  }

  /**
   * Runs a predictive model to determine the language that the passed-in
   * input strings are written in, and returns, for each one, the detected
   * language as well as a score indicating the model's confidence that the
   * inferred language is correct.  Scores close to 1 indicate high certainty in
   * the result.  120 languages are supported.
   * @param documents - A collection of input strings to analyze.
   * @param countryHint - Indicates the country of origin for all of
   *   the input strings to assist the text analytics model in predicting
   *   the language they are written in.  If unspecified, this value will be
   *   set to the default country hint in `TextAnalyticsClientOptions`.
   *   If set to an empty string, or the string "none", the service will apply a
   *   model where the country is explicitly unset.
   *   The same country hint is applied to all strings in the input collection.
   * @param options - Optional parameters for the operation.
   */
  public async detectLanguage(
    documents: string[],
    countryHint?: string,
    options?: DetectLanguageOptions
  ): Promise<DetectLanguageResultArray>;
  /**
   * Runs a predictive model to determine the language that the passed-in
   * input document are written in, and returns, for each one, the detected
   * language as well as a score indicating the model's confidence that the
   * inferred language is correct.  Scores close to 1 indicate high certainty in
   * the result.  120 languages are supported.
   * @param documents - A collection of input documents to analyze.
   * @param options - Optional parameters for the operation.
   */
  public async detectLanguage(
    documents: DetectLanguageInput[],
    options?: DetectLanguageOptions
  ): Promise<DetectLanguageResultArray>;
  public async detectLanguage(
    documents: string[] | DetectLanguageInput[],
    countryHintOrOptions?: string | DetectLanguageOptions,
    options?: DetectLanguageOptions
  ): Promise<DetectLanguageResultArray> {
    let realOptions: DetectLanguageOptions;
    let realInputs: DetectLanguageInput[];

    if (!Array.isArray(documents) || documents.length === 0) {
      throw new Error("'documents' must be a non-empty array");
    }

    if (isStringArray(documents)) {
      const countryHint = (countryHintOrOptions as string) || this.defaultCountryHint;
      realInputs = convertToDetectLanguageInput(documents, countryHint);
      realOptions = options || {};
    } else {
      // Replace "none" hints with ""
      realInputs = documents.map((input) => ({
        ...input,
        countryHint: input.countryHint === "none" ? "" : input.countryHint
      }));
      realOptions = (countryHintOrOptions as DetectLanguageOptions) || {};
    }

    const { span, updatedOptions: finalOptions } = createSpan(
      "TextAnalyticsClient-detectLanguages",
      realOptions
    );

    try {
      const result = await this.client.languages(
        {
          documents: realInputs
        },
        finalOptions
      );

      return makeDetectLanguageResultArray(realInputs, result);
    } catch (e) {
      span.setStatus({
        code: SpanStatusCode.ERROR,
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Runs a predictive model to identify a collection of named entities
   * in the passed-in input strings, and categorize those entities into types
   * such as person, location, or organization.  For more information on 
   * available categories, @see
   * {@link https://docs.microsoft.com/azure/cognitive-services/Text-Analytics/named-entity-types}.
   * For a list of languages supported by this operation, @see
   * {@link https://docs.microsoft.com/azure/cognitive-services/text-analytics/language-support}.
   * @param documents - The input strings to analyze.
   * @param language - The language that all the input strings are
        written in. If unspecified, this value will be set to the default
        language in `TextAnalyticsClientOptions`.  
        If set to an empty string, the service will apply a model
        where the language is explicitly set to "None".
   * @param options - Optional parameters for the operation.
   */
  public async recognizeEntities(
    documents: string[],
    language?: string,
    // eslint-disable-next-line @azure/azure-sdk/ts-naming-options
    options?: RecognizeCategorizedEntitiesOptions
  ): Promise<RecognizeCategorizedEntitiesResultArray>;
  /**
   * Runs a predictive model to identify a collection of named entities
   * in the passed-in input documents, and categorize those entities into types
   * such as person, location, or organization.  For more information on
   * available categories, @see
   * {@link https://docs.microsoft.com/azure/cognitive-services/Text-Analytics/named-entity-types}.
   * For a list of languages supported by this operation, @see
   * {@link https://docs.microsoft.com/azure/cognitive-services/text-analytics/language-support}.
   * @param documents - The input documents to analyze.
   * @param options - Optional parameters for the operation.
   */
  public async recognizeEntities(
    documents: TextDocumentInput[],
    // eslint-disable-next-line @azure/azure-sdk/ts-naming-options
    options?: RecognizeCategorizedEntitiesOptions
  ): Promise<RecognizeCategorizedEntitiesResultArray>;
  public async recognizeEntities(
    documents: string[] | TextDocumentInput[],
    languageOrOptions?: string | RecognizeCategorizedEntitiesOptions,
    // eslint-disable-next-line @azure/azure-sdk/ts-naming-options
    options?: RecognizeCategorizedEntitiesOptions
  ): Promise<RecognizeCategorizedEntitiesResultArray> {
    let realOptions: RecognizeCategorizedEntitiesOptions;
    let realInputs: TextDocumentInput[];

    if (!Array.isArray(documents) || documents.length === 0) {
      throw new Error("'documents' must be a non-empty array");
    }

    if (isStringArray(documents)) {
      const language = (languageOrOptions as string) || this.defaultLanguage;
      realInputs = convertToTextDocumentInput(documents, language);
      realOptions = options || {};
    } else {
      realInputs = documents;
      realOptions = (languageOrOptions as RecognizeCategorizedEntitiesOptions) || {};
    }

    const { span, updatedOptions: finalOptions } = createSpan(
      "TextAnalyticsClient-recognizeEntities",
      realOptions
    );

    try {
      const result = await this.client.entitiesRecognitionGeneral(
        {
          documents: realInputs
        },
        addStrEncodingParam(finalOptions)
      );

      return makeRecognizeCategorizedEntitiesResultArray(realInputs, result);
    } catch (e) {
      /**
       * This special logic handles REST exception with code
       * InvalidDocumentBatch and is needed to maintain backward compatability
       * with sdk v5.0.0 and earlier. In general, REST exceptions are thrown as
       * is and include both outer and inner exception codes. However, the
       * earlier versions were throwing an exception that included the inner
       * code only.
       */
      const backwardCompatibleException = handleInvalidDocumentBatch(e);
      span.setStatus({
        code: SpanStatusCode.ERROR,
        message: backwardCompatibleException.message
      });
      throw backwardCompatibleException;
    } finally {
      span.end();
    }
  }

  /**
   * Runs a predictive model to identify the positive, negative, neutral, or mixed
   * sentiment contained in the input strings, as well as scores indicating
   * the model's confidence in each of the predicted sentiments. Optionally it
   * can also identify targets in the text and assessments about it through
   * opinion mining. For a list of languages supported by this operation, @see
   * {@link https://docs.microsoft.com/azure/cognitive-services/text-analytics/language-support}.
   * @param documents - The input strings to analyze.
   * @param language - The language that all the input strings are
        written in. If unspecified, this value will be set to the default
        language in `TextAnalyticsClientOptions`.  
        If set to an empty string, the service will apply a model
        where the lanuage is explicitly set to "None".
   * @param options - Optional parameters that includes enabling opinion mining.
   */
  public async analyzeSentiment(
    documents: string[],
    language?: string,
    options?: AnalyzeSentimentOptions
  ): Promise<AnalyzeSentimentResultArray>;
  /**
   * Runs a predictive model to identify the positive, negative or neutral, or mixed
   * sentiment contained in the input documents, as well as scores indicating
   * the model's confidence in each of the predicted sentiments.Optionally it
   * can also identify targets in the text and assessments about it through
   * opinion mining. For a list of languages supported by this operation, @see
   * {@link https://docs.microsoft.com/azure/cognitive-services/text-analytics/language-support}.
   * @param documents - The input documents to analyze.
   * @param options - Optional parameters that includes enabling opinion mining.
   */
  public async analyzeSentiment(
    documents: TextDocumentInput[],
    options?: AnalyzeSentimentOptions
  ): Promise<AnalyzeSentimentResultArray>;
  public async analyzeSentiment(
    documents: string[] | TextDocumentInput[],
    languageOrOptions?: string | AnalyzeSentimentOptions,
    options?: AnalyzeSentimentOptions
  ): Promise<AnalyzeSentimentResultArray> {
    let realOptions: GeneratedClientSentimentOptionalParams;
    let realInputs: TextDocumentInput[];

    if (!Array.isArray(documents) || documents.length === 0) {
      throw new Error("'documents' must be a non-empty array");
    }

    if (isStringArray(documents)) {
      const language = (languageOrOptions as string) || this.defaultLanguage;
      realInputs = convertToTextDocumentInput(documents, language);
      realOptions = makeAnalyzeSentimentOptionsModel(options || {});
    } else {
      realInputs = documents;
      realOptions = makeAnalyzeSentimentOptionsModel(
        (languageOrOptions as AnalyzeSentimentOptions) || {}
      );
    }

    const { span, updatedOptions: finalOptions } = createSpan(
      "TextAnalyticsClient-analyzeSentiment",
      realOptions
    );

    try {
      const result = await this.client.sentiment(
        {
          documents: realInputs
        },
        setStrEncodingParam(finalOptions)
      );

      return makeAnalyzeSentimentResultArray(realInputs, result);
    } catch (e) {
      span.setStatus({
        code: SpanStatusCode.ERROR,
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Runs a model to identify a collection of significant phrases
   * found in the passed-in input strings.
   * For a list of languages supported by this operation, @see
   * {@link https://docs.microsoft.com/azure/cognitive-services/text-analytics/language-support}.
   * @param documents - The input strings to analyze.
   * @param language - The language that all the input strings are
        written in. If unspecified, this value will be set to the default
        language in `TextAnalyticsClientOptions`.  
        If set to an empty string, the service will apply a model
        where the language is explicitly set to "None".
   * @param options - Options for the operation.
   */
  public async extractKeyPhrases(
    documents: string[],
    language?: string,
    options?: ExtractKeyPhrasesOptions
  ): Promise<ExtractKeyPhrasesResultArray>;
  /**
   * Runs a model to identify a collection of significant phrases
   * found in the passed-in input documents.
   * For a list of languages supported by this operation, @see
   * {@link https://docs.microsoft.com/azure/cognitive-services/text-analytics/language-support}.
   * @param documents - The input documents to analyze.
   * @param options - Options for the operation.
   */
  public async extractKeyPhrases(
    documents: TextDocumentInput[],
    options?: ExtractKeyPhrasesOptions
  ): Promise<ExtractKeyPhrasesResultArray>;
  public async extractKeyPhrases(
    documents: string[] | TextDocumentInput[],
    languageOrOptions?: string | ExtractKeyPhrasesOptions,
    options?: ExtractKeyPhrasesOptions
  ): Promise<ExtractKeyPhrasesResultArray> {
    let realOptions: ExtractKeyPhrasesOptions;
    let realInputs: TextDocumentInput[];

    if (!Array.isArray(documents) || documents.length === 0) {
      throw new Error("'documents' must be a non-empty array");
    }

    if (isStringArray(documents)) {
      const language = (languageOrOptions as string) || this.defaultLanguage;
      realInputs = convertToTextDocumentInput(documents, language);
      realOptions = options || {};
    } else {
      realInputs = documents;
      realOptions = (languageOrOptions as ExtractKeyPhrasesOptions) || {};
    }

    const { span, updatedOptions: finalOptions } = createSpan(
      "TextAnalyticsClient-extractKeyPhrases",
      realOptions
    );

    try {
      const result = await this.client.keyPhrases(
        {
          documents: realInputs
        },
        finalOptions
      );

      return makeExtractKeyPhrasesResultArray(realInputs, result);
    } catch (e) {
      span.setStatus({
        code: SpanStatusCode.ERROR,
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Runs a predictive model to identify a collection of entities containing
   * personally identifiable information found in the passed-in input strings,
   * and categorize those entities into types such as US social security
   * number, drivers license number, or credit card number.
   * For a list of languages supported by this operation, @see
   * {@link https://docs.microsoft.com/en-us/azure/cognitive-services/text-analytics/language-support}.
   * @param inputs - The input strings to analyze.
   * @param language - The language that all the input strings are
        written in. If unspecified, this value will be set to the default
        language in `TextAnalyticsClientOptions`.  
        If set to an empty string, the service will apply a model
        where the language is explicitly set to "None".
   * @param options - Options for the operation.
   */
  public async recognizePiiEntities(
    inputs: string[],
    language?: string,
    options?: RecognizePiiEntitiesOptions
  ): Promise<RecognizePiiEntitiesResultArray>;
  /**
   * Runs a predictive model to identify a collection of entities containing
   * personally identifiable information found in the passed-in input documents,
   * and categorize those entities into types such as US social security
   * number, drivers license number, or credit card number.
   * For a list of languages supported by this operation, @see
   * {@link https://docs.microsoft.com/en-us/azure/cognitive-services/text-analytics/language-support}.
   * @param inputs - The input documents to analyze.
   * @param options - Optional parameters for the operation.
   */
  public async recognizePiiEntities(
    inputs: TextDocumentInput[],
    options?: RecognizePiiEntitiesOptions
  ): Promise<RecognizePiiEntitiesResultArray>;
  public async recognizePiiEntities(
    inputs: string[] | TextDocumentInput[],
    languageOrOptions?: string | RecognizePiiEntitiesOptions,
    options?: RecognizePiiEntitiesOptions
  ): Promise<RecognizePiiEntitiesResultArray> {
    let realOptions: GeneratedClientEntitiesRecognitionPiiOptionalParams;
    let realInputs: TextDocumentInput[];

    if (isStringArray(inputs)) {
      const language = (languageOrOptions as string) || this.defaultLanguage;
      realInputs = convertToTextDocumentInput(inputs, language);
      realOptions = makePiiEntitiesOptionsModel(options || {});
    } else {
      realInputs = inputs;
      realOptions = makePiiEntitiesOptionsModel(
        (languageOrOptions as RecognizePiiEntitiesOptions) || {}
      );
    }

    const { span, updatedOptions: finalOptions } = createSpan(
      "TextAnalyticsClient-recognizePiiEntities",
      realOptions
    );

    try {
      const result = await this.client.entitiesRecognitionPii(
        {
          documents: realInputs
        },
        setStrEncodingParam(finalOptions)
      );

      return makeRecognizePiiEntitiesResultArray(realInputs, result);
    } catch (e) {
      span.setStatus({
        code: SpanStatusCode.ERROR,
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Runs a predictive model to identify a collection of entities
   * found in the passed-in input strings, and include information linking the
   * entities to their corresponding entries in a well-known knowledge base.
   * For a list of languages supported by this operation, @see
   * {@link https://docs.microsoft.com/azure/cognitive-services/text-analytics/language-support}.
   * @param documents - The input strings to analyze.
   * @param language - The language that all the input strings are
        written in. If unspecified, this value will be set to the default
        language in `TextAnalyticsClientOptions`.  
        If set to an empty string, the service will apply a model
        where the language is explicitly set to "None".
   * @param options - Options for the operation.
   */
  public async recognizeLinkedEntities(
    documents: string[],
    language?: string,
    options?: RecognizeLinkedEntitiesOptions
  ): Promise<RecognizeLinkedEntitiesResultArray>;
  /**
   * Runs a predictive model to identify a collection of entities
   * found in the passed-in input documents, and include information linking the
   * entities to their corresponding entries in a well-known knowledge base.
   * For a list of languages supported by this operation, @see
   * {@link https://docs.microsoft.com/azure/cognitive-services/text-analytics/language-support}.
   * @param documents - The input documents to analyze.
   * @param options - Options for the operation.
   */
  public async recognizeLinkedEntities(
    documents: TextDocumentInput[],
    options?: RecognizeLinkedEntitiesOptions
  ): Promise<RecognizeLinkedEntitiesResultArray>;
  public async recognizeLinkedEntities(
    documents: string[] | TextDocumentInput[],
    languageOrOptions?: string | RecognizeLinkedEntitiesOptions,
    options?: RecognizeLinkedEntitiesOptions
  ): Promise<RecognizeLinkedEntitiesResultArray> {
    let realOptions: RecognizeLinkedEntitiesOptions;
    let realInputs: TextDocumentInput[];

    if (!Array.isArray(documents) || documents.length === 0) {
      throw new Error("'documents' must be a non-empty array");
    }

    if (isStringArray(documents)) {
      const language = (languageOrOptions as string) || this.defaultLanguage;
      realInputs = convertToTextDocumentInput(documents, language);
      realOptions = options || {};
    } else {
      realInputs = documents;
      realOptions = (languageOrOptions as RecognizeLinkedEntitiesOptions) || {};
    }

    const { span, updatedOptions: finalOptions } = createSpan(
      "TextAnalyticsClient-recognizeLinkedEntities",
      realOptions
    );

    try {
      const result = await this.client.entitiesLinking(
        {
          documents: realInputs
        },
        addStrEncodingParam(finalOptions)
      );

      return makeRecognizeLinkedEntitiesResultArray(realInputs, result);
    } catch (e) {
      span.setStatus({
        code: SpanStatusCode.ERROR,
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Start a healthcare analysis operation to recognize healthcare related entities (drugs, conditions,
   * symptoms, etc) and their relations.
   * @param documents - Collection of documents to analyze.
   * @param language - The language that all the input strings are
        written in. If unspecified, this value will be set to the default
        language in `TextAnalyticsClientOptions`.
        If set to an empty string, the service will apply a model
        where the language is explicitly set to "None".
   * @param options - Options for the operation.
   */
  async beginAnalyzeHealthcareEntities(
    documents: string[],
    language?: string,
    options?: BeginAnalyzeHealthcareEntitiesOptions
  ): Promise<AnalyzeHealthcareEntitiesPollerLike>;
  /**
   * Start a healthcare analysis operation to recognize healthcare related entities (drugs, conditions,
   * symptoms, etc) and their relations.
   * @param documents - Collection of documents to analyze.
   * @param options - Options for the operation.
   */
  async beginAnalyzeHealthcareEntities(
    documents: TextDocumentInput[],
    options?: BeginAnalyzeHealthcareEntitiesOptions
  ): Promise<AnalyzeHealthcareEntitiesPollerLike>;

  async beginAnalyzeHealthcareEntities(
    documents: string[] | TextDocumentInput[],
    languageOrOptions?: string | BeginAnalyzeHealthcareEntitiesOptions,
    options?: BeginAnalyzeHealthcareEntitiesOptions
  ): Promise<AnalyzeHealthcareEntitiesPollerLike> {
    let realOptions: BeginAnalyzeHealthcareEntitiesOptions;
    let realInputs: TextDocumentInput[];
    if (isStringArray(documents)) {
      const language = (languageOrOptions as string) || this.defaultLanguage;
      realInputs = convertToTextDocumentInput(documents, language);
      realOptions = options || {};
    } else {
      realInputs = documents;
      realOptions = (languageOrOptions as BeginAnalyzeHealthcareEntitiesOptions) || {};
    }

    const poller = new BeginAnalyzeHealthcarePoller({
      client: this.client,
      documents: realInputs,
      analysisOptions: {
        requestOptions: realOptions.requestOptions,
        tracingOptions: realOptions.tracingOptions,
        abortSignal: realOptions.abortSignal,
        onResponse: realOptions.onResponse,
        serializerOptions: realOptions.serializerOptions
      },
      updateIntervalInMs: realOptions.updateIntervalInMs,
      resumeFrom: realOptions.resumeFrom,
      includeStatistics: realOptions.includeStatistics,
      modelVersion: realOptions.modelVersion,
      stringIndexType: realOptions.stringIndexType
    });

    await poller.poll();
    return poller;
  }

  /**
   * Submit a collection of text documents for analysis. Specify one or more unique actions to be executed.
   * @param documents - Collection of documents to analyze
   * @param actions - TextAnalyticsActions to execute.
   * @param language - The language that all the input strings are
        written in. If unspecified, this value will be set to the default
        language in `TextAnalyticsClientOptions`.
        If set to an empty string, the service will apply a model
        where the language is explicitly set to "None".
   * @param options - Options for the operation.
   */
  public async beginAnalyzeBatchActions(
    documents: string[],
    actions: TextAnalyticsActions,
    language?: string,
    options?: BeginAnalyzeBatchActionsOptions
  ): Promise<AnalyzeBatchActionsPollerLike>;
  /**
   * Submit a collection of text documents for analysis. Specify one or more unique actions to be executed.
   * @param documents - Collection of documents to analyze
   * @param actions - TextAnalyticsActions to execute.
   * @param options - Options for the operation.
   */
  public async beginAnalyzeBatchActions(
    documents: TextDocumentInput[],
    actions: TextAnalyticsActions,
    options?: BeginAnalyzeBatchActionsOptions
  ): Promise<AnalyzeBatchActionsPollerLike>;
  public async beginAnalyzeBatchActions(
    documents: string[] | TextDocumentInput[],
    actions: TextAnalyticsActions,
    languageOrOptions?: string | BeginAnalyzeBatchActionsOptions,
    options?: BeginAnalyzeBatchActionsOptions
  ): Promise<AnalyzeBatchActionsPollerLike> {
    let realOptions: BeginAnalyzeBatchActionsOptions;
    let realInputs: TextDocumentInput[];

    if (!Array.isArray(documents) || documents.length === 0) {
      throw new Error("'documents' must be a non-empty array");
    }

    if (isStringArray(documents)) {
      const language = (languageOrOptions as string) || this.defaultLanguage;
      realInputs = convertToTextDocumentInput(documents, language);
      realOptions = options || {};
    } else {
      realInputs = documents;
      realOptions = (languageOrOptions as BeginAnalyzeBatchActionsOptions) || {};
    }
    const compiledActions = compileAnalyzeInput(actions);
    const poller = new BeginAnalyzeBatchActionsPoller({
      client: this.client,
      documents: realInputs,
      actions: compiledActions,
      analysisOptions: {
        requestOptions: realOptions.requestOptions,
        tracingOptions: realOptions.tracingOptions,
        abortSignal: realOptions.abortSignal,
        onResponse: realOptions.onResponse,
        serializerOptions: realOptions.serializerOptions
      },
      displayName: realOptions.displayName,
      includeStatistics: realOptions.includeStatistics,
      updateIntervalInMs: realOptions.updateIntervalInMs,
      resumeFrom: realOptions.resumeFrom
    });

    await poller.poll();
    return poller;
  }
}

/**
 * @internal
 */
function compileAnalyzeInput(actions: TextAnalyticsActions): GeneratedActions {
  return {
    entityRecognitionPiiTasks: actions.recognizePiiEntitiesActions?.map(
      compose(setStrEncodingParam, AddParamsToTask)
    ),
    entityRecognitionTasks: actions.recognizeEntitiesActions?.map(
      compose(setStrEncodingParam, AddParamsToTask)
    ),
    keyPhraseExtractionTasks: actions.extractKeyPhrasesActions?.map(AddParamsToTask),
    // setting the mode version is necessary because the service always expects it
    // https://github.com/Azure/azure-sdk-for-js/issues/14079
    entityLinkingTasks: actions.recognizeLinkedEntitiesActions?.map(
      compose(setStrEncodingParam, compose(setModelVersionParam, AddParamsToTask))
    )
  };
}

function isStringArray(documents: any[]): documents is string[] {
  return typeof documents[0] === "string";
}

/**
 * @internal
 */
function convertToDetectLanguageInput(
  inputs: string[],
  countryHint: string
): DetectLanguageInput[] {
  if (countryHint === "none") {
    countryHint = "";
  }
  return inputs.map(
    (text: string, index): DetectLanguageInput => {
      return {
        id: String(index),
        countryHint,
        text
      };
    }
  );
}

/**
 * @internal
 */
function convertToTextDocumentInput(inputs: string[], language: string): TextDocumentInput[] {
  return inputs.map(
    (text: string, index): TextDocumentInput => {
      return {
        id: String(index),
        language,
        text
      };
    }
  );
}

/**
 * Creates the options the service expects for the analyze sentiment API from the user friendly ones.
 * @param params - the user friendly parameters
 * @internal
 */
function makeAnalyzeSentimentOptionsModel(
  params: AnalyzeSentimentOptions
): GeneratedClientSentimentOptionalParams {
  return {
    abortSignal: params.abortSignal,
    opinionMining: params.includeOpinionMining,
    includeStatistics: params.includeStatistics,
    modelVersion: params.modelVersion,
    requestOptions: params.requestOptions,
    stringIndexType: params.stringIndexType,
    tracingOptions: params.tracingOptions,
    onResponse: params.onResponse,
    serializerOptions: params.serializerOptions
  };
}

/**
 * Creates the options the service expects for the recognize pii entities API from the user friendly ones.
 * @param params - the user friendly parameters
 * @internal
 */
function makePiiEntitiesOptionsModel(
  params: RecognizePiiEntitiesOptions
): GeneratedClientEntitiesRecognitionPiiOptionalParams {
  return {
    abortSignal: params.abortSignal,
    domain: params.domainFilter,
    includeStatistics: params.includeStatistics,
    modelVersion: params.modelVersion,
    requestOptions: params.requestOptions,
    stringIndexType: params.stringIndexType,
    tracingOptions: params.tracingOptions,
    piiCategories: params.categoriesFilter,
    onResponse: params.onResponse,
    serializerOptions: params.serializerOptions
  };
}

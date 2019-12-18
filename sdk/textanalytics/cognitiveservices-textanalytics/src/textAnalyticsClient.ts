// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  PipelineOptions,
  createPipelineFromOptions,
  signingPolicy,
  InternalPipelineOptions,
  isTokenCredential,
  bearerTokenAuthenticationPolicy,
  operationOptionsToRequestOptionsBase,
  OperationOptions
} from "@azure/core-http";
import { TokenCredential } from "@azure/identity";
import { SDK_VERSION } from "./constants";
import { TextAnalyticsClient as GeneratedClient } from "./generated/textAnalyticsClient";
import { logger } from "./logger";
import { LanguageInput, MultiLanguageInput } from "./generated/models";
import {
  DetectLanguageResultCollection,
  makeDetectLanguageResultCollection
} from "./detectLanguageResultCollection";
import {
  RecognizeEntitiesResultCollection,
  makeRecognizeEntitiesResultCollection
} from "./recognizeEntitiesResultCollection";
import {
  AnalyzeSentimentResultCollection,
  makeAnalyzeSentimentResultCollection
} from "./analyzeSentimentResultCollection";
import {
  makeExtractKeyPhrasesResultCollection,
  ExtractKeyPhrasesResultCollection
} from "./extractKeyPhrasesResultCollection";
import {
  RecognizeLinkedEntitiesResultCollection,
  makeRecognizeLinkedEntitiesResultCollection
} from "./recognizeLinkedEntitiesResultCollection";
import { CognitiveServicesCredential } from "./cognitiveServicesCredential";
import { createSpan } from "./tracing";
import { CanonicalCode } from "@opentelemetry/types";

const DEFAULT_COGNITIVE_SCOPE = "https://cognitiveservices.azure.com/.default";

/**
 * Client options used to configure TextAnalytics API requests.
 */
export interface TextAnalyticsClientOptions extends PipelineOptions {
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
 * Options common to all text analytics operations.
 */
export interface TextAnalyticsOperationOptions extends OperationOptions {
  /**
   * This value indicates which model will be used for scoring. If a model-version is
   * not specified, the API should default to the latest, non-preview version.
   */
  modelVersion?: string;
  /**
   * If set to true, response will contain input and document level statistics.
   */
  includeStatistics?: boolean;
}

/**
 * Options for the detect languages operation.
 */
export interface DetectLanguagesOptions extends TextAnalyticsOperationOptions {}

/**
 * Options for the recognize entities operation.
 */
export interface RecognizeEntitiesOptions extends TextAnalyticsOperationOptions {}

/**
 * Options for the analyze sentiment operation.
 */
export interface AnalyzeSentimentOptions extends TextAnalyticsOperationOptions {}

/**
 * Options for the extract key phrases operation.
 */
export interface ExtractKeyPhrasesOptions extends TextAnalyticsOperationOptions {}

/**
 * Options for the recognize linked entities operation.
 */
export interface RecognizeLinkedEntitiesOptions extends TextAnalyticsOperationOptions {}

/**
 * Options for the recognize PII entities operation.
 */
export interface RecognizePiiEntitiesOptions extends TextAnalyticsOperationOptions {}

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
   * @ignore
   * A reference to the auto-generated TextAnalytics HTTP client.
   */
  private readonly client: GeneratedClient;

  /**
   * Creates an instance of TextAnalyticsClient.
   *
   * Example usage:
   * ```ts
   * import { TextAnalyticsClient, CognitiveServicesCredential } from "@azure/cognitiveservices-textanalytics";
   *
   * const client = new TextAnalyticsClient(
   *    "<service endpoint>",
   *    new CognitiveServicesCredential("<subscription key>")
   * );
   * ```
   * @param {string} endpointUrl The URL to the TextAnalytics endpoint
   * @param {TokenCredential | CognitiveServicesCredential} credential Used to authenticate requests to the service.
   * @param {TextAnalyticsClientOptions} [options] Used to configure the TextAnalytics client.
   */
  constructor(
    endpointUrl: string,
    credential: TokenCredential | CognitiveServicesCredential,
    options: TextAnalyticsClientOptions = {}
  ) {
    this.endpointUrl = endpointUrl;
    const { defaultCountryHint = "us", defaultLanguage = "en", ...pipelineOptions } = options;
    this.defaultCountryHint = defaultCountryHint;
    this.defaultLanguage = defaultLanguage;

    const libInfo = `azsdk-js-cognitiveservices-textanalytics/${SDK_VERSION}`;
    if (pipelineOptions.userAgentOptions) {
      pipelineOptions.userAgentOptions.userAgentPrefix !== undefined
        ? `${pipelineOptions.userAgentOptions.userAgentPrefix} ${libInfo}`
        : libInfo;
    } else {
      pipelineOptions.userAgentOptions = {
        userAgentPrefix: libInfo
      };
    }

    const authPolicy = isTokenCredential(credential)
      ? bearerTokenAuthenticationPolicy(credential, DEFAULT_COGNITIVE_SCOPE)
      : signingPolicy(credential);

    const internalPipelineOptions: InternalPipelineOptions = {
      ...pipelineOptions,
      ...{
        loggingOptions: {
          logger: logger.info,
          allowedHeaderNames: ["x-ms-correlation-request-id", "x-ms-request-id"]
        }
      }
    };

    const pipeline = createPipelineFromOptions(internalPipelineOptions, authPolicy);
    this.client = new GeneratedClient(credential, this.endpointUrl, pipeline);
  }

  /**
   * Runs a predictive model to determine the language that the passed-in
   * input strings are written in, and returns, for each one, the detected
   * language as well as a score indicating the model's confidence that the
   * inferred language is correct.  Scores close to 1 indicate high certainty in
   * the result.  120 languages are supported.
   * @param inputs A collection of input strings to analyze.
   * @param countryHint Indicates the country of origin for all of
   *   the input strings to assist the text analytics model in predicting
   *   the language they is written in.  If unspecified, this value will be
   *   set to the default country hint in `TextAnalyticsClientOptions`.
   *   If set to an empty string, the service will apply a model where the
   *   country is explicitly set to "None".
   *   The same country hint is applied to all strings in the input collection.
   * @param options Optional parameters for the operation.
   */
  public async detectLanguages(
    inputs: string[],
    countryHint?: string,
    options?: DetectLanguagesOptions
  ): Promise<DetectLanguageResultCollection>;
  /**
   * Runs a predictive model to determine the language that the passed-in
   * input document are written in, and returns, for each one, the detected
   * language as well as a score indicating the model's confidence that the
   * inferred language is correct.  Scores close to 1 indicate high certainty in
   * the result.  120 languages are supported.
   * @param inputs A collection of input documents to analyze.
   * @param options Optional parameters for the operation.
   */
  public async detectLanguages(
    inputs: LanguageInput[],
    options?: DetectLanguagesOptions
  ): Promise<DetectLanguageResultCollection>;
  public async detectLanguages(
    inputs: string[] | LanguageInput[],
    countryHintOrOptions?: string | DetectLanguagesOptions,
    options?: DetectLanguagesOptions
  ): Promise<DetectLanguageResultCollection> {
    let realOptions: DetectLanguagesOptions;
    let realInputs: LanguageInput[];

    if (isStringArray(inputs)) {
      const countryHint = (countryHintOrOptions as string) || this.defaultCountryHint;
      realInputs = convertToLanguageInput(inputs, countryHint);
      realOptions = options || {};
    } else {
      realInputs = inputs;
      realOptions = (countryHintOrOptions as DetectLanguagesOptions) || {};
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
        operationOptionsToRequestOptionsBase(finalOptions)
      );

      return makeDetectLanguageResultCollection(
        realInputs,
        result.documents,
        result.errors,
        result.modelVersion,
        result.statistics
      );
    } catch (e) {
      span.setStatus({
        code: CanonicalCode.UNKNOWN,
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
   * available categories, see
   * https://docs.microsoft.com/en-us/azure/cognitive-services/Text-Analytics/named-entity-types.
   * For a list of languages supported by this operation, see
   * https://docs.microsoft.com/en-us/azure/cognitive-services/text-analytics/language-support.
   * @param inputs The input strings to analyze.
   * @param language The language that all the input strings are
        written in. If unspecified, this value will be set to the default
        language in `TextAnalyticsClientOptions`.  
        If set to an empty string, the service will apply a model
        where the lanuage is explicitly set to "None".
   * @param options Optional parameters for the operation.
   */
  public async recognizeEntities(
    inputs: string[],
    language?: string,
    options?: RecognizeEntitiesOptions
  ): Promise<RecognizeEntitiesResultCollection>;
  /**
   * Runs a predictive model to identify a collection of named entities
   * in the passed-in input documents, and categorize those entities into types
   * such as person, location, or organization.  For more information on
   * available categories, see
   * https://docs.microsoft.com/en-us/azure/cognitive-services/Text-Analytics/named-entity-types.
   * For a list of languages supported by this operation, see
   * https://docs.microsoft.com/en-us/azure/cognitive-services/text-analytics/language-support.
   * @param inputs The input documents to analyze.
   * @param options Optional parameters for the operation.
   */
  public async recognizeEntities(
    inputs: MultiLanguageInput[],
    options?: RecognizeEntitiesOptions
  ): Promise<RecognizeEntitiesResultCollection>;
  public async recognizeEntities(
    inputs: string[] | MultiLanguageInput[],
    languageOrOptions?: string | RecognizeEntitiesOptions,
    options?: RecognizeEntitiesOptions
  ): Promise<RecognizeEntitiesResultCollection> {
    let realOptions: RecognizeEntitiesOptions;
    let realInputs: MultiLanguageInput[];

    if (isStringArray(inputs)) {
      const language = (languageOrOptions as string) || this.defaultLanguage;
      realInputs = convertToMultiLanguageInput(inputs, language);
      realOptions = options || {};
    } else {
      realInputs = inputs;
      realOptions = (languageOrOptions as RecognizeEntitiesOptions) || {};
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
        operationOptionsToRequestOptionsBase(finalOptions)
      );

      return makeRecognizeEntitiesResultCollection(
        realInputs,
        result.documents,
        result.errors,
        result.modelVersion,
        result.statistics
      );
    } catch (e) {
      span.setStatus({
        code: CanonicalCode.UNKNOWN,
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Runs a predictive model to identify the positive, negative or neutral
   * sentiment contained in the input strings, as well as scores indicating
   * the model's confidence in each of the predicted sentiments.
   * For a list of languages supported by this operation, see
   * https://docs.microsoft.com/en-us/azure/cognitive-services/text-analytics/language-support.
   * @param inputs The input strings to analyze.
   * @param language The language that all the input strings are
        written in. If unspecified, this value will be set to the default
        language in `TextAnalyticsClientOptions`.  
        If set to an empty string, the service will apply a model
        where the lanuage is explicitly set to "None".
   * @param options Optional parameters for the operation.
   */
  public async analyzeSentiment(
    inputs: string[],
    language?: string,
    options?: AnalyzeSentimentOptions
  ): Promise<AnalyzeSentimentResultCollection>;
  /**
   * Runs a predictive model to identify the positive, negative or neutral
   * sentiment contained in the input documents, as well as scores indicating
   * the model's confidence in each of the predicted sentiments.
   * For a list of languages supported by this operation, see
   * https://docs.microsoft.com/en-us/azure/cognitive-services/text-analytics/language-support.
   * @param inputs The input documents to analyze.
   * @param options Optional parameters for the operation.
   */
  public async analyzeSentiment(
    inputs: MultiLanguageInput[],
    options?: AnalyzeSentimentOptions
  ): Promise<AnalyzeSentimentResultCollection>;
  public async analyzeSentiment(
    inputs: string[] | MultiLanguageInput[],
    languageOrOptions?: string | AnalyzeSentimentOptions,
    options?: AnalyzeSentimentOptions
  ): Promise<AnalyzeSentimentResultCollection> {
    let realOptions: AnalyzeSentimentOptions;
    let realInputs: MultiLanguageInput[];

    if (isStringArray(inputs)) {
      const language = (languageOrOptions as string) || this.defaultLanguage;
      realInputs = convertToMultiLanguageInput(inputs, language);
      realOptions = options || {};
    } else {
      realInputs = inputs;
      realOptions = (languageOrOptions as AnalyzeSentimentOptions) || {};
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
        operationOptionsToRequestOptionsBase(finalOptions)
      );

      return makeAnalyzeSentimentResultCollection(
        realInputs,
        result.documents,
        result.errors,
        result.modelVersion,
        result.statistics
      );
    } catch (e) {
      span.setStatus({
        code: CanonicalCode.UNKNOWN,
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
   * For a list of languages supported by this operation, see
   * https://docs.microsoft.com/en-us/azure/cognitive-services/text-analytics/language-support.
   * @param inputs The input strings to analyze.
   * @param language The language that all the input strings are
        written in. If unspecified, this value will be set to the default
        language in `TextAnalyticsClientOptions`.  
        If set to an empty string, the service will apply a model
        where the lanuage is explicitly set to "None".
   * @param options Optional parameters for the operation.
   */
  public async extractKeyPhrases(
    inputs: string[],
    language?: string,
    options?: ExtractKeyPhrasesOptions
  ): Promise<ExtractKeyPhrasesResultCollection>;
  /**
   * Runs a model to identify a collection of significant phrases
   * found in the passed-in input documents.
   * For a list of languages supported by this operation, see
   * https://docs.microsoft.com/en-us/azure/cognitive-services/text-analytics/language-support.
   * @param inputs The input documents to analyze.
   * @param options Optional parameters for the operation.
   */
  public async extractKeyPhrases(
    inputs: MultiLanguageInput[],
    options?: ExtractKeyPhrasesOptions
  ): Promise<ExtractKeyPhrasesResultCollection>;
  public async extractKeyPhrases(
    inputs: string[] | MultiLanguageInput[],
    languageOrOptions?: string | ExtractKeyPhrasesOptions,
    options?: ExtractKeyPhrasesOptions
  ): Promise<ExtractKeyPhrasesResultCollection> {
    let realOptions: ExtractKeyPhrasesOptions;
    let realInputs: MultiLanguageInput[];

    if (isStringArray(inputs)) {
      const language = (languageOrOptions as string) || this.defaultLanguage;
      realInputs = convertToMultiLanguageInput(inputs, language);
      realOptions = options || {};
    } else {
      realInputs = inputs;
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
        operationOptionsToRequestOptionsBase(finalOptions)
      );

      return makeExtractKeyPhrasesResultCollection(
        realInputs,
        result.documents,
        result.errors,
        result.modelVersion,
        result.statistics
      );
    } catch (e) {
      span.setStatus({
        code: CanonicalCode.UNKNOWN,
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
   * For a list of languages supported by this operation, see
   * https://docs.microsoft.com/en-us/azure/cognitive-services/text-analytics/language-support.
   * @param inputs The input strings to analyze.
   * @param language The language that all the input strings are
        written in. If unspecified, this value will be set to the default
        language in `TextAnalyticsClientOptions`.  
        If set to an empty string, the service will apply a model
        where the lanuage is explicitly set to "None".
   * @param options Optional parameters for the operation.
   */
  public async recognizePiiEntities(
    inputs: string[],
    language?: string,
    options?: RecognizePiiEntitiesOptions
  ): Promise<RecognizeEntitiesResultCollection>;
  /**
   * Runs a predictive model to identify a collection of entities containing
   * personally identifiable information found in the passed-in input documents,
   * and categorize those entities into types such as US social security
   * number, drivers license number, or credit card number.
   * For a list of languages supported by this operation, see
   * https://docs.microsoft.com/en-us/azure/cognitive-services/text-analytics/language-support.
   * @param inputs The input documents to analyze.
   * @param options Optional parameters for the operation.
   */
  public async recognizePiiEntities(
    inputs: MultiLanguageInput[],
    options?: RecognizePiiEntitiesOptions
  ): Promise<RecognizeEntitiesResultCollection>;
  public async recognizePiiEntities(
    inputs: string[] | MultiLanguageInput[],
    languageOrOptions?: string | RecognizePiiEntitiesOptions,
    options?: RecognizePiiEntitiesOptions
  ): Promise<RecognizeEntitiesResultCollection> {
    let realOptions: RecognizePiiEntitiesOptions;
    let realInputs: MultiLanguageInput[];

    if (isStringArray(inputs)) {
      const language = (languageOrOptions as string) || this.defaultLanguage;
      realInputs = convertToMultiLanguageInput(inputs, language);
      realOptions = options || {};
    } else {
      realInputs = inputs;
      realOptions = (languageOrOptions as RecognizePiiEntitiesOptions) || {};
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
        operationOptionsToRequestOptionsBase(finalOptions)
      );

      return makeRecognizeEntitiesResultCollection(
        realInputs,
        result.documents,
        result.errors,
        result.modelVersion,
        result.statistics
      );
    } catch (e) {
      span.setStatus({
        code: CanonicalCode.UNKNOWN,
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
   * For a list of languages supported by this operation, see
   * https://docs.microsoft.com/en-us/azure/cognitive-services/text-analytics/language-support.
   * @param inputs The input strings to analyze.
   * @param language The language that all the input strings are
        written in. If unspecified, this value will be set to the default
        language in `TextAnalyticsClientOptions`.  
        If set to an empty string, the service will apply a model
        where the lanuage is explicitly set to "None".
   * @param options Optional parameters for the operation.
   */
  public async recognizeLinkedEntities(
    inputs: string[],
    language?: string,
    options?: RecognizeLinkedEntitiesOptions
  ): Promise<RecognizeLinkedEntitiesResultCollection>;
  /**
   * Runs a predictive model to identify a collection of entities
   * found in the passed-in input documents, and include information linking the
   * entities to their corresponding entries in a well-known knowledge base.
   * For a list of languages supported by this operation, see
   * https://docs.microsoft.com/en-us/azure/cognitive-services/text-analytics/language-support.
   * @param inputs The input documents to analyze.
   * @param options Optional parameters for the operation.
   */
  public async recognizeLinkedEntities(
    inputs: MultiLanguageInput[],
    options?: RecognizeLinkedEntitiesOptions
  ): Promise<RecognizeLinkedEntitiesResultCollection>;
  public async recognizeLinkedEntities(
    inputs: string[] | MultiLanguageInput[],
    languageOrOptions?: string | RecognizeLinkedEntitiesOptions,
    options?: RecognizeLinkedEntitiesOptions
  ): Promise<RecognizeLinkedEntitiesResultCollection> {
    let realOptions: RecognizeLinkedEntitiesOptions;
    let realInputs: MultiLanguageInput[];

    if (isStringArray(inputs)) {
      const language = (languageOrOptions as string) || this.defaultLanguage;
      realInputs = convertToMultiLanguageInput(inputs, language);
      realOptions = options || {};
    } else {
      realInputs = inputs;
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
        operationOptionsToRequestOptionsBase(finalOptions)
      );

      return makeRecognizeLinkedEntitiesResultCollection(
        realInputs,
        result.documents,
        result.errors,
        result.modelVersion,
        result.statistics
      );
    } catch (e) {
      span.setStatus({
        code: CanonicalCode.UNKNOWN,
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }
}

function isStringArray(inputs: any[]): inputs is string[] {
  return typeof inputs[0] === "string";
}

function convertToLanguageInput(inputs: string[], countryHint: string): LanguageInput[] {
  return inputs.map(
    (text: string, index): LanguageInput => {
      return {
        id: String(index),
        countryHint,
        text
      };
    }
  );
}

function convertToMultiLanguageInput(inputs: string[], language: string): MultiLanguageInput[] {
  return inputs.map(
    (text: string, index): MultiLanguageInput => {
      return {
        id: String(index),
        language,
        text
      };
    }
  );
}

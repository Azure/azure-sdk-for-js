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
import { GeneratedClient } from "./generated/generatedClient";
import { logger } from "./logger";
import {
  LanguageInput as DetectLanguageInput,
  MultiLanguageInput as TextDocumentInput
} from "./generated/models";
import {
  DetectLanguageResultCollection,
  makeDetectLanguageResultCollection
} from "./detectLanguageResultCollection";
import {
  RecognizeCategorizedEntitiesResultCollection,
  makeRecognizeCategorizedEntitiesResultCollection
} from "./recognizeCategorizedEntitiesResultCollection";
import {
  RecognizePiiEntitiesResultCollection,
  makeRecognizePiiEntitiesResultCollection
} from "./recognizePiiEntitiesResultCollection";
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
import { TextAnalyticsApiKeyCredential } from "./textAnalyticsApiKeyCredential";
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
   * For supported model versions, see operation-specific documentation, for example:
   * https://docs.microsoft.com/en-us/azure/cognitive-services/text-analytics/how-tos/text-analytics-how-to-sentiment-analysis#model-versioning
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
export type DetectLanguageOptions = TextAnalyticsOperationOptions;

/**
 * Options for the recognize entities operation.
 */
export type RecognizeCategorizedEntitiesOptions = TextAnalyticsOperationOptions;

/**
 * Options for the analyze sentiment operation.
 */
export type AnalyzeSentimentOptions = TextAnalyticsOperationOptions;

/**
 * Options for the extract key phrases operation.
 */
export type ExtractKeyPhrasesOptions = TextAnalyticsOperationOptions;

/**
 * Options for the recognize linked entities operation.
 */
export type RecognizeLinkedEntitiesOptions = TextAnalyticsOperationOptions;

/**
 * Options for the recognize PII entities operation.
 */
export type RecognizePiiEntitiesOptions = TextAnalyticsOperationOptions;

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
   * import { TextAnalyticsClient, TextAnalyticsApiKeyCredential } from "@azure/ai-text-analytics";
   *
   * const client = new TextAnalyticsClient(
   *    "<service endpoint>",
   *    new TextAnalyticsApiKeyCredential("<api key>")
   * );
   * ```
   * @param {string} endpointUrl The URL to the TextAnalytics endpoint
   * @param {TokenCredential | TextAnalyticsApiKeyCredential} credential Used to authenticate requests to the service.
   * @param {TextAnalyticsClientOptions} [options] Used to configure the TextAnalytics client.
   */
  constructor(
    endpointUrl: string,
    credential: TokenCredential | TextAnalyticsApiKeyCredential,
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
   *   the language they are written in.  If unspecified, this value will be
   *   set to the default country hint in `TextAnalyticsClientOptions`.
   *   If set to an empty string, or the string "none", the service will apply a
   *   model where the country is explicitly unset.
   *   The same country hint is applied to all strings in the input collection.
   * @param options Optional parameters for the operation.
   */
  public async detectLanguage(
    inputs: string[],
    countryHint?: string,
    options?: DetectLanguageOptions
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
  public async detectLanguage(
    inputs: DetectLanguageInput[],
    options?: DetectLanguageOptions
  ): Promise<DetectLanguageResultCollection>;
  public async detectLanguage(
    inputs: string[] | DetectLanguageInput[],
    countryHintOrOptions?: string | DetectLanguageOptions,
    options?: DetectLanguageOptions
  ): Promise<DetectLanguageResultCollection> {
    let realOptions: DetectLanguageOptions;
    let realInputs: DetectLanguageInput[];

    if (isStringArray(inputs)) {
      const countryHint = (countryHintOrOptions as string) || this.defaultCountryHint;
      realInputs = convertToDetectLanguageInput(inputs, countryHint);
      realOptions = options || {};
    } else {
      // Replace "none" hints with ""
      realInputs = inputs.map((input) => ({
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
    options?: RecognizeCategorizedEntitiesOptions
  ): Promise<RecognizeCategorizedEntitiesResultCollection>;
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
    inputs: TextDocumentInput[],
    options?: RecognizeCategorizedEntitiesOptions
  ): Promise<RecognizeCategorizedEntitiesResultCollection>;
  public async recognizeEntities(
    inputs: string[] | TextDocumentInput[],
    languageOrOptions?: string | RecognizeCategorizedEntitiesOptions,
    options?: RecognizeCategorizedEntitiesOptions
  ): Promise<RecognizeCategorizedEntitiesResultCollection> {
    let realOptions: RecognizeCategorizedEntitiesOptions;
    let realInputs: TextDocumentInput[];

    if (isStringArray(inputs)) {
      const language = (languageOrOptions as string) || this.defaultLanguage;
      realInputs = convertToTextDocumentInput(inputs, language);
      realOptions = options || {};
    } else {
      realInputs = inputs;
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
        operationOptionsToRequestOptionsBase(finalOptions)
      );

      return makeRecognizeCategorizedEntitiesResultCollection(
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
   * Runs a predictive model to identify the positive, negative, neutral, or mixed
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
   * Runs a predictive model to identify the positive, negative or neutral, or mixed
   * sentiment contained in the input documents, as well as scores indicating
   * the model's confidence in each of the predicted sentiments.
   * For a list of languages supported by this operation, see
   * https://docs.microsoft.com/en-us/azure/cognitive-services/text-analytics/language-support.
   * @param inputs The input documents to analyze.
   * @param options Optional parameters for the operation.
   */
  public async analyzeSentiment(
    inputs: TextDocumentInput[],
    options?: AnalyzeSentimentOptions
  ): Promise<AnalyzeSentimentResultCollection>;
  public async analyzeSentiment(
    inputs: string[] | TextDocumentInput[],
    languageOrOptions?: string | AnalyzeSentimentOptions,
    options?: AnalyzeSentimentOptions
  ): Promise<AnalyzeSentimentResultCollection> {
    let realOptions: AnalyzeSentimentOptions;
    let realInputs: TextDocumentInput[];

    if (isStringArray(inputs)) {
      const language = (languageOrOptions as string) || this.defaultLanguage;
      realInputs = convertToTextDocumentInput(inputs, language);
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
    inputs: TextDocumentInput[],
    options?: ExtractKeyPhrasesOptions
  ): Promise<ExtractKeyPhrasesResultCollection>;
  public async extractKeyPhrases(
    inputs: string[] | TextDocumentInput[],
    languageOrOptions?: string | ExtractKeyPhrasesOptions,
    options?: ExtractKeyPhrasesOptions
  ): Promise<ExtractKeyPhrasesResultCollection> {
    let realOptions: ExtractKeyPhrasesOptions;
    let realInputs: TextDocumentInput[];

    if (isStringArray(inputs)) {
      const language = (languageOrOptions as string) || this.defaultLanguage;
      realInputs = convertToTextDocumentInput(inputs, language);
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
  ): Promise<RecognizePiiEntitiesResultCollection>;
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
    inputs: TextDocumentInput[],
    options?: RecognizePiiEntitiesOptions
  ): Promise<RecognizePiiEntitiesResultCollection>;
  public async recognizePiiEntities(
    inputs: string[] | TextDocumentInput[],
    languageOrOptions?: string | RecognizePiiEntitiesOptions,
    options?: RecognizePiiEntitiesOptions
  ): Promise<RecognizePiiEntitiesResultCollection> {
    let realOptions: RecognizePiiEntitiesOptions;
    let realInputs: TextDocumentInput[];

    if (isStringArray(inputs)) {
      const language = (languageOrOptions as string) || this.defaultLanguage;
      realInputs = convertToTextDocumentInput(inputs, language);
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

      return makeRecognizePiiEntitiesResultCollection(
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
    inputs: TextDocumentInput[],
    options?: RecognizeLinkedEntitiesOptions
  ): Promise<RecognizeLinkedEntitiesResultCollection>;
  public async recognizeLinkedEntities(
    inputs: string[] | TextDocumentInput[],
    languageOrOptions?: string | RecognizeLinkedEntitiesOptions,
    options?: RecognizeLinkedEntitiesOptions
  ): Promise<RecognizeLinkedEntitiesResultCollection> {
    let realOptions: RecognizeLinkedEntitiesOptions;
    let realInputs: TextDocumentInput[];

    if (isStringArray(inputs)) {
      const language = (languageOrOptions as string) || this.defaultLanguage;
      realInputs = convertToTextDocumentInput(inputs, language);
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

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

export interface TextAnalyticsOperationOptions extends OperationOptions {
  /**
   * (Optional) This value indicates which model will be used for scoring. If a model-version is
   * not specified, the API should default to the latest, non-preview version.
   */
  modelVersion?: string;
  /**
   * (Optional) if set to true, response will contain input and document level statistics.
   */
  showStats?: boolean;
}

export interface DetectLanguageOptions extends TextAnalyticsOperationOptions {}

export interface DetectLanguagesOptions extends TextAnalyticsOperationOptions {}

export interface RecognizeEntitiesOptions extends TextAnalyticsOperationOptions {}

export interface AnalyzeSentimentOptions extends TextAnalyticsOperationOptions {}

export interface ExtractKeyPhrasesOptions extends TextAnalyticsOperationOptions {}

export interface RecognizeLinkedEntitiesOptions extends TextAnalyticsOperationOptions {}

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
   * // TODO
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

  public async detectLanguages(
    inputs: string[],
    countryHint?: string,
    options?: DetectLanguagesOptions
  ): Promise<DetectLanguageResultCollection>;
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

  public async recognizeEntities(
    inputs: string[],
    language?: string,
    options?: RecognizeEntitiesOptions
  ): Promise<RecognizeEntitiesResultCollection>;
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

  public async analyzeSentiment(
    inputs: string[],
    language?: string,
    options?: AnalyzeSentimentOptions
  ): Promise<AnalyzeSentimentResultCollection>;
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

  public async extractKeyPhrases(
    inputs: string[],
    language?: string,
    options?: ExtractKeyPhrasesOptions
  ): Promise<ExtractKeyPhrasesResultCollection>;
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

  public async recognizePiiEntities(
    inputs: string[],
    language?: string,
    options?: RecognizePiiEntitiesOptions
  ): Promise<RecognizeEntitiesResultCollection>;
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

  public async recognizeLinkedEntities(
    inputs: string[],
    language?: string,
    options?: RecognizeLinkedEntitiesOptions
  ): Promise<RecognizeLinkedEntitiesResultCollection>;
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

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
  ExtractLinkedEntitiesResultCollection,
  makeExtractLinkedEntitiesResultCollection
} from "./extractLinkedEntitiesResultCollection";
import { CognitiveServicesCredentials } from "./cognitiveServicesCredentials";

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

export interface ExtractEntityLinkingOptions extends TextAnalyticsOperationOptions {}

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
   * @param {TokenCredential | CognitiveServicesCredentials} credential Used to authenticate requests to the service.
   * @param {TextAnalyticsClientOptions} [options] Used to configure the TextAnalytics client.
   */
  constructor(
    endpointUrl: string,
    credential: TokenCredential | CognitiveServicesCredentials,
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

  public async detectLanguage(
    input: string[],
    countryHint?: string,
    options?: DetectLanguagesOptions
  ): Promise<DetectLanguageResultCollection>;
  public async detectLanguage(
    input: LanguageInput[],
    options?: DetectLanguagesOptions
  ): Promise<DetectLanguageResultCollection>;
  public async detectLanguage(
    input: string[] | LanguageInput[],
    countryHintOrOptions?: string | DetectLanguagesOptions,
    options?: DetectLanguagesOptions
  ): Promise<DetectLanguageResultCollection> {
    let realOptions: DetectLanguagesOptions;
    let realInput: LanguageInput[];

    if (isStringArray(input)) {
      const countryHint = (countryHintOrOptions as string) || this.defaultCountryHint;
      realInput = convertToLanguageInput(input, countryHint);
      realOptions = options || {};
    } else {
      realInput = input;
      realOptions = (countryHintOrOptions as DetectLanguagesOptions) || {};
    }

    const result = await this.client.languages(
      {
        documents: realInput
      },
      operationOptionsToRequestOptionsBase(realOptions)
    );

    return makeDetectLanguageResultCollection(
      realInput,
      result.documents,
      result.errors,
      result.modelVersion,
      result.statistics
    );
  }

  public async recognizeEntities(
    input: string[],
    language?: string,
    options?: RecognizeEntitiesOptions
  ): Promise<RecognizeEntitiesResultCollection>;
  public async recognizeEntities(
    input: MultiLanguageInput[],
    options?: RecognizeEntitiesOptions
  ): Promise<RecognizeEntitiesResultCollection>;
  public async recognizeEntities(
    input: string[] | MultiLanguageInput[],
    languageOrOptions?: string | RecognizeEntitiesOptions,
    options?: RecognizeEntitiesOptions
  ): Promise<RecognizeEntitiesResultCollection> {
    let realOptions: RecognizeEntitiesOptions;
    let realInput: MultiLanguageInput[];

    if (isStringArray(input)) {
      const language = (languageOrOptions as string) || this.defaultLanguage;
      realInput = convertToMultiLanguageInput(input, language);
      realOptions = options || {};
    } else {
      realInput = input;
      realOptions = (languageOrOptions as RecognizeEntitiesOptions) || {};
    }

    const result = await this.client.entitiesRecognitionGeneral(
      {
        documents: realInput
      },
      operationOptionsToRequestOptionsBase(realOptions)
    );

    return makeRecognizeEntitiesResultCollection(
      realInput,
      result.documents,
      result.errors,
      result.modelVersion,
      result.statistics
    );
  }

  public async analyzeSentiment(
    input: string[],
    language?: string,
    options?: AnalyzeSentimentOptions
  ): Promise<AnalyzeSentimentResultCollection>;
  public async analyzeSentiment(
    input: MultiLanguageInput[],
    options?: AnalyzeSentimentOptions
  ): Promise<AnalyzeSentimentResultCollection>;
  public async analyzeSentiment(
    input: string[] | MultiLanguageInput[],
    languageOrOptions?: string | AnalyzeSentimentOptions,
    options?: AnalyzeSentimentOptions
  ): Promise<AnalyzeSentimentResultCollection> {
    let realOptions: AnalyzeSentimentOptions;
    let realInput: MultiLanguageInput[];

    if (isStringArray(input)) {
      const language = (languageOrOptions as string) || this.defaultLanguage;
      realInput = convertToMultiLanguageInput(input, language);
      realOptions = options || {};
    } else {
      realInput = input;
      realOptions = (languageOrOptions as AnalyzeSentimentOptions) || {};
    }

    const result = await this.client.sentiment(
      {
        documents: realInput
      },
      operationOptionsToRequestOptionsBase(realOptions)
    );

    return makeAnalyzeSentimentResultCollection(
      realInput,
      result.documents,
      result.errors,
      result.modelVersion,
      result.statistics
    );
  }

  public async extractKeyPhrases(
    input: string[],
    language?: string,
    options?: ExtractKeyPhrasesOptions
  ): Promise<ExtractKeyPhrasesResultCollection>;
  public async extractKeyPhrases(
    input: MultiLanguageInput[],
    options?: ExtractKeyPhrasesOptions
  ): Promise<ExtractKeyPhrasesResultCollection>;
  public async extractKeyPhrases(
    input: string[] | MultiLanguageInput[],
    languageOrOptions?: string | ExtractKeyPhrasesOptions,
    options?: ExtractKeyPhrasesOptions
  ): Promise<ExtractKeyPhrasesResultCollection> {
    let realOptions: ExtractKeyPhrasesOptions;
    let realInput: MultiLanguageInput[];

    if (isStringArray(input)) {
      const language = (languageOrOptions as string) || this.defaultLanguage;
      realInput = convertToMultiLanguageInput(input, language);
      realOptions = options || {};
    } else {
      realInput = input;
      realOptions = (languageOrOptions as ExtractKeyPhrasesOptions) || {};
    }

    const result = await this.client.keyPhrases(
      {
        documents: realInput
      },
      operationOptionsToRequestOptionsBase(realOptions)
    );

    return makeExtractKeyPhrasesResultCollection(
      realInput,
      result.documents,
      result.errors,
      result.modelVersion,
      result.statistics
    );
  }

  public async recognizePiiEntities(
    input: string[],
    language?: string,
    options?: RecognizePiiEntitiesOptions
  ): Promise<RecognizeEntitiesResultCollection>;
  public async recognizePiiEntities(
    input: MultiLanguageInput[],
    options?: RecognizePiiEntitiesOptions
  ): Promise<RecognizeEntitiesResultCollection>;
  public async recognizePiiEntities(
    input: string[] | MultiLanguageInput[],
    languageOrOptions?: string | RecognizePiiEntitiesOptions,
    options?: RecognizePiiEntitiesOptions
  ): Promise<RecognizeEntitiesResultCollection> {
    let realOptions: RecognizePiiEntitiesOptions;
    let realInput: MultiLanguageInput[];

    if (isStringArray(input)) {
      const language = (languageOrOptions as string) || this.defaultLanguage;
      realInput = convertToMultiLanguageInput(input, language);
      realOptions = options || {};
    } else {
      realInput = input;
      realOptions = (languageOrOptions as RecognizePiiEntitiesOptions) || {};
    }

    const result = await this.client.entitiesRecognitionPii(
      {
        documents: realInput
      },
      operationOptionsToRequestOptionsBase(realOptions)
    );

    return makeRecognizeEntitiesResultCollection(
      realInput,
      result.documents,
      result.errors,
      result.modelVersion,
      result.statistics
    );
  }

  public async extractEntityLinking(
    input: string[],
    language?: string,
    options?: ExtractEntityLinkingOptions
  ): Promise<ExtractLinkedEntitiesResultCollection>;
  public async extractEntityLinking(
    input: MultiLanguageInput[],
    options?: ExtractEntityLinkingOptions
  ): Promise<ExtractLinkedEntitiesResultCollection>;
  public async extractEntityLinking(
    input: string[] | MultiLanguageInput[],
    languageOrOptions?: string | ExtractEntityLinkingOptions,
    options?: ExtractEntityLinkingOptions
  ): Promise<ExtractLinkedEntitiesResultCollection> {
    let realOptions: ExtractEntityLinkingOptions;
    let realInput: MultiLanguageInput[];

    if (isStringArray(input)) {
      const language = (languageOrOptions as string) || this.defaultLanguage;
      realInput = convertToMultiLanguageInput(input, language);
      realOptions = options || {};
    } else {
      realInput = input;
      realOptions = (languageOrOptions as ExtractEntityLinkingOptions) || {};
    }

    const result = await this.client.entitiesLinking(
      {
        documents: realInput
      },
      operationOptionsToRequestOptionsBase(realOptions)
    );

    return makeExtractLinkedEntitiesResultCollection(
      realInput,
      result.documents,
      result.errors,
      result.modelVersion,
      result.statistics
    );
  }
}

function isStringArray(input: any[]): input is string[] {
  return typeof input[0] === "string";
}

function convertToLanguageInput(input: string[], countryHint: string): LanguageInput[] {
  return input.map(
    (text: string, index): LanguageInput => {
      return {
        id: String(index),
        countryHint,
        text
      };
    }
  );
}

function convertToMultiLanguageInput(input: string[], language: string): MultiLanguageInput[] {
  return input.map(
    (text: string, index): MultiLanguageInput => {
      return {
        id: String(index),
        language,
        text
      };
    }
  );
}

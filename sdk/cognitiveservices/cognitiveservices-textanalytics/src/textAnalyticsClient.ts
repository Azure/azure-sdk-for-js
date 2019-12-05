// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  PipelineOptions,
  createPipelineFromOptions,
  signingPolicy,
  InternalPipelineOptions
} from "@azure/core-http";
import { SDK_VERSION } from "./constants";
import { TextAnalyticsClient as GeneratedClient } from "./generated/textAnalyticsClient";
import { CognitiveServicesCredentials } from "./cognitiveServicesCredentials";
import { logger } from "./logger";
import { makeDetectLanguageResult, DetectLanguageResult } from "./detectLanguageResult";
import {
  LanguageInput,
  TextAnalyticsClientLanguagesOptionalParams,
  TextAnalyticsClientEntitiesRecognitionGeneralOptionalParams,
  ErrorModel,
  MultiLanguageInput,
  TextAnalyticsClientSentimentOptionalParams,
  TextAnalyticsClientKeyPhrasesOptionalParams
} from "./generated/models";
import {
  DetectLanguageResultCollection,
  makeDetectLanguageResultCollection
} from "./detectLanguageResultCollection";
import { makeRecognizeEntitiesResult, RecognizeEntitiesResult } from "./recognizeEntitiesResult";
import {
  RecognizeEntitiesResultCollection,
  makeRecognizeEntitiesResultCollection
} from "./recognizeEntitiesResultCollection";
import { makeAnalyzeSentimentResult, AnalyzeSentimentResult } from "./analyzeSentimentResult";
import {
  AnalyzeSentimentResultCollection,
  makeAnalyzeSentimentResultCollection
} from "./analyzeSentimentResultCollection";
import { makeExtractKeyPhrasesResult, ExtractKeyPhrasesResult } from "./extractKeyPhrasesResult";
import {
  makeExtractKeyPhrasesResultCollection,
  ExtractKeyPhrasesResultCollection
} from "./extractKeyPhrasesResultCollection";

export interface TextAnalyticsClientOptions {
  /**
   * Pipeline options used to configure TextAnalytics API requests.
   */
  pipelineOptions?: PipelineOptions;

  /**
   * The default country hint to use. Defaults to "us".
   */
  defaultCountryHint?: string;

  /**
   * The default language to use. Defaults to "en".
   */
  defaultLanguage?: string;
}

export interface DetectLanguageOptions extends TextAnalyticsClientLanguagesOptionalParams {}

export interface DetectLanguagesOptions extends TextAnalyticsClientLanguagesOptionalParams {}

export interface RecognizeEntitiesOptions
  extends TextAnalyticsClientEntitiesRecognitionGeneralOptionalParams {}

export interface AnalyzeSentimentOptions extends TextAnalyticsClientSentimentOptionalParams {}

export interface ExtractKeyPhrasesOptions extends TextAnalyticsClientKeyPhrasesOptionalParams {}

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
   * @param {CognitiveServicesCredentials} credential Used to authenticate requests to the service.
   * @param {TextAnalyticsClientOptions} [options] Used to configure the TextAnalytics client.
   */
  constructor(
    endpointUrl: string,
    credential: CognitiveServicesCredentials,
    options: TextAnalyticsClientOptions = {}
  ) {
    this.endpointUrl = endpointUrl;
    this.defaultCountryHint = options.defaultCountryHint || "us";
    this.defaultLanguage = options.defaultLanguage || "en";
    const pipelineOptions = options.pipelineOptions || {};

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

    const authPolicy = signingPolicy(credential);

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

  public async singleDetectLanguage(
    input: string,
    countryHint: string = this.defaultCountryHint,
    options: DetectLanguageOptions = {}
  ): Promise<DetectLanguageResult> {
    const result = await this.client.languages(
      {
        documents: [
          {
            id: "1",
            countryHint,
            text: input
          }
        ]
      },
      options
    );
    if (result.errors.length) {
      const error: ErrorModel = result.errors[0].error;
      throw new Error(error.message);
    }

    const firstDocument = result.documents[0];
    return makeDetectLanguageResult("", firstDocument.detectedLanguages, firstDocument.statistics);
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
      realOptions
    );

    return makeDetectLanguageResultCollection(
      result.documents,
      result.errors,
      result.modelVersion,
      result.statistics
    );
  }

  public async singleRecognizeEntities(
    inputText: string,
    language: string = this.defaultLanguage,
    options?: RecognizeEntitiesOptions
  ): Promise<RecognizeEntitiesResult> {
    const result = await this.client.entitiesRecognitionGeneral(
      {
        documents: [
          {
            id: "1",
            language,
            text: inputText
          }
        ]
      },
      options
    );

    if (result.errors.length) {
      const error: ErrorModel = result.errors[0].error;
      throw new Error(error.message);
    }

    const firstDocument = result.documents[0];
    return makeRecognizeEntitiesResult("", firstDocument.entities, firstDocument.statistics);
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
      realOptions
    );

    return makeRecognizeEntitiesResultCollection(
      result.documents,
      result.errors,
      result.modelVersion,
      result.statistics
    );
  }

  public async singleAnalyzeSentiment(
    inputText: string,
    language: string = this.defaultLanguage,
    options?: AnalyzeSentimentOptions
  ): Promise<AnalyzeSentimentResult> {
    const result = await this.client.sentiment(
      {
        documents: [
          {
            id: "1",
            language,
            text: inputText
          }
        ]
      },
      options
    );

    if (result.errors.length) {
      const error: ErrorModel = result.errors[0].error;
      throw new Error(error.message);
    }

    const firstDocument = result.documents[0];
    return makeAnalyzeSentimentResult(
      "",
      firstDocument.sentiment,
      firstDocument.documentScores,
      firstDocument.sentences,
      firstDocument.statistics
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
      realOptions
    );

    return makeAnalyzeSentimentResultCollection(
      result.documents,
      result.errors,
      result.modelVersion,
      result.statistics
    );
  }

  public async singleExtractKeyPhrases(
    inputText: string,
    language: string = this.defaultLanguage,
    options?: ExtractKeyPhrasesOptions
  ): Promise<ExtractKeyPhrasesResult> {
    const result = await this.client.keyPhrases(
      {
        documents: [
          {
            id: "1",
            language,
            text: inputText
          }
        ]
      },
      options
    );

    if (result.errors.length) {
      const error: ErrorModel = result.errors[0].error;
      throw new Error(error.message);
    }

    const firstDocument = result.documents[0];
    return makeExtractKeyPhrasesResult("", firstDocument.keyPhrases, firstDocument.statistics);
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
      realOptions
    );

    return makeExtractKeyPhrasesResultCollection(
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
    (text: string): LanguageInput => {
      return {
        id: "",
        countryHint,
        text
      };
    }
  );
}

function convertToMultiLanguageInput(input: string[], language: string): MultiLanguageInput[] {
  return input.map(
    (text: string): MultiLanguageInput => {
      return {
        id: "",
        language,
        text
      };
    }
  );
}

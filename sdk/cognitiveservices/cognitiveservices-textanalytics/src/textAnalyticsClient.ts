// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  PipelineOptions,
  createPipelineFromOptions,
  signingPolicy,
  InternalPipelineOptions,
  isTokenCredential,
  bearerTokenAuthenticationPolicy
} from "@azure/core-http";
import { TokenCredential } from "@azure/identity";
import { SDK_VERSION } from "./constants";
import { TextAnalyticsClient as GeneratedClient } from "./generated/textAnalyticsClient";
import { logger } from "./logger";
import { makeDetectLanguageResult, DetectLanguageSuccessResult } from "./detectLanguageResult";
import {
  LanguageInput,
  TextAnalyticsClientLanguagesOptionalParams,
  TextAnalyticsClientEntitiesRecognitionGeneralOptionalParams,
  TextAnalyticsError,
  MultiLanguageInput,
  TextAnalyticsClientSentimentOptionalParams,
  TextAnalyticsClientKeyPhrasesOptionalParams,
  TextAnalyticsClientEntitiesRecognitionPiiOptionalParams,
  TextAnalyticsClientEntitiesLinkingOptionalParams
} from "./generated/models";
import {
  DetectLanguageResultCollection,
  makeDetectLanguageResultCollection
} from "./detectLanguageResultCollection";
import {
  makeRecognizeEntitiesResult,
  RecognizeEntitiesSuccessResult
} from "./recognizeEntitiesResult";
import {
  RecognizeEntitiesResultCollection,
  makeRecognizeEntitiesResultCollection
} from "./recognizeEntitiesResultCollection";
import {
  makeAnalyzeSentimentResult,
  AnalyzeSentimentSuccessResult
} from "./analyzeSentimentResult";
import {
  AnalyzeSentimentResultCollection,
  makeAnalyzeSentimentResultCollection
} from "./analyzeSentimentResultCollection";
import {
  makeExtractKeyPhrasesResult,
  ExtractKeyPhrasesSuccessResult
} from "./extractKeyPhrasesResult";
import {
  makeExtractKeyPhrasesResultCollection,
  ExtractKeyPhrasesResultCollection
} from "./extractKeyPhrasesResultCollection";
import {
  makeExtractLinkedEntitiesResult,
  ExtractLinkedEntitiesSuccessResult
} from "./extractLinkedEntitiesResult";
import {
  ExtractLinkedEntitiesResultCollection,
  makeExtractLinkedEntitiesResultCollection
} from "./extractLinkedEntitiesResultCollection";
import { CognitiveServicesCredentials } from "./cognitiveServicesCredentials";

const DEFAULT_COGNITIVE_SCOPE = "https://cognitiveservices.azure.com/.default";

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

export interface ExtractEntityLinkingOptions
  extends TextAnalyticsClientEntitiesLinkingOptionalParams {}

export interface RecognizePiiEntitiesOptions
  extends TextAnalyticsClientEntitiesRecognitionPiiOptionalParams {}

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

  public async singleDetectLanguage(
    input: string,
    countryHint: string = this.defaultCountryHint,
    options: DetectLanguageOptions = {}
  ): Promise<DetectLanguageSuccessResult> {
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
      const error: TextAnalyticsError = result.errors[0].error;
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
  ): Promise<RecognizeEntitiesSuccessResult> {
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
      const error: TextAnalyticsError = result.errors[0].error;
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
  ): Promise<AnalyzeSentimentSuccessResult> {
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
      const error: TextAnalyticsError = result.errors[0].error;
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
  ): Promise<ExtractKeyPhrasesSuccessResult> {
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
      const error: TextAnalyticsError = result.errors[0].error;
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

  public async singleRecognizePiiEntities(
    inputText: string,
    language: string = this.defaultLanguage,
    options?: RecognizePiiEntitiesOptions
  ): Promise<RecognizeEntitiesSuccessResult> {
    const result = await this.client.entitiesRecognitionPii(
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
      const error: TextAnalyticsError = result.errors[0].error;
      throw new Error(error.message);
    }

    const firstDocument = result.documents[0];
    return makeRecognizeEntitiesResult("", firstDocument.entities, firstDocument.statistics);
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
      realOptions
    );

    return makeRecognizeEntitiesResultCollection(
      result.documents,
      result.errors,
      result.modelVersion,
      result.statistics
    );
  }

  public async singleExtractEntityLinking(
    inputText: string,
    language: string = this.defaultLanguage,
    options?: ExtractEntityLinkingOptions
  ): Promise<ExtractLinkedEntitiesSuccessResult> {
    const result = await this.client.entitiesLinking(
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
      const error: TextAnalyticsError = result.errors[0].error;
      throw new Error(error.message);
    }

    const firstDocument = result.documents[0];
    return makeExtractLinkedEntitiesResult("", firstDocument.entities, firstDocument.statistics);
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
      realOptions
    );

    return makeExtractLinkedEntitiesResultCollection(
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

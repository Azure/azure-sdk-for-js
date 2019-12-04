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
import { LanguageInput, TextAnalyticsClientLanguagesOptionalParams } from "./generated/models";
import {
  DetectLanguageResultCollection,
  makeDetectLanguageResultCollection
} from "./detectLanguageResultCollection";

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

  public async detectLanguage(
    input: string,
    countryHint: string = this.defaultCountryHint,
    options: DetectLanguageOptions = {}
  ): Promise<DetectLanguageResult> {
    if (!input) {
      throw new Error("Language input can't be empty");
    }
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
      throw new Error(result.errors[0].error);
    }

    const firstDocument = result.documents[0];
    return makeDetectLanguageResult(
      "",
      firstDocument.detectedLanguages || [],
      firstDocument.statistics
    );
  }

  // TODO: think about splitting up this overload for JS

  public async detectLanguages(
    input: string[],
    countryHint?: string,
    options?: DetectLanguagesOptions
  ): Promise<DetectLanguageResultCollection>;
  public async detectLanguages(
    input: LanguageInput[],
    options?: DetectLanguagesOptions
  ): Promise<DetectLanguageResultCollection>;
  public async detectLanguages(
    input: string[] | LanguageInput[],
    countryHintOrOptions?: string | DetectLanguagesOptions,
    options?: DetectLanguagesOptions
  ): Promise<DetectLanguageResultCollection> {
    if (!input || !input.length) {
      throw new Error("Language input can't be empty");
    }

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

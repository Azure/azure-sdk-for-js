// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { PipelineOptions, createPipelineFromOptions, signingPolicy } from "@azure/core-http";
import { SDK_VERSION } from "./constants";
import { TextAnalyticsClient as GeneratedClient } from "./generated/textAnalyticsClient";
import { CognitiveServicesCredentials } from "./cognitiveServicesCredentials";
import { logger } from "./logger";
import { makeDetectLanguageResult, DetectLanguageResult } from "./detectLanguageResult";

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

    const internalPipelineOptions = {
      ...pipelineOptions,
      ...{
        loggingOptions: {
          logger: logger.info
        }
      }
    };

    const pipeline = createPipelineFromOptions(internalPipelineOptions, authPolicy);
    this.client = new GeneratedClient(credential, this.endpointUrl, pipeline);
  }

  public async detectLanguage(
    text: string,
    countryHint: string = this.defaultCountryHint
  ): Promise<DetectLanguageResult> {
    const result = await this.client.detectLanguage({
      languageBatchInput: {
        documents: [
          {
            id: "1",
            countryHint,
            text
          }
        ]
      }
    });
    if (result.errors && result.errors[0]) {
      throw new Error(result.errors[0].message);
    } else if (!result.documents || !result.documents[0]) {
      throw new Error("detectLanguage failed with no errors and no results.");
    }

    const firstDocument = result.documents[0];
    return makeDetectLanguageResult(
      "",
      firstDocument.detectedLanguages || [],
      firstDocument.statistics
    );
  }
}

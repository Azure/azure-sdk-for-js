// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AnomalyDetector } from "./generated";
import { KeyCredential, TokenCredential } from "@azure/core-auth";
import {
  SDK_VERSION,
  DEFAULT_COGNITIVE_SCOPE,
  AnomalyDetectorLoggingAllowedHeaderNames,
  AnomalyDetectorLoggingAllowedQueryParameters,
} from "./constants";
import {
  isTokenCredential,
  bearerTokenAuthenticationPolicy,
  InternalPipelineOptions,
  createPipelineFromOptions,
  PipelineOptions,
} from "@azure/core-http";
import { createAnomalyDetectorAzureKeyCredentialPolicy } from "./azureKeyCredentialPolicy";
import { logger } from "./logger";

/**
 * Client class for interacting with Azure Anomaly Detector service.
 */
export class AnomalyDetectorClient extends AnomalyDetector {
  /**
   * Creates an instance of AnomalyDetectorClient.
   *
   * Example usage:
   * ```ts
   * import { AnomalyDetectorClient, AzureKeyCredential } from "@azure/ai-anomaly-detector";
   *
   * const client = new AnomalyDetectorClient(
   *    "<service endpoint>",
   *    new AzureKeyCredential("<api key>")
   * );
   * ```
   * @param endpointUrl - Url to an Azure Anomaly Detector service endpoint
   * @param credential - Used to authenticate requests to the service.
   * @param options - Used to configure the Form Recognizer client.
   */
  constructor(
    endpointUrl: string,
    credential: TokenCredential | KeyCredential,
    /* eslint-disable-next-line @azure/azure-sdk/ts-naming-options */
    options?: PipelineOptions
  ) {
    const { ...pipelineOptions } = options;

    const libInfo = `azsdk-js-ai-anomalydetector/${SDK_VERSION}`;
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
      : createAnomalyDetectorAzureKeyCredentialPolicy(credential);

    const internalPipelineOptions: InternalPipelineOptions = {
      ...pipelineOptions,
      ...{
        loggingOptions: {
          logger: logger.info,
          allowedHeaderNames: AnomalyDetectorLoggingAllowedHeaderNames,
          allowedQueryParameters: AnomalyDetectorLoggingAllowedQueryParameters,
        },
      },
    };

    const pipeline = createPipelineFromOptions(internalPipelineOptions, authPolicy);

    super(endpointUrl, pipeline);
  }
}

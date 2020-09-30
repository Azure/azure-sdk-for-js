// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  AnomalyDetectorClientOptions,
  AnomalyDetectorClientDetectEntireResponse,
  AnomalyDetectorClientDetectChangePointResponse,
  AnomalyDetectorClientDetectLastPointResponse,
  DetectChangePointRequest,
  DetectRequest
} from "./models";
import { GeneratedClient } from "./generated";
import { KeyCredential, TokenCredential } from "@azure/core-auth";
import {
  SDK_VERSION,
  DEFAULT_COGNITIVE_SCOPE,
  AnomalyDetectorLoggingAllowedHeaderNames,
  AnomalyDetectorLoggingAllowedQueryParameters
} from "./constants";
import {
  isTokenCredential,
  bearerTokenAuthenticationPolicy,
  InternalPipelineOptions,
  createPipelineFromOptions,
  OperationOptions
} from "@azure/core-http";
import { createAnomalyDetectorAzureKeyCredentialPolicy } from "./azureKeyCredentialPolicy";
import { logger } from "./logger";
import { createSpan } from "./tracing";
import { CanonicalCode } from "@opentelemetry/api";

/**
 * Client class for interacting with Azure Anomaly Detector service.
 */
export class AnomalyDetectorClient {
  /**
   * Url to an Azure Anomaly Detector service endpoint
   */
  private readonly endpointUrl: string;

  /**
   * @internal
   * @ignore
   * A reference to the auto-generated AnomalyDetector HTTP client.
   */
  private client: GeneratedClient;

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
   * @param string endpointUrl Url to an Azure Anomaly Detector service endpoint
   * @param {TokenCredential | KeyCredential} credential Used to authenticate requests to the service.
   * @param FormRecognizerClientOptions options Used to configure the Form Recognizer client.
   */
  constructor(
    endpointUrl: string,
    credential: TokenCredential | KeyCredential,
    // eslint-disable-next-line @azure/azure-sdk/ts-naming-options
    options?: AnomalyDetectorClientOptions
  ) {
    this.endpointUrl = endpointUrl;
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
          allowedQueryParameters: AnomalyDetectorLoggingAllowedQueryParameters
        }
      }
    };

    const pipeline = createPipelineFromOptions(internalPipelineOptions, authPolicy);

    this.client = new GeneratedClient(this.endpointUrl, pipeline);
  }

  /**
   * This operation generates a model using an entire series, each point is detected with the same model.
   * With this method, points before and after a certain point are used to determine whether it is an
   * anomaly. The entire detection can give user an overall status of the time series.
   * @param body Time series points and period if needed. Advanced model parameters can also be set in
   *             the request.
   * @param options The options parameters.
   */
  public detectEntireSeries(
    body: DetectRequest,
    // eslint-disable-next-line @azure/azure-sdk/ts-naming-options
    options?: OperationOptions
  ): Promise<AnomalyDetectorClientDetectEntireResponse> {
    const realOptions = options || {};
    const { span, updatedOptions: finalOptions } = createSpan(
      "anomalyDetectorClient-entireDetect",
      realOptions
    );

    try {
      return this.client.detectEntireSeries(body, finalOptions);
    } catch (error) {
      span.setStatus({
        code: CanonicalCode.UNKNOWN,
        message: error.message
      });
      throw error;
    } finally {
      span.end();
    }
  }

  /**
   * This operation generates a model using points before the latest one. With this method, only
   * historical points are used to determine whether the target point is an anomaly. The latest point
   * detecting operation matches the scenario of real-time monitoring of business metrics.
   * @param body Time series points and period if needed. Advanced model parameters can also be set in
   *             the request.
   * @param options The options parameters.
   */
  public detectLastPoint(
    body: DetectRequest,
    // eslint-disable-next-line @azure/azure-sdk/ts-naming-options
    options?: OperationOptions
  ): Promise<AnomalyDetectorClientDetectLastPointResponse> {
    const realOptions = options || {};
    const { span, updatedOptions: finalOptions } = createSpan(
      "anomalyDetectorClient-lastDetect",
      realOptions
    );

    try {
      return this.client.detectLastPoint(body, finalOptions);
    } catch (error) {
      span.setStatus({
        code: CanonicalCode.UNKNOWN,
        message: error.message
      });
      throw error;
    } finally {
      span.end();
    }
  }

  /**
   * Evaluate change point score of every series point
   * @param body Time series points and granularity is needed. Advanced model parameters can also be set
   *             in the request if needed.
   * @param options The options parameters.
   */
  detectChangePoint(
    body: DetectChangePointRequest,
    // eslint-disable-next-line @azure/azure-sdk/ts-naming-options
    options?: OperationOptions
  ): Promise<AnomalyDetectorClientDetectChangePointResponse> {
    const realOptions = options || {};
    const { span, updatedOptions: finalOptions } = createSpan(
      "anomalyDetectorClient-changePointDetect",
      realOptions
    );

    try {
      return this.client.detectChangePoint(body, finalOptions);
    } catch (error) {
      span.setStatus({
        code: CanonicalCode.UNKNOWN,
        message: error.message
      });
      throw error;
    } finally {
      span.end();
    }
  }
}

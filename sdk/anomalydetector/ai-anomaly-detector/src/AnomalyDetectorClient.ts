// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  AnomalyDetectorClientOptions,
  AnomalyDetectorClientDetectEntireResponse,
  AnomalyDetectorClientDetectChangePointResponse,
  AnomalyDetectorClientDetectLastPointResponse,
  DetectChangePointRequest,
  DetectRequest,
  AnomalyDetectorClientModelInfo,
  AnomalyDetectorClientTrainMultivariateModelResponse,
  AnomalyDetectorClientGetMultivariateModelResponse,
  AnomalyDetectorClientDetectAnomalyResponse,
  DetectionRequest,
  AnomalyDetectorClientGetDetectionResultResponse,
  AnomalyDetectorClientExportModelResponse,
  ListMultivariateModelOptionalParams,
  AnomalyDetectorClientListMultivariateModelResponse,
  ListMultivariateModelNextOptionalParams,
  AnomalyDetectorClientListMultivariateModelNextResponse
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
import { SpanStatusCode } from "@azure/core-tracing";

export type DetectEntireSeriesOptions = OperationOptions;
export type DetectLastPointOptions = OperationOptions;
export type DetectChangePointOptions = OperationOptions;
export type TrainMultivariateModelOptions = OperationOptions;
export type GetMultivariateModelOptions = OperationOptions;
export type DeleteMultivariateModelOptions = OperationOptions;
export type DetectAnomalyOptions = OperationOptions;
export type GetDetectionResultOptions = OperationOptions;
export type ExportModelOptions = OperationOptions;

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
   * @hidden
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
   * @param endpointUrl - Url to an Azure Anomaly Detector service endpoint
   * @param credential - Used to authenticate requests to the service.
   * @param options - Used to configure the Form Recognizer client.
   */
  constructor(
    endpointUrl: string,
    credential: TokenCredential | KeyCredential,
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
   * This operation generates a model with an entire series, each point is detected with the same model.
   * With this method, points before and after a certain point are used to determine whether it is an
   * anomaly. The entire detection can give user an overall status of the time series.
   * @param body - Time series points and period if needed. Advanced model parameters can also be set in
   *             the request.
   * @param options - The options parameters.
   */
  public detectEntireSeries(
    body: DetectRequest,
    options?: DetectEntireSeriesOptions
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
        code: SpanStatusCode.ERROR,
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
   * @param body - Time series points and period if needed. Advanced model parameters can also be set in
   *             the request.
   * @param options - The options parameters.
   */
  public detectLastPoint(
    body: DetectRequest,
    options?: DetectLastPointOptions
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
        code: SpanStatusCode.ERROR,
        message: error.message
      });
      throw error;
    } finally {
      span.end();
    }
  }

  /**
   * Evaluate change point score of every series point
   * @param body - Time series points and granularity is needed. Advanced model parameters can also be set
   *             in the request if needed.
   * @param options - The options parameters.
   */
  detectChangePoint(
    body: DetectChangePointRequest,
    options?: DetectChangePointOptions
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
        code: SpanStatusCode.ERROR,
        message: error.message
      });
      throw error;
    } finally {
      span.end();
    }
  }

  /**
   * Create and train a multivariate anomaly detection model. The request must include a source parameter
   * to indicate an externally accessible Azure storage Uri (preferably a Shared Access Signature Uri).
   * All time-series used in generate the model must be zipped into one single file. Each time-series
   * will be in a single CSV file in which the first column is timestamp and the second column is value.
   * @param modelRequest - Training request
   * @param options - The options parameters.
   */
  public trainMultivariateModel(
    modelRequest: AnomalyDetectorClientModelInfo,
    options?: TrainMultivariateModelOptions
  ): Promise<AnomalyDetectorClientTrainMultivariateModelResponse> {
    const realOptions = options || {};
    const { span, updatedOptions: finalOptions } = createSpan(
      "anomalyDetectorClient-trainMultivariateModel",
      realOptions
    );

    try {
      return this.client.trainMultivariateModel(modelRequest, finalOptions);
    } catch (error) {
      span.setStatus({
        code: SpanStatusCode.ERROR,
        message: error.message
      });
      throw error;
    } finally {
      span.end();
    }
  }

  /**
   * Get detailed information of multivariate model, including the training status and variables used in
   * the model.
   * @param modelId - Model identifier.
   * @param options - The options parameters.
   */
  public getMultivariateModel(
    modelId: string,
    options?: GetMultivariateModelOptions
  ): Promise<AnomalyDetectorClientGetMultivariateModelResponse> {
    const realOptions = options || {};
    const { span, updatedOptions: finalOptions } = createSpan(
      "anomalyDetectorClient-getMultivariateModel",
      realOptions
    );

    try {
      return this.client.getMultivariateModel(modelId, finalOptions);
    } catch (error) {
      span.setStatus({
        code: SpanStatusCode.ERROR,
        message: error.message
      });
      throw error;
    } finally {
      span.end();
    }
  }

  /**
   * Delete an existing multivariate model according to the modelId
   * @param modelId - Model identifier.
   * @param options - The options parameters.
   */
  public async deleteMultivariateModel(
    modelId: string,
    options?: DeleteMultivariateModelOptions
  ): Promise<void> {
    const realOptions = options || {};
    const { span, updatedOptions: finalOptions } = createSpan(
      "anomalyDetectorClient-deleteMultivariateModel",
      realOptions
    );

    try {
      await this.client.deleteMultivariateModel(modelId, finalOptions);
    } catch (error) {
      span.setStatus({
        code: SpanStatusCode.ERROR,
        message: error.message
      });
      throw error;
    } finally {
      span.end();
    }
  }

  /**
   * Submit detection multivariate anomaly task with the trained model of modelId, the input schema
   * should be the same with the training request. Thus request will be complete asynchronously and will
   * return a resultId for querying the detection result.The request should be a source link to indicate
   * an externally accessible Azure storage Uri (preferably a Shared Access Signature Uri). All
   * time-series used in generate the model must be zipped into one single file. Each time-series will be
   * as follows: the first column is timestamp and the second column is value.
   * @param modelId - Model identifier.
   * @param detectionRequest - Detect anomaly request
   * @param options - The options parameters.
   */
  public detectAnomaly(
    modelId: string,
    detectionRequest: DetectionRequest,
    options?: DetectAnomalyOptions
  ): Promise<AnomalyDetectorClientDetectAnomalyResponse> {
    const realOptions = options || {};
    const { span, updatedOptions: finalOptions } = createSpan(
      "anomalyDetectorClient-detectAnomaly",
      realOptions
    );

    try {
      return this.client.detectAnomaly(modelId, detectionRequest, finalOptions);
    } catch (error) {
      span.setStatus({
        code: SpanStatusCode.ERROR,
        message: error.message
      });
      throw error;
    } finally {
      span.end();
    }
  }

  /**
   * Get multivariate anomaly detection result based on resultId returned by the DetectAnomalyAsync api
   * @param resultId - Result identifier.
   * @param options - The options parameters.
   */
  public getDetectionResult(
    resultId: string,
    options?: GetDetectionResultOptions
  ): Promise<AnomalyDetectorClientGetDetectionResultResponse> {
    const realOptions = options || {};
    const { span, updatedOptions: finalOptions } = createSpan(
      "anomalyDetectorClient-getDetectionResult",
      realOptions
    );

    try {
      return this.client.getDetectionResult(resultId, finalOptions);
    } catch (error) {
      span.setStatus({
        code: SpanStatusCode.ERROR,
        message: error.message
      });
      throw error;
    } finally {
      span.end();
    }
  }

  /**
   * Export multivariate anomaly detection model based on modelId
   * @param modelId - Model identifier.
   * @param options - The options parameters.
   */
  public exportModel(
    modelId: string,
    options?: ExportModelOptions
  ): Promise<AnomalyDetectorClientExportModelResponse> {
    const realOptions = options || {};
    const { span, updatedOptions: finalOptions } = createSpan(
      "anomalyDetectorClient-getDetectionResult",
      realOptions
    );

    try {
      return this.client.exportModel(modelId, finalOptions);
    } catch (error) {
      span.setStatus({
        code: SpanStatusCode.ERROR,
        message: error.message
      });
      throw error;
    } finally {
      span.end();
    }
  }

  /**
   * List models of a subscription
   * @param options - The options parameters.
   */
  listMultivariateModel(
    options?: ListMultivariateModelOptionalParams
  ): Promise<AnomalyDetectorClientListMultivariateModelResponse> {
    const realOptions = options || {};
    const { span, updatedOptions: finalOptions } = createSpan(
      "anomalyDetectorClient-getDetectionResult",
      realOptions
    );

    try {
      return this.client.listMultivariateModel(finalOptions);
    } catch (error) {
      span.setStatus({
        code: SpanStatusCode.ERROR,
        message: error.message
      });
      throw error;
    } finally {
      span.end();
    }
  }

  /**
   * List next Multivariate Model
   * @param nextLink - The nextLink from the previous successful call to the ListMultivariateModel method.
   * @param options - The options parameters.
   */
  listMultivariateModelNext(
    nextLink: string,
    options?: ListMultivariateModelNextOptionalParams
  ): Promise<AnomalyDetectorClientListMultivariateModelNextResponse> {
    const realOptions = options || {};
    const { span, updatedOptions: finalOptions } = createSpan(
      "anomalyDetectorClient-listMultivariateModelNext",
      realOptions
    );

    try {
      return this.client.listMultivariateModelNext(nextLink, finalOptions);
    } catch (error) {
      span.setStatus({
        code: SpanStatusCode.ERROR,
        message: error.message
      });
      throw error;
    } finally {
      span.end();
    }
  }
}

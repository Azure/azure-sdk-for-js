// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  AdvisorManagementContext,
  AdvisorManagementClientOptionalParams,
} from "./api/index.js";
import { createAdvisorManagement } from "./api/index.js";
import { predict } from "./api/operations.js";
import type { PredictOptionalParams } from "./api/options.js";
import type { AdvisorScoresOperations } from "./classic/advisorScores/index.js";
import { _getAdvisorScoresOperations } from "./classic/advisorScores/index.js";
import type { AssessmentTypesOperations } from "./classic/assessmentTypes/index.js";
import { _getAssessmentTypesOperations } from "./classic/assessmentTypes/index.js";
import type { AssessmentsOperations } from "./classic/assessments/index.js";
import { _getAssessmentsOperations } from "./classic/assessments/index.js";
import type { ConfigurationsOperations } from "./classic/configurations/index.js";
import { _getConfigurationsOperations } from "./classic/configurations/index.js";
import type { OperationsOperations } from "./classic/operations/index.js";
import { _getOperationsOperations } from "./classic/operations/index.js";
import type { RecommendationMetadataOperations } from "./classic/recommendationMetadata/index.js";
import { _getRecommendationMetadataOperations } from "./classic/recommendationMetadata/index.js";
import type { RecommendationsOperations } from "./classic/recommendations/index.js";
import { _getRecommendationsOperations } from "./classic/recommendations/index.js";
import type { ResiliencyReviewsOperations } from "./classic/resiliencyReviews/index.js";
import { _getResiliencyReviewsOperations } from "./classic/resiliencyReviews/index.js";
import type { SuppressionsOperations } from "./classic/suppressions/index.js";
import { _getSuppressionsOperations } from "./classic/suppressions/index.js";
import type { TriageRecommendationsOperations } from "./classic/triageRecommendations/index.js";
import { _getTriageRecommendationsOperations } from "./classic/triageRecommendations/index.js";
import type { TriageResourcesOperations } from "./classic/triageResources/index.js";
import { _getTriageResourcesOperations } from "./classic/triageResources/index.js";
import type { WorkloadsOperations } from "./classic/workloads/index.js";
import { _getWorkloadsOperations } from "./classic/workloads/index.js";
import type { PredictionRequest, PredictionResponse } from "./models/models.js";
import type { TokenCredential } from "@azure/core-auth";
import type { Pipeline } from "@azure/core-rest-pipeline";

export type { AdvisorManagementClientOptionalParams } from "./api/advisorManagementContext.js";

export class AdvisorManagementClient {
  private _client: AdvisorManagementContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  constructor(credential: TokenCredential, options?: AdvisorManagementClientOptionalParams);
  constructor(
    credential: TokenCredential,
    subscriptionId: string,
    options?: AdvisorManagementClientOptionalParams,
  );
  /** REST APIs for Azure Advisor Resiliency Reviews. */
  constructor(
    credential: TokenCredential,
    subscriptionIdOrOptions?: string | AdvisorManagementClientOptionalParams,
    options?: AdvisorManagementClientOptionalParams,
  ) {
    let subscriptionId: string | undefined;

    if (typeof subscriptionIdOrOptions === "string") {
      subscriptionId = subscriptionIdOrOptions;
    } else if (typeof subscriptionIdOrOptions === "object") {
      options = subscriptionIdOrOptions;
    }

    options = options ?? {};
    const prefixFromOptions = options?.userAgentOptions?.userAgentPrefix;
    const userAgentPrefix = prefixFromOptions
      ? `${prefixFromOptions} azsdk-js-client`
      : `azsdk-js-client`;
    this._client = createAdvisorManagement(credential, subscriptionId ?? "", {
      ...options,
      userAgentOptions: { userAgentPrefix },
    });
    this.pipeline = this._client.pipeline;
    this.workloads = _getWorkloadsOperations(this._client);
    this.assessmentTypes = _getAssessmentTypesOperations(this._client);
    this.configurations = _getConfigurationsOperations(this._client);
    this.triageResources = _getTriageResourcesOperations(this._client);
    this.triageRecommendations = _getTriageRecommendationsOperations(this._client);
    this.resiliencyReviews = _getResiliencyReviewsOperations(this._client);
    this.assessments = _getAssessmentsOperations(this._client);
    this.advisorScores = _getAdvisorScoresOperations(this._client);
    this.suppressions = _getSuppressionsOperations(this._client);
    this.recommendations = _getRecommendationsOperations(this._client);
    this.recommendationMetadata = _getRecommendationMetadataOperations(this._client);
    this.operations = _getOperationsOperations(this._client);
  }

  /** Predicts a recommendation. */
  predict(
    predictionRequest: PredictionRequest,
    options: PredictOptionalParams = { requestOptions: {} },
  ): Promise<PredictionResponse> {
    return predict(this._client, predictionRequest, options);
  }

  /** The operation groups for workloads */
  public readonly workloads: WorkloadsOperations;
  /** The operation groups for assessmentTypes */
  public readonly assessmentTypes: AssessmentTypesOperations;
  /** The operation groups for configurations */
  public readonly configurations: ConfigurationsOperations;
  /** The operation groups for triageResources */
  public readonly triageResources: TriageResourcesOperations;
  /** The operation groups for triageRecommendations */
  public readonly triageRecommendations: TriageRecommendationsOperations;
  /** The operation groups for resiliencyReviews */
  public readonly resiliencyReviews: ResiliencyReviewsOperations;
  /** The operation groups for assessments */
  public readonly assessments: AssessmentsOperations;
  /** The operation groups for advisorScores */
  public readonly advisorScores: AdvisorScoresOperations;
  /** The operation groups for suppressions */
  public readonly suppressions: SuppressionsOperations;
  /** The operation groups for recommendations */
  public readonly recommendations: RecommendationsOperations;
  /** The operation groups for recommendationMetadata */
  public readonly recommendationMetadata: RecommendationMetadataOperations;
  /** The operation groups for operations */
  public readonly operations: OperationsOperations;
}

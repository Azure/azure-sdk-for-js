// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { CostManagementContext, CostManagementClientOptionalParams } from "./api/index.js";
import { createCostManagement } from "./api/index.js";
import type { AlertsOperations } from "./classic/alerts/index.js";
import { _getAlertsOperations } from "./classic/alerts/index.js";
import type { BenefitRecommendationsOperations } from "./classic/benefitRecommendations/index.js";
import { _getBenefitRecommendationsOperations } from "./classic/benefitRecommendations/index.js";
import type { BenefitUtilizationSummariesOperations } from "./classic/benefitUtilizationSummaries/index.js";
import { _getBenefitUtilizationSummariesOperations } from "./classic/benefitUtilizationSummaries/index.js";
import type { BudgetsOperations } from "./classic/budgets/index.js";
import { _getBudgetsOperations } from "./classic/budgets/index.js";
import type { CostAllocationRulesOperations } from "./classic/costAllocationRules/index.js";
import { _getCostAllocationRulesOperations } from "./classic/costAllocationRules/index.js";
import type { DimensionsOperations } from "./classic/dimensions/index.js";
import { _getDimensionsOperations } from "./classic/dimensions/index.js";
import type { ExportsOperations } from "./classic/exports/index.js";
import { _getExportsOperations } from "./classic/exports/index.js";
import type { ForecastOperations } from "./classic/forecast/index.js";
import { _getForecastOperations } from "./classic/forecast/index.js";
import type { GenerateBenefitUtilizationSummariesReportOperations } from "./classic/generateBenefitUtilizationSummariesReport/index.js";
import { _getGenerateBenefitUtilizationSummariesReportOperations } from "./classic/generateBenefitUtilizationSummariesReport/index.js";
import type { GenerateCostDetailsReportOperations } from "./classic/generateCostDetailsReport/index.js";
import { _getGenerateCostDetailsReportOperations } from "./classic/generateCostDetailsReport/index.js";
import type { GenerateDetailedCostReportOperations } from "./classic/generateDetailedCostReport/index.js";
import { _getGenerateDetailedCostReportOperations } from "./classic/generateDetailedCostReport/index.js";
import type { GenerateDetailedCostReportOperationResultsOperations } from "./classic/generateDetailedCostReportOperationResults/index.js";
import { _getGenerateDetailedCostReportOperationResultsOperations } from "./classic/generateDetailedCostReportOperationResults/index.js";
import type { GenerateDetailedCostReportOperationStatusOperations } from "./classic/generateDetailedCostReportOperationStatus/index.js";
import { _getGenerateDetailedCostReportOperationStatusOperations } from "./classic/generateDetailedCostReportOperationStatus/index.js";
import type { GenerateReservationDetailsReportOperations } from "./classic/generateReservationDetailsReport/index.js";
import { _getGenerateReservationDetailsReportOperations } from "./classic/generateReservationDetailsReport/index.js";
import type { OperationsOperations } from "./classic/operations/index.js";
import { _getOperationsOperations } from "./classic/operations/index.js";
import type { PriceSheetOperations } from "./classic/priceSheet/index.js";
import { _getPriceSheetOperations } from "./classic/priceSheet/index.js";
import type { QueryOperations } from "./classic/query/index.js";
import { _getQueryOperations } from "./classic/query/index.js";
import type { ScheduledActionsOperations } from "./classic/scheduledActions/index.js";
import { _getScheduledActionsOperations } from "./classic/scheduledActions/index.js";
import type { SettingsOperations } from "./classic/settings/index.js";
import { _getSettingsOperations } from "./classic/settings/index.js";
import type { ViewsOperations } from "./classic/views/index.js";
import { _getViewsOperations } from "./classic/views/index.js";
import type { TokenCredential } from "@azure/core-auth";
import type { Pipeline } from "@azure/core-rest-pipeline";

export type { CostManagementClientOptionalParams } from "./api/costManagementContext.js";

export class CostManagementClient {
  private _client: CostManagementContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  /** CostManagement management client provides access to CostManagement resources for Azure Enterprise Subscriptions. */
  constructor(credential: TokenCredential, options: CostManagementClientOptionalParams = {}) {
    const prefixFromOptions = options?.userAgentOptions?.userAgentPrefix;
    const userAgentPrefix = prefixFromOptions
      ? `${prefixFromOptions} azsdk-js-client`
      : `azsdk-js-client`;
    this._client = createCostManagement(credential, {
      ...options,
      userAgentOptions: { userAgentPrefix },
    });
    this.pipeline = this._client.pipeline;
    this.priceSheet = _getPriceSheetOperations(this._client);
    this.generateReservationDetailsReport = _getGenerateReservationDetailsReportOperations(
      this._client,
    );
    this.query = _getQueryOperations(this._client);
    this.dimensions = _getDimensionsOperations(this._client);
    this.forecast = _getForecastOperations(this._client);
    this.generateDetailedCostReport = _getGenerateDetailedCostReportOperations(this._client);
    this.generateBenefitUtilizationSummariesReport =
      _getGenerateBenefitUtilizationSummariesReportOperations(this._client);
    this.benefitUtilizationSummaries = _getBenefitUtilizationSummariesOperations(this._client);
    this.benefitRecommendations = _getBenefitRecommendationsOperations(this._client);
    this.costAllocationRules = _getCostAllocationRulesOperations(this._client);
    this.generateCostDetailsReport = _getGenerateCostDetailsReportOperations(this._client);
    this.settings = _getSettingsOperations(this._client);
    this.scheduledActions = _getScheduledActionsOperations(this._client);
    this.alerts = _getAlertsOperations(this._client);
    this.views = _getViewsOperations(this._client);
    this.generateDetailedCostReportOperationResults =
      _getGenerateDetailedCostReportOperationResultsOperations(this._client);
    this.exports = _getExportsOperations(this._client);
    this.budgets = _getBudgetsOperations(this._client);
    this.operations = _getOperationsOperations(this._client);
    this.generateDetailedCostReportOperationStatus =
      _getGenerateDetailedCostReportOperationStatusOperations(this._client);
  }

  /** The operation groups for priceSheet */
  public readonly priceSheet: PriceSheetOperations;
  /** The operation groups for generateReservationDetailsReport */
  public readonly generateReservationDetailsReport: GenerateReservationDetailsReportOperations;
  /** The operation groups for query */
  public readonly query: QueryOperations;
  /** The operation groups for dimensions */
  public readonly dimensions: DimensionsOperations;
  /** The operation groups for forecast */
  public readonly forecast: ForecastOperations;
  /** The operation groups for generateDetailedCostReport */
  public readonly generateDetailedCostReport: GenerateDetailedCostReportOperations;
  /** The operation groups for generateBenefitUtilizationSummariesReport */
  public readonly generateBenefitUtilizationSummariesReport: GenerateBenefitUtilizationSummariesReportOperations;
  /** The operation groups for benefitUtilizationSummaries */
  public readonly benefitUtilizationSummaries: BenefitUtilizationSummariesOperations;
  /** The operation groups for benefitRecommendations */
  public readonly benefitRecommendations: BenefitRecommendationsOperations;
  /** The operation groups for costAllocationRules */
  public readonly costAllocationRules: CostAllocationRulesOperations;
  /** The operation groups for generateCostDetailsReport */
  public readonly generateCostDetailsReport: GenerateCostDetailsReportOperations;
  /** The operation groups for settings */
  public readonly settings: SettingsOperations;
  /** The operation groups for scheduledActions */
  public readonly scheduledActions: ScheduledActionsOperations;
  /** The operation groups for alerts */
  public readonly alerts: AlertsOperations;
  /** The operation groups for views */
  public readonly views: ViewsOperations;
  /** The operation groups for generateDetailedCostReportOperationResults */
  public readonly generateDetailedCostReportOperationResults: GenerateDetailedCostReportOperationResultsOperations;
  /** The operation groups for exports */
  public readonly exports: ExportsOperations;
  /** The operation groups for budgets */
  public readonly budgets: BudgetsOperations;
  /** The operation groups for operations */
  public readonly operations: OperationsOperations;
  /** The operation groups for generateDetailedCostReportOperationStatus */
  public readonly generateDetailedCostReportOperationStatus: GenerateDetailedCostReportOperationStatusOperations;
}

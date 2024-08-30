// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationOptions } from "@azure/core-client";

/**
 * Options common to all text analytics operations.
 */
export interface TextAnalyticsOperationOptions extends OperationOptions {
  /**
   * This value indicates which model will be used for scoring. If a model-version is
   * not specified, the API should default to the latest, non-preview version.
   * For supported model versions, see operation-specific documentation, for example:
   * https://docs.microsoft.com/azure/cognitive-services/text-analytics/how-tos/text-analytics-how-to-sentiment-analysis#model-versioning
   */
  modelVersion?: string;
  /**
   * If set to true, response will contain input and document level statistics.
   */
  includeStatistics?: boolean;
  /**
   * If set to true (the default for `beginAnalyzeHealthcareEntities` and `recognizePiiEntities`),
   * you opt-out of having your text input logged for troubleshooting. By default, Text Analytics
   * logs your input text for 48 hours, solely to allow for troubleshooting issues. Setting this
   * parameter to true, disables input logging and may limit our ability to remediate issues that
   * occur.
   */
  disableServiceLogs?: boolean;
}

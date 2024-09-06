// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Query index utilization data for single index (sub-structure of the Index Utilization metrics) in the Azure Cosmos database service.
 */
export interface SingleIndexUtilizationEntity {
  FilterExpression?: string;
  IndexSpec?: string; // IndexDocumentExpression
  FilterPreciseSet?: boolean; // FilterExpressionPrecision
  IndexPreciseSet?: boolean; // IndexPlanFullFidelity
  IndexImpactScore?: string;
}

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * Represents a composite index in the Azure Cosmos DB database service.
 */
export interface CompositeIndexUtilizationEntity {
  IndexSpecs: string[]; // IndexDocumentExpressions
  IndexPreciseSet: boolean; // IndexPlanFullFidelity
  IndexImpactScore: string;
}

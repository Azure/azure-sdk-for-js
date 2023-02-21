/**
 * Query index utilization data for single index (sub-structure of the Index Utilization metrics) in the Azure Cosmos database service.
 */
export class SingleIndexUtilizationEntity {
  public readonly FilterExpression?: string;
  public readonly IndexDocumentExpression?: string;
  public readonly FilterExpressionPrecision?: boolean;
  public readonly IndexPlanFullFidelity?: boolean;
  public IndexImpactScore?: string;
}

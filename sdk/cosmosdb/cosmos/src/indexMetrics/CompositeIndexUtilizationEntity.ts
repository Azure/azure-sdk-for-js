export interface CompositeIndexUtilizationEntity {
  IndexDocumentExpressions: string[];
  IndexPlanFullFidelity: boolean;
  IndexImpactScore: string;
}

export class CompositeIndexUtilizationEntity {
  constructor(
    indexDocumentExpressions: string[],
    indexPlanFullFidelity: boolean,
    indexImpactScore: string
  ) {
    this.IndexDocumentExpressions = indexDocumentExpressions;
    this.IndexPlanFullFidelity = indexPlanFullFidelity;
    this.IndexImpactScore = indexImpactScore;
  }
}

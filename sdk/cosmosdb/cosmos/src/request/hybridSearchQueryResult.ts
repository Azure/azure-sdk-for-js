// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
export class HybridSearchQueryResult {
  rid: string;
  componentScores: number[];
  data: any;
  score: number;
  ranks: number[];

  constructor(rid: string, componentScores: number[], data: any) {
    this.rid = rid;
    this.componentScores = componentScores;
    this.data = data;
  }

  public static create(document: any): HybridSearchQueryResult {
    const rid = document[FieldNames.Rid];
    if (!rid) {
      throw new Error(`${FieldNames.Rid} must exist.`);
    }

    const outerPayload = document[FieldNames.Payload];
    if (!outerPayload || typeof outerPayload !== "object") {
      throw new Error(`${FieldNames.Payload} must exist.`);
    }

    const innerPayload = outerPayload[FieldNames.Payload];
    if (!innerPayload || typeof innerPayload !== "object") {
      throw new Error(`${FieldNames.Payload} must exist nested within the outer payload field.`);
    }

    const componentScores = outerPayload[FieldNames.ComponentScores];
    if (!Array.isArray(componentScores)) {
      throw new Error(`${FieldNames.ComponentScores} must exist.`);
    }

    return new HybridSearchQueryResult(rid, componentScores, innerPayload);
  }
}

class FieldNames {
  public static readonly Rid = "_rid";
  public static readonly Payload = "payload";
  public static readonly ComponentScores = "componentScores";
}

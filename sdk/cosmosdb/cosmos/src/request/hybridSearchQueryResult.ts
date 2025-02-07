// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ItemDefinition } from "../client";

const FieldNames = {
  Rid: "_rid",
  Payload: "payload",
  ComponentScores: "componentScores",
};

export class HybridSearchQueryResult {
  rid: string;
  componentScores: number[];
  data: any;
  score: number;
  ranks: number[];

  constructor(rid: string, componentScores: number[], data: Record<string, unknown>) {
    this.rid = rid;
    this.componentScores = componentScores;
    this.data = data;
  }

  public static create<T extends ItemDefinition>(document: T): HybridSearchQueryResult {
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

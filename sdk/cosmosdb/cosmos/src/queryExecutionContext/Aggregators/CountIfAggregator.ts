// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import type { Aggregator } from "./Aggregator.js";

/** @hidden */
export class CountIfAggregator implements Aggregator {
  public value: any;
  public aggregate(other: unknown): void {
    this.value = other;
  }

  public getResult(): any {
    return this.value;
  }
}

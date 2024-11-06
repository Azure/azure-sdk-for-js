// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import type { Aggregator } from "./Aggregator";

/** @hidden */
export class StaticValueAggregator implements Aggregator {
  public value: any;
  public aggregate(other: unknown): void {
    if (this.value === undefined) {
      this.value = other;
    }
  }

  public getResult(): any {
    return this.value;
  }
}

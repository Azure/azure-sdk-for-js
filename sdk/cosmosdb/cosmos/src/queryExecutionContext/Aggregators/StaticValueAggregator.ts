// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { Aggregator } from "./Aggregator";

/** @hidden */
export class StaticValueAggregator implements Aggregator {
  public value: any;
  public aggregate(other: any) {
    if (this.value === undefined) {
      this.value = other;
    }
  }

  public getResult() {
    return this.value;
  }
}

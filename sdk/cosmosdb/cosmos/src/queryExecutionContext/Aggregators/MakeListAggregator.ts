// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { Aggregator } from "./Aggregator";

/** @hidden */
export class MakeListAggregator implements Aggregator {
  value: any[];

  constructor() {
    this.value = [];
  }
  public aggregate(other: any[]): void {
    if (Array.isArray(other)) {
      this.value.push(...other);
    }
  }
  public getResult(): any[] {
    const result = [...this.value];
    return result;
  }
}

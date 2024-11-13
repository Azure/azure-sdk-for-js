// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { GlobalStatistics } from "../../request/globalStatistics";
import { Aggregator } from "./Aggregator";

export class GlobalStatisticsAggregator implements Aggregator {
  private globalStatistics: GlobalStatistics;

  constructor() {
    this.globalStatistics = {
      documentCount: 0,
      fullTextStatistics: [],
    };
  }

  public aggregate(other: GlobalStatistics): void {
    if (!other) {
      return;
    }
    // Aggregate document count
    this.globalStatistics.documentCount += other.documentCount;
    // Ensure `fullTextStatistics` is initialized
    if (!other.fullTextStatistics || other.fullTextStatistics.length === 0) {
      return;
    }

    // Initialize `this.globalStatistics.fullTextStatistics` if it's empty
    if (this.globalStatistics.fullTextStatistics.length === 0) {
      this.globalStatistics.fullTextStatistics = other.fullTextStatistics.map((stat) => ({
        totalWordCount: stat.totalWordCount,
        hitCounts: [...stat.hitCounts],
      }));
    } else {
      // Loop through `other.fullTextStatistics` to add values to `this.globalStatistics.fullTextStatistics`
      for (let i = 0; i < other.fullTextStatistics.length; i++) {
        const otherStat = other.fullTextStatistics[i];

        // Ensure the index `i` is initialized
        if (!this.globalStatistics.fullTextStatistics[i]) {
          this.globalStatistics.fullTextStatistics[i] = {
            totalWordCount: 0,
            hitCounts: [],
          };
        }

        // Add totalWordCount
        this.globalStatistics.fullTextStatistics[i].totalWordCount += otherStat.totalWordCount;

        // Aggregate `hitCounts`
        for (let j = 0; j < otherStat.hitCounts.length; j++) {
          // Initialize hit count if necessary
          if (this.globalStatistics.fullTextStatistics[i].hitCounts.length <= j) {
            this.globalStatistics.fullTextStatistics[i].hitCounts.push(0);
          }
          this.globalStatistics.fullTextStatistics[i].hitCounts[j] += otherStat.hitCounts[j];
        }
      }
    }
  }

  public getResult(): GlobalStatistics {
    return this.globalStatistics;
  }
}

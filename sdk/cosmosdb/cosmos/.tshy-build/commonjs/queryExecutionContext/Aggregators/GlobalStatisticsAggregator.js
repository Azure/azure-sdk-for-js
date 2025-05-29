"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.GlobalStatisticsAggregator = void 0;
class GlobalStatisticsAggregator {
    constructor() {
        this.globalStatistics = {
            documentCount: 0,
            fullTextStatistics: [],
        };
    }
    aggregate(other) {
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
        }
        else {
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
    getResult() {
        return this.globalStatistics;
    }
}
exports.GlobalStatisticsAggregator = GlobalStatisticsAggregator;
//# sourceMappingURL=GlobalStatisticsAggregator.js.map
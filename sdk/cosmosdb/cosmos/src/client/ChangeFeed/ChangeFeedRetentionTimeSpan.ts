// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
/*
 * Represents the change feed policy configuration for a container in the Azure Cosmos DB service.
 */
export class ChangeFeedRetentionTimeSpan {
  private retentionInMinutes: number;

  constructor(minutes: number) {
    if (typeof minutes !== "number") {
      throw new Error("ChangeFeedRetentionTimeSpan must be a number.");
    }
    if (minutes < 0) {
      throw new Error("ChangeFeedRetentionTimeSpan must be a positive number.");
    }
    if (minutes % 1 !== 0) {
      throw new Error("Retention's granularity is minutes.");
    }
    this.retentionInMinutes = minutes;
  }

  static fromMinutes(minutes: number): ChangeFeedRetentionTimeSpan {
    return new ChangeFeedRetentionTimeSpan(minutes);
  }

  public getRetentionInMinutes(): number {
    return this.retentionInMinutes;
  }
}

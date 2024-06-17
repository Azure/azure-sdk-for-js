// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { ErrorResponse } from "../../request";

/*
 * Represents the change feed policy configuration for a container in the Azure Cosmos DB service.
 */
export class ChangeFeedRetentionTimeSpan {
  private retentionInMinutes: number;
  /**
   * @internal
   */
  constructor(minutes: number) {
    if (typeof minutes !== "number") {
      throw new ErrorResponse("ChangeFeedRetentionTimeSpan must be a number.");
    }
    if (minutes < 0) {
      throw new ErrorResponse("ChangeFeedRetentionTimeSpan must be a positive number.");
    }
    if (minutes % 1 !== 0) {
      throw new ErrorResponse("Retention's granularity is minutes.");
    }
    this.retentionInMinutes = minutes;
  }
  /**
   * Specifies the retention window in minutes for which processing the change feed with allVersionsAndDeletes mode will be available.
   */
  static fromMinutes(minutes: number): ChangeFeedRetentionTimeSpan {
    return new ChangeFeedRetentionTimeSpan(minutes);
  }
  /**
   * @internal
   */
  public getRetentionInMinutes(): number {
    return this.retentionInMinutes;
  }
}

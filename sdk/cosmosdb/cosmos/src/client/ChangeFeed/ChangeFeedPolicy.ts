// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { ChangeFeedRetentionTimeSpan } from "./ChangeFeedRetentionTimeSpan";
/**
 * Represents the change feed policy configuration for a container in the Azure Cosmos DB service.
 */
export class ChangeFeedPolicy {
  public retentionDuration: number;

  constructor(retentionDuration: ChangeFeedRetentionTimeSpan) {
    this.retentionDuration = retentionDuration.getRetentionInMinutes();
  }
}

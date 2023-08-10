// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { PartitionKey } from "../../documents";
import { PartitionKeyRange } from "../../client";
import { EpkRange } from "./EpkRange";
/**
 * @hidden
 * Class which specifies the ChangeFeedIterator to start reading changes from a particular point of time.
 */
export class ChangeFeedStartFromTime {
  private cfResource?: PartitionKey | PartitionKeyRange | EpkRange;

  private startTime: Date;

  constructor(startTime: Date, cfResource?: PartitionKey | PartitionKeyRange | EpkRange) {
    this.startTime = startTime;
    this.cfResource = cfResource;
  }

  public getCfResource(): PartitionKey | PartitionKeyRange | EpkRange | undefined {
    return this.cfResource;
  }

  public getStartTime(): Date {
    return this.startTime;
  }
}

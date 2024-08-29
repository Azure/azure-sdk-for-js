// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { PartitionKey } from "../../documents";
import { FeedRange } from "./FeedRange";
/**
 * @hidden
 * Class which specifies the ChangeFeedIterator to start reading changes from a particular point of time.
 */
export class ChangeFeedStartFromTime {
  private cfResource?: PartitionKey | FeedRange;

  private startTime: Date;

  constructor(startTime: Date, cfResource?: PartitionKey | FeedRange) {
    this.startTime = startTime;
    this.cfResource = cfResource;
  }

  public getCfResource(): PartitionKey | FeedRange | undefined {
    return this.cfResource;
  }

  public getStartTime(): Date {
    return this.startTime;
  }
}

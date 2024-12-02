// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import type { PartitionKey } from "../../documents";
import type { FeedRange } from "./FeedRange";

/**
 * @hidden
 * Class which specifies the ChangeFeedIterator to start reading changes from beginning of time.
 */
export class ChangeFeedStartFromBeginning {
  private cfResource?: PartitionKey | FeedRange;

  constructor(cfResource?: PartitionKey | FeedRange) {
    this.cfResource = cfResource;
  }

  public getCfResource(): PartitionKey | FeedRange | undefined {
    return this.cfResource;
  }
}

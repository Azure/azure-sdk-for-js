// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { PartitionKey } from "../../documents";
import { PartitionKeyRange } from "../../client";
import { EpkRange } from "./EpkRange";

/**
 * @hidden
 * Class which specifies the ChangeFeedIterator to start reading changes from beginning of time.
 */
export class ChangeFeedStartFromBeginning {
  private cfResource?: PartitionKey | PartitionKeyRange | EpkRange;

  constructor(cfResource?: PartitionKey | PartitionKeyRange | EpkRange) {
    this.cfResource = cfResource;
  }

  public getCfResource(): PartitionKey | PartitionKeyRange | EpkRange {
    return this.cfResource;
  }
}

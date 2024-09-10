// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { ErrorResponse } from "../../request";
import { ChangeFeedResourceType } from "./ChangeFeedEnums";
/**
 * @hidden
 * Class which specifies the ChangeFeedIterator to start reading changes from a saved point.
 */
export class ChangeFeedStartFromContinuation {
  private continuationToken: string;

  constructor(continuation: string) {
    this.continuationToken = continuation;
  }

  public getCfResource(): string {
    return this.continuationToken;
  }
  public getCfResourceJson(): any {
    return JSON.parse(this.continuationToken);
  }

  public getResourceType(): any {
    const cToken = this.getCfResourceJson();
    if (
      Object.prototype.hasOwnProperty.call(cToken, "partitionKey") &&
      Object.prototype.hasOwnProperty.call(cToken, "Continuation") &&
      typeof cToken.Continuation === "string"
    ) {
      return ChangeFeedResourceType.PartitionKey;
    } else if (
      Object.prototype.hasOwnProperty.call(cToken, "Continuation") &&
      Array.isArray(cToken.Continuation) &&
      cToken.Continuation.length > 0
    ) {
      return ChangeFeedResourceType.FeedRange;
    } else {
      throw new ErrorResponse("Invalid continuation token.");
    }
  }
}

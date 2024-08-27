// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { ChangeFeedRange } from "./ChangeFeedRange";
/**
 * Continuation token for change feed of entire container, or a specific Epk Range.
 * @internal
 */
export class CompositeContinuationToken {
  /**
   * rid of the container for which the continuation token is issued.
   */
  public readonly rid: string;
  /**
   * List of Epk Ranges part of the continuation token
   */
  public readonly Continuation: ChangeFeedRange[];

  constructor(rid: string, Continuation: ChangeFeedRange[]) {
    this.rid = rid;
    this.Continuation = Continuation;
  }
}

import { ChangeFeedRange } from "./ChangeFeedRange";

export class CompositeContinuationToken {
  public readonly rid: string;

  public readonly Continuation: ChangeFeedRange[];

  constructor(rid: string, Continuation: ChangeFeedRange[]) {
    this.rid = rid;
    this.Continuation = Continuation;
  }
}

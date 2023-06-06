export class ChangeFeedRange {
  public minInclusive: string;
  public maxExclusive: string;
  public continuationToken?: string;

  constructor(minInclusive: string, maxExclusive: string, continuationToken?: string) {
    this.minInclusive = minInclusive;
    this.maxExclusive = maxExclusive;
    this.continuationToken = continuationToken;
  }
}

import { SingleIndexUtilizationEntity } from "./SingleIndexUtilizationEntity";
import { CompositeIndexUtilizationEntity } from "./CompositeIndexUtilizationEntity";
export class IndexUtilizationInfo {
  public static readonly Empty = new IndexUtilizationInfo([], [], [], []);

  constructor(
    public readonly UtilizedSingleIndexes: SingleIndexUtilizationEntity[],
    public readonly PotentialSingleIndexes: SingleIndexUtilizationEntity[],
    public readonly UtilizedCompositeIndexes: CompositeIndexUtilizationEntity[],
    public readonly PotentialCompositeIndexes: CompositeIndexUtilizationEntity[]
  ) {}

  public static tryCreateFromDelimitedBase64String(
    delimitedString: string,
    out: { result?: IndexUtilizationInfo }
  ): boolean {
    if (delimitedString == null) {
      out.result = IndexUtilizationInfo.Empty;
      return true;
    }

    return IndexUtilizationInfo.tryCreateFromDelimitedString(atob(delimitedString), out);
  }

  public static tryCreateFromDelimitedString(
    delimitedString: string,
    out: { result?: IndexUtilizationInfo }
  ): boolean {
    if (delimitedString == null) {
      out.result = IndexUtilizationInfo.Empty;
      return true;
    }

    try {
      out.result = JSON.parse(delimitedString) || IndexUtilizationInfo.Empty;
      return true;
    } catch (error) {
      out.result = IndexUtilizationInfo.Empty;
      return false;
    }
  }

  public static createFromString(
    delimitedString: string,
    isBase64Encoded: boolean
  ): IndexUtilizationInfo {
    let indexUtilizationInfo: IndexUtilizationInfo;

    if (isBase64Encoded) {
      IndexUtilizationInfo.tryCreateFromDelimitedBase64String(delimitedString, {
        result: indexUtilizationInfo,
      });
    } else {
      IndexUtilizationInfo.tryCreateFromDelimitedString(delimitedString, {
        result: indexUtilizationInfo,
      });
    }

    return indexUtilizationInfo;
  }

  public async forEachAsync(callback: () => void) {
    // Implement this method according to your requirements.
  }
}

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SingleIndexUtilizationEntity } from "./SingleIndexUtilizationEntity";
import { CompositeIndexUtilizationEntity } from "./CompositeIndexUtilizationEntity";
export class IndexUtilizationInfo {
  public static readonly Empty = new IndexUtilizationInfo([], [], [], []);

  constructor(
    public readonly UtilizedSingleIndexes: SingleIndexUtilizationEntity[],
    public readonly PotentialSingleIndexes: SingleIndexUtilizationEntity[],
    public readonly UtilizedCompositeIndexes: CompositeIndexUtilizationEntity[],
    public readonly PotentialCompositeIndexes: CompositeIndexUtilizationEntity[],
  ) {}

  public static tryCreateFromDelimitedBase64String(
    delimitedString: string,
    out: { result?: IndexUtilizationInfo },
  ): boolean {
    if (delimitedString == null) {
      out.result = IndexUtilizationInfo.Empty;
      return false;
    }

    return IndexUtilizationInfo.tryCreateFromDelimitedString(
      Buffer.from(delimitedString, "base64").toString(),
      out,
    );
  }

  public static tryCreateFromDelimitedString(
    delimitedString: string,
    out: { result?: IndexUtilizationInfo },
  ): boolean {
    if (delimitedString == null) {
      out.result = IndexUtilizationInfo.Empty;
      return false;
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
    isBase64Encoded: boolean,
  ): IndexUtilizationInfo {
    const result: { result?: IndexUtilizationInfo } = { result: undefined };

    if (isBase64Encoded) {
      IndexUtilizationInfo.tryCreateFromDelimitedBase64String(delimitedString, result);
    } else {
      IndexUtilizationInfo.tryCreateFromDelimitedString(delimitedString, result);
    }

    return result.result ?? IndexUtilizationInfo.Empty;
  }
}

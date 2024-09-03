// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import Constants from "./Constants";
import { CompositeIndexUtilizationEntity } from "./CompositeIndexUtilizationEntity";
import { IndexUtilizationInfo } from "./IndexUtilizationInfo";
import { SingleIndexUtilizationEntity } from "./SingleIndexUtilizationEntity";

export class IndexMetricWriter {
  public writeIndexMetrics(indexUtilizationInfo: IndexUtilizationInfo): string {
    let result = "";
    result = this.writeBeforeIndexUtilizationInfo(result);
    result = this.writeIndexUtilizationInfo(result, indexUtilizationInfo);
    result = this.writeAfterIndexUtilizationInfo(result);
    return result;
  }

  protected writeBeforeIndexUtilizationInfo(result: string): string {
    result = this.appendNewlineToResult(result);
    result = this.appendHeaderToResult(result, Constants.IndexUtilizationInfo, 0);
    return result;
  }

  protected writeIndexUtilizationInfo(
    result: string,
    indexUtilizationInfo: IndexUtilizationInfo,
  ): string {
    result = this.appendHeaderToResult(result, Constants.UtilizedSingleIndexes, 1);

    for (const indexUtilizationEntity of indexUtilizationInfo.UtilizedSingleIndexes) {
      result = this.writeSingleIndexUtilizationEntity(result, indexUtilizationEntity);
    }
    result = this.appendHeaderToResult(result, Constants.PotentialSingleIndexes, 1);

    for (const indexUtilizationEntity of indexUtilizationInfo.PotentialSingleIndexes) {
      result = this.writeSingleIndexUtilizationEntity(result, indexUtilizationEntity);
    }

    result = this.appendHeaderToResult(result, Constants.UtilizedCompositeIndexes, 1);

    for (const indexUtilizationEntity of indexUtilizationInfo.UtilizedCompositeIndexes) {
      result = this.writeCompositeIndexUtilizationEntity(result, indexUtilizationEntity);
    }

    result = this.appendHeaderToResult(result, Constants.PotentialCompositeIndexes, 1);

    for (const indexUtilizationEntity of indexUtilizationInfo.PotentialCompositeIndexes) {
      result = this.writeCompositeIndexUtilizationEntity(result, indexUtilizationEntity);
    }
    return result;
  }

  protected writeAfterIndexUtilizationInfo(result: string): string {
    return result;
  }

  private writeSingleIndexUtilizationEntity(
    result: string,
    indexUtilizationEntity: SingleIndexUtilizationEntity,
  ): string {
    result = this.appendHeaderToResult(
      result,
      `${Constants.IndexExpression}: ${indexUtilizationEntity.IndexSpec}`,
      2,
    );
    result = this.appendHeaderToResult(
      result,
      `${Constants.IndexImpactScore}: ${indexUtilizationEntity.IndexImpactScore}`,
      2,
    );
    result = this.appendHeaderToResult(result, Constants.IndexUtilizationSeparator, 2);
    return result;
  }

  private writeCompositeIndexUtilizationEntity(
    result: string,
    indexUtilizationEntity: CompositeIndexUtilizationEntity,
  ): string {
    result = this.appendHeaderToResult(
      result,
      `${Constants.IndexExpression}: ${indexUtilizationEntity.IndexSpecs.join(", ")}`,
      2,
    );
    result = this.appendHeaderToResult(
      result,
      `${Constants.IndexImpactScore}: ${indexUtilizationEntity.IndexImpactScore}`,
      2,
    );
    result = this.appendHeaderToResult(result, Constants.IndexUtilizationSeparator, 2);
    return result;
  }

  private appendNewlineToResult(result: string): string {
    return this.appendHeaderToResult(result, "", 0);
  }

  private appendHeaderToResult(result: string, headerTitle: string, indentLevel: number): string {
    const Indent = "  ";
    const header = `${Indent.repeat(indentLevel)}${headerTitle}\n`;
    result += header;
    return result;
  }
}

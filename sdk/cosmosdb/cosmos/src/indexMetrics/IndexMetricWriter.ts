import { CompositeIndexUtilizationEntity } from "./CompositeIndexUtilizationEntity";
import { IndexUtilizationInfo } from "./IndexUtilizationInfo";
import { SingleIndexUtilizationEntity } from "./SingleIndexUtilizationEntity";

export class IndexMetricWriter {
  private static readonly IndexUtilizationInfo = "Index Utilization Information";
  private static readonly UtilizedSingleIndexes = "Utilized Single Indexes";
  private static readonly PotentialSingleIndexes = "Potential Single Indexes";
  private static readonly UtilizedCompositeIndexes = "Utilized Composite Indexes";
  private static readonly PotentialCompositeIndexes = "Potential Composite Indexes";
  private static readonly IndexExpression = "Index Spec";
  private static readonly IndexImpactScore = "Index Impact Score";
  private static readonly IndexUtilizationSeparator = "---";

  private result: string;

  public constructor() {
    this.result = "";
  }

  public writeIndexMetrics(indexUtilizationInfo: IndexUtilizationInfo): string {
    // IndexUtilizationInfo
    this.writeBeforeIndexUtilizationInfo();
    this.writeIndexUtilizationInfo(indexUtilizationInfo);
    this.writeAfterIndexUtilizationInfo();
    return this.result;
  }

  protected writeIndexUtilizationInfo(indexUtilizationInfo: IndexUtilizationInfo): void {
    console.log("indexUtilizationInfo: ", JSON.stringify(indexUtilizationInfo));
    this.appendHeaderToResult(IndexMetricWriter.UtilizedSingleIndexes, 1);

    for (const indexUtilizationEntity of indexUtilizationInfo.UtilizedSingleIndexes) {
      this.writeSingleIndexUtilizationEntity(indexUtilizationEntity);
    }

    this.appendHeaderToResult(IndexMetricWriter.PotentialSingleIndexes, 1);

    for (const indexUtilizationEntity of indexUtilizationInfo.PotentialSingleIndexes) {
      this.writeSingleIndexUtilizationEntity(indexUtilizationEntity);
    }

    this.appendHeaderToResult(IndexMetricWriter.UtilizedCompositeIndexes, 1);

    for (const indexUtilizationEntity of indexUtilizationInfo.UtilizedCompositeIndexes) {
      this.writeCompositeIndexUtilizationEntity(indexUtilizationEntity);
    }

    this.appendHeaderToResult(IndexMetricWriter.PotentialCompositeIndexes, 1);

    for (const indexUtilizationEntity of indexUtilizationInfo.PotentialCompositeIndexes) {
      this.writeCompositeIndexUtilizationEntity(indexUtilizationEntity);
    }
  }

  protected writeBeforeIndexUtilizationInfo(): void {
    this.appendNewlineToResult();
    this.appendHeaderToResult(IndexMetricWriter.IndexUtilizationInfo, 0);
  }

  protected writeAfterIndexUtilizationInfo(): void {}

  private appendHeaderToResult(headerTitle: string, indentLevel: number): void {
    const Indent = "  ";
    const header = `${Indent.repeat(indentLevel)}${headerTitle}\n`;
    this.result += header;
  }

  private appendNewlineToResult() {
    this.appendHeaderToResult("", 0);
  }

  private writeSingleIndexUtilizationEntity(
      indexUtilizationEntity: SingleIndexUtilizationEntity
    ): void {
      this.appendHeaderToResult(
        `${IndexMetricWriter.IndexExpression}: ${indexUtilizationEntity.IndexDocumentExpression}`,
        2
      );
      this.appendHeaderToResult(
        `${IndexMetricWriter.IndexImpactScore}: ${indexUtilizationEntity.IndexImpactScore}`,
        2
      );
      this.appendHeaderToResult(IndexMetricWriter.IndexUtilizationSeparator, 2);
    }

    private writeCompositeIndexUtilizationEntity(
      indexUtilizationEntity: CompositeIndexUtilizationEntity
    ): void {
      this.appendHeaderToResult(
        `${
          IndexMetricWriter.IndexExpression
        }: ${indexUtilizationEntity.IndexDocumentExpressions.join(", ")}`,
        2
      );
      this.appendHeaderToResult(
        `${IndexMetricWriter.IndexImpactScore}: ${indexUtilizationEntity.IndexImpactScore}`,
        2
      );
      this.appendHeaderToResult(IndexMetricWriter.IndexUtilizationSeparator, 2);
    }
}

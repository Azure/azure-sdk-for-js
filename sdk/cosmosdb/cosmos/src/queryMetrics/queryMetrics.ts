// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { ClientSideMetrics } from "./clientSideMetrics";
import QueryMetricsConstants from "./queryMetricsConstants";
import { parseDelimitedString, timeSpanFromMetrics } from "./queryMetricsUtils";
import { QueryPreparationTimes } from "./queryPreparationTime";
import { RuntimeExecutionTimes } from "./runtimeExecutionTimes";
import { TimeSpan } from "./timeSpan";

export class QueryMetrics {
  constructor(
    public readonly retrievedDocumentCount: number,
    public readonly retrievedDocumentSize: number,
    public readonly outputDocumentCount: number,
    public readonly outputDocumentSize: number,
    public readonly indexHitDocumentCount: number,
    public readonly totalQueryExecutionTime: TimeSpan,
    public readonly queryPreparationTimes: QueryPreparationTimes,
    public readonly indexLookupTime: TimeSpan,
    public readonly documentLoadTime: TimeSpan,
    public readonly vmExecutionTime: TimeSpan,
    public readonly runtimeExecutionTimes: RuntimeExecutionTimes,
    public readonly documentWriteTime: TimeSpan,
    public readonly clientSideMetrics: ClientSideMetrics
  ) {}

  /**
   * Gets the IndexHitRatio
   * @memberof QueryMetrics
   * @instance
   * @ignore
   */
  public get indexHitRatio() {
    return this.retrievedDocumentCount === 0
      ? 1
      : this.indexHitDocumentCount / this.retrievedDocumentCount;
  }

  /**
   * returns a new QueryMetrics instance that is the addition of this and the arguments.
   */
  public add(queryMetricsArray: QueryMetrics[]) {
    let retrievedDocumentCount = 0;
    let retrievedDocumentSize = 0;
    let outputDocumentCount = 0;
    let outputDocumentSize = 0;
    let indexHitDocumentCount = 0;
    let totalQueryExecutionTime = TimeSpan.zero;
    const queryPreparationTimesArray = [];
    let indexLookupTime = TimeSpan.zero;
    let documentLoadTime = TimeSpan.zero;
    let vmExecutionTime = TimeSpan.zero;
    const runtimeExecutionTimesArray = [];
    let documentWriteTime = TimeSpan.zero;
    const clientSideQueryMetricsArray = [];

    queryMetricsArray.push(this);

    for (const queryMetrics of queryMetricsArray) {
      if (queryMetrics) {
        retrievedDocumentCount += queryMetrics.retrievedDocumentCount;
        retrievedDocumentSize += queryMetrics.retrievedDocumentSize;
        outputDocumentCount += queryMetrics.outputDocumentCount;
        outputDocumentSize += queryMetrics.outputDocumentSize;
        indexHitDocumentCount += queryMetrics.indexHitDocumentCount;
        totalQueryExecutionTime = totalQueryExecutionTime.add(queryMetrics.totalQueryExecutionTime);
        queryPreparationTimesArray.push(queryMetrics.queryPreparationTimes);
        indexLookupTime = indexLookupTime.add(queryMetrics.indexLookupTime);
        documentLoadTime = documentLoadTime.add(queryMetrics.documentLoadTime);
        vmExecutionTime = vmExecutionTime.add(queryMetrics.vmExecutionTime);
        runtimeExecutionTimesArray.push(queryMetrics.runtimeExecutionTimes);
        documentWriteTime = documentWriteTime.add(queryMetrics.documentWriteTime);
        clientSideQueryMetricsArray.push(queryMetrics.clientSideMetrics);
      }
    }

    return new QueryMetrics(
      retrievedDocumentCount,
      retrievedDocumentSize,
      outputDocumentCount,
      outputDocumentSize,
      indexHitDocumentCount,
      totalQueryExecutionTime,
      QueryPreparationTimes.createFromArray(queryPreparationTimesArray),
      indexLookupTime,
      documentLoadTime,
      vmExecutionTime,
      RuntimeExecutionTimes.createFromArray(runtimeExecutionTimesArray),
      documentWriteTime,
      ClientSideMetrics.createFromArray(...clientSideQueryMetricsArray)
    );
  }

  /**
   * Output the QueryMetrics as a delimited string.
   * @memberof QueryMetrics
   * @instance
   * @ignore
   */
  public toDelimitedString() {
    return (
      QueryMetricsConstants.RetrievedDocumentCount +
      "=" +
      this.retrievedDocumentCount +
      ";" +
      QueryMetricsConstants.RetrievedDocumentSize +
      "=" +
      this.retrievedDocumentSize +
      ";" +
      QueryMetricsConstants.OutputDocumentCount +
      "=" +
      this.outputDocumentCount +
      ";" +
      QueryMetricsConstants.OutputDocumentSize +
      "=" +
      this.outputDocumentSize +
      ";" +
      QueryMetricsConstants.IndexHitRatio +
      "=" +
      this.indexHitRatio +
      ";" +
      QueryMetricsConstants.TotalQueryExecutionTimeInMs +
      "=" +
      this.totalQueryExecutionTime.totalMilliseconds() +
      ";" +
      this.queryPreparationTimes.toDelimitedString() +
      ";" +
      QueryMetricsConstants.IndexLookupTimeInMs +
      "=" +
      this.indexLookupTime.totalMilliseconds() +
      ";" +
      QueryMetricsConstants.DocumentLoadTimeInMs +
      "=" +
      this.documentLoadTime.totalMilliseconds() +
      ";" +
      QueryMetricsConstants.VMExecutionTimeInMs +
      "=" +
      this.vmExecutionTime.totalMilliseconds() +
      ";" +
      this.runtimeExecutionTimes.toDelimitedString() +
      ";" +
      QueryMetricsConstants.DocumentWriteTimeInMs +
      "=" +
      this.documentWriteTime.totalMilliseconds()
    );
  }

  public static readonly zero = new QueryMetrics(
    0,
    0,
    0,
    0,
    0,
    TimeSpan.zero,
    QueryPreparationTimes.zero,
    TimeSpan.zero,
    TimeSpan.zero,
    TimeSpan.zero,
    RuntimeExecutionTimes.zero,
    TimeSpan.zero,
    ClientSideMetrics.zero
  );

  /**
   * Returns a new instance of the QueryMetrics class that is the aggregation of an array of query metrics.
   * @memberof QueryMetrics
   * @instance
   */
  public static createFromArray(queryMetricsArray: QueryMetrics[]) {
    if (!queryMetricsArray) {
      throw new Error("queryMetricsArray is null or undefined item(s)");
    }

    return QueryMetrics.zero.add(queryMetricsArray);
  }

  /**
   * Returns a new instance of the QueryMetrics class this is deserialized from a delimited string.
   * @memberof QueryMetrics
   * @instance
   */
  public static createFromDelimitedString(
    delimitedString: string,
    clientSideMetrics?: ClientSideMetrics
  ) {
    const metrics = parseDelimitedString(delimitedString);

    const indexHitRatio = metrics[QueryMetricsConstants.IndexHitRatio] || 0;
    const retrievedDocumentCount = metrics[QueryMetricsConstants.RetrievedDocumentCount] || 0;
    const indexHitCount = indexHitRatio * retrievedDocumentCount;
    const outputDocumentCount = metrics[QueryMetricsConstants.OutputDocumentCount] || 0;
    const outputDocumentSize = metrics[QueryMetricsConstants.OutputDocumentSize] || 0;
    const retrievedDocumentSize = metrics[QueryMetricsConstants.RetrievedDocumentSize] || 0;
    const totalQueryExecutionTime = timeSpanFromMetrics(
      metrics,
      QueryMetricsConstants.TotalQueryExecutionTimeInMs
    );
    return new QueryMetrics(
      retrievedDocumentCount,
      retrievedDocumentSize,
      outputDocumentCount,
      outputDocumentSize,
      indexHitCount,
      totalQueryExecutionTime,
      QueryPreparationTimes.createFromDelimitedString(delimitedString),
      timeSpanFromMetrics(metrics, QueryMetricsConstants.IndexLookupTimeInMs),
      timeSpanFromMetrics(metrics, QueryMetricsConstants.DocumentLoadTimeInMs),
      timeSpanFromMetrics(metrics, QueryMetricsConstants.VMExecutionTimeInMs),
      RuntimeExecutionTimes.createFromDelimitedString(delimitedString),
      timeSpanFromMetrics(metrics, QueryMetricsConstants.DocumentWriteTimeInMs),
      clientSideMetrics || ClientSideMetrics.zero
    );
  }
}

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import QueryMetricsConstants from "./queryMetricsConstants";
import { parseDelimitedString, timeSpanFromMetrics } from "./queryMetricsUtils";
import { TimeSpan } from "./timeSpan";

export class QueryPreparationTimes {
  constructor(
    public readonly queryCompilationTime: TimeSpan,
    public readonly logicalPlanBuildTime: TimeSpan,
    public readonly physicalPlanBuildTime: TimeSpan,
    public readonly queryOptimizationTime: TimeSpan
  ) {}

  /**
   * returns a new QueryPreparationTimes instance that is the addition of this and the arguments.
   */
  public add(...queryPreparationTimesArray: QueryPreparationTimes[]): QueryPreparationTimes {
    let queryCompilationTime = this.queryCompilationTime;
    let logicalPlanBuildTime = this.logicalPlanBuildTime;
    let physicalPlanBuildTime = this.physicalPlanBuildTime;
    let queryOptimizationTime = this.queryOptimizationTime;

    for (const queryPreparationTimes of queryPreparationTimesArray) {
      if (queryPreparationTimes == null) {
        throw new Error("queryPreparationTimesArray has null or undefined item(s)");
      }

      queryCompilationTime = queryCompilationTime.add(queryPreparationTimes.queryCompilationTime);
      logicalPlanBuildTime = logicalPlanBuildTime.add(queryPreparationTimes.logicalPlanBuildTime);
      physicalPlanBuildTime = physicalPlanBuildTime.add(
        queryPreparationTimes.physicalPlanBuildTime
      );
      queryOptimizationTime = queryOptimizationTime.add(
        queryPreparationTimes.queryOptimizationTime
      );
    }

    return new QueryPreparationTimes(
      queryCompilationTime,
      logicalPlanBuildTime,
      physicalPlanBuildTime,
      queryOptimizationTime
    );
  }

  /**
   * Output the QueryPreparationTimes as a delimited string.
   */
  public toDelimitedString(): string {
    return (
      `${
        QueryMetricsConstants.QueryCompileTimeInMs
      }=${this.queryCompilationTime.totalMilliseconds()};` +
      `${
        QueryMetricsConstants.LogicalPlanBuildTimeInMs
      }=${this.logicalPlanBuildTime.totalMilliseconds()};` +
      `${
        QueryMetricsConstants.PhysicalPlanBuildTimeInMs
      }=${this.physicalPlanBuildTime.totalMilliseconds()};` +
      `${
        QueryMetricsConstants.QueryOptimizationTimeInMs
      }=${this.queryOptimizationTime.totalMilliseconds()}`
    );
  }

  public static readonly zero = new QueryPreparationTimes(
    TimeSpan.zero,
    TimeSpan.zero,
    TimeSpan.zero,
    TimeSpan.zero
  );

  /**
   * Returns a new instance of the QueryPreparationTimes class that is the
   * aggregation of an array of QueryPreparationTimes.
   */
  public static createFromArray(
    queryPreparationTimesArray: QueryPreparationTimes[]
  ): QueryPreparationTimes {
    if (queryPreparationTimesArray == null) {
      throw new Error("queryPreparationTimesArray is null or undefined item(s)");
    }

    return QueryPreparationTimes.zero.add(...queryPreparationTimesArray);
  }

  /**
   * Returns a new instance of the QueryPreparationTimes class this is deserialized from a delimited string.
   */
  public static createFromDelimitedString(delimitedString: string): QueryPreparationTimes {
    const metrics = parseDelimitedString(delimitedString);

    return new QueryPreparationTimes(
      timeSpanFromMetrics(metrics, QueryMetricsConstants.QueryCompileTimeInMs),
      timeSpanFromMetrics(metrics, QueryMetricsConstants.LogicalPlanBuildTimeInMs),
      timeSpanFromMetrics(metrics, QueryMetricsConstants.PhysicalPlanBuildTimeInMs),
      timeSpanFromMetrics(metrics, QueryMetricsConstants.QueryOptimizationTimeInMs)
    );
  }
}

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import QueryMetricsConstants from "./queryMetricsConstants";
import { parseDelimitedString, timeSpanFromMetrics } from "./queryMetricsUtils";
import { TimeSpan } from "./timeSpan";

export class RuntimeExecutionTimes {
  constructor(
    public readonly queryEngineExecutionTime: TimeSpan,
    public readonly systemFunctionExecutionTime: TimeSpan,
    public readonly userDefinedFunctionExecutionTime: TimeSpan
  ) {}

  /**
   * returns a new RuntimeExecutionTimes instance that is the addition of this and the arguments.
   */
  public add(...runtimeExecutionTimesArray: RuntimeExecutionTimes[]): RuntimeExecutionTimes {
    let queryEngineExecutionTime = this.queryEngineExecutionTime;
    let systemFunctionExecutionTime = this.systemFunctionExecutionTime;
    let userDefinedFunctionExecutionTime = this.userDefinedFunctionExecutionTime;

    for (const runtimeExecutionTimes of runtimeExecutionTimesArray) {
      if (runtimeExecutionTimes == null) {
        throw new Error("runtimeExecutionTimes has null or undefined item(s)");
      }

      queryEngineExecutionTime = queryEngineExecutionTime.add(
        runtimeExecutionTimes.queryEngineExecutionTime
      );
      systemFunctionExecutionTime = systemFunctionExecutionTime.add(
        runtimeExecutionTimes.systemFunctionExecutionTime
      );
      userDefinedFunctionExecutionTime = userDefinedFunctionExecutionTime.add(
        runtimeExecutionTimes.userDefinedFunctionExecutionTime
      );
    }

    return new RuntimeExecutionTimes(
      queryEngineExecutionTime,
      systemFunctionExecutionTime,
      userDefinedFunctionExecutionTime
    );
  }

  /**
   * Output the RuntimeExecutionTimes as a delimited string.
   */
  public toDelimitedString(): string {
    return (
      `${
        QueryMetricsConstants.SystemFunctionExecuteTimeInMs
      }=${this.systemFunctionExecutionTime.totalMilliseconds()};` +
      `${
        QueryMetricsConstants.UserDefinedFunctionExecutionTimeInMs
      }=${this.userDefinedFunctionExecutionTime.totalMilliseconds()}`
    );
  }

  public static readonly zero = new RuntimeExecutionTimes(
    TimeSpan.zero,
    TimeSpan.zero,
    TimeSpan.zero
  );

  /**
   * Returns a new instance of the RuntimeExecutionTimes class that is
   *  the aggregation of an array of RuntimeExecutionTimes.
   */
  public static createFromArray(
    runtimeExecutionTimesArray: RuntimeExecutionTimes[]
  ): RuntimeExecutionTimes {
    if (runtimeExecutionTimesArray == null) {
      throw new Error("runtimeExecutionTimesArray is null or undefined item(s)");
    }

    return RuntimeExecutionTimes.zero.add(...runtimeExecutionTimesArray);
  }

  /**
   * Returns a new instance of the RuntimeExecutionTimes class this is deserialized from a delimited string.
   */
  public static createFromDelimitedString(delimitedString: string): RuntimeExecutionTimes {
    const metrics = parseDelimitedString(delimitedString);

    const vmExecutionTime = timeSpanFromMetrics(metrics, QueryMetricsConstants.VMExecutionTimeInMs);
    const indexLookupTime = timeSpanFromMetrics(metrics, QueryMetricsConstants.IndexLookupTimeInMs);
    const documentLoadTime = timeSpanFromMetrics(
      metrics,
      QueryMetricsConstants.DocumentLoadTimeInMs
    );
    const documentWriteTime = timeSpanFromMetrics(
      metrics,
      QueryMetricsConstants.DocumentWriteTimeInMs
    );

    let queryEngineExecutionTime = TimeSpan.zero;
    queryEngineExecutionTime = queryEngineExecutionTime.add(vmExecutionTime);
    queryEngineExecutionTime = queryEngineExecutionTime.subtract(indexLookupTime);
    queryEngineExecutionTime = queryEngineExecutionTime.subtract(documentLoadTime);
    queryEngineExecutionTime = queryEngineExecutionTime.subtract(documentWriteTime);
    return new RuntimeExecutionTimes(
      queryEngineExecutionTime,
      timeSpanFromMetrics(metrics, QueryMetricsConstants.SystemFunctionExecuteTimeInMs),
      timeSpanFromMetrics(metrics, QueryMetricsConstants.UserDefinedFunctionExecutionTimeInMs)
    );
  }
}

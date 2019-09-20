/**
 * Copyright 2018, OpenCensus Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { StatsEventListener } from './exporters';
import { Metric } from './metrics_export';
import { TagMap } from './tag-map';
import { TagKey, TagValue } from './tags';

/** Default type for functions */
// tslint:disable:no-any
type Func<T> = (...args: any[]) => T;

/** Main interface for stats. */
export interface Stats {
  /**
   * Creates a view.
   * @param name The view name
   * @param measure The view measure
   * @param aggregation The view aggregation type
   * @param tagKeys The view columns (tag keys)
   * @param description The view description
   * @param bucketBoundaries The view bucket boundaries for a distribution
   *     aggregation type
   */
  createView(
    name: string,
    measure: Measure,
    aggregation: AggregationType,
    tagKeys: TagKey[],
    description: string,
    bucketBoundaries?: number[]
  ): View;

  /**
   * Registers a view to listen to new measurements in its measure.
   * @param view The view to be registered
   */
  registerView(view: View): void;

  /**
   * Creates a measure of type Double.
   * @param name The measure name
   * @param unit The measure unit
   * @param description The measure description
   */
  createMeasureDouble(
    name: string,
    unit: MeasureUnit,
    description?: string
  ): Measure;

  /**
   * Creates a measure of type Int64. Values must be integers up to
   * Number.MAX_SAFE_INTERGER.
   * @param name The measure name
   * @param unit The measure unit
   * @param description The measure description
   */
  createMeasureInt64(
    name: string,
    unit: MeasureUnit,
    description?: string
  ): Measure;

  /**
   * Updates all views with the new measurements.
   * @param measurements A list of measurements to record
   * @param tags optional The tags to which the value is applied.
   *     tags could either be explicitly passed to the method, or implicitly
   *     read from current execution context.
   * @param attachments optional The contextual information associated with an
   *     example value. The contextual information is represented as key - value
   *     string pairs.
   */
  record(
    measurements: Measurement[],
    tags?: TagMap,
    attachments?: { [key: string]: string }
  ): void;

  /**
   * Remove all registered Views and exporters from the stats.
   */
  clear(): void;

  /**
   * Gets a collection of produced Metric`s to be exported.
   * @returns The List of metrics.
   */
  getMetrics(): Metric[];

  /**
   * Registers an exporter to send stats data to a service.
   * @param exporter An stats exporter
   */
  registerExporter(exporter: StatsEventListener): void;

  /**
   * Unregisters an exporter. It should be called whenever the exporter is not
   * needed anymore.
   * @param exporter An stats exporter
   */
  unregisterExporter(exporter: StatsEventListener): void;

  /**
   * Enters the scope of code where the given `TagMap` is in the current context
   * (replacing the previous `TagMap`).
   * @param tags The TagMap to be set to the current context.
   * @param fn Callback function.
   * @returns The callback return.
   */
  withTagContext<T>(tags: TagMap, fn: Func<T>): T;

  /** Gets the current tag context. */
  getCurrentTagContext(): TagMap;
}

/**
 * Describes the type of the individual values/measurements recorded by an
 * application. It includes information such as the type of measurement, the
 * units of measurement and descriptive names for the data. This provides the
 * fundamental type used for recording data.
 */
export interface Measure {
  /**
   * A string by which the measure will be referred to, e.g.
   * "rpc_server_latency". Names MUST be unique within the library.
   */
  readonly name: string;
  /** Describes the measure, e.g. "RPC latency in seconds". */
  readonly description?: string;
  /**
   * Describes the unit used for the Measure. Follows the format described by
   * http://unitsofmeasure.org/ucum.html.
   */
  readonly unit: MeasureUnit;
  /** The type used for this Measure. */
  readonly type: MeasureType;
}

/**
 * Describes the unit used for the Measure. Should follows the format described
 * by http://unitsofmeasure.org/ucum.html.
 */
export enum MeasureUnit {
  UNIT = '1', // for general counts
  BYTE = 'by', // bytes
  KBYTE = 'kb', // Kbytes
  SEC = 's', // seconds
  MS = 'ms', // millisecond
  NS = 'ns', // nanosecond
}

/** Describes the types of a Measure. It can be Int64 or a Double type. */
export enum MeasureType {
  INT64 = 'INT64',
  DOUBLE = 'DOUBLE',
}

/** Describes a data point to be collected for a Measure. */
export interface Measurement {
  /** The measure to which the value is applied */
  readonly measure: Measure;
  /**
   * The recorded value. If the measure has type INT64, value must be an integer
   * up to Number.MAX_SAFE_INTERGER.
   */
  readonly value: number;
}

/**
 * Defines how individual measurements are broken down by tags and aggregated.
 */
export interface View {
  /**
   * A string by which the View will be referred to, e.g. "rpc_latency". Names
   * MUST be unique within the library.
   */
  readonly name: string;
  /** Describes the view, e.g. "RPC latency distribution" */
  readonly description: string;
  /** The Measure to which this view is applied. */
  readonly measure: Measure;
  /**
   * An Aggregation describes how data collected is aggregated.
   * There are four aggregation types: count, sum, lastValue and distirbution.
   */
  readonly aggregation: AggregationType;
  /** The start time for this view */
  readonly startTime: number;
  /**
   * The end time for this view - represents the last time a value was recorded
   */
  endTime?: number;
  /** true if the view was registered */
  registered: boolean;
  /**
   * Records a measurement in the proper view's row. This method is used by
   * Stats. User should prefer using Stats.record() instead.
   *
   * Measurements with measurement type INT64 will have its value truncated.
   * @param measurement The measurement to record
   * @param tags The tags to which the value is applied
   * @param attachments optional The contextual information associated with an
   *     example value. THe contextual information is represented as key - value
   *     string pairs.
   */
  recordMeasurement(
    measurement: Measurement,
    tags: TagMap,
    attachments?: { [key: string]: string }
  ): void;
  /**
   * Returns a snapshot of an AggregationData for that tags/labels values.
   * @param tagValues The desired data's tag values.
   */
  getSnapshot(tagValues: Array<TagValue | null>): AggregationData;
  /** Gets the view's tag keys */
  getColumns(): TagKey[];
  /** Gets view`s metric */
  getMetric(start: number): Metric;
}

/**
 * Informs the type of the aggregation. It can be: count, sum, lastValue or
 * distribution.
 */
export enum AggregationType {
  COUNT = 0,
  SUM = 1,
  LAST_VALUE = 2,
  DISTRIBUTION = 3,
}

/** Defines how data is collected and aggregated */
export interface AggregationMetadata {
  /** The aggregation type of the aggregation data */
  readonly type: AggregationType;
  /** The tagValues that this AggregationData collects and aggregates */
  readonly tagValues: Array<TagValue | null>;
  /** The latest timestamp a new data point was recorded */
  timestamp: number;
}

/**
 * Data collected and aggregated with this AggregationData will be summed
 * up.
 */
export interface SumData extends AggregationMetadata {
  type: AggregationType.SUM;
  /** The current accumulated value */
  value: number;
}

/**
 * This AggregationData counts the number of measurements recorded.
 */
export interface CountData extends AggregationMetadata {
  type: AggregationType.COUNT;
  /** The current counted value */
  value: number;
}

/**
 * This AggregationData represents the last recorded value. This is useful
 * when giving support to Gauges.
 */
export interface LastValueData extends AggregationMetadata {
  type: AggregationType.LAST_VALUE;
  /** The last recorded value */
  value: number;
}

/** This AggregationData contains a histogram of the collected values. */
export interface DistributionData extends AggregationMetadata {
  type: AggregationType.DISTRIBUTION;
  /** The first timestamp a datapoint was added */
  readonly startTime: number;
  /** Get the total count of all recorded values in the histogram */
  count: number;
  /** Sum of all recorded values in the histogram */
  sum: number;
  /** Get the computed mean value of all recorded values in the histogram */
  mean: number;
  /**
   * Get the computed standard deviation of all recorded values in the
   * histogram
   */
  stdDeviation: number;
  /**
   * Get the computed sum of squared deviations of all recorded values in the
   * histogram.
   */
  sumOfSquaredDeviation: number;
  /** Bucket distribution of the histogram */
  buckets: Bucket[];
  /** Buckets count */
  bucketCounts?: number[];
  /** If the distribution does not have a histogram, then omit this field. */
  exemplars?: StatsExemplar[];
}

/**
 * Exemplars are example points that may be used to annotate aggregated
 * Distribution values. They are metadata that gives information about a
 * particular value added to a Distribution bucket.
 */
export interface StatsExemplar {
  /**
   * Value of the exemplar point. It determines which bucket the exemplar
   * belongs to.
   */
  readonly value: number;
  /** The observation (sampling) time of the above value. */
  readonly timestamp: number;
  /** Contextual information about the example value. */
  readonly attachments: { [key: string]: string };
}

export type Bucket = number;
export type AggregationData =
  | SumData
  | CountData
  | LastValueData
  | DistributionData;

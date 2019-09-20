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

/** Properties of a Metric which has one or more timeseries */
export interface Metric {
  /**
   * The descriptor of the Metric. This is an optimization for network wire
   * size, from data-model perspective a Metric contains always
   * a MetricDescriptor.
   * In case of a streaming RPC can be sent only
   * the first time a metric is reported to save network traffic.
   */
  readonly descriptor: MetricDescriptor;
  /**
   * One or more timeseries for a single metric, where each timeseries has
   * one or more points.
   */
  readonly timeseries: TimeSeries[];
}

/** Properties of a Metric type and its schema */
export interface MetricDescriptor {
  /**  The metric type, including its DNS name prefix. It must be unique. */
  readonly name: string;
  /**
   * A detailed description of the metric, which can be used in documentation.
   */
  readonly description: string;
  /**
   * The unit in which the metric value is reported. Follows the format
   * described by http://unitsofmeasure.org/ucum.html.
   */
  readonly unit: string;
  /** MetricDescriptor type */
  readonly type: MetricDescriptorType;
  /** The label keys associated with the metric descriptor. */
  readonly labelKeys: LabelKey[];
}

/**
 * The kind of metric. It describes how the data is reported.
 *
 * A gauge is an instantaneous measurement of a value.
 *
 * A cumulative measurement is a value accumulated over a time interval. In
 * a time series, cumulative measurements should have the same start time,
 * increasing values and increasing end times, until an event resets the
 * cumulative value to zero and sets a new start time for the following
 * points.
 */
export enum MetricDescriptorType {
  /** Do not use this default value. */
  UNSPECIFIED,
  /** Integer gauge. The value can go both up and down. */
  GAUGE_INT64,
  /** Floating point gauge. The value can go both up and down. */
  GAUGE_DOUBLE,
  /**
   * Distribution gauge measurement. The count and sum can go both up and
   * down. Recorded values are always >= 0.
   * Used in scenarios like a snapshot of time the current items in a queue
   * have spent there.
   */
  GAUGE_DISTRIBUTION,
  /**
   * Integer cumulative measurement. The value cannot decrease, if resets
   * then the start_time should also be reset.
   */
  CUMULATIVE_INT64,
  /**
   * Floating point cumulative measurement. The value cannot decrease, if
   * resets then the start_time should also be reset. Recorded values are
   * always >= 0.
   */
  CUMULATIVE_DOUBLE,
  /**
   * Distribution cumulative measurement. The count and sum cannot decrease,
   * if resets then the start_time should also be reset.
   */
  CUMULATIVE_DISTRIBUTION,
  /**
   * Some frameworks implemented Histograms as a summary of observations
   * (usually things like request durations and response sizes). While it
   * also provides a total count of observations and a sum of all observed
   * values, it calculates configurable percentiles over a sliding time
   * window. This is not recommended, since it cannot be aggregated.
   */
  SUMMARY,
}

/** Properties of a LabelKey associated with a MetricDescriptor. */
export interface LabelKey {
  /** The key for the label. */
  readonly key: string;
  /** A human-readable description of what this label key represents. */
  readonly description: string;
}

/**
 * A collection of data points that describes the time-varying values
 * of a metric.
 */
export interface TimeSeries {
  /**
   * Must be present for cumulative metrics. The time when the cumulative value
   * was reset to zero. Exclusive. The cumulative value is over the time
   * interval (start_timestamp, timestamp]. If not specified, the backend can
   * use the previous recorded value.
   */
  readonly startTimestamp?: Timestamp;
  /**
   * The set of label values that uniquely identify this timeseries. Applies to
   * all points. The order of label values must match that of label keys in the
   * metric descriptor.
   */
  readonly labelValues: LabelValue[];
  /**
   * The data points of this timeseries. Point.value type MUST match the
   * MetricDescriptor.type.
   */
  readonly points: Point[];
}

/** The LabelValue type. null value indicates an unset. */
export interface LabelValue {
  /** The value for the label. */
  readonly value: string | null;
}

/** A timestamped measurement. */
export interface Point {
  /**
   * The moment when this point was recorded. Inclusive.
   * If not specified, the timestamp will be decided by the backend.
   */
  readonly timestamp: Timestamp;
  /**
   * The actual point value.
   * 64-bit integer or 64-bit double-precision floating-point number
   * or distribution value
   * or summary value. This is not recommended, since it cannot be aggregated.
   */
  readonly value: number | DistributionValue | SummaryValue;
}

/**
 * Distribution contains summary statistics for a population of values. It
 * optionally contains a histogram representing the distribution of those
 * values across a set of buckets.
 */
export interface DistributionValue {
  /**
   * The number of values in the population. Must be non-negative. This value
   * must equal the sum of the values in bucket_counts if a histogram is
   * provided.
   */
  readonly count: number;
  /**
   * The sum of the values in the population. If count is zero then this field
   * must be zero.
   */
  readonly sum: number;
  /**
   * The sum of squared deviations from the mean of the values in the
   * population. For values x_i this is:
   *
   *     Sum[i=1..n]((x_i - mean)^2)
   *
   * Knuth, "The Art of Computer Programming", Vol. 2, page 323, 3rd edition
   * describes Welford's method for accumulating this sum in one pass.
   *
   * If count is zero then this field must be zero.
   */
  readonly sumOfSquaredDeviation: number;
  /**
   * Don't change bucket boundaries within a TimeSeries if your backend doesn't
   * support this. To save network bandwidth this field can be sent only the
   * first time a metric is sent when using a streaming RPC.
   */
  readonly bucketOptions: BucketOptions;
  /** DistributionValue buckets */
  readonly buckets: Bucket[];
}

/**
 * Properties of a BucketOptions.
 * A Distribution may optionally contain a histogram of the values in the
 * population. The bucket boundaries for that histogram are described by
 * BucketOptions.
 *
 * If bucket_options has no type, then there is no histogram associated with
 * the Distribution.
 */
export interface BucketOptions {
  /** Bucket with explicit bounds. */
  readonly explicit: Explicit;
}

/**
 * Properties of an Explicit.
 * Specifies a set of buckets with arbitrary upper-bounds.
 * This defines size(bounds) + 1 (= N) buckets. The boundaries for bucket
 * index i are:
 *
 * [0, bucket_bounds[i]) for i == 0
 * [bucket_bounds[i-1], bucket_bounds[i]) for 0 < i < N-1
 * [bucket_bounds[i-1], +infinity) for i == N-1
 */
export interface Explicit {
  /** The values must be strictly increasing and > 0. */
  readonly bounds: number[];
  // TODO: If OpenMetrics decides to support (a, b] intervals we should add
  // support for these by defining a boolean value here which decides what
  // type of intervals to use.
}

/** Properties of a Bucket. */
export interface Bucket {
  /**
   * The number of values in each bucket of the histogram, as described in
   * bucket_bounds.
   */
  readonly count: number;
  /**
   * If the distribution does not have a histogram, then omit this field.
   */
  readonly exemplar?: Exemplar;
}

/**
 * Exemplars are example points that may be used to annotate aggregated
 * Distribution values. They are metadata that gives information about a
 * particular value added to a Distribution bucket.
 */
export interface Exemplar {
  /**
   * Value of the exemplar point. It determines which bucket the exemplar
   * belongs to.
   */
  readonly value: number;
  /** The observation (sampling) time of the above value. */
  readonly timestamp: Timestamp;
  /** Contextual information about the example value. */
  readonly attachments: { [key: string]: string };
}

/**
 * The start_timestamp only applies to the count and sum in the SummaryValue.
 */
export interface SummaryValue {
  /**
   * The total number of recorded values since start_time. Optional since
   * some systems don't expose this.
   */
  readonly count: number;
  /**
   * The total sum of recorded values since start_time. Optional since some
   * systems don't expose this. If count is zero then this field must be zero.
   * This field must be unset if the sum is not available.
   */
  readonly sum: number;
  /** Values calculated over an arbitrary time window. */
  // TODO: Change it to required when Exemplar functionality will be added.
  readonly snapshot?: Snapshot;
}

/**
 * The values in this message can be reset at arbitrary unknown times, with
 * the requirement that all of them are reset at the same time.
 */
export interface Snapshot {
  /**
   * The number of values in the snapshot. Optional since some systems don't
   * expose this.
   */
  readonly count: number;
  /**
   * The sum of values in the snapshot. Optional since some systems don't
   * expose this. If count is zero then this field must be zero or not set
   * (if not supported).
   */
  readonly sum: number;
  /**
   * A list of values at different percentiles of the distribution calculated
   * from the current snapshot. The percentiles must be strictly increasing.
   */
  readonly percentileValues: ValueAtPercentile[];
}

/**
 * Represents the value at a given percentile of a distribution.
 */
export interface ValueAtPercentile {
  /** The percentile of a distribution. Must be in the interval (0.0, 100.0]. */
  readonly percentile: number;
  /** The value at the given percentile of a distribution. */
  readonly value: number;
}

export interface Timestamp {
  /**
   * Represents seconds of UTC time since Unix epoch
   * 1970-01-01T00:00:00Z. Must be from 0001-01-01T00:00:00Z to
   * 9999-12-31T23:59:59Z inclusive.
   */
  seconds: number | null;
  /**
   * Non-negative fractions of a second at nanosecond resolution. Negative
   * second values with fractions must still have non-negative nanos values
   * that count forward in time. Must be from 0 to 999,999,999
   * inclusive.
   */
  nanos: number | null;
}

/**
 * Keeps a set of MetricProducer that is used by exporters to determine the
 * metrics that need to be exported.
 */
export interface MetricProducerManager {
  /** Adds the MetricProducer to the manager */
  add(metricProducer: MetricProducer): void;
  /** Removes the MetricProducer to the manager */
  remove(metricProducer: MetricProducer): void;
  /** Clears all MetricProducers */
  removeAll(): void;
  /** Gets all registered MetricProducers that should be exported */
  getAllMetricProducer(): Set<MetricProducer>;
}

/**
 * A MetricProducer producer that can be registered for exporting using
 * MetricProducerManager.
 */
export interface MetricProducer {
  /** Gets a collection of produced Metric`s to be exported */
  getMetrics(): Metric[];
}

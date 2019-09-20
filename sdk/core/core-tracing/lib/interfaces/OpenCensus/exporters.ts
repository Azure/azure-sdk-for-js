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

import { Measurement, View } from './stats';
import { TagKey, TagValue } from './tags';
import * as configTypes from './config';
import * as modelTypes from './model';

/** Defines a trace exporter interface. */
export interface Exporter extends modelTypes.SpanEventListener {
  /**
   * Sends a list of spans to the service.
   * @param spans A list of spans to publish.
   */
  publish(spans: modelTypes.Span[]): Promise<number | string | void>;
}

/**
 * An interface that describes the possible events that will be emitted from a
 * Stats instance. Stats exporters should implement this interface.
 */
export interface StatsEventListener {
  /**
   * Is called whenever a new view is registered
   * @deprecated since version 0.0.9 - use {@link start} instead
   * @param view The registered view
   */
  onRegisterView(view: View): void;

  /**
   * Is called whenever a new measurement is recorded.
   * @deprecated since version 0.0.9 - use {@link start} instead
   * @param views The views related to the measurement
   * @param measurement The recorded measurement
   * @param tags The tags to which the value is applied
   */
  onRecord(
    views: View[],
    measurement: Measurement,
    tags: Map<TagKey, TagValue>
  ): void;

  /**
   * Starts the exporter that polls Metric from Metrics library and send
   * batched data to backend.
   */
  start(): void;

  /** Stops the exporter. */
  stop(): void;
}

export type ExporterConfig = configTypes.BufferConfig;

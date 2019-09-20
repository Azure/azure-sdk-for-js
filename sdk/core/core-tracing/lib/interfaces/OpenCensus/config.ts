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

import { Logger } from './common';
import { Exporter } from './exporters';
import { Stats } from './stats';
import { PluginNames } from './instrumentation';
import { Attributes } from './model';
import { Propagation } from './propagation';

/** Interface configuration for a buffer. */
export interface BufferConfig {
  /** Maximum size of a buffer. */
  bufferSize?: number;
  /** Max time for a buffer can wait before being sent */
  bufferTimeout?: number;
  /** A logger object  */
  logger?: Logger;
}

/** Defines tracer configuration parameters */
export interface TracerConfig {
  /** A set of default attributes each in the format [KEY]:[VALUE] */
  defaultAttributes?: Attributes;
  /** Determines the sampling rate. Ranges from 0.0 to 1.0 */
  samplingRate?: number;
  /** A logger object  */
  logger?: Logger;
  /** A propagation instance */
  propagation?: Propagation;
  /** Trace Parameters */
  traceParams?: TraceParams;
}

/** Available configuration options. */
export interface TracingConfig {
  /** level of logger - 0:disable, 1: error, 2: warn, 3: info, 4: debug  */
  logLevel?: number;

  /**
   * The maximum number of characters reported on a label value.
   */
  maximumLabelValueSize?: number;

  /**
   * A list of trace instrumentations plugins to load.
   * Each key is the name of the module to trace, and its
   * value is the name of the package which has the plugin
   * implementation.
   * Ex.:
   * plugins: {
   *  'http': '@opencensus/opencensus-instrumentation-http',
   *  'mongodb-core': '@opencensus/opencensus-instrumentation-mongodb-core',
   *   ...
   * }
   * Any user-provided value will be added to the default list.
   * It will override any default plugin for the same key.
   */
  plugins?: PluginNames;
  /** An exporter object */
  exporter?: Exporter;
  /** An instance of a logger  */
  logger?: Logger;
  /** An instance of a stats  */
  stats?: Stats;
}

/** Global configuration of trace service */
export interface TraceParams {
  /**
   * numberOfAnnontationEventsPerSpan is number of annotation events per
   * span
   */
  numberOfAnnontationEventsPerSpan?: number;
  /** numberOfMessageEventsPerSpan is number of message events per span */
  numberOfMessageEventsPerSpan?: number;
  /** numberOfAttributesPerSpan is number of attributes per span */
  numberOfAttributesPerSpan?: number;
  /** numberOfLinksPerSpan is number of links per span */
  numberOfLinksPerSpan?: number;
}

export type Config = TracingConfig & TracerConfig & BufferConfig;

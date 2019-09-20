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

import { Stats } from './stats';
import { Span, TracerBase } from './model';

/** Interface Plugin to apply patch. */
export interface Plugin {
  /**
   * Method that enables the instrumentation patch.
   *
   * @param moduleExports nodejs module exports from the module to patch
   * @param tracer a tracer instance
   * @param version version of the current instaled module to patch
   * @param options plugin options
   * @param basedir an optional module absolute path
   * @param stats an optional stats instance
   */
  enable<T>(
    moduleExports: T,
    tracer: TracerBase,
    version: string,
    options: PluginConfig,
    basedir?: string,
    stats?: Stats
  ): T;
  /** Method to disable the instrumentation  */
  disable(): void;
}

/**
 * Function that can be provided to plugin in order to add custom
 * attributes to spans
 */
export interface CustomAttributeFunction {
  // tslint:disable-next-line:no-any
  (span: Span, ...rest: any[]): void;
}

export interface PluginConfig {
  // tslint:disable-next-line:no-any
  [key: string]: any;
  applyCustomAttributesOnSpan?: CustomAttributeFunction;
}

export interface NamedPluginConfig {
  module: string;
  config: PluginConfig;
}

/**
 * Type PluginNames: each key should be the name of the module to trace,
 * and its value should be the name of the package  which has the
 * plugin implementation.
 */
export interface PluginNames {
  [pluginName: string]: string | NamedPluginConfig;
}

export interface PluginInternalFilesVersion {
  [pluginName: string]: string;
}

/**
 * Each key should be the name of the module to trace, and its value
 * a mapping of a property name to a internal plugin file name.
 */
export interface PluginInternalFiles {
  [versions: string]: PluginInternalFilesVersion;
}

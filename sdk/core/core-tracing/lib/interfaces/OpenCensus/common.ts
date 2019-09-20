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

// tslint:disable:no-any
export type LogFunction = (message: any, ...args: any[]) => void;

/** Defines a logger interface. */
export interface Logger {
  /** Logger verbosity level. If omitted, `debug` level is assumed. */
  level?: string;

  error: LogFunction;
  warn: LogFunction;
  info: LogFunction;
  debug: LogFunction;
}

/** Defines a logger options interface. */
export interface LoggerOptions {
  level?: string;
}

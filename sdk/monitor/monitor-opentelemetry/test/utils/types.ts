// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { TelemetryItem as Envelope } from "./models/index.js";

export interface Expectation extends Partial<Envelope> {
  children: Expectation[];
}

export interface Scenario {
  expectation: Expectation[];
  prepare(): void;
  run(): void;
  cleanup(): void;
}

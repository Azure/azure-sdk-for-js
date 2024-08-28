// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { TelemetryItem as Envelope } from "./models/index";

export interface Expectation extends Partial<Envelope> {
  children: Expectation[];
}

export interface Scenario {
  expectation: Expectation[];
  prepare(): void;
  run(): void;
  cleanup(): void;
}

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { TelemetryItem as Envelope } from "../../../src/generated";

export interface Expectation extends Partial<Envelope> {
  children: Expectation[];
}

export interface Scenario {
  expectation: Expectation[];
  prepare(): void;
  run(): void;
  cleanup(): void;
}

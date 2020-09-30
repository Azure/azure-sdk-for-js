// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Envelope } from "../../../src/Declarations/Contracts";

export interface Expectation extends Partial<Envelope> {
  children: Expectation[];
}

export interface Scenario {
  expectation: Expectation[];
  prepare(): void;
  run(): void;
  cleanup(): void;
}

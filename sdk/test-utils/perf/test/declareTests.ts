// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { NoOp } from "./noop.spec";
import { OptionsTest } from "./options.spec";
import { SetupCleanupTest } from "./setupCleanup.spec";
import { Exception } from "./exception.spec";
import { SleepTest } from "./sleep.spec";
import { NodeFetchTest } from "./nodeFetch.spec";
import { MockReceiverTest } from "./batch/mockReceiverTest.spec";
import { MockEventReceiverTest } from "./event/mockEventReceiverTest.spec";
import { MockEventHubConsumerClientTest } from "./event/mockEventHubConsumerClientTest.spec";
import { LogTest } from "./log.spec";
import { PerfTestConstructor } from "../src";

type NormalizedTestDefinition = { testClass: PerfTestConstructor; options?: string };

type TestDefinition = PerfTestConstructor | NormalizedTestDefinition;

// Populate this array when adding a new test.
// If you wish to provide options that are passed to the test when all tests are
// run using the `unit-test:node` command, use the full object format { testClass: ..., options: ... }.
// Otherwise, you can just specify the test class itself.
const tests: TestDefinition[] = [
  NoOp,
  SetupCleanupTest,
  Exception,
  SleepTest,
  NodeFetchTest,
  {
    testClass: OptionsTest,
    options: "--req some-string",
  },
  MockReceiverTest,
  MockEventReceiverTest,
  MockEventHubConsumerClientTest,
  LogTest,
];

// Normalize everything in the array above for export.
export const allTests: NormalizedTestDefinition[] = tests.map((test) =>
  typeof test === "function" ? { testClass: test } : test
);

// Exports all the test classes so that the index.spec.ts can pick them up
export const allTestClasses = allTests.map(({ testClass }) => testClass);

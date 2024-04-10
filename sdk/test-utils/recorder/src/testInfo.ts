// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * Represents a Test.
 */
export type TestInfo = VitestTestContext;

/**
 * Represents a Vitest Test Context
 */
export interface VitestTestContext {
  /**
   * The Vitest Context Task.
   */
  task: VitestTask;
}

export interface VitestTaskBase {
  name: string;
  suite?: VitestSuite;
}

/**
 * Represents a Vitest Test Context Task
 */
export interface VitestTask extends VitestTaskBase {
  /**
   * The Vitest Context Task Name.
   */
  name: string;
  /**
   * The Vitest Context Task Suite.
   */
  suite: VitestSuite;
}

/**
 * Represents a Vitest Test Suite.
 */
export interface VitestSuite extends VitestTaskBase {
  /**
   * The Vitest Context Task Suite Name.
   */
  name: string;
}

/**
 * Determines whether the given test is a Vitest Test.
 * @param test - The test to check.
 * @returns true if the given test is a Vitest Test.
 */
export function isVitestTestContext(test: unknown): test is VitestTestContext {
  return (
    typeof test === "function" &&
    "task" in test &&
    typeof test.task === "object" &&
    test.task != null &&
    "name" in test.task
  );
}

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { TestContext, RunnerTestSuite } from "vitest";

/**
 * Gets the full title of a task to mimic the behavior of Mocha's full title.
 * @param ctx - The task context.
 * @returns The full title that includes the suite and task name.
 */
export function getTaskFullTitle(ctx: TestContext): string {
  function getTitlePath(suite: RunnerTestSuite | undefined): string[] {
    if (suite) {
      return [...getTitlePath(suite.suite), suite.name];
    }
    return [];
  }

  return [...getTitlePath(ctx.task.suite), ctx.task.name].join(" ");
}

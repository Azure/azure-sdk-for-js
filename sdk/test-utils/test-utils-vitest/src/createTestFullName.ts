// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { TestContext } from "vitest";

export function createTestFullName(test: TestContext): string {
  let name = test.task.name;
  for (let parent = test.task.suite; parent; parent = parent.suite?.suite) {
    name = `${parent.name}/${name}`;
  }
  return name;
}

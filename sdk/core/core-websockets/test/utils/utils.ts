// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { TestContext } from "vitest";

export function createIdentifier(test: TestContext): string {
  let name = test.task.name;
  for (let parent = test.task.suite; parent; parent = parent.suite?.suite) {
    name = `${parent.name}/${name}`;
  }
  return name;
}

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { describe, it, expect } from "vitest";

import { calculatePaths } from "../src/recorder.js";

describe("Recorder file paths", () => {
  it("calculates paths for a vitest test", () => {
    const vitestTest = (): void => {
      /* no-op */
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (vitestTest as any).task = {
      name: "vitest test title",
      suite: {
        name: "vitest suite title",
      },
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const context = calculatePaths(vitestTest as any);
    expect(context).to.eql({
      suiteTitle: "vitest suite title",
      testTitle: "vitest test title",
    });
  });

  it("calculates paths for a vitest test with nested suites", () => {
    const vitestTest = (): void => {
      /* no-op */
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (vitestTest as any).task = {
      name: "vitest test title",
      suite: {
        name: "vitest suite title",
        suite: {
          name: "toplevel suite",
        },
      },
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const context = calculatePaths(vitestTest as any);
    expect(context).to.eql({
      suiteTitle: "toplevel suite_vitest suite title",
      testTitle: "vitest test title",
    });
  });
});

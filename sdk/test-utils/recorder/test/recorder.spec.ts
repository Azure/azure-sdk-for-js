// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { expect } from "chai";

import { calculatePaths } from "../src/recorder";

describe("Recorder file paths", () => {
  it("calculates paths for a Mocha test", () => {
    const mochaTest = {
      title: "mocha test title",
      parent: {
        fullTitle: () => "mocha suite title",
      },
    };
    const context = calculatePaths(mochaTest);

    expect(context).to.eql({
      suiteTitle: "mocha suite title",
      testTitle: "mocha test title",
    });
  });

  it("calculates paths for a vitest test", () => {
    const vitestTest = {
      task: {
        name: "vitest test title",
        suite: {
          name: "vitest suite title",
        },
      },
    };

    const context = calculatePaths(vitestTest);
    expect(context).to.eql({
      suiteTitle: "vitest suite title",
      testTitle: "vitest test title",
    });
  });

  it("calculates paths for a vitest test with nested suites", () => {
    const vitestTest = {
      task: {
        name: "vitest test title",
        suite: {
          name: "vitest suite title",
          suite: {
            name: "toplevel suite",
          },
        },
      },
    };

    const context = calculatePaths(vitestTest);
    expect(context).to.eql({
      suiteTitle: "toplevel suite_vitest suite title",
      testTitle: "vitest test title",
    });
  });
});

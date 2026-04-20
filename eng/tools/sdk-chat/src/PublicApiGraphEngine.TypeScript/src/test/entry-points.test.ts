// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, expect } from "vitest";
import {
  extractExportPaths,
  normalizeCondition,
  getConditionPriority,
} from "../entry-points.js";

describe("extractExportPaths", () => {
  describe("root export resolution", () => {
    it("resolves string exports as root '.' path", () => {
      const result = extractExportPaths("./dist/index.js");
      expect(result).toEqual([
        {
          exportPath: ".",
          condition: "default",
          conditionChain: undefined,
          filePath: "./dist/index.js",
        },
      ]);
    });

    it("resolves '.' key in exports map", () => {
      const result = extractExportPaths({
        ".": { import: "./dist/esm/index.js", require: "./dist/cjs/index.js" },
      });
      expect(result.some((e) => e.exportPath === "." && e.condition === "import")).toBe(true);
      expect(result.some((e) => e.exportPath === "." && e.condition === "require")).toBe(true);
    });

    it("rootOnly=true filters out subpath exports", () => {
      const result = extractExportPaths(
        {
          ".": "./dist/index.js",
          "./models": "./dist/models.js",
        },
        true,
      );
      expect(result.every((e) => e.exportPath === ".")).toBe(true);
      expect(result.length).toBe(1);
    });
  });

  describe("subpath export resolution", () => {
    it("resolves './models' subpath", () => {
      const result = extractExportPaths({
        ".": "./dist/index.js",
        "./models": "./dist/models/index.js",
      });
      const subpath = result.find((e) => e.exportPath === "./models");
      expect(subpath).toBeDefined();
      expect(subpath!.filePath).toBe("./dist/models/index.js");
    });

    it("resolves nested condition maps under subpath", () => {
      const result = extractExportPaths({
        "./models": {
          import: { types: "./dist/models.d.ts", default: "./dist/models.js" },
          require: "./dist/models.cjs",
        },
      });
      const subpaths = result.filter((e) => e.exportPath === "./models");
      expect(subpaths.length).toBeGreaterThanOrEqual(2);
    });
  });

  describe("missing/invalid export shapes", () => {
    it("returns empty array for null exports", () => {
      const result = extractExportPaths(null as unknown as string);
      expect(result).toEqual([]);
    });

    it("returns empty array for undefined exports", () => {
      const result = extractExportPaths(undefined as unknown as string);
      expect(result).toEqual([]);
    });

    it("filters out entries without valid extensions", () => {
      const result = extractExportPaths({
        ".": "./dist/index.json",
      });
      expect(result.length).toBe(0);
    });
  });
});

describe("normalizeCondition", () => {
  it("returns 'default' for empty string", () => {
    expect(normalizeCondition("")).toBe("default");
  });

  it("returns 'default' when chain includes 'default'", () => {
    expect(normalizeCondition("import|default")).toBe("default");
  });

  it("returns non-types condition when 'types' co-occurs with another", () => {
    expect(normalizeCondition("types|import")).toBe("import");
    expect(normalizeCondition("types|browser")).toBe("browser");
  });

  it("returns 'types' when only 'types' is classified", () => {
    expect(normalizeCondition("types")).toBe("types");
  });

  it("returns first classified condition from chain", () => {
    expect(normalizeCondition("import|require")).toBe("import");
  });

  it("returns last element for fully unrecognized chains", () => {
    expect(normalizeCondition("custom|weird")).toBe("weird");
  });
});

describe("getConditionPriority", () => {
  it("returns 0 for 'default'", () => {
    expect(getConditionPriority("default")).toBe(0);
  });

  it("returns ascending priority for node > browser", () => {
    expect(getConditionPriority("node")).toBeLessThan(getConditionPriority("browser"));
  });

  it("returns 100 for unrecognized conditions", () => {
    expect(getConditionPriority("custom-platform")).toBe(100);
  });

  it("import has lower priority than node (more general)", () => {
    expect(getConditionPriority("import")).toBeLessThan(getConditionPriority("node"));
  });
});

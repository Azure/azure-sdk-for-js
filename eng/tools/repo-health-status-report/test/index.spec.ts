// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { PackagesWithStatus, PackageStatus, PipelineResults } from "../src/interfaces.js";

vi.mock("../src/urlHelpers.js", async (importOriginal) => {
  const actual = await importOriginal<typeof import("../src/urlHelpers.js")>();
  return {
    ...actual,
    getBuild: vi.fn(),
    getBuildTimeline: vi.fn(),
  };
});

vi.mock("node:fs/promises", async (importOriginal) => {
  const actual = await importOriginal<typeof import("node:fs/promises")>();
  return {
    ...actual,
    writeFile: vi.fn(),
  };
});

import { writeFile } from "node:fs/promises";
import {
  getBuildResult,
  recordTotalCustomerIssues,
  reportStatus,
  writeToCsv,
} from "../src/index.js";
import { getBuild, getBuildTimeline } from "../src/urlHelpers.js";

const getBuildMock = vi.mocked(getBuild);
const getBuildTimelineMock = vi.mocked(getBuildTimeline);
const writeFileMock = vi.mocked(writeFile);

const buildKinds = [
  { buildKind: "ci", taskKind: "ci", taskName: "Test libraries" },
  { buildKind: "tests", taskKind: "tests", taskName: "Test libraries" },
  {
    buildKind: "weeklyTests",
    taskKind: "weeklyTests",
    taskName: "Integration test libraries",
  },
] as const;

function createPipelines(
  buildKind: (typeof buildKinds)[number]["buildKind"],
): Record<string, PipelineResults> {
  return {
    "@azure/example": {
      [buildKind]: { id: 123 },
    },
  };
}

function createBuildResponse(): Response {
  return new Response(
    JSON.stringify({
      count: 1,
      value: [
        {
          id: 456,
          buildNumber: "20260904.1",
          result: "failed",
          _links: { web: { href: "https://example.test/build/456" } },
        },
      ],
    }),
  );
}

function createPackageStatus(serviceDir: string, label?: string): PackageStatus {
  return {
    projectPath: `sdk/${serviceDir}/example/package.json`,
    serviceDir,
    packageDir: "example",
    status: "GOOD",
    path: `sdk/${serviceDir}/example`,
    label,
    sdkOwned: false,
    lint: { status: "UNKNOWN" },
    tests: { status: "UNKNOWN" },
    samples: { status: "UNKNOWN" },
    ci: { status: "UNKNOWN" },
  };
}

async function runBuild(
  buildKind: (typeof buildKinds)[number]["buildKind"],
  pipelines: Record<string, PipelineResults>,
): Promise<void> {
  const result = getBuildResult(buildKind, "@azure/example", pipelines, "token", 123);
  await vi.advanceTimersByTimeAsync(1000);
  await result;
}

describe("getBuildResult", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.spyOn(console, "log").mockImplementation(() => undefined);
    vi.spyOn(console, "warn").mockImplementation(() => undefined);
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it.each(buildKinds)(
    "records successful $buildKind timeline tasks",
    async ({ buildKind, taskKind, taskName }) => {
      const pipelines = createPipelines(buildKind);
      getBuildMock.mockResolvedValue(createBuildResponse());
      getBuildTimelineMock.mockResolvedValue(
        new Response(JSON.stringify({ records: [{ name: taskName, result: "succeeded" }] })),
      );

      await runBuild(buildKind, pipelines);

      expect(pipelines["@azure/example"][buildKind]?.[taskKind]?.status).toBe("succeeded");
    },
  );

  it.each(buildKinds)(
    "records failed $buildKind timeline tasks",
    async ({ buildKind, taskKind, taskName }) => {
      const pipelines = createPipelines(buildKind);
      getBuildMock.mockResolvedValue(createBuildResponse());
      getBuildTimelineMock.mockResolvedValue(
        new Response(JSON.stringify({ records: [{ name: taskName, result: "failed" }] })),
      );

      await runBuild(buildKind, pipelines);

      expect(pipelines["@azure/example"][buildKind]?.[taskKind]?.status).toBe("failed");
    },
  );

  it.each(buildKinds)(
    "marks only the $buildKind pipeline unknown when its timeline is missing",
    async ({ buildKind, taskKind }) => {
      const pipelines = createPipelines(buildKind);
      getBuildMock.mockResolvedValue(createBuildResponse());
      getBuildTimelineMock.mockResolvedValue(new Response("not found", { status: 404 }));

      await runBuild(buildKind, pipelines);

      expect(pipelines["@azure/example"][buildKind]?.[taskKind]?.status).toBe("UNKNOWN");
    },
  );

  it.each(buildKinds)(
    "marks only the $buildKind pipeline unknown when its timeline is malformed",
    async ({ buildKind, taskKind }) => {
      const pipelines = createPipelines(buildKind);
      getBuildMock.mockResolvedValue(createBuildResponse());
      getBuildTimelineMock.mockResolvedValue(new Response("not json"));

      await runBuild(buildKind, pipelines);

      expect(pipelines["@azure/example"][buildKind]?.[taskKind]?.status).toBe("UNKNOWN");
    },
  );

  it("does not parse a non-JSON build error response", async () => {
    const pipelines = createPipelines("ci");
    const response = new Response("<html>error</html>", { status: 503 });
    const jsonSpy = vi.spyOn(response, "json");
    getBuildMock.mockResolvedValue(response);

    await runBuild("ci", pipelines);

    expect(jsonSpy).not.toHaveBeenCalled();
    expect(pipelines["@azure/example"].ci?.ci?.status).toBe("UNKNOWN");
  });
});

describe("report aggregation", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("blocks a package when its CI lint task fails", () => {
    const packageDetails = createPackageStatus("example");
    const dataplane: PackagesWithStatus = { "@azure/example": packageDetails };
    const pipelines: Record<string, PipelineResults> = {
      "@azure/example": {
        ci: {
          ci: { status: "succeeded" },
          lint: { status: "failed" },
        },
        tests: {
          tests: { status: "succeeded" },
        },
      },
    };

    reportStatus(dataplane, pipelines);

    expect(packageDetails.lint.status).toBe("FAIL");
    expect(packageDetails.status).toBe("BLOCKED");
  });

  it("records issues for every service directory sharing a label", () => {
    const dataplane: PackagesWithStatus = {
      "@azure/first": createPackageStatus("first", "Shared"),
      "@azure/second": createPackageStatus("second", "Shared"),
    };

    recordTotalCustomerIssues(dataplane, [{ labels: ["Shared"] }], {
      Shared: ["first", "second"],
    });

    expect(dataplane["@azure/first"].customerIssues?.num).toBe(1);
    expect(dataplane["@azure/second"].customerIssues?.num).toBe(1);
  });

  it("writes blank pipeline fields when a package has no matching pipeline", async () => {
    const dataplane: PackagesWithStatus = {
      "@azure/example": createPackageStatus("example"),
    };

    await writeToCsv(dataplane, {});

    expect(writeFileMock).toHaveBeenCalledOnce();
    expect(writeFileMock.mock.calls[0][1]).toContain("example,@azure/example,GOOD,NO,,,,,,");
  });
});

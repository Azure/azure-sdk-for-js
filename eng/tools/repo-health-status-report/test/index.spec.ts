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
  recordSlaForIssues,
  recordTotalCustomerIssues,
  reportStatus,
  writeToCsv,
} from "../src/index.js";
import { getDataplanePackages } from "../src/packages.js";
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

function createPackageStatusWithCiBeforeLint(serviceDir: string): PackageStatus {
  return {
    projectPath: `sdk/${serviceDir}/example/package.json`,
    serviceDir,
    packageDir: "example",
    status: "GOOD",
    path: `sdk/${serviceDir}/example`,
    sdkOwned: false,
    tests: { status: "UNKNOWN" },
    samples: { status: "UNKNOWN" },
    ci: { status: "UNKNOWN" },
    lint: { status: "UNKNOWN" },
  };
}

function readCsvRow(csv: string, pkgName: string): Record<string, string> {
  const lines = csv.trim().split("\n");
  const headers = lines[0].split(",");
  const row = lines.find((line) => line.split(",")[1] === pkgName)!.split(",");
  return Object.fromEntries(headers.map((header, i) => [header, row[i] ?? ""]));
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
    getBuildMock.mockClear();
    getBuildTimelineMock.mockClear();
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

  it("records non-federated integration test tasks", async () => {
    const pipelines = createPipelines("tests");
    getBuildMock.mockResolvedValue(createBuildResponse());
    getBuildTimelineMock.mockResolvedValue(
      new Response(
        JSON.stringify({
          records: [{ name: "Integration test libraries", result: "failed" }],
        }),
      ),
    );

    await runBuild("tests", pipelines);

    expect(pipelines["@azure/example"].tests?.tests?.status).toBe("failed");
  });

  it("fetches a shared pipeline only once", async () => {
    const pipelines: Record<string, PipelineResults> = {
      "@azure/first": { ci: { id: 123 } },
      "@azure/second": { ci: { id: 123 } },
    };
    const cache = new Map();
    getBuildMock.mockResolvedValue(createBuildResponse());
    getBuildTimelineMock.mockResolvedValue(
      new Response(JSON.stringify({ records: [{ name: "Test libraries", result: "succeeded" }] })),
    );

    const first = getBuildResult("ci", "@azure/first", pipelines, "token", 123, cache);
    await vi.advanceTimersByTimeAsync(1000);
    await first;
    await getBuildResult("ci", "@azure/second", pipelines, "token", 123, cache);

    expect(getBuildMock).toHaveBeenCalledOnce();
    expect(getBuildTimelineMock).toHaveBeenCalledOnce();
    expect(pipelines["@azure/second"].ci?.ci?.status).toBe("succeeded");
  });

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

  it("does not synthesize a pipeline entry when the pipeline id is missing", async () => {
    const pipelines: Record<string, PipelineResults> = {
      "@azure/example": { ci: { id: 123 } },
    };

    await getBuildResult("tests", "@azure/example", pipelines, "token", undefined);

    expect(pipelines["@azure/example"].tests).toBeUndefined();
    expect(getBuildMock).not.toHaveBeenCalled();
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

  it("prioritizes a failed blocker over an earlier unknown blocker", () => {
    const packageDetails = createPackageStatusWithCiBeforeLint("example");
    const dataplane: PackagesWithStatus = { "@azure/example": packageDetails };
    const pipelines: Record<string, PipelineResults> = {
      "@azure/example": {
        ci: {
          ci: { status: "UNKNOWN" },
          lint: { status: "failed" },
        },
        tests: {
          tests: { status: "succeeded" },
        },
      },
    };

    reportStatus(dataplane, pipelines);

    expect(packageDetails.status).toBe("BLOCKED");
  });

  it("treats a failed build task as failed CI", () => {
    const packageDetails = createPackageStatus("example");
    const dataplane: PackagesWithStatus = { "@azure/example": packageDetails };
    const pipelines: Record<string, PipelineResults> = {
      "@azure/example": {
        ci: {
          build: { status: "failed" },
          ci: { status: "UNKNOWN" },
          lint: { status: "succeeded" },
        },
        tests: {
          tests: { status: "succeeded" },
        },
      },
    };

    reportStatus(dataplane, pipelines);

    expect(packageDetails.ci.status).toBe("FAIL");
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

    writeFileMock.mockClear();
    await writeToCsv(dataplane, {});

    expect(writeFileMock).toHaveBeenCalledOnce();
    const cells = readCsvRow(writeFileMock.mock.calls[0][1] as string, "@azure/example");
    expect(cells["Lint"]).toBe("");
    expect(cells["CI"]).toBe("");
    expect(cells["CI Build Number"]).toBe("");
    expect(cells["Live Tests"]).toBe("");
    expect(cells["Live Tests Build Number"]).toBe("");
  });

  it("appends the new Lint columns last to preserve existing column order", async () => {
    const dataplane: PackagesWithStatus = {
      "@azure/example": createPackageStatus("example"),
    };

    writeFileMock.mockClear();
    await writeToCsv(dataplane, {});

    const header = (writeFileMock.mock.calls[0][1] as string).split("\n")[0].split(",");
    expect(header.slice(-2)).toEqual(["Lint", "Lint Link"]);
    // The build-number columns keep their original positions right after their
    // corresponding link column.
    expect(header[header.indexOf("CI Link") + 1]).toBe("CI Build Number");
    expect(header[header.indexOf("Live Tests Link") + 1]).toBe("Live Tests Build Number");
  });

  it("leaves live-test fields blank when a package has CI but no live-test pipeline", async () => {
    const packageDetails = createPackageStatus("example");
    const dataplane: PackagesWithStatus = { "@azure/example": packageDetails };
    const pipelines: Record<string, PipelineResults> = {
      "@azure/example": { ci: { ci: { status: "succeeded" }, lint: { status: "succeeded" } } },
    };

    // main() calls getTestsResult with an undefined id for the missing live-test
    // pipeline; it must not create pipelines[pkgName].tests.
    await getBuildResult("tests", "@azure/example", pipelines, "token", undefined);
    expect(pipelines["@azure/example"].tests).toBeUndefined();

    reportStatus(dataplane, pipelines);
    // The package's own check is still marked UNKNOWN...
    expect(packageDetails.tests.status).toBe("UNKNOWN");

    writeFileMock.mockClear();
    await writeToCsv(dataplane, pipelines);
    const cells = readCsvRow(writeFileMock.mock.calls[0][1] as string, "@azure/example");
    // ...but the CSV live-test columns (status, link, build number) stay blank,
    // not UNKNOWN.
    expect(cells["Live Tests"]).toBe("");
    expect(cells["Live Tests Link"]).toBe("");
    expect(cells["Live Tests Build Number"]).toBe("");
  });

  it("normalizes the SLA cutoff to UTC midnight so counts match the linked query", () => {
    const packageDetails = createPackageStatus("storage", "Storage");
    const dataplane: PackagesWithStatus = { "@azure/storage-blob": packageDetails };
    const trackedLabels = { Storage: ["storage"] };
    // 30 days before `now` is 2026-08-22T09:04:51Z, whose UTC day starts at
    // 2026-08-22T00:00:00Z. The link truncates the cutoff to 2026-08-22.
    const now = Date.parse("2026-09-21T09:04:51Z");
    const issues = [
      // Created earlier on the cutoff day but after UTC midnight: excluded by the
      // truncated-date link, so it must not be counted.
      { labels: ["question", "Storage"], created_at: "2026-08-22T05:00:00Z" },
      // Created before the cutoff day: counted.
      { labels: ["question", "Storage"], created_at: "2026-08-21T23:00:00Z" },
    ];

    recordSlaForIssues(dataplane, issues, trackedLabels, now);

    expect(packageDetails.sla?.question?.num).toBe(1);
    expect(packageDetails.sla?.question?.link).toContain("created%3A%3C2026-08-22");
  });
});

describe("getDataplanePackages", () => {
  it("excludes private internal packages", async () => {
    const packages = await getDataplanePackages();

    expect(packages).not.toHaveProperty("@azure/storage-internal-avro");
    expect(packages).toHaveProperty("@azure/storage-blob");
  });
});

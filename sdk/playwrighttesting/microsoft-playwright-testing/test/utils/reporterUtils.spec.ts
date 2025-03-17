// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import ReporterUtils from "../../src/utils/reporterUtils.js";
import type { TestResult as MPTTestResult } from "../../src/model/testResult.js";
import type { TestCase, TestResult } from "@playwright/test/reporter";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

describe("Reporter Utils", () => {
  let reporterUtils: ReporterUtils;

  beforeEach(() => {
    const envVariablesMock = {
      runId: "test-run-id",
      runName: "test-run-name",
      shardId: "shard-id",
      accountId: "account-id",
      accessToken: "test-access-token",
      userId: "test-user-id",
      userName: "test-user-name",
      correlationId: "test-correlation-id",
      region: "test-region",
    };
    reporterUtils = new ReporterUtils(envVariablesMock, {} as any, {} as any);
  });

  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("should set browserType to an empty string when browserName is undefined without throwing an error", () => {
    const testMock: TestCase = {
      outcome: () => "expected",
      parent: {
        project: () => ({
          use: {
            browserName: undefined,
            defaultBrowserType: undefined,
          },
        }),
        title: "Test Parent Title",
      },
      location: {
        file: "test-file.ts",
        line: 100,
      },
      id: "test-id",
      title: "Test Case Title",
      retries: 0,
      annotations: [],
    } as any;
    const resultMock: TestResult = {
      retry: 0,
      status: "passed",
      duration: 5000,
      startTime: new Date(),
      attachments: [],
    } as any;
    expect(() => {
      const result: MPTTestResult = reporterUtils.getTestResultObject(
        testMock,
        resultMock,
        "job-name",
      );
      expect(result.webTestConfig.browserType).to.equal("");
    }).not.to.throw();
  });
});

describe("ReporterUtils.getTestError", () => {
  it("should return empty if errors is null", () => {
    const reporterUtils = new ReporterUtils({} as any, {} as any, {} as any);
    const result = reporterUtils["getTestError"]({} as any);
    expect(result).to.equal("");
  });

  it("should return empty if errors list is empty", () => {
    const reporterUtils = new ReporterUtils({} as any, {} as any, {} as any);
    const result = reporterUtils["getTestError"]({ errors: [] } as any);
    expect(result).to.equal("");
  });

  it("should return error message if errors list is not empty (list contains message only)", () => {
    const reporterUtils = new ReporterUtils({} as any, {} as any, {} as any);
    const result = reporterUtils["getTestError"]({
      errors: [{ message: "test-error" }, { message: "test-error - 2" }],
    } as any);
    console.log(result);
    expect(result).to.equal(
      `[\n  {\n    "message": "test-error"\n  },\n  {\n    "message": "test-error - 2"\n  }\n]`,
    );
  });

  it("should return error message if errors list is not empty (list contains message and snippet)", () => {
    const reporterUtils = new ReporterUtils({} as any, {} as any, {} as any);
    const result = reporterUtils["getTestError"]({
      errors: [
        { message: "test-error" },
        { message: "test-error - 2", snippet: "test-snippet" },
        { message: "test-error - 3" },
      ],
    } as any);
    console.log(result);
    expect(result).to.equal(
      `[\n  {\n    "message": "test-error"\n  },\n  {\n    "message": "test-error - 2"\n  },\n  {\n    "message": "test-snippet"\n  },\n  {\n    "message": "test-error - 3"\n  }\n]`,
    );
  });

  it("should return error message if errors list is not empty (list contains message, location snippet)", () => {
    const reporterUtils = new ReporterUtils({} as any, {} as any, {} as any);
    const result = reporterUtils["getTestError"]({
      errors: [
        { message: "test-error" },
        {
          message: "test-error - 2",
          snippet: "test-snippet",
          location: {
            file: "test-file.ts",
            line: 100,
            column: 10,
          },
        },
        { message: "test-error - 3" },
      ],
    } as any);
    console.log(result);
    expect(result).to.equal(
      `[\n  {\n    "message": "test-error"\n  },\n  {\n    "message": "test-error - 2"\n  },\n  {\n    "message": "test-snippet\\n\\nat test-file.ts:100:10"\n  },\n  {\n    "message": "test-error - 3"\n  }\n]`,
    );
  });
});

describe("ReporterUtils.getReadableLineLocation", () => {
  it("should return human readable line location", () => {
    const reporterUtils = new ReporterUtils({} as any, {} as any, {} as any);
    const location = {
      file: "test-file.ts",
      line: 100,
      column: 10,
    };
    const result = reporterUtils["getReadableLineLocation"](location);
    expect(result).to.equal("at test-file.ts:100:10");
  });
});

describe("ReporterUtils.getWorkers", () => {
  it("should returns config.workers if worker info not available in metadata object", () => {
    const reporterUtils = new ReporterUtils(
      {} as any,
      {
        workers: 5,
        metadata: {},
      } as any,
      {} as any,
    );
    const result = reporterUtils["getWorkers"]();
    expect(result).to.equal(5);
  });

  it("should returns config.workers if metadata object is not available", () => {
    const reporterUtils = new ReporterUtils(
      {} as any,
      {
        workers: 5,
      } as any,
      {} as any,
    );
    const result = reporterUtils["getWorkers"]();
    expect(result).to.equal(5);
  });

  it("should returns config.workers if actualWorkers in metadata object is not int", () => {
    const reporterUtils = new ReporterUtils(
      {} as any,
      {
        workers: 5,
        metadata: {
          actualWorkers: "dummy",
        },
      } as any,
      {} as any,
    );
    const result = reporterUtils["getWorkers"]();
    expect(result).to.equal(5);
  });

  it("should returns metadata.actualWorkers if actualWorkers is int and available in metadata object", () => {
    const reporterUtils = new ReporterUtils(
      {} as any,
      {
        workers: 5,
        metadata: {
          actualWorkers: 3,
        },
      } as any,
      {} as any,
    );
    const result = reporterUtils["getWorkers"]();
    expect(result).to.equal(3);
  });
});

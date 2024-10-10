import { expect } from "@azure-tools/test-utils";
import ReporterUtils from "../../src/utils/reporterUtils";
import { TestResult as MPTTestResult } from "../../src/model/testResult";
import { TestCase, TestResult } from "@playwright/test/reporter";

describe("Reporter Utils", () => {
  let reporterUtils: ReporterUtils;
  let environmentVariables: NodeJS.ProcessEnv;

  beforeEach(() => {
    const envVariablesMock = {
      runId: "test-run-id",
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
    process.env = { ...environmentVariables };
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

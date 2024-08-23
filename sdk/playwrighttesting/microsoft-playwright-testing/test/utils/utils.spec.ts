// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  API_VERSION,
  InternalEnvironmentVariables,
  MINIMUM_SUPPORTED_PLAYWRIGHT_VERSION,
  ServiceEnvironmentVariable,
} from "../../src/common/constants";
import * as utils from "../../src/utils/utils";
import {
  getAccessToken,
  getServiceBaseURL,
  getDefaultRunId,
  getServiceWSEndpoint,
  validateServiceUrl,
  validateMptPAT,
  exitWithFailureMessage,
  fetchOrValidateAccessToken,
  emitReportingUrl,
} from "../../src/utils/utils";
import * as EntraIdAccessTokenModule from "../../src/common/entraIdAccessToken";
import sinon from "sinon";
import { expect } from "@azure-tools/test-utils";
import * as packageManager from "../../src/utils/packageManager";

describe("Service Utils", () => {
  let sandbox: sinon.SinonSandbox;

  beforeEach(() => {
    process.env[InternalEnvironmentVariables.MPT_PLAYWRIGHT_VERSION] =
      MINIMUM_SUPPORTED_PLAYWRIGHT_VERSION;
    sandbox = sinon.createSandbox();
    sandbox.stub(console, "error");
    sandbox.stub(console, "log");
  });

  afterEach(() => {
    sandbox.restore();
  });

  it("should return access token set in env variable", () => {
    process.env[ServiceEnvironmentVariable.PLAYWRIGHT_SERVICE_ACCESS_TOKEN] = "test";
    expect(getAccessToken()).to.equal("test");

    delete process.env[ServiceEnvironmentVariable.PLAYWRIGHT_SERVICE_ACCESS_TOKEN];
  });

  it("should return undefined if access token is not set in env variable", () => {
    expect(getAccessToken()).to.be.undefined;
  });

  it("should return service base url set in env variable", () => {
    process.env[ServiceEnvironmentVariable.PLAYWRIGHT_SERVICE_URL] = "test";
    expect(getServiceBaseURL()).to.equal("test");

    delete process.env[ServiceEnvironmentVariable.PLAYWRIGHT_SERVICE_URL];
  });

  it("should return undefined if service base url is not set in env variable", () => {
    expect(getServiceBaseURL()).to.be.undefined;
  });

  it("should return and set run id set in env variable", () => {
    const runId = getDefaultRunId();
    expect(runId).to.be.a("string");
    expect(process.env[ServiceEnvironmentVariable.PLAYWRIGHT_SERVICE_RUN_ID]).to.equal(runId);

    delete process.env[ServiceEnvironmentVariable.PLAYWRIGHT_SERVICE_RUN_ID];
  });

  it("should return service base url with query params", () => {
    process.env[ServiceEnvironmentVariable.PLAYWRIGHT_SERVICE_URL] =
      "wss://eastus.api.playwright.microsoft.com/accounts/1234/browsers";
    const runId = "2021-10-11T07:00:00.000Z";
    const os = "windows";
    const expected = `wss://eastus.api.playwright.microsoft.com/accounts/1234/browsers?runId=${runId}&os=${os}&api-version=${API_VERSION}`;
    expect(getServiceWSEndpoint(runId, os)).to.equal(expected);

    delete process.env[ServiceEnvironmentVariable.PLAYWRIGHT_SERVICE_URL];
  });

  it("should exit with error message if service url is not set", () => {
    process.env[ServiceEnvironmentVariable.PLAYWRIGHT_SERVICE_URL] = "";
    const exitStub = sandbox.stub(process, "exit").callsFake(() => {
      throw new Error();
    });

    expect(() => validateServiceUrl()).to.throw();
    expect(exitStub.calledWith(1)).to.be.true;

    delete process.env[ServiceEnvironmentVariable.PLAYWRIGHT_SERVICE_URL];
  });

  it("should be no-op if service url is set", () => {
    process.env[ServiceEnvironmentVariable.PLAYWRIGHT_SERVICE_URL] = "test";
    const exitStub = sandbox.stub(process, "exit").callsFake(() => {
      throw new Error();
    });

    expect(() => validateServiceUrl()).not.to.throw();
    expect(exitStub.called).to.be.false;

    delete process.env[ServiceEnvironmentVariable.PLAYWRIGHT_SERVICE_URL];
  });

  it("should exit with error message if MPT PAT is not set", () => {
    process.env[ServiceEnvironmentVariable.PLAYWRIGHT_SERVICE_ACCESS_TOKEN] = "";
    const exitStub = sandbox.stub(process, "exit").callsFake(() => {
      throw new Error();
    });

    expect(() => validateMptPAT()).to.throw();
    expect(exitStub.calledWith(1)).to.be.true;

    delete process.env[ServiceEnvironmentVariable.PLAYWRIGHT_SERVICE_ACCESS_TOKEN];
  });

  it("should exit with error message if MPT PAT is not valid", () => {
    process.env[ServiceEnvironmentVariable.PLAYWRIGHT_SERVICE_ACCESS_TOKEN] = "test";
    const exitStub = sandbox.stub(process, "exit").callsFake(() => {
      throw new Error();
    });

    expect(() => validateMptPAT()).to.throw();
    expect(exitStub.calledWith(1)).to.be.true;

    delete process.env[ServiceEnvironmentVariable.PLAYWRIGHT_SERVICE_ACCESS_TOKEN];
  });

  it("should exit with error message if invalid token is set in env variable", () => {
    process.env[ServiceEnvironmentVariable.PLAYWRIGHT_SERVICE_ACCESS_TOKEN] = "test";
    sandbox.stub(utils, "parseJwt").returns({});
    const exitStub = sandbox.stub(process, "exit").callsFake(() => {
      throw new Error();
    });

    expect(() => validateMptPAT()).to.throw();
    expect(exitStub.calledWith(1)).to.be.true;

    delete process.env[ServiceEnvironmentVariable.PLAYWRIGHT_SERVICE_ACCESS_TOKEN];
  });

  it("should exit with error message if MPT PAT is expired", () => {
    process.env[ServiceEnvironmentVariable.PLAYWRIGHT_SERVICE_ACCESS_TOKEN] = "test";
    sandbox.stub(utils, "parseJwt").returns({ exp: Date.now() / 1000 - 10 });
    const exitStub = sandbox.stub(process, "exit").callsFake(() => {
      throw new Error();
    });

    expect(() => validateMptPAT()).to.throw();
    expect(exitStub.calledWith(1)).to.be.true;

    delete process.env[ServiceEnvironmentVariable.PLAYWRIGHT_SERVICE_ACCESS_TOKEN];
  });

  it("should be no-op if MPT PAT is valid", () => {
    process.env[ServiceEnvironmentVariable.PLAYWRIGHT_SERVICE_ACCESS_TOKEN] = "test";
    sandbox.stub(utils, "parseJwt").returns({ exp: Date.now() / 1000 + 10 });

    expect(() => validateMptPAT()).not.to.throw();

    delete process.env[ServiceEnvironmentVariable.PLAYWRIGHT_SERVICE_ACCESS_TOKEN];
  });

  it("should return entra access token (not close to expiry)", async () => {
    const tokenMock = "test";
    process.env[ServiceEnvironmentVariable.PLAYWRIGHT_SERVICE_ACCESS_TOKEN] = tokenMock;
    const entraIdAccessToken = {
      token: tokenMock,
      doesEntraIdAccessTokenNeedRotation: sinon.stub().returns(false),
      fetchEntraIdAccessToken: sinon.stub(),
    };

    sandbox.stub(EntraIdAccessTokenModule, "EntraIdAccessToken").returns(entraIdAccessToken);

    const token = await fetchOrValidateAccessToken();
    expect(entraIdAccessToken.doesEntraIdAccessTokenNeedRotation.called).to.be.true;
    expect(entraIdAccessToken.fetchEntraIdAccessToken.called).to.be.false;

    expect(token).to.equal(tokenMock);

    delete process.env[ServiceEnvironmentVariable.PLAYWRIGHT_SERVICE_ACCESS_TOKEN];
  });

  it("should fetch entra access token if expired", async () => {
    const tokenMock = "test";
    const newTokenMock = "newTest";
    process.env[ServiceEnvironmentVariable.PLAYWRIGHT_SERVICE_ACCESS_TOKEN] = tokenMock;
    const entraIdAccessToken = {
      token: tokenMock,
      doesEntraIdAccessTokenNeedRotation: sinon.stub().returns(true),
      fetchEntraIdAccessToken: sinon.stub().callsFake(() => {
        process.env[ServiceEnvironmentVariable.PLAYWRIGHT_SERVICE_ACCESS_TOKEN] = newTokenMock;
      }),
    };

    sandbox.stub(EntraIdAccessTokenModule, "EntraIdAccessToken").returns(entraIdAccessToken);

    const token = await fetchOrValidateAccessToken();
    expect(entraIdAccessToken.doesEntraIdAccessTokenNeedRotation.called).to.be.true;
    expect(entraIdAccessToken.fetchEntraIdAccessToken.called).to.be.true;

    expect(token).to.equal(newTokenMock);

    delete process.env[ServiceEnvironmentVariable.PLAYWRIGHT_SERVICE_ACCESS_TOKEN];
  });

  it("should fetch entra access token using passed credentials if expired", async () => {
    const tokenMock = "test";
    const newTokenMock = "newTest";
    process.env[ServiceEnvironmentVariable.PLAYWRIGHT_SERVICE_ACCESS_TOKEN] = tokenMock;
    const expiry = Date.now();
    sandbox.stub(utils, "parseJwt").returns({ exp: expiry / 1000 });
    const credential = {
      getToken: sinon.stub().resolves({
        token: newTokenMock,
        expiresOnTimestamp: Date.now() / 1000,
      }),
    };

    const token = await fetchOrValidateAccessToken(credential);

    expect(credential.getToken.called).to.be.true;
    expect(token).to.equal(newTokenMock);

    delete process.env[ServiceEnvironmentVariable.PLAYWRIGHT_SERVICE_ACCESS_TOKEN];
  });

  it("should return mpt pat", async () => {
    const tokenMock = "test";
    process.env[ServiceEnvironmentVariable.PLAYWRIGHT_SERVICE_ACCESS_TOKEN] = tokenMock;
    const entraIdAccessToken = {
      token: "",
      doesEntraIdAccessTokenNeedRotation: sinon.stub().returns(false),
      fetchEntraIdAccessToken: sinon.stub(),
    };

    sandbox.stub(EntraIdAccessTokenModule, "EntraIdAccessToken").returns(entraIdAccessToken);

    const token = await fetchOrValidateAccessToken();
    expect(entraIdAccessToken.doesEntraIdAccessTokenNeedRotation.called).to.be.false;
    expect(entraIdAccessToken.fetchEntraIdAccessToken.called).to.be.false;

    expect(token).to.equal(tokenMock);

    delete process.env[ServiceEnvironmentVariable.PLAYWRIGHT_SERVICE_ACCESS_TOKEN];
  });

  it("should throw error if no auth token is set", async () => {
    process.env[ServiceEnvironmentVariable.PLAYWRIGHT_SERVICE_ACCESS_TOKEN] = "";
    const entraIdAccessToken = {
      token: "",
    };

    sandbox.stub(EntraIdAccessTokenModule, "EntraIdAccessToken").returns(entraIdAccessToken);

    await expect(fetchOrValidateAccessToken()).to.be.rejected;

    delete process.env[ServiceEnvironmentVariable.PLAYWRIGHT_SERVICE_ACCESS_TOKEN];
  });

  it("should print error message and exit", () => {
    sandbox.restore();
    const exitStub = sandbox.stub(process, "exit").callsFake(() => {
      return undefined as never;
    });
    const consoleErrorSpy = sandbox.stub(console, "error");

    exitWithFailureMessage("error message");

    expect(exitStub.called).to.be.true;
    expect(consoleErrorSpy.calledWith("error message")).to.be.true;
  });

  it("should be able to parse and set reporting environment url", () => {
    const testRubrics = [
      {
        serviceUrl:
          "wss://eastus.api.playwright.microsoft.com/accounts/eastus_bd830e63-6120-40cb-8cd7-f0739502d888/browsers",
        reportingUrl: "https://eastus.reporting.api.playwright.microsoft.com",
      },
      {
        serviceUrl:
          "wss://westus.api.playwright.microsoft.com/accounts/cd830e63-6120-40cb-8cd7-f0739502d777/browsers",
        reportingUrl: "https://westus.reporting.api.playwright.microsoft.com",
      },
      {
        serviceUrl:
          "wss://eastus.api.playwright-int.io/accounts/eastus_bd830e63-6120-40cb-8cd7-f0739502d888/browsers",
        reportingUrl: "https://eastus.reporting.api.playwright-int.io",
      },
      {
        serviceUrl:
          "wss://eastasia.api.playwright-test.io/accounts/eastus_bd830e63-6120-40cb-8cd7-f0739502d888/browsers",
        reportingUrl: "https://eastasia.reporting.api.playwright-test.io",
      },
    ];

    testRubrics.forEach(({ serviceUrl, reportingUrl }) => {
      process.env[ServiceEnvironmentVariable.PLAYWRIGHT_SERVICE_URL] = serviceUrl;
      emitReportingUrl();
      expect(process.env[ServiceEnvironmentVariable.PLAYWRIGHT_SERVICE_REPORTING_URL]).to.equal(
        reportingUrl,
      );
      delete process.env[ServiceEnvironmentVariable.PLAYWRIGHT_SERVICE_URL];
    });
  });

  it("should return version info with major only", () => {
    const version = "1";
    const versionInfo = utils.getVersionInfo(version);
    expect(versionInfo.major).to.equal(1);
    expect(versionInfo.minor).to.equal(0);
    expect(versionInfo.patch).to.equal(0);
  });

  it("should return version info with major, minor only", () => {
    const version = "1.47";
    const versionInfo = utils.getVersionInfo(version);
    expect(versionInfo.major).to.equal(1);
    expect(versionInfo.minor).to.equal(47);
    expect(versionInfo.patch).to.equal(0);
  });

  it("should return version info with major, minor and patch", () => {
    const version = "1.47.1";
    const versionInfo = utils.getVersionInfo(version);
    expect(versionInfo.major).to.equal(1);
    expect(versionInfo.minor).to.equal(47);
    expect(versionInfo.patch).to.equal(1);
  });

  it("should remove extra characters from version", () => {
    const version = "1.47.1-beta";
    const versionInfo = utils.getVersionInfo(version);
    expect(versionInfo.major).to.equal(1);
    expect(versionInfo.minor).to.equal(47);
    expect(versionInfo.patch).to.equal(1);
  });

  it("should return version info with empty version", () => {
    const version = "";
    const versionInfo = utils.getVersionInfo(version);
    expect(versionInfo.major).to.equal(0);
    expect(versionInfo.minor).to.equal(0);
    expect(versionInfo.patch).to.equal(0);
  });

  it("should exit with error message if installed version is less than minimum supported version", () => {
    sandbox.stub(utils, "getPlaywrightVersion").returns("1.46.0");
    const exitStub = sandbox.stub(process, "exit").callsFake(() => {
      throw new Error();
    });

    expect(() => utils.validatePlaywrightVersion()).to.throw();
    expect(exitStub.calledWith(1)).to.be.true;
  });

  it("should be no-op if installed version is greater than minimum supported version (patch change)", () => {
    sandbox.stub(utils, "getPlaywrightVersion").returns("1.47.1");
    const exitStub = sandbox.stub(process, "exit").callsFake(() => {
      throw new Error();
    });

    expect(() => utils.validatePlaywrightVersion()).not.to.throw();
    expect(exitStub.called).to.be.false;
  });

  it("should be no-op if installed version is greater than minimum supported version (minor change)", () => {
    sandbox.stub(utils, "getPlaywrightVersion").returns("1.48.0");
    const exitStub = sandbox.stub(process, "exit").callsFake(() => {
      throw new Error();
    });

    expect(() => utils.validatePlaywrightVersion()).not.to.throw();
    expect(exitStub.called).to.be.false;
  });

  it("should be no-op if installed version is greater than minimum supported version (major change)", () => {
    sandbox.stub(utils, "getPlaywrightVersion").returns("2.0.0");
    const exitStub = sandbox.stub(process, "exit").callsFake(() => {
      throw new Error();
    });

    expect(() => utils.validatePlaywrightVersion()).not.to.throw();
    expect(exitStub.called).to.be.false;
  });

  it("should be no-op if installed version is equal to minimum supported version", () => {
    sandbox.stub(utils, "getPlaywrightVersion").returns(MINIMUM_SUPPORTED_PLAYWRIGHT_VERSION);
    const exitStub = sandbox.stub(process, "exit").callsFake(() => {
      throw new Error();
    });

    expect(() => utils.validatePlaywrightVersion()).not.to.throw();
    expect(exitStub.called).to.be.false;
  });

  it("should return playwright version from env variable", () => {
    process.env[InternalEnvironmentVariables.MPT_PLAYWRIGHT_VERSION] = "1.2.0";
    expect(utils.getPlaywrightVersion()).to.equal("1.2.0");
  });

  it("should fetch playwright version and set it in env variable", () => {
    const mockVersion = "1.2.3";
    delete process.env[InternalEnvironmentVariables.MPT_PLAYWRIGHT_VERSION];
    sandbox.stub(packageManager, "getPackageManager").returns({
      runCommand: sinon.stub().returns("echo"),
      getVersionFromStdout: sinon.stub().returns(mockVersion),
    });

    const version = utils.getPlaywrightVersion();
    expect(version).to.equal(mockVersion);
    expect(process.env[InternalEnvironmentVariables.MPT_PLAYWRIGHT_VERSION]).to.equal(mockVersion);
  });
});

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  EntraIdAccessTokenConstants,
  ServiceEnvironmentVariable,
} from "../../src/common/constants";
import * as utils from "../../src/utils/utils";
import { EntraIdAccessToken } from "../../src/common/entraIdAccessToken";
import { expect } from "@azure-tools/test-utils";
import sinon from "sinon";

describe("EntraIdAccessToken", () => {
  let sandbox: sinon.SinonSandbox;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
    sandbox.stub(console, "error");
    sandbox.stub(console, "log");
  });

  afterEach(() => {
    sandbox.restore();
  });

  after(() => {
    sandbox.restore();
  });

  it("should set entra id access token from environment variable on object creation", () => {
    const token = "token";
    const expiry = Date.now();
    process.env[ServiceEnvironmentVariable.PLAYWRIGHT_SERVICE_ACCESS_TOKEN] = token;
    sandbox.stub(utils, "parseJwt").returns({
      exp: expiry / 1000,
    });
    const entraIdAccessToken = new EntraIdAccessToken();
    expect(entraIdAccessToken.token).to.equal(token);
    expect(entraIdAccessToken["_expiryTimestamp"]).to.equal(expiry);
    delete process.env[ServiceEnvironmentVariable.PLAYWRIGHT_SERVICE_ACCESS_TOKEN];
  });

  it("should not set entra id access token if environment variable is empty on object creation", () => {
    const entraIdAccessToken = new EntraIdAccessToken();
    expect(entraIdAccessToken.token).to.be.undefined;
    expect(entraIdAccessToken["_expiryTimestamp"]).to.be.undefined;
  });

  it("should not set entra id access token if mpt pat is set in environment variable on object creation", () => {
    const token = "token";
    process.env[ServiceEnvironmentVariable.PLAYWRIGHT_SERVICE_ACCESS_TOKEN] = token;
    sandbox.stub(utils, "parseJwt").returns({
      aid: "aid",
    });
    const entraIdAccessToken = new EntraIdAccessToken();
    expect(entraIdAccessToken.token).to.be.undefined;
    expect(entraIdAccessToken["_expiryTimestamp"]).to.be.undefined;
    delete process.env[ServiceEnvironmentVariable.PLAYWRIGHT_SERVICE_ACCESS_TOKEN];
  });

  it("should not set entra id access token if mpt back compat pat is set in environment variable on object creation", () => {
    const token = "token";
    process.env[ServiceEnvironmentVariable.PLAYWRIGHT_SERVICE_ACCESS_TOKEN] = token;
    sandbox.stub(utils, "parseJwt").returns({
      accountId: "accountId",
    });
    const entraIdAccessToken = new EntraIdAccessToken();
    expect(entraIdAccessToken.token).to.be.undefined;
    expect(entraIdAccessToken["_expiryTimestamp"]).to.be.undefined;
    delete process.env[ServiceEnvironmentVariable.PLAYWRIGHT_SERVICE_ACCESS_TOKEN];
  });

  it("should not set entra id access token if jwt decode throws error on object creation", () => {
    const token = "token";
    process.env[ServiceEnvironmentVariable.PLAYWRIGHT_SERVICE_ACCESS_TOKEN] = token;
    sandbox.stub(utils, "parseJwt").throws(new Error());
    const entraIdAccessToken = new EntraIdAccessToken();
    expect(entraIdAccessToken.token).to.be.undefined;
    expect(entraIdAccessToken["_expiryTimestamp"]).to.be.undefined;
    delete process.env[ServiceEnvironmentVariable.PLAYWRIGHT_SERVICE_ACCESS_TOKEN];
  });

  it("should fetch and set entra id access token in environment variable", async () => {
    const token = "token";
    const expiry = Date.now();
    const accessToken = {
      token,
      expiresOnTimestamp: expiry,
    };
    const credential = {
      getToken: sinon.stub().resolves(accessToken),
    };
    const entraIdAccessToken = new EntraIdAccessToken(credential);
    const status = await entraIdAccessToken.fetchEntraIdAccessToken();
    expect(entraIdAccessToken.token).to.equal(token);
    expect(entraIdAccessToken["_expiryTimestamp"]).to.equal(expiry);
    expect(process.env[ServiceEnvironmentVariable.PLAYWRIGHT_SERVICE_ACCESS_TOKEN]).to.equal(token);
    expect(status).to.be.true;
    delete process.env[ServiceEnvironmentVariable.PLAYWRIGHT_SERVICE_ACCESS_TOKEN];
  });

  it("should return false if cached access token is returned", async () => {
    const token = "token";
    const accessToken = {
      token,
    };
    const credential = {
      getToken: sinon.stub().resolves(accessToken),
    };
    const entraIdAccessToken = new EntraIdAccessToken(credential);
    entraIdAccessToken.token = token;
    const status = await entraIdAccessToken.fetchEntraIdAccessToken();
    expect(status).to.be.false;
  });

  it("should return false if fetching access token throws error", async () => {
    const credential = {
      getToken: sinon.stub().rejects(new Error()),
    };
    const entraIdAccessToken = new EntraIdAccessToken(credential);
    const status = await entraIdAccessToken.fetchEntraIdAccessToken();
    expect(status).to.be.false;
  });

  it("should return true if entra id access token needs rotation due to no token", () => {
    const entraIdAccessToken = new EntraIdAccessToken();
    const status = entraIdAccessToken.doesEntraIdAccessTokenNeedRotation();
    expect(status).to.be.true;
  });

  it("should return true if entra id access token needs rotation due to expiry", () => {
    const entraIdAccessToken = new EntraIdAccessToken();
    entraIdAccessToken.token = "token";
    entraIdAccessToken["_expiryTimestamp"] =
      Date.now() +
      EntraIdAccessTokenConstants.LIFETIME_LEFT_THRESHOLD_IN_MINUTES_FOR_ROTATION * 60 * 1000 -
      1;
    const status = entraIdAccessToken.doesEntraIdAccessTokenNeedRotation();
    expect(status).to.be.true;
  });

  it("should return false if entra id access token does not need rotation", () => {
    const entraIdAccessToken = new EntraIdAccessToken();
    entraIdAccessToken.token = "token";
    entraIdAccessToken["_expiryTimestamp"] =
      Date.now() +
      EntraIdAccessTokenConstants.LIFETIME_LEFT_THRESHOLD_IN_MINUTES_FOR_ROTATION * 60 * 1000 +
      5000;
    const status = entraIdAccessToken.doesEntraIdAccessTokenNeedRotation();
    expect(status).to.be.false;
  });
});

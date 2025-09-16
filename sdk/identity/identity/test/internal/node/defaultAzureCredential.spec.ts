// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { DefaultAzureCredential } from "@azure/identity";
import { describe, it, expect, vi, afterEach } from "vitest";
import * as createFunctionsDac from "$internal/credentials/defaultAzureCredentialFunctions.js";

describe("DefaultAzureCredential", () => {
  afterEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllEnvs();
    delete process.env.AZURE_TOKEN_CREDENTIALS;
  });

  it("should not throw if requiredEnvVars is an empty array", () => {
    expect(() => new DefaultAzureCredential({ requiredEnvVars: [] })).not.toThrowError();
  });

  it("should create a DefaultAzureCredential instance", () => {
    const credential = new DefaultAzureCredential();
    expect(credential).toBeInstanceOf(DefaultAzureCredential);
  });

  it("should throw an error if AZURE_TOKEN_CREDENTIALS is set to an unsupported value", () => {
    vi.stubEnv("AZURE_TOKEN_CREDENTIALS", "randomValue");
    expect(() => new DefaultAzureCredential()).toThrowError(
      `Invalid value for AZURE_TOKEN_CREDENTIALS = randomValue. Valid values are 'prod' or 'dev' or any of these credentials - EnvironmentCredential, WorkloadIdentityCredential, ManagedIdentityCredential, VisualStudioCodeCredential, AzureCliCredential, AzurePowerShellCredential, AzureDeveloperCliCredential.`,
    );
  });
  it("should not throw an error if AZURE_TOKEN_CREDENTIALS is set to a supported value", () => {
    vi.stubEnv("AZURE_TOKEN_CREDENTIALS", "prod");
    expect(() => new DefaultAzureCredential()).not.toThrowError();
    vi.stubEnv("AZURE_TOKEN_CREDENTIALS", "dev");
    expect(() => new DefaultAzureCredential()).not.toThrowError();
  });

  it("should throw if env var in requiredEnvVars is missing (single)", () => {
    vi.stubEnv("AZURE_TOKEN_CREDENTIALS", undefined);
    expect(
      () => new DefaultAzureCredential({ requiredEnvVars: "AZURE_TOKEN_CREDENTIALS" }),
    ).toThrowError(
      /Required environment variable 'AZURE_TOKEN_CREDENTIALS' for DefaultAzureCredential is not set or empty\./,
    );
  });

  it("should not throw if env var in requiredEnvVars is present (single)", () => {
    vi.stubEnv("AZURE_TOKEN_CREDENTIALS", "ManagedIdentityCredential");
    expect(
      () => new DefaultAzureCredential({ requiredEnvVars: "AZURE_TOKEN_CREDENTIALS" }),
    ).not.toThrowError();
    vi.stubEnv("AZURE_TOKEN_CREDENTIALS", undefined);
  });

  it("should throw if any env vars in requiredEnvVars are missing (array)", () => {
    vi.stubEnv("AZURE_TOKEN_CREDENTIALS", "ManagedIdentityCredential");
    vi.stubEnv("AZURE_CLIENT_ID", undefined);
    expect(
      () =>
        new DefaultAzureCredential({
          requiredEnvVars: ["AZURE_TOKEN_CREDENTIALS", "AZURE_CLIENT_ID"],
        }),
    ).toThrowError(
      /Required environment variable 'AZURE_CLIENT_ID' for DefaultAzureCredential is not set or empty\./,
    );
  });

  it("should throw if multiple env vars in requiredEnvVars are missing (array)", () => {
    vi.stubEnv("AZURE_TOKEN_CREDENTIALS", undefined);
    vi.stubEnv("AZURE_CLIENT_ID", "");
    expect(
      () =>
        new DefaultAzureCredential({
          requiredEnvVars: ["AZURE_TOKEN_CREDENTIALS", "AZURE_CLIENT_ID"],
        }),
    ).toThrowError(
      /Required environment variables 'AZURE_TOKEN_CREDENTIALS, AZURE_CLIENT_ID' for DefaultAzureCredential are not set or empty\./,
    );
  });

  it("should not throw if all env vars in requiredEnvVars are present (array)", () => {
    vi.stubEnv("AZURE_TOKEN_CREDENTIALS", "ManagedIdentityCredential");
    vi.stubEnv("AZURE_CLIENT_ID", "test-client-id");
    expect(
      () =>
        new DefaultAzureCredential({
          requiredEnvVars: ["AZURE_TOKEN_CREDENTIALS", "AZURE_CLIENT_ID"],
        }),
    ).not.toThrowError();
    vi.unstubAllEnvs();
  });
});

describe("create functions", () => {
  afterEach(() => {
    vi.restoreAllMocks();
    delete process.env.AZURE_TOKEN_CREDENTIALS;
  });

  it("calls only createEnvironmentCredential when AZURE_TOKEN_CREDENTIALS is 'EnvironmentCredential'", () => {
    vi.stubEnv("AZURE_TOKEN_CREDENTIALS", "EnvironmentCredential");
    const { envSpy, miSpy, wiSpy, vscSpy, cliSpy, devCliSpy, psSpy } = createFunctionSpies();

    new DefaultAzureCredential();

    expect(envSpy).toHaveBeenCalled();
    expect(miSpy).not.toHaveBeenCalled();
    expect(wiSpy).not.toHaveBeenCalled();
    expect(vscSpy).not.toHaveBeenCalled();
    expect(cliSpy).not.toHaveBeenCalled();
    expect(devCliSpy).not.toHaveBeenCalled();
    expect(psSpy).not.toHaveBeenCalled();
  });

  it("calls only createDefaultManagedIdentityCredential when AZURE_TOKEN_CREDENTIALS is 'ManagedIdentityCredential'", () => {
    vi.stubEnv("AZURE_TOKEN_CREDENTIALS", "ManagedIdentityCredential");
    const { envSpy, miSpy, wiSpy, vscSpy, cliSpy, devCliSpy, psSpy } = createFunctionSpies();
    new DefaultAzureCredential();

    expect(miSpy).toHaveBeenCalled();
    expect(envSpy).not.toHaveBeenCalled();
    expect(wiSpy).not.toHaveBeenCalled();
    expect(vscSpy).not.toHaveBeenCalled();
    expect(cliSpy).not.toHaveBeenCalled();
    expect(devCliSpy).not.toHaveBeenCalled();
    expect(psSpy).not.toHaveBeenCalled();
  });

  it("calls only createDefaultWorkloadIdentityCredential when AZURE_TOKEN_CREDENTIALS is 'WorkloadIdentityCredential'", () => {
    vi.stubEnv("AZURE_TOKEN_CREDENTIALS", "WorkloadIdentityCredential");
    const { envSpy, miSpy, wiSpy, vscSpy, cliSpy, devCliSpy, psSpy } = createFunctionSpies();
    new DefaultAzureCredential();

    expect(wiSpy).toHaveBeenCalled();
    expect(envSpy).not.toHaveBeenCalled();
    expect(miSpy).not.toHaveBeenCalled();
    expect(vscSpy).not.toHaveBeenCalled();
    expect(cliSpy).not.toHaveBeenCalled();
    expect(devCliSpy).not.toHaveBeenCalled();
    expect(psSpy).not.toHaveBeenCalled();
  });

  it("calls only createDefaultVisualStudioCodeCredential when AZURE_TOKEN_CREDENTIALS is 'VisualStudioCodeCredential'", () => {
    vi.stubEnv("AZURE_TOKEN_CREDENTIALS", "VisualStudioCodeCredential");
    const { envSpy, miSpy, wiSpy, vscSpy, cliSpy, devCliSpy, psSpy } = createFunctionSpies();
    new DefaultAzureCredential();

    expect(vscSpy).toHaveBeenCalled();
    expect(envSpy).not.toHaveBeenCalled();
    expect(miSpy).not.toHaveBeenCalled();
    expect(wiSpy).not.toHaveBeenCalled();
    expect(cliSpy).not.toHaveBeenCalled();
    expect(devCliSpy).not.toHaveBeenCalled();
    expect(psSpy).not.toHaveBeenCalled();
  });

  it("calls only createDefaultAzureCliCredential when AZURE_TOKEN_CREDENTIALS is 'AzureCliCredential'", () => {
    vi.stubEnv("AZURE_TOKEN_CREDENTIALS", "AzureCliCredential");
    const { envSpy, miSpy, wiSpy, vscSpy, cliSpy, devCliSpy, psSpy } = createFunctionSpies();
    new DefaultAzureCredential();

    expect(cliSpy).toHaveBeenCalled();
    expect(envSpy).not.toHaveBeenCalled();
    expect(miSpy).not.toHaveBeenCalled();
    expect(wiSpy).not.toHaveBeenCalled();
    expect(vscSpy).not.toHaveBeenCalled();
    expect(devCliSpy).not.toHaveBeenCalled();
    expect(psSpy).not.toHaveBeenCalled();
  });

  it("calls only createDefaultAzurePowershellCredential when AZURE_TOKEN_CREDENTIALS is 'AzurePowerShellCredential'", () => {
    vi.stubEnv("AZURE_TOKEN_CREDENTIALS", "AzurePowerShellCredential");
    const { envSpy, miSpy, wiSpy, vscSpy, cliSpy, devCliSpy, psSpy } = createFunctionSpies();
    new DefaultAzureCredential();

    expect(psSpy).toHaveBeenCalled();
    expect(envSpy).not.toHaveBeenCalled();
    expect(miSpy).not.toHaveBeenCalled();
    expect(wiSpy).not.toHaveBeenCalled();
    expect(vscSpy).not.toHaveBeenCalled();
    expect(cliSpy).not.toHaveBeenCalled();
    expect(devCliSpy).not.toHaveBeenCalled();
  });

  it("calls only createDefaultAzureDeveloperCliCredential when AZURE_TOKEN_CREDENTIALS is 'AzureDeveloperCliCredential'", () => {
    vi.stubEnv("AZURE_TOKEN_CREDENTIALS", "AzureDeveloperCliCredential");
    const { envSpy, miSpy, wiSpy, vscSpy, cliSpy, devCliSpy, psSpy } = createFunctionSpies();
    new DefaultAzureCredential();

    expect(devCliSpy).toHaveBeenCalled();
    expect(envSpy).not.toHaveBeenCalled();
    expect(miSpy).not.toHaveBeenCalled();
    expect(wiSpy).not.toHaveBeenCalled();
    expect(vscSpy).not.toHaveBeenCalled();
    expect(cliSpy).not.toHaveBeenCalled();
    expect(psSpy).not.toHaveBeenCalled();
  });

  it("calls only prod credential functions when AZURE_TOKEN_CREDENTIALS is 'prod'", () => {
    vi.stubEnv("AZURE_TOKEN_CREDENTIALS", "prod");
    const { envSpy, miSpy, wiSpy, vscSpy, cliSpy, devCliSpy, psSpy } = createFunctionSpies();
    new DefaultAzureCredential();

    expect(envSpy).toHaveBeenCalled();
    expect(miSpy).toHaveBeenCalled();
    expect(wiSpy).toHaveBeenCalled();
    expect(vscSpy).not.toHaveBeenCalled();
    expect(cliSpy).not.toHaveBeenCalled();
    expect(devCliSpy).not.toHaveBeenCalled();
    expect(psSpy).not.toHaveBeenCalled();
  });

  it("calls only dev credential functions when AZURE_TOKEN_CREDENTIALS is 'dev'", () => {
    vi.stubEnv("AZURE_TOKEN_CREDENTIALS", "dev");
    const { envSpy, miSpy, wiSpy, vscSpy, cliSpy, devCliSpy, psSpy } = createFunctionSpies();
    new DefaultAzureCredential();

    expect(vscSpy).toHaveBeenCalled();
    expect(cliSpy).toHaveBeenCalled();
    expect(devCliSpy).toHaveBeenCalled();
    expect(psSpy).toHaveBeenCalled();
    expect(envSpy).not.toHaveBeenCalled();
    expect(miSpy).not.toHaveBeenCalled();
    expect(wiSpy).not.toHaveBeenCalled();
  });

  it("handles case-insensitive credential names (lowercase)", () => {
    vi.stubEnv("AZURE_TOKEN_CREDENTIALS", "managedidentitycredential");
    const { envSpy, miSpy, wiSpy, vscSpy, cliSpy, devCliSpy, psSpy } = createFunctionSpies();
    new DefaultAzureCredential();

    expect(miSpy).toHaveBeenCalled();
    expect(envSpy).not.toHaveBeenCalled();
    expect(wiSpy).not.toHaveBeenCalled();
    expect(vscSpy).not.toHaveBeenCalled();
    expect(cliSpy).not.toHaveBeenCalled();
    expect(devCliSpy).not.toHaveBeenCalled();
    expect(psSpy).not.toHaveBeenCalled();
  });

  it("handles case-insensitive credential names (mixed case)", () => {
    vi.stubEnv("AZURE_TOKEN_CREDENTIALS", "AzuReCLIcredential");
    const { envSpy, miSpy, wiSpy, vscSpy, cliSpy, devCliSpy, psSpy } = createFunctionSpies();
    new DefaultAzureCredential();

    expect(cliSpy).toHaveBeenCalled();
    expect(envSpy).not.toHaveBeenCalled();
    expect(miSpy).not.toHaveBeenCalled();
    expect(wiSpy).not.toHaveBeenCalled();
    expect(vscSpy).not.toHaveBeenCalled();
    expect(devCliSpy).not.toHaveBeenCalled();
    expect(psSpy).not.toHaveBeenCalled();
  });

  it("calls all prod and dev create functions when AZURE_TOKEN_CREDENTIALS is not set", () => {
    const { envSpy, miSpy, wiSpy, vscSpy, cliSpy, devCliSpy, psSpy } = createFunctionSpies();
    new DefaultAzureCredential();

    expect(envSpy).toHaveBeenCalled();
    expect(miSpy).toHaveBeenCalled();
    expect(wiSpy).toHaveBeenCalled();
    expect(vscSpy).toHaveBeenCalled();
    expect(cliSpy).toHaveBeenCalled();
    expect(devCliSpy).toHaveBeenCalled();
    expect(psSpy).toHaveBeenCalled();
  });
});

function createFunctionSpies() {
  const envSpy = vi.spyOn(createFunctionsDac, "createDefaultEnvironmentCredential");
  const miSpy = vi.spyOn(createFunctionsDac, "createDefaultManagedIdentityCredential");
  const wiSpy = vi.spyOn(createFunctionsDac, "createDefaultWorkloadIdentityCredential");
  const vscSpy = vi.spyOn(createFunctionsDac, "createDefaultVisualStudioCodeCredential");
  const cliSpy = vi.spyOn(createFunctionsDac, "createDefaultAzureCliCredential");
  const devCliSpy = vi.spyOn(createFunctionsDac, "createDefaultAzureDeveloperCliCredential");
  const psSpy = vi.spyOn(createFunctionsDac, "createDefaultAzurePowershellCredential");
  return { envSpy, miSpy, wiSpy, vscSpy, cliSpy, devCliSpy, psSpy };
}

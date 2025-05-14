// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { DefaultAzureCredential } from "../../../src/index.js";
import { describe, it, expect, vi, afterEach } from "vitest";

describe("DefaultAzureCredential", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should create a DefaultAzureCredential instance", () => {
    const credential = new DefaultAzureCredential();
    expect(credential).toBeInstanceOf(DefaultAzureCredential);
  });
  it("should throw an error if AZURE_TOKEN_CREDENTIALS is set to an unsupported value", () => {
    process.env.AZURE_TOKEN_CREDENTIALS = "randomValue";
    expect(() => new DefaultAzureCredential()).toThrowError(
      "Invalid value for AZURE_TOKEN_CREDENTIALS = randomValue. Valid values are 'prod' or 'dev'."
    );
  });
    it("should not throw an error if AZURE_TOKEN_CREDENTIALS is set to a supported value", () => {
        process.env.AZURE_TOKEN_CREDENTIALS = "prod";
        expect(() => new DefaultAzureCredential()).not.toThrowError();
        process.env.AZURE_TOKEN_CREDENTIALS = "dev";
        expect(() => new DefaultAzureCredential()).not.toThrowError();
    });
}); 

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, expect } from "vitest";
import { SmsClient, ServiceVersion } from "../src/index.js";

describe("API Versioning", () => {
  const connectionString = "endpoint=https://test.communication.azure.com/;accesskey=fake-key";

  describe("SmsClient", () => {
    it("should default to latest API version when none specified", () => {
      const client = new SmsClient(connectionString);
      expect(client.apiVersion).toBe(ServiceVersion.V2026_01_23);
    });

    it("should use specified API version", () => {
      const client = new SmsClient(connectionString, {
        apiVersion: ServiceVersion.V2021_03_07,
      });
      expect(client.apiVersion).toBe(ServiceVersion.V2021_03_07);
    });

    it("should use specified API version with credentials", () => {
      const client = new SmsClient(
        "https://test.communication.azure.com/",
        { key: "fake-key" },
        { apiVersion: ServiceVersion.V2021_03_07 },
      );
      expect(client.apiVersion).toBe(ServiceVersion.V2021_03_07);
    });
  });

  describe("ServiceVersion enum", () => {
    it("should have correct version values", () => {
      expect(ServiceVersion.V2021_03_07).toBe("2021-03-07");
      expect(ServiceVersion.V2026_01_23).toBe("2026-01-23");
    });
  });
});

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { getTestEnvironment } from "./scenario/testEnvironment.js";

describe("Storage Mover test environment", () => {
  beforeEach(() => {
    vi.stubEnv("TEST_MODE", undefined);
    vi.stubEnv("STORAGE_MOVER_TEST_LOCATION", undefined);
    vi.stubEnv("STORAGE_MOVER_PRIVATE_LINK_SERVICE_RESOURCE_GROUP", undefined);
    vi.stubEnv("STORAGE_MOVER_PRIVATE_LINK_SERVICE_NAME", undefined);
  });

  afterEach(() => {
    vi.unstubAllEnvs();
  });

  const defaultEnvironment = {
    location: "eastus",
    c2cLocation: "westcentralus",
    privateLinkServiceResourceGroup: "E2E-Management-RGsyn",
    privateLinkServiceName: "test-pls-wcs",
  };

  it.each(["live", "record", "playback", undefined])(
    "preserves the default configuration in %s mode",
    (mode) => {
      vi.stubEnv("TEST_MODE", mode);
      expect(getTestEnvironment()).toEqual(defaultEnvironment);
    },
  );

  it.each(["live", "record"])("uses infrastructure overrides in %s mode", (mode) => {
    vi.stubEnv("TEST_MODE", mode);
    vi.stubEnv("STORAGE_MOVER_TEST_LOCATION", "centraluseuap");
    vi.stubEnv("STORAGE_MOVER_PRIVATE_LINK_SERVICE_RESOURCE_GROUP", "replacement-rg");
    vi.stubEnv("STORAGE_MOVER_PRIVATE_LINK_SERVICE_NAME", "replacement-pls");

    expect(getTestEnvironment()).toEqual({
      location: "centraluseuap",
      c2cLocation: "centraluseuap",
      privateLinkServiceResourceGroup: "replacement-rg",
      privateLinkServiceName: "replacement-pls",
    });
  });

  it.each(["playback", undefined])("ignores live infrastructure overrides in %s mode", (mode) => {
    vi.stubEnv("TEST_MODE", mode);
    vi.stubEnv("STORAGE_MOVER_TEST_LOCATION", "centraluseuap");
    vi.stubEnv("STORAGE_MOVER_PRIVATE_LINK_SERVICE_RESOURCE_GROUP", "replacement-rg");
    vi.stubEnv("STORAGE_MOVER_PRIVATE_LINK_SERVICE_NAME", "replacement-pls");

    expect(getTestEnvironment()).toEqual(defaultEnvironment);
  });
});

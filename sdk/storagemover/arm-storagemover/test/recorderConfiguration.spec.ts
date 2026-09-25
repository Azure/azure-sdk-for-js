// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Recorder } from "@azure-tools/test-recorder";
import { afterEach, describe, expect, it, vi } from "vitest";
import { setupRecorder } from "./scenario/testHelper.js";

describe("Storage Mover recorder configuration", () => {
  afterEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllEnvs();
  });

  for (const mode of ["record", "playback"]) {
    it(`uses canonical PLS replacements in ${mode} mode`, async (ctx) => {
      vi.stubEnv("TEST_MODE", mode);
      vi.stubEnv("STORAGE_MOVER_PRIVATE_LINK_SERVICE_RESOURCE_GROUP", "replacement-rg");
      vi.stubEnv("STORAGE_MOVER_PRIVATE_LINK_SERVICE_NAME", "replacement-pls");
      const start = vi.spyOn(Recorder.prototype, "start").mockResolvedValue();
      vi.spyOn(Recorder.prototype, "addSanitizers").mockResolvedValue();
      vi.spyOn(Recorder.prototype, "configureClientOptions").mockReturnValue({});

      await setupRecorder(ctx);

      expect(start).toHaveBeenCalledWith(
        expect.objectContaining({
          envSetupForPlayback: expect.objectContaining({
            STORAGE_MOVER_PRIVATE_LINK_SERVICE_RESOURCE_GROUP: "E2E-Management-RGsyn",
            STORAGE_MOVER_PRIVATE_LINK_SERVICE_NAME: "test-pls-wcs",
          }),
        }),
      );
    });
  }
});

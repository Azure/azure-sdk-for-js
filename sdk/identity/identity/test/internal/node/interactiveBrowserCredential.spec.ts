// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/* eslint-disable @typescript-eslint/no-namespace */

import type { InteractiveBrowserCredentialNodeOptions } from "@azure/identity";
import { InteractiveBrowserCredential } from "@azure/identity";
import type { MsalTestCleanup } from "../../node/msalNodeTestSetup.js";
import { msalNodeTestSetup } from "../../node/msalNodeTestSetup.js";
import type { Recorder } from "@azure-tools/test-recorder";
import { env } from "@azure-tools/test-recorder";
import type http from "node:http";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

declare global {
  namespace NodeJS {
    interface Global {
      // eslint-disable-next-line @typescript-eslint/consistent-type-imports
      URL: typeof import("url").URL;
    }
  }
}

vi.mock("open", async () => {
  const original = await vi.importActual("open");
  return {
    ...original,
    default: () => {
      throw new Error("No browsers available on this test.");
    },
  };
});

describe("InteractiveBrowserCredential (internal)", function () {
  let cleanup: MsalTestCleanup;
  let listen: http.Server | undefined;
  let recorder: Recorder;

  beforeEach(async function (ctx) {
    const setup = await msalNodeTestSetup(ctx);
    cleanup = setup.cleanup;
    recorder = setup.recorder;
  });

  afterEach(async function () {
    if (listen) {
      listen.close();
    }
    await cleanup();
  });

  const scope = "https://vault.azure.net/.default";

  it("Throws an expected error if no browser is available", async function () {
    const credential = new InteractiveBrowserCredential(
      recorder.configureClientOptions({
        redirectUri: "http://localhost:8081",
        tenantId: env.AZURE_TENANT_ID,
        clientId: env.AZURE_CLIENT_ID,
      } as InteractiveBrowserCredentialNodeOptions),
    );

    await expect(credential.getToken(scope)).rejects.toThrow("No browsers available on this test.");
  });
});

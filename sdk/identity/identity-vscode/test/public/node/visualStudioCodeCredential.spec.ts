// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Recorder, isRecordMode } from "@azure-tools/test-recorder";
import { VisualStudioCodeCredential } from "@azure/identity";
import { describe, it, assert, vi, beforeEach } from "vitest";

const mockedResponse = [
  {
    account: "AzureCloud",
    password: "refresh_token",
  },
];

// TODO: Enable again once the VisualStudio cache bug is fixed.
describe.skip("VisualStudioCodeCredential", () => {
  let recorder: Recorder;

  beforeEach(async (ctx) => {
    recorder = new Recorder(ctx);
  });

  const scope = "https://graph.microsoft.com/.default";

  it("successfully gets a token", async () => {
    if (!isRecordMode()) {
      // In live CI or playback CI, we need to avoid actually using keytar
      // to try to read the Azure Account state, since it won't be available
      vi.mock("keytar", (importActual) => {
        return {
          ...importActual,
          findCredentials: async () => mockedResponse,
        };
      });
    }

    const cred = new VisualStudioCodeCredential(recorder.configureClientOptions({}));

    const token = await cred.getToken(scope);

    assert.ok(token.expiresOnTimestamp);
    assert.ok(token.token);
  });
});

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CosmosClient } from "../../../../src/index.js";
import { endpoint, skipTestForSignOff, emulatorUnavailable } from "../../common/_testConfig.js";
import { masterKey } from "../../common/_fakeTestSecrets.js";
import { getTestDatabase } from "../../common/TestHelpers.js";
import https from "node:https";
import { describe, it, assert } from "vitest";

describe.skipIf(skipTestForSignOff || emulatorUnavailable)(
  "Validate SSL verification check for emulator #nosignoff",
  () => {
    it("should throw exception", async () => {
      // Temporarily enable TLS verification to test self-signed cert rejection
      const prev = process.env.NODE_TLS_REJECT_UNAUTHORIZED;
      process.env.NODE_TLS_REJECT_UNAUTHORIZED = "1";
      try {
        const client = new CosmosClient({
          endpoint,
          key: masterKey,
          connectionPolicy: { enableBackgroundEndpointRefreshing: false },
        });
        // create database
        await getTestDatabase("ssl verification", client);
      } catch (err: any) {
        // connecting to emulator should throw SSL verification error,
        assert.equal(err.code, "DEPTH_ZERO_SELF_SIGNED_CERT", "client should throw exception");
      } finally {
        process.env.NODE_TLS_REJECT_UNAUTHORIZED = prev;
      }
    });

    it("disable ssl check via agent", async () => {
      const client = new CosmosClient({
        endpoint,
        key: masterKey,
        agent: new https.Agent({
          rejectUnauthorized: false,
        }),
        connectionPolicy: { enableBackgroundEndpointRefreshing: false },
      });

      // create database
      await getTestDatabase("ssl verification", client);
    });
  },
);

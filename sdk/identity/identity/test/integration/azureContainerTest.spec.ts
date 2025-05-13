// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { isLiveMode } from "@azure-tools/test-recorder";
import { describe, it, assert } from "vitest";
import * as http from "node:http";

describe("Azure Container Instance Integration test", function () {
  it("can authenticate using managed identity", async function (ctx) {
    if (!isLiveMode()) {
      ctx.skip();
    }

    const containerIp = process.env.IDENTITY_ACI_IP;
    if (!containerIp) {
      ctx.skip("set IDENTITY_ACI_IP to run this test");
      return;
    }

    console.log(`Container IP: ${containerIp}`);

    return new Promise<void>((resolve, reject) => {
      const req = http.get(`http://${containerIp}`, (res) => {
        console.log(`STATUS: ${res.statusCode}`);

        let responseBody = "";
        res.on("data", (chunk) => {
          responseBody += chunk;
        });

        res.on("end", () => {
          console.log("Receiving response body:", responseBody);
          console.log("Response status code:", res.statusCode);
          assert.strictEqual(
            res.statusCode,
            200,
            `Expected status code 200, got ${res.statusCode}. Response body: ${responseBody}`,
          );

          resolve();
        });
      });

      req.on("error", (error) => {
        console.error("Request error:", error);
        reject(error);
      });

      console.log("Sending request to container");
    });
  });
});

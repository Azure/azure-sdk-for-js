// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, assert } from "vitest";
import { logPolicy } from "../../src/policies/logPolicy.js";
import { createHttpHeaders, createPipelineRequest } from "../../src/index.js";
import type { Debugger } from "../../src/logger/logger.js";

function createTestLogger(): { logger: Debugger; logs: string[] } {
  const logs: string[] = [];
  const logger = ((...args: unknown[]): void => {
    logs.push(args.join(" "));
  }) as unknown as Debugger;
  logger.enabled = true;
  return { logger, logs };
}

describe("logPolicy", function () {
  it("Redacts response headers that are not allowlisted", async function () {
    const { logger, logs } = createTestLogger();
    const policy = logPolicy({ logger });

    const request = createPipelineRequest({ url: "https://example.com" });
    const responseHeaders = createHttpHeaders({
      "set-cookie": "session=secret-cookie",
      "api-key": "secret-api-key",
      "x-ms-returned-secret": "secret-value",
    });

    await policy.sendRequest(request, async (req) => ({
      request: req,
      status: 200,
      headers: responseHeaders,
    }));

    const headersLog = logs.find((log) => log.startsWith("Headers:"));
    assert.isDefined(headersLog);
    assert.notInclude(headersLog!, "secret-cookie");
    assert.notInclude(headersLog!, "secret-api-key");
    assert.notInclude(headersLog!, "secret-value");
    assert.include(headersLog!, "REDACTED");
  });
});

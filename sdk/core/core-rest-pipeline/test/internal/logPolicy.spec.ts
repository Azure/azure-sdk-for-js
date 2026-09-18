// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, assert } from "vitest";
import { logPolicy } from "../../src/policies/logPolicy.js";
import { createHttpHeaders } from "../../src/httpHeaders.js";
import { createPipelineRequest } from "../../src/pipelineRequest.js";
import type { Debugger } from "@azure/logger";

function createTestLogger(): { logger: Debugger; logs: string[] } {
  const logs: string[] = [];
  const logger = ((...args: unknown[]): void => {
    logs.push(args.join(" "));
  }) as unknown as Debugger;
  logger.enabled = true;
  return { logger, logs };
}

describe("logPolicy", function () {
  it("Does not redact the azure-deprecating response header", async function () {
    const { logger, logs } = createTestLogger();
    const policy = logPolicy({ logger });

    const request = createPipelineRequest({ url: "https://example.com" });
    const responseHeaders = createHttpHeaders({
      "azure-deprecating": "This API version will be retired on 2025-01-01",
    });

    await policy.sendRequest(request, async (req) => ({
      request: req,
      status: 200,
      headers: responseHeaders,
    }));

    const headersLog = logs.find((log) => log.startsWith("Headers:"));
    assert.isDefined(headersLog);
    assert.include(headersLog!, "This API version will be retired on 2025-01-01");
    assert.notInclude(headersLog!, "REDACTED");
  });

  it("Still allows user-provided additionalAllowedHeaderNames alongside azure defaults", async function () {
    const { logger, logs } = createTestLogger();
    const policy = logPolicy({
      logger,
      additionalAllowedHeaderNames: ["x-custom-header"],
    });

    const request = createPipelineRequest({ url: "https://example.com" });
    const responseHeaders = createHttpHeaders({
      "azure-deprecating": "This API version will be retired on 2025-01-01",
      "x-custom-header": "custom-value",
      "x-secret-header": "secret-value",
    });

    await policy.sendRequest(request, async (req) => ({
      request: req,
      status: 200,
      headers: responseHeaders,
    }));

    const headersLog = logs.find((log) => log.startsWith("Headers:"));
    assert.isDefined(headersLog);
    assert.include(headersLog!, "This API version will be retired on 2025-01-01");
    assert.include(headersLog!, "custom-value");
    assert.notInclude(headersLog!, "secret-value");
    assert.include(headersLog!, "REDACTED");
  });
});

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { TestProxy } from "./testProxyUtils.ts";
import { isProxyToolActive, startTestProxy } from "./testProxyUtils.ts";
import type { Command as ConcurrentlyCommand } from "concurrently";
import concurrently from "concurrently";
import { createPrinter } from "./printer.ts";

const log = createPrinter("preparing-proxy-tool");

async function shouldRunProxyTool(): Promise<boolean> {
  const mode = process.env.TEST_MODE;
  createPrinter("test-info").info(`===TEST_MODE="${mode}"===`);
  if (mode === "live") {
    return false; // No need to start the proxy tool in the live mode
  } else {
    const isActive = await isProxyToolActive();
    if (isActive) {
      // No need to run a new one if it is already active
      // Especially, CI uses this path
      log.info(
        `Proxy tool seems to be active, not attempting to start the test proxy at http://localhost:${
          process.env.TEST_PROXY_HTTP_PORT ?? 5000
        } & https://localhost:${process.env.TEST_PROXY_HTTPS_PORT ?? 5001}.\n`,
      );
    }
    return !isActive;
  }
}

/**
 * `concurrently(...).result` rejects with an array of close-event objects
 * (not an `Error`) when a command exits non-zero. This turns that value into a
 * readable, actionable message describing which commands failed and their exit
 * codes.
 */
export function summarizeCloseEvents(closeEvents: unknown): string {
  const events = Array.isArray(closeEvents) ? closeEvents : [closeEvents];
  const failed = events
    .filter((e): e is { command?: { command?: string }; exitCode?: string | number } => Boolean(e))
    .filter((e) => e.exitCode !== 0 && e.exitCode !== undefined)
    .map((e) => {
      const name = e.command?.command ?? "command";
      return typeof e.exitCode === "string"
        ? `${name} was killed by signal ${e.exitCode}`
        : `${name} exited with code ${e.exitCode}`;
    });

  if (failed.length > 0) {
    return failed.join("; ");
  }
  // Fallback: nothing matched the expected shape, surface the raw value.
  if (closeEvents instanceof Error) {
    return closeEvents.stack ?? closeEvents.message;
  }
  try {
    return JSON.stringify(closeEvents);
  } catch {
    return String(closeEvents);
  }
}

export async function runTestsWithProxyTool(
  testCommandObj: Partial<ConcurrentlyCommand> & { command: string },
): Promise<boolean> {
  let testProxy: TestProxy | undefined = undefined;
  if (
    await shouldRunProxyTool() // Boolean to figure out if we need to run just the testing command or the test-proxy too
  ) {
    testProxy = await startTestProxy();
  }

  let success = true;
  try {
    await concurrently([testCommandObj]).result;
  } catch (closeEvents: unknown) {
    log.error(`test command failed: ${summarizeCloseEvents(closeEvents)}`);
    success = false;
  }

  if (testProxy) {
    log("Stopping the test proxy");
    await testProxy.stop();
  }

  return success;
}

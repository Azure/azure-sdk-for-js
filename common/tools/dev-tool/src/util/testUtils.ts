// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { isProxyToolActive, startTestProxy, TestProxy } from "./testProxyUtils";
import concurrently, { Command as ConcurrentlyCommand } from "concurrently";
import { createPrinter } from "./printer";

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

export async function runTestsWithProxyTool(
  testCommandObj: Partial<ConcurrentlyCommand> & { command: string },
): Promise<boolean> {
  let testProxy: TestProxy | undefined = undefined;
  if (
    await shouldRunProxyTool() // Boolean to figure out if we need to run just the testing command or the test-proxy too
  ) {
    testProxy = await startTestProxy();
  }

  await concurrently([testCommandObj]).result;

  if (testProxy) {
    log("Stopping the test proxy");
    await testProxy.stop();
  }

  return true;
}

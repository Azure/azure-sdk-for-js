import { isProxyToolActive } from "./testProxyUtils";
import { isTestServerActive } from "./testServerUtils";
import concurrently from "concurrently";
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
        `Proxy tool seems to be active, not attempting to start the test proxy at http://localhost:5000 & https://localhost:5001.\n`
      );
    }
    return !isActive;
  }
}

async function shouldRunTestServer(): Promise<boolean> {
  const isActive = await isTestServerActive();
  if (isActive) {
    // No need to run a new one if it is already active
    // Especially, CI uses this path
    log.info(
      `TestServer seems to be active, not attempting to start the server at http://localhost:3000\n`
    );
  }
  return !isActive;
}

export async function runTestsWithTestServer(
  testCommandObj: concurrently.CommandObj
): Promise<boolean> {
  if (
    await shouldRunTestServer() // Boolean to figure out if we need to run just the mocha command or the testserver too
  ) {
    const testProxyCMD = "dev-tool test-server start";
    const waitForTestServerEndpointCMD = "dev-tool test-server wait-for-testserver-endpoint";
    await concurrently(
      [
        { command: testProxyCMD },
        {
          command: `${waitForTestServerEndpointCMD} && ${testCommandObj.command}`, // Waits for the proxy endpoint to be active and then starts running the tests
          name: testCommandObj.name,
        },
      ],
      {
        killOthers: ["failure", "success"],
        successCondition: "first",
      }
    );
  } else {
    await concurrently([testCommandObj]);
  }
  return true;
}

export async function runTestsWithProxyTool(
  testCommandObj: concurrently.CommandObj
): Promise<boolean> {
  if (
    await shouldRunProxyTool() // Boolean to figure out if we need to run just the mocha command or the test-proxy too
  ) {
    const testProxyStartCMD = "dev-tool test-proxy start";
    const testProxyStopCMD = "dev-tool test-proxy stop";
    const waitForProxyEndpointCMD = "dev-tool test-proxy wait-for-proxy-endpoint";
    await concurrently(
      [
        { command: testProxyStartCMD },
        {
          command: `${waitForProxyEndpointCMD} && ${testCommandObj.command} && ${testProxyStopCMD}`, // Waits for the proxy endpoint to be active and then starts running the tests
          name: testCommandObj.name,
        },
      ],
      {
        killOthers: ["failure", "success"],
        successCondition: "first",
      }
    );
  } else {
    await concurrently([testCommandObj]);
  }
  return true;
}

import { isProxyToolActive } from "./testProxyUtils";
import concurrently, { Command as ConcurrentlyCommand, ConcurrentlyCommandInput, ConcurrentlyOptions } from "concurrently";
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
        `Proxy tool seems to be active, not attempting to start the test proxy at http://localhost:${process.env.TEST_PROXY_HTTP_PORT ?? 5000} & https://localhost:${process.env.TEST_PROXY_HTTPS_PORT ?? 5001}.\n`
      );
    }
    return !isActive;
  }
}

export async function runTestsWithProxyTool(
  testCommandObj: Partial<ConcurrentlyCommand>
): Promise<boolean> {
  const commands: ConcurrentlyCommandInput[] = [];
  let concurrentlyOptions: Partial<ConcurrentlyOptions> | undefined;
  if (
    await shouldRunProxyTool() // Boolean to figure out if we need to run just the mocha command or the test-proxy too
  ) {
    const testProxyStartCMD = "dev-tool test-proxy start";
    const testProxyStopCMD = "dev-tool test-proxy stop";
    const waitForProxyEndpointCMD = "dev-tool test-proxy wait-for-proxy-endpoint";
    commands.push(
      { command: testProxyStartCMD },
      {
        command: `${waitForProxyEndpointCMD} && ${testCommandObj.command} && ${testProxyStopCMD}`, // Waits for the proxy endpoint to be active and then starts running the tests
        name: testCommandObj.name,
      }
    );
    concurrentlyOptions = {
      killOthers: ["failure", "success"],
      successCondition: "first",
    };
  } else {
    commands.push(testCommandObj);
  }

  await concurrently(commands, concurrentlyOptions).result;

  return true;
}

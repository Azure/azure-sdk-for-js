import { isProxyToolActive } from "../../util/testProxyUtils";
import concurrently from "concurrently";

async function shouldRunProxyTool(): Promise<boolean> {
  const mode = process.env.TEST_MODE;
  if (mode === "live") {
    return false; // No need to start the proxy tool in the live mode
  } else {
    try {
      await isProxyToolActive();
      // No need to run a new one if it is already active
      // Especially, CI uses this path
      console.log(
        `Proxy tool seems to be active, not attempting to start the test proxy at http://localhost:5000 & https://localhost:5001.\n`
      );
      return false;
    } catch (error) {
      if ((error as { code: string }).code === "ECONNREFUSED") {
        // Proxy tool is not active, attempt to start the proxy tool now
        return true;
      } else {
        throw error;
      }
    }
  } 
}

export async function runTestsWithProxyTool(
  testProxyCMD: string,
  testCommandObj: concurrently.CommandObj
) {
  if (
    await shouldRunProxyTool() // Boolean to figure out if we need to run just the mocha command or the test-proxy too
  ) {
    await concurrently([{ command: testProxyCMD, name: "test-proxy" }, testCommandObj], {
      killOthers: ["failure", "success"],
      successCondition: "first"
    });
  } else {
    await concurrently([testCommandObj]);
  }
  return true;
}

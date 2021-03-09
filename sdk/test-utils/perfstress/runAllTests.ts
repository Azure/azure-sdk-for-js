import { spawnSync } from "child_process";
import { testClasses } from "./test/declareTests";

function spawn(command: string) {
  const ret = spawnSync(command, { shell: true, stdio: "inherit" });

  if (ret.status !== 0) {
    throw new Error(`${command} failed with exit code ${ret.status}`);
  }
}

// This runs all the perf tests one after the other with the default parameters
testClasses.forEach((testClass) => {
  spawn(`ts-node ./test/index.spec.ts ${testClass.name}`);
});

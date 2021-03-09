import { spawnSync } from "child_process";
import { testsRequiringAdditionalParams, testsWithDefaultParams } from "./test/declareTests";

function spawn(command: string) {
  const ret = spawnSync(command, { shell: true, stdio: "inherit" });

  if (ret.status !== 0) {
    throw new Error(`${command} failed with exit code ${ret.status}`);
  }
}

function runTest(testClassName: string, options: string = "") {
  console.log("\n");
  if (options === "") {
    options = `--warmup 1 --iterations 1 --duration 1`;
  }
  spawn(`ts-node ./test/index.spec.ts ${testClassName} ${options}`);
}

// This runs all the perf tests one after the other with the default parameters
testsWithDefaultParams.forEach((testClass) => {
  runTest(testClass.name);
});

// This runs all the perf tests one after the other with the default parameters
testsRequiringAdditionalParams.forEach((testClass) => {
  let options = "";
  if (testClass.name === "OptionsTest") {
    options = "--req some-string";
  } else if (testClass.name === "PerfStressPolicyTest") {
    options = `--url http://bing.com/`;
  }
  runTest(testClass.name, options);
});

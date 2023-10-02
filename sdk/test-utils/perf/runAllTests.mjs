import { spawnSync } from "child_process";
import { allTests } from "./dist-esm/test/declareTests.js";

function spawn(command) {
  const ret = spawnSync(command, { shell: true, stdio: "inherit" });

  if (ret.status !== 0) {
    throw new Error(`${command} failed with exit code ${ret.status}`);
  }
}

function runTest(testClassName, options = "") {
  console.log("\n");
  spawn(
    `node ./dist-esm/test/index.spec.js ${testClassName} --warmup 0 --iterations 1 --duration 1 ${options}`
  );
}

allTests.forEach(({ testClass, options }) => {
  runTest(testClass.name, options);
});

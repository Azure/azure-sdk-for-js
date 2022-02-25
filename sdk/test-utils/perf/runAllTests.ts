import { spawnSync } from "child_process";
import { allTests } from "./test/declareTests";

function spawn(command: string) {
  const ret = spawnSync(command, { shell: true, stdio: "inherit" });

  if (ret.status !== 0) {
    throw new Error(`${command} failed with exit code ${ret.status}`);
  }
}

function runTest(testClassName: string, options: string = "") {
  console.log("\n");
  spawn(
    `ts-node ./test/index.spec.ts ${testClassName} --warmup 0 --iterations 1 --duration 1 ${options}`
  );
}

allTests.forEach(({ testClass, options }) => {
  runTest(testClass.name, options);
});

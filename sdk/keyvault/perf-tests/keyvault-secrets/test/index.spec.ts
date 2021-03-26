import { PerfStressProgram, selectPerfStressTest } from "@azure/test-utils-perfstress";
import { GetSecretTest, ListSecretsTest } from "./getSecret.spec";

console.log("=== Starting the perfStress test ===");

const perfStressProgram = new PerfStressProgram(
  selectPerfStressTest([GetSecretTest, ListSecretsTest])
);

perfStressProgram.run();

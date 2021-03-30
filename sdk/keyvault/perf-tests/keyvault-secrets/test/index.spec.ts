import { PerfStressProgram, selectPerfStressTest } from "@azure/test-utils-perfstress";
import { GetSecretTest } from "./getSecret.spec";
import { ListSecretsTest } from "./listSecrets.spec";

console.log("=== Starting the perfStress test ===");

const perfStressProgram = new PerfStressProgram(
  selectPerfStressTest([GetSecretTest, ListSecretsTest])
);

perfStressProgram.run();

import { PerfProgram, selectPerfTest } from "@azure/test-utils-perf";
import { GetSecretTest } from "./getSecret.spec";
import { ListSecretsTest } from "./listSecrets.spec";

console.log("=== Starting the perf test ===");

const perfProgram = new PerfProgram(selectPerfTest([GetSecretTest, ListSecretsTest]));

perfProgram.run();

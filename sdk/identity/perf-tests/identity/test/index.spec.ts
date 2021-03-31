import { PerfStressProgram, selectPerfStressTest } from "@azure/test-utils-perfstress";
import { DeviceCodeCredentialPersistenceTest } from "./DeviceCodeCredential/persistence.spec";

console.log("=== Starting the perfStress test ===");

const perfStressProgram = new PerfStressProgram(
  selectPerfStressTest([DeviceCodeCredentialPersistenceTest])
);

perfStressProgram.run();

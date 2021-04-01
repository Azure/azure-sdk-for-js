import { PerfStressProgram, selectPerfStressTest } from "@azure/test-utils-perfstress";
import { ClientSecretCredentialPersistenceTest } from "./ClientSecretCredential/persistence.spec";
import * as dotenv from "dotenv";
dotenv.config();

console.log("=== Starting the perfStress test ===");

const perfStressProgram = new PerfStressProgram(
  selectPerfStressTest([ClientSecretCredentialPersistenceTest])
);

perfStressProgram.run();

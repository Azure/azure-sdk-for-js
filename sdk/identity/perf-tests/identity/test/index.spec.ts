import { ClientSecretCredentialPersistenceTest } from "./ClientSecretCredential/persistence.spec";
import { PerfProgram, selectPerfTest } from "@azure/test-utils-perf";
import * as dotenv from "dotenv";
dotenv.config();

console.log("=== Starting the perf test ===");

const perfProgram = new PerfProgram(selectPerfTest([ClientSecretCredentialPersistenceTest]));

perfProgram.run();

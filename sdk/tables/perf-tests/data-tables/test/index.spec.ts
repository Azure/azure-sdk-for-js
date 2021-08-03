import { PerfStressProgram, selectPerfStressTest } from "@azure/test-utils-perfstress";
import { CreateSimpleEntityTest } from "./createSimpleEntity.spec";

// Expects the .env file at the same level
import * as dotenv from "dotenv";
import { CreateEntityBatchTest } from "./createEntityBatch.spec";
dotenv.config();

console.log("=== Starting the perfStress test ===");

const perfStressProgram = new PerfStressProgram(selectPerfStressTest([CreateSimpleEntityTest, CreateEntityBatchTest]));

perfStressProgram.run();
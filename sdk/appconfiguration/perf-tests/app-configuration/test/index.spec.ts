import { PerfStressProgram, selectPerfStressTest } from "@azure/test-utils-perfstress";

// Expects the .env file at the same level
import * as dotenv from "dotenv";
import { ListSettingsTest } from "./listSettings.spec";
dotenv.config();

console.log("=== Starting the perfStress test ===");

const perfStressProgram = new PerfStressProgram(selectPerfStressTest([ListSettingsTest]));

perfStressProgram.run();

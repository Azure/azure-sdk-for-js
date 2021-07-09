import { PerfStressProgram, selectPerfStressTest } from "@azure/test-utils-perfstress";
import { ListSettingsTest } from "./listSettings.spec";

console.log("=== Starting the perfStress test ===");

const perfStressProgram = new PerfStressProgram(selectPerfStressTest([ListSettingsTest]));

perfStressProgram.run();

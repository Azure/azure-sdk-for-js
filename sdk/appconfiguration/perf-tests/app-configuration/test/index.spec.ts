import { PerfProgram, selectPerfTest } from "@azure/test-utils-perf";
import { ListSettingsTest } from "./listSettings.spec";

console.log("=== Starting the perf test ===");

const perfProgram = new PerfProgram(selectPerfTest([ListSettingsTest]));

perfProgram.run();

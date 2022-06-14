import { createPerfProgram } from "@azure/test-utils-perf";
import { ListSettingsTest } from "./listSettings.spec";

const perfProgram = createPerfProgram(ListSettingsTest);

perfProgram.run();

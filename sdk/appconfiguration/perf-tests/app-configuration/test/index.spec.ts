import { createPerfProgram } from "@azure-tools/test-perf";
import { ListSettingsTest } from "./listSettings.spec.js";
import { describe, it, assert } from "vitest";

const perfProgram = createPerfProgram(ListSettingsTest);

perfProgram.run();

import { createPerfProgram } from "@azure-tools/test-perf";
import { GetCertificateTest } from "./getCertificate.spec.js";
import { describe, it, assert } from "vitest";

const perfProgram = createPerfProgram(GetCertificateTest);

perfProgram.run();

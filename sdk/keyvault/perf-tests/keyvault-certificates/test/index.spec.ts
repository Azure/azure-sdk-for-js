import { createPerfProgram } from "@azure-tools/test-perf";
import { GetCertificateTest } from "./getCertificate.spec";

const perfProgram = createPerfProgram(GetCertificateTest);

perfProgram.run();

import { createPerfProgram } from "@azure/test-utils-perf";
import { GetCertificateTest } from "./getCertificate.spec";

const perfProgram = createPerfProgram(GetCertificateTest);

perfProgram.run();

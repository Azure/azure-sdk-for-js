import { PerfProgram, selectPerfTest } from "@azure/test-utils-perf";
import { GetCertificateTest } from "./getCertificate.spec";

console.log("=== Starting the perf test ===");

const perfProgram = new PerfProgram(selectPerfTest([GetCertificateTest]));

perfProgram.run();

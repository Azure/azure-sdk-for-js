import { PerfStressProgram, selectPerfStressTest } from "@azure/test-utils-perfstress";
import { GetCertificateTest } from "./getCertificate.spec";

console.log("=== Starting the perfStress test ===");

const perfStressProgram = new PerfStressProgram(selectPerfStressTest([GetCertificateTest]));

perfStressProgram.run();

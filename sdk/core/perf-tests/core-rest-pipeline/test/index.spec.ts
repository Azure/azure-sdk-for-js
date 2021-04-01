import { PerfStressProgram, selectPerfStressTest } from "@azure/test-utils-perfstress";
import { BearerTokenAuthenticationPolicyWWWChallenge } from "./bearerTokenAuthenticationPolicy/wwwChallenge.spec";

console.log("=== Starting the perfStress test ===");

const perfStressProgram = new PerfStressProgram(
  selectPerfStressTest([BearerTokenAuthenticationPolicyWWWChallenge])
);

perfStressProgram.run();

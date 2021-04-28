import { PerfStressProgram, selectPerfStressTest } from "@azure/test-utils-perfstress";
import { BearerTokenChallengeAuthenticationPolicyTest } from "./bearerTokenChallengeAuthenticationPolicy/wwwChallenge.spec";

console.log("=== Starting the perfStress test ===");

const perfStressProgram = new PerfStressProgram(
  selectPerfStressTest([BearerTokenChallengeAuthenticationPolicyTest])
);

perfStressProgram.run();

import { PerfStressProgram, selectPerfStressTest } from "@azure/test-utils-perfstress";
import { BearerTokenAuthenticationPolicyChallengeTest } from "./bearerTokenChallengeAuthenticationPolicy/wwwChallenge.spec";

console.log("=== Starting the perfStress test ===");

const perfStressProgram = new PerfStressProgram(
  selectPerfStressTest([BearerTokenAuthenticationPolicyChallengeTest])
);

perfStressProgram.run();

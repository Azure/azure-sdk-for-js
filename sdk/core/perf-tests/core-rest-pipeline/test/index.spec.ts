import { PerfProgram, selectPerfTest } from "@azure/test-utils-perf";
import { BearerTokenAuthenticationPolicyChallengeTest } from "./bearerTokenChallengeAuthenticationPolicy/wwwChallenge.spec";

console.log("=== Starting the perf test ===");

const perfProgram = new PerfProgram(selectPerfTest([BearerTokenAuthenticationPolicyChallengeTest]));

perfProgram.run();

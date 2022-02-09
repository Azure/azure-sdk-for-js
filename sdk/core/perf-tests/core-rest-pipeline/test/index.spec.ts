import { PerfProgram, selectPerfTest } from "@azure/test-utils-perf";
import { BearerTokenAuthenticationPolicyChallengeTest } from "./bearerTokenChallengeAuthenticationPolicy/wwwChallenge.spec";
import { PipelineThroughputTest } from "./throughput.spec";

console.log("=== Starting the perf test ===");

const perfProgram = new PerfProgram(
  selectPerfTest([BearerTokenAuthenticationPolicyChallengeTest, PipelineThroughputTest])
);

perfProgram.run();

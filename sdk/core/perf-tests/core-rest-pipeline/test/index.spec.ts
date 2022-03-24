import { PerfProgram, selectPerfTest } from "@azure/test-utils-perf";
import { BearerTokenAuthenticationPolicyChallengeTest } from "./bearerTokenChallengeAuthenticationPolicy/wwwChallenge.spec";
import { CoreHTTPTest } from "./core-http.spec";
import { CoreRestPipelineTest } from "./core-rest-pipeline.spec";
import { FetchTest } from "./fetch.spec";


console.log("=== Starting the perf test ===");

const perfProgram = new PerfProgram(selectPerfTest([BearerTokenAuthenticationPolicyChallengeTest, CoreHTTPTest, CoreRestPipelineTest, FetchTest]));

perfProgram.run();

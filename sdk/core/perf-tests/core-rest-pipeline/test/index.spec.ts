import { createPerfProgram } from "@azure/test-utils-perf";
import { BearerTokenAuthenticationPolicyChallengeTest } from "./bearerTokenChallengeAuthenticationPolicy/wwwChallenge.spec";

const perfProgram = createPerfProgram(BearerTokenAuthenticationPolicyChallengeTest);

perfProgram.run();

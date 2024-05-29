import { createPerfProgram } from "@azure-tools/test-perf";
import { BearerTokenAuthenticationPolicyChallengeTest } from "./bearerTokenChallengeAuthenticationPolicy/wwwChallenge.spec.js";
import { CoreRestPipelineTest } from "./core-rest-pipeline.spec.js";
import { FetchTest } from "./fetch.spec.js";
import { HttpRequestTest } from "./http-request.spec.js";
import { UndiciRequestTest } from "./undici-request.spec.js";

const perfProgram = createPerfProgram(
  BearerTokenAuthenticationPolicyChallengeTest,
  CoreRestPipelineTest,
  FetchTest,
  HttpRequestTest,
  UndiciRequestTest,
);

perfProgram.run();

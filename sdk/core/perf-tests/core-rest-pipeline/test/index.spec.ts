import { createPerfProgram } from "@azure/test-utils-perf";
import { BearerTokenAuthenticationPolicyChallengeTest } from "./bearerTokenChallengeAuthenticationPolicy/wwwChallenge.spec";
import { CoreHTTPTest } from "./core-http.spec";
import { CoreRestPipelineTest } from "./core-rest-pipeline.spec";
import { FetchTest } from "./fetch.spec";
import { HttpRequestTest } from "./http-request.spec";
import { UndiciRequestTest } from "./undici-request.spec";

const perfProgram = createPerfProgram(
  BearerTokenAuthenticationPolicyChallengeTest,
  CoreHTTPTest,
  CoreRestPipelineTest,
  FetchTest,
  HttpRequestTest,
  UndiciRequestTest
);

perfProgram.run();

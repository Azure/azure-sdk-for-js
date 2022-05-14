import { createPerfProgram } from "@azure/test-utils-perf";
import { BearerTokenAuthenticationPolicyChallengeTest } from "./bearerTokenChallengeAuthenticationPolicy/wwwChallenge.spec";
import { CoreHTTPTest } from "./core-http.spec";
import { CoreRestPipelineTest } from "./core-rest-pipeline.spec";
import { FetchTest } from "./fetch.spec";
import { HttpRequestTest} from "./http-request.spec";
import { UndiciRequestTest} from "./undici-request.spec";
// import { NodeFetchTest } from "./node-fetch.spec";
/* Commenting NodeFetch test because of the following error

// Error [ERR_REQUIRE_ESM]: require() of ES Module /workspaces/azure-sdk-for-js/common/temp/node_modules/.pnpm/node-fetch@3.2.3/node_modules/node-fetch/src/index.js from /workspaces/azure-sdk-for-js/sdk/core/perf-tests/core-rest-pipeline/dist-esm/node-fetch.spec.js not supported.
Instead change the require of index.js in /workspaces/azure - sdk -for-js / sdk / core / perf - tests / core - rest - pipeline / dist - esm / node - fetch.spec.js to a dynamic import() which is available in all CommonJS modules.
    at Object.<anonymous>(/workspaces/azure - sdk -for-js / sdk / core / perf - tests / core - rest - pipeline / dist - esm / node - fetch.spec.js: 7: 46)
    at Object.<anonymous>(/workspaces/azure - sdk -for-js / sdk / core / perf - tests / core - rest - pipeline / dist - esm / index.spec.js: 8: 27) {
  code: 'ERR_REQUIRE_ESM'
}
*/

const perfProgram = createPerfProgram(BearerTokenAuthenticationPolicyChallengeTest, CoreHTTPTest, CoreRestPipelineTest, FetchTest, HttpRequestTest, UndiciRequestTest, /*NodeFetchTest*/);

perfProgram.run();

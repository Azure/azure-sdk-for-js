let nock = require('nock');

module.exports.hash = "4ffd3e67d009b80590ba217bf3c541ab";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .get('/common/discovery/instance')
  .query(true)
  .reply(200, {"tenant_discovery_endpoint":"https://login.microsoftonline.com/88888888-8888-8888-8888-888888888888/v2.0/.well-known/openid-configuration","api-version":"1.1","metadata":[{"preferred_network":"login.microsoftonline.com","preferred_cache":"login.windows.net","aliases":["login.microsoftonline.com","login.windows.net","login.microsoft.com","sts.windows.net"]},{"preferred_network":"login.partner.microsoftonline.cn","preferred_cache":"login.partner.microsoftonline.cn","aliases":["login.partner.microsoftonline.cn","login.chinacloudapi.cn"]},{"preferred_network":"login.microsoftonline.de","preferred_cache":"login.microsoftonline.de","aliases":["login.microsoftonline.de"]},{"preferred_network":"login.microsoftonline.us","preferred_cache":"login.microsoftonline.us","aliases":["login.microsoftonline.us","login.usgovcloudapi.net"]},{"preferred_network":"login-us.microsoftonline.com","preferred_cache":"login-us.microsoftonline.com","aliases":["login-us.microsoftonline.com"]}]}, [
  'Cache-Control',
  'max-age=86400, private',
  'Content-Type',
  'application/json; charset=utf-8',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Access-Control-Allow-Origin',
  '*',
  'Access-Control-Allow-Methods',
  'GET, OPTIONS',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'x-ms-request-id',
  '169f6f2a-c0f1-4690-9296-75e382787c00',
  'x-ms-ests-server',
  '2.1.11829.9 - WUS2 ProdSlices',
  'Set-Cookie',
  'fpc=AgwXPIJQJyxOqlZf_m27S8lz_bg1EgAAAKEmaNgOAAAA; expires=Sun, 25-Jul-2021 19:41:25 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevr1PR00W4NwGiX9uBBtG-sX9w1RUWoDXUY3j7_xDW9GNPdYoFUKXRgYMZ8eu6Hx_ahhVkqIu4bIBh2EsnE0TLh-xfK5tmONcLYp6mnDqs4k0wUpHRQVeuiqkgviN5SOonDF8LOhwHM78KNjnVQ3XNFpqr8yEGqJKgGESKGlv0zTwggAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 25 Jun 2021 19:41:25 GMT',
  'Content-Length',
  '980'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .get('/88888888-8888-8888-8888-888888888888/v2.0/.well-known/openid-configuration')
  .reply(200, {"token_endpoint":"https://login.microsoftonline.com/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token","token_endpoint_auth_methods_supported":["client_secret_post","private_key_jwt","client_secret_basic"],"jwks_uri":"https://login.microsoftonline.com/88888888-8888-8888-8888-888888888888/discovery/v2.0/keys","response_modes_supported":["query","fragment","form_post"],"subject_types_supported":["pairwise"],"id_token_signing_alg_values_supported":["RS256"],"response_types_supported":["code","id_token","code id_token","id_token token"],"scopes_supported":["openid","profile","email","offline_access"],"issuer":"https://login.microsoftonline.com/88888888-8888-8888-8888-888888888888/v2.0","request_uri_parameter_supported":false,"userinfo_endpoint":"https://graph.microsoft.com/oidc/userinfo","authorization_endpoint":"https://login.microsoftonline.com/88888888-8888-8888-8888-888888888888/oauth2/v2.0/authorize","device_authorization_endpoint":"https://login.microsoftonline.com/88888888-8888-8888-8888-888888888888/oauth2/v2.0/devicecode","http_logout_supported":true,"frontchannel_logout_supported":true,"end_session_endpoint":"https://login.microsoftonline.com/88888888-8888-8888-8888-888888888888/oauth2/v2.0/logout","claims_supported":["sub","iss","cloud_instance_name","cloud_instance_host_name","cloud_graph_host_name","msgraph_host","aud","exp","iat","auth_time","acr","nonce","preferred_username","name","tid","ver","at_hash","c_hash","email"],"kerberos_endpoint":"https://login.microsoftonline.com/88888888-8888-8888-8888-888888888888/kerberos","tenant_region_scope":"WW","cloud_instance_name":"microsoftonline.com","cloud_graph_host_name":"graph.windows.net","msgraph_host":"graph.microsoft.com","rbac_url":"https://pas.windows.net"}, [
  'Cache-Control',
  'max-age=86400, private',
  'Content-Type',
  'application/json; charset=utf-8',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Access-Control-Allow-Origin',
  '*',
  'Access-Control-Allow-Methods',
  'GET, OPTIONS',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'x-ms-request-id',
  '5d543b59-2435-4161-9c9e-e923c9b47100',
  'x-ms-ests-server',
  '2.1.11829.9 - EUS ProdSlices',
  'Set-Cookie',
  'fpc=AgwXPIJQJyxOqlZf_m27S8lz_bg1EgAAAKEmaNgOAAAA; expires=Sun, 25-Jul-2021 19:41:25 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrvGbV6IOzm34YGCa9xs7KnEn9UaNyNqA2cFd8Y1B4H_70CCnD6eslLK-OUmjhVBS4IClMqyJIcdqg7TFRQVR0tMuGKtDDSTajLtcVRKET5g4MNz0cEcvS7NE5NHvYyUG2FAW9J_VzX3-lmpIT4f7jSNmkgqzodZXmCE6BX138Nv8gAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 25 Jun 2021 19:41:25 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.1.0&x-client-OS=linux&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=2|771,0|,&x-client-last-telemetry=2|0|||0,0&client-request-id=d26ca79f-1155-4e19-84de-0d6fc23b3e8d&client_secret=azure_client_secret")
  .reply(200, {"token_type":"Bearer","expires_in":86399,"ext_expires_in":86399,"access_token":"access_token"}, [
  'Cache-Control',
  'no-store, no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'x-ms-request-id',
  'c2c46a2d-caf1-495a-b60f-6d2084c17100',
  'x-ms-ests-server',
  '2.1.11829.9 - EUS ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=AgwXPIJQJyxOqlZf_m27S8lz_bg1EgAAAKEmaNgOAAAA; expires=Sun, 25-Jul-2021 19:41:25 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 25 Jun 2021 19:41:25 GMT',
  'Content-Length',
  '1331'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('//text/analytics/v3.1/analyze', {"analysisInput":{"documents":[{"id":"1","text":"I will go to the park."},{"id":"2","text":"Este es un document escrito en Español."},{"id":"3","text":"猫は幸せ"}]},"tasks":{"entityRecognitionTasks":[{"parameters":{"model-version":"latest","stringIndexType":"Utf16CodeUnit"}}],"entityRecognitionPiiTasks":[{"parameters":{"model-version":"latest","stringIndexType":"Utf16CodeUnit"}}],"keyPhraseExtractionTasks":[{"parameters":{"model-version":"latest"}}]}})
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'operation-location',
  'https://endpoint/text/analytics/v3.1/analyze/jobs/9e8820de-bb7d-4838-8560-584c19de1f95',
  'x-envoy-upstream-service-time',
  '258',
  'apim-request-id',
  'd0cf1590-24a2-46ec-b5c1-572a3fe5cf18',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:41:25 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/9e8820de-bb7d-4838-8560-584c19de1f95')
  .query(true)
  .reply(200, {"jobId":"9e8820de-bb7d-4838-8560-584c19de1f95","lastUpdateDateTime":"2021-06-25T19:41:25Z","createdDateTime":"2021-06-25T19:41:25Z","expirationDateTime":"2021-06-26T19:41:25Z","status":"notStarted","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":3,"total":3}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  '6ecbe06f-97c2-4337-a4d2-55d22e264823',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:41:25 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/9e8820de-bb7d-4838-8560-584c19de1f95')
  .query(true)
  .reply(200, {"jobId":"9e8820de-bb7d-4838-8560-584c19de1f95","lastUpdateDateTime":"2021-06-25T19:41:25Z","createdDateTime":"2021-06-25T19:41:25Z","expirationDateTime":"2021-06-26T19:41:25Z","status":"notStarted","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":3,"total":3}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  'bf0d2328-e072-46df-ac3c-b53a0f471ccd',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:41:25 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/9e8820de-bb7d-4838-8560-584c19de1f95')
  .query(true)
  .reply(200, {"jobId":"9e8820de-bb7d-4838-8560-584c19de1f95","lastUpdateDateTime":"2021-06-25T19:41:27Z","createdDateTime":"2021-06-25T19:41:25Z","expirationDateTime":"2021-06-26T19:41:25Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":3,"total":3}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '8',
  'apim-request-id',
  'f1ade6bd-02a8-413b-9c2c-4e280a077a2e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:41:27 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/9e8820de-bb7d-4838-8560-584c19de1f95')
  .query(true)
  .reply(200, {"jobId":"9e8820de-bb7d-4838-8560-584c19de1f95","lastUpdateDateTime":"2021-06-25T19:41:27Z","createdDateTime":"2021-06-25T19:41:25Z","expirationDateTime":"2021-06-26T19:41:25Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":3,"total":3}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '8',
  'apim-request-id',
  '0e650116-85b7-4193-9222-17e1d8fe5230',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:41:29 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/9e8820de-bb7d-4838-8560-584c19de1f95')
  .query(true)
  .reply(200, {"jobId":"9e8820de-bb7d-4838-8560-584c19de1f95","lastUpdateDateTime":"2021-06-25T19:41:27Z","createdDateTime":"2021-06-25T19:41:25Z","expirationDateTime":"2021-06-26T19:41:25Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":3,"total":3}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  '1a4a1f87-7292-4b96-9791-47c9f50802a0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:41:31 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/9e8820de-bb7d-4838-8560-584c19de1f95')
  .query(true)
  .reply(200, {"jobId":"9e8820de-bb7d-4838-8560-584c19de1f95","lastUpdateDateTime":"2021-06-25T19:41:32Z","createdDateTime":"2021-06-25T19:41:25Z","expirationDateTime":"2021-06-26T19:41:25Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":1,"failed":0,"inProgress":2,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2021-06-25T19:41:32.2071115Z","taskName":"NamedEntityRecognition_latest","state":"succeeded","results":{"documents":[{"id":"1","entities":[{"text":"park","category":"Location","offset":17,"length":4,"confidenceScore":0.99}],"warnings":[]},{"id":"2","entities":[{"text":"Español","category":"Skill","offset":31,"length":7,"confidenceScore":0.92}],"warnings":[]},{"id":"3","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-06-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '76',
  'apim-request-id',
  'fd2fc49e-d3be-4012-84e1-04f3c6324aaa',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:41:33 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/9e8820de-bb7d-4838-8560-584c19de1f95')
  .query(true)
  .reply(200, {"jobId":"9e8820de-bb7d-4838-8560-584c19de1f95","lastUpdateDateTime":"2021-06-25T19:41:32Z","createdDateTime":"2021-06-25T19:41:25Z","expirationDateTime":"2021-06-26T19:41:25Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":1,"failed":0,"inProgress":2,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2021-06-25T19:41:32.2071115Z","taskName":"NamedEntityRecognition_latest","state":"succeeded","results":{"documents":[{"id":"1","entities":[{"text":"park","category":"Location","offset":17,"length":4,"confidenceScore":0.99}],"warnings":[]},{"id":"2","entities":[{"text":"Español","category":"Skill","offset":31,"length":7,"confidenceScore":0.92}],"warnings":[]},{"id":"3","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-06-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '62',
  'apim-request-id',
  '1a4d3f16-99da-4655-8ac7-fa037edbecd7',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:41:35 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/9e8820de-bb7d-4838-8560-584c19de1f95')
  .query(true)
  .reply(200, {"jobId":"9e8820de-bb7d-4838-8560-584c19de1f95","lastUpdateDateTime":"2021-06-25T19:41:32Z","createdDateTime":"2021-06-25T19:41:25Z","expirationDateTime":"2021-06-26T19:41:25Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":1,"failed":0,"inProgress":2,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2021-06-25T19:41:32.2071115Z","taskName":"NamedEntityRecognition_latest","state":"succeeded","results":{"documents":[{"id":"1","entities":[{"text":"park","category":"Location","offset":17,"length":4,"confidenceScore":0.99}],"warnings":[]},{"id":"2","entities":[{"text":"Español","category":"Skill","offset":31,"length":7,"confidenceScore":0.92}],"warnings":[]},{"id":"3","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-06-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '64',
  'apim-request-id',
  '4d2af8dd-3a16-48c1-9ac1-f51967dc64dc',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:41:37 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/9e8820de-bb7d-4838-8560-584c19de1f95')
  .query(true)
  .reply(200, {"jobId":"9e8820de-bb7d-4838-8560-584c19de1f95","lastUpdateDateTime":"2021-06-25T19:41:32Z","createdDateTime":"2021-06-25T19:41:25Z","expirationDateTime":"2021-06-26T19:41:25Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":1,"failed":0,"inProgress":2,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2021-06-25T19:41:32.2071115Z","taskName":"NamedEntityRecognition_latest","state":"succeeded","results":{"documents":[{"id":"1","entities":[{"text":"park","category":"Location","offset":17,"length":4,"confidenceScore":0.99}],"warnings":[]},{"id":"2","entities":[{"text":"Español","category":"Skill","offset":31,"length":7,"confidenceScore":0.92}],"warnings":[]},{"id":"3","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-06-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '84',
  'apim-request-id',
  '50bbbba0-f24d-479e-9851-a1bdf285c06b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:41:40 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/9e8820de-bb7d-4838-8560-584c19de1f95')
  .query(true)
  .reply(200, {"jobId":"9e8820de-bb7d-4838-8560-584c19de1f95","lastUpdateDateTime":"2021-06-25T19:41:32Z","createdDateTime":"2021-06-25T19:41:25Z","expirationDateTime":"2021-06-26T19:41:25Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":1,"failed":0,"inProgress":2,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2021-06-25T19:41:32.2071115Z","taskName":"NamedEntityRecognition_latest","state":"succeeded","results":{"documents":[{"id":"1","entities":[{"text":"park","category":"Location","offset":17,"length":4,"confidenceScore":0.99}],"warnings":[]},{"id":"2","entities":[{"text":"Español","category":"Skill","offset":31,"length":7,"confidenceScore":0.92}],"warnings":[]},{"id":"3","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-06-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '64',
  'apim-request-id',
  'ee307fb5-4030-4818-ae1a-d953b9649efa',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:41:42 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/9e8820de-bb7d-4838-8560-584c19de1f95')
  .query(true)
  .reply(200, {"jobId":"9e8820de-bb7d-4838-8560-584c19de1f95","lastUpdateDateTime":"2021-06-25T19:41:44Z","createdDateTime":"2021-06-25T19:41:25Z","expirationDateTime":"2021-06-26T19:41:25Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2021-06-25T19:41:32.2071115Z","taskName":"NamedEntityRecognition_latest","state":"succeeded","results":{"documents":[{"id":"1","entities":[{"text":"park","category":"Location","offset":17,"length":4,"confidenceScore":0.99}],"warnings":[]},{"id":"2","entities":[{"text":"Español","category":"Skill","offset":31,"length":7,"confidenceScore":0.92}],"warnings":[]},{"id":"3","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-06-01"}}],"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-06-25T19:41:44.8119849Z","taskName":"PersonallyIdentifiableInformation_latest","state":"succeeded","results":{"documents":[{"redactedText":"I will go to the park.","id":"1","entities":[],"warnings":[]},{"redactedText":"Este es un document escrito en Español.","id":"2","entities":[],"warnings":[]},{"redactedText":"猫は幸せ","id":"3","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '136',
  'apim-request-id',
  'c32ae35d-8cde-46f4-a4e4-c88d6d361c55',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:41:44 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/9e8820de-bb7d-4838-8560-584c19de1f95')
  .query(true)
  .reply(200, {"jobId":"9e8820de-bb7d-4838-8560-584c19de1f95","lastUpdateDateTime":"2021-06-25T19:41:44Z","createdDateTime":"2021-06-25T19:41:25Z","expirationDateTime":"2021-06-26T19:41:25Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2021-06-25T19:41:32.2071115Z","taskName":"NamedEntityRecognition_latest","state":"succeeded","results":{"documents":[{"id":"1","entities":[{"text":"park","category":"Location","offset":17,"length":4,"confidenceScore":0.99}],"warnings":[]},{"id":"2","entities":[{"text":"Español","category":"Skill","offset":31,"length":7,"confidenceScore":0.92}],"warnings":[]},{"id":"3","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-06-01"}}],"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-06-25T19:41:44.8119849Z","taskName":"PersonallyIdentifiableInformation_latest","state":"succeeded","results":{"documents":[{"redactedText":"I will go to the park.","id":"1","entities":[],"warnings":[]},{"redactedText":"Este es un document escrito en Español.","id":"2","entities":[],"warnings":[]},{"redactedText":"猫は幸せ","id":"3","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '123',
  'apim-request-id',
  '08fbcb78-361f-4633-836a-7dc41bcfb891',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:41:47 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/9e8820de-bb7d-4838-8560-584c19de1f95')
  .query(true)
  .reply(200, {"jobId":"9e8820de-bb7d-4838-8560-584c19de1f95","lastUpdateDateTime":"2021-06-25T19:41:44Z","createdDateTime":"2021-06-25T19:41:25Z","expirationDateTime":"2021-06-26T19:41:25Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2021-06-25T19:41:32.2071115Z","taskName":"NamedEntityRecognition_latest","state":"succeeded","results":{"documents":[{"id":"1","entities":[{"text":"park","category":"Location","offset":17,"length":4,"confidenceScore":0.99}],"warnings":[]},{"id":"2","entities":[{"text":"Español","category":"Skill","offset":31,"length":7,"confidenceScore":0.92}],"warnings":[]},{"id":"3","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-06-01"}}],"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-06-25T19:41:44.8119849Z","taskName":"PersonallyIdentifiableInformation_latest","state":"succeeded","results":{"documents":[{"redactedText":"I will go to the park.","id":"1","entities":[],"warnings":[]},{"redactedText":"Este es un document escrito en Español.","id":"2","entities":[],"warnings":[]},{"redactedText":"猫は幸せ","id":"3","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '120',
  'apim-request-id',
  '137b1245-a980-4827-8000-bb77f931964a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:41:49 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/9e8820de-bb7d-4838-8560-584c19de1f95')
  .query(true)
  .reply(200, {"jobId":"9e8820de-bb7d-4838-8560-584c19de1f95","lastUpdateDateTime":"2021-06-25T19:41:44Z","createdDateTime":"2021-06-25T19:41:25Z","expirationDateTime":"2021-06-26T19:41:25Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2021-06-25T19:41:32.2071115Z","taskName":"NamedEntityRecognition_latest","state":"succeeded","results":{"documents":[{"id":"1","entities":[{"text":"park","category":"Location","offset":17,"length":4,"confidenceScore":0.99}],"warnings":[]},{"id":"2","entities":[{"text":"Español","category":"Skill","offset":31,"length":7,"confidenceScore":0.92}],"warnings":[]},{"id":"3","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-06-01"}}],"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-06-25T19:41:44.8119849Z","taskName":"PersonallyIdentifiableInformation_latest","state":"succeeded","results":{"documents":[{"redactedText":"I will go to the park.","id":"1","entities":[],"warnings":[]},{"redactedText":"Este es un document escrito en Español.","id":"2","entities":[],"warnings":[]},{"redactedText":"猫は幸せ","id":"3","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '123',
  'apim-request-id',
  '4d023281-19cd-4880-bd6a-db06e51719d2',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:41:51 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/9e8820de-bb7d-4838-8560-584c19de1f95')
  .query(true)
  .reply(200, {"jobId":"9e8820de-bb7d-4838-8560-584c19de1f95","lastUpdateDateTime":"2021-06-25T19:41:44Z","createdDateTime":"2021-06-25T19:41:25Z","expirationDateTime":"2021-06-26T19:41:25Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2021-06-25T19:41:32.2071115Z","taskName":"NamedEntityRecognition_latest","state":"succeeded","results":{"documents":[{"id":"1","entities":[{"text":"park","category":"Location","offset":17,"length":4,"confidenceScore":0.99}],"warnings":[]},{"id":"2","entities":[{"text":"Español","category":"Skill","offset":31,"length":7,"confidenceScore":0.92}],"warnings":[]},{"id":"3","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-06-01"}}],"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-06-25T19:41:44.8119849Z","taskName":"PersonallyIdentifiableInformation_latest","state":"succeeded","results":{"documents":[{"redactedText":"I will go to the park.","id":"1","entities":[],"warnings":[]},{"redactedText":"Este es un document escrito en Español.","id":"2","entities":[],"warnings":[]},{"redactedText":"猫は幸せ","id":"3","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '124',
  'apim-request-id',
  '32368be5-ee90-44b9-ab8a-2d5996109506',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:41:53 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/9e8820de-bb7d-4838-8560-584c19de1f95')
  .query(true)
  .reply(200, {"jobId":"9e8820de-bb7d-4838-8560-584c19de1f95","lastUpdateDateTime":"2021-06-25T19:41:44Z","createdDateTime":"2021-06-25T19:41:25Z","expirationDateTime":"2021-06-26T19:41:25Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2021-06-25T19:41:32.2071115Z","taskName":"NamedEntityRecognition_latest","state":"succeeded","results":{"documents":[{"id":"1","entities":[{"text":"park","category":"Location","offset":17,"length":4,"confidenceScore":0.99}],"warnings":[]},{"id":"2","entities":[{"text":"Español","category":"Skill","offset":31,"length":7,"confidenceScore":0.92}],"warnings":[]},{"id":"3","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-06-01"}}],"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-06-25T19:41:44.8119849Z","taskName":"PersonallyIdentifiableInformation_latest","state":"succeeded","results":{"documents":[{"redactedText":"I will go to the park.","id":"1","entities":[],"warnings":[]},{"redactedText":"Este es un document escrito en Español.","id":"2","entities":[],"warnings":[]},{"redactedText":"猫は幸せ","id":"3","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '125',
  'apim-request-id',
  'cca4dd5a-1f5c-4936-9adc-85a2908cec97',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:41:55 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/9e8820de-bb7d-4838-8560-584c19de1f95')
  .query(true)
  .reply(200, {"jobId":"9e8820de-bb7d-4838-8560-584c19de1f95","lastUpdateDateTime":"2021-06-25T19:41:44Z","createdDateTime":"2021-06-25T19:41:25Z","expirationDateTime":"2021-06-26T19:41:25Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2021-06-25T19:41:32.2071115Z","taskName":"NamedEntityRecognition_latest","state":"succeeded","results":{"documents":[{"id":"1","entities":[{"text":"park","category":"Location","offset":17,"length":4,"confidenceScore":0.99}],"warnings":[]},{"id":"2","entities":[{"text":"Español","category":"Skill","offset":31,"length":7,"confidenceScore":0.92}],"warnings":[]},{"id":"3","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-06-01"}}],"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-06-25T19:41:44.8119849Z","taskName":"PersonallyIdentifiableInformation_latest","state":"succeeded","results":{"documents":[{"redactedText":"I will go to the park.","id":"1","entities":[],"warnings":[]},{"redactedText":"Este es un document escrito en Español.","id":"2","entities":[],"warnings":[]},{"redactedText":"猫は幸せ","id":"3","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '171',
  'apim-request-id',
  '958dbc30-6038-4e94-9436-6b6b72c82d4d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:41:57 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/9e8820de-bb7d-4838-8560-584c19de1f95')
  .query(true)
  .reply(200, {"jobId":"9e8820de-bb7d-4838-8560-584c19de1f95","lastUpdateDateTime":"2021-06-25T19:41:44Z","createdDateTime":"2021-06-25T19:41:25Z","expirationDateTime":"2021-06-26T19:41:25Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2021-06-25T19:41:32.2071115Z","taskName":"NamedEntityRecognition_latest","state":"succeeded","results":{"documents":[{"id":"1","entities":[{"text":"park","category":"Location","offset":17,"length":4,"confidenceScore":0.99}],"warnings":[]},{"id":"2","entities":[{"text":"Español","category":"Skill","offset":31,"length":7,"confidenceScore":0.92}],"warnings":[]},{"id":"3","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-06-01"}}],"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-06-25T19:41:44.8119849Z","taskName":"PersonallyIdentifiableInformation_latest","state":"succeeded","results":{"documents":[{"redactedText":"I will go to the park.","id":"1","entities":[],"warnings":[]},{"redactedText":"Este es un document escrito en Español.","id":"2","entities":[],"warnings":[]},{"redactedText":"猫は幸せ","id":"3","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '131',
  'apim-request-id',
  '21589e37-ec30-437c-8359-4cdd8143e42d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:41:59 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/9e8820de-bb7d-4838-8560-584c19de1f95')
  .query(true)
  .reply(200, {"jobId":"9e8820de-bb7d-4838-8560-584c19de1f95","lastUpdateDateTime":"2021-06-25T19:41:44Z","createdDateTime":"2021-06-25T19:41:25Z","expirationDateTime":"2021-06-26T19:41:25Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2021-06-25T19:41:32.2071115Z","taskName":"NamedEntityRecognition_latest","state":"succeeded","results":{"documents":[{"id":"1","entities":[{"text":"park","category":"Location","offset":17,"length":4,"confidenceScore":0.99}],"warnings":[]},{"id":"2","entities":[{"text":"Español","category":"Skill","offset":31,"length":7,"confidenceScore":0.92}],"warnings":[]},{"id":"3","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-06-01"}}],"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-06-25T19:41:44.8119849Z","taskName":"PersonallyIdentifiableInformation_latest","state":"succeeded","results":{"documents":[{"redactedText":"I will go to the park.","id":"1","entities":[],"warnings":[]},{"redactedText":"Este es un document escrito en Español.","id":"2","entities":[],"warnings":[]},{"redactedText":"猫は幸せ","id":"3","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '109',
  'apim-request-id',
  '138e6a2e-9194-464b-98be-6c1668defcf8',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:42:01 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/9e8820de-bb7d-4838-8560-584c19de1f95')
  .query(true)
  .reply(200, {"jobId":"9e8820de-bb7d-4838-8560-584c19de1f95","lastUpdateDateTime":"2021-06-25T19:42:03Z","createdDateTime":"2021-06-25T19:41:25Z","expirationDateTime":"2021-06-26T19:41:25Z","status":"succeeded","errors":[],"displayName":"NA","tasks":{"completed":3,"failed":0,"inProgress":0,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2021-06-25T19:41:32.2071115Z","taskName":"NamedEntityRecognition_latest","state":"succeeded","results":{"documents":[{"id":"1","entities":[{"text":"park","category":"Location","offset":17,"length":4,"confidenceScore":0.99}],"warnings":[]},{"id":"2","entities":[{"text":"Español","category":"Skill","offset":31,"length":7,"confidenceScore":0.92}],"warnings":[]},{"id":"3","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-06-01"}}],"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-06-25T19:41:44.8119849Z","taskName":"PersonallyIdentifiableInformation_latest","state":"succeeded","results":{"documents":[{"redactedText":"I will go to the park.","id":"1","entities":[],"warnings":[]},{"redactedText":"Este es un document escrito en Español.","id":"2","entities":[],"warnings":[]},{"redactedText":"猫は幸せ","id":"3","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-06-25T19:42:03.8234934Z","taskName":"KeyPhraseExtraction_latest","state":"succeeded","results":{"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["Español","document"],"warnings":[]},{"id":"3","keyPhrases":["せ"],"warnings":[]}],"errors":[],"modelVersion":"2021-06-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '173',
  'apim-request-id',
  '8d239abf-6549-451e-9266-9543e13beb78',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:42:04 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/9e8820de-bb7d-4838-8560-584c19de1f95')
  .query(true)
  .reply(200, {"jobId":"9e8820de-bb7d-4838-8560-584c19de1f95","lastUpdateDateTime":"2021-06-25T19:42:03Z","createdDateTime":"2021-06-25T19:41:25Z","expirationDateTime":"2021-06-26T19:41:25Z","status":"succeeded","errors":[],"displayName":"NA","tasks":{"completed":3,"failed":0,"inProgress":0,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2021-06-25T19:41:32.2071115Z","taskName":"NamedEntityRecognition_latest","state":"succeeded","results":{"documents":[{"id":"1","entities":[{"text":"park","category":"Location","offset":17,"length":4,"confidenceScore":0.99}],"warnings":[]},{"id":"2","entities":[{"text":"Español","category":"Skill","offset":31,"length":7,"confidenceScore":0.92}],"warnings":[]},{"id":"3","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-06-01"}}],"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-06-25T19:41:44.8119849Z","taskName":"PersonallyIdentifiableInformation_latest","state":"succeeded","results":{"documents":[{"redactedText":"I will go to the park.","id":"1","entities":[],"warnings":[]},{"redactedText":"Este es un document escrito en Español.","id":"2","entities":[],"warnings":[]},{"redactedText":"猫は幸せ","id":"3","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-06-25T19:42:03.8234934Z","taskName":"KeyPhraseExtraction_latest","state":"succeeded","results":{"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["Español","document"],"warnings":[]},{"id":"3","keyPhrases":["せ"],"warnings":[]}],"errors":[],"modelVersion":"2021-06-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '178',
  'apim-request-id',
  '3d21e9b2-68f6-44af-8734-cf5f3a617c39',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:42:04 GMT'
]);

let nock = require('nock');

module.exports.hash = "555792f3517ec51d7745afe8b6b42f91";

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
  '8fbf650b-4fb0-44ce-b647-c6462cd00500',
  'x-ms-ests-server',
  '2.1.11829.8 - SCUS ProdSlices',
  'Set-Cookie',
  'fpc=AgwXPIJQJyxOqlZf_m27S8lz_bg1EgAAAKEmaNgOAAAA; expires=Sun, 25-Jul-2021 19:41:09 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrxQHchUAZc1BqyXemGUksIZR0W1w2gK5DtgkxWbtkBHaW88_LvEEp-gIiGTXeqEub8_NKGE6W1LpZo9Kq_hpJ9AC3yoY9BiwA0WNsO7nzUHS93prA538HZiutA_VarCQ4Q4UKWwOa7I4W7mIlj7dpIq8V6b9WzDtxvPaKi5a-x8UgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 25 Jun 2021 19:41:09 GMT',
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
  '493aab2b-fb42-40cd-a2d0-93f5fba95a00',
  'x-ms-ests-server',
  '2.1.11829.9 - WUS2 ProdSlices',
  'Set-Cookie',
  'fpc=AgwXPIJQJyxOqlZf_m27S8lz_bg1EgAAAKEmaNgOAAAA; expires=Sun, 25-Jul-2021 19:41:09 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevr6EOxGimCwfh1jp-8Pbja-tXR8puoUMKPxka_-j5vTPZmRzPhjN6Bgou00UjFYQG6tK0RyYqObU5hHL1P-x1IOxrCdsHyAV4OVoeIv7tLrQ2ePPfwilcvw0fiCNnVKMOYCp3MNjan-taK-R4VrGTw7QiD6caOL-Os8VfLLA9aFCsgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 25 Jun 2021 19:41:09 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.1.0&x-client-OS=linux&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=2|771,0|,&x-client-last-telemetry=2|0|||0,0&client-request-id=73e26acc-5d26-4cbd-9fa7-47307009b702&client_secret=azure_client_secret")
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
  'b7dd8c02-11f5-499e-bdfc-a9fd12217500',
  'x-ms-ests-server',
  '2.1.11829.9 - SCUS ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=AgwXPIJQJyxOqlZf_m27S8lz_bg1EgAAAKEmaNgOAAAA; expires=Sun, 25-Jul-2021 19:41:09 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 25 Jun 2021 19:41:09 GMT',
  'Content-Length',
  '1331'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('//text/analytics/v3.1/analyze', {"analysisInput":{"documents":[{"id":"1","text":"I will go to the park.","language":""},{"id":"2","text":"I did not like the hotel we stayed at.","language":""},{"id":"3","text":"The restaurant had really good food."}]},"tasks":{"entityRecognitionTasks":[{"parameters":{"model-version":"latest","stringIndexType":"Utf16CodeUnit"}}],"entityRecognitionPiiTasks":[{"parameters":{"model-version":"latest","stringIndexType":"Utf16CodeUnit"}}],"keyPhraseExtractionTasks":[{"parameters":{"model-version":"latest"}}]}})
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'operation-location',
  'https://endpoint/text/analytics/v3.1/analyze/jobs/fd720dc5-72b2-484e-b3fb-bc8b7d423b3c',
  'x-envoy-upstream-service-time',
  '334',
  'apim-request-id',
  'a294cf86-21b0-49ff-8d70-9f86d4999e69',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:41:08 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/fd720dc5-72b2-484e-b3fb-bc8b7d423b3c')
  .query(true)
  .reply(200, {"jobId":"fd720dc5-72b2-484e-b3fb-bc8b7d423b3c","lastUpdateDateTime":"2021-06-25T19:41:09Z","createdDateTime":"2021-06-25T19:41:09Z","expirationDateTime":"2021-06-26T19:41:09Z","status":"notStarted","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":3,"total":3}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '8',
  'apim-request-id',
  'b49b751d-4d79-45e5-a6ff-4336796d62b0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:41:09 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/fd720dc5-72b2-484e-b3fb-bc8b7d423b3c')
  .query(true)
  .reply(200, {"jobId":"fd720dc5-72b2-484e-b3fb-bc8b7d423b3c","lastUpdateDateTime":"2021-06-25T19:41:09Z","createdDateTime":"2021-06-25T19:41:09Z","expirationDateTime":"2021-06-26T19:41:09Z","status":"notStarted","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":3,"total":3}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '6',
  'apim-request-id',
  '87138c8b-6a57-444a-9f84-13365236b1e4',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:41:09 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/fd720dc5-72b2-484e-b3fb-bc8b7d423b3c')
  .query(true)
  .reply(200, {"jobId":"fd720dc5-72b2-484e-b3fb-bc8b7d423b3c","lastUpdateDateTime":"2021-06-25T19:41:09Z","createdDateTime":"2021-06-25T19:41:09Z","expirationDateTime":"2021-06-26T19:41:09Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":3,"total":3}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  '13eb8e1f-2099-4984-80e0-3fb5ca3406d4',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:41:11 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/fd720dc5-72b2-484e-b3fb-bc8b7d423b3c')
  .query(true)
  .reply(200, {"jobId":"fd720dc5-72b2-484e-b3fb-bc8b7d423b3c","lastUpdateDateTime":"2021-06-25T19:41:09Z","createdDateTime":"2021-06-25T19:41:09Z","expirationDateTime":"2021-06-26T19:41:09Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":3,"total":3}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  '3b9ba745-1c17-4c39-8a86-2c8edac8285a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:41:13 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/fd720dc5-72b2-484e-b3fb-bc8b7d423b3c')
  .query(true)
  .reply(200, {"jobId":"fd720dc5-72b2-484e-b3fb-bc8b7d423b3c","lastUpdateDateTime":"2021-06-25T19:41:15Z","createdDateTime":"2021-06-25T19:41:09Z","expirationDateTime":"2021-06-26T19:41:09Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-06-25T19:41:15.6501009Z","taskName":"KeyPhraseExtraction_latest","state":"succeeded","results":{"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["hotel"],"warnings":[]},{"id":"3","keyPhrases":["good food","restaurant"],"warnings":[]}],"errors":[],"modelVersion":"2021-06-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '2270',
  'apim-request-id',
  '32078881-f8d3-405d-ba18-586e73ac5d66',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:41:17 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/fd720dc5-72b2-484e-b3fb-bc8b7d423b3c')
  .query(true)
  .reply(200, {"jobId":"fd720dc5-72b2-484e-b3fb-bc8b7d423b3c","lastUpdateDateTime":"2021-06-25T19:41:16Z","createdDateTime":"2021-06-25T19:41:09Z","expirationDateTime":"2021-06-26T19:41:09Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-06-25T19:41:16.0067327Z","taskName":"PersonallyIdentifiableInformation_latest","state":"succeeded","results":{"documents":[{"redactedText":"I will go to the park.","id":"1","entities":[],"warnings":[]},{"redactedText":"I did not like the hotel we stayed at.","id":"2","entities":[],"warnings":[]},{"redactedText":"The restaurant had really good food.","id":"3","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-06-25T19:41:15.6501009Z","taskName":"KeyPhraseExtraction_latest","state":"succeeded","results":{"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["hotel"],"warnings":[]},{"id":"3","keyPhrases":["good food","restaurant"],"warnings":[]}],"errors":[],"modelVersion":"2021-06-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '148',
  'apim-request-id',
  '8a0f6b33-927e-4d08-a750-31ebd2beeac7',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:41:19 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/fd720dc5-72b2-484e-b3fb-bc8b7d423b3c')
  .query(true)
  .reply(200, {"jobId":"fd720dc5-72b2-484e-b3fb-bc8b7d423b3c","lastUpdateDateTime":"2021-06-25T19:41:16Z","createdDateTime":"2021-06-25T19:41:09Z","expirationDateTime":"2021-06-26T19:41:09Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-06-25T19:41:16.0067327Z","taskName":"PersonallyIdentifiableInformation_latest","state":"succeeded","results":{"documents":[{"redactedText":"I will go to the park.","id":"1","entities":[],"warnings":[]},{"redactedText":"I did not like the hotel we stayed at.","id":"2","entities":[],"warnings":[]},{"redactedText":"The restaurant had really good food.","id":"3","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-06-25T19:41:15.6501009Z","taskName":"KeyPhraseExtraction_latest","state":"succeeded","results":{"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["hotel"],"warnings":[]},{"id":"3","keyPhrases":["good food","restaurant"],"warnings":[]}],"errors":[],"modelVersion":"2021-06-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '125',
  'apim-request-id',
  '13f89cbd-4bc7-4dad-9418-ccfd05e96b70',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:41:22 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/fd720dc5-72b2-484e-b3fb-bc8b7d423b3c')
  .query(true)
  .reply(200, {"jobId":"fd720dc5-72b2-484e-b3fb-bc8b7d423b3c","lastUpdateDateTime":"2021-06-25T19:41:23Z","createdDateTime":"2021-06-25T19:41:09Z","expirationDateTime":"2021-06-26T19:41:09Z","status":"succeeded","errors":[],"displayName":"NA","tasks":{"completed":3,"failed":0,"inProgress":0,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2021-06-25T19:41:23.5625848Z","taskName":"NamedEntityRecognition_latest","state":"succeeded","results":{"documents":[{"id":"1","entities":[{"text":"park","category":"Location","offset":17,"length":4,"confidenceScore":0.99}],"warnings":[]},{"id":"2","entities":[{"text":"hotel","category":"Location","offset":19,"length":5,"confidenceScore":0.99}],"warnings":[]},{"id":"3","entities":[{"text":"restaurant","category":"Location","subcategory":"Structural","offset":4,"length":10,"confidenceScore":0.97}],"warnings":[]}],"errors":[],"modelVersion":"2021-06-01"}}],"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-06-25T19:41:16.0067327Z","taskName":"PersonallyIdentifiableInformation_latest","state":"succeeded","results":{"documents":[{"redactedText":"I will go to the park.","id":"1","entities":[],"warnings":[]},{"redactedText":"I did not like the hotel we stayed at.","id":"2","entities":[],"warnings":[]},{"redactedText":"The restaurant had really good food.","id":"3","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-06-25T19:41:15.6501009Z","taskName":"KeyPhraseExtraction_latest","state":"succeeded","results":{"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["hotel"],"warnings":[]},{"id":"3","keyPhrases":["good food","restaurant"],"warnings":[]}],"errors":[],"modelVersion":"2021-06-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '166',
  'apim-request-id',
  'e4bf3eaf-ce7c-41e1-9966-2aec7cca8f38',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:41:24 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/fd720dc5-72b2-484e-b3fb-bc8b7d423b3c')
  .query(true)
  .reply(200, {"jobId":"fd720dc5-72b2-484e-b3fb-bc8b7d423b3c","lastUpdateDateTime":"2021-06-25T19:41:23Z","createdDateTime":"2021-06-25T19:41:09Z","expirationDateTime":"2021-06-26T19:41:09Z","status":"succeeded","errors":[],"displayName":"NA","tasks":{"completed":3,"failed":0,"inProgress":0,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2021-06-25T19:41:23.5625848Z","taskName":"NamedEntityRecognition_latest","state":"succeeded","results":{"documents":[{"id":"1","entities":[{"text":"park","category":"Location","offset":17,"length":4,"confidenceScore":0.99}],"warnings":[]},{"id":"2","entities":[{"text":"hotel","category":"Location","offset":19,"length":5,"confidenceScore":0.99}],"warnings":[]},{"id":"3","entities":[{"text":"restaurant","category":"Location","subcategory":"Structural","offset":4,"length":10,"confidenceScore":0.97}],"warnings":[]}],"errors":[],"modelVersion":"2021-06-01"}}],"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-06-25T19:41:16.0067327Z","taskName":"PersonallyIdentifiableInformation_latest","state":"succeeded","results":{"documents":[{"redactedText":"I will go to the park.","id":"1","entities":[],"warnings":[]},{"redactedText":"I did not like the hotel we stayed at.","id":"2","entities":[],"warnings":[]},{"redactedText":"The restaurant had really good food.","id":"3","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-06-25T19:41:15.6501009Z","taskName":"KeyPhraseExtraction_latest","state":"succeeded","results":{"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["hotel"],"warnings":[]},{"id":"3","keyPhrases":["good food","restaurant"],"warnings":[]}],"errors":[],"modelVersion":"2021-06-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '199',
  'apim-request-id',
  '450504af-4028-4220-8806-c2052add5e35',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:41:25 GMT'
]);

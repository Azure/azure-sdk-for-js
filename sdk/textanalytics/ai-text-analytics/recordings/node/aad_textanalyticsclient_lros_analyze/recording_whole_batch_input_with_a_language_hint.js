let nock = require('nock');

module.exports.hash = "2e01dd09ebeb83e660674d8d33267c10";

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
  '76e112b9-8b1e-4440-b270-0d456899ad01',
  'x-ms-ests-server',
  '2.1.11654.16 - WUS2 ProdSlices',
  'Set-Cookie',
  'fpc=Au8MJrNuQyZHoLASLJ-TetBz_bg1DgAAACnFG9gOAAAA; expires=Fri, 28-May-2021 21:10:47 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrimiBhcKv891zr3_rbQ-AKnowpjjB6S5Z2gzAARIEcWOKzCwwk_6pDbne2XGh5esOthnDSZ4WnhoRJtkSoVOZ5cmAgV24RF4R96RqmvDooIOZnHG_Z1O6MfJmSpnP5OejqwRGQGJy2AM1I0PeWOQ721ir0m6pk-yehzZQeIhOc3MgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 28 Apr 2021 21:10:46 GMT',
  'Content-Length',
  '980'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .get('/88888888-8888-8888-8888-888888888888/v2.0/.well-known/openid-configuration')
  .reply(200, {"token_endpoint":"https://login.microsoftonline.com/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token","token_endpoint_auth_methods_supported":["client_secret_post","private_key_jwt","client_secret_basic"],"jwks_uri":"https://login.microsoftonline.com/88888888-8888-8888-8888-888888888888/discovery/v2.0/keys","response_modes_supported":["query","fragment","form_post"],"subject_types_supported":["pairwise"],"id_token_signing_alg_values_supported":["RS256"],"response_types_supported":["code","id_token","code id_token","id_token token"],"scopes_supported":["openid","profile","email","offline_access"],"issuer":"https://login.microsoftonline.com/88888888-8888-8888-8888-888888888888/v2.0","request_uri_parameter_supported":false,"userinfo_endpoint":"https://graph.microsoft.com/oidc/userinfo","authorization_endpoint":"https://login.microsoftonline.com/88888888-8888-8888-8888-888888888888/oauth2/v2.0/authorize","device_authorization_endpoint":"https://login.microsoftonline.com/88888888-8888-8888-8888-888888888888/oauth2/v2.0/devicecode","http_logout_supported":true,"frontchannel_logout_supported":true,"end_session_endpoint":"https://login.microsoftonline.com/88888888-8888-8888-8888-888888888888/oauth2/v2.0/logout","claims_supported":["sub","iss","cloud_instance_name","cloud_instance_host_name","cloud_graph_host_name","msgraph_host","aud","exp","iat","auth_time","acr","nonce","preferred_username","name","tid","ver","at_hash","c_hash","email"],"tenant_region_scope":"WW","cloud_instance_name":"microsoftonline.com","cloud_graph_host_name":"graph.windows.net","msgraph_host":"graph.microsoft.com","rbac_url":"https://pas.windows.net"}, [
  'Cache-Control',
  'max-age=86400, private',
  'Content-Length',
  '1651',
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
  '420cebe6-e414-4cc7-bd16-9eedf816df00',
  'x-ms-ests-server',
  '2.1.11654.16 - WUS2 ProdSlices',
  'Set-Cookie',
  'fpc=Au8MJrNuQyZHoLASLJ-TetBz_bg1DgAAACnFG9gOAAAA; expires=Fri, 28-May-2021 21:10:47 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevriAjiAYL_4iXEnfIBRQ7VavqHv7W3iSLL6l_Q2-ugjKuGV4wqOt34ctOb4cHxqOLsOlxQFzeH3nyKwAluZlOukqj5NRDd-yNZV-ElhSJEt3_epFcFge45AlOs2jlDeIoitBd8AK7_meRmcdXqGL2IlEaDCzAmE5rxP9un51izVm0gAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 28 Apr 2021 21:10:46 GMT'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .filteringRequestBody(function (body) {
            return body.replace(/client-request-id=[^&]*/g, "client-request-id=client-request-id");
        })
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fcognitiveservices.azure.com%2F.default%20openid%20profile%20offline_access&grant_type=client_credentials&client-request-id=client-request-id&client_secret=azure_client_secret")
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
  '30ce2827-5a47-4b81-ab01-115e98723701',
  'x-ms-ests-server',
  '2.1.11654.16 - SCUS ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=Au8MJrNuQyZHoLASLJ-TetBz_bg1DgAAACnFG9gOAAAA; expires=Fri, 28-May-2021 21:10:47 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 28 Apr 2021 21:10:46 GMT',
  'Content-Length',
  '1331'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/text/analytics/v3.1-preview.4/analyze', {"tasks":{"entityRecognitionTasks":[{"parameters":{"model-version":"latest","stringIndexType":"Utf16CodeUnit"}}],"entityRecognitionPiiTasks":[{"parameters":{"model-version":"latest","stringIndexType":"Utf16CodeUnit"}}],"keyPhraseExtractionTasks":[{"parameters":{"model-version":"latest"}}]},"analysisInput":{"documents":[{"id":"1","text":"I will go to the park."},{"id":"2","text":"Este es un document escrito en Español."},{"id":"3","text":"猫は幸せ"}]}})
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'operation-location',
  'https://endpoint/text/analytics/v3.1-preview.4/analyze/jobs/698084de-0fb1-4967-803f-f3f9187c5f3d',
  'x-envoy-upstream-service-time',
  '243',
  'apim-request-id',
  '9d3766ea-7d98-486c-b96e-8b23e1be5bd7',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:10:46 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/698084de-0fb1-4967-803f-f3f9187c5f3d')
  .query(true)
  .reply(200, {"jobId":"698084de-0fb1-4967-803f-f3f9187c5f3d","lastUpdateDateTime":"2021-04-28T21:10:47Z","createdDateTime":"2021-04-28T21:10:47Z","expirationDateTime":"2021-04-29T21:10:47Z","status":"notStarted","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-04-28T21:10:47Z"},"completed":0,"failed":0,"inProgress":0,"total":0}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '12',
  'apim-request-id',
  '61b470c7-a35b-4feb-8391-2474da137182',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:10:47 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/698084de-0fb1-4967-803f-f3f9187c5f3d')
  .query(true)
  .reply(200, {"jobId":"698084de-0fb1-4967-803f-f3f9187c5f3d","lastUpdateDateTime":"2021-04-28T21:10:47Z","createdDateTime":"2021-04-28T21:10:47Z","expirationDateTime":"2021-04-29T21:10:47Z","status":"notStarted","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-04-28T21:10:47Z"},"completed":0,"failed":0,"inProgress":0,"total":0}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '10',
  'apim-request-id',
  '4e88848c-81c9-417a-893a-6cc0394dc973',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:10:47 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/698084de-0fb1-4967-803f-f3f9187c5f3d')
  .query(true)
  .reply(200, {"jobId":"698084de-0fb1-4967-803f-f3f9187c5f3d","lastUpdateDateTime":"2021-04-28T21:10:47Z","createdDateTime":"2021-04-28T21:10:47Z","expirationDateTime":"2021-04-29T21:10:47Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-04-28T21:10:47Z"},"completed":0,"failed":0,"inProgress":3,"total":3}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '165',
  'apim-request-id',
  '85555e9f-f7f6-47ee-b2b5-624eb114d00a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:10:49 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/698084de-0fb1-4967-803f-f3f9187c5f3d')
  .query(true)
  .reply(200, {"jobId":"698084de-0fb1-4967-803f-f3f9187c5f3d","lastUpdateDateTime":"2021-04-28T21:10:47Z","createdDateTime":"2021-04-28T21:10:47Z","expirationDateTime":"2021-04-29T21:10:47Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-04-28T21:10:47Z"},"completed":0,"failed":0,"inProgress":3,"total":3}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '94',
  'apim-request-id',
  '7fce4505-47a6-4600-8f39-612c37e26f55',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:10:51 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/698084de-0fb1-4967-803f-f3f9187c5f3d')
  .query(true)
  .reply(200, {"jobId":"698084de-0fb1-4967-803f-f3f9187c5f3d","lastUpdateDateTime":"2021-04-28T21:10:47Z","createdDateTime":"2021-04-28T21:10:47Z","expirationDateTime":"2021-04-29T21:10:47Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-04-28T21:10:47Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-04-28T21:10:47.7223344Z","state":"succeeded","results":{"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["Este es","document escrito en Español"],"warnings":[]},{"id":"3","keyPhrases":["猫は幸せ"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '163',
  'apim-request-id',
  'f996a5ef-d1c0-4ca3-abf1-02d1ac1635d1',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:10:53 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/698084de-0fb1-4967-803f-f3f9187c5f3d')
  .query(true)
  .reply(200, {"jobId":"698084de-0fb1-4967-803f-f3f9187c5f3d","lastUpdateDateTime":"2021-04-28T21:10:47Z","createdDateTime":"2021-04-28T21:10:47Z","expirationDateTime":"2021-04-29T21:10:47Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-04-28T21:10:47Z"},"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-04-28T21:10:47.7223344Z","state":"succeeded","results":{"documents":[{"redactedText":"I will go to the park.","id":"1","entities":[],"warnings":[]},{"redactedText":"Este es un document escrito en Español.","id":"2","entities":[],"warnings":[]},{"redactedText":"猫は幸せ","id":"3","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-04-28T21:10:47.7223344Z","state":"succeeded","results":{"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["Este es","document escrito en Español"],"warnings":[]},{"id":"3","keyPhrases":["猫は幸せ"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '230',
  'apim-request-id',
  '0c48c514-c519-4697-9aa0-b961be165e52',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:10:55 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/698084de-0fb1-4967-803f-f3f9187c5f3d')
  .query(true)
  .reply(200, {"jobId":"698084de-0fb1-4967-803f-f3f9187c5f3d","lastUpdateDateTime":"2021-04-28T21:10:47Z","createdDateTime":"2021-04-28T21:10:47Z","expirationDateTime":"2021-04-29T21:10:47Z","status":"succeeded","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-04-28T21:10:47Z"},"completed":3,"failed":0,"inProgress":0,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2021-04-28T21:10:47.7223344Z","state":"succeeded","results":{"documents":[{"id":"1","entities":[{"text":"park","category":"Location","offset":17,"length":4,"confidenceScore":0.95}],"warnings":[]},{"id":"2","entities":[],"warnings":[]},{"id":"3","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}],"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-04-28T21:10:47.7223344Z","state":"succeeded","results":{"documents":[{"redactedText":"I will go to the park.","id":"1","entities":[],"warnings":[]},{"redactedText":"Este es un document escrito en Español.","id":"2","entities":[],"warnings":[]},{"redactedText":"猫は幸せ","id":"3","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-04-28T21:10:47.7223344Z","state":"succeeded","results":{"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["Este es","document escrito en Español"],"warnings":[]},{"id":"3","keyPhrases":["猫は幸せ"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '303',
  'apim-request-id',
  '6151d789-1f3a-4804-a164-4e3bfffa4abd',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:10:58 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/698084de-0fb1-4967-803f-f3f9187c5f3d')
  .query(true)
  .reply(200, {"jobId":"698084de-0fb1-4967-803f-f3f9187c5f3d","lastUpdateDateTime":"2021-04-28T21:10:47Z","createdDateTime":"2021-04-28T21:10:47Z","expirationDateTime":"2021-04-29T21:10:47Z","status":"succeeded","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-04-28T21:10:47Z"},"completed":3,"failed":0,"inProgress":0,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2021-04-28T21:10:47.7223344Z","state":"succeeded","results":{"documents":[{"id":"1","entities":[{"text":"park","category":"Location","offset":17,"length":4,"confidenceScore":0.95}],"warnings":[]},{"id":"2","entities":[],"warnings":[]},{"id":"3","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}],"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-04-28T21:10:47.7223344Z","state":"succeeded","results":{"documents":[{"redactedText":"I will go to the park.","id":"1","entities":[],"warnings":[]},{"redactedText":"Este es un document escrito en Español.","id":"2","entities":[],"warnings":[]},{"redactedText":"猫は幸せ","id":"3","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-04-28T21:10:47.7223344Z","state":"succeeded","results":{"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["Este es","document escrito en Español"],"warnings":[]},{"id":"3","keyPhrases":["猫は幸せ"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '414',
  'apim-request-id',
  '329d3ba0-d689-49f1-bb46-f195524b7f91',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:10:58 GMT'
]);

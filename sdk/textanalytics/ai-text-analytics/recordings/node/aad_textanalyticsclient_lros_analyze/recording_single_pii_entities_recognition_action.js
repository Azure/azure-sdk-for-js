let nock = require('nock');

module.exports.hash = "52d3daee9b272cd0afb98e0c73b85f17";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .get('/common/discovery/instance')
  .query(true)
  .reply(200, {"tenant_discovery_endpoint":"https://login.microsoftonline.com/88888888-8888-8888-8888-888888888888/v2.0/.well-known/openid-configuration","api-version":"1.1","metadata":[{"preferred_network":"login.microsoftonline.com","preferred_cache":"login.windows.net","aliases":["login.microsoftonline.com","login.windows.net","login.microsoft.com","sts.windows.net"]},{"preferred_network":"login.partner.microsoftonline.cn","preferred_cache":"login.partner.microsoftonline.cn","aliases":["login.partner.microsoftonline.cn","login.chinacloudapi.cn"]},{"preferred_network":"login.microsoftonline.de","preferred_cache":"login.microsoftonline.de","aliases":["login.microsoftonline.de"]},{"preferred_network":"login.microsoftonline.us","preferred_cache":"login.microsoftonline.us","aliases":["login.microsoftonline.us","login.usgovcloudapi.net"]},{"preferred_network":"login-us.microsoftonline.com","preferred_cache":"login-us.microsoftonline.com","aliases":["login-us.microsoftonline.com"]}]}, [
  'Cache-Control',
  'max-age=86400, private',
  'Content-Length',
  '980',
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
  '26c25d05-8eae-46a7-a633-ce8b25c1bc03',
  'x-ms-ests-server',
  '2.1.11654.16 - EUS ProdSlices',
  'Set-Cookie',
  'fpc=Au8MJrNuQyZHoLASLJ-TetBz_bg1DgAAACnFG9gOAAAA; expires=Fri, 28-May-2021 21:08:43 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrwA24OP8Owk5UZWMxsy56QJgey_CazfRlPujydRL_WKUQxPcvOd9o8NEW1jrzdgaoI20r0a0KtRKU6N0UZQCWg-RlXFAqE6I7SjAK3-jOzGyEiPzyPk4dTHnDd6u37y4n-L66Ja0tLL2eugppduiQMftI0IJmPNSnYUSOfij3vRUgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 28 Apr 2021 21:08:42 GMT'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .get('/88888888-8888-8888-8888-888888888888/v2.0/.well-known/openid-configuration')
  .reply(200, {"token_endpoint":"https://login.microsoftonline.com/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token","token_endpoint_auth_methods_supported":["client_secret_post","private_key_jwt","client_secret_basic"],"jwks_uri":"https://login.microsoftonline.com/88888888-8888-8888-8888-888888888888/discovery/v2.0/keys","response_modes_supported":["query","fragment","form_post"],"subject_types_supported":["pairwise"],"id_token_signing_alg_values_supported":["RS256"],"response_types_supported":["code","id_token","code id_token","id_token token"],"scopes_supported":["openid","profile","email","offline_access"],"issuer":"https://login.microsoftonline.com/88888888-8888-8888-8888-888888888888/v2.0","request_uri_parameter_supported":false,"userinfo_endpoint":"https://graph.microsoft.com/oidc/userinfo","authorization_endpoint":"https://login.microsoftonline.com/88888888-8888-8888-8888-888888888888/oauth2/v2.0/authorize","device_authorization_endpoint":"https://login.microsoftonline.com/88888888-8888-8888-8888-888888888888/oauth2/v2.0/devicecode","http_logout_supported":true,"frontchannel_logout_supported":true,"end_session_endpoint":"https://login.microsoftonline.com/88888888-8888-8888-8888-888888888888/oauth2/v2.0/logout","claims_supported":["sub","iss","cloud_instance_name","cloud_instance_host_name","cloud_graph_host_name","msgraph_host","aud","exp","iat","auth_time","acr","nonce","preferred_username","name","tid","ver","at_hash","c_hash","email"],"tenant_region_scope":"WW","cloud_instance_name":"microsoftonline.com","cloud_graph_host_name":"graph.windows.net","msgraph_host":"graph.microsoft.com","rbac_url":"https://pas.windows.net"}, [
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
  'df10e011-eaf8-471d-8637-d076cc96c001',
  'x-ms-ests-server',
  '2.1.11654.16 - WUS2 ProdSlices',
  'Set-Cookie',
  'fpc=Au8MJrNuQyZHoLASLJ-TetBz_bg1DgAAACnFG9gOAAAA; expires=Fri, 28-May-2021 21:08:43 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrQZGFzkI_bQ5d-4NfNBaaK779kv68WYEGy20oRBr790YqdCkbW4ZXab2QWcAdasMFMttYO6saN-F6jPl9xj7m49EwLnBx70-dMGDJiRx7TlDq3F_GyQuKCFieXc3kR0sWXWcDoSeijaUdxejvBxnhaNp2VcVal6F5s_nLr83AFKkgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 28 Apr 2021 21:08:42 GMT',
  'Content-Length',
  '1651'
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
  '2032fa4b-49dd-4d6b-9748-9d40aa942501',
  'x-ms-ests-server',
  '2.1.11654.16 - SCUS ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=Au8MJrNuQyZHoLASLJ-TetBz_bg1DgAAACnFG9gOAAAA; expires=Fri, 28-May-2021 21:08:43 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 28 Apr 2021 21:08:42 GMT',
  'Content-Length',
  '1331'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/text/analytics/v3.1-preview.4/analyze', {"tasks":{"entityRecognitionPiiTasks":[{"parameters":{"model-version":"latest","stringIndexType":"Utf16CodeUnit"}}]},"analysisInput":{"documents":[{"id":"1","text":"My SSN is 859-98-0987."},{"id":"2","text":"Your ABA number - 111000025 - is the first 9 digits in the lower left hand corner of your personal check."},{"id":"3","text":"Is 998.214.865-68 your Brazilian CPF number?"}]}})
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'operation-location',
  'https://endpoint/text/analytics/v3.1-preview.4/analyze/jobs/3070cd21-3fd9-4817-b5e5-1e741c3c7c65',
  'x-envoy-upstream-service-time',
  '31',
  'apim-request-id',
  '3ae77f46-0080-43ea-aa3b-5226e06d9bf8',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:08:43 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/3070cd21-3fd9-4817-b5e5-1e741c3c7c65')
  .query(true)
  .reply(200, {"jobId":"3070cd21-3fd9-4817-b5e5-1e741c3c7c65","lastUpdateDateTime":"2021-04-28T21:08:43Z","createdDateTime":"2021-04-28T21:08:43Z","expirationDateTime":"2021-04-29T21:08:43Z","status":"notStarted","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-04-28T21:08:43Z"},"completed":0,"failed":0,"inProgress":0,"total":0}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '14',
  'apim-request-id',
  '07446008-8580-451b-b057-b0b7815d9610',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:08:43 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/3070cd21-3fd9-4817-b5e5-1e741c3c7c65')
  .query(true)
  .reply(200, {"jobId":"3070cd21-3fd9-4817-b5e5-1e741c3c7c65","lastUpdateDateTime":"2021-04-28T21:08:43Z","createdDateTime":"2021-04-28T21:08:43Z","expirationDateTime":"2021-04-29T21:08:43Z","status":"notStarted","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-04-28T21:08:43Z"},"completed":0,"failed":0,"inProgress":0,"total":0}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '12',
  'apim-request-id',
  '917cf4cb-6bc2-4611-9342-498858a6c8cb',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:08:43 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/3070cd21-3fd9-4817-b5e5-1e741c3c7c65')
  .query(true)
  .reply(200, {"jobId":"3070cd21-3fd9-4817-b5e5-1e741c3c7c65","lastUpdateDateTime":"2021-04-28T21:08:44Z","createdDateTime":"2021-04-28T21:08:43Z","expirationDateTime":"2021-04-29T21:08:43Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-04-28T21:08:44Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '82',
  'apim-request-id',
  'd352e1f1-9811-484b-8761-47109c704cf0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:08:45 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/3070cd21-3fd9-4817-b5e5-1e741c3c7c65')
  .query(true)
  .reply(200, {"jobId":"3070cd21-3fd9-4817-b5e5-1e741c3c7c65","lastUpdateDateTime":"2021-04-28T21:08:44Z","createdDateTime":"2021-04-28T21:08:43Z","expirationDateTime":"2021-04-29T21:08:43Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-04-28T21:08:44Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '70',
  'apim-request-id',
  '63ec6bb6-c2f0-46e6-9b9f-17f65618ef90',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:08:47 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/3070cd21-3fd9-4817-b5e5-1e741c3c7c65')
  .query(true)
  .reply(200, {"jobId":"3070cd21-3fd9-4817-b5e5-1e741c3c7c65","lastUpdateDateTime":"2021-04-28T21:08:44Z","createdDateTime":"2021-04-28T21:08:43Z","expirationDateTime":"2021-04-29T21:08:43Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-04-28T21:08:44Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '76',
  'apim-request-id',
  '29bd5b53-9b8b-49a3-9aa8-1ad7d098c62c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:08:49 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/3070cd21-3fd9-4817-b5e5-1e741c3c7c65')
  .query(true)
  .reply(200, {"jobId":"3070cd21-3fd9-4817-b5e5-1e741c3c7c65","lastUpdateDateTime":"2021-04-28T21:08:44Z","createdDateTime":"2021-04-28T21:08:43Z","expirationDateTime":"2021-04-29T21:08:43Z","status":"succeeded","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-04-28T21:08:44Z"},"completed":1,"failed":0,"inProgress":0,"total":1,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-04-28T21:08:44.3042237Z","state":"succeeded","results":{"documents":[{"redactedText":"My SSN is ***********.","id":"1","entities":[{"text":"859-98-0987","category":"USSocialSecurityNumber","offset":10,"length":11,"confidenceScore":0.65}],"warnings":[]},{"redactedText":"Your ABA number - ********* - is the first 9 digits in the lower left hand corner of your personal check.","id":"2","entities":[{"text":"111000025","category":"PhoneNumber","offset":18,"length":9,"confidenceScore":0.8},{"text":"111000025","category":"ABARoutingNumber","offset":18,"length":9,"confidenceScore":0.75},{"text":"111000025","category":"NZSocialWelfareNumber","offset":18,"length":9,"confidenceScore":0.65}],"warnings":[]},{"redactedText":"Is 998.214.865-68 your Brazilian CPF number?","id":"3","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7693',
  'apim-request-id',
  '9faf6171-86d3-4886-90a6-406dff7f0e39',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:08:59 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/3070cd21-3fd9-4817-b5e5-1e741c3c7c65')
  .query(true)
  .reply(200, {"jobId":"3070cd21-3fd9-4817-b5e5-1e741c3c7c65","lastUpdateDateTime":"2021-04-28T21:08:44Z","createdDateTime":"2021-04-28T21:08:43Z","expirationDateTime":"2021-04-29T21:08:43Z","status":"succeeded","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-04-28T21:08:44Z"},"completed":1,"failed":0,"inProgress":0,"total":1,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-04-28T21:08:44.3042237Z","state":"succeeded","results":{"documents":[{"redactedText":"My SSN is ***********.","id":"1","entities":[{"text":"859-98-0987","category":"USSocialSecurityNumber","offset":10,"length":11,"confidenceScore":0.65}],"warnings":[]},{"redactedText":"Your ABA number - ********* - is the first 9 digits in the lower left hand corner of your personal check.","id":"2","entities":[{"text":"111000025","category":"PhoneNumber","offset":18,"length":9,"confidenceScore":0.8},{"text":"111000025","category":"ABARoutingNumber","offset":18,"length":9,"confidenceScore":0.75},{"text":"111000025","category":"NZSocialWelfareNumber","offset":18,"length":9,"confidenceScore":0.65}],"warnings":[]},{"redactedText":"Is 998.214.865-68 your Brazilian CPF number?","id":"3","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '130',
  'apim-request-id',
  'c65eca89-6b0b-48db-a57f-005b50589ae3',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:08:59 GMT'
]);

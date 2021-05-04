let nock = require('nock');

module.exports.hash = "29d2b399f939c646f380b2700b696e6e";

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
  'a950eecf-0c5b-4396-88fa-984d25abfe02',
  'x-ms-ests-server',
  '2.1.11654.16 - SCUS ProdSlices',
  'Set-Cookie',
  'fpc=AqXUpo7Eg7lIkX24TbKl-dNz_bg1DgAAAErQItgOAAAA; expires=Thu, 03-Jun-2021 05:23:11 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevry7esSAGiOuq8EHs2SYkB7d4VpkviTH9Mukc1ZgDZDD3qzYDhDI-GyDI4R14anLBdtusdXHpBwWI6HocdVssltkK4n2mdUPc-9Kg3OZ1Xwn7dailqIQwkLKxmWSpwVkbEsVLdefDPvxxva1ZHvXcu8iuW8BS5XcExoYm-J1vOPPsgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 04 May 2021 05:23:10 GMT',
  'Content-Length',
  '980'
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
  '9344c809-d294-4bf4-9093-4ecc6f73fa01',
  'x-ms-ests-server',
  '2.1.11654.16 - SCUS ProdSlices',
  'Set-Cookie',
  'fpc=AqXUpo7Eg7lIkX24TbKl-dNz_bg1DgAAAErQItgOAAAA; expires=Thu, 03-Jun-2021 05:23:11 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrI06y0mNY0cSJyJHkUyd6dPftoLDd5gqTgGgabjq38UBQONLC0vsGi5zyget1gDJK-WJ84q6qEbB8OKy8choF7-NmTSXIQhA6yqlKTafahZL3PbaQcV0W4cnP1riurooFq5wwrAQgCf2nFL0_mbWPK25MG9zfIzTJiexUFUbqdWggAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 04 May 2021 05:23:10 GMT',
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
  'Content-Length',
  '1331',
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
  'e3ff1500-598c-46a2-b97f-2001432e4a02',
  'x-ms-ests-server',
  '2.1.11654.16 - EUS ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=AqXUpo7Eg7lIkX24TbKl-dNz_bg1DgAAAErQItgOAAAA; expires=Thu, 03-Jun-2021 05:23:11 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 04 May 2021 05:23:10 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('//text/analytics/v3.1-preview.5/analyze', {"tasks":{"sentimentAnalysisTasks":[{"parameters":{"opinionMining":true,"stringIndexType":"Utf16CodeUnit"}}]},"analysisInput":{"documents":[{"id":"0","text":"The food was unacceptable","language":"en"},{"id":"1","text":"The rooms were beautiful. The AC was good and quiet.","language":"en"},{"id":"2","text":"The breakfast was good, but the toilet was smelly.","language":"en"},{"id":"3","text":"Loved this hotel - good breakfast - nice shuttle service - clean rooms.","language":"en"},{"id":"4","text":"I had a great unobstructed view of the Microsoft campus.","language":"en"},{"id":"5","text":"Nice rooms but bathrooms were old and the toilet was dirty when we arrived.","language":"en"},{"id":"6","text":"The toilet smelled.","language":"en"}]}})
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'operation-location',
  'https://endpoint/text/analytics/v3.1-preview.5/analyze/jobs/09e6dd39-201c-4d94-8481-dade314c08b6',
  'x-envoy-upstream-service-time',
  '151',
  'apim-request-id',
  'f17d7469-d412-4d8d-a62d-2e1dbb668b0d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 04 May 2021 05:23:11 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1-preview.5/analyze/jobs/09e6dd39-201c-4d94-8481-dade314c08b6')
  .query(true)
  .reply(200, {"jobId":"09e6dd39-201c-4d94-8481-dade314c08b6","lastUpdateDateTime":"2021-05-04T05:23:11Z","createdDateTime":"2021-05-04T05:23:11Z","expirationDateTime":"2021-05-05T05:23:11Z","status":"notStarted","errors":[],"displayName":"NA","tasks":{"details":{"name":"NA","lastUpdateDateTime":"2021-05-04T05:23:11Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  '74f24295-dd1b-427d-9992-b225bcad76da',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 04 May 2021 05:23:11 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1-preview.5/analyze/jobs/09e6dd39-201c-4d94-8481-dade314c08b6')
  .query(true)
  .reply(200, {"jobId":"09e6dd39-201c-4d94-8481-dade314c08b6","lastUpdateDateTime":"2021-05-04T05:23:11Z","createdDateTime":"2021-05-04T05:23:11Z","expirationDateTime":"2021-05-05T05:23:11Z","status":"notStarted","errors":[],"displayName":"NA","tasks":{"details":{"name":"NA","lastUpdateDateTime":"2021-05-04T05:23:11Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  'a00aca15-df01-465c-a33c-6251430eeec7',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 04 May 2021 05:23:11 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1-preview.5/analyze/jobs/09e6dd39-201c-4d94-8481-dade314c08b6')
  .query(true)
  .reply(200, {"jobId":"09e6dd39-201c-4d94-8481-dade314c08b6","lastUpdateDateTime":"2021-05-04T05:23:12Z","createdDateTime":"2021-05-04T05:23:11Z","expirationDateTime":"2021-05-05T05:23:11Z","status":"running","errors":[],"displayName":"NA","tasks":{"details":{"name":"NA","lastUpdateDateTime":"2021-05-04T05:23:12Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  '19e78de5-7009-4580-8bf4-1d233a589395',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 04 May 2021 05:23:13 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1-preview.5/analyze/jobs/09e6dd39-201c-4d94-8481-dade314c08b6')
  .query(true)
  .reply(200, {"jobId":"09e6dd39-201c-4d94-8481-dade314c08b6","lastUpdateDateTime":"2021-05-04T05:23:12Z","createdDateTime":"2021-05-04T05:23:11Z","expirationDateTime":"2021-05-05T05:23:11Z","status":"running","errors":[],"displayName":"NA","tasks":{"details":{"name":"NA","lastUpdateDateTime":"2021-05-04T05:23:12Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  '44bd60e3-dccb-417a-b880-5a976173c0f2',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 04 May 2021 05:23:15 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1-preview.5/analyze/jobs/09e6dd39-201c-4d94-8481-dade314c08b6')
  .query(true)
  .reply(200, {"jobId":"09e6dd39-201c-4d94-8481-dade314c08b6","lastUpdateDateTime":"2021-05-04T05:23:12Z","createdDateTime":"2021-05-04T05:23:11Z","expirationDateTime":"2021-05-05T05:23:11Z","status":"running","errors":[],"displayName":"NA","tasks":{"details":{"name":"NA","lastUpdateDateTime":"2021-05-04T05:23:12Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '6',
  'apim-request-id',
  'f2f4a4ac-fed1-436c-8398-fe9b6a989622',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 04 May 2021 05:23:17 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1-preview.5/analyze/jobs/09e6dd39-201c-4d94-8481-dade314c08b6')
  .query(true)
  .reply(200, {"jobId":"09e6dd39-201c-4d94-8481-dade314c08b6","lastUpdateDateTime":"2021-05-04T05:23:12Z","createdDateTime":"2021-05-04T05:23:11Z","expirationDateTime":"2021-05-05T05:23:11Z","status":"running","errors":[],"displayName":"NA","tasks":{"details":{"name":"NA","lastUpdateDateTime":"2021-05-04T05:23:12Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '6',
  'apim-request-id',
  '588bd335-026e-4a39-87e3-8f882053db64',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 04 May 2021 05:23:19 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1-preview.5/analyze/jobs/09e6dd39-201c-4d94-8481-dade314c08b6')
  .query(true)
  .reply(200, {"jobId":"09e6dd39-201c-4d94-8481-dade314c08b6","lastUpdateDateTime":"2021-05-04T05:23:12Z","createdDateTime":"2021-05-04T05:23:11Z","expirationDateTime":"2021-05-05T05:23:11Z","status":"running","errors":[],"displayName":"NA","tasks":{"details":{"name":"NA","lastUpdateDateTime":"2021-05-04T05:23:12Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '6',
  'apim-request-id',
  '1feb084e-e88f-412c-a7aa-ed4f7b05bab5',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 04 May 2021 05:23:21 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1-preview.5/analyze/jobs/09e6dd39-201c-4d94-8481-dade314c08b6')
  .query(true)
  .reply(200, {"jobId":"09e6dd39-201c-4d94-8481-dade314c08b6","lastUpdateDateTime":"2021-05-04T05:23:12Z","createdDateTime":"2021-05-04T05:23:11Z","expirationDateTime":"2021-05-05T05:23:11Z","status":"running","errors":[],"displayName":"NA","tasks":{"details":{"name":"NA","lastUpdateDateTime":"2021-05-04T05:23:12Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '8',
  'apim-request-id',
  '32af5013-cc07-4c64-91ed-42e9b53bf8fe',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 04 May 2021 05:23:23 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1-preview.5/analyze/jobs/09e6dd39-201c-4d94-8481-dade314c08b6')
  .query(true)
  .reply(200, {"jobId":"09e6dd39-201c-4d94-8481-dade314c08b6","lastUpdateDateTime":"2021-05-04T05:23:12Z","createdDateTime":"2021-05-04T05:23:11Z","expirationDateTime":"2021-05-05T05:23:11Z","status":"running","errors":[],"displayName":"NA","tasks":{"details":{"name":"NA","lastUpdateDateTime":"2021-05-04T05:23:12Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '10',
  'apim-request-id',
  'e428a0e0-b5c9-4a50-9a7b-6e8bfcb18413',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 04 May 2021 05:23:25 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1-preview.5/analyze/jobs/09e6dd39-201c-4d94-8481-dade314c08b6')
  .query(true)
  .reply(200, {"jobId":"09e6dd39-201c-4d94-8481-dade314c08b6","lastUpdateDateTime":"2021-05-04T05:23:12Z","createdDateTime":"2021-05-04T05:23:11Z","expirationDateTime":"2021-05-05T05:23:11Z","status":"running","errors":[],"displayName":"NA","tasks":{"details":{"name":"NA","lastUpdateDateTime":"2021-05-04T05:23:12Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '6',
  'apim-request-id',
  '0aea3ff4-7c4d-4c65-8a0d-48c93efb7f34',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 04 May 2021 05:23:27 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1-preview.5/analyze/jobs/09e6dd39-201c-4d94-8481-dade314c08b6')
  .query(true)
  .reply(200, {"jobId":"09e6dd39-201c-4d94-8481-dade314c08b6","lastUpdateDateTime":"2021-05-04T05:23:12Z","createdDateTime":"2021-05-04T05:23:11Z","expirationDateTime":"2021-05-05T05:23:11Z","status":"running","errors":[],"displayName":"NA","tasks":{"details":{"name":"NA","lastUpdateDateTime":"2021-05-04T05:23:12Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '6',
  'apim-request-id',
  '6fdbd603-b7af-4bf3-9505-32a66a4de819',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 04 May 2021 05:23:29 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1-preview.5/analyze/jobs/09e6dd39-201c-4d94-8481-dade314c08b6')
  .query(true)
  .reply(200, {"jobId":"09e6dd39-201c-4d94-8481-dade314c08b6","lastUpdateDateTime":"2021-05-04T05:23:12Z","createdDateTime":"2021-05-04T05:23:11Z","expirationDateTime":"2021-05-05T05:23:11Z","status":"running","errors":[],"displayName":"NA","tasks":{"details":{"name":"NA","lastUpdateDateTime":"2021-05-04T05:23:12Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  'adff7444-91e2-4322-97a5-15de923a8e31',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 04 May 2021 05:23:31 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1-preview.5/analyze/jobs/09e6dd39-201c-4d94-8481-dade314c08b6')
  .query(true)
  .reply(200, {"jobId":"09e6dd39-201c-4d94-8481-dade314c08b6","lastUpdateDateTime":"2021-05-04T05:23:12Z","createdDateTime":"2021-05-04T05:23:11Z","expirationDateTime":"2021-05-05T05:23:11Z","status":"running","errors":[],"displayName":"NA","tasks":{"details":{"name":"NA","lastUpdateDateTime":"2021-05-04T05:23:12Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  '62eb1f6f-c5fe-46bf-a07b-7f2eba3df5ba',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 04 May 2021 05:23:33 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1-preview.5/analyze/jobs/09e6dd39-201c-4d94-8481-dade314c08b6')
  .query(true)
  .reply(200, {"jobId":"09e6dd39-201c-4d94-8481-dade314c08b6","lastUpdateDateTime":"2021-05-04T05:23:12Z","createdDateTime":"2021-05-04T05:23:11Z","expirationDateTime":"2021-05-05T05:23:11Z","status":"running","errors":[],"displayName":"NA","tasks":{"details":{"name":"NA","lastUpdateDateTime":"2021-05-04T05:23:12Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '8',
  'apim-request-id',
  'd3e56569-dced-494d-9338-cc24cc5e042d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 04 May 2021 05:23:35 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1-preview.5/analyze/jobs/09e6dd39-201c-4d94-8481-dade314c08b6')
  .query(true)
  .reply(200, {"jobId":"09e6dd39-201c-4d94-8481-dade314c08b6","lastUpdateDateTime":"2021-05-04T05:23:12Z","createdDateTime":"2021-05-04T05:23:11Z","expirationDateTime":"2021-05-05T05:23:11Z","status":"running","errors":[],"displayName":"NA","tasks":{"details":{"name":"NA","lastUpdateDateTime":"2021-05-04T05:23:12Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  '2590f6d7-382e-4d7e-9292-750b17ae17ef',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 04 May 2021 05:23:37 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1-preview.5/analyze/jobs/09e6dd39-201c-4d94-8481-dade314c08b6')
  .query(true)
  .reply(200, {"jobId":"09e6dd39-201c-4d94-8481-dade314c08b6","lastUpdateDateTime":"2021-05-04T05:23:12Z","createdDateTime":"2021-05-04T05:23:11Z","expirationDateTime":"2021-05-05T05:23:11Z","status":"running","errors":[],"displayName":"NA","tasks":{"details":{"name":"NA","lastUpdateDateTime":"2021-05-04T05:23:12Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  '4948bc86-3df2-4cac-b042-b9a892f92f9f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 04 May 2021 05:23:39 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1-preview.5/analyze/jobs/09e6dd39-201c-4d94-8481-dade314c08b6')
  .query(true)
  .reply(200, {"jobId":"09e6dd39-201c-4d94-8481-dade314c08b6","lastUpdateDateTime":"2021-05-04T05:23:12Z","createdDateTime":"2021-05-04T05:23:11Z","expirationDateTime":"2021-05-05T05:23:11Z","status":"running","errors":[],"displayName":"NA","tasks":{"details":{"name":"NA","lastUpdateDateTime":"2021-05-04T05:23:12Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '6',
  'apim-request-id',
  'a799122f-6bb5-41c4-92e8-cd382fdcd5a6',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 04 May 2021 05:23:41 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1-preview.5/analyze/jobs/09e6dd39-201c-4d94-8481-dade314c08b6')
  .query(true)
  .reply(200, {"jobId":"09e6dd39-201c-4d94-8481-dade314c08b6","lastUpdateDateTime":"2021-05-04T05:23:12Z","createdDateTime":"2021-05-04T05:23:11Z","expirationDateTime":"2021-05-05T05:23:11Z","status":"running","errors":[],"displayName":"NA","tasks":{"details":{"name":"NA","lastUpdateDateTime":"2021-05-04T05:23:12Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  '514f2645-ce1c-4646-af90-181725c34e8b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 04 May 2021 05:23:43 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1-preview.5/analyze/jobs/09e6dd39-201c-4d94-8481-dade314c08b6')
  .query(true)
  .reply(200, {"jobId":"09e6dd39-201c-4d94-8481-dade314c08b6","lastUpdateDateTime":"2021-05-04T05:23:45Z","createdDateTime":"2021-05-04T05:23:11Z","expirationDateTime":"2021-05-05T05:23:11Z","status":"succeeded","errors":[],"displayName":"NA","tasks":{"details":{"name":"NA","lastUpdateDateTime":"2021-05-04T05:23:45Z"},"completed":1,"failed":0,"inProgress":0,"total":1,"sentimentAnalysisTasks":[{"lastUpdateDateTime":"2021-05-04T05:23:45.0231857Z","name":"NA","state":"succeeded","results":{"documents":[{"id":"0","sentiment":"negative","confidenceScores":{"positive":0,"neutral":0,"negative":1},"sentences":[{"sentiment":"negative","confidenceScores":{"positive":0,"neutral":0,"negative":1},"offset":0,"length":25,"text":"The food was unacceptable","targets":[{"sentiment":"negative","confidenceScores":{"positive":0,"negative":1},"offset":4,"length":4,"text":"food","relations":[{"relationType":"assessment","ref":"#/documents/0/sentences/0/assessments/0"}]}],"assessments":[{"sentiment":"negative","confidenceScores":{"positive":0,"negative":1},"offset":13,"length":12,"text":"unacceptable","isNegated":false}]}],"warnings":[]},{"id":"1","sentiment":"positive","confidenceScores":{"positive":1,"neutral":0,"negative":0},"sentences":[{"sentiment":"positive","confidenceScores":{"positive":1,"neutral":0,"negative":0},"offset":0,"length":25,"text":"The rooms were beautiful.","targets":[{"sentiment":"positive","confidenceScores":{"positive":1,"negative":0},"offset":4,"length":5,"text":"rooms","relations":[{"relationType":"assessment","ref":"#/documents/0/sentences/0/assessments/0"}]}],"assessments":[{"sentiment":"positive","confidenceScores":{"positive":1,"negative":0},"offset":15,"length":9,"text":"beautiful","isNegated":false}]},{"sentiment":"positive","confidenceScores":{"positive":1,"neutral":0,"negative":0},"offset":26,"length":26,"text":"The AC was good and quiet.","targets":[{"sentiment":"positive","confidenceScores":{"positive":1,"negative":0},"offset":30,"length":2,"text":"AC","relations":[{"relationType":"assessment","ref":"#/documents/0/sentences/1/assessments/0"},{"relationType":"assessment","ref":"#/documents/0/sentences/1/assessments/1"}]}],"assessments":[{"sentiment":"positive","confidenceScores":{"positive":1,"negative":0},"offset":37,"length":4,"text":"good","isNegated":false},{"sentiment":"positive","confidenceScores":{"positive":1,"negative":0},"offset":46,"length":5,"text":"quiet","isNegated":false}]}],"warnings":[]},{"id":"2","sentiment":"negative","confidenceScores":{"positive":0.01,"neutral":0,"negative":0.99},"sentences":[{"sentiment":"negative","confidenceScores":{"positive":0.01,"neutral":0,"negative":0.99},"offset":0,"length":50,"text":"The breakfast was good, but the toilet was smelly.","targets":[{"sentiment":"positive","confidenceScores":{"positive":1,"negative":0},"offset":4,"length":9,"text":"breakfast","relations":[{"relationType":"assessment","ref":"#/documents/0/sentences/0/assessments/0"}]},{"sentiment":"negative","confidenceScores":{"positive":0,"negative":1},"offset":32,"length":6,"text":"toilet","relations":[{"relationType":"assessment","ref":"#/documents/0/sentences/0/assessments/1"}]}],"assessments":[{"sentiment":"positive","confidenceScores":{"positive":1,"negative":0},"offset":18,"length":4,"text":"good","isNegated":false},{"sentiment":"negative","confidenceScores":{"positive":0,"negative":1},"offset":43,"length":6,"text":"smelly","isNegated":false}]}],"warnings":[]},{"id":"3","sentiment":"positive","confidenceScores":{"positive":1,"neutral":0,"negative":0},"sentences":[{"sentiment":"positive","confidenceScores":{"positive":1,"neutral":0,"negative":0},"offset":0,"length":71,"text":"Loved this hotel - good breakfast - nice shuttle service - clean rooms.","targets":[{"sentiment":"positive","confidenceScores":{"positive":1,"negative":0},"offset":11,"length":5,"text":"hotel","relations":[{"relationType":"assessment","ref":"#/documents/0/sentences/0/assessments/0"}]},{"sentiment":"positive","confidenceScores":{"positive":1,"negative":0},"offset":24,"length":9,"text":"breakfast","relations":[{"relationType":"assessment","ref":"#/documents/0/sentences/0/assessments/1"}]},{"sentiment":"positive","confidenceScores":{"positive":1,"negative":0},"offset":41,"length":15,"text":"shuttle service","relations":[{"relationType":"assessment","ref":"#/documents/0/sentences/0/assessments/2"}]},{"sentiment":"positive","confidenceScores":{"positive":1,"negative":0},"offset":65,"length":5,"text":"rooms","relations":[{"relationType":"assessment","ref":"#/documents/0/sentences/0/assessments/0"},{"relationType":"assessment","ref":"#/documents/0/sentences/0/assessments/1"},{"relationType":"assessment","ref":"#/documents/0/sentences/0/assessments/3"},{"relationType":"assessment","ref":"#/documents/0/sentences/0/assessments/2"}]}],"assessments":[{"sentiment":"positive","confidenceScores":{"positive":1,"negative":0},"offset":19,"length":4,"text":"good","isNegated":false},{"sentiment":"positive","confidenceScores":{"positive":1,"negative":0},"offset":36,"length":4,"text":"nice","isNegated":false},{"sentiment":"positive","confidenceScores":{"positive":1,"negative":0},"offset":0,"length":5,"text":"loved","isNegated":false},{"sentiment":"positive","confidenceScores":{"positive":1,"negative":0},"offset":59,"length":5,"text":"clean","isNegated":false}]}],"warnings":[]},{"id":"4","sentiment":"positive","confidenceScores":{"positive":1,"neutral":0,"negative":0},"sentences":[{"sentiment":"positive","confidenceScores":{"positive":1,"neutral":0,"negative":0},"offset":0,"length":56,"text":"I had a great unobstructed view of the Microsoft campus.","targets":[{"sentiment":"positive","confidenceScores":{"positive":0.97,"negative":0.03},"offset":27,"length":4,"text":"view","relations":[{"relationType":"assessment","ref":"#/documents/0/sentences/0/assessments/0"},{"relationType":"assessment","ref":"#/documents/0/sentences/0/assessments/1"}]}],"assessments":[{"sentiment":"positive","confidenceScores":{"positive":1,"negative":0},"offset":8,"length":5,"text":"great","isNegated":false},{"sentiment":"positive","confidenceScores":{"positive":0.93,"negative":0.07},"offset":14,"length":12,"text":"unobstructed","isNegated":false}]}],"warnings":[]},{"id":"5","sentiment":"negative","confidenceScores":{"positive":0,"neutral":0,"negative":1},"sentences":[{"sentiment":"negative","confidenceScores":{"positive":0,"neutral":0,"negative":1},"offset":0,"length":75,"text":"Nice rooms but bathrooms were old and the toilet was dirty when we arrived.","targets":[{"sentiment":"positive","confidenceScores":{"positive":1,"negative":0},"offset":5,"length":5,"text":"rooms","relations":[{"relationType":"assessment","ref":"#/documents/0/sentences/0/assessments/0"}]},{"sentiment":"negative","confidenceScores":{"positive":0,"negative":1},"offset":15,"length":9,"text":"bathrooms","relations":[{"relationType":"assessment","ref":"#/documents/0/sentences/0/assessments/1"}]},{"sentiment":"negative","confidenceScores":{"positive":0,"negative":1},"offset":42,"length":6,"text":"toilet","relations":[{"relationType":"assessment","ref":"#/documents/0/sentences/0/assessments/2"}]}],"assessments":[{"sentiment":"positive","confidenceScores":{"positive":1,"negative":0},"offset":0,"length":4,"text":"nice","isNegated":false},{"sentiment":"negative","confidenceScores":{"positive":0,"negative":1},"offset":30,"length":3,"text":"old","isNegated":false},{"sentiment":"negative","confidenceScores":{"positive":0,"negative":1},"offset":53,"length":5,"text":"dirty","isNegated":false}]}],"warnings":[]},{"id":"6","sentiment":"neutral","confidenceScores":{"positive":0.03,"neutral":0.63,"negative":0.34},"sentences":[{"sentiment":"neutral","confidenceScores":{"positive":0.03,"neutral":0.63,"negative":0.34},"offset":0,"length":19,"text":"The toilet smelled.","targets":[{"sentiment":"negative","confidenceScores":{"positive":0.01,"negative":0.99},"offset":4,"length":6,"text":"toilet","relations":[{"relationType":"assessment","ref":"#/documents/0/sentences/0/assessments/0"}]}],"assessments":[{"sentiment":"negative","confidenceScores":{"positive":0.01,"negative":0.99},"offset":11,"length":7,"text":"smelled","isNegated":false}]}],"warnings":[]}],"errors":[],"modelVersion":"2020-04-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '92',
  'apim-request-id',
  'c4bd74ac-cf98-4462-b55c-9025d76e7655',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 04 May 2021 05:23:45 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1-preview.5/analyze/jobs/09e6dd39-201c-4d94-8481-dade314c08b6')
  .query(true)
  .reply(200, {"jobId":"09e6dd39-201c-4d94-8481-dade314c08b6","lastUpdateDateTime":"2021-05-04T05:23:45Z","createdDateTime":"2021-05-04T05:23:11Z","expirationDateTime":"2021-05-05T05:23:11Z","status":"succeeded","errors":[],"displayName":"NA","tasks":{"details":{"name":"NA","lastUpdateDateTime":"2021-05-04T05:23:45Z"},"completed":1,"failed":0,"inProgress":0,"total":1,"sentimentAnalysisTasks":[{"lastUpdateDateTime":"2021-05-04T05:23:45.0231857Z","name":"NA","state":"succeeded","results":{"documents":[{"id":"0","sentiment":"negative","confidenceScores":{"positive":0,"neutral":0,"negative":1},"sentences":[{"sentiment":"negative","confidenceScores":{"positive":0,"neutral":0,"negative":1},"offset":0,"length":25,"text":"The food was unacceptable","targets":[{"sentiment":"negative","confidenceScores":{"positive":0,"negative":1},"offset":4,"length":4,"text":"food","relations":[{"relationType":"assessment","ref":"#/documents/0/sentences/0/assessments/0"}]}],"assessments":[{"sentiment":"negative","confidenceScores":{"positive":0,"negative":1},"offset":13,"length":12,"text":"unacceptable","isNegated":false}]}],"warnings":[]},{"id":"1","sentiment":"positive","confidenceScores":{"positive":1,"neutral":0,"negative":0},"sentences":[{"sentiment":"positive","confidenceScores":{"positive":1,"neutral":0,"negative":0},"offset":0,"length":25,"text":"The rooms were beautiful.","targets":[{"sentiment":"positive","confidenceScores":{"positive":1,"negative":0},"offset":4,"length":5,"text":"rooms","relations":[{"relationType":"assessment","ref":"#/documents/0/sentences/0/assessments/0"}]}],"assessments":[{"sentiment":"positive","confidenceScores":{"positive":1,"negative":0},"offset":15,"length":9,"text":"beautiful","isNegated":false}]},{"sentiment":"positive","confidenceScores":{"positive":1,"neutral":0,"negative":0},"offset":26,"length":26,"text":"The AC was good and quiet.","targets":[{"sentiment":"positive","confidenceScores":{"positive":1,"negative":0},"offset":30,"length":2,"text":"AC","relations":[{"relationType":"assessment","ref":"#/documents/0/sentences/1/assessments/0"},{"relationType":"assessment","ref":"#/documents/0/sentences/1/assessments/1"}]}],"assessments":[{"sentiment":"positive","confidenceScores":{"positive":1,"negative":0},"offset":37,"length":4,"text":"good","isNegated":false},{"sentiment":"positive","confidenceScores":{"positive":1,"negative":0},"offset":46,"length":5,"text":"quiet","isNegated":false}]}],"warnings":[]},{"id":"2","sentiment":"negative","confidenceScores":{"positive":0.01,"neutral":0,"negative":0.99},"sentences":[{"sentiment":"negative","confidenceScores":{"positive":0.01,"neutral":0,"negative":0.99},"offset":0,"length":50,"text":"The breakfast was good, but the toilet was smelly.","targets":[{"sentiment":"positive","confidenceScores":{"positive":1,"negative":0},"offset":4,"length":9,"text":"breakfast","relations":[{"relationType":"assessment","ref":"#/documents/0/sentences/0/assessments/0"}]},{"sentiment":"negative","confidenceScores":{"positive":0,"negative":1},"offset":32,"length":6,"text":"toilet","relations":[{"relationType":"assessment","ref":"#/documents/0/sentences/0/assessments/1"}]}],"assessments":[{"sentiment":"positive","confidenceScores":{"positive":1,"negative":0},"offset":18,"length":4,"text":"good","isNegated":false},{"sentiment":"negative","confidenceScores":{"positive":0,"negative":1},"offset":43,"length":6,"text":"smelly","isNegated":false}]}],"warnings":[]},{"id":"3","sentiment":"positive","confidenceScores":{"positive":1,"neutral":0,"negative":0},"sentences":[{"sentiment":"positive","confidenceScores":{"positive":1,"neutral":0,"negative":0},"offset":0,"length":71,"text":"Loved this hotel - good breakfast - nice shuttle service - clean rooms.","targets":[{"sentiment":"positive","confidenceScores":{"positive":1,"negative":0},"offset":11,"length":5,"text":"hotel","relations":[{"relationType":"assessment","ref":"#/documents/0/sentences/0/assessments/0"}]},{"sentiment":"positive","confidenceScores":{"positive":1,"negative":0},"offset":24,"length":9,"text":"breakfast","relations":[{"relationType":"assessment","ref":"#/documents/0/sentences/0/assessments/1"}]},{"sentiment":"positive","confidenceScores":{"positive":1,"negative":0},"offset":41,"length":15,"text":"shuttle service","relations":[{"relationType":"assessment","ref":"#/documents/0/sentences/0/assessments/2"}]},{"sentiment":"positive","confidenceScores":{"positive":1,"negative":0},"offset":65,"length":5,"text":"rooms","relations":[{"relationType":"assessment","ref":"#/documents/0/sentences/0/assessments/0"},{"relationType":"assessment","ref":"#/documents/0/sentences/0/assessments/1"},{"relationType":"assessment","ref":"#/documents/0/sentences/0/assessments/3"},{"relationType":"assessment","ref":"#/documents/0/sentences/0/assessments/2"}]}],"assessments":[{"sentiment":"positive","confidenceScores":{"positive":1,"negative":0},"offset":19,"length":4,"text":"good","isNegated":false},{"sentiment":"positive","confidenceScores":{"positive":1,"negative":0},"offset":36,"length":4,"text":"nice","isNegated":false},{"sentiment":"positive","confidenceScores":{"positive":1,"negative":0},"offset":0,"length":5,"text":"loved","isNegated":false},{"sentiment":"positive","confidenceScores":{"positive":1,"negative":0},"offset":59,"length":5,"text":"clean","isNegated":false}]}],"warnings":[]},{"id":"4","sentiment":"positive","confidenceScores":{"positive":1,"neutral":0,"negative":0},"sentences":[{"sentiment":"positive","confidenceScores":{"positive":1,"neutral":0,"negative":0},"offset":0,"length":56,"text":"I had a great unobstructed view of the Microsoft campus.","targets":[{"sentiment":"positive","confidenceScores":{"positive":0.97,"negative":0.03},"offset":27,"length":4,"text":"view","relations":[{"relationType":"assessment","ref":"#/documents/0/sentences/0/assessments/0"},{"relationType":"assessment","ref":"#/documents/0/sentences/0/assessments/1"}]}],"assessments":[{"sentiment":"positive","confidenceScores":{"positive":1,"negative":0},"offset":8,"length":5,"text":"great","isNegated":false},{"sentiment":"positive","confidenceScores":{"positive":0.93,"negative":0.07},"offset":14,"length":12,"text":"unobstructed","isNegated":false}]}],"warnings":[]},{"id":"5","sentiment":"negative","confidenceScores":{"positive":0,"neutral":0,"negative":1},"sentences":[{"sentiment":"negative","confidenceScores":{"positive":0,"neutral":0,"negative":1},"offset":0,"length":75,"text":"Nice rooms but bathrooms were old and the toilet was dirty when we arrived.","targets":[{"sentiment":"positive","confidenceScores":{"positive":1,"negative":0},"offset":5,"length":5,"text":"rooms","relations":[{"relationType":"assessment","ref":"#/documents/0/sentences/0/assessments/0"}]},{"sentiment":"negative","confidenceScores":{"positive":0,"negative":1},"offset":15,"length":9,"text":"bathrooms","relations":[{"relationType":"assessment","ref":"#/documents/0/sentences/0/assessments/1"}]},{"sentiment":"negative","confidenceScores":{"positive":0,"negative":1},"offset":42,"length":6,"text":"toilet","relations":[{"relationType":"assessment","ref":"#/documents/0/sentences/0/assessments/2"}]}],"assessments":[{"sentiment":"positive","confidenceScores":{"positive":1,"negative":0},"offset":0,"length":4,"text":"nice","isNegated":false},{"sentiment":"negative","confidenceScores":{"positive":0,"negative":1},"offset":30,"length":3,"text":"old","isNegated":false},{"sentiment":"negative","confidenceScores":{"positive":0,"negative":1},"offset":53,"length":5,"text":"dirty","isNegated":false}]}],"warnings":[]},{"id":"6","sentiment":"neutral","confidenceScores":{"positive":0.03,"neutral":0.63,"negative":0.34},"sentences":[{"sentiment":"neutral","confidenceScores":{"positive":0.03,"neutral":0.63,"negative":0.34},"offset":0,"length":19,"text":"The toilet smelled.","targets":[{"sentiment":"negative","confidenceScores":{"positive":0.01,"negative":0.99},"offset":4,"length":6,"text":"toilet","relations":[{"relationType":"assessment","ref":"#/documents/0/sentences/0/assessments/0"}]}],"assessments":[{"sentiment":"negative","confidenceScores":{"positive":0.01,"negative":0.99},"offset":11,"length":7,"text":"smelled","isNegated":false}]}],"warnings":[]}],"errors":[],"modelVersion":"2020-04-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '113',
  'apim-request-id',
  'dce933f4-282b-4247-a8f3-f89529f5b3e1',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 04 May 2021 05:23:45 GMT'
]);

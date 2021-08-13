let nock = require('nock');

module.exports.hash = "74c1c5c7afab5cc7bb37a723f482de16";

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
  '1883f238-a91e-4bba-a3fe-9f9ef2110501',
  'x-ms-ests-server',
  '2.1.11898.12 - EUS ProdSlices',
  'Set-Cookie',
  'fpc=AlWKmlww77xOo6Ig5BuHWzBz_bg1EQAAAKy9m9gOAAAA; expires=Thu, 02-Sep-2021 22:45:24 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrlNRxzLzBKMDBi9i-jpZ5i_clcYWX83zXc28e9uR_SG4RfMzMiQR7kSVOVHU1ZaXyDdkKMwX8kl3KeuFgkWpiihUECwPmJWIBYBFo2A7TyKghknBrAjdOL5Z6lwGDPRcv3xLSOgAiUyH8Q165OhmYk9RJWcDx8iybQRlv_egelKQgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 03 Aug 2021 22:45:24 GMT',
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
  '98ed8392-48e2-47df-8bb1-d4ea0f28fa00',
  'x-ms-ests-server',
  '2.1.11898.12 - NCUS ProdSlices',
  'Set-Cookie',
  'fpc=AlWKmlww77xOo6Ig5BuHWzBz_bg1EQAAAKy9m9gOAAAA; expires=Thu, 02-Sep-2021 22:45:24 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrmRvvJEdWBWR4mLjwYS00Pz6PmrTN4xajoPWkhP3_knJt2WYyqFE03PN2egObR2mqPiLfPoYM7mRrv8mVNlydWbMLXzNmpvc9VEsgfhOGRkUFvraGgEb5ax9qyVNYv09RTpxwvSHOqV5pF-WzTkDfjvf9vNpe692NZUwMXJ9x6GwgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 03 Aug 2021 22:45:24 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.2.0&x-client-OS=linux&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=2|771,0|,&x-client-last-telemetry=2|0|||0,0&client-request-id=b772dd30-d445-40c0-9507-f0b9a3a5d66b&client_secret=azure_client_secret")
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
  'ff38fbcd-ab7c-448a-939b-49e3f8db3601',
  'x-ms-ests-server',
  '2.1.11898.12 - SCUS ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=AlWKmlww77xOo6Ig5BuHWzBz_bg1EQAAAKy9m9gOAAAA; expires=Thu, 02-Sep-2021 22:45:24 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 03 Aug 2021 22:45:24 GMT',
  'Content-Length',
  '1331'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/text/analytics/v3.2-preview.1/analyze', {"analysisInput":{"documents":[{"id":"0","text":"Microsoft moved its headquarters to Bellevue, Washington in January 1979.","language":"en"},{"id":"1","text":"Steve Ballmer stepped down as CEO of Microsoft and was succeeded by Satya Nadella.","language":"en"}]},"tasks":{"entityLinkingTasks":[{"parameters":{"stringIndexType":"Utf16CodeUnit"}}]}})
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'operation-location',
  'https://endpoint/text/analytics/v3.2-preview.1/analyze/jobs/3fbb34bd-7d1f-4699-ba45-a771808164d7',
  'x-envoy-upstream-service-time',
  '159',
  'apim-request-id',
  '7349c711-49a3-4711-935d-4550fcf931fc',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 22:45:24 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/analyze/jobs/3fbb34bd-7d1f-4699-ba45-a771808164d7')
  .query(true)
  .reply(200, {"jobId":"3fbb34bd-7d1f-4699-ba45-a771808164d7","lastUpdateDateTime":"2021-08-03T22:45:24Z","createdDateTime":"2021-08-03T22:45:24Z","expirationDateTime":"2021-08-04T22:45:24Z","status":"notStarted","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  '0b770681-0f84-4e87-bc21-811dae79456b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 22:45:24 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/analyze/jobs/3fbb34bd-7d1f-4699-ba45-a771808164d7')
  .query(true)
  .reply(200, {"jobId":"3fbb34bd-7d1f-4699-ba45-a771808164d7","lastUpdateDateTime":"2021-08-03T22:45:24Z","createdDateTime":"2021-08-03T22:45:24Z","expirationDateTime":"2021-08-04T22:45:24Z","status":"notStarted","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '6',
  'apim-request-id',
  'cc4c43ce-ba39-4c61-933f-ce1765342b43',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 22:45:24 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/analyze/jobs/3fbb34bd-7d1f-4699-ba45-a771808164d7')
  .query(true)
  .reply(200, {"jobId":"3fbb34bd-7d1f-4699-ba45-a771808164d7","lastUpdateDateTime":"2021-08-03T22:45:26Z","createdDateTime":"2021-08-03T22:45:24Z","expirationDateTime":"2021-08-04T22:45:24Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '6',
  'apim-request-id',
  'cfd51a87-20e2-418b-8d34-85365af3b9dc',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 22:45:26 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/analyze/jobs/3fbb34bd-7d1f-4699-ba45-a771808164d7')
  .query(true)
  .reply(200, {"jobId":"3fbb34bd-7d1f-4699-ba45-a771808164d7","lastUpdateDateTime":"2021-08-03T22:45:26Z","createdDateTime":"2021-08-03T22:45:24Z","expirationDateTime":"2021-08-04T22:45:24Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '6',
  'apim-request-id',
  '129bd5e6-ad2e-4e56-a52b-58b6b1f97a14',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 22:45:28 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/analyze/jobs/3fbb34bd-7d1f-4699-ba45-a771808164d7')
  .query(true)
  .reply(200, {"jobId":"3fbb34bd-7d1f-4699-ba45-a771808164d7","lastUpdateDateTime":"2021-08-03T22:45:26Z","createdDateTime":"2021-08-03T22:45:24Z","expirationDateTime":"2021-08-04T22:45:24Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '6',
  'apim-request-id',
  '97b68a25-ea38-4dc2-879c-6d6126091f14',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 22:45:30 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/analyze/jobs/3fbb34bd-7d1f-4699-ba45-a771808164d7')
  .query(true)
  .reply(200, {"jobId":"3fbb34bd-7d1f-4699-ba45-a771808164d7","lastUpdateDateTime":"2021-08-03T22:45:26Z","createdDateTime":"2021-08-03T22:45:24Z","expirationDateTime":"2021-08-04T22:45:24Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '8',
  'apim-request-id',
  '5cb717c2-7fea-4077-b1c1-704f08b7fc84',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 22:45:33 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/analyze/jobs/3fbb34bd-7d1f-4699-ba45-a771808164d7')
  .query(true)
  .reply(200, {"jobId":"3fbb34bd-7d1f-4699-ba45-a771808164d7","lastUpdateDateTime":"2021-08-03T22:45:26Z","createdDateTime":"2021-08-03T22:45:24Z","expirationDateTime":"2021-08-04T22:45:24Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '8',
  'apim-request-id',
  'e2274cd3-c4c2-4048-b918-898561c8f494',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 22:45:35 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/analyze/jobs/3fbb34bd-7d1f-4699-ba45-a771808164d7')
  .query(true)
  .reply(200, {"jobId":"3fbb34bd-7d1f-4699-ba45-a771808164d7","lastUpdateDateTime":"2021-08-03T22:45:26Z","createdDateTime":"2021-08-03T22:45:24Z","expirationDateTime":"2021-08-04T22:45:24Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '6',
  'apim-request-id',
  'f7567c46-1943-4f99-a2fc-89d4f7050c60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 22:45:37 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/analyze/jobs/3fbb34bd-7d1f-4699-ba45-a771808164d7')
  .query(true)
  .reply(200, {"jobId":"3fbb34bd-7d1f-4699-ba45-a771808164d7","lastUpdateDateTime":"2021-08-03T22:45:26Z","createdDateTime":"2021-08-03T22:45:24Z","expirationDateTime":"2021-08-04T22:45:24Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '8',
  'apim-request-id',
  '50ae66e3-ee99-43ec-8c1c-b5a3d70211e1',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 22:45:39 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/analyze/jobs/3fbb34bd-7d1f-4699-ba45-a771808164d7')
  .query(true)
  .reply(200, {"jobId":"3fbb34bd-7d1f-4699-ba45-a771808164d7","lastUpdateDateTime":"2021-08-03T22:45:26Z","createdDateTime":"2021-08-03T22:45:24Z","expirationDateTime":"2021-08-04T22:45:24Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '6',
  'apim-request-id',
  'aeba13a9-2024-4c4a-a6a1-22cb0ef747c3',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 22:45:41 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/analyze/jobs/3fbb34bd-7d1f-4699-ba45-a771808164d7')
  .query(true)
  .reply(200, {"jobId":"3fbb34bd-7d1f-4699-ba45-a771808164d7","lastUpdateDateTime":"2021-08-03T22:45:26Z","createdDateTime":"2021-08-03T22:45:24Z","expirationDateTime":"2021-08-04T22:45:24Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  '5529389b-0e02-4d07-b0dd-8e4ce3766474',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 22:45:43 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/analyze/jobs/3fbb34bd-7d1f-4699-ba45-a771808164d7')
  .query(true)
  .reply(200, {"jobId":"3fbb34bd-7d1f-4699-ba45-a771808164d7","lastUpdateDateTime":"2021-08-03T22:45:26Z","createdDateTime":"2021-08-03T22:45:24Z","expirationDateTime":"2021-08-04T22:45:24Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '6',
  'apim-request-id',
  '153ac7ca-8fd2-4536-bad9-946c9130067e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 22:45:45 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/analyze/jobs/3fbb34bd-7d1f-4699-ba45-a771808164d7')
  .query(true)
  .reply(200, {"jobId":"3fbb34bd-7d1f-4699-ba45-a771808164d7","lastUpdateDateTime":"2021-08-03T22:45:26Z","createdDateTime":"2021-08-03T22:45:24Z","expirationDateTime":"2021-08-04T22:45:24Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  'f92784d9-58de-4a0a-9a96-ce0af4b4c146',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 22:45:47 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/analyze/jobs/3fbb34bd-7d1f-4699-ba45-a771808164d7')
  .query(true)
  .reply(200, {"jobId":"3fbb34bd-7d1f-4699-ba45-a771808164d7","lastUpdateDateTime":"2021-08-03T22:45:26Z","createdDateTime":"2021-08-03T22:45:24Z","expirationDateTime":"2021-08-04T22:45:24Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '16',
  'apim-request-id',
  'e815be64-ccdc-497d-8f34-f37102b213c3',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 22:45:50 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/analyze/jobs/3fbb34bd-7d1f-4699-ba45-a771808164d7')
  .query(true)
  .reply(200, {"jobId":"3fbb34bd-7d1f-4699-ba45-a771808164d7","lastUpdateDateTime":"2021-08-03T22:45:26Z","createdDateTime":"2021-08-03T22:45:24Z","expirationDateTime":"2021-08-04T22:45:24Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  '02f12319-e76f-41ab-8b80-67c457a72283',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 22:45:52 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/analyze/jobs/3fbb34bd-7d1f-4699-ba45-a771808164d7')
  .query(true)
  .reply(200, {"jobId":"3fbb34bd-7d1f-4699-ba45-a771808164d7","lastUpdateDateTime":"2021-08-03T22:45:26Z","createdDateTime":"2021-08-03T22:45:24Z","expirationDateTime":"2021-08-04T22:45:24Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '6',
  'apim-request-id',
  '187d7899-709d-43ca-8b0b-af03a6a6eadf',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 22:45:54 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/analyze/jobs/3fbb34bd-7d1f-4699-ba45-a771808164d7')
  .query(true)
  .reply(200, {"jobId":"3fbb34bd-7d1f-4699-ba45-a771808164d7","lastUpdateDateTime":"2021-08-03T22:45:55Z","createdDateTime":"2021-08-03T22:45:24Z","expirationDateTime":"2021-08-04T22:45:24Z","status":"succeeded","errors":[],"displayName":"NA","tasks":{"completed":1,"failed":0,"inProgress":0,"total":1,"entityLinkingTasks":[{"lastUpdateDateTime":"2021-08-03T22:45:55.1695347Z","taskName":"EntityLinking_latest","state":"succeeded","results":{"documents":[{"id":"0","entities":[{"bingId":"a093e9b9-90f5-a3d5-c4b8-5855e1b01f85","name":"Microsoft","matches":[{"text":"Microsoft","offset":0,"length":9,"confidenceScore":0.39}],"language":"en","id":"Microsoft","url":"https://en.wikipedia.org/wiki/Microsoft","dataSource":"Wikipedia"},{"bingId":"a2e3a3eb-b83e-42f0-bf19-95b4c4c9d3c0","name":"Bellevue, Washington","matches":[{"text":"Bellevue, Washington","offset":36,"length":20,"confidenceScore":0.87}],"language":"en","id":"Bellevue, Washington","url":"https://en.wikipedia.org/wiki/Bellevue,_Washington","dataSource":"Wikipedia"},{"bingId":"19fb6fb4-3c50-f314-30e4-7b5470e08274","name":"Briann January","matches":[{"text":"January","offset":60,"length":7,"confidenceScore":0.14}],"language":"en","id":"Briann January","url":"https://en.wikipedia.org/wiki/Briann_January","dataSource":"Wikipedia"}],"warnings":[]},{"id":"1","entities":[{"bingId":"56ff0719-4791-406b-99de-0e99c3e8cefc","name":"Steve Ballmer","matches":[{"text":"Steve Ballmer","offset":0,"length":13,"confidenceScore":0.92}],"language":"en","id":"Steve Ballmer","url":"https://en.wikipedia.org/wiki/Steve_Ballmer","dataSource":"Wikipedia"},{"bingId":"cf5db860-9fd2-390d-0b6d-5ba856efed49","name":"Chief executive officer","matches":[{"text":"CEO","offset":30,"length":3,"confidenceScore":0.25}],"language":"en","id":"Chief executive officer","url":"https://en.wikipedia.org/wiki/Chief_executive_officer","dataSource":"Wikipedia"},{"bingId":"a093e9b9-90f5-a3d5-c4b8-5855e1b01f85","name":"Microsoft","matches":[{"text":"Microsoft","offset":37,"length":9,"confidenceScore":0.36}],"language":"en","id":"Microsoft","url":"https://en.wikipedia.org/wiki/Microsoft","dataSource":"Wikipedia"},{"bingId":"e23e51ed-d16f-4800-9a31-ed056168b9a2","name":"Satya Nadella","matches":[{"text":"Satya Nadella","offset":68,"length":13,"confidenceScore":0.9}],"language":"en","id":"Satya Nadella","url":"https://en.wikipedia.org/wiki/Satya_Nadella","dataSource":"Wikipedia"}],"warnings":[]}],"errors":[],"modelVersion":"2021-06-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '61',
  'apim-request-id',
  '33c449dd-c8ac-4fd0-950d-4a891a6b8ab0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 22:45:56 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/analyze/jobs/3fbb34bd-7d1f-4699-ba45-a771808164d7')
  .query(true)
  .reply(200, {"jobId":"3fbb34bd-7d1f-4699-ba45-a771808164d7","lastUpdateDateTime":"2021-08-03T22:45:55Z","createdDateTime":"2021-08-03T22:45:24Z","expirationDateTime":"2021-08-04T22:45:24Z","status":"succeeded","errors":[],"displayName":"NA","tasks":{"completed":1,"failed":0,"inProgress":0,"total":1,"entityLinkingTasks":[{"lastUpdateDateTime":"2021-08-03T22:45:55.1695347Z","taskName":"EntityLinking_latest","state":"succeeded","results":{"documents":[{"id":"0","entities":[{"bingId":"a093e9b9-90f5-a3d5-c4b8-5855e1b01f85","name":"Microsoft","matches":[{"text":"Microsoft","offset":0,"length":9,"confidenceScore":0.39}],"language":"en","id":"Microsoft","url":"https://en.wikipedia.org/wiki/Microsoft","dataSource":"Wikipedia"},{"bingId":"a2e3a3eb-b83e-42f0-bf19-95b4c4c9d3c0","name":"Bellevue, Washington","matches":[{"text":"Bellevue, Washington","offset":36,"length":20,"confidenceScore":0.87}],"language":"en","id":"Bellevue, Washington","url":"https://en.wikipedia.org/wiki/Bellevue,_Washington","dataSource":"Wikipedia"},{"bingId":"19fb6fb4-3c50-f314-30e4-7b5470e08274","name":"Briann January","matches":[{"text":"January","offset":60,"length":7,"confidenceScore":0.14}],"language":"en","id":"Briann January","url":"https://en.wikipedia.org/wiki/Briann_January","dataSource":"Wikipedia"}],"warnings":[]},{"id":"1","entities":[{"bingId":"56ff0719-4791-406b-99de-0e99c3e8cefc","name":"Steve Ballmer","matches":[{"text":"Steve Ballmer","offset":0,"length":13,"confidenceScore":0.92}],"language":"en","id":"Steve Ballmer","url":"https://en.wikipedia.org/wiki/Steve_Ballmer","dataSource":"Wikipedia"},{"bingId":"cf5db860-9fd2-390d-0b6d-5ba856efed49","name":"Chief executive officer","matches":[{"text":"CEO","offset":30,"length":3,"confidenceScore":0.25}],"language":"en","id":"Chief executive officer","url":"https://en.wikipedia.org/wiki/Chief_executive_officer","dataSource":"Wikipedia"},{"bingId":"a093e9b9-90f5-a3d5-c4b8-5855e1b01f85","name":"Microsoft","matches":[{"text":"Microsoft","offset":37,"length":9,"confidenceScore":0.36}],"language":"en","id":"Microsoft","url":"https://en.wikipedia.org/wiki/Microsoft","dataSource":"Wikipedia"},{"bingId":"e23e51ed-d16f-4800-9a31-ed056168b9a2","name":"Satya Nadella","matches":[{"text":"Satya Nadella","offset":68,"length":13,"confidenceScore":0.9}],"language":"en","id":"Satya Nadella","url":"https://en.wikipedia.org/wiki/Satya_Nadella","dataSource":"Wikipedia"}],"warnings":[]}],"errors":[],"modelVersion":"2021-06-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '66',
  'apim-request-id',
  'eb2ee1e0-6581-48c3-9fad-9b6d48703b08',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 22:45:56 GMT'
]);

let nock = require('nock');

module.exports.hash = "d7e8054512e98cb5ba9ae070e69b37f0";

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
  '070e4ab8-c387-455f-ad4e-f470187d7101',
  'x-ms-ests-server',
  '2.1.11829.4 - SCUS ProdSlices',
  'Set-Cookie',
  'fpc=Alzs-a_zlZhFj2AARRsDwrZz_bg1EAAAAGRWZ9gOAAAA; expires=Sun, 25-Jul-2021 04:47:19 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevre_u8pVMZnMKtjfViQt6EtJ-_hcsnXqbkErw8bkJ4waq-i4qhKiJ4w03WCO2GmETheJ08TcuGkY0YOTHTlSORt4QOxm4EpbzzV9-1p23EOi6kL3nznxb5yHmDFKKc0r3Rsl3ihOpEz0_ll24trxAPWPuVAcy766gdh0L_Wx4tdpsgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 25 Jun 2021 04:47:18 GMT',
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
  'f2e63153-a4b7-47e0-9beb-055d96bb4800',
  'x-ms-ests-server',
  '2.1.11829.9 - EUS ProdSlices',
  'Set-Cookie',
  'fpc=Alzs-a_zlZhFj2AARRsDwrZz_bg1EAAAAGRWZ9gOAAAA; expires=Sun, 25-Jul-2021 04:47:19 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrxdvXFvxEK00f_2hdFtBYIwS3gaLB79K2YBHLnMzIfDOBALT_Adkh1PjstVc9dQXrRL0BNlkaSiSWxn8AR-wpkDDNgcx6Ud03QhELENzzCswyAbpwbfIapHg-Ye-rLCBqcelaQhYe0zrmkmVY6PU8zRO2DkYEwS0u8sVJnj0AWncgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 25 Jun 2021 04:47:18 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.1.0&x-client-OS=linux&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=2|771,0|,&x-client-last-telemetry=2|0|||0,0&client-request-id=d2f5d855-a47c-45c4-a802-ac064e97b258&client_secret=azure_client_secret")
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
  'bbfe9287-9b7e-49f2-8220-eeef48ca4400',
  'x-ms-ests-server',
  '2.1.11829.9 - NCUS ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=Alzs-a_zlZhFj2AARRsDwrZz_bg1EAAAAGRWZ9gOAAAA; expires=Sun, 25-Jul-2021 04:47:19 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 25 Jun 2021 04:47:18 GMT',
  'Content-Length',
  '1331'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('//text/analytics/v3.1/analyze', {"analysisInput":{"documents":[{"id":"1","text":"Microsoft was founded by Bill Gates and Paul Allen","language":"en"},{"id":"2","text":"Microsoft fue fundado por Bill Gates y Paul Allen","language":"es"}]},"tasks":{"keyPhraseExtractionTasks":[{"parameters":{"model-version":"latest"}}]}})
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'operation-location',
  'https://endpoint/text/analytics/v3.1/analyze/jobs/38863618-ef63-4786-ad1c-b5e2c4d1b105',
  'x-envoy-upstream-service-time',
  '3025',
  'apim-request-id',
  'bb6458fa-9f5d-45b0-8d16-b09a397066f5',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 04:47:22 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/38863618-ef63-4786-ad1c-b5e2c4d1b105')
  .query(true)
  .reply(200, {"jobId":"38863618-ef63-4786-ad1c-b5e2c4d1b105","lastUpdateDateTime":"2021-06-25T04:47:22Z","createdDateTime":"2021-06-25T04:47:19Z","expirationDateTime":"2021-06-26T04:47:19Z","status":"notStarted","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '23',
  'apim-request-id',
  '4333f3c3-6d6d-4c08-92ab-d17a563f89e7',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 04:47:22 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/38863618-ef63-4786-ad1c-b5e2c4d1b105')
  .query(true)
  .reply(200, {"jobId":"38863618-ef63-4786-ad1c-b5e2c4d1b105","lastUpdateDateTime":"2021-06-25T04:47:22Z","createdDateTime":"2021-06-25T04:47:19Z","expirationDateTime":"2021-06-26T04:47:19Z","status":"notStarted","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '54',
  'apim-request-id',
  '6f87d2ba-d1f2-4614-9884-84dc986db3ef',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 04:47:22 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/38863618-ef63-4786-ad1c-b5e2c4d1b105')
  .query(true)
  .reply(200, {"jobId":"38863618-ef63-4786-ad1c-b5e2c4d1b105","lastUpdateDateTime":"2021-06-25T04:47:22Z","createdDateTime":"2021-06-25T04:47:19Z","expirationDateTime":"2021-06-26T04:47:19Z","status":"notStarted","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '9',
  'apim-request-id',
  'a4564e25-7b26-4a61-97b3-3509033d1467',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 04:47:24 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/38863618-ef63-4786-ad1c-b5e2c4d1b105')
  .query(true)
  .reply(200, {"jobId":"38863618-ef63-4786-ad1c-b5e2c4d1b105","lastUpdateDateTime":"2021-06-25T04:47:22Z","createdDateTime":"2021-06-25T04:47:19Z","expirationDateTime":"2021-06-26T04:47:19Z","status":"notStarted","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '173',
  'apim-request-id',
  'ddbe1027-a252-44b2-9c98-579b32584110',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 04:47:26 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/38863618-ef63-4786-ad1c-b5e2c4d1b105')
  .query(true)
  .reply(200, {"jobId":"38863618-ef63-4786-ad1c-b5e2c4d1b105","lastUpdateDateTime":"2021-06-25T04:47:28Z","createdDateTime":"2021-06-25T04:47:19Z","expirationDateTime":"2021-06-26T04:47:19Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '9',
  'apim-request-id',
  '5419876f-b910-415e-8b88-eefa7e529f54',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 04:47:29 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/38863618-ef63-4786-ad1c-b5e2c4d1b105')
  .query(true)
  .reply(200, {"jobId":"38863618-ef63-4786-ad1c-b5e2c4d1b105","lastUpdateDateTime":"2021-06-25T04:47:28Z","createdDateTime":"2021-06-25T04:47:19Z","expirationDateTime":"2021-06-26T04:47:19Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '8',
  'apim-request-id',
  '95ecf18e-d173-446c-9928-5272dc8bc0fb',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 04:47:31 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/38863618-ef63-4786-ad1c-b5e2c4d1b105')
  .query(true)
  .reply(200, {"jobId":"38863618-ef63-4786-ad1c-b5e2c4d1b105","lastUpdateDateTime":"2021-06-25T04:47:28Z","createdDateTime":"2021-06-25T04:47:19Z","expirationDateTime":"2021-06-26T04:47:19Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '10',
  'apim-request-id',
  'e5a7de25-a82b-4f2c-9e13-d656607b8bba',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 04:47:32 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/38863618-ef63-4786-ad1c-b5e2c4d1b105')
  .query(true)
  .reply(200, {"jobId":"38863618-ef63-4786-ad1c-b5e2c4d1b105","lastUpdateDateTime":"2021-06-25T04:47:28Z","createdDateTime":"2021-06-25T04:47:19Z","expirationDateTime":"2021-06-26T04:47:19Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '15',
  'apim-request-id',
  '0e2fe635-57fe-482e-9bde-2807a9bf606b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 04:47:34 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/38863618-ef63-4786-ad1c-b5e2c4d1b105')
  .query(true)
  .reply(200, {"jobId":"38863618-ef63-4786-ad1c-b5e2c4d1b105","lastUpdateDateTime":"2021-06-25T04:47:28Z","createdDateTime":"2021-06-25T04:47:19Z","expirationDateTime":"2021-06-26T04:47:19Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  'a5c7231e-16ec-444e-99c5-f1da4342ba5b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 04:47:37 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/38863618-ef63-4786-ad1c-b5e2c4d1b105')
  .query(true)
  .reply(200, {"jobId":"38863618-ef63-4786-ad1c-b5e2c4d1b105","lastUpdateDateTime":"2021-06-25T04:47:28Z","createdDateTime":"2021-06-25T04:47:19Z","expirationDateTime":"2021-06-26T04:47:19Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '13',
  'apim-request-id',
  '07cacc43-391f-483c-972f-9a37aea9558a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 04:47:39 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/38863618-ef63-4786-ad1c-b5e2c4d1b105')
  .query(true)
  .reply(200, {"jobId":"38863618-ef63-4786-ad1c-b5e2c4d1b105","lastUpdateDateTime":"2021-06-25T04:47:28Z","createdDateTime":"2021-06-25T04:47:19Z","expirationDateTime":"2021-06-26T04:47:19Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  '53be16c5-7656-4432-90e4-4485a79fb54d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 04:47:41 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/38863618-ef63-4786-ad1c-b5e2c4d1b105')
  .query(true)
  .reply(200, {"jobId":"38863618-ef63-4786-ad1c-b5e2c4d1b105","lastUpdateDateTime":"2021-06-25T04:47:28Z","createdDateTime":"2021-06-25T04:47:19Z","expirationDateTime":"2021-06-26T04:47:19Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '8',
  'apim-request-id',
  'e4587c2f-7a87-4b22-9dd9-702d72fae5db',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 04:47:43 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/38863618-ef63-4786-ad1c-b5e2c4d1b105')
  .query(true)
  .reply(200, {"jobId":"38863618-ef63-4786-ad1c-b5e2c4d1b105","lastUpdateDateTime":"2021-06-25T04:47:28Z","createdDateTime":"2021-06-25T04:47:19Z","expirationDateTime":"2021-06-26T04:47:19Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '8',
  'apim-request-id',
  '5d0cf5b1-c91b-4ecb-a63e-5e56512443e4',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 04:47:45 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/38863618-ef63-4786-ad1c-b5e2c4d1b105')
  .query(true)
  .reply(200, {"jobId":"38863618-ef63-4786-ad1c-b5e2c4d1b105","lastUpdateDateTime":"2021-06-25T04:47:28Z","createdDateTime":"2021-06-25T04:47:19Z","expirationDateTime":"2021-06-26T04:47:19Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '9',
  'apim-request-id',
  '66e47433-7d9f-478c-973b-ce83055659af',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 04:47:47 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/38863618-ef63-4786-ad1c-b5e2c4d1b105')
  .query(true)
  .reply(200, {"jobId":"38863618-ef63-4786-ad1c-b5e2c4d1b105","lastUpdateDateTime":"2021-06-25T04:47:28Z","createdDateTime":"2021-06-25T04:47:19Z","expirationDateTime":"2021-06-26T04:47:19Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  '6116fe4c-b2c7-41d0-864c-01b4dd57c84b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 04:47:48 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/38863618-ef63-4786-ad1c-b5e2c4d1b105')
  .query(true)
  .reply(200, {"jobId":"38863618-ef63-4786-ad1c-b5e2c4d1b105","lastUpdateDateTime":"2021-06-25T04:47:28Z","createdDateTime":"2021-06-25T04:47:19Z","expirationDateTime":"2021-06-26T04:47:19Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  '5a4ab4b8-5683-41d2-ac5c-0daee7e36eff',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 04:47:51 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/38863618-ef63-4786-ad1c-b5e2c4d1b105')
  .query(true)
  .reply(200, {"jobId":"38863618-ef63-4786-ad1c-b5e2c4d1b105","lastUpdateDateTime":"2021-06-25T04:47:28Z","createdDateTime":"2021-06-25T04:47:19Z","expirationDateTime":"2021-06-26T04:47:19Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '8',
  'apim-request-id',
  'd9a3be34-cb22-4b58-8183-f8191b472564',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 04:47:53 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/38863618-ef63-4786-ad1c-b5e2c4d1b105')
  .query(true)
  .reply(200, {"jobId":"38863618-ef63-4786-ad1c-b5e2c4d1b105","lastUpdateDateTime":"2021-06-25T04:47:28Z","createdDateTime":"2021-06-25T04:47:19Z","expirationDateTime":"2021-06-26T04:47:19Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  'b54a83ea-1033-41fd-88ee-c6941ff59fb0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 04:47:55 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/38863618-ef63-4786-ad1c-b5e2c4d1b105')
  .query(true)
  .reply(200, {"jobId":"38863618-ef63-4786-ad1c-b5e2c4d1b105","lastUpdateDateTime":"2021-06-25T04:47:28Z","createdDateTime":"2021-06-25T04:47:19Z","expirationDateTime":"2021-06-26T04:47:19Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '9',
  'apim-request-id',
  '41b1d90c-6c45-4440-b1e9-384875c1073f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 04:47:57 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/38863618-ef63-4786-ad1c-b5e2c4d1b105')
  .query(true)
  .reply(200, {"jobId":"38863618-ef63-4786-ad1c-b5e2c4d1b105","lastUpdateDateTime":"2021-06-25T04:47:28Z","createdDateTime":"2021-06-25T04:47:19Z","expirationDateTime":"2021-06-26T04:47:19Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '8',
  'apim-request-id',
  'b9b4b61d-4b6d-4e94-a371-ac15a5fe7ef9',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 04:47:59 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/38863618-ef63-4786-ad1c-b5e2c4d1b105')
  .query(true)
  .reply(200, {"jobId":"38863618-ef63-4786-ad1c-b5e2c4d1b105","lastUpdateDateTime":"2021-06-25T04:47:28Z","createdDateTime":"2021-06-25T04:47:19Z","expirationDateTime":"2021-06-26T04:47:19Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '9',
  'apim-request-id',
  '8356195b-bfb8-43a2-bbf9-b61f6c2d032a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 04:48:01 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/38863618-ef63-4786-ad1c-b5e2c4d1b105')
  .query(true)
  .reply(200, {"jobId":"38863618-ef63-4786-ad1c-b5e2c4d1b105","lastUpdateDateTime":"2021-06-25T04:47:28Z","createdDateTime":"2021-06-25T04:47:19Z","expirationDateTime":"2021-06-26T04:47:19Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '8',
  'apim-request-id',
  '074aab4f-8141-4f76-b85b-82ece9001df1',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 04:48:04 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/38863618-ef63-4786-ad1c-b5e2c4d1b105')
  .query(true)
  .reply(200, {"jobId":"38863618-ef63-4786-ad1c-b5e2c4d1b105","lastUpdateDateTime":"2021-06-25T04:47:28Z","createdDateTime":"2021-06-25T04:47:19Z","expirationDateTime":"2021-06-26T04:47:19Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  'b7a37381-7bf0-4903-9190-049d3002c0ed',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 04:48:06 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/38863618-ef63-4786-ad1c-b5e2c4d1b105')
  .query(true)
  .reply(200, {"jobId":"38863618-ef63-4786-ad1c-b5e2c4d1b105","lastUpdateDateTime":"2021-06-25T04:47:28Z","createdDateTime":"2021-06-25T04:47:19Z","expirationDateTime":"2021-06-26T04:47:19Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  'b613a4b8-4c5e-4d65-928d-c21259d7f707',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 04:48:08 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/38863618-ef63-4786-ad1c-b5e2c4d1b105')
  .query(true)
  .reply(200, {"jobId":"38863618-ef63-4786-ad1c-b5e2c4d1b105","lastUpdateDateTime":"2021-06-25T04:48:08Z","createdDateTime":"2021-06-25T04:47:19Z","expirationDateTime":"2021-06-26T04:47:19Z","status":"succeeded","errors":[],"displayName":"NA","tasks":{"completed":1,"failed":0,"inProgress":0,"total":1,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-06-25T04:48:08.5699228Z","taskName":"KeyPhraseExtraction_latest","state":"succeeded","results":{"documents":[{"id":"1","keyPhrases":["Bill Gates","Paul Allen","Microsoft"],"warnings":[]},{"id":"2","keyPhrases":["Bill Gates","Paul Allen","Microsoft"],"warnings":[]}],"errors":[],"modelVersion":"2021-06-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '51',
  'apim-request-id',
  '60bcc1b1-d3e2-4a10-b439-d3e1dac3740b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 04:48:10 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/38863618-ef63-4786-ad1c-b5e2c4d1b105')
  .query(true)
  .reply(200, {"jobId":"38863618-ef63-4786-ad1c-b5e2c4d1b105","lastUpdateDateTime":"2021-06-25T04:48:08Z","createdDateTime":"2021-06-25T04:47:19Z","expirationDateTime":"2021-06-26T04:47:19Z","status":"succeeded","errors":[],"displayName":"NA","tasks":{"completed":1,"failed":0,"inProgress":0,"total":1,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-06-25T04:48:08.5699228Z","taskName":"KeyPhraseExtraction_latest","state":"succeeded","results":{"documents":[{"id":"1","keyPhrases":["Bill Gates","Paul Allen","Microsoft"],"warnings":[]},{"id":"2","keyPhrases":["Bill Gates","Paul Allen","Microsoft"],"warnings":[]}],"errors":[],"modelVersion":"2021-06-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '220',
  'apim-request-id',
  'fd6ea025-85e9-4d1c-8f57-bdc089ae9273',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 04:48:10 GMT'
]);

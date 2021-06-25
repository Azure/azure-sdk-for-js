let nock = require('nock');

module.exports.hash = "e8fe4b7a699e69181a6d1d694a0b8992";

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
  '64d6105d-23b6-42ee-b2fe-1b903c780600',
  'x-ms-ests-server',
  '2.1.11829.8 - SCUS ProdSlices',
  'Set-Cookie',
  'fpc=AgwXPIJQJyxOqlZf_m27S8lz_bg1EgAAAKEmaNgOAAAA; expires=Sun, 25-Jul-2021 19:43:07 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrC2mIuF99TPSbsd6YMxS6UIVrX4SpGz3nhEfhnoKW5uvQOhW1XpZK1aasOZRkvZ0oskAcx-yH1ac7OJ8A0iRJmcb3vHw8ExwNZ2hJEDSDaVRPcpkb0q7nd8yft54Jm1pfH1iFcr-ro2MXgzhNZlb7I9y2SK3fdLCGJzvwZED1LPcgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 25 Jun 2021 19:43:07 GMT',
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
  '46746596-f429-4925-82fd-aa79fd4b7100',
  'x-ms-ests-server',
  '2.1.11829.9 - SCUS ProdSlices',
  'Set-Cookie',
  'fpc=AgwXPIJQJyxOqlZf_m27S8lz_bg1EgAAAKEmaNgOAAAA; expires=Sun, 25-Jul-2021 19:43:07 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevreO7emA0D02lRf_8GJpbNswpOQBUiOh5QA1jRDCSSc3rdGZB-fcrUPhNs02NuIMEiZ5l7Wu2wljBbfKBhREbnSQAzcaiysiK_bVt9G9Job-T6A7JMCPryyASgOKHuYmyMRM-lEeNEKrZnL5in__kIZLaPZJ1PHNRKaJEF-A8oQAUgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 25 Jun 2021 19:43:07 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.1.0&x-client-OS=linux&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=2|771,0|,&x-client-last-telemetry=2|0|||0,0&client-request-id=6e50aa4f-84fc-48ea-b9cb-c5992deaaaff&client_secret=azure_client_secret")
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
  '3fda1bdb-b195-4e81-ba11-6a2cd27d5e00',
  'x-ms-ests-server',
  '2.1.11829.9 - WUS2 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=AgwXPIJQJyxOqlZf_m27S8lz_bg1EgAAAKEmaNgOAAAA; expires=Sun, 25-Jul-2021 19:43:07 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 25 Jun 2021 19:43:07 GMT',
  'Content-Length',
  '1331'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('//text/analytics/v3.1/entities/health/jobs', {"documents":[{"id":"0","text":"Patient does not suffer from high blood pressure.","language":"en"},{"id":"1","text":"Prescribed 100mg ibuprofen, taken twice daily.","language":"en"}]})
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'operation-location',
  'https://endpoint/text/analytics/v3.1/entities/health/jobs/cc5f1a83-6b9d-4d60-a016-1cf06007ca1f',
  'x-envoy-upstream-service-time',
  '214',
  'apim-request-id',
  'd2b05fe8-81f5-4d8e-98e3-b9947e1f4ced',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:43:07 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/entities/health/jobs/cc5f1a83-6b9d-4d60-a016-1cf06007ca1f')
  .query(true)
  .reply(200, {"jobId":"cc5f1a83-6b9d-4d60-a016-1cf06007ca1f","lastUpdateDateTime":"2021-06-25T19:43:08Z","createdDateTime":"2021-06-25T19:43:07Z","expirationDateTime":"2021-06-26T19:43:07Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  '435f9570-e1f2-4ef2-93b0-38d77b412478',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:43:07 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/entities/health/jobs/cc5f1a83-6b9d-4d60-a016-1cf06007ca1f')
  .query(true)
  .reply(200, {"jobId":"cc5f1a83-6b9d-4d60-a016-1cf06007ca1f","lastUpdateDateTime":"2021-06-25T19:43:08Z","createdDateTime":"2021-06-25T19:43:07Z","expirationDateTime":"2021-06-26T19:43:07Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '6',
  'apim-request-id',
  'd7bf17d5-ca7f-4255-be5e-31c56991a3ed',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:43:07 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/entities/health/jobs/cc5f1a83-6b9d-4d60-a016-1cf06007ca1f')
  .query(true)
  .reply(200, {"jobId":"cc5f1a83-6b9d-4d60-a016-1cf06007ca1f","lastUpdateDateTime":"2021-06-25T19:43:08Z","createdDateTime":"2021-06-25T19:43:07Z","expirationDateTime":"2021-06-26T19:43:07Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '15',
  'apim-request-id',
  '3c12add9-7525-4772-b371-e91a52db11f1',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:43:09 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/entities/health/jobs/cc5f1a83-6b9d-4d60-a016-1cf06007ca1f')
  .query(true)
  .reply(200, {"jobId":"cc5f1a83-6b9d-4d60-a016-1cf06007ca1f","lastUpdateDateTime":"2021-06-25T19:43:08Z","createdDateTime":"2021-06-25T19:43:07Z","expirationDateTime":"2021-06-26T19:43:07Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  'ab81e245-87fc-479f-b446-42c208aab25b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:43:11 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/entities/health/jobs/cc5f1a83-6b9d-4d60-a016-1cf06007ca1f')
  .query(true)
  .reply(200, {"jobId":"cc5f1a83-6b9d-4d60-a016-1cf06007ca1f","lastUpdateDateTime":"2021-06-25T19:43:08Z","createdDateTime":"2021-06-25T19:43:07Z","expirationDateTime":"2021-06-26T19:43:07Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '5',
  'apim-request-id',
  'ead090f9-dbc4-444b-9ff0-28beb7cb2970',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:43:13 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/entities/health/jobs/cc5f1a83-6b9d-4d60-a016-1cf06007ca1f')
  .query(true)
  .reply(200, {"jobId":"cc5f1a83-6b9d-4d60-a016-1cf06007ca1f","lastUpdateDateTime":"2021-06-25T19:43:08Z","createdDateTime":"2021-06-25T19:43:07Z","expirationDateTime":"2021-06-26T19:43:07Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '9',
  'apim-request-id',
  'dcac3f77-d8fb-489b-87ce-1c65a3df0762',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:43:15 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/entities/health/jobs/cc5f1a83-6b9d-4d60-a016-1cf06007ca1f')
  .query(true)
  .reply(200, {"jobId":"cc5f1a83-6b9d-4d60-a016-1cf06007ca1f","lastUpdateDateTime":"2021-06-25T19:43:08Z","createdDateTime":"2021-06-25T19:43:07Z","expirationDateTime":"2021-06-26T19:43:07Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '8',
  'apim-request-id',
  '6c93c68a-e5ef-450f-9da2-96a292666820',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:43:17 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/entities/health/jobs/cc5f1a83-6b9d-4d60-a016-1cf06007ca1f')
  .query(true)
  .reply(200, {"jobId":"cc5f1a83-6b9d-4d60-a016-1cf06007ca1f","lastUpdateDateTime":"2021-06-25T19:43:08Z","createdDateTime":"2021-06-25T19:43:07Z","expirationDateTime":"2021-06-26T19:43:07Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '14',
  'apim-request-id',
  '4109dd42-3004-438f-817a-9e623d7dd3b1',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:43:19 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/entities/health/jobs/cc5f1a83-6b9d-4d60-a016-1cf06007ca1f')
  .query(true)
  .reply(200, {"jobId":"cc5f1a83-6b9d-4d60-a016-1cf06007ca1f","lastUpdateDateTime":"2021-06-25T19:43:08Z","createdDateTime":"2021-06-25T19:43:07Z","expirationDateTime":"2021-06-26T19:43:07Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '11',
  'apim-request-id',
  '3e7cdda4-570e-4338-aed8-051e57228a7e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:43:22 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/entities/health/jobs/cc5f1a83-6b9d-4d60-a016-1cf06007ca1f')
  .query(true)
  .reply(200, {"jobId":"cc5f1a83-6b9d-4d60-a016-1cf06007ca1f","lastUpdateDateTime":"2021-06-25T19:43:08Z","createdDateTime":"2021-06-25T19:43:07Z","expirationDateTime":"2021-06-26T19:43:07Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '8',
  'apim-request-id',
  '000d925a-df12-469a-8256-8d0c362d66a6',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:43:24 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/entities/health/jobs/cc5f1a83-6b9d-4d60-a016-1cf06007ca1f')
  .query(true)
  .reply(200, {"jobId":"cc5f1a83-6b9d-4d60-a016-1cf06007ca1f","lastUpdateDateTime":"2021-06-25T19:43:25Z","createdDateTime":"2021-06-25T19:43:07Z","expirationDateTime":"2021-06-26T19:43:07Z","status":"running","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '18',
  'apim-request-id',
  'dc75352a-b171-4ede-85dd-cb990dc1d57d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:43:26 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/entities/health/jobs/cc5f1a83-6b9d-4d60-a016-1cf06007ca1f')
  .query(true)
  .reply(200, {"jobId":"cc5f1a83-6b9d-4d60-a016-1cf06007ca1f","lastUpdateDateTime":"2021-06-25T19:43:25Z","createdDateTime":"2021-06-25T19:43:07Z","expirationDateTime":"2021-06-26T19:43:07Z","status":"running","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '8',
  'apim-request-id',
  'd77304b1-b4c9-49cc-b63b-df81c20cca42',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:43:28 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/entities/health/jobs/cc5f1a83-6b9d-4d60-a016-1cf06007ca1f')
  .query(true)
  .reply(200, {"jobId":"cc5f1a83-6b9d-4d60-a016-1cf06007ca1f","lastUpdateDateTime":"2021-06-25T19:43:25Z","createdDateTime":"2021-06-25T19:43:07Z","expirationDateTime":"2021-06-26T19:43:07Z","status":"running","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '10',
  'apim-request-id',
  '7db22444-0302-4304-a4fa-cf6cfaba5131',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:43:30 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/entities/health/jobs/cc5f1a83-6b9d-4d60-a016-1cf06007ca1f')
  .query(true)
  .reply(200, {"jobId":"cc5f1a83-6b9d-4d60-a016-1cf06007ca1f","lastUpdateDateTime":"2021-06-25T19:43:25Z","createdDateTime":"2021-06-25T19:43:07Z","expirationDateTime":"2021-06-26T19:43:07Z","status":"running","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  '1ae5267d-b6a9-4478-a70e-7684a447f035',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:43:32 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/entities/health/jobs/cc5f1a83-6b9d-4d60-a016-1cf06007ca1f')
  .query(true)
  .reply(200, {"jobId":"cc5f1a83-6b9d-4d60-a016-1cf06007ca1f","lastUpdateDateTime":"2021-06-25T19:43:25Z","createdDateTime":"2021-06-25T19:43:07Z","expirationDateTime":"2021-06-26T19:43:07Z","status":"running","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '17',
  'apim-request-id',
  'c269a7c6-b125-411a-9251-45471e15da62',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:43:34 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/entities/health/jobs/cc5f1a83-6b9d-4d60-a016-1cf06007ca1f')
  .query(true)
  .reply(200, {"jobId":"cc5f1a83-6b9d-4d60-a016-1cf06007ca1f","lastUpdateDateTime":"2021-06-25T19:43:25Z","createdDateTime":"2021-06-25T19:43:07Z","expirationDateTime":"2021-06-26T19:43:07Z","status":"running","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '39',
  'apim-request-id',
  '2dd98b69-afcd-4ac0-80f0-0aad54a5838e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:43:36 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/entities/health/jobs/cc5f1a83-6b9d-4d60-a016-1cf06007ca1f')
  .query(true)
  .reply(200, {"jobId":"cc5f1a83-6b9d-4d60-a016-1cf06007ca1f","lastUpdateDateTime":"2021-06-25T19:43:25Z","createdDateTime":"2021-06-25T19:43:07Z","expirationDateTime":"2021-06-26T19:43:07Z","status":"running","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '8',
  'apim-request-id',
  'b167e6a7-1aa7-4440-9e81-90661eb986ad',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:43:38 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/entities/health/jobs/cc5f1a83-6b9d-4d60-a016-1cf06007ca1f')
  .query(true)
  .reply(200, {"jobId":"cc5f1a83-6b9d-4d60-a016-1cf06007ca1f","lastUpdateDateTime":"2021-06-25T19:43:40Z","createdDateTime":"2021-06-25T19:43:07Z","expirationDateTime":"2021-06-26T19:43:07Z","status":"succeeded","errors":[],"results":{"documents":[{"id":"0","entities":[{"offset":29,"length":19,"text":"high blood pressure","category":"SymptomOrSign","confidenceScore":1,"assertion":{"certainty":"negative"},"name":"Hypertensive disease","links":[{"dataSource":"UMLS","id":"C0020538"},{"dataSource":"AOD","id":"0000023317"},{"dataSource":"BI","id":"BI00001"},{"dataSource":"CCPSS","id":"1017493"},{"dataSource":"CCS","id":"7.1"},{"dataSource":"CHV","id":"0000015800"},{"dataSource":"COSTAR","id":"397"},{"dataSource":"CSP","id":"0571-5243"},{"dataSource":"CST","id":"HYPERTENS"},{"dataSource":"DXP","id":"U002034"},{"dataSource":"HPO","id":"HP:0000822"},{"dataSource":"ICD10","id":"I10-I15.9"},{"dataSource":"ICD10AM","id":"I10-I15.9"},{"dataSource":"ICD10CM","id":"I10"},{"dataSource":"ICD9CM","id":"997.91"},{"dataSource":"ICPC2ICD10ENG","id":"MTHU035456"},{"dataSource":"ICPC2P","id":"K85004"},{"dataSource":"LCH","id":"U002317"},{"dataSource":"LCH_NW","id":"sh85063723"},{"dataSource":"LNC","id":"LA14293-7"},{"dataSource":"MDR","id":"10020772"},{"dataSource":"MEDCIN","id":"33288"},{"dataSource":"MEDLINEPLUS","id":"34"},{"dataSource":"MSH","id":"D006973"},{"dataSource":"MTH","id":"005"},{"dataSource":"MTHICD9","id":"997.91"},{"dataSource":"NANDA-I","id":"00905"},{"dataSource":"NCI","id":"C3117"},{"dataSource":"NCI_CPTAC","id":"C3117"},{"dataSource":"NCI_CTCAE","id":"E13785"},{"dataSource":"NCI_CTRP","id":"C3117"},{"dataSource":"NCI_FDA","id":"1908"},{"dataSource":"NCI_GDC","id":"C3117"},{"dataSource":"NCI_NCI-GLOSS","id":"CDR0000458091"},{"dataSource":"NCI_NICHD","id":"C3117"},{"dataSource":"NOC","id":"060808"},{"dataSource":"OMIM","id":"MTHU002068"},{"dataSource":"PCDS","id":"PRB_11000.06"},{"dataSource":"PDQ","id":"CDR0000686951"},{"dataSource":"PSY","id":"23830"},{"dataSource":"RCD","id":"XE0Ub"},{"dataSource":"SNM","id":"F-70700"},{"dataSource":"SNMI","id":"D3-02000"},{"dataSource":"SNOMEDCT_US","id":"38341003"},{"dataSource":"WHO","id":"0210"}]}],"relations":[],"warnings":[]},{"id":"1","entities":[{"offset":11,"length":5,"text":"100mg","category":"Dosage","confidenceScore":1},{"offset":17,"length":9,"text":"ibuprofen","category":"MedicationName","confidenceScore":1,"name":"ibuprofen","links":[{"dataSource":"UMLS","id":"C0020740"},{"dataSource":"AOD","id":"0000019879"},{"dataSource":"ATC","id":"M01AE01"},{"dataSource":"CCPSS","id":"0046165"},{"dataSource":"CHV","id":"0000006519"},{"dataSource":"CSP","id":"2270-2077"},{"dataSource":"DRUGBANK","id":"DB01050"},{"dataSource":"GS","id":"1611"},{"dataSource":"LCH_NW","id":"sh97005926"},{"dataSource":"LNC","id":"LP16165-0"},{"dataSource":"MEDCIN","id":"40458"},{"dataSource":"MMSL","id":"d00015"},{"dataSource":"MSH","id":"D007052"},{"dataSource":"MTHSPL","id":"WK2XYI10QM"},{"dataSource":"NCI","id":"C561"},{"dataSource":"NCI_CTRP","id":"C561"},{"dataSource":"NCI_DCP","id":"00803"},{"dataSource":"NCI_DTP","id":"NSC0256857"},{"dataSource":"NCI_FDA","id":"WK2XYI10QM"},{"dataSource":"NCI_NCI-GLOSS","id":"CDR0000613511"},{"dataSource":"NDDF","id":"002377"},{"dataSource":"PDQ","id":"CDR0000040475"},{"dataSource":"RCD","id":"x02MO"},{"dataSource":"RXNORM","id":"5640"},{"dataSource":"SNM","id":"E-7772"},{"dataSource":"SNMI","id":"C-603C0"},{"dataSource":"SNOMEDCT_US","id":"387207008"},{"dataSource":"USP","id":"m39860"},{"dataSource":"USPMG","id":"MTHU000060"},{"dataSource":"VANDF","id":"4017840"}]},{"offset":34,"length":11,"text":"twice daily","category":"Frequency","confidenceScore":1}],"relations":[{"relationType":"DosageOfMedication","entities":[{"ref":"#/results/documents/1/entities/0","role":"Dosage"},{"ref":"#/results/documents/1/entities/1","role":"Medication"}]},{"relationType":"FrequencyOfMedication","entities":[{"ref":"#/results/documents/1/entities/1","role":"Medication"},{"ref":"#/results/documents/1/entities/2","role":"Frequency"}]}],"warnings":[]}],"errors":[],"modelVersion":"2021-05-15"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '75',
  'apim-request-id',
  'b0617752-3634-4c80-a856-4b7cd589bed6',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:43:41 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/entities/health/jobs/cc5f1a83-6b9d-4d60-a016-1cf06007ca1f')
  .query(true)
  .reply(200, {"jobId":"cc5f1a83-6b9d-4d60-a016-1cf06007ca1f","lastUpdateDateTime":"2021-06-25T19:43:40Z","createdDateTime":"2021-06-25T19:43:07Z","expirationDateTime":"2021-06-26T19:43:07Z","status":"succeeded","errors":[],"results":{"documents":[{"id":"0","entities":[{"offset":29,"length":19,"text":"high blood pressure","category":"SymptomOrSign","confidenceScore":1,"assertion":{"certainty":"negative"},"name":"Hypertensive disease","links":[{"dataSource":"UMLS","id":"C0020538"},{"dataSource":"AOD","id":"0000023317"},{"dataSource":"BI","id":"BI00001"},{"dataSource":"CCPSS","id":"1017493"},{"dataSource":"CCS","id":"7.1"},{"dataSource":"CHV","id":"0000015800"},{"dataSource":"COSTAR","id":"397"},{"dataSource":"CSP","id":"0571-5243"},{"dataSource":"CST","id":"HYPERTENS"},{"dataSource":"DXP","id":"U002034"},{"dataSource":"HPO","id":"HP:0000822"},{"dataSource":"ICD10","id":"I10-I15.9"},{"dataSource":"ICD10AM","id":"I10-I15.9"},{"dataSource":"ICD10CM","id":"I10"},{"dataSource":"ICD9CM","id":"997.91"},{"dataSource":"ICPC2ICD10ENG","id":"MTHU035456"},{"dataSource":"ICPC2P","id":"K85004"},{"dataSource":"LCH","id":"U002317"},{"dataSource":"LCH_NW","id":"sh85063723"},{"dataSource":"LNC","id":"LA14293-7"},{"dataSource":"MDR","id":"10020772"},{"dataSource":"MEDCIN","id":"33288"},{"dataSource":"MEDLINEPLUS","id":"34"},{"dataSource":"MSH","id":"D006973"},{"dataSource":"MTH","id":"005"},{"dataSource":"MTHICD9","id":"997.91"},{"dataSource":"NANDA-I","id":"00905"},{"dataSource":"NCI","id":"C3117"},{"dataSource":"NCI_CPTAC","id":"C3117"},{"dataSource":"NCI_CTCAE","id":"E13785"},{"dataSource":"NCI_CTRP","id":"C3117"},{"dataSource":"NCI_FDA","id":"1908"},{"dataSource":"NCI_GDC","id":"C3117"},{"dataSource":"NCI_NCI-GLOSS","id":"CDR0000458091"},{"dataSource":"NCI_NICHD","id":"C3117"},{"dataSource":"NOC","id":"060808"},{"dataSource":"OMIM","id":"MTHU002068"},{"dataSource":"PCDS","id":"PRB_11000.06"},{"dataSource":"PDQ","id":"CDR0000686951"},{"dataSource":"PSY","id":"23830"},{"dataSource":"RCD","id":"XE0Ub"},{"dataSource":"SNM","id":"F-70700"},{"dataSource":"SNMI","id":"D3-02000"},{"dataSource":"SNOMEDCT_US","id":"38341003"},{"dataSource":"WHO","id":"0210"}]}],"relations":[],"warnings":[]},{"id":"1","entities":[{"offset":11,"length":5,"text":"100mg","category":"Dosage","confidenceScore":1},{"offset":17,"length":9,"text":"ibuprofen","category":"MedicationName","confidenceScore":1,"name":"ibuprofen","links":[{"dataSource":"UMLS","id":"C0020740"},{"dataSource":"AOD","id":"0000019879"},{"dataSource":"ATC","id":"M01AE01"},{"dataSource":"CCPSS","id":"0046165"},{"dataSource":"CHV","id":"0000006519"},{"dataSource":"CSP","id":"2270-2077"},{"dataSource":"DRUGBANK","id":"DB01050"},{"dataSource":"GS","id":"1611"},{"dataSource":"LCH_NW","id":"sh97005926"},{"dataSource":"LNC","id":"LP16165-0"},{"dataSource":"MEDCIN","id":"40458"},{"dataSource":"MMSL","id":"d00015"},{"dataSource":"MSH","id":"D007052"},{"dataSource":"MTHSPL","id":"WK2XYI10QM"},{"dataSource":"NCI","id":"C561"},{"dataSource":"NCI_CTRP","id":"C561"},{"dataSource":"NCI_DCP","id":"00803"},{"dataSource":"NCI_DTP","id":"NSC0256857"},{"dataSource":"NCI_FDA","id":"WK2XYI10QM"},{"dataSource":"NCI_NCI-GLOSS","id":"CDR0000613511"},{"dataSource":"NDDF","id":"002377"},{"dataSource":"PDQ","id":"CDR0000040475"},{"dataSource":"RCD","id":"x02MO"},{"dataSource":"RXNORM","id":"5640"},{"dataSource":"SNM","id":"E-7772"},{"dataSource":"SNMI","id":"C-603C0"},{"dataSource":"SNOMEDCT_US","id":"387207008"},{"dataSource":"USP","id":"m39860"},{"dataSource":"USPMG","id":"MTHU000060"},{"dataSource":"VANDF","id":"4017840"}]},{"offset":34,"length":11,"text":"twice daily","category":"Frequency","confidenceScore":1}],"relations":[{"relationType":"DosageOfMedication","entities":[{"ref":"#/results/documents/1/entities/0","role":"Dosage"},{"ref":"#/results/documents/1/entities/1","role":"Medication"}]},{"relationType":"FrequencyOfMedication","entities":[{"ref":"#/results/documents/1/entities/1","role":"Medication"},{"ref":"#/results/documents/1/entities/2","role":"Frequency"}]}],"warnings":[]}],"errors":[],"modelVersion":"2021-05-15"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '68',
  'apim-request-id',
  'f0af5626-bb9f-4de5-b95d-bd585bc7b033',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:43:41 GMT'
]);

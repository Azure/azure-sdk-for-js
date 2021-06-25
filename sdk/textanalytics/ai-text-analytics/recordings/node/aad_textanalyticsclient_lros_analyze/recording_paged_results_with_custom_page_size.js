let nock = require('nock');

module.exports.hash = "fcf347f6cb241de657ea5d5a47554eaf";

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
  '8188f33f-6a57-4384-8647-026148356600',
  'x-ms-ests-server',
  '2.1.11829.9 - NCUS ProdSlices',
  'Set-Cookie',
  'fpc=AgwXPIJQJyxOqlZf_m27S8lz_bg1EgAAAKEmaNgOAAAA; expires=Sun, 25-Jul-2021 19:42:17 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevr8mt2WpXIR4hiTsB7n_QkvpgGv5O7uPugVIqt53aAQCkm7SQxlv_eA3QkCyTsA32uuywH8wuauyaeMSlhRnNcqGDWUiw6iElex1rkHsjNRTh1AkVNKUCq2xzu8GULLugs2RuMe-tvljcKWVLkaSi2YgQQ36NvVo0lVW2EgvczJ5IgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 25 Jun 2021 19:42:17 GMT',
  'Content-Length',
  '980'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .get('/88888888-8888-8888-8888-888888888888/v2.0/.well-known/openid-configuration')
  .reply(200, {"token_endpoint":"https://login.microsoftonline.com/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token","token_endpoint_auth_methods_supported":["client_secret_post","private_key_jwt","client_secret_basic"],"jwks_uri":"https://login.microsoftonline.com/88888888-8888-8888-8888-888888888888/discovery/v2.0/keys","response_modes_supported":["query","fragment","form_post"],"subject_types_supported":["pairwise"],"id_token_signing_alg_values_supported":["RS256"],"response_types_supported":["code","id_token","code id_token","id_token token"],"scopes_supported":["openid","profile","email","offline_access"],"issuer":"https://login.microsoftonline.com/88888888-8888-8888-8888-888888888888/v2.0","request_uri_parameter_supported":false,"userinfo_endpoint":"https://graph.microsoft.com/oidc/userinfo","authorization_endpoint":"https://login.microsoftonline.com/88888888-8888-8888-8888-888888888888/oauth2/v2.0/authorize","device_authorization_endpoint":"https://login.microsoftonline.com/88888888-8888-8888-8888-888888888888/oauth2/v2.0/devicecode","http_logout_supported":true,"frontchannel_logout_supported":true,"end_session_endpoint":"https://login.microsoftonline.com/88888888-8888-8888-8888-888888888888/oauth2/v2.0/logout","claims_supported":["sub","iss","cloud_instance_name","cloud_instance_host_name","cloud_graph_host_name","msgraph_host","aud","exp","iat","auth_time","acr","nonce","preferred_username","name","tid","ver","at_hash","c_hash","email"],"kerberos_endpoint":"https://login.microsoftonline.com/88888888-8888-8888-8888-888888888888/kerberos","tenant_region_scope":"WW","cloud_instance_name":"microsoftonline.com","cloud_graph_host_name":"graph.windows.net","msgraph_host":"graph.microsoft.com","rbac_url":"https://pas.windows.net"}, [
  'Cache-Control',
  'max-age=86400, private',
  'Content-Length',
  '1753',
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
  '9d80f76e-26fc-421e-9776-d8e3d0cf5b00',
  'x-ms-ests-server',
  '2.1.11829.9 - NCUS ProdSlices',
  'Set-Cookie',
  'fpc=AgwXPIJQJyxOqlZf_m27S8lz_bg1EgAAAKEmaNgOAAAA; expires=Sun, 25-Jul-2021 19:42:17 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrmU0Htg0faIQKnulVUITlaRv-04g865S56I3fKoDt18S1lLHHQr002fccuKE2ZLXuL53RuU9siMxrOyMSfv4ufN78Jd8lByqHnSN1MIl5PfTkGcYzFV41TpCTNGfpS2Ylf1GZNdjBL1JmDy6kzuwKxjwzZ3yS_vJR1fZPbYxsBb0gAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 25 Jun 2021 19:42:17 GMT'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.1.0&x-client-OS=linux&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=2|771,0|,&x-client-last-telemetry=2|0|||0,0&client-request-id=e182fc8c-8808-4679-8728-350c4be18c19&client_secret=azure_client_secret")
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
  'b7dd8c02-11f5-499e-bdfc-a9fd502f7500',
  'x-ms-ests-server',
  '2.1.11829.9 - SCUS ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=AgwXPIJQJyxOqlZf_m27S8lz_bg1EgAAAKEmaNgOAAAA; expires=Sun, 25-Jul-2021 19:42:17 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 25 Jun 2021 19:42:17 GMT',
  'Content-Length',
  '1331'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('//text/analytics/v3.1/analyze', {"analysisInput":{"documents":[{"id":"0","text":"random text","language":"en"},{"id":"1","text":"random text","language":"en"},{"id":"2","text":"random text","language":"en"},{"id":"3","text":"random text","language":"en"},{"id":"4","text":"random text","language":"en"},{"id":"5","text":"random text","language":"en"},{"id":"6","text":"random text","language":"en"},{"id":"7","text":"random text","language":"en"},{"id":"8","text":"random text","language":"en"},{"id":"9","text":"random text","language":"en"},{"id":"10","text":"random text","language":"en"},{"id":"11","text":"random text","language":"en"},{"id":"12","text":"random text","language":"en"},{"id":"13","text":"random text","language":"en"},{"id":"14","text":"random text","language":"en"},{"id":"15","text":"random text","language":"en"},{"id":"16","text":"random text","language":"en"},{"id":"17","text":"random text","language":"en"},{"id":"18","text":"random text","language":"en"},{"id":"19","text":"random text","language":"en"},{"id":"20","text":"random text","language":"en"},{"id":"21","text":"random text","language":"en"},{"id":"22","text":"random text","language":"en"},{"id":"23","text":"random text","language":"en"},{"id":"24","text":"Microsoft was founded by Bill Gates and Paul Allen","language":"en"}]},"tasks":{"entityRecognitionTasks":[{"parameters":{"model-version":"latest","stringIndexType":"Utf16CodeUnit"}}],"keyPhraseExtractionTasks":[{"parameters":{"model-version":"latest"}}]}})
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'operation-location',
  'https://endpoint/text/analytics/v3.1/analyze/jobs/83f4280c-94e2-45ef-bc23-43640f0a2480',
  'x-envoy-upstream-service-time',
  '1001',
  'apim-request-id',
  '128f09ed-b2a8-45bd-933d-f166139090f5',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:42:17 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/83f4280c-94e2-45ef-bc23-43640f0a2480')
  .query(true)
  .reply(200, {"jobId":"83f4280c-94e2-45ef-bc23-43640f0a2480","lastUpdateDateTime":"2021-06-25T19:42:18Z","createdDateTime":"2021-06-25T19:42:17Z","expirationDateTime":"2021-06-26T19:42:17Z","status":"notStarted","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":2,"total":2}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '6',
  'apim-request-id',
  'ebcb0ae8-85dc-496a-a3cf-c897aee5cb36',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:42:17 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/83f4280c-94e2-45ef-bc23-43640f0a2480')
  .query(true)
  .reply(200, {"jobId":"83f4280c-94e2-45ef-bc23-43640f0a2480","lastUpdateDateTime":"2021-06-25T19:42:18Z","createdDateTime":"2021-06-25T19:42:17Z","expirationDateTime":"2021-06-26T19:42:17Z","status":"notStarted","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":2,"total":2}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '69',
  'apim-request-id',
  'fd57e4e7-efba-4f49-bf50-88f54f713760',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:42:17 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/83f4280c-94e2-45ef-bc23-43640f0a2480')
  .query(true)
  .reply(200, {"jobId":"83f4280c-94e2-45ef-bc23-43640f0a2480","lastUpdateDateTime":"2021-06-25T19:42:20Z","createdDateTime":"2021-06-25T19:42:17Z","expirationDateTime":"2021-06-26T19:42:17Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":2,"total":2}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  '90a66932-40d3-46c9-9124-d9536a39814a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:42:19 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/83f4280c-94e2-45ef-bc23-43640f0a2480')
  .query(true)
  .reply(200, {"jobId":"83f4280c-94e2-45ef-bc23-43640f0a2480","lastUpdateDateTime":"2021-06-25T19:42:20Z","createdDateTime":"2021-06-25T19:42:17Z","expirationDateTime":"2021-06-26T19:42:17Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":2,"total":2}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  '435ed09e-01d3-461b-b25d-6b8dbbfa25c7',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:42:22 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/83f4280c-94e2-45ef-bc23-43640f0a2480')
  .query(true)
  .reply(200, {"jobId":"83f4280c-94e2-45ef-bc23-43640f0a2480","lastUpdateDateTime":"2021-06-25T19:42:20Z","createdDateTime":"2021-06-25T19:42:17Z","expirationDateTime":"2021-06-26T19:42:17Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":2,"total":2}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '6',
  'apim-request-id',
  'ce97d6e7-15b5-4c74-9316-cb48f0d73530',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:42:24 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/83f4280c-94e2-45ef-bc23-43640f0a2480')
  .query(true)
  .reply(200, {"jobId":"83f4280c-94e2-45ef-bc23-43640f0a2480","lastUpdateDateTime":"2021-06-25T19:42:26Z","createdDateTime":"2021-06-25T19:42:17Z","expirationDateTime":"2021-06-26T19:42:17Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":2,"total":2}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '8',
  'apim-request-id',
  '2ecd63bc-f079-4d07-bae7-ece7b48ebe7d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:42:26 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/83f4280c-94e2-45ef-bc23-43640f0a2480')
  .query(true)
  .reply(200, {"jobId":"83f4280c-94e2-45ef-bc23-43640f0a2480","lastUpdateDateTime":"2021-06-25T19:42:27Z","createdDateTime":"2021-06-25T19:42:17Z","expirationDateTime":"2021-06-26T19:42:17Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":1,"failed":0,"inProgress":1,"total":2,"entityRecognitionTasks":[{"lastUpdateDateTime":"2021-06-25T19:42:27.3428372Z","taskName":"NamedEntityRecognition_latest","state":"succeeded","results":{"documents":[{"id":"0","entities":[],"warnings":[]},{"id":"1","entities":[],"warnings":[]},{"id":"2","entities":[],"warnings":[]},{"id":"3","entities":[],"warnings":[]},{"id":"4","entities":[],"warnings":[]},{"id":"5","entities":[],"warnings":[]},{"id":"6","entities":[],"warnings":[]},{"id":"7","entities":[],"warnings":[]},{"id":"8","entities":[],"warnings":[]},{"id":"9","entities":[],"warnings":[]},{"id":"10","entities":[],"warnings":[]},{"id":"11","entities":[],"warnings":[]},{"id":"12","entities":[],"warnings":[]},{"id":"13","entities":[],"warnings":[]},{"id":"14","entities":[],"warnings":[]},{"id":"15","entities":[],"warnings":[]},{"id":"16","entities":[],"warnings":[]},{"id":"17","entities":[],"warnings":[]},{"id":"18","entities":[],"warnings":[]},{"id":"19","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-06-01"}}]},"@nextLink":"https://endpoint/text/analytics/v3.1/analyze/jobs/83f4280c-94e2-45ef-bc23-43640f0a2480?$skip=20&$top=5&showStats=False"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '325',
  'apim-request-id',
  'b84c72ab-4848-40cc-92e7-43c487ec9926',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:42:29 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/83f4280c-94e2-45ef-bc23-43640f0a2480')
  .query(true)
  .reply(200, {"jobId":"83f4280c-94e2-45ef-bc23-43640f0a2480","lastUpdateDateTime":"2021-06-25T19:42:27Z","createdDateTime":"2021-06-25T19:42:17Z","expirationDateTime":"2021-06-26T19:42:17Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":1,"failed":0,"inProgress":1,"total":2,"entityRecognitionTasks":[{"lastUpdateDateTime":"2021-06-25T19:42:27.3428372Z","taskName":"NamedEntityRecognition_latest","state":"succeeded","results":{"documents":[{"id":"0","entities":[],"warnings":[]},{"id":"1","entities":[],"warnings":[]},{"id":"2","entities":[],"warnings":[]},{"id":"3","entities":[],"warnings":[]},{"id":"4","entities":[],"warnings":[]},{"id":"5","entities":[],"warnings":[]},{"id":"6","entities":[],"warnings":[]},{"id":"7","entities":[],"warnings":[]},{"id":"8","entities":[],"warnings":[]},{"id":"9","entities":[],"warnings":[]},{"id":"10","entities":[],"warnings":[]},{"id":"11","entities":[],"warnings":[]},{"id":"12","entities":[],"warnings":[]},{"id":"13","entities":[],"warnings":[]},{"id":"14","entities":[],"warnings":[]},{"id":"15","entities":[],"warnings":[]},{"id":"16","entities":[],"warnings":[]},{"id":"17","entities":[],"warnings":[]},{"id":"18","entities":[],"warnings":[]},{"id":"19","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-06-01"}}]},"@nextLink":"https://endpoint/text/analytics/v3.1/analyze/jobs/83f4280c-94e2-45ef-bc23-43640f0a2480?$skip=20&$top=5&showStats=False"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '205',
  'apim-request-id',
  'f2167e73-e4be-4e0b-ba1c-a6f0eb2a7e53',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:42:31 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/83f4280c-94e2-45ef-bc23-43640f0a2480')
  .query(true)
  .reply(200, {"jobId":"83f4280c-94e2-45ef-bc23-43640f0a2480","lastUpdateDateTime":"2021-06-25T19:42:27Z","createdDateTime":"2021-06-25T19:42:17Z","expirationDateTime":"2021-06-26T19:42:17Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":1,"failed":0,"inProgress":1,"total":2,"entityRecognitionTasks":[{"lastUpdateDateTime":"2021-06-25T19:42:27.3428372Z","taskName":"NamedEntityRecognition_latest","state":"succeeded","results":{"documents":[{"id":"0","entities":[],"warnings":[]},{"id":"1","entities":[],"warnings":[]},{"id":"2","entities":[],"warnings":[]},{"id":"3","entities":[],"warnings":[]},{"id":"4","entities":[],"warnings":[]},{"id":"5","entities":[],"warnings":[]},{"id":"6","entities":[],"warnings":[]},{"id":"7","entities":[],"warnings":[]},{"id":"8","entities":[],"warnings":[]},{"id":"9","entities":[],"warnings":[]},{"id":"10","entities":[],"warnings":[]},{"id":"11","entities":[],"warnings":[]},{"id":"12","entities":[],"warnings":[]},{"id":"13","entities":[],"warnings":[]},{"id":"14","entities":[],"warnings":[]},{"id":"15","entities":[],"warnings":[]},{"id":"16","entities":[],"warnings":[]},{"id":"17","entities":[],"warnings":[]},{"id":"18","entities":[],"warnings":[]},{"id":"19","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-06-01"}}]},"@nextLink":"https://endpoint/text/analytics/v3.1/analyze/jobs/83f4280c-94e2-45ef-bc23-43640f0a2480?$skip=20&$top=5&showStats=False"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '232',
  'apim-request-id',
  'c89f0e67-b29d-4bc9-946f-23e6cab7c944',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:42:33 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/83f4280c-94e2-45ef-bc23-43640f0a2480')
  .query(true)
  .reply(200, {"jobId":"83f4280c-94e2-45ef-bc23-43640f0a2480","lastUpdateDateTime":"2021-06-25T19:42:27Z","createdDateTime":"2021-06-25T19:42:17Z","expirationDateTime":"2021-06-26T19:42:17Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":1,"failed":0,"inProgress":1,"total":2,"entityRecognitionTasks":[{"lastUpdateDateTime":"2021-06-25T19:42:27.3428372Z","taskName":"NamedEntityRecognition_latest","state":"succeeded","results":{"documents":[{"id":"0","entities":[],"warnings":[]},{"id":"1","entities":[],"warnings":[]},{"id":"2","entities":[],"warnings":[]},{"id":"3","entities":[],"warnings":[]},{"id":"4","entities":[],"warnings":[]},{"id":"5","entities":[],"warnings":[]},{"id":"6","entities":[],"warnings":[]},{"id":"7","entities":[],"warnings":[]},{"id":"8","entities":[],"warnings":[]},{"id":"9","entities":[],"warnings":[]},{"id":"10","entities":[],"warnings":[]},{"id":"11","entities":[],"warnings":[]},{"id":"12","entities":[],"warnings":[]},{"id":"13","entities":[],"warnings":[]},{"id":"14","entities":[],"warnings":[]},{"id":"15","entities":[],"warnings":[]},{"id":"16","entities":[],"warnings":[]},{"id":"17","entities":[],"warnings":[]},{"id":"18","entities":[],"warnings":[]},{"id":"19","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-06-01"}}]},"@nextLink":"https://endpoint/text/analytics/v3.1/analyze/jobs/83f4280c-94e2-45ef-bc23-43640f0a2480?$skip=20&$top=5&showStats=False"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '222',
  'apim-request-id',
  '777c5d4e-51b6-4018-b461-6aa6242371dc',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:42:35 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/83f4280c-94e2-45ef-bc23-43640f0a2480')
  .query(true)
  .reply(200, {"jobId":"83f4280c-94e2-45ef-bc23-43640f0a2480","lastUpdateDateTime":"2021-06-25T19:42:38Z","createdDateTime":"2021-06-25T19:42:17Z","expirationDateTime":"2021-06-26T19:42:17Z","status":"succeeded","errors":[],"displayName":"NA","tasks":{"completed":2,"failed":0,"inProgress":0,"total":2,"entityRecognitionTasks":[{"lastUpdateDateTime":"2021-06-25T19:42:27.3428372Z","taskName":"NamedEntityRecognition_latest","state":"succeeded","results":{"documents":[{"id":"0","entities":[],"warnings":[]},{"id":"1","entities":[],"warnings":[]},{"id":"2","entities":[],"warnings":[]},{"id":"3","entities":[],"warnings":[]},{"id":"4","entities":[],"warnings":[]},{"id":"5","entities":[],"warnings":[]},{"id":"6","entities":[],"warnings":[]},{"id":"7","entities":[],"warnings":[]},{"id":"8","entities":[],"warnings":[]},{"id":"9","entities":[],"warnings":[]},{"id":"10","entities":[],"warnings":[]},{"id":"11","entities":[],"warnings":[]},{"id":"12","entities":[],"warnings":[]},{"id":"13","entities":[],"warnings":[]},{"id":"14","entities":[],"warnings":[]},{"id":"15","entities":[],"warnings":[]},{"id":"16","entities":[],"warnings":[]},{"id":"17","entities":[],"warnings":[]},{"id":"18","entities":[],"warnings":[]},{"id":"19","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-06-01"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-06-25T19:42:38.0240622Z","taskName":"KeyPhraseExtraction_latest","state":"succeeded","results":{"documents":[{"id":"0","keyPhrases":["random text"],"warnings":[]},{"id":"1","keyPhrases":["random text"],"warnings":[]},{"id":"2","keyPhrases":["random text"],"warnings":[]},{"id":"3","keyPhrases":["random text"],"warnings":[]},{"id":"4","keyPhrases":["random text"],"warnings":[]},{"id":"5","keyPhrases":["random text"],"warnings":[]},{"id":"6","keyPhrases":["random text"],"warnings":[]},{"id":"7","keyPhrases":["random text"],"warnings":[]},{"id":"8","keyPhrases":["random text"],"warnings":[]},{"id":"9","keyPhrases":["random text"],"warnings":[]},{"id":"10","keyPhrases":["random text"],"warnings":[]},{"id":"11","keyPhrases":["random text"],"warnings":[]},{"id":"12","keyPhrases":["random text"],"warnings":[]},{"id":"13","keyPhrases":["random text"],"warnings":[]},{"id":"14","keyPhrases":["random text"],"warnings":[]},{"id":"15","keyPhrases":["random text"],"warnings":[]},{"id":"16","keyPhrases":["random text"],"warnings":[]},{"id":"17","keyPhrases":["random text"],"warnings":[]},{"id":"18","keyPhrases":["random text"],"warnings":[]},{"id":"19","keyPhrases":["random text"],"warnings":[]}],"errors":[],"modelVersion":"2021-06-01"}}]},"@nextLink":"https://endpoint/text/analytics/v3.1/analyze/jobs/83f4280c-94e2-45ef-bc23-43640f0a2480?$skip=20&$top=5&showStats=False"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '571',
  'apim-request-id',
  'ea9e33a8-120f-4583-885b-cbf41db99445',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:42:38 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/83f4280c-94e2-45ef-bc23-43640f0a2480')
  .query(true)
  .reply(200, {"jobId":"83f4280c-94e2-45ef-bc23-43640f0a2480","lastUpdateDateTime":"2021-06-25T19:42:38Z","createdDateTime":"2021-06-25T19:42:17Z","expirationDateTime":"2021-06-26T19:42:17Z","status":"succeeded","errors":[],"displayName":"NA","tasks":{"completed":2,"failed":0,"inProgress":0,"total":2,"entityRecognitionTasks":[{"lastUpdateDateTime":"2021-06-25T19:42:27.3428372Z","taskName":"NamedEntityRecognition_latest","state":"succeeded","results":{"documents":[{"id":"0","entities":[],"warnings":[]},{"id":"1","entities":[],"warnings":[]},{"id":"2","entities":[],"warnings":[]},{"id":"3","entities":[],"warnings":[]},{"id":"4","entities":[],"warnings":[]},{"id":"5","entities":[],"warnings":[]},{"id":"6","entities":[],"warnings":[]},{"id":"7","entities":[],"warnings":[]},{"id":"8","entities":[],"warnings":[]},{"id":"9","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-06-01"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-06-25T19:42:38.0240622Z","taskName":"KeyPhraseExtraction_latest","state":"succeeded","results":{"documents":[{"id":"0","keyPhrases":["random text"],"warnings":[]},{"id":"1","keyPhrases":["random text"],"warnings":[]},{"id":"2","keyPhrases":["random text"],"warnings":[]},{"id":"3","keyPhrases":["random text"],"warnings":[]},{"id":"4","keyPhrases":["random text"],"warnings":[]},{"id":"5","keyPhrases":["random text"],"warnings":[]},{"id":"6","keyPhrases":["random text"],"warnings":[]},{"id":"7","keyPhrases":["random text"],"warnings":[]},{"id":"8","keyPhrases":["random text"],"warnings":[]},{"id":"9","keyPhrases":["random text"],"warnings":[]}],"errors":[],"modelVersion":"2021-06-01"}}]},"@nextLink":"https://endpoint/text/analytics/v3.1/analyze/jobs/83f4280c-94e2-45ef-bc23-43640f0a2480?$skip=10&$top=10&showStats=False"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '302',
  'apim-request-id',
  '1b996271-2313-45fa-b32f-c9848d79b8e1',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:42:38 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/83f4280c-94e2-45ef-bc23-43640f0a2480')
  .query(true)
  .reply(200, {"jobId":"83f4280c-94e2-45ef-bc23-43640f0a2480","lastUpdateDateTime":"2021-06-25T19:42:38Z","createdDateTime":"2021-06-25T19:42:17Z","expirationDateTime":"2021-06-26T19:42:17Z","status":"succeeded","errors":[],"displayName":"NA","tasks":{"completed":2,"failed":0,"inProgress":0,"total":2,"entityRecognitionTasks":[{"lastUpdateDateTime":"2021-06-25T19:42:27.3428372Z","taskName":"NamedEntityRecognition_latest","state":"succeeded","results":{"documents":[{"id":"10","entities":[],"warnings":[]},{"id":"11","entities":[],"warnings":[]},{"id":"12","entities":[],"warnings":[]},{"id":"13","entities":[],"warnings":[]},{"id":"14","entities":[],"warnings":[]},{"id":"15","entities":[],"warnings":[]},{"id":"16","entities":[],"warnings":[]},{"id":"17","entities":[],"warnings":[]},{"id":"18","entities":[],"warnings":[]},{"id":"19","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-06-01"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-06-25T19:42:38.0240622Z","taskName":"KeyPhraseExtraction_latest","state":"succeeded","results":{"documents":[{"id":"10","keyPhrases":["random text"],"warnings":[]},{"id":"11","keyPhrases":["random text"],"warnings":[]},{"id":"12","keyPhrases":["random text"],"warnings":[]},{"id":"13","keyPhrases":["random text"],"warnings":[]},{"id":"14","keyPhrases":["random text"],"warnings":[]},{"id":"15","keyPhrases":["random text"],"warnings":[]},{"id":"16","keyPhrases":["random text"],"warnings":[]},{"id":"17","keyPhrases":["random text"],"warnings":[]},{"id":"18","keyPhrases":["random text"],"warnings":[]},{"id":"19","keyPhrases":["random text"],"warnings":[]}],"errors":[],"modelVersion":"2021-06-01"}}]},"@nextLink":"https://endpoint/text/analytics/v3.1/analyze/jobs/83f4280c-94e2-45ef-bc23-43640f0a2480?$skip=20&$top=5&showStats=False"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '269',
  'apim-request-id',
  'd67f0a48-d03a-413b-9e04-8125e8c5879d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:42:39 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/83f4280c-94e2-45ef-bc23-43640f0a2480')
  .query(true)
  .reply(200, {"jobId":"83f4280c-94e2-45ef-bc23-43640f0a2480","lastUpdateDateTime":"2021-06-25T19:42:38Z","createdDateTime":"2021-06-25T19:42:17Z","expirationDateTime":"2021-06-26T19:42:17Z","status":"succeeded","errors":[],"displayName":"NA","tasks":{"completed":2,"failed":0,"inProgress":0,"total":2,"entityRecognitionTasks":[{"lastUpdateDateTime":"2021-06-25T19:42:27.3428372Z","taskName":"NamedEntityRecognition_latest","state":"succeeded","results":{"documents":[{"id":"20","entities":[],"warnings":[]},{"id":"21","entities":[],"warnings":[]},{"id":"22","entities":[],"warnings":[]},{"id":"23","entities":[],"warnings":[]},{"id":"24","entities":[{"text":"Microsoft","category":"Organization","offset":0,"length":9,"confidenceScore":1},{"text":"Bill Gates","category":"Person","offset":25,"length":10,"confidenceScore":1},{"text":"Paul Allen","category":"Person","offset":40,"length":10,"confidenceScore":1}],"warnings":[]}],"errors":[],"modelVersion":"2021-06-01"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-06-25T19:42:38.0240622Z","taskName":"KeyPhraseExtraction_latest","state":"succeeded","results":{"documents":[{"id":"20","keyPhrases":["random text"],"warnings":[]},{"id":"21","keyPhrases":["random text"],"warnings":[]},{"id":"22","keyPhrases":["random text"],"warnings":[]},{"id":"23","keyPhrases":["random text"],"warnings":[]},{"id":"24","keyPhrases":["Bill Gates","Paul Allen","Microsoft"],"warnings":[]}],"errors":[],"modelVersion":"2021-06-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '179',
  'apim-request-id',
  'ce8fdf4c-6162-48c1-adeb-8cccef0a12aa',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:42:39 GMT'
]);

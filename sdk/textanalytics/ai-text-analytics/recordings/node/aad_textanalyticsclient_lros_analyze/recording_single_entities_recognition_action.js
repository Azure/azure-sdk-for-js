let nock = require('nock');

module.exports.hash = "d3883c1b02faf3494e22c243c4aaf823";

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
  '340d12a6-d80a-4ee8-9815-3a5cda955e01',
  'x-ms-ests-server',
  '2.1.11829.4 - EUS ProdSlices',
  'Set-Cookie',
  'fpc=Alzs-a_zlZhFj2AARRsDwrZz_bg1EAAAAGRWZ9gOAAAA; expires=Sun, 25-Jul-2021 04:48:10 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrPdS3ZjdI3kxgf6UNueaG-uPAhYtTeTuSFbUQrAuBsVT04ruagXiKmdU73q9KVr3pxYArgwQMTN9p4-SfeWOfzW5_5tEo5T6PkrOhUnjcsrX6joNhyPgKrl76rSRP6YXGwP2E0Lbpnw_EQ3LZY6A9XgVNO2-htN-ouw4YE7p9Y3IgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 25 Jun 2021 04:48:10 GMT',
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
  'ae650fba-7c79-46e9-81aa-7ec87f574900',
  'x-ms-ests-server',
  '2.1.11829.9 - EUS ProdSlices',
  'Set-Cookie',
  'fpc=Alzs-a_zlZhFj2AARRsDwrZz_bg1EAAAAGRWZ9gOAAAA; expires=Sun, 25-Jul-2021 04:48:10 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrvPAXXttqB_TVEHz6En1x8ebGUz0KP-jT7wwasumN31E8mNjnJbA2Cgdcq4qcTB1hQ-EuDW_IeaY2qCTN5QBSalAgkLyPzaPLFLhNU_BrSugbNU9Y8lUXF--t2R2TYwtpHKYdWHJNqx2_Mc_euOxtj09OK3mYEYHl-uW9BHAbIKMgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 25 Jun 2021 04:48:10 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.1.0&x-client-OS=linux&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=2|771,0|,&x-client-last-telemetry=2|0|||0,0&client-request-id=28a50aae-1b5a-45f1-b6da-25c9e89a36e4&client_secret=azure_client_secret")
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
  '35a4e11e-7b49-477f-aac7-54dc0a6a4e00',
  'x-ms-ests-server',
  '2.1.11829.9 - WUS2 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=Alzs-a_zlZhFj2AARRsDwrZz_bg1EQAAAGRWZ9gOAAAA; expires=Sun, 25-Jul-2021 04:48:11 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 25 Jun 2021 04:48:10 GMT',
  'Content-Length',
  '1331'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('//text/analytics/v3.1/analyze', {"analysisInput":{"documents":[{"id":"1","text":"Microsoft was founded by Bill Gates and Paul Allen on April 4, 1975.","language":"en"},{"id":"2","text":"Microsoft fue fundado por Bill Gates y Paul Allen el 4 de abril de 1975.","language":"es"},{"id":"3","text":"Microsoft wurde am 4. April 1975 von Bill Gates und Paul Allen gegründet.","language":"de"}]},"tasks":{"entityRecognitionTasks":[{"parameters":{"model-version":"latest","stringIndexType":"Utf16CodeUnit"}}]}})
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'operation-location',
  'https://endpoint/text/analytics/v3.1/analyze/jobs/a87ecbde-ae38-427f-95fa-bc31e9e53f6f',
  'x-envoy-upstream-service-time',
  '179',
  'apim-request-id',
  '0b73b718-a966-4e7a-9f79-4dd59af15478',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 04:48:11 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/a87ecbde-ae38-427f-95fa-bc31e9e53f6f')
  .query(true)
  .reply(200, {"jobId":"a87ecbde-ae38-427f-95fa-bc31e9e53f6f","lastUpdateDateTime":"2021-06-25T04:48:11Z","createdDateTime":"2021-06-25T04:48:11Z","expirationDateTime":"2021-06-26T04:48:11Z","status":"notStarted","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '9',
  'apim-request-id',
  'cc7a17fb-3528-4652-8c0e-e6c5c0bae4fc',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 04:48:11 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/a87ecbde-ae38-427f-95fa-bc31e9e53f6f')
  .query(true)
  .reply(200, {"jobId":"a87ecbde-ae38-427f-95fa-bc31e9e53f6f","lastUpdateDateTime":"2021-06-25T04:48:11Z","createdDateTime":"2021-06-25T04:48:11Z","expirationDateTime":"2021-06-26T04:48:11Z","status":"notStarted","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '6',
  'apim-request-id',
  '7b80e6b3-5677-4a5b-83ac-a74600bcca32',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 04:48:11 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/a87ecbde-ae38-427f-95fa-bc31e9e53f6f')
  .query(true)
  .reply(200, {"jobId":"a87ecbde-ae38-427f-95fa-bc31e9e53f6f","lastUpdateDateTime":"2021-06-25T04:48:11Z","createdDateTime":"2021-06-25T04:48:11Z","expirationDateTime":"2021-06-26T04:48:11Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  '86c52b64-0376-46c0-93a2-5475f7a98bc7',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 04:48:13 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/a87ecbde-ae38-427f-95fa-bc31e9e53f6f')
  .query(true)
  .reply(200, {"jobId":"a87ecbde-ae38-427f-95fa-bc31e9e53f6f","lastUpdateDateTime":"2021-06-25T04:48:11Z","createdDateTime":"2021-06-25T04:48:11Z","expirationDateTime":"2021-06-26T04:48:11Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  '138896cc-d5b5-488a-9225-bf4e6d5f0131',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 04:48:14 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/a87ecbde-ae38-427f-95fa-bc31e9e53f6f')
  .query(true)
  .reply(200, {"jobId":"a87ecbde-ae38-427f-95fa-bc31e9e53f6f","lastUpdateDateTime":"2021-06-25T04:48:11Z","createdDateTime":"2021-06-25T04:48:11Z","expirationDateTime":"2021-06-26T04:48:11Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '9',
  'apim-request-id',
  'd70de82c-d94b-49cc-b3e2-688a54eadac0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 04:48:16 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/a87ecbde-ae38-427f-95fa-bc31e9e53f6f')
  .query(true)
  .reply(200, {"jobId":"a87ecbde-ae38-427f-95fa-bc31e9e53f6f","lastUpdateDateTime":"2021-06-25T04:48:11Z","createdDateTime":"2021-06-25T04:48:11Z","expirationDateTime":"2021-06-26T04:48:11Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  '119c450d-8dfd-4335-9c27-20fa56e8beb2',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 04:48:18 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/a87ecbde-ae38-427f-95fa-bc31e9e53f6f')
  .query(true)
  .reply(200, {"jobId":"a87ecbde-ae38-427f-95fa-bc31e9e53f6f","lastUpdateDateTime":"2021-06-25T04:48:11Z","createdDateTime":"2021-06-25T04:48:11Z","expirationDateTime":"2021-06-26T04:48:11Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  'bd080ee7-1072-4915-897f-ad0b05651bef',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 04:48:21 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/a87ecbde-ae38-427f-95fa-bc31e9e53f6f')
  .query(true)
  .reply(200, {"jobId":"a87ecbde-ae38-427f-95fa-bc31e9e53f6f","lastUpdateDateTime":"2021-06-25T04:48:11Z","createdDateTime":"2021-06-25T04:48:11Z","expirationDateTime":"2021-06-26T04:48:11Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '51',
  'apim-request-id',
  '581c06ce-f6f7-46e7-bb03-048667073c5c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 04:48:23 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/a87ecbde-ae38-427f-95fa-bc31e9e53f6f')
  .query(true)
  .reply(200, {"jobId":"a87ecbde-ae38-427f-95fa-bc31e9e53f6f","lastUpdateDateTime":"2021-06-25T04:48:11Z","createdDateTime":"2021-06-25T04:48:11Z","expirationDateTime":"2021-06-26T04:48:11Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '9',
  'apim-request-id',
  '5656a8c1-fd16-4e73-b84a-06b9b83689b5',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 04:48:25 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/a87ecbde-ae38-427f-95fa-bc31e9e53f6f')
  .query(true)
  .reply(200, {"jobId":"a87ecbde-ae38-427f-95fa-bc31e9e53f6f","lastUpdateDateTime":"2021-06-25T04:48:11Z","createdDateTime":"2021-06-25T04:48:11Z","expirationDateTime":"2021-06-26T04:48:11Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '8',
  'apim-request-id',
  'c8620ee3-473f-43ac-a964-e32116b4c451',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 04:48:27 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/a87ecbde-ae38-427f-95fa-bc31e9e53f6f')
  .query(true)
  .reply(200, {"jobId":"a87ecbde-ae38-427f-95fa-bc31e9e53f6f","lastUpdateDateTime":"2021-06-25T04:48:11Z","createdDateTime":"2021-06-25T04:48:11Z","expirationDateTime":"2021-06-26T04:48:11Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '9',
  'apim-request-id',
  '9b84b25f-8546-405c-9b5f-fe4b241b1cb0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 04:48:29 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/a87ecbde-ae38-427f-95fa-bc31e9e53f6f')
  .query(true)
  .reply(200, {"jobId":"a87ecbde-ae38-427f-95fa-bc31e9e53f6f","lastUpdateDateTime":"2021-06-25T04:48:11Z","createdDateTime":"2021-06-25T04:48:11Z","expirationDateTime":"2021-06-26T04:48:11Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '8',
  'apim-request-id',
  '5dd6a02b-5ae1-498f-b879-19ee4f7327f1',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 04:48:31 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/a87ecbde-ae38-427f-95fa-bc31e9e53f6f')
  .query(true)
  .reply(200, {"jobId":"a87ecbde-ae38-427f-95fa-bc31e9e53f6f","lastUpdateDateTime":"2021-06-25T04:48:33Z","createdDateTime":"2021-06-25T04:48:11Z","expirationDateTime":"2021-06-26T04:48:11Z","status":"succeeded","errors":[],"displayName":"NA","tasks":{"completed":1,"failed":0,"inProgress":0,"total":1,"entityRecognitionTasks":[{"lastUpdateDateTime":"2021-06-25T04:48:33.2992805Z","taskName":"NamedEntityRecognition_latest","state":"succeeded","results":{"documents":[{"id":"1","entities":[{"text":"Microsoft","category":"Organization","offset":0,"length":9,"confidenceScore":1},{"text":"Bill Gates","category":"Person","offset":25,"length":10,"confidenceScore":1},{"text":"Paul Allen","category":"Person","offset":40,"length":10,"confidenceScore":1},{"text":"April 4, 1975","category":"DateTime","subcategory":"Date","offset":54,"length":13,"confidenceScore":0.8}],"warnings":[]},{"id":"2","entities":[{"text":"Microsoft","category":"Organization","offset":0,"length":9,"confidenceScore":1},{"text":"Bill Gates","category":"Person","offset":26,"length":10,"confidenceScore":1},{"text":"Paul Allen","category":"Person","offset":39,"length":10,"confidenceScore":0.99},{"text":"4 de abril de 1975","category":"DateTime","subcategory":"Date","offset":53,"length":18,"confidenceScore":0.8}],"warnings":[]},{"id":"3","entities":[{"text":"Microsoft","category":"Organization","offset":0,"length":9,"confidenceScore":1},{"text":"4. April 1975","category":"DateTime","subcategory":"Date","offset":19,"length":13,"confidenceScore":0.8},{"text":"Bill Gates","category":"Person","offset":37,"length":10,"confidenceScore":1},{"text":"Paul Allen","category":"Person","offset":52,"length":10,"confidenceScore":1}],"warnings":[]}],"errors":[],"modelVersion":"2021-06-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '73',
  'apim-request-id',
  'e29629d0-948f-469a-b996-e729f0f9fd24',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 04:48:34 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/a87ecbde-ae38-427f-95fa-bc31e9e53f6f')
  .query(true)
  .reply(200, {"jobId":"a87ecbde-ae38-427f-95fa-bc31e9e53f6f","lastUpdateDateTime":"2021-06-25T04:48:33Z","createdDateTime":"2021-06-25T04:48:11Z","expirationDateTime":"2021-06-26T04:48:11Z","status":"succeeded","errors":[],"displayName":"NA","tasks":{"completed":1,"failed":0,"inProgress":0,"total":1,"entityRecognitionTasks":[{"lastUpdateDateTime":"2021-06-25T04:48:33.2992805Z","taskName":"NamedEntityRecognition_latest","state":"succeeded","results":{"documents":[{"id":"1","entities":[{"text":"Microsoft","category":"Organization","offset":0,"length":9,"confidenceScore":1},{"text":"Bill Gates","category":"Person","offset":25,"length":10,"confidenceScore":1},{"text":"Paul Allen","category":"Person","offset":40,"length":10,"confidenceScore":1},{"text":"April 4, 1975","category":"DateTime","subcategory":"Date","offset":54,"length":13,"confidenceScore":0.8}],"warnings":[]},{"id":"2","entities":[{"text":"Microsoft","category":"Organization","offset":0,"length":9,"confidenceScore":1},{"text":"Bill Gates","category":"Person","offset":26,"length":10,"confidenceScore":1},{"text":"Paul Allen","category":"Person","offset":39,"length":10,"confidenceScore":0.99},{"text":"4 de abril de 1975","category":"DateTime","subcategory":"Date","offset":53,"length":18,"confidenceScore":0.8}],"warnings":[]},{"id":"3","entities":[{"text":"Microsoft","category":"Organization","offset":0,"length":9,"confidenceScore":1},{"text":"4. April 1975","category":"DateTime","subcategory":"Date","offset":19,"length":13,"confidenceScore":0.8},{"text":"Bill Gates","category":"Person","offset":37,"length":10,"confidenceScore":1},{"text":"Paul Allen","category":"Person","offset":52,"length":10,"confidenceScore":1}],"warnings":[]}],"errors":[],"modelVersion":"2021-06-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '71',
  'apim-request-id',
  'a5f575ff-c752-4f50-a020-f5240723166a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 04:48:34 GMT'
]);

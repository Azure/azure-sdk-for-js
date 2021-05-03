let nock = require('nock');

module.exports.hash = "e93a2f532d1ed856cf5a797a648b9d79";

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
  '1ca29074-feea-47d9-a8f1-a87974114d02',
  'x-ms-ests-server',
  '2.1.11654.16 - WUS2 ProdSlices',
  'Set-Cookie',
  'fpc=Au3fDaWoqVVGk4LeapOLqsNz_bg1DAAAAClHItgOAAAA; expires=Wed, 02-Jun-2021 19:38:16 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrYMHhmmy13HKt2jH6Qc9RIxx4fFB5xX82PXnS-X0xOR1tE31lJkDKiQFDObtcJbP5y-YUCnttGdCBzdDLarlfu4Xjgt2TFpcQuRat90n6Jiw1X9aGFgltFNKuqbCN-Otw5gGOR3XlEgKslAe9iYK04EUgOvIbP1bMl4un5EiVMq8gAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Mon, 03 May 2021 19:38:15 GMT'
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
  '541fa37e-1d0c-4f27-af44-2f3715290d02',
  'x-ms-ests-server',
  '2.1.11654.16 - EUS ProdSlices',
  'Set-Cookie',
  'fpc=Au3fDaWoqVVGk4LeapOLqsNz_bg1DAAAAClHItgOAAAA; expires=Wed, 02-Jun-2021 19:38:16 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevrn7HH0jjTNGwm5aW0tOhpQTuIddRCsNRKQyKaSLeCPt7Mukf_WJo8-njfA7J9wnzIX1cPSoBw4e2CDINBcAtJ8SOeXD2E98fnAPAud-BmeE7EIcJkSItuy5JoguxOmJ7NtyawNtv3lAPl0mQ0TRnjJC7rZSHhRUiWFduScfWmFP8gAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Mon, 03 May 2021 19:38:15 GMT'
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
  '5526f16f-988d-46cd-8b46-6c4e7a240700',
  'x-ms-ests-server',
  '2.1.11654.25 - WUS2 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=Au3fDaWoqVVGk4LeapOLqsNz_bg1DAAAAClHItgOAAAA; expires=Wed, 02-Jun-2021 19:38:16 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Mon, 03 May 2021 19:38:15 GMT',
  'Content-Length',
  '1331'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('//text/analytics/v3.1-preview.5/analyze', {"tasks":{"entityRecognitionPiiTasks":[{"parameters":{"model-version":"latest","stringIndexType":"UnicodeCodePoint"}}]},"analysisInput":{"documents":[{"id":"0","text":"👩🏻‍👩🏽‍👧🏾‍👦🏿 SSN: 859-98-0987","language":"en"}]}})
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'operation-location',
  'https://endpoint/text/analytics/v3.1-preview.5/analyze/jobs/bdeeafb8-a08e-4d31-b379-ce6d38f6b032',
  'x-envoy-upstream-service-time',
  '57',
  'apim-request-id',
  'ddb2b120-b496-40e1-956d-5eaaa36ded80',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 03 May 2021 19:38:16 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1-preview.5/analyze/jobs/bdeeafb8-a08e-4d31-b379-ce6d38f6b032')
  .query(true)
  .reply(200, {"jobId":"bdeeafb8-a08e-4d31-b379-ce6d38f6b032","lastUpdateDateTime":"2021-05-03T19:38:16Z","createdDateTime":"2021-05-03T19:38:16Z","expirationDateTime":"2021-05-04T19:38:16Z","status":"notStarted","errors":[],"displayName":"NA","tasks":{"details":{"name":"NA","lastUpdateDateTime":"2021-05-03T19:38:16Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '6',
  'apim-request-id',
  '79c047d8-770b-4778-ae92-4acfd5f73957',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 03 May 2021 19:38:16 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1-preview.5/analyze/jobs/bdeeafb8-a08e-4d31-b379-ce6d38f6b032')
  .query(true)
  .reply(200, {"jobId":"bdeeafb8-a08e-4d31-b379-ce6d38f6b032","lastUpdateDateTime":"2021-05-03T19:38:16Z","createdDateTime":"2021-05-03T19:38:16Z","expirationDateTime":"2021-05-04T19:38:16Z","status":"notStarted","errors":[],"displayName":"NA","tasks":{"details":{"name":"NA","lastUpdateDateTime":"2021-05-03T19:38:16Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '5',
  'apim-request-id',
  '1689ecbd-ad45-4a06-87b7-ab8ac5d02d5d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 03 May 2021 19:38:16 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1-preview.5/analyze/jobs/bdeeafb8-a08e-4d31-b379-ce6d38f6b032')
  .query(true)
  .reply(200, {"jobId":"bdeeafb8-a08e-4d31-b379-ce6d38f6b032","lastUpdateDateTime":"2021-05-03T19:38:17Z","createdDateTime":"2021-05-03T19:38:16Z","expirationDateTime":"2021-05-04T19:38:16Z","status":"running","errors":[],"displayName":"NA","tasks":{"details":{"name":"NA","lastUpdateDateTime":"2021-05-03T19:38:17Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  'c7addf70-b996-4ddb-b066-0b5401ad30cd',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 03 May 2021 19:38:18 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1-preview.5/analyze/jobs/bdeeafb8-a08e-4d31-b379-ce6d38f6b032')
  .query(true)
  .reply(200, {"jobId":"bdeeafb8-a08e-4d31-b379-ce6d38f6b032","lastUpdateDateTime":"2021-05-03T19:38:17Z","createdDateTime":"2021-05-03T19:38:16Z","expirationDateTime":"2021-05-04T19:38:16Z","status":"running","errors":[],"displayName":"NA","tasks":{"details":{"name":"NA","lastUpdateDateTime":"2021-05-03T19:38:17Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '6',
  'apim-request-id',
  '0dcc4c0b-be3a-421b-8376-dc04d254efc2',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 03 May 2021 19:38:20 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1-preview.5/analyze/jobs/bdeeafb8-a08e-4d31-b379-ce6d38f6b032')
  .query(true)
  .reply(200, {"jobId":"bdeeafb8-a08e-4d31-b379-ce6d38f6b032","lastUpdateDateTime":"2021-05-03T19:38:17Z","createdDateTime":"2021-05-03T19:38:16Z","expirationDateTime":"2021-05-04T19:38:16Z","status":"running","errors":[],"displayName":"NA","tasks":{"details":{"name":"NA","lastUpdateDateTime":"2021-05-03T19:38:17Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  '6fdb856b-db95-45ba-9948-3e2023511e7e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 03 May 2021 19:38:22 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1-preview.5/analyze/jobs/bdeeafb8-a08e-4d31-b379-ce6d38f6b032')
  .query(true)
  .reply(200, {"jobId":"bdeeafb8-a08e-4d31-b379-ce6d38f6b032","lastUpdateDateTime":"2021-05-03T19:38:17Z","createdDateTime":"2021-05-03T19:38:16Z","expirationDateTime":"2021-05-04T19:38:16Z","status":"running","errors":[],"displayName":"NA","tasks":{"details":{"name":"NA","lastUpdateDateTime":"2021-05-03T19:38:17Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '6',
  'apim-request-id',
  '71167910-0187-4e3e-b373-e0926ae9454b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 03 May 2021 19:38:24 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1-preview.5/analyze/jobs/bdeeafb8-a08e-4d31-b379-ce6d38f6b032')
  .query(true)
  .reply(200, {"jobId":"bdeeafb8-a08e-4d31-b379-ce6d38f6b032","lastUpdateDateTime":"2021-05-03T19:38:17Z","createdDateTime":"2021-05-03T19:38:16Z","expirationDateTime":"2021-05-04T19:38:16Z","status":"running","errors":[],"displayName":"NA","tasks":{"details":{"name":"NA","lastUpdateDateTime":"2021-05-03T19:38:17Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  'cbc632a8-c686-4b26-a198-0e8885ddd936',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 03 May 2021 19:38:26 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1-preview.5/analyze/jobs/bdeeafb8-a08e-4d31-b379-ce6d38f6b032')
  .query(true)
  .reply(200, {"jobId":"bdeeafb8-a08e-4d31-b379-ce6d38f6b032","lastUpdateDateTime":"2021-05-03T19:38:17Z","createdDateTime":"2021-05-03T19:38:16Z","expirationDateTime":"2021-05-04T19:38:16Z","status":"running","errors":[],"displayName":"NA","tasks":{"details":{"name":"NA","lastUpdateDateTime":"2021-05-03T19:38:17Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  '669c1170-c4f5-4844-96a3-ca8770ce7446',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 03 May 2021 19:38:29 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1-preview.5/analyze/jobs/bdeeafb8-a08e-4d31-b379-ce6d38f6b032')
  .query(true)
  .reply(200, {"jobId":"bdeeafb8-a08e-4d31-b379-ce6d38f6b032","lastUpdateDateTime":"2021-05-03T19:38:17Z","createdDateTime":"2021-05-03T19:38:16Z","expirationDateTime":"2021-05-04T19:38:16Z","status":"running","errors":[],"displayName":"NA","tasks":{"details":{"name":"NA","lastUpdateDateTime":"2021-05-03T19:38:17Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  '0a0d9e09-e4f9-426f-990e-e7087f5b81c1',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 03 May 2021 19:38:31 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1-preview.5/analyze/jobs/bdeeafb8-a08e-4d31-b379-ce6d38f6b032')
  .query(true)
  .reply(200, {"jobId":"bdeeafb8-a08e-4d31-b379-ce6d38f6b032","lastUpdateDateTime":"2021-05-03T19:38:17Z","createdDateTime":"2021-05-03T19:38:16Z","expirationDateTime":"2021-05-04T19:38:16Z","status":"running","errors":[],"displayName":"NA","tasks":{"details":{"name":"NA","lastUpdateDateTime":"2021-05-03T19:38:17Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '6',
  'apim-request-id',
  '72982d99-5f90-482b-9f91-7a833bac6bf7',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 03 May 2021 19:38:33 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1-preview.5/analyze/jobs/bdeeafb8-a08e-4d31-b379-ce6d38f6b032')
  .query(true)
  .reply(200, {"jobId":"bdeeafb8-a08e-4d31-b379-ce6d38f6b032","lastUpdateDateTime":"2021-05-03T19:38:17Z","createdDateTime":"2021-05-03T19:38:16Z","expirationDateTime":"2021-05-04T19:38:16Z","status":"running","errors":[],"displayName":"NA","tasks":{"details":{"name":"NA","lastUpdateDateTime":"2021-05-03T19:38:17Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  '9e82e0a8-111d-4a6a-8541-038b8c636ae6',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 03 May 2021 19:38:35 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1-preview.5/analyze/jobs/bdeeafb8-a08e-4d31-b379-ce6d38f6b032')
  .query(true)
  .reply(200, {"jobId":"bdeeafb8-a08e-4d31-b379-ce6d38f6b032","lastUpdateDateTime":"2021-05-03T19:38:35Z","createdDateTime":"2021-05-03T19:38:16Z","expirationDateTime":"2021-05-04T19:38:16Z","status":"succeeded","errors":[],"displayName":"NA","tasks":{"details":{"name":"NA","lastUpdateDateTime":"2021-05-03T19:38:35Z"},"completed":1,"failed":0,"inProgress":0,"total":1,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-05-03T19:38:35.602542Z","name":"NA","state":"succeeded","results":{"documents":[{"redactedText":"👩🏻‍👩🏽‍👧🏾‍👦🏿 SSN: ***********","id":"0","entities":[{"text":"859-98-0987","category":"USSocialSecurityNumber","offset":17,"length":11,"confidenceScore":0.65}],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '34',
  'apim-request-id',
  '01be40f8-40e0-45d7-bd84-6e272d452a29',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 03 May 2021 19:38:37 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1-preview.5/analyze/jobs/bdeeafb8-a08e-4d31-b379-ce6d38f6b032')
  .query(true)
  .reply(200, {"jobId":"bdeeafb8-a08e-4d31-b379-ce6d38f6b032","lastUpdateDateTime":"2021-05-03T19:38:35Z","createdDateTime":"2021-05-03T19:38:16Z","expirationDateTime":"2021-05-04T19:38:16Z","status":"succeeded","errors":[],"displayName":"NA","tasks":{"details":{"name":"NA","lastUpdateDateTime":"2021-05-03T19:38:35Z"},"completed":1,"failed":0,"inProgress":0,"total":1,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-05-03T19:38:35.602542Z","name":"NA","state":"succeeded","results":{"documents":[{"redactedText":"👩🏻‍👩🏽‍👧🏾‍👦🏿 SSN: ***********","id":"0","entities":[{"text":"859-98-0987","category":"USSocialSecurityNumber","offset":17,"length":11,"confidenceScore":0.65}],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '32',
  'apim-request-id',
  'f1824f6c-ecae-49b9-9a3d-1e6b97921ec0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 03 May 2021 19:38:37 GMT'
]);

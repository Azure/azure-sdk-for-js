let nock = require('nock');

module.exports.hash = "e02332145f6c6188b35b4758067b255f";

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
  '7305ce72-ffd5-4a1c-86a1-e62070d02e00',
  'x-ms-ests-server',
  '2.1.11654.16 - WUS2 ProdSlices',
  'Set-Cookie',
  'fpc=AqXUpo7Eg7lIkX24TbKl-dNz_bg1CgAAAHbRItgOAAAA; expires=Thu, 03-Jun-2021 05:28:27 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevrxa5x4UWNB3yuLvgnU41uSJCiTJ6hXT5VcXDVNeCeluMBNS8OcUo8LZJ5C_3vP7BQPKX3exPAP0dYI4Gp6CPC7hGw2oAUdP4pfstwJ1s_RxuVcyKbnBwLL6p6S9wrg8R8rpo07GGFY5nQLWbMoK4uouD2h-adUqKbw71ezcyF6lggAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 04 May 2021 05:28:26 GMT',
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
  '49e83246-baaf-43da-a733-1aeb39ccd200',
  'x-ms-ests-server',
  '2.1.11654.16 - NCUS ProdSlices',
  'Set-Cookie',
  'fpc=AqXUpo7Eg7lIkX24TbKl-dNz_bg1CgAAAHbRItgOAAAA; expires=Thu, 03-Jun-2021 05:28:27 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrnQjeG8F0Je48nz6AmgCpkDxIeIcduMNbfHoz9IobzTgJIJwlB5wDHdi2hlWwp0fsYspgMXdniMnsYcnEv4VXebTfwFJu1t01JhkuHBYc8iIVpQIJW_EUKvlXOXksgIT_byqoCJwc8gN_YYxzg1XI-6kVZgUQbcaDC3gEQzJMzOMgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 04 May 2021 05:28:26 GMT',
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
  '0021c783-55a9-4bb6-9436-896217091b00',
  'x-ms-ests-server',
  '2.1.11654.25 - WUS2 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=AqXUpo7Eg7lIkX24TbKl-dNz_bg1CgAAAHbRItgOAAAA; expires=Thu, 03-Jun-2021 05:28:27 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 04 May 2021 05:28:27 GMT',
  'Content-Length',
  '1331'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('//text/analytics/v3.1-preview.5/analyze', {"displayName":"testJob","tasks":{"entityRecognitionPiiTasks":[{"parameters":{"model-version":"latest","stringIndexType":"Utf16CodeUnit"}}]},"analysisInput":{"documents":[{"id":"1","text":"I will go to the park."},{"id":"2","text":"Este es un document escrito en Español."},{"id":"3","text":"猫は幸せ"}]}})
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'operation-location',
  'https://endpoint/text/analytics/v3.1-preview.5/analyze/jobs/6d7909a0-b95f-47df-b873-33f69610c899',
  'x-envoy-upstream-service-time',
  '5307',
  'apim-request-id',
  'ee427a91-c81d-41a5-ac27-a71e63c8f1b9',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 04 May 2021 05:28:32 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1-preview.5/analyze/jobs/6d7909a0-b95f-47df-b873-33f69610c899')
  .query(true)
  .reply(200, {"jobId":"6d7909a0-b95f-47df-b873-33f69610c899","lastUpdateDateTime":"2021-05-04T05:28:32Z","createdDateTime":"2021-05-04T05:28:27Z","expirationDateTime":"2021-05-05T05:28:27Z","status":"notStarted","errors":[],"displayName":"testJob","tasks":{"details":{"name":"testJob","lastUpdateDateTime":"2021-05-04T05:28:32Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '8',
  'apim-request-id',
  '360895a0-3ff1-4101-929d-521cfa10a993',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 04 May 2021 05:28:32 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1-preview.5/analyze/jobs/6d7909a0-b95f-47df-b873-33f69610c899')
  .query(true)
  .reply(200, {"jobId":"6d7909a0-b95f-47df-b873-33f69610c899","lastUpdateDateTime":"2021-05-04T05:28:32Z","createdDateTime":"2021-05-04T05:28:27Z","expirationDateTime":"2021-05-05T05:28:27Z","status":"notStarted","errors":[],"displayName":"testJob","tasks":{"details":{"name":"testJob","lastUpdateDateTime":"2021-05-04T05:28:32Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '9',
  'apim-request-id',
  '2624e66d-538d-43d9-8dd7-358db92b431a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 04 May 2021 05:28:32 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1-preview.5/analyze/jobs/6d7909a0-b95f-47df-b873-33f69610c899')
  .query(true)
  .reply(200, {"jobId":"6d7909a0-b95f-47df-b873-33f69610c899","lastUpdateDateTime":"2021-05-04T05:28:34Z","createdDateTime":"2021-05-04T05:28:27Z","expirationDateTime":"2021-05-05T05:28:27Z","status":"running","errors":[],"displayName":"testJob","tasks":{"details":{"name":"testJob","lastUpdateDateTime":"2021-05-04T05:28:34Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '8',
  'apim-request-id',
  '193d6f11-ded3-4e52-ad24-62b5bfabfe75',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 04 May 2021 05:28:34 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1-preview.5/analyze/jobs/6d7909a0-b95f-47df-b873-33f69610c899')
  .query(true)
  .reply(200, {"jobId":"6d7909a0-b95f-47df-b873-33f69610c899","lastUpdateDateTime":"2021-05-04T05:28:34Z","createdDateTime":"2021-05-04T05:28:27Z","expirationDateTime":"2021-05-05T05:28:27Z","status":"running","errors":[],"displayName":"testJob","tasks":{"details":{"name":"testJob","lastUpdateDateTime":"2021-05-04T05:28:34Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '6',
  'apim-request-id',
  '48263c8a-0df6-48be-a58b-fe36ee2e1a13',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 04 May 2021 05:28:36 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1-preview.5/analyze/jobs/6d7909a0-b95f-47df-b873-33f69610c899')
  .query(true)
  .reply(200, {"jobId":"6d7909a0-b95f-47df-b873-33f69610c899","lastUpdateDateTime":"2021-05-04T05:28:34Z","createdDateTime":"2021-05-04T05:28:27Z","expirationDateTime":"2021-05-05T05:28:27Z","status":"running","errors":[],"displayName":"testJob","tasks":{"details":{"name":"testJob","lastUpdateDateTime":"2021-05-04T05:28:34Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '6',
  'apim-request-id',
  'f39862a7-f5a0-4d33-93b4-9a0937e42321',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 04 May 2021 05:28:38 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1-preview.5/analyze/jobs/6d7909a0-b95f-47df-b873-33f69610c899')
  .query(true)
  .reply(200, {"jobId":"6d7909a0-b95f-47df-b873-33f69610c899","lastUpdateDateTime":"2021-05-04T05:28:34Z","createdDateTime":"2021-05-04T05:28:27Z","expirationDateTime":"2021-05-05T05:28:27Z","status":"running","errors":[],"displayName":"testJob","tasks":{"details":{"name":"testJob","lastUpdateDateTime":"2021-05-04T05:28:34Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '6',
  'apim-request-id',
  'e80b6c98-e044-41c9-89dd-b081ee5b31d8',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 04 May 2021 05:28:40 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1-preview.5/analyze/jobs/6d7909a0-b95f-47df-b873-33f69610c899')
  .query(true)
  .reply(200, {"jobId":"6d7909a0-b95f-47df-b873-33f69610c899","lastUpdateDateTime":"2021-05-04T05:28:34Z","createdDateTime":"2021-05-04T05:28:27Z","expirationDateTime":"2021-05-05T05:28:27Z","status":"running","errors":[],"displayName":"testJob","tasks":{"details":{"name":"testJob","lastUpdateDateTime":"2021-05-04T05:28:34Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '6',
  'apim-request-id',
  'eb2a9b2b-f724-40d4-870e-29da0095b580',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 04 May 2021 05:28:42 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1-preview.5/analyze/jobs/6d7909a0-b95f-47df-b873-33f69610c899')
  .query(true)
  .reply(200, {"jobId":"6d7909a0-b95f-47df-b873-33f69610c899","lastUpdateDateTime":"2021-05-04T05:28:34Z","createdDateTime":"2021-05-04T05:28:27Z","expirationDateTime":"2021-05-05T05:28:27Z","status":"running","errors":[],"displayName":"testJob","tasks":{"details":{"name":"testJob","lastUpdateDateTime":"2021-05-04T05:28:34Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '6',
  'apim-request-id',
  '71e428fe-5e41-49dd-b6a7-37c5c895e678',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 04 May 2021 05:28:45 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1-preview.5/analyze/jobs/6d7909a0-b95f-47df-b873-33f69610c899')
  .query(true)
  .reply(200, {"jobId":"6d7909a0-b95f-47df-b873-33f69610c899","lastUpdateDateTime":"2021-05-04T05:28:34Z","createdDateTime":"2021-05-04T05:28:27Z","expirationDateTime":"2021-05-05T05:28:27Z","status":"running","errors":[],"displayName":"testJob","tasks":{"details":{"name":"testJob","lastUpdateDateTime":"2021-05-04T05:28:34Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '9',
  'apim-request-id',
  '505b1bef-33ca-411e-bf8d-e525a50bf5f9',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 04 May 2021 05:28:46 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1-preview.5/analyze/jobs/6d7909a0-b95f-47df-b873-33f69610c899')
  .query(true)
  .reply(200, {"jobId":"6d7909a0-b95f-47df-b873-33f69610c899","lastUpdateDateTime":"2021-05-04T05:28:34Z","createdDateTime":"2021-05-04T05:28:27Z","expirationDateTime":"2021-05-05T05:28:27Z","status":"running","errors":[],"displayName":"testJob","tasks":{"details":{"name":"testJob","lastUpdateDateTime":"2021-05-04T05:28:34Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '6',
  'apim-request-id',
  'a350b545-8c8c-40be-974b-0ed4444d0d33',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 04 May 2021 05:28:49 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1-preview.5/analyze/jobs/6d7909a0-b95f-47df-b873-33f69610c899')
  .query(true)
  .reply(200, {"jobId":"6d7909a0-b95f-47df-b873-33f69610c899","lastUpdateDateTime":"2021-05-04T05:28:34Z","createdDateTime":"2021-05-04T05:28:27Z","expirationDateTime":"2021-05-05T05:28:27Z","status":"running","errors":[],"displayName":"testJob","tasks":{"details":{"name":"testJob","lastUpdateDateTime":"2021-05-04T05:28:34Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  '32b8a3f1-b4a6-40eb-9dc4-a0a1f38ee708',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 04 May 2021 05:28:51 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1-preview.5/analyze/jobs/6d7909a0-b95f-47df-b873-33f69610c899')
  .query(true)
  .reply(200, {"jobId":"6d7909a0-b95f-47df-b873-33f69610c899","lastUpdateDateTime":"2021-05-04T05:28:52Z","createdDateTime":"2021-05-04T05:28:27Z","expirationDateTime":"2021-05-05T05:28:27Z","status":"succeeded","errors":[],"displayName":"testJob","tasks":{"details":{"name":"testJob","lastUpdateDateTime":"2021-05-04T05:28:52Z"},"completed":1,"failed":0,"inProgress":0,"total":1,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-05-04T05:28:52.3664023Z","name":"testJob","state":"succeeded","results":{"documents":[{"redactedText":"I will go to the park.","id":"1","entities":[],"warnings":[]},{"redactedText":"Este es un document escrito en Español.","id":"2","entities":[],"warnings":[]},{"redactedText":"猫は幸せ","id":"3","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '51',
  'apim-request-id',
  'b349340e-1f16-4287-86c6-b9f0471be048',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 04 May 2021 05:28:53 GMT'
]);

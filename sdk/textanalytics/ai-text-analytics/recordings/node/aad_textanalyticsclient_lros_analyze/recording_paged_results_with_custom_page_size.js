let nock = require('nock');

module.exports.hash = "e9797527b86d3a17b763db0f52fd9c49";

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
  'ad2712d7-02f8-446c-8685-8eac0e909a00',
  'x-ms-ests-server',
  '2.1.11654.25 - NCUS ProdSlices',
  'Set-Cookie',
  'fpc=AnPhe69wTYVMjcXd08qS_MNz_bg1EAAAABseLtgOAAAA; expires=Fri, 11-Jun-2021 19:14:31 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevro6V2AcymcV6aoR9DxiLRWChhvhm3JZYdv2cMqvEUw13EoPgttosmVOMN1sds6UTLWF8KPliAXDn4DBqbzrgkrn692_XsQ5l--Z4RxtssqWKpKN-aPFi18kJ_K5DBsRZ4q_5QaUDHlDQPe4VONUZlmfARXX8VWrtU0COnnWy_DPQgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 12 May 2021 19:14:31 GMT'
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
  '6d13d50f-9cbe-403f-876d-4ed3d7565b00',
  'x-ms-ests-server',
  '2.1.11722.21 - NCUS ProdSlices',
  'Set-Cookie',
  'fpc=AnPhe69wTYVMjcXd08qS_MNz_bg1EAAAABseLtgOAAAA; expires=Fri, 11-Jun-2021 19:14:31 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevroEElP6G5nmuzl8BGP_R4LScm9wucw6bJ1oZXQXVbA9BIM2btlxt5OQhW1JpShRKXKb5n6O40a1IAnHhs_iY7l52piHNy_xLpAjXDArRVbiw8AwVUOzfSAB2YUNmFJU8dGUEXOUJehX7A2ath3RMWHomQz2qjIT1whCfwOVetyhcgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 12 May 2021 19:14:31 GMT'
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
  '428c50f7-d2da-402a-a895-3212f6e55200',
  'x-ms-ests-server',
  '2.1.11722.21 - SCUS ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=AnPhe69wTYVMjcXd08qS_MNz_bg1EAAAABseLtgOAAAA; expires=Fri, 11-Jun-2021 19:14:32 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 12 May 2021 19:14:31 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('//text/analytics/v3.1-preview.5/analyze', {"tasks":{"entityRecognitionTasks":[{"parameters":{"model-version":"latest","stringIndexType":"Utf16CodeUnit"}}],"keyPhraseExtractionTasks":[{"parameters":{"model-version":"latest"}}]},"analysisInput":{"documents":[{"id":"0","text":"random text","language":"en"},{"id":"1","text":"random text","language":"en"},{"id":"2","text":"random text","language":"en"},{"id":"3","text":"random text","language":"en"},{"id":"4","text":"random text","language":"en"},{"id":"5","text":"random text","language":"en"},{"id":"6","text":"random text","language":"en"},{"id":"7","text":"random text","language":"en"},{"id":"8","text":"random text","language":"en"},{"id":"9","text":"random text","language":"en"},{"id":"10","text":"random text","language":"en"},{"id":"11","text":"random text","language":"en"},{"id":"12","text":"random text","language":"en"},{"id":"13","text":"random text","language":"en"},{"id":"14","text":"random text","language":"en"},{"id":"15","text":"random text","language":"en"},{"id":"16","text":"random text","language":"en"},{"id":"17","text":"random text","language":"en"},{"id":"18","text":"random text","language":"en"},{"id":"19","text":"random text","language":"en"},{"id":"20","text":"random text","language":"en"},{"id":"21","text":"random text","language":"en"},{"id":"22","text":"random text","language":"en"},{"id":"23","text":"random text","language":"en"},{"id":"24","text":"Microsoft was founded by Bill Gates and Paul Allen","language":"en"}]}})
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'operation-location',
  'https://endpoint/text/analytics/v3.1-preview.5/analyze/jobs/0983681f-45ed-4a66-90bb-5a0fa6cb2646',
  'x-envoy-upstream-service-time',
  '414',
  'apim-request-id',
  '19beff35-8d49-41fc-bde1-e3edf7825868',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 12 May 2021 19:14:31 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1-preview.5/analyze/jobs/0983681f-45ed-4a66-90bb-5a0fa6cb2646')
  .query(true)
  .reply(200, {"jobId":"0983681f-45ed-4a66-90bb-5a0fa6cb2646","lastUpdateDateTime":"2021-05-12T19:14:32Z","createdDateTime":"2021-05-12T19:14:32Z","expirationDateTime":"2021-05-13T19:14:32Z","status":"notStarted","errors":[],"displayName":"NA","tasks":{"details":{"name":"NA","lastUpdateDateTime":"2021-05-12T19:14:32Z"},"completed":0,"failed":0,"inProgress":2,"total":2}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '12',
  'apim-request-id',
  'cbac06e2-00df-4df1-b3ed-2c14072f2a04',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 12 May 2021 19:14:31 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1-preview.5/analyze/jobs/0983681f-45ed-4a66-90bb-5a0fa6cb2646')
  .query(true)
  .reply(200, {"jobId":"0983681f-45ed-4a66-90bb-5a0fa6cb2646","lastUpdateDateTime":"2021-05-12T19:14:32Z","createdDateTime":"2021-05-12T19:14:32Z","expirationDateTime":"2021-05-13T19:14:32Z","status":"notStarted","errors":[],"displayName":"NA","tasks":{"details":{"name":"NA","lastUpdateDateTime":"2021-05-12T19:14:32Z"},"completed":0,"failed":0,"inProgress":2,"total":2}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  'b6eb8ee3-9910-48ea-a9ae-f6ca92e3312f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 12 May 2021 19:14:31 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1-preview.5/analyze/jobs/0983681f-45ed-4a66-90bb-5a0fa6cb2646')
  .query(true)
  .reply(200, {"jobId":"0983681f-45ed-4a66-90bb-5a0fa6cb2646","lastUpdateDateTime":"2021-05-12T19:14:34Z","createdDateTime":"2021-05-12T19:14:32Z","expirationDateTime":"2021-05-13T19:14:32Z","status":"running","errors":[],"displayName":"NA","tasks":{"details":{"name":"NA","lastUpdateDateTime":"2021-05-12T19:14:34Z"},"completed":0,"failed":0,"inProgress":2,"total":2}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '8',
  'apim-request-id',
  '0d77f853-9087-418c-9ed4-b87f02da3c53',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 12 May 2021 19:14:33 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1-preview.5/analyze/jobs/0983681f-45ed-4a66-90bb-5a0fa6cb2646')
  .query(true)
  .reply(200, {"jobId":"0983681f-45ed-4a66-90bb-5a0fa6cb2646","lastUpdateDateTime":"2021-05-12T19:14:34Z","createdDateTime":"2021-05-12T19:14:32Z","expirationDateTime":"2021-05-13T19:14:32Z","status":"running","errors":[],"displayName":"NA","tasks":{"details":{"name":"NA","lastUpdateDateTime":"2021-05-12T19:14:34Z"},"completed":0,"failed":0,"inProgress":2,"total":2}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '10',
  'apim-request-id',
  'c56eb814-19c0-44dc-b1bc-7432149b135c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 12 May 2021 19:14:35 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1-preview.5/analyze/jobs/0983681f-45ed-4a66-90bb-5a0fa6cb2646')
  .query(true)
  .reply(200, {"jobId":"0983681f-45ed-4a66-90bb-5a0fa6cb2646","lastUpdateDateTime":"2021-05-12T19:14:38Z","createdDateTime":"2021-05-12T19:14:32Z","expirationDateTime":"2021-05-13T19:14:32Z","status":"running","errors":[],"displayName":"NA","tasks":{"details":{"name":"NA","lastUpdateDateTime":"2021-05-12T19:14:38Z"},"completed":0,"failed":0,"inProgress":2,"total":2}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '6',
  'apim-request-id',
  'b0ef8903-6e1a-489e-9b1d-9e1c018ae53e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 12 May 2021 19:14:37 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1-preview.5/analyze/jobs/0983681f-45ed-4a66-90bb-5a0fa6cb2646')
  .query(true)
  .reply(200, {"jobId":"0983681f-45ed-4a66-90bb-5a0fa6cb2646","lastUpdateDateTime":"2021-05-12T19:14:40Z","createdDateTime":"2021-05-12T19:14:32Z","expirationDateTime":"2021-05-13T19:14:32Z","status":"running","errors":[],"displayName":"NA","tasks":{"details":{"name":"NA","lastUpdateDateTime":"2021-05-12T19:14:40Z"},"completed":1,"failed":0,"inProgress":1,"total":2,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-05-12T19:14:39.4039874Z","name":"NA","state":"succeeded","results":{"documents":[{"id":"0","keyPhrases":["random text"],"warnings":[]},{"id":"1","keyPhrases":["random text"],"warnings":[]},{"id":"2","keyPhrases":["random text"],"warnings":[]},{"id":"3","keyPhrases":["random text"],"warnings":[]},{"id":"4","keyPhrases":["random text"],"warnings":[]},{"id":"5","keyPhrases":["random text"],"warnings":[]},{"id":"6","keyPhrases":["random text"],"warnings":[]},{"id":"7","keyPhrases":["random text"],"warnings":[]},{"id":"8","keyPhrases":["random text"],"warnings":[]},{"id":"9","keyPhrases":["random text"],"warnings":[]},{"id":"10","keyPhrases":["random text"],"warnings":[]},{"id":"11","keyPhrases":["random text"],"warnings":[]},{"id":"12","keyPhrases":["random text"],"warnings":[]},{"id":"13","keyPhrases":["random text"],"warnings":[]},{"id":"14","keyPhrases":["random text"],"warnings":[]},{"id":"15","keyPhrases":["random text"],"warnings":[]},{"id":"16","keyPhrases":["random text"],"warnings":[]},{"id":"17","keyPhrases":["random text"],"warnings":[]},{"id":"18","keyPhrases":["random text"],"warnings":[]},{"id":"19","keyPhrases":["random text"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]},"@nextLink":"https://endpoint/text/analytics/v3.1-preview.5/analyze/jobs/0983681f-45ed-4a66-90bb-5a0fa6cb2646?$skip=20&$top=5&showStats=False"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '218',
  'apim-request-id',
  'f4adea78-c4e3-4c25-b319-fe4c9c77d5e7',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 12 May 2021 19:14:40 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1-preview.5/analyze/jobs/0983681f-45ed-4a66-90bb-5a0fa6cb2646')
  .query(true)
  .reply(200, {"jobId":"0983681f-45ed-4a66-90bb-5a0fa6cb2646","lastUpdateDateTime":"2021-05-12T19:14:40Z","createdDateTime":"2021-05-12T19:14:32Z","expirationDateTime":"2021-05-13T19:14:32Z","status":"succeeded","errors":[],"displayName":"NA","tasks":{"details":{"name":"NA","lastUpdateDateTime":"2021-05-12T19:14:40Z"},"completed":2,"failed":0,"inProgress":0,"total":2,"entityRecognitionTasks":[{"lastUpdateDateTime":"2021-05-12T19:14:40.9947506Z","name":"NA","state":"succeeded","results":{"documents":[{"id":"0","entities":[],"warnings":[]},{"id":"1","entities":[],"warnings":[]},{"id":"2","entities":[],"warnings":[]},{"id":"3","entities":[],"warnings":[]},{"id":"4","entities":[],"warnings":[]},{"id":"5","entities":[],"warnings":[]},{"id":"6","entities":[],"warnings":[]},{"id":"7","entities":[],"warnings":[]},{"id":"8","entities":[],"warnings":[]},{"id":"9","entities":[],"warnings":[]},{"id":"10","entities":[],"warnings":[]},{"id":"11","entities":[],"warnings":[]},{"id":"12","entities":[],"warnings":[]},{"id":"13","entities":[],"warnings":[]},{"id":"14","entities":[],"warnings":[]},{"id":"15","entities":[],"warnings":[]},{"id":"16","entities":[],"warnings":[]},{"id":"17","entities":[],"warnings":[]},{"id":"18","entities":[],"warnings":[]},{"id":"19","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-05-12T19:14:39.4039874Z","name":"NA","state":"succeeded","results":{"documents":[{"id":"0","keyPhrases":["random text"],"warnings":[]},{"id":"1","keyPhrases":["random text"],"warnings":[]},{"id":"2","keyPhrases":["random text"],"warnings":[]},{"id":"3","keyPhrases":["random text"],"warnings":[]},{"id":"4","keyPhrases":["random text"],"warnings":[]},{"id":"5","keyPhrases":["random text"],"warnings":[]},{"id":"6","keyPhrases":["random text"],"warnings":[]},{"id":"7","keyPhrases":["random text"],"warnings":[]},{"id":"8","keyPhrases":["random text"],"warnings":[]},{"id":"9","keyPhrases":["random text"],"warnings":[]},{"id":"10","keyPhrases":["random text"],"warnings":[]},{"id":"11","keyPhrases":["random text"],"warnings":[]},{"id":"12","keyPhrases":["random text"],"warnings":[]},{"id":"13","keyPhrases":["random text"],"warnings":[]},{"id":"14","keyPhrases":["random text"],"warnings":[]},{"id":"15","keyPhrases":["random text"],"warnings":[]},{"id":"16","keyPhrases":["random text"],"warnings":[]},{"id":"17","keyPhrases":["random text"],"warnings":[]},{"id":"18","keyPhrases":["random text"],"warnings":[]},{"id":"19","keyPhrases":["random text"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]},"@nextLink":"https://endpoint/text/analytics/v3.1-preview.5/analyze/jobs/0983681f-45ed-4a66-90bb-5a0fa6cb2646?$skip=20&$top=5&showStats=False"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '489',
  'apim-request-id',
  'a8844664-03f2-4bfd-96bb-73179f9ac430',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 12 May 2021 19:14:43 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1-preview.5/analyze/jobs/0983681f-45ed-4a66-90bb-5a0fa6cb2646')
  .query(true)
  .reply(200, {"jobId":"0983681f-45ed-4a66-90bb-5a0fa6cb2646","lastUpdateDateTime":"2021-05-12T19:14:40Z","createdDateTime":"2021-05-12T19:14:32Z","expirationDateTime":"2021-05-13T19:14:32Z","status":"succeeded","errors":[],"displayName":"NA","tasks":{"details":{"name":"NA","lastUpdateDateTime":"2021-05-12T19:14:40Z"},"completed":2,"failed":0,"inProgress":0,"total":2,"entityRecognitionTasks":[{"lastUpdateDateTime":"2021-05-12T19:14:40.9947506Z","name":"NA","state":"succeeded","results":{"documents":[{"id":"0","entities":[],"warnings":[]},{"id":"1","entities":[],"warnings":[]},{"id":"2","entities":[],"warnings":[]},{"id":"3","entities":[],"warnings":[]},{"id":"4","entities":[],"warnings":[]},{"id":"5","entities":[],"warnings":[]},{"id":"6","entities":[],"warnings":[]},{"id":"7","entities":[],"warnings":[]},{"id":"8","entities":[],"warnings":[]},{"id":"9","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-05-12T19:14:39.4039874Z","name":"NA","state":"succeeded","results":{"documents":[{"id":"0","keyPhrases":["random text"],"warnings":[]},{"id":"1","keyPhrases":["random text"],"warnings":[]},{"id":"2","keyPhrases":["random text"],"warnings":[]},{"id":"3","keyPhrases":["random text"],"warnings":[]},{"id":"4","keyPhrases":["random text"],"warnings":[]},{"id":"5","keyPhrases":["random text"],"warnings":[]},{"id":"6","keyPhrases":["random text"],"warnings":[]},{"id":"7","keyPhrases":["random text"],"warnings":[]},{"id":"8","keyPhrases":["random text"],"warnings":[]},{"id":"9","keyPhrases":["random text"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]},"@nextLink":"https://endpoint/text/analytics/v3.1-preview.5/analyze/jobs/0983681f-45ed-4a66-90bb-5a0fa6cb2646?$skip=10&$top=10&showStats=False"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '198',
  'apim-request-id',
  '89e1417a-3350-4ce0-85d9-9a1443553ee8',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 12 May 2021 19:14:43 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1-preview.5/analyze/jobs/0983681f-45ed-4a66-90bb-5a0fa6cb2646')
  .query(true)
  .reply(200, {"jobId":"0983681f-45ed-4a66-90bb-5a0fa6cb2646","lastUpdateDateTime":"2021-05-12T19:14:40Z","createdDateTime":"2021-05-12T19:14:32Z","expirationDateTime":"2021-05-13T19:14:32Z","status":"succeeded","errors":[],"displayName":"NA","tasks":{"details":{"name":"NA","lastUpdateDateTime":"2021-05-12T19:14:40Z"},"completed":2,"failed":0,"inProgress":0,"total":2,"entityRecognitionTasks":[{"lastUpdateDateTime":"2021-05-12T19:14:40.9947506Z","name":"NA","state":"succeeded","results":{"documents":[{"id":"10","entities":[],"warnings":[]},{"id":"11","entities":[],"warnings":[]},{"id":"12","entities":[],"warnings":[]},{"id":"13","entities":[],"warnings":[]},{"id":"14","entities":[],"warnings":[]},{"id":"15","entities":[],"warnings":[]},{"id":"16","entities":[],"warnings":[]},{"id":"17","entities":[],"warnings":[]},{"id":"18","entities":[],"warnings":[]},{"id":"19","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-05-12T19:14:39.4039874Z","name":"NA","state":"succeeded","results":{"documents":[{"id":"10","keyPhrases":["random text"],"warnings":[]},{"id":"11","keyPhrases":["random text"],"warnings":[]},{"id":"12","keyPhrases":["random text"],"warnings":[]},{"id":"13","keyPhrases":["random text"],"warnings":[]},{"id":"14","keyPhrases":["random text"],"warnings":[]},{"id":"15","keyPhrases":["random text"],"warnings":[]},{"id":"16","keyPhrases":["random text"],"warnings":[]},{"id":"17","keyPhrases":["random text"],"warnings":[]},{"id":"18","keyPhrases":["random text"],"warnings":[]},{"id":"19","keyPhrases":["random text"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]},"@nextLink":"https://endpoint/text/analytics/v3.1-preview.5/analyze/jobs/0983681f-45ed-4a66-90bb-5a0fa6cb2646?$skip=20&$top=5&showStats=False"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '248',
  'apim-request-id',
  '65925475-8f58-4079-bc03-dfeb7b9610fd',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 12 May 2021 19:14:44 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1-preview.5/analyze/jobs/0983681f-45ed-4a66-90bb-5a0fa6cb2646')
  .query(true)
  .reply(200, {"jobId":"0983681f-45ed-4a66-90bb-5a0fa6cb2646","lastUpdateDateTime":"2021-05-12T19:14:40Z","createdDateTime":"2021-05-12T19:14:32Z","expirationDateTime":"2021-05-13T19:14:32Z","status":"succeeded","errors":[],"displayName":"NA","tasks":{"details":{"name":"NA","lastUpdateDateTime":"2021-05-12T19:14:40Z"},"completed":2,"failed":0,"inProgress":0,"total":2,"entityRecognitionTasks":[{"lastUpdateDateTime":"2021-05-12T19:14:40.9947506Z","name":"NA","state":"succeeded","results":{"documents":[{"id":"20","entities":[],"warnings":[]},{"id":"21","entities":[],"warnings":[]},{"id":"22","entities":[],"warnings":[]},{"id":"23","entities":[],"warnings":[]},{"id":"24","entities":[{"text":"Microsoft","category":"Organization","offset":0,"length":9,"confidenceScore":0.95},{"text":"Bill Gates","category":"Person","offset":25,"length":10,"confidenceScore":0.99},{"text":"Paul Allen","category":"Person","offset":40,"length":10,"confidenceScore":0.99}],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-05-12T19:14:39.4039874Z","name":"NA","state":"succeeded","results":{"documents":[{"id":"20","keyPhrases":["random text"],"warnings":[]},{"id":"21","keyPhrases":["random text"],"warnings":[]},{"id":"22","keyPhrases":["random text"],"warnings":[]},{"id":"23","keyPhrases":["random text"],"warnings":[]},{"id":"24","keyPhrases":["Bill Gates","Paul Allen","Microsoft"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '126',
  'apim-request-id',
  'f0ab20a2-3eb4-4669-b14c-ac97f39c48ea',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 12 May 2021 19:14:44 GMT'
]);

let nock = require('nock');

module.exports.hash = "e5e3ed340719a68a7b1a9cadf60f7160";

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
  '1136feff-cc47-48a2-95f0-ef8ebf51fd00',
  'x-ms-ests-server',
  '2.1.11654.25 - EUS ProdSlices',
  'Set-Cookie',
  'fpc=Ave_GjjohnVApSG4euXngXU; expires=Wed, 09-Jun-2021 21:37:42 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrZAM-AtZWG0g_zukEnV4g4kTaGf9ZKLT8U_MV-FN4MWoS2B9BkKktzQbpNgLXdSK2t-D7A5lKbwIEekqOOXkC9W64TZ3n4tQ_VjWFRJmkIhoy2DjXWoVLaBmgkZkf19c5TMJvp59gjw9djyUJlGqkz4-tOWPhF9ggsuzh4VQgbnMgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Mon, 10 May 2021 21:37:41 GMT',
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
  'aa649f74-4d59-4262-8a0c-324b86d00300',
  'x-ms-ests-server',
  '2.1.11722.21 - NCUS ProdSlices',
  'Set-Cookie',
  'fpc=Ave_GjjohnVApSG4euXngXU; expires=Wed, 09-Jun-2021 21:37:42 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrJZr7OazJpfRpNZDyPW2fYYjTL9_f8aGO3geJfiE83TdgyA3mZJdRsDV48wmmCZyK3RL9omZL3OEwk8kZN9-DkFFpmHOCAPk7kYFdaOjR-FUw91EqnPGCd2a45h418jVK5XrJFbuJOrGQe41VLJQEtdGYSzJKcMPb4dFFPeIgjY0gAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Mon, 10 May 2021 21:37:41 GMT',
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
  'ffed6060-64ef-4bb5-a1f1-4959782d6500',
  'x-ms-ests-server',
  '2.1.11722.21 - WUS2 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=Ave_GjjohnVApSG4euXngXVz_bg1AQAAAKWeK9gOAAAA; expires=Wed, 09-Jun-2021 21:37:42 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Mon, 10 May 2021 21:37:41 GMT',
  'Content-Length',
  '1331'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('//text/analytics/v3.1-preview.5/analyze', {"tasks":{"entityRecognitionTasks":[{"parameters":{"model-version":"latest","stringIndexType":"Utf16CodeUnit"}}],"entityRecognitionPiiTasks":[{"parameters":{"model-version":"latest","stringIndexType":"Utf16CodeUnit"}}],"keyPhraseExtractionTasks":[{"parameters":{"model-version":"latest"}}]},"analysisInput":{"documents":[{"id":"56","text":":)"},{"id":"0","text":":("},{"id":"22","text":""},{"id":"19","text":":P"},{"id":"1","text":":D"}]}})
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'operation-location',
  'https://endpoint/text/analytics/v3.1-preview.5/analyze/jobs/eba0f1ab-02b3-425f-864b-c8182cb7f3bf',
  'x-envoy-upstream-service-time',
  '5274',
  'apim-request-id',
  '06f9a52c-4a24-4c38-b5ea-bc946572ca4d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 10 May 2021 21:37:52 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1-preview.5/analyze/jobs/eba0f1ab-02b3-425f-864b-c8182cb7f3bf')
  .query(true)
  .reply(200, {"jobId":"eba0f1ab-02b3-425f-864b-c8182cb7f3bf","lastUpdateDateTime":"2021-05-10T21:37:52Z","createdDateTime":"2021-05-10T21:37:47Z","expirationDateTime":"2021-05-11T21:37:47Z","status":"notStarted","errors":[],"displayName":"NA","tasks":{"details":{"name":"NA","lastUpdateDateTime":"2021-05-10T21:37:52Z"},"completed":0,"failed":0,"inProgress":3,"total":3}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '137',
  'apim-request-id',
  '2d33efe2-eba1-4a11-be97-9100ddf6a30b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 10 May 2021 21:37:53 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1-preview.5/analyze/jobs/eba0f1ab-02b3-425f-864b-c8182cb7f3bf')
  .query(true)
  .reply(200, {"jobId":"eba0f1ab-02b3-425f-864b-c8182cb7f3bf","lastUpdateDateTime":"2021-05-10T21:37:52Z","createdDateTime":"2021-05-10T21:37:47Z","expirationDateTime":"2021-05-11T21:37:47Z","status":"notStarted","errors":[],"displayName":"NA","tasks":{"details":{"name":"NA","lastUpdateDateTime":"2021-05-10T21:37:52Z"},"completed":0,"failed":0,"inProgress":3,"total":3}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '2669',
  'apim-request-id',
  'a9319602-4dba-409b-b613-ff26aed3c93e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 10 May 2021 21:37:55 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1-preview.5/analyze/jobs/eba0f1ab-02b3-425f-864b-c8182cb7f3bf')
  .query(true)
  .reply(200, {"jobId":"eba0f1ab-02b3-425f-864b-c8182cb7f3bf","lastUpdateDateTime":"2021-05-10T21:37:58Z","createdDateTime":"2021-05-10T21:37:47Z","expirationDateTime":"2021-05-11T21:37:47Z","status":"running","errors":[],"displayName":"NA","tasks":{"details":{"name":"NA","lastUpdateDateTime":"2021-05-10T21:37:58Z"},"completed":0,"failed":0,"inProgress":3,"total":3}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '2611',
  'apim-request-id',
  '247c4e9b-f6a3-4566-9e97-9f97109da453',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 10 May 2021 21:38:00 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1-preview.5/analyze/jobs/eba0f1ab-02b3-425f-864b-c8182cb7f3bf')
  .query(true)
  .reply(200, {"jobId":"eba0f1ab-02b3-425f-864b-c8182cb7f3bf","lastUpdateDateTime":"2021-05-10T21:37:58Z","createdDateTime":"2021-05-10T21:37:47Z","expirationDateTime":"2021-05-11T21:37:47Z","status":"running","errors":[],"displayName":"NA","tasks":{"details":{"name":"NA","lastUpdateDateTime":"2021-05-10T21:37:58Z"},"completed":0,"failed":0,"inProgress":3,"total":3}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '8',
  'apim-request-id',
  'babc33f5-b3d4-42b6-be9c-969de3f39b03',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 10 May 2021 21:38:02 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1-preview.5/analyze/jobs/eba0f1ab-02b3-425f-864b-c8182cb7f3bf')
  .query(true)
  .reply(200, {"jobId":"eba0f1ab-02b3-425f-864b-c8182cb7f3bf","lastUpdateDateTime":"2021-05-10T21:38:08Z","createdDateTime":"2021-05-10T21:37:47Z","expirationDateTime":"2021-05-11T21:37:47Z","status":"running","errors":[],"displayName":"NA","tasks":{"details":{"name":"NA","lastUpdateDateTime":"2021-05-10T21:38:08Z"},"completed":0,"failed":0,"inProgress":3,"total":3}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '5041',
  'apim-request-id',
  'b295da67-3326-44be-9ef5-67b8188028b1',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 10 May 2021 21:38:09 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1-preview.5/analyze/jobs/eba0f1ab-02b3-425f-864b-c8182cb7f3bf')
  .query(true)
  .reply(200, {"jobId":"eba0f1ab-02b3-425f-864b-c8182cb7f3bf","lastUpdateDateTime":"2021-05-10T21:38:12Z","createdDateTime":"2021-05-10T21:37:47Z","expirationDateTime":"2021-05-11T21:37:47Z","status":"running","errors":[],"displayName":"NA","tasks":{"details":{"name":"NA","lastUpdateDateTime":"2021-05-10T21:38:12Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-05-10T21:38:12.2215868Z","name":"NA","state":"succeeded","results":{"statistics":{"documentsCount":6,"validDocumentsCount":4,"erroneousDocumentsCount":2,"transactionsCount":4},"documents":[{"redactedText":":)","id":"56","statistics":{"charactersCount":2,"transactionsCount":1},"entities":[],"warnings":[]},{"redactedText":":(","id":"0","statistics":{"charactersCount":2,"transactionsCount":1},"entities":[],"warnings":[]},{"redactedText":":P","id":"19","statistics":{"charactersCount":2,"transactionsCount":1},"entities":[],"warnings":[]},{"redactedText":":D","id":"1","statistics":{"charactersCount":2,"transactionsCount":1},"entities":[],"warnings":[]}],"errors":[{"id":"22","error":{"code":"InvalidArgument","message":"Invalid document in request.","innererror":{"code":"InvalidDocument","message":"Document text is empty."}}},{"id":"22","error":{"code":"InvalidArgument","message":"Invalid document in request.","innererror":{"code":"InvalidDocument","message":"Document text is empty."}}}],"modelVersion":"2021-01-15"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '63',
  'apim-request-id',
  'f06b08a4-678e-4b51-b356-9f6bf560888a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 10 May 2021 21:38:12 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1-preview.5/analyze/jobs/eba0f1ab-02b3-425f-864b-c8182cb7f3bf')
  .query(true)
  .reply(200, {"jobId":"eba0f1ab-02b3-425f-864b-c8182cb7f3bf","lastUpdateDateTime":"2021-05-10T21:38:12Z","createdDateTime":"2021-05-10T21:37:47Z","expirationDateTime":"2021-05-11T21:37:47Z","status":"running","errors":[],"displayName":"NA","tasks":{"details":{"name":"NA","lastUpdateDateTime":"2021-05-10T21:38:12Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-05-10T21:38:12.2215868Z","name":"NA","state":"succeeded","results":{"statistics":{"documentsCount":6,"validDocumentsCount":4,"erroneousDocumentsCount":2,"transactionsCount":4},"documents":[{"redactedText":":)","id":"56","statistics":{"charactersCount":2,"transactionsCount":1},"entities":[],"warnings":[]},{"redactedText":":(","id":"0","statistics":{"charactersCount":2,"transactionsCount":1},"entities":[],"warnings":[]},{"redactedText":":P","id":"19","statistics":{"charactersCount":2,"transactionsCount":1},"entities":[],"warnings":[]},{"redactedText":":D","id":"1","statistics":{"charactersCount":2,"transactionsCount":1},"entities":[],"warnings":[]}],"errors":[{"id":"22","error":{"code":"InvalidArgument","message":"Invalid document in request.","innererror":{"code":"InvalidDocument","message":"Document text is empty."}}},{"id":"22","error":{"code":"InvalidArgument","message":"Invalid document in request.","innererror":{"code":"InvalidDocument","message":"Document text is empty."}}}],"modelVersion":"2021-01-15"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '63',
  'apim-request-id',
  '4dacbac6-00f2-49c2-b1a0-853caae15b7f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 10 May 2021 21:38:14 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1-preview.5/analyze/jobs/eba0f1ab-02b3-425f-864b-c8182cb7f3bf')
  .query(true)
  .reply(200, {"jobId":"eba0f1ab-02b3-425f-864b-c8182cb7f3bf","lastUpdateDateTime":"2021-05-10T21:38:12Z","createdDateTime":"2021-05-10T21:37:47Z","expirationDateTime":"2021-05-11T21:37:47Z","status":"running","errors":[],"displayName":"NA","tasks":{"details":{"name":"NA","lastUpdateDateTime":"2021-05-10T21:38:12Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-05-10T21:38:12.2215868Z","name":"NA","state":"succeeded","results":{"statistics":{"documentsCount":6,"validDocumentsCount":4,"erroneousDocumentsCount":2,"transactionsCount":4},"documents":[{"redactedText":":)","id":"56","statistics":{"charactersCount":2,"transactionsCount":1},"entities":[],"warnings":[]},{"redactedText":":(","id":"0","statistics":{"charactersCount":2,"transactionsCount":1},"entities":[],"warnings":[]},{"redactedText":":P","id":"19","statistics":{"charactersCount":2,"transactionsCount":1},"entities":[],"warnings":[]},{"redactedText":":D","id":"1","statistics":{"charactersCount":2,"transactionsCount":1},"entities":[],"warnings":[]}],"errors":[{"id":"22","error":{"code":"InvalidArgument","message":"Invalid document in request.","innererror":{"code":"InvalidDocument","message":"Document text is empty."}}},{"id":"22","error":{"code":"InvalidArgument","message":"Invalid document in request.","innererror":{"code":"InvalidDocument","message":"Document text is empty."}}}],"modelVersion":"2021-01-15"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '2632',
  'apim-request-id',
  '346ec427-d858-4309-9a06-3654f972acb2',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 10 May 2021 21:38:18 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1-preview.5/analyze/jobs/eba0f1ab-02b3-425f-864b-c8182cb7f3bf')
  .query(true)
  .reply(200, {"jobId":"eba0f1ab-02b3-425f-864b-c8182cb7f3bf","lastUpdateDateTime":"2021-05-10T21:38:19Z","createdDateTime":"2021-05-10T21:37:47Z","expirationDateTime":"2021-05-11T21:37:47Z","status":"succeeded","errors":[],"displayName":"NA","tasks":{"details":{"name":"NA","lastUpdateDateTime":"2021-05-10T21:38:19Z"},"completed":3,"failed":0,"inProgress":0,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2021-05-10T21:38:19.6534734Z","name":"NA","state":"succeeded","results":{"statistics":{"documentsCount":6,"validDocumentsCount":4,"erroneousDocumentsCount":2,"transactionsCount":4},"documents":[{"id":"56","statistics":{"charactersCount":2,"transactionsCount":1},"entities":[],"warnings":[]},{"id":"0","statistics":{"charactersCount":2,"transactionsCount":1},"entities":[],"warnings":[]},{"id":"19","statistics":{"charactersCount":2,"transactionsCount":1},"entities":[],"warnings":[]},{"id":"1","statistics":{"charactersCount":2,"transactionsCount":1},"entities":[],"warnings":[]}],"errors":[{"id":"22","error":{"code":"InvalidArgument","message":"Invalid document in request.","innererror":{"code":"InvalidDocument","message":"Document text is empty."}}},{"id":"22","error":{"code":"InvalidArgument","message":"Invalid document in request.","innererror":{"code":"InvalidDocument","message":"Document text is empty."}}}],"modelVersion":"2021-01-15"}}],"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-05-10T21:38:12.2215868Z","name":"NA","state":"succeeded","results":{"statistics":{"documentsCount":6,"validDocumentsCount":4,"erroneousDocumentsCount":2,"transactionsCount":4},"documents":[{"redactedText":":)","id":"56","statistics":{"charactersCount":2,"transactionsCount":1},"entities":[],"warnings":[]},{"redactedText":":(","id":"0","statistics":{"charactersCount":2,"transactionsCount":1},"entities":[],"warnings":[]},{"redactedText":":P","id":"19","statistics":{"charactersCount":2,"transactionsCount":1},"entities":[],"warnings":[]},{"redactedText":":D","id":"1","statistics":{"charactersCount":2,"transactionsCount":1},"entities":[],"warnings":[]}],"errors":[{"id":"22","error":{"code":"InvalidArgument","message":"Invalid document in request.","innererror":{"code":"InvalidDocument","message":"Document text is empty."}}},{"id":"22","error":{"code":"InvalidArgument","message":"Invalid document in request.","innererror":{"code":"InvalidDocument","message":"Document text is empty."}}}],"modelVersion":"2021-01-15"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-05-10T21:38:19.7770251Z","name":"NA","state":"succeeded","results":{"statistics":{"documentsCount":5,"validDocumentsCount":4,"erroneousDocumentsCount":1,"transactionsCount":4},"documents":[{"id":"56","keyPhrases":[],"statistics":{"charactersCount":2,"transactionsCount":1},"warnings":[]},{"id":"0","keyPhrases":[],"statistics":{"charactersCount":2,"transactionsCount":1},"warnings":[]},{"id":"19","keyPhrases":[],"statistics":{"charactersCount":2,"transactionsCount":1},"warnings":[]},{"id":"1","keyPhrases":[],"statistics":{"charactersCount":2,"transactionsCount":1},"warnings":[]}],"errors":[{"id":"22","error":{"code":"InvalidArgument","message":"Invalid document in request.","innererror":{"code":"InvalidDocument","message":"Document text is empty."}}}],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7763',
  'apim-request-id',
  '0682559a-bdf3-42c3-8323-7e7bcc0c3a17',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 10 May 2021 21:38:28 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1-preview.5/analyze/jobs/eba0f1ab-02b3-425f-864b-c8182cb7f3bf')
  .query(true)
  .reply(200, {"jobId":"eba0f1ab-02b3-425f-864b-c8182cb7f3bf","lastUpdateDateTime":"2021-05-10T21:38:19Z","createdDateTime":"2021-05-10T21:37:47Z","expirationDateTime":"2021-05-11T21:37:47Z","status":"succeeded","errors":[],"displayName":"NA","tasks":{"details":{"name":"NA","lastUpdateDateTime":"2021-05-10T21:38:19Z"},"completed":3,"failed":0,"inProgress":0,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2021-05-10T21:38:19.6534734Z","name":"NA","state":"succeeded","results":{"statistics":{"documentsCount":6,"validDocumentsCount":4,"erroneousDocumentsCount":2,"transactionsCount":4},"documents":[{"id":"56","statistics":{"charactersCount":2,"transactionsCount":1},"entities":[],"warnings":[]},{"id":"0","statistics":{"charactersCount":2,"transactionsCount":1},"entities":[],"warnings":[]},{"id":"19","statistics":{"charactersCount":2,"transactionsCount":1},"entities":[],"warnings":[]},{"id":"1","statistics":{"charactersCount":2,"transactionsCount":1},"entities":[],"warnings":[]}],"errors":[{"id":"22","error":{"code":"InvalidArgument","message":"Invalid document in request.","innererror":{"code":"InvalidDocument","message":"Document text is empty."}}},{"id":"22","error":{"code":"InvalidArgument","message":"Invalid document in request.","innererror":{"code":"InvalidDocument","message":"Document text is empty."}}}],"modelVersion":"2021-01-15"}}],"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-05-10T21:38:12.2215868Z","name":"NA","state":"succeeded","results":{"statistics":{"documentsCount":6,"validDocumentsCount":4,"erroneousDocumentsCount":2,"transactionsCount":4},"documents":[{"redactedText":":)","id":"56","statistics":{"charactersCount":2,"transactionsCount":1},"entities":[],"warnings":[]},{"redactedText":":(","id":"0","statistics":{"charactersCount":2,"transactionsCount":1},"entities":[],"warnings":[]},{"redactedText":":P","id":"19","statistics":{"charactersCount":2,"transactionsCount":1},"entities":[],"warnings":[]},{"redactedText":":D","id":"1","statistics":{"charactersCount":2,"transactionsCount":1},"entities":[],"warnings":[]}],"errors":[{"id":"22","error":{"code":"InvalidArgument","message":"Invalid document in request.","innererror":{"code":"InvalidDocument","message":"Document text is empty."}}},{"id":"22","error":{"code":"InvalidArgument","message":"Invalid document in request.","innererror":{"code":"InvalidDocument","message":"Document text is empty."}}}],"modelVersion":"2021-01-15"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-05-10T21:38:19.7770251Z","name":"NA","state":"succeeded","results":{"statistics":{"documentsCount":5,"validDocumentsCount":4,"erroneousDocumentsCount":1,"transactionsCount":4},"documents":[{"id":"56","keyPhrases":[],"statistics":{"charactersCount":2,"transactionsCount":1},"warnings":[]},{"id":"0","keyPhrases":[],"statistics":{"charactersCount":2,"transactionsCount":1},"warnings":[]},{"id":"19","keyPhrases":[],"statistics":{"charactersCount":2,"transactionsCount":1},"warnings":[]},{"id":"1","keyPhrases":[],"statistics":{"charactersCount":2,"transactionsCount":1},"warnings":[]}],"errors":[{"id":"22","error":{"code":"InvalidArgument","message":"Invalid document in request.","innererror":{"code":"InvalidDocument","message":"Document text is empty."}}}],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '5305',
  'apim-request-id',
  '6d02c40b-84a9-424f-962b-0ebe9972fbdf',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 10 May 2021 21:38:33 GMT'
]);

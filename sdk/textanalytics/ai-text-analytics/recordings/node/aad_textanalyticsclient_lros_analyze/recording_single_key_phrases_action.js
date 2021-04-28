let nock = require('nock');

module.exports.hash = "0ca80d72c5fc380d9c4ed2b8344fe09e";

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
  'e45b50b2-7de1-496e-8e45-62e1dae20802',
  'x-ms-ests-server',
  '2.1.11654.16 - WUS2 ProdSlices',
  'Set-Cookie',
  'fpc=Au8MJrNuQyZHoLASLJ-TetBz_bg1DgAAACnFG9gOAAAA; expires=Fri, 28-May-2021 21:07:31 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevrgvvl_WjRCxgE6etWRz-ArSpDeirFcHWPWjDT9qhWO9i0pLxB0gWPfalNQMxn0wt-3FzKXXlxYab5YMPhkm4oII2yzNrBpXldvcLlJsVTwH2kvJGuKdQipepSJIEhyvjneHxaoaoAq8k_ocAo5zPfKGwvAmSdzb9CGFQPG1WfcX0gAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 28 Apr 2021 21:07:30 GMT'
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
  '3c2d26e4-01dc-4b53-a39f-c7929f470f00',
  'x-ms-ests-server',
  '2.1.11654.16 - WUS2 ProdSlices',
  'Set-Cookie',
  'fpc=Au8MJrNuQyZHoLASLJ-TetBz_bg1DgAAACnFG9gOAAAA; expires=Fri, 28-May-2021 21:07:31 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrNpGzR7xrJi6PCZIbTp7Mk_f8cBYpRMOq3THCym2oW5CG_o5-nIRPMnDNPwkllw4U4B3VXFlEJ4QXb_4BwAvtY1dKAEushaCCxI_nrBqp52qJ38aY3YuaUGJTqG6XcAUZM00o7EuJJFepUSeCZBX4gyQy3CdwVrJ-a05cDLjLHFQgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 28 Apr 2021 21:07:30 GMT'
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
  'c250934a-b97f-464b-a6e3-2a7c80c31b01',
  'x-ms-ests-server',
  '2.1.11654.16 - SCUS ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=Au8MJrNuQyZHoLASLJ-TetBz_bg1DgAAACnFG9gOAAAA; expires=Fri, 28-May-2021 21:07:31 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 28 Apr 2021 21:07:30 GMT',
  'Content-Length',
  '1331'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/text/analytics/v3.1-preview.4/analyze', {"tasks":{"keyPhraseExtractionTasks":[{"parameters":{"model-version":"latest"}}]},"analysisInput":{"documents":[{"id":"1","text":"Microsoft was founded by Bill Gates and Paul Allen","language":"en"},{"id":"2","text":"Microsoft fue fundado por Bill Gates y Paul Allen","language":"es"}]}})
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'operation-location',
  'https://endpoint/text/analytics/v3.1-preview.4/analyze/jobs/8dfa6596-6214-4e1b-b5ae-9588545e3d4c',
  'x-envoy-upstream-service-time',
  '302',
  'apim-request-id',
  'ae913179-2bea-40c0-a96c-910da1b6109d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:07:31 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/8dfa6596-6214-4e1b-b5ae-9588545e3d4c')
  .query(true)
  .reply(200, {"jobId":"8dfa6596-6214-4e1b-b5ae-9588545e3d4c","lastUpdateDateTime":"2021-04-28T21:07:31Z","createdDateTime":"2021-04-28T21:07:31Z","expirationDateTime":"2021-04-29T21:07:31Z","status":"notStarted","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-04-28T21:07:31Z"},"completed":0,"failed":0,"inProgress":0,"total":0}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '11',
  'apim-request-id',
  '184e40e8-bb09-4d31-9ba8-8d31cb6d2bc1',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:07:31 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/8dfa6596-6214-4e1b-b5ae-9588545e3d4c')
  .query(true)
  .reply(200, {"jobId":"8dfa6596-6214-4e1b-b5ae-9588545e3d4c","lastUpdateDateTime":"2021-04-28T21:07:31Z","createdDateTime":"2021-04-28T21:07:31Z","expirationDateTime":"2021-04-29T21:07:31Z","status":"notStarted","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-04-28T21:07:31Z"},"completed":0,"failed":0,"inProgress":0,"total":0}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '10',
  'apim-request-id',
  '11aa7932-879b-4459-ac25-4f2e58ad3368',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:07:31 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/8dfa6596-6214-4e1b-b5ae-9588545e3d4c')
  .query(true)
  .reply(200, {"jobId":"8dfa6596-6214-4e1b-b5ae-9588545e3d4c","lastUpdateDateTime":"2021-04-28T21:07:32Z","createdDateTime":"2021-04-28T21:07:31Z","expirationDateTime":"2021-04-29T21:07:31Z","status":"notStarted","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-04-28T21:07:32Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '71',
  'apim-request-id',
  '1d09038b-ec4a-4e93-ba71-686215c33445',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:07:33 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/8dfa6596-6214-4e1b-b5ae-9588545e3d4c')
  .query(true)
  .reply(200, {"jobId":"8dfa6596-6214-4e1b-b5ae-9588545e3d4c","lastUpdateDateTime":"2021-04-28T21:07:32Z","createdDateTime":"2021-04-28T21:07:31Z","expirationDateTime":"2021-04-29T21:07:31Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-04-28T21:07:32Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '76',
  'apim-request-id',
  '2ef68091-56d2-419d-996f-8c21caad3bd5',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:07:35 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/8dfa6596-6214-4e1b-b5ae-9588545e3d4c')
  .query(true)
  .reply(200, {"jobId":"8dfa6596-6214-4e1b-b5ae-9588545e3d4c","lastUpdateDateTime":"2021-04-28T21:07:32Z","createdDateTime":"2021-04-28T21:07:31Z","expirationDateTime":"2021-04-29T21:07:31Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-04-28T21:07:32Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '72',
  'apim-request-id',
  '65cdbeed-d3bb-4c42-af4f-83ffd6bd4a16',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:07:37 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/8dfa6596-6214-4e1b-b5ae-9588545e3d4c')
  .query(true)
  .reply(200, {"jobId":"8dfa6596-6214-4e1b-b5ae-9588545e3d4c","lastUpdateDateTime":"2021-04-28T21:07:32Z","createdDateTime":"2021-04-28T21:07:31Z","expirationDateTime":"2021-04-29T21:07:31Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-04-28T21:07:32Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '86',
  'apim-request-id',
  '56072b02-6e99-4040-a06f-ef83d689525a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:07:39 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/8dfa6596-6214-4e1b-b5ae-9588545e3d4c')
  .query(true)
  .reply(200, {"jobId":"8dfa6596-6214-4e1b-b5ae-9588545e3d4c","lastUpdateDateTime":"2021-04-28T21:07:32Z","createdDateTime":"2021-04-28T21:07:31Z","expirationDateTime":"2021-04-29T21:07:31Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-04-28T21:07:32Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '85',
  'apim-request-id',
  'b27dc12d-f871-4272-acf4-f58073a053a2',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:07:41 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/8dfa6596-6214-4e1b-b5ae-9588545e3d4c')
  .query(true)
  .reply(200, {"jobId":"8dfa6596-6214-4e1b-b5ae-9588545e3d4c","lastUpdateDateTime":"2021-04-28T21:07:32Z","createdDateTime":"2021-04-28T21:07:31Z","expirationDateTime":"2021-04-29T21:07:31Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-04-28T21:07:32Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '82',
  'apim-request-id',
  'ccd025a4-30d1-400a-a7b8-260c8ea07e22',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:07:45 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/8dfa6596-6214-4e1b-b5ae-9588545e3d4c')
  .query(true)
  .reply(200, {"jobId":"8dfa6596-6214-4e1b-b5ae-9588545e3d4c","lastUpdateDateTime":"2021-04-28T21:07:32Z","createdDateTime":"2021-04-28T21:07:31Z","expirationDateTime":"2021-04-29T21:07:31Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-04-28T21:07:32Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '75',
  'apim-request-id',
  '41965815-2449-4b73-98ed-d65ffb65e69c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:07:47 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/8dfa6596-6214-4e1b-b5ae-9588545e3d4c')
  .query(true)
  .reply(200, {"jobId":"8dfa6596-6214-4e1b-b5ae-9588545e3d4c","lastUpdateDateTime":"2021-04-28T21:07:32Z","createdDateTime":"2021-04-28T21:07:31Z","expirationDateTime":"2021-04-29T21:07:31Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-04-28T21:07:32Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '85',
  'apim-request-id',
  '8caf0ae1-2aa8-4cec-9c8c-958b7988d545',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:07:49 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/8dfa6596-6214-4e1b-b5ae-9588545e3d4c')
  .query(true)
  .reply(200, {"jobId":"8dfa6596-6214-4e1b-b5ae-9588545e3d4c","lastUpdateDateTime":"2021-04-28T21:07:32Z","createdDateTime":"2021-04-28T21:07:31Z","expirationDateTime":"2021-04-29T21:07:31Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-04-28T21:07:32Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '84',
  'apim-request-id',
  'a3005c7e-04b7-4249-9798-99491f253e65',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:07:51 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/8dfa6596-6214-4e1b-b5ae-9588545e3d4c')
  .query(true)
  .reply(200, {"jobId":"8dfa6596-6214-4e1b-b5ae-9588545e3d4c","lastUpdateDateTime":"2021-04-28T21:07:32Z","createdDateTime":"2021-04-28T21:07:31Z","expirationDateTime":"2021-04-29T21:07:31Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-04-28T21:07:32Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '119',
  'apim-request-id',
  '1acb1af1-9336-4ada-a231-c65257d5877a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:07:53 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/8dfa6596-6214-4e1b-b5ae-9588545e3d4c')
  .query(true)
  .reply(200, {"jobId":"8dfa6596-6214-4e1b-b5ae-9588545e3d4c","lastUpdateDateTime":"2021-04-28T21:07:32Z","createdDateTime":"2021-04-28T21:07:31Z","expirationDateTime":"2021-04-29T21:07:31Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-04-28T21:07:32Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '80',
  'apim-request-id',
  '3fe85041-584e-4ac3-a2c6-7ba9ccb0db54',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:07:55 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/8dfa6596-6214-4e1b-b5ae-9588545e3d4c')
  .query(true)
  .reply(200, {"jobId":"8dfa6596-6214-4e1b-b5ae-9588545e3d4c","lastUpdateDateTime":"2021-04-28T21:07:32Z","createdDateTime":"2021-04-28T21:07:31Z","expirationDateTime":"2021-04-29T21:07:31Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-04-28T21:07:32Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '88',
  'apim-request-id',
  'e23fa64a-b23d-453b-bf76-81dbb2a032b0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:07:57 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/8dfa6596-6214-4e1b-b5ae-9588545e3d4c')
  .query(true)
  .reply(200, {"jobId":"8dfa6596-6214-4e1b-b5ae-9588545e3d4c","lastUpdateDateTime":"2021-04-28T21:07:32Z","createdDateTime":"2021-04-28T21:07:31Z","expirationDateTime":"2021-04-29T21:07:31Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-04-28T21:07:32Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '107',
  'apim-request-id',
  'eca001c1-095d-45ec-86c8-cc7e6d296156',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:07:59 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/8dfa6596-6214-4e1b-b5ae-9588545e3d4c')
  .query(true)
  .reply(200, {"jobId":"8dfa6596-6214-4e1b-b5ae-9588545e3d4c","lastUpdateDateTime":"2021-04-28T21:07:32Z","createdDateTime":"2021-04-28T21:07:31Z","expirationDateTime":"2021-04-29T21:07:31Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-04-28T21:07:32Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '81',
  'apim-request-id',
  '392b73f4-b77c-40f0-bd64-2dd830594582',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:08:01 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/8dfa6596-6214-4e1b-b5ae-9588545e3d4c')
  .query(true)
  .reply(200, {"jobId":"8dfa6596-6214-4e1b-b5ae-9588545e3d4c","lastUpdateDateTime":"2021-04-28T21:07:32Z","createdDateTime":"2021-04-28T21:07:31Z","expirationDateTime":"2021-04-29T21:07:31Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-04-28T21:07:32Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '46',
  'apim-request-id',
  'e0073f46-629a-4e1f-b549-c60f6a972bda',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:08:03 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/8dfa6596-6214-4e1b-b5ae-9588545e3d4c')
  .query(true)
  .reply(200, {"jobId":"8dfa6596-6214-4e1b-b5ae-9588545e3d4c","lastUpdateDateTime":"2021-04-28T21:07:32Z","createdDateTime":"2021-04-28T21:07:31Z","expirationDateTime":"2021-04-29T21:07:31Z","status":"succeeded","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-04-28T21:07:32Z"},"completed":1,"failed":0,"inProgress":0,"total":1,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-04-28T21:07:32.2201252Z","state":"succeeded","results":{"documents":[{"id":"1","keyPhrases":["Bill Gates","Paul Allen","Microsoft"],"warnings":[]},{"id":"2","keyPhrases":["Bill Gates","Paul Allen","Microsoft"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '116',
  'apim-request-id',
  '928977ca-b7e9-43c4-9693-fae4ca27c997',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:08:05 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/8dfa6596-6214-4e1b-b5ae-9588545e3d4c')
  .query(true)
  .reply(200, {"jobId":"8dfa6596-6214-4e1b-b5ae-9588545e3d4c","lastUpdateDateTime":"2021-04-28T21:07:32Z","createdDateTime":"2021-04-28T21:07:31Z","expirationDateTime":"2021-04-29T21:07:31Z","status":"succeeded","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-04-28T21:07:32Z"},"completed":1,"failed":0,"inProgress":0,"total":1,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-04-28T21:07:32.2201252Z","state":"succeeded","results":{"documents":[{"id":"1","keyPhrases":["Bill Gates","Paul Allen","Microsoft"],"warnings":[]},{"id":"2","keyPhrases":["Bill Gates","Paul Allen","Microsoft"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '79',
  'apim-request-id',
  '4b6a5f8d-c5f9-4e7e-9758-ad5304f5fb89',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:08:05 GMT'
]);

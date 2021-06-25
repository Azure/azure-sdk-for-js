let nock = require('nock');

module.exports.hash = "0c018911d7b8c915100686d9373b4af8";

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
  '154716cb-3ae1-44c9-a694-861f6b035201',
  'x-ms-ests-server',
  '2.1.11829.4 - SCUS ProdSlices',
  'Set-Cookie',
  'fpc=Alzs-a_zlZhFj2AARRsDwrZz_bg1EAAAALxYZ9gOAAAA; expires=Sun, 25-Jul-2021 04:58:25 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrFqF-6_rNB0D0BJ1ChEvD5nyBMLbnNdVq9xK3TBWbzktRTjHduuVb4xoglRPrlNp1zm_JDVNYFka6ODk48ie-9bkfRSAyJnTpG7WG_4RnKShfR4tp-MqaTb2JpeJsfEMhTpSoJ93TiYRu-0ZyYpszI7yhB6ZlQB-gI6VkD2QWMRMgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 25 Jun 2021 04:58:24 GMT',
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
  'ea585702-0e37-436b-95fd-626d022f4600',
  'x-ms-ests-server',
  '2.1.11829.9 - WUS2 ProdSlices',
  'Set-Cookie',
  'fpc=Alzs-a_zlZhFj2AARRsDwrZz_bg1EAAAALxYZ9gOAAAA; expires=Sun, 25-Jul-2021 04:58:25 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevrw1X6H_t4giTTTjzCJLlePgZXxjOrCfR8bxmS0fsqEHvxxVIICIbohT7SqHAmir0z207bCbQ6eDSMKDvpMizktxBd0doWvrLmkVPcw25oJCqkM8YV4k4TPVGP4S96Zyx4K2S6vM5KAZUCYCN8UFGmmPhPzz_h67ECETmk0-XMrN0gAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 25 Jun 2021 04:58:24 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.1.0&x-client-OS=linux&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=2|771,0|,&x-client-last-telemetry=2|0|||0,0&client-request-id=5bf06e4e-24e6-4c0c-803b-ff237d71eb25&client_secret=azure_client_secret")
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
  '56159a1d-88c6-4405-8f32-641f752c4b00',
  'x-ms-ests-server',
  '2.1.11829.9 - EUS ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=Alzs-a_zlZhFj2AARRsDwrZz_bg1EAAAALxYZ9gOAAAA; expires=Sun, 25-Jul-2021 04:58:25 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 25 Jun 2021 04:58:24 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('//text/analytics/v3.1/entities/health/jobs', {"documents":[{"id":"1","text":"","language":"en"},{"id":"2","text":"Patient does not suffer from high blood pressure.","language":"english"},{"id":"3","text":"","language":"en"}]})
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'operation-location',
  'https://endpoint/text/analytics/v3.1/entities/health/jobs/b2c5af9a-a6d5-41e9-82c2-3b6d727a839b',
  'x-envoy-upstream-service-time',
  '155',
  'apim-request-id',
  '818c4658-ae57-4060-9143-56b6e4074309',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 04:58:25 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/entities/health/jobs/b2c5af9a-a6d5-41e9-82c2-3b6d727a839b')
  .query(true)
  .reply(200, {"jobId":"b2c5af9a-a6d5-41e9-82c2-3b6d727a839b","lastUpdateDateTime":"2021-06-25T04:58:25Z","createdDateTime":"2021-06-25T04:58:25Z","expirationDateTime":"2021-06-26T04:58:25Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '8',
  'apim-request-id',
  'e71b3237-8a81-4e08-8fdd-e33f522c3cba',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 04:58:25 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/entities/health/jobs/b2c5af9a-a6d5-41e9-82c2-3b6d727a839b')
  .query(true)
  .reply(200, {"jobId":"b2c5af9a-a6d5-41e9-82c2-3b6d727a839b","lastUpdateDateTime":"2021-06-25T04:58:25Z","createdDateTime":"2021-06-25T04:58:25Z","expirationDateTime":"2021-06-26T04:58:25Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  '7d1cbbc5-981b-4175-891a-afc6b7434e84',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 04:58:25 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/entities/health/jobs/b2c5af9a-a6d5-41e9-82c2-3b6d727a839b')
  .query(true)
  .reply(200, {"jobId":"b2c5af9a-a6d5-41e9-82c2-3b6d727a839b","lastUpdateDateTime":"2021-06-25T04:58:25Z","createdDateTime":"2021-06-25T04:58:25Z","expirationDateTime":"2021-06-26T04:58:25Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '8',
  'apim-request-id',
  '2b075d7a-2eef-4502-9d4f-15adad350950',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 04:58:27 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/entities/health/jobs/b2c5af9a-a6d5-41e9-82c2-3b6d727a839b')
  .query(true)
  .reply(200, {"jobId":"b2c5af9a-a6d5-41e9-82c2-3b6d727a839b","lastUpdateDateTime":"2021-06-25T04:58:25Z","createdDateTime":"2021-06-25T04:58:25Z","expirationDateTime":"2021-06-26T04:58:25Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '9',
  'apim-request-id',
  '2cec155d-2db0-41fe-ba42-0539eea9aee4',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 04:58:29 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/entities/health/jobs/b2c5af9a-a6d5-41e9-82c2-3b6d727a839b')
  .query(true)
  .reply(200, {"jobId":"b2c5af9a-a6d5-41e9-82c2-3b6d727a839b","lastUpdateDateTime":"2021-06-25T04:58:25Z","createdDateTime":"2021-06-25T04:58:25Z","expirationDateTime":"2021-06-26T04:58:25Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '8',
  'apim-request-id',
  'd20fe36c-1b98-42a6-bb50-f94a5be701eb',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 04:58:31 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/entities/health/jobs/b2c5af9a-a6d5-41e9-82c2-3b6d727a839b')
  .query(true)
  .reply(200, {"jobId":"b2c5af9a-a6d5-41e9-82c2-3b6d727a839b","lastUpdateDateTime":"2021-06-25T04:58:25Z","createdDateTime":"2021-06-25T04:58:25Z","expirationDateTime":"2021-06-26T04:58:25Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '12',
  'apim-request-id',
  'c52a206e-72ba-4046-80d4-c4e3067d9521',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 04:58:34 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/entities/health/jobs/b2c5af9a-a6d5-41e9-82c2-3b6d727a839b')
  .query(true)
  .reply(200, {"jobId":"b2c5af9a-a6d5-41e9-82c2-3b6d727a839b","lastUpdateDateTime":"2021-06-25T04:58:25Z","createdDateTime":"2021-06-25T04:58:25Z","expirationDateTime":"2021-06-26T04:58:25Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '13',
  'apim-request-id',
  'e390356a-1dac-4d96-a3ef-2df081aa03df',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 04:58:36 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/entities/health/jobs/b2c5af9a-a6d5-41e9-82c2-3b6d727a839b')
  .query(true)
  .reply(200, {"jobId":"b2c5af9a-a6d5-41e9-82c2-3b6d727a839b","lastUpdateDateTime":"2021-06-25T04:58:25Z","createdDateTime":"2021-06-25T04:58:25Z","expirationDateTime":"2021-06-26T04:58:25Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '9',
  'apim-request-id',
  '30275c42-82cc-41e3-9c2a-1ad32f8be3b3',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 04:58:37 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/entities/health/jobs/b2c5af9a-a6d5-41e9-82c2-3b6d727a839b')
  .query(true)
  .reply(200, {"jobId":"b2c5af9a-a6d5-41e9-82c2-3b6d727a839b","lastUpdateDateTime":"2021-06-25T04:58:38Z","createdDateTime":"2021-06-25T04:58:25Z","expirationDateTime":"2021-06-26T04:58:25Z","status":"running","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '10',
  'apim-request-id',
  '038b0a03-e767-4fda-b3b0-18562d6b5938',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 04:58:39 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/entities/health/jobs/b2c5af9a-a6d5-41e9-82c2-3b6d727a839b')
  .query(true)
  .reply(200, {"jobId":"b2c5af9a-a6d5-41e9-82c2-3b6d727a839b","lastUpdateDateTime":"2021-06-25T04:58:38Z","createdDateTime":"2021-06-25T04:58:25Z","expirationDateTime":"2021-06-26T04:58:25Z","status":"running","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  '655c7d87-1b4f-43a1-95d8-a809d3fdd5f0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 04:58:42 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/entities/health/jobs/b2c5af9a-a6d5-41e9-82c2-3b6d727a839b')
  .query(true)
  .reply(200, {"jobId":"b2c5af9a-a6d5-41e9-82c2-3b6d727a839b","lastUpdateDateTime":"2021-06-25T04:58:38Z","createdDateTime":"2021-06-25T04:58:25Z","expirationDateTime":"2021-06-26T04:58:25Z","status":"running","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '6',
  'apim-request-id',
  '3eb1e9c1-e337-4929-85a9-8a31e0e470a5',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 04:58:44 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/entities/health/jobs/b2c5af9a-a6d5-41e9-82c2-3b6d727a839b')
  .query(true)
  .reply(200, {"jobId":"b2c5af9a-a6d5-41e9-82c2-3b6d727a839b","lastUpdateDateTime":"2021-06-25T04:58:38Z","createdDateTime":"2021-06-25T04:58:25Z","expirationDateTime":"2021-06-26T04:58:25Z","status":"running","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '6',
  'apim-request-id',
  '99baf206-4db9-4b65-9c8a-adc4a324453f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 04:58:46 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/entities/health/jobs/b2c5af9a-a6d5-41e9-82c2-3b6d727a839b')
  .query(true)
  .reply(200, {"jobId":"b2c5af9a-a6d5-41e9-82c2-3b6d727a839b","lastUpdateDateTime":"2021-06-25T04:58:38Z","createdDateTime":"2021-06-25T04:58:25Z","expirationDateTime":"2021-06-26T04:58:25Z","status":"running","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '8',
  'apim-request-id',
  '4154c534-ff00-42df-8f86-8fa0b059a7c6',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 04:58:48 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/entities/health/jobs/b2c5af9a-a6d5-41e9-82c2-3b6d727a839b')
  .query(true)
  .reply(200, {"jobId":"b2c5af9a-a6d5-41e9-82c2-3b6d727a839b","lastUpdateDateTime":"2021-06-25T04:58:38Z","createdDateTime":"2021-06-25T04:58:25Z","expirationDateTime":"2021-06-26T04:58:25Z","status":"running","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  '950e366f-1e29-4010-a7b8-b03e6f6a7ca1',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 04:58:50 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/entities/health/jobs/b2c5af9a-a6d5-41e9-82c2-3b6d727a839b')
  .query(true)
  .reply(200, {"jobId":"b2c5af9a-a6d5-41e9-82c2-3b6d727a839b","lastUpdateDateTime":"2021-06-25T04:58:51Z","createdDateTime":"2021-06-25T04:58:25Z","expirationDateTime":"2021-06-26T04:58:25Z","status":"succeeded","errors":[],"results":{"documents":[],"errors":[{"id":"1","error":{"code":"InvalidArgument","message":"Invalid document in request.","innererror":{"code":"InvalidDocument","message":"Document text is empty."}}},{"id":"2","error":{"code":"InvalidArgument","message":"Invalid Language Code.","innererror":{"code":"UnsupportedLanguageCode","message":"Invalid language code. Supported languages: en. For additional details see https://aka.ms/text-analytics/language-support"}}},{"id":"3","error":{"code":"InvalidArgument","message":"Invalid document in request.","innererror":{"code":"InvalidDocument","message":"Document text is empty."}}}],"modelVersion":"2021-05-15"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '88',
  'apim-request-id',
  '85ad776d-cb39-461a-81c9-081e08764971',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 04:58:52 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/entities/health/jobs/b2c5af9a-a6d5-41e9-82c2-3b6d727a839b')
  .query(true)
  .reply(200, {"jobId":"b2c5af9a-a6d5-41e9-82c2-3b6d727a839b","lastUpdateDateTime":"2021-06-25T04:58:51Z","createdDateTime":"2021-06-25T04:58:25Z","expirationDateTime":"2021-06-26T04:58:25Z","status":"succeeded","errors":[],"results":{"documents":[],"errors":[{"id":"1","error":{"code":"InvalidArgument","message":"Invalid document in request.","innererror":{"code":"InvalidDocument","message":"Document text is empty."}}},{"id":"2","error":{"code":"InvalidArgument","message":"Invalid Language Code.","innererror":{"code":"UnsupportedLanguageCode","message":"Invalid language code. Supported languages: en. For additional details see https://aka.ms/text-analytics/language-support"}}},{"id":"3","error":{"code":"InvalidArgument","message":"Invalid document in request.","innererror":{"code":"InvalidDocument","message":"Document text is empty."}}}],"modelVersion":"2021-05-15"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '70',
  'apim-request-id',
  '2ccff92e-d52a-4869-94ab-b6cd8283e266',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 04:58:52 GMT'
]);

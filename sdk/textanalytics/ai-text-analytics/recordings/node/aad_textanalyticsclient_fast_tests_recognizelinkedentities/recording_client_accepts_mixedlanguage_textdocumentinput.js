let nock = require('nock');

module.exports.hash = "9063fb3ac884b0e8a06b081f163417b9";

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
  'd838f7f0-7ed6-4115-9132-f620b768e900',
  'x-ms-ests-server',
  '2.1.12158.6 - EUS ProdSlices',
  'Set-Cookie',
  'fpc=As_fhu1EyOpLrWBgmQuLJ8o; expires=Mon, 22-Nov-2021 00:43:41 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrVJY_6WrMtzJH_SC9_hTZlT6EObZ66BFkPgFxjLFjYGrmeV5DUJr71l8O4t3MmwE9KN99C0f8CqeJRoBGP6WlH039UyOm80XfEP0Ivr4Ga0O_oq0TX7dpMF8LPxurlhTSLP0ECVZSGP_M9cAanzTAIujC0t-rWJU1AjwW9Kv2sIIgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Sat, 23 Oct 2021 00:43:40 GMT',
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
  '1024ccba-f57a-42d9-af7e-ef23e86d0200',
  'x-ms-ests-server',
  '2.1.12171.14 - EUS ProdSlices',
  'Set-Cookie',
  'fpc=At10gW8-jDJJqaJAbxqcOjw; expires=Mon, 22-Nov-2021 00:43:41 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrVQZAPuFrVniN9RvqY0Hoz9-XWZwTYj5wjJDkqkXQQ_tTqoIBZd-5-7vHrgKtoofWZnVI2L1V2feAhr2fICuuGrdqt-pVikR1iIKFCtFZu4psIqgCvWeChuump46_6AwrY3farCwMQ5UhOaMR15Kei15kaLqKcc-b1f8vppGkjY0gAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Sat, 23 Oct 2021 00:43:40 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.3.0&x-client-OS=linux&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=e5d975c2-a72b-4fe9-b694-9dd70915677a&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22CP1%22%5D%7D%7D%7D")
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
  '2b12dcad-3958-415b-bc54-51fddae20500',
  'x-ms-ests-server',
  '2.1.12171.14 - SCUS ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=Akq1MSp2JcBHp_kJj6nPxBY; expires=Mon, 22-Nov-2021 00:43:41 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Sat, 23 Oct 2021 00:43:41 GMT',
  'Content-Length',
  '1331'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/text/analytics/v3.2-preview.2/entities/linking', {"documents":[{"id":"1","text":"I had a wonderful trip to Seattle last week and even visited the Space Needle 2 times!","language":"en"},{"id":"2","text":"Unfortunately, it rained during my entire trip to Seattle. I didn't even get to visit the Space Needle","language":"en"},{"id":"3","text":"I went to see a movie on Saturday and it was perfectly average, nothing more or less than I expected.","language":"en"},{"id":"4","text":"Los caminos que llevan hasta Monte Rainier son espectaculares y hermosos.","language":"es"},{"id":"5","text":"La carretera estaba atascada. Había mucho tráfico el día de ayer.","language":"es"}]})
  .query(true)
  .reply(200, {"documents":[{"id":"1","entities":[{"bingId":"5fbba6b8-85e1-4d41-9444-d9055436e473","name":"Seattle","matches":[{"text":"Seattle","offset":26,"length":7,"confidenceScore":0.21}],"language":"en","id":"Seattle","url":"https://en.wikipedia.org/wiki/Seattle","dataSource":"Wikipedia"},{"bingId":"f8dd5b08-206d-2554-6e4a-893f51f4de7e","name":"Space Needle","matches":[{"text":"Space Needle","offset":65,"length":12,"confidenceScore":0.42}],"language":"en","id":"Space Needle","url":"https://en.wikipedia.org/wiki/Space_Needle","dataSource":"Wikipedia"}],"warnings":[]},{"id":"2","entities":[{"bingId":"5fbba6b8-85e1-4d41-9444-d9055436e473","name":"Seattle","matches":[{"text":"Seattle","offset":50,"length":7,"confidenceScore":0.2}],"language":"en","id":"Seattle","url":"https://en.wikipedia.org/wiki/Seattle","dataSource":"Wikipedia"},{"bingId":"f8dd5b08-206d-2554-6e4a-893f51f4de7e","name":"Space Needle","matches":[{"text":"Space Needle","offset":90,"length":12,"confidenceScore":0.36}],"language":"en","id":"Space Needle","url":"https://en.wikipedia.org/wiki/Space_Needle","dataSource":"Wikipedia"}],"warnings":[]},{"id":"3","entities":[{"bingId":"296617ab-4ddb-cc10-beba-56e0f42af76b","name":"Saturday","matches":[{"text":"Saturday","offset":25,"length":8,"confidenceScore":0.05}],"language":"en","id":"Saturday","url":"https://en.wikipedia.org/wiki/Saturday","dataSource":"Wikipedia"}],"warnings":[]},{"id":"4","entities":[{"bingId":"9ae3e6ca-81ea-6fa1-ffa0-42e1d7890906","name":"Monte Rainier","matches":[{"text":"Monte Rainier","offset":29,"length":13,"confidenceScore":0.81}],"language":"es","id":"Monte Rainier","url":"https://es.wikipedia.org/wiki/Monte_Rainier","dataSource":"Wikipedia"}],"warnings":[]},{"id":"5","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-06-01"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'csp-billing-usage',
  'CognitiveServices.TextAnalytics.BatchScoring=5,CognitiveServices.TextAnalytics.TextRecords=5',
  'x-envoy-upstream-service-time',
  '50',
  'apim-request-id',
  'e2c7ec88-a6c8-4d49-89a4-f6f1c8d3d821',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 23 Oct 2021 00:43:41 GMT'
]);

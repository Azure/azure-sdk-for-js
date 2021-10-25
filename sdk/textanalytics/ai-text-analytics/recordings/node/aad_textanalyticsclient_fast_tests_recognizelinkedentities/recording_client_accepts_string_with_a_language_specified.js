let nock = require('nock');

module.exports.hash = "40df1b35e0e23c65c61cb7f625d8c956";

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
  'c01a3aaa-fd38-4f5d-a4b9-80d6097e6400',
  'x-ms-ests-server',
  '2.1.12158.6 - EUS ProdSlices',
  'Set-Cookie',
  'fpc=AjuhaOFUpMxIq5Jc6pkeyDo; expires=Mon, 22-Nov-2021 00:43:40 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevry7EImpv8KUccjvkE-_mfjlNJ9T_tBPXC1tNw8XDXuBEBk6AZEi1SGLQZOwF1uxtIKQHkSzQpBq4OpzfMJ3SAHxIEhmTkAWHvHp6D43RDUgGNUd060LMINp4lEc5slBTjNYgr6_9-eZcv-eskYyD64-wcs3O35JPbZPpT2wGAsqQgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Sat, 23 Oct 2021 00:43:39 GMT',
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
  'f775bdcf-e7a6-4aee-8433-7719d0ea0c00',
  'x-ms-ests-server',
  '2.1.12171.14 - WUS2 ProdSlices',
  'Set-Cookie',
  'fpc=AiyOe4DThTFIjLyt8iUyvfQ; expires=Mon, 22-Nov-2021 00:43:40 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrlcnnJBar3b_sJRIPVJq8NwKAVm7P09JlGxAiMcKESfBW4JW8oNkP5r5LQUIZ58qcZ4KtMYsFShX0su4lP1BWazXz9S7Z4uLA6xiEhqkemL72aasLoDGeflVm6nFWKLsNDzdsNWVBP1gGc8GO9CoUbFdEBE8IUez3bvbbwJ_Ws6wgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Sat, 23 Oct 2021 00:43:39 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.3.0&x-client-OS=linux&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=acba562e-06a5-4b2d-9128-2d9c66655609&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22CP1%22%5D%7D%7D%7D")
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
  'dd2e89b6-166f-4ea2-997a-9588c8280300',
  'x-ms-ests-server',
  '2.1.12171.14 - NCUS ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=AsnpzwOI2zJAkw_FHfDRMBs; expires=Mon, 22-Nov-2021 00:43:40 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Sat, 23 Oct 2021 00:43:40 GMT',
  'Content-Length',
  '1331'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/text/analytics/v3.2-preview.2/entities/linking', {"documents":[{"id":"0","text":"I had a wonderful trip to Seattle last week and even visited the Space Needle 2 times!","language":"en"},{"id":"1","text":"Unfortunately, it rained during my entire trip to Seattle. I didn't even get to visit the Space Needle","language":"en"},{"id":"2","text":"I went to see a movie on Saturday and it was perfectly average, nothing more or less than I expected.","language":"en"},{"id":"3","text":"I didn't like the last book I read at all.","language":"en"}]})
  .query(true)
  .reply(200, {"documents":[{"id":"0","entities":[{"bingId":"5fbba6b8-85e1-4d41-9444-d9055436e473","name":"Seattle","matches":[{"text":"Seattle","offset":26,"length":7,"confidenceScore":0.21}],"language":"en","id":"Seattle","url":"https://en.wikipedia.org/wiki/Seattle","dataSource":"Wikipedia"},{"bingId":"f8dd5b08-206d-2554-6e4a-893f51f4de7e","name":"Space Needle","matches":[{"text":"Space Needle","offset":65,"length":12,"confidenceScore":0.42}],"language":"en","id":"Space Needle","url":"https://en.wikipedia.org/wiki/Space_Needle","dataSource":"Wikipedia"}],"warnings":[]},{"id":"1","entities":[{"bingId":"5fbba6b8-85e1-4d41-9444-d9055436e473","name":"Seattle","matches":[{"text":"Seattle","offset":50,"length":7,"confidenceScore":0.2}],"language":"en","id":"Seattle","url":"https://en.wikipedia.org/wiki/Seattle","dataSource":"Wikipedia"},{"bingId":"f8dd5b08-206d-2554-6e4a-893f51f4de7e","name":"Space Needle","matches":[{"text":"Space Needle","offset":90,"length":12,"confidenceScore":0.36}],"language":"en","id":"Space Needle","url":"https://en.wikipedia.org/wiki/Space_Needle","dataSource":"Wikipedia"}],"warnings":[]},{"id":"2","entities":[{"bingId":"296617ab-4ddb-cc10-beba-56e0f42af76b","name":"Saturday","matches":[{"text":"Saturday","offset":25,"length":8,"confidenceScore":0.05}],"language":"en","id":"Saturday","url":"https://en.wikipedia.org/wiki/Saturday","dataSource":"Wikipedia"}],"warnings":[]},{"id":"3","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-06-01"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'csp-billing-usage',
  'CognitiveServices.TextAnalytics.BatchScoring=4,CognitiveServices.TextAnalytics.TextRecords=4',
  'x-envoy-upstream-service-time',
  '18',
  'apim-request-id',
  'cd3ff971-22db-4216-bb64-c41c88825e55',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 23 Oct 2021 00:43:40 GMT'
]);

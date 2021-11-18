let nock = require('nock');

module.exports.hash = "6a40a1e6d9d1faf359946e842729e35e";

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
  '1115fa1e-1d76-4e60-990d-25b989b44700',
  'x-ms-ests-server',
  '2.1.12249.11 - NCUS ProdSlices',
  'Set-Cookie',
  'fpc=Amomo1lks-RHtqUcjaqkrvA; expires=Sat, 18-Dec-2021 01:14:36 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrSK2G0h_eYiJ2pcIdz7NrfiRlXcGqroLoD_0mbNBSSQDOCESAL5_9DoZjVx_-qyLAJZvdtxycLWJ7unFg8P2OPw2VhdVM1gLYD57pW2ufkH7BYqTO2mBQkqq9HzO99P2izEAcOmcoC22QRw2ZCztOr76rwUy2c4KKY8eR3s9CM0UgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 18 Nov 2021 01:14:36 GMT',
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
  '2b18bcfe-80c9-4ec3-8a69-ecae44403900',
  'x-ms-ests-server',
  '2.1.12249.11 - SCUS ProdSlices',
  'Set-Cookie',
  'fpc=AhEwp2XkouVElrKV72D1icc; expires=Sat, 18-Dec-2021 01:14:36 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrUG2Ju1lefOBTsqHEvM1WYz0CAQNwpJrzAm48yGdR5FtJOmPb4XdJ_w1QZP4KLiZ4i9ncE51r4F9NjH0FTIw_CS607Vy412aZ6Hy_gI8U1HCqWgrrAtXoNAtj8ATw7762CD12sU0XsI1RY9aC8XibWOFwn8eDoWfnt28VenNFsmogAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 18 Nov 2021 01:14:36 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.3.3&x-client-OS=linux&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=0676d8bc-82b9-4d9f-8f94-13295696ef7f&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22cp1%22%5D%7D%7D%7D")
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
  '9121647c-af3a-4956-9030-a67625db3900',
  'x-ms-ests-server',
  '2.1.12249.11 - SCUS ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=AqdfFaGgs1ZLttTb95bB85j__1r8AQAAAPufJ9kOAAAA; expires=Sat, 18-Dec-2021 01:14:36 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 18 Nov 2021 01:14:36 GMT',
  'Content-Length',
  '1318'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/catalog/api/atlas/v2/glossary', {"name":"jssdkGlossary9Node","shortDescription":"Example Short Description","longDescription":"Example Long Description","language":"en","usage":"Example Glossary"})
  .query(true)
  .reply(200, {"guid":"2f6e459a-e74c-4197-a7fc-522a98990ce8","qualifiedName":"jssdkGlossary9Node","name":"jssdkGlossary9Node","shortDescription":"Example Short Description","longDescription":"Example Long Description","lastModifiedTS":"1","language":"en","usage":"Example Glossary"}, [
  'Date',
  'Thu, 18 Nov 2021 01:14:36 GMT',
  'Content-Type',
  'application/json; charset=utf-8',
  'Server',
  'AzurePurview',
  'Cache-Control',
  'no-store, must-revalidate, no-cache, max-age=0',
  'Pragma',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Expires',
  '0',
  'Access-Control-Allow-Headers',
  'authorization,content-type,x-xsrf-header,x-ms-client-request-id,lastmodifiedts',
  'Access-Control-Allow-Methods',
  'GET,OPTIONS,HEAD,PUT,POST,DELETE,PATCH',
  'Access-Control-Allow-Origin',
  '*',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,lastmodifiedts',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-correlation-request-id',
  'e7a426ea-45a5-46ca-9c89-98887ecedc5c',
  'x-ms-request-id',
  '99f8caf3-105f-4985-b62d-d013b7a5282e',
  'X-Frame-Options',
  'DENY',
  'X-Content-Type-Options',
  'nosniff',
  'X-Content-Type-Options',
  'nosniff',
  'x-xss-protection',
  '1; mode=block',
  'Content-Security-Policy',
  "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' blob: data:; connect-src 'self'; img-src 'self' blob: data:; style-src 'self' 'unsafe-inline';font-src 'self' data:"
]);

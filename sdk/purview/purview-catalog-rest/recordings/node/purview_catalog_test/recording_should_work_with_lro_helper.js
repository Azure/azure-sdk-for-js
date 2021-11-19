let nock = require('nock');

module.exports.hash = "57f2c62b4ae7ce5434b9e221bf129917";

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
  'dddf8744-c9f3-43b5-ba9c-79524e958100',
  'x-ms-ests-server',
  '2.1.12231.7 - NCUS ProdSlices',
  'Set-Cookie',
  'fpc=Ao1pVlgF701Er6Z2ldIJ9nc; expires=Sat, 18-Dec-2021 21:26:07 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrsEc0PN7baZ2qJ7joiER2HMCF1QkuDEQuBHM4N3gib4QOKT6aZ23qOGB8A20wIS20ey-pamzhTY7uiU7RSbmcgK1BC2LlEL_jAAwIymP1xNemr3hTYknalrMhCDa2jJ0VcmIVpaDD6QYojxv1gM45vvJQzBv78af0nc-9I1QDfCsgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 18 Nov 2021 21:26:07 GMT',
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
  'd9cb1ffe-cee6-4b74-b91b-2ae85a3d1b00',
  'x-ms-ests-server',
  '2.1.12231.8 - EUS ProdSlices',
  'Set-Cookie',
  'fpc=Arr48zaGSR9GgBCNIvRhID0; expires=Sat, 18-Dec-2021 21:26:07 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrARIgmgJ-BEfz_zsGvibEaCQKL2zTJYY7QDKG1gUymqc3j7I8bkfCQXaDu8KB7JD3BDpJG_ICxfe5x8mmSv6ASYgpX8lfx0f4hObwIc-iji10AJzv-rrcrMPwX__OlEA3LW-ccffh8Gagpoa9plX0xR_sC1ccCKMZi4zL5yR2TXIgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 18 Nov 2021 21:26:07 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.3.3&x-client-OS=linux&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=b6fee120-3a45-4013-a8b6-ecd48967671c&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22cp1%22%5D%7D%7D%7D")
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
  '083cfb0d-b4a7-4b5b-8870-5486ab551800',
  'x-ms-ests-server',
  '2.1.12231.8 - NCUS ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=Amp9xR0S1R9Nqgs4jnEWzdb__1r8AQAAAO-7KNkOAAAA; expires=Sat, 18-Dec-2021 21:26:08 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 18 Nov 2021 21:26:07 GMT',
  'Content-Length',
  '1318'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/catalog/api/glossary/name/jssdkGlossary997Node/terms/import', "----------------------------704900034345454045250553\r\nContent-Disposition: form-data; name=\"file\"\r\n\r\nName,Nick Name,Status\nFoo,foo,Draft\r\n----------------------------704900034345454045250553--\r\n")
  .query(true)
  .reply(202, {"id":"bbc3185a-05c1-420d-ad7d-e21b6fd154fb","status":"Running","createTime":"2021-11-18T21:26:08.892+0000","lastUpdateTime":"2021-11-18T21:26:08.892+0000","properties":{"importedTerms":"0","totalTermsDetected":"-1"},"error":{"errorCode":0,"errorMessage":""}}, [
  'Date',
  'Thu, 18 Nov 2021 21:26:08 GMT',
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
  'Location',
  'https://endpoint/catalog/api/glossary/terms/import/bbc3185a-05c1-420d-ad7d-e21b6fd154fb',
  'Retry-After',
  '5',
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
  'fad5d001-3306-4238-92ef-1f6b6446b27a',
  'x-ms-request-id',
  'bbc3185a-05c1-420d-ad7d-e21b6fd154fb',
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

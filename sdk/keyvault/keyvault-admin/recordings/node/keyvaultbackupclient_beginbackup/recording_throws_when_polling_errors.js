let nock = require('nock');

module.exports.hash = "1167801577fba0d0e71fb0021c7799dd";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://azure_managedhsm.managedhsm.azure.net:443', {"encodedQueryParams":true})
  .post('/backup')
  .query(true)
  .reply(401, "", [
  'content-type',
  'application/json; charset=utf-8',
  'x-ms-server-latency',
  '2',
  'x-content-type-options',
  'nosniff',
  'www-authenticate',
  'Bearer authorization="https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012", resource="https://managedhsm.azure.net"',
  'x-frame-options',
  'SAMEORIGIN',
  'content-length',
  '0',
  'x-ms-request-id',
  '296df738-fc8f-11ec-9410-00224878775b',
  'strict-transport-security',
  'max-age=31536000; includeSubDomains',
  'content-security-policy',
  "default-src 'self'",
  'cache-control',
  'no-cache'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .get('/common/discovery/instance')
  .query(true)
  .reply(200, {"tenant_discovery_endpoint":"https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/v2.0/.well-known/openid-configuration","api-version":"1.1","metadata":[{"preferred_network":"login.microsoftonline.com","preferred_cache":"login.windows.net","aliases":["login.microsoftonline.com","login.windows.net","login.microsoft.com","sts.windows.net"]},{"preferred_network":"login.partner.microsoftonline.cn","preferred_cache":"login.partner.microsoftonline.cn","aliases":["login.partner.microsoftonline.cn","login.chinacloudapi.cn"]},{"preferred_network":"login.microsoftonline.de","preferred_cache":"login.microsoftonline.de","aliases":["login.microsoftonline.de"]},{"preferred_network":"login.microsoftonline.us","preferred_cache":"login.microsoftonline.us","aliases":["login.microsoftonline.us","login.usgovcloudapi.net"]},{"preferred_network":"login-us.microsoftonline.com","preferred_cache":"login-us.microsoftonline.com","aliases":["login-us.microsoftonline.com"]}]}, [
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
  '6eaeb414-bb8b-4a19-9189-ae1ed5a9a700',
  'x-ms-ests-server',
  '2.1.13156.10 - WUS2 ProdSlices',
  'Content-Security-Policy-Report-Only',
  "script-src 'self' 'nonce-aN3BtxidwesqVAeQtMeYlQ' 'unsafe-eval' 'unsafe-inline'; object-src 'none'; base-uri 'none'; report-uri https://csp.microsoft.com/report/ESTS-UX-All",
  'X-XSS-Protection',
  '0',
  'Set-Cookie',
  'fpc=AoIhC7fGz21Fox_9Sb-npEk; expires=Thu, 04-Aug-2022 18:20:35 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrwlL0rwsehIS4VeuUtNtOg7g7WyxpD2j1YVQ29v4LyUlz-O6ZY8E7eWbib6AqLAGK3zwQyIm264KZ8FpBslOUW8l2SYnsLwTUkkwl_czC4qz9XSEK_PyuR0qe3ig4h8gLVzye90CVGhjlRpRaafc2JbOPUeAVd_UIjlhMcb-RF-8gAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 05 Jul 2022 18:20:34 GMT',
  'Content-Length',
  '980'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .get('/12345678-1234-1234-1234-123456789012/v2.0/.well-known/openid-configuration')
  .reply(200, {"token_endpoint":"https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/oauth2/v2.0/token","token_endpoint_auth_methods_supported":["client_secret_post","private_key_jwt","client_secret_basic"],"jwks_uri":"https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/discovery/v2.0/keys","response_modes_supported":["query","fragment","form_post"],"subject_types_supported":["pairwise"],"id_token_signing_alg_values_supported":["RS256"],"response_types_supported":["code","id_token","code id_token","id_token token"],"scopes_supported":["openid","profile","email","offline_access"],"issuer":"https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/v2.0","request_uri_parameter_supported":false,"userinfo_endpoint":"https://graph.microsoft.com/oidc/userinfo","authorization_endpoint":"https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/oauth2/v2.0/authorize","device_authorization_endpoint":"https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/oauth2/v2.0/devicecode","http_logout_supported":true,"frontchannel_logout_supported":true,"end_session_endpoint":"https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/oauth2/v2.0/logout","claims_supported":["sub","iss","cloud_instance_name","cloud_instance_host_name","cloud_graph_host_name","msgraph_host","aud","exp","iat","auth_time","acr","nonce","preferred_username","name","tid","ver","at_hash","c_hash","email"],"kerberos_endpoint":"https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/kerberos","tenant_region_scope":"WW","cloud_instance_name":"microsoftonline.com","cloud_graph_host_name":"graph.windows.net","msgraph_host":"graph.microsoft.com","rbac_url":"https://pas.windows.net"}, [
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
  'c079d5c6-81f7-4308-812f-024ce755d300',
  'x-ms-ests-server',
  '2.1.13156.10 - SCUS ProdSlices',
  'X-XSS-Protection',
  '0',
  'Set-Cookie',
  'fpc=AiYW9AtIzxJHm5ISukUwrfc; expires=Thu, 04-Aug-2022 18:20:35 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrVM3kmlMXw08Xt_3q9D1TYDyni7C6QpivG-x_pjWNLEiMM4pLqzjQDxQ5vSemc5J-YR5yf9nI5ACvwQFwl_QaZbpWQrYnbdA4sOi3O9xqzWLBdbCFbOPwdtYeF4Vsjk_S3fv9h_kyeMmvHzfVM9OTT33_aYjacwMOm8e7fSBllasgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 05 Jul 2022 18:20:34 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/12345678-1234-1234-1234-123456789012/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.10.0&x-client-OS=linux&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=8ee6c8f6-ec62-4952-a466-585b3a8282d3&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22cp1%22%5D%7D%7D%7D")
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
  '6eaeb414-bb8b-4a19-9189-ae1edda9a700',
  'x-ms-ests-server',
  '2.1.13156.10 - WUS2 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Content-Security-Policy-Report-Only',
  "script-src 'self' 'nonce-1wbmB-R18DIR4eGbBekSjw' 'unsafe-eval' 'unsafe-inline'; object-src 'none'; base-uri 'none'; report-uri https://csp.microsoft.com/report/ESTS-UX-All",
  'X-XSS-Protection',
  '0',
  'Set-Cookie',
  'fpc=AhpLUvSXVhxGpMwfYVE61rGvhfReAQAAAPJ3VtoOAAAA; expires=Thu, 04-Aug-2022 18:20:35 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 05 Jul 2022 18:20:35 GMT',
  'Content-Length',
  '1322'
]);

nock('https://azure_managedhsm.managedhsm.azure.net:443', {"encodedQueryParams":true})
  .post('/backup', {"storageResourceUri":"https://uri.blob.core.windows.net/uri","token":"invalid_sas_token"})
  .query(true)
  .reply(400, {"error":{"code":"BadRequest","message":"The customer provided SAS token is malformed. The SAS token does not contain the expiry field","innererror":null}}, [
  'date',
  'Tue, 05 Jul 2022 18:20:37 GMT',
  'cache-control',
  'no-cache',
  'x-content-type-options',
  'nosniff',
  'server',
  'Kestrel',
  'api-supported-versions',
  '20180927, 20211111',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=167.220.70.94;act_addr_fam=Ipv4;',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  '29e5e680-fc8f-11ec-9410-00224878775b',
  'content-type',
  'application/json; charset=utf-8',
  'x-frame-options',
  'SAMEORIGIN',
  'content-length',
  '155',
  'strict-transport-security',
  'max-age=31536000; includeSubDomains',
  'x-ms-server-latency',
  '2413',
  'content-security-policy',
  "default-src 'self'"
]);

let nock = require('nock');

module.exports.hash = "1710d1102909ef206fd44af8b3dcd131";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .get('/common/discovery/instance')
  .query(true)
  .reply(200, {"tenant_discovery_endpoint":"https://login.microsoftonline.com/98123456-7614-3456-5678-789980112547/v2.0/.well-known/openid-configuration","api-version":"1.1","metadata":[{"preferred_network":"login.microsoftonline.com","preferred_cache":"login.windows.net","aliases":["login.microsoftonline.com","login.windows.net","login.microsoft.com","sts.windows.net"]},{"preferred_network":"login.partner.microsoftonline.cn","preferred_cache":"login.partner.microsoftonline.cn","aliases":["login.partner.microsoftonline.cn","login.chinacloudapi.cn"]},{"preferred_network":"login.microsoftonline.de","preferred_cache":"login.microsoftonline.de","aliases":["login.microsoftonline.de"]},{"preferred_network":"login.microsoftonline.us","preferred_cache":"login.microsoftonline.us","aliases":["login.microsoftonline.us","login.usgovcloudapi.net"]},{"preferred_network":"login-us.microsoftonline.com","preferred_cache":"login-us.microsoftonline.com","aliases":["login-us.microsoftonline.com"]}]}, [
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
  'e505f4a2-9792-415f-a64e-6a9662cb1900',
  'x-ms-ests-server',
  '2.1.12071.16 - WUS2 ProdSlices',
  'Set-Cookie',
  'fpc=Ahi9qSd6KUhHnMEwvYeFCL8; expires=Thu, 28-Oct-2021 21:15:38 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevr_RgN2lJd4_lNMDZIEa5Uqvu2Emhah2qIdZlNKccetEuKaHKayn2QKFDzeqHytOT6aVcsgG7MnxXZH4hYl7F8yjnUZAYpYHxWI6DAj7FgWKGt5wFvv21tlD4lxbHYTaxVhmH4JYm32u9GhehuxROVi-U2dk10x-c_etbSSyMCTDcgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 28 Sep 2021 21:15:38 GMT',
  'Content-Length',
  '980'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .get('/98123456-7614-3456-5678-789980112547/v2.0/.well-known/openid-configuration')
  .reply(200, {"token_endpoint":"https://login.microsoftonline.com/98123456-7614-3456-5678-789980112547/oauth2/v2.0/token","token_endpoint_auth_methods_supported":["client_secret_post","private_key_jwt","client_secret_basic"],"jwks_uri":"https://login.microsoftonline.com/98123456-7614-3456-5678-789980112547/discovery/v2.0/keys","response_modes_supported":["query","fragment","form_post"],"subject_types_supported":["pairwise"],"id_token_signing_alg_values_supported":["RS256"],"response_types_supported":["code","id_token","code id_token","id_token token"],"scopes_supported":["openid","profile","email","offline_access"],"issuer":"https://login.microsoftonline.com/98123456-7614-3456-5678-789980112547/v2.0","request_uri_parameter_supported":false,"userinfo_endpoint":"https://graph.microsoft.com/oidc/userinfo","authorization_endpoint":"https://login.microsoftonline.com/98123456-7614-3456-5678-789980112547/oauth2/v2.0/authorize","device_authorization_endpoint":"https://login.microsoftonline.com/98123456-7614-3456-5678-789980112547/oauth2/v2.0/devicecode","http_logout_supported":true,"frontchannel_logout_supported":true,"end_session_endpoint":"https://login.microsoftonline.com/98123456-7614-3456-5678-789980112547/oauth2/v2.0/logout","claims_supported":["sub","iss","cloud_instance_name","cloud_instance_host_name","cloud_graph_host_name","msgraph_host","aud","exp","iat","auth_time","acr","nonce","preferred_username","name","tid","ver","at_hash","c_hash","email"],"kerberos_endpoint":"https://login.microsoftonline.com/98123456-7614-3456-5678-789980112547/kerberos","tenant_region_scope":"WW","cloud_instance_name":"microsoftonline.com","cloud_graph_host_name":"graph.windows.net","msgraph_host":"graph.microsoft.com","rbac_url":"https://pas.windows.net"}, [
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
  '6f317bc6-9ac2-4976-8954-3e0fa07fc300',
  'x-ms-ests-server',
  '2.1.12071.16 - SCUS ProdSlices',
  'Set-Cookie',
  'fpc=Ah2g13TTjJJEu6KlMG511Lo; expires=Thu, 28-Oct-2021 21:15:39 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrnLpcuiisOrAT4ga6JqCzjpsTFVEqypUkE7v0HwfSCjOnt3rQtCAPFPpScT1b3QrYcELqHnQ0KlVZmLLWuZJ3zr2BKYUs4rdioomMHa8gdbj4T1rcNfndjnetbLXBcxqwKMcM9AifN-sAwC4owPMYRxze8uRdaiChY9ndqCN6vuwgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 28 Sep 2021 21:15:38 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/98123456-7614-3456-5678-789980112547/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.3.1&x-client-OS=win32&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=1d2cfa23-5d36-4914-85cf-290839b201c4&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22CP1%22%5D%7D%7D%7D")
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
  '5d749520-31aa-491f-ad79-7d6821c3c600',
  'x-ms-ests-server',
  '2.1.12071.16 - EUS ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=Ag1FIGBFgYFKtJ4cOHKkwE3KBMGnAQAAAPp85dgOAAAA; expires=Thu, 28-Oct-2021 21:15:39 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 28 Sep 2021 21:15:39 GMT',
  'Content-Length',
  '1321'
]);

nock('https://api.loganalytics.io:443', {"encodedQueryParams":true})
  .post('/v1/$batch', {"requests":[{"id":"0","body":{"query":"print \"hello\", true, make_datetime(\"2000-01-02 03:04:05Z\"), toint(100), long(101), 102.1, dynamic({ \"hello\": \"world\" })\n      | project \n          stringcolumn=print_0, \n          boolcolumn=print_1,\n          datecolumn=print_2,\n          intcolumn=print_3,\n          longcolumn=print_4,\n          realcolumn=print_5,\n          dynamiccolumn=print_6\n      ","timespan":"PT5M"},"path":"/query","method":"POST","workspace":"%3Cworkspace-id%3E"}]})
  .reply(200, ["1f8b0800000000000003","6590d16ac4201045ffe53ebb45d3ee8b5f514a9fbac983d9482b185d74c21282ffde912c6d360107e4cc19b8dc05c9e65b0cd966e8cb02374043422093a1895923a5401f87197a0199de3fc46046cbea7b72a349f387cd93273ebb463f8de149c9945cf85e176cd07cfba728e2cfeb63f47babb2ad3318b27ba73272bcde782ed05e63b4357c3c66aa6ceb246b0e892a7b4a34f3c75d0fa1568cd209a478af855cf063bd8f1094262bc0c5ca935427d97cca572ddfb43c7f4128ae5b49c5d3bc2881a55d8f5ae816f798fcd0a2a0eb4a57f8fd02e09283e1bd010000"], [
  'Date',
  'Tue, 28 Sep 2021 21:15:40 GMT',
  'Content-Type',
  'application/json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'keep-alive',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'via',
  '1.1 draft-oms-65975698db-7l4j2',
  'X-Content-Type-Options',
  'nosniff',
  'Access-Control-Allow-Origin',
  '*',
  'Access-Control-Expose-Headers',
  'Retry-After,Age,WWW-Authenticate,x-resource-identities,x-ms-status-location',
  'Vary',
  'Accept-Encoding',
  'Content-Encoding',
  'gzip'
]);

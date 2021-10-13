let nock = require('nock');

module.exports.hash = "e98f612be5ed2753de802a8dce07c550";

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
  'a45fcc25-81ba-4914-8f04-75317c71bc00',
  'x-ms-ests-server',
  '2.1.12071.16 - SCUS ProdSlices',
  'Set-Cookie',
  'fpc=AipnpJJJXepOsMp4VKOK8M4; expires=Fri, 29-Oct-2021 01:09:47 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevriM52EFeEX_ZNVkZ263ZCUWP8hAZ7lJZIQH1hqNqI3AlppMF3vP53zXGYRi8mRVBh3TliGyf3L6iCK_pujGu0RpWkHFN3v0KroVOR5BVk3AHpOhPOxb5_H-E-ODGc8_FR8QR20_UNFij4PBxniD_sXmbxQxCUAhVjedofsxBRM20gAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 29 Sep 2021 01:09:47 GMT',
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
  'b1fdc889-1d40-4f89-8e89-7ad6b60cd600',
  'x-ms-ests-server',
  '2.1.12071.16 - SCUS ProdSlices',
  'Set-Cookie',
  'fpc=AvrARSJCtmZDoP-Ib8l_GAo; expires=Fri, 29-Oct-2021 01:09:48 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrQeZzLNND8EkbTO5e5RG5Y_4n_Rt3xLZ9QswFqmqoT4d3Uj-s1oBU9w0E7DF2A88cLDe66bLu_3AHjX9YuJuxTolPpJvjUYJbn-Z0gJvYLffseOFxAl9acDUw2VZxUGbTRLtd02kM7U-aVy_G9P6OJDQhfeOCu-JvjGCUscnyZjkgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 29 Sep 2021 01:09:47 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/98123456-7614-3456-5678-789980112547/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.3.1&x-client-OS=win32&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=f3b92448-c8d2-4965-9a5b-0e3b68454d6a&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22CP1%22%5D%7D%7D%7D")
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
  '37436546-c301-400a-b429-eb5bcb1bcd00',
  'x-ms-ests-server',
  '2.1.12071.16 - EUS ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=AqjDgMnJhBpJr1BK6P4GZEDKBMGnAQAAANuz5dgOAAAA; expires=Fri, 29-Oct-2021 01:09:48 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 29 Sep 2021 01:09:47 GMT',
  'Content-Length',
  '1321'
]);

nock('https://api.loganalytics.io:443', {"encodedQueryParams":true})
  .post('/v1/workspaces/workspace-id/query', {"query":"print \"hello\", true, make_datetime(\"2000-01-02 03:04:05Z\"), toint(100), long(101), 102.1, dynamic({ \"hello\": \"world\" })\n      | project \n          stringcolumn=print_0, \n          boolcolumn=print_1,\n          datecolumn=print_2,\n          intcolumn=print_3,\n          longcolumn=print_4,\n          realcolumn=print_5,\n          dynamiccolumn=print_6\n      ","timespan":"PT5M"})
  .reply(200, ["1f8b08000000000000036590cb0a83301045ffe5ae63196dbbc95794d255d545d4d006a229312222f9f72608ad8fc5c070ee19b8cc0c272a2d7bf07c46275a098e9b55adb0d35df6837660a88d1eda6ea3f4ceaaeeb504c170d3e74fe1d9cfab8cd17b2bb2b5d30827f74e644e8578e5a9ceedb580d68636c74e91ad1d2bc5a151649b465358547d28b560f892c19a313e24c75b6a6dc09c1d2443464409a509650f3a73ba70ba3ec152a2306998ec9432ccc572548017188dd54d018fb2f4a5ff02f36189ae8e010000"], [
  'Date',
  'Wed, 29 Sep 2021 01:09:48 GMT',
  'Content-Type',
  'application/json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'keep-alive',
  'Vary',
  'Accept-Encoding',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'via',
  '1.1 draft-oms-65975698db-bn8c6',
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

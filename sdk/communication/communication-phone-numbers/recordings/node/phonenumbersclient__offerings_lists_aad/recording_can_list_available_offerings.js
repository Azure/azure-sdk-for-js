let nock = require('nock');

module.exports.hash = "2ec7edf89bf068deca5123a2968dc20a";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":false})
  .get('/common/discovery/instance')
  .query(false)
  .reply(200, {"tenant_discovery_endpoint":"https://login.microsoftonline.com/SomeTenantId/v2.0/.well-known/openid-configuration","api-version":"1.1","metadata":[{"preferred_network":"login.microsoftonline.com","preferred_cache":"login.windows.net","aliases":["login.microsoftonline.com","login.windows.net","login.microsoft.com","sts.windows.net"]},{"preferred_network":"login.partner.microsoftonline.cn","preferred_cache":"login.partner.microsoftonline.cn","aliases":["login.partner.microsoftonline.cn","login.chinacloudapi.cn"]},{"preferred_network":"login.microsoftonline.de","preferred_cache":"login.microsoftonline.de","aliases":["login.microsoftonline.de"]},{"preferred_network":"login.microsoftonline.us","preferred_cache":"login.microsoftonline.us","aliases":["login.microsoftonline.us","login.usgovcloudapi.net"]},{"preferred_network":"login-us.microsoftonline.com","preferred_cache":"login-us.microsoftonline.com","aliases":["login-us.microsoftonline.com"]}]}, [
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
  'sanitized',
  'x-ms-ests-server',
  '2.1.14167.14 - WUS2 ProdSlices',
  'x-ms-httpver',
  '1.1',
  'X-XSS-Protection',
  '0',
  'Set-Cookie',
  'fpc=AodnaMdPbOVNmrc5tfidtfA; expires=Sat, 07-Jan-2023 16:03:20 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrtG2YPSpFMvekJ8RYQNFeBpduEbMWL5Z9la3GUe_5cIb2rPqT0Pi58AifDspV_qLTkNnu4tePcqkHkL3EDPmQydC_qKlNCveJ1lVQIp3Y7kX_q_dHsNAo80W5-6WmJHaEFUvu_rXvfm-hbrSyP6CC7yDlN_nehFGUAsc_CBi_uRfuPL_YkFNreAw1wYNz4MwURiy9c40BmEwHjn1RKSbvEE5tqYrEr0DKbEM5MuswWHQgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 08 Dec 2022 16:03:20 GMT',
  'Content-Length',
  '980'
]);

nock('https://endpoint', {"encodedQueryParams":false})
  .get('/SomeTenantId/v2.0/.well-known/openid-configuration')
  .reply(200, {"token_endpoint":"https://login.microsoftonline.com/SomeTenantId/oauth2/v2.0/token","token_endpoint_auth_methods_supported":["client_secret_post","private_key_jwt","client_secret_basic"],"jwks_uri":"https://login.microsoftonline.com/SomeTenantId/discovery/v2.0/keys","response_modes_supported":["query","fragment","form_post"],"subject_types_supported":["pairwise"],"id_token_signing_alg_values_supported":["RS256"],"response_types_supported":["code","id_token","code id_token","id_token token"],"scopes_supported":["openid","profile","email","offline_access"],"issuer":"https://login.microsoftonline.com/SomeTenantId/v2.0","request_uri_parameter_supported":false,"userinfo_endpoint":"https://graph.microsoft.com/oidc/userinfo","authorization_endpoint":"https://login.microsoftonline.com/SomeTenantId/oauth2/v2.0/authorize","device_authorization_endpoint":"https://login.microsoftonline.com/SomeTenantId/oauth2/v2.0/devicecode","http_logout_supported":false,"frontchannel_logout_supported":false,"end_session_endpoint":"https://login.microsoftonline.com/SomeTenantId/oauth2/v2.0/logout","claims_supported":["sub","iss","cloud_instance_name","cloud_instance_host_name","cloud_graph_host_name","msgraph_host","aud","exp","iat","auth_time","acr","nonce","preferred_username","name","tid","ver","at_hash","c_hash","email"],"kerberos_endpoint":"https://login.microsoftonline.com/SomeTenantId/kerberos","tenant_region_scope":"WW","cloud_instance_name":"microsoftonline.com","cloud_graph_host_name":"graph.windows.net","msgraph_host":"graph.microsoft.com","rbac_url":"https://pas.windows.net"}, [
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
  'sanitized',
  'x-ms-ests-server',
  '2.1.14167.14 - WUS2 ProdSlices',
  'x-ms-httpver',
  '1.1',
  'X-XSS-Protection',
  '0',
  'Set-Cookie',
  'fpc=Aqvn5aounEFPnLaf-WOFa_Y; expires=Sat, 07-Jan-2023 16:03:20 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevr1F6LhzVe6J3q8c2c4wNf2wZHgryc4ez2BNpeaC9OovJaxmkUVLuyijyNJ5WuwkLSiteVloU1Ave_Byz755hzs-tj8sUfuXg3fMIojyONS8Ku6uHZK3Pn1hr2Qz3x6x0ojCP1HaHJFDJ7QhRbWSpPEYdF0UgDoysYNIk2uJdKyzvybhnJP9dzNLjZbOjNb-PvzbsxEHto0A49FnJ-h9D4nORAzJZUD-H_wzKKeTdWQvIgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 08 Dec 2022 16:03:20 GMT',
  'Content-Length',
  '1753'
]);

nock('https://endpoint', {"encodedQueryParams":false})
  .post('/SomeTenantId/oauth2/v2.0/token', "client_id=SomeClientId&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.12.0&x-client-OS=linux&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=sanitized&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22cp1%22%5D%7D%7D%7D")
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
  'sanitized',
  'x-ms-ests-server',
  '2.1.14167.14 - NCUS ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'x-ms-httpver',
  '1.1',
  'X-XSS-Protection',
  '0',
  'Set-Cookie',
  'fpc=AlZDWAEn4WxIgeDsw5b3OA1Wyo4SAQAAAMgBJNsOAAAA; expires=Sat, 07-Jan-2023 16:03:21 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 08 Dec 2022 16:03:20 GMT',
  'Content-Length',
  '1327'
]);

nock('https://endpoint', {"encodedQueryParams":false})
  .get('/availablePhoneNumbers/countries/US/offerings')
  .query(false)
  .reply(200, {"phoneNumberOfferings":[{"phoneNumberType":"geographic","assignmentType":"person","availableCapabilities":{"calling":"inbound+outbound","sms":"none"},"cost":{"amount":1,"currencyCode":"USD","billingFrequency":"monthly"}},{"phoneNumberType":"geographic","assignmentType":"application","availableCapabilities":{"calling":"inbound+outbound","sms":"none"},"cost":{"amount":1,"currencyCode":"USD","billingFrequency":"monthly"}},{"phoneNumberType":"tollFree","assignmentType":"application","availableCapabilities":{"calling":"inbound+outbound","sms":"inbound+outbound"},"cost":{"amount":2,"currencyCode":"USD","billingFrequency":"monthly"}}],"nextLink":null}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'MS-CV',
  'UrObDv9pm0OYbDRXL2gIog.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2021-03-07, 2022-12-01',
  'X-Processing-Time',
  '1010ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0yQqSYwAAAADED/x/azpwSaSYrisv/8mJTUVYMzFFREdFMDMxNQA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Thu, 08 Dec 2022 16:03:21 GMT'
]);

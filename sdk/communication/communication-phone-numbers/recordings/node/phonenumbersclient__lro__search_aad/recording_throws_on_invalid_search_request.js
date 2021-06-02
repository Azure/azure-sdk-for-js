let nock = require('nock');

module.exports.hash = "762f6deafb4b1dcf3df7b9c9b10d521b";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":false})
  .get('/common/discovery/instance')
  .query(true)
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
  '2.1.11722.21 - WUS2 ProdSlices',
  'Set-Cookie',
  'fpc=AtoRK8gNCytBsgelMsPAEVxWyo4SBAAAALlPSNgOAAAA; expires=Thu, 01-Jul-2021 15:58:53 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrJs4k13CFamT3NSGl_mC8dv0ZpbmUZ21WPabwEMt3N5nfiumJAieFKB6LXo-dRuxpGLR5iUldzSzJST24ymwsnZm4PNsWQPq-pW2LF-_q5HLJqisZZfCJjKezTvkzcAkFMbOCBAsKOvWfYkhYTSzed4PRvhgKAR2yJwlzvwnl4lwgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 01 Jun 2021 15:58:53 GMT',
  'Content-Length',
  '980'
]);

nock('https://endpoint', {"encodedQueryParams":false})
  .get('/SomeTenantId/v2.0/.well-known/openid-configuration')
  .reply(200, {"token_endpoint":"https://login.microsoftonline.com/SomeTenantId/oauth2/v2.0/token","token_endpoint_auth_methods_supported":["client_secret_post","private_key_jwt","client_secret_basic"],"jwks_uri":"https://login.microsoftonline.com/SomeTenantId/discovery/v2.0/keys","response_modes_supported":["query","fragment","form_post"],"subject_types_supported":["pairwise"],"id_token_signing_alg_values_supported":["RS256"],"response_types_supported":["code","id_token","code id_token","id_token token"],"scopes_supported":["openid","profile","email","offline_access"],"issuer":"https://login.microsoftonline.com/SomeTenantId/v2.0","request_uri_parameter_supported":false,"userinfo_endpoint":"https://graph.microsoft.com/oidc/userinfo","authorization_endpoint":"https://login.microsoftonline.com/SomeTenantId/oauth2/v2.0/authorize","device_authorization_endpoint":"https://login.microsoftonline.com/SomeTenantId/oauth2/v2.0/devicecode","http_logout_supported":false,"frontchannel_logout_supported":false,"end_session_endpoint":"https://login.microsoftonline.com/SomeTenantId/oauth2/v2.0/logout","claims_supported":["sub","iss","cloud_instance_name","cloud_instance_host_name","cloud_graph_host_name","msgraph_host","aud","exp","iat","auth_time","acr","nonce","preferred_username","name","tid","ver","at_hash","c_hash","email"],"tenant_region_scope":"WW","cloud_instance_name":"microsoftonline.com","cloud_graph_host_name":"graph.windows.net","msgraph_host":"graph.microsoft.com","rbac_url":"https://pas.windows.net"}, [
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
  '2.1.11722.26 - EUS ProdSlices',
  'Set-Cookie',
  'fpc=AtoRK8gNCytBsgelMsPAEVxWyo4SBAAAALlPSNgOAAAA; expires=Thu, 01-Jul-2021 15:58:53 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrELDBizGHwxj5d2lV8T1TM8lwa5NS2eSoNCQMqolvJ2DItLIJZc-2-dsCPMgnAda32kNiu4m0_MAX2tFvpj4Hzc5Imlfb25DZIlr6PatP25oFGSk1C6UZy2TPTVFf5JTgQMDxHCfsprs_GfPJF9a2iSLGnF4EBbQK9NB3yyLEucsgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 01 Jun 2021 15:58:53 GMT',
  'Content-Length',
  '1651'
]);

nock('https://endpoint', {"encodedQueryParams":false})
  .post('/SomeTenantId/oauth2/v2.0/token', "client_id=SomeClientId&scope=https%3A%2F%2Fcommunication.azure.com%2F%2F.default%20openid%20profile%20offline_access&grant_type=client_credentials&client-request-id=sanitized&client_secret=SomeClientSecret")
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
  '2.1.11722.26 - WUS2 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=AtoRK8gNCytBsgelMsPAEVxWyo4SBQAAALlPSNgOAAAA; expires=Thu, 01-Jul-2021 15:58:53 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 01 Jun 2021 15:58:53 GMT',
  'Content-Length',
  '1327'
]);

nock('https://endpoint', {"encodedQueryParams":false})
  .post('/availablePhoneNumbers/countries/US/:search', {"phoneNumberType":"tollFree","assignmentType":"person","capabilities":{"calling":"none","sms":"inbound+outbound"},"quantity":1})
  .query(true)
  .reply(400, {"error":{"code":"InternalError","message":"The server encountered an internal error.","innererror":{"code":"BadRequest","message":"We are unable to find phone plans to match your requested capabilities."}}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json',
  'Request-Context',
  'appId=',
  'MS-CV',
  'yvR2BaQK20aM/y4RJiPC2A.0',
  'api-supported-versions',
  '2021-03-07',
  'X-Processing-Time',
  '3453ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0PVm2YAAAAAAZQPk1nuhZS7ZV+qoGJHZ2WVZSMzBFREdFMDQxNAA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Tue, 01 Jun 2021 15:58:57 GMT'
]);

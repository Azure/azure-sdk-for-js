let nock = require('nock');

module.exports.hash = "9d22e91b3c0859e19eebf021b89a898f";

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
  '2.1.13418.10 - SCUS ProdSlices',
  'X-XSS-Protection',
  '0',
  'Set-Cookie',
  'fpc=AqV8HZ1RhkJAs1ONtGd4okA; expires=Thu, 08-Sep-2022 23:39:18 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrvEdmigJo4r1pVAPMaQZl4I_Z9GGn8eIUkw4RPLbgDSl42yGv28Ip16xjYQDz7__XghcigNoKYOmdrFV9jCNID27GuTdFhX5V_mYTd4LSNbVyXFAspi4wzbD0QpuStSmPEEpBqvgx647hEmyarsnwoIQQao5-D26EyQyAQAR9WWMgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 09 Aug 2022 23:39:18 GMT',
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
  '2.1.13481.9 - SCUS ProdSlices',
  'X-XSS-Protection',
  '0',
  'Set-Cookie',
  'fpc=Ag6EH0MYyFBLoPQ5gL7wBZ0; expires=Thu, 08-Sep-2022 23:39:18 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrUjvs9gLaLi5VfVV7bDh_GaFYRNW8ienUwWupI39TYJsChjUup8aEkvXyzg1YJxjSaV5BLWIrw0vlCx6wQqk7DsJK5UWS35r0tC73vaT6MhEVt2hyc_kDhf07A8WtyOgfoHzuRSzVnLbpQyz0-GUNfir1Okx0PldtS1jd3HudM8EgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 09 Aug 2022 23:39:18 GMT',
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
  '2.1.13481.9 - SCUS ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'X-XSS-Protection',
  '0',
  'Set-Cookie',
  'fpc=AiQGHGuF9X1NstomG63rVE5Wyo4SAQAAACbnhNoOAAAA; expires=Thu, 08-Sep-2022 23:39:18 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 09 Aug 2022 23:39:18 GMT',
  'Content-Length',
  '1327'
]);

nock('https://endpoint', {"encodedQueryParams":false})
  .patch('/phoneNumbers/%2B14155550100/capabilities', {"calling":"none","sms":"outbound"})
  .query(false)
  .reply(404, {"error":{"code":"InternalError","message":"The server encountered an internal error."}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json',
  'MS-CV',
  'T1DuQb9l50KD0i+a9SXJJg.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2021-03-07, 2022-01-11-preview2, 2022-06-01-preview, 2022-12-01',
  'X-Processing-Time',
  '410ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0JvDyYgAAAABOXtRjWf7vT4/go5aiuy00TEFYMzExMDAwMTA4MDQ3ADlmYzdiNTE5LWE4Y2MtNGY4OS05MzVlLWM5MTQ4YWUwOWU4MQ==',
  'Date',
  'Tue, 09 Aug 2022 23:39:18 GMT'
]);

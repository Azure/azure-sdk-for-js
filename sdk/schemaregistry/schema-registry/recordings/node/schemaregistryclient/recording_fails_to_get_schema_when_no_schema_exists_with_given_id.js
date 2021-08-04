let nock = require('nock');

module.exports.hash = "b7a82bbd07caa00fea0b29b3433b4989";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .get('/common/discovery/instance')
  .query(true)
  .reply(200, {"tenant_discovery_endpoint":"https://login.microsoftonline.com/azuretenantid/v2.0/.well-known/openid-configuration","api-version":"1.1","metadata":[{"preferred_network":"login.microsoftonline.com","preferred_cache":"login.windows.net","aliases":["login.microsoftonline.com","login.windows.net","login.microsoft.com","sts.windows.net"]},{"preferred_network":"login.partner.microsoftonline.cn","preferred_cache":"login.partner.microsoftonline.cn","aliases":["login.partner.microsoftonline.cn","login.chinacloudapi.cn"]},{"preferred_network":"login.microsoftonline.de","preferred_cache":"login.microsoftonline.de","aliases":["login.microsoftonline.de"]},{"preferred_network":"login.microsoftonline.us","preferred_cache":"login.microsoftonline.us","aliases":["login.microsoftonline.us","login.usgovcloudapi.net"]},{"preferred_network":"login-us.microsoftonline.com","preferred_cache":"login-us.microsoftonline.com","aliases":["login-us.microsoftonline.com"]}]}, [
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
  '654b1795-4b2b-49f2-8832-182916e71502',
  'x-ms-ests-server',
  '2.1.11898.12 - NCUS ProdSlices',
  'Set-Cookie',
  'fpc=AmqBg9l42Q1OozDLmrRPMUPmLYaiBQAAACn8m9gOAAAA; expires=Fri, 03-Sep-2021 03:10:37 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrbTZRpTMp-ao8eOcD0EI5fA9Sz5nHZovOO9Zn4NKgljhg5je0c8UDAsUce_4ZZtHI8VQzY6q4YPeBYYFubRlQp1wlyidZAmL6E_y9WQJ_j7VmhxW0GXnFbw6wK_K2Kid382SG0ET2-F4F9QScko8s67xNEpTWYeBPxblfZ4m_K90gAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 04 Aug 2021 03:10:37 GMT',
  'Content-Length',
  '980'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .get('/azuretenantid/v2.0/.well-known/openid-configuration')
  .reply(200, {"token_endpoint":"https://login.microsoftonline.com/azuretenantid/oauth2/v2.0/token","token_endpoint_auth_methods_supported":["client_secret_post","private_key_jwt","client_secret_basic"],"jwks_uri":"https://login.microsoftonline.com/azuretenantid/discovery/v2.0/keys","response_modes_supported":["query","fragment","form_post"],"subject_types_supported":["pairwise"],"id_token_signing_alg_values_supported":["RS256"],"response_types_supported":["code","id_token","code id_token","id_token token"],"scopes_supported":["openid","profile","email","offline_access"],"issuer":"https://login.microsoftonline.com/azuretenantid/v2.0","request_uri_parameter_supported":false,"userinfo_endpoint":"https://graph.microsoft.com/oidc/userinfo","authorization_endpoint":"https://login.microsoftonline.com/azuretenantid/oauth2/v2.0/authorize","device_authorization_endpoint":"https://login.microsoftonline.com/azuretenantid/oauth2/v2.0/devicecode","http_logout_supported":true,"frontchannel_logout_supported":true,"end_session_endpoint":"https://login.microsoftonline.com/azuretenantid/oauth2/v2.0/logout","claims_supported":["sub","iss","cloud_instance_name","cloud_instance_host_name","cloud_graph_host_name","msgraph_host","aud","exp","iat","auth_time","acr","nonce","preferred_username","name","tid","ver","at_hash","c_hash","email"],"kerberos_endpoint":"https://login.microsoftonline.com/azuretenantid/kerberos","tenant_region_scope":"WW","cloud_instance_name":"microsoftonline.com","cloud_graph_host_name":"graph.windows.net","msgraph_host":"graph.microsoft.com","rbac_url":"https://pas.windows.net"}, [
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
  '14e31011-3a66-483f-a853-24a0ae8b2f01',
  'x-ms-ests-server',
  '2.1.11898.12 - SCUS ProdSlices',
  'Set-Cookie',
  'fpc=AmqBg9l42Q1OozDLmrRPMUPmLYaiBQAAACn8m9gOAAAA; expires=Fri, 03-Sep-2021 03:10:38 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrYUzBFXM1lsEPsVG8XkPQ6vtAgSx3NLgBEu6thrX290Y9LeB1p_13EwwZtwzGD1lrQ2EFN0Y83fcnviHIHVmTjt79l3t7UpgfXkCrXg525Hr7x690CKfK1A8txqlhEGJBG3Ub6Pk3S1SHK8qdGObO6DXnogH9H-udGp4ODmqW6DcgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 04 Aug 2021 03:10:37 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azuretenantid/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.2.0&x-client-OS=linux&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=2|771,0|,&x-client-last-telemetry=2|0|||0,0&client-request-id=554a846d-251d-4820-aa8c-6da067a2de9e&client_secret=azure_client_secret")
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
  '54f1c26e-73c6-4c30-b96b-cdcbdc421801',
  'x-ms-ests-server',
  '2.1.11898.12 - WUS2 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=AmqBg9l42Q1OozDLmrRPMUPmLYaiBgAAACn8m9gOAAAA; expires=Fri, 03-Sep-2021 03:10:38 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 04 Aug 2021 03:10:37 GMT',
  'Content-Length',
  '1321'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/$schemagroups/getSchemaById/ffffffffffffffffffffffffffffffff')
  .query(true)
  .reply(404, {"Code":404,"Detail":"Schema id ffffffffffffffffffffffffffffffff does not exist. TrackingId:242b763b-148e-4095-aeb1-4973bacdf552_G27, SystemTracker:endpoint:$schemagroups/getSchemaById/ffffffffffffffffffffffffffffffff, Timestamp:2021-08-04T03:10:38"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'Strict-Transport-Security',
  'max-age=31536000',
  'Date',
  'Wed, 04 Aug 2021 03:10:38 GMT'
]);

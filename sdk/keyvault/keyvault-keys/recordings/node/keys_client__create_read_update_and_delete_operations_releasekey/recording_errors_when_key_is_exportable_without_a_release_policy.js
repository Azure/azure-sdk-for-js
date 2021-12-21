let nock = require('nock');

module.exports.hash = "5db145c2d5425155e1f956d524f7c3b8";

module.exports.testInfo = {"uniqueName":{"exportablenopolicy":"exportablenopolicy164012520143805745"},"newDate":{}}

nock('https://skr_attestation.azure.net:443', {"encodedQueryParams":true})
  .get('//generate-test-token')
  .reply(200, {"token":"eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjNfT1drYTlNcEpTeFM0NHZBbXRSRHNKelFkeFJPNkxfQkF5VHNXUVhEeUUiLCJqa3UiOiJodHRwczovL21hbGVnZXNrcmt2c2l0ZS5henVyZXdlYnNpdGVzLm5ldC9rZXlzIn0.eyJpc3MiOiJodHRwczovL21hbGVnZXNrcmt2c2l0ZS5henVyZXdlYnNpdGVzLm5ldC8iLCJzZGstdGVzdCI6dHJ1ZSwieC1tcy1pbml0dGltZSI6e30sIngtbXMtcnVudGltZSI6eyJrZXlzIjpbeyJrdHkiOiJSU0EiLCJraWQiOiJmYWtlLXJlbGVhc2Uta2V5IiwidXNlIjoiZW5jIiwiZSI6IkFRQUIiLCJuIjoibUpyU0Y4YWNfNlJ4WVQyd1B4RmRRNlVjcEJlVmRNR2I1X3l4WmhnWVNxSkVKaF9KUUVzcTJraDczcGlFU3lGYW5fN09qSGdBVmVrRm15aWxLWkw5WEtmRXBXQjlhbXZUWm9ydVdhM25JUDNjdVBpNXRVTFpteEJCTDlSWWhMZDJTbk81YWd3ZnNmanliMFJNemNBVDhWTjlxQ29hTU4xY09oM2pWSnNwX2JBS1NyWVNoeDBpaXRxamZMLW9mcTZxYVY1YmFsYU96dUVtV0NBcmtMRnRxd0hmRmR5dnVCTUducGdqam5HTGhHcDBpV3hxM21oWnA2NFZJaEtuSm5YRE1BcmpucUhocnFrbW8tNU1nbEkzV3h4Vm01MW9ENDVtYnNIeWdicmNHVGFRZlpNUkFYcDJKcHlBcF9RblhVZGdvTWtjdlVZY092NTd6YzFHY1pmbEZRIn1dfSwibWFhLWVoZCI6InNkay10ZXN0IiwiaWF0IjoxNjQwMTI1MjAwLCJleHAiOjE2NDA3MzAwMDB9.M2j1hNXfCZn1e4UO_uXC7gg6TSEl0zLtt_zsuKdkO8Snf2A_umvrtW4U4lcd0poPvu-DrwdI69K-QlnT5DMgr83tF6eTdXXQrPXs-viHWCLNWnLDYpI7RkqQzOr6yHvDL7s4KVHso_h1unpeLiX43e0ofFmPTFQKpWbL_K99URJ6jvuH9FnahCU-H1dKjRAETPMBH4negfdSgWWtu_5oC_FnEd7G2R08klvcgrOSg60dRvyODTmdidn8AfvxeWMMhUttxr5HZbvRDW2PPO4ZYvjLhLe1DBp0dnJxcVlZfDUBKTd7-iCKxAgSUcQ_liyO40bn74aOgQT1MIrTgf1sEg"}, [
  'Content-Length',
  '1307',
  'Content-Type',
  'application/json; charset=utf-8',
  'ETag',
  'W/"51b-mykgOkAe3ZSj9WNfwQ45TXbQHns"',
  'X-Powered-By',
  'Express',
  'Set-Cookie',
  'ARRAffinity=c6a88b48c7c8f7eb36b815faecc076b5af62a303dfe264125f83c50a4458b7aa;Path=/;HttpOnly;Secure;Domain=skr_attestation.azure.net',
  'Set-Cookie',
  'ARRAffinitySameSite=c6a88b48c7c8f7eb36b815faecc076b5af62a303dfe264125f83c50a4458b7aa;Path=/;HttpOnly;SameSite=None;Secure;Domain=skr_attestation.azure.net',
  'Date',
  'Tue, 21 Dec 2021 22:19:59 GMT',
  'Connection',
  'close'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/exportablenopolicy164012520143805745/create')
  .query(true)
  .reply(401, {"error":{"code":"Unauthorized","message":"AKV10000: Request is missing a Bearer or PoP token."}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '97',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'WWW-Authenticate',
  'Bearer authorization="https://login.windows.net/12345678-1234-1234-1234-123456789012", resource="https://vault.azure.net"',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  '3c1509cf-7a1c-4f7f-87a6-f88f839a2323',
  'x-ms-request-id',
  'e3a3eb5a-f140-4195-b704-ef77a1d8b37c',
  'x-ms-keyvault-service-version',
  '1.9.226.1',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.229.43;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 21 Dec 2021 22:20:00 GMT'
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
  '1a301a57-1639-43c0-a9c3-72162abe7000',
  'x-ms-ests-server',
  '2.1.12261.17 - SCUS ProdSlices',
  'Set-Cookie',
  'fpc=Ak3BgsdKafpDlLnSq8w1UQ0; expires=Thu, 20-Jan-2022 22:20:00 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrvdwsH3mtcLl9NCxJaDp_kTduuIfisooM1rJAT6U--Mp6OjHe4nO7-Rufm7wpP5koXGbPc5DxCu-5ZFHDrUod4oCo7H7-ZNsBmFKzIZjXqZUeflNk2i94JDBdHN_8WTyW7nc5GWZFOfyyxXZjE08klUG55A-Zi_iVBGJyfoRo2TIgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 21 Dec 2021 22:19:59 GMT',
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
  'f931859a-82fa-4da6-bd06-0e32c5442300',
  'x-ms-ests-server',
  '2.1.12261.17 - NCUS ProdSlices',
  'Set-Cookie',
  'fpc=Asewy57w2CVDlhayD-QqtK8; expires=Thu, 20-Jan-2022 22:20:00 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevr7AYg60CusZQfGsgLpZhI4HZ8eZP5_IQPS96ltW-210NSRlWizkzwG_a_SN5xVc7T_qm9CMLPRfu1mox2tCP2WgKSrIbugiB6E7fHFfVq8RbxMa9oH_6iSVImv4Yz0ZCu1mcyILp-lWbiIiNmMs4zdmtKU081jwuzeWzQTNSxuf4gAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 21 Dec 2021 22:19:59 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/12345678-1234-1234-1234-123456789012/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.4.0&x-client-OS=linux&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=b2c8bb8d-a7b0-4690-a919-4f81fd82d891&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22cp1%22%5D%7D%7D%7D")
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
  '06003e2f-a591-4670-a7a2-537115065b00',
  'x-ms-ests-server',
  '2.1.12261.17 - EUS ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=AgB19Jvq_1tIjoeKLbzK9bIDBgNGAQAAAA9KVNkOAAAA; expires=Thu, 20-Jan-2022 22:20:00 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 21 Dec 2021 22:20:00 GMT',
  'Content-Length',
  '1315'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/exportablenopolicy164012520143805745/create', {"kty":"RSA-HSM","attributes":{"exportable":true}})
  .query(true)
  .reply(400, {"error":{"code":"BadParameter","message":"AKV.SKR.1004: Exportable keys must have release policy."}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '101',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  '3c1509cf-7a1c-4f7f-87a6-f88f839a2323',
  'x-ms-request-id',
  'da18683a-a06a-4d9b-9540-32ec1ec1151f',
  'x-ms-keyvault-service-version',
  '1.9.226.1',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.229.43;act_addr_fam=InterNetwork;',
  'x-ms-keyvault-rbac-assignment-id',
  '41066385-37cd-5a3a-83db-c5df12b11057',
  'x-ms-keyvault-rbac-cache',
  'ra_age=8620;da_age=8620;rd_age=8620;brd_age=22371;dec_lev=1;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 21 Dec 2021 22:20:00 GMT'
]);

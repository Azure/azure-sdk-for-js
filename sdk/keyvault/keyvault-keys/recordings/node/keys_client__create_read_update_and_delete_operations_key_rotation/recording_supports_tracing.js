let nock = require('nock');

module.exports.hash = "81118ecda6ab280f45220b8d8546a77e";

module.exports.testInfo = {"uniqueName":{"rotationpolicytracing":"rotationpolicytracing164875065672907623"},"newDate":{}}

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/rotationpolicytracing164875065672907623/create')
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
  'f93009ff-d508-429d-a3ca-04df45a1b9d8',
  'x-ms-request-id',
  '8afb3286-c02e-45a4-9e7d-36b3d349567e',
  'x-ms-keyvault-service-version',
  '1.9.331.5',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=131.107.147.48;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 31 Mar 2022 18:17:37 GMT'
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
  '56fe823d-e675-46c3-8f19-31cf6830e100',
  'x-ms-ests-server',
  '2.1.12570.11 - EUS ProdSlices',
  'Set-Cookie',
  'fpc=Atq5LxefYMRDhN91J8nJRnY; expires=Sat, 30-Apr-2022 18:17:38 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrdHhkYXijaKFVx81yGcsJCSNG6pwzNdEN6uSLKnw4RbHxwnbHa6XywJy8Bq4HHREtNfASxgAtlRbwm2pyFrzJjx4WH_QLyybcy5xLNThVUNK4fopPXBDX1JOWITR4TXvcCMOpfGjZ1q8tnjN7TKgTWYkLyK4Rc3CKjh3zxlW3Et0gAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 31 Mar 2022 18:17:37 GMT',
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
  'c9cd9f36-d071-4603-b355-fb74b9192400',
  'x-ms-ests-server',
  '2.1.12570.16 - SCUS ProdSlices',
  'Set-Cookie',
  'fpc=Arr1y6DTDGlNrIGN2vGEDPE; expires=Sat, 30-Apr-2022 18:17:38 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevr6VdJWaoc8U2JeR3FmSdoE5FkWAS2vPFrwlTXGCnryDqDMHiCro0RxGpKc_JoFAx16TgKNRGKUq_eR0Lg3TbTIRII0JUlEFtHyHZr7x130Bu4gBg3DkkmR6lARrHHKeyyt7EdAtyVwMox-QQdo-7DnJ0q0r6BQPFLCBIILVA6d-cgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 31 Mar 2022 18:17:37 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/12345678-1234-1234-1234-123456789012/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.5.0&x-client-OS=linux&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=e835159c-5103-43a9-a6e1-49e350e3c395&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22cp1%22%5D%7D%7D%7D")
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
  'f0ad2266-1871-4f8e-88b6-b4a1a0392100',
  'x-ms-ests-server',
  '2.1.12570.16 - WUS2 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=Ak__ahuVM35CpUdXVoUO7ef_ARkqAQAAAELn19kOAAAA; expires=Sat, 30-Apr-2022 18:17:38 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 31 Mar 2022 18:17:37 GMT',
  'Content-Length',
  '1315'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/rotationpolicytracing164875065672907623/create', {"kty":"RSA"})
  .query(true)
  .reply(200, {"key":{"kid":"https://keyvault_name.vault.azure.net/keys/rotationpolicytracing164875065672907623/f164911cf8254ec6a9955b5e850a661d","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"0iboQV5uKy5_lT7NRtqYZXhM-_gYEs1FA1gJS9Uey1pjRtdFNHKCyQPVhh-O3LiEi3OICxq2ROMfjIU521aar7WH56DhnFFTB5hwj6hF7G7Ns4wyxCvRYB1EbUrIRLsuGAoNqc6sEMBT0WZ2EWk8mMb0EO_XpOSky7Hu7Gp18j7CM_4ce8IFUVNZW1DQ_pYVrtrisSjtdyK5wHu2bWq1upwjSKsvTR7LxMo4O6sqQAkTEWUrxsazrR0p7YDPacMRIVXZAQuPHvoJDzKUcu2NN_JzVIcC8BcdB9CvpPj1GFV1t9UuiWsZPSzamkOKSVaiuKHr7mAsqZsq1j_TPentRQ","e":"AQAB"},"attributes":{"enabled":true,"created":1648750658,"updated":1648750658,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  'f93009ff-d508-429d-a3ca-04df45a1b9d8',
  'x-ms-request-id',
  '523c6f56-ed5e-4094-b970-1367c88bd22b',
  'x-ms-keyvault-service-version',
  '1.9.331.5',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=131.107.147.48;act_addr_fam=InterNetwork;',
  'x-ms-keyvault-rbac-assignment-id',
  'e9a68c51-304f-5f7a-9d41-f0eff01068c7',
  'x-ms-keyvault-rbac-cache',
  'ra_age=0;da_age=0;rd_age=0;brd_age=21027;ra_notif_age=1114;dec_lev=3;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 31 Mar 2022 18:17:38 GMT',
  'Content-Length',
  '713'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .put('/keys/rotationpolicytracing164875065672907623/rotationpolicy', {"lifetimeActions":[{"trigger":{"timeAfterCreate":"P2M"},"action":{"type":"Rotate"}}],"attributes":{}})
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/keys/rotationpolicytracing164875065672907623/rotationpolicy","lifetimeActions":[{"trigger":{"timeAfterCreate":"P2M"},"action":{"type":"Rotate"}},{"trigger":{"timeBeforeExpiry":"P30D"},"action":{"type":"Notify"}}],"attributes":{"created":1648750658,"updated":1648750658}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  'b64807b4-575a-490e-8cc3-09859e7a30b0',
  'x-ms-request-id',
  '88430bd7-9f87-43a4-88d0-431a88875bfb',
  'x-ms-keyvault-service-version',
  '1.9.331.5',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=131.107.147.48;act_addr_fam=InterNetwork;',
  'x-ms-keyvault-rbac-assignment-id',
  'e9a68c51-304f-5f7a-9d41-f0eff01068c7',
  'x-ms-keyvault-rbac-cache',
  'ra_age=0;da_age=0;rd_age=0;brd_age=21027;ra_notif_age=1114;dec_lev=1;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 31 Mar 2022 18:17:38 GMT',
  'Content-Length',
  '311'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/keys/rotationpolicytracing164875065672907623/rotationpolicy')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/keys/rotationpolicytracing164875065672907623/rotationpolicy","lifetimeActions":[{"trigger":{"timeAfterCreate":"P2M"},"action":{"type":"Rotate"}},{"trigger":{"timeBeforeExpiry":"P30D"},"action":{"type":"Notify"}}],"attributes":{"created":1648750658,"updated":1648750658}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  '5482db9a-1f9b-4c82-b574-375e76c79566',
  'x-ms-request-id',
  'cd9bde3a-2d14-4070-8942-1a0173b0602e',
  'x-ms-keyvault-service-version',
  '1.9.331.5',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=131.107.147.48;act_addr_fam=InterNetwork;',
  'x-ms-keyvault-rbac-assignment-id',
  'e9a68c51-304f-5f7a-9d41-f0eff01068c7',
  'x-ms-keyvault-rbac-cache',
  'ra_age=0;da_age=0;rd_age=0;brd_age=21027;ra_notif_age=1114;dec_lev=1;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 31 Mar 2022 18:17:38 GMT',
  'Content-Length',
  '311'
]);

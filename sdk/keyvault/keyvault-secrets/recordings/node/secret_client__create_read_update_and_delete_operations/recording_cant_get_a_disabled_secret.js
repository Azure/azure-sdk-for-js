let nock = require('nock');

module.exports.hash = "550c4b8d1c8f777e38d1a2a844b2a3b7";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .put('/secrets/CRUDSecretName-cantgetadisabledsecret-')
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
  '46659c1a-59e8-4ec6-8a9e-21920c68a39c',
  'x-ms-request-id',
  'fc674792-9866-4c67-a4bb-109a123f4b20',
  'x-ms-keyvault-service-version',
  '1.9.378.1',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=131.107.159.98;act_addr_fam=InterNetwork;',
  'X-Content-Type-Options',
  'nosniff',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'Date',
  'Tue, 26 Apr 2022 22:42:23 GMT'
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
  '4da68c8d-2745-4010-b382-9c5c4d8e3e00',
  'x-ms-ests-server',
  '2.1.12651.9 - NCUS ProdSlices',
  'X-XSS-Protection',
  '0',
  'Set-Cookie',
  'fpc=AtwIL9gff9FBk99aP6KcFgs; expires=Thu, 26-May-2022 22:42:23 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevr0dVwzmk1RcsuJEPt-QoctNzFRNOlW_zW2YG9UIuTaqE_xt6IlFf1XMw4oesKFWiAOZDG-Fk-E2k0Z7x2jL-luSWv3NFlZ-wEd7pXaZyygwCztlXUfw_LXqjp-8IlT-XFHuCMtZ4rJOiuSUJMsjH5MgGvE94s9CVprEw4HympJc4gAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 26 Apr 2022 22:42:23 GMT',
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
  '70ec8d8c-beb2-4b79-871e-a54987772600',
  'x-ms-ests-server',
  '2.1.12651.9 - NCUS ProdSlices',
  'X-XSS-Protection',
  '0',
  'Set-Cookie',
  'fpc=AlhMw_X9Q1dGod4W_a2t1dI; expires=Thu, 26-May-2022 22:42:23 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevriVj8xa-vBJC7UGbjc0FKsKOK4gw65OFNDs5QiVGe6YUyqD5G8R0fmKKM289SCxqApZ2EdIL0hoqU3CVmJ4hzdexV4IxF61xsVzB1BfFWek55rrP_joWGN20CWt_tw_Z-CO4e7YRrs1s1Ap8MEnMNXTXN2xVbHyLtYU3cJcWWCCQgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 26 Apr 2022 22:42:23 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/12345678-1234-1234-1234-123456789012/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.7.0&x-client-OS=win32&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=82c62e39-936e-40de-928f-7bd7c6ee11fd&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22cp1%22%5D%7D%7D%7D")
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
  '1dcb7f7b-4f65-4d5b-9d16-8f5863070600',
  'x-ms-ests-server',
  '2.1.12707.9 - WUS2 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'X-XSS-Protection',
  '0',
  'Set-Cookie',
  'fpc=An_VYaXLUUVArvaQHePB-cZPlvakAQAAAE9s-tkOAAAA; expires=Thu, 26-May-2022 22:42:23 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 26 Apr 2022 22:42:23 GMT',
  'Content-Length',
  '1315'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .put('/secrets/CRUDSecretName-cantgetadisabledsecret-', {"value":"SECRET_VALUE","attributes":{"enabled":false}})
  .query(true)
  .reply(200, {"value":"SECRET_VALUE","id":"https://keyvault_name.vault.azure.net/secrets/CRUDSecretName-cantgetadisabledsecret-/24a1da9bb60643ccad3dab9f9752e287","attributes":{"enabled":false,"created":1651012943,"updated":1651012943,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7}}, [
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
  '46659c1a-59e8-4ec6-8a9e-21920c68a39c',
  'x-ms-request-id',
  'd61c6b8a-eba8-4d50-a027-3959dd088c13',
  'x-ms-keyvault-service-version',
  '1.9.378.1',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=131.107.159.98;act_addr_fam=InterNetwork;',
  'x-ms-keyvault-rbac-assignment-id',
  '0cc3cf84-3de1-5005-ab06-0ef4d04fa1de',
  'x-ms-keyvault-rbac-cache',
  'ra_age=1555;da_age=1555;rd_age=1555;brd_age=7113;ra_notif_age=8195;dec_lev=1;',
  'X-Content-Type-Options',
  'nosniff',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'Date',
  'Tue, 26 Apr 2022 22:42:23 GMT',
  'Content-Length',
  '312'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/secrets/CRUDSecretName-cantgetadisabledsecret-/')
  .query(true)
  .reply(403, {"error":{"code":"Forbidden","message":"Operation get is not allowed on a disabled secret.","innererror":{"code":"SecretDisabled"}}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '132',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  '9cb1d81b-3081-4806-8e3c-b3d82269e296',
  'x-ms-request-id',
  '3d7b8593-9c57-49ba-bdd5-72612cf45d3f',
  'x-ms-keyvault-service-version',
  '1.9.378.1',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=131.107.159.98;act_addr_fam=InterNetwork;',
  'x-ms-keyvault-rbac-assignment-id',
  '0cc3cf84-3de1-5005-ab06-0ef4d04fa1de',
  'x-ms-keyvault-rbac-cache',
  'ra_age=1555;da_age=1555;rd_age=1555;brd_age=7113;ra_notif_age=8195;dec_lev=1;',
  'X-Content-Type-Options',
  'nosniff',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'Date',
  'Tue, 26 Apr 2022 22:42:23 GMT'
]);

let nock = require('nock');

module.exports.hash = "936213c96d1fcc0891a076ac35219d13";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .put('/secrets/listSecretName-canretrieveallversionsofasecretbypage-')
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
  'bf382843-5486-474c-9bf0-6b683897528d',
  'x-ms-request-id',
  '61a311cc-c24a-4256-97a6-44a9f75ed8de',
  'x-ms-keyvault-service-version',
  '1.9.378.1',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=131.107.159.98;act_addr_fam=InterNetwork;',
  'X-Content-Type-Options',
  'nosniff',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'Date',
  'Tue, 26 Apr 2022 22:46:29 GMT'
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
  'dc39923d-5edf-43c2-aa3d-4736c41bb201',
  'x-ms-ests-server',
  '2.1.12651.7 - WUS2 ProdSlices',
  'X-XSS-Protection',
  '0',
  'Set-Cookie',
  'fpc=Aqb0ipzIqrpGsbYbyS6zXSQ; expires=Thu, 26-May-2022 22:46:29 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevr4LikVuShagrqD2gFH6Pqg4M3_77i0s9yIKDlRwnXbjAWuIlwOBNcrEyVrBHjumDA7DF4YU154P8HvciH2E1QfbKjdXZvpRw6eXT5koUTXOXN3192GtYwFOw2TrIxg4mDsdZHMSoYBdoTRlTVIxPnZtxRfAjfugLQQ6QhS_35pm0gAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 26 Apr 2022 22:46:29 GMT',
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
  'a44cbcf9-3eb1-4c5a-a2b0-9da9eb746500',
  'x-ms-ests-server',
  '2.1.12651.9 - EUS ProdSlices',
  'X-XSS-Protection',
  '0',
  'Set-Cookie',
  'fpc=AuiGYGOz-T5BtWH_OpHAhlk; expires=Thu, 26-May-2022 22:46:29 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrRfvoKViPypTZ1uxRrcaKtA2eBbUmoNhbm7b2fRFEEsMtmKyZpSKusFbkaYtJOo2Widike1HJcHzVAUllg1lz21nAZizNz7K1sO0aTCa72GaweiiOyQRy3KAegcV6L4agCJGsfLfQZZG5F9SJWbS1lZRGInlC4hRjO1kN1zxCquggAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 26 Apr 2022 22:46:29 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/12345678-1234-1234-1234-123456789012/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.7.0&x-client-OS=win32&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=9c0fe27c-1ff7-4f55-bb96-1a4eaa4d3590&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22cp1%22%5D%7D%7D%7D")
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
  '2fa2cd32-6a27-43f6-9d58-fa123c276b00',
  'x-ms-ests-server',
  '2.1.12651.9 - EUS ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'X-XSS-Protection',
  '0',
  'Set-Cookie',
  'fpc=ApNgxOZH5sNJvurY6X9lB6VPlvakAQAAAEVt-tkOAAAA; expires=Thu, 26-May-2022 22:46:29 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 26 Apr 2022 22:46:29 GMT',
  'Content-Length',
  '1315'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .put('/secrets/listSecretName-canretrieveallversionsofasecretbypage-', {"value":"SECRET_VALUE0","attributes":{}})
  .query(true)
  .reply(200, {"value":"SECRET_VALUE0","id":"https://keyvault_name.vault.azure.net/secrets/listSecretName-canretrieveallversionsofasecretbypage-/497c0379955c495f9c48d8b25682ca6c","attributes":{"enabled":true,"created":1651013189,"updated":1651013189,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7}}, [
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
  'bf382843-5486-474c-9bf0-6b683897528d',
  'x-ms-request-id',
  '74b0d4f1-85d3-4c0f-9881-02d85080512e',
  'x-ms-keyvault-service-version',
  '1.9.378.1',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=131.107.159.98;act_addr_fam=InterNetwork;',
  'x-ms-keyvault-rbac-assignment-id',
  '0cc3cf84-3de1-5005-ab06-0ef4d04fa1de',
  'x-ms-keyvault-rbac-cache',
  'ra_age=1801;da_age=1801;rd_age=1801;brd_age=7359;ra_notif_age=8441;dec_lev=1;',
  'X-Content-Type-Options',
  'nosniff',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'Date',
  'Tue, 26 Apr 2022 22:46:29 GMT',
  'Content-Length',
  '326'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .put('/secrets/listSecretName-canretrieveallversionsofasecretbypage-', {"value":"SECRET_VALUE1","attributes":{}})
  .query(true)
  .reply(200, {"value":"SECRET_VALUE1","id":"https://keyvault_name.vault.azure.net/secrets/listSecretName-canretrieveallversionsofasecretbypage-/faefdcdade944cfca5216857f48ca308","attributes":{"enabled":true,"created":1651013189,"updated":1651013189,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7}}, [
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
  'd4af1c7b-b56f-4e69-9a6c-24d6defcb48d',
  'x-ms-request-id',
  'c4f7fbac-1a51-49a2-9a12-541f8e1a2c64',
  'x-ms-keyvault-service-version',
  '1.9.378.1',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=131.107.159.98;act_addr_fam=InterNetwork;',
  'x-ms-keyvault-rbac-assignment-id',
  '0cc3cf84-3de1-5005-ab06-0ef4d04fa1de',
  'x-ms-keyvault-rbac-cache',
  'ra_age=1801;da_age=1801;rd_age=1801;brd_age=7359;ra_notif_age=8441;dec_lev=0;',
  'X-Content-Type-Options',
  'nosniff',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'Date',
  'Tue, 26 Apr 2022 22:46:29 GMT',
  'Content-Length',
  '326'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .put('/secrets/listSecretName-canretrieveallversionsofasecretbypage-', {"value":"SECRET_VALUE2","attributes":{}})
  .query(true)
  .reply(200, {"value":"SECRET_VALUE2","id":"https://keyvault_name.vault.azure.net/secrets/listSecretName-canretrieveallversionsofasecretbypage-/712803390bf74538a1c8097d27baee02","attributes":{"enabled":true,"created":1651013189,"updated":1651013189,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7}}, [
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
  '2bfd15b7-bc06-451f-94e6-550ce5bd5b70',
  'x-ms-request-id',
  '1589a207-5cac-41ea-96bf-a298d9fb410f',
  'x-ms-keyvault-service-version',
  '1.9.378.1',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=131.107.159.98;act_addr_fam=InterNetwork;',
  'x-ms-keyvault-rbac-assignment-id',
  '0cc3cf84-3de1-5005-ab06-0ef4d04fa1de',
  'x-ms-keyvault-rbac-cache',
  'ra_age=1801;da_age=1801;rd_age=1801;brd_age=7359;ra_notif_age=8441;dec_lev=0;',
  'X-Content-Type-Options',
  'nosniff',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'Date',
  'Tue, 26 Apr 2022 22:46:29 GMT',
  'Content-Length',
  '326'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/secrets/listSecretName-canretrieveallversionsofasecretbypage-/versions')
  .query(true)
  .reply(200, {"value":[{"id":"https://keyvault_name.vault.azure.net/secrets/listSecretName-canretrieveallversionsofasecretbypage-/497c0379955c495f9c48d8b25682ca6c","attributes":{"enabled":true,"created":1651013189,"updated":1651013189,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7}},{"id":"https://keyvault_name.vault.azure.net/secrets/listSecretName-canretrieveallversionsofasecretbypage-/712803390bf74538a1c8097d27baee02","attributes":{"enabled":true,"created":1651013189,"updated":1651013189,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7}},{"id":"https://keyvault_name.vault.azure.net/secrets/listSecretName-canretrieveallversionsofasecretbypage-/faefdcdade944cfca5216857f48ca308","attributes":{"enabled":true,"created":1651013189,"updated":1651013189,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7}}],"nextLink":null}, [
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
  'aa5cc877-1b8b-42ac-ad99-8a58527c5016',
  'x-ms-request-id',
  'e027b72b-f93a-45d0-af6e-0022503610ca',
  'x-ms-keyvault-service-version',
  '1.9.378.1',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=131.107.159.98;act_addr_fam=InterNetwork;',
  'x-ms-keyvault-rbac-assignment-id',
  '0cc3cf84-3de1-5005-ab06-0ef4d04fa1de',
  'x-ms-keyvault-rbac-cache',
  'ra_age=1801;da_age=1801;rd_age=1801;brd_age=7359;ra_notif_age=8441;dec_lev=1;',
  'X-Content-Type-Options',
  'nosniff',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'Date',
  'Tue, 26 Apr 2022 22:46:29 GMT',
  'Content-Length',
  '936'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/secrets/listSecretName-canretrieveallversionsofasecretbypage-/497c0379955c495f9c48d8b25682ca6c')
  .query(true)
  .reply(200, {"value":"SECRET_VALUE0","id":"https://keyvault_name.vault.azure.net/secrets/listSecretName-canretrieveallversionsofasecretbypage-/497c0379955c495f9c48d8b25682ca6c","attributes":{"enabled":true,"created":1651013189,"updated":1651013189,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7}}, [
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
  '1062f9ab-a283-4d12-a494-f211c289c907',
  'x-ms-request-id',
  '9e9beb73-71d4-48f1-81cc-9f43dca0da03',
  'x-ms-keyvault-service-version',
  '1.9.378.1',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=131.107.159.98;act_addr_fam=InterNetwork;',
  'x-ms-keyvault-rbac-assignment-id',
  '0cc3cf84-3de1-5005-ab06-0ef4d04fa1de',
  'x-ms-keyvault-rbac-cache',
  'ra_age=1801;da_age=1801;rd_age=1801;brd_age=7359;ra_notif_age=8441;dec_lev=1;',
  'X-Content-Type-Options',
  'nosniff',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'Date',
  'Tue, 26 Apr 2022 22:46:29 GMT',
  'Content-Length',
  '326'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/secrets/listSecretName-canretrieveallversionsofasecretbypage-/712803390bf74538a1c8097d27baee02')
  .query(true)
  .reply(200, {"value":"SECRET_VALUE2","id":"https://keyvault_name.vault.azure.net/secrets/listSecretName-canretrieveallversionsofasecretbypage-/712803390bf74538a1c8097d27baee02","attributes":{"enabled":true,"created":1651013189,"updated":1651013189,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7}}, [
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
  '6ff75d39-8812-4422-b702-7809a9d531b0',
  'x-ms-request-id',
  'fd7b7ddd-ab0a-4fc2-86ae-98f40eadfc6d',
  'x-ms-keyvault-service-version',
  '1.9.378.1',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=131.107.159.98;act_addr_fam=InterNetwork;',
  'x-ms-keyvault-rbac-assignment-id',
  '0cc3cf84-3de1-5005-ab06-0ef4d04fa1de',
  'x-ms-keyvault-rbac-cache',
  'ra_age=1801;da_age=1801;rd_age=1801;brd_age=7359;ra_notif_age=8441;dec_lev=0;',
  'X-Content-Type-Options',
  'nosniff',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'Date',
  'Tue, 26 Apr 2022 22:46:29 GMT',
  'Content-Length',
  '326'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/secrets/listSecretName-canretrieveallversionsofasecretbypage-/faefdcdade944cfca5216857f48ca308')
  .query(true)
  .reply(200, {"value":"SECRET_VALUE1","id":"https://keyvault_name.vault.azure.net/secrets/listSecretName-canretrieveallversionsofasecretbypage-/faefdcdade944cfca5216857f48ca308","attributes":{"enabled":true,"created":1651013189,"updated":1651013189,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7}}, [
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
  '202df5fa-9f14-42af-96d6-1d2251c1a9c2',
  'x-ms-request-id',
  'cbaf3eaf-7473-4a74-a4ed-44a55ac1dcaa',
  'x-ms-keyvault-service-version',
  '1.9.378.1',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=131.107.159.98;act_addr_fam=InterNetwork;',
  'x-ms-keyvault-rbac-assignment-id',
  '0cc3cf84-3de1-5005-ab06-0ef4d04fa1de',
  'x-ms-keyvault-rbac-cache',
  'ra_age=1801;da_age=1801;rd_age=1801;brd_age=7359;ra_notif_age=8441;dec_lev=0;',
  'X-Content-Type-Options',
  'nosniff',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'Date',
  'Tue, 26 Apr 2022 22:46:29 GMT',
  'Content-Length',
  '326'
]);

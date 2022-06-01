let nock = require('nock');

module.exports.hash = "a1287ce07ad49151885f7e86de6ce4cf";

module.exports.testInfo = {"uniqueName":{"exportablenopolicy":"exportablenopolicy164011273334301887"},"newDate":{}}

nock('https://skr_attestation.azure.net:443', {"encodedQueryParams":true})
  .get('//generate-test-token')
  .reply(200, {"token":"eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjNfT1drYTlNcEpTeFM0NHZBbXRSRHNKelFkeFJPNkxfQkF5VHNXUVhEeUUiLCJqa3UiOiJodHRwczovL21hbGVnZXNrcmt2c2l0ZS5henVyZXdlYnNpdGVzLm5ldC9rZXlzIn0.eyJpc3MiOiJodHRwczovL21hbGVnZXNrcmt2c2l0ZS5henVyZXdlYnNpdGVzLm5ldC8iLCJzZGstdGVzdCI6dHJ1ZSwieC1tcy1pbml0dGltZSI6e30sIngtbXMtcnVudGltZSI6eyJrZXlzIjpbeyJrdHkiOiJSU0EiLCJraWQiOiJmYWtlLXJlbGVhc2Uta2V5IiwidXNlIjoiZW5jIiwiZSI6IkFRQUIiLCJuIjoieDNMdDlzX0RCRXYtaVFZcWYwMldGTnY1VThxQWdrSUtWZzNhMWZYOV9lZS1LS2RIVi1DQlJzUUlmUmRRN0RWeTVpaG9yeTRBOGlRZmYyMHBGZzEwZ1ZZMThDOTYtUks2S2FXZDhWRHljVm1fV2RSNWwtZDRfZ1Qya1hkYlU1R2c0eWRkOENQQ25nWU9UUnQ0QzU4VzBwZ1RDQjU0dnpxNGxjSWI3cHl4SUVmMkFVYmhBVlBsbm9USTlkNXpZZzFwLWVnTFd0VlRobHBLYkNVd0gxTktOSlk5VmJsTGhlMXFtSGJlMEJpSlc3a0dJdFFGVGQ4SjZtZVlpdkdtMF82RWx3dnByQjQ5MVBaYzZKUXdFNk0wd2p6dnV3RDU5NVBDNllLUWdVYjdQbWx6T2RmeEx4OHZMOFE1VnFETUhlcUNqOWRXVWpXWDJNYU9pY0pJWVhjYS13In1dfSwibWFhLWVoZCI6InNkay10ZXN0IiwiaWF0IjoxNjQwMTEyNzMyLCJleHAiOjE2NDA3MTc1MzJ9.QquCtWWKZOOLa7Dm3lVF_lgG-JBxZsV-2A8lKS6edQD_SkOGxEUsjZQj9Jw5CZ-Xkg_UHfCIzwimcuNeOHW3bDpHjo3wCEldCudO488hhlI42bvyOarNEEsO828o-t7vc2obvlIIpaq05WBbq2BQCqmDbWC8FU2a-tGo-gpLoX8pdIgtnIALBlGLPciKn5U2RBSq9nCeCUCm_Bx-JPQHZ4Wx_dEbNgQHVwkAcUgURkQaCjBvr292c025bJI2wBdIhmkXaLkkJOXA6aCbYkcLRIXrpAAgZ6Owv-WuwOKA8gCLCGuIkb8Zv_nKn8Ly7wfvkp1qO72pjWDqNvL5slq9sA"}, [
  'Content-Length',
  '1307',
  'Content-Type',
  'application/json; charset=utf-8',
  'ETag',
  'W/"51b-y89OetGxq4JQvk7I8Bpi+bUHTtc"',
  'X-Powered-By',
  'Express',
  'Set-Cookie',
  'ARRAffinity=c6a88b48c7c8f7eb36b815faecc076b5af62a303dfe264125f83c50a4458b7aa;Path=/;HttpOnly;Secure;Domain=skr_attestation.azure.net',
  'Set-Cookie',
  'ARRAffinitySameSite=c6a88b48c7c8f7eb36b815faecc076b5af62a303dfe264125f83c50a4458b7aa;Path=/;HttpOnly;SameSite=None;Secure;Domain=skr_attestation.azure.net',
  'Date',
  'Tue, 21 Dec 2021 18:52:12 GMT',
  'Connection',
  'close'
]);

nock('https://azure_managedhsm.managedhsm.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/exportablenopolicy164011273334301887/create')
  .query(true)
  .reply(401, "", [
  'content-type',
  'application/json; charset=utf-8',
  'x-ms-server-latency',
  '1',
  'x-content-type-options',
  'nosniff',
  'www-authenticate',
  'Bearer authorization="https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012", resource="https://managedhsm.azure.net"',
  'x-frame-options',
  'SAMEORIGIN',
  'content-length',
  '0',
  'x-ms-request-id',
  '1b87dc64-628f-11ec-a30a-000d3afc9092',
  'strict-transport-security',
  'max-age=31536000; includeSubDomains',
  'content-security-policy',
  "default-src 'self'",
  'cache-control',
  'no-cache'
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
  '1e21b55c-7f9e-4867-a48e-6b1e84963900',
  'x-ms-ests-server',
  '2.1.12261.17 - NCUS ProdSlices',
  'Set-Cookie',
  'fpc=AnZYiAdGDidBjR0GA1n6CBE; expires=Thu, 20-Jan-2022 18:52:12 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrMRiJa0573PT67Ubl0K1LR3DxbtgHNw-ZRQ0qRABxsaWMuCAlYE_9-p7UT3kjvPFkOsh6ybTQlg6XcgJAniTyu61YjBVQEn2nN7He4YYz6WmJBDzThDzFl5kDJhlsuGHSf6JwFpPW1zDG3_ADPUwjmQurlPK-43rwyyi3ip1KJ4kgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 21 Dec 2021 18:52:11 GMT',
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
  '6ca6f2b6-df5a-49b5-a022-35e6cc4e3e00',
  'x-ms-ests-server',
  '2.1.12261.17 - SCUS ProdSlices',
  'Set-Cookie',
  'fpc=Asmf8V3rW8hDkmy6MYUIzFs; expires=Thu, 20-Jan-2022 18:52:12 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrQVeud2OVmjqirUvn5JXG7RHLYUc44yo1-AUmWjx9sXUq-bTfZu3Uy9IBShAhRy89VjLM_kOsBCpxSu0MtY0xGmWdP9NN1J78OEayT3kRsVruEF6fQaE9kStObK1nBTiiR45340e-ePepVxRfZnG8oADoF65s39KPH0Rpa9v9jD8gAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 21 Dec 2021 18:52:11 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/12345678-1234-1234-1234-123456789012/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.4.0&x-client-OS=linux&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=b2275276-acbb-49c0-ad42-868a6e40485a&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22cp1%22%5D%7D%7D%7D")
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
  '6ca6f2b6-df5a-49b5-a022-35e6cf4e3e00',
  'x-ms-ests-server',
  '2.1.12261.17 - SCUS ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=AkNkz_B8M9tOm3ucf3jXeJBe2YyLAQAAAFsZVNkOAAAA; expires=Thu, 20-Jan-2022 18:52:12 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 21 Dec 2021 18:52:11 GMT',
  'Content-Length',
  '1322'
]);

nock('https://azure_managedhsm.managedhsm.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/exportablenopolicy164011273334301887/create', {"kty":"RSA","attributes":{"exportable":true}})
  .query(true)
  .reply(400, {"error":{"code":"BadParameter","message":"Exportable keys must have release policy (Activity ID: 1bc634fa-628f-11ec-a30a-000d3afc9092)"}}, [
  'content-type',
  'application/json; charset=utf-8',
  'x-ms-server-latency',
  '15',
  'cache-control',
  'no-cache',
  'x-content-type-options',
  'nosniff',
  'content-length',
  '138',
  'x-ms-request-id',
  '1bc634fa-628f-11ec-a30a-000d3afc9092',
  'strict-transport-security',
  'max-age=31536000; includeSubDomains',
  'content-security-policy',
  "default-src 'self'",
  'x-frame-options',
  'SAMEORIGIN'
]);

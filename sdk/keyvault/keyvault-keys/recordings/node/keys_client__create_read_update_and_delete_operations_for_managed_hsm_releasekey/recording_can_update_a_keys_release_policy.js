let nock = require('nock');

module.exports.hash = "8a9c3a69685c3c7e7626f872e59121f9";

module.exports.testInfo = {"uniqueName":{"exportkey":"exportkey164011273183000841"},"newDate":{}}

nock('https://skr_attestation.azure.net:443', {"encodedQueryParams":true})
  .get('//generate-test-token')
  .reply(200, {"token":"eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjNfT1drYTlNcEpTeFM0NHZBbXRSRHNKelFkeFJPNkxfQkF5VHNXUVhEeUUiLCJqa3UiOiJodHRwczovL21hbGVnZXNrcmt2c2l0ZS5henVyZXdlYnNpdGVzLm5ldC9rZXlzIn0.eyJpc3MiOiJodHRwczovL21hbGVnZXNrcmt2c2l0ZS5henVyZXdlYnNpdGVzLm5ldC8iLCJzZGstdGVzdCI6dHJ1ZSwieC1tcy1pbml0dGltZSI6e30sIngtbXMtcnVudGltZSI6eyJrZXlzIjpbeyJrdHkiOiJSU0EiLCJraWQiOiJmYWtlLXJlbGVhc2Uta2V5IiwidXNlIjoiZW5jIiwiZSI6IkFRQUIiLCJuIjoieGFjQ09wckF3MUhCbDVrYUozSy1jbmRSdnpDbEFyZTlaLVRxSC12dmM1bmpmQUc2VXRQdll6c0h2MUQ1cmxLckx6QjdrRE8xckZOS2s4TEhGTnVUT2pvM1lxaThZR096REE5ckNCdWxFS0lMVjFNOTlyaUJkbVcycllwQ2dsUVA0eDZYdENObTRibWlvMGlOOVVyNmk5dFdHTGh4YzZMSmxocDF2SS1hUEhuVkFqWVZ0RmRtblc4S2I3U3BXVEM1SnRCak11RnUwX0hfWE1EaUJtQzVJVHBsdm91blBTbURRajNaNm5UN09JWXFhUUI4b3JXd3FYYi1rcjF5aGlEOHl4UlY2M3V3WHo1WlRXRDBwZzFaM0ZnVFpWbFAwNklNcGs2VDhFd3ZydW9abkgxOXZWYk8zQlF4X1J1d09CNEpMVkZNclppVGVWZFB4TDdZb1pwUEZ3In1dfSwibWFhLWVoZCI6InNkay10ZXN0IiwiaWF0IjoxNjQwMTEyNzMwLCJleHAiOjE2NDA3MTc1MzB9.pKa_0OPNWMYuTo83o9kQKcDEECMX8CEZM1UecqTKa---mztrLyMOjanXSSLCLJQ9-ke9jBP4vtWrqYH5lWkFg5bseQT1CK7eJ2qFR4a_sK-Kyb8V8UBUlDo2bdnkuDHA35FPzRgdNUCiFr5oe_30Mr1CVvHf7oF6GXTIx5c4yylM1iDiKwIuzRXhPhwrTUt8yrOSAJh1U0ffO8MYtiHhk-GT1ZuthRD_8RWQf3Jkj9UPWmlnAyqq17ft3LwVbrEZFUBtxzhg6IwveO-_FLC_dRwibZE5Uc9KYgwlqzuGCt6dxapEXKny2ZBdhq7F1CWi3ZFSHZX5bBl4BmfaLgFhng"}, [
  'Content-Length',
  '1307',
  'Content-Type',
  'application/json; charset=utf-8',
  'ETag',
  'W/"51b-CywVGl9AiRg2sczNGJD3xpDI1KQ"',
  'X-Powered-By',
  'Express',
  'Set-Cookie',
  'ARRAffinity=c6a88b48c7c8f7eb36b815faecc076b5af62a303dfe264125f83c50a4458b7aa;Path=/;HttpOnly;Secure;Domain=skr_attestation.azure.net',
  'Set-Cookie',
  'ARRAffinitySameSite=c6a88b48c7c8f7eb36b815faecc076b5af62a303dfe264125f83c50a4458b7aa;Path=/;HttpOnly;SameSite=None;Secure;Domain=skr_attestation.azure.net',
  'Date',
  'Tue, 21 Dec 2021 18:52:10 GMT',
  'Connection',
  'close'
]);

nock('https://azure_managedhsm.managedhsm.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/exportkey164011273183000841/create')
  .query(true)
  .reply(401, "", [
  'content-type',
  'application/json; charset=utf-8',
  'x-ms-server-latency',
  '0',
  'x-content-type-options',
  'nosniff',
  'www-authenticate',
  'Bearer authorization="https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012", resource="https://managedhsm.azure.net"',
  'x-frame-options',
  'SAMEORIGIN',
  'content-length',
  '0',
  'x-ms-request-id',
  '1aa1ee2a-628f-11ec-a30a-000d3afc9092',
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
  '6608bb61-04ad-4d43-acb1-be1b13853e00',
  'x-ms-ests-server',
  '2.1.12261.17 - WUS2 ProdSlices',
  'Set-Cookie',
  'fpc=Amss_FtbXtxOmLzxrBVYVkw; expires=Thu, 20-Jan-2022 18:52:10 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrgdxzvDlc4MQ3A9GAQLk7yoo8x8usYrwQXWIO3utIIVh8MhdNfxjFmUWBNnZApPC3mO0BOK2yqlkH4oAE2NMtPtn3K8NJXy-BHPVEmp0uS2bd8RqWvjYQ14Mo9KTHzzvwMrDaSBVHIeN5vElv9LkSjd_UTf3-wMctbCLVMjXf7RUgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 21 Dec 2021 18:52:10 GMT',
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
  'a0d442e6-06da-428c-87d4-ff7755595200',
  'x-ms-ests-server',
  '2.1.12261.17 - WUS2 ProdSlices',
  'Set-Cookie',
  'fpc=Amk0ZRuRZhVGm8I6udHUSgU; expires=Thu, 20-Jan-2022 18:52:11 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevrh1vOlHnokx6jwWKAagqbamGgN7-pCoVvTyrTLK-d5KsrRUhWRp9UfqFjxwMaSZJDwegiZV-6ykUdRzJ-XziNB6gIKiPhsBlwheVXyaLhGy_rNOfdgplt8ayYGvbEyEzRi2D6I27fopbqcVnay6jnDimqQVUDkKMBdfKgMogkrZ0gAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 21 Dec 2021 18:52:10 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/12345678-1234-1234-1234-123456789012/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.4.0&x-client-OS=linux&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=a6c42a0a-6cff-4dd7-a81f-1c6b4071486a&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22cp1%22%5D%7D%7D%7D")
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
  'c6498eae-193d-47ea-bd25-3712b27e1c00',
  'x-ms-ests-server',
  '2.1.12261.17 - NCUS ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=Au5YeKLgghJFnkq804ao-cY; expires=Thu, 20-Jan-2022 18:52:11 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 21 Dec 2021 18:52:10 GMT',
  'Content-Length',
  '1322'
]);

nock('https://azure_managedhsm.managedhsm.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/exportkey164011273183000841/create', {"kty":"RSA","key_ops":["encrypt","decrypt"],"attributes":{"exportable":true},"release_policy":{"data":"eyJhbnlPZiI6W3siYWxsT2YiOlt7ImNsYWltIjoic2RrLXRlc3QiLCJlcXVhbHMiOiJ0cnVlIn1dLCJhdXRob3JpdHkiOiJodHRwczovL3Nrcl9hdHRlc3RhdGlvbi5henVyZS5uZXQvIn1dLCJ2ZXJzaW9uIjoiMS4wIn0"}})
  .query(true)
  .reply(200, {"attributes":{"created":1640112731,"enabled":true,"exportable":true,"recoverableDays":7,"recoveryLevel":"CustomizedRecoverable+Purgeable","updated":1640112731},"key":{"e":"AQAB","key_ops":["encrypt","decrypt"],"kid":"https://azure_managedhsm.managedhsm.azure.net/keys/exportkey164011273183000841/f90eeb93abe545b33d4cb6c7620917ff","kty":"RSA-HSM","n":"khKMM4fzOED8IvydyDirg5yO7jrf-P2QWaTNglMA4d5z2Q3pAZyZjP4BZeFVtBteQ_BDcI2Iv3dY7VX0AeWcfZjQ3Xz2mXoCb7nRqnLXbMwSQSwaEEcOg4wpxOrG6qy-LJvi4_vzOjhuaIQATn1vrwEsQk6rz9pVGy4R_aI5lFJUp5N-vQOkfYShMGvrsXLg3YMnFMD4W0HpcjMqLogMl8HPpEdLEdW38t_mMsrS5w6h1q4xi-r3GQiF0PzP6ves185D7nhUf3KQEl-RG9dTdGtLb3CJv2ZU54LPSEI210VRvzziXocM3aK38d1YPw4MwaQwRE1aMOrfs_NkHLauKw"},"release_policy":{"contentType":"application/json; charset=utf-8","data":"eyJhbnlPZiI6W3siYWxsT2YiOlt7ImNsYWltIjoic2RrLXRlc3QiLCJlcXVhbHMiOiJ0cnVlIn1dLCJhdXRob3JpdHkiOiJodHRwczovL3Nrcl9hdHRlc3RhdGlvbi5henVyZS5uZXQvIn1dLCJ2ZXJzaW9uIjoiMS4wLjAifQ"}}, [
  'content-type',
  'application/json; charset=utf-8',
  'x-content-type-options',
  'nosniff',
  'content-length',
  '952',
  'x-ms-request-id',
  '1ae9df50-628f-11ec-a30a-000d3afc9092',
  'x-ms-keyvault-region',
  'westus2',
  'strict-transport-security',
  'max-age=31536000; includeSubDomains',
  'content-security-policy',
  "default-src 'self'",
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.229.43;act_addr_fam=Ipv4;',
  'x-ms-server-latency',
  '423',
  'cache-control',
  'no-cache',
  'x-frame-options',
  'SAMEORIGIN'
]);

nock('https://azure_managedhsm.managedhsm.azure.net:443', {"encodedQueryParams":true})
  .patch('/keys/exportkey164011273183000841/', {"attributes":{},"release_policy":{"data":"eyJhbnlPZiI6W3siYW55T2YiOlt7ImNsYWltIjoic2RrLXRlc3QiLCJlcXVhbHMiOiJmYWxzZSJ9XSwiYXV0aG9yaXR5IjoiaHR0cHM6Ly9za3JfYXR0ZXN0YXRpb24uYXp1cmUubmV0LyJ9XSwidmVyc2lvbiI6IjEuMCJ9"}})
  .query(true)
  .reply(200, {"attributes":{"created":1640112731,"enabled":true,"exportable":true,"recoverableDays":7,"recoveryLevel":"CustomizedRecoverable+Purgeable","updated":1640112731},"key":{"e":"AQAB","key_ops":["decrypt","encrypt"],"kid":"https://azure_managedhsm.managedhsm.azure.net/keys/exportkey164011273183000841/f90eeb93abe545b33d4cb6c7620917ff","kty":"RSA-HSM","n":"khKMM4fzOED8IvydyDirg5yO7jrf-P2QWaTNglMA4d5z2Q3pAZyZjP4BZeFVtBteQ_BDcI2Iv3dY7VX0AeWcfZjQ3Xz2mXoCb7nRqnLXbMwSQSwaEEcOg4wpxOrG6qy-LJvi4_vzOjhuaIQATn1vrwEsQk6rz9pVGy4R_aI5lFJUp5N-vQOkfYShMGvrsXLg3YMnFMD4W0HpcjMqLogMl8HPpEdLEdW38t_mMsrS5w6h1q4xi-r3GQiF0PzP6ves185D7nhUf3KQEl-RG9dTdGtLb3CJv2ZU54LPSEI210VRvzziXocM3aK38d1YPw4MwaQwRE1aMOrfs_NkHLauKw"},"release_policy":{"contentType":"application/json; charset=utf-8","data":"eyJhbnlPZiI6W3siYW55T2YiOlt7ImNsYWltIjoic2RrLXRlc3QiLCJlcXVhbHMiOiJmYWxzZSJ9XSwiYXV0aG9yaXR5IjoiaHR0cHM6Ly9za3JfYXR0ZXN0YXRpb24uYXp1cmUubmV0LyJ9XSwidmVyc2lvbiI6IjEuMC4wIn0"}}, [
  'content-type',
  'application/json; charset=utf-8',
  'x-content-type-options',
  'nosniff',
  'content-length',
  '954',
  'x-ms-request-id',
  '1b2c7e50-628f-11ec-a30a-000d3afc9092',
  'x-ms-keyvault-region',
  'westus2',
  'strict-transport-security',
  'max-age=31536000; includeSubDomains',
  'content-security-policy',
  "default-src 'self'",
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.229.43;act_addr_fam=Ipv4;',
  'x-ms-server-latency',
  '339',
  'cache-control',
  'no-cache',
  'x-frame-options',
  'SAMEORIGIN'
]);

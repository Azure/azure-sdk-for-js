let nock = require('nock');

module.exports.hash = "abafd4100dcf3b9434f8eff07d7b54f8";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/lroRecoverDeleteKeyName-canwaituntilakeyisrecovered-/create')
  .query(true)
  .reply(401, {"error":{"code":"Unauthorized","message":"Request is missing a Bearer or PoP token."}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '87',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'WWW-Authenticate',
  'Bearer authorization="https://login.windows.net/azure_tenant_id", resource="https://vault.azure.net"',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  'bbf6eb87-0c38-49da-a3f5-146d4d56695c',
  'x-ms-request-id',
  '6c5635cf-f443-4b2e-be00-d9d4757faf69',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=72.68.182.20;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:55:48 GMT'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .get('/common/discovery/instance')
  .query(true)
  .reply(200, {"tenant_discovery_endpoint":"https://login.microsoftonline.com/azure_tenant_id/v2.0/.well-known/openid-configuration","api-version":"1.1","metadata":[{"preferred_network":"login.microsoftonline.com","preferred_cache":"login.windows.net","aliases":["login.microsoftonline.com","login.windows.net","login.microsoft.com","sts.windows.net"]},{"preferred_network":"login.partner.microsoftonline.cn","preferred_cache":"login.partner.microsoftonline.cn","aliases":["login.partner.microsoftonline.cn","login.chinacloudapi.cn"]},{"preferred_network":"login.microsoftonline.de","preferred_cache":"login.microsoftonline.de","aliases":["login.microsoftonline.de"]},{"preferred_network":"login.microsoftonline.us","preferred_cache":"login.microsoftonline.us","aliases":["login.microsoftonline.us","login.usgovcloudapi.net"]},{"preferred_network":"login-us.microsoftonline.com","preferred_cache":"login-us.microsoftonline.com","aliases":["login-us.microsoftonline.com"]}]}, [
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
  '766a99d4-b5b0-4a7e-9bef-ce7805d9be01',
  'x-ms-ests-server',
  '2.1.11654.16 - EUS ProdSlices',
  'Set-Cookie',
  'fpc=AhaQWKq9CYtBrP8niBgsLC-nSoKIBwAAAF6_G9gOAAAA4BL6UxEAAAC_wRvYDgAAAA; expires=Fri, 28-May-2021 20:55:49 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrFn0muUr75WRb2KHIc8NVnO-jbd37wTyADUvEoQrJhGLHL8XnuqsOeGheMHYXO0eR-Ym5QKyCeneByQR-WkagqjX2cHJQh-BSoh_8B-W-9JYypLpkbH19LtGbDp_65cGZNzunesXymacDfGQKJmTZVc6zJ9SIRUF1JcGkbXHpgYQgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 28 Apr 2021 20:55:49 GMT',
  'Content-Length',
  '980'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .get('/azure_tenant_id/v2.0/.well-known/openid-configuration')
  .reply(200, {"token_endpoint":"https://login.microsoftonline.com/azure_tenant_id/oauth2/v2.0/token","token_endpoint_auth_methods_supported":["client_secret_post","private_key_jwt","client_secret_basic"],"jwks_uri":"https://login.microsoftonline.com/azure_tenant_id/discovery/v2.0/keys","response_modes_supported":["query","fragment","form_post"],"subject_types_supported":["pairwise"],"id_token_signing_alg_values_supported":["RS256"],"response_types_supported":["code","id_token","code id_token","id_token token"],"scopes_supported":["openid","profile","email","offline_access"],"issuer":"https://login.microsoftonline.com/azure_tenant_id/v2.0","request_uri_parameter_supported":false,"userinfo_endpoint":"https://graph.microsoft.com/oidc/userinfo","authorization_endpoint":"https://login.microsoftonline.com/azure_tenant_id/oauth2/v2.0/authorize","device_authorization_endpoint":"https://login.microsoftonline.com/azure_tenant_id/oauth2/v2.0/devicecode","http_logout_supported":true,"frontchannel_logout_supported":true,"end_session_endpoint":"https://login.microsoftonline.com/azure_tenant_id/oauth2/v2.0/logout","claims_supported":["sub","iss","cloud_instance_name","cloud_instance_host_name","cloud_graph_host_name","msgraph_host","aud","exp","iat","auth_time","acr","nonce","preferred_username","name","tid","ver","at_hash","c_hash","email"],"tenant_region_scope":"WW","cloud_instance_name":"microsoftonline.com","cloud_graph_host_name":"graph.windows.net","msgraph_host":"graph.microsoft.com","rbac_url":"https://pas.windows.net"}, [
  'Cache-Control',
  'max-age=86400, private',
  'Content-Length',
  '1651',
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
  'd85b3d8a-8fe6-4af0-825f-449641ad4400',
  'x-ms-ests-server',
  '2.1.11654.16 - WUS2 ProdSlices',
  'Set-Cookie',
  'fpc=AhaQWKq9CYtBrP8niBgsLC-nSoKIBwAAAF6_G9gOAAAA4BL6UxEAAAC_wRvYDgAAAA; expires=Fri, 28-May-2021 20:55:49 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrHTCbRnktdmZ4Mcjxsj_cMCyfKpMrToI93xCe5fHAIn5GHPLzkKQbM7mN0V4ofn0qv4M2o_Ptl7o_auLzCfI7Tsybfv0zmwd2AhZxEDWREiQnhbOW6b0lkAy1xdrwA4yiixwzjOdEFpbHuAVux5kmdDm3q9YlBbbACUr80J8SgcsgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 28 Apr 2021 20:55:49 GMT'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .filteringRequestBody(function (body) {
            return body.replace(/client-request-id=[^&]*/g, "client-request-id=client-request-id");
        })
  .post('/azure_tenant_id/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fvault.azure.net%2F.default%20openid%20profile%20offline_access&grant_type=client_credentials&client-request-id=client-request-id&client_secret=azure_client_secret")
  .reply(200, {"token_type":"Bearer","expires_in":86398,"ext_expires_in":86398,"access_token":"access_token"}, [
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
  '19a8b5fa-57b0-41c8-91bf-83f5459f3901',
  'x-ms-ests-server',
  '2.1.11654.16 - SCUS ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=AhaQWKq9CYtBrP8niBgsLC-nSoKIBwAAAF6_G9gOAAAA4BL6UxEAAAC_wRvYDgAAAA; expires=Fri, 28-May-2021 20:55:50 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 28 Apr 2021 20:55:49 GMT',
  'Content-Length',
  '1310'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/lroRecoverDeleteKeyName-canwaituntilakeyisrecovered-/create', {"kty":"RSA"})
  .query(true)
  .reply(200, {"key":{"kid":"https://keyvault_name.vault.azure.net/keys/lroRecoverDeleteKeyName-canwaituntilakeyisrecovered-/1903005ab8914fcb871327af319f8420","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"xEUTmQSoXfzBC0fQnKrO8ytpKk_Ffpo5ROnbH8KinO14qzyYGrzOjieIwsLwpqN32EjjL1538_rbxSWI9AyxwpSbuQ3O8J_-btwE4ZG0y6WwPpj6zbWPHFb2fVszpYnj_8HH6Wmikgn4frlHDoig0_ZeaGmibq4_VIOWdLl0yjG9tAU63W7a-bw8LYFuOcnmKIS7PMmhO40FIwFcVgi_4pZOwzhWiJme0ge_qHFWPS5wDvJR7SOmjtg3ng_kYV6H2G3Yq82FUOevowFbpXkF_T3tGVP4Th13JM4dp7HUgztLyfTYy9VZjKL1h7HbABKfUPeWgZTPmTSMwQYHdDLF8Q","e":"AQAB"},"attributes":{"enabled":true,"created":1619643350,"updated":1619643350,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7}}, [
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
  'bbf6eb87-0c38-49da-a3f5-146d4d56695c',
  'x-ms-request-id',
  'f35febb6-adb2-42f7-9b17-0b356b2493ba',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=72.68.182.20;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:55:50 GMT',
  'Content-Length',
  '743'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/keys/lroRecoverDeleteKeyName-canwaituntilakeyisrecovered-')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/lroRecoverDeleteKeyName-canwaituntilakeyisrecovered-","deletedDate":1619643350,"scheduledPurgeDate":1620248150,"key":{"kid":"https://keyvault_name.vault.azure.net/keys/lroRecoverDeleteKeyName-canwaituntilakeyisrecovered-/1903005ab8914fcb871327af319f8420","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"xEUTmQSoXfzBC0fQnKrO8ytpKk_Ffpo5ROnbH8KinO14qzyYGrzOjieIwsLwpqN32EjjL1538_rbxSWI9AyxwpSbuQ3O8J_-btwE4ZG0y6WwPpj6zbWPHFb2fVszpYnj_8HH6Wmikgn4frlHDoig0_ZeaGmibq4_VIOWdLl0yjG9tAU63W7a-bw8LYFuOcnmKIS7PMmhO40FIwFcVgi_4pZOwzhWiJme0ge_qHFWPS5wDvJR7SOmjtg3ng_kYV6H2G3Yq82FUOevowFbpXkF_T3tGVP4Th13JM4dp7HUgztLyfTYy9VZjKL1h7HbABKfUPeWgZTPmTSMwQYHdDLF8Q","e":"AQAB"},"attributes":{"enabled":true,"created":1619643350,"updated":1619643350,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7}}, [
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
  'f0a6a85c-9fbc-4045-9e61-526b1c1f076e',
  'x-ms-request-id',
  'e04d9d48-3956-43e6-97d4-d5e055038ade',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=72.68.182.20;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:55:49 GMT',
  'Content-Length',
  '931'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/lroRecoverDeleteKeyName-canwaituntilakeyisrecovered-')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: lroRecoverDeleteKeyName-canwaituntilakeyisrecovered-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '136',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  '2ec763a7-b46f-4e0f-916c-0994999adcc0',
  'x-ms-request-id',
  '5180bd8a-733e-47b5-8c0e-b6d7ff46f702',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=72.68.182.20;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:55:50 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/lroRecoverDeleteKeyName-canwaituntilakeyisrecovered-')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: lroRecoverDeleteKeyName-canwaituntilakeyisrecovered-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '136',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  'ca90fe6c-48c2-4115-95e4-fb1f7b0505f1',
  'x-ms-request-id',
  '976ca58a-b453-4fb4-b54e-bfc66fcd8d28',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=72.68.182.20;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:55:49 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/lroRecoverDeleteKeyName-canwaituntilakeyisrecovered-')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: lroRecoverDeleteKeyName-canwaituntilakeyisrecovered-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '136',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  'bdbbb777-463f-46fa-91db-35e897750ae2',
  'x-ms-request-id',
  '992de593-9c02-422c-9e7c-486663e4440f',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=72.68.182.20;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:55:52 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/lroRecoverDeleteKeyName-canwaituntilakeyisrecovered-')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: lroRecoverDeleteKeyName-canwaituntilakeyisrecovered-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '136',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  '8ceb638f-c752-4c9a-830d-16721b680446',
  'x-ms-request-id',
  'fd2cb81e-da24-45b8-8d1b-4cc512cde1b3',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=72.68.182.20;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:55:54 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/lroRecoverDeleteKeyName-canwaituntilakeyisrecovered-')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: lroRecoverDeleteKeyName-canwaituntilakeyisrecovered-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '136',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  '89ac31d2-8aea-43f8-bdef-5272f697718f',
  'x-ms-request-id',
  'e3c3c266-e855-4f6b-8b5d-673a8e8ee56c',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=72.68.182.20;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:55:56 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/lroRecoverDeleteKeyName-canwaituntilakeyisrecovered-')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: lroRecoverDeleteKeyName-canwaituntilakeyisrecovered-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '136',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  '292935c3-cd43-4bdb-bc37-a5874d0d0bc2',
  'x-ms-request-id',
  '7f6c2cf5-9b4f-46f5-8e24-18c40862eeaf',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=72.68.182.20;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:55:58 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/lroRecoverDeleteKeyName-canwaituntilakeyisrecovered-')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/lroRecoverDeleteKeyName-canwaituntilakeyisrecovered-","deletedDate":1619643350,"scheduledPurgeDate":1620248150,"key":{"kid":"https://keyvault_name.vault.azure.net/keys/lroRecoverDeleteKeyName-canwaituntilakeyisrecovered-/1903005ab8914fcb871327af319f8420","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"xEUTmQSoXfzBC0fQnKrO8ytpKk_Ffpo5ROnbH8KinO14qzyYGrzOjieIwsLwpqN32EjjL1538_rbxSWI9AyxwpSbuQ3O8J_-btwE4ZG0y6WwPpj6zbWPHFb2fVszpYnj_8HH6Wmikgn4frlHDoig0_ZeaGmibq4_VIOWdLl0yjG9tAU63W7a-bw8LYFuOcnmKIS7PMmhO40FIwFcVgi_4pZOwzhWiJme0ge_qHFWPS5wDvJR7SOmjtg3ng_kYV6H2G3Yq82FUOevowFbpXkF_T3tGVP4Th13JM4dp7HUgztLyfTYy9VZjKL1h7HbABKfUPeWgZTPmTSMwQYHdDLF8Q","e":"AQAB"},"attributes":{"enabled":true,"created":1619643350,"updated":1619643350,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7}}, [
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
  '71cc073b-1275-4270-821f-15613eed0415',
  'x-ms-request-id',
  '751075d8-17b2-4dd6-8778-087c0d353ecd',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=72.68.182.20;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:56:00 GMT',
  'Content-Length',
  '931'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/keys/lroRecoverDeleteKeyName-canwaituntilakeyisrecovered-/')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"A key with (name/id) lroRecoverDeleteKeyName-canwaituntilakeyisrecovered- was not found in this key vault. If you recently deleted this key you may be able to recover it using the correct recovery command. For help resolving this issue, please see https://go.microsoft.com/fwlink/?linkid=2125182"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '356',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  '9eac3c9f-d7cb-4d52-9b33-7995ded6cdbc',
  'x-ms-request-id',
  '332eac85-ba25-4001-8b07-535f54de25a3',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=72.68.182.20;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:56:00 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/deletedkeys/lroRecoverDeleteKeyName-canwaituntilakeyisrecovered-/recover')
  .query(true)
  .reply(200, {"key":{"kid":"https://keyvault_name.vault.azure.net/keys/lroRecoverDeleteKeyName-canwaituntilakeyisrecovered-/1903005ab8914fcb871327af319f8420","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"xEUTmQSoXfzBC0fQnKrO8ytpKk_Ffpo5ROnbH8KinO14qzyYGrzOjieIwsLwpqN32EjjL1538_rbxSWI9AyxwpSbuQ3O8J_-btwE4ZG0y6WwPpj6zbWPHFb2fVszpYnj_8HH6Wmikgn4frlHDoig0_ZeaGmibq4_VIOWdLl0yjG9tAU63W7a-bw8LYFuOcnmKIS7PMmhO40FIwFcVgi_4pZOwzhWiJme0ge_qHFWPS5wDvJR7SOmjtg3ng_kYV6H2G3Yq82FUOevowFbpXkF_T3tGVP4Th13JM4dp7HUgztLyfTYy9VZjKL1h7HbABKfUPeWgZTPmTSMwQYHdDLF8Q","e":"AQAB"},"attributes":{"enabled":true,"created":1619643350,"updated":1619643350,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7}}, [
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
  '8d327caf-b8de-4bba-b3b6-37ab179e3e5f',
  'x-ms-request-id',
  '37c57c4f-27dc-4f1d-80c3-1584655b443e',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=72.68.182.20;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:56:00 GMT',
  'Content-Length',
  '743'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/keys/lroRecoverDeleteKeyName-canwaituntilakeyisrecovered-/')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"A key with (name/id) lroRecoverDeleteKeyName-canwaituntilakeyisrecovered- was not found in this key vault. If you recently deleted this key you may be able to recover it using the correct recovery command. For help resolving this issue, please see https://go.microsoft.com/fwlink/?linkid=2125182"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '356',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  '124cf856-1807-4b60-b8c1-093678515c7b',
  'x-ms-request-id',
  'ac01b4da-7b61-4f10-9abe-b88688176db7',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=72.68.182.20;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:56:01 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/keys/lroRecoverDeleteKeyName-canwaituntilakeyisrecovered-/')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"A key with (name/id) lroRecoverDeleteKeyName-canwaituntilakeyisrecovered- was not found in this key vault. If you recently deleted this key you may be able to recover it using the correct recovery command. For help resolving this issue, please see https://go.microsoft.com/fwlink/?linkid=2125182"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '356',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  '4bed3cfd-c454-4eef-b8cd-c44300345dc1',
  'x-ms-request-id',
  '6f9cd0a6-2fd0-4042-80b8-25d91cfd1432',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=72.68.182.20;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:56:01 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/keys/lroRecoverDeleteKeyName-canwaituntilakeyisrecovered-/')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"A key with (name/id) lroRecoverDeleteKeyName-canwaituntilakeyisrecovered- was not found in this key vault. If you recently deleted this key you may be able to recover it using the correct recovery command. For help resolving this issue, please see https://go.microsoft.com/fwlink/?linkid=2125182"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '356',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  '66e5a99b-fb9f-47c0-a17a-780fd8551474',
  'x-ms-request-id',
  '46175706-1431-4549-8e10-365ab6e6a1cc',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=72.68.182.20;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:56:03 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/keys/lroRecoverDeleteKeyName-canwaituntilakeyisrecovered-/')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"A key with (name/id) lroRecoverDeleteKeyName-canwaituntilakeyisrecovered- was not found in this key vault. If you recently deleted this key you may be able to recover it using the correct recovery command. For help resolving this issue, please see https://go.microsoft.com/fwlink/?linkid=2125182"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '356',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  'd6456b5b-0afe-4439-ae5e-43780ba75931',
  'x-ms-request-id',
  '300445d1-d0e2-4294-86c3-85c02d1a50b4',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=72.68.182.20;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:56:05 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/keys/lroRecoverDeleteKeyName-canwaituntilakeyisrecovered-/')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"A key with (name/id) lroRecoverDeleteKeyName-canwaituntilakeyisrecovered- was not found in this key vault. If you recently deleted this key you may be able to recover it using the correct recovery command. For help resolving this issue, please see https://go.microsoft.com/fwlink/?linkid=2125182"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '356',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  'ee5a015b-1e28-477a-9bdc-84585cce5489',
  'x-ms-request-id',
  '926e766d-e521-40f7-93e3-93ccb99e2e8a',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=72.68.182.20;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:56:07 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/keys/lroRecoverDeleteKeyName-canwaituntilakeyisrecovered-/')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"A key with (name/id) lroRecoverDeleteKeyName-canwaituntilakeyisrecovered- was not found in this key vault. If you recently deleted this key you may be able to recover it using the correct recovery command. For help resolving this issue, please see https://go.microsoft.com/fwlink/?linkid=2125182"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '356',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  'fe473d34-53a8-45d3-8c66-9f981c01d227',
  'x-ms-request-id',
  '7ea1023d-018a-43a7-89bf-7d9a26720f10',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=72.68.182.20;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:56:09 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/keys/lroRecoverDeleteKeyName-canwaituntilakeyisrecovered-/')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"A key with (name/id) lroRecoverDeleteKeyName-canwaituntilakeyisrecovered- was not found in this key vault. If you recently deleted this key you may be able to recover it using the correct recovery command. For help resolving this issue, please see https://go.microsoft.com/fwlink/?linkid=2125182"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '356',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  'f05e1e41-b292-4e68-ae26-916b074bbb30',
  'x-ms-request-id',
  'e9dccea0-8f82-4fe8-a3a9-7c7d405a5db5',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=72.68.182.20;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:56:11 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/keys/lroRecoverDeleteKeyName-canwaituntilakeyisrecovered-/')
  .query(true)
  .reply(200, {"key":{"kid":"https://keyvault_name.vault.azure.net/keys/lroRecoverDeleteKeyName-canwaituntilakeyisrecovered-/1903005ab8914fcb871327af319f8420","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"xEUTmQSoXfzBC0fQnKrO8ytpKk_Ffpo5ROnbH8KinO14qzyYGrzOjieIwsLwpqN32EjjL1538_rbxSWI9AyxwpSbuQ3O8J_-btwE4ZG0y6WwPpj6zbWPHFb2fVszpYnj_8HH6Wmikgn4frlHDoig0_ZeaGmibq4_VIOWdLl0yjG9tAU63W7a-bw8LYFuOcnmKIS7PMmhO40FIwFcVgi_4pZOwzhWiJme0ge_qHFWPS5wDvJR7SOmjtg3ng_kYV6H2G3Yq82FUOevowFbpXkF_T3tGVP4Th13JM4dp7HUgztLyfTYy9VZjKL1h7HbABKfUPeWgZTPmTSMwQYHdDLF8Q","e":"AQAB"},"attributes":{"enabled":true,"created":1619643350,"updated":1619643350,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7}}, [
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
  '7dddae7b-3e4c-4a9e-b178-b8daab69d6ec',
  'x-ms-request-id',
  '98712ea1-d7f5-412a-a26a-4b79ab61a606',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=72.68.182.20;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:56:13 GMT',
  'Content-Length',
  '743'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/keys/lroRecoverDeleteKeyName-canwaituntilakeyisrecovered-')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/lroRecoverDeleteKeyName-canwaituntilakeyisrecovered-","deletedDate":1619643374,"scheduledPurgeDate":1620248174,"key":{"kid":"https://keyvault_name.vault.azure.net/keys/lroRecoverDeleteKeyName-canwaituntilakeyisrecovered-/1903005ab8914fcb871327af319f8420","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"xEUTmQSoXfzBC0fQnKrO8ytpKk_Ffpo5ROnbH8KinO14qzyYGrzOjieIwsLwpqN32EjjL1538_rbxSWI9AyxwpSbuQ3O8J_-btwE4ZG0y6WwPpj6zbWPHFb2fVszpYnj_8HH6Wmikgn4frlHDoig0_ZeaGmibq4_VIOWdLl0yjG9tAU63W7a-bw8LYFuOcnmKIS7PMmhO40FIwFcVgi_4pZOwzhWiJme0ge_qHFWPS5wDvJR7SOmjtg3ng_kYV6H2G3Yq82FUOevowFbpXkF_T3tGVP4Th13JM4dp7HUgztLyfTYy9VZjKL1h7HbABKfUPeWgZTPmTSMwQYHdDLF8Q","e":"AQAB"},"attributes":{"enabled":true,"created":1619643350,"updated":1619643350,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7}}, [
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
  'bb5a507e-3e98-4312-9cbe-f9163f815ddc',
  'x-ms-request-id',
  'a1d72e7a-0e27-4392-acf8-c8f5b9f97520',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=72.68.182.20;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:56:13 GMT',
  'Content-Length',
  '931'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/lroRecoverDeleteKeyName-canwaituntilakeyisrecovered-')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: lroRecoverDeleteKeyName-canwaituntilakeyisrecovered-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '136',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  'bd196aa1-a415-4da0-bca9-80d90552dae4',
  'x-ms-request-id',
  '127247e2-a281-4b0d-9d1c-9504c4ee21f4',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=72.68.182.20;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:56:13 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/lroRecoverDeleteKeyName-canwaituntilakeyisrecovered-')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: lroRecoverDeleteKeyName-canwaituntilakeyisrecovered-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '136',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  '5e491dee-52a9-479d-9f35-fe45456a9fb4',
  'x-ms-request-id',
  '264a078b-b457-4f45-9561-9679aac197fd',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=72.68.182.20;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:56:13 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/lroRecoverDeleteKeyName-canwaituntilakeyisrecovered-')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: lroRecoverDeleteKeyName-canwaituntilakeyisrecovered-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '136',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  '6bfee266-0ac1-4ace-92b8-b48cfa323b9f',
  'x-ms-request-id',
  '0c1066ed-f428-4eda-a358-7f4b34a075c1',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=72.68.182.20;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:56:16 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/lroRecoverDeleteKeyName-canwaituntilakeyisrecovered-')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: lroRecoverDeleteKeyName-canwaituntilakeyisrecovered-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '136',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  'e340d790-ce94-479d-8b5b-de05f7a3de1c',
  'x-ms-request-id',
  '330e4001-f112-45ea-be65-872c7e04b2d7',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=72.68.182.20;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:56:18 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/lroRecoverDeleteKeyName-canwaituntilakeyisrecovered-')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: lroRecoverDeleteKeyName-canwaituntilakeyisrecovered-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '136',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  'bab03eaa-e9c8-40b8-aef8-63b9961e2ea7',
  'x-ms-request-id',
  'eb1184bf-7283-4d4d-b193-3dc7cf81a16f',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=72.68.182.20;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:56:21 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/lroRecoverDeleteKeyName-canwaituntilakeyisrecovered-')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: lroRecoverDeleteKeyName-canwaituntilakeyisrecovered-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '136',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  'a83869b5-a01f-4b28-b2dd-397efe2c0d5d',
  'x-ms-request-id',
  '4f322e17-e43a-494e-80ef-90aff83aff74',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=72.68.182.20;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:56:22 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/lroRecoverDeleteKeyName-canwaituntilakeyisrecovered-')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/lroRecoverDeleteKeyName-canwaituntilakeyisrecovered-","deletedDate":1619643374,"scheduledPurgeDate":1620248174,"key":{"kid":"https://keyvault_name.vault.azure.net/keys/lroRecoverDeleteKeyName-canwaituntilakeyisrecovered-/1903005ab8914fcb871327af319f8420","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"xEUTmQSoXfzBC0fQnKrO8ytpKk_Ffpo5ROnbH8KinO14qzyYGrzOjieIwsLwpqN32EjjL1538_rbxSWI9AyxwpSbuQ3O8J_-btwE4ZG0y6WwPpj6zbWPHFb2fVszpYnj_8HH6Wmikgn4frlHDoig0_ZeaGmibq4_VIOWdLl0yjG9tAU63W7a-bw8LYFuOcnmKIS7PMmhO40FIwFcVgi_4pZOwzhWiJme0ge_qHFWPS5wDvJR7SOmjtg3ng_kYV6H2G3Yq82FUOevowFbpXkF_T3tGVP4Th13JM4dp7HUgztLyfTYy9VZjKL1h7HbABKfUPeWgZTPmTSMwQYHdDLF8Q","e":"AQAB"},"attributes":{"enabled":true,"created":1619643350,"updated":1619643350,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7}}, [
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
  'fa82c727-861e-4024-be28-e5b1dc8aeace',
  'x-ms-request-id',
  'f5e7fd32-867b-47d2-a8a0-bb36b21658bf',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=72.68.182.20;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:56:25 GMT',
  'Content-Length',
  '931'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedkeys/lroRecoverDeleteKeyName-canwaituntilakeyisrecovered-')
  .query(true)
  .reply(204, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  'f0534f90-5171-4b10-a6b5-66b71525437a',
  'x-ms-request-id',
  '55e6725a-c58a-4752-9509-84924b31e96f',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=72.68.182.20;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:56:24 GMT'
]);

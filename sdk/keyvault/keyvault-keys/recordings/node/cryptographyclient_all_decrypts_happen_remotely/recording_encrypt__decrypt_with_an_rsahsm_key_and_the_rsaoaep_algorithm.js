let nock = require('nock');

module.exports.hash = "fbac2d9a8a08fd426fd30e9677af78c8";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/cryptography-client-test/create')
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
  'eastus',
  'x-ms-request-id',
  '4b58113c-3769-42d2-b137-11c8aa61049d',
  'x-ms-keyvault-service-version',
  '1.1.44.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=13.66.222.112;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 21 Aug 2020 14:06:30 GMT'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fvault.azure.net%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":86399,"ext_expires_in":86399,"access_token":"access_token"}, [
  'Cache-Control',
  'no-store, no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '1315',
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
  '3015f842-971f-4148-87ad-f6fcd48d1a00',
  'x-ms-ests-server',
  '2.1.10963.13 - NCUS ProdSlices',
  'Set-Cookie',
  'fpc=AnTnotKHmsZNgGElGEpf804_aSJHAQAAAOfL0dYOAAAA; expires=Sun, 20-Sep-2020 14:06:31 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 21 Aug 2020 14:06:30 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/cryptography-client-test/create', {"kty":"RSA"})
  .query(true)
  .reply(200, {"key":{"kid":"https://keyvault_name.vault.azure.net/keys/cryptography-client-test/856a521274fb4b66b7e1523a3488883d","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"8OBEuyZnuBSuPTDRGcPVCEqo3dTITQgjRWl_XTQYrcuCtiLunDk3A0guzJJMCRhaE2thoBeS3vcwPuZ1Kf60UP8Kw5u7Tla3_bd75gIVUnez70zQe8TT3xhtRGwIiBwExjyPVAPlDnQgixygA_puVkl2CDCT9NriFi42t9wyqM7bkaZdibNSnEysDAU2E1vnfyTEVLLdQjOJ37aQnOpdXafiehz7yEt99IZ7wnnxNIxmsc8Zesme-snNWsd1OQQ5AcIqzS33atj8n5BCtLVYJ-NnjNayGCxrkFNBGn-739BVCAo2Z0pelQl_HzMnfZrzegEHsPOLqZHgGHjCU74WcQ","e":"AQAB"},"attributes":{"enabled":true,"created":1598018791,"updated":1598018791,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-request-id',
  '19a82db1-9f50-4364-9282-aa3ce6c9426f',
  'x-ms-keyvault-service-version',
  '1.1.44.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=13.66.222.112;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 21 Aug 2020 14:06:31 GMT',
  'Content-Length',
  '716'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/cryptography-client-test2/create', {"kty":"RSA-HSM"})
  .query(true)
  .reply(200, {"key":{"kid":"https://keyvault_name.vault.azure.net/keys/cryptography-client-test2/60022a059e7b4a31b688c449cb04a73d","kty":"RSA-HSM","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"ot04vzeisFcG6DY9fcpEB4vZevrRA_7Y8u3AMXRRfWcIYFUMS4tqQn072KkfCrbbZJT5isSO08i241jAdgJ5CyuL7_mdZykBqD_3DnSLc5xTde0A6UDAXcOkMp1QDWtLWkU0km6NDVEKsOryLB-UgG-LTVziVaYXTjS2yePFp1l2yai-2tAx4tD8rk_639FAPxYM71B7qPhS6wL_5fymPuSur24GkvioxYcWEwUiHZbBna6X_e62MR5G0e3YPURP4SBiBPt_2fYEobrzOYiPFlX5aV3_tphlDFx3g9Jfg3FF91FNPqppQBCXbCdj2RiHxGof2BQhxCanSdHlkl9X9w","e":"AAEAAQ"},"attributes":{"enabled":true,"created":1598018792,"updated":1598018792,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-request-id',
  '5c018040-5bb1-44cd-9199-bf3565ac10ef',
  'x-ms-keyvault-service-version',
  '1.1.44.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=13.66.222.112;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 21 Aug 2020 14:06:32 GMT',
  'Content-Length',
  '723'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/keys/cryptography-client-test2/60022a059e7b4a31b688c449cb04a73d')
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
  'eastus',
  'x-ms-request-id',
  '749db9f1-4f5a-4e78-9525-1efad72fdd8d',
  'x-ms-keyvault-service-version',
  '1.1.44.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=13.66.222.112;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 21 Aug 2020 14:06:32 GMT'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fvault.azure.net%2F.default")
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
  '06a0e23a-acbd-49c4-b8c9-d45a4e141b00',
  'x-ms-ests-server',
  '2.1.10963.13 - EUS ProdSlices',
  'Set-Cookie',
  'fpc=AnTnotKHmsZNgGElGEpf804_aSJHAgAAAOfL0dYOAAAA; expires=Sun, 20-Sep-2020 14:06:33 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 21 Aug 2020 14:06:32 GMT',
  'Content-Length',
  '1315'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/keys/cryptography-client-test2/60022a059e7b4a31b688c449cb04a73d')
  .query(true)
  .reply(200, {"key":{"kid":"https://keyvault_name.vault.azure.net/keys/cryptography-client-test2/60022a059e7b4a31b688c449cb04a73d","kty":"RSA-HSM","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"ot04vzeisFcG6DY9fcpEB4vZevrRA_7Y8u3AMXRRfWcIYFUMS4tqQn072KkfCrbbZJT5isSO08i241jAdgJ5CyuL7_mdZykBqD_3DnSLc5xTde0A6UDAXcOkMp1QDWtLWkU0km6NDVEKsOryLB-UgG-LTVziVaYXTjS2yePFp1l2yai-2tAx4tD8rk_639FAPxYM71B7qPhS6wL_5fymPuSur24GkvioxYcWEwUiHZbBna6X_e62MR5G0e3YPURP4SBiBPt_2fYEobrzOYiPFlX5aV3_tphlDFx3g9Jfg3FF91FNPqppQBCXbCdj2RiHxGof2BQhxCanSdHlkl9X9w","e":"AAEAAQ"},"attributes":{"enabled":true,"created":1598018792,"updated":1598018792,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-request-id',
  '0986658a-a085-440c-8829-a5087bb733bf',
  'x-ms-keyvault-service-version',
  '1.1.44.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=13.66.222.112;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 21 Aug 2020 14:06:33 GMT',
  'Content-Length',
  '723'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/cryptography-client-test2/60022a059e7b4a31b688c449cb04a73d/decrypt', {"alg":"RSA-OAEP","value":"X_sH8RqZpT3dhhfxklkUBX7lNK1jaU0c_JXhLXFC1cjIgPFzPlm7TWGqKKiFM6lHyMbRmZqKeiBJ7GtLGHMqiPLSzfBiBGES5ZLZUy_N1fQ0GrzHf8g00NNujSX9lZeUntk8zu5w5IMYgG5AK_rmtwuTLRZaquRO9xEfw9pEOh6F4ekAialN-DJxXo7RthOM2ry255wAxQbRimcCGv0vB8KQaLOnMrnO25g81G0UOk4ajE0I3Wyqn_spEtRXBeGoKTVVEYjopaonxedyjdcxpeRfL52HE3KnuOOBJvV443Uavz3V6mu3asZUSn0bCHGHTFu20MiObsklzVkYtXGSFw"})
  .query(true)
  .reply(200, {"kid":"https://keyvault_name.vault.azure.net/keys/cryptography-client-test2/60022a059e7b4a31b688c449cb04a73d","value":"ZW5jcnlwdCAmIGRlY3J5cHQgd2l0aCBhbiBSU0EtSFNNIGtleSBhbmQgdGhlIFJTQS1PQUVQIGFsZ29yaXRobQ"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-request-id',
  'f3d69c57-13ed-4c70-9e19-46b7b923ad73',
  'x-ms-keyvault-service-version',
  '1.1.44.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=13.66.222.112;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 21 Aug 2020 14:06:33 GMT',
  'Content-Length',
  '231'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/keys/cryptography-client-test2')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/cryptography-client-test2","deletedDate":1598018793,"scheduledPurgeDate":1605794793,"key":{"kid":"https://keyvault_name.vault.azure.net/keys/cryptography-client-test2/60022a059e7b4a31b688c449cb04a73d","kty":"RSA-HSM","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"ot04vzeisFcG6DY9fcpEB4vZevrRA_7Y8u3AMXRRfWcIYFUMS4tqQn072KkfCrbbZJT5isSO08i241jAdgJ5CyuL7_mdZykBqD_3DnSLc5xTde0A6UDAXcOkMp1QDWtLWkU0km6NDVEKsOryLB-UgG-LTVziVaYXTjS2yePFp1l2yai-2tAx4tD8rk_639FAPxYM71B7qPhS6wL_5fymPuSur24GkvioxYcWEwUiHZbBna6X_e62MR5G0e3YPURP4SBiBPt_2fYEobrzOYiPFlX5aV3_tphlDFx3g9Jfg3FF91FNPqppQBCXbCdj2RiHxGof2BQhxCanSdHlkl9X9w","e":"AAEAAQ"},"attributes":{"enabled":true,"created":1598018792,"updated":1598018792,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-request-id',
  'a609419e-203f-40ab-869b-2385d105b29a',
  'x-ms-keyvault-service-version',
  '1.1.44.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=13.66.222.112;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 21 Aug 2020 14:06:33 GMT',
  'Content-Length',
  '894'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/cryptography-client-test2')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: cryptography-client-test2"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '109',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-request-id',
  '51a22fca-6096-449a-b6e5-5fec5c27c616',
  'x-ms-keyvault-service-version',
  '1.1.44.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=13.66.222.112;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 21 Aug 2020 14:06:33 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/cryptography-client-test2')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: cryptography-client-test2"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '109',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-request-id',
  '6ed2417b-33d4-4a5a-bf8e-ce8424e658fd',
  'x-ms-keyvault-service-version',
  '1.1.44.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=13.66.222.112;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 21 Aug 2020 14:06:33 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/cryptography-client-test2')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: cryptography-client-test2"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '109',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-request-id',
  '39da8522-3e68-4860-8847-113774c54ab0',
  'x-ms-keyvault-service-version',
  '1.1.44.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=13.66.222.112;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 21 Aug 2020 14:06:35 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/cryptography-client-test2')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: cryptography-client-test2"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '109',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-request-id',
  'b1a124c4-273c-4f7e-b26a-09095451723e',
  'x-ms-keyvault-service-version',
  '1.1.44.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=13.66.222.112;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 21 Aug 2020 14:06:37 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/cryptography-client-test2')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: cryptography-client-test2"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '109',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-request-id',
  '659a537b-59bc-480f-bf5c-26ebf552e8f6',
  'x-ms-keyvault-service-version',
  '1.1.44.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=13.66.222.112;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 21 Aug 2020 14:06:40 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/cryptography-client-test2')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: cryptography-client-test2"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '109',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-request-id',
  'ced82ed6-f514-46f0-9ece-d3e00de7d613',
  'x-ms-keyvault-service-version',
  '1.1.44.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=13.66.222.112;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 21 Aug 2020 14:06:41 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/cryptography-client-test2')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/cryptography-client-test2","deletedDate":1598018793,"scheduledPurgeDate":1605794793,"key":{"kid":"https://keyvault_name.vault.azure.net/keys/cryptography-client-test2/60022a059e7b4a31b688c449cb04a73d","kty":"RSA-HSM","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"ot04vzeisFcG6DY9fcpEB4vZevrRA_7Y8u3AMXRRfWcIYFUMS4tqQn072KkfCrbbZJT5isSO08i241jAdgJ5CyuL7_mdZykBqD_3DnSLc5xTde0A6UDAXcOkMp1QDWtLWkU0km6NDVEKsOryLB-UgG-LTVziVaYXTjS2yePFp1l2yai-2tAx4tD8rk_639FAPxYM71B7qPhS6wL_5fymPuSur24GkvioxYcWEwUiHZbBna6X_e62MR5G0e3YPURP4SBiBPt_2fYEobrzOYiPFlX5aV3_tphlDFx3g9Jfg3FF91FNPqppQBCXbCdj2RiHxGof2BQhxCanSdHlkl9X9w","e":"AAEAAQ"},"attributes":{"enabled":true,"created":1598018792,"updated":1598018792,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-request-id',
  'f4482bc3-61c7-4806-86be-adcdfe8f082f',
  'x-ms-keyvault-service-version',
  '1.1.44.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=13.66.222.112;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 21 Aug 2020 14:06:43 GMT',
  'Content-Length',
  '894'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedkeys/cryptography-client-test2')
  .query(true)
  .reply(204, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-request-id',
  '7f32d1a2-918e-4988-ba96-5404eb355307',
  'x-ms-keyvault-service-version',
  '1.1.44.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=13.66.222.112;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 21 Aug 2020 14:06:44 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/keys/cryptography-client-test')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/cryptography-client-test","deletedDate":1598018804,"scheduledPurgeDate":1605794804,"key":{"kid":"https://keyvault_name.vault.azure.net/keys/cryptography-client-test/856a521274fb4b66b7e1523a3488883d","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"8OBEuyZnuBSuPTDRGcPVCEqo3dTITQgjRWl_XTQYrcuCtiLunDk3A0guzJJMCRhaE2thoBeS3vcwPuZ1Kf60UP8Kw5u7Tla3_bd75gIVUnez70zQe8TT3xhtRGwIiBwExjyPVAPlDnQgixygA_puVkl2CDCT9NriFi42t9wyqM7bkaZdibNSnEysDAU2E1vnfyTEVLLdQjOJ37aQnOpdXafiehz7yEt99IZ7wnnxNIxmsc8Zesme-snNWsd1OQQ5AcIqzS33atj8n5BCtLVYJ-NnjNayGCxrkFNBGn-739BVCAo2Z0pelQl_HzMnfZrzegEHsPOLqZHgGHjCU74WcQ","e":"AQAB"},"attributes":{"enabled":true,"created":1598018791,"updated":1598018791,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-request-id',
  '4abe2fd2-cb15-49bc-89da-fb9e622a5463',
  'x-ms-keyvault-service-version',
  '1.1.44.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=13.66.222.112;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 21 Aug 2020 14:06:44 GMT',
  'Content-Length',
  '886'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/cryptography-client-test')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: cryptography-client-test"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '108',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-request-id',
  'e1d1d799-b2c1-4704-8542-ef7f21a879a0',
  'x-ms-keyvault-service-version',
  '1.1.44.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=13.66.222.112;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 21 Aug 2020 14:06:44 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/cryptography-client-test')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: cryptography-client-test"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '108',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-request-id',
  'e35132a9-2d48-4294-9ad1-7d51458bb947',
  'x-ms-keyvault-service-version',
  '1.1.44.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=13.66.222.112;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 21 Aug 2020 14:06:44 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/cryptography-client-test')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: cryptography-client-test"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '108',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-request-id',
  'f149e186-e63e-4ebf-bab2-f865b9934ff7',
  'x-ms-keyvault-service-version',
  '1.1.44.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=13.66.222.112;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 21 Aug 2020 14:06:46 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/cryptography-client-test')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: cryptography-client-test"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '108',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-request-id',
  '2ce1a4ec-d891-48e4-a846-936116ef79bb',
  'x-ms-keyvault-service-version',
  '1.1.44.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=13.66.222.112;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 21 Aug 2020 14:06:48 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/cryptography-client-test')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: cryptography-client-test"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '108',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-request-id',
  '8b926dc2-206b-49d1-bb77-c7d4a19ca9bb',
  'x-ms-keyvault-service-version',
  '1.1.44.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=13.66.222.112;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 21 Aug 2020 14:06:51 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/cryptography-client-test')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: cryptography-client-test"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '108',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-request-id',
  '57cb2ed5-dae0-491c-bca6-669fecd44eaa',
  'x-ms-keyvault-service-version',
  '1.1.44.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=13.66.222.112;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 21 Aug 2020 14:06:53 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/cryptography-client-test')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: cryptography-client-test"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '108',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-request-id',
  '0978a04a-0573-4904-b0e3-8f77be613081',
  'x-ms-keyvault-service-version',
  '1.1.44.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=13.66.222.112;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 21 Aug 2020 14:06:54 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/cryptography-client-test')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: cryptography-client-test"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '108',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-request-id',
  'b7dabe4b-2b3d-4f1c-bfe6-316b5d108471',
  'x-ms-keyvault-service-version',
  '1.1.44.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=13.66.222.112;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 21 Aug 2020 14:06:56 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/cryptography-client-test')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: cryptography-client-test"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '108',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-request-id',
  '5ea377c4-1377-45a0-9b73-0a59382e43af',
  'x-ms-keyvault-service-version',
  '1.1.44.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=13.66.222.112;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 21 Aug 2020 14:06:58 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/cryptography-client-test')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/cryptography-client-test","deletedDate":1598018804,"scheduledPurgeDate":1605794804,"key":{"kid":"https://keyvault_name.vault.azure.net/keys/cryptography-client-test/856a521274fb4b66b7e1523a3488883d","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"8OBEuyZnuBSuPTDRGcPVCEqo3dTITQgjRWl_XTQYrcuCtiLunDk3A0guzJJMCRhaE2thoBeS3vcwPuZ1Kf60UP8Kw5u7Tla3_bd75gIVUnez70zQe8TT3xhtRGwIiBwExjyPVAPlDnQgixygA_puVkl2CDCT9NriFi42t9wyqM7bkaZdibNSnEysDAU2E1vnfyTEVLLdQjOJ37aQnOpdXafiehz7yEt99IZ7wnnxNIxmsc8Zesme-snNWsd1OQQ5AcIqzS33atj8n5BCtLVYJ-NnjNayGCxrkFNBGn-739BVCAo2Z0pelQl_HzMnfZrzegEHsPOLqZHgGHjCU74WcQ","e":"AQAB"},"attributes":{"enabled":true,"created":1598018791,"updated":1598018791,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-request-id',
  '80b6359e-8b30-466d-9998-c3685fff8bf1',
  'x-ms-keyvault-service-version',
  '1.1.44.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=13.66.222.112;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 21 Aug 2020 14:07:00 GMT',
  'Content-Length',
  '886'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedkeys/cryptography-client-test')
  .query(true)
  .reply(204, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-request-id',
  '672ac0a5-4f7d-4190-b939-81e703eb2f27',
  'x-ms-keyvault-service-version',
  '1.1.44.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=13.66.222.112;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 21 Aug 2020 14:07:00 GMT'
]);

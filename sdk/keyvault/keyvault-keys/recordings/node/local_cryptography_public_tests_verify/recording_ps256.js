let nock = require('nock');

module.exports.hash = "c36f6cecc1562db748b85831701a041c";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/localCryptoKeyName-PS256-/create')
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
  'westus',
  'x-ms-request-id',
  '55da994f-bab4-4e34-935b-1b76b4c48eff',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=13.66.134.228;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Sat, 27 Jun 2020 17:17:36 GMT'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fvault.azure.net%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":86399,"ext_expires_in":86399,"access_token":"access_token"}, [
  'Cache-Control',
  'no-cache, no-store',
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
  'x-ms-request-id',
  'e30618bf-38d7-4955-a14c-840875ba2100',
  'x-ms-ests-server',
  '2.1.10761.12 - EUS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=An3KEl6iMrVCsW9gSHmcRdc_aSJHAQAAADB2idYOAAAA; expires=Mon, 27-Jul-2020 17:17:36 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; SameSite=None; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; SameSite=None; secure; HttpOnly',
  'Date',
  'Sat, 27 Jun 2020 17:17:36 GMT',
  'Content-Length',
  '1315'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/localCryptoKeyName-PS256-/create', {"kty":"RSA"})
  .query(true)
  .reply(200, {"key":{"kid":"https://keyvault_name.vault.azure.net/keys/localCryptoKeyName-PS256-/c219cd0f2f4f44aa94d8418421806bdb","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"t4ERfPhqYAf-KlxjQOj5OToYXUW1yX6hxLL8xTGTNIDpMrc3RYPW2zJLffOLpjr31Sz7QK5geXWKK_ZmA1kudCivxEwj2FN42bV2SC6UUSBBHpPcP2Cqbd2u6uzBA6n0ha5Oiu7M_b5b07KgDI8bVC0E9Y8_pD_eK_4Gtt3j5LfkZpwHqLeMbCl14f3Q9TopMTVCLJ-vVwyXP4KX9RZF7vO5a6XEtml90YBSMSp4kLJefOMLQz3VShwfNrqItXgCF9IPoHxBbHCyIvAF5oWSdhFD6FQPlNdefbQEVbMYXAEoWI6Ba83bDhKsYBeelkSnaMlRkcSjs4zRl5xIee1-Iw","e":"AQAB"},"attributes":{"enabled":true,"created":1593278257,"updated":1593278257,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'f40b8401-a543-4f24-bef1-4eefa35a070f',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=13.66.134.228;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Sat, 27 Jun 2020 17:17:37 GMT',
  'Content-Length',
  '716'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/keys/localCryptoKeyName-PS256-/c219cd0f2f4f44aa94d8418421806bdb')
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
  'westus',
  'x-ms-request-id',
  'b222cb65-3f0f-4ddd-9a4f-ee6c527f93c7',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=13.66.134.228;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Sat, 27 Jun 2020 17:17:36 GMT'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fvault.azure.net%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":86399,"ext_expires_in":86399,"access_token":"access_token"}, [
  'Cache-Control',
  'no-cache, no-store',
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
  'x-ms-request-id',
  '8db882fc-949a-40e8-94e1-addda2cc1e00',
  'x-ms-ests-server',
  '2.1.10761.12 - SCUS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=An3KEl6iMrVCsW9gSHmcRdc_aSJHAgAAADB2idYOAAAA; expires=Mon, 27-Jul-2020 17:17:37 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; SameSite=None; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; SameSite=None; secure; HttpOnly',
  'Date',
  'Sat, 27 Jun 2020 17:17:37 GMT',
  'Content-Length',
  '1315'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/keys/localCryptoKeyName-PS256-/c219cd0f2f4f44aa94d8418421806bdb')
  .query(true)
  .reply(200, {"key":{"kid":"https://keyvault_name.vault.azure.net/keys/localCryptoKeyName-PS256-/c219cd0f2f4f44aa94d8418421806bdb","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"t4ERfPhqYAf-KlxjQOj5OToYXUW1yX6hxLL8xTGTNIDpMrc3RYPW2zJLffOLpjr31Sz7QK5geXWKK_ZmA1kudCivxEwj2FN42bV2SC6UUSBBHpPcP2Cqbd2u6uzBA6n0ha5Oiu7M_b5b07KgDI8bVC0E9Y8_pD_eK_4Gtt3j5LfkZpwHqLeMbCl14f3Q9TopMTVCLJ-vVwyXP4KX9RZF7vO5a6XEtml90YBSMSp4kLJefOMLQz3VShwfNrqItXgCF9IPoHxBbHCyIvAF5oWSdhFD6FQPlNdefbQEVbMYXAEoWI6Ba83bDhKsYBeelkSnaMlRkcSjs4zRl5xIee1-Iw","e":"AQAB"},"attributes":{"enabled":true,"created":1593278257,"updated":1593278257,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '7f1f399d-3514-4713-b9e9-90ae92ee2334',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=13.66.134.228;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Sat, 27 Jun 2020 17:17:37 GMT',
  'Content-Length',
  '716'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/localCryptoKeyName-PS256-/c219cd0f2f4f44aa94d8418421806bdb/sign', {"alg":"PS256","value":"Ddu8v3v5O1eeK7tVDrtEQAeJxk287_ILYDv98miPFSo"})
  .query(true)
  .reply(200, {"kid":"https://keyvault_name.vault.azure.net/keys/localCryptoKeyName-PS256-/c219cd0f2f4f44aa94d8418421806bdb","value":"Yrg_QsjT0Tp-hGa3CHYNYUTNMMBsoL3SzwX0GHEWWQwgGIg-ANFn-9upEYQEq6Z_nbhKwdmaJxbHCcN3klytiOaxAQxNdyiUmPbrz1p7ffi1LzI-_vk54xXYz6htqC91NMFkahEPBdiVNY9Qguo1bqSmK1Flsmi-qMO-EM8ilB5rr7YjncupicTbEZvJxIzX3qipqnuctKiKNocTBHrdpFgxe74cXo2XHxkwTbelKigNeQ7KoCU6w1-Kkq3K4glk01_X2-i7BhNBhb-DS20AmigpCvPQ05-dJhKhc42cn0kpgPUob6RsFxOVPmzYIkGS877Vbz0UCpTh9Ga3y_t4jA"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'a0a9a318-4cb4-4ccd-bba7-c239b37ea092',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=13.66.134.228;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Sat, 27 Jun 2020 17:17:37 GMT',
  'Content-Length',
  '486'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/keys/localCryptoKeyName-PS256-')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/localCryptoKeyName-PS256-","deletedDate":1593278257,"scheduledPurgeDate":1601054257,"key":{"kid":"https://keyvault_name.vault.azure.net/keys/localCryptoKeyName-PS256-/c219cd0f2f4f44aa94d8418421806bdb","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"t4ERfPhqYAf-KlxjQOj5OToYXUW1yX6hxLL8xTGTNIDpMrc3RYPW2zJLffOLpjr31Sz7QK5geXWKK_ZmA1kudCivxEwj2FN42bV2SC6UUSBBHpPcP2Cqbd2u6uzBA6n0ha5Oiu7M_b5b07KgDI8bVC0E9Y8_pD_eK_4Gtt3j5LfkZpwHqLeMbCl14f3Q9TopMTVCLJ-vVwyXP4KX9RZF7vO5a6XEtml90YBSMSp4kLJefOMLQz3VShwfNrqItXgCF9IPoHxBbHCyIvAF5oWSdhFD6FQPlNdefbQEVbMYXAEoWI6Ba83bDhKsYBeelkSnaMlRkcSjs4zRl5xIee1-Iw","e":"AQAB"},"attributes":{"enabled":true,"created":1593278257,"updated":1593278257,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '42a72147-ee1e-42c1-8bfb-9fd5f228085d',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=13.66.134.228;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Sat, 27 Jun 2020 17:17:37 GMT',
  'Content-Length',
  '886'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/localCryptoKeyName-PS256-')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: localCryptoKeyName-PS256-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '110',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '80949878-a7ec-4266-9937-02d3b7cf42cc',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=13.66.134.228;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Sat, 27 Jun 2020 17:17:37 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/localCryptoKeyName-PS256-')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: localCryptoKeyName-PS256-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '110',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '4df598f9-50b1-4039-8ad3-e4ded74fa4cb',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=13.66.134.228;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Sat, 27 Jun 2020 17:17:37 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/localCryptoKeyName-PS256-')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: localCryptoKeyName-PS256-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '110',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'd194d8cc-4639-4ac0-854e-4db7aed577fe',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=13.66.134.228;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Sat, 27 Jun 2020 17:17:39 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/localCryptoKeyName-PS256-')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: localCryptoKeyName-PS256-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '110',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'ee84f6ac-ed89-4eaf-ba5a-12afbc5139c7',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=13.66.134.228;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Sat, 27 Jun 2020 17:17:41 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/localCryptoKeyName-PS256-')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: localCryptoKeyName-PS256-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '110',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '30329ae7-ca57-46b5-bd2c-78c3915bfd06',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=13.66.134.228;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Sat, 27 Jun 2020 17:17:43 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/localCryptoKeyName-PS256-')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: localCryptoKeyName-PS256-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '110',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'c5230bb0-3509-4ae4-ab3d-0ea84e59061c',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=13.66.134.228;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Sat, 27 Jun 2020 17:17:45 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/localCryptoKeyName-PS256-')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: localCryptoKeyName-PS256-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '110',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'dad55f37-4800-49b2-a977-f93dc8bc6f0a',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=13.66.134.228;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Sat, 27 Jun 2020 17:17:48 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/localCryptoKeyName-PS256-')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: localCryptoKeyName-PS256-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '110',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '9a13b9ee-fcb5-40b4-b67f-8184871f7395',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=13.66.134.228;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Sat, 27 Jun 2020 17:17:49 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/localCryptoKeyName-PS256-')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: localCryptoKeyName-PS256-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '110',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'a256a71b-f284-4729-b1ab-e893a5a155db',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=13.66.134.228;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Sat, 27 Jun 2020 17:17:51 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/localCryptoKeyName-PS256-')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: localCryptoKeyName-PS256-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '110',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '1c60a968-32f3-49aa-a770-d2618b89d38d',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=13.66.134.228;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Sat, 27 Jun 2020 17:17:53 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/localCryptoKeyName-PS256-')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: localCryptoKeyName-PS256-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '110',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'bb7c10d4-a493-4240-bfcd-91088bc2f801',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=13.66.134.228;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Sat, 27 Jun 2020 17:17:55 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/localCryptoKeyName-PS256-')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: localCryptoKeyName-PS256-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '110',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '4bc00d20-3eb9-496c-813d-9820bc48f664',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=13.66.134.228;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Sat, 27 Jun 2020 17:17:57 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/localCryptoKeyName-PS256-')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/localCryptoKeyName-PS256-","deletedDate":1593278257,"scheduledPurgeDate":1601054257,"key":{"kid":"https://keyvault_name.vault.azure.net/keys/localCryptoKeyName-PS256-/c219cd0f2f4f44aa94d8418421806bdb","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"t4ERfPhqYAf-KlxjQOj5OToYXUW1yX6hxLL8xTGTNIDpMrc3RYPW2zJLffOLpjr31Sz7QK5geXWKK_ZmA1kudCivxEwj2FN42bV2SC6UUSBBHpPcP2Cqbd2u6uzBA6n0ha5Oiu7M_b5b07KgDI8bVC0E9Y8_pD_eK_4Gtt3j5LfkZpwHqLeMbCl14f3Q9TopMTVCLJ-vVwyXP4KX9RZF7vO5a6XEtml90YBSMSp4kLJefOMLQz3VShwfNrqItXgCF9IPoHxBbHCyIvAF5oWSdhFD6FQPlNdefbQEVbMYXAEoWI6Ba83bDhKsYBeelkSnaMlRkcSjs4zRl5xIee1-Iw","e":"AQAB"},"attributes":{"enabled":true,"created":1593278257,"updated":1593278257,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'fcb14df7-1cb9-49cc-a3e0-667c7bf1bc9e',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=13.66.134.228;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Sat, 27 Jun 2020 17:17:59 GMT',
  'Content-Length',
  '886'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedkeys/localCryptoKeyName-PS256-')
  .query(true)
  .reply(204, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '2cd519e7-cb44-4962-a49b-365f4f1a2403',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=13.66.134.228;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Sat, 27 Jun 2020 17:17:59 GMT'
]);

let nock = require('nock');

module.exports.hash = "a6a5bf1c6291c7d346118c46097976dc";

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
  'westus2',
  'x-ms-request-id',
  'ef43778a-96f7-468c-97df-2e989f2d6811',
  'x-ms-keyvault-service-version',
  '1.2.191.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=72.68.182.20;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 02 Mar 2021 22:18:02 GMT'
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
  '30b49bf8-f85f-43a6-bfb9-3e20e556bc00',
  'x-ms-ests-server',
  '2.1.11513.17 - SCUS ProdSlices',
  'Set-Cookie',
  'fpc=AuCUwaH-pAJPoo1uGPxWnrssYtMRBAAAAIGw0NcOAAAA; expires=Thu, 01-Apr-2021 22:18:02 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 02 Mar 2021 22:18:02 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/cryptography-client-test/create', {"kty":"RSA"})
  .query(true)
  .reply(200, {"key":{"kid":"https://keyvault_name.vault.azure.net/keys/cryptography-client-test/6b53c8498ff14c84ad5d62093a64b532","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"q9nvdjiArlqvQ6eJcS2v5LM9I7KGau8Vnsaue7noeeNFcXaNS5U2B6GnIQ-CHc20OfSyZCkzblER64yAFO-Jp2hA4sGGYu1UvIngJOs4A1uRiwPzyFIGafDPve38qa2dUCagzWgfBvEosVIZj-hUR9oIBdXuY8vw6nFxGKMWGVJDyrL6O2pc4nRj6_XV5sglEr_ca-BmWs6lWk-zhaqCl_uOnt-xM1nBHsGeheVWxhMBC-yNsdCMij7V-zTzULLGSqizvyA1kNPM4nTj1tFZ-GNTrW-dou4lKCyAk4mMb_pezYhHKAJzJotBBM8u3JJTBblvqJX9cE8H9fe4kFktcQ","e":"AQAB"},"attributes":{"enabled":true,"created":1614723483,"updated":1614723483,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7}}, [
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
  'x-ms-request-id',
  'd83fddf6-a1bc-46a1-8da2-13c854860852',
  'x-ms-keyvault-service-version',
  '1.2.191.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=72.68.182.20;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 02 Mar 2021 22:18:02 GMT',
  'Content-Length',
  '716'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/keys/cryptography-client-test/6b53c8498ff14c84ad5d62093a64b532')
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
  'x-ms-request-id',
  '4727773d-0f11-4c38-83e8-d67e14cce5c2',
  'x-ms-keyvault-service-version',
  '1.2.191.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=72.68.182.20;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 02 Mar 2021 22:18:02 GMT'
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
  'a7ed4630-56af-4e48-82f1-c98a0d41b500',
  'x-ms-ests-server',
  '2.1.11513.17 - EUS ProdSlices',
  'Set-Cookie',
  'fpc=AuCUwaH-pAJPoo1uGPxWnrssYtMRBAAAAIGw0NcOAAAA; expires=Thu, 01-Apr-2021 22:18:03 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 02 Mar 2021 22:18:03 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/keys/cryptography-client-test/6b53c8498ff14c84ad5d62093a64b532')
  .query(true)
  .reply(200, {"key":{"kid":"https://keyvault_name.vault.azure.net/keys/cryptography-client-test/6b53c8498ff14c84ad5d62093a64b532","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"q9nvdjiArlqvQ6eJcS2v5LM9I7KGau8Vnsaue7noeeNFcXaNS5U2B6GnIQ-CHc20OfSyZCkzblER64yAFO-Jp2hA4sGGYu1UvIngJOs4A1uRiwPzyFIGafDPve38qa2dUCagzWgfBvEosVIZj-hUR9oIBdXuY8vw6nFxGKMWGVJDyrL6O2pc4nRj6_XV5sglEr_ca-BmWs6lWk-zhaqCl_uOnt-xM1nBHsGeheVWxhMBC-yNsdCMij7V-zTzULLGSqizvyA1kNPM4nTj1tFZ-GNTrW-dou4lKCyAk4mMb_pezYhHKAJzJotBBM8u3JJTBblvqJX9cE8H9fe4kFktcQ","e":"AQAB"},"attributes":{"enabled":true,"created":1614723483,"updated":1614723483,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7}}, [
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
  'x-ms-request-id',
  'ea761401-5268-462e-80b7-9caba1bd0f0d',
  'x-ms-keyvault-service-version',
  '1.2.191.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=72.68.182.20;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 02 Mar 2021 22:18:02 GMT',
  'Content-Length',
  '716'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/cryptography-client-test/6b53c8498ff14c84ad5d62093a64b532/decrypt')
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
  'x-ms-request-id',
  '2ffdeb9e-c851-44a3-aacd-bada0ae1eb90',
  'x-ms-keyvault-service-version',
  '1.2.191.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=72.68.182.20;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 02 Mar 2021 22:18:03 GMT'
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
  '30b49bf8-f85f-43a6-bfb9-3e201357bc00',
  'x-ms-ests-server',
  '2.1.11513.17 - SCUS ProdSlices',
  'Set-Cookie',
  'fpc=AuCUwaH-pAJPoo1uGPxWnrssYtMRBAAAAIGw0NcOAAAA; expires=Thu, 01-Apr-2021 22:18:04 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 02 Mar 2021 22:18:03 GMT',
  'Content-Length',
  '1315'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/cryptography-client-test/6b53c8498ff14c84ad5d62093a64b532/decrypt', {"alg":"RSA1_5","value":"pCMrcyWZ_u0Ljtq7SVo8-88kWQFdu7XYkuKBgcZxW-aGuXi-cqfX9SksAj1LtODQGfxxalOecm1mwcMPZZnaR3aJAJjhvb4eNhBd6YjzYP8RK3ZRQ1Qcjj7NGHUqJdgX3TxU0kPuktKPaPgkz1I4rA0Khgu6-2GvVHrtHBVZdSv-ofPw9wYMIHJ0oOFmdoVupA9iipSJwBiXBXd1j6Szlm0CuR4ldQCGC5n4KVN1p7Zevz8UI_FP86_5altc8K8w8gl5rFH8ZP2c5N6gdVuiLmhkNNkKpTTJTJSqkFy6pTGE7HO20KYSUYBiyYQHyS6Qq7Y9sllzHUf-1AinGBULUw"})
  .query(true)
  .reply(200, {"kid":"https://keyvault_name.vault.azure.net/keys/cryptography-client-test/6b53c8498ff14c84ad5d62093a64b532","value":"bWFudWFsbHkgZW5jcnlwdCBsb2NhbGx5IGFuZCBkZWNyeXB0IHJlbW90ZWx5LCBib3RoIHdpdGggUlNBMV81"}, [
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
  'x-ms-request-id',
  '33638947-5e1c-4992-a4de-849aec279bfc',
  'x-ms-keyvault-service-version',
  '1.2.191.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=72.68.182.20;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 02 Mar 2021 22:18:03 GMT',
  'Content-Length',
  '219'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/keys/cryptography-client-test')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/cryptography-client-test","deletedDate":1614723484,"scheduledPurgeDate":1615328284,"key":{"kid":"https://keyvault_name.vault.azure.net/keys/cryptography-client-test/6b53c8498ff14c84ad5d62093a64b532","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"q9nvdjiArlqvQ6eJcS2v5LM9I7KGau8Vnsaue7noeeNFcXaNS5U2B6GnIQ-CHc20OfSyZCkzblER64yAFO-Jp2hA4sGGYu1UvIngJOs4A1uRiwPzyFIGafDPve38qa2dUCagzWgfBvEosVIZj-hUR9oIBdXuY8vw6nFxGKMWGVJDyrL6O2pc4nRj6_XV5sglEr_ca-BmWs6lWk-zhaqCl_uOnt-xM1nBHsGeheVWxhMBC-yNsdCMij7V-zTzULLGSqizvyA1kNPM4nTj1tFZ-GNTrW-dou4lKCyAk4mMb_pezYhHKAJzJotBBM8u3JJTBblvqJX9cE8H9fe4kFktcQ","e":"AQAB"},"attributes":{"enabled":true,"created":1614723483,"updated":1614723483,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7}}, [
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
  'x-ms-request-id',
  'ae95d72e-2530-4d4d-ac18-6ead1aa2518c',
  'x-ms-keyvault-service-version',
  '1.2.191.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=72.68.182.20;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 02 Mar 2021 22:18:03 GMT',
  'Content-Length',
  '877'
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
  '109',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  'adf47378-062e-42af-b16d-5a82981a0322',
  'x-ms-keyvault-service-version',
  '1.2.191.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=72.68.182.20;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 02 Mar 2021 22:18:03 GMT'
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
  '109',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  '6acbaca4-c41c-4e55-a1ff-4ee242fabbf2',
  'x-ms-keyvault-service-version',
  '1.2.191.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=72.68.182.20;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 02 Mar 2021 22:18:03 GMT'
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
  '109',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  '0774ecc3-a7fa-4f10-9cc4-1ea3b7622a9c',
  'x-ms-keyvault-service-version',
  '1.2.191.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=72.68.182.20;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 02 Mar 2021 22:18:06 GMT'
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
  '109',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  '093733ad-4856-4832-93e7-7084a4102952',
  'x-ms-keyvault-service-version',
  '1.2.191.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=72.68.182.20;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 02 Mar 2021 22:18:08 GMT'
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
  '109',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  'fcfafa35-a731-4f47-a659-ce2b015fecda',
  'x-ms-keyvault-service-version',
  '1.2.191.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=72.68.182.20;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 02 Mar 2021 22:18:10 GMT'
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
  '109',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  'a755f7a8-2073-4a79-8275-62c5f09a0609',
  'x-ms-keyvault-service-version',
  '1.2.191.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=72.68.182.20;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 02 Mar 2021 22:18:12 GMT'
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
  '109',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  '244bfb2f-3d79-430a-be69-a2c5cca16e71',
  'x-ms-keyvault-service-version',
  '1.2.191.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=72.68.182.20;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 02 Mar 2021 22:18:14 GMT'
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
  '109',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  '500e798a-8871-4150-85d4-f7192c0de79b',
  'x-ms-keyvault-service-version',
  '1.2.191.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=72.68.182.20;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 02 Mar 2021 22:18:16 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/cryptography-client-test')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/cryptography-client-test","deletedDate":1614723484,"scheduledPurgeDate":1615328284,"key":{"kid":"https://keyvault_name.vault.azure.net/keys/cryptography-client-test/6b53c8498ff14c84ad5d62093a64b532","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"q9nvdjiArlqvQ6eJcS2v5LM9I7KGau8Vnsaue7noeeNFcXaNS5U2B6GnIQ-CHc20OfSyZCkzblER64yAFO-Jp2hA4sGGYu1UvIngJOs4A1uRiwPzyFIGafDPve38qa2dUCagzWgfBvEosVIZj-hUR9oIBdXuY8vw6nFxGKMWGVJDyrL6O2pc4nRj6_XV5sglEr_ca-BmWs6lWk-zhaqCl_uOnt-xM1nBHsGeheVWxhMBC-yNsdCMij7V-zTzULLGSqizvyA1kNPM4nTj1tFZ-GNTrW-dou4lKCyAk4mMb_pezYhHKAJzJotBBM8u3JJTBblvqJX9cE8H9fe4kFktcQ","e":"AQAB"},"attributes":{"enabled":true,"created":1614723483,"updated":1614723483,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7}}, [
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
  'x-ms-request-id',
  '1e51cce8-8c4c-419e-8649-30ef7c723bb2',
  'x-ms-keyvault-service-version',
  '1.2.191.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=72.68.182.20;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 02 Mar 2021 22:18:18 GMT',
  'Content-Length',
  '877'
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
  'westus2',
  'x-ms-request-id',
  '27bd5687-aa8f-4782-b846-40edf487e80c',
  'x-ms-keyvault-service-version',
  '1.2.191.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=72.68.182.20;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 02 Mar 2021 22:18:18 GMT'
]);

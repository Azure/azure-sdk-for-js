let nock = require('nock');

module.exports.hash = "b52d875ef63bbacaa91c8a733ff14977";

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
  'x-ms-client-request-id',
  'a0bf16f1-a1be-43d4-9fbb-7e0032aa0de9',
  'x-ms-request-id',
  '5dbd57f7-a9ad-440f-b816-e89429f77234',
  'x-ms-keyvault-service-version',
  '1.2.236.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=96.57.209.90;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Sun, 25 Apr 2021 19:34:03 GMT'
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
  '1682db6b-dbae-4b6b-b593-706e6032d200',
  'x-ms-ests-server',
  '2.1.11654.16 - EUS ProdSlices',
  'Set-Cookie',
  'fpc=AtyvUprZph9NgyFEPfiC1KSS9HQSAQAAACu7F9gOAAAA; expires=Tue, 25-May-2021 19:34:04 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Sun, 25 Apr 2021 19:34:04 GMT',
  'Content-Length',
  '1315'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/cryptography-client-test/create', {"kty":"RSA"})
  .query(true)
  .reply(200, {"key":{"kid":"https://keyvault_name.vault.azure.net/keys/cryptography-client-test/16a9722655ce41308c73f35af0a4ca89","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"yY7Med0ml73szZAGXyknJE-Z4ealVUedrc37ShH4jAUZ0ZMmPVGOVVCInixIA9TaHqdlL_3X-0y78OngldWffrM5_R6Y4pVXRp-RhPRdKqDoZTFRSqqG7me_wODOXvUlF22SQTLZGXrUV6SzskuQTv3U28DcI1SiNcBimNBEt5Bv3HlbtZl7plBWVcmJbLWiRqRDS7xwwqsJSFUkQyeJgrSMqTiPtowA-jLr8P02sKvGecikyku7oKY5QHahurgREYqBnBzJAEF0lr9PUUiWBr7Wx2z9v6FLerYzH8wxfVg8CCGsTURZuVKCl_hbvV-3c5YlNz_BAZ_mQw08-nzXIQ","e":"AQAB"},"attributes":{"enabled":true,"created":1619379244,"updated":1619379244,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7}}, [
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
  'a0bf16f1-a1be-43d4-9fbb-7e0032aa0de9',
  'x-ms-request-id',
  'e9ba37e6-4b25-4d19-920f-a3b1045aeff9',
  'x-ms-keyvault-service-version',
  '1.2.236.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=96.57.209.90;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Sun, 25 Apr 2021 19:34:05 GMT',
  'Content-Length',
  '714'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/cryptography-client-test/16a9722655ce41308c73f35af0a4ca89/sign')
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
  'fd80757a-e48d-4522-9e86-154c1f10c5e9',
  'x-ms-request-id',
  'a4d72428-90cc-4dbe-9072-aa46dfd618dd',
  'x-ms-keyvault-service-version',
  '1.2.236.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=96.57.209.90;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Sun, 25 Apr 2021 19:34:05 GMT'
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
  '91ace131-1ae8-40a9-be8a-7aa733e1d600',
  'x-ms-ests-server',
  '2.1.11654.16 - EUS ProdSlices',
  'Set-Cookie',
  'fpc=AtyvUprZph9NgyFEPfiC1KSS9HQSAgAAACu7F9gOAAAA; expires=Tue, 25-May-2021 19:34:05 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Sun, 25 Apr 2021 19:34:05 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/cryptography-client-test/16a9722655ce41308c73f35af0a4ca89/sign', {"alg":"RS256","value":"MzIgYnl0ZSBzaWduYXR1cmUgaW4gYXNjaWkgY2hhcnM"})
  .query(true)
  .reply(200, {"kid":"https://keyvault_name.vault.azure.net/keys/cryptography-client-test/16a9722655ce41308c73f35af0a4ca89","value":"N6qFPk3q52mShxV76M8tZdR0Hm9nE9k-LLL8XpF5lDZcSOLAvtACzwHxaLoscP2fqAHULNpzd8axuT4wPZtg3tBTucPnjy8EKpAvQYSbu7xls6Tm_7PeO01lxNUjq-8852Mpfl-uu5C5zKBhnCzislOjYlJmF_jB1ne60zff-j1K67nNx8T9hzRhtxFH6jUGBNhwcNU0_LgCyB4jgAOnd_xpWhPe-BsWwTUaOIA1bfoCgi9A1JfN1tUSqNpFnpD0tnbxazLD6LJq3_PKL22Lzbt11rt3Ge1h85CrJTCgPrbU-1_NwdW3hSM829TkNL4YeV1d-TDg0BmKAPYcMa9mjw"}, [
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
  'fd80757a-e48d-4522-9e86-154c1f10c5e9',
  'x-ms-request-id',
  '756ca990-ff4a-4340-852d-7e7a2c1ffe95',
  'x-ms-keyvault-service-version',
  '1.2.236.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=96.57.209.90;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Sun, 25 Apr 2021 19:34:05 GMT',
  'Content-Length',
  '475'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/cryptography-client-test/16a9722655ce41308c73f35af0a4ca89/verify', {"alg":"RS256","digest":"MzIgYnl0ZSBzaWduYXR1cmUgaW4gYXNjaWkgY2hhcnM","value":"N6qFPk3q52mShxV76M8tZdR0Hm9nE9k-LLL8XpF5lDZcSOLAvtACzwHxaLoscP2fqAHULNpzd8axuT4wPZtg3tBTucPnjy8EKpAvQYSbu7xls6Tm_7PeO01lxNUjq-8852Mpfl-uu5C5zKBhnCzislOjYlJmF_jB1ne60zff-j1K67nNx8T9hzRhtxFH6jUGBNhwcNU0_LgCyB4jgAOnd_xpWhPe-BsWwTUaOIA1bfoCgi9A1JfN1tUSqNpFnpD0tnbxazLD6LJq3_PKL22Lzbt11rt3Ge1h85CrJTCgPrbU-1_NwdW3hSM829TkNL4YeV1d-TDg0BmKAPYcMa9mjw"})
  .query(true)
  .reply(200, {"value":true}, [
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
  'a08f398c-f0a7-4656-b567-a01f3f7611f8',
  'x-ms-request-id',
  '200e27cb-3d57-4786-9b63-2b124c40c4bd',
  'x-ms-keyvault-service-version',
  '1.2.236.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=96.57.209.90;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Sun, 25 Apr 2021 19:34:06 GMT',
  'Content-Length',
  '14'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/keys/cryptography-client-test')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/cryptography-client-test","deletedDate":1619379246,"scheduledPurgeDate":1619984046,"key":{"kid":"https://keyvault_name.vault.azure.net/keys/cryptography-client-test/16a9722655ce41308c73f35af0a4ca89","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"yY7Med0ml73szZAGXyknJE-Z4ealVUedrc37ShH4jAUZ0ZMmPVGOVVCInixIA9TaHqdlL_3X-0y78OngldWffrM5_R6Y4pVXRp-RhPRdKqDoZTFRSqqG7me_wODOXvUlF22SQTLZGXrUV6SzskuQTv3U28DcI1SiNcBimNBEt5Bv3HlbtZl7plBWVcmJbLWiRqRDS7xwwqsJSFUkQyeJgrSMqTiPtowA-jLr8P02sKvGecikyku7oKY5QHahurgREYqBnBzJAEF0lr9PUUiWBr7Wx2z9v6FLerYzH8wxfVg8CCGsTURZuVKCl_hbvV-3c5YlNz_BAZ_mQw08-nzXIQ","e":"AQAB"},"attributes":{"enabled":true,"created":1619379244,"updated":1619379244,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7}}, [
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
  '40ce59d5-ffac-40e4-97ad-9246f9541fe9',
  'x-ms-request-id',
  '7392471d-ba94-4d20-a223-e4af2457b5ef',
  'x-ms-keyvault-service-version',
  '1.2.236.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=96.57.209.90;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Sun, 25 Apr 2021 19:34:06 GMT',
  'Content-Length',
  '873'
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
  'westus2',
  'x-ms-client-request-id',
  'ce60d270-7fdd-4252-b93c-4f5ceda984f7',
  'x-ms-request-id',
  'fcad55e5-ddd6-40b4-876d-b8d20ac970e2',
  'x-ms-keyvault-service-version',
  '1.2.236.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=96.57.209.90;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Sun, 25 Apr 2021 19:34:06 GMT'
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
  'westus2',
  'x-ms-client-request-id',
  'accbd2be-becf-4467-8dea-c44bb02fc5a6',
  'x-ms-request-id',
  '7b8526f7-0aff-4fd2-8679-66b53c3419d6',
  'x-ms-keyvault-service-version',
  '1.2.236.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=96.57.209.90;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Sun, 25 Apr 2021 19:34:06 GMT'
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
  'westus2',
  'x-ms-client-request-id',
  '04e27c26-b19d-4f42-9f3b-a48c35cd0899',
  'x-ms-request-id',
  '608239db-dfa7-4b9a-892a-1dc72ade5210',
  'x-ms-keyvault-service-version',
  '1.2.236.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=96.57.209.90;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Sun, 25 Apr 2021 19:34:08 GMT'
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
  'westus2',
  'x-ms-client-request-id',
  '0d2724bf-1745-456d-a245-818980df3ae2',
  'x-ms-request-id',
  'ae3415f1-6be8-48d3-bcf4-a9df9c9aa647',
  'x-ms-keyvault-service-version',
  '1.2.236.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=96.57.209.90;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Sun, 25 Apr 2021 19:34:10 GMT'
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
  'westus2',
  'x-ms-client-request-id',
  '09feca53-7917-484d-9f46-1c8c76c424bb',
  'x-ms-request-id',
  '5782c612-7914-49ac-b13d-6a3f82217ee0',
  'x-ms-keyvault-service-version',
  '1.2.236.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=96.57.209.90;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Sun, 25 Apr 2021 19:34:12 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/cryptography-client-test')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/cryptography-client-test","deletedDate":1619379246,"scheduledPurgeDate":1619984046,"key":{"kid":"https://keyvault_name.vault.azure.net/keys/cryptography-client-test/16a9722655ce41308c73f35af0a4ca89","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"yY7Med0ml73szZAGXyknJE-Z4ealVUedrc37ShH4jAUZ0ZMmPVGOVVCInixIA9TaHqdlL_3X-0y78OngldWffrM5_R6Y4pVXRp-RhPRdKqDoZTFRSqqG7me_wODOXvUlF22SQTLZGXrUV6SzskuQTv3U28DcI1SiNcBimNBEt5Bv3HlbtZl7plBWVcmJbLWiRqRDS7xwwqsJSFUkQyeJgrSMqTiPtowA-jLr8P02sKvGecikyku7oKY5QHahurgREYqBnBzJAEF0lr9PUUiWBr7Wx2z9v6FLerYzH8wxfVg8CCGsTURZuVKCl_hbvV-3c5YlNz_BAZ_mQw08-nzXIQ","e":"AQAB"},"attributes":{"enabled":true,"created":1619379244,"updated":1619379244,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7}}, [
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
  '59eae1a9-2da3-425c-9340-38b92c45d292',
  'x-ms-request-id',
  '8a67cf03-9da2-4e38-87e5-dd8f76b9fe64',
  'x-ms-keyvault-service-version',
  '1.2.236.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=96.57.209.90;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Sun, 25 Apr 2021 19:34:15 GMT',
  'Content-Length',
  '873'
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
  'x-ms-client-request-id',
  'fab488bc-9c30-41b2-a296-65ec6bd712f6',
  'x-ms-request-id',
  '9631fbdf-c659-4671-a25e-1b6719fd73f3',
  'x-ms-keyvault-service-version',
  '1.2.236.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=96.57.209.90;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Sun, 25 Apr 2021 19:34:15 GMT'
]);

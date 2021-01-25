let nock = require('nock');

module.exports.hash = "ddd16e2f7c87a2345517b837fb0b8b6a";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/backupRestoreKeyName-canrecoveradeletedkey-/create')
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
  '912dfa55-5ec0-4de5-8764-1d4756e2b1ea',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 12:06:41 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/keys/localCryptoKeyName-RSA15-8230843657460811')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/localCryptoKeyName-RSA15-8230843657460811","deletedDate":1593086801,"scheduledPurgeDate":1600862801,"key":{"kid":"https://keyvault_name.vault.azure.net/keys/localCryptoKeyName-RSA15-8230843657460811/e7fd491043bc42eca040cb4589a5acf1","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"vh3qBVefNKXtIvV-wNuucBaQcimraePIxeM2zQzD30fkIkmABpwDfJx3RpcTij_mfVQjuSUrBZi29t7jq_hnGrW-6xkKbKOF9232AuScO2kPNvYBCistGEMk5VDC1nfZjv_8_GGHtuJKQ5WaTIq9SJW2ZsIq1Chul3IBu49FNLd2cQLqhdVwa3p5kwAUKhbn-bRwX-_wBugYcE2hUCR3z3o1Ev1JndSzIidTvIFJJhuqKn42maQdwOyuEwbsVE_3DR2QbeMPzirecxl5WyRDIwoWpMLK3peSBWDUjb-pCpGDP5GQP9tx6GbJL1gz9W-Urh3OczxeBW6rXKll-io2rQ","e":"AQAB"},"attributes":{"enabled":true,"created":1592610385,"updated":1592610385,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90}}, [
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
  'd560d57b-9166-47a9-807f-7f8b3d3f322d',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 12:06:41 GMT',
  'Content-Length',
  '884'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/localCryptoKeyName-RSA15-8230843657460811')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: localCryptoKeyName-RSA15-8230843657460811"}}, [
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
  'westus',
  'x-ms-request-id',
  '14cf32d9-2b11-45bd-9fcc-52f9ec0a9412',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 12:06:41 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/localCryptoKeyName-RSA15-8230843657460811')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: localCryptoKeyName-RSA15-8230843657460811"}}, [
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
  'westus',
  'x-ms-request-id',
  'b11c3c77-2a47-41cf-ada6-d33598debb9b',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 12:06:41 GMT'
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
  'c8a9006f-7f9a-437d-a4f6-ce3a07a41501',
  'x-ms-ests-server',
  '2.1.10732.8 - SCUS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AqZhth35pUJMm7sJtOuLsHQ_aSJHAQAAAFKKhtYOAAAA; expires=Sat, 25-Jul-2020 12:06:42 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; SameSite=None; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; SameSite=None; secure; HttpOnly',
  'Date',
  'Thu, 25 Jun 2020 12:06:41 GMT',
  'Content-Length',
  '1315'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/backupRestoreKeyName-canrecoveradeletedkey-/create', {"kty":"RSA"})
  .query(true)
  .reply(200, {"key":{"kid":"https://keyvault_name.vault.azure.net/keys/backupRestoreKeyName-canrecoveradeletedkey-/fe31e3399bce4ae8b167f3a1f4b392c5","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"6QQ0BywRLIir5TSZl5fQwcPQU9bEIohWSPZDQX6Z2FtKglaGBysztxXduXdqjjfZ1BxfjE9XqsE34ETVNyk0CPKLIbw3ppFJS0f-dVvC832otWa1VOmX4HNTmuI6HlU870g8pQkL6hGHvPueXgkftAGTHA2bltccS82Q5hkWfNY-B2vhE5OHh8ud1WaVXHBLyqsmyMSJ7VNtYC66orUwK6-FP71WgyuGPMiki0pyLL_5-v_GK5uJ2fAKoO36bpGgcAHIVV2lgBWJOsuLxmnQjjQDcVsBycZCuuLalvTzl0ODO-RTp8VMXZ5Fcf1oH0B3JZG0aiqyp_sfbeHT97qdOQ","e":"AQAB"},"attributes":{"enabled":true,"created":1593086802,"updated":1593086802,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90}}, [
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
  'c99af106-02ca-4771-85c4-227715ddd560',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 12:06:42 GMT',
  'Content-Length',
  '733'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/keys/backupRestoreKeyName-canrecoveradeletedkey-')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/backupRestoreKeyName-canrecoveradeletedkey-","deletedDate":1593086802,"scheduledPurgeDate":1600862802,"key":{"kid":"https://keyvault_name.vault.azure.net/keys/backupRestoreKeyName-canrecoveradeletedkey-/fe31e3399bce4ae8b167f3a1f4b392c5","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"6QQ0BywRLIir5TSZl5fQwcPQU9bEIohWSPZDQX6Z2FtKglaGBysztxXduXdqjjfZ1BxfjE9XqsE34ETVNyk0CPKLIbw3ppFJS0f-dVvC832otWa1VOmX4HNTmuI6HlU870g8pQkL6hGHvPueXgkftAGTHA2bltccS82Q5hkWfNY-B2vhE5OHh8ud1WaVXHBLyqsmyMSJ7VNtYC66orUwK6-FP71WgyuGPMiki0pyLL_5-v_GK5uJ2fAKoO36bpGgcAHIVV2lgBWJOsuLxmnQjjQDcVsBycZCuuLalvTzl0ODO-RTp8VMXZ5Fcf1oH0B3JZG0aiqyp_sfbeHT97qdOQ","e":"AQAB"},"attributes":{"enabled":true,"created":1593086802,"updated":1593086802,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90}}, [
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
  '02cd00e3-c5a9-4227-8ee2-d0c99b280497',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 12:06:42 GMT',
  'Content-Length',
  '920'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/backupRestoreKeyName-canrecoveradeletedkey-')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: backupRestoreKeyName-canrecoveradeletedkey-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '127',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '50d332df-9952-458b-ad88-23a908b6decc',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 12:06:42 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/backupRestoreKeyName-canrecoveradeletedkey-')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: backupRestoreKeyName-canrecoveradeletedkey-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '127',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'cd727cf8-e473-44b6-884a-833c2fe30078',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 12:06:42 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/localCryptoKeyName-RSA15-8230843657460811')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: localCryptoKeyName-RSA15-8230843657460811"}}, [
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
  'westus',
  'x-ms-request-id',
  '196537cd-5052-4077-94e5-74a7854fb4b7',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 12:06:43 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/backupRestoreKeyName-canrecoveradeletedkey-')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: backupRestoreKeyName-canrecoveradeletedkey-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '127',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '6495ae33-aba6-42ee-925b-bb5211302d08',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 12:06:44 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/localCryptoKeyName-RSA15-8230843657460811')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: localCryptoKeyName-RSA15-8230843657460811"}}, [
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
  'westus',
  'x-ms-request-id',
  'a246abd3-90bc-4404-add2-a4b522e27e68',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 12:06:45 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/backupRestoreKeyName-canrecoveradeletedkey-')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: backupRestoreKeyName-canrecoveradeletedkey-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '127',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '2f0438de-3a4b-4042-aab6-566605c20116',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 12:06:45 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/localCryptoKeyName-RSA15-8230843657460811')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: localCryptoKeyName-RSA15-8230843657460811"}}, [
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
  'westus',
  'x-ms-request-id',
  '9e77d5d6-7599-41ac-a5fc-466502e6b444',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 12:06:48 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/backupRestoreKeyName-canrecoveradeletedkey-')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: backupRestoreKeyName-canrecoveradeletedkey-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '127',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '9391db1a-593d-461b-a189-f9625fd27ff1',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 12:06:47 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/localCryptoKeyName-RSA15-8230843657460811')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: localCryptoKeyName-RSA15-8230843657460811"}}, [
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
  'westus',
  'x-ms-request-id',
  '118faa8f-2d07-4f03-b2a1-8c4c5722370b',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 12:06:49 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/backupRestoreKeyName-canrecoveradeletedkey-')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: backupRestoreKeyName-canrecoveradeletedkey-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '127',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '30e0a3d3-0d21-4e19-8866-b0999d1e1d72',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 12:06:50 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/localCryptoKeyName-RSA15-8230843657460811')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: localCryptoKeyName-RSA15-8230843657460811"}}, [
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
  'westus',
  'x-ms-request-id',
  '30420af6-8772-4357-8ce9-f17dd5ab5502',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 12:06:51 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/backupRestoreKeyName-canrecoveradeletedkey-')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: backupRestoreKeyName-canrecoveradeletedkey-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '127',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'b6d72812-6b65-46f4-93ae-a4604c9fa108',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 12:06:52 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/localCryptoKeyName-RSA15-8230843657460811')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: localCryptoKeyName-RSA15-8230843657460811"}}, [
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
  'westus',
  'x-ms-request-id',
  '4a5d1726-1f9f-4691-afa3-88ba15b4adea',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 12:06:53 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/backupRestoreKeyName-canrecoveradeletedkey-')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: backupRestoreKeyName-canrecoveradeletedkey-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '127',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '14561cda-86d8-4738-b7cd-bacaa7be5b8f',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 12:06:54 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/localCryptoKeyName-RSA15-8230843657460811')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: localCryptoKeyName-RSA15-8230843657460811"}}, [
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
  'westus',
  'x-ms-request-id',
  'ea405b6b-a299-4d88-983d-6f64c6c74349',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 12:06:55 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/backupRestoreKeyName-canrecoveradeletedkey-')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: backupRestoreKeyName-canrecoveradeletedkey-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '127',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '000d3d02-22f6-4398-857b-5d3bdbc76fb2',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 12:06:55 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/localCryptoKeyName-RSA15-8230843657460811')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: localCryptoKeyName-RSA15-8230843657460811"}}, [
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
  'westus',
  'x-ms-request-id',
  '3ece13b0-0cfd-4e25-b99b-46ac72937283',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 12:06:58 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/backupRestoreKeyName-canrecoveradeletedkey-')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: backupRestoreKeyName-canrecoveradeletedkey-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '127',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '019cdae7-7ae9-489c-8700-2f6874afd8b9',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 12:06:58 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/localCryptoKeyName-RSA15-8230843657460811')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/localCryptoKeyName-RSA15-8230843657460811","deletedDate":1593086801,"scheduledPurgeDate":1600862801,"key":{"kid":"https://keyvault_name.vault.azure.net/keys/localCryptoKeyName-RSA15-8230843657460811/e7fd491043bc42eca040cb4589a5acf1","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"vh3qBVefNKXtIvV-wNuucBaQcimraePIxeM2zQzD30fkIkmABpwDfJx3RpcTij_mfVQjuSUrBZi29t7jq_hnGrW-6xkKbKOF9232AuScO2kPNvYBCistGEMk5VDC1nfZjv_8_GGHtuJKQ5WaTIq9SJW2ZsIq1Chul3IBu49FNLd2cQLqhdVwa3p5kwAUKhbn-bRwX-_wBugYcE2hUCR3z3o1Ev1JndSzIidTvIFJJhuqKn42maQdwOyuEwbsVE_3DR2QbeMPzirecxl5WyRDIwoWpMLK3peSBWDUjb-pCpGDP5GQP9tx6GbJL1gz9W-Urh3OczxeBW6rXKll-io2rQ","e":"AQAB"},"attributes":{"enabled":true,"created":1592610385,"updated":1592610385,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90}}, [
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
  '47c4fc3a-0688-4a1b-a971-b45a91c6a8a8',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 12:07:00 GMT',
  'Content-Length',
  '884'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedkeys/localCryptoKeyName-RSA15-8230843657460811')
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
  'a766b215-208e-4c77-9def-65c51bcc4c66',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 12:07:00 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/keys/localCryptoKeyName-RSA15-9662522717269271')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/localCryptoKeyName-RSA15-9662522717269271","deletedDate":1593086820,"scheduledPurgeDate":1600862820,"key":{"kid":"https://keyvault_name.vault.azure.net/keys/localCryptoKeyName-RSA15-9662522717269271/47ff1a67c0f04814a71764be57b552aa","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"t85fYcnvQMqVmS61Z6N18JgC462Vp8oZU7cKmeFqW2tS4ZBRvFGlrDeBjz5O68xmKJ4Mf8y7fj-3DDGRuJIadqghNpvkD522KFd6tH42n6Mj3dW3Jys9Z56QKvCVlMZz-MZnnwwU30fe-bPFbpRpQ9WKawa67qjg7_kw5ROPBL5dBziBYdJj7xKwjTton_M-5M73gMkcS0esQtbJngf3Ln1mHo5OQdoy3oo4-CDvNlGGkKPHnfQLAlpgUHUn43A2wJvmxVmgk_H1M7A2gnMSsmSCL02IjuCyGUXO4AU8ZSxRfVbaok8X6uwoiC8OU7aP_gTkO53ZDhq1fCJBCF_DBw","e":"AQAB"},"attributes":{"enabled":true,"created":1592659792,"updated":1592659792,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90}}, [
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
  'da4ea949-a8b0-497a-92f7-c959d4ee3032',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 12:07:00 GMT',
  'Content-Length',
  '884'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/localCryptoKeyName-RSA15-9662522717269271')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: localCryptoKeyName-RSA15-9662522717269271"}}, [
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
  'westus',
  'x-ms-request-id',
  'ab226c65-f52d-4206-ab18-21dbe4e75cdb',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 12:07:00 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/localCryptoKeyName-RSA15-9662522717269271')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: localCryptoKeyName-RSA15-9662522717269271"}}, [
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
  'westus',
  'x-ms-request-id',
  '35bc0b5e-3362-40bc-81a1-8fcd2d87222c',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 12:07:00 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/backupRestoreKeyName-canrecoveradeletedkey-')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/backupRestoreKeyName-canrecoveradeletedkey-","deletedDate":1593086802,"scheduledPurgeDate":1600862802,"key":{"kid":"https://keyvault_name.vault.azure.net/keys/backupRestoreKeyName-canrecoveradeletedkey-/fe31e3399bce4ae8b167f3a1f4b392c5","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"6QQ0BywRLIir5TSZl5fQwcPQU9bEIohWSPZDQX6Z2FtKglaGBysztxXduXdqjjfZ1BxfjE9XqsE34ETVNyk0CPKLIbw3ppFJS0f-dVvC832otWa1VOmX4HNTmuI6HlU870g8pQkL6hGHvPueXgkftAGTHA2bltccS82Q5hkWfNY-B2vhE5OHh8ud1WaVXHBLyqsmyMSJ7VNtYC66orUwK6-FP71WgyuGPMiki0pyLL_5-v_GK5uJ2fAKoO36bpGgcAHIVV2lgBWJOsuLxmnQjjQDcVsBycZCuuLalvTzl0ODO-RTp8VMXZ5Fcf1oH0B3JZG0aiqyp_sfbeHT97qdOQ","e":"AQAB"},"attributes":{"enabled":true,"created":1593086802,"updated":1593086802,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90}}, [
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
  '6530c2bc-f96a-40d7-8bf4-d4b20a875de5',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 12:07:00 GMT',
  'Content-Length',
  '920'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/keys/backupRestoreKeyName-canrecoveradeletedkey-/')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"A key with (name/id) backupRestoreKeyName-canrecoveradeletedkey- was not found in this key vault. If you recently deleted this key you may be able to recover it using the correct recovery command. For help resolving this issue, please see https://go.microsoft.com/fwlink/?linkid=2125182"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '347',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '02b4411f-9aaf-45b4-befe-2b0c931992a8',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 12:07:00 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/deletedkeys/backupRestoreKeyName-canrecoveradeletedkey-/recover')
  .query(true)
  .reply(200, {"key":{"kid":"https://keyvault_name.vault.azure.net/keys/backupRestoreKeyName-canrecoveradeletedkey-/fe31e3399bce4ae8b167f3a1f4b392c5","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"6QQ0BywRLIir5TSZl5fQwcPQU9bEIohWSPZDQX6Z2FtKglaGBysztxXduXdqjjfZ1BxfjE9XqsE34ETVNyk0CPKLIbw3ppFJS0f-dVvC832otWa1VOmX4HNTmuI6HlU870g8pQkL6hGHvPueXgkftAGTHA2bltccS82Q5hkWfNY-B2vhE5OHh8ud1WaVXHBLyqsmyMSJ7VNtYC66orUwK6-FP71WgyuGPMiki0pyLL_5-v_GK5uJ2fAKoO36bpGgcAHIVV2lgBWJOsuLxmnQjjQDcVsBycZCuuLalvTzl0ODO-RTp8VMXZ5Fcf1oH0B3JZG0aiqyp_sfbeHT97qdOQ","e":"AQAB"},"attributes":{"enabled":true,"created":1593086802,"updated":1593086802,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90}}, [
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
  '10e9291c-c38a-4713-b82f-08bd2e6e6f66',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 12:07:00 GMT',
  'Content-Length',
  '733'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/keys/backupRestoreKeyName-canrecoveradeletedkey-/')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"A key with (name/id) backupRestoreKeyName-canrecoveradeletedkey- was not found in this key vault. If you recently deleted this key you may be able to recover it using the correct recovery command. For help resolving this issue, please see https://go.microsoft.com/fwlink/?linkid=2125182"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '347',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '130217ae-686f-429b-ab49-40e4ffc1ecea',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 12:07:00 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/keys/backupRestoreKeyName-canrecoveradeletedkey-/')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"A key with (name/id) backupRestoreKeyName-canrecoveradeletedkey- was not found in this key vault. If you recently deleted this key you may be able to recover it using the correct recovery command. For help resolving this issue, please see https://go.microsoft.com/fwlink/?linkid=2125182"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '347',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'cbcabf84-3e16-4a39-a353-a96a02a4e8e0',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 12:07:00 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/localCryptoKeyName-RSA15-9662522717269271')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: localCryptoKeyName-RSA15-9662522717269271"}}, [
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
  'westus',
  'x-ms-request-id',
  'cff93a19-8207-43f8-b4ef-c96aa9ff2d75',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 12:07:02 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/keys/backupRestoreKeyName-canrecoveradeletedkey-/')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"A key with (name/id) backupRestoreKeyName-canrecoveradeletedkey- was not found in this key vault. If you recently deleted this key you may be able to recover it using the correct recovery command. For help resolving this issue, please see https://go.microsoft.com/fwlink/?linkid=2125182"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '347',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '10f13016-bb4a-4a44-8431-bd8301e8fe34',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 12:07:02 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/localCryptoKeyName-RSA15-9662522717269271')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: localCryptoKeyName-RSA15-9662522717269271"}}, [
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
  'westus',
  'x-ms-request-id',
  'efbb674f-1671-4c28-86cc-4de021882aec',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 12:07:04 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/keys/backupRestoreKeyName-canrecoveradeletedkey-/')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"A key with (name/id) backupRestoreKeyName-canrecoveradeletedkey- was not found in this key vault. If you recently deleted this key you may be able to recover it using the correct recovery command. For help resolving this issue, please see https://go.microsoft.com/fwlink/?linkid=2125182"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '347',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '77741e52-e7ad-434f-b315-aaca8e983632',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 12:07:04 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/localCryptoKeyName-RSA15-9662522717269271')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: localCryptoKeyName-RSA15-9662522717269271"}}, [
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
  'westus',
  'x-ms-request-id',
  '1b9c2eb1-591a-4232-a8c0-b2eb9bbd0be5',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 12:07:06 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/keys/backupRestoreKeyName-canrecoveradeletedkey-/')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"A key with (name/id) backupRestoreKeyName-canrecoveradeletedkey- was not found in this key vault. If you recently deleted this key you may be able to recover it using the correct recovery command. For help resolving this issue, please see https://go.microsoft.com/fwlink/?linkid=2125182"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '347',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '0199c8a7-57d1-4bb1-a6b8-f066e24d8786',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 12:07:06 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/localCryptoKeyName-RSA15-9662522717269271')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: localCryptoKeyName-RSA15-9662522717269271"}}, [
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
  'westus',
  'x-ms-request-id',
  'a7bfa89b-ac0a-4665-bd31-470ed3cda3cb',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 12:07:08 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/keys/backupRestoreKeyName-canrecoveradeletedkey-/')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"A key with (name/id) backupRestoreKeyName-canrecoveradeletedkey- was not found in this key vault. If you recently deleted this key you may be able to recover it using the correct recovery command. For help resolving this issue, please see https://go.microsoft.com/fwlink/?linkid=2125182"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '347',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'e9d5bd85-6c71-4e45-aa48-16d79f15ab05',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 12:07:08 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/localCryptoKeyName-RSA15-9662522717269271')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: localCryptoKeyName-RSA15-9662522717269271"}}, [
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
  'westus',
  'x-ms-request-id',
  '84fca601-1eda-4f69-ac2f-49678ca17e47',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 12:07:10 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/keys/backupRestoreKeyName-canrecoveradeletedkey-/')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"A key with (name/id) backupRestoreKeyName-canrecoveradeletedkey- was not found in this key vault. If you recently deleted this key you may be able to recover it using the correct recovery command. For help resolving this issue, please see https://go.microsoft.com/fwlink/?linkid=2125182"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '347',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '0c6f06bd-3a56-4b46-a7ca-9e24a63c905c',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 12:07:11 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/localCryptoKeyName-RSA15-9662522717269271')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: localCryptoKeyName-RSA15-9662522717269271"}}, [
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
  'westus',
  'x-ms-request-id',
  '432f21e3-0123-4708-9525-f311e852120a',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 12:07:12 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/keys/backupRestoreKeyName-canrecoveradeletedkey-/')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"A key with (name/id) backupRestoreKeyName-canrecoveradeletedkey- was not found in this key vault. If you recently deleted this key you may be able to recover it using the correct recovery command. For help resolving this issue, please see https://go.microsoft.com/fwlink/?linkid=2125182"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '347',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'f26d683d-14cf-4403-a5b3-97ed225a9dc0',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 12:07:12 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/localCryptoKeyName-RSA15-9662522717269271')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: localCryptoKeyName-RSA15-9662522717269271"}}, [
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
  'westus',
  'x-ms-request-id',
  '4d40afa8-40f2-4a2d-9ea0-a6abf6afb9ce',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 12:07:14 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/keys/backupRestoreKeyName-canrecoveradeletedkey-/')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"A key with (name/id) backupRestoreKeyName-canrecoveradeletedkey- was not found in this key vault. If you recently deleted this key you may be able to recover it using the correct recovery command. For help resolving this issue, please see https://go.microsoft.com/fwlink/?linkid=2125182"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '347',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '59d25987-feb6-4a57-b9e4-044080010d02',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 12:07:14 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/localCryptoKeyName-RSA15-9662522717269271')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: localCryptoKeyName-RSA15-9662522717269271"}}, [
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
  'westus',
  'x-ms-request-id',
  '7fc83adf-e592-413a-88bd-180d6d251f26',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 12:07:16 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/keys/backupRestoreKeyName-canrecoveradeletedkey-/')
  .query(true)
  .reply(200, {"key":{"kid":"https://keyvault_name.vault.azure.net/keys/backupRestoreKeyName-canrecoveradeletedkey-/fe31e3399bce4ae8b167f3a1f4b392c5","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"6QQ0BywRLIir5TSZl5fQwcPQU9bEIohWSPZDQX6Z2FtKglaGBysztxXduXdqjjfZ1BxfjE9XqsE34ETVNyk0CPKLIbw3ppFJS0f-dVvC832otWa1VOmX4HNTmuI6HlU870g8pQkL6hGHvPueXgkftAGTHA2bltccS82Q5hkWfNY-B2vhE5OHh8ud1WaVXHBLyqsmyMSJ7VNtYC66orUwK6-FP71WgyuGPMiki0pyLL_5-v_GK5uJ2fAKoO36bpGgcAHIVV2lgBWJOsuLxmnQjjQDcVsBycZCuuLalvTzl0ODO-RTp8VMXZ5Fcf1oH0B3JZG0aiqyp_sfbeHT97qdOQ","e":"AQAB"},"attributes":{"enabled":true,"created":1593086802,"updated":1593086802,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90}}, [
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
  '133ec54e-412c-47ec-8c33-f50fb51e42f7',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 12:07:16 GMT',
  'Content-Length',
  '733'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/keys/backupRestoreKeyName-canrecoveradeletedkey-/')
  .query(true)
  .reply(200, {"key":{"kid":"https://keyvault_name.vault.azure.net/keys/backupRestoreKeyName-canrecoveradeletedkey-/fe31e3399bce4ae8b167f3a1f4b392c5","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"6QQ0BywRLIir5TSZl5fQwcPQU9bEIohWSPZDQX6Z2FtKglaGBysztxXduXdqjjfZ1BxfjE9XqsE34ETVNyk0CPKLIbw3ppFJS0f-dVvC832otWa1VOmX4HNTmuI6HlU870g8pQkL6hGHvPueXgkftAGTHA2bltccS82Q5hkWfNY-B2vhE5OHh8ud1WaVXHBLyqsmyMSJ7VNtYC66orUwK6-FP71WgyuGPMiki0pyLL_5-v_GK5uJ2fAKoO36bpGgcAHIVV2lgBWJOsuLxmnQjjQDcVsBycZCuuLalvTzl0ODO-RTp8VMXZ5Fcf1oH0B3JZG0aiqyp_sfbeHT97qdOQ","e":"AQAB"},"attributes":{"enabled":true,"created":1593086802,"updated":1593086802,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90}}, [
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
  'e78228ae-83b5-4678-80c1-51eb2b2f5eed',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 12:07:16 GMT',
  'Content-Length',
  '733'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/keys/backupRestoreKeyName-canrecoveradeletedkey-')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/backupRestoreKeyName-canrecoveradeletedkey-","deletedDate":1593086837,"scheduledPurgeDate":1600862837,"key":{"kid":"https://keyvault_name.vault.azure.net/keys/backupRestoreKeyName-canrecoveradeletedkey-/fe31e3399bce4ae8b167f3a1f4b392c5","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"6QQ0BywRLIir5TSZl5fQwcPQU9bEIohWSPZDQX6Z2FtKglaGBysztxXduXdqjjfZ1BxfjE9XqsE34ETVNyk0CPKLIbw3ppFJS0f-dVvC832otWa1VOmX4HNTmuI6HlU870g8pQkL6hGHvPueXgkftAGTHA2bltccS82Q5hkWfNY-B2vhE5OHh8ud1WaVXHBLyqsmyMSJ7VNtYC66orUwK6-FP71WgyuGPMiki0pyLL_5-v_GK5uJ2fAKoO36bpGgcAHIVV2lgBWJOsuLxmnQjjQDcVsBycZCuuLalvTzl0ODO-RTp8VMXZ5Fcf1oH0B3JZG0aiqyp_sfbeHT97qdOQ","e":"AQAB"},"attributes":{"enabled":true,"created":1593086802,"updated":1593086802,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90}}, [
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
  '59eb829e-0530-47f4-932f-df09f5ff540e',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 12:07:17 GMT',
  'Content-Length',
  '920'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/backupRestoreKeyName-canrecoveradeletedkey-')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: backupRestoreKeyName-canrecoveradeletedkey-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '127',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'b0fe7aac-3380-4fe5-a027-7368cb994c88',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 12:07:17 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/backupRestoreKeyName-canrecoveradeletedkey-')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: backupRestoreKeyName-canrecoveradeletedkey-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '127',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'f2d3d502-371d-4e64-8850-3da4bf2fa1a5',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 12:07:17 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/localCryptoKeyName-RSA15-9662522717269271')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/localCryptoKeyName-RSA15-9662522717269271","deletedDate":1593086820,"scheduledPurgeDate":1600862820,"key":{"kid":"https://keyvault_name.vault.azure.net/keys/localCryptoKeyName-RSA15-9662522717269271/47ff1a67c0f04814a71764be57b552aa","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"t85fYcnvQMqVmS61Z6N18JgC462Vp8oZU7cKmeFqW2tS4ZBRvFGlrDeBjz5O68xmKJ4Mf8y7fj-3DDGRuJIadqghNpvkD522KFd6tH42n6Mj3dW3Jys9Z56QKvCVlMZz-MZnnwwU30fe-bPFbpRpQ9WKawa67qjg7_kw5ROPBL5dBziBYdJj7xKwjTton_M-5M73gMkcS0esQtbJngf3Ln1mHo5OQdoy3oo4-CDvNlGGkKPHnfQLAlpgUHUn43A2wJvmxVmgk_H1M7A2gnMSsmSCL02IjuCyGUXO4AU8ZSxRfVbaok8X6uwoiC8OU7aP_gTkO53ZDhq1fCJBCF_DBw","e":"AQAB"},"attributes":{"enabled":true,"created":1592659792,"updated":1592659792,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90}}, [
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
  '4ab2cf3e-ebb1-4208-844b-ca2b36a3755d',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 12:07:19 GMT',
  'Content-Length',
  '884'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedkeys/localCryptoKeyName-RSA15-9662522717269271')
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
  '239f0af8-79e9-49b2-ae6e-9e9bcc64017f',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 12:07:18 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/keys/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-00038918000473020520')
  .query(true)
  .reply(403, {"error":{"code":"Forbidden","message":"Operation \"delete\" is not allowed as this object's lifetime is managed by Key Vault.","innererror":{"code":"KeyManagedByKeyVault"}}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '174',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '2d63daf1-1605-484f-85ba-321b5260847e',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 12:07:19 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/keys')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/keys?api-version=7.1&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExODghTURBd01EazNJV3RsZVM5TlJWSkhSVU5GVWxSSlJrbERRVlJGVGtGTlJTMURRVTVKVFZCUFVsUkJRMFZTVkVsR1NVTkJWRVZHVWs5TlFVTkZVbFJKUmtsRFFWUkZVMEpCVTBVMk5GTkZRMUpGVkZaQlRGVkZMVE0yTmpVNU9ETTRNRFkzT1RrME1qQWhNREF3TURJNElUazVPVGt0TVRJdE16RlVNak02TlRrNk5Ua3VPVGs1T1RrNU9Wb2giLCJUYXJnZXRMb2NhdGlvbiI6MH0"}, [
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
  '89059b87-0ca8-48bc-b330-368cf3cef763',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 12:07:19 GMT',
  'Content-Length',
  '420'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/backupRestoreKeyName-canrecoveradeletedkey-')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: backupRestoreKeyName-canrecoveradeletedkey-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '127',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'cea896fd-df92-4655-a1a9-c15b61de7a09',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 12:07:19 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/keys')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/keys?api-version=7.1&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExOTIhTURBd01EazRJV3RsZVM5TlJWSkhSVU5GVWxSSlJrbERRVlJGVGtGTlJTMURRVTVKVFZCUFVsUkJRMFZTVkVsR1NVTkJWRVZHVWs5TlFVTkZVbFJKUmtsRFFWUkZVMEpCVTBVMk5GTkZRMUpGVkZaQlRGVkZMVGcyTWpNMk1URTJNekV4TURNNU1Ea3hJVEF3TURBeU9DRTVPVGs1TFRFeUxUTXhWREl6T2pVNU9qVTVMams1T1RrNU9UbGFJUS0tIiwiVGFyZ2V0TG9jYXRpb24iOjB9"}, [
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
  '51861ca3-172b-4a8f-bed2-9fd0dcef80e9',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 12:07:19 GMT',
  'Content-Length',
  '425'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/keys')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/keys?api-version=7.1&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExNTYhTURBd01EY3pJV3RsZVM5TlJWSkhSVU5GVWxSSlJrbERRVlJGVGtGTlJTMURRVTVOUlZKSFJVRlRSVXhHVTBsSFRrVkVRMFZTVkVsR1NVTkJWRVV0TURZek1UVXpORE13T0RJNU5UTXlNamtoTURBd01ESTRJVGs1T1RrdE1USXRNekZVTWpNNk5UazZOVGt1T1RrNU9UazVPVm9oIiwiVGFyZ2V0TG9jYXRpb24iOjB9"}, [
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
  '986a6d96-b831-410d-8059-9bae7f53523a',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 12:07:19 GMT',
  'Content-Length',
  '377'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/keys')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/keys?api-version=7.1&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExNTYhTURBd01EY3pJV3RsZVM5U1JVTlBWa1ZTUTBWU1ZFbEdTVU5CVkVWT1FVMUZMVU5CVGtGQ1QxSlVRMUpGUVZSSlRrZEJRMFZTVkVsR1NVTkJWRVV0TXpVNU9USXdNelUwTmpVNU9EazFORGNoTURBd01ESTRJVGs1T1RrdE1USXRNekZVTWpNNk5UazZOVGt1T1RrNU9UazVPVm9oIiwiVGFyZ2V0TG9jYXRpb24iOjB9"}, [
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
  '8e63b385-aea5-4aa2-abbf-5e357b02fdeb',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 12:07:20 GMT',
  'Content-Length',
  '377'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/keys')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/keys?api-version=7.1&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExNTYhTURBd01EY3lJV3RsZVM5U1JVTlBWa1ZTUTBWU1ZFbEdTVU5CVkVWT1FVMUZMVU5CVGtGQ1QxSlVRMUpGUVZSSlRrZEJRMFZTVkVsR1NVTkJWRVV0T1RFMk5UWTJNREV4T1RVNU5qQTNNeUV3TURBd01qZ2hPVGs1T1MweE1pMHpNVlF5TXpvMU9UbzFPUzQ1T1RrNU9UazVXaUUtIiwiVGFyZ2V0TG9jYXRpb24iOjB9"}, [
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
  'affc5806-e989-4b5b-ae26-dd58418742be',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 12:07:20 GMT',
  'Content-Length',
  '377'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/keys')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/keys?api-version=7.1&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExNDghTURBd01EWTJJV3RsZVM5U1JVTlBWa1ZTUTBWU1ZFbEdTVU5CVkVWT1FVMUZMVU5CVGtOU1JVRlVSVUZEUlZKVVNVWkpRMEZVUlMwek1ETTBPVGN6TkRBME9URXdPVEExTmlFd01EQXdNamdoT1RrNU9TMHhNaTB6TVZReU16bzFPVG8xT1M0NU9UazVPVGs1V2lFLSIsIlRhcmdldExvY2F0aW9uIjowfQ"}, [
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
  'a2941008-2469-4f61-a403-57677d3ba701',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 12:07:20 GMT',
  'Content-Length',
  '367'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/keys')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/keys?api-version=7.1&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExNDQhTURBd01EWTBJV3RsZVM5U1JVTlBWa1ZTUTBWU1ZFbEdTVU5CVkVWT1FVMUZMVU5CVGtOU1JVRlVSVUZEUlZKVVNVWkpRMEZVUlMwMU16azROell4TnpreE5qZzRORFFoTURBd01ESTRJVGs1T1RrdE1USXRNekZVTWpNNk5UazZOVGt1T1RrNU9UazVPVm9oIiwiVGFyZ2V0TG9jYXRpb24iOjB9"}, [
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
  'b37329c7-8505-4610-88c3-5cf46e62f6e5',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 12:07:21 GMT',
  'Content-Length',
  '361'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/backupRestoreKeyName-canrecoveradeletedkey-')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: backupRestoreKeyName-canrecoveradeletedkey-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '127',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'b50c4c9f-1a51-49e5-87a0-e87c39b6e656',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 12:07:21 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/keys')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/keys?api-version=7.1&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExNzIhTURBd01EZzFJV3RsZVM5U1JVTlBWa1ZTUTBWU1ZFbEdTVU5CVkVWT1FVMUZMVU5CVGtOU1JVRlVSVkpGUVVSQlRrUkVSVXhGVkVWQlEwVlNWRWxHU1VOQlZFVkpVMU5WUlZJdE1EVTVPREEwTlRFME5qQXpOamd4TVRraE1EQXdNREk0SVRrNU9Ua3RNVEl0TXpGVU1qTTZOVGs2TlRrdU9UazVPVGs1T1ZvaCIsIlRhcmdldExvY2F0aW9uIjowfQ"}, [
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
  '6c1a06d0-6cc7-45e9-ac12-88a1bc1928f9',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 12:07:21 GMT',
  'Content-Length',
  '399'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/keys')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/keys?api-version=7.1&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExNzIhTURBd01EZzBJV3RsZVM5U1JVTlBWa1ZTUTBWU1ZFbEdTVU5CVkVWT1FVMUZMVU5CVGtOU1JVRlVSVkpGUVVSQlRrUkVSVXhGVkVWQlEwVlNWRWxHU1VOQlZFVkpVMU5WUlZJdE9EQXlNRFEzT0RVME1qTTBOalF6TmlFd01EQXdNamdoT1RrNU9TMHhNaTB6TVZReU16bzFPVG8xT1M0NU9UazVPVGs1V2lFLSIsIlRhcmdldExvY2F0aW9uIjowfQ"}, [
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
  '4aacd937-a056-40c0-8e29-e82f806e36f9',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 12:07:21 GMT',
  'Content-Length',
  '399'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/keys')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/keys?api-version=7.1&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExNDghTURBd01EWTFJV3RsZVM5U1JVTlBWa1ZTUTBWU1ZFbEdTVU5CVkVWT1FVMUZMVU5CVGtSRlRFVlVSVUZEUlZKVVNVWkpRMEZVUlMwek16Z3lNak15T0RrMU1EZ3dOamszSVRBd01EQXlPQ0U1T1RrNUxURXlMVE14VkRJek9qVTVPalU1TGprNU9UazVPVGxhSVEtLSIsIlRhcmdldExvY2F0aW9uIjowfQ"}, [
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
  'b0fa3adf-7b95-4c14-8464-cb4011acca13',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 12:07:21 GMT',
  'Content-Length',
  '367'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/keys')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/keys?api-version=7.1&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExODAhTURBd01Ea3hJV3RsZVM5U1JVTlBWa1ZTUTBWU1ZFbEdTVU5CVkVWT1FVMUZMVU5CVGtSRlRFVlVSVUZEUlZKVVNVWkpRMEZVUlZkSlZFaFNSVkZWUlZOVVQxQlVTVTlPVTFSSlRVVlBWVlF0TURnd05UWTVOakUwTnpRek9EQTVOelVoTURBd01ESTRJVGs1T1RrdE1USXRNekZVTWpNNk5UazZOVGt1T1RrNU9UazVPVm9oIiwiVGFyZ2V0TG9jYXRpb24iOjB9"}, [
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
  'e0d6a42c-ad4b-49fc-8b9f-02f58cdc5ee3',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 12:07:22 GMT',
  'Content-Length',
  '409'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/keys')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/keys?api-version=7.1&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExNjAhTURBd01EYzFJV3RsZVM5U1JVTlBWa1ZTUTBWU1ZFbEdTVU5CVkVWT1FVMUZMVU5CVGtSSlUwRkNURVZCUTBWU1ZFbEdTVU5CVkVWV1JWSlRTVTlPTFRBME5UQXpOamcwT1RBNE5UTXpORGM0TlNFd01EQXdNamdoT1RrNU9TMHhNaTB6TVZReU16bzFPVG8xT1M0NU9UazVPVGs1V2lFLSIsIlRhcmdldExvY2F0aW9uIjowfQ"}, [
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
  'ef172058-801d-453a-8761-f54cc8251421',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 12:07:22 GMT',
  'Content-Length',
  '383'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/keys')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/keys?api-version=7.1&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExNDQhTURBd01EWXlJV3RsZVM5U1JVTlBWa1ZTUTBWU1ZFbEdTVU5CVkVWT1FVMUZMVU5CVGtkRlZFRkRSVkpVU1VaSlEwRlVSUzAxT1RFNE56VTJPRFF4TVRFNU1UYzFJVEF3TURBeU9DRTVPVGs1TFRFeUxUTXhWREl6T2pVNU9qVTVMams1T1RrNU9UbGFJUS0tIiwiVGFyZ2V0TG9jYXRpb24iOjB9"}, [
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
  'dd6d8064-d2bc-4d36-ad68-9e29ba95b689',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 12:07:22 GMT',
  'Content-Length',
  '361'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/backupRestoreKeyName-canrecoveradeletedkey-')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: backupRestoreKeyName-canrecoveradeletedkey-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '127',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '536208e6-a9a0-4adb-908b-11c6d14a44fe',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 12:07:23 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/keys')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/keys?api-version=7.1&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExNjghTURBd01EZ3dJV3RsZVM5U1JVTlBWa1ZTUTBWU1ZFbEdTVU5CVkVWT1FVMUZMVU5CVGtkRlZFRkRSVkpVU1VaSlEwRlVSVk5UUlVOU1JWUkpUbEJGVFVaUFVrMUJWQzAwTURrMU1qazVPVFl4T1RJd05qY3hJVEF3TURBeU9DRTVPVGs1TFRFeUxUTXhWREl6T2pVNU9qVTVMams1T1RrNU9UbGFJUS0tIiwiVGFyZ2V0TG9jYXRpb24iOjB9"}, [
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
  '7a8dcfeb-1782-4a55-8b47-772d8353f1d0',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 12:07:24 GMT',
  'Content-Length',
  '393'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/keys')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/keys?api-version=7.1&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExNzIhTURBd01EZ3pJV3RsZVM5U1JVTlBWa1ZTUTBWU1ZFbEdTVU5CVkVWT1FVMUZMVU5CVGtkRlZFRkRSVkpVU1VaSlEwRlVSVk5UUlVOU1JWUkpUbEJMUTFNeE1rWlBVazFCVkMwNE5UY3dNRFExTWprNU1qTTVNRGMxSVRBd01EQXlPQ0U1T1RrNUxURXlMVE14VkRJek9qVTVPalU1TGprNU9UazVPVGxhSVEtLSIsIlRhcmdldExvY2F0aW9uIjowfQ"}, [
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
  '89e9c67c-ffcd-4f49-895e-10d600eeb22c',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 12:07:24 GMT',
  'Content-Length',
  '399'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/keys')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/keys?api-version=7.1&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExNTIhTURBd01EY3dJV3RsZVM5U1JVTlBWa1ZTUTBWU1ZFbEdTVU5CVkVWT1FVMUZMVU5CVGtkRlZFRkVSVXhGVkVWRVEwVlNWRWxHU1VOQlZFVXRNVE14T0RNMU1EVXlNamd4TnprNU1EUWhNREF3TURJNElUazVPVGt0TVRJdE16RlVNak02TlRrNk5Ua3VPVGs1T1RrNU9Wb2giLCJUYXJnZXRMb2NhdGlvbiI6MH0"}, [
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
  '6fa96b17-abf3-4ee7-903b-ddbaa9a99841',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 12:07:24 GMT',
  'Content-Length',
  '372'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/keys')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/keys?api-version=7.1&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExNDQhTURBd01EWTBJV3RsZVM5U1JVTlBWa1ZTUTBWU1ZFbEdTVU5CVkVWT1FVMUZMVU5CVGt4SlUxUkRSVkpVU1VaSlEwRlVSVk10TURZMU5EUTVOams0TXpZd09ESXpOekFoTURBd01ESTRJVGs1T1RrdE1USXRNekZVTWpNNk5UazZOVGt1T1RrNU9UazVPVm9oIiwiVGFyZ2V0TG9jYXRpb24iOjB9"}, [
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
  'da12989e-7f9b-4502-ad87-8f4594289b5c',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 12:07:25 GMT',
  'Content-Length',
  '361'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/keys')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/keys?api-version=7.1&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExNDghTURBd01EWTFJV3RsZVM5U1JVTlBWa1ZTUTBWU1ZFbEdTVU5CVkVWT1FVMUZMVU5CVGt4SlUxUkRSVkpVU1VaSlEwRlVSVk10TXpReU1qSTNPVGs0TWpjd09EUTBPVFF4SVRBd01EQXlPQ0U1T1RrNUxURXlMVE14VkRJek9qVTVPalU1TGprNU9UazVPVGxhSVEtLSIsIlRhcmdldExvY2F0aW9uIjowfQ"}, [
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
  'ae649a97-41ed-4faa-ba02-a0fa314daadc',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 12:07:25 GMT',
  'Content-Length',
  '367'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/keys')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/keys?api-version=7.1&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExNDQhTURBd01EWTBJV3RsZVM5U1JVTlBWa1ZTUTBWU1ZFbEdTVU5CVkVWT1FVMUZMVU5CVGt4SlUxUkRSVkpVU1VaSlEwRlVSVk10TmpZMk5qYzFPVFUyTWpnME5UTTVNakFoTURBd01ESTRJVGs1T1RrdE1USXRNekZVTWpNNk5UazZOVGt1T1RrNU9UazVPVm9oIiwiVGFyZ2V0TG9jYXRpb24iOjB9"}, [
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
  'da6c22bb-809f-444e-b8af-6c8eca5a8762',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 12:07:25 GMT',
  'Content-Length',
  '361'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/backupRestoreKeyName-canrecoveradeletedkey-')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: backupRestoreKeyName-canrecoveradeletedkey-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '127',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'e7983a75-7d5b-4343-ad27-1a3467f25676',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 12:07:25 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/keys')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/keys?api-version=7.1&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExNDQhTURBd01EWTBJV3RsZVM5U1JVTlBWa1ZTUTBWU1ZFbEdTVU5CVkVWT1FVMUZMVU5CVGt4SlUxUkRSVkpVU1VaSlEwRlVSVk10T1RVNU1UYzFOVEF5TVRJNU56STNPVEVoTURBd01ESTRJVGs1T1RrdE1USXRNekZVTWpNNk5UazZOVGt1T1RrNU9UazVPVm9oIiwiVGFyZ2V0TG9jYXRpb24iOjB9"}, [
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
  '3a271cb3-db92-49a6-900b-ad9af4c5e601',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 12:07:26 GMT',
  'Content-Length',
  '361'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/keys')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/keys?api-version=7.1&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExNTYhTURBd01EY3hJV3RsZVM5U1JVTlBWa1ZTUTBWU1ZFbEdTVU5CVkVWT1FVMUZMVU5CVGt4SlUxUkRSVkpVU1VaSlEwRlVSVk5DV1ZCQlIwVXRORFkyTkRrMk1EazRORGM1TVRNMU5UTXdJVEF3TURBeU9DRTVPVGs1TFRFeUxUTXhWREl6T2pVNU9qVTVMams1T1RrNU9UbGFJUS0tIiwiVGFyZ2V0TG9jYXRpb24iOjB9"}, [
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
  '6af52af8-20ee-4e15-a48d-5d622d18f20c',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 12:07:26 GMT',
  'Content-Length',
  '377'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/keys')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/keys?api-version=7.1&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExNTIhTURBd01EY3dJV3RsZVM5U1JVTlBWa1ZTUTBWU1ZFbEdTVU5CVkVWT1FVMUZMVU5CVGt4SlUxUkRSVkpVU1VaSlEwRlVSVk5DV1ZCQlIwVXROek0xTnpJeE5UazVNamN5TkRFME56RWhNREF3TURJNElUazVPVGt0TVRJdE16RlVNak02TlRrNk5Ua3VPVGs1T1RrNU9Wb2giLCJUYXJnZXRMb2NhdGlvbiI6MH0"}, [
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
  '662cb699-44fd-4046-96ca-fbd428509786',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 12:07:26 GMT',
  'Content-Length',
  '372'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/keys')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/keys?api-version=7.1&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExNTYhTURBd01EY3lJV3RsZVM5U1JVTlBWa1ZTUTBWU1ZFbEdTVU5CVkVWT1FVMUZMVU5CVGt4SlUxUkVSVXhGVkVWRVEwVlNWRWxHU1VOQlZFVlRMVEE1TmpFd05qRXlNVEkxTVRNeU5qRXlNQ0V3TURBd01qZ2hPVGs1T1MweE1pMHpNVlF5TXpvMU9UbzFPUzQ1T1RrNU9UazVXaUUtIiwiVGFyZ2V0TG9jYXRpb24iOjB9"}, [
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
  '58342cfd-c21b-4975-8a26-297413ee1164',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 12:07:27 GMT',
  'Content-Length',
  '377'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/keys')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/keys?api-version=7.1&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExNTYhTURBd01EY3hJV3RsZVM5U1JVTlBWa1ZTUTBWU1ZFbEdTVU5CVkVWT1FVMUZMVU5CVGt4SlUxUkVSVXhGVkVWRVEwVlNWRWxHU1VOQlZFVlRMVFU1TlRNek56Z3hPVGs0TVRRME9ETXhJVEF3TURBeU9DRTVPVGs1TFRFeUxUTXhWREl6T2pVNU9qVTVMams1T1RrNU9UbGFJUS0tIiwiVGFyZ2V0TG9jYXRpb24iOjB9"}, [
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
  '574960aa-1e7b-49c2-a651-10b06b9bbc30',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 12:07:27 GMT',
  'Content-Length',
  '377'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/backupRestoreKeyName-canrecoveradeletedkey-')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: backupRestoreKeyName-canrecoveradeletedkey-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '127',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '4e3e6695-3c9b-457e-b7d3-3b62d4512b02',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 12:07:27 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/keys')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/keys?api-version=7.1&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExNTYhTURBd01EY3hJV3RsZVM5U1JVTlBWa1ZTUTBWU1ZFbEdTVU5CVkVWT1FVMUZMVU5CVGt4SlUxUkVSVXhGVkVWRVEwVlNWRWxHU1VOQlZFVlRMVGcwT1RNNU5qazJORE15T1RBeE1URXdJVEF3TURBeU9DRTVPVGs1TFRFeUxUTXhWREl6T2pVNU9qVTVMams1T1RrNU9UbGFJUS0tIiwiVGFyZ2V0TG9jYXRpb24iOjB9"}, [
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
  '06b9cea9-f819-4173-8eca-5c64027368b8',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 12:07:27 GMT',
  'Content-Length',
  '377'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/keys')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/keys?api-version=7.1&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExNjQhTURBd01EYzRJV3RsZVM5U1JVTlBWa1ZTUTBWU1ZFbEdTVU5CVkVWT1FVMUZMVU5CVGt4SlUxUkVSVXhGVkVWRVEwVlNWRWxHU1VOQlZFVlRRbGxRUVVkRkxURXhNVFkyTURrMU9USTBPRGMzTmpJNE1TRXdNREF3TWpnaE9UazVPUzB4TWkwek1WUXlNem8xT1RvMU9TNDVPVGs1T1RrNVdpRS0iLCJUYXJnZXRMb2NhdGlvbiI6MH0"}, [
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
  '203ab8fc-e108-486a-8bf3-7f7e2f688c88',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 12:07:28 GMT',
  'Content-Length',
  '388'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/keys')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/keys?api-version=7.1&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExNjQhTURBd01EYzNJV3RsZVM5U1JVTlBWa1ZTUTBWU1ZFbEdTVU5CVkVWT1FVMUZMVU5CVGt4SlUxUkVSVXhGVkVWRVEwVlNWRWxHU1VOQlZFVlRRbGxRUVVkRkxUTXpOelUyTkRBeE9EVTRNamd6T1Rrd0lUQXdNREF5T0NFNU9UazVMVEV5TFRNeFZESXpPalU1T2pVNUxqazVPVGs1T1RsYUlRLS0iLCJUYXJnZXRMb2NhdGlvbiI6MH0"}, [
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
  'aa222da1-a590-4fb3-a7ed-968b0b6bca7d',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 12:07:28 GMT',
  'Content-Length',
  '388'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/keys')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/keys?api-version=7.1&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExNjQhTURBd01EYzNJV3RsZVM5U1JVTlBWa1ZTUTBWU1ZFbEdTVU5CVkVWT1FVMUZMVU5CVGt4SlUxUkVSVXhGVkVWRVEwVlNWRWxHU1VOQlZFVlRRbGxRUVVkRkxUazFNamt4TnpnMk9EYzJOemcxTlRJeElUQXdNREF5T0NFNU9UazVMVEV5TFRNeFZESXpPalU1T2pVNUxqazVPVGs1T1RsYUlRLS0iLCJUYXJnZXRMb2NhdGlvbiI6MH0"}, [
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
  '0e5dd47e-fc58-4802-a0fa-dc5a086fa4e9',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 12:07:28 GMT',
  'Content-Length',
  '388'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/keys')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/keys?api-version=7.1&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExNzYhTURBd01EZzRJV3RsZVM5U1JVTlBWa1ZTUTBWU1ZFbEdTVU5CVkVWT1FVMUZMVU5CVGxKRlFVUkRRVTVEUlV4QlRrUkVSVXhGVkVWQlEwVlNWRWxHU1VOQlZFVlRUMUJGVWtGVVNVOU9MVFl6TWpnNU1ETTNOVEkzT1RFeU1qSWhNREF3TURJNElUazVPVGt0TVRJdE16RlVNak02TlRrNk5Ua3VPVGs1T1RrNU9Wb2giLCJUYXJnZXRMb2NhdGlvbiI6MH0"}, [
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
  '92a267fa-cb75-48dc-86fe-93a889218516',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 12:07:28 GMT',
  'Content-Length',
  '404'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/keys')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/keys?api-version=7.1&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExNTYhTURBd01EY3pJV3RsZVM5U1JVTlBWa1ZTUTBWU1ZFbEdTVU5CVkVWT1FVMUZMVU5CVGxKRlEwOVdSVkpCUkVWTVJWUkZSRU5GVWxSSlJrbERRVlJGTFRneE1ETXhPRGszT0RZd05qTTNPRGNoTURBd01ESTRJVGs1T1RrdE1USXRNekZVTWpNNk5UazZOVGt1T1RrNU9UazVPVm9oIiwiVGFyZ2V0TG9jYXRpb24iOjB9"}, [
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
  'dd757475-0c5b-4b91-ac81-f88f42fc8f57',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 12:07:29 GMT',
  'Content-Length',
  '377'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/backupRestoreKeyName-canrecoveradeletedkey-')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: backupRestoreKeyName-canrecoveradeletedkey-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '127',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '59e12779-9594-45f5-8d24-b856158d6dc5',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 12:07:29 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/keys')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/keys?api-version=7.1&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExNDghTURBd01EWTJJV3RsZVM5U1JVTlBWa1ZTUTBWU1ZFbEdTVU5CVkVWT1FVMUZMVU5CVGxKRlUxUlBVa1ZCUTBWU1ZFbEdTVU5CVkVVdE5UWXlNREk0T0RBME1qUTJNekExTnlFd01EQXdNamdoT1RrNU9TMHhNaTB6TVZReU16bzFPVG8xT1M0NU9UazVPVGs1V2lFLSIsIlRhcmdldExvY2F0aW9uIjowfQ"}, [
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
  'a28400a1-be3b-454a-83d0-21002e3a53c9',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 12:07:29 GMT',
  'Content-Length',
  '367'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/keys')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/keys?api-version=7.1&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExNTYhTURBd01EY3hJV3RsZVM5U1JVTlBWa1ZTUTBWU1ZFbEdTVU5CVkVWT1FVMUZMVU5CVGxKRlUxVk5SVVpTVDAxQlUxUlBVRkJGUkZCUFRFeEZVaTB3T0RVM09UY3lNalV3TURjek9ETXpJVEF3TURBeU9DRTVPVGs1TFRFeUxUTXhWREl6T2pVNU9qVTVMams1T1RrNU9UbGFJUS0tIiwiVGFyZ2V0TG9jYXRpb24iOjB9"}, [
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
  '8ebdf5a7-cf21-4d27-ad14-d71b91eef629',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 12:07:29 GMT',
  'Content-Length',
  '377'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/keys')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/keys?api-version=7.1&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExNTYhTURBd01EY3lJV3RsZVM5U1JVTlBWa1ZTUTBWU1ZFbEdTVU5CVkVWT1FVMUZMVU5CVGxKRlUxVk5SVVpTVDAxQlUxUlBVRkJGUkZCUFRFeEZVaTB6TmpBME16azRPVGMzTlRNd01UazJOaUV3TURBd01qZ2hPVGs1T1MweE1pMHpNVlF5TXpvMU9UbzFPUzQ1T1RrNU9UazVXaUUtIiwiVGFyZ2V0TG9jYXRpb24iOjB9"}, [
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
  '29ba3cbb-9cee-4e3f-b74c-71f38da8ebd8',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 12:07:30 GMT',
  'Content-Length',
  '377'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/keys')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/keys?api-version=7.1&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExNTIhTURBd01EY3dJV3RsZVM5U1JVTlBWa1ZTUTBWU1ZFbEdTVU5CVkVWT1FVMUZMVU5CVGxKRlUxVk5SVVpTVDAxQlUxUlBVRkJGUkZCUFRFeEZVaTAzTkRBME1EazVNRFEwTkRFd05ERWhNREF3TURJNElUazVPVGt0TVRJdE16RlVNak02TlRrNk5Ua3VPVGs1T1RrNU9Wb2giLCJUYXJnZXRMb2NhdGlvbiI6MH0"}, [
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
  '9e7ca8ca-770b-42be-b405-812a3cdd8f25',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 12:07:30 GMT',
  'Content-Length',
  '372'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/keys')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/keys?api-version=7.1&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExNjghTURBd01EZ3dJV3RsZVM5U1JVTlBWa1ZTUTBWU1ZFbEdTVU5CVkVWT1FVMUZMVU5CVGxKRlZGSkpSVlpGUVV4TVZrVlNVMGxQVGxOUFJrRkRSVkpVU1VaSlEwRlVSUzB5TkRjM09EZzBNRFF4TXpjeU16STNJVEF3TURBeU9DRTVPVGs1TFRFeUxUTXhWREl6T2pVNU9qVTVMams1T1RrNU9UbGFJUS0tIiwiVGFyZ2V0TG9jYXRpb24iOjB9"}, [
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
  '649fa881-7dc3-4f6e-b6c8-69aadcaa8f2d',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 12:07:30 GMT',
  'Content-Length',
  '393'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/keys')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/keys?api-version=7.1&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExNjghTURBd01EZ3dJV3RsZVM5U1JVTlBWa1ZTUTBWU1ZFbEdTVU5CVkVWT1FVMUZMVU5CVGxKRlZGSkpSVlpGUVV4TVZrVlNVMGxQVGxOUFJrRkRSVkpVU1VaSlEwRlVSUzA1T0RFeE1UYzRPRFl5T1RBME1Ea3pJVEF3TURBeU9DRTVPVGs1TFRFeUxUTXhWREl6T2pVNU9qVTVMams1T1RrNU9UbGFJUS0tIiwiVGFyZ2V0TG9jYXRpb24iOjB9"}, [
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
  'c1ad5260-1872-4525-b3e4-38115f37dffa',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 12:07:31 GMT',
  'Content-Length',
  '393'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/keys')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/keys?api-version=7.1&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExODAhTURBd01Ea3dJV3RsZVM5U1JVTlBWa1ZTUTBWU1ZFbEdTVU5CVkVWT1FVMUZMVU5CVGxKRlZGSkpSVlpGVkVoRlRFRlVSVk5VVmtWU1UwbFBUazlHUVVORlVsUkpSa2xEUVZSRlZrRk1WVVV0TlRnd09ETTFOamd4TmpVME16STFOQ0V3TURBd01qZ2hPVGs1T1MweE1pMHpNVlF5TXpvMU9UbzFPUzQ1T1RrNU9UazVXaUUtIiwiVGFyZ2V0TG9jYXRpb24iOjB9"}, [
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
  '9648ca76-0339-4990-a51b-086e0e430e1a',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 12:07:31 GMT',
  'Content-Length',
  '409'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/backupRestoreKeyName-canrecoveradeletedkey-')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: backupRestoreKeyName-canrecoveradeletedkey-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '127',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '21c026df-eecd-4a09-8d19-b564081ed010',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 12:07:31 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/keys')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/keys?api-version=7.1&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExNTYhTURBd01EY3lJV3RsZVM5U1JVTlBWa1ZTUTBWU1ZFbEdTVU5CVkVWT1FVMUZMVU5CVGxWUVJFRlVSVUZEUlZKVVNVWkpRMEZVUlZOUVQweEpRMWt0TkRFeE9UWTBNakl4TkRNNU5qZzJOaUV3TURBd01qZ2hPVGs1T1MweE1pMHpNVlF5TXpvMU9UbzFPUzQ1T1RrNU9UazVXaUUtIiwiVGFyZ2V0TG9jYXRpb24iOjB9"}, [
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
  '2f1df2f7-a78c-460d-970a-3e09c39411e3',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 12:07:31 GMT',
  'Content-Length',
  '377'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/keys')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/keys?api-version=7.1&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExODAhTURBd01Ea3dJV3RsZVM5U1JVTlBWa1ZTUTBWU1ZFbEdTVU5CVkVWT1FVMUZMVU5CVGxWUVJFRlVSVU5GVWxSSlJrbERRVlJGVjBsVVNGSkZVVlZGVTFSUFVGUkpUMDVUVkVsTlJVOVZWQzB5TURVeE9ESTNOak0wTnpVd01EazROaUV3TURBd01qZ2hPVGs1T1MweE1pMHpNVlF5TXpvMU9UbzFPUzQ1T1RrNU9UazVXaUUtIiwiVGFyZ2V0TG9jYXRpb24iOjB9"}, [
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
  '4f559fd6-a52f-4bc2-a110-a9d80508ee60',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 12:07:32 GMT',
  'Content-Length',
  '409'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/keys')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/keys?api-version=7.1&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExNjAhTURBd01EYzBJV3RsZVM5U1JVTlBWa1ZTUTBWU1ZFbEdTVU5CVkVWT1FVMUZMVU5CVGxWUVJFRlVSVlJJUlZSQlIxTlBSa0ZEUlZKVVNVWkpRMEZVUlMweU5UUXdNemMyTnpZNE1EWTBORFkxSVRBd01EQXlPQ0U1T1RrNUxURXlMVE14VkRJek9qVTVPalU1TGprNU9UazVPVGxhSVEtLSIsIlRhcmdldExvY2F0aW9uIjowfQ"}, [
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
  'c9027624-4470-43cc-a73f-d16cd81596d7',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 12:07:32 GMT',
  'Content-Length',
  '383'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/keys')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/keys?api-version=7.1&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExNjAhTURBd01EYzBJV3RsZVM5U1JVTlBWa1ZTUTBWU1ZFbEdTVU5CVkVWT1FVMUZMVU5CVGxWUVJFRlVSVlJJUlZSQlIxTlBSa0ZEUlZKVVNVWkpRMEZVUlMwM05qazBPVFF6T0RVMU1EWTJPVEF5SVRBd01EQXlPQ0U1T1RrNUxURXlMVE14VkRJek9qVTVPalU1TGprNU9UazVPVGxhSVEtLSIsIlRhcmdldExvY2F0aW9uIjowfQ"}, [
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
  'c2ce3b65-d887-464c-bdfe-70622a172447',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 12:07:32 GMT',
  'Content-Length',
  '383'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/keys')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/keys?api-version=7.1&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExNjQhTURBd01EYzNJV3RsZVM5U1JVTlBWa1ZTUTBWU1ZFbEdTVU5CVkVWT1FVMUZMVU5CVGxkQlNWUlZUbFJKVEVGRFJWSlVTVVpKUTBGVVJVbFRRMUpGUVZSRlJDMDVNVGd4TkRVNE5EWXpNRFEyT1RBNElUQXdNREF5T0NFNU9UazVMVEV5TFRNeFZESXpPalU1T2pVNUxqazVPVGs1T1RsYUlRLS0iLCJUYXJnZXRMb2NhdGlvbiI6MH0"}, [
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
  '53ac2b30-2c27-49e4-a3b0-5a7c4f54831a',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 12:07:33 GMT',
  'Content-Length',
  '388'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/keys')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/keys?api-version=7.1&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExNjQhTURBd01EYzRJV3RsZVM5U1JVTlBWa1ZTUTBWU1ZFbEdTVU5CVkVWT1FVMUZMVU5CVGxkQlNWUlZUbFJKVEVGRFJWSlVTVVpKUTBGVVJVbFRSRVZNUlZSRlJDMHdNelUzTkRJek56UTFNREUzT0RVNU55RXdNREF3TWpnaE9UazVPUzB4TWkwek1WUXlNem8xT1RvMU9TNDVPVGs1T1RrNVdpRS0iLCJUYXJnZXRMb2NhdGlvbiI6MH0"}, [
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
  '16a3ed19-d655-4da7-9a58-32b4070d1d76',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 12:07:33 GMT',
  'Content-Length',
  '388'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/backupRestoreKeyName-canrecoveradeletedkey-')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: backupRestoreKeyName-canrecoveradeletedkey-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '127',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'e72da65b-1a06-4c17-aab0-d49321c17f19',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 12:07:33 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/keys')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/keys?api-version=7.1&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExNjQhTURBd01EYzVJV3RsZVM5U1JVTlBWa1ZTUTBWU1ZFbEdTVU5CVkVWT1FVMUZMVU5CVGxkQlNWUlZUbFJKVEVGRFJWSlVTVVpKUTBGVVJVbFRVa1ZEVDFaRlVrVkVMVEUzTXpZd09EWTBNekk0TURVMk9Ua2hNREF3TURJNElUazVPVGt0TVRJdE16RlVNak02TlRrNk5Ua3VPVGs1T1RrNU9Wb2giLCJUYXJnZXRMb2NhdGlvbiI6MH0"}, [
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
  'b890e282-3111-4f3a-a6f5-8ee235d1d4e6',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 12:07:33 GMT',
  'Content-Length',
  '388'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/keys')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/keys?api-version=7.1&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExNjQhTURBd01EYzRJV3RsZVM5U1JVTlBWa1ZTUTBWU1ZFbEdTVU5CVkVWT1FVMUZMVlZUU1U1SFFrVkhTVTVFUlV4RlZFVkRSVkpVU1VaSlEwRlVSVk5RVDB4TVJWSXROVE01TVRreE16ZzBNemc1TlRVNE9DRXdNREF3TWpnaE9UazVPUzB4TWkwek1WUXlNem8xT1RvMU9TNDVPVGs1T1RrNVdpRS0iLCJUYXJnZXRMb2NhdGlvbiI6MH0"}, [
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
  '31bc8392-b910-4cee-bb8f-6acd9eed1908',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 12:07:34 GMT',
  'Content-Length',
  '388'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/keys')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/keys?api-version=7.1&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExNTIhTURBd01EY3dJV3RsZVM5U1JVTlBWa1ZTUTBWU1ZFbEdTVU5CVkVWT1FVMUZMVlZUU1U1SFIwVlVSRVZNUlZSRlJFTkZVbFJKUmtsRFFWUkZMVFk0TmpVd09EUTFNREE0TmpFME1UWWhNREF3TURJNElUazVPVGt0TVRJdE16RlVNak02TlRrNk5Ua3VPVGs1T1RrNU9Wb2giLCJUYXJnZXRMb2NhdGlvbiI6MH0"}, [
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
  '9bdd8b61-433b-4cbe-81b9-ecf53c4106ee',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 12:07:34 GMT',
  'Content-Length',
  '372'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/keys')
  .query(true)
  .reply(200, {"value":[{"kid":"https://keyvault_name.vault.azure.net/keys/tracingKeyName-tracesthemethodsimportKey-9542721020543574","attributes":{"enabled":true,"created":1589471805,"updated":1589471805,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90}}],"nextLink":null}, [
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
  'cb416d83-496a-4d33-98dd-a0584dcd308a',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 12:07:34 GMT',
  'Content-Length',
  '276'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/keys/tracingKeyName-tracesthemethodsimportKey-9542721020543574')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/tracingKeyName-tracesthemethodsimportKey-9542721020543574","deletedDate":1593086855,"scheduledPurgeDate":1600862855,"key":{"kid":"https://keyvault_name.vault.azure.net/keys/tracingKeyName-tracesthemethodsimportKey-9542721020543574/0586ea0607a64b99b8213b28b98120cd","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"AKCRTQAjSsaDshtMFdW-2Ie9yVnC5Xr1Suc06PAHINd10nXkVSB-N4TO62ClCkZV3XKnqU0nHo7o95WaZpym53W_DiO62umRtFKdl4UotL2QUh0y3SZWeWuoK2u_x2aMj17rUFN0f9GZMZ0pqEQNCPRBLVJ_-TEe2nGCWSC0exxGsRqz6R1zFkB-icfzQPe4WjQELOUXQ7J9RxhAPTTHtDivYYG-BeTRHrmF04JT1_6b9T_C8bAC0i0teT-nmlBLarQtBJKATXBx1yegbPOoiTqlQrFQP4MrKWNxtnB9Tcbjcvj-Z9je0ckI_eRc4DvAhqcUh_p15Dqg4GeaoNIO_jU","e":"AQAB"},"attributes":{"enabled":true,"created":1589471805,"updated":1589471805,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90}}, [
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
  '7a12f2ca-aa11-422e-9655-30a346ef8322',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 12:07:34 GMT',
  'Content-Length',
  '917'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/tracingKeyName-tracesthemethodsimportKey-9542721020543574')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: tracingKeyName-tracesthemethodsimportKey-9542721020543574"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '125',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '301411d2-df69-42dc-95ac-fc226e6ec3e3',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 12:07:35 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/tracingKeyName-tracesthemethodsimportKey-9542721020543574')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: tracingKeyName-tracesthemethodsimportKey-9542721020543574"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '125',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '4d8c7d50-878c-4ece-8aae-6536afc65189',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 12:07:34 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/backupRestoreKeyName-canrecoveradeletedkey-')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/backupRestoreKeyName-canrecoveradeletedkey-","deletedDate":1593086837,"scheduledPurgeDate":1600862837,"key":{"kid":"https://keyvault_name.vault.azure.net/keys/backupRestoreKeyName-canrecoveradeletedkey-/fe31e3399bce4ae8b167f3a1f4b392c5","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"6QQ0BywRLIir5TSZl5fQwcPQU9bEIohWSPZDQX6Z2FtKglaGBysztxXduXdqjjfZ1BxfjE9XqsE34ETVNyk0CPKLIbw3ppFJS0f-dVvC832otWa1VOmX4HNTmuI6HlU870g8pQkL6hGHvPueXgkftAGTHA2bltccS82Q5hkWfNY-B2vhE5OHh8ud1WaVXHBLyqsmyMSJ7VNtYC66orUwK6-FP71WgyuGPMiki0pyLL_5-v_GK5uJ2fAKoO36bpGgcAHIVV2lgBWJOsuLxmnQjjQDcVsBycZCuuLalvTzl0ODO-RTp8VMXZ5Fcf1oH0B3JZG0aiqyp_sfbeHT97qdOQ","e":"AQAB"},"attributes":{"enabled":true,"created":1593086802,"updated":1593086802,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90}}, [
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
  '1fb2a5b6-683e-493d-9591-7ae701c7ad00',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 12:07:36 GMT',
  'Content-Length',
  '920'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedkeys/backupRestoreKeyName-canrecoveradeletedkey-')
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
  'a0876230-cca2-43b1-8bbf-2cbfe572860c',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 12:07:36 GMT'
]);

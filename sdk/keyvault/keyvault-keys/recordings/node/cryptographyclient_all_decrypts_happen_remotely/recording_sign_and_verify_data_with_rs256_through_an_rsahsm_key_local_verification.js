let nock = require('nock');

module.exports.hash = "c9b7369e700af2f456d31f3ed2ea758d";

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
  '4fe6538d-2f51-4ffc-909c-b4186cb597fd',
  'x-ms-keyvault-service-version',
  '1.2.191.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 05 Mar 2021 01:46:51 GMT'
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
  '24f63eab-1d73-4f8e-84cd-6fd5ced94100',
  'x-ms-ests-server',
  '2.1.11530.15 - SCUS ProdSlices',
  'Set-Cookie',
  'fpc=AkirakXcTFdPlbNAhLsJY-IsYtMRAQAAAIuE09cOAAAA; expires=Sun, 04-Apr-2021 01:46:52 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 05 Mar 2021 01:46:51 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/cryptography-client-test/create', {"kty":"RSA"})
  .query(true)
  .reply(200, {"key":{"kid":"https://keyvault_name.vault.azure.net/keys/cryptography-client-test/3963278a4baf4aacb78022a67858ec1c","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"uFkJsUtYq-nzkn3vywmXl8c4Z-vdjbaeHKAHnESjGonpaWQHjBmNoQ4cP02ud5aFuiYZ0QkqyBAwK3yzxVVchsKbiEJJrKWvSOwHUdcoK-9U1XAb4uBdA-3YVB2I8OxnoR9BRzkMKH-4YqBuVKQDxt-PmTLTU-ujKlZaM-Wza5OEdQ5XYCltOhkyASmPB9cTJh3_xYhFdgC3SoHXR4vdUeHYqlt7PyoTPGJtcH4Lg7zYVEGY5u0crPdL9eHA2r5PVjzzFk2CEDeZ7cmzBGS6JZZrywmMC-eNDWyXfB9LJpvbHUlwS9c2tmSdpwWGLEB3uahgo2IGzvajAONEe6mwRQ","e":"AQAB"},"attributes":{"enabled":true,"created":1614908812,"updated":1614908812,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7}}, [
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
  'e261e439-89b6-439f-96fc-32ab258e579b',
  'x-ms-keyvault-service-version',
  '1.2.191.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 05 Mar 2021 01:46:52 GMT',
  'Content-Length',
  '715'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/cryptography-client-test3/create', {"kty":"RSA-HSM"})
  .query(true)
  .reply(200, {"key":{"kid":"https://keyvault_name.vault.azure.net/keys/cryptography-client-test3/a3ec41193d424ba6abcae712e2f3066a","kty":"RSA-HSM","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"wyxmkAY9PFe7L-ufseNmml8GcQ0Bv2jIMCG2_Lp4ecYOu2kQvT7HkBaralBRAWOt5QnMnI6ErPMJ3rDLvmHcL4fCYf0gny11F5WX0HfuBgiAWSTKqEm0tdto3VB-pexCeoIyfus8eoU3T7BwcgH5ye-ysWZBkKQ1qjpf5flnfo5-aXw02RT5zaaTMas7VXkogyZJUwlEha-yIOSGZZRoNq31j3yVtjovK3cSCfJNUWEwtHVhHqdETUtAyBzVjbF41_sbimqvT88vQzSq7HhvlYG0YhVVXdisqV163QPnxQPjfSauHtV9UodK7OeTfd0vTowaCkm3YFTI7rfEo9IEFQ","e":"AAEAAQ"},"attributes":{"enabled":true,"created":1614908812,"updated":1614908812,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7}}, [
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
  'c81fc845-387b-4107-a61c-d4c080880e65',
  'x-ms-keyvault-service-version',
  '1.2.191.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 05 Mar 2021 01:46:53 GMT',
  'Content-Length',
  '722'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/keys/cryptography-client-test3/a3ec41193d424ba6abcae712e2f3066a')
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
  'bf6c308c-bb3b-4a93-a1cf-0db22beec64d',
  'x-ms-keyvault-service-version',
  '1.2.191.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 05 Mar 2021 01:46:53 GMT'
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
  '5f7b1c80-15b3-4899-a947-27ef1e774500',
  'x-ms-ests-server',
  '2.1.11530.15 - EUS ProdSlices',
  'Set-Cookie',
  'fpc=AkirakXcTFdPlbNAhLsJY-IsYtMRAgAAAIuE09cOAAAA; expires=Sun, 04-Apr-2021 01:46:53 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 05 Mar 2021 01:46:53 GMT',
  'Content-Length',
  '1315'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/keys/cryptography-client-test3/a3ec41193d424ba6abcae712e2f3066a')
  .query(true)
  .reply(200, {"key":{"kid":"https://keyvault_name.vault.azure.net/keys/cryptography-client-test3/a3ec41193d424ba6abcae712e2f3066a","kty":"RSA-HSM","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"wyxmkAY9PFe7L-ufseNmml8GcQ0Bv2jIMCG2_Lp4ecYOu2kQvT7HkBaralBRAWOt5QnMnI6ErPMJ3rDLvmHcL4fCYf0gny11F5WX0HfuBgiAWSTKqEm0tdto3VB-pexCeoIyfus8eoU3T7BwcgH5ye-ysWZBkKQ1qjpf5flnfo5-aXw02RT5zaaTMas7VXkogyZJUwlEha-yIOSGZZRoNq31j3yVtjovK3cSCfJNUWEwtHVhHqdETUtAyBzVjbF41_sbimqvT88vQzSq7HhvlYG0YhVVXdisqV163QPnxQPjfSauHtV9UodK7OeTfd0vTowaCkm3YFTI7rfEo9IEFQ","e":"AAEAAQ"},"attributes":{"enabled":true,"created":1614908812,"updated":1614908812,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7}}, [
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
  '98501cca-830f-4fec-ab09-cfa4924dc0c6',
  'x-ms-keyvault-service-version',
  '1.2.191.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 05 Mar 2021 01:46:53 GMT',
  'Content-Length',
  '722'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/cryptography-client-test3/a3ec41193d424ba6abcae712e2f3066a/sign', {"alg":"RS256","value":"ZVJEOpllu5j_M4_8rnEmS4gS33itKrPUvkizsz--EGE"})
  .query(true)
  .reply(200, {"kid":"https://keyvault_name.vault.azure.net/keys/cryptography-client-test3/a3ec41193d424ba6abcae712e2f3066a","value":"VnmMZP7PKd3PM_cPsao5dl09Xd518Ll1cShRgglC8HboqmaEZcozCDe84hPQiBHS9CMJPf6_LwXjnVITNRTePnXJlBweKynsGi3U9BGe4nTvv5x8rneXlRZ6GASRyi7Q-Y_f201jIuvywW9mz1B_cuYvK7Rk62Q8Qgm8rPNDyoJyOoWOYHhkj1UQAsYfZ_UyFpRCz-V-4pOBRzuB_yg2GA_mbKFqUusOpp20Wf01XCrBw3irAN61RAvNLx2zjgzyEkTdXLgG9r9MfXlqCcBahZD0by0ohfUk8tpmQAJVej0BHTkcRRuoLiZrx5WPWfRU1lCzddJy7yrQRYpswx5YCw"}, [
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
  '3628e225-9cf5-4b8a-b16a-75940a97f0fc',
  'x-ms-keyvault-service-version',
  '1.2.191.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 05 Mar 2021 01:46:53 GMT',
  'Content-Length',
  '477'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/cryptography-client-test3/a3ec41193d424ba6abcae712e2f3066a/verify', {"alg":"RS256","digest":"ZVJEOpllu5j_M4_8rnEmS4gS33itKrPUvkizsz--EGE","value":"VnmMZP7PKd3PM_cPsao5dl09Xd518Ll1cShRgglC8HboqmaEZcozCDe84hPQiBHS9CMJPf6_LwXjnVITNRTePnXJlBweKynsGi3U9BGe4nTvv5x8rneXlRZ6GASRyi7Q-Y_f201jIuvywW9mz1B_cuYvK7Rk62Q8Qgm8rPNDyoJyOoWOYHhkj1UQAsYfZ_UyFpRCz-V-4pOBRzuB_yg2GA_mbKFqUusOpp20Wf01XCrBw3irAN61RAvNLx2zjgzyEkTdXLgG9r9MfXlqCcBahZD0by0ohfUk8tpmQAJVej0BHTkcRRuoLiZrx5WPWfRU1lCzddJy7yrQRYpswx5YCw"})
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
  'x-ms-request-id',
  'a4bc6003-5208-490f-9b74-9aa36374bd83',
  'x-ms-keyvault-service-version',
  '1.2.191.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 05 Mar 2021 01:46:53 GMT',
  'Content-Length',
  '14'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/keys/cryptography-client-test3')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/cryptography-client-test3","deletedDate":1614908813,"scheduledPurgeDate":1615513613,"key":{"kid":"https://keyvault_name.vault.azure.net/keys/cryptography-client-test3/a3ec41193d424ba6abcae712e2f3066a","kty":"RSA-HSM","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"wyxmkAY9PFe7L-ufseNmml8GcQ0Bv2jIMCG2_Lp4ecYOu2kQvT7HkBaralBRAWOt5QnMnI6ErPMJ3rDLvmHcL4fCYf0gny11F5WX0HfuBgiAWSTKqEm0tdto3VB-pexCeoIyfus8eoU3T7BwcgH5ye-ysWZBkKQ1qjpf5flnfo5-aXw02RT5zaaTMas7VXkogyZJUwlEha-yIOSGZZRoNq31j3yVtjovK3cSCfJNUWEwtHVhHqdETUtAyBzVjbF41_sbimqvT88vQzSq7HhvlYG0YhVVXdisqV163QPnxQPjfSauHtV9UodK7OeTfd0vTowaCkm3YFTI7rfEo9IEFQ","e":"AAEAAQ"},"attributes":{"enabled":true,"created":1614908812,"updated":1614908812,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7}}, [
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
  '4beeb96a-dbf6-466a-8070-70f19a9db1e4',
  'x-ms-keyvault-service-version',
  '1.2.191.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 05 Mar 2021 01:46:53 GMT',
  'Content-Length',
  '883'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/cryptography-client-test3')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: cryptography-client-test3"}}, [
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
  '2625cb10-9d2c-438e-836f-20f5fe58046a',
  'x-ms-keyvault-service-version',
  '1.2.191.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 05 Mar 2021 01:46:53 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/cryptography-client-test3')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: cryptography-client-test3"}}, [
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
  'aed50687-4299-4808-b2dc-a40e60101754',
  'x-ms-keyvault-service-version',
  '1.2.191.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 05 Mar 2021 01:46:53 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/cryptography-client-test3')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: cryptography-client-test3"}}, [
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
  'e5aa5866-3c02-4ee2-81d2-2a6433736ef4',
  'x-ms-keyvault-service-version',
  '1.2.191.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 05 Mar 2021 01:46:55 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/cryptography-client-test3')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: cryptography-client-test3"}}, [
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
  'abd82ff6-26e1-41d0-9b71-ba8f8ebf9a63',
  'x-ms-keyvault-service-version',
  '1.2.191.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 05 Mar 2021 01:46:57 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/cryptography-client-test3')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: cryptography-client-test3"}}, [
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
  '4bba37f3-5840-45ba-8223-58e14cb106b0',
  'x-ms-keyvault-service-version',
  '1.2.191.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 05 Mar 2021 01:46:59 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/cryptography-client-test3')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: cryptography-client-test3"}}, [
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
  '99cbe3b3-b102-4771-a2e5-b63879977fe1',
  'x-ms-keyvault-service-version',
  '1.2.191.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 05 Mar 2021 01:47:01 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/cryptography-client-test3')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: cryptography-client-test3"}}, [
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
  'bf4de0fc-ab74-4e8c-99f4-ac9c3d1f45d6',
  'x-ms-keyvault-service-version',
  '1.2.191.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 05 Mar 2021 01:47:03 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/cryptography-client-test3')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: cryptography-client-test3"}}, [
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
  'b54af8fe-2477-43f7-9a36-9ff2f571e3f1',
  'x-ms-keyvault-service-version',
  '1.2.191.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 05 Mar 2021 01:47:05 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/cryptography-client-test3')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: cryptography-client-test3"}}, [
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
  'f88a24e7-1a14-413d-8219-5b07d4051078',
  'x-ms-keyvault-service-version',
  '1.2.191.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 05 Mar 2021 01:47:07 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/cryptography-client-test3')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/cryptography-client-test3","deletedDate":1614908813,"scheduledPurgeDate":1615513613,"key":{"kid":"https://keyvault_name.vault.azure.net/keys/cryptography-client-test3/a3ec41193d424ba6abcae712e2f3066a","kty":"RSA-HSM","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"wyxmkAY9PFe7L-ufseNmml8GcQ0Bv2jIMCG2_Lp4ecYOu2kQvT7HkBaralBRAWOt5QnMnI6ErPMJ3rDLvmHcL4fCYf0gny11F5WX0HfuBgiAWSTKqEm0tdto3VB-pexCeoIyfus8eoU3T7BwcgH5ye-ysWZBkKQ1qjpf5flnfo5-aXw02RT5zaaTMas7VXkogyZJUwlEha-yIOSGZZRoNq31j3yVtjovK3cSCfJNUWEwtHVhHqdETUtAyBzVjbF41_sbimqvT88vQzSq7HhvlYG0YhVVXdisqV163QPnxQPjfSauHtV9UodK7OeTfd0vTowaCkm3YFTI7rfEo9IEFQ","e":"AAEAAQ"},"attributes":{"enabled":true,"created":1614908812,"updated":1614908812,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7}}, [
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
  'd029adc9-ff72-4609-b178-e75644637c21',
  'x-ms-keyvault-service-version',
  '1.2.191.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 05 Mar 2021 01:47:09 GMT',
  'Content-Length',
  '883'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedkeys/cryptography-client-test3')
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
  '1124659f-5f7e-4c81-a592-e54dd41311b4',
  'x-ms-keyvault-service-version',
  '1.2.191.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 05 Mar 2021 01:47:10 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/keys/cryptography-client-test')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/cryptography-client-test","deletedDate":1614908830,"scheduledPurgeDate":1615513630,"key":{"kid":"https://keyvault_name.vault.azure.net/keys/cryptography-client-test/3963278a4baf4aacb78022a67858ec1c","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"uFkJsUtYq-nzkn3vywmXl8c4Z-vdjbaeHKAHnESjGonpaWQHjBmNoQ4cP02ud5aFuiYZ0QkqyBAwK3yzxVVchsKbiEJJrKWvSOwHUdcoK-9U1XAb4uBdA-3YVB2I8OxnoR9BRzkMKH-4YqBuVKQDxt-PmTLTU-ujKlZaM-Wza5OEdQ5XYCltOhkyASmPB9cTJh3_xYhFdgC3SoHXR4vdUeHYqlt7PyoTPGJtcH4Lg7zYVEGY5u0crPdL9eHA2r5PVjzzFk2CEDeZ7cmzBGS6JZZrywmMC-eNDWyXfB9LJpvbHUlwS9c2tmSdpwWGLEB3uahgo2IGzvajAONEe6mwRQ","e":"AQAB"},"attributes":{"enabled":true,"created":1614908812,"updated":1614908812,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7}}, [
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
  '996dec1f-b8e2-411a-a87e-d923b5ef38de',
  'x-ms-keyvault-service-version',
  '1.2.191.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 05 Mar 2021 01:47:10 GMT',
  'Content-Length',
  '875'
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
  'x-ms-request-id',
  'a64334df-76f8-4587-a2f8-c92280214412',
  'x-ms-keyvault-service-version',
  '1.2.191.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 05 Mar 2021 01:47:10 GMT'
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
  'x-ms-request-id',
  '9d1ec077-6e19-4b41-93c8-b4ed7a4e2153',
  'x-ms-keyvault-service-version',
  '1.2.191.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 05 Mar 2021 01:47:10 GMT'
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
  'x-ms-request-id',
  'e38c92f3-49b5-4a3d-9491-9bc72aa6006f',
  'x-ms-keyvault-service-version',
  '1.2.191.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 05 Mar 2021 01:47:12 GMT'
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
  'x-ms-request-id',
  '401bc677-6dc4-4012-838e-7712ab2da4d2',
  'x-ms-keyvault-service-version',
  '1.2.191.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 05 Mar 2021 01:47:14 GMT'
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
  'x-ms-request-id',
  '5f9e1997-97f1-4f02-ad8e-e4501d44a745',
  'x-ms-keyvault-service-version',
  '1.2.191.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 05 Mar 2021 01:47:16 GMT'
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
  'x-ms-request-id',
  '0316dfe1-0a3c-46e9-807d-adc7070177ee',
  'x-ms-keyvault-service-version',
  '1.2.191.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 05 Mar 2021 01:47:17 GMT'
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
  'x-ms-request-id',
  '01165cd4-7fc7-4baa-a6ed-a28f95056f62',
  'x-ms-keyvault-service-version',
  '1.2.191.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 05 Mar 2021 01:47:19 GMT'
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
  'x-ms-request-id',
  '29222faa-ff45-4597-932f-09155109c3fc',
  'x-ms-keyvault-service-version',
  '1.2.191.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 05 Mar 2021 01:47:21 GMT'
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
  'x-ms-request-id',
  'a38f1bd9-b439-4fda-a274-2ec3b4f6b1bc',
  'x-ms-keyvault-service-version',
  '1.2.191.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 05 Mar 2021 01:47:23 GMT'
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
  'x-ms-request-id',
  'bc3fd3c9-807c-402d-8cab-37ec965bd18d',
  'x-ms-keyvault-service-version',
  '1.2.191.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 05 Mar 2021 01:47:26 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/cryptography-client-test')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/cryptography-client-test","deletedDate":1614908830,"scheduledPurgeDate":1615513630,"key":{"kid":"https://keyvault_name.vault.azure.net/keys/cryptography-client-test/3963278a4baf4aacb78022a67858ec1c","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"uFkJsUtYq-nzkn3vywmXl8c4Z-vdjbaeHKAHnESjGonpaWQHjBmNoQ4cP02ud5aFuiYZ0QkqyBAwK3yzxVVchsKbiEJJrKWvSOwHUdcoK-9U1XAb4uBdA-3YVB2I8OxnoR9BRzkMKH-4YqBuVKQDxt-PmTLTU-ujKlZaM-Wza5OEdQ5XYCltOhkyASmPB9cTJh3_xYhFdgC3SoHXR4vdUeHYqlt7PyoTPGJtcH4Lg7zYVEGY5u0crPdL9eHA2r5PVjzzFk2CEDeZ7cmzBGS6JZZrywmMC-eNDWyXfB9LJpvbHUlwS9c2tmSdpwWGLEB3uahgo2IGzvajAONEe6mwRQ","e":"AQAB"},"attributes":{"enabled":true,"created":1614908812,"updated":1614908812,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7}}, [
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
  '910371eb-6ad6-40be-89a1-f6b62957b622',
  'x-ms-keyvault-service-version',
  '1.2.191.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 05 Mar 2021 01:47:28 GMT',
  'Content-Length',
  '875'
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
  'cee7e0ce-0a14-4609-8b46-d61b544c7e54',
  'x-ms-keyvault-service-version',
  '1.2.191.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 05 Mar 2021 01:47:28 GMT'
]);

let nock = require('nock');

module.exports.hash = "aad9ed94cfeceb1eb607798812f450ca";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/backupRestoreKeyName-failstogenerateabackupofanon-existingkey-/backup')
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
  '0123bdfd-e88b-4b6f-b110-ffc774bb297e',
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
  'Thu, 25 Jun 2020 12:07:49 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedkeys?api-version=7.1-preview&$skiptoken=eyJOZXh0TWFya2VyIjoiMiEyNDQhTURBd01UTTVJV3RsZVM5RFNFRk1URVZPUjBWQlZWUklRMFZTVkVsR1NVTkJWRVZPUVUxRkxVOU9RMFZCVlZSSVJVNVVTVU5CVkVWRVRrVlhVa1ZSVlVWVFZGTlRTRTlWVEVST1QxUkJWVlJJUlU1VVNVTkJWRVZCUjBGSlRpMDROemcyTnpjMk9EYzVNemM0T1RJMkxURXZRa0ZDT1Rnd09EUTNSVGhDTkRJMVJUbEdOekpETlRGRk56QkVNekEyUmtFaE1EQXdNREk0SVRrNU9Ua3RNVEl0TXpGVU1qTTZOVGs2TlRrdU9UazVPVGs1T1ZvaCIsIlRhcmdldExvY2F0aW9uIjowfQ"}, [
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
  '79aef7a9-7478-47b4-922f-18c99d01cf1a',
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
  'Thu, 25 Jun 2020 12:07:50 GMT',
  'Content-Length',
  '502'
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
  'e43acd3a-4b04-4769-be80-2962b6ac4101',
  'x-ms-ests-server',
  '2.1.10732.8 - WUS2 ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AqSp6W-oh0ZLh3y0hTZUJ10_aSJHAQAAAJWKhtYOAAAA; expires=Sat, 25-Jul-2020 12:07:50 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; SameSite=None; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; SameSite=None; secure; HttpOnly',
  'Date',
  'Thu, 25 Jun 2020 12:07:49 GMT',
  'Content-Length',
  '1315'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys')
  .query(true)
  .reply(200, {"value":[{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/challengeAuthKeyName-Authenticationshouldworkforparallelrequests-16149549216697756-1","deletedDate":1593035323,"scheduledPurgeDate":1600811323,"kid":"https://keyvault_name.vault.azure.net/keys/challengeAuthKeyName-Authenticationshouldworkforparallelrequests-16149549216697756-1","attributes":{"enabled":true,"created":1590017514,"updated":1590017514,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/challengeAuthKeyName-Authenticationshouldworkforparallelrequests-16814512386480018-0","deletedDate":1593035345,"scheduledPurgeDate":1600811345,"kid":"https://keyvault_name.vault.azure.net/keys/challengeAuthKeyName-Authenticationshouldworkforparallelrequests-16814512386480018-0","attributes":{"enabled":true,"created":1590017675,"updated":1590017675,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/challengeAuthKeyName-Authenticationshouldworkforparallelrequests-9345955924083531-1","deletedDate":1590068833,"scheduledPurgeDate":1597844833,"kid":"https://keyvault_name.vault.azure.net/keys/challengeAuthKeyName-Authenticationshouldworkforparallelrequests-9345955924083531-1","attributes":{"enabled":true,"created":1590068824,"updated":1590068824,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90}}],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedkeys?api-version=7.1-preview&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExOTIhTURBd01EazVJV3RsZVM5RFNFRk1URVZPUjBWQlZWUklTMFZaVGtGTlJTMVBUa05GUVZWVVNFVk9WRWxEUVZSRlJFNUZWMUpGVVZWRlUxUlRVMGhQVlV4RVRrOVVRVlZVU0VWT1ZFbERRVlJGUVVkQlNVNHRNVE00TVRFMk56QTVPRFF5TnpVM01UVXRNU0V3TURBd01qZ2hPVGs1T1MweE1pMHpNVlF5TXpvMU9UbzFPUzQ1T1RrNU9UazVXaUUtIiwiVGFyZ2V0TG9jYXRpb24iOjB9"}, [
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
  '636bb96c-d692-4866-86a7-503c678643a3',
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
  'Thu, 25 Jun 2020 12:07:50 GMT',
  'Content-Length',
  '1893'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/backupRestoreKeyName-failstogenerateabackupofanon-existingkey-/backup')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"A key with (name/id) backupRestoreKeyName-failstogenerateabackupofanon-existingkey- was not found in this key vault. If you recently deleted this key you may be able to recover it using the correct recovery command. For help resolving this issue, please see https://go.microsoft.com/fwlink/?linkid=2125182"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '366',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'beb84c45-4ac8-4c15-9abf-d6f943dfd9b8',
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
  'Thu, 25 Jun 2020 12:07:50 GMT'
]);

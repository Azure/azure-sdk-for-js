let nock = require('nock');

module.exports.hash = "516b0b1e3a7cdad9f4f6cbc3e34f0b8a";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/localCryptoKeyName-beforeeachhook-/create')
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
  '9016c363-df8f-4c6a-b95b-4cd1b1359a5d',
  'x-ms-keyvault-service-version',
  '1.2.139.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 25 Jan 2021 01:41:14 GMT'
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
  '23bb5b55-03f3-453f-a434-8627b7963c00',
  'x-ms-ests-server',
  '2.1.11419.13 - WUS2 ProdSlices',
  'Set-Cookie',
  'fpc=Am26iPGssf9Pl7gwXMSdRFCsQTTcFAAAAIEYoNcOAAAA; expires=Wed, 24-Feb-2021 01:41:14 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Mon, 25 Jan 2021 01:41:13 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/localCryptoKeyName-beforeeachhook-47352874826604885')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.netdeletedkeys/localCryptoKeyName-beforeeachhook-47352874826604885","deletedDate":1611538872,"scheduledPurgeDate":1612143672,"key":{"kid":"https://keyvault_name.vault.azure.netkeys/localCryptoKeyName-beforeeachhook-47352874826604885/0455e2146b8e44858be0d11f816a9fe1","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"rEfdsdgKD-QZ3DQpb5BifztErf0MdCU8Q5mgiHIhJCfLXA-ubqqcOPvQIvJf93mWgim24LMiItu_8gpfDbgbplr8Z8FpTJyfLXbRx5JSfIqsECFCFHNmC5IPBFkLio3seFaGOzKJvIlRLw0Rt6rZt7uQkGTGrbrg99klKdEzWGImG_76_rJ6X2BELT_8UKTaRmKIRaUSOq_MvTsS2iO4B7NqvkKe6I02supU5DUoRwQGOifhVEKbCJieiPNjH720LZ2rdKCAGmYMDomHv_WIS5HoKZTonH06-lSY1Jud4veOq8rhzktYBqUGmy08ZNwF7Ztz_lI-WBy0fLg9q6roNQ","e":"AQAB"},"attributes":{"enabled":true,"created":1611537631,"updated":1611537631,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7}}, [
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
  'e81629d8-a210-45c7-ace4-73210c23ce79',
  'x-ms-keyvault-service-version',
  '1.2.139.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 25 Jan 2021 01:41:13 GMT',
  'Content-Length',
  '897'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedkeys/localCryptoKeyName-beforeeachhook-47352874826604885')
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
  'd402799b-7969-49a1-a87b-112fb603e77e',
  'x-ms-keyvault-service-version',
  '1.2.139.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 25 Jan 2021 01:41:13 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/keys/localCryptoKeyName-beforeeachhook-4852309582989278')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.netdeletedkeys/localCryptoKeyName-beforeeachhook-4852309582989278","deletedDate":1611538874,"scheduledPurgeDate":1612143674,"key":{"kid":"https://keyvault_name.vault.azure.netkeys/localCryptoKeyName-beforeeachhook-4852309582989278/296f68d344844bb3821be003c5bcb005","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"tzDn8OgtM6xSN5wIN3yiUGF5_yQq5SD3FadfgNrgHXPKLoP84sojwuuIbU7aHmB64c4QXOdV-bUDXO2C7bSL_fl1FT8Eu5qqoJAn_UqBVtKh3CjfISLA5y5MbAIlPWcV9JkAdYRjnio1SZ-WhS4OdEjy1MprWRyL54wFThTPFANa5dfqp4Uig-Zux2R-X-39xaT2ILHh_LgiB1O_WUXD8DSPa8Vmse6RuRaw2OOivSyGNK7Ob1I4wj05CUsjBZYSTZX26WHrSQsURqYKIVAp1WzOdLXWw6rrkYxhXKmriullog2ZRTIQphMNdZh4i4cF6caG-QP-XtrjPIbx9LCMhQ","e":"AQAB"},"attributes":{"enabled":true,"created":1611538361,"updated":1611538361,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7}}, [
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
  '8deb701c-4983-42dc-a6dc-41c53e3a0ef5',
  'x-ms-keyvault-service-version',
  '1.2.139.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 25 Jan 2021 01:41:14 GMT',
  'Content-Length',
  '895'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/localCryptoKeyName-beforeeachhook-4852309582989278')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: localCryptoKeyName-beforeeachhook-4852309582989278"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '118',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  'b4821c49-b66d-4360-87ee-50c22f1ff2e6',
  'x-ms-keyvault-service-version',
  '1.2.139.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 25 Jan 2021 01:41:14 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/localCryptoKeyName-beforeeachhook-4852309582989278')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: localCryptoKeyName-beforeeachhook-4852309582989278"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '118',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  '62cfb8bb-b04a-4d76-b77d-d36f3c9e171a',
  'x-ms-keyvault-service-version',
  '1.2.139.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 25 Jan 2021 01:41:14 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/localCryptoKeyName-beforeeachhook-/create', {"kty":"RSA"})
  .query(true)
  .reply(200, {"key":{"kid":"https://keyvault_name.vault.azure.netkeys/localCryptoKeyName-beforeeachhook-/78f8e3e09e194a02b4e191ce5f8215fd","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"veTte0Co6jmYfpAAefT1E5OilmXIMXdbXZ9F5D6RyaZKOM8YNwOTJTbpUWqqquhZwLv3_2Se2nXzgbDU-fw-z182e6-d-1MwTFK_KKGGadNuPmLSBGVmOUOZ4i-CTHi9VCrvonW6LESM5H263J8GHxU6uqionMFVobV4P8-5j6PrlPQnddTXXhtxr-l2FuGCqP8MqSXLwZyq7nWWl3vvMHI7tx8EFkyL1qCHiBTfA1xpntuogHrkz_g1M9gTEYu7jRwoPdRhtKDeZS4fTgyKAwpMpe49pwCLtUjvcyNMamOqOXAw2bLpsrvxzJXg5QXMe58b3NWe7pgoqOownmyrnQ","e":"AQAB"},"attributes":{"enabled":true,"created":1611538874,"updated":1611538874,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7}}, [
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
  '007aed60-d7f6-460f-b611-817392e94898',
  'x-ms-keyvault-service-version',
  '1.2.139.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 25 Jan 2021 01:41:14 GMT',
  'Content-Length',
  '725'
]);

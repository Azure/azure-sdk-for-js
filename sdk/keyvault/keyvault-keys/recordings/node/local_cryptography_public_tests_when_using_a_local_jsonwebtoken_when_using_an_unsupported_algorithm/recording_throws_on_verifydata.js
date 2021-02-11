let nock = require('nock');

module.exports.hash = "33a498766b04d87389899261e4fac458";

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
  'ea968b32-3c44-4d99-9587-0b8b62cae75d',
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
  'Mon, 25 Jan 2021 01:41:12 GMT'
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
  'ed815c3c-310b-49cb-817a-542d9908fe00',
  'x-ms-ests-server',
  '2.1.11419.13 - SCUS ProdSlices',
  'Set-Cookie',
  'fpc=Am26iPGssf9Pl7gwXMSdRFCsQTTcFAAAAIEYoNcOAAAA; expires=Wed, 24-Feb-2021 01:41:13 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Mon, 25 Jan 2021 01:41:13 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/localCryptoKeyName-beforeeachhook-/create', {"kty":"RSA"})
  .query(true)
  .reply(200, {"key":{"kid":"https://keyvault_name.vault.azure.netkeys/localCryptoKeyName-beforeeachhook-/c0d2c84b034545c4b717da1bcbf95cbf","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"t8VIc6AcBtomYYK708-CK4p6-OXKEDsZ8zz38dKnHOwFrUVVKVfVzmjbdUHmIoL48LhMt1OOtL8eIwU76VHhPCE6vdpEwnrWOTbJ-Ve-saVSj7OC5kwARP-u2ZprCTR0isHieqwZ1AuZE0OUKeNRBo8-su52Wm2a8BpGRQDb6rBJJcVJPuZJ4EKY7S4o1tCirivf8DACt4t_wDcg2fEbo-jUhPBl7tv5GfVxKqPy44bbNRtpP6r5O18xRIJ4SFRfqQUAFWRAs5j9Gtf-Vs2rJo8gzNCD5kXzY0EV7SAU7kA5EMTJdUBnIVdbg36TSY1jPf1nLO50iiJO3NMUH_-X0Q","e":"AQAB"},"attributes":{"enabled":true,"created":1611538874,"updated":1611538874,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7}}, [
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
  '477be9bb-d16b-4693-8049-1b048b916051',
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
  '725'
]);

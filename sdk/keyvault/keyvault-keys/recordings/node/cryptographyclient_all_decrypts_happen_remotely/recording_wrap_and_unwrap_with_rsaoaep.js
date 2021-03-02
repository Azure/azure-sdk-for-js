let nock = require('nock');

module.exports.hash = "dc581783f7980ff2db8779e68d536a0f";

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
  '8e4ad993-1358-45da-80b0-e609cf515de5',
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
  'Tue, 02 Mar 2021 22:19:58 GMT'
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
  '385b2d4f-b251-4cb7-8767-6f1433feb000',
  'x-ms-ests-server',
  '2.1.11513.17 - EUS ProdSlices',
  'Set-Cookie',
  'fpc=AuCUwaH-pAJPoo1uGPxWnrssYtMRCQAAAIGw0NcOAAAA; expires=Thu, 01-Apr-2021 22:19:58 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 02 Mar 2021 22:19:58 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/cryptography-client-test/create', {"kty":"RSA"})
  .query(true)
  .reply(200, {"key":{"kid":"https://keyvault_name.vault.azure.net/keys/cryptography-client-test/1b9a24b43bfc49c58fc2c1a673137cbe","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"4xW_i4IcyGdCoc-37h_0lCG8BiIAugsF9rpDdQ1InNHmXxU18diD-VreU5yQmzduUTRqsaYP4w2TjPEL4AGPwZ7m7g6UpnBvt_-FlmjJlG-mF-0SNO7wzsn2pc7C_dQclhQF3ivj2kE5lT_v4vmvbyNQFz4XdZXbGxLgJDD_9122PpNmxBK9k3b3JwitflmFi6rezcT0VfLmxr-BcqRUbHz1HWGSeftw0aHg1S9wTYvR4OjgR1iy-ZvL0omGwnQvVVDWdNcBH1Z5udW31Au_rQYuQh4dJK1m5toCUXKfVSxtLyFEHbS2oPW14VmC713qbFa1OYCztXvf-BUdBUXfHQ","e":"AQAB"},"attributes":{"enabled":true,"created":1614723598,"updated":1614723598,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7}}, [
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
  'b074dedd-ca6c-4594-a51d-461360268c7e',
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
  'Tue, 02 Mar 2021 22:19:58 GMT',
  'Content-Length',
  '715'
]);

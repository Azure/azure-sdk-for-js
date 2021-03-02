let nock = require('nock');

module.exports.hash = "d48c05bcb40602e0092c35023e477eab";

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
  'ceaaab45-8741-4676-8304-62c94ec4ab45',
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
  'Tue, 02 Mar 2021 22:19:57 GMT'
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
  '524a429b-9f95-4936-92e3-8f070f03b600',
  'x-ms-ests-server',
  '2.1.11513.17 - NCUS ProdSlices',
  'Set-Cookie',
  'fpc=AuCUwaH-pAJPoo1uGPxWnrssYtMRCQAAAIGw0NcOAAAA; expires=Thu, 01-Apr-2021 22:19:57 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 02 Mar 2021 22:19:57 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/cryptography-client-test/create', {"kty":"RSA"})
  .query(true)
  .reply(200, {"key":{"kid":"https://keyvault_name.vault.azure.net/keys/cryptography-client-test/bf229e62068640b18d2485096ee8d800","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"xEu7LfpWE99WIjCVlGXeWiV6CbxhBWnfUmcFU5cZA6XcQ3ACGWlvO6afJDDg6nXJZUL1IHcDQ_CnNyunV17TYkV1ovBazQmzitsDoULuUr3CDWfuuf377slFENSkFUpSa6Ko0HWiKtFhkJxVFMzxVSM9qBethUKnUTETqzbS9Oqzut27RJCxYT50zLPGlKsryQ4ZDdINCaLYU2v5VPvGcyMlVp97jqVbKdU7OS1q_r3gYDk5b8o7-8sz_7enD-f3HFXqkqzD3ElE5-Kzo3tfBvShW0GNxdtIo4ke69QbrxQVgpPtFxdENMdM4ACfG32pgLypwFca98fvO0S7H92g0Q","e":"AQAB"},"attributes":{"enabled":true,"created":1614723597,"updated":1614723597,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7}}, [
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
  'ef832978-c562-4cd3-b25d-ab361258754f',
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

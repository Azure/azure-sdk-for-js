let nock = require('nock');

module.exports.hash = "737056f98ae0827c1aa479fd731af24e";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

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
  '5c9bd127-8d6d-481c-b966-23979a159400',
  'x-ms-ests-server',
  '2.1.11419.13 - NCUS ProdSlices',
  'Set-Cookie',
  'fpc=AuJZFhUfVcJGj5Re_9Kq1h8_aSJHAQAAAINZndcOAAAA; expires=Sun, 21-Feb-2021 23:40:52 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 22 Jan 2021 23:40:51 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/challengeAuthKeyName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0/create', {"kty":"RSA"})
  .query(true)
  .reply(200, {"key":{"kid":"https://keyvault_name.vault.azure.net/keys/challengeAuthKeyName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0/9b4539c14f5349278a1a0f4cd34f0ddb","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"0ChfbzgSZiVtfAWYZGv4E2IA9Tf3jdrRIXUkC9A_BHfBp5wQNH3CO7FSPIRMMRha00H8pkX7ZrvFEyqkAu8fWphU90NVbNWUgBnPWivSTWYCycOiXkELvfK8wYwG8uCWfAvEwRe1Ap9pMTGcoLWsRDDz6AzVeZ316ozDl8bUjuqYD9B0LcIM3N1mMQ8R9jjxBOYje2W-8QKxCZfudTc89XmI-0E0T4BUKZqU5WRI-VDQXw-ipxKNbclSOw7G-DJEMFBC9eSyldctgvulNArwL43hp56rMhK0PGg1ntS-Jjf_jYSi9Og8DMOoSS4RxSgK1rwxSGnO22ikqFft4ONGzQ","e":"AQAB"},"attributes":{"enabled":true,"created":1611358852,"updated":1611358852,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90}}, [
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
  'f6490134-ed91-405f-84ac-c1de675fa8c4',
  'x-ms-keyvault-service-version',
  '1.2.139.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=40.76.87.35;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 22 Jan 2021 23:40:52 GMT',
  'Content-Length',
  '769'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/challengeAuthKeyName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1/create', {"kty":"RSA"})
  .query(true)
  .reply(200, {"key":{"kid":"https://keyvault_name.vault.azure.net/keys/challengeAuthKeyName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1/13fc5eee00104665a0988017ad9f3d5e","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"y9j5gSI96ELLYXA5YSz3QGs5-JUV1vLShHJR4rnskiHcVVxJ7YFs-cfwXEuCuDfD3bdNdd34PSDVB1wqlXcPXJ_MefJa3KAdvPVCt80cwBKZqjM3h2CeEj-uk6VCaaOwGUw0ogHYU4o8UQbrP18PrpeQqwMD5pmC6igA8AAny5M4zXkiXjaUCjUN0uuJtrWYy7OM3iYAjEX65n6dWKqnOUtdKR0aoowoj4FUHZiwVkdOu0xWG_9dBleUNqEYyEREMOc8Ks3Dir49sfCq2QkpRPS3-zg8rDtGn7mfhkrkuuP3MG0ee8WnM60hDw9WAfAgx3-1koGshW84lztzkCe2SQ","e":"AQAB"},"attributes":{"enabled":true,"created":1611358853,"updated":1611358853,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90}}, [
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
  '8fd19ee4-dd23-4c19-a8e7-cd6d8ddf1c43',
  'x-ms-keyvault-service-version',
  '1.2.139.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=40.76.87.35;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 22 Jan 2021 23:40:52 GMT',
  'Content-Length',
  '769'
]);

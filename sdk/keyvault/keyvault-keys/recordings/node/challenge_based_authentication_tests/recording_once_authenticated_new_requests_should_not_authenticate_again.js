let nock = require('nock');

module.exports.hash = "eb5efb698c9942adc60479851cf5dd1b";

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
  '1137d944-3329-4557-b9de-3aaeeea95200',
  'x-ms-ests-server',
  '2.1.11419.13 - EUS ProdSlices',
  'Set-Cookie',
  'fpc=ApRhv0rB7XBBtfzWFRG4C4c_aSJHAQAAAM3tm9cOAAAA; expires=Sat, 20-Feb-2021 21:49:01 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 21 Jan 2021 21:49:01 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/challengeAuthKeyName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0/create', {"kty":"RSA"})
  .query(true)
  .reply(200, {"key":{"kid":"https://keyvault_name.vault.azure.net/keys/challengeAuthKeyName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0/abf4b426c7cb4b8b8a89fbeb3822aa08","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"wgEqpKCyXdQBGjEFOtvxgpEqmLouN6Rr2ZRMO92lwzr0khasksCcRBuaCkCEVezIS_stEFiyvacXQF8wHgr0E0qWV3uasaJfa7btb_lZHML4wkDjV6MFiKqKy0mf2GNB5HiNrRt_qvVTCl_t_mpRUy1ok8K2IYx5t9sDUAJWfgWM_p3qkAgdj69gFW7ralYCEpBNUq2MXmK_-tg7Ct03bGSq7U1ZjgEjKycjRt1sBB3bm945kqGAh5Og9b3_4-qs8z5uJFn_HGN7V8zdm3a2j22XVXbhvNaHm9Bs6Nx_rmiev5JX88DSLJAyWph-dlCwAImbWa-SB2IF7ePDTKx88Q","e":"AQAB"},"attributes":{"enabled":true,"created":1611265742,"updated":1611265742,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90}}, [
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
  '67097be2-1468-433d-ad0a-edec486ddd36',
  'x-ms-keyvault-service-version',
  '1.2.139.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=40.112.50.112;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 21 Jan 2021 21:49:02 GMT',
  'Content-Length',
  '769'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/challengeAuthKeyName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1/create', {"kty":"RSA"})
  .query(true)
  .reply(200, {"key":{"kid":"https://keyvault_name.vault.azure.net/keys/challengeAuthKeyName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1/0982074113e049999ff84d95ed21715f","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"wUQ9oq-AbZpuTzQfIo0HHgBElILFs07IVBVDclIFQ_Q2awxMTsarGKl1kNXktyWJofrwILwBDqAtb2XItTYTuTMhyYeMK7qdusaDtV49F8nKhgM0Fe5ew7aKnFknFmq4zINVau5OopCIrnvNd4Murf38CDQNuTC1J2_h9b_DxejbD3xE8QPfzOhjk9rrySpfbXRZ4vYA7zWhutuHlE9wKb3ka5CgJpOGq0JPwoJVywKMnfjwvvK5y87QvzM3zlt73AzYKQEVswvWPtyFQ1vNuoPyOlZj5CHYj_ewNQOclhlQ4SkregKi5_7ln3oMv2XYQ8XeBGSOuNLZg8RPLFcYuQ","e":"AQAB"},"attributes":{"enabled":true,"created":1611265742,"updated":1611265742,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90}}, [
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
  '0b0731f1-811c-46d8-9fc3-0060fab3128b',
  'x-ms-keyvault-service-version',
  '1.2.139.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=40.112.50.112;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 21 Jan 2021 21:49:02 GMT',
  'Content-Length',
  '769'
]);

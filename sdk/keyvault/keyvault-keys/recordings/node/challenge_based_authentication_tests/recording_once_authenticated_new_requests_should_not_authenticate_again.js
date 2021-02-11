let nock = require('nock');

module.exports.hash = "cc9dc9671c9872d6507286478f379f46";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/challengeAuthKeyName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0/create')
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
  '60bf8c30-6388-4ca6-838f-b17e512cbdc9',
  'x-ms-keyvault-service-version',
  '1.2.99.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=76.121.141.80;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 12 Jan 2021 05:05:58 GMT'
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
  'eb339f0a-c036-401a-94d6-e7a10dbd0800',
  'x-ms-ests-server',
  '2.1.11384.6 - EUS ProdSlices',
  'Set-Cookie',
  'fpc=AvMmCtiFEM9IrLy2iVKhKsM_aSJHAgAAADAlj9cOAAAA; expires=Thu, 11-Feb-2021 05:05:58 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 12 Jan 2021 05:05:58 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/challengeAuthKeyName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0/create', {"kty":"RSA"})
  .query(true)
  .reply(200, {"key":{"kid":"https://keyvault_name.vault.azure.net/keys/challengeAuthKeyName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0/bfa258baa81c419587c91984719accf4","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"2IyGbVNLhplhENUxx1EHudYQJL0k-cPkE6sGELEWe8W7VLzWlWYN1SQYBT4ZsPBCFDmltj1z-tby-dwInmKjyyY5yi9GL2LC1C4Uk6VBEBuWkzx0cOOmg8PugK16vFBmBPFfsc6Yo_ZrVuMubZ9lQthCant11eM-4EvmZPBGo904nJ3TEJqMk0uwOMzPkTfVGa5BlcUvk8eh6GfWrp4jKdPKkvFJ0zVHuEtRhDKijYE_f-0AvX2Wtabx1Rj_R5z98jDKS39pIkZpr8Z9QKrkL6INki0VoR_bFq2FakvaiWO6MfSKxEg07Tyr1vS77w_UxyfLi93fN88MDSQXYJFPEQ","e":"AQAB"},"attributes":{"enabled":true,"created":1610427959,"updated":1610427959,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90}}, [
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
  '9ec33eb1-b841-42f4-bb74-541439d12083',
  'x-ms-keyvault-service-version',
  '1.2.99.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=76.121.141.80;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 12 Jan 2021 05:05:59 GMT',
  'Content-Length',
  '769'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/challengeAuthKeyName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1/create', {"kty":"RSA"})
  .query(true)
  .reply(200, {"key":{"kid":"https://keyvault_name.vault.azure.net/keys/challengeAuthKeyName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1/1c7a30d7f9614f26a7b90d3a062c7555","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"_VMrpNFvrIH9_pX0IgVohwH4prHkbDcwf5If3ZGeB3A0pYwTG78gqGbpairJgeiGjhurVQMClrqgkLh3c_MVXAtjdhaNHLWUFHNDFyBwae51EhpLnMthR7zMqcsgXDe_KZiYEK_10xIxGU-tXYcllMAFxSs99gU-es7sFGKIEIqV4Zggcy_nk8nWUKh7L4J57p87lTxaAn5vDpCaLUoFj0yuJTOKjEvmiSW2jsUgVxwineZIP-en_IzgD2fSMD7AtoSCLfzVlf3WAb3dYJNptrHTXfd6qMU10GsrGrte6qEhI6Ch-WQZ0XSS1W76vsIhY7d_wQasx-gn8PApBtnBHQ","e":"AQAB"},"attributes":{"enabled":true,"created":1610427959,"updated":1610427959,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90}}, [
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
  '5d7bbb8f-f27f-4b45-aebb-2f483a8faa37',
  'x-ms-keyvault-service-version',
  '1.2.99.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=76.121.141.80;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 12 Jan 2021 05:05:58 GMT',
  'Content-Length',
  '769'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/keys/challengeAuthKeyName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/challengeAuthKeyName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0","deletedDate":1610427959,"scheduledPurgeDate":1618203959,"key":{"kid":"https://keyvault_name.vault.azure.net/keys/challengeAuthKeyName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0/bfa258baa81c419587c91984719accf4","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"2IyGbVNLhplhENUxx1EHudYQJL0k-cPkE6sGELEWe8W7VLzWlWYN1SQYBT4ZsPBCFDmltj1z-tby-dwInmKjyyY5yi9GL2LC1C4Uk6VBEBuWkzx0cOOmg8PugK16vFBmBPFfsc6Yo_ZrVuMubZ9lQthCant11eM-4EvmZPBGo904nJ3TEJqMk0uwOMzPkTfVGa5BlcUvk8eh6GfWrp4jKdPKkvFJ0zVHuEtRhDKijYE_f-0AvX2Wtabx1Rj_R5z98jDKS39pIkZpr8Z9QKrkL6INki0VoR_bFq2FakvaiWO6MfSKxEg07Tyr1vS77w_UxyfLi93fN88MDSQXYJFPEQ","e":"AQAB"},"attributes":{"enabled":true,"created":1610427959,"updated":1610427959,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90}}, [
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
  '62f169b9-f7ab-476f-8c8f-0ce4fd0cd1c1',
  'x-ms-keyvault-service-version',
  '1.2.99.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=76.121.141.80;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 12 Jan 2021 05:05:59 GMT',
  'Content-Length',
  '992'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/challengeAuthKeyName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: challengeAuthKeyName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '162',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '6965f885-2c37-42fc-9c7e-3d4dd42d3eb9',
  'x-ms-keyvault-service-version',
  '1.2.99.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=76.121.141.80;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 12 Jan 2021 05:05:58 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/challengeAuthKeyName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: challengeAuthKeyName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '162',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '75cf2ef9-7867-4d7d-b646-5ff5153cf0c5',
  'x-ms-keyvault-service-version',
  '1.2.99.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=76.121.141.80;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 12 Jan 2021 05:05:59 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/challengeAuthKeyName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/challengeAuthKeyName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0","deletedDate":1610427959,"scheduledPurgeDate":1618203959,"key":{"kid":"https://keyvault_name.vault.azure.net/keys/challengeAuthKeyName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0/bfa258baa81c419587c91984719accf4","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"2IyGbVNLhplhENUxx1EHudYQJL0k-cPkE6sGELEWe8W7VLzWlWYN1SQYBT4ZsPBCFDmltj1z-tby-dwInmKjyyY5yi9GL2LC1C4Uk6VBEBuWkzx0cOOmg8PugK16vFBmBPFfsc6Yo_ZrVuMubZ9lQthCant11eM-4EvmZPBGo904nJ3TEJqMk0uwOMzPkTfVGa5BlcUvk8eh6GfWrp4jKdPKkvFJ0zVHuEtRhDKijYE_f-0AvX2Wtabx1Rj_R5z98jDKS39pIkZpr8Z9QKrkL6INki0VoR_bFq2FakvaiWO6MfSKxEg07Tyr1vS77w_UxyfLi93fN88MDSQXYJFPEQ","e":"AQAB"},"attributes":{"enabled":true,"created":1610427959,"updated":1610427959,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90}}, [
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
  'baddf316-2e94-4e63-98b6-b97b07c1b655',
  'x-ms-keyvault-service-version',
  '1.2.99.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=76.121.141.80;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 12 Jan 2021 05:06:01 GMT',
  'Content-Length',
  '992'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedkeys/challengeAuthKeyName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0')
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
  'eba7d4bd-afea-4959-8246-88a599583059',
  'x-ms-keyvault-service-version',
  '1.2.99.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=76.121.141.80;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 12 Jan 2021 05:06:01 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/keys/challengeAuthKeyName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/challengeAuthKeyName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1","deletedDate":1610427961,"scheduledPurgeDate":1618203961,"key":{"kid":"https://keyvault_name.vault.azure.net/keys/challengeAuthKeyName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1/1c7a30d7f9614f26a7b90d3a062c7555","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"_VMrpNFvrIH9_pX0IgVohwH4prHkbDcwf5If3ZGeB3A0pYwTG78gqGbpairJgeiGjhurVQMClrqgkLh3c_MVXAtjdhaNHLWUFHNDFyBwae51EhpLnMthR7zMqcsgXDe_KZiYEK_10xIxGU-tXYcllMAFxSs99gU-es7sFGKIEIqV4Zggcy_nk8nWUKh7L4J57p87lTxaAn5vDpCaLUoFj0yuJTOKjEvmiSW2jsUgVxwineZIP-en_IzgD2fSMD7AtoSCLfzVlf3WAb3dYJNptrHTXfd6qMU10GsrGrte6qEhI6Ch-WQZ0XSS1W76vsIhY7d_wQasx-gn8PApBtnBHQ","e":"AQAB"},"attributes":{"enabled":true,"created":1610427959,"updated":1610427959,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90}}, [
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
  'a11dedca-b5d8-403d-b7bf-bfd6f1767014',
  'x-ms-keyvault-service-version',
  '1.2.99.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=76.121.141.80;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 12 Jan 2021 05:06:01 GMT',
  'Content-Length',
  '992'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/challengeAuthKeyName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: challengeAuthKeyName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '162',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '4bc1c65f-c700-4587-81a4-694b3b2fab7a',
  'x-ms-keyvault-service-version',
  '1.2.99.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=76.121.141.80;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 12 Jan 2021 05:06:01 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/challengeAuthKeyName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: challengeAuthKeyName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '162',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'a0ed045d-3d8c-4251-b03e-92240581313f',
  'x-ms-keyvault-service-version',
  '1.2.99.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=76.121.141.80;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 12 Jan 2021 05:06:01 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/challengeAuthKeyName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/challengeAuthKeyName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1","deletedDate":1610427961,"scheduledPurgeDate":1618203961,"key":{"kid":"https://keyvault_name.vault.azure.net/keys/challengeAuthKeyName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1/1c7a30d7f9614f26a7b90d3a062c7555","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"_VMrpNFvrIH9_pX0IgVohwH4prHkbDcwf5If3ZGeB3A0pYwTG78gqGbpairJgeiGjhurVQMClrqgkLh3c_MVXAtjdhaNHLWUFHNDFyBwae51EhpLnMthR7zMqcsgXDe_KZiYEK_10xIxGU-tXYcllMAFxSs99gU-es7sFGKIEIqV4Zggcy_nk8nWUKh7L4J57p87lTxaAn5vDpCaLUoFj0yuJTOKjEvmiSW2jsUgVxwineZIP-en_IzgD2fSMD7AtoSCLfzVlf3WAb3dYJNptrHTXfd6qMU10GsrGrte6qEhI6Ch-WQZ0XSS1W76vsIhY7d_wQasx-gn8PApBtnBHQ","e":"AQAB"},"attributes":{"enabled":true,"created":1610427959,"updated":1610427959,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90}}, [
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
  '2caa99aa-b834-433a-8d35-8626e75fb629',
  'x-ms-keyvault-service-version',
  '1.2.99.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=76.121.141.80;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 12 Jan 2021 05:06:03 GMT',
  'Content-Length',
  '992'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedkeys/challengeAuthKeyName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1')
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
  '39b8f289-87c9-4667-8fac-4b04f9568e10',
  'x-ms-keyvault-service-version',
  '1.2.99.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=76.121.141.80;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 12 Jan 2021 05:06:03 GMT'
]);

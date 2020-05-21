let nock = require('nock');

module.exports.hash = "8e1ed616c8f98452f7d7e14d2faf4df5";

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
  'Server',
  'Microsoft-IIS/10.0',
  'WWW-Authenticate',
  'Bearer authorization="https://login.windows.net/azure_tenant_id", resource="https://vault.azure.net"',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '3a4a940d-794c-401d-97ea-2e276edc5ba0',
  'x-ms-keyvault-service-version',
  '1.1.3.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=13.77.147.84;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 21 May 2020 13:55:33 GMT'
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
  '4e7a94fc-cd80-4e26-b66f-59a9d5d15a00',
  'x-ms-ests-server',
  '2.1.10571.11 - EUS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AnV6iUkuw_dEqE1FKZS0Ek0_aSJHAQAAAFV_WNYOAAAA; expires=Sat, 20-Jun-2020 13:55:33 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; SameSite=None; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; SameSite=None; secure; HttpOnly',
  'Date',
  'Thu, 21 May 2020 13:55:33 GMT',
  'Content-Length',
  '1315'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/challengeAuthKeyName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0/create', {"kty":"RSA"})
  .query(true)
  .reply(200, {"key":{"kid":"https://keyvault_name.vault.azure.net/keys/challengeAuthKeyName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0/6f9e43dc4a2a4661acfcca624b67ef3c","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"reXhanh-r_JsV9vRCU2zJlgtU_vDZ9ZTo_GxoG2UjfI_RxWQPtNTEaOkIKaIff9YAfM5LWcgMsdRYMlpFSr4nIaYHphmzGQFEH4vKQ908r0bB2NT_8JJKP8ft2cgXqNM49i1bSOwVp_jDx1v4m7FKWKEckeovg3LgJvRuYVpzjMMjh7wNaHy1DoDG-BTZcpsl-1UGVbo3BtoVeHS5PNRdNub7pAkj4YJnJy3l22BEdiKUoD07eE8TpB-lZQtc1o4GTWyf_R-_pStvEwL_e65fX2NLzvd_H7LwYkUZmzjotF9d9ZcmmNoUcFw2YzuxUCurthrSKPqfWCL_G89__AvNw","e":"AQAB"},"attributes":{"enabled":true,"created":1590069333,"updated":1590069333,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'e85f44e8-d89f-432b-981b-83a1ac35b495',
  'x-ms-keyvault-service-version',
  '1.1.3.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=13.77.147.84;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 21 May 2020 13:55:33 GMT',
  'Content-Length',
  '769'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/challengeAuthKeyName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1/create', {"kty":"RSA"})
  .query(true)
  .reply(200, {"key":{"kid":"https://keyvault_name.vault.azure.net/keys/challengeAuthKeyName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1/4b4fb090dfcf474da0016a17b182b868","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"yBZvafXaYEz4pP_uwsr4ogiqwfTy4wB3bNB6Nxd7Fgo3NRxYL2zCFZTPmrnyPJpJ1f1jbCUR2TY6d--NK8ShuJvCqbDimk1uMWbCO2Sl0XJ3vAUI9nD2uedPO9F7M-13s3eB4C0C_zWsl4Pf77mEZiHScZvZJnERechj03fCvL9XXnSyhUXjzfkD9k-54F-JWFERKcr0oaX2aoKPANHOGeoiJ-Rm6MwwrssJYONiTWzVdGS8OBiqKJvLeRmIOE7XvysLvUVa2ES1tFxEDRR4TaXw3coSamCHf3_C_Apa_lrKLZ6D62MEH1FX-ObQuGu2hBB9RgUcmAWTC4CQr3jIYw","e":"AQAB"},"attributes":{"enabled":true,"created":1590069333,"updated":1590069333,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'cea4f572-d8cf-44aa-a62b-9f4cadd42cb4',
  'x-ms-keyvault-service-version',
  '1.1.3.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=13.77.147.84;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 21 May 2020 13:55:33 GMT',
  'Content-Length',
  '769'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/keys/challengeAuthKeyName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/challengeAuthKeyName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0","deletedDate":1590069334,"scheduledPurgeDate":1597845334,"key":{"kid":"https://keyvault_name.vault.azure.net/keys/challengeAuthKeyName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0/6f9e43dc4a2a4661acfcca624b67ef3c","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"reXhanh-r_JsV9vRCU2zJlgtU_vDZ9ZTo_GxoG2UjfI_RxWQPtNTEaOkIKaIff9YAfM5LWcgMsdRYMlpFSr4nIaYHphmzGQFEH4vKQ908r0bB2NT_8JJKP8ft2cgXqNM49i1bSOwVp_jDx1v4m7FKWKEckeovg3LgJvRuYVpzjMMjh7wNaHy1DoDG-BTZcpsl-1UGVbo3BtoVeHS5PNRdNub7pAkj4YJnJy3l22BEdiKUoD07eE8TpB-lZQtc1o4GTWyf_R-_pStvEwL_e65fX2NLzvd_H7LwYkUZmzjotF9d9ZcmmNoUcFw2YzuxUCurthrSKPqfWCL_G89__AvNw","e":"AQAB"},"attributes":{"enabled":true,"created":1590069333,"updated":1590069333,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'a676c6b0-fec9-4708-8e1a-04197bc686db',
  'x-ms-keyvault-service-version',
  '1.1.3.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=13.77.147.84;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 21 May 2020 13:55:33 GMT',
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
  '163',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'a1066488-7ef2-49ef-be17-9da50947d5b7',
  'x-ms-keyvault-service-version',
  '1.1.3.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=13.77.147.84;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 21 May 2020 13:55:34 GMT'
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
  '163',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '6bf92989-19d4-4245-8f43-92c4d1292e12',
  'x-ms-keyvault-service-version',
  '1.1.3.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=13.77.147.84;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 21 May 2020 13:55:34 GMT'
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
  '163',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '9eecfb70-f43b-46ee-b861-5febb833cf1b',
  'x-ms-keyvault-service-version',
  '1.1.3.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=13.77.147.84;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 21 May 2020 13:55:36 GMT'
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
  '163',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'ffdcaef1-e24a-415b-b253-d3aae00fef6e',
  'x-ms-keyvault-service-version',
  '1.1.3.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=13.77.147.84;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 21 May 2020 13:55:38 GMT'
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
  '163',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '9dbee434-49ca-45b6-9ef1-7711aa49cfe2',
  'x-ms-keyvault-service-version',
  '1.1.3.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=13.77.147.84;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 21 May 2020 13:55:40 GMT'
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
  '163',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '0a700a9e-6bac-4a31-842a-8908265d713d',
  'x-ms-keyvault-service-version',
  '1.1.3.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=13.77.147.84;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 21 May 2020 13:55:42 GMT'
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
  '163',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'dd5ce57a-3225-42e7-a4f5-7f0117bb59f1',
  'x-ms-keyvault-service-version',
  '1.1.3.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=13.77.147.84;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 21 May 2020 13:55:44 GMT'
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
  '163',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'd27ca9ec-cdd3-40c1-bb4c-b4f424577f3e',
  'x-ms-keyvault-service-version',
  '1.1.3.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=13.77.147.84;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 21 May 2020 13:55:46 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/challengeAuthKeyName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/challengeAuthKeyName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0","deletedDate":1590069334,"scheduledPurgeDate":1597845334,"key":{"kid":"https://keyvault_name.vault.azure.net/keys/challengeAuthKeyName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0/6f9e43dc4a2a4661acfcca624b67ef3c","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"reXhanh-r_JsV9vRCU2zJlgtU_vDZ9ZTo_GxoG2UjfI_RxWQPtNTEaOkIKaIff9YAfM5LWcgMsdRYMlpFSr4nIaYHphmzGQFEH4vKQ908r0bB2NT_8JJKP8ft2cgXqNM49i1bSOwVp_jDx1v4m7FKWKEckeovg3LgJvRuYVpzjMMjh7wNaHy1DoDG-BTZcpsl-1UGVbo3BtoVeHS5PNRdNub7pAkj4YJnJy3l22BEdiKUoD07eE8TpB-lZQtc1o4GTWyf_R-_pStvEwL_e65fX2NLzvd_H7LwYkUZmzjotF9d9ZcmmNoUcFw2YzuxUCurthrSKPqfWCL_G89__AvNw","e":"AQAB"},"attributes":{"enabled":true,"created":1590069333,"updated":1590069333,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '969a1c6e-2c21-4e6d-8224-2151190941ac',
  'x-ms-keyvault-service-version',
  '1.1.3.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=13.77.147.84;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 21 May 2020 13:55:48 GMT',
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
  'Server',
  'Microsoft-IIS/10.0',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'dab9b0f9-612d-4cdc-97be-2631cfae4e96',
  'x-ms-keyvault-service-version',
  '1.1.3.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=13.77.147.84;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 21 May 2020 13:55:48 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/keys/challengeAuthKeyName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/challengeAuthKeyName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1","deletedDate":1590069348,"scheduledPurgeDate":1597845348,"key":{"kid":"https://keyvault_name.vault.azure.net/keys/challengeAuthKeyName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1/4b4fb090dfcf474da0016a17b182b868","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"yBZvafXaYEz4pP_uwsr4ogiqwfTy4wB3bNB6Nxd7Fgo3NRxYL2zCFZTPmrnyPJpJ1f1jbCUR2TY6d--NK8ShuJvCqbDimk1uMWbCO2Sl0XJ3vAUI9nD2uedPO9F7M-13s3eB4C0C_zWsl4Pf77mEZiHScZvZJnERechj03fCvL9XXnSyhUXjzfkD9k-54F-JWFERKcr0oaX2aoKPANHOGeoiJ-Rm6MwwrssJYONiTWzVdGS8OBiqKJvLeRmIOE7XvysLvUVa2ES1tFxEDRR4TaXw3coSamCHf3_C_Apa_lrKLZ6D62MEH1FX-ObQuGu2hBB9RgUcmAWTC4CQr3jIYw","e":"AQAB"},"attributes":{"enabled":true,"created":1590069333,"updated":1590069333,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'd0f88c45-dbe1-4388-a9a2-56242f31734e',
  'x-ms-keyvault-service-version',
  '1.1.3.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=13.77.147.84;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 21 May 2020 13:55:48 GMT',
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
  '163',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '97b4dd97-8eec-4945-a1eb-f5914b8ff1d9',
  'x-ms-keyvault-service-version',
  '1.1.3.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=13.77.147.84;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 21 May 2020 13:55:48 GMT'
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
  '163',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '94120c86-d8ed-4139-b635-e44c39865689',
  'x-ms-keyvault-service-version',
  '1.1.3.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=13.77.147.84;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 21 May 2020 13:55:48 GMT'
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
  '163',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '9062cf32-3f65-483f-945f-bb362c208dca',
  'x-ms-keyvault-service-version',
  '1.1.3.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=13.77.147.84;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 21 May 2020 13:55:50 GMT'
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
  '163',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '1c943ac0-9230-4f11-8c1c-fac6fe6e27d8',
  'x-ms-keyvault-service-version',
  '1.1.3.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=13.77.147.84;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 21 May 2020 13:55:52 GMT'
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
  '163',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'fbc75e55-320a-4636-8b6d-2f9a8ba981b8',
  'x-ms-keyvault-service-version',
  '1.1.3.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=13.77.147.84;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 21 May 2020 13:55:54 GMT'
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
  '163',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'e826bd82-49e2-47e5-b460-02fcfae6397f',
  'x-ms-keyvault-service-version',
  '1.1.3.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=13.77.147.84;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 21 May 2020 13:55:57 GMT'
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
  '163',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '2dde6ca2-409c-4395-bc33-56a8c4fb8c67',
  'x-ms-keyvault-service-version',
  '1.1.3.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=13.77.147.84;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 21 May 2020 13:55:59 GMT'
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
  '163',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'd753861c-8faf-490c-b820-fe12b1c930f0',
  'x-ms-keyvault-service-version',
  '1.1.3.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=13.77.147.84;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 21 May 2020 13:56:01 GMT'
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
  '163',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '97a7bcfc-53ea-49fb-afae-73843ee2759c',
  'x-ms-keyvault-service-version',
  '1.1.3.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=13.77.147.84;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 21 May 2020 13:56:03 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/challengeAuthKeyName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/challengeAuthKeyName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1","deletedDate":1590069348,"scheduledPurgeDate":1597845348,"key":{"kid":"https://keyvault_name.vault.azure.net/keys/challengeAuthKeyName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1/4b4fb090dfcf474da0016a17b182b868","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"yBZvafXaYEz4pP_uwsr4ogiqwfTy4wB3bNB6Nxd7Fgo3NRxYL2zCFZTPmrnyPJpJ1f1jbCUR2TY6d--NK8ShuJvCqbDimk1uMWbCO2Sl0XJ3vAUI9nD2uedPO9F7M-13s3eB4C0C_zWsl4Pf77mEZiHScZvZJnERechj03fCvL9XXnSyhUXjzfkD9k-54F-JWFERKcr0oaX2aoKPANHOGeoiJ-Rm6MwwrssJYONiTWzVdGS8OBiqKJvLeRmIOE7XvysLvUVa2ES1tFxEDRR4TaXw3coSamCHf3_C_Apa_lrKLZ6D62MEH1FX-ObQuGu2hBB9RgUcmAWTC4CQr3jIYw","e":"AQAB"},"attributes":{"enabled":true,"created":1590069333,"updated":1590069333,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '4de55b99-056f-4263-bb53-439eecb0f71c',
  'x-ms-keyvault-service-version',
  '1.1.3.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=13.77.147.84;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 21 May 2020 13:56:04 GMT',
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
  'Server',
  'Microsoft-IIS/10.0',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '7e53da54-c924-4ab9-b3e6-0eb6276023d1',
  'x-ms-keyvault-service-version',
  '1.1.3.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=13.77.147.84;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 21 May 2020 13:56:05 GMT'
]);

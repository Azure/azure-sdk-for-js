let nock = require('nock');

module.exports.hash = "73e834376bee4d652998a7a58eed9c0c";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .put('/secrets/challengeAuthSecretName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0')
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
  '07a42d0b-2499-4a42-bfe1-c45735238a09',
  'x-ms-keyvault-service-version',
  '1.1.5.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.18.165;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 26 May 2020 12:26:04 GMT'
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
  'e777593c-381f-4261-acfe-10a9ec02ff00',
  'x-ms-ests-server',
  '2.1.10571.11 - NCUS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AvyLi_kxbJFNt4tT9PrFhPY_aSJHAQAAANsBX9YOAAAA; expires=Thu, 25-Jun-2020 12:26:04 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; SameSite=None; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; SameSite=None; secure; HttpOnly',
  'Date',
  'Tue, 26 May 2020 12:26:04 GMT',
  'Content-Length',
  '1315'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .put('/secrets/challengeAuthSecretName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0', {"value":"value","attributes":{}})
  .query(true)
  .reply(200, {"value":"value","id":"https://keyvault_name.vault.azure.net/secrets/challengeAuthSecretName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0/aa2e816a1940457cb947b7bd06872319","attributes":{"enabled":true,"created":1590495964,"updated":1590495964,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90}}, [
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
  '98dcbe7a-611a-43b0-b0ea-5e01a437f6de',
  'x-ms-keyvault-service-version',
  '1.1.5.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.18.165;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 26 May 2020 12:26:04 GMT',
  'Content-Length',
  '339'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .put('/secrets/challengeAuthSecretName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1', {"value":"value","attributes":{}})
  .query(true)
  .reply(200, {"value":"value","id":"https://keyvault_name.vault.azure.net/secrets/challengeAuthSecretName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1/dafcc4ba21da439093d5b77607bc4bf3","attributes":{"enabled":true,"created":1590495964,"updated":1590495964,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90}}, [
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
  '0bf7340d-d0a9-40db-86bb-8b880e6a29e1',
  'x-ms-keyvault-service-version',
  '1.1.5.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.18.165;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 26 May 2020 12:26:04 GMT',
  'Content-Length',
  '339'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/secrets/challengeAuthSecretName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedsecrets/challengeAuthSecretName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0","deletedDate":1590495965,"scheduledPurgeDate":1598271965,"id":"https://keyvault_name.vault.azure.net/secrets/challengeAuthSecretName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0/aa2e816a1940457cb947b7bd06872319","attributes":{"enabled":true,"created":1590495964,"updated":1590495964,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90}}, [
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
  '0dd1ca27-66bf-4041-a4f7-77f74116d131',
  'x-ms-keyvault-service-version',
  '1.1.5.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.18.165;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 26 May 2020 12:26:04 GMT',
  'Content-Length',
  '551'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets/challengeAuthSecretName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0')
  .query(true)
  .reply(404, {"error":{"code":"SecretNotFound","message":"Deleted Secret not found: challengeAuthSecretName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '171',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'cf6f3f60-0c85-4f2c-a8e5-1202f003a9d4',
  'x-ms-keyvault-service-version',
  '1.1.5.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.18.165;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 26 May 2020 12:26:04 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets/challengeAuthSecretName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0')
  .query(true)
  .reply(404, {"error":{"code":"SecretNotFound","message":"Deleted Secret not found: challengeAuthSecretName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '171',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '0406d7d9-6049-471c-aabe-28ffd431ddbe',
  'x-ms-keyvault-service-version',
  '1.1.5.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.18.165;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 26 May 2020 12:26:04 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets/challengeAuthSecretName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0')
  .query(true)
  .reply(404, {"error":{"code":"SecretNotFound","message":"Deleted Secret not found: challengeAuthSecretName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '171',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '7f216b77-7f86-4018-900c-7961548f30af',
  'x-ms-keyvault-service-version',
  '1.1.5.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.18.165;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 26 May 2020 12:26:06 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets/challengeAuthSecretName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0')
  .query(true)
  .reply(404, {"error":{"code":"SecretNotFound","message":"Deleted Secret not found: challengeAuthSecretName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '171',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'a5c5157f-a5f7-4a69-969e-2f661c73c313',
  'x-ms-keyvault-service-version',
  '1.1.5.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.18.165;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 26 May 2020 12:26:08 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets/challengeAuthSecretName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0')
  .query(true)
  .reply(404, {"error":{"code":"SecretNotFound","message":"Deleted Secret not found: challengeAuthSecretName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '171',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'b4ea97f0-26a5-4748-96b3-92fb70f01ca1',
  'x-ms-keyvault-service-version',
  '1.1.5.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.18.165;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 26 May 2020 12:26:10 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets/challengeAuthSecretName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0')
  .query(true)
  .reply(404, {"error":{"code":"SecretNotFound","message":"Deleted Secret not found: challengeAuthSecretName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '171',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '074ff200-67e6-46b3-b2c2-de338d6e78bc',
  'x-ms-keyvault-service-version',
  '1.1.5.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.18.165;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 26 May 2020 12:26:12 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets/challengeAuthSecretName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0')
  .query(true)
  .reply(404, {"error":{"code":"SecretNotFound","message":"Deleted Secret not found: challengeAuthSecretName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '171',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'a0810091-3346-4323-8249-065bd5c4800d',
  'x-ms-keyvault-service-version',
  '1.1.5.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.18.165;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 26 May 2020 12:26:14 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets/challengeAuthSecretName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0')
  .query(true)
  .reply(404, {"error":{"code":"SecretNotFound","message":"Deleted Secret not found: challengeAuthSecretName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '171',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '7c234c8f-2b2c-41b2-ad75-6603a9260782',
  'x-ms-keyvault-service-version',
  '1.1.5.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.18.165;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 26 May 2020 12:26:16 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets/challengeAuthSecretName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0')
  .query(true)
  .reply(404, {"error":{"code":"SecretNotFound","message":"Deleted Secret not found: challengeAuthSecretName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '171',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '72ffd839-d269-4328-9ba9-94ba0ae5f676',
  'x-ms-keyvault-service-version',
  '1.1.5.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.18.165;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 26 May 2020 12:26:18 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets/challengeAuthSecretName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0')
  .query(true)
  .reply(404, {"error":{"code":"SecretNotFound","message":"Deleted Secret not found: challengeAuthSecretName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '171',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'adb77d26-be1a-47fe-9f7b-f1ab6e37a219',
  'x-ms-keyvault-service-version',
  '1.1.5.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.18.165;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 26 May 2020 12:26:21 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets/challengeAuthSecretName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedsecrets/challengeAuthSecretName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0","deletedDate":1590495965,"scheduledPurgeDate":1598271965,"id":"https://keyvault_name.vault.azure.net/secrets/challengeAuthSecretName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0/aa2e816a1940457cb947b7bd06872319","attributes":{"enabled":true,"created":1590495964,"updated":1590495964,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90}}, [
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
  '04bd2d12-cee9-4163-913f-0073d6a7cbc7',
  'x-ms-keyvault-service-version',
  '1.1.5.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.18.165;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 26 May 2020 12:26:23 GMT',
  'Content-Length',
  '551'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedsecrets/challengeAuthSecretName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0')
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
  '043a231a-1258-4b52-9f34-a39f733edba4',
  'x-ms-keyvault-service-version',
  '1.1.5.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.18.165;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 26 May 2020 12:26:23 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/secrets/challengeAuthSecretName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedsecrets/challengeAuthSecretName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1","deletedDate":1590495983,"scheduledPurgeDate":1598271983,"id":"https://keyvault_name.vault.azure.net/secrets/challengeAuthSecretName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1/dafcc4ba21da439093d5b77607bc4bf3","attributes":{"enabled":true,"created":1590495964,"updated":1590495964,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90}}, [
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
  '31bb62b2-98a5-4961-b772-f67b05a1e25a',
  'x-ms-keyvault-service-version',
  '1.1.5.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.18.165;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 26 May 2020 12:26:23 GMT',
  'Content-Length',
  '551'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets/challengeAuthSecretName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1')
  .query(true)
  .reply(404, {"error":{"code":"SecretNotFound","message":"Deleted Secret not found: challengeAuthSecretName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '171',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'edcefcff-abc9-4f3e-af2b-4e27b948ce14',
  'x-ms-keyvault-service-version',
  '1.1.5.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.18.165;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 26 May 2020 12:26:23 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets/challengeAuthSecretName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1')
  .query(true)
  .reply(404, {"error":{"code":"SecretNotFound","message":"Deleted Secret not found: challengeAuthSecretName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '171',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'f4018b62-d067-499e-80db-4ab887de0bd0',
  'x-ms-keyvault-service-version',
  '1.1.5.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.18.165;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 26 May 2020 12:26:23 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets/challengeAuthSecretName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1')
  .query(true)
  .reply(404, {"error":{"code":"SecretNotFound","message":"Deleted Secret not found: challengeAuthSecretName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '171',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '5a419132-cf4e-41fc-9de8-f23664010ad2',
  'x-ms-keyvault-service-version',
  '1.1.5.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.18.165;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 26 May 2020 12:26:25 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets/challengeAuthSecretName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1')
  .query(true)
  .reply(404, {"error":{"code":"SecretNotFound","message":"Deleted Secret not found: challengeAuthSecretName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '171',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '2b95d136-5d4a-4b68-b596-1f02683d32cf',
  'x-ms-keyvault-service-version',
  '1.1.5.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.18.165;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 26 May 2020 12:26:27 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets/challengeAuthSecretName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1')
  .query(true)
  .reply(404, {"error":{"code":"SecretNotFound","message":"Deleted Secret not found: challengeAuthSecretName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '171',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '3b41e9ee-9132-4cfa-b4c5-6410ee3731b4',
  'x-ms-keyvault-service-version',
  '1.1.5.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.18.165;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 26 May 2020 12:26:29 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets/challengeAuthSecretName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1')
  .query(true)
  .reply(404, {"error":{"code":"SecretNotFound","message":"Deleted Secret not found: challengeAuthSecretName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '171',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '995f4a54-c056-4f17-b541-f379a440dabb',
  'x-ms-keyvault-service-version',
  '1.1.5.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.18.165;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 26 May 2020 12:26:31 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets/challengeAuthSecretName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1')
  .query(true)
  .reply(404, {"error":{"code":"SecretNotFound","message":"Deleted Secret not found: challengeAuthSecretName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '171',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '5612f59d-f88d-42e3-b604-bb39cdfaa533',
  'x-ms-keyvault-service-version',
  '1.1.5.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.18.165;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 26 May 2020 12:26:34 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets/challengeAuthSecretName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1')
  .query(true)
  .reply(404, {"error":{"code":"SecretNotFound","message":"Deleted Secret not found: challengeAuthSecretName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '171',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '7f4283df-8264-47d2-b90b-42317388882e',
  'x-ms-keyvault-service-version',
  '1.1.5.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.18.165;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 26 May 2020 12:26:36 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets/challengeAuthSecretName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1')
  .query(true)
  .reply(404, {"error":{"code":"SecretNotFound","message":"Deleted Secret not found: challengeAuthSecretName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '171',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'a92263a4-6942-4255-a202-475ad2565edd',
  'x-ms-keyvault-service-version',
  '1.1.5.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.18.165;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 26 May 2020 12:26:37 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets/challengeAuthSecretName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedsecrets/challengeAuthSecretName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1","deletedDate":1590495983,"scheduledPurgeDate":1598271983,"id":"https://keyvault_name.vault.azure.net/secrets/challengeAuthSecretName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1/dafcc4ba21da439093d5b77607bc4bf3","attributes":{"enabled":true,"created":1590495964,"updated":1590495964,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90}}, [
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
  'a9270c48-9d5b-4349-b891-04e64089d81b',
  'x-ms-keyvault-service-version',
  '1.1.5.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.18.165;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 26 May 2020 12:26:39 GMT',
  'Content-Length',
  '551'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedsecrets/challengeAuthSecretName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1')
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
  '3379697a-b35b-4a01-ba06-d3114add40f9',
  'x-ms-keyvault-service-version',
  '1.1.5.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.18.165;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 26 May 2020 12:26:39 GMT'
]);

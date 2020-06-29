let nock = require('nock');

module.exports.hash = "d2bf3eb79fef9d5fb63debb44b4f1a0b";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .put('/secrets/listSecretName-canlistdeletedsecrets-0')
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
  '4313b550-57ee-4f6d-a8dd-11f20717b004',
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
  'Thu, 25 Jun 2020 13:03:34 GMT'
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
  '78454d94-2e34-4b52-9cd7-0e4880e44301',
  'x-ms-ests-server',
  '2.1.10732.8 - WUS2 ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AkKFNAdAEVNAscue3ufrhV4_aSJHAQAAAKaXhtYOAAAA; expires=Sat, 25-Jul-2020 13:03:35 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; SameSite=None; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; SameSite=None; secure; HttpOnly',
  'Date',
  'Thu, 25 Jun 2020 13:03:34 GMT',
  'Content-Length',
  '1315'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .put('/secrets/listSecretName-canlistdeletedsecrets-0', {"value":"RSA","attributes":{}})
  .query(true)
  .reply(200, {"value":"RSA","id":"https://keyvault_name.vault.azure.net/secrets/listSecretName-canlistdeletedsecrets-0/21dd0ffe841948b986e6f4abfabdc13f","attributes":{"enabled":true,"created":1593090215,"updated":1593090215,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90}}, [
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
  '518de5d0-485c-4c47-be52-b63dced45a1f',
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
  'Thu, 25 Jun 2020 13:03:35 GMT',
  'Content-Length',
  '294'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .put('/secrets/listSecretName-canlistdeletedsecrets-1', {"value":"RSA","attributes":{}})
  .query(true)
  .reply(200, {"value":"RSA","id":"https://keyvault_name.vault.azure.net/secrets/listSecretName-canlistdeletedsecrets-1/d017eb717fc847698d0284fefa89ef93","attributes":{"enabled":true,"created":1593090215,"updated":1593090215,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90}}, [
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
  'd1cdd0a5-0c34-4cb7-94f4-2611ecebaca6',
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
  'Thu, 25 Jun 2020 13:03:35 GMT',
  'Content-Length',
  '294'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/secrets/listSecretName-canlistdeletedsecrets-0')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedsecrets/listSecretName-canlistdeletedsecrets-0","deletedDate":1593090215,"scheduledPurgeDate":1600866215,"id":"https://keyvault_name.vault.azure.net/secrets/listSecretName-canlistdeletedsecrets-0/21dd0ffe841948b986e6f4abfabdc13f","attributes":{"enabled":true,"created":1593090215,"updated":1593090215,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90}}, [
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
  '5f92839c-3b13-494d-8912-6f8dbe310a40',
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
  'Thu, 25 Jun 2020 13:03:35 GMT',
  'Content-Length',
  '465'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets/listSecretName-canlistdeletedsecrets-0')
  .query(true)
  .reply(404, {"error":{"code":"SecretNotFound","message":"Deleted Secret not found: listSecretName-canlistdeletedsecrets-0"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '128',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '7ea041d9-4efa-4e4f-b35d-0472d0adb162',
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
  'Thu, 25 Jun 2020 13:03:35 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets/listSecretName-canlistdeletedsecrets-0')
  .query(true)
  .reply(404, {"error":{"code":"SecretNotFound","message":"Deleted Secret not found: listSecretName-canlistdeletedsecrets-0"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '128',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'f589378d-a60f-4be3-af60-34a51130a697',
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
  'Thu, 25 Jun 2020 13:03:35 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets/listSecretName-canlistdeletedsecrets-0')
  .query(true)
  .reply(404, {"error":{"code":"SecretNotFound","message":"Deleted Secret not found: listSecretName-canlistdeletedsecrets-0"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '128',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '9e231a7e-9959-4e6f-9ca7-5aefb7742fd7',
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
  'Thu, 25 Jun 2020 13:03:38 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets/listSecretName-canlistdeletedsecrets-0')
  .query(true)
  .reply(404, {"error":{"code":"SecretNotFound","message":"Deleted Secret not found: listSecretName-canlistdeletedsecrets-0"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '128',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '2034b557-caf6-4ece-9c5c-17049430a5a4',
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
  'Thu, 25 Jun 2020 13:03:40 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets/listSecretName-canlistdeletedsecrets-0')
  .query(true)
  .reply(404, {"error":{"code":"SecretNotFound","message":"Deleted Secret not found: listSecretName-canlistdeletedsecrets-0"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '128',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '30c084db-1268-4fe9-bd0c-54a35504d313',
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
  'Thu, 25 Jun 2020 13:03:41 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets/listSecretName-canlistdeletedsecrets-0')
  .query(true)
  .reply(404, {"error":{"code":"SecretNotFound","message":"Deleted Secret not found: listSecretName-canlistdeletedsecrets-0"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '128',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '6cb658a8-0e69-42e6-bb7a-68e159ccbeee',
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
  'Thu, 25 Jun 2020 13:03:43 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets/listSecretName-canlistdeletedsecrets-0')
  .query(true)
  .reply(404, {"error":{"code":"SecretNotFound","message":"Deleted Secret not found: listSecretName-canlistdeletedsecrets-0"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '128',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '703a443f-43be-4c77-b1d9-2f542ac12b86',
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
  'Thu, 25 Jun 2020 13:03:45 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets/listSecretName-canlistdeletedsecrets-0')
  .query(true)
  .reply(404, {"error":{"code":"SecretNotFound","message":"Deleted Secret not found: listSecretName-canlistdeletedsecrets-0"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '128',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '48103bb9-ae85-49b8-b19f-7f318212382d',
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
  'Thu, 25 Jun 2020 13:03:48 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets/listSecretName-canlistdeletedsecrets-0')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedsecrets/listSecretName-canlistdeletedsecrets-0","deletedDate":1593090215,"scheduledPurgeDate":1600866215,"id":"https://keyvault_name.vault.azure.net/secrets/listSecretName-canlistdeletedsecrets-0/21dd0ffe841948b986e6f4abfabdc13f","attributes":{"enabled":true,"created":1593090215,"updated":1593090215,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90}}, [
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
  'a373a42f-29f1-4240-ad37-96dc98685c41',
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
  'Thu, 25 Jun 2020 13:03:50 GMT',
  'Content-Length',
  '465'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/secrets/listSecretName-canlistdeletedsecrets-1')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedsecrets/listSecretName-canlistdeletedsecrets-1","deletedDate":1593090230,"scheduledPurgeDate":1600866230,"id":"https://keyvault_name.vault.azure.net/secrets/listSecretName-canlistdeletedsecrets-1/d017eb717fc847698d0284fefa89ef93","attributes":{"enabled":true,"created":1593090215,"updated":1593090215,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90}}, [
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
  '962b1327-ca7c-4c5f-bd32-05592e38a724',
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
  'Thu, 25 Jun 2020 13:03:50 GMT',
  'Content-Length',
  '465'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets/listSecretName-canlistdeletedsecrets-1')
  .query(true)
  .reply(404, {"error":{"code":"SecretNotFound","message":"Deleted Secret not found: listSecretName-canlistdeletedsecrets-1"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '128',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '6fbd6c55-d4a4-4e20-b81d-c4f5e63ff8de',
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
  'Thu, 25 Jun 2020 13:03:50 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets/listSecretName-canlistdeletedsecrets-1')
  .query(true)
  .reply(404, {"error":{"code":"SecretNotFound","message":"Deleted Secret not found: listSecretName-canlistdeletedsecrets-1"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '128',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '1cdd95cd-254c-4fdd-8c2f-b561c71f5873',
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
  'Thu, 25 Jun 2020 13:03:50 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets/listSecretName-canlistdeletedsecrets-1')
  .query(true)
  .reply(404, {"error":{"code":"SecretNotFound","message":"Deleted Secret not found: listSecretName-canlistdeletedsecrets-1"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '128',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '679b8521-6baa-419f-815b-953028346681',
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
  'Thu, 25 Jun 2020 13:03:52 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets/listSecretName-canlistdeletedsecrets-1')
  .query(true)
  .reply(404, {"error":{"code":"SecretNotFound","message":"Deleted Secret not found: listSecretName-canlistdeletedsecrets-1"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '128',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '74799cd0-c521-4964-b32f-61a837df2c82',
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
  'Thu, 25 Jun 2020 13:03:54 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets/listSecretName-canlistdeletedsecrets-1')
  .query(true)
  .reply(404, {"error":{"code":"SecretNotFound","message":"Deleted Secret not found: listSecretName-canlistdeletedsecrets-1"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '128',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'bec9043f-960c-4075-9223-5ee1477a4f7a',
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
  'Thu, 25 Jun 2020 13:03:57 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets/listSecretName-canlistdeletedsecrets-1')
  .query(true)
  .reply(404, {"error":{"code":"SecretNotFound","message":"Deleted Secret not found: listSecretName-canlistdeletedsecrets-1"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '128',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '98299f09-3704-4fb1-9d7c-6b56ce4a8cf0',
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
  'Thu, 25 Jun 2020 13:03:59 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets/listSecretName-canlistdeletedsecrets-1')
  .query(true)
  .reply(404, {"error":{"code":"SecretNotFound","message":"Deleted Secret not found: listSecretName-canlistdeletedsecrets-1"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '128',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '3603668d-9ae2-41d7-be7a-f0fbe9e2e453',
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
  'Thu, 25 Jun 2020 13:04:00 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets/listSecretName-canlistdeletedsecrets-1')
  .query(true)
  .reply(404, {"error":{"code":"SecretNotFound","message":"Deleted Secret not found: listSecretName-canlistdeletedsecrets-1"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '128',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'dc82e348-da98-490d-b0c3-a0158d024473',
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
  'Thu, 25 Jun 2020 13:04:02 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets/listSecretName-canlistdeletedsecrets-1')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedsecrets/listSecretName-canlistdeletedsecrets-1","deletedDate":1593090230,"scheduledPurgeDate":1600866230,"id":"https://keyvault_name.vault.azure.net/secrets/listSecretName-canlistdeletedsecrets-1/d017eb717fc847698d0284fefa89ef93","attributes":{"enabled":true,"created":1593090215,"updated":1593090215,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90}}, [
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
  'e99f33f6-af40-4124-96bb-10485b70b32e',
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
  'Thu, 25 Jun 2020 13:04:04 GMT',
  'Content-Length',
  '465'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedsecrets?api-version=7.1-preview&$skiptoken=eyJOZXh0TWFya2VyIjoiMiEyMzYhTURBd01UTXhJWE5sWTNKbGRDOURTRUZNVEVWT1IwVkJWVlJJUTBWU1ZFbEdTVU5CVkVWT1FVMUZMVUZWVkVoRlRsUkpRMEZVU1U5T1UwaFBWVXhFVjA5U1MwWlBVbEJCVWtGTVRFVk1Va1ZSVlVWVFZGTXRORFk1TWprNU9EVTBNemsyTXpBek1pMHhMekpGTVVKR05qSXdNVGRCUkRSRFFqSTVPRVJHT1VKR01qTkVRVU5FTmpSR0lUQXdNREF5T0NFNU9UazVMVEV5TFRNeFZESXpPalU1T2pVNUxqazVPVGs1T1RsYUlRLS0iLCJUYXJnZXRMb2NhdGlvbiI6MH0"}, [
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
  'aaadd78a-38f9-4486-becd-3f93ac00b7b0',
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
  'Thu, 25 Jun 2020 13:04:05 GMT',
  'Content-Length',
  '494'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedsecrets?api-version=7.1-preview&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExOTIhTURBd01EazRJWE5sWTNKbGRDOURTRUZNVEVWT1IwVkJWVlJJUTBWU1ZFbEdTVU5CVkVWT1FVMUZMVUZWVkVoRlRsUkpRMEZVU1U5T1UwaFBWVXhFVjA5U1MwWlBVbEJCVWtGTVRFVk1Va1ZSVlVWVFZGTXRPREl6TVRFNE9UWXdNREEyTkRjME15MHdJVEF3TURBeU9DRTVPVGs1TFRFeUxUTXhWREl6T2pVNU9qVTVMams1T1RrNU9UbGFJUS0tIiwiVGFyZ2V0TG9jYXRpb24iOjB9"}, [
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
  '7f56c93d-aa7e-49ba-9bbb-67a1712d1258',
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
  'Thu, 25 Jun 2020 13:04:05 GMT',
  'Content-Length',
  '435'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedsecrets?api-version=7.1-preview&$skiptoken=eyJOZXh0TWFya2VyIjoiMiEyNDghTURBd01UUXlJWE5sWTNKbGRDOURTRUZNVEVWT1IwVkJWVlJJUTBWU1ZFbEdTVU5CVkVWT1FVMUZMVTlPUTBWQlZWUklSVTVVU1VOQlZFVkVUa1ZYVWtWUlZVVlRWRk5UU0U5VlRFUk9UMVJCVlZSSVJVNVVTVU5CVkVWQlIwRkpUaTAyT1RjeU5UWTNPRFV4TkRVek5qazNMVEF2TjBJMFEwRkZRVE00TkVFeE5EQXpRVGt4UWpRNE5qazNSa1V6T1RKQk5UTWhNREF3TURJNElUazVPVGt0TVRJdE16RlVNak02TlRrNk5Ua3VPVGs1T1RrNU9Wb2giLCJUYXJnZXRMb2NhdGlvbiI6MH0"}, [
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
  '1d73f124-f849-49cf-b1d9-e93a9e3172ec',
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
  'Thu, 25 Jun 2020 13:04:05 GMT',
  'Content-Length',
  '510'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedsecrets?api-version=7.1-preview&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExODQhTURBd01EazBJWE5sWTNKbGRDOURTRUZNVEVWT1IwVkJWVlJJVTBWRFVrVlVUa0ZOUlMxQlZWUklSVTVVU1VOQlZFbFBUbE5JVDFWTVJGZFBVa3RHVDFKUVFWSkJURXhGVEZKRlVWVkZVMVJUTFRBME16TTNNRGN3TURRek5UQXpNRGMzTFRBaE1EQXdNREk0SVRrNU9Ua3RNVEl0TXpGVU1qTTZOVGs2TlRrdU9UazVPVGs1T1ZvaCIsIlRhcmdldExvY2F0aW9uIjowfQ"}, [
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
  '0d532335-f091-461a-a90e-5ff295760cce',
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
  'Thu, 25 Jun 2020 13:04:05 GMT',
  'Content-Length',
  '425'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedsecrets?api-version=7.1-preview&$skiptoken=eyJOZXh0TWFya2VyIjoiMiEyMDQhTURBd01UQTRJWE5sWTNKbGRDOURVbFZFUTBWU1ZFbEdTVU5CVkVWT1FVMUZMVU5CVGxWUVJFRlVSVlJJUlZSQlIxTlBSa0ZEUlZKVVNVWkpRMEZVUlMwek56UTBPRE01TXpNM05ESTROelV4TkM4eVJURXpSa0l4UWtJME9UQTBORGswT1RBNU1UaEVORE0yT1RFMU1EYzNNQ0V3TURBd01qZ2hPVGs1T1MweE1pMHpNVlF5TXpvMU9UbzFPUzQ1T1RrNU9UazVXaUUtIiwiVGFyZ2V0TG9jYXRpb24iOjB9"}, [
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
  'f317f397-d078-4821-8816-c74ba1d8e9a4',
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
  'Thu, 25 Jun 2020 13:04:06 GMT',
  'Content-Length',
  '451'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets')
  .query(true)
  .reply(200, {"value":[{"recoveryId":"https://keyvault_name.vault.azure.net/deletedsecrets/listSecretName-canlistdeletedsecrets-0","deletedDate":1593090215,"scheduledPurgeDate":1600866215,"id":"https://keyvault_name.vault.azure.net/secrets/listSecretName-canlistdeletedsecrets-0","attributes":{"enabled":true,"created":1593090215,"updated":1593090215,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90}}],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedsecrets?api-version=7.1-preview&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExNDAhTURBd01EWXhJWE5sWTNKbGRDOU1TVk5VVTBWRFVrVlVUa0ZOUlMxRFFVNU1TVk5VUkVWTVJWUkZSRk5GUTFKRlZGTXRORFEzTlRZME56YzFNRFU1T1RVMk16RWhNREF3TURJNElUazVPVGt0TVRJdE16RlVNak02TlRrNk5Ua3VPVGs1T1RrNU9Wb2giLCJUYXJnZXRMb2NhdGlvbiI6MH0"}, [
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
  'dfcee323-bbd1-40ca-829b-0901bb224b62',
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
  'Thu, 25 Jun 2020 13:04:06 GMT',
  'Content-Length',
  '798'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets')
  .query(true)
  .reply(200, {"value":[{"recoveryId":"https://keyvault_name.vault.azure.net/deletedsecrets/listSecretName-canlistdeletedsecrets-1","deletedDate":1593090230,"scheduledPurgeDate":1600866230,"id":"https://keyvault_name.vault.azure.net/secrets/listSecretName-canlistdeletedsecrets-1","attributes":{"enabled":true,"created":1593090215,"updated":1593090215,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90}}],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedsecrets?api-version=7.1-preview&$skiptoken=eyJOZXh0TWFya2VyIjoiMiEyNDAhTURBd01UTTFJWE5sWTNKbGRDOU5SVkpIUlVORlVsUkpSa2xEUVZSRlRrRk5SUzFEUVU1SlRWQlBVbFJCUTBWU1ZFbEdTVU5CVkVWR1VrOU5RVU5GVWxSSlJrbERRVlJGVTBKQlUwVTJORk5GUTFKRlZGWkJURlZGTFRBek56RXdPVGszTmpJd09ETTFNamc0TUM4M1JqVkJORGcyTXpRNU5qQTBRa05ET1VFMU56VkRSVUZCTmpVd1JqSXhSQ0V3TURBd01qZ2hPVGs1T1MweE1pMHpNVlF5TXpvMU9UbzFPUzQ1T1RrNU9UazVXaUUtIiwiVGFyZ2V0TG9jYXRpb24iOjB9"}, [
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
  '5b96c8d5-330e-412e-a5c8-e311cd8adb71',
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
  'Thu, 25 Jun 2020 13:04:06 GMT',
  'Content-Length',
  '931'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedsecrets?api-version=7.1-preview&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExOTYhTURBd01UQXlJWE5sWTNKbGRDOU5SVkpIUlVORlVsUkpSa2xEUVZSRlRrRk5SUzFEUVU1SlRWQlBVbFJCUTBWU1ZFbEdTVU5CVkVWR1VrOU5RVU5GVWxSSlJrbERRVlJGVTBKQlUwVTJORk5GUTFKRlZGWkJURlZGTFRJeU16STJNRE0zTWpJM01qazBPVGd4TVNFd01EQXdNamdoT1RrNU9TMHhNaTB6TVZReU16bzFPVG8xT1M0NU9UazVPVGs1V2lFLSIsIlRhcmdldExvY2F0aW9uIjowfQ"}, [
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
  'c1775175-e6e1-4537-8edb-3f33d60eba7a',
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
  'Thu, 25 Jun 2020 13:04:06 GMT',
  'Content-Length',
  '441'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedsecrets?api-version=7.1-preview&$skiptoken=eyJOZXh0TWFya2VyIjoiMiEyNDAhTURBd01UTTFJWE5sWTNKbGRDOU5SVkpIUlVORlVsUkpSa2xEUVZSRlRrRk5SUzFEUVU1SlRWQlBVbFJCUTBWU1ZFbEdTVU5CVkVWR1VrOU5RVU5GVWxSSlJrbERRVlJGVTBKQlUwVTJORk5GUTFKRlZGWkJURlZGTFRNNU1EQTJNak14TmpFeU1qSXhNVGczTUM4Mk16YzFOMEk1TmpCRE1UWTBNelZEUWpCRE56RkdSVFl3TWtSR1JERkZOaUV3TURBd01qZ2hPVGs1T1MweE1pMHpNVlF5TXpvMU9UbzFPUzQ1T1RrNU9UazVXaUUtIiwiVGFyZ2V0TG9jYXRpb24iOjB9"}, [
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
  '85faac68-29d7-46a4-a246-72133f6df059',
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
  'Thu, 25 Jun 2020 13:04:06 GMT',
  'Content-Length',
  '499'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedsecrets?api-version=7.1-preview&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExOTYhTURBd01UQXhJWE5sWTNKbGRDOU5SVkpIUlVORlVsUkpSa2xEUVZSRlRrRk5SUzFEUVU1SlRWQlBVbFJCUTBWU1ZFbEdTVU5CVkVWR1VrOU5RVU5GVWxSSlJrbERRVlJGVTBKQlUwVTJORk5GUTFKRlZGWkJURlZGTFRjMk5Ua3pNVGcwTWpVd016TTFNRFl4SVRBd01EQXlPQ0U1T1RrNUxURXlMVE14VkRJek9qVTVPalU1TGprNU9UazVPVGxhSVEtLSIsIlRhcmdldExvY2F0aW9uIjowfQ"}, [
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
  '8bfb76d6-f7ea-433b-b03d-fb259448e268',
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
  'Thu, 25 Jun 2020 13:04:06 GMT',
  'Content-Length',
  '441'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedsecrets?api-version=7.1-preview&$skiptoken=eyJOZXh0TWFya2VyIjoiMiEyNDAhTURBd01UTTBJWE5sWTNKbGRDOU5SVkpIUlVORlVsUkpSa2xEUVZSRlRrRk5SUzFEUVU1SlRWQlBVbFJCUTBWU1ZFbEdTVU5CVkVWR1VrOU5RVU5GVWxSSlJrbERRVlJGVTBKQlUwVTJORk5GUTFKRlZGWkJURlZGTFRrM01qWXlPVE0wTURNMU16VTFPRGt4TDBRMVF6QTFSVVV3TjBGQk5qUTROREZCTVRVME1qZERSVVZDTmpjME56ZzBJVEF3TURBeU9DRTVPVGs1TFRFeUxUTXhWREl6T2pVNU9qVTVMams1T1RrNU9UbGFJUS0tIiwiVGFyZ2V0TG9jYXRpb24iOjB9"}, [
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
  '12aec4a6-6990-4e61-90cb-c833d3dc90e6',
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
  'Thu, 25 Jun 2020 13:04:06 GMT',
  'Content-Length',
  '499'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedsecrets?api-version=7.1-preview&$skiptoken=eyJOZXh0TWFya2VyIjoiMiEyMDAhTURBd01UQTBJWE5sWTNKbGRDOU5SVkpIUlVORlVsUkpSa2xEUVZSRlRrRk5SUzFEUVU1SlRWQlBVbFJCUTBWU1ZFbEdTVU5CVkVWR1VrOU5RVU5GVWxSSlJrbERRVlJGVTA1UFRrSkJVMFUyTkZORlExSkZWRlpCVEZWRkxUWTNOVFExTmpjMk5EQTBNRGsxTkRNeElUQXdNREF5T0NFNU9UazVMVEV5TFRNeFZESXpPalU1T2pVNUxqazVPVGs1T1RsYUlRLS0iLCJUYXJnZXRMb2NhdGlvbiI6MH0"}, [
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
  '3a51197c-cfae-4527-9c34-ec119c1f4d04',
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
  'Thu, 25 Jun 2020 13:04:07 GMT',
  'Content-Length',
  '446'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedsecrets?api-version=7.1-preview&$skiptoken=eyJOZXh0TWFya2VyIjoiMiEyMDQhTURBd01UQTRJWE5sWTNKbGRDOU5SVkpIUlVORlVsUkpSa2xEUVZSRlRrRk5SUzFEUVU1TlJWSkhSVUZUUlV4R1UwbEhUa1ZFUTBWU1ZFbEdTVU5CVkVVdE9ERXpORGsxT1RVNE56RTVOakV5TWk4NU9FVkJRak5DTmpnM05FWTBSakk0T1RNd09UazROa0ZFTVRjeU1qTkJReUV3TURBd01qZ2hPVGs1T1MweE1pMHpNVlF5TXpvMU9UbzFPUzQ1T1RrNU9UazVXaUUtIiwiVGFyZ2V0TG9jYXRpb24iOjB9"}, [
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
  '37f9f87f-d7db-41d4-bd48-4be46d46087f',
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
  'Thu, 25 Jun 2020 13:04:07 GMT',
  'Content-Length',
  '451'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedsecrets?api-version=7.1-preview&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExNjAhTURBd01EYzFJWE5sWTNKbGRDOVNSVU5QVmtWU1EwVlNWRWxHU1VOQlZFVk9RVTFGTFVOQlRrRkNUMUpVUTFKRlFWUkpUa2RCUTBWU1ZFbEdTVU5CVkVVdE1qTXdNRFF5T1RNeE9Ea3lNRFUwTlNFd01EQXdNamdoT1RrNU9TMHhNaTB6TVZReU16bzFPVG8xT1M0NU9UazVPVGs1V2lFLSIsIlRhcmdldExvY2F0aW9uIjowfQ"}, [
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
  '63b23538-6475-4b5f-83be-71790ada3b49',
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
  'Thu, 25 Jun 2020 13:04:07 GMT',
  'Content-Length',
  '393'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedsecrets?api-version=7.1-preview&$skiptoken=eyJOZXh0TWFya2VyIjoiMiEyMDQhTURBd01UQTRJWE5sWTNKbGRDOVNSVU5QVmtWU1EwVlNWRWxHU1VOQlZFVk9RVTFGTFVOQlRrRkNUMUpVUTFKRlFWUkpUa2RCUTBWU1ZFbEdTVU5CVkVVdE5EYzJNRFl3TkRJMk5qa3dNelkyTVM5RU1rVTBRa1pFUmtNeE5EUTBRakE0T0RjMVF6TkRRek14TXpRd01EQkNSU0V3TURBd01qZ2hPVGs1T1MweE1pMHpNVlF5TXpvMU9UbzFPUzQ1T1RrNU9UazVXaUUtIiwiVGFyZ2V0TG9jYXRpb24iOjB9"}, [
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
  '613407a8-29f1-4bc6-b7e1-c005f928aec0',
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
  'Thu, 25 Jun 2020 13:04:07 GMT',
  'Content-Length',
  '451'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedsecrets?api-version=7.1-preview&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExNjAhTURBd01EYzFJWE5sWTNKbGRDOVNSVU5QVmtWU1EwVlNWRWxHU1VOQlZFVk9RVTFGTFVOQlRrRkNUMUpVUTFKRlFWUkpUa2RCUTBWU1ZFbEdTVU5CVkVVdE56Z3pOVE13T1RRM09EWTNOVGsyTXlFd01EQXdNamdoT1RrNU9TMHhNaTB6TVZReU16bzFPVG8xT1M0NU9UazVPVGs1V2lFLSIsIlRhcmdldExvY2F0aW9uIjowfQ"}, [
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
  'e1892abc-7513-427c-8eb4-2a6620c83bf7',
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
  'Thu, 25 Jun 2020 13:04:07 GMT',
  'Content-Length',
  '393'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedsecrets?api-version=7.1-preview&$skiptoken=eyJOZXh0TWFya2VyIjoiMiEyMDQhTURBd01UQTRJWE5sWTNKbGRDOVNSVU5QVmtWU1EwVlNWRWxHU1VOQlZFVk9RVTFGTFVOQlRrRkNUMUpVUTFKRlFWUkpUa2RCUTBWU1ZFbEdTVU5CVkVVdE9UazNOalV3TnpBd05ERXhOVFEyTnk4d05VTTFNRFpHUVRaR1JVRTBRVU01UVVSRFJrRkNOREZFTkRneU9FWkVSQ0V3TURBd01qZ2hPVGs1T1MweE1pMHpNVlF5TXpvMU9UbzFPUzQ1T1RrNU9UazVXaUUtIiwiVGFyZ2V0TG9jYXRpb24iOjB9"}, [
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
  '34965815-6845-4304-b356-c3b0ce2d85d3',
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
  'Thu, 25 Jun 2020 13:04:07 GMT',
  'Content-Length',
  '451'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedsecrets?api-version=7.1-preview&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExNTIhTURBd01EWTRJWE5sWTNKbGRDOVNSVU5QVmtWU1EwVlNWRWxHU1VOQlZFVk9RVTFGTFVOQlRrTlNSVUZVUlVGRFJWSlVTVVpKUTBGVVJTMHlNRGczTkRRMU56TTBNVE01TVRVMUlUQXdNREF5T0NFNU9UazVMVEV5TFRNeFZESXpPalU1T2pVNUxqazVPVGs1T1RsYUlRLS0iLCJUYXJnZXRMb2NhdGlvbiI6MH0"}, [
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
  'c15a64b1-c97a-4704-8154-a43caa408cb9',
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
  'Thu, 25 Jun 2020 13:04:07 GMT',
  'Content-Length',
  '382'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedsecrets?api-version=7.1-preview&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExOTYhTURBd01UQXlJWE5sWTNKbGRDOVNSVU5QVmtWU1EwVlNWRWxHU1VOQlZFVk9RVTFGTFVOQlRrTlNSVUZVUlVGRFJWSlVTVVpKUTBGVVJTMHpOVFUzTlRVeU9EY3hNRGM1T1RNNE55OUZSRUZETkRNeU1EVXlSa1kwTlVNMVFURXdRMEZHUWtKRVFqSTRORVEzT1NFd01EQXdNamdoT1RrNU9TMHhNaTB6TVZReU16bzFPVG8xT1M0NU9UazVPVGs1V2lFLSIsIlRhcmdldExvY2F0aW9uIjowfQ"}, [
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
  'bd6d9594-9615-43ef-9b55-8c50ddcce876',
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
  'Thu, 25 Jun 2020 13:04:07 GMT',
  'Content-Length',
  '441'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedsecrets?api-version=7.1-preview&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExNTIhTURBd01EWTRJWE5sWTNKbGRDOVNSVU5QVmtWU1EwVlNWRWxHU1VOQlZFVk9RVTFGTFVOQlRrTlNSVUZVUlVGRFJWSlVTVVpKUTBGVVJTMDBPRE00T0RreE9EVTBPRE16TVRZM0lUQXdNREF5T0NFNU9UazVMVEV5TFRNeFZESXpPalU1T2pVNUxqazVPVGs1T1RsYUlRLS0iLCJUYXJnZXRMb2NhdGlvbiI6MH0"}, [
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
  '4ec18869-a28b-4d72-a41f-b72a6b7a28ba',
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
  'Thu, 25 Jun 2020 13:04:07 GMT',
  'Content-Length',
  '382'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedsecrets?api-version=7.1-preview&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExOTYhTURBd01UQXhJWE5sWTNKbGRDOVNSVU5QVmtWU1EwVlNWRWxHU1VOQlZFVk9RVTFGTFVOQlRrTlNSVUZVUlVGRFJWSlVTVVpKUTBGVVJTMDJNRGt5TlRRMk16TXdOekF3TURNMUx6WXpRemRDT0VVME5qWkNOelF5TnpRNVJVTTBRVEl5TlRsRU9Ea3pNekExSVRBd01EQXlPQ0U1T1RrNUxURXlMVE14VkRJek9qVTVPalU1TGprNU9UazVPVGxhSVEtLSIsIlRhcmdldExvY2F0aW9uIjowfQ"}, [
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
  '7676fe68-d9a6-4083-b090-d31971bc19b5',
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
  'Thu, 25 Jun 2020 13:04:08 GMT',
  'Content-Length',
  '441'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedsecrets?api-version=7.1-preview&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExNTIhTURBd01EWTRJWE5sWTNKbGRDOVNSVU5QVmtWU1EwVlNWRWxHU1VOQlZFVk9RVTFGTFVOQlRrTlNSVUZVUlVGRFJWSlVTVVpKUTBGVVJTMDRNamczTVRJeE5UTXdOakE0T0RrMklUQXdNREF5T0NFNU9UazVMVEV5TFRNeFZESXpPalU1T2pVNUxqazVPVGs1T1RsYUlRLS0iLCJUYXJnZXRMb2NhdGlvbiI6MH0"}, [
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
  '264b841a-79c1-4271-8ce0-4e41d2792e86',
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
  'Thu, 25 Jun 2020 13:04:08 GMT',
  'Content-Length',
  '382'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedsecrets?api-version=7.1-preview&$skiptoken=eyJOZXh0TWFya2VyIjoiMiEyMjAhTURBd01USXhJWE5sWTNKbGRDOVNSVU5QVmtWU1EwVlNWRWxHU1VOQlZFVk9RVTFGTFVOQlRrTlNSVUZVUlZKRlFVUkJUa1JFUlV4RlZFVkJRMFZTVkVsR1NVTkJWRVZKVTFOVlJWSXRNRGs1TXpFNE1EVXdNVGN4TkRnMk56WXZPRGd6UXpaRE5UWkVOelkxTkVRM1FUbEJOemt3TVRjMk5ESkVNMFU1UXpJaE1EQXdNREk0SVRrNU9Ua3RNVEl0TXpGVU1qTTZOVGs2TlRrdU9UazVPVGs1T1ZvaCIsIlRhcmdldExvY2F0aW9uIjowfQ"}, [
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
  '39f12112-d3ad-4a26-92bd-31902f486440',
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
  'Thu, 25 Jun 2020 13:04:08 GMT',
  'Content-Length',
  '473'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedsecrets?api-version=7.1-preview&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExNzYhTURBd01EZzNJWE5sWTNKbGRDOVNSVU5QVmtWU1EwVlNWRWxHU1VOQlZFVk9RVTFGTFVOQlRrTlNSVUZVUlZKRlFVUkJUa1JFUlV4RlZFVkJRMFZTVkVsR1NVTkJWRVZKVTFOVlJWSXROVGd5T0RnME5UQTRPVFl4TlRBNU1TRXdNREF3TWpnaE9UazVPUzB4TWkwek1WUXlNem8xT1RvMU9TNDVPVGs1T1RrNVdpRS0iLCJUYXJnZXRMb2NhdGlvbiI6MH0"}, [
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
  '47939e11-571a-4618-a047-8ccc8132d71a',
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
  'Thu, 25 Jun 2020 13:04:08 GMT',
  'Content-Length',
  '414'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedsecrets?api-version=7.1-preview&$skiptoken=eyJOZXh0TWFya2VyIjoiMiEyMjAhTURBd01USXdJWE5sWTNKbGRDOVNSVU5QVmtWU1EwVlNWRWxHU1VOQlZFVk9RVTFGTFVOQlRrTlNSVUZVUlZKRlFVUkJUa1JFUlV4RlZFVkJRMFZTVkVsR1NVTkJWRVZKVTFOVlJWSXRPRFF4T0RVek9EYzNNREUxT1RJeE1pOHdOalV6T1VZNVJEVXpNekkwUWpjeFFVSkRNalJHTmpOQk5qUkZNVEUxUXlFd01EQXdNamdoT1RrNU9TMHhNaTB6TVZReU16bzFPVG8xT1M0NU9UazVPVGs1V2lFLSIsIlRhcmdldExvY2F0aW9uIjowfQ"}, [
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
  '634bf2d6-3189-4f95-8e7e-4aecfed2ee90',
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
  'Thu, 25 Jun 2020 13:04:08 GMT',
  'Content-Length',
  '473'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedsecrets?api-version=7.1-preview&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExNTIhTURBd01EWTRJWE5sWTNKbGRDOVNSVU5QVmtWU1EwVlNWRWxHU1VOQlZFVk9RVTFGTFVOQlRrUkZURVZVUlVGRFJWSlVTVVpKUTBGVVJTMHlNVEV6TWpFNE9EQTBOelk1T1RZeklUQXdNREF5T0NFNU9UazVMVEV5TFRNeFZESXpPalU1T2pVNUxqazVPVGs1T1RsYUlRLS0iLCJUYXJnZXRMb2NhdGlvbiI6MH0"}, [
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
  '7dd7a988-71f4-4a05-8891-5c9e39100717',
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
  'Thu, 25 Jun 2020 13:04:08 GMT',
  'Content-Length',
  '382'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedsecrets?api-version=7.1-preview&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExOTIhTURBd01UQXdJWE5sWTNKbGRDOVNSVU5QVmtWU1EwVlNWRWxHU1VOQlZFVk9RVTFGTFVOQlRrUkZURVZVUlVGRFJWSlVTVVpKUTBGVVJTMDBOREk0TmpFMk9UTTJPVGN5T1Rndk0wTkVNVVkwTVVNNE9FRkVORGRGTlRneFJrSXhRekE1TTBRek5FVXpRa1loTURBd01ESTRJVGs1T1RrdE1USXRNekZVTWpNNk5UazZOVGt1T1RrNU9UazVPVm9oIiwiVGFyZ2V0TG9jYXRpb24iOjB9"}, [
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
  'c828ea14-c218-4f50-b71c-5f10f7e94af8',
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
  'Thu, 25 Jun 2020 13:04:08 GMT',
  'Content-Length',
  '435'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedsecrets?api-version=7.1-preview&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExNTIhTURBd01EWTRJWE5sWTNKbGRDOVNSVU5QVmtWU1EwVlNWRWxHU1VOQlZFVk9RVTFGTFVOQlRrUkZURVZVUlVGRFJWSlVTVVpKUTBGVVJTMDRNREUyT1RZNE16azNOemN5TURNMUlUQXdNREF5T0NFNU9UazVMVEV5TFRNeFZESXpPalU1T2pVNUxqazVPVGs1T1RsYUlRLS0iLCJUYXJnZXRMb2NhdGlvbiI6MH0"}, [
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
  'b9679ed7-d5b5-4604-9c64-ce6b29e0fcbb',
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
  'Thu, 25 Jun 2020 13:04:08 GMT',
  'Content-Length',
  '382'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedsecrets?api-version=7.1-preview&$skiptoken=eyJOZXh0TWFya2VyIjoiMiEyMjghTURBd01USTFJWE5sWTNKbGRDOVNSVU5QVmtWU1EwVlNWRWxHU1VOQlZFVk9RVTFGTFVOQlRrUkZURVZVUlVGRFJWSlVTVVpKUTBGVVJWZEpWRWhTUlZGVlJWTlVUMUJVU1U5T1UxUkpUVVZQVlZRdE5UYzFPREkzTnpNeU16UTFPVFUwTHpCRk16YzVRMFJDTnpnNU9EUTBOVVE0TTBNeU5UVXdORGN6UkRjeE9EVkVJVEF3TURBeU9DRTVPVGs1TFRFeUxUTXhWREl6T2pVNU9qVTVMams1T1RrNU9UbGFJUS0tIiwiVGFyZ2V0TG9jYXRpb24iOjB9"}, [
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
  '57638fc1-aa01-4dfa-8773-c396f555f07b',
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
  'Thu, 25 Jun 2020 13:04:08 GMT',
  'Content-Length',
  '483'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedsecrets?api-version=7.1-preview&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExNTIhTURBd01EY3dJWE5sWTNKbGRDOVNSVU5QVmtWU1EwVlNWRWxHU1VOQlZFVk9RVTFGTFVOQlRrUkpVMEZDVEVWQlEwVlNWRWxHU1VOQlZFVXRNRE0xTURBNU16azBPRE01TWprMU9Ua2hNREF3TURJNElUazVPVGt0TVRJdE16RlVNak02TlRrNk5Ua3VPVGs1T1RrNU9Wb2giLCJUYXJnZXRMb2NhdGlvbiI6MH0"}, [
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
  'a64584e1-fccd-4874-947a-bc91a1d261d4',
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
  'Thu, 25 Jun 2020 13:04:09 GMT',
  'Content-Length',
  '382'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedsecrets?api-version=7.1-preview&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExOTYhTURBd01UQXhJWE5sWTNKbGRDOVNSVU5QVmtWU1EwVlNWRWxHU1VOQlZFVk9RVTFGTFVOQlRrZEZWRUZEUlZKVVNVWkpRMEZVUlMwd01EVXlPRFl5TURFek1UYzFNelF4TURBMUwwRXlNa1ZEUVVRelFVRTFOalJHTWpRNFJrWXpRa0pDTmtJNVFqY3pSa0pESVRBd01EQXlPQ0U1T1RrNUxURXlMVE14VkRJek9qVTVPalU1TGprNU9UazVPVGxhSVEtLSIsIlRhcmdldExvY2F0aW9uIjowfQ"}, [
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
  'bbc1f270-9d52-4ad8-9220-e3d747809c35',
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
  'Thu, 25 Jun 2020 13:04:09 GMT',
  'Content-Length',
  '441'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedsecrets?api-version=7.1-preview&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExNDghTURBd01EWTJJWE5sWTNKbGRDOVNSVU5QVmtWU1EwVlNWRWxHU1VOQlZFVk9RVTFGTFVOQlRrZEZWRUZEUlZKVVNVWkpRMEZVUlMwek5URXdNalUzT1RJNE5EZzVNelE0TnlFd01EQXdNamdoT1RrNU9TMHhNaTB6TVZReU16bzFPVG8xT1M0NU9UazVPVGs1V2lFLSIsIlRhcmdldExvY2F0aW9uIjowfQ"}, [
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
  'e8732ec1-1724-4000-a524-7ead6772c4ac',
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
  'Thu, 25 Jun 2020 13:04:09 GMT',
  'Content-Length',
  '377'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedsecrets?api-version=7.1-preview&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExOTIhTURBd01EazRJWE5sWTNKbGRDOVNSVU5QVmtWU1EwVlNWRWxHU1VOQlZFVk9RVTFGTFVOQlRrZEZWRUZEUlZKVVNVWkpRMEZVUlMwM016STJNREl6T1RNek5qZzNOalE1THpVNU4wSXpPVVEwT1RSQlJUUXhOMFZCTmprMFFUSkdRakE0UkRFMVJESkdJVEF3TURBeU9DRTVPVGs1TFRFeUxUTXhWREl6T2pVNU9qVTVMams1T1RrNU9UbGFJUS0tIiwiVGFyZ2V0TG9jYXRpb24iOjB9"}, [
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
  '9e4b0d5a-9216-407e-b5ac-a2b6d44c75ff',
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
  'Thu, 25 Jun 2020 13:04:10 GMT',
  'Content-Length',
  '435'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedsecrets?api-version=7.1-preview&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExNDghTURBd01EWTFJWE5sWTNKbGRDOVNSVU5QVmtWU1EwVlNWRWxHU1VOQlZFVk9RVTFGTFVOQlRrZEZWRUZEUlZKVVNVWkpRMEZVUlMwNU5UWTRPREF6TVRBeU9EY3lPVGM0SVRBd01EQXlPQ0U1T1RrNUxURXlMVE14VkRJek9qVTVPalU1TGprNU9UazVPVGxhSVEtLSIsIlRhcmdldExvY2F0aW9uIjowfQ"}, [
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
  'ad6f06cc-4933-48ec-a03f-7dba14e97667',
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
  'Thu, 25 Jun 2020 13:04:10 GMT',
  'Content-Length',
  '377'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedsecrets?api-version=7.1-preview&$skiptoken=eyJOZXh0TWFya2VyIjoiMiEyMTYhTURBd01URTJJWE5sWTNKbGRDOVNSVU5QVmtWU1EwVlNWRWxHU1VOQlZFVk9RVTFGTFVOQlRrZEZWRUZEUlZKVVNVWkpRMEZVUlZOVFJVTlNSVlJKVGxCRlRVWlBVazFCVkMwMU16RXpOemMyTVRVM09UazBNamcxTHpRMk5qZ3lNRVkxT1VVd01qUTJOemxCUWpWRk5VUTFNRFl3TUVVeVFVWkZJVEF3TURBeU9DRTVPVGs1TFRFeUxUTXhWREl6T2pVNU9qVTVMams1T1RrNU9UbGFJUS0tIiwiVGFyZ2V0TG9jYXRpb24iOjB9"}, [
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
  'e2c932bb-dff4-49df-8f5c-b1c63300cf9f',
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
  'Thu, 25 Jun 2020 13:04:10 GMT',
  'Content-Length',
  '467'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedsecrets?api-version=7.1-preview&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExNzYhTURBd01EZzNJWE5sWTNKbGRDOVNSVU5QVmtWU1EwVlNWRWxHU1VOQlZFVk9RVTFGTFVOQlRrZEZWRUZEUlZKVVNVWkpRMEZVUlZOVFJVTlNSVlJKVGxCTFExTXhNa1pQVWsxQlZDMHhPVGM1TVRJMU1ERXdNREUzTlRreU9DRXdNREF3TWpnaE9UazVPUzB4TWkwek1WUXlNem8xT1RvMU9TNDVPVGs1T1RrNVdpRS0iLCJUYXJnZXRMb2NhdGlvbiI6MH0"}, [
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
  'd01bf393-e923-4340-bd15-74e884c988ca',
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
  'Thu, 25 Jun 2020 13:04:10 GMT',
  'Content-Length',
  '414'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedsecrets?api-version=7.1-preview&$skiptoken=eyJOZXh0TWFya2VyIjoiMiEyMTYhTURBd01URTRJWE5sWTNKbGRDOVNSVU5QVmtWU1EwVlNWRWxHU1VOQlZFVk9RVTFGTFVOQlRrZEZWRUZEUlZKVVNVWkpRMEZVUlZOVFJVTlNSVlJKVGxCTFExTXhNa1pQVWsxQlZDMDVNak01TVRjeU9EZzVPVGt5TWpJdk4wWXdSRUU0UlRsQlFqSkNORVV6UWpreE1EVTNRek5DTVVRNU5qVXpOVGtoTURBd01ESTRJVGs1T1RrdE1USXRNekZVTWpNNk5UazZOVGt1T1RrNU9UazVPVm9oIiwiVGFyZ2V0TG9jYXRpb24iOjB9"}, [
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
  'e42d8f8e-5c9f-4e02-b339-2b2b9e0a07d5',
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
  'Thu, 25 Jun 2020 13:04:10 GMT',
  'Content-Length',
  '467'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedsecrets?api-version=7.1-preview&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExODAhTURBd01Ea3dJWE5sWTNKbGRDOVNSVU5QVmtWU1EwVlNWRWxHU1VOQlZFVk9RVTFGTFVOQlRrZEZWRUZEUlZKVVNVWkpRMEZVUlZkSlZFaFNSVkZWUlZOVVQxQlVTVTlPVTFSSlRVVlBWVlF0T0RVMk1UYzFPRFl6TnpnMU9UUTROeUV3TURBd01qZ2hPVGs1T1MweE1pMHpNVlF5TXpvMU9UbzFPUzQ1T1RrNU9UazVXaUUtIiwiVGFyZ2V0TG9jYXRpb24iOjB9"}, [
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
  '07fbacea-3dc1-4d4c-acc8-0c6fcb0754a6',
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
  'Thu, 25 Jun 2020 13:04:10 GMT',
  'Content-Length',
  '419'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedsecrets?api-version=7.1-preview&$skiptoken=eyJOZXh0TWFya2VyIjoiMiEyMDAhTURBd01UQTFJWE5sWTNKbGRDOVNSVU5QVmtWU1EwVlNWRWxHU1VOQlZFVk9RVTFGTFVOQlRrZEZWRUZFUlV4RlZFVkVRMFZTVkVsR1NVTkJWRVV0TWpFeE5qVXdOREkwTURBME1EWXlNaTh3UmpSRE5FTXdNRVk1TmtNMFFVSkVPRE00UlRnNU1FVkdRemRHTmpoRlF5RXdNREF3TWpnaE9UazVPUzB4TWkwek1WUXlNem8xT1RvMU9TNDVPVGs1T1RrNVdpRS0iLCJUYXJnZXRMb2NhdGlvbiI6MH0"}, [
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
  '8f9d3738-b86c-408b-8929-f75743c739b4',
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
  'Thu, 25 Jun 2020 13:04:10 GMT',
  'Content-Length',
  '446'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedsecrets?api-version=7.1-preview&$skiptoken=eyJOZXh0TWFya2VyIjoiMiEyMDQhTURBd01UQTRJWE5sWTNKbGRDOVNSVU5QVmtWU1EwVlNWRWxHU1VOQlZFVk9RVTFGTFVOQlRrZEZWRUZFUlV4RlZFVkVRMFZTVkVsR1NVTkJWRVZWVTBsT1IwSkZSMGxPUkVWTVJWUkZRMFZTVkVsR1NVTkJWRVZUVUU5TVRFVlNMVEF5TnpnNU5qSTJORE13TlRBNE9UY3pOU0V3TURBd01qZ2hPVGs1T1MweE1pMHpNVlF5TXpvMU9UbzFPUzQ1T1RrNU9UazVXaUUtIiwiVGFyZ2V0TG9jYXRpb24iOjB9"}, [
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
  '022c3e38-a74d-459b-9954-ac60230cc095',
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
  'Thu, 25 Jun 2020 13:04:10 GMT',
  'Content-Length',
  '451'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedsecrets?api-version=7.1-preview&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExOTYhTURBd01UQXhJWE5sWTNKbGRDOVNSVU5QVmtWU1EwVlNWRWxHU1VOQlZFVk9RVTFGTFVOQlRreEpVMVJEUlZKVVNVWkpRMEZVUlZNdE1UQXdOemt6T0RBM09UVTFNalkyTVRZd0x6Z3pOVEZDTURnM01FWTRORFJEUlRZNE9VRTRRMFF5TlVFd05qYzJNVGhFSVRBd01EQXlPQ0U1T1RrNUxURXlMVE14VkRJek9qVTVPalU1TGprNU9UazVPVGxhSVEtLSIsIlRhcmdldExvY2F0aW9uIjowfQ"}, [
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
  '11c4c756-bd78-4382-99ff-1d257c03da7d',
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
  'Thu, 25 Jun 2020 13:04:10 GMT',
  'Content-Length',
  '441'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedsecrets?api-version=7.1-preview&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExNDghTURBd01EWTNJWE5sWTNKbGRDOVNSVU5QVmtWU1EwVlNWRWxHU1VOQlZFVk9RVTFGTFVOQlRreEpVMVJEUlZKVVNVWkpRMEZVUlZNdE1qTXpORGsxT0RNNE1qTTRNemMwTlRFaE1EQXdNREk0SVRrNU9Ua3RNVEl0TXpGVU1qTTZOVGs2TlRrdU9UazVPVGs1T1ZvaCIsIlRhcmdldExvY2F0aW9uIjowfQ"}, [
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
  'a4795479-be9c-40b2-b3bc-1b2936138fa6',
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
  'Thu, 25 Jun 2020 13:04:12 GMT',
  'Content-Length',
  '377'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedsecrets?api-version=7.1-preview&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExOTIhTURBd01UQXdJWE5sWTNKbGRDOVNSVU5QVmtWU1EwVlNWRWxHU1VOQlZFVk9RVTFGTFVOQlRreEpVMVJEUlZKVVNVWkpRMEZVUlZNdE16ZzFPREU0T0RNMU1UWTJPREU0T0RFdk5rWkdNVGt5TURNMk5ESXhORVV6UkRsRVJUSTBOVVE0TWpNek9VVXlPVUVoTURBd01ESTRJVGs1T1RrdE1USXRNekZVTWpNNk5UazZOVGt1T1RrNU9UazVPVm9oIiwiVGFyZ2V0TG9jYXRpb24iOjB9"}, [
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
  'ee8fb6f9-3bd8-49d4-8102-a05fd251396e',
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
  'Thu, 25 Jun 2020 13:04:12 GMT',
  'Content-Length',
  '435'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedsecrets?api-version=7.1-preview&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExNDghTURBd01EWTNJWE5sWTNKbGRDOVNSVU5QVmtWU1EwVlNWRWxHU1VOQlZFVk9RVTFGTFVOQlRreEpVMVJEUlZKVVNVWkpRMEZVUlZNdE5UVXpNRE13TXpBeU1USXhPRFF6TnpBaE1EQXdNREk0SVRrNU9Ua3RNVEl0TXpGVU1qTTZOVGs2TlRrdU9UazVPVGs1T1ZvaCIsIlRhcmdldExvY2F0aW9uIjowfQ"}, [
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
  '985501b5-8d6b-40c4-9049-ab2c48b66c33',
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
  'Thu, 25 Jun 2020 13:04:12 GMT',
  'Content-Length',
  '377'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedsecrets?api-version=7.1-preview&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExOTIhTURBd01UQXdJWE5sWTNKbGRDOVNSVU5QVmtWU1EwVlNWRWxHU1VOQlZFVk9RVTFGTFVOQlRreEpVMVJEUlZKVVNVWkpRMEZVUlZNdE5qa3dPREkwTVRrMU5UVTVOekEzTkRBdk5qVTBSakl5TXpreU1FRTJORFZEUTBKRlFUQTFOVVUwUTBVNU1rUTNORFVoTURBd01ESTRJVGs1T1RrdE1USXRNekZVTWpNNk5UazZOVGt1T1RrNU9UazVPVm9oIiwiVGFyZ2V0TG9jYXRpb24iOjB9"}, [
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
  '831d07d6-1987-4aeb-b7e9-6d8d995674e4',
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
  'Thu, 25 Jun 2020 13:04:12 GMT',
  'Content-Length',
  '435'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedsecrets?api-version=7.1-preview&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExNDghTURBd01EWTNJWE5sWTNKbGRDOVNSVU5QVmtWU1EwVlNWRWxHU1VOQlZFVk9RVTFGTFVOQlRreEpVMVJEUlZKVVNVWkpRMEZVUlZNdE9EVTJNRE0zT0RFeU56TTVNRFV6TVRFaE1EQXdNREk0SVRrNU9Ua3RNVEl0TXpGVU1qTTZOVGs2TlRrdU9UazVPVGs1T1ZvaCIsIlRhcmdldExvY2F0aW9uIjowfQ"}, [
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
  '2bc20926-894f-4fa6-a289-134319a9b1ea',
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
  'Thu, 25 Jun 2020 13:04:12 GMT',
  'Content-Length',
  '377'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedsecrets?api-version=7.1-preview&$skiptoken=eyJOZXh0TWFya2VyIjoiMiEyMDQhTURBd01UQTRJWE5sWTNKbGRDOVNSVU5QVmtWU1EwVlNWRWxHU1VOQlZFVk9RVTFGTFVOQlRreEpVMVJEUlZKVVNVWkpRMEZVUlZOQ1dWQkJSMFV0TURBNE9ERTVPRGczTXprME9UUTBNVEEwTVM4eE56TXlRVFUxT1RJM056VTBNamMxUVVFNU9UUXdSVFl5TVRGR1FqZzFNeUV3TURBd01qZ2hPVGs1T1MweE1pMHpNVlF5TXpvMU9UbzFPUzQ1T1RrNU9UazVXaUUtIiwiVGFyZ2V0TG9jYXRpb24iOjB9"}, [
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
  '213bc935-cfc0-4c4c-94e4-06d623b7abea',
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
  'Thu, 25 Jun 2020 13:04:12 GMT',
  'Content-Length',
  '451'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedsecrets?api-version=7.1-preview&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExNTYhTURBd01EY3pJWE5sWTNKbGRDOVNSVU5QVmtWU1EwVlNWRWxHU1VOQlZFVk9RVTFGTFVOQlRreEpVMVJEUlZKVVNVWkpRMEZVUlZOQ1dWQkJSMFV0TWpjM01URTVOekU1TmpBM05UazVOREFoTURBd01ESTRJVGs1T1RrdE1USXRNekZVTWpNNk5UazZOVGt1T1RrNU9UazVPVm9oIiwiVGFyZ2V0TG9jYXRpb24iOjB9"}, [
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
  'b47e5ad4-07c1-4b06-b482-f52b567915db',
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
  'Thu, 25 Jun 2020 13:04:12 GMT',
  'Content-Length',
  '387'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedsecrets?api-version=7.1-preview&$skiptoken=eyJOZXh0TWFya2VyIjoiMiEyMDAhTURBd01UQTJJWE5sWTNKbGRDOVNSVU5QVmtWU1EwVlNWRWxHU1VOQlZFVk9RVTFGTFVOQlRreEpVMVJEUlZKVVNVWkpRMEZVUlZOQ1dWQkJSMFV0TkRjNE56WXpNVE0zTXprMk1UWTFPREF2TmtGQk5EVXlOelV4TlRNeE5EY3pRMEU1UmprM1JqSkdPREV4TXpNMk16Y2hNREF3TURJNElUazVPVGt0TVRJdE16RlVNak02TlRrNk5Ua3VPVGs1T1RrNU9Wb2giLCJUYXJnZXRMb2NhdGlvbiI6MH0"}, [
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
  '38462a6e-8d5c-46bc-9d05-e7a20c14acd2',
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
  'Thu, 25 Jun 2020 13:04:12 GMT',
  'Content-Length',
  '446'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedsecrets?api-version=7.1-preview&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExNTYhTURBd01EY3pJWE5sWTNKbGRDOVNSVU5QVmtWU1EwVlNWRWxHU1VOQlZFVk9RVTFGTFVOQlRreEpVMVJEUlZKVVNVWkpRMEZVUlZOQ1dWQkJSMFV0TmpJNU5UQTBORFEyT1RJNU56SXpOekVoTURBd01ESTRJVGs1T1RrdE1USXRNekZVTWpNNk5UazZOVGt1T1RrNU9UazVPVm9oIiwiVGFyZ2V0TG9jYXRpb24iOjB9"}, [
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
  '12873d0b-842f-48a7-a67f-e5006b4351b4',
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
  'Thu, 25 Jun 2020 13:04:13 GMT',
  'Content-Length',
  '387'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedsecrets?api-version=7.1-preview&$skiptoken=eyJOZXh0TWFya2VyIjoiMiEyMDAhTURBd01UQTJJWE5sWTNKbGRDOVNSVU5QVmtWU1EwVlNWRWxHU1VOQlZFVk9RVTFGTFVOQlRreEpVMVJEUlZKVVNVWkpRMEZVUlZOQ1dWQkJSMFV0T0RNNU1qYzNNakF6TXpJek9UZzFOVEV2TkRJd1FqUkZRekU0TXprNE5ETXdSVGxEUmtSRU1FSXpSRUpGTkRRM1JqUWhNREF3TURJNElUazVPVGt0TVRJdE16RlVNak02TlRrNk5Ua3VPVGs1T1RrNU9Wb2giLCJUYXJnZXRMb2NhdGlvbiI6MH0"}, [
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
  'af26f2f9-7a43-4ebe-9d0f-4cd97ef9d98c',
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
  'Thu, 25 Jun 2020 13:04:13 GMT',
  'Content-Length',
  '446'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedsecrets?api-version=7.1-preview&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExNTYhTURBd01EY3pJWE5sWTNKbGRDOVNSVU5QVmtWU1EwVlNWRWxHU1VOQlZFVk9RVTFGTFVOQlRreEpVMVJEUlZKVVNVWkpRMEZVUlZOQ1dWQkJSMFV0T1RjeE9URTNPREEwTVRNNE1qRTVOVEFoTURBd01ESTRJVGs1T1RrdE1USXRNekZVTWpNNk5UazZOVGt1T1RrNU9UazVPVm9oIiwiVGFyZ2V0TG9jYXRpb24iOjB9"}, [
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
  '5cb0cf0b-ce93-44fe-8646-93126587d6b9',
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
  'Thu, 25 Jun 2020 13:04:13 GMT',
  'Content-Length',
  '387'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedsecrets?api-version=7.1-preview&$skiptoken=eyJOZXh0TWFya2VyIjoiMiEyMDQhTURBd01UQTRJWE5sWTNKbGRDOVNSVU5QVmtWU1EwVlNWRWxHU1VOQlZFVk9RVTFGTFVOQlRreEpVMVJFUlV4RlZFVkVRMFZTVkVsR1NVTkJWRVZUTFRFeU1qY3dOVEEyTnpBNU1qRTJPREV4TUM4Mk0wTTRNVVJGTmtORk16RTBOVFEwUVVWRFF6YzJNekUwTVVZNFJFVkNReUV3TURBd01qZ2hPVGs1T1MweE1pMHpNVlF5TXpvMU9UbzFPUzQ1T1RrNU9UazVXaUUtIiwiVGFyZ2V0TG9jYXRpb24iOjB9"}, [
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
  '92788713-af6c-43e8-934f-fb5d66e13003',
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
  'Thu, 25 Jun 2020 13:04:13 GMT',
  'Content-Length',
  '451'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedsecrets?api-version=7.1-preview&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExNjAhTURBd01EYzFJWE5sWTNKbGRDOVNSVU5QVmtWU1EwVlNWRWxHU1VOQlZFVk9RVTFGTFVOQlRreEpVMVJFUlV4RlZFVkVRMFZTVkVsR1NVTkJWRVZUTFRRek5UTTJNVGN4TWpReE1ETTROak0xTVNFd01EQXdNamdoT1RrNU9TMHhNaTB6TVZReU16bzFPVG8xT1M0NU9UazVPVGs1V2lFLSIsIlRhcmdldExvY2F0aW9uIjowfQ"}, [
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
  '3d290093-f7c2-44cc-9107-4bb82fec6294',
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
  'Thu, 25 Jun 2020 13:04:13 GMT',
  'Content-Length',
  '393'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedsecrets?api-version=7.1-preview&$skiptoken=eyJOZXh0TWFya2VyIjoiMiEyMDAhTURBd01UQTJJWE5sWTNKbGRDOVNSVU5QVmtWU1EwVlNWRWxHU1VOQlZFVk9RVTFGTFVOQlRreEpVMVJFUlV4RlZFVkVRMFZTVkVsR1NVTkJWRVZUTFRZek9ETTFORGMwTnpRMU1qQTBNVEV2T1RaRlF6VXhRakpFTXpkR05FWTVRVUk1UmpoQk1rUkZNa1V4UmpSRVJEWWhNREF3TURJNElUazVPVGt0TVRJdE16RlVNak02TlRrNk5Ua3VPVGs1T1RrNU9Wb2giLCJUYXJnZXRMb2NhdGlvbiI6MH0"}, [
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
  '21f4344c-076f-4c9f-8884-95a78489ce3c',
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
  'Thu, 25 Jun 2020 13:04:13 GMT',
  'Content-Length',
  '446'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedsecrets?api-version=7.1-preview&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExNjAhTURBd01EYzBJWE5sWTNKbGRDOVNSVU5QVmtWU1EwVlNWRWxHU1VOQlZFVk9RVTFGTFVOQlRreEpVMVJFUlV4RlZFVkVRMFZTVkVsR1NVTkJWRVZUTFRjMk16UTJORFkxTkRFM01UTTJPVGt3SVRBd01EQXlPQ0U1T1RrNUxURXlMVE14VkRJek9qVTVPalU1TGprNU9UazVPVGxhSVEtLSIsIlRhcmdldExvY2F0aW9uIjowfQ"}, [
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
  'de5b9bca-281f-406c-847b-4a771b8c8eec',
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
  'Thu, 25 Jun 2020 13:04:13 GMT',
  'Content-Length',
  '393'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedsecrets?api-version=7.1-preview&$skiptoken=eyJOZXh0TWFya2VyIjoiMiEyMDQhTURBd01UQTNJWE5sWTNKbGRDOVNSVU5QVmtWU1EwVlNWRWxHU1VOQlZFVk9RVTFGTFVOQlRreEpVMVJFUlV4RlZFVkVRMFZTVkVsR1NVTkJWRVZUTFRnM09UQTBNRFV3TkRJMk9EWTFNVGd3THpZNU4wTTRRVE5EUVVNeU9UUkRORFE0TWtJM1FUWTRRVGxDTUVJeE5EVTVJVEF3TURBeU9DRTVPVGs1TFRFeUxUTXhWREl6T2pVNU9qVTVMams1T1RrNU9UbGFJUS0tIiwiVGFyZ2V0TG9jYXRpb24iOjB9"}, [
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
  '93f265a8-6097-4208-9f84-1f758c8715bf',
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
  'Thu, 25 Jun 2020 13:04:13 GMT',
  'Content-Length',
  '451'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedsecrets?api-version=7.1-preview&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExNjghTURBd01EZ3hJWE5sWTNKbGRDOVNSVU5QVmtWU1EwVlNWRWxHU1VOQlZFVk9RVTFGTFVOQlRreEpVMVJFUlV4RlZFVkVRMFZTVkVsR1NVTkJWRVZUUWxsUVFVZEZMVEExTURNNE9USTBNVEl5TURZME9USTFNU0V3TURBd01qZ2hPVGs1T1MweE1pMHpNVlF5TXpvMU9UbzFPUzQ1T1RrNU9UazVXaUUtIiwiVGFyZ2V0TG9jYXRpb24iOjB9"}, [
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
  '6a76c3d7-f425-480c-930b-75666ed4537a',
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
  'Thu, 25 Jun 2020 13:04:13 GMT',
  'Content-Length',
  '403'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedsecrets?api-version=7.1-preview&$skiptoken=eyJOZXh0TWFya2VyIjoiMiEyMDghTURBd01URXlJWE5sWTNKbGRDOVNSVU5QVmtWU1EwVlNWRWxHU1VOQlZFVk9RVTFGTFVOQlRreEpVMVJFUlV4RlZFVkVRMFZTVkVsR1NVTkJWRVZUUWxsUVFVZEZMVEV6TVRnME16UXdOakl6TURNd09ERXZOelE0TXpCQk1rSXhNVVE1TkVSRU1FSXpNa1F4UXpKRU5UY3dPRFpCUXpVaE1EQXdNREk0SVRrNU9Ua3RNVEl0TXpGVU1qTTZOVGs2TlRrdU9UazVPVGs1T1ZvaCIsIlRhcmdldExvY2F0aW9uIjowfQ"}, [
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
  'e5091ea2-849f-4575-9cef-e1a4c6999ad3',
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
  'Thu, 25 Jun 2020 13:04:13 GMT',
  'Content-Length',
  '457'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedsecrets?api-version=7.1-preview&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExNjghTURBd01EZ3hJWE5sWTNKbGRDOVNSVU5QVmtWU1EwVlNWRWxHU1VOQlZFVk9RVTFGTFVOQlRreEpVMVJFUlV4RlZFVkVRMFZTVkVsR1NVTkJWRVZUUWxsUVFVZEZMVEl5TWpJMU5qSXdPRFV5T0RVeU5EWTRNQ0V3TURBd01qZ2hPVGs1T1MweE1pMHpNVlF5TXpvMU9UbzFPUzQ1T1RrNU9UazVXaUUtIiwiVGFyZ2V0TG9jYXRpb24iOjB9"}, [
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
  '56b653cc-ffb3-41c3-b698-c447a8b30151',
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
  'Thu, 25 Jun 2020 13:04:14 GMT',
  'Content-Length',
  '403'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedsecrets?api-version=7.1-preview&$skiptoken=eyJOZXh0TWFya2VyIjoiMiEyMTIhTURBd01URXpJWE5sWTNKbGRDOVNSVU5QVmtWU1EwVlNWRWxHU1VOQlZFVk9RVTFGTFVOQlRreEpVMVJFUlV4RlZFVkVRMFZTVkVsR1NVTkJWRVZUUWxsUVFVZEZMVFEyT0RFMU1UY3lNVFl4TlRBeU5EWXdMekkwTVRKQ05EQTFSVU0xTmpSQ01ESkNSalF6TWprNVJEWTNSa05ETmpFMUlUQXdNREF5T0NFNU9UazVMVEV5TFRNeFZESXpPalU1T2pVNUxqazVPVGs1T1RsYUlRLS0iLCJUYXJnZXRMb2NhdGlvbiI6MH0"}, [
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
  '5a84bc12-d11c-472f-8daf-c8b4994d11e5',
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
  'Thu, 25 Jun 2020 13:04:14 GMT',
  'Content-Length',
  '462'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedsecrets?api-version=7.1-preview&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExNjghTURBd01EZ3dJWE5sWTNKbGRDOVNSVU5QVmtWU1EwVlNWRWxHU1VOQlZFVk9RVTFGTFVOQlRreEpVMVJFUlV4RlZFVkVRMFZTVkVsR1NVTkJWRVZUUWxsUVFVZEZMVFU1T1RRek5EWTROemN4TXpRd01UUXhJVEF3TURBeU9DRTVPVGs1TFRFeUxUTXhWREl6T2pVNU9qVTVMams1T1RrNU9UbGFJUS0tIiwiVGFyZ2V0TG9jYXRpb24iOjB9"}, [
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
  '33506dd9-bed6-4db6-8149-9277393eac8a',
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
  'Thu, 25 Jun 2020 13:04:14 GMT',
  'Content-Length',
  '403'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedsecrets?api-version=7.1-preview&$skiptoken=eyJOZXh0TWFya2VyIjoiMiEyMjghTURBd01USTFJWE5sWTNKbGRDOVNSVU5QVmtWU1EwVlNWRWxHU1VOQlZFVk9RVTFGTFVOQlRsSkZRVVJEUVU1RFJVeEJUa1JFUlV4RlZFVkJRMFZTVkVsR1NVTkJWRVZUVDFCRlVrRlVTVTlPTFRFeE5qTTRNVGMzT1RJM09UazJOVGsyTDBRMVF6VXhPREZFUkRKR09UUXdRalZDTlRCQ01FVkJNREkwT0RneE1UZzRJVEF3TURBeU9DRTVPVGs1TFRFeUxUTXhWREl6T2pVNU9qVTVMams1T1RrNU9UbGFJUS0tIiwiVGFyZ2V0TG9jYXRpb24iOjB9"}, [
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
  'e008c976-6a3c-4709-b081-0a6cc6e469ff',
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
  'Thu, 25 Jun 2020 13:04:14 GMT',
  'Content-Length',
  '483'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedsecrets?api-version=7.1-preview&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExODQhTURBd01Ea3lJWE5sWTNKbGRDOVNSVU5QVmtWU1EwVlNWRWxHU1VOQlZFVk9RVTFGTFVOQlRsSkZRVVJEUVU1RFJVeEJUa1JFUlV4RlZFVkJRMFZTVkVsR1NVTkJWRVZUVDFCRlVrRlVTVTlPTFRNM09ERXhOekUzTVRZd01qYzFNRGt6SVRBd01EQXlPQ0U1T1RrNUxURXlMVE14VkRJek9qVTVPalU1TGprNU9UazVPVGxhSVEtLSIsIlRhcmdldExvY2F0aW9uIjowfQ"}, [
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
  '5ba9e02d-5352-44e7-8843-c26b147a5b8b',
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
  'Thu, 25 Jun 2020 13:04:14 GMT',
  'Content-Length',
  '425'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedsecrets?api-version=7.1-preview&$skiptoken=eyJOZXh0TWFya2VyIjoiMiEyMjQhTURBd01USTBJWE5sWTNKbGRDOVNSVU5QVmtWU1EwVlNWRWxHU1VOQlZFVk9RVTFGTFVOQlRsSkZRVVJEUVU1RFJVeEJUa1JFUlV4RlZFVkJRMFZTVkVsR1NVTkJWRVZUVDFCRlVrRlVTVTlPTFRjMU5EZ3lNek0xT1RJek5UUXlOak12TjBVMFJVUXdORUkyTmpKRk5Ea3dNRGczTUVJd01UUTFOMFpGUWpWRU4wWWhNREF3TURJNElUazVPVGt0TVRJdE16RlVNak02TlRrNk5Ua3VPVGs1T1RrNU9Wb2giLCJUYXJnZXRMb2NhdGlvbiI6MH0"}, [
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
  'f70db9da-5569-48fa-a874-6768e2cd50ab',
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
  'Thu, 25 Jun 2020 13:04:14 GMT',
  'Content-Length',
  '478'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedsecrets?api-version=7.1-preview&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExNjAhTURBd01EYzJJWE5sWTNKbGRDOVNSVU5QVmtWU1EwVlNWRWxHU1VOQlZFVk9RVTFGTFVOQlRsSkZRMDlXUlZKQlJFVk1SVlJGUkVORlVsUkpSa2xEUVZSRkxUSXpOVEkzT0RreE1USTFOVFV3TURVaE1EQXdNREk0SVRrNU9Ua3RNVEl0TXpGVU1qTTZOVGs2TlRrdU9UazVPVGs1T1ZvaCIsIlRhcmdldExvY2F0aW9uIjowfQ"}, [
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
  '4c5af23d-7655-4714-aedd-ad17a9429e43',
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
  'Thu, 25 Jun 2020 13:04:14 GMT',
  'Content-Length',
  '393'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedsecrets?api-version=7.1-preview&$skiptoken=eyJOZXh0TWFya2VyIjoiMiEyMDQhTURBd01UQTVJWE5sWTNKbGRDOVNSVU5QVmtWU1EwVlNWRWxHU1VOQlZFVk9RVTFGTFVOQlRsSkZRMDlXUlZKQlJFVk1SVlJGUkVORlVsUkpSa2xEUVZSRkxUazRNekF4TkRFeE16TTFPVEV3TXprdk1FSkNNMFl5TnpVd05VWTBORVpDT1RsR09UVTNNemhGUlRJelJqQkdRMFVoTURBd01ESTRJVGs1T1RrdE1USXRNekZVTWpNNk5UazZOVGt1T1RrNU9UazVPVm9oIiwiVGFyZ2V0TG9jYXRpb24iOjB9"}, [
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
  '15220f40-4121-49a4-a04e-5da33cb272b8',
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
  'Thu, 25 Jun 2020 13:04:15 GMT',
  'Content-Length',
  '451'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedsecrets?api-version=7.1-preview&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExNTIhTURBd01EY3dJWE5sWTNKbGRDOVNSVU5QVmtWU1EwVlNWRWxHU1VOQlZFVk9RVTFGTFVOQlRsSkZVMVJQVWtWQlEwVlNWRWxHU1VOQlZFVXRNelUyT0Rrek1qTTVNemc1TURRNE1qY2hNREF3TURJNElUazVPVGt0TVRJdE16RlVNak02TlRrNk5Ua3VPVGs1T1RrNU9Wb2giLCJUYXJnZXRMb2NhdGlvbiI6MH0"}, [
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
  '4b9a64f1-f2ba-4dd2-a73f-e0b2ad0d3cc0',
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
  'Thu, 25 Jun 2020 13:04:15 GMT',
  'Content-Length',
  '382'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedsecrets?api-version=7.1-preview&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExOTYhTURBd01UQXlJWE5sWTNKbGRDOVNSVU5QVmtWU1EwVlNWRWxHU1VOQlZFVk9RVTFGTFVOQlRsSkZVMVJQVWtWQlEwVlNWRWxHU1VOQlZFVXROek0wTWpVd09EQTVNekV5TmpVMk15OUdPRVUzUmpReFFqa3hPRFkwT0VZM1FrUkNRVEEyTmtORlFUUXdOemcxT0NFd01EQXdNamdoT1RrNU9TMHhNaTB6TVZReU16bzFPVG8xT1M0NU9UazVPVGs1V2lFLSIsIlRhcmdldExvY2F0aW9uIjowfQ"}, [
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
  '36b15dea-ec0b-45c5-b2dd-384fff63951b',
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
  'Thu, 25 Jun 2020 13:04:15 GMT',
  'Content-Length',
  '441'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedsecrets?api-version=7.1-preview&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExNjAhTURBd01EYzJJWE5sWTNKbGRDOVNSVU5QVmtWU1EwVlNWRWxHU1VOQlZFVk9RVTFGTFVOQlRsSkZVMVZOUlVaU1QwMUJVMVJQVUZCRlJGQlBURXhGVWkwd01ETTNPRFl6TnpNME56ZzJNekUwTWpJaE1EQXdNREk0SVRrNU9Ua3RNVEl0TXpGVU1qTTZOVGs2TlRrdU9UazVPVGs1T1ZvaCIsIlRhcmdldExvY2F0aW9uIjowfQ"}, [
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
  '3f9c2bd5-a650-42af-a77d-786752812b60',
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
  'Thu, 25 Jun 2020 13:04:15 GMT',
  'Content-Length',
  '393'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedsecrets?api-version=7.1-preview&$skiptoken=eyJOZXh0TWFya2VyIjoiMiEyMDQhTURBd01UQTRJWE5sWTNKbGRDOVNSVU5QVmtWU1EwVlNWRWxHU1VOQlZFVk9RVTFGTFVOQlRsSkZVMVZOUlVaU1QwMUJVMVJQVUZCRlJGQlBURXhGVWkweE1qQXdNemMxT0RNMU9EVTNNVEE0TWk4MU9URkdSVVE1TWtVMFFUWTBOREE1UWpRek1UY3lRakJCTURVNFFrRkRPU0V3TURBd01qZ2hPVGs1T1MweE1pMHpNVlF5TXpvMU9UbzFPUzQ1T1RrNU9UazVXaUUtIiwiVGFyZ2V0TG9jYXRpb24iOjB9"}, [
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
  '8ffe46ee-3c41-4e57-9ccc-c7d809cf40b1',
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
  'Thu, 25 Jun 2020 13:04:15 GMT',
  'Content-Length',
  '451'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedsecrets?api-version=7.1-preview&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExNjAhTURBd01EYzFJWE5sWTNKbGRDOVNSVU5QVmtWU1EwVlNWRWxHU1VOQlZFVk9RVTFGTFVOQlRsSkZVMVZOUlVaU1QwMUJVMVJQVUZCRlJGQlBURXhGVWkweU56VXhORFF6TVRBeU1UTXhOVGcxTlNFd01EQXdNamdoT1RrNU9TMHhNaTB6TVZReU16bzFPVG8xT1M0NU9UazVPVGs1V2lFLSIsIlRhcmdldExvY2F0aW9uIjowfQ"}, [
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
  'c2761dc9-b71f-41e7-ac99-a062b1c87996',
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
  'Thu, 25 Jun 2020 13:04:15 GMT',
  'Content-Length',
  '393'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedsecrets?api-version=7.1-preview&$skiptoken=eyJOZXh0TWFya2VyIjoiMiEyMDQhTURBd01UQTNJWE5sWTNKbGRDOVNSVU5QVmtWU1EwVlNWRWxHU1VOQlZFVk9RVTFGTFVOQlRsSkZVMVZOUlVaU1QwMUJVMVJQVUZCRlJGQlBURXhGVWkwek9UZ3pORFV6TVRBeE9EazNNemN5THpReE1ESkVSalZFUWprM1JUUXlNVE00T1RKR1JVUTNPVVkyUWpnek5qUXdJVEF3TURBeU9DRTVPVGs1TFRFeUxUTXhWREl6T2pVNU9qVTVMams1T1RrNU9UbGFJUS0tIiwiVGFyZ2V0TG9jYXRpb24iOjB9"}, [
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
  '34e240b3-5a11-4420-ae01-d99074abb7ac',
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
  'Thu, 25 Jun 2020 13:04:15 GMT',
  'Content-Length',
  '451'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedsecrets?api-version=7.1-preview&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExNjAhTURBd01EYzBJWE5sWTNKbGRDOVNSVU5QVmtWU1EwVlNWRWxHU1VOQlZFVk9RVTFGTFVOQlRsSkZVMVZOUlVaU1QwMUJVMVJQVUZCRlJGQlBURXhGVWkwMk1qTXpOemd5T0RNM05UUXpPVE0xSVRBd01EQXlPQ0U1T1RrNUxURXlMVE14VkRJek9qVTVPalU1TGprNU9UazVPVGxhSVEtLSIsIlRhcmdldExvY2F0aW9uIjowfQ"}, [
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
  '92990a5d-4c3e-414c-b5c5-74bc3b19e6e9',
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
  'Thu, 25 Jun 2020 13:04:15 GMT',
  'Content-Length',
  '393'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedsecrets?api-version=7.1-preview&$skiptoken=eyJOZXh0TWFya2VyIjoiMiEyMDQhTURBd01UQTNJWE5sWTNKbGRDOVNSVU5QVmtWU1EwVlNWRWxHU1VOQlZFVk9RVTFGTFVOQlRsSkZVMVZOUlVaU1QwMUJVMVJQVUZCRlJGQlBURXhGVWkwNE1qYzNPVGMwTlRjM05Ua3lORGN6TDBWRE1EWkROek5DUWtVek9EUTVRalZDTlVJMFJVSkZNekF5UXpJd05ERXhJVEF3TURBeU9DRTVPVGs1TFRFeUxUTXhWREl6T2pVNU9qVTVMams1T1RrNU9UbGFJUS0tIiwiVGFyZ2V0TG9jYXRpb24iOjB9"}, [
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
  '27be183b-5540-44c4-8c17-ae3fa7e0c206',
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
  'Thu, 25 Jun 2020 13:04:15 GMT',
  'Content-Length',
  '451'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedsecrets?api-version=7.1-preview&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExNzIhTURBd01EZzFJWE5sWTNKbGRDOVNSVU5QVmtWU1EwVlNWRWxHU1VOQlZFVk9RVTFGTFVOQlRsSkZWRkpKUlZaRlFVeE1Wa1ZTVTBsUFRsTlBSa0ZEUlZKVVNVWkpRMEZVUlMwd01UVTJNVEEyTXprNE9USXhOREkxTURnaE1EQXdNREk0SVRrNU9Ua3RNVEl0TXpGVU1qTTZOVGs2TlRrdU9UazVPVGs1T1ZvaCIsIlRhcmdldExvY2F0aW9uIjowfQ"}, [
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
  '26c2dcf4-7dd7-481b-b37d-b836ff489d9d',
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
  'Thu, 25 Jun 2020 13:04:16 GMT',
  'Content-Length',
  '409'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedsecrets?api-version=7.1-preview&$skiptoken=eyJOZXh0TWFya2VyIjoiMiEyMTYhTURBd01URTJJWE5sWTNKbGRDOVNSVU5QVmtWU1EwVlNWRWxHU1VOQlZFVk9RVTFGTFVOQlRsSkZWRkpKUlZaRlFVeE1Wa1ZTVTBsUFRsTlBSa0ZEUlZKVVNVWkpRMEZVUlMweU9ERXdPVFl3T0RFMk5qWXpNVFkwTHprME5EVXlOVE13TWpVd01EUXhOVFE0UkVORk1UZEJSa0pGTVVNek9VWTBJVEF3TURBeU9DRTVPVGs1TFRFeUxUTXhWREl6T2pVNU9qVTVMams1T1RrNU9UbGFJUS0tIiwiVGFyZ2V0TG9jYXRpb24iOjB9"}, [
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
  '48d2ab8a-349d-457c-a64e-2937ff587cbf',
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
  'Thu, 25 Jun 2020 13:04:16 GMT',
  'Content-Length',
  '467'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedsecrets?api-version=7.1-preview&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExNzIhTURBd01EZ3pJWE5sWTNKbGRDOVNSVU5QVmtWU1EwVlNWRWxHU1VOQlZFVk9RVTFGTFVOQlRsSkZWRkpKUlZaRlFVeE1Wa1ZTVTBsUFRsTlBSa0ZEUlZKVVNVWkpRMEZVUlMwMk9ERXhORGszTURnNE1qa3pNell4SVRBd01EQXlPQ0U1T1RrNUxURXlMVE14VkRJek9qVTVPalU1TGprNU9UazVPVGxhSVEtLSIsIlRhcmdldExvY2F0aW9uIjowfQ"}, [
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
  '5c14b759-8b5b-4d68-bb44-0d40d04f8181',
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
  'Thu, 25 Jun 2020 13:04:16 GMT',
  'Content-Length',
  '409'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedsecrets?api-version=7.1-preview&$skiptoken=eyJOZXh0TWFya2VyIjoiMiEyMjghTURBd01USTNJWE5sWTNKbGRDOVNSVU5QVmtWU1EwVlNWRWxHU1VOQlZFVk9RVTFGTFVOQlRsSkZWRkpKUlZaRlZFaEZURUZVUlZOVVZrVlNVMGxQVGs5R1FVTkZVbFJKUmtsRFFWUkZWa0ZNVlVVdE1USXpPVFU0TkRZM01qVXlOemczT0RFdk5USXlPVEUyTkVRek9UZzFORGt3TWtFNVFUTTNNVEV5T0RBME4wWkZPRVloTURBd01ESTRJVGs1T1RrdE1USXRNekZVTWpNNk5UazZOVGt1T1RrNU9UazVPVm9oIiwiVGFyZ2V0TG9jYXRpb24iOjB9"}, [
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
  '313d0139-e60b-429a-82de-dde987a89663',
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
  'Thu, 25 Jun 2020 13:04:16 GMT',
  'Content-Length',
  '483'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedsecrets?api-version=7.1-preview&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExODQhTURBd01EazBJWE5sWTNKbGRDOVNSVU5QVmtWU1EwVlNWRWxHU1VOQlZFVk9RVTFGTFVOQlRsSkZWRkpKUlZaRlZFaEZURUZVUlZOVVZrVlNVMGxQVGs5R1FVTkZVbFJKUmtsRFFWUkZWa0ZNVlVVdE16a3pNRE01TURjeU56YzFNRFF3TXpVaE1EQXdNREk0SVRrNU9Ua3RNVEl0TXpGVU1qTTZOVGs2TlRrdU9UazVPVGs1T1ZvaCIsIlRhcmdldExvY2F0aW9uIjowfQ"}, [
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
  '37285f13-83d4-4069-b963-7c683d735cda',
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
  'Thu, 25 Jun 2020 13:04:16 GMT',
  'Content-Length',
  '425'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedsecrets?api-version=7.1-preview&$skiptoken=eyJOZXh0TWFya2VyIjoiMiEyMjghTURBd01USTJJWE5sWTNKbGRDOVNSVU5QVmtWU1EwVlNWRWxHU1VOQlZFVk9RVTFGTFVOQlRsSkZWRkpKUlZaRlZFaEZURUZVUlZOVVZrVlNVMGxQVGs5R1FVTkZVbFJKUmtsRFFWUkZWa0ZNVlVVdE9ERTFOVFkyTnpnME9EYzVOekEyT0M4elEwRTBRakZDUkRRd05EazBOVFF6T1RGQk1FRTRNall4UlRRME5UQTNSaUV3TURBd01qZ2hPVGs1T1MweE1pMHpNVlF5TXpvMU9UbzFPUzQ1T1RrNU9UazVXaUUtIiwiVGFyZ2V0TG9jYXRpb24iOjB9"}, [
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
  '908ec1f7-85ba-408a-b70f-0546b03a49af',
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
  'Thu, 25 Jun 2020 13:04:16 GMT',
  'Content-Length',
  '483'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedsecrets?api-version=7.1-preview&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExNjAhTURBd01EYzJJWE5sWTNKbGRDOVNSVU5QVmtWU1EwVlNWRWxHU1VOQlZFVk9RVTFGTFVOQlRsVlFSRUZVUlVGRFJWSlVTVVpKUTBGVVJWTlFUMHhKUTFrdE1EVXhNelkzTXpreU1qVXlOekU0TWpVaE1EQXdNREk0SVRrNU9Ua3RNVEl0TXpGVU1qTTZOVGs2TlRrdU9UazVPVGs1T1ZvaCIsIlRhcmdldExvY2F0aW9uIjowfQ"}, [
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
  '4e436e33-0983-43db-a3ee-5c6e309dcb65',
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
  'Thu, 25 Jun 2020 13:04:16 GMT',
  'Content-Length',
  '393'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedsecrets?api-version=7.1-preview&$skiptoken=eyJOZXh0TWFya2VyIjoiMiEyMDQhTURBd01UQTNJWE5sWTNKbGRDOVNSVU5QVmtWU1EwVlNWRWxHU1VOQlZFVk9RVTFGTFVOQlRsVlFSRUZVUlVGRFJWSlVTVVpKUTBGVVJWTlFUMHhKUTFrdE5UTTBPVFE0TXpNeE56TTBPREUwTHpKRE5rWkVPRVl5TmpkQlFUUTJNREpCTWpVeVFUZzFNVVZGUVRrNE5FTkVJVEF3TURBeU9DRTVPVGs1TFRFeUxUTXhWREl6T2pVNU9qVTVMams1T1RrNU9UbGFJUS0tIiwiVGFyZ2V0TG9jYXRpb24iOjB9"}, [
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
  'eaf6b75e-2fdd-41b0-8172-a2f287b15701',
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
  'Thu, 25 Jun 2020 13:04:16 GMT',
  'Content-Length',
  '451'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedsecrets?api-version=7.1-preview&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExNjAhTURBd01EYzFJWE5sWTNKbGRDOVNSVU5QVmtWU1EwVlNWRWxHU1VOQlZFVk9RVTFGTFVOQlRsVlFSRUZVUlVGRFJWSlVTVVpKUTBGVVJWTlFUMHhKUTFrdE5qZ3pOalE0TlRrMk9ETTFOelE0TWlFd01EQXdNamdoT1RrNU9TMHhNaTB6TVZReU16bzFPVG8xT1M0NU9UazVPVGs1V2lFLSIsIlRhcmdldExvY2F0aW9uIjowfQ"}, [
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
  '371a44a7-37d5-4838-8819-81667b36b594',
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
  'Thu, 25 Jun 2020 13:04:16 GMT',
  'Content-Length',
  '393'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedsecrets?api-version=7.1-preview&$skiptoken=eyJOZXh0TWFya2VyIjoiMiEyMjQhTURBd01USTBJWE5sWTNKbGRDOVNSVU5QVmtWU1EwVlNWRWxHU1VOQlZFVk9RVTFGTFVOQlRsVlFSRUZVUlVORlVsUkpSa2xEUVZSRlYwbFVTRkpGVVZWRlUxUlBVRlJKVDA1VFZFbE5SVTlWVkMwMU9UQTBNRGM0TmpnNE5qUTBOak12TkVKQk56ZzRSalZHUTBSRk5EUXhOa0ZFT1RKRVJqUTVPRUUwTjBZeE5qQWhNREF3TURJNElUazVPVGt0TVRJdE16RlVNak02TlRrNk5Ua3VPVGs1T1RrNU9Wb2giLCJUYXJnZXRMb2NhdGlvbiI6MH0"}, [
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
  'b0102c2b-8e37-48ab-813f-365c604fe753',
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
  'Thu, 25 Jun 2020 13:04:17 GMT',
  'Content-Length',
  '478'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedsecrets?api-version=7.1-preview&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExNjQhTURBd01EYzRJWE5sWTNKbGRDOVNSVU5QVmtWU1EwVlNWRWxHU1VOQlZFVk9RVTFGTFVOQlRsVlFSRUZVUlZSSVJWUkJSMU5QUmtGRFJWSlVTVVpKUTBGVVJTMHdPVGt5TmpneU1Ea3pNelF6TWprMU5pRXdNREF3TWpnaE9UazVPUzB4TWkwek1WUXlNem8xT1RvMU9TNDVPVGs1T1RrNVdpRS0iLCJUYXJnZXRMb2NhdGlvbiI6MH0"}, [
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
  '790d776d-fcbe-4bf7-abec-dce55a568436',
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
  'Thu, 25 Jun 2020 13:04:17 GMT',
  'Content-Length',
  '398'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedsecrets?api-version=7.1-preview&$skiptoken=eyJOZXh0TWFya2VyIjoiMiEyMDghTURBd01URXdJWE5sWTNKbGRDOVNSVU5QVmtWU1EwVlNWRWxHU1VOQlZFVk9RVTFGTFVOQlRsVlFSRUZVUlZSSVJWUkJSMU5QUmtGRFJWSlVTVVpKUTBGVVJTMHlPRFE1T0RReU1UUTVOVGcwTXpBMUx6RTFORGcxTVRGQ09EUTRNRFF3TVRGQ01rTkNPRFUyUVVKQlF6WkdSRGN5SVRBd01EQXlPQ0U1T1RrNUxURXlMVE14VkRJek9qVTVPalU1TGprNU9UazVPVGxhSVEtLSIsIlRhcmdldExvY2F0aW9uIjowfQ"}, [
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
  'ac8585cd-b8f6-45a1-8adf-3bbff47c4129',
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
  'Thu, 25 Jun 2020 13:04:17 GMT',
  'Content-Length',
  '457'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedsecrets?api-version=7.1-preview&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExNjQhTURBd01EYzNJWE5sWTNKbGRDOVNSVU5QVmtWU1EwVlNWRWxHU1VOQlZFVk9RVTFGTFVOQlRsVlFSRUZVUlZSSVJWUkJSMU5QUmtGRFJWSlVTVVpKUTBGVVJTMDFOemMwTkRRMU9UTTNOekF6TkRRM0lUQXdNREF5T0NFNU9UazVMVEV5TFRNeFZESXpPalU1T2pVNUxqazVPVGs1T1RsYUlRLS0iLCJUYXJnZXRMb2NhdGlvbiI6MH0"}, [
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
  '088c255d-fda6-4d41-a786-f078d19bbd28',
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
  'Thu, 25 Jun 2020 13:04:18 GMT',
  'Content-Length',
  '398'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedsecrets?api-version=7.1-preview&$skiptoken=eyJOZXh0TWFya2VyIjoiMiEyMDghTURBd01URXdJWE5sWTNKbGRDOVNSVU5QVmtWU1EwVlNWRWxHU1VOQlZFVk9RVTFGTFVOQlRsVlFSRUZVUlZSSVJWUkJSMU5QUmtGRFJWSlVTVVpKUTBGVVJTMDRPRFk0TmpnM01UZzFOVEkyTkRNMkx6SkRORFJGTVRWR05qZENSRFJEUmpKQ09EY3pPVFUyTXpnd09FSTRSREpDSVRBd01EQXlPQ0U1T1RrNUxURXlMVE14VkRJek9qVTVPalU1TGprNU9UazVPVGxhSVEtLSIsIlRhcmdldExvY2F0aW9uIjowfQ"}, [
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
  '48e78884-bd3e-4f24-88f6-7a49e3d31e07',
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
  'Thu, 25 Jun 2020 13:04:18 GMT',
  'Content-Length',
  '457'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedsecrets?api-version=7.1-preview&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExNjghTURBd01EZ3dJWE5sWTNKbGRDOVNSVU5QVmtWU1EwVlNWRWxHU1VOQlZFVk9RVTFGTFVOQlRsZEJTVlJWVGxSSlRFRkRSVkpVU1VaSlEwRlVSVWxUUTFKRlFWUkZSQzAyTnpJNE1UTXhPRGMwT0Rrek1EWTJJVEF3TURBeU9DRTVPVGs1TFRFeUxUTXhWREl6T2pVNU9qVTVMams1T1RrNU9UbGFJUS0tIiwiVGFyZ2V0TG9jYXRpb24iOjB9"}, [
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
  '7230a894-51f0-415f-aaf5-2b97fa5af768',
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
  'Thu, 25 Jun 2020 13:04:18 GMT',
  'Content-Length',
  '403'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedsecrets?api-version=7.1-preview&$skiptoken=eyJOZXh0TWFya2VyIjoiMiEyNzYhTURBd01UWXhJWE5sWTNKbGRDOVNSVU5QVmtWU1EwVlNWRWxHU1VOQlZFVk9RVTFGTFVOQlRsZEJTVlJWVGxSSlRFRkRSVkpVU1VaSlEwRlVSVWxUUTFKRlFWUkZSRUpaUjBWVVZFbE9SMVJJUlZCUFRFeEZVa1pTVDAxSFJWUkRSVkpVU1VaSlEwRlVSVTlRUlZKQlZFbFBUaTB3TURJek9EQXpORGswT1RVeE1ERXpOVEkyTHpRek1EZ3lOVUkzTnpCQk5UUXhNVGhDUWpJeVF6Z3lNVGt6TVRRd01UVkRJVEF3TURBeU9DRTVPVGs1TFRFeUxUTXhWREl6T2pVNU9qVTVMams1T1RrNU9UbGFJUS0tIiwiVGFyZ2V0TG9jYXRpb24iOjB9"}, [
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
  '19c24e8a-e761-4386-87e6-7d79529eb911',
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
  'Thu, 25 Jun 2020 13:04:18 GMT',
  'Content-Length',
  '547'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedsecrets?api-version=7.1-preview&$skiptoken=eyJOZXh0TWFya2VyIjoiMiEyMjghTURBd01USTFJWE5sWTNKbGRDOVNSVU5QVmtWU1EwVlNWRWxHU1VOQlZFVk9RVTFGTFVOQlRsZEJTVlJWVGxSSlRFRkRSVkpVU1VaSlEwRlVSVWxUUTFKRlFWUkZSRUpaUjBWVVZFbE9SMVJJUlZCUFRFeEZVa1pTVDAxSFJWUkRSVkpVU1VaSlEwRlVSVTlRUlZKQlZFbFBUaTA0TURJMU5qa3pNREF4TVRFME1qY3hJVEF3TURBeU9DRTVPVGs1TFRFeUxUTXhWREl6T2pVNU9qVTVMams1T1RrNU9UbGFJUS0tIiwiVGFyZ2V0TG9jYXRpb24iOjB9"}, [
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
  '4d5a1298-75fd-40bd-a779-b2413550aff8',
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
  'Thu, 25 Jun 2020 13:04:18 GMT',
  'Content-Length',
  '483'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedsecrets?api-version=7.1-preview&$skiptoken=eyJOZXh0TWFya2VyIjoiMiEyMTIhTURBd01URTBJWE5sWTNKbGRDOVNSVU5QVmtWU1EwVlNWRWxHU1VOQlZFVk9RVTFGTFVOQlRsZEJTVlJWVGxSSlRFRkRSVkpVU1VaSlEwRlVSVWxUUkVWTVJWUkZSQzB5TlRJNE16YzJORFl5T0RJNE1UZ3hNeTg0TkRCQk5EaERNakZEUWtRME4wVkZRVVUzT0VJNU5rSTBSRU13TVRCRVFpRXdNREF3TWpnaE9UazVPUzB4TWkwek1WUXlNem8xT1RvMU9TNDVPVGs1T1RrNVdpRS0iLCJUYXJnZXRMb2NhdGlvbiI6MH0"}, [
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
  'bf0d6189-2726-42b9-b5b0-e3edf2c5be22',
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
  'Thu, 25 Jun 2020 13:04:18 GMT',
  'Content-Length',
  '462'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedsecrets?api-version=7.1-preview&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExNjghTURBd01EZ3dJWE5sWTNKbGRDOVNSVU5QVmtWU1EwVlNWRWxHU1VOQlZFVk9RVTFGTFVOQlRsZEJTVlJWVGxSSlRFRkRSVkpVU1VaSlEwRlVSVWxUUkVWTVJWUkZSQzA1TURJNU9ETXpOVGt3TWpJd01qTXpJVEF3TURBeU9DRTVPVGs1TFRFeUxUTXhWREl6T2pVNU9qVTVMams1T1RrNU9UbGFJUS0tIiwiVGFyZ2V0TG9jYXRpb24iOjB9"}, [
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
  'b31651fa-0dee-4db4-bb7d-7431f2c08964',
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
  'Thu, 25 Jun 2020 13:04:18 GMT',
  'Content-Length',
  '403'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedsecrets?api-version=7.1-preview&$skiptoken=eyJOZXh0TWFya2VyIjoiMiEyMTIhTURBd01URTFJWE5sWTNKbGRDOVNSVU5QVmtWU1EwVlNWRWxHU1VOQlZFVk9RVTFGTFVOQlRsZEJTVlJWVGxSSlRFRkRSVkpVU1VaSlEwRlVSVWxUVWtWRFQxWkZVa1ZFTFRRM016UTFPVFEwTnpZMU1EQTFOekV2UVVFNFFqSTRRekUxUVVJeE5FVTBRemcxT1VSR05EZzNNakUzT0RRMk9UVWhNREF3TURJNElUazVPVGt0TVRJdE16RlVNak02TlRrNk5Ua3VPVGs1T1RrNU9Wb2giLCJUYXJnZXRMb2NhdGlvbiI6MH0"}, [
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
  '61400d21-4e3f-4e36-9eb3-46bb08e011de',
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
  'Thu, 25 Jun 2020 13:04:19 GMT',
  'Content-Length',
  '462'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedsecrets?api-version=7.1-preview&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExNjghTURBd01EZ3lJWE5sWTNKbGRDOVNSVU5QVmtWU1EwVlNWRWxHU1VOQlZFVk9RVTFGTFZWVFNVNUhRa1ZIU1U1RVJVeEZWRVZEUlZKVVNVWkpRMEZVUlZOUVQweE1SVkl0TWpRek5EYzFNVFl3T0RFMU9ERTVPRGdoTURBd01ESTRJVGs1T1RrdE1USXRNekZVTWpNNk5UazZOVGt1T1RrNU9UazVPVm9oIiwiVGFyZ2V0TG9jYXRpb24iOjB9"}, [
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
  '45228f66-67ef-4db0-9e89-9d1011221fd3',
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
  'Thu, 25 Jun 2020 13:04:19 GMT',
  'Content-Length',
  '403'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedsecrets?api-version=7.1-preview&$skiptoken=eyJOZXh0TWFya2VyIjoiMiEyMTIhTURBd01URTBJWE5sWTNKbGRDOVNSVU5QVmtWU1EwVlNWRWxHU1VOQlZFVk9RVTFGTFZWVFNVNUhRa1ZIU1U1RVJVeEZWRVZEUlZKVVNVWkpRMEZVUlZOUVQweE1SVkl0TmpZNE5qa3hNek01TnpVMk56VTJOeTh3TlROR1JUaEROelJCTWpjME1UWTFRakl5UTBOQk1VWXpRelJHTWpFd1FTRXdNREF3TWpnaE9UazVPUzB4TWkwek1WUXlNem8xT1RvMU9TNDVPVGs1T1RrNVdpRS0iLCJUYXJnZXRMb2NhdGlvbiI6MH0"}, [
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
  '363fc30c-09f8-4ff0-adeb-8526853ee57a',
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
  'Thu, 25 Jun 2020 13:04:19 GMT',
  'Content-Length',
  '462'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedsecrets?api-version=7.1-preview&$skiptoken=eyJOZXh0TWFya2VyIjoiMiExNjAhTURBd01EYzBJWE5sWTNKbGRDOVNSVU5QVmtWU1EwVlNWRWxHU1VOQlZFVk9RVTFGTFZWVFNVNUhSMFZVUkVWTVJWUkZSRU5GVWxSSlJrbERRVlJGTFRFNU5qYzFPVEUyT1RFek1UTXhPVEE0SVRBd01EQXlPQ0U1T1RrNUxURXlMVE14VkRJek9qVTVPalU1TGprNU9UazVPVGxhSVEtLSIsIlRhcmdldExvY2F0aW9uIjowfQ"}, [
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
  '8ff6df83-422d-4126-b01f-62799f40f1f1',
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
  'Thu, 25 Jun 2020 13:04:19 GMT',
  'Content-Length',
  '393'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets')
  .query(true)
  .reply(200, {"value":[],"nextLink":"https://keyvault_name.vault.azure.net:443/deletedsecrets?api-version=7.1-preview&$skiptoken=eyJOZXh0TWFya2VyIjoiMiEyMDAhTURBd01UQTJJWE5sWTNKbGRDOVNSVU5QVmtWU1EwVlNWRWxHU1VOQlZFVk9RVTFGTFZWVFNVNUhSMFZVUkVWTVJWUkZSRU5GVWxSSlJrbERRVlJGTFRjNE1qY3pORGd5TmpBeE9UWTNORGt2UVVFME9FVkJPVVF4T1VKQk5ESkRNa0V4UWpFeE5EbEVSa0kxTmpBelFUSWhNREF3TURJNElUazVPVGt0TVRJdE16RlVNak02TlRrNk5Ua3VPVGs1T1RrNU9Wb2giLCJUYXJnZXRMb2NhdGlvbiI6MH0"}, [
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
  'ecd7e2a5-5c34-4334-b3ad-7f07548f8023',
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
  'Thu, 25 Jun 2020 13:04:19 GMT',
  'Content-Length',
  '446'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets')
  .query(true)
  .reply(200, {"value":[],"nextLink":null}, [
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
  'f96353a3-dc30-462c-875d-c550ac978a9e',
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
  'Thu, 25 Jun 2020 13:04:19 GMT',
  'Content-Length',
  '28'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedsecrets/listSecretName-canlistdeletedsecrets-0')
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
  '58d14ac6-036d-4a44-a53e-25b8451f9f17',
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
  'Thu, 25 Jun 2020 13:04:19 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedsecrets/listSecretName-canlistdeletedsecrets-1')
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
  '2300ebfc-ee25-44f4-b803-2d00853227ac',
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
  'Thu, 25 Jun 2020 13:04:19 GMT'
]);

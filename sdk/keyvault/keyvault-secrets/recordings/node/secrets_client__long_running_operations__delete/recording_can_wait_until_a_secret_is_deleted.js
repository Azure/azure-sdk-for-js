let nock = require('nock');

module.exports.hash = "b241133f957b8c38fbc40c0a50942c6a";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .put('/secrets/lroDeleteSecretName-canwaituntilasecretisdeleted-')
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
  '4f7ce785-55c4-4516-a7c7-e30e73b3f1a9',
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
  'Thu, 25 Jun 2020 12:00:55 GMT'
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
  '4926441e-aa8c-4fb2-8003-772387e91c00',
  'x-ms-ests-server',
  '2.1.10732.8 - WUS2 ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AgXxO1h52DBMqBa4G-gDnyc_aSJHAQAAAPeIhtYOAAAA; expires=Sat, 25-Jul-2020 12:00:55 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; SameSite=None; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; SameSite=None; secure; HttpOnly',
  'Date',
  'Thu, 25 Jun 2020 12:00:55 GMT',
  'Content-Length',
  '1315'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .put('/secrets/lroDeleteSecretName-canwaituntilasecretisdeleted-', {"value":"value","attributes":{}})
  .query(true)
  .reply(200, {"value":"value","id":"https://keyvault_name.vault.azure.net/secrets/lroDeleteSecretName-canwaituntilasecretisdeleted-/163e2076df374acaab8708465a24a759","attributes":{"enabled":true,"created":1593086455,"updated":1593086455,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90}}, [
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
  'aefee21d-d86d-4fc7-a9ee-538c7f4f383d',
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
  'Thu, 25 Jun 2020 12:00:55 GMT',
  'Content-Length',
  '308'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/secrets/lroDeleteSecretName-canwaituntilasecretisdeleted-')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedsecrets/lroDeleteSecretName-canwaituntilasecretisdeleted-","deletedDate":1593086455,"scheduledPurgeDate":1600862455,"id":"https://keyvault_name.vault.azure.net/secrets/lroDeleteSecretName-canwaituntilasecretisdeleted-/163e2076df374acaab8708465a24a759","attributes":{"enabled":true,"created":1593086455,"updated":1593086455,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90}}, [
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
  '23ff9a1c-b5b7-424c-b300-aff877eb84ac',
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
  'Thu, 25 Jun 2020 12:00:55 GMT',
  'Content-Length',
  '489'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets/lroDeleteSecretName-canwaituntilasecretisdeleted-')
  .query(true)
  .reply(404, {"error":{"code":"SecretNotFound","message":"Deleted Secret not found: lroDeleteSecretName-canwaituntilasecretisdeleted-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '140',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '6c76cdcd-3720-429c-9562-42331ce67015',
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
  'Thu, 25 Jun 2020 12:00:55 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets/lroDeleteSecretName-canwaituntilasecretisdeleted-')
  .query(true)
  .reply(404, {"error":{"code":"SecretNotFound","message":"Deleted Secret not found: lroDeleteSecretName-canwaituntilasecretisdeleted-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '140',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'df47d41d-11e2-469e-96c4-48d48bbc9663',
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
  'Thu, 25 Jun 2020 12:00:55 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets/lroDeleteSecretName-canwaituntilasecretisdeleted-')
  .query(true)
  .reply(404, {"error":{"code":"SecretNotFound","message":"Deleted Secret not found: lroDeleteSecretName-canwaituntilasecretisdeleted-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '140',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '3cb0ff10-fccf-45e3-a71d-c99f523430f2',
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
  'Thu, 25 Jun 2020 12:00:57 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets/lroDeleteSecretName-canwaituntilasecretisdeleted-')
  .query(true)
  .reply(404, {"error":{"code":"SecretNotFound","message":"Deleted Secret not found: lroDeleteSecretName-canwaituntilasecretisdeleted-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '140',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '5ff303ec-b962-4c29-b664-408e548e8a39',
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
  'Thu, 25 Jun 2020 12:00:59 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets/lroDeleteSecretName-canwaituntilasecretisdeleted-')
  .query(true)
  .reply(404, {"error":{"code":"SecretNotFound","message":"Deleted Secret not found: lroDeleteSecretName-canwaituntilasecretisdeleted-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '140',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '6853ed91-f627-44dd-99d4-490790726b80',
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
  'Thu, 25 Jun 2020 12:01:01 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets/lroDeleteSecretName-canwaituntilasecretisdeleted-')
  .query(true)
  .reply(404, {"error":{"code":"SecretNotFound","message":"Deleted Secret not found: lroDeleteSecretName-canwaituntilasecretisdeleted-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '140',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '25f16778-a501-4e3f-9129-263a2c8e3eb2',
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
  'Thu, 25 Jun 2020 12:01:03 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets/lroDeleteSecretName-canwaituntilasecretisdeleted-')
  .query(true)
  .reply(404, {"error":{"code":"SecretNotFound","message":"Deleted Secret not found: lroDeleteSecretName-canwaituntilasecretisdeleted-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '140',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '03bfaa33-cdb1-48d8-b295-292329b21148',
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
  'Thu, 25 Jun 2020 12:01:06 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets/lroDeleteSecretName-canwaituntilasecretisdeleted-')
  .query(true)
  .reply(404, {"error":{"code":"SecretNotFound","message":"Deleted Secret not found: lroDeleteSecretName-canwaituntilasecretisdeleted-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '140',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'b070a5a9-eac1-4016-b299-af86bad47a77',
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
  'Thu, 25 Jun 2020 12:01:08 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets/lroDeleteSecretName-canwaituntilasecretisdeleted-')
  .query(true)
  .reply(404, {"error":{"code":"SecretNotFound","message":"Deleted Secret not found: lroDeleteSecretName-canwaituntilasecretisdeleted-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '140',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'e198b0b9-034c-4731-bfdd-07ee7ccff4fd',
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
  'Thu, 25 Jun 2020 12:01:10 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets/lroDeleteSecretName-canwaituntilasecretisdeleted-')
  .query(true)
  .reply(404, {"error":{"code":"SecretNotFound","message":"Deleted Secret not found: lroDeleteSecretName-canwaituntilasecretisdeleted-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '140',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '134223f0-271d-4664-ad2b-9013e1e0331e',
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
  'Thu, 25 Jun 2020 12:01:11 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets/lroDeleteSecretName-canwaituntilasecretisdeleted-')
  .query(true)
  .reply(404, {"error":{"code":"SecretNotFound","message":"Deleted Secret not found: lroDeleteSecretName-canwaituntilasecretisdeleted-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '140',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'a26199a7-243e-4899-aadf-8abc09b53a02',
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
  'Thu, 25 Jun 2020 12:01:13 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets/lroDeleteSecretName-canwaituntilasecretisdeleted-')
  .query(true)
  .reply(404, {"error":{"code":"SecretNotFound","message":"Deleted Secret not found: lroDeleteSecretName-canwaituntilasecretisdeleted-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '140',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'c2503dd9-0b93-4116-9063-ed42ca15009e',
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
  'Thu, 25 Jun 2020 12:01:15 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets/lroDeleteSecretName-canwaituntilasecretisdeleted-')
  .query(true)
  .reply(404, {"error":{"code":"SecretNotFound","message":"Deleted Secret not found: lroDeleteSecretName-canwaituntilasecretisdeleted-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '140',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '0747ad6f-907e-477a-879e-ea85a7ee1fe9',
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
  'Thu, 25 Jun 2020 12:01:18 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets/lroDeleteSecretName-canwaituntilasecretisdeleted-')
  .query(true)
  .reply(404, {"error":{"code":"SecretNotFound","message":"Deleted Secret not found: lroDeleteSecretName-canwaituntilasecretisdeleted-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '140',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'bac24a14-0b8d-4ea1-b84b-a572dac26386',
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
  'Thu, 25 Jun 2020 12:01:20 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets/lroDeleteSecretName-canwaituntilasecretisdeleted-')
  .query(true)
  .reply(404, {"error":{"code":"SecretNotFound","message":"Deleted Secret not found: lroDeleteSecretName-canwaituntilasecretisdeleted-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '140',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '18c725e9-57ec-4b87-a0e3-e197a22ec971',
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
  'Thu, 25 Jun 2020 12:01:21 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets/lroDeleteSecretName-canwaituntilasecretisdeleted-')
  .query(true)
  .reply(404, {"error":{"code":"SecretNotFound","message":"Deleted Secret not found: lroDeleteSecretName-canwaituntilasecretisdeleted-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '140',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'ee97e9ec-90ea-4904-880e-bd339240a961',
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
  'Thu, 25 Jun 2020 12:01:23 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets/lroDeleteSecretName-canwaituntilasecretisdeleted-')
  .query(true)
  .reply(404, {"error":{"code":"SecretNotFound","message":"Deleted Secret not found: lroDeleteSecretName-canwaituntilasecretisdeleted-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '140',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '00be99f5-211b-4042-babd-3983a2ee703d',
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
  'Thu, 25 Jun 2020 12:01:26 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets/lroDeleteSecretName-canwaituntilasecretisdeleted-')
  .query(true)
  .reply(404, {"error":{"code":"SecretNotFound","message":"Deleted Secret not found: lroDeleteSecretName-canwaituntilasecretisdeleted-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '140',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '8359497c-a484-4154-9755-fed44f99e54b',
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
  'Thu, 25 Jun 2020 12:01:28 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets/lroDeleteSecretName-canwaituntilasecretisdeleted-')
  .query(true)
  .reply(404, {"error":{"code":"SecretNotFound","message":"Deleted Secret not found: lroDeleteSecretName-canwaituntilasecretisdeleted-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '140',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '18462563-5382-4ffe-a9f9-7db921f29d5d',
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
  'Thu, 25 Jun 2020 12:01:30 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets/lroDeleteSecretName-canwaituntilasecretisdeleted-')
  .query(true)
  .reply(404, {"error":{"code":"SecretNotFound","message":"Deleted Secret not found: lroDeleteSecretName-canwaituntilasecretisdeleted-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '140',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'cfdd3c4c-8c85-4d84-9046-ee024d4508b4',
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
  'Thu, 25 Jun 2020 12:01:33 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets/lroDeleteSecretName-canwaituntilasecretisdeleted-')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedsecrets/lroDeleteSecretName-canwaituntilasecretisdeleted-","deletedDate":1593086455,"scheduledPurgeDate":1600862455,"id":"https://keyvault_name.vault.azure.net/secrets/lroDeleteSecretName-canwaituntilasecretisdeleted-/163e2076df374acaab8708465a24a759","attributes":{"enabled":true,"created":1593086455,"updated":1593086455,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90}}, [
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
  '97d6dcfd-0fb8-4b42-a25a-dcd19e40f206',
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
  'Thu, 25 Jun 2020 12:01:35 GMT',
  'Content-Length',
  '489'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedsecrets/lroDeleteSecretName-canwaituntilasecretisdeleted-')
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
  'c702b441-c236-4bcb-915e-0b1802b4d480',
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
  'Thu, 25 Jun 2020 12:01:35 GMT'
]);

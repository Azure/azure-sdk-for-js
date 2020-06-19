let nock = require('nock');

module.exports.hash = "22964b2a9590bf6d05c2d411c750d477";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/localCryptoKeyName-RS384-/create')
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
  'edc31432-2016-4c4d-a3e1-1ed428221b73',
  'x-ms-keyvault-service-version',
  '1.1.7.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.175.226.52;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 19 Jun 2020 23:54:18 GMT'
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
  '19eab36a-fe61-4d57-9ad5-964007ad1100',
  'x-ms-ests-server',
  '2.1.10732.8 - EUS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=Ai-2f2rqdSBHi0alma7IU2A_aSJHAQAAAClHf9YOAAAA; expires=Sun, 19-Jul-2020 23:54:18 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; SameSite=None; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; SameSite=None; secure; HttpOnly',
  'Date',
  'Fri, 19 Jun 2020 23:54:17 GMT',
  'Content-Length',
  '1315'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/localCryptoKeyName-RS384-/create', {"kty":"RSA"})
  .query(true)
  .reply(200, {"key":{"kid":"https://keyvault_name.vault.azure.net/keys/localCryptoKeyName-RS384-/f0c41b6c9f2044d389464b77244c2a46","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"oig3VHdbmtsPa9MT_PyLxkLJohsDUaAZVcWZwOSqfLHsSbAJSZ-x5T4jTL5OId6x_bhdXrO6x0N1OtXGM_S17pFFXgvtC8udxn8bnUaua_xObJYA5TZX_MEeErTXGyjy1lFm_8sbDZGjsbXVafBq0esiEIjV6KnaCQo3Sh3BNudeDXvlau3yoyTpNxtOpeqkE3gffOEF0CQBFhlFuU3yTHcWQWfScluBQPd2M3aZdSLSVcoh7_X6D2FRBXmEBlYCGlVRQvn33UOVxgXBrD1m_wNmO9Hpty7gGYiS-WoE7DI_2aMgESjRSZFlgyM0tiCvdbUxl9XOYLvcAKESKhKhAQ","e":"AQAB"},"attributes":{"enabled":true,"created":1592610858,"updated":1592610858,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90}}, [
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
  'f8ad1133-2c4a-4dbe-baf7-3bb66755b4eb',
  'x-ms-keyvault-service-version',
  '1.1.7.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.175.226.52;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 19 Jun 2020 23:54:18 GMT',
  'Content-Length',
  '715'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/localCryptoKeyName-RS384-/f0c41b6c9f2044d389464b77244c2a46/sign')
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
  '2fe13886-53ae-45ac-a22b-b9dfb15ea0c8',
  'x-ms-keyvault-service-version',
  '1.1.7.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.175.226.52;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 19 Jun 2020 23:54:18 GMT'
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
  '1badd4a0-3f33-4978-a66d-0a8302987f00',
  'x-ms-ests-server',
  '2.1.10732.8 - WUS2 ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=Ai-2f2rqdSBHi0alma7IU2A_aSJHAgAAAClHf9YOAAAA; expires=Sun, 19-Jul-2020 23:54:19 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; SameSite=None; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; SameSite=None; secure; HttpOnly',
  'Date',
  'Fri, 19 Jun 2020 23:54:18 GMT',
  'Content-Length',
  '1315'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/localCryptoKeyName-RS384-/f0c41b6c9f2044d389464b77244c2a46/sign', {"alg":"RS384","value":"TIhkXuj1N6MQEvoRynn6PS-r6457Euk0K7ijtEDHgJoifny15et3CoFPYdEWQLXb"})
  .query(true)
  .reply(200, {"kid":"https://keyvault_name.vault.azure.net/keys/localCryptoKeyName-RS384-/f0c41b6c9f2044d389464b77244c2a46","value":"CItC8fc4t2rYRF1r5iFDBWGngTQgMGt6xRXGt4y2oVuHKOXgLHfBNmYxITjjsIyJ83SUS3PjKkG_KUbiGHkFl_XX9d_otJj1vzTjxr6GemWIsOWodJZp1Sas1i3DseQT-1ZFUcS79WutWoo0cQ60ExR9itlzX6k6-lnB1XBBXSVADuv4BklBoEx_kiN8C_1PXJ1gH8AzJ4kb8vpdTG8opJAoL1sWSsJvzXOInqdCqlmG9ZfrHYV_6rD0g0RlVZpWGFv1thxTiAPOy2SQty7-v9sJbAIphiemUox3AhagpSrOsa9bWsKzmjbahxT93cWRq6iAwVTRhc_1194VZ1EfTg"}, [
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
  '5a6c9e11-7595-4c8b-af17-a193fa2a0984',
  'x-ms-keyvault-service-version',
  '1.1.7.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.175.226.52;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 19 Jun 2020 23:54:18 GMT',
  'Content-Length',
  '485'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/keys/localCryptoKeyName-RS384-/f0c41b6c9f2044d389464b77244c2a46')
  .query(true)
  .reply(200, {"key":{"kid":"https://keyvault_name.vault.azure.net/keys/localCryptoKeyName-RS384-/f0c41b6c9f2044d389464b77244c2a46","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"oig3VHdbmtsPa9MT_PyLxkLJohsDUaAZVcWZwOSqfLHsSbAJSZ-x5T4jTL5OId6x_bhdXrO6x0N1OtXGM_S17pFFXgvtC8udxn8bnUaua_xObJYA5TZX_MEeErTXGyjy1lFm_8sbDZGjsbXVafBq0esiEIjV6KnaCQo3Sh3BNudeDXvlau3yoyTpNxtOpeqkE3gffOEF0CQBFhlFuU3yTHcWQWfScluBQPd2M3aZdSLSVcoh7_X6D2FRBXmEBlYCGlVRQvn33UOVxgXBrD1m_wNmO9Hpty7gGYiS-WoE7DI_2aMgESjRSZFlgyM0tiCvdbUxl9XOYLvcAKESKhKhAQ","e":"AQAB"},"attributes":{"enabled":true,"created":1592610858,"updated":1592610858,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90}}, [
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
  'dc4611fe-aff8-4cd7-ae4c-bd0b46523cb2',
  'x-ms-keyvault-service-version',
  '1.1.7.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.175.226.52;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 19 Jun 2020 23:54:18 GMT',
  'Content-Length',
  '715'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/keys/localCryptoKeyName-RS384-')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/localCryptoKeyName-RS384-","deletedDate":1592610859,"scheduledPurgeDate":1600386859,"key":{"kid":"https://keyvault_name.vault.azure.net/keys/localCryptoKeyName-RS384-/f0c41b6c9f2044d389464b77244c2a46","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"oig3VHdbmtsPa9MT_PyLxkLJohsDUaAZVcWZwOSqfLHsSbAJSZ-x5T4jTL5OId6x_bhdXrO6x0N1OtXGM_S17pFFXgvtC8udxn8bnUaua_xObJYA5TZX_MEeErTXGyjy1lFm_8sbDZGjsbXVafBq0esiEIjV6KnaCQo3Sh3BNudeDXvlau3yoyTpNxtOpeqkE3gffOEF0CQBFhlFuU3yTHcWQWfScluBQPd2M3aZdSLSVcoh7_X6D2FRBXmEBlYCGlVRQvn33UOVxgXBrD1m_wNmO9Hpty7gGYiS-WoE7DI_2aMgESjRSZFlgyM0tiCvdbUxl9XOYLvcAKESKhKhAQ","e":"AQAB"},"attributes":{"enabled":true,"created":1592610858,"updated":1592610858,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90}}, [
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
  'faf11101-a730-4cc3-9b95-4b5a94134587',
  'x-ms-keyvault-service-version',
  '1.1.7.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.175.226.52;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 19 Jun 2020 23:54:19 GMT',
  'Content-Length',
  '884'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/localCryptoKeyName-RS384-')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: localCryptoKeyName-RS384-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '109',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '7a2de125-5b86-480c-b038-6fe90081dbd7',
  'x-ms-keyvault-service-version',
  '1.1.7.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.175.226.52;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 19 Jun 2020 23:54:19 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/localCryptoKeyName-RS384-')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: localCryptoKeyName-RS384-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '109',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '68024181-fb14-404f-8280-077ceebe880a',
  'x-ms-keyvault-service-version',
  '1.1.7.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.175.226.52;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 19 Jun 2020 23:54:19 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/localCryptoKeyName-RS384-')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: localCryptoKeyName-RS384-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '109',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'e69eab2b-e9be-4ba7-bfaf-b45400bf3f16',
  'x-ms-keyvault-service-version',
  '1.1.7.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.175.226.52;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 19 Jun 2020 23:54:20 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/localCryptoKeyName-RS384-')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: localCryptoKeyName-RS384-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '109',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '2c1acf29-e93d-4983-9294-44a8be0cedea',
  'x-ms-keyvault-service-version',
  '1.1.7.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.175.226.52;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 19 Jun 2020 23:54:22 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/localCryptoKeyName-RS384-')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: localCryptoKeyName-RS384-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '109',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '86a9239f-b72c-456e-9ccb-2ce9d9d09bc6',
  'x-ms-keyvault-service-version',
  '1.1.7.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.175.226.52;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 19 Jun 2020 23:54:24 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/localCryptoKeyName-RS384-')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: localCryptoKeyName-RS384-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '109',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'e006e418-e5f9-4f15-a822-82efbdad3ab7',
  'x-ms-keyvault-service-version',
  '1.1.7.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.175.226.52;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 19 Jun 2020 23:54:27 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/localCryptoKeyName-RS384-')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: localCryptoKeyName-RS384-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '109',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'a1fa0934-29b3-44fb-b3b1-249a8fb998b5',
  'x-ms-keyvault-service-version',
  '1.1.7.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.175.226.52;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 19 Jun 2020 23:54:29 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/localCryptoKeyName-RS384-')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: localCryptoKeyName-RS384-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '109',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '6ff38372-80f5-4593-8e5e-537eca1154f8',
  'x-ms-keyvault-service-version',
  '1.1.7.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.175.226.52;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 19 Jun 2020 23:54:30 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/localCryptoKeyName-RS384-')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: localCryptoKeyName-RS384-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '109',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '2d8377e8-1bdb-45f1-af88-8203b4e46a71',
  'x-ms-keyvault-service-version',
  '1.1.7.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.175.226.52;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 19 Jun 2020 23:54:33 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/localCryptoKeyName-RS384-')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: localCryptoKeyName-RS384-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '109',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'b502b6c4-2930-4557-92e0-9d4e7d32769b',
  'x-ms-keyvault-service-version',
  '1.1.7.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.175.226.52;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 19 Jun 2020 23:54:35 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/localCryptoKeyName-RS384-')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: localCryptoKeyName-RS384-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '109',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'fc2e6774-0852-4d5a-832a-e8384eeb2230',
  'x-ms-keyvault-service-version',
  '1.1.7.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.175.226.52;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 19 Jun 2020 23:54:37 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/localCryptoKeyName-RS384-')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/localCryptoKeyName-RS384-","deletedDate":1592610859,"scheduledPurgeDate":1600386859,"key":{"kid":"https://keyvault_name.vault.azure.net/keys/localCryptoKeyName-RS384-/f0c41b6c9f2044d389464b77244c2a46","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"oig3VHdbmtsPa9MT_PyLxkLJohsDUaAZVcWZwOSqfLHsSbAJSZ-x5T4jTL5OId6x_bhdXrO6x0N1OtXGM_S17pFFXgvtC8udxn8bnUaua_xObJYA5TZX_MEeErTXGyjy1lFm_8sbDZGjsbXVafBq0esiEIjV6KnaCQo3Sh3BNudeDXvlau3yoyTpNxtOpeqkE3gffOEF0CQBFhlFuU3yTHcWQWfScluBQPd2M3aZdSLSVcoh7_X6D2FRBXmEBlYCGlVRQvn33UOVxgXBrD1m_wNmO9Hpty7gGYiS-WoE7DI_2aMgESjRSZFlgyM0tiCvdbUxl9XOYLvcAKESKhKhAQ","e":"AQAB"},"attributes":{"enabled":true,"created":1592610858,"updated":1592610858,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90}}, [
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
  '67bb064a-4bcf-4a79-9d41-24c251bfa383',
  'x-ms-keyvault-service-version',
  '1.1.7.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.175.226.52;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 19 Jun 2020 23:54:39 GMT',
  'Content-Length',
  '884'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedkeys/localCryptoKeyName-RS384-')
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
  'f2b8ed0a-7127-4d18-81ad-f7b30dd8be50',
  'x-ms-keyvault-service-version',
  '1.1.7.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.175.226.52;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 19 Jun 2020 23:54:39 GMT'
]);

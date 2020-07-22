let nock = require('nock');

module.exports.hash = "e87a191d964c3983769ca9ef7e55e1b2";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/apiVersionKeyName-itshoulddefaulttothelatestAPIversion-undefined/create')
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
  'a17ba3d0-3115-4b11-b55f-df3d052ee283',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.148.129.61;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 22 Jul 2020 18:47:25 GMT'
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
  '1a24761f-b381-4feb-9572-971166c52a00',
  'x-ms-ests-server',
  '2.1.10877.6 - NCUS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AkdRFWb5q_NLj4zeIVuWMd4_aSJHAQAAAL2AqtYOAAAA; expires=Fri, 21-Aug-2020 18:47:25 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; SameSite=None; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; SameSite=None; secure; HttpOnly',
  'Date',
  'Wed, 22 Jul 2020 18:47:25 GMT',
  'Content-Length',
  '1315'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/apiVersionKeyName-itshoulddefaulttothelatestAPIversion-undefined/create', {"kty":"RSA"})
  .query(true)
  .reply(200, {"key":{"kid":"https://keyvault_name.vault.azure.net/keys/apiVersionKeyName-itshoulddefaulttothelatestAPIversion-undefined/43743bc8e13f4f2eb5f0a3ac75126c99","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"5ZRzy2WYovZfaaA3XKnsNtp2AevQutB-8SSB3F64AMCHK3oxSx-EkJjD1tEju8Q9pe2RypedS054DTKmpx8pkpMXGmN1nd7ZziZ_7fvXvIa1lZ8YuOK16bt_N1BKWxtF0Ofg8n_tygdkzyklE4F_g0guurj82dXgc2S0cMqT0rnhfcywlYF9h-sIwhrgq6ZX6J5G-YcOe9BJcFU_gJZtWwtoB_UQlZ3ivyanz-SxildbrbrzS8ZH5lhShA5I7uNJuJmbbUpZtMesMq2YcQWetuGicwQg78oo9lpiyC7teAKtCPcCvELTQ9ew1WSAEpXFRR_TfiM6qEYHljqgBYcuWw","e":"AQAB"},"attributes":{"enabled":true,"created":1595443646,"updated":1595443646,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90}}, [
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
  '38654cfb-44da-4846-895f-aace2954a222',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.148.129.61;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 22 Jul 2020 18:47:26 GMT',
  'Content-Length',
  '738'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/keys/apiVersionKeyName-itshoulddefaulttothelatestAPIversion-undefined')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/apiVersionKeyName-itshoulddefaulttothelatestAPIversion-undefined","deletedDate":1595443646,"scheduledPurgeDate":1603219646,"key":{"kid":"https://keyvault_name.vault.azure.net/keys/apiVersionKeyName-itshoulddefaulttothelatestAPIversion-undefined/43743bc8e13f4f2eb5f0a3ac75126c99","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"5ZRzy2WYovZfaaA3XKnsNtp2AevQutB-8SSB3F64AMCHK3oxSx-EkJjD1tEju8Q9pe2RypedS054DTKmpx8pkpMXGmN1nd7ZziZ_7fvXvIa1lZ8YuOK16bt_N1BKWxtF0Ofg8n_tygdkzyklE4F_g0guurj82dXgc2S0cMqT0rnhfcywlYF9h-sIwhrgq6ZX6J5G-YcOe9BJcFU_gJZtWwtoB_UQlZ3ivyanz-SxildbrbrzS8ZH5lhShA5I7uNJuJmbbUpZtMesMq2YcQWetuGicwQg78oo9lpiyC7teAKtCPcCvELTQ9ew1WSAEpXFRR_TfiM6qEYHljqgBYcuWw","e":"AQAB"},"attributes":{"enabled":true,"created":1595443646,"updated":1595443646,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90}}, [
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
  'e4b968c5-c24c-4a36-87c2-181a727b4959',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.148.129.61;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 22 Jul 2020 18:47:26 GMT',
  'Content-Length',
  '930'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/apiVersionKeyName-itshoulddefaulttothelatestAPIversion-undefined')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: apiVersionKeyName-itshoulddefaulttothelatestAPIversion-undefined"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '132',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'ca8ee284-a97f-4dd3-9b4e-bea267eb4cec',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.148.129.61;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 22 Jul 2020 18:47:26 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/apiVersionKeyName-itshoulddefaulttothelatestAPIversion-undefined')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: apiVersionKeyName-itshoulddefaulttothelatestAPIversion-undefined"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '132',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '2337ced2-fd92-436c-b29a-a126683d7f4b',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.148.129.61;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 22 Jul 2020 18:47:26 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/apiVersionKeyName-itshoulddefaulttothelatestAPIversion-undefined')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: apiVersionKeyName-itshoulddefaulttothelatestAPIversion-undefined"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '132',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '810da7b7-8960-4ffb-b018-44b68306ae86',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.148.129.61;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 22 Jul 2020 18:47:28 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/apiVersionKeyName-itshoulddefaulttothelatestAPIversion-undefined')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: apiVersionKeyName-itshoulddefaulttothelatestAPIversion-undefined"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '132',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '40acac5c-edd7-4fd8-8f82-f5d3f2bb237c',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.148.129.61;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 22 Jul 2020 18:47:30 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/apiVersionKeyName-itshoulddefaulttothelatestAPIversion-undefined')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: apiVersionKeyName-itshoulddefaulttothelatestAPIversion-undefined"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '132',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '4b386533-c9b8-47ef-b78c-531c787113e7',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.148.129.61;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 22 Jul 2020 18:47:32 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/apiVersionKeyName-itshoulddefaulttothelatestAPIversion-undefined')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: apiVersionKeyName-itshoulddefaulttothelatestAPIversion-undefined"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '132',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '0c4e136f-db4a-4c5b-8c13-2a22e532d131',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.148.129.61;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 22 Jul 2020 18:47:34 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/apiVersionKeyName-itshoulddefaulttothelatestAPIversion-undefined')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: apiVersionKeyName-itshoulddefaulttothelatestAPIversion-undefined"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '132',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'ff369330-62f6-4764-99a9-dabfe825493d',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.148.129.61;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 22 Jul 2020 18:47:36 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/apiVersionKeyName-itshoulddefaulttothelatestAPIversion-undefined')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: apiVersionKeyName-itshoulddefaulttothelatestAPIversion-undefined"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '132',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '65679dc7-98c8-423f-92f7-add24f054dd5',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.148.129.61;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 22 Jul 2020 18:47:38 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/apiVersionKeyName-itshoulddefaulttothelatestAPIversion-undefined')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/apiVersionKeyName-itshoulddefaulttothelatestAPIversion-undefined","deletedDate":1595443646,"scheduledPurgeDate":1603219646,"key":{"kid":"https://keyvault_name.vault.azure.net/keys/apiVersionKeyName-itshoulddefaulttothelatestAPIversion-undefined/43743bc8e13f4f2eb5f0a3ac75126c99","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"5ZRzy2WYovZfaaA3XKnsNtp2AevQutB-8SSB3F64AMCHK3oxSx-EkJjD1tEju8Q9pe2RypedS054DTKmpx8pkpMXGmN1nd7ZziZ_7fvXvIa1lZ8YuOK16bt_N1BKWxtF0Ofg8n_tygdkzyklE4F_g0guurj82dXgc2S0cMqT0rnhfcywlYF9h-sIwhrgq6ZX6J5G-YcOe9BJcFU_gJZtWwtoB_UQlZ3ivyanz-SxildbrbrzS8ZH5lhShA5I7uNJuJmbbUpZtMesMq2YcQWetuGicwQg78oo9lpiyC7teAKtCPcCvELTQ9ew1WSAEpXFRR_TfiM6qEYHljqgBYcuWw","e":"AQAB"},"attributes":{"enabled":true,"created":1595443646,"updated":1595443646,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90}}, [
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
  '8ac9cb96-909b-4f7c-bdc1-5f429387cc14',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.148.129.61;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 22 Jul 2020 18:47:40 GMT',
  'Content-Length',
  '930'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedkeys/apiVersionKeyName-itshoulddefaulttothelatestAPIversion-undefined')
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
  '49696cb8-1437-4a5d-b531-26978efd656e',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.148.129.61;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 22 Jul 2020 18:47:40 GMT'
]);

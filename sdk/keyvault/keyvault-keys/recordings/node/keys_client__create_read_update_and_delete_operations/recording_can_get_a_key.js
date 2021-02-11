let nock = require('nock');

module.exports.hash = "0729dd4af6973e7507214f828b4d2972";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/CRUDKeyName-cangetakey-/create')
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
  '3654a071-3a40-4e88-86c3-986095f88af9',
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
  'Thu, 25 Jun 2020 11:53:59 GMT'
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
  '6c861f74-7212-4862-8a9d-8d84f0761c01',
  'x-ms-ests-server',
  '2.1.10732.8 - SCUS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AmxSjkL5njROiX3x4aTujpI_aSJHAQAAAFeHhtYOAAAA; expires=Sat, 25-Jul-2020 11:53:59 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; SameSite=None; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; SameSite=None; secure; HttpOnly',
  'Date',
  'Thu, 25 Jun 2020 11:53:58 GMT',
  'Content-Length',
  '1315'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/CRUDKeyName-cangetakey-/create', {"kty":"RSA"})
  .query(true)
  .reply(200, {"key":{"kid":"https://keyvault_name.vault.azure.net/keys/CRUDKeyName-cangetakey-/bf4565d687aa4b0bb350d3fd9bf90b94","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"4kfeY-wcNdrbSaDV8mor-VDdp-7LRdj1jcqeDqP3Cu6tmy88-qPay4zcspbqkf4T9Z59vs3UfAEnQgwUaO3fWW6-_m_9AreDpbL6VHW4J5SL6OkPeI7Lhm6GC_Qape5NfpHvMYc4qgoNVd83uetQ3wrTjMwd21066ny5gXtBkW0ZJuieaJgUZdBKAH7NGZsA5evik-_tv4ZOBLcXDJ9UHhlmV_ZUJmVKzjj6956dfG4pXOgZfsqZbFApRgq8ElxG6RjmWzXHc22kvTVijO9ZKGTo42fqy3IKGJJqznHmhmKrNaiao0RPb9ZnIFumWFdh77TMFDNT-daqbDjKDc88lw","e":"AQAB"},"attributes":{"enabled":true,"created":1593086039,"updated":1593086039,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90}}, [
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
  'a9799e4e-74ee-4a09-8258-77c16be24c21',
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
  'Thu, 25 Jun 2020 11:53:59 GMT',
  'Content-Length',
  '713'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/keys/CRUDKeyName-cangetakey-/')
  .query(true)
  .reply(200, {"key":{"kid":"https://keyvault_name.vault.azure.net/keys/CRUDKeyName-cangetakey-/bf4565d687aa4b0bb350d3fd9bf90b94","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"4kfeY-wcNdrbSaDV8mor-VDdp-7LRdj1jcqeDqP3Cu6tmy88-qPay4zcspbqkf4T9Z59vs3UfAEnQgwUaO3fWW6-_m_9AreDpbL6VHW4J5SL6OkPeI7Lhm6GC_Qape5NfpHvMYc4qgoNVd83uetQ3wrTjMwd21066ny5gXtBkW0ZJuieaJgUZdBKAH7NGZsA5evik-_tv4ZOBLcXDJ9UHhlmV_ZUJmVKzjj6956dfG4pXOgZfsqZbFApRgq8ElxG6RjmWzXHc22kvTVijO9ZKGTo42fqy3IKGJJqznHmhmKrNaiao0RPb9ZnIFumWFdh77TMFDNT-daqbDjKDc88lw","e":"AQAB"},"attributes":{"enabled":true,"created":1593086039,"updated":1593086039,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90}}, [
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
  'c9f70c59-c071-4487-8bf2-80672b8cf910',
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
  'Thu, 25 Jun 2020 11:53:59 GMT',
  'Content-Length',
  '713'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/keys/CRUDKeyName-cangetakey-')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/CRUDKeyName-cangetakey-","deletedDate":1593086039,"scheduledPurgeDate":1600862039,"key":{"kid":"https://keyvault_name.vault.azure.net/keys/CRUDKeyName-cangetakey-/bf4565d687aa4b0bb350d3fd9bf90b94","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"4kfeY-wcNdrbSaDV8mor-VDdp-7LRdj1jcqeDqP3Cu6tmy88-qPay4zcspbqkf4T9Z59vs3UfAEnQgwUaO3fWW6-_m_9AreDpbL6VHW4J5SL6OkPeI7Lhm6GC_Qape5NfpHvMYc4qgoNVd83uetQ3wrTjMwd21066ny5gXtBkW0ZJuieaJgUZdBKAH7NGZsA5evik-_tv4ZOBLcXDJ9UHhlmV_ZUJmVKzjj6956dfG4pXOgZfsqZbFApRgq8ElxG6RjmWzXHc22kvTVijO9ZKGTo42fqy3IKGJJqznHmhmKrNaiao0RPb9ZnIFumWFdh77TMFDNT-daqbDjKDc88lw","e":"AQAB"},"attributes":{"enabled":true,"created":1593086039,"updated":1593086039,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90}}, [
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
  '544c2429-e2ef-4296-a129-0922dd4c6206',
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
  'Thu, 25 Jun 2020 11:53:59 GMT',
  'Content-Length',
  '880'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/CRUDKeyName-cangetakey-')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: CRUDKeyName-cangetakey-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '107',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'd67561b2-c7b1-4d43-a80d-d553e520a830',
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
  'Thu, 25 Jun 2020 11:53:59 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/CRUDKeyName-cangetakey-')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: CRUDKeyName-cangetakey-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '107',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '9d9251f2-e96c-4468-94a2-f77912f6dafe',
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
  'Thu, 25 Jun 2020 11:53:59 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/CRUDKeyName-cangetakey-')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: CRUDKeyName-cangetakey-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '107',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '540effe3-78fa-43db-ac6f-be0558aa94bd',
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
  'Thu, 25 Jun 2020 11:54:01 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/CRUDKeyName-cangetakey-')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: CRUDKeyName-cangetakey-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '107',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '5c6e4ad9-ea60-4c78-94f3-6304e74a65e8',
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
  'Thu, 25 Jun 2020 11:54:03 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/CRUDKeyName-cangetakey-')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: CRUDKeyName-cangetakey-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '107',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'c004716d-52ea-4db1-9a2a-0574bdf1332b',
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
  'Thu, 25 Jun 2020 11:54:05 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/CRUDKeyName-cangetakey-')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: CRUDKeyName-cangetakey-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '107',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'b2de0c05-18b6-49f0-9f47-c0e84d86a3ad',
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
  'Thu, 25 Jun 2020 11:54:07 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/CRUDKeyName-cangetakey-')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: CRUDKeyName-cangetakey-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '107',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '8619cd99-b779-48ea-97cc-8ae20f4b2cb2',
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
  'Thu, 25 Jun 2020 11:54:09 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/CRUDKeyName-cangetakey-')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: CRUDKeyName-cangetakey-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '107',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '166b7f6e-c404-426b-b2b8-a790dbc4e629',
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
  'Thu, 25 Jun 2020 11:54:12 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/CRUDKeyName-cangetakey-')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/CRUDKeyName-cangetakey-","deletedDate":1593086039,"scheduledPurgeDate":1600862039,"key":{"kid":"https://keyvault_name.vault.azure.net/keys/CRUDKeyName-cangetakey-/bf4565d687aa4b0bb350d3fd9bf90b94","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"4kfeY-wcNdrbSaDV8mor-VDdp-7LRdj1jcqeDqP3Cu6tmy88-qPay4zcspbqkf4T9Z59vs3UfAEnQgwUaO3fWW6-_m_9AreDpbL6VHW4J5SL6OkPeI7Lhm6GC_Qape5NfpHvMYc4qgoNVd83uetQ3wrTjMwd21066ny5gXtBkW0ZJuieaJgUZdBKAH7NGZsA5evik-_tv4ZOBLcXDJ9UHhlmV_ZUJmVKzjj6956dfG4pXOgZfsqZbFApRgq8ElxG6RjmWzXHc22kvTVijO9ZKGTo42fqy3IKGJJqznHmhmKrNaiao0RPb9ZnIFumWFdh77TMFDNT-daqbDjKDc88lw","e":"AQAB"},"attributes":{"enabled":true,"created":1593086039,"updated":1593086039,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90}}, [
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
  '9c74d27f-9964-4670-8f49-522eb62146b5',
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
  'Thu, 25 Jun 2020 11:54:14 GMT',
  'Content-Length',
  '880'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedkeys/CRUDKeyName-cangetakey-')
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
  'de84d530-846b-4b0d-b11e-ef68eaedc941',
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
  'Thu, 25 Jun 2020 11:54:14 GMT'
]);

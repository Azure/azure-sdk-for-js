let nock = require('nock');

module.exports.hash = "c42d92b96d6301441e574682588f8c64";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/cryptography-client-test/create')
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
  'westus2',
  'x-ms-client-request-id',
  'ecdc7feb-0414-4995-a748-5cc8321ae575',
  'x-ms-request-id',
  'a8a77594-98c7-4939-a937-9f1e67332001',
  'x-ms-keyvault-service-version',
  '1.2.236.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=72.68.182.20;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Sun, 25 Apr 2021 02:21:45 GMT'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fvault.azure.net%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":86399,"ext_expires_in":86399,"access_token":"access_token"}, [
  'Cache-Control',
  'no-store, no-cache',
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
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'x-ms-request-id',
  '295308ac-401c-43ce-8ae5-39757513d300',
  'x-ms-ests-server',
  '2.1.11654.16 - EUS ProdSlices',
  'Set-Cookie',
  'fpc=AqffGTyzoVVMvwQ2gI0u_jiS9HQSAQAAADnJFtgOAAAA; expires=Tue, 25-May-2021 02:21:46 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Sun, 25 Apr 2021 02:21:45 GMT',
  'Content-Length',
  '1315'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/cryptography-client-test/create', {"kty":"RSA"})
  .query(true)
  .reply(200, {"key":{"kid":"https://keyvault_name.vault.azure.net/keys/cryptography-client-test/a1a6ff5f900c42c0a98c3b7d2f843525","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"u8ci-JEdBk3XAkITxEH2W7pqjZBUPHOWfEYAnHk8GERRhl3OrASczMPHSqCo9qH38tRbkp90ciMYvwIBJ8wNTVvHkBBdiR394qCvorB_anC57NV2eKGoZcipY6zvdDSYTQSPbekT-Vd3kctDh9Nvsd5H3VGJD03J6mxv6v523Hl-ZefnJRWwolWL8_eD6iVHP95ID_oKjFkyhvu-CmEeSw3tWYiFncTOXeSYw37H8bZ1BHHMfAPTtPjYNKu1Vw99NqkS6swsyRvKNyal42emCUAsSGN_K50ImF4eIXrb5BBXzjwxNfX3QFZyz06n-4R9yJjruscH37TwVAjLxZqsCQ","e":"AQAB"},"attributes":{"enabled":true,"created":1619317306,"updated":1619317306,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  'ecdc7feb-0414-4995-a748-5cc8321ae575',
  'x-ms-request-id',
  '58029fce-60be-42fe-be5c-0168f6766506',
  'x-ms-keyvault-service-version',
  '1.2.236.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=72.68.182.20;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Sun, 25 Apr 2021 02:21:46 GMT',
  'Content-Length',
  '714'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/keys/cryptography-client-test')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/cryptography-client-test","deletedDate":1619317306,"scheduledPurgeDate":1619922106,"key":{"kid":"https://keyvault_name.vault.azure.net/keys/cryptography-client-test/a1a6ff5f900c42c0a98c3b7d2f843525","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"u8ci-JEdBk3XAkITxEH2W7pqjZBUPHOWfEYAnHk8GERRhl3OrASczMPHSqCo9qH38tRbkp90ciMYvwIBJ8wNTVvHkBBdiR394qCvorB_anC57NV2eKGoZcipY6zvdDSYTQSPbekT-Vd3kctDh9Nvsd5H3VGJD03J6mxv6v523Hl-ZefnJRWwolWL8_eD6iVHP95ID_oKjFkyhvu-CmEeSw3tWYiFncTOXeSYw37H8bZ1BHHMfAPTtPjYNKu1Vw99NqkS6swsyRvKNyal42emCUAsSGN_K50ImF4eIXrb5BBXzjwxNfX3QFZyz06n-4R9yJjruscH37TwVAjLxZqsCQ","e":"AQAB"},"attributes":{"enabled":true,"created":1619317306,"updated":1619317306,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  '8bd25368-53e2-4f6f-9a45-960ee599724b',
  'x-ms-request-id',
  '872d76f3-9dc2-4126-8920-488db5bc0689',
  'x-ms-keyvault-service-version',
  '1.2.236.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=72.68.182.20;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Sun, 25 Apr 2021 02:21:46 GMT',
  'Content-Length',
  '873'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/cryptography-client-test')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: cryptography-client-test"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '108',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  'b411a444-3f95-45ca-9522-6ddafb74af0a',
  'x-ms-request-id',
  '65642d12-206b-4e1e-b1dd-8ed3b75ce2a8',
  'x-ms-keyvault-service-version',
  '1.2.236.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=72.68.182.20;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Sun, 25 Apr 2021 02:21:46 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/cryptography-client-test')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: cryptography-client-test"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '108',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  '84a8dad8-f9c6-4a9d-8ff0-c4e8ac7f29b8',
  'x-ms-request-id',
  '9fc2de86-af9b-4bc3-a9f8-c3ce05c156aa',
  'x-ms-keyvault-service-version',
  '1.2.236.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=72.68.182.20;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Sun, 25 Apr 2021 02:21:46 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/cryptography-client-test')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: cryptography-client-test"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '108',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  '5ab4e82c-4524-47db-9259-bc243c3ef6db',
  'x-ms-request-id',
  '647e46f7-cd80-4cfa-a7f9-0c43c033e81e',
  'x-ms-keyvault-service-version',
  '1.2.236.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=72.68.182.20;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Sun, 25 Apr 2021 02:21:48 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/cryptography-client-test')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: cryptography-client-test"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '108',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  '02463643-5a5b-4127-8044-850d0ceb98c4',
  'x-ms-request-id',
  'd494a38c-07db-4778-89f0-ef308ea712db',
  'x-ms-keyvault-service-version',
  '1.2.236.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=72.68.182.20;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Sun, 25 Apr 2021 02:21:50 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/cryptography-client-test')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: cryptography-client-test"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '108',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  'da98c965-212c-4d0c-98f2-85105bb845f9',
  'x-ms-request-id',
  '5d64ef37-6e57-4548-b769-580879e9758c',
  'x-ms-keyvault-service-version',
  '1.2.236.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=72.68.182.20;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Sun, 25 Apr 2021 02:21:53 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/cryptography-client-test')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: cryptography-client-test"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '108',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  'b03a7a9a-2781-48fd-8904-e6f0309b0d57',
  'x-ms-request-id',
  'a7825b2d-e116-491b-a846-e63ec03d251c',
  'x-ms-keyvault-service-version',
  '1.2.236.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=72.68.182.20;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Sun, 25 Apr 2021 02:21:54 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/cryptography-client-test')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: cryptography-client-test"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '108',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  '12d3f405-8035-445f-ada7-51c621c19bb6',
  'x-ms-request-id',
  '73dfc205-4947-4958-83ee-ad16a7a051e8',
  'x-ms-keyvault-service-version',
  '1.2.236.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=72.68.182.20;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Sun, 25 Apr 2021 02:21:56 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/cryptography-client-test')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: cryptography-client-test"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '108',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  '8f5c35bd-7271-4176-87f1-2a62db960bce',
  'x-ms-request-id',
  '8a615cba-bf3c-4471-94d7-9410b28621c1',
  'x-ms-keyvault-service-version',
  '1.2.236.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=72.68.182.20;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Sun, 25 Apr 2021 02:21:59 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/cryptography-client-test')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: cryptography-client-test"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '108',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  '456e68b5-5e12-4395-81a3-89c7ba7c03a7',
  'x-ms-request-id',
  '2a19e655-70be-428e-85f7-a842a4540297',
  'x-ms-keyvault-service-version',
  '1.2.236.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=72.68.182.20;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Sun, 25 Apr 2021 02:22:01 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/cryptography-client-test')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: cryptography-client-test"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '108',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  '83eb7b88-0591-49e8-ad49-4da414912e1f',
  'x-ms-request-id',
  '09664b21-ac2f-4902-82b1-a9d1f019c66e',
  'x-ms-keyvault-service-version',
  '1.2.236.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=72.68.182.20;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Sun, 25 Apr 2021 02:22:03 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/cryptography-client-test')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/cryptography-client-test","deletedDate":1619317306,"scheduledPurgeDate":1619922106,"key":{"kid":"https://keyvault_name.vault.azure.net/keys/cryptography-client-test/a1a6ff5f900c42c0a98c3b7d2f843525","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"u8ci-JEdBk3XAkITxEH2W7pqjZBUPHOWfEYAnHk8GERRhl3OrASczMPHSqCo9qH38tRbkp90ciMYvwIBJ8wNTVvHkBBdiR394qCvorB_anC57NV2eKGoZcipY6zvdDSYTQSPbekT-Vd3kctDh9Nvsd5H3VGJD03J6mxv6v523Hl-ZefnJRWwolWL8_eD6iVHP95ID_oKjFkyhvu-CmEeSw3tWYiFncTOXeSYw37H8bZ1BHHMfAPTtPjYNKu1Vw99NqkS6swsyRvKNyal42emCUAsSGN_K50ImF4eIXrb5BBXzjwxNfX3QFZyz06n-4R9yJjruscH37TwVAjLxZqsCQ","e":"AQAB"},"attributes":{"enabled":true,"created":1619317306,"updated":1619317306,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  '395be24b-aadc-4251-8b31-99154b4e043d',
  'x-ms-request-id',
  '994d6500-b242-4cde-999b-cb0efa994407',
  'x-ms-keyvault-service-version',
  '1.2.236.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=72.68.182.20;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Sun, 25 Apr 2021 02:22:06 GMT',
  'Content-Length',
  '873'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedkeys/cryptography-client-test')
  .query(true)
  .reply(204, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  'f0b6bd30-0392-4eb8-ba73-97c75122bf1b',
  'x-ms-request-id',
  'ac40f929-456b-490f-a691-347169ba187d',
  'x-ms-keyvault-service-version',
  '1.2.236.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=72.68.182.20;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Sun, 25 Apr 2021 02:22:06 GMT'
]);

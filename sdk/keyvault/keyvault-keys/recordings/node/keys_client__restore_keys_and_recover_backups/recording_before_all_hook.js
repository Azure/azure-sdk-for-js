let nock = require('nock');

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/recoverKeyName-canrecoveradeletedkey-/create')
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
  'westus2',
  'x-ms-request-id',
  'c0a5e61e-eec4-4fc5-9d48-17b9065887dd',
  'x-ms-keyvault-service-version',
  '1.1.0.878',
  'x-ms-keyvault-network-info',
  'addr=122.58.248.136;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 16 Sep 2019 22:19:57 GMT',
  'Connection',
  'close'
]);


nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fvault.azure.net%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":3600,"ext_expires_in":3600,"access_token":"access_token"}, [
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
  'c18c12e8-2ea7-41c8-8226-c1ec70644900',
  'x-ms-ests-server',
  '2.1.9368.8 - SEAS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AqHHtZRTqO1ErjxTgT0D1Qmp4MoTAQAAAI0BEtUOAAAA; expires=Wed, 16-Oct-2019 22:19:58 GMT; path=/; secure; HttpOnly',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; HttpOnly',
  'Date',
  'Mon, 16 Sep 2019 22:19:57 GMT',
  'Connection',
  'close',
  'Content-Length',
  '1231'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/recoverKeyName-canrecoveradeletedkey-/create', {"kty":"RSA"})
  .query(true)
  .reply(200, {"key":{"kid":"https://keyvault_name.vault.azure.net/keys/recoverKeyName-canrecoveradeletedkey-/7474b94524a649d28755bd92e6282ee5","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"uMtOu5JKSf5_rfh_uTHbgIVjx9Y50nM80bkZSItc0Mbe7sBbuiffMqQC6Pgp9aM3aAWsaPDs4hLVZz61DXYsZ_uoTZC-3YybS0atjr_vI9fQb9fWlExG8GQ5rQWvjk4fMC5o12Di2DpSzk3qviTihSMHL4-_ie8LqogPBg1pdVUC6SSespdaXpFplhn_bkku2Iw-NH_BEYed9sBKOnZRrXToD6thntkGvyxhK5Sy7JP2fWjmOsZOLkw3AEp1FnDPztjnviJktk895tN1tsy9TG6KZPtOnqFMW_vcSAvsiywy9Pus8K4Y92Tds1tivdjkMVwmEoArbYt5xD_ef8jXrQ","e":"AQAB"},"attributes":{"enabled":true,"created":1568672399,"updated":1568672399,"recoveryLevel":"Recoverable+Purgeable"}}, [
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
  'westus2',
  'x-ms-request-id',
  '7f97fbf4-e5c9-4580-8f53-c07dfd83fbdc',
  'x-ms-keyvault-service-version',
  '1.1.0.878',
  'x-ms-keyvault-network-info',
  'addr=122.58.248.136;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 16 Sep 2019 22:19:59 GMT',
  'Connection',
  'close',
  'Content-Length',
  '706'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/keys/recoverKeyName-canrecoveradeletedkey-')
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
  'westus2',
  'x-ms-request-id',
  '1d4d2ddd-e3ef-402c-9b30-20227a8201af',
  'x-ms-keyvault-service-version',
  '1.1.0.878',
  'x-ms-keyvault-network-info',
  'addr=122.58.248.136;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 16 Sep 2019 22:19:59 GMT',
  'Connection',
  'close'
]);


nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fvault.azure.net%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":3600,"ext_expires_in":3600,"access_token":"access_token"}, [
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
  '09f9f762-7e96-45cb-b965-37b7f3b74700',
  'x-ms-ests-server',
  '2.1.9368.8 - EAS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AqHHtZRTqO1ErjxTgT0D1Qmp4MoTAgAAAI0BEtUOAAAA; expires=Wed, 16-Oct-2019 22:20:00 GMT; path=/; secure; HttpOnly',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; HttpOnly',
  'Date',
  'Mon, 16 Sep 2019 22:20:00 GMT',
  'Connection',
  'close',
  'Content-Length',
  '1231'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/keys/recoverKeyName-canrecoveradeletedkey-')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/recoverKeyName-canrecoveradeletedkey-","deletedDate":1568672401,"scheduledPurgeDate":1576448401,"key":{"kid":"https://keyvault_name.vault.azure.net/keys/recoverKeyName-canrecoveradeletedkey-/7474b94524a649d28755bd92e6282ee5","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"uMtOu5JKSf5_rfh_uTHbgIVjx9Y50nM80bkZSItc0Mbe7sBbuiffMqQC6Pgp9aM3aAWsaPDs4hLVZz61DXYsZ_uoTZC-3YybS0atjr_vI9fQb9fWlExG8GQ5rQWvjk4fMC5o12Di2DpSzk3qviTihSMHL4-_ie8LqogPBg1pdVUC6SSespdaXpFplhn_bkku2Iw-NH_BEYed9sBKOnZRrXToD6thntkGvyxhK5Sy7JP2fWjmOsZOLkw3AEp1FnDPztjnviJktk895tN1tsy9TG6KZPtOnqFMW_vcSAvsiywy9Pus8K4Y92Tds1tivdjkMVwmEoArbYt5xD_ef8jXrQ","e":"AQAB"},"attributes":{"enabled":true,"created":1568672399,"updated":1568672399,"recoveryLevel":"Recoverable+Purgeable"}}, [
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
  'westus2',
  'x-ms-request-id',
  '448ea940-e1de-4e8d-beb1-c26794f22a8d',
  'x-ms-keyvault-service-version',
  '1.1.0.878',
  'x-ms-keyvault-network-info',
  'addr=122.58.248.136;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 16 Sep 2019 22:20:02 GMT',
  'Connection',
  'close',
  'Content-Length',
  '887'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/recoverKeyName-canrecoveradeletedkey-')
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
  'westus2',
  'x-ms-request-id',
  '72434812-47d8-4c48-9c82-f45b685b81e8',
  'x-ms-keyvault-service-version',
  '1.1.0.878',
  'x-ms-keyvault-network-info',
  'addr=122.58.248.136;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 16 Sep 2019 22:20:02 GMT',
  'Connection',
  'close'
]);


nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fvault.azure.net%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":3600,"ext_expires_in":3600,"access_token":"access_token"}, [
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
  'c1804488-dc1d-4fdb-9c73-762147314600',
  'x-ms-ests-server',
  '2.1.9368.8 - EAS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AqHHtZRTqO1ErjxTgT0D1Qmp4MoTAwAAAI0BEtUOAAAA; expires=Wed, 16-Oct-2019 22:20:03 GMT; path=/; secure; HttpOnly',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; HttpOnly',
  'Date',
  'Mon, 16 Sep 2019 22:20:03 GMT',
  'Connection',
  'close',
  'Content-Length',
  '1231'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/recoverKeyName-canrecoveradeletedkey-')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: recoverKeyName-canrecoveradeletedkey-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '121',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  '88fc06d1-1b4b-4909-ad31-4f98abe36288',
  'x-ms-keyvault-service-version',
  '1.1.0.878',
  'x-ms-keyvault-network-info',
  'addr=122.58.248.136;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 16 Sep 2019 22:20:04 GMT',
  'Connection',
  'close'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/recoverKeyName-canrecoveradeletedkey-')
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
  'westus2',
  'x-ms-request-id',
  'b9f891eb-145b-401d-b948-2b682d162522',
  'x-ms-keyvault-service-version',
  '1.1.0.878',
  'x-ms-keyvault-network-info',
  'addr=122.58.248.136;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 16 Sep 2019 22:20:15 GMT',
  'Connection',
  'close'
]);


nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fvault.azure.net%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":3600,"ext_expires_in":3600,"access_token":"access_token"}, [
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
  '17ecb9f4-a911-4dd9-b142-11752f324a00',
  'x-ms-ests-server',
  '2.1.9368.8 - SEAS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AqHHtZRTqO1ErjxTgT0D1Qmp4MoTBAAAAI0BEtUOAAAA; expires=Wed, 16-Oct-2019 22:20:16 GMT; path=/; secure; HttpOnly',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; HttpOnly',
  'Date',
  'Mon, 16 Sep 2019 22:20:15 GMT',
  'Connection',
  'close',
  'Content-Length',
  '1231'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/recoverKeyName-canrecoveradeletedkey-')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: recoverKeyName-canrecoveradeletedkey-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '121',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  '126b1fdd-7e94-441b-8724-11dd877381a7',
  'x-ms-keyvault-service-version',
  '1.1.0.878',
  'x-ms-keyvault-network-info',
  'addr=122.58.248.136;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 16 Sep 2019 22:20:17 GMT',
  'Connection',
  'close'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/recoverKeyName-canrecoveradeletedkey-')
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
  'westus2',
  'x-ms-request-id',
  '7fc63c99-a0f3-4107-ac4a-3bba94600d4e',
  'x-ms-keyvault-service-version',
  '1.1.0.878',
  'x-ms-keyvault-network-info',
  'addr=122.58.248.136;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 16 Sep 2019 22:20:28 GMT',
  'Connection',
  'close'
]);


nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fvault.azure.net%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":3599,"ext_expires_in":3599,"access_token":"access_token"}, [
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
  '4f3dd40b-06d1-4d66-af95-ad43417b4600',
  'x-ms-ests-server',
  '2.1.9368.8 - SEAS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AqHHtZRTqO1ErjxTgT0D1Qmp4MoTBQAAAI0BEtUOAAAA; expires=Wed, 16-Oct-2019 22:20:29 GMT; path=/; secure; HttpOnly',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; HttpOnly',
  'Date',
  'Mon, 16 Sep 2019 22:20:29 GMT',
  'Connection',
  'close',
  'Content-Length',
  '1231'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/recoverKeyName-canrecoveradeletedkey-')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/recoverKeyName-canrecoveradeletedkey-","deletedDate":1568672401,"scheduledPurgeDate":1576448401,"key":{"kid":"https://keyvault_name.vault.azure.net/keys/recoverKeyName-canrecoveradeletedkey-/7474b94524a649d28755bd92e6282ee5","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"uMtOu5JKSf5_rfh_uTHbgIVjx9Y50nM80bkZSItc0Mbe7sBbuiffMqQC6Pgp9aM3aAWsaPDs4hLVZz61DXYsZ_uoTZC-3YybS0atjr_vI9fQb9fWlExG8GQ5rQWvjk4fMC5o12Di2DpSzk3qviTihSMHL4-_ie8LqogPBg1pdVUC6SSespdaXpFplhn_bkku2Iw-NH_BEYed9sBKOnZRrXToD6thntkGvyxhK5Sy7JP2fWjmOsZOLkw3AEp1FnDPztjnviJktk895tN1tsy9TG6KZPtOnqFMW_vcSAvsiywy9Pus8K4Y92Tds1tivdjkMVwmEoArbYt5xD_ef8jXrQ","e":"AQAB"},"attributes":{"enabled":true,"created":1568672399,"updated":1568672399,"recoveryLevel":"Recoverable+Purgeable"}}, [
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
  'westus2',
  'x-ms-request-id',
  'bdd72547-297e-4bfa-b62b-aaf6b65cbfc3',
  'x-ms-keyvault-service-version',
  '1.1.0.878',
  'x-ms-keyvault-network-info',
  'addr=122.58.248.136;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 16 Sep 2019 22:20:30 GMT',
  'Connection',
  'close',
  'Content-Length',
  '887'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/deletedkeys/recoverKeyName-canrecoveradeletedkey-/recover')
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
  'westus2',
  'x-ms-request-id',
  '568a4857-7e43-48dd-8bdb-455c36f2b2b0',
  'x-ms-keyvault-service-version',
  '1.1.0.878',
  'x-ms-keyvault-network-info',
  'addr=122.58.248.136;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 16 Sep 2019 22:20:31 GMT',
  'Connection',
  'close'
]);


nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fvault.azure.net%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":3599,"ext_expires_in":3599,"access_token":"access_token"}, [
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
  '9a9aa77b-71d6-4219-9617-fe873f914700',
  'x-ms-ests-server',
  '2.1.9368.8 - EAS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AqHHtZRTqO1ErjxTgT0D1Qmp4MoTBgAAAI0BEtUOAAAA; expires=Wed, 16-Oct-2019 22:20:33 GMT; path=/; secure; HttpOnly',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; HttpOnly',
  'Date',
  'Mon, 16 Sep 2019 22:20:32 GMT',
  'Connection',
  'close',
  'Content-Length',
  '1231'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/deletedkeys/recoverKeyName-canrecoveradeletedkey-/recover')
  .query(true)
  .reply(200, {"key":{"kid":"https://keyvault_name.vault.azure.net/keys/recoverKeyName-canrecoveradeletedkey-/7474b94524a649d28755bd92e6282ee5","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"uMtOu5JKSf5_rfh_uTHbgIVjx9Y50nM80bkZSItc0Mbe7sBbuiffMqQC6Pgp9aM3aAWsaPDs4hLVZz61DXYsZ_uoTZC-3YybS0atjr_vI9fQb9fWlExG8GQ5rQWvjk4fMC5o12Di2DpSzk3qviTihSMHL4-_ie8LqogPBg1pdVUC6SSespdaXpFplhn_bkku2Iw-NH_BEYed9sBKOnZRrXToD6thntkGvyxhK5Sy7JP2fWjmOsZOLkw3AEp1FnDPztjnviJktk895tN1tsy9TG6KZPtOnqFMW_vcSAvsiywy9Pus8K4Y92Tds1tivdjkMVwmEoArbYt5xD_ef8jXrQ","e":"AQAB"},"attributes":{"enabled":true,"created":1568672399,"updated":1568672399,"recoveryLevel":"Recoverable+Purgeable"}}, [
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
  'westus2',
  'x-ms-request-id',
  'a2980d1f-efd4-4c42-8701-6ce1df454792',
  'x-ms-keyvault-service-version',
  '1.1.0.878',
  'x-ms-keyvault-network-info',
  'addr=122.58.248.136;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 16 Sep 2019 22:20:33 GMT',
  'Connection',
  'close',
  'Content-Length',
  '706'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/keys/recoverKeyName-canrecoveradeletedkey-/')
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
  'westus2',
  'x-ms-request-id',
  'f79b102d-cb23-43fa-9136-ac7286182f06',
  'x-ms-keyvault-service-version',
  '1.1.0.878',
  'x-ms-keyvault-network-info',
  'addr=122.58.248.136;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 16 Sep 2019 22:20:34 GMT',
  'Connection',
  'close'
]);


nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fvault.azure.net%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":3600,"ext_expires_in":3600,"access_token":"access_token"}, [
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
  '17ecb9f4-a911-4dd9-b142-11756f334a00',
  'x-ms-ests-server',
  '2.1.9368.8 - SEAS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AqHHtZRTqO1ErjxTgT0D1Qmp4MoTBwAAAI0BEtUOAAAA; expires=Wed, 16-Oct-2019 22:20:35 GMT; path=/; secure; HttpOnly',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; HttpOnly',
  'Date',
  'Mon, 16 Sep 2019 22:20:35 GMT',
  'Connection',
  'close',
  'Content-Length',
  '1231'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/keys/recoverKeyName-canrecoveradeletedkey-/')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Key not found: recoverKeyName-canrecoveradeletedkey-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '113',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  'ad551860-28c1-4609-8ca7-684bf6f636ec',
  'x-ms-keyvault-service-version',
  '1.1.0.878',
  'x-ms-keyvault-network-info',
  'addr=122.58.248.136;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 16 Sep 2019 22:20:36 GMT',
  'Connection',
  'close'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/keys/recoverKeyName-canrecoveradeletedkey-/')
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
  'westus2',
  'x-ms-request-id',
  'd3594039-b1b9-40cc-8f60-7c7716633768',
  'x-ms-keyvault-service-version',
  '1.1.0.878',
  'x-ms-keyvault-network-info',
  'addr=122.58.248.136;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 16 Sep 2019 22:20:48 GMT',
  'Connection',
  'close'
]);


nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fvault.azure.net%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":3599,"ext_expires_in":3599,"access_token":"access_token"}, [
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
  '28a489c3-90d7-46c3-88f8-215237424f00',
  'x-ms-ests-server',
  '2.1.9368.8 - EAS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AqHHtZRTqO1ErjxTgT0D1Qmp4MoTCAAAAI0BEtUOAAAA; expires=Wed, 16-Oct-2019 22:20:49 GMT; path=/; secure; HttpOnly',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; HttpOnly',
  'Date',
  'Mon, 16 Sep 2019 22:20:48 GMT',
  'Connection',
  'close',
  'Content-Length',
  '1231'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/keys/recoverKeyName-canrecoveradeletedkey-/')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Key not found: recoverKeyName-canrecoveradeletedkey-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '113',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  'acb10e50-d7cc-40e1-91e6-0a067410f8f1',
  'x-ms-keyvault-service-version',
  '1.1.0.878',
  'x-ms-keyvault-network-info',
  'addr=122.58.248.136;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 16 Sep 2019 22:20:50 GMT',
  'Connection',
  'close'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/keys/recoverKeyName-canrecoveradeletedkey-/')
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
  'westus2',
  'x-ms-request-id',
  'de8ed6a7-6e18-4af6-a259-f143838e8327',
  'x-ms-keyvault-service-version',
  '1.1.0.878',
  'x-ms-keyvault-network-info',
  'addr=122.58.248.136;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 16 Sep 2019 22:21:00 GMT',
  'Connection',
  'close'
]);


nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fvault.azure.net%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":3599,"ext_expires_in":3599,"access_token":"access_token"}, [
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
  '8e881d8f-c64e-46a8-a2bf-2c735ef74700',
  'x-ms-ests-server',
  '2.1.9368.8 - EAS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AqHHtZRTqO1ErjxTgT0D1Qmp4MoTCQAAAI0BEtUOAAAA; expires=Wed, 16-Oct-2019 22:21:02 GMT; path=/; secure; HttpOnly',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; HttpOnly',
  'Date',
  'Mon, 16 Sep 2019 22:21:02 GMT',
  'Connection',
  'close',
  'Content-Length',
  '1231'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/keys/recoverKeyName-canrecoveradeletedkey-/')
  .query(true)
  .reply(200, {"key":{"kid":"https://keyvault_name.vault.azure.net/keys/recoverKeyName-canrecoveradeletedkey-/7474b94524a649d28755bd92e6282ee5","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"uMtOu5JKSf5_rfh_uTHbgIVjx9Y50nM80bkZSItc0Mbe7sBbuiffMqQC6Pgp9aM3aAWsaPDs4hLVZz61DXYsZ_uoTZC-3YybS0atjr_vI9fQb9fWlExG8GQ5rQWvjk4fMC5o12Di2DpSzk3qviTihSMHL4-_ie8LqogPBg1pdVUC6SSespdaXpFplhn_bkku2Iw-NH_BEYed9sBKOnZRrXToD6thntkGvyxhK5Sy7JP2fWjmOsZOLkw3AEp1FnDPztjnviJktk895tN1tsy9TG6KZPtOnqFMW_vcSAvsiywy9Pus8K4Y92Tds1tivdjkMVwmEoArbYt5xD_ef8jXrQ","e":"AQAB"},"attributes":{"enabled":true,"created":1568672399,"updated":1568672399,"recoveryLevel":"Recoverable+Purgeable"}}, [
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
  'westus2',
  'x-ms-request-id',
  '35ba12f0-d4a0-4f0a-94cf-1a041a39ff5f',
  'x-ms-keyvault-service-version',
  '1.1.0.878',
  'x-ms-keyvault-network-info',
  'addr=122.58.248.136;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 16 Sep 2019 22:21:03 GMT',
  'Connection',
  'close',
  'Content-Length',
  '706'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/keys/recoverKeyName-canrecoveradeletedkey-')
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
  'westus2',
  'x-ms-request-id',
  'a79c725b-8135-4e88-94ec-ef43b1f9c355',
  'x-ms-keyvault-service-version',
  '1.1.0.878',
  'x-ms-keyvault-network-info',
  'addr=122.58.248.136;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 16 Sep 2019 22:21:04 GMT',
  'Connection',
  'close'
]);


nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fvault.azure.net%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":3599,"ext_expires_in":3599,"access_token":"access_token"}, [
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
  'c6d33b71-f109-4844-90ab-244730a24600',
  'x-ms-ests-server',
  '2.1.9368.8 - SEAS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AqHHtZRTqO1ErjxTgT0D1Qmp4MoTCgAAAI0BEtUOAAAA; expires=Wed, 16-Oct-2019 22:21:05 GMT; path=/; secure; HttpOnly',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; HttpOnly',
  'Date',
  'Mon, 16 Sep 2019 22:21:05 GMT',
  'Connection',
  'close',
  'Content-Length',
  '1231'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/keys/recoverKeyName-canrecoveradeletedkey-')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/recoverKeyName-canrecoveradeletedkey-","deletedDate":1568672466,"scheduledPurgeDate":1576448466,"key":{"kid":"https://keyvault_name.vault.azure.net/keys/recoverKeyName-canrecoveradeletedkey-/7474b94524a649d28755bd92e6282ee5","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"uMtOu5JKSf5_rfh_uTHbgIVjx9Y50nM80bkZSItc0Mbe7sBbuiffMqQC6Pgp9aM3aAWsaPDs4hLVZz61DXYsZ_uoTZC-3YybS0atjr_vI9fQb9fWlExG8GQ5rQWvjk4fMC5o12Di2DpSzk3qviTihSMHL4-_ie8LqogPBg1pdVUC6SSespdaXpFplhn_bkku2Iw-NH_BEYed9sBKOnZRrXToD6thntkGvyxhK5Sy7JP2fWjmOsZOLkw3AEp1FnDPztjnviJktk895tN1tsy9TG6KZPtOnqFMW_vcSAvsiywy9Pus8K4Y92Tds1tivdjkMVwmEoArbYt5xD_ef8jXrQ","e":"AQAB"},"attributes":{"enabled":true,"created":1568672399,"updated":1568672399,"recoveryLevel":"Recoverable+Purgeable"}}, [
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
  'westus2',
  'x-ms-request-id',
  '24dd2a23-405a-4004-b8eb-88c1d7a219c7',
  'x-ms-keyvault-service-version',
  '1.1.0.878',
  'x-ms-keyvault-network-info',
  'addr=122.58.248.136;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 16 Sep 2019 22:21:06 GMT',
  'Connection',
  'close',
  'Content-Length',
  '887'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedkeys/recoverKeyName-canrecoveradeletedkey-')
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
  'westus2',
  'x-ms-request-id',
  'a7618353-7b87-460d-b80b-ba8e3ec272bc',
  'x-ms-keyvault-service-version',
  '1.1.0.878',
  'x-ms-keyvault-network-info',
  'addr=122.58.248.136;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 16 Sep 2019 22:21:07 GMT',
  'Connection',
  'close'
]);


nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fvault.azure.net%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":3599,"ext_expires_in":3599,"access_token":"access_token"}, [
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
  '77761cfc-4ea7-4493-9443-8e2420124700',
  'x-ms-ests-server',
  '2.1.9368.8 - SEAS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AqHHtZRTqO1ErjxTgT0D1Qmp4MoTCwAAAI0BEtUOAAAA; expires=Wed, 16-Oct-2019 22:21:08 GMT; path=/; secure; HttpOnly',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; HttpOnly',
  'Date',
  'Mon, 16 Sep 2019 22:21:08 GMT',
  'Connection',
  'close',
  'Content-Length',
  '1231'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedkeys/recoverKeyName-canrecoveradeletedkey-')
  .query(true)
  .reply(409, {"error":{"code":"Conflict","message":"Key is currently being deleted.","innererror":{"code":"ObjectIsBeingDeleted"}}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '118',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  '0b6234b7-30d3-45ec-a6ff-92f89e2653a5',
  'x-ms-keyvault-service-version',
  '1.1.0.878',
  'x-ms-keyvault-network-info',
  'addr=122.58.248.136;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 16 Sep 2019 22:21:09 GMT',
  'Connection',
  'close'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedkeys/recoverKeyName-canrecoveradeletedkey-')
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
  'westus2',
  'x-ms-request-id',
  '6140a052-0933-497a-8f4a-5e7007fb766b',
  'x-ms-keyvault-service-version',
  '1.1.0.878',
  'x-ms-keyvault-network-info',
  'addr=122.58.248.136;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 16 Sep 2019 22:21:20 GMT',
  'Connection',
  'close'
]);


nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fvault.azure.net%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":3599,"ext_expires_in":3599,"access_token":"access_token"}, [
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
  '504263a8-db81-4b8e-ab05-952a80fb4400',
  'x-ms-ests-server',
  '2.1.9368.8 - SEAS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AqHHtZRTqO1ErjxTgT0D1Qmp4MoTDAAAAI0BEtUOAAAA; expires=Wed, 16-Oct-2019 22:21:21 GMT; path=/; secure; HttpOnly',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; HttpOnly',
  'Date',
  'Mon, 16 Sep 2019 22:21:21 GMT',
  'Connection',
  'close',
  'Content-Length',
  '1231'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedkeys/recoverKeyName-canrecoveradeletedkey-')
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
  'westus2',
  'x-ms-request-id',
  '35a2487a-3274-47fc-8dc1-73a660e5f586',
  'x-ms-keyvault-service-version',
  '1.1.0.878',
  'x-ms-keyvault-network-info',
  'addr=122.58.248.136;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 16 Sep 2019 22:21:21 GMT',
  'Connection',
  'close'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/deletedkeys/recoverKeyName-failsifonetriestorecoveranon-existingdeletedkey-/recover')
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
  'westus2',
  'x-ms-request-id',
  'f3751c94-9c68-40cc-9881-9c747cb632e5',
  'x-ms-keyvault-service-version',
  '1.1.0.878',
  'x-ms-keyvault-network-info',
  'addr=122.58.248.136;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 16 Sep 2019 22:21:22 GMT',
  'Connection',
  'close'
]);


nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fvault.azure.net%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":3599,"ext_expires_in":3599,"access_token":"access_token"}, [
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
  '17f22f89-8d7a-4269-939b-b8049afe4400',
  'x-ms-ests-server',
  '2.1.9368.8 - SEAS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AqHHtZRTqO1ErjxTgT0D1Qmp4MoTDQAAAI0BEtUOAAAA; expires=Wed, 16-Oct-2019 22:21:24 GMT; path=/; secure; HttpOnly',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; HttpOnly',
  'Date',
  'Mon, 16 Sep 2019 22:21:23 GMT',
  'Connection',
  'close',
  'Content-Length',
  '1231'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/deletedkeys/recoverKeyName-failsifonetriestorecoveranon-existingdeletedkey-/recover')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Key not found: recoverKeyName-failsifonetriestorecoveranon-existingdeletedkey-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '139',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  '0372bc73-4cac-48f5-8778-12fd671b3f6b',
  'x-ms-keyvault-service-version',
  '1.1.0.878',
  'x-ms-keyvault-network-info',
  'addr=122.58.248.136;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 16 Sep 2019 22:21:24 GMT',
  'Connection',
  'close'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/recoverKeyName-cangenerateabackupofakey-/create')
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
  'westus2',
  'x-ms-request-id',
  '84c2172b-5e1a-41f5-9a7f-dc306af80299',
  'x-ms-keyvault-service-version',
  '1.1.0.878',
  'x-ms-keyvault-network-info',
  'addr=122.58.248.136;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 16 Sep 2019 22:21:26 GMT',
  'Connection',
  'close'
]);


nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fvault.azure.net%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":3600,"ext_expires_in":3600,"access_token":"access_token"}, [
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
  '50cff4e3-d66c-4b46-a821-eff261f84500',
  'x-ms-ests-server',
  '2.1.9368.8 - SEAS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AqHHtZRTqO1ErjxTgT0D1Qmp4MoTDgAAAI0BEtUOAAAA; expires=Wed, 16-Oct-2019 22:21:27 GMT; path=/; secure; HttpOnly',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; HttpOnly',
  'Date',
  'Mon, 16 Sep 2019 22:21:26 GMT',
  'Connection',
  'close',
  'Content-Length',
  '1231'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/recoverKeyName-cangenerateabackupofakey-/create', {"kty":"RSA"})
  .query(true)
  .reply(200, {"key":{"kid":"https://keyvault_name.vault.azure.net/keys/recoverKeyName-cangenerateabackupofakey-/dda180ec532344278b764d78a462231c","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"y6IND2N_NUAGDnUdUql0b6lPEcMetdKh9xaMovLwg8AnOgRgnTpEGOcJEGXWxEL63L3hNdcBGYccG-KmAv6O8J6ZJ3VOqR93YD3YAxWPDyGn2CY6Rwawo9ErAyMwQZqjQ4mERCMAKEn25B5lazehE-kCkORSdNWYDdbMBvhasaKTwFEQm2g-XEaxs47LtJmdEL4IyIAjQ_F-YXsDVuwJk_MuTj43NqXIahjMTcJy3OcIr3IkM-SQ9rExT86VZf3bgKl3hBRjARM_ZR-yofrSA7-WIhf5Yld03pw2X5rmtV1JM9H0spRfyUZvB8QhGM6Rnm2YZd4IXBdQUEIKAL4KfQ","e":"AQAB"},"attributes":{"enabled":true,"created":1568672488,"updated":1568672488,"recoveryLevel":"Recoverable+Purgeable"}}, [
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
  'westus2',
  'x-ms-request-id',
  '769c0ddc-7f77-4028-ad1f-628cf0a0b915',
  'x-ms-keyvault-service-version',
  '1.1.0.878',
  'x-ms-keyvault-network-info',
  'addr=122.58.248.136;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 16 Sep 2019 22:21:28 GMT',
  'Connection',
  'close',
  'Content-Length',
  '709'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/recoverKeyName-cangenerateabackupofakey-/backup')
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
  'westus2',
  'x-ms-request-id',
  'ec5ff520-b9f6-4468-99b6-44ba20c7bfc5',
  'x-ms-keyvault-service-version',
  '1.1.0.878',
  'x-ms-keyvault-network-info',
  'addr=122.58.248.136;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 16 Sep 2019 22:21:30 GMT',
  'Connection',
  'close'
]);


nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fvault.azure.net%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":3600,"ext_expires_in":3600,"access_token":"access_token"}, [
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
  'c18c12e8-2ea7-41c8-8226-c1ec106b4900',
  'x-ms-ests-server',
  '2.1.9368.8 - SEAS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AqHHtZRTqO1ErjxTgT0D1Qmp4MoTDwAAAI0BEtUOAAAA; expires=Wed, 16-Oct-2019 22:21:30 GMT; path=/; secure; HttpOnly',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; HttpOnly',
  'Date',
  'Mon, 16 Sep 2019 22:21:30 GMT',
  'Connection',
  'close',
  'Content-Length',
  '1231'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/recoverKeyName-cangenerateabackupofakey-/backup')
  .query(true)
  .reply(200, {"value":"JkF6dXJlS2V5VmF1bHRLZXlCYWNrdXBWMS5taWNyb3NvZnQuY29tZXlKcmFXUWlPaUl5WVdabU5tRmhNUzAzTm1Ka0xUUTBZVGN0WVRjek5DMDJaalZoWkRCaU5XRTRPVGdpTENKaGJHY2lPaUpTVTBFdFQwRkZVQ0lzSW1WdVl5STZJa0V4TWpoRFFrTXRTRk15TlRZaWZRLlg3WnZ0dmNKV0NNbmk0VzBJQ29WYlA1RUNtaVhsVTJwdzZHNmhuNWJkeWZtVzAxMTVQSWhPekI4WGx1SHpTMzRMWWNzNngweGNMVkNweXNCMmFvZ254RUJTTGM2Qmt0U3MxWEhDQmpIY2Y3TFlhSUJVSExsa0toSWFmdENuSzU3bHI3ZDA2Z1dpSU9Tdll0RXV6MFpLVkhiQTUyMTg1OWk4UGRaMktGOUp4Y0puMWhhV1VlYW5nVTdiMDFVNDNhb0p4Yk1oUUxpakNJX1BxUmxmUlI0d1NldFhidTRXNEZnSDhNSjRHVWhTUWNNUFVnQjhYNDZHZnZwMWhnOXJTcXVPYjdvRTZpb19sNmV0NkVKQTNLQ0xSZEkweG5XLWV1M0xyVUYwRFgySlJUWHVOdS10czZVNkhGNmphNVNXRjRBVzlLQU1jbXZHek5zTG5kNm1QYnh1dy5vZGM4b01mV0tHZzVnbnBDeVRkdjRRLmlzZXJWekNWaVAzeC04S0ZzYVdIcEkybUJIY0R0WU1RVkZJM3F3RUxWVTk5bUdGQV9fLWMzZXctXzJ4ZmJEV0xXd0hiTlljaFNwT1N5em9ibWoxSjI3RjVBWTBqRGJ0WTBicWF3UWhoVDJGQlJnZGs1MkFleGFJd0JSNXItenc0OVJZM1d4aldta085bFlselpRUDBTXy1sT1ZBa09CbERYcnZyUXhkWUt5X3I2TVdzWERLV1dfT24yZjh2M0R0bkc3V25NalF2QWVrTmlxN3Y2RFNKSDJVd243bUEzd3FOQjJ4UnFrZmVHZ1RCYzZBQXJsT25SYzcxeWliUG9ETHl1aW5saE5zdEJTY0hnU2hWazlhLVZkdzlyRUF5cWs5UURUUDJHd0haSnBhd3FpazluaTJRSU05NnhhODNHMmhIRV83ZTdCV0dOelhfUzhid2trVjBzMjIyc1Q1NFJlWFVKR2RXY3JqMjNqZmZDN2JQcFloV1VHNk52dXhVeER0THFEczAyYlowSm1yMnZDMFZLMVJoTmtZUWY0NVFYTEExWmd3UExtdWVGN21IWnFNb0hJN0I3b2dHVllzN3pmbDd5VVd3cXZHLS1EN280X01pTDNBczFmRWl2RzZieGl1RmZLZUlGWFZNSUFMeUVTc2pIcjk0TklZVjdyRHc1S05Rdi1rOTBqRFdWSzNrUlJhQ1VWc3ViMDZYZF9aeWVXeGxBLWhqSWZlZUI5S1dXbG41M3VpUnV2cGQyVENyQ1NaMkFFRE13V29ibm80WFJESW1oTUdJMjVFeEVpbkJHNU9vUTZGLWp1NmU2bUlfelRpaDhGdFRGS0NRcnNwVldoQ1dXNGI3b1RTZy01cTFsajRPSkliRDlzWXhBUlFxNVE1VlNIWkxOS2JhRmp2bGJZbjkyMU45ZUl5WjJxdklRc0RleHJlYl9YTEljOUdybnRiaHNUNlQtUklUSTVLcGhYVFA1M2IxSWJIM2pkWUFVR09LdTVoUFo2UGNERF93TjVOSllMVzFaQV93WjNxajFmSTg3SFhNWWJETkt3aTFDQ3JybnpSbWV3OGhpQ3ZlWjFoTWdDM291WFl6SXVTazJVSXlRcUt0dDhobVVRUy1udHRacVJjcnVabG9BdzlSRUNyX2dmSEkxZEFHcHZsbzdKTzhFUk1DWk1QTzh4TDQySUtyQlo0OTdOVWN3RkpDaXRhUFBodjk4eWg4SjAzcmRjZnJLVWVsNkJKSXZ6aW1GTFdvWVl6VWljODRsUGhVOWJaWmdMUExQdXpMTFZJWXdMOVJXWi15S0hDc2ZuT3ZRX0VGUjQtUEo2R3JUclNjaGRxQUVhRDd1ek4xUTlJVHdiaVV2Z0dWckVuUnVIai04WEpmSHcxXzd3Tld1dmkySjh2OXQ4ZFZsWGU0dHl4TlpFdll2cVE4ekg3WWNIREhqSmZ4ZTRBeWRSZ3IzbUFtd1Z0SXNhNTdyS055SEVLZXFxNFBtdVBLOTh3NG1WMm9fdWpHQXQ1NEFXb0wxeFZZT2Q3RlRaQ3FBOGJlVmhqeklXSi1ScFd6amw3SHZQYm1pZmVPWG44UWdZb3YwMGNELUZ6eUp0ZDJxZ3RVWk5LZVVSbnVoZ1JlZ1VtaDRjdTQzYktvd0ExX192UUJvc3AwTU84YUhHVFBFaEdtR2d3SkNDa2NKcjZpTUlFdXZmYXlJUFdlVzd3UE1GS0JyS051MWZMSHFrWmptOGVhcGQ0MkZSU0tpdDUxOU9aeE5pMEZ4cm9lR1Q0N012Mm9ISWlSY0J1ckJiZWd0WnYyZkE1Tjh3Wl9adXZodGU3QTRuUTh4cnRicFk3bWZONi01Q05PVzY0TGxRbGdCNFdPNkwtWUhreG5qU1hwdGYzYVo4YXVCcFdOUGQ1UEJOSHdUOFp2cWRqMHF5UUpmaWx5Mm1BRzZGSnBvZVJRVF90U0RMTVI0d3l5RV9zMUVXZDlTN0VMeHZmQmRodzBPZzhsYnRLZkM3cThNZlhYbFZDRlE0LVVUV21yN21kZF9OQWZBUGtYb3pid0FfdWNPOEI3OWJ2aWVNUUZFcW04QWFwd0lwN0ZNbjZRbGR5TnB1WVVVamNCMk14ajVueXBfbzBra2YtTGd6cFNFaDFoMFliM3F3eG9TU2hGdlU4RVBUekVvVVlkaHk2eHdFY21NTld0VUxhU2VCUlhFeDNMMXQzeUd5dWh0OWNHQlpSRHp3UkZLZ0RNeHVBN0szbDhYTVRpalJMRWVfRVBrNTlQOHlQc0pFeDZXT1NfZVJYUGNibThXX0NMSDFnWDJ3eUluMlF3SERlM2EyMWlqdW43SjdPbDB6NlhCM2tIMnNqZFlaS0ZTTTZLYkFUSzBPSTd1NFNaTkh6VW1Qb2ctenpmRENjMk5aUUJlWWZxbGgwWFI4bHRQNXphSUIyUGRjalNoN0N1b3ZOdmRmeGRrQ1FrLWVMVmwta1NYak8yalRhSDMybWc4Yi1Femhmb1g1MXdGVG5WOU5MWkRlWTFyV0JySEVMdXpJcGFOS0pwZDY3NzlDX1lkNU5IOFF6U1RhcUFDdjNid3VDeW14WXlINVVmZ25EN0hFT2lMUmVQMWt5eHFnbUMwRENHR3UydTdWY2NaSTcwNlFwaEFFRXo1eGlpdHpuanNSR01LeHFXNTZLRjlvV2YtSnJDQmhOQmpETHlFel8yMDl4OTV0OFVfWkZEaV9jT1pSaWZHQmE5dE5EV2pqQUJwSmlwQnlWelY2d0Izckt1enNCOW1oT3FJNUNqeDljSkNTRzNhbGIzSThGVmpqY1lNQnU0RUNmZGpoZUhpU2YzOTY1QlNVWDJmTDF5RTljVlFZeS1Tb3YzY1U4bXI4M1gwQjRscGw1Um1NcHo5NGIxVUo1SjhBamVGeDJIWkM2TVZXREpTZzRDV0EzTjJXUG4wUGowSXZyV1RHNDRQNkxHdGtkbk1LdlFIM0lIMUQxS3EtMUpGZl9yNUlBUmF2RS1VVVdrVUVKaXN1TVUtelFYTHZmS1k3WlZmN0xVWV9iMnB2cVZoRlNZS2xaSGw2NTcxY28zbFdQRC1ldUxRdURzSmRHRG5KT3JkcXE0QWJnbnhHODRkNWlDNGZjVW83ZTgxMzVsZDl2eElnNncwdUVuamN3QlphYzZoVUJ4QzZna2FkTzFIelNoRnZlTVRvSjVXUmI0SUVldGhzcm5XSXphdXNNOE1RS3lGSC0xcXJSRE8yVTdsUk5lR0V5Ymo4OFJkZVFPMlg3aWhEbGtMM1dDNU85cFJQVEJvaU5TUUJ1QVE2Z3NqTEVvZ0hydHZQeVRxZDhUQlA5SFJLbWx2ckdwZ09CM2hlN0tLV2twazliS3hsUmRNOEwxanZjbWFCYXU4VVM0YnZhaDczZkw0aGRFS19hZmNHTEQxeVVFUENrSmtNa05JOGJ4RGRENGl6V19hUmVuQ1ljclc4c3JMNDYxVjJhcXljTHV1RGduUGIxNjQzVTZnNlZMVUZVUTRjTkxYZ2pWZG04cUdHcmJfZWRTclZjRWxlQ1Z2Qi1SdEVkV25YT010YXprWHFGYmtOR1JFRm9laDhFV3p4MmgtTVlCSjAxQVlDakk1eE5rVk1jSHBiNnhicjFvNWJxNDB0XzBjR2YxdUxiSVZlLTBuc2V0dVRDZjBjYy1WSGF6QUJVTlBUZEhkUnlwRzZoVUxLU09nTXBtMEdwQ08xOFlGNkJGOVpKYjBaR0lUVmd0ZEtDaGVERnNyNG9FNXI3eHJmS0RrMlhNbEpXVXZkYk53WXAxd1lYbUdPOWwzZ1otY19XTDVTVzNiTERidEFMX3FoMU11cGlnM3ROOXRobkM3YUxweWRKTzR3dHlBNjhONW9ZOG1SQkR5T19lUWUtTlQtTUtvTDFvb0wxazVwNnZpV010dUNRaTVKVmMzcnBQVVR0dkN4MUhqcWU3NHB0OHJMeFROblBWdlE1Zy1sd2FoOTM2NG5LTUFGdFMwbk5Hd2NqazhYYkVCQTctQlFNTGRBNDBCNVdoV19MQnNNcHJGclp5eU5WalF4WHFNemNfd0luNk5xV2d6T2E1LUlvcWRNWWFFYWZkSHBwRVU1dUtyeWZYRWtpamRSQVo1dUxtUkdaaUNEZUxpb0QzMzBwamNMWVpnVEVNbW81Mm1hWC1Ub2FBclRhUVJlcnBkV3BtYnFnWjlyS3lUT3FuNVNRWFloVl9OOWU0czI0ZTBqTl9SU2pQQjZ5Q29fR09sR1VJanh4c1hXdmdzTDRQajFQZWNkMmNseFFkdnVBaGRLYWw3YU9EeDg1WmZod0M5WDlaY18xX2REb3FBRDBuWUhEaVlfaFhrX1FUMElBd01HOWhoRlJSenpaQ084QW01SGZUemc4MkEzVTRpLTVMazhOaVRsam9sdjZ1eU4wYmp2ODRBVW83ZnlNRDJOYjE0aTExQUEzMEFvT19pUEd3ZzVYVE9CdFpoZzdLT1FSY05CaGtNaHdmMnJlSjNOWW1SU09IRjN1czNMakw4azY0RFJnTHhyc09ZRzQ2WmlUZVFJQ1NUQmZpaElBdWNzUllXZ3JvYWlqMGNyclNvS0tyZnJETVZZcHQxaU1RbHdlWm5rVjh4aEo5RGs4LW9zd0pqcE55NGdVVW92Q25vZk9aZWd5emdYVkJwWlNoOHZsd3FuZU1oZ2d3djJNWTBzeHpGOXMzaW53dlBnbndzNzRBalZzNk9XaGRmS2xFREp0WnZCMktsNG5tbW0wa3kzNWRkaWR0Vml1WVJsWTJjVXllSjlZSHpPU09QM3lsNkh5VnJYNjVlbmhoQVNOR2NnRFF2aVBITFNxbXI3RmZYOTdYa2JjSHlPZC0xeVNLX2NiN0tLRFRnbHVmenNlTVVOWVYxRkVVc002VXhzQ3dZa0hBZ0laRFYyQTh3bl8tNUp6TGZCbl9wbHR0VkdDd0lpVjNLdmhyUTFyelQ2dmRoWXZDTlBDbHdlYldQLVo2M2hGLW56ZjJPUXZYRFRjd0MtaVhJakJtbXNfRkx4QWlFNHlmYzBpSzFuZFpkblM2TklSXzFsVUpnaFpHa1U0Zk5RR21kbm5ob2twV3MwT2Q5ZkduWVcxMUYyRUZ6REtVaWVaNUVJYVhRX2ZfdTk5RlJlcENfSzAzbl81dF93NjFYRDMzZHRzSllHVEM3MDRIM1l5WXE0X0tCNnl3RjNpZ0NqeWwxbmFVTy10OU9uZlctSmFzLUpYZXJoY3NNblpUQndyVTViYUJFV24yM0J2Ym5ZLVQ1LTVTWDNheWdwWDhONURmY3ktS3ZvZEZrVWxXdzRfOEVkekp2S3RDdmVZU1A5X3plNmN3aHFnX3BNWmJJaExJOUpXYWEtbnhIWF9KcEVJcTd2RjltVXlIVk9rMGpBS0JnN2N4ZDhPdjVhZF93bTRZeFUyTTRjMjE0Y1J3X3JZRjY1dnRpOTh2Q0dFd2l5SzNWamR0R05wNGlwaTcxSUkyY3BoZ1dCX0xrRVdJNi1sdk10SGRnSDI1Z2Q0Um5INTNGQ0dBLVNoSHZzS04ySXl4N0trVDBpRXpKV0Y4c1NNcmZGZlMwTlNSeTlHXzBBZHIyU1NrMUJxV0FyTGI3Zlp0Um9QSnBVZHU0SnpWNHVnVm1yd0xtYXZiYktWc0xjRElZNUlaZmlqM2ZRWXZlVTQwcHp4bmx3Yzk4VHVZVzdNZ2pybW42dUwyeXFQa1NITjkyLXk3bVF4Mm9vQUlOUkstcXpqS0hfd1hUVkZKNEpHMExxb2hhU2Y5cTN4YkU3N0Uyd0RzT0xwQXN5b0R1eE4xOXdlRElPWWdCNFh1UUZvT3hGUW5VMGptY2JZdWprb1VXeWNGbE9wdVVzS2hDSm5weDJSVEN1b3ZxNEx2R19IcXMxY3hjSHl1dmU3dlI3azU0WHJCaldOdnZ5V1dMUFdGUWw4V0NaMHlRbXIyZ2dsMlJ3NW9aTVdQdkdqdmM3aXk2dWdwcmkzY1BETVZZdXg1V3NidnkyMGZ4LTlHb3BJUmNLQkM5Y2VIZmlpQ2hoa3pYT1ZUT2xHaGJMUURDbHZyRzFaV3NwQlhsYXlLbzAzTjVxVG1wd0hfZGF0S1UtN0p1YTJjbktLSFAwVlo4U2RES1hDb1h1bnlnZW1vcFpTS0ZRMHBBNzViNWRoSkx4c3JiMHdCd1hSX19iZ3lMdXN1eHkwWVdocHlSaGpSSVFhVm91bjYyT19lTUNsdkVYYmlmWF9xTEY0ZHF0d3pIbUxBb3JYNkJ4SEVXc193cHIzYzFPUGgwT0N1Z0VkR3JKRXFqUVg2azhmVEpGa0RleGJhdENuWU9wWjl6NmFDUFY1LWFzYW90NEcybjJSbmQ3ZDRGM2hTM3VpMWdvV1k1dnYtUUxlX2tuOUlZNVZwN09XRURoR2NLMUJUd2hWTEVrSi03cVJtWjhLZlNOMWhrY3hFYmwzUlFDMVJIOVBYN1VGbXBsNUY1RnIzNWV5djJESHVMWktBMlYyckVYd3NmR212NjVMckdQZWpLUTF2Q0JLRFNJS2QwTHg4a3dBUUNsNkFNYmRZc3VFN2ZjR000UkQtdmxQQ0ZDWEpwMldublV1ZzZyWUdKOWpEMVdvdVI0ZDJ5aVpjMXY2anA2VlRsekJkZ1V5SnNFSHZubXVXRS1rODRHNVVHaFB4T3pfLU4zQkt6V2xJX1ppMXhEMkNjQnBfNWlxYmk5VkYzODgxT2tmUXB2VFFsQ2JIbGhhbE1HMTZDdzVvOXZqUFNuWWdjeUNCRnZkMVJhYk9wQmNieFVTTHNEWTJCeFUzMGJuOUFFV0dVdlZlb1pLOHMzMUw4NGdhY3V4V2lBNGJRT3kxcGV5ekdVOFFudzRxWjNjdkN5OGYxLTZlRVRLWE15UXhCWmU3SjZrRmRGTExfS2syaEV4N0Q4QXJ6NDJCejg2SnlNYmVRVTA2ZDB0ckVKSmtVck11S3NCOXc1R0d5bDI0WnR0eVZna0U1WkZQMThweHYzc1Ziblp3U3hya3B3MXdSNW1kN3JsYW1FZnNXbGZfNXFyWnZRYThQV2o3WDh6MWJOc0M5aFVRbm5WZ0d6dDMwbnd5cFhHcVZDTHJIdUE4N2VfQW53cDlUSThNaEdmRFdjWndPQjU3d0ZQWFRPNXFrdUpKa0tGN3JmXzhScG0wQUNXWml0MW90ZEVveXE5VU5PQ2FiZzFfTGF1LTBlZFprTzktT19EVHliUjJINFFzNG5oekdGbGRRREV5WkRFZkMxcXp6RkhPZEt2WnViWXlHek14SFByTmd3U0ZpQzg1YXRYN3hsNDVCUHUteDdrUHdRNmN5QTltRmZVSV9NODRGUVJFR2w3YXRVeXVsLWlBeDhPUy1wOHZjUGpfZWxhUTlhbEZvWkR5LVpoOEZJbmxWWVU5dWpwaDFRZTlkaVZOMVgxV2tkblg1SlJaZnZzYWwxaWJzQTlqcF9UdWFiSGlSaVpRQzg0SjZyRlB4UmlmcEFrOGZxdzBtU2piTVduS0hFR3FtTDdBR0JaRk9VMWZwdC1IRkM3OFY5bjVfYVZTb0tJa3VnU2pQOTB2VThodUxxNW9IcmF5Mjg3NUJoZ01Ob0VSdG1KVnR2Z3BWT2lJU0dtdmpnb1AtRzhaWGVPMDJ0TmNyME8tQVBEVVRMeVpyZWZGRkNIUXoyLUNSSjhDSXRqUl80NmVhN3FyUHpUcE1XcmJtTDR5TjN5THZleEhxcGVjNzM5c0NfWXFWZlBsSW96MGU2aHN6ZzNtZWRiSEhOMmhsY2ZoWGR5OU5ZMkJkZ193SlZndDZRek13bVA3T24wWnp3bF9sWTJ3MUJKdGlocGdaZ2JqOTdGMGwtci1MYUw1YmJMQ2NScHJjUkoyNGtFdEN1N3ZpS0tvaU56X3ZIbTJYMWJaRVMtOHBUSl96MGgxTkY2WG5WM1V3QVJwQi1pT3RUYVEzb25tUXpJcXhfTEd6M1Vrb3pfOHVGWW0wN1VUZEc3cHI2QS02NGNNMVY4Q2ZJTVNnMG9Ma2JzNDZ4TTc4Smh5U0JIcDZoT1hleUdrb05EQmt5Tl9McFM2UzJlSXhVSTl0VjZCNmZ5RUJQbjg1S1hWXzJtelRvSXRIU2d6NUNPQVVTWGpCb09UVHJEa1RzaG1mb2pXRnJLNmZaU2lyV2w1Z0s1ZWExV3Zlazdpc3JrbFRCaHVpU3lOZjVUM3YzX0VzV3htSnIxeGJhRnFKLUIxaHNtUk50X2ZLN2E3WHNWV0g4RDVoN3ctUTdBMmdDY2RKNERxWWx1TjUydnVZZzlON1l5bFlrSlhYdGFhZm5oUFZ6c2FVTWpzTm9tS1RhNUJYRnVVS1VYdnFYMkZ5Z0xLQkxCejk3ZkMwakxTRjNLLW5ha290V094aEdZTzcwajdUaUtaQmI4MnJYNjFDLVFHM0llMFZmSkpMTjVlTEdHZnp2ZlA4bmx4b05udGYxaFJkamFoOW9takRUVm9XVHh3VExSLTNzeDUtWHdjV21MQjBGZk5MNFBBRGRJQ05TTjd0ZkRhcGpROGgzOHdtamMyZjlzQVduSDF3NEU2cS1oSGdrOGxPM1B5SjM3SEF1NDM4OTNyeHlPRDUtNUlvUW9JV3VKZFRtODhCbGRxQ2F1RmdRU19aTFBGeFl6SVRadWpIUFJ4ZmpWVzdna2xzWU1HVThjZ2hqNHRBZ3lsZ2J5cEsxOE9SNEJOQlczSmc2VHQxQW1wN2FjdDFUNDh1UXNyVndoSVlHSndQS2dVd1RVeGVRZ1lNdmpyRzJrZTJDdjRXa3NkVEkwVWNob1JsOHNVOG5odmU3VnhTWExwb05ETUJLaE5xX2liNjZvZ2dYXy1YaktFZFdQY0FRVy1DaEdVMTlLYUNBbEI0YlhDWW0yQXA0UWswbzl2VTRiOGliNjNQZkFZT3lmdU1DOEI0VmI2LW9uazQyYjNydXBQSVV2cE5STkNZTzJ4Y1dnblRiWEhXc2VwT3ZzWUZOZ0hKdEw4b3RkeGtsUzRqR1VaVTFrcUFKOHdBbFQzcWgyeEh4aHFHT1JrS2xuMXBvR0pPOFdMVi1CVk1rOHRLTUJGUHgwQWV0M0VTaXVYX25SN2VwaVBsV1lsVXBjTHJkWGpzekVmTDJlT0Z0V19BZWxLTkZ4TlFXb2d3ZGNOM3BNZzlSc1FsUV9PNWlkT1dqUU9XYU5kbWFyRV9tdkNJRWxYR0V4ZjY1RDFISHhxYTVBNEtTOHhKMnNYOThNcTg5b2E5S0llUUtzNUZrOXRVb3BvYlpLdmVSNmNHMHcxaTdRQ2wzcHh3MW1QTHFFRDJud1VvVDBINUhjU3IxYjZBUS1xNTNzQkVPTGZQT2lKVjg3V01nQnJzR3VieDJYemNFSkRNQXdEcHNKc3A5VGRmS1lBOHpNN0U2VmFyY3dMeDJLLVdTbzlqcm11aU50Z2RkYW5KaW1JMGFIbTREQmF6RkJnYzFNYkhTaDBuenZjd3d6WG9ScmJrSDduYjd2bG55eE5WY2d2TDN3M01LU1VSQkFUdUpMa2xKX1FuZmpWajdOSHVuZ2RZRnhqaFBaWjk3Z0M1Q1pDeTdCemM3SEZzT3lxZ25rMVppRmRRUUdhRzVQV3lvczdyeTQyQ1FJYmFqQlh1MDA1b2JqaF95VjF4VGc1MTFPcXBsanNvYmxzTUMtTWhtYXNYX081VWhCaHNteGs3YTVwYXlLR3czQ0lOSEVQVC0xLVZjNWxfM2tQTVFNcjBBQmkzbWRjclpkeGxVYWVteVVZOVdkaFJTdmh3bjlnbGZLZnk5bk9rOW85ZmhWb0ItTmpRbWV2VklEOFRNdFI1LVI0WWhfbGt5MzdIMVVmd2dvQS1RZC1wMnlSbldLREVkcURQei1WaGxpY1d6elhQUms1Qkw5QlpnYV81UTBnMVMybDl4Y2ZNMFlCbG8yNjRKM2lVMjM3a3lXUnVmcEExLU9NM3lWNndTbHhTRHJoT0hQZlN0VEZQTF9pWEVienY1bVR6azFwRXppWW16ejg4NmtPbFlWVk1makpmTF9QVHpuZmdoYTRWMXkyVUZTTVpBRTNkUVVFSElST2FOalExZTJ6MnI4N2ZWazF3Y3FCMVNJb0VULUU2YzJXUXM4VExkaUZjOUFtN3VuR1lDaFpaVEFxbV9Qalk5N1F2SnRCNEZYTUJwTVhpOV9zMW1mRmtnT0dFNnl3RGdNdkRndHJrTkE1QVJJMzY5RnVySV9ObGZkakNkYnZHRkplR2pXUHVkZ2VFRDlsVWJha0ZDWlhmRUdCSGVkY2ZwbWh2Y0YwVVJOZ3RlS0FkaXFSRjhZNnYwVkVGVXlGam5ETmVGZ1hCYWpyTFRaakxJWEtjT0wtOXdtQUpka01VZzFTOFppZ2JhRERvSEQwblNsdmhpNmE3M2k0cTNnb181Wm1XRElKWktmSkdCVms2UGwtNlhVYzFXOTkyNTlwUm4tOGc4VVdPY2JIbkFZUGkzX0VWaEZJNUhUTmNkS19yUy1EWmQ1WTc3TkgxTjVDNnVUY2RqZTVldXd2cjNfTHVSRzFjcTZVT09ZNnBJSXI5R2Z6UlFha3Jtb3plWTlROW11UE9kODRjUWtWSFhJdTkxaFQtdFYyZm5OcWRKSGVOakNxSE1YSGRZYlROVnhWZjF4V0lVNHFLc0dsRTVyQmtUbVd3aFRpQ0dBR0tNVFk5ZkRVY0VaVHJvN1FKWjNrTUYwWFBVRVFYNERWdVZJSUg0a1Z6Rl95OTA1UGRIZlR4OGZ5VEMxdzIyWm5RZzVTeHNvTjBoUlItaFNJRWRFWXE2UEQ2cVVrN3lPYVFmalR2RWU3V2cwWnZSbVFQdkdnNGN3bG42cmxLdXJtNWEySGEyTG1sVFBTbXFHZjUtcUU0WDBhRHdBQ2xQODVuUGJ4UEgzVzhIb0F4NXRFWG1hb1d0amtKWldZZ0JEaXlDU1VkNXBjd2lGVWdBSjFtTFlNYl9ZNUk4R21PNnJXcTc3WE5nMXRwLW1HbnFuRGsxTk01TEdhUUtNaEtQWlljeDhCVkxpbm00MDN4TTAza01ieXpPNzNlRXozemF1MkxkYlY1Um1MZjV1cUVuNi1HalhiT0pUajE0d01RRkN0MVZHNEhCOE1sSlVfeE5fVnh3X0FtRmlfU09TWDFZQUE2dGIyRlNsZ1JlSjA1MHFXbjh4LWVoTFRTUXpzeW0yMUdmUzBEQVRGWFlNdThmZTVtRHlXTWw3Z09KYTJhSUh0RFFoZFJ3QVRqSEZLOVQ5UGZQUUlkUkdtb0tBYVJDWkpTRC1WZlpOajlNNzY4NzdUQ2ZvY2UwajN0ZmN5VDczSzlSaU04YWIzUUMxTXdISWZDQTcxYnhmUS1IVHptdGpQdFZHNm10U01iOUQ0Sk5lZXZNTl96QXdYRWZMdUZGSExXZ1JLazJzUWFMV2YxVmdMNW9lZlFoNlRIWG5pUDhaUXRhM1RQUG13Wmp4eXh2WFZXODluNENkUU9zUDhqc2V3M3NnekNzbndjQjBYNzNfV2xFdWZ2MC1rMHZlWU95cFJkNEgxd2pFZ1BILTJfS0JEQ1BIUzcxbWJoQlpTejlkT250VW9OeS0xbjVhdGJGLXNXM1RYSE0wdUVReTIzYWVWRHZEdGZlOFphRmVoQU1DVlJucGhRQTNpMElTRXF6enlIcFRPMUJTeG0zeGktMVpJRHRrSk9LSGYwVTdDVjlGS01CYVgzakg0MXBBZkFMYUM5aGowN3NNaVFjZHpqVjBabUdNcU9BekJZUU0tNGMtMm84aERtSC1GZmxYMVlkQ1h6ei13d243aE5RWGs4aVB2ZDJvREYxVWs4ZmdiVnRaUmYxb1FfTXRvVEVaek8wOXFIWWMxejlLSXl5aWRjVEk3VTZZOFF4Rmg2NlYzZUs3eExkZGNXaDMxOTB3NnUwODE0a3NOQjRXd3VYbXhSMFlHeUpqWWFNSG85VUNxQ01sLUFjV280SDk5dHdlalplUjI5clV4Y0ZwenRPMEZsWUtPcEFCYlJRZy1tXzVjTFVWNmVxQm9yV0dOQmpBZVJNeGRnMHZtMGZ1eG4yLVRQRVc5enlyTGVkbWdOa2lWMXpRbWNobHc4YU1UdWoweGlPaE5idGpGcTR4eVJQWWJZZjI0eFlveksyZE9tMndxOTFMX0pMSUdrSGYteWJNd1lrdVpSa1NWT0hTQmQ5RmZmWjdLMHZyMVlQSjBtNDAzdTh6eF9KYzJ0UzctWm9NQWJveFdpa21SSEFHTzlwclIybEJOWGZ2VEZlamFnbnFJUHJTcDl1cXZhRlNFZ2lya2t4VzE1RkxTX3pwR01xUHZQQzctLWJ6MHhjRFVySklzOVJxV3R6OGpUYjhnUl8xeDZUZlJlVWN2WHU1YXp3UmpHWmxaQVRsYnU3enNucEd5YWQwOXEwSVdkZjZ6Nm1TVWtKY0UyZ0Z2NXh0aV8tZU84OG50Tlh1VkZMaHoxdFRDZnM2eTROT2VNa1ZfcDFkSGQ3Y0V4bXU1Mi15VGx6MDlWNXhmVUdqZS1aeDlYQlEwRmNZTG9kTlZtenY1MWQ0SVQzTmpFbmpVS210RmJxNjZGMnMyYXZqaWtzTGFid3pIczFEQXJ6UE5xU1dQNFZ1dHlLbmU4czRvalZUMzYyempRUE5hS19VaC04NHJsVXBLZ1FxTWtKZHJkcVBtWlVpZ1JkWnVMVEdUTVdqV1dyZVM1QTNWZHZsWW52aXJKSzhLSEFWRW50Vkh5S19DLUNBNlVocVowVm96ZjNsWnlFcU9rU29lVGp3UnFKdy50cUkzRjkzZGozOExvOHh6enZDN1Bn"}, [
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
  'westus2',
  'x-ms-request-id',
  '175c6ef5-720b-4286-8844-855c60a5d59a',
  'x-ms-keyvault-service-version',
  '1.1.0.878',
  'x-ms-keyvault-network-info',
  'addr=122.58.248.136;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 16 Sep 2019 22:21:31 GMT',
  'Connection',
  'close',
  'Content-Length',
  '13508'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/keys/recoverKeyName-cangenerateabackupofakey-')
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
  'westus2',
  'x-ms-request-id',
  '35e66067-4824-4fe0-89e4-3b38764b770c',
  'x-ms-keyvault-service-version',
  '1.1.0.878',
  'x-ms-keyvault-network-info',
  'addr=122.58.248.136;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 16 Sep 2019 22:21:32 GMT',
  'Connection',
  'close'
]);


nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fvault.azure.net%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":3599,"ext_expires_in":3599,"access_token":"access_token"}, [
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
  'cff8a2ae-a680-4ce9-bc3b-6e22641e1a00',
  'x-ms-ests-server',
  '2.1.9368.8 - EAS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AqHHtZRTqO1ErjxTgT0D1Qmp4MoTEAAAAI0BEtUOAAAA; expires=Wed, 16-Oct-2019 22:21:33 GMT; path=/; secure; HttpOnly',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; HttpOnly',
  'Date',
  'Mon, 16 Sep 2019 22:21:33 GMT',
  'Connection',
  'close',
  'Content-Length',
  '1231'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/keys/recoverKeyName-cangenerateabackupofakey-')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/recoverKeyName-cangenerateabackupofakey-","deletedDate":1568672494,"scheduledPurgeDate":1576448494,"key":{"kid":"https://keyvault_name.vault.azure.net/keys/recoverKeyName-cangenerateabackupofakey-/dda180ec532344278b764d78a462231c","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"y6IND2N_NUAGDnUdUql0b6lPEcMetdKh9xaMovLwg8AnOgRgnTpEGOcJEGXWxEL63L3hNdcBGYccG-KmAv6O8J6ZJ3VOqR93YD3YAxWPDyGn2CY6Rwawo9ErAyMwQZqjQ4mERCMAKEn25B5lazehE-kCkORSdNWYDdbMBvhasaKTwFEQm2g-XEaxs47LtJmdEL4IyIAjQ_F-YXsDVuwJk_MuTj43NqXIahjMTcJy3OcIr3IkM-SQ9rExT86VZf3bgKl3hBRjARM_ZR-yofrSA7-WIhf5Yld03pw2X5rmtV1JM9H0spRfyUZvB8QhGM6Rnm2YZd4IXBdQUEIKAL4KfQ","e":"AQAB"},"attributes":{"enabled":true,"created":1568672488,"updated":1568672488,"recoveryLevel":"Recoverable+Purgeable"}}, [
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
  'westus2',
  'x-ms-request-id',
  '1bc3fbf4-a44b-4442-b348-82e2e91c7660',
  'x-ms-keyvault-service-version',
  '1.1.0.878',
  'x-ms-keyvault-network-info',
  'addr=122.58.248.136;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 16 Sep 2019 22:21:34 GMT',
  'Connection',
  'close',
  'Content-Length',
  '893'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedkeys/recoverKeyName-cangenerateabackupofakey-')
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
  'westus2',
  'x-ms-request-id',
  '0ed04c6d-720b-4ee2-a6ad-954ce9bfe933',
  'x-ms-keyvault-service-version',
  '1.1.0.878',
  'x-ms-keyvault-network-info',
  'addr=122.58.248.136;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 16 Sep 2019 22:21:35 GMT',
  'Connection',
  'close'
]);


nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fvault.azure.net%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":3599,"ext_expires_in":3599,"access_token":"access_token"}, [
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
  'c6d33b71-f109-4844-90ab-244768a44600',
  'x-ms-ests-server',
  '2.1.9368.8 - SEAS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AqHHtZRTqO1ErjxTgT0D1Qmp4MoTEQAAAI0BEtUOAAAA; expires=Wed, 16-Oct-2019 22:21:36 GMT; path=/; secure; HttpOnly',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; HttpOnly',
  'Date',
  'Mon, 16 Sep 2019 22:21:36 GMT',
  'Connection',
  'close',
  'Content-Length',
  '1231'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedkeys/recoverKeyName-cangenerateabackupofakey-')
  .query(true)
  .reply(409, {"error":{"code":"Conflict","message":"Key is currently being deleted.","innererror":{"code":"ObjectIsBeingDeleted"}}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '118',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  '78254f73-cf1a-4b6c-9c10-07576712b24c',
  'x-ms-keyvault-service-version',
  '1.1.0.878',
  'x-ms-keyvault-network-info',
  'addr=122.58.248.136;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 16 Sep 2019 22:21:37 GMT',
  'Connection',
  'close'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedkeys/recoverKeyName-cangenerateabackupofakey-')
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
  'westus2',
  'x-ms-request-id',
  '48a11edc-673f-4f08-94a4-9ab608080377',
  'x-ms-keyvault-service-version',
  '1.1.0.878',
  'x-ms-keyvault-network-info',
  'addr=122.58.248.136;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 16 Sep 2019 22:21:48 GMT',
  'Connection',
  'close'
]);


nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fvault.azure.net%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":3599,"ext_expires_in":3599,"access_token":"access_token"}, [
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
  '4f3dd40b-06d1-4d66-af95-ad43f5804600',
  'x-ms-ests-server',
  '2.1.9368.8 - SEAS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AqHHtZRTqO1ErjxTgT0D1Qmp4MoTEgAAAI0BEtUOAAAA; expires=Wed, 16-Oct-2019 22:21:49 GMT; path=/; secure; HttpOnly',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; HttpOnly',
  'Date',
  'Mon, 16 Sep 2019 22:21:49 GMT',
  'Connection',
  'close',
  'Content-Length',
  '1231'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedkeys/recoverKeyName-cangenerateabackupofakey-')
  .query(true)
  .reply(409, {"error":{"code":"Conflict","message":"Key is currently being deleted.","innererror":{"code":"ObjectIsBeingDeleted"}}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '118',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  'af29d666-cc3a-4dac-8f79-9d2c32db963c',
  'x-ms-keyvault-service-version',
  '1.1.0.878',
  'x-ms-keyvault-network-info',
  'addr=122.58.248.136;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 16 Sep 2019 22:21:50 GMT',
  'Connection',
  'close'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedkeys/recoverKeyName-cangenerateabackupofakey-')
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
  'westus2',
  'x-ms-request-id',
  '9f5a1240-9da0-4ae9-8543-3acfa5869ee7',
  'x-ms-keyvault-service-version',
  '1.1.0.878',
  'x-ms-keyvault-network-info',
  'addr=122.58.248.136;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 16 Sep 2019 22:22:01 GMT',
  'Connection',
  'close'
]);


nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fvault.azure.net%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":3600,"ext_expires_in":3600,"access_token":"access_token"}, [
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
  '7ef9134d-b8a1-4214-9e33-683b7b5b4600',
  'x-ms-ests-server',
  '2.1.9368.8 - SEAS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AqHHtZRTqO1ErjxTgT0D1Qmp4MoTEwAAAI0BEtUOAAAA; expires=Wed, 16-Oct-2019 22:22:02 GMT; path=/; secure; HttpOnly',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; HttpOnly',
  'Date',
  'Mon, 16 Sep 2019 22:22:01 GMT',
  'Connection',
  'close',
  'Content-Length',
  '1231'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedkeys/recoverKeyName-cangenerateabackupofakey-')
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
  'westus2',
  'x-ms-request-id',
  'ecc28bfd-1621-4de2-97bb-91cedfac5722',
  'x-ms-keyvault-service-version',
  '1.1.0.878',
  'x-ms-keyvault-network-info',
  'addr=122.58.248.136;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 16 Sep 2019 22:22:03 GMT',
  'Connection',
  'close'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/recoverKeyName-failstogenerateabackupofanon-existingkey-/backup')
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
  'westus2',
  'x-ms-request-id',
  '04c7b646-96d6-4e32-a53f-693ae71e5679',
  'x-ms-keyvault-service-version',
  '1.1.0.878',
  'x-ms-keyvault-network-info',
  'addr=122.58.248.136;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 16 Sep 2019 22:22:04 GMT',
  'Connection',
  'close'
]);


nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fvault.azure.net%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":3600,"ext_expires_in":3600,"access_token":"access_token"}, [
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
  '8e881d8f-c64e-46a8-a2bf-2c73d3fb4700',
  'x-ms-ests-server',
  '2.1.9368.8 - EAS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AqHHtZRTqO1ErjxTgT0D1Qmp4MoTFAAAAI0BEtUOAAAA; expires=Wed, 16-Oct-2019 22:22:05 GMT; path=/; secure; HttpOnly',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; HttpOnly',
  'Date',
  'Mon, 16 Sep 2019 22:22:04 GMT',
  'Connection',
  'close',
  'Content-Length',
  '1231'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/recoverKeyName-failstogenerateabackupofanon-existingkey-/backup')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Key not found: recoverKeyName-failstogenerateabackupofanon-existingkey-"}}, [
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
  'Server',
  'Microsoft-IIS/10.0',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  '51cfa50b-8774-4d24-b8b7-778a719eb539',
  'x-ms-keyvault-service-version',
  '1.1.0.878',
  'x-ms-keyvault-network-info',
  'addr=122.58.248.136;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 16 Sep 2019 22:22:05 GMT',
  'Connection',
  'close'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/recoverKeyName-canrestoreakeywithagivenbackup-/create')
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
  'westus2',
  'x-ms-request-id',
  '3aed2345-c3e1-43f1-9ee7-da86a1c0c6ab',
  'x-ms-keyvault-service-version',
  '1.1.0.878',
  'x-ms-keyvault-network-info',
  'addr=122.58.248.136;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 16 Sep 2019 22:22:06 GMT',
  'Connection',
  'close'
]);


nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fvault.azure.net%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":3600,"ext_expires_in":3600,"access_token":"access_token"}, [
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
  '09f9f762-7e96-45cb-b965-37b79bbf4700',
  'x-ms-ests-server',
  '2.1.9368.8 - EAS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AqHHtZRTqO1ErjxTgT0D1Qmp4MoTFQAAAI0BEtUOAAAA; expires=Wed, 16-Oct-2019 22:22:08 GMT; path=/; secure; HttpOnly',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; HttpOnly',
  'Date',
  'Mon, 16 Sep 2019 22:22:07 GMT',
  'Connection',
  'close',
  'Content-Length',
  '1231'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/recoverKeyName-canrestoreakeywithagivenbackup-/create', {"kty":"RSA"})
  .query(true)
  .reply(200, {"key":{"kid":"https://keyvault_name.vault.azure.net/keys/recoverKeyName-canrestoreakeywithagivenbackup-/51c3744aa3c746d1b71070b909d29d6c","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"0B4rxsqzT_PSoJq8ldR8FHYXWHzKFj6M2r0ylvJgkBUAVQCraqTtH5RW6BQ6Km3Gu-jwXh2WW2eFmCz6qafO2pqp2Dy-QDE2gIZT6aaZGaWz_JNiiIakb_1jIYSGMqYaJlrcvgaraX5sAfHUm0cxm4EbVnvXRFWtFs7_qBKu3P_oamOyS_gSjsbOsyiDjcHRAtBD2TnLYjSYKeUbazRTmvZOcuFTYK4_-8b6Q9j7bqQwKpsbT6bB4B4DlI_CkxstM-d4LPtF2F5G0ejnMJcPAfEaLP_7cgT2gdKecCT1by4DVyTkekF6Ce16QqxOrsR4CIdqgC7TBgTBwWvyUa6baw","e":"AQAB"},"attributes":{"enabled":true,"created":1568672529,"updated":1568672529,"recoveryLevel":"Recoverable+Purgeable"}}, [
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
  'westus2',
  'x-ms-request-id',
  '253573e1-8c3f-4d84-a19e-f7dd1dbff7a2',
  'x-ms-keyvault-service-version',
  '1.1.0.878',
  'x-ms-keyvault-network-info',
  'addr=122.58.248.136;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 16 Sep 2019 22:22:09 GMT',
  'Connection',
  'close',
  'Content-Length',
  '715'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/recoverKeyName-canrestoreakeywithagivenbackup-/backup')
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
  'westus2',
  'x-ms-request-id',
  'b8a5b4cf-ecc4-41c3-880a-b7b8823391a9',
  'x-ms-keyvault-service-version',
  '1.1.0.878',
  'x-ms-keyvault-network-info',
  'addr=122.58.248.136;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 16 Sep 2019 22:22:10 GMT',
  'Connection',
  'close'
]);


nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fvault.azure.net%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":3600,"ext_expires_in":3600,"access_token":"access_token"}, [
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
  '77761cfc-4ea7-4493-9443-8e2471164700',
  'x-ms-ests-server',
  '2.1.9368.8 - SEAS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AqHHtZRTqO1ErjxTgT0D1Qmp4MoTFgAAAI0BEtUOAAAA; expires=Wed, 16-Oct-2019 22:22:11 GMT; path=/; secure; HttpOnly',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; HttpOnly',
  'Date',
  'Mon, 16 Sep 2019 22:22:10 GMT',
  'Connection',
  'close',
  'Content-Length',
  '1231'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/recoverKeyName-canrestoreakeywithagivenbackup-/backup')
  .query(true)
  .reply(200, {"value":"JkF6dXJlS2V5VmF1bHRLZXlCYWNrdXBWMS5taWNyb3NvZnQuY29tZXlKcmFXUWlPaUl5WVdabU5tRmhNUzAzTm1Ka0xUUTBZVGN0WVRjek5DMDJaalZoWkRCaU5XRTRPVGdpTENKaGJHY2lPaUpTVTBFdFQwRkZVQ0lzSW1WdVl5STZJa0V4TWpoRFFrTXRTRk15TlRZaWZRLklxbDlMVHZvaEJpcHptc3JmYVYzTUlManhSVk0yekVkRDd5V05sUUUtdXRMOVlPaWJpbmxlSzhnQWpsT1d0WXpKYmJFQU1hVmJaaTBoN0dUUzNYN1NJekx5bWI4MDhXYVlCaVc2M0lsUWdxUm50YWV3RGxRQVNEaTctTWp3N0lCR0lyUTE5TW16WmF0ejZ5WHFqMEl1S0pTX0Rrd1NXOW5sRzdySU9kQ2dCTUJmVl82dWxZbXc0N1JtLUZNMVljMHoxNXp5WmEtSGc5aFBNTEh3cWd2dUx1YzdPZXh1dm9tTVJ0T3JaUmlOdzNraWhtVnJCNGE2SUt2bEEwc1pHMktURjJQWGcxRng5TVlaTFliWkh5Ym1pZlEySUhVdnBrMEVCZ2dwOENHLVltNlk2SWVvSnEwZlJFVWFZdVQyRnZIN0NtOVZzLWZneEIxZlBwQUt5RHppUS5lSVVBaXNoTmV5X1h0Tm11cU9pOVpBLm9aMFNvRUFab0dwSEpRcEdqNHhnNGo0S3lOdi1mcmt3eXh2QlB4U24xRkFIT2ttMlRRdjJ1TFBCaHRiUUZ5ODViUXJuY29lXzFDZThDdXlPcUxIYndoakJSVmZ3R0lxV3ZBWW82UW83NTF2WUxncW5taTFoUFctYUFfeWF0Q3g2VkpQMXRuNS1rdmlaT0hlU1E0WnF0R0d5VV9jWkdMY1ZBaWtMUnRxQ1FTeWhYLUtsNmJlWFh3TFJUa3IwTmhwZ0xvQmJ5d05mck04WHRBbEZjUS0zVnh1NGo4S3RHRHBFenh4elhhRHpubVVELU5rMDEteVNRSGd3ZUFOWVh3ZFJNdzFfRFY1QzhUOW81ZUxLaXVZWHA5TGs3RkdrZUJOTWNKaVRjSEh0REU2VTlxVVNMYVdzNFUwcjliMGJQT3lWT0xfVWs4YzRaanBxSm16Z2VGVzdVZzBjZ3RDVFdsY2pETDNKWjFoMk5GdGJwLTNxU2k3c0VrRUZVaUUwSVAwUWFUWV9hWFZRU0JrOUZpUFBwTnJQUTZwbGlWYkEyVzdJekRrM09TRGdLaU5DUjgtb284ZzdEeGtOay1RVURkdHVaM3JabV9VeTY4clZYYl9ET0xlNkxFTTEzU1B2MzR5OGxzWW9DRnVRUFA2c3cwRVRwZ0FScWJBRnRVR19PcWJKVmlrdHphODc3THZ2NlQyblRrOFBmY29sbjJNNmZmNnhUd0k3S2pkZVFoV3g4MldhZDVVVlJGcVlqd3UzQ3ZPZUxMSWtHb0wwS1h2UlY1ZllaRlFjOGtvLVZIYmlDVHk2Y3ZUU09uZER2Nmd3Nmsxb21aODRNQ2RfZFNnSHlCSkRzTFdXWmt5Nm83RlU1bTJGclRESzdCSkxTejBldGg5VjNEdEVTRGpjYkY3elBQZ01lLWdJWDNSRVRUbm0wLUZWX1cyQWgzUThmY29SUDBJMW9TMG9mdkR0dVlkSEpMQkd3VE92YjhkTUxUVGN6OU05QTd3clZqblNNbHZfekQ1YTZKQWtEdXdOS0VTVW8tNHItUVFsVGpMVTI2dWlBdWpuVkNxNVJNYjkyUzg3UzAxTWxwblBuM3JlN01sWDlWVXhzVmNVNjExT2JvN05qUzlIOHQwZC1iRFlKY19KNUE5S3pMZjlMQkVKWjl0X1JhSThXcDl6MVE0UXB2UlFaVWw1cnZfRHZ1UHRVbnU5eTI4S1dMTUJHN2VSb0xSMEFjWkxQWWNydEdsQkxaRVV6NFpMR2JVVXhwS3ZTazQtQjllS1RuZEpfenZUTUVUTDMyLXk4bVlONWYzVkEySHpvTnp3Szl0SXByMThkN0w0bHBQS3FSRWVJMU5wd1JwUTZHcXpLeVliRmZTRHFSbVZYUmhtYnFDdGxxelBDLS1PZFRQU2ZWSWZJWmNuZW9MTzhUWVMxbVZHZmV6ZXI5dHZTMU12WFhCUl8zZUFpU1JSbjZzVFdudG4tQ0F6TUp1VTNZUDVkcjdoUW54b05LM0hGVTRCQWtKUUpmcDdlejg4eEU4YldVQ0F3MzVSNDF6YVM1ZjlJSE0yOTIzVEdEZHgtY0QzT1NxY1JyRW5KR0R0UVl2OWZvWVJQUGsyRnhlUVpUekpXaXRTZmpkZXdhVndTQWdseHFDSVNtZnQteWs5V3ZjOE1jb2RuMGs5N1VpUzVqaXNjVG1paDRIYVhVUkxrUUN6Sm5aRFpzMWY3VDdHNFBlbnJCZ2Q4Q28zdkhGQzktRXctaVdOeElseHBCTFhva0lzMDMwR1ppa0pEaGJhRXVoQ3FCZmU4V1NORUttbmhlYWFmc283WVoyc3otTDJTUHRsY3RYc0tJUXF3bEVicEh4Sm1WdzIyWW5IbHR2Rm9BY19tOEJZUzdYS1gtbmtDNlNtdTdZenhNc0FsZ2drY3QtdXFGNTZNMVZSWkRfU2dCRkJXTW1wLUU5R0pVbXRuZGNlc09SN3RyTXhGd2w3Tm9zUjBHc3hyRXRRQTQtVGtFdzVWWktiQVFLNXloZldVM1BIdUNSQXFKaGdPankzOXVSSmcxak55eTcwd1diXzFTTmpBeXdIVG5ZcFhXd25ueW1pUnVRYUtBQkVWMG9UQ2dueVRseG80UmZjMXRBXzUxbGstMExtRkRWV3VlTGRBNjQ0U3VtTE9ia2U1SGRTR3FmbHFpUjJ6MTJaekVBeG9KdmliRUNkTmFXUXNGUWpQRmJtSFN4UGlsQTE4WXIzODctT1g1dEc4ZFlSVFpjVHBGRnJPWGpDVVNPVm5YU3F5cmxvWVJIbnQzRVgzSGFkbElnQUtLVFd5TmV6WmUtZE1LMnJ1MTd2eTdMbGpsTDF0OGpoRTh6d3ZILWRjUkZsX0R5eXFGY005LXMzempfM2lnZGdzUklLRV8zdWJyekJvdGJ5R3hBUm9mTXJKWU9TSmdTelZWSzdySVZuaXo1TEpQTE0xanNIUVBDTFViRmhZUXBDRXZaQzFqR3FKbHBFQmtFQ2hhWll0cDNDVUJ1QU5DTUtUN3hrbkdmcW02bG5SZ1FDWV8zSUFvcWVqbWZVTGROZ0ZROEptTldNZ0Y3MFdOYXo0aV8yNVNLclZ5VWpGSUxRQkNHTUJ6M2xGanRFUXM3anZ1UktqUEREc3VVWUVUSGtDeTNQMnVKcFpnaGdnZ2tVVVhyNDNUMU81N1JydktVZXkwQ09Yc3FDeUh1cEY1ZlpuUkQ0YlhmZldrZldCQVpYUkdrMXFfRUFTVFpxQnRQS2Z6Wmo4T0lrT0FvWkVPSV9saS10N1JnMDBJVGRFSENJT3RsYjJYY1JBSzRuTVU3RVlOMFE2anJVT0dReWlaVEowNnVhQ1Q4MlFEZm9KOENXWmNIaGZoUGZlODBmTHZXLU1LTEZLY0p4bVZ4eDhTWWhwa0xUYUgtdERoQVJJdmFzWHlvRGdob05EYjlZOXFQRUZjTTUzbkJKRmdTZEVpUFZLWHQ5enQxMVM3cFVCamN3NkI0SFEtRGFPUk5XVUphLXlsbTFBbnhQWXo3SHRURFVWMXVEeXQtM29rSTNXTzVyWnNhMjdyVzZ2RXBPVzM3VkptU1VNQVdWWFNpSkpLRTdXNU1XeXdkdmdlbFQ1SXhFeW1BT1pkaGFvQmI3cFNoMXViSDNjOUNKX2lsOV9tSnZVVTNLNTBoVkJOTFQ3MjZ5bFNLaVNxM2I5RlM4Si1ZSV9TVllsNUpSX3NHbS0xZlRrSWRyQmtWY1BJR0lJQ1F4c0t6SjFCNHpOSnlBeFRKSmFaV3h2djU4eTFSMWdiU3VzNV9mQXVrZ2hrMTl5b1l0SnlQalpWYjRZYkg2UHlKakhOVWQxcXktLTdtajN6X3NIMk5sSkdIWG1ROXUzdHhTNmFfWERQWGhpQXJVTDU3S21wdU90MWgyNjBjbDVVRm5QLW5CRnpsVHpyWlV0M2pfeEt4V1gtcU1nMWM2ekhEOTRVbVQtT2FJUzNabVJIU0ZyM004WDcyaGZnVktBaGlqendtOUZZRTVOaXk4cmJkeHExekMwU3RlTi1YNm5BakNwNVUzME12VXhMSlVlbjRVSktGZ3hraXNQYTdCeUlrT1p6emtTWTJveldUcjlCTkpLWTJIRWI1LVBsWFlfaDBjZHNueXg3SExFMzB0aVFvUG1RNzB6dTZNVXhObGpMX3BGaWplbWpLbnlSd2xySmhybTN6cWxUdGgxQnliYlR5ekw3WHVVd1UyUkRuWV9HNmJ0MXFPNnIzVENyNjIxS0VYY2FSdEhaUURKVmRrWndFWjNXdGV5OWNHcDB3ajlOMFhLTV9fZTJRS3JtQkpwWnF6WFV2emgyUjY2QmczMVBTTzRoWDdkeGFlMmlIZTZBTmxvMnpUT3lOeVVmM0k1Y2d2MG5rZ2J1QkVxSzdNbzZKRmlxMEJxS2dRc19NSTg5bEtFOG1nZ2wtcERMVzJLU3QyRk9YeUxKcV8tc3JfaExwQkktaUhJbWxlV0FwLTdhTENBRDRkWWRHdXdoTEJvRmUzVlhTcTRnS045SWwzWF80TWFnMVpLVGs1cmVacy1PY0lSWDZYa0RRVmgzcGtEWkhjU25IdTJldExJMTZSSnNFQzVZVjJzUjdFWTgtNWNZY3huNEZDYW9wNVZ5UmItekRuX0tLaHZaOUsxRTV0VEFUeDJSUVB5MVNiMW5paUNuRkU0Q05MdGtXMlZRU2RZNFYyMjZYcHFsWmJ0NTZSTHBnaXNQQjJPRzhBd2NpY1phS2dwc3hLcmt5cTAxVjlpYkJsZ1dGb205a0tSU0hZRlFCX2RrMVpmblB2LXVXakR6NjRDWjlPUjJpYXI5VU1odkJNeklSdlk0UkRVMFRHZFdoa3F0eXlGS21CZEdWd3pleTFFekx3WFZXTEc4UjJySjlNRWY4LUZOVXdRcDZKVmJ4clpmSGZXOTlpb0w1SEVqQ2hwRU1lUkRfdmNRYUgxWFRqbmZ1RE5wVk1OTjBFWEs1MnlyV2oyZWN5VDhiWU94cU00QS1hbkdidW94aXc3NGxtMjh2eUJoMzd4UzM4RHhxX1JlWkJQdi03QUR3TkhnQy1tQlRyM3E4R1dBaURuMjZleEtBZDdHQUhPOXZFbHJUR3lkRktsSmVTZDJydllUd05NYXJ1Q2JfSXRwNlAzc3VNUF93V2R3T25RUEFMTVNsbFRYSHgxS2luelB5ZjYyRWltNlB3TGVJNVZEWnctYjZFakpzOWFReXgzNEFxNFlWN3l2QUVKTndWQnBSWGJaUkMwNERLN2poQUZhblZ4dDE3VmZJU1pnZlJjdDdnM2pKOTVISkRtU3k2UGpadVlXV2FzT0R3c2k1QnJFNFhITlFJbkFPd2FTVGh0YlcyQ3hXaGJ6dDA5RVdsRDRNbW5TRFpVdTNFbllCcXozYnE2bWNaOVVQVFpBc3VaRnBNX2NQWFhRcGJCeXJjd0tnMzBoWENZU0J4Q3l5VkMwd3lKTWRzVDYwRVFaa0Jna2pKOEYtMFRMTXU0bnVtZllWTGluRkw1RndnbHhCUGptd0htLVBaLWQxUXRzd3d2c2FpS2JEaVJBZ2tqMmJyMHZXNnFLWXJkNUNpOHJjcHVEMmFtTXprRTgxRFh0aW83cXR4U2xBbVhsaWFLVWNRTXlDQTdkM3RxLS1qV2QyU3pSVlBLbGlRWjFHdWxXeGdkS0V2ZENrNlZ4ZGJiTXNFM1d6R08tOUVWZ3RUbm91dG9ieWxzd0pzRHA3SWdfc0h6MTdyelhzUUMwVG5VT0k5SUlicGpGYXNhVnA2NlI1LWFJZXF5UUpGR1RCODA1ZDRPUG44akwwRDBxU1JWamNwM05qSERmR2p5ay1VeHVUUTY4dlVub2ItS003c0pLREdzazQtMDZYX1d5dTduM0dfSkc4RzdsX2lwbWxUc1F1Tk4yUmVZRWVucXBsZ3ppLWFhRkNYTjd6N3NpRHNTbVNxRWlSckZFc0pqems0WVltdEVZc29lLTQwNkZzTXllVEVZLWtqTXNzSlZfSVloalpET2dTQzNJdV95cUZoZlVaRmd1UkNGOFNqaUVDN2VVTXRMZGphN0hCajgxQ25kbnBTR2lfMU5IV3ZONkhyZDFnaXNVM1RETzEyVjdkRWRNOWxhbmRYRzdQTy1pQXp3T3hLSUpEakxQaE1SeFoxT1RkTm5pSFlwaVdpQzViWmZmUkRraG1icnFudl90RFg0QXpSejJTblhXSWRSSGlnMkllSFZqTlYxaGVpejR2aHROaXRNcWJJYmhvVFRUNFlxenF5UV9ncXUwZU5aQ2I1SUtHc2NMRS1WMmJTdDR5bF83VDQ0U0xJem1VMzdVaDltN1pMU3BEOEh1MFFYbnQ4ZFNWbDRFa1dQc3ZUSEpJcUZtQ1pjM1YxS0loeVdzV3FuV0NsQWNUUzBoUGhwUlNXRlVVYjhoa3ZOam95SmFvVlVVY0lCRVBfVXB3N0VtMzgyYTJfZ2lROXdkdmdzcXgtNVlxSWQ4RHliYmZER28tcGNWdDFlczFqNm1FVTJlTVZBMnVPMFpKNUJMalFzT05TQWJmSG1CN2JHT05MNHUwaFJoZk51YThLYzBaMkN4bVBjSzYybU5EZ1Y4RkpmVENVOUxiZmpEWmVPS3o1ZExRTWtpREJLLVNoN2xIUVpmaWl6aFRMZG9pMDlyZGF5bXUzZnlRbEdpQXRGLUhBdUNyN1RUOHd5Q2w2YzlrcGJnVlhLb2JiYVowRXlySUdVeTdKQXRuNEltRllxUUpNdHNOTVl6SjliQ1JRTHB5WWwxVmRQM1FVRHJFQVF3UkhWVzVuN0gxVjVhSjlQelRYTGdPcWxRN0hLNEUwVjBYZmtFVlZTc1N1ZkF3VWZkQjN0VFY3TS1WVm5fYjcwZU0wdXRMaC1wRFY0bUVrdVBCb3pCWXJ6cUtSbVRDczlIYU5WazZtZ28ySjBpYy13UDVjX3Vvemc0elBuQmJjSld3QUJST3BmYlRBMDJISGZ1SGE0ZVVySjFPM3F1bC11SEJramY3NjJtNlgtOHlCV3YwOVlPN2gzQ1AtMzU2cFl0UkdVQnRnbEZlLVBSSVAyczRrMkVMVTBUNEZTVVRnN18tYklsVXRBcDhlblBiMk9vZWU4RVB0d1hYNG9qNWxtUDFOaE5YT3d4OG50SndwNlZieDdJdzBja0ZFSHhiOFZmLVVXRHA3cldfY0FNdG5RZndpSzV2N2VGYU96NjNZS083R0RnT19XdGtaX0pJbzRkT1JhYmlEemlyaFNueEljb0RTRkV3MzViN2lYNnVNOEtEaE5oc3JpRHFpQWtaMTRaNzI0V2NlS3pIWW1PMndwcEZhZFJiMmtUWmhjc2NCWTFtMlFJbG9qMThDcjZ6MUplOWlYT011S0tMd0k3R0c4ek1Ta3IwZXpDTGloa3lhQXFYV09rQWV1anNjc0RJLXkyQmRROTdjSGFEWFFxcGloME9odEVWcnhURnRGSVd2aUJRVHk0bHlhLThidjB5RjJFSlBJMmlkcm1JellOSElkU0ZqS2lPUFVKZ0lIQk1idkZaSWdLbUdkRm5jdFNRd05BT3VhNDJSNVhZZ1ZjT0ZJVHFlWG5PbWQyc1prd0wyYXg0Z0tZelNGbUVDbklaeGFWWEpMZXR1cjFfclRMZEZpdEp4V0djT0Zkb1R0TWdpUnVVaHlZc0taSUVPR1pJaGJoNEROVGQwX3NsZmphWUl3X2lkaDdWU2xhRHhIQnRONm1pb2czTDQ0VHk0NGFkNmVtcDRKVk9OLVc2SVFZLTh2T3RTbWVZUVF5N0k0MEQ4ZWdxRzVlSTFQZFRrNlZDOURWUUNjN2s3YWpqcG1rUGdXVFNjcnZ3ZFdXWGJBNVdWMHRFVU5QdlZ2YlJjUVdFbGNPYjYyV1pfNEQ3V3JxV2ZWeDItSS04VEptc1Zudm92SnBSM0ZMR1liQVhEQkFTekQ2QlVIS1dlUkhBMVhrWkFvZG91S1RfYURiWTZDTlhVbDdZQng5alRjWnBxeWNsSGIwTC1oLVdiRUgxOGRjR0M2SEZRVVhoQjB5YzAzcWJraWFTSWdTR1hSWmN6ajlrOHNIYlVpV2NiY2pfc1Fic3BGOEZNaFRpN0pZeEViTjBxNmpja0taVTAyaDFUSnNPYV80MV9uZ2tyd2dsd1h3MlpkNzZqN3FzVENiUnFWQ01JNWFUVmp6bmFZRE9xZzkwYVdYTHRXbno5akpUdUlxN3daamdKX3F0b29JRDIzazJwaERKOEY1T3VoaWhYQXNTR01JelRZRjlUa2FQRUhKY0Y0MEl6WFJXX0RWRkxyX19PT3BLWm16OXAxTVhpMnRldUpUR08xajFnYWlRTkdEeG50UTdjczBWNVhQamkyM1JRbWlKdFE5WFdEaktuTUFfd25xR3E0YzNqMHRuVjF0amJHNjdEZHprdUlWVTlMYWg0RUhpSVQ1MVRpRVdNM3pTanBDMjR0OHBYcFo4NmJRMHJ3WmZnWk1yREgyaVhJVnNvUVAzVjB0bFp3UFVJR3Q2YUxIcWhCZ1NrRjFkT21YUlVYQzZlbWJCRmVFTzFJZDlpcHVId1NienAyRmZfamdEZ2xZS2FRcm12elhvR3NhbVNYdFhiY2VKejVUSmVWQmJsT3BZUE9tR19uX214Nm9WNWd6ZDBjRzFsb3dUN0EzZDlZNnZZaFF6WDMzM3hBT2Z3ZWJIWWN3QVotb3gyaWtoWnRPUWJZeFZoSUtXdVNXSklzaHBQaDFaY1BEMzBWQ3RnSGJTVk5pbi1vdGtuclBsRzdRQmFlbzJkcnVKRFpBYkI4WGQyYVppOHpwLS1kTjhleXNza1JON2pZUDhvb1I1aGNfNWpWdG51X0FDMUkwVHJVbnZYaFpXMDBIS1lIcUVIQ3NkRk5QY2Nxa3c5VDREMFlUYVNUay1XdHhwb0J4R0h4YjdfbGxlWmRkR1FNa3B4bTk2cnBXajVVY1VpZHZTamxCblh3Q1hEc3FUV2RWT1lYVWdxY3Axbm5NQU4tbkpWbF9LeHdaRzdPM3Ywb0ZIdGswVzZqNFhhYkphRWU3M3JwRmM2Y1NVODFPem1hNmhDeTZDQWxrM1BESUl4YzBxNGpNRWRmbThqZDNzeE5RNC00TGhrUlFEMWFzWGZ4SEwyNURLNEhsckZxUTQ0MGF4N19wVGVpbEJrYzBocEFBQUkyeFRMdk9rX1NQT2VpdjI5eXZsZFo4eGxLTHdqU0E3UEFqRjdKUUlMNmVrZnZDMnExUjM1OGh6RGNLalotcHVrckZmRGpmbk43dk54QlY4bHJKcXZlLVR4TkptYUFmUm9Nd2lRVjhseXd1S1ZoVnRkNnZMaEFvSjF1X1AzeUFnWk9Kb25lR3FfdUFOdnAxZFotcW5DU3JOckl4WWVSM3hmQzAxSFBtRmZxX2RXckh2VnJJZ3ZfTW52aXRDSDVJLTlnSS1QMzZpNlJwM2Q1V0V1QW1Qd21kWTJwTlYtSVlPNFFkLUk0OU10ODk2UkptT1RiWjdjZkFCQTl3TVg1WThWN2p6S1hqcW5tN2dBbGx1NUh1SmhROHhaZFB1TUc3cDBuTnhySjhTOWtsSTVqamVhNUs3LTlPRXlydVFXcVhmSGNYTER6Vm9CWUlIal9VUHNubm84SEhOanhrZHRNZ2hmRFoxV21PaFV2SC12YzVfVTVCWjY0Z3A3bHpqSDRyLUNlQTg3Q1JEc1R6THdIVWxrODl0Qm10OUExcGRIS0lJMlJfTkxiMHlLSVRROGo3ak5kMTEyNlZWa0x2amprSnVZVlI4SVpRV2V0T3dLQXktZTRiUTB5eHoycG0tWGd0SThZdTFBMHFNVXdwcUVJTjY4OThEdVFzT0xWajd5elFaY2h3ZVhyY25UTFF6TjhhcG1wWDdFb0pWbHNCMU1jMmhpX0czSGZDbFh6RDUxMEttQlZ3VExOZVVrOWVVdkpxOGZuaDlleTRLakhEWTdkdnBIR2ZHMTNRRE9zR1MyUUhmZHRZdUZ1cjZsZ2xpb0hkaldsWElLQlBFTUxsWnRIdGRFQVQ0ODhxN2FnY2FBaHUxY3puRnZiSmVSbjBzUXRtUHpTTzJkRFNiYWJ6Q3hvODdFSC1BdTNVUTNHTXJNUldIdW8tTXdXVEVDekJOSUZVU1RPQ1B1VkI0OWY0d0hPdFR6Mkt0YWNBQUpoUFBDcUdVNmNIVFAxQk5KdXl5OTVldWRKQnJ2b2dCZ1NjajZVcmZLNGJSQzliRk92QWhUNU1fcUctaTNPb0Exc2tNbHM2bHRCNVpCOUF1M3pIVFZEOFJZUXB0ZkxhT1I4LWNpUlY4Qm1wTzI4NXlJMXh5NHdjd0xmbUF1eHZvTTJrNGZCZkM5eE4weDFubjIyNEF3eDRteW0tcTR3ejRsUGpLQmdwbzhzWWV1dG1IaUNUWUUxNkJLVVdtcVJFNXZqMGdDM1M1azROSkdTdXVIRkdmN19aRHhFVVNIRXdhY2dYS1BTZTdJTlhBN0Rmcm9mSk1vVmctajRvWlh1VlNaYmVxRVgwUlQ3X3NSU01FbWtRYWhxTlZ4OUwwaUUzelpSSnotdURQeDhRZnJnYkdHZWZXU1Jya2NOUV9FX25wV3djMExyaWp6dlBjbFZfY1lqWEljT2s1cEtIZFdCTU13c0wtTjR2c2gwUENva2oxcWM3LTZzZDFPY20zNFk4UkRjSi1yU1hLVXhPTk5UUk9CS0dRbm5RUndlWnloTjZnNFU0M2hzZ1BhYXJXbUhaX1ZKcjFrbUQ2Rm1CUy1WX1VuVFhGRVlEVElPalkxemdadmVObnZvUWJMM0kxd0xkVDZ6X0gzMVNkTlVlY1NOSjRXSE5tZ2ZsNDFoX1h5RjJtMzFOcnNrUUtWQ0pWN0xjXzc4QTQ0N01JOWtBUmlVTUUwd1hKRUtKLXdDZWNwbzRPdFNWMWxvMXhxWG5fR1ZMbURBU1VIMVJTdmRTUEJXbERCM05KNnItS0pKWGRXWXdzb2ozTVRwdkEyNlpiRHNBNkV2WkdMdlNOSkxKeEUzNzZjYXc0ZnFXRl9MREU5Z2hJNjVOeUV4cW9zdmI0ZkRIcldPWG1pVXlEbG9iakVLaGVacVFZSVJZRXpuRklmQTduTVVUMWlabkdWX1Vjc0N1ODZFeTBic2hBQWFBWGN1XzVnelo4RjM5eHloN3pFZTJzZGM4SE1NR3JlTm5hUS0zeEltRl9aTW4yWk4xNzYyc0RSdUlXb1czNVdRS2tzSWUxcU05NHAwM242Q1RON0ZWRU45Slh3bXh5a2p4OWs4QWlCYU5iVHFfaDFqV0Vta1dONXd1OTZlUVl2ZWxPNGtuUnRtSnFERXZva0ZpZDBJdzJPTnl0VS1LS2ZyQVZGU0dKU0YxWTFFamR6enFiODd1dktkT2IzamhlRF9DRDBVbWRNREExaExBeGtvUURHX0hZMnMzMWZUNUFQdkVXQU01bkVVbzllN08tVnBUMW44ZE0yZ1k1M3NxM0lsUi1wN3VuSDZFQ3dhajYycnp1clgzcXNzZkF2YkNVYllRbU1KZF85TDVHcmlhV0Z3VFRiT2dwbW5WbV8tT2lBVWdLQnlvMFVvcjlnbnJ1eVdPMEVrRHZWRkFUSjNiYTdTV25WSldTNHY5QXJkLTJTdG9paDlqTnJUdGF6YkxmTDFqQ0huTlVZUWF6VEVHVm8yTjA4YW1GNy1zNUtIWll0aEFTUl8yX01pb1c1WTBPSFA3RDRMRXRhVVVMQV9McW1LYTlNN0dPTnZYN0dYRDBlWDJXa2p3Uzduai1COXlUeVd3Ui0xRHNMdkg0WXE3dHU5WDNxSGpQakJwX3h3ZVBWSWRiTnB2dXItQW01S2FCTzZDSUdzMS0zY3VTQzRMWXliZDZneXlTNDVHRk1HVnpxMHBRb3RGQlp0dXlvQ2g2MjYycU5SaUU4WDNlU29KTE0tc1A5cjJDbkQza2dSTHB1cDY2azNKLTF4ZmVodXBuR19RRGQ3MmJNdlVFNkhHc2d2eEN0VnpLc3gxaThHVF82ZmRKUU1XalBkZlk4Y1c3SmRsRDNGYVFKZ2RIR3VlS3VMUFZWYl8yeVpZOUpHTjU0LW1feDNRZFJVVERLd09VOUdnSlRpX01IZ0ZHYXJFZ1ozMjI4X0xmR3Vtd0V0MXJuTENIa2xwZzBMc3NONXNUOUhFTHFwUE9MXzBwYXFJN01lZ0RIdDAxSVY3endDTDl0ZEhkT3VVZDhPSm9GQWxnRG1RUExONzBiRHliN2R0bWJ0cnYxay1JOC1ScUpFeG5ONXFVdnBTR0N5QTF1T2g5d3lLMWhzcmlmLUx2em1SZUcwd01PSGFmM3NMNkp0emNlQzNJMjZ2bkVmOURINlZMRHQzMHJfM0pOeWM5RzIyeDBVNjIyTzRRY0MxYmdzcmZIQVV0c0htbEhxd1otQlpNeTV4cklwanZLWFN2TXRMenIzYnhTdW1ic0dzQzVYS2owVU96ZS1nLUV1MmFlcVo0SnNObzJfMUQ5ZkM5c0FrSklDa1IwWmY4UDdtaWVGNVRJNlN6eVJCVGdHTEk4cENDOHNPTDVwbXRhMlpiRUdOd1dmamY2NnZ3dFg1cHNaVkZQdFI3NXN6elVsSmMwUW5SSE1jZ3N2cWVWQ3lFMnNEMkMtWHFLTkpnMlVtWWhxMDFIbVZpQkt0WTF1SkNSamNqYW5PUjhVQWRsc2NCT2ZWMklMWDVHVjdTVllyX1BTQkduQTdNV3BVV2JQck0zQVhydVd1SFFlVGxITWpXYUVhMnZsYkJFT1JiMTV4Qk42dnlVU1ZhQm5UUkVzUkdqVzRSTVh5OXhrNXVvczlBTXFKUzZNbDdsd2k4c0cyMmVHbmo1Nnl2b3d3RGJ2ckRSV2w2azhkX1lPT3FTUGdpNnRrOWJqREEtbl9Xb1pGbVVGUlBLa0pucFhzNkZKNk9ab3E3TmNERUJXQ1J4SGtMSHhadUVlRzFfTzNZV0pwVzVaU05ETVRqS3UtZ25OWlk5eVRYNEtBUUJtTTZSNGFKcFJCZDRfdDExX0JzTFZOZGNsNWFjdnU5SUxfOTNuLU1LVEhDZ2lTdlM0bUkxSXdHc0YtS3dMZWk2TUQ5eXQzekw3eWNVbDhqSWhCajJkb2NKZ2ZvREFRSHRZSExST3VtOHdFWU1iWUVlamc2bkJKeVpYWDhEWTI2R3hiTEU5c25rcnhTVWdxS3JYNDV0NUR4MTZMT3lpUEViMXhSQ1h5YkNKbU9seGZ1SEtPanZHMG5BdHVBU0VaQmlQVEk5SHcyTzFsRFFWQVB3VGJWdW9hMUFleTFlV3ZzeC5vbWtNRDUwU1NqSm96WU5weDhCejZn"}, [
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
  'westus2',
  'x-ms-request-id',
  '4fea3147-9c66-4bc3-835d-46c3e27ef46d',
  'x-ms-keyvault-service-version',
  '1.1.0.878',
  'x-ms-keyvault-network-info',
  'addr=122.58.248.136;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 16 Sep 2019 22:22:11 GMT',
  'Connection',
  'close',
  'Content-Length',
  '13536'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/keys/recoverKeyName-canrestoreakeywithagivenbackup-')
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
  'westus2',
  'x-ms-request-id',
  '33cf2cd2-3d30-4285-98db-75fcddc0adf9',
  'x-ms-keyvault-service-version',
  '1.1.0.878',
  'x-ms-keyvault-network-info',
  'addr=122.58.248.136;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 16 Sep 2019 22:22:12 GMT',
  'Connection',
  'close'
]);


nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fvault.azure.net%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":3600,"ext_expires_in":3600,"access_token":"access_token"}, [
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
  'e2c69676-eeab-4de2-8554-64ef20674400',
  'x-ms-ests-server',
  '2.1.9368.8 - SEAS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AqHHtZRTqO1ErjxTgT0D1Qmp4MoTFwAAAI0BEtUOAAAA; expires=Wed, 16-Oct-2019 22:22:13 GMT; path=/; secure; HttpOnly',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; HttpOnly',
  'Date',
  'Mon, 16 Sep 2019 22:22:13 GMT',
  'Connection',
  'close',
  'Content-Length',
  '1231'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/keys/recoverKeyName-canrestoreakeywithagivenbackup-')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/recoverKeyName-canrestoreakeywithagivenbackup-","deletedDate":1568672534,"scheduledPurgeDate":1576448534,"key":{"kid":"https://keyvault_name.vault.azure.net/keys/recoverKeyName-canrestoreakeywithagivenbackup-/51c3744aa3c746d1b71070b909d29d6c","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"0B4rxsqzT_PSoJq8ldR8FHYXWHzKFj6M2r0ylvJgkBUAVQCraqTtH5RW6BQ6Km3Gu-jwXh2WW2eFmCz6qafO2pqp2Dy-QDE2gIZT6aaZGaWz_JNiiIakb_1jIYSGMqYaJlrcvgaraX5sAfHUm0cxm4EbVnvXRFWtFs7_qBKu3P_oamOyS_gSjsbOsyiDjcHRAtBD2TnLYjSYKeUbazRTmvZOcuFTYK4_-8b6Q9j7bqQwKpsbT6bB4B4DlI_CkxstM-d4LPtF2F5G0ejnMJcPAfEaLP_7cgT2gdKecCT1by4DVyTkekF6Ce16QqxOrsR4CIdqgC7TBgTBwWvyUa6baw","e":"AQAB"},"attributes":{"enabled":true,"created":1568672529,"updated":1568672529,"recoveryLevel":"Recoverable+Purgeable"}}, [
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
  'westus2',
  'x-ms-request-id',
  '98a77380-f533-4fc2-b44d-6ffe72a76ba3',
  'x-ms-keyvault-service-version',
  '1.1.0.878',
  'x-ms-keyvault-network-info',
  'addr=122.58.248.136;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 16 Sep 2019 22:22:14 GMT',
  'Connection',
  'close',
  'Content-Length',
  '905'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedkeys/recoverKeyName-canrestoreakeywithagivenbackup-')
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
  'westus2',
  'x-ms-request-id',
  'ec2130a2-6b1a-486e-85ed-dd34fcb08280',
  'x-ms-keyvault-service-version',
  '1.1.0.878',
  'x-ms-keyvault-network-info',
  'addr=122.58.248.136;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 16 Sep 2019 22:22:14 GMT',
  'Connection',
  'close'
]);


nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fvault.azure.net%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":3600,"ext_expires_in":3600,"access_token":"access_token"}, [
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
  '3bcff336-72fe-48e8-93ae-27c040c64600',
  'x-ms-ests-server',
  '2.1.9368.8 - SEAS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AqHHtZRTqO1ErjxTgT0D1Qmp4MoTFwAAAI0BEtUOAAAA; expires=Wed, 16-Oct-2019 22:22:16 GMT; path=/; secure; HttpOnly',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; HttpOnly',
  'Date',
  'Mon, 16 Sep 2019 22:22:16 GMT',
  'Connection',
  'close',
  'Content-Length',
  '1231'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedkeys/recoverKeyName-canrestoreakeywithagivenbackup-')
  .query(true)
  .reply(409, {"error":{"code":"Conflict","message":"Key is currently being deleted.","innererror":{"code":"ObjectIsBeingDeleted"}}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '118',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  '0c7e1655-1588-4e97-bd16-b98542a8ab59',
  'x-ms-keyvault-service-version',
  '1.1.0.878',
  'x-ms-keyvault-network-info',
  'addr=122.58.248.136;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 16 Sep 2019 22:22:16 GMT',
  'Connection',
  'close'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedkeys/recoverKeyName-canrestoreakeywithagivenbackup-')
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
  'westus2',
  'x-ms-request-id',
  '7a1019ba-9040-4dfe-8f9f-d1c489430e98',
  'x-ms-keyvault-service-version',
  '1.1.0.878',
  'x-ms-keyvault-network-info',
  'addr=122.58.248.136;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 16 Sep 2019 22:22:28 GMT',
  'Connection',
  'close'
]);


nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fvault.azure.net%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":3600,"ext_expires_in":3600,"access_token":"access_token"}, [
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
  '63a15c3f-4fe3-4290-8dd4-098ab37d4900',
  'x-ms-ests-server',
  '2.1.9368.8 - EAS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AqHHtZRTqO1ErjxTgT0D1Qmp4MoTFwAAAI0BEtUOAAAA; expires=Wed, 16-Oct-2019 22:22:29 GMT; path=/; secure; HttpOnly',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; HttpOnly',
  'Date',
  'Mon, 16 Sep 2019 22:22:29 GMT',
  'Connection',
  'close',
  'Content-Length',
  '1231'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedkeys/recoverKeyName-canrestoreakeywithagivenbackup-')
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
  'westus2',
  'x-ms-request-id',
  'fb8f2db0-027d-4011-8894-6387b0babbf7',
  'x-ms-keyvault-service-version',
  '1.1.0.878',
  'x-ms-keyvault-network-info',
  'addr=122.58.248.136;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 16 Sep 2019 22:22:30 GMT',
  'Connection',
  'close'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/restore')
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
  'westus2',
  'x-ms-request-id',
  'b2035313-f6d9-4024-a81c-5594c7431a73',
  'x-ms-keyvault-service-version',
  '1.1.0.878',
  'x-ms-keyvault-network-info',
  'addr=122.58.248.136;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 16 Sep 2019 22:22:31 GMT',
  'Connection',
  'close'
]);


nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fvault.azure.net%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":3599,"ext_expires_in":3599,"access_token":"access_token"}, [
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
  '504263a8-db81-4b8e-ab05-952ae6ff4400',
  'x-ms-ests-server',
  '2.1.9368.8 - SEAS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AqHHtZRTqO1ErjxTgT0D1Qmp4MoTFwAAAI0BEtUOAAAA; expires=Wed, 16-Oct-2019 22:22:32 GMT; path=/; secure; HttpOnly',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; HttpOnly',
  'Date',
  'Mon, 16 Sep 2019 22:22:32 GMT',
  'Connection',
  'close',
  'Content-Length',
  '1231'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/restore', {"value":"JkF6dXJlS2V5VmF1bHRLZXlCYWNrdXBWMS5taWNyb3NvZnQuY29tZXlKcmFXUWlPaUl5WVdabU5tRmhNUzAzTm1Ka0xUUTBZVGN0WVRjek5DMDJaalZoWkRCaU5XRTRPVGdpTENKaGJHY2lPaUpTVTBFdFQwRkZVQ0lzSW1WdVl5STZJa0V4TWpoRFFrTXRTRk15TlRZaWZRLklxbDlMVHZvaEJpcHptc3JmYVYzTUlManhSVk0yekVkRDd5V05sUUUtdXRMOVlPaWJpbmxlSzhnQWpsT1d0WXpKYmJFQU1hVmJaaTBoN0dUUzNYN1NJekx5bWI4MDhXYVlCaVc2M0lsUWdxUm50YWV3RGxRQVNEaTctTWp3N0lCR0lyUTE5TW16WmF0ejZ5WHFqMEl1S0pTX0Rrd1NXOW5sRzdySU9kQ2dCTUJmVl82dWxZbXc0N1JtLUZNMVljMHoxNXp5WmEtSGc5aFBNTEh3cWd2dUx1YzdPZXh1dm9tTVJ0T3JaUmlOdzNraWhtVnJCNGE2SUt2bEEwc1pHMktURjJQWGcxRng5TVlaTFliWkh5Ym1pZlEySUhVdnBrMEVCZ2dwOENHLVltNlk2SWVvSnEwZlJFVWFZdVQyRnZIN0NtOVZzLWZneEIxZlBwQUt5RHppUS5lSVVBaXNoTmV5X1h0Tm11cU9pOVpBLm9aMFNvRUFab0dwSEpRcEdqNHhnNGo0S3lOdi1mcmt3eXh2QlB4U24xRkFIT2ttMlRRdjJ1TFBCaHRiUUZ5ODViUXJuY29lXzFDZThDdXlPcUxIYndoakJSVmZ3R0lxV3ZBWW82UW83NTF2WUxncW5taTFoUFctYUFfeWF0Q3g2VkpQMXRuNS1rdmlaT0hlU1E0WnF0R0d5VV9jWkdMY1ZBaWtMUnRxQ1FTeWhYLUtsNmJlWFh3TFJUa3IwTmhwZ0xvQmJ5d05mck04WHRBbEZjUS0zVnh1NGo4S3RHRHBFenh4elhhRHpubVVELU5rMDEteVNRSGd3ZUFOWVh3ZFJNdzFfRFY1QzhUOW81ZUxLaXVZWHA5TGs3RkdrZUJOTWNKaVRjSEh0REU2VTlxVVNMYVdzNFUwcjliMGJQT3lWT0xfVWs4YzRaanBxSm16Z2VGVzdVZzBjZ3RDVFdsY2pETDNKWjFoMk5GdGJwLTNxU2k3c0VrRUZVaUUwSVAwUWFUWV9hWFZRU0JrOUZpUFBwTnJQUTZwbGlWYkEyVzdJekRrM09TRGdLaU5DUjgtb284ZzdEeGtOay1RVURkdHVaM3JabV9VeTY4clZYYl9ET0xlNkxFTTEzU1B2MzR5OGxzWW9DRnVRUFA2c3cwRVRwZ0FScWJBRnRVR19PcWJKVmlrdHphODc3THZ2NlQyblRrOFBmY29sbjJNNmZmNnhUd0k3S2pkZVFoV3g4MldhZDVVVlJGcVlqd3UzQ3ZPZUxMSWtHb0wwS1h2UlY1ZllaRlFjOGtvLVZIYmlDVHk2Y3ZUU09uZER2Nmd3Nmsxb21aODRNQ2RfZFNnSHlCSkRzTFdXWmt5Nm83RlU1bTJGclRESzdCSkxTejBldGg5VjNEdEVTRGpjYkY3elBQZ01lLWdJWDNSRVRUbm0wLUZWX1cyQWgzUThmY29SUDBJMW9TMG9mdkR0dVlkSEpMQkd3VE92YjhkTUxUVGN6OU05QTd3clZqblNNbHZfekQ1YTZKQWtEdXdOS0VTVW8tNHItUVFsVGpMVTI2dWlBdWpuVkNxNVJNYjkyUzg3UzAxTWxwblBuM3JlN01sWDlWVXhzVmNVNjExT2JvN05qUzlIOHQwZC1iRFlKY19KNUE5S3pMZjlMQkVKWjl0X1JhSThXcDl6MVE0UXB2UlFaVWw1cnZfRHZ1UHRVbnU5eTI4S1dMTUJHN2VSb0xSMEFjWkxQWWNydEdsQkxaRVV6NFpMR2JVVXhwS3ZTazQtQjllS1RuZEpfenZUTUVUTDMyLXk4bVlONWYzVkEySHpvTnp3Szl0SXByMThkN0w0bHBQS3FSRWVJMU5wd1JwUTZHcXpLeVliRmZTRHFSbVZYUmhtYnFDdGxxelBDLS1PZFRQU2ZWSWZJWmNuZW9MTzhUWVMxbVZHZmV6ZXI5dHZTMU12WFhCUl8zZUFpU1JSbjZzVFdudG4tQ0F6TUp1VTNZUDVkcjdoUW54b05LM0hGVTRCQWtKUUpmcDdlejg4eEU4YldVQ0F3MzVSNDF6YVM1ZjlJSE0yOTIzVEdEZHgtY0QzT1NxY1JyRW5KR0R0UVl2OWZvWVJQUGsyRnhlUVpUekpXaXRTZmpkZXdhVndTQWdseHFDSVNtZnQteWs5V3ZjOE1jb2RuMGs5N1VpUzVqaXNjVG1paDRIYVhVUkxrUUN6Sm5aRFpzMWY3VDdHNFBlbnJCZ2Q4Q28zdkhGQzktRXctaVdOeElseHBCTFhva0lzMDMwR1ppa0pEaGJhRXVoQ3FCZmU4V1NORUttbmhlYWFmc283WVoyc3otTDJTUHRsY3RYc0tJUXF3bEVicEh4Sm1WdzIyWW5IbHR2Rm9BY19tOEJZUzdYS1gtbmtDNlNtdTdZenhNc0FsZ2drY3QtdXFGNTZNMVZSWkRfU2dCRkJXTW1wLUU5R0pVbXRuZGNlc09SN3RyTXhGd2w3Tm9zUjBHc3hyRXRRQTQtVGtFdzVWWktiQVFLNXloZldVM1BIdUNSQXFKaGdPankzOXVSSmcxak55eTcwd1diXzFTTmpBeXdIVG5ZcFhXd25ueW1pUnVRYUtBQkVWMG9UQ2dueVRseG80UmZjMXRBXzUxbGstMExtRkRWV3VlTGRBNjQ0U3VtTE9ia2U1SGRTR3FmbHFpUjJ6MTJaekVBeG9KdmliRUNkTmFXUXNGUWpQRmJtSFN4UGlsQTE4WXIzODctT1g1dEc4ZFlSVFpjVHBGRnJPWGpDVVNPVm5YU3F5cmxvWVJIbnQzRVgzSGFkbElnQUtLVFd5TmV6WmUtZE1LMnJ1MTd2eTdMbGpsTDF0OGpoRTh6d3ZILWRjUkZsX0R5eXFGY005LXMzempfM2lnZGdzUklLRV8zdWJyekJvdGJ5R3hBUm9mTXJKWU9TSmdTelZWSzdySVZuaXo1TEpQTE0xanNIUVBDTFViRmhZUXBDRXZaQzFqR3FKbHBFQmtFQ2hhWll0cDNDVUJ1QU5DTUtUN3hrbkdmcW02bG5SZ1FDWV8zSUFvcWVqbWZVTGROZ0ZROEptTldNZ0Y3MFdOYXo0aV8yNVNLclZ5VWpGSUxRQkNHTUJ6M2xGanRFUXM3anZ1UktqUEREc3VVWUVUSGtDeTNQMnVKcFpnaGdnZ2tVVVhyNDNUMU81N1JydktVZXkwQ09Yc3FDeUh1cEY1ZlpuUkQ0YlhmZldrZldCQVpYUkdrMXFfRUFTVFpxQnRQS2Z6Wmo4T0lrT0FvWkVPSV9saS10N1JnMDBJVGRFSENJT3RsYjJYY1JBSzRuTVU3RVlOMFE2anJVT0dReWlaVEowNnVhQ1Q4MlFEZm9KOENXWmNIaGZoUGZlODBmTHZXLU1LTEZLY0p4bVZ4eDhTWWhwa0xUYUgtdERoQVJJdmFzWHlvRGdob05EYjlZOXFQRUZjTTUzbkJKRmdTZEVpUFZLWHQ5enQxMVM3cFVCamN3NkI0SFEtRGFPUk5XVUphLXlsbTFBbnhQWXo3SHRURFVWMXVEeXQtM29rSTNXTzVyWnNhMjdyVzZ2RXBPVzM3VkptU1VNQVdWWFNpSkpLRTdXNU1XeXdkdmdlbFQ1SXhFeW1BT1pkaGFvQmI3cFNoMXViSDNjOUNKX2lsOV9tSnZVVTNLNTBoVkJOTFQ3MjZ5bFNLaVNxM2I5RlM4Si1ZSV9TVllsNUpSX3NHbS0xZlRrSWRyQmtWY1BJR0lJQ1F4c0t6SjFCNHpOSnlBeFRKSmFaV3h2djU4eTFSMWdiU3VzNV9mQXVrZ2hrMTl5b1l0SnlQalpWYjRZYkg2UHlKakhOVWQxcXktLTdtajN6X3NIMk5sSkdIWG1ROXUzdHhTNmFfWERQWGhpQXJVTDU3S21wdU90MWgyNjBjbDVVRm5QLW5CRnpsVHpyWlV0M2pfeEt4V1gtcU1nMWM2ekhEOTRVbVQtT2FJUzNabVJIU0ZyM004WDcyaGZnVktBaGlqendtOUZZRTVOaXk4cmJkeHExekMwU3RlTi1YNm5BakNwNVUzME12VXhMSlVlbjRVSktGZ3hraXNQYTdCeUlrT1p6emtTWTJveldUcjlCTkpLWTJIRWI1LVBsWFlfaDBjZHNueXg3SExFMzB0aVFvUG1RNzB6dTZNVXhObGpMX3BGaWplbWpLbnlSd2xySmhybTN6cWxUdGgxQnliYlR5ekw3WHVVd1UyUkRuWV9HNmJ0MXFPNnIzVENyNjIxS0VYY2FSdEhaUURKVmRrWndFWjNXdGV5OWNHcDB3ajlOMFhLTV9fZTJRS3JtQkpwWnF6WFV2emgyUjY2QmczMVBTTzRoWDdkeGFlMmlIZTZBTmxvMnpUT3lOeVVmM0k1Y2d2MG5rZ2J1QkVxSzdNbzZKRmlxMEJxS2dRc19NSTg5bEtFOG1nZ2wtcERMVzJLU3QyRk9YeUxKcV8tc3JfaExwQkktaUhJbWxlV0FwLTdhTENBRDRkWWRHdXdoTEJvRmUzVlhTcTRnS045SWwzWF80TWFnMVpLVGs1cmVacy1PY0lSWDZYa0RRVmgzcGtEWkhjU25IdTJldExJMTZSSnNFQzVZVjJzUjdFWTgtNWNZY3huNEZDYW9wNVZ5UmItekRuX0tLaHZaOUsxRTV0VEFUeDJSUVB5MVNiMW5paUNuRkU0Q05MdGtXMlZRU2RZNFYyMjZYcHFsWmJ0NTZSTHBnaXNQQjJPRzhBd2NpY1phS2dwc3hLcmt5cTAxVjlpYkJsZ1dGb205a0tSU0hZRlFCX2RrMVpmblB2LXVXakR6NjRDWjlPUjJpYXI5VU1odkJNeklSdlk0UkRVMFRHZFdoa3F0eXlGS21CZEdWd3pleTFFekx3WFZXTEc4UjJySjlNRWY4LUZOVXdRcDZKVmJ4clpmSGZXOTlpb0w1SEVqQ2hwRU1lUkRfdmNRYUgxWFRqbmZ1RE5wVk1OTjBFWEs1MnlyV2oyZWN5VDhiWU94cU00QS1hbkdidW94aXc3NGxtMjh2eUJoMzd4UzM4RHhxX1JlWkJQdi03QUR3TkhnQy1tQlRyM3E4R1dBaURuMjZleEtBZDdHQUhPOXZFbHJUR3lkRktsSmVTZDJydllUd05NYXJ1Q2JfSXRwNlAzc3VNUF93V2R3T25RUEFMTVNsbFRYSHgxS2luelB5ZjYyRWltNlB3TGVJNVZEWnctYjZFakpzOWFReXgzNEFxNFlWN3l2QUVKTndWQnBSWGJaUkMwNERLN2poQUZhblZ4dDE3VmZJU1pnZlJjdDdnM2pKOTVISkRtU3k2UGpadVlXV2FzT0R3c2k1QnJFNFhITlFJbkFPd2FTVGh0YlcyQ3hXaGJ6dDA5RVdsRDRNbW5TRFpVdTNFbllCcXozYnE2bWNaOVVQVFpBc3VaRnBNX2NQWFhRcGJCeXJjd0tnMzBoWENZU0J4Q3l5VkMwd3lKTWRzVDYwRVFaa0Jna2pKOEYtMFRMTXU0bnVtZllWTGluRkw1RndnbHhCUGptd0htLVBaLWQxUXRzd3d2c2FpS2JEaVJBZ2tqMmJyMHZXNnFLWXJkNUNpOHJjcHVEMmFtTXprRTgxRFh0aW83cXR4U2xBbVhsaWFLVWNRTXlDQTdkM3RxLS1qV2QyU3pSVlBLbGlRWjFHdWxXeGdkS0V2ZENrNlZ4ZGJiTXNFM1d6R08tOUVWZ3RUbm91dG9ieWxzd0pzRHA3SWdfc0h6MTdyelhzUUMwVG5VT0k5SUlicGpGYXNhVnA2NlI1LWFJZXF5UUpGR1RCODA1ZDRPUG44akwwRDBxU1JWamNwM05qSERmR2p5ay1VeHVUUTY4dlVub2ItS003c0pLREdzazQtMDZYX1d5dTduM0dfSkc4RzdsX2lwbWxUc1F1Tk4yUmVZRWVucXBsZ3ppLWFhRkNYTjd6N3NpRHNTbVNxRWlSckZFc0pqems0WVltdEVZc29lLTQwNkZzTXllVEVZLWtqTXNzSlZfSVloalpET2dTQzNJdV95cUZoZlVaRmd1UkNGOFNqaUVDN2VVTXRMZGphN0hCajgxQ25kbnBTR2lfMU5IV3ZONkhyZDFnaXNVM1RETzEyVjdkRWRNOWxhbmRYRzdQTy1pQXp3T3hLSUpEakxQaE1SeFoxT1RkTm5pSFlwaVdpQzViWmZmUkRraG1icnFudl90RFg0QXpSejJTblhXSWRSSGlnMkllSFZqTlYxaGVpejR2aHROaXRNcWJJYmhvVFRUNFlxenF5UV9ncXUwZU5aQ2I1SUtHc2NMRS1WMmJTdDR5bF83VDQ0U0xJem1VMzdVaDltN1pMU3BEOEh1MFFYbnQ4ZFNWbDRFa1dQc3ZUSEpJcUZtQ1pjM1YxS0loeVdzV3FuV0NsQWNUUzBoUGhwUlNXRlVVYjhoa3ZOam95SmFvVlVVY0lCRVBfVXB3N0VtMzgyYTJfZ2lROXdkdmdzcXgtNVlxSWQ4RHliYmZER28tcGNWdDFlczFqNm1FVTJlTVZBMnVPMFpKNUJMalFzT05TQWJmSG1CN2JHT05MNHUwaFJoZk51YThLYzBaMkN4bVBjSzYybU5EZ1Y4RkpmVENVOUxiZmpEWmVPS3o1ZExRTWtpREJLLVNoN2xIUVpmaWl6aFRMZG9pMDlyZGF5bXUzZnlRbEdpQXRGLUhBdUNyN1RUOHd5Q2w2YzlrcGJnVlhLb2JiYVowRXlySUdVeTdKQXRuNEltRllxUUpNdHNOTVl6SjliQ1JRTHB5WWwxVmRQM1FVRHJFQVF3UkhWVzVuN0gxVjVhSjlQelRYTGdPcWxRN0hLNEUwVjBYZmtFVlZTc1N1ZkF3VWZkQjN0VFY3TS1WVm5fYjcwZU0wdXRMaC1wRFY0bUVrdVBCb3pCWXJ6cUtSbVRDczlIYU5WazZtZ28ySjBpYy13UDVjX3Vvemc0elBuQmJjSld3QUJST3BmYlRBMDJISGZ1SGE0ZVVySjFPM3F1bC11SEJramY3NjJtNlgtOHlCV3YwOVlPN2gzQ1AtMzU2cFl0UkdVQnRnbEZlLVBSSVAyczRrMkVMVTBUNEZTVVRnN18tYklsVXRBcDhlblBiMk9vZWU4RVB0d1hYNG9qNWxtUDFOaE5YT3d4OG50SndwNlZieDdJdzBja0ZFSHhiOFZmLVVXRHA3cldfY0FNdG5RZndpSzV2N2VGYU96NjNZS083R0RnT19XdGtaX0pJbzRkT1JhYmlEemlyaFNueEljb0RTRkV3MzViN2lYNnVNOEtEaE5oc3JpRHFpQWtaMTRaNzI0V2NlS3pIWW1PMndwcEZhZFJiMmtUWmhjc2NCWTFtMlFJbG9qMThDcjZ6MUplOWlYT011S0tMd0k3R0c4ek1Ta3IwZXpDTGloa3lhQXFYV09rQWV1anNjc0RJLXkyQmRROTdjSGFEWFFxcGloME9odEVWcnhURnRGSVd2aUJRVHk0bHlhLThidjB5RjJFSlBJMmlkcm1JellOSElkU0ZqS2lPUFVKZ0lIQk1idkZaSWdLbUdkRm5jdFNRd05BT3VhNDJSNVhZZ1ZjT0ZJVHFlWG5PbWQyc1prd0wyYXg0Z0tZelNGbUVDbklaeGFWWEpMZXR1cjFfclRMZEZpdEp4V0djT0Zkb1R0TWdpUnVVaHlZc0taSUVPR1pJaGJoNEROVGQwX3NsZmphWUl3X2lkaDdWU2xhRHhIQnRONm1pb2czTDQ0VHk0NGFkNmVtcDRKVk9OLVc2SVFZLTh2T3RTbWVZUVF5N0k0MEQ4ZWdxRzVlSTFQZFRrNlZDOURWUUNjN2s3YWpqcG1rUGdXVFNjcnZ3ZFdXWGJBNVdWMHRFVU5QdlZ2YlJjUVdFbGNPYjYyV1pfNEQ3V3JxV2ZWeDItSS04VEptc1Zudm92SnBSM0ZMR1liQVhEQkFTekQ2QlVIS1dlUkhBMVhrWkFvZG91S1RfYURiWTZDTlhVbDdZQng5alRjWnBxeWNsSGIwTC1oLVdiRUgxOGRjR0M2SEZRVVhoQjB5YzAzcWJraWFTSWdTR1hSWmN6ajlrOHNIYlVpV2NiY2pfc1Fic3BGOEZNaFRpN0pZeEViTjBxNmpja0taVTAyaDFUSnNPYV80MV9uZ2tyd2dsd1h3MlpkNzZqN3FzVENiUnFWQ01JNWFUVmp6bmFZRE9xZzkwYVdYTHRXbno5akpUdUlxN3daamdKX3F0b29JRDIzazJwaERKOEY1T3VoaWhYQXNTR01JelRZRjlUa2FQRUhKY0Y0MEl6WFJXX0RWRkxyX19PT3BLWm16OXAxTVhpMnRldUpUR08xajFnYWlRTkdEeG50UTdjczBWNVhQamkyM1JRbWlKdFE5WFdEaktuTUFfd25xR3E0YzNqMHRuVjF0amJHNjdEZHprdUlWVTlMYWg0RUhpSVQ1MVRpRVdNM3pTanBDMjR0OHBYcFo4NmJRMHJ3WmZnWk1yREgyaVhJVnNvUVAzVjB0bFp3UFVJR3Q2YUxIcWhCZ1NrRjFkT21YUlVYQzZlbWJCRmVFTzFJZDlpcHVId1NienAyRmZfamdEZ2xZS2FRcm12elhvR3NhbVNYdFhiY2VKejVUSmVWQmJsT3BZUE9tR19uX214Nm9WNWd6ZDBjRzFsb3dUN0EzZDlZNnZZaFF6WDMzM3hBT2Z3ZWJIWWN3QVotb3gyaWtoWnRPUWJZeFZoSUtXdVNXSklzaHBQaDFaY1BEMzBWQ3RnSGJTVk5pbi1vdGtuclBsRzdRQmFlbzJkcnVKRFpBYkI4WGQyYVppOHpwLS1kTjhleXNza1JON2pZUDhvb1I1aGNfNWpWdG51X0FDMUkwVHJVbnZYaFpXMDBIS1lIcUVIQ3NkRk5QY2Nxa3c5VDREMFlUYVNUay1XdHhwb0J4R0h4YjdfbGxlWmRkR1FNa3B4bTk2cnBXajVVY1VpZHZTamxCblh3Q1hEc3FUV2RWT1lYVWdxY3Axbm5NQU4tbkpWbF9LeHdaRzdPM3Ywb0ZIdGswVzZqNFhhYkphRWU3M3JwRmM2Y1NVODFPem1hNmhDeTZDQWxrM1BESUl4YzBxNGpNRWRmbThqZDNzeE5RNC00TGhrUlFEMWFzWGZ4SEwyNURLNEhsckZxUTQ0MGF4N19wVGVpbEJrYzBocEFBQUkyeFRMdk9rX1NQT2VpdjI5eXZsZFo4eGxLTHdqU0E3UEFqRjdKUUlMNmVrZnZDMnExUjM1OGh6RGNLalotcHVrckZmRGpmbk43dk54QlY4bHJKcXZlLVR4TkptYUFmUm9Nd2lRVjhseXd1S1ZoVnRkNnZMaEFvSjF1X1AzeUFnWk9Kb25lR3FfdUFOdnAxZFotcW5DU3JOckl4WWVSM3hmQzAxSFBtRmZxX2RXckh2VnJJZ3ZfTW52aXRDSDVJLTlnSS1QMzZpNlJwM2Q1V0V1QW1Qd21kWTJwTlYtSVlPNFFkLUk0OU10ODk2UkptT1RiWjdjZkFCQTl3TVg1WThWN2p6S1hqcW5tN2dBbGx1NUh1SmhROHhaZFB1TUc3cDBuTnhySjhTOWtsSTVqamVhNUs3LTlPRXlydVFXcVhmSGNYTER6Vm9CWUlIal9VUHNubm84SEhOanhrZHRNZ2hmRFoxV21PaFV2SC12YzVfVTVCWjY0Z3A3bHpqSDRyLUNlQTg3Q1JEc1R6THdIVWxrODl0Qm10OUExcGRIS0lJMlJfTkxiMHlLSVRROGo3ak5kMTEyNlZWa0x2amprSnVZVlI4SVpRV2V0T3dLQXktZTRiUTB5eHoycG0tWGd0SThZdTFBMHFNVXdwcUVJTjY4OThEdVFzT0xWajd5elFaY2h3ZVhyY25UTFF6TjhhcG1wWDdFb0pWbHNCMU1jMmhpX0czSGZDbFh6RDUxMEttQlZ3VExOZVVrOWVVdkpxOGZuaDlleTRLakhEWTdkdnBIR2ZHMTNRRE9zR1MyUUhmZHRZdUZ1cjZsZ2xpb0hkaldsWElLQlBFTUxsWnRIdGRFQVQ0ODhxN2FnY2FBaHUxY3puRnZiSmVSbjBzUXRtUHpTTzJkRFNiYWJ6Q3hvODdFSC1BdTNVUTNHTXJNUldIdW8tTXdXVEVDekJOSUZVU1RPQ1B1VkI0OWY0d0hPdFR6Mkt0YWNBQUpoUFBDcUdVNmNIVFAxQk5KdXl5OTVldWRKQnJ2b2dCZ1NjajZVcmZLNGJSQzliRk92QWhUNU1fcUctaTNPb0Exc2tNbHM2bHRCNVpCOUF1M3pIVFZEOFJZUXB0ZkxhT1I4LWNpUlY4Qm1wTzI4NXlJMXh5NHdjd0xmbUF1eHZvTTJrNGZCZkM5eE4weDFubjIyNEF3eDRteW0tcTR3ejRsUGpLQmdwbzhzWWV1dG1IaUNUWUUxNkJLVVdtcVJFNXZqMGdDM1M1azROSkdTdXVIRkdmN19aRHhFVVNIRXdhY2dYS1BTZTdJTlhBN0Rmcm9mSk1vVmctajRvWlh1VlNaYmVxRVgwUlQ3X3NSU01FbWtRYWhxTlZ4OUwwaUUzelpSSnotdURQeDhRZnJnYkdHZWZXU1Jya2NOUV9FX25wV3djMExyaWp6dlBjbFZfY1lqWEljT2s1cEtIZFdCTU13c0wtTjR2c2gwUENva2oxcWM3LTZzZDFPY20zNFk4UkRjSi1yU1hLVXhPTk5UUk9CS0dRbm5RUndlWnloTjZnNFU0M2hzZ1BhYXJXbUhaX1ZKcjFrbUQ2Rm1CUy1WX1VuVFhGRVlEVElPalkxemdadmVObnZvUWJMM0kxd0xkVDZ6X0gzMVNkTlVlY1NOSjRXSE5tZ2ZsNDFoX1h5RjJtMzFOcnNrUUtWQ0pWN0xjXzc4QTQ0N01JOWtBUmlVTUUwd1hKRUtKLXdDZWNwbzRPdFNWMWxvMXhxWG5fR1ZMbURBU1VIMVJTdmRTUEJXbERCM05KNnItS0pKWGRXWXdzb2ozTVRwdkEyNlpiRHNBNkV2WkdMdlNOSkxKeEUzNzZjYXc0ZnFXRl9MREU5Z2hJNjVOeUV4cW9zdmI0ZkRIcldPWG1pVXlEbG9iakVLaGVacVFZSVJZRXpuRklmQTduTVVUMWlabkdWX1Vjc0N1ODZFeTBic2hBQWFBWGN1XzVnelo4RjM5eHloN3pFZTJzZGM4SE1NR3JlTm5hUS0zeEltRl9aTW4yWk4xNzYyc0RSdUlXb1czNVdRS2tzSWUxcU05NHAwM242Q1RON0ZWRU45Slh3bXh5a2p4OWs4QWlCYU5iVHFfaDFqV0Vta1dONXd1OTZlUVl2ZWxPNGtuUnRtSnFERXZva0ZpZDBJdzJPTnl0VS1LS2ZyQVZGU0dKU0YxWTFFamR6enFiODd1dktkT2IzamhlRF9DRDBVbWRNREExaExBeGtvUURHX0hZMnMzMWZUNUFQdkVXQU01bkVVbzllN08tVnBUMW44ZE0yZ1k1M3NxM0lsUi1wN3VuSDZFQ3dhajYycnp1clgzcXNzZkF2YkNVYllRbU1KZF85TDVHcmlhV0Z3VFRiT2dwbW5WbV8tT2lBVWdLQnlvMFVvcjlnbnJ1eVdPMEVrRHZWRkFUSjNiYTdTV25WSldTNHY5QXJkLTJTdG9paDlqTnJUdGF6YkxmTDFqQ0huTlVZUWF6VEVHVm8yTjA4YW1GNy1zNUtIWll0aEFTUl8yX01pb1c1WTBPSFA3RDRMRXRhVVVMQV9McW1LYTlNN0dPTnZYN0dYRDBlWDJXa2p3Uzduai1COXlUeVd3Ui0xRHNMdkg0WXE3dHU5WDNxSGpQakJwX3h3ZVBWSWRiTnB2dXItQW01S2FCTzZDSUdzMS0zY3VTQzRMWXliZDZneXlTNDVHRk1HVnpxMHBRb3RGQlp0dXlvQ2g2MjYycU5SaUU4WDNlU29KTE0tc1A5cjJDbkQza2dSTHB1cDY2azNKLTF4ZmVodXBuR19RRGQ3MmJNdlVFNkhHc2d2eEN0VnpLc3gxaThHVF82ZmRKUU1XalBkZlk4Y1c3SmRsRDNGYVFKZ2RIR3VlS3VMUFZWYl8yeVpZOUpHTjU0LW1feDNRZFJVVERLd09VOUdnSlRpX01IZ0ZHYXJFZ1ozMjI4X0xmR3Vtd0V0MXJuTENIa2xwZzBMc3NONXNUOUhFTHFwUE9MXzBwYXFJN01lZ0RIdDAxSVY3endDTDl0ZEhkT3VVZDhPSm9GQWxnRG1RUExONzBiRHliN2R0bWJ0cnYxay1JOC1ScUpFeG5ONXFVdnBTR0N5QTF1T2g5d3lLMWhzcmlmLUx2em1SZUcwd01PSGFmM3NMNkp0emNlQzNJMjZ2bkVmOURINlZMRHQzMHJfM0pOeWM5RzIyeDBVNjIyTzRRY0MxYmdzcmZIQVV0c0htbEhxd1otQlpNeTV4cklwanZLWFN2TXRMenIzYnhTdW1ic0dzQzVYS2owVU96ZS1nLUV1MmFlcVo0SnNObzJfMUQ5ZkM5c0FrSklDa1IwWmY4UDdtaWVGNVRJNlN6eVJCVGdHTEk4cENDOHNPTDVwbXRhMlpiRUdOd1dmamY2NnZ3dFg1cHNaVkZQdFI3NXN6elVsSmMwUW5SSE1jZ3N2cWVWQ3lFMnNEMkMtWHFLTkpnMlVtWWhxMDFIbVZpQkt0WTF1SkNSamNqYW5PUjhVQWRsc2NCT2ZWMklMWDVHVjdTVllyX1BTQkduQTdNV3BVV2JQck0zQVhydVd1SFFlVGxITWpXYUVhMnZsYkJFT1JiMTV4Qk42dnlVU1ZhQm5UUkVzUkdqVzRSTVh5OXhrNXVvczlBTXFKUzZNbDdsd2k4c0cyMmVHbmo1Nnl2b3d3RGJ2ckRSV2w2azhkX1lPT3FTUGdpNnRrOWJqREEtbl9Xb1pGbVVGUlBLa0pucFhzNkZKNk9ab3E3TmNERUJXQ1J4SGtMSHhadUVlRzFfTzNZV0pwVzVaU05ETVRqS3UtZ25OWlk5eVRYNEtBUUJtTTZSNGFKcFJCZDRfdDExX0JzTFZOZGNsNWFjdnU5SUxfOTNuLU1LVEhDZ2lTdlM0bUkxSXdHc0YtS3dMZWk2TUQ5eXQzekw3eWNVbDhqSWhCajJkb2NKZ2ZvREFRSHRZSExST3VtOHdFWU1iWUVlamc2bkJKeVpYWDhEWTI2R3hiTEU5c25rcnhTVWdxS3JYNDV0NUR4MTZMT3lpUEViMXhSQ1h5YkNKbU9seGZ1SEtPanZHMG5BdHVBU0VaQmlQVEk5SHcyTzFsRFFWQVB3VGJWdW9hMUFleTFlV3ZzeC5vbWtNRDUwU1NqSm96WU5weDhCejZn"})
  .query(true)
  .reply(409, {"error":{"code":"Conflict","message":"Conflict while restoring key https://keyvault_name.vault.azure.net/keys/recoverKeyName-canrestoreakeywithagivenbackup-/51c3744aa3c746d1b71070b909d29d6c - key already exists or concurrent access"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '256',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  'e664fc49-6ae6-4c2e-97cc-f47a4ac6f221',
  'x-ms-keyvault-service-version',
  '1.1.0.878',
  'x-ms-keyvault-network-info',
  'addr=122.58.248.136;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 16 Sep 2019 22:22:32 GMT',
  'Connection',
  'close'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/restore')
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
  'westus2',
  'x-ms-request-id',
  '997d5991-61bc-4da8-a7d5-27a34c3444ff',
  'x-ms-keyvault-service-version',
  '1.1.0.878',
  'x-ms-keyvault-network-info',
  'addr=122.58.248.136;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 16 Sep 2019 22:22:44 GMT',
  'Connection',
  'close'
]);


nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fvault.azure.net%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":3599,"ext_expires_in":3599,"access_token":"access_token"}, [
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
  '2431b191-465e-4618-85ad-f51b06d14700',
  'x-ms-ests-server',
  '2.1.9368.8 - EAS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AqHHtZRTqO1ErjxTgT0D1Qmp4MoTFwAAAI0BEtUOAAAA; expires=Wed, 16-Oct-2019 22:22:46 GMT; path=/; secure; HttpOnly',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; HttpOnly',
  'Date',
  'Mon, 16 Sep 2019 22:22:45 GMT',
  'Connection',
  'close',
  'Content-Length',
  '1231'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/restore', {"value":"JkF6dXJlS2V5VmF1bHRLZXlCYWNrdXBWMS5taWNyb3NvZnQuY29tZXlKcmFXUWlPaUl5WVdabU5tRmhNUzAzTm1Ka0xUUTBZVGN0WVRjek5DMDJaalZoWkRCaU5XRTRPVGdpTENKaGJHY2lPaUpTVTBFdFQwRkZVQ0lzSW1WdVl5STZJa0V4TWpoRFFrTXRTRk15TlRZaWZRLklxbDlMVHZvaEJpcHptc3JmYVYzTUlManhSVk0yekVkRDd5V05sUUUtdXRMOVlPaWJpbmxlSzhnQWpsT1d0WXpKYmJFQU1hVmJaaTBoN0dUUzNYN1NJekx5bWI4MDhXYVlCaVc2M0lsUWdxUm50YWV3RGxRQVNEaTctTWp3N0lCR0lyUTE5TW16WmF0ejZ5WHFqMEl1S0pTX0Rrd1NXOW5sRzdySU9kQ2dCTUJmVl82dWxZbXc0N1JtLUZNMVljMHoxNXp5WmEtSGc5aFBNTEh3cWd2dUx1YzdPZXh1dm9tTVJ0T3JaUmlOdzNraWhtVnJCNGE2SUt2bEEwc1pHMktURjJQWGcxRng5TVlaTFliWkh5Ym1pZlEySUhVdnBrMEVCZ2dwOENHLVltNlk2SWVvSnEwZlJFVWFZdVQyRnZIN0NtOVZzLWZneEIxZlBwQUt5RHppUS5lSVVBaXNoTmV5X1h0Tm11cU9pOVpBLm9aMFNvRUFab0dwSEpRcEdqNHhnNGo0S3lOdi1mcmt3eXh2QlB4U24xRkFIT2ttMlRRdjJ1TFBCaHRiUUZ5ODViUXJuY29lXzFDZThDdXlPcUxIYndoakJSVmZ3R0lxV3ZBWW82UW83NTF2WUxncW5taTFoUFctYUFfeWF0Q3g2VkpQMXRuNS1rdmlaT0hlU1E0WnF0R0d5VV9jWkdMY1ZBaWtMUnRxQ1FTeWhYLUtsNmJlWFh3TFJUa3IwTmhwZ0xvQmJ5d05mck04WHRBbEZjUS0zVnh1NGo4S3RHRHBFenh4elhhRHpubVVELU5rMDEteVNRSGd3ZUFOWVh3ZFJNdzFfRFY1QzhUOW81ZUxLaXVZWHA5TGs3RkdrZUJOTWNKaVRjSEh0REU2VTlxVVNMYVdzNFUwcjliMGJQT3lWT0xfVWs4YzRaanBxSm16Z2VGVzdVZzBjZ3RDVFdsY2pETDNKWjFoMk5GdGJwLTNxU2k3c0VrRUZVaUUwSVAwUWFUWV9hWFZRU0JrOUZpUFBwTnJQUTZwbGlWYkEyVzdJekRrM09TRGdLaU5DUjgtb284ZzdEeGtOay1RVURkdHVaM3JabV9VeTY4clZYYl9ET0xlNkxFTTEzU1B2MzR5OGxzWW9DRnVRUFA2c3cwRVRwZ0FScWJBRnRVR19PcWJKVmlrdHphODc3THZ2NlQyblRrOFBmY29sbjJNNmZmNnhUd0k3S2pkZVFoV3g4MldhZDVVVlJGcVlqd3UzQ3ZPZUxMSWtHb0wwS1h2UlY1ZllaRlFjOGtvLVZIYmlDVHk2Y3ZUU09uZER2Nmd3Nmsxb21aODRNQ2RfZFNnSHlCSkRzTFdXWmt5Nm83RlU1bTJGclRESzdCSkxTejBldGg5VjNEdEVTRGpjYkY3elBQZ01lLWdJWDNSRVRUbm0wLUZWX1cyQWgzUThmY29SUDBJMW9TMG9mdkR0dVlkSEpMQkd3VE92YjhkTUxUVGN6OU05QTd3clZqblNNbHZfekQ1YTZKQWtEdXdOS0VTVW8tNHItUVFsVGpMVTI2dWlBdWpuVkNxNVJNYjkyUzg3UzAxTWxwblBuM3JlN01sWDlWVXhzVmNVNjExT2JvN05qUzlIOHQwZC1iRFlKY19KNUE5S3pMZjlMQkVKWjl0X1JhSThXcDl6MVE0UXB2UlFaVWw1cnZfRHZ1UHRVbnU5eTI4S1dMTUJHN2VSb0xSMEFjWkxQWWNydEdsQkxaRVV6NFpMR2JVVXhwS3ZTazQtQjllS1RuZEpfenZUTUVUTDMyLXk4bVlONWYzVkEySHpvTnp3Szl0SXByMThkN0w0bHBQS3FSRWVJMU5wd1JwUTZHcXpLeVliRmZTRHFSbVZYUmhtYnFDdGxxelBDLS1PZFRQU2ZWSWZJWmNuZW9MTzhUWVMxbVZHZmV6ZXI5dHZTMU12WFhCUl8zZUFpU1JSbjZzVFdudG4tQ0F6TUp1VTNZUDVkcjdoUW54b05LM0hGVTRCQWtKUUpmcDdlejg4eEU4YldVQ0F3MzVSNDF6YVM1ZjlJSE0yOTIzVEdEZHgtY0QzT1NxY1JyRW5KR0R0UVl2OWZvWVJQUGsyRnhlUVpUekpXaXRTZmpkZXdhVndTQWdseHFDSVNtZnQteWs5V3ZjOE1jb2RuMGs5N1VpUzVqaXNjVG1paDRIYVhVUkxrUUN6Sm5aRFpzMWY3VDdHNFBlbnJCZ2Q4Q28zdkhGQzktRXctaVdOeElseHBCTFhva0lzMDMwR1ppa0pEaGJhRXVoQ3FCZmU4V1NORUttbmhlYWFmc283WVoyc3otTDJTUHRsY3RYc0tJUXF3bEVicEh4Sm1WdzIyWW5IbHR2Rm9BY19tOEJZUzdYS1gtbmtDNlNtdTdZenhNc0FsZ2drY3QtdXFGNTZNMVZSWkRfU2dCRkJXTW1wLUU5R0pVbXRuZGNlc09SN3RyTXhGd2w3Tm9zUjBHc3hyRXRRQTQtVGtFdzVWWktiQVFLNXloZldVM1BIdUNSQXFKaGdPankzOXVSSmcxak55eTcwd1diXzFTTmpBeXdIVG5ZcFhXd25ueW1pUnVRYUtBQkVWMG9UQ2dueVRseG80UmZjMXRBXzUxbGstMExtRkRWV3VlTGRBNjQ0U3VtTE9ia2U1SGRTR3FmbHFpUjJ6MTJaekVBeG9KdmliRUNkTmFXUXNGUWpQRmJtSFN4UGlsQTE4WXIzODctT1g1dEc4ZFlSVFpjVHBGRnJPWGpDVVNPVm5YU3F5cmxvWVJIbnQzRVgzSGFkbElnQUtLVFd5TmV6WmUtZE1LMnJ1MTd2eTdMbGpsTDF0OGpoRTh6d3ZILWRjUkZsX0R5eXFGY005LXMzempfM2lnZGdzUklLRV8zdWJyekJvdGJ5R3hBUm9mTXJKWU9TSmdTelZWSzdySVZuaXo1TEpQTE0xanNIUVBDTFViRmhZUXBDRXZaQzFqR3FKbHBFQmtFQ2hhWll0cDNDVUJ1QU5DTUtUN3hrbkdmcW02bG5SZ1FDWV8zSUFvcWVqbWZVTGROZ0ZROEptTldNZ0Y3MFdOYXo0aV8yNVNLclZ5VWpGSUxRQkNHTUJ6M2xGanRFUXM3anZ1UktqUEREc3VVWUVUSGtDeTNQMnVKcFpnaGdnZ2tVVVhyNDNUMU81N1JydktVZXkwQ09Yc3FDeUh1cEY1ZlpuUkQ0YlhmZldrZldCQVpYUkdrMXFfRUFTVFpxQnRQS2Z6Wmo4T0lrT0FvWkVPSV9saS10N1JnMDBJVGRFSENJT3RsYjJYY1JBSzRuTVU3RVlOMFE2anJVT0dReWlaVEowNnVhQ1Q4MlFEZm9KOENXWmNIaGZoUGZlODBmTHZXLU1LTEZLY0p4bVZ4eDhTWWhwa0xUYUgtdERoQVJJdmFzWHlvRGdob05EYjlZOXFQRUZjTTUzbkJKRmdTZEVpUFZLWHQ5enQxMVM3cFVCamN3NkI0SFEtRGFPUk5XVUphLXlsbTFBbnhQWXo3SHRURFVWMXVEeXQtM29rSTNXTzVyWnNhMjdyVzZ2RXBPVzM3VkptU1VNQVdWWFNpSkpLRTdXNU1XeXdkdmdlbFQ1SXhFeW1BT1pkaGFvQmI3cFNoMXViSDNjOUNKX2lsOV9tSnZVVTNLNTBoVkJOTFQ3MjZ5bFNLaVNxM2I5RlM4Si1ZSV9TVllsNUpSX3NHbS0xZlRrSWRyQmtWY1BJR0lJQ1F4c0t6SjFCNHpOSnlBeFRKSmFaV3h2djU4eTFSMWdiU3VzNV9mQXVrZ2hrMTl5b1l0SnlQalpWYjRZYkg2UHlKakhOVWQxcXktLTdtajN6X3NIMk5sSkdIWG1ROXUzdHhTNmFfWERQWGhpQXJVTDU3S21wdU90MWgyNjBjbDVVRm5QLW5CRnpsVHpyWlV0M2pfeEt4V1gtcU1nMWM2ekhEOTRVbVQtT2FJUzNabVJIU0ZyM004WDcyaGZnVktBaGlqendtOUZZRTVOaXk4cmJkeHExekMwU3RlTi1YNm5BakNwNVUzME12VXhMSlVlbjRVSktGZ3hraXNQYTdCeUlrT1p6emtTWTJveldUcjlCTkpLWTJIRWI1LVBsWFlfaDBjZHNueXg3SExFMzB0aVFvUG1RNzB6dTZNVXhObGpMX3BGaWplbWpLbnlSd2xySmhybTN6cWxUdGgxQnliYlR5ekw3WHVVd1UyUkRuWV9HNmJ0MXFPNnIzVENyNjIxS0VYY2FSdEhaUURKVmRrWndFWjNXdGV5OWNHcDB3ajlOMFhLTV9fZTJRS3JtQkpwWnF6WFV2emgyUjY2QmczMVBTTzRoWDdkeGFlMmlIZTZBTmxvMnpUT3lOeVVmM0k1Y2d2MG5rZ2J1QkVxSzdNbzZKRmlxMEJxS2dRc19NSTg5bEtFOG1nZ2wtcERMVzJLU3QyRk9YeUxKcV8tc3JfaExwQkktaUhJbWxlV0FwLTdhTENBRDRkWWRHdXdoTEJvRmUzVlhTcTRnS045SWwzWF80TWFnMVpLVGs1cmVacy1PY0lSWDZYa0RRVmgzcGtEWkhjU25IdTJldExJMTZSSnNFQzVZVjJzUjdFWTgtNWNZY3huNEZDYW9wNVZ5UmItekRuX0tLaHZaOUsxRTV0VEFUeDJSUVB5MVNiMW5paUNuRkU0Q05MdGtXMlZRU2RZNFYyMjZYcHFsWmJ0NTZSTHBnaXNQQjJPRzhBd2NpY1phS2dwc3hLcmt5cTAxVjlpYkJsZ1dGb205a0tSU0hZRlFCX2RrMVpmblB2LXVXakR6NjRDWjlPUjJpYXI5VU1odkJNeklSdlk0UkRVMFRHZFdoa3F0eXlGS21CZEdWd3pleTFFekx3WFZXTEc4UjJySjlNRWY4LUZOVXdRcDZKVmJ4clpmSGZXOTlpb0w1SEVqQ2hwRU1lUkRfdmNRYUgxWFRqbmZ1RE5wVk1OTjBFWEs1MnlyV2oyZWN5VDhiWU94cU00QS1hbkdidW94aXc3NGxtMjh2eUJoMzd4UzM4RHhxX1JlWkJQdi03QUR3TkhnQy1tQlRyM3E4R1dBaURuMjZleEtBZDdHQUhPOXZFbHJUR3lkRktsSmVTZDJydllUd05NYXJ1Q2JfSXRwNlAzc3VNUF93V2R3T25RUEFMTVNsbFRYSHgxS2luelB5ZjYyRWltNlB3TGVJNVZEWnctYjZFakpzOWFReXgzNEFxNFlWN3l2QUVKTndWQnBSWGJaUkMwNERLN2poQUZhblZ4dDE3VmZJU1pnZlJjdDdnM2pKOTVISkRtU3k2UGpadVlXV2FzT0R3c2k1QnJFNFhITlFJbkFPd2FTVGh0YlcyQ3hXaGJ6dDA5RVdsRDRNbW5TRFpVdTNFbllCcXozYnE2bWNaOVVQVFpBc3VaRnBNX2NQWFhRcGJCeXJjd0tnMzBoWENZU0J4Q3l5VkMwd3lKTWRzVDYwRVFaa0Jna2pKOEYtMFRMTXU0bnVtZllWTGluRkw1RndnbHhCUGptd0htLVBaLWQxUXRzd3d2c2FpS2JEaVJBZ2tqMmJyMHZXNnFLWXJkNUNpOHJjcHVEMmFtTXprRTgxRFh0aW83cXR4U2xBbVhsaWFLVWNRTXlDQTdkM3RxLS1qV2QyU3pSVlBLbGlRWjFHdWxXeGdkS0V2ZENrNlZ4ZGJiTXNFM1d6R08tOUVWZ3RUbm91dG9ieWxzd0pzRHA3SWdfc0h6MTdyelhzUUMwVG5VT0k5SUlicGpGYXNhVnA2NlI1LWFJZXF5UUpGR1RCODA1ZDRPUG44akwwRDBxU1JWamNwM05qSERmR2p5ay1VeHVUUTY4dlVub2ItS003c0pLREdzazQtMDZYX1d5dTduM0dfSkc4RzdsX2lwbWxUc1F1Tk4yUmVZRWVucXBsZ3ppLWFhRkNYTjd6N3NpRHNTbVNxRWlSckZFc0pqems0WVltdEVZc29lLTQwNkZzTXllVEVZLWtqTXNzSlZfSVloalpET2dTQzNJdV95cUZoZlVaRmd1UkNGOFNqaUVDN2VVTXRMZGphN0hCajgxQ25kbnBTR2lfMU5IV3ZONkhyZDFnaXNVM1RETzEyVjdkRWRNOWxhbmRYRzdQTy1pQXp3T3hLSUpEakxQaE1SeFoxT1RkTm5pSFlwaVdpQzViWmZmUkRraG1icnFudl90RFg0QXpSejJTblhXSWRSSGlnMkllSFZqTlYxaGVpejR2aHROaXRNcWJJYmhvVFRUNFlxenF5UV9ncXUwZU5aQ2I1SUtHc2NMRS1WMmJTdDR5bF83VDQ0U0xJem1VMzdVaDltN1pMU3BEOEh1MFFYbnQ4ZFNWbDRFa1dQc3ZUSEpJcUZtQ1pjM1YxS0loeVdzV3FuV0NsQWNUUzBoUGhwUlNXRlVVYjhoa3ZOam95SmFvVlVVY0lCRVBfVXB3N0VtMzgyYTJfZ2lROXdkdmdzcXgtNVlxSWQ4RHliYmZER28tcGNWdDFlczFqNm1FVTJlTVZBMnVPMFpKNUJMalFzT05TQWJmSG1CN2JHT05MNHUwaFJoZk51YThLYzBaMkN4bVBjSzYybU5EZ1Y4RkpmVENVOUxiZmpEWmVPS3o1ZExRTWtpREJLLVNoN2xIUVpmaWl6aFRMZG9pMDlyZGF5bXUzZnlRbEdpQXRGLUhBdUNyN1RUOHd5Q2w2YzlrcGJnVlhLb2JiYVowRXlySUdVeTdKQXRuNEltRllxUUpNdHNOTVl6SjliQ1JRTHB5WWwxVmRQM1FVRHJFQVF3UkhWVzVuN0gxVjVhSjlQelRYTGdPcWxRN0hLNEUwVjBYZmtFVlZTc1N1ZkF3VWZkQjN0VFY3TS1WVm5fYjcwZU0wdXRMaC1wRFY0bUVrdVBCb3pCWXJ6cUtSbVRDczlIYU5WazZtZ28ySjBpYy13UDVjX3Vvemc0elBuQmJjSld3QUJST3BmYlRBMDJISGZ1SGE0ZVVySjFPM3F1bC11SEJramY3NjJtNlgtOHlCV3YwOVlPN2gzQ1AtMzU2cFl0UkdVQnRnbEZlLVBSSVAyczRrMkVMVTBUNEZTVVRnN18tYklsVXRBcDhlblBiMk9vZWU4RVB0d1hYNG9qNWxtUDFOaE5YT3d4OG50SndwNlZieDdJdzBja0ZFSHhiOFZmLVVXRHA3cldfY0FNdG5RZndpSzV2N2VGYU96NjNZS083R0RnT19XdGtaX0pJbzRkT1JhYmlEemlyaFNueEljb0RTRkV3MzViN2lYNnVNOEtEaE5oc3JpRHFpQWtaMTRaNzI0V2NlS3pIWW1PMndwcEZhZFJiMmtUWmhjc2NCWTFtMlFJbG9qMThDcjZ6MUplOWlYT011S0tMd0k3R0c4ek1Ta3IwZXpDTGloa3lhQXFYV09rQWV1anNjc0RJLXkyQmRROTdjSGFEWFFxcGloME9odEVWcnhURnRGSVd2aUJRVHk0bHlhLThidjB5RjJFSlBJMmlkcm1JellOSElkU0ZqS2lPUFVKZ0lIQk1idkZaSWdLbUdkRm5jdFNRd05BT3VhNDJSNVhZZ1ZjT0ZJVHFlWG5PbWQyc1prd0wyYXg0Z0tZelNGbUVDbklaeGFWWEpMZXR1cjFfclRMZEZpdEp4V0djT0Zkb1R0TWdpUnVVaHlZc0taSUVPR1pJaGJoNEROVGQwX3NsZmphWUl3X2lkaDdWU2xhRHhIQnRONm1pb2czTDQ0VHk0NGFkNmVtcDRKVk9OLVc2SVFZLTh2T3RTbWVZUVF5N0k0MEQ4ZWdxRzVlSTFQZFRrNlZDOURWUUNjN2s3YWpqcG1rUGdXVFNjcnZ3ZFdXWGJBNVdWMHRFVU5QdlZ2YlJjUVdFbGNPYjYyV1pfNEQ3V3JxV2ZWeDItSS04VEptc1Zudm92SnBSM0ZMR1liQVhEQkFTekQ2QlVIS1dlUkhBMVhrWkFvZG91S1RfYURiWTZDTlhVbDdZQng5alRjWnBxeWNsSGIwTC1oLVdiRUgxOGRjR0M2SEZRVVhoQjB5YzAzcWJraWFTSWdTR1hSWmN6ajlrOHNIYlVpV2NiY2pfc1Fic3BGOEZNaFRpN0pZeEViTjBxNmpja0taVTAyaDFUSnNPYV80MV9uZ2tyd2dsd1h3MlpkNzZqN3FzVENiUnFWQ01JNWFUVmp6bmFZRE9xZzkwYVdYTHRXbno5akpUdUlxN3daamdKX3F0b29JRDIzazJwaERKOEY1T3VoaWhYQXNTR01JelRZRjlUa2FQRUhKY0Y0MEl6WFJXX0RWRkxyX19PT3BLWm16OXAxTVhpMnRldUpUR08xajFnYWlRTkdEeG50UTdjczBWNVhQamkyM1JRbWlKdFE5WFdEaktuTUFfd25xR3E0YzNqMHRuVjF0amJHNjdEZHprdUlWVTlMYWg0RUhpSVQ1MVRpRVdNM3pTanBDMjR0OHBYcFo4NmJRMHJ3WmZnWk1yREgyaVhJVnNvUVAzVjB0bFp3UFVJR3Q2YUxIcWhCZ1NrRjFkT21YUlVYQzZlbWJCRmVFTzFJZDlpcHVId1NienAyRmZfamdEZ2xZS2FRcm12elhvR3NhbVNYdFhiY2VKejVUSmVWQmJsT3BZUE9tR19uX214Nm9WNWd6ZDBjRzFsb3dUN0EzZDlZNnZZaFF6WDMzM3hBT2Z3ZWJIWWN3QVotb3gyaWtoWnRPUWJZeFZoSUtXdVNXSklzaHBQaDFaY1BEMzBWQ3RnSGJTVk5pbi1vdGtuclBsRzdRQmFlbzJkcnVKRFpBYkI4WGQyYVppOHpwLS1kTjhleXNza1JON2pZUDhvb1I1aGNfNWpWdG51X0FDMUkwVHJVbnZYaFpXMDBIS1lIcUVIQ3NkRk5QY2Nxa3c5VDREMFlUYVNUay1XdHhwb0J4R0h4YjdfbGxlWmRkR1FNa3B4bTk2cnBXajVVY1VpZHZTamxCblh3Q1hEc3FUV2RWT1lYVWdxY3Axbm5NQU4tbkpWbF9LeHdaRzdPM3Ywb0ZIdGswVzZqNFhhYkphRWU3M3JwRmM2Y1NVODFPem1hNmhDeTZDQWxrM1BESUl4YzBxNGpNRWRmbThqZDNzeE5RNC00TGhrUlFEMWFzWGZ4SEwyNURLNEhsckZxUTQ0MGF4N19wVGVpbEJrYzBocEFBQUkyeFRMdk9rX1NQT2VpdjI5eXZsZFo4eGxLTHdqU0E3UEFqRjdKUUlMNmVrZnZDMnExUjM1OGh6RGNLalotcHVrckZmRGpmbk43dk54QlY4bHJKcXZlLVR4TkptYUFmUm9Nd2lRVjhseXd1S1ZoVnRkNnZMaEFvSjF1X1AzeUFnWk9Kb25lR3FfdUFOdnAxZFotcW5DU3JOckl4WWVSM3hmQzAxSFBtRmZxX2RXckh2VnJJZ3ZfTW52aXRDSDVJLTlnSS1QMzZpNlJwM2Q1V0V1QW1Qd21kWTJwTlYtSVlPNFFkLUk0OU10ODk2UkptT1RiWjdjZkFCQTl3TVg1WThWN2p6S1hqcW5tN2dBbGx1NUh1SmhROHhaZFB1TUc3cDBuTnhySjhTOWtsSTVqamVhNUs3LTlPRXlydVFXcVhmSGNYTER6Vm9CWUlIal9VUHNubm84SEhOanhrZHRNZ2hmRFoxV21PaFV2SC12YzVfVTVCWjY0Z3A3bHpqSDRyLUNlQTg3Q1JEc1R6THdIVWxrODl0Qm10OUExcGRIS0lJMlJfTkxiMHlLSVRROGo3ak5kMTEyNlZWa0x2amprSnVZVlI4SVpRV2V0T3dLQXktZTRiUTB5eHoycG0tWGd0SThZdTFBMHFNVXdwcUVJTjY4OThEdVFzT0xWajd5elFaY2h3ZVhyY25UTFF6TjhhcG1wWDdFb0pWbHNCMU1jMmhpX0czSGZDbFh6RDUxMEttQlZ3VExOZVVrOWVVdkpxOGZuaDlleTRLakhEWTdkdnBIR2ZHMTNRRE9zR1MyUUhmZHRZdUZ1cjZsZ2xpb0hkaldsWElLQlBFTUxsWnRIdGRFQVQ0ODhxN2FnY2FBaHUxY3puRnZiSmVSbjBzUXRtUHpTTzJkRFNiYWJ6Q3hvODdFSC1BdTNVUTNHTXJNUldIdW8tTXdXVEVDekJOSUZVU1RPQ1B1VkI0OWY0d0hPdFR6Mkt0YWNBQUpoUFBDcUdVNmNIVFAxQk5KdXl5OTVldWRKQnJ2b2dCZ1NjajZVcmZLNGJSQzliRk92QWhUNU1fcUctaTNPb0Exc2tNbHM2bHRCNVpCOUF1M3pIVFZEOFJZUXB0ZkxhT1I4LWNpUlY4Qm1wTzI4NXlJMXh5NHdjd0xmbUF1eHZvTTJrNGZCZkM5eE4weDFubjIyNEF3eDRteW0tcTR3ejRsUGpLQmdwbzhzWWV1dG1IaUNUWUUxNkJLVVdtcVJFNXZqMGdDM1M1azROSkdTdXVIRkdmN19aRHhFVVNIRXdhY2dYS1BTZTdJTlhBN0Rmcm9mSk1vVmctajRvWlh1VlNaYmVxRVgwUlQ3X3NSU01FbWtRYWhxTlZ4OUwwaUUzelpSSnotdURQeDhRZnJnYkdHZWZXU1Jya2NOUV9FX25wV3djMExyaWp6dlBjbFZfY1lqWEljT2s1cEtIZFdCTU13c0wtTjR2c2gwUENva2oxcWM3LTZzZDFPY20zNFk4UkRjSi1yU1hLVXhPTk5UUk9CS0dRbm5RUndlWnloTjZnNFU0M2hzZ1BhYXJXbUhaX1ZKcjFrbUQ2Rm1CUy1WX1VuVFhGRVlEVElPalkxemdadmVObnZvUWJMM0kxd0xkVDZ6X0gzMVNkTlVlY1NOSjRXSE5tZ2ZsNDFoX1h5RjJtMzFOcnNrUUtWQ0pWN0xjXzc4QTQ0N01JOWtBUmlVTUUwd1hKRUtKLXdDZWNwbzRPdFNWMWxvMXhxWG5fR1ZMbURBU1VIMVJTdmRTUEJXbERCM05KNnItS0pKWGRXWXdzb2ozTVRwdkEyNlpiRHNBNkV2WkdMdlNOSkxKeEUzNzZjYXc0ZnFXRl9MREU5Z2hJNjVOeUV4cW9zdmI0ZkRIcldPWG1pVXlEbG9iakVLaGVacVFZSVJZRXpuRklmQTduTVVUMWlabkdWX1Vjc0N1ODZFeTBic2hBQWFBWGN1XzVnelo4RjM5eHloN3pFZTJzZGM4SE1NR3JlTm5hUS0zeEltRl9aTW4yWk4xNzYyc0RSdUlXb1czNVdRS2tzSWUxcU05NHAwM242Q1RON0ZWRU45Slh3bXh5a2p4OWs4QWlCYU5iVHFfaDFqV0Vta1dONXd1OTZlUVl2ZWxPNGtuUnRtSnFERXZva0ZpZDBJdzJPTnl0VS1LS2ZyQVZGU0dKU0YxWTFFamR6enFiODd1dktkT2IzamhlRF9DRDBVbWRNREExaExBeGtvUURHX0hZMnMzMWZUNUFQdkVXQU01bkVVbzllN08tVnBUMW44ZE0yZ1k1M3NxM0lsUi1wN3VuSDZFQ3dhajYycnp1clgzcXNzZkF2YkNVYllRbU1KZF85TDVHcmlhV0Z3VFRiT2dwbW5WbV8tT2lBVWdLQnlvMFVvcjlnbnJ1eVdPMEVrRHZWRkFUSjNiYTdTV25WSldTNHY5QXJkLTJTdG9paDlqTnJUdGF6YkxmTDFqQ0huTlVZUWF6VEVHVm8yTjA4YW1GNy1zNUtIWll0aEFTUl8yX01pb1c1WTBPSFA3RDRMRXRhVVVMQV9McW1LYTlNN0dPTnZYN0dYRDBlWDJXa2p3Uzduai1COXlUeVd3Ui0xRHNMdkg0WXE3dHU5WDNxSGpQakJwX3h3ZVBWSWRiTnB2dXItQW01S2FCTzZDSUdzMS0zY3VTQzRMWXliZDZneXlTNDVHRk1HVnpxMHBRb3RGQlp0dXlvQ2g2MjYycU5SaUU4WDNlU29KTE0tc1A5cjJDbkQza2dSTHB1cDY2azNKLTF4ZmVodXBuR19RRGQ3MmJNdlVFNkhHc2d2eEN0VnpLc3gxaThHVF82ZmRKUU1XalBkZlk4Y1c3SmRsRDNGYVFKZ2RIR3VlS3VMUFZWYl8yeVpZOUpHTjU0LW1feDNRZFJVVERLd09VOUdnSlRpX01IZ0ZHYXJFZ1ozMjI4X0xmR3Vtd0V0MXJuTENIa2xwZzBMc3NONXNUOUhFTHFwUE9MXzBwYXFJN01lZ0RIdDAxSVY3endDTDl0ZEhkT3VVZDhPSm9GQWxnRG1RUExONzBiRHliN2R0bWJ0cnYxay1JOC1ScUpFeG5ONXFVdnBTR0N5QTF1T2g5d3lLMWhzcmlmLUx2em1SZUcwd01PSGFmM3NMNkp0emNlQzNJMjZ2bkVmOURINlZMRHQzMHJfM0pOeWM5RzIyeDBVNjIyTzRRY0MxYmdzcmZIQVV0c0htbEhxd1otQlpNeTV4cklwanZLWFN2TXRMenIzYnhTdW1ic0dzQzVYS2owVU96ZS1nLUV1MmFlcVo0SnNObzJfMUQ5ZkM5c0FrSklDa1IwWmY4UDdtaWVGNVRJNlN6eVJCVGdHTEk4cENDOHNPTDVwbXRhMlpiRUdOd1dmamY2NnZ3dFg1cHNaVkZQdFI3NXN6elVsSmMwUW5SSE1jZ3N2cWVWQ3lFMnNEMkMtWHFLTkpnMlVtWWhxMDFIbVZpQkt0WTF1SkNSamNqYW5PUjhVQWRsc2NCT2ZWMklMWDVHVjdTVllyX1BTQkduQTdNV3BVV2JQck0zQVhydVd1SFFlVGxITWpXYUVhMnZsYkJFT1JiMTV4Qk42dnlVU1ZhQm5UUkVzUkdqVzRSTVh5OXhrNXVvczlBTXFKUzZNbDdsd2k4c0cyMmVHbmo1Nnl2b3d3RGJ2ckRSV2w2azhkX1lPT3FTUGdpNnRrOWJqREEtbl9Xb1pGbVVGUlBLa0pucFhzNkZKNk9ab3E3TmNERUJXQ1J4SGtMSHhadUVlRzFfTzNZV0pwVzVaU05ETVRqS3UtZ25OWlk5eVRYNEtBUUJtTTZSNGFKcFJCZDRfdDExX0JzTFZOZGNsNWFjdnU5SUxfOTNuLU1LVEhDZ2lTdlM0bUkxSXdHc0YtS3dMZWk2TUQ5eXQzekw3eWNVbDhqSWhCajJkb2NKZ2ZvREFRSHRZSExST3VtOHdFWU1iWUVlamc2bkJKeVpYWDhEWTI2R3hiTEU5c25rcnhTVWdxS3JYNDV0NUR4MTZMT3lpUEViMXhSQ1h5YkNKbU9seGZ1SEtPanZHMG5BdHVBU0VaQmlQVEk5SHcyTzFsRFFWQVB3VGJWdW9hMUFleTFlV3ZzeC5vbWtNRDUwU1NqSm96WU5weDhCejZn"})
  .query(true)
  .reply(200, {"key":{"kid":"https://keyvault_name.vault.azure.net/keys/recoverKeyName-canrestoreakeywithagivenbackup-/51c3744aa3c746d1b71070b909d29d6c","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"0B4rxsqzT_PSoJq8ldR8FHYXWHzKFj6M2r0ylvJgkBUAVQCraqTtH5RW6BQ6Km3Gu-jwXh2WW2eFmCz6qafO2pqp2Dy-QDE2gIZT6aaZGaWz_JNiiIakb_1jIYSGMqYaJlrcvgaraX5sAfHUm0cxm4EbVnvXRFWtFs7_qBKu3P_oamOyS_gSjsbOsyiDjcHRAtBD2TnLYjSYKeUbazRTmvZOcuFTYK4_-8b6Q9j7bqQwKpsbT6bB4B4DlI_CkxstM-d4LPtF2F5G0ejnMJcPAfEaLP_7cgT2gdKecCT1by4DVyTkekF6Ce16QqxOrsR4CIdqgC7TBgTBwWvyUa6baw","e":"AQAB"},"attributes":{"enabled":true,"created":1568672529,"updated":1568672529,"recoveryLevel":"Recoverable+Purgeable"}}, [
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
  'westus2',
  'x-ms-request-id',
  '4f1395bf-d18e-4299-a908-929ce86c9b02',
  'x-ms-keyvault-service-version',
  '1.1.0.878',
  'x-ms-keyvault-network-info',
  'addr=122.58.248.136;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 16 Sep 2019 22:22:46 GMT',
  'Connection',
  'close',
  'Content-Length',
  '715'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/keys/recoverKeyName-canrestoreakeywithagivenbackup-/')
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
  'westus2',
  'x-ms-request-id',
  'd3b2af0e-e1f0-4d37-93ad-b2fd23923867',
  'x-ms-keyvault-service-version',
  '1.1.0.878',
  'x-ms-keyvault-network-info',
  'addr=122.58.248.136;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 16 Sep 2019 22:22:48 GMT',
  'Connection',
  'close'
]);


nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fvault.azure.net%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":3600,"ext_expires_in":3600,"access_token":"access_token"}, [
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
  '17ecb9f4-a911-4dd9-b142-1175173d4a00',
  'x-ms-ests-server',
  '2.1.9368.8 - SEAS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AqHHtZRTqO1ErjxTgT0D1Qmp4MoTFwAAAI0BEtUOAAAA; expires=Wed, 16-Oct-2019 22:22:49 GMT; path=/; secure; HttpOnly',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; HttpOnly',
  'Date',
  'Mon, 16 Sep 2019 22:22:48 GMT',
  'Connection',
  'close',
  'Content-Length',
  '1231'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/keys/recoverKeyName-canrestoreakeywithagivenbackup-/')
  .query(true)
  .reply(200, {"key":{"kid":"https://keyvault_name.vault.azure.net/keys/recoverKeyName-canrestoreakeywithagivenbackup-/51c3744aa3c746d1b71070b909d29d6c","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"0B4rxsqzT_PSoJq8ldR8FHYXWHzKFj6M2r0ylvJgkBUAVQCraqTtH5RW6BQ6Km3Gu-jwXh2WW2eFmCz6qafO2pqp2Dy-QDE2gIZT6aaZGaWz_JNiiIakb_1jIYSGMqYaJlrcvgaraX5sAfHUm0cxm4EbVnvXRFWtFs7_qBKu3P_oamOyS_gSjsbOsyiDjcHRAtBD2TnLYjSYKeUbazRTmvZOcuFTYK4_-8b6Q9j7bqQwKpsbT6bB4B4DlI_CkxstM-d4LPtF2F5G0ejnMJcPAfEaLP_7cgT2gdKecCT1by4DVyTkekF6Ce16QqxOrsR4CIdqgC7TBgTBwWvyUa6baw","e":"AQAB"},"attributes":{"enabled":true,"created":1568672529,"updated":1568672529,"recoveryLevel":"Recoverable+Purgeable"}}, [
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
  'westus2',
  'x-ms-request-id',
  '11618e69-0b32-4104-a5eb-a8872eaf1977',
  'x-ms-keyvault-service-version',
  '1.1.0.878',
  'x-ms-keyvault-network-info',
  'addr=122.58.248.136;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 16 Sep 2019 22:22:50 GMT',
  'Connection',
  'close',
  'Content-Length',
  '715'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/keys/recoverKeyName-canrestoreakeywithagivenbackup-')
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
  'westus2',
  'x-ms-request-id',
  'd774a73c-1e4e-4b12-91f2-d0eee15d7fa9',
  'x-ms-keyvault-service-version',
  '1.1.0.878',
  'x-ms-keyvault-network-info',
  'addr=122.58.248.136;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 16 Sep 2019 22:22:50 GMT',
  'Connection',
  'close'
]);


nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fvault.azure.net%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":3600,"ext_expires_in":3600,"access_token":"access_token"}, [
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
  'd4fa53a1-52cf-4778-99f4-5c8fbd124a00',
  'x-ms-ests-server',
  '2.1.9368.8 - EAS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AqHHtZRTqO1ErjxTgT0D1Qmp4MoTFwAAAI0BEtUOAAAA; expires=Wed, 16-Oct-2019 22:22:52 GMT; path=/; secure; HttpOnly',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; HttpOnly',
  'Date',
  'Mon, 16 Sep 2019 22:22:52 GMT',
  'Connection',
  'close',
  'Content-Length',
  '1231'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/keys/recoverKeyName-canrestoreakeywithagivenbackup-')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/recoverKeyName-canrestoreakeywithagivenbackup-","deletedDate":1568672573,"scheduledPurgeDate":1576448573,"key":{"kid":"https://keyvault_name.vault.azure.net/keys/recoverKeyName-canrestoreakeywithagivenbackup-/51c3744aa3c746d1b71070b909d29d6c","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"0B4rxsqzT_PSoJq8ldR8FHYXWHzKFj6M2r0ylvJgkBUAVQCraqTtH5RW6BQ6Km3Gu-jwXh2WW2eFmCz6qafO2pqp2Dy-QDE2gIZT6aaZGaWz_JNiiIakb_1jIYSGMqYaJlrcvgaraX5sAfHUm0cxm4EbVnvXRFWtFs7_qBKu3P_oamOyS_gSjsbOsyiDjcHRAtBD2TnLYjSYKeUbazRTmvZOcuFTYK4_-8b6Q9j7bqQwKpsbT6bB4B4DlI_CkxstM-d4LPtF2F5G0ejnMJcPAfEaLP_7cgT2gdKecCT1by4DVyTkekF6Ce16QqxOrsR4CIdqgC7TBgTBwWvyUa6baw","e":"AQAB"},"attributes":{"enabled":true,"created":1568672529,"updated":1568672529,"recoveryLevel":"Recoverable+Purgeable"}}, [
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
  'westus2',
  'x-ms-request-id',
  '316d7cd5-2816-42fd-8f4f-5233ec8bf5a2',
  'x-ms-keyvault-service-version',
  '1.1.0.878',
  'x-ms-keyvault-network-info',
  'addr=122.58.248.136;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 16 Sep 2019 22:22:52 GMT',
  'Connection',
  'close',
  'Content-Length',
  '905'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedkeys/recoverKeyName-canrestoreakeywithagivenbackup-')
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
  'westus2',
  'x-ms-request-id',
  '781f7b64-d9c5-4375-a93d-a7fc1b15611f',
  'x-ms-keyvault-service-version',
  '1.1.0.878',
  'x-ms-keyvault-network-info',
  'addr=122.58.248.136;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 16 Sep 2019 22:22:53 GMT',
  'Connection',
  'close'
]);


nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fvault.azure.net%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":3600,"ext_expires_in":3600,"access_token":"access_token"}, [
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
  '32dd0d4d-db43-4655-ad2d-4492b0364700',
  'x-ms-ests-server',
  '2.1.9368.8 - EAS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AqHHtZRTqO1ErjxTgT0D1Qmp4MoTFwAAAI0BEtUOAAAA; expires=Wed, 16-Oct-2019 22:22:55 GMT; path=/; secure; HttpOnly',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; HttpOnly',
  'Date',
  'Mon, 16 Sep 2019 22:22:54 GMT',
  'Connection',
  'close',
  'Content-Length',
  '1231'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedkeys/recoverKeyName-canrestoreakeywithagivenbackup-')
  .query(true)
  .reply(409, {"error":{"code":"Conflict","message":"Key is currently being deleted.","innererror":{"code":"ObjectIsBeingDeleted"}}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '118',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  '40e30b62-0ff2-4ae9-8d29-f397ca61ad4d',
  'x-ms-keyvault-service-version',
  '1.1.0.878',
  'x-ms-keyvault-network-info',
  'addr=122.58.248.136;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 16 Sep 2019 22:22:56 GMT',
  'Connection',
  'close'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedkeys/recoverKeyName-canrestoreakeywithagivenbackup-')
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
  'westus2',
  'x-ms-request-id',
  '66aab5f5-b14d-4eda-9507-815a204fd3fb',
  'x-ms-keyvault-service-version',
  '1.1.0.878',
  'x-ms-keyvault-network-info',
  'addr=122.58.248.136;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 16 Sep 2019 22:23:06 GMT',
  'Connection',
  'close'
]);


nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fvault.azure.net%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":3599,"ext_expires_in":3599,"access_token":"access_token"}, [
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
  '17f22f89-8d7a-4269-939b-b80462044500',
  'x-ms-ests-server',
  '2.1.9368.8 - SEAS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AqHHtZRTqO1ErjxTgT0D1Qmp4MoTFwAAAI0BEtUOAAAA; expires=Wed, 16-Oct-2019 22:23:08 GMT; path=/; secure; HttpOnly',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; HttpOnly',
  'Date',
  'Mon, 16 Sep 2019 22:23:07 GMT',
  'Connection',
  'close',
  'Content-Length',
  '1231'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedkeys/recoverKeyName-canrestoreakeywithagivenbackup-')
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
  'westus2',
  'x-ms-request-id',
  '9606999f-606a-4b80-83ce-3a313f8c3abd',
  'x-ms-keyvault-service-version',
  '1.1.0.878',
  'x-ms-keyvault-network-info',
  'addr=122.58.248.136;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 16 Sep 2019 22:23:09 GMT',
  'Connection',
  'close'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/restore')
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
  'westus2',
  'x-ms-request-id',
  'c7ab6c56-80f0-4cca-914f-f62b63c37307',
  'x-ms-keyvault-service-version',
  '1.1.0.878',
  'x-ms-keyvault-network-info',
  'addr=122.58.248.136;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 16 Sep 2019 22:23:09 GMT',
  'Connection',
  'close'
]);


nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fvault.azure.net%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":3600,"ext_expires_in":3600,"access_token":"access_token"}, [
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
  '2431b191-465e-4618-85ad-f51badd24700',
  'x-ms-ests-server',
  '2.1.9368.8 - EAS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AqHHtZRTqO1ErjxTgT0D1Qmp4MoTFwAAAI0BEtUOAAAA; expires=Wed, 16-Oct-2019 22:23:11 GMT; path=/; secure; HttpOnly',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; HttpOnly',
  'Date',
  'Mon, 16 Sep 2019 22:23:10 GMT',
  'Connection',
  'close',
  'Content-Length',
  '1231'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/restore', {"value":"AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"})
  .query(true)
  .reply(400, {"error":{"code":"Malformed backup blob","message":"Backup blob contains invalid or corrupt version."}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '103',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  '15a6727a-c0cd-47f4-9ffb-408eaf6b04d5',
  'x-ms-keyvault-service-version',
  '1.1.0.878',
  'x-ms-keyvault-network-info',
  'addr=122.58.248.136;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 16 Sep 2019 22:23:11 GMT',
  'Connection',
  'close'
]);


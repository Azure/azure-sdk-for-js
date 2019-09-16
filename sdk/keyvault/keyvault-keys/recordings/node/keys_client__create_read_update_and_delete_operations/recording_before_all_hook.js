let nock = require('nock');

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/recoverKeyName-cancreateakeywhilegivingamanualtype-/create')
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
  '4e454b4f-2cab-48e7-9a45-14c324c845d5',
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
  'Mon, 16 Sep 2019 18:06:37 GMT',
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
  '4f3dd40b-06d1-4d66-af95-ad4366824200',
  'x-ms-ests-server',
  '2.1.9368.8 - SEAS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AqhJ5Qd1weFCrqeFzvA1e0Kp4MoTAQAAAC7GEdUOAAAA; expires=Wed, 16-Oct-2019 18:06:39 GMT; path=/; secure; HttpOnly',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; HttpOnly',
  'Date',
  'Mon, 16 Sep 2019 18:06:38 GMT',
  'Connection',
  'close',
  'Content-Length',
  '1231'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/recoverKeyName-cancreateakeywhilegivingamanualtype-/create', {"kty":"RSA"})
  .query(true)
  .reply(200, {"key":{"kid":"https://keyvault_name.vault.azure.net/keys/recoverKeyName-cancreateakeywhilegivingamanualtype-/b3fc54afd9fe4ed484c8c183e35cbc85","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"zE_1d86oA80nVhZ9SDoMoJ69ABKhVHQHMiZMN8bSG0IuaxYIdI_PDFoaXGScSsp1LlE6emf_rDQOHCRMn1PBSgcgw1stoPQnnyw96xD0wKZ-2O_sewtDhtb1ESfJ1J3ZR--9otl-_Cdz4unn7N2m8jbCpKNk7fSRqz11TXa5euM8aCW6C5o_BGNAwCqg8BX7st28XrzL3aASJ9SjQSSouSbqOC9tCAkseYEg4QjiYJDjGZqzu1TALsZZ8SdYKDBZY24DBX97jkotCWL_NT75kUHStv1akYI7UYezrDuD89nqTRpgGaHos-Y8jqpVjhQCgtZ0Fi1Bq-QiIgqyWWIFFw","e":"AQAB"},"attributes":{"enabled":true,"created":1568657200,"updated":1568657200,"recoveryLevel":"Recoverable+Purgeable"}}, [
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
  '6034222d-32ad-4076-a849-b84cc9a433e8',
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
  'Mon, 16 Sep 2019 18:06:40 GMT',
  'Connection',
  'close',
  'Content-Length',
  '721'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/keys/recoverKeyName-cancreateakeywhilegivingamanualtype-')
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
  '2e889ae4-0273-40eb-a103-5ea6454e1aeb',
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
  'Mon, 16 Sep 2019 18:06:40 GMT',
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
  'aa0f83ee-09cf-478b-bb6b-b47e7fbe4800',
  'x-ms-ests-server',
  '2.1.9368.8 - EAS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AqhJ5Qd1weFCrqeFzvA1e0Kp4MoTAgAAAC7GEdUOAAAA; expires=Wed, 16-Oct-2019 18:06:42 GMT; path=/; secure; HttpOnly',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; HttpOnly',
  'Date',
  'Mon, 16 Sep 2019 18:06:42 GMT',
  'Connection',
  'close',
  'Content-Length',
  '1231'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/keys/recoverKeyName-cancreateakeywhilegivingamanualtype-')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/recoverKeyName-cancreateakeywhilegivingamanualtype-","deletedDate":1568657203,"scheduledPurgeDate":1576433203,"key":{"kid":"https://keyvault_name.vault.azure.net/keys/recoverKeyName-cancreateakeywhilegivingamanualtype-/b3fc54afd9fe4ed484c8c183e35cbc85","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"zE_1d86oA80nVhZ9SDoMoJ69ABKhVHQHMiZMN8bSG0IuaxYIdI_PDFoaXGScSsp1LlE6emf_rDQOHCRMn1PBSgcgw1stoPQnnyw96xD0wKZ-2O_sewtDhtb1ESfJ1J3ZR--9otl-_Cdz4unn7N2m8jbCpKNk7fSRqz11TXa5euM8aCW6C5o_BGNAwCqg8BX7st28XrzL3aASJ9SjQSSouSbqOC9tCAkseYEg4QjiYJDjGZqzu1TALsZZ8SdYKDBZY24DBX97jkotCWL_NT75kUHStv1akYI7UYezrDuD89nqTRpgGaHos-Y8jqpVjhQCgtZ0Fi1Bq-QiIgqyWWIFFw","e":"AQAB"},"attributes":{"enabled":true,"created":1568657200,"updated":1568657200,"recoveryLevel":"Recoverable+Purgeable"}}, [
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
  'b34d71ac-1d5d-4931-8ff4-b3801244f3de',
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
  'Mon, 16 Sep 2019 18:06:42 GMT',
  'Connection',
  'close',
  'Content-Length',
  '917'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedkeys/recoverKeyName-cancreateakeywhilegivingamanualtype-')
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
  '4f38f60e-4f1c-40da-b4d8-e9db426db22f',
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
  'Mon, 16 Sep 2019 18:06:44 GMT',
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
  '17f22f89-8d7a-4269-939b-b804ef184100',
  'x-ms-ests-server',
  '2.1.9368.8 - SEAS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AqhJ5Qd1weFCrqeFzvA1e0Kp4MoTAwAAAC7GEdUOAAAA; expires=Wed, 16-Oct-2019 18:06:45 GMT; path=/; secure; HttpOnly',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; HttpOnly',
  'Date',
  'Mon, 16 Sep 2019 18:06:44 GMT',
  'Connection',
  'close',
  'Content-Length',
  '1231'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedkeys/recoverKeyName-cancreateakeywhilegivingamanualtype-')
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
  '8170bbf0-9c69-4203-91eb-4de3eef02c81',
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
  'Mon, 16 Sep 2019 18:06:46 GMT',
  'Connection',
  'close'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedkeys/recoverKeyName-cancreateakeywhilegivingamanualtype-')
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
  'caa788f0-56cd-45b8-972d-885705fe73d7',
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
  'Mon, 16 Sep 2019 18:06:57 GMT',
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
  '9a9aa77b-71d6-4219-9617-fe87b48d4300',
  'x-ms-ests-server',
  '2.1.9368.8 - EAS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AqhJ5Qd1weFCrqeFzvA1e0Kp4MoTBAAAAC7GEdUOAAAA; expires=Wed, 16-Oct-2019 18:06:59 GMT; path=/; secure; HttpOnly',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; HttpOnly',
  'Date',
  'Mon, 16 Sep 2019 18:06:58 GMT',
  'Connection',
  'close',
  'Content-Length',
  '1231'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedkeys/recoverKeyName-cancreateakeywhilegivingamanualtype-')
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
  '7fd97096-37ff-4f9f-9bc9-e1576fb66e25',
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
  'Mon, 16 Sep 2019 18:06:59 GMT',
  'Connection',
  'close'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/recoverKeyName-cancreateaRSAkey-/create')
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
  'e8f18901-7e41-4bdc-a0ec-159627e0f9e5',
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
  'Mon, 16 Sep 2019 18:07:01 GMT',
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
  '9a9aa77b-71d6-4219-9617-fe87fa8d4300',
  'x-ms-ests-server',
  '2.1.9368.8 - EAS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AqhJ5Qd1weFCrqeFzvA1e0Kp4MoTBQAAAC7GEdUOAAAA; expires=Wed, 16-Oct-2019 18:07:02 GMT; path=/; secure; HttpOnly',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; HttpOnly',
  'Date',
  'Mon, 16 Sep 2019 18:07:01 GMT',
  'Connection',
  'close',
  'Content-Length',
  '1231'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/recoverKeyName-cancreateaRSAkey-/create', {"kty":"RSA"})
  .query(true)
  .reply(200, {"key":{"kid":"https://keyvault_name.vault.azure.net/keys/recoverKeyName-cancreateaRSAkey-/7559b07186114ecd8b4b4afc636d8582","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"1f-ulAoI8bIVdla5ViFYO2pnnGn0jogs06CYTaET67wKE9wTsJtYRDVGdcmgtcfdBp56I65_6a74LbKkcXTRr_Z_kL_b3Nk_0bqdQd2pidNNu17HI0XzousRHOrW1IYRCkTeKFRCLt938cenzHX2K9_G4u5cQdqGf_VVi325jUpLyl1DSnohYPv7cgx0KJdWXW-jAryxzACvJ3FK6hyBvx7kVTxLwae_kDDSXyghEJTonAhNcqAFwe6Dc4mwNjbCG3aO891yCiT8FCcnr7hQbO_mxDd47ArXfAPUEisi-VY6-gR3h4izRwmrIc90ByVihMQqfYUsuNCL2dDYVVFCpw","e":"AQAB"},"attributes":{"enabled":true,"created":1568657223,"updated":1568657223,"recoveryLevel":"Recoverable+Purgeable"}}, [
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
  '25778c52-7978-4e9d-a5e5-b1e776eb3b45',
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
  'Mon, 16 Sep 2019 18:07:02 GMT',
  'Connection',
  'close',
  'Content-Length',
  '702'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/keys/recoverKeyName-cancreateaRSAkey-')
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
  'aa779dd6-4385-4ffd-bb85-b280a7da473a',
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
  'Mon, 16 Sep 2019 18:07:04 GMT',
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
  '8e881d8f-c64e-46a8-a2bf-2c730bef4300',
  'x-ms-ests-server',
  '2.1.9368.8 - EAS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AqhJ5Qd1weFCrqeFzvA1e0Kp4MoTBgAAAC7GEdUOAAAA; expires=Wed, 16-Oct-2019 18:07:05 GMT; path=/; secure; HttpOnly',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; HttpOnly',
  'Date',
  'Mon, 16 Sep 2019 18:07:04 GMT',
  'Connection',
  'close',
  'Content-Length',
  '1231'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/keys/recoverKeyName-cancreateaRSAkey-')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/recoverKeyName-cancreateaRSAkey-","deletedDate":1568657226,"scheduledPurgeDate":1576433226,"key":{"kid":"https://keyvault_name.vault.azure.net/keys/recoverKeyName-cancreateaRSAkey-/7559b07186114ecd8b4b4afc636d8582","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"1f-ulAoI8bIVdla5ViFYO2pnnGn0jogs06CYTaET67wKE9wTsJtYRDVGdcmgtcfdBp56I65_6a74LbKkcXTRr_Z_kL_b3Nk_0bqdQd2pidNNu17HI0XzousRHOrW1IYRCkTeKFRCLt938cenzHX2K9_G4u5cQdqGf_VVi325jUpLyl1DSnohYPv7cgx0KJdWXW-jAryxzACvJ3FK6hyBvx7kVTxLwae_kDDSXyghEJTonAhNcqAFwe6Dc4mwNjbCG3aO891yCiT8FCcnr7hQbO_mxDd47ArXfAPUEisi-VY6-gR3h4izRwmrIc90ByVihMQqfYUsuNCL2dDYVVFCpw","e":"AQAB"},"attributes":{"enabled":true,"created":1568657223,"updated":1568657223,"recoveryLevel":"Recoverable+Purgeable"}}, [
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
  '14c003b6-622b-4f23-883c-f6a127817174',
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
  'Mon, 16 Sep 2019 18:07:05 GMT',
  'Connection',
  'close',
  'Content-Length',
  '879'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedkeys/recoverKeyName-cancreateaRSAkey-')
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
  '922d9cc8-2f00-4b1d-8f40-3796767d6b85',
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
  'Mon, 16 Sep 2019 18:07:06 GMT',
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
  'f72e910a-3fef-498f-a6c0-636d4e714200',
  'x-ms-ests-server',
  '2.1.9368.8 - EAS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AqhJ5Qd1weFCrqeFzvA1e0Kp4MoTBwAAAC7GEdUOAAAA; expires=Wed, 16-Oct-2019 18:07:08 GMT; path=/; secure; HttpOnly',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; HttpOnly',
  'Date',
  'Mon, 16 Sep 2019 18:07:07 GMT',
  'Connection',
  'close',
  'Content-Length',
  '1231'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedkeys/recoverKeyName-cancreateaRSAkey-')
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
  '54ce55e8-541b-4797-ae92-1ddc87ff9024',
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
  'Mon, 16 Sep 2019 18:07:09 GMT',
  'Connection',
  'close'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedkeys/recoverKeyName-cancreateaRSAkey-')
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
  '017d45d6-9176-4d02-b275-bb9bd5c2889c',
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
  'Mon, 16 Sep 2019 18:07:20 GMT',
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
  'b954eee1-aea5-4d44-a151-cb0ee9084300',
  'x-ms-ests-server',
  '2.1.9368.8 - EAS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AqhJ5Qd1weFCrqeFzvA1e0Kp4MoTCAAAAC7GEdUOAAAA; expires=Wed, 16-Oct-2019 18:07:21 GMT; path=/; secure; HttpOnly',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; HttpOnly',
  'Date',
  'Mon, 16 Sep 2019 18:07:20 GMT',
  'Connection',
  'close',
  'Content-Length',
  '1231'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedkeys/recoverKeyName-cancreateaRSAkey-')
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
  '3c080ca8-5bcc-4ef5-b518-99c016aea826',
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
  'Mon, 16 Sep 2019 18:07:22 GMT',
  'Connection',
  'close'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/recoverKeyName-cancreateaRSAkeywithsize-/create')
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
  '463b4e5f-ac09-4c68-b9c3-634754b1b5bf',
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
  'Mon, 16 Sep 2019 18:07:23 GMT',
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
  '07532733-453b-41a3-b70c-0eab725f4100',
  'x-ms-ests-server',
  '2.1.9368.8 - EAS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AqhJ5Qd1weFCrqeFzvA1e0Kp4MoTCQAAAC7GEdUOAAAA; expires=Wed, 16-Oct-2019 18:07:25 GMT; path=/; secure; HttpOnly',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; HttpOnly',
  'Date',
  'Mon, 16 Sep 2019 18:07:24 GMT',
  'Connection',
  'close',
  'Content-Length',
  '1231'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/recoverKeyName-cancreateaRSAkeywithsize-/create', {"kty":"RSA","key_size":2048,"attributes":{}})
  .query(true)
  .reply(200, {"key":{"kid":"https://keyvault_name.vault.azure.net/keys/recoverKeyName-cancreateaRSAkeywithsize-/d7f31dee98e442f99bfbdfd3aac509e2","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"4JIAloSUhoRCPW0NcIqHjkodI2uafMTzGgTOUWeapHE_6XHTV1AqE3ShgWJlvu3eLpuE0o6EUu4apuTy_pDkLTn-Gn9TLiuv8Bm2v3Xab3YXpo5OgfXVeRk-Hur9VfsTxFwA231MJYpSwOxVY9t6Yua2MmfHeyAiOP1wc6kWVzkYj59ils58Jf9cnSex9EDNnANMIR8Q8Z5eTXlWRrClaX-Ef6kjV5ZFaOG4Vl6BbjkGEyLyMHgzBqbESJ-4yIX8J7k_epVq4U1xmS4seJsFYGrkomsk92RN8IKdt-4OyC4lafdMN4aoWfOGXPjzKNDfpQmA0inrHieOsSAOveZzmw","e":"AQAB"},"attributes":{"enabled":true,"created":1568657246,"updated":1568657246,"recoveryLevel":"Recoverable+Purgeable"}}, [
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
  '94482016-0fa1-46a9-9958-b0aec5701bbd',
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
  'Mon, 16 Sep 2019 18:07:25 GMT',
  'Connection',
  'close',
  'Content-Length',
  '710'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/keys/recoverKeyName-cancreateaRSAkeywithsize-')
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
  '4c1789ea-b454-47e2-8a04-e61ce3c7df9d',
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
  'Mon, 16 Sep 2019 18:07:26 GMT',
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
  '3bcff336-72fe-48e8-93ae-27c0f5be4200',
  'x-ms-ests-server',
  '2.1.9368.8 - SEAS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AqhJ5Qd1weFCrqeFzvA1e0Kp4MoTCgAAAC7GEdUOAAAA; expires=Wed, 16-Oct-2019 18:07:27 GMT; path=/; secure; HttpOnly',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; HttpOnly',
  'Date',
  'Mon, 16 Sep 2019 18:07:27 GMT',
  'Connection',
  'close',
  'Content-Length',
  '1231'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/keys/recoverKeyName-cancreateaRSAkeywithsize-')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/recoverKeyName-cancreateaRSAkeywithsize-","deletedDate":1568657248,"scheduledPurgeDate":1576433248,"key":{"kid":"https://keyvault_name.vault.azure.net/keys/recoverKeyName-cancreateaRSAkeywithsize-/d7f31dee98e442f99bfbdfd3aac509e2","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"4JIAloSUhoRCPW0NcIqHjkodI2uafMTzGgTOUWeapHE_6XHTV1AqE3ShgWJlvu3eLpuE0o6EUu4apuTy_pDkLTn-Gn9TLiuv8Bm2v3Xab3YXpo5OgfXVeRk-Hur9VfsTxFwA231MJYpSwOxVY9t6Yua2MmfHeyAiOP1wc6kWVzkYj59ils58Jf9cnSex9EDNnANMIR8Q8Z5eTXlWRrClaX-Ef6kjV5ZFaOG4Vl6BbjkGEyLyMHgzBqbESJ-4yIX8J7k_epVq4U1xmS4seJsFYGrkomsk92RN8IKdt-4OyC4lafdMN4aoWfOGXPjzKNDfpQmA0inrHieOsSAOveZzmw","e":"AQAB"},"attributes":{"enabled":true,"created":1568657246,"updated":1568657246,"recoveryLevel":"Recoverable+Purgeable"}}, [
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
  '1349c1fc-5355-4aee-b8dc-405786e47d75',
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
  'Mon, 16 Sep 2019 18:07:28 GMT',
  'Connection',
  'close',
  'Content-Length',
  '895'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedkeys/recoverKeyName-cancreateaRSAkeywithsize-')
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
  '17cad3f6-6bed-4608-afa3-3e1be581bb59',
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
  'Mon, 16 Sep 2019 18:07:29 GMT',
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
  '77761cfc-4ea7-4493-9443-8e2488144300',
  'x-ms-ests-server',
  '2.1.9368.8 - SEAS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AqhJ5Qd1weFCrqeFzvA1e0Kp4MoTCwAAAC7GEdUOAAAA; expires=Wed, 16-Oct-2019 18:07:30 GMT; path=/; secure; HttpOnly',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; HttpOnly',
  'Date',
  'Mon, 16 Sep 2019 18:07:30 GMT',
  'Connection',
  'close',
  'Content-Length',
  '1231'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedkeys/recoverKeyName-cancreateaRSAkeywithsize-')
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
  '7460d99b-acb2-45ef-b8a3-6f03b596db51',
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
  'Mon, 16 Sep 2019 18:07:31 GMT',
  'Connection',
  'close'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedkeys/recoverKeyName-cancreateaRSAkeywithsize-')
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
  '84cd4741-8461-4fc9-8ee2-5a715772e6c2',
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
  'Mon, 16 Sep 2019 18:07:43 GMT',
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
  '8e881d8f-c64e-46a8-a2bf-2c73a6f14300',
  'x-ms-ests-server',
  '2.1.9368.8 - EAS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AqhJ5Qd1weFCrqeFzvA1e0Kp4MoTDAAAAC7GEdUOAAAA; expires=Wed, 16-Oct-2019 18:07:44 GMT; path=/; secure; HttpOnly',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; HttpOnly',
  'Date',
  'Mon, 16 Sep 2019 18:07:43 GMT',
  'Connection',
  'close',
  'Content-Length',
  '1231'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedkeys/recoverKeyName-cancreateaRSAkeywithsize-')
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
  'bf6b1031-1a68-4c82-a40f-3a673bf42f1b',
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
  'Mon, 16 Sep 2019 18:07:44 GMT',
  'Connection',
  'close'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedkeys/recoverKeyName-cancreateaRSAkeywithsize-')
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
  '9357404d-9d71-4255-b196-ddbb3f8320d6',
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
  'Mon, 16 Sep 2019 18:07:56 GMT',
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
  '0b0ecba5-b3fd-466c-81c0-1cc8da2e4700',
  'x-ms-ests-server',
  '2.1.9368.8 - EAS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AqhJ5Qd1weFCrqeFzvA1e0Kp4MoTDQAAAC7GEdUOAAAA; expires=Wed, 16-Oct-2019 18:07:57 GMT; path=/; secure; HttpOnly',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; HttpOnly',
  'Date',
  'Mon, 16 Sep 2019 18:07:57 GMT',
  'Connection',
  'close',
  'Content-Length',
  '1231'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedkeys/recoverKeyName-cancreateaRSAkeywithsize-')
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
  '5dcafe30-a18e-4f00-a6e5-71cbf4fc5729',
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
  'Mon, 16 Sep 2019 18:07:58 GMT',
  'Connection',
  'close'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/recoverKeyName-cancreateanECkey-/create')
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
  '49b0a882-025c-4652-8768-1191add94887',
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
  'Mon, 16 Sep 2019 18:07:58 GMT',
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
  'cff8a2ae-a680-4ce9-bc3b-6e2258001800',
  'x-ms-ests-server',
  '2.1.9368.8 - EAS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AqhJ5Qd1weFCrqeFzvA1e0Kp4MoTDgAAAC7GEdUOAAAA; expires=Wed, 16-Oct-2019 18:08:00 GMT; path=/; secure; HttpOnly',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; HttpOnly',
  'Date',
  'Mon, 16 Sep 2019 18:08:00 GMT',
  'Connection',
  'close',
  'Content-Length',
  '1231'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/recoverKeyName-cancreateanECkey-/create', {"kty":"EC"})
  .query(true)
  .reply(200, {"key":{"kid":"https://keyvault_name.vault.azure.net/keys/recoverKeyName-cancreateanECkey-/307c710cc7454a6597889c464e9b6e61","kty":"EC","key_ops":["sign","verify"],"crv":"P-256","x":"uYeQ4CHvZgCE-R8vZH-NGNatJ8e2QMVhNnoHnnoKu-k","y":"5BJzLMAAodd_luWulBVhZobzQvcR2M7H3HUyPLW-kuo"},"attributes":{"enabled":true,"created":1568657281,"updated":1568657281,"recoveryLevel":"Recoverable+Purgeable"}}, [
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
  '4641b498-7064-4f15-8539-25141ca2079b',
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
  'Mon, 16 Sep 2019 18:08:01 GMT',
  'Connection',
  'close',
  'Content-Length',
  '413'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/keys/recoverKeyName-cancreateanECkey-')
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
  'f9e5848f-a6e7-41dc-980e-9568723ccc3e',
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
  'Mon, 16 Sep 2019 18:08:02 GMT',
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
  '6c7e4636-22c5-4f26-9ede-07594c184200',
  'x-ms-ests-server',
  '2.1.9368.8 - SEAS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AqhJ5Qd1weFCrqeFzvA1e0Kp4MoTDwAAAC7GEdUOAAAA; expires=Wed, 16-Oct-2019 18:08:03 GMT; path=/; secure; HttpOnly',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; HttpOnly',
  'Date',
  'Mon, 16 Sep 2019 18:08:03 GMT',
  'Connection',
  'close',
  'Content-Length',
  '1231'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/keys/recoverKeyName-cancreateanECkey-')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/recoverKeyName-cancreateanECkey-","deletedDate":1568657284,"scheduledPurgeDate":1576433284,"key":{"kid":"https://keyvault_name.vault.azure.net/keys/recoverKeyName-cancreateanECkey-/307c710cc7454a6597889c464e9b6e61","kty":"EC","key_ops":["sign","verify"],"crv":"P-256","x":"uYeQ4CHvZgCE-R8vZH-NGNatJ8e2QMVhNnoHnnoKu-k","y":"5BJzLMAAodd_luWulBVhZobzQvcR2M7H3HUyPLW-kuo"},"attributes":{"enabled":true,"created":1568657281,"updated":1568657281,"recoveryLevel":"Recoverable+Purgeable"}}, [
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
  'a817c1c5-e875-49a7-a65c-a55bf2c73751',
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
  'Mon, 16 Sep 2019 18:08:04 GMT',
  'Connection',
  'close',
  'Content-Length',
  '590'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedkeys/recoverKeyName-cancreateanECkey-')
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
  'eea92291-91be-46b0-8972-21cae5af44ef',
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
  'Mon, 16 Sep 2019 18:08:05 GMT',
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
  '7f666681-7d70-41e7-8a6e-e4f9a8014000',
  'x-ms-ests-server',
  '2.1.9368.8 - SEAS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AqhJ5Qd1weFCrqeFzvA1e0Kp4MoTEAAAAC7GEdUOAAAA; expires=Wed, 16-Oct-2019 18:08:06 GMT; path=/; secure; HttpOnly',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; HttpOnly',
  'Date',
  'Mon, 16 Sep 2019 18:08:06 GMT',
  'Connection',
  'close',
  'Content-Length',
  '1231'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedkeys/recoverKeyName-cancreateanECkey-')
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
  '21e8fd5b-0d41-479a-9b56-18355921eff2',
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
  'Mon, 16 Sep 2019 18:08:07 GMT',
  'Connection',
  'close'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedkeys/recoverKeyName-cancreateanECkey-')
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
  'd2414bed-169c-44ae-87b6-ae3e014f3b8d',
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
  'Mon, 16 Sep 2019 18:08:19 GMT',
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
  '0b0ecba5-b3fd-466c-81c0-1cc890304700',
  'x-ms-ests-server',
  '2.1.9368.8 - EAS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AqhJ5Qd1weFCrqeFzvA1e0Kp4MoTEQAAAC7GEdUOAAAA; expires=Wed, 16-Oct-2019 18:08:20 GMT; path=/; secure; HttpOnly',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; HttpOnly',
  'Date',
  'Mon, 16 Sep 2019 18:08:20 GMT',
  'Connection',
  'close',
  'Content-Length',
  '1231'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedkeys/recoverKeyName-cancreateanECkey-')
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
  '7cc81e28-93c5-43f9-bde0-b9e8dadff005',
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
  'Mon, 16 Sep 2019 18:08:21 GMT',
  'Connection',
  'close'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/recoverKeyName-cancreateanECkeywithcurve-/create')
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
  '5271fdd0-95f9-4919-84bc-f0a1f4966ea8',
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
  'Mon, 16 Sep 2019 18:08:22 GMT',
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
  '3bcff336-72fe-48e8-93ae-27c022c34200',
  'x-ms-ests-server',
  '2.1.9368.8 - SEAS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AqhJ5Qd1weFCrqeFzvA1e0Kp4MoTEgAAAC7GEdUOAAAA; expires=Wed, 16-Oct-2019 18:08:23 GMT; path=/; secure; HttpOnly',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; HttpOnly',
  'Date',
  'Mon, 16 Sep 2019 18:08:22 GMT',
  'Connection',
  'close',
  'Content-Length',
  '1231'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/recoverKeyName-cancreateanECkeywithcurve-/create', {"kty":"EC","attributes":{},"crv":"P-256"})
  .query(true)
  .reply(200, {"key":{"kid":"https://keyvault_name.vault.azure.net/keys/recoverKeyName-cancreateanECkeywithcurve-/e1aa33e3bbda4d29a66aff115f62bfca","kty":"EC","key_ops":["sign","verify"],"crv":"P-256","x":"ZvB7wQFons6ACCrFNlWvyZtlGKappr7rygdpt-7DXJM","y":"6n7tAEoOOSpKE-zXcXPkDDQSPIFMqsnCD0lbLFC7XzM"},"attributes":{"enabled":true,"created":1568657304,"updated":1568657304,"recoveryLevel":"Recoverable+Purgeable"}}, [
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
  '7f3cc72e-56d6-4bf1-bbc8-0bc8c2f98d61',
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
  'Mon, 16 Sep 2019 18:08:24 GMT',
  'Connection',
  'close',
  'Content-Length',
  '422'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/keys/recoverKeyName-cancreateanECkeywithcurve-')
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
  'b21b829e-5eea-4a9c-b075-b6f3cc2e3843',
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
  'Mon, 16 Sep 2019 18:08:25 GMT',
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
  '32dd0d4d-db43-4655-ad2d-449288424300',
  'x-ms-ests-server',
  '2.1.9368.8 - EAS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AqhJ5Qd1weFCrqeFzvA1e0Kp4MoTEwAAAC7GEdUOAAAA; expires=Wed, 16-Oct-2019 18:08:26 GMT; path=/; secure; HttpOnly',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; HttpOnly',
  'Date',
  'Mon, 16 Sep 2019 18:08:26 GMT',
  'Connection',
  'close',
  'Content-Length',
  '1231'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/keys/recoverKeyName-cancreateanECkeywithcurve-')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/recoverKeyName-cancreateanECkeywithcurve-","deletedDate":1568657307,"scheduledPurgeDate":1576433307,"key":{"kid":"https://keyvault_name.vault.azure.net/keys/recoverKeyName-cancreateanECkeywithcurve-/e1aa33e3bbda4d29a66aff115f62bfca","kty":"EC","key_ops":["sign","verify"],"crv":"P-256","x":"ZvB7wQFons6ACCrFNlWvyZtlGKappr7rygdpt-7DXJM","y":"6n7tAEoOOSpKE-zXcXPkDDQSPIFMqsnCD0lbLFC7XzM"},"attributes":{"enabled":true,"created":1568657304,"updated":1568657304,"recoveryLevel":"Recoverable+Purgeable"}}, [
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
  '48dd9db9-01db-4096-a5d8-c7fc1c643455',
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
  'Mon, 16 Sep 2019 18:08:28 GMT',
  'Connection',
  'close',
  'Content-Length',
  '608'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedkeys/recoverKeyName-cancreateanECkeywithcurve-')
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
  '2ec8e456-d8ee-4be7-9077-920b0ff3bf36',
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
  'Mon, 16 Sep 2019 18:08:28 GMT',
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
  '8e881d8f-c64e-46a8-a2bf-2c73f3f44300',
  'x-ms-ests-server',
  '2.1.9368.8 - EAS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AqhJ5Qd1weFCrqeFzvA1e0Kp4MoTFAAAAC7GEdUOAAAA; expires=Wed, 16-Oct-2019 18:08:30 GMT; path=/; secure; HttpOnly',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; HttpOnly',
  'Date',
  'Mon, 16 Sep 2019 18:08:30 GMT',
  'Connection',
  'close',
  'Content-Length',
  '1231'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedkeys/recoverKeyName-cancreateanECkeywithcurve-')
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
  'a2c05ada-b0fc-4c6a-a79c-90595bbb94c8',
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
  'Mon, 16 Sep 2019 18:08:30 GMT',
  'Connection',
  'close'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedkeys/recoverKeyName-cancreateanECkeywithcurve-')
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
  '2b0bbc88-5e16-4344-83a0-76616acc514d',
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
  'Mon, 16 Sep 2019 18:08:41 GMT',
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
  '0fc90094-3914-4a88-b5fa-19b5a02a4700',
  'x-ms-ests-server',
  '2.1.9368.8 - EAS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AqhJ5Qd1weFCrqeFzvA1e0Kp4MoTFQAAAC7GEdUOAAAA; expires=Wed, 16-Oct-2019 18:08:43 GMT; path=/; secure; HttpOnly',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; HttpOnly',
  'Date',
  'Mon, 16 Sep 2019 18:08:42 GMT',
  'Connection',
  'close',
  'Content-Length',
  '1231'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedkeys/recoverKeyName-cancreateanECkeywithcurve-')
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
  '0a684935-5cad-46a6-b49a-7ed393dd57e8',
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
  'Mon, 16 Sep 2019 18:08:43 GMT',
  'Connection',
  'close'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/recoverKeyName-cancreateadisabledkey-/create')
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
  '8600ca88-4a07-46b4-acef-c6a0f01db573',
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
  'Mon, 16 Sep 2019 18:08:45 GMT',
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
  '63a15c3f-4fe3-4290-8dd4-098a36644500',
  'x-ms-ests-server',
  '2.1.9368.8 - EAS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AqhJ5Qd1weFCrqeFzvA1e0Kp4MoTFgAAAC7GEdUOAAAA; expires=Wed, 16-Oct-2019 18:08:46 GMT; path=/; secure; HttpOnly',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; HttpOnly',
  'Date',
  'Mon, 16 Sep 2019 18:08:45 GMT',
  'Connection',
  'close',
  'Content-Length',
  '1231'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/recoverKeyName-cancreateadisabledkey-/create', {"kty":"RSA","attributes":{"enabled":false}})
  .query(true)
  .reply(200, {"key":{"kid":"https://keyvault_name.vault.azure.net/keys/recoverKeyName-cancreateadisabledkey-/8e676c2321034acea707ee4b944af591","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"kZgjtpxFdspOk8Q5nCVvRP5PzzdJJb3VatTOCtr4Q0X2KnToSSlgVNWx4DQdg-NYrYQM5Z4ZqQ02fD4_dxfDeGEdQ5diDH7lI7wuQvJmL2dx6KDds2LPDFP1BbnX562RNQnbE7wk0joZnFnBJdXjmnD9KVEmRsMM9eiLYqOzTFMoUc-ZjwRXMdSjUt-Guz9vDAeT_k_fccNfpLoGMpAkk2SjX83CMKwc4GkmvD_aNEMpmktD_jCRu_L2SbNRFozcxd47856HwXjVUtdaIXMLgTNEN-uye3G3-k0fhco0gU5Y_zPqIupXPfOq9AdvbBll5-i7NfHOtR4PF-9zxAxM6Q","e":"AQAB"},"attributes":{"enabled":false,"created":1568657326,"updated":1568657326,"recoveryLevel":"Recoverable+Purgeable"}}, [
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
  '731a22e7-090d-429f-8484-3538b616cfcd',
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
  'Mon, 16 Sep 2019 18:08:46 GMT',
  'Connection',
  'close',
  'Content-Length',
  '708'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/keys/recoverKeyName-cancreateadisabledkey-')
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
  'b4dd7d2a-9c33-4fc0-8ab7-40a26e54077c',
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
  'Mon, 16 Sep 2019 18:08:47 GMT',
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
  '77761cfc-4ea7-4493-9443-8e248b1a4300',
  'x-ms-ests-server',
  '2.1.9368.8 - SEAS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AqhJ5Qd1weFCrqeFzvA1e0Kp4MoTFwAAAC7GEdUOAAAA; expires=Wed, 16-Oct-2019 18:08:48 GMT; path=/; secure; HttpOnly',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; HttpOnly',
  'Date',
  'Mon, 16 Sep 2019 18:08:48 GMT',
  'Connection',
  'close',
  'Content-Length',
  '1231'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/keys/recoverKeyName-cancreateadisabledkey-')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/recoverKeyName-cancreateadisabledkey-","deletedDate":1568657329,"scheduledPurgeDate":1576433329,"key":{"kid":"https://keyvault_name.vault.azure.net/keys/recoverKeyName-cancreateadisabledkey-/8e676c2321034acea707ee4b944af591","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"kZgjtpxFdspOk8Q5nCVvRP5PzzdJJb3VatTOCtr4Q0X2KnToSSlgVNWx4DQdg-NYrYQM5Z4ZqQ02fD4_dxfDeGEdQ5diDH7lI7wuQvJmL2dx6KDds2LPDFP1BbnX562RNQnbE7wk0joZnFnBJdXjmnD9KVEmRsMM9eiLYqOzTFMoUc-ZjwRXMdSjUt-Guz9vDAeT_k_fccNfpLoGMpAkk2SjX83CMKwc4GkmvD_aNEMpmktD_jCRu_L2SbNRFozcxd47856HwXjVUtdaIXMLgTNEN-uye3G3-k0fhco0gU5Y_zPqIupXPfOq9AdvbBll5-i7NfHOtR4PF-9zxAxM6Q","e":"AQAB"},"attributes":{"enabled":false,"created":1568657326,"updated":1568657326,"recoveryLevel":"Recoverable+Purgeable"}}, [
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
  '77873a2c-a850-466f-bf0a-a248a2b82a47',
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
  'Mon, 16 Sep 2019 18:08:49 GMT',
  'Connection',
  'close',
  'Content-Length',
  '890'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedkeys/recoverKeyName-cancreateadisabledkey-')
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
  '48c62bc4-05d8-42ad-8ed4-dc93924755da',
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
  'Mon, 16 Sep 2019 18:08:50 GMT',
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
  'b954eee1-aea5-4d44-a151-cb0e3d0f4300',
  'x-ms-ests-server',
  '2.1.9368.8 - EAS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AqhJ5Qd1weFCrqeFzvA1e0Kp4MoTFwAAAC7GEdUOAAAA; expires=Wed, 16-Oct-2019 18:08:51 GMT; path=/; secure; HttpOnly',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; HttpOnly',
  'Date',
  'Mon, 16 Sep 2019 18:08:50 GMT',
  'Connection',
  'close',
  'Content-Length',
  '1231'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedkeys/recoverKeyName-cancreateadisabledkey-')
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
  'ed3f3288-2edd-4c25-90dd-41ca524842bb',
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
  'Mon, 16 Sep 2019 18:08:51 GMT',
  'Connection',
  'close'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedkeys/recoverKeyName-cancreateadisabledkey-')
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
  '052fdba2-7687-4f09-add3-ee6c7c1fe626',
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
  'Mon, 16 Sep 2019 18:09:03 GMT',
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
  '9e060a1e-dbf0-4a2c-be90-fd168c044200',
  'x-ms-ests-server',
  '2.1.9368.8 - SEAS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AqhJ5Qd1weFCrqeFzvA1e0Kp4MoTFwAAAC7GEdUOAAAA; expires=Wed, 16-Oct-2019 18:09:04 GMT; path=/; secure; HttpOnly',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; HttpOnly',
  'Date',
  'Mon, 16 Sep 2019 18:09:04 GMT',
  'Connection',
  'close',
  'Content-Length',
  '1231'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedkeys/recoverKeyName-cancreateadisabledkey-')
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
  'e02be7ee-4d5a-49d9-af16-972d258cffe3',
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
  'Mon, 16 Sep 2019 18:09:04 GMT',
  'Connection',
  'close'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/recoverKeyName-cancreateakeywithnotBefore-/create')
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
  '7d4c2cfb-e49b-485b-bbb0-0759055462e0',
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
  'Mon, 16 Sep 2019 18:09:06 GMT',
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
  'b954eee1-aea5-4d44-a151-cb0e65104300',
  'x-ms-ests-server',
  '2.1.9368.8 - EAS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AqhJ5Qd1weFCrqeFzvA1e0Kp4MoTFwAAAC7GEdUOAAAA; expires=Wed, 16-Oct-2019 18:09:07 GMT; path=/; secure; HttpOnly',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; HttpOnly',
  'Date',
  'Mon, 16 Sep 2019 18:09:06 GMT',
  'Connection',
  'close',
  'Content-Length',
  '1231'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/recoverKeyName-cancreateakeywithnotBefore-/create', {"kty":"RSA","attributes":{"nbf":1546300805}})
  .query(true)
  .reply(200, {"key":{"kid":"https://keyvault_name.vault.azure.net/keys/recoverKeyName-cancreateakeywithnotBefore-/7183a9f10aca41aca6503539cba3dc54","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"6vLip0aJzfNfYKpDfsIhUlhpMkT_ztqEJVzVIK7cs_iQ90u71T2Zev431-vIS6XlndqaeKEE_jxBEi6vhu3a-5R84_fVEiOJhuuGtCThV-q_YoCEujtZEKgV-w1GDDn3HQPzbvnYlw6KDIXh9tmNxsDqtc92MXUg3lmcG18qpc57q9kXeW1aQg3sz6O7_bMhAsryfwKl96mWwOrHC5cvMKsfZY50mxg34QYnGW_0ShwN3ot2lnKbrXscXglGjmOE5fDJpvBqL5jdTpARK_uZ5_ZiByAldbri4FFb2kCmxx9GzarEWuAaUnlpwQxMuSjNKWQ6I12vKJ-coMHdtkSQ7Q","e":"AQAB"},"attributes":{"enabled":true,"nbf":1546300805,"created":1568657348,"updated":1568657348,"recoveryLevel":"Recoverable+Purgeable"}}, [
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
  'b1783fb9-d50e-4262-8073-d7c02b2b7dbf',
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
  'Mon, 16 Sep 2019 18:09:08 GMT',
  'Connection',
  'close',
  'Content-Length',
  '729'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/keys/recoverKeyName-cancreateakeywithnotBefore-')
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
  'bff2a7d9-d7f3-46ad-ab90-64e13ee0d69c',
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
  'Mon, 16 Sep 2019 18:09:09 GMT',
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
  'bf8ceb73-ac66-4df0-a050-4e7f12004400',
  'x-ms-ests-server',
  '2.1.9368.8 - SEAS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AqhJ5Qd1weFCrqeFzvA1e0Kp4MoTFwAAAC7GEdUOAAAA; expires=Wed, 16-Oct-2019 18:09:10 GMT; path=/; secure; HttpOnly',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; HttpOnly',
  'Date',
  'Mon, 16 Sep 2019 18:09:10 GMT',
  'Connection',
  'close',
  'Content-Length',
  '1231'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/keys/recoverKeyName-cancreateakeywithnotBefore-')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/recoverKeyName-cancreateakeywithnotBefore-","deletedDate":1568657352,"scheduledPurgeDate":1576433352,"key":{"kid":"https://keyvault_name.vault.azure.net/keys/recoverKeyName-cancreateakeywithnotBefore-/7183a9f10aca41aca6503539cba3dc54","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"6vLip0aJzfNfYKpDfsIhUlhpMkT_ztqEJVzVIK7cs_iQ90u71T2Zev431-vIS6XlndqaeKEE_jxBEi6vhu3a-5R84_fVEiOJhuuGtCThV-q_YoCEujtZEKgV-w1GDDn3HQPzbvnYlw6KDIXh9tmNxsDqtc92MXUg3lmcG18qpc57q9kXeW1aQg3sz6O7_bMhAsryfwKl96mWwOrHC5cvMKsfZY50mxg34QYnGW_0ShwN3ot2lnKbrXscXglGjmOE5fDJpvBqL5jdTpARK_uZ5_ZiByAldbri4FFb2kCmxx9GzarEWuAaUnlpwQxMuSjNKWQ6I12vKJ-coMHdtkSQ7Q","e":"AQAB"},"attributes":{"enabled":true,"nbf":1546300805,"created":1568657348,"updated":1568657348,"recoveryLevel":"Recoverable+Purgeable"}}, [
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
  '65a1fb47-3b31-4565-b65f-9a2945f21d83',
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
  'Mon, 16 Sep 2019 18:09:12 GMT',
  'Connection',
  'close',
  'Content-Length',
  '916'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedkeys/recoverKeyName-cancreateakeywithnotBefore-')
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
  '04ddb397-075f-4f05-880a-5332072e0e9f',
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
  'Mon, 16 Sep 2019 18:09:12 GMT',
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
  '50cff4e3-d66c-4b46-a821-eff2ea214200',
  'x-ms-ests-server',
  '2.1.9368.8 - SEAS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AqhJ5Qd1weFCrqeFzvA1e0Kp4MoTFwAAAC7GEdUOAAAA; expires=Wed, 16-Oct-2019 18:09:14 GMT; path=/; secure; HttpOnly',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; HttpOnly',
  'Date',
  'Mon, 16 Sep 2019 18:09:13 GMT',
  'Connection',
  'close',
  'Content-Length',
  '1231'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedkeys/recoverKeyName-cancreateakeywithnotBefore-')
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
  '9bf0eaf2-447f-40a4-8420-74822b3de460',
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
  'Mon, 16 Sep 2019 18:09:15 GMT',
  'Connection',
  'close'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedkeys/recoverKeyName-cancreateakeywithnotBefore-')
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
  'aaa1757d-cbf2-4562-be6a-ae800a73082c',
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
  'Mon, 16 Sep 2019 18:09:26 GMT',
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
  'c18c12e8-2ea7-41c8-8226-c1ecc1424500',
  'x-ms-ests-server',
  '2.1.9368.8 - SEAS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AqhJ5Qd1weFCrqeFzvA1e0Kp4MoTFwAAAC7GEdUOAAAA; expires=Wed, 16-Oct-2019 18:09:27 GMT; path=/; secure; HttpOnly',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; HttpOnly',
  'Date',
  'Mon, 16 Sep 2019 18:09:27 GMT',
  'Connection',
  'close',
  'Content-Length',
  '1231'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedkeys/recoverKeyName-cancreateakeywithnotBefore-')
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
  '80e416d9-1185-4589-af3b-51883b121cb5',
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
  'Mon, 16 Sep 2019 18:09:28 GMT',
  'Connection',
  'close'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/recoverKeyName-cancreateakeywithexpires-/create')
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
  'a4c05969-67d1-46e1-a615-849f88ab9f40',
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
  'Mon, 16 Sep 2019 18:09:29 GMT',
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
  '176459ed-3f7f-4d8e-ad6e-167210604b00',
  'x-ms-ests-server',
  '2.1.9368.8 - EAS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AqhJ5Qd1weFCrqeFzvA1e0Kp4MoTFwAAAC7GEdUOAAAA; expires=Wed, 16-Oct-2019 18:09:30 GMT; path=/; secure; HttpOnly',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; HttpOnly',
  'Date',
  'Mon, 16 Sep 2019 18:09:30 GMT',
  'Connection',
  'close',
  'Content-Length',
  '1231'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/recoverKeyName-cancreateakeywithexpires-/create', {"kty":"RSA","attributes":{"exp":1546300805}})
  .query(true)
  .reply(200, {"key":{"kid":"https://keyvault_name.vault.azure.net/keys/recoverKeyName-cancreateakeywithexpires-/70503ec0f46e4043b69b133d113826a0","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"7_e8hcYOBk6m1OdDQSDvJIwVSDeO3ZXm5NG8XKggZaqcvtTr2dvaYvPW5_m1mwaKZza4RiFLjIR60vyLhK0aY78ixKWSrdGgCaGWn_i94mAkZ7JSlf82-FI3J-J8IU0rBxZWmoBPV4vCfqiClaiDc_KMrJhEp2OFq_1YKPH3f23A7Ulo26SDvCc5g55dY_FlEY1QcqsGlbVEUtoql0r0NtaVLbs9JwpNGY5dZbR5RconCEAJpubq6phaE7hJ_O-0d_7vwrxhPeZ3AhWXIkXmo0QhIXY9PqHS-bpnRIc9byfWnIDCLQlhAm6fZJcQLx3h-GLpyUBdlfsQApMP3o8NzQ","e":"AQAB"},"attributes":{"enabled":true,"exp":1546300805,"created":1568657371,"updated":1568657371,"recoveryLevel":"Recoverable+Purgeable"}}, [
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
  '9e1be0f9-4cd0-42fa-a781-cc02599ca680',
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
  'Mon, 16 Sep 2019 18:09:31 GMT',
  'Connection',
  'close',
  'Content-Length',
  '727'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/keys/recoverKeyName-cancreateakeywithexpires-')
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
  '6d0261dc-72cb-4ffe-8c57-2c4d95b5e7e2',
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
  'Mon, 16 Sep 2019 18:09:32 GMT',
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
  'b556d84d-c391-4fe1-8558-b26819a84600',
  'x-ms-ests-server',
  '2.1.9368.8 - EAS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AqhJ5Qd1weFCrqeFzvA1e0Kp4MoTFwAAAC7GEdUOAAAA; expires=Wed, 16-Oct-2019 18:09:33 GMT; path=/; secure; HttpOnly',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; HttpOnly',
  'Date',
  'Mon, 16 Sep 2019 18:09:33 GMT',
  'Connection',
  'close',
  'Content-Length',
  '1231'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/keys/recoverKeyName-cancreateakeywithexpires-')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/recoverKeyName-cancreateakeywithexpires-","deletedDate":1568657374,"scheduledPurgeDate":1576433374,"key":{"kid":"https://keyvault_name.vault.azure.net/keys/recoverKeyName-cancreateakeywithexpires-/70503ec0f46e4043b69b133d113826a0","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"7_e8hcYOBk6m1OdDQSDvJIwVSDeO3ZXm5NG8XKggZaqcvtTr2dvaYvPW5_m1mwaKZza4RiFLjIR60vyLhK0aY78ixKWSrdGgCaGWn_i94mAkZ7JSlf82-FI3J-J8IU0rBxZWmoBPV4vCfqiClaiDc_KMrJhEp2OFq_1YKPH3f23A7Ulo26SDvCc5g55dY_FlEY1QcqsGlbVEUtoql0r0NtaVLbs9JwpNGY5dZbR5RconCEAJpubq6phaE7hJ_O-0d_7vwrxhPeZ3AhWXIkXmo0QhIXY9PqHS-bpnRIc9byfWnIDCLQlhAm6fZJcQLx3h-GLpyUBdlfsQApMP3o8NzQ","e":"AQAB"},"attributes":{"enabled":true,"exp":1546300805,"created":1568657371,"updated":1568657371,"recoveryLevel":"Recoverable+Purgeable"}}, [
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
  'b0604f6f-0437-4841-9452-55b1ed5a7fee',
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
  'Mon, 16 Sep 2019 18:09:34 GMT',
  'Connection',
  'close',
  'Content-Length',
  '912'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedkeys/recoverKeyName-cancreateakeywithexpires-')
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
  '20f3a624-dd03-472d-a5e2-75dfa5f8e856',
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
  'Mon, 16 Sep 2019 18:09:35 GMT',
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
  '77761cfc-4ea7-4493-9443-8e244d1e4300',
  'x-ms-ests-server',
  '2.1.9368.8 - SEAS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AqhJ5Qd1weFCrqeFzvA1e0Kp4MoTFwAAAC7GEdUOAAAA; expires=Wed, 16-Oct-2019 18:09:37 GMT; path=/; secure; HttpOnly',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; HttpOnly',
  'Date',
  'Mon, 16 Sep 2019 18:09:37 GMT',
  'Connection',
  'close',
  'Content-Length',
  '1231'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedkeys/recoverKeyName-cancreateakeywithexpires-')
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
  '813db07b-ffe0-4dd7-9d5f-c3aecc66459a',
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
  'Mon, 16 Sep 2019 18:09:37 GMT',
  'Connection',
  'close'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedkeys/recoverKeyName-cancreateakeywithexpires-')
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
  'f126d790-9203-4d11-a836-0efcda9d3564',
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
  'Mon, 16 Sep 2019 18:09:49 GMT',
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
  'c18c12e8-2ea7-41c8-8226-c1ec8a444500',
  'x-ms-ests-server',
  '2.1.9368.8 - SEAS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AqhJ5Qd1weFCrqeFzvA1e0Kp4MoTFwAAAC7GEdUOAAAA; expires=Wed, 16-Oct-2019 18:09:50 GMT; path=/; secure; HttpOnly',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; HttpOnly',
  'Date',
  'Mon, 16 Sep 2019 18:09:50 GMT',
  'Connection',
  'close',
  'Content-Length',
  '1231'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedkeys/recoverKeyName-cancreateakeywithexpires-')
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
  '9a4efa98-06d7-4b42-9fd7-fdc1fdd10b10',
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
  'Mon, 16 Sep 2019 18:09:51 GMT',
  'Connection',
  'close'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/recoverKeyName-canupdatekey-/create')
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
  '307c340d-b32e-4f9e-a021-ce782a260d99',
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
  'Mon, 16 Sep 2019 18:09:52 GMT',
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
  'd4fa53a1-52cf-4778-99f4-5c8f37f14500',
  'x-ms-ests-server',
  '2.1.9368.8 - EAS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AqhJ5Qd1weFCrqeFzvA1e0Kp4MoTFwAAAC7GEdUOAAAA; expires=Wed, 16-Oct-2019 18:09:53 GMT; path=/; secure; HttpOnly',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; HttpOnly',
  'Date',
  'Mon, 16 Sep 2019 18:09:53 GMT',
  'Connection',
  'close',
  'Content-Length',
  '1231'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/recoverKeyName-canupdatekey-/create', {"kty":"RSA"})
  .query(true)
  .reply(200, {"key":{"kid":"https://keyvault_name.vault.azure.net/keys/recoverKeyName-canupdatekey-/ddc8085bd5384d8e952cd0fa604aa0c6","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"iuhGecGTIfKm6OamV9wQfQg9UqvK2W6DRdp8DdQdTGQa90rBdLncJyYk3Rp386Z-vKEAwTVPXLq8CENmty1H70nHoKgOQD2U9w3o5RnK3B0gbblUtLEkltKa7Tt-xcgVgf6QyHV-f_cPqxxeFScvffWzoajpBQlP1lQ7q9XrxLpRZPKcVbjxNCvReYWxP6KDVTWHEPBNRBEV8FUY2YAomRq4aFzLCZMtStDlf1ByVtjrD0_A0V62kjY6NXiYmmPM3yuzbyrkRFOMHebbTGSO52YXaU5_Y-kcBIoTXG8R9i0TC3Tl3Gmj2vCUT_WKpEtbF4LL4zR779kUz8xWP20jxQ","e":"AQAB"},"attributes":{"enabled":true,"created":1568657394,"updated":1568657394,"recoveryLevel":"Recoverable+Purgeable"}}, [
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
  '9c9f8f53-f912-4536-94b3-60fbe162749d',
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
  'Mon, 16 Sep 2019 18:09:54 GMT',
  'Connection',
  'close',
  'Content-Length',
  '698'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .patch('/keys/recoverKeyName-canupdatekey-/ddc8085bd5384d8e952cd0fa604aa0c6')
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
  '920aff3d-1636-4661-a88e-b1d9ece36c79',
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
  'Mon, 16 Sep 2019 18:09:54 GMT',
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
  'aa0f83ee-09cf-478b-bb6b-b47efdcd4800',
  'x-ms-ests-server',
  '2.1.9368.8 - EAS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AqhJ5Qd1weFCrqeFzvA1e0Kp4MoTFwAAAC7GEdUOAAAA; expires=Wed, 16-Oct-2019 18:09:56 GMT; path=/; secure; HttpOnly',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; HttpOnly',
  'Date',
  'Mon, 16 Sep 2019 18:09:56 GMT',
  'Connection',
  'close',
  'Content-Length',
  '1231'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .patch('/keys/recoverKeyName-canupdatekey-/ddc8085bd5384d8e952cd0fa604aa0c6', {"attributes":{"enabled":false}})
  .query(true)
  .reply(200, {"key":{"kid":"https://keyvault_name.vault.azure.net/keys/recoverKeyName-canupdatekey-/ddc8085bd5384d8e952cd0fa604aa0c6","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"iuhGecGTIfKm6OamV9wQfQg9UqvK2W6DRdp8DdQdTGQa90rBdLncJyYk3Rp386Z-vKEAwTVPXLq8CENmty1H70nHoKgOQD2U9w3o5RnK3B0gbblUtLEkltKa7Tt-xcgVgf6QyHV-f_cPqxxeFScvffWzoajpBQlP1lQ7q9XrxLpRZPKcVbjxNCvReYWxP6KDVTWHEPBNRBEV8FUY2YAomRq4aFzLCZMtStDlf1ByVtjrD0_A0V62kjY6NXiYmmPM3yuzbyrkRFOMHebbTGSO52YXaU5_Y-kcBIoTXG8R9i0TC3Tl3Gmj2vCUT_WKpEtbF4LL4zR779kUz8xWP20jxQ","e":"AQAB"},"attributes":{"enabled":false,"created":1568657394,"updated":1568657397,"recoveryLevel":"Recoverable+Purgeable"}}, [
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
  '31246891-6406-4e51-9a5c-0134c9b066f2',
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
  'Mon, 16 Sep 2019 18:09:57 GMT',
  'Connection',
  'close',
  'Content-Length',
  '699'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/keys/recoverKeyName-canupdatekey-')
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
  '636c76ff-b8a1-4b57-9c4f-1e7b9b1e3b2c',
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
  'Mon, 16 Sep 2019 18:09:58 GMT',
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
  '9a9aa77b-71d6-4219-9617-fe87879b4300',
  'x-ms-ests-server',
  '2.1.9368.8 - EAS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AqhJ5Qd1weFCrqeFzvA1e0Kp4MoTFwAAAC7GEdUOAAAA; expires=Wed, 16-Oct-2019 18:10:00 GMT; path=/; secure; HttpOnly',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; HttpOnly',
  'Date',
  'Mon, 16 Sep 2019 18:09:59 GMT',
  'Connection',
  'close',
  'Content-Length',
  '1231'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/keys/recoverKeyName-canupdatekey-')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/recoverKeyName-canupdatekey-","deletedDate":1568657401,"scheduledPurgeDate":1576433401,"key":{"kid":"https://keyvault_name.vault.azure.net/keys/recoverKeyName-canupdatekey-/ddc8085bd5384d8e952cd0fa604aa0c6","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"iuhGecGTIfKm6OamV9wQfQg9UqvK2W6DRdp8DdQdTGQa90rBdLncJyYk3Rp386Z-vKEAwTVPXLq8CENmty1H70nHoKgOQD2U9w3o5RnK3B0gbblUtLEkltKa7Tt-xcgVgf6QyHV-f_cPqxxeFScvffWzoajpBQlP1lQ7q9XrxLpRZPKcVbjxNCvReYWxP6KDVTWHEPBNRBEV8FUY2YAomRq4aFzLCZMtStDlf1ByVtjrD0_A0V62kjY6NXiYmmPM3yuzbyrkRFOMHebbTGSO52YXaU5_Y-kcBIoTXG8R9i0TC3Tl3Gmj2vCUT_WKpEtbF4LL4zR779kUz8xWP20jxQ","e":"AQAB"},"attributes":{"enabled":false,"created":1568657394,"updated":1568657397,"recoveryLevel":"Recoverable+Purgeable"}}, [
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
  '7e5306d6-6891-4589-b2ec-9c3fb549875a',
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
  'Mon, 16 Sep 2019 18:10:01 GMT',
  'Connection',
  'close',
  'Content-Length',
  '872'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedkeys/recoverKeyName-canupdatekey-')
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
  '9883d0de-28d9-45d1-b1d9-17f2e96d053f',
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
  'Mon, 16 Sep 2019 18:10:02 GMT',
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
  '28a489c3-90d7-46c3-88f8-215273e14a00',
  'x-ms-ests-server',
  '2.1.9368.8 - EAS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AqhJ5Qd1weFCrqeFzvA1e0Kp4MoTFwAAAC7GEdUOAAAA; expires=Wed, 16-Oct-2019 18:10:04 GMT; path=/; secure; HttpOnly',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; HttpOnly',
  'Date',
  'Mon, 16 Sep 2019 18:10:04 GMT',
  'Connection',
  'close',
  'Content-Length',
  '1231'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedkeys/recoverKeyName-canupdatekey-')
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
  '2438272c-9d02-4f7d-bb45-d4b013060587',
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
  'Mon, 16 Sep 2019 18:10:05 GMT',
  'Connection',
  'close'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/recoverKeyName-canupdateadisabledkey-/create')
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
  'ef8b0866-eba1-485d-ba17-e7345b3e70e3',
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
  'Mon, 16 Sep 2019 18:10:06 GMT',
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
  '28a489c3-90d7-46c3-88f8-2152b7e14a00',
  'x-ms-ests-server',
  '2.1.9368.8 - EAS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AqhJ5Qd1weFCrqeFzvA1e0Kp4MoTFwAAAC7GEdUOAAAA; expires=Wed, 16-Oct-2019 18:10:07 GMT; path=/; secure; HttpOnly',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; HttpOnly',
  'Date',
  'Mon, 16 Sep 2019 18:10:06 GMT',
  'Connection',
  'close',
  'Content-Length',
  '1231'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/recoverKeyName-canupdateadisabledkey-/create', {"kty":"RSA","attributes":{"enabled":false}})
  .query(true)
  .reply(200, {"key":{"kid":"https://keyvault_name.vault.azure.net/keys/recoverKeyName-canupdateadisabledkey-/e55a47f489474e5caa49eee1074a068d","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"ky_lET1i4T_a_13UMZEK1uZDbtabzfUGVsHM0YDqqmfCJ96m9PBbK4B-ewHWdYXP8SVrAFthdR6x8PBLzw34KISMJ1sREiCwD4oDH3SMBGUqPWjmVC1QLSmhvb0_nsyTws0g9q_UB680yQSoL9CYQkd5aTG9l96r-rp2MlVdNi78qy-0f6JTq5yQgGybFuXas4EUL_blBpDave4NPSPzA4oWAvDnrjLK_7wxzPLoMKKL3qtY7_dOZNzFvCKhYIwY7GIlhUGOZDo6rVFoS_bxbEknKtNQ3VItoT7ar0D3-7graUehD0u68yTZMFwO4NyW3qPuKNxqfYbwEXJQv4eFMw","e":"AQAB"},"attributes":{"enabled":false,"created":1568657408,"updated":1568657408,"recoveryLevel":"Recoverable+Purgeable"}}, [
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
  '2fc7930d-b8f4-496d-96b2-7ca8e977854f',
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
  'Mon, 16 Sep 2019 18:10:08 GMT',
  'Connection',
  'close',
  'Content-Length',
  '708'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .patch('/keys/recoverKeyName-canupdateadisabledkey-/e55a47f489474e5caa49eee1074a068d')
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
  'a270fb8d-fa98-416f-8372-a052a0ae2ea3',
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
  'Mon, 16 Sep 2019 18:10:10 GMT',
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
  'c6d33b71-f109-4844-90ab-2447bdb54200',
  'x-ms-ests-server',
  '2.1.9368.8 - SEAS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AqhJ5Qd1weFCrqeFzvA1e0Kp4MoTFwAAAC7GEdUOAAAA; expires=Wed, 16-Oct-2019 18:10:13 GMT; path=/; secure; HttpOnly',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; HttpOnly',
  'Date',
  'Mon, 16 Sep 2019 18:10:12 GMT',
  'Connection',
  'close',
  'Content-Length',
  '1231'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .patch('/keys/recoverKeyName-canupdateadisabledkey-/e55a47f489474e5caa49eee1074a068d', {"attributes":{"exp":1546300800}})
  .query(true)
  .reply(200, {"key":{"kid":"https://keyvault_name.vault.azure.net/keys/recoverKeyName-canupdateadisabledkey-/e55a47f489474e5caa49eee1074a068d","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"ky_lET1i4T_a_13UMZEK1uZDbtabzfUGVsHM0YDqqmfCJ96m9PBbK4B-ewHWdYXP8SVrAFthdR6x8PBLzw34KISMJ1sREiCwD4oDH3SMBGUqPWjmVC1QLSmhvb0_nsyTws0g9q_UB680yQSoL9CYQkd5aTG9l96r-rp2MlVdNi78qy-0f6JTq5yQgGybFuXas4EUL_blBpDave4NPSPzA4oWAvDnrjLK_7wxzPLoMKKL3qtY7_dOZNzFvCKhYIwY7GIlhUGOZDo6rVFoS_bxbEknKtNQ3VItoT7ar0D3-7graUehD0u68yTZMFwO4NyW3qPuKNxqfYbwEXJQv4eFMw","e":"AQAB"},"attributes":{"enabled":false,"exp":1546300800,"created":1568657408,"updated":1568657414,"recoveryLevel":"Recoverable+Purgeable"}}, [
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
  '6063fcec-2c84-4179-818b-a0c769fd3cd7',
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
  'Mon, 16 Sep 2019 18:10:13 GMT',
  'Connection',
  'close',
  'Content-Length',
  '725'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/keys/recoverKeyName-canupdateadisabledkey-')
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
  '422784a0-93b1-416b-863e-1f34b9d2f931',
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
  'Mon, 16 Sep 2019 18:10:15 GMT',
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
  'c6d33b71-f109-4844-90ab-2447edb54200',
  'x-ms-ests-server',
  '2.1.9368.8 - SEAS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AqhJ5Qd1weFCrqeFzvA1e0Kp4MoTFwAAAC7GEdUOAAAA; expires=Wed, 16-Oct-2019 18:10:16 GMT; path=/; secure; HttpOnly',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; HttpOnly',
  'Date',
  'Mon, 16 Sep 2019 18:10:16 GMT',
  'Connection',
  'close',
  'Content-Length',
  '1231'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/keys/recoverKeyName-canupdateadisabledkey-')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/recoverKeyName-canupdateadisabledkey-","deletedDate":1568657417,"scheduledPurgeDate":1576433417,"key":{"kid":"https://keyvault_name.vault.azure.net/keys/recoverKeyName-canupdateadisabledkey-/e55a47f489474e5caa49eee1074a068d","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"ky_lET1i4T_a_13UMZEK1uZDbtabzfUGVsHM0YDqqmfCJ96m9PBbK4B-ewHWdYXP8SVrAFthdR6x8PBLzw34KISMJ1sREiCwD4oDH3SMBGUqPWjmVC1QLSmhvb0_nsyTws0g9q_UB680yQSoL9CYQkd5aTG9l96r-rp2MlVdNi78qy-0f6JTq5yQgGybFuXas4EUL_blBpDave4NPSPzA4oWAvDnrjLK_7wxzPLoMKKL3qtY7_dOZNzFvCKhYIwY7GIlhUGOZDo6rVFoS_bxbEknKtNQ3VItoT7ar0D3-7graUehD0u68yTZMFwO4NyW3qPuKNxqfYbwEXJQv4eFMw","e":"AQAB"},"attributes":{"enabled":false,"exp":1546300800,"created":1568657408,"updated":1568657414,"recoveryLevel":"Recoverable+Purgeable"}}, [
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
  'b458cf92-1874-42bf-94fa-30bae22e6fd4',
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
  'Mon, 16 Sep 2019 18:10:17 GMT',
  'Connection',
  'close',
  'Content-Length',
  '907'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedkeys/recoverKeyName-canupdateadisabledkey-')
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
  '131a2295-ba51-4e81-8640-ea566d4268ca',
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
  'Mon, 16 Sep 2019 18:10:19 GMT',
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
  '17f22f89-8d7a-4269-939b-b804de264100',
  'x-ms-ests-server',
  '2.1.9368.8 - SEAS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AqhJ5Qd1weFCrqeFzvA1e0Kp4MoTFwAAAC7GEdUOAAAA; expires=Wed, 16-Oct-2019 18:10:20 GMT; path=/; secure; HttpOnly',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; HttpOnly',
  'Date',
  'Mon, 16 Sep 2019 18:10:19 GMT',
  'Connection',
  'close',
  'Content-Length',
  '1231'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedkeys/recoverKeyName-canupdateadisabledkey-')
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
  '7c2deafd-5d15-4a86-8b35-a8c277727c6d',
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
  'Mon, 16 Sep 2019 18:10:20 GMT',
  'Connection',
  'close'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedkeys/recoverKeyName-canupdateadisabledkey-')
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
  'c456a900-f45a-4336-b14a-c2b612d1c723',
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
  'Mon, 16 Sep 2019 18:10:31 GMT',
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
  'c1804488-dc1d-4fdb-9c73-7621305e4200',
  'x-ms-ests-server',
  '2.1.9368.8 - EAS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AqhJ5Qd1weFCrqeFzvA1e0Kp4MoTFwAAAC7GEdUOAAAA; expires=Wed, 16-Oct-2019 18:10:33 GMT; path=/; secure; HttpOnly',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; HttpOnly',
  'Date',
  'Mon, 16 Sep 2019 18:10:32 GMT',
  'Connection',
  'close',
  'Content-Length',
  '1231'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedkeys/recoverKeyName-canupdateadisabledkey-')
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
  '61e37914-3b02-4459-9bc4-63c4644a73e1',
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
  'Mon, 16 Sep 2019 18:10:34 GMT',
  'Connection',
  'close'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedkeys/recoverKeyName-canupdateadisabledkey-')
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
  '8af16343-3518-4a89-8eb2-fb851ad9b4bc',
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
  'Mon, 16 Sep 2019 18:10:46 GMT',
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
  '17f22f89-8d7a-4269-939b-b804a9284100',
  'x-ms-ests-server',
  '2.1.9368.8 - SEAS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AqhJ5Qd1weFCrqeFzvA1e0Kp4MoTFwAAAC7GEdUOAAAA; expires=Wed, 16-Oct-2019 18:10:48 GMT; path=/; secure; HttpOnly',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; HttpOnly',
  'Date',
  'Mon, 16 Sep 2019 18:10:47 GMT',
  'Connection',
  'close',
  'Content-Length',
  '1231'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedkeys/recoverKeyName-canupdateadisabledkey-')
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
  '3efeab68-189b-4ff5-89c2-4742fa0961d3',
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
  'Mon, 16 Sep 2019 18:10:48 GMT',
  'Connection',
  'close'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/recoverKeyName-candeleteakey-/create')
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
  '3214df0e-4898-423b-b73c-2281be51042e',
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
  'Mon, 16 Sep 2019 18:10:50 GMT',
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
  'c6d33b71-f109-4844-90ab-244740b84200',
  'x-ms-ests-server',
  '2.1.9368.8 - SEAS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AqhJ5Qd1weFCrqeFzvA1e0Kp4MoTFwAAAC7GEdUOAAAA; expires=Wed, 16-Oct-2019 18:10:51 GMT; path=/; secure; HttpOnly',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; HttpOnly',
  'Date',
  'Mon, 16 Sep 2019 18:10:50 GMT',
  'Connection',
  'close',
  'Content-Length',
  '1231'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/recoverKeyName-candeleteakey-/create', {"kty":"RSA"})
  .query(true)
  .reply(200, {"key":{"kid":"https://keyvault_name.vault.azure.net/keys/recoverKeyName-candeleteakey-/020abe41ca1743d7864c21773dfb903a","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"7yswkAcI_aIBOeLTvBuygwN4oBlpd2Ax7WFZXqBqxCtinUeFcfmf53qnEVB1sqezv0gLYlrM9ErjDEMmy27qPJ4Qy6sFQnCPay90pnasJgauqvda9QMd7pbcW2vMsXmKgSB5aQh4jxxfs_fm8tvQ-4FAa5CyYu7PWucLEGLed9-2Wem5qrqIoBOZyLTZBGINJAy3SXhlIZfFSyuI3eKSnB9Lw12zZWb8vyYDIpXJdPtm-dX630m3UIx5NR-xEREFmtn4ulZQMfJGCTxq6uUmJElXEpK0-FHtMdlC24OFDGqcNYYybcOseIiAcaCRXeUoS99RzgGvR2SBBzqvzyLQPw","e":"AQAB"},"attributes":{"enabled":true,"created":1568657452,"updated":1568657452,"recoveryLevel":"Recoverable+Purgeable"}}, [
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
  'a7c18cab-518b-44c6-87e5-a0396901e663',
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
  'Mon, 16 Sep 2019 18:10:51 GMT',
  'Connection',
  'close',
  'Content-Length',
  '699'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/keys/recoverKeyName-candeleteakey-')
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
  '2c885453-398b-4ab2-894a-ec4a6700d598',
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
  'Mon, 16 Sep 2019 18:10:52 GMT',
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
  'aa0f83ee-09cf-478b-bb6b-b47e8fd24800',
  'x-ms-ests-server',
  '2.1.9368.8 - EAS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AqhJ5Qd1weFCrqeFzvA1e0Kp4MoTFwAAAC7GEdUOAAAA; expires=Wed, 16-Oct-2019 18:10:54 GMT; path=/; secure; HttpOnly',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; HttpOnly',
  'Date',
  'Mon, 16 Sep 2019 18:10:53 GMT',
  'Connection',
  'close',
  'Content-Length',
  '1231'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/keys/recoverKeyName-candeleteakey-')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/recoverKeyName-candeleteakey-","deletedDate":1568657455,"scheduledPurgeDate":1576433455,"key":{"kid":"https://keyvault_name.vault.azure.net/keys/recoverKeyName-candeleteakey-/020abe41ca1743d7864c21773dfb903a","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"7yswkAcI_aIBOeLTvBuygwN4oBlpd2Ax7WFZXqBqxCtinUeFcfmf53qnEVB1sqezv0gLYlrM9ErjDEMmy27qPJ4Qy6sFQnCPay90pnasJgauqvda9QMd7pbcW2vMsXmKgSB5aQh4jxxfs_fm8tvQ-4FAa5CyYu7PWucLEGLed9-2Wem5qrqIoBOZyLTZBGINJAy3SXhlIZfFSyuI3eKSnB9Lw12zZWb8vyYDIpXJdPtm-dX630m3UIx5NR-xEREFmtn4ulZQMfJGCTxq6uUmJElXEpK0-FHtMdlC24OFDGqcNYYybcOseIiAcaCRXeUoS99RzgGvR2SBBzqvzyLQPw","e":"AQAB"},"attributes":{"enabled":true,"created":1568657452,"updated":1568657452,"recoveryLevel":"Recoverable+Purgeable"}}, [
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
  '06e57f11-e100-4a99-b7df-b89bd697b044',
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
  'Mon, 16 Sep 2019 18:10:54 GMT',
  'Connection',
  'close',
  'Content-Length',
  '873'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/keys/recoverKeyName-candeleteakey-/')
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
  '1b3c16b1-474c-4c83-a4f4-4a6b82655df5',
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
  'Mon, 16 Sep 2019 18:10:56 GMT',
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
  'b954eee1-aea5-4d44-a151-cb0ead174300',
  'x-ms-ests-server',
  '2.1.9368.8 - EAS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AqhJ5Qd1weFCrqeFzvA1e0Kp4MoTFwAAAC7GEdUOAAAA; expires=Wed, 16-Oct-2019 18:10:57 GMT; path=/; secure; HttpOnly',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; HttpOnly',
  'Date',
  'Mon, 16 Sep 2019 18:10:57 GMT',
  'Connection',
  'close',
  'Content-Length',
  '1231'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/keys/recoverKeyName-candeleteakey-/')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Key not found: recoverKeyName-candeleteakey-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '106',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  '4812fc8c-2318-4381-b218-fcd0531063db',
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
  'Mon, 16 Sep 2019 18:10:58 GMT',
  'Connection',
  'close'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedkeys/recoverKeyName-candeleteakey-')
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
  '56c20c5d-c40b-4547-beb0-4aa51789cebd',
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
  'Mon, 16 Sep 2019 18:10:59 GMT',
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
  '17f22f89-8d7a-4269-939b-b804b8294100',
  'x-ms-ests-server',
  '2.1.9368.8 - SEAS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AqhJ5Qd1weFCrqeFzvA1e0Kp4MoTFwAAAC7GEdUOAAAA; expires=Wed, 16-Oct-2019 18:11:00 GMT; path=/; secure; HttpOnly',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; HttpOnly',
  'Date',
  'Mon, 16 Sep 2019 18:11:00 GMT',
  'Connection',
  'close',
  'Content-Length',
  '1231'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedkeys/recoverKeyName-candeleteakey-')
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
  '1e628a83-83e0-4f81-a620-51934b00211d',
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
  'Mon, 16 Sep 2019 18:11:01 GMT',
  'Connection',
  'close'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedkeys/recoverKeyName-candeleteakey-')
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
  'de4f1211-5c4c-462b-b526-b877918cdb67',
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
  'Mon, 16 Sep 2019 18:11:12 GMT',
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
  '0b0ecba5-b3fd-466c-81c0-1cc8c93c4700',
  'x-ms-ests-server',
  '2.1.9368.8 - EAS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AqhJ5Qd1weFCrqeFzvA1e0Kp4MoTFwAAAC7GEdUOAAAA; expires=Wed, 16-Oct-2019 18:11:14 GMT; path=/; secure; HttpOnly',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; HttpOnly',
  'Date',
  'Mon, 16 Sep 2019 18:11:13 GMT',
  'Connection',
  'close',
  'Content-Length',
  '1231'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedkeys/recoverKeyName-candeleteakey-')
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
  '9ed60a56-4df4-41fa-872f-50ec50941d71',
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
  'Mon, 16 Sep 2019 18:11:15 GMT',
  'Connection',
  'close'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/keys/recoverKeyName-deletenonexistingkey-/')
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
  '3c6bb261-f128-43dc-8521-647784105833',
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
  'Mon, 16 Sep 2019 18:11:15 GMT',
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
  '63a15c3f-4fe3-4290-8dd4-098a6d704500',
  'x-ms-ests-server',
  '2.1.9368.8 - EAS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AqhJ5Qd1weFCrqeFzvA1e0Kp4MoTFwAAAC7GEdUOAAAA; expires=Wed, 16-Oct-2019 18:11:18 GMT; path=/; secure; HttpOnly',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; HttpOnly',
  'Date',
  'Mon, 16 Sep 2019 18:11:17 GMT',
  'Connection',
  'close',
  'Content-Length',
  '1231'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/keys/recoverKeyName-deletenonexistingkey-/')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Key not found: recoverKeyName-deletenonexistingkey-"}}, [
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
  '544d0602-ce64-48e9-ae20-cd3d9fc8edd4',
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
  'Mon, 16 Sep 2019 18:11:18 GMT',
  'Connection',
  'close'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/recoverKeyName-cangetakey-/create')
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
  'f4dcd080-d602-4031-a59b-8f79404cecae',
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
  'Mon, 16 Sep 2019 18:11:19 GMT',
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
  '17f22f89-8d7a-4269-939b-b804572b4100',
  'x-ms-ests-server',
  '2.1.9368.8 - SEAS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AqhJ5Qd1weFCrqeFzvA1e0Kp4MoTFwAAAC7GEdUOAAAA; expires=Wed, 16-Oct-2019 18:11:20 GMT; path=/; secure; HttpOnly',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; HttpOnly',
  'Date',
  'Mon, 16 Sep 2019 18:11:20 GMT',
  'Connection',
  'close',
  'Content-Length',
  '1231'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/recoverKeyName-cangetakey-/create', {"kty":"RSA"})
  .query(true)
  .reply(200, {"key":{"kid":"https://keyvault_name.vault.azure.net/keys/recoverKeyName-cangetakey-/1d3cb91501c84c0097cef1f25fbe578a","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"vsDMWYcMlUV4eaCad5X2b_5Vy3iUa3r2PwCat29VHdAJn--1TQaW3VBExQU4DtCtCoUndunr4xlwgbTlLli8TNKGirekEyd2O7_SVX8gyGKIgX0OKrktgub-lr7qJaFGp5cL3ShisdL4PZwiZCVYJDJm276BOcKsaEmV1iBlW-LXCOh_JrkLLPtOKq7Y1kc7WXzNnQ-TaPlz09ipWKdRV3knVj1oFY-VhQYQy0jH-1i69jt-daTbqG4mwXJMPd_t1zcFmaaDSk9ROfM8G7QN-x2wLsslqVecUZRtRwPrggG8sPsiNeWjgHyfnYkK09FWEPgnvZeFICzz8i9qbbn-Dw","e":"AQAB"},"attributes":{"enabled":true,"created":1568657482,"updated":1568657482,"recoveryLevel":"Recoverable+Purgeable"}}, [
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
  'd72d8619-f7ca-4897-88a2-1d3d4038846a',
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
  'Mon, 16 Sep 2019 18:11:21 GMT',
  'Connection',
  'close',
  'Content-Length',
  '696'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/keys/recoverKeyName-cangetakey-/')
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
  '304a87de-85fe-4cc3-9a16-f8b96ebf8eae',
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
  'Mon, 16 Sep 2019 18:11:22 GMT',
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
  'b954eee1-aea5-4d44-a151-cb0e9e194300',
  'x-ms-ests-server',
  '2.1.9368.8 - EAS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AqhJ5Qd1weFCrqeFzvA1e0Kp4MoTFwAAAC7GEdUOAAAA; expires=Wed, 16-Oct-2019 18:11:24 GMT; path=/; secure; HttpOnly',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; HttpOnly',
  'Date',
  'Mon, 16 Sep 2019 18:11:23 GMT',
  'Connection',
  'close',
  'Content-Length',
  '1231'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/keys/recoverKeyName-cangetakey-/')
  .query(true)
  .reply(200, {"key":{"kid":"https://keyvault_name.vault.azure.net/keys/recoverKeyName-cangetakey-/1d3cb91501c84c0097cef1f25fbe578a","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"vsDMWYcMlUV4eaCad5X2b_5Vy3iUa3r2PwCat29VHdAJn--1TQaW3VBExQU4DtCtCoUndunr4xlwgbTlLli8TNKGirekEyd2O7_SVX8gyGKIgX0OKrktgub-lr7qJaFGp5cL3ShisdL4PZwiZCVYJDJm276BOcKsaEmV1iBlW-LXCOh_JrkLLPtOKq7Y1kc7WXzNnQ-TaPlz09ipWKdRV3knVj1oFY-VhQYQy0jH-1i69jt-daTbqG4mwXJMPd_t1zcFmaaDSk9ROfM8G7QN-x2wLsslqVecUZRtRwPrggG8sPsiNeWjgHyfnYkK09FWEPgnvZeFICzz8i9qbbn-Dw","e":"AQAB"},"attributes":{"enabled":true,"created":1568657482,"updated":1568657482,"recoveryLevel":"Recoverable+Purgeable"}}, [
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
  'c442b124-a40b-49eb-886f-0164553cab52',
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
  'Mon, 16 Sep 2019 18:11:25 GMT',
  'Connection',
  'close',
  'Content-Length',
  '696'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/keys/recoverKeyName-cangetakey-')
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
  '25289974-fc7c-4969-9e58-9cb4553c91ad',
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
  'Mon, 16 Sep 2019 18:11:26 GMT',
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
  'd4fa53a1-52cf-4778-99f4-5c8f82f84500',
  'x-ms-ests-server',
  '2.1.9368.8 - EAS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AqhJ5Qd1weFCrqeFzvA1e0Kp4MoTFwAAAC7GEdUOAAAA; expires=Wed, 16-Oct-2019 18:11:27 GMT; path=/; secure; HttpOnly',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; HttpOnly',
  'Date',
  'Mon, 16 Sep 2019 18:11:27 GMT',
  'Connection',
  'close',
  'Content-Length',
  '1231'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/keys/recoverKeyName-cangetakey-')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/recoverKeyName-cangetakey-","deletedDate":1568657488,"scheduledPurgeDate":1576433488,"key":{"kid":"https://keyvault_name.vault.azure.net/keys/recoverKeyName-cangetakey-/1d3cb91501c84c0097cef1f25fbe578a","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"vsDMWYcMlUV4eaCad5X2b_5Vy3iUa3r2PwCat29VHdAJn--1TQaW3VBExQU4DtCtCoUndunr4xlwgbTlLli8TNKGirekEyd2O7_SVX8gyGKIgX0OKrktgub-lr7qJaFGp5cL3ShisdL4PZwiZCVYJDJm276BOcKsaEmV1iBlW-LXCOh_JrkLLPtOKq7Y1kc7WXzNnQ-TaPlz09ipWKdRV3knVj1oFY-VhQYQy0jH-1i69jt-daTbqG4mwXJMPd_t1zcFmaaDSk9ROfM8G7QN-x2wLsslqVecUZRtRwPrggG8sPsiNeWjgHyfnYkK09FWEPgnvZeFICzz8i9qbbn-Dw","e":"AQAB"},"attributes":{"enabled":true,"created":1568657482,"updated":1568657482,"recoveryLevel":"Recoverable+Purgeable"}}, [
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
  '7e2bfcae-731e-4af7-bd9b-c163be6fc393',
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
  'Mon, 16 Sep 2019 18:11:28 GMT',
  'Connection',
  'close',
  'Content-Length',
  '867'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedkeys/recoverKeyName-cangetakey-')
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
  'b1d8bc94-ac03-4a6c-9f72-c5b5d68ff989',
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
  'Mon, 16 Sep 2019 18:11:29 GMT',
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
  '9e060a1e-dbf0-4a2c-be90-fd164d0f4200',
  'x-ms-ests-server',
  '2.1.9368.8 - SEAS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AqhJ5Qd1weFCrqeFzvA1e0Kp4MoTFwAAAC7GEdUOAAAA; expires=Wed, 16-Oct-2019 18:11:30 GMT; path=/; secure; HttpOnly',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; HttpOnly',
  'Date',
  'Mon, 16 Sep 2019 18:11:29 GMT',
  'Connection',
  'close',
  'Content-Length',
  '1231'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedkeys/recoverKeyName-cangetakey-')
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
  '0862e256-9eda-4b2b-aec1-f76061a1d339',
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
  'Mon, 16 Sep 2019 18:11:31 GMT',
  'Connection',
  'close'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedkeys/recoverKeyName-cangetakey-')
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
  'b54c04b2-e54c-4730-a7cf-388970021fce',
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
  'Mon, 16 Sep 2019 18:11:42 GMT',
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
  '77761cfc-4ea7-4493-9443-8e24a0264300',
  'x-ms-ests-server',
  '2.1.9368.8 - SEAS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AqhJ5Qd1weFCrqeFzvA1e0Kp4MoTEQAAAFrHEdUOAAAA; expires=Wed, 16-Oct-2019 18:11:43 GMT; path=/; secure; HttpOnly',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; HttpOnly',
  'Date',
  'Mon, 16 Sep 2019 18:11:42 GMT',
  'Connection',
  'close',
  'Content-Length',
  '1231'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedkeys/recoverKeyName-cangetakey-')
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
  '581bbae1-3ac2-4dde-a9ce-5de59e938d5a',
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
  'Mon, 16 Sep 2019 18:11:43 GMT',
  'Connection',
  'close'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/recoverKeyName-cangetaspecificversionofakey-/create')
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
  '3c32f1c0-20d5-442b-87e4-db85c21f1a64',
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
  'Mon, 16 Sep 2019 18:11:44 GMT',
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
  '4065f9eb-e5c5-43ba-9a47-3d774c6d4200',
  'x-ms-ests-server',
  '2.1.9368.8 - SEAS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AqhJ5Qd1weFCrqeFzvA1e0Kp4MoTEgAAAFrHEdUOAAAA; expires=Wed, 16-Oct-2019 18:11:46 GMT; path=/; secure; HttpOnly',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; HttpOnly',
  'Date',
  'Mon, 16 Sep 2019 18:11:46 GMT',
  'Connection',
  'close',
  'Content-Length',
  '1231'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/recoverKeyName-cangetaspecificversionofakey-/create', {"kty":"RSA"})
  .query(true)
  .reply(200, {"key":{"kid":"https://keyvault_name.vault.azure.net/keys/recoverKeyName-cangetaspecificversionofakey-/f7c39a90f71e46b79d35a3ca9f2e4f27","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"veVcrhPQ6rWCiD4kBUMfpONuxxo_5Eaw-Bxc6mOqrOfv-KzGk3759w81CypHHxSe9HXepsPvPTb6Ojz4OIFqxR6VppSf5TYS1J75LX9HYq1YPLb7X8t5tVhJF89kvUIWodO0Na10F4egkjKlvFHxCz3TIAb0EPIm2sBPGT6U22yz2UnoKHRZdPrBrpmSVEiDqtEfOCg8rvxG0dpRmHhxLIuqYsosofJs4LDjenhAA4dL8ZdDpxxDbp7272Vvsifg05Ya-VG8qpjPQEBAOPA2kgSvw2Wz1hRtvAZgoH8yJusXjQxgAKlgMPrLJgjIZvQikBE2ToyA6yWTg2DBBshcTQ","e":"AQAB"},"attributes":{"enabled":true,"created":1568657508,"updated":1568657508,"recoveryLevel":"Recoverable+Purgeable"}}, [
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
  '39e8d653-ddc2-40a8-8c31-965e3bb24ef6',
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
  'Mon, 16 Sep 2019 18:11:48 GMT',
  'Connection',
  'close',
  'Content-Length',
  '714'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/keys/recoverKeyName-cangetaspecificversionofakey-/f7c39a90f71e46b79d35a3ca9f2e4f27')
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
  '8c1f76d6-cd63-4780-9afe-974f39418aba',
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
  'Mon, 16 Sep 2019 18:11:48 GMT',
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
  '4f3dd40b-06d1-4d66-af95-ad437b984200',
  'x-ms-ests-server',
  '2.1.9368.8 - SEAS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AqhJ5Qd1weFCrqeFzvA1e0Kp4MoTEwAAAFrHEdUOAAAA; expires=Wed, 16-Oct-2019 18:11:49 GMT; path=/; secure; HttpOnly',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; HttpOnly',
  'Date',
  'Mon, 16 Sep 2019 18:11:49 GMT',
  'Connection',
  'close',
  'Content-Length',
  '1231'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/keys/recoverKeyName-cangetaspecificversionofakey-/f7c39a90f71e46b79d35a3ca9f2e4f27')
  .query(true)
  .reply(200, {"key":{"kid":"https://keyvault_name.vault.azure.net/keys/recoverKeyName-cangetaspecificversionofakey-/f7c39a90f71e46b79d35a3ca9f2e4f27","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"veVcrhPQ6rWCiD4kBUMfpONuxxo_5Eaw-Bxc6mOqrOfv-KzGk3759w81CypHHxSe9HXepsPvPTb6Ojz4OIFqxR6VppSf5TYS1J75LX9HYq1YPLb7X8t5tVhJF89kvUIWodO0Na10F4egkjKlvFHxCz3TIAb0EPIm2sBPGT6U22yz2UnoKHRZdPrBrpmSVEiDqtEfOCg8rvxG0dpRmHhxLIuqYsosofJs4LDjenhAA4dL8ZdDpxxDbp7272Vvsifg05Ya-VG8qpjPQEBAOPA2kgSvw2Wz1hRtvAZgoH8yJusXjQxgAKlgMPrLJgjIZvQikBE2ToyA6yWTg2DBBshcTQ","e":"AQAB"},"attributes":{"enabled":true,"created":1568657508,"updated":1568657508,"recoveryLevel":"Recoverable+Purgeable"}}, [
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
  'c4095dc4-a537-41d3-a2e8-bb53c8063c1e',
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
  'Mon, 16 Sep 2019 18:11:51 GMT',
  'Connection',
  'close',
  'Content-Length',
  '714'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/keys/recoverKeyName-cangetaspecificversionofakey-')
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
  'f144b196-fd27-45af-bed7-dac735843de4',
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
  'Mon, 16 Sep 2019 18:11:52 GMT',
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
  'aa0f83ee-09cf-478b-bb6b-b47e22d74800',
  'x-ms-ests-server',
  '2.1.9368.8 - EAS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AqhJ5Qd1weFCrqeFzvA1e0Kp4MoTFAAAAFrHEdUOAAAA; expires=Wed, 16-Oct-2019 18:11:53 GMT; path=/; secure; HttpOnly',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; HttpOnly',
  'Date',
  'Mon, 16 Sep 2019 18:11:53 GMT',
  'Connection',
  'close',
  'Content-Length',
  '1231'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/keys/recoverKeyName-cangetaspecificversionofakey-')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/recoverKeyName-cangetaspecificversionofakey-","deletedDate":1568657514,"scheduledPurgeDate":1576433514,"key":{"kid":"https://keyvault_name.vault.azure.net/keys/recoverKeyName-cangetaspecificversionofakey-/f7c39a90f71e46b79d35a3ca9f2e4f27","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"veVcrhPQ6rWCiD4kBUMfpONuxxo_5Eaw-Bxc6mOqrOfv-KzGk3759w81CypHHxSe9HXepsPvPTb6Ojz4OIFqxR6VppSf5TYS1J75LX9HYq1YPLb7X8t5tVhJF89kvUIWodO0Na10F4egkjKlvFHxCz3TIAb0EPIm2sBPGT6U22yz2UnoKHRZdPrBrpmSVEiDqtEfOCg8rvxG0dpRmHhxLIuqYsosofJs4LDjenhAA4dL8ZdDpxxDbp7272Vvsifg05Ya-VG8qpjPQEBAOPA2kgSvw2Wz1hRtvAZgoH8yJusXjQxgAKlgMPrLJgjIZvQikBE2ToyA6yWTg2DBBshcTQ","e":"AQAB"},"attributes":{"enabled":true,"created":1568657508,"updated":1568657508,"recoveryLevel":"Recoverable+Purgeable"}}, [
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
  '5277a3f4-e21a-442e-ac43-5369f83a990b',
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
  'Mon, 16 Sep 2019 18:11:54 GMT',
  'Connection',
  'close',
  'Content-Length',
  '903'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedkeys/recoverKeyName-cangetaspecificversionofakey-')
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
  '9570f7b9-6d83-4125-92e4-e60ebfd99d2b',
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
  'Mon, 16 Sep 2019 18:11:55 GMT',
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
  '28a489c3-90d7-46c3-88f8-215219ea4a00',
  'x-ms-ests-server',
  '2.1.9368.8 - EAS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AqhJ5Qd1weFCrqeFzvA1e0Kp4MoTFQAAAFrHEdUOAAAA; expires=Wed, 16-Oct-2019 18:11:56 GMT; path=/; secure; HttpOnly',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; HttpOnly',
  'Date',
  'Mon, 16 Sep 2019 18:11:56 GMT',
  'Connection',
  'close',
  'Content-Length',
  '1231'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedkeys/recoverKeyName-cangetaspecificversionofakey-')
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
  '5fccbd94-1b23-4c6d-aed3-acca8d1f550d',
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
  'Mon, 16 Sep 2019 18:11:57 GMT',
  'Connection',
  'close'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedkeys/recoverKeyName-cangetaspecificversionofakey-')
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
  '005d1c02-ca24-4ac2-84e5-b5ef1f22d933',
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
  'Mon, 16 Sep 2019 18:12:08 GMT',
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
  '63a15c3f-4fe3-4290-8dd4-098a61744500',
  'x-ms-ests-server',
  '2.1.9368.8 - EAS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AqhJ5Qd1weFCrqeFzvA1e0Kp4MoTFgAAAFrHEdUOAAAA; expires=Wed, 16-Oct-2019 18:12:09 GMT; path=/; secure; HttpOnly',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; HttpOnly',
  'Date',
  'Mon, 16 Sep 2019 18:12:09 GMT',
  'Connection',
  'close',
  'Content-Length',
  '1231'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedkeys/recoverKeyName-cangetaspecificversionofakey-')
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
  'e0c3d71b-9571-43d0-a202-25acbd9fb8d1',
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
  'Mon, 16 Sep 2019 18:12:10 GMT',
  'Connection',
  'close'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/recoverKeyName-cangetadeletedkey-/create')
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
  '542c92c0-8f8a-4e8c-ada9-0bbd7658e49a',
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
  'Mon, 16 Sep 2019 18:12:11 GMT',
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
  '2431b191-465e-4618-85ad-f51b70d64300',
  'x-ms-ests-server',
  '2.1.9368.8 - EAS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AqhJ5Qd1weFCrqeFzvA1e0Kp4MoTFwAAAFrHEdUOAAAA; expires=Wed, 16-Oct-2019 18:12:13 GMT; path=/; secure; HttpOnly',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; HttpOnly',
  'Date',
  'Mon, 16 Sep 2019 18:12:12 GMT',
  'Connection',
  'close',
  'Content-Length',
  '1231'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/recoverKeyName-cangetadeletedkey-/create', {"kty":"RSA"})
  .query(true)
  .reply(200, {"key":{"kid":"https://keyvault_name.vault.azure.net/keys/recoverKeyName-cangetadeletedkey-/6d02b594e7f34a9bb0904d0421239a56","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"jha06T9w5JpH0QuqazrlB78I7o9BJmIZNocOFfCYCqkypuFWF9CM4TbOSUL2YaiVWJktX_Qg0PQFnLb2Eu1qVKRXXw3KiBIGdHNfNVOsMKD1cB3uJnsKCzxLA44Z93O9IWDzq3VgXbA1W8kkGjhVtyqC6qdHrVmdb3t1V4kEjy6z_tofGsOTkYscQlftc9JXNowVyZMFr9SD_xcrD2mbGu0DP_llUEHN8frxZyxzWj9w4Lqq0lP6pPhtlrelu8PNOp81FHWnpg9fNAbWofOYCXJPxfweu3c8Yzl7GHCH3fenuvMn_v3-bGR1m-Lq5rm7V9JxDeJscofERylvrLp4mw","e":"AQAB"},"attributes":{"enabled":true,"created":1568657534,"updated":1568657534,"recoveryLevel":"Recoverable+Purgeable"}}, [
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
  'e16ba82b-150b-4979-be3d-d01a90ba98af',
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
  'Mon, 16 Sep 2019 18:12:13 GMT',
  'Connection',
  'close',
  'Content-Length',
  '703'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/keys/recoverKeyName-cangetadeletedkey-')
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
  '3b760248-b7b3-4724-8147-6ce92ee7f968',
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
  'Mon, 16 Sep 2019 18:12:14 GMT',
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
  '8e881d8f-c64e-46a8-a2bf-2c73f2054400',
  'x-ms-ests-server',
  '2.1.9368.8 - EAS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AqhJ5Qd1weFCrqeFzvA1e0Kp4MoTFwAAAFrHEdUOAAAA; expires=Wed, 16-Oct-2019 18:12:15 GMT; path=/; secure; HttpOnly',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; HttpOnly',
  'Date',
  'Mon, 16 Sep 2019 18:12:15 GMT',
  'Connection',
  'close',
  'Content-Length',
  '1231'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/keys/recoverKeyName-cangetadeletedkey-')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/recoverKeyName-cangetadeletedkey-","deletedDate":1568657536,"scheduledPurgeDate":1576433536,"key":{"kid":"https://keyvault_name.vault.azure.net/keys/recoverKeyName-cangetadeletedkey-/6d02b594e7f34a9bb0904d0421239a56","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"jha06T9w5JpH0QuqazrlB78I7o9BJmIZNocOFfCYCqkypuFWF9CM4TbOSUL2YaiVWJktX_Qg0PQFnLb2Eu1qVKRXXw3KiBIGdHNfNVOsMKD1cB3uJnsKCzxLA44Z93O9IWDzq3VgXbA1W8kkGjhVtyqC6qdHrVmdb3t1V4kEjy6z_tofGsOTkYscQlftc9JXNowVyZMFr9SD_xcrD2mbGu0DP_llUEHN8frxZyxzWj9w4Lqq0lP6pPhtlrelu8PNOp81FHWnpg9fNAbWofOYCXJPxfweu3c8Yzl7GHCH3fenuvMn_v3-bGR1m-Lq5rm7V9JxDeJscofERylvrLp4mw","e":"AQAB"},"attributes":{"enabled":true,"created":1568657534,"updated":1568657534,"recoveryLevel":"Recoverable+Purgeable"}}, [
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
  'f1627c62-16e3-4583-a3dc-585170ee8cd8',
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
  'Mon, 16 Sep 2019 18:12:17 GMT',
  'Connection',
  'close',
  'Content-Length',
  '881'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/recoverKeyName-cangetadeletedkey-')
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
  '2584736a-4a92-44a1-99b9-2c19570d7af5',
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
  'Mon, 16 Sep 2019 18:12:17 GMT',
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
  '17ecb9f4-a911-4dd9-b142-117597264600',
  'x-ms-ests-server',
  '2.1.9368.8 - SEAS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AqhJ5Qd1weFCrqeFzvA1e0Kp4MoTFwAAAFrHEdUOAAAA; expires=Wed, 16-Oct-2019 18:12:18 GMT; path=/; secure; HttpOnly',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; HttpOnly',
  'Date',
  'Mon, 16 Sep 2019 18:12:18 GMT',
  'Connection',
  'close',
  'Content-Length',
  '1231'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/recoverKeyName-cangetadeletedkey-')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: recoverKeyName-cangetadeletedkey-"}}, [
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
  '11b9a0c9-ef1b-41e6-a8a1-8071de7fcac9',
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
  'Mon, 16 Sep 2019 18:12:19 GMT',
  'Connection',
  'close'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/recoverKeyName-cangetadeletedkey-')
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
  'c2ee937f-c6f4-4e2e-adcc-d6d31b337dfb',
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
  'Mon, 16 Sep 2019 18:12:30 GMT',
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
  '09f9f762-7e96-45cb-b965-37b78dcc4300',
  'x-ms-ests-server',
  '2.1.9368.8 - EAS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AqhJ5Qd1weFCrqeFzvA1e0Kp4MoTFwAAAFrHEdUOAAAA; expires=Wed, 16-Oct-2019 18:12:32 GMT; path=/; secure; HttpOnly',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; HttpOnly',
  'Date',
  'Mon, 16 Sep 2019 18:12:32 GMT',
  'Connection',
  'close',
  'Content-Length',
  '1231'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/recoverKeyName-cangetadeletedkey-')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/recoverKeyName-cangetadeletedkey-","deletedDate":1568657536,"scheduledPurgeDate":1576433536,"key":{"kid":"https://keyvault_name.vault.azure.net/keys/recoverKeyName-cangetadeletedkey-/6d02b594e7f34a9bb0904d0421239a56","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"jha06T9w5JpH0QuqazrlB78I7o9BJmIZNocOFfCYCqkypuFWF9CM4TbOSUL2YaiVWJktX_Qg0PQFnLb2Eu1qVKRXXw3KiBIGdHNfNVOsMKD1cB3uJnsKCzxLA44Z93O9IWDzq3VgXbA1W8kkGjhVtyqC6qdHrVmdb3t1V4kEjy6z_tofGsOTkYscQlftc9JXNowVyZMFr9SD_xcrD2mbGu0DP_llUEHN8frxZyxzWj9w4Lqq0lP6pPhtlrelu8PNOp81FHWnpg9fNAbWofOYCXJPxfweu3c8Yzl7GHCH3fenuvMn_v3-bGR1m-Lq5rm7V9JxDeJscofERylvrLp4mw","e":"AQAB"},"attributes":{"enabled":true,"created":1568657534,"updated":1568657534,"recoveryLevel":"Recoverable+Purgeable"}}, [
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
  'e7c44430-4f65-421d-acf6-2f345c7a4a7d',
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
  'Mon, 16 Sep 2019 18:12:33 GMT',
  'Connection',
  'close',
  'Content-Length',
  '881'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedkeys/recoverKeyName-cangetadeletedkey-')
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
  '75d71ba0-75ca-4497-aa2b-43eaea486383',
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
  'Mon, 16 Sep 2019 18:12:34 GMT',
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
  '0fc90094-3914-4a88-b5fa-19b5fe3b4700',
  'x-ms-ests-server',
  '2.1.9368.8 - EAS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AqhJ5Qd1weFCrqeFzvA1e0Kp4MoTFwAAAFrHEdUOAAAA; expires=Wed, 16-Oct-2019 18:12:35 GMT; path=/; secure; HttpOnly',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; HttpOnly',
  'Date',
  'Mon, 16 Sep 2019 18:12:35 GMT',
  'Connection',
  'close',
  'Content-Length',
  '1231'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedkeys/recoverKeyName-cangetadeletedkey-')
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
  'a58683d5-04a3-4dd1-a897-dcff4706ae00',
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
  'Mon, 16 Sep 2019 18:12:35 GMT',
  'Connection',
  'close'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/keys/recoverKeyName-cantgetadeletedkeythatdoesntexist-')
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
  '4785c569-77dc-4d68-adcc-9f9e270a892b',
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
  'Mon, 16 Sep 2019 18:12:37 GMT',
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
  '91e32c98-0bc4-4c27-9e03-af65b7e74100',
  'x-ms-ests-server',
  '2.1.9368.8 - EAS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AqhJ5Qd1weFCrqeFzvA1e0Kp4MoTFwAAAFrHEdUOAAAA; expires=Wed, 16-Oct-2019 18:12:38 GMT; path=/; secure; HttpOnly',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; HttpOnly',
  'Date',
  'Mon, 16 Sep 2019 18:12:38 GMT',
  'Connection',
  'close',
  'Content-Length',
  '1231'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/keys/recoverKeyName-cantgetadeletedkeythatdoesntexist-')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Key not found: recoverKeyName-cantgetadeletedkeythatdoesntexist-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '126',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  '83b83d9c-8c48-40d4-ad26-5e1cb324d8ca',
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
  'Mon, 16 Sep 2019 18:12:39 GMT',
  'Connection',
  'close'
]);


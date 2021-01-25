let nock = require('nock');

module.exports.hash = "dd84943b2fc28577594d04ae09a5daae";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/CRUDKeyName-cancreateaRSAkeywithpublicexponent-/create')
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
  'x-ms-request-id',
  '788080ac-d2b2-47b5-b3d6-e61b268bce09',
  'x-ms-keyvault-service-version',
  '1.2.139.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 25 Jan 2021 19:21:15 GMT'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fvault.azure.net%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":86399,"ext_expires_in":86399,"access_token":"access_token"}, [
  'Cache-Control',
  'no-store, no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '1315',
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
  '59a277b0-eae8-4e0f-8a9b-06098ce30200',
  'x-ms-ests-server',
  '2.1.11444.8 - WUS2 ProdSlices',
  'Set-Cookie',
  'fpc=ApsTFCD_LBlFu6PiQOQ8qPusQTTcAQAAACoRodcOAAAA; expires=Wed, 24-Feb-2021 19:21:15 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Mon, 25 Jan 2021 19:21:15 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/CRUDKeyName-cancreateaRSAkeywithpublicexponent-/create', {"kty":"RSA","public_exponent":3,"attributes":{}})
  .query(true)
  .reply(200, {"key":{"kid":"https://keyvault_name.vault.azure.net/keys/CRUDKeyName-cancreateaRSAkeywithpublicexponent-/24d1f3b6b3fd464a849a6ff0354138e1","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"vR7dx24o05j6c6KHQI-eWxwVmgly96hKf2cBOmdLEwfmPF2liBdmtzFCn9-6dEDKlkk7hooC4-MuhTSUXGaNVbWtvWoVnaaTbPjcI5wm035WbaUuBOT3R7xQzhtR0Ow6mAMRk6-Mv0fieXQUuHFdPAvPTn7f0pvZvojNh7PYHENs6GFppD8QDtW83NstLBRhGWlBiDSohlQJcPGKLEckUXsPNOaItRaxYH5B7AjaiwIMMn-ltNzpI90sZPyyn5ocUTCPZn7op89NKHDVr0gewcRP8_s9RC_09ETxFdyfQsjKNXliMIvtBYpkKROFWCZYAyYedvkEohbqAMLEJDr0tQ","e":"AQAB"},"attributes":{"enabled":true,"created":1611602475,"updated":1611602475,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7}}, [
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
  'x-ms-request-id',
  '40a30c29-d894-4f67-8389-fbf0b5467375',
  'x-ms-keyvault-service-version',
  '1.2.139.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 25 Jan 2021 19:21:15 GMT',
  'Content-Length',
  '737'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/keys/CRUDKeyName-cancreateaRSAkeywithpublicexponent-')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/CRUDKeyName-cancreateaRSAkeywithpublicexponent-","deletedDate":1611602476,"scheduledPurgeDate":1612207276,"key":{"kid":"https://keyvault_name.vault.azure.net/keys/CRUDKeyName-cancreateaRSAkeywithpublicexponent-/24d1f3b6b3fd464a849a6ff0354138e1","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"vR7dx24o05j6c6KHQI-eWxwVmgly96hKf2cBOmdLEwfmPF2liBdmtzFCn9-6dEDKlkk7hooC4-MuhTSUXGaNVbWtvWoVnaaTbPjcI5wm035WbaUuBOT3R7xQzhtR0Ow6mAMRk6-Mv0fieXQUuHFdPAvPTn7f0pvZvojNh7PYHENs6GFppD8QDtW83NstLBRhGWlBiDSohlQJcPGKLEckUXsPNOaItRaxYH5B7AjaiwIMMn-ltNzpI90sZPyyn5ocUTCPZn7op89NKHDVr0gewcRP8_s9RC_09ETxFdyfQsjKNXliMIvtBYpkKROFWCZYAyYedvkEohbqAMLEJDr0tQ","e":"AQAB"},"attributes":{"enabled":true,"created":1611602475,"updated":1611602475,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7}}, [
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
  'x-ms-request-id',
  '7f2ddb23-d19b-45c0-b212-2b7da37e3d2f',
  'x-ms-keyvault-service-version',
  '1.2.139.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 25 Jan 2021 19:21:16 GMT',
  'Content-Length',
  '919'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/CRUDKeyName-cancreateaRSAkeywithpublicexponent-')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: CRUDKeyName-cancreateaRSAkeywithpublicexponent-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '130',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  '1df6e1a5-cb5a-4488-9b37-bf6dcf2c3791',
  'x-ms-keyvault-service-version',
  '1.2.139.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 25 Jan 2021 19:21:16 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/CRUDKeyName-cancreateaRSAkeywithpublicexponent-')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: CRUDKeyName-cancreateaRSAkeywithpublicexponent-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '130',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  '0c6261cb-4415-4a3a-88b3-b5e8a5f5803e',
  'x-ms-keyvault-service-version',
  '1.2.139.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 25 Jan 2021 19:21:16 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/CRUDKeyName-cancreateaRSAkeywithpublicexponent-')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: CRUDKeyName-cancreateaRSAkeywithpublicexponent-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '130',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  'aa7d11cf-3c2b-4fef-87cc-3a964b9a0a11',
  'x-ms-keyvault-service-version',
  '1.2.139.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 25 Jan 2021 19:21:18 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/CRUDKeyName-cancreateaRSAkeywithpublicexponent-')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/CRUDKeyName-cancreateaRSAkeywithpublicexponent-","deletedDate":1611602476,"scheduledPurgeDate":1612207276,"key":{"kid":"https://keyvault_name.vault.azure.net/keys/CRUDKeyName-cancreateaRSAkeywithpublicexponent-/24d1f3b6b3fd464a849a6ff0354138e1","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"vR7dx24o05j6c6KHQI-eWxwVmgly96hKf2cBOmdLEwfmPF2liBdmtzFCn9-6dEDKlkk7hooC4-MuhTSUXGaNVbWtvWoVnaaTbPjcI5wm035WbaUuBOT3R7xQzhtR0Ow6mAMRk6-Mv0fieXQUuHFdPAvPTn7f0pvZvojNh7PYHENs6GFppD8QDtW83NstLBRhGWlBiDSohlQJcPGKLEckUXsPNOaItRaxYH5B7AjaiwIMMn-ltNzpI90sZPyyn5ocUTCPZn7op89NKHDVr0gewcRP8_s9RC_09ETxFdyfQsjKNXliMIvtBYpkKROFWCZYAyYedvkEohbqAMLEJDr0tQ","e":"AQAB"},"attributes":{"enabled":true,"created":1611602475,"updated":1611602475,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7}}, [
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
  'x-ms-request-id',
  'c92b237f-ef43-48ef-ab12-237bf0d3627b',
  'x-ms-keyvault-service-version',
  '1.2.139.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 25 Jan 2021 19:21:20 GMT',
  'Content-Length',
  '919'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedkeys/CRUDKeyName-cancreateaRSAkeywithpublicexponent-')
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
  'x-ms-request-id',
  'eacac060-1ade-4dfe-b2dc-7aa88091a78e',
  'x-ms-keyvault-service-version',
  '1.2.139.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 25 Jan 2021 19:21:20 GMT'
]);

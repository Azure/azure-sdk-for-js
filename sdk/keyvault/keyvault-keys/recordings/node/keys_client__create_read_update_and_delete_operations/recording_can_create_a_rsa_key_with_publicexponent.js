let nock = require('nock');

module.exports.hash = "2dff0a381e0febc3303efdfe0eaa60ce";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/CRUDKeyName-cancreateaRSAkeywithpublicExponent-/create')
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
  '62ee77c9-40dd-471d-a227-04b74452ec3d',
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
  'Mon, 25 Jan 2021 16:06:40 GMT'
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
  '1a03fb20-29c9-4010-9255-3df1840d0e00',
  'x-ms-ests-server',
  '2.1.11419.13 - EUS ProdSlices',
  'Set-Cookie',
  'fpc=Am6ghDZ40_dFunUyDteaK1CsQTTcAQAAAJDjoNcOAAAA; expires=Wed, 24-Feb-2021 16:06:41 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Mon, 25 Jan 2021 16:06:40 GMT',
  'Content-Length',
  '1315'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/CRUDKeyName-cancreateaRSAkeywithpublicExponent-/create', {"kty":"RSA","public_exponent":123,"attributes":{}})
  .query(true)
  .reply(200, {"key":{"kid":"https://keyvault_name.vault.azure.netkeys/CRUDKeyName-cancreateaRSAkeywithpublicExponent-/b1a3e1ab292b4b49bc06e747606fa8fa","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"tPsm4DNb913R5TpB3hvnI43T5Tf2C9_XluTO6rBNrw20ntlaNd1fTlPCrzh0cyREYQF9OlJowwf9caIL39tE42M-pb1RJXLXVx_l4hxBGmYo5hKExhCKou8pLb7KrRcOXtEBdgJBdeOBl-7A0YU07UOxYSJFS56QAX4B9WzshqkS7Yo-D82lkvCOGvVi8g5J1gBWH2DDhBNSDbpYdkY-Qdoo59--dZHgT8wRZW4BSA6mFoeykqlhJEbt2JFr-qfqMYvIJEZXxCZ-jkYBGkz89wJ7ArgE4FeT-jaFL_1v4XC9hf9jdfm8Ouwmq7UO4YCmbWmftNGjy8vEmAyVfd91yQ","e":"AQAB"},"attributes":{"enabled":true,"created":1611590801,"updated":1611590801,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7}}, [
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
  '809dceaa-ff93-4fd7-9781-2d57ec992e15',
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
  'Mon, 25 Jan 2021 16:06:41 GMT',
  'Content-Length',
  '738'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/keys/CRUDKeyName-cancreateaRSAkeywithpublicExponent-')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.netdeletedkeys/CRUDKeyName-cancreateaRSAkeywithpublicExponent-","deletedDate":1611590801,"scheduledPurgeDate":1612195601,"key":{"kid":"https://keyvault_name.vault.azure.netkeys/CRUDKeyName-cancreateaRSAkeywithpublicExponent-/b1a3e1ab292b4b49bc06e747606fa8fa","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"tPsm4DNb913R5TpB3hvnI43T5Tf2C9_XluTO6rBNrw20ntlaNd1fTlPCrzh0cyREYQF9OlJowwf9caIL39tE42M-pb1RJXLXVx_l4hxBGmYo5hKExhCKou8pLb7KrRcOXtEBdgJBdeOBl-7A0YU07UOxYSJFS56QAX4B9WzshqkS7Yo-D82lkvCOGvVi8g5J1gBWH2DDhBNSDbpYdkY-Qdoo59--dZHgT8wRZW4BSA6mFoeykqlhJEbt2JFr-qfqMYvIJEZXxCZ-jkYBGkz89wJ7ArgE4FeT-jaFL_1v4XC9hf9jdfm8Ouwmq7UO4YCmbWmftNGjy8vEmAyVfd91yQ","e":"AQAB"},"attributes":{"enabled":true,"created":1611590801,"updated":1611590801,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7}}, [
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
  '9a8a9465-71ff-45d0-87c0-4574b79db919',
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
  'Mon, 25 Jan 2021 16:06:41 GMT',
  'Content-Length',
  '921'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/CRUDKeyName-cancreateaRSAkeywithpublicExponent-')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: CRUDKeyName-cancreateaRSAkeywithpublicExponent-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '131',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  '1ecc2284-5461-4b25-b889-32844b20b3b7',
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
  'Mon, 25 Jan 2021 16:06:41 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/CRUDKeyName-cancreateaRSAkeywithpublicExponent-')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: CRUDKeyName-cancreateaRSAkeywithpublicExponent-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '131',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  'e40b66d2-1b45-4580-9a81-c71636a3288c',
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
  'Mon, 25 Jan 2021 16:06:41 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/CRUDKeyName-cancreateaRSAkeywithpublicExponent-')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.netdeletedkeys/CRUDKeyName-cancreateaRSAkeywithpublicExponent-","deletedDate":1611590801,"scheduledPurgeDate":1612195601,"key":{"kid":"https://keyvault_name.vault.azure.netkeys/CRUDKeyName-cancreateaRSAkeywithpublicExponent-/b1a3e1ab292b4b49bc06e747606fa8fa","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"tPsm4DNb913R5TpB3hvnI43T5Tf2C9_XluTO6rBNrw20ntlaNd1fTlPCrzh0cyREYQF9OlJowwf9caIL39tE42M-pb1RJXLXVx_l4hxBGmYo5hKExhCKou8pLb7KrRcOXtEBdgJBdeOBl-7A0YU07UOxYSJFS56QAX4B9WzshqkS7Yo-D82lkvCOGvVi8g5J1gBWH2DDhBNSDbpYdkY-Qdoo59--dZHgT8wRZW4BSA6mFoeykqlhJEbt2JFr-qfqMYvIJEZXxCZ-jkYBGkz89wJ7ArgE4FeT-jaFL_1v4XC9hf9jdfm8Ouwmq7UO4YCmbWmftNGjy8vEmAyVfd91yQ","e":"AQAB"},"attributes":{"enabled":true,"created":1611590801,"updated":1611590801,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7}}, [
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
  'e30f86b4-46f8-4ccd-af69-508ae35506b9',
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
  'Mon, 25 Jan 2021 16:06:43 GMT',
  'Content-Length',
  '921'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedkeys/CRUDKeyName-cancreateaRSAkeywithpublicExponent-')
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
  'ec4ddc92-0d65-4661-9a02-44b827c206c7',
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
  'Mon, 25 Jan 2021 16:06:43 GMT'
]);

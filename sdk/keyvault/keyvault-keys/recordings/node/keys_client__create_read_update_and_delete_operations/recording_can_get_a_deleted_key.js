let nock = require('nock');

module.exports.hash = "b00caf944b66db5cde231fd4a1ee2a6a";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/CRUDKeyName-cangetadeletedkey-/create')
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
  '3d4d8c68-0250-4ad7-8c79-de154b26cdb2',
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
  'Thu, 25 Jun 2020 11:54:29 GMT'
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
  '950ad164-8663-4cb9-aa7f-f50357680701',
  'x-ms-ests-server',
  '2.1.10732.8 - EUS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AgUIA1CRBWZEu1bCmWu9eYI_aSJHAQAAAHaHhtYOAAAA; expires=Sat, 25-Jul-2020 11:54:30 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; SameSite=None; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; SameSite=None; secure; HttpOnly',
  'Date',
  'Thu, 25 Jun 2020 11:54:29 GMT',
  'Content-Length',
  '1315'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/CRUDKeyName-cangetadeletedkey-/create', {"kty":"RSA"})
  .query(true)
  .reply(200, {"key":{"kid":"https://keyvault_name.vault.azure.net/keys/CRUDKeyName-cangetadeletedkey-/409fb29e2cf44122a9c50a629064c6fa","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"mng2QkbhpSZHxagELRgXRFnRcI737hxj6hNONSoIDiNGgFj5mTcWoHvfJpMG0p0wgnw-dP8feRwBGQeD40QJRdu9iMzKctNrpfr_XK6DKedFcEEavoM0up2Uib-e64PF2DjiO9UhtdCR3KZVFyQN4d-FuIkpB1irfHkc9Sc0PcbKK9Bph0KW-6-79nC6x9BO3JDcDHY4IRuL03MyjLNcXnXgLEmldBKAjzQH8t6OsaorFSNZc2F7HIwfeTIYzbxOVDbXXrQ-Vwu0rVefMmY1QpDOKJ950ibKCxdJ5Jt2JIt3TdP8QHvH6PJ0giA7YbFfl46yFDRDn1glsp7GVMhftw","e":"AQAB"},"attributes":{"enabled":true,"created":1593086070,"updated":1593086070,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90}}, [
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
  'b43e1b31-5a1c-4b27-a78a-02758119af59',
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
  'Thu, 25 Jun 2020 11:54:29 GMT',
  'Content-Length',
  '720'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/keys/CRUDKeyName-cangetadeletedkey-')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/CRUDKeyName-cangetadeletedkey-","deletedDate":1593086070,"scheduledPurgeDate":1600862070,"key":{"kid":"https://keyvault_name.vault.azure.net/keys/CRUDKeyName-cangetadeletedkey-/409fb29e2cf44122a9c50a629064c6fa","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"mng2QkbhpSZHxagELRgXRFnRcI737hxj6hNONSoIDiNGgFj5mTcWoHvfJpMG0p0wgnw-dP8feRwBGQeD40QJRdu9iMzKctNrpfr_XK6DKedFcEEavoM0up2Uib-e64PF2DjiO9UhtdCR3KZVFyQN4d-FuIkpB1irfHkc9Sc0PcbKK9Bph0KW-6-79nC6x9BO3JDcDHY4IRuL03MyjLNcXnXgLEmldBKAjzQH8t6OsaorFSNZc2F7HIwfeTIYzbxOVDbXXrQ-Vwu0rVefMmY1QpDOKJ950ibKCxdJ5Jt2JIt3TdP8QHvH6PJ0giA7YbFfl46yFDRDn1glsp7GVMhftw","e":"AQAB"},"attributes":{"enabled":true,"created":1593086070,"updated":1593086070,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90}}, [
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
  '827aabdf-f496-4986-bbd6-5202bb9d1990',
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
  'Thu, 25 Jun 2020 11:54:29 GMT',
  'Content-Length',
  '894'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/CRUDKeyName-cangetadeletedkey-')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: CRUDKeyName-cangetadeletedkey-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '114',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'e993a74e-cc07-4d0e-bb10-eaa2e10bf4a3',
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
  'Thu, 25 Jun 2020 11:54:29 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/CRUDKeyName-cangetadeletedkey-')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: CRUDKeyName-cangetadeletedkey-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '114',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'cdf9cccb-5637-4682-9ef1-b0b144bbe0ef',
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
  'Thu, 25 Jun 2020 11:54:30 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/CRUDKeyName-cangetadeletedkey-')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: CRUDKeyName-cangetadeletedkey-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '114',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '5fad1a44-a2b7-487b-8a62-fb15893ff413',
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
  'Thu, 25 Jun 2020 11:54:32 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/CRUDKeyName-cangetadeletedkey-')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: CRUDKeyName-cangetadeletedkey-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '114',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '8f64f1d2-cdf5-458d-9362-cbc9b8aa1f39',
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
  'Thu, 25 Jun 2020 11:54:33 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/CRUDKeyName-cangetadeletedkey-')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: CRUDKeyName-cangetadeletedkey-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '114',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '010b18d9-e07d-41ea-afc4-838bd4a74781',
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
  'Thu, 25 Jun 2020 11:54:35 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/CRUDKeyName-cangetadeletedkey-')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: CRUDKeyName-cangetadeletedkey-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '114',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'f1dff1cb-3b89-4666-a589-72b54a140902',
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
  'Thu, 25 Jun 2020 11:54:38 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/CRUDKeyName-cangetadeletedkey-')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: CRUDKeyName-cangetadeletedkey-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '114',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'ec4cdba7-637c-43aa-b9b9-f9ca1914a244',
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
  'Thu, 25 Jun 2020 11:54:40 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/CRUDKeyName-cangetadeletedkey-')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: CRUDKeyName-cangetadeletedkey-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '114',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '251ec2ca-7329-472a-aea1-5a328c0b0a3e',
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
  'Thu, 25 Jun 2020 11:54:42 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/CRUDKeyName-cangetadeletedkey-')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/CRUDKeyName-cangetadeletedkey-","deletedDate":1593086070,"scheduledPurgeDate":1600862070,"key":{"kid":"https://keyvault_name.vault.azure.net/keys/CRUDKeyName-cangetadeletedkey-/409fb29e2cf44122a9c50a629064c6fa","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"mng2QkbhpSZHxagELRgXRFnRcI737hxj6hNONSoIDiNGgFj5mTcWoHvfJpMG0p0wgnw-dP8feRwBGQeD40QJRdu9iMzKctNrpfr_XK6DKedFcEEavoM0up2Uib-e64PF2DjiO9UhtdCR3KZVFyQN4d-FuIkpB1irfHkc9Sc0PcbKK9Bph0KW-6-79nC6x9BO3JDcDHY4IRuL03MyjLNcXnXgLEmldBKAjzQH8t6OsaorFSNZc2F7HIwfeTIYzbxOVDbXXrQ-Vwu0rVefMmY1QpDOKJ950ibKCxdJ5Jt2JIt3TdP8QHvH6PJ0giA7YbFfl46yFDRDn1glsp7GVMhftw","e":"AQAB"},"attributes":{"enabled":true,"created":1593086070,"updated":1593086070,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90}}, [
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
  '6be9af71-7cdd-4710-a187-f3210bdc7156',
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
  'Thu, 25 Jun 2020 11:54:44 GMT',
  'Content-Length',
  '894'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/CRUDKeyName-cangetadeletedkey-')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/CRUDKeyName-cangetadeletedkey-","deletedDate":1593086070,"scheduledPurgeDate":1600862070,"key":{"kid":"https://keyvault_name.vault.azure.net/keys/CRUDKeyName-cangetadeletedkey-/409fb29e2cf44122a9c50a629064c6fa","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"mng2QkbhpSZHxagELRgXRFnRcI737hxj6hNONSoIDiNGgFj5mTcWoHvfJpMG0p0wgnw-dP8feRwBGQeD40QJRdu9iMzKctNrpfr_XK6DKedFcEEavoM0up2Uib-e64PF2DjiO9UhtdCR3KZVFyQN4d-FuIkpB1irfHkc9Sc0PcbKK9Bph0KW-6-79nC6x9BO3JDcDHY4IRuL03MyjLNcXnXgLEmldBKAjzQH8t6OsaorFSNZc2F7HIwfeTIYzbxOVDbXXrQ-Vwu0rVefMmY1QpDOKJ950ibKCxdJ5Jt2JIt3TdP8QHvH6PJ0giA7YbFfl46yFDRDn1glsp7GVMhftw","e":"AQAB"},"attributes":{"enabled":true,"created":1593086070,"updated":1593086070,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90}}, [
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
  'ba2e0cf3-1781-483a-b5f8-242e73b06a3d',
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
  'Thu, 25 Jun 2020 11:54:44 GMT',
  'Content-Length',
  '894'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedkeys/CRUDKeyName-cangetadeletedkey-')
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
  'e1585230-328a-4aeb-96cd-b1cab9b87f9e',
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
  'Thu, 25 Jun 2020 11:54:44 GMT'
]);

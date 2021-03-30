let nock = require('nock');

module.exports.hash = "b823cffc81d4989953ca732e94b65979";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .put('/certificates/issuers/CRUDCertificateName-cancreatereadanddeleteacertificateissuer-')
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
  'ad3fca0f-f3a8-42fb-aa64-90d4bee7daf2',
  'x-ms-request-id',
  '5b1575d3-6480-4f4c-98b1-e6e1be76a55a',
  'x-ms-keyvault-service-version',
  '1.2.205.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Mar 2021 00:55:38 GMT'
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
  'd364f883-3fed-44a3-8642-3d87ab5c4401',
  'x-ms-ests-server',
  '2.1.11562.10 - NCUS ProdSlices',
  'Set-Cookie',
  'fpc=AufEgnES4fNBjTZfknrxutyXyNCaAQAAAIrW7dcOAAAA; expires=Sat, 24-Apr-2021 00:55:39 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 25 Mar 2021 00:55:38 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .put('/certificates/issuers/CRUDCertificateName-cancreatereadanddeleteacertificateissuer-', {"provider":"Test","credentials":{"account_id":"keyvaultuser"},"org_details":{"admin_details":[{"first_name":"John","last_name":"Doe","email":"admin@microsoft.com","phone":"4255555555"}]}})
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/issuers/CRUDCertificateName-cancreatereadanddeleteacertificateissuer-","provider":"Test","credentials":{"account_id":"keyvaultuser"},"org_details":{"zip":0,"admin_details":[{"first_name":"John","last_name":"Doe","email":"admin@microsoft.com","phone":"4255555555"}]},"attributes":{"enabled":true,"created":1616633739,"updated":1616633739}}, [
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
  'ad3fca0f-f3a8-42fb-aa64-90d4bee7daf2',
  'x-ms-request-id',
  '7203d51b-3c21-4ce9-9ab0-15ad98ce95bf',
  'x-ms-keyvault-service-version',
  '1.2.205.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Mar 2021 00:55:38 GMT',
  'Content-Length',
  '407'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/certificates/CRUDCertificateName-cancreatereadanddeleteacertificateissuer-/create', {"policy":{"key_props":{},"secret_props":{},"x509_props":{"subject":"cn=MyCert","sans":{}},"issuer":{"name":"CRUDCertificateName-cancreatereadanddeleteacertificateissuer-"},"attributes":{}},"attributes":{}})
  .query(true)
  .reply(202, {"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-cancreatereadanddeleteacertificateissuer-/pending","issuer":{"name":"CRUDCertificateName-cancreatereadanddeleteacertificateissuer-"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAtE4VPy6iMbBkLor6DEx6mJSRmJkpLgIYFfa2Lfy2TAPIdg9zBxeKYP8i2RF3B/pl2T+WRqCkPQsChE78t3G3+3FZqkxPHHzRQFQUUGlaWPQ1jjWOVJ/EaVnWqAkydYmy7ES/n6qIjy65JeNnB1w3PVXh01GMVNGDqDrx/NeWXM69C2jx4DLmR5R8kw+KT4ZqFTop5/By+VnPbiz6wJnc5Oplr04FiU7rEIB3OHdYtB5SCz8riUeGKmDzTOFUq9jPMxWID+YdgiIKHxnJTAfUZg0qTtZLxOgC5gvOK42kXvU/uW4leO9d+bXPJ84wIZdzeg14cDfticDPf8Baa27qNQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBADEAl+PdeE0sUWCtJrqrl7xXzoXCCc7EQtKpP+VyXz9YClu9Dc2I97BsPOgi0gH8HYvFTyOHEcvWzF/K2CRvEAPC+dZ9RdMcyitu9oeL2wrk5XAFNzTNYsiNQ5Nte9Hq0huPS+AqQccs1nWaCiELHMKrtdYItWi/Qg0VUQPgKn4jcNjsKtdOXTh9ukXF6yFNBLwOfrRi2tgGCyxHAcO5ecqzhp68oeIB41h5o6YjCyqX8TQimQrbP7lDnhzWpV2MUV6TnHu8V16a8thBNu3CiZJtSDeQTD3HK94+tlYBUzY2LHw0TOYHdJRAvKO7Qv9vLYNzW/igG3ScL3hZOcY0Tpw=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"245f613b9bad4827bbe9ffa0d07fcc54"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-cancreatereadanddeleteacertificateissuer-/pending?api-version=7.2&request_id=245f613b9bad4827bbe9ffa0d07fcc54',
  'Retry-After',
  '10',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  '7217fa09-be21-4150-a8c2-664970637780',
  'x-ms-request-id',
  '7635ea54-f278-4cc6-bc38-f2f383435f09',
  'x-ms-keyvault-service-version',
  '1.2.205.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Mar 2021 00:55:39 GMT',
  'Content-Length',
  '1416'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/CRUDCertificateName-cancreatereadanddeleteacertificateissuer-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-cancreatereadanddeleteacertificateissuer-/pending","issuer":{"name":"CRUDCertificateName-cancreatereadanddeleteacertificateissuer-"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAtE4VPy6iMbBkLor6DEx6mJSRmJkpLgIYFfa2Lfy2TAPIdg9zBxeKYP8i2RF3B/pl2T+WRqCkPQsChE78t3G3+3FZqkxPHHzRQFQUUGlaWPQ1jjWOVJ/EaVnWqAkydYmy7ES/n6qIjy65JeNnB1w3PVXh01GMVNGDqDrx/NeWXM69C2jx4DLmR5R8kw+KT4ZqFTop5/By+VnPbiz6wJnc5Oplr04FiU7rEIB3OHdYtB5SCz8riUeGKmDzTOFUq9jPMxWID+YdgiIKHxnJTAfUZg0qTtZLxOgC5gvOK42kXvU/uW4leO9d+bXPJ84wIZdzeg14cDfticDPf8Baa27qNQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBADEAl+PdeE0sUWCtJrqrl7xXzoXCCc7EQtKpP+VyXz9YClu9Dc2I97BsPOgi0gH8HYvFTyOHEcvWzF/K2CRvEAPC+dZ9RdMcyitu9oeL2wrk5XAFNzTNYsiNQ5Nte9Hq0huPS+AqQccs1nWaCiELHMKrtdYItWi/Qg0VUQPgKn4jcNjsKtdOXTh9ukXF6yFNBLwOfrRi2tgGCyxHAcO5ecqzhp68oeIB41h5o6YjCyqX8TQimQrbP7lDnhzWpV2MUV6TnHu8V16a8thBNu3CiZJtSDeQTD3HK94+tlYBUzY2LHw0TOYHdJRAvKO7Qv9vLYNzW/igG3ScL3hZOcY0Tpw=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"245f613b9bad4827bbe9ffa0d07fcc54"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Retry-After',
  '10',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  '79a6d40d-51cd-4f47-b620-c1239d7365e1',
  'x-ms-request-id',
  'fe35c944-97ef-4493-aa0c-9a76e8006c41',
  'x-ms-keyvault-service-version',
  '1.2.205.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Mar 2021 00:55:39 GMT',
  'Content-Length',
  '1416'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/CRUDCertificateName-cancreatereadanddeleteacertificateissuer-/')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-cancreatereadanddeleteacertificateissuer-/5369879b27b54731ae39d40f794454cb","attributes":{"enabled":false,"nbf":1616633139,"exp":1648169739,"created":1616633739,"updated":1616633739,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-cancreatereadanddeleteacertificateissuer-/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"CRUDCertificateName-cancreatereadanddeleteacertificateissuer-"},"attributes":{"enabled":true,"created":1616633739,"updated":1616633739}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-cancreatereadanddeleteacertificateissuer-/pending"}}, [
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
  '135ccfe9-c540-43be-87a2-caa3238eb31b',
  'x-ms-request-id',
  'e0eaaef6-23eb-42d6-a812-476ec9fc86aa',
  'x-ms-keyvault-service-version',
  '1.2.205.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Mar 2021 00:55:39 GMT',
  'Content-Length',
  '1242'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/issuers/CRUDCertificateName-cancreatereadanddeleteacertificateissuer-')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/issuers/CRUDCertificateName-cancreatereadanddeleteacertificateissuer-","provider":"Test","credentials":{"account_id":"keyvaultuser"},"org_details":{"zip":0,"admin_details":[{"first_name":"John","last_name":"Doe","email":"admin@microsoft.com","phone":"4255555555"}]},"attributes":{"enabled":true,"created":1616633739,"updated":1616633739}}, [
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
  'b605afc5-b3c9-487c-bee0-1179591c0788',
  'x-ms-request-id',
  'a8e88fa0-a0e6-4cac-9b08-3433703c1e8c',
  'x-ms-keyvault-service-version',
  '1.2.205.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Mar 2021 00:55:39 GMT',
  'Content-Length',
  '407'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .patch('/certificates/issuers/CRUDCertificateName-cancreatereadanddeleteacertificateissuer-', {"credentials":{"account_id":"keyvaultuser2"},"org_details":{"admin_details":[{"first_name":"John","last_name":"Doe","email":"admin@microsoft.com","phone":"4255555555"}]}})
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/issuers/CRUDCertificateName-cancreatereadanddeleteacertificateissuer-","provider":"Test","credentials":{"account_id":"keyvaultuser2"},"org_details":{"zip":0,"admin_details":[{"first_name":"John","last_name":"Doe","email":"admin@microsoft.com","phone":"4255555555"}]},"attributes":{"enabled":true,"created":1616633739,"updated":1616633740}}, [
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
  'c579e939-37f2-4bbc-9818-1e2983f92d2f',
  'x-ms-request-id',
  'cce0dc58-7162-4c6c-8ce3-03bc97c760a1',
  'x-ms-keyvault-service-version',
  '1.2.205.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Mar 2021 00:55:39 GMT',
  'Content-Length',
  '408'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/issuers/CRUDCertificateName-cancreatereadanddeleteacertificateissuer-')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/issuers/CRUDCertificateName-cancreatereadanddeleteacertificateissuer-","provider":"Test","credentials":{"account_id":"keyvaultuser2"},"org_details":{"zip":0,"admin_details":[{"first_name":"John","last_name":"Doe","email":"admin@microsoft.com","phone":"4255555555"}]},"attributes":{"enabled":true,"created":1616633739,"updated":1616633740}}, [
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
  '8b4e5fb6-5f20-478b-a84f-091676c2f35c',
  'x-ms-request-id',
  'fc1eaed3-6384-4029-94a6-26844a9ae5e1',
  'x-ms-keyvault-service-version',
  '1.2.205.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Mar 2021 00:55:39 GMT',
  'Content-Length',
  '408'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/certificates/issuers/CRUDCertificateName-cancreatereadanddeleteacertificateissuer-')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/issuers/CRUDCertificateName-cancreatereadanddeleteacertificateissuer-","provider":"Test","credentials":{"account_id":"keyvaultuser2"},"org_details":{"zip":0,"admin_details":[{"first_name":"John","last_name":"Doe","email":"admin@microsoft.com","phone":"4255555555"}]},"attributes":{"enabled":true,"created":1616633739,"updated":1616633740}}, [
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
  '9f26b244-d501-42c7-87bc-bee182910c05',
  'x-ms-request-id',
  '8ea6ad90-f580-419f-80f2-168d1524b95b',
  'x-ms-keyvault-service-version',
  '1.2.205.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Mar 2021 00:55:39 GMT',
  'Content-Length',
  '408'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/issuers/CRUDCertificateName-cancreatereadanddeleteacertificateissuer-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateIssuerNotFound","message":"Issuer not found"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '75',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  '24e00fb8-eb6c-41de-acbe-e4b00b74b3e5',
  'x-ms-request-id',
  '15138185-3b6d-442a-ae24-cea4951cf318',
  'x-ms-keyvault-service-version',
  '1.2.205.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Mar 2021 00:55:39 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/certificates/CRUDCertificateName-cancreatereadanddeleteacertificateissuer-')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/CRUDCertificateName-cancreatereadanddeleteacertificateissuer-","deletedDate":1616633740,"scheduledPurgeDate":1617238540,"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-cancreatereadanddeleteacertificateissuer-/5369879b27b54731ae39d40f794454cb","attributes":{"enabled":false,"nbf":1616633139,"exp":1648169739,"created":1616633739,"updated":1616633739,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-cancreatereadanddeleteacertificateissuer-/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"CRUDCertificateName-cancreatereadanddeleteacertificateissuer-"},"attributes":{"enabled":true,"created":1616633739,"updated":1616633739}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-cancreatereadanddeleteacertificateissuer-/pending"}}, [
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
  'e5b3ac81-0a4b-46ab-a89f-ad8e7d35abec',
  'x-ms-request-id',
  '7f1b03d4-c7b0-47c3-96e3-aa32ab755b07',
  'x-ms-keyvault-service-version',
  '1.2.205.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Mar 2021 00:55:39 GMT',
  'Content-Length',
  '1445'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/CRUDCertificateName-cancreatereadanddeleteacertificateissuer-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: CRUDCertificateName-cancreatereadanddeleteacertificateissuer-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '161',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  'f96a9c21-3257-483e-afb9-e1fd864e0a74',
  'x-ms-request-id',
  '979bd0ae-5154-4d2d-a9f2-a7a2376678a4',
  'x-ms-keyvault-service-version',
  '1.2.205.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Mar 2021 00:55:39 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/CRUDCertificateName-cancreatereadanddeleteacertificateissuer-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: CRUDCertificateName-cancreatereadanddeleteacertificateissuer-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '161',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  '5885ac10-9b28-4fb2-92eb-8d133adee8b6',
  'x-ms-request-id',
  '9221bad1-58ac-4bfb-aecd-49732eee1bce',
  'x-ms-keyvault-service-version',
  '1.2.205.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Mar 2021 00:55:39 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/CRUDCertificateName-cancreatereadanddeleteacertificateissuer-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: CRUDCertificateName-cancreatereadanddeleteacertificateissuer-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '161',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  '3df5e2ab-aa19-4866-a0d1-334164e3950c',
  'x-ms-request-id',
  '9f923825-d25f-4eb5-8681-132b8b09f0ef',
  'x-ms-keyvault-service-version',
  '1.2.205.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Mar 2021 00:55:42 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/CRUDCertificateName-cancreatereadanddeleteacertificateissuer-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: CRUDCertificateName-cancreatereadanddeleteacertificateissuer-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '161',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  'c58e1cb8-4afe-4264-82c0-43877fd3ddb5',
  'x-ms-request-id',
  '06f06506-efc7-48b1-b75b-773ea5cbd4cb',
  'x-ms-keyvault-service-version',
  '1.2.205.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Mar 2021 00:55:44 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/CRUDCertificateName-cancreatereadanddeleteacertificateissuer-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: CRUDCertificateName-cancreatereadanddeleteacertificateissuer-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '161',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  '0b46aa75-0d05-43ec-a95a-5a4fe22856ea',
  'x-ms-request-id',
  '73ee1948-6bca-4f83-a4d8-6f66b9fdfddb',
  'x-ms-keyvault-service-version',
  '1.2.205.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Mar 2021 00:55:46 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/CRUDCertificateName-cancreatereadanddeleteacertificateissuer-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: CRUDCertificateName-cancreatereadanddeleteacertificateissuer-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '161',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  '883cf5d0-3a22-44d6-b4a6-be9919de40df',
  'x-ms-request-id',
  '35ad54de-9b1d-43d4-b95b-ba1304d41619',
  'x-ms-keyvault-service-version',
  '1.2.205.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Mar 2021 00:55:48 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/CRUDCertificateName-cancreatereadanddeleteacertificateissuer-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: CRUDCertificateName-cancreatereadanddeleteacertificateissuer-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '161',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  '5f3fcb67-8446-4d93-89a1-aba03f2a31c3',
  'x-ms-request-id',
  'c57ef350-8c7c-469d-8449-32eb1fafa4a8',
  'x-ms-keyvault-service-version',
  '1.2.205.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Mar 2021 00:55:50 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/CRUDCertificateName-cancreatereadanddeleteacertificateissuer-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: CRUDCertificateName-cancreatereadanddeleteacertificateissuer-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '161',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  '04889032-8649-4eb4-8713-926b6be24437',
  'x-ms-request-id',
  '1a9de1e1-e68f-47a4-adad-6518a1ed4398',
  'x-ms-keyvault-service-version',
  '1.2.205.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Mar 2021 00:55:52 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/CRUDCertificateName-cancreatereadanddeleteacertificateissuer-')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/CRUDCertificateName-cancreatereadanddeleteacertificateissuer-","deletedDate":1616633740,"scheduledPurgeDate":1617238540,"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-cancreatereadanddeleteacertificateissuer-/5369879b27b54731ae39d40f794454cb","attributes":{"enabled":false,"nbf":1616633139,"exp":1648169739,"created":1616633739,"updated":1616633739,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-cancreatereadanddeleteacertificateissuer-/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"CRUDCertificateName-cancreatereadanddeleteacertificateissuer-"},"attributes":{"enabled":true,"created":1616633739,"updated":1616633739}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-cancreatereadanddeleteacertificateissuer-/pending"}}, [
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
  'cacf308b-ffea-425b-abbd-593c11b0ffe6',
  'x-ms-request-id',
  'd37e14e7-9d44-48fe-8711-d6576358291e',
  'x-ms-keyvault-service-version',
  '1.2.205.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Mar 2021 00:55:54 GMT',
  'Content-Length',
  '1445'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedcertificates/CRUDCertificateName-cancreatereadanddeleteacertificateissuer-')
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
  'f08aceac-f53c-4593-bd7a-ca4075f1ffd8',
  'x-ms-request-id',
  'e8f3a3f7-0ba1-45d8-8670-3fa336e520c4',
  'x-ms-keyvault-service-version',
  '1.2.205.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Mar 2021 00:55:54 GMT'
]);

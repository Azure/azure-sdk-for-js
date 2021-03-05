let nock = require('nock');

module.exports.hash = "26b5c65b7c0f9b9be0c9950931852a41";

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
  'eastus',
  'x-ms-request-id',
  '87da504b-4a24-477a-a43c-8a45a6cb3c3f',
  'x-ms-keyvault-service-version',
  '1.2.191.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=40.71.19.139;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 02 Mar 2021 22:04:42 GMT'
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
  'b06060c4-bfd2-44f9-9274-ffb08836b300',
  'x-ms-ests-server',
  '2.1.11513.17 - SCUS ProdSlices',
  'Set-Cookie',
  'fpc=AtIcwu91cEVDo-d1uKX0trQ_aSJHAQAAAHut0NcOAAAA; expires=Thu, 01-Apr-2021 22:04:43 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 02 Mar 2021 22:04:43 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .put('/certificates/issuers/CRUDCertificateName-cancreatereadanddeleteacertificateissuer-', {"provider":"Test","credentials":{"account_id":"keyvaultuser"},"org_details":{"admin_details":[{"first_name":"John","last_name":"Doe","email":"admin@microsoft.com","phone":"4255555555"}]}})
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/issuers/CRUDCertificateName-cancreatereadanddeleteacertificateissuer-","provider":"Test","credentials":{"account_id":"keyvaultuser"},"org_details":{"zip":0,"admin_details":[{"first_name":"John","last_name":"Doe","email":"admin@microsoft.com","phone":"4255555555"}]},"attributes":{"enabled":true,"created":1614722683,"updated":1614722683}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-request-id',
  '910466c0-b216-48f2-9637-5b5247c0e5bd',
  'x-ms-keyvault-service-version',
  '1.2.191.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=40.71.19.139;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 02 Mar 2021 22:04:43 GMT',
  'Content-Length',
  '418'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/certificates/CRUDCertificateName-cancreatereadanddeleteacertificateissuer-/create', {"policy":{"key_props":{},"secret_props":{},"x509_props":{"subject":"cn=MyCert","sans":{}},"issuer":{"name":"CRUDCertificateName-cancreatereadanddeleteacertificateissuer-"},"attributes":{}},"attributes":{}})
  .query(true)
  .reply(202, {"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-cancreatereadanddeleteacertificateissuer-/pending","issuer":{"name":"CRUDCertificateName-cancreatereadanddeleteacertificateissuer-"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA84HrgC5s9f15/iXEiCLbRW8D53sefCTcU5HbWJrv5SxYrYfd5kTylEfLYicar9QsJQOnoowPdUv9fYcyHpMw2xUTtMgckIRSIitne1/jEO6/SzEM9l+fnrvnHKgqPp/9BN8KsnZrFYcrAn1ZdjAmw+o2taVdS0lOwgF4afDBV7jI3vhxRrBAjRr77kLd9M9wie9dQqJiRZE8qZwQsakcjqqYTtHSmCmITOyZbYeVHgA0Ge11okr0pMb27YUwK3ss8RivEfzgyoq6Gw0wnkEw2nm7ig6kfzWNxXEIPT6wiQxaS36jeYAiu58ed0zQ1XlbFELDkR0CfJ7ZyVtXbPyGXQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBABWqBZBNWHSOmQ0YFTcqjNFAOYxU5CczsugcmKzAlYL85BKpM9J9V8mIJJhYDbCe7nt5MGyMUxlUi4CFtL1NPHsgx1OpuB379I7vJptnkhF7/Gdv+shXSgbd71Z9dwNmQ5MmfZwy8YBhsI6h9ceqaH7zs/QEXgCvy2JgxDYsVm3Q0fMrCpzbwSZK4TExDqFBqvkpj05bvv6IgKZJLjm+CJft80+VXETXBQk6liml9jFwntlwXr8l1hlI3gQJuLML+p7UjpsNtJz733fXdmVmB7R0b1sTqhPoe2elFU8Po6R2EhHsYyZmyYfXyoDIMjlgkm51F2AVLyhdcgdURawGNHk=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"a0f6b64c96ba4d808a86af275d441e3e"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-cancreatereadanddeleteacertificateissuer-/pending?api-version=7.2&request_id=a0f6b64c96ba4d808a86af275d441e3e',
  'Retry-After',
  '10',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-request-id',
  '46714591-d8c3-4bb7-a3d2-81ec5cedca57',
  'x-ms-keyvault-service-version',
  '1.2.191.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=40.71.19.139;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 02 Mar 2021 22:04:43 GMT',
  'Content-Length',
  '1427'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/CRUDCertificateName-cancreatereadanddeleteacertificateissuer-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-cancreatereadanddeleteacertificateissuer-/pending","issuer":{"name":"CRUDCertificateName-cancreatereadanddeleteacertificateissuer-"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA84HrgC5s9f15/iXEiCLbRW8D53sefCTcU5HbWJrv5SxYrYfd5kTylEfLYicar9QsJQOnoowPdUv9fYcyHpMw2xUTtMgckIRSIitne1/jEO6/SzEM9l+fnrvnHKgqPp/9BN8KsnZrFYcrAn1ZdjAmw+o2taVdS0lOwgF4afDBV7jI3vhxRrBAjRr77kLd9M9wie9dQqJiRZE8qZwQsakcjqqYTtHSmCmITOyZbYeVHgA0Ge11okr0pMb27YUwK3ss8RivEfzgyoq6Gw0wnkEw2nm7ig6kfzWNxXEIPT6wiQxaS36jeYAiu58ed0zQ1XlbFELDkR0CfJ7ZyVtXbPyGXQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBABWqBZBNWHSOmQ0YFTcqjNFAOYxU5CczsugcmKzAlYL85BKpM9J9V8mIJJhYDbCe7nt5MGyMUxlUi4CFtL1NPHsgx1OpuB379I7vJptnkhF7/Gdv+shXSgbd71Z9dwNmQ5MmfZwy8YBhsI6h9ceqaH7zs/QEXgCvy2JgxDYsVm3Q0fMrCpzbwSZK4TExDqFBqvkpj05bvv6IgKZJLjm+CJft80+VXETXBQk6liml9jFwntlwXr8l1hlI3gQJuLML+p7UjpsNtJz733fXdmVmB7R0b1sTqhPoe2elFU8Po6R2EhHsYyZmyYfXyoDIMjlgkm51F2AVLyhdcgdURawGNHk=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"a0f6b64c96ba4d808a86af275d441e3e"}, [
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
  'eastus',
  'x-ms-request-id',
  '34420091-bd62-475f-81c2-3e2b2091e017',
  'x-ms-keyvault-service-version',
  '1.2.191.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=40.71.19.139;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 02 Mar 2021 22:04:43 GMT',
  'Content-Length',
  '1427'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/CRUDCertificateName-cancreatereadanddeleteacertificateissuer-/')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-cancreatereadanddeleteacertificateissuer-/d50284062e674d1aa0c33b38d8149d78","attributes":{"enabled":false,"nbf":1614722083,"exp":1646258683,"created":1614722684,"updated":1614722684,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-cancreatereadanddeleteacertificateissuer-/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"CRUDCertificateName-cancreatereadanddeleteacertificateissuer-"},"attributes":{"enabled":true,"created":1614722684,"updated":1614722684}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-cancreatereadanddeleteacertificateissuer-/pending"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-request-id',
  '3de6cc14-2550-4745-8e95-c48b7e74ac2d',
  'x-ms-keyvault-service-version',
  '1.2.191.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=40.71.19.139;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 02 Mar 2021 22:04:43 GMT',
  'Content-Length',
  '1266'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/issuers/CRUDCertificateName-cancreatereadanddeleteacertificateissuer-')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/issuers/CRUDCertificateName-cancreatereadanddeleteacertificateissuer-","provider":"Test","credentials":{"account_id":"keyvaultuser"},"org_details":{"zip":0,"admin_details":[{"first_name":"John","last_name":"Doe","email":"admin@microsoft.com","phone":"4255555555"}]},"attributes":{"enabled":true,"created":1614722683,"updated":1614722683}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-request-id',
  '61d3ffea-6a72-47d0-9acf-797414dfdce0',
  'x-ms-keyvault-service-version',
  '1.2.191.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=40.71.19.139;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 02 Mar 2021 22:04:43 GMT',
  'Content-Length',
  '418'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .patch('/certificates/issuers/CRUDCertificateName-cancreatereadanddeleteacertificateissuer-', {"credentials":{},"org_details":{"admin_details":[{"first_name":"John","last_name":"Doe","email":"admin@microsoft.com","phone":"4255555555"}]}})
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/issuers/CRUDCertificateName-cancreatereadanddeleteacertificateissuer-","provider":"Test","credentials":{"account_id":"keyvaultuser"},"org_details":{"zip":0,"admin_details":[{"first_name":"John","last_name":"Doe","email":"admin@microsoft.com","phone":"4255555555"}]},"attributes":{"enabled":true,"created":1614722683,"updated":1614722684}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-request-id',
  'a1481fe2-0064-434f-a648-ff40a6fd334e',
  'x-ms-keyvault-service-version',
  '1.2.191.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=40.71.19.139;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 02 Mar 2021 22:04:44 GMT',
  'Content-Length',
  '418'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/issuers/CRUDCertificateName-cancreatereadanddeleteacertificateissuer-')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/issuers/CRUDCertificateName-cancreatereadanddeleteacertificateissuer-","provider":"Test","credentials":{"account_id":"keyvaultuser"},"org_details":{"zip":0,"admin_details":[{"first_name":"John","last_name":"Doe","email":"admin@microsoft.com","phone":"4255555555"}]},"attributes":{"enabled":true,"created":1614722683,"updated":1614722684}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-request-id',
  'b554d669-9a50-499a-9368-2605951d1345',
  'x-ms-keyvault-service-version',
  '1.2.191.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=40.71.19.139;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 02 Mar 2021 22:04:44 GMT',
  'Content-Length',
  '418'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/certificates/issuers/CRUDCertificateName-cancreatereadanddeleteacertificateissuer-')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/issuers/CRUDCertificateName-cancreatereadanddeleteacertificateissuer-","provider":"Test","credentials":{"account_id":"keyvaultuser"},"org_details":{"zip":0,"admin_details":[{"first_name":"John","last_name":"Doe","email":"admin@microsoft.com","phone":"4255555555"}]},"attributes":{"enabled":true,"created":1614722683,"updated":1614722684}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-request-id',
  '0e4baf6a-6836-4bc7-bfb2-727a706e9c31',
  'x-ms-keyvault-service-version',
  '1.2.191.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=40.71.19.139;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 02 Mar 2021 22:04:44 GMT',
  'Content-Length',
  '418'
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
  'eastus',
  'x-ms-request-id',
  '55645083-747b-493f-80a3-6496c03d7a4d',
  'x-ms-keyvault-service-version',
  '1.2.191.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=40.71.19.139;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 02 Mar 2021 22:04:44 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/certificates/CRUDCertificateName-cancreatereadanddeleteacertificateissuer-')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/CRUDCertificateName-cancreatereadanddeleteacertificateissuer-","deletedDate":1614722684,"scheduledPurgeDate":1622498684,"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-cancreatereadanddeleteacertificateissuer-/d50284062e674d1aa0c33b38d8149d78","attributes":{"enabled":false,"nbf":1614722083,"exp":1646258683,"created":1614722684,"updated":1614722684,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-cancreatereadanddeleteacertificateissuer-/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"CRUDCertificateName-cancreatereadanddeleteacertificateissuer-"},"attributes":{"enabled":true,"created":1614722684,"updated":1614722684}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-cancreatereadanddeleteacertificateissuer-/pending"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-request-id',
  '59c10c36-9aad-4bde-a685-b1ea5ac96afe',
  'x-ms-keyvault-service-version',
  '1.2.191.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=40.71.19.139;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 02 Mar 2021 22:04:44 GMT',
  'Content-Length',
  '1480'
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
  'eastus',
  'x-ms-request-id',
  '81973a25-85f0-4bca-9493-5b9666ff858a',
  'x-ms-keyvault-service-version',
  '1.2.191.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=40.71.19.139;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 02 Mar 2021 22:04:44 GMT'
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
  'eastus',
  'x-ms-request-id',
  '57fafd85-9a29-45c5-bf9b-64d4a4521e4f',
  'x-ms-keyvault-service-version',
  '1.2.191.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=40.71.19.139;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 02 Mar 2021 22:04:44 GMT'
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
  'eastus',
  'x-ms-request-id',
  'b8d5eb22-f9fb-4df6-87d6-b75072dafe5d',
  'x-ms-keyvault-service-version',
  '1.2.191.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=40.71.19.139;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 02 Mar 2021 22:04:46 GMT'
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
  'eastus',
  'x-ms-request-id',
  '5f3a1cc4-e380-47a3-a168-2e92dfe14728',
  'x-ms-keyvault-service-version',
  '1.2.191.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=40.71.19.139;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 02 Mar 2021 22:04:49 GMT'
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
  'eastus',
  'x-ms-request-id',
  '05aa67b7-cd25-4894-8ed4-4cc84edb6204',
  'x-ms-keyvault-service-version',
  '1.2.191.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=40.71.19.139;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 02 Mar 2021 22:04:50 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/CRUDCertificateName-cancreatereadanddeleteacertificateissuer-')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/CRUDCertificateName-cancreatereadanddeleteacertificateissuer-","deletedDate":1614722684,"scheduledPurgeDate":1622498684,"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-cancreatereadanddeleteacertificateissuer-/d50284062e674d1aa0c33b38d8149d78","attributes":{"enabled":false,"nbf":1614722083,"exp":1646258683,"created":1614722684,"updated":1614722684,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-cancreatereadanddeleteacertificateissuer-/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"CRUDCertificateName-cancreatereadanddeleteacertificateissuer-"},"attributes":{"enabled":true,"created":1614722684,"updated":1614722684}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-cancreatereadanddeleteacertificateissuer-/pending"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-request-id',
  '374f07fb-e67b-4bc9-88cd-707494a77ea7',
  'x-ms-keyvault-service-version',
  '1.2.191.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=40.71.19.139;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 02 Mar 2021 22:05:02 GMT',
  'Content-Length',
  '1480'
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
  'eastus',
  'x-ms-request-id',
  'b16ab5f3-576d-4287-9ab5-ab7a4f48f945',
  'x-ms-keyvault-service-version',
  '1.2.191.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=40.71.19.139;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 02 Mar 2021 22:05:03 GMT'
]);

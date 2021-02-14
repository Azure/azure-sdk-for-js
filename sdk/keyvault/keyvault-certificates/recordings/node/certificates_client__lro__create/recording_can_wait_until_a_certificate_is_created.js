let nock = require('nock');

module.exports.hash = "6cb0aac37db45d09d83bfd3668e98761";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/certificates/lroCreateCertificateName-canwaituntilacertificateiscreated-/create')
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
  'ed356eb7-7fb2-44e1-846b-5bac344bbb3d',
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
  'Thu, 25 Jun 2020 13:05:08 GMT'
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
  '136e811f-365e-4f14-9697-95fa80aa1b00',
  'x-ms-ests-server',
  '2.1.10732.8 - WUS2 ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AhEPElBZEaZFnIGvhGcH6CE_aSJHAQAAAASYhtYOAAAA; expires=Sat, 25-Jul-2020 13:05:09 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; SameSite=None; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; SameSite=None; secure; HttpOnly',
  'Date',
  'Thu, 25 Jun 2020 13:05:08 GMT',
  'Content-Length',
  '1315'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistcertificatesbypage-4892663737593751')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistcertificatesbypage-4892663737593751"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '146',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '17a0f4be-4845-4bc6-b93b-c651a9cbfbc1',
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
  'Thu, 25 Jun 2020 13:05:08 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/certificates/lroCreateCertificateName-canwaituntilacertificateiscreated-/create', {"policy":{"key_props":{},"secret_props":{},"x509_props":{"subject":"cn=MyCert","sans":{}},"issuer":{"name":"Self"},"attributes":{}},"attributes":{}})
  .query(true)
  .reply(202, {"id":"https://keyvault_name.vault.azure.net/certificates/lroCreateCertificateName-canwaituntilacertificateiscreated-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAj+ISbmbJ/ozJJB/7DJ8uI0q/zTG2hTyWc7RdP18IWgDGzHXzN+kOomz1We8aNcjo5TjorP737U+pdaD/QxwntHKTcbkTyq1uwOJJ7Mg9qv0wc/fMjrqomo78ZCylITRhWj9F0TPa36TO8Mcduzc/h8n0g8X39o9T5VlT3Up4k3BAhbH8z3WmXhqajRycsOJwmdDpf9ptbAfyD0eoUM6TSxhDJq0tKdGP3DSq+l5sRpH7+lP75Cm23sIgRN2VqeX8bqHa7A4eI1QcYAhwWJBVxuqMcUy5Bk76oNUrNHB6fYgiYL4PgWNAV5o/Cf5JPq5jXW3RkQ/beOKU7lIVfhsSnQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAB2gyzT3eWtaqV2QsTQYIS3KbbjF1Emf/jKSh2pZ5WHOf5Jx89YpSTahfBXdB0yCyPqpFfVw8AeuNc1gXaVSMl8G5vJw8HaCzpRNxaLxOihpwbYiDhEhN2wtbkTnVbpQovDIASxfnHSGNJBPltV/yg5EkBrblUrXVx/t6HTWYQrLETCArTOZqfR0eoXbe7YCbxlRhxlDnSC1++7OmYj9Le0Jcb8IlJUrIyZKDkANm3hVHJPV5ZySojAutt8i1bHqxm66Pl93ukf7aXbAOiLNFfHBoj628OI4wMfWg1HnJU7kx9YQIu3FvBQ24ndiVw0Cx7+XqRWaxJyEYKz5uyunG5c=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"fd6ba25e6f2545268c960c62f246db3a"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://keyvault_name.vault.azure.net/certificates/lroCreateCertificateName-canwaituntilacertificateiscreated-/pending?api-version=7.1&request_id=fd6ba25e6f2545268c960c62f246db3a',
  'Retry-After',
  '10',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '16856973-7160-42f3-b1a4-5471d8224c12',
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
  'Thu, 25 Jun 2020 13:05:09 GMT',
  'Content-Length',
  '1351'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroCreateCertificateName-canwaituntilacertificateiscreated-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroCreateCertificateName-canwaituntilacertificateiscreated-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAj+ISbmbJ/ozJJB/7DJ8uI0q/zTG2hTyWc7RdP18IWgDGzHXzN+kOomz1We8aNcjo5TjorP737U+pdaD/QxwntHKTcbkTyq1uwOJJ7Mg9qv0wc/fMjrqomo78ZCylITRhWj9F0TPa36TO8Mcduzc/h8n0g8X39o9T5VlT3Up4k3BAhbH8z3WmXhqajRycsOJwmdDpf9ptbAfyD0eoUM6TSxhDJq0tKdGP3DSq+l5sRpH7+lP75Cm23sIgRN2VqeX8bqHa7A4eI1QcYAhwWJBVxuqMcUy5Bk76oNUrNHB6fYgiYL4PgWNAV5o/Cf5JPq5jXW3RkQ/beOKU7lIVfhsSnQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAB2gyzT3eWtaqV2QsTQYIS3KbbjF1Emf/jKSh2pZ5WHOf5Jx89YpSTahfBXdB0yCyPqpFfVw8AeuNc1gXaVSMl8G5vJw8HaCzpRNxaLxOihpwbYiDhEhN2wtbkTnVbpQovDIASxfnHSGNJBPltV/yg5EkBrblUrXVx/t6HTWYQrLETCArTOZqfR0eoXbe7YCbxlRhxlDnSC1++7OmYj9Le0Jcb8IlJUrIyZKDkANm3hVHJPV5ZySojAutt8i1bHqxm66Pl93ukf7aXbAOiLNFfHBoj628OI4wMfWg1HnJU7kx9YQIu3FvBQ24ndiVw0Cx7+XqRWaxJyEYKz5uyunG5c=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"fd6ba25e6f2545268c960c62f246db3a"}, [
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
  'westus',
  'x-ms-request-id',
  '37ec759b-d44d-40dc-9dac-ba583d32e21c',
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
  'Thu, 25 Jun 2020 13:05:09 GMT',
  'Content-Length',
  '1351'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroCreateCertificateName-canwaituntilacertificateiscreated-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroCreateCertificateName-canwaituntilacertificateiscreated-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAj+ISbmbJ/ozJJB/7DJ8uI0q/zTG2hTyWc7RdP18IWgDGzHXzN+kOomz1We8aNcjo5TjorP737U+pdaD/QxwntHKTcbkTyq1uwOJJ7Mg9qv0wc/fMjrqomo78ZCylITRhWj9F0TPa36TO8Mcduzc/h8n0g8X39o9T5VlT3Up4k3BAhbH8z3WmXhqajRycsOJwmdDpf9ptbAfyD0eoUM6TSxhDJq0tKdGP3DSq+l5sRpH7+lP75Cm23sIgRN2VqeX8bqHa7A4eI1QcYAhwWJBVxuqMcUy5Bk76oNUrNHB6fYgiYL4PgWNAV5o/Cf5JPq5jXW3RkQ/beOKU7lIVfhsSnQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAB2gyzT3eWtaqV2QsTQYIS3KbbjF1Emf/jKSh2pZ5WHOf5Jx89YpSTahfBXdB0yCyPqpFfVw8AeuNc1gXaVSMl8G5vJw8HaCzpRNxaLxOihpwbYiDhEhN2wtbkTnVbpQovDIASxfnHSGNJBPltV/yg5EkBrblUrXVx/t6HTWYQrLETCArTOZqfR0eoXbe7YCbxlRhxlDnSC1++7OmYj9Le0Jcb8IlJUrIyZKDkANm3hVHJPV5ZySojAutt8i1bHqxm66Pl93ukf7aXbAOiLNFfHBoj628OI4wMfWg1HnJU7kx9YQIu3FvBQ24ndiVw0Cx7+XqRWaxJyEYKz5uyunG5c=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"fd6ba25e6f2545268c960c62f246db3a"}, [
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
  'westus',
  'x-ms-request-id',
  '04ec43bf-8d65-4b39-9fb4-258600a99ca1',
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
  'Thu, 25 Jun 2020 13:05:09 GMT',
  'Content-Length',
  '1351'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistcertificatesbypage-4892663737593751')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistcertificatesbypage-4892663737593751"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '146',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '679ec4fb-70b4-4628-887d-a8a7d1af7e75',
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
  'Thu, 25 Jun 2020 13:05:10 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroCreateCertificateName-canwaituntilacertificateiscreated-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroCreateCertificateName-canwaituntilacertificateiscreated-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAj+ISbmbJ/ozJJB/7DJ8uI0q/zTG2hTyWc7RdP18IWgDGzHXzN+kOomz1We8aNcjo5TjorP737U+pdaD/QxwntHKTcbkTyq1uwOJJ7Mg9qv0wc/fMjrqomo78ZCylITRhWj9F0TPa36TO8Mcduzc/h8n0g8X39o9T5VlT3Up4k3BAhbH8z3WmXhqajRycsOJwmdDpf9ptbAfyD0eoUM6TSxhDJq0tKdGP3DSq+l5sRpH7+lP75Cm23sIgRN2VqeX8bqHa7A4eI1QcYAhwWJBVxuqMcUy5Bk76oNUrNHB6fYgiYL4PgWNAV5o/Cf5JPq5jXW3RkQ/beOKU7lIVfhsSnQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAB2gyzT3eWtaqV2QsTQYIS3KbbjF1Emf/jKSh2pZ5WHOf5Jx89YpSTahfBXdB0yCyPqpFfVw8AeuNc1gXaVSMl8G5vJw8HaCzpRNxaLxOihpwbYiDhEhN2wtbkTnVbpQovDIASxfnHSGNJBPltV/yg5EkBrblUrXVx/t6HTWYQrLETCArTOZqfR0eoXbe7YCbxlRhxlDnSC1++7OmYj9Le0Jcb8IlJUrIyZKDkANm3hVHJPV5ZySojAutt8i1bHqxm66Pl93ukf7aXbAOiLNFfHBoj628OI4wMfWg1HnJU7kx9YQIu3FvBQ24ndiVw0Cx7+XqRWaxJyEYKz5uyunG5c=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"fd6ba25e6f2545268c960c62f246db3a"}, [
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
  'westus',
  'x-ms-request-id',
  '9bcd636c-e1d1-48e1-8afc-f7e4fd02184d',
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
  'Thu, 25 Jun 2020 13:05:11 GMT',
  'Content-Length',
  '1351'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistcertificatesbypage-4892663737593751')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistcertificatesbypage-4892663737593751"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '146',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '3864f102-3da5-4457-a5df-37bf1c44b6b1',
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
  'Thu, 25 Jun 2020 13:05:12 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroCreateCertificateName-canwaituntilacertificateiscreated-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroCreateCertificateName-canwaituntilacertificateiscreated-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAj+ISbmbJ/ozJJB/7DJ8uI0q/zTG2hTyWc7RdP18IWgDGzHXzN+kOomz1We8aNcjo5TjorP737U+pdaD/QxwntHKTcbkTyq1uwOJJ7Mg9qv0wc/fMjrqomo78ZCylITRhWj9F0TPa36TO8Mcduzc/h8n0g8X39o9T5VlT3Up4k3BAhbH8z3WmXhqajRycsOJwmdDpf9ptbAfyD0eoUM6TSxhDJq0tKdGP3DSq+l5sRpH7+lP75Cm23sIgRN2VqeX8bqHa7A4eI1QcYAhwWJBVxuqMcUy5Bk76oNUrNHB6fYgiYL4PgWNAV5o/Cf5JPq5jXW3RkQ/beOKU7lIVfhsSnQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAB2gyzT3eWtaqV2QsTQYIS3KbbjF1Emf/jKSh2pZ5WHOf5Jx89YpSTahfBXdB0yCyPqpFfVw8AeuNc1gXaVSMl8G5vJw8HaCzpRNxaLxOihpwbYiDhEhN2wtbkTnVbpQovDIASxfnHSGNJBPltV/yg5EkBrblUrXVx/t6HTWYQrLETCArTOZqfR0eoXbe7YCbxlRhxlDnSC1++7OmYj9Le0Jcb8IlJUrIyZKDkANm3hVHJPV5ZySojAutt8i1bHqxm66Pl93ukf7aXbAOiLNFfHBoj628OI4wMfWg1HnJU7kx9YQIu3FvBQ24ndiVw0Cx7+XqRWaxJyEYKz5uyunG5c=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"fd6ba25e6f2545268c960c62f246db3a"}, [
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
  'westus',
  'x-ms-request-id',
  'be2f4be7-e02e-41c2-8a4a-0e300a9a6cd5',
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
  'Thu, 25 Jun 2020 13:05:13 GMT',
  'Content-Length',
  '1351'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistcertificatesbypage-4892663737593751')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistcertificatesbypage-4892663737593751"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '146',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '64b04bb6-1e7b-4b25-ad3a-7f66baa8ff3f',
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
  'Thu, 25 Jun 2020 13:05:14 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroCreateCertificateName-canwaituntilacertificateiscreated-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroCreateCertificateName-canwaituntilacertificateiscreated-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAj+ISbmbJ/ozJJB/7DJ8uI0q/zTG2hTyWc7RdP18IWgDGzHXzN+kOomz1We8aNcjo5TjorP737U+pdaD/QxwntHKTcbkTyq1uwOJJ7Mg9qv0wc/fMjrqomo78ZCylITRhWj9F0TPa36TO8Mcduzc/h8n0g8X39o9T5VlT3Up4k3BAhbH8z3WmXhqajRycsOJwmdDpf9ptbAfyD0eoUM6TSxhDJq0tKdGP3DSq+l5sRpH7+lP75Cm23sIgRN2VqeX8bqHa7A4eI1QcYAhwWJBVxuqMcUy5Bk76oNUrNHB6fYgiYL4PgWNAV5o/Cf5JPq5jXW3RkQ/beOKU7lIVfhsSnQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAB2gyzT3eWtaqV2QsTQYIS3KbbjF1Emf/jKSh2pZ5WHOf5Jx89YpSTahfBXdB0yCyPqpFfVw8AeuNc1gXaVSMl8G5vJw8HaCzpRNxaLxOihpwbYiDhEhN2wtbkTnVbpQovDIASxfnHSGNJBPltV/yg5EkBrblUrXVx/t6HTWYQrLETCArTOZqfR0eoXbe7YCbxlRhxlDnSC1++7OmYj9Le0Jcb8IlJUrIyZKDkANm3hVHJPV5ZySojAutt8i1bHqxm66Pl93ukf7aXbAOiLNFfHBoj628OI4wMfWg1HnJU7kx9YQIu3FvBQ24ndiVw0Cx7+XqRWaxJyEYKz5uyunG5c=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"fd6ba25e6f2545268c960c62f246db3a"}, [
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
  'westus',
  'x-ms-request-id',
  '2637548b-8d3a-416f-ad3a-f36bb75379c4',
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
  'Thu, 25 Jun 2020 13:05:15 GMT',
  'Content-Length',
  '1351'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistcertificatesbypage-4892663737593751')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistcertificatesbypage-4892663737593751"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '146',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '9b20496a-e258-4c49-a7f2-9cce167678d7',
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
  'Thu, 25 Jun 2020 13:05:16 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroCreateCertificateName-canwaituntilacertificateiscreated-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroCreateCertificateName-canwaituntilacertificateiscreated-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAj+ISbmbJ/ozJJB/7DJ8uI0q/zTG2hTyWc7RdP18IWgDGzHXzN+kOomz1We8aNcjo5TjorP737U+pdaD/QxwntHKTcbkTyq1uwOJJ7Mg9qv0wc/fMjrqomo78ZCylITRhWj9F0TPa36TO8Mcduzc/h8n0g8X39o9T5VlT3Up4k3BAhbH8z3WmXhqajRycsOJwmdDpf9ptbAfyD0eoUM6TSxhDJq0tKdGP3DSq+l5sRpH7+lP75Cm23sIgRN2VqeX8bqHa7A4eI1QcYAhwWJBVxuqMcUy5Bk76oNUrNHB6fYgiYL4PgWNAV5o/Cf5JPq5jXW3RkQ/beOKU7lIVfhsSnQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAB2gyzT3eWtaqV2QsTQYIS3KbbjF1Emf/jKSh2pZ5WHOf5Jx89YpSTahfBXdB0yCyPqpFfVw8AeuNc1gXaVSMl8G5vJw8HaCzpRNxaLxOihpwbYiDhEhN2wtbkTnVbpQovDIASxfnHSGNJBPltV/yg5EkBrblUrXVx/t6HTWYQrLETCArTOZqfR0eoXbe7YCbxlRhxlDnSC1++7OmYj9Le0Jcb8IlJUrIyZKDkANm3hVHJPV5ZySojAutt8i1bHqxm66Pl93ukf7aXbAOiLNFfHBoj628OI4wMfWg1HnJU7kx9YQIu3FvBQ24ndiVw0Cx7+XqRWaxJyEYKz5uyunG5c=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"fd6ba25e6f2545268c960c62f246db3a"}, [
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
  'westus',
  'x-ms-request-id',
  '48d33c2e-88e0-46ee-97e2-78ed39b39752',
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
  'Thu, 25 Jun 2020 13:05:17 GMT',
  'Content-Length',
  '1351'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistcertificatesbypage-4892663737593751')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistcertificatesbypage-4892663737593751"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '146',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '62c02e9d-4c3d-4ec2-983c-87ef8276e136',
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
  'Thu, 25 Jun 2020 13:05:19 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroCreateCertificateName-canwaituntilacertificateiscreated-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroCreateCertificateName-canwaituntilacertificateiscreated-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAj+ISbmbJ/ozJJB/7DJ8uI0q/zTG2hTyWc7RdP18IWgDGzHXzN+kOomz1We8aNcjo5TjorP737U+pdaD/QxwntHKTcbkTyq1uwOJJ7Mg9qv0wc/fMjrqomo78ZCylITRhWj9F0TPa36TO8Mcduzc/h8n0g8X39o9T5VlT3Up4k3BAhbH8z3WmXhqajRycsOJwmdDpf9ptbAfyD0eoUM6TSxhDJq0tKdGP3DSq+l5sRpH7+lP75Cm23sIgRN2VqeX8bqHa7A4eI1QcYAhwWJBVxuqMcUy5Bk76oNUrNHB6fYgiYL4PgWNAV5o/Cf5JPq5jXW3RkQ/beOKU7lIVfhsSnQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAB2gyzT3eWtaqV2QsTQYIS3KbbjF1Emf/jKSh2pZ5WHOf5Jx89YpSTahfBXdB0yCyPqpFfVw8AeuNc1gXaVSMl8G5vJw8HaCzpRNxaLxOihpwbYiDhEhN2wtbkTnVbpQovDIASxfnHSGNJBPltV/yg5EkBrblUrXVx/t6HTWYQrLETCArTOZqfR0eoXbe7YCbxlRhxlDnSC1++7OmYj9Le0Jcb8IlJUrIyZKDkANm3hVHJPV5ZySojAutt8i1bHqxm66Pl93ukf7aXbAOiLNFfHBoj628OI4wMfWg1HnJU7kx9YQIu3FvBQ24ndiVw0Cx7+XqRWaxJyEYKz5uyunG5c=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"fd6ba25e6f2545268c960c62f246db3a"}, [
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
  'westus',
  'x-ms-request-id',
  'bf6f7a2a-14ca-4dc2-a832-33527cfccb6b',
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
  'Thu, 25 Jun 2020 13:05:19 GMT',
  'Content-Length',
  '1351'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistcertificatesbypage-4892663737593751')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistcertificatesbypage-4892663737593751"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '146',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '016965f2-24b3-4f65-b5fa-f37c121f982f',
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
  'Thu, 25 Jun 2020 13:05:21 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroCreateCertificateName-canwaituntilacertificateiscreated-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroCreateCertificateName-canwaituntilacertificateiscreated-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAj+ISbmbJ/ozJJB/7DJ8uI0q/zTG2hTyWc7RdP18IWgDGzHXzN+kOomz1We8aNcjo5TjorP737U+pdaD/QxwntHKTcbkTyq1uwOJJ7Mg9qv0wc/fMjrqomo78ZCylITRhWj9F0TPa36TO8Mcduzc/h8n0g8X39o9T5VlT3Up4k3BAhbH8z3WmXhqajRycsOJwmdDpf9ptbAfyD0eoUM6TSxhDJq0tKdGP3DSq+l5sRpH7+lP75Cm23sIgRN2VqeX8bqHa7A4eI1QcYAhwWJBVxuqMcUy5Bk76oNUrNHB6fYgiYL4PgWNAV5o/Cf5JPq5jXW3RkQ/beOKU7lIVfhsSnQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAB2gyzT3eWtaqV2QsTQYIS3KbbjF1Emf/jKSh2pZ5WHOf5Jx89YpSTahfBXdB0yCyPqpFfVw8AeuNc1gXaVSMl8G5vJw8HaCzpRNxaLxOihpwbYiDhEhN2wtbkTnVbpQovDIASxfnHSGNJBPltV/yg5EkBrblUrXVx/t6HTWYQrLETCArTOZqfR0eoXbe7YCbxlRhxlDnSC1++7OmYj9Le0Jcb8IlJUrIyZKDkANm3hVHJPV5ZySojAutt8i1bHqxm66Pl93ukf7aXbAOiLNFfHBoj628OI4wMfWg1HnJU7kx9YQIu3FvBQ24ndiVw0Cx7+XqRWaxJyEYKz5uyunG5c=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"fd6ba25e6f2545268c960c62f246db3a"}, [
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
  'westus',
  'x-ms-request-id',
  '7c41997b-f895-432c-a716-170d471fd835',
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
  'Thu, 25 Jun 2020 13:05:21 GMT',
  'Content-Length',
  '1351'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistcertificatesbypage-4892663737593751')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistcertificatesbypage-4892663737593751"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '146',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '4c407207-1e39-4176-a5a7-5c86c6339eda',
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
  'Thu, 25 Jun 2020 13:05:23 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroCreateCertificateName-canwaituntilacertificateiscreated-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroCreateCertificateName-canwaituntilacertificateiscreated-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAj+ISbmbJ/ozJJB/7DJ8uI0q/zTG2hTyWc7RdP18IWgDGzHXzN+kOomz1We8aNcjo5TjorP737U+pdaD/QxwntHKTcbkTyq1uwOJJ7Mg9qv0wc/fMjrqomo78ZCylITRhWj9F0TPa36TO8Mcduzc/h8n0g8X39o9T5VlT3Up4k3BAhbH8z3WmXhqajRycsOJwmdDpf9ptbAfyD0eoUM6TSxhDJq0tKdGP3DSq+l5sRpH7+lP75Cm23sIgRN2VqeX8bqHa7A4eI1QcYAhwWJBVxuqMcUy5Bk76oNUrNHB6fYgiYL4PgWNAV5o/Cf5JPq5jXW3RkQ/beOKU7lIVfhsSnQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAB2gyzT3eWtaqV2QsTQYIS3KbbjF1Emf/jKSh2pZ5WHOf5Jx89YpSTahfBXdB0yCyPqpFfVw8AeuNc1gXaVSMl8G5vJw8HaCzpRNxaLxOihpwbYiDhEhN2wtbkTnVbpQovDIASxfnHSGNJBPltV/yg5EkBrblUrXVx/t6HTWYQrLETCArTOZqfR0eoXbe7YCbxlRhxlDnSC1++7OmYj9Le0Jcb8IlJUrIyZKDkANm3hVHJPV5ZySojAutt8i1bHqxm66Pl93ukf7aXbAOiLNFfHBoj628OI4wMfWg1HnJU7kx9YQIu3FvBQ24ndiVw0Cx7+XqRWaxJyEYKz5uyunG5c=","cancellation_requested":false,"status":"completed","target":"https://keyvault_name.vault.azure.net/certificates/lroCreateCertificateName-canwaituntilacertificateiscreated-","request_id":"fd6ba25e6f2545268c960c62f246db3a"}, [
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
  'e6da227b-c034-41c1-ac72-e7a593d77830',
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
  'Thu, 25 Jun 2020 13:05:23 GMT',
  'Content-Length',
  '1329'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroCreateCertificateName-canwaituntilacertificateiscreated-/')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroCreateCertificateName-canwaituntilacertificateiscreated-/da97b49d416448579831d02e9cd20367","kid":"https://keyvault_name.vault.azure.net/keys/lroCreateCertificateName-canwaituntilacertificateiscreated-/da97b49d416448579831d02e9cd20367","sid":"https://keyvault_name.vault.azure.net/secrets/lroCreateCertificateName-canwaituntilacertificateiscreated-/da97b49d416448579831d02e9cd20367","x5t":"IPVo4A6bxWGYdryQ2_wScbpeWHk","cer":"MIIDKDCCAhCgAwIBAgIQdZbmFFs2RUqZWEG8SKm+rjANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjAwNjI1MTI1NTIyWhcNMjEwNjI1MTMwNTIyWjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQCP4hJuZsn+jMkkH/sMny4jSr/NMbaFPJZztF0/XwhaAMbMdfM36Q6ibPVZ7xo1yOjlOOis/vftT6l1oP9DHCe0cpNxuRPKrW7A4knsyD2q/TBz98yOuqiajvxkLKUhNGFaP0XRM9rfpM7wxx27Nz+HyfSDxff2j1PlWVPdSniTcECFsfzPdaZeGpqNHJyw4nCZ0Ol/2m1sB/IPR6hQzpNLGEMmrS0p0Y/cNKr6XmxGkfv6U/vkKbbewiBE3ZWp5fxuodrsDh4jVBxgCHBYkFXG6oxxTLkGTvqg1Ss0cHp9iCJgvg+BY0BXmj8J/kk+rmNdbdGRD9t44pTuUhV+GxKdAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBRyF8hoUuCqdA0Wcg3lnc23/yNn7TAdBgNVHQ4EFgQUchfIaFLgqnQNFnIN5Z3Nt/8jZ+0wDQYJKoZIhvcNAQELBQADggEBAD03QYrDUGu2sqAKiOjK6X6cIgr+0yo2TVaOdFE1OpyHJxnybgv1VGshCUb7b55D+IRCj1d3C76+rFTKMmIupdXBcmqT8jG1ZFZgqaVOf81O2R6xFldR9PEO6U9oFgmyR43f1knfW8e1UVVTxriK/mEtdoN3aET2KOfSsHwIFvWx5S5rC/yTONA5pRpTLsgZxiwyJIAZ7Kgzj2NKSu9V3jpa/P8dITOdgDrL42nOTFypgpHe0tggwQhqVeAe6+uT+ZUk6FbcD8DSmJnBRJ0gOH5VunnFrCBs0AXIA1CEmKhuIQjaXar/vXwBElm3k1Tm912E2DF1CleyfN9uNxU0OI4=","attributes":{"enabled":true,"nbf":1593089722,"exp":1624626322,"created":1593090323,"updated":1593090323,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/lroCreateCertificateName-canwaituntilacertificateiscreated-/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1593090309,"updated":1593090309}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/lroCreateCertificateName-canwaituntilacertificateiscreated-/pending"}}, [
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
  '82bc7539-f0d8-43ef-9a73-32d86a31aa9a',
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
  'Thu, 25 Jun 2020 13:05:23 GMT',
  'Content-Length',
  '2645'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/certificates/lroCreateCertificateName-canwaituntilacertificateiscreated-')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/lroCreateCertificateName-canwaituntilacertificateiscreated-","deletedDate":1593090324,"scheduledPurgeDate":1600866324,"id":"https://keyvault_name.vault.azure.net/certificates/lroCreateCertificateName-canwaituntilacertificateiscreated-/da97b49d416448579831d02e9cd20367","kid":"https://keyvault_name.vault.azure.net/keys/lroCreateCertificateName-canwaituntilacertificateiscreated-/da97b49d416448579831d02e9cd20367","sid":"https://keyvault_name.vault.azure.net/secrets/lroCreateCertificateName-canwaituntilacertificateiscreated-/da97b49d416448579831d02e9cd20367","x5t":"IPVo4A6bxWGYdryQ2_wScbpeWHk","cer":"MIIDKDCCAhCgAwIBAgIQdZbmFFs2RUqZWEG8SKm+rjANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjAwNjI1MTI1NTIyWhcNMjEwNjI1MTMwNTIyWjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQCP4hJuZsn+jMkkH/sMny4jSr/NMbaFPJZztF0/XwhaAMbMdfM36Q6ibPVZ7xo1yOjlOOis/vftT6l1oP9DHCe0cpNxuRPKrW7A4knsyD2q/TBz98yOuqiajvxkLKUhNGFaP0XRM9rfpM7wxx27Nz+HyfSDxff2j1PlWVPdSniTcECFsfzPdaZeGpqNHJyw4nCZ0Ol/2m1sB/IPR6hQzpNLGEMmrS0p0Y/cNKr6XmxGkfv6U/vkKbbewiBE3ZWp5fxuodrsDh4jVBxgCHBYkFXG6oxxTLkGTvqg1Ss0cHp9iCJgvg+BY0BXmj8J/kk+rmNdbdGRD9t44pTuUhV+GxKdAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBRyF8hoUuCqdA0Wcg3lnc23/yNn7TAdBgNVHQ4EFgQUchfIaFLgqnQNFnIN5Z3Nt/8jZ+0wDQYJKoZIhvcNAQELBQADggEBAD03QYrDUGu2sqAKiOjK6X6cIgr+0yo2TVaOdFE1OpyHJxnybgv1VGshCUb7b55D+IRCj1d3C76+rFTKMmIupdXBcmqT8jG1ZFZgqaVOf81O2R6xFldR9PEO6U9oFgmyR43f1knfW8e1UVVTxriK/mEtdoN3aET2KOfSsHwIFvWx5S5rC/yTONA5pRpTLsgZxiwyJIAZ7Kgzj2NKSu9V3jpa/P8dITOdgDrL42nOTFypgpHe0tggwQhqVeAe6+uT+ZUk6FbcD8DSmJnBRJ0gOH5VunnFrCBs0AXIA1CEmKhuIQjaXar/vXwBElm3k1Tm912E2DF1CleyfN9uNxU0OI4=","attributes":{"enabled":true,"nbf":1593089722,"exp":1624626322,"created":1593090323,"updated":1593090323,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/lroCreateCertificateName-canwaituntilacertificateiscreated-/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1593090309,"updated":1593090309}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/lroCreateCertificateName-canwaituntilacertificateiscreated-/pending"}}, [
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
  '162935dd-93e8-4c4c-a444-d15e387dc5df',
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
  'Thu, 25 Jun 2020 13:05:23 GMT',
  'Content-Length',
  '2856'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroCreateCertificateName-canwaituntilacertificateiscreated-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroCreateCertificateName-canwaituntilacertificateiscreated-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '159',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '936627b6-42e1-4d32-80cc-708a2eb535bb',
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
  'Thu, 25 Jun 2020 13:05:23 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroCreateCertificateName-canwaituntilacertificateiscreated-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroCreateCertificateName-canwaituntilacertificateiscreated-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '159',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'ffe34288-5697-43d4-8ec8-4d1e897550bd',
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
  'Thu, 25 Jun 2020 13:05:23 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistcertificatesbypage-4892663737593751')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistcertificatesbypage-4892663737593751"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '146',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'b763b826-c932-4375-baff-117d81f31d26',
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
  'Thu, 25 Jun 2020 13:05:25 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroCreateCertificateName-canwaituntilacertificateiscreated-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroCreateCertificateName-canwaituntilacertificateiscreated-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '159',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '5d0f4ff6-bbaf-42ae-a515-7c2d2c51d9d9',
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
  'Thu, 25 Jun 2020 13:05:25 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistcertificatesbypage-4892663737593751')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistcertificatesbypage-4892663737593751"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '146',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '0f812824-449d-45ed-bc1e-e7b84a2e3a12',
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
  'Thu, 25 Jun 2020 13:05:27 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroCreateCertificateName-canwaituntilacertificateiscreated-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroCreateCertificateName-canwaituntilacertificateiscreated-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '159',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'efa4aacc-119c-47e8-a337-a55e8e728f70',
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
  'Thu, 25 Jun 2020 13:05:27 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistcertificatesbypage-4892663737593751')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistcertificatesbypage-4892663737593751"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '146',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '776588e4-1c1f-4b44-b864-3e828f521664',
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
  'Thu, 25 Jun 2020 13:05:29 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroCreateCertificateName-canwaituntilacertificateiscreated-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroCreateCertificateName-canwaituntilacertificateiscreated-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '159',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '907c6857-feea-4b47-8b70-b7338c846a29',
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
  'Thu, 25 Jun 2020 13:05:29 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistcertificatesbypage-4892663737593751')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistcertificatesbypage-4892663737593751"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '146',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '7257be64-f21f-4dda-98d3-38accef0dab8',
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
  'Thu, 25 Jun 2020 13:05:31 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroCreateCertificateName-canwaituntilacertificateiscreated-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroCreateCertificateName-canwaituntilacertificateiscreated-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '159',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '28b270a7-c6c7-47fa-a65b-6f4f72129723',
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
  'Thu, 25 Jun 2020 13:05:31 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistcertificatesbypage-4892663737593751')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistcertificatesbypage-4892663737593751"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '146',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '34e222e9-326e-4ea9-91ba-5dd17eb27b8e',
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
  'Thu, 25 Jun 2020 13:05:33 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroCreateCertificateName-canwaituntilacertificateiscreated-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroCreateCertificateName-canwaituntilacertificateiscreated-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '159',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'b57a875e-3d27-4e19-8aa2-8a20b1c83dd4',
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
  'Thu, 25 Jun 2020 13:05:34 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistcertificatesbypage-4892663737593751')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistcertificatesbypage-4892663737593751"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '146',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'e44cc750-deff-4459-a963-dc6303bdf1a8',
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
  'Thu, 25 Jun 2020 13:05:36 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroCreateCertificateName-canwaituntilacertificateiscreated-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroCreateCertificateName-canwaituntilacertificateiscreated-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '159',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'e36a1d3d-882c-4309-bc28-e0ac01738190',
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
  'Thu, 25 Jun 2020 13:05:36 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistcertificatesbypage-4892663737593751')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistcertificatesbypage-4892663737593751"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '146',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'd33314e4-e09c-4850-a6d3-3d18196167a3',
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
  'Thu, 25 Jun 2020 13:05:38 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroCreateCertificateName-canwaituntilacertificateiscreated-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroCreateCertificateName-canwaituntilacertificateiscreated-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '159',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'f323951a-bc74-4bef-a2a0-639640dd07cf',
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
  'Thu, 25 Jun 2020 13:05:38 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroCreateCertificateName-canwaituntilacertificateiscreated-')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/lroCreateCertificateName-canwaituntilacertificateiscreated-","deletedDate":1593090324,"scheduledPurgeDate":1600866324,"id":"https://keyvault_name.vault.azure.net/certificates/lroCreateCertificateName-canwaituntilacertificateiscreated-/da97b49d416448579831d02e9cd20367","kid":"https://keyvault_name.vault.azure.net/keys/lroCreateCertificateName-canwaituntilacertificateiscreated-/da97b49d416448579831d02e9cd20367","sid":"https://keyvault_name.vault.azure.net/secrets/lroCreateCertificateName-canwaituntilacertificateiscreated-/da97b49d416448579831d02e9cd20367","x5t":"IPVo4A6bxWGYdryQ2_wScbpeWHk","cer":"MIIDKDCCAhCgAwIBAgIQdZbmFFs2RUqZWEG8SKm+rjANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjAwNjI1MTI1NTIyWhcNMjEwNjI1MTMwNTIyWjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQCP4hJuZsn+jMkkH/sMny4jSr/NMbaFPJZztF0/XwhaAMbMdfM36Q6ibPVZ7xo1yOjlOOis/vftT6l1oP9DHCe0cpNxuRPKrW7A4knsyD2q/TBz98yOuqiajvxkLKUhNGFaP0XRM9rfpM7wxx27Nz+HyfSDxff2j1PlWVPdSniTcECFsfzPdaZeGpqNHJyw4nCZ0Ol/2m1sB/IPR6hQzpNLGEMmrS0p0Y/cNKr6XmxGkfv6U/vkKbbewiBE3ZWp5fxuodrsDh4jVBxgCHBYkFXG6oxxTLkGTvqg1Ss0cHp9iCJgvg+BY0BXmj8J/kk+rmNdbdGRD9t44pTuUhV+GxKdAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBRyF8hoUuCqdA0Wcg3lnc23/yNn7TAdBgNVHQ4EFgQUchfIaFLgqnQNFnIN5Z3Nt/8jZ+0wDQYJKoZIhvcNAQELBQADggEBAD03QYrDUGu2sqAKiOjK6X6cIgr+0yo2TVaOdFE1OpyHJxnybgv1VGshCUb7b55D+IRCj1d3C76+rFTKMmIupdXBcmqT8jG1ZFZgqaVOf81O2R6xFldR9PEO6U9oFgmyR43f1knfW8e1UVVTxriK/mEtdoN3aET2KOfSsHwIFvWx5S5rC/yTONA5pRpTLsgZxiwyJIAZ7Kgzj2NKSu9V3jpa/P8dITOdgDrL42nOTFypgpHe0tggwQhqVeAe6+uT+ZUk6FbcD8DSmJnBRJ0gOH5VunnFrCBs0AXIA1CEmKhuIQjaXar/vXwBElm3k1Tm912E2DF1CleyfN9uNxU0OI4=","attributes":{"enabled":true,"nbf":1593089722,"exp":1624626322,"created":1593090323,"updated":1593090323,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/lroCreateCertificateName-canwaituntilacertificateiscreated-/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1593090309,"updated":1593090309}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/lroCreateCertificateName-canwaituntilacertificateiscreated-/pending"}}, [
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
  '9a92dbfe-a9a7-4ac1-bff1-404e6be4ed9f',
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
  'Thu, 25 Jun 2020 13:05:40 GMT',
  'Content-Length',
  '2856'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedcertificates/lroCreateCertificateName-canwaituntilacertificateiscreated-')
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
  'f99f2232-63f9-4aa9-9720-3114895cea78',
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
  'Thu, 25 Jun 2020 13:05:40 GMT'
]);

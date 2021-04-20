let nock = require('nock');

module.exports.hash = "73d5e32ec86cb39f35203d42d9fb4e13";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/certificates/listCertificateName-canretrieveallversionsofacertificate-/create')
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
  'ccc7be0a-c9c0-476a-8efc-7259db5beff4',
  'x-ms-keyvault-service-version',
  '1.2.164.2',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 16 Feb 2021 19:02:46 GMT'
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
  '89122d09-e7de-4cf0-9615-db4b6f7ff300',
  'x-ms-ests-server',
  '2.1.11496.5 - NCUS ProdSlices',
  'Set-Cookie',
  'fpc=AufoSEQpIbxLjzJaYLa_pBMA4qsDDwAAAE0NvtcOAAAA; expires=Thu, 18-Mar-2021 19:02:46 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 16 Feb 2021 19:02:46 GMT',
  'Content-Length',
  '1315'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/certificates/listCertificateName-canretrieveallversionsofacertificate-/create', {"policy":{"key_props":{},"secret_props":{},"x509_props":{"subject":"cn=MyCert","sans":{}},"issuer":{"name":"Self"},"attributes":{"enabled":true}},"attributes":{"enabled":true},"tags":{"tag":"tag01"}})
  .query(true)
  .reply(202, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canretrieveallversionsofacertificate-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAzb8Rg1jFGvZAvkvxfhM7hoXtJlHk82VjJwAVtYEgd8IUQt5Yi8n3K5+Ibh6yd6SOq8vY/vJwt6XbbWYDVCLV1EX/owQP9m6GZFiZC25kgLUWt/P2Gs42lR4NBP3krc8CPq3EtLg4zoCAS9XdxQ/knGaKm+RQlKTH50Gfh5XyjWM7cjBoznEvww1kocDoIn0m+/byvT63Y6rSJ9C87dAD06S1F8zsv9zbxNO515uBiJ1qEXPjG1JcNUsqTBhvreWR8mEzTyOkDrsUUbylCeij+eDss4cJ897I67yn+C50HqJ60K5Eok4OR5UwizdSjLmFC1WdNL6Fw5L51Rck6YUO4QIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAKWyJfKJi73hFd13AhQ0HYsby+bVxfw1otmoZB7W/DiicHP0u0gvaxR4H/d5TkQ5Zakbdan02d6zpaPYExooqfmjZVBVXASwTEgPkbjqsLHq+pA93cKrMj5z5Waz7EiNBsxyS13iwFQ5V7dSoLGLRl/aXCOLkxuZR9H10nqXVdSpmpAyG7fB2nn5myxQsTVk27NJkVq+L7NR+Bx9Y1R2iXk4oIIbiQyVLI1gVxVVBJuTESxzMX8Hpvf1z99SK490BG5ofEMxZdZjD2tTkvmebC4xKBlK/67Yiq0PWx4zPRkXaDZFq8XFkPqPM4O+n7cNiciKjoHq3tYYLyRciHWLRsk=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"5a0064528b0e4805a7d88826b0243841"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://keyvault_name.vault.azure.net/certificates/listCertificateName-canretrieveallversionsofacertificate-/pending?api-version=7.2&request_id=5a0064528b0e4805a7d88826b0243841',
  'Retry-After',
  '10',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  '5ef6304a-c8fb-4053-b8d6-3acb657eb204',
  'x-ms-keyvault-service-version',
  '1.2.164.2',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 16 Feb 2021 19:02:47 GMT',
  'Content-Length',
  '1340'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canretrieveallversionsofacertificate-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canretrieveallversionsofacertificate-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAzb8Rg1jFGvZAvkvxfhM7hoXtJlHk82VjJwAVtYEgd8IUQt5Yi8n3K5+Ibh6yd6SOq8vY/vJwt6XbbWYDVCLV1EX/owQP9m6GZFiZC25kgLUWt/P2Gs42lR4NBP3krc8CPq3EtLg4zoCAS9XdxQ/knGaKm+RQlKTH50Gfh5XyjWM7cjBoznEvww1kocDoIn0m+/byvT63Y6rSJ9C87dAD06S1F8zsv9zbxNO515uBiJ1qEXPjG1JcNUsqTBhvreWR8mEzTyOkDrsUUbylCeij+eDss4cJ897I67yn+C50HqJ60K5Eok4OR5UwizdSjLmFC1WdNL6Fw5L51Rck6YUO4QIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAKWyJfKJi73hFd13AhQ0HYsby+bVxfw1otmoZB7W/DiicHP0u0gvaxR4H/d5TkQ5Zakbdan02d6zpaPYExooqfmjZVBVXASwTEgPkbjqsLHq+pA93cKrMj5z5Waz7EiNBsxyS13iwFQ5V7dSoLGLRl/aXCOLkxuZR9H10nqXVdSpmpAyG7fB2nn5myxQsTVk27NJkVq+L7NR+Bx9Y1R2iXk4oIIbiQyVLI1gVxVVBJuTESxzMX8Hpvf1z99SK490BG5ofEMxZdZjD2tTkvmebC4xKBlK/67Yiq0PWx4zPRkXaDZFq8XFkPqPM4O+n7cNiciKjoHq3tYYLyRciHWLRsk=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"5a0064528b0e4805a7d88826b0243841"}, [
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
  'x-ms-request-id',
  'dd0d5be1-580a-4e9a-86f9-3643dff23300',
  'x-ms-keyvault-service-version',
  '1.2.164.2',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 16 Feb 2021 19:02:47 GMT',
  'Content-Length',
  '1340'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canretrieveallversionsofacertificate-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canretrieveallversionsofacertificate-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAzb8Rg1jFGvZAvkvxfhM7hoXtJlHk82VjJwAVtYEgd8IUQt5Yi8n3K5+Ibh6yd6SOq8vY/vJwt6XbbWYDVCLV1EX/owQP9m6GZFiZC25kgLUWt/P2Gs42lR4NBP3krc8CPq3EtLg4zoCAS9XdxQ/knGaKm+RQlKTH50Gfh5XyjWM7cjBoznEvww1kocDoIn0m+/byvT63Y6rSJ9C87dAD06S1F8zsv9zbxNO515uBiJ1qEXPjG1JcNUsqTBhvreWR8mEzTyOkDrsUUbylCeij+eDss4cJ897I67yn+C50HqJ60K5Eok4OR5UwizdSjLmFC1WdNL6Fw5L51Rck6YUO4QIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAKWyJfKJi73hFd13AhQ0HYsby+bVxfw1otmoZB7W/DiicHP0u0gvaxR4H/d5TkQ5Zakbdan02d6zpaPYExooqfmjZVBVXASwTEgPkbjqsLHq+pA93cKrMj5z5Waz7EiNBsxyS13iwFQ5V7dSoLGLRl/aXCOLkxuZR9H10nqXVdSpmpAyG7fB2nn5myxQsTVk27NJkVq+L7NR+Bx9Y1R2iXk4oIIbiQyVLI1gVxVVBJuTESxzMX8Hpvf1z99SK490BG5ofEMxZdZjD2tTkvmebC4xKBlK/67Yiq0PWx4zPRkXaDZFq8XFkPqPM4O+n7cNiciKjoHq3tYYLyRciHWLRsk=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"5a0064528b0e4805a7d88826b0243841"}, [
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
  'x-ms-request-id',
  '0054c3df-f2d6-4bf2-9be2-2870ea129c4b',
  'x-ms-keyvault-service-version',
  '1.2.164.2',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 16 Feb 2021 19:02:47 GMT',
  'Content-Length',
  '1340'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canretrieveallversionsofacertificate-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canretrieveallversionsofacertificate-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAzb8Rg1jFGvZAvkvxfhM7hoXtJlHk82VjJwAVtYEgd8IUQt5Yi8n3K5+Ibh6yd6SOq8vY/vJwt6XbbWYDVCLV1EX/owQP9m6GZFiZC25kgLUWt/P2Gs42lR4NBP3krc8CPq3EtLg4zoCAS9XdxQ/knGaKm+RQlKTH50Gfh5XyjWM7cjBoznEvww1kocDoIn0m+/byvT63Y6rSJ9C87dAD06S1F8zsv9zbxNO515uBiJ1qEXPjG1JcNUsqTBhvreWR8mEzTyOkDrsUUbylCeij+eDss4cJ897I67yn+C50HqJ60K5Eok4OR5UwizdSjLmFC1WdNL6Fw5L51Rck6YUO4QIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAKWyJfKJi73hFd13AhQ0HYsby+bVxfw1otmoZB7W/DiicHP0u0gvaxR4H/d5TkQ5Zakbdan02d6zpaPYExooqfmjZVBVXASwTEgPkbjqsLHq+pA93cKrMj5z5Waz7EiNBsxyS13iwFQ5V7dSoLGLRl/aXCOLkxuZR9H10nqXVdSpmpAyG7fB2nn5myxQsTVk27NJkVq+L7NR+Bx9Y1R2iXk4oIIbiQyVLI1gVxVVBJuTESxzMX8Hpvf1z99SK490BG5ofEMxZdZjD2tTkvmebC4xKBlK/67Yiq0PWx4zPRkXaDZFq8XFkPqPM4O+n7cNiciKjoHq3tYYLyRciHWLRsk=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"5a0064528b0e4805a7d88826b0243841"}, [
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
  'x-ms-request-id',
  '6cda0a25-391d-4923-bb55-bedf318da6a2',
  'x-ms-keyvault-service-version',
  '1.2.164.2',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 16 Feb 2021 19:02:49 GMT',
  'Content-Length',
  '1340'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canretrieveallversionsofacertificate-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canretrieveallversionsofacertificate-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAzb8Rg1jFGvZAvkvxfhM7hoXtJlHk82VjJwAVtYEgd8IUQt5Yi8n3K5+Ibh6yd6SOq8vY/vJwt6XbbWYDVCLV1EX/owQP9m6GZFiZC25kgLUWt/P2Gs42lR4NBP3krc8CPq3EtLg4zoCAS9XdxQ/knGaKm+RQlKTH50Gfh5XyjWM7cjBoznEvww1kocDoIn0m+/byvT63Y6rSJ9C87dAD06S1F8zsv9zbxNO515uBiJ1qEXPjG1JcNUsqTBhvreWR8mEzTyOkDrsUUbylCeij+eDss4cJ897I67yn+C50HqJ60K5Eok4OR5UwizdSjLmFC1WdNL6Fw5L51Rck6YUO4QIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAKWyJfKJi73hFd13AhQ0HYsby+bVxfw1otmoZB7W/DiicHP0u0gvaxR4H/d5TkQ5Zakbdan02d6zpaPYExooqfmjZVBVXASwTEgPkbjqsLHq+pA93cKrMj5z5Waz7EiNBsxyS13iwFQ5V7dSoLGLRl/aXCOLkxuZR9H10nqXVdSpmpAyG7fB2nn5myxQsTVk27NJkVq+L7NR+Bx9Y1R2iXk4oIIbiQyVLI1gVxVVBJuTESxzMX8Hpvf1z99SK490BG5ofEMxZdZjD2tTkvmebC4xKBlK/67Yiq0PWx4zPRkXaDZFq8XFkPqPM4O+n7cNiciKjoHq3tYYLyRciHWLRsk=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"5a0064528b0e4805a7d88826b0243841"}, [
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
  'x-ms-request-id',
  '555f2f64-1c5c-4320-8f13-b2c04dab8059',
  'x-ms-keyvault-service-version',
  '1.2.164.2',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 16 Feb 2021 19:02:51 GMT',
  'Content-Length',
  '1340'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canretrieveallversionsofacertificate-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canretrieveallversionsofacertificate-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAzb8Rg1jFGvZAvkvxfhM7hoXtJlHk82VjJwAVtYEgd8IUQt5Yi8n3K5+Ibh6yd6SOq8vY/vJwt6XbbWYDVCLV1EX/owQP9m6GZFiZC25kgLUWt/P2Gs42lR4NBP3krc8CPq3EtLg4zoCAS9XdxQ/knGaKm+RQlKTH50Gfh5XyjWM7cjBoznEvww1kocDoIn0m+/byvT63Y6rSJ9C87dAD06S1F8zsv9zbxNO515uBiJ1qEXPjG1JcNUsqTBhvreWR8mEzTyOkDrsUUbylCeij+eDss4cJ897I67yn+C50HqJ60K5Eok4OR5UwizdSjLmFC1WdNL6Fw5L51Rck6YUO4QIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAKWyJfKJi73hFd13AhQ0HYsby+bVxfw1otmoZB7W/DiicHP0u0gvaxR4H/d5TkQ5Zakbdan02d6zpaPYExooqfmjZVBVXASwTEgPkbjqsLHq+pA93cKrMj5z5Waz7EiNBsxyS13iwFQ5V7dSoLGLRl/aXCOLkxuZR9H10nqXVdSpmpAyG7fB2nn5myxQsTVk27NJkVq+L7NR+Bx9Y1R2iXk4oIIbiQyVLI1gVxVVBJuTESxzMX8Hpvf1z99SK490BG5ofEMxZdZjD2tTkvmebC4xKBlK/67Yiq0PWx4zPRkXaDZFq8XFkPqPM4O+n7cNiciKjoHq3tYYLyRciHWLRsk=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"5a0064528b0e4805a7d88826b0243841"}, [
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
  'x-ms-request-id',
  '4176b1a6-4aae-4ee1-ad22-5e16c3fb91a2',
  'x-ms-keyvault-service-version',
  '1.2.164.2',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 16 Feb 2021 19:02:54 GMT',
  'Content-Length',
  '1340'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canretrieveallversionsofacertificate-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canretrieveallversionsofacertificate-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAzb8Rg1jFGvZAvkvxfhM7hoXtJlHk82VjJwAVtYEgd8IUQt5Yi8n3K5+Ibh6yd6SOq8vY/vJwt6XbbWYDVCLV1EX/owQP9m6GZFiZC25kgLUWt/P2Gs42lR4NBP3krc8CPq3EtLg4zoCAS9XdxQ/knGaKm+RQlKTH50Gfh5XyjWM7cjBoznEvww1kocDoIn0m+/byvT63Y6rSJ9C87dAD06S1F8zsv9zbxNO515uBiJ1qEXPjG1JcNUsqTBhvreWR8mEzTyOkDrsUUbylCeij+eDss4cJ897I67yn+C50HqJ60K5Eok4OR5UwizdSjLmFC1WdNL6Fw5L51Rck6YUO4QIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAKWyJfKJi73hFd13AhQ0HYsby+bVxfw1otmoZB7W/DiicHP0u0gvaxR4H/d5TkQ5Zakbdan02d6zpaPYExooqfmjZVBVXASwTEgPkbjqsLHq+pA93cKrMj5z5Waz7EiNBsxyS13iwFQ5V7dSoLGLRl/aXCOLkxuZR9H10nqXVdSpmpAyG7fB2nn5myxQsTVk27NJkVq+L7NR+Bx9Y1R2iXk4oIIbiQyVLI1gVxVVBJuTESxzMX8Hpvf1z99SK490BG5ofEMxZdZjD2tTkvmebC4xKBlK/67Yiq0PWx4zPRkXaDZFq8XFkPqPM4O+n7cNiciKjoHq3tYYLyRciHWLRsk=","cancellation_requested":false,"status":"completed","target":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canretrieveallversionsofacertificate-","request_id":"5a0064528b0e4805a7d88826b0243841"}, [
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
  '1ccfa355-1c74-45b5-8899-b45c2cf41c9b',
  'x-ms-keyvault-service-version',
  '1.2.164.2',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 16 Feb 2021 19:02:56 GMT',
  'Content-Length',
  '1307'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canretrieveallversionsofacertificate-/')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canretrieveallversionsofacertificate-/3ffc3826f3a34e099fc75c5aab55d60d","kid":"https://keyvault_name.vault.azure.net/keys/listCertificateName-canretrieveallversionsofacertificate-/3ffc3826f3a34e099fc75c5aab55d60d","sid":"https://keyvault_name.vault.azure.net/secrets/listCertificateName-canretrieveallversionsofacertificate-/3ffc3826f3a34e099fc75c5aab55d60d","x5t":"nssiDh4YsrOGyT3aTmh7uuSQqmE","cer":"MIIDKDCCAhCgAwIBAgIQCQEjT1qZQ665hYQbj9rS9jANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjEwMjE2MTg1MjU1WhcNMjIwMjE2MTkwMjU1WjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQDNvxGDWMUa9kC+S/F+EzuGhe0mUeTzZWMnABW1gSB3whRC3liLyfcrn4huHrJ3pI6ry9j+8nC3pdttZgNUItXURf+jBA/2boZkWJkLbmSAtRa38/YazjaVHg0E/eStzwI+rcS0uDjOgIBL1d3FD+ScZoqb5FCUpMfnQZ+HlfKNYztyMGjOcS/DDWShwOgifSb79vK9PrdjqtIn0Lzt0APTpLUXzOy/3NvE07nXm4GInWoRc+MbUlw1SypMGG+t5ZHyYTNPI6QOuxRRvKUJ6KP54Oyzhwnz3sjrvKf4LnQeonrQrkSiTg5HlTCLN1KMuYULVZ00voXDkvnVFyTphQ7hAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBSPzdY1RKWO4l6cPvqAZPcjkVnd6TAdBgNVHQ4EFgQUj83WNUSljuJenD76gGT3I5FZ3ekwDQYJKoZIhvcNAQELBQADggEBALKr7rjkaHD8DqZG7urf9CwajNoO4EydTlXqqq8DyUEPx4ZTBLFHCsHqGr2EVkPqPMdLijMNiVeC4HetnFZhYIhfQFe/lP1RzcqiiKeUaWUNntTZQB6XkQx8PIexW4vFXXYzgFxk1j2cLNnEOnGBL4Haxxf1JW/5N9N5WhKUN0jqsNWPlK+DWEPs4gFGFXGYVqkxPuLUu60/DxkfANdyS6DA6vQ6ao18tJPCkTYJDS5hpMgUAW6muEK3H3mZ1ww+EbbeciVmiusHt2/qKoFC0fm/fCWYcl8zjZan5aauSCq4bhXFcXkgIGa8/B+bXS15UDbxnrKObxyfnx5yHWiTUnA=","attributes":{"enabled":true,"nbf":1613501575,"exp":1645038175,"created":1613502175,"updated":1613502175,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7},"tags":{"tag":"tag01"},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canretrieveallversionsofacertificate-/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1613502167,"updated":1613502167}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canretrieveallversionsofacertificate-/pending"}}, [
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
  'db877885-a405-4a61-80bc-4572dc684df6',
  'x-ms-keyvault-service-version',
  '1.2.164.2',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 16 Feb 2021 19:02:56 GMT',
  'Content-Length',
  '2622'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/certificates/listCertificateName-canretrieveallversionsofacertificate-/create', {"policy":{"key_props":{},"secret_props":{},"x509_props":{"subject":"cn=MyCert","sans":{}},"issuer":{"name":"Self"},"attributes":{"enabled":true}},"attributes":{"enabled":true},"tags":{"tag":"tag02"}})
  .query(true)
  .reply(202, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canretrieveallversionsofacertificate-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAu5Fnx7bQ2fvnW8MmTWmVCXlsubHTQhF0C8RKvRG+DYgARMMCk6D5e1N9zV20ULIHjBKoF3AfZCN3bRbRYkfBKbex0+6E6zuD2MnNZ8DjX+UaWy4E4NwVeItbobvSKSbW0kjKQ25Rhhm7lTJGEHipfsTsAp5DEZfvAa8vKXX9ettZXyN5Ey5bNP8mR30VEiQS2C4DTSbSg9MOmnNdTeyHNOGBYh1NHcYcLQVOrCtvSg3TPJ/fX+cP9TxVgHT6dotk6SSfEU91BeS8wchEa3wAloWga+BFv2Hl7tMZXRIu1QrMQHp7YJYoyT+E5wSrZB1NS3Z9M49vh7zJJxV56Cs0VQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAIIYadGzGylTwZgu2ljNVOfaQ+kuJP0IyNCdgoVP58CYQTGRp6SbqvnQYXb3ZjxU6jLh52ZfKD4qMVapZDFVYSP0M6n+2bqgzKdpRUcfYsq3+iRJUKOgourERaZtyazqoFnMq5FE08PuNog2GI9eRvovMXtdmBKilCs//l/KiukmQsc8dEJQ9NfBiy4HoFiGV3y0juBGPdbiFrCXuRL9lu+icwNMkBfrkalsZY+vzNSDl6ZPPtUokMU+YbuCRsoOAXWOziG2mjGKhjekXx5jOrCbTZPPYt1hJQehQ8a1lphWB56spUIaQTmsLCKdWG20JsDhgTW6bga0qlUhsIL5eiQ=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"7731a0314ec0465b93ced8f256dca9d5"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://keyvault_name.vault.azure.net/certificates/listCertificateName-canretrieveallversionsofacertificate-/pending?api-version=7.2&request_id=7731a0314ec0465b93ced8f256dca9d5',
  'Retry-After',
  '10',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  'e7ae39bf-53bc-4cb0-a002-7fadc337ce0d',
  'x-ms-keyvault-service-version',
  '1.2.164.2',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 16 Feb 2021 19:02:56 GMT',
  'Content-Length',
  '1340'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canretrieveallversionsofacertificate-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canretrieveallversionsofacertificate-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAu5Fnx7bQ2fvnW8MmTWmVCXlsubHTQhF0C8RKvRG+DYgARMMCk6D5e1N9zV20ULIHjBKoF3AfZCN3bRbRYkfBKbex0+6E6zuD2MnNZ8DjX+UaWy4E4NwVeItbobvSKSbW0kjKQ25Rhhm7lTJGEHipfsTsAp5DEZfvAa8vKXX9ettZXyN5Ey5bNP8mR30VEiQS2C4DTSbSg9MOmnNdTeyHNOGBYh1NHcYcLQVOrCtvSg3TPJ/fX+cP9TxVgHT6dotk6SSfEU91BeS8wchEa3wAloWga+BFv2Hl7tMZXRIu1QrMQHp7YJYoyT+E5wSrZB1NS3Z9M49vh7zJJxV56Cs0VQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAIIYadGzGylTwZgu2ljNVOfaQ+kuJP0IyNCdgoVP58CYQTGRp6SbqvnQYXb3ZjxU6jLh52ZfKD4qMVapZDFVYSP0M6n+2bqgzKdpRUcfYsq3+iRJUKOgourERaZtyazqoFnMq5FE08PuNog2GI9eRvovMXtdmBKilCs//l/KiukmQsc8dEJQ9NfBiy4HoFiGV3y0juBGPdbiFrCXuRL9lu+icwNMkBfrkalsZY+vzNSDl6ZPPtUokMU+YbuCRsoOAXWOziG2mjGKhjekXx5jOrCbTZPPYt1hJQehQ8a1lphWB56spUIaQTmsLCKdWG20JsDhgTW6bga0qlUhsIL5eiQ=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"7731a0314ec0465b93ced8f256dca9d5"}, [
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
  'x-ms-request-id',
  '65d2193d-a470-4bf2-a840-387c95d40309',
  'x-ms-keyvault-service-version',
  '1.2.164.2',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 16 Feb 2021 19:02:56 GMT',
  'Content-Length',
  '1340'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canretrieveallversionsofacertificate-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canretrieveallversionsofacertificate-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAu5Fnx7bQ2fvnW8MmTWmVCXlsubHTQhF0C8RKvRG+DYgARMMCk6D5e1N9zV20ULIHjBKoF3AfZCN3bRbRYkfBKbex0+6E6zuD2MnNZ8DjX+UaWy4E4NwVeItbobvSKSbW0kjKQ25Rhhm7lTJGEHipfsTsAp5DEZfvAa8vKXX9ettZXyN5Ey5bNP8mR30VEiQS2C4DTSbSg9MOmnNdTeyHNOGBYh1NHcYcLQVOrCtvSg3TPJ/fX+cP9TxVgHT6dotk6SSfEU91BeS8wchEa3wAloWga+BFv2Hl7tMZXRIu1QrMQHp7YJYoyT+E5wSrZB1NS3Z9M49vh7zJJxV56Cs0VQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAIIYadGzGylTwZgu2ljNVOfaQ+kuJP0IyNCdgoVP58CYQTGRp6SbqvnQYXb3ZjxU6jLh52ZfKD4qMVapZDFVYSP0M6n+2bqgzKdpRUcfYsq3+iRJUKOgourERaZtyazqoFnMq5FE08PuNog2GI9eRvovMXtdmBKilCs//l/KiukmQsc8dEJQ9NfBiy4HoFiGV3y0juBGPdbiFrCXuRL9lu+icwNMkBfrkalsZY+vzNSDl6ZPPtUokMU+YbuCRsoOAXWOziG2mjGKhjekXx5jOrCbTZPPYt1hJQehQ8a1lphWB56spUIaQTmsLCKdWG20JsDhgTW6bga0qlUhsIL5eiQ=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"7731a0314ec0465b93ced8f256dca9d5"}, [
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
  'x-ms-request-id',
  '679cac9c-1f65-4ec0-9441-a85ba6f3ef00',
  'x-ms-keyvault-service-version',
  '1.2.164.2',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 16 Feb 2021 19:02:56 GMT',
  'Content-Length',
  '1340'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canretrieveallversionsofacertificate-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canretrieveallversionsofacertificate-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAu5Fnx7bQ2fvnW8MmTWmVCXlsubHTQhF0C8RKvRG+DYgARMMCk6D5e1N9zV20ULIHjBKoF3AfZCN3bRbRYkfBKbex0+6E6zuD2MnNZ8DjX+UaWy4E4NwVeItbobvSKSbW0kjKQ25Rhhm7lTJGEHipfsTsAp5DEZfvAa8vKXX9ettZXyN5Ey5bNP8mR30VEiQS2C4DTSbSg9MOmnNdTeyHNOGBYh1NHcYcLQVOrCtvSg3TPJ/fX+cP9TxVgHT6dotk6SSfEU91BeS8wchEa3wAloWga+BFv2Hl7tMZXRIu1QrMQHp7YJYoyT+E5wSrZB1NS3Z9M49vh7zJJxV56Cs0VQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAIIYadGzGylTwZgu2ljNVOfaQ+kuJP0IyNCdgoVP58CYQTGRp6SbqvnQYXb3ZjxU6jLh52ZfKD4qMVapZDFVYSP0M6n+2bqgzKdpRUcfYsq3+iRJUKOgourERaZtyazqoFnMq5FE08PuNog2GI9eRvovMXtdmBKilCs//l/KiukmQsc8dEJQ9NfBiy4HoFiGV3y0juBGPdbiFrCXuRL9lu+icwNMkBfrkalsZY+vzNSDl6ZPPtUokMU+YbuCRsoOAXWOziG2mjGKhjekXx5jOrCbTZPPYt1hJQehQ8a1lphWB56spUIaQTmsLCKdWG20JsDhgTW6bga0qlUhsIL5eiQ=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"7731a0314ec0465b93ced8f256dca9d5"}, [
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
  'x-ms-request-id',
  'd9a7f4e7-47b7-4cbc-b801-b80c4414e4be',
  'x-ms-keyvault-service-version',
  '1.2.164.2',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 16 Feb 2021 19:02:58 GMT',
  'Content-Length',
  '1340'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canretrieveallversionsofacertificate-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canretrieveallversionsofacertificate-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAu5Fnx7bQ2fvnW8MmTWmVCXlsubHTQhF0C8RKvRG+DYgARMMCk6D5e1N9zV20ULIHjBKoF3AfZCN3bRbRYkfBKbex0+6E6zuD2MnNZ8DjX+UaWy4E4NwVeItbobvSKSbW0kjKQ25Rhhm7lTJGEHipfsTsAp5DEZfvAa8vKXX9ettZXyN5Ey5bNP8mR30VEiQS2C4DTSbSg9MOmnNdTeyHNOGBYh1NHcYcLQVOrCtvSg3TPJ/fX+cP9TxVgHT6dotk6SSfEU91BeS8wchEa3wAloWga+BFv2Hl7tMZXRIu1QrMQHp7YJYoyT+E5wSrZB1NS3Z9M49vh7zJJxV56Cs0VQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAIIYadGzGylTwZgu2ljNVOfaQ+kuJP0IyNCdgoVP58CYQTGRp6SbqvnQYXb3ZjxU6jLh52ZfKD4qMVapZDFVYSP0M6n+2bqgzKdpRUcfYsq3+iRJUKOgourERaZtyazqoFnMq5FE08PuNog2GI9eRvovMXtdmBKilCs//l/KiukmQsc8dEJQ9NfBiy4HoFiGV3y0juBGPdbiFrCXuRL9lu+icwNMkBfrkalsZY+vzNSDl6ZPPtUokMU+YbuCRsoOAXWOziG2mjGKhjekXx5jOrCbTZPPYt1hJQehQ8a1lphWB56spUIaQTmsLCKdWG20JsDhgTW6bga0qlUhsIL5eiQ=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"7731a0314ec0465b93ced8f256dca9d5"}, [
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
  'x-ms-request-id',
  '870760ca-facb-4c96-8459-21775a8f193c',
  'x-ms-keyvault-service-version',
  '1.2.164.2',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 16 Feb 2021 19:03:00 GMT',
  'Content-Length',
  '1340'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canretrieveallversionsofacertificate-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canretrieveallversionsofacertificate-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAu5Fnx7bQ2fvnW8MmTWmVCXlsubHTQhF0C8RKvRG+DYgARMMCk6D5e1N9zV20ULIHjBKoF3AfZCN3bRbRYkfBKbex0+6E6zuD2MnNZ8DjX+UaWy4E4NwVeItbobvSKSbW0kjKQ25Rhhm7lTJGEHipfsTsAp5DEZfvAa8vKXX9ettZXyN5Ey5bNP8mR30VEiQS2C4DTSbSg9MOmnNdTeyHNOGBYh1NHcYcLQVOrCtvSg3TPJ/fX+cP9TxVgHT6dotk6SSfEU91BeS8wchEa3wAloWga+BFv2Hl7tMZXRIu1QrMQHp7YJYoyT+E5wSrZB1NS3Z9M49vh7zJJxV56Cs0VQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAIIYadGzGylTwZgu2ljNVOfaQ+kuJP0IyNCdgoVP58CYQTGRp6SbqvnQYXb3ZjxU6jLh52ZfKD4qMVapZDFVYSP0M6n+2bqgzKdpRUcfYsq3+iRJUKOgourERaZtyazqoFnMq5FE08PuNog2GI9eRvovMXtdmBKilCs//l/KiukmQsc8dEJQ9NfBiy4HoFiGV3y0juBGPdbiFrCXuRL9lu+icwNMkBfrkalsZY+vzNSDl6ZPPtUokMU+YbuCRsoOAXWOziG2mjGKhjekXx5jOrCbTZPPYt1hJQehQ8a1lphWB56spUIaQTmsLCKdWG20JsDhgTW6bga0qlUhsIL5eiQ=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"7731a0314ec0465b93ced8f256dca9d5"}, [
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
  'x-ms-request-id',
  'fb418574-2546-4dc7-8dcc-daeff9979732',
  'x-ms-keyvault-service-version',
  '1.2.164.2',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 16 Feb 2021 19:03:03 GMT',
  'Content-Length',
  '1340'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canretrieveallversionsofacertificate-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canretrieveallversionsofacertificate-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAu5Fnx7bQ2fvnW8MmTWmVCXlsubHTQhF0C8RKvRG+DYgARMMCk6D5e1N9zV20ULIHjBKoF3AfZCN3bRbRYkfBKbex0+6E6zuD2MnNZ8DjX+UaWy4E4NwVeItbobvSKSbW0kjKQ25Rhhm7lTJGEHipfsTsAp5DEZfvAa8vKXX9ettZXyN5Ey5bNP8mR30VEiQS2C4DTSbSg9MOmnNdTeyHNOGBYh1NHcYcLQVOrCtvSg3TPJ/fX+cP9TxVgHT6dotk6SSfEU91BeS8wchEa3wAloWga+BFv2Hl7tMZXRIu1QrMQHp7YJYoyT+E5wSrZB1NS3Z9M49vh7zJJxV56Cs0VQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAIIYadGzGylTwZgu2ljNVOfaQ+kuJP0IyNCdgoVP58CYQTGRp6SbqvnQYXb3ZjxU6jLh52ZfKD4qMVapZDFVYSP0M6n+2bqgzKdpRUcfYsq3+iRJUKOgourERaZtyazqoFnMq5FE08PuNog2GI9eRvovMXtdmBKilCs//l/KiukmQsc8dEJQ9NfBiy4HoFiGV3y0juBGPdbiFrCXuRL9lu+icwNMkBfrkalsZY+vzNSDl6ZPPtUokMU+YbuCRsoOAXWOziG2mjGKhjekXx5jOrCbTZPPYt1hJQehQ8a1lphWB56spUIaQTmsLCKdWG20JsDhgTW6bga0qlUhsIL5eiQ=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"7731a0314ec0465b93ced8f256dca9d5"}, [
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
  'x-ms-request-id',
  '26c01580-5e82-4c20-b6aa-1bf30ac6dbd9',
  'x-ms-keyvault-service-version',
  '1.2.164.2',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 16 Feb 2021 19:03:05 GMT',
  'Content-Length',
  '1340'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canretrieveallversionsofacertificate-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canretrieveallversionsofacertificate-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAu5Fnx7bQ2fvnW8MmTWmVCXlsubHTQhF0C8RKvRG+DYgARMMCk6D5e1N9zV20ULIHjBKoF3AfZCN3bRbRYkfBKbex0+6E6zuD2MnNZ8DjX+UaWy4E4NwVeItbobvSKSbW0kjKQ25Rhhm7lTJGEHipfsTsAp5DEZfvAa8vKXX9ettZXyN5Ey5bNP8mR30VEiQS2C4DTSbSg9MOmnNdTeyHNOGBYh1NHcYcLQVOrCtvSg3TPJ/fX+cP9TxVgHT6dotk6SSfEU91BeS8wchEa3wAloWga+BFv2Hl7tMZXRIu1QrMQHp7YJYoyT+E5wSrZB1NS3Z9M49vh7zJJxV56Cs0VQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAIIYadGzGylTwZgu2ljNVOfaQ+kuJP0IyNCdgoVP58CYQTGRp6SbqvnQYXb3ZjxU6jLh52ZfKD4qMVapZDFVYSP0M6n+2bqgzKdpRUcfYsq3+iRJUKOgourERaZtyazqoFnMq5FE08PuNog2GI9eRvovMXtdmBKilCs//l/KiukmQsc8dEJQ9NfBiy4HoFiGV3y0juBGPdbiFrCXuRL9lu+icwNMkBfrkalsZY+vzNSDl6ZPPtUokMU+YbuCRsoOAXWOziG2mjGKhjekXx5jOrCbTZPPYt1hJQehQ8a1lphWB56spUIaQTmsLCKdWG20JsDhgTW6bga0qlUhsIL5eiQ=","cancellation_requested":false,"status":"completed","target":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canretrieveallversionsofacertificate-","request_id":"7731a0314ec0465b93ced8f256dca9d5"}, [
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
  '14ac46cd-12d0-4e89-bba4-a2bb372cdd60',
  'x-ms-keyvault-service-version',
  '1.2.164.2',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 16 Feb 2021 19:03:07 GMT',
  'Content-Length',
  '1307'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canretrieveallversionsofacertificate-/')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canretrieveallversionsofacertificate-/fa3db20d19254ec9a0a15b3c8d039173","kid":"https://keyvault_name.vault.azure.net/keys/listCertificateName-canretrieveallversionsofacertificate-/fa3db20d19254ec9a0a15b3c8d039173","sid":"https://keyvault_name.vault.azure.net/secrets/listCertificateName-canretrieveallversionsofacertificate-/fa3db20d19254ec9a0a15b3c8d039173","x5t":"1TpwXUN4FAwAxL3s2pk0of7hLEQ","cer":"MIIDKDCCAhCgAwIBAgIQTZztuVXTSvCuKnYBmR54czANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjEwMjE2MTg1MzA1WhcNMjIwMjE2MTkwMzA1WjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQC7kWfHttDZ++dbwyZNaZUJeWy5sdNCEXQLxEq9Eb4NiABEwwKToPl7U33NXbRQsgeMEqgXcB9kI3dtFtFiR8Ept7HT7oTrO4PYyc1nwONf5RpbLgTg3BV4i1uhu9IpJtbSSMpDblGGGbuVMkYQeKl+xOwCnkMRl+8Bry8pdf1621lfI3kTLls0/yZHfRUSJBLYLgNNJtKD0w6ac11N7Ic04YFiHU0dxhwtBU6sK29KDdM8n99f5w/1PFWAdPp2i2TpJJ8RT3UF5LzByERrfACWhaBr4EW/YeXu0xldEi7VCsxAentglijJP4TnBKtkHU1Ldn0zj2+HvMknFXnoKzRVAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBQ0CL8oKtkCNaAUReJLQm4dX0rJwTAdBgNVHQ4EFgQUNAi/KCrZAjWgFEXiS0JuHV9KycEwDQYJKoZIhvcNAQELBQADggEBAJh/ChPjYNlSfpwKLiGY3TFcwcq/8j5+3htVr06k2BO9JvfLICz4Ugk8soOh2xtXMYU99efP82o2fBnMJtiVCVG9i4CblfFKq4f7TUrrfvzZBbz0Rme2eAo25wSKBa8wy14qlBBOihDbJVEgIUkFiamLTrZFr95cV6UTe9uxfJ2xKqT6DHZtwTzns2LG/0GANVA5mViC5rT0PtBtOoVLpZkSdpK6M9d5vLS6czIEhFmA4Viz6pTDLFPoBVigtvytDPiec+65as1oj3Mcn++GLIah/JjQqjGEwMbw0j+ePrkHeNPN/Wh8//PnBMseQ/fncTiGdVNq6yb+zAzMjJPQWj8=","attributes":{"enabled":true,"nbf":1613501585,"exp":1645038185,"created":1613502186,"updated":1613502186,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7},"tags":{"tag":"tag02"},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canretrieveallversionsofacertificate-/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1613502167,"updated":1613502176}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canretrieveallversionsofacertificate-/pending"}}, [
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
  'ce9ff029-fbc9-4c82-ae24-cc429fa81636',
  'x-ms-keyvault-service-version',
  '1.2.164.2',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 16 Feb 2021 19:03:07 GMT',
  'Content-Length',
  '2622'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/certificates/listCertificateName-canretrieveallversionsofacertificate-/create', {"policy":{"key_props":{},"secret_props":{},"x509_props":{"subject":"cn=MyCert","sans":{}},"issuer":{"name":"Self"},"attributes":{"enabled":true}},"attributes":{"enabled":true},"tags":{"tag":"tag03"}})
  .query(true)
  .reply(202, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canretrieveallversionsofacertificate-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAybprTUZdDeoOLSnChr+zuXBQe2fkOaF6AhDoWa3aJrWECj4kIs8c70ERKcRCN34oSefgq5YBYuhZNiyVX5Q2zkUiOw3rLcA49AtHkIZDhWkYIsozwJFBB4l3E5FatQtTQS7YtIqY46c/EHDbiZPOg4DrsVvgeH0Y5P3Xeot55KuraX25/5EVa5ovICzjNYKc6p0fSflFERHElrmw+DV4I+WQs5Lc0z8qp2prnS0OLrnNYGR4dUXUlug1b2drJ6pRq4M4iFvt1/OZXSUrSsUQ+KmtjLV+rF1DdRBvkNGpfb4MVjK9VR1bVJiybrFtvzsnFbWKMzkELWFyOvRfGJY8HQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAGfvnJmbljGIEKc3S8JGAvX24pJSGtgPu7A7Es45E4U8ciz6mjfbNO503VOpuz1oUhuHadsDzqNc49UaXj6yqH31jgvZmHraxpmh4o0W+c8iC5MjaZ5ys+q5Z6tUeJ99QrlSnVjyEcIufJNxkEQrSi0SFNNatvb6eLNE58KypKCgAP9ME+gqSuQ+STJPFgLxaT8/YHauyM29S5QgwKKWS+KZV+6K6y988j7SSAknv0syn/vctoWbPysmr2VW8tMv+MEBYGKocqdrrRr+8uJeADaVxJdWkPyzEDVMFnCO0USNmWYzzZgYwiIPGtWG3vJZP/xrbyEE3PobHOULx21pwUM=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"26937d2afdd14b59a042ea674dd86c45"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://keyvault_name.vault.azure.net/certificates/listCertificateName-canretrieveallversionsofacertificate-/pending?api-version=7.2&request_id=26937d2afdd14b59a042ea674dd86c45',
  'Retry-After',
  '10',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  '2ab27d93-ab06-4413-acea-d8af1dc1a435',
  'x-ms-keyvault-service-version',
  '1.2.164.2',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 16 Feb 2021 19:03:07 GMT',
  'Content-Length',
  '1340'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canretrieveallversionsofacertificate-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canretrieveallversionsofacertificate-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAybprTUZdDeoOLSnChr+zuXBQe2fkOaF6AhDoWa3aJrWECj4kIs8c70ERKcRCN34oSefgq5YBYuhZNiyVX5Q2zkUiOw3rLcA49AtHkIZDhWkYIsozwJFBB4l3E5FatQtTQS7YtIqY46c/EHDbiZPOg4DrsVvgeH0Y5P3Xeot55KuraX25/5EVa5ovICzjNYKc6p0fSflFERHElrmw+DV4I+WQs5Lc0z8qp2prnS0OLrnNYGR4dUXUlug1b2drJ6pRq4M4iFvt1/OZXSUrSsUQ+KmtjLV+rF1DdRBvkNGpfb4MVjK9VR1bVJiybrFtvzsnFbWKMzkELWFyOvRfGJY8HQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAGfvnJmbljGIEKc3S8JGAvX24pJSGtgPu7A7Es45E4U8ciz6mjfbNO503VOpuz1oUhuHadsDzqNc49UaXj6yqH31jgvZmHraxpmh4o0W+c8iC5MjaZ5ys+q5Z6tUeJ99QrlSnVjyEcIufJNxkEQrSi0SFNNatvb6eLNE58KypKCgAP9ME+gqSuQ+STJPFgLxaT8/YHauyM29S5QgwKKWS+KZV+6K6y988j7SSAknv0syn/vctoWbPysmr2VW8tMv+MEBYGKocqdrrRr+8uJeADaVxJdWkPyzEDVMFnCO0USNmWYzzZgYwiIPGtWG3vJZP/xrbyEE3PobHOULx21pwUM=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"26937d2afdd14b59a042ea674dd86c45"}, [
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
  'x-ms-request-id',
  '37a9434f-5882-4757-bbba-24a104a33743',
  'x-ms-keyvault-service-version',
  '1.2.164.2',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 16 Feb 2021 19:03:07 GMT',
  'Content-Length',
  '1340'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canretrieveallversionsofacertificate-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canretrieveallversionsofacertificate-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAybprTUZdDeoOLSnChr+zuXBQe2fkOaF6AhDoWa3aJrWECj4kIs8c70ERKcRCN34oSefgq5YBYuhZNiyVX5Q2zkUiOw3rLcA49AtHkIZDhWkYIsozwJFBB4l3E5FatQtTQS7YtIqY46c/EHDbiZPOg4DrsVvgeH0Y5P3Xeot55KuraX25/5EVa5ovICzjNYKc6p0fSflFERHElrmw+DV4I+WQs5Lc0z8qp2prnS0OLrnNYGR4dUXUlug1b2drJ6pRq4M4iFvt1/OZXSUrSsUQ+KmtjLV+rF1DdRBvkNGpfb4MVjK9VR1bVJiybrFtvzsnFbWKMzkELWFyOvRfGJY8HQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAGfvnJmbljGIEKc3S8JGAvX24pJSGtgPu7A7Es45E4U8ciz6mjfbNO503VOpuz1oUhuHadsDzqNc49UaXj6yqH31jgvZmHraxpmh4o0W+c8iC5MjaZ5ys+q5Z6tUeJ99QrlSnVjyEcIufJNxkEQrSi0SFNNatvb6eLNE58KypKCgAP9ME+gqSuQ+STJPFgLxaT8/YHauyM29S5QgwKKWS+KZV+6K6y988j7SSAknv0syn/vctoWbPysmr2VW8tMv+MEBYGKocqdrrRr+8uJeADaVxJdWkPyzEDVMFnCO0USNmWYzzZgYwiIPGtWG3vJZP/xrbyEE3PobHOULx21pwUM=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"26937d2afdd14b59a042ea674dd86c45"}, [
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
  'x-ms-request-id',
  '25e0885b-65f7-4b01-9720-27cc21e4e0f8',
  'x-ms-keyvault-service-version',
  '1.2.164.2',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 16 Feb 2021 19:03:07 GMT',
  'Content-Length',
  '1340'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canretrieveallversionsofacertificate-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canretrieveallversionsofacertificate-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAybprTUZdDeoOLSnChr+zuXBQe2fkOaF6AhDoWa3aJrWECj4kIs8c70ERKcRCN34oSefgq5YBYuhZNiyVX5Q2zkUiOw3rLcA49AtHkIZDhWkYIsozwJFBB4l3E5FatQtTQS7YtIqY46c/EHDbiZPOg4DrsVvgeH0Y5P3Xeot55KuraX25/5EVa5ovICzjNYKc6p0fSflFERHElrmw+DV4I+WQs5Lc0z8qp2prnS0OLrnNYGR4dUXUlug1b2drJ6pRq4M4iFvt1/OZXSUrSsUQ+KmtjLV+rF1DdRBvkNGpfb4MVjK9VR1bVJiybrFtvzsnFbWKMzkELWFyOvRfGJY8HQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAGfvnJmbljGIEKc3S8JGAvX24pJSGtgPu7A7Es45E4U8ciz6mjfbNO503VOpuz1oUhuHadsDzqNc49UaXj6yqH31jgvZmHraxpmh4o0W+c8iC5MjaZ5ys+q5Z6tUeJ99QrlSnVjyEcIufJNxkEQrSi0SFNNatvb6eLNE58KypKCgAP9ME+gqSuQ+STJPFgLxaT8/YHauyM29S5QgwKKWS+KZV+6K6y988j7SSAknv0syn/vctoWbPysmr2VW8tMv+MEBYGKocqdrrRr+8uJeADaVxJdWkPyzEDVMFnCO0USNmWYzzZgYwiIPGtWG3vJZP/xrbyEE3PobHOULx21pwUM=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"26937d2afdd14b59a042ea674dd86c45"}, [
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
  'x-ms-request-id',
  '0e097433-b43a-4253-b8f4-fb6756026b17',
  'x-ms-keyvault-service-version',
  '1.2.164.2',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 16 Feb 2021 19:03:09 GMT',
  'Content-Length',
  '1340'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canretrieveallversionsofacertificate-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canretrieveallversionsofacertificate-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAybprTUZdDeoOLSnChr+zuXBQe2fkOaF6AhDoWa3aJrWECj4kIs8c70ERKcRCN34oSefgq5YBYuhZNiyVX5Q2zkUiOw3rLcA49AtHkIZDhWkYIsozwJFBB4l3E5FatQtTQS7YtIqY46c/EHDbiZPOg4DrsVvgeH0Y5P3Xeot55KuraX25/5EVa5ovICzjNYKc6p0fSflFERHElrmw+DV4I+WQs5Lc0z8qp2prnS0OLrnNYGR4dUXUlug1b2drJ6pRq4M4iFvt1/OZXSUrSsUQ+KmtjLV+rF1DdRBvkNGpfb4MVjK9VR1bVJiybrFtvzsnFbWKMzkELWFyOvRfGJY8HQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAGfvnJmbljGIEKc3S8JGAvX24pJSGtgPu7A7Es45E4U8ciz6mjfbNO503VOpuz1oUhuHadsDzqNc49UaXj6yqH31jgvZmHraxpmh4o0W+c8iC5MjaZ5ys+q5Z6tUeJ99QrlSnVjyEcIufJNxkEQrSi0SFNNatvb6eLNE58KypKCgAP9ME+gqSuQ+STJPFgLxaT8/YHauyM29S5QgwKKWS+KZV+6K6y988j7SSAknv0syn/vctoWbPysmr2VW8tMv+MEBYGKocqdrrRr+8uJeADaVxJdWkPyzEDVMFnCO0USNmWYzzZgYwiIPGtWG3vJZP/xrbyEE3PobHOULx21pwUM=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"26937d2afdd14b59a042ea674dd86c45"}, [
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
  'x-ms-request-id',
  'a424cab3-7dc7-44d7-b8ee-44bdf6cb37e8',
  'x-ms-keyvault-service-version',
  '1.2.164.2',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 16 Feb 2021 19:03:11 GMT',
  'Content-Length',
  '1340'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canretrieveallversionsofacertificate-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canretrieveallversionsofacertificate-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAybprTUZdDeoOLSnChr+zuXBQe2fkOaF6AhDoWa3aJrWECj4kIs8c70ERKcRCN34oSefgq5YBYuhZNiyVX5Q2zkUiOw3rLcA49AtHkIZDhWkYIsozwJFBB4l3E5FatQtTQS7YtIqY46c/EHDbiZPOg4DrsVvgeH0Y5P3Xeot55KuraX25/5EVa5ovICzjNYKc6p0fSflFERHElrmw+DV4I+WQs5Lc0z8qp2prnS0OLrnNYGR4dUXUlug1b2drJ6pRq4M4iFvt1/OZXSUrSsUQ+KmtjLV+rF1DdRBvkNGpfb4MVjK9VR1bVJiybrFtvzsnFbWKMzkELWFyOvRfGJY8HQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAGfvnJmbljGIEKc3S8JGAvX24pJSGtgPu7A7Es45E4U8ciz6mjfbNO503VOpuz1oUhuHadsDzqNc49UaXj6yqH31jgvZmHraxpmh4o0W+c8iC5MjaZ5ys+q5Z6tUeJ99QrlSnVjyEcIufJNxkEQrSi0SFNNatvb6eLNE58KypKCgAP9ME+gqSuQ+STJPFgLxaT8/YHauyM29S5QgwKKWS+KZV+6K6y988j7SSAknv0syn/vctoWbPysmr2VW8tMv+MEBYGKocqdrrRr+8uJeADaVxJdWkPyzEDVMFnCO0USNmWYzzZgYwiIPGtWG3vJZP/xrbyEE3PobHOULx21pwUM=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"26937d2afdd14b59a042ea674dd86c45"}, [
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
  'x-ms-request-id',
  'f06e0758-5581-4e04-b8d4-7a1638c84211',
  'x-ms-keyvault-service-version',
  '1.2.164.2',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 16 Feb 2021 19:03:13 GMT',
  'Content-Length',
  '1340'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canretrieveallversionsofacertificate-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canretrieveallversionsofacertificate-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAybprTUZdDeoOLSnChr+zuXBQe2fkOaF6AhDoWa3aJrWECj4kIs8c70ERKcRCN34oSefgq5YBYuhZNiyVX5Q2zkUiOw3rLcA49AtHkIZDhWkYIsozwJFBB4l3E5FatQtTQS7YtIqY46c/EHDbiZPOg4DrsVvgeH0Y5P3Xeot55KuraX25/5EVa5ovICzjNYKc6p0fSflFERHElrmw+DV4I+WQs5Lc0z8qp2prnS0OLrnNYGR4dUXUlug1b2drJ6pRq4M4iFvt1/OZXSUrSsUQ+KmtjLV+rF1DdRBvkNGpfb4MVjK9VR1bVJiybrFtvzsnFbWKMzkELWFyOvRfGJY8HQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAGfvnJmbljGIEKc3S8JGAvX24pJSGtgPu7A7Es45E4U8ciz6mjfbNO503VOpuz1oUhuHadsDzqNc49UaXj6yqH31jgvZmHraxpmh4o0W+c8iC5MjaZ5ys+q5Z6tUeJ99QrlSnVjyEcIufJNxkEQrSi0SFNNatvb6eLNE58KypKCgAP9ME+gqSuQ+STJPFgLxaT8/YHauyM29S5QgwKKWS+KZV+6K6y988j7SSAknv0syn/vctoWbPysmr2VW8tMv+MEBYGKocqdrrRr+8uJeADaVxJdWkPyzEDVMFnCO0USNmWYzzZgYwiIPGtWG3vJZP/xrbyEE3PobHOULx21pwUM=","cancellation_requested":false,"status":"completed","target":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canretrieveallversionsofacertificate-","request_id":"26937d2afdd14b59a042ea674dd86c45"}, [
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
  '2d40d4ff-533e-47a1-bac0-bc7b378c91f2',
  'x-ms-keyvault-service-version',
  '1.2.164.2',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 16 Feb 2021 19:03:16 GMT',
  'Content-Length',
  '1307'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canretrieveallversionsofacertificate-/')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canretrieveallversionsofacertificate-/9f72cb54d2a84514b5e4cdace5785eba","kid":"https://keyvault_name.vault.azure.net/keys/listCertificateName-canretrieveallversionsofacertificate-/9f72cb54d2a84514b5e4cdace5785eba","sid":"https://keyvault_name.vault.azure.net/secrets/listCertificateName-canretrieveallversionsofacertificate-/9f72cb54d2a84514b5e4cdace5785eba","x5t":"nwj137-BP3zqFld0eGjQfKaCLfs","cer":"MIIDKDCCAhCgAwIBAgIQfQYYx/hASrimvWx5+pIyYzANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjEwMjE2MTg1MzE1WhcNMjIwMjE2MTkwMzE1WjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQDJumtNRl0N6g4tKcKGv7O5cFB7Z+Q5oXoCEOhZrdomtYQKPiQizxzvQREpxEI3fihJ5+CrlgFi6Fk2LJVflDbORSI7DestwDj0C0eQhkOFaRgiyjPAkUEHiXcTkVq1C1NBLti0ipjjpz8QcNuJk86DgOuxW+B4fRjk/dd6i3nkq6tpfbn/kRVrmi8gLOM1gpzqnR9J+UUREcSWubD4NXgj5ZCzktzTPyqnamudLQ4uuc1gZHh1RdSW6DVvZ2snqlGrgziIW+3X85ldJStKxRD4qa2MtX6sXUN1EG+Q0al9vgxWMr1VHVtUmLJusW2/OycVtYozOQQtYXI69F8YljwdAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBS3/lPuhDzuSH9jaxADOg1KerxTHjAdBgNVHQ4EFgQUt/5T7oQ87kh/Y2sQAzoNSnq8Ux4wDQYJKoZIhvcNAQELBQADggEBAIN2kZUr5jlhjCxFViq2h7B7aSYCx/+39J+U6YP+OUNgZttiOwloAm1NFG9CLnlrYu2pOLBM7W7swe5Y+a3sfW5z8VPtcO0vk9N/aFuE8lTgFNXClsppJYLStL/yWVrNXWo0uw5JXdBk4jxXWbaDC8Tt7BBY3K00Z7x5nyfAuna2f0J2jNcaiiyoFZOpljdeDyke28eUJh1mvkklMPIwWiGsD1KP7DuYMqfR/ZO/O8+z2O6n8RHUU5gTWRL49apul+pbzuuDPpG/VMrbrIpLA+atiXL+kU4ugEFcT+W0CFq6Cg6NGcWejXVvrv0AnzAQzoH8qEcguc7BWWP6trTjPvE=","attributes":{"enabled":true,"nbf":1613501595,"exp":1645038195,"created":1613502195,"updated":1613502195,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7},"tags":{"tag":"tag03"},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canretrieveallversionsofacertificate-/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1613502167,"updated":1613502187}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canretrieveallversionsofacertificate-/pending"}}, [
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
  'b329c78e-ec65-4bf1-ae98-ca95790ce99d',
  'x-ms-keyvault-service-version',
  '1.2.164.2',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 16 Feb 2021 19:03:16 GMT',
  'Content-Length',
  '2622'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canretrieveallversionsofacertificate-/versions')
  .query(true)
  .reply(200, {"value":[{"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canretrieveallversionsofacertificate-/3ffc3826f3a34e099fc75c5aab55d60d","x5t":"nssiDh4YsrOGyT3aTmh7uuSQqmE","attributes":{"enabled":true,"nbf":1613501575,"exp":1645038175,"created":1613502175,"updated":1613502175},"tags":{"tag":"tag01"},"subject":""},{"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canretrieveallversionsofacertificate-/9f72cb54d2a84514b5e4cdace5785eba","x5t":"nwj137-BP3zqFld0eGjQfKaCLfs","attributes":{"enabled":true,"nbf":1613501595,"exp":1645038195,"created":1613502195,"updated":1613502195},"tags":{"tag":"tag03"},"subject":""},{"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canretrieveallversionsofacertificate-/fa3db20d19254ec9a0a15b3c8d039173","x5t":"1TpwXUN4FAwAxL3s2pk0of7hLEQ","attributes":{"enabled":true,"nbf":1613501585,"exp":1645038185,"created":1613502186,"updated":1613502186},"tags":{"tag":"tag02"},"subject":""}],"nextLink":null}, [
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
  'fbb02739-7700-45f5-b118-e837cd8dbe67',
  'x-ms-keyvault-service-version',
  '1.2.164.2',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 16 Feb 2021 19:03:16 GMT',
  'Content-Length',
  '1050'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canretrieveallversionsofacertificate-/3ffc3826f3a34e099fc75c5aab55d60d')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canretrieveallversionsofacertificate-/3ffc3826f3a34e099fc75c5aab55d60d","kid":"https://keyvault_name.vault.azure.net/keys/listCertificateName-canretrieveallversionsofacertificate-/3ffc3826f3a34e099fc75c5aab55d60d","sid":"https://keyvault_name.vault.azure.net/secrets/listCertificateName-canretrieveallversionsofacertificate-/3ffc3826f3a34e099fc75c5aab55d60d","x5t":"nssiDh4YsrOGyT3aTmh7uuSQqmE","cer":"MIIDKDCCAhCgAwIBAgIQCQEjT1qZQ665hYQbj9rS9jANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjEwMjE2MTg1MjU1WhcNMjIwMjE2MTkwMjU1WjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQDNvxGDWMUa9kC+S/F+EzuGhe0mUeTzZWMnABW1gSB3whRC3liLyfcrn4huHrJ3pI6ry9j+8nC3pdttZgNUItXURf+jBA/2boZkWJkLbmSAtRa38/YazjaVHg0E/eStzwI+rcS0uDjOgIBL1d3FD+ScZoqb5FCUpMfnQZ+HlfKNYztyMGjOcS/DDWShwOgifSb79vK9PrdjqtIn0Lzt0APTpLUXzOy/3NvE07nXm4GInWoRc+MbUlw1SypMGG+t5ZHyYTNPI6QOuxRRvKUJ6KP54Oyzhwnz3sjrvKf4LnQeonrQrkSiTg5HlTCLN1KMuYULVZ00voXDkvnVFyTphQ7hAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBSPzdY1RKWO4l6cPvqAZPcjkVnd6TAdBgNVHQ4EFgQUj83WNUSljuJenD76gGT3I5FZ3ekwDQYJKoZIhvcNAQELBQADggEBALKr7rjkaHD8DqZG7urf9CwajNoO4EydTlXqqq8DyUEPx4ZTBLFHCsHqGr2EVkPqPMdLijMNiVeC4HetnFZhYIhfQFe/lP1RzcqiiKeUaWUNntTZQB6XkQx8PIexW4vFXXYzgFxk1j2cLNnEOnGBL4Haxxf1JW/5N9N5WhKUN0jqsNWPlK+DWEPs4gFGFXGYVqkxPuLUu60/DxkfANdyS6DA6vQ6ao18tJPCkTYJDS5hpMgUAW6muEK3H3mZ1ww+EbbeciVmiusHt2/qKoFC0fm/fCWYcl8zjZan5aauSCq4bhXFcXkgIGa8/B+bXS15UDbxnrKObxyfnx5yHWiTUnA=","attributes":{"enabled":true,"nbf":1613501575,"exp":1645038175,"created":1613502175,"updated":1613502175,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7},"tags":{"tag":"tag01"},"subject":"CN=MyCert","issuer":"CN=MyCert","sans":{},"serialnumber":"0901234F5A9943AEB985841B8FDAD2F6"}, [
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
  '007ee1a8-4a72-4d92-aeb0-75818781d135',
  'x-ms-keyvault-service-version',
  '1.2.164.2',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 16 Feb 2021 19:03:16 GMT',
  'Content-Length',
  '1904'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canretrieveallversionsofacertificate-/9f72cb54d2a84514b5e4cdace5785eba')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canretrieveallversionsofacertificate-/9f72cb54d2a84514b5e4cdace5785eba","kid":"https://keyvault_name.vault.azure.net/keys/listCertificateName-canretrieveallversionsofacertificate-/9f72cb54d2a84514b5e4cdace5785eba","sid":"https://keyvault_name.vault.azure.net/secrets/listCertificateName-canretrieveallversionsofacertificate-/9f72cb54d2a84514b5e4cdace5785eba","x5t":"nwj137-BP3zqFld0eGjQfKaCLfs","cer":"MIIDKDCCAhCgAwIBAgIQfQYYx/hASrimvWx5+pIyYzANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjEwMjE2MTg1MzE1WhcNMjIwMjE2MTkwMzE1WjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQDJumtNRl0N6g4tKcKGv7O5cFB7Z+Q5oXoCEOhZrdomtYQKPiQizxzvQREpxEI3fihJ5+CrlgFi6Fk2LJVflDbORSI7DestwDj0C0eQhkOFaRgiyjPAkUEHiXcTkVq1C1NBLti0ipjjpz8QcNuJk86DgOuxW+B4fRjk/dd6i3nkq6tpfbn/kRVrmi8gLOM1gpzqnR9J+UUREcSWubD4NXgj5ZCzktzTPyqnamudLQ4uuc1gZHh1RdSW6DVvZ2snqlGrgziIW+3X85ldJStKxRD4qa2MtX6sXUN1EG+Q0al9vgxWMr1VHVtUmLJusW2/OycVtYozOQQtYXI69F8YljwdAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBS3/lPuhDzuSH9jaxADOg1KerxTHjAdBgNVHQ4EFgQUt/5T7oQ87kh/Y2sQAzoNSnq8Ux4wDQYJKoZIhvcNAQELBQADggEBAIN2kZUr5jlhjCxFViq2h7B7aSYCx/+39J+U6YP+OUNgZttiOwloAm1NFG9CLnlrYu2pOLBM7W7swe5Y+a3sfW5z8VPtcO0vk9N/aFuE8lTgFNXClsppJYLStL/yWVrNXWo0uw5JXdBk4jxXWbaDC8Tt7BBY3K00Z7x5nyfAuna2f0J2jNcaiiyoFZOpljdeDyke28eUJh1mvkklMPIwWiGsD1KP7DuYMqfR/ZO/O8+z2O6n8RHUU5gTWRL49apul+pbzuuDPpG/VMrbrIpLA+atiXL+kU4ugEFcT+W0CFq6Cg6NGcWejXVvrv0AnzAQzoH8qEcguc7BWWP6trTjPvE=","attributes":{"enabled":true,"nbf":1613501595,"exp":1645038195,"created":1613502195,"updated":1613502195,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7},"tags":{"tag":"tag03"},"subject":"CN=MyCert","issuer":"CN=MyCert","sans":{},"serialnumber":"7D0618C7F8404AB8A6BD6C79FA923263"}, [
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
  '17eed464-db49-4b4e-a704-c1bdf85c1262',
  'x-ms-keyvault-service-version',
  '1.2.164.2',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 16 Feb 2021 19:03:16 GMT',
  'Content-Length',
  '1904'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canretrieveallversionsofacertificate-/fa3db20d19254ec9a0a15b3c8d039173')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canretrieveallversionsofacertificate-/fa3db20d19254ec9a0a15b3c8d039173","kid":"https://keyvault_name.vault.azure.net/keys/listCertificateName-canretrieveallversionsofacertificate-/fa3db20d19254ec9a0a15b3c8d039173","sid":"https://keyvault_name.vault.azure.net/secrets/listCertificateName-canretrieveallversionsofacertificate-/fa3db20d19254ec9a0a15b3c8d039173","x5t":"1TpwXUN4FAwAxL3s2pk0of7hLEQ","cer":"MIIDKDCCAhCgAwIBAgIQTZztuVXTSvCuKnYBmR54czANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjEwMjE2MTg1MzA1WhcNMjIwMjE2MTkwMzA1WjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQC7kWfHttDZ++dbwyZNaZUJeWy5sdNCEXQLxEq9Eb4NiABEwwKToPl7U33NXbRQsgeMEqgXcB9kI3dtFtFiR8Ept7HT7oTrO4PYyc1nwONf5RpbLgTg3BV4i1uhu9IpJtbSSMpDblGGGbuVMkYQeKl+xOwCnkMRl+8Bry8pdf1621lfI3kTLls0/yZHfRUSJBLYLgNNJtKD0w6ac11N7Ic04YFiHU0dxhwtBU6sK29KDdM8n99f5w/1PFWAdPp2i2TpJJ8RT3UF5LzByERrfACWhaBr4EW/YeXu0xldEi7VCsxAentglijJP4TnBKtkHU1Ldn0zj2+HvMknFXnoKzRVAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBQ0CL8oKtkCNaAUReJLQm4dX0rJwTAdBgNVHQ4EFgQUNAi/KCrZAjWgFEXiS0JuHV9KycEwDQYJKoZIhvcNAQELBQADggEBAJh/ChPjYNlSfpwKLiGY3TFcwcq/8j5+3htVr06k2BO9JvfLICz4Ugk8soOh2xtXMYU99efP82o2fBnMJtiVCVG9i4CblfFKq4f7TUrrfvzZBbz0Rme2eAo25wSKBa8wy14qlBBOihDbJVEgIUkFiamLTrZFr95cV6UTe9uxfJ2xKqT6DHZtwTzns2LG/0GANVA5mViC5rT0PtBtOoVLpZkSdpK6M9d5vLS6czIEhFmA4Viz6pTDLFPoBVigtvytDPiec+65as1oj3Mcn++GLIah/JjQqjGEwMbw0j+ePrkHeNPN/Wh8//PnBMseQ/fncTiGdVNq6yb+zAzMjJPQWj8=","attributes":{"enabled":true,"nbf":1613501585,"exp":1645038185,"created":1613502186,"updated":1613502186,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7},"tags":{"tag":"tag02"},"subject":"CN=MyCert","issuer":"CN=MyCert","sans":{},"serialnumber":"4D9CEDB955D34AF0AE2A7601991E7873"}, [
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
  'c43f2ad6-0543-479b-9d5d-c71ae9e7ecac',
  'x-ms-keyvault-service-version',
  '1.2.164.2',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 16 Feb 2021 19:03:16 GMT',
  'Content-Length',
  '1904'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/certificates/listCertificateName-canretrieveallversionsofacertificate-')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/listCertificateName-canretrieveallversionsofacertificate-","deletedDate":1613502196,"scheduledPurgeDate":1614106996,"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canretrieveallversionsofacertificate-/9f72cb54d2a84514b5e4cdace5785eba","kid":"https://keyvault_name.vault.azure.net/keys/listCertificateName-canretrieveallversionsofacertificate-/9f72cb54d2a84514b5e4cdace5785eba","sid":"https://keyvault_name.vault.azure.net/secrets/listCertificateName-canretrieveallversionsofacertificate-/9f72cb54d2a84514b5e4cdace5785eba","x5t":"nwj137-BP3zqFld0eGjQfKaCLfs","cer":"MIIDKDCCAhCgAwIBAgIQfQYYx/hASrimvWx5+pIyYzANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjEwMjE2MTg1MzE1WhcNMjIwMjE2MTkwMzE1WjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQDJumtNRl0N6g4tKcKGv7O5cFB7Z+Q5oXoCEOhZrdomtYQKPiQizxzvQREpxEI3fihJ5+CrlgFi6Fk2LJVflDbORSI7DestwDj0C0eQhkOFaRgiyjPAkUEHiXcTkVq1C1NBLti0ipjjpz8QcNuJk86DgOuxW+B4fRjk/dd6i3nkq6tpfbn/kRVrmi8gLOM1gpzqnR9J+UUREcSWubD4NXgj5ZCzktzTPyqnamudLQ4uuc1gZHh1RdSW6DVvZ2snqlGrgziIW+3X85ldJStKxRD4qa2MtX6sXUN1EG+Q0al9vgxWMr1VHVtUmLJusW2/OycVtYozOQQtYXI69F8YljwdAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBS3/lPuhDzuSH9jaxADOg1KerxTHjAdBgNVHQ4EFgQUt/5T7oQ87kh/Y2sQAzoNSnq8Ux4wDQYJKoZIhvcNAQELBQADggEBAIN2kZUr5jlhjCxFViq2h7B7aSYCx/+39J+U6YP+OUNgZttiOwloAm1NFG9CLnlrYu2pOLBM7W7swe5Y+a3sfW5z8VPtcO0vk9N/aFuE8lTgFNXClsppJYLStL/yWVrNXWo0uw5JXdBk4jxXWbaDC8Tt7BBY3K00Z7x5nyfAuna2f0J2jNcaiiyoFZOpljdeDyke28eUJh1mvkklMPIwWiGsD1KP7DuYMqfR/ZO/O8+z2O6n8RHUU5gTWRL49apul+pbzuuDPpG/VMrbrIpLA+atiXL+kU4ugEFcT+W0CFq6Cg6NGcWejXVvrv0AnzAQzoH8qEcguc7BWWP6trTjPvE=","attributes":{"enabled":true,"nbf":1613501595,"exp":1645038195,"created":1613502195,"updated":1613502195,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7},"tags":{"tag":"tag03"},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canretrieveallversionsofacertificate-/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1613502167,"updated":1613502187}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canretrieveallversionsofacertificate-/pending"}}, [
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
  '1e7919ac-2f46-4b99-98ee-9ac9a3ade709',
  'x-ms-keyvault-service-version',
  '1.2.164.2',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 16 Feb 2021 19:03:16 GMT',
  'Content-Length',
  '2822'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canretrieveallversionsofacertificate-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canretrieveallversionsofacertificate-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '157',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  'e7cbe9c7-165e-4039-a564-8173e0a2e7d9',
  'x-ms-keyvault-service-version',
  '1.2.164.2',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 16 Feb 2021 19:03:16 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canretrieveallversionsofacertificate-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canretrieveallversionsofacertificate-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '157',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  'f4c83b6f-28b2-47bc-8454-705f527f2d9e',
  'x-ms-keyvault-service-version',
  '1.2.164.2',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 16 Feb 2021 19:03:16 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canretrieveallversionsofacertificate-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canretrieveallversionsofacertificate-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '157',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  '3491e807-dcbb-434f-afe5-d149ffdae556',
  'x-ms-keyvault-service-version',
  '1.2.164.2',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 16 Feb 2021 19:03:18 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canretrieveallversionsofacertificate-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canretrieveallversionsofacertificate-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '157',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  'fd52fcc9-c8ef-4520-ab52-cda41ad1bc5d',
  'x-ms-keyvault-service-version',
  '1.2.164.2',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 16 Feb 2021 19:03:20 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canretrieveallversionsofacertificate-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canretrieveallversionsofacertificate-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '157',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  '068d4c9c-6963-43a6-841c-05824dd598f5',
  'x-ms-keyvault-service-version',
  '1.2.164.2',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 16 Feb 2021 19:03:22 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canretrieveallversionsofacertificate-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canretrieveallversionsofacertificate-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '157',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  '49e172bc-7edd-4a55-8ac3-5750da2fc3ff',
  'x-ms-keyvault-service-version',
  '1.2.164.2',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 16 Feb 2021 19:03:24 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canretrieveallversionsofacertificate-')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/listCertificateName-canretrieveallversionsofacertificate-","deletedDate":1613502196,"scheduledPurgeDate":1614106996,"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canretrieveallversionsofacertificate-/9f72cb54d2a84514b5e4cdace5785eba","kid":"https://keyvault_name.vault.azure.net/keys/listCertificateName-canretrieveallversionsofacertificate-/9f72cb54d2a84514b5e4cdace5785eba","sid":"https://keyvault_name.vault.azure.net/secrets/listCertificateName-canretrieveallversionsofacertificate-/9f72cb54d2a84514b5e4cdace5785eba","x5t":"nwj137-BP3zqFld0eGjQfKaCLfs","cer":"MIIDKDCCAhCgAwIBAgIQfQYYx/hASrimvWx5+pIyYzANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjEwMjE2MTg1MzE1WhcNMjIwMjE2MTkwMzE1WjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQDJumtNRl0N6g4tKcKGv7O5cFB7Z+Q5oXoCEOhZrdomtYQKPiQizxzvQREpxEI3fihJ5+CrlgFi6Fk2LJVflDbORSI7DestwDj0C0eQhkOFaRgiyjPAkUEHiXcTkVq1C1NBLti0ipjjpz8QcNuJk86DgOuxW+B4fRjk/dd6i3nkq6tpfbn/kRVrmi8gLOM1gpzqnR9J+UUREcSWubD4NXgj5ZCzktzTPyqnamudLQ4uuc1gZHh1RdSW6DVvZ2snqlGrgziIW+3X85ldJStKxRD4qa2MtX6sXUN1EG+Q0al9vgxWMr1VHVtUmLJusW2/OycVtYozOQQtYXI69F8YljwdAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBS3/lPuhDzuSH9jaxADOg1KerxTHjAdBgNVHQ4EFgQUt/5T7oQ87kh/Y2sQAzoNSnq8Ux4wDQYJKoZIhvcNAQELBQADggEBAIN2kZUr5jlhjCxFViq2h7B7aSYCx/+39J+U6YP+OUNgZttiOwloAm1NFG9CLnlrYu2pOLBM7W7swe5Y+a3sfW5z8VPtcO0vk9N/aFuE8lTgFNXClsppJYLStL/yWVrNXWo0uw5JXdBk4jxXWbaDC8Tt7BBY3K00Z7x5nyfAuna2f0J2jNcaiiyoFZOpljdeDyke28eUJh1mvkklMPIwWiGsD1KP7DuYMqfR/ZO/O8+z2O6n8RHUU5gTWRL49apul+pbzuuDPpG/VMrbrIpLA+atiXL+kU4ugEFcT+W0CFq6Cg6NGcWejXVvrv0AnzAQzoH8qEcguc7BWWP6trTjPvE=","attributes":{"enabled":true,"nbf":1613501595,"exp":1645038195,"created":1613502195,"updated":1613502195,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7},"tags":{"tag":"tag03"},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canretrieveallversionsofacertificate-/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1613502167,"updated":1613502187}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canretrieveallversionsofacertificate-/pending"}}, [
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
  'a87f0dde-2fe1-4b0b-b899-46e8656197c6',
  'x-ms-keyvault-service-version',
  '1.2.164.2',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 16 Feb 2021 19:03:26 GMT',
  'Content-Length',
  '2822'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedcertificates/listCertificateName-canretrieveallversionsofacertificate-')
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
  'a216167b-3c6f-4724-a4b5-82d958709a75',
  'x-ms-keyvault-service-version',
  '1.2.164.2',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 16 Feb 2021 19:03:26 GMT'
]);

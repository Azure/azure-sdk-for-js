let nock = require('nock');

module.exports.hash = "b203f39c9d58d2806f64bae9192a01b3";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0/create')
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
  'c2f49c8a-86c3-4be5-9439-1171e371f57b',
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
  'Thu, 25 Jun 2020 12:51:18 GMT'
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
  'c301d9b1-65ed-4a78-8b48-5bf6d5d4fd00',
  'x-ms-ests-server',
  '2.1.10732.8 - NCUS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AipJ9goOGdNFtJsM95nHtAs_aSJHAQAAAMaUhtYOAAAA; expires=Sat, 25-Jul-2020 12:51:19 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; SameSite=None; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; SameSite=None; secure; HttpOnly',
  'Date',
  'Thu, 25 Jun 2020 12:51:18 GMT',
  'Content-Length',
  '1315'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0/create', {"policy":{"key_props":{},"secret_props":{},"x509_props":{"subject":"cn=MyCert","sans":{}},"issuer":{"name":"Self"},"attributes":{}},"attributes":{}})
  .query(true)
  .reply(202, {"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAro9pqADLl/+38T/Y8bCnhHr/GztuD4+E8xkFM6R9bm8vHPGR9I1zY83LvmFv7EdqqpBpNLBlBqCL8Z+ePGhAGvQul9CX2BwrUcOJOzh9U7NlXKbHNv/+2UCu4YZeJ+dqrcl1Kb3KS1+swBMFRiF4VCCdQkz4DzaO421dATeF6hIh0re7zJogP/fo+YgyKfEmYDzCN66E9V6clE9DjnfFFnZswtYgkCrlhwqbgRhUEBU9ENFbF0UR4i6TddFiaqWgTXbFGwyov1cWZ7rvXL4mfAY99/vPOOJDIClCfDNtl543zOvH0bIU8t53q4ledZ5SaMQfkWv+H6kHUvAkw2aFBQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAKBmxnWmoKQ+5Os4xYJ2RragJ3/je2epH12H/gZQc6rK6wEGgakL6JpCO0HPFS9H+TbOrVyYXTnGOohwpSKRmNi5evYkHOYbpNPxvShih/D8dE3PVOuZoQS/Y5hNkUXIzhUH1yIzTcRANPZwGDFpncIiYrApk4sl70z1klq+krSnuOCzzSE2Z+5ETRbqWa42+rcQP3A2FNxILjESdCaPZxyJ+FDKM5Kz2nJdap/nTt72EZP6paqdHE00Y+u8XGIApkavWyrTU6DOGWrFOoBBxc4NbYos5Knd4+958BPFsxGv6TkiWtaYaIJZETdUmElT9H7daBFkhGoWhJySNZBT8Zo=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"7cf3a484b69f424a8f0339929b668d4d"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0/pending?api-version=7.1-preview&request_id=7cf3a484b69f424a8f0339929b668d4d',
  'Retry-After',
  '10',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'd5fe4afd-1ac1-4a9b-a934-dcd764d0f3a4',
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
  'Thu, 25 Jun 2020 12:51:19 GMT',
  'Content-Length',
  '1379'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAro9pqADLl/+38T/Y8bCnhHr/GztuD4+E8xkFM6R9bm8vHPGR9I1zY83LvmFv7EdqqpBpNLBlBqCL8Z+ePGhAGvQul9CX2BwrUcOJOzh9U7NlXKbHNv/+2UCu4YZeJ+dqrcl1Kb3KS1+swBMFRiF4VCCdQkz4DzaO421dATeF6hIh0re7zJogP/fo+YgyKfEmYDzCN66E9V6clE9DjnfFFnZswtYgkCrlhwqbgRhUEBU9ENFbF0UR4i6TddFiaqWgTXbFGwyov1cWZ7rvXL4mfAY99/vPOOJDIClCfDNtl543zOvH0bIU8t53q4ledZ5SaMQfkWv+H6kHUvAkw2aFBQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAKBmxnWmoKQ+5Os4xYJ2RragJ3/je2epH12H/gZQc6rK6wEGgakL6JpCO0HPFS9H+TbOrVyYXTnGOohwpSKRmNi5evYkHOYbpNPxvShih/D8dE3PVOuZoQS/Y5hNkUXIzhUH1yIzTcRANPZwGDFpncIiYrApk4sl70z1klq+krSnuOCzzSE2Z+5ETRbqWa42+rcQP3A2FNxILjESdCaPZxyJ+FDKM5Kz2nJdap/nTt72EZP6paqdHE00Y+u8XGIApkavWyrTU6DOGWrFOoBBxc4NbYos5Knd4+958BPFsxGv6TkiWtaYaIJZETdUmElT9H7daBFkhGoWhJySNZBT8Zo=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"7cf3a484b69f424a8f0339929b668d4d"}, [
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
  '7a25fc33-ff33-4d8d-a74f-cc1d45f8cd77',
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
  'Thu, 25 Jun 2020 12:51:19 GMT',
  'Content-Length',
  '1379'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAro9pqADLl/+38T/Y8bCnhHr/GztuD4+E8xkFM6R9bm8vHPGR9I1zY83LvmFv7EdqqpBpNLBlBqCL8Z+ePGhAGvQul9CX2BwrUcOJOzh9U7NlXKbHNv/+2UCu4YZeJ+dqrcl1Kb3KS1+swBMFRiF4VCCdQkz4DzaO421dATeF6hIh0re7zJogP/fo+YgyKfEmYDzCN66E9V6clE9DjnfFFnZswtYgkCrlhwqbgRhUEBU9ENFbF0UR4i6TddFiaqWgTXbFGwyov1cWZ7rvXL4mfAY99/vPOOJDIClCfDNtl543zOvH0bIU8t53q4ledZ5SaMQfkWv+H6kHUvAkw2aFBQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAKBmxnWmoKQ+5Os4xYJ2RragJ3/je2epH12H/gZQc6rK6wEGgakL6JpCO0HPFS9H+TbOrVyYXTnGOohwpSKRmNi5evYkHOYbpNPxvShih/D8dE3PVOuZoQS/Y5hNkUXIzhUH1yIzTcRANPZwGDFpncIiYrApk4sl70z1klq+krSnuOCzzSE2Z+5ETRbqWa42+rcQP3A2FNxILjESdCaPZxyJ+FDKM5Kz2nJdap/nTt72EZP6paqdHE00Y+u8XGIApkavWyrTU6DOGWrFOoBBxc4NbYos5Knd4+958BPFsxGv6TkiWtaYaIJZETdUmElT9H7daBFkhGoWhJySNZBT8Zo=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"7cf3a484b69f424a8f0339929b668d4d"}, [
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
  '69a673fd-7423-4a58-866e-498141749f67',
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
  'Thu, 25 Jun 2020 12:51:19 GMT',
  'Content-Length',
  '1379'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAro9pqADLl/+38T/Y8bCnhHr/GztuD4+E8xkFM6R9bm8vHPGR9I1zY83LvmFv7EdqqpBpNLBlBqCL8Z+ePGhAGvQul9CX2BwrUcOJOzh9U7NlXKbHNv/+2UCu4YZeJ+dqrcl1Kb3KS1+swBMFRiF4VCCdQkz4DzaO421dATeF6hIh0re7zJogP/fo+YgyKfEmYDzCN66E9V6clE9DjnfFFnZswtYgkCrlhwqbgRhUEBU9ENFbF0UR4i6TddFiaqWgTXbFGwyov1cWZ7rvXL4mfAY99/vPOOJDIClCfDNtl543zOvH0bIU8t53q4ledZ5SaMQfkWv+H6kHUvAkw2aFBQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAKBmxnWmoKQ+5Os4xYJ2RragJ3/je2epH12H/gZQc6rK6wEGgakL6JpCO0HPFS9H+TbOrVyYXTnGOohwpSKRmNi5evYkHOYbpNPxvShih/D8dE3PVOuZoQS/Y5hNkUXIzhUH1yIzTcRANPZwGDFpncIiYrApk4sl70z1klq+krSnuOCzzSE2Z+5ETRbqWa42+rcQP3A2FNxILjESdCaPZxyJ+FDKM5Kz2nJdap/nTt72EZP6paqdHE00Y+u8XGIApkavWyrTU6DOGWrFOoBBxc4NbYos5Knd4+958BPFsxGv6TkiWtaYaIJZETdUmElT9H7daBFkhGoWhJySNZBT8Zo=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"7cf3a484b69f424a8f0339929b668d4d"}, [
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
  '38f16e1e-bc98-4e24-84f9-bfc7dbc3aa69',
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
  'Thu, 25 Jun 2020 12:51:21 GMT',
  'Content-Length',
  '1379'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAro9pqADLl/+38T/Y8bCnhHr/GztuD4+E8xkFM6R9bm8vHPGR9I1zY83LvmFv7EdqqpBpNLBlBqCL8Z+ePGhAGvQul9CX2BwrUcOJOzh9U7NlXKbHNv/+2UCu4YZeJ+dqrcl1Kb3KS1+swBMFRiF4VCCdQkz4DzaO421dATeF6hIh0re7zJogP/fo+YgyKfEmYDzCN66E9V6clE9DjnfFFnZswtYgkCrlhwqbgRhUEBU9ENFbF0UR4i6TddFiaqWgTXbFGwyov1cWZ7rvXL4mfAY99/vPOOJDIClCfDNtl543zOvH0bIU8t53q4ledZ5SaMQfkWv+H6kHUvAkw2aFBQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAKBmxnWmoKQ+5Os4xYJ2RragJ3/je2epH12H/gZQc6rK6wEGgakL6JpCO0HPFS9H+TbOrVyYXTnGOohwpSKRmNi5evYkHOYbpNPxvShih/D8dE3PVOuZoQS/Y5hNkUXIzhUH1yIzTcRANPZwGDFpncIiYrApk4sl70z1klq+krSnuOCzzSE2Z+5ETRbqWa42+rcQP3A2FNxILjESdCaPZxyJ+FDKM5Kz2nJdap/nTt72EZP6paqdHE00Y+u8XGIApkavWyrTU6DOGWrFOoBBxc4NbYos5Knd4+958BPFsxGv6TkiWtaYaIJZETdUmElT9H7daBFkhGoWhJySNZBT8Zo=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"7cf3a484b69f424a8f0339929b668d4d"}, [
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
  '7af8b67c-f791-49a1-ad88-443a1932c838',
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
  'Thu, 25 Jun 2020 12:51:24 GMT',
  'Content-Length',
  '1379'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAro9pqADLl/+38T/Y8bCnhHr/GztuD4+E8xkFM6R9bm8vHPGR9I1zY83LvmFv7EdqqpBpNLBlBqCL8Z+ePGhAGvQul9CX2BwrUcOJOzh9U7NlXKbHNv/+2UCu4YZeJ+dqrcl1Kb3KS1+swBMFRiF4VCCdQkz4DzaO421dATeF6hIh0re7zJogP/fo+YgyKfEmYDzCN66E9V6clE9DjnfFFnZswtYgkCrlhwqbgRhUEBU9ENFbF0UR4i6TddFiaqWgTXbFGwyov1cWZ7rvXL4mfAY99/vPOOJDIClCfDNtl543zOvH0bIU8t53q4ledZ5SaMQfkWv+H6kHUvAkw2aFBQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAKBmxnWmoKQ+5Os4xYJ2RragJ3/je2epH12H/gZQc6rK6wEGgakL6JpCO0HPFS9H+TbOrVyYXTnGOohwpSKRmNi5evYkHOYbpNPxvShih/D8dE3PVOuZoQS/Y5hNkUXIzhUH1yIzTcRANPZwGDFpncIiYrApk4sl70z1klq+krSnuOCzzSE2Z+5ETRbqWa42+rcQP3A2FNxILjESdCaPZxyJ+FDKM5Kz2nJdap/nTt72EZP6paqdHE00Y+u8XGIApkavWyrTU6DOGWrFOoBBxc4NbYos5Knd4+958BPFsxGv6TkiWtaYaIJZETdUmElT9H7daBFkhGoWhJySNZBT8Zo=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"7cf3a484b69f424a8f0339929b668d4d"}, [
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
  '989d9a9b-6346-4855-b326-d791aca3507c',
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
  'Thu, 25 Jun 2020 12:51:26 GMT',
  'Content-Length',
  '1379'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAro9pqADLl/+38T/Y8bCnhHr/GztuD4+E8xkFM6R9bm8vHPGR9I1zY83LvmFv7EdqqpBpNLBlBqCL8Z+ePGhAGvQul9CX2BwrUcOJOzh9U7NlXKbHNv/+2UCu4YZeJ+dqrcl1Kb3KS1+swBMFRiF4VCCdQkz4DzaO421dATeF6hIh0re7zJogP/fo+YgyKfEmYDzCN66E9V6clE9DjnfFFnZswtYgkCrlhwqbgRhUEBU9ENFbF0UR4i6TddFiaqWgTXbFGwyov1cWZ7rvXL4mfAY99/vPOOJDIClCfDNtl543zOvH0bIU8t53q4ledZ5SaMQfkWv+H6kHUvAkw2aFBQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAKBmxnWmoKQ+5Os4xYJ2RragJ3/je2epH12H/gZQc6rK6wEGgakL6JpCO0HPFS9H+TbOrVyYXTnGOohwpSKRmNi5evYkHOYbpNPxvShih/D8dE3PVOuZoQS/Y5hNkUXIzhUH1yIzTcRANPZwGDFpncIiYrApk4sl70z1klq+krSnuOCzzSE2Z+5ETRbqWa42+rcQP3A2FNxILjESdCaPZxyJ+FDKM5Kz2nJdap/nTt72EZP6paqdHE00Y+u8XGIApkavWyrTU6DOGWrFOoBBxc4NbYos5Knd4+958BPFsxGv6TkiWtaYaIJZETdUmElT9H7daBFkhGoWhJySNZBT8Zo=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"7cf3a484b69f424a8f0339929b668d4d"}, [
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
  '3ad5f7e9-c81e-4a36-a2bc-9534ac030a11',
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
  'Thu, 25 Jun 2020 12:51:27 GMT',
  'Content-Length',
  '1379'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAro9pqADLl/+38T/Y8bCnhHr/GztuD4+E8xkFM6R9bm8vHPGR9I1zY83LvmFv7EdqqpBpNLBlBqCL8Z+ePGhAGvQul9CX2BwrUcOJOzh9U7NlXKbHNv/+2UCu4YZeJ+dqrcl1Kb3KS1+swBMFRiF4VCCdQkz4DzaO421dATeF6hIh0re7zJogP/fo+YgyKfEmYDzCN66E9V6clE9DjnfFFnZswtYgkCrlhwqbgRhUEBU9ENFbF0UR4i6TddFiaqWgTXbFGwyov1cWZ7rvXL4mfAY99/vPOOJDIClCfDNtl543zOvH0bIU8t53q4ledZ5SaMQfkWv+H6kHUvAkw2aFBQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAKBmxnWmoKQ+5Os4xYJ2RragJ3/je2epH12H/gZQc6rK6wEGgakL6JpCO0HPFS9H+TbOrVyYXTnGOohwpSKRmNi5evYkHOYbpNPxvShih/D8dE3PVOuZoQS/Y5hNkUXIzhUH1yIzTcRANPZwGDFpncIiYrApk4sl70z1klq+krSnuOCzzSE2Z+5ETRbqWa42+rcQP3A2FNxILjESdCaPZxyJ+FDKM5Kz2nJdap/nTt72EZP6paqdHE00Y+u8XGIApkavWyrTU6DOGWrFOoBBxc4NbYos5Knd4+958BPFsxGv6TkiWtaYaIJZETdUmElT9H7daBFkhGoWhJySNZBT8Zo=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"7cf3a484b69f424a8f0339929b668d4d"}, [
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
  '5901dc64-e223-4ec8-8bf5-81cdd592a6e8',
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
  'Thu, 25 Jun 2020 12:51:29 GMT',
  'Content-Length',
  '1379'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAro9pqADLl/+38T/Y8bCnhHr/GztuD4+E8xkFM6R9bm8vHPGR9I1zY83LvmFv7EdqqpBpNLBlBqCL8Z+ePGhAGvQul9CX2BwrUcOJOzh9U7NlXKbHNv/+2UCu4YZeJ+dqrcl1Kb3KS1+swBMFRiF4VCCdQkz4DzaO421dATeF6hIh0re7zJogP/fo+YgyKfEmYDzCN66E9V6clE9DjnfFFnZswtYgkCrlhwqbgRhUEBU9ENFbF0UR4i6TddFiaqWgTXbFGwyov1cWZ7rvXL4mfAY99/vPOOJDIClCfDNtl543zOvH0bIU8t53q4ledZ5SaMQfkWv+H6kHUvAkw2aFBQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAKBmxnWmoKQ+5Os4xYJ2RragJ3/je2epH12H/gZQc6rK6wEGgakL6JpCO0HPFS9H+TbOrVyYXTnGOohwpSKRmNi5evYkHOYbpNPxvShih/D8dE3PVOuZoQS/Y5hNkUXIzhUH1yIzTcRANPZwGDFpncIiYrApk4sl70z1klq+krSnuOCzzSE2Z+5ETRbqWa42+rcQP3A2FNxILjESdCaPZxyJ+FDKM5Kz2nJdap/nTt72EZP6paqdHE00Y+u8XGIApkavWyrTU6DOGWrFOoBBxc4NbYos5Knd4+958BPFsxGv6TkiWtaYaIJZETdUmElT9H7daBFkhGoWhJySNZBT8Zo=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"7cf3a484b69f424a8f0339929b668d4d"}, [
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
  'ec7e34e8-d347-42a3-841c-d7a5dd6e262f',
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
  'Thu, 25 Jun 2020 12:51:31 GMT',
  'Content-Length',
  '1379'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAro9pqADLl/+38T/Y8bCnhHr/GztuD4+E8xkFM6R9bm8vHPGR9I1zY83LvmFv7EdqqpBpNLBlBqCL8Z+ePGhAGvQul9CX2BwrUcOJOzh9U7NlXKbHNv/+2UCu4YZeJ+dqrcl1Kb3KS1+swBMFRiF4VCCdQkz4DzaO421dATeF6hIh0re7zJogP/fo+YgyKfEmYDzCN66E9V6clE9DjnfFFnZswtYgkCrlhwqbgRhUEBU9ENFbF0UR4i6TddFiaqWgTXbFGwyov1cWZ7rvXL4mfAY99/vPOOJDIClCfDNtl543zOvH0bIU8t53q4ledZ5SaMQfkWv+H6kHUvAkw2aFBQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAKBmxnWmoKQ+5Os4xYJ2RragJ3/je2epH12H/gZQc6rK6wEGgakL6JpCO0HPFS9H+TbOrVyYXTnGOohwpSKRmNi5evYkHOYbpNPxvShih/D8dE3PVOuZoQS/Y5hNkUXIzhUH1yIzTcRANPZwGDFpncIiYrApk4sl70z1klq+krSnuOCzzSE2Z+5ETRbqWa42+rcQP3A2FNxILjESdCaPZxyJ+FDKM5Kz2nJdap/nTt72EZP6paqdHE00Y+u8XGIApkavWyrTU6DOGWrFOoBBxc4NbYos5Knd4+958BPFsxGv6TkiWtaYaIJZETdUmElT9H7daBFkhGoWhJySNZBT8Zo=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"7cf3a484b69f424a8f0339929b668d4d"}, [
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
  '55bdd47b-1f00-4756-8229-33f3a0354822',
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
  'Thu, 25 Jun 2020 12:51:34 GMT',
  'Content-Length',
  '1379'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAro9pqADLl/+38T/Y8bCnhHr/GztuD4+E8xkFM6R9bm8vHPGR9I1zY83LvmFv7EdqqpBpNLBlBqCL8Z+ePGhAGvQul9CX2BwrUcOJOzh9U7NlXKbHNv/+2UCu4YZeJ+dqrcl1Kb3KS1+swBMFRiF4VCCdQkz4DzaO421dATeF6hIh0re7zJogP/fo+YgyKfEmYDzCN66E9V6clE9DjnfFFnZswtYgkCrlhwqbgRhUEBU9ENFbF0UR4i6TddFiaqWgTXbFGwyov1cWZ7rvXL4mfAY99/vPOOJDIClCfDNtl543zOvH0bIU8t53q4ledZ5SaMQfkWv+H6kHUvAkw2aFBQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAKBmxnWmoKQ+5Os4xYJ2RragJ3/je2epH12H/gZQc6rK6wEGgakL6JpCO0HPFS9H+TbOrVyYXTnGOohwpSKRmNi5evYkHOYbpNPxvShih/D8dE3PVOuZoQS/Y5hNkUXIzhUH1yIzTcRANPZwGDFpncIiYrApk4sl70z1klq+krSnuOCzzSE2Z+5ETRbqWa42+rcQP3A2FNxILjESdCaPZxyJ+FDKM5Kz2nJdap/nTt72EZP6paqdHE00Y+u8XGIApkavWyrTU6DOGWrFOoBBxc4NbYos5Knd4+958BPFsxGv6TkiWtaYaIJZETdUmElT9H7daBFkhGoWhJySNZBT8Zo=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"7cf3a484b69f424a8f0339929b668d4d"}, [
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
  '5629d1a5-3d5f-4715-ab7d-96cd0f3d630a',
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
  'Thu, 25 Jun 2020 12:51:36 GMT',
  'Content-Length',
  '1379'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAro9pqADLl/+38T/Y8bCnhHr/GztuD4+E8xkFM6R9bm8vHPGR9I1zY83LvmFv7EdqqpBpNLBlBqCL8Z+ePGhAGvQul9CX2BwrUcOJOzh9U7NlXKbHNv/+2UCu4YZeJ+dqrcl1Kb3KS1+swBMFRiF4VCCdQkz4DzaO421dATeF6hIh0re7zJogP/fo+YgyKfEmYDzCN66E9V6clE9DjnfFFnZswtYgkCrlhwqbgRhUEBU9ENFbF0UR4i6TddFiaqWgTXbFGwyov1cWZ7rvXL4mfAY99/vPOOJDIClCfDNtl543zOvH0bIU8t53q4ledZ5SaMQfkWv+H6kHUvAkw2aFBQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAKBmxnWmoKQ+5Os4xYJ2RragJ3/je2epH12H/gZQc6rK6wEGgakL6JpCO0HPFS9H+TbOrVyYXTnGOohwpSKRmNi5evYkHOYbpNPxvShih/D8dE3PVOuZoQS/Y5hNkUXIzhUH1yIzTcRANPZwGDFpncIiYrApk4sl70z1klq+krSnuOCzzSE2Z+5ETRbqWa42+rcQP3A2FNxILjESdCaPZxyJ+FDKM5Kz2nJdap/nTt72EZP6paqdHE00Y+u8XGIApkavWyrTU6DOGWrFOoBBxc4NbYos5Knd4+958BPFsxGv6TkiWtaYaIJZETdUmElT9H7daBFkhGoWhJySNZBT8Zo=","cancellation_requested":false,"status":"completed","target":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0","request_id":"7cf3a484b69f424a8f0339929b668d4d"}, [
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
  'd44244a6-ecd6-4937-8dbb-02541383aaf5',
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
  'Thu, 25 Jun 2020 12:51:39 GMT',
  'Content-Length',
  '1385'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0/')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0/f5620a57dbb34f86a831868364841326","kid":"https://keyvault_name.vault.azure.net/keys/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0/f5620a57dbb34f86a831868364841326","sid":"https://keyvault_name.vault.azure.net/secrets/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0/f5620a57dbb34f86a831868364841326","x5t":"MbqbG9ZFNADyxWiWXcDe0TCDg6g","cer":"MIIDKDCCAhCgAwIBAgIQVrjx4KV/T7eoFTTDjWFQcDANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjAwNjI1MTI0MTM2WhcNMjEwNjI1MTI1MTM2WjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQCuj2moAMuX/7fxP9jxsKeEev8bO24Pj4TzGQUzpH1uby8c8ZH0jXNjzcu+YW/sR2qqkGk0sGUGoIvxn548aEAa9C6X0JfYHCtRw4k7OH1Ts2Vcpsc2//7ZQK7hhl4n52qtyXUpvcpLX6zAEwVGIXhUIJ1CTPgPNo7jbV0BN4XqEiHSt7vMmiA/9+j5iDIp8SZgPMI3roT1XpyUT0OOd8UWdmzC1iCQKuWHCpuBGFQQFT0Q0VsXRRHiLpN10WJqpaBNdsUbDKi/VxZnuu9cviZ8Bj33+8844kMgKUJ8M22XnjfM68fRshTy3neriV51nlJoxB+Ra/4fqQdS8CTDZoUFAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBTtvTu1s9+6Z7bmotpulbF08H4n1zAdBgNVHQ4EFgQU7b07tbPfume25qLabpWxdPB+J9cwDQYJKoZIhvcNAQELBQADggEBAH7kGKlIQS0pxTudehgoEgXTa3dG09/MRMDHav2nq2c+l8VGVi3EBqoAc2yI+0+f4mK1gmfJ48e/WtabdsU+DGg94EaSakmdeSGGBcIK4HUrDxyfeUS8k6MJehaMNjziFsNI5kAtRJ91ByjC+zg2RPusBvnSBQeERuc6K3kiYvpFlFLG8pGZUOcKNv++sq8njwuHn4qPhW77m0cQu3Vc1RTiyZGjIK4eBL5O+YmIg/1Hyib0H4iZuSTAU5H5P/Jvtc6iD7s7eLlgFWRJipcv+7b9uOJ6L6Oy80603d6O9ZmnImFsLViwRiVcssv+kyYO9cWUnmZ368RnEYcJzhu5EDo=","attributes":{"enabled":true,"nbf":1593088896,"exp":1624625496,"created":1593089497,"updated":1593089497,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1593089479,"updated":1593089479}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0/pending"}}, [
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
  '6677f95f-8855-4521-af03-bb0463593dab',
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
  'Thu, 25 Jun 2020 12:51:39 GMT',
  'Content-Length',
  '2785'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1/create', {"policy":{"key_props":{},"secret_props":{},"x509_props":{"subject":"cn=MyCert","sans":{}},"issuer":{"name":"Self"},"attributes":{}},"attributes":{}})
  .query(true)
  .reply(202, {"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA3ptOPBFOW6wcCC/kJkB2kirhmlnMZMTNEFqKD01q0qT3xq7uoL8jkgXPMZ06XfTb9daWmdlCmOT9S4jpJHNR7RfpA6LJ0sRRR4lYN2+Vokr+acPUEqJMFEHBy7PaeM3kf+VYFyCatLlLB0Sa9dVKJ0ZNJSVMxrdW4whMU4LDEbbKklD6dCxh9dYrzj7aeRyDMBlM4RFiUudpeElVImRl3e54Ro72gbVKGAoW5HuSvj1S69ECCc4atduHrCaA+fpGMraGVQjmaTWxUWs7PsJ3vpbXUoSNtXdAMNZJQyZHEz7Ys6VKkkOyJJpvqA5SDALGq8s+AuKhu+O8WWleVNrSuQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBANFKtQzblqR2PXvBWjevcn9f9TifXJyUorlm4sFW9/UKVQ36og0RhcVoFwD9+RDfKt1ZKT949akXWgQuCSFwjxCX6j+fZxG8XWdXBtfSuYqPqv0ghAjuvUJrGgtwg7L9NZLEoyyzdH48ephrZEPeD54QipQFo1vf7s6yAUFlB/qSBF0jZRi/nZskrkmQnQf9E6mM96ZeFJeF/vxyrICToUxgmGPkENGt2JBAfxtSbEqFfIX90pUju93eTXJEq4u8SnArQ35v9973zB13aJlL+DZOGl0MkmKhtsmVDulTRnrkrC3+/gbyRvJnoUoGfQ194+VRahd32Xr0ujJojhj3ziE=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"e922b473950348d892d35f72dbe561da"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1/pending?api-version=7.1-preview&request_id=e922b473950348d892d35f72dbe561da',
  'Retry-After',
  '10',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '379161d5-bd62-494e-aa53-6b001dd56bb4',
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
  'Thu, 25 Jun 2020 12:51:39 GMT',
  'Content-Length',
  '1379'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA3ptOPBFOW6wcCC/kJkB2kirhmlnMZMTNEFqKD01q0qT3xq7uoL8jkgXPMZ06XfTb9daWmdlCmOT9S4jpJHNR7RfpA6LJ0sRRR4lYN2+Vokr+acPUEqJMFEHBy7PaeM3kf+VYFyCatLlLB0Sa9dVKJ0ZNJSVMxrdW4whMU4LDEbbKklD6dCxh9dYrzj7aeRyDMBlM4RFiUudpeElVImRl3e54Ro72gbVKGAoW5HuSvj1S69ECCc4atduHrCaA+fpGMraGVQjmaTWxUWs7PsJ3vpbXUoSNtXdAMNZJQyZHEz7Ys6VKkkOyJJpvqA5SDALGq8s+AuKhu+O8WWleVNrSuQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBANFKtQzblqR2PXvBWjevcn9f9TifXJyUorlm4sFW9/UKVQ36og0RhcVoFwD9+RDfKt1ZKT949akXWgQuCSFwjxCX6j+fZxG8XWdXBtfSuYqPqv0ghAjuvUJrGgtwg7L9NZLEoyyzdH48ephrZEPeD54QipQFo1vf7s6yAUFlB/qSBF0jZRi/nZskrkmQnQf9E6mM96ZeFJeF/vxyrICToUxgmGPkENGt2JBAfxtSbEqFfIX90pUju93eTXJEq4u8SnArQ35v9973zB13aJlL+DZOGl0MkmKhtsmVDulTRnrkrC3+/gbyRvJnoUoGfQ194+VRahd32Xr0ujJojhj3ziE=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"e922b473950348d892d35f72dbe561da"}, [
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
  '84ac36bf-fc55-416d-ad52-5634f93a88f7',
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
  'Thu, 25 Jun 2020 12:51:39 GMT',
  'Content-Length',
  '1379'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA3ptOPBFOW6wcCC/kJkB2kirhmlnMZMTNEFqKD01q0qT3xq7uoL8jkgXPMZ06XfTb9daWmdlCmOT9S4jpJHNR7RfpA6LJ0sRRR4lYN2+Vokr+acPUEqJMFEHBy7PaeM3kf+VYFyCatLlLB0Sa9dVKJ0ZNJSVMxrdW4whMU4LDEbbKklD6dCxh9dYrzj7aeRyDMBlM4RFiUudpeElVImRl3e54Ro72gbVKGAoW5HuSvj1S69ECCc4atduHrCaA+fpGMraGVQjmaTWxUWs7PsJ3vpbXUoSNtXdAMNZJQyZHEz7Ys6VKkkOyJJpvqA5SDALGq8s+AuKhu+O8WWleVNrSuQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBANFKtQzblqR2PXvBWjevcn9f9TifXJyUorlm4sFW9/UKVQ36og0RhcVoFwD9+RDfKt1ZKT949akXWgQuCSFwjxCX6j+fZxG8XWdXBtfSuYqPqv0ghAjuvUJrGgtwg7L9NZLEoyyzdH48ephrZEPeD54QipQFo1vf7s6yAUFlB/qSBF0jZRi/nZskrkmQnQf9E6mM96ZeFJeF/vxyrICToUxgmGPkENGt2JBAfxtSbEqFfIX90pUju93eTXJEq4u8SnArQ35v9973zB13aJlL+DZOGl0MkmKhtsmVDulTRnrkrC3+/gbyRvJnoUoGfQ194+VRahd32Xr0ujJojhj3ziE=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"e922b473950348d892d35f72dbe561da"}, [
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
  '80d51c5d-8ceb-4868-8f55-e6184a9acb58',
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
  'Thu, 25 Jun 2020 12:51:39 GMT',
  'Content-Length',
  '1379'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA3ptOPBFOW6wcCC/kJkB2kirhmlnMZMTNEFqKD01q0qT3xq7uoL8jkgXPMZ06XfTb9daWmdlCmOT9S4jpJHNR7RfpA6LJ0sRRR4lYN2+Vokr+acPUEqJMFEHBy7PaeM3kf+VYFyCatLlLB0Sa9dVKJ0ZNJSVMxrdW4whMU4LDEbbKklD6dCxh9dYrzj7aeRyDMBlM4RFiUudpeElVImRl3e54Ro72gbVKGAoW5HuSvj1S69ECCc4atduHrCaA+fpGMraGVQjmaTWxUWs7PsJ3vpbXUoSNtXdAMNZJQyZHEz7Ys6VKkkOyJJpvqA5SDALGq8s+AuKhu+O8WWleVNrSuQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBANFKtQzblqR2PXvBWjevcn9f9TifXJyUorlm4sFW9/UKVQ36og0RhcVoFwD9+RDfKt1ZKT949akXWgQuCSFwjxCX6j+fZxG8XWdXBtfSuYqPqv0ghAjuvUJrGgtwg7L9NZLEoyyzdH48ephrZEPeD54QipQFo1vf7s6yAUFlB/qSBF0jZRi/nZskrkmQnQf9E6mM96ZeFJeF/vxyrICToUxgmGPkENGt2JBAfxtSbEqFfIX90pUju93eTXJEq4u8SnArQ35v9973zB13aJlL+DZOGl0MkmKhtsmVDulTRnrkrC3+/gbyRvJnoUoGfQ194+VRahd32Xr0ujJojhj3ziE=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"e922b473950348d892d35f72dbe561da"}, [
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
  '09e8fea4-8db1-4cbb-a8eb-12b70df157b2',
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
  'Thu, 25 Jun 2020 12:51:41 GMT',
  'Content-Length',
  '1379'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA3ptOPBFOW6wcCC/kJkB2kirhmlnMZMTNEFqKD01q0qT3xq7uoL8jkgXPMZ06XfTb9daWmdlCmOT9S4jpJHNR7RfpA6LJ0sRRR4lYN2+Vokr+acPUEqJMFEHBy7PaeM3kf+VYFyCatLlLB0Sa9dVKJ0ZNJSVMxrdW4whMU4LDEbbKklD6dCxh9dYrzj7aeRyDMBlM4RFiUudpeElVImRl3e54Ro72gbVKGAoW5HuSvj1S69ECCc4atduHrCaA+fpGMraGVQjmaTWxUWs7PsJ3vpbXUoSNtXdAMNZJQyZHEz7Ys6VKkkOyJJpvqA5SDALGq8s+AuKhu+O8WWleVNrSuQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBANFKtQzblqR2PXvBWjevcn9f9TifXJyUorlm4sFW9/UKVQ36og0RhcVoFwD9+RDfKt1ZKT949akXWgQuCSFwjxCX6j+fZxG8XWdXBtfSuYqPqv0ghAjuvUJrGgtwg7L9NZLEoyyzdH48ephrZEPeD54QipQFo1vf7s6yAUFlB/qSBF0jZRi/nZskrkmQnQf9E6mM96ZeFJeF/vxyrICToUxgmGPkENGt2JBAfxtSbEqFfIX90pUju93eTXJEq4u8SnArQ35v9973zB13aJlL+DZOGl0MkmKhtsmVDulTRnrkrC3+/gbyRvJnoUoGfQ194+VRahd32Xr0ujJojhj3ziE=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"e922b473950348d892d35f72dbe561da"}, [
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
  'defb5203-5ea9-40f0-9fe5-158736273185',
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
  'Thu, 25 Jun 2020 12:51:43 GMT',
  'Content-Length',
  '1379'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA3ptOPBFOW6wcCC/kJkB2kirhmlnMZMTNEFqKD01q0qT3xq7uoL8jkgXPMZ06XfTb9daWmdlCmOT9S4jpJHNR7RfpA6LJ0sRRR4lYN2+Vokr+acPUEqJMFEHBy7PaeM3kf+VYFyCatLlLB0Sa9dVKJ0ZNJSVMxrdW4whMU4LDEbbKklD6dCxh9dYrzj7aeRyDMBlM4RFiUudpeElVImRl3e54Ro72gbVKGAoW5HuSvj1S69ECCc4atduHrCaA+fpGMraGVQjmaTWxUWs7PsJ3vpbXUoSNtXdAMNZJQyZHEz7Ys6VKkkOyJJpvqA5SDALGq8s+AuKhu+O8WWleVNrSuQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBANFKtQzblqR2PXvBWjevcn9f9TifXJyUorlm4sFW9/UKVQ36og0RhcVoFwD9+RDfKt1ZKT949akXWgQuCSFwjxCX6j+fZxG8XWdXBtfSuYqPqv0ghAjuvUJrGgtwg7L9NZLEoyyzdH48ephrZEPeD54QipQFo1vf7s6yAUFlB/qSBF0jZRi/nZskrkmQnQf9E6mM96ZeFJeF/vxyrICToUxgmGPkENGt2JBAfxtSbEqFfIX90pUju93eTXJEq4u8SnArQ35v9973zB13aJlL+DZOGl0MkmKhtsmVDulTRnrkrC3+/gbyRvJnoUoGfQ194+VRahd32Xr0ujJojhj3ziE=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"e922b473950348d892d35f72dbe561da"}, [
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
  '19193dea-c938-48c6-adb1-052135cb7e82',
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
  'Thu, 25 Jun 2020 12:51:45 GMT',
  'Content-Length',
  '1379'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA3ptOPBFOW6wcCC/kJkB2kirhmlnMZMTNEFqKD01q0qT3xq7uoL8jkgXPMZ06XfTb9daWmdlCmOT9S4jpJHNR7RfpA6LJ0sRRR4lYN2+Vokr+acPUEqJMFEHBy7PaeM3kf+VYFyCatLlLB0Sa9dVKJ0ZNJSVMxrdW4whMU4LDEbbKklD6dCxh9dYrzj7aeRyDMBlM4RFiUudpeElVImRl3e54Ro72gbVKGAoW5HuSvj1S69ECCc4atduHrCaA+fpGMraGVQjmaTWxUWs7PsJ3vpbXUoSNtXdAMNZJQyZHEz7Ys6VKkkOyJJpvqA5SDALGq8s+AuKhu+O8WWleVNrSuQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBANFKtQzblqR2PXvBWjevcn9f9TifXJyUorlm4sFW9/UKVQ36og0RhcVoFwD9+RDfKt1ZKT949akXWgQuCSFwjxCX6j+fZxG8XWdXBtfSuYqPqv0ghAjuvUJrGgtwg7L9NZLEoyyzdH48ephrZEPeD54QipQFo1vf7s6yAUFlB/qSBF0jZRi/nZskrkmQnQf9E6mM96ZeFJeF/vxyrICToUxgmGPkENGt2JBAfxtSbEqFfIX90pUju93eTXJEq4u8SnArQ35v9973zB13aJlL+DZOGl0MkmKhtsmVDulTRnrkrC3+/gbyRvJnoUoGfQ194+VRahd32Xr0ujJojhj3ziE=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"e922b473950348d892d35f72dbe561da"}, [
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
  '50f4d411-c001-4abc-a0f3-4c83169cfdf0',
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
  'Thu, 25 Jun 2020 12:51:48 GMT',
  'Content-Length',
  '1379'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA3ptOPBFOW6wcCC/kJkB2kirhmlnMZMTNEFqKD01q0qT3xq7uoL8jkgXPMZ06XfTb9daWmdlCmOT9S4jpJHNR7RfpA6LJ0sRRR4lYN2+Vokr+acPUEqJMFEHBy7PaeM3kf+VYFyCatLlLB0Sa9dVKJ0ZNJSVMxrdW4whMU4LDEbbKklD6dCxh9dYrzj7aeRyDMBlM4RFiUudpeElVImRl3e54Ro72gbVKGAoW5HuSvj1S69ECCc4atduHrCaA+fpGMraGVQjmaTWxUWs7PsJ3vpbXUoSNtXdAMNZJQyZHEz7Ys6VKkkOyJJpvqA5SDALGq8s+AuKhu+O8WWleVNrSuQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBANFKtQzblqR2PXvBWjevcn9f9TifXJyUorlm4sFW9/UKVQ36og0RhcVoFwD9+RDfKt1ZKT949akXWgQuCSFwjxCX6j+fZxG8XWdXBtfSuYqPqv0ghAjuvUJrGgtwg7L9NZLEoyyzdH48ephrZEPeD54QipQFo1vf7s6yAUFlB/qSBF0jZRi/nZskrkmQnQf9E6mM96ZeFJeF/vxyrICToUxgmGPkENGt2JBAfxtSbEqFfIX90pUju93eTXJEq4u8SnArQ35v9973zB13aJlL+DZOGl0MkmKhtsmVDulTRnrkrC3+/gbyRvJnoUoGfQ194+VRahd32Xr0ujJojhj3ziE=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"e922b473950348d892d35f72dbe561da"}, [
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
  'e51327f9-514a-4f99-a33b-7ce56f9d2b13',
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
  'Thu, 25 Jun 2020 12:51:50 GMT',
  'Content-Length',
  '1379'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA3ptOPBFOW6wcCC/kJkB2kirhmlnMZMTNEFqKD01q0qT3xq7uoL8jkgXPMZ06XfTb9daWmdlCmOT9S4jpJHNR7RfpA6LJ0sRRR4lYN2+Vokr+acPUEqJMFEHBy7PaeM3kf+VYFyCatLlLB0Sa9dVKJ0ZNJSVMxrdW4whMU4LDEbbKklD6dCxh9dYrzj7aeRyDMBlM4RFiUudpeElVImRl3e54Ro72gbVKGAoW5HuSvj1S69ECCc4atduHrCaA+fpGMraGVQjmaTWxUWs7PsJ3vpbXUoSNtXdAMNZJQyZHEz7Ys6VKkkOyJJpvqA5SDALGq8s+AuKhu+O8WWleVNrSuQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBANFKtQzblqR2PXvBWjevcn9f9TifXJyUorlm4sFW9/UKVQ36og0RhcVoFwD9+RDfKt1ZKT949akXWgQuCSFwjxCX6j+fZxG8XWdXBtfSuYqPqv0ghAjuvUJrGgtwg7L9NZLEoyyzdH48ephrZEPeD54QipQFo1vf7s6yAUFlB/qSBF0jZRi/nZskrkmQnQf9E6mM96ZeFJeF/vxyrICToUxgmGPkENGt2JBAfxtSbEqFfIX90pUju93eTXJEq4u8SnArQ35v9973zB13aJlL+DZOGl0MkmKhtsmVDulTRnrkrC3+/gbyRvJnoUoGfQ194+VRahd32Xr0ujJojhj3ziE=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"e922b473950348d892d35f72dbe561da"}, [
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
  'c156fb57-7544-487a-9b03-30c0acaa49e3',
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
  'Thu, 25 Jun 2020 12:51:51 GMT',
  'Content-Length',
  '1379'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA3ptOPBFOW6wcCC/kJkB2kirhmlnMZMTNEFqKD01q0qT3xq7uoL8jkgXPMZ06XfTb9daWmdlCmOT9S4jpJHNR7RfpA6LJ0sRRR4lYN2+Vokr+acPUEqJMFEHBy7PaeM3kf+VYFyCatLlLB0Sa9dVKJ0ZNJSVMxrdW4whMU4LDEbbKklD6dCxh9dYrzj7aeRyDMBlM4RFiUudpeElVImRl3e54Ro72gbVKGAoW5HuSvj1S69ECCc4atduHrCaA+fpGMraGVQjmaTWxUWs7PsJ3vpbXUoSNtXdAMNZJQyZHEz7Ys6VKkkOyJJpvqA5SDALGq8s+AuKhu+O8WWleVNrSuQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBANFKtQzblqR2PXvBWjevcn9f9TifXJyUorlm4sFW9/UKVQ36og0RhcVoFwD9+RDfKt1ZKT949akXWgQuCSFwjxCX6j+fZxG8XWdXBtfSuYqPqv0ghAjuvUJrGgtwg7L9NZLEoyyzdH48ephrZEPeD54QipQFo1vf7s6yAUFlB/qSBF0jZRi/nZskrkmQnQf9E6mM96ZeFJeF/vxyrICToUxgmGPkENGt2JBAfxtSbEqFfIX90pUju93eTXJEq4u8SnArQ35v9973zB13aJlL+DZOGl0MkmKhtsmVDulTRnrkrC3+/gbyRvJnoUoGfQ194+VRahd32Xr0ujJojhj3ziE=","cancellation_requested":false,"status":"completed","target":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1","request_id":"e922b473950348d892d35f72dbe561da"}, [
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
  '3eab6539-1a18-4765-a777-efe4217a0ba5',
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
  'Thu, 25 Jun 2020 12:51:53 GMT',
  'Content-Length',
  '1385'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1/')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1/f33a18926fbb4ddeaa9461dae8477fc6","kid":"https://keyvault_name.vault.azure.net/keys/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1/f33a18926fbb4ddeaa9461dae8477fc6","sid":"https://keyvault_name.vault.azure.net/secrets/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1/f33a18926fbb4ddeaa9461dae8477fc6","x5t":"3B9pl5MjIPAr9Xel8oV0y4IsMUc","cer":"MIIDKDCCAhCgAwIBAgIQEt2NdWI8RY+f9VP/lfhr7TANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjAwNjI1MTI0MTUyWhcNMjEwNjI1MTI1MTUyWjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQDem048EU5brBwIL+QmQHaSKuGaWcxkxM0QWooPTWrSpPfGru6gvyOSBc8xnTpd9Nv11paZ2UKY5P1LiOkkc1HtF+kDosnSxFFHiVg3b5WiSv5pw9QSokwUQcHLs9p4zeR/5VgXIJq0uUsHRJr11UonRk0lJUzGt1bjCExTgsMRtsqSUPp0LGH11ivOPtp5HIMwGUzhEWJS52l4SVUiZGXd7nhGjvaBtUoYChbke5K+PVLr0QIJzhq124esJoD5+kYytoZVCOZpNbFRazs+wne+ltdShI21d0Aw1klDJkcTPtizpUqSQ7Ikmm+oDlIMAsaryz4C4qG747xZaV5U2tK5AgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBS5dLd5lJEz3ISP64/QoE05V+kM8jAdBgNVHQ4EFgQUuXS3eZSRM9yEj+uP0KBNOVfpDPIwDQYJKoZIhvcNAQELBQADggEBAN0/t6wkfIvZAyyqW1iLiRqrp7PrmRuF0HU+ycAGdf3p8wH71Zd/u6YTrAxVYjNideGda5qgWZ6Vn7rPNDLta9/4pKObsfpmlQKo5jvGRiv0lHPuWhdnKypHt+XpatXN67QuSmIrOJ68RtTgpQEk5KYy1kqMf0oOagesPqCQyDlVaJjGxZ56pz0i7JL8fiCgARM4We+CdRzwkd6QfaYRq9p0VLbcyBp7yhCVGUxuP4s7evF9vIvt+kk3sNuQCHz+Ykv4kuolgKgrtk2zTBBwP7V6A2RKluhYD3YVlEKyox8Z8ZUGBqnrfgqNIDQnrwszItjCP23XHEJQ/PJJVd43h0o=","attributes":{"enabled":true,"nbf":1593088912,"exp":1624625512,"created":1593089513,"updated":1593089513,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1593089499,"updated":1593089499}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1/pending"}}, [
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
  'b7fb45ad-eb3a-4043-ada5-51294ed489bd',
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
  'Thu, 25 Jun 2020 12:51:53 GMT',
  'Content-Length',
  '2785'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0","deletedDate":1593089514,"scheduledPurgeDate":1600865514,"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0/f5620a57dbb34f86a831868364841326","kid":"https://keyvault_name.vault.azure.net/keys/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0/f5620a57dbb34f86a831868364841326","sid":"https://keyvault_name.vault.azure.net/secrets/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0/f5620a57dbb34f86a831868364841326","x5t":"MbqbG9ZFNADyxWiWXcDe0TCDg6g","cer":"MIIDKDCCAhCgAwIBAgIQVrjx4KV/T7eoFTTDjWFQcDANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjAwNjI1MTI0MTM2WhcNMjEwNjI1MTI1MTM2WjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQCuj2moAMuX/7fxP9jxsKeEev8bO24Pj4TzGQUzpH1uby8c8ZH0jXNjzcu+YW/sR2qqkGk0sGUGoIvxn548aEAa9C6X0JfYHCtRw4k7OH1Ts2Vcpsc2//7ZQK7hhl4n52qtyXUpvcpLX6zAEwVGIXhUIJ1CTPgPNo7jbV0BN4XqEiHSt7vMmiA/9+j5iDIp8SZgPMI3roT1XpyUT0OOd8UWdmzC1iCQKuWHCpuBGFQQFT0Q0VsXRRHiLpN10WJqpaBNdsUbDKi/VxZnuu9cviZ8Bj33+8844kMgKUJ8M22XnjfM68fRshTy3neriV51nlJoxB+Ra/4fqQdS8CTDZoUFAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBTtvTu1s9+6Z7bmotpulbF08H4n1zAdBgNVHQ4EFgQU7b07tbPfume25qLabpWxdPB+J9cwDQYJKoZIhvcNAQELBQADggEBAH7kGKlIQS0pxTudehgoEgXTa3dG09/MRMDHav2nq2c+l8VGVi3EBqoAc2yI+0+f4mK1gmfJ48e/WtabdsU+DGg94EaSakmdeSGGBcIK4HUrDxyfeUS8k6MJehaMNjziFsNI5kAtRJ91ByjC+zg2RPusBvnSBQeERuc6K3kiYvpFlFLG8pGZUOcKNv++sq8njwuHn4qPhW77m0cQu3Vc1RTiyZGjIK4eBL5O+YmIg/1Hyib0H4iZuSTAU5H5P/Jvtc6iD7s7eLlgFWRJipcv+7b9uOJ6L6Oy80603d6O9ZmnImFsLViwRiVcssv+kyYO9cWUnmZ368RnEYcJzhu5EDo=","attributes":{"enabled":true,"nbf":1593088896,"exp":1624625496,"created":1593089497,"updated":1593089497,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1593089479,"updated":1593089479}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0/pending"}}, [
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
  'e9a37fa1-5fe4-4a60-8316-0a60f731eabb',
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
  'Thu, 25 Jun 2020 12:51:55 GMT',
  'Content-Length',
  '3024'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '187',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '100da08c-9392-4770-b383-f32183e85a6a',
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
  'Thu, 25 Jun 2020 12:51:55 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '187',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'cda49568-97d8-48c2-9edd-81a28aba71ca',
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
  'Thu, 25 Jun 2020 12:51:55 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '187',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '9fba00a7-f19c-40e7-b7e0-3bdb0855f004',
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
  'Thu, 25 Jun 2020 12:51:57 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '187',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '9fdde548-e849-4eb2-a69b-6f10cf287c56',
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
  'Thu, 25 Jun 2020 12:51:58 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '187',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '0e5b6e17-c6cf-4830-9ced-1beb0e38f625',
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
  'Thu, 25 Jun 2020 12:52:01 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '187',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '09bf83f9-9829-456c-b511-079f8fa09e7f',
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
  'Thu, 25 Jun 2020 12:52:03 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '187',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'c01b426e-ed93-4e3d-ba4e-02e9e67acd72',
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
  'Thu, 25 Jun 2020 12:52:05 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '187',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '42b24ba2-410a-41d6-b39f-79718311731b',
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
  'Thu, 25 Jun 2020 12:52:07 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0","deletedDate":1593089514,"scheduledPurgeDate":1600865514,"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0/f5620a57dbb34f86a831868364841326","kid":"https://keyvault_name.vault.azure.net/keys/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0/f5620a57dbb34f86a831868364841326","sid":"https://keyvault_name.vault.azure.net/secrets/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0/f5620a57dbb34f86a831868364841326","x5t":"MbqbG9ZFNADyxWiWXcDe0TCDg6g","cer":"MIIDKDCCAhCgAwIBAgIQVrjx4KV/T7eoFTTDjWFQcDANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjAwNjI1MTI0MTM2WhcNMjEwNjI1MTI1MTM2WjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQCuj2moAMuX/7fxP9jxsKeEev8bO24Pj4TzGQUzpH1uby8c8ZH0jXNjzcu+YW/sR2qqkGk0sGUGoIvxn548aEAa9C6X0JfYHCtRw4k7OH1Ts2Vcpsc2//7ZQK7hhl4n52qtyXUpvcpLX6zAEwVGIXhUIJ1CTPgPNo7jbV0BN4XqEiHSt7vMmiA/9+j5iDIp8SZgPMI3roT1XpyUT0OOd8UWdmzC1iCQKuWHCpuBGFQQFT0Q0VsXRRHiLpN10WJqpaBNdsUbDKi/VxZnuu9cviZ8Bj33+8844kMgKUJ8M22XnjfM68fRshTy3neriV51nlJoxB+Ra/4fqQdS8CTDZoUFAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBTtvTu1s9+6Z7bmotpulbF08H4n1zAdBgNVHQ4EFgQU7b07tbPfume25qLabpWxdPB+J9cwDQYJKoZIhvcNAQELBQADggEBAH7kGKlIQS0pxTudehgoEgXTa3dG09/MRMDHav2nq2c+l8VGVi3EBqoAc2yI+0+f4mK1gmfJ48e/WtabdsU+DGg94EaSakmdeSGGBcIK4HUrDxyfeUS8k6MJehaMNjziFsNI5kAtRJ91ByjC+zg2RPusBvnSBQeERuc6K3kiYvpFlFLG8pGZUOcKNv++sq8njwuHn4qPhW77m0cQu3Vc1RTiyZGjIK4eBL5O+YmIg/1Hyib0H4iZuSTAU5H5P/Jvtc6iD7s7eLlgFWRJipcv+7b9uOJ6L6Oy80603d6O9ZmnImFsLViwRiVcssv+kyYO9cWUnmZ368RnEYcJzhu5EDo=","attributes":{"enabled":true,"nbf":1593088896,"exp":1624625496,"created":1593089497,"updated":1593089497,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1593089479,"updated":1593089479}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0/pending"}}, [
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
  'd70dd821-1dee-410b-bd40-1d61c346b45d',
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
  'Thu, 25 Jun 2020 12:52:09 GMT',
  'Content-Length',
  '3024'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedcertificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0')
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
  '622d4ad4-a790-446d-ae82-d4be8467551d',
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
  'Thu, 25 Jun 2020 12:52:09 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1","deletedDate":1593089530,"scheduledPurgeDate":1600865530,"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1/f33a18926fbb4ddeaa9461dae8477fc6","kid":"https://keyvault_name.vault.azure.net/keys/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1/f33a18926fbb4ddeaa9461dae8477fc6","sid":"https://keyvault_name.vault.azure.net/secrets/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1/f33a18926fbb4ddeaa9461dae8477fc6","x5t":"3B9pl5MjIPAr9Xel8oV0y4IsMUc","cer":"MIIDKDCCAhCgAwIBAgIQEt2NdWI8RY+f9VP/lfhr7TANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjAwNjI1MTI0MTUyWhcNMjEwNjI1MTI1MTUyWjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQDem048EU5brBwIL+QmQHaSKuGaWcxkxM0QWooPTWrSpPfGru6gvyOSBc8xnTpd9Nv11paZ2UKY5P1LiOkkc1HtF+kDosnSxFFHiVg3b5WiSv5pw9QSokwUQcHLs9p4zeR/5VgXIJq0uUsHRJr11UonRk0lJUzGt1bjCExTgsMRtsqSUPp0LGH11ivOPtp5HIMwGUzhEWJS52l4SVUiZGXd7nhGjvaBtUoYChbke5K+PVLr0QIJzhq124esJoD5+kYytoZVCOZpNbFRazs+wne+ltdShI21d0Aw1klDJkcTPtizpUqSQ7Ikmm+oDlIMAsaryz4C4qG747xZaV5U2tK5AgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBS5dLd5lJEz3ISP64/QoE05V+kM8jAdBgNVHQ4EFgQUuXS3eZSRM9yEj+uP0KBNOVfpDPIwDQYJKoZIhvcNAQELBQADggEBAN0/t6wkfIvZAyyqW1iLiRqrp7PrmRuF0HU+ycAGdf3p8wH71Zd/u6YTrAxVYjNideGda5qgWZ6Vn7rPNDLta9/4pKObsfpmlQKo5jvGRiv0lHPuWhdnKypHt+XpatXN67QuSmIrOJ68RtTgpQEk5KYy1kqMf0oOagesPqCQyDlVaJjGxZ56pz0i7JL8fiCgARM4We+CdRzwkd6QfaYRq9p0VLbcyBp7yhCVGUxuP4s7evF9vIvt+kk3sNuQCHz+Ykv4kuolgKgrtk2zTBBwP7V6A2RKluhYD3YVlEKyox8Z8ZUGBqnrfgqNIDQnrwszItjCP23XHEJQ/PJJVd43h0o=","attributes":{"enabled":true,"nbf":1593088912,"exp":1624625512,"created":1593089513,"updated":1593089513,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1593089499,"updated":1593089499}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1/pending"}}, [
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
  'a028e8b7-309d-446a-be9a-b3f9b01fc0d8',
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
  'Thu, 25 Jun 2020 12:52:10 GMT',
  'Content-Length',
  '3024'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '187',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '1139933c-64e3-48c9-b5b7-40ceb22b5fa9',
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
  'Thu, 25 Jun 2020 12:52:10 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '187',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'f64bd871-2e15-4a58-a623-76f3b6dcca96',
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
  'Thu, 25 Jun 2020 12:52:10 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '187',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '339ea69c-3e2b-449d-9d6e-31387aaaaa03',
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
  'Thu, 25 Jun 2020 12:52:11 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '187',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'e324c415-d97f-4dcd-acdc-9af4edd3186f',
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
  'Thu, 25 Jun 2020 12:52:13 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '187',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '7623ee44-879d-4433-9c3d-d0cbe834c28c',
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
  'Thu, 25 Jun 2020 12:52:15 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '187',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '1f40425c-abcf-42cd-b026-b60f52a439cc',
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
  'Thu, 25 Jun 2020 12:52:17 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '187',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'c13ec721-324c-4c21-a45d-ea9185ec3622',
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
  'Thu, 25 Jun 2020 12:52:20 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '187',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '01217e4d-07fe-409c-81c0-ca0c05d76b92',
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
  'Thu, 25 Jun 2020 12:52:22 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1","deletedDate":1593089530,"scheduledPurgeDate":1600865530,"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1/f33a18926fbb4ddeaa9461dae8477fc6","kid":"https://keyvault_name.vault.azure.net/keys/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1/f33a18926fbb4ddeaa9461dae8477fc6","sid":"https://keyvault_name.vault.azure.net/secrets/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1/f33a18926fbb4ddeaa9461dae8477fc6","x5t":"3B9pl5MjIPAr9Xel8oV0y4IsMUc","cer":"MIIDKDCCAhCgAwIBAgIQEt2NdWI8RY+f9VP/lfhr7TANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjAwNjI1MTI0MTUyWhcNMjEwNjI1MTI1MTUyWjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQDem048EU5brBwIL+QmQHaSKuGaWcxkxM0QWooPTWrSpPfGru6gvyOSBc8xnTpd9Nv11paZ2UKY5P1LiOkkc1HtF+kDosnSxFFHiVg3b5WiSv5pw9QSokwUQcHLs9p4zeR/5VgXIJq0uUsHRJr11UonRk0lJUzGt1bjCExTgsMRtsqSUPp0LGH11ivOPtp5HIMwGUzhEWJS52l4SVUiZGXd7nhGjvaBtUoYChbke5K+PVLr0QIJzhq124esJoD5+kYytoZVCOZpNbFRazs+wne+ltdShI21d0Aw1klDJkcTPtizpUqSQ7Ikmm+oDlIMAsaryz4C4qG747xZaV5U2tK5AgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBS5dLd5lJEz3ISP64/QoE05V+kM8jAdBgNVHQ4EFgQUuXS3eZSRM9yEj+uP0KBNOVfpDPIwDQYJKoZIhvcNAQELBQADggEBAN0/t6wkfIvZAyyqW1iLiRqrp7PrmRuF0HU+ycAGdf3p8wH71Zd/u6YTrAxVYjNideGda5qgWZ6Vn7rPNDLta9/4pKObsfpmlQKo5jvGRiv0lHPuWhdnKypHt+XpatXN67QuSmIrOJ68RtTgpQEk5KYy1kqMf0oOagesPqCQyDlVaJjGxZ56pz0i7JL8fiCgARM4We+CdRzwkd6QfaYRq9p0VLbcyBp7yhCVGUxuP4s7evF9vIvt+kk3sNuQCHz+Ykv4kuolgKgrtk2zTBBwP7V6A2RKluhYD3YVlEKyox8Z8ZUGBqnrfgqNIDQnrwszItjCP23XHEJQ/PJJVd43h0o=","attributes":{"enabled":true,"nbf":1593088912,"exp":1624625512,"created":1593089513,"updated":1593089513,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1593089499,"updated":1593089499}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1/pending"}}, [
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
  'a8f913da-1f00-48d8-a4fe-1f338fe608a0',
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
  'Thu, 25 Jun 2020 12:52:24 GMT',
  'Content-Length',
  '3024'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedcertificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1')
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
  'd6ed0357-875f-446f-975e-33f8b6d8d2d8',
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
  'Thu, 25 Jun 2020 12:52:24 GMT'
]);

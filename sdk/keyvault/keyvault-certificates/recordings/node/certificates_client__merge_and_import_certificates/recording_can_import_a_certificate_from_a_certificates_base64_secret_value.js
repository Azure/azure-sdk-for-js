let nock = require('nock');

module.exports.hash = "c0f3ca684bb61fe126465aa38623d86d";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/certificates/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-0/create')
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
  '0752d8cf-d43b-4af5-b9f5-0ac0393702da',
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
  'Tue, 16 Feb 2021 19:07:17 GMT'
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
  'd14948e5-3d75-42b6-b23a-ddf3621b2f00',
  'x-ms-ests-server',
  '2.1.11496.6 - WUS2 ProdSlices',
  'Set-Cookie',
  'fpc=AufoSEQpIbxLjzJaYLa_pBMA4qsDDgAAAHkOvtcOAAAA; expires=Thu, 18-Mar-2021 19:07:17 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 16 Feb 2021 19:07:16 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/certificates/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-0/create', {"policy":{"key_props":{},"secret_props":{},"x509_props":{"subject":"cn=MyCert","sans":{}},"issuer":{"name":"Self"},"attributes":{}},"attributes":{}})
  .query(true)
  .reply(202, {"id":"https://keyvault_name.vault.azure.net/certificates/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA1MxLF6Sn6l2WF+pFtEKrcp2bn2YNqfpeYpLTYteWnZ3/XYN5Py3HIw/rpUH5PIfon2uoDz0OSJrk8V2HWOP1HNUSLHFfPvKwdkZM82bvsukVsSu0uIMOE8IHwLVoUCk2Qwav9g1M+Y8k+8++Ghr0LbzThTC5y15p6Iz9iohvI3DJTygpuqZkRYWLRB1F0+lmLxF9dGX0q+36y0RY93hVmqOwPA0exgeIFlMkFjvEKByLDCX7TFSjCj1av2/9jXUoHSsCtAUdbqrgbAcGRGaXQc4NnyghEUoaOiNdeSMoQsxIM9bx/95ZA6QWigJIOmjOAd1O+DzzE44M9MJ8y2oLbQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAB4r5zRUY29dNcLZTjug9dTOl+Gwwki6KKYwrqkGJ3HvmTCG2OF36ZX9lFHK/flh4hWi2abjNKbzdOudTdY6eH677Pi0vTCSkR6PmnazL1mCM0lwRfu7Jjbd75dvBaYthEzRTMfIfdSP0CV6CAqSGPWH2LC3cx+ejVVRFIpeWTEbnuQXysR4RirjhZIizSHe5NmwyzqkVSToXEUttbW9UHzXwITouSNNBbnnzsIdwlOX+ZebtLi7Hg1j+qCp8Kfwy8xFlguhXHrFttevJWaHp4JSk0q6CHOK0rLzq8kHLC2MxGMpgVNlIcplJH4kbLyFAIkZ4H2fAzKZURNV91b8ZV4=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"1795ec10c8e241beaf368444d9a0edfe"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://keyvault_name.vault.azure.net/certificates/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-0/pending?api-version=7.2&request_id=1795ec10c8e241beaf368444d9a0edfe',
  'Retry-After',
  '10',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  'b992353d-7f83-43d8-9bab-9da2ec0d7270',
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
  'Tue, 16 Feb 2021 19:07:17 GMT',
  'Content-Length',
  '1361'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA1MxLF6Sn6l2WF+pFtEKrcp2bn2YNqfpeYpLTYteWnZ3/XYN5Py3HIw/rpUH5PIfon2uoDz0OSJrk8V2HWOP1HNUSLHFfPvKwdkZM82bvsukVsSu0uIMOE8IHwLVoUCk2Qwav9g1M+Y8k+8++Ghr0LbzThTC5y15p6Iz9iohvI3DJTygpuqZkRYWLRB1F0+lmLxF9dGX0q+36y0RY93hVmqOwPA0exgeIFlMkFjvEKByLDCX7TFSjCj1av2/9jXUoHSsCtAUdbqrgbAcGRGaXQc4NnyghEUoaOiNdeSMoQsxIM9bx/95ZA6QWigJIOmjOAd1O+DzzE44M9MJ8y2oLbQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAB4r5zRUY29dNcLZTjug9dTOl+Gwwki6KKYwrqkGJ3HvmTCG2OF36ZX9lFHK/flh4hWi2abjNKbzdOudTdY6eH677Pi0vTCSkR6PmnazL1mCM0lwRfu7Jjbd75dvBaYthEzRTMfIfdSP0CV6CAqSGPWH2LC3cx+ejVVRFIpeWTEbnuQXysR4RirjhZIizSHe5NmwyzqkVSToXEUttbW9UHzXwITouSNNBbnnzsIdwlOX+ZebtLi7Hg1j+qCp8Kfwy8xFlguhXHrFttevJWaHp4JSk0q6CHOK0rLzq8kHLC2MxGMpgVNlIcplJH4kbLyFAIkZ4H2fAzKZURNV91b8ZV4=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"1795ec10c8e241beaf368444d9a0edfe"}, [
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
  'f2c200ce-b18f-439d-9e29-0e54ef19927b',
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
  'Tue, 16 Feb 2021 19:07:18 GMT',
  'Content-Length',
  '1361'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA1MxLF6Sn6l2WF+pFtEKrcp2bn2YNqfpeYpLTYteWnZ3/XYN5Py3HIw/rpUH5PIfon2uoDz0OSJrk8V2HWOP1HNUSLHFfPvKwdkZM82bvsukVsSu0uIMOE8IHwLVoUCk2Qwav9g1M+Y8k+8++Ghr0LbzThTC5y15p6Iz9iohvI3DJTygpuqZkRYWLRB1F0+lmLxF9dGX0q+36y0RY93hVmqOwPA0exgeIFlMkFjvEKByLDCX7TFSjCj1av2/9jXUoHSsCtAUdbqrgbAcGRGaXQc4NnyghEUoaOiNdeSMoQsxIM9bx/95ZA6QWigJIOmjOAd1O+DzzE44M9MJ8y2oLbQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAB4r5zRUY29dNcLZTjug9dTOl+Gwwki6KKYwrqkGJ3HvmTCG2OF36ZX9lFHK/flh4hWi2abjNKbzdOudTdY6eH677Pi0vTCSkR6PmnazL1mCM0lwRfu7Jjbd75dvBaYthEzRTMfIfdSP0CV6CAqSGPWH2LC3cx+ejVVRFIpeWTEbnuQXysR4RirjhZIizSHe5NmwyzqkVSToXEUttbW9UHzXwITouSNNBbnnzsIdwlOX+ZebtLi7Hg1j+qCp8Kfwy8xFlguhXHrFttevJWaHp4JSk0q6CHOK0rLzq8kHLC2MxGMpgVNlIcplJH4kbLyFAIkZ4H2fAzKZURNV91b8ZV4=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"1795ec10c8e241beaf368444d9a0edfe"}, [
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
  '1f3251bf-613f-4355-885d-e8ee6e7c7c65',
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
  'Tue, 16 Feb 2021 19:07:17 GMT',
  'Content-Length',
  '1361'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA1MxLF6Sn6l2WF+pFtEKrcp2bn2YNqfpeYpLTYteWnZ3/XYN5Py3HIw/rpUH5PIfon2uoDz0OSJrk8V2HWOP1HNUSLHFfPvKwdkZM82bvsukVsSu0uIMOE8IHwLVoUCk2Qwav9g1M+Y8k+8++Ghr0LbzThTC5y15p6Iz9iohvI3DJTygpuqZkRYWLRB1F0+lmLxF9dGX0q+36y0RY93hVmqOwPA0exgeIFlMkFjvEKByLDCX7TFSjCj1av2/9jXUoHSsCtAUdbqrgbAcGRGaXQc4NnyghEUoaOiNdeSMoQsxIM9bx/95ZA6QWigJIOmjOAd1O+DzzE44M9MJ8y2oLbQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAB4r5zRUY29dNcLZTjug9dTOl+Gwwki6KKYwrqkGJ3HvmTCG2OF36ZX9lFHK/flh4hWi2abjNKbzdOudTdY6eH677Pi0vTCSkR6PmnazL1mCM0lwRfu7Jjbd75dvBaYthEzRTMfIfdSP0CV6CAqSGPWH2LC3cx+ejVVRFIpeWTEbnuQXysR4RirjhZIizSHe5NmwyzqkVSToXEUttbW9UHzXwITouSNNBbnnzsIdwlOX+ZebtLi7Hg1j+qCp8Kfwy8xFlguhXHrFttevJWaHp4JSk0q6CHOK0rLzq8kHLC2MxGMpgVNlIcplJH4kbLyFAIkZ4H2fAzKZURNV91b8ZV4=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"1795ec10c8e241beaf368444d9a0edfe"}, [
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
  '296e56a1-9811-45b0-8483-b92cf0f9c14f',
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
  'Tue, 16 Feb 2021 19:07:20 GMT',
  'Content-Length',
  '1361'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA1MxLF6Sn6l2WF+pFtEKrcp2bn2YNqfpeYpLTYteWnZ3/XYN5Py3HIw/rpUH5PIfon2uoDz0OSJrk8V2HWOP1HNUSLHFfPvKwdkZM82bvsukVsSu0uIMOE8IHwLVoUCk2Qwav9g1M+Y8k+8++Ghr0LbzThTC5y15p6Iz9iohvI3DJTygpuqZkRYWLRB1F0+lmLxF9dGX0q+36y0RY93hVmqOwPA0exgeIFlMkFjvEKByLDCX7TFSjCj1av2/9jXUoHSsCtAUdbqrgbAcGRGaXQc4NnyghEUoaOiNdeSMoQsxIM9bx/95ZA6QWigJIOmjOAd1O+DzzE44M9MJ8y2oLbQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAB4r5zRUY29dNcLZTjug9dTOl+Gwwki6KKYwrqkGJ3HvmTCG2OF36ZX9lFHK/flh4hWi2abjNKbzdOudTdY6eH677Pi0vTCSkR6PmnazL1mCM0lwRfu7Jjbd75dvBaYthEzRTMfIfdSP0CV6CAqSGPWH2LC3cx+ejVVRFIpeWTEbnuQXysR4RirjhZIizSHe5NmwyzqkVSToXEUttbW9UHzXwITouSNNBbnnzsIdwlOX+ZebtLi7Hg1j+qCp8Kfwy8xFlguhXHrFttevJWaHp4JSk0q6CHOK0rLzq8kHLC2MxGMpgVNlIcplJH4kbLyFAIkZ4H2fAzKZURNV91b8ZV4=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"1795ec10c8e241beaf368444d9a0edfe"}, [
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
  'a7c4a634-120c-4676-828f-ad5855a284b6',
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
  'Tue, 16 Feb 2021 19:07:21 GMT',
  'Content-Length',
  '1361'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA1MxLF6Sn6l2WF+pFtEKrcp2bn2YNqfpeYpLTYteWnZ3/XYN5Py3HIw/rpUH5PIfon2uoDz0OSJrk8V2HWOP1HNUSLHFfPvKwdkZM82bvsukVsSu0uIMOE8IHwLVoUCk2Qwav9g1M+Y8k+8++Ghr0LbzThTC5y15p6Iz9iohvI3DJTygpuqZkRYWLRB1F0+lmLxF9dGX0q+36y0RY93hVmqOwPA0exgeIFlMkFjvEKByLDCX7TFSjCj1av2/9jXUoHSsCtAUdbqrgbAcGRGaXQc4NnyghEUoaOiNdeSMoQsxIM9bx/95ZA6QWigJIOmjOAd1O+DzzE44M9MJ8y2oLbQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAB4r5zRUY29dNcLZTjug9dTOl+Gwwki6KKYwrqkGJ3HvmTCG2OF36ZX9lFHK/flh4hWi2abjNKbzdOudTdY6eH677Pi0vTCSkR6PmnazL1mCM0lwRfu7Jjbd75dvBaYthEzRTMfIfdSP0CV6CAqSGPWH2LC3cx+ejVVRFIpeWTEbnuQXysR4RirjhZIizSHe5NmwyzqkVSToXEUttbW9UHzXwITouSNNBbnnzsIdwlOX+ZebtLi7Hg1j+qCp8Kfwy8xFlguhXHrFttevJWaHp4JSk0q6CHOK0rLzq8kHLC2MxGMpgVNlIcplJH4kbLyFAIkZ4H2fAzKZURNV91b8ZV4=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"1795ec10c8e241beaf368444d9a0edfe"}, [
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
  '2acb22a8-cc6d-4ffa-8b5c-a40b1dadd524',
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
  'Tue, 16 Feb 2021 19:07:23 GMT',
  'Content-Length',
  '1361'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA1MxLF6Sn6l2WF+pFtEKrcp2bn2YNqfpeYpLTYteWnZ3/XYN5Py3HIw/rpUH5PIfon2uoDz0OSJrk8V2HWOP1HNUSLHFfPvKwdkZM82bvsukVsSu0uIMOE8IHwLVoUCk2Qwav9g1M+Y8k+8++Ghr0LbzThTC5y15p6Iz9iohvI3DJTygpuqZkRYWLRB1F0+lmLxF9dGX0q+36y0RY93hVmqOwPA0exgeIFlMkFjvEKByLDCX7TFSjCj1av2/9jXUoHSsCtAUdbqrgbAcGRGaXQc4NnyghEUoaOiNdeSMoQsxIM9bx/95ZA6QWigJIOmjOAd1O+DzzE44M9MJ8y2oLbQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAB4r5zRUY29dNcLZTjug9dTOl+Gwwki6KKYwrqkGJ3HvmTCG2OF36ZX9lFHK/flh4hWi2abjNKbzdOudTdY6eH677Pi0vTCSkR6PmnazL1mCM0lwRfu7Jjbd75dvBaYthEzRTMfIfdSP0CV6CAqSGPWH2LC3cx+ejVVRFIpeWTEbnuQXysR4RirjhZIizSHe5NmwyzqkVSToXEUttbW9UHzXwITouSNNBbnnzsIdwlOX+ZebtLi7Hg1j+qCp8Kfwy8xFlguhXHrFttevJWaHp4JSk0q6CHOK0rLzq8kHLC2MxGMpgVNlIcplJH4kbLyFAIkZ4H2fAzKZURNV91b8ZV4=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"1795ec10c8e241beaf368444d9a0edfe"}, [
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
  '14b65cf8-eb9f-4043-a26d-9d0342da0e8e',
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
  'Tue, 16 Feb 2021 19:07:26 GMT',
  'Content-Length',
  '1361'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA1MxLF6Sn6l2WF+pFtEKrcp2bn2YNqfpeYpLTYteWnZ3/XYN5Py3HIw/rpUH5PIfon2uoDz0OSJrk8V2HWOP1HNUSLHFfPvKwdkZM82bvsukVsSu0uIMOE8IHwLVoUCk2Qwav9g1M+Y8k+8++Ghr0LbzThTC5y15p6Iz9iohvI3DJTygpuqZkRYWLRB1F0+lmLxF9dGX0q+36y0RY93hVmqOwPA0exgeIFlMkFjvEKByLDCX7TFSjCj1av2/9jXUoHSsCtAUdbqrgbAcGRGaXQc4NnyghEUoaOiNdeSMoQsxIM9bx/95ZA6QWigJIOmjOAd1O+DzzE44M9MJ8y2oLbQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAB4r5zRUY29dNcLZTjug9dTOl+Gwwki6KKYwrqkGJ3HvmTCG2OF36ZX9lFHK/flh4hWi2abjNKbzdOudTdY6eH677Pi0vTCSkR6PmnazL1mCM0lwRfu7Jjbd75dvBaYthEzRTMfIfdSP0CV6CAqSGPWH2LC3cx+ejVVRFIpeWTEbnuQXysR4RirjhZIizSHe5NmwyzqkVSToXEUttbW9UHzXwITouSNNBbnnzsIdwlOX+ZebtLi7Hg1j+qCp8Kfwy8xFlguhXHrFttevJWaHp4JSk0q6CHOK0rLzq8kHLC2MxGMpgVNlIcplJH4kbLyFAIkZ4H2fAzKZURNV91b8ZV4=","cancellation_requested":false,"status":"completed","target":"https://keyvault_name.vault.azure.net/certificates/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-0","request_id":"1795ec10c8e241beaf368444d9a0edfe"}, [
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
  '1ed7f337-9a40-4059-8868-53b344c69d7f',
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
  'Tue, 16 Feb 2021 19:07:27 GMT',
  'Content-Length',
  '1349'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-0/')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-0/4d1ad9b95fbb4336b4c995711ea4fe32","kid":"https://keyvault_name.vault.azure.net/keys/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-0/4d1ad9b95fbb4336b4c995711ea4fe32","sid":"https://keyvault_name.vault.azure.net/secrets/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-0/4d1ad9b95fbb4336b4c995711ea4fe32","x5t":"kNUBOf77e3lOc73-r6pIuwq1bkY","cer":"MIIDKDCCAhCgAwIBAgIQJyDqwC7wTaeGbuuSE1vrSDANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjEwMjE2MTg1NzI3WhcNMjIwMjE2MTkwNzI3WjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQDUzEsXpKfqXZYX6kW0QqtynZufZg2p+l5iktNi15adnf9dg3k/LccjD+ulQfk8h+ifa6gPPQ5ImuTxXYdY4/Uc1RIscV8+8rB2RkzzZu+y6RWxK7S4gw4TwgfAtWhQKTZDBq/2DUz5jyT7z74aGvQtvNOFMLnLXmnojP2KiG8jcMlPKCm6pmRFhYtEHUXT6WYvEX10ZfSr7frLRFj3eFWao7A8DR7GB4gWUyQWO8QoHIsMJftMVKMKPVq/b/2NdSgdKwK0BR1uquBsBwZEZpdBzg2fKCERSho6I115IyhCzEgz1vH/3lkDpBaKAkg6aM4B3U74PPMTjgz0wnzLagttAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBQjAADnowBzFOXYdrRkPlnZLoBYpTAdBgNVHQ4EFgQUIwAA56MAcxTl2Ha0ZD5Z2S6AWKUwDQYJKoZIhvcNAQELBQADggEBAEuAg57iteOvc6avlYo76M5nqLqFlnCwbwPEa6+F6kt1qqQJPWcIQ03xmYsw2Nb4daIpZ70FWiwLibSoVq5CaN0aGiEPrZPkkg5WbI1x2W2EuD+s+ZaRXW+45lpU1t7tFYwRdYdr8JzJayQjjpKmYYbTz6Z0rwLYIWBeny/Whv10JefksED+6SD14KcBt96Uh8fm6QGT/ITb0E6bNaChfSxCyL00+CbUwHaWsWzxkOKNBJde+53G6XHKDW97w48FHiJE19vHC9MBLyrHXjGAQKvVFIUo6ZEdMdr+cKzZYbqgN4QyT3gQEiBK0JudgMlG+3wnswuAj2HFjS0M9C/e+XE=","attributes":{"enabled":true,"nbf":1613501847,"exp":1645038447,"created":1613502447,"updated":1613502447,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-0/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1613502437,"updated":1613502437}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-0/pending"}}, [
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
  '5bbeabae-dc6f-4587-99de-0ed4f00b35a0',
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
  'Tue, 16 Feb 2021 19:07:28 GMT',
  'Content-Length',
  '2704'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/secrets/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-0/')
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
  '7947a4b4-fee2-4df4-ae26-b0e86f24bdaa',
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
  'Tue, 16 Feb 2021 19:07:27 GMT'
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
  'fa4689bb-0b3c-4303-a01e-93843e1c3600',
  'x-ms-ests-server',
  '2.1.11496.6 - WUS2 ProdSlices',
  'Set-Cookie',
  'fpc=AufoSEQpIbxLjzJaYLa_pBMA4qsDDgAAAHkOvtcOAAAA; expires=Thu, 18-Mar-2021 19:07:28 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 16 Feb 2021 19:07:28 GMT',
  'Content-Length',
  '1315'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/secrets/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-0/')
  .query(true)
  .reply(200, {"value":"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","contentType":"application/x-pkcs12","id":"https://keyvault_name.vault.azure.net/secrets/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-0/4d1ad9b95fbb4336b4c995711ea4fe32","managed":true,"attributes":{"enabled":true,"nbf":1613501847,"exp":1645038447,"created":1613502447,"updated":1613502447,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7},"kid":"https://keyvault_name.vault.azure.net/keys/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-0/4d1ad9b95fbb4336b4c995711ea4fe32"}, [
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
  'fa0bedbe-0288-46aa-907b-909bbc82698b',
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
  'Tue, 16 Feb 2021 19:07:28 GMT',
  'Content-Length',
  '4088'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/certificates/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-1/import', {"value":"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"})
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-1/762d4cc414094944bf5dd26e4315533c","kid":"https://keyvault_name.vault.azure.net/keys/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-1/762d4cc414094944bf5dd26e4315533c","sid":"https://keyvault_name.vault.azure.net/secrets/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-1/762d4cc414094944bf5dd26e4315533c","x5t":"kNUBOf77e3lOc73-r6pIuwq1bkY","cer":"MIIDKDCCAhCgAwIBAgIQJyDqwC7wTaeGbuuSE1vrSDANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjEwMjE2MTg1NzI3WhcNMjIwMjE2MTkwNzI3WjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQDUzEsXpKfqXZYX6kW0QqtynZufZg2p+l5iktNi15adnf9dg3k/LccjD+ulQfk8h+ifa6gPPQ5ImuTxXYdY4/Uc1RIscV8+8rB2RkzzZu+y6RWxK7S4gw4TwgfAtWhQKTZDBq/2DUz5jyT7z74aGvQtvNOFMLnLXmnojP2KiG8jcMlPKCm6pmRFhYtEHUXT6WYvEX10ZfSr7frLRFj3eFWao7A8DR7GB4gWUyQWO8QoHIsMJftMVKMKPVq/b/2NdSgdKwK0BR1uquBsBwZEZpdBzg2fKCERSho6I115IyhCzEgz1vH/3lkDpBaKAkg6aM4B3U74PPMTjgz0wnzLagttAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBQjAADnowBzFOXYdrRkPlnZLoBYpTAdBgNVHQ4EFgQUIwAA56MAcxTl2Ha0ZD5Z2S6AWKUwDQYJKoZIhvcNAQELBQADggEBAEuAg57iteOvc6avlYo76M5nqLqFlnCwbwPEa6+F6kt1qqQJPWcIQ03xmYsw2Nb4daIpZ70FWiwLibSoVq5CaN0aGiEPrZPkkg5WbI1x2W2EuD+s+ZaRXW+45lpU1t7tFYwRdYdr8JzJayQjjpKmYYbTz6Z0rwLYIWBeny/Whv10JefksED+6SD14KcBt96Uh8fm6QGT/ITb0E6bNaChfSxCyL00+CbUwHaWsWzxkOKNBJde+53G6XHKDW97w48FHiJE19vHC9MBLyrHXjGAQKvVFIUo6ZEdMdr+cKzZYbqgN4QyT3gQEiBK0JudgMlG+3wnswuAj2HFjS0M9C/e+XE=","attributes":{"enabled":true,"nbf":1613501847,"exp":1645038447,"created":1613502448,"updated":1613502448,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-1/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"CN=MyCert","ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":13,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"EmailContacts"}}],"issuer":{"name":"Unknown"},"attributes":{"enabled":true,"created":1613502448,"updated":1613502448}}}, [
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
  '27c49410-79dc-4880-a368-a1271dd1fc98',
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
  'Tue, 16 Feb 2021 19:07:28 GMT',
  'Content-Length',
  '2532'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/certificates/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-0')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-0","deletedDate":1613502449,"scheduledPurgeDate":1614107249,"id":"https://keyvault_name.vault.azure.net/certificates/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-0/4d1ad9b95fbb4336b4c995711ea4fe32","kid":"https://keyvault_name.vault.azure.net/keys/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-0/4d1ad9b95fbb4336b4c995711ea4fe32","sid":"https://keyvault_name.vault.azure.net/secrets/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-0/4d1ad9b95fbb4336b4c995711ea4fe32","x5t":"kNUBOf77e3lOc73-r6pIuwq1bkY","cer":"MIIDKDCCAhCgAwIBAgIQJyDqwC7wTaeGbuuSE1vrSDANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjEwMjE2MTg1NzI3WhcNMjIwMjE2MTkwNzI3WjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQDUzEsXpKfqXZYX6kW0QqtynZufZg2p+l5iktNi15adnf9dg3k/LccjD+ulQfk8h+ifa6gPPQ5ImuTxXYdY4/Uc1RIscV8+8rB2RkzzZu+y6RWxK7S4gw4TwgfAtWhQKTZDBq/2DUz5jyT7z74aGvQtvNOFMLnLXmnojP2KiG8jcMlPKCm6pmRFhYtEHUXT6WYvEX10ZfSr7frLRFj3eFWao7A8DR7GB4gWUyQWO8QoHIsMJftMVKMKPVq/b/2NdSgdKwK0BR1uquBsBwZEZpdBzg2fKCERSho6I115IyhCzEgz1vH/3lkDpBaKAkg6aM4B3U74PPMTjgz0wnzLagttAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBQjAADnowBzFOXYdrRkPlnZLoBYpTAdBgNVHQ4EFgQUIwAA56MAcxTl2Ha0ZD5Z2S6AWKUwDQYJKoZIhvcNAQELBQADggEBAEuAg57iteOvc6avlYo76M5nqLqFlnCwbwPEa6+F6kt1qqQJPWcIQ03xmYsw2Nb4daIpZ70FWiwLibSoVq5CaN0aGiEPrZPkkg5WbI1x2W2EuD+s+ZaRXW+45lpU1t7tFYwRdYdr8JzJayQjjpKmYYbTz6Z0rwLYIWBeny/Whv10JefksED+6SD14KcBt96Uh8fm6QGT/ITb0E6bNaChfSxCyL00+CbUwHaWsWzxkOKNBJde+53G6XHKDW97w48FHiJE19vHC9MBLyrHXjGAQKvVFIUo6ZEdMdr+cKzZYbqgN4QyT3gQEiBK0JudgMlG+3wnswuAj2HFjS0M9C/e+XE=","attributes":{"enabled":true,"nbf":1613501847,"exp":1645038447,"created":1613502447,"updated":1613502447,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-0/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1613502437,"updated":1613502437}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-0/pending"}}, [
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
  '7a226e6a-1ed5-4d69-984d-589480cd1821',
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
  'Tue, 16 Feb 2021 19:07:28 GMT',
  'Content-Length',
  '2925'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-0')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-0"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '178',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  '497f911d-eda7-4a91-addb-5b1c5c4d669f',
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
  'Tue, 16 Feb 2021 19:07:28 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-0')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-0"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '178',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  'f7a96555-1253-42bc-ab57-b51e2c9c0a38',
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
  'Tue, 16 Feb 2021 19:07:29 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-0')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-0"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '178',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  'e23b7a01-9d62-46b8-ab64-b1a76591946c',
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
  'Tue, 16 Feb 2021 19:07:31 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-0')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-0"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '178',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  'ce75c453-20eb-4037-9ead-0afa1432dfe8',
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
  'Tue, 16 Feb 2021 19:07:32 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-0')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-0"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '178',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  '3eeaf613-6697-4c9e-962b-c1823fb92ec8',
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
  'Tue, 16 Feb 2021 19:07:35 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-0')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-0","deletedDate":1613502449,"scheduledPurgeDate":1614107249,"id":"https://keyvault_name.vault.azure.net/certificates/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-0/4d1ad9b95fbb4336b4c995711ea4fe32","kid":"https://keyvault_name.vault.azure.net/keys/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-0/4d1ad9b95fbb4336b4c995711ea4fe32","sid":"https://keyvault_name.vault.azure.net/secrets/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-0/4d1ad9b95fbb4336b4c995711ea4fe32","x5t":"kNUBOf77e3lOc73-r6pIuwq1bkY","cer":"MIIDKDCCAhCgAwIBAgIQJyDqwC7wTaeGbuuSE1vrSDANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjEwMjE2MTg1NzI3WhcNMjIwMjE2MTkwNzI3WjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQDUzEsXpKfqXZYX6kW0QqtynZufZg2p+l5iktNi15adnf9dg3k/LccjD+ulQfk8h+ifa6gPPQ5ImuTxXYdY4/Uc1RIscV8+8rB2RkzzZu+y6RWxK7S4gw4TwgfAtWhQKTZDBq/2DUz5jyT7z74aGvQtvNOFMLnLXmnojP2KiG8jcMlPKCm6pmRFhYtEHUXT6WYvEX10ZfSr7frLRFj3eFWao7A8DR7GB4gWUyQWO8QoHIsMJftMVKMKPVq/b/2NdSgdKwK0BR1uquBsBwZEZpdBzg2fKCERSho6I115IyhCzEgz1vH/3lkDpBaKAkg6aM4B3U74PPMTjgz0wnzLagttAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBQjAADnowBzFOXYdrRkPlnZLoBYpTAdBgNVHQ4EFgQUIwAA56MAcxTl2Ha0ZD5Z2S6AWKUwDQYJKoZIhvcNAQELBQADggEBAEuAg57iteOvc6avlYo76M5nqLqFlnCwbwPEa6+F6kt1qqQJPWcIQ03xmYsw2Nb4daIpZ70FWiwLibSoVq5CaN0aGiEPrZPkkg5WbI1x2W2EuD+s+ZaRXW+45lpU1t7tFYwRdYdr8JzJayQjjpKmYYbTz6Z0rwLYIWBeny/Whv10JefksED+6SD14KcBt96Uh8fm6QGT/ITb0E6bNaChfSxCyL00+CbUwHaWsWzxkOKNBJde+53G6XHKDW97w48FHiJE19vHC9MBLyrHXjGAQKvVFIUo6ZEdMdr+cKzZYbqgN4QyT3gQEiBK0JudgMlG+3wnswuAj2HFjS0M9C/e+XE=","attributes":{"enabled":true,"nbf":1613501847,"exp":1645038447,"created":1613502447,"updated":1613502447,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-0/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1613502437,"updated":1613502437}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-0/pending"}}, [
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
  '52493bd6-f7ac-4bef-aa7d-db0d3a2fe4bc',
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
  'Tue, 16 Feb 2021 19:07:37 GMT',
  'Content-Length',
  '2925'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedcertificates/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-0')
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
  'a6160d4e-b74b-422a-b4a9-6b2153f48e71',
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
  'Tue, 16 Feb 2021 19:07:37 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/certificates/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-1')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-1","deletedDate":1613502457,"scheduledPurgeDate":1614107257,"id":"https://keyvault_name.vault.azure.net/certificates/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-1/762d4cc414094944bf5dd26e4315533c","kid":"https://keyvault_name.vault.azure.net/keys/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-1/762d4cc414094944bf5dd26e4315533c","sid":"https://keyvault_name.vault.azure.net/secrets/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-1/762d4cc414094944bf5dd26e4315533c","x5t":"kNUBOf77e3lOc73-r6pIuwq1bkY","cer":"MIIDKDCCAhCgAwIBAgIQJyDqwC7wTaeGbuuSE1vrSDANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjEwMjE2MTg1NzI3WhcNMjIwMjE2MTkwNzI3WjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQDUzEsXpKfqXZYX6kW0QqtynZufZg2p+l5iktNi15adnf9dg3k/LccjD+ulQfk8h+ifa6gPPQ5ImuTxXYdY4/Uc1RIscV8+8rB2RkzzZu+y6RWxK7S4gw4TwgfAtWhQKTZDBq/2DUz5jyT7z74aGvQtvNOFMLnLXmnojP2KiG8jcMlPKCm6pmRFhYtEHUXT6WYvEX10ZfSr7frLRFj3eFWao7A8DR7GB4gWUyQWO8QoHIsMJftMVKMKPVq/b/2NdSgdKwK0BR1uquBsBwZEZpdBzg2fKCERSho6I115IyhCzEgz1vH/3lkDpBaKAkg6aM4B3U74PPMTjgz0wnzLagttAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBQjAADnowBzFOXYdrRkPlnZLoBYpTAdBgNVHQ4EFgQUIwAA56MAcxTl2Ha0ZD5Z2S6AWKUwDQYJKoZIhvcNAQELBQADggEBAEuAg57iteOvc6avlYo76M5nqLqFlnCwbwPEa6+F6kt1qqQJPWcIQ03xmYsw2Nb4daIpZ70FWiwLibSoVq5CaN0aGiEPrZPkkg5WbI1x2W2EuD+s+ZaRXW+45lpU1t7tFYwRdYdr8JzJayQjjpKmYYbTz6Z0rwLYIWBeny/Whv10JefksED+6SD14KcBt96Uh8fm6QGT/ITb0E6bNaChfSxCyL00+CbUwHaWsWzxkOKNBJde+53G6XHKDW97w48FHiJE19vHC9MBLyrHXjGAQKvVFIUo6ZEdMdr+cKzZYbqgN4QyT3gQEiBK0JudgMlG+3wnswuAj2HFjS0M9C/e+XE=","attributes":{"enabled":true,"nbf":1613501847,"exp":1645038447,"created":1613502448,"updated":1613502448,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-1/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"CN=MyCert","ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":13,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"EmailContacts"}}],"issuer":{"name":"Unknown"},"attributes":{"enabled":true,"created":1613502448,"updated":1613502448}}}, [
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
  '0ecc8aa6-3ef5-4d52-88f2-1cbc507f12b4',
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
  'Tue, 16 Feb 2021 19:07:37 GMT',
  'Content-Length',
  '2753'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-1')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-1"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '178',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  '780ca208-74c9-4868-a34c-a0a5c708abcd',
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
  'Tue, 16 Feb 2021 19:07:37 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-1')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-1"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '178',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  'a808569c-6fda-4885-b950-16c7406e3cd7',
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
  'Tue, 16 Feb 2021 19:07:37 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-1')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-1"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '178',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  '0c2d042c-c364-4517-a1cc-e46192af4b87',
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
  'Tue, 16 Feb 2021 19:07:39 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-1')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-1"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '178',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  '89898b89-b846-460b-b072-5e6ed0345ba4',
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
  'Tue, 16 Feb 2021 19:07:41 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-1')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-1"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '178',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  '76adcee5-356d-4e76-bd73-cf3526f349a1',
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
  'Tue, 16 Feb 2021 19:07:43 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-1')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-1"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '178',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  '80601097-fb17-4392-8c5c-207c837bf330',
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
  'Tue, 16 Feb 2021 19:07:45 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-1')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-1","deletedDate":1613502457,"scheduledPurgeDate":1614107257,"id":"https://keyvault_name.vault.azure.net/certificates/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-1/762d4cc414094944bf5dd26e4315533c","kid":"https://keyvault_name.vault.azure.net/keys/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-1/762d4cc414094944bf5dd26e4315533c","sid":"https://keyvault_name.vault.azure.net/secrets/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-1/762d4cc414094944bf5dd26e4315533c","x5t":"kNUBOf77e3lOc73-r6pIuwq1bkY","cer":"MIIDKDCCAhCgAwIBAgIQJyDqwC7wTaeGbuuSE1vrSDANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjEwMjE2MTg1NzI3WhcNMjIwMjE2MTkwNzI3WjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQDUzEsXpKfqXZYX6kW0QqtynZufZg2p+l5iktNi15adnf9dg3k/LccjD+ulQfk8h+ifa6gPPQ5ImuTxXYdY4/Uc1RIscV8+8rB2RkzzZu+y6RWxK7S4gw4TwgfAtWhQKTZDBq/2DUz5jyT7z74aGvQtvNOFMLnLXmnojP2KiG8jcMlPKCm6pmRFhYtEHUXT6WYvEX10ZfSr7frLRFj3eFWao7A8DR7GB4gWUyQWO8QoHIsMJftMVKMKPVq/b/2NdSgdKwK0BR1uquBsBwZEZpdBzg2fKCERSho6I115IyhCzEgz1vH/3lkDpBaKAkg6aM4B3U74PPMTjgz0wnzLagttAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBQjAADnowBzFOXYdrRkPlnZLoBYpTAdBgNVHQ4EFgQUIwAA56MAcxTl2Ha0ZD5Z2S6AWKUwDQYJKoZIhvcNAQELBQADggEBAEuAg57iteOvc6avlYo76M5nqLqFlnCwbwPEa6+F6kt1qqQJPWcIQ03xmYsw2Nb4daIpZ70FWiwLibSoVq5CaN0aGiEPrZPkkg5WbI1x2W2EuD+s+ZaRXW+45lpU1t7tFYwRdYdr8JzJayQjjpKmYYbTz6Z0rwLYIWBeny/Whv10JefksED+6SD14KcBt96Uh8fm6QGT/ITb0E6bNaChfSxCyL00+CbUwHaWsWzxkOKNBJde+53G6XHKDW97w48FHiJE19vHC9MBLyrHXjGAQKvVFIUo6ZEdMdr+cKzZYbqgN4QyT3gQEiBK0JudgMlG+3wnswuAj2HFjS0M9C/e+XE=","attributes":{"enabled":true,"nbf":1613501847,"exp":1645038447,"created":1613502448,"updated":1613502448,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-1/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"CN=MyCert","ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":13,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"EmailContacts"}}],"issuer":{"name":"Unknown"},"attributes":{"enabled":true,"created":1613502448,"updated":1613502448}}}, [
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
  'b99f6f51-24e0-4113-b6f9-4b405f4c50e0',
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
  'Tue, 16 Feb 2021 19:07:48 GMT',
  'Content-Length',
  '2753'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedcertificates/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-1')
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
  'ccbb875d-19d1-4151-b9ca-ab221cb4e83e',
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
  'Tue, 16 Feb 2021 19:07:47 GMT'
]);

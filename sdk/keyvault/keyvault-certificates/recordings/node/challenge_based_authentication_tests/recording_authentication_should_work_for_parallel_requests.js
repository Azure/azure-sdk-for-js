let nock = require('nock');

module.exports.hash = "1514b43686bf0d9329f118290a25f2dc";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--1/create')
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
  '092ba28a-2278-4347-b99e-2957eaece9d3',
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

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0/create')
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
  '64453b0f-9a79-4fdb-ab67-8607a4d23f30',
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
  'Thu, 25 Jun 2020 12:52:25 GMT'
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
  '78454d94-2e34-4b52-9cd7-0e4861a54301',
  'x-ms-ests-server',
  '2.1.10732.8 - WUS2 ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AmE0Zcfxl7RAm0w6SmW6SKM_aSJHAQAAAAiVhtYOAAAA; expires=Sat, 25-Jul-2020 12:52:25 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; SameSite=None; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; SameSite=None; secure; HttpOnly',
  'Date',
  'Thu, 25 Jun 2020 12:52:24 GMT',
  'Content-Length',
  '1315'
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
  '6c861f74-7212-4862-8a9d-8d8407a31d01',
  'x-ms-ests-server',
  '2.1.10732.8 - SCUS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AgHVhvVzKd9AvG1pvQ92lBc_aSJHAQAAAAmVhtYOAAAA; expires=Sat, 25-Jul-2020 12:52:25 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; SameSite=None; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; SameSite=None; secure; HttpOnly',
  'Date',
  'Thu, 25 Jun 2020 12:52:24 GMT',
  'Content-Length',
  '1315'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0/create', {"policy":{"key_props":{},"secret_props":{},"x509_props":{"subject":"cn=MyCert","sans":{}},"issuer":{"name":"Self"},"attributes":{}},"attributes":{}})
  .query(true)
  .reply(202, {"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAp21lmdumyD91rRXvQipjkfUyZOiILXZ6O3jMTF8thHtJv1+xtB+NZjD87E+BOC8VLpbXMNBZm9wdQetsS/tql0MQhEG24DUuxEo9d27IIawiqqP1F2OFFoP7/85IirKeZ1F2iOu5Sa7tfU4BW+CuFtEMFtGAWW5pKfr4Qhc4OxBjP8PXoZrIibVN09UJNiVvbx3bR/Os4KnpjSqYzXTixjN0gDqprdOAiZVaHOP8Fr/WXX+dgu93EcW396g7ftwQ6mVpPr9SW3BIuBwJrndO5s75YeDAV0xJZzm5NWzx86dyolZst3Xd+7Cb2mxezGNqtUJJ9ghV20ttbC7w3aXicwIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAFusVHPSBUSRlU/vYe2vdxML1hFEW1CeVf6+XNDYtydmqHVU3MmxqJDxi+mADIw8rgE/WNQ3GUpYYSGWS3n+ua1W8jBCxFmNjQo88Kt2JOXj2mGaB15IdVpUfK+sGZHWx5kbOhLn+QnZCFmFAtdmhq/QPOIl9zUWAMW2RBRMoQ5zW/f1QEjE+7qD5moRCinag28RJ8xNsRklHnnO7LjqXnqhO37jwzFoDgLdqTpZGr53zhZIgrIdcJrihP1aeEFBML2fUpSWOEoNpgwlj37S36Aih+qJArkeWKmmvCJz0EaiXB/y+o1268LF2oof0Dw/ISCp1Q3+j3G3DZQpk+q5NQg=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"686253e03d984277afe468020321e23b"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0/pending?api-version=7.1-preview&request_id=686253e03d984277afe468020321e23b',
  'Retry-After',
  '10',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'f312edd8-2b04-4a04-ab2d-66a6b39909fd',
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
  'Thu, 25 Jun 2020 12:52:26 GMT',
  'Content-Length',
  '1367'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--1/create', {"policy":{"key_props":{},"secret_props":{},"x509_props":{"subject":"cn=MyCert","sans":{}},"issuer":{"name":"Self"},"attributes":{}},"attributes":{}})
  .query(true)
  .reply(202, {"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--1/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAztgwdBfrFBH3cOl9FVVVChM857Kmv3/755MYfUx8ZcwD2PgpiFz1LEQQ9IrrsHWsSfy256A9jB8x4d6lzay8K7PC3cXR9CR8cxqA1qHzELl+Bq37DiQXsClzYRyzqIyPfTTKcvYsRB5+Gq2hI1XahZMr341f+PVjMuo/l16uVTfnHg5t2m0WW7+85JJhnGOireaHhmOunQ9BSg7LDOjeN8vMUzH7YBJ7MEgdpo6LSpsp6WPbCzz555DorVJ0oxlVgp30qlcR05zzEHGAyix3Mi0Ehe3tVRTpte6UgJpiT/JMaS3azQ4c5m1lNPxt6UB6AJPjh1dxJ8xeggYw7M2hUwIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAJ07Sfm9ExuDC72gXqnWftpipqU/vrbf3q84ROu/Jd7aQIyNPYwqg1f4C3sZtqHEZkBoW6zZ8d2YShnNEwZ6h4pnH6s+6Su0Chg8kChDKHcLSuf+AIZZIctDDoxn0GB0JSoaFLnLVHHrLxlVnVKTayF5f+7/Q0Sd7TMPehgSM3uF0n/hFKm5Srcu4MOC8wc5wWjKB7adY3zXvBdX6vYkoy198sy1QQnkET9BaK2UpGbK9ogtlqLTskUYuUC9ErTLab+I/00YQ7WVxWiqSiCSTZJVtNUh5+G4UQNQtlSvCm9lrfvEECEDhc+mKhNLffTE3I2Okj7//P7z7h4LKK3r0JQ=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"b7dd2907420240e08be643d4082de655"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--1/pending?api-version=7.1-preview&request_id=b7dd2907420240e08be643d4082de655',
  'Retry-After',
  '10',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'e32210a4-de9b-4a1d-9c83-bd0520955fb2',
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
  'Thu, 25 Jun 2020 12:52:26 GMT',
  'Content-Length',
  '1367'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAp21lmdumyD91rRXvQipjkfUyZOiILXZ6O3jMTF8thHtJv1+xtB+NZjD87E+BOC8VLpbXMNBZm9wdQetsS/tql0MQhEG24DUuxEo9d27IIawiqqP1F2OFFoP7/85IirKeZ1F2iOu5Sa7tfU4BW+CuFtEMFtGAWW5pKfr4Qhc4OxBjP8PXoZrIibVN09UJNiVvbx3bR/Os4KnpjSqYzXTixjN0gDqprdOAiZVaHOP8Fr/WXX+dgu93EcW396g7ftwQ6mVpPr9SW3BIuBwJrndO5s75YeDAV0xJZzm5NWzx86dyolZst3Xd+7Cb2mxezGNqtUJJ9ghV20ttbC7w3aXicwIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAFusVHPSBUSRlU/vYe2vdxML1hFEW1CeVf6+XNDYtydmqHVU3MmxqJDxi+mADIw8rgE/WNQ3GUpYYSGWS3n+ua1W8jBCxFmNjQo88Kt2JOXj2mGaB15IdVpUfK+sGZHWx5kbOhLn+QnZCFmFAtdmhq/QPOIl9zUWAMW2RBRMoQ5zW/f1QEjE+7qD5moRCinag28RJ8xNsRklHnnO7LjqXnqhO37jwzFoDgLdqTpZGr53zhZIgrIdcJrihP1aeEFBML2fUpSWOEoNpgwlj37S36Aih+qJArkeWKmmvCJz0EaiXB/y+o1268LF2oof0Dw/ISCp1Q3+j3G3DZQpk+q5NQg=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"686253e03d984277afe468020321e23b"}, [
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
  '5dc99321-e4a5-48ba-b03b-d111c7658699',
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
  'Thu, 25 Jun 2020 12:52:26 GMT',
  'Content-Length',
  '1367'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--1/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--1/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAztgwdBfrFBH3cOl9FVVVChM857Kmv3/755MYfUx8ZcwD2PgpiFz1LEQQ9IrrsHWsSfy256A9jB8x4d6lzay8K7PC3cXR9CR8cxqA1qHzELl+Bq37DiQXsClzYRyzqIyPfTTKcvYsRB5+Gq2hI1XahZMr341f+PVjMuo/l16uVTfnHg5t2m0WW7+85JJhnGOireaHhmOunQ9BSg7LDOjeN8vMUzH7YBJ7MEgdpo6LSpsp6WPbCzz555DorVJ0oxlVgp30qlcR05zzEHGAyix3Mi0Ehe3tVRTpte6UgJpiT/JMaS3azQ4c5m1lNPxt6UB6AJPjh1dxJ8xeggYw7M2hUwIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAJ07Sfm9ExuDC72gXqnWftpipqU/vrbf3q84ROu/Jd7aQIyNPYwqg1f4C3sZtqHEZkBoW6zZ8d2YShnNEwZ6h4pnH6s+6Su0Chg8kChDKHcLSuf+AIZZIctDDoxn0GB0JSoaFLnLVHHrLxlVnVKTayF5f+7/Q0Sd7TMPehgSM3uF0n/hFKm5Srcu4MOC8wc5wWjKB7adY3zXvBdX6vYkoy198sy1QQnkET9BaK2UpGbK9ogtlqLTskUYuUC9ErTLab+I/00YQ7WVxWiqSiCSTZJVtNUh5+G4UQNQtlSvCm9lrfvEECEDhc+mKhNLffTE3I2Okj7//P7z7h4LKK3r0JQ=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"b7dd2907420240e08be643d4082de655"}, [
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
  '35d9b6ad-a9df-425c-a8e8-709ce9ba286e',
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
  'Thu, 25 Jun 2020 12:52:26 GMT',
  'Content-Length',
  '1367'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAp21lmdumyD91rRXvQipjkfUyZOiILXZ6O3jMTF8thHtJv1+xtB+NZjD87E+BOC8VLpbXMNBZm9wdQetsS/tql0MQhEG24DUuxEo9d27IIawiqqP1F2OFFoP7/85IirKeZ1F2iOu5Sa7tfU4BW+CuFtEMFtGAWW5pKfr4Qhc4OxBjP8PXoZrIibVN09UJNiVvbx3bR/Os4KnpjSqYzXTixjN0gDqprdOAiZVaHOP8Fr/WXX+dgu93EcW396g7ftwQ6mVpPr9SW3BIuBwJrndO5s75YeDAV0xJZzm5NWzx86dyolZst3Xd+7Cb2mxezGNqtUJJ9ghV20ttbC7w3aXicwIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAFusVHPSBUSRlU/vYe2vdxML1hFEW1CeVf6+XNDYtydmqHVU3MmxqJDxi+mADIw8rgE/WNQ3GUpYYSGWS3n+ua1W8jBCxFmNjQo88Kt2JOXj2mGaB15IdVpUfK+sGZHWx5kbOhLn+QnZCFmFAtdmhq/QPOIl9zUWAMW2RBRMoQ5zW/f1QEjE+7qD5moRCinag28RJ8xNsRklHnnO7LjqXnqhO37jwzFoDgLdqTpZGr53zhZIgrIdcJrihP1aeEFBML2fUpSWOEoNpgwlj37S36Aih+qJArkeWKmmvCJz0EaiXB/y+o1268LF2oof0Dw/ISCp1Q3+j3G3DZQpk+q5NQg=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"686253e03d984277afe468020321e23b"}, [
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
  '25ea75e2-106e-4750-ad6f-3b44a578949f',
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
  'Thu, 25 Jun 2020 12:52:26 GMT',
  'Content-Length',
  '1367'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAp21lmdumyD91rRXvQipjkfUyZOiILXZ6O3jMTF8thHtJv1+xtB+NZjD87E+BOC8VLpbXMNBZm9wdQetsS/tql0MQhEG24DUuxEo9d27IIawiqqP1F2OFFoP7/85IirKeZ1F2iOu5Sa7tfU4BW+CuFtEMFtGAWW5pKfr4Qhc4OxBjP8PXoZrIibVN09UJNiVvbx3bR/Os4KnpjSqYzXTixjN0gDqprdOAiZVaHOP8Fr/WXX+dgu93EcW396g7ftwQ6mVpPr9SW3BIuBwJrndO5s75YeDAV0xJZzm5NWzx86dyolZst3Xd+7Cb2mxezGNqtUJJ9ghV20ttbC7w3aXicwIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAFusVHPSBUSRlU/vYe2vdxML1hFEW1CeVf6+XNDYtydmqHVU3MmxqJDxi+mADIw8rgE/WNQ3GUpYYSGWS3n+ua1W8jBCxFmNjQo88Kt2JOXj2mGaB15IdVpUfK+sGZHWx5kbOhLn+QnZCFmFAtdmhq/QPOIl9zUWAMW2RBRMoQ5zW/f1QEjE+7qD5moRCinag28RJ8xNsRklHnnO7LjqXnqhO37jwzFoDgLdqTpZGr53zhZIgrIdcJrihP1aeEFBML2fUpSWOEoNpgwlj37S36Aih+qJArkeWKmmvCJz0EaiXB/y+o1268LF2oof0Dw/ISCp1Q3+j3G3DZQpk+q5NQg=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"686253e03d984277afe468020321e23b"}, [
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
  '0b0be488-9138-4d45-9d04-24b6889cc6a7',
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
  'Thu, 25 Jun 2020 12:52:28 GMT',
  'Content-Length',
  '1367'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAp21lmdumyD91rRXvQipjkfUyZOiILXZ6O3jMTF8thHtJv1+xtB+NZjD87E+BOC8VLpbXMNBZm9wdQetsS/tql0MQhEG24DUuxEo9d27IIawiqqP1F2OFFoP7/85IirKeZ1F2iOu5Sa7tfU4BW+CuFtEMFtGAWW5pKfr4Qhc4OxBjP8PXoZrIibVN09UJNiVvbx3bR/Os4KnpjSqYzXTixjN0gDqprdOAiZVaHOP8Fr/WXX+dgu93EcW396g7ftwQ6mVpPr9SW3BIuBwJrndO5s75YeDAV0xJZzm5NWzx86dyolZst3Xd+7Cb2mxezGNqtUJJ9ghV20ttbC7w3aXicwIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAFusVHPSBUSRlU/vYe2vdxML1hFEW1CeVf6+XNDYtydmqHVU3MmxqJDxi+mADIw8rgE/WNQ3GUpYYSGWS3n+ua1W8jBCxFmNjQo88Kt2JOXj2mGaB15IdVpUfK+sGZHWx5kbOhLn+QnZCFmFAtdmhq/QPOIl9zUWAMW2RBRMoQ5zW/f1QEjE+7qD5moRCinag28RJ8xNsRklHnnO7LjqXnqhO37jwzFoDgLdqTpZGr53zhZIgrIdcJrihP1aeEFBML2fUpSWOEoNpgwlj37S36Aih+qJArkeWKmmvCJz0EaiXB/y+o1268LF2oof0Dw/ISCp1Q3+j3G3DZQpk+q5NQg=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"686253e03d984277afe468020321e23b"}, [
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
  '2dc34792-447b-447d-820c-1ec82e05e083',
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
  'Thu, 25 Jun 2020 12:52:29 GMT',
  'Content-Length',
  '1367'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAp21lmdumyD91rRXvQipjkfUyZOiILXZ6O3jMTF8thHtJv1+xtB+NZjD87E+BOC8VLpbXMNBZm9wdQetsS/tql0MQhEG24DUuxEo9d27IIawiqqP1F2OFFoP7/85IirKeZ1F2iOu5Sa7tfU4BW+CuFtEMFtGAWW5pKfr4Qhc4OxBjP8PXoZrIibVN09UJNiVvbx3bR/Os4KnpjSqYzXTixjN0gDqprdOAiZVaHOP8Fr/WXX+dgu93EcW396g7ftwQ6mVpPr9SW3BIuBwJrndO5s75YeDAV0xJZzm5NWzx86dyolZst3Xd+7Cb2mxezGNqtUJJ9ghV20ttbC7w3aXicwIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAFusVHPSBUSRlU/vYe2vdxML1hFEW1CeVf6+XNDYtydmqHVU3MmxqJDxi+mADIw8rgE/WNQ3GUpYYSGWS3n+ua1W8jBCxFmNjQo88Kt2JOXj2mGaB15IdVpUfK+sGZHWx5kbOhLn+QnZCFmFAtdmhq/QPOIl9zUWAMW2RBRMoQ5zW/f1QEjE+7qD5moRCinag28RJ8xNsRklHnnO7LjqXnqhO37jwzFoDgLdqTpZGr53zhZIgrIdcJrihP1aeEFBML2fUpSWOEoNpgwlj37S36Aih+qJArkeWKmmvCJz0EaiXB/y+o1268LF2oof0Dw/ISCp1Q3+j3G3DZQpk+q5NQg=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"686253e03d984277afe468020321e23b"}, [
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
  '77253f8a-143e-4814-ba29-dfd8401724b2',
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
  'Thu, 25 Jun 2020 12:52:32 GMT',
  'Content-Length',
  '1367'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAp21lmdumyD91rRXvQipjkfUyZOiILXZ6O3jMTF8thHtJv1+xtB+NZjD87E+BOC8VLpbXMNBZm9wdQetsS/tql0MQhEG24DUuxEo9d27IIawiqqP1F2OFFoP7/85IirKeZ1F2iOu5Sa7tfU4BW+CuFtEMFtGAWW5pKfr4Qhc4OxBjP8PXoZrIibVN09UJNiVvbx3bR/Os4KnpjSqYzXTixjN0gDqprdOAiZVaHOP8Fr/WXX+dgu93EcW396g7ftwQ6mVpPr9SW3BIuBwJrndO5s75YeDAV0xJZzm5NWzx86dyolZst3Xd+7Cb2mxezGNqtUJJ9ghV20ttbC7w3aXicwIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAFusVHPSBUSRlU/vYe2vdxML1hFEW1CeVf6+XNDYtydmqHVU3MmxqJDxi+mADIw8rgE/WNQ3GUpYYSGWS3n+ua1W8jBCxFmNjQo88Kt2JOXj2mGaB15IdVpUfK+sGZHWx5kbOhLn+QnZCFmFAtdmhq/QPOIl9zUWAMW2RBRMoQ5zW/f1QEjE+7qD5moRCinag28RJ8xNsRklHnnO7LjqXnqhO37jwzFoDgLdqTpZGr53zhZIgrIdcJrihP1aeEFBML2fUpSWOEoNpgwlj37S36Aih+qJArkeWKmmvCJz0EaiXB/y+o1268LF2oof0Dw/ISCp1Q3+j3G3DZQpk+q5NQg=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"686253e03d984277afe468020321e23b"}, [
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
  '043593e6-22b9-42c5-a725-c289ba6b45df',
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
  'Thu, 25 Jun 2020 12:52:33 GMT',
  'Content-Length',
  '1367'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAp21lmdumyD91rRXvQipjkfUyZOiILXZ6O3jMTF8thHtJv1+xtB+NZjD87E+BOC8VLpbXMNBZm9wdQetsS/tql0MQhEG24DUuxEo9d27IIawiqqP1F2OFFoP7/85IirKeZ1F2iOu5Sa7tfU4BW+CuFtEMFtGAWW5pKfr4Qhc4OxBjP8PXoZrIibVN09UJNiVvbx3bR/Os4KnpjSqYzXTixjN0gDqprdOAiZVaHOP8Fr/WXX+dgu93EcW396g7ftwQ6mVpPr9SW3BIuBwJrndO5s75YeDAV0xJZzm5NWzx86dyolZst3Xd+7Cb2mxezGNqtUJJ9ghV20ttbC7w3aXicwIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAFusVHPSBUSRlU/vYe2vdxML1hFEW1CeVf6+XNDYtydmqHVU3MmxqJDxi+mADIw8rgE/WNQ3GUpYYSGWS3n+ua1W8jBCxFmNjQo88Kt2JOXj2mGaB15IdVpUfK+sGZHWx5kbOhLn+QnZCFmFAtdmhq/QPOIl9zUWAMW2RBRMoQ5zW/f1QEjE+7qD5moRCinag28RJ8xNsRklHnnO7LjqXnqhO37jwzFoDgLdqTpZGr53zhZIgrIdcJrihP1aeEFBML2fUpSWOEoNpgwlj37S36Aih+qJArkeWKmmvCJz0EaiXB/y+o1268LF2oof0Dw/ISCp1Q3+j3G3DZQpk+q5NQg=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"686253e03d984277afe468020321e23b"}, [
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
  '2582b92a-a188-440e-b7d9-301d9a737aee',
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
  'Thu, 25 Jun 2020 12:52:36 GMT',
  'Content-Length',
  '1367'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAp21lmdumyD91rRXvQipjkfUyZOiILXZ6O3jMTF8thHtJv1+xtB+NZjD87E+BOC8VLpbXMNBZm9wdQetsS/tql0MQhEG24DUuxEo9d27IIawiqqP1F2OFFoP7/85IirKeZ1F2iOu5Sa7tfU4BW+CuFtEMFtGAWW5pKfr4Qhc4OxBjP8PXoZrIibVN09UJNiVvbx3bR/Os4KnpjSqYzXTixjN0gDqprdOAiZVaHOP8Fr/WXX+dgu93EcW396g7ftwQ6mVpPr9SW3BIuBwJrndO5s75YeDAV0xJZzm5NWzx86dyolZst3Xd+7Cb2mxezGNqtUJJ9ghV20ttbC7w3aXicwIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAFusVHPSBUSRlU/vYe2vdxML1hFEW1CeVf6+XNDYtydmqHVU3MmxqJDxi+mADIw8rgE/WNQ3GUpYYSGWS3n+ua1W8jBCxFmNjQo88Kt2JOXj2mGaB15IdVpUfK+sGZHWx5kbOhLn+QnZCFmFAtdmhq/QPOIl9zUWAMW2RBRMoQ5zW/f1QEjE+7qD5moRCinag28RJ8xNsRklHnnO7LjqXnqhO37jwzFoDgLdqTpZGr53zhZIgrIdcJrihP1aeEFBML2fUpSWOEoNpgwlj37S36Aih+qJArkeWKmmvCJz0EaiXB/y+o1268LF2oof0Dw/ISCp1Q3+j3G3DZQpk+q5NQg=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"686253e03d984277afe468020321e23b"}, [
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
  'd276e14c-ba8d-4f86-8139-dd47606ea6e7',
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
  'Thu, 25 Jun 2020 12:52:38 GMT',
  'Content-Length',
  '1367'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAp21lmdumyD91rRXvQipjkfUyZOiILXZ6O3jMTF8thHtJv1+xtB+NZjD87E+BOC8VLpbXMNBZm9wdQetsS/tql0MQhEG24DUuxEo9d27IIawiqqP1F2OFFoP7/85IirKeZ1F2iOu5Sa7tfU4BW+CuFtEMFtGAWW5pKfr4Qhc4OxBjP8PXoZrIibVN09UJNiVvbx3bR/Os4KnpjSqYzXTixjN0gDqprdOAiZVaHOP8Fr/WXX+dgu93EcW396g7ftwQ6mVpPr9SW3BIuBwJrndO5s75YeDAV0xJZzm5NWzx86dyolZst3Xd+7Cb2mxezGNqtUJJ9ghV20ttbC7w3aXicwIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAFusVHPSBUSRlU/vYe2vdxML1hFEW1CeVf6+XNDYtydmqHVU3MmxqJDxi+mADIw8rgE/WNQ3GUpYYSGWS3n+ua1W8jBCxFmNjQo88Kt2JOXj2mGaB15IdVpUfK+sGZHWx5kbOhLn+QnZCFmFAtdmhq/QPOIl9zUWAMW2RBRMoQ5zW/f1QEjE+7qD5moRCinag28RJ8xNsRklHnnO7LjqXnqhO37jwzFoDgLdqTpZGr53zhZIgrIdcJrihP1aeEFBML2fUpSWOEoNpgwlj37S36Aih+qJArkeWKmmvCJz0EaiXB/y+o1268LF2oof0Dw/ISCp1Q3+j3G3DZQpk+q5NQg=","cancellation_requested":false,"status":"completed","target":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0","request_id":"686253e03d984277afe468020321e23b"}, [
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
  '5a30fc94-0fab-4cbb-a83b-a55e3ebf1c7b',
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
  'Thu, 25 Jun 2020 12:52:40 GMT',
  'Content-Length',
  '1361'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0/')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0/e1a5b22142ea4be3b3de9eff0ac24322","kid":"https://keyvault_name.vault.azure.net/keys/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0/e1a5b22142ea4be3b3de9eff0ac24322","sid":"https://keyvault_name.vault.azure.net/secrets/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0/e1a5b22142ea4be3b3de9eff0ac24322","x5t":"2hTJljfOZyygCtbI0Nncw675FDw","cer":"MIIDKDCCAhCgAwIBAgIQNv6hqfdJTa+BMs+vNSywUDANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjAwNjI1MTI0MjM5WhcNMjEwNjI1MTI1MjM5WjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQCnbWWZ26bIP3WtFe9CKmOR9TJk6Igtdno7eMxMXy2Ee0m/X7G0H41mMPzsT4E4LxUultcw0Fmb3B1B62xL+2qXQxCEQbbgNS7ESj13bsghrCKqo/UXY4UWg/v/zkiKsp5nUXaI67lJru19TgFb4K4W0QwW0YBZbmkp+vhCFzg7EGM/w9ehmsiJtU3T1Qk2JW9vHdtH86zgqemNKpjNdOLGM3SAOqmt04CJlVoc4/wWv9Zdf52C73cRxbf3qDt+3BDqZWk+v1JbcEi4HAmud07mzvlh4MBXTElnObk1bPHzp3KiVmy3dd37sJvabF7MY2q1Qkn2CFXbS21sLvDdpeJzAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBQXX9lRoeUULu41/0G+xocGWlSCRjAdBgNVHQ4EFgQUF1/ZUaHlFC7uNf9BvsaHBlpUgkYwDQYJKoZIhvcNAQELBQADggEBAFNP/SlDC8oVqph0MdyMAstqehwyClyWhGxk6z9TwoN8LOH2xbH0Qwq3Qa3MTMZTu2cG1UhVO9SUvA89IODAbhOoCKdkgHmwR7Edtn8msZuGqeU39xGp7f3Z8dg3aptAt00VR4U6wRQlCAPLN5HNGmNHD62428mPBRavmMCUhiXk/7Vgg34TXohlB0sd3rl9d2sxrJpOL87+iFrBD2Oso/Mzn245Z6z/zndOTMDQZyKt6DgMEb+XiMHQo42F87Ocro7NC4jY9W6stdZpehxjpdtaGpoYmK7342nJp984NDLEnAaMFZGgFwKsyBEmdlEUS1WJT157xZrsYZkN9aAUO+M=","attributes":{"enabled":true,"nbf":1593088959,"exp":1624625559,"created":1593089559,"updated":1593089559,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1593089546,"updated":1593089546}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0/pending"}}, [
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
  '13b97644-1103-4fc1-be6b-0612f90d2d2e',
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
  'Thu, 25 Jun 2020 12:52:40 GMT',
  'Content-Length',
  '2725'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0","deletedDate":1593089561,"scheduledPurgeDate":1600865561,"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0/e1a5b22142ea4be3b3de9eff0ac24322","kid":"https://keyvault_name.vault.azure.net/keys/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0/e1a5b22142ea4be3b3de9eff0ac24322","sid":"https://keyvault_name.vault.azure.net/secrets/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0/e1a5b22142ea4be3b3de9eff0ac24322","x5t":"2hTJljfOZyygCtbI0Nncw675FDw","cer":"MIIDKDCCAhCgAwIBAgIQNv6hqfdJTa+BMs+vNSywUDANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjAwNjI1MTI0MjM5WhcNMjEwNjI1MTI1MjM5WjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQCnbWWZ26bIP3WtFe9CKmOR9TJk6Igtdno7eMxMXy2Ee0m/X7G0H41mMPzsT4E4LxUultcw0Fmb3B1B62xL+2qXQxCEQbbgNS7ESj13bsghrCKqo/UXY4UWg/v/zkiKsp5nUXaI67lJru19TgFb4K4W0QwW0YBZbmkp+vhCFzg7EGM/w9ehmsiJtU3T1Qk2JW9vHdtH86zgqemNKpjNdOLGM3SAOqmt04CJlVoc4/wWv9Zdf52C73cRxbf3qDt+3BDqZWk+v1JbcEi4HAmud07mzvlh4MBXTElnObk1bPHzp3KiVmy3dd37sJvabF7MY2q1Qkn2CFXbS21sLvDdpeJzAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBQXX9lRoeUULu41/0G+xocGWlSCRjAdBgNVHQ4EFgQUF1/ZUaHlFC7uNf9BvsaHBlpUgkYwDQYJKoZIhvcNAQELBQADggEBAFNP/SlDC8oVqph0MdyMAstqehwyClyWhGxk6z9TwoN8LOH2xbH0Qwq3Qa3MTMZTu2cG1UhVO9SUvA89IODAbhOoCKdkgHmwR7Edtn8msZuGqeU39xGp7f3Z8dg3aptAt00VR4U6wRQlCAPLN5HNGmNHD62428mPBRavmMCUhiXk/7Vgg34TXohlB0sd3rl9d2sxrJpOL87+iFrBD2Oso/Mzn245Z6z/zndOTMDQZyKt6DgMEb+XiMHQo42F87Ocro7NC4jY9W6stdZpehxjpdtaGpoYmK7342nJp984NDLEnAaMFZGgFwKsyBEmdlEUS1WJT157xZrsYZkN9aAUO+M=","attributes":{"enabled":true,"nbf":1593088959,"exp":1624625559,"created":1593089559,"updated":1593089559,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1593089546,"updated":1593089546}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0/pending"}}, [
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
  '7321eab5-e2d9-4827-bccb-a5e738182d64',
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
  'Thu, 25 Jun 2020 12:52:40 GMT',
  'Content-Length',
  '2952'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '175',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'dd892160-42b4-4179-8196-93f505a0b6eb',
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
  'Thu, 25 Jun 2020 12:52:40 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '175',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '95fe2f7b-51f4-492d-8773-b87bb8cfcf8a',
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
  'Thu, 25 Jun 2020 12:52:40 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '175',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '5ed8d53b-ffc8-429c-be51-6c7cf41c1c83',
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
  'Thu, 25 Jun 2020 12:52:42 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '175',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'b810c8a0-bfbc-4af5-b2d9-5a2f25a11136',
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
  'Thu, 25 Jun 2020 12:52:44 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '175',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'ab92f141-da87-4c9a-ac44-44d0ac5b3ee9',
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
  'Thu, 25 Jun 2020 12:52:47 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '175',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '17ff9ce4-abc4-4cde-8029-9c75623787b8',
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
  'Thu, 25 Jun 2020 12:52:49 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '175',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'f95bb768-32a8-4054-802e-0f1790b4f057',
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
  'Thu, 25 Jun 2020 12:52:50 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '175',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '15ab8cce-3d25-44ea-b360-46fd9c6f7495',
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
  'Thu, 25 Jun 2020 12:52:52 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '175',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'ceb908a4-701c-4320-a10b-b6a76568bea0',
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
  'Thu, 25 Jun 2020 12:52:55 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '175',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'a77de976-cedd-43d6-8df7-0bc97e8e0937',
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
  'Thu, 25 Jun 2020 12:52:57 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '175',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '3ef81394-d789-40a5-ba3c-d53e13fb8e58',
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
  'Thu, 25 Jun 2020 12:52:58 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0","deletedDate":1593089561,"scheduledPurgeDate":1600865561,"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0/e1a5b22142ea4be3b3de9eff0ac24322","kid":"https://keyvault_name.vault.azure.net/keys/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0/e1a5b22142ea4be3b3de9eff0ac24322","sid":"https://keyvault_name.vault.azure.net/secrets/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0/e1a5b22142ea4be3b3de9eff0ac24322","x5t":"2hTJljfOZyygCtbI0Nncw675FDw","cer":"MIIDKDCCAhCgAwIBAgIQNv6hqfdJTa+BMs+vNSywUDANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjAwNjI1MTI0MjM5WhcNMjEwNjI1MTI1MjM5WjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQCnbWWZ26bIP3WtFe9CKmOR9TJk6Igtdno7eMxMXy2Ee0m/X7G0H41mMPzsT4E4LxUultcw0Fmb3B1B62xL+2qXQxCEQbbgNS7ESj13bsghrCKqo/UXY4UWg/v/zkiKsp5nUXaI67lJru19TgFb4K4W0QwW0YBZbmkp+vhCFzg7EGM/w9ehmsiJtU3T1Qk2JW9vHdtH86zgqemNKpjNdOLGM3SAOqmt04CJlVoc4/wWv9Zdf52C73cRxbf3qDt+3BDqZWk+v1JbcEi4HAmud07mzvlh4MBXTElnObk1bPHzp3KiVmy3dd37sJvabF7MY2q1Qkn2CFXbS21sLvDdpeJzAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBQXX9lRoeUULu41/0G+xocGWlSCRjAdBgNVHQ4EFgQUF1/ZUaHlFC7uNf9BvsaHBlpUgkYwDQYJKoZIhvcNAQELBQADggEBAFNP/SlDC8oVqph0MdyMAstqehwyClyWhGxk6z9TwoN8LOH2xbH0Qwq3Qa3MTMZTu2cG1UhVO9SUvA89IODAbhOoCKdkgHmwR7Edtn8msZuGqeU39xGp7f3Z8dg3aptAt00VR4U6wRQlCAPLN5HNGmNHD62428mPBRavmMCUhiXk/7Vgg34TXohlB0sd3rl9d2sxrJpOL87+iFrBD2Oso/Mzn245Z6z/zndOTMDQZyKt6DgMEb+XiMHQo42F87Ocro7NC4jY9W6stdZpehxjpdtaGpoYmK7342nJp984NDLEnAaMFZGgFwKsyBEmdlEUS1WJT157xZrsYZkN9aAUO+M=","attributes":{"enabled":true,"nbf":1593088959,"exp":1624625559,"created":1593089559,"updated":1593089559,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1593089546,"updated":1593089546}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0/pending"}}, [
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
  '619a293d-2739-4f5b-a542-8af34ab943ac',
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
  'Thu, 25 Jun 2020 12:53:01 GMT',
  'Content-Length',
  '2952'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedcertificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0')
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
  'aacef99c-f52c-4312-bcfe-70c74dc5cd63',
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
  'Thu, 25 Jun 2020 12:53:01 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--1/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--1/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAztgwdBfrFBH3cOl9FVVVChM857Kmv3/755MYfUx8ZcwD2PgpiFz1LEQQ9IrrsHWsSfy256A9jB8x4d6lzay8K7PC3cXR9CR8cxqA1qHzELl+Bq37DiQXsClzYRyzqIyPfTTKcvYsRB5+Gq2hI1XahZMr341f+PVjMuo/l16uVTfnHg5t2m0WW7+85JJhnGOireaHhmOunQ9BSg7LDOjeN8vMUzH7YBJ7MEgdpo6LSpsp6WPbCzz555DorVJ0oxlVgp30qlcR05zzEHGAyix3Mi0Ehe3tVRTpte6UgJpiT/JMaS3azQ4c5m1lNPxt6UB6AJPjh1dxJ8xeggYw7M2hUwIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAJ07Sfm9ExuDC72gXqnWftpipqU/vrbf3q84ROu/Jd7aQIyNPYwqg1f4C3sZtqHEZkBoW6zZ8d2YShnNEwZ6h4pnH6s+6Su0Chg8kChDKHcLSuf+AIZZIctDDoxn0GB0JSoaFLnLVHHrLxlVnVKTayF5f+7/Q0Sd7TMPehgSM3uF0n/hFKm5Srcu4MOC8wc5wWjKB7adY3zXvBdX6vYkoy198sy1QQnkET9BaK2UpGbK9ogtlqLTskUYuUC9ErTLab+I/00YQ7WVxWiqSiCSTZJVtNUh5+G4UQNQtlSvCm9lrfvEECEDhc+mKhNLffTE3I2Okj7//P7z7h4LKK3r0JQ=","cancellation_requested":false,"status":"completed","target":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--1","request_id":"b7dd2907420240e08be643d4082de655"}, [
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
  '90c07064-9c0d-49a6-b927-d68ae8d1253f',
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
  'Thu, 25 Jun 2020 12:53:01 GMT',
  'Content-Length',
  '1361'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--1/')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--1/1bcf5ea1f08e400eb969e41f8724a781","kid":"https://keyvault_name.vault.azure.net/keys/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--1/1bcf5ea1f08e400eb969e41f8724a781","sid":"https://keyvault_name.vault.azure.net/secrets/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--1/1bcf5ea1f08e400eb969e41f8724a781","x5t":"OSNkL6W5xU7BBt9kevTOCY3HJhQ","cer":"MIIDKDCCAhCgAwIBAgIQF60HXUvZR1+X1Gg97ziLdjANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjAwNjI1MTI0MjM5WhcNMjEwNjI1MTI1MjM5WjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQDO2DB0F+sUEfdw6X0VVVUKEzznsqa/f/vnkxh9THxlzAPY+CmIXPUsRBD0iuuwdaxJ/LbnoD2MHzHh3qXNrLwrs8LdxdH0JHxzGoDWofMQuX4GrfsOJBewKXNhHLOojI99NMpy9ixEHn4araEjVdqFkyvfjV/49WMy6j+XXq5VN+ceDm3abRZbv7zkkmGcY6Kt5oeGY66dD0FKDssM6N43y8xTMftgEnswSB2mjotKmynpY9sLPPnnkOitUnSjGVWCnfSqVxHTnPMQcYDKLHcyLQSF7e1VFOm17pSAmmJP8kxpLdrNDhzmbWU0/G3pQHoAk+OHV3EnzF6CBjDszaFTAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBQI477dlMG2UIRv1kykTCkkM9WxOzAdBgNVHQ4EFgQUCOO+3ZTBtlCEb9ZMpEwpJDPVsTswDQYJKoZIhvcNAQELBQADggEBAIma63hmkDq/kSgLsW99iXYE9OrUAzNcBrlz//yC/qrJrHV6sh+UT1+koEVb2v5n81cEb3Ai8Y6SbmgHJc8RC+Wap15xO6Eh1lYVwZN6Yt11E0Pye7MBxyS7yZZ4V7fXT5PuFA01p1nGbX+txbww8DypPBOa0LE2egK9iR8tyuWGaeSA/ZKzSEytPkmJAEjC9Mvu5cdB21qcAuncs0WFFxtubW2/n6Rs2FSci99NwJSM1FnCnUkaOwroOC0Echj9Nr0CVGFLeUrAafIs5q+r7SU1V8snFLoxs+CFWdIXKWWIidMXQEpgaNynCP0tGhj7ljyCXDgGExrRPp0u6dryO5w=","attributes":{"enabled":true,"nbf":1593088959,"exp":1624625559,"created":1593089560,"updated":1593089560,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--1/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1593089546,"updated":1593089546}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--1/pending"}}, [
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
  'a85f79cf-c567-45bc-b098-3344caafea4f',
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
  'Thu, 25 Jun 2020 12:53:01 GMT',
  'Content-Length',
  '2725'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--1')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--1","deletedDate":1593089581,"scheduledPurgeDate":1600865581,"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--1/1bcf5ea1f08e400eb969e41f8724a781","kid":"https://keyvault_name.vault.azure.net/keys/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--1/1bcf5ea1f08e400eb969e41f8724a781","sid":"https://keyvault_name.vault.azure.net/secrets/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--1/1bcf5ea1f08e400eb969e41f8724a781","x5t":"OSNkL6W5xU7BBt9kevTOCY3HJhQ","cer":"MIIDKDCCAhCgAwIBAgIQF60HXUvZR1+X1Gg97ziLdjANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjAwNjI1MTI0MjM5WhcNMjEwNjI1MTI1MjM5WjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQDO2DB0F+sUEfdw6X0VVVUKEzznsqa/f/vnkxh9THxlzAPY+CmIXPUsRBD0iuuwdaxJ/LbnoD2MHzHh3qXNrLwrs8LdxdH0JHxzGoDWofMQuX4GrfsOJBewKXNhHLOojI99NMpy9ixEHn4araEjVdqFkyvfjV/49WMy6j+XXq5VN+ceDm3abRZbv7zkkmGcY6Kt5oeGY66dD0FKDssM6N43y8xTMftgEnswSB2mjotKmynpY9sLPPnnkOitUnSjGVWCnfSqVxHTnPMQcYDKLHcyLQSF7e1VFOm17pSAmmJP8kxpLdrNDhzmbWU0/G3pQHoAk+OHV3EnzF6CBjDszaFTAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBQI477dlMG2UIRv1kykTCkkM9WxOzAdBgNVHQ4EFgQUCOO+3ZTBtlCEb9ZMpEwpJDPVsTswDQYJKoZIhvcNAQELBQADggEBAIma63hmkDq/kSgLsW99iXYE9OrUAzNcBrlz//yC/qrJrHV6sh+UT1+koEVb2v5n81cEb3Ai8Y6SbmgHJc8RC+Wap15xO6Eh1lYVwZN6Yt11E0Pye7MBxyS7yZZ4V7fXT5PuFA01p1nGbX+txbww8DypPBOa0LE2egK9iR8tyuWGaeSA/ZKzSEytPkmJAEjC9Mvu5cdB21qcAuncs0WFFxtubW2/n6Rs2FSci99NwJSM1FnCnUkaOwroOC0Echj9Nr0CVGFLeUrAafIs5q+r7SU1V8snFLoxs+CFWdIXKWWIidMXQEpgaNynCP0tGhj7ljyCXDgGExrRPp0u6dryO5w=","attributes":{"enabled":true,"nbf":1593088959,"exp":1624625559,"created":1593089560,"updated":1593089560,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--1/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1593089546,"updated":1593089546}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--1/pending"}}, [
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
  '5125468a-13fa-4465-9870-dbf0b9ba889e',
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
  'Thu, 25 Jun 2020 12:53:01 GMT',
  'Content-Length',
  '2952'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--1')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--1"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '175',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '367af1d1-c38e-4442-b95b-d43816e8e7f4',
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
  'Thu, 25 Jun 2020 12:53:01 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--1')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--1"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '175',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'c3a235eb-d9d5-477c-8744-d509b42150a7',
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
  'Thu, 25 Jun 2020 12:53:01 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--1')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--1"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '175',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '882c8e04-a879-499a-b102-00d2585ff658',
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
  'Thu, 25 Jun 2020 12:53:03 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--1')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--1"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '175',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'cdb8bc7c-4b2e-43f0-adcb-0e02d6c904bf',
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
  'Thu, 25 Jun 2020 12:53:05 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--1')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--1"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '175',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '5d537d7e-40f4-4fdc-a86d-ae04891200be',
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
  'Thu, 25 Jun 2020 12:53:08 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--1')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--1"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '175',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '1baad84d-cfc5-40a5-8e3d-6c748188992a',
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
  'Thu, 25 Jun 2020 12:53:10 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--1')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--1"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '175',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '953e22c3-e991-4fa2-9b21-6597f0d86692',
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
  'Thu, 25 Jun 2020 12:53:12 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--1')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--1"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '175',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '607af6cd-72a1-4878-915c-85a1ba6bf5ba',
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
  'Thu, 25 Jun 2020 12:53:14 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--1')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--1","deletedDate":1593089581,"scheduledPurgeDate":1600865581,"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--1/1bcf5ea1f08e400eb969e41f8724a781","kid":"https://keyvault_name.vault.azure.net/keys/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--1/1bcf5ea1f08e400eb969e41f8724a781","sid":"https://keyvault_name.vault.azure.net/secrets/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--1/1bcf5ea1f08e400eb969e41f8724a781","x5t":"OSNkL6W5xU7BBt9kevTOCY3HJhQ","cer":"MIIDKDCCAhCgAwIBAgIQF60HXUvZR1+X1Gg97ziLdjANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjAwNjI1MTI0MjM5WhcNMjEwNjI1MTI1MjM5WjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQDO2DB0F+sUEfdw6X0VVVUKEzznsqa/f/vnkxh9THxlzAPY+CmIXPUsRBD0iuuwdaxJ/LbnoD2MHzHh3qXNrLwrs8LdxdH0JHxzGoDWofMQuX4GrfsOJBewKXNhHLOojI99NMpy9ixEHn4araEjVdqFkyvfjV/49WMy6j+XXq5VN+ceDm3abRZbv7zkkmGcY6Kt5oeGY66dD0FKDssM6N43y8xTMftgEnswSB2mjotKmynpY9sLPPnnkOitUnSjGVWCnfSqVxHTnPMQcYDKLHcyLQSF7e1VFOm17pSAmmJP8kxpLdrNDhzmbWU0/G3pQHoAk+OHV3EnzF6CBjDszaFTAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBQI477dlMG2UIRv1kykTCkkM9WxOzAdBgNVHQ4EFgQUCOO+3ZTBtlCEb9ZMpEwpJDPVsTswDQYJKoZIhvcNAQELBQADggEBAIma63hmkDq/kSgLsW99iXYE9OrUAzNcBrlz//yC/qrJrHV6sh+UT1+koEVb2v5n81cEb3Ai8Y6SbmgHJc8RC+Wap15xO6Eh1lYVwZN6Yt11E0Pye7MBxyS7yZZ4V7fXT5PuFA01p1nGbX+txbww8DypPBOa0LE2egK9iR8tyuWGaeSA/ZKzSEytPkmJAEjC9Mvu5cdB21qcAuncs0WFFxtubW2/n6Rs2FSci99NwJSM1FnCnUkaOwroOC0Echj9Nr0CVGFLeUrAafIs5q+r7SU1V8snFLoxs+CFWdIXKWWIidMXQEpgaNynCP0tGhj7ljyCXDgGExrRPp0u6dryO5w=","attributes":{"enabled":true,"nbf":1593088959,"exp":1624625559,"created":1593089560,"updated":1593089560,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--1/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1593089546,"updated":1593089546}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--1/pending"}}, [
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
  '964951ec-4621-48bb-986c-a68e49bb2167',
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
  'Thu, 25 Jun 2020 12:53:15 GMT',
  'Content-Length',
  '2952'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedcertificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--1')
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
  '9d6cec67-adf9-4abb-9127-238d4e28432f',
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
  'Thu, 25 Jun 2020 12:53:16 GMT'
]);

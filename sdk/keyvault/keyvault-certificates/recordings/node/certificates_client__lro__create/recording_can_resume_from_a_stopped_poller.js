let nock = require('nock');

module.exports.hash = "132e3c380d32f3862ce3b54e17dd6023";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/certificates/lroCreateCertificateName-canresumefromastoppedpoller-/create')
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
  'd36a03da-dfb5-4c57-92e8-bee73b7e7800',
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
  'Tue, 16 Feb 2021 19:03:47 GMT'
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
  '2359f81e-f21c-4205-8931-1bec464cf200',
  'x-ms-ests-server',
  '2.1.11496.5 - SCUS ProdSlices',
  'Set-Cookie',
  'fpc=AufoSEQpIbxLjzJaYLa_pBMA4qsDDwAAAE0NvtcOAAAA; expires=Thu, 18-Mar-2021 19:03:47 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 16 Feb 2021 19:03:47 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/certificates/lroCreateCertificateName-canresumefromastoppedpoller-/create', {"policy":{"key_props":{},"secret_props":{},"x509_props":{"subject":"cn=MyCert","sans":{}},"issuer":{"name":"Self"},"attributes":{}},"attributes":{}})
  .query(true)
  .reply(202, {"id":"https://keyvault_name.vault.azure.net/certificates/lroCreateCertificateName-canresumefromastoppedpoller-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA7D6tYrbl/wX2Q3GQjSwisbGNn6zJKXrDgmO2frKC60rDwBw3d1U3h86qNhSyeG+WKhp0R4Lo01sNS0Eenjv02CawF4iSYfHB82RUhC8rr7hboe0NQ7XmcLHbhQ6Z6bqZTltJRZBOMUP7biZGP9xd1hub046d3chxikLPQrxktWLFV+5zjyRL7wTj61/0ImWG4W/hsJru9ztBMg39hr6HUNIMgy+wWSiljZV3Z1l615241/+EFgk1BiyFvoQuZz2k27CNy/6WybTsKOz7fdETRJg+7CDhjv3dbyGG489pc+ZvudcFf0zGMoM3shAPx+ii3j8wBx0GGXchnZzjPhAaWQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBACUf37y1pfI550dv+CpwTYbxJxQdOxXd2LGTLxeBjin1gCBPGPvHawo7YBTVDYzQvKuBSCUeeY3s8TQUTo10U0Jm0Y45MaM5PPvjwF4CTb4fxdxsYn2fBebrdDAL7Hy5Rru/chRgybbxHoSoDR0wrV2gBZ2c96hC3HD5iey5mMt5X2XelbR7wI278HlsCeltt5fXiAlPXKpr4UepeZ2IAkbG3Ldy+rAxQjYevP9WQNNkQmJdxwFZhei36R2OGGc6Z0HAKfxRyQAKjhEFi2WBs4+MQn2Rmd0wt4syvU2KxvAq2Ku8AyKM3YTXJYCpfvhAy9B89QUV+f9Q5evR4QGkeIE=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"02e53049d5f4418c8624732f86f7ad21"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://keyvault_name.vault.azure.net/certificates/lroCreateCertificateName-canresumefromastoppedpoller-/pending?api-version=7.2&request_id=02e53049d5f4418c8624732f86f7ad21',
  'Retry-After',
  '10',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  '685d95af-f40a-4555-bd94-9b7a86b3ea51',
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
  'Tue, 16 Feb 2021 19:03:48 GMT',
  'Content-Length',
  '1337'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroCreateCertificateName-canresumefromastoppedpoller-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroCreateCertificateName-canresumefromastoppedpoller-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA7D6tYrbl/wX2Q3GQjSwisbGNn6zJKXrDgmO2frKC60rDwBw3d1U3h86qNhSyeG+WKhp0R4Lo01sNS0Eenjv02CawF4iSYfHB82RUhC8rr7hboe0NQ7XmcLHbhQ6Z6bqZTltJRZBOMUP7biZGP9xd1hub046d3chxikLPQrxktWLFV+5zjyRL7wTj61/0ImWG4W/hsJru9ztBMg39hr6HUNIMgy+wWSiljZV3Z1l615241/+EFgk1BiyFvoQuZz2k27CNy/6WybTsKOz7fdETRJg+7CDhjv3dbyGG489pc+ZvudcFf0zGMoM3shAPx+ii3j8wBx0GGXchnZzjPhAaWQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBACUf37y1pfI550dv+CpwTYbxJxQdOxXd2LGTLxeBjin1gCBPGPvHawo7YBTVDYzQvKuBSCUeeY3s8TQUTo10U0Jm0Y45MaM5PPvjwF4CTb4fxdxsYn2fBebrdDAL7Hy5Rru/chRgybbxHoSoDR0wrV2gBZ2c96hC3HD5iey5mMt5X2XelbR7wI278HlsCeltt5fXiAlPXKpr4UepeZ2IAkbG3Ldy+rAxQjYevP9WQNNkQmJdxwFZhei36R2OGGc6Z0HAKfxRyQAKjhEFi2WBs4+MQn2Rmd0wt4syvU2KxvAq2Ku8AyKM3YTXJYCpfvhAy9B89QUV+f9Q5evR4QGkeIE=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"02e53049d5f4418c8624732f86f7ad21"}, [
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
  '909cd1e8-cf7c-44e6-9393-9284429368f4',
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
  'Tue, 16 Feb 2021 19:03:48 GMT',
  'Content-Length',
  '1337'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroCreateCertificateName-canresumefromastoppedpoller-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroCreateCertificateName-canresumefromastoppedpoller-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA7D6tYrbl/wX2Q3GQjSwisbGNn6zJKXrDgmO2frKC60rDwBw3d1U3h86qNhSyeG+WKhp0R4Lo01sNS0Eenjv02CawF4iSYfHB82RUhC8rr7hboe0NQ7XmcLHbhQ6Z6bqZTltJRZBOMUP7biZGP9xd1hub046d3chxikLPQrxktWLFV+5zjyRL7wTj61/0ImWG4W/hsJru9ztBMg39hr6HUNIMgy+wWSiljZV3Z1l615241/+EFgk1BiyFvoQuZz2k27CNy/6WybTsKOz7fdETRJg+7CDhjv3dbyGG489pc+ZvudcFf0zGMoM3shAPx+ii3j8wBx0GGXchnZzjPhAaWQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBACUf37y1pfI550dv+CpwTYbxJxQdOxXd2LGTLxeBjin1gCBPGPvHawo7YBTVDYzQvKuBSCUeeY3s8TQUTo10U0Jm0Y45MaM5PPvjwF4CTb4fxdxsYn2fBebrdDAL7Hy5Rru/chRgybbxHoSoDR0wrV2gBZ2c96hC3HD5iey5mMt5X2XelbR7wI278HlsCeltt5fXiAlPXKpr4UepeZ2IAkbG3Ldy+rAxQjYevP9WQNNkQmJdxwFZhei36R2OGGc6Z0HAKfxRyQAKjhEFi2WBs4+MQn2Rmd0wt4syvU2KxvAq2Ku8AyKM3YTXJYCpfvhAy9B89QUV+f9Q5evR4QGkeIE=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"02e53049d5f4418c8624732f86f7ad21"}, [
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
  'c4e00dfd-071d-421a-bbbe-777e5d09916c',
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
  'Tue, 16 Feb 2021 19:03:48 GMT',
  'Content-Length',
  '1337'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroCreateCertificateName-canresumefromastoppedpoller-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroCreateCertificateName-canresumefromastoppedpoller-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA7D6tYrbl/wX2Q3GQjSwisbGNn6zJKXrDgmO2frKC60rDwBw3d1U3h86qNhSyeG+WKhp0R4Lo01sNS0Eenjv02CawF4iSYfHB82RUhC8rr7hboe0NQ7XmcLHbhQ6Z6bqZTltJRZBOMUP7biZGP9xd1hub046d3chxikLPQrxktWLFV+5zjyRL7wTj61/0ImWG4W/hsJru9ztBMg39hr6HUNIMgy+wWSiljZV3Z1l615241/+EFgk1BiyFvoQuZz2k27CNy/6WybTsKOz7fdETRJg+7CDhjv3dbyGG489pc+ZvudcFf0zGMoM3shAPx+ii3j8wBx0GGXchnZzjPhAaWQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBACUf37y1pfI550dv+CpwTYbxJxQdOxXd2LGTLxeBjin1gCBPGPvHawo7YBTVDYzQvKuBSCUeeY3s8TQUTo10U0Jm0Y45MaM5PPvjwF4CTb4fxdxsYn2fBebrdDAL7Hy5Rru/chRgybbxHoSoDR0wrV2gBZ2c96hC3HD5iey5mMt5X2XelbR7wI278HlsCeltt5fXiAlPXKpr4UepeZ2IAkbG3Ldy+rAxQjYevP9WQNNkQmJdxwFZhei36R2OGGc6Z0HAKfxRyQAKjhEFi2WBs4+MQn2Rmd0wt4syvU2KxvAq2Ku8AyKM3YTXJYCpfvhAy9B89QUV+f9Q5evR4QGkeIE=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"02e53049d5f4418c8624732f86f7ad21"}, [
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
  'e2591a10-276a-4bb9-b2cd-a6a2df2abd69',
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
  'Tue, 16 Feb 2021 19:03:48 GMT',
  'Content-Length',
  '1337'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroCreateCertificateName-canresumefromastoppedpoller-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroCreateCertificateName-canresumefromastoppedpoller-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA7D6tYrbl/wX2Q3GQjSwisbGNn6zJKXrDgmO2frKC60rDwBw3d1U3h86qNhSyeG+WKhp0R4Lo01sNS0Eenjv02CawF4iSYfHB82RUhC8rr7hboe0NQ7XmcLHbhQ6Z6bqZTltJRZBOMUP7biZGP9xd1hub046d3chxikLPQrxktWLFV+5zjyRL7wTj61/0ImWG4W/hsJru9ztBMg39hr6HUNIMgy+wWSiljZV3Z1l615241/+EFgk1BiyFvoQuZz2k27CNy/6WybTsKOz7fdETRJg+7CDhjv3dbyGG489pc+ZvudcFf0zGMoM3shAPx+ii3j8wBx0GGXchnZzjPhAaWQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBACUf37y1pfI550dv+CpwTYbxJxQdOxXd2LGTLxeBjin1gCBPGPvHawo7YBTVDYzQvKuBSCUeeY3s8TQUTo10U0Jm0Y45MaM5PPvjwF4CTb4fxdxsYn2fBebrdDAL7Hy5Rru/chRgybbxHoSoDR0wrV2gBZ2c96hC3HD5iey5mMt5X2XelbR7wI278HlsCeltt5fXiAlPXKpr4UepeZ2IAkbG3Ldy+rAxQjYevP9WQNNkQmJdxwFZhei36R2OGGc6Z0HAKfxRyQAKjhEFi2WBs4+MQn2Rmd0wt4syvU2KxvAq2Ku8AyKM3YTXJYCpfvhAy9B89QUV+f9Q5evR4QGkeIE=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"02e53049d5f4418c8624732f86f7ad21"}, [
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
  'a9f4b0d5-75bc-4bc0-aede-fbe211d08fc7',
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
  'Tue, 16 Feb 2021 19:03:48 GMT',
  'Content-Length',
  '1337'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroCreateCertificateName-canresumefromastoppedpoller-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroCreateCertificateName-canresumefromastoppedpoller-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA7D6tYrbl/wX2Q3GQjSwisbGNn6zJKXrDgmO2frKC60rDwBw3d1U3h86qNhSyeG+WKhp0R4Lo01sNS0Eenjv02CawF4iSYfHB82RUhC8rr7hboe0NQ7XmcLHbhQ6Z6bqZTltJRZBOMUP7biZGP9xd1hub046d3chxikLPQrxktWLFV+5zjyRL7wTj61/0ImWG4W/hsJru9ztBMg39hr6HUNIMgy+wWSiljZV3Z1l615241/+EFgk1BiyFvoQuZz2k27CNy/6WybTsKOz7fdETRJg+7CDhjv3dbyGG489pc+ZvudcFf0zGMoM3shAPx+ii3j8wBx0GGXchnZzjPhAaWQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBACUf37y1pfI550dv+CpwTYbxJxQdOxXd2LGTLxeBjin1gCBPGPvHawo7YBTVDYzQvKuBSCUeeY3s8TQUTo10U0Jm0Y45MaM5PPvjwF4CTb4fxdxsYn2fBebrdDAL7Hy5Rru/chRgybbxHoSoDR0wrV2gBZ2c96hC3HD5iey5mMt5X2XelbR7wI278HlsCeltt5fXiAlPXKpr4UepeZ2IAkbG3Ldy+rAxQjYevP9WQNNkQmJdxwFZhei36R2OGGc6Z0HAKfxRyQAKjhEFi2WBs4+MQn2Rmd0wt4syvU2KxvAq2Ku8AyKM3YTXJYCpfvhAy9B89QUV+f9Q5evR4QGkeIE=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"02e53049d5f4418c8624732f86f7ad21"}, [
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
  'b6832f09-af3e-4d93-ba9b-d4b4210edbc3',
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
  'Tue, 16 Feb 2021 19:03:50 GMT',
  'Content-Length',
  '1337'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroCreateCertificateName-canresumefromastoppedpoller-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroCreateCertificateName-canresumefromastoppedpoller-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA7D6tYrbl/wX2Q3GQjSwisbGNn6zJKXrDgmO2frKC60rDwBw3d1U3h86qNhSyeG+WKhp0R4Lo01sNS0Eenjv02CawF4iSYfHB82RUhC8rr7hboe0NQ7XmcLHbhQ6Z6bqZTltJRZBOMUP7biZGP9xd1hub046d3chxikLPQrxktWLFV+5zjyRL7wTj61/0ImWG4W/hsJru9ztBMg39hr6HUNIMgy+wWSiljZV3Z1l615241/+EFgk1BiyFvoQuZz2k27CNy/6WybTsKOz7fdETRJg+7CDhjv3dbyGG489pc+ZvudcFf0zGMoM3shAPx+ii3j8wBx0GGXchnZzjPhAaWQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBACUf37y1pfI550dv+CpwTYbxJxQdOxXd2LGTLxeBjin1gCBPGPvHawo7YBTVDYzQvKuBSCUeeY3s8TQUTo10U0Jm0Y45MaM5PPvjwF4CTb4fxdxsYn2fBebrdDAL7Hy5Rru/chRgybbxHoSoDR0wrV2gBZ2c96hC3HD5iey5mMt5X2XelbR7wI278HlsCeltt5fXiAlPXKpr4UepeZ2IAkbG3Ldy+rAxQjYevP9WQNNkQmJdxwFZhei36R2OGGc6Z0HAKfxRyQAKjhEFi2WBs4+MQn2Rmd0wt4syvU2KxvAq2Ku8AyKM3YTXJYCpfvhAy9B89QUV+f9Q5evR4QGkeIE=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"02e53049d5f4418c8624732f86f7ad21"}, [
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
  '600cdfca-7350-45ca-b20f-5eba366635df',
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
  'Tue, 16 Feb 2021 19:03:52 GMT',
  'Content-Length',
  '1337'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroCreateCertificateName-canresumefromastoppedpoller-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroCreateCertificateName-canresumefromastoppedpoller-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA7D6tYrbl/wX2Q3GQjSwisbGNn6zJKXrDgmO2frKC60rDwBw3d1U3h86qNhSyeG+WKhp0R4Lo01sNS0Eenjv02CawF4iSYfHB82RUhC8rr7hboe0NQ7XmcLHbhQ6Z6bqZTltJRZBOMUP7biZGP9xd1hub046d3chxikLPQrxktWLFV+5zjyRL7wTj61/0ImWG4W/hsJru9ztBMg39hr6HUNIMgy+wWSiljZV3Z1l615241/+EFgk1BiyFvoQuZz2k27CNy/6WybTsKOz7fdETRJg+7CDhjv3dbyGG489pc+ZvudcFf0zGMoM3shAPx+ii3j8wBx0GGXchnZzjPhAaWQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBACUf37y1pfI550dv+CpwTYbxJxQdOxXd2LGTLxeBjin1gCBPGPvHawo7YBTVDYzQvKuBSCUeeY3s8TQUTo10U0Jm0Y45MaM5PPvjwF4CTb4fxdxsYn2fBebrdDAL7Hy5Rru/chRgybbxHoSoDR0wrV2gBZ2c96hC3HD5iey5mMt5X2XelbR7wI278HlsCeltt5fXiAlPXKpr4UepeZ2IAkbG3Ldy+rAxQjYevP9WQNNkQmJdxwFZhei36R2OGGc6Z0HAKfxRyQAKjhEFi2WBs4+MQn2Rmd0wt4syvU2KxvAq2Ku8AyKM3YTXJYCpfvhAy9B89QUV+f9Q5evR4QGkeIE=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"02e53049d5f4418c8624732f86f7ad21"}, [
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
  '0b88f615-aac8-4631-b379-4c2e2d087099',
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
  'Tue, 16 Feb 2021 19:03:54 GMT',
  'Content-Length',
  '1337'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroCreateCertificateName-canresumefromastoppedpoller-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroCreateCertificateName-canresumefromastoppedpoller-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA7D6tYrbl/wX2Q3GQjSwisbGNn6zJKXrDgmO2frKC60rDwBw3d1U3h86qNhSyeG+WKhp0R4Lo01sNS0Eenjv02CawF4iSYfHB82RUhC8rr7hboe0NQ7XmcLHbhQ6Z6bqZTltJRZBOMUP7biZGP9xd1hub046d3chxikLPQrxktWLFV+5zjyRL7wTj61/0ImWG4W/hsJru9ztBMg39hr6HUNIMgy+wWSiljZV3Z1l615241/+EFgk1BiyFvoQuZz2k27CNy/6WybTsKOz7fdETRJg+7CDhjv3dbyGG489pc+ZvudcFf0zGMoM3shAPx+ii3j8wBx0GGXchnZzjPhAaWQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBACUf37y1pfI550dv+CpwTYbxJxQdOxXd2LGTLxeBjin1gCBPGPvHawo7YBTVDYzQvKuBSCUeeY3s8TQUTo10U0Jm0Y45MaM5PPvjwF4CTb4fxdxsYn2fBebrdDAL7Hy5Rru/chRgybbxHoSoDR0wrV2gBZ2c96hC3HD5iey5mMt5X2XelbR7wI278HlsCeltt5fXiAlPXKpr4UepeZ2IAkbG3Ldy+rAxQjYevP9WQNNkQmJdxwFZhei36R2OGGc6Z0HAKfxRyQAKjhEFi2WBs4+MQn2Rmd0wt4syvU2KxvAq2Ku8AyKM3YTXJYCpfvhAy9B89QUV+f9Q5evR4QGkeIE=","cancellation_requested":false,"status":"completed","target":"https://keyvault_name.vault.azure.net/certificates/lroCreateCertificateName-canresumefromastoppedpoller-","request_id":"02e53049d5f4418c8624732f86f7ad21"}, [
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
  'c9474752-3bcc-4cf8-8a0c-efc7e5d2a1b2',
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
  'Tue, 16 Feb 2021 19:03:56 GMT',
  'Content-Length',
  '1301'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroCreateCertificateName-canresumefromastoppedpoller-/')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroCreateCertificateName-canresumefromastoppedpoller-/0536ee37146240489cd1955be06341c5","kid":"https://keyvault_name.vault.azure.net/keys/lroCreateCertificateName-canresumefromastoppedpoller-/0536ee37146240489cd1955be06341c5","sid":"https://keyvault_name.vault.azure.net/secrets/lroCreateCertificateName-canresumefromastoppedpoller-/0536ee37146240489cd1955be06341c5","x5t":"FN9HKG7K9WF3l5fCNZFTmm16A08","cer":"MIIDKDCCAhCgAwIBAgIQDWP95kjlTxWjQBrKnzKAfDANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjEwMjE2MTg1MzU2WhcNMjIwMjE2MTkwMzU2WjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQDsPq1ituX/BfZDcZCNLCKxsY2frMkpesOCY7Z+soLrSsPAHDd3VTeHzqo2FLJ4b5YqGnRHgujTWw1LQR6eO/TYJrAXiJJh8cHzZFSELyuvuFuh7Q1DteZwsduFDpnpuplOW0lFkE4xQ/tuJkY/3F3WG5vTjp3dyHGKQs9CvGS1YsVX7nOPJEvvBOPrX/QiZYbhb+Gwmu73O0EyDf2GvodQ0gyDL7BZKKWNlXdnWXrXnbjX/4QWCTUGLIW+hC5nPaTbsI3L/pbJtOwo7Pt90RNEmD7sIOGO/d1vIYbjz2lz5m+51wV/TMYygzeyEA/H6KLePzAHHQYZdyGdnOM+EBpZAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBQJLzEIhyJzqlpFSD4JdDafe1jTQDAdBgNVHQ4EFgQUCS8xCIcic6paRUg+CXQ2n3tY00AwDQYJKoZIhvcNAQELBQADggEBANeOx9ssEo5ULouBaZiQUCRtEZOiyB9KN17ClI7Vn4meMFaDclHgstSuWJ//pg4OLD6rUGgxpOfajaNY8j7ELSqAO2yJU4ZlubNFD6Y1q5/aZBLXDcLw+IE9ww0XjElV1V/bbvmVj1fV+9sXYCt+wYilOFmkE8qpA7Lx553ZPmfBwOuljZR+z6/frs64RoryQRYFlGcBhCQVAn5k1q6+7hIrTVY9Btc4LIdp32l6iZzG7QDt3IiXONtKFfWJXxoOoAtr5I40MgNuWB5ZD9ZkmXhLvL3J8v2ksFNUn+ZDDPiehzCQL3VsZzlYCz4zmPnEoXcqdcg0boe1k0IjEu+gipc=","attributes":{"enabled":true,"nbf":1613501636,"exp":1645038236,"created":1613502236,"updated":1613502236,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/lroCreateCertificateName-canresumefromastoppedpoller-/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1613502228,"updated":1613502228}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/lroCreateCertificateName-canresumefromastoppedpoller-/pending"}}, [
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
  'e804ec1a-d7c5-43af-986f-0189e9b27dd1',
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
  'Tue, 16 Feb 2021 19:03:57 GMT',
  'Content-Length',
  '2584'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/certificates/lroCreateCertificateName-canresumefromastoppedpoller-')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/lroCreateCertificateName-canresumefromastoppedpoller-","deletedDate":1613502237,"scheduledPurgeDate":1614107037,"id":"https://keyvault_name.vault.azure.net/certificates/lroCreateCertificateName-canresumefromastoppedpoller-/0536ee37146240489cd1955be06341c5","kid":"https://keyvault_name.vault.azure.net/keys/lroCreateCertificateName-canresumefromastoppedpoller-/0536ee37146240489cd1955be06341c5","sid":"https://keyvault_name.vault.azure.net/secrets/lroCreateCertificateName-canresumefromastoppedpoller-/0536ee37146240489cd1955be06341c5","x5t":"FN9HKG7K9WF3l5fCNZFTmm16A08","cer":"MIIDKDCCAhCgAwIBAgIQDWP95kjlTxWjQBrKnzKAfDANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjEwMjE2MTg1MzU2WhcNMjIwMjE2MTkwMzU2WjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQDsPq1ituX/BfZDcZCNLCKxsY2frMkpesOCY7Z+soLrSsPAHDd3VTeHzqo2FLJ4b5YqGnRHgujTWw1LQR6eO/TYJrAXiJJh8cHzZFSELyuvuFuh7Q1DteZwsduFDpnpuplOW0lFkE4xQ/tuJkY/3F3WG5vTjp3dyHGKQs9CvGS1YsVX7nOPJEvvBOPrX/QiZYbhb+Gwmu73O0EyDf2GvodQ0gyDL7BZKKWNlXdnWXrXnbjX/4QWCTUGLIW+hC5nPaTbsI3L/pbJtOwo7Pt90RNEmD7sIOGO/d1vIYbjz2lz5m+51wV/TMYygzeyEA/H6KLePzAHHQYZdyGdnOM+EBpZAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBQJLzEIhyJzqlpFSD4JdDafe1jTQDAdBgNVHQ4EFgQUCS8xCIcic6paRUg+CXQ2n3tY00AwDQYJKoZIhvcNAQELBQADggEBANeOx9ssEo5ULouBaZiQUCRtEZOiyB9KN17ClI7Vn4meMFaDclHgstSuWJ//pg4OLD6rUGgxpOfajaNY8j7ELSqAO2yJU4ZlubNFD6Y1q5/aZBLXDcLw+IE9ww0XjElV1V/bbvmVj1fV+9sXYCt+wYilOFmkE8qpA7Lx553ZPmfBwOuljZR+z6/frs64RoryQRYFlGcBhCQVAn5k1q6+7hIrTVY9Btc4LIdp32l6iZzG7QDt3IiXONtKFfWJXxoOoAtr5I40MgNuWB5ZD9ZkmXhLvL3J8v2ksFNUn+ZDDPiehzCQL3VsZzlYCz4zmPnEoXcqdcg0boe1k0IjEu+gipc=","attributes":{"enabled":true,"nbf":1613501636,"exp":1645038236,"created":1613502236,"updated":1613502236,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/lroCreateCertificateName-canresumefromastoppedpoller-/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1613502228,"updated":1613502228}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/lroCreateCertificateName-canresumefromastoppedpoller-/pending"}}, [
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
  '54c08e64-5b5c-4eed-8b75-71d6e68c331f',
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
  'Tue, 16 Feb 2021 19:03:56 GMT',
  'Content-Length',
  '2781'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroCreateCertificateName-canresumefromastoppedpoller-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroCreateCertificateName-canresumefromastoppedpoller-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '154',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  '7a2c2957-d772-4928-bd23-4509e86049bb',
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
  'Tue, 16 Feb 2021 19:03:57 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroCreateCertificateName-canresumefromastoppedpoller-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroCreateCertificateName-canresumefromastoppedpoller-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '154',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  '47fe8dc3-b808-4a1e-9e64-018d7e505ce5',
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
  'Tue, 16 Feb 2021 19:03:56 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroCreateCertificateName-canresumefromastoppedpoller-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroCreateCertificateName-canresumefromastoppedpoller-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '154',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  '944d6d6b-3cee-48ec-89f4-c5e425a0b359',
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
  'Tue, 16 Feb 2021 19:03:59 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroCreateCertificateName-canresumefromastoppedpoller-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroCreateCertificateName-canresumefromastoppedpoller-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '154',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  '53ca9792-0dac-40aa-a2d7-7347f4d6c7a2',
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
  'Tue, 16 Feb 2021 19:04:00 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroCreateCertificateName-canresumefromastoppedpoller-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroCreateCertificateName-canresumefromastoppedpoller-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '154',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  '44fad447-4290-4152-85fe-e90dfc60045a',
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
  'Tue, 16 Feb 2021 19:04:03 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroCreateCertificateName-canresumefromastoppedpoller-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroCreateCertificateName-canresumefromastoppedpoller-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '154',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  '87d147e3-337b-47a6-8a94-1427bf445252',
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
  'Tue, 16 Feb 2021 19:04:05 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroCreateCertificateName-canresumefromastoppedpoller-')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/lroCreateCertificateName-canresumefromastoppedpoller-","deletedDate":1613502237,"scheduledPurgeDate":1614107037,"id":"https://keyvault_name.vault.azure.net/certificates/lroCreateCertificateName-canresumefromastoppedpoller-/0536ee37146240489cd1955be06341c5","kid":"https://keyvault_name.vault.azure.net/keys/lroCreateCertificateName-canresumefromastoppedpoller-/0536ee37146240489cd1955be06341c5","sid":"https://keyvault_name.vault.azure.net/secrets/lroCreateCertificateName-canresumefromastoppedpoller-/0536ee37146240489cd1955be06341c5","x5t":"FN9HKG7K9WF3l5fCNZFTmm16A08","cer":"MIIDKDCCAhCgAwIBAgIQDWP95kjlTxWjQBrKnzKAfDANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjEwMjE2MTg1MzU2WhcNMjIwMjE2MTkwMzU2WjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQDsPq1ituX/BfZDcZCNLCKxsY2frMkpesOCY7Z+soLrSsPAHDd3VTeHzqo2FLJ4b5YqGnRHgujTWw1LQR6eO/TYJrAXiJJh8cHzZFSELyuvuFuh7Q1DteZwsduFDpnpuplOW0lFkE4xQ/tuJkY/3F3WG5vTjp3dyHGKQs9CvGS1YsVX7nOPJEvvBOPrX/QiZYbhb+Gwmu73O0EyDf2GvodQ0gyDL7BZKKWNlXdnWXrXnbjX/4QWCTUGLIW+hC5nPaTbsI3L/pbJtOwo7Pt90RNEmD7sIOGO/d1vIYbjz2lz5m+51wV/TMYygzeyEA/H6KLePzAHHQYZdyGdnOM+EBpZAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBQJLzEIhyJzqlpFSD4JdDafe1jTQDAdBgNVHQ4EFgQUCS8xCIcic6paRUg+CXQ2n3tY00AwDQYJKoZIhvcNAQELBQADggEBANeOx9ssEo5ULouBaZiQUCRtEZOiyB9KN17ClI7Vn4meMFaDclHgstSuWJ//pg4OLD6rUGgxpOfajaNY8j7ELSqAO2yJU4ZlubNFD6Y1q5/aZBLXDcLw+IE9ww0XjElV1V/bbvmVj1fV+9sXYCt+wYilOFmkE8qpA7Lx553ZPmfBwOuljZR+z6/frs64RoryQRYFlGcBhCQVAn5k1q6+7hIrTVY9Btc4LIdp32l6iZzG7QDt3IiXONtKFfWJXxoOoAtr5I40MgNuWB5ZD9ZkmXhLvL3J8v2ksFNUn+ZDDPiehzCQL3VsZzlYCz4zmPnEoXcqdcg0boe1k0IjEu+gipc=","attributes":{"enabled":true,"nbf":1613501636,"exp":1645038236,"created":1613502236,"updated":1613502236,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/lroCreateCertificateName-canresumefromastoppedpoller-/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1613502228,"updated":1613502228}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/lroCreateCertificateName-canresumefromastoppedpoller-/pending"}}, [
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
  'd930ca04-38b5-4580-b72a-2ff508029f93',
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
  'Tue, 16 Feb 2021 19:04:07 GMT',
  'Content-Length',
  '2781'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedcertificates/lroCreateCertificateName-canresumefromastoppedpoller-')
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
  'a9b20136-52d6-4caf-a1e8-7951f18b52e8',
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
  'Tue, 16 Feb 2021 19:04:07 GMT'
]);

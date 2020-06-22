let nock = require('nock');

module.exports.hash = "3d82d4aaefe84e803aafd6e1f32b058c";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/certificates/recoverCertificateName-cangetacertificatewithrequestOptionstimeout-/create')
  .query(true)
  .reply(401, {"error":{"code":"Unauthorized","message":"Request is missing a Bearer or PoP token."}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '87',
  'Content-Type',
  'application/json; ckeyvault_nameset=utf-8',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'WWW-Authenticate',
  'Bearer ' +
    'authorization="https://login.windows.net/azure_tenant_id", ' +
    'resource="https://vault.azure.net"',
  'x-ms-keyvault-region',
  'centralus',
  'x-ms-request-id',
  '02b917af-75ee-423f-bf8b-625f04f34f5c',
  'x-ms-keyvault-service-version',
  '1.1.0.891',
  'x-ms-keyvault-network-info',
  'addr=167.220.81.170;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 06 Feb 2020 00:06:14 GMT'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fvault.azure.net%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":3599,"ext_expires_in":3599,"access_token":"access_token"}, [
  'Cache-Control',
  'no-cache, no-store',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; ckeyvault_nameset=utf-8',
  'Expires',
  '-1',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'x-ms-request-id',
  '5f07a74e-ba1f-4a29-b97c-446d30880600',
  'x-ms-ests-server',
  '2.1.9987.14 - NCUS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=Au5QckdQv-tGnefGs0tAc1xTly3RAQAAAHZPzdUOAAAA; expires=Sat, ' +
    '07-Mar-2020 00:06:15 GMT; path=/; secure; HttpOnly; ' +
    'SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; SameSite=None; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; SameSite=None; secure; HttpOnly',
  'Date',
  'Thu, 06 Feb 2020 00:06:14 GMT',
  'Content-Length',
  '1231'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/certificates/recoverCertificateName-cangetacertificatewithrequestOptionstimeout-/create', {"policy":{"key_props":{},"secret_props":{},"x509_props":{"subject":"cn=MyCert","sans":{}},"issuer":{"name":"Self"},"attributes":{}},"attributes":{}})
  .query(true)
  .reply(202, {"id":"https://keyvault_name.vault.azure.net/certificates/recoverCertificateName-cangetacertificatewithrequestOptionstimeout-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA09pDRz5c/YFagPb9EDCREf1Dcmfh1fMKKpVZ6MEA1pUBXB3J/qEvvjPSqVzXyXNrfwMW8W4zBrFqTVlxHmT3DhXJGr+ZG+1bEokN0ayqdpHoqw82mKYaT4qdah0P07gSH3R501mRjv63wDCo9XXYgKOlMkANJO3+FoorXDrO/whjIXLGiwLFNhOaT+TcNIz89dK3KvzrK1nilo1TZYVCAlsiJrTWqnX8p4pR8hr57NCdQ6Ncb7GdP+Lqh18mHd0ofeY+HGeMBsE5VfUjldv7m9/8Y6MhUvd+ouNnDBmooC/51MsDWVNjJ62pgeevVa3J0LjFYMkdpScylaCbKi/+0QIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAGu6s+bJlOoVpuWMe22NAfYT8M0RxREGFB95EhDiju11zwuGzcx86851t10Vxj3fFRSqgpuqQgO8yK/X7lKaMnQXK2qDc4W4dvclmubqaz4oe9IkIXS7pCIBKVqG6IfGISOx6zlWrPobIXYgNuS74tGq59e9LphopsaCPBQ9Nxrwkfc/UsXC4RbhrCRxZsO0GkQS4wniR2Z8Qn+DlcJCEcUp8lCSHXLpQoIoGZ8K8c2CiL8ItHmLKMuzIiqKSrigPLf02aBhhvKr/gbpvlTigexVY4244bXtZuaYijS1gqKvyYI+z4ysfAS2tbzZ7/lQJ793ga+1Bi/9T15NDwi/Kpc=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"cff33257da824ceaaf91491f2a87b0da"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; ckeyvault_nameset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://keyvault_name.vault.azure.net/certificates/recoverCertificateName-cangetacertificatewithrequestOptionstimeout-/pending?api-version=7.0&request_id=cff33257da824ceaaf91491f2a87b0da',
  'Retry-After',
  '10',
  'Server',
  'Microsoft-IIS/10.0',
  'x-ms-keyvault-region',
  'centralus',
  'x-ms-request-id',
  '7de5feaa-f814-411e-a759-63e212279a55',
  'x-ms-keyvault-service-version',
  '1.1.0.891',
  'x-ms-keyvault-network-info',
  'addr=167.220.81.170;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 06 Feb 2020 00:06:15 GMT',
  'Content-Length',
  '1344'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/recoverCertificateName-cangetacertificatewithrequestOptionstimeout-/pending')
  .query(true)
  .reply(401, {"error":{"code":"Unauthorized","message":"Request is missing a Bearer or PoP token."}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '87',
  'Content-Type',
  'application/json; ckeyvault_nameset=utf-8',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'WWW-Authenticate',
  'Bearer ' +
    'authorization="https://login.windows.net/azure_tenant_id", ' +
    'resource="https://vault.azure.net"',
  'x-ms-keyvault-region',
  'centralus',
  'x-ms-request-id',
  '955a2404-cad5-4244-8ce5-d98121a1f7fc',
  'x-ms-keyvault-service-version',
  '1.1.0.891',
  'x-ms-keyvault-network-info',
  'addr=167.220.81.170;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 06 Feb 2020 00:06:15 GMT'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fvault.azure.net%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":3599,"ext_expires_in":3599,"access_token":"access_token"}, [
  'Cache-Control',
  'no-cache, no-store',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; ckeyvault_nameset=utf-8',
  'Expires',
  '-1',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'x-ms-request-id',
  '904ddfd5-a581-42ec-8e2c-d7a7b6f70600',
  'x-ms-ests-server',
  '2.1.9987.14 - WUS2 ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=Au5QckdQv-tGnefGs0tAc1xTly3RAgAAAHZPzdUOAAAA; expires=Sat, ' +
    '07-Mar-2020 00:06:16 GMT; path=/; secure; HttpOnly; ' +
    'SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; SameSite=None; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; SameSite=None; secure; HttpOnly',
  'Date',
  'Thu, 06 Feb 2020 00:06:15 GMT',
  'Content-Length',
  '1231'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/recoverCertificateName-cangetacertificatewithrequestOptionstimeout-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/recoverCertificateName-cangetacertificatewithrequestOptionstimeout-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA09pDRz5c/YFagPb9EDCREf1Dcmfh1fMKKpVZ6MEA1pUBXB3J/qEvvjPSqVzXyXNrfwMW8W4zBrFqTVlxHmT3DhXJGr+ZG+1bEokN0ayqdpHoqw82mKYaT4qdah0P07gSH3R501mRjv63wDCo9XXYgKOlMkANJO3+FoorXDrO/whjIXLGiwLFNhOaT+TcNIz89dK3KvzrK1nilo1TZYVCAlsiJrTWqnX8p4pR8hr57NCdQ6Ncb7GdP+Lqh18mHd0ofeY+HGeMBsE5VfUjldv7m9/8Y6MhUvd+ouNnDBmooC/51MsDWVNjJ62pgeevVa3J0LjFYMkdpScylaCbKi/+0QIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAGu6s+bJlOoVpuWMe22NAfYT8M0RxREGFB95EhDiju11zwuGzcx86851t10Vxj3fFRSqgpuqQgO8yK/X7lKaMnQXK2qDc4W4dvclmubqaz4oe9IkIXS7pCIBKVqG6IfGISOx6zlWrPobIXYgNuS74tGq59e9LphopsaCPBQ9Nxrwkfc/UsXC4RbhrCRxZsO0GkQS4wniR2Z8Qn+DlcJCEcUp8lCSHXLpQoIoGZ8K8c2CiL8ItHmLKMuzIiqKSrigPLf02aBhhvKr/gbpvlTigexVY4244bXtZuaYijS1gqKvyYI+z4ysfAS2tbzZ7/lQJ793ga+1Bi/9T15NDwi/Kpc=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"cff33257da824ceaaf91491f2a87b0da"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; ckeyvault_nameset=utf-8',
  'Expires',
  '-1',
  'Retry-After',
  '10',
  'Server',
  'Microsoft-IIS/10.0',
  'x-ms-keyvault-region',
  'centralus',
  'x-ms-request-id',
  '241794a0-0fff-4d97-a99c-d9938d00446a',
  'x-ms-keyvault-service-version',
  '1.1.0.891',
  'x-ms-keyvault-network-info',
  'addr=167.220.81.170;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 06 Feb 2020 00:06:16 GMT',
  'Content-Length',
  '1344'
]);

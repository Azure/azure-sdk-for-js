let nock = require('nock');

module.exports.hash = "b87b73d323977ca7420acb206ff5947a";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/certificates/recoverCertificateName-candeleteacertificatewithrequestOptionstimeout-/create')
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
  'a8530090-b75e-4578-9148-c67cc39804d4',
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
  'Thu, 06 Feb 2020 00:06:16 GMT'
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
  '59b43276-8b17-4a23-9fef-0daecfef0600',
  'x-ms-ests-server',
  '2.1.9987.14 - EUS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AuPHpOVB7EZJjfiCRxwXbYFTly3RAQAAAHhPzdUOAAAA; expires=Sat, ' +
    '07-Mar-2020 00:06:16 GMT; path=/; secure; HttpOnly; ' +
    'SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; SameSite=None; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; SameSite=None; secure; HttpOnly',
  'Date',
  'Thu, 06 Feb 2020 00:06:16 GMT',
  'Content-Length',
  '1231'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/certificates/recoverCertificateName-candeleteacertificatewithrequestOptionstimeout-/create', {"policy":{"key_props":{},"secret_props":{},"x509_props":{"subject":"cn=MyCert","sans":{}},"issuer":{"name":"Self"},"attributes":{}},"attributes":{}})
  .query(true)
  .reply(202, {"id":"https://keyvault_name.vault.azure.net/certificates/recoverCertificateName-candeleteacertificatewithrequestOptionstimeout-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAwklNeaw1DMvBtwghYZ4wZP/UUDauvT2Tmh40il0XkM43XDP5HuzOCRtpfsJoB7bQQC8jNz9YwjnFNv8UshUEARUGlj55qValpK+5gVgHb+T7hlzcdY0FcIGLodTswP/v7e0B0lnqZ3ebQS5Dlr358aHqjVtvLWfdRXeVZAqsUUGhrp5EjQtOAgHns1DwDxcmRvVujSzf6A8/iAVfejp91vjsyKpcQ6q4ChRqXcMbXPnuOo1u5SdDkqHZTSt4cHyBWL+UY4OuUng/JqEy0gHXq9siosGpymSpxGTxQaSk/B3F+LYqcoMUn0F6AuKG4HWBrAeLgPoe9u0A8GgwUQZbeQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBABWRPMGzBdheo/L/ufzMvz7lx/saUmw6YiQXhyHdTj/1kcv2n0VrrfH3U37CKUKjfBU5PKA6uTTINDebzt2tWHu1YjDI2OczbSRT1k91ox42vOIeQ9cpBisgcL2fs4gnW7uxstEUamh2TlVgwI265SUL/YnBN3e+vs3VKOLqltqz3aD0I1JkGinhD4KaMW8P22Ry9c2YOoh8rP90662P5pW4a038RMqs/mWPRkuvGTV6YJRaYZAs1ookCT228yfDqZ6B9D1hTIb21ufjVwYe36P7NDaKnk3LhvD5KBPXl+0F6fHWCfeCDLStyUY7fjx95tgsP4ZwFuApU12Gc5qa2/M=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"4dc798480bfb4cb09bdb3a45bff150bd"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; ckeyvault_nameset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://keyvault_name.vault.azure.net/certificates/recoverCertificateName-candeleteacertificatewithrequestOptionstimeout-/pending?api-version=7.0&request_id=4dc798480bfb4cb09bdb3a45bff150bd',
  'Retry-After',
  '10',
  'Server',
  'Microsoft-IIS/10.0',
  'x-ms-keyvault-region',
  'centralus',
  'x-ms-request-id',
  '8bc8491f-b105-462c-80a1-eba7d4785306',
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
  'Thu, 06 Feb 2020 00:06:17 GMT',
  'Content-Length',
  '1347'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/recoverCertificateName-candeleteacertificatewithrequestOptionstimeout-/pending')
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
  'be93dd7a-547f-4051-98f2-a28322948849',
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
  'Thu, 06 Feb 2020 00:06:17 GMT'
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
  '3b08a40e-ec06-403f-921a-b85d27220600',
  'x-ms-ests-server',
  '2.1.9987.14 - NCUS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AuPHpOVB7EZJjfiCRxwXbYFTly3RAgAAAHhPzdUOAAAA; expires=Sat, ' +
    '07-Mar-2020 00:06:18 GMT; path=/; secure; HttpOnly; ' +
    'SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; SameSite=None; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; SameSite=None; secure; HttpOnly',
  'Date',
  'Thu, 06 Feb 2020 00:06:17 GMT',
  'Content-Length',
  '1231'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/recoverCertificateName-candeleteacertificatewithrequestOptionstimeout-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/recoverCertificateName-candeleteacertificatewithrequestOptionstimeout-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAwklNeaw1DMvBtwghYZ4wZP/UUDauvT2Tmh40il0XkM43XDP5HuzOCRtpfsJoB7bQQC8jNz9YwjnFNv8UshUEARUGlj55qValpK+5gVgHb+T7hlzcdY0FcIGLodTswP/v7e0B0lnqZ3ebQS5Dlr358aHqjVtvLWfdRXeVZAqsUUGhrp5EjQtOAgHns1DwDxcmRvVujSzf6A8/iAVfejp91vjsyKpcQ6q4ChRqXcMbXPnuOo1u5SdDkqHZTSt4cHyBWL+UY4OuUng/JqEy0gHXq9siosGpymSpxGTxQaSk/B3F+LYqcoMUn0F6AuKG4HWBrAeLgPoe9u0A8GgwUQZbeQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBABWRPMGzBdheo/L/ufzMvz7lx/saUmw6YiQXhyHdTj/1kcv2n0VrrfH3U37CKUKjfBU5PKA6uTTINDebzt2tWHu1YjDI2OczbSRT1k91ox42vOIeQ9cpBisgcL2fs4gnW7uxstEUamh2TlVgwI265SUL/YnBN3e+vs3VKOLqltqz3aD0I1JkGinhD4KaMW8P22Ry9c2YOoh8rP90662P5pW4a038RMqs/mWPRkuvGTV6YJRaYZAs1ookCT228yfDqZ6B9D1hTIb21ufjVwYe36P7NDaKnk3LhvD5KBPXl+0F6fHWCfeCDLStyUY7fjx95tgsP4ZwFuApU12Gc5qa2/M=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"4dc798480bfb4cb09bdb3a45bff150bd"}, [
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
  '1820eb8b-ebe9-497d-ace7-098882157296',
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
  'Thu, 06 Feb 2020 00:06:18 GMT',
  'Content-Length',
  '1347'
]);

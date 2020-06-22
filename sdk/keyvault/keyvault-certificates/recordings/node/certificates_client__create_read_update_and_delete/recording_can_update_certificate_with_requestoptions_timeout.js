let nock = require('nock');

module.exports.hash = "a918b2e01e74a08ade43ae03da769ba8";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/certificates/recoverCertificateName-canupdatecertificatewithrequestOptionstimeout-/create')
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
  '65887334-1e43-48b9-acfe-25ce98e8f777',
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
  'Thu, 06 Feb 2020 00:06:12 GMT'
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
  '14e5ce0a-4128-45f5-af7b-af4b898e0600',
  'x-ms-ests-server',
  '2.1.9987.14 - SCUS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AhilEYqiGR1FuzrlIRGx0j1Tly3RAQAAAHRPzdUOAAAA; expires=Sat, ' +
    '07-Mar-2020 00:06:13 GMT; path=/; secure; HttpOnly; ' +
    'SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; SameSite=None; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; SameSite=None; secure; HttpOnly',
  'Date',
  'Thu, 06 Feb 2020 00:06:12 GMT',
  'Content-Length',
  '1231'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/certificates/recoverCertificateName-canupdatecertificatewithrequestOptionstimeout-/create', {"policy":{"key_props":{},"secret_props":{},"x509_props":{"subject":"cn=MyCert","sans":{}},"issuer":{"name":"Self"},"attributes":{}},"attributes":{}})
  .query(true)
  .reply(202, {"id":"https://keyvault_name.vault.azure.net/certificates/recoverCertificateName-canupdatecertificatewithrequestOptionstimeout-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA3mgvDy0MDLdpmTHOUNNSxC6dmNOnJd7diZN/YtPzONgLmAAz3tbJDtUfT+LjrTVqSjmmlm6s17aGgPWZnp6SV1ArPPe2heZuW/TmwuuJW0uGVmvih6YajswZFqcp2ozn5tblFcX1OxkA28SRF/IQWD/CzDqwAIlSInQCUFRRyRYZ2gg+i/TRbZsIG02fSOmP4UWEL9CbKh2hZmEPh3S8wgov8L93IVX1+7K59FW9/I+Y/ANv6OZ745NUMKzpwM00aL6aqMb9S4MaHeW/l1jNiSV4c5D5Vyer+fZb3hKr+zRQxic/1Apeyl163eHnWPai+QEiABBeg/rkvkdUM6RotwIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAKNJBOUGyxhmuUnnV2wBx3hNwdSiwI0VSbBrdA4tBUG6+/wxq9WCFGH4bZWsncmx+o5CY2jgm2WkSxzkjjSe6MBm8d/Gh8lB0OaJG0CMEfXBaT1dNIB6S0wnQ87RqonhEaw3ZkoQqI9/tQrPIQaKo1MUcSfCDoOkvHRJhdJW3Q66chE8Z2gsbEt6HD52M/u+I7hKhpDaCDRN+Q1kW/+W6TMRFBQc8GYP3V20jxwJEYoiwr0inZN82mse0pVq71u+qpbtRGQRxNoH4s4oxLRd55HHZg6fvpZJnFoi+4d9lJyB1Z1n4h6K2VaA6xMIJwBkxwy30CXoj18b7VZrMgUiHUc=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"78c72fb9579944cdbb651dc3ef57b2a6"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; ckeyvault_nameset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://keyvault_name.vault.azure.net/certificates/recoverCertificateName-canupdatecertificatewithrequestOptionstimeout-/pending?api-version=7.0&request_id=78c72fb9579944cdbb651dc3ef57b2a6',
  'Retry-After',
  '10',
  'Server',
  'Microsoft-IIS/10.0',
  'x-ms-keyvault-region',
  'centralus',
  'x-ms-request-id',
  'f653e9e6-c8b9-44db-88d6-6e866aeab563',
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
  'Thu, 06 Feb 2020 00:06:13 GMT',
  'Content-Length',
  '1346'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/recoverCertificateName-canupdatecertificatewithrequestOptionstimeout-/pending')
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
  '751933db-8965-4a2c-8e2c-9fdd53ca7fb9',
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
  'Thu, 06 Feb 2020 00:06:13 GMT'
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
  '2e27ee3c-dfbd-4a4d-ad06-52584e050700',
  'x-ms-ests-server',
  '2.1.9987.14 - WUS2 ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AhilEYqiGR1FuzrlIRGx0j1Tly3RAgAAAHRPzdUOAAAA; expires=Sat, ' +
    '07-Mar-2020 00:06:14 GMT; path=/; secure; HttpOnly; ' +
    'SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; SameSite=None; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; SameSite=None; secure; HttpOnly',
  'Date',
  'Thu, 06 Feb 2020 00:06:13 GMT',
  'Content-Length',
  '1231'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/recoverCertificateName-canupdatecertificatewithrequestOptionstimeout-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/recoverCertificateName-canupdatecertificatewithrequestOptionstimeout-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA3mgvDy0MDLdpmTHOUNNSxC6dmNOnJd7diZN/YtPzONgLmAAz3tbJDtUfT+LjrTVqSjmmlm6s17aGgPWZnp6SV1ArPPe2heZuW/TmwuuJW0uGVmvih6YajswZFqcp2ozn5tblFcX1OxkA28SRF/IQWD/CzDqwAIlSInQCUFRRyRYZ2gg+i/TRbZsIG02fSOmP4UWEL9CbKh2hZmEPh3S8wgov8L93IVX1+7K59FW9/I+Y/ANv6OZ745NUMKzpwM00aL6aqMb9S4MaHeW/l1jNiSV4c5D5Vyer+fZb3hKr+zRQxic/1Apeyl163eHnWPai+QEiABBeg/rkvkdUM6RotwIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAKNJBOUGyxhmuUnnV2wBx3hNwdSiwI0VSbBrdA4tBUG6+/wxq9WCFGH4bZWsncmx+o5CY2jgm2WkSxzkjjSe6MBm8d/Gh8lB0OaJG0CMEfXBaT1dNIB6S0wnQ87RqonhEaw3ZkoQqI9/tQrPIQaKo1MUcSfCDoOkvHRJhdJW3Q66chE8Z2gsbEt6HD52M/u+I7hKhpDaCDRN+Q1kW/+W6TMRFBQc8GYP3V20jxwJEYoiwr0inZN82mse0pVq71u+qpbtRGQRxNoH4s4oxLRd55HHZg6fvpZJnFoi+4d9lJyB1Z1n4h6K2VaA6xMIJwBkxwy30CXoj18b7VZrMgUiHUc=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"78c72fb9579944cdbb651dc3ef57b2a6"}, [
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
  '5bc623ae-428c-4cab-aa23-c838dafb97e1',
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
  'Thu, 06 Feb 2020 00:06:14 GMT',
  'Content-Length',
  '1346'
]);

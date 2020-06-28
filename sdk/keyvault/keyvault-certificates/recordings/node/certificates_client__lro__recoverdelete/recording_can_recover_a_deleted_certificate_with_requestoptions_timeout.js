let nock = require('nock');

module.exports.hash = "1ea7fa87060d21c22b1eab0ae3426e71";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/certificates/lroRecoverCertificateName-canrecoveradeletedcertificatewithrequestOptionstimeout-/create')
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
  '8f7a3668-fbcd-4f48-be70-e703221c2de5',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=70.36.51.197;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Sun, 28 Jun 2020 21:02:52 GMT'
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
  'cb8579fa-c30e-4127-920d-8ae982240000',
  'x-ms-ests-server',
  '2.1.10761.12 - NCUS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AhyF1iqCsopFodMcsjb9iPgL6tuIAQAAAHz8itYOAAAA; expires=Tue, 28-Jul-2020 21:02:53 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; SameSite=None; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; SameSite=None; secure; HttpOnly',
  'Date',
  'Sun, 28 Jun 2020 21:02:52 GMT',
  'Content-Length',
  '1315'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/certificates/lroRecoverCertificateName-canrecoveradeletedcertificatewithrequestOptionstimeout-/create', {"policy":{"key_props":{},"secret_props":{},"x509_props":{"subject":"cn=MyCert","sans":{}},"issuer":{"name":"Self"},"attributes":{}},"attributes":{}})
  .query(true)
  .reply(202, {"id":"https://keyvault_name.vault.azure.net/certificates/lroRecoverCertificateName-canrecoveradeletedcertificatewithrequestOptionstimeout-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAvgHL2/d5e5Huy2jjK9oSl8XWJjJeTFuwBnO+yla88/EITyKi9epY84BEoNh1HgZGiBiLWWEp5kuQQzWQhEj8Np71oIW0d/geBCzlmYjKJT7cKzjbYc4GZyVL3n3YJ8beyh+Yh0uDgtTTXg++vc38Yg5z1SL21iGIIzx/G8lQ63cCe0siB6UZO14CsXNU/UYs0byLnaLaCzqbuFOTwbhMwsnUcfYT5siGGF6A+kn0fhjNwgev3ATS5+4lbLc54Sc0S8lWSrnDFrw4KiWl/Eaz1UGzF+jC8I5PZhJW87w+wYdLftdsfWzKgaIuS4rlP3O7OFN4h1K1QfdCeQVXseK3EwIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAAY8mviSzCEcaS9Bc5ijWhxCIe7SzCRPyulp+RR2iyXp8WBN2LiXILywebtHG4u07ZwA7j3DrNMBQS/mRZ+EX6sDkzC9d8GCAOhaGwVyzsKNxjH4xYBKndC3ZAkIiCrzQ7xrdX4r7fbCMZj9W7psUomhQZS5Rb4Mst1SysSjxKJ5uckeXIvwjD286MCwkdKsp7/7bwDLHvDSbYJ2ZGfpzljcodQiv993CzcVfV6NYQjkp6SD9R0JNwcvef18DuLv4zlKECDJrFZUKgiSvCGPTe8nCNxiUTqn/jRNTh6VnHzM4EKgGVdYm2avkYEq4OTxrnoZbdn9vubP6Hn6M6rdxBI=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"7511d5ae0ca24c9d845f584cd26bedbd"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://keyvault_name.vault.azure.net/certificates/lroRecoverCertificateName-canrecoveradeletedcertificatewithrequestOptionstimeout-/pending?api-version=7.1-preview&request_id=7511d5ae0ca24c9d845f584cd26bedbd',
  'Retry-After',
  '10',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-request-id',
  '34e76064-7f67-4284-a54e-5f7df8bc4199',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=70.36.51.197;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Sun, 28 Jun 2020 21:02:53 GMT',
  'Content-Length',
  '1372'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroRecoverCertificateName-canrecoveradeletedcertificatewithrequestOptionstimeout-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroRecoverCertificateName-canrecoveradeletedcertificatewithrequestOptionstimeout-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAvgHL2/d5e5Huy2jjK9oSl8XWJjJeTFuwBnO+yla88/EITyKi9epY84BEoNh1HgZGiBiLWWEp5kuQQzWQhEj8Np71oIW0d/geBCzlmYjKJT7cKzjbYc4GZyVL3n3YJ8beyh+Yh0uDgtTTXg++vc38Yg5z1SL21iGIIzx/G8lQ63cCe0siB6UZO14CsXNU/UYs0byLnaLaCzqbuFOTwbhMwsnUcfYT5siGGF6A+kn0fhjNwgev3ATS5+4lbLc54Sc0S8lWSrnDFrw4KiWl/Eaz1UGzF+jC8I5PZhJW87w+wYdLftdsfWzKgaIuS4rlP3O7OFN4h1K1QfdCeQVXseK3EwIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAAY8mviSzCEcaS9Bc5ijWhxCIe7SzCRPyulp+RR2iyXp8WBN2LiXILywebtHG4u07ZwA7j3DrNMBQS/mRZ+EX6sDkzC9d8GCAOhaGwVyzsKNxjH4xYBKndC3ZAkIiCrzQ7xrdX4r7fbCMZj9W7psUomhQZS5Rb4Mst1SysSjxKJ5uckeXIvwjD286MCwkdKsp7/7bwDLHvDSbYJ2ZGfpzljcodQiv993CzcVfV6NYQjkp6SD9R0JNwcvef18DuLv4zlKECDJrFZUKgiSvCGPTe8nCNxiUTqn/jRNTh6VnHzM4EKgGVdYm2avkYEq4OTxrnoZbdn9vubP6Hn6M6rdxBI=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"7511d5ae0ca24c9d845f584cd26bedbd"}, [
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
  '47ba3c54-0cc0-4702-bac6-2584995718da',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=70.36.51.197;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Sun, 28 Jun 2020 21:02:53 GMT',
  'Content-Length',
  '1372'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/certificates/lroRecoverCertificateName-canrecoveradeletedcertificatewithrequestOptionstimeout-')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroRecoverCertificateName-canrecoveradeletedcertificatewithrequestOptionstimeout-/e5df1812a63844e68c3540748695814d","attributes":{"enabled":false,"nbf":1593377573,"exp":1624914173,"created":1593378173,"updated":1593378173,"recoveryLevel":"Purgeable","recoverableDays":0},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/lroRecoverCertificateName-canrecoveradeletedcertificatewithrequestOptionstimeout-/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1593378173,"updated":1593378173}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/lroRecoverCertificateName-canrecoveradeletedcertificatewithrequestOptionstimeout-/pending"}}, [
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
  'ff6fb9b5-8957-4182-8ce8-3caf4f408e98',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=70.36.51.197;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Sun, 28 Jun 2020 21:02:53 GMT',
  'Content-Length',
  '1234'
]);

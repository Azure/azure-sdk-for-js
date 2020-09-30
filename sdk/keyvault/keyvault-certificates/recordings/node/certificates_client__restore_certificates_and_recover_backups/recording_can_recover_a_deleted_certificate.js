let nock = require('nock');

module.exports.hash = "7c5d11f5a2b58270cbd6f609ed52bc02";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/certificates/backupRestoreCertificateName-canrecoveradeletedcertificate-/create')
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
  '6aea3836-d766-4839-a31e-b8867dd51ba5',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.123.117;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 02 Jul 2020 18:46:30 GMT'
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
  '7037eef0-ac73-46dd-8e84-9da328954e00',
  'x-ms-ests-server',
  '2.1.10761.15 - WUS2 ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AvbMkI7JshlHoqE7KMBuAI0_aSJHAQAAAIYikNYOAAAA; expires=Sat, 01-Aug-2020 18:46:31 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; SameSite=None; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; SameSite=None; secure; HttpOnly',
  'Date',
  'Thu, 02 Jul 2020 18:46:31 GMT',
  'Content-Length',
  '1315'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/certificates/backupRestoreCertificateName-canrecoveradeletedcertificate-/create', {"policy":{"key_props":{},"secret_props":{},"x509_props":{"subject":"cn=MyCert","sans":{}},"issuer":{"name":"Self"},"attributes":{}},"attributes":{}})
  .query(true)
  .reply(202, {"id":"https://keyvault_name.vault.azure.net/certificates/backupRestoreCertificateName-canrecoveradeletedcertificate-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAlehCKoaxYQyTC8Clf/xdkwEzQHVF17SasHDxYB0z2y5qwJ90Bcd1S2ReG/IVjAV/vgVl0IkG1TAw3jLPf8tvbUlRg8utE8O1xTWiz8vLfUuFNu4+2oqUBhUfd5Ymf9go0gdWXVDKKZ1B+vS5q8qi36M67S+Ii2soIRPyfBHU4M+pPk+202UfTQjwAmk1oWqQ0yZlL1xKSgHk2+BW3ljLZaZlZTsLuEu/++s9BVcaZW1OJRwDolvOEwPoNP/tenWcj5DRMqix12T9M+jfxssj4eu84B57IgCjrhQ+V8d6Y2RacpumVicgnKOuxMHwC3UpFaqwc42X0dh/VkeBJiyJgQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAA7Ac7g/NITBD4zZlzfxiXcANa9MTkLYjSmrN0Bljd+XRnaKtGPuCHpl+70aqL8YG8eHR2yG45G1iepIZn3FDSpy9ju3X5ywLcAS2/Ycs0DfALyX4NgmLQhUu/BfMhUU82R8DTIMtZeUPwpxMsL3BOT65ts32hro4jvv2AYqXGIgmHZBejLuCRLrzQ7rDIxZ3t0Zi3PaArv3n3N1x8QF0apZ7PgIF4b8T+d/g46QKB3eTPFxb+/+6Dg6s58JqHte6T/p8RVRfZIG5GuES8d5Xrtu0xy8RFvDTL5uiVTkRvOWfrUzrYYQtvqmXDCiYvCF2w1YNNmZkukACWWOopD/wDg=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"d95424529c274e2aa1ef4a70d17da79f"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://keyvault_name.vault.azure.net/certificates/backupRestoreCertificateName-canrecoveradeletedcertificate-/pending?api-version=7.1&request_id=d95424529c274e2aa1ef4a70d17da79f',
  'Retry-After',
  '10',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '6dbf003a-ad1b-408f-b371-6fbd894ea600',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.123.117;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 02 Jul 2020 18:46:32 GMT',
  'Content-Length',
  '1351'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/backupRestoreCertificateName-canrecoveradeletedcertificate-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/backupRestoreCertificateName-canrecoveradeletedcertificate-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAlehCKoaxYQyTC8Clf/xdkwEzQHVF17SasHDxYB0z2y5qwJ90Bcd1S2ReG/IVjAV/vgVl0IkG1TAw3jLPf8tvbUlRg8utE8O1xTWiz8vLfUuFNu4+2oqUBhUfd5Ymf9go0gdWXVDKKZ1B+vS5q8qi36M67S+Ii2soIRPyfBHU4M+pPk+202UfTQjwAmk1oWqQ0yZlL1xKSgHk2+BW3ljLZaZlZTsLuEu/++s9BVcaZW1OJRwDolvOEwPoNP/tenWcj5DRMqix12T9M+jfxssj4eu84B57IgCjrhQ+V8d6Y2RacpumVicgnKOuxMHwC3UpFaqwc42X0dh/VkeBJiyJgQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAA7Ac7g/NITBD4zZlzfxiXcANa9MTkLYjSmrN0Bljd+XRnaKtGPuCHpl+70aqL8YG8eHR2yG45G1iepIZn3FDSpy9ju3X5ywLcAS2/Ycs0DfALyX4NgmLQhUu/BfMhUU82R8DTIMtZeUPwpxMsL3BOT65ts32hro4jvv2AYqXGIgmHZBejLuCRLrzQ7rDIxZ3t0Zi3PaArv3n3N1x8QF0apZ7PgIF4b8T+d/g46QKB3eTPFxb+/+6Dg6s58JqHte6T/p8RVRfZIG5GuES8d5Xrtu0xy8RFvDTL5uiVTkRvOWfrUzrYYQtvqmXDCiYvCF2w1YNNmZkukACWWOopD/wDg=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"d95424529c274e2aa1ef4a70d17da79f"}, [
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
  'f965b6c6-b805-471e-9037-ea3c5da441cb',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.123.117;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 02 Jul 2020 18:46:32 GMT',
  'Content-Length',
  '1351'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/backupRestoreCertificateName-canrecoveradeletedcertificate-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/backupRestoreCertificateName-canrecoveradeletedcertificate-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAlehCKoaxYQyTC8Clf/xdkwEzQHVF17SasHDxYB0z2y5qwJ90Bcd1S2ReG/IVjAV/vgVl0IkG1TAw3jLPf8tvbUlRg8utE8O1xTWiz8vLfUuFNu4+2oqUBhUfd5Ymf9go0gdWXVDKKZ1B+vS5q8qi36M67S+Ii2soIRPyfBHU4M+pPk+202UfTQjwAmk1oWqQ0yZlL1xKSgHk2+BW3ljLZaZlZTsLuEu/++s9BVcaZW1OJRwDolvOEwPoNP/tenWcj5DRMqix12T9M+jfxssj4eu84B57IgCjrhQ+V8d6Y2RacpumVicgnKOuxMHwC3UpFaqwc42X0dh/VkeBJiyJgQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAA7Ac7g/NITBD4zZlzfxiXcANa9MTkLYjSmrN0Bljd+XRnaKtGPuCHpl+70aqL8YG8eHR2yG45G1iepIZn3FDSpy9ju3X5ywLcAS2/Ycs0DfALyX4NgmLQhUu/BfMhUU82R8DTIMtZeUPwpxMsL3BOT65ts32hro4jvv2AYqXGIgmHZBejLuCRLrzQ7rDIxZ3t0Zi3PaArv3n3N1x8QF0apZ7PgIF4b8T+d/g46QKB3eTPFxb+/+6Dg6s58JqHte6T/p8RVRfZIG5GuES8d5Xrtu0xy8RFvDTL5uiVTkRvOWfrUzrYYQtvqmXDCiYvCF2w1YNNmZkukACWWOopD/wDg=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"d95424529c274e2aa1ef4a70d17da79f"}, [
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
  '92e38c79-6c9d-4411-83d8-2136db5b6a18',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.123.117;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 02 Jul 2020 18:46:33 GMT',
  'Content-Length',
  '1351'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/backupRestoreCertificateName-canrecoveradeletedcertificate-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/backupRestoreCertificateName-canrecoveradeletedcertificate-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAlehCKoaxYQyTC8Clf/xdkwEzQHVF17SasHDxYB0z2y5qwJ90Bcd1S2ReG/IVjAV/vgVl0IkG1TAw3jLPf8tvbUlRg8utE8O1xTWiz8vLfUuFNu4+2oqUBhUfd5Ymf9go0gdWXVDKKZ1B+vS5q8qi36M67S+Ii2soIRPyfBHU4M+pPk+202UfTQjwAmk1oWqQ0yZlL1xKSgHk2+BW3ljLZaZlZTsLuEu/++s9BVcaZW1OJRwDolvOEwPoNP/tenWcj5DRMqix12T9M+jfxssj4eu84B57IgCjrhQ+V8d6Y2RacpumVicgnKOuxMHwC3UpFaqwc42X0dh/VkeBJiyJgQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAA7Ac7g/NITBD4zZlzfxiXcANa9MTkLYjSmrN0Bljd+XRnaKtGPuCHpl+70aqL8YG8eHR2yG45G1iepIZn3FDSpy9ju3X5ywLcAS2/Ycs0DfALyX4NgmLQhUu/BfMhUU82R8DTIMtZeUPwpxMsL3BOT65ts32hro4jvv2AYqXGIgmHZBejLuCRLrzQ7rDIxZ3t0Zi3PaArv3n3N1x8QF0apZ7PgIF4b8T+d/g46QKB3eTPFxb+/+6Dg6s58JqHte6T/p8RVRfZIG5GuES8d5Xrtu0xy8RFvDTL5uiVTkRvOWfrUzrYYQtvqmXDCiYvCF2w1YNNmZkukACWWOopD/wDg=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"d95424529c274e2aa1ef4a70d17da79f"}, [
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
  '54f1576b-2938-4758-ad8d-cb11c2fcec45',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.123.117;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 02 Jul 2020 18:46:35 GMT',
  'Content-Length',
  '1351'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/backupRestoreCertificateName-canrecoveradeletedcertificate-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/backupRestoreCertificateName-canrecoveradeletedcertificate-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAlehCKoaxYQyTC8Clf/xdkwEzQHVF17SasHDxYB0z2y5qwJ90Bcd1S2ReG/IVjAV/vgVl0IkG1TAw3jLPf8tvbUlRg8utE8O1xTWiz8vLfUuFNu4+2oqUBhUfd5Ymf9go0gdWXVDKKZ1B+vS5q8qi36M67S+Ii2soIRPyfBHU4M+pPk+202UfTQjwAmk1oWqQ0yZlL1xKSgHk2+BW3ljLZaZlZTsLuEu/++s9BVcaZW1OJRwDolvOEwPoNP/tenWcj5DRMqix12T9M+jfxssj4eu84B57IgCjrhQ+V8d6Y2RacpumVicgnKOuxMHwC3UpFaqwc42X0dh/VkeBJiyJgQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAA7Ac7g/NITBD4zZlzfxiXcANa9MTkLYjSmrN0Bljd+XRnaKtGPuCHpl+70aqL8YG8eHR2yG45G1iepIZn3FDSpy9ju3X5ywLcAS2/Ycs0DfALyX4NgmLQhUu/BfMhUU82R8DTIMtZeUPwpxMsL3BOT65ts32hro4jvv2AYqXGIgmHZBejLuCRLrzQ7rDIxZ3t0Zi3PaArv3n3N1x8QF0apZ7PgIF4b8T+d/g46QKB3eTPFxb+/+6Dg6s58JqHte6T/p8RVRfZIG5GuES8d5Xrtu0xy8RFvDTL5uiVTkRvOWfrUzrYYQtvqmXDCiYvCF2w1YNNmZkukACWWOopD/wDg=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"d95424529c274e2aa1ef4a70d17da79f"}, [
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
  '7473d0dd-238e-461c-b40a-5e20495eae85',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.123.117;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 02 Jul 2020 18:46:37 GMT',
  'Content-Length',
  '1351'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/backupRestoreCertificateName-canrecoveradeletedcertificate-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/backupRestoreCertificateName-canrecoveradeletedcertificate-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAlehCKoaxYQyTC8Clf/xdkwEzQHVF17SasHDxYB0z2y5qwJ90Bcd1S2ReG/IVjAV/vgVl0IkG1TAw3jLPf8tvbUlRg8utE8O1xTWiz8vLfUuFNu4+2oqUBhUfd5Ymf9go0gdWXVDKKZ1B+vS5q8qi36M67S+Ii2soIRPyfBHU4M+pPk+202UfTQjwAmk1oWqQ0yZlL1xKSgHk2+BW3ljLZaZlZTsLuEu/++s9BVcaZW1OJRwDolvOEwPoNP/tenWcj5DRMqix12T9M+jfxssj4eu84B57IgCjrhQ+V8d6Y2RacpumVicgnKOuxMHwC3UpFaqwc42X0dh/VkeBJiyJgQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAA7Ac7g/NITBD4zZlzfxiXcANa9MTkLYjSmrN0Bljd+XRnaKtGPuCHpl+70aqL8YG8eHR2yG45G1iepIZn3FDSpy9ju3X5ywLcAS2/Ycs0DfALyX4NgmLQhUu/BfMhUU82R8DTIMtZeUPwpxMsL3BOT65ts32hro4jvv2AYqXGIgmHZBejLuCRLrzQ7rDIxZ3t0Zi3PaArv3n3N1x8QF0apZ7PgIF4b8T+d/g46QKB3eTPFxb+/+6Dg6s58JqHte6T/p8RVRfZIG5GuES8d5Xrtu0xy8RFvDTL5uiVTkRvOWfrUzrYYQtvqmXDCiYvCF2w1YNNmZkukACWWOopD/wDg=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"d95424529c274e2aa1ef4a70d17da79f"}, [
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
  'be8eb2e5-ae58-4775-b925-6319c5c1bfa4',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.123.117;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 02 Jul 2020 18:46:39 GMT',
  'Content-Length',
  '1351'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/backupRestoreCertificateName-canrecoveradeletedcertificate-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/backupRestoreCertificateName-canrecoveradeletedcertificate-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAlehCKoaxYQyTC8Clf/xdkwEzQHVF17SasHDxYB0z2y5qwJ90Bcd1S2ReG/IVjAV/vgVl0IkG1TAw3jLPf8tvbUlRg8utE8O1xTWiz8vLfUuFNu4+2oqUBhUfd5Ymf9go0gdWXVDKKZ1B+vS5q8qi36M67S+Ii2soIRPyfBHU4M+pPk+202UfTQjwAmk1oWqQ0yZlL1xKSgHk2+BW3ljLZaZlZTsLuEu/++s9BVcaZW1OJRwDolvOEwPoNP/tenWcj5DRMqix12T9M+jfxssj4eu84B57IgCjrhQ+V8d6Y2RacpumVicgnKOuxMHwC3UpFaqwc42X0dh/VkeBJiyJgQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAA7Ac7g/NITBD4zZlzfxiXcANa9MTkLYjSmrN0Bljd+XRnaKtGPuCHpl+70aqL8YG8eHR2yG45G1iepIZn3FDSpy9ju3X5ywLcAS2/Ycs0DfALyX4NgmLQhUu/BfMhUU82R8DTIMtZeUPwpxMsL3BOT65ts32hro4jvv2AYqXGIgmHZBejLuCRLrzQ7rDIxZ3t0Zi3PaArv3n3N1x8QF0apZ7PgIF4b8T+d/g46QKB3eTPFxb+/+6Dg6s58JqHte6T/p8RVRfZIG5GuES8d5Xrtu0xy8RFvDTL5uiVTkRvOWfrUzrYYQtvqmXDCiYvCF2w1YNNmZkukACWWOopD/wDg=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"d95424529c274e2aa1ef4a70d17da79f"}, [
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
  '54fdd942-17d4-4d88-ad72-c38fdaa8cb82',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.123.117;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 02 Jul 2020 18:46:41 GMT',
  'Content-Length',
  '1351'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/backupRestoreCertificateName-canrecoveradeletedcertificate-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/backupRestoreCertificateName-canrecoveradeletedcertificate-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAlehCKoaxYQyTC8Clf/xdkwEzQHVF17SasHDxYB0z2y5qwJ90Bcd1S2ReG/IVjAV/vgVl0IkG1TAw3jLPf8tvbUlRg8utE8O1xTWiz8vLfUuFNu4+2oqUBhUfd5Ymf9go0gdWXVDKKZ1B+vS5q8qi36M67S+Ii2soIRPyfBHU4M+pPk+202UfTQjwAmk1oWqQ0yZlL1xKSgHk2+BW3ljLZaZlZTsLuEu/++s9BVcaZW1OJRwDolvOEwPoNP/tenWcj5DRMqix12T9M+jfxssj4eu84B57IgCjrhQ+V8d6Y2RacpumVicgnKOuxMHwC3UpFaqwc42X0dh/VkeBJiyJgQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAA7Ac7g/NITBD4zZlzfxiXcANa9MTkLYjSmrN0Bljd+XRnaKtGPuCHpl+70aqL8YG8eHR2yG45G1iepIZn3FDSpy9ju3X5ywLcAS2/Ycs0DfALyX4NgmLQhUu/BfMhUU82R8DTIMtZeUPwpxMsL3BOT65ts32hro4jvv2AYqXGIgmHZBejLuCRLrzQ7rDIxZ3t0Zi3PaArv3n3N1x8QF0apZ7PgIF4b8T+d/g46QKB3eTPFxb+/+6Dg6s58JqHte6T/p8RVRfZIG5GuES8d5Xrtu0xy8RFvDTL5uiVTkRvOWfrUzrYYQtvqmXDCiYvCF2w1YNNmZkukACWWOopD/wDg=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"d95424529c274e2aa1ef4a70d17da79f"}, [
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
  'ff6d48ef-4ac2-4cb3-8cdf-a5c3a004cfb7',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.123.117;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 02 Jul 2020 18:46:43 GMT',
  'Content-Length',
  '1351'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/backupRestoreCertificateName-canrecoveradeletedcertificate-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/backupRestoreCertificateName-canrecoveradeletedcertificate-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAlehCKoaxYQyTC8Clf/xdkwEzQHVF17SasHDxYB0z2y5qwJ90Bcd1S2ReG/IVjAV/vgVl0IkG1TAw3jLPf8tvbUlRg8utE8O1xTWiz8vLfUuFNu4+2oqUBhUfd5Ymf9go0gdWXVDKKZ1B+vS5q8qi36M67S+Ii2soIRPyfBHU4M+pPk+202UfTQjwAmk1oWqQ0yZlL1xKSgHk2+BW3ljLZaZlZTsLuEu/++s9BVcaZW1OJRwDolvOEwPoNP/tenWcj5DRMqix12T9M+jfxssj4eu84B57IgCjrhQ+V8d6Y2RacpumVicgnKOuxMHwC3UpFaqwc42X0dh/VkeBJiyJgQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAA7Ac7g/NITBD4zZlzfxiXcANa9MTkLYjSmrN0Bljd+XRnaKtGPuCHpl+70aqL8YG8eHR2yG45G1iepIZn3FDSpy9ju3X5ywLcAS2/Ycs0DfALyX4NgmLQhUu/BfMhUU82R8DTIMtZeUPwpxMsL3BOT65ts32hro4jvv2AYqXGIgmHZBejLuCRLrzQ7rDIxZ3t0Zi3PaArv3n3N1x8QF0apZ7PgIF4b8T+d/g46QKB3eTPFxb+/+6Dg6s58JqHte6T/p8RVRfZIG5GuES8d5Xrtu0xy8RFvDTL5uiVTkRvOWfrUzrYYQtvqmXDCiYvCF2w1YNNmZkukACWWOopD/wDg=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"d95424529c274e2aa1ef4a70d17da79f"}, [
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
  '3a05b70a-1715-43d9-8124-886aeacddac4',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.123.117;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 02 Jul 2020 18:46:45 GMT',
  'Content-Length',
  '1351'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/backupRestoreCertificateName-canrecoveradeletedcertificate-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/backupRestoreCertificateName-canrecoveradeletedcertificate-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAlehCKoaxYQyTC8Clf/xdkwEzQHVF17SasHDxYB0z2y5qwJ90Bcd1S2ReG/IVjAV/vgVl0IkG1TAw3jLPf8tvbUlRg8utE8O1xTWiz8vLfUuFNu4+2oqUBhUfd5Ymf9go0gdWXVDKKZ1B+vS5q8qi36M67S+Ii2soIRPyfBHU4M+pPk+202UfTQjwAmk1oWqQ0yZlL1xKSgHk2+BW3ljLZaZlZTsLuEu/++s9BVcaZW1OJRwDolvOEwPoNP/tenWcj5DRMqix12T9M+jfxssj4eu84B57IgCjrhQ+V8d6Y2RacpumVicgnKOuxMHwC3UpFaqwc42X0dh/VkeBJiyJgQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAA7Ac7g/NITBD4zZlzfxiXcANa9MTkLYjSmrN0Bljd+XRnaKtGPuCHpl+70aqL8YG8eHR2yG45G1iepIZn3FDSpy9ju3X5ywLcAS2/Ycs0DfALyX4NgmLQhUu/BfMhUU82R8DTIMtZeUPwpxMsL3BOT65ts32hro4jvv2AYqXGIgmHZBejLuCRLrzQ7rDIxZ3t0Zi3PaArv3n3N1x8QF0apZ7PgIF4b8T+d/g46QKB3eTPFxb+/+6Dg6s58JqHte6T/p8RVRfZIG5GuES8d5Xrtu0xy8RFvDTL5uiVTkRvOWfrUzrYYQtvqmXDCiYvCF2w1YNNmZkukACWWOopD/wDg=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"d95424529c274e2aa1ef4a70d17da79f"}, [
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
  'dfa576a4-619b-47c2-922a-f390577e6c7b',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.123.117;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 02 Jul 2020 18:46:47 GMT',
  'Content-Length',
  '1351'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/backupRestoreCertificateName-canrecoveradeletedcertificate-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/backupRestoreCertificateName-canrecoveradeletedcertificate-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAlehCKoaxYQyTC8Clf/xdkwEzQHVF17SasHDxYB0z2y5qwJ90Bcd1S2ReG/IVjAV/vgVl0IkG1TAw3jLPf8tvbUlRg8utE8O1xTWiz8vLfUuFNu4+2oqUBhUfd5Ymf9go0gdWXVDKKZ1B+vS5q8qi36M67S+Ii2soIRPyfBHU4M+pPk+202UfTQjwAmk1oWqQ0yZlL1xKSgHk2+BW3ljLZaZlZTsLuEu/++s9BVcaZW1OJRwDolvOEwPoNP/tenWcj5DRMqix12T9M+jfxssj4eu84B57IgCjrhQ+V8d6Y2RacpumVicgnKOuxMHwC3UpFaqwc42X0dh/VkeBJiyJgQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAA7Ac7g/NITBD4zZlzfxiXcANa9MTkLYjSmrN0Bljd+XRnaKtGPuCHpl+70aqL8YG8eHR2yG45G1iepIZn3FDSpy9ju3X5ywLcAS2/Ycs0DfALyX4NgmLQhUu/BfMhUU82R8DTIMtZeUPwpxMsL3BOT65ts32hro4jvv2AYqXGIgmHZBejLuCRLrzQ7rDIxZ3t0Zi3PaArv3n3N1x8QF0apZ7PgIF4b8T+d/g46QKB3eTPFxb+/+6Dg6s58JqHte6T/p8RVRfZIG5GuES8d5Xrtu0xy8RFvDTL5uiVTkRvOWfrUzrYYQtvqmXDCiYvCF2w1YNNmZkukACWWOopD/wDg=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"d95424529c274e2aa1ef4a70d17da79f"}, [
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
  '7e626b1d-e530-457a-aa78-207dcbbeac0b',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.123.117;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 02 Jul 2020 18:46:49 GMT',
  'Content-Length',
  '1351'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/backupRestoreCertificateName-canrecoveradeletedcertificate-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/backupRestoreCertificateName-canrecoveradeletedcertificate-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAlehCKoaxYQyTC8Clf/xdkwEzQHVF17SasHDxYB0z2y5qwJ90Bcd1S2ReG/IVjAV/vgVl0IkG1TAw3jLPf8tvbUlRg8utE8O1xTWiz8vLfUuFNu4+2oqUBhUfd5Ymf9go0gdWXVDKKZ1B+vS5q8qi36M67S+Ii2soIRPyfBHU4M+pPk+202UfTQjwAmk1oWqQ0yZlL1xKSgHk2+BW3ljLZaZlZTsLuEu/++s9BVcaZW1OJRwDolvOEwPoNP/tenWcj5DRMqix12T9M+jfxssj4eu84B57IgCjrhQ+V8d6Y2RacpumVicgnKOuxMHwC3UpFaqwc42X0dh/VkeBJiyJgQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAA7Ac7g/NITBD4zZlzfxiXcANa9MTkLYjSmrN0Bljd+XRnaKtGPuCHpl+70aqL8YG8eHR2yG45G1iepIZn3FDSpy9ju3X5ywLcAS2/Ycs0DfALyX4NgmLQhUu/BfMhUU82R8DTIMtZeUPwpxMsL3BOT65ts32hro4jvv2AYqXGIgmHZBejLuCRLrzQ7rDIxZ3t0Zi3PaArv3n3N1x8QF0apZ7PgIF4b8T+d/g46QKB3eTPFxb+/+6Dg6s58JqHte6T/p8RVRfZIG5GuES8d5Xrtu0xy8RFvDTL5uiVTkRvOWfrUzrYYQtvqmXDCiYvCF2w1YNNmZkukACWWOopD/wDg=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"d95424529c274e2aa1ef4a70d17da79f"}, [
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
  '2a7d7dba-d9c4-43da-8e25-221c25cedce5',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.123.117;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 02 Jul 2020 18:46:52 GMT',
  'Content-Length',
  '1351'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/backupRestoreCertificateName-canrecoveradeletedcertificate-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/backupRestoreCertificateName-canrecoveradeletedcertificate-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAlehCKoaxYQyTC8Clf/xdkwEzQHVF17SasHDxYB0z2y5qwJ90Bcd1S2ReG/IVjAV/vgVl0IkG1TAw3jLPf8tvbUlRg8utE8O1xTWiz8vLfUuFNu4+2oqUBhUfd5Ymf9go0gdWXVDKKZ1B+vS5q8qi36M67S+Ii2soIRPyfBHU4M+pPk+202UfTQjwAmk1oWqQ0yZlL1xKSgHk2+BW3ljLZaZlZTsLuEu/++s9BVcaZW1OJRwDolvOEwPoNP/tenWcj5DRMqix12T9M+jfxssj4eu84B57IgCjrhQ+V8d6Y2RacpumVicgnKOuxMHwC3UpFaqwc42X0dh/VkeBJiyJgQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAA7Ac7g/NITBD4zZlzfxiXcANa9MTkLYjSmrN0Bljd+XRnaKtGPuCHpl+70aqL8YG8eHR2yG45G1iepIZn3FDSpy9ju3X5ywLcAS2/Ycs0DfALyX4NgmLQhUu/BfMhUU82R8DTIMtZeUPwpxMsL3BOT65ts32hro4jvv2AYqXGIgmHZBejLuCRLrzQ7rDIxZ3t0Zi3PaArv3n3N1x8QF0apZ7PgIF4b8T+d/g46QKB3eTPFxb+/+6Dg6s58JqHte6T/p8RVRfZIG5GuES8d5Xrtu0xy8RFvDTL5uiVTkRvOWfrUzrYYQtvqmXDCiYvCF2w1YNNmZkukACWWOopD/wDg=","cancellation_requested":false,"status":"completed","target":"https://keyvault_name.vault.azure.net/certificates/backupRestoreCertificateName-canrecoveradeletedcertificate-","request_id":"d95424529c274e2aa1ef4a70d17da79f"}, [
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
  'fbe3a243-1f65-495d-87d3-5fd6a457b08d',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.123.117;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 02 Jul 2020 18:46:54 GMT',
  'Content-Length',
  '1329'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/backupRestoreCertificateName-canrecoveradeletedcertificate-/')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/backupRestoreCertificateName-canrecoveradeletedcertificate-/3c34ebd06f804059890894c674eda3de","kid":"https://keyvault_name.vault.azure.net/keys/backupRestoreCertificateName-canrecoveradeletedcertificate-/3c34ebd06f804059890894c674eda3de","sid":"https://keyvault_name.vault.azure.net/secrets/backupRestoreCertificateName-canrecoveradeletedcertificate-/3c34ebd06f804059890894c674eda3de","x5t":"k_ksr0WmOT6Gf8Ikdwz9ftPhylk","cer":"MIIDKDCCAhCgAwIBAgIQdPv/TEpkQCOMN2U3G2q8EjANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjAwNzAyMTgzNjUxWhcNMjEwNzAyMTg0NjUxWjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQCV6EIqhrFhDJMLwKV//F2TATNAdUXXtJqwcPFgHTPbLmrAn3QFx3VLZF4b8hWMBX++BWXQiQbVMDDeMs9/y29tSVGDy60Tw7XFNaLPy8t9S4U27j7aipQGFR93liZ/2CjSB1ZdUMopnUH69LmryqLfozrtL4iLayghE/J8EdTgz6k+T7bTZR9NCPACaTWhapDTJmUvXEpKAeTb4FbeWMtlpmVlOwu4S7/76z0FVxplbU4lHAOiW84TA+g0/+16dZyPkNEyqLHXZP0z6N/GyyPh67zgHnsiAKOuFD5Xx3pjZFpym6ZWJyCco67EwfALdSkVqrBzjZfR2H9WR4EmLImBAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBTxSBEdGhs3PF9qdUYXVMvIU9xkCTAdBgNVHQ4EFgQU8UgRHRobNzxfanVGF1TLyFPcZAkwDQYJKoZIhvcNAQELBQADggEBAGgKaXLzlZTRzdA0dRYI9zbPoIecLbnUhp+Jouzx0vCD1leDjue6UNqj0DAN6AlLLTVgoqB0Uc5LwmKsOGE8PFTA9zNHj+Wxwiea1x+10UPxWudIJeFR3rvO62aCxDCo1WT5KPOwgxLzDwUBLKc4c9iw51j0F9gNbliL2lw4Pps9xGIl7sBS+NDV5GNclNjn3pSg1EUly4AQ51ERDRxtv9cU2ouMzDeddWADqi8mpVa+BvEsQIMhuG8OK+i3GREhuhyH7Z1JGpV5nlOZ/5wCaMTz7F0cMF0RC4PGoUN1lPI2A64pF2cd+AdoAsqprzqc70cbJk2jSGBhYgn1gbsRvYE=","attributes":{"enabled":true,"nbf":1593715011,"exp":1625251611,"created":1593715611,"updated":1593715611,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/backupRestoreCertificateName-canrecoveradeletedcertificate-/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1593715592,"updated":1593715592}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/backupRestoreCertificateName-canrecoveradeletedcertificate-/pending"}}, [
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
  '4403853a-76b6-4a19-97e5-91e78729322b',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.123.117;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 02 Jul 2020 18:46:54 GMT',
  'Content-Length',
  '2645'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/certificates/backupRestoreCertificateName-canrecoveradeletedcertificate-')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/backupRestoreCertificateName-canrecoveradeletedcertificate-","deletedDate":1593715614,"scheduledPurgeDate":1601491614,"id":"https://keyvault_name.vault.azure.net/certificates/backupRestoreCertificateName-canrecoveradeletedcertificate-/3c34ebd06f804059890894c674eda3de","kid":"https://keyvault_name.vault.azure.net/keys/backupRestoreCertificateName-canrecoveradeletedcertificate-/3c34ebd06f804059890894c674eda3de","sid":"https://keyvault_name.vault.azure.net/secrets/backupRestoreCertificateName-canrecoveradeletedcertificate-/3c34ebd06f804059890894c674eda3de","x5t":"k_ksr0WmOT6Gf8Ikdwz9ftPhylk","cer":"MIIDKDCCAhCgAwIBAgIQdPv/TEpkQCOMN2U3G2q8EjANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjAwNzAyMTgzNjUxWhcNMjEwNzAyMTg0NjUxWjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQCV6EIqhrFhDJMLwKV//F2TATNAdUXXtJqwcPFgHTPbLmrAn3QFx3VLZF4b8hWMBX++BWXQiQbVMDDeMs9/y29tSVGDy60Tw7XFNaLPy8t9S4U27j7aipQGFR93liZ/2CjSB1ZdUMopnUH69LmryqLfozrtL4iLayghE/J8EdTgz6k+T7bTZR9NCPACaTWhapDTJmUvXEpKAeTb4FbeWMtlpmVlOwu4S7/76z0FVxplbU4lHAOiW84TA+g0/+16dZyPkNEyqLHXZP0z6N/GyyPh67zgHnsiAKOuFD5Xx3pjZFpym6ZWJyCco67EwfALdSkVqrBzjZfR2H9WR4EmLImBAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBTxSBEdGhs3PF9qdUYXVMvIU9xkCTAdBgNVHQ4EFgQU8UgRHRobNzxfanVGF1TLyFPcZAkwDQYJKoZIhvcNAQELBQADggEBAGgKaXLzlZTRzdA0dRYI9zbPoIecLbnUhp+Jouzx0vCD1leDjue6UNqj0DAN6AlLLTVgoqB0Uc5LwmKsOGE8PFTA9zNHj+Wxwiea1x+10UPxWudIJeFR3rvO62aCxDCo1WT5KPOwgxLzDwUBLKc4c9iw51j0F9gNbliL2lw4Pps9xGIl7sBS+NDV5GNclNjn3pSg1EUly4AQ51ERDRxtv9cU2ouMzDeddWADqi8mpVa+BvEsQIMhuG8OK+i3GREhuhyH7Z1JGpV5nlOZ/5wCaMTz7F0cMF0RC4PGoUN1lPI2A64pF2cd+AdoAsqprzqc70cbJk2jSGBhYgn1gbsRvYE=","attributes":{"enabled":true,"nbf":1593715011,"exp":1625251611,"created":1593715611,"updated":1593715611,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/backupRestoreCertificateName-canrecoveradeletedcertificate-/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1593715592,"updated":1593715592}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/backupRestoreCertificateName-canrecoveradeletedcertificate-/pending"}}, [
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
  '3fceef56-69ab-4851-945a-ed4faea53fa6',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.123.117;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 02 Jul 2020 18:46:54 GMT',
  'Content-Length',
  '2856'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/backupRestoreCertificateName-canrecoveradeletedcertificate-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: backupRestoreCertificateName-canrecoveradeletedcertificate-"}}, [
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
  '05b991f9-5c9d-41f7-a754-395b08539c39',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.123.117;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 02 Jul 2020 18:46:54 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/backupRestoreCertificateName-canrecoveradeletedcertificate-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: backupRestoreCertificateName-canrecoveradeletedcertificate-"}}, [
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
  'dfda1eaf-0cc0-47bc-89e4-8edbc5dc5d1d',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.123.117;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 02 Jul 2020 18:46:54 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/backupRestoreCertificateName-canrecoveradeletedcertificate-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: backupRestoreCertificateName-canrecoveradeletedcertificate-"}}, [
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
  'c7e29e10-322b-4328-a590-ea5d585de7c3',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.123.117;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 02 Jul 2020 18:46:56 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/backupRestoreCertificateName-canrecoveradeletedcertificate-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: backupRestoreCertificateName-canrecoveradeletedcertificate-"}}, [
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
  '1a83054e-1857-43e2-9ae1-3aedfd786bde',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.123.117;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 02 Jul 2020 18:46:58 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/backupRestoreCertificateName-canrecoveradeletedcertificate-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: backupRestoreCertificateName-canrecoveradeletedcertificate-"}}, [
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
  '087b0f37-297a-4125-8cb1-c8e88a02ed34',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.123.117;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 02 Jul 2020 18:47:00 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/backupRestoreCertificateName-canrecoveradeletedcertificate-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: backupRestoreCertificateName-canrecoveradeletedcertificate-"}}, [
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
  'bc815ae1-a8bf-4c06-98e2-cf5d44dcf89f',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.123.117;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 02 Jul 2020 18:47:02 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/backupRestoreCertificateName-canrecoveradeletedcertificate-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: backupRestoreCertificateName-canrecoveradeletedcertificate-"}}, [
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
  '0a07142d-5229-4cf7-b9c9-b1254f5bd228',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.123.117;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 02 Jul 2020 18:47:04 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/backupRestoreCertificateName-canrecoveradeletedcertificate-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: backupRestoreCertificateName-canrecoveradeletedcertificate-"}}, [
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
  '8648c857-0f52-4250-b774-e7b9ed3f9a55',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.123.117;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 02 Jul 2020 18:47:06 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/backupRestoreCertificateName-canrecoveradeletedcertificate-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: backupRestoreCertificateName-canrecoveradeletedcertificate-"}}, [
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
  '3d3f2a6d-b1fe-4d8a-ae63-d70fab75dd6d',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.123.117;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 02 Jul 2020 18:47:08 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/backupRestoreCertificateName-canrecoveradeletedcertificate-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: backupRestoreCertificateName-canrecoveradeletedcertificate-"}}, [
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
  'c43e7eb9-b2b3-4479-85d9-6ee45ead2210',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.123.117;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 02 Jul 2020 18:47:10 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/backupRestoreCertificateName-canrecoveradeletedcertificate-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: backupRestoreCertificateName-canrecoveradeletedcertificate-"}}, [
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
  '78aa2eb4-cdfe-468d-9da4-60e4afd26678',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.123.117;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 02 Jul 2020 18:47:12 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/backupRestoreCertificateName-canrecoveradeletedcertificate-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: backupRestoreCertificateName-canrecoveradeletedcertificate-"}}, [
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
  'aa6f59e8-6ff6-4e37-bca5-dd206efe1660',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.123.117;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 02 Jul 2020 18:47:15 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/backupRestoreCertificateName-canrecoveradeletedcertificate-')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/backupRestoreCertificateName-canrecoveradeletedcertificate-","deletedDate":1593715614,"scheduledPurgeDate":1601491614,"id":"https://keyvault_name.vault.azure.net/certificates/backupRestoreCertificateName-canrecoveradeletedcertificate-/3c34ebd06f804059890894c674eda3de","kid":"https://keyvault_name.vault.azure.net/keys/backupRestoreCertificateName-canrecoveradeletedcertificate-/3c34ebd06f804059890894c674eda3de","sid":"https://keyvault_name.vault.azure.net/secrets/backupRestoreCertificateName-canrecoveradeletedcertificate-/3c34ebd06f804059890894c674eda3de","x5t":"k_ksr0WmOT6Gf8Ikdwz9ftPhylk","cer":"MIIDKDCCAhCgAwIBAgIQdPv/TEpkQCOMN2U3G2q8EjANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjAwNzAyMTgzNjUxWhcNMjEwNzAyMTg0NjUxWjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQCV6EIqhrFhDJMLwKV//F2TATNAdUXXtJqwcPFgHTPbLmrAn3QFx3VLZF4b8hWMBX++BWXQiQbVMDDeMs9/y29tSVGDy60Tw7XFNaLPy8t9S4U27j7aipQGFR93liZ/2CjSB1ZdUMopnUH69LmryqLfozrtL4iLayghE/J8EdTgz6k+T7bTZR9NCPACaTWhapDTJmUvXEpKAeTb4FbeWMtlpmVlOwu4S7/76z0FVxplbU4lHAOiW84TA+g0/+16dZyPkNEyqLHXZP0z6N/GyyPh67zgHnsiAKOuFD5Xx3pjZFpym6ZWJyCco67EwfALdSkVqrBzjZfR2H9WR4EmLImBAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBTxSBEdGhs3PF9qdUYXVMvIU9xkCTAdBgNVHQ4EFgQU8UgRHRobNzxfanVGF1TLyFPcZAkwDQYJKoZIhvcNAQELBQADggEBAGgKaXLzlZTRzdA0dRYI9zbPoIecLbnUhp+Jouzx0vCD1leDjue6UNqj0DAN6AlLLTVgoqB0Uc5LwmKsOGE8PFTA9zNHj+Wxwiea1x+10UPxWudIJeFR3rvO62aCxDCo1WT5KPOwgxLzDwUBLKc4c9iw51j0F9gNbliL2lw4Pps9xGIl7sBS+NDV5GNclNjn3pSg1EUly4AQ51ERDRxtv9cU2ouMzDeddWADqi8mpVa+BvEsQIMhuG8OK+i3GREhuhyH7Z1JGpV5nlOZ/5wCaMTz7F0cMF0RC4PGoUN1lPI2A64pF2cd+AdoAsqprzqc70cbJk2jSGBhYgn1gbsRvYE=","attributes":{"enabled":true,"nbf":1593715011,"exp":1625251611,"created":1593715611,"updated":1593715611,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/backupRestoreCertificateName-canrecoveradeletedcertificate-/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1593715592,"updated":1593715592}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/backupRestoreCertificateName-canrecoveradeletedcertificate-/pending"}}, [
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
  '663e4133-4335-4cd8-a42d-c956e9ce12c8',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.123.117;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 02 Jul 2020 18:47:17 GMT',
  'Content-Length',
  '2856'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/backupRestoreCertificateName-canrecoveradeletedcertificate-/')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"A certificate with (name/id) backupRestoreCertificateName-canrecoveradeletedcertificate- was not found in this key vault. If you recently deleted this certificate you may be able to recover it using the correct recovery command. For help resolving this issue, please see https://go.microsoft.com/fwlink/?linkid=2125182"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '387',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '5ab87945-5cd5-4554-893e-18d96e3d3887',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.123.117;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 02 Jul 2020 18:47:17 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/deletedcertificates/backupRestoreCertificateName-canrecoveradeletedcertificate-/recover')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/backupRestoreCertificateName-canrecoveradeletedcertificate-/3c34ebd06f804059890894c674eda3de","kid":"https://keyvault_name.vault.azure.net/keys/backupRestoreCertificateName-canrecoveradeletedcertificate-/3c34ebd06f804059890894c674eda3de","sid":"https://keyvault_name.vault.azure.net/secrets/backupRestoreCertificateName-canrecoveradeletedcertificate-/3c34ebd06f804059890894c674eda3de","x5t":"k_ksr0WmOT6Gf8Ikdwz9ftPhylk","cer":"MIIDKDCCAhCgAwIBAgIQdPv/TEpkQCOMN2U3G2q8EjANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjAwNzAyMTgzNjUxWhcNMjEwNzAyMTg0NjUxWjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQCV6EIqhrFhDJMLwKV//F2TATNAdUXXtJqwcPFgHTPbLmrAn3QFx3VLZF4b8hWMBX++BWXQiQbVMDDeMs9/y29tSVGDy60Tw7XFNaLPy8t9S4U27j7aipQGFR93liZ/2CjSB1ZdUMopnUH69LmryqLfozrtL4iLayghE/J8EdTgz6k+T7bTZR9NCPACaTWhapDTJmUvXEpKAeTb4FbeWMtlpmVlOwu4S7/76z0FVxplbU4lHAOiW84TA+g0/+16dZyPkNEyqLHXZP0z6N/GyyPh67zgHnsiAKOuFD5Xx3pjZFpym6ZWJyCco67EwfALdSkVqrBzjZfR2H9WR4EmLImBAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBTxSBEdGhs3PF9qdUYXVMvIU9xkCTAdBgNVHQ4EFgQU8UgRHRobNzxfanVGF1TLyFPcZAkwDQYJKoZIhvcNAQELBQADggEBAGgKaXLzlZTRzdA0dRYI9zbPoIecLbnUhp+Jouzx0vCD1leDjue6UNqj0DAN6AlLLTVgoqB0Uc5LwmKsOGE8PFTA9zNHj+Wxwiea1x+10UPxWudIJeFR3rvO62aCxDCo1WT5KPOwgxLzDwUBLKc4c9iw51j0F9gNbliL2lw4Pps9xGIl7sBS+NDV5GNclNjn3pSg1EUly4AQ51ERDRxtv9cU2ouMzDeddWADqi8mpVa+BvEsQIMhuG8OK+i3GREhuhyH7Z1JGpV5nlOZ/5wCaMTz7F0cMF0RC4PGoUN1lPI2A64pF2cd+AdoAsqprzqc70cbJk2jSGBhYgn1gbsRvYE=","attributes":{"enabled":true,"nbf":1593715011,"exp":1625251611,"created":1593715611,"updated":1593715611,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/backupRestoreCertificateName-canrecoveradeletedcertificate-/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1593715592,"updated":1593715592}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/backupRestoreCertificateName-canrecoveradeletedcertificate-/pending"}}, [
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
  'f66b00ac-4076-416e-91bb-250f7a617f9e',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.123.117;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 02 Jul 2020 18:47:17 GMT',
  'Content-Length',
  '2645'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/backupRestoreCertificateName-canrecoveradeletedcertificate-/')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"A certificate with (name/id) backupRestoreCertificateName-canrecoveradeletedcertificate- was not found in this key vault. If you recently deleted this certificate you may be able to recover it using the correct recovery command. For help resolving this issue, please see https://go.microsoft.com/fwlink/?linkid=2125182"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '387',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '681cfd57-1d78-409e-88ae-d9d840e1c9ef',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.123.117;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 02 Jul 2020 18:47:17 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/backupRestoreCertificateName-canrecoveradeletedcertificate-/')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"A certificate with (name/id) backupRestoreCertificateName-canrecoveradeletedcertificate- was not found in this key vault. If you recently deleted this certificate you may be able to recover it using the correct recovery command. For help resolving this issue, please see https://go.microsoft.com/fwlink/?linkid=2125182"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '387',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'ef52200d-cc32-407e-9c3e-da10e33d7a42',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.123.117;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 02 Jul 2020 18:47:17 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/backupRestoreCertificateName-canrecoveradeletedcertificate-/')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"A certificate with (name/id) backupRestoreCertificateName-canrecoveradeletedcertificate- was not found in this key vault. If you recently deleted this certificate you may be able to recover it using the correct recovery command. For help resolving this issue, please see https://go.microsoft.com/fwlink/?linkid=2125182"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '387',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '6de2469c-343c-4468-a489-d37f5085ade7',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.123.117;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 02 Jul 2020 18:47:19 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/backupRestoreCertificateName-canrecoveradeletedcertificate-/')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"A certificate with (name/id) backupRestoreCertificateName-canrecoveradeletedcertificate- was not found in this key vault. If you recently deleted this certificate you may be able to recover it using the correct recovery command. For help resolving this issue, please see https://go.microsoft.com/fwlink/?linkid=2125182"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '387',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '27bd5b63-7c13-4c9a-a870-3e584caa2882',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.123.117;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 02 Jul 2020 18:47:21 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/backupRestoreCertificateName-canrecoveradeletedcertificate-/')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"A certificate with (name/id) backupRestoreCertificateName-canrecoveradeletedcertificate- was not found in this key vault. If you recently deleted this certificate you may be able to recover it using the correct recovery command. For help resolving this issue, please see https://go.microsoft.com/fwlink/?linkid=2125182"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '387',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '9471afa7-cb65-4843-9e93-da4ed9711ab5',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.123.117;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 02 Jul 2020 18:47:23 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/backupRestoreCertificateName-canrecoveradeletedcertificate-/')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"A certificate with (name/id) backupRestoreCertificateName-canrecoveradeletedcertificate- was not found in this key vault. If you recently deleted this certificate you may be able to recover it using the correct recovery command. For help resolving this issue, please see https://go.microsoft.com/fwlink/?linkid=2125182"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '387',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'd63ff0bb-dd04-43ae-bc26-50965c8a1806',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.123.117;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 02 Jul 2020 18:47:25 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/backupRestoreCertificateName-canrecoveradeletedcertificate-/')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"A certificate with (name/id) backupRestoreCertificateName-canrecoveradeletedcertificate- was not found in this key vault. If you recently deleted this certificate you may be able to recover it using the correct recovery command. For help resolving this issue, please see https://go.microsoft.com/fwlink/?linkid=2125182"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '387',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'e481c4d7-2434-4513-954a-70ec234d7845',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.123.117;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 02 Jul 2020 18:47:27 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/backupRestoreCertificateName-canrecoveradeletedcertificate-/')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"A certificate with (name/id) backupRestoreCertificateName-canrecoveradeletedcertificate- was not found in this key vault. If you recently deleted this certificate you may be able to recover it using the correct recovery command. For help resolving this issue, please see https://go.microsoft.com/fwlink/?linkid=2125182"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '387',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'f185c5c5-a7f5-4589-8f9b-0981131f33c5',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.123.117;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 02 Jul 2020 18:47:29 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/backupRestoreCertificateName-canrecoveradeletedcertificate-/')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"A certificate with (name/id) backupRestoreCertificateName-canrecoveradeletedcertificate- was not found in this key vault. If you recently deleted this certificate you may be able to recover it using the correct recovery command. For help resolving this issue, please see https://go.microsoft.com/fwlink/?linkid=2125182"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '387',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '5f98eb16-cf93-4ed7-87e3-c95dd1b16c3f',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.123.117;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 02 Jul 2020 18:47:31 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/backupRestoreCertificateName-canrecoveradeletedcertificate-/')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"A certificate with (name/id) backupRestoreCertificateName-canrecoveradeletedcertificate- was not found in this key vault. If you recently deleted this certificate you may be able to recover it using the correct recovery command. For help resolving this issue, please see https://go.microsoft.com/fwlink/?linkid=2125182"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '387',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'cd130113-2168-4c4a-83a4-efb4c6d9b61c',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.123.117;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 02 Jul 2020 18:47:33 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/backupRestoreCertificateName-canrecoveradeletedcertificate-/')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"A certificate with (name/id) backupRestoreCertificateName-canrecoveradeletedcertificate- was not found in this key vault. If you recently deleted this certificate you may be able to recover it using the correct recovery command. For help resolving this issue, please see https://go.microsoft.com/fwlink/?linkid=2125182"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '387',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '3d52c157-35ff-4cd9-bd50-f2ab8b1930b2',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.123.117;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 02 Jul 2020 18:47:35 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/backupRestoreCertificateName-canrecoveradeletedcertificate-/')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/backupRestoreCertificateName-canrecoveradeletedcertificate-/3c34ebd06f804059890894c674eda3de","kid":"https://keyvault_name.vault.azure.net/keys/backupRestoreCertificateName-canrecoveradeletedcertificate-/3c34ebd06f804059890894c674eda3de","sid":"https://keyvault_name.vault.azure.net/secrets/backupRestoreCertificateName-canrecoveradeletedcertificate-/3c34ebd06f804059890894c674eda3de","x5t":"k_ksr0WmOT6Gf8Ikdwz9ftPhylk","cer":"MIIDKDCCAhCgAwIBAgIQdPv/TEpkQCOMN2U3G2q8EjANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjAwNzAyMTgzNjUxWhcNMjEwNzAyMTg0NjUxWjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQCV6EIqhrFhDJMLwKV//F2TATNAdUXXtJqwcPFgHTPbLmrAn3QFx3VLZF4b8hWMBX++BWXQiQbVMDDeMs9/y29tSVGDy60Tw7XFNaLPy8t9S4U27j7aipQGFR93liZ/2CjSB1ZdUMopnUH69LmryqLfozrtL4iLayghE/J8EdTgz6k+T7bTZR9NCPACaTWhapDTJmUvXEpKAeTb4FbeWMtlpmVlOwu4S7/76z0FVxplbU4lHAOiW84TA+g0/+16dZyPkNEyqLHXZP0z6N/GyyPh67zgHnsiAKOuFD5Xx3pjZFpym6ZWJyCco67EwfALdSkVqrBzjZfR2H9WR4EmLImBAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBTxSBEdGhs3PF9qdUYXVMvIU9xkCTAdBgNVHQ4EFgQU8UgRHRobNzxfanVGF1TLyFPcZAkwDQYJKoZIhvcNAQELBQADggEBAGgKaXLzlZTRzdA0dRYI9zbPoIecLbnUhp+Jouzx0vCD1leDjue6UNqj0DAN6AlLLTVgoqB0Uc5LwmKsOGE8PFTA9zNHj+Wxwiea1x+10UPxWudIJeFR3rvO62aCxDCo1WT5KPOwgxLzDwUBLKc4c9iw51j0F9gNbliL2lw4Pps9xGIl7sBS+NDV5GNclNjn3pSg1EUly4AQ51ERDRxtv9cU2ouMzDeddWADqi8mpVa+BvEsQIMhuG8OK+i3GREhuhyH7Z1JGpV5nlOZ/5wCaMTz7F0cMF0RC4PGoUN1lPI2A64pF2cd+AdoAsqprzqc70cbJk2jSGBhYgn1gbsRvYE=","attributes":{"enabled":true,"nbf":1593715011,"exp":1625251611,"created":1593715611,"updated":1593715611,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/backupRestoreCertificateName-canrecoveradeletedcertificate-/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1593715592,"updated":1593715592}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/backupRestoreCertificateName-canrecoveradeletedcertificate-/pending"}}, [
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
  '289f5474-67f0-4fcd-abac-755c83eac035',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.123.117;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 02 Jul 2020 18:47:37 GMT',
  'Content-Length',
  '2645'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/certificates/backupRestoreCertificateName-canrecoveradeletedcertificate-')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/backupRestoreCertificateName-canrecoveradeletedcertificate-","deletedDate":1593715658,"scheduledPurgeDate":1601491658,"id":"https://keyvault_name.vault.azure.net/certificates/backupRestoreCertificateName-canrecoveradeletedcertificate-/3c34ebd06f804059890894c674eda3de","kid":"https://keyvault_name.vault.azure.net/keys/backupRestoreCertificateName-canrecoveradeletedcertificate-/3c34ebd06f804059890894c674eda3de","sid":"https://keyvault_name.vault.azure.net/secrets/backupRestoreCertificateName-canrecoveradeletedcertificate-/3c34ebd06f804059890894c674eda3de","x5t":"k_ksr0WmOT6Gf8Ikdwz9ftPhylk","cer":"MIIDKDCCAhCgAwIBAgIQdPv/TEpkQCOMN2U3G2q8EjANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjAwNzAyMTgzNjUxWhcNMjEwNzAyMTg0NjUxWjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQCV6EIqhrFhDJMLwKV//F2TATNAdUXXtJqwcPFgHTPbLmrAn3QFx3VLZF4b8hWMBX++BWXQiQbVMDDeMs9/y29tSVGDy60Tw7XFNaLPy8t9S4U27j7aipQGFR93liZ/2CjSB1ZdUMopnUH69LmryqLfozrtL4iLayghE/J8EdTgz6k+T7bTZR9NCPACaTWhapDTJmUvXEpKAeTb4FbeWMtlpmVlOwu4S7/76z0FVxplbU4lHAOiW84TA+g0/+16dZyPkNEyqLHXZP0z6N/GyyPh67zgHnsiAKOuFD5Xx3pjZFpym6ZWJyCco67EwfALdSkVqrBzjZfR2H9WR4EmLImBAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBTxSBEdGhs3PF9qdUYXVMvIU9xkCTAdBgNVHQ4EFgQU8UgRHRobNzxfanVGF1TLyFPcZAkwDQYJKoZIhvcNAQELBQADggEBAGgKaXLzlZTRzdA0dRYI9zbPoIecLbnUhp+Jouzx0vCD1leDjue6UNqj0DAN6AlLLTVgoqB0Uc5LwmKsOGE8PFTA9zNHj+Wxwiea1x+10UPxWudIJeFR3rvO62aCxDCo1WT5KPOwgxLzDwUBLKc4c9iw51j0F9gNbliL2lw4Pps9xGIl7sBS+NDV5GNclNjn3pSg1EUly4AQ51ERDRxtv9cU2ouMzDeddWADqi8mpVa+BvEsQIMhuG8OK+i3GREhuhyH7Z1JGpV5nlOZ/5wCaMTz7F0cMF0RC4PGoUN1lPI2A64pF2cd+AdoAsqprzqc70cbJk2jSGBhYgn1gbsRvYE=","attributes":{"enabled":true,"nbf":1593715011,"exp":1625251611,"created":1593715611,"updated":1593715611,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/backupRestoreCertificateName-canrecoveradeletedcertificate-/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1593715592,"updated":1593715592}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/backupRestoreCertificateName-canrecoveradeletedcertificate-/pending"}}, [
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
  '9980f4e4-13cf-4f33-a002-99f6cbd89c19',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.123.117;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 02 Jul 2020 18:47:37 GMT',
  'Content-Length',
  '2856'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/backupRestoreCertificateName-canrecoveradeletedcertificate-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: backupRestoreCertificateName-canrecoveradeletedcertificate-"}}, [
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
  'a45f90ab-a799-469f-aa27-df5f7e07a637',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.123.117;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 02 Jul 2020 18:47:37 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/backupRestoreCertificateName-canrecoveradeletedcertificate-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: backupRestoreCertificateName-canrecoveradeletedcertificate-"}}, [
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
  '4f67a9a1-c142-4e56-813b-827cba6fe3be',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.123.117;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 02 Jul 2020 18:47:37 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/backupRestoreCertificateName-canrecoveradeletedcertificate-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: backupRestoreCertificateName-canrecoveradeletedcertificate-"}}, [
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
  'a8fc0003-de8d-484b-912c-af5d33c00b84',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.123.117;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 02 Jul 2020 18:47:39 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/backupRestoreCertificateName-canrecoveradeletedcertificate-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: backupRestoreCertificateName-canrecoveradeletedcertificate-"}}, [
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
  '18e34872-c139-47b3-ad81-b6676989c82e',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.123.117;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 02 Jul 2020 18:47:41 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/backupRestoreCertificateName-canrecoveradeletedcertificate-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: backupRestoreCertificateName-canrecoveradeletedcertificate-"}}, [
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
  '7ae32215-0d96-49ac-83dd-4351671a3a8c',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.123.117;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 02 Jul 2020 18:47:43 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/backupRestoreCertificateName-canrecoveradeletedcertificate-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: backupRestoreCertificateName-canrecoveradeletedcertificate-"}}, [
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
  'cc1e8caf-5de2-4846-a962-3bc77a00ec7e',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.123.117;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 02 Jul 2020 18:47:45 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/backupRestoreCertificateName-canrecoveradeletedcertificate-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: backupRestoreCertificateName-canrecoveradeletedcertificate-"}}, [
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
  '872c5ea7-4997-4bcf-adab-f42816b475b9',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.123.117;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 02 Jul 2020 18:47:48 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/backupRestoreCertificateName-canrecoveradeletedcertificate-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: backupRestoreCertificateName-canrecoveradeletedcertificate-"}}, [
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
  '42fc4dbe-a28e-4f75-a18f-58b0959b10d8',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.123.117;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 02 Jul 2020 18:47:50 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/backupRestoreCertificateName-canrecoveradeletedcertificate-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: backupRestoreCertificateName-canrecoveradeletedcertificate-"}}, [
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
  'a8c77f4a-8d4a-49cd-b0bf-98036bb250c9',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.123.117;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 02 Jul 2020 18:47:52 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/backupRestoreCertificateName-canrecoveradeletedcertificate-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: backupRestoreCertificateName-canrecoveradeletedcertificate-"}}, [
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
  '822ac1e5-aefe-4faf-a132-436a26f8e244',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.123.117;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 02 Jul 2020 18:47:54 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/backupRestoreCertificateName-canrecoveradeletedcertificate-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: backupRestoreCertificateName-canrecoveradeletedcertificate-"}}, [
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
  '0a7c43d9-ce45-4dda-8b8c-c5a2c0952e7b',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.123.117;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 02 Jul 2020 18:47:56 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/backupRestoreCertificateName-canrecoveradeletedcertificate-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: backupRestoreCertificateName-canrecoveradeletedcertificate-"}}, [
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
  'd308b36e-25c9-42f0-b135-3717221af7bb',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.123.117;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 02 Jul 2020 18:47:58 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/backupRestoreCertificateName-canrecoveradeletedcertificate-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: backupRestoreCertificateName-canrecoveradeletedcertificate-"}}, [
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
  '118a2d7f-e58f-4f02-acf7-deccb0154ccd',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.123.117;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 02 Jul 2020 18:48:00 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/backupRestoreCertificateName-canrecoveradeletedcertificate-')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/backupRestoreCertificateName-canrecoveradeletedcertificate-","deletedDate":1593715658,"scheduledPurgeDate":1601491658,"id":"https://keyvault_name.vault.azure.net/certificates/backupRestoreCertificateName-canrecoveradeletedcertificate-/3c34ebd06f804059890894c674eda3de","kid":"https://keyvault_name.vault.azure.net/keys/backupRestoreCertificateName-canrecoveradeletedcertificate-/3c34ebd06f804059890894c674eda3de","sid":"https://keyvault_name.vault.azure.net/secrets/backupRestoreCertificateName-canrecoveradeletedcertificate-/3c34ebd06f804059890894c674eda3de","x5t":"k_ksr0WmOT6Gf8Ikdwz9ftPhylk","cer":"MIIDKDCCAhCgAwIBAgIQdPv/TEpkQCOMN2U3G2q8EjANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjAwNzAyMTgzNjUxWhcNMjEwNzAyMTg0NjUxWjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQCV6EIqhrFhDJMLwKV//F2TATNAdUXXtJqwcPFgHTPbLmrAn3QFx3VLZF4b8hWMBX++BWXQiQbVMDDeMs9/y29tSVGDy60Tw7XFNaLPy8t9S4U27j7aipQGFR93liZ/2CjSB1ZdUMopnUH69LmryqLfozrtL4iLayghE/J8EdTgz6k+T7bTZR9NCPACaTWhapDTJmUvXEpKAeTb4FbeWMtlpmVlOwu4S7/76z0FVxplbU4lHAOiW84TA+g0/+16dZyPkNEyqLHXZP0z6N/GyyPh67zgHnsiAKOuFD5Xx3pjZFpym6ZWJyCco67EwfALdSkVqrBzjZfR2H9WR4EmLImBAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBTxSBEdGhs3PF9qdUYXVMvIU9xkCTAdBgNVHQ4EFgQU8UgRHRobNzxfanVGF1TLyFPcZAkwDQYJKoZIhvcNAQELBQADggEBAGgKaXLzlZTRzdA0dRYI9zbPoIecLbnUhp+Jouzx0vCD1leDjue6UNqj0DAN6AlLLTVgoqB0Uc5LwmKsOGE8PFTA9zNHj+Wxwiea1x+10UPxWudIJeFR3rvO62aCxDCo1WT5KPOwgxLzDwUBLKc4c9iw51j0F9gNbliL2lw4Pps9xGIl7sBS+NDV5GNclNjn3pSg1EUly4AQ51ERDRxtv9cU2ouMzDeddWADqi8mpVa+BvEsQIMhuG8OK+i3GREhuhyH7Z1JGpV5nlOZ/5wCaMTz7F0cMF0RC4PGoUN1lPI2A64pF2cd+AdoAsqprzqc70cbJk2jSGBhYgn1gbsRvYE=","attributes":{"enabled":true,"nbf":1593715011,"exp":1625251611,"created":1593715611,"updated":1593715611,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/backupRestoreCertificateName-canrecoveradeletedcertificate-/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1593715592,"updated":1593715592}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/backupRestoreCertificateName-canrecoveradeletedcertificate-/pending"}}, [
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
  '48e07e98-b7d4-4fd2-9a24-124bb9b906bc',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.123.117;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 02 Jul 2020 18:48:02 GMT',
  'Content-Length',
  '2856'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedcertificates/backupRestoreCertificateName-canrecoveradeletedcertificate-')
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
  '38c68ce9-f1c2-4030-a168-aa63e150eb40',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.123.117;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 02 Jul 2020 18:48:02 GMT'
]);

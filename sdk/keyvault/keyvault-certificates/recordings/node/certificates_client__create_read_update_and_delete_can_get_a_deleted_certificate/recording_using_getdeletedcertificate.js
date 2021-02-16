let nock = require('nock');

module.exports.hash = "479cc8aa64a6c369e59ae0cb55c93df8";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/certificates/CRUDCertificateName-usinggetDeletedCertificate-/create')
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
  'c0600dba-730e-4ea5-8402-31b287965a14',
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
  'Tue, 16 Feb 2021 18:59:44 GMT'
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
  'caf585ad-77b7-4c82-877d-a5cf0114fe00',
  'x-ms-ests-server',
  '2.1.11496.5 - SCUS ProdSlices',
  'Set-Cookie',
  'fpc=AufoSEQpIbxLjzJaYLa_pBMA4qsDEQAAACEMvtcOAAAA; expires=Thu, 18-Mar-2021 18:59:44 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 16 Feb 2021 18:59:44 GMT',
  'Content-Length',
  '1315'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/certificates/CRUDCertificateName-usinggetDeletedCertificate-/create', {"policy":{"key_props":{},"secret_props":{},"x509_props":{"subject":"cn=MyCert","sans":{}},"issuer":{"name":"Self"},"attributes":{}},"attributes":{}})
  .query(true)
  .reply(202, {"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-usinggetDeletedCertificate-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAz3na6d0MzFyXZziBjkraafMdb1nGh3BGdf4IONl1HprW0KZ/UKoUJJxv8HpR1O27McV8rk8W5BGemo24VRB3dG1SJssrNNo7cNUUkbTrOqZt83AsGVzDC7IoicMinmZIvGmzR1vE/ccEdr1RGgNH4M7j4py+3TLhloLOkf0h/9ohZzTEeCGAmK0ihWiXdrIWHD/KKUUaKLJuq4nRSw/xSMO9BjvK3kjixzYZNR9JD+x1IoF+i1Qg2agTnU/0tm44xw8uM8cqWHDYPFzzrKXV0xA1Wj+Fjo6dq5LT8OTdp2A2jgyb65DkN51/gcZXRP5CGb7I+6jJYM8VIX9v5d+7VQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAAgFfwRNjPX9FVehLjKJjiLk+E766HO4xo0CCPWT7LzgiEEg5grJpQbfkCWdFojWRF8WdZ2IJAr8lst0z0Ok4ZBA45lPKV+ltusYCAtKDPl4b8XqHrkRg06behCFlD7CATy2M+jPBnLzjmLRs+nwbkIS4LnK1cKo/O9mjZMiR5KjT+7jylpc6xeHD8LZU11xh+CLgM7bMafrB1GLNNmnhopzbm8+JhsaDXmcAaxOc4nOtin+UsgZDMK/UYjlk9UuX0l/1/C4y2asloP17byamOILGd2x6nXB960CkX9RR4qrJyMmyUdm1VfwWIzDDrOy8hUPz5eP/ocHTqunCYSVBrM=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"71abd496d9f04719a465973c98cd4ff7"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-usinggetDeletedCertificate-/pending?api-version=7.2&request_id=71abd496d9f04719a465973c98cd4ff7',
  'Retry-After',
  '10',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  'd0d21c91-1ce9-40ff-bf56-66601d2c39ce',
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
  'Tue, 16 Feb 2021 18:59:44 GMT',
  'Content-Length',
  '1330'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/CRUDCertificateName-usinggetDeletedCertificate-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-usinggetDeletedCertificate-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAz3na6d0MzFyXZziBjkraafMdb1nGh3BGdf4IONl1HprW0KZ/UKoUJJxv8HpR1O27McV8rk8W5BGemo24VRB3dG1SJssrNNo7cNUUkbTrOqZt83AsGVzDC7IoicMinmZIvGmzR1vE/ccEdr1RGgNH4M7j4py+3TLhloLOkf0h/9ohZzTEeCGAmK0ihWiXdrIWHD/KKUUaKLJuq4nRSw/xSMO9BjvK3kjixzYZNR9JD+x1IoF+i1Qg2agTnU/0tm44xw8uM8cqWHDYPFzzrKXV0xA1Wj+Fjo6dq5LT8OTdp2A2jgyb65DkN51/gcZXRP5CGb7I+6jJYM8VIX9v5d+7VQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAAgFfwRNjPX9FVehLjKJjiLk+E766HO4xo0CCPWT7LzgiEEg5grJpQbfkCWdFojWRF8WdZ2IJAr8lst0z0Ok4ZBA45lPKV+ltusYCAtKDPl4b8XqHrkRg06behCFlD7CATy2M+jPBnLzjmLRs+nwbkIS4LnK1cKo/O9mjZMiR5KjT+7jylpc6xeHD8LZU11xh+CLgM7bMafrB1GLNNmnhopzbm8+JhsaDXmcAaxOc4nOtin+UsgZDMK/UYjlk9UuX0l/1/C4y2asloP17byamOILGd2x6nXB960CkX9RR4qrJyMmyUdm1VfwWIzDDrOy8hUPz5eP/ocHTqunCYSVBrM=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"71abd496d9f04719a465973c98cd4ff7"}, [
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
  '5178c80a-372f-4bf6-8c68-9133bafd8c79',
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
  'Tue, 16 Feb 2021 18:59:44 GMT',
  'Content-Length',
  '1330'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/certificates/CRUDCertificateName-usinggetDeletedCertificate-')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/CRUDCertificateName-usinggetDeletedCertificate-","deletedDate":1613501985,"scheduledPurgeDate":1614106785,"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-usinggetDeletedCertificate-/d513b62ef7f24c149036d4b084b208b3","attributes":{"enabled":false,"nbf":1613501384,"exp":1645037984,"created":1613501985,"updated":1613501985,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-usinggetDeletedCertificate-/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1613501985,"updated":1613501985}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-usinggetDeletedCertificate-/pending"}}, [
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
  'b7999754-e5fb-429d-b590-86a94ee93c35',
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
  'Tue, 16 Feb 2021 18:59:44 GMT',
  'Content-Length',
  '1320'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/CRUDCertificateName-usinggetDeletedCertificate-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: CRUDCertificateName-usinggetDeletedCertificate-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '147',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  'bab8ab8c-be9f-4e51-9603-bd795bc32682',
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
  'Tue, 16 Feb 2021 18:59:44 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/CRUDCertificateName-usinggetDeletedCertificate-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: CRUDCertificateName-usinggetDeletedCertificate-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '147',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  '1963f9e7-9821-4318-95af-c607c5194f19',
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
  'Tue, 16 Feb 2021 18:59:45 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/CRUDCertificateName-usinggetDeletedCertificate-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: CRUDCertificateName-usinggetDeletedCertificate-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '147',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  '34b5f9d3-48d9-4a2d-9ddd-edc0803ec460',
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
  'Tue, 16 Feb 2021 18:59:46 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/CRUDCertificateName-usinggetDeletedCertificate-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: CRUDCertificateName-usinggetDeletedCertificate-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '147',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  '6e54abb9-dd61-44bd-a20f-5cbcef2b4c28',
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
  'Tue, 16 Feb 2021 18:59:49 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/CRUDCertificateName-usinggetDeletedCertificate-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: CRUDCertificateName-usinggetDeletedCertificate-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '147',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  '4991149b-0973-46c0-9685-b3216e0fdc19',
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
  'Tue, 16 Feb 2021 18:59:51 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/CRUDCertificateName-usinggetDeletedCertificate-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: CRUDCertificateName-usinggetDeletedCertificate-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '147',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  'dfd05dc1-62f5-4031-be73-c5a599e66849',
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
  'Tue, 16 Feb 2021 18:59:53 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/CRUDCertificateName-usinggetDeletedCertificate-')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/CRUDCertificateName-usinggetDeletedCertificate-","deletedDate":1613501985,"scheduledPurgeDate":1614106785,"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-usinggetDeletedCertificate-/d513b62ef7f24c149036d4b084b208b3","attributes":{"enabled":false,"nbf":1613501384,"exp":1645037984,"created":1613501985,"updated":1613501985,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-usinggetDeletedCertificate-/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1613501985,"updated":1613501985}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-usinggetDeletedCertificate-/pending"}}, [
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
  'cd278bd3-4746-4e01-a489-7bda5450a325',
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
  'Tue, 16 Feb 2021 18:59:55 GMT',
  'Content-Length',
  '1320'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/CRUDCertificateName-usinggetDeletedCertificate-')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/CRUDCertificateName-usinggetDeletedCertificate-","deletedDate":1613501985,"scheduledPurgeDate":1614106785,"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-usinggetDeletedCertificate-/d513b62ef7f24c149036d4b084b208b3","attributes":{"enabled":false,"nbf":1613501384,"exp":1645037984,"created":1613501985,"updated":1613501985,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-usinggetDeletedCertificate-/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1613501985,"updated":1613501985}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-usinggetDeletedCertificate-/pending"}}, [
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
  '8d4b5c0e-662a-48e8-99c6-aed5f7d0e9ef',
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
  'Tue, 16 Feb 2021 18:59:55 GMT',
  'Content-Length',
  '1320'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedcertificates/CRUDCertificateName-usinggetDeletedCertificate-')
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
  '764113d4-57fe-499c-9a3b-e169c779bf48',
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
  'Tue, 16 Feb 2021 18:59:55 GMT'
]);

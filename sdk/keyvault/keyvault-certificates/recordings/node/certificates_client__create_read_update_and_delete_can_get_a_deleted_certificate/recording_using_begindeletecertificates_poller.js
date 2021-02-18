let nock = require('nock');

module.exports.hash = "ba4fb8df2319b2aeb51fe0b3e36c31d5";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/certificates/CRUDCertificateName-usingbeginDeleteCertificatespoller-/create')
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
  '964cbd1d-4146-436e-a29d-3ed960448569',
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
  'Tue, 16 Feb 2021 18:59:37 GMT'
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
  '6fa85750-a30c-42d2-8239-ec25ee60fa00',
  'x-ms-ests-server',
  '2.1.11496.5 - NCUS ProdSlices',
  'Set-Cookie',
  'fpc=AufoSEQpIbxLjzJaYLa_pBMA4qsDEQAAACEMvtcOAAAA; expires=Thu, 18-Mar-2021 18:59:37 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 16 Feb 2021 18:59:36 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/certificates/CRUDCertificateName-usingbeginDeleteCertificatespoller-/create', {"policy":{"key_props":{},"secret_props":{},"x509_props":{"subject":"cn=MyCert","sans":{}},"issuer":{"name":"Self"},"attributes":{}},"attributes":{}})
  .query(true)
  .reply(202, {"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-usingbeginDeleteCertificatespoller-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA6l7bDJgCtCX2/Nzl2rAIo4mx54zxHQ0DO9pr/dfbEoVWKN8qu/jTTMo3W/YUsx1qdaebL/7qdQfYNQYO1+ammpvYMD2+GFeHCeReq8U5WoFC8Qch7bl78xRs2KJgl2OfalnNOxe2ZdqQxQwwVYcVKB+u0XklhfEs9Qw4j+AHY1+GnY+jnOR9xJ0JKpTibTcy4Pml9MBHNBk//2SQ3r6T5bhmF1DK+VCyXNjyMVyBYAzKq4xlPXgCIbZmiv7Rb/a8921mCDN/UrP4WbAEOpC1885nHU/9Y/Ji6KtJkLnq5gikFgKLn1Q7y4IOuEhCKAhSNgWluI6DqXEcfignGE8miQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAMxiiFiwMQAXJE5hRLqGkCHBf3V6YyGok6X8/oV0q1K6/OICZrx77eN2oBiozvQFJ5iIi9gM/ISEPu0YTkBBxN+w6oYGqdZIrsBtTXsRqpH24BsdNlWPruU+wkAhRsk+5zDTIqKuDT5a2B7nRxvomZzX51f7emzLxrXGZo3b85Wn4znC+UmWTyS7e9kkIz8kFoWWsGOIfSnnCDE6fk4dR6i3qqGE9ECYvo0xtYMT4iJNL2YUainCP4X0CE1YDalBQ85ENapO1L7R427/0ozdEkadM0SC/OQetnhRZEFjUdxqirAhwGrp1vp5wF1XOdntcHRVChC7fz6EjTwAxEBXTjA=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"584e59bdff204380be58a8d978a086d5"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-usingbeginDeleteCertificatespoller-/pending?api-version=7.2&request_id=584e59bdff204380be58a8d978a086d5',
  'Retry-After',
  '10',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  '2b2ed633-65fa-42c3-9dd7-aef771a9d099',
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
  'Tue, 16 Feb 2021 18:59:38 GMT',
  'Content-Length',
  '1339'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/CRUDCertificateName-usingbeginDeleteCertificatespoller-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-usingbeginDeleteCertificatespoller-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA6l7bDJgCtCX2/Nzl2rAIo4mx54zxHQ0DO9pr/dfbEoVWKN8qu/jTTMo3W/YUsx1qdaebL/7qdQfYNQYO1+ammpvYMD2+GFeHCeReq8U5WoFC8Qch7bl78xRs2KJgl2OfalnNOxe2ZdqQxQwwVYcVKB+u0XklhfEs9Qw4j+AHY1+GnY+jnOR9xJ0JKpTibTcy4Pml9MBHNBk//2SQ3r6T5bhmF1DK+VCyXNjyMVyBYAzKq4xlPXgCIbZmiv7Rb/a8921mCDN/UrP4WbAEOpC1885nHU/9Y/Ji6KtJkLnq5gikFgKLn1Q7y4IOuEhCKAhSNgWluI6DqXEcfignGE8miQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAMxiiFiwMQAXJE5hRLqGkCHBf3V6YyGok6X8/oV0q1K6/OICZrx77eN2oBiozvQFJ5iIi9gM/ISEPu0YTkBBxN+w6oYGqdZIrsBtTXsRqpH24BsdNlWPruU+wkAhRsk+5zDTIqKuDT5a2B7nRxvomZzX51f7emzLxrXGZo3b85Wn4znC+UmWTyS7e9kkIz8kFoWWsGOIfSnnCDE6fk4dR6i3qqGE9ECYvo0xtYMT4iJNL2YUainCP4X0CE1YDalBQ85ENapO1L7R427/0ozdEkadM0SC/OQetnhRZEFjUdxqirAhwGrp1vp5wF1XOdntcHRVChC7fz6EjTwAxEBXTjA=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"584e59bdff204380be58a8d978a086d5"}, [
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
  '7a0a6f38-5008-47f7-999d-6396376a9feb',
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
  'Tue, 16 Feb 2021 18:59:38 GMT',
  'Content-Length',
  '1339'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/certificates/CRUDCertificateName-usingbeginDeleteCertificatespoller-')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/CRUDCertificateName-usingbeginDeleteCertificatespoller-","deletedDate":1613501978,"scheduledPurgeDate":1614106778,"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-usingbeginDeleteCertificatespoller-/dcdb514352534a62a3bbb59f0cb70186","attributes":{"enabled":false,"nbf":1613501377,"exp":1645037977,"created":1613501977,"updated":1613501977,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-usingbeginDeleteCertificatespoller-/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1613501978,"updated":1613501978}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-usingbeginDeleteCertificatespoller-/pending"}}, [
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
  'cd63d789-4316-42ff-8be5-59d0a563857a',
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
  'Tue, 16 Feb 2021 18:59:38 GMT',
  'Content-Length',
  '1356'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/CRUDCertificateName-usingbeginDeleteCertificatespoller-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: CRUDCertificateName-usingbeginDeleteCertificatespoller-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '156',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  '3cbfffb4-a5d4-4752-94dd-afe1ca2daf13',
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
  'Tue, 16 Feb 2021 18:59:38 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/CRUDCertificateName-usingbeginDeleteCertificatespoller-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: CRUDCertificateName-usingbeginDeleteCertificatespoller-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '156',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  '6467bfe3-c9de-4d70-b65a-5401bb81a141',
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
  'Tue, 16 Feb 2021 18:59:38 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/CRUDCertificateName-usingbeginDeleteCertificatespoller-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: CRUDCertificateName-usingbeginDeleteCertificatespoller-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '156',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  'db454c6d-0539-4a53-9563-2eac1d70c084',
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
  'Tue, 16 Feb 2021 18:59:40 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/CRUDCertificateName-usingbeginDeleteCertificatespoller-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: CRUDCertificateName-usingbeginDeleteCertificatespoller-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '156',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  '62c7f798-9f0b-4df4-a329-07121a31d363',
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
  'Tue, 16 Feb 2021 18:59:41 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/CRUDCertificateName-usingbeginDeleteCertificatespoller-')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/CRUDCertificateName-usingbeginDeleteCertificatespoller-","deletedDate":1613501978,"scheduledPurgeDate":1614106778,"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-usingbeginDeleteCertificatespoller-/dcdb514352534a62a3bbb59f0cb70186","attributes":{"enabled":false,"nbf":1613501377,"exp":1645037977,"created":1613501977,"updated":1613501977,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-usingbeginDeleteCertificatespoller-/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1613501978,"updated":1613501978}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-usingbeginDeleteCertificatespoller-/pending"}}, [
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
  '9fc2d530-ed0d-447d-b963-fe905b4fb751',
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
  'Tue, 16 Feb 2021 18:59:43 GMT',
  'Content-Length',
  '1356'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedcertificates/CRUDCertificateName-usingbeginDeleteCertificatespoller-')
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
  '45d20061-dc09-4337-beb4-0f5166d1634e',
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

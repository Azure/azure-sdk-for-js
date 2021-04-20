let nock = require('nock');

module.exports.hash = "9267be851770ae08910f30e97cd90f5c";

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
  'westus2',
  'x-ms-request-id',
  '4d32eaaf-3c15-4081-8a2f-838d38f79be2',
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
  'Tue, 16 Feb 2021 19:07:48 GMT'
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
  '7d87d169-c68d-40b7-93d5-3c11c9363000',
  'x-ms-ests-server',
  '2.1.11496.6 - WUS2 ProdSlices',
  'Set-Cookie',
  'fpc=AufoSEQpIbxLjzJaYLa_pBMA4qsDDgAAAHkOvtcOAAAA; expires=Thu, 18-Mar-2021 19:07:48 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 16 Feb 2021 19:07:47 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/certificates/backupRestoreCertificateName-canrecoveradeletedcertificate-/create', {"policy":{"key_props":{},"secret_props":{},"x509_props":{"subject":"cn=MyCert","sans":{}},"issuer":{"name":"Self"},"attributes":{}},"attributes":{}})
  .query(true)
  .reply(202, {"id":"https://keyvault_name.vault.azure.net/certificates/backupRestoreCertificateName-canrecoveradeletedcertificate-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAv1Ux4q8vHTvMoICsCt2nzo7j+qVmVmrIP+WPE+yGdN8leouI+zQGgcDOkzplo2pVFC837ArmaBc/DYJ0zH07pfVt5oLzNIZbI0Bv4JklQ/Xe74XMT7e9WHCYrP5VL/vgqBnTZD07/Bow1VEJPHvGeJC3Go/P6wBd5ELsnd/blnAi3M1PuPsLF9GvdrTR94jQTgJJSPkgaTz7IwEpMAfvEpXUwk9PMMjwuJlHnAmsGSRqw9u1wh3CiB4nyC+FFShB9k4eB00K5TsUGMMwKz7VSRKnJHXje+qJ7MtoTCpSew8c3VtkEXS73/T69gK7cLJYHbnqjTPBOGaCcDQauwfEGQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAHIRFo2zNP/zMedSGsdl/vUY1rO79oIXIzgP1ctxezRVC0cZXZey0YCV6ZLIyW//lzjTfYaiCiDiLki4ftM0EfmQEs08mBM0LCeHgtpVIJvbHAmcWmiQVW7HgZYveSbx6A8ifa1nAF7FgxSpFMbCGDTexVM40iJlKHl+s/2Dj3YbM/JsImGnIHKnp0gElySNZsz0utHE6H69P91jd+FcZ+2fGP25pAK+IXHjIBebNWpjF/apXaJdEgU43FSZKfxKAlHfzRfH4vaZTWuCZ5PEhQVYji8Gns0GZsAeTxuM9T5L4SS89hEKCH/8J/I37sWO71Q3DM/DQ5+YSpbOxI4GJ00=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"9ae8645f9f284accabd54a31e9297585"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://keyvault_name.vault.azure.net/certificates/backupRestoreCertificateName-canrecoveradeletedcertificate-/pending?api-version=7.2&request_id=9ae8645f9f284accabd54a31e9297585',
  'Retry-After',
  '10',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  '36b90e5b-6ff6-4e89-a529-b25c7bde71ab',
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
  '1343'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/backupRestoreCertificateName-canrecoveradeletedcertificate-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/backupRestoreCertificateName-canrecoveradeletedcertificate-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAv1Ux4q8vHTvMoICsCt2nzo7j+qVmVmrIP+WPE+yGdN8leouI+zQGgcDOkzplo2pVFC837ArmaBc/DYJ0zH07pfVt5oLzNIZbI0Bv4JklQ/Xe74XMT7e9WHCYrP5VL/vgqBnTZD07/Bow1VEJPHvGeJC3Go/P6wBd5ELsnd/blnAi3M1PuPsLF9GvdrTR94jQTgJJSPkgaTz7IwEpMAfvEpXUwk9PMMjwuJlHnAmsGSRqw9u1wh3CiB4nyC+FFShB9k4eB00K5TsUGMMwKz7VSRKnJHXje+qJ7MtoTCpSew8c3VtkEXS73/T69gK7cLJYHbnqjTPBOGaCcDQauwfEGQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAHIRFo2zNP/zMedSGsdl/vUY1rO79oIXIzgP1ctxezRVC0cZXZey0YCV6ZLIyW//lzjTfYaiCiDiLki4ftM0EfmQEs08mBM0LCeHgtpVIJvbHAmcWmiQVW7HgZYveSbx6A8ifa1nAF7FgxSpFMbCGDTexVM40iJlKHl+s/2Dj3YbM/JsImGnIHKnp0gElySNZsz0utHE6H69P91jd+FcZ+2fGP25pAK+IXHjIBebNWpjF/apXaJdEgU43FSZKfxKAlHfzRfH4vaZTWuCZ5PEhQVYji8Gns0GZsAeTxuM9T5L4SS89hEKCH/8J/I37sWO71Q3DM/DQ5+YSpbOxI4GJ00=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"9ae8645f9f284accabd54a31e9297585"}, [
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
  'a4ad5b72-f37e-4a31-828d-5b5b2d820767',
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
  'Tue, 16 Feb 2021 19:07:49 GMT',
  'Content-Length',
  '1343'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/backupRestoreCertificateName-canrecoveradeletedcertificate-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/backupRestoreCertificateName-canrecoveradeletedcertificate-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAv1Ux4q8vHTvMoICsCt2nzo7j+qVmVmrIP+WPE+yGdN8leouI+zQGgcDOkzplo2pVFC837ArmaBc/DYJ0zH07pfVt5oLzNIZbI0Bv4JklQ/Xe74XMT7e9WHCYrP5VL/vgqBnTZD07/Bow1VEJPHvGeJC3Go/P6wBd5ELsnd/blnAi3M1PuPsLF9GvdrTR94jQTgJJSPkgaTz7IwEpMAfvEpXUwk9PMMjwuJlHnAmsGSRqw9u1wh3CiB4nyC+FFShB9k4eB00K5TsUGMMwKz7VSRKnJHXje+qJ7MtoTCpSew8c3VtkEXS73/T69gK7cLJYHbnqjTPBOGaCcDQauwfEGQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAHIRFo2zNP/zMedSGsdl/vUY1rO79oIXIzgP1ctxezRVC0cZXZey0YCV6ZLIyW//lzjTfYaiCiDiLki4ftM0EfmQEs08mBM0LCeHgtpVIJvbHAmcWmiQVW7HgZYveSbx6A8ifa1nAF7FgxSpFMbCGDTexVM40iJlKHl+s/2Dj3YbM/JsImGnIHKnp0gElySNZsz0utHE6H69P91jd+FcZ+2fGP25pAK+IXHjIBebNWpjF/apXaJdEgU43FSZKfxKAlHfzRfH4vaZTWuCZ5PEhQVYji8Gns0GZsAeTxuM9T5L4SS89hEKCH/8J/I37sWO71Q3DM/DQ5+YSpbOxI4GJ00=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"9ae8645f9f284accabd54a31e9297585"}, [
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
  'caa601f4-5cb1-4410-95a4-2e4bae659f7f',
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
  '1343'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/backupRestoreCertificateName-canrecoveradeletedcertificate-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/backupRestoreCertificateName-canrecoveradeletedcertificate-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAv1Ux4q8vHTvMoICsCt2nzo7j+qVmVmrIP+WPE+yGdN8leouI+zQGgcDOkzplo2pVFC837ArmaBc/DYJ0zH07pfVt5oLzNIZbI0Bv4JklQ/Xe74XMT7e9WHCYrP5VL/vgqBnTZD07/Bow1VEJPHvGeJC3Go/P6wBd5ELsnd/blnAi3M1PuPsLF9GvdrTR94jQTgJJSPkgaTz7IwEpMAfvEpXUwk9PMMjwuJlHnAmsGSRqw9u1wh3CiB4nyC+FFShB9k4eB00K5TsUGMMwKz7VSRKnJHXje+qJ7MtoTCpSew8c3VtkEXS73/T69gK7cLJYHbnqjTPBOGaCcDQauwfEGQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAHIRFo2zNP/zMedSGsdl/vUY1rO79oIXIzgP1ctxezRVC0cZXZey0YCV6ZLIyW//lzjTfYaiCiDiLki4ftM0EfmQEs08mBM0LCeHgtpVIJvbHAmcWmiQVW7HgZYveSbx6A8ifa1nAF7FgxSpFMbCGDTexVM40iJlKHl+s/2Dj3YbM/JsImGnIHKnp0gElySNZsz0utHE6H69P91jd+FcZ+2fGP25pAK+IXHjIBebNWpjF/apXaJdEgU43FSZKfxKAlHfzRfH4vaZTWuCZ5PEhQVYji8Gns0GZsAeTxuM9T5L4SS89hEKCH/8J/I37sWO71Q3DM/DQ5+YSpbOxI4GJ00=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"9ae8645f9f284accabd54a31e9297585"}, [
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
  'e66af8b6-8297-47dc-b4f7-209460d89e29',
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
  'Tue, 16 Feb 2021 19:07:51 GMT',
  'Content-Length',
  '1343'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/backupRestoreCertificateName-canrecoveradeletedcertificate-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/backupRestoreCertificateName-canrecoveradeletedcertificate-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAv1Ux4q8vHTvMoICsCt2nzo7j+qVmVmrIP+WPE+yGdN8leouI+zQGgcDOkzplo2pVFC837ArmaBc/DYJ0zH07pfVt5oLzNIZbI0Bv4JklQ/Xe74XMT7e9WHCYrP5VL/vgqBnTZD07/Bow1VEJPHvGeJC3Go/P6wBd5ELsnd/blnAi3M1PuPsLF9GvdrTR94jQTgJJSPkgaTz7IwEpMAfvEpXUwk9PMMjwuJlHnAmsGSRqw9u1wh3CiB4nyC+FFShB9k4eB00K5TsUGMMwKz7VSRKnJHXje+qJ7MtoTCpSew8c3VtkEXS73/T69gK7cLJYHbnqjTPBOGaCcDQauwfEGQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAHIRFo2zNP/zMedSGsdl/vUY1rO79oIXIzgP1ctxezRVC0cZXZey0YCV6ZLIyW//lzjTfYaiCiDiLki4ftM0EfmQEs08mBM0LCeHgtpVIJvbHAmcWmiQVW7HgZYveSbx6A8ifa1nAF7FgxSpFMbCGDTexVM40iJlKHl+s/2Dj3YbM/JsImGnIHKnp0gElySNZsz0utHE6H69P91jd+FcZ+2fGP25pAK+IXHjIBebNWpjF/apXaJdEgU43FSZKfxKAlHfzRfH4vaZTWuCZ5PEhQVYji8Gns0GZsAeTxuM9T5L4SS89hEKCH/8J/I37sWO71Q3DM/DQ5+YSpbOxI4GJ00=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"9ae8645f9f284accabd54a31e9297585"}, [
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
  '3e54bd1a-f44f-4158-81e5-b5fcc8f7cfef',
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
  'Tue, 16 Feb 2021 19:07:52 GMT',
  'Content-Length',
  '1343'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/backupRestoreCertificateName-canrecoveradeletedcertificate-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/backupRestoreCertificateName-canrecoveradeletedcertificate-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAv1Ux4q8vHTvMoICsCt2nzo7j+qVmVmrIP+WPE+yGdN8leouI+zQGgcDOkzplo2pVFC837ArmaBc/DYJ0zH07pfVt5oLzNIZbI0Bv4JklQ/Xe74XMT7e9WHCYrP5VL/vgqBnTZD07/Bow1VEJPHvGeJC3Go/P6wBd5ELsnd/blnAi3M1PuPsLF9GvdrTR94jQTgJJSPkgaTz7IwEpMAfvEpXUwk9PMMjwuJlHnAmsGSRqw9u1wh3CiB4nyC+FFShB9k4eB00K5TsUGMMwKz7VSRKnJHXje+qJ7MtoTCpSew8c3VtkEXS73/T69gK7cLJYHbnqjTPBOGaCcDQauwfEGQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAHIRFo2zNP/zMedSGsdl/vUY1rO79oIXIzgP1ctxezRVC0cZXZey0YCV6ZLIyW//lzjTfYaiCiDiLki4ftM0EfmQEs08mBM0LCeHgtpVIJvbHAmcWmiQVW7HgZYveSbx6A8ifa1nAF7FgxSpFMbCGDTexVM40iJlKHl+s/2Dj3YbM/JsImGnIHKnp0gElySNZsz0utHE6H69P91jd+FcZ+2fGP25pAK+IXHjIBebNWpjF/apXaJdEgU43FSZKfxKAlHfzRfH4vaZTWuCZ5PEhQVYji8Gns0GZsAeTxuM9T5L4SS89hEKCH/8J/I37sWO71Q3DM/DQ5+YSpbOxI4GJ00=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"9ae8645f9f284accabd54a31e9297585"}, [
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
  'e7a430eb-187d-444d-8657-52726122e439',
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
  'Tue, 16 Feb 2021 19:07:55 GMT',
  'Content-Length',
  '1343'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/backupRestoreCertificateName-canrecoveradeletedcertificate-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/backupRestoreCertificateName-canrecoveradeletedcertificate-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAv1Ux4q8vHTvMoICsCt2nzo7j+qVmVmrIP+WPE+yGdN8leouI+zQGgcDOkzplo2pVFC837ArmaBc/DYJ0zH07pfVt5oLzNIZbI0Bv4JklQ/Xe74XMT7e9WHCYrP5VL/vgqBnTZD07/Bow1VEJPHvGeJC3Go/P6wBd5ELsnd/blnAi3M1PuPsLF9GvdrTR94jQTgJJSPkgaTz7IwEpMAfvEpXUwk9PMMjwuJlHnAmsGSRqw9u1wh3CiB4nyC+FFShB9k4eB00K5TsUGMMwKz7VSRKnJHXje+qJ7MtoTCpSew8c3VtkEXS73/T69gK7cLJYHbnqjTPBOGaCcDQauwfEGQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAHIRFo2zNP/zMedSGsdl/vUY1rO79oIXIzgP1ctxezRVC0cZXZey0YCV6ZLIyW//lzjTfYaiCiDiLki4ftM0EfmQEs08mBM0LCeHgtpVIJvbHAmcWmiQVW7HgZYveSbx6A8ifa1nAF7FgxSpFMbCGDTexVM40iJlKHl+s/2Dj3YbM/JsImGnIHKnp0gElySNZsz0utHE6H69P91jd+FcZ+2fGP25pAK+IXHjIBebNWpjF/apXaJdEgU43FSZKfxKAlHfzRfH4vaZTWuCZ5PEhQVYji8Gns0GZsAeTxuM9T5L4SS89hEKCH/8J/I37sWO71Q3DM/DQ5+YSpbOxI4GJ00=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"9ae8645f9f284accabd54a31e9297585"}, [
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
  '95084356-faf4-4823-bcf3-0c3056774a3d',
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
  'Tue, 16 Feb 2021 19:07:57 GMT',
  'Content-Length',
  '1343'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/backupRestoreCertificateName-canrecoveradeletedcertificate-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/backupRestoreCertificateName-canrecoveradeletedcertificate-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAv1Ux4q8vHTvMoICsCt2nzo7j+qVmVmrIP+WPE+yGdN8leouI+zQGgcDOkzplo2pVFC837ArmaBc/DYJ0zH07pfVt5oLzNIZbI0Bv4JklQ/Xe74XMT7e9WHCYrP5VL/vgqBnTZD07/Bow1VEJPHvGeJC3Go/P6wBd5ELsnd/blnAi3M1PuPsLF9GvdrTR94jQTgJJSPkgaTz7IwEpMAfvEpXUwk9PMMjwuJlHnAmsGSRqw9u1wh3CiB4nyC+FFShB9k4eB00K5TsUGMMwKz7VSRKnJHXje+qJ7MtoTCpSew8c3VtkEXS73/T69gK7cLJYHbnqjTPBOGaCcDQauwfEGQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAHIRFo2zNP/zMedSGsdl/vUY1rO79oIXIzgP1ctxezRVC0cZXZey0YCV6ZLIyW//lzjTfYaiCiDiLki4ftM0EfmQEs08mBM0LCeHgtpVIJvbHAmcWmiQVW7HgZYveSbx6A8ifa1nAF7FgxSpFMbCGDTexVM40iJlKHl+s/2Dj3YbM/JsImGnIHKnp0gElySNZsz0utHE6H69P91jd+FcZ+2fGP25pAK+IXHjIBebNWpjF/apXaJdEgU43FSZKfxKAlHfzRfH4vaZTWuCZ5PEhQVYji8Gns0GZsAeTxuM9T5L4SS89hEKCH/8J/I37sWO71Q3DM/DQ5+YSpbOxI4GJ00=","cancellation_requested":false,"status":"completed","target":"https://keyvault_name.vault.azure.net/certificates/backupRestoreCertificateName-canrecoveradeletedcertificate-","request_id":"9ae8645f9f284accabd54a31e9297585"}, [
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
  '69860641-e79f-487c-aa1a-ee13f411469f',
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
  'Tue, 16 Feb 2021 19:07:58 GMT',
  'Content-Length',
  '1313'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/backupRestoreCertificateName-canrecoveradeletedcertificate-/')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/backupRestoreCertificateName-canrecoveradeletedcertificate-/732909a59e2a44b0bfbb7e036b66748c","kid":"https://keyvault_name.vault.azure.net/keys/backupRestoreCertificateName-canrecoveradeletedcertificate-/732909a59e2a44b0bfbb7e036b66748c","sid":"https://keyvault_name.vault.azure.net/secrets/backupRestoreCertificateName-canrecoveradeletedcertificate-/732909a59e2a44b0bfbb7e036b66748c","x5t":"yYA7zDVStZ0P3cOsW0dEqgj8ESY","cer":"MIIDKDCCAhCgAwIBAgIQKnSKOsKvTWqnGQPQ9Di4CjANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjEwMjE2MTg1NzU3WhcNMjIwMjE2MTkwNzU3WjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQC/VTHiry8dO8yggKwK3afOjuP6pWZWasg/5Y8T7IZ03yV6i4j7NAaBwM6TOmWjalUULzfsCuZoFz8NgnTMfTul9W3mgvM0hlsjQG/gmSVD9d7vhcxPt71YcJis/lUv++CoGdNkPTv8GjDVUQk8e8Z4kLcaj8/rAF3kQuyd39uWcCLczU+4+wsX0a92tNH3iNBOAklI+SBpPPsjASkwB+8SldTCT08wyPC4mUecCawZJGrD27XCHcKIHifIL4UVKEH2Th4HTQrlOxQYwzArPtVJEqckdeN76onsy2hMKlJ7DxzdW2QRdLvf9Pr2ArtwslgdueqNM8E4ZoJwNBq7B8QZAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBRn7psIwqpH/ZYGk/IZcxiZUlo4OTAdBgNVHQ4EFgQUZ+6bCMKqR/2WBpPyGXMYmVJaODkwDQYJKoZIhvcNAQELBQADggEBAJeqZE/RZ1AgAe/tlYLVk9AauuhI/pheMylpYz5blJDFOmqDl0TVv4v1ZuiQwFGmm5j/S/u6hx2epbUKYE60q8+EGTJ5D6dz63x2sInwgFr9pA7xRZrR9eAi0qlj7IU5+KSwkTRkxuLuQ0HP87SulHzeFNGpoSkZqGmLeuMXWUJxtMTlEWbTvbkqrz30M9m0Atcrqy3+DkWnzdHrDijWizY9cTJSEQ76MZbIsGFoL0W9c0NFR6gvDDtoiQh5EMvgNROTbAfAIOevgjqiwhafY99H9KE5OS15CCSx6hIG/7Ec8QWj7IMzVpoYp8ku4fo/27H0caWXjDgjyi8LI7ObRaQ=","attributes":{"enabled":true,"nbf":1613501877,"exp":1645038477,"created":1613502478,"updated":1613502478,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/backupRestoreCertificateName-canrecoveradeletedcertificate-/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1613502469,"updated":1613502469}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/backupRestoreCertificateName-canrecoveradeletedcertificate-/pending"}}, [
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
  '5720ff4b-26b0-4f80-b69c-356c9e2e37d2',
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
  'Tue, 16 Feb 2021 19:07:59 GMT',
  'Content-Length',
  '2614'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/certificates/backupRestoreCertificateName-canrecoveradeletedcertificate-')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/backupRestoreCertificateName-canrecoveradeletedcertificate-","deletedDate":1613502479,"scheduledPurgeDate":1614107279,"id":"https://keyvault_name.vault.azure.net/certificates/backupRestoreCertificateName-canrecoveradeletedcertificate-/732909a59e2a44b0bfbb7e036b66748c","kid":"https://keyvault_name.vault.azure.net/keys/backupRestoreCertificateName-canrecoveradeletedcertificate-/732909a59e2a44b0bfbb7e036b66748c","sid":"https://keyvault_name.vault.azure.net/secrets/backupRestoreCertificateName-canrecoveradeletedcertificate-/732909a59e2a44b0bfbb7e036b66748c","x5t":"yYA7zDVStZ0P3cOsW0dEqgj8ESY","cer":"MIIDKDCCAhCgAwIBAgIQKnSKOsKvTWqnGQPQ9Di4CjANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjEwMjE2MTg1NzU3WhcNMjIwMjE2MTkwNzU3WjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQC/VTHiry8dO8yggKwK3afOjuP6pWZWasg/5Y8T7IZ03yV6i4j7NAaBwM6TOmWjalUULzfsCuZoFz8NgnTMfTul9W3mgvM0hlsjQG/gmSVD9d7vhcxPt71YcJis/lUv++CoGdNkPTv8GjDVUQk8e8Z4kLcaj8/rAF3kQuyd39uWcCLczU+4+wsX0a92tNH3iNBOAklI+SBpPPsjASkwB+8SldTCT08wyPC4mUecCawZJGrD27XCHcKIHifIL4UVKEH2Th4HTQrlOxQYwzArPtVJEqckdeN76onsy2hMKlJ7DxzdW2QRdLvf9Pr2ArtwslgdueqNM8E4ZoJwNBq7B8QZAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBRn7psIwqpH/ZYGk/IZcxiZUlo4OTAdBgNVHQ4EFgQUZ+6bCMKqR/2WBpPyGXMYmVJaODkwDQYJKoZIhvcNAQELBQADggEBAJeqZE/RZ1AgAe/tlYLVk9AauuhI/pheMylpYz5blJDFOmqDl0TVv4v1ZuiQwFGmm5j/S/u6hx2epbUKYE60q8+EGTJ5D6dz63x2sInwgFr9pA7xRZrR9eAi0qlj7IU5+KSwkTRkxuLuQ0HP87SulHzeFNGpoSkZqGmLeuMXWUJxtMTlEWbTvbkqrz30M9m0Atcrqy3+DkWnzdHrDijWizY9cTJSEQ76MZbIsGFoL0W9c0NFR6gvDDtoiQh5EMvgNROTbAfAIOevgjqiwhafY99H9KE5OS15CCSx6hIG/7Ec8QWj7IMzVpoYp8ku4fo/27H0caWXjDgjyi8LI7ObRaQ=","attributes":{"enabled":true,"nbf":1613501877,"exp":1645038477,"created":1613502478,"updated":1613502478,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/backupRestoreCertificateName-canrecoveradeletedcertificate-/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1613502469,"updated":1613502469}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/backupRestoreCertificateName-canrecoveradeletedcertificate-/pending"}}, [
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
  '3009148f-09c5-47ab-aebe-d1e3558ae038',
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
  'Tue, 16 Feb 2021 19:07:59 GMT',
  'Content-Length',
  '2817'
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
  '160',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  '9ce2ed6b-3f69-4b69-b22c-00ac01c3dbc8',
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
  'Tue, 16 Feb 2021 19:07:59 GMT'
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
  '160',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  '060534ae-6865-4e56-8008-b45dfcbb538b',
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
  'Tue, 16 Feb 2021 19:07:59 GMT'
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
  '160',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  '70691af4-1e74-4d34-a922-9b29233191bf',
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
  'Tue, 16 Feb 2021 19:08:01 GMT'
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
  '160',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  '213e2915-842e-4064-8a7b-6a51d680e786',
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
  'Tue, 16 Feb 2021 19:08:03 GMT'
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
  '160',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  '87278cec-7552-4a56-94f5-80b43abf6dd6',
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
  'Tue, 16 Feb 2021 19:08:05 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/backupRestoreCertificateName-canrecoveradeletedcertificate-')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/backupRestoreCertificateName-canrecoveradeletedcertificate-","deletedDate":1613502479,"scheduledPurgeDate":1614107279,"id":"https://keyvault_name.vault.azure.net/certificates/backupRestoreCertificateName-canrecoveradeletedcertificate-/732909a59e2a44b0bfbb7e036b66748c","kid":"https://keyvault_name.vault.azure.net/keys/backupRestoreCertificateName-canrecoveradeletedcertificate-/732909a59e2a44b0bfbb7e036b66748c","sid":"https://keyvault_name.vault.azure.net/secrets/backupRestoreCertificateName-canrecoveradeletedcertificate-/732909a59e2a44b0bfbb7e036b66748c","x5t":"yYA7zDVStZ0P3cOsW0dEqgj8ESY","cer":"MIIDKDCCAhCgAwIBAgIQKnSKOsKvTWqnGQPQ9Di4CjANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjEwMjE2MTg1NzU3WhcNMjIwMjE2MTkwNzU3WjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQC/VTHiry8dO8yggKwK3afOjuP6pWZWasg/5Y8T7IZ03yV6i4j7NAaBwM6TOmWjalUULzfsCuZoFz8NgnTMfTul9W3mgvM0hlsjQG/gmSVD9d7vhcxPt71YcJis/lUv++CoGdNkPTv8GjDVUQk8e8Z4kLcaj8/rAF3kQuyd39uWcCLczU+4+wsX0a92tNH3iNBOAklI+SBpPPsjASkwB+8SldTCT08wyPC4mUecCawZJGrD27XCHcKIHifIL4UVKEH2Th4HTQrlOxQYwzArPtVJEqckdeN76onsy2hMKlJ7DxzdW2QRdLvf9Pr2ArtwslgdueqNM8E4ZoJwNBq7B8QZAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBRn7psIwqpH/ZYGk/IZcxiZUlo4OTAdBgNVHQ4EFgQUZ+6bCMKqR/2WBpPyGXMYmVJaODkwDQYJKoZIhvcNAQELBQADggEBAJeqZE/RZ1AgAe/tlYLVk9AauuhI/pheMylpYz5blJDFOmqDl0TVv4v1ZuiQwFGmm5j/S/u6hx2epbUKYE60q8+EGTJ5D6dz63x2sInwgFr9pA7xRZrR9eAi0qlj7IU5+KSwkTRkxuLuQ0HP87SulHzeFNGpoSkZqGmLeuMXWUJxtMTlEWbTvbkqrz30M9m0Atcrqy3+DkWnzdHrDijWizY9cTJSEQ76MZbIsGFoL0W9c0NFR6gvDDtoiQh5EMvgNROTbAfAIOevgjqiwhafY99H9KE5OS15CCSx6hIG/7Ec8QWj7IMzVpoYp8ku4fo/27H0caWXjDgjyi8LI7ObRaQ=","attributes":{"enabled":true,"nbf":1613501877,"exp":1645038477,"created":1613502478,"updated":1613502478,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/backupRestoreCertificateName-canrecoveradeletedcertificate-/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1613502469,"updated":1613502469}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/backupRestoreCertificateName-canrecoveradeletedcertificate-/pending"}}, [
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
  '3f983ad5-780e-49d4-ab6e-346554211847',
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
  'Tue, 16 Feb 2021 19:08:08 GMT',
  'Content-Length',
  '2817'
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
  '388',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  '6a17b228-65df-4adf-91a1-f8fd0a142064',
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
  'Tue, 16 Feb 2021 19:08:08 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/deletedcertificates/backupRestoreCertificateName-canrecoveradeletedcertificate-/recover')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/backupRestoreCertificateName-canrecoveradeletedcertificate-/732909a59e2a44b0bfbb7e036b66748c","kid":"https://keyvault_name.vault.azure.net/keys/backupRestoreCertificateName-canrecoveradeletedcertificate-/732909a59e2a44b0bfbb7e036b66748c","sid":"https://keyvault_name.vault.azure.net/secrets/backupRestoreCertificateName-canrecoveradeletedcertificate-/732909a59e2a44b0bfbb7e036b66748c","x5t":"yYA7zDVStZ0P3cOsW0dEqgj8ESY","cer":"MIIDKDCCAhCgAwIBAgIQKnSKOsKvTWqnGQPQ9Di4CjANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjEwMjE2MTg1NzU3WhcNMjIwMjE2MTkwNzU3WjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQC/VTHiry8dO8yggKwK3afOjuP6pWZWasg/5Y8T7IZ03yV6i4j7NAaBwM6TOmWjalUULzfsCuZoFz8NgnTMfTul9W3mgvM0hlsjQG/gmSVD9d7vhcxPt71YcJis/lUv++CoGdNkPTv8GjDVUQk8e8Z4kLcaj8/rAF3kQuyd39uWcCLczU+4+wsX0a92tNH3iNBOAklI+SBpPPsjASkwB+8SldTCT08wyPC4mUecCawZJGrD27XCHcKIHifIL4UVKEH2Th4HTQrlOxQYwzArPtVJEqckdeN76onsy2hMKlJ7DxzdW2QRdLvf9Pr2ArtwslgdueqNM8E4ZoJwNBq7B8QZAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBRn7psIwqpH/ZYGk/IZcxiZUlo4OTAdBgNVHQ4EFgQUZ+6bCMKqR/2WBpPyGXMYmVJaODkwDQYJKoZIhvcNAQELBQADggEBAJeqZE/RZ1AgAe/tlYLVk9AauuhI/pheMylpYz5blJDFOmqDl0TVv4v1ZuiQwFGmm5j/S/u6hx2epbUKYE60q8+EGTJ5D6dz63x2sInwgFr9pA7xRZrR9eAi0qlj7IU5+KSwkTRkxuLuQ0HP87SulHzeFNGpoSkZqGmLeuMXWUJxtMTlEWbTvbkqrz30M9m0Atcrqy3+DkWnzdHrDijWizY9cTJSEQ76MZbIsGFoL0W9c0NFR6gvDDtoiQh5EMvgNROTbAfAIOevgjqiwhafY99H9KE5OS15CCSx6hIG/7Ec8QWj7IMzVpoYp8ku4fo/27H0caWXjDgjyi8LI7ObRaQ=","attributes":{"enabled":true,"nbf":1613501877,"exp":1645038477,"created":1613502478,"updated":1613502478,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/backupRestoreCertificateName-canrecoveradeletedcertificate-/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1613502469,"updated":1613502469}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/backupRestoreCertificateName-canrecoveradeletedcertificate-/pending"}}, [
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
  '83fbf3b3-ca4b-484d-8200-bc403dcbebb3',
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
  'Tue, 16 Feb 2021 19:08:08 GMT',
  'Content-Length',
  '2614'
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
  '388',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  'fb3a316e-3510-42a1-b506-3b1552c25829',
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
  'Tue, 16 Feb 2021 19:08:08 GMT'
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
  '388',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  '74aab30f-665c-4fda-b81b-91bb17a97cd8',
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
  'Tue, 16 Feb 2021 19:08:08 GMT'
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
  '388',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  '66dd8fcd-264b-4d4f-91bc-8349a47a5771',
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
  'Tue, 16 Feb 2021 19:08:10 GMT'
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
  '388',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  '33653e78-deba-43c9-9f80-92b2e49da122',
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
  'Tue, 16 Feb 2021 19:08:12 GMT'
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
  '388',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  '33663aa3-8847-4570-9b9b-52389c5ba296',
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
  'Tue, 16 Feb 2021 19:08:14 GMT'
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
  '388',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  '2c72eb39-de1d-4c15-9e35-c03815f0a8e3',
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
  'Tue, 16 Feb 2021 19:08:16 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/backupRestoreCertificateName-canrecoveradeletedcertificate-/')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/backupRestoreCertificateName-canrecoveradeletedcertificate-/732909a59e2a44b0bfbb7e036b66748c","kid":"https://keyvault_name.vault.azure.net/keys/backupRestoreCertificateName-canrecoveradeletedcertificate-/732909a59e2a44b0bfbb7e036b66748c","sid":"https://keyvault_name.vault.azure.net/secrets/backupRestoreCertificateName-canrecoveradeletedcertificate-/732909a59e2a44b0bfbb7e036b66748c","x5t":"yYA7zDVStZ0P3cOsW0dEqgj8ESY","cer":"MIIDKDCCAhCgAwIBAgIQKnSKOsKvTWqnGQPQ9Di4CjANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjEwMjE2MTg1NzU3WhcNMjIwMjE2MTkwNzU3WjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQC/VTHiry8dO8yggKwK3afOjuP6pWZWasg/5Y8T7IZ03yV6i4j7NAaBwM6TOmWjalUULzfsCuZoFz8NgnTMfTul9W3mgvM0hlsjQG/gmSVD9d7vhcxPt71YcJis/lUv++CoGdNkPTv8GjDVUQk8e8Z4kLcaj8/rAF3kQuyd39uWcCLczU+4+wsX0a92tNH3iNBOAklI+SBpPPsjASkwB+8SldTCT08wyPC4mUecCawZJGrD27XCHcKIHifIL4UVKEH2Th4HTQrlOxQYwzArPtVJEqckdeN76onsy2hMKlJ7DxzdW2QRdLvf9Pr2ArtwslgdueqNM8E4ZoJwNBq7B8QZAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBRn7psIwqpH/ZYGk/IZcxiZUlo4OTAdBgNVHQ4EFgQUZ+6bCMKqR/2WBpPyGXMYmVJaODkwDQYJKoZIhvcNAQELBQADggEBAJeqZE/RZ1AgAe/tlYLVk9AauuhI/pheMylpYz5blJDFOmqDl0TVv4v1ZuiQwFGmm5j/S/u6hx2epbUKYE60q8+EGTJ5D6dz63x2sInwgFr9pA7xRZrR9eAi0qlj7IU5+KSwkTRkxuLuQ0HP87SulHzeFNGpoSkZqGmLeuMXWUJxtMTlEWbTvbkqrz30M9m0Atcrqy3+DkWnzdHrDijWizY9cTJSEQ76MZbIsGFoL0W9c0NFR6gvDDtoiQh5EMvgNROTbAfAIOevgjqiwhafY99H9KE5OS15CCSx6hIG/7Ec8QWj7IMzVpoYp8ku4fo/27H0caWXjDgjyi8LI7ObRaQ=","attributes":{"enabled":true,"nbf":1613501877,"exp":1645038477,"created":1613502478,"updated":1613502478,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/backupRestoreCertificateName-canrecoveradeletedcertificate-/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1613502469,"updated":1613502469}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/backupRestoreCertificateName-canrecoveradeletedcertificate-/pending"}}, [
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
  'e83fa8f9-3821-4ab2-9915-fa2d99a9fb9b',
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
  'Tue, 16 Feb 2021 19:08:18 GMT',
  'Content-Length',
  '2614'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/certificates/backupRestoreCertificateName-canrecoveradeletedcertificate-')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/backupRestoreCertificateName-canrecoveradeletedcertificate-","deletedDate":1613502498,"scheduledPurgeDate":1614107298,"id":"https://keyvault_name.vault.azure.net/certificates/backupRestoreCertificateName-canrecoveradeletedcertificate-/732909a59e2a44b0bfbb7e036b66748c","kid":"https://keyvault_name.vault.azure.net/keys/backupRestoreCertificateName-canrecoveradeletedcertificate-/732909a59e2a44b0bfbb7e036b66748c","sid":"https://keyvault_name.vault.azure.net/secrets/backupRestoreCertificateName-canrecoveradeletedcertificate-/732909a59e2a44b0bfbb7e036b66748c","x5t":"yYA7zDVStZ0P3cOsW0dEqgj8ESY","cer":"MIIDKDCCAhCgAwIBAgIQKnSKOsKvTWqnGQPQ9Di4CjANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjEwMjE2MTg1NzU3WhcNMjIwMjE2MTkwNzU3WjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQC/VTHiry8dO8yggKwK3afOjuP6pWZWasg/5Y8T7IZ03yV6i4j7NAaBwM6TOmWjalUULzfsCuZoFz8NgnTMfTul9W3mgvM0hlsjQG/gmSVD9d7vhcxPt71YcJis/lUv++CoGdNkPTv8GjDVUQk8e8Z4kLcaj8/rAF3kQuyd39uWcCLczU+4+wsX0a92tNH3iNBOAklI+SBpPPsjASkwB+8SldTCT08wyPC4mUecCawZJGrD27XCHcKIHifIL4UVKEH2Th4HTQrlOxQYwzArPtVJEqckdeN76onsy2hMKlJ7DxzdW2QRdLvf9Pr2ArtwslgdueqNM8E4ZoJwNBq7B8QZAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBRn7psIwqpH/ZYGk/IZcxiZUlo4OTAdBgNVHQ4EFgQUZ+6bCMKqR/2WBpPyGXMYmVJaODkwDQYJKoZIhvcNAQELBQADggEBAJeqZE/RZ1AgAe/tlYLVk9AauuhI/pheMylpYz5blJDFOmqDl0TVv4v1ZuiQwFGmm5j/S/u6hx2epbUKYE60q8+EGTJ5D6dz63x2sInwgFr9pA7xRZrR9eAi0qlj7IU5+KSwkTRkxuLuQ0HP87SulHzeFNGpoSkZqGmLeuMXWUJxtMTlEWbTvbkqrz30M9m0Atcrqy3+DkWnzdHrDijWizY9cTJSEQ76MZbIsGFoL0W9c0NFR6gvDDtoiQh5EMvgNROTbAfAIOevgjqiwhafY99H9KE5OS15CCSx6hIG/7Ec8QWj7IMzVpoYp8ku4fo/27H0caWXjDgjyi8LI7ObRaQ=","attributes":{"enabled":true,"nbf":1613501877,"exp":1645038477,"created":1613502478,"updated":1613502478,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/backupRestoreCertificateName-canrecoveradeletedcertificate-/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1613502469,"updated":1613502469}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/backupRestoreCertificateName-canrecoveradeletedcertificate-/pending"}}, [
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
  'c21621ab-dc58-461f-99ac-bf633893e676',
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
  'Tue, 16 Feb 2021 19:08:18 GMT',
  'Content-Length',
  '2817'
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
  '160',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  'd76a2d05-9c0a-41cb-bbaf-8f03fced271f',
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
  'Tue, 16 Feb 2021 19:08:18 GMT'
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
  '160',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  'eb4849b9-d4e9-4c7d-b1a8-6547b22e80b7',
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
  'Tue, 16 Feb 2021 19:08:18 GMT'
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
  '160',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  '51992c20-d721-440a-8554-cf974e62b6fa',
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
  'Tue, 16 Feb 2021 19:08:20 GMT'
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
  '160',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  '6f1ca420-d943-466e-ae42-32a88c9e4727',
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
  'Tue, 16 Feb 2021 19:08:22 GMT'
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
  '160',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  'e026aa0c-8e02-4470-88b2-472b886030bb',
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
  'Tue, 16 Feb 2021 19:08:25 GMT'
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
  '160',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  '1a96da18-eff5-4c13-b6b7-5cfeb15bca23',
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
  'Tue, 16 Feb 2021 19:08:27 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/backupRestoreCertificateName-canrecoveradeletedcertificate-')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/backupRestoreCertificateName-canrecoveradeletedcertificate-","deletedDate":1613502498,"scheduledPurgeDate":1614107298,"id":"https://keyvault_name.vault.azure.net/certificates/backupRestoreCertificateName-canrecoveradeletedcertificate-/732909a59e2a44b0bfbb7e036b66748c","kid":"https://keyvault_name.vault.azure.net/keys/backupRestoreCertificateName-canrecoveradeletedcertificate-/732909a59e2a44b0bfbb7e036b66748c","sid":"https://keyvault_name.vault.azure.net/secrets/backupRestoreCertificateName-canrecoveradeletedcertificate-/732909a59e2a44b0bfbb7e036b66748c","x5t":"yYA7zDVStZ0P3cOsW0dEqgj8ESY","cer":"MIIDKDCCAhCgAwIBAgIQKnSKOsKvTWqnGQPQ9Di4CjANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjEwMjE2MTg1NzU3WhcNMjIwMjE2MTkwNzU3WjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQC/VTHiry8dO8yggKwK3afOjuP6pWZWasg/5Y8T7IZ03yV6i4j7NAaBwM6TOmWjalUULzfsCuZoFz8NgnTMfTul9W3mgvM0hlsjQG/gmSVD9d7vhcxPt71YcJis/lUv++CoGdNkPTv8GjDVUQk8e8Z4kLcaj8/rAF3kQuyd39uWcCLczU+4+wsX0a92tNH3iNBOAklI+SBpPPsjASkwB+8SldTCT08wyPC4mUecCawZJGrD27XCHcKIHifIL4UVKEH2Th4HTQrlOxQYwzArPtVJEqckdeN76onsy2hMKlJ7DxzdW2QRdLvf9Pr2ArtwslgdueqNM8E4ZoJwNBq7B8QZAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBRn7psIwqpH/ZYGk/IZcxiZUlo4OTAdBgNVHQ4EFgQUZ+6bCMKqR/2WBpPyGXMYmVJaODkwDQYJKoZIhvcNAQELBQADggEBAJeqZE/RZ1AgAe/tlYLVk9AauuhI/pheMylpYz5blJDFOmqDl0TVv4v1ZuiQwFGmm5j/S/u6hx2epbUKYE60q8+EGTJ5D6dz63x2sInwgFr9pA7xRZrR9eAi0qlj7IU5+KSwkTRkxuLuQ0HP87SulHzeFNGpoSkZqGmLeuMXWUJxtMTlEWbTvbkqrz30M9m0Atcrqy3+DkWnzdHrDijWizY9cTJSEQ76MZbIsGFoL0W9c0NFR6gvDDtoiQh5EMvgNROTbAfAIOevgjqiwhafY99H9KE5OS15CCSx6hIG/7Ec8QWj7IMzVpoYp8ku4fo/27H0caWXjDgjyi8LI7ObRaQ=","attributes":{"enabled":true,"nbf":1613501877,"exp":1645038477,"created":1613502478,"updated":1613502478,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/backupRestoreCertificateName-canrecoveradeletedcertificate-/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1613502469,"updated":1613502469}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/backupRestoreCertificateName-canrecoveradeletedcertificate-/pending"}}, [
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
  '731f6e6d-6f3e-44e5-bf4f-67b2fde8c2a0',
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
  'Tue, 16 Feb 2021 19:08:28 GMT',
  'Content-Length',
  '2817'
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
  'westus2',
  'x-ms-request-id',
  '914b0690-79e5-4465-a8d3-807cb04d475c',
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
  'Tue, 16 Feb 2021 19:08:29 GMT'
]);

let nock = require('nock');

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
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'WWW-Authenticate',
  'Bearer authorization="https://login.windows.net/azure_tenant_id", resource="https://vault.azure.net"',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '4c5fe127-763f-4457-905b-e1cd12168190',
  'x-ms-keyvault-service-version',
  '1.1.0.898',
  'x-ms-keyvault-network-info',
  'addr=52.183.115.156;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 07 May 2020 20:55:25 GMT'
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
  '598d9a38-9d3d-490c-ad35-0afdf4784500',
  'x-ms-ests-server',
  '2.1.10519.7 - NCUS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AmPYPHiKTw9KihyP8-W_k78_aSJHAQAAAL1sRtYOAAAA; expires=Sat, 06-Jun-2020 20:55:26 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; SameSite=None; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; SameSite=None; secure; HttpOnly',
  'Date',
  'Thu, 07 May 2020 20:55:25 GMT',
  'Content-Length',
  '1315'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/certificates/recoverCertificateName-canupdatecertificatewithrequestOptionstimeout-/create', {"policy":{"key_props":{},"secret_props":{},"x509_props":{"subject":"cn=MyCert","sans":{}},"issuer":{"name":"Self"},"attributes":{}},"attributes":{}})
  .query(true)
  .reply(202, {"id":"https://keyvault_name.vault.azure.net/certificates/recoverCertificateName-canupdatecertificatewithrequestOptionstimeout-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA1Jd2kIG3nMisLDMw6I4rucx6gOGqLNl15bdLwfARt1j4eJDCoNiuEjkzimgLr/Qd4wLq/DwhOvQkuoUAZpJfGrQBfAu5wEKETzQwp8pH32ghrcwxZVbxn9nIK3FCpVRD0s7aCIoNDJpZipsPoTT2seV4e9iQD2qKPn/vQ82XAhNDagD2Ikq8lGgaJZAnpLESoLknDr6kFEMKvsL5K6HxnUjlF3TTLQbHXw7xgzHOwJcPXboL7bivquCUiUF8tSncX9VjdQ2h18xuij1ixxQxfyqmhpvbpHf54KhhS6BxuUiPIY1zp2+pGVupzcfHEepDMGjtdGbSh+Tt3WSZ2t9QywIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAMv5fBx6/Oyq+zbbWScuVMSQ3OoUehOVjdZdb3G1qED6i1tZPDOxuwsHI+VKM6f4dKKPnTbfzzVE2ykm92XRj7zqGgqHVGRYjRNqmSwFmimuWZc6hiB2t0kuvpX3/NpNR8U9XG5z29GlSha7R+AfWPHFDN22KnyJnFCqo6behES6hsUOoqHpHeKZC/uzKbgn7r9Udqohz6e7Qsvb+DMU/o+ZWjEtZMJkpyfI4TG9WEGOD4rn1EgO/t/vRSa5WbbqR2ql2VzFPzFhMfLImGluwDuCfjFPeVR+anJBRhhoUUcUzmwyC4+jTMvQFYpBslpr/iDBIWlp3tdodui4apUJ8dI=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"0c5913e64bd44f74bf24dbe9ff0eafc1"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://keyvault_name.vault.azure.net/certificates/recoverCertificateName-canupdatecertificatewithrequestOptionstimeout-/pending?api-version=7.0&request_id=0c5913e64bd44f74bf24dbe9ff0eafc1',
  'Retry-After',
  '10',
  'Server',
  'Microsoft-IIS/10.0',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'b5ca339b-0513-4479-8776-95ab7a2bdd7b',
  'x-ms-keyvault-service-version',
  '1.1.0.898',
  'x-ms-keyvault-network-info',
  'addr=52.183.115.156;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 07 May 2020 20:55:26 GMT',
  'Content-Length',
  '1361'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/recoverCertificateName-canupdatecertificatewithrequestOptionstimeout-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/recoverCertificateName-canupdatecertificatewithrequestOptionstimeout-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA1Jd2kIG3nMisLDMw6I4rucx6gOGqLNl15bdLwfARt1j4eJDCoNiuEjkzimgLr/Qd4wLq/DwhOvQkuoUAZpJfGrQBfAu5wEKETzQwp8pH32ghrcwxZVbxn9nIK3FCpVRD0s7aCIoNDJpZipsPoTT2seV4e9iQD2qKPn/vQ82XAhNDagD2Ikq8lGgaJZAnpLESoLknDr6kFEMKvsL5K6HxnUjlF3TTLQbHXw7xgzHOwJcPXboL7bivquCUiUF8tSncX9VjdQ2h18xuij1ixxQxfyqmhpvbpHf54KhhS6BxuUiPIY1zp2+pGVupzcfHEepDMGjtdGbSh+Tt3WSZ2t9QywIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAMv5fBx6/Oyq+zbbWScuVMSQ3OoUehOVjdZdb3G1qED6i1tZPDOxuwsHI+VKM6f4dKKPnTbfzzVE2ykm92XRj7zqGgqHVGRYjRNqmSwFmimuWZc6hiB2t0kuvpX3/NpNR8U9XG5z29GlSha7R+AfWPHFDN22KnyJnFCqo6behES6hsUOoqHpHeKZC/uzKbgn7r9Udqohz6e7Qsvb+DMU/o+ZWjEtZMJkpyfI4TG9WEGOD4rn1EgO/t/vRSa5WbbqR2ql2VzFPzFhMfLImGluwDuCfjFPeVR+anJBRhhoUUcUzmwyC4+jTMvQFYpBslpr/iDBIWlp3tdodui4apUJ8dI=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"0c5913e64bd44f74bf24dbe9ff0eafc1"}, [
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
  'Server',
  'Microsoft-IIS/10.0',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '82a76e3e-808f-4d9a-8a24-8b383ad70b24',
  'x-ms-keyvault-service-version',
  '1.1.0.898',
  'x-ms-keyvault-network-info',
  'addr=52.183.115.156;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 07 May 2020 20:55:26 GMT',
  'Content-Length',
  '1361'
]);

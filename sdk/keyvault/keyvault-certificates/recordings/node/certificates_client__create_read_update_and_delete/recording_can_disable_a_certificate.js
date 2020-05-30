let nock = require('nock');

module.exports.hash = "292818f01c5ac558f9a432982a7bfae2";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/certificates/recoverCertificateName-candisableacertificate-/create')
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
  'a46c6281-e0ec-4e14-a9a4-9dc95186f8ac',
  'x-ms-keyvault-service-version',
  '1.1.5.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.233.72.51;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 27 May 2020 13:18:01 GMT'
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
  'ac7be9c3-c96c-4071-be94-01c39ce30900',
  'x-ms-ests-server',
  '2.1.10656.5 - WUS2 ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=As2SNxyetS1Evpi27lOew8M_aSJHAQAAAIlfYNYOAAAA; expires=Fri, 26-Jun-2020 13:18:02 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; SameSite=None; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; SameSite=None; secure; HttpOnly',
  'Date',
  'Wed, 27 May 2020 13:18:01 GMT',
  'Content-Length',
  '1315'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/certificates/recoverCertificateName-candisableacertificate-/create', {"policy":{"key_props":{},"secret_props":{},"x509_props":{"subject":"cn=MyCert","sans":{}},"issuer":{"name":"Self"},"attributes":{}},"attributes":{}})
  .query(true)
  .reply(202, {"id":"https://keyvault_name.vault.azure.net/certificates/recoverCertificateName-candisableacertificate-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAuOda2PUv4OOLSXUqi764t5zKRl5a8hFeV7iDGC/lcgWY356QZe9DlbCuHWZsTQ8X9CJa0puDHRQQ7r7Ac50qalwSgT9NtEjoXoNoe5Ir0vYCpfFToHtYWWV8pQmRE96DrHgl8wXyECZvrF1OUtdL1xyrtT6lXyAEqEFgrBilu4JZW3PVfLlJSd69wK/JKaw/JfLv4uyS8MlWeMh2BIq03H5tUGesZelFM2zeOJgpLJJYJ3kYfM468Y5qf9eR2A7FU362Kuko4TpZwh5NLvcQ7O6zNMuS/qJgfXaXRKXUhHIDENq2amj5Selft2bFj7As1rlytdzaD7QzRZnBMiQDmwIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAHErgRW0yrpr0AAsCsJcHiLx20ML50NKJy0rvzFSS8fvwtvOlMAkUHJSmxp93HuDZB67t+ibVxHq6p5qju4yZS7cs6fP9uua2RYoKLnx05MgLuhvrPej5VGicNob8LTA+GlSjKrl09l8BKXUItPZmtxMdv0grD4Cq+NLELwyv3f0VE5oeo4bst9Om4BoeCgruCsJD530KP+5Z3PiOE6VRXaouIpAK9MGgVcBTNYlTHUXX4HPEYRgNWMtd6Qv+dfyOrIdHxM2bUgz7Bi9a4PdvbYXlz/NrSpVXd5Co7NjKe7TBxnlhYcjVXfxjtQbTNb0rbfdWDMCoQBxvTddlCHhJPk=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"e37f677a9b354a139c378071673d6e13"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://keyvault_name.vault.azure.net/certificates/recoverCertificateName-candisableacertificate-/pending?api-version=7.1-preview&request_id=e37f677a9b354a139c378071673d6e13',
  'Retry-After',
  '10',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'bc21e71a-0048-4a3c-804f-005ae71f92d3',
  'x-ms-keyvault-service-version',
  '1.1.5.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.233.72.51;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 27 May 2020 13:18:02 GMT',
  'Content-Length',
  '1338'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/recoverCertificateName-candisableacertificate-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/recoverCertificateName-candisableacertificate-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAuOda2PUv4OOLSXUqi764t5zKRl5a8hFeV7iDGC/lcgWY356QZe9DlbCuHWZsTQ8X9CJa0puDHRQQ7r7Ac50qalwSgT9NtEjoXoNoe5Ir0vYCpfFToHtYWWV8pQmRE96DrHgl8wXyECZvrF1OUtdL1xyrtT6lXyAEqEFgrBilu4JZW3PVfLlJSd69wK/JKaw/JfLv4uyS8MlWeMh2BIq03H5tUGesZelFM2zeOJgpLJJYJ3kYfM468Y5qf9eR2A7FU362Kuko4TpZwh5NLvcQ7O6zNMuS/qJgfXaXRKXUhHIDENq2amj5Selft2bFj7As1rlytdzaD7QzRZnBMiQDmwIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAHErgRW0yrpr0AAsCsJcHiLx20ML50NKJy0rvzFSS8fvwtvOlMAkUHJSmxp93HuDZB67t+ibVxHq6p5qju4yZS7cs6fP9uua2RYoKLnx05MgLuhvrPej5VGicNob8LTA+GlSjKrl09l8BKXUItPZmtxMdv0grD4Cq+NLELwyv3f0VE5oeo4bst9Om4BoeCgruCsJD530KP+5Z3PiOE6VRXaouIpAK9MGgVcBTNYlTHUXX4HPEYRgNWMtd6Qv+dfyOrIdHxM2bUgz7Bi9a4PdvbYXlz/NrSpVXd5Co7NjKe7TBxnlhYcjVXfxjtQbTNb0rbfdWDMCoQBxvTddlCHhJPk=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"e37f677a9b354a139c378071673d6e13"}, [
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
  '7f73593d-0d42-4195-8cf9-347311ddbfe5',
  'x-ms-keyvault-service-version',
  '1.1.5.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.233.72.51;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 27 May 2020 13:18:02 GMT',
  'Content-Length',
  '1338'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/recoverCertificateName-candisableacertificate-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/recoverCertificateName-candisableacertificate-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAuOda2PUv4OOLSXUqi764t5zKRl5a8hFeV7iDGC/lcgWY356QZe9DlbCuHWZsTQ8X9CJa0puDHRQQ7r7Ac50qalwSgT9NtEjoXoNoe5Ir0vYCpfFToHtYWWV8pQmRE96DrHgl8wXyECZvrF1OUtdL1xyrtT6lXyAEqEFgrBilu4JZW3PVfLlJSd69wK/JKaw/JfLv4uyS8MlWeMh2BIq03H5tUGesZelFM2zeOJgpLJJYJ3kYfM468Y5qf9eR2A7FU362Kuko4TpZwh5NLvcQ7O6zNMuS/qJgfXaXRKXUhHIDENq2amj5Selft2bFj7As1rlytdzaD7QzRZnBMiQDmwIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAHErgRW0yrpr0AAsCsJcHiLx20ML50NKJy0rvzFSS8fvwtvOlMAkUHJSmxp93HuDZB67t+ibVxHq6p5qju4yZS7cs6fP9uua2RYoKLnx05MgLuhvrPej5VGicNob8LTA+GlSjKrl09l8BKXUItPZmtxMdv0grD4Cq+NLELwyv3f0VE5oeo4bst9Om4BoeCgruCsJD530KP+5Z3PiOE6VRXaouIpAK9MGgVcBTNYlTHUXX4HPEYRgNWMtd6Qv+dfyOrIdHxM2bUgz7Bi9a4PdvbYXlz/NrSpVXd5Co7NjKe7TBxnlhYcjVXfxjtQbTNb0rbfdWDMCoQBxvTddlCHhJPk=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"e37f677a9b354a139c378071673d6e13"}, [
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
  '8abbf2ac-0dd0-4218-908b-9accc9f114a6',
  'x-ms-keyvault-service-version',
  '1.1.5.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.233.72.51;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 27 May 2020 13:18:02 GMT',
  'Content-Length',
  '1338'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/recoverCertificateName-candisableacertificate-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/recoverCertificateName-candisableacertificate-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAuOda2PUv4OOLSXUqi764t5zKRl5a8hFeV7iDGC/lcgWY356QZe9DlbCuHWZsTQ8X9CJa0puDHRQQ7r7Ac50qalwSgT9NtEjoXoNoe5Ir0vYCpfFToHtYWWV8pQmRE96DrHgl8wXyECZvrF1OUtdL1xyrtT6lXyAEqEFgrBilu4JZW3PVfLlJSd69wK/JKaw/JfLv4uyS8MlWeMh2BIq03H5tUGesZelFM2zeOJgpLJJYJ3kYfM468Y5qf9eR2A7FU362Kuko4TpZwh5NLvcQ7O6zNMuS/qJgfXaXRKXUhHIDENq2amj5Selft2bFj7As1rlytdzaD7QzRZnBMiQDmwIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAHErgRW0yrpr0AAsCsJcHiLx20ML50NKJy0rvzFSS8fvwtvOlMAkUHJSmxp93HuDZB67t+ibVxHq6p5qju4yZS7cs6fP9uua2RYoKLnx05MgLuhvrPej5VGicNob8LTA+GlSjKrl09l8BKXUItPZmtxMdv0grD4Cq+NLELwyv3f0VE5oeo4bst9Om4BoeCgruCsJD530KP+5Z3PiOE6VRXaouIpAK9MGgVcBTNYlTHUXX4HPEYRgNWMtd6Qv+dfyOrIdHxM2bUgz7Bi9a4PdvbYXlz/NrSpVXd5Co7NjKe7TBxnlhYcjVXfxjtQbTNb0rbfdWDMCoQBxvTddlCHhJPk=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"e37f677a9b354a139c378071673d6e13"}, [
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
  '1531378e-4970-48a3-a54b-e663285f2710',
  'x-ms-keyvault-service-version',
  '1.1.5.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.233.72.51;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 27 May 2020 13:18:04 GMT',
  'Content-Length',
  '1338'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/recoverCertificateName-candisableacertificate-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/recoverCertificateName-candisableacertificate-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAuOda2PUv4OOLSXUqi764t5zKRl5a8hFeV7iDGC/lcgWY356QZe9DlbCuHWZsTQ8X9CJa0puDHRQQ7r7Ac50qalwSgT9NtEjoXoNoe5Ir0vYCpfFToHtYWWV8pQmRE96DrHgl8wXyECZvrF1OUtdL1xyrtT6lXyAEqEFgrBilu4JZW3PVfLlJSd69wK/JKaw/JfLv4uyS8MlWeMh2BIq03H5tUGesZelFM2zeOJgpLJJYJ3kYfM468Y5qf9eR2A7FU362Kuko4TpZwh5NLvcQ7O6zNMuS/qJgfXaXRKXUhHIDENq2amj5Selft2bFj7As1rlytdzaD7QzRZnBMiQDmwIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAHErgRW0yrpr0AAsCsJcHiLx20ML50NKJy0rvzFSS8fvwtvOlMAkUHJSmxp93HuDZB67t+ibVxHq6p5qju4yZS7cs6fP9uua2RYoKLnx05MgLuhvrPej5VGicNob8LTA+GlSjKrl09l8BKXUItPZmtxMdv0grD4Cq+NLELwyv3f0VE5oeo4bst9Om4BoeCgruCsJD530KP+5Z3PiOE6VRXaouIpAK9MGgVcBTNYlTHUXX4HPEYRgNWMtd6Qv+dfyOrIdHxM2bUgz7Bi9a4PdvbYXlz/NrSpVXd5Co7NjKe7TBxnlhYcjVXfxjtQbTNb0rbfdWDMCoQBxvTddlCHhJPk=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"e37f677a9b354a139c378071673d6e13"}, [
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
  'f09bb5ca-2ccc-4f3f-8fdb-40f80bf5296c',
  'x-ms-keyvault-service-version',
  '1.1.5.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.233.72.51;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 27 May 2020 13:18:06 GMT',
  'Content-Length',
  '1338'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/recoverCertificateName-candisableacertificate-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/recoverCertificateName-candisableacertificate-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAuOda2PUv4OOLSXUqi764t5zKRl5a8hFeV7iDGC/lcgWY356QZe9DlbCuHWZsTQ8X9CJa0puDHRQQ7r7Ac50qalwSgT9NtEjoXoNoe5Ir0vYCpfFToHtYWWV8pQmRE96DrHgl8wXyECZvrF1OUtdL1xyrtT6lXyAEqEFgrBilu4JZW3PVfLlJSd69wK/JKaw/JfLv4uyS8MlWeMh2BIq03H5tUGesZelFM2zeOJgpLJJYJ3kYfM468Y5qf9eR2A7FU362Kuko4TpZwh5NLvcQ7O6zNMuS/qJgfXaXRKXUhHIDENq2amj5Selft2bFj7As1rlytdzaD7QzRZnBMiQDmwIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAHErgRW0yrpr0AAsCsJcHiLx20ML50NKJy0rvzFSS8fvwtvOlMAkUHJSmxp93HuDZB67t+ibVxHq6p5qju4yZS7cs6fP9uua2RYoKLnx05MgLuhvrPej5VGicNob8LTA+GlSjKrl09l8BKXUItPZmtxMdv0grD4Cq+NLELwyv3f0VE5oeo4bst9Om4BoeCgruCsJD530KP+5Z3PiOE6VRXaouIpAK9MGgVcBTNYlTHUXX4HPEYRgNWMtd6Qv+dfyOrIdHxM2bUgz7Bi9a4PdvbYXlz/NrSpVXd5Co7NjKe7TBxnlhYcjVXfxjtQbTNb0rbfdWDMCoQBxvTddlCHhJPk=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"e37f677a9b354a139c378071673d6e13"}, [
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
  'b18eda00-dd81-40a2-bfa8-6dbbb0d62908',
  'x-ms-keyvault-service-version',
  '1.1.5.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.233.72.51;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 27 May 2020 13:18:08 GMT',
  'Content-Length',
  '1338'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/recoverCertificateName-candisableacertificate-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/recoverCertificateName-candisableacertificate-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAuOda2PUv4OOLSXUqi764t5zKRl5a8hFeV7iDGC/lcgWY356QZe9DlbCuHWZsTQ8X9CJa0puDHRQQ7r7Ac50qalwSgT9NtEjoXoNoe5Ir0vYCpfFToHtYWWV8pQmRE96DrHgl8wXyECZvrF1OUtdL1xyrtT6lXyAEqEFgrBilu4JZW3PVfLlJSd69wK/JKaw/JfLv4uyS8MlWeMh2BIq03H5tUGesZelFM2zeOJgpLJJYJ3kYfM468Y5qf9eR2A7FU362Kuko4TpZwh5NLvcQ7O6zNMuS/qJgfXaXRKXUhHIDENq2amj5Selft2bFj7As1rlytdzaD7QzRZnBMiQDmwIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAHErgRW0yrpr0AAsCsJcHiLx20ML50NKJy0rvzFSS8fvwtvOlMAkUHJSmxp93HuDZB67t+ibVxHq6p5qju4yZS7cs6fP9uua2RYoKLnx05MgLuhvrPej5VGicNob8LTA+GlSjKrl09l8BKXUItPZmtxMdv0grD4Cq+NLELwyv3f0VE5oeo4bst9Om4BoeCgruCsJD530KP+5Z3PiOE6VRXaouIpAK9MGgVcBTNYlTHUXX4HPEYRgNWMtd6Qv+dfyOrIdHxM2bUgz7Bi9a4PdvbYXlz/NrSpVXd5Co7NjKe7TBxnlhYcjVXfxjtQbTNb0rbfdWDMCoQBxvTddlCHhJPk=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"e37f677a9b354a139c378071673d6e13"}, [
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
  'bce8e50e-bf10-4c0c-82cf-dca3b3821279',
  'x-ms-keyvault-service-version',
  '1.1.5.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.233.72.51;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 27 May 2020 13:18:10 GMT',
  'Content-Length',
  '1338'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/recoverCertificateName-candisableacertificate-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/recoverCertificateName-candisableacertificate-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAuOda2PUv4OOLSXUqi764t5zKRl5a8hFeV7iDGC/lcgWY356QZe9DlbCuHWZsTQ8X9CJa0puDHRQQ7r7Ac50qalwSgT9NtEjoXoNoe5Ir0vYCpfFToHtYWWV8pQmRE96DrHgl8wXyECZvrF1OUtdL1xyrtT6lXyAEqEFgrBilu4JZW3PVfLlJSd69wK/JKaw/JfLv4uyS8MlWeMh2BIq03H5tUGesZelFM2zeOJgpLJJYJ3kYfM468Y5qf9eR2A7FU362Kuko4TpZwh5NLvcQ7O6zNMuS/qJgfXaXRKXUhHIDENq2amj5Selft2bFj7As1rlytdzaD7QzRZnBMiQDmwIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAHErgRW0yrpr0AAsCsJcHiLx20ML50NKJy0rvzFSS8fvwtvOlMAkUHJSmxp93HuDZB67t+ibVxHq6p5qju4yZS7cs6fP9uua2RYoKLnx05MgLuhvrPej5VGicNob8LTA+GlSjKrl09l8BKXUItPZmtxMdv0grD4Cq+NLELwyv3f0VE5oeo4bst9Om4BoeCgruCsJD530KP+5Z3PiOE6VRXaouIpAK9MGgVcBTNYlTHUXX4HPEYRgNWMtd6Qv+dfyOrIdHxM2bUgz7Bi9a4PdvbYXlz/NrSpVXd5Co7NjKe7TBxnlhYcjVXfxjtQbTNb0rbfdWDMCoQBxvTddlCHhJPk=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"e37f677a9b354a139c378071673d6e13"}, [
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
  '68998ebe-8d7a-4d9b-bd85-e147cf3d259c',
  'x-ms-keyvault-service-version',
  '1.1.5.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.233.72.51;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 27 May 2020 13:18:12 GMT',
  'Content-Length',
  '1338'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/recoverCertificateName-candisableacertificate-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/recoverCertificateName-candisableacertificate-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAuOda2PUv4OOLSXUqi764t5zKRl5a8hFeV7iDGC/lcgWY356QZe9DlbCuHWZsTQ8X9CJa0puDHRQQ7r7Ac50qalwSgT9NtEjoXoNoe5Ir0vYCpfFToHtYWWV8pQmRE96DrHgl8wXyECZvrF1OUtdL1xyrtT6lXyAEqEFgrBilu4JZW3PVfLlJSd69wK/JKaw/JfLv4uyS8MlWeMh2BIq03H5tUGesZelFM2zeOJgpLJJYJ3kYfM468Y5qf9eR2A7FU362Kuko4TpZwh5NLvcQ7O6zNMuS/qJgfXaXRKXUhHIDENq2amj5Selft2bFj7As1rlytdzaD7QzRZnBMiQDmwIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAHErgRW0yrpr0AAsCsJcHiLx20ML50NKJy0rvzFSS8fvwtvOlMAkUHJSmxp93HuDZB67t+ibVxHq6p5qju4yZS7cs6fP9uua2RYoKLnx05MgLuhvrPej5VGicNob8LTA+GlSjKrl09l8BKXUItPZmtxMdv0grD4Cq+NLELwyv3f0VE5oeo4bst9Om4BoeCgruCsJD530KP+5Z3PiOE6VRXaouIpAK9MGgVcBTNYlTHUXX4HPEYRgNWMtd6Qv+dfyOrIdHxM2bUgz7Bi9a4PdvbYXlz/NrSpVXd5Co7NjKe7TBxnlhYcjVXfxjtQbTNb0rbfdWDMCoQBxvTddlCHhJPk=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"e37f677a9b354a139c378071673d6e13"}, [
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
  'b2c2c0ed-aa1c-4d02-b09e-651a6e3db238',
  'x-ms-keyvault-service-version',
  '1.1.5.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.233.72.51;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 27 May 2020 13:18:15 GMT',
  'Content-Length',
  '1338'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/recoverCertificateName-candisableacertificate-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/recoverCertificateName-candisableacertificate-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAuOda2PUv4OOLSXUqi764t5zKRl5a8hFeV7iDGC/lcgWY356QZe9DlbCuHWZsTQ8X9CJa0puDHRQQ7r7Ac50qalwSgT9NtEjoXoNoe5Ir0vYCpfFToHtYWWV8pQmRE96DrHgl8wXyECZvrF1OUtdL1xyrtT6lXyAEqEFgrBilu4JZW3PVfLlJSd69wK/JKaw/JfLv4uyS8MlWeMh2BIq03H5tUGesZelFM2zeOJgpLJJYJ3kYfM468Y5qf9eR2A7FU362Kuko4TpZwh5NLvcQ7O6zNMuS/qJgfXaXRKXUhHIDENq2amj5Selft2bFj7As1rlytdzaD7QzRZnBMiQDmwIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAHErgRW0yrpr0AAsCsJcHiLx20ML50NKJy0rvzFSS8fvwtvOlMAkUHJSmxp93HuDZB67t+ibVxHq6p5qju4yZS7cs6fP9uua2RYoKLnx05MgLuhvrPej5VGicNob8LTA+GlSjKrl09l8BKXUItPZmtxMdv0grD4Cq+NLELwyv3f0VE5oeo4bst9Om4BoeCgruCsJD530KP+5Z3PiOE6VRXaouIpAK9MGgVcBTNYlTHUXX4HPEYRgNWMtd6Qv+dfyOrIdHxM2bUgz7Bi9a4PdvbYXlz/NrSpVXd5Co7NjKe7TBxnlhYcjVXfxjtQbTNb0rbfdWDMCoQBxvTddlCHhJPk=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"e37f677a9b354a139c378071673d6e13"}, [
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
  '059be727-aebc-4c15-bf1b-c1356c0fbca6',
  'x-ms-keyvault-service-version',
  '1.1.5.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.233.72.51;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 27 May 2020 13:18:17 GMT',
  'Content-Length',
  '1338'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/recoverCertificateName-candisableacertificate-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/recoverCertificateName-candisableacertificate-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAuOda2PUv4OOLSXUqi764t5zKRl5a8hFeV7iDGC/lcgWY356QZe9DlbCuHWZsTQ8X9CJa0puDHRQQ7r7Ac50qalwSgT9NtEjoXoNoe5Ir0vYCpfFToHtYWWV8pQmRE96DrHgl8wXyECZvrF1OUtdL1xyrtT6lXyAEqEFgrBilu4JZW3PVfLlJSd69wK/JKaw/JfLv4uyS8MlWeMh2BIq03H5tUGesZelFM2zeOJgpLJJYJ3kYfM468Y5qf9eR2A7FU362Kuko4TpZwh5NLvcQ7O6zNMuS/qJgfXaXRKXUhHIDENq2amj5Selft2bFj7As1rlytdzaD7QzRZnBMiQDmwIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAHErgRW0yrpr0AAsCsJcHiLx20ML50NKJy0rvzFSS8fvwtvOlMAkUHJSmxp93HuDZB67t+ibVxHq6p5qju4yZS7cs6fP9uua2RYoKLnx05MgLuhvrPej5VGicNob8LTA+GlSjKrl09l8BKXUItPZmtxMdv0grD4Cq+NLELwyv3f0VE5oeo4bst9Om4BoeCgruCsJD530KP+5Z3PiOE6VRXaouIpAK9MGgVcBTNYlTHUXX4HPEYRgNWMtd6Qv+dfyOrIdHxM2bUgz7Bi9a4PdvbYXlz/NrSpVXd5Co7NjKe7TBxnlhYcjVXfxjtQbTNb0rbfdWDMCoQBxvTddlCHhJPk=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"e37f677a9b354a139c378071673d6e13"}, [
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
  '669982e6-4236-4a6f-91bf-be82a244a678',
  'x-ms-keyvault-service-version',
  '1.1.5.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.233.72.51;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 27 May 2020 13:18:19 GMT',
  'Content-Length',
  '1338'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/recoverCertificateName-candisableacertificate-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/recoverCertificateName-candisableacertificate-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAuOda2PUv4OOLSXUqi764t5zKRl5a8hFeV7iDGC/lcgWY356QZe9DlbCuHWZsTQ8X9CJa0puDHRQQ7r7Ac50qalwSgT9NtEjoXoNoe5Ir0vYCpfFToHtYWWV8pQmRE96DrHgl8wXyECZvrF1OUtdL1xyrtT6lXyAEqEFgrBilu4JZW3PVfLlJSd69wK/JKaw/JfLv4uyS8MlWeMh2BIq03H5tUGesZelFM2zeOJgpLJJYJ3kYfM468Y5qf9eR2A7FU362Kuko4TpZwh5NLvcQ7O6zNMuS/qJgfXaXRKXUhHIDENq2amj5Selft2bFj7As1rlytdzaD7QzRZnBMiQDmwIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAHErgRW0yrpr0AAsCsJcHiLx20ML50NKJy0rvzFSS8fvwtvOlMAkUHJSmxp93HuDZB67t+ibVxHq6p5qju4yZS7cs6fP9uua2RYoKLnx05MgLuhvrPej5VGicNob8LTA+GlSjKrl09l8BKXUItPZmtxMdv0grD4Cq+NLELwyv3f0VE5oeo4bst9Om4BoeCgruCsJD530KP+5Z3PiOE6VRXaouIpAK9MGgVcBTNYlTHUXX4HPEYRgNWMtd6Qv+dfyOrIdHxM2bUgz7Bi9a4PdvbYXlz/NrSpVXd5Co7NjKe7TBxnlhYcjVXfxjtQbTNb0rbfdWDMCoQBxvTddlCHhJPk=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"e37f677a9b354a139c378071673d6e13"}, [
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
  'c2505610-5309-4d45-8737-2522c9af3817',
  'x-ms-keyvault-service-version',
  '1.1.5.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.233.72.51;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 27 May 2020 13:18:21 GMT',
  'Content-Length',
  '1338'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/recoverCertificateName-candisableacertificate-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/recoverCertificateName-candisableacertificate-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAuOda2PUv4OOLSXUqi764t5zKRl5a8hFeV7iDGC/lcgWY356QZe9DlbCuHWZsTQ8X9CJa0puDHRQQ7r7Ac50qalwSgT9NtEjoXoNoe5Ir0vYCpfFToHtYWWV8pQmRE96DrHgl8wXyECZvrF1OUtdL1xyrtT6lXyAEqEFgrBilu4JZW3PVfLlJSd69wK/JKaw/JfLv4uyS8MlWeMh2BIq03H5tUGesZelFM2zeOJgpLJJYJ3kYfM468Y5qf9eR2A7FU362Kuko4TpZwh5NLvcQ7O6zNMuS/qJgfXaXRKXUhHIDENq2amj5Selft2bFj7As1rlytdzaD7QzRZnBMiQDmwIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAHErgRW0yrpr0AAsCsJcHiLx20ML50NKJy0rvzFSS8fvwtvOlMAkUHJSmxp93HuDZB67t+ibVxHq6p5qju4yZS7cs6fP9uua2RYoKLnx05MgLuhvrPej5VGicNob8LTA+GlSjKrl09l8BKXUItPZmtxMdv0grD4Cq+NLELwyv3f0VE5oeo4bst9Om4BoeCgruCsJD530KP+5Z3PiOE6VRXaouIpAK9MGgVcBTNYlTHUXX4HPEYRgNWMtd6Qv+dfyOrIdHxM2bUgz7Bi9a4PdvbYXlz/NrSpVXd5Co7NjKe7TBxnlhYcjVXfxjtQbTNb0rbfdWDMCoQBxvTddlCHhJPk=","cancellation_requested":false,"status":"completed","target":"https://keyvault_name.vault.azure.net/certificates/recoverCertificateName-candisableacertificate-","request_id":"e37f677a9b354a139c378071673d6e13"}, [
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
  '83885339-b9c6-47a2-bcf3-849715854d56',
  'x-ms-keyvault-service-version',
  '1.1.5.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.233.72.51;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 27 May 2020 13:18:23 GMT',
  'Content-Length',
  '1303'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/recoverCertificateName-candisableacertificate-/')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/recoverCertificateName-candisableacertificate-/ca74d2a4dafa43209b004505f397e86a","kid":"https://keyvault_name.vault.azure.net/keys/recoverCertificateName-candisableacertificate-/ca74d2a4dafa43209b004505f397e86a","sid":"https://keyvault_name.vault.azure.net/secrets/recoverCertificateName-candisableacertificate-/ca74d2a4dafa43209b004505f397e86a","x5t":"rnjuw18TqWex92xvwqYfH71iC_o","cer":"MIIDKDCCAhCgAwIBAgIQf1JriRdtT4yQl2Am3+f8EDANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjAwNTI3MTMwODIxWhcNMjEwNTI3MTMxODIxWjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQC451rY9S/g44tJdSqLvri3nMpGXlryEV5XuIMYL+VyBZjfnpBl70OVsK4dZmxNDxf0IlrSm4MdFBDuvsBznSpqXBKBP020SOheg2h7kivS9gKl8VOge1hZZXylCZET3oOseCXzBfIQJm+sXU5S10vXHKu1PqVfIASoQWCsGKW7gllbc9V8uUlJ3r3Ar8kprD8l8u/i7JLwyVZ4yHYEirTcfm1QZ6xl6UUzbN44mCksklgneRh8zjrxjmp/15HYDsVTfrYq6SjhOlnCHk0u9xDs7rM0y5L+omB9dpdEpdSEcgMQ2rZqaPlJ6V+3ZsWPsCzWuXK13NoPtDNFmcEyJAObAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBQs86BZlbIcjpyRkpkYuEpRduV4WjAdBgNVHQ4EFgQULPOgWZWyHI6ckZKZGLhKUXbleFowDQYJKoZIhvcNAQELBQADggEBAKGu5VU7H9/108y+IgCcdtlaXjf67ljW1a5S2kIH91OKIU9ah2qHTI+lVI1DCSsSXlwsYVCFbPAXES/g7MSmFBU/7B1utZvcFjg3ZCpIOsl59RCqcO/tZFl9+DNgzY3k21FB6sK0H2ZmELoSYMrmy5FRFybNrQkJS4UrrjmLocFXAZMTKZfVjx+O+H7v9ttZ2YvfBCEc8xAuWybpdMMOMAElf9FA7wZjuEyWYkPbUXPXted0XRWcvu23iQirUXzOcCIFFMqEDlviZzGx5FYFS5BjkLhuTgZDZWRGCq2GEUpsaiOoTUYQS8apMQEj4fBaIaWKyjnveXbf4gcjKERyq/M=","attributes":{"enabled":true,"nbf":1590584901,"exp":1622121501,"created":1590585501,"updated":1590585501,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/recoverCertificateName-candisableacertificate-/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1590585482,"updated":1590585482}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/recoverCertificateName-candisableacertificate-/pending"}}, [
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
  '7559b87e-4e43-4290-9108-8e8b18dc6272',
  'x-ms-keyvault-service-version',
  '1.1.5.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.233.72.51;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 27 May 2020 13:18:23 GMT',
  'Content-Length',
  '2580'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .patch('/certificates/recoverCertificateName-candisableacertificate-/', {"attributes":{"enabled":false}})
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/recoverCertificateName-candisableacertificate-/ca74d2a4dafa43209b004505f397e86a","kid":"https://keyvault_name.vault.azure.net/keys/recoverCertificateName-candisableacertificate-/ca74d2a4dafa43209b004505f397e86a","sid":"https://keyvault_name.vault.azure.net/secrets/recoverCertificateName-candisableacertificate-/ca74d2a4dafa43209b004505f397e86a","x5t":"rnjuw18TqWex92xvwqYfH71iC_o","cer":"MIIDKDCCAhCgAwIBAgIQf1JriRdtT4yQl2Am3+f8EDANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjAwNTI3MTMwODIxWhcNMjEwNTI3MTMxODIxWjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQC451rY9S/g44tJdSqLvri3nMpGXlryEV5XuIMYL+VyBZjfnpBl70OVsK4dZmxNDxf0IlrSm4MdFBDuvsBznSpqXBKBP020SOheg2h7kivS9gKl8VOge1hZZXylCZET3oOseCXzBfIQJm+sXU5S10vXHKu1PqVfIASoQWCsGKW7gllbc9V8uUlJ3r3Ar8kprD8l8u/i7JLwyVZ4yHYEirTcfm1QZ6xl6UUzbN44mCksklgneRh8zjrxjmp/15HYDsVTfrYq6SjhOlnCHk0u9xDs7rM0y5L+omB9dpdEpdSEcgMQ2rZqaPlJ6V+3ZsWPsCzWuXK13NoPtDNFmcEyJAObAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBQs86BZlbIcjpyRkpkYuEpRduV4WjAdBgNVHQ4EFgQULPOgWZWyHI6ckZKZGLhKUXbleFowDQYJKoZIhvcNAQELBQADggEBAKGu5VU7H9/108y+IgCcdtlaXjf67ljW1a5S2kIH91OKIU9ah2qHTI+lVI1DCSsSXlwsYVCFbPAXES/g7MSmFBU/7B1utZvcFjg3ZCpIOsl59RCqcO/tZFl9+DNgzY3k21FB6sK0H2ZmELoSYMrmy5FRFybNrQkJS4UrrjmLocFXAZMTKZfVjx+O+H7v9ttZ2YvfBCEc8xAuWybpdMMOMAElf9FA7wZjuEyWYkPbUXPXted0XRWcvu23iQirUXzOcCIFFMqEDlviZzGx5FYFS5BjkLhuTgZDZWRGCq2GEUpsaiOoTUYQS8apMQEj4fBaIaWKyjnveXbf4gcjKERyq/M=","attributes":{"enabled":false,"nbf":1590584901,"exp":1622121501,"created":1590585501,"updated":1590585503,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/recoverCertificateName-candisableacertificate-/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1590585482,"updated":1590585482}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/recoverCertificateName-candisableacertificate-/pending"}}, [
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
  '10e1720c-a461-49b6-b9ec-8fc37a1e0e7c',
  'x-ms-keyvault-service-version',
  '1.1.5.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.233.72.51;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 27 May 2020 13:18:23 GMT',
  'Content-Length',
  '2581'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/recoverCertificateName-candisableacertificate-/')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/recoverCertificateName-candisableacertificate-/ca74d2a4dafa43209b004505f397e86a","kid":"https://keyvault_name.vault.azure.net/keys/recoverCertificateName-candisableacertificate-/ca74d2a4dafa43209b004505f397e86a","sid":"https://keyvault_name.vault.azure.net/secrets/recoverCertificateName-candisableacertificate-/ca74d2a4dafa43209b004505f397e86a","x5t":"rnjuw18TqWex92xvwqYfH71iC_o","cer":"MIIDKDCCAhCgAwIBAgIQf1JriRdtT4yQl2Am3+f8EDANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjAwNTI3MTMwODIxWhcNMjEwNTI3MTMxODIxWjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQC451rY9S/g44tJdSqLvri3nMpGXlryEV5XuIMYL+VyBZjfnpBl70OVsK4dZmxNDxf0IlrSm4MdFBDuvsBznSpqXBKBP020SOheg2h7kivS9gKl8VOge1hZZXylCZET3oOseCXzBfIQJm+sXU5S10vXHKu1PqVfIASoQWCsGKW7gllbc9V8uUlJ3r3Ar8kprD8l8u/i7JLwyVZ4yHYEirTcfm1QZ6xl6UUzbN44mCksklgneRh8zjrxjmp/15HYDsVTfrYq6SjhOlnCHk0u9xDs7rM0y5L+omB9dpdEpdSEcgMQ2rZqaPlJ6V+3ZsWPsCzWuXK13NoPtDNFmcEyJAObAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBQs86BZlbIcjpyRkpkYuEpRduV4WjAdBgNVHQ4EFgQULPOgWZWyHI6ckZKZGLhKUXbleFowDQYJKoZIhvcNAQELBQADggEBAKGu5VU7H9/108y+IgCcdtlaXjf67ljW1a5S2kIH91OKIU9ah2qHTI+lVI1DCSsSXlwsYVCFbPAXES/g7MSmFBU/7B1utZvcFjg3ZCpIOsl59RCqcO/tZFl9+DNgzY3k21FB6sK0H2ZmELoSYMrmy5FRFybNrQkJS4UrrjmLocFXAZMTKZfVjx+O+H7v9ttZ2YvfBCEc8xAuWybpdMMOMAElf9FA7wZjuEyWYkPbUXPXted0XRWcvu23iQirUXzOcCIFFMqEDlviZzGx5FYFS5BjkLhuTgZDZWRGCq2GEUpsaiOoTUYQS8apMQEj4fBaIaWKyjnveXbf4gcjKERyq/M=","attributes":{"enabled":false,"nbf":1590584901,"exp":1622121501,"created":1590585501,"updated":1590585503,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/recoverCertificateName-candisableacertificate-/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1590585482,"updated":1590585482}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/recoverCertificateName-candisableacertificate-/pending"}}, [
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
  'ac930158-5105-4a85-9850-f32425f61eb8',
  'x-ms-keyvault-service-version',
  '1.1.5.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.233.72.51;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 27 May 2020 13:18:23 GMT',
  'Content-Length',
  '2581'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/certificates/recoverCertificateName-candisableacertificate-')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/recoverCertificateName-candisableacertificate-","deletedDate":1590585503,"scheduledPurgeDate":1598361503,"id":"https://keyvault_name.vault.azure.net/certificates/recoverCertificateName-candisableacertificate-/ca74d2a4dafa43209b004505f397e86a","kid":"https://keyvault_name.vault.azure.net/keys/recoverCertificateName-candisableacertificate-/ca74d2a4dafa43209b004505f397e86a","sid":"https://keyvault_name.vault.azure.net/secrets/recoverCertificateName-candisableacertificate-/ca74d2a4dafa43209b004505f397e86a","x5t":"rnjuw18TqWex92xvwqYfH71iC_o","cer":"MIIDKDCCAhCgAwIBAgIQf1JriRdtT4yQl2Am3+f8EDANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjAwNTI3MTMwODIxWhcNMjEwNTI3MTMxODIxWjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQC451rY9S/g44tJdSqLvri3nMpGXlryEV5XuIMYL+VyBZjfnpBl70OVsK4dZmxNDxf0IlrSm4MdFBDuvsBznSpqXBKBP020SOheg2h7kivS9gKl8VOge1hZZXylCZET3oOseCXzBfIQJm+sXU5S10vXHKu1PqVfIASoQWCsGKW7gllbc9V8uUlJ3r3Ar8kprD8l8u/i7JLwyVZ4yHYEirTcfm1QZ6xl6UUzbN44mCksklgneRh8zjrxjmp/15HYDsVTfrYq6SjhOlnCHk0u9xDs7rM0y5L+omB9dpdEpdSEcgMQ2rZqaPlJ6V+3ZsWPsCzWuXK13NoPtDNFmcEyJAObAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBQs86BZlbIcjpyRkpkYuEpRduV4WjAdBgNVHQ4EFgQULPOgWZWyHI6ckZKZGLhKUXbleFowDQYJKoZIhvcNAQELBQADggEBAKGu5VU7H9/108y+IgCcdtlaXjf67ljW1a5S2kIH91OKIU9ah2qHTI+lVI1DCSsSXlwsYVCFbPAXES/g7MSmFBU/7B1utZvcFjg3ZCpIOsl59RCqcO/tZFl9+DNgzY3k21FB6sK0H2ZmELoSYMrmy5FRFybNrQkJS4UrrjmLocFXAZMTKZfVjx+O+H7v9ttZ2YvfBCEc8xAuWybpdMMOMAElf9FA7wZjuEyWYkPbUXPXted0XRWcvu23iQirUXzOcCIFFMqEDlviZzGx5FYFS5BjkLhuTgZDZWRGCq2GEUpsaiOoTUYQS8apMQEj4fBaIaWKyjnveXbf4gcjKERyq/M=","attributes":{"enabled":false,"nbf":1590584901,"exp":1622121501,"created":1590585501,"updated":1590585503,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/recoverCertificateName-candisableacertificate-/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1590585482,"updated":1590585482}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/recoverCertificateName-candisableacertificate-/pending"}}, [
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
  '8884925d-7149-48f3-8fe5-b79ee2b6a224',
  'x-ms-keyvault-service-version',
  '1.1.5.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.233.72.51;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 27 May 2020 13:18:23 GMT',
  'Content-Length',
  '2779'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/recoverCertificateName-candisableacertificate-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: recoverCertificateName-candisableacertificate-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '146',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '32137119-7da2-4851-b1ec-a5f90d2f6ab3',
  'x-ms-keyvault-service-version',
  '1.1.5.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.233.72.51;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 27 May 2020 13:18:23 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/recoverCertificateName-candisableacertificate-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: recoverCertificateName-candisableacertificate-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '146',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '2e8df743-c46f-4ad7-909d-3ed8c21238cf',
  'x-ms-keyvault-service-version',
  '1.1.5.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.233.72.51;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 27 May 2020 13:18:23 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/recoverCertificateName-candisableacertificate-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: recoverCertificateName-candisableacertificate-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '146',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '6e2e2cb5-a722-4e9e-8904-24401ae1cf55',
  'x-ms-keyvault-service-version',
  '1.1.5.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.233.72.51;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 27 May 2020 13:18:25 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/recoverCertificateName-candisableacertificate-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: recoverCertificateName-candisableacertificate-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '146',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '1c7fbf97-8bcc-4cff-9e37-6ff3e74530d7',
  'x-ms-keyvault-service-version',
  '1.1.5.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.233.72.51;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 27 May 2020 13:18:27 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/recoverCertificateName-candisableacertificate-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: recoverCertificateName-candisableacertificate-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '146',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '856a47a6-77e9-406e-9555-2f447fe4ed07',
  'x-ms-keyvault-service-version',
  '1.1.5.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.233.72.51;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 27 May 2020 13:18:29 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/recoverCertificateName-candisableacertificate-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: recoverCertificateName-candisableacertificate-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '146',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '1ae6a15e-2b7b-441a-a5ca-85861eafcda9',
  'x-ms-keyvault-service-version',
  '1.1.5.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.233.72.51;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 27 May 2020 13:18:31 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/recoverCertificateName-candisableacertificate-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: recoverCertificateName-candisableacertificate-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '146',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '6bb142ec-b128-4876-ad47-f3249aadbd4c',
  'x-ms-keyvault-service-version',
  '1.1.5.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.233.72.51;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 27 May 2020 13:18:33 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/recoverCertificateName-candisableacertificate-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: recoverCertificateName-candisableacertificate-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '146',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '33680e76-4a65-49ec-84a6-635ed64fcc6f',
  'x-ms-keyvault-service-version',
  '1.1.5.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.233.72.51;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 27 May 2020 13:18:35 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/recoverCertificateName-candisableacertificate-')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/recoverCertificateName-candisableacertificate-","deletedDate":1590585503,"scheduledPurgeDate":1598361503,"id":"https://keyvault_name.vault.azure.net/certificates/recoverCertificateName-candisableacertificate-/ca74d2a4dafa43209b004505f397e86a","kid":"https://keyvault_name.vault.azure.net/keys/recoverCertificateName-candisableacertificate-/ca74d2a4dafa43209b004505f397e86a","sid":"https://keyvault_name.vault.azure.net/secrets/recoverCertificateName-candisableacertificate-/ca74d2a4dafa43209b004505f397e86a","x5t":"rnjuw18TqWex92xvwqYfH71iC_o","cer":"MIIDKDCCAhCgAwIBAgIQf1JriRdtT4yQl2Am3+f8EDANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjAwNTI3MTMwODIxWhcNMjEwNTI3MTMxODIxWjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQC451rY9S/g44tJdSqLvri3nMpGXlryEV5XuIMYL+VyBZjfnpBl70OVsK4dZmxNDxf0IlrSm4MdFBDuvsBznSpqXBKBP020SOheg2h7kivS9gKl8VOge1hZZXylCZET3oOseCXzBfIQJm+sXU5S10vXHKu1PqVfIASoQWCsGKW7gllbc9V8uUlJ3r3Ar8kprD8l8u/i7JLwyVZ4yHYEirTcfm1QZ6xl6UUzbN44mCksklgneRh8zjrxjmp/15HYDsVTfrYq6SjhOlnCHk0u9xDs7rM0y5L+omB9dpdEpdSEcgMQ2rZqaPlJ6V+3ZsWPsCzWuXK13NoPtDNFmcEyJAObAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBQs86BZlbIcjpyRkpkYuEpRduV4WjAdBgNVHQ4EFgQULPOgWZWyHI6ckZKZGLhKUXbleFowDQYJKoZIhvcNAQELBQADggEBAKGu5VU7H9/108y+IgCcdtlaXjf67ljW1a5S2kIH91OKIU9ah2qHTI+lVI1DCSsSXlwsYVCFbPAXES/g7MSmFBU/7B1utZvcFjg3ZCpIOsl59RCqcO/tZFl9+DNgzY3k21FB6sK0H2ZmELoSYMrmy5FRFybNrQkJS4UrrjmLocFXAZMTKZfVjx+O+H7v9ttZ2YvfBCEc8xAuWybpdMMOMAElf9FA7wZjuEyWYkPbUXPXted0XRWcvu23iQirUXzOcCIFFMqEDlviZzGx5FYFS5BjkLhuTgZDZWRGCq2GEUpsaiOoTUYQS8apMQEj4fBaIaWKyjnveXbf4gcjKERyq/M=","attributes":{"enabled":false,"nbf":1590584901,"exp":1622121501,"created":1590585501,"updated":1590585503,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/recoverCertificateName-candisableacertificate-/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1590585482,"updated":1590585482}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/recoverCertificateName-candisableacertificate-/pending"}}, [
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
  'a033ff8c-de45-4f64-8fcf-154a6cd8c06d',
  'x-ms-keyvault-service-version',
  '1.1.5.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.233.72.51;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 27 May 2020 13:18:38 GMT',
  'Content-Length',
  '2779'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedcertificates/recoverCertificateName-candisableacertificate-')
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
  'ab80d433-f499-4203-bbda-6710444c2019',
  'x-ms-keyvault-service-version',
  '1.1.5.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.233.72.51;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 27 May 2020 13:18:38 GMT'
]);

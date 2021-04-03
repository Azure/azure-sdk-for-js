let nock = require('nock');

module.exports.hash = "3a6078c3adce2770d137d15a9a56b267";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/certificates/CRUDCertificateName-cangetacertificatessecretinPKCS12format-/create')
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
  '0c470553-a6c8-4096-b19a-25450d2db7e0',
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
  'Tue, 16 Feb 2021 18:57:55 GMT'
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
  'e8b47690-2ac1-4fd6-9e99-5c92d1a7f300',
  'x-ms-ests-server',
  '2.1.11496.5 - SCUS ProdSlices',
  'Set-Cookie',
  'fpc=AufoSEQpIbxLjzJaYLa_pBMA4qsDCAAAACEMvtcOAAAA; expires=Thu, 18-Mar-2021 18:57:56 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 16 Feb 2021 18:57:56 GMT',
  'Content-Length',
  '1315'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/certificates/CRUDCertificateName-cangetacertificatessecretinPKCS12format-/create', {"policy":{"key_props":{},"secret_props":{},"x509_props":{"subject":"cn=MyCert","sans":{}},"issuer":{"name":"Self"},"attributes":{}},"attributes":{}})
  .query(true)
  .reply(202, {"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-cangetacertificatessecretinPKCS12format-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAoO3A5wgI/kOE/nVPqefZu4Y1LwD6m33UzouJQP1WuMFv6hd6IM3hBOUSrS2VJMWQynm+3ppwttOWi356o55E9w8uYukqXo7AE79VEm3jGGUKlcVkgJqaPlw0p16YhWDt1e32NLRAPjE1BjFwwRJuhWqXOeqTcWWsdyKulKYL+JvRh5TXotKm0bTsbkKiO0pwaP+5q0yByeiL5kgQdIHDujEGCw1V++fNbI0o7ZPhrLp+sa7EeldxKh+jvFafTpd8LVqR+y5fP8Q79QRdtEdNZlT/Z9lp8B/WI6JOWGtHKuwRFjr/e2K4t7M3wamWCg5xKhh0y1y8NyKBEjZATbfIFQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAIdbjFVcD37eArJt4XfqyvqsIOettv9kk95DbWFFEPGUQtJsuuZkQM0/nyyXR8fkoxKOZ8PpbUwPPQg0BTDZ9WiU34UdHVTamp4CLBU6RNbyowe1iK1/axynfJq35cF0QJpsMYjgHEDZ+F/Kf187rYLBm3wg9R31BwwfGEm6dcQz+SNmBclE/8UtzsXcWg5XT5t3XSCKEqUNkQq1JewqEZQ0y5iTwk0wkEAUEsmrcCMiJ4V+SoX1MWIoInMrIdImBEgH4w7oN5K++ot6R3XISlVYhcJ/3HP7Rx+wSsmrjGZ7Yl4YOnV5vNLRCM8drwknT9hp5MKNBdz8PIB9zG32/SE=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"2cc037ed9f4a4d0db2a201db4b8a45ab"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-cangetacertificatessecretinPKCS12format-/pending?api-version=7.2&request_id=2cc037ed9f4a4d0db2a201db4b8a45ab',
  'Retry-After',
  '10',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  'c22bf8ff-eb76-4633-9a5f-16eda339e34b',
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
  'Tue, 16 Feb 2021 18:57:56 GMT',
  'Content-Length',
  '1343'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/CRUDCertificateName-cangetacertificatessecretinPKCS12format-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-cangetacertificatessecretinPKCS12format-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAoO3A5wgI/kOE/nVPqefZu4Y1LwD6m33UzouJQP1WuMFv6hd6IM3hBOUSrS2VJMWQynm+3ppwttOWi356o55E9w8uYukqXo7AE79VEm3jGGUKlcVkgJqaPlw0p16YhWDt1e32NLRAPjE1BjFwwRJuhWqXOeqTcWWsdyKulKYL+JvRh5TXotKm0bTsbkKiO0pwaP+5q0yByeiL5kgQdIHDujEGCw1V++fNbI0o7ZPhrLp+sa7EeldxKh+jvFafTpd8LVqR+y5fP8Q79QRdtEdNZlT/Z9lp8B/WI6JOWGtHKuwRFjr/e2K4t7M3wamWCg5xKhh0y1y8NyKBEjZATbfIFQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAIdbjFVcD37eArJt4XfqyvqsIOettv9kk95DbWFFEPGUQtJsuuZkQM0/nyyXR8fkoxKOZ8PpbUwPPQg0BTDZ9WiU34UdHVTamp4CLBU6RNbyowe1iK1/axynfJq35cF0QJpsMYjgHEDZ+F/Kf187rYLBm3wg9R31BwwfGEm6dcQz+SNmBclE/8UtzsXcWg5XT5t3XSCKEqUNkQq1JewqEZQ0y5iTwk0wkEAUEsmrcCMiJ4V+SoX1MWIoInMrIdImBEgH4w7oN5K++ot6R3XISlVYhcJ/3HP7Rx+wSsmrjGZ7Yl4YOnV5vNLRCM8drwknT9hp5MKNBdz8PIB9zG32/SE=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"2cc037ed9f4a4d0db2a201db4b8a45ab"}, [
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
  '4fd6e094-1e9a-43e2-aa30-1c6ba999d1ba',
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
  'Tue, 16 Feb 2021 18:57:56 GMT',
  'Content-Length',
  '1343'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/CRUDCertificateName-cangetacertificatessecretinPKCS12format-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-cangetacertificatessecretinPKCS12format-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAoO3A5wgI/kOE/nVPqefZu4Y1LwD6m33UzouJQP1WuMFv6hd6IM3hBOUSrS2VJMWQynm+3ppwttOWi356o55E9w8uYukqXo7AE79VEm3jGGUKlcVkgJqaPlw0p16YhWDt1e32NLRAPjE1BjFwwRJuhWqXOeqTcWWsdyKulKYL+JvRh5TXotKm0bTsbkKiO0pwaP+5q0yByeiL5kgQdIHDujEGCw1V++fNbI0o7ZPhrLp+sa7EeldxKh+jvFafTpd8LVqR+y5fP8Q79QRdtEdNZlT/Z9lp8B/WI6JOWGtHKuwRFjr/e2K4t7M3wamWCg5xKhh0y1y8NyKBEjZATbfIFQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAIdbjFVcD37eArJt4XfqyvqsIOettv9kk95DbWFFEPGUQtJsuuZkQM0/nyyXR8fkoxKOZ8PpbUwPPQg0BTDZ9WiU34UdHVTamp4CLBU6RNbyowe1iK1/axynfJq35cF0QJpsMYjgHEDZ+F/Kf187rYLBm3wg9R31BwwfGEm6dcQz+SNmBclE/8UtzsXcWg5XT5t3XSCKEqUNkQq1JewqEZQ0y5iTwk0wkEAUEsmrcCMiJ4V+SoX1MWIoInMrIdImBEgH4w7oN5K++ot6R3XISlVYhcJ/3HP7Rx+wSsmrjGZ7Yl4YOnV5vNLRCM8drwknT9hp5MKNBdz8PIB9zG32/SE=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"2cc037ed9f4a4d0db2a201db4b8a45ab"}, [
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
  '820611af-ca94-4ccc-af5d-607611d9bce7',
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
  'Tue, 16 Feb 2021 18:57:56 GMT',
  'Content-Length',
  '1343'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/CRUDCertificateName-cangetacertificatessecretinPKCS12format-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-cangetacertificatessecretinPKCS12format-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAoO3A5wgI/kOE/nVPqefZu4Y1LwD6m33UzouJQP1WuMFv6hd6IM3hBOUSrS2VJMWQynm+3ppwttOWi356o55E9w8uYukqXo7AE79VEm3jGGUKlcVkgJqaPlw0p16YhWDt1e32NLRAPjE1BjFwwRJuhWqXOeqTcWWsdyKulKYL+JvRh5TXotKm0bTsbkKiO0pwaP+5q0yByeiL5kgQdIHDujEGCw1V++fNbI0o7ZPhrLp+sa7EeldxKh+jvFafTpd8LVqR+y5fP8Q79QRdtEdNZlT/Z9lp8B/WI6JOWGtHKuwRFjr/e2K4t7M3wamWCg5xKhh0y1y8NyKBEjZATbfIFQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAIdbjFVcD37eArJt4XfqyvqsIOettv9kk95DbWFFEPGUQtJsuuZkQM0/nyyXR8fkoxKOZ8PpbUwPPQg0BTDZ9WiU34UdHVTamp4CLBU6RNbyowe1iK1/axynfJq35cF0QJpsMYjgHEDZ+F/Kf187rYLBm3wg9R31BwwfGEm6dcQz+SNmBclE/8UtzsXcWg5XT5t3XSCKEqUNkQq1JewqEZQ0y5iTwk0wkEAUEsmrcCMiJ4V+SoX1MWIoInMrIdImBEgH4w7oN5K++ot6R3XISlVYhcJ/3HP7Rx+wSsmrjGZ7Yl4YOnV5vNLRCM8drwknT9hp5MKNBdz8PIB9zG32/SE=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"2cc037ed9f4a4d0db2a201db4b8a45ab"}, [
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
  'ea1234d3-c545-4c80-8527-57ab57cdcebf',
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
  'Tue, 16 Feb 2021 18:57:59 GMT',
  'Content-Length',
  '1343'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/CRUDCertificateName-cangetacertificatessecretinPKCS12format-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-cangetacertificatessecretinPKCS12format-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAoO3A5wgI/kOE/nVPqefZu4Y1LwD6m33UzouJQP1WuMFv6hd6IM3hBOUSrS2VJMWQynm+3ppwttOWi356o55E9w8uYukqXo7AE79VEm3jGGUKlcVkgJqaPlw0p16YhWDt1e32NLRAPjE1BjFwwRJuhWqXOeqTcWWsdyKulKYL+JvRh5TXotKm0bTsbkKiO0pwaP+5q0yByeiL5kgQdIHDujEGCw1V++fNbI0o7ZPhrLp+sa7EeldxKh+jvFafTpd8LVqR+y5fP8Q79QRdtEdNZlT/Z9lp8B/WI6JOWGtHKuwRFjr/e2K4t7M3wamWCg5xKhh0y1y8NyKBEjZATbfIFQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAIdbjFVcD37eArJt4XfqyvqsIOettv9kk95DbWFFEPGUQtJsuuZkQM0/nyyXR8fkoxKOZ8PpbUwPPQg0BTDZ9WiU34UdHVTamp4CLBU6RNbyowe1iK1/axynfJq35cF0QJpsMYjgHEDZ+F/Kf187rYLBm3wg9R31BwwfGEm6dcQz+SNmBclE/8UtzsXcWg5XT5t3XSCKEqUNkQq1JewqEZQ0y5iTwk0wkEAUEsmrcCMiJ4V+SoX1MWIoInMrIdImBEgH4w7oN5K++ot6R3XISlVYhcJ/3HP7Rx+wSsmrjGZ7Yl4YOnV5vNLRCM8drwknT9hp5MKNBdz8PIB9zG32/SE=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"2cc037ed9f4a4d0db2a201db4b8a45ab"}, [
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
  'd191e8c2-1e0c-41da-999f-c3bd7e9557f4',
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
  'Tue, 16 Feb 2021 18:58:01 GMT',
  'Content-Length',
  '1343'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/CRUDCertificateName-cangetacertificatessecretinPKCS12format-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-cangetacertificatessecretinPKCS12format-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAoO3A5wgI/kOE/nVPqefZu4Y1LwD6m33UzouJQP1WuMFv6hd6IM3hBOUSrS2VJMWQynm+3ppwttOWi356o55E9w8uYukqXo7AE79VEm3jGGUKlcVkgJqaPlw0p16YhWDt1e32NLRAPjE1BjFwwRJuhWqXOeqTcWWsdyKulKYL+JvRh5TXotKm0bTsbkKiO0pwaP+5q0yByeiL5kgQdIHDujEGCw1V++fNbI0o7ZPhrLp+sa7EeldxKh+jvFafTpd8LVqR+y5fP8Q79QRdtEdNZlT/Z9lp8B/WI6JOWGtHKuwRFjr/e2K4t7M3wamWCg5xKhh0y1y8NyKBEjZATbfIFQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAIdbjFVcD37eArJt4XfqyvqsIOettv9kk95DbWFFEPGUQtJsuuZkQM0/nyyXR8fkoxKOZ8PpbUwPPQg0BTDZ9WiU34UdHVTamp4CLBU6RNbyowe1iK1/axynfJq35cF0QJpsMYjgHEDZ+F/Kf187rYLBm3wg9R31BwwfGEm6dcQz+SNmBclE/8UtzsXcWg5XT5t3XSCKEqUNkQq1JewqEZQ0y5iTwk0wkEAUEsmrcCMiJ4V+SoX1MWIoInMrIdImBEgH4w7oN5K++ot6R3XISlVYhcJ/3HP7Rx+wSsmrjGZ7Yl4YOnV5vNLRCM8drwknT9hp5MKNBdz8PIB9zG32/SE=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"2cc037ed9f4a4d0db2a201db4b8a45ab"}, [
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
  '7e9830de-04d3-4140-9b18-26853255fdb8',
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
  'Tue, 16 Feb 2021 18:58:03 GMT',
  'Content-Length',
  '1343'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/CRUDCertificateName-cangetacertificatessecretinPKCS12format-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-cangetacertificatessecretinPKCS12format-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAoO3A5wgI/kOE/nVPqefZu4Y1LwD6m33UzouJQP1WuMFv6hd6IM3hBOUSrS2VJMWQynm+3ppwttOWi356o55E9w8uYukqXo7AE79VEm3jGGUKlcVkgJqaPlw0p16YhWDt1e32NLRAPjE1BjFwwRJuhWqXOeqTcWWsdyKulKYL+JvRh5TXotKm0bTsbkKiO0pwaP+5q0yByeiL5kgQdIHDujEGCw1V++fNbI0o7ZPhrLp+sa7EeldxKh+jvFafTpd8LVqR+y5fP8Q79QRdtEdNZlT/Z9lp8B/WI6JOWGtHKuwRFjr/e2K4t7M3wamWCg5xKhh0y1y8NyKBEjZATbfIFQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAIdbjFVcD37eArJt4XfqyvqsIOettv9kk95DbWFFEPGUQtJsuuZkQM0/nyyXR8fkoxKOZ8PpbUwPPQg0BTDZ9WiU34UdHVTamp4CLBU6RNbyowe1iK1/axynfJq35cF0QJpsMYjgHEDZ+F/Kf187rYLBm3wg9R31BwwfGEm6dcQz+SNmBclE/8UtzsXcWg5XT5t3XSCKEqUNkQq1JewqEZQ0y5iTwk0wkEAUEsmrcCMiJ4V+SoX1MWIoInMrIdImBEgH4w7oN5K++ot6R3XISlVYhcJ/3HP7Rx+wSsmrjGZ7Yl4YOnV5vNLRCM8drwknT9hp5MKNBdz8PIB9zG32/SE=","cancellation_requested":false,"status":"completed","target":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-cangetacertificatessecretinPKCS12format-","request_id":"2cc037ed9f4a4d0db2a201db4b8a45ab"}, [
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
  '4cd90e61-eba5-4a71-9623-2fdf9d90ca39',
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
  'Tue, 16 Feb 2021 18:58:04 GMT',
  'Content-Length',
  '1313'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/CRUDCertificateName-cangetacertificatessecretinPKCS12format-/')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-cangetacertificatessecretinPKCS12format-/ca256f81a079427485e0e5d11c666b7f","kid":"https://keyvault_name.vault.azure.net/keys/CRUDCertificateName-cangetacertificatessecretinPKCS12format-/ca256f81a079427485e0e5d11c666b7f","sid":"https://keyvault_name.vault.azure.net/secrets/CRUDCertificateName-cangetacertificatessecretinPKCS12format-/ca256f81a079427485e0e5d11c666b7f","x5t":"exGrAOJoqZKtS_kCGzpVObmKXEQ","cer":"MIIDKDCCAhCgAwIBAgIQVg2KFak/T/u3EzxrkfZdhDANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjEwMjE2MTg0ODA0WhcNMjIwMjE2MTg1ODA0WjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQCg7cDnCAj+Q4T+dU+p59m7hjUvAPqbfdTOi4lA/Va4wW/qF3ogzeEE5RKtLZUkxZDKeb7emnC205aLfnqjnkT3Dy5i6SpejsATv1USbeMYZQqVxWSAmpo+XDSnXpiFYO3V7fY0tEA+MTUGMXDBEm6Fapc56pNxZax3Iq6Upgv4m9GHlNei0qbRtOxuQqI7SnBo/7mrTIHJ6IvmSBB0gcO6MQYLDVX7581sjSjtk+Gsun6xrsR6V3EqH6O8Vp9Ol3wtWpH7Ll8/xDv1BF20R01mVP9n2WnwH9Yjok5Ya0cq7BEWOv97Yri3szfBqZYKDnEqGHTLXLw3IoESNkBNt8gVAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBTTgquiPF/l9Pu+YFo15vOM3NODbDAdBgNVHQ4EFgQU04Krojxf5fT7vmBaNebzjNzTg2wwDQYJKoZIhvcNAQELBQADggEBADzmFIyLxfEW23l0ix0pWn1hzeWYSvj5aW5K1Q9Fgq17psNw7Y3U1F/zxJKySb5F8fFZ7/c4f1zmaJDWw50APpECdRycazVmMyJfQB8UQZooDCRzRSkJjTOJRfz9pjWsMUL5P8O9EF2ODWFdaKP8j7zJvw5LX7KrJd4uyZp4QX78GUiWY0QDAneS53nBerDwKAKPxzXMHA9DXup5JaABPU6cnMJhQGYH53KLRPiLdF27cmirzwPOsfh6UqcGNj9bX8M/+Mi+8j5/8NqHxn/0BCrnifOvWj80dvkz0FpHZDfXj4M7lIovZJ5tNiDmQaTbbGxaXevZtpiPGRQ85wWoqfA=","attributes":{"enabled":true,"nbf":1613501284,"exp":1645037884,"created":1613501884,"updated":1613501884,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-cangetacertificatessecretinPKCS12format-/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1613501876,"updated":1613501876}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-cangetacertificatessecretinPKCS12format-/pending"}}, [
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
  '3283ae53-a05e-42c9-b42a-032926426fb8',
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
  'Tue, 16 Feb 2021 18:58:05 GMT',
  'Content-Length',
  '2614'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/CRUDCertificateName-cangetacertificatessecretinPKCS12format-/')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-cangetacertificatessecretinPKCS12format-/ca256f81a079427485e0e5d11c666b7f","kid":"https://keyvault_name.vault.azure.net/keys/CRUDCertificateName-cangetacertificatessecretinPKCS12format-/ca256f81a079427485e0e5d11c666b7f","sid":"https://keyvault_name.vault.azure.net/secrets/CRUDCertificateName-cangetacertificatessecretinPKCS12format-/ca256f81a079427485e0e5d11c666b7f","x5t":"exGrAOJoqZKtS_kCGzpVObmKXEQ","cer":"MIIDKDCCAhCgAwIBAgIQVg2KFak/T/u3EzxrkfZdhDANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjEwMjE2MTg0ODA0WhcNMjIwMjE2MTg1ODA0WjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQCg7cDnCAj+Q4T+dU+p59m7hjUvAPqbfdTOi4lA/Va4wW/qF3ogzeEE5RKtLZUkxZDKeb7emnC205aLfnqjnkT3Dy5i6SpejsATv1USbeMYZQqVxWSAmpo+XDSnXpiFYO3V7fY0tEA+MTUGMXDBEm6Fapc56pNxZax3Iq6Upgv4m9GHlNei0qbRtOxuQqI7SnBo/7mrTIHJ6IvmSBB0gcO6MQYLDVX7581sjSjtk+Gsun6xrsR6V3EqH6O8Vp9Ol3wtWpH7Ll8/xDv1BF20R01mVP9n2WnwH9Yjok5Ya0cq7BEWOv97Yri3szfBqZYKDnEqGHTLXLw3IoESNkBNt8gVAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBTTgquiPF/l9Pu+YFo15vOM3NODbDAdBgNVHQ4EFgQU04Krojxf5fT7vmBaNebzjNzTg2wwDQYJKoZIhvcNAQELBQADggEBADzmFIyLxfEW23l0ix0pWn1hzeWYSvj5aW5K1Q9Fgq17psNw7Y3U1F/zxJKySb5F8fFZ7/c4f1zmaJDWw50APpECdRycazVmMyJfQB8UQZooDCRzRSkJjTOJRfz9pjWsMUL5P8O9EF2ODWFdaKP8j7zJvw5LX7KrJd4uyZp4QX78GUiWY0QDAneS53nBerDwKAKPxzXMHA9DXup5JaABPU6cnMJhQGYH53KLRPiLdF27cmirzwPOsfh6UqcGNj9bX8M/+Mi+8j5/8NqHxn/0BCrnifOvWj80dvkz0FpHZDfXj4M7lIovZJ5tNiDmQaTbbGxaXevZtpiPGRQ85wWoqfA=","attributes":{"enabled":true,"nbf":1613501284,"exp":1645037884,"created":1613501884,"updated":1613501884,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-cangetacertificatessecretinPKCS12format-/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1613501876,"updated":1613501876}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-cangetacertificatessecretinPKCS12format-/pending"}}, [
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
  'ac8913d2-63df-4fdd-9493-18fdc0581255',
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
  'Tue, 16 Feb 2021 18:58:05 GMT',
  'Content-Length',
  '2614'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/secrets/CRUDCertificateName-cangetacertificatessecretinPKCS12format-/')
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
  'f7dc77d3-fb62-42b3-b284-82ea6984cfc4',
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
  'Tue, 16 Feb 2021 18:58:05 GMT'
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
  'caf585ad-77b7-4c82-877d-a5cf39fbfd00',
  'x-ms-ests-server',
  '2.1.11496.5 - SCUS ProdSlices',
  'Set-Cookie',
  'fpc=AufoSEQpIbxLjzJaYLa_pBMA4qsDCQAAACEMvtcOAAAA; expires=Thu, 18-Mar-2021 18:58:05 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 16 Feb 2021 18:58:05 GMT',
  'Content-Length',
  '1315'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/secrets/CRUDCertificateName-cangetacertificatessecretinPKCS12format-/')
  .query(true)
  .reply(200, {"value":"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","contentType":"application/x-pkcs12","id":"https://keyvault_name.vault.azure.net/secrets/CRUDCertificateName-cangetacertificatessecretinPKCS12format-/ca256f81a079427485e0e5d11c666b7f","managed":true,"attributes":{"enabled":true,"nbf":1613501284,"exp":1645037884,"created":1613501884,"updated":1613501884,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7},"kid":"https://keyvault_name.vault.azure.net/keys/CRUDCertificateName-cangetacertificatessecretinPKCS12format-/ca256f81a079427485e0e5d11c666b7f"}, [
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
  '32886431-b152-486d-a641-7f13153914d7',
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
  'Tue, 16 Feb 2021 18:58:05 GMT',
  'Content-Length',
  '4052'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/certificates/CRUDCertificateName-cangetacertificatessecretinPKCS12format-')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/CRUDCertificateName-cangetacertificatessecretinPKCS12format-","deletedDate":1613501886,"scheduledPurgeDate":1614106686,"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-cangetacertificatessecretinPKCS12format-/ca256f81a079427485e0e5d11c666b7f","kid":"https://keyvault_name.vault.azure.net/keys/CRUDCertificateName-cangetacertificatessecretinPKCS12format-/ca256f81a079427485e0e5d11c666b7f","sid":"https://keyvault_name.vault.azure.net/secrets/CRUDCertificateName-cangetacertificatessecretinPKCS12format-/ca256f81a079427485e0e5d11c666b7f","x5t":"exGrAOJoqZKtS_kCGzpVObmKXEQ","cer":"MIIDKDCCAhCgAwIBAgIQVg2KFak/T/u3EzxrkfZdhDANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjEwMjE2MTg0ODA0WhcNMjIwMjE2MTg1ODA0WjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQCg7cDnCAj+Q4T+dU+p59m7hjUvAPqbfdTOi4lA/Va4wW/qF3ogzeEE5RKtLZUkxZDKeb7emnC205aLfnqjnkT3Dy5i6SpejsATv1USbeMYZQqVxWSAmpo+XDSnXpiFYO3V7fY0tEA+MTUGMXDBEm6Fapc56pNxZax3Iq6Upgv4m9GHlNei0qbRtOxuQqI7SnBo/7mrTIHJ6IvmSBB0gcO6MQYLDVX7581sjSjtk+Gsun6xrsR6V3EqH6O8Vp9Ol3wtWpH7Ll8/xDv1BF20R01mVP9n2WnwH9Yjok5Ya0cq7BEWOv97Yri3szfBqZYKDnEqGHTLXLw3IoESNkBNt8gVAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBTTgquiPF/l9Pu+YFo15vOM3NODbDAdBgNVHQ4EFgQU04Krojxf5fT7vmBaNebzjNzTg2wwDQYJKoZIhvcNAQELBQADggEBADzmFIyLxfEW23l0ix0pWn1hzeWYSvj5aW5K1Q9Fgq17psNw7Y3U1F/zxJKySb5F8fFZ7/c4f1zmaJDWw50APpECdRycazVmMyJfQB8UQZooDCRzRSkJjTOJRfz9pjWsMUL5P8O9EF2ODWFdaKP8j7zJvw5LX7KrJd4uyZp4QX78GUiWY0QDAneS53nBerDwKAKPxzXMHA9DXup5JaABPU6cnMJhQGYH53KLRPiLdF27cmirzwPOsfh6UqcGNj9bX8M/+Mi+8j5/8NqHxn/0BCrnifOvWj80dvkz0FpHZDfXj4M7lIovZJ5tNiDmQaTbbGxaXevZtpiPGRQ85wWoqfA=","attributes":{"enabled":true,"nbf":1613501284,"exp":1645037884,"created":1613501884,"updated":1613501884,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-cangetacertificatessecretinPKCS12format-/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1613501876,"updated":1613501876}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-cangetacertificatessecretinPKCS12format-/pending"}}, [
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
  '847812b5-b7f3-43b5-b31c-9b3073de0845',
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
  'Tue, 16 Feb 2021 18:58:05 GMT',
  'Content-Length',
  '2817'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/CRUDCertificateName-cangetacertificatessecretinPKCS12format-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: CRUDCertificateName-cangetacertificatessecretinPKCS12format-"}}, [
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
  'ed6bf4c1-f32d-40dd-a319-24f2b44a577f',
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
  'Tue, 16 Feb 2021 18:58:05 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/CRUDCertificateName-cangetacertificatessecretinPKCS12format-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: CRUDCertificateName-cangetacertificatessecretinPKCS12format-"}}, [
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
  '4acb7379-b129-4c32-94a7-45dc2d4fb459',
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
  'Tue, 16 Feb 2021 18:58:05 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/CRUDCertificateName-cangetacertificatessecretinPKCS12format-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: CRUDCertificateName-cangetacertificatessecretinPKCS12format-"}}, [
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
  '814abf8e-95a3-41de-a497-c679de06e32e',
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
  'Tue, 16 Feb 2021 18:58:08 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/CRUDCertificateName-cangetacertificatessecretinPKCS12format-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: CRUDCertificateName-cangetacertificatessecretinPKCS12format-"}}, [
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
  '67f1c34c-74c8-422c-b042-f6f6bc9dc9e2',
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
  'Tue, 16 Feb 2021 18:58:10 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/CRUDCertificateName-cangetacertificatessecretinPKCS12format-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: CRUDCertificateName-cangetacertificatessecretinPKCS12format-"}}, [
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
  '43b4ba1c-53ab-4f1c-b01d-892954a1b274',
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
  'Tue, 16 Feb 2021 18:58:12 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/CRUDCertificateName-cangetacertificatessecretinPKCS12format-')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/CRUDCertificateName-cangetacertificatessecretinPKCS12format-","deletedDate":1613501886,"scheduledPurgeDate":1614106686,"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-cangetacertificatessecretinPKCS12format-/ca256f81a079427485e0e5d11c666b7f","kid":"https://keyvault_name.vault.azure.net/keys/CRUDCertificateName-cangetacertificatessecretinPKCS12format-/ca256f81a079427485e0e5d11c666b7f","sid":"https://keyvault_name.vault.azure.net/secrets/CRUDCertificateName-cangetacertificatessecretinPKCS12format-/ca256f81a079427485e0e5d11c666b7f","x5t":"exGrAOJoqZKtS_kCGzpVObmKXEQ","cer":"MIIDKDCCAhCgAwIBAgIQVg2KFak/T/u3EzxrkfZdhDANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjEwMjE2MTg0ODA0WhcNMjIwMjE2MTg1ODA0WjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQCg7cDnCAj+Q4T+dU+p59m7hjUvAPqbfdTOi4lA/Va4wW/qF3ogzeEE5RKtLZUkxZDKeb7emnC205aLfnqjnkT3Dy5i6SpejsATv1USbeMYZQqVxWSAmpo+XDSnXpiFYO3V7fY0tEA+MTUGMXDBEm6Fapc56pNxZax3Iq6Upgv4m9GHlNei0qbRtOxuQqI7SnBo/7mrTIHJ6IvmSBB0gcO6MQYLDVX7581sjSjtk+Gsun6xrsR6V3EqH6O8Vp9Ol3wtWpH7Ll8/xDv1BF20R01mVP9n2WnwH9Yjok5Ya0cq7BEWOv97Yri3szfBqZYKDnEqGHTLXLw3IoESNkBNt8gVAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBTTgquiPF/l9Pu+YFo15vOM3NODbDAdBgNVHQ4EFgQU04Krojxf5fT7vmBaNebzjNzTg2wwDQYJKoZIhvcNAQELBQADggEBADzmFIyLxfEW23l0ix0pWn1hzeWYSvj5aW5K1Q9Fgq17psNw7Y3U1F/zxJKySb5F8fFZ7/c4f1zmaJDWw50APpECdRycazVmMyJfQB8UQZooDCRzRSkJjTOJRfz9pjWsMUL5P8O9EF2ODWFdaKP8j7zJvw5LX7KrJd4uyZp4QX78GUiWY0QDAneS53nBerDwKAKPxzXMHA9DXup5JaABPU6cnMJhQGYH53KLRPiLdF27cmirzwPOsfh6UqcGNj9bX8M/+Mi+8j5/8NqHxn/0BCrnifOvWj80dvkz0FpHZDfXj4M7lIovZJ5tNiDmQaTbbGxaXevZtpiPGRQ85wWoqfA=","attributes":{"enabled":true,"nbf":1613501284,"exp":1645037884,"created":1613501884,"updated":1613501884,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-cangetacertificatessecretinPKCS12format-/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1613501876,"updated":1613501876}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-cangetacertificatessecretinPKCS12format-/pending"}}, [
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
  '4f56cf9b-8405-481a-85ea-8b6940ffc2ef',
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
  'Tue, 16 Feb 2021 18:58:14 GMT',
  'Content-Length',
  '2817'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedcertificates/CRUDCertificateName-cangetacertificatessecretinPKCS12format-')
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
  'bcc85b71-8c86-4887-9500-644d86af0f88',
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
  'Tue, 16 Feb 2021 18:58:14 GMT'
]);

let nock = require('nock');

module.exports.hash = "56da7ae75e099ae567178e1e841126a4";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/certificates/listCertificateName-canretrieveallversionsofacertificate-/create')
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
  'e49cde58-de3a-4610-9c20-e6e6e772af4e',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 14:26:29 GMT'
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
  'bf73d122-2fac-4b89-84a3-6d28cfacd200',
  'x-ms-ests-server',
  '2.1.10732.8 - SCUS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AnS7iPRdsF5MrL1igya2NoE_aSJHAQAAABWrhtYOAAAA; expires=Sat, 25-Jul-2020 14:26:30 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; SameSite=None; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; SameSite=None; secure; HttpOnly',
  'Date',
  'Thu, 25 Jun 2020 14:26:29 GMT',
  'Content-Length',
  '1315'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/certificates/listCertificateName-canretrieveallversionsofacertificate-/create', {"policy":{"key_props":{},"secret_props":{},"x509_props":{"subject":"cn=MyCert","sans":{}},"issuer":{"name":"Self"},"attributes":{"enabled":true}},"attributes":{"enabled":true},"tags":{"tag":"tag01"}})
  .query(true)
  .reply(202, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canretrieveallversionsofacertificate-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAqYzgLOPd/nOK2pIbp5HX9Axnp5wIiC+SYMa3vLO5L6Zkz0wUJXjQMWzbrk6o7gZs/NxB50r/iTrqT6f9G4wAy1UVfC7TAaW0NtfEFEdbhaWV7jf8Lh6/cSTRrI+P1hgCSLaQRWTnWqlxWg6ekb10S/iYNifUoakEE2EZlMw2a/Q4lQQE/U5Ha+STofLEb8a7CBGK5p7S4D6wanjB4Mn6sgbJdCGqkQEuYFjOgPAxjkjP/hQUKiEvEuKeRTl6M1DfxQTekf6DRbWRVQv8hQQK612EXSEkCyyhSEhNdpjZmuMI0L/ZJSEgWUsDevzDBYjc7f15vTjXGiDogu1U0DOqDQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBABrcJTshEtFCryRfHxU/7i+PFnDgKb2ckUq8VusH2zPO7XbX3dE2tsu7zoB/enZI0gI609S4dFwOpt0yE/qm3iHsYS2f9e5HA9z1/HTPt8qoNOegoq3cSF7zjplTjNE31i6OSGM+5b9f1DtICzHoe07I/UayDsxEpR0uWjMOdYVYd8Xm3C/rU+8FKwWBiotRxB0ggwfO0KG/DO7uwCXYbCSkeynWkJcDpAknq8UgkdLQEPMjj6uYl2ktAWk920Eyy/OFFfsOFhzsaem4OHcWXkjD0j2QsJLSMoXKgYBRJtsF6K4n0EkaELnHXQDxnk/aPaSEzvcdYtbUMrdlKP/oUP0=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"93efc38badba43af9db34fcb67812463"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://keyvault_name.vault.azure.net/certificates/listCertificateName-canretrieveallversionsofacertificate-/pending?api-version=7.1-preview&request_id=93efc38badba43af9db34fcb67812463',
  'Retry-After',
  '10',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '95ce6c4f-3e1e-4759-9486-b81543d51d20',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 14:26:29 GMT',
  'Content-Length',
  '1349'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canretrieveallversionsofacertificate-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canretrieveallversionsofacertificate-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAqYzgLOPd/nOK2pIbp5HX9Axnp5wIiC+SYMa3vLO5L6Zkz0wUJXjQMWzbrk6o7gZs/NxB50r/iTrqT6f9G4wAy1UVfC7TAaW0NtfEFEdbhaWV7jf8Lh6/cSTRrI+P1hgCSLaQRWTnWqlxWg6ekb10S/iYNifUoakEE2EZlMw2a/Q4lQQE/U5Ha+STofLEb8a7CBGK5p7S4D6wanjB4Mn6sgbJdCGqkQEuYFjOgPAxjkjP/hQUKiEvEuKeRTl6M1DfxQTekf6DRbWRVQv8hQQK612EXSEkCyyhSEhNdpjZmuMI0L/ZJSEgWUsDevzDBYjc7f15vTjXGiDogu1U0DOqDQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBABrcJTshEtFCryRfHxU/7i+PFnDgKb2ckUq8VusH2zPO7XbX3dE2tsu7zoB/enZI0gI609S4dFwOpt0yE/qm3iHsYS2f9e5HA9z1/HTPt8qoNOegoq3cSF7zjplTjNE31i6OSGM+5b9f1DtICzHoe07I/UayDsxEpR0uWjMOdYVYd8Xm3C/rU+8FKwWBiotRxB0ggwfO0KG/DO7uwCXYbCSkeynWkJcDpAknq8UgkdLQEPMjj6uYl2ktAWk920Eyy/OFFfsOFhzsaem4OHcWXkjD0j2QsJLSMoXKgYBRJtsF6K4n0EkaELnHXQDxnk/aPaSEzvcdYtbUMrdlKP/oUP0=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"93efc38badba43af9db34fcb67812463"}, [
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
  'c8207290-e734-4f75-8a89-61321e295fc4',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 14:26:30 GMT',
  'Content-Length',
  '1349'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canretrieveallversionsofacertificate-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canretrieveallversionsofacertificate-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAqYzgLOPd/nOK2pIbp5HX9Axnp5wIiC+SYMa3vLO5L6Zkz0wUJXjQMWzbrk6o7gZs/NxB50r/iTrqT6f9G4wAy1UVfC7TAaW0NtfEFEdbhaWV7jf8Lh6/cSTRrI+P1hgCSLaQRWTnWqlxWg6ekb10S/iYNifUoakEE2EZlMw2a/Q4lQQE/U5Ha+STofLEb8a7CBGK5p7S4D6wanjB4Mn6sgbJdCGqkQEuYFjOgPAxjkjP/hQUKiEvEuKeRTl6M1DfxQTekf6DRbWRVQv8hQQK612EXSEkCyyhSEhNdpjZmuMI0L/ZJSEgWUsDevzDBYjc7f15vTjXGiDogu1U0DOqDQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBABrcJTshEtFCryRfHxU/7i+PFnDgKb2ckUq8VusH2zPO7XbX3dE2tsu7zoB/enZI0gI609S4dFwOpt0yE/qm3iHsYS2f9e5HA9z1/HTPt8qoNOegoq3cSF7zjplTjNE31i6OSGM+5b9f1DtICzHoe07I/UayDsxEpR0uWjMOdYVYd8Xm3C/rU+8FKwWBiotRxB0ggwfO0KG/DO7uwCXYbCSkeynWkJcDpAknq8UgkdLQEPMjj6uYl2ktAWk920Eyy/OFFfsOFhzsaem4OHcWXkjD0j2QsJLSMoXKgYBRJtsF6K4n0EkaELnHXQDxnk/aPaSEzvcdYtbUMrdlKP/oUP0=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"93efc38badba43af9db34fcb67812463"}, [
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
  '0cff9fb8-9e63-46bd-a2a7-748703b46ddb',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 14:26:30 GMT',
  'Content-Length',
  '1349'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canretrieveallversionsofacertificate-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canretrieveallversionsofacertificate-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAqYzgLOPd/nOK2pIbp5HX9Axnp5wIiC+SYMa3vLO5L6Zkz0wUJXjQMWzbrk6o7gZs/NxB50r/iTrqT6f9G4wAy1UVfC7TAaW0NtfEFEdbhaWV7jf8Lh6/cSTRrI+P1hgCSLaQRWTnWqlxWg6ekb10S/iYNifUoakEE2EZlMw2a/Q4lQQE/U5Ha+STofLEb8a7CBGK5p7S4D6wanjB4Mn6sgbJdCGqkQEuYFjOgPAxjkjP/hQUKiEvEuKeRTl6M1DfxQTekf6DRbWRVQv8hQQK612EXSEkCyyhSEhNdpjZmuMI0L/ZJSEgWUsDevzDBYjc7f15vTjXGiDogu1U0DOqDQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBABrcJTshEtFCryRfHxU/7i+PFnDgKb2ckUq8VusH2zPO7XbX3dE2tsu7zoB/enZI0gI609S4dFwOpt0yE/qm3iHsYS2f9e5HA9z1/HTPt8qoNOegoq3cSF7zjplTjNE31i6OSGM+5b9f1DtICzHoe07I/UayDsxEpR0uWjMOdYVYd8Xm3C/rU+8FKwWBiotRxB0ggwfO0KG/DO7uwCXYbCSkeynWkJcDpAknq8UgkdLQEPMjj6uYl2ktAWk920Eyy/OFFfsOFhzsaem4OHcWXkjD0j2QsJLSMoXKgYBRJtsF6K4n0EkaELnHXQDxnk/aPaSEzvcdYtbUMrdlKP/oUP0=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"93efc38badba43af9db34fcb67812463"}, [
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
  'c56bd2ec-3c8b-4220-8f11-029f5c32e679',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 14:26:32 GMT',
  'Content-Length',
  '1349'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canretrieveallversionsofacertificate-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canretrieveallversionsofacertificate-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAqYzgLOPd/nOK2pIbp5HX9Axnp5wIiC+SYMa3vLO5L6Zkz0wUJXjQMWzbrk6o7gZs/NxB50r/iTrqT6f9G4wAy1UVfC7TAaW0NtfEFEdbhaWV7jf8Lh6/cSTRrI+P1hgCSLaQRWTnWqlxWg6ekb10S/iYNifUoakEE2EZlMw2a/Q4lQQE/U5Ha+STofLEb8a7CBGK5p7S4D6wanjB4Mn6sgbJdCGqkQEuYFjOgPAxjkjP/hQUKiEvEuKeRTl6M1DfxQTekf6DRbWRVQv8hQQK612EXSEkCyyhSEhNdpjZmuMI0L/ZJSEgWUsDevzDBYjc7f15vTjXGiDogu1U0DOqDQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBABrcJTshEtFCryRfHxU/7i+PFnDgKb2ckUq8VusH2zPO7XbX3dE2tsu7zoB/enZI0gI609S4dFwOpt0yE/qm3iHsYS2f9e5HA9z1/HTPt8qoNOegoq3cSF7zjplTjNE31i6OSGM+5b9f1DtICzHoe07I/UayDsxEpR0uWjMOdYVYd8Xm3C/rU+8FKwWBiotRxB0ggwfO0KG/DO7uwCXYbCSkeynWkJcDpAknq8UgkdLQEPMjj6uYl2ktAWk920Eyy/OFFfsOFhzsaem4OHcWXkjD0j2QsJLSMoXKgYBRJtsF6K4n0EkaELnHXQDxnk/aPaSEzvcdYtbUMrdlKP/oUP0=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"93efc38badba43af9db34fcb67812463"}, [
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
  'ffef1f8c-8728-4677-a539-d7799f1441d5',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 14:26:34 GMT',
  'Content-Length',
  '1349'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canretrieveallversionsofacertificate-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canretrieveallversionsofacertificate-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAqYzgLOPd/nOK2pIbp5HX9Axnp5wIiC+SYMa3vLO5L6Zkz0wUJXjQMWzbrk6o7gZs/NxB50r/iTrqT6f9G4wAy1UVfC7TAaW0NtfEFEdbhaWV7jf8Lh6/cSTRrI+P1hgCSLaQRWTnWqlxWg6ekb10S/iYNifUoakEE2EZlMw2a/Q4lQQE/U5Ha+STofLEb8a7CBGK5p7S4D6wanjB4Mn6sgbJdCGqkQEuYFjOgPAxjkjP/hQUKiEvEuKeRTl6M1DfxQTekf6DRbWRVQv8hQQK612EXSEkCyyhSEhNdpjZmuMI0L/ZJSEgWUsDevzDBYjc7f15vTjXGiDogu1U0DOqDQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBABrcJTshEtFCryRfHxU/7i+PFnDgKb2ckUq8VusH2zPO7XbX3dE2tsu7zoB/enZI0gI609S4dFwOpt0yE/qm3iHsYS2f9e5HA9z1/HTPt8qoNOegoq3cSF7zjplTjNE31i6OSGM+5b9f1DtICzHoe07I/UayDsxEpR0uWjMOdYVYd8Xm3C/rU+8FKwWBiotRxB0ggwfO0KG/DO7uwCXYbCSkeynWkJcDpAknq8UgkdLQEPMjj6uYl2ktAWk920Eyy/OFFfsOFhzsaem4OHcWXkjD0j2QsJLSMoXKgYBRJtsF6K4n0EkaELnHXQDxnk/aPaSEzvcdYtbUMrdlKP/oUP0=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"93efc38badba43af9db34fcb67812463"}, [
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
  '6196a1e1-df98-4be8-bb7d-9d44874587c0',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 14:26:36 GMT',
  'Content-Length',
  '1349'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canretrieveallversionsofacertificate-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canretrieveallversionsofacertificate-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAqYzgLOPd/nOK2pIbp5HX9Axnp5wIiC+SYMa3vLO5L6Zkz0wUJXjQMWzbrk6o7gZs/NxB50r/iTrqT6f9G4wAy1UVfC7TAaW0NtfEFEdbhaWV7jf8Lh6/cSTRrI+P1hgCSLaQRWTnWqlxWg6ekb10S/iYNifUoakEE2EZlMw2a/Q4lQQE/U5Ha+STofLEb8a7CBGK5p7S4D6wanjB4Mn6sgbJdCGqkQEuYFjOgPAxjkjP/hQUKiEvEuKeRTl6M1DfxQTekf6DRbWRVQv8hQQK612EXSEkCyyhSEhNdpjZmuMI0L/ZJSEgWUsDevzDBYjc7f15vTjXGiDogu1U0DOqDQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBABrcJTshEtFCryRfHxU/7i+PFnDgKb2ckUq8VusH2zPO7XbX3dE2tsu7zoB/enZI0gI609S4dFwOpt0yE/qm3iHsYS2f9e5HA9z1/HTPt8qoNOegoq3cSF7zjplTjNE31i6OSGM+5b9f1DtICzHoe07I/UayDsxEpR0uWjMOdYVYd8Xm3C/rU+8FKwWBiotRxB0ggwfO0KG/DO7uwCXYbCSkeynWkJcDpAknq8UgkdLQEPMjj6uYl2ktAWk920Eyy/OFFfsOFhzsaem4OHcWXkjD0j2QsJLSMoXKgYBRJtsF6K4n0EkaELnHXQDxnk/aPaSEzvcdYtbUMrdlKP/oUP0=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"93efc38badba43af9db34fcb67812463"}, [
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
  '30914d1e-a8fd-4e6c-908b-468e7c27edf3',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 14:26:38 GMT',
  'Content-Length',
  '1349'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canretrieveallversionsofacertificate-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canretrieveallversionsofacertificate-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAqYzgLOPd/nOK2pIbp5HX9Axnp5wIiC+SYMa3vLO5L6Zkz0wUJXjQMWzbrk6o7gZs/NxB50r/iTrqT6f9G4wAy1UVfC7TAaW0NtfEFEdbhaWV7jf8Lh6/cSTRrI+P1hgCSLaQRWTnWqlxWg6ekb10S/iYNifUoakEE2EZlMw2a/Q4lQQE/U5Ha+STofLEb8a7CBGK5p7S4D6wanjB4Mn6sgbJdCGqkQEuYFjOgPAxjkjP/hQUKiEvEuKeRTl6M1DfxQTekf6DRbWRVQv8hQQK612EXSEkCyyhSEhNdpjZmuMI0L/ZJSEgWUsDevzDBYjc7f15vTjXGiDogu1U0DOqDQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBABrcJTshEtFCryRfHxU/7i+PFnDgKb2ckUq8VusH2zPO7XbX3dE2tsu7zoB/enZI0gI609S4dFwOpt0yE/qm3iHsYS2f9e5HA9z1/HTPt8qoNOegoq3cSF7zjplTjNE31i6OSGM+5b9f1DtICzHoe07I/UayDsxEpR0uWjMOdYVYd8Xm3C/rU+8FKwWBiotRxB0ggwfO0KG/DO7uwCXYbCSkeynWkJcDpAknq8UgkdLQEPMjj6uYl2ktAWk920Eyy/OFFfsOFhzsaem4OHcWXkjD0j2QsJLSMoXKgYBRJtsF6K4n0EkaELnHXQDxnk/aPaSEzvcdYtbUMrdlKP/oUP0=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"93efc38badba43af9db34fcb67812463"}, [
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
  '9ec5f82d-7f0e-419b-9b30-aadd469594af',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 14:26:41 GMT',
  'Content-Length',
  '1349'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canretrieveallversionsofacertificate-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canretrieveallversionsofacertificate-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAqYzgLOPd/nOK2pIbp5HX9Axnp5wIiC+SYMa3vLO5L6Zkz0wUJXjQMWzbrk6o7gZs/NxB50r/iTrqT6f9G4wAy1UVfC7TAaW0NtfEFEdbhaWV7jf8Lh6/cSTRrI+P1hgCSLaQRWTnWqlxWg6ekb10S/iYNifUoakEE2EZlMw2a/Q4lQQE/U5Ha+STofLEb8a7CBGK5p7S4D6wanjB4Mn6sgbJdCGqkQEuYFjOgPAxjkjP/hQUKiEvEuKeRTl6M1DfxQTekf6DRbWRVQv8hQQK612EXSEkCyyhSEhNdpjZmuMI0L/ZJSEgWUsDevzDBYjc7f15vTjXGiDogu1U0DOqDQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBABrcJTshEtFCryRfHxU/7i+PFnDgKb2ckUq8VusH2zPO7XbX3dE2tsu7zoB/enZI0gI609S4dFwOpt0yE/qm3iHsYS2f9e5HA9z1/HTPt8qoNOegoq3cSF7zjplTjNE31i6OSGM+5b9f1DtICzHoe07I/UayDsxEpR0uWjMOdYVYd8Xm3C/rU+8FKwWBiotRxB0ggwfO0KG/DO7uwCXYbCSkeynWkJcDpAknq8UgkdLQEPMjj6uYl2ktAWk920Eyy/OFFfsOFhzsaem4OHcWXkjD0j2QsJLSMoXKgYBRJtsF6K4n0EkaELnHXQDxnk/aPaSEzvcdYtbUMrdlKP/oUP0=","cancellation_requested":false,"status":"completed","target":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canretrieveallversionsofacertificate-","request_id":"93efc38badba43af9db34fcb67812463"}, [
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
  '82fc8aad-bb79-409b-a02c-fa452a577b42',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 14:26:43 GMT',
  'Content-Length',
  '1325'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canretrieveallversionsofacertificate-/')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canretrieveallversionsofacertificate-/2f4d75ba2ae84637b7051e0ca496caa8","kid":"https://keyvault_name.vault.azure.net/keys/listCertificateName-canretrieveallversionsofacertificate-/2f4d75ba2ae84637b7051e0ca496caa8","sid":"https://keyvault_name.vault.azure.net/secrets/listCertificateName-canretrieveallversionsofacertificate-/2f4d75ba2ae84637b7051e0ca496caa8","x5t":"K1L73dX975MJ9G0kESqJrgObo5g","cer":"MIIDKDCCAhCgAwIBAgIQEeGMcirmSAaqC2UTVIW1tDANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjAwNjI1MTQxNjQzWhcNMjEwNjI1MTQyNjQzWjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQCpjOAs493+c4rakhunkdf0DGennAiIL5Jgxre8s7kvpmTPTBQleNAxbNuuTqjuBmz83EHnSv+JOupPp/0bjADLVRV8LtMBpbQ218QUR1uFpZXuN/wuHr9xJNGsj4/WGAJItpBFZOdaqXFaDp6RvXRL+Jg2J9ShqQQTYRmUzDZr9DiVBAT9Tkdr5JOh8sRvxrsIEYrmntLgPrBqeMHgyfqyBsl0IaqRAS5gWM6A8DGOSM/+FBQqIS8S4p5FOXozUN/FBN6R/oNFtZFVC/yFBArrXYRdISQLLKFISE12mNma4wjQv9klISBZSwN6/MMFiNzt/Xm9ONcaIOiC7VTQM6oNAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBTY1Prbq9xaYbPoNnKmyreFGm753TAdBgNVHQ4EFgQU2NT626vcWmGz6DZypsq3hRpu+d0wDQYJKoZIhvcNAQELBQADggEBAFECfub7EqphR/Njj/fGh/FJ5pT03Us2qwn2pY/t6WAYV+6w3Q5+ukvTdzOvTyLsOQNOZ8HyP0YXUMu5OCkAbH2yvPXAZnb7Zl6idM7CkF50p13J4j892NBEFF17wuvT3K5gADgKviUEBEj41Q4umGmX2396uH9uoImt2cQNZbVTzZzKCbHIRryX6ZzmzqdFZvn3TkUpahZKOKxMo3FAvrebCq2FWnC8MiygrCO1k0gm3q6Xb4izoPvwP4tMjqGZ9UTIUHm137zhYEZWn/JqN+Qo2fT2tUKW7pFQqao3EEHGIq1fb2otiw7Cor0NYg11weMONZE3fx05ppdgikQ/yoU=","attributes":{"enabled":true,"nbf":1593094603,"exp":1624631203,"created":1593095203,"updated":1593095203,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90},"tags":{"tag":"tag01"},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canretrieveallversionsofacertificate-/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1593095190,"updated":1593095190}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canretrieveallversionsofacertificate-/pending"}}, [
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
  'fbb67238-9a37-496d-966c-d6894a19dd23',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 14:26:43 GMT',
  'Content-Length',
  '2658'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/certificates/listCertificateName-canretrieveallversionsofacertificate-/create', {"policy":{"key_props":{},"secret_props":{},"x509_props":{"subject":"cn=MyCert","sans":{}},"issuer":{"name":"Self"},"attributes":{"enabled":true}},"attributes":{"enabled":true},"tags":{"tag":"tag02"}})
  .query(true)
  .reply(202, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canretrieveallversionsofacertificate-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAqjYwGZ7Fv3txJt+FSBiwmP8FedXolTRkqCF2+VDk5+qI1eNv4T2MWKaNcacUpW/M7d3iIRI/oPVNqejye/eukpaTeRANOMXLSUmPnkT40zYVJODxvlID3PQuU/z8zZ3zcwe9Q/A4/Y1mSfz5JsINk+26h96JC3trqeouDVLNL4JKKmcClpUL50THcpwTf7hsGnhyvj/P++GbeCN+NDZzVKJa5AkDL75DlzzbbBW1tHj8ecdyT+uXrdWI54gKu5tyE8zZren+0Z/q6+wFVISXNXcCTdWrxB4a8yxeCpdmUQalNQVMyVsfz8uk1ySTGrvnuYp1gD1mFRlbL0yVTrJ4kQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAC+wgEFpAP3crdu6QxtcXdbo1aVHVJvg89gZKEaWUjLfTG8O6jE4VD1/SPxFcDXIHYAN8CorlSySItQDph2CZxp799CX9Q+cTmnLtQ2ZpG3rC6B3zkC/pnIV0uz7oM5nFCBzMFJJIs3yc13wyZLTpMouDEBhnPy9UqjCykWDfxLMcO9ocXf3nk9m/866Ms9BUrsU3H8l4ugarYvMw68bT1zrdiu7VvJID744YDdmjybL8PVHADQVd21Z6bGCyvZcp0WGW9Xugw+XlfPLkNLog2wTiPVKrniZCULPsOL/jbgBIGL9Y/iE2qrNlv2p1Obo6ZJ+HXTkAeXhbqysOa0xf9A=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"413910027af146b3902694124a9f803e"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://keyvault_name.vault.azure.net/certificates/listCertificateName-canretrieveallversionsofacertificate-/pending?api-version=7.1-preview&request_id=413910027af146b3902694124a9f803e',
  'Retry-After',
  '10',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'd454df7c-51be-4073-9020-095183d95e14',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 14:26:44 GMT',
  'Content-Length',
  '1349'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canretrieveallversionsofacertificate-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canretrieveallversionsofacertificate-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAqjYwGZ7Fv3txJt+FSBiwmP8FedXolTRkqCF2+VDk5+qI1eNv4T2MWKaNcacUpW/M7d3iIRI/oPVNqejye/eukpaTeRANOMXLSUmPnkT40zYVJODxvlID3PQuU/z8zZ3zcwe9Q/A4/Y1mSfz5JsINk+26h96JC3trqeouDVLNL4JKKmcClpUL50THcpwTf7hsGnhyvj/P++GbeCN+NDZzVKJa5AkDL75DlzzbbBW1tHj8ecdyT+uXrdWI54gKu5tyE8zZren+0Z/q6+wFVISXNXcCTdWrxB4a8yxeCpdmUQalNQVMyVsfz8uk1ySTGrvnuYp1gD1mFRlbL0yVTrJ4kQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAC+wgEFpAP3crdu6QxtcXdbo1aVHVJvg89gZKEaWUjLfTG8O6jE4VD1/SPxFcDXIHYAN8CorlSySItQDph2CZxp799CX9Q+cTmnLtQ2ZpG3rC6B3zkC/pnIV0uz7oM5nFCBzMFJJIs3yc13wyZLTpMouDEBhnPy9UqjCykWDfxLMcO9ocXf3nk9m/866Ms9BUrsU3H8l4ugarYvMw68bT1zrdiu7VvJID744YDdmjybL8PVHADQVd21Z6bGCyvZcp0WGW9Xugw+XlfPLkNLog2wTiPVKrniZCULPsOL/jbgBIGL9Y/iE2qrNlv2p1Obo6ZJ+HXTkAeXhbqysOa0xf9A=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"413910027af146b3902694124a9f803e"}, [
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
  'c82aff9b-164d-487b-a7d8-8a0e441f0902',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 14:26:44 GMT',
  'Content-Length',
  '1349'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canretrieveallversionsofacertificate-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canretrieveallversionsofacertificate-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAqjYwGZ7Fv3txJt+FSBiwmP8FedXolTRkqCF2+VDk5+qI1eNv4T2MWKaNcacUpW/M7d3iIRI/oPVNqejye/eukpaTeRANOMXLSUmPnkT40zYVJODxvlID3PQuU/z8zZ3zcwe9Q/A4/Y1mSfz5JsINk+26h96JC3trqeouDVLNL4JKKmcClpUL50THcpwTf7hsGnhyvj/P++GbeCN+NDZzVKJa5AkDL75DlzzbbBW1tHj8ecdyT+uXrdWI54gKu5tyE8zZren+0Z/q6+wFVISXNXcCTdWrxB4a8yxeCpdmUQalNQVMyVsfz8uk1ySTGrvnuYp1gD1mFRlbL0yVTrJ4kQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAC+wgEFpAP3crdu6QxtcXdbo1aVHVJvg89gZKEaWUjLfTG8O6jE4VD1/SPxFcDXIHYAN8CorlSySItQDph2CZxp799CX9Q+cTmnLtQ2ZpG3rC6B3zkC/pnIV0uz7oM5nFCBzMFJJIs3yc13wyZLTpMouDEBhnPy9UqjCykWDfxLMcO9ocXf3nk9m/866Ms9BUrsU3H8l4ugarYvMw68bT1zrdiu7VvJID744YDdmjybL8PVHADQVd21Z6bGCyvZcp0WGW9Xugw+XlfPLkNLog2wTiPVKrniZCULPsOL/jbgBIGL9Y/iE2qrNlv2p1Obo6ZJ+HXTkAeXhbqysOa0xf9A=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"413910027af146b3902694124a9f803e"}, [
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
  '6adb8f41-d199-4989-86e1-30cdf1d50f20',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 14:26:44 GMT',
  'Content-Length',
  '1349'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canretrieveallversionsofacertificate-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canretrieveallversionsofacertificate-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAqjYwGZ7Fv3txJt+FSBiwmP8FedXolTRkqCF2+VDk5+qI1eNv4T2MWKaNcacUpW/M7d3iIRI/oPVNqejye/eukpaTeRANOMXLSUmPnkT40zYVJODxvlID3PQuU/z8zZ3zcwe9Q/A4/Y1mSfz5JsINk+26h96JC3trqeouDVLNL4JKKmcClpUL50THcpwTf7hsGnhyvj/P++GbeCN+NDZzVKJa5AkDL75DlzzbbBW1tHj8ecdyT+uXrdWI54gKu5tyE8zZren+0Z/q6+wFVISXNXcCTdWrxB4a8yxeCpdmUQalNQVMyVsfz8uk1ySTGrvnuYp1gD1mFRlbL0yVTrJ4kQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAC+wgEFpAP3crdu6QxtcXdbo1aVHVJvg89gZKEaWUjLfTG8O6jE4VD1/SPxFcDXIHYAN8CorlSySItQDph2CZxp799CX9Q+cTmnLtQ2ZpG3rC6B3zkC/pnIV0uz7oM5nFCBzMFJJIs3yc13wyZLTpMouDEBhnPy9UqjCykWDfxLMcO9ocXf3nk9m/866Ms9BUrsU3H8l4ugarYvMw68bT1zrdiu7VvJID744YDdmjybL8PVHADQVd21Z6bGCyvZcp0WGW9Xugw+XlfPLkNLog2wTiPVKrniZCULPsOL/jbgBIGL9Y/iE2qrNlv2p1Obo6ZJ+HXTkAeXhbqysOa0xf9A=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"413910027af146b3902694124a9f803e"}, [
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
  '2b061bf8-d8e8-47d8-b835-91262e35eef9',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 14:26:47 GMT',
  'Content-Length',
  '1349'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canretrieveallversionsofacertificate-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canretrieveallversionsofacertificate-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAqjYwGZ7Fv3txJt+FSBiwmP8FedXolTRkqCF2+VDk5+qI1eNv4T2MWKaNcacUpW/M7d3iIRI/oPVNqejye/eukpaTeRANOMXLSUmPnkT40zYVJODxvlID3PQuU/z8zZ3zcwe9Q/A4/Y1mSfz5JsINk+26h96JC3trqeouDVLNL4JKKmcClpUL50THcpwTf7hsGnhyvj/P++GbeCN+NDZzVKJa5AkDL75DlzzbbBW1tHj8ecdyT+uXrdWI54gKu5tyE8zZren+0Z/q6+wFVISXNXcCTdWrxB4a8yxeCpdmUQalNQVMyVsfz8uk1ySTGrvnuYp1gD1mFRlbL0yVTrJ4kQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAC+wgEFpAP3crdu6QxtcXdbo1aVHVJvg89gZKEaWUjLfTG8O6jE4VD1/SPxFcDXIHYAN8CorlSySItQDph2CZxp799CX9Q+cTmnLtQ2ZpG3rC6B3zkC/pnIV0uz7oM5nFCBzMFJJIs3yc13wyZLTpMouDEBhnPy9UqjCykWDfxLMcO9ocXf3nk9m/866Ms9BUrsU3H8l4ugarYvMw68bT1zrdiu7VvJID744YDdmjybL8PVHADQVd21Z6bGCyvZcp0WGW9Xugw+XlfPLkNLog2wTiPVKrniZCULPsOL/jbgBIGL9Y/iE2qrNlv2p1Obo6ZJ+HXTkAeXhbqysOa0xf9A=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"413910027af146b3902694124a9f803e"}, [
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
  'a87b9bb4-f3c3-4b59-ad28-cfe7a83f2db7',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 14:26:48 GMT',
  'Content-Length',
  '1349'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canretrieveallversionsofacertificate-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canretrieveallversionsofacertificate-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAqjYwGZ7Fv3txJt+FSBiwmP8FedXolTRkqCF2+VDk5+qI1eNv4T2MWKaNcacUpW/M7d3iIRI/oPVNqejye/eukpaTeRANOMXLSUmPnkT40zYVJODxvlID3PQuU/z8zZ3zcwe9Q/A4/Y1mSfz5JsINk+26h96JC3trqeouDVLNL4JKKmcClpUL50THcpwTf7hsGnhyvj/P++GbeCN+NDZzVKJa5AkDL75DlzzbbBW1tHj8ecdyT+uXrdWI54gKu5tyE8zZren+0Z/q6+wFVISXNXcCTdWrxB4a8yxeCpdmUQalNQVMyVsfz8uk1ySTGrvnuYp1gD1mFRlbL0yVTrJ4kQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAC+wgEFpAP3crdu6QxtcXdbo1aVHVJvg89gZKEaWUjLfTG8O6jE4VD1/SPxFcDXIHYAN8CorlSySItQDph2CZxp799CX9Q+cTmnLtQ2ZpG3rC6B3zkC/pnIV0uz7oM5nFCBzMFJJIs3yc13wyZLTpMouDEBhnPy9UqjCykWDfxLMcO9ocXf3nk9m/866Ms9BUrsU3H8l4ugarYvMw68bT1zrdiu7VvJID744YDdmjybL8PVHADQVd21Z6bGCyvZcp0WGW9Xugw+XlfPLkNLog2wTiPVKrniZCULPsOL/jbgBIGL9Y/iE2qrNlv2p1Obo6ZJ+HXTkAeXhbqysOa0xf9A=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"413910027af146b3902694124a9f803e"}, [
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
  'a04aab82-9ef1-4a93-9aaf-66d0a033b9d7',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 14:26:50 GMT',
  'Content-Length',
  '1349'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canretrieveallversionsofacertificate-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canretrieveallversionsofacertificate-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAqjYwGZ7Fv3txJt+FSBiwmP8FedXolTRkqCF2+VDk5+qI1eNv4T2MWKaNcacUpW/M7d3iIRI/oPVNqejye/eukpaTeRANOMXLSUmPnkT40zYVJODxvlID3PQuU/z8zZ3zcwe9Q/A4/Y1mSfz5JsINk+26h96JC3trqeouDVLNL4JKKmcClpUL50THcpwTf7hsGnhyvj/P++GbeCN+NDZzVKJa5AkDL75DlzzbbBW1tHj8ecdyT+uXrdWI54gKu5tyE8zZren+0Z/q6+wFVISXNXcCTdWrxB4a8yxeCpdmUQalNQVMyVsfz8uk1ySTGrvnuYp1gD1mFRlbL0yVTrJ4kQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAC+wgEFpAP3crdu6QxtcXdbo1aVHVJvg89gZKEaWUjLfTG8O6jE4VD1/SPxFcDXIHYAN8CorlSySItQDph2CZxp799CX9Q+cTmnLtQ2ZpG3rC6B3zkC/pnIV0uz7oM5nFCBzMFJJIs3yc13wyZLTpMouDEBhnPy9UqjCykWDfxLMcO9ocXf3nk9m/866Ms9BUrsU3H8l4ugarYvMw68bT1zrdiu7VvJID744YDdmjybL8PVHADQVd21Z6bGCyvZcp0WGW9Xugw+XlfPLkNLog2wTiPVKrniZCULPsOL/jbgBIGL9Y/iE2qrNlv2p1Obo6ZJ+HXTkAeXhbqysOa0xf9A=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"413910027af146b3902694124a9f803e"}, [
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
  'af9527b7-f753-4414-98cd-0d2c73ddf1ce',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 14:26:53 GMT',
  'Content-Length',
  '1349'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canretrieveallversionsofacertificate-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canretrieveallversionsofacertificate-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAqjYwGZ7Fv3txJt+FSBiwmP8FedXolTRkqCF2+VDk5+qI1eNv4T2MWKaNcacUpW/M7d3iIRI/oPVNqejye/eukpaTeRANOMXLSUmPnkT40zYVJODxvlID3PQuU/z8zZ3zcwe9Q/A4/Y1mSfz5JsINk+26h96JC3trqeouDVLNL4JKKmcClpUL50THcpwTf7hsGnhyvj/P++GbeCN+NDZzVKJa5AkDL75DlzzbbBW1tHj8ecdyT+uXrdWI54gKu5tyE8zZren+0Z/q6+wFVISXNXcCTdWrxB4a8yxeCpdmUQalNQVMyVsfz8uk1ySTGrvnuYp1gD1mFRlbL0yVTrJ4kQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAC+wgEFpAP3crdu6QxtcXdbo1aVHVJvg89gZKEaWUjLfTG8O6jE4VD1/SPxFcDXIHYAN8CorlSySItQDph2CZxp799CX9Q+cTmnLtQ2ZpG3rC6B3zkC/pnIV0uz7oM5nFCBzMFJJIs3yc13wyZLTpMouDEBhnPy9UqjCykWDfxLMcO9ocXf3nk9m/866Ms9BUrsU3H8l4ugarYvMw68bT1zrdiu7VvJID744YDdmjybL8PVHADQVd21Z6bGCyvZcp0WGW9Xugw+XlfPLkNLog2wTiPVKrniZCULPsOL/jbgBIGL9Y/iE2qrNlv2p1Obo6ZJ+HXTkAeXhbqysOa0xf9A=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"413910027af146b3902694124a9f803e"}, [
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
  '9b44c7a6-4f1b-4da0-af16-a9c78459b31a',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 14:26:55 GMT',
  'Content-Length',
  '1349'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canretrieveallversionsofacertificate-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canretrieveallversionsofacertificate-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAqjYwGZ7Fv3txJt+FSBiwmP8FedXolTRkqCF2+VDk5+qI1eNv4T2MWKaNcacUpW/M7d3iIRI/oPVNqejye/eukpaTeRANOMXLSUmPnkT40zYVJODxvlID3PQuU/z8zZ3zcwe9Q/A4/Y1mSfz5JsINk+26h96JC3trqeouDVLNL4JKKmcClpUL50THcpwTf7hsGnhyvj/P++GbeCN+NDZzVKJa5AkDL75DlzzbbBW1tHj8ecdyT+uXrdWI54gKu5tyE8zZren+0Z/q6+wFVISXNXcCTdWrxB4a8yxeCpdmUQalNQVMyVsfz8uk1ySTGrvnuYp1gD1mFRlbL0yVTrJ4kQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAC+wgEFpAP3crdu6QxtcXdbo1aVHVJvg89gZKEaWUjLfTG8O6jE4VD1/SPxFcDXIHYAN8CorlSySItQDph2CZxp799CX9Q+cTmnLtQ2ZpG3rC6B3zkC/pnIV0uz7oM5nFCBzMFJJIs3yc13wyZLTpMouDEBhnPy9UqjCykWDfxLMcO9ocXf3nk9m/866Ms9BUrsU3H8l4ugarYvMw68bT1zrdiu7VvJID744YDdmjybL8PVHADQVd21Z6bGCyvZcp0WGW9Xugw+XlfPLkNLog2wTiPVKrniZCULPsOL/jbgBIGL9Y/iE2qrNlv2p1Obo6ZJ+HXTkAeXhbqysOa0xf9A=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"413910027af146b3902694124a9f803e"}, [
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
  'ea96e2bf-b598-4deb-8656-0c7c615527c4',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 14:26:56 GMT',
  'Content-Length',
  '1349'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canretrieveallversionsofacertificate-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canretrieveallversionsofacertificate-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAqjYwGZ7Fv3txJt+FSBiwmP8FedXolTRkqCF2+VDk5+qI1eNv4T2MWKaNcacUpW/M7d3iIRI/oPVNqejye/eukpaTeRANOMXLSUmPnkT40zYVJODxvlID3PQuU/z8zZ3zcwe9Q/A4/Y1mSfz5JsINk+26h96JC3trqeouDVLNL4JKKmcClpUL50THcpwTf7hsGnhyvj/P++GbeCN+NDZzVKJa5AkDL75DlzzbbBW1tHj8ecdyT+uXrdWI54gKu5tyE8zZren+0Z/q6+wFVISXNXcCTdWrxB4a8yxeCpdmUQalNQVMyVsfz8uk1ySTGrvnuYp1gD1mFRlbL0yVTrJ4kQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAC+wgEFpAP3crdu6QxtcXdbo1aVHVJvg89gZKEaWUjLfTG8O6jE4VD1/SPxFcDXIHYAN8CorlSySItQDph2CZxp799CX9Q+cTmnLtQ2ZpG3rC6B3zkC/pnIV0uz7oM5nFCBzMFJJIs3yc13wyZLTpMouDEBhnPy9UqjCykWDfxLMcO9ocXf3nk9m/866Ms9BUrsU3H8l4ugarYvMw68bT1zrdiu7VvJID744YDdmjybL8PVHADQVd21Z6bGCyvZcp0WGW9Xugw+XlfPLkNLog2wTiPVKrniZCULPsOL/jbgBIGL9Y/iE2qrNlv2p1Obo6ZJ+HXTkAeXhbqysOa0xf9A=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"413910027af146b3902694124a9f803e"}, [
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
  'afecbb09-4a05-4696-b1c4-3f6846c61c33',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 14:26:59 GMT',
  'Content-Length',
  '1349'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canretrieveallversionsofacertificate-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canretrieveallversionsofacertificate-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAqjYwGZ7Fv3txJt+FSBiwmP8FedXolTRkqCF2+VDk5+qI1eNv4T2MWKaNcacUpW/M7d3iIRI/oPVNqejye/eukpaTeRANOMXLSUmPnkT40zYVJODxvlID3PQuU/z8zZ3zcwe9Q/A4/Y1mSfz5JsINk+26h96JC3trqeouDVLNL4JKKmcClpUL50THcpwTf7hsGnhyvj/P++GbeCN+NDZzVKJa5AkDL75DlzzbbBW1tHj8ecdyT+uXrdWI54gKu5tyE8zZren+0Z/q6+wFVISXNXcCTdWrxB4a8yxeCpdmUQalNQVMyVsfz8uk1ySTGrvnuYp1gD1mFRlbL0yVTrJ4kQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAC+wgEFpAP3crdu6QxtcXdbo1aVHVJvg89gZKEaWUjLfTG8O6jE4VD1/SPxFcDXIHYAN8CorlSySItQDph2CZxp799CX9Q+cTmnLtQ2ZpG3rC6B3zkC/pnIV0uz7oM5nFCBzMFJJIs3yc13wyZLTpMouDEBhnPy9UqjCykWDfxLMcO9ocXf3nk9m/866Ms9BUrsU3H8l4ugarYvMw68bT1zrdiu7VvJID744YDdmjybL8PVHADQVd21Z6bGCyvZcp0WGW9Xugw+XlfPLkNLog2wTiPVKrniZCULPsOL/jbgBIGL9Y/iE2qrNlv2p1Obo6ZJ+HXTkAeXhbqysOa0xf9A=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"413910027af146b3902694124a9f803e"}, [
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
  '1a031c10-c379-4f7c-8026-45417cedd5ac',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 14:27:01 GMT',
  'Content-Length',
  '1349'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canretrieveallversionsofacertificate-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canretrieveallversionsofacertificate-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAqjYwGZ7Fv3txJt+FSBiwmP8FedXolTRkqCF2+VDk5+qI1eNv4T2MWKaNcacUpW/M7d3iIRI/oPVNqejye/eukpaTeRANOMXLSUmPnkT40zYVJODxvlID3PQuU/z8zZ3zcwe9Q/A4/Y1mSfz5JsINk+26h96JC3trqeouDVLNL4JKKmcClpUL50THcpwTf7hsGnhyvj/P++GbeCN+NDZzVKJa5AkDL75DlzzbbBW1tHj8ecdyT+uXrdWI54gKu5tyE8zZren+0Z/q6+wFVISXNXcCTdWrxB4a8yxeCpdmUQalNQVMyVsfz8uk1ySTGrvnuYp1gD1mFRlbL0yVTrJ4kQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAC+wgEFpAP3crdu6QxtcXdbo1aVHVJvg89gZKEaWUjLfTG8O6jE4VD1/SPxFcDXIHYAN8CorlSySItQDph2CZxp799CX9Q+cTmnLtQ2ZpG3rC6B3zkC/pnIV0uz7oM5nFCBzMFJJIs3yc13wyZLTpMouDEBhnPy9UqjCykWDfxLMcO9ocXf3nk9m/866Ms9BUrsU3H8l4ugarYvMw68bT1zrdiu7VvJID744YDdmjybL8PVHADQVd21Z6bGCyvZcp0WGW9Xugw+XlfPLkNLog2wTiPVKrniZCULPsOL/jbgBIGL9Y/iE2qrNlv2p1Obo6ZJ+HXTkAeXhbqysOa0xf9A=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"413910027af146b3902694124a9f803e"}, [
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
  '63f8d8eb-5d4e-4ec3-970a-e2a62d979e81',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 14:27:03 GMT',
  'Content-Length',
  '1349'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canretrieveallversionsofacertificate-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canretrieveallversionsofacertificate-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAqjYwGZ7Fv3txJt+FSBiwmP8FedXolTRkqCF2+VDk5+qI1eNv4T2MWKaNcacUpW/M7d3iIRI/oPVNqejye/eukpaTeRANOMXLSUmPnkT40zYVJODxvlID3PQuU/z8zZ3zcwe9Q/A4/Y1mSfz5JsINk+26h96JC3trqeouDVLNL4JKKmcClpUL50THcpwTf7hsGnhyvj/P++GbeCN+NDZzVKJa5AkDL75DlzzbbBW1tHj8ecdyT+uXrdWI54gKu5tyE8zZren+0Z/q6+wFVISXNXcCTdWrxB4a8yxeCpdmUQalNQVMyVsfz8uk1ySTGrvnuYp1gD1mFRlbL0yVTrJ4kQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAC+wgEFpAP3crdu6QxtcXdbo1aVHVJvg89gZKEaWUjLfTG8O6jE4VD1/SPxFcDXIHYAN8CorlSySItQDph2CZxp799CX9Q+cTmnLtQ2ZpG3rC6B3zkC/pnIV0uz7oM5nFCBzMFJJIs3yc13wyZLTpMouDEBhnPy9UqjCykWDfxLMcO9ocXf3nk9m/866Ms9BUrsU3H8l4ugarYvMw68bT1zrdiu7VvJID744YDdmjybL8PVHADQVd21Z6bGCyvZcp0WGW9Xugw+XlfPLkNLog2wTiPVKrniZCULPsOL/jbgBIGL9Y/iE2qrNlv2p1Obo6ZJ+HXTkAeXhbqysOa0xf9A=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"413910027af146b3902694124a9f803e"}, [
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
  'c37d4706-2faa-4831-b4c1-d1b26e581e15',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 14:27:04 GMT',
  'Content-Length',
  '1349'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canretrieveallversionsofacertificate-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canretrieveallversionsofacertificate-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAqjYwGZ7Fv3txJt+FSBiwmP8FedXolTRkqCF2+VDk5+qI1eNv4T2MWKaNcacUpW/M7d3iIRI/oPVNqejye/eukpaTeRANOMXLSUmPnkT40zYVJODxvlID3PQuU/z8zZ3zcwe9Q/A4/Y1mSfz5JsINk+26h96JC3trqeouDVLNL4JKKmcClpUL50THcpwTf7hsGnhyvj/P++GbeCN+NDZzVKJa5AkDL75DlzzbbBW1tHj8ecdyT+uXrdWI54gKu5tyE8zZren+0Z/q6+wFVISXNXcCTdWrxB4a8yxeCpdmUQalNQVMyVsfz8uk1ySTGrvnuYp1gD1mFRlbL0yVTrJ4kQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAC+wgEFpAP3crdu6QxtcXdbo1aVHVJvg89gZKEaWUjLfTG8O6jE4VD1/SPxFcDXIHYAN8CorlSySItQDph2CZxp799CX9Q+cTmnLtQ2ZpG3rC6B3zkC/pnIV0uz7oM5nFCBzMFJJIs3yc13wyZLTpMouDEBhnPy9UqjCykWDfxLMcO9ocXf3nk9m/866Ms9BUrsU3H8l4ugarYvMw68bT1zrdiu7VvJID744YDdmjybL8PVHADQVd21Z6bGCyvZcp0WGW9Xugw+XlfPLkNLog2wTiPVKrniZCULPsOL/jbgBIGL9Y/iE2qrNlv2p1Obo6ZJ+HXTkAeXhbqysOa0xf9A=","cancellation_requested":false,"status":"completed","target":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canretrieveallversionsofacertificate-","request_id":"413910027af146b3902694124a9f803e"}, [
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
  '2abedd52-407d-42d0-8689-b5fa0c4808ad',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 14:27:07 GMT',
  'Content-Length',
  '1325'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canretrieveallversionsofacertificate-/')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canretrieveallversionsofacertificate-/49471b6bee4144c9a5016e7b510c8d67","kid":"https://keyvault_name.vault.azure.net/keys/listCertificateName-canretrieveallversionsofacertificate-/49471b6bee4144c9a5016e7b510c8d67","sid":"https://keyvault_name.vault.azure.net/secrets/listCertificateName-canretrieveallversionsofacertificate-/49471b6bee4144c9a5016e7b510c8d67","x5t":"386RUM8hWy4QD3r-E_0Qxo5VLIs","cer":"MIIDKDCCAhCgAwIBAgIQKL+KSDlRQdKG+WUaBaSmXzANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjAwNjI1MTQxNzA2WhcNMjEwNjI1MTQyNzA2WjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQCqNjAZnsW/e3Em34VIGLCY/wV51eiVNGSoIXb5UOTn6ojV42/hPYxYpo1xpxSlb8zt3eIhEj+g9U2p6PJ7966SlpN5EA04xctJSY+eRPjTNhUk4PG+UgPc9C5T/PzNnfNzB71D8Dj9jWZJ/Pkmwg2T7bqH3okLe2up6i4NUs0vgkoqZwKWlQvnRMdynBN/uGwaeHK+P8/74Zt4I340NnNUolrkCQMvvkOXPNtsFbW0ePx5x3JP65et1YjniAq7m3ITzNmt6f7Rn+rr7AVUhJc1dwJN1avEHhrzLF4Kl2ZRBqU1BUzJWx/Py6TXJJMau+e5inWAPWYVGVsvTJVOsniRAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBRptoISg3rl+H9nc+84XaxwE2YjfDAdBgNVHQ4EFgQUabaCEoN65fh/Z3PvOF2scBNmI3wwDQYJKoZIhvcNAQELBQADggEBADQtfVPIHW6OrAzMVrH/4nHNKvP1X1jdtgHPGEPEwJSMJXtrk9CvbMymdXYZzhahVQCjyjyVskkBdtCVybMyZfiU0Nr7M1DiTaDVkFe/dVv0XjFAMUVljfHwaE51xqglnAnmfWNKc9sYIdssTXRNYxjToGkcTCfZsDzNNvdYiKX9kEqNS5I4i6R5tlxcP/kwg17s2nytPOQYP7qYTQdsz/TikfQA+OpzRQ0KSb5QZ7aJlnljgZiYl4v6pprbbEkhIF93JixXhJkyenpqWvCRYE9nUzc5bgssG3lTn7wrOIe3H6Yd2yZve9w3xcSWZZhKN1PwSXq5dKk3I4gAlmsZ9iU=","attributes":{"enabled":true,"nbf":1593094626,"exp":1624631226,"created":1593095227,"updated":1593095227,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90},"tags":{"tag":"tag02"},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canretrieveallversionsofacertificate-/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1593095190,"updated":1593095204}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canretrieveallversionsofacertificate-/pending"}}, [
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
  'd23ea860-9c73-4708-9f14-2f65d0b1e85d',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 14:27:07 GMT',
  'Content-Length',
  '2658'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/certificates/listCertificateName-canretrieveallversionsofacertificate-/create', {"policy":{"key_props":{},"secret_props":{},"x509_props":{"subject":"cn=MyCert","sans":{}},"issuer":{"name":"Self"},"attributes":{"enabled":true}},"attributes":{"enabled":true},"tags":{"tag":"tag03"}})
  .query(true)
  .reply(202, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canretrieveallversionsofacertificate-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA0QaQyV9QYx+Xn+AyUHDhopz+SHQlI3fCtIFHsdiSS6MbRnLKAIaoUIFWVpbqvkLv5f3ObnL0aFslB29IIetYV1nRSy3FbgMguLPggEAUMdke2YibPx2tC5eCfJMsF18DybKV2f1WI0PQqJ9JdtnLPF5Dr7c9hApUhVx8Fo6iLA/uYFR2Gsn0vygmZ7TDyV2nG46TPoyguRfffs1La80XUkKxpNlC9fg0aShKBiwX2WAl1XGVnXKoj7VzHveYc70pcqg1vakuLaEqNWmdN2eqzfXQkx8t0sv+QBXDn/rffuSjowgKCALkaRDF57cWsI60b77YARfy2HRGNXWaAbD+kQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAH9xFzvNqCiKHxVSw6AAyGCSVeOr9cUnHOLEznDS76pDL7ugFUV3srOqyFR91fGIZGhdzBwBgs/muGTROvLNoY+8IIZCXdpdzKtSOmwFvxw0rZcaADB3MlS4FxDrUxfmlNe8NFUcPv4wiY/iOIK3JhogK2EXCpUb4AOAa2Wnp+SgK2FPrNUSXIeQO1IQWGSZSVt001Rr2h3kwwPsDJ9isobY9k1ajh5hnL3SU8D+rvHK+HVtYcflUbd9Mrd4ACVa9+7LxLVCM0+hIAuyWZeJ+Wppakv1kjlW8R2n2Y6Mo79AJn/lNgwRviSUtlAmcb72OTZmMstnkP1e5Y4gKTHmZ54=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"6804f9c3675943bd8794b659ce54f496"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://keyvault_name.vault.azure.net/certificates/listCertificateName-canretrieveallversionsofacertificate-/pending?api-version=7.1-preview&request_id=6804f9c3675943bd8794b659ce54f496',
  'Retry-After',
  '10',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'b8ecf672-96f0-41eb-bdae-70cae7201292',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 14:27:08 GMT',
  'Content-Length',
  '1349'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canretrieveallversionsofacertificate-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canretrieveallversionsofacertificate-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA0QaQyV9QYx+Xn+AyUHDhopz+SHQlI3fCtIFHsdiSS6MbRnLKAIaoUIFWVpbqvkLv5f3ObnL0aFslB29IIetYV1nRSy3FbgMguLPggEAUMdke2YibPx2tC5eCfJMsF18DybKV2f1WI0PQqJ9JdtnLPF5Dr7c9hApUhVx8Fo6iLA/uYFR2Gsn0vygmZ7TDyV2nG46TPoyguRfffs1La80XUkKxpNlC9fg0aShKBiwX2WAl1XGVnXKoj7VzHveYc70pcqg1vakuLaEqNWmdN2eqzfXQkx8t0sv+QBXDn/rffuSjowgKCALkaRDF57cWsI60b77YARfy2HRGNXWaAbD+kQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAH9xFzvNqCiKHxVSw6AAyGCSVeOr9cUnHOLEznDS76pDL7ugFUV3srOqyFR91fGIZGhdzBwBgs/muGTROvLNoY+8IIZCXdpdzKtSOmwFvxw0rZcaADB3MlS4FxDrUxfmlNe8NFUcPv4wiY/iOIK3JhogK2EXCpUb4AOAa2Wnp+SgK2FPrNUSXIeQO1IQWGSZSVt001Rr2h3kwwPsDJ9isobY9k1ajh5hnL3SU8D+rvHK+HVtYcflUbd9Mrd4ACVa9+7LxLVCM0+hIAuyWZeJ+Wppakv1kjlW8R2n2Y6Mo79AJn/lNgwRviSUtlAmcb72OTZmMstnkP1e5Y4gKTHmZ54=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"6804f9c3675943bd8794b659ce54f496"}, [
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
  'a0aec98b-576d-490d-98e0-692175c8d6f1',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 14:27:08 GMT',
  'Content-Length',
  '1349'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canretrieveallversionsofacertificate-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canretrieveallversionsofacertificate-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA0QaQyV9QYx+Xn+AyUHDhopz+SHQlI3fCtIFHsdiSS6MbRnLKAIaoUIFWVpbqvkLv5f3ObnL0aFslB29IIetYV1nRSy3FbgMguLPggEAUMdke2YibPx2tC5eCfJMsF18DybKV2f1WI0PQqJ9JdtnLPF5Dr7c9hApUhVx8Fo6iLA/uYFR2Gsn0vygmZ7TDyV2nG46TPoyguRfffs1La80XUkKxpNlC9fg0aShKBiwX2WAl1XGVnXKoj7VzHveYc70pcqg1vakuLaEqNWmdN2eqzfXQkx8t0sv+QBXDn/rffuSjowgKCALkaRDF57cWsI60b77YARfy2HRGNXWaAbD+kQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAH9xFzvNqCiKHxVSw6AAyGCSVeOr9cUnHOLEznDS76pDL7ugFUV3srOqyFR91fGIZGhdzBwBgs/muGTROvLNoY+8IIZCXdpdzKtSOmwFvxw0rZcaADB3MlS4FxDrUxfmlNe8NFUcPv4wiY/iOIK3JhogK2EXCpUb4AOAa2Wnp+SgK2FPrNUSXIeQO1IQWGSZSVt001Rr2h3kwwPsDJ9isobY9k1ajh5hnL3SU8D+rvHK+HVtYcflUbd9Mrd4ACVa9+7LxLVCM0+hIAuyWZeJ+Wppakv1kjlW8R2n2Y6Mo79AJn/lNgwRviSUtlAmcb72OTZmMstnkP1e5Y4gKTHmZ54=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"6804f9c3675943bd8794b659ce54f496"}, [
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
  'aa50adcf-94fe-4e75-a8c0-d12fe21fe9c5',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 14:27:08 GMT',
  'Content-Length',
  '1349'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canretrieveallversionsofacertificate-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canretrieveallversionsofacertificate-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA0QaQyV9QYx+Xn+AyUHDhopz+SHQlI3fCtIFHsdiSS6MbRnLKAIaoUIFWVpbqvkLv5f3ObnL0aFslB29IIetYV1nRSy3FbgMguLPggEAUMdke2YibPx2tC5eCfJMsF18DybKV2f1WI0PQqJ9JdtnLPF5Dr7c9hApUhVx8Fo6iLA/uYFR2Gsn0vygmZ7TDyV2nG46TPoyguRfffs1La80XUkKxpNlC9fg0aShKBiwX2WAl1XGVnXKoj7VzHveYc70pcqg1vakuLaEqNWmdN2eqzfXQkx8t0sv+QBXDn/rffuSjowgKCALkaRDF57cWsI60b77YARfy2HRGNXWaAbD+kQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAH9xFzvNqCiKHxVSw6AAyGCSVeOr9cUnHOLEznDS76pDL7ugFUV3srOqyFR91fGIZGhdzBwBgs/muGTROvLNoY+8IIZCXdpdzKtSOmwFvxw0rZcaADB3MlS4FxDrUxfmlNe8NFUcPv4wiY/iOIK3JhogK2EXCpUb4AOAa2Wnp+SgK2FPrNUSXIeQO1IQWGSZSVt001Rr2h3kwwPsDJ9isobY9k1ajh5hnL3SU8D+rvHK+HVtYcflUbd9Mrd4ACVa9+7LxLVCM0+hIAuyWZeJ+Wppakv1kjlW8R2n2Y6Mo79AJn/lNgwRviSUtlAmcb72OTZmMstnkP1e5Y4gKTHmZ54=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"6804f9c3675943bd8794b659ce54f496"}, [
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
  'a94edf5e-a950-4609-985a-f18f8c0d9672',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 14:27:10 GMT',
  'Content-Length',
  '1349'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canretrieveallversionsofacertificate-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canretrieveallversionsofacertificate-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA0QaQyV9QYx+Xn+AyUHDhopz+SHQlI3fCtIFHsdiSS6MbRnLKAIaoUIFWVpbqvkLv5f3ObnL0aFslB29IIetYV1nRSy3FbgMguLPggEAUMdke2YibPx2tC5eCfJMsF18DybKV2f1WI0PQqJ9JdtnLPF5Dr7c9hApUhVx8Fo6iLA/uYFR2Gsn0vygmZ7TDyV2nG46TPoyguRfffs1La80XUkKxpNlC9fg0aShKBiwX2WAl1XGVnXKoj7VzHveYc70pcqg1vakuLaEqNWmdN2eqzfXQkx8t0sv+QBXDn/rffuSjowgKCALkaRDF57cWsI60b77YARfy2HRGNXWaAbD+kQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAH9xFzvNqCiKHxVSw6AAyGCSVeOr9cUnHOLEznDS76pDL7ugFUV3srOqyFR91fGIZGhdzBwBgs/muGTROvLNoY+8IIZCXdpdzKtSOmwFvxw0rZcaADB3MlS4FxDrUxfmlNe8NFUcPv4wiY/iOIK3JhogK2EXCpUb4AOAa2Wnp+SgK2FPrNUSXIeQO1IQWGSZSVt001Rr2h3kwwPsDJ9isobY9k1ajh5hnL3SU8D+rvHK+HVtYcflUbd9Mrd4ACVa9+7LxLVCM0+hIAuyWZeJ+Wppakv1kjlW8R2n2Y6Mo79AJn/lNgwRviSUtlAmcb72OTZmMstnkP1e5Y4gKTHmZ54=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"6804f9c3675943bd8794b659ce54f496"}, [
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
  'afb16c9a-881b-4abf-9af3-f5d36ebf77da',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 14:27:12 GMT',
  'Content-Length',
  '1349'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canretrieveallversionsofacertificate-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canretrieveallversionsofacertificate-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA0QaQyV9QYx+Xn+AyUHDhopz+SHQlI3fCtIFHsdiSS6MbRnLKAIaoUIFWVpbqvkLv5f3ObnL0aFslB29IIetYV1nRSy3FbgMguLPggEAUMdke2YibPx2tC5eCfJMsF18DybKV2f1WI0PQqJ9JdtnLPF5Dr7c9hApUhVx8Fo6iLA/uYFR2Gsn0vygmZ7TDyV2nG46TPoyguRfffs1La80XUkKxpNlC9fg0aShKBiwX2WAl1XGVnXKoj7VzHveYc70pcqg1vakuLaEqNWmdN2eqzfXQkx8t0sv+QBXDn/rffuSjowgKCALkaRDF57cWsI60b77YARfy2HRGNXWaAbD+kQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAH9xFzvNqCiKHxVSw6AAyGCSVeOr9cUnHOLEznDS76pDL7ugFUV3srOqyFR91fGIZGhdzBwBgs/muGTROvLNoY+8IIZCXdpdzKtSOmwFvxw0rZcaADB3MlS4FxDrUxfmlNe8NFUcPv4wiY/iOIK3JhogK2EXCpUb4AOAa2Wnp+SgK2FPrNUSXIeQO1IQWGSZSVt001Rr2h3kwwPsDJ9isobY9k1ajh5hnL3SU8D+rvHK+HVtYcflUbd9Mrd4ACVa9+7LxLVCM0+hIAuyWZeJ+Wppakv1kjlW8R2n2Y6Mo79AJn/lNgwRviSUtlAmcb72OTZmMstnkP1e5Y4gKTHmZ54=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"6804f9c3675943bd8794b659ce54f496"}, [
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
  '01919168-9a12-4cb3-8e26-2a47cc850ad7',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 14:27:14 GMT',
  'Content-Length',
  '1349'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canretrieveallversionsofacertificate-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canretrieveallversionsofacertificate-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA0QaQyV9QYx+Xn+AyUHDhopz+SHQlI3fCtIFHsdiSS6MbRnLKAIaoUIFWVpbqvkLv5f3ObnL0aFslB29IIetYV1nRSy3FbgMguLPggEAUMdke2YibPx2tC5eCfJMsF18DybKV2f1WI0PQqJ9JdtnLPF5Dr7c9hApUhVx8Fo6iLA/uYFR2Gsn0vygmZ7TDyV2nG46TPoyguRfffs1La80XUkKxpNlC9fg0aShKBiwX2WAl1XGVnXKoj7VzHveYc70pcqg1vakuLaEqNWmdN2eqzfXQkx8t0sv+QBXDn/rffuSjowgKCALkaRDF57cWsI60b77YARfy2HRGNXWaAbD+kQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAH9xFzvNqCiKHxVSw6AAyGCSVeOr9cUnHOLEznDS76pDL7ugFUV3srOqyFR91fGIZGhdzBwBgs/muGTROvLNoY+8IIZCXdpdzKtSOmwFvxw0rZcaADB3MlS4FxDrUxfmlNe8NFUcPv4wiY/iOIK3JhogK2EXCpUb4AOAa2Wnp+SgK2FPrNUSXIeQO1IQWGSZSVt001Rr2h3kwwPsDJ9isobY9k1ajh5hnL3SU8D+rvHK+HVtYcflUbd9Mrd4ACVa9+7LxLVCM0+hIAuyWZeJ+Wppakv1kjlW8R2n2Y6Mo79AJn/lNgwRviSUtlAmcb72OTZmMstnkP1e5Y4gKTHmZ54=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"6804f9c3675943bd8794b659ce54f496"}, [
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
  '7e29fe12-53b1-4de3-85da-22aa1e51ad65',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 14:27:16 GMT',
  'Content-Length',
  '1349'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canretrieveallversionsofacertificate-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canretrieveallversionsofacertificate-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA0QaQyV9QYx+Xn+AyUHDhopz+SHQlI3fCtIFHsdiSS6MbRnLKAIaoUIFWVpbqvkLv5f3ObnL0aFslB29IIetYV1nRSy3FbgMguLPggEAUMdke2YibPx2tC5eCfJMsF18DybKV2f1WI0PQqJ9JdtnLPF5Dr7c9hApUhVx8Fo6iLA/uYFR2Gsn0vygmZ7TDyV2nG46TPoyguRfffs1La80XUkKxpNlC9fg0aShKBiwX2WAl1XGVnXKoj7VzHveYc70pcqg1vakuLaEqNWmdN2eqzfXQkx8t0sv+QBXDn/rffuSjowgKCALkaRDF57cWsI60b77YARfy2HRGNXWaAbD+kQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAH9xFzvNqCiKHxVSw6AAyGCSVeOr9cUnHOLEznDS76pDL7ugFUV3srOqyFR91fGIZGhdzBwBgs/muGTROvLNoY+8IIZCXdpdzKtSOmwFvxw0rZcaADB3MlS4FxDrUxfmlNe8NFUcPv4wiY/iOIK3JhogK2EXCpUb4AOAa2Wnp+SgK2FPrNUSXIeQO1IQWGSZSVt001Rr2h3kwwPsDJ9isobY9k1ajh5hnL3SU8D+rvHK+HVtYcflUbd9Mrd4ACVa9+7LxLVCM0+hIAuyWZeJ+Wppakv1kjlW8R2n2Y6Mo79AJn/lNgwRviSUtlAmcb72OTZmMstnkP1e5Y4gKTHmZ54=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"6804f9c3675943bd8794b659ce54f496"}, [
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
  'f831902c-0f0d-41b3-83e7-e70a9cecc53f',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 14:27:17 GMT',
  'Content-Length',
  '1349'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canretrieveallversionsofacertificate-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canretrieveallversionsofacertificate-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA0QaQyV9QYx+Xn+AyUHDhopz+SHQlI3fCtIFHsdiSS6MbRnLKAIaoUIFWVpbqvkLv5f3ObnL0aFslB29IIetYV1nRSy3FbgMguLPggEAUMdke2YibPx2tC5eCfJMsF18DybKV2f1WI0PQqJ9JdtnLPF5Dr7c9hApUhVx8Fo6iLA/uYFR2Gsn0vygmZ7TDyV2nG46TPoyguRfffs1La80XUkKxpNlC9fg0aShKBiwX2WAl1XGVnXKoj7VzHveYc70pcqg1vakuLaEqNWmdN2eqzfXQkx8t0sv+QBXDn/rffuSjowgKCALkaRDF57cWsI60b77YARfy2HRGNXWaAbD+kQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAH9xFzvNqCiKHxVSw6AAyGCSVeOr9cUnHOLEznDS76pDL7ugFUV3srOqyFR91fGIZGhdzBwBgs/muGTROvLNoY+8IIZCXdpdzKtSOmwFvxw0rZcaADB3MlS4FxDrUxfmlNe8NFUcPv4wiY/iOIK3JhogK2EXCpUb4AOAa2Wnp+SgK2FPrNUSXIeQO1IQWGSZSVt001Rr2h3kwwPsDJ9isobY9k1ajh5hnL3SU8D+rvHK+HVtYcflUbd9Mrd4ACVa9+7LxLVCM0+hIAuyWZeJ+Wppakv1kjlW8R2n2Y6Mo79AJn/lNgwRviSUtlAmcb72OTZmMstnkP1e5Y4gKTHmZ54=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"6804f9c3675943bd8794b659ce54f496"}, [
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
  '8c09dfb6-6a84-4b75-900f-b026255c8f25',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 14:27:19 GMT',
  'Content-Length',
  '1349'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canretrieveallversionsofacertificate-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canretrieveallversionsofacertificate-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA0QaQyV9QYx+Xn+AyUHDhopz+SHQlI3fCtIFHsdiSS6MbRnLKAIaoUIFWVpbqvkLv5f3ObnL0aFslB29IIetYV1nRSy3FbgMguLPggEAUMdke2YibPx2tC5eCfJMsF18DybKV2f1WI0PQqJ9JdtnLPF5Dr7c9hApUhVx8Fo6iLA/uYFR2Gsn0vygmZ7TDyV2nG46TPoyguRfffs1La80XUkKxpNlC9fg0aShKBiwX2WAl1XGVnXKoj7VzHveYc70pcqg1vakuLaEqNWmdN2eqzfXQkx8t0sv+QBXDn/rffuSjowgKCALkaRDF57cWsI60b77YARfy2HRGNXWaAbD+kQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAH9xFzvNqCiKHxVSw6AAyGCSVeOr9cUnHOLEznDS76pDL7ugFUV3srOqyFR91fGIZGhdzBwBgs/muGTROvLNoY+8IIZCXdpdzKtSOmwFvxw0rZcaADB3MlS4FxDrUxfmlNe8NFUcPv4wiY/iOIK3JhogK2EXCpUb4AOAa2Wnp+SgK2FPrNUSXIeQO1IQWGSZSVt001Rr2h3kwwPsDJ9isobY9k1ajh5hnL3SU8D+rvHK+HVtYcflUbd9Mrd4ACVa9+7LxLVCM0+hIAuyWZeJ+Wppakv1kjlW8R2n2Y6Mo79AJn/lNgwRviSUtlAmcb72OTZmMstnkP1e5Y4gKTHmZ54=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"6804f9c3675943bd8794b659ce54f496"}, [
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
  'd59d0874-907c-47d8-ac99-940169f4b851',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 14:27:23 GMT',
  'Content-Length',
  '1349'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canretrieveallversionsofacertificate-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canretrieveallversionsofacertificate-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA0QaQyV9QYx+Xn+AyUHDhopz+SHQlI3fCtIFHsdiSS6MbRnLKAIaoUIFWVpbqvkLv5f3ObnL0aFslB29IIetYV1nRSy3FbgMguLPggEAUMdke2YibPx2tC5eCfJMsF18DybKV2f1WI0PQqJ9JdtnLPF5Dr7c9hApUhVx8Fo6iLA/uYFR2Gsn0vygmZ7TDyV2nG46TPoyguRfffs1La80XUkKxpNlC9fg0aShKBiwX2WAl1XGVnXKoj7VzHveYc70pcqg1vakuLaEqNWmdN2eqzfXQkx8t0sv+QBXDn/rffuSjowgKCALkaRDF57cWsI60b77YARfy2HRGNXWaAbD+kQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAH9xFzvNqCiKHxVSw6AAyGCSVeOr9cUnHOLEznDS76pDL7ugFUV3srOqyFR91fGIZGhdzBwBgs/muGTROvLNoY+8IIZCXdpdzKtSOmwFvxw0rZcaADB3MlS4FxDrUxfmlNe8NFUcPv4wiY/iOIK3JhogK2EXCpUb4AOAa2Wnp+SgK2FPrNUSXIeQO1IQWGSZSVt001Rr2h3kwwPsDJ9isobY9k1ajh5hnL3SU8D+rvHK+HVtYcflUbd9Mrd4ACVa9+7LxLVCM0+hIAuyWZeJ+Wppakv1kjlW8R2n2Y6Mo79AJn/lNgwRviSUtlAmcb72OTZmMstnkP1e5Y4gKTHmZ54=","cancellation_requested":false,"status":"completed","target":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canretrieveallversionsofacertificate-","request_id":"6804f9c3675943bd8794b659ce54f496"}, [
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
  '086e082a-6ff9-4353-94bb-f337e89fbaf5',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 14:27:24 GMT',
  'Content-Length',
  '1325'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canretrieveallversionsofacertificate-/')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canretrieveallversionsofacertificate-/de829ebf4c394b4d970cb62272be85b9","kid":"https://keyvault_name.vault.azure.net/keys/listCertificateName-canretrieveallversionsofacertificate-/de829ebf4c394b4d970cb62272be85b9","sid":"https://keyvault_name.vault.azure.net/secrets/listCertificateName-canretrieveallversionsofacertificate-/de829ebf4c394b4d970cb62272be85b9","x5t":"HwTauQzbHbfznGJ0QRewBwnkDyI","cer":"MIIDKDCCAhCgAwIBAgIQYi6RNORCRp2mzJrchqd4gzANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjAwNjI1MTQxNzIzWhcNMjEwNjI1MTQyNzIzWjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQDRBpDJX1BjH5ef4DJQcOGinP5IdCUjd8K0gUex2JJLoxtGcsoAhqhQgVZWluq+Qu/l/c5ucvRoWyUHb0gh61hXWdFLLcVuAyC4s+CAQBQx2R7ZiJs/Ha0Ll4J8kywXXwPJspXZ/VYjQ9Con0l22cs8XkOvtz2EClSFXHwWjqIsD+5gVHYayfS/KCZntMPJXacbjpM+jKC5F99+zUtrzRdSQrGk2UL1+DRpKEoGLBfZYCXVcZWdcqiPtXMe95hzvSlyqDW9qS4toSo1aZ03Z6rN9dCTHy3Sy/5AFcOf+t9+5KOjCAoIAuRpEMXntxawjrRvvtgBF/LYdEY1dZoBsP6RAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBQ/jiNiN14xHpAwvmyePPSBddt/VDAdBgNVHQ4EFgQUP44jYjdeMR6QML5snjz0gXXbf1QwDQYJKoZIhvcNAQELBQADggEBABUm/Zy5Yzvx/5+YToHPfWSKhCOoXFqVyIMTAiLmpnpKnrgNT+WODP+ARBXNP9xxfIbEeOA0r9aV3f29bsHT47WBYRHC8SAukGYTQ49pj1ynAcmXtVq1h36ZXIDstsNwyFfGeY7pmUPxjze8dUpU1MbZT92cubWK2SuWoxEuBiq7Ocx1sxA2B9YzOqIp8GsS+b73wfwrhlQu07zn/77hFrP2AGnGQnWMihviQ36oS1SkSqyOrk+h1T5jK5w5rZkfgAOT9Q9y/X2wYc1NEobkzzNH4w8L64nGi+wea2R5lkvG+eEo1kCEv6STNQBqKh7UigaArx+6ckNnbSVNSybtxQY=","attributes":{"enabled":true,"nbf":1593094643,"exp":1624631243,"created":1593095243,"updated":1593095243,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90},"tags":{"tag":"tag03"},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canretrieveallversionsofacertificate-/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1593095190,"updated":1593095228}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canretrieveallversionsofacertificate-/pending"}}, [
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
  '11bd2893-c48b-4772-8a57-7382c2ac1ae9',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 14:27:24 GMT',
  'Content-Length',
  '2658'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canretrieveallversionsofacertificate-/versions')
  .query(true)
  .reply(200, {"value":[{"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canretrieveallversionsofacertificate-/2f4d75ba2ae84637b7051e0ca496caa8","x5t":"K1L73dX975MJ9G0kESqJrgObo5g","attributes":{"enabled":true,"nbf":1593094603,"exp":1624631203,"created":1593095203,"updated":1593095203},"tags":{"tag":"tag01"},"subject":""},{"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canretrieveallversionsofacertificate-/49471b6bee4144c9a5016e7b510c8d67","x5t":"386RUM8hWy4QD3r-E_0Qxo5VLIs","attributes":{"enabled":true,"nbf":1593094626,"exp":1624631226,"created":1593095227,"updated":1593095227},"tags":{"tag":"tag02"},"subject":""},{"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canretrieveallversionsofacertificate-/de829ebf4c394b4d970cb62272be85b9","x5t":"HwTauQzbHbfznGJ0QRewBwnkDyI","attributes":{"enabled":true,"nbf":1593094643,"exp":1624631243,"created":1593095243,"updated":1593095243},"tags":{"tag":"tag03"},"subject":""}],"nextLink":null}, [
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
  '04b6eb70-b47e-4d81-92b9-e5d0aa6fac29',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 14:27:25 GMT',
  'Content-Length',
  '1077'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canretrieveallversionsofacertificate-/2f4d75ba2ae84637b7051e0ca496caa8')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canretrieveallversionsofacertificate-/2f4d75ba2ae84637b7051e0ca496caa8","kid":"https://keyvault_name.vault.azure.net/keys/listCertificateName-canretrieveallversionsofacertificate-/2f4d75ba2ae84637b7051e0ca496caa8","sid":"https://keyvault_name.vault.azure.net/secrets/listCertificateName-canretrieveallversionsofacertificate-/2f4d75ba2ae84637b7051e0ca496caa8","x5t":"K1L73dX975MJ9G0kESqJrgObo5g","cer":"MIIDKDCCAhCgAwIBAgIQEeGMcirmSAaqC2UTVIW1tDANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjAwNjI1MTQxNjQzWhcNMjEwNjI1MTQyNjQzWjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQCpjOAs493+c4rakhunkdf0DGennAiIL5Jgxre8s7kvpmTPTBQleNAxbNuuTqjuBmz83EHnSv+JOupPp/0bjADLVRV8LtMBpbQ218QUR1uFpZXuN/wuHr9xJNGsj4/WGAJItpBFZOdaqXFaDp6RvXRL+Jg2J9ShqQQTYRmUzDZr9DiVBAT9Tkdr5JOh8sRvxrsIEYrmntLgPrBqeMHgyfqyBsl0IaqRAS5gWM6A8DGOSM/+FBQqIS8S4p5FOXozUN/FBN6R/oNFtZFVC/yFBArrXYRdISQLLKFISE12mNma4wjQv9klISBZSwN6/MMFiNzt/Xm9ONcaIOiC7VTQM6oNAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBTY1Prbq9xaYbPoNnKmyreFGm753TAdBgNVHQ4EFgQU2NT626vcWmGz6DZypsq3hRpu+d0wDQYJKoZIhvcNAQELBQADggEBAFECfub7EqphR/Njj/fGh/FJ5pT03Us2qwn2pY/t6WAYV+6w3Q5+ukvTdzOvTyLsOQNOZ8HyP0YXUMu5OCkAbH2yvPXAZnb7Zl6idM7CkF50p13J4j892NBEFF17wuvT3K5gADgKviUEBEj41Q4umGmX2396uH9uoImt2cQNZbVTzZzKCbHIRryX6ZzmzqdFZvn3TkUpahZKOKxMo3FAvrebCq2FWnC8MiygrCO1k0gm3q6Xb4izoPvwP4tMjqGZ9UTIUHm137zhYEZWn/JqN+Qo2fT2tUKW7pFQqao3EEHGIq1fb2otiw7Cor0NYg11weMONZE3fx05ppdgikQ/yoU=","attributes":{"enabled":true,"nbf":1593094603,"exp":1624631203,"created":1593095203,"updated":1593095203,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90},"tags":{"tag":"tag01"}}, [
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
  '1aa619cd-5426-4b55-b981-c916e7e45f0b',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 14:27:25 GMT',
  'Content-Length',
  '1819'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canretrieveallversionsofacertificate-/49471b6bee4144c9a5016e7b510c8d67')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canretrieveallversionsofacertificate-/49471b6bee4144c9a5016e7b510c8d67","kid":"https://keyvault_name.vault.azure.net/keys/listCertificateName-canretrieveallversionsofacertificate-/49471b6bee4144c9a5016e7b510c8d67","sid":"https://keyvault_name.vault.azure.net/secrets/listCertificateName-canretrieveallversionsofacertificate-/49471b6bee4144c9a5016e7b510c8d67","x5t":"386RUM8hWy4QD3r-E_0Qxo5VLIs","cer":"MIIDKDCCAhCgAwIBAgIQKL+KSDlRQdKG+WUaBaSmXzANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjAwNjI1MTQxNzA2WhcNMjEwNjI1MTQyNzA2WjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQCqNjAZnsW/e3Em34VIGLCY/wV51eiVNGSoIXb5UOTn6ojV42/hPYxYpo1xpxSlb8zt3eIhEj+g9U2p6PJ7966SlpN5EA04xctJSY+eRPjTNhUk4PG+UgPc9C5T/PzNnfNzB71D8Dj9jWZJ/Pkmwg2T7bqH3okLe2up6i4NUs0vgkoqZwKWlQvnRMdynBN/uGwaeHK+P8/74Zt4I340NnNUolrkCQMvvkOXPNtsFbW0ePx5x3JP65et1YjniAq7m3ITzNmt6f7Rn+rr7AVUhJc1dwJN1avEHhrzLF4Kl2ZRBqU1BUzJWx/Py6TXJJMau+e5inWAPWYVGVsvTJVOsniRAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBRptoISg3rl+H9nc+84XaxwE2YjfDAdBgNVHQ4EFgQUabaCEoN65fh/Z3PvOF2scBNmI3wwDQYJKoZIhvcNAQELBQADggEBADQtfVPIHW6OrAzMVrH/4nHNKvP1X1jdtgHPGEPEwJSMJXtrk9CvbMymdXYZzhahVQCjyjyVskkBdtCVybMyZfiU0Nr7M1DiTaDVkFe/dVv0XjFAMUVljfHwaE51xqglnAnmfWNKc9sYIdssTXRNYxjToGkcTCfZsDzNNvdYiKX9kEqNS5I4i6R5tlxcP/kwg17s2nytPOQYP7qYTQdsz/TikfQA+OpzRQ0KSb5QZ7aJlnljgZiYl4v6pprbbEkhIF93JixXhJkyenpqWvCRYE9nUzc5bgssG3lTn7wrOIe3H6Yd2yZve9w3xcSWZZhKN1PwSXq5dKk3I4gAlmsZ9iU=","attributes":{"enabled":true,"nbf":1593094626,"exp":1624631226,"created":1593095227,"updated":1593095227,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90},"tags":{"tag":"tag02"}}, [
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
  '8797f93f-1ac4-4244-85d9-baeff2ac7434',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 14:27:25 GMT',
  'Content-Length',
  '1819'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canretrieveallversionsofacertificate-/de829ebf4c394b4d970cb62272be85b9')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canretrieveallversionsofacertificate-/de829ebf4c394b4d970cb62272be85b9","kid":"https://keyvault_name.vault.azure.net/keys/listCertificateName-canretrieveallversionsofacertificate-/de829ebf4c394b4d970cb62272be85b9","sid":"https://keyvault_name.vault.azure.net/secrets/listCertificateName-canretrieveallversionsofacertificate-/de829ebf4c394b4d970cb62272be85b9","x5t":"HwTauQzbHbfznGJ0QRewBwnkDyI","cer":"MIIDKDCCAhCgAwIBAgIQYi6RNORCRp2mzJrchqd4gzANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjAwNjI1MTQxNzIzWhcNMjEwNjI1MTQyNzIzWjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQDRBpDJX1BjH5ef4DJQcOGinP5IdCUjd8K0gUex2JJLoxtGcsoAhqhQgVZWluq+Qu/l/c5ucvRoWyUHb0gh61hXWdFLLcVuAyC4s+CAQBQx2R7ZiJs/Ha0Ll4J8kywXXwPJspXZ/VYjQ9Con0l22cs8XkOvtz2EClSFXHwWjqIsD+5gVHYayfS/KCZntMPJXacbjpM+jKC5F99+zUtrzRdSQrGk2UL1+DRpKEoGLBfZYCXVcZWdcqiPtXMe95hzvSlyqDW9qS4toSo1aZ03Z6rN9dCTHy3Sy/5AFcOf+t9+5KOjCAoIAuRpEMXntxawjrRvvtgBF/LYdEY1dZoBsP6RAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBQ/jiNiN14xHpAwvmyePPSBddt/VDAdBgNVHQ4EFgQUP44jYjdeMR6QML5snjz0gXXbf1QwDQYJKoZIhvcNAQELBQADggEBABUm/Zy5Yzvx/5+YToHPfWSKhCOoXFqVyIMTAiLmpnpKnrgNT+WODP+ARBXNP9xxfIbEeOA0r9aV3f29bsHT47WBYRHC8SAukGYTQ49pj1ynAcmXtVq1h36ZXIDstsNwyFfGeY7pmUPxjze8dUpU1MbZT92cubWK2SuWoxEuBiq7Ocx1sxA2B9YzOqIp8GsS+b73wfwrhlQu07zn/77hFrP2AGnGQnWMihviQ36oS1SkSqyOrk+h1T5jK5w5rZkfgAOT9Q9y/X2wYc1NEobkzzNH4w8L64nGi+wea2R5lkvG+eEo1kCEv6STNQBqKh7UigaArx+6ckNnbSVNSybtxQY=","attributes":{"enabled":true,"nbf":1593094643,"exp":1624631243,"created":1593095243,"updated":1593095243,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90},"tags":{"tag":"tag03"}}, [
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
  'edc8104d-e87e-4c27-9275-78aad7711a20',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 14:27:25 GMT',
  'Content-Length',
  '1819'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/certificates/listCertificateName-canretrieveallversionsofacertificate-')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/listCertificateName-canretrieveallversionsofacertificate-","deletedDate":1593095245,"scheduledPurgeDate":1600871245,"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canretrieveallversionsofacertificate-/de829ebf4c394b4d970cb62272be85b9","kid":"https://keyvault_name.vault.azure.net/keys/listCertificateName-canretrieveallversionsofacertificate-/de829ebf4c394b4d970cb62272be85b9","sid":"https://keyvault_name.vault.azure.net/secrets/listCertificateName-canretrieveallversionsofacertificate-/de829ebf4c394b4d970cb62272be85b9","x5t":"HwTauQzbHbfznGJ0QRewBwnkDyI","cer":"MIIDKDCCAhCgAwIBAgIQYi6RNORCRp2mzJrchqd4gzANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjAwNjI1MTQxNzIzWhcNMjEwNjI1MTQyNzIzWjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQDRBpDJX1BjH5ef4DJQcOGinP5IdCUjd8K0gUex2JJLoxtGcsoAhqhQgVZWluq+Qu/l/c5ucvRoWyUHb0gh61hXWdFLLcVuAyC4s+CAQBQx2R7ZiJs/Ha0Ll4J8kywXXwPJspXZ/VYjQ9Con0l22cs8XkOvtz2EClSFXHwWjqIsD+5gVHYayfS/KCZntMPJXacbjpM+jKC5F99+zUtrzRdSQrGk2UL1+DRpKEoGLBfZYCXVcZWdcqiPtXMe95hzvSlyqDW9qS4toSo1aZ03Z6rN9dCTHy3Sy/5AFcOf+t9+5KOjCAoIAuRpEMXntxawjrRvvtgBF/LYdEY1dZoBsP6RAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBQ/jiNiN14xHpAwvmyePPSBddt/VDAdBgNVHQ4EFgQUP44jYjdeMR6QML5snjz0gXXbf1QwDQYJKoZIhvcNAQELBQADggEBABUm/Zy5Yzvx/5+YToHPfWSKhCOoXFqVyIMTAiLmpnpKnrgNT+WODP+ARBXNP9xxfIbEeOA0r9aV3f29bsHT47WBYRHC8SAukGYTQ49pj1ynAcmXtVq1h36ZXIDstsNwyFfGeY7pmUPxjze8dUpU1MbZT92cubWK2SuWoxEuBiq7Ocx1sxA2B9YzOqIp8GsS+b73wfwrhlQu07zn/77hFrP2AGnGQnWMihviQ36oS1SkSqyOrk+h1T5jK5w5rZkfgAOT9Q9y/X2wYc1NEobkzzNH4w8L64nGi+wea2R5lkvG+eEo1kCEv6STNQBqKh7UigaArx+6ckNnbSVNSybtxQY=","attributes":{"enabled":true,"nbf":1593094643,"exp":1624631243,"created":1593095243,"updated":1593095243,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90},"tags":{"tag":"tag03"},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canretrieveallversionsofacertificate-/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1593095190,"updated":1593095228}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canretrieveallversionsofacertificate-/pending"}}, [
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
  'd8d440f3-2c96-4a8c-9568-48f4c9142999',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 14:27:25 GMT',
  'Content-Length',
  '2867'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canretrieveallversionsofacertificate-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canretrieveallversionsofacertificate-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '157',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '70eec1f8-8c3c-490d-a076-66f060f66abc',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 14:27:25 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canretrieveallversionsofacertificate-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canretrieveallversionsofacertificate-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '157',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '9d9cf2cd-1b35-4f35-a562-883ed81cf783',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 14:27:25 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canretrieveallversionsofacertificate-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canretrieveallversionsofacertificate-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '157',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '2c01ba6f-ff24-4e12-8568-99777e3f0eaa',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 14:27:27 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canretrieveallversionsofacertificate-')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/listCertificateName-canretrieveallversionsofacertificate-","deletedDate":1593095245,"scheduledPurgeDate":1600871245,"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canretrieveallversionsofacertificate-/de829ebf4c394b4d970cb62272be85b9","kid":"https://keyvault_name.vault.azure.net/keys/listCertificateName-canretrieveallversionsofacertificate-/de829ebf4c394b4d970cb62272be85b9","sid":"https://keyvault_name.vault.azure.net/secrets/listCertificateName-canretrieveallversionsofacertificate-/de829ebf4c394b4d970cb62272be85b9","x5t":"HwTauQzbHbfznGJ0QRewBwnkDyI","cer":"MIIDKDCCAhCgAwIBAgIQYi6RNORCRp2mzJrchqd4gzANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjAwNjI1MTQxNzIzWhcNMjEwNjI1MTQyNzIzWjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQDRBpDJX1BjH5ef4DJQcOGinP5IdCUjd8K0gUex2JJLoxtGcsoAhqhQgVZWluq+Qu/l/c5ucvRoWyUHb0gh61hXWdFLLcVuAyC4s+CAQBQx2R7ZiJs/Ha0Ll4J8kywXXwPJspXZ/VYjQ9Con0l22cs8XkOvtz2EClSFXHwWjqIsD+5gVHYayfS/KCZntMPJXacbjpM+jKC5F99+zUtrzRdSQrGk2UL1+DRpKEoGLBfZYCXVcZWdcqiPtXMe95hzvSlyqDW9qS4toSo1aZ03Z6rN9dCTHy3Sy/5AFcOf+t9+5KOjCAoIAuRpEMXntxawjrRvvtgBF/LYdEY1dZoBsP6RAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBQ/jiNiN14xHpAwvmyePPSBddt/VDAdBgNVHQ4EFgQUP44jYjdeMR6QML5snjz0gXXbf1QwDQYJKoZIhvcNAQELBQADggEBABUm/Zy5Yzvx/5+YToHPfWSKhCOoXFqVyIMTAiLmpnpKnrgNT+WODP+ARBXNP9xxfIbEeOA0r9aV3f29bsHT47WBYRHC8SAukGYTQ49pj1ynAcmXtVq1h36ZXIDstsNwyFfGeY7pmUPxjze8dUpU1MbZT92cubWK2SuWoxEuBiq7Ocx1sxA2B9YzOqIp8GsS+b73wfwrhlQu07zn/77hFrP2AGnGQnWMihviQ36oS1SkSqyOrk+h1T5jK5w5rZkfgAOT9Q9y/X2wYc1NEobkzzNH4w8L64nGi+wea2R5lkvG+eEo1kCEv6STNQBqKh7UigaArx+6ckNnbSVNSybtxQY=","attributes":{"enabled":true,"nbf":1593094643,"exp":1624631243,"created":1593095243,"updated":1593095243,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90},"tags":{"tag":"tag03"},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canretrieveallversionsofacertificate-/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1593095190,"updated":1593095228}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canretrieveallversionsofacertificate-/pending"}}, [
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
  '9db804bb-7d24-4e0e-9b08-9630934ce786',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 14:27:30 GMT',
  'Content-Length',
  '2867'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedcertificates/listCertificateName-canretrieveallversionsofacertificate-')
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
  '2b2bb772-8e9e-4b28-8e01-05282477e713',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 14:27:30 GMT'
]);

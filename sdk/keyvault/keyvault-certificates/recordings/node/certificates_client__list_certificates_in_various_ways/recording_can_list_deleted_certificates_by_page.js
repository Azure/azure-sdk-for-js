let nock = require('nock');

module.exports.hash = "c940e16789f3519297262bdf6bee26a5";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/certificates/listCertificateName-canlistdeletedcertificatesbypage-0/create')
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
  'fcce541d-2017-42ed-9304-ee7ebd615229',
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
  'Tue, 16 Feb 2021 19:02:06 GMT'
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
  'ee69d25d-6455-44a3-bd2a-8061b193f500',
  'x-ms-ests-server',
  '2.1.11496.5 - EUS ProdSlices',
  'Set-Cookie',
  'fpc=AufoSEQpIbxLjzJaYLa_pBMA4qsDDwAAAE0NvtcOAAAA; expires=Thu, 18-Mar-2021 19:02:07 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 16 Feb 2021 19:02:06 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/certificates/listCertificateName-canlistdeletedcertificatesbypage-0/create', {"policy":{"key_props":{},"secret_props":{},"x509_props":{"subject":"cn=MyCert","sans":{}},"issuer":{"name":"Self"},"attributes":{}},"attributes":{}})
  .query(true)
  .reply(202, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificatesbypage-0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEApuZtQB2QGo8EUsr2TLerWAZj4m5dpKuFWqK5ecBYn/Wi95q52M/psDqlhfdCLwHQp5tLBEWQrzA6/v9fxEP/hWLr6lyALSzXXE7dPigkliOxQhYdlyUFDPuElSSdc/Ck9I8tJGoV6fQ+/VZSieek9SnUUNKg8ZYwk8CqMDvTcuyocSiMaB/5fR/fD5DXI3uCFYD2bWtiFQeOD7qi6Sw3qw0X75qztEpVB9xGT3BKHE0WWr9l7n4yfd7pJ5KM64SkOp/4Vc8Ii9o30ddCcj7AfYg9isDY8DJ6DcKOtKWQ27XnZytzwCR8rjrSMzftT0uRBoMxztnz6jJElJSGd4tOTQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAEmJKZuJRfD2xtndmwfLZCn0pCdxlM0tFqPC+HXZtRn4GIa98Wx5gCCy4uhKbp5zEn3dy4iOkrkP/XJznzG7rYNBS4XcVBB/qwafNuloWQaiZUDeSwlzUsKolG23DDY6wknPaaZeHB8ix45EgEp/W6kvLTVWvu0qIa1LXm4yFqoCmC1KQIyYSbfqkZdFTYOC0/YyeHF1MWCZbfNj+Ezwb8dtvsIdC38+yRRDBTmGThTArqQF43gMX6jzLaB8pfMoU0JgV3PHFZl36nI0jygIFw9svOk3BN3hbqvZ++9uwKGunEOlxg4Y8+onDwzqZRMHKZa8dgbqZmB8F45XEpthF4E=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"6a6d56748a0545ffb63afe9982d35fba"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificatesbypage-0/pending?api-version=7.2&request_id=6a6d56748a0545ffb63afe9982d35fba',
  'Retry-After',
  '10',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  '5bb3f97a-1a9c-4d12-8a58-b8f31ece2c60',
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
  'Tue, 16 Feb 2021 19:02:07 GMT',
  'Content-Length',
  '1337'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistdeletedcertificatesbypage-0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificatesbypage-0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEApuZtQB2QGo8EUsr2TLerWAZj4m5dpKuFWqK5ecBYn/Wi95q52M/psDqlhfdCLwHQp5tLBEWQrzA6/v9fxEP/hWLr6lyALSzXXE7dPigkliOxQhYdlyUFDPuElSSdc/Ck9I8tJGoV6fQ+/VZSieek9SnUUNKg8ZYwk8CqMDvTcuyocSiMaB/5fR/fD5DXI3uCFYD2bWtiFQeOD7qi6Sw3qw0X75qztEpVB9xGT3BKHE0WWr9l7n4yfd7pJ5KM64SkOp/4Vc8Ii9o30ddCcj7AfYg9isDY8DJ6DcKOtKWQ27XnZytzwCR8rjrSMzftT0uRBoMxztnz6jJElJSGd4tOTQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAEmJKZuJRfD2xtndmwfLZCn0pCdxlM0tFqPC+HXZtRn4GIa98Wx5gCCy4uhKbp5zEn3dy4iOkrkP/XJznzG7rYNBS4XcVBB/qwafNuloWQaiZUDeSwlzUsKolG23DDY6wknPaaZeHB8ix45EgEp/W6kvLTVWvu0qIa1LXm4yFqoCmC1KQIyYSbfqkZdFTYOC0/YyeHF1MWCZbfNj+Ezwb8dtvsIdC38+yRRDBTmGThTArqQF43gMX6jzLaB8pfMoU0JgV3PHFZl36nI0jygIFw9svOk3BN3hbqvZ++9uwKGunEOlxg4Y8+onDwzqZRMHKZa8dgbqZmB8F45XEpthF4E=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"6a6d56748a0545ffb63afe9982d35fba"}, [
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
  'e500c771-7ed1-425a-b315-cc4fef66bdb7',
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
  'Tue, 16 Feb 2021 19:02:07 GMT',
  'Content-Length',
  '1337'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistdeletedcertificatesbypage-0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificatesbypage-0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEApuZtQB2QGo8EUsr2TLerWAZj4m5dpKuFWqK5ecBYn/Wi95q52M/psDqlhfdCLwHQp5tLBEWQrzA6/v9fxEP/hWLr6lyALSzXXE7dPigkliOxQhYdlyUFDPuElSSdc/Ck9I8tJGoV6fQ+/VZSieek9SnUUNKg8ZYwk8CqMDvTcuyocSiMaB/5fR/fD5DXI3uCFYD2bWtiFQeOD7qi6Sw3qw0X75qztEpVB9xGT3BKHE0WWr9l7n4yfd7pJ5KM64SkOp/4Vc8Ii9o30ddCcj7AfYg9isDY8DJ6DcKOtKWQ27XnZytzwCR8rjrSMzftT0uRBoMxztnz6jJElJSGd4tOTQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAEmJKZuJRfD2xtndmwfLZCn0pCdxlM0tFqPC+HXZtRn4GIa98Wx5gCCy4uhKbp5zEn3dy4iOkrkP/XJznzG7rYNBS4XcVBB/qwafNuloWQaiZUDeSwlzUsKolG23DDY6wknPaaZeHB8ix45EgEp/W6kvLTVWvu0qIa1LXm4yFqoCmC1KQIyYSbfqkZdFTYOC0/YyeHF1MWCZbfNj+Ezwb8dtvsIdC38+yRRDBTmGThTArqQF43gMX6jzLaB8pfMoU0JgV3PHFZl36nI0jygIFw9svOk3BN3hbqvZ++9uwKGunEOlxg4Y8+onDwzqZRMHKZa8dgbqZmB8F45XEpthF4E=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"6a6d56748a0545ffb63afe9982d35fba"}, [
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
  '96342f4e-50bd-408c-ab0f-5345c4af09dc',
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
  'Tue, 16 Feb 2021 19:02:07 GMT',
  'Content-Length',
  '1337'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistdeletedcertificatesbypage-0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificatesbypage-0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEApuZtQB2QGo8EUsr2TLerWAZj4m5dpKuFWqK5ecBYn/Wi95q52M/psDqlhfdCLwHQp5tLBEWQrzA6/v9fxEP/hWLr6lyALSzXXE7dPigkliOxQhYdlyUFDPuElSSdc/Ck9I8tJGoV6fQ+/VZSieek9SnUUNKg8ZYwk8CqMDvTcuyocSiMaB/5fR/fD5DXI3uCFYD2bWtiFQeOD7qi6Sw3qw0X75qztEpVB9xGT3BKHE0WWr9l7n4yfd7pJ5KM64SkOp/4Vc8Ii9o30ddCcj7AfYg9isDY8DJ6DcKOtKWQ27XnZytzwCR8rjrSMzftT0uRBoMxztnz6jJElJSGd4tOTQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAEmJKZuJRfD2xtndmwfLZCn0pCdxlM0tFqPC+HXZtRn4GIa98Wx5gCCy4uhKbp5zEn3dy4iOkrkP/XJznzG7rYNBS4XcVBB/qwafNuloWQaiZUDeSwlzUsKolG23DDY6wknPaaZeHB8ix45EgEp/W6kvLTVWvu0qIa1LXm4yFqoCmC1KQIyYSbfqkZdFTYOC0/YyeHF1MWCZbfNj+Ezwb8dtvsIdC38+yRRDBTmGThTArqQF43gMX6jzLaB8pfMoU0JgV3PHFZl36nI0jygIFw9svOk3BN3hbqvZ++9uwKGunEOlxg4Y8+onDwzqZRMHKZa8dgbqZmB8F45XEpthF4E=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"6a6d56748a0545ffb63afe9982d35fba"}, [
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
  '591e2b46-fd54-498a-b185-3ab48a36e6b3',
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
  'Tue, 16 Feb 2021 19:02:10 GMT',
  'Content-Length',
  '1337'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistdeletedcertificatesbypage-0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificatesbypage-0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEApuZtQB2QGo8EUsr2TLerWAZj4m5dpKuFWqK5ecBYn/Wi95q52M/psDqlhfdCLwHQp5tLBEWQrzA6/v9fxEP/hWLr6lyALSzXXE7dPigkliOxQhYdlyUFDPuElSSdc/Ck9I8tJGoV6fQ+/VZSieek9SnUUNKg8ZYwk8CqMDvTcuyocSiMaB/5fR/fD5DXI3uCFYD2bWtiFQeOD7qi6Sw3qw0X75qztEpVB9xGT3BKHE0WWr9l7n4yfd7pJ5KM64SkOp/4Vc8Ii9o30ddCcj7AfYg9isDY8DJ6DcKOtKWQ27XnZytzwCR8rjrSMzftT0uRBoMxztnz6jJElJSGd4tOTQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAEmJKZuJRfD2xtndmwfLZCn0pCdxlM0tFqPC+HXZtRn4GIa98Wx5gCCy4uhKbp5zEn3dy4iOkrkP/XJznzG7rYNBS4XcVBB/qwafNuloWQaiZUDeSwlzUsKolG23DDY6wknPaaZeHB8ix45EgEp/W6kvLTVWvu0qIa1LXm4yFqoCmC1KQIyYSbfqkZdFTYOC0/YyeHF1MWCZbfNj+Ezwb8dtvsIdC38+yRRDBTmGThTArqQF43gMX6jzLaB8pfMoU0JgV3PHFZl36nI0jygIFw9svOk3BN3hbqvZ++9uwKGunEOlxg4Y8+onDwzqZRMHKZa8dgbqZmB8F45XEpthF4E=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"6a6d56748a0545ffb63afe9982d35fba"}, [
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
  'f9aa94a5-8ecd-4845-a3c1-05322d2218fa',
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
  'Tue, 16 Feb 2021 19:02:11 GMT',
  'Content-Length',
  '1337'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistdeletedcertificatesbypage-0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificatesbypage-0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEApuZtQB2QGo8EUsr2TLerWAZj4m5dpKuFWqK5ecBYn/Wi95q52M/psDqlhfdCLwHQp5tLBEWQrzA6/v9fxEP/hWLr6lyALSzXXE7dPigkliOxQhYdlyUFDPuElSSdc/Ck9I8tJGoV6fQ+/VZSieek9SnUUNKg8ZYwk8CqMDvTcuyocSiMaB/5fR/fD5DXI3uCFYD2bWtiFQeOD7qi6Sw3qw0X75qztEpVB9xGT3BKHE0WWr9l7n4yfd7pJ5KM64SkOp/4Vc8Ii9o30ddCcj7AfYg9isDY8DJ6DcKOtKWQ27XnZytzwCR8rjrSMzftT0uRBoMxztnz6jJElJSGd4tOTQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAEmJKZuJRfD2xtndmwfLZCn0pCdxlM0tFqPC+HXZtRn4GIa98Wx5gCCy4uhKbp5zEn3dy4iOkrkP/XJznzG7rYNBS4XcVBB/qwafNuloWQaiZUDeSwlzUsKolG23DDY6wknPaaZeHB8ix45EgEp/W6kvLTVWvu0qIa1LXm4yFqoCmC1KQIyYSbfqkZdFTYOC0/YyeHF1MWCZbfNj+Ezwb8dtvsIdC38+yRRDBTmGThTArqQF43gMX6jzLaB8pfMoU0JgV3PHFZl36nI0jygIFw9svOk3BN3hbqvZ++9uwKGunEOlxg4Y8+onDwzqZRMHKZa8dgbqZmB8F45XEpthF4E=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"6a6d56748a0545ffb63afe9982d35fba"}, [
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
  '4432d295-6049-459e-a9de-0cad9da746d7',
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
  'Tue, 16 Feb 2021 19:02:13 GMT',
  'Content-Length',
  '1337'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistdeletedcertificatesbypage-0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificatesbypage-0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEApuZtQB2QGo8EUsr2TLerWAZj4m5dpKuFWqK5ecBYn/Wi95q52M/psDqlhfdCLwHQp5tLBEWQrzA6/v9fxEP/hWLr6lyALSzXXE7dPigkliOxQhYdlyUFDPuElSSdc/Ck9I8tJGoV6fQ+/VZSieek9SnUUNKg8ZYwk8CqMDvTcuyocSiMaB/5fR/fD5DXI3uCFYD2bWtiFQeOD7qi6Sw3qw0X75qztEpVB9xGT3BKHE0WWr9l7n4yfd7pJ5KM64SkOp/4Vc8Ii9o30ddCcj7AfYg9isDY8DJ6DcKOtKWQ27XnZytzwCR8rjrSMzftT0uRBoMxztnz6jJElJSGd4tOTQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAEmJKZuJRfD2xtndmwfLZCn0pCdxlM0tFqPC+HXZtRn4GIa98Wx5gCCy4uhKbp5zEn3dy4iOkrkP/XJznzG7rYNBS4XcVBB/qwafNuloWQaiZUDeSwlzUsKolG23DDY6wknPaaZeHB8ix45EgEp/W6kvLTVWvu0qIa1LXm4yFqoCmC1KQIyYSbfqkZdFTYOC0/YyeHF1MWCZbfNj+Ezwb8dtvsIdC38+yRRDBTmGThTArqQF43gMX6jzLaB8pfMoU0JgV3PHFZl36nI0jygIFw9svOk3BN3hbqvZ++9uwKGunEOlxg4Y8+onDwzqZRMHKZa8dgbqZmB8F45XEpthF4E=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"6a6d56748a0545ffb63afe9982d35fba"}, [
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
  'c9ba5e3b-6c5d-43b5-9f9d-70ad4149daf7',
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
  'Tue, 16 Feb 2021 19:02:15 GMT',
  'Content-Length',
  '1337'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistdeletedcertificatesbypage-0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificatesbypage-0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEApuZtQB2QGo8EUsr2TLerWAZj4m5dpKuFWqK5ecBYn/Wi95q52M/psDqlhfdCLwHQp5tLBEWQrzA6/v9fxEP/hWLr6lyALSzXXE7dPigkliOxQhYdlyUFDPuElSSdc/Ck9I8tJGoV6fQ+/VZSieek9SnUUNKg8ZYwk8CqMDvTcuyocSiMaB/5fR/fD5DXI3uCFYD2bWtiFQeOD7qi6Sw3qw0X75qztEpVB9xGT3BKHE0WWr9l7n4yfd7pJ5KM64SkOp/4Vc8Ii9o30ddCcj7AfYg9isDY8DJ6DcKOtKWQ27XnZytzwCR8rjrSMzftT0uRBoMxztnz6jJElJSGd4tOTQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAEmJKZuJRfD2xtndmwfLZCn0pCdxlM0tFqPC+HXZtRn4GIa98Wx5gCCy4uhKbp5zEn3dy4iOkrkP/XJznzG7rYNBS4XcVBB/qwafNuloWQaiZUDeSwlzUsKolG23DDY6wknPaaZeHB8ix45EgEp/W6kvLTVWvu0qIa1LXm4yFqoCmC1KQIyYSbfqkZdFTYOC0/YyeHF1MWCZbfNj+Ezwb8dtvsIdC38+yRRDBTmGThTArqQF43gMX6jzLaB8pfMoU0JgV3PHFZl36nI0jygIFw9svOk3BN3hbqvZ++9uwKGunEOlxg4Y8+onDwzqZRMHKZa8dgbqZmB8F45XEpthF4E=","cancellation_requested":false,"status":"completed","target":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificatesbypage-0","request_id":"6a6d56748a0545ffb63afe9982d35fba"}, [
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
  '7bfd718d-7694-4988-b51e-b5190428351c',
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
  'Tue, 16 Feb 2021 19:02:17 GMT',
  'Content-Length',
  '1301'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistdeletedcertificatesbypage-0/')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificatesbypage-0/0e23d04010b04179b20cade3e9cbad07","kid":"https://keyvault_name.vault.azure.net/keys/listCertificateName-canlistdeletedcertificatesbypage-0/0e23d04010b04179b20cade3e9cbad07","sid":"https://keyvault_name.vault.azure.net/secrets/listCertificateName-canlistdeletedcertificatesbypage-0/0e23d04010b04179b20cade3e9cbad07","x5t":"seEYZ3CwqS84yb_iNdBC5ZdbWtk","cer":"MIIDKDCCAhCgAwIBAgIQRpRy1FeVSSCsBgdUVsh4mjANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjEwMjE2MTg1MjE2WhcNMjIwMjE2MTkwMjE2WjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQCm5m1AHZAajwRSyvZMt6tYBmPibl2kq4Vaorl5wFif9aL3mrnYz+mwOqWF90IvAdCnm0sERZCvMDr+/1/EQ/+FYuvqXIAtLNdcTt0+KCSWI7FCFh2XJQUM+4SVJJ1z8KT0jy0kahXp9D79VlKJ56T1KdRQ0qDxljCTwKowO9Ny7KhxKIxoH/l9H98PkNcje4IVgPZta2IVB44PuqLpLDerDRfvmrO0SlUH3EZPcEocTRZav2XufjJ93uknkozrhKQ6n/hVzwiL2jfR10JyPsB9iD2KwNjwMnoNwo60pZDbtednK3PAJHyuOtIzN+1PS5EGgzHO2fPqMkSUlIZ3i05NAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBRugk0AKpQiseMYpvbOgcUDyFXWRTAdBgNVHQ4EFgQUboJNACqUIrHjGKb2zoHFA8hV1kUwDQYJKoZIhvcNAQELBQADggEBAFUuuAt+Vj5uRnBywuutKHKDinnRvr1nACmvrcMdv8iTUoMg4Apr8tfKvXBrrEedCpg+XSDPyLCklqcEE8bADxqP4tqEeOvRi+zEtZyPs5pGzZXrzbPlcF5+5BeVtDC6eaV7pJ7YTVkeIOfEpn84OQfiEzxS6njFgFiodaEneszVpIFHF5H+vzgtAgXjfoWGIEabx+2zoDOgKfjXC9s7sdV0Isng0Pzy8mhp8EPwqZnhuc9vsyB5w5jTOmRc2sBDsu0A+3sbcMXOjTGB0cMaRpZxV3xCMZ+/nKtEO1H7tpm/rwEgGCA0jjaYHglXldZL/Roy6+1IQwJFCk6a3oXHNEo=","attributes":{"enabled":true,"nbf":1613501536,"exp":1645038136,"created":1613502136,"updated":1613502136,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificatesbypage-0/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1613502127,"updated":1613502127}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificatesbypage-0/pending"}}, [
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
  '6914e959-3335-4cbf-9201-59fc8e5efb68',
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
  'Tue, 16 Feb 2021 19:02:17 GMT',
  'Content-Length',
  '2584'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/certificates/listCertificateName-canlistdeletedcertificatesbypage-1/create', {"policy":{"key_props":{},"secret_props":{},"x509_props":{"subject":"cn=MyCert","sans":{}},"issuer":{"name":"Self"},"attributes":{}},"attributes":{}})
  .query(true)
  .reply(202, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificatesbypage-1/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAv6xmstTMbMRwZRCZD0X5QNpL26eQ7SbPOXNu3MIzCXqPngARCmGSb1SWaCmNGt2fnJuJDF6DrH9yVDVE9+/J6HZPbTm+7pVi6kcNSSfH19B6/Kd6VewIWzW1sEsdBkDlQmgrzdF2UdDJg8tzqUyL47RhTLzIJrQ5RT4PfyY8/b9QmBpmO4wAddO63fO7TiUg7lCE4zAI1l3sQMgwtA2lPgY3BrmBQ9M4ium+dylJjGjOCSPgPGIjyxVmJbC530d+1xrZBykgajZPnbDU2msmas1PVndLJF8f0RPMHIPKAzIt6TrwYg3fJXGjqyBBkV6RioylUaa085vy8eURk4jc6QIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAJRxCsWEKGC59BExG76ArIwf6pm7TaEZT0xMOnJa7nIfn0Vt03pOifl3DDSWbD4hCt1YSfzVfnxKl96GnbMdUIXasi86Z76igN7JjcmwYWTGQIfK+uKA6BCbIWz/Fg85KckPYwlGDpjSDdpLJpy6LuEbabOezHk2xQLWycJpjA+u/xOeanCHNfGpEmyMItHg/tGAbUUNTGHkZnC/Q+zbMdY+bz+XdquXEbKFBeLd1TzTftTfSsNpABc3NXjVQgCEFkYgbmPfmUSDooGra6lXzGPUMpqfc6B1vGeaNPSocMAD1Ciy8VHGWHizOQeWsq9RACAx5UcaGmSvXr6HYcwqstk=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"f1d8bcaa4e8f4579b592cf45eee9ca69"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificatesbypage-1/pending?api-version=7.2&request_id=f1d8bcaa4e8f4579b592cf45eee9ca69',
  'Retry-After',
  '10',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  '115f9fd4-be3c-4b72-b4ed-2d6a2dc6c616',
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
  'Tue, 16 Feb 2021 19:02:17 GMT',
  'Content-Length',
  '1337'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistdeletedcertificatesbypage-1/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificatesbypage-1/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAv6xmstTMbMRwZRCZD0X5QNpL26eQ7SbPOXNu3MIzCXqPngARCmGSb1SWaCmNGt2fnJuJDF6DrH9yVDVE9+/J6HZPbTm+7pVi6kcNSSfH19B6/Kd6VewIWzW1sEsdBkDlQmgrzdF2UdDJg8tzqUyL47RhTLzIJrQ5RT4PfyY8/b9QmBpmO4wAddO63fO7TiUg7lCE4zAI1l3sQMgwtA2lPgY3BrmBQ9M4ium+dylJjGjOCSPgPGIjyxVmJbC530d+1xrZBykgajZPnbDU2msmas1PVndLJF8f0RPMHIPKAzIt6TrwYg3fJXGjqyBBkV6RioylUaa085vy8eURk4jc6QIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAJRxCsWEKGC59BExG76ArIwf6pm7TaEZT0xMOnJa7nIfn0Vt03pOifl3DDSWbD4hCt1YSfzVfnxKl96GnbMdUIXasi86Z76igN7JjcmwYWTGQIfK+uKA6BCbIWz/Fg85KckPYwlGDpjSDdpLJpy6LuEbabOezHk2xQLWycJpjA+u/xOeanCHNfGpEmyMItHg/tGAbUUNTGHkZnC/Q+zbMdY+bz+XdquXEbKFBeLd1TzTftTfSsNpABc3NXjVQgCEFkYgbmPfmUSDooGra6lXzGPUMpqfc6B1vGeaNPSocMAD1Ciy8VHGWHizOQeWsq9RACAx5UcaGmSvXr6HYcwqstk=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"f1d8bcaa4e8f4579b592cf45eee9ca69"}, [
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
  'e4cb6b83-9977-49db-9469-11bba3205a11',
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
  'Tue, 16 Feb 2021 19:02:19 GMT',
  'Content-Length',
  '1337'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistdeletedcertificatesbypage-1/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificatesbypage-1/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAv6xmstTMbMRwZRCZD0X5QNpL26eQ7SbPOXNu3MIzCXqPngARCmGSb1SWaCmNGt2fnJuJDF6DrH9yVDVE9+/J6HZPbTm+7pVi6kcNSSfH19B6/Kd6VewIWzW1sEsdBkDlQmgrzdF2UdDJg8tzqUyL47RhTLzIJrQ5RT4PfyY8/b9QmBpmO4wAddO63fO7TiUg7lCE4zAI1l3sQMgwtA2lPgY3BrmBQ9M4ium+dylJjGjOCSPgPGIjyxVmJbC530d+1xrZBykgajZPnbDU2msmas1PVndLJF8f0RPMHIPKAzIt6TrwYg3fJXGjqyBBkV6RioylUaa085vy8eURk4jc6QIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAJRxCsWEKGC59BExG76ArIwf6pm7TaEZT0xMOnJa7nIfn0Vt03pOifl3DDSWbD4hCt1YSfzVfnxKl96GnbMdUIXasi86Z76igN7JjcmwYWTGQIfK+uKA6BCbIWz/Fg85KckPYwlGDpjSDdpLJpy6LuEbabOezHk2xQLWycJpjA+u/xOeanCHNfGpEmyMItHg/tGAbUUNTGHkZnC/Q+zbMdY+bz+XdquXEbKFBeLd1TzTftTfSsNpABc3NXjVQgCEFkYgbmPfmUSDooGra6lXzGPUMpqfc6B1vGeaNPSocMAD1Ciy8VHGWHizOQeWsq9RACAx5UcaGmSvXr6HYcwqstk=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"f1d8bcaa4e8f4579b592cf45eee9ca69"}, [
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
  'a7f7f63b-7ef7-40db-aa40-dc9c9ff111e6',
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
  'Tue, 16 Feb 2021 19:02:19 GMT',
  'Content-Length',
  '1337'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistdeletedcertificatesbypage-1/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificatesbypage-1/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAv6xmstTMbMRwZRCZD0X5QNpL26eQ7SbPOXNu3MIzCXqPngARCmGSb1SWaCmNGt2fnJuJDF6DrH9yVDVE9+/J6HZPbTm+7pVi6kcNSSfH19B6/Kd6VewIWzW1sEsdBkDlQmgrzdF2UdDJg8tzqUyL47RhTLzIJrQ5RT4PfyY8/b9QmBpmO4wAddO63fO7TiUg7lCE4zAI1l3sQMgwtA2lPgY3BrmBQ9M4ium+dylJjGjOCSPgPGIjyxVmJbC530d+1xrZBykgajZPnbDU2msmas1PVndLJF8f0RPMHIPKAzIt6TrwYg3fJXGjqyBBkV6RioylUaa085vy8eURk4jc6QIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAJRxCsWEKGC59BExG76ArIwf6pm7TaEZT0xMOnJa7nIfn0Vt03pOifl3DDSWbD4hCt1YSfzVfnxKl96GnbMdUIXasi86Z76igN7JjcmwYWTGQIfK+uKA6BCbIWz/Fg85KckPYwlGDpjSDdpLJpy6LuEbabOezHk2xQLWycJpjA+u/xOeanCHNfGpEmyMItHg/tGAbUUNTGHkZnC/Q+zbMdY+bz+XdquXEbKFBeLd1TzTftTfSsNpABc3NXjVQgCEFkYgbmPfmUSDooGra6lXzGPUMpqfc6B1vGeaNPSocMAD1Ciy8VHGWHizOQeWsq9RACAx5UcaGmSvXr6HYcwqstk=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"f1d8bcaa4e8f4579b592cf45eee9ca69"}, [
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
  'dcf00efd-3572-447e-91e0-2a075256cdf1',
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
  'Tue, 16 Feb 2021 19:02:20 GMT',
  'Content-Length',
  '1337'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistdeletedcertificatesbypage-1/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificatesbypage-1/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAv6xmstTMbMRwZRCZD0X5QNpL26eQ7SbPOXNu3MIzCXqPngARCmGSb1SWaCmNGt2fnJuJDF6DrH9yVDVE9+/J6HZPbTm+7pVi6kcNSSfH19B6/Kd6VewIWzW1sEsdBkDlQmgrzdF2UdDJg8tzqUyL47RhTLzIJrQ5RT4PfyY8/b9QmBpmO4wAddO63fO7TiUg7lCE4zAI1l3sQMgwtA2lPgY3BrmBQ9M4ium+dylJjGjOCSPgPGIjyxVmJbC530d+1xrZBykgajZPnbDU2msmas1PVndLJF8f0RPMHIPKAzIt6TrwYg3fJXGjqyBBkV6RioylUaa085vy8eURk4jc6QIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAJRxCsWEKGC59BExG76ArIwf6pm7TaEZT0xMOnJa7nIfn0Vt03pOifl3DDSWbD4hCt1YSfzVfnxKl96GnbMdUIXasi86Z76igN7JjcmwYWTGQIfK+uKA6BCbIWz/Fg85KckPYwlGDpjSDdpLJpy6LuEbabOezHk2xQLWycJpjA+u/xOeanCHNfGpEmyMItHg/tGAbUUNTGHkZnC/Q+zbMdY+bz+XdquXEbKFBeLd1TzTftTfSsNpABc3NXjVQgCEFkYgbmPfmUSDooGra6lXzGPUMpqfc6B1vGeaNPSocMAD1Ciy8VHGWHizOQeWsq9RACAx5UcaGmSvXr6HYcwqstk=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"f1d8bcaa4e8f4579b592cf45eee9ca69"}, [
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
  'ead9ac5d-acb8-43af-aa5c-91b073660584',
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
  'Tue, 16 Feb 2021 19:02:22 GMT',
  'Content-Length',
  '1337'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistdeletedcertificatesbypage-1/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificatesbypage-1/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAv6xmstTMbMRwZRCZD0X5QNpL26eQ7SbPOXNu3MIzCXqPngARCmGSb1SWaCmNGt2fnJuJDF6DrH9yVDVE9+/J6HZPbTm+7pVi6kcNSSfH19B6/Kd6VewIWzW1sEsdBkDlQmgrzdF2UdDJg8tzqUyL47RhTLzIJrQ5RT4PfyY8/b9QmBpmO4wAddO63fO7TiUg7lCE4zAI1l3sQMgwtA2lPgY3BrmBQ9M4ium+dylJjGjOCSPgPGIjyxVmJbC530d+1xrZBykgajZPnbDU2msmas1PVndLJF8f0RPMHIPKAzIt6TrwYg3fJXGjqyBBkV6RioylUaa085vy8eURk4jc6QIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAJRxCsWEKGC59BExG76ArIwf6pm7TaEZT0xMOnJa7nIfn0Vt03pOifl3DDSWbD4hCt1YSfzVfnxKl96GnbMdUIXasi86Z76igN7JjcmwYWTGQIfK+uKA6BCbIWz/Fg85KckPYwlGDpjSDdpLJpy6LuEbabOezHk2xQLWycJpjA+u/xOeanCHNfGpEmyMItHg/tGAbUUNTGHkZnC/Q+zbMdY+bz+XdquXEbKFBeLd1TzTftTfSsNpABc3NXjVQgCEFkYgbmPfmUSDooGra6lXzGPUMpqfc6B1vGeaNPSocMAD1Ciy8VHGWHizOQeWsq9RACAx5UcaGmSvXr6HYcwqstk=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"f1d8bcaa4e8f4579b592cf45eee9ca69"}, [
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
  'efd401df-527a-482d-9d45-0f732050068a',
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
  'Tue, 16 Feb 2021 19:02:25 GMT',
  'Content-Length',
  '1337'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistdeletedcertificatesbypage-1/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificatesbypage-1/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAv6xmstTMbMRwZRCZD0X5QNpL26eQ7SbPOXNu3MIzCXqPngARCmGSb1SWaCmNGt2fnJuJDF6DrH9yVDVE9+/J6HZPbTm+7pVi6kcNSSfH19B6/Kd6VewIWzW1sEsdBkDlQmgrzdF2UdDJg8tzqUyL47RhTLzIJrQ5RT4PfyY8/b9QmBpmO4wAddO63fO7TiUg7lCE4zAI1l3sQMgwtA2lPgY3BrmBQ9M4ium+dylJjGjOCSPgPGIjyxVmJbC530d+1xrZBykgajZPnbDU2msmas1PVndLJF8f0RPMHIPKAzIt6TrwYg3fJXGjqyBBkV6RioylUaa085vy8eURk4jc6QIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAJRxCsWEKGC59BExG76ArIwf6pm7TaEZT0xMOnJa7nIfn0Vt03pOifl3DDSWbD4hCt1YSfzVfnxKl96GnbMdUIXasi86Z76igN7JjcmwYWTGQIfK+uKA6BCbIWz/Fg85KckPYwlGDpjSDdpLJpy6LuEbabOezHk2xQLWycJpjA+u/xOeanCHNfGpEmyMItHg/tGAbUUNTGHkZnC/Q+zbMdY+bz+XdquXEbKFBeLd1TzTftTfSsNpABc3NXjVQgCEFkYgbmPfmUSDooGra6lXzGPUMpqfc6B1vGeaNPSocMAD1Ciy8VHGWHizOQeWsq9RACAx5UcaGmSvXr6HYcwqstk=","cancellation_requested":false,"status":"completed","target":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificatesbypage-1","request_id":"f1d8bcaa4e8f4579b592cf45eee9ca69"}, [
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
  '728dd981-e85c-47e1-9730-a3450d0d07b8',
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
  'Tue, 16 Feb 2021 19:02:27 GMT',
  'Content-Length',
  '1301'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistdeletedcertificatesbypage-1/')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificatesbypage-1/2921138f24184b4cac8b99bbce3dd5e2","kid":"https://keyvault_name.vault.azure.net/keys/listCertificateName-canlistdeletedcertificatesbypage-1/2921138f24184b4cac8b99bbce3dd5e2","sid":"https://keyvault_name.vault.azure.net/secrets/listCertificateName-canlistdeletedcertificatesbypage-1/2921138f24184b4cac8b99bbce3dd5e2","x5t":"TDAmo0LONwir_3HbxKXJoLYxqa8","cer":"MIIDKDCCAhCgAwIBAgIQFwUqhexeSNqIsciYd+NRDDANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjEwMjE2MTg1MjI1WhcNMjIwMjE2MTkwMjI1WjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQC/rGay1MxsxHBlEJkPRflA2kvbp5DtJs85c27cwjMJeo+eABEKYZJvVJZoKY0a3Z+cm4kMXoOsf3JUNUT378nodk9tOb7ulWLqRw1JJ8fX0Hr8p3pV7AhbNbWwSx0GQOVCaCvN0XZR0MmDy3OpTIvjtGFMvMgmtDlFPg9/Jjz9v1CYGmY7jAB107rd87tOJSDuUITjMAjWXexAyDC0DaU+BjcGuYFD0ziK6b53KUmMaM4JI+A8YiPLFWYlsLnfR37XGtkHKSBqNk+dsNTaayZqzU9Wd0skXx/RE8wcg8oDMi3pOvBiDd8lcaOrIEGRXpGKjKVRprTzm/Lx5RGTiNzpAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBQ/H8u1zg1elwKxzIl9lzuHzJQ4VjAdBgNVHQ4EFgQUPx/Ltc4NXpcCscyJfZc7h8yUOFYwDQYJKoZIhvcNAQELBQADggEBAAHeAGNVwZG7TLTIIkVtpIQer7joGZeReQjTMYygBDPSQN1TCbRWobX1ErsgBN51EWMzhcPR42KLytTK1y21torZ3QrpZXVIQHO7E5a0MoEDVQgiKTuGNntdLopJ4QGtwF0IupzN4AaUNQDLjfNouBaM+LHhCFYbXOXpSMrr/EZec7MxwiT9KPqZZTwgRYdAs5jAmUOFxRaaMU9nEXLhQDJGo1DJhjGfMPJDybqI44/+cRHQu50pulO6tpJUEAa8kQKP7WeBKplhw/uBzT44MQxIdQu5yRD4oTaLsX9zzihfR4GzLzCNUfZnOJUPASgl6dPUPY72lDO2vzoj0JiqOYs=","attributes":{"enabled":true,"nbf":1613501545,"exp":1645038145,"created":1613502145,"updated":1613502145,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificatesbypage-1/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1613502138,"updated":1613502138}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificatesbypage-1/pending"}}, [
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
  '5ddaae75-986c-4793-9544-78ae2aab8747',
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
  'Tue, 16 Feb 2021 19:02:27 GMT',
  'Content-Length',
  '2584'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/certificates/listCertificateName-canlistdeletedcertificatesbypage-0')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/listCertificateName-canlistdeletedcertificatesbypage-0","deletedDate":1613502147,"scheduledPurgeDate":1614106947,"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificatesbypage-0/0e23d04010b04179b20cade3e9cbad07","kid":"https://keyvault_name.vault.azure.net/keys/listCertificateName-canlistdeletedcertificatesbypage-0/0e23d04010b04179b20cade3e9cbad07","sid":"https://keyvault_name.vault.azure.net/secrets/listCertificateName-canlistdeletedcertificatesbypage-0/0e23d04010b04179b20cade3e9cbad07","x5t":"seEYZ3CwqS84yb_iNdBC5ZdbWtk","cer":"MIIDKDCCAhCgAwIBAgIQRpRy1FeVSSCsBgdUVsh4mjANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjEwMjE2MTg1MjE2WhcNMjIwMjE2MTkwMjE2WjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQCm5m1AHZAajwRSyvZMt6tYBmPibl2kq4Vaorl5wFif9aL3mrnYz+mwOqWF90IvAdCnm0sERZCvMDr+/1/EQ/+FYuvqXIAtLNdcTt0+KCSWI7FCFh2XJQUM+4SVJJ1z8KT0jy0kahXp9D79VlKJ56T1KdRQ0qDxljCTwKowO9Ny7KhxKIxoH/l9H98PkNcje4IVgPZta2IVB44PuqLpLDerDRfvmrO0SlUH3EZPcEocTRZav2XufjJ93uknkozrhKQ6n/hVzwiL2jfR10JyPsB9iD2KwNjwMnoNwo60pZDbtednK3PAJHyuOtIzN+1PS5EGgzHO2fPqMkSUlIZ3i05NAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBRugk0AKpQiseMYpvbOgcUDyFXWRTAdBgNVHQ4EFgQUboJNACqUIrHjGKb2zoHFA8hV1kUwDQYJKoZIhvcNAQELBQADggEBAFUuuAt+Vj5uRnBywuutKHKDinnRvr1nACmvrcMdv8iTUoMg4Apr8tfKvXBrrEedCpg+XSDPyLCklqcEE8bADxqP4tqEeOvRi+zEtZyPs5pGzZXrzbPlcF5+5BeVtDC6eaV7pJ7YTVkeIOfEpn84OQfiEzxS6njFgFiodaEneszVpIFHF5H+vzgtAgXjfoWGIEabx+2zoDOgKfjXC9s7sdV0Isng0Pzy8mhp8EPwqZnhuc9vsyB5w5jTOmRc2sBDsu0A+3sbcMXOjTGB0cMaRpZxV3xCMZ+/nKtEO1H7tpm/rwEgGCA0jjaYHglXldZL/Roy6+1IQwJFCk6a3oXHNEo=","attributes":{"enabled":true,"nbf":1613501536,"exp":1645038136,"created":1613502136,"updated":1613502136,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificatesbypage-0/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1613502127,"updated":1613502127}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificatesbypage-0/pending"}}, [
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
  '431426c5-d462-49f9-940a-57d833f88943',
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
  'Tue, 16 Feb 2021 19:02:27 GMT',
  'Content-Length',
  '2781'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistdeletedcertificatesbypage-0')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistdeletedcertificatesbypage-0"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '154',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  'be0a182d-10ef-4ac7-a6b0-a4ac709f8b56',
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
  'Tue, 16 Feb 2021 19:02:27 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistdeletedcertificatesbypage-0')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistdeletedcertificatesbypage-0"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '154',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  '2aae28a1-208e-4437-b61f-d0345e81e53f',
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
  'Tue, 16 Feb 2021 19:02:27 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistdeletedcertificatesbypage-0')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistdeletedcertificatesbypage-0"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '154',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  '42322f00-e145-4147-a59c-04f302d54cd0',
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
  'Tue, 16 Feb 2021 19:02:29 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistdeletedcertificatesbypage-0')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistdeletedcertificatesbypage-0"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '154',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  'e3bbbb0e-69ae-4b98-bdc9-27d21a2391b6',
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
  'Tue, 16 Feb 2021 19:02:31 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistdeletedcertificatesbypage-0')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistdeletedcertificatesbypage-0"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '154',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  'a6fc4484-5360-424f-9d11-eab6c641dc75',
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
  'Tue, 16 Feb 2021 19:02:32 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistdeletedcertificatesbypage-0')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/listCertificateName-canlistdeletedcertificatesbypage-0","deletedDate":1613502147,"scheduledPurgeDate":1614106947,"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificatesbypage-0/0e23d04010b04179b20cade3e9cbad07","kid":"https://keyvault_name.vault.azure.net/keys/listCertificateName-canlistdeletedcertificatesbypage-0/0e23d04010b04179b20cade3e9cbad07","sid":"https://keyvault_name.vault.azure.net/secrets/listCertificateName-canlistdeletedcertificatesbypage-0/0e23d04010b04179b20cade3e9cbad07","x5t":"seEYZ3CwqS84yb_iNdBC5ZdbWtk","cer":"MIIDKDCCAhCgAwIBAgIQRpRy1FeVSSCsBgdUVsh4mjANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjEwMjE2MTg1MjE2WhcNMjIwMjE2MTkwMjE2WjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQCm5m1AHZAajwRSyvZMt6tYBmPibl2kq4Vaorl5wFif9aL3mrnYz+mwOqWF90IvAdCnm0sERZCvMDr+/1/EQ/+FYuvqXIAtLNdcTt0+KCSWI7FCFh2XJQUM+4SVJJ1z8KT0jy0kahXp9D79VlKJ56T1KdRQ0qDxljCTwKowO9Ny7KhxKIxoH/l9H98PkNcje4IVgPZta2IVB44PuqLpLDerDRfvmrO0SlUH3EZPcEocTRZav2XufjJ93uknkozrhKQ6n/hVzwiL2jfR10JyPsB9iD2KwNjwMnoNwo60pZDbtednK3PAJHyuOtIzN+1PS5EGgzHO2fPqMkSUlIZ3i05NAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBRugk0AKpQiseMYpvbOgcUDyFXWRTAdBgNVHQ4EFgQUboJNACqUIrHjGKb2zoHFA8hV1kUwDQYJKoZIhvcNAQELBQADggEBAFUuuAt+Vj5uRnBywuutKHKDinnRvr1nACmvrcMdv8iTUoMg4Apr8tfKvXBrrEedCpg+XSDPyLCklqcEE8bADxqP4tqEeOvRi+zEtZyPs5pGzZXrzbPlcF5+5BeVtDC6eaV7pJ7YTVkeIOfEpn84OQfiEzxS6njFgFiodaEneszVpIFHF5H+vzgtAgXjfoWGIEabx+2zoDOgKfjXC9s7sdV0Isng0Pzy8mhp8EPwqZnhuc9vsyB5w5jTOmRc2sBDsu0A+3sbcMXOjTGB0cMaRpZxV3xCMZ+/nKtEO1H7tpm/rwEgGCA0jjaYHglXldZL/Roy6+1IQwJFCk6a3oXHNEo=","attributes":{"enabled":true,"nbf":1613501536,"exp":1645038136,"created":1613502136,"updated":1613502136,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificatesbypage-0/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1613502127,"updated":1613502127}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificatesbypage-0/pending"}}, [
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
  'f8ff9f7f-2798-4f19-b869-d30a6070342a',
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
  'Tue, 16 Feb 2021 19:02:34 GMT',
  'Content-Length',
  '2781'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/certificates/listCertificateName-canlistdeletedcertificatesbypage-1')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/listCertificateName-canlistdeletedcertificatesbypage-1","deletedDate":1613502155,"scheduledPurgeDate":1614106955,"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificatesbypage-1/2921138f24184b4cac8b99bbce3dd5e2","kid":"https://keyvault_name.vault.azure.net/keys/listCertificateName-canlistdeletedcertificatesbypage-1/2921138f24184b4cac8b99bbce3dd5e2","sid":"https://keyvault_name.vault.azure.net/secrets/listCertificateName-canlistdeletedcertificatesbypage-1/2921138f24184b4cac8b99bbce3dd5e2","x5t":"TDAmo0LONwir_3HbxKXJoLYxqa8","cer":"MIIDKDCCAhCgAwIBAgIQFwUqhexeSNqIsciYd+NRDDANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjEwMjE2MTg1MjI1WhcNMjIwMjE2MTkwMjI1WjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQC/rGay1MxsxHBlEJkPRflA2kvbp5DtJs85c27cwjMJeo+eABEKYZJvVJZoKY0a3Z+cm4kMXoOsf3JUNUT378nodk9tOb7ulWLqRw1JJ8fX0Hr8p3pV7AhbNbWwSx0GQOVCaCvN0XZR0MmDy3OpTIvjtGFMvMgmtDlFPg9/Jjz9v1CYGmY7jAB107rd87tOJSDuUITjMAjWXexAyDC0DaU+BjcGuYFD0ziK6b53KUmMaM4JI+A8YiPLFWYlsLnfR37XGtkHKSBqNk+dsNTaayZqzU9Wd0skXx/RE8wcg8oDMi3pOvBiDd8lcaOrIEGRXpGKjKVRprTzm/Lx5RGTiNzpAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBQ/H8u1zg1elwKxzIl9lzuHzJQ4VjAdBgNVHQ4EFgQUPx/Ltc4NXpcCscyJfZc7h8yUOFYwDQYJKoZIhvcNAQELBQADggEBAAHeAGNVwZG7TLTIIkVtpIQer7joGZeReQjTMYygBDPSQN1TCbRWobX1ErsgBN51EWMzhcPR42KLytTK1y21torZ3QrpZXVIQHO7E5a0MoEDVQgiKTuGNntdLopJ4QGtwF0IupzN4AaUNQDLjfNouBaM+LHhCFYbXOXpSMrr/EZec7MxwiT9KPqZZTwgRYdAs5jAmUOFxRaaMU9nEXLhQDJGo1DJhjGfMPJDybqI44/+cRHQu50pulO6tpJUEAa8kQKP7WeBKplhw/uBzT44MQxIdQu5yRD4oTaLsX9zzihfR4GzLzCNUfZnOJUPASgl6dPUPY72lDO2vzoj0JiqOYs=","attributes":{"enabled":true,"nbf":1613501545,"exp":1645038145,"created":1613502145,"updated":1613502145,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificatesbypage-1/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1613502138,"updated":1613502138}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificatesbypage-1/pending"}}, [
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
  '9a87fd2f-e5f8-4972-88dd-4b7b5f1c9c73',
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
  'Tue, 16 Feb 2021 19:02:34 GMT',
  'Content-Length',
  '2781'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistdeletedcertificatesbypage-1')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistdeletedcertificatesbypage-1"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '154',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  '1428441d-4e2b-42f7-bc8f-c9b1991b2f8f',
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
  'Tue, 16 Feb 2021 19:02:34 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistdeletedcertificatesbypage-1')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistdeletedcertificatesbypage-1"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '154',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  'de83cc5d-e438-481a-a364-4aec7f4cd6ef',
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
  'Tue, 16 Feb 2021 19:02:34 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistdeletedcertificatesbypage-1')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistdeletedcertificatesbypage-1"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '154',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  'f017db1c-9717-4b8a-8527-d030d21afe01',
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
  'Tue, 16 Feb 2021 19:02:36 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistdeletedcertificatesbypage-1')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistdeletedcertificatesbypage-1"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '154',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  '284e2c63-36fd-428c-bf3b-f3e3e6430b99',
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
  'Tue, 16 Feb 2021 19:02:39 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistdeletedcertificatesbypage-1')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistdeletedcertificatesbypage-1"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '154',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  'f93a8903-2e63-4b3a-a47f-834781283ec9',
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
  'Tue, 16 Feb 2021 19:02:41 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistdeletedcertificatesbypage-1')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistdeletedcertificatesbypage-1"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '154',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  '183cdcce-d3a0-469b-b23e-4fa6e7b8a860',
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
  'Tue, 16 Feb 2021 19:02:43 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistdeletedcertificatesbypage-1')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/listCertificateName-canlistdeletedcertificatesbypage-1","deletedDate":1613502155,"scheduledPurgeDate":1614106955,"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificatesbypage-1/2921138f24184b4cac8b99bbce3dd5e2","kid":"https://keyvault_name.vault.azure.net/keys/listCertificateName-canlistdeletedcertificatesbypage-1/2921138f24184b4cac8b99bbce3dd5e2","sid":"https://keyvault_name.vault.azure.net/secrets/listCertificateName-canlistdeletedcertificatesbypage-1/2921138f24184b4cac8b99bbce3dd5e2","x5t":"TDAmo0LONwir_3HbxKXJoLYxqa8","cer":"MIIDKDCCAhCgAwIBAgIQFwUqhexeSNqIsciYd+NRDDANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjEwMjE2MTg1MjI1WhcNMjIwMjE2MTkwMjI1WjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQC/rGay1MxsxHBlEJkPRflA2kvbp5DtJs85c27cwjMJeo+eABEKYZJvVJZoKY0a3Z+cm4kMXoOsf3JUNUT378nodk9tOb7ulWLqRw1JJ8fX0Hr8p3pV7AhbNbWwSx0GQOVCaCvN0XZR0MmDy3OpTIvjtGFMvMgmtDlFPg9/Jjz9v1CYGmY7jAB107rd87tOJSDuUITjMAjWXexAyDC0DaU+BjcGuYFD0ziK6b53KUmMaM4JI+A8YiPLFWYlsLnfR37XGtkHKSBqNk+dsNTaayZqzU9Wd0skXx/RE8wcg8oDMi3pOvBiDd8lcaOrIEGRXpGKjKVRprTzm/Lx5RGTiNzpAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBQ/H8u1zg1elwKxzIl9lzuHzJQ4VjAdBgNVHQ4EFgQUPx/Ltc4NXpcCscyJfZc7h8yUOFYwDQYJKoZIhvcNAQELBQADggEBAAHeAGNVwZG7TLTIIkVtpIQer7joGZeReQjTMYygBDPSQN1TCbRWobX1ErsgBN51EWMzhcPR42KLytTK1y21torZ3QrpZXVIQHO7E5a0MoEDVQgiKTuGNntdLopJ4QGtwF0IupzN4AaUNQDLjfNouBaM+LHhCFYbXOXpSMrr/EZec7MxwiT9KPqZZTwgRYdAs5jAmUOFxRaaMU9nEXLhQDJGo1DJhjGfMPJDybqI44/+cRHQu50pulO6tpJUEAa8kQKP7WeBKplhw/uBzT44MQxIdQu5yRD4oTaLsX9zzihfR4GzLzCNUfZnOJUPASgl6dPUPY72lDO2vzoj0JiqOYs=","attributes":{"enabled":true,"nbf":1613501545,"exp":1645038145,"created":1613502145,"updated":1613502145,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificatesbypage-1/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1613502138,"updated":1613502138}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificatesbypage-1/pending"}}, [
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
  '6794e476-50fe-42fb-83eb-bd44ace74b28',
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
  'Tue, 16 Feb 2021 19:02:45 GMT',
  'Content-Length',
  '2781'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates')
  .query(true)
  .reply(200, {"value":[{"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/listCertificateName-canlistdeletedcertificatesbypage-0","deletedDate":1613502147,"scheduledPurgeDate":1614106947,"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificatesbypage-0","x5t":"seEYZ3CwqS84yb_iNdBC5ZdbWtk","attributes":{"enabled":true,"nbf":1613501536,"exp":1645038136,"created":1613502136,"updated":1613502136,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/listCertificateName-canlistdeletedcertificatesbypage-1","deletedDate":1613502155,"scheduledPurgeDate":1614106955,"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificatesbypage-1","x5t":"TDAmo0LONwir_3HbxKXJoLYxqa8","attributes":{"enabled":true,"nbf":1613501545,"exp":1645038145,"created":1613502145,"updated":1613502145,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7}}],"nextLink":null}, [
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
  '9040b32a-63cb-4b55-a84d-51a47a5b8620',
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
  'Tue, 16 Feb 2021 19:02:45 GMT',
  'Content-Length',
  '1099'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedcertificates/listCertificateName-canlistdeletedcertificatesbypage-0')
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
  '6f69148b-08ef-473d-b2a7-dd1e56e81398',
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
  'Tue, 16 Feb 2021 19:02:45 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedcertificates/listCertificateName-canlistdeletedcertificatesbypage-1')
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
  'b188abac-b528-4d3e-92f3-00f881a8ca73',
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
  'Tue, 16 Feb 2021 19:02:45 GMT'
]);

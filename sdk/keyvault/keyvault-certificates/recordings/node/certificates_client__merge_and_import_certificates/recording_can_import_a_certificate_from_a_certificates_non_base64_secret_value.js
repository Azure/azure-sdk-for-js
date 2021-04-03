let nock = require('nock');

module.exports.hash = "52c4d719413e16cee69a104b93be4c77";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/certificates/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-0/create')
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
  '9e359145-6b88-44d6-8eea-c3be7b8cecf4',
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
  'Tue, 16 Feb 2021 19:06:47 GMT'
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
  'e8b47690-2ac1-4fd6-9e99-5c920e1cf400',
  'x-ms-ests-server',
  '2.1.11496.5 - SCUS ProdSlices',
  'Set-Cookie',
  'fpc=AufoSEQpIbxLjzJaYLa_pBMA4qsDEQAAAE0NvtcOAAAA; expires=Thu, 18-Mar-2021 19:06:48 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 16 Feb 2021 19:06:47 GMT',
  'Content-Length',
  '1315'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/certificates/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-0/create', {"policy":{"key_props":{},"secret_props":{},"x509_props":{"subject":"cn=MyCert","sans":{}},"issuer":{"name":"Self"},"attributes":{}},"attributes":{}})
  .query(true)
  .reply(202, {"id":"https://keyvault_name.vault.azure.net/certificates/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAwMbw6MwCYWkdK4wjxaVeQCWoS7Z8AGY7ugNCn+chSyhMKHBGee5czvKfIU1kmLC8NRe9TErHR2P9hpSw3Jly+2gxV6KFKeyRxQiT8y/7RCip9vqdfWKuocUkgxLUp9gSVv0WZZY3jlEiOarCdhkBOgGBBS37oSTowfKtGDDuCoFjutTq1H+boo9SEQIo2wbwmcAQ8qMMM/iPUyf0Ms5d+AQlua4usMBtYRDAtRM/FkIAuugCpUq1w5PZ9mcbtgDrM+ocjlubmKNoMkoTtdmf1ljhUwqZ1aeMQqjCsVHz2paZQz2jbssVncCCHZu/0UpdMY/iLI6JtVVrojuPYLudnQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAHkWsxw9pbQxe3kxBp7IcF3M8Ks+NCtF0RkCWaYdu6592/mdLQaWKwTRajs3vd13xj5s7nETd8kYPmFgX2Ty6YFkwpPyBxVjHU2NnGZUNPZBPvb/k7z+9Ylq40/0awMUltS7CETE6Z9+FHkWGYw0A7+Zdxfml0KWKmPR696y269CF9WEqIgwyDOMtT+B/xTqLSfNnCIaCBh9gSXc8jBRzRHe8tJPJyUTITN/G1YePVxglNwvtmPgIGtDslqodcs+J6oDid0Bkrh13DL2CRNiU0v7XT8S77II9SN9X6jbu4Ac+8tH8emQlvP2KclynTr0CL0RLfJ3wmqzRC0tRN1cO9Y=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"39a18b323cf7447e8ae8aef0241e09fd"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://keyvault_name.vault.azure.net/certificates/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-0/pending?api-version=7.2&request_id=39a18b323cf7447e8ae8aef0241e09fd',
  'Retry-After',
  '10',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  '65d3e0c9-4d00-4bf3-b7e8-d65123227147',
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
  'Tue, 16 Feb 2021 19:06:48 GMT',
  'Content-Length',
  '1365'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAwMbw6MwCYWkdK4wjxaVeQCWoS7Z8AGY7ugNCn+chSyhMKHBGee5czvKfIU1kmLC8NRe9TErHR2P9hpSw3Jly+2gxV6KFKeyRxQiT8y/7RCip9vqdfWKuocUkgxLUp9gSVv0WZZY3jlEiOarCdhkBOgGBBS37oSTowfKtGDDuCoFjutTq1H+boo9SEQIo2wbwmcAQ8qMMM/iPUyf0Ms5d+AQlua4usMBtYRDAtRM/FkIAuugCpUq1w5PZ9mcbtgDrM+ocjlubmKNoMkoTtdmf1ljhUwqZ1aeMQqjCsVHz2paZQz2jbssVncCCHZu/0UpdMY/iLI6JtVVrojuPYLudnQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAHkWsxw9pbQxe3kxBp7IcF3M8Ks+NCtF0RkCWaYdu6592/mdLQaWKwTRajs3vd13xj5s7nETd8kYPmFgX2Ty6YFkwpPyBxVjHU2NnGZUNPZBPvb/k7z+9Ylq40/0awMUltS7CETE6Z9+FHkWGYw0A7+Zdxfml0KWKmPR696y269CF9WEqIgwyDOMtT+B/xTqLSfNnCIaCBh9gSXc8jBRzRHe8tJPJyUTITN/G1YePVxglNwvtmPgIGtDslqodcs+J6oDid0Bkrh13DL2CRNiU0v7XT8S77II9SN9X6jbu4Ac+8tH8emQlvP2KclynTr0CL0RLfJ3wmqzRC0tRN1cO9Y=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"39a18b323cf7447e8ae8aef0241e09fd"}, [
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
  'c23af7b8-91b5-4184-b7a2-4cad64ed6865',
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
  'Tue, 16 Feb 2021 19:06:48 GMT',
  'Content-Length',
  '1365'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAwMbw6MwCYWkdK4wjxaVeQCWoS7Z8AGY7ugNCn+chSyhMKHBGee5czvKfIU1kmLC8NRe9TErHR2P9hpSw3Jly+2gxV6KFKeyRxQiT8y/7RCip9vqdfWKuocUkgxLUp9gSVv0WZZY3jlEiOarCdhkBOgGBBS37oSTowfKtGDDuCoFjutTq1H+boo9SEQIo2wbwmcAQ8qMMM/iPUyf0Ms5d+AQlua4usMBtYRDAtRM/FkIAuugCpUq1w5PZ9mcbtgDrM+ocjlubmKNoMkoTtdmf1ljhUwqZ1aeMQqjCsVHz2paZQz2jbssVncCCHZu/0UpdMY/iLI6JtVVrojuPYLudnQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAHkWsxw9pbQxe3kxBp7IcF3M8Ks+NCtF0RkCWaYdu6592/mdLQaWKwTRajs3vd13xj5s7nETd8kYPmFgX2Ty6YFkwpPyBxVjHU2NnGZUNPZBPvb/k7z+9Ylq40/0awMUltS7CETE6Z9+FHkWGYw0A7+Zdxfml0KWKmPR696y269CF9WEqIgwyDOMtT+B/xTqLSfNnCIaCBh9gSXc8jBRzRHe8tJPJyUTITN/G1YePVxglNwvtmPgIGtDslqodcs+J6oDid0Bkrh13DL2CRNiU0v7XT8S77II9SN9X6jbu4Ac+8tH8emQlvP2KclynTr0CL0RLfJ3wmqzRC0tRN1cO9Y=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"39a18b323cf7447e8ae8aef0241e09fd"}, [
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
  '2e3ff37d-0a89-4d3a-adbf-608299945e48',
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
  'Tue, 16 Feb 2021 19:06:48 GMT',
  'Content-Length',
  '1365'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAwMbw6MwCYWkdK4wjxaVeQCWoS7Z8AGY7ugNCn+chSyhMKHBGee5czvKfIU1kmLC8NRe9TErHR2P9hpSw3Jly+2gxV6KFKeyRxQiT8y/7RCip9vqdfWKuocUkgxLUp9gSVv0WZZY3jlEiOarCdhkBOgGBBS37oSTowfKtGDDuCoFjutTq1H+boo9SEQIo2wbwmcAQ8qMMM/iPUyf0Ms5d+AQlua4usMBtYRDAtRM/FkIAuugCpUq1w5PZ9mcbtgDrM+ocjlubmKNoMkoTtdmf1ljhUwqZ1aeMQqjCsVHz2paZQz2jbssVncCCHZu/0UpdMY/iLI6JtVVrojuPYLudnQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAHkWsxw9pbQxe3kxBp7IcF3M8Ks+NCtF0RkCWaYdu6592/mdLQaWKwTRajs3vd13xj5s7nETd8kYPmFgX2Ty6YFkwpPyBxVjHU2NnGZUNPZBPvb/k7z+9Ylq40/0awMUltS7CETE6Z9+FHkWGYw0A7+Zdxfml0KWKmPR696y269CF9WEqIgwyDOMtT+B/xTqLSfNnCIaCBh9gSXc8jBRzRHe8tJPJyUTITN/G1YePVxglNwvtmPgIGtDslqodcs+J6oDid0Bkrh13DL2CRNiU0v7XT8S77II9SN9X6jbu4Ac+8tH8emQlvP2KclynTr0CL0RLfJ3wmqzRC0tRN1cO9Y=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"39a18b323cf7447e8ae8aef0241e09fd"}, [
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
  'bf7ecbc6-169d-4dc9-97bb-726c9bc897df',
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
  'Tue, 16 Feb 2021 19:06:50 GMT',
  'Content-Length',
  '1365'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAwMbw6MwCYWkdK4wjxaVeQCWoS7Z8AGY7ugNCn+chSyhMKHBGee5czvKfIU1kmLC8NRe9TErHR2P9hpSw3Jly+2gxV6KFKeyRxQiT8y/7RCip9vqdfWKuocUkgxLUp9gSVv0WZZY3jlEiOarCdhkBOgGBBS37oSTowfKtGDDuCoFjutTq1H+boo9SEQIo2wbwmcAQ8qMMM/iPUyf0Ms5d+AQlua4usMBtYRDAtRM/FkIAuugCpUq1w5PZ9mcbtgDrM+ocjlubmKNoMkoTtdmf1ljhUwqZ1aeMQqjCsVHz2paZQz2jbssVncCCHZu/0UpdMY/iLI6JtVVrojuPYLudnQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAHkWsxw9pbQxe3kxBp7IcF3M8Ks+NCtF0RkCWaYdu6592/mdLQaWKwTRajs3vd13xj5s7nETd8kYPmFgX2Ty6YFkwpPyBxVjHU2NnGZUNPZBPvb/k7z+9Ylq40/0awMUltS7CETE6Z9+FHkWGYw0A7+Zdxfml0KWKmPR696y269CF9WEqIgwyDOMtT+B/xTqLSfNnCIaCBh9gSXc8jBRzRHe8tJPJyUTITN/G1YePVxglNwvtmPgIGtDslqodcs+J6oDid0Bkrh13DL2CRNiU0v7XT8S77II9SN9X6jbu4Ac+8tH8emQlvP2KclynTr0CL0RLfJ3wmqzRC0tRN1cO9Y=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"39a18b323cf7447e8ae8aef0241e09fd"}, [
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
  'd34be9a4-dffb-49fc-9b93-9acc44682080',
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
  'Tue, 16 Feb 2021 19:06:52 GMT',
  'Content-Length',
  '1365'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAwMbw6MwCYWkdK4wjxaVeQCWoS7Z8AGY7ugNCn+chSyhMKHBGee5czvKfIU1kmLC8NRe9TErHR2P9hpSw3Jly+2gxV6KFKeyRxQiT8y/7RCip9vqdfWKuocUkgxLUp9gSVv0WZZY3jlEiOarCdhkBOgGBBS37oSTowfKtGDDuCoFjutTq1H+boo9SEQIo2wbwmcAQ8qMMM/iPUyf0Ms5d+AQlua4usMBtYRDAtRM/FkIAuugCpUq1w5PZ9mcbtgDrM+ocjlubmKNoMkoTtdmf1ljhUwqZ1aeMQqjCsVHz2paZQz2jbssVncCCHZu/0UpdMY/iLI6JtVVrojuPYLudnQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAHkWsxw9pbQxe3kxBp7IcF3M8Ks+NCtF0RkCWaYdu6592/mdLQaWKwTRajs3vd13xj5s7nETd8kYPmFgX2Ty6YFkwpPyBxVjHU2NnGZUNPZBPvb/k7z+9Ylq40/0awMUltS7CETE6Z9+FHkWGYw0A7+Zdxfml0KWKmPR696y269CF9WEqIgwyDOMtT+B/xTqLSfNnCIaCBh9gSXc8jBRzRHe8tJPJyUTITN/G1YePVxglNwvtmPgIGtDslqodcs+J6oDid0Bkrh13DL2CRNiU0v7XT8S77II9SN9X6jbu4Ac+8tH8emQlvP2KclynTr0CL0RLfJ3wmqzRC0tRN1cO9Y=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"39a18b323cf7447e8ae8aef0241e09fd"}, [
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
  '8f549234-4911-4c31-b481-450124065b4e',
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
  'Tue, 16 Feb 2021 19:06:54 GMT',
  'Content-Length',
  '1365'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAwMbw6MwCYWkdK4wjxaVeQCWoS7Z8AGY7ugNCn+chSyhMKHBGee5czvKfIU1kmLC8NRe9TErHR2P9hpSw3Jly+2gxV6KFKeyRxQiT8y/7RCip9vqdfWKuocUkgxLUp9gSVv0WZZY3jlEiOarCdhkBOgGBBS37oSTowfKtGDDuCoFjutTq1H+boo9SEQIo2wbwmcAQ8qMMM/iPUyf0Ms5d+AQlua4usMBtYRDAtRM/FkIAuugCpUq1w5PZ9mcbtgDrM+ocjlubmKNoMkoTtdmf1ljhUwqZ1aeMQqjCsVHz2paZQz2jbssVncCCHZu/0UpdMY/iLI6JtVVrojuPYLudnQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAHkWsxw9pbQxe3kxBp7IcF3M8Ks+NCtF0RkCWaYdu6592/mdLQaWKwTRajs3vd13xj5s7nETd8kYPmFgX2Ty6YFkwpPyBxVjHU2NnGZUNPZBPvb/k7z+9Ylq40/0awMUltS7CETE6Z9+FHkWGYw0A7+Zdxfml0KWKmPR696y269CF9WEqIgwyDOMtT+B/xTqLSfNnCIaCBh9gSXc8jBRzRHe8tJPJyUTITN/G1YePVxglNwvtmPgIGtDslqodcs+J6oDid0Bkrh13DL2CRNiU0v7XT8S77II9SN9X6jbu4Ac+8tH8emQlvP2KclynTr0CL0RLfJ3wmqzRC0tRN1cO9Y=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"39a18b323cf7447e8ae8aef0241e09fd"}, [
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
  '26046c22-c5a8-4891-8518-e00676e2bcc5',
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
  'Tue, 16 Feb 2021 19:06:56 GMT',
  'Content-Length',
  '1365'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAwMbw6MwCYWkdK4wjxaVeQCWoS7Z8AGY7ugNCn+chSyhMKHBGee5czvKfIU1kmLC8NRe9TErHR2P9hpSw3Jly+2gxV6KFKeyRxQiT8y/7RCip9vqdfWKuocUkgxLUp9gSVv0WZZY3jlEiOarCdhkBOgGBBS37oSTowfKtGDDuCoFjutTq1H+boo9SEQIo2wbwmcAQ8qMMM/iPUyf0Ms5d+AQlua4usMBtYRDAtRM/FkIAuugCpUq1w5PZ9mcbtgDrM+ocjlubmKNoMkoTtdmf1ljhUwqZ1aeMQqjCsVHz2paZQz2jbssVncCCHZu/0UpdMY/iLI6JtVVrojuPYLudnQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAHkWsxw9pbQxe3kxBp7IcF3M8Ks+NCtF0RkCWaYdu6592/mdLQaWKwTRajs3vd13xj5s7nETd8kYPmFgX2Ty6YFkwpPyBxVjHU2NnGZUNPZBPvb/k7z+9Ylq40/0awMUltS7CETE6Z9+FHkWGYw0A7+Zdxfml0KWKmPR696y269CF9WEqIgwyDOMtT+B/xTqLSfNnCIaCBh9gSXc8jBRzRHe8tJPJyUTITN/G1YePVxglNwvtmPgIGtDslqodcs+J6oDid0Bkrh13DL2CRNiU0v7XT8S77II9SN9X6jbu4Ac+8tH8emQlvP2KclynTr0CL0RLfJ3wmqzRC0tRN1cO9Y=","cancellation_requested":false,"status":"completed","target":"https://keyvault_name.vault.azure.net/certificates/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-0","request_id":"39a18b323cf7447e8ae8aef0241e09fd"}, [
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
  'e001bea3-4a68-4c61-b494-eab10c255d7f',
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
  'Tue, 16 Feb 2021 19:06:58 GMT',
  'Content-Length',
  '1357'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-0/')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-0/6e1ba1606de04d0fbc6532ed157c0d49","kid":"https://keyvault_name.vault.azure.net/keys/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-0/6e1ba1606de04d0fbc6532ed157c0d49","sid":"https://keyvault_name.vault.azure.net/secrets/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-0/6e1ba1606de04d0fbc6532ed157c0d49","x5t":"RmoREcojZYQHJhx-8J4iJMccqvg","cer":"MIIDKDCCAhCgAwIBAgIQc4jegbhyT12Qu8I2APh0vDANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjEwMjE2MTg1NjU2WhcNMjIwMjE2MTkwNjU2WjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQDAxvDozAJhaR0rjCPFpV5AJahLtnwAZju6A0Kf5yFLKEwocEZ57lzO8p8hTWSYsLw1F71MSsdHY/2GlLDcmXL7aDFXooUp7JHFCJPzL/tEKKn2+p19Yq6hxSSDEtSn2BJW/RZlljeOUSI5qsJ2GQE6AYEFLfuhJOjB8q0YMO4KgWO61OrUf5uij1IRAijbBvCZwBDyowwz+I9TJ/Qyzl34BCW5ri6wwG1hEMC1Ez8WQgC66AKlSrXDk9n2Zxu2AOsz6hyOW5uYo2gyShO12Z/WWOFTCpnVp4xCqMKxUfPalplDPaNuyxWdwIIdm7/RSl0xj+Isjom1VWuiO49gu52dAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBSmHhkIr3tPK312izdkBXumNrmtOjAdBgNVHQ4EFgQUph4ZCK97Tyt9dos3ZAV7pja5rTowDQYJKoZIhvcNAQELBQADggEBACK2EwMpnIEuY489HBDIKaVHHswz/KYL9cQpxcACjvMMj2lszJML2sMUBRNPmLRIMpHrJNq4mA/rJLOA7rtcVAbBIBCRMyxEHqYnFc4FyCKiUky0JGSLFKiwCzHIuY0P1IjKj6qqFSDEl5k1BjtP5MiF5b24SyRwqFHJTlM2LSTIVrEL4D205jTCf2DG6vT/sruiUO8YS8JhJwMwoOT0sUN/RxBzVcUGVLnomosGBQxwLgRWrCgwUODbymfGlCDPJZSDI/l1QnviNHMHB9utScrHps/P3c7+mN3WmpiTuUc8G+Hh62YamHSpfkrtoU4uHd70FM3tqHcFgyUfEc5oc3U=","attributes":{"enabled":true,"nbf":1613501816,"exp":1645038416,"created":1613502417,"updated":1613502417,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-0/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1613502408,"updated":1613502408}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-0/pending"}}, [
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
  'b724f1b0-30aa-4962-ba91-1ca9e824379a',
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
  'Tue, 16 Feb 2021 19:06:58 GMT',
  'Content-Length',
  '2724'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/secrets/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-0/')
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
  '84725f45-a5ba-4b45-b067-297a76d13f2f',
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
  'Tue, 16 Feb 2021 19:06:58 GMT'
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
  '5ede6b40-4138-41bb-b014-cae9f69b0501',
  'x-ms-ests-server',
  '2.1.11496.5 - EUS ProdSlices',
  'Set-Cookie',
  'fpc=AufoSEQpIbxLjzJaYLa_pBMA4qsDDQAAAHkOvtcOAAAA; expires=Thu, 18-Mar-2021 19:06:59 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 16 Feb 2021 19:06:58 GMT',
  'Content-Length',
  '1315'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/secrets/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-0/')
  .query(true)
  .reply(200, {"value":"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","contentType":"application/x-pkcs12","id":"https://keyvault_name.vault.azure.net/secrets/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-0/6e1ba1606de04d0fbc6532ed157c0d49","managed":true,"attributes":{"enabled":true,"nbf":1613501816,"exp":1645038416,"created":1613502417,"updated":1613502417,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7},"kid":"https://keyvault_name.vault.azure.net/keys/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-0/6e1ba1606de04d0fbc6532ed157c0d49"}, [
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
  '44d0eab6-f473-4a69-bdd3-383ad09e8c89',
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
  'Tue, 16 Feb 2021 19:06:58 GMT',
  'Content-Length',
  '4096'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/certificates/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-1/import', {"value":"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"})
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-1/79d4c74341b644c5af75a7726bc1b59e","kid":"https://keyvault_name.vault.azure.net/keys/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-1/79d4c74341b644c5af75a7726bc1b59e","sid":"https://keyvault_name.vault.azure.net/secrets/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-1/79d4c74341b644c5af75a7726bc1b59e","x5t":"RmoREcojZYQHJhx-8J4iJMccqvg","cer":"MIIDKDCCAhCgAwIBAgIQc4jegbhyT12Qu8I2APh0vDANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjEwMjE2MTg1NjU2WhcNMjIwMjE2MTkwNjU2WjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQDAxvDozAJhaR0rjCPFpV5AJahLtnwAZju6A0Kf5yFLKEwocEZ57lzO8p8hTWSYsLw1F71MSsdHY/2GlLDcmXL7aDFXooUp7JHFCJPzL/tEKKn2+p19Yq6hxSSDEtSn2BJW/RZlljeOUSI5qsJ2GQE6AYEFLfuhJOjB8q0YMO4KgWO61OrUf5uij1IRAijbBvCZwBDyowwz+I9TJ/Qyzl34BCW5ri6wwG1hEMC1Ez8WQgC66AKlSrXDk9n2Zxu2AOsz6hyOW5uYo2gyShO12Z/WWOFTCpnVp4xCqMKxUfPalplDPaNuyxWdwIIdm7/RSl0xj+Isjom1VWuiO49gu52dAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBSmHhkIr3tPK312izdkBXumNrmtOjAdBgNVHQ4EFgQUph4ZCK97Tyt9dos3ZAV7pja5rTowDQYJKoZIhvcNAQELBQADggEBACK2EwMpnIEuY489HBDIKaVHHswz/KYL9cQpxcACjvMMj2lszJML2sMUBRNPmLRIMpHrJNq4mA/rJLOA7rtcVAbBIBCRMyxEHqYnFc4FyCKiUky0JGSLFKiwCzHIuY0P1IjKj6qqFSDEl5k1BjtP5MiF5b24SyRwqFHJTlM2LSTIVrEL4D205jTCf2DG6vT/sruiUO8YS8JhJwMwoOT0sUN/RxBzVcUGVLnomosGBQxwLgRWrCgwUODbymfGlCDPJZSDI/l1QnviNHMHB9utScrHps/P3c7+mN3WmpiTuUc8G+Hh62YamHSpfkrtoU4uHd70FM3tqHcFgyUfEc5oc3U=","attributes":{"enabled":true,"nbf":1613501816,"exp":1645038416,"created":1613502419,"updated":1613502419,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-1/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"CN=MyCert","ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":13,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"EmailContacts"}}],"issuer":{"name":"Unknown"},"attributes":{"enabled":true,"created":1613502419,"updated":1613502419}}}, [
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
  '6ca950dd-5679-43d7-bc5e-c6135e9567a5',
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
  'Tue, 16 Feb 2021 19:06:59 GMT',
  'Content-Length',
  '2548'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/certificates/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-0')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-0","deletedDate":1613502420,"scheduledPurgeDate":1614107220,"id":"https://keyvault_name.vault.azure.net/certificates/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-0/6e1ba1606de04d0fbc6532ed157c0d49","kid":"https://keyvault_name.vault.azure.net/keys/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-0/6e1ba1606de04d0fbc6532ed157c0d49","sid":"https://keyvault_name.vault.azure.net/secrets/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-0/6e1ba1606de04d0fbc6532ed157c0d49","x5t":"RmoREcojZYQHJhx-8J4iJMccqvg","cer":"MIIDKDCCAhCgAwIBAgIQc4jegbhyT12Qu8I2APh0vDANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjEwMjE2MTg1NjU2WhcNMjIwMjE2MTkwNjU2WjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQDAxvDozAJhaR0rjCPFpV5AJahLtnwAZju6A0Kf5yFLKEwocEZ57lzO8p8hTWSYsLw1F71MSsdHY/2GlLDcmXL7aDFXooUp7JHFCJPzL/tEKKn2+p19Yq6hxSSDEtSn2BJW/RZlljeOUSI5qsJ2GQE6AYEFLfuhJOjB8q0YMO4KgWO61OrUf5uij1IRAijbBvCZwBDyowwz+I9TJ/Qyzl34BCW5ri6wwG1hEMC1Ez8WQgC66AKlSrXDk9n2Zxu2AOsz6hyOW5uYo2gyShO12Z/WWOFTCpnVp4xCqMKxUfPalplDPaNuyxWdwIIdm7/RSl0xj+Isjom1VWuiO49gu52dAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBSmHhkIr3tPK312izdkBXumNrmtOjAdBgNVHQ4EFgQUph4ZCK97Tyt9dos3ZAV7pja5rTowDQYJKoZIhvcNAQELBQADggEBACK2EwMpnIEuY489HBDIKaVHHswz/KYL9cQpxcACjvMMj2lszJML2sMUBRNPmLRIMpHrJNq4mA/rJLOA7rtcVAbBIBCRMyxEHqYnFc4FyCKiUky0JGSLFKiwCzHIuY0P1IjKj6qqFSDEl5k1BjtP5MiF5b24SyRwqFHJTlM2LSTIVrEL4D205jTCf2DG6vT/sruiUO8YS8JhJwMwoOT0sUN/RxBzVcUGVLnomosGBQxwLgRWrCgwUODbymfGlCDPJZSDI/l1QnviNHMHB9utScrHps/P3c7+mN3WmpiTuUc8G+Hh62YamHSpfkrtoU4uHd70FM3tqHcFgyUfEc5oc3U=","attributes":{"enabled":true,"nbf":1613501816,"exp":1645038416,"created":1613502417,"updated":1613502417,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-0/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1613502408,"updated":1613502408}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-0/pending"}}, [
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
  'b0201e4d-32da-422c-a567-48a47b2ce123',
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
  'Tue, 16 Feb 2021 19:06:59 GMT',
  'Content-Length',
  '2949'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-0')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-0"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '182',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  'f4150d53-0b22-4655-ba40-9ae6b95c8dbc',
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
  'Tue, 16 Feb 2021 19:06:59 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-0')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-0"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '182',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  '82f14dc5-c5e8-47fa-b980-a4bfa91aa862',
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
  'Tue, 16 Feb 2021 19:06:59 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-0')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-0"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '182',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  'd167e3a8-258a-42b0-9165-7bb15ef75b7e',
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
  'Tue, 16 Feb 2021 19:07:01 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-0')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-0"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '182',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  '9a04b131-ea9c-4948-b00e-72377d1fc8a6',
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
  'Tue, 16 Feb 2021 19:07:04 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-0')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-0"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '182',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  '01bbcec9-b815-43ca-a363-8ec857998d9b',
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
  'Tue, 16 Feb 2021 19:07:06 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-0')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-0","deletedDate":1613502420,"scheduledPurgeDate":1614107220,"id":"https://keyvault_name.vault.azure.net/certificates/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-0/6e1ba1606de04d0fbc6532ed157c0d49","kid":"https://keyvault_name.vault.azure.net/keys/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-0/6e1ba1606de04d0fbc6532ed157c0d49","sid":"https://keyvault_name.vault.azure.net/secrets/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-0/6e1ba1606de04d0fbc6532ed157c0d49","x5t":"RmoREcojZYQHJhx-8J4iJMccqvg","cer":"MIIDKDCCAhCgAwIBAgIQc4jegbhyT12Qu8I2APh0vDANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjEwMjE2MTg1NjU2WhcNMjIwMjE2MTkwNjU2WjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQDAxvDozAJhaR0rjCPFpV5AJahLtnwAZju6A0Kf5yFLKEwocEZ57lzO8p8hTWSYsLw1F71MSsdHY/2GlLDcmXL7aDFXooUp7JHFCJPzL/tEKKn2+p19Yq6hxSSDEtSn2BJW/RZlljeOUSI5qsJ2GQE6AYEFLfuhJOjB8q0YMO4KgWO61OrUf5uij1IRAijbBvCZwBDyowwz+I9TJ/Qyzl34BCW5ri6wwG1hEMC1Ez8WQgC66AKlSrXDk9n2Zxu2AOsz6hyOW5uYo2gyShO12Z/WWOFTCpnVp4xCqMKxUfPalplDPaNuyxWdwIIdm7/RSl0xj+Isjom1VWuiO49gu52dAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBSmHhkIr3tPK312izdkBXumNrmtOjAdBgNVHQ4EFgQUph4ZCK97Tyt9dos3ZAV7pja5rTowDQYJKoZIhvcNAQELBQADggEBACK2EwMpnIEuY489HBDIKaVHHswz/KYL9cQpxcACjvMMj2lszJML2sMUBRNPmLRIMpHrJNq4mA/rJLOA7rtcVAbBIBCRMyxEHqYnFc4FyCKiUky0JGSLFKiwCzHIuY0P1IjKj6qqFSDEl5k1BjtP5MiF5b24SyRwqFHJTlM2LSTIVrEL4D205jTCf2DG6vT/sruiUO8YS8JhJwMwoOT0sUN/RxBzVcUGVLnomosGBQxwLgRWrCgwUODbymfGlCDPJZSDI/l1QnviNHMHB9utScrHps/P3c7+mN3WmpiTuUc8G+Hh62YamHSpfkrtoU4uHd70FM3tqHcFgyUfEc5oc3U=","attributes":{"enabled":true,"nbf":1613501816,"exp":1645038416,"created":1613502417,"updated":1613502417,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-0/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1613502408,"updated":1613502408}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-0/pending"}}, [
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
  '6e1b0609-d8c2-4515-88a9-81c933c30a22',
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
  'Tue, 16 Feb 2021 19:07:08 GMT',
  'Content-Length',
  '2949'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedcertificates/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-0')
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
  'ecd10dea-5258-496f-a70d-0d79c388dde8',
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
  'Tue, 16 Feb 2021 19:07:08 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/certificates/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-1')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-1","deletedDate":1613502428,"scheduledPurgeDate":1614107228,"id":"https://keyvault_name.vault.azure.net/certificates/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-1/79d4c74341b644c5af75a7726bc1b59e","kid":"https://keyvault_name.vault.azure.net/keys/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-1/79d4c74341b644c5af75a7726bc1b59e","sid":"https://keyvault_name.vault.azure.net/secrets/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-1/79d4c74341b644c5af75a7726bc1b59e","x5t":"RmoREcojZYQHJhx-8J4iJMccqvg","cer":"MIIDKDCCAhCgAwIBAgIQc4jegbhyT12Qu8I2APh0vDANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjEwMjE2MTg1NjU2WhcNMjIwMjE2MTkwNjU2WjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQDAxvDozAJhaR0rjCPFpV5AJahLtnwAZju6A0Kf5yFLKEwocEZ57lzO8p8hTWSYsLw1F71MSsdHY/2GlLDcmXL7aDFXooUp7JHFCJPzL/tEKKn2+p19Yq6hxSSDEtSn2BJW/RZlljeOUSI5qsJ2GQE6AYEFLfuhJOjB8q0YMO4KgWO61OrUf5uij1IRAijbBvCZwBDyowwz+I9TJ/Qyzl34BCW5ri6wwG1hEMC1Ez8WQgC66AKlSrXDk9n2Zxu2AOsz6hyOW5uYo2gyShO12Z/WWOFTCpnVp4xCqMKxUfPalplDPaNuyxWdwIIdm7/RSl0xj+Isjom1VWuiO49gu52dAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBSmHhkIr3tPK312izdkBXumNrmtOjAdBgNVHQ4EFgQUph4ZCK97Tyt9dos3ZAV7pja5rTowDQYJKoZIhvcNAQELBQADggEBACK2EwMpnIEuY489HBDIKaVHHswz/KYL9cQpxcACjvMMj2lszJML2sMUBRNPmLRIMpHrJNq4mA/rJLOA7rtcVAbBIBCRMyxEHqYnFc4FyCKiUky0JGSLFKiwCzHIuY0P1IjKj6qqFSDEl5k1BjtP5MiF5b24SyRwqFHJTlM2LSTIVrEL4D205jTCf2DG6vT/sruiUO8YS8JhJwMwoOT0sUN/RxBzVcUGVLnomosGBQxwLgRWrCgwUODbymfGlCDPJZSDI/l1QnviNHMHB9utScrHps/P3c7+mN3WmpiTuUc8G+Hh62YamHSpfkrtoU4uHd70FM3tqHcFgyUfEc5oc3U=","attributes":{"enabled":true,"nbf":1613501816,"exp":1645038416,"created":1613502419,"updated":1613502419,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-1/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"CN=MyCert","ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":13,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"EmailContacts"}}],"issuer":{"name":"Unknown"},"attributes":{"enabled":true,"created":1613502419,"updated":1613502419}}}, [
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
  '42afb85b-89d7-452c-8aa7-99db6585a4e7',
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
  'Tue, 16 Feb 2021 19:07:08 GMT',
  'Content-Length',
  '2773'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-1')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-1"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '182',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  'fa113c19-9428-4598-ab18-bdec6d2a1b8d',
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
  'Tue, 16 Feb 2021 19:07:08 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-1')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-1"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '182',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  'ef19215a-fd12-425f-8de8-d63f29ec2812',
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
  'Tue, 16 Feb 2021 19:07:08 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-1')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-1"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '182',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  '4e25dc20-731d-4a0b-85b8-d9671bbc7c6d',
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
  'Tue, 16 Feb 2021 19:07:10 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-1')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-1"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '182',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  '44e7778e-2073-4043-a380-e8fc296ae53e',
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
  'Tue, 16 Feb 2021 19:07:13 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-1')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-1"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '182',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  '0a630f14-51ad-476e-bcf0-00d940ebecfb',
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
  'Tue, 16 Feb 2021 19:07:14 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-1')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-1","deletedDate":1613502428,"scheduledPurgeDate":1614107228,"id":"https://keyvault_name.vault.azure.net/certificates/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-1/79d4c74341b644c5af75a7726bc1b59e","kid":"https://keyvault_name.vault.azure.net/keys/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-1/79d4c74341b644c5af75a7726bc1b59e","sid":"https://keyvault_name.vault.azure.net/secrets/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-1/79d4c74341b644c5af75a7726bc1b59e","x5t":"RmoREcojZYQHJhx-8J4iJMccqvg","cer":"MIIDKDCCAhCgAwIBAgIQc4jegbhyT12Qu8I2APh0vDANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjEwMjE2MTg1NjU2WhcNMjIwMjE2MTkwNjU2WjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQDAxvDozAJhaR0rjCPFpV5AJahLtnwAZju6A0Kf5yFLKEwocEZ57lzO8p8hTWSYsLw1F71MSsdHY/2GlLDcmXL7aDFXooUp7JHFCJPzL/tEKKn2+p19Yq6hxSSDEtSn2BJW/RZlljeOUSI5qsJ2GQE6AYEFLfuhJOjB8q0YMO4KgWO61OrUf5uij1IRAijbBvCZwBDyowwz+I9TJ/Qyzl34BCW5ri6wwG1hEMC1Ez8WQgC66AKlSrXDk9n2Zxu2AOsz6hyOW5uYo2gyShO12Z/WWOFTCpnVp4xCqMKxUfPalplDPaNuyxWdwIIdm7/RSl0xj+Isjom1VWuiO49gu52dAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBSmHhkIr3tPK312izdkBXumNrmtOjAdBgNVHQ4EFgQUph4ZCK97Tyt9dos3ZAV7pja5rTowDQYJKoZIhvcNAQELBQADggEBACK2EwMpnIEuY489HBDIKaVHHswz/KYL9cQpxcACjvMMj2lszJML2sMUBRNPmLRIMpHrJNq4mA/rJLOA7rtcVAbBIBCRMyxEHqYnFc4FyCKiUky0JGSLFKiwCzHIuY0P1IjKj6qqFSDEl5k1BjtP5MiF5b24SyRwqFHJTlM2LSTIVrEL4D205jTCf2DG6vT/sruiUO8YS8JhJwMwoOT0sUN/RxBzVcUGVLnomosGBQxwLgRWrCgwUODbymfGlCDPJZSDI/l1QnviNHMHB9utScrHps/P3c7+mN3WmpiTuUc8G+Hh62YamHSpfkrtoU4uHd70FM3tqHcFgyUfEc5oc3U=","attributes":{"enabled":true,"nbf":1613501816,"exp":1645038416,"created":1613502419,"updated":1613502419,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-1/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"CN=MyCert","ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":13,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"EmailContacts"}}],"issuer":{"name":"Unknown"},"attributes":{"enabled":true,"created":1613502419,"updated":1613502419}}}, [
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
  '8f45adf5-feb1-499b-aae6-889427fe921f',
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
  'Tue, 16 Feb 2021 19:07:17 GMT',
  'Content-Length',
  '2773'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedcertificates/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-1')
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
  'a03081ea-e57c-495d-868b-855c966b0a8e',
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
  'Tue, 16 Feb 2021 19:07:16 GMT'
]);

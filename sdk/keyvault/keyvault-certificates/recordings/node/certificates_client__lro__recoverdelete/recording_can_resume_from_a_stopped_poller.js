let nock = require('nock');

module.exports.hash = "dcf66f9980cc8edac2cc0d2ae1b852b7";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/certificates/lroRecoverCertificateName-canresumefromastoppedpoller-/create')
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
  '89c18534-d242-4439-a396-fccde6b9b8c0',
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
  'Tue, 16 Feb 2021 19:06:06 GMT'
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
  '273c2a7d-8391-44f8-9729-1deea72ef100',
  'x-ms-ests-server',
  '2.1.11496.5 - SCUS ProdSlices',
  'Set-Cookie',
  'fpc=AufoSEQpIbxLjzJaYLa_pBMA4qsDEQAAAE0NvtcOAAAA; expires=Thu, 18-Mar-2021 19:06:06 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 16 Feb 2021 19:06:06 GMT',
  'Content-Length',
  '1315'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/certificates/lroRecoverCertificateName-canresumefromastoppedpoller-/create', {"policy":{"key_props":{},"secret_props":{},"x509_props":{"subject":"cn=MyCert","sans":{}},"issuer":{"name":"Self"},"attributes":{}},"attributes":{}})
  .query(true)
  .reply(202, {"id":"https://keyvault_name.vault.azure.net/certificates/lroRecoverCertificateName-canresumefromastoppedpoller-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA1ryOS24WNVDMhKy+r8k6MMH8YlgQFxZc9r+WiEsxhv6chNlxZABTwFd/P//Q6oDaoESYl/s17atfEQOfFt9zZUKmQR5FFWXUUX+K3NRxfpqXrEwHmQlsCwUubqPqIR0BkCe5hPoqLMv4HlzioCJgi8fofEdBAhle989Y5Jo2vzukd7yi5pbLmngdrtKq0HToRDrgWLlbAOUBhDYXufFHei4nw+9uDBkLwucxBT9tNiZSmze2X4EYpWTl3KcAoArWuxlKqgHnBSiysF5zN1yLEvUuyABH63gRR78Pcmp2TJahLRBAT6GCHihHMciYxDA7pXp27F3k3vmQ+kMLsS6s3QIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAI9OcMDZQcV5I7muNDd/etW6K4+SSbKTEP+YmcQqW2dJsgrv2JjLk5W1FSIzyTALWkqFQiNfaK8WiVPBXYi4Wyf6r6VtHMpuJwgyHYITtMYaYu1Uoag/Qf1ajhU69p2rkvRm18NPa9+4TEU03btsxOPNovuxRVTLDb6d2MNOp3EFxzV7N0QJmj5Tyz2x78xVt3WbXDne2/DdF1lOPiOE78A3V0NlJwTN2CTFcrX9GhSrLA8Tum2ecxK1HTmJUqmXvTNBg0AcPEE6mDovcDP22QuUusqsbhwWUEUhVrNofbGoD/77MEDuFsTNzgugDOg2K0AYHOwtxyG0Okdvma8fIjk=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"456eed013b914ce39bd2f7f8d9942381"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://keyvault_name.vault.azure.net/certificates/lroRecoverCertificateName-canresumefromastoppedpoller-/pending?api-version=7.2&request_id=456eed013b914ce39bd2f7f8d9942381',
  'Retry-After',
  '10',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  '31f8ee64-04bf-4fa2-98b8-7b6a3c9dba84',
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
  'Tue, 16 Feb 2021 19:06:07 GMT',
  'Content-Length',
  '1337'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroRecoverCertificateName-canresumefromastoppedpoller-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroRecoverCertificateName-canresumefromastoppedpoller-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA1ryOS24WNVDMhKy+r8k6MMH8YlgQFxZc9r+WiEsxhv6chNlxZABTwFd/P//Q6oDaoESYl/s17atfEQOfFt9zZUKmQR5FFWXUUX+K3NRxfpqXrEwHmQlsCwUubqPqIR0BkCe5hPoqLMv4HlzioCJgi8fofEdBAhle989Y5Jo2vzukd7yi5pbLmngdrtKq0HToRDrgWLlbAOUBhDYXufFHei4nw+9uDBkLwucxBT9tNiZSmze2X4EYpWTl3KcAoArWuxlKqgHnBSiysF5zN1yLEvUuyABH63gRR78Pcmp2TJahLRBAT6GCHihHMciYxDA7pXp27F3k3vmQ+kMLsS6s3QIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAI9OcMDZQcV5I7muNDd/etW6K4+SSbKTEP+YmcQqW2dJsgrv2JjLk5W1FSIzyTALWkqFQiNfaK8WiVPBXYi4Wyf6r6VtHMpuJwgyHYITtMYaYu1Uoag/Qf1ajhU69p2rkvRm18NPa9+4TEU03btsxOPNovuxRVTLDb6d2MNOp3EFxzV7N0QJmj5Tyz2x78xVt3WbXDne2/DdF1lOPiOE78A3V0NlJwTN2CTFcrX9GhSrLA8Tum2ecxK1HTmJUqmXvTNBg0AcPEE6mDovcDP22QuUusqsbhwWUEUhVrNofbGoD/77MEDuFsTNzgugDOg2K0AYHOwtxyG0Okdvma8fIjk=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"456eed013b914ce39bd2f7f8d9942381"}, [
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
  '4f47b80f-3804-4ddd-ba93-0835a636e469',
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
  'Tue, 16 Feb 2021 19:06:07 GMT',
  'Content-Length',
  '1337'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroRecoverCertificateName-canresumefromastoppedpoller-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroRecoverCertificateName-canresumefromastoppedpoller-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA1ryOS24WNVDMhKy+r8k6MMH8YlgQFxZc9r+WiEsxhv6chNlxZABTwFd/P//Q6oDaoESYl/s17atfEQOfFt9zZUKmQR5FFWXUUX+K3NRxfpqXrEwHmQlsCwUubqPqIR0BkCe5hPoqLMv4HlzioCJgi8fofEdBAhle989Y5Jo2vzukd7yi5pbLmngdrtKq0HToRDrgWLlbAOUBhDYXufFHei4nw+9uDBkLwucxBT9tNiZSmze2X4EYpWTl3KcAoArWuxlKqgHnBSiysF5zN1yLEvUuyABH63gRR78Pcmp2TJahLRBAT6GCHihHMciYxDA7pXp27F3k3vmQ+kMLsS6s3QIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAI9OcMDZQcV5I7muNDd/etW6K4+SSbKTEP+YmcQqW2dJsgrv2JjLk5W1FSIzyTALWkqFQiNfaK8WiVPBXYi4Wyf6r6VtHMpuJwgyHYITtMYaYu1Uoag/Qf1ajhU69p2rkvRm18NPa9+4TEU03btsxOPNovuxRVTLDb6d2MNOp3EFxzV7N0QJmj5Tyz2x78xVt3WbXDne2/DdF1lOPiOE78A3V0NlJwTN2CTFcrX9GhSrLA8Tum2ecxK1HTmJUqmXvTNBg0AcPEE6mDovcDP22QuUusqsbhwWUEUhVrNofbGoD/77MEDuFsTNzgugDOg2K0AYHOwtxyG0Okdvma8fIjk=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"456eed013b914ce39bd2f7f8d9942381"}, [
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
  'ce16c42e-6a82-42d8-864c-7909eb09f5f0',
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
  'Tue, 16 Feb 2021 19:06:07 GMT',
  'Content-Length',
  '1337'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroRecoverCertificateName-canresumefromastoppedpoller-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroRecoverCertificateName-canresumefromastoppedpoller-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA1ryOS24WNVDMhKy+r8k6MMH8YlgQFxZc9r+WiEsxhv6chNlxZABTwFd/P//Q6oDaoESYl/s17atfEQOfFt9zZUKmQR5FFWXUUX+K3NRxfpqXrEwHmQlsCwUubqPqIR0BkCe5hPoqLMv4HlzioCJgi8fofEdBAhle989Y5Jo2vzukd7yi5pbLmngdrtKq0HToRDrgWLlbAOUBhDYXufFHei4nw+9uDBkLwucxBT9tNiZSmze2X4EYpWTl3KcAoArWuxlKqgHnBSiysF5zN1yLEvUuyABH63gRR78Pcmp2TJahLRBAT6GCHihHMciYxDA7pXp27F3k3vmQ+kMLsS6s3QIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAI9OcMDZQcV5I7muNDd/etW6K4+SSbKTEP+YmcQqW2dJsgrv2JjLk5W1FSIzyTALWkqFQiNfaK8WiVPBXYi4Wyf6r6VtHMpuJwgyHYITtMYaYu1Uoag/Qf1ajhU69p2rkvRm18NPa9+4TEU03btsxOPNovuxRVTLDb6d2MNOp3EFxzV7N0QJmj5Tyz2x78xVt3WbXDne2/DdF1lOPiOE78A3V0NlJwTN2CTFcrX9GhSrLA8Tum2ecxK1HTmJUqmXvTNBg0AcPEE6mDovcDP22QuUusqsbhwWUEUhVrNofbGoD/77MEDuFsTNzgugDOg2K0AYHOwtxyG0Okdvma8fIjk=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"456eed013b914ce39bd2f7f8d9942381"}, [
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
  'c0c446cf-40d8-4ecc-8af7-00794870f03b',
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
  'Tue, 16 Feb 2021 19:06:09 GMT',
  'Content-Length',
  '1337'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroRecoverCertificateName-canresumefromastoppedpoller-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroRecoverCertificateName-canresumefromastoppedpoller-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA1ryOS24WNVDMhKy+r8k6MMH8YlgQFxZc9r+WiEsxhv6chNlxZABTwFd/P//Q6oDaoESYl/s17atfEQOfFt9zZUKmQR5FFWXUUX+K3NRxfpqXrEwHmQlsCwUubqPqIR0BkCe5hPoqLMv4HlzioCJgi8fofEdBAhle989Y5Jo2vzukd7yi5pbLmngdrtKq0HToRDrgWLlbAOUBhDYXufFHei4nw+9uDBkLwucxBT9tNiZSmze2X4EYpWTl3KcAoArWuxlKqgHnBSiysF5zN1yLEvUuyABH63gRR78Pcmp2TJahLRBAT6GCHihHMciYxDA7pXp27F3k3vmQ+kMLsS6s3QIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAI9OcMDZQcV5I7muNDd/etW6K4+SSbKTEP+YmcQqW2dJsgrv2JjLk5W1FSIzyTALWkqFQiNfaK8WiVPBXYi4Wyf6r6VtHMpuJwgyHYITtMYaYu1Uoag/Qf1ajhU69p2rkvRm18NPa9+4TEU03btsxOPNovuxRVTLDb6d2MNOp3EFxzV7N0QJmj5Tyz2x78xVt3WbXDne2/DdF1lOPiOE78A3V0NlJwTN2CTFcrX9GhSrLA8Tum2ecxK1HTmJUqmXvTNBg0AcPEE6mDovcDP22QuUusqsbhwWUEUhVrNofbGoD/77MEDuFsTNzgugDOg2K0AYHOwtxyG0Okdvma8fIjk=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"456eed013b914ce39bd2f7f8d9942381"}, [
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
  'f10ae276-3efa-4be7-82bd-b21a4b58ce57',
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
  'Tue, 16 Feb 2021 19:06:10 GMT',
  'Content-Length',
  '1337'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroRecoverCertificateName-canresumefromastoppedpoller-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroRecoverCertificateName-canresumefromastoppedpoller-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA1ryOS24WNVDMhKy+r8k6MMH8YlgQFxZc9r+WiEsxhv6chNlxZABTwFd/P//Q6oDaoESYl/s17atfEQOfFt9zZUKmQR5FFWXUUX+K3NRxfpqXrEwHmQlsCwUubqPqIR0BkCe5hPoqLMv4HlzioCJgi8fofEdBAhle989Y5Jo2vzukd7yi5pbLmngdrtKq0HToRDrgWLlbAOUBhDYXufFHei4nw+9uDBkLwucxBT9tNiZSmze2X4EYpWTl3KcAoArWuxlKqgHnBSiysF5zN1yLEvUuyABH63gRR78Pcmp2TJahLRBAT6GCHihHMciYxDA7pXp27F3k3vmQ+kMLsS6s3QIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAI9OcMDZQcV5I7muNDd/etW6K4+SSbKTEP+YmcQqW2dJsgrv2JjLk5W1FSIzyTALWkqFQiNfaK8WiVPBXYi4Wyf6r6VtHMpuJwgyHYITtMYaYu1Uoag/Qf1ajhU69p2rkvRm18NPa9+4TEU03btsxOPNovuxRVTLDb6d2MNOp3EFxzV7N0QJmj5Tyz2x78xVt3WbXDne2/DdF1lOPiOE78A3V0NlJwTN2CTFcrX9GhSrLA8Tum2ecxK1HTmJUqmXvTNBg0AcPEE6mDovcDP22QuUusqsbhwWUEUhVrNofbGoD/77MEDuFsTNzgugDOg2K0AYHOwtxyG0Okdvma8fIjk=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"456eed013b914ce39bd2f7f8d9942381"}, [
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
  '7e4ea42a-d776-410c-8d7a-17c31a25d671',
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
  'Tue, 16 Feb 2021 19:06:13 GMT',
  'Content-Length',
  '1337'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroRecoverCertificateName-canresumefromastoppedpoller-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroRecoverCertificateName-canresumefromastoppedpoller-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA1ryOS24WNVDMhKy+r8k6MMH8YlgQFxZc9r+WiEsxhv6chNlxZABTwFd/P//Q6oDaoESYl/s17atfEQOfFt9zZUKmQR5FFWXUUX+K3NRxfpqXrEwHmQlsCwUubqPqIR0BkCe5hPoqLMv4HlzioCJgi8fofEdBAhle989Y5Jo2vzukd7yi5pbLmngdrtKq0HToRDrgWLlbAOUBhDYXufFHei4nw+9uDBkLwucxBT9tNiZSmze2X4EYpWTl3KcAoArWuxlKqgHnBSiysF5zN1yLEvUuyABH63gRR78Pcmp2TJahLRBAT6GCHihHMciYxDA7pXp27F3k3vmQ+kMLsS6s3QIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAI9OcMDZQcV5I7muNDd/etW6K4+SSbKTEP+YmcQqW2dJsgrv2JjLk5W1FSIzyTALWkqFQiNfaK8WiVPBXYi4Wyf6r6VtHMpuJwgyHYITtMYaYu1Uoag/Qf1ajhU69p2rkvRm18NPa9+4TEU03btsxOPNovuxRVTLDb6d2MNOp3EFxzV7N0QJmj5Tyz2x78xVt3WbXDne2/DdF1lOPiOE78A3V0NlJwTN2CTFcrX9GhSrLA8Tum2ecxK1HTmJUqmXvTNBg0AcPEE6mDovcDP22QuUusqsbhwWUEUhVrNofbGoD/77MEDuFsTNzgugDOg2K0AYHOwtxyG0Okdvma8fIjk=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"456eed013b914ce39bd2f7f8d9942381"}, [
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
  '519b7f53-f557-49c2-8a56-f443fa5633f5',
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
  'Tue, 16 Feb 2021 19:06:15 GMT',
  'Content-Length',
  '1337'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroRecoverCertificateName-canresumefromastoppedpoller-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroRecoverCertificateName-canresumefromastoppedpoller-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA1ryOS24WNVDMhKy+r8k6MMH8YlgQFxZc9r+WiEsxhv6chNlxZABTwFd/P//Q6oDaoESYl/s17atfEQOfFt9zZUKmQR5FFWXUUX+K3NRxfpqXrEwHmQlsCwUubqPqIR0BkCe5hPoqLMv4HlzioCJgi8fofEdBAhle989Y5Jo2vzukd7yi5pbLmngdrtKq0HToRDrgWLlbAOUBhDYXufFHei4nw+9uDBkLwucxBT9tNiZSmze2X4EYpWTl3KcAoArWuxlKqgHnBSiysF5zN1yLEvUuyABH63gRR78Pcmp2TJahLRBAT6GCHihHMciYxDA7pXp27F3k3vmQ+kMLsS6s3QIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAI9OcMDZQcV5I7muNDd/etW6K4+SSbKTEP+YmcQqW2dJsgrv2JjLk5W1FSIzyTALWkqFQiNfaK8WiVPBXYi4Wyf6r6VtHMpuJwgyHYITtMYaYu1Uoag/Qf1ajhU69p2rkvRm18NPa9+4TEU03btsxOPNovuxRVTLDb6d2MNOp3EFxzV7N0QJmj5Tyz2x78xVt3WbXDne2/DdF1lOPiOE78A3V0NlJwTN2CTFcrX9GhSrLA8Tum2ecxK1HTmJUqmXvTNBg0AcPEE6mDovcDP22QuUusqsbhwWUEUhVrNofbGoD/77MEDuFsTNzgugDOg2K0AYHOwtxyG0Okdvma8fIjk=","cancellation_requested":false,"status":"completed","target":"https://keyvault_name.vault.azure.net/certificates/lroRecoverCertificateName-canresumefromastoppedpoller-","request_id":"456eed013b914ce39bd2f7f8d9942381"}, [
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
  '83ab9991-62f2-422b-b468-7a3c7a307b15',
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
  'Tue, 16 Feb 2021 19:06:17 GMT',
  'Content-Length',
  '1301'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroRecoverCertificateName-canresumefromastoppedpoller-/')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroRecoverCertificateName-canresumefromastoppedpoller-/b84d179447ec481d9895d9f13564d1df","kid":"https://keyvault_name.vault.azure.net/keys/lroRecoverCertificateName-canresumefromastoppedpoller-/b84d179447ec481d9895d9f13564d1df","sid":"https://keyvault_name.vault.azure.net/secrets/lroRecoverCertificateName-canresumefromastoppedpoller-/b84d179447ec481d9895d9f13564d1df","x5t":"ms9X0jn3pQ7jVaTFfPO3bGRoZRQ","cer":"MIIDKDCCAhCgAwIBAgIQRxIbHiyMT1+VHfZWPMVkzDANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjEwMjE2MTg1NjE2WhcNMjIwMjE2MTkwNjE2WjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQDWvI5LbhY1UMyErL6vyTowwfxiWBAXFlz2v5aISzGG/pyE2XFkAFPAV38//9DqgNqgRJiX+zXtq18RA58W33NlQqZBHkUVZdRRf4rc1HF+mpesTAeZCWwLBS5uo+ohHQGQJ7mE+iosy/geXOKgImCLx+h8R0ECGV73z1jkmja/O6R3vKLmlsuaeB2u0qrQdOhEOuBYuVsA5QGENhe58Ud6LifD724MGQvC5zEFP202JlKbN7ZfgRilZOXcpwCgCta7GUqqAecFKLKwXnM3XIsS9S7IAEfreBFHvw9yanZMlqEtEEBPoYIeKEcxyJjEMDulenbsXeTe+ZD6QwuxLqzdAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBROjPe5T7ZyQe08UUdf60T2U0hfLDAdBgNVHQ4EFgQUToz3uU+2ckHtPFFHX+tE9lNIXywwDQYJKoZIhvcNAQELBQADggEBALlBTJSohVrO2LzXsTdo26falWk/CUvBwLsOXQR/j8T84MXucFNtNYA9xfb8GEpMKwsvAOCVJgPgb6JrGQPBrGULTKKAgOOod+NTG/GFj+hkZy9/ElZge+gzLj04coDUcw7LHxlbShiSGegG7usNVZ+OmM1Y4eGa6+uTmgk+8Zd7TZpiXWOfiufM/j8bdDN4xHJxLxcwmzjhU6oPG2O77TaNSUoj/MFpR2rLdi/dX8rxY/KZ1bqdqDXpMfenTM+teDnSJ1Hai4HR0TYATHJg61nN2v25w8sUFHUsIrDq/wTk8uWUt2dXzcPTa/MO5TfzLW/P61sbyGB0/6KYJsglRVg=","attributes":{"enabled":true,"nbf":1613501776,"exp":1645038376,"created":1613502376,"updated":1613502376,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/lroRecoverCertificateName-canresumefromastoppedpoller-/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1613502367,"updated":1613502367}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/lroRecoverCertificateName-canresumefromastoppedpoller-/pending"}}, [
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
  'd5de7da3-17ab-494d-a347-07f130d1b75b',
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
  'Tue, 16 Feb 2021 19:06:18 GMT',
  'Content-Length',
  '2584'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/certificates/lroRecoverCertificateName-canresumefromastoppedpoller-')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/lroRecoverCertificateName-canresumefromastoppedpoller-","deletedDate":1613502378,"scheduledPurgeDate":1614107178,"id":"https://keyvault_name.vault.azure.net/certificates/lroRecoverCertificateName-canresumefromastoppedpoller-/b84d179447ec481d9895d9f13564d1df","kid":"https://keyvault_name.vault.azure.net/keys/lroRecoverCertificateName-canresumefromastoppedpoller-/b84d179447ec481d9895d9f13564d1df","sid":"https://keyvault_name.vault.azure.net/secrets/lroRecoverCertificateName-canresumefromastoppedpoller-/b84d179447ec481d9895d9f13564d1df","x5t":"ms9X0jn3pQ7jVaTFfPO3bGRoZRQ","cer":"MIIDKDCCAhCgAwIBAgIQRxIbHiyMT1+VHfZWPMVkzDANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjEwMjE2MTg1NjE2WhcNMjIwMjE2MTkwNjE2WjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQDWvI5LbhY1UMyErL6vyTowwfxiWBAXFlz2v5aISzGG/pyE2XFkAFPAV38//9DqgNqgRJiX+zXtq18RA58W33NlQqZBHkUVZdRRf4rc1HF+mpesTAeZCWwLBS5uo+ohHQGQJ7mE+iosy/geXOKgImCLx+h8R0ECGV73z1jkmja/O6R3vKLmlsuaeB2u0qrQdOhEOuBYuVsA5QGENhe58Ud6LifD724MGQvC5zEFP202JlKbN7ZfgRilZOXcpwCgCta7GUqqAecFKLKwXnM3XIsS9S7IAEfreBFHvw9yanZMlqEtEEBPoYIeKEcxyJjEMDulenbsXeTe+ZD6QwuxLqzdAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBROjPe5T7ZyQe08UUdf60T2U0hfLDAdBgNVHQ4EFgQUToz3uU+2ckHtPFFHX+tE9lNIXywwDQYJKoZIhvcNAQELBQADggEBALlBTJSohVrO2LzXsTdo26falWk/CUvBwLsOXQR/j8T84MXucFNtNYA9xfb8GEpMKwsvAOCVJgPgb6JrGQPBrGULTKKAgOOod+NTG/GFj+hkZy9/ElZge+gzLj04coDUcw7LHxlbShiSGegG7usNVZ+OmM1Y4eGa6+uTmgk+8Zd7TZpiXWOfiufM/j8bdDN4xHJxLxcwmzjhU6oPG2O77TaNSUoj/MFpR2rLdi/dX8rxY/KZ1bqdqDXpMfenTM+teDnSJ1Hai4HR0TYATHJg61nN2v25w8sUFHUsIrDq/wTk8uWUt2dXzcPTa/MO5TfzLW/P61sbyGB0/6KYJsglRVg=","attributes":{"enabled":true,"nbf":1613501776,"exp":1645038376,"created":1613502376,"updated":1613502376,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/lroRecoverCertificateName-canresumefromastoppedpoller-/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1613502367,"updated":1613502367}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/lroRecoverCertificateName-canresumefromastoppedpoller-/pending"}}, [
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
  '698ca901-7478-4228-8810-dd1bbe5f51ea',
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
  'Tue, 16 Feb 2021 19:06:17 GMT',
  'Content-Length',
  '2781'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroRecoverCertificateName-canresumefromastoppedpoller-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroRecoverCertificateName-canresumefromastoppedpoller-"}}, [
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
  '00886fb2-e7e9-4a16-8644-9f91f23c465f',
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
  'Tue, 16 Feb 2021 19:06:18 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroRecoverCertificateName-canresumefromastoppedpoller-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroRecoverCertificateName-canresumefromastoppedpoller-"}}, [
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
  '62c39c32-8f0e-481b-b957-36505e72a81f',
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
  'Tue, 16 Feb 2021 19:06:17 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroRecoverCertificateName-canresumefromastoppedpoller-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroRecoverCertificateName-canresumefromastoppedpoller-"}}, [
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
  '5765fb19-f6f4-4439-b47e-d74529bcca1a',
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
  'Tue, 16 Feb 2021 19:06:20 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroRecoverCertificateName-canresumefromastoppedpoller-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroRecoverCertificateName-canresumefromastoppedpoller-"}}, [
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
  '2d2ae1c7-d8e6-483a-9e06-fc6718f79ec5',
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
  'Tue, 16 Feb 2021 19:06:22 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroRecoverCertificateName-canresumefromastoppedpoller-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroRecoverCertificateName-canresumefromastoppedpoller-"}}, [
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
  'a290948d-65f8-4177-bc0d-b2ba0fa6833d',
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
  'Tue, 16 Feb 2021 19:06:24 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroRecoverCertificateName-canresumefromastoppedpoller-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroRecoverCertificateName-canresumefromastoppedpoller-"}}, [
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
  '625cb3a8-c53a-4a2e-b86a-e67b3ee4cf0d',
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
  'Tue, 16 Feb 2021 19:06:26 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroRecoverCertificateName-canresumefromastoppedpoller-')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/lroRecoverCertificateName-canresumefromastoppedpoller-","deletedDate":1613502378,"scheduledPurgeDate":1614107178,"id":"https://keyvault_name.vault.azure.net/certificates/lroRecoverCertificateName-canresumefromastoppedpoller-/b84d179447ec481d9895d9f13564d1df","kid":"https://keyvault_name.vault.azure.net/keys/lroRecoverCertificateName-canresumefromastoppedpoller-/b84d179447ec481d9895d9f13564d1df","sid":"https://keyvault_name.vault.azure.net/secrets/lroRecoverCertificateName-canresumefromastoppedpoller-/b84d179447ec481d9895d9f13564d1df","x5t":"ms9X0jn3pQ7jVaTFfPO3bGRoZRQ","cer":"MIIDKDCCAhCgAwIBAgIQRxIbHiyMT1+VHfZWPMVkzDANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjEwMjE2MTg1NjE2WhcNMjIwMjE2MTkwNjE2WjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQDWvI5LbhY1UMyErL6vyTowwfxiWBAXFlz2v5aISzGG/pyE2XFkAFPAV38//9DqgNqgRJiX+zXtq18RA58W33NlQqZBHkUVZdRRf4rc1HF+mpesTAeZCWwLBS5uo+ohHQGQJ7mE+iosy/geXOKgImCLx+h8R0ECGV73z1jkmja/O6R3vKLmlsuaeB2u0qrQdOhEOuBYuVsA5QGENhe58Ud6LifD724MGQvC5zEFP202JlKbN7ZfgRilZOXcpwCgCta7GUqqAecFKLKwXnM3XIsS9S7IAEfreBFHvw9yanZMlqEtEEBPoYIeKEcxyJjEMDulenbsXeTe+ZD6QwuxLqzdAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBROjPe5T7ZyQe08UUdf60T2U0hfLDAdBgNVHQ4EFgQUToz3uU+2ckHtPFFHX+tE9lNIXywwDQYJKoZIhvcNAQELBQADggEBALlBTJSohVrO2LzXsTdo26falWk/CUvBwLsOXQR/j8T84MXucFNtNYA9xfb8GEpMKwsvAOCVJgPgb6JrGQPBrGULTKKAgOOod+NTG/GFj+hkZy9/ElZge+gzLj04coDUcw7LHxlbShiSGegG7usNVZ+OmM1Y4eGa6+uTmgk+8Zd7TZpiXWOfiufM/j8bdDN4xHJxLxcwmzjhU6oPG2O77TaNSUoj/MFpR2rLdi/dX8rxY/KZ1bqdqDXpMfenTM+teDnSJ1Hai4HR0TYATHJg61nN2v25w8sUFHUsIrDq/wTk8uWUt2dXzcPTa/MO5TfzLW/P61sbyGB0/6KYJsglRVg=","attributes":{"enabled":true,"nbf":1613501776,"exp":1645038376,"created":1613502376,"updated":1613502376,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/lroRecoverCertificateName-canresumefromastoppedpoller-/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1613502367,"updated":1613502367}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/lroRecoverCertificateName-canresumefromastoppedpoller-/pending"}}, [
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
  '8366c867-2dea-47ba-bb16-1c4d4fcf1b15',
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
  'Tue, 16 Feb 2021 19:06:28 GMT',
  'Content-Length',
  '2781'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroRecoverCertificateName-canresumefromastoppedpoller-/')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"A certificate with (name/id) lroRecoverCertificateName-canresumefromastoppedpoller- was not found in this key vault. If you recently deleted this certificate you may be able to recover it using the correct recovery command. For help resolving this issue, please see https://go.microsoft.com/fwlink/?linkid=2125182"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '382',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  'e7652897-4bf7-4f01-9807-6e8a0cdb0937',
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
  'Tue, 16 Feb 2021 19:06:28 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/deletedcertificates/lroRecoverCertificateName-canresumefromastoppedpoller-/recover')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroRecoverCertificateName-canresumefromastoppedpoller-/b84d179447ec481d9895d9f13564d1df","kid":"https://keyvault_name.vault.azure.net/keys/lroRecoverCertificateName-canresumefromastoppedpoller-/b84d179447ec481d9895d9f13564d1df","sid":"https://keyvault_name.vault.azure.net/secrets/lroRecoverCertificateName-canresumefromastoppedpoller-/b84d179447ec481d9895d9f13564d1df","x5t":"ms9X0jn3pQ7jVaTFfPO3bGRoZRQ","cer":"MIIDKDCCAhCgAwIBAgIQRxIbHiyMT1+VHfZWPMVkzDANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjEwMjE2MTg1NjE2WhcNMjIwMjE2MTkwNjE2WjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQDWvI5LbhY1UMyErL6vyTowwfxiWBAXFlz2v5aISzGG/pyE2XFkAFPAV38//9DqgNqgRJiX+zXtq18RA58W33NlQqZBHkUVZdRRf4rc1HF+mpesTAeZCWwLBS5uo+ohHQGQJ7mE+iosy/geXOKgImCLx+h8R0ECGV73z1jkmja/O6R3vKLmlsuaeB2u0qrQdOhEOuBYuVsA5QGENhe58Ud6LifD724MGQvC5zEFP202JlKbN7ZfgRilZOXcpwCgCta7GUqqAecFKLKwXnM3XIsS9S7IAEfreBFHvw9yanZMlqEtEEBPoYIeKEcxyJjEMDulenbsXeTe+ZD6QwuxLqzdAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBROjPe5T7ZyQe08UUdf60T2U0hfLDAdBgNVHQ4EFgQUToz3uU+2ckHtPFFHX+tE9lNIXywwDQYJKoZIhvcNAQELBQADggEBALlBTJSohVrO2LzXsTdo26falWk/CUvBwLsOXQR/j8T84MXucFNtNYA9xfb8GEpMKwsvAOCVJgPgb6JrGQPBrGULTKKAgOOod+NTG/GFj+hkZy9/ElZge+gzLj04coDUcw7LHxlbShiSGegG7usNVZ+OmM1Y4eGa6+uTmgk+8Zd7TZpiXWOfiufM/j8bdDN4xHJxLxcwmzjhU6oPG2O77TaNSUoj/MFpR2rLdi/dX8rxY/KZ1bqdqDXpMfenTM+teDnSJ1Hai4HR0TYATHJg61nN2v25w8sUFHUsIrDq/wTk8uWUt2dXzcPTa/MO5TfzLW/P61sbyGB0/6KYJsglRVg=","attributes":{"enabled":true,"nbf":1613501776,"exp":1645038376,"created":1613502376,"updated":1613502376,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/lroRecoverCertificateName-canresumefromastoppedpoller-/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1613502367,"updated":1613502367}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/lroRecoverCertificateName-canresumefromastoppedpoller-/pending"}}, [
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
  'de2af87f-ef2f-49f5-80f6-614b93232bfc',
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
  'Tue, 16 Feb 2021 19:06:28 GMT',
  'Content-Length',
  '2584'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroRecoverCertificateName-canresumefromastoppedpoller-/')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"A certificate with (name/id) lroRecoverCertificateName-canresumefromastoppedpoller- was not found in this key vault. If you recently deleted this certificate you may be able to recover it using the correct recovery command. For help resolving this issue, please see https://go.microsoft.com/fwlink/?linkid=2125182"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '382',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  '42c9b7e6-9602-4136-b2d5-7cc5da6ff504',
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
  'Tue, 16 Feb 2021 19:06:28 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroRecoverCertificateName-canresumefromastoppedpoller-/')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"A certificate with (name/id) lroRecoverCertificateName-canresumefromastoppedpoller- was not found in this key vault. If you recently deleted this certificate you may be able to recover it using the correct recovery command. For help resolving this issue, please see https://go.microsoft.com/fwlink/?linkid=2125182"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '382',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  '4f3c2ab3-c418-439b-9b88-8162afcd0f8b',
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
  'Tue, 16 Feb 2021 19:06:28 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroRecoverCertificateName-canresumefromastoppedpoller-/')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"A certificate with (name/id) lroRecoverCertificateName-canresumefromastoppedpoller- was not found in this key vault. If you recently deleted this certificate you may be able to recover it using the correct recovery command. For help resolving this issue, please see https://go.microsoft.com/fwlink/?linkid=2125182"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '382',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  '0e32c1e2-316a-460d-be19-e7beef1ab84a',
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
  'Tue, 16 Feb 2021 19:06:28 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroRecoverCertificateName-canresumefromastoppedpoller-/')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"A certificate with (name/id) lroRecoverCertificateName-canresumefromastoppedpoller- was not found in this key vault. If you recently deleted this certificate you may be able to recover it using the correct recovery command. For help resolving this issue, please see https://go.microsoft.com/fwlink/?linkid=2125182"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '382',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  '6cc42e17-ac26-401c-8a69-a64398e80bf9',
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
  'Tue, 16 Feb 2021 19:06:28 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroRecoverCertificateName-canresumefromastoppedpoller-/')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"A certificate with (name/id) lroRecoverCertificateName-canresumefromastoppedpoller- was not found in this key vault. If you recently deleted this certificate you may be able to recover it using the correct recovery command. For help resolving this issue, please see https://go.microsoft.com/fwlink/?linkid=2125182"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '382',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  '1605dea5-d4f7-4ee8-b81b-7c679be74757',
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
  'Tue, 16 Feb 2021 19:06:30 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroRecoverCertificateName-canresumefromastoppedpoller-/')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"A certificate with (name/id) lroRecoverCertificateName-canresumefromastoppedpoller- was not found in this key vault. If you recently deleted this certificate you may be able to recover it using the correct recovery command. For help resolving this issue, please see https://go.microsoft.com/fwlink/?linkid=2125182"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '382',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  '963625f7-ab9f-4163-87eb-c94aea4a6b4e',
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
  'Tue, 16 Feb 2021 19:06:33 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroRecoverCertificateName-canresumefromastoppedpoller-/')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"A certificate with (name/id) lroRecoverCertificateName-canresumefromastoppedpoller- was not found in this key vault. If you recently deleted this certificate you may be able to recover it using the correct recovery command. For help resolving this issue, please see https://go.microsoft.com/fwlink/?linkid=2125182"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '382',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  '6a8b4ba0-f3aa-4d36-9bf4-13ad82f23623',
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
  'Tue, 16 Feb 2021 19:06:35 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroRecoverCertificateName-canresumefromastoppedpoller-/')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroRecoverCertificateName-canresumefromastoppedpoller-/b84d179447ec481d9895d9f13564d1df","kid":"https://keyvault_name.vault.azure.net/keys/lroRecoverCertificateName-canresumefromastoppedpoller-/b84d179447ec481d9895d9f13564d1df","sid":"https://keyvault_name.vault.azure.net/secrets/lroRecoverCertificateName-canresumefromastoppedpoller-/b84d179447ec481d9895d9f13564d1df","x5t":"ms9X0jn3pQ7jVaTFfPO3bGRoZRQ","cer":"MIIDKDCCAhCgAwIBAgIQRxIbHiyMT1+VHfZWPMVkzDANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjEwMjE2MTg1NjE2WhcNMjIwMjE2MTkwNjE2WjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQDWvI5LbhY1UMyErL6vyTowwfxiWBAXFlz2v5aISzGG/pyE2XFkAFPAV38//9DqgNqgRJiX+zXtq18RA58W33NlQqZBHkUVZdRRf4rc1HF+mpesTAeZCWwLBS5uo+ohHQGQJ7mE+iosy/geXOKgImCLx+h8R0ECGV73z1jkmja/O6R3vKLmlsuaeB2u0qrQdOhEOuBYuVsA5QGENhe58Ud6LifD724MGQvC5zEFP202JlKbN7ZfgRilZOXcpwCgCta7GUqqAecFKLKwXnM3XIsS9S7IAEfreBFHvw9yanZMlqEtEEBPoYIeKEcxyJjEMDulenbsXeTe+ZD6QwuxLqzdAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBROjPe5T7ZyQe08UUdf60T2U0hfLDAdBgNVHQ4EFgQUToz3uU+2ckHtPFFHX+tE9lNIXywwDQYJKoZIhvcNAQELBQADggEBALlBTJSohVrO2LzXsTdo26falWk/CUvBwLsOXQR/j8T84MXucFNtNYA9xfb8GEpMKwsvAOCVJgPgb6JrGQPBrGULTKKAgOOod+NTG/GFj+hkZy9/ElZge+gzLj04coDUcw7LHxlbShiSGegG7usNVZ+OmM1Y4eGa6+uTmgk+8Zd7TZpiXWOfiufM/j8bdDN4xHJxLxcwmzjhU6oPG2O77TaNSUoj/MFpR2rLdi/dX8rxY/KZ1bqdqDXpMfenTM+teDnSJ1Hai4HR0TYATHJg61nN2v25w8sUFHUsIrDq/wTk8uWUt2dXzcPTa/MO5TfzLW/P61sbyGB0/6KYJsglRVg=","attributes":{"enabled":true,"nbf":1613501776,"exp":1645038376,"created":1613502376,"updated":1613502376,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/lroRecoverCertificateName-canresumefromastoppedpoller-/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1613502367,"updated":1613502367}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/lroRecoverCertificateName-canresumefromastoppedpoller-/pending"}}, [
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
  '35397e98-1f30-419c-8645-38f7995119aa',
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
  'Tue, 16 Feb 2021 19:06:37 GMT',
  'Content-Length',
  '2584'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/certificates/lroRecoverCertificateName-canresumefromastoppedpoller-')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/lroRecoverCertificateName-canresumefromastoppedpoller-","deletedDate":1613502397,"scheduledPurgeDate":1614107197,"id":"https://keyvault_name.vault.azure.net/certificates/lroRecoverCertificateName-canresumefromastoppedpoller-/b84d179447ec481d9895d9f13564d1df","kid":"https://keyvault_name.vault.azure.net/keys/lroRecoverCertificateName-canresumefromastoppedpoller-/b84d179447ec481d9895d9f13564d1df","sid":"https://keyvault_name.vault.azure.net/secrets/lroRecoverCertificateName-canresumefromastoppedpoller-/b84d179447ec481d9895d9f13564d1df","x5t":"ms9X0jn3pQ7jVaTFfPO3bGRoZRQ","cer":"MIIDKDCCAhCgAwIBAgIQRxIbHiyMT1+VHfZWPMVkzDANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjEwMjE2MTg1NjE2WhcNMjIwMjE2MTkwNjE2WjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQDWvI5LbhY1UMyErL6vyTowwfxiWBAXFlz2v5aISzGG/pyE2XFkAFPAV38//9DqgNqgRJiX+zXtq18RA58W33NlQqZBHkUVZdRRf4rc1HF+mpesTAeZCWwLBS5uo+ohHQGQJ7mE+iosy/geXOKgImCLx+h8R0ECGV73z1jkmja/O6R3vKLmlsuaeB2u0qrQdOhEOuBYuVsA5QGENhe58Ud6LifD724MGQvC5zEFP202JlKbN7ZfgRilZOXcpwCgCta7GUqqAecFKLKwXnM3XIsS9S7IAEfreBFHvw9yanZMlqEtEEBPoYIeKEcxyJjEMDulenbsXeTe+ZD6QwuxLqzdAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBROjPe5T7ZyQe08UUdf60T2U0hfLDAdBgNVHQ4EFgQUToz3uU+2ckHtPFFHX+tE9lNIXywwDQYJKoZIhvcNAQELBQADggEBALlBTJSohVrO2LzXsTdo26falWk/CUvBwLsOXQR/j8T84MXucFNtNYA9xfb8GEpMKwsvAOCVJgPgb6JrGQPBrGULTKKAgOOod+NTG/GFj+hkZy9/ElZge+gzLj04coDUcw7LHxlbShiSGegG7usNVZ+OmM1Y4eGa6+uTmgk+8Zd7TZpiXWOfiufM/j8bdDN4xHJxLxcwmzjhU6oPG2O77TaNSUoj/MFpR2rLdi/dX8rxY/KZ1bqdqDXpMfenTM+teDnSJ1Hai4HR0TYATHJg61nN2v25w8sUFHUsIrDq/wTk8uWUt2dXzcPTa/MO5TfzLW/P61sbyGB0/6KYJsglRVg=","attributes":{"enabled":true,"nbf":1613501776,"exp":1645038376,"created":1613502376,"updated":1613502376,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/lroRecoverCertificateName-canresumefromastoppedpoller-/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1613502367,"updated":1613502367}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/lroRecoverCertificateName-canresumefromastoppedpoller-/pending"}}, [
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
  '08b3b96d-f9d3-4258-82f5-39bd31c9cd00',
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
  'Tue, 16 Feb 2021 19:06:37 GMT',
  'Content-Length',
  '2781'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroRecoverCertificateName-canresumefromastoppedpoller-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroRecoverCertificateName-canresumefromastoppedpoller-"}}, [
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
  'f41c1223-5d00-414b-bfab-a3764aa88e96',
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
  'Tue, 16 Feb 2021 19:06:37 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroRecoverCertificateName-canresumefromastoppedpoller-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroRecoverCertificateName-canresumefromastoppedpoller-"}}, [
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
  '7e8638fe-39af-41cd-82f3-0d4b3abb0d77',
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
  'Tue, 16 Feb 2021 19:06:37 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroRecoverCertificateName-canresumefromastoppedpoller-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroRecoverCertificateName-canresumefromastoppedpoller-"}}, [
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
  'a10da98e-e851-4baf-a497-4c8b286b79e9',
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
  'Tue, 16 Feb 2021 19:06:39 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroRecoverCertificateName-canresumefromastoppedpoller-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroRecoverCertificateName-canresumefromastoppedpoller-"}}, [
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
  '31d8f3f9-7dc9-43cc-ac71-6a558f0291cc',
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
  'Tue, 16 Feb 2021 19:06:40 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroRecoverCertificateName-canresumefromastoppedpoller-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroRecoverCertificateName-canresumefromastoppedpoller-"}}, [
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
  '2e273be2-882e-4d7f-9a2a-420584072879',
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
  'Tue, 16 Feb 2021 19:06:43 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroRecoverCertificateName-canresumefromastoppedpoller-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroRecoverCertificateName-canresumefromastoppedpoller-"}}, [
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
  '6bf6a5e3-ed10-4d54-bb2e-a7d8ee00466d',
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
  'Tue, 16 Feb 2021 19:06:45 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroRecoverCertificateName-canresumefromastoppedpoller-')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/lroRecoverCertificateName-canresumefromastoppedpoller-","deletedDate":1613502397,"scheduledPurgeDate":1614107197,"id":"https://keyvault_name.vault.azure.net/certificates/lroRecoverCertificateName-canresumefromastoppedpoller-/b84d179447ec481d9895d9f13564d1df","kid":"https://keyvault_name.vault.azure.net/keys/lroRecoverCertificateName-canresumefromastoppedpoller-/b84d179447ec481d9895d9f13564d1df","sid":"https://keyvault_name.vault.azure.net/secrets/lroRecoverCertificateName-canresumefromastoppedpoller-/b84d179447ec481d9895d9f13564d1df","x5t":"ms9X0jn3pQ7jVaTFfPO3bGRoZRQ","cer":"MIIDKDCCAhCgAwIBAgIQRxIbHiyMT1+VHfZWPMVkzDANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjEwMjE2MTg1NjE2WhcNMjIwMjE2MTkwNjE2WjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQDWvI5LbhY1UMyErL6vyTowwfxiWBAXFlz2v5aISzGG/pyE2XFkAFPAV38//9DqgNqgRJiX+zXtq18RA58W33NlQqZBHkUVZdRRf4rc1HF+mpesTAeZCWwLBS5uo+ohHQGQJ7mE+iosy/geXOKgImCLx+h8R0ECGV73z1jkmja/O6R3vKLmlsuaeB2u0qrQdOhEOuBYuVsA5QGENhe58Ud6LifD724MGQvC5zEFP202JlKbN7ZfgRilZOXcpwCgCta7GUqqAecFKLKwXnM3XIsS9S7IAEfreBFHvw9yanZMlqEtEEBPoYIeKEcxyJjEMDulenbsXeTe+ZD6QwuxLqzdAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBROjPe5T7ZyQe08UUdf60T2U0hfLDAdBgNVHQ4EFgQUToz3uU+2ckHtPFFHX+tE9lNIXywwDQYJKoZIhvcNAQELBQADggEBALlBTJSohVrO2LzXsTdo26falWk/CUvBwLsOXQR/j8T84MXucFNtNYA9xfb8GEpMKwsvAOCVJgPgb6JrGQPBrGULTKKAgOOod+NTG/GFj+hkZy9/ElZge+gzLj04coDUcw7LHxlbShiSGegG7usNVZ+OmM1Y4eGa6+uTmgk+8Zd7TZpiXWOfiufM/j8bdDN4xHJxLxcwmzjhU6oPG2O77TaNSUoj/MFpR2rLdi/dX8rxY/KZ1bqdqDXpMfenTM+teDnSJ1Hai4HR0TYATHJg61nN2v25w8sUFHUsIrDq/wTk8uWUt2dXzcPTa/MO5TfzLW/P61sbyGB0/6KYJsglRVg=","attributes":{"enabled":true,"nbf":1613501776,"exp":1645038376,"created":1613502376,"updated":1613502376,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/lroRecoverCertificateName-canresumefromastoppedpoller-/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1613502367,"updated":1613502367}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/lroRecoverCertificateName-canresumefromastoppedpoller-/pending"}}, [
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
  '90e654b2-27ad-43cb-8b28-c0ccc5dac19a',
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
  'Tue, 16 Feb 2021 19:06:47 GMT',
  'Content-Length',
  '2781'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedcertificates/lroRecoverCertificateName-canresumefromastoppedpoller-')
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
  '46fcea6e-f7ca-4b34-ab69-3a7f183816f0',
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

let nock = require('nock');

module.exports.hash = "f593cc9980d2d8c1c72b7cadc70ecee7";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/certificates/listCertificateName-canlistdeletedcertificates-0/create')
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
  '26ade613-dbd5-4d0c-a6ce-f49dff89e7e6',
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
  'Tue, 16 Feb 2021 19:00:45 GMT'
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
  'd4a899f4-ff9e-44c4-8b0c-232c2096ef00',
  'x-ms-ests-server',
  '2.1.11496.5 - EUS ProdSlices',
  'Set-Cookie',
  'fpc=AufoSEQpIbxLjzJaYLa_pBMA4qsDEwAAACEMvtcOAAAA; expires=Thu, 18-Mar-2021 19:00:46 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 16 Feb 2021 19:00:45 GMT',
  'Content-Length',
  '1315'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/certificates/listCertificateName-canlistdeletedcertificates-0/create', {"policy":{"key_props":{},"secret_props":{},"x509_props":{"subject":"cn=MyCert","sans":{}},"issuer":{"name":"Self"},"attributes":{}},"attributes":{}})
  .query(true)
  .reply(202, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificates-0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA5I/0GGu2y7+l+vBOzgje6zdlFbuJmVlJAjEg5aG/TNWDyF7EtDB/3cr2exA9WPU6etnP8Q+UfvYenwcvQ6XAsrYYsH7pI5dxVcg87zA9IdH6vimh42ISlj6yP/iN2+DaV189diPWzi+LvyG8+WTA7hbROadAsg6NvB8kQM4/Yt+zQbrm7zjrbbTXSLc5K6wxl0QBkP+QdSs9Xrq83qQwDnrbaxV/Z1HiVqF8+k0yOUDeWLDBRXlVO3jYLzMb4yhR53rU3boGFOjrmr6UnvsnT64TezLoMgxDmkM3fyP0UFx/SP/XpSNWJowlqp6Ph+YmJL3FQgDacoTSlUTeXaqBmQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAAJ3/g1BJjpVCF/YunZOuwuQsMsyBUAUHzL+lTCvtHIK+/GsKJuBu/2c8MkECFdklUEU0fARLfOhFP45J9vE8l2fGBmHH55F0yn7rM3Y7fJ8yc9bq+pcPKXpu20bTpYbhCiG5uvMKqV0Ebc0LVbYyZfnY0fxKXpPx82bo2jp7pSu7ELMyCcFb/GZ9wcTRohNDuTpVcDXgjFrBOpsQL9GJKlWl9owc2ivWl9n1LVbPxDynSIrZYkRPaY6FmVJurkgzGhZQ6Z/ky5VAZlFf61JxyuZht3UsQwJqi8h6Sn8XKyrgxfXYamE/18iDtp6bfa0gu6GziKX8lawCwazHpQrrz8=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"8001c605d1224a58b4f9d977bf5a3fb9"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificates-0/pending?api-version=7.2&request_id=8001c605d1224a58b4f9d977bf5a3fb9',
  'Retry-After',
  '10',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  '3f661ebf-a18e-469d-927f-4c4422ad9b51',
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
  'Tue, 16 Feb 2021 19:00:46 GMT',
  'Content-Length',
  '1331'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistdeletedcertificates-0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificates-0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA5I/0GGu2y7+l+vBOzgje6zdlFbuJmVlJAjEg5aG/TNWDyF7EtDB/3cr2exA9WPU6etnP8Q+UfvYenwcvQ6XAsrYYsH7pI5dxVcg87zA9IdH6vimh42ISlj6yP/iN2+DaV189diPWzi+LvyG8+WTA7hbROadAsg6NvB8kQM4/Yt+zQbrm7zjrbbTXSLc5K6wxl0QBkP+QdSs9Xrq83qQwDnrbaxV/Z1HiVqF8+k0yOUDeWLDBRXlVO3jYLzMb4yhR53rU3boGFOjrmr6UnvsnT64TezLoMgxDmkM3fyP0UFx/SP/XpSNWJowlqp6Ph+YmJL3FQgDacoTSlUTeXaqBmQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAAJ3/g1BJjpVCF/YunZOuwuQsMsyBUAUHzL+lTCvtHIK+/GsKJuBu/2c8MkECFdklUEU0fARLfOhFP45J9vE8l2fGBmHH55F0yn7rM3Y7fJ8yc9bq+pcPKXpu20bTpYbhCiG5uvMKqV0Ebc0LVbYyZfnY0fxKXpPx82bo2jp7pSu7ELMyCcFb/GZ9wcTRohNDuTpVcDXgjFrBOpsQL9GJKlWl9owc2ivWl9n1LVbPxDynSIrZYkRPaY6FmVJurkgzGhZQ6Z/ky5VAZlFf61JxyuZht3UsQwJqi8h6Sn8XKyrgxfXYamE/18iDtp6bfa0gu6GziKX8lawCwazHpQrrz8=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"8001c605d1224a58b4f9d977bf5a3fb9"}, [
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
  '4b757176-525f-4c6b-b0c3-a5844c7c85dc',
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
  'Tue, 16 Feb 2021 19:00:46 GMT',
  'Content-Length',
  '1331'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistdeletedcertificates-0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificates-0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA5I/0GGu2y7+l+vBOzgje6zdlFbuJmVlJAjEg5aG/TNWDyF7EtDB/3cr2exA9WPU6etnP8Q+UfvYenwcvQ6XAsrYYsH7pI5dxVcg87zA9IdH6vimh42ISlj6yP/iN2+DaV189diPWzi+LvyG8+WTA7hbROadAsg6NvB8kQM4/Yt+zQbrm7zjrbbTXSLc5K6wxl0QBkP+QdSs9Xrq83qQwDnrbaxV/Z1HiVqF8+k0yOUDeWLDBRXlVO3jYLzMb4yhR53rU3boGFOjrmr6UnvsnT64TezLoMgxDmkM3fyP0UFx/SP/XpSNWJowlqp6Ph+YmJL3FQgDacoTSlUTeXaqBmQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAAJ3/g1BJjpVCF/YunZOuwuQsMsyBUAUHzL+lTCvtHIK+/GsKJuBu/2c8MkECFdklUEU0fARLfOhFP45J9vE8l2fGBmHH55F0yn7rM3Y7fJ8yc9bq+pcPKXpu20bTpYbhCiG5uvMKqV0Ebc0LVbYyZfnY0fxKXpPx82bo2jp7pSu7ELMyCcFb/GZ9wcTRohNDuTpVcDXgjFrBOpsQL9GJKlWl9owc2ivWl9n1LVbPxDynSIrZYkRPaY6FmVJurkgzGhZQ6Z/ky5VAZlFf61JxyuZht3UsQwJqi8h6Sn8XKyrgxfXYamE/18iDtp6bfa0gu6GziKX8lawCwazHpQrrz8=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"8001c605d1224a58b4f9d977bf5a3fb9"}, [
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
  '68a97765-04cc-4452-8c44-c0ea1a95e1d8',
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
  'Tue, 16 Feb 2021 19:00:46 GMT',
  'Content-Length',
  '1331'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistdeletedcertificates-0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificates-0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA5I/0GGu2y7+l+vBOzgje6zdlFbuJmVlJAjEg5aG/TNWDyF7EtDB/3cr2exA9WPU6etnP8Q+UfvYenwcvQ6XAsrYYsH7pI5dxVcg87zA9IdH6vimh42ISlj6yP/iN2+DaV189diPWzi+LvyG8+WTA7hbROadAsg6NvB8kQM4/Yt+zQbrm7zjrbbTXSLc5K6wxl0QBkP+QdSs9Xrq83qQwDnrbaxV/Z1HiVqF8+k0yOUDeWLDBRXlVO3jYLzMb4yhR53rU3boGFOjrmr6UnvsnT64TezLoMgxDmkM3fyP0UFx/SP/XpSNWJowlqp6Ph+YmJL3FQgDacoTSlUTeXaqBmQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAAJ3/g1BJjpVCF/YunZOuwuQsMsyBUAUHzL+lTCvtHIK+/GsKJuBu/2c8MkECFdklUEU0fARLfOhFP45J9vE8l2fGBmHH55F0yn7rM3Y7fJ8yc9bq+pcPKXpu20bTpYbhCiG5uvMKqV0Ebc0LVbYyZfnY0fxKXpPx82bo2jp7pSu7ELMyCcFb/GZ9wcTRohNDuTpVcDXgjFrBOpsQL9GJKlWl9owc2ivWl9n1LVbPxDynSIrZYkRPaY6FmVJurkgzGhZQ6Z/ky5VAZlFf61JxyuZht3UsQwJqi8h6Sn8XKyrgxfXYamE/18iDtp6bfa0gu6GziKX8lawCwazHpQrrz8=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"8001c605d1224a58b4f9d977bf5a3fb9"}, [
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
  '493d4a3e-896e-49e2-90f0-1545bce620eb',
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
  'Tue, 16 Feb 2021 19:00:48 GMT',
  'Content-Length',
  '1331'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistdeletedcertificates-0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificates-0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA5I/0GGu2y7+l+vBOzgje6zdlFbuJmVlJAjEg5aG/TNWDyF7EtDB/3cr2exA9WPU6etnP8Q+UfvYenwcvQ6XAsrYYsH7pI5dxVcg87zA9IdH6vimh42ISlj6yP/iN2+DaV189diPWzi+LvyG8+WTA7hbROadAsg6NvB8kQM4/Yt+zQbrm7zjrbbTXSLc5K6wxl0QBkP+QdSs9Xrq83qQwDnrbaxV/Z1HiVqF8+k0yOUDeWLDBRXlVO3jYLzMb4yhR53rU3boGFOjrmr6UnvsnT64TezLoMgxDmkM3fyP0UFx/SP/XpSNWJowlqp6Ph+YmJL3FQgDacoTSlUTeXaqBmQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAAJ3/g1BJjpVCF/YunZOuwuQsMsyBUAUHzL+lTCvtHIK+/GsKJuBu/2c8MkECFdklUEU0fARLfOhFP45J9vE8l2fGBmHH55F0yn7rM3Y7fJ8yc9bq+pcPKXpu20bTpYbhCiG5uvMKqV0Ebc0LVbYyZfnY0fxKXpPx82bo2jp7pSu7ELMyCcFb/GZ9wcTRohNDuTpVcDXgjFrBOpsQL9GJKlWl9owc2ivWl9n1LVbPxDynSIrZYkRPaY6FmVJurkgzGhZQ6Z/ky5VAZlFf61JxyuZht3UsQwJqi8h6Sn8XKyrgxfXYamE/18iDtp6bfa0gu6GziKX8lawCwazHpQrrz8=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"8001c605d1224a58b4f9d977bf5a3fb9"}, [
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
  '5236f558-ea05-41ee-a2eb-6a527ede7e39',
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
  'Tue, 16 Feb 2021 19:00:50 GMT',
  'Content-Length',
  '1331'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistdeletedcertificates-0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificates-0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA5I/0GGu2y7+l+vBOzgje6zdlFbuJmVlJAjEg5aG/TNWDyF7EtDB/3cr2exA9WPU6etnP8Q+UfvYenwcvQ6XAsrYYsH7pI5dxVcg87zA9IdH6vimh42ISlj6yP/iN2+DaV189diPWzi+LvyG8+WTA7hbROadAsg6NvB8kQM4/Yt+zQbrm7zjrbbTXSLc5K6wxl0QBkP+QdSs9Xrq83qQwDnrbaxV/Z1HiVqF8+k0yOUDeWLDBRXlVO3jYLzMb4yhR53rU3boGFOjrmr6UnvsnT64TezLoMgxDmkM3fyP0UFx/SP/XpSNWJowlqp6Ph+YmJL3FQgDacoTSlUTeXaqBmQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAAJ3/g1BJjpVCF/YunZOuwuQsMsyBUAUHzL+lTCvtHIK+/GsKJuBu/2c8MkECFdklUEU0fARLfOhFP45J9vE8l2fGBmHH55F0yn7rM3Y7fJ8yc9bq+pcPKXpu20bTpYbhCiG5uvMKqV0Ebc0LVbYyZfnY0fxKXpPx82bo2jp7pSu7ELMyCcFb/GZ9wcTRohNDuTpVcDXgjFrBOpsQL9GJKlWl9owc2ivWl9n1LVbPxDynSIrZYkRPaY6FmVJurkgzGhZQ6Z/ky5VAZlFf61JxyuZht3UsQwJqi8h6Sn8XKyrgxfXYamE/18iDtp6bfa0gu6GziKX8lawCwazHpQrrz8=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"8001c605d1224a58b4f9d977bf5a3fb9"}, [
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
  '239b2599-d9dd-4208-9a41-e7698bdf8203',
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
  'Tue, 16 Feb 2021 19:00:53 GMT',
  'Content-Length',
  '1331'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistdeletedcertificates-0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificates-0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA5I/0GGu2y7+l+vBOzgje6zdlFbuJmVlJAjEg5aG/TNWDyF7EtDB/3cr2exA9WPU6etnP8Q+UfvYenwcvQ6XAsrYYsH7pI5dxVcg87zA9IdH6vimh42ISlj6yP/iN2+DaV189diPWzi+LvyG8+WTA7hbROadAsg6NvB8kQM4/Yt+zQbrm7zjrbbTXSLc5K6wxl0QBkP+QdSs9Xrq83qQwDnrbaxV/Z1HiVqF8+k0yOUDeWLDBRXlVO3jYLzMb4yhR53rU3boGFOjrmr6UnvsnT64TezLoMgxDmkM3fyP0UFx/SP/XpSNWJowlqp6Ph+YmJL3FQgDacoTSlUTeXaqBmQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAAJ3/g1BJjpVCF/YunZOuwuQsMsyBUAUHzL+lTCvtHIK+/GsKJuBu/2c8MkECFdklUEU0fARLfOhFP45J9vE8l2fGBmHH55F0yn7rM3Y7fJ8yc9bq+pcPKXpu20bTpYbhCiG5uvMKqV0Ebc0LVbYyZfnY0fxKXpPx82bo2jp7pSu7ELMyCcFb/GZ9wcTRohNDuTpVcDXgjFrBOpsQL9GJKlWl9owc2ivWl9n1LVbPxDynSIrZYkRPaY6FmVJurkgzGhZQ6Z/ky5VAZlFf61JxyuZht3UsQwJqi8h6Sn8XKyrgxfXYamE/18iDtp6bfa0gu6GziKX8lawCwazHpQrrz8=","cancellation_requested":false,"status":"completed","target":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificates-0","request_id":"8001c605d1224a58b4f9d977bf5a3fb9"}, [
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
  'f649c8d6-80ee-4079-a2bf-b060d00afc0f',
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
  'Tue, 16 Feb 2021 19:00:54 GMT',
  'Content-Length',
  '1289'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistdeletedcertificates-0/')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificates-0/bd0dcef319b84bc08f9f17aa1707a5d4","kid":"https://keyvault_name.vault.azure.net/keys/listCertificateName-canlistdeletedcertificates-0/bd0dcef319b84bc08f9f17aa1707a5d4","sid":"https://keyvault_name.vault.azure.net/secrets/listCertificateName-canlistdeletedcertificates-0/bd0dcef319b84bc08f9f17aa1707a5d4","x5t":"zBalkSChKqyGjsd5JuOIkvPTTuU","cer":"MIIDKDCCAhCgAwIBAgIQfyBNDj2KQHSO99KPn2cvJjANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjEwMjE2MTg1MDU1WhcNMjIwMjE2MTkwMDU1WjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQDkj/QYa7bLv6X68E7OCN7rN2UVu4mZWUkCMSDlob9M1YPIXsS0MH/dyvZ7ED1Y9Tp62c/xD5R+9h6fBy9DpcCythiwfukjl3FVyDzvMD0h0fq+KaHjYhKWPrI/+I3b4NpXXz12I9bOL4u/Ibz5ZMDuFtE5p0CyDo28HyRAzj9i37NBuubvOOtttNdItzkrrDGXRAGQ/5B1Kz1eurzepDAOettrFX9nUeJWoXz6TTI5QN5YsMFFeVU7eNgvMxvjKFHnetTdugYU6OuavpSe+ydPrhN7MugyDEOaQzd/I/RQXH9I/9elI1YmjCWqno+H5iYkvcVCANpyhNKVRN5dqoGZAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBSKVdJTHwHFlZilyRlCyNgcd6kPvzAdBgNVHQ4EFgQUilXSUx8BxZWYpckZQsjYHHepD78wDQYJKoZIhvcNAQELBQADggEBAON9U19JNH5VpybAFvJXBtUKgueOxfkZa3nuZr7mRV0AoVaDzBWVGB8rXAFNJ++1XCOIzKXAFhBUGgVh6hhsEdqykvI6tFZ+nt4DqGroYqxwOeYYpuBRmNZLTF9OlX1kP1RV1X46HedBagPguumcw4hlmCF6RQXv39jvCHxswkI4hXU6Uz93ljSz6Cin+NIscg4aXLfCgHxfIgHWeogi35rmaGDjAoiaAv2cmDtV5phxhBao/jTVE1cAxIL3XyLippwkYE0Gt238FS+IWHcgbm/x4mlsJarOaF5k87McGO1jcm/4W+8eSFv20cpGjEt61bA7vA0PowdqbIiGSIRFhzs=","attributes":{"enabled":true,"nbf":1613501455,"exp":1645038055,"created":1613502055,"updated":1613502055,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificates-0/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1613502047,"updated":1613502047}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificates-0/pending"}}, [
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
  'a0f44ca0-c1aa-48ca-b03a-dd2a8419865b',
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
  'Tue, 16 Feb 2021 19:00:55 GMT',
  'Content-Length',
  '2554'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/certificates/listCertificateName-canlistdeletedcertificates-1/create', {"policy":{"key_props":{},"secret_props":{},"x509_props":{"subject":"cn=MyCert","sans":{}},"issuer":{"name":"Self"},"attributes":{}},"attributes":{}})
  .query(true)
  .reply(202, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificates-1/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAnRrOdIpMaOOVToHFpZU1uDWucO5Vsj7xvPhJCweQF4iBzmQj0X5iuu6+NjncdnImt9yK9ZmABRzKJKFDYWbocWFF7giMztb+PVv9zU2oVUYyxPnSHBvrq7mahwoIKC7oG7mXB9WbjNYQ6OMgffAAwtDX4UXIEjPRtyLXVt+TSu1ADF+bHM6dxlzXzw/13FxCXCHs1GEgodoWTG2h1vAMNL4VnPimZz/NwLwt4zi0O4jQQ0SsXrgMAdgf2MMhaRAmOiH+0e2YHvNBFm74d5dO9LzXO7ob+3MGAieOgPJC7bYgSJCSNlOrNZgPoXKR/QpXBAJvHF+9b2oQHgSIIH6clQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAG4I6rRRuFB1X0lA10+mzGpnKMkGKDKhdz7JOIaKmqzjS1IZVzsYvIHRPdWBYY9CHiLeWTjForiH8mD2Ip/5GSA6ulEdCnGkxa4NuOmw3XBpXBQVTj5x2KI0vELOzBJxo+PeJBBQE42Q3ZDO7VF5KrKQgs8fZ/JKZJPIfkGfChk0zHWFsPuqt20OXx/Cg/mdZad9wwdiVCk0YWHIdbXX8I+NNcNETy1gKNDSmmPq7mMueUfbIoctURG5gtUWnqeLgrfaaOe3aXGnLGjcLi5KAQvg00Y+FzuQhVKdBYWECTMakFWLKEkj/hpP4ysUTCiOspkOANKD8AtRIdE2WHZHzlI=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"c82bd21b54db408eb7ccc775bc6a4e7a"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificates-1/pending?api-version=7.2&request_id=c82bd21b54db408eb7ccc775bc6a4e7a',
  'Retry-After',
  '10',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  'a940df0d-39fe-4d6f-8440-437cb280b111',
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
  'Tue, 16 Feb 2021 19:00:55 GMT',
  'Content-Length',
  '1331'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistdeletedcertificates-1/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificates-1/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAnRrOdIpMaOOVToHFpZU1uDWucO5Vsj7xvPhJCweQF4iBzmQj0X5iuu6+NjncdnImt9yK9ZmABRzKJKFDYWbocWFF7giMztb+PVv9zU2oVUYyxPnSHBvrq7mahwoIKC7oG7mXB9WbjNYQ6OMgffAAwtDX4UXIEjPRtyLXVt+TSu1ADF+bHM6dxlzXzw/13FxCXCHs1GEgodoWTG2h1vAMNL4VnPimZz/NwLwt4zi0O4jQQ0SsXrgMAdgf2MMhaRAmOiH+0e2YHvNBFm74d5dO9LzXO7ob+3MGAieOgPJC7bYgSJCSNlOrNZgPoXKR/QpXBAJvHF+9b2oQHgSIIH6clQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAG4I6rRRuFB1X0lA10+mzGpnKMkGKDKhdz7JOIaKmqzjS1IZVzsYvIHRPdWBYY9CHiLeWTjForiH8mD2Ip/5GSA6ulEdCnGkxa4NuOmw3XBpXBQVTj5x2KI0vELOzBJxo+PeJBBQE42Q3ZDO7VF5KrKQgs8fZ/JKZJPIfkGfChk0zHWFsPuqt20OXx/Cg/mdZad9wwdiVCk0YWHIdbXX8I+NNcNETy1gKNDSmmPq7mMueUfbIoctURG5gtUWnqeLgrfaaOe3aXGnLGjcLi5KAQvg00Y+FzuQhVKdBYWECTMakFWLKEkj/hpP4ysUTCiOspkOANKD8AtRIdE2WHZHzlI=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"c82bd21b54db408eb7ccc775bc6a4e7a"}, [
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
  '630b02de-d369-41d4-afa1-14d0f832410b',
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
  'Tue, 16 Feb 2021 19:00:55 GMT',
  'Content-Length',
  '1331'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistdeletedcertificates-1/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificates-1/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAnRrOdIpMaOOVToHFpZU1uDWucO5Vsj7xvPhJCweQF4iBzmQj0X5iuu6+NjncdnImt9yK9ZmABRzKJKFDYWbocWFF7giMztb+PVv9zU2oVUYyxPnSHBvrq7mahwoIKC7oG7mXB9WbjNYQ6OMgffAAwtDX4UXIEjPRtyLXVt+TSu1ADF+bHM6dxlzXzw/13FxCXCHs1GEgodoWTG2h1vAMNL4VnPimZz/NwLwt4zi0O4jQQ0SsXrgMAdgf2MMhaRAmOiH+0e2YHvNBFm74d5dO9LzXO7ob+3MGAieOgPJC7bYgSJCSNlOrNZgPoXKR/QpXBAJvHF+9b2oQHgSIIH6clQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAG4I6rRRuFB1X0lA10+mzGpnKMkGKDKhdz7JOIaKmqzjS1IZVzsYvIHRPdWBYY9CHiLeWTjForiH8mD2Ip/5GSA6ulEdCnGkxa4NuOmw3XBpXBQVTj5x2KI0vELOzBJxo+PeJBBQE42Q3ZDO7VF5KrKQgs8fZ/JKZJPIfkGfChk0zHWFsPuqt20OXx/Cg/mdZad9wwdiVCk0YWHIdbXX8I+NNcNETy1gKNDSmmPq7mMueUfbIoctURG5gtUWnqeLgrfaaOe3aXGnLGjcLi5KAQvg00Y+FzuQhVKdBYWECTMakFWLKEkj/hpP4ysUTCiOspkOANKD8AtRIdE2WHZHzlI=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"c82bd21b54db408eb7ccc775bc6a4e7a"}, [
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
  '63eeb4ff-ce6c-470d-bc42-226089e713f0',
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
  'Tue, 16 Feb 2021 19:00:55 GMT',
  'Content-Length',
  '1331'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistdeletedcertificates-1/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificates-1/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAnRrOdIpMaOOVToHFpZU1uDWucO5Vsj7xvPhJCweQF4iBzmQj0X5iuu6+NjncdnImt9yK9ZmABRzKJKFDYWbocWFF7giMztb+PVv9zU2oVUYyxPnSHBvrq7mahwoIKC7oG7mXB9WbjNYQ6OMgffAAwtDX4UXIEjPRtyLXVt+TSu1ADF+bHM6dxlzXzw/13FxCXCHs1GEgodoWTG2h1vAMNL4VnPimZz/NwLwt4zi0O4jQQ0SsXrgMAdgf2MMhaRAmOiH+0e2YHvNBFm74d5dO9LzXO7ob+3MGAieOgPJC7bYgSJCSNlOrNZgPoXKR/QpXBAJvHF+9b2oQHgSIIH6clQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAG4I6rRRuFB1X0lA10+mzGpnKMkGKDKhdz7JOIaKmqzjS1IZVzsYvIHRPdWBYY9CHiLeWTjForiH8mD2Ip/5GSA6ulEdCnGkxa4NuOmw3XBpXBQVTj5x2KI0vELOzBJxo+PeJBBQE42Q3ZDO7VF5KrKQgs8fZ/JKZJPIfkGfChk0zHWFsPuqt20OXx/Cg/mdZad9wwdiVCk0YWHIdbXX8I+NNcNETy1gKNDSmmPq7mMueUfbIoctURG5gtUWnqeLgrfaaOe3aXGnLGjcLi5KAQvg00Y+FzuQhVKdBYWECTMakFWLKEkj/hpP4ysUTCiOspkOANKD8AtRIdE2WHZHzlI=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"c82bd21b54db408eb7ccc775bc6a4e7a"}, [
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
  '117635eb-67d4-470a-86d8-77f19c1f5623',
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
  'Tue, 16 Feb 2021 19:00:57 GMT',
  'Content-Length',
  '1331'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistdeletedcertificates-1/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificates-1/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAnRrOdIpMaOOVToHFpZU1uDWucO5Vsj7xvPhJCweQF4iBzmQj0X5iuu6+NjncdnImt9yK9ZmABRzKJKFDYWbocWFF7giMztb+PVv9zU2oVUYyxPnSHBvrq7mahwoIKC7oG7mXB9WbjNYQ6OMgffAAwtDX4UXIEjPRtyLXVt+TSu1ADF+bHM6dxlzXzw/13FxCXCHs1GEgodoWTG2h1vAMNL4VnPimZz/NwLwt4zi0O4jQQ0SsXrgMAdgf2MMhaRAmOiH+0e2YHvNBFm74d5dO9LzXO7ob+3MGAieOgPJC7bYgSJCSNlOrNZgPoXKR/QpXBAJvHF+9b2oQHgSIIH6clQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAG4I6rRRuFB1X0lA10+mzGpnKMkGKDKhdz7JOIaKmqzjS1IZVzsYvIHRPdWBYY9CHiLeWTjForiH8mD2Ip/5GSA6ulEdCnGkxa4NuOmw3XBpXBQVTj5x2KI0vELOzBJxo+PeJBBQE42Q3ZDO7VF5KrKQgs8fZ/JKZJPIfkGfChk0zHWFsPuqt20OXx/Cg/mdZad9wwdiVCk0YWHIdbXX8I+NNcNETy1gKNDSmmPq7mMueUfbIoctURG5gtUWnqeLgrfaaOe3aXGnLGjcLi5KAQvg00Y+FzuQhVKdBYWECTMakFWLKEkj/hpP4ysUTCiOspkOANKD8AtRIdE2WHZHzlI=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"c82bd21b54db408eb7ccc775bc6a4e7a"}, [
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
  '31d627cd-70a7-446b-be51-7c7958e217d0',
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
  'Tue, 16 Feb 2021 19:01:00 GMT',
  'Content-Length',
  '1331'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistdeletedcertificates-1/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificates-1/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAnRrOdIpMaOOVToHFpZU1uDWucO5Vsj7xvPhJCweQF4iBzmQj0X5iuu6+NjncdnImt9yK9ZmABRzKJKFDYWbocWFF7giMztb+PVv9zU2oVUYyxPnSHBvrq7mahwoIKC7oG7mXB9WbjNYQ6OMgffAAwtDX4UXIEjPRtyLXVt+TSu1ADF+bHM6dxlzXzw/13FxCXCHs1GEgodoWTG2h1vAMNL4VnPimZz/NwLwt4zi0O4jQQ0SsXrgMAdgf2MMhaRAmOiH+0e2YHvNBFm74d5dO9LzXO7ob+3MGAieOgPJC7bYgSJCSNlOrNZgPoXKR/QpXBAJvHF+9b2oQHgSIIH6clQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAG4I6rRRuFB1X0lA10+mzGpnKMkGKDKhdz7JOIaKmqzjS1IZVzsYvIHRPdWBYY9CHiLeWTjForiH8mD2Ip/5GSA6ulEdCnGkxa4NuOmw3XBpXBQVTj5x2KI0vELOzBJxo+PeJBBQE42Q3ZDO7VF5KrKQgs8fZ/JKZJPIfkGfChk0zHWFsPuqt20OXx/Cg/mdZad9wwdiVCk0YWHIdbXX8I+NNcNETy1gKNDSmmPq7mMueUfbIoctURG5gtUWnqeLgrfaaOe3aXGnLGjcLi5KAQvg00Y+FzuQhVKdBYWECTMakFWLKEkj/hpP4ysUTCiOspkOANKD8AtRIdE2WHZHzlI=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"c82bd21b54db408eb7ccc775bc6a4e7a"}, [
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
  'e708833d-d124-4a9b-9f2e-489b7c06ab43',
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
  'Tue, 16 Feb 2021 19:01:02 GMT',
  'Content-Length',
  '1331'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistdeletedcertificates-1/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificates-1/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAnRrOdIpMaOOVToHFpZU1uDWucO5Vsj7xvPhJCweQF4iBzmQj0X5iuu6+NjncdnImt9yK9ZmABRzKJKFDYWbocWFF7giMztb+PVv9zU2oVUYyxPnSHBvrq7mahwoIKC7oG7mXB9WbjNYQ6OMgffAAwtDX4UXIEjPRtyLXVt+TSu1ADF+bHM6dxlzXzw/13FxCXCHs1GEgodoWTG2h1vAMNL4VnPimZz/NwLwt4zi0O4jQQ0SsXrgMAdgf2MMhaRAmOiH+0e2YHvNBFm74d5dO9LzXO7ob+3MGAieOgPJC7bYgSJCSNlOrNZgPoXKR/QpXBAJvHF+9b2oQHgSIIH6clQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAG4I6rRRuFB1X0lA10+mzGpnKMkGKDKhdz7JOIaKmqzjS1IZVzsYvIHRPdWBYY9CHiLeWTjForiH8mD2Ip/5GSA6ulEdCnGkxa4NuOmw3XBpXBQVTj5x2KI0vELOzBJxo+PeJBBQE42Q3ZDO7VF5KrKQgs8fZ/JKZJPIfkGfChk0zHWFsPuqt20OXx/Cg/mdZad9wwdiVCk0YWHIdbXX8I+NNcNETy1gKNDSmmPq7mMueUfbIoctURG5gtUWnqeLgrfaaOe3aXGnLGjcLi5KAQvg00Y+FzuQhVKdBYWECTMakFWLKEkj/hpP4ysUTCiOspkOANKD8AtRIdE2WHZHzlI=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"c82bd21b54db408eb7ccc775bc6a4e7a"}, [
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
  'f5b92345-496a-432c-8d9c-e1a9cbf583b1',
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
  'Tue, 16 Feb 2021 19:01:04 GMT',
  'Content-Length',
  '1331'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistdeletedcertificates-1/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificates-1/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAnRrOdIpMaOOVToHFpZU1uDWucO5Vsj7xvPhJCweQF4iBzmQj0X5iuu6+NjncdnImt9yK9ZmABRzKJKFDYWbocWFF7giMztb+PVv9zU2oVUYyxPnSHBvrq7mahwoIKC7oG7mXB9WbjNYQ6OMgffAAwtDX4UXIEjPRtyLXVt+TSu1ADF+bHM6dxlzXzw/13FxCXCHs1GEgodoWTG2h1vAMNL4VnPimZz/NwLwt4zi0O4jQQ0SsXrgMAdgf2MMhaRAmOiH+0e2YHvNBFm74d5dO9LzXO7ob+3MGAieOgPJC7bYgSJCSNlOrNZgPoXKR/QpXBAJvHF+9b2oQHgSIIH6clQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAG4I6rRRuFB1X0lA10+mzGpnKMkGKDKhdz7JOIaKmqzjS1IZVzsYvIHRPdWBYY9CHiLeWTjForiH8mD2Ip/5GSA6ulEdCnGkxa4NuOmw3XBpXBQVTj5x2KI0vELOzBJxo+PeJBBQE42Q3ZDO7VF5KrKQgs8fZ/JKZJPIfkGfChk0zHWFsPuqt20OXx/Cg/mdZad9wwdiVCk0YWHIdbXX8I+NNcNETy1gKNDSmmPq7mMueUfbIoctURG5gtUWnqeLgrfaaOe3aXGnLGjcLi5KAQvg00Y+FzuQhVKdBYWECTMakFWLKEkj/hpP4ysUTCiOspkOANKD8AtRIdE2WHZHzlI=","cancellation_requested":false,"status":"completed","target":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificates-1","request_id":"c82bd21b54db408eb7ccc775bc6a4e7a"}, [
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
  '69b74922-0825-4fab-9e55-0aa467684d9e',
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
  'Tue, 16 Feb 2021 19:01:06 GMT',
  'Content-Length',
  '1289'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistdeletedcertificates-1/')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificates-1/e1cf733ede97460da24b872f946b4e91","kid":"https://keyvault_name.vault.azure.net/keys/listCertificateName-canlistdeletedcertificates-1/e1cf733ede97460da24b872f946b4e91","sid":"https://keyvault_name.vault.azure.net/secrets/listCertificateName-canlistdeletedcertificates-1/e1cf733ede97460da24b872f946b4e91","x5t":"ksHZ6F6KgxQ5pd-5wS9-ZbpNNW4","cer":"MIIDKDCCAhCgAwIBAgIQSkIwS0sVTLevfyhr+2vUHjANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjEwMjE2MTg1MTA1WhcNMjIwMjE2MTkwMTA1WjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQCdGs50ikxo45VOgcWllTW4Na5w7lWyPvG8+EkLB5AXiIHOZCPRfmK67r42Odx2cia33Ir1mYAFHMokoUNhZuhxYUXuCIzO1v49W/3NTahVRjLE+dIcG+uruZqHCggoLugbuZcH1ZuM1hDo4yB98ADC0NfhRcgSM9G3ItdW35NK7UAMX5sczp3GXNfPD/XcXEJcIezUYSCh2hZMbaHW8Aw0vhWc+KZnP83AvC3jOLQ7iNBDRKxeuAwB2B/YwyFpECY6If7R7Zge80EWbvh3l070vNc7uhv7cwYCJ46A8kLttiBIkJI2U6s1mA+hcpH9ClcEAm8cX71vahAeBIggfpyVAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBRupJIysbI7jTgg5aDGpj8XnX7KKzAdBgNVHQ4EFgQUbqSSMrGyO404IOWgxqY/F51+yiswDQYJKoZIhvcNAQELBQADggEBADv35sMhiPSdFR/wLcQAIBXw0zK3ozZoEsz9ioiZL0qLfNqFY/GZU0ajWZfW2gY9PGjOGSoe2aaAReNlwipn2S/subJ7HuVNu8qfbe1yjpk0ao4nrWfmxrCJFS7YZLvhvlu0JM1TIno/qQrO7UOJ42l4N2R5wRBZzwG+Q8rNrOMAMVtvRgnKjKgSWcoXfR5z0Aqxeqjgs07EPBovwTFsmrX2gp729r5gcavPJjnxVxnY5Cwivy/dbTB4yoBen2BBJLaywe0+GVuaMEDaePt0k7pMkJ0PfvhmJ7AuNnAVkvytmocoU0xGQuXqu7vKCuDLaveji13f9jc0eXEqUdYOQS0=","attributes":{"enabled":true,"nbf":1613501465,"exp":1645038065,"created":1613502065,"updated":1613502065,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificates-1/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1613502056,"updated":1613502056}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificates-1/pending"}}, [
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
  'ad787ab0-9098-4997-9483-d6b219a8ddb3',
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
  'Tue, 16 Feb 2021 19:01:06 GMT',
  'Content-Length',
  '2554'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/certificates/listCertificateName-canlistdeletedcertificates-0')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/listCertificateName-canlistdeletedcertificates-0","deletedDate":1613502066,"scheduledPurgeDate":1614106866,"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificates-0/bd0dcef319b84bc08f9f17aa1707a5d4","kid":"https://keyvault_name.vault.azure.net/keys/listCertificateName-canlistdeletedcertificates-0/bd0dcef319b84bc08f9f17aa1707a5d4","sid":"https://keyvault_name.vault.azure.net/secrets/listCertificateName-canlistdeletedcertificates-0/bd0dcef319b84bc08f9f17aa1707a5d4","x5t":"zBalkSChKqyGjsd5JuOIkvPTTuU","cer":"MIIDKDCCAhCgAwIBAgIQfyBNDj2KQHSO99KPn2cvJjANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjEwMjE2MTg1MDU1WhcNMjIwMjE2MTkwMDU1WjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQDkj/QYa7bLv6X68E7OCN7rN2UVu4mZWUkCMSDlob9M1YPIXsS0MH/dyvZ7ED1Y9Tp62c/xD5R+9h6fBy9DpcCythiwfukjl3FVyDzvMD0h0fq+KaHjYhKWPrI/+I3b4NpXXz12I9bOL4u/Ibz5ZMDuFtE5p0CyDo28HyRAzj9i37NBuubvOOtttNdItzkrrDGXRAGQ/5B1Kz1eurzepDAOettrFX9nUeJWoXz6TTI5QN5YsMFFeVU7eNgvMxvjKFHnetTdugYU6OuavpSe+ydPrhN7MugyDEOaQzd/I/RQXH9I/9elI1YmjCWqno+H5iYkvcVCANpyhNKVRN5dqoGZAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBSKVdJTHwHFlZilyRlCyNgcd6kPvzAdBgNVHQ4EFgQUilXSUx8BxZWYpckZQsjYHHepD78wDQYJKoZIhvcNAQELBQADggEBAON9U19JNH5VpybAFvJXBtUKgueOxfkZa3nuZr7mRV0AoVaDzBWVGB8rXAFNJ++1XCOIzKXAFhBUGgVh6hhsEdqykvI6tFZ+nt4DqGroYqxwOeYYpuBRmNZLTF9OlX1kP1RV1X46HedBagPguumcw4hlmCF6RQXv39jvCHxswkI4hXU6Uz93ljSz6Cin+NIscg4aXLfCgHxfIgHWeogi35rmaGDjAoiaAv2cmDtV5phxhBao/jTVE1cAxIL3XyLippwkYE0Gt238FS+IWHcgbm/x4mlsJarOaF5k87McGO1jcm/4W+8eSFv20cpGjEt61bA7vA0PowdqbIiGSIRFhzs=","attributes":{"enabled":true,"nbf":1613501455,"exp":1645038055,"created":1613502055,"updated":1613502055,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificates-0/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1613502047,"updated":1613502047}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificates-0/pending"}}, [
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
  '1ee0f56b-b2c1-4e57-a6d0-48ddf6d5bf5a',
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
  'Tue, 16 Feb 2021 19:01:06 GMT',
  'Content-Length',
  '2745'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistdeletedcertificates-0')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistdeletedcertificates-0"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '148',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  '5ce29690-1dd1-4d61-93d8-22926ac47119',
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
  'Tue, 16 Feb 2021 19:01:06 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistdeletedcertificates-0')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistdeletedcertificates-0"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '148',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  'db7e2ac8-b392-43ff-bc55-9f5aff3190fb',
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
  'Tue, 16 Feb 2021 19:01:06 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistdeletedcertificates-0')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistdeletedcertificates-0"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '148',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  '91442db7-d21f-4d49-9ae2-933b1de1cd4f',
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
  'Tue, 16 Feb 2021 19:01:08 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistdeletedcertificates-0')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistdeletedcertificates-0"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '148',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  '7823efcb-1d30-4f2d-a092-6d8a55a2aacb',
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
  'Tue, 16 Feb 2021 19:01:10 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistdeletedcertificates-0')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistdeletedcertificates-0"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '148',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  '5ed9d654-ebe0-4199-b8e1-c80f55df8a5b',
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
  'Tue, 16 Feb 2021 19:01:12 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistdeletedcertificates-0')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistdeletedcertificates-0"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '148',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  '5d862e16-1718-47d1-8e05-77ea77300e88',
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
  'Tue, 16 Feb 2021 19:01:14 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistdeletedcertificates-0')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/listCertificateName-canlistdeletedcertificates-0","deletedDate":1613502066,"scheduledPurgeDate":1614106866,"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificates-0/bd0dcef319b84bc08f9f17aa1707a5d4","kid":"https://keyvault_name.vault.azure.net/keys/listCertificateName-canlistdeletedcertificates-0/bd0dcef319b84bc08f9f17aa1707a5d4","sid":"https://keyvault_name.vault.azure.net/secrets/listCertificateName-canlistdeletedcertificates-0/bd0dcef319b84bc08f9f17aa1707a5d4","x5t":"zBalkSChKqyGjsd5JuOIkvPTTuU","cer":"MIIDKDCCAhCgAwIBAgIQfyBNDj2KQHSO99KPn2cvJjANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjEwMjE2MTg1MDU1WhcNMjIwMjE2MTkwMDU1WjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQDkj/QYa7bLv6X68E7OCN7rN2UVu4mZWUkCMSDlob9M1YPIXsS0MH/dyvZ7ED1Y9Tp62c/xD5R+9h6fBy9DpcCythiwfukjl3FVyDzvMD0h0fq+KaHjYhKWPrI/+I3b4NpXXz12I9bOL4u/Ibz5ZMDuFtE5p0CyDo28HyRAzj9i37NBuubvOOtttNdItzkrrDGXRAGQ/5B1Kz1eurzepDAOettrFX9nUeJWoXz6TTI5QN5YsMFFeVU7eNgvMxvjKFHnetTdugYU6OuavpSe+ydPrhN7MugyDEOaQzd/I/RQXH9I/9elI1YmjCWqno+H5iYkvcVCANpyhNKVRN5dqoGZAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBSKVdJTHwHFlZilyRlCyNgcd6kPvzAdBgNVHQ4EFgQUilXSUx8BxZWYpckZQsjYHHepD78wDQYJKoZIhvcNAQELBQADggEBAON9U19JNH5VpybAFvJXBtUKgueOxfkZa3nuZr7mRV0AoVaDzBWVGB8rXAFNJ++1XCOIzKXAFhBUGgVh6hhsEdqykvI6tFZ+nt4DqGroYqxwOeYYpuBRmNZLTF9OlX1kP1RV1X46HedBagPguumcw4hlmCF6RQXv39jvCHxswkI4hXU6Uz93ljSz6Cin+NIscg4aXLfCgHxfIgHWeogi35rmaGDjAoiaAv2cmDtV5phxhBao/jTVE1cAxIL3XyLippwkYE0Gt238FS+IWHcgbm/x4mlsJarOaF5k87McGO1jcm/4W+8eSFv20cpGjEt61bA7vA0PowdqbIiGSIRFhzs=","attributes":{"enabled":true,"nbf":1613501455,"exp":1645038055,"created":1613502055,"updated":1613502055,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificates-0/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1613502047,"updated":1613502047}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificates-0/pending"}}, [
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
  'e2d1ebe1-f357-47c5-9c06-8dbda227e9ae',
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
  'Tue, 16 Feb 2021 19:01:17 GMT',
  'Content-Length',
  '2745'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/certificates/listCertificateName-canlistdeletedcertificates-1')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/listCertificateName-canlistdeletedcertificates-1","deletedDate":1613502077,"scheduledPurgeDate":1614106877,"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificates-1/e1cf733ede97460da24b872f946b4e91","kid":"https://keyvault_name.vault.azure.net/keys/listCertificateName-canlistdeletedcertificates-1/e1cf733ede97460da24b872f946b4e91","sid":"https://keyvault_name.vault.azure.net/secrets/listCertificateName-canlistdeletedcertificates-1/e1cf733ede97460da24b872f946b4e91","x5t":"ksHZ6F6KgxQ5pd-5wS9-ZbpNNW4","cer":"MIIDKDCCAhCgAwIBAgIQSkIwS0sVTLevfyhr+2vUHjANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjEwMjE2MTg1MTA1WhcNMjIwMjE2MTkwMTA1WjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQCdGs50ikxo45VOgcWllTW4Na5w7lWyPvG8+EkLB5AXiIHOZCPRfmK67r42Odx2cia33Ir1mYAFHMokoUNhZuhxYUXuCIzO1v49W/3NTahVRjLE+dIcG+uruZqHCggoLugbuZcH1ZuM1hDo4yB98ADC0NfhRcgSM9G3ItdW35NK7UAMX5sczp3GXNfPD/XcXEJcIezUYSCh2hZMbaHW8Aw0vhWc+KZnP83AvC3jOLQ7iNBDRKxeuAwB2B/YwyFpECY6If7R7Zge80EWbvh3l070vNc7uhv7cwYCJ46A8kLttiBIkJI2U6s1mA+hcpH9ClcEAm8cX71vahAeBIggfpyVAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBRupJIysbI7jTgg5aDGpj8XnX7KKzAdBgNVHQ4EFgQUbqSSMrGyO404IOWgxqY/F51+yiswDQYJKoZIhvcNAQELBQADggEBADv35sMhiPSdFR/wLcQAIBXw0zK3ozZoEsz9ioiZL0qLfNqFY/GZU0ajWZfW2gY9PGjOGSoe2aaAReNlwipn2S/subJ7HuVNu8qfbe1yjpk0ao4nrWfmxrCJFS7YZLvhvlu0JM1TIno/qQrO7UOJ42l4N2R5wRBZzwG+Q8rNrOMAMVtvRgnKjKgSWcoXfR5z0Aqxeqjgs07EPBovwTFsmrX2gp729r5gcavPJjnxVxnY5Cwivy/dbTB4yoBen2BBJLaywe0+GVuaMEDaePt0k7pMkJ0PfvhmJ7AuNnAVkvytmocoU0xGQuXqu7vKCuDLaveji13f9jc0eXEqUdYOQS0=","attributes":{"enabled":true,"nbf":1613501465,"exp":1645038065,"created":1613502065,"updated":1613502065,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificates-1/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1613502056,"updated":1613502056}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificates-1/pending"}}, [
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
  '1a3af912-3d89-4bb9-9270-faac7f7e918e',
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
  'Tue, 16 Feb 2021 19:01:17 GMT',
  'Content-Length',
  '2745'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistdeletedcertificates-1')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistdeletedcertificates-1"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '148',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  '5b30351c-7fb8-416a-8c2c-d128a41c6d54',
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
  'Tue, 16 Feb 2021 19:01:17 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistdeletedcertificates-1')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistdeletedcertificates-1"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '148',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  'eb322eef-ddaa-4e75-98da-108cdd0d47b0',
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
  'Tue, 16 Feb 2021 19:01:17 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistdeletedcertificates-1')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistdeletedcertificates-1"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '148',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  'c508e35c-fc3b-461b-9c1e-28b48ca3bb74',
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
  'Tue, 16 Feb 2021 19:01:19 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistdeletedcertificates-1')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistdeletedcertificates-1"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '148',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  '38f1b202-4541-47ec-a681-6afffe931a16',
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
  'Tue, 16 Feb 2021 19:01:21 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistdeletedcertificates-1')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistdeletedcertificates-1"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '148',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  'b8a9abe9-67c2-4ae0-8122-5d68352d6a42',
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
  'Tue, 16 Feb 2021 19:01:22 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistdeletedcertificates-1')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistdeletedcertificates-1"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '148',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  'f9524bc0-6847-4d7e-9174-341bc5823a48',
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
  'Tue, 16 Feb 2021 19:01:24 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistdeletedcertificates-1')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/listCertificateName-canlistdeletedcertificates-1","deletedDate":1613502077,"scheduledPurgeDate":1614106877,"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificates-1/e1cf733ede97460da24b872f946b4e91","kid":"https://keyvault_name.vault.azure.net/keys/listCertificateName-canlistdeletedcertificates-1/e1cf733ede97460da24b872f946b4e91","sid":"https://keyvault_name.vault.azure.net/secrets/listCertificateName-canlistdeletedcertificates-1/e1cf733ede97460da24b872f946b4e91","x5t":"ksHZ6F6KgxQ5pd-5wS9-ZbpNNW4","cer":"MIIDKDCCAhCgAwIBAgIQSkIwS0sVTLevfyhr+2vUHjANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjEwMjE2MTg1MTA1WhcNMjIwMjE2MTkwMTA1WjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQCdGs50ikxo45VOgcWllTW4Na5w7lWyPvG8+EkLB5AXiIHOZCPRfmK67r42Odx2cia33Ir1mYAFHMokoUNhZuhxYUXuCIzO1v49W/3NTahVRjLE+dIcG+uruZqHCggoLugbuZcH1ZuM1hDo4yB98ADC0NfhRcgSM9G3ItdW35NK7UAMX5sczp3GXNfPD/XcXEJcIezUYSCh2hZMbaHW8Aw0vhWc+KZnP83AvC3jOLQ7iNBDRKxeuAwB2B/YwyFpECY6If7R7Zge80EWbvh3l070vNc7uhv7cwYCJ46A8kLttiBIkJI2U6s1mA+hcpH9ClcEAm8cX71vahAeBIggfpyVAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBRupJIysbI7jTgg5aDGpj8XnX7KKzAdBgNVHQ4EFgQUbqSSMrGyO404IOWgxqY/F51+yiswDQYJKoZIhvcNAQELBQADggEBADv35sMhiPSdFR/wLcQAIBXw0zK3ozZoEsz9ioiZL0qLfNqFY/GZU0ajWZfW2gY9PGjOGSoe2aaAReNlwipn2S/subJ7HuVNu8qfbe1yjpk0ao4nrWfmxrCJFS7YZLvhvlu0JM1TIno/qQrO7UOJ42l4N2R5wRBZzwG+Q8rNrOMAMVtvRgnKjKgSWcoXfR5z0Aqxeqjgs07EPBovwTFsmrX2gp729r5gcavPJjnxVxnY5Cwivy/dbTB4yoBen2BBJLaywe0+GVuaMEDaePt0k7pMkJ0PfvhmJ7AuNnAVkvytmocoU0xGQuXqu7vKCuDLaveji13f9jc0eXEqUdYOQS0=","attributes":{"enabled":true,"nbf":1613501465,"exp":1645038065,"created":1613502065,"updated":1613502065,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificates-1/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1613502056,"updated":1613502056}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificates-1/pending"}}, [
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
  '002ae26b-d218-4361-96bc-028aff57f7b3',
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
  'Tue, 16 Feb 2021 19:01:26 GMT',
  'Content-Length',
  '2745'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates')
  .query(true)
  .reply(200, {"value":[{"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/listCertificateName-canlistdeletedcertificates-0","deletedDate":1613502066,"scheduledPurgeDate":1614106866,"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificates-0","x5t":"zBalkSChKqyGjsd5JuOIkvPTTuU","attributes":{"enabled":true,"nbf":1613501455,"exp":1645038055,"created":1613502055,"updated":1613502055,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/listCertificateName-canlistdeletedcertificates-1","deletedDate":1613502077,"scheduledPurgeDate":1614106877,"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificates-1","x5t":"ksHZ6F6KgxQ5pd-5wS9-ZbpNNW4","attributes":{"enabled":true,"nbf":1613501465,"exp":1645038065,"created":1613502065,"updated":1613502065,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7}}],"nextLink":null}, [
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
  '674bcece-d85c-431d-a828-8f3233a7c50c',
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
  'Tue, 16 Feb 2021 19:01:26 GMT',
  'Content-Length',
  '1075'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedcertificates/listCertificateName-canlistdeletedcertificates-0')
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
  '5c817ef3-a8e4-410c-9112-43981903ec14',
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
  'Tue, 16 Feb 2021 19:01:26 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedcertificates/listCertificateName-canlistdeletedcertificates-1')
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
  'd34eadd7-78ad-4c2f-8565-4387fdad808f',
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
  'Tue, 16 Feb 2021 19:01:26 GMT'
]);

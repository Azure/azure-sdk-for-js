let nock = require('nock');

module.exports.hash = "e4e0de702eed6cca52103246ef353349";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0/create')
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
  '92614546-491c-4be0-b676-5ee50b1d2a2d',
  'x-ms-keyvault-service-version',
  '1.2.99.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=76.121.141.80;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 13 Jan 2021 19:41:56 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--1/create')
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
  '9328bfd9-dd71-4260-88a2-8ef587f97e69',
  'x-ms-keyvault-service-version',
  '1.2.99.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=76.121.141.80;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 13 Jan 2021 19:41:56 GMT'
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
  'd40b226b-2a15-431d-846a-031c62223300',
  'x-ms-ests-server',
  '2.1.11397.11 - WUS2 ProdSlices',
  'Set-Cookie',
  'fpc=Aj5dv9zusGxMhR5MCjn_nHI_aSJHAQAAAAREkdcOAAAA; expires=Fri, 12-Feb-2021 19:41:57 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 13 Jan 2021 19:41:56 GMT',
  'Content-Length',
  '1315'
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
  'b499a92d-3de9-4c3a-98d9-bca9f13d2b00',
  'x-ms-ests-server',
  '2.1.11397.11 - SCUS ProdSlices',
  'Set-Cookie',
  'fpc=AhQF9_cJR8VEjLTJfrbYXyM_aSJHAQAAAAREkdcOAAAA; expires=Fri, 12-Feb-2021 19:41:57 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 13 Jan 2021 19:41:57 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--1/create', {"policy":{"key_props":{},"secret_props":{},"x509_props":{"subject":"cn=MyCert","sans":{}},"issuer":{"name":"Self"},"attributes":{}},"attributes":{}})
  .query(true)
  .reply(202, {"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--1/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAws5Ef8arLmt4N3gnWxp7usoFX20Jx34xFwI3ZnvKd29n6rpgqUJZherO32680fNoNpHKSkCyDsJvpHu5JXZwvBal10nuY6e3HmYzP56MnjsGWlJZetKtwJpJD8Xgq7CPA9YvuWrj76LO4wiMxC/IN4QohZZ78yUvzhjLm0ZVJboLDYBJViN8EfQTvy6/DDaGscskHqpXYZelcQDDqm/f2bhVxCigOCmfvFQllpPqJBzvI5/cxLbG85dX6FBvKXvmbHN3W6nqjVgDUtsRLCg328EqemHVlQHc0I9phkpXv2aE2DEkQAJyqCPMrv40pRkp+/FKQRviL6AficTjMsIvmQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBADCEolqpEujNZ1EbJA7pSZ3k+BhGEnEs1M9d8Z1WsqXgx3ZyIUJNiaz0pgP0NgHoMxjKLAkYuLqjwaL2G26vKqaMZPySIiRANXg9QSO+QzidpxZ9q2Jyyq9jvTKw1kX+ZV2usu3aPWsJEEgRl4mgGQMHX6jc9A+rflp/0TSfNr4YCEu/QLphbwXXcH2/Dt3tKN7eC8BGSD89161NNj4fFQ873KuVXeVsXxIMua0kgTx0SsZtR4hXMCGhDlgs8UuqejlfsiRFOcrKIbcfUAqrfJecbqzY5bqgeAXVB5S+Vsy2Fn5j9yhS+/kxCetCrb8jcVwZnCo0BI3LlYvx40qEJGo=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"1fbad6ec8f3b46c9970ede254f355e1a"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--1/pending?api-version=7.1&request_id=1fbad6ec8f3b46c9970ede254f355e1a',
  'Retry-After',
  '10',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '9b9f7621-ef0e-4617-b770-d5a673207c84',
  'x-ms-keyvault-service-version',
  '1.2.99.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=76.121.141.80;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 13 Jan 2021 19:41:57 GMT',
  'Content-Length',
  '1369'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0/create', {"policy":{"key_props":{},"secret_props":{},"x509_props":{"subject":"cn=MyCert","sans":{}},"issuer":{"name":"Self"},"attributes":{}},"attributes":{}})
  .query(true)
  .reply(202, {"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAtwR1+yaLi8CAWwNwEICkmIxTu/Kqum76J9SwxG8OAJm//b3Y4PwwtNqYKuH+MJ3pvxZXqkv1plYigQE4joZylgq5r1T5MiVNXzo499jroKCIBJtbFEk2j56fEdiWkLCb7BdHDQSXUs6K4kvgpVVOm8T8rKRFnpQ8BHZtwL40sIBprwLRFH59YoHEM7sP4WYK+G68sF1HlKQTgZFXUfTROCFA9q7hWNI/6J3qTDBS6Puqs1f+kKd6F5ZPEi0FO3LKgF0Fbrllepe4+4bIIlggTGTWoGIqh+RNspkufE/AN/S3XmVGrUQjYUAzxsH+6lCiqeVH/d/H4aTFOvglSfe/ZQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAGyP3dYRKuX+LC20+SBzVgGHrlmseSA6XfjkgVYCjLics90iIqt2p6TRwmglYiMEvPo2q38iAGsJ/Pz4VBzMZDOTdGjSvSMoJlzc1aQceeamJGedj16W8SFwgKJstbJjsPYWRy0v8GKNNj9/czfDQzODEery8V8/CoRKNhYCFOTcbqk/LY1x3iETtQmdOoWJyG+folnL7t3myMFUCZMy3lHkfTLd3sfmcVSEfVIINW+/TMsP9WY3DBogLEXWj3EUSW2bIuquy3R1wXonbhkxT312AGHjMU7j0pFLisIPISQGRhWliuyHGZaRADu0VEV0472Ym5hd3DyRJQOsJfxuvSA=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"3f01f75e1aab43b2967658b267db8642"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0/pending?api-version=7.1&request_id=3f01f75e1aab43b2967658b267db8642',
  'Retry-After',
  '10',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '2cf5db77-2345-42f4-a900-77e66e622505',
  'x-ms-keyvault-service-version',
  '1.2.99.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=76.121.141.80;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 13 Jan 2021 19:41:56 GMT',
  'Content-Length',
  '1369'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAtwR1+yaLi8CAWwNwEICkmIxTu/Kqum76J9SwxG8OAJm//b3Y4PwwtNqYKuH+MJ3pvxZXqkv1plYigQE4joZylgq5r1T5MiVNXzo499jroKCIBJtbFEk2j56fEdiWkLCb7BdHDQSXUs6K4kvgpVVOm8T8rKRFnpQ8BHZtwL40sIBprwLRFH59YoHEM7sP4WYK+G68sF1HlKQTgZFXUfTROCFA9q7hWNI/6J3qTDBS6Puqs1f+kKd6F5ZPEi0FO3LKgF0Fbrllepe4+4bIIlggTGTWoGIqh+RNspkufE/AN/S3XmVGrUQjYUAzxsH+6lCiqeVH/d/H4aTFOvglSfe/ZQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAGyP3dYRKuX+LC20+SBzVgGHrlmseSA6XfjkgVYCjLics90iIqt2p6TRwmglYiMEvPo2q38iAGsJ/Pz4VBzMZDOTdGjSvSMoJlzc1aQceeamJGedj16W8SFwgKJstbJjsPYWRy0v8GKNNj9/czfDQzODEery8V8/CoRKNhYCFOTcbqk/LY1x3iETtQmdOoWJyG+folnL7t3myMFUCZMy3lHkfTLd3sfmcVSEfVIINW+/TMsP9WY3DBogLEXWj3EUSW2bIuquy3R1wXonbhkxT312AGHjMU7j0pFLisIPISQGRhWliuyHGZaRADu0VEV0472Ym5hd3DyRJQOsJfxuvSA=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"3f01f75e1aab43b2967658b267db8642"}, [
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
  '6a475387-c08a-4768-9445-1bc38c244e9c',
  'x-ms-keyvault-service-version',
  '1.2.99.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=76.121.141.80;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 13 Jan 2021 19:41:56 GMT',
  'Content-Length',
  '1369'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--1/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--1/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAws5Ef8arLmt4N3gnWxp7usoFX20Jx34xFwI3ZnvKd29n6rpgqUJZherO32680fNoNpHKSkCyDsJvpHu5JXZwvBal10nuY6e3HmYzP56MnjsGWlJZetKtwJpJD8Xgq7CPA9YvuWrj76LO4wiMxC/IN4QohZZ78yUvzhjLm0ZVJboLDYBJViN8EfQTvy6/DDaGscskHqpXYZelcQDDqm/f2bhVxCigOCmfvFQllpPqJBzvI5/cxLbG85dX6FBvKXvmbHN3W6nqjVgDUtsRLCg328EqemHVlQHc0I9phkpXv2aE2DEkQAJyqCPMrv40pRkp+/FKQRviL6AficTjMsIvmQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBADCEolqpEujNZ1EbJA7pSZ3k+BhGEnEs1M9d8Z1WsqXgx3ZyIUJNiaz0pgP0NgHoMxjKLAkYuLqjwaL2G26vKqaMZPySIiRANXg9QSO+QzidpxZ9q2Jyyq9jvTKw1kX+ZV2usu3aPWsJEEgRl4mgGQMHX6jc9A+rflp/0TSfNr4YCEu/QLphbwXXcH2/Dt3tKN7eC8BGSD89161NNj4fFQ873KuVXeVsXxIMua0kgTx0SsZtR4hXMCGhDlgs8UuqejlfsiRFOcrKIbcfUAqrfJecbqzY5bqgeAXVB5S+Vsy2Fn5j9yhS+/kxCetCrb8jcVwZnCo0BI3LlYvx40qEJGo=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"1fbad6ec8f3b46c9970ede254f355e1a"}, [
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
  'aa62e4b4-989f-4489-a63e-6efc1943a093',
  'x-ms-keyvault-service-version',
  '1.2.99.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=76.121.141.80;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 13 Jan 2021 19:41:57 GMT',
  'Content-Length',
  '1369'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAtwR1+yaLi8CAWwNwEICkmIxTu/Kqum76J9SwxG8OAJm//b3Y4PwwtNqYKuH+MJ3pvxZXqkv1plYigQE4joZylgq5r1T5MiVNXzo499jroKCIBJtbFEk2j56fEdiWkLCb7BdHDQSXUs6K4kvgpVVOm8T8rKRFnpQ8BHZtwL40sIBprwLRFH59YoHEM7sP4WYK+G68sF1HlKQTgZFXUfTROCFA9q7hWNI/6J3qTDBS6Puqs1f+kKd6F5ZPEi0FO3LKgF0Fbrllepe4+4bIIlggTGTWoGIqh+RNspkufE/AN/S3XmVGrUQjYUAzxsH+6lCiqeVH/d/H4aTFOvglSfe/ZQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAGyP3dYRKuX+LC20+SBzVgGHrlmseSA6XfjkgVYCjLics90iIqt2p6TRwmglYiMEvPo2q38iAGsJ/Pz4VBzMZDOTdGjSvSMoJlzc1aQceeamJGedj16W8SFwgKJstbJjsPYWRy0v8GKNNj9/czfDQzODEery8V8/CoRKNhYCFOTcbqk/LY1x3iETtQmdOoWJyG+folnL7t3myMFUCZMy3lHkfTLd3sfmcVSEfVIINW+/TMsP9WY3DBogLEXWj3EUSW2bIuquy3R1wXonbhkxT312AGHjMU7j0pFLisIPISQGRhWliuyHGZaRADu0VEV0472Ym5hd3DyRJQOsJfxuvSA=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"3f01f75e1aab43b2967658b267db8642"}, [
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
  '78eb705c-5746-4a6d-922c-f1c28d7195ac',
  'x-ms-keyvault-service-version',
  '1.2.99.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=76.121.141.80;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 13 Jan 2021 19:41:57 GMT',
  'Content-Length',
  '1369'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAtwR1+yaLi8CAWwNwEICkmIxTu/Kqum76J9SwxG8OAJm//b3Y4PwwtNqYKuH+MJ3pvxZXqkv1plYigQE4joZylgq5r1T5MiVNXzo499jroKCIBJtbFEk2j56fEdiWkLCb7BdHDQSXUs6K4kvgpVVOm8T8rKRFnpQ8BHZtwL40sIBprwLRFH59YoHEM7sP4WYK+G68sF1HlKQTgZFXUfTROCFA9q7hWNI/6J3qTDBS6Puqs1f+kKd6F5ZPEi0FO3LKgF0Fbrllepe4+4bIIlggTGTWoGIqh+RNspkufE/AN/S3XmVGrUQjYUAzxsH+6lCiqeVH/d/H4aTFOvglSfe/ZQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAGyP3dYRKuX+LC20+SBzVgGHrlmseSA6XfjkgVYCjLics90iIqt2p6TRwmglYiMEvPo2q38iAGsJ/Pz4VBzMZDOTdGjSvSMoJlzc1aQceeamJGedj16W8SFwgKJstbJjsPYWRy0v8GKNNj9/czfDQzODEery8V8/CoRKNhYCFOTcbqk/LY1x3iETtQmdOoWJyG+folnL7t3myMFUCZMy3lHkfTLd3sfmcVSEfVIINW+/TMsP9WY3DBogLEXWj3EUSW2bIuquy3R1wXonbhkxT312AGHjMU7j0pFLisIPISQGRhWliuyHGZaRADu0VEV0472Ym5hd3DyRJQOsJfxuvSA=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"3f01f75e1aab43b2967658b267db8642"}, [
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
  'f1d40d5a-a244-4180-9fb9-73c5086ba518',
  'x-ms-keyvault-service-version',
  '1.2.99.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=76.121.141.80;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 13 Jan 2021 19:41:59 GMT',
  'Content-Length',
  '1369'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAtwR1+yaLi8CAWwNwEICkmIxTu/Kqum76J9SwxG8OAJm//b3Y4PwwtNqYKuH+MJ3pvxZXqkv1plYigQE4joZylgq5r1T5MiVNXzo499jroKCIBJtbFEk2j56fEdiWkLCb7BdHDQSXUs6K4kvgpVVOm8T8rKRFnpQ8BHZtwL40sIBprwLRFH59YoHEM7sP4WYK+G68sF1HlKQTgZFXUfTROCFA9q7hWNI/6J3qTDBS6Puqs1f+kKd6F5ZPEi0FO3LKgF0Fbrllepe4+4bIIlggTGTWoGIqh+RNspkufE/AN/S3XmVGrUQjYUAzxsH+6lCiqeVH/d/H4aTFOvglSfe/ZQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAGyP3dYRKuX+LC20+SBzVgGHrlmseSA6XfjkgVYCjLics90iIqt2p6TRwmglYiMEvPo2q38iAGsJ/Pz4VBzMZDOTdGjSvSMoJlzc1aQceeamJGedj16W8SFwgKJstbJjsPYWRy0v8GKNNj9/czfDQzODEery8V8/CoRKNhYCFOTcbqk/LY1x3iETtQmdOoWJyG+folnL7t3myMFUCZMy3lHkfTLd3sfmcVSEfVIINW+/TMsP9WY3DBogLEXWj3EUSW2bIuquy3R1wXonbhkxT312AGHjMU7j0pFLisIPISQGRhWliuyHGZaRADu0VEV0472Ym5hd3DyRJQOsJfxuvSA=","cancellation_requested":false,"status":"completed","target":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0","request_id":"3f01f75e1aab43b2967658b267db8642"}, [
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
  '1b19e788-668e-4504-be7c-ab42ab8a16bb',
  'x-ms-keyvault-service-version',
  '1.2.99.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=76.121.141.80;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 13 Jan 2021 19:42:02 GMT',
  'Content-Length',
  '1365'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0/')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0/80e5a67c0f8d46ebb2dc184011090895","kid":"https://keyvault_name.vault.azure.net/keys/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0/80e5a67c0f8d46ebb2dc184011090895","sid":"https://keyvault_name.vault.azure.net/secrets/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0/80e5a67c0f8d46ebb2dc184011090895","x5t":"5vyQPwMlso2ayHDFkjv1Sq1p5sU","cer":"MIIDKDCCAhCgAwIBAgIQWaSHwcBRS6SdFdRfEhXDWzANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjEwMTEzMTkzMjAwWhcNMjIwMTEzMTk0MjAwWjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQC3BHX7JouLwIBbA3AQgKSYjFO78qq6bvon1LDEbw4Amb/9vdjg/DC02pgq4f4wnem/FleqS/WmViKBATiOhnKWCrmvVPkyJU1fOjj32OugoIgEm1sUSTaPnp8R2JaQsJvsF0cNBJdSzoriS+ClVU6bxPyspEWelDwEdm3AvjSwgGmvAtEUfn1igcQzuw/hZgr4brywXUeUpBOBkVdR9NE4IUD2ruFY0j/onepMMFLo+6qzV/6Qp3oXlk8SLQU7csqAXQVuuWV6l7j7hsgiWCBMZNagYiqH5E2ymS58T8A39LdeZUatRCNhQDPGwf7qUKKp5Uf938fhpMU6+CVJ979lAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBQn08N4WoYnb0F2/hQux4JxKVT9HDAdBgNVHQ4EFgQUJ9PDeFqGJ29Bdv4ULseCcSlU/RwwDQYJKoZIhvcNAQELBQADggEBAJOIh6Xmbu705cUUR4lyLi7ccWQVgRlF7HFUNmuqq5PW+bGX/FVWz1dfplCLj6K2f184OI/NYbF7XvV9iL30YxySgKSZz1W6gxii+ZrZUnLRWEj/L7sAICYoNiulAEWnvlj7+7sYEgVD8WjtiNPyVBx0Z/Lb7TqA3RZXUQQTx3VUnDBtBDyqVG44B1AT8RUwtFEUfgFhf4qheGS1VA5ui+BL4CT6kcVzRl3RO4Ij71lIHR3NLt3jSBCrL6/efTIp/oZ/Y9J6QRnjE2W7fgXNXa1NywzIYi5W5dmlqgPLJdgtdCaF/lUkZhE4SHTBQcsHnkra+hqekrvqY+/jdPz0tb4=","attributes":{"enabled":true,"nbf":1610566320,"exp":1642102920,"created":1610566920,"updated":1610566920,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1610566917,"updated":1610566917}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0/pending"}}, [
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
  '2f4b58c0-932f-4789-a4b2-cf4f8447916a',
  'x-ms-keyvault-service-version',
  '1.2.99.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=76.121.141.80;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 13 Jan 2021 19:42:02 GMT',
  'Content-Length',
  '2735'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0","deletedDate":1610566922,"scheduledPurgeDate":1618342922,"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0/80e5a67c0f8d46ebb2dc184011090895","kid":"https://keyvault_name.vault.azure.net/keys/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0/80e5a67c0f8d46ebb2dc184011090895","sid":"https://keyvault_name.vault.azure.net/secrets/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0/80e5a67c0f8d46ebb2dc184011090895","x5t":"5vyQPwMlso2ayHDFkjv1Sq1p5sU","cer":"MIIDKDCCAhCgAwIBAgIQWaSHwcBRS6SdFdRfEhXDWzANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjEwMTEzMTkzMjAwWhcNMjIwMTEzMTk0MjAwWjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQC3BHX7JouLwIBbA3AQgKSYjFO78qq6bvon1LDEbw4Amb/9vdjg/DC02pgq4f4wnem/FleqS/WmViKBATiOhnKWCrmvVPkyJU1fOjj32OugoIgEm1sUSTaPnp8R2JaQsJvsF0cNBJdSzoriS+ClVU6bxPyspEWelDwEdm3AvjSwgGmvAtEUfn1igcQzuw/hZgr4brywXUeUpBOBkVdR9NE4IUD2ruFY0j/onepMMFLo+6qzV/6Qp3oXlk8SLQU7csqAXQVuuWV6l7j7hsgiWCBMZNagYiqH5E2ymS58T8A39LdeZUatRCNhQDPGwf7qUKKp5Uf938fhpMU6+CVJ979lAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBQn08N4WoYnb0F2/hQux4JxKVT9HDAdBgNVHQ4EFgQUJ9PDeFqGJ29Bdv4ULseCcSlU/RwwDQYJKoZIhvcNAQELBQADggEBAJOIh6Xmbu705cUUR4lyLi7ccWQVgRlF7HFUNmuqq5PW+bGX/FVWz1dfplCLj6K2f184OI/NYbF7XvV9iL30YxySgKSZz1W6gxii+ZrZUnLRWEj/L7sAICYoNiulAEWnvlj7+7sYEgVD8WjtiNPyVBx0Z/Lb7TqA3RZXUQQTx3VUnDBtBDyqVG44B1AT8RUwtFEUfgFhf4qheGS1VA5ui+BL4CT6kcVzRl3RO4Ij71lIHR3NLt3jSBCrL6/efTIp/oZ/Y9J6QRnjE2W7fgXNXa1NywzIYi5W5dmlqgPLJdgtdCaF/lUkZhE4SHTBQcsHnkra+hqekrvqY+/jdPz0tb4=","attributes":{"enabled":true,"nbf":1610566320,"exp":1642102920,"created":1610566920,"updated":1610566920,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1610566917,"updated":1610566917}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0/pending"}}, [
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
  'eab36003-ab59-4f75-a081-438821e30ac6',
  'x-ms-keyvault-service-version',
  '1.2.99.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=76.121.141.80;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 13 Jan 2021 19:42:02 GMT',
  'Content-Length',
  '2964'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '176',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '7dcb006e-d82d-4846-92e8-792297ecbcac',
  'x-ms-keyvault-service-version',
  '1.2.99.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=76.121.141.80;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 13 Jan 2021 19:42:02 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '176',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '112ecea1-1384-40e9-8737-29eb6d0c41a8',
  'x-ms-keyvault-service-version',
  '1.2.99.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=76.121.141.80;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 13 Jan 2021 19:42:02 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0","deletedDate":1610566922,"scheduledPurgeDate":1618342922,"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0/80e5a67c0f8d46ebb2dc184011090895","kid":"https://keyvault_name.vault.azure.net/keys/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0/80e5a67c0f8d46ebb2dc184011090895","sid":"https://keyvault_name.vault.azure.net/secrets/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0/80e5a67c0f8d46ebb2dc184011090895","x5t":"5vyQPwMlso2ayHDFkjv1Sq1p5sU","cer":"MIIDKDCCAhCgAwIBAgIQWaSHwcBRS6SdFdRfEhXDWzANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjEwMTEzMTkzMjAwWhcNMjIwMTEzMTk0MjAwWjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQC3BHX7JouLwIBbA3AQgKSYjFO78qq6bvon1LDEbw4Amb/9vdjg/DC02pgq4f4wnem/FleqS/WmViKBATiOhnKWCrmvVPkyJU1fOjj32OugoIgEm1sUSTaPnp8R2JaQsJvsF0cNBJdSzoriS+ClVU6bxPyspEWelDwEdm3AvjSwgGmvAtEUfn1igcQzuw/hZgr4brywXUeUpBOBkVdR9NE4IUD2ruFY0j/onepMMFLo+6qzV/6Qp3oXlk8SLQU7csqAXQVuuWV6l7j7hsgiWCBMZNagYiqH5E2ymS58T8A39LdeZUatRCNhQDPGwf7qUKKp5Uf938fhpMU6+CVJ979lAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBQn08N4WoYnb0F2/hQux4JxKVT9HDAdBgNVHQ4EFgQUJ9PDeFqGJ29Bdv4ULseCcSlU/RwwDQYJKoZIhvcNAQELBQADggEBAJOIh6Xmbu705cUUR4lyLi7ccWQVgRlF7HFUNmuqq5PW+bGX/FVWz1dfplCLj6K2f184OI/NYbF7XvV9iL30YxySgKSZz1W6gxii+ZrZUnLRWEj/L7sAICYoNiulAEWnvlj7+7sYEgVD8WjtiNPyVBx0Z/Lb7TqA3RZXUQQTx3VUnDBtBDyqVG44B1AT8RUwtFEUfgFhf4qheGS1VA5ui+BL4CT6kcVzRl3RO4Ij71lIHR3NLt3jSBCrL6/efTIp/oZ/Y9J6QRnjE2W7fgXNXa1NywzIYi5W5dmlqgPLJdgtdCaF/lUkZhE4SHTBQcsHnkra+hqekrvqY+/jdPz0tb4=","attributes":{"enabled":true,"nbf":1610566320,"exp":1642102920,"created":1610566920,"updated":1610566920,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1610566917,"updated":1610566917}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0/pending"}}, [
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
  'f7876fed-8812-46f2-ad93-f16ce07ab3ad',
  'x-ms-keyvault-service-version',
  '1.2.99.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=76.121.141.80;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 13 Jan 2021 19:42:04 GMT',
  'Content-Length',
  '2964'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedcertificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0')
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
  '310a9cd0-1488-46b7-98a7-9b8964650400',
  'x-ms-keyvault-service-version',
  '1.2.99.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=76.121.141.80;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 13 Jan 2021 19:42:04 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--1/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--1/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAws5Ef8arLmt4N3gnWxp7usoFX20Jx34xFwI3ZnvKd29n6rpgqUJZherO32680fNoNpHKSkCyDsJvpHu5JXZwvBal10nuY6e3HmYzP56MnjsGWlJZetKtwJpJD8Xgq7CPA9YvuWrj76LO4wiMxC/IN4QohZZ78yUvzhjLm0ZVJboLDYBJViN8EfQTvy6/DDaGscskHqpXYZelcQDDqm/f2bhVxCigOCmfvFQllpPqJBzvI5/cxLbG85dX6FBvKXvmbHN3W6nqjVgDUtsRLCg328EqemHVlQHc0I9phkpXv2aE2DEkQAJyqCPMrv40pRkp+/FKQRviL6AficTjMsIvmQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBADCEolqpEujNZ1EbJA7pSZ3k+BhGEnEs1M9d8Z1WsqXgx3ZyIUJNiaz0pgP0NgHoMxjKLAkYuLqjwaL2G26vKqaMZPySIiRANXg9QSO+QzidpxZ9q2Jyyq9jvTKw1kX+ZV2usu3aPWsJEEgRl4mgGQMHX6jc9A+rflp/0TSfNr4YCEu/QLphbwXXcH2/Dt3tKN7eC8BGSD89161NNj4fFQ873KuVXeVsXxIMua0kgTx0SsZtR4hXMCGhDlgs8UuqejlfsiRFOcrKIbcfUAqrfJecbqzY5bqgeAXVB5S+Vsy2Fn5j9yhS+/kxCetCrb8jcVwZnCo0BI3LlYvx40qEJGo=","cancellation_requested":false,"status":"completed","target":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--1","request_id":"1fbad6ec8f3b46c9970ede254f355e1a"}, [
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
  'eea0e2d0-4654-4004-a615-dc7f3441cab5',
  'x-ms-keyvault-service-version',
  '1.2.99.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=76.121.141.80;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 13 Jan 2021 19:42:04 GMT',
  'Content-Length',
  '1365'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--1/')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--1/870142b19e3544758c5354d2ad613cbd","kid":"https://keyvault_name.vault.azure.net/keys/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--1/870142b19e3544758c5354d2ad613cbd","sid":"https://keyvault_name.vault.azure.net/secrets/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--1/870142b19e3544758c5354d2ad613cbd","x5t":"x2URaTVUko2XZmaIQbleOKFGFMY","cer":"MIIDKDCCAhCgAwIBAgIQI53uDUq8RX65ByGarfbKgjANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjEwMTEzMTkzMjAwWhcNMjIwMTEzMTk0MjAwWjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQDCzkR/xqsua3g3eCdbGnu6ygVfbQnHfjEXAjdme8p3b2fqumCpQlmF6s7fbrzR82g2kcpKQLIOwm+ke7kldnC8FqXXSe5jp7ceZjM/noyeOwZaUll60q3AmkkPxeCrsI8D1i+5auPvos7jCIzEL8g3hCiFlnvzJS/OGMubRlUlugsNgElWI3wR9BO/Lr8MNoaxyyQeqldhl6VxAMOqb9/ZuFXEKKA4KZ+8VCWWk+okHO8jn9zEtsbzl1foUG8pe+Zsc3dbqeqNWANS2xEsKDfbwSp6YdWVAdzQj2mGSle/ZoTYMSRAAnKoI8yu/jSlGSn78UpBG+IvoB+JxOMywi+ZAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBRnZwaYFS1NNChogNLmqNLbXb6IaTAdBgNVHQ4EFgQUZ2cGmBUtTTQoaIDS5qjS212+iGkwDQYJKoZIhvcNAQELBQADggEBAAvhHL3DCTn4sMLa+8CBemqM7tjDkAJm33LKrjOPrQ0YcPXQyntapkOAYhWFjSMV+6j2c47SV50YvbUXFzhn5Ffqa5znEgRj0I/JPtTWVPhRyeEkWJSU87VvFgJvoq2vJn/X6//cRAQ1NjDduzAICkO+MJKYhF0ejXdccj1mh5K0j0w+VUZGW1lwn3W8SCZzi3jeVIjEg9VY1zj/8UXINncRvvHZ/uNonOUN/fmTbure57SjypeSWW/1C1AVoEkKqmEQ1o9gHAJQeRGkVO2oJDDKemwzC0K7cVlRq/DWxzCUqtMudyhIwFXfGgCAAuP9EmK507nWxn+lWMqCTyMHkEc=","attributes":{"enabled":true,"nbf":1610566320,"exp":1642102920,"created":1610566920,"updated":1610566920,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--1/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1610566917,"updated":1610566917}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--1/pending"}}, [
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
  '17efca8a-af70-4eb6-85ae-76f52f2ebb9e',
  'x-ms-keyvault-service-version',
  '1.2.99.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=76.121.141.80;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 13 Jan 2021 19:42:04 GMT',
  'Content-Length',
  '2735'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--1')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--1","deletedDate":1610566925,"scheduledPurgeDate":1618342925,"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--1/870142b19e3544758c5354d2ad613cbd","kid":"https://keyvault_name.vault.azure.net/keys/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--1/870142b19e3544758c5354d2ad613cbd","sid":"https://keyvault_name.vault.azure.net/secrets/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--1/870142b19e3544758c5354d2ad613cbd","x5t":"x2URaTVUko2XZmaIQbleOKFGFMY","cer":"MIIDKDCCAhCgAwIBAgIQI53uDUq8RX65ByGarfbKgjANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjEwMTEzMTkzMjAwWhcNMjIwMTEzMTk0MjAwWjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQDCzkR/xqsua3g3eCdbGnu6ygVfbQnHfjEXAjdme8p3b2fqumCpQlmF6s7fbrzR82g2kcpKQLIOwm+ke7kldnC8FqXXSe5jp7ceZjM/noyeOwZaUll60q3AmkkPxeCrsI8D1i+5auPvos7jCIzEL8g3hCiFlnvzJS/OGMubRlUlugsNgElWI3wR9BO/Lr8MNoaxyyQeqldhl6VxAMOqb9/ZuFXEKKA4KZ+8VCWWk+okHO8jn9zEtsbzl1foUG8pe+Zsc3dbqeqNWANS2xEsKDfbwSp6YdWVAdzQj2mGSle/ZoTYMSRAAnKoI8yu/jSlGSn78UpBG+IvoB+JxOMywi+ZAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBRnZwaYFS1NNChogNLmqNLbXb6IaTAdBgNVHQ4EFgQUZ2cGmBUtTTQoaIDS5qjS212+iGkwDQYJKoZIhvcNAQELBQADggEBAAvhHL3DCTn4sMLa+8CBemqM7tjDkAJm33LKrjOPrQ0YcPXQyntapkOAYhWFjSMV+6j2c47SV50YvbUXFzhn5Ffqa5znEgRj0I/JPtTWVPhRyeEkWJSU87VvFgJvoq2vJn/X6//cRAQ1NjDduzAICkO+MJKYhF0ejXdccj1mh5K0j0w+VUZGW1lwn3W8SCZzi3jeVIjEg9VY1zj/8UXINncRvvHZ/uNonOUN/fmTbure57SjypeSWW/1C1AVoEkKqmEQ1o9gHAJQeRGkVO2oJDDKemwzC0K7cVlRq/DWxzCUqtMudyhIwFXfGgCAAuP9EmK507nWxn+lWMqCTyMHkEc=","attributes":{"enabled":true,"nbf":1610566320,"exp":1642102920,"created":1610566920,"updated":1610566920,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--1/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1610566917,"updated":1610566917}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--1/pending"}}, [
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
  'fc212076-b15e-4002-a014-987c1d919a21',
  'x-ms-keyvault-service-version',
  '1.2.99.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=76.121.141.80;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 13 Jan 2021 19:42:04 GMT',
  'Content-Length',
  '2964'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--1')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--1"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '176',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '27020bfd-f1b7-4610-aace-59cbc081c139',
  'x-ms-keyvault-service-version',
  '1.2.99.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=76.121.141.80;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 13 Jan 2021 19:42:05 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--1')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--1"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '176',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'f4fc4965-3731-41e8-965d-c429b0fe4051',
  'x-ms-keyvault-service-version',
  '1.2.99.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=76.121.141.80;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 13 Jan 2021 19:42:05 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--1')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--1"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '176',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'f63cec0d-f040-4960-a9fe-7a498f7b6798',
  'x-ms-keyvault-service-version',
  '1.2.99.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=76.121.141.80;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 13 Jan 2021 19:42:06 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--1')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--1"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '176',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '3da501f3-a9ee-4867-8803-2d57a0f26302',
  'x-ms-keyvault-service-version',
  '1.2.99.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=76.121.141.80;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 13 Jan 2021 19:42:08 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--1')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--1","deletedDate":1610566925,"scheduledPurgeDate":1618342925,"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--1/870142b19e3544758c5354d2ad613cbd","kid":"https://keyvault_name.vault.azure.net/keys/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--1/870142b19e3544758c5354d2ad613cbd","sid":"https://keyvault_name.vault.azure.net/secrets/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--1/870142b19e3544758c5354d2ad613cbd","x5t":"x2URaTVUko2XZmaIQbleOKFGFMY","cer":"MIIDKDCCAhCgAwIBAgIQI53uDUq8RX65ByGarfbKgjANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjEwMTEzMTkzMjAwWhcNMjIwMTEzMTk0MjAwWjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQDCzkR/xqsua3g3eCdbGnu6ygVfbQnHfjEXAjdme8p3b2fqumCpQlmF6s7fbrzR82g2kcpKQLIOwm+ke7kldnC8FqXXSe5jp7ceZjM/noyeOwZaUll60q3AmkkPxeCrsI8D1i+5auPvos7jCIzEL8g3hCiFlnvzJS/OGMubRlUlugsNgElWI3wR9BO/Lr8MNoaxyyQeqldhl6VxAMOqb9/ZuFXEKKA4KZ+8VCWWk+okHO8jn9zEtsbzl1foUG8pe+Zsc3dbqeqNWANS2xEsKDfbwSp6YdWVAdzQj2mGSle/ZoTYMSRAAnKoI8yu/jSlGSn78UpBG+IvoB+JxOMywi+ZAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBRnZwaYFS1NNChogNLmqNLbXb6IaTAdBgNVHQ4EFgQUZ2cGmBUtTTQoaIDS5qjS212+iGkwDQYJKoZIhvcNAQELBQADggEBAAvhHL3DCTn4sMLa+8CBemqM7tjDkAJm33LKrjOPrQ0YcPXQyntapkOAYhWFjSMV+6j2c47SV50YvbUXFzhn5Ffqa5znEgRj0I/JPtTWVPhRyeEkWJSU87VvFgJvoq2vJn/X6//cRAQ1NjDduzAICkO+MJKYhF0ejXdccj1mh5K0j0w+VUZGW1lwn3W8SCZzi3jeVIjEg9VY1zj/8UXINncRvvHZ/uNonOUN/fmTbure57SjypeSWW/1C1AVoEkKqmEQ1o9gHAJQeRGkVO2oJDDKemwzC0K7cVlRq/DWxzCUqtMudyhIwFXfGgCAAuP9EmK507nWxn+lWMqCTyMHkEc=","attributes":{"enabled":true,"nbf":1610566320,"exp":1642102920,"created":1610566920,"updated":1610566920,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--1/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1610566917,"updated":1610566917}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--1/pending"}}, [
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
  '2a335e04-829e-4b46-b579-38843cdbf97b',
  'x-ms-keyvault-service-version',
  '1.2.99.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=76.121.141.80;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 13 Jan 2021 19:42:11 GMT',
  'Content-Length',
  '2964'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedcertificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--1')
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
  '01eb46ae-dd15-45bf-8124-9d8dd1ce3685',
  'x-ms-keyvault-service-version',
  '1.2.99.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=76.121.141.80;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 13 Jan 2021 19:42:10 GMT'
]);

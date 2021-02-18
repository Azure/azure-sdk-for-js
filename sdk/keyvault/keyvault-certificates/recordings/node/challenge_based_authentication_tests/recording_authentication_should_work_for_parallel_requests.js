let nock = require('nock');

module.exports.hash = "a293f69d0b5fd0736d8fe7d9c9e1ea78";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

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
  'westus2',
  'x-ms-request-id',
  '3b252294-c2d7-4cad-9dd8-6351f557d47e',
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
  'Tue, 16 Feb 2021 18:55:29 GMT'
]);

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
  'westus2',
  'x-ms-request-id',
  'e62f3bb2-d745-4728-8b04-94d386f42c27',
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
  'Tue, 16 Feb 2021 18:55:29 GMT'
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
  '2359f81e-f21c-4205-8931-1becbbd5f100',
  'x-ms-ests-server',
  '2.1.11496.5 - SCUS ProdSlices',
  'Set-Cookie',
  'fpc=AjFoyM27IzxMrU8SsGb5i_EA4qsDAQAAACEMvtcOAAAA; expires=Thu, 18-Mar-2021 18:55:30 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 16 Feb 2021 18:55:29 GMT'
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
  '084f68b9-0fd0-4203-9e5c-3cf83d14fc00',
  'x-ms-ests-server',
  '2.1.11496.5 - NCUS ProdSlices',
  'Set-Cookie',
  'fpc=AufoSEQpIbxLjzJaYLa_pBMA4qsDAQAAACEMvtcOAAAA; expires=Thu, 18-Mar-2021 18:55:30 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 16 Feb 2021 18:55:30 GMT',
  'Content-Length',
  '1315'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0/create', {"policy":{"key_props":{},"secret_props":{},"x509_props":{"subject":"cn=MyCert","sans":{}},"issuer":{"name":"Self"},"attributes":{}},"attributes":{}})
  .query(true)
  .reply(202, {"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAx+DbL9105UbKSO25bzZFxY22CvXl0t/9NLzsnUO1ietWb8RRXMtN8mOJ2oyQ7HHWkdDlvQtH1/wzdfejL+BAeM+hUnkR52tWn7ByvLvlroUkLAs1JMKoCT2SF4mzAtE2Qo6h79QZENVTi1UMG/qcmO3SbyxNHu/9erp4gqik9IHR/RPAFsYn2fr/gjMJCVcvm9un4Z1UbVdB/yrRO2G4UHp0FSqYmuPjb6Jhwi/wKD1n8s97KLzzCbWD7Mg7bPvanjAUpY8ZrW3HhrfHDguDYwxgvQz2Na0+yHZXreqlQ0CPUNyhC2vwdkG1jVmt+mooHHlmGsSJNXriUuLHEXwrLQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAAj3Moyi4ZILyHnGmn9DTfkniloZtha1UyrsjbittpSOnt9c6j9Gn9RyyYCgonSaSxsloPDcnj7RPiKqq7NWmDU4nMYzC+Z15cC9Kla9rE5Aqsykg9+bsyvLb4VrnzHJeEpJi1skDfqpeIm3ToEyVsaSaNdIJ8IrNidS6R2gbEu+l9L6xwJvJT4ep0OZA9kQbQwgvE8vZQh3XoyvJ6e1wStJG5LSzgFTzZFtdn0z1a5qU/lzJtAyzOwlC8I/EevG4Nh5N17f7Y1qxyhqcOQfsjxIejkRKfWhYiDlvNA18cGt98ijgZkftAe32FYgYbZfu/Ai2Y6t4SDlId3wHWD0AK8=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"36854acbd02549f1b7148af0455e2b64"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0/pending?api-version=7.2&request_id=36854acbd02549f1b7148af0455e2b64',
  'Retry-After',
  '10',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  'df838109-0147-4194-87d8-ed9590233cc9',
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
  'Tue, 16 Feb 2021 18:55:30 GMT',
  'Content-Length',
  '1359'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAx+DbL9105UbKSO25bzZFxY22CvXl0t/9NLzsnUO1ietWb8RRXMtN8mOJ2oyQ7HHWkdDlvQtH1/wzdfejL+BAeM+hUnkR52tWn7ByvLvlroUkLAs1JMKoCT2SF4mzAtE2Qo6h79QZENVTi1UMG/qcmO3SbyxNHu/9erp4gqik9IHR/RPAFsYn2fr/gjMJCVcvm9un4Z1UbVdB/yrRO2G4UHp0FSqYmuPjb6Jhwi/wKD1n8s97KLzzCbWD7Mg7bPvanjAUpY8ZrW3HhrfHDguDYwxgvQz2Na0+yHZXreqlQ0CPUNyhC2vwdkG1jVmt+mooHHlmGsSJNXriUuLHEXwrLQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAAj3Moyi4ZILyHnGmn9DTfkniloZtha1UyrsjbittpSOnt9c6j9Gn9RyyYCgonSaSxsloPDcnj7RPiKqq7NWmDU4nMYzC+Z15cC9Kla9rE5Aqsykg9+bsyvLb4VrnzHJeEpJi1skDfqpeIm3ToEyVsaSaNdIJ8IrNidS6R2gbEu+l9L6xwJvJT4ep0OZA9kQbQwgvE8vZQh3XoyvJ6e1wStJG5LSzgFTzZFtdn0z1a5qU/lzJtAyzOwlC8I/EevG4Nh5N17f7Y1qxyhqcOQfsjxIejkRKfWhYiDlvNA18cGt98ijgZkftAe32FYgYbZfu/Ai2Y6t4SDlId3wHWD0AK8=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"36854acbd02549f1b7148af0455e2b64"}, [
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
  '656ffc6c-c5be-4397-9d6c-05b043df3d4f',
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
  'Tue, 16 Feb 2021 18:55:30 GMT',
  'Content-Length',
  '1359'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAx+DbL9105UbKSO25bzZFxY22CvXl0t/9NLzsnUO1ietWb8RRXMtN8mOJ2oyQ7HHWkdDlvQtH1/wzdfejL+BAeM+hUnkR52tWn7ByvLvlroUkLAs1JMKoCT2SF4mzAtE2Qo6h79QZENVTi1UMG/qcmO3SbyxNHu/9erp4gqik9IHR/RPAFsYn2fr/gjMJCVcvm9un4Z1UbVdB/yrRO2G4UHp0FSqYmuPjb6Jhwi/wKD1n8s97KLzzCbWD7Mg7bPvanjAUpY8ZrW3HhrfHDguDYwxgvQz2Na0+yHZXreqlQ0CPUNyhC2vwdkG1jVmt+mooHHlmGsSJNXriUuLHEXwrLQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAAj3Moyi4ZILyHnGmn9DTfkniloZtha1UyrsjbittpSOnt9c6j9Gn9RyyYCgonSaSxsloPDcnj7RPiKqq7NWmDU4nMYzC+Z15cC9Kla9rE5Aqsykg9+bsyvLb4VrnzHJeEpJi1skDfqpeIm3ToEyVsaSaNdIJ8IrNidS6R2gbEu+l9L6xwJvJT4ep0OZA9kQbQwgvE8vZQh3XoyvJ6e1wStJG5LSzgFTzZFtdn0z1a5qU/lzJtAyzOwlC8I/EevG4Nh5N17f7Y1qxyhqcOQfsjxIejkRKfWhYiDlvNA18cGt98ijgZkftAe32FYgYbZfu/Ai2Y6t4SDlId3wHWD0AK8=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"36854acbd02549f1b7148af0455e2b64"}, [
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
  '6f8ba97a-d4ce-4e60-b6b9-9e45134e2bc0',
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
  'Tue, 16 Feb 2021 18:55:30 GMT',
  'Content-Length',
  '1359'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--1/create', {"policy":{"key_props":{},"secret_props":{},"x509_props":{"subject":"cn=MyCert","sans":{}},"issuer":{"name":"Self"},"attributes":{}},"attributes":{}})
  .query(true)
  .reply(202, {"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--1/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAvy6BpOGZotZeU/0YFbBq084bR22Y1YSbvdYW6HEPirBvtKu7XOTYQkorkI1IbAVO67Tln0DW228+MMh1WSPIDoqT5OEOBwDzzNKgKLY84N1tm5Pj8S0D5wIBy0uBeqc+kMdvg/1d35WiSbPvy92qtJsZ7wXnvKy5jUvW4oaOVdyUpiL0WFQv6akbteidBg9/mpKhIH+yCukKvdn5/+LSBxeCEjnnQPuMKulC3senT2bgMMM8gta2FD6BWE+SHpVVCBS8McWgsIYh7vYhQG7R90uE9rwiy2Qo648D1QByBlj2rgSqvDB1EbenFBo0Fy1o34nsVQkrz3mKM/KDlH2AsQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBACRHbq35LNFAh/0gco2DqEi/+1Gy+RsHLNjIKFzYx3j+efE8+CFmSz4S1oAZde/5bO5yQngInFDG9gXKjeEFzmjJvfMb1reObVN6QR1hmaH+GvhenjaGwgaOp/NpEGH08QAN8lokiQ62w82IioFaeDsgWQeS8BsiR886okRNp5u/umGrm/cLTMe22pXsg9HzcOSzYfdBnXblIMTfyaTfBvr4sO2BA+adziPObBjKG5fPzdPQHvYHsgPH9rS/B4WYud8ZWcaQQK/Q3lhmAqzTaCbmHUef23WFC8mV689a/PtQKEo3wczY+SFmsmrIsEPI7ce4OQROymKuw7/AdA0ivtA=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"f8933ef34a914dd09723cd032acca081"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--1/pending?api-version=7.2&request_id=f8933ef34a914dd09723cd032acca081',
  'Retry-After',
  '10',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  'feea35eb-489b-4586-acbc-43b36af6f0a9',
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
  'Tue, 16 Feb 2021 18:55:30 GMT',
  'Content-Length',
  '1359'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--1/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--1/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAvy6BpOGZotZeU/0YFbBq084bR22Y1YSbvdYW6HEPirBvtKu7XOTYQkorkI1IbAVO67Tln0DW228+MMh1WSPIDoqT5OEOBwDzzNKgKLY84N1tm5Pj8S0D5wIBy0uBeqc+kMdvg/1d35WiSbPvy92qtJsZ7wXnvKy5jUvW4oaOVdyUpiL0WFQv6akbteidBg9/mpKhIH+yCukKvdn5/+LSBxeCEjnnQPuMKulC3senT2bgMMM8gta2FD6BWE+SHpVVCBS8McWgsIYh7vYhQG7R90uE9rwiy2Qo648D1QByBlj2rgSqvDB1EbenFBo0Fy1o34nsVQkrz3mKM/KDlH2AsQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBACRHbq35LNFAh/0gco2DqEi/+1Gy+RsHLNjIKFzYx3j+efE8+CFmSz4S1oAZde/5bO5yQngInFDG9gXKjeEFzmjJvfMb1reObVN6QR1hmaH+GvhenjaGwgaOp/NpEGH08QAN8lokiQ62w82IioFaeDsgWQeS8BsiR886okRNp5u/umGrm/cLTMe22pXsg9HzcOSzYfdBnXblIMTfyaTfBvr4sO2BA+adziPObBjKG5fPzdPQHvYHsgPH9rS/B4WYud8ZWcaQQK/Q3lhmAqzTaCbmHUef23WFC8mV689a/PtQKEo3wczY+SFmsmrIsEPI7ce4OQROymKuw7/AdA0ivtA=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"f8933ef34a914dd09723cd032acca081"}, [
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
  'acec7665-b963-4f14-95ff-02e2c902c444',
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
  'Tue, 16 Feb 2021 18:55:30 GMT',
  'Content-Length',
  '1359'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAx+DbL9105UbKSO25bzZFxY22CvXl0t/9NLzsnUO1ietWb8RRXMtN8mOJ2oyQ7HHWkdDlvQtH1/wzdfejL+BAeM+hUnkR52tWn7ByvLvlroUkLAs1JMKoCT2SF4mzAtE2Qo6h79QZENVTi1UMG/qcmO3SbyxNHu/9erp4gqik9IHR/RPAFsYn2fr/gjMJCVcvm9un4Z1UbVdB/yrRO2G4UHp0FSqYmuPjb6Jhwi/wKD1n8s97KLzzCbWD7Mg7bPvanjAUpY8ZrW3HhrfHDguDYwxgvQz2Na0+yHZXreqlQ0CPUNyhC2vwdkG1jVmt+mooHHlmGsSJNXriUuLHEXwrLQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAAj3Moyi4ZILyHnGmn9DTfkniloZtha1UyrsjbittpSOnt9c6j9Gn9RyyYCgonSaSxsloPDcnj7RPiKqq7NWmDU4nMYzC+Z15cC9Kla9rE5Aqsykg9+bsyvLb4VrnzHJeEpJi1skDfqpeIm3ToEyVsaSaNdIJ8IrNidS6R2gbEu+l9L6xwJvJT4ep0OZA9kQbQwgvE8vZQh3XoyvJ6e1wStJG5LSzgFTzZFtdn0z1a5qU/lzJtAyzOwlC8I/EevG4Nh5N17f7Y1qxyhqcOQfsjxIejkRKfWhYiDlvNA18cGt98ijgZkftAe32FYgYbZfu/Ai2Y6t4SDlId3wHWD0AK8=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"36854acbd02549f1b7148af0455e2b64"}, [
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
  '919c213f-f19b-48d0-bcb2-48d073023e13',
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
  'Tue, 16 Feb 2021 18:55:31 GMT',
  'Content-Length',
  '1359'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAx+DbL9105UbKSO25bzZFxY22CvXl0t/9NLzsnUO1ietWb8RRXMtN8mOJ2oyQ7HHWkdDlvQtH1/wzdfejL+BAeM+hUnkR52tWn7ByvLvlroUkLAs1JMKoCT2SF4mzAtE2Qo6h79QZENVTi1UMG/qcmO3SbyxNHu/9erp4gqik9IHR/RPAFsYn2fr/gjMJCVcvm9un4Z1UbVdB/yrRO2G4UHp0FSqYmuPjb6Jhwi/wKD1n8s97KLzzCbWD7Mg7bPvanjAUpY8ZrW3HhrfHDguDYwxgvQz2Na0+yHZXreqlQ0CPUNyhC2vwdkG1jVmt+mooHHlmGsSJNXriUuLHEXwrLQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAAj3Moyi4ZILyHnGmn9DTfkniloZtha1UyrsjbittpSOnt9c6j9Gn9RyyYCgonSaSxsloPDcnj7RPiKqq7NWmDU4nMYzC+Z15cC9Kla9rE5Aqsykg9+bsyvLb4VrnzHJeEpJi1skDfqpeIm3ToEyVsaSaNdIJ8IrNidS6R2gbEu+l9L6xwJvJT4ep0OZA9kQbQwgvE8vZQh3XoyvJ6e1wStJG5LSzgFTzZFtdn0z1a5qU/lzJtAyzOwlC8I/EevG4Nh5N17f7Y1qxyhqcOQfsjxIejkRKfWhYiDlvNA18cGt98ijgZkftAe32FYgYbZfu/Ai2Y6t4SDlId3wHWD0AK8=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"36854acbd02549f1b7148af0455e2b64"}, [
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
  '0dfb0fc1-6a69-4730-97cc-2753b56114fc',
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
  'Tue, 16 Feb 2021 18:55:34 GMT',
  'Content-Length',
  '1359'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAx+DbL9105UbKSO25bzZFxY22CvXl0t/9NLzsnUO1ietWb8RRXMtN8mOJ2oyQ7HHWkdDlvQtH1/wzdfejL+BAeM+hUnkR52tWn7ByvLvlroUkLAs1JMKoCT2SF4mzAtE2Qo6h79QZENVTi1UMG/qcmO3SbyxNHu/9erp4gqik9IHR/RPAFsYn2fr/gjMJCVcvm9un4Z1UbVdB/yrRO2G4UHp0FSqYmuPjb6Jhwi/wKD1n8s97KLzzCbWD7Mg7bPvanjAUpY8ZrW3HhrfHDguDYwxgvQz2Na0+yHZXreqlQ0CPUNyhC2vwdkG1jVmt+mooHHlmGsSJNXriUuLHEXwrLQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAAj3Moyi4ZILyHnGmn9DTfkniloZtha1UyrsjbittpSOnt9c6j9Gn9RyyYCgonSaSxsloPDcnj7RPiKqq7NWmDU4nMYzC+Z15cC9Kla9rE5Aqsykg9+bsyvLb4VrnzHJeEpJi1skDfqpeIm3ToEyVsaSaNdIJ8IrNidS6R2gbEu+l9L6xwJvJT4ep0OZA9kQbQwgvE8vZQh3XoyvJ6e1wStJG5LSzgFTzZFtdn0z1a5qU/lzJtAyzOwlC8I/EevG4Nh5N17f7Y1qxyhqcOQfsjxIejkRKfWhYiDlvNA18cGt98ijgZkftAe32FYgYbZfu/Ai2Y6t4SDlId3wHWD0AK8=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"36854acbd02549f1b7148af0455e2b64"}, [
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
  '80af7233-f7a6-423c-be6c-6a1d9934f235',
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
  'Tue, 16 Feb 2021 18:55:36 GMT',
  'Content-Length',
  '1359'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAx+DbL9105UbKSO25bzZFxY22CvXl0t/9NLzsnUO1ietWb8RRXMtN8mOJ2oyQ7HHWkdDlvQtH1/wzdfejL+BAeM+hUnkR52tWn7ByvLvlroUkLAs1JMKoCT2SF4mzAtE2Qo6h79QZENVTi1UMG/qcmO3SbyxNHu/9erp4gqik9IHR/RPAFsYn2fr/gjMJCVcvm9un4Z1UbVdB/yrRO2G4UHp0FSqYmuPjb6Jhwi/wKD1n8s97KLzzCbWD7Mg7bPvanjAUpY8ZrW3HhrfHDguDYwxgvQz2Na0+yHZXreqlQ0CPUNyhC2vwdkG1jVmt+mooHHlmGsSJNXriUuLHEXwrLQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAAj3Moyi4ZILyHnGmn9DTfkniloZtha1UyrsjbittpSOnt9c6j9Gn9RyyYCgonSaSxsloPDcnj7RPiKqq7NWmDU4nMYzC+Z15cC9Kla9rE5Aqsykg9+bsyvLb4VrnzHJeEpJi1skDfqpeIm3ToEyVsaSaNdIJ8IrNidS6R2gbEu+l9L6xwJvJT4ep0OZA9kQbQwgvE8vZQh3XoyvJ6e1wStJG5LSzgFTzZFtdn0z1a5qU/lzJtAyzOwlC8I/EevG4Nh5N17f7Y1qxyhqcOQfsjxIejkRKfWhYiDlvNA18cGt98ijgZkftAe32FYgYbZfu/Ai2Y6t4SDlId3wHWD0AK8=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"36854acbd02549f1b7148af0455e2b64"}, [
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
  '78b6809d-7d04-40dc-9ff3-0e683a583b4c',
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
  'Tue, 16 Feb 2021 18:55:38 GMT',
  'Content-Length',
  '1359'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAx+DbL9105UbKSO25bzZFxY22CvXl0t/9NLzsnUO1ietWb8RRXMtN8mOJ2oyQ7HHWkdDlvQtH1/wzdfejL+BAeM+hUnkR52tWn7ByvLvlroUkLAs1JMKoCT2SF4mzAtE2Qo6h79QZENVTi1UMG/qcmO3SbyxNHu/9erp4gqik9IHR/RPAFsYn2fr/gjMJCVcvm9un4Z1UbVdB/yrRO2G4UHp0FSqYmuPjb6Jhwi/wKD1n8s97KLzzCbWD7Mg7bPvanjAUpY8ZrW3HhrfHDguDYwxgvQz2Na0+yHZXreqlQ0CPUNyhC2vwdkG1jVmt+mooHHlmGsSJNXriUuLHEXwrLQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAAj3Moyi4ZILyHnGmn9DTfkniloZtha1UyrsjbittpSOnt9c6j9Gn9RyyYCgonSaSxsloPDcnj7RPiKqq7NWmDU4nMYzC+Z15cC9Kla9rE5Aqsykg9+bsyvLb4VrnzHJeEpJi1skDfqpeIm3ToEyVsaSaNdIJ8IrNidS6R2gbEu+l9L6xwJvJT4ep0OZA9kQbQwgvE8vZQh3XoyvJ6e1wStJG5LSzgFTzZFtdn0z1a5qU/lzJtAyzOwlC8I/EevG4Nh5N17f7Y1qxyhqcOQfsjxIejkRKfWhYiDlvNA18cGt98ijgZkftAe32FYgYbZfu/Ai2Y6t4SDlId3wHWD0AK8=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"36854acbd02549f1b7148af0455e2b64"}, [
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
  '293c211d-d482-4397-a99f-219e288da20a',
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
  'Tue, 16 Feb 2021 18:55:41 GMT',
  'Content-Length',
  '1359'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAx+DbL9105UbKSO25bzZFxY22CvXl0t/9NLzsnUO1ietWb8RRXMtN8mOJ2oyQ7HHWkdDlvQtH1/wzdfejL+BAeM+hUnkR52tWn7ByvLvlroUkLAs1JMKoCT2SF4mzAtE2Qo6h79QZENVTi1UMG/qcmO3SbyxNHu/9erp4gqik9IHR/RPAFsYn2fr/gjMJCVcvm9un4Z1UbVdB/yrRO2G4UHp0FSqYmuPjb6Jhwi/wKD1n8s97KLzzCbWD7Mg7bPvanjAUpY8ZrW3HhrfHDguDYwxgvQz2Na0+yHZXreqlQ0CPUNyhC2vwdkG1jVmt+mooHHlmGsSJNXriUuLHEXwrLQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAAj3Moyi4ZILyHnGmn9DTfkniloZtha1UyrsjbittpSOnt9c6j9Gn9RyyYCgonSaSxsloPDcnj7RPiKqq7NWmDU4nMYzC+Z15cC9Kla9rE5Aqsykg9+bsyvLb4VrnzHJeEpJi1skDfqpeIm3ToEyVsaSaNdIJ8IrNidS6R2gbEu+l9L6xwJvJT4ep0OZA9kQbQwgvE8vZQh3XoyvJ6e1wStJG5LSzgFTzZFtdn0z1a5qU/lzJtAyzOwlC8I/EevG4Nh5N17f7Y1qxyhqcOQfsjxIejkRKfWhYiDlvNA18cGt98ijgZkftAe32FYgYbZfu/Ai2Y6t4SDlId3wHWD0AK8=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"36854acbd02549f1b7148af0455e2b64"}, [
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
  'eccf1db7-66a5-4f75-a828-f2905ac7b35c',
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
  'Tue, 16 Feb 2021 18:55:42 GMT',
  'Content-Length',
  '1359'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAx+DbL9105UbKSO25bzZFxY22CvXl0t/9NLzsnUO1ietWb8RRXMtN8mOJ2oyQ7HHWkdDlvQtH1/wzdfejL+BAeM+hUnkR52tWn7ByvLvlroUkLAs1JMKoCT2SF4mzAtE2Qo6h79QZENVTi1UMG/qcmO3SbyxNHu/9erp4gqik9IHR/RPAFsYn2fr/gjMJCVcvm9un4Z1UbVdB/yrRO2G4UHp0FSqYmuPjb6Jhwi/wKD1n8s97KLzzCbWD7Mg7bPvanjAUpY8ZrW3HhrfHDguDYwxgvQz2Na0+yHZXreqlQ0CPUNyhC2vwdkG1jVmt+mooHHlmGsSJNXriUuLHEXwrLQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAAj3Moyi4ZILyHnGmn9DTfkniloZtha1UyrsjbittpSOnt9c6j9Gn9RyyYCgonSaSxsloPDcnj7RPiKqq7NWmDU4nMYzC+Z15cC9Kla9rE5Aqsykg9+bsyvLb4VrnzHJeEpJi1skDfqpeIm3ToEyVsaSaNdIJ8IrNidS6R2gbEu+l9L6xwJvJT4ep0OZA9kQbQwgvE8vZQh3XoyvJ6e1wStJG5LSzgFTzZFtdn0z1a5qU/lzJtAyzOwlC8I/EevG4Nh5N17f7Y1qxyhqcOQfsjxIejkRKfWhYiDlvNA18cGt98ijgZkftAe32FYgYbZfu/Ai2Y6t4SDlId3wHWD0AK8=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"36854acbd02549f1b7148af0455e2b64"}, [
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
  '3895a8e4-5efd-4b7f-8b59-34a3730ab455',
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
  'Tue, 16 Feb 2021 18:55:44 GMT',
  'Content-Length',
  '1359'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAx+DbL9105UbKSO25bzZFxY22CvXl0t/9NLzsnUO1ietWb8RRXMtN8mOJ2oyQ7HHWkdDlvQtH1/wzdfejL+BAeM+hUnkR52tWn7ByvLvlroUkLAs1JMKoCT2SF4mzAtE2Qo6h79QZENVTi1UMG/qcmO3SbyxNHu/9erp4gqik9IHR/RPAFsYn2fr/gjMJCVcvm9un4Z1UbVdB/yrRO2G4UHp0FSqYmuPjb6Jhwi/wKD1n8s97KLzzCbWD7Mg7bPvanjAUpY8ZrW3HhrfHDguDYwxgvQz2Na0+yHZXreqlQ0CPUNyhC2vwdkG1jVmt+mooHHlmGsSJNXriUuLHEXwrLQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAAj3Moyi4ZILyHnGmn9DTfkniloZtha1UyrsjbittpSOnt9c6j9Gn9RyyYCgonSaSxsloPDcnj7RPiKqq7NWmDU4nMYzC+Z15cC9Kla9rE5Aqsykg9+bsyvLb4VrnzHJeEpJi1skDfqpeIm3ToEyVsaSaNdIJ8IrNidS6R2gbEu+l9L6xwJvJT4ep0OZA9kQbQwgvE8vZQh3XoyvJ6e1wStJG5LSzgFTzZFtdn0z1a5qU/lzJtAyzOwlC8I/EevG4Nh5N17f7Y1qxyhqcOQfsjxIejkRKfWhYiDlvNA18cGt98ijgZkftAe32FYgYbZfu/Ai2Y6t4SDlId3wHWD0AK8=","cancellation_requested":false,"status":"completed","target":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0","request_id":"36854acbd02549f1b7148af0455e2b64"}, [
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
  '0cbf024d-0d20-45b0-a301-f54f4cc27dae',
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
  'Tue, 16 Feb 2021 18:55:46 GMT',
  'Content-Length',
  '1345'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0/')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0/571ca506573b4b0196397946a9f2abe3","kid":"https://keyvault_name.vault.azure.net/keys/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0/571ca506573b4b0196397946a9f2abe3","sid":"https://keyvault_name.vault.azure.net/secrets/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0/571ca506573b4b0196397946a9f2abe3","x5t":"GbIFrmU6HKq_5eGodfP02-bI4SQ","cer":"MIIDKDCCAhCgAwIBAgIQfobvHbtgTS2SrXtfqYT1sjANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjEwMjE2MTg0NTQ2WhcNMjIwMjE2MTg1NTQ2WjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQDH4Nsv3XTlRspI7blvNkXFjbYK9eXS3/00vOydQ7WJ61ZvxFFcy03yY4najJDscdaR0OW9C0fX/DN196Mv4EB4z6FSeRHna1afsHK8u+WuhSQsCzUkwqgJPZIXibMC0TZCjqHv1BkQ1VOLVQwb+pyY7dJvLE0e7/16uniCqKT0gdH9E8AWxifZ+v+CMwkJVy+b26fhnVRtV0H/KtE7YbhQenQVKpia4+NvomHCL/AoPWfyz3sovPMJtYPsyDts+9qeMBSljxmtbceGt8cOC4NjDGC9DPY1rT7Idlet6qVDQI9Q3KELa/B2QbWNWa36aigceWYaxIk1euJS4scRfCstAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBSyauVm21U//8ZNNiYOKUVumF1BUzAdBgNVHQ4EFgQUsmrlZttVP//GTTYmDilFbphdQVMwDQYJKoZIhvcNAQELBQADggEBAI5nIIksQZ/G1S9g4IjzGS37dsdEJYll3SyYo6B2rue6LCBACQ+K6+nR/V9CSXv9oqtji587AmrkVOOcOvLAuPjJEfm8jF0mND/+evUPs9bt74V7kK/gAvy8dCtNeuCVo2eQESF1NBwxe9YEQkkqurNWI28UIY+019mSa2A9y9r0t4L5m6fVJHUw4KcSuv+Z/4LRmIszzOakI1+pAn/PE1km5S0GIHJ+xI/1odQU1Hsfv+ZpQcR6aTF7UeJJNiPfruLqyvlFGLXYg/K1+5deqSsrOqdokiyd2mmDMg125JFjHccNYg7/+vfjDx1EmzPrpDuUjEdfgmcbY67K/N/i5W4=","attributes":{"enabled":true,"nbf":1613501146,"exp":1645037746,"created":1613501746,"updated":1613501746,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1613501730,"updated":1613501730}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0/pending"}}, [
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
  'c6a805d5-6378-42b3-b154-aba92b16a862',
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
  'Tue, 16 Feb 2021 18:55:47 GMT',
  'Content-Length',
  '2694'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0","deletedDate":1613501747,"scheduledPurgeDate":1614106547,"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0/571ca506573b4b0196397946a9f2abe3","kid":"https://keyvault_name.vault.azure.net/keys/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0/571ca506573b4b0196397946a9f2abe3","sid":"https://keyvault_name.vault.azure.net/secrets/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0/571ca506573b4b0196397946a9f2abe3","x5t":"GbIFrmU6HKq_5eGodfP02-bI4SQ","cer":"MIIDKDCCAhCgAwIBAgIQfobvHbtgTS2SrXtfqYT1sjANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjEwMjE2MTg0NTQ2WhcNMjIwMjE2MTg1NTQ2WjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQDH4Nsv3XTlRspI7blvNkXFjbYK9eXS3/00vOydQ7WJ61ZvxFFcy03yY4najJDscdaR0OW9C0fX/DN196Mv4EB4z6FSeRHna1afsHK8u+WuhSQsCzUkwqgJPZIXibMC0TZCjqHv1BkQ1VOLVQwb+pyY7dJvLE0e7/16uniCqKT0gdH9E8AWxifZ+v+CMwkJVy+b26fhnVRtV0H/KtE7YbhQenQVKpia4+NvomHCL/AoPWfyz3sovPMJtYPsyDts+9qeMBSljxmtbceGt8cOC4NjDGC9DPY1rT7Idlet6qVDQI9Q3KELa/B2QbWNWa36aigceWYaxIk1euJS4scRfCstAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBSyauVm21U//8ZNNiYOKUVumF1BUzAdBgNVHQ4EFgQUsmrlZttVP//GTTYmDilFbphdQVMwDQYJKoZIhvcNAQELBQADggEBAI5nIIksQZ/G1S9g4IjzGS37dsdEJYll3SyYo6B2rue6LCBACQ+K6+nR/V9CSXv9oqtji587AmrkVOOcOvLAuPjJEfm8jF0mND/+evUPs9bt74V7kK/gAvy8dCtNeuCVo2eQESF1NBwxe9YEQkkqurNWI28UIY+019mSa2A9y9r0t4L5m6fVJHUw4KcSuv+Z/4LRmIszzOakI1+pAn/PE1km5S0GIHJ+xI/1odQU1Hsfv+ZpQcR6aTF7UeJJNiPfruLqyvlFGLXYg/K1+5deqSsrOqdokiyd2mmDMg125JFjHccNYg7/+vfjDx1EmzPrpDuUjEdfgmcbY67K/N/i5W4=","attributes":{"enabled":true,"nbf":1613501146,"exp":1645037746,"created":1613501746,"updated":1613501746,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1613501730,"updated":1613501730}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0/pending"}}, [
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
  'd98b2238-914f-4d93-9ebc-53efba14e149',
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
  'Tue, 16 Feb 2021 18:55:47 GMT',
  'Content-Length',
  '2913'
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
  'westus2',
  'x-ms-request-id',
  'de3bb6b4-e71f-47ee-9314-20d161e6b689',
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
  'Tue, 16 Feb 2021 18:55:48 GMT'
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
  'westus2',
  'x-ms-request-id',
  '824fe227-3484-4c3e-ac9b-fafa6d9bfee2',
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
  'Tue, 16 Feb 2021 18:55:47 GMT'
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
  'westus2',
  'x-ms-request-id',
  '19c5d6af-50b1-4b70-adbf-71578cc8353f',
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
  'Tue, 16 Feb 2021 18:55:50 GMT'
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
  'westus2',
  'x-ms-request-id',
  'b0850f11-5f15-4f58-aa64-e13863592908',
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
  'Tue, 16 Feb 2021 18:55:52 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0","deletedDate":1613501747,"scheduledPurgeDate":1614106547,"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0/571ca506573b4b0196397946a9f2abe3","kid":"https://keyvault_name.vault.azure.net/keys/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0/571ca506573b4b0196397946a9f2abe3","sid":"https://keyvault_name.vault.azure.net/secrets/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0/571ca506573b4b0196397946a9f2abe3","x5t":"GbIFrmU6HKq_5eGodfP02-bI4SQ","cer":"MIIDKDCCAhCgAwIBAgIQfobvHbtgTS2SrXtfqYT1sjANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjEwMjE2MTg0NTQ2WhcNMjIwMjE2MTg1NTQ2WjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQDH4Nsv3XTlRspI7blvNkXFjbYK9eXS3/00vOydQ7WJ61ZvxFFcy03yY4najJDscdaR0OW9C0fX/DN196Mv4EB4z6FSeRHna1afsHK8u+WuhSQsCzUkwqgJPZIXibMC0TZCjqHv1BkQ1VOLVQwb+pyY7dJvLE0e7/16uniCqKT0gdH9E8AWxifZ+v+CMwkJVy+b26fhnVRtV0H/KtE7YbhQenQVKpia4+NvomHCL/AoPWfyz3sovPMJtYPsyDts+9qeMBSljxmtbceGt8cOC4NjDGC9DPY1rT7Idlet6qVDQI9Q3KELa/B2QbWNWa36aigceWYaxIk1euJS4scRfCstAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBSyauVm21U//8ZNNiYOKUVumF1BUzAdBgNVHQ4EFgQUsmrlZttVP//GTTYmDilFbphdQVMwDQYJKoZIhvcNAQELBQADggEBAI5nIIksQZ/G1S9g4IjzGS37dsdEJYll3SyYo6B2rue6LCBACQ+K6+nR/V9CSXv9oqtji587AmrkVOOcOvLAuPjJEfm8jF0mND/+evUPs9bt74V7kK/gAvy8dCtNeuCVo2eQESF1NBwxe9YEQkkqurNWI28UIY+019mSa2A9y9r0t4L5m6fVJHUw4KcSuv+Z/4LRmIszzOakI1+pAn/PE1km5S0GIHJ+xI/1odQU1Hsfv+ZpQcR6aTF7UeJJNiPfruLqyvlFGLXYg/K1+5deqSsrOqdokiyd2mmDMg125JFjHccNYg7/+vfjDx1EmzPrpDuUjEdfgmcbY67K/N/i5W4=","attributes":{"enabled":true,"nbf":1613501146,"exp":1645037746,"created":1613501746,"updated":1613501746,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1613501730,"updated":1613501730}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0/pending"}}, [
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
  '77451144-0644-4af1-b6f6-3c90884bece9',
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
  'Tue, 16 Feb 2021 18:55:54 GMT',
  'Content-Length',
  '2913'
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
  'westus2',
  'x-ms-request-id',
  '4d63caff-8dab-468b-a0a8-80801959795a',
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
  'Tue, 16 Feb 2021 18:55:54 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--1/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--1/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAvy6BpOGZotZeU/0YFbBq084bR22Y1YSbvdYW6HEPirBvtKu7XOTYQkorkI1IbAVO67Tln0DW228+MMh1WSPIDoqT5OEOBwDzzNKgKLY84N1tm5Pj8S0D5wIBy0uBeqc+kMdvg/1d35WiSbPvy92qtJsZ7wXnvKy5jUvW4oaOVdyUpiL0WFQv6akbteidBg9/mpKhIH+yCukKvdn5/+LSBxeCEjnnQPuMKulC3senT2bgMMM8gta2FD6BWE+SHpVVCBS8McWgsIYh7vYhQG7R90uE9rwiy2Qo648D1QByBlj2rgSqvDB1EbenFBo0Fy1o34nsVQkrz3mKM/KDlH2AsQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBACRHbq35LNFAh/0gco2DqEi/+1Gy+RsHLNjIKFzYx3j+efE8+CFmSz4S1oAZde/5bO5yQngInFDG9gXKjeEFzmjJvfMb1reObVN6QR1hmaH+GvhenjaGwgaOp/NpEGH08QAN8lokiQ62w82IioFaeDsgWQeS8BsiR886okRNp5u/umGrm/cLTMe22pXsg9HzcOSzYfdBnXblIMTfyaTfBvr4sO2BA+adziPObBjKG5fPzdPQHvYHsgPH9rS/B4WYud8ZWcaQQK/Q3lhmAqzTaCbmHUef23WFC8mV689a/PtQKEo3wczY+SFmsmrIsEPI7ce4OQROymKuw7/AdA0ivtA=","cancellation_requested":false,"status":"completed","target":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--1","request_id":"f8933ef34a914dd09723cd032acca081"}, [
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
  'e002b4d5-7dd2-441d-a676-813b38c0794e',
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
  'Tue, 16 Feb 2021 18:55:54 GMT',
  'Content-Length',
  '1345'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--1/')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--1/663a62c75fd04c1eaaed8ed0aba3e1cc","kid":"https://keyvault_name.vault.azure.net/keys/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--1/663a62c75fd04c1eaaed8ed0aba3e1cc","sid":"https://keyvault_name.vault.azure.net/secrets/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--1/663a62c75fd04c1eaaed8ed0aba3e1cc","x5t":"JAzPO6mxW7ZK_KUucG422FFGKAc","cer":"MIIDKDCCAhCgAwIBAgIQMZJwfiBEQNG9HrBkI6flezANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjEwMjE2MTg0NTQ2WhcNMjIwMjE2MTg1NTQ2WjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQC/LoGk4Zmi1l5T/RgVsGrTzhtHbZjVhJu91hbocQ+KsG+0q7tc5NhCSiuQjUhsBU7rtOWfQNbbbz4wyHVZI8gOipPk4Q4HAPPM0qAotjzg3W2bk+PxLQPnAgHLS4F6pz6Qx2+D/V3flaJJs+/L3aq0mxnvBee8rLmNS9biho5V3JSmIvRYVC/pqRu16J0GD3+akqEgf7IK6Qq92fn/4tIHF4ISOedA+4wq6ULex6dPZuAwwzyC1rYUPoFYT5IelVUIFLwxxaCwhiHu9iFAbtH3S4T2vCLLZCjrjwPVAHIGWPauBKq8MHURt6cUGjQXLWjfiexVCSvPeYoz8oOUfYCxAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBSknIGfZ77j9yp/2tjh9vFLiUFRTjAdBgNVHQ4EFgQUpJyBn2e+4/cqf9rY4fbxS4lBUU4wDQYJKoZIhvcNAQELBQADggEBAEQ12C0Fb6CeKXMX/zD0DVvB0ZqoQXG5GTulg34BYMKSn7QgomZAmb0ptg4wACc8lPKhpNrqqhpItUl8gGfz+0H/eMgTxyLxdyGKesdSBostKZnWX3fFxF2Hl1mSseEJhM7W2NMNYUa7UwjkGWO7wKSRmnq526s5lK7sewAkNSnfixOe9rMJHmgh5gqaYqZGhlMuVCk6tkuyXFjDIeibbELy2JaoqNb2ggHN2yiAEMZ8T1sGmqkUKRYYSUc3Ls/ZG4IqAo3dIWUXkJwLrGDqGaHWxri5uTSpZPH3Vguv///A7Xd3NfyeLilgFKXdTFH6busuWpIIBmj2ZmGMJu6OK3I=","attributes":{"enabled":true,"nbf":1613501146,"exp":1645037746,"created":1613501746,"updated":1613501746,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--1/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1613501730,"updated":1613501730}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--1/pending"}}, [
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
  '74aa28aa-db46-497a-ba34-9f9a149c4839',
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
  'Tue, 16 Feb 2021 18:55:54 GMT',
  'Content-Length',
  '2694'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--1')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--1","deletedDate":1613501755,"scheduledPurgeDate":1614106555,"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--1/663a62c75fd04c1eaaed8ed0aba3e1cc","kid":"https://keyvault_name.vault.azure.net/keys/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--1/663a62c75fd04c1eaaed8ed0aba3e1cc","sid":"https://keyvault_name.vault.azure.net/secrets/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--1/663a62c75fd04c1eaaed8ed0aba3e1cc","x5t":"JAzPO6mxW7ZK_KUucG422FFGKAc","cer":"MIIDKDCCAhCgAwIBAgIQMZJwfiBEQNG9HrBkI6flezANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjEwMjE2MTg0NTQ2WhcNMjIwMjE2MTg1NTQ2WjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQC/LoGk4Zmi1l5T/RgVsGrTzhtHbZjVhJu91hbocQ+KsG+0q7tc5NhCSiuQjUhsBU7rtOWfQNbbbz4wyHVZI8gOipPk4Q4HAPPM0qAotjzg3W2bk+PxLQPnAgHLS4F6pz6Qx2+D/V3flaJJs+/L3aq0mxnvBee8rLmNS9biho5V3JSmIvRYVC/pqRu16J0GD3+akqEgf7IK6Qq92fn/4tIHF4ISOedA+4wq6ULex6dPZuAwwzyC1rYUPoFYT5IelVUIFLwxxaCwhiHu9iFAbtH3S4T2vCLLZCjrjwPVAHIGWPauBKq8MHURt6cUGjQXLWjfiexVCSvPeYoz8oOUfYCxAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBSknIGfZ77j9yp/2tjh9vFLiUFRTjAdBgNVHQ4EFgQUpJyBn2e+4/cqf9rY4fbxS4lBUU4wDQYJKoZIhvcNAQELBQADggEBAEQ12C0Fb6CeKXMX/zD0DVvB0ZqoQXG5GTulg34BYMKSn7QgomZAmb0ptg4wACc8lPKhpNrqqhpItUl8gGfz+0H/eMgTxyLxdyGKesdSBostKZnWX3fFxF2Hl1mSseEJhM7W2NMNYUa7UwjkGWO7wKSRmnq526s5lK7sewAkNSnfixOe9rMJHmgh5gqaYqZGhlMuVCk6tkuyXFjDIeibbELy2JaoqNb2ggHN2yiAEMZ8T1sGmqkUKRYYSUc3Ls/ZG4IqAo3dIWUXkJwLrGDqGaHWxri5uTSpZPH3Vguv///A7Xd3NfyeLilgFKXdTFH6busuWpIIBmj2ZmGMJu6OK3I=","attributes":{"enabled":true,"nbf":1613501146,"exp":1645037746,"created":1613501746,"updated":1613501746,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--1/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1613501730,"updated":1613501730}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--1/pending"}}, [
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
  'f9d049dc-7be6-4c78-95f1-aded80296274',
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
  'Tue, 16 Feb 2021 18:55:54 GMT',
  'Content-Length',
  '2913'
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
  'westus2',
  'x-ms-request-id',
  '93ce98b9-cd2e-48bb-a2c4-2d82036bb742',
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
  'Tue, 16 Feb 2021 18:55:55 GMT'
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
  'westus2',
  'x-ms-request-id',
  '605c6ad9-4390-44d4-af79-24ded368a41f',
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
  'Tue, 16 Feb 2021 18:55:54 GMT'
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
  'westus2',
  'x-ms-request-id',
  '1ac2db3d-c919-4dd4-a344-3c8523be1230',
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
  'Tue, 16 Feb 2021 18:55:56 GMT'
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
  'westus2',
  'x-ms-request-id',
  'da32a067-be64-4739-a8de-be771b475edb',
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
  'Tue, 16 Feb 2021 18:55:58 GMT'
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
  'westus2',
  'x-ms-request-id',
  '416ba793-cee4-4bbe-9159-be5ad6b66818',
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
  'Tue, 16 Feb 2021 18:56:00 GMT'
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
  'westus2',
  'x-ms-request-id',
  '7c58efd2-d246-4896-8c03-175ea5279b93',
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
  'Tue, 16 Feb 2021 18:56:02 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--1')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--1","deletedDate":1613501755,"scheduledPurgeDate":1614106555,"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--1/663a62c75fd04c1eaaed8ed0aba3e1cc","kid":"https://keyvault_name.vault.azure.net/keys/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--1/663a62c75fd04c1eaaed8ed0aba3e1cc","sid":"https://keyvault_name.vault.azure.net/secrets/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--1/663a62c75fd04c1eaaed8ed0aba3e1cc","x5t":"JAzPO6mxW7ZK_KUucG422FFGKAc","cer":"MIIDKDCCAhCgAwIBAgIQMZJwfiBEQNG9HrBkI6flezANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjEwMjE2MTg0NTQ2WhcNMjIwMjE2MTg1NTQ2WjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQC/LoGk4Zmi1l5T/RgVsGrTzhtHbZjVhJu91hbocQ+KsG+0q7tc5NhCSiuQjUhsBU7rtOWfQNbbbz4wyHVZI8gOipPk4Q4HAPPM0qAotjzg3W2bk+PxLQPnAgHLS4F6pz6Qx2+D/V3flaJJs+/L3aq0mxnvBee8rLmNS9biho5V3JSmIvRYVC/pqRu16J0GD3+akqEgf7IK6Qq92fn/4tIHF4ISOedA+4wq6ULex6dPZuAwwzyC1rYUPoFYT5IelVUIFLwxxaCwhiHu9iFAbtH3S4T2vCLLZCjrjwPVAHIGWPauBKq8MHURt6cUGjQXLWjfiexVCSvPeYoz8oOUfYCxAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBSknIGfZ77j9yp/2tjh9vFLiUFRTjAdBgNVHQ4EFgQUpJyBn2e+4/cqf9rY4fbxS4lBUU4wDQYJKoZIhvcNAQELBQADggEBAEQ12C0Fb6CeKXMX/zD0DVvB0ZqoQXG5GTulg34BYMKSn7QgomZAmb0ptg4wACc8lPKhpNrqqhpItUl8gGfz+0H/eMgTxyLxdyGKesdSBostKZnWX3fFxF2Hl1mSseEJhM7W2NMNYUa7UwjkGWO7wKSRmnq526s5lK7sewAkNSnfixOe9rMJHmgh5gqaYqZGhlMuVCk6tkuyXFjDIeibbELy2JaoqNb2ggHN2yiAEMZ8T1sGmqkUKRYYSUc3Ls/ZG4IqAo3dIWUXkJwLrGDqGaHWxri5uTSpZPH3Vguv///A7Xd3NfyeLilgFKXdTFH6busuWpIIBmj2ZmGMJu6OK3I=","attributes":{"enabled":true,"nbf":1613501146,"exp":1645037746,"created":1613501746,"updated":1613501746,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--1/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1613501730,"updated":1613501730}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--1/pending"}}, [
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
  '248bea6c-692e-432d-85a1-56d7ca91554f',
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
  'Tue, 16 Feb 2021 18:56:04 GMT',
  'Content-Length',
  '2913'
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
  'westus2',
  'x-ms-request-id',
  '51c0310b-e3e7-458f-88b6-6b621a2f3eaa',
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
  'Tue, 16 Feb 2021 18:56:05 GMT'
]);

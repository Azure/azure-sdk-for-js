let nock = require('nock');

module.exports.hash = "58ca65d84039361e35a4d4185779a38b";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/certificates/CRUDCertificateName-supportstracing-/create')
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
  'x-ms-client-request-id',
  'b467f593-4934-48e2-ba6e-3e920ccd78d7',
  'x-ms-request-id',
  'b1099b60-0d63-496d-af6f-90016803b74b',
  'x-ms-keyvault-service-version',
  '1.2.236.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=96.57.209.90;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Sun, 25 Apr 2021 20:33:35 GMT'
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
  '203b35d4-9021-435d-aca9-12289402d300',
  'x-ms-ests-server',
  '2.1.11654.16 - SCUS ProdSlices',
  'Set-Cookie',
  'fpc=ApO-F-pfhW5FqSzVaGhyVUCS9HQSAQAAAB7JF9gOAAAA; expires=Tue, 25-May-2021 20:33:35 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Sun, 25 Apr 2021 20:33:34 GMT',
  'Content-Length',
  '1315'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/certificates/CRUDCertificateName-supportstracing-/create', {"policy":{"key_props":{},"secret_props":{},"x509_props":{"subject":"cn=MyCert","sans":{}},"issuer":{"name":"Self"},"attributes":{}},"attributes":{}})
  .query(true)
  .reply(202, {"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-supportstracing-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAr7u9zDiaXZ+3csAH3rHJ09V3Nm8rmMF1StBkYKEMn3n/yN934kTa4h6zZWiziPGiB7xA95TvuvQv5P85S0rDg0bOK87OMNT7B3z2/EEr+608ETYNRqGgQoDsQ98S4sQytkQObp2/3+6iyx85k859mVA8aLgP9RN1qIALmrT515LvGtjmwDDuCBnI42TGEhJavzuJWk+3gfuiK6fkSiXHJG/iTUY/AWrIxB9FoGrDVcgptUbIqrJN+vw6QzRqiM/AzmqyM4T5vz8p4kaP8e57tN0yIFTSfYZG1oiH9RifbbWC/hu+n2PQ8y1rANb0FAwlAXi7vYURPxtwVfUjk4fXRQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAAk6SshQbRJCgVZf12USs1Nu/1+Nul9SNrAVIpU6t4uyjlUZf/C94JhDXHevXuIrK1pUAixADc9V/4C3Xc8eqg6IUhP/c21oy5cw8PJS7jVKhPgksIiMsbk31Pc4y6Uxlcnmn+KQ6JitJ4AiE1jWh654+lQdHh2bxT3M0/nku3vFJhqkuRAuLD7iAqCp2LkktrHCuL5j5+ATZrF9XHOR16dQTyl66hZ+jmLPEmxA0ded+KIBjf7zHl0WcXsNfCbCGxrpCtCNs28/OdpBkGBAogVfr3w0KCEWUhovi4PC1gedl7/LXh3/7UITpp03iAiH21fnE+ReD//8geL039sJC8s=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"d5cc49033e3d4ccba7f5551785d87fa6"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-supportstracing-/pending?api-version=7.2&request_id=d5cc49033e3d4ccba7f5551785d87fa6',
  'Retry-After',
  '10',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  'b467f593-4934-48e2-ba6e-3e920ccd78d7',
  'x-ms-request-id',
  '86834a6d-d7f3-40a1-a5f3-bc25cbc80ceb',
  'x-ms-keyvault-service-version',
  '1.2.236.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=96.57.209.90;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Sun, 25 Apr 2021 20:33:36 GMT',
  'Content-Length',
  '1319'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/CRUDCertificateName-supportstracing-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-supportstracing-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAr7u9zDiaXZ+3csAH3rHJ09V3Nm8rmMF1StBkYKEMn3n/yN934kTa4h6zZWiziPGiB7xA95TvuvQv5P85S0rDg0bOK87OMNT7B3z2/EEr+608ETYNRqGgQoDsQ98S4sQytkQObp2/3+6iyx85k859mVA8aLgP9RN1qIALmrT515LvGtjmwDDuCBnI42TGEhJavzuJWk+3gfuiK6fkSiXHJG/iTUY/AWrIxB9FoGrDVcgptUbIqrJN+vw6QzRqiM/AzmqyM4T5vz8p4kaP8e57tN0yIFTSfYZG1oiH9RifbbWC/hu+n2PQ8y1rANb0FAwlAXi7vYURPxtwVfUjk4fXRQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAAk6SshQbRJCgVZf12USs1Nu/1+Nul9SNrAVIpU6t4uyjlUZf/C94JhDXHevXuIrK1pUAixADc9V/4C3Xc8eqg6IUhP/c21oy5cw8PJS7jVKhPgksIiMsbk31Pc4y6Uxlcnmn+KQ6JitJ4AiE1jWh654+lQdHh2bxT3M0/nku3vFJhqkuRAuLD7iAqCp2LkktrHCuL5j5+ATZrF9XHOR16dQTyl66hZ+jmLPEmxA0ded+KIBjf7zHl0WcXsNfCbCGxrpCtCNs28/OdpBkGBAogVfr3w0KCEWUhovi4PC1gedl7/LXh3/7UITpp03iAiH21fnE+ReD//8geL039sJC8s=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"d5cc49033e3d4ccba7f5551785d87fa6"}, [
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
  'x-ms-client-request-id',
  '0d1b9f48-e61e-45b1-b270-d85d41f99bdf',
  'x-ms-request-id',
  '6b7287cd-e2ad-46ac-9f1e-d7750938b111',
  'x-ms-keyvault-service-version',
  '1.2.236.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=96.57.209.90;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Sun, 25 Apr 2021 20:33:36 GMT',
  'Content-Length',
  '1319'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/CRUDCertificateName-supportstracing-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-supportstracing-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAr7u9zDiaXZ+3csAH3rHJ09V3Nm8rmMF1StBkYKEMn3n/yN934kTa4h6zZWiziPGiB7xA95TvuvQv5P85S0rDg0bOK87OMNT7B3z2/EEr+608ETYNRqGgQoDsQ98S4sQytkQObp2/3+6iyx85k859mVA8aLgP9RN1qIALmrT515LvGtjmwDDuCBnI42TGEhJavzuJWk+3gfuiK6fkSiXHJG/iTUY/AWrIxB9FoGrDVcgptUbIqrJN+vw6QzRqiM/AzmqyM4T5vz8p4kaP8e57tN0yIFTSfYZG1oiH9RifbbWC/hu+n2PQ8y1rANb0FAwlAXi7vYURPxtwVfUjk4fXRQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAAk6SshQbRJCgVZf12USs1Nu/1+Nul9SNrAVIpU6t4uyjlUZf/C94JhDXHevXuIrK1pUAixADc9V/4C3Xc8eqg6IUhP/c21oy5cw8PJS7jVKhPgksIiMsbk31Pc4y6Uxlcnmn+KQ6JitJ4AiE1jWh654+lQdHh2bxT3M0/nku3vFJhqkuRAuLD7iAqCp2LkktrHCuL5j5+ATZrF9XHOR16dQTyl66hZ+jmLPEmxA0ded+KIBjf7zHl0WcXsNfCbCGxrpCtCNs28/OdpBkGBAogVfr3w0KCEWUhovi4PC1gedl7/LXh3/7UITpp03iAiH21fnE+ReD//8geL039sJC8s=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"d5cc49033e3d4ccba7f5551785d87fa6"}, [
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
  'x-ms-client-request-id',
  '9c53ffe2-6535-43f2-ac61-483e1944658a',
  'x-ms-request-id',
  '1923767a-c735-46a6-9217-f194db021804',
  'x-ms-keyvault-service-version',
  '1.2.236.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=96.57.209.90;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Sun, 25 Apr 2021 20:33:36 GMT',
  'Content-Length',
  '1319'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/CRUDCertificateName-supportstracing-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-supportstracing-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAr7u9zDiaXZ+3csAH3rHJ09V3Nm8rmMF1StBkYKEMn3n/yN934kTa4h6zZWiziPGiB7xA95TvuvQv5P85S0rDg0bOK87OMNT7B3z2/EEr+608ETYNRqGgQoDsQ98S4sQytkQObp2/3+6iyx85k859mVA8aLgP9RN1qIALmrT515LvGtjmwDDuCBnI42TGEhJavzuJWk+3gfuiK6fkSiXHJG/iTUY/AWrIxB9FoGrDVcgptUbIqrJN+vw6QzRqiM/AzmqyM4T5vz8p4kaP8e57tN0yIFTSfYZG1oiH9RifbbWC/hu+n2PQ8y1rANb0FAwlAXi7vYURPxtwVfUjk4fXRQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAAk6SshQbRJCgVZf12USs1Nu/1+Nul9SNrAVIpU6t4uyjlUZf/C94JhDXHevXuIrK1pUAixADc9V/4C3Xc8eqg6IUhP/c21oy5cw8PJS7jVKhPgksIiMsbk31Pc4y6Uxlcnmn+KQ6JitJ4AiE1jWh654+lQdHh2bxT3M0/nku3vFJhqkuRAuLD7iAqCp2LkktrHCuL5j5+ATZrF9XHOR16dQTyl66hZ+jmLPEmxA0ded+KIBjf7zHl0WcXsNfCbCGxrpCtCNs28/OdpBkGBAogVfr3w0KCEWUhovi4PC1gedl7/LXh3/7UITpp03iAiH21fnE+ReD//8geL039sJC8s=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"d5cc49033e3d4ccba7f5551785d87fa6"}, [
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
  'x-ms-client-request-id',
  '1e8676ff-6065-4b59-9e00-97b5e967ca4f',
  'x-ms-request-id',
  '37ee0a38-0efd-4cab-a87a-513d471f4890',
  'x-ms-keyvault-service-version',
  '1.2.236.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=96.57.209.90;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Sun, 25 Apr 2021 20:33:38 GMT',
  'Content-Length',
  '1319'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/CRUDCertificateName-supportstracing-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-supportstracing-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAr7u9zDiaXZ+3csAH3rHJ09V3Nm8rmMF1StBkYKEMn3n/yN934kTa4h6zZWiziPGiB7xA95TvuvQv5P85S0rDg0bOK87OMNT7B3z2/EEr+608ETYNRqGgQoDsQ98S4sQytkQObp2/3+6iyx85k859mVA8aLgP9RN1qIALmrT515LvGtjmwDDuCBnI42TGEhJavzuJWk+3gfuiK6fkSiXHJG/iTUY/AWrIxB9FoGrDVcgptUbIqrJN+vw6QzRqiM/AzmqyM4T5vz8p4kaP8e57tN0yIFTSfYZG1oiH9RifbbWC/hu+n2PQ8y1rANb0FAwlAXi7vYURPxtwVfUjk4fXRQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAAk6SshQbRJCgVZf12USs1Nu/1+Nul9SNrAVIpU6t4uyjlUZf/C94JhDXHevXuIrK1pUAixADc9V/4C3Xc8eqg6IUhP/c21oy5cw8PJS7jVKhPgksIiMsbk31Pc4y6Uxlcnmn+KQ6JitJ4AiE1jWh654+lQdHh2bxT3M0/nku3vFJhqkuRAuLD7iAqCp2LkktrHCuL5j5+ATZrF9XHOR16dQTyl66hZ+jmLPEmxA0ded+KIBjf7zHl0WcXsNfCbCGxrpCtCNs28/OdpBkGBAogVfr3w0KCEWUhovi4PC1gedl7/LXh3/7UITpp03iAiH21fnE+ReD//8geL039sJC8s=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"d5cc49033e3d4ccba7f5551785d87fa6"}, [
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
  'x-ms-client-request-id',
  '64d3cde7-7ef8-4b45-9141-f99356d30856',
  'x-ms-request-id',
  '6ec1ed3c-30a0-4329-b738-c4f08966eb76',
  'x-ms-keyvault-service-version',
  '1.2.236.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=96.57.209.90;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Sun, 25 Apr 2021 20:33:40 GMT',
  'Content-Length',
  '1319'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/CRUDCertificateName-supportstracing-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-supportstracing-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAr7u9zDiaXZ+3csAH3rHJ09V3Nm8rmMF1StBkYKEMn3n/yN934kTa4h6zZWiziPGiB7xA95TvuvQv5P85S0rDg0bOK87OMNT7B3z2/EEr+608ETYNRqGgQoDsQ98S4sQytkQObp2/3+6iyx85k859mVA8aLgP9RN1qIALmrT515LvGtjmwDDuCBnI42TGEhJavzuJWk+3gfuiK6fkSiXHJG/iTUY/AWrIxB9FoGrDVcgptUbIqrJN+vw6QzRqiM/AzmqyM4T5vz8p4kaP8e57tN0yIFTSfYZG1oiH9RifbbWC/hu+n2PQ8y1rANb0FAwlAXi7vYURPxtwVfUjk4fXRQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAAk6SshQbRJCgVZf12USs1Nu/1+Nul9SNrAVIpU6t4uyjlUZf/C94JhDXHevXuIrK1pUAixADc9V/4C3Xc8eqg6IUhP/c21oy5cw8PJS7jVKhPgksIiMsbk31Pc4y6Uxlcnmn+KQ6JitJ4AiE1jWh654+lQdHh2bxT3M0/nku3vFJhqkuRAuLD7iAqCp2LkktrHCuL5j5+ATZrF9XHOR16dQTyl66hZ+jmLPEmxA0ded+KIBjf7zHl0WcXsNfCbCGxrpCtCNs28/OdpBkGBAogVfr3w0KCEWUhovi4PC1gedl7/LXh3/7UITpp03iAiH21fnE+ReD//8geL039sJC8s=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"d5cc49033e3d4ccba7f5551785d87fa6"}, [
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
  'x-ms-client-request-id',
  '74558cc9-aac7-463b-a794-bef69387b726',
  'x-ms-request-id',
  'ca24a15a-9a2c-4884-b3c7-92b62d737a11',
  'x-ms-keyvault-service-version',
  '1.2.236.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=96.57.209.90;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Sun, 25 Apr 2021 20:33:42 GMT',
  'Content-Length',
  '1319'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/CRUDCertificateName-supportstracing-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-supportstracing-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAr7u9zDiaXZ+3csAH3rHJ09V3Nm8rmMF1StBkYKEMn3n/yN934kTa4h6zZWiziPGiB7xA95TvuvQv5P85S0rDg0bOK87OMNT7B3z2/EEr+608ETYNRqGgQoDsQ98S4sQytkQObp2/3+6iyx85k859mVA8aLgP9RN1qIALmrT515LvGtjmwDDuCBnI42TGEhJavzuJWk+3gfuiK6fkSiXHJG/iTUY/AWrIxB9FoGrDVcgptUbIqrJN+vw6QzRqiM/AzmqyM4T5vz8p4kaP8e57tN0yIFTSfYZG1oiH9RifbbWC/hu+n2PQ8y1rANb0FAwlAXi7vYURPxtwVfUjk4fXRQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAAk6SshQbRJCgVZf12USs1Nu/1+Nul9SNrAVIpU6t4uyjlUZf/C94JhDXHevXuIrK1pUAixADc9V/4C3Xc8eqg6IUhP/c21oy5cw8PJS7jVKhPgksIiMsbk31Pc4y6Uxlcnmn+KQ6JitJ4AiE1jWh654+lQdHh2bxT3M0/nku3vFJhqkuRAuLD7iAqCp2LkktrHCuL5j5+ATZrF9XHOR16dQTyl66hZ+jmLPEmxA0ded+KIBjf7zHl0WcXsNfCbCGxrpCtCNs28/OdpBkGBAogVfr3w0KCEWUhovi4PC1gedl7/LXh3/7UITpp03iAiH21fnE+ReD//8geL039sJC8s=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"d5cc49033e3d4ccba7f5551785d87fa6"}, [
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
  'x-ms-client-request-id',
  '7263311b-068b-4f7c-b570-b32f16f89a3f',
  'x-ms-request-id',
  '61afb161-1472-4f9c-b0f1-d9995ccda401',
  'x-ms-keyvault-service-version',
  '1.2.236.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=96.57.209.90;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Sun, 25 Apr 2021 20:33:45 GMT',
  'Content-Length',
  '1319'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/CRUDCertificateName-supportstracing-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-supportstracing-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAr7u9zDiaXZ+3csAH3rHJ09V3Nm8rmMF1StBkYKEMn3n/yN934kTa4h6zZWiziPGiB7xA95TvuvQv5P85S0rDg0bOK87OMNT7B3z2/EEr+608ETYNRqGgQoDsQ98S4sQytkQObp2/3+6iyx85k859mVA8aLgP9RN1qIALmrT515LvGtjmwDDuCBnI42TGEhJavzuJWk+3gfuiK6fkSiXHJG/iTUY/AWrIxB9FoGrDVcgptUbIqrJN+vw6QzRqiM/AzmqyM4T5vz8p4kaP8e57tN0yIFTSfYZG1oiH9RifbbWC/hu+n2PQ8y1rANb0FAwlAXi7vYURPxtwVfUjk4fXRQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAAk6SshQbRJCgVZf12USs1Nu/1+Nul9SNrAVIpU6t4uyjlUZf/C94JhDXHevXuIrK1pUAixADc9V/4C3Xc8eqg6IUhP/c21oy5cw8PJS7jVKhPgksIiMsbk31Pc4y6Uxlcnmn+KQ6JitJ4AiE1jWh654+lQdHh2bxT3M0/nku3vFJhqkuRAuLD7iAqCp2LkktrHCuL5j5+ATZrF9XHOR16dQTyl66hZ+jmLPEmxA0ded+KIBjf7zHl0WcXsNfCbCGxrpCtCNs28/OdpBkGBAogVfr3w0KCEWUhovi4PC1gedl7/LXh3/7UITpp03iAiH21fnE+ReD//8geL039sJC8s=","cancellation_requested":false,"status":"completed","target":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-supportstracing-","request_id":"d5cc49033e3d4ccba7f5551785d87fa6"}, [
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
  'x-ms-client-request-id',
  'a5b20e8a-6915-445c-9f29-0551926fe729',
  'x-ms-request-id',
  'd4ae4d71-f6dd-4bbc-be18-a65ba5389d65',
  'x-ms-keyvault-service-version',
  '1.2.236.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=96.57.209.90;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Sun, 25 Apr 2021 20:33:46 GMT',
  'Content-Length',
  '1265'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/CRUDCertificateName-supportstracing-/')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-supportstracing-/822ff95017da4c99ac712e27ededa97f","kid":"https://keyvault_name.vault.azure.net/keys/CRUDCertificateName-supportstracing-/822ff95017da4c99ac712e27ededa97f","sid":"https://keyvault_name.vault.azure.net/secrets/CRUDCertificateName-supportstracing-/822ff95017da4c99ac712e27ededa97f","x5t":"IUB5ekKqybzZS87mW-gUT2sUgUQ","cer":"MIIDKDCCAhCgAwIBAgIQEEEbS3WgQ5SEXMYh/f9F0DANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjEwNDI1MjAyMzQ1WhcNMjIwNDI1MjAzMzQ1WjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQCvu73MOJpdn7dywAfescnT1Xc2byuYwXVK0GRgoQyfef/I33fiRNriHrNlaLOI8aIHvED3lO+69C/k/zlLSsODRs4rzs4w1PsHfPb8QSv7rTwRNg1GoaBCgOxD3xLixDK2RA5unb/f7qLLHzmTzn2ZUDxouA/1E3WogAuatPnXku8a2ObAMO4IGcjjZMYSElq/O4laT7eB+6Irp+RKJcckb+JNRj8BasjEH0WgasNVyCm1Rsiqsk36/DpDNGqIz8DOarIzhPm/PyniRo/x7nu03TIgVNJ9hkbWiIf1GJ9ttYL+G76fY9DzLWsA1vQUDCUBeLu9hRE/G3BV9SOTh9dFAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBQlqVgxuikmWGiUYeb1N+/HPJfgrDAdBgNVHQ4EFgQUJalYMbopJlholGHm9TfvxzyX4KwwDQYJKoZIhvcNAQELBQADggEBACpbS6CbSpnQoNEXl55LIk6e5cHWm/RTKnkXvcuFRPE0mWbb4BcVdlNbCaWEpIv/vsi2/QpbQzmsKIE6AUsQL04t8IJ0iJw8WLiZ+wo5bcDu4id+xB0NqxQVJcLCgyTYWSZaLZOTKeN/vwM6CgY4Clm7QfoczCPPYdTNpTf0O8T1ot5RDkCcraoKEED9TODpJylVkq8oEk7f9HNpIHcBL3bb+iWMJ7Z5sDmvRXIoM+F86qGeww0C7tmMqjVeJihp7r0MSWI82xBXIEz7f/NGmrkA5Ot1G466SmO/0FJwwrjnd/1Es+TTT31c9C7YHHY4iC2hzqrR4xCQGQgwSX3hLuk=","attributes":{"enabled":true,"nbf":1619382225,"exp":1650918825,"created":1619382825,"updated":1619382825,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-supportstracing-/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1619382816,"updated":1619382816}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-supportstracing-/pending"}}, [
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
  'x-ms-client-request-id',
  '1ae80761-08ba-4959-a39b-47dadf16508e',
  'x-ms-request-id',
  '52b15b96-89f7-4ccc-885a-e6d1637c02bc',
  'x-ms-keyvault-service-version',
  '1.2.236.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=96.57.209.90;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Sun, 25 Apr 2021 20:33:46 GMT',
  'Content-Length',
  '2494'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/CRUDCertificateName-supportstracing-/')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-supportstracing-/822ff95017da4c99ac712e27ededa97f","kid":"https://keyvault_name.vault.azure.net/keys/CRUDCertificateName-supportstracing-/822ff95017da4c99ac712e27ededa97f","sid":"https://keyvault_name.vault.azure.net/secrets/CRUDCertificateName-supportstracing-/822ff95017da4c99ac712e27ededa97f","x5t":"IUB5ekKqybzZS87mW-gUT2sUgUQ","cer":"MIIDKDCCAhCgAwIBAgIQEEEbS3WgQ5SEXMYh/f9F0DANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjEwNDI1MjAyMzQ1WhcNMjIwNDI1MjAzMzQ1WjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQCvu73MOJpdn7dywAfescnT1Xc2byuYwXVK0GRgoQyfef/I33fiRNriHrNlaLOI8aIHvED3lO+69C/k/zlLSsODRs4rzs4w1PsHfPb8QSv7rTwRNg1GoaBCgOxD3xLixDK2RA5unb/f7qLLHzmTzn2ZUDxouA/1E3WogAuatPnXku8a2ObAMO4IGcjjZMYSElq/O4laT7eB+6Irp+RKJcckb+JNRj8BasjEH0WgasNVyCm1Rsiqsk36/DpDNGqIz8DOarIzhPm/PyniRo/x7nu03TIgVNJ9hkbWiIf1GJ9ttYL+G76fY9DzLWsA1vQUDCUBeLu9hRE/G3BV9SOTh9dFAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBQlqVgxuikmWGiUYeb1N+/HPJfgrDAdBgNVHQ4EFgQUJalYMbopJlholGHm9TfvxzyX4KwwDQYJKoZIhvcNAQELBQADggEBACpbS6CbSpnQoNEXl55LIk6e5cHWm/RTKnkXvcuFRPE0mWbb4BcVdlNbCaWEpIv/vsi2/QpbQzmsKIE6AUsQL04t8IJ0iJw8WLiZ+wo5bcDu4id+xB0NqxQVJcLCgyTYWSZaLZOTKeN/vwM6CgY4Clm7QfoczCPPYdTNpTf0O8T1ot5RDkCcraoKEED9TODpJylVkq8oEk7f9HNpIHcBL3bb+iWMJ7Z5sDmvRXIoM+F86qGeww0C7tmMqjVeJihp7r0MSWI82xBXIEz7f/NGmrkA5Ot1G466SmO/0FJwwrjnd/1Es+TTT31c9C7YHHY4iC2hzqrR4xCQGQgwSX3hLuk=","attributes":{"enabled":true,"nbf":1619382225,"exp":1650918825,"created":1619382825,"updated":1619382825,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-supportstracing-/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1619382816,"updated":1619382816}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-supportstracing-/pending"}}, [
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
  'x-ms-client-request-id',
  '0b80512a-b469-4923-a18c-d9dada0899e4',
  'x-ms-request-id',
  '80c73ff3-b1f6-4e84-b39a-4bf77d92d07b',
  'x-ms-keyvault-service-version',
  '1.2.236.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=96.57.209.90;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Sun, 25 Apr 2021 20:33:47 GMT',
  'Content-Length',
  '2494'
]);

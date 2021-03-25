let nock = require('nock');

module.exports.hash = "e1928287e036a1bc4ad1a7f0003dc5a1";

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
  'ce730409-9a1d-4604-b9cd-4df6275b8b96',
  'x-ms-request-id',
  '051d2242-7368-4d36-b078-982b1c997ac9',
  'x-ms-keyvault-service-version',
  '1.2.205.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Mar 2021 01:15:08 GMT'
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
  'de53d53d-0e69-4a46-a3f7-2f6789978701',
  'x-ms-ests-server',
  '2.1.11562.10 - WUS2 ProdSlices',
  'Set-Cookie',
  'fpc=AoMHZXCVd09Kr2FSLIjfY0mXyNCaAQAAAB3b7dcOAAAA; expires=Sat, 24-Apr-2021 01:15:09 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 25 Mar 2021 01:15:09 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/certificates/CRUDCertificateName-supportstracing-/create', {"policy":{"key_props":{},"secret_props":{},"x509_props":{"subject":"cn=MyCert","sans":{}},"issuer":{"name":"Self"},"attributes":{}},"attributes":{}})
  .query(true)
  .reply(202, {"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-supportstracing-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA1whdltxu4sHuTEQ6by1qezhzM8ZY3Wa4Rs6P+QKoY67P5ezab0w4R1aQZg1iVG5dSI/d2bDHJuR9O1uYRk4StRGiAG0eijEq18Qa9YCTMDd/8VcGQsxWPq/WogHif2I8yYJsOURqSfBtM4D8msI1K+6hI9cCXbv1N7qvO38dAHba687m0nmoD+GmPJnfleVjPz16PYId3aEJPm9NnPf3Rgebj28Y0SuwmtFpFMWHPIMOevDmnB3BGchSrV1LQn+l5lx5qcS+wYZYE3zgFKg8M/uyRouItl5Vac32HzQpBcsPPmpzOKGvX06jnAkLMXZVpV4bzF+vme/e0j7KS0KiYQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAExEmvTP6pNNwGUy+RH3wuJB1f0+cbFqkkeEaOaeT6rpbgxlBwqpCyQnEdGiUfQxZ0aTo27CBznBdJ6j93IvKyaLKKGr2fpca8VgyLULHbI9mH7rtB7a82FvuIjw6BQJvkKcjc3AFiFGIU61lTgSMfG1RYlsRLg+Og0RuGc2wjHqRgXTgNqJtAWptTEBKewwkJ3mZ5ZSthp6VkqWVcsohu9DAUHGYqb0X1cdLngXuYkYdBLEqEvWSvD3W+FFWlZz3K5t6P6qkEUkkJno/mRbLWLtNz1KAzQYblabTUubuGRomb02y200r73MlKoagC8meGxvoLuEzHxq46UBzN82Bgg=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"5162be26884b4e128c3952a5d1a7c4da"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-supportstracing-/pending?api-version=7.2&request_id=5162be26884b4e128c3952a5d1a7c4da',
  'Retry-After',
  '10',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  'ce730409-9a1d-4604-b9cd-4df6275b8b96',
  'x-ms-request-id',
  '2d3bf646-0991-4499-b522-fe482b988925',
  'x-ms-keyvault-service-version',
  '1.2.205.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Mar 2021 01:15:10 GMT',
  'Content-Length',
  '1318'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/CRUDCertificateName-supportstracing-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-supportstracing-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA1whdltxu4sHuTEQ6by1qezhzM8ZY3Wa4Rs6P+QKoY67P5ezab0w4R1aQZg1iVG5dSI/d2bDHJuR9O1uYRk4StRGiAG0eijEq18Qa9YCTMDd/8VcGQsxWPq/WogHif2I8yYJsOURqSfBtM4D8msI1K+6hI9cCXbv1N7qvO38dAHba687m0nmoD+GmPJnfleVjPz16PYId3aEJPm9NnPf3Rgebj28Y0SuwmtFpFMWHPIMOevDmnB3BGchSrV1LQn+l5lx5qcS+wYZYE3zgFKg8M/uyRouItl5Vac32HzQpBcsPPmpzOKGvX06jnAkLMXZVpV4bzF+vme/e0j7KS0KiYQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAExEmvTP6pNNwGUy+RH3wuJB1f0+cbFqkkeEaOaeT6rpbgxlBwqpCyQnEdGiUfQxZ0aTo27CBznBdJ6j93IvKyaLKKGr2fpca8VgyLULHbI9mH7rtB7a82FvuIjw6BQJvkKcjc3AFiFGIU61lTgSMfG1RYlsRLg+Og0RuGc2wjHqRgXTgNqJtAWptTEBKewwkJ3mZ5ZSthp6VkqWVcsohu9DAUHGYqb0X1cdLngXuYkYdBLEqEvWSvD3W+FFWlZz3K5t6P6qkEUkkJno/mRbLWLtNz1KAzQYblabTUubuGRomb02y200r73MlKoagC8meGxvoLuEzHxq46UBzN82Bgg=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"5162be26884b4e128c3952a5d1a7c4da"}, [
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
  'f3dd9d1c-fb92-4b40-a7cd-887ae8ae6f09',
  'x-ms-request-id',
  'ba0d3ffa-5f28-4da5-9e50-20332afe45c9',
  'x-ms-keyvault-service-version',
  '1.2.205.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Mar 2021 01:15:10 GMT',
  'Content-Length',
  '1318'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/CRUDCertificateName-supportstracing-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-supportstracing-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA1whdltxu4sHuTEQ6by1qezhzM8ZY3Wa4Rs6P+QKoY67P5ezab0w4R1aQZg1iVG5dSI/d2bDHJuR9O1uYRk4StRGiAG0eijEq18Qa9YCTMDd/8VcGQsxWPq/WogHif2I8yYJsOURqSfBtM4D8msI1K+6hI9cCXbv1N7qvO38dAHba687m0nmoD+GmPJnfleVjPz16PYId3aEJPm9NnPf3Rgebj28Y0SuwmtFpFMWHPIMOevDmnB3BGchSrV1LQn+l5lx5qcS+wYZYE3zgFKg8M/uyRouItl5Vac32HzQpBcsPPmpzOKGvX06jnAkLMXZVpV4bzF+vme/e0j7KS0KiYQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAExEmvTP6pNNwGUy+RH3wuJB1f0+cbFqkkeEaOaeT6rpbgxlBwqpCyQnEdGiUfQxZ0aTo27CBznBdJ6j93IvKyaLKKGr2fpca8VgyLULHbI9mH7rtB7a82FvuIjw6BQJvkKcjc3AFiFGIU61lTgSMfG1RYlsRLg+Og0RuGc2wjHqRgXTgNqJtAWptTEBKewwkJ3mZ5ZSthp6VkqWVcsohu9DAUHGYqb0X1cdLngXuYkYdBLEqEvWSvD3W+FFWlZz3K5t6P6qkEUkkJno/mRbLWLtNz1KAzQYblabTUubuGRomb02y200r73MlKoagC8meGxvoLuEzHxq46UBzN82Bgg=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"5162be26884b4e128c3952a5d1a7c4da"}, [
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
  '9bb96745-9629-4692-846e-6f75989ad08c',
  'x-ms-request-id',
  '79dac00a-ad53-46aa-8694-ba62c4f18384',
  'x-ms-keyvault-service-version',
  '1.2.205.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Mar 2021 01:15:10 GMT',
  'Content-Length',
  '1318'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/CRUDCertificateName-supportstracing-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-supportstracing-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA1whdltxu4sHuTEQ6by1qezhzM8ZY3Wa4Rs6P+QKoY67P5ezab0w4R1aQZg1iVG5dSI/d2bDHJuR9O1uYRk4StRGiAG0eijEq18Qa9YCTMDd/8VcGQsxWPq/WogHif2I8yYJsOURqSfBtM4D8msI1K+6hI9cCXbv1N7qvO38dAHba687m0nmoD+GmPJnfleVjPz16PYId3aEJPm9NnPf3Rgebj28Y0SuwmtFpFMWHPIMOevDmnB3BGchSrV1LQn+l5lx5qcS+wYZYE3zgFKg8M/uyRouItl5Vac32HzQpBcsPPmpzOKGvX06jnAkLMXZVpV4bzF+vme/e0j7KS0KiYQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAExEmvTP6pNNwGUy+RH3wuJB1f0+cbFqkkeEaOaeT6rpbgxlBwqpCyQnEdGiUfQxZ0aTo27CBznBdJ6j93IvKyaLKKGr2fpca8VgyLULHbI9mH7rtB7a82FvuIjw6BQJvkKcjc3AFiFGIU61lTgSMfG1RYlsRLg+Og0RuGc2wjHqRgXTgNqJtAWptTEBKewwkJ3mZ5ZSthp6VkqWVcsohu9DAUHGYqb0X1cdLngXuYkYdBLEqEvWSvD3W+FFWlZz3K5t6P6qkEUkkJno/mRbLWLtNz1KAzQYblabTUubuGRomb02y200r73MlKoagC8meGxvoLuEzHxq46UBzN82Bgg=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"5162be26884b4e128c3952a5d1a7c4da"}, [
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
  '497f2fa9-6bc7-4e3c-8f3e-385a4c994f57',
  'x-ms-request-id',
  '17d7e7f7-561b-4ff2-9cbe-f1e71cb96134',
  'x-ms-keyvault-service-version',
  '1.2.205.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Mar 2021 01:15:12 GMT',
  'Content-Length',
  '1318'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/CRUDCertificateName-supportstracing-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-supportstracing-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA1whdltxu4sHuTEQ6by1qezhzM8ZY3Wa4Rs6P+QKoY67P5ezab0w4R1aQZg1iVG5dSI/d2bDHJuR9O1uYRk4StRGiAG0eijEq18Qa9YCTMDd/8VcGQsxWPq/WogHif2I8yYJsOURqSfBtM4D8msI1K+6hI9cCXbv1N7qvO38dAHba687m0nmoD+GmPJnfleVjPz16PYId3aEJPm9NnPf3Rgebj28Y0SuwmtFpFMWHPIMOevDmnB3BGchSrV1LQn+l5lx5qcS+wYZYE3zgFKg8M/uyRouItl5Vac32HzQpBcsPPmpzOKGvX06jnAkLMXZVpV4bzF+vme/e0j7KS0KiYQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAExEmvTP6pNNwGUy+RH3wuJB1f0+cbFqkkeEaOaeT6rpbgxlBwqpCyQnEdGiUfQxZ0aTo27CBznBdJ6j93IvKyaLKKGr2fpca8VgyLULHbI9mH7rtB7a82FvuIjw6BQJvkKcjc3AFiFGIU61lTgSMfG1RYlsRLg+Og0RuGc2wjHqRgXTgNqJtAWptTEBKewwkJ3mZ5ZSthp6VkqWVcsohu9DAUHGYqb0X1cdLngXuYkYdBLEqEvWSvD3W+FFWlZz3K5t6P6qkEUkkJno/mRbLWLtNz1KAzQYblabTUubuGRomb02y200r73MlKoagC8meGxvoLuEzHxq46UBzN82Bgg=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"5162be26884b4e128c3952a5d1a7c4da"}, [
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
  'fdeb6fe4-413e-4aa6-a7d1-2b1a920c126f',
  'x-ms-request-id',
  '04ef5df0-48ba-4dc2-840e-975267f16efb',
  'x-ms-keyvault-service-version',
  '1.2.205.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Mar 2021 01:15:14 GMT',
  'Content-Length',
  '1318'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/CRUDCertificateName-supportstracing-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-supportstracing-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA1whdltxu4sHuTEQ6by1qezhzM8ZY3Wa4Rs6P+QKoY67P5ezab0w4R1aQZg1iVG5dSI/d2bDHJuR9O1uYRk4StRGiAG0eijEq18Qa9YCTMDd/8VcGQsxWPq/WogHif2I8yYJsOURqSfBtM4D8msI1K+6hI9cCXbv1N7qvO38dAHba687m0nmoD+GmPJnfleVjPz16PYId3aEJPm9NnPf3Rgebj28Y0SuwmtFpFMWHPIMOevDmnB3BGchSrV1LQn+l5lx5qcS+wYZYE3zgFKg8M/uyRouItl5Vac32HzQpBcsPPmpzOKGvX06jnAkLMXZVpV4bzF+vme/e0j7KS0KiYQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAExEmvTP6pNNwGUy+RH3wuJB1f0+cbFqkkeEaOaeT6rpbgxlBwqpCyQnEdGiUfQxZ0aTo27CBznBdJ6j93IvKyaLKKGr2fpca8VgyLULHbI9mH7rtB7a82FvuIjw6BQJvkKcjc3AFiFGIU61lTgSMfG1RYlsRLg+Og0RuGc2wjHqRgXTgNqJtAWptTEBKewwkJ3mZ5ZSthp6VkqWVcsohu9DAUHGYqb0X1cdLngXuYkYdBLEqEvWSvD3W+FFWlZz3K5t6P6qkEUkkJno/mRbLWLtNz1KAzQYblabTUubuGRomb02y200r73MlKoagC8meGxvoLuEzHxq46UBzN82Bgg=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"5162be26884b4e128c3952a5d1a7c4da"}, [
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
  'dbd78df1-3425-4c61-9dbd-4468d753ac86',
  'x-ms-request-id',
  'baf31542-5d6b-468b-9c00-4bb2fd1ff763',
  'x-ms-keyvault-service-version',
  '1.2.205.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Mar 2021 01:15:16 GMT',
  'Content-Length',
  '1318'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/CRUDCertificateName-supportstracing-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-supportstracing-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA1whdltxu4sHuTEQ6by1qezhzM8ZY3Wa4Rs6P+QKoY67P5ezab0w4R1aQZg1iVG5dSI/d2bDHJuR9O1uYRk4StRGiAG0eijEq18Qa9YCTMDd/8VcGQsxWPq/WogHif2I8yYJsOURqSfBtM4D8msI1K+6hI9cCXbv1N7qvO38dAHba687m0nmoD+GmPJnfleVjPz16PYId3aEJPm9NnPf3Rgebj28Y0SuwmtFpFMWHPIMOevDmnB3BGchSrV1LQn+l5lx5qcS+wYZYE3zgFKg8M/uyRouItl5Vac32HzQpBcsPPmpzOKGvX06jnAkLMXZVpV4bzF+vme/e0j7KS0KiYQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAExEmvTP6pNNwGUy+RH3wuJB1f0+cbFqkkeEaOaeT6rpbgxlBwqpCyQnEdGiUfQxZ0aTo27CBznBdJ6j93IvKyaLKKGr2fpca8VgyLULHbI9mH7rtB7a82FvuIjw6BQJvkKcjc3AFiFGIU61lTgSMfG1RYlsRLg+Og0RuGc2wjHqRgXTgNqJtAWptTEBKewwkJ3mZ5ZSthp6VkqWVcsohu9DAUHGYqb0X1cdLngXuYkYdBLEqEvWSvD3W+FFWlZz3K5t6P6qkEUkkJno/mRbLWLtNz1KAzQYblabTUubuGRomb02y200r73MlKoagC8meGxvoLuEzHxq46UBzN82Bgg=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"5162be26884b4e128c3952a5d1a7c4da"}, [
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
  'cec56168-8b2d-47ca-9dd6-cecf69a833d7',
  'x-ms-request-id',
  '8359a5bb-b015-48f6-940c-2823fbfc1cd2',
  'x-ms-keyvault-service-version',
  '1.2.205.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Mar 2021 01:15:18 GMT',
  'Content-Length',
  '1318'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/CRUDCertificateName-supportstracing-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-supportstracing-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA1whdltxu4sHuTEQ6by1qezhzM8ZY3Wa4Rs6P+QKoY67P5ezab0w4R1aQZg1iVG5dSI/d2bDHJuR9O1uYRk4StRGiAG0eijEq18Qa9YCTMDd/8VcGQsxWPq/WogHif2I8yYJsOURqSfBtM4D8msI1K+6hI9cCXbv1N7qvO38dAHba687m0nmoD+GmPJnfleVjPz16PYId3aEJPm9NnPf3Rgebj28Y0SuwmtFpFMWHPIMOevDmnB3BGchSrV1LQn+l5lx5qcS+wYZYE3zgFKg8M/uyRouItl5Vac32HzQpBcsPPmpzOKGvX06jnAkLMXZVpV4bzF+vme/e0j7KS0KiYQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAExEmvTP6pNNwGUy+RH3wuJB1f0+cbFqkkeEaOaeT6rpbgxlBwqpCyQnEdGiUfQxZ0aTo27CBznBdJ6j93IvKyaLKKGr2fpca8VgyLULHbI9mH7rtB7a82FvuIjw6BQJvkKcjc3AFiFGIU61lTgSMfG1RYlsRLg+Og0RuGc2wjHqRgXTgNqJtAWptTEBKewwkJ3mZ5ZSthp6VkqWVcsohu9DAUHGYqb0X1cdLngXuYkYdBLEqEvWSvD3W+FFWlZz3K5t6P6qkEUkkJno/mRbLWLtNz1KAzQYblabTUubuGRomb02y200r73MlKoagC8meGxvoLuEzHxq46UBzN82Bgg=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"5162be26884b4e128c3952a5d1a7c4da"}, [
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
  '58ad9076-598f-43d0-8728-049bf59ec912',
  'x-ms-request-id',
  '1a134659-1530-41a1-aa57-e47cc32d2d1b',
  'x-ms-keyvault-service-version',
  '1.2.205.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Mar 2021 01:15:20 GMT',
  'Content-Length',
  '1318'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/CRUDCertificateName-supportstracing-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-supportstracing-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA1whdltxu4sHuTEQ6by1qezhzM8ZY3Wa4Rs6P+QKoY67P5ezab0w4R1aQZg1iVG5dSI/d2bDHJuR9O1uYRk4StRGiAG0eijEq18Qa9YCTMDd/8VcGQsxWPq/WogHif2I8yYJsOURqSfBtM4D8msI1K+6hI9cCXbv1N7qvO38dAHba687m0nmoD+GmPJnfleVjPz16PYId3aEJPm9NnPf3Rgebj28Y0SuwmtFpFMWHPIMOevDmnB3BGchSrV1LQn+l5lx5qcS+wYZYE3zgFKg8M/uyRouItl5Vac32HzQpBcsPPmpzOKGvX06jnAkLMXZVpV4bzF+vme/e0j7KS0KiYQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAExEmvTP6pNNwGUy+RH3wuJB1f0+cbFqkkeEaOaeT6rpbgxlBwqpCyQnEdGiUfQxZ0aTo27CBznBdJ6j93IvKyaLKKGr2fpca8VgyLULHbI9mH7rtB7a82FvuIjw6BQJvkKcjc3AFiFGIU61lTgSMfG1RYlsRLg+Og0RuGc2wjHqRgXTgNqJtAWptTEBKewwkJ3mZ5ZSthp6VkqWVcsohu9DAUHGYqb0X1cdLngXuYkYdBLEqEvWSvD3W+FFWlZz3K5t6P6qkEUkkJno/mRbLWLtNz1KAzQYblabTUubuGRomb02y200r73MlKoagC8meGxvoLuEzHxq46UBzN82Bgg=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"5162be26884b4e128c3952a5d1a7c4da"}, [
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
  'c4b701fd-6c2a-442f-a3ea-452c5593a6b9',
  'x-ms-request-id',
  '62a14a07-d400-4418-b0ad-b56ef0ba31fa',
  'x-ms-keyvault-service-version',
  '1.2.205.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Mar 2021 01:15:22 GMT',
  'Content-Length',
  '1318'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/CRUDCertificateName-supportstracing-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-supportstracing-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA1whdltxu4sHuTEQ6by1qezhzM8ZY3Wa4Rs6P+QKoY67P5ezab0w4R1aQZg1iVG5dSI/d2bDHJuR9O1uYRk4StRGiAG0eijEq18Qa9YCTMDd/8VcGQsxWPq/WogHif2I8yYJsOURqSfBtM4D8msI1K+6hI9cCXbv1N7qvO38dAHba687m0nmoD+GmPJnfleVjPz16PYId3aEJPm9NnPf3Rgebj28Y0SuwmtFpFMWHPIMOevDmnB3BGchSrV1LQn+l5lx5qcS+wYZYE3zgFKg8M/uyRouItl5Vac32HzQpBcsPPmpzOKGvX06jnAkLMXZVpV4bzF+vme/e0j7KS0KiYQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAExEmvTP6pNNwGUy+RH3wuJB1f0+cbFqkkeEaOaeT6rpbgxlBwqpCyQnEdGiUfQxZ0aTo27CBznBdJ6j93IvKyaLKKGr2fpca8VgyLULHbI9mH7rtB7a82FvuIjw6BQJvkKcjc3AFiFGIU61lTgSMfG1RYlsRLg+Og0RuGc2wjHqRgXTgNqJtAWptTEBKewwkJ3mZ5ZSthp6VkqWVcsohu9DAUHGYqb0X1cdLngXuYkYdBLEqEvWSvD3W+FFWlZz3K5t6P6qkEUkkJno/mRbLWLtNz1KAzQYblabTUubuGRomb02y200r73MlKoagC8meGxvoLuEzHxq46UBzN82Bgg=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"5162be26884b4e128c3952a5d1a7c4da"}, [
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
  'ae6cd228-9dcb-4fdb-aeba-d4b92a45feeb',
  'x-ms-request-id',
  'a3b891c8-0fbc-4157-aa70-bfeb33433a34',
  'x-ms-keyvault-service-version',
  '1.2.205.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Mar 2021 01:15:24 GMT',
  'Content-Length',
  '1318'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/CRUDCertificateName-supportstracing-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-supportstracing-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA1whdltxu4sHuTEQ6by1qezhzM8ZY3Wa4Rs6P+QKoY67P5ezab0w4R1aQZg1iVG5dSI/d2bDHJuR9O1uYRk4StRGiAG0eijEq18Qa9YCTMDd/8VcGQsxWPq/WogHif2I8yYJsOURqSfBtM4D8msI1K+6hI9cCXbv1N7qvO38dAHba687m0nmoD+GmPJnfleVjPz16PYId3aEJPm9NnPf3Rgebj28Y0SuwmtFpFMWHPIMOevDmnB3BGchSrV1LQn+l5lx5qcS+wYZYE3zgFKg8M/uyRouItl5Vac32HzQpBcsPPmpzOKGvX06jnAkLMXZVpV4bzF+vme/e0j7KS0KiYQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAExEmvTP6pNNwGUy+RH3wuJB1f0+cbFqkkeEaOaeT6rpbgxlBwqpCyQnEdGiUfQxZ0aTo27CBznBdJ6j93IvKyaLKKGr2fpca8VgyLULHbI9mH7rtB7a82FvuIjw6BQJvkKcjc3AFiFGIU61lTgSMfG1RYlsRLg+Og0RuGc2wjHqRgXTgNqJtAWptTEBKewwkJ3mZ5ZSthp6VkqWVcsohu9DAUHGYqb0X1cdLngXuYkYdBLEqEvWSvD3W+FFWlZz3K5t6P6qkEUkkJno/mRbLWLtNz1KAzQYblabTUubuGRomb02y200r73MlKoagC8meGxvoLuEzHxq46UBzN82Bgg=","cancellation_requested":false,"status":"completed","target":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-supportstracing-","request_id":"5162be26884b4e128c3952a5d1a7c4da"}, [
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
  '20e084dc-42e5-4899-a9e7-1f688fcad47d',
  'x-ms-request-id',
  '41bb87e8-a31a-4aa9-946b-55826d1e19be',
  'x-ms-keyvault-service-version',
  '1.2.205.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Mar 2021 01:15:26 GMT',
  'Content-Length',
  '1263'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/CRUDCertificateName-supportstracing-/')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-supportstracing-/bcb77167773b4a408428dee21962e92a","kid":"https://keyvault_name.vault.azure.net/keys/CRUDCertificateName-supportstracing-/bcb77167773b4a408428dee21962e92a","sid":"https://keyvault_name.vault.azure.net/secrets/CRUDCertificateName-supportstracing-/bcb77167773b4a408428dee21962e92a","x5t":"wRXmURpiTbeYbE8hy_yzZntVqlM","cer":"MIIDKDCCAhCgAwIBAgIQUO1A65K2SliLvp4Oq08zSDANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjEwMzI1MDEwNTI2WhcNMjIwMzI1MDExNTI2WjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQDXCF2W3G7iwe5MRDpvLWp7OHMzxljdZrhGzo/5Aqhjrs/l7NpvTDhHVpBmDWJUbl1Ij93ZsMcm5H07W5hGThK1EaIAbR6KMSrXxBr1gJMwN3/xVwZCzFY+r9aiAeJ/YjzJgmw5RGpJ8G0zgPyawjUr7qEj1wJdu/U3uq87fx0AdtrrzubSeagP4aY8md+V5WM/PXo9gh3doQk+b02c9/dGB5uPbxjRK7Ca0WkUxYc8gw568OacHcEZyFKtXUtCf6XmXHmpxL7BhlgTfOAUqDwz+7JGi4i2XlVpzfYfNCkFyw8+anM4oa9fTqOcCQsxdlWlXhvMX6+Z797SPspLQqJhAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBQwlDlrk3WztotE+C7K9novXVFT3jAdBgNVHQ4EFgQUMJQ5a5N1s7aLRPguyvZ6L11RU94wDQYJKoZIhvcNAQELBQADggEBAHmcy7iNnzwsMwYh0jjtzKdwvFXtTRU9i5cRxUbf4kCl22WZ6lwBg05uCLuEmmozpQWdgKYLxn83VS59GOtrKkVumUSZiIqwjC92KVdjwT5yBRZlEBfv74i07gOl7YNtRcWLI+w/AjGYPK8THezzdZjW/S8CMd39HaZeDYLXQh+YjWvCww7xKNeFf1nHyhPx+ggthFyHlvTTt9tX56hdIyL9TWkAY4x+AoTPqBM8nnEjfOF8f0dHVIASpdT5CqO1VmAtUu1OiqI0RNNsavqTI/lvJjCbDFG38PPcF9tqh2IT/lcMDMIflcQjKHtd3yM09/sFKNvnllI9fU4F9S3r/NU=","attributes":{"enabled":true,"nbf":1616634326,"exp":1648170926,"created":1616634926,"updated":1616634926,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-supportstracing-/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1616634910,"updated":1616634910}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-supportstracing-/pending"}}, [
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
  'c8fd63cd-a280-4ff0-b545-3825ec68cd48',
  'x-ms-request-id',
  '6f34e377-a29a-4563-91b2-4a92a8525aec',
  'x-ms-keyvault-service-version',
  '1.2.205.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Mar 2021 01:15:26 GMT',
  'Content-Length',
  '2489'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/certificates/CRUDCertificateName-supportstracing-')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/CRUDCertificateName-supportstracing-","deletedDate":1616634927,"scheduledPurgeDate":1617239727,"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-supportstracing-/bcb77167773b4a408428dee21962e92a","kid":"https://keyvault_name.vault.azure.net/keys/CRUDCertificateName-supportstracing-/bcb77167773b4a408428dee21962e92a","sid":"https://keyvault_name.vault.azure.net/secrets/CRUDCertificateName-supportstracing-/bcb77167773b4a408428dee21962e92a","x5t":"wRXmURpiTbeYbE8hy_yzZntVqlM","cer":"MIIDKDCCAhCgAwIBAgIQUO1A65K2SliLvp4Oq08zSDANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjEwMzI1MDEwNTI2WhcNMjIwMzI1MDExNTI2WjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQDXCF2W3G7iwe5MRDpvLWp7OHMzxljdZrhGzo/5Aqhjrs/l7NpvTDhHVpBmDWJUbl1Ij93ZsMcm5H07W5hGThK1EaIAbR6KMSrXxBr1gJMwN3/xVwZCzFY+r9aiAeJ/YjzJgmw5RGpJ8G0zgPyawjUr7qEj1wJdu/U3uq87fx0AdtrrzubSeagP4aY8md+V5WM/PXo9gh3doQk+b02c9/dGB5uPbxjRK7Ca0WkUxYc8gw568OacHcEZyFKtXUtCf6XmXHmpxL7BhlgTfOAUqDwz+7JGi4i2XlVpzfYfNCkFyw8+anM4oa9fTqOcCQsxdlWlXhvMX6+Z797SPspLQqJhAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBQwlDlrk3WztotE+C7K9novXVFT3jAdBgNVHQ4EFgQUMJQ5a5N1s7aLRPguyvZ6L11RU94wDQYJKoZIhvcNAQELBQADggEBAHmcy7iNnzwsMwYh0jjtzKdwvFXtTRU9i5cRxUbf4kCl22WZ6lwBg05uCLuEmmozpQWdgKYLxn83VS59GOtrKkVumUSZiIqwjC92KVdjwT5yBRZlEBfv74i07gOl7YNtRcWLI+w/AjGYPK8THezzdZjW/S8CMd39HaZeDYLXQh+YjWvCww7xKNeFf1nHyhPx+ggthFyHlvTTt9tX56hdIyL9TWkAY4x+AoTPqBM8nnEjfOF8f0dHVIASpdT5CqO1VmAtUu1OiqI0RNNsavqTI/lvJjCbDFG38PPcF9tqh2IT/lcMDMIflcQjKHtd3yM09/sFKNvnllI9fU4F9S3r/NU=","attributes":{"enabled":true,"nbf":1616634326,"exp":1648170926,"created":1616634926,"updated":1616634926,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-supportstracing-/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1616634910,"updated":1616634910}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-supportstracing-/pending"}}, [
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
  'b7cfbc80-b4d1-44d5-8ad1-262a3a24ca36',
  'x-ms-request-id',
  '64b3bd3b-0bfe-47c5-a1d4-b1e873a8ce64',
  'x-ms-keyvault-service-version',
  '1.2.205.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Mar 2021 01:15:27 GMT',
  'Content-Length',
  '2667'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/CRUDCertificateName-supportstracing-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: CRUDCertificateName-supportstracing-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '136',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  '57603d22-d9e1-49ec-93d4-7293d7dce8e6',
  'x-ms-request-id',
  '499cc598-45b3-4594-8d74-dcdbebffb554',
  'x-ms-keyvault-service-version',
  '1.2.205.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Mar 2021 01:15:27 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/CRUDCertificateName-supportstracing-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: CRUDCertificateName-supportstracing-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '136',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  'f4d50de0-c0bb-4845-8040-ee8d1e931ab0',
  'x-ms-request-id',
  'd79fdd83-bd22-4429-9d12-06d454f955ad',
  'x-ms-keyvault-service-version',
  '1.2.205.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Mar 2021 01:15:27 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/CRUDCertificateName-supportstracing-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: CRUDCertificateName-supportstracing-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '136',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  '3cc152f3-69a9-47dd-94ad-1ab1974eb5c8',
  'x-ms-request-id',
  '0c8dd516-b3fd-4b6e-9526-fc3de03873c8',
  'x-ms-keyvault-service-version',
  '1.2.205.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Mar 2021 01:15:29 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/CRUDCertificateName-supportstracing-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: CRUDCertificateName-supportstracing-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '136',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  'e15c947e-0c85-4b35-9905-708b3702ebab',
  'x-ms-request-id',
  '84417eb4-fd4c-418c-8764-0ca5515ca3f3',
  'x-ms-keyvault-service-version',
  '1.2.205.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Mar 2021 01:15:31 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/CRUDCertificateName-supportstracing-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: CRUDCertificateName-supportstracing-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '136',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  'f9b1e74f-d3d3-4064-ae28-355a9e981ee9',
  'x-ms-request-id',
  '394ab314-3419-46a4-bbcb-cc5b9a03c41e',
  'x-ms-keyvault-service-version',
  '1.2.205.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Mar 2021 01:15:33 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/CRUDCertificateName-supportstracing-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: CRUDCertificateName-supportstracing-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '136',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  'b0f43c8b-a49a-4c9d-b1ce-aad282b5327f',
  'x-ms-request-id',
  'a5728b25-9edf-4416-9ad5-15a2af2263b1',
  'x-ms-keyvault-service-version',
  '1.2.205.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Mar 2021 01:15:34 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/CRUDCertificateName-supportstracing-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: CRUDCertificateName-supportstracing-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '136',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  '97d820ef-b503-4b04-88e4-eec5d92d9936',
  'x-ms-request-id',
  'ddc40e57-085e-4347-b8af-2909c19a27e0',
  'x-ms-keyvault-service-version',
  '1.2.205.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Mar 2021 01:15:36 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/CRUDCertificateName-supportstracing-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: CRUDCertificateName-supportstracing-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '136',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  '29098e4e-b2e5-4423-9fa4-78abe8a052ba',
  'x-ms-request-id',
  '3f10acbe-cd69-4a8a-b565-07d18b4f9422',
  'x-ms-keyvault-service-version',
  '1.2.205.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Mar 2021 01:15:38 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/CRUDCertificateName-supportstracing-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: CRUDCertificateName-supportstracing-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '136',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  'ec438e21-6ee3-4ff4-b8bc-825de947bfc5',
  'x-ms-request-id',
  '74240129-e334-4c9c-a869-28cce2960901',
  'x-ms-keyvault-service-version',
  '1.2.205.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Mar 2021 01:15:40 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/CRUDCertificateName-supportstracing-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: CRUDCertificateName-supportstracing-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '136',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  '966bdf79-a774-4fd0-8ad9-bf3b8084e2ab',
  'x-ms-request-id',
  'dd212eec-a14d-4c49-8906-f49cfd2d34ef',
  'x-ms-keyvault-service-version',
  '1.2.205.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Mar 2021 01:15:43 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/CRUDCertificateName-supportstracing-')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/CRUDCertificateName-supportstracing-","deletedDate":1616634927,"scheduledPurgeDate":1617239727,"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-supportstracing-/bcb77167773b4a408428dee21962e92a","kid":"https://keyvault_name.vault.azure.net/keys/CRUDCertificateName-supportstracing-/bcb77167773b4a408428dee21962e92a","sid":"https://keyvault_name.vault.azure.net/secrets/CRUDCertificateName-supportstracing-/bcb77167773b4a408428dee21962e92a","x5t":"wRXmURpiTbeYbE8hy_yzZntVqlM","cer":"MIIDKDCCAhCgAwIBAgIQUO1A65K2SliLvp4Oq08zSDANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjEwMzI1MDEwNTI2WhcNMjIwMzI1MDExNTI2WjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQDXCF2W3G7iwe5MRDpvLWp7OHMzxljdZrhGzo/5Aqhjrs/l7NpvTDhHVpBmDWJUbl1Ij93ZsMcm5H07W5hGThK1EaIAbR6KMSrXxBr1gJMwN3/xVwZCzFY+r9aiAeJ/YjzJgmw5RGpJ8G0zgPyawjUr7qEj1wJdu/U3uq87fx0AdtrrzubSeagP4aY8md+V5WM/PXo9gh3doQk+b02c9/dGB5uPbxjRK7Ca0WkUxYc8gw568OacHcEZyFKtXUtCf6XmXHmpxL7BhlgTfOAUqDwz+7JGi4i2XlVpzfYfNCkFyw8+anM4oa9fTqOcCQsxdlWlXhvMX6+Z797SPspLQqJhAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBQwlDlrk3WztotE+C7K9novXVFT3jAdBgNVHQ4EFgQUMJQ5a5N1s7aLRPguyvZ6L11RU94wDQYJKoZIhvcNAQELBQADggEBAHmcy7iNnzwsMwYh0jjtzKdwvFXtTRU9i5cRxUbf4kCl22WZ6lwBg05uCLuEmmozpQWdgKYLxn83VS59GOtrKkVumUSZiIqwjC92KVdjwT5yBRZlEBfv74i07gOl7YNtRcWLI+w/AjGYPK8THezzdZjW/S8CMd39HaZeDYLXQh+YjWvCww7xKNeFf1nHyhPx+ggthFyHlvTTt9tX56hdIyL9TWkAY4x+AoTPqBM8nnEjfOF8f0dHVIASpdT5CqO1VmAtUu1OiqI0RNNsavqTI/lvJjCbDFG38PPcF9tqh2IT/lcMDMIflcQjKHtd3yM09/sFKNvnllI9fU4F9S3r/NU=","attributes":{"enabled":true,"nbf":1616634326,"exp":1648170926,"created":1616634926,"updated":1616634926,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-supportstracing-/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1616634910,"updated":1616634910}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-supportstracing-/pending"}}, [
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
  '93edc452-628f-4bbf-84ba-eb0ae57d226d',
  'x-ms-request-id',
  'da8ce016-9d6b-402e-b516-b8adaac0c3e7',
  'x-ms-keyvault-service-version',
  '1.2.205.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Mar 2021 01:15:45 GMT',
  'Content-Length',
  '2667'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedcertificates/CRUDCertificateName-supportstracing-')
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
  'x-ms-client-request-id',
  '4bf63384-3942-4249-9021-0d08672b6a32',
  'x-ms-request-id',
  '2d8e8bd4-6340-4d6e-8749-0536c4926df3',
  'x-ms-keyvault-service-version',
  '1.2.205.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Mar 2021 01:15:46 GMT'
]);

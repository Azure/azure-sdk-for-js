let nock = require('nock');

module.exports.hash = "764d8feb2ec586a1fe8c3d051fdccea8";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/certificates/lroCreateCertificateName-canwaituntilacertificateiscreated-/create')
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
  'b0c1e434-a3db-4604-9f0a-bdc0b351b295',
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
  'Tue, 16 Feb 2021 19:03:27 GMT'
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
  '6fa85750-a30c-42d2-8239-ec253797fa00',
  'x-ms-ests-server',
  '2.1.11496.5 - NCUS ProdSlices',
  'Set-Cookie',
  'fpc=AufoSEQpIbxLjzJaYLa_pBMA4qsDDwAAAE0NvtcOAAAA; expires=Thu, 18-Mar-2021 19:03:28 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 16 Feb 2021 19:03:27 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/certificates/lroCreateCertificateName-canwaituntilacertificateiscreated-/create', {"policy":{"key_props":{},"secret_props":{},"x509_props":{"subject":"cn=MyCert","sans":{}},"issuer":{"name":"Self"},"attributes":{}},"attributes":{}})
  .query(true)
  .reply(202, {"id":"https://keyvault_name.vault.azure.net/certificates/lroCreateCertificateName-canwaituntilacertificateiscreated-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAtWkRaHLohF9M/wwRqavvUkKEqESKUtc3cvfEWyRkWlXRcCvaCJOlJjW9EvkwM+Pe0MCm7/VElIeKAMlCi0+DKTIVWsfD2xaAnaytcfEuD58tNSfeosYJrMeSEfXjxOINCYlm77/khQX+OUC/OGp8Dh2sTTzNfQVOv3Y9Dglk9Z8S1f2B+VyCUMP3b1sBByhMRzax3PI79uWDfEx5Z6I61pFcBfLsOpu/hdNChzQ3aou5m2Ex2GQ4pwqdpRyd0c/ipmfAgIyNXKkSmvylspT8Z8dd0RsCGgHb9oysb6xi0U24P/CViMNZ77sArfx8CNv2pOiK4xFzVqrPiyDDccb9xQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAGi170ECKSGjwcnVCq3W2uB3nA1Jfg4cGynNPuWy8GpgEKAA07ncIc5eSlOeVNP55jzt568YgOwPUjnXOJG6nCKeJKkUhZpFYBDLk1BWiT/am6wjtmKmcK30cI2pEEQeaAdlaoSqoDYk0GboGPwC+ofZJL3gFqtPMwV/Fsjk2jxE4kehcbkwsT6zYTDc+pXibBdcyR4fSXB36K/0J0EbPdUvp75K356SpqjbY3w7eigS1A7MIquvATeAtKTKlA7peHLy1thPoSz6ZjhwCj0FMRzmRaiWe60U0LpLiUwZPaP97B02qVh0w6GbnWEfaJbn1EmJJkxCN5owdpqZLKtPba0=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"45104c6d3d0a469cb6d33c3b6d7b7470"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://keyvault_name.vault.azure.net/certificates/lroCreateCertificateName-canwaituntilacertificateiscreated-/pending?api-version=7.2&request_id=45104c6d3d0a469cb6d33c3b6d7b7470',
  'Retry-After',
  '10',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  'b2da36a0-4bfa-4f86-8bf4-a804e7d07699',
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
  'Tue, 16 Feb 2021 19:03:27 GMT',
  'Content-Length',
  '1342'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroCreateCertificateName-canwaituntilacertificateiscreated-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroCreateCertificateName-canwaituntilacertificateiscreated-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAtWkRaHLohF9M/wwRqavvUkKEqESKUtc3cvfEWyRkWlXRcCvaCJOlJjW9EvkwM+Pe0MCm7/VElIeKAMlCi0+DKTIVWsfD2xaAnaytcfEuD58tNSfeosYJrMeSEfXjxOINCYlm77/khQX+OUC/OGp8Dh2sTTzNfQVOv3Y9Dglk9Z8S1f2B+VyCUMP3b1sBByhMRzax3PI79uWDfEx5Z6I61pFcBfLsOpu/hdNChzQ3aou5m2Ex2GQ4pwqdpRyd0c/ipmfAgIyNXKkSmvylspT8Z8dd0RsCGgHb9oysb6xi0U24P/CViMNZ77sArfx8CNv2pOiK4xFzVqrPiyDDccb9xQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAGi170ECKSGjwcnVCq3W2uB3nA1Jfg4cGynNPuWy8GpgEKAA07ncIc5eSlOeVNP55jzt568YgOwPUjnXOJG6nCKeJKkUhZpFYBDLk1BWiT/am6wjtmKmcK30cI2pEEQeaAdlaoSqoDYk0GboGPwC+ofZJL3gFqtPMwV/Fsjk2jxE4kehcbkwsT6zYTDc+pXibBdcyR4fSXB36K/0J0EbPdUvp75K356SpqjbY3w7eigS1A7MIquvATeAtKTKlA7peHLy1thPoSz6ZjhwCj0FMRzmRaiWe60U0LpLiUwZPaP97B02qVh0w6GbnWEfaJbn1EmJJkxCN5owdpqZLKtPba0=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"45104c6d3d0a469cb6d33c3b6d7b7470"}, [
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
  'a4b4ba01-bd88-44c9-ac44-6bf95d133cb3',
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
  'Tue, 16 Feb 2021 19:03:28 GMT',
  'Content-Length',
  '1342'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroCreateCertificateName-canwaituntilacertificateiscreated-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroCreateCertificateName-canwaituntilacertificateiscreated-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAtWkRaHLohF9M/wwRqavvUkKEqESKUtc3cvfEWyRkWlXRcCvaCJOlJjW9EvkwM+Pe0MCm7/VElIeKAMlCi0+DKTIVWsfD2xaAnaytcfEuD58tNSfeosYJrMeSEfXjxOINCYlm77/khQX+OUC/OGp8Dh2sTTzNfQVOv3Y9Dglk9Z8S1f2B+VyCUMP3b1sBByhMRzax3PI79uWDfEx5Z6I61pFcBfLsOpu/hdNChzQ3aou5m2Ex2GQ4pwqdpRyd0c/ipmfAgIyNXKkSmvylspT8Z8dd0RsCGgHb9oysb6xi0U24P/CViMNZ77sArfx8CNv2pOiK4xFzVqrPiyDDccb9xQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAGi170ECKSGjwcnVCq3W2uB3nA1Jfg4cGynNPuWy8GpgEKAA07ncIc5eSlOeVNP55jzt568YgOwPUjnXOJG6nCKeJKkUhZpFYBDLk1BWiT/am6wjtmKmcK30cI2pEEQeaAdlaoSqoDYk0GboGPwC+ofZJL3gFqtPMwV/Fsjk2jxE4kehcbkwsT6zYTDc+pXibBdcyR4fSXB36K/0J0EbPdUvp75K356SpqjbY3w7eigS1A7MIquvATeAtKTKlA7peHLy1thPoSz6ZjhwCj0FMRzmRaiWe60U0LpLiUwZPaP97B02qVh0w6GbnWEfaJbn1EmJJkxCN5owdpqZLKtPba0=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"45104c6d3d0a469cb6d33c3b6d7b7470"}, [
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
  'ccd7744f-3cb4-4202-9781-5a549ec05520',
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
  'Tue, 16 Feb 2021 19:03:28 GMT',
  'Content-Length',
  '1342'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroCreateCertificateName-canwaituntilacertificateiscreated-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroCreateCertificateName-canwaituntilacertificateiscreated-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAtWkRaHLohF9M/wwRqavvUkKEqESKUtc3cvfEWyRkWlXRcCvaCJOlJjW9EvkwM+Pe0MCm7/VElIeKAMlCi0+DKTIVWsfD2xaAnaytcfEuD58tNSfeosYJrMeSEfXjxOINCYlm77/khQX+OUC/OGp8Dh2sTTzNfQVOv3Y9Dglk9Z8S1f2B+VyCUMP3b1sBByhMRzax3PI79uWDfEx5Z6I61pFcBfLsOpu/hdNChzQ3aou5m2Ex2GQ4pwqdpRyd0c/ipmfAgIyNXKkSmvylspT8Z8dd0RsCGgHb9oysb6xi0U24P/CViMNZ77sArfx8CNv2pOiK4xFzVqrPiyDDccb9xQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAGi170ECKSGjwcnVCq3W2uB3nA1Jfg4cGynNPuWy8GpgEKAA07ncIc5eSlOeVNP55jzt568YgOwPUjnXOJG6nCKeJKkUhZpFYBDLk1BWiT/am6wjtmKmcK30cI2pEEQeaAdlaoSqoDYk0GboGPwC+ofZJL3gFqtPMwV/Fsjk2jxE4kehcbkwsT6zYTDc+pXibBdcyR4fSXB36K/0J0EbPdUvp75K356SpqjbY3w7eigS1A7MIquvATeAtKTKlA7peHLy1thPoSz6ZjhwCj0FMRzmRaiWe60U0LpLiUwZPaP97B02qVh0w6GbnWEfaJbn1EmJJkxCN5owdpqZLKtPba0=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"45104c6d3d0a469cb6d33c3b6d7b7470"}, [
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
  '396db040-bca4-426e-8fd0-546a2af42455',
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
  'Tue, 16 Feb 2021 19:03:30 GMT',
  'Content-Length',
  '1342'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroCreateCertificateName-canwaituntilacertificateiscreated-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroCreateCertificateName-canwaituntilacertificateiscreated-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAtWkRaHLohF9M/wwRqavvUkKEqESKUtc3cvfEWyRkWlXRcCvaCJOlJjW9EvkwM+Pe0MCm7/VElIeKAMlCi0+DKTIVWsfD2xaAnaytcfEuD58tNSfeosYJrMeSEfXjxOINCYlm77/khQX+OUC/OGp8Dh2sTTzNfQVOv3Y9Dglk9Z8S1f2B+VyCUMP3b1sBByhMRzax3PI79uWDfEx5Z6I61pFcBfLsOpu/hdNChzQ3aou5m2Ex2GQ4pwqdpRyd0c/ipmfAgIyNXKkSmvylspT8Z8dd0RsCGgHb9oysb6xi0U24P/CViMNZ77sArfx8CNv2pOiK4xFzVqrPiyDDccb9xQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAGi170ECKSGjwcnVCq3W2uB3nA1Jfg4cGynNPuWy8GpgEKAA07ncIc5eSlOeVNP55jzt568YgOwPUjnXOJG6nCKeJKkUhZpFYBDLk1BWiT/am6wjtmKmcK30cI2pEEQeaAdlaoSqoDYk0GboGPwC+ofZJL3gFqtPMwV/Fsjk2jxE4kehcbkwsT6zYTDc+pXibBdcyR4fSXB36K/0J0EbPdUvp75K356SpqjbY3w7eigS1A7MIquvATeAtKTKlA7peHLy1thPoSz6ZjhwCj0FMRzmRaiWe60U0LpLiUwZPaP97B02qVh0w6GbnWEfaJbn1EmJJkxCN5owdpqZLKtPba0=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"45104c6d3d0a469cb6d33c3b6d7b7470"}, [
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
  '7cf28824-25c8-4a05-b01e-7bcb68a255e7',
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
  'Tue, 16 Feb 2021 19:03:32 GMT',
  'Content-Length',
  '1342'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroCreateCertificateName-canwaituntilacertificateiscreated-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroCreateCertificateName-canwaituntilacertificateiscreated-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAtWkRaHLohF9M/wwRqavvUkKEqESKUtc3cvfEWyRkWlXRcCvaCJOlJjW9EvkwM+Pe0MCm7/VElIeKAMlCi0+DKTIVWsfD2xaAnaytcfEuD58tNSfeosYJrMeSEfXjxOINCYlm77/khQX+OUC/OGp8Dh2sTTzNfQVOv3Y9Dglk9Z8S1f2B+VyCUMP3b1sBByhMRzax3PI79uWDfEx5Z6I61pFcBfLsOpu/hdNChzQ3aou5m2Ex2GQ4pwqdpRyd0c/ipmfAgIyNXKkSmvylspT8Z8dd0RsCGgHb9oysb6xi0U24P/CViMNZ77sArfx8CNv2pOiK4xFzVqrPiyDDccb9xQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAGi170ECKSGjwcnVCq3W2uB3nA1Jfg4cGynNPuWy8GpgEKAA07ncIc5eSlOeVNP55jzt568YgOwPUjnXOJG6nCKeJKkUhZpFYBDLk1BWiT/am6wjtmKmcK30cI2pEEQeaAdlaoSqoDYk0GboGPwC+ofZJL3gFqtPMwV/Fsjk2jxE4kehcbkwsT6zYTDc+pXibBdcyR4fSXB36K/0J0EbPdUvp75K356SpqjbY3w7eigS1A7MIquvATeAtKTKlA7peHLy1thPoSz6ZjhwCj0FMRzmRaiWe60U0LpLiUwZPaP97B02qVh0w6GbnWEfaJbn1EmJJkxCN5owdpqZLKtPba0=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"45104c6d3d0a469cb6d33c3b6d7b7470"}, [
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
  '8dd75287-132d-4bc9-905f-182615900994',
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
  'Tue, 16 Feb 2021 19:03:34 GMT',
  'Content-Length',
  '1342'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroCreateCertificateName-canwaituntilacertificateiscreated-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroCreateCertificateName-canwaituntilacertificateiscreated-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAtWkRaHLohF9M/wwRqavvUkKEqESKUtc3cvfEWyRkWlXRcCvaCJOlJjW9EvkwM+Pe0MCm7/VElIeKAMlCi0+DKTIVWsfD2xaAnaytcfEuD58tNSfeosYJrMeSEfXjxOINCYlm77/khQX+OUC/OGp8Dh2sTTzNfQVOv3Y9Dglk9Z8S1f2B+VyCUMP3b1sBByhMRzax3PI79uWDfEx5Z6I61pFcBfLsOpu/hdNChzQ3aou5m2Ex2GQ4pwqdpRyd0c/ipmfAgIyNXKkSmvylspT8Z8dd0RsCGgHb9oysb6xi0U24P/CViMNZ77sArfx8CNv2pOiK4xFzVqrPiyDDccb9xQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAGi170ECKSGjwcnVCq3W2uB3nA1Jfg4cGynNPuWy8GpgEKAA07ncIc5eSlOeVNP55jzt568YgOwPUjnXOJG6nCKeJKkUhZpFYBDLk1BWiT/am6wjtmKmcK30cI2pEEQeaAdlaoSqoDYk0GboGPwC+ofZJL3gFqtPMwV/Fsjk2jxE4kehcbkwsT6zYTDc+pXibBdcyR4fSXB36K/0J0EbPdUvp75K356SpqjbY3w7eigS1A7MIquvATeAtKTKlA7peHLy1thPoSz6ZjhwCj0FMRzmRaiWe60U0LpLiUwZPaP97B02qVh0w6GbnWEfaJbn1EmJJkxCN5owdpqZLKtPba0=","cancellation_requested":false,"status":"completed","target":"https://keyvault_name.vault.azure.net/certificates/lroCreateCertificateName-canwaituntilacertificateiscreated-","request_id":"45104c6d3d0a469cb6d33c3b6d7b7470"}, [
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
  '3aa3c79d-0106-4370-823d-375eb72de476',
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
  'Tue, 16 Feb 2021 19:03:36 GMT',
  'Content-Length',
  '1311'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroCreateCertificateName-canwaituntilacertificateiscreated-/')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroCreateCertificateName-canwaituntilacertificateiscreated-/39bb16ae1ca547a58cb5b533aec5462b","kid":"https://keyvault_name.vault.azure.net/keys/lroCreateCertificateName-canwaituntilacertificateiscreated-/39bb16ae1ca547a58cb5b533aec5462b","sid":"https://keyvault_name.vault.azure.net/secrets/lroCreateCertificateName-canwaituntilacertificateiscreated-/39bb16ae1ca547a58cb5b533aec5462b","x5t":"ey28ZvXVpgmqwnVxKCaNEBHUl2s","cer":"MIIDKDCCAhCgAwIBAgIQDvkVDKq3R0mR2U9uZU/MQDANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjEwMjE2MTg1MzM2WhcNMjIwMjE2MTkwMzM2WjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQC1aRFocuiEX0z/DBGpq+9SQoSoRIpS1zdy98RbJGRaVdFwK9oIk6UmNb0S+TAz497QwKbv9USUh4oAyUKLT4MpMhVax8PbFoCdrK1x8S4Pny01J96ixgmsx5IR9ePE4g0JiWbvv+SFBf45QL84anwOHaxNPM19BU6/dj0OCWT1nxLV/YH5XIJQw/dvWwEHKExHNrHc8jv25YN8THlnojrWkVwF8uw6m7+F00KHNDdqi7mbYTHYZDinCp2lHJ3Rz+KmZ8CAjI1cqRKa/KWylPxnx13RGwIaAdv2jKxvrGLRTbg/8JWIw1nvuwCt/HwI2/ak6IrjEXNWqs+LIMNxxv3FAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBR8SLCqYOOzfBvr/ShyAhB1dVMIlDAdBgNVHQ4EFgQUfEiwqmDjs3wb6/0ocgIQdXVTCJQwDQYJKoZIhvcNAQELBQADggEBAJDTBD+5McMKOMVfYs/1TiIy2cSdN5+Y2D4bgtQigekZkImCTUA7r5yty1OTpyS8gY/Z8IISZDsTEcNu5XkIvtkXV861mZGKtcV5bo1mO21/7pss/c26roJEbbVwRGuGLYW73s0pxkBbp++G1YeZ1lLj4OLnV09PZ6uUc867vZNJzqowLvnNkrGVDLiHAcEX8h5kHjyJtQdp7rIMC5UXVBd94RNo581gavpKohTDqSOB3LDGgPxaUXUlRcwBbsv2SBTqZN0FMa1SdxFps9BwNuYGwC+9tJ+ZCM0POSORD/UEa6cqc9lPpGdgRItUtIJZlAEWSCry+g11kke4IfzkiIs=","attributes":{"enabled":true,"nbf":1613501616,"exp":1645038216,"created":1613502216,"updated":1613502216,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/lroCreateCertificateName-canwaituntilacertificateiscreated-/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1613502208,"updated":1613502208}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/lroCreateCertificateName-canwaituntilacertificateiscreated-/pending"}}, [
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
  'd16a1c2b-353c-418c-987f-a84bdbcf0cb0',
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
  'Tue, 16 Feb 2021 19:03:36 GMT',
  'Content-Length',
  '2609'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/certificates/lroCreateCertificateName-canwaituntilacertificateiscreated-')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/lroCreateCertificateName-canwaituntilacertificateiscreated-","deletedDate":1613502217,"scheduledPurgeDate":1614107017,"id":"https://keyvault_name.vault.azure.net/certificates/lroCreateCertificateName-canwaituntilacertificateiscreated-/39bb16ae1ca547a58cb5b533aec5462b","kid":"https://keyvault_name.vault.azure.net/keys/lroCreateCertificateName-canwaituntilacertificateiscreated-/39bb16ae1ca547a58cb5b533aec5462b","sid":"https://keyvault_name.vault.azure.net/secrets/lroCreateCertificateName-canwaituntilacertificateiscreated-/39bb16ae1ca547a58cb5b533aec5462b","x5t":"ey28ZvXVpgmqwnVxKCaNEBHUl2s","cer":"MIIDKDCCAhCgAwIBAgIQDvkVDKq3R0mR2U9uZU/MQDANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjEwMjE2MTg1MzM2WhcNMjIwMjE2MTkwMzM2WjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQC1aRFocuiEX0z/DBGpq+9SQoSoRIpS1zdy98RbJGRaVdFwK9oIk6UmNb0S+TAz497QwKbv9USUh4oAyUKLT4MpMhVax8PbFoCdrK1x8S4Pny01J96ixgmsx5IR9ePE4g0JiWbvv+SFBf45QL84anwOHaxNPM19BU6/dj0OCWT1nxLV/YH5XIJQw/dvWwEHKExHNrHc8jv25YN8THlnojrWkVwF8uw6m7+F00KHNDdqi7mbYTHYZDinCp2lHJ3Rz+KmZ8CAjI1cqRKa/KWylPxnx13RGwIaAdv2jKxvrGLRTbg/8JWIw1nvuwCt/HwI2/ak6IrjEXNWqs+LIMNxxv3FAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBR8SLCqYOOzfBvr/ShyAhB1dVMIlDAdBgNVHQ4EFgQUfEiwqmDjs3wb6/0ocgIQdXVTCJQwDQYJKoZIhvcNAQELBQADggEBAJDTBD+5McMKOMVfYs/1TiIy2cSdN5+Y2D4bgtQigekZkImCTUA7r5yty1OTpyS8gY/Z8IISZDsTEcNu5XkIvtkXV861mZGKtcV5bo1mO21/7pss/c26roJEbbVwRGuGLYW73s0pxkBbp++G1YeZ1lLj4OLnV09PZ6uUc867vZNJzqowLvnNkrGVDLiHAcEX8h5kHjyJtQdp7rIMC5UXVBd94RNo581gavpKohTDqSOB3LDGgPxaUXUlRcwBbsv2SBTqZN0FMa1SdxFps9BwNuYGwC+9tJ+ZCM0POSORD/UEa6cqc9lPpGdgRItUtIJZlAEWSCry+g11kke4IfzkiIs=","attributes":{"enabled":true,"nbf":1613501616,"exp":1645038216,"created":1613502216,"updated":1613502216,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/lroCreateCertificateName-canwaituntilacertificateiscreated-/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1613502208,"updated":1613502208}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/lroCreateCertificateName-canwaituntilacertificateiscreated-/pending"}}, [
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
  'beed11f1-4b5b-44dd-b72c-e9631732dfa6',
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
  'Tue, 16 Feb 2021 19:03:36 GMT',
  'Content-Length',
  '2811'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroCreateCertificateName-canwaituntilacertificateiscreated-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroCreateCertificateName-canwaituntilacertificateiscreated-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '159',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  '7f75a572-68ef-4b22-a3de-9a53024b11c7',
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
  'Tue, 16 Feb 2021 19:03:36 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroCreateCertificateName-canwaituntilacertificateiscreated-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroCreateCertificateName-canwaituntilacertificateiscreated-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '159',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  '5336bd37-5b7d-4eef-a697-e6ebdbf54e81',
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
  'Tue, 16 Feb 2021 19:03:36 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroCreateCertificateName-canwaituntilacertificateiscreated-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroCreateCertificateName-canwaituntilacertificateiscreated-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '159',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  '7d7b4ae2-2261-42a7-9026-3cbddee34109',
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
  'Tue, 16 Feb 2021 19:03:38 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroCreateCertificateName-canwaituntilacertificateiscreated-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroCreateCertificateName-canwaituntilacertificateiscreated-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '159',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  'd9c18794-a3f8-4bc6-a6f4-23abce277cdd',
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
  'Tue, 16 Feb 2021 19:03:40 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroCreateCertificateName-canwaituntilacertificateiscreated-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroCreateCertificateName-canwaituntilacertificateiscreated-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '159',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  '700a5275-e101-4d9d-8bbf-6f0bc2899793',
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
  'Tue, 16 Feb 2021 19:03:43 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroCreateCertificateName-canwaituntilacertificateiscreated-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroCreateCertificateName-canwaituntilacertificateiscreated-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '159',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  '3b815de8-b7d3-4296-a9c0-92e5c2208eb6',
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
  'Tue, 16 Feb 2021 19:03:45 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroCreateCertificateName-canwaituntilacertificateiscreated-')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/lroCreateCertificateName-canwaituntilacertificateiscreated-","deletedDate":1613502217,"scheduledPurgeDate":1614107017,"id":"https://keyvault_name.vault.azure.net/certificates/lroCreateCertificateName-canwaituntilacertificateiscreated-/39bb16ae1ca547a58cb5b533aec5462b","kid":"https://keyvault_name.vault.azure.net/keys/lroCreateCertificateName-canwaituntilacertificateiscreated-/39bb16ae1ca547a58cb5b533aec5462b","sid":"https://keyvault_name.vault.azure.net/secrets/lroCreateCertificateName-canwaituntilacertificateiscreated-/39bb16ae1ca547a58cb5b533aec5462b","x5t":"ey28ZvXVpgmqwnVxKCaNEBHUl2s","cer":"MIIDKDCCAhCgAwIBAgIQDvkVDKq3R0mR2U9uZU/MQDANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjEwMjE2MTg1MzM2WhcNMjIwMjE2MTkwMzM2WjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQC1aRFocuiEX0z/DBGpq+9SQoSoRIpS1zdy98RbJGRaVdFwK9oIk6UmNb0S+TAz497QwKbv9USUh4oAyUKLT4MpMhVax8PbFoCdrK1x8S4Pny01J96ixgmsx5IR9ePE4g0JiWbvv+SFBf45QL84anwOHaxNPM19BU6/dj0OCWT1nxLV/YH5XIJQw/dvWwEHKExHNrHc8jv25YN8THlnojrWkVwF8uw6m7+F00KHNDdqi7mbYTHYZDinCp2lHJ3Rz+KmZ8CAjI1cqRKa/KWylPxnx13RGwIaAdv2jKxvrGLRTbg/8JWIw1nvuwCt/HwI2/ak6IrjEXNWqs+LIMNxxv3FAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBR8SLCqYOOzfBvr/ShyAhB1dVMIlDAdBgNVHQ4EFgQUfEiwqmDjs3wb6/0ocgIQdXVTCJQwDQYJKoZIhvcNAQELBQADggEBAJDTBD+5McMKOMVfYs/1TiIy2cSdN5+Y2D4bgtQigekZkImCTUA7r5yty1OTpyS8gY/Z8IISZDsTEcNu5XkIvtkXV861mZGKtcV5bo1mO21/7pss/c26roJEbbVwRGuGLYW73s0pxkBbp++G1YeZ1lLj4OLnV09PZ6uUc867vZNJzqowLvnNkrGVDLiHAcEX8h5kHjyJtQdp7rIMC5UXVBd94RNo581gavpKohTDqSOB3LDGgPxaUXUlRcwBbsv2SBTqZN0FMa1SdxFps9BwNuYGwC+9tJ+ZCM0POSORD/UEa6cqc9lPpGdgRItUtIJZlAEWSCry+g11kke4IfzkiIs=","attributes":{"enabled":true,"nbf":1613501616,"exp":1645038216,"created":1613502216,"updated":1613502216,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/lroCreateCertificateName-canwaituntilacertificateiscreated-/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1613502208,"updated":1613502208}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/lroCreateCertificateName-canwaituntilacertificateiscreated-/pending"}}, [
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
  '994d54b2-5a3d-463d-a79f-887cab857a5b',
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
  'Tue, 16 Feb 2021 19:03:47 GMT',
  'Content-Length',
  '2811'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedcertificates/lroCreateCertificateName-canwaituntilacertificateiscreated-')
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
  '3e80ba25-6aec-459d-81d8-1fcb87171522',
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
  'Tue, 16 Feb 2021 19:03:47 GMT'
]);

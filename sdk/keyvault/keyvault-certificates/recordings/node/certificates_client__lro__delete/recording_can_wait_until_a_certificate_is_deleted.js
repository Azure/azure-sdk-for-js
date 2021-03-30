let nock = require('nock');

module.exports.hash = "04659932ba97797359490e52b5d7c8ff";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/certificates/lroDeleteCertificateName-canwaituntilacertificateisdeleted-/create')
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
  'babe9e7f-5384-4bd3-9470-e5a65c8ed3cd',
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
  'Tue, 16 Feb 2021 19:04:07 GMT'
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
  '22e38c04-a5ec-4cb1-bc54-7662b2662f00',
  'x-ms-ests-server',
  '2.1.11496.6 - WUS2 ProdSlices',
  'Set-Cookie',
  'fpc=AufoSEQpIbxLjzJaYLa_pBMA4qsDEAAAAE0NvtcOAAAA; expires=Thu, 18-Mar-2021 19:04:08 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 16 Feb 2021 19:04:07 GMT',
  'Content-Length',
  '1315'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/certificates/lroDeleteCertificateName-canwaituntilacertificateisdeleted-/create', {"policy":{"key_props":{},"secret_props":{},"x509_props":{"subject":"cn=MyCert","sans":{}},"issuer":{"name":"Self"},"attributes":{}},"attributes":{}})
  .query(true)
  .reply(202, {"id":"https://keyvault_name.vault.azure.net/certificates/lroDeleteCertificateName-canwaituntilacertificateisdeleted-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA2e+4i3pYNS+9Hj49ZxOHt5QDuXAT7CZmDctS4yQUr0Fjh6a1mOnr6jBIGEC6xHt+JCKMdplDYaiOHfCidbvMUaEcx//DV83K7m/cN/sdxVPg9OBbm2JesEXYZXKyEVGDWD+IeHMK/ji3EfBYsVw5VKm6hn8TrR694+SEbcOoh4qoywPv8Fvqmrk4nDPBqU1otQMv9W277t6yfWspt7Srvun/FNn0ju2Yt1qjgdtGHJ7Wy1y2RFt5gC0g1njtJqh1RdPTjfSilhLrzW3FtEa76s9Q9qzSAVp7/1yJuwhTKQ2bzVan3K9CToDUj/earV2S97ZpkHpmNxXjgmBb3IyVrQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBANG0mtXr6PNTqHbibmWUs2ymHyzXD1OLbqF8JGcf6VEJ9nPZxDpyb+uPWIcwjkGygYEtVksP20ehp2oo9Lf614hORfj+bKXOch2hmpibkRgpu6OWNvLrQtO9vUgfjqaYkW6cZWer95dmqVC4c1DLRgQw21cETeclAmCCdIOhtc7htxWykI7FmHuW/oTzt1RPr4ezKzuUAGxjiY9kKxgtUSfbHKYhXqg2n7iYvNbxMhHnl1FVuprfB2DNp2Yci2X8WxP1UPT5zGAfjWrP+tT5yUiYCB5juzGdVmFabel+K+aUqxGPZ3qkZd4s+E32eDd5YIIt4M/MPK51ZatiPRiXtSM=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"7f2b37e818684159b942bfda3957662b"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://keyvault_name.vault.azure.net/certificates/lroDeleteCertificateName-canwaituntilacertificateisdeleted-/pending?api-version=7.2&request_id=7f2b37e818684159b942bfda3957662b',
  'Retry-After',
  '10',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  'c6e294c0-6b4f-4a67-b529-cb43ca92f258',
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
  'Tue, 16 Feb 2021 19:04:08 GMT',
  'Content-Length',
  '1343'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroDeleteCertificateName-canwaituntilacertificateisdeleted-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroDeleteCertificateName-canwaituntilacertificateisdeleted-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA2e+4i3pYNS+9Hj49ZxOHt5QDuXAT7CZmDctS4yQUr0Fjh6a1mOnr6jBIGEC6xHt+JCKMdplDYaiOHfCidbvMUaEcx//DV83K7m/cN/sdxVPg9OBbm2JesEXYZXKyEVGDWD+IeHMK/ji3EfBYsVw5VKm6hn8TrR694+SEbcOoh4qoywPv8Fvqmrk4nDPBqU1otQMv9W277t6yfWspt7Srvun/FNn0ju2Yt1qjgdtGHJ7Wy1y2RFt5gC0g1njtJqh1RdPTjfSilhLrzW3FtEa76s9Q9qzSAVp7/1yJuwhTKQ2bzVan3K9CToDUj/earV2S97ZpkHpmNxXjgmBb3IyVrQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBANG0mtXr6PNTqHbibmWUs2ymHyzXD1OLbqF8JGcf6VEJ9nPZxDpyb+uPWIcwjkGygYEtVksP20ehp2oo9Lf614hORfj+bKXOch2hmpibkRgpu6OWNvLrQtO9vUgfjqaYkW6cZWer95dmqVC4c1DLRgQw21cETeclAmCCdIOhtc7htxWykI7FmHuW/oTzt1RPr4ezKzuUAGxjiY9kKxgtUSfbHKYhXqg2n7iYvNbxMhHnl1FVuprfB2DNp2Yci2X8WxP1UPT5zGAfjWrP+tT5yUiYCB5juzGdVmFabel+K+aUqxGPZ3qkZd4s+E32eDd5YIIt4M/MPK51ZatiPRiXtSM=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"7f2b37e818684159b942bfda3957662b"}, [
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
  'e8fe62ef-3544-4fe5-bfae-98113fc8103a',
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
  'Tue, 16 Feb 2021 19:04:08 GMT',
  'Content-Length',
  '1343'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroDeleteCertificateName-canwaituntilacertificateisdeleted-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroDeleteCertificateName-canwaituntilacertificateisdeleted-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA2e+4i3pYNS+9Hj49ZxOHt5QDuXAT7CZmDctS4yQUr0Fjh6a1mOnr6jBIGEC6xHt+JCKMdplDYaiOHfCidbvMUaEcx//DV83K7m/cN/sdxVPg9OBbm2JesEXYZXKyEVGDWD+IeHMK/ji3EfBYsVw5VKm6hn8TrR694+SEbcOoh4qoywPv8Fvqmrk4nDPBqU1otQMv9W277t6yfWspt7Srvun/FNn0ju2Yt1qjgdtGHJ7Wy1y2RFt5gC0g1njtJqh1RdPTjfSilhLrzW3FtEa76s9Q9qzSAVp7/1yJuwhTKQ2bzVan3K9CToDUj/earV2S97ZpkHpmNxXjgmBb3IyVrQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBANG0mtXr6PNTqHbibmWUs2ymHyzXD1OLbqF8JGcf6VEJ9nPZxDpyb+uPWIcwjkGygYEtVksP20ehp2oo9Lf614hORfj+bKXOch2hmpibkRgpu6OWNvLrQtO9vUgfjqaYkW6cZWer95dmqVC4c1DLRgQw21cETeclAmCCdIOhtc7htxWykI7FmHuW/oTzt1RPr4ezKzuUAGxjiY9kKxgtUSfbHKYhXqg2n7iYvNbxMhHnl1FVuprfB2DNp2Yci2X8WxP1UPT5zGAfjWrP+tT5yUiYCB5juzGdVmFabel+K+aUqxGPZ3qkZd4s+E32eDd5YIIt4M/MPK51ZatiPRiXtSM=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"7f2b37e818684159b942bfda3957662b"}, [
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
  'a1bdbd0e-0d3a-47a9-9028-a191c2820e7b',
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
  'Tue, 16 Feb 2021 19:04:08 GMT',
  'Content-Length',
  '1343'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroDeleteCertificateName-canwaituntilacertificateisdeleted-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroDeleteCertificateName-canwaituntilacertificateisdeleted-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA2e+4i3pYNS+9Hj49ZxOHt5QDuXAT7CZmDctS4yQUr0Fjh6a1mOnr6jBIGEC6xHt+JCKMdplDYaiOHfCidbvMUaEcx//DV83K7m/cN/sdxVPg9OBbm2JesEXYZXKyEVGDWD+IeHMK/ji3EfBYsVw5VKm6hn8TrR694+SEbcOoh4qoywPv8Fvqmrk4nDPBqU1otQMv9W277t6yfWspt7Srvun/FNn0ju2Yt1qjgdtGHJ7Wy1y2RFt5gC0g1njtJqh1RdPTjfSilhLrzW3FtEa76s9Q9qzSAVp7/1yJuwhTKQ2bzVan3K9CToDUj/earV2S97ZpkHpmNxXjgmBb3IyVrQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBANG0mtXr6PNTqHbibmWUs2ymHyzXD1OLbqF8JGcf6VEJ9nPZxDpyb+uPWIcwjkGygYEtVksP20ehp2oo9Lf614hORfj+bKXOch2hmpibkRgpu6OWNvLrQtO9vUgfjqaYkW6cZWer95dmqVC4c1DLRgQw21cETeclAmCCdIOhtc7htxWykI7FmHuW/oTzt1RPr4ezKzuUAGxjiY9kKxgtUSfbHKYhXqg2n7iYvNbxMhHnl1FVuprfB2DNp2Yci2X8WxP1UPT5zGAfjWrP+tT5yUiYCB5juzGdVmFabel+K+aUqxGPZ3qkZd4s+E32eDd5YIIt4M/MPK51ZatiPRiXtSM=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"7f2b37e818684159b942bfda3957662b"}, [
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
  '3344f46b-7530-41d4-9c97-c4852a47548c',
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
  'Tue, 16 Feb 2021 19:04:11 GMT',
  'Content-Length',
  '1343'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroDeleteCertificateName-canwaituntilacertificateisdeleted-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroDeleteCertificateName-canwaituntilacertificateisdeleted-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA2e+4i3pYNS+9Hj49ZxOHt5QDuXAT7CZmDctS4yQUr0Fjh6a1mOnr6jBIGEC6xHt+JCKMdplDYaiOHfCidbvMUaEcx//DV83K7m/cN/sdxVPg9OBbm2JesEXYZXKyEVGDWD+IeHMK/ji3EfBYsVw5VKm6hn8TrR694+SEbcOoh4qoywPv8Fvqmrk4nDPBqU1otQMv9W277t6yfWspt7Srvun/FNn0ju2Yt1qjgdtGHJ7Wy1y2RFt5gC0g1njtJqh1RdPTjfSilhLrzW3FtEa76s9Q9qzSAVp7/1yJuwhTKQ2bzVan3K9CToDUj/earV2S97ZpkHpmNxXjgmBb3IyVrQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBANG0mtXr6PNTqHbibmWUs2ymHyzXD1OLbqF8JGcf6VEJ9nPZxDpyb+uPWIcwjkGygYEtVksP20ehp2oo9Lf614hORfj+bKXOch2hmpibkRgpu6OWNvLrQtO9vUgfjqaYkW6cZWer95dmqVC4c1DLRgQw21cETeclAmCCdIOhtc7htxWykI7FmHuW/oTzt1RPr4ezKzuUAGxjiY9kKxgtUSfbHKYhXqg2n7iYvNbxMhHnl1FVuprfB2DNp2Yci2X8WxP1UPT5zGAfjWrP+tT5yUiYCB5juzGdVmFabel+K+aUqxGPZ3qkZd4s+E32eDd5YIIt4M/MPK51ZatiPRiXtSM=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"7f2b37e818684159b942bfda3957662b"}, [
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
  '2afce755-b88d-4118-95ac-8664bc177566',
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
  'Tue, 16 Feb 2021 19:04:12 GMT',
  'Content-Length',
  '1343'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroDeleteCertificateName-canwaituntilacertificateisdeleted-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroDeleteCertificateName-canwaituntilacertificateisdeleted-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA2e+4i3pYNS+9Hj49ZxOHt5QDuXAT7CZmDctS4yQUr0Fjh6a1mOnr6jBIGEC6xHt+JCKMdplDYaiOHfCidbvMUaEcx//DV83K7m/cN/sdxVPg9OBbm2JesEXYZXKyEVGDWD+IeHMK/ji3EfBYsVw5VKm6hn8TrR694+SEbcOoh4qoywPv8Fvqmrk4nDPBqU1otQMv9W277t6yfWspt7Srvun/FNn0ju2Yt1qjgdtGHJ7Wy1y2RFt5gC0g1njtJqh1RdPTjfSilhLrzW3FtEa76s9Q9qzSAVp7/1yJuwhTKQ2bzVan3K9CToDUj/earV2S97ZpkHpmNxXjgmBb3IyVrQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBANG0mtXr6PNTqHbibmWUs2ymHyzXD1OLbqF8JGcf6VEJ9nPZxDpyb+uPWIcwjkGygYEtVksP20ehp2oo9Lf614hORfj+bKXOch2hmpibkRgpu6OWNvLrQtO9vUgfjqaYkW6cZWer95dmqVC4c1DLRgQw21cETeclAmCCdIOhtc7htxWykI7FmHuW/oTzt1RPr4ezKzuUAGxjiY9kKxgtUSfbHKYhXqg2n7iYvNbxMhHnl1FVuprfB2DNp2Yci2X8WxP1UPT5zGAfjWrP+tT5yUiYCB5juzGdVmFabel+K+aUqxGPZ3qkZd4s+E32eDd5YIIt4M/MPK51ZatiPRiXtSM=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"7f2b37e818684159b942bfda3957662b"}, [
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
  '17425647-27f8-41fd-bea8-fe2e3214afee',
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
  'Tue, 16 Feb 2021 19:04:15 GMT',
  'Content-Length',
  '1343'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroDeleteCertificateName-canwaituntilacertificateisdeleted-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroDeleteCertificateName-canwaituntilacertificateisdeleted-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA2e+4i3pYNS+9Hj49ZxOHt5QDuXAT7CZmDctS4yQUr0Fjh6a1mOnr6jBIGEC6xHt+JCKMdplDYaiOHfCidbvMUaEcx//DV83K7m/cN/sdxVPg9OBbm2JesEXYZXKyEVGDWD+IeHMK/ji3EfBYsVw5VKm6hn8TrR694+SEbcOoh4qoywPv8Fvqmrk4nDPBqU1otQMv9W277t6yfWspt7Srvun/FNn0ju2Yt1qjgdtGHJ7Wy1y2RFt5gC0g1njtJqh1RdPTjfSilhLrzW3FtEa76s9Q9qzSAVp7/1yJuwhTKQ2bzVan3K9CToDUj/earV2S97ZpkHpmNxXjgmBb3IyVrQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBANG0mtXr6PNTqHbibmWUs2ymHyzXD1OLbqF8JGcf6VEJ9nPZxDpyb+uPWIcwjkGygYEtVksP20ehp2oo9Lf614hORfj+bKXOch2hmpibkRgpu6OWNvLrQtO9vUgfjqaYkW6cZWer95dmqVC4c1DLRgQw21cETeclAmCCdIOhtc7htxWykI7FmHuW/oTzt1RPr4ezKzuUAGxjiY9kKxgtUSfbHKYhXqg2n7iYvNbxMhHnl1FVuprfB2DNp2Yci2X8WxP1UPT5zGAfjWrP+tT5yUiYCB5juzGdVmFabel+K+aUqxGPZ3qkZd4s+E32eDd5YIIt4M/MPK51ZatiPRiXtSM=","cancellation_requested":false,"status":"completed","target":"https://keyvault_name.vault.azure.net/certificates/lroDeleteCertificateName-canwaituntilacertificateisdeleted-","request_id":"7f2b37e818684159b942bfda3957662b"}, [
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
  'd4a5fb32-834c-434f-8224-696c121319a8',
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
  'Tue, 16 Feb 2021 19:04:16 GMT',
  'Content-Length',
  '1313'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroDeleteCertificateName-canwaituntilacertificateisdeleted-/')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroDeleteCertificateName-canwaituntilacertificateisdeleted-/3fed1d56663e4fcfa60f5ecaf2d51b26","kid":"https://keyvault_name.vault.azure.net/keys/lroDeleteCertificateName-canwaituntilacertificateisdeleted-/3fed1d56663e4fcfa60f5ecaf2d51b26","sid":"https://keyvault_name.vault.azure.net/secrets/lroDeleteCertificateName-canwaituntilacertificateisdeleted-/3fed1d56663e4fcfa60f5ecaf2d51b26","x5t":"oArW1sLLsD8jZJGbZEcVrL1aPoY","cer":"MIIDKDCCAhCgAwIBAgIQdQ6h3BCBTqeMG48tL6FSMDANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjEwMjE2MTg1NDE2WhcNMjIwMjE2MTkwNDE2WjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQDZ77iLelg1L70ePj1nE4e3lAO5cBPsJmYNy1LjJBSvQWOHprWY6evqMEgYQLrEe34kIox2mUNhqI4d8KJ1u8xRoRzH/8NXzcrub9w3+x3FU+D04FubYl6wRdhlcrIRUYNYP4h4cwr+OLcR8FixXDlUqbqGfxOtHr3j5IRtw6iHiqjLA+/wW+qauTicM8GpTWi1Ay/1bbvu3rJ9aym3tKu+6f8U2fSO7Zi3WqOB20YcntbLXLZEW3mALSDWeO0mqHVF09ON9KKWEuvNbcW0Rrvqz1D2rNIBWnv/XIm7CFMpDZvNVqfcr0JOgNSP95qtXZL3tmmQemY3FeOCYFvcjJWtAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBTF7h0FbJcvKPFS2OOAu8RixqQZIjAdBgNVHQ4EFgQUxe4dBWyXLyjxUtjjgLvEYsakGSIwDQYJKoZIhvcNAQELBQADggEBABmwsIUlxgxmNKbZnHivf+R5fdhuAiq2ysukD+pyyouEQjUuhPCErMbLG0d+wrslbOtgaBPxPs+JrCURe8i+bmCwzio2lU91RtOBq5sM67bFFQUCd42Zpc8+4dgT5D4RtGHv7QkRpiqoraqFZaHVfDHJrH0rwldMxdAOXjmcf/nL0YgD0jTxLUMsjrgaA/sofSdvwF/SG1wT6bxbhucyMnauez1tQsLrSBKeIqPR7aLhiAxhrAcJR0bGkJEVh3jXbMxMovigR83R6SKMNsyFYl4k0CzeRXrpGnDDOaHndnAn4rCe1/YPzE09HjVX2dErKTiev2JBw2+MS63JSpWL7/g=","attributes":{"enabled":true,"nbf":1613501656,"exp":1645038256,"created":1613502256,"updated":1613502256,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/lroDeleteCertificateName-canwaituntilacertificateisdeleted-/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1613502248,"updated":1613502248}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/lroDeleteCertificateName-canwaituntilacertificateisdeleted-/pending"}}, [
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
  'a2e97cb5-dbe8-4ee8-a01e-1d422efea732',
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
  'Tue, 16 Feb 2021 19:04:17 GMT',
  'Content-Length',
  '2614'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/certificates/lroDeleteCertificateName-canwaituntilacertificateisdeleted-')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/lroDeleteCertificateName-canwaituntilacertificateisdeleted-","deletedDate":1613502257,"scheduledPurgeDate":1614107057,"id":"https://keyvault_name.vault.azure.net/certificates/lroDeleteCertificateName-canwaituntilacertificateisdeleted-/3fed1d56663e4fcfa60f5ecaf2d51b26","kid":"https://keyvault_name.vault.azure.net/keys/lroDeleteCertificateName-canwaituntilacertificateisdeleted-/3fed1d56663e4fcfa60f5ecaf2d51b26","sid":"https://keyvault_name.vault.azure.net/secrets/lroDeleteCertificateName-canwaituntilacertificateisdeleted-/3fed1d56663e4fcfa60f5ecaf2d51b26","x5t":"oArW1sLLsD8jZJGbZEcVrL1aPoY","cer":"MIIDKDCCAhCgAwIBAgIQdQ6h3BCBTqeMG48tL6FSMDANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjEwMjE2MTg1NDE2WhcNMjIwMjE2MTkwNDE2WjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQDZ77iLelg1L70ePj1nE4e3lAO5cBPsJmYNy1LjJBSvQWOHprWY6evqMEgYQLrEe34kIox2mUNhqI4d8KJ1u8xRoRzH/8NXzcrub9w3+x3FU+D04FubYl6wRdhlcrIRUYNYP4h4cwr+OLcR8FixXDlUqbqGfxOtHr3j5IRtw6iHiqjLA+/wW+qauTicM8GpTWi1Ay/1bbvu3rJ9aym3tKu+6f8U2fSO7Zi3WqOB20YcntbLXLZEW3mALSDWeO0mqHVF09ON9KKWEuvNbcW0Rrvqz1D2rNIBWnv/XIm7CFMpDZvNVqfcr0JOgNSP95qtXZL3tmmQemY3FeOCYFvcjJWtAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBTF7h0FbJcvKPFS2OOAu8RixqQZIjAdBgNVHQ4EFgQUxe4dBWyXLyjxUtjjgLvEYsakGSIwDQYJKoZIhvcNAQELBQADggEBABmwsIUlxgxmNKbZnHivf+R5fdhuAiq2ysukD+pyyouEQjUuhPCErMbLG0d+wrslbOtgaBPxPs+JrCURe8i+bmCwzio2lU91RtOBq5sM67bFFQUCd42Zpc8+4dgT5D4RtGHv7QkRpiqoraqFZaHVfDHJrH0rwldMxdAOXjmcf/nL0YgD0jTxLUMsjrgaA/sofSdvwF/SG1wT6bxbhucyMnauez1tQsLrSBKeIqPR7aLhiAxhrAcJR0bGkJEVh3jXbMxMovigR83R6SKMNsyFYl4k0CzeRXrpGnDDOaHndnAn4rCe1/YPzE09HjVX2dErKTiev2JBw2+MS63JSpWL7/g=","attributes":{"enabled":true,"nbf":1613501656,"exp":1645038256,"created":1613502256,"updated":1613502256,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/lroDeleteCertificateName-canwaituntilacertificateisdeleted-/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1613502248,"updated":1613502248}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/lroDeleteCertificateName-canwaituntilacertificateisdeleted-/pending"}}, [
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
  'c4a5412c-d29f-483e-8165-b01d294a6718',
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
  'Tue, 16 Feb 2021 19:04:17 GMT',
  'Content-Length',
  '2817'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroDeleteCertificateName-canwaituntilacertificateisdeleted-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroDeleteCertificateName-canwaituntilacertificateisdeleted-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '160',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  '84b7adcb-6040-4d63-8eac-fe164de3bdbe',
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
  'Tue, 16 Feb 2021 19:04:17 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroDeleteCertificateName-canwaituntilacertificateisdeleted-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroDeleteCertificateName-canwaituntilacertificateisdeleted-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '160',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  'ac92b6bb-059a-4790-87a8-d86442e03c81',
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
  'Tue, 16 Feb 2021 19:04:17 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroDeleteCertificateName-canwaituntilacertificateisdeleted-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroDeleteCertificateName-canwaituntilacertificateisdeleted-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '160',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  '1a016622-191e-46e4-918e-165ed1a443a5',
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
  'Tue, 16 Feb 2021 19:04:19 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroDeleteCertificateName-canwaituntilacertificateisdeleted-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroDeleteCertificateName-canwaituntilacertificateisdeleted-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '160',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  '1066a4a9-ebfe-4372-ac16-5834b7e39927',
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
  'Tue, 16 Feb 2021 19:04:21 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroDeleteCertificateName-canwaituntilacertificateisdeleted-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroDeleteCertificateName-canwaituntilacertificateisdeleted-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '160',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  '008645f1-477f-4e81-8bb0-fe184c6323a0',
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
  'Tue, 16 Feb 2021 19:04:23 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroDeleteCertificateName-canwaituntilacertificateisdeleted-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroDeleteCertificateName-canwaituntilacertificateisdeleted-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '160',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  '9eb18a4a-7d75-4406-921e-2721e1971bc5',
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
  'Tue, 16 Feb 2021 19:04:24 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroDeleteCertificateName-canwaituntilacertificateisdeleted-')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/lroDeleteCertificateName-canwaituntilacertificateisdeleted-","deletedDate":1613502257,"scheduledPurgeDate":1614107057,"id":"https://keyvault_name.vault.azure.net/certificates/lroDeleteCertificateName-canwaituntilacertificateisdeleted-/3fed1d56663e4fcfa60f5ecaf2d51b26","kid":"https://keyvault_name.vault.azure.net/keys/lroDeleteCertificateName-canwaituntilacertificateisdeleted-/3fed1d56663e4fcfa60f5ecaf2d51b26","sid":"https://keyvault_name.vault.azure.net/secrets/lroDeleteCertificateName-canwaituntilacertificateisdeleted-/3fed1d56663e4fcfa60f5ecaf2d51b26","x5t":"oArW1sLLsD8jZJGbZEcVrL1aPoY","cer":"MIIDKDCCAhCgAwIBAgIQdQ6h3BCBTqeMG48tL6FSMDANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjEwMjE2MTg1NDE2WhcNMjIwMjE2MTkwNDE2WjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQDZ77iLelg1L70ePj1nE4e3lAO5cBPsJmYNy1LjJBSvQWOHprWY6evqMEgYQLrEe34kIox2mUNhqI4d8KJ1u8xRoRzH/8NXzcrub9w3+x3FU+D04FubYl6wRdhlcrIRUYNYP4h4cwr+OLcR8FixXDlUqbqGfxOtHr3j5IRtw6iHiqjLA+/wW+qauTicM8GpTWi1Ay/1bbvu3rJ9aym3tKu+6f8U2fSO7Zi3WqOB20YcntbLXLZEW3mALSDWeO0mqHVF09ON9KKWEuvNbcW0Rrvqz1D2rNIBWnv/XIm7CFMpDZvNVqfcr0JOgNSP95qtXZL3tmmQemY3FeOCYFvcjJWtAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBTF7h0FbJcvKPFS2OOAu8RixqQZIjAdBgNVHQ4EFgQUxe4dBWyXLyjxUtjjgLvEYsakGSIwDQYJKoZIhvcNAQELBQADggEBABmwsIUlxgxmNKbZnHivf+R5fdhuAiq2ysukD+pyyouEQjUuhPCErMbLG0d+wrslbOtgaBPxPs+JrCURe8i+bmCwzio2lU91RtOBq5sM67bFFQUCd42Zpc8+4dgT5D4RtGHv7QkRpiqoraqFZaHVfDHJrH0rwldMxdAOXjmcf/nL0YgD0jTxLUMsjrgaA/sofSdvwF/SG1wT6bxbhucyMnauez1tQsLrSBKeIqPR7aLhiAxhrAcJR0bGkJEVh3jXbMxMovigR83R6SKMNsyFYl4k0CzeRXrpGnDDOaHndnAn4rCe1/YPzE09HjVX2dErKTiev2JBw2+MS63JSpWL7/g=","attributes":{"enabled":true,"nbf":1613501656,"exp":1645038256,"created":1613502256,"updated":1613502256,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/lroDeleteCertificateName-canwaituntilacertificateisdeleted-/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1613502248,"updated":1613502248}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/lroDeleteCertificateName-canwaituntilacertificateisdeleted-/pending"}}, [
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
  'a9f5346e-7942-4f21-9131-474a4f4c4297',
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
  'Tue, 16 Feb 2021 19:04:26 GMT',
  'Content-Length',
  '2817'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroDeleteCertificateName-canwaituntilacertificateisdeleted-')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/lroDeleteCertificateName-canwaituntilacertificateisdeleted-","deletedDate":1613502257,"scheduledPurgeDate":1614107057,"id":"https://keyvault_name.vault.azure.net/certificates/lroDeleteCertificateName-canwaituntilacertificateisdeleted-/3fed1d56663e4fcfa60f5ecaf2d51b26","kid":"https://keyvault_name.vault.azure.net/keys/lroDeleteCertificateName-canwaituntilacertificateisdeleted-/3fed1d56663e4fcfa60f5ecaf2d51b26","sid":"https://keyvault_name.vault.azure.net/secrets/lroDeleteCertificateName-canwaituntilacertificateisdeleted-/3fed1d56663e4fcfa60f5ecaf2d51b26","x5t":"oArW1sLLsD8jZJGbZEcVrL1aPoY","cer":"MIIDKDCCAhCgAwIBAgIQdQ6h3BCBTqeMG48tL6FSMDANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjEwMjE2MTg1NDE2WhcNMjIwMjE2MTkwNDE2WjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQDZ77iLelg1L70ePj1nE4e3lAO5cBPsJmYNy1LjJBSvQWOHprWY6evqMEgYQLrEe34kIox2mUNhqI4d8KJ1u8xRoRzH/8NXzcrub9w3+x3FU+D04FubYl6wRdhlcrIRUYNYP4h4cwr+OLcR8FixXDlUqbqGfxOtHr3j5IRtw6iHiqjLA+/wW+qauTicM8GpTWi1Ay/1bbvu3rJ9aym3tKu+6f8U2fSO7Zi3WqOB20YcntbLXLZEW3mALSDWeO0mqHVF09ON9KKWEuvNbcW0Rrvqz1D2rNIBWnv/XIm7CFMpDZvNVqfcr0JOgNSP95qtXZL3tmmQemY3FeOCYFvcjJWtAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBTF7h0FbJcvKPFS2OOAu8RixqQZIjAdBgNVHQ4EFgQUxe4dBWyXLyjxUtjjgLvEYsakGSIwDQYJKoZIhvcNAQELBQADggEBABmwsIUlxgxmNKbZnHivf+R5fdhuAiq2ysukD+pyyouEQjUuhPCErMbLG0d+wrslbOtgaBPxPs+JrCURe8i+bmCwzio2lU91RtOBq5sM67bFFQUCd42Zpc8+4dgT5D4RtGHv7QkRpiqoraqFZaHVfDHJrH0rwldMxdAOXjmcf/nL0YgD0jTxLUMsjrgaA/sofSdvwF/SG1wT6bxbhucyMnauez1tQsLrSBKeIqPR7aLhiAxhrAcJR0bGkJEVh3jXbMxMovigR83R6SKMNsyFYl4k0CzeRXrpGnDDOaHndnAn4rCe1/YPzE09HjVX2dErKTiev2JBw2+MS63JSpWL7/g=","attributes":{"enabled":true,"nbf":1613501656,"exp":1645038256,"created":1613502256,"updated":1613502256,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/lroDeleteCertificateName-canwaituntilacertificateisdeleted-/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1613502248,"updated":1613502248}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/lroDeleteCertificateName-canwaituntilacertificateisdeleted-/pending"}}, [
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
  '957a5b6b-32c9-4e4c-ae48-bf934ccf973b',
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
  'Tue, 16 Feb 2021 19:04:27 GMT',
  'Content-Length',
  '2817'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedcertificates/lroDeleteCertificateName-canwaituntilacertificateisdeleted-')
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
  '53f2f3a4-8876-426f-b879-6c63787556b9',
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
  'Tue, 16 Feb 2021 19:04:27 GMT'
]);

let nock = require('nock');

module.exports.hash = "5e740563a9fce69a63d55081e18cab10";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/certificates/CRUDCertificateName-cangetacertificatessecretinPKCS12format-/create')
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
  '03cd9a0e-ca3d-4a30-ab63-0c6291fd6cd5',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 12:55:03 GMT'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fvault.azure.net%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":86399,"ext_expires_in":86399,"access_token":"access_token"}, [
  'Cache-Control',
  'no-cache, no-store',
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
  'x-ms-request-id',
  '7a872a93-6c7e-41e0-ba58-6b3a51b42101',
  'x-ms-ests-server',
  '2.1.10732.8 - NCUS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=Aupdq-im4O5AncQGk9EbXqM_aSJHAQAAAKeVhtYOAAAA; expires=Sat, 25-Jul-2020 12:55:04 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; SameSite=None; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; SameSite=None; secure; HttpOnly',
  'Date',
  'Thu, 25 Jun 2020 12:55:03 GMT',
  'Content-Length',
  '1315'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/certificates/CRUDCertificateName-cangetacertificatessecretinPKCS12format-/create', {"policy":{"key_props":{},"secret_props":{},"x509_props":{"subject":"cn=MyCert","sans":{}},"issuer":{"name":"Self"},"attributes":{}},"attributes":{}})
  .query(true)
  .reply(202, {"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-cangetacertificatessecretinPKCS12format-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA+6sNFoyHKAmnyEgddqSl1h++7z7g0PaWq3jb40L1plRhwdfhA985oDSOJc96b1gQk88ywjkcWs28beqSv226+1rOxi5X5Bkh4ckzIhVt3Cxfm7wIyCOEDplyeeypCwdwFksLUD+nWlkDQuhzDAAUb328EB8eqA4w8MVEC6m1Q4Yn5XSAjHcH7YRHITDu5k12yrqp+B7k69p/zh3nGqU6OtJaOroGXnTYqsCZDcIywBSe+GQyRmjnr7GopnYKT5EfGMRFlCtLjIG+EoHeqGG220Wxe+P6eLTpz8JkPxq7l4YMD6GvbWyMSwnDPC8WgCnnvuvEDJ+I1NcgAuvNnEuSAwIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAI683FQ3sycockMArZqUhSbm1WcL0aXGUPeIvzcr7XnoM9gpWazJanL4XXhBnrZCF+/T0ajlJ5oTvHOCGLQ4QzzADyCekzh/Szl8E1BDOjOlUvlSs5BkF2BlD1uNkcBqx8OQR0a37jLAnq5wWrSqOzR4YH+bGYyBUnB8l6GbT7OsDDOjx0T/ivLxYDUM5GzqomKy0qeRK6laAHglqFe5CdqDt8PSsOCi/sFsug/sLbPBW01chhlBEKCoxrx4Vu/0jgD7ANkUdm+N0iHCRxrzAZIQktcBj/1D4X413QB5ReDnW7MfDTjLuz+Gr7MYIAiSUObmaRunGN+bSnWo68obTfs=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"d37049dfb7ad47b28dedcc674fb79183"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-cangetacertificatessecretinPKCS12format-/pending?api-version=7.1-preview&request_id=d37049dfb7ad47b28dedcc674fb79183',
  'Retry-After',
  '10',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '02578ef8-126e-46bb-8b90-a4792c1c5bca',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 12:55:04 GMT',
  'Content-Length',
  '1353'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/CRUDCertificateName-cangetacertificatessecretinPKCS12format-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-cangetacertificatessecretinPKCS12format-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA+6sNFoyHKAmnyEgddqSl1h++7z7g0PaWq3jb40L1plRhwdfhA985oDSOJc96b1gQk88ywjkcWs28beqSv226+1rOxi5X5Bkh4ckzIhVt3Cxfm7wIyCOEDplyeeypCwdwFksLUD+nWlkDQuhzDAAUb328EB8eqA4w8MVEC6m1Q4Yn5XSAjHcH7YRHITDu5k12yrqp+B7k69p/zh3nGqU6OtJaOroGXnTYqsCZDcIywBSe+GQyRmjnr7GopnYKT5EfGMRFlCtLjIG+EoHeqGG220Wxe+P6eLTpz8JkPxq7l4YMD6GvbWyMSwnDPC8WgCnnvuvEDJ+I1NcgAuvNnEuSAwIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAI683FQ3sycockMArZqUhSbm1WcL0aXGUPeIvzcr7XnoM9gpWazJanL4XXhBnrZCF+/T0ajlJ5oTvHOCGLQ4QzzADyCekzh/Szl8E1BDOjOlUvlSs5BkF2BlD1uNkcBqx8OQR0a37jLAnq5wWrSqOzR4YH+bGYyBUnB8l6GbT7OsDDOjx0T/ivLxYDUM5GzqomKy0qeRK6laAHglqFe5CdqDt8PSsOCi/sFsug/sLbPBW01chhlBEKCoxrx4Vu/0jgD7ANkUdm+N0iHCRxrzAZIQktcBj/1D4X413QB5ReDnW7MfDTjLuz+Gr7MYIAiSUObmaRunGN+bSnWo68obTfs=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"d37049dfb7ad47b28dedcc674fb79183"}, [
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
  'e71b07a1-b3b8-4b0c-9a99-82b8bb55ea39',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 12:55:04 GMT',
  'Content-Length',
  '1353'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/CRUDCertificateName-cangetacertificatessecretinPKCS12format-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-cangetacertificatessecretinPKCS12format-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA+6sNFoyHKAmnyEgddqSl1h++7z7g0PaWq3jb40L1plRhwdfhA985oDSOJc96b1gQk88ywjkcWs28beqSv226+1rOxi5X5Bkh4ckzIhVt3Cxfm7wIyCOEDplyeeypCwdwFksLUD+nWlkDQuhzDAAUb328EB8eqA4w8MVEC6m1Q4Yn5XSAjHcH7YRHITDu5k12yrqp+B7k69p/zh3nGqU6OtJaOroGXnTYqsCZDcIywBSe+GQyRmjnr7GopnYKT5EfGMRFlCtLjIG+EoHeqGG220Wxe+P6eLTpz8JkPxq7l4YMD6GvbWyMSwnDPC8WgCnnvuvEDJ+I1NcgAuvNnEuSAwIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAI683FQ3sycockMArZqUhSbm1WcL0aXGUPeIvzcr7XnoM9gpWazJanL4XXhBnrZCF+/T0ajlJ5oTvHOCGLQ4QzzADyCekzh/Szl8E1BDOjOlUvlSs5BkF2BlD1uNkcBqx8OQR0a37jLAnq5wWrSqOzR4YH+bGYyBUnB8l6GbT7OsDDOjx0T/ivLxYDUM5GzqomKy0qeRK6laAHglqFe5CdqDt8PSsOCi/sFsug/sLbPBW01chhlBEKCoxrx4Vu/0jgD7ANkUdm+N0iHCRxrzAZIQktcBj/1D4X413QB5ReDnW7MfDTjLuz+Gr7MYIAiSUObmaRunGN+bSnWo68obTfs=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"d37049dfb7ad47b28dedcc674fb79183"}, [
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
  '818a430c-b4e0-4267-9084-38aa6a5c740b',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 12:55:04 GMT',
  'Content-Length',
  '1353'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/CRUDCertificateName-cangetacertificatessecretinPKCS12format-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-cangetacertificatessecretinPKCS12format-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA+6sNFoyHKAmnyEgddqSl1h++7z7g0PaWq3jb40L1plRhwdfhA985oDSOJc96b1gQk88ywjkcWs28beqSv226+1rOxi5X5Bkh4ckzIhVt3Cxfm7wIyCOEDplyeeypCwdwFksLUD+nWlkDQuhzDAAUb328EB8eqA4w8MVEC6m1Q4Yn5XSAjHcH7YRHITDu5k12yrqp+B7k69p/zh3nGqU6OtJaOroGXnTYqsCZDcIywBSe+GQyRmjnr7GopnYKT5EfGMRFlCtLjIG+EoHeqGG220Wxe+P6eLTpz8JkPxq7l4YMD6GvbWyMSwnDPC8WgCnnvuvEDJ+I1NcgAuvNnEuSAwIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAI683FQ3sycockMArZqUhSbm1WcL0aXGUPeIvzcr7XnoM9gpWazJanL4XXhBnrZCF+/T0ajlJ5oTvHOCGLQ4QzzADyCekzh/Szl8E1BDOjOlUvlSs5BkF2BlD1uNkcBqx8OQR0a37jLAnq5wWrSqOzR4YH+bGYyBUnB8l6GbT7OsDDOjx0T/ivLxYDUM5GzqomKy0qeRK6laAHglqFe5CdqDt8PSsOCi/sFsug/sLbPBW01chhlBEKCoxrx4Vu/0jgD7ANkUdm+N0iHCRxrzAZIQktcBj/1D4X413QB5ReDnW7MfDTjLuz+Gr7MYIAiSUObmaRunGN+bSnWo68obTfs=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"d37049dfb7ad47b28dedcc674fb79183"}, [
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
  'd95d9a83-8c60-4ca1-90c6-ababed467626',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 12:55:06 GMT',
  'Content-Length',
  '1353'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/CRUDCertificateName-cangetacertificatessecretinPKCS12format-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-cangetacertificatessecretinPKCS12format-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA+6sNFoyHKAmnyEgddqSl1h++7z7g0PaWq3jb40L1plRhwdfhA985oDSOJc96b1gQk88ywjkcWs28beqSv226+1rOxi5X5Bkh4ckzIhVt3Cxfm7wIyCOEDplyeeypCwdwFksLUD+nWlkDQuhzDAAUb328EB8eqA4w8MVEC6m1Q4Yn5XSAjHcH7YRHITDu5k12yrqp+B7k69p/zh3nGqU6OtJaOroGXnTYqsCZDcIywBSe+GQyRmjnr7GopnYKT5EfGMRFlCtLjIG+EoHeqGG220Wxe+P6eLTpz8JkPxq7l4YMD6GvbWyMSwnDPC8WgCnnvuvEDJ+I1NcgAuvNnEuSAwIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAI683FQ3sycockMArZqUhSbm1WcL0aXGUPeIvzcr7XnoM9gpWazJanL4XXhBnrZCF+/T0ajlJ5oTvHOCGLQ4QzzADyCekzh/Szl8E1BDOjOlUvlSs5BkF2BlD1uNkcBqx8OQR0a37jLAnq5wWrSqOzR4YH+bGYyBUnB8l6GbT7OsDDOjx0T/ivLxYDUM5GzqomKy0qeRK6laAHglqFe5CdqDt8PSsOCi/sFsug/sLbPBW01chhlBEKCoxrx4Vu/0jgD7ANkUdm+N0iHCRxrzAZIQktcBj/1D4X413QB5ReDnW7MfDTjLuz+Gr7MYIAiSUObmaRunGN+bSnWo68obTfs=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"d37049dfb7ad47b28dedcc674fb79183"}, [
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
  '5702178b-21c7-4f8a-a770-ca1aad5b998f',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 12:55:09 GMT',
  'Content-Length',
  '1353'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/CRUDCertificateName-cangetacertificatessecretinPKCS12format-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-cangetacertificatessecretinPKCS12format-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA+6sNFoyHKAmnyEgddqSl1h++7z7g0PaWq3jb40L1plRhwdfhA985oDSOJc96b1gQk88ywjkcWs28beqSv226+1rOxi5X5Bkh4ckzIhVt3Cxfm7wIyCOEDplyeeypCwdwFksLUD+nWlkDQuhzDAAUb328EB8eqA4w8MVEC6m1Q4Yn5XSAjHcH7YRHITDu5k12yrqp+B7k69p/zh3nGqU6OtJaOroGXnTYqsCZDcIywBSe+GQyRmjnr7GopnYKT5EfGMRFlCtLjIG+EoHeqGG220Wxe+P6eLTpz8JkPxq7l4YMD6GvbWyMSwnDPC8WgCnnvuvEDJ+I1NcgAuvNnEuSAwIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAI683FQ3sycockMArZqUhSbm1WcL0aXGUPeIvzcr7XnoM9gpWazJanL4XXhBnrZCF+/T0ajlJ5oTvHOCGLQ4QzzADyCekzh/Szl8E1BDOjOlUvlSs5BkF2BlD1uNkcBqx8OQR0a37jLAnq5wWrSqOzR4YH+bGYyBUnB8l6GbT7OsDDOjx0T/ivLxYDUM5GzqomKy0qeRK6laAHglqFe5CdqDt8PSsOCi/sFsug/sLbPBW01chhlBEKCoxrx4Vu/0jgD7ANkUdm+N0iHCRxrzAZIQktcBj/1D4X413QB5ReDnW7MfDTjLuz+Gr7MYIAiSUObmaRunGN+bSnWo68obTfs=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"d37049dfb7ad47b28dedcc674fb79183"}, [
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
  '6e9bbe92-eae4-40b4-a906-e4f30f07b35e',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 12:55:11 GMT',
  'Content-Length',
  '1353'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/CRUDCertificateName-cangetacertificatessecretinPKCS12format-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-cangetacertificatessecretinPKCS12format-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA+6sNFoyHKAmnyEgddqSl1h++7z7g0PaWq3jb40L1plRhwdfhA985oDSOJc96b1gQk88ywjkcWs28beqSv226+1rOxi5X5Bkh4ckzIhVt3Cxfm7wIyCOEDplyeeypCwdwFksLUD+nWlkDQuhzDAAUb328EB8eqA4w8MVEC6m1Q4Yn5XSAjHcH7YRHITDu5k12yrqp+B7k69p/zh3nGqU6OtJaOroGXnTYqsCZDcIywBSe+GQyRmjnr7GopnYKT5EfGMRFlCtLjIG+EoHeqGG220Wxe+P6eLTpz8JkPxq7l4YMD6GvbWyMSwnDPC8WgCnnvuvEDJ+I1NcgAuvNnEuSAwIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAI683FQ3sycockMArZqUhSbm1WcL0aXGUPeIvzcr7XnoM9gpWazJanL4XXhBnrZCF+/T0ajlJ5oTvHOCGLQ4QzzADyCekzh/Szl8E1BDOjOlUvlSs5BkF2BlD1uNkcBqx8OQR0a37jLAnq5wWrSqOzR4YH+bGYyBUnB8l6GbT7OsDDOjx0T/ivLxYDUM5GzqomKy0qeRK6laAHglqFe5CdqDt8PSsOCi/sFsug/sLbPBW01chhlBEKCoxrx4Vu/0jgD7ANkUdm+N0iHCRxrzAZIQktcBj/1D4X413QB5ReDnW7MfDTjLuz+Gr7MYIAiSUObmaRunGN+bSnWo68obTfs=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"d37049dfb7ad47b28dedcc674fb79183"}, [
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
  '5f6951a7-e67f-4077-96ae-6cf98c836950',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 12:55:12 GMT',
  'Content-Length',
  '1353'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/CRUDCertificateName-cangetacertificatessecretinPKCS12format-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-cangetacertificatessecretinPKCS12format-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA+6sNFoyHKAmnyEgddqSl1h++7z7g0PaWq3jb40L1plRhwdfhA985oDSOJc96b1gQk88ywjkcWs28beqSv226+1rOxi5X5Bkh4ckzIhVt3Cxfm7wIyCOEDplyeeypCwdwFksLUD+nWlkDQuhzDAAUb328EB8eqA4w8MVEC6m1Q4Yn5XSAjHcH7YRHITDu5k12yrqp+B7k69p/zh3nGqU6OtJaOroGXnTYqsCZDcIywBSe+GQyRmjnr7GopnYKT5EfGMRFlCtLjIG+EoHeqGG220Wxe+P6eLTpz8JkPxq7l4YMD6GvbWyMSwnDPC8WgCnnvuvEDJ+I1NcgAuvNnEuSAwIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAI683FQ3sycockMArZqUhSbm1WcL0aXGUPeIvzcr7XnoM9gpWazJanL4XXhBnrZCF+/T0ajlJ5oTvHOCGLQ4QzzADyCekzh/Szl8E1BDOjOlUvlSs5BkF2BlD1uNkcBqx8OQR0a37jLAnq5wWrSqOzR4YH+bGYyBUnB8l6GbT7OsDDOjx0T/ivLxYDUM5GzqomKy0qeRK6laAHglqFe5CdqDt8PSsOCi/sFsug/sLbPBW01chhlBEKCoxrx4Vu/0jgD7ANkUdm+N0iHCRxrzAZIQktcBj/1D4X413QB5ReDnW7MfDTjLuz+Gr7MYIAiSUObmaRunGN+bSnWo68obTfs=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"d37049dfb7ad47b28dedcc674fb79183"}, [
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
  '676053c6-3e5d-40a9-91d7-f5b6b9a23912',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 12:55:14 GMT',
  'Content-Length',
  '1353'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/CRUDCertificateName-cangetacertificatessecretinPKCS12format-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-cangetacertificatessecretinPKCS12format-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA+6sNFoyHKAmnyEgddqSl1h++7z7g0PaWq3jb40L1plRhwdfhA985oDSOJc96b1gQk88ywjkcWs28beqSv226+1rOxi5X5Bkh4ckzIhVt3Cxfm7wIyCOEDplyeeypCwdwFksLUD+nWlkDQuhzDAAUb328EB8eqA4w8MVEC6m1Q4Yn5XSAjHcH7YRHITDu5k12yrqp+B7k69p/zh3nGqU6OtJaOroGXnTYqsCZDcIywBSe+GQyRmjnr7GopnYKT5EfGMRFlCtLjIG+EoHeqGG220Wxe+P6eLTpz8JkPxq7l4YMD6GvbWyMSwnDPC8WgCnnvuvEDJ+I1NcgAuvNnEuSAwIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAI683FQ3sycockMArZqUhSbm1WcL0aXGUPeIvzcr7XnoM9gpWazJanL4XXhBnrZCF+/T0ajlJ5oTvHOCGLQ4QzzADyCekzh/Szl8E1BDOjOlUvlSs5BkF2BlD1uNkcBqx8OQR0a37jLAnq5wWrSqOzR4YH+bGYyBUnB8l6GbT7OsDDOjx0T/ivLxYDUM5GzqomKy0qeRK6laAHglqFe5CdqDt8PSsOCi/sFsug/sLbPBW01chhlBEKCoxrx4Vu/0jgD7ANkUdm+N0iHCRxrzAZIQktcBj/1D4X413QB5ReDnW7MfDTjLuz+Gr7MYIAiSUObmaRunGN+bSnWo68obTfs=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"d37049dfb7ad47b28dedcc674fb79183"}, [
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
  '8d161c2c-f3f3-4b60-bcec-b5d691f25135',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 12:55:16 GMT',
  'Content-Length',
  '1353'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/CRUDCertificateName-cangetacertificatessecretinPKCS12format-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-cangetacertificatessecretinPKCS12format-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA+6sNFoyHKAmnyEgddqSl1h++7z7g0PaWq3jb40L1plRhwdfhA985oDSOJc96b1gQk88ywjkcWs28beqSv226+1rOxi5X5Bkh4ckzIhVt3Cxfm7wIyCOEDplyeeypCwdwFksLUD+nWlkDQuhzDAAUb328EB8eqA4w8MVEC6m1Q4Yn5XSAjHcH7YRHITDu5k12yrqp+B7k69p/zh3nGqU6OtJaOroGXnTYqsCZDcIywBSe+GQyRmjnr7GopnYKT5EfGMRFlCtLjIG+EoHeqGG220Wxe+P6eLTpz8JkPxq7l4YMD6GvbWyMSwnDPC8WgCnnvuvEDJ+I1NcgAuvNnEuSAwIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAI683FQ3sycockMArZqUhSbm1WcL0aXGUPeIvzcr7XnoM9gpWazJanL4XXhBnrZCF+/T0ajlJ5oTvHOCGLQ4QzzADyCekzh/Szl8E1BDOjOlUvlSs5BkF2BlD1uNkcBqx8OQR0a37jLAnq5wWrSqOzR4YH+bGYyBUnB8l6GbT7OsDDOjx0T/ivLxYDUM5GzqomKy0qeRK6laAHglqFe5CdqDt8PSsOCi/sFsug/sLbPBW01chhlBEKCoxrx4Vu/0jgD7ANkUdm+N0iHCRxrzAZIQktcBj/1D4X413QB5ReDnW7MfDTjLuz+Gr7MYIAiSUObmaRunGN+bSnWo68obTfs=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"d37049dfb7ad47b28dedcc674fb79183"}, [
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
  'bbf66be8-365d-40a2-b0fc-04074a182558',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 12:55:18 GMT',
  'Content-Length',
  '1353'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/CRUDCertificateName-cangetacertificatessecretinPKCS12format-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-cangetacertificatessecretinPKCS12format-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA+6sNFoyHKAmnyEgddqSl1h++7z7g0PaWq3jb40L1plRhwdfhA985oDSOJc96b1gQk88ywjkcWs28beqSv226+1rOxi5X5Bkh4ckzIhVt3Cxfm7wIyCOEDplyeeypCwdwFksLUD+nWlkDQuhzDAAUb328EB8eqA4w8MVEC6m1Q4Yn5XSAjHcH7YRHITDu5k12yrqp+B7k69p/zh3nGqU6OtJaOroGXnTYqsCZDcIywBSe+GQyRmjnr7GopnYKT5EfGMRFlCtLjIG+EoHeqGG220Wxe+P6eLTpz8JkPxq7l4YMD6GvbWyMSwnDPC8WgCnnvuvEDJ+I1NcgAuvNnEuSAwIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAI683FQ3sycockMArZqUhSbm1WcL0aXGUPeIvzcr7XnoM9gpWazJanL4XXhBnrZCF+/T0ajlJ5oTvHOCGLQ4QzzADyCekzh/Szl8E1BDOjOlUvlSs5BkF2BlD1uNkcBqx8OQR0a37jLAnq5wWrSqOzR4YH+bGYyBUnB8l6GbT7OsDDOjx0T/ivLxYDUM5GzqomKy0qeRK6laAHglqFe5CdqDt8PSsOCi/sFsug/sLbPBW01chhlBEKCoxrx4Vu/0jgD7ANkUdm+N0iHCRxrzAZIQktcBj/1D4X413QB5ReDnW7MfDTjLuz+Gr7MYIAiSUObmaRunGN+bSnWo68obTfs=","cancellation_requested":false,"status":"completed","target":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-cangetacertificatessecretinPKCS12format-","request_id":"d37049dfb7ad47b28dedcc674fb79183"}, [
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
  '4f11728f-3cc6-4e50-b5a0-98f9d23539a3',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 12:55:20 GMT',
  'Content-Length',
  '1333'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/CRUDCertificateName-cangetacertificatessecretinPKCS12format-/')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-cangetacertificatessecretinPKCS12format-/0920dcd9e7d8422da4250637fd65bdfb","kid":"https://keyvault_name.vault.azure.net/keys/CRUDCertificateName-cangetacertificatessecretinPKCS12format-/0920dcd9e7d8422da4250637fd65bdfb","sid":"https://keyvault_name.vault.azure.net/secrets/CRUDCertificateName-cangetacertificatessecretinPKCS12format-/0920dcd9e7d8422da4250637fd65bdfb","x5t":"jaorG9fM3YA8rpnyqJy3LlNsvbU","cer":"MIIDKDCCAhCgAwIBAgIQAeGt3a+3QcmpzlrZGMHscjANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjAwNjI1MTI0NTE5WhcNMjEwNjI1MTI1NTE5WjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQD7qw0WjIcoCafISB12pKXWH77vPuDQ9pareNvjQvWmVGHB1+ED3zmgNI4lz3pvWBCTzzLCORxazbxt6pK/bbr7Ws7GLlfkGSHhyTMiFW3cLF+bvAjII4QOmXJ57KkLB3AWSwtQP6daWQNC6HMMABRvfbwQHx6oDjDwxUQLqbVDhifldICMdwfthEchMO7mTXbKuqn4HuTr2n/OHecapTo60lo6ugZedNiqwJkNwjLAFJ74ZDJGaOevsaimdgpPkR8YxEWUK0uMgb4Sgd6oYbbbRbF74/p4tOnPwmQ/GruXhgwPoa9tbIxLCcM8LxaAKee+68QMn4jU1yAC682cS5IDAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBS/M8uS+a9psMEatkMyjzMMG2gTFzAdBgNVHQ4EFgQUvzPLkvmvabDBGrZDMo8zDBtoExcwDQYJKoZIhvcNAQELBQADggEBAAUtkDK6Nl553m/eReg4fAzxF8B8I2wnujN2vgJ2WLJqh4PL1GZt/0KEwBud5eY8wUs8lWteXIcJmjnxl2P6Silc/F2IBZ9vGznvtAlxYHpi5dRk2dTJmSq0JUfyDFEk5J5ZFz2t9BYmANZCQW0egWg0bFairHrm1EAM/stPud0Gz+2+5qtfjtpF9hgznBp1IaDL0Q4PXgGnDrEi7PA+VhNlSOFNgSWuUfZjvbBRo81WN/NtEambEwkACNyc5J4MyKV+bd+9qkA0FmauSYtDLcsKQ5JHVAVKok9odc2k3JfX9wxHe2lWZpMs9/BYTVZkeKsz5Un5yhCeoh79B2EOpTg=","attributes":{"enabled":true,"nbf":1593089119,"exp":1624625719,"created":1593089719,"updated":1593089719,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-cangetacertificatessecretinPKCS12format-/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1593089704,"updated":1593089704}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-cangetacertificatessecretinPKCS12format-/pending"}}, [
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
  '1b708979-9d6b-438f-9aba-de2e550b98fb',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 12:55:20 GMT',
  'Content-Length',
  '2655'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/CRUDCertificateName-cangetacertificatessecretinPKCS12format-/')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-cangetacertificatessecretinPKCS12format-/0920dcd9e7d8422da4250637fd65bdfb","kid":"https://keyvault_name.vault.azure.net/keys/CRUDCertificateName-cangetacertificatessecretinPKCS12format-/0920dcd9e7d8422da4250637fd65bdfb","sid":"https://keyvault_name.vault.azure.net/secrets/CRUDCertificateName-cangetacertificatessecretinPKCS12format-/0920dcd9e7d8422da4250637fd65bdfb","x5t":"jaorG9fM3YA8rpnyqJy3LlNsvbU","cer":"MIIDKDCCAhCgAwIBAgIQAeGt3a+3QcmpzlrZGMHscjANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjAwNjI1MTI0NTE5WhcNMjEwNjI1MTI1NTE5WjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQD7qw0WjIcoCafISB12pKXWH77vPuDQ9pareNvjQvWmVGHB1+ED3zmgNI4lz3pvWBCTzzLCORxazbxt6pK/bbr7Ws7GLlfkGSHhyTMiFW3cLF+bvAjII4QOmXJ57KkLB3AWSwtQP6daWQNC6HMMABRvfbwQHx6oDjDwxUQLqbVDhifldICMdwfthEchMO7mTXbKuqn4HuTr2n/OHecapTo60lo6ugZedNiqwJkNwjLAFJ74ZDJGaOevsaimdgpPkR8YxEWUK0uMgb4Sgd6oYbbbRbF74/p4tOnPwmQ/GruXhgwPoa9tbIxLCcM8LxaAKee+68QMn4jU1yAC682cS5IDAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBS/M8uS+a9psMEatkMyjzMMG2gTFzAdBgNVHQ4EFgQUvzPLkvmvabDBGrZDMo8zDBtoExcwDQYJKoZIhvcNAQELBQADggEBAAUtkDK6Nl553m/eReg4fAzxF8B8I2wnujN2vgJ2WLJqh4PL1GZt/0KEwBud5eY8wUs8lWteXIcJmjnxl2P6Silc/F2IBZ9vGznvtAlxYHpi5dRk2dTJmSq0JUfyDFEk5J5ZFz2t9BYmANZCQW0egWg0bFairHrm1EAM/stPud0Gz+2+5qtfjtpF9hgznBp1IaDL0Q4PXgGnDrEi7PA+VhNlSOFNgSWuUfZjvbBRo81WN/NtEambEwkACNyc5J4MyKV+bd+9qkA0FmauSYtDLcsKQ5JHVAVKok9odc2k3JfX9wxHe2lWZpMs9/BYTVZkeKsz5Un5yhCeoh79B2EOpTg=","attributes":{"enabled":true,"nbf":1593089119,"exp":1624625719,"created":1593089719,"updated":1593089719,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-cangetacertificatessecretinPKCS12format-/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1593089704,"updated":1593089704}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-cangetacertificatessecretinPKCS12format-/pending"}}, [
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
  '24168c47-442f-407a-88d1-dd011c2aa91a',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 12:55:20 GMT',
  'Content-Length',
  '2655'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/secrets/CRUDCertificateName-cangetacertificatessecretinPKCS12format-/')
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
  '76168749-bc27-45eb-91fd-dc4d2111baca',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 12:55:22 GMT'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fvault.azure.net%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":86399,"ext_expires_in":86399,"access_token":"access_token"}, [
  'Cache-Control',
  'no-cache, no-store',
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
  'x-ms-request-id',
  '42acee10-af7f-4e32-861d-b8de38f41c01',
  'x-ms-ests-server',
  '2.1.10732.8 - WUS2 ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=Aupdq-im4O5AncQGk9EbXqM_aSJHAgAAAKeVhtYOAAAA; expires=Sat, 25-Jul-2020 12:55:23 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; SameSite=None; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; SameSite=None; secure; HttpOnly',
  'Date',
  'Thu, 25 Jun 2020 12:55:22 GMT',
  'Content-Length',
  '1315'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/secrets/CRUDCertificateName-cangetacertificatessecretinPKCS12format-/')
  .query(true)
  .reply(200, {"value":"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","contentType":"application/x-pkcs12","id":"https://keyvault_name.vault.azure.net/secrets/CRUDCertificateName-cangetacertificatessecretinPKCS12format-/0920dcd9e7d8422da4250637fd65bdfb","managed":true,"attributes":{"enabled":true,"nbf":1593089119,"exp":1624625719,"created":1593089719,"updated":1593089719,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90},"kid":"https://keyvault_name.vault.azure.net/keys/CRUDCertificateName-cangetacertificatessecretinPKCS12format-/0920dcd9e7d8422da4250637fd65bdfb"}, [
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
  '2ce333c9-9325-44c5-a9a4-200cf71eb118',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 12:55:22 GMT',
  'Content-Length',
  '4047'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/certificates/CRUDCertificateName-cangetacertificatessecretinPKCS12format-')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/CRUDCertificateName-cangetacertificatessecretinPKCS12format-","deletedDate":1593089723,"scheduledPurgeDate":1600865723,"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-cangetacertificatessecretinPKCS12format-/0920dcd9e7d8422da4250637fd65bdfb","kid":"https://keyvault_name.vault.azure.net/keys/CRUDCertificateName-cangetacertificatessecretinPKCS12format-/0920dcd9e7d8422da4250637fd65bdfb","sid":"https://keyvault_name.vault.azure.net/secrets/CRUDCertificateName-cangetacertificatessecretinPKCS12format-/0920dcd9e7d8422da4250637fd65bdfb","x5t":"jaorG9fM3YA8rpnyqJy3LlNsvbU","cer":"MIIDKDCCAhCgAwIBAgIQAeGt3a+3QcmpzlrZGMHscjANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjAwNjI1MTI0NTE5WhcNMjEwNjI1MTI1NTE5WjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQD7qw0WjIcoCafISB12pKXWH77vPuDQ9pareNvjQvWmVGHB1+ED3zmgNI4lz3pvWBCTzzLCORxazbxt6pK/bbr7Ws7GLlfkGSHhyTMiFW3cLF+bvAjII4QOmXJ57KkLB3AWSwtQP6daWQNC6HMMABRvfbwQHx6oDjDwxUQLqbVDhifldICMdwfthEchMO7mTXbKuqn4HuTr2n/OHecapTo60lo6ugZedNiqwJkNwjLAFJ74ZDJGaOevsaimdgpPkR8YxEWUK0uMgb4Sgd6oYbbbRbF74/p4tOnPwmQ/GruXhgwPoa9tbIxLCcM8LxaAKee+68QMn4jU1yAC682cS5IDAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBS/M8uS+a9psMEatkMyjzMMG2gTFzAdBgNVHQ4EFgQUvzPLkvmvabDBGrZDMo8zDBtoExcwDQYJKoZIhvcNAQELBQADggEBAAUtkDK6Nl553m/eReg4fAzxF8B8I2wnujN2vgJ2WLJqh4PL1GZt/0KEwBud5eY8wUs8lWteXIcJmjnxl2P6Silc/F2IBZ9vGznvtAlxYHpi5dRk2dTJmSq0JUfyDFEk5J5ZFz2t9BYmANZCQW0egWg0bFairHrm1EAM/stPud0Gz+2+5qtfjtpF9hgznBp1IaDL0Q4PXgGnDrEi7PA+VhNlSOFNgSWuUfZjvbBRo81WN/NtEambEwkACNyc5J4MyKV+bd+9qkA0FmauSYtDLcsKQ5JHVAVKok9odc2k3JfX9wxHe2lWZpMs9/BYTVZkeKsz5Un5yhCeoh79B2EOpTg=","attributes":{"enabled":true,"nbf":1593089119,"exp":1624625719,"created":1593089719,"updated":1593089719,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-cangetacertificatessecretinPKCS12format-/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1593089704,"updated":1593089704}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-cangetacertificatessecretinPKCS12format-/pending"}}, [
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
  '60e12b45-dcd4-4918-bdae-3a277c748b5e',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 12:55:23 GMT',
  'Content-Length',
  '2868'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/CRUDCertificateName-cangetacertificatessecretinPKCS12format-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: CRUDCertificateName-cangetacertificatessecretinPKCS12format-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '161',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'ba2290a9-1634-461d-84d9-812a4d1c00c6',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 12:55:23 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/CRUDCertificateName-cangetacertificatessecretinPKCS12format-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: CRUDCertificateName-cangetacertificatessecretinPKCS12format-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '161',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'eb60e8c5-d0bb-4087-b2c8-fa967018af8c',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 12:55:23 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/CRUDCertificateName-cangetacertificatessecretinPKCS12format-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: CRUDCertificateName-cangetacertificatessecretinPKCS12format-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '161',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '9e17c29f-d032-4a63-b6e7-c4f58c745e03',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 12:55:25 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/CRUDCertificateName-cangetacertificatessecretinPKCS12format-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: CRUDCertificateName-cangetacertificatessecretinPKCS12format-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '161',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'dee5b4e2-7a13-417b-aaf3-b8e49e534e75',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 12:55:27 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/CRUDCertificateName-cangetacertificatessecretinPKCS12format-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: CRUDCertificateName-cangetacertificatessecretinPKCS12format-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '161',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'b9a1a149-2d6a-4ba7-8d08-6323e9979218',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 12:55:29 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/CRUDCertificateName-cangetacertificatessecretinPKCS12format-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: CRUDCertificateName-cangetacertificatessecretinPKCS12format-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '161',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'de064b73-627a-4817-b258-204dd0e6640e',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 12:55:31 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/CRUDCertificateName-cangetacertificatessecretinPKCS12format-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: CRUDCertificateName-cangetacertificatessecretinPKCS12format-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '161',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'f3bc4610-598e-4439-b029-cad923f16944',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 12:55:32 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/CRUDCertificateName-cangetacertificatessecretinPKCS12format-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: CRUDCertificateName-cangetacertificatessecretinPKCS12format-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '161',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '7f928a96-d9ae-44d0-beac-ab809b8c325d',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 12:55:34 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/CRUDCertificateName-cangetacertificatessecretinPKCS12format-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: CRUDCertificateName-cangetacertificatessecretinPKCS12format-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '161',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'b2d27f95-9fe5-4937-a72e-c2324925ab3f',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 12:55:37 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/CRUDCertificateName-cangetacertificatessecretinPKCS12format-')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/CRUDCertificateName-cangetacertificatessecretinPKCS12format-","deletedDate":1593089723,"scheduledPurgeDate":1600865723,"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-cangetacertificatessecretinPKCS12format-/0920dcd9e7d8422da4250637fd65bdfb","kid":"https://keyvault_name.vault.azure.net/keys/CRUDCertificateName-cangetacertificatessecretinPKCS12format-/0920dcd9e7d8422da4250637fd65bdfb","sid":"https://keyvault_name.vault.azure.net/secrets/CRUDCertificateName-cangetacertificatessecretinPKCS12format-/0920dcd9e7d8422da4250637fd65bdfb","x5t":"jaorG9fM3YA8rpnyqJy3LlNsvbU","cer":"MIIDKDCCAhCgAwIBAgIQAeGt3a+3QcmpzlrZGMHscjANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjAwNjI1MTI0NTE5WhcNMjEwNjI1MTI1NTE5WjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQD7qw0WjIcoCafISB12pKXWH77vPuDQ9pareNvjQvWmVGHB1+ED3zmgNI4lz3pvWBCTzzLCORxazbxt6pK/bbr7Ws7GLlfkGSHhyTMiFW3cLF+bvAjII4QOmXJ57KkLB3AWSwtQP6daWQNC6HMMABRvfbwQHx6oDjDwxUQLqbVDhifldICMdwfthEchMO7mTXbKuqn4HuTr2n/OHecapTo60lo6ugZedNiqwJkNwjLAFJ74ZDJGaOevsaimdgpPkR8YxEWUK0uMgb4Sgd6oYbbbRbF74/p4tOnPwmQ/GruXhgwPoa9tbIxLCcM8LxaAKee+68QMn4jU1yAC682cS5IDAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBS/M8uS+a9psMEatkMyjzMMG2gTFzAdBgNVHQ4EFgQUvzPLkvmvabDBGrZDMo8zDBtoExcwDQYJKoZIhvcNAQELBQADggEBAAUtkDK6Nl553m/eReg4fAzxF8B8I2wnujN2vgJ2WLJqh4PL1GZt/0KEwBud5eY8wUs8lWteXIcJmjnxl2P6Silc/F2IBZ9vGznvtAlxYHpi5dRk2dTJmSq0JUfyDFEk5J5ZFz2t9BYmANZCQW0egWg0bFairHrm1EAM/stPud0Gz+2+5qtfjtpF9hgznBp1IaDL0Q4PXgGnDrEi7PA+VhNlSOFNgSWuUfZjvbBRo81WN/NtEambEwkACNyc5J4MyKV+bd+9qkA0FmauSYtDLcsKQ5JHVAVKok9odc2k3JfX9wxHe2lWZpMs9/BYTVZkeKsz5Un5yhCeoh79B2EOpTg=","attributes":{"enabled":true,"nbf":1593089119,"exp":1624625719,"created":1593089719,"updated":1593089719,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-cangetacertificatessecretinPKCS12format-/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1593089704,"updated":1593089704}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-cangetacertificatessecretinPKCS12format-/pending"}}, [
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
  '461b7800-bc0d-46b8-a298-bf3a55d00f03',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 12:55:39 GMT',
  'Content-Length',
  '2868'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedcertificates/CRUDCertificateName-cangetacertificatessecretinPKCS12format-')
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
  '60f87dbc-016f-4de0-8d4f-95151a7905f1',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 12:55:39 GMT'
]);

let nock = require('nock');

module.exports.hash = "61e973744a71f34b3f580920a42cfaa4";

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
  'westus',
  'x-ms-request-id',
  'dbf94c49-33a5-45a4-94e4-91c7e5851c74',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.123.117;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 02 Jul 2020 18:42:05 GMT'
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
  '6b858648-b9a7-42f1-942d-0fa08e224c00',
  'x-ms-ests-server',
  '2.1.10761.15 - NCUS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=ArFK1LHCxpNBgU3OL_o077Q_aSJHAQAAAH0hkNYOAAAA; expires=Sat, 01-Aug-2020 18:42:06 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; SameSite=None; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; SameSite=None; secure; HttpOnly',
  'Date',
  'Thu, 02 Jul 2020 18:42:06 GMT',
  'Content-Length',
  '1315'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/certificates/lroDeleteCertificateName-canwaituntilacertificateisdeleted-/create', {"policy":{"key_props":{},"secret_props":{},"x509_props":{"subject":"cn=MyCert","sans":{}},"issuer":{"name":"Self"},"attributes":{}},"attributes":{}})
  .query(true)
  .reply(202, {"id":"https://keyvault_name.vault.azure.net/certificates/lroDeleteCertificateName-canwaituntilacertificateisdeleted-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAod92uUB97xFIET1uAh4XxtJtjtycgWcQCXujQBrEZ6CyEvMOsKnjXgoXDineERshsptpI67dv4KUpmMGXCW68P+S8S3vJVHGDn+bbwCh12UTRH81/mIkETkggXwgsKh6f/Dm7A62kW9YI2IyN1UjQVCxAZdzcJjstETsZbpcUm35zpFQlbuMjC7sXEDEc19a9QAIoY8lPx3/yqtIkPyX4j//BGo3hKRTPujfYxg3QmKGK51O+ac+XGd2RTBy/T4RmV7aeFvuEzQVgbLly53nopOOAkaUoXtiqDjMKxNFPEkLX3F18u0Bf7R1G2jYzwF0qmUVZU/IjNQpOHb6rbb37QIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAIix6f+5hVrNvl2RencUk7kb4vEE6N9xZF5eI2qgp6pHJQqXSfv/gJWu7RJ1Fzyg9uJDTCUNo+l/YLKsTZDqompwFadp3H89HFNbkuGxyrBwh52Iuybdjwt+B/znl+3IDGaHJ3ddA50GYTF8KxogXyfC9BzRSNkS32z5Y9b8l4HJdfcCppsVvf1uFVlYkWshilyTbGgoIZwzyIEb0XRdEUCaO+pI586KIHcS76b0et+JiJOu6gHO2bKZo2AgaojLBs5Tpv9qfnqfOG4fZw6Jwkwxm2e1JacoRR2iMi50BZbNBJCHFgA92zqz1fyZ8fd4C/sImN6znxRdtQtuJNw4w6Y=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"670d214fdc6c4319b73adcea51a6190e"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://keyvault_name.vault.azure.net/certificates/lroDeleteCertificateName-canwaituntilacertificateisdeleted-/pending?api-version=7.1&request_id=670d214fdc6c4319b73adcea51a6190e',
  'Retry-After',
  '10',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '6bcdb3ab-3ca1-4cf7-bc09-43184485701e',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.123.117;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 02 Jul 2020 18:42:06 GMT',
  'Content-Length',
  '1352'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroDeleteCertificateName-canwaituntilacertificateisdeleted-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroDeleteCertificateName-canwaituntilacertificateisdeleted-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAod92uUB97xFIET1uAh4XxtJtjtycgWcQCXujQBrEZ6CyEvMOsKnjXgoXDineERshsptpI67dv4KUpmMGXCW68P+S8S3vJVHGDn+bbwCh12UTRH81/mIkETkggXwgsKh6f/Dm7A62kW9YI2IyN1UjQVCxAZdzcJjstETsZbpcUm35zpFQlbuMjC7sXEDEc19a9QAIoY8lPx3/yqtIkPyX4j//BGo3hKRTPujfYxg3QmKGK51O+ac+XGd2RTBy/T4RmV7aeFvuEzQVgbLly53nopOOAkaUoXtiqDjMKxNFPEkLX3F18u0Bf7R1G2jYzwF0qmUVZU/IjNQpOHb6rbb37QIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAIix6f+5hVrNvl2RencUk7kb4vEE6N9xZF5eI2qgp6pHJQqXSfv/gJWu7RJ1Fzyg9uJDTCUNo+l/YLKsTZDqompwFadp3H89HFNbkuGxyrBwh52Iuybdjwt+B/znl+3IDGaHJ3ddA50GYTF8KxogXyfC9BzRSNkS32z5Y9b8l4HJdfcCppsVvf1uFVlYkWshilyTbGgoIZwzyIEb0XRdEUCaO+pI586KIHcS76b0et+JiJOu6gHO2bKZo2AgaojLBs5Tpv9qfnqfOG4fZw6Jwkwxm2e1JacoRR2iMi50BZbNBJCHFgA92zqz1fyZ8fd4C/sImN6znxRdtQtuJNw4w6Y=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"670d214fdc6c4319b73adcea51a6190e"}, [
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
  'ce6b930e-31d6-4a54-80a9-18d397190527',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.123.117;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 02 Jul 2020 18:42:06 GMT',
  'Content-Length',
  '1352'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroDeleteCertificateName-canwaituntilacertificateisdeleted-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroDeleteCertificateName-canwaituntilacertificateisdeleted-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAod92uUB97xFIET1uAh4XxtJtjtycgWcQCXujQBrEZ6CyEvMOsKnjXgoXDineERshsptpI67dv4KUpmMGXCW68P+S8S3vJVHGDn+bbwCh12UTRH81/mIkETkggXwgsKh6f/Dm7A62kW9YI2IyN1UjQVCxAZdzcJjstETsZbpcUm35zpFQlbuMjC7sXEDEc19a9QAIoY8lPx3/yqtIkPyX4j//BGo3hKRTPujfYxg3QmKGK51O+ac+XGd2RTBy/T4RmV7aeFvuEzQVgbLly53nopOOAkaUoXtiqDjMKxNFPEkLX3F18u0Bf7R1G2jYzwF0qmUVZU/IjNQpOHb6rbb37QIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAIix6f+5hVrNvl2RencUk7kb4vEE6N9xZF5eI2qgp6pHJQqXSfv/gJWu7RJ1Fzyg9uJDTCUNo+l/YLKsTZDqompwFadp3H89HFNbkuGxyrBwh52Iuybdjwt+B/znl+3IDGaHJ3ddA50GYTF8KxogXyfC9BzRSNkS32z5Y9b8l4HJdfcCppsVvf1uFVlYkWshilyTbGgoIZwzyIEb0XRdEUCaO+pI586KIHcS76b0et+JiJOu6gHO2bKZo2AgaojLBs5Tpv9qfnqfOG4fZw6Jwkwxm2e1JacoRR2iMi50BZbNBJCHFgA92zqz1fyZ8fd4C/sImN6znxRdtQtuJNw4w6Y=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"670d214fdc6c4319b73adcea51a6190e"}, [
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
  '5e156609-6601-48bc-b0df-0669cc944675',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.123.117;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 02 Jul 2020 18:42:06 GMT',
  'Content-Length',
  '1352'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroDeleteCertificateName-canwaituntilacertificateisdeleted-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroDeleteCertificateName-canwaituntilacertificateisdeleted-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAod92uUB97xFIET1uAh4XxtJtjtycgWcQCXujQBrEZ6CyEvMOsKnjXgoXDineERshsptpI67dv4KUpmMGXCW68P+S8S3vJVHGDn+bbwCh12UTRH81/mIkETkggXwgsKh6f/Dm7A62kW9YI2IyN1UjQVCxAZdzcJjstETsZbpcUm35zpFQlbuMjC7sXEDEc19a9QAIoY8lPx3/yqtIkPyX4j//BGo3hKRTPujfYxg3QmKGK51O+ac+XGd2RTBy/T4RmV7aeFvuEzQVgbLly53nopOOAkaUoXtiqDjMKxNFPEkLX3F18u0Bf7R1G2jYzwF0qmUVZU/IjNQpOHb6rbb37QIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAIix6f+5hVrNvl2RencUk7kb4vEE6N9xZF5eI2qgp6pHJQqXSfv/gJWu7RJ1Fzyg9uJDTCUNo+l/YLKsTZDqompwFadp3H89HFNbkuGxyrBwh52Iuybdjwt+B/znl+3IDGaHJ3ddA50GYTF8KxogXyfC9BzRSNkS32z5Y9b8l4HJdfcCppsVvf1uFVlYkWshilyTbGgoIZwzyIEb0XRdEUCaO+pI586KIHcS76b0et+JiJOu6gHO2bKZo2AgaojLBs5Tpv9qfnqfOG4fZw6Jwkwxm2e1JacoRR2iMi50BZbNBJCHFgA92zqz1fyZ8fd4C/sImN6znxRdtQtuJNw4w6Y=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"670d214fdc6c4319b73adcea51a6190e"}, [
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
  '9ed84c97-96a6-4067-b8fa-c3af0c89c287',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.123.117;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 02 Jul 2020 18:42:09 GMT',
  'Content-Length',
  '1352'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroDeleteCertificateName-canwaituntilacertificateisdeleted-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroDeleteCertificateName-canwaituntilacertificateisdeleted-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAod92uUB97xFIET1uAh4XxtJtjtycgWcQCXujQBrEZ6CyEvMOsKnjXgoXDineERshsptpI67dv4KUpmMGXCW68P+S8S3vJVHGDn+bbwCh12UTRH81/mIkETkggXwgsKh6f/Dm7A62kW9YI2IyN1UjQVCxAZdzcJjstETsZbpcUm35zpFQlbuMjC7sXEDEc19a9QAIoY8lPx3/yqtIkPyX4j//BGo3hKRTPujfYxg3QmKGK51O+ac+XGd2RTBy/T4RmV7aeFvuEzQVgbLly53nopOOAkaUoXtiqDjMKxNFPEkLX3F18u0Bf7R1G2jYzwF0qmUVZU/IjNQpOHb6rbb37QIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAIix6f+5hVrNvl2RencUk7kb4vEE6N9xZF5eI2qgp6pHJQqXSfv/gJWu7RJ1Fzyg9uJDTCUNo+l/YLKsTZDqompwFadp3H89HFNbkuGxyrBwh52Iuybdjwt+B/znl+3IDGaHJ3ddA50GYTF8KxogXyfC9BzRSNkS32z5Y9b8l4HJdfcCppsVvf1uFVlYkWshilyTbGgoIZwzyIEb0XRdEUCaO+pI586KIHcS76b0et+JiJOu6gHO2bKZo2AgaojLBs5Tpv9qfnqfOG4fZw6Jwkwxm2e1JacoRR2iMi50BZbNBJCHFgA92zqz1fyZ8fd4C/sImN6znxRdtQtuJNw4w6Y=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"670d214fdc6c4319b73adcea51a6190e"}, [
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
  '88996a7b-708c-4c53-926f-377385f8ba87',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.123.117;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 02 Jul 2020 18:42:11 GMT',
  'Content-Length',
  '1352'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroDeleteCertificateName-canwaituntilacertificateisdeleted-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroDeleteCertificateName-canwaituntilacertificateisdeleted-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAod92uUB97xFIET1uAh4XxtJtjtycgWcQCXujQBrEZ6CyEvMOsKnjXgoXDineERshsptpI67dv4KUpmMGXCW68P+S8S3vJVHGDn+bbwCh12UTRH81/mIkETkggXwgsKh6f/Dm7A62kW9YI2IyN1UjQVCxAZdzcJjstETsZbpcUm35zpFQlbuMjC7sXEDEc19a9QAIoY8lPx3/yqtIkPyX4j//BGo3hKRTPujfYxg3QmKGK51O+ac+XGd2RTBy/T4RmV7aeFvuEzQVgbLly53nopOOAkaUoXtiqDjMKxNFPEkLX3F18u0Bf7R1G2jYzwF0qmUVZU/IjNQpOHb6rbb37QIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAIix6f+5hVrNvl2RencUk7kb4vEE6N9xZF5eI2qgp6pHJQqXSfv/gJWu7RJ1Fzyg9uJDTCUNo+l/YLKsTZDqompwFadp3H89HFNbkuGxyrBwh52Iuybdjwt+B/znl+3IDGaHJ3ddA50GYTF8KxogXyfC9BzRSNkS32z5Y9b8l4HJdfcCppsVvf1uFVlYkWshilyTbGgoIZwzyIEb0XRdEUCaO+pI586KIHcS76b0et+JiJOu6gHO2bKZo2AgaojLBs5Tpv9qfnqfOG4fZw6Jwkwxm2e1JacoRR2iMi50BZbNBJCHFgA92zqz1fyZ8fd4C/sImN6znxRdtQtuJNw4w6Y=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"670d214fdc6c4319b73adcea51a6190e"}, [
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
  '4f65e988-9171-4d8e-b373-e905382c7f93',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.123.117;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 02 Jul 2020 18:42:13 GMT',
  'Content-Length',
  '1352'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroDeleteCertificateName-canwaituntilacertificateisdeleted-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroDeleteCertificateName-canwaituntilacertificateisdeleted-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAod92uUB97xFIET1uAh4XxtJtjtycgWcQCXujQBrEZ6CyEvMOsKnjXgoXDineERshsptpI67dv4KUpmMGXCW68P+S8S3vJVHGDn+bbwCh12UTRH81/mIkETkggXwgsKh6f/Dm7A62kW9YI2IyN1UjQVCxAZdzcJjstETsZbpcUm35zpFQlbuMjC7sXEDEc19a9QAIoY8lPx3/yqtIkPyX4j//BGo3hKRTPujfYxg3QmKGK51O+ac+XGd2RTBy/T4RmV7aeFvuEzQVgbLly53nopOOAkaUoXtiqDjMKxNFPEkLX3F18u0Bf7R1G2jYzwF0qmUVZU/IjNQpOHb6rbb37QIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAIix6f+5hVrNvl2RencUk7kb4vEE6N9xZF5eI2qgp6pHJQqXSfv/gJWu7RJ1Fzyg9uJDTCUNo+l/YLKsTZDqompwFadp3H89HFNbkuGxyrBwh52Iuybdjwt+B/znl+3IDGaHJ3ddA50GYTF8KxogXyfC9BzRSNkS32z5Y9b8l4HJdfcCppsVvf1uFVlYkWshilyTbGgoIZwzyIEb0XRdEUCaO+pI586KIHcS76b0et+JiJOu6gHO2bKZo2AgaojLBs5Tpv9qfnqfOG4fZw6Jwkwxm2e1JacoRR2iMi50BZbNBJCHFgA92zqz1fyZ8fd4C/sImN6znxRdtQtuJNw4w6Y=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"670d214fdc6c4319b73adcea51a6190e"}, [
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
  'e02ed597-dce3-475f-8a2c-c8dd0ae4a0ce',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.123.117;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 02 Jul 2020 18:42:15 GMT',
  'Content-Length',
  '1352'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroDeleteCertificateName-canwaituntilacertificateisdeleted-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroDeleteCertificateName-canwaituntilacertificateisdeleted-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAod92uUB97xFIET1uAh4XxtJtjtycgWcQCXujQBrEZ6CyEvMOsKnjXgoXDineERshsptpI67dv4KUpmMGXCW68P+S8S3vJVHGDn+bbwCh12UTRH81/mIkETkggXwgsKh6f/Dm7A62kW9YI2IyN1UjQVCxAZdzcJjstETsZbpcUm35zpFQlbuMjC7sXEDEc19a9QAIoY8lPx3/yqtIkPyX4j//BGo3hKRTPujfYxg3QmKGK51O+ac+XGd2RTBy/T4RmV7aeFvuEzQVgbLly53nopOOAkaUoXtiqDjMKxNFPEkLX3F18u0Bf7R1G2jYzwF0qmUVZU/IjNQpOHb6rbb37QIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAIix6f+5hVrNvl2RencUk7kb4vEE6N9xZF5eI2qgp6pHJQqXSfv/gJWu7RJ1Fzyg9uJDTCUNo+l/YLKsTZDqompwFadp3H89HFNbkuGxyrBwh52Iuybdjwt+B/znl+3IDGaHJ3ddA50GYTF8KxogXyfC9BzRSNkS32z5Y9b8l4HJdfcCppsVvf1uFVlYkWshilyTbGgoIZwzyIEb0XRdEUCaO+pI586KIHcS76b0et+JiJOu6gHO2bKZo2AgaojLBs5Tpv9qfnqfOG4fZw6Jwkwxm2e1JacoRR2iMi50BZbNBJCHFgA92zqz1fyZ8fd4C/sImN6znxRdtQtuJNw4w6Y=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"670d214fdc6c4319b73adcea51a6190e"}, [
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
  'f798c3d8-2937-4da0-abe9-9ee98d7e2ffa',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.123.117;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 02 Jul 2020 18:42:17 GMT',
  'Content-Length',
  '1352'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroDeleteCertificateName-canwaituntilacertificateisdeleted-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroDeleteCertificateName-canwaituntilacertificateisdeleted-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAod92uUB97xFIET1uAh4XxtJtjtycgWcQCXujQBrEZ6CyEvMOsKnjXgoXDineERshsptpI67dv4KUpmMGXCW68P+S8S3vJVHGDn+bbwCh12UTRH81/mIkETkggXwgsKh6f/Dm7A62kW9YI2IyN1UjQVCxAZdzcJjstETsZbpcUm35zpFQlbuMjC7sXEDEc19a9QAIoY8lPx3/yqtIkPyX4j//BGo3hKRTPujfYxg3QmKGK51O+ac+XGd2RTBy/T4RmV7aeFvuEzQVgbLly53nopOOAkaUoXtiqDjMKxNFPEkLX3F18u0Bf7R1G2jYzwF0qmUVZU/IjNQpOHb6rbb37QIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAIix6f+5hVrNvl2RencUk7kb4vEE6N9xZF5eI2qgp6pHJQqXSfv/gJWu7RJ1Fzyg9uJDTCUNo+l/YLKsTZDqompwFadp3H89HFNbkuGxyrBwh52Iuybdjwt+B/znl+3IDGaHJ3ddA50GYTF8KxogXyfC9BzRSNkS32z5Y9b8l4HJdfcCppsVvf1uFVlYkWshilyTbGgoIZwzyIEb0XRdEUCaO+pI586KIHcS76b0et+JiJOu6gHO2bKZo2AgaojLBs5Tpv9qfnqfOG4fZw6Jwkwxm2e1JacoRR2iMi50BZbNBJCHFgA92zqz1fyZ8fd4C/sImN6znxRdtQtuJNw4w6Y=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"670d214fdc6c4319b73adcea51a6190e"}, [
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
  '4ddd7105-1161-48e4-a1fc-322e56dcd38f',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.123.117;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 02 Jul 2020 18:42:19 GMT',
  'Content-Length',
  '1352'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroDeleteCertificateName-canwaituntilacertificateisdeleted-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroDeleteCertificateName-canwaituntilacertificateisdeleted-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAod92uUB97xFIET1uAh4XxtJtjtycgWcQCXujQBrEZ6CyEvMOsKnjXgoXDineERshsptpI67dv4KUpmMGXCW68P+S8S3vJVHGDn+bbwCh12UTRH81/mIkETkggXwgsKh6f/Dm7A62kW9YI2IyN1UjQVCxAZdzcJjstETsZbpcUm35zpFQlbuMjC7sXEDEc19a9QAIoY8lPx3/yqtIkPyX4j//BGo3hKRTPujfYxg3QmKGK51O+ac+XGd2RTBy/T4RmV7aeFvuEzQVgbLly53nopOOAkaUoXtiqDjMKxNFPEkLX3F18u0Bf7R1G2jYzwF0qmUVZU/IjNQpOHb6rbb37QIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAIix6f+5hVrNvl2RencUk7kb4vEE6N9xZF5eI2qgp6pHJQqXSfv/gJWu7RJ1Fzyg9uJDTCUNo+l/YLKsTZDqompwFadp3H89HFNbkuGxyrBwh52Iuybdjwt+B/znl+3IDGaHJ3ddA50GYTF8KxogXyfC9BzRSNkS32z5Y9b8l4HJdfcCppsVvf1uFVlYkWshilyTbGgoIZwzyIEb0XRdEUCaO+pI586KIHcS76b0et+JiJOu6gHO2bKZo2AgaojLBs5Tpv9qfnqfOG4fZw6Jwkwxm2e1JacoRR2iMi50BZbNBJCHFgA92zqz1fyZ8fd4C/sImN6znxRdtQtuJNw4w6Y=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"670d214fdc6c4319b73adcea51a6190e"}, [
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
  'b66799b6-dc7f-4791-b1f2-ab5878e6991c',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.123.117;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 02 Jul 2020 18:42:21 GMT',
  'Content-Length',
  '1352'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroDeleteCertificateName-canwaituntilacertificateisdeleted-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroDeleteCertificateName-canwaituntilacertificateisdeleted-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAod92uUB97xFIET1uAh4XxtJtjtycgWcQCXujQBrEZ6CyEvMOsKnjXgoXDineERshsptpI67dv4KUpmMGXCW68P+S8S3vJVHGDn+bbwCh12UTRH81/mIkETkggXwgsKh6f/Dm7A62kW9YI2IyN1UjQVCxAZdzcJjstETsZbpcUm35zpFQlbuMjC7sXEDEc19a9QAIoY8lPx3/yqtIkPyX4j//BGo3hKRTPujfYxg3QmKGK51O+ac+XGd2RTBy/T4RmV7aeFvuEzQVgbLly53nopOOAkaUoXtiqDjMKxNFPEkLX3F18u0Bf7R1G2jYzwF0qmUVZU/IjNQpOHb6rbb37QIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAIix6f+5hVrNvl2RencUk7kb4vEE6N9xZF5eI2qgp6pHJQqXSfv/gJWu7RJ1Fzyg9uJDTCUNo+l/YLKsTZDqompwFadp3H89HFNbkuGxyrBwh52Iuybdjwt+B/znl+3IDGaHJ3ddA50GYTF8KxogXyfC9BzRSNkS32z5Y9b8l4HJdfcCppsVvf1uFVlYkWshilyTbGgoIZwzyIEb0XRdEUCaO+pI586KIHcS76b0et+JiJOu6gHO2bKZo2AgaojLBs5Tpv9qfnqfOG4fZw6Jwkwxm2e1JacoRR2iMi50BZbNBJCHFgA92zqz1fyZ8fd4C/sImN6znxRdtQtuJNw4w6Y=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"670d214fdc6c4319b73adcea51a6190e"}, [
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
  '462eeb8e-d6e8-4537-a095-92a3bd5be8ed',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.123.117;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 02 Jul 2020 18:42:23 GMT',
  'Content-Length',
  '1352'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroDeleteCertificateName-canwaituntilacertificateisdeleted-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroDeleteCertificateName-canwaituntilacertificateisdeleted-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAod92uUB97xFIET1uAh4XxtJtjtycgWcQCXujQBrEZ6CyEvMOsKnjXgoXDineERshsptpI67dv4KUpmMGXCW68P+S8S3vJVHGDn+bbwCh12UTRH81/mIkETkggXwgsKh6f/Dm7A62kW9YI2IyN1UjQVCxAZdzcJjstETsZbpcUm35zpFQlbuMjC7sXEDEc19a9QAIoY8lPx3/yqtIkPyX4j//BGo3hKRTPujfYxg3QmKGK51O+ac+XGd2RTBy/T4RmV7aeFvuEzQVgbLly53nopOOAkaUoXtiqDjMKxNFPEkLX3F18u0Bf7R1G2jYzwF0qmUVZU/IjNQpOHb6rbb37QIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAIix6f+5hVrNvl2RencUk7kb4vEE6N9xZF5eI2qgp6pHJQqXSfv/gJWu7RJ1Fzyg9uJDTCUNo+l/YLKsTZDqompwFadp3H89HFNbkuGxyrBwh52Iuybdjwt+B/znl+3IDGaHJ3ddA50GYTF8KxogXyfC9BzRSNkS32z5Y9b8l4HJdfcCppsVvf1uFVlYkWshilyTbGgoIZwzyIEb0XRdEUCaO+pI586KIHcS76b0et+JiJOu6gHO2bKZo2AgaojLBs5Tpv9qfnqfOG4fZw6Jwkwxm2e1JacoRR2iMi50BZbNBJCHFgA92zqz1fyZ8fd4C/sImN6znxRdtQtuJNw4w6Y=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"670d214fdc6c4319b73adcea51a6190e"}, [
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
  '63144a9e-e7a4-495d-82fa-abe4a7815ea5',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.123.117;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 02 Jul 2020 18:42:25 GMT',
  'Content-Length',
  '1352'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroDeleteCertificateName-canwaituntilacertificateisdeleted-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroDeleteCertificateName-canwaituntilacertificateisdeleted-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAod92uUB97xFIET1uAh4XxtJtjtycgWcQCXujQBrEZ6CyEvMOsKnjXgoXDineERshsptpI67dv4KUpmMGXCW68P+S8S3vJVHGDn+bbwCh12UTRH81/mIkETkggXwgsKh6f/Dm7A62kW9YI2IyN1UjQVCxAZdzcJjstETsZbpcUm35zpFQlbuMjC7sXEDEc19a9QAIoY8lPx3/yqtIkPyX4j//BGo3hKRTPujfYxg3QmKGK51O+ac+XGd2RTBy/T4RmV7aeFvuEzQVgbLly53nopOOAkaUoXtiqDjMKxNFPEkLX3F18u0Bf7R1G2jYzwF0qmUVZU/IjNQpOHb6rbb37QIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAIix6f+5hVrNvl2RencUk7kb4vEE6N9xZF5eI2qgp6pHJQqXSfv/gJWu7RJ1Fzyg9uJDTCUNo+l/YLKsTZDqompwFadp3H89HFNbkuGxyrBwh52Iuybdjwt+B/znl+3IDGaHJ3ddA50GYTF8KxogXyfC9BzRSNkS32z5Y9b8l4HJdfcCppsVvf1uFVlYkWshilyTbGgoIZwzyIEb0XRdEUCaO+pI586KIHcS76b0et+JiJOu6gHO2bKZo2AgaojLBs5Tpv9qfnqfOG4fZw6Jwkwxm2e1JacoRR2iMi50BZbNBJCHFgA92zqz1fyZ8fd4C/sImN6znxRdtQtuJNw4w6Y=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"670d214fdc6c4319b73adcea51a6190e"}, [
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
  '1bd83811-ffd5-4e4c-a435-f60907ecb430',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.123.117;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 02 Jul 2020 18:42:27 GMT',
  'Content-Length',
  '1352'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroDeleteCertificateName-canwaituntilacertificateisdeleted-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroDeleteCertificateName-canwaituntilacertificateisdeleted-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAod92uUB97xFIET1uAh4XxtJtjtycgWcQCXujQBrEZ6CyEvMOsKnjXgoXDineERshsptpI67dv4KUpmMGXCW68P+S8S3vJVHGDn+bbwCh12UTRH81/mIkETkggXwgsKh6f/Dm7A62kW9YI2IyN1UjQVCxAZdzcJjstETsZbpcUm35zpFQlbuMjC7sXEDEc19a9QAIoY8lPx3/yqtIkPyX4j//BGo3hKRTPujfYxg3QmKGK51O+ac+XGd2RTBy/T4RmV7aeFvuEzQVgbLly53nopOOAkaUoXtiqDjMKxNFPEkLX3F18u0Bf7R1G2jYzwF0qmUVZU/IjNQpOHb6rbb37QIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAIix6f+5hVrNvl2RencUk7kb4vEE6N9xZF5eI2qgp6pHJQqXSfv/gJWu7RJ1Fzyg9uJDTCUNo+l/YLKsTZDqompwFadp3H89HFNbkuGxyrBwh52Iuybdjwt+B/znl+3IDGaHJ3ddA50GYTF8KxogXyfC9BzRSNkS32z5Y9b8l4HJdfcCppsVvf1uFVlYkWshilyTbGgoIZwzyIEb0XRdEUCaO+pI586KIHcS76b0et+JiJOu6gHO2bKZo2AgaojLBs5Tpv9qfnqfOG4fZw6Jwkwxm2e1JacoRR2iMi50BZbNBJCHFgA92zqz1fyZ8fd4C/sImN6znxRdtQtuJNw4w6Y=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"670d214fdc6c4319b73adcea51a6190e"}, [
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
  'c34440f7-18b5-4b95-b635-1fac5203057b',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.123.117;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 02 Jul 2020 18:42:29 GMT',
  'Content-Length',
  '1352'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroDeleteCertificateName-canwaituntilacertificateisdeleted-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroDeleteCertificateName-canwaituntilacertificateisdeleted-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAod92uUB97xFIET1uAh4XxtJtjtycgWcQCXujQBrEZ6CyEvMOsKnjXgoXDineERshsptpI67dv4KUpmMGXCW68P+S8S3vJVHGDn+bbwCh12UTRH81/mIkETkggXwgsKh6f/Dm7A62kW9YI2IyN1UjQVCxAZdzcJjstETsZbpcUm35zpFQlbuMjC7sXEDEc19a9QAIoY8lPx3/yqtIkPyX4j//BGo3hKRTPujfYxg3QmKGK51O+ac+XGd2RTBy/T4RmV7aeFvuEzQVgbLly53nopOOAkaUoXtiqDjMKxNFPEkLX3F18u0Bf7R1G2jYzwF0qmUVZU/IjNQpOHb6rbb37QIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAIix6f+5hVrNvl2RencUk7kb4vEE6N9xZF5eI2qgp6pHJQqXSfv/gJWu7RJ1Fzyg9uJDTCUNo+l/YLKsTZDqompwFadp3H89HFNbkuGxyrBwh52Iuybdjwt+B/znl+3IDGaHJ3ddA50GYTF8KxogXyfC9BzRSNkS32z5Y9b8l4HJdfcCppsVvf1uFVlYkWshilyTbGgoIZwzyIEb0XRdEUCaO+pI586KIHcS76b0et+JiJOu6gHO2bKZo2AgaojLBs5Tpv9qfnqfOG4fZw6Jwkwxm2e1JacoRR2iMi50BZbNBJCHFgA92zqz1fyZ8fd4C/sImN6znxRdtQtuJNw4w6Y=","cancellation_requested":false,"status":"completed","target":"https://keyvault_name.vault.azure.net/certificates/lroDeleteCertificateName-canwaituntilacertificateisdeleted-","request_id":"670d214fdc6c4319b73adcea51a6190e"}, [
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
  'c0cfeb1c-3412-4518-9ac8-a9c863620c14',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.123.117;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 02 Jul 2020 18:42:31 GMT',
  'Content-Length',
  '1331'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroDeleteCertificateName-canwaituntilacertificateisdeleted-/')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroDeleteCertificateName-canwaituntilacertificateisdeleted-/6d5eb3fd020e443e96896d657405fadd","kid":"https://keyvault_name.vault.azure.net/keys/lroDeleteCertificateName-canwaituntilacertificateisdeleted-/6d5eb3fd020e443e96896d657405fadd","sid":"https://keyvault_name.vault.azure.net/secrets/lroDeleteCertificateName-canwaituntilacertificateisdeleted-/6d5eb3fd020e443e96896d657405fadd","x5t":"pL_tJxvk9pKyTSkgYry1sw6fEMA","cer":"MIIDKDCCAhCgAwIBAgIQC10x9dwbSkCmWbdIb9zFvTANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjAwNzAyMTgzMjMwWhcNMjEwNzAyMTg0MjMwWjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQCh33a5QH3vEUgRPW4CHhfG0m2O3JyBZxAJe6NAGsRnoLIS8w6wqeNeChcOKd4RGyGym2kjrt2/gpSmYwZcJbrw/5LxLe8lUcYOf5tvAKHXZRNEfzX+YiQROSCBfCCwqHp/8ObsDraRb1gjYjI3VSNBULEBl3NwmOy0ROxlulxSbfnOkVCVu4yMLuxcQMRzX1r1AAihjyU/Hf/Kq0iQ/JfiP/8EajeEpFM+6N9jGDdCYoYrnU75pz5cZ3ZFMHL9PhGZXtp4W+4TNBWBsuXLneeik44CRpShe2KoOMwrE0U8SQtfcXXy7QF/tHUbaNjPAXSqZRVlT8iM1Ck4dvqttvftAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBSYwjx7rlmebXEbvvejXweICtwJoDAdBgNVHQ4EFgQUmMI8e65Znm1xG773o18HiArcCaAwDQYJKoZIhvcNAQELBQADggEBAIHkj92OkzJ0oDN09eGP/pqORVInlJfG12vLzuLi/LDlV2vb6LTerMsT7Fdc+gYnWQN8v8tHNT7VjEZmI6K9JuRPRSRAeWddkbb22lqP9kDVE3V0ixnv/feDTqrehlkEARFZlnDXyDH93gZ0s6lGENDsD+58xuoG47dtP+bxj/dDuVxf8CxUdv8gAny5JbfjW0jeSg0TGEa5mcuLN2nAYgbJUX7yyd+wP8oEETWeSbE38rRPAvYLalbbQ/LYejXFMq34IEhXE4egFk2eUo5i1hQfh/v/UEh7b/yAM/wjXUvjGQd3rgmrJ9CvWCwx5Rd9qj/Mqdk3hAHl6WGNYbgGWqg=","attributes":{"enabled":true,"nbf":1593714750,"exp":1625251350,"created":1593715350,"updated":1593715350,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/lroDeleteCertificateName-canwaituntilacertificateisdeleted-/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1593715327,"updated":1593715327}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/lroDeleteCertificateName-canwaituntilacertificateisdeleted-/pending"}}, [
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
  '36cb9d11-3087-4f21-997e-48ae7f1836ec',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.123.117;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 02 Jul 2020 18:42:31 GMT',
  'Content-Length',
  '2650'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/certificates/lroDeleteCertificateName-canwaituntilacertificateisdeleted-')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/lroDeleteCertificateName-canwaituntilacertificateisdeleted-","deletedDate":1593715352,"scheduledPurgeDate":1601491352,"id":"https://keyvault_name.vault.azure.net/certificates/lroDeleteCertificateName-canwaituntilacertificateisdeleted-/6d5eb3fd020e443e96896d657405fadd","kid":"https://keyvault_name.vault.azure.net/keys/lroDeleteCertificateName-canwaituntilacertificateisdeleted-/6d5eb3fd020e443e96896d657405fadd","sid":"https://keyvault_name.vault.azure.net/secrets/lroDeleteCertificateName-canwaituntilacertificateisdeleted-/6d5eb3fd020e443e96896d657405fadd","x5t":"pL_tJxvk9pKyTSkgYry1sw6fEMA","cer":"MIIDKDCCAhCgAwIBAgIQC10x9dwbSkCmWbdIb9zFvTANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjAwNzAyMTgzMjMwWhcNMjEwNzAyMTg0MjMwWjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQCh33a5QH3vEUgRPW4CHhfG0m2O3JyBZxAJe6NAGsRnoLIS8w6wqeNeChcOKd4RGyGym2kjrt2/gpSmYwZcJbrw/5LxLe8lUcYOf5tvAKHXZRNEfzX+YiQROSCBfCCwqHp/8ObsDraRb1gjYjI3VSNBULEBl3NwmOy0ROxlulxSbfnOkVCVu4yMLuxcQMRzX1r1AAihjyU/Hf/Kq0iQ/JfiP/8EajeEpFM+6N9jGDdCYoYrnU75pz5cZ3ZFMHL9PhGZXtp4W+4TNBWBsuXLneeik44CRpShe2KoOMwrE0U8SQtfcXXy7QF/tHUbaNjPAXSqZRVlT8iM1Ck4dvqttvftAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBSYwjx7rlmebXEbvvejXweICtwJoDAdBgNVHQ4EFgQUmMI8e65Znm1xG773o18HiArcCaAwDQYJKoZIhvcNAQELBQADggEBAIHkj92OkzJ0oDN09eGP/pqORVInlJfG12vLzuLi/LDlV2vb6LTerMsT7Fdc+gYnWQN8v8tHNT7VjEZmI6K9JuRPRSRAeWddkbb22lqP9kDVE3V0ixnv/feDTqrehlkEARFZlnDXyDH93gZ0s6lGENDsD+58xuoG47dtP+bxj/dDuVxf8CxUdv8gAny5JbfjW0jeSg0TGEa5mcuLN2nAYgbJUX7yyd+wP8oEETWeSbE38rRPAvYLalbbQ/LYejXFMq34IEhXE4egFk2eUo5i1hQfh/v/UEh7b/yAM/wjXUvjGQd3rgmrJ9CvWCwx5Rd9qj/Mqdk3hAHl6WGNYbgGWqg=","attributes":{"enabled":true,"nbf":1593714750,"exp":1625251350,"created":1593715350,"updated":1593715350,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/lroDeleteCertificateName-canwaituntilacertificateisdeleted-/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1593715327,"updated":1593715327}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/lroDeleteCertificateName-canwaituntilacertificateisdeleted-/pending"}}, [
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
  'bd8e4dec-42e0-42d9-aba6-ad00b16476ce',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.123.117;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 02 Jul 2020 18:42:31 GMT',
  'Content-Length',
  '2862'
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
  'westus',
  'x-ms-request-id',
  '5276e45d-d696-43b4-9a96-f1407dbd26f1',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.123.117;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 02 Jul 2020 18:42:31 GMT'
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
  'westus',
  'x-ms-request-id',
  '6e6ca1aa-8124-49e2-994f-2b1f44f1ad06',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.123.117;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 02 Jul 2020 18:42:32 GMT'
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
  'westus',
  'x-ms-request-id',
  'a756cb46-c38b-460b-af9e-229c8c29640d',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.123.117;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 02 Jul 2020 18:42:33 GMT'
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
  'westus',
  'x-ms-request-id',
  'cb570944-2290-4784-aa2d-95243f902d26',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.123.117;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 02 Jul 2020 18:42:36 GMT'
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
  'westus',
  'x-ms-request-id',
  '38c4671c-e2c6-46a5-a249-1f88273b5e95',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.123.117;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 02 Jul 2020 18:42:38 GMT'
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
  'westus',
  'x-ms-request-id',
  '95d5d2cb-a227-4f64-a88e-86b91f2c6a95',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.123.117;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 02 Jul 2020 18:42:40 GMT'
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
  'westus',
  'x-ms-request-id',
  'e7427527-84c5-4cf8-950f-336564a41f3a',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.123.117;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 02 Jul 2020 18:42:42 GMT'
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
  'westus',
  'x-ms-request-id',
  'db693040-70e2-4497-801b-0f850081f942',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.123.117;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 02 Jul 2020 18:42:44 GMT'
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
  'westus',
  'x-ms-request-id',
  'f1236350-2789-4111-b3b7-2c72b67b4ed0',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.123.117;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 02 Jul 2020 18:42:46 GMT'
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
  'westus',
  'x-ms-request-id',
  'f161dd68-3a3a-4a75-b6c5-f2fb360d35c2',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.123.117;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 02 Jul 2020 18:42:48 GMT'
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
  'westus',
  'x-ms-request-id',
  '0de3c7ef-7337-4225-b227-6d012200d134',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.123.117;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 02 Jul 2020 18:42:50 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroDeleteCertificateName-canwaituntilacertificateisdeleted-')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/lroDeleteCertificateName-canwaituntilacertificateisdeleted-","deletedDate":1593715352,"scheduledPurgeDate":1601491352,"id":"https://keyvault_name.vault.azure.net/certificates/lroDeleteCertificateName-canwaituntilacertificateisdeleted-/6d5eb3fd020e443e96896d657405fadd","kid":"https://keyvault_name.vault.azure.net/keys/lroDeleteCertificateName-canwaituntilacertificateisdeleted-/6d5eb3fd020e443e96896d657405fadd","sid":"https://keyvault_name.vault.azure.net/secrets/lroDeleteCertificateName-canwaituntilacertificateisdeleted-/6d5eb3fd020e443e96896d657405fadd","x5t":"pL_tJxvk9pKyTSkgYry1sw6fEMA","cer":"MIIDKDCCAhCgAwIBAgIQC10x9dwbSkCmWbdIb9zFvTANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjAwNzAyMTgzMjMwWhcNMjEwNzAyMTg0MjMwWjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQCh33a5QH3vEUgRPW4CHhfG0m2O3JyBZxAJe6NAGsRnoLIS8w6wqeNeChcOKd4RGyGym2kjrt2/gpSmYwZcJbrw/5LxLe8lUcYOf5tvAKHXZRNEfzX+YiQROSCBfCCwqHp/8ObsDraRb1gjYjI3VSNBULEBl3NwmOy0ROxlulxSbfnOkVCVu4yMLuxcQMRzX1r1AAihjyU/Hf/Kq0iQ/JfiP/8EajeEpFM+6N9jGDdCYoYrnU75pz5cZ3ZFMHL9PhGZXtp4W+4TNBWBsuXLneeik44CRpShe2KoOMwrE0U8SQtfcXXy7QF/tHUbaNjPAXSqZRVlT8iM1Ck4dvqttvftAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBSYwjx7rlmebXEbvvejXweICtwJoDAdBgNVHQ4EFgQUmMI8e65Znm1xG773o18HiArcCaAwDQYJKoZIhvcNAQELBQADggEBAIHkj92OkzJ0oDN09eGP/pqORVInlJfG12vLzuLi/LDlV2vb6LTerMsT7Fdc+gYnWQN8v8tHNT7VjEZmI6K9JuRPRSRAeWddkbb22lqP9kDVE3V0ixnv/feDTqrehlkEARFZlnDXyDH93gZ0s6lGENDsD+58xuoG47dtP+bxj/dDuVxf8CxUdv8gAny5JbfjW0jeSg0TGEa5mcuLN2nAYgbJUX7yyd+wP8oEETWeSbE38rRPAvYLalbbQ/LYejXFMq34IEhXE4egFk2eUo5i1hQfh/v/UEh7b/yAM/wjXUvjGQd3rgmrJ9CvWCwx5Rd9qj/Mqdk3hAHl6WGNYbgGWqg=","attributes":{"enabled":true,"nbf":1593714750,"exp":1625251350,"created":1593715350,"updated":1593715350,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/lroDeleteCertificateName-canwaituntilacertificateisdeleted-/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1593715327,"updated":1593715327}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/lroDeleteCertificateName-canwaituntilacertificateisdeleted-/pending"}}, [
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
  '32d1987c-848a-4bf9-a2c0-69c487dde4e3',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.123.117;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 02 Jul 2020 18:42:52 GMT',
  'Content-Length',
  '2862'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroDeleteCertificateName-canwaituntilacertificateisdeleted-')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/lroDeleteCertificateName-canwaituntilacertificateisdeleted-","deletedDate":1593715352,"scheduledPurgeDate":1601491352,"id":"https://keyvault_name.vault.azure.net/certificates/lroDeleteCertificateName-canwaituntilacertificateisdeleted-/6d5eb3fd020e443e96896d657405fadd","kid":"https://keyvault_name.vault.azure.net/keys/lroDeleteCertificateName-canwaituntilacertificateisdeleted-/6d5eb3fd020e443e96896d657405fadd","sid":"https://keyvault_name.vault.azure.net/secrets/lroDeleteCertificateName-canwaituntilacertificateisdeleted-/6d5eb3fd020e443e96896d657405fadd","x5t":"pL_tJxvk9pKyTSkgYry1sw6fEMA","cer":"MIIDKDCCAhCgAwIBAgIQC10x9dwbSkCmWbdIb9zFvTANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjAwNzAyMTgzMjMwWhcNMjEwNzAyMTg0MjMwWjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQCh33a5QH3vEUgRPW4CHhfG0m2O3JyBZxAJe6NAGsRnoLIS8w6wqeNeChcOKd4RGyGym2kjrt2/gpSmYwZcJbrw/5LxLe8lUcYOf5tvAKHXZRNEfzX+YiQROSCBfCCwqHp/8ObsDraRb1gjYjI3VSNBULEBl3NwmOy0ROxlulxSbfnOkVCVu4yMLuxcQMRzX1r1AAihjyU/Hf/Kq0iQ/JfiP/8EajeEpFM+6N9jGDdCYoYrnU75pz5cZ3ZFMHL9PhGZXtp4W+4TNBWBsuXLneeik44CRpShe2KoOMwrE0U8SQtfcXXy7QF/tHUbaNjPAXSqZRVlT8iM1Ck4dvqttvftAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBSYwjx7rlmebXEbvvejXweICtwJoDAdBgNVHQ4EFgQUmMI8e65Znm1xG773o18HiArcCaAwDQYJKoZIhvcNAQELBQADggEBAIHkj92OkzJ0oDN09eGP/pqORVInlJfG12vLzuLi/LDlV2vb6LTerMsT7Fdc+gYnWQN8v8tHNT7VjEZmI6K9JuRPRSRAeWddkbb22lqP9kDVE3V0ixnv/feDTqrehlkEARFZlnDXyDH93gZ0s6lGENDsD+58xuoG47dtP+bxj/dDuVxf8CxUdv8gAny5JbfjW0jeSg0TGEa5mcuLN2nAYgbJUX7yyd+wP8oEETWeSbE38rRPAvYLalbbQ/LYejXFMq34IEhXE4egFk2eUo5i1hQfh/v/UEh7b/yAM/wjXUvjGQd3rgmrJ9CvWCwx5Rd9qj/Mqdk3hAHl6WGNYbgGWqg=","attributes":{"enabled":true,"nbf":1593714750,"exp":1625251350,"created":1593715350,"updated":1593715350,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/lroDeleteCertificateName-canwaituntilacertificateisdeleted-/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1593715327,"updated":1593715327}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/lroDeleteCertificateName-canwaituntilacertificateisdeleted-/pending"}}, [
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
  'b75fe980-4d03-4054-b549-908792781b53',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.123.117;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 02 Jul 2020 18:42:52 GMT',
  'Content-Length',
  '2862'
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
  'westus',
  'x-ms-request-id',
  'fc2f9976-ccbd-4c4c-8a3b-8f4171a73988',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.123.117;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 02 Jul 2020 18:42:52 GMT'
]);

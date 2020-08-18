let nock = require('nock');

module.exports.hash = "ec707d968f0551ac53e7cfb22006ab95";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/certificates/CRUDCertificateName-candisableacertificate-/create')
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
  '1f0af59e-fb03-4674-ac02-d0f4e0d51452',
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
  'Thu, 25 Jun 2020 12:53:47 GMT'
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
  'b311e538-50e8-409e-92d8-b96280c5cf00',
  'x-ms-ests-server',
  '2.1.10732.8 - NCUS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AkLulye9J8BEp0D9ZW_gpiM_aSJHAQAAAFuVhtYOAAAA; expires=Sat, 25-Jul-2020 12:53:48 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; SameSite=None; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; SameSite=None; secure; HttpOnly',
  'Date',
  'Thu, 25 Jun 2020 12:53:48 GMT',
  'Content-Length',
  '1315'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/certificates/CRUDCertificateName-candisableacertificate-/create', {"policy":{"key_props":{},"secret_props":{},"x509_props":{"subject":"cn=MyCert","sans":{}},"issuer":{"name":"Self"},"attributes":{}},"attributes":{}})
  .query(true)
  .reply(202, {"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-candisableacertificate-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAkjogivuJ4+J1oCT6B6X+D5MpmmeZnM1S9IQHmsBNwVXd7JVG/K8SDCVvmeQHow2pK5DzXfnGx+GU3KjdYjuubLZrYiv0JPQj6z+EQE2a2d2FbPTNYq9Ug9lXMtq2fhs0PH8F3n3y/ikwYLs2rwAfu/iEVLGordjpj9CJhv5eTXTawiyLqSA3ocCxWhj9l+Ddw5UtSsWXAYhz/Ksj4pzyXVmiNBC+05j/MPQG40WyVjAhQ0BGM2hKvjrj7sFLWINIG7Sobg7zcvrKVlcjQFt1ta25WaQ/D2UVuZJQyVasYXHBrDOeMPdgQZp1iCsfBIgKOvQAsDafwN42qk7C5ViOLQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBADDXtwxC2zIgVu/VXlIzKCCgSGSo6dl0/NeHDn81E49ddmLCDtBBFaFh5hNlCxHbjIzmlDahYtur9anHn5M4mp77Q1mod1dQKQXJ7P9x88HyMrIX0n2i57LrLDCyQSCBSzAA4RhKrDyoZK+W+18WrafGaMjlMUedVyewpbs5gxbpxMDXnIJAADuj/4m38Bo5VNn6uEkcfUunZXFDcnrPly5vm+mok3v60ziBQxqbYY7z6D5LOl9lV1WbaYXv+WzC/3d4p5PQ7NVUwf8mS7IbzHwQMEwX8Z0RtwLRevsnWKL4Ih+MKSUJhy2wiFvD1C5XynuptcAW6P884kWDFnCR0Cc=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"40cceb5237294d85b15df2e8fb0e932b"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-candisableacertificate-/pending?api-version=7.1&request_id=40cceb5237294d85b15df2e8fb0e932b',
  'Retry-After',
  '10',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '95bf9318-c3ca-42be-b940-aeec263fbd75',
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
  'Thu, 25 Jun 2020 12:53:49 GMT',
  'Content-Length',
  '1338'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/CRUDCertificateName-candisableacertificate-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-candisableacertificate-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAkjogivuJ4+J1oCT6B6X+D5MpmmeZnM1S9IQHmsBNwVXd7JVG/K8SDCVvmeQHow2pK5DzXfnGx+GU3KjdYjuubLZrYiv0JPQj6z+EQE2a2d2FbPTNYq9Ug9lXMtq2fhs0PH8F3n3y/ikwYLs2rwAfu/iEVLGordjpj9CJhv5eTXTawiyLqSA3ocCxWhj9l+Ddw5UtSsWXAYhz/Ksj4pzyXVmiNBC+05j/MPQG40WyVjAhQ0BGM2hKvjrj7sFLWINIG7Sobg7zcvrKVlcjQFt1ta25WaQ/D2UVuZJQyVasYXHBrDOeMPdgQZp1iCsfBIgKOvQAsDafwN42qk7C5ViOLQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBADDXtwxC2zIgVu/VXlIzKCCgSGSo6dl0/NeHDn81E49ddmLCDtBBFaFh5hNlCxHbjIzmlDahYtur9anHn5M4mp77Q1mod1dQKQXJ7P9x88HyMrIX0n2i57LrLDCyQSCBSzAA4RhKrDyoZK+W+18WrafGaMjlMUedVyewpbs5gxbpxMDXnIJAADuj/4m38Bo5VNn6uEkcfUunZXFDcnrPly5vm+mok3v60ziBQxqbYY7z6D5LOl9lV1WbaYXv+WzC/3d4p5PQ7NVUwf8mS7IbzHwQMEwX8Z0RtwLRevsnWKL4Ih+MKSUJhy2wiFvD1C5XynuptcAW6P884kWDFnCR0Cc=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"40cceb5237294d85b15df2e8fb0e932b"}, [
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
  '2b1d8ef9-898c-446b-a3ef-8bf9257245fb',
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
  'Thu, 25 Jun 2020 12:53:49 GMT',
  'Content-Length',
  '1338'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/CRUDCertificateName-candisableacertificate-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-candisableacertificate-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAkjogivuJ4+J1oCT6B6X+D5MpmmeZnM1S9IQHmsBNwVXd7JVG/K8SDCVvmeQHow2pK5DzXfnGx+GU3KjdYjuubLZrYiv0JPQj6z+EQE2a2d2FbPTNYq9Ug9lXMtq2fhs0PH8F3n3y/ikwYLs2rwAfu/iEVLGordjpj9CJhv5eTXTawiyLqSA3ocCxWhj9l+Ddw5UtSsWXAYhz/Ksj4pzyXVmiNBC+05j/MPQG40WyVjAhQ0BGM2hKvjrj7sFLWINIG7Sobg7zcvrKVlcjQFt1ta25WaQ/D2UVuZJQyVasYXHBrDOeMPdgQZp1iCsfBIgKOvQAsDafwN42qk7C5ViOLQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBADDXtwxC2zIgVu/VXlIzKCCgSGSo6dl0/NeHDn81E49ddmLCDtBBFaFh5hNlCxHbjIzmlDahYtur9anHn5M4mp77Q1mod1dQKQXJ7P9x88HyMrIX0n2i57LrLDCyQSCBSzAA4RhKrDyoZK+W+18WrafGaMjlMUedVyewpbs5gxbpxMDXnIJAADuj/4m38Bo5VNn6uEkcfUunZXFDcnrPly5vm+mok3v60ziBQxqbYY7z6D5LOl9lV1WbaYXv+WzC/3d4p5PQ7NVUwf8mS7IbzHwQMEwX8Z0RtwLRevsnWKL4Ih+MKSUJhy2wiFvD1C5XynuptcAW6P884kWDFnCR0Cc=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"40cceb5237294d85b15df2e8fb0e932b"}, [
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
  '734010ce-59ea-4568-9921-3ed86a957829',
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
  'Thu, 25 Jun 2020 12:53:49 GMT',
  'Content-Length',
  '1338'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/CRUDCertificateName-candisableacertificate-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-candisableacertificate-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAkjogivuJ4+J1oCT6B6X+D5MpmmeZnM1S9IQHmsBNwVXd7JVG/K8SDCVvmeQHow2pK5DzXfnGx+GU3KjdYjuubLZrYiv0JPQj6z+EQE2a2d2FbPTNYq9Ug9lXMtq2fhs0PH8F3n3y/ikwYLs2rwAfu/iEVLGordjpj9CJhv5eTXTawiyLqSA3ocCxWhj9l+Ddw5UtSsWXAYhz/Ksj4pzyXVmiNBC+05j/MPQG40WyVjAhQ0BGM2hKvjrj7sFLWINIG7Sobg7zcvrKVlcjQFt1ta25WaQ/D2UVuZJQyVasYXHBrDOeMPdgQZp1iCsfBIgKOvQAsDafwN42qk7C5ViOLQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBADDXtwxC2zIgVu/VXlIzKCCgSGSo6dl0/NeHDn81E49ddmLCDtBBFaFh5hNlCxHbjIzmlDahYtur9anHn5M4mp77Q1mod1dQKQXJ7P9x88HyMrIX0n2i57LrLDCyQSCBSzAA4RhKrDyoZK+W+18WrafGaMjlMUedVyewpbs5gxbpxMDXnIJAADuj/4m38Bo5VNn6uEkcfUunZXFDcnrPly5vm+mok3v60ziBQxqbYY7z6D5LOl9lV1WbaYXv+WzC/3d4p5PQ7NVUwf8mS7IbzHwQMEwX8Z0RtwLRevsnWKL4Ih+MKSUJhy2wiFvD1C5XynuptcAW6P884kWDFnCR0Cc=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"40cceb5237294d85b15df2e8fb0e932b"}, [
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
  'a777fb1c-338b-4958-b534-500bede16695',
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
  'Thu, 25 Jun 2020 12:53:51 GMT',
  'Content-Length',
  '1338'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/CRUDCertificateName-candisableacertificate-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-candisableacertificate-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAkjogivuJ4+J1oCT6B6X+D5MpmmeZnM1S9IQHmsBNwVXd7JVG/K8SDCVvmeQHow2pK5DzXfnGx+GU3KjdYjuubLZrYiv0JPQj6z+EQE2a2d2FbPTNYq9Ug9lXMtq2fhs0PH8F3n3y/ikwYLs2rwAfu/iEVLGordjpj9CJhv5eTXTawiyLqSA3ocCxWhj9l+Ddw5UtSsWXAYhz/Ksj4pzyXVmiNBC+05j/MPQG40WyVjAhQ0BGM2hKvjrj7sFLWINIG7Sobg7zcvrKVlcjQFt1ta25WaQ/D2UVuZJQyVasYXHBrDOeMPdgQZp1iCsfBIgKOvQAsDafwN42qk7C5ViOLQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBADDXtwxC2zIgVu/VXlIzKCCgSGSo6dl0/NeHDn81E49ddmLCDtBBFaFh5hNlCxHbjIzmlDahYtur9anHn5M4mp77Q1mod1dQKQXJ7P9x88HyMrIX0n2i57LrLDCyQSCBSzAA4RhKrDyoZK+W+18WrafGaMjlMUedVyewpbs5gxbpxMDXnIJAADuj/4m38Bo5VNn6uEkcfUunZXFDcnrPly5vm+mok3v60ziBQxqbYY7z6D5LOl9lV1WbaYXv+WzC/3d4p5PQ7NVUwf8mS7IbzHwQMEwX8Z0RtwLRevsnWKL4Ih+MKSUJhy2wiFvD1C5XynuptcAW6P884kWDFnCR0Cc=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"40cceb5237294d85b15df2e8fb0e932b"}, [
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
  '025dc24b-9693-48cb-9a2c-5e39393ee368',
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
  'Thu, 25 Jun 2020 12:53:53 GMT',
  'Content-Length',
  '1338'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/CRUDCertificateName-candisableacertificate-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-candisableacertificate-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAkjogivuJ4+J1oCT6B6X+D5MpmmeZnM1S9IQHmsBNwVXd7JVG/K8SDCVvmeQHow2pK5DzXfnGx+GU3KjdYjuubLZrYiv0JPQj6z+EQE2a2d2FbPTNYq9Ug9lXMtq2fhs0PH8F3n3y/ikwYLs2rwAfu/iEVLGordjpj9CJhv5eTXTawiyLqSA3ocCxWhj9l+Ddw5UtSsWXAYhz/Ksj4pzyXVmiNBC+05j/MPQG40WyVjAhQ0BGM2hKvjrj7sFLWINIG7Sobg7zcvrKVlcjQFt1ta25WaQ/D2UVuZJQyVasYXHBrDOeMPdgQZp1iCsfBIgKOvQAsDafwN42qk7C5ViOLQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBADDXtwxC2zIgVu/VXlIzKCCgSGSo6dl0/NeHDn81E49ddmLCDtBBFaFh5hNlCxHbjIzmlDahYtur9anHn5M4mp77Q1mod1dQKQXJ7P9x88HyMrIX0n2i57LrLDCyQSCBSzAA4RhKrDyoZK+W+18WrafGaMjlMUedVyewpbs5gxbpxMDXnIJAADuj/4m38Bo5VNn6uEkcfUunZXFDcnrPly5vm+mok3v60ziBQxqbYY7z6D5LOl9lV1WbaYXv+WzC/3d4p5PQ7NVUwf8mS7IbzHwQMEwX8Z0RtwLRevsnWKL4Ih+MKSUJhy2wiFvD1C5XynuptcAW6P884kWDFnCR0Cc=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"40cceb5237294d85b15df2e8fb0e932b"}, [
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
  'daa31e7b-4bb9-4704-9139-39223b895e31',
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
  'Thu, 25 Jun 2020 12:53:55 GMT',
  'Content-Length',
  '1338'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/CRUDCertificateName-candisableacertificate-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-candisableacertificate-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAkjogivuJ4+J1oCT6B6X+D5MpmmeZnM1S9IQHmsBNwVXd7JVG/K8SDCVvmeQHow2pK5DzXfnGx+GU3KjdYjuubLZrYiv0JPQj6z+EQE2a2d2FbPTNYq9Ug9lXMtq2fhs0PH8F3n3y/ikwYLs2rwAfu/iEVLGordjpj9CJhv5eTXTawiyLqSA3ocCxWhj9l+Ddw5UtSsWXAYhz/Ksj4pzyXVmiNBC+05j/MPQG40WyVjAhQ0BGM2hKvjrj7sFLWINIG7Sobg7zcvrKVlcjQFt1ta25WaQ/D2UVuZJQyVasYXHBrDOeMPdgQZp1iCsfBIgKOvQAsDafwN42qk7C5ViOLQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBADDXtwxC2zIgVu/VXlIzKCCgSGSo6dl0/NeHDn81E49ddmLCDtBBFaFh5hNlCxHbjIzmlDahYtur9anHn5M4mp77Q1mod1dQKQXJ7P9x88HyMrIX0n2i57LrLDCyQSCBSzAA4RhKrDyoZK+W+18WrafGaMjlMUedVyewpbs5gxbpxMDXnIJAADuj/4m38Bo5VNn6uEkcfUunZXFDcnrPly5vm+mok3v60ziBQxqbYY7z6D5LOl9lV1WbaYXv+WzC/3d4p5PQ7NVUwf8mS7IbzHwQMEwX8Z0RtwLRevsnWKL4Ih+MKSUJhy2wiFvD1C5XynuptcAW6P884kWDFnCR0Cc=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"40cceb5237294d85b15df2e8fb0e932b"}, [
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
  'cd396e7f-1556-4965-a936-7abb1eb0f12c',
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
  'Thu, 25 Jun 2020 12:53:57 GMT',
  'Content-Length',
  '1338'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/CRUDCertificateName-candisableacertificate-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-candisableacertificate-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAkjogivuJ4+J1oCT6B6X+D5MpmmeZnM1S9IQHmsBNwVXd7JVG/K8SDCVvmeQHow2pK5DzXfnGx+GU3KjdYjuubLZrYiv0JPQj6z+EQE2a2d2FbPTNYq9Ug9lXMtq2fhs0PH8F3n3y/ikwYLs2rwAfu/iEVLGordjpj9CJhv5eTXTawiyLqSA3ocCxWhj9l+Ddw5UtSsWXAYhz/Ksj4pzyXVmiNBC+05j/MPQG40WyVjAhQ0BGM2hKvjrj7sFLWINIG7Sobg7zcvrKVlcjQFt1ta25WaQ/D2UVuZJQyVasYXHBrDOeMPdgQZp1iCsfBIgKOvQAsDafwN42qk7C5ViOLQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBADDXtwxC2zIgVu/VXlIzKCCgSGSo6dl0/NeHDn81E49ddmLCDtBBFaFh5hNlCxHbjIzmlDahYtur9anHn5M4mp77Q1mod1dQKQXJ7P9x88HyMrIX0n2i57LrLDCyQSCBSzAA4RhKrDyoZK+W+18WrafGaMjlMUedVyewpbs5gxbpxMDXnIJAADuj/4m38Bo5VNn6uEkcfUunZXFDcnrPly5vm+mok3v60ziBQxqbYY7z6D5LOl9lV1WbaYXv+WzC/3d4p5PQ7NVUwf8mS7IbzHwQMEwX8Z0RtwLRevsnWKL4Ih+MKSUJhy2wiFvD1C5XynuptcAW6P884kWDFnCR0Cc=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"40cceb5237294d85b15df2e8fb0e932b"}, [
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
  '53362d5a-749b-400b-a2c8-f99a37caf925',
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
  'Thu, 25 Jun 2020 12:53:59 GMT',
  'Content-Length',
  '1338'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/CRUDCertificateName-candisableacertificate-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-candisableacertificate-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAkjogivuJ4+J1oCT6B6X+D5MpmmeZnM1S9IQHmsBNwVXd7JVG/K8SDCVvmeQHow2pK5DzXfnGx+GU3KjdYjuubLZrYiv0JPQj6z+EQE2a2d2FbPTNYq9Ug9lXMtq2fhs0PH8F3n3y/ikwYLs2rwAfu/iEVLGordjpj9CJhv5eTXTawiyLqSA3ocCxWhj9l+Ddw5UtSsWXAYhz/Ksj4pzyXVmiNBC+05j/MPQG40WyVjAhQ0BGM2hKvjrj7sFLWINIG7Sobg7zcvrKVlcjQFt1ta25WaQ/D2UVuZJQyVasYXHBrDOeMPdgQZp1iCsfBIgKOvQAsDafwN42qk7C5ViOLQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBADDXtwxC2zIgVu/VXlIzKCCgSGSo6dl0/NeHDn81E49ddmLCDtBBFaFh5hNlCxHbjIzmlDahYtur9anHn5M4mp77Q1mod1dQKQXJ7P9x88HyMrIX0n2i57LrLDCyQSCBSzAA4RhKrDyoZK+W+18WrafGaMjlMUedVyewpbs5gxbpxMDXnIJAADuj/4m38Bo5VNn6uEkcfUunZXFDcnrPly5vm+mok3v60ziBQxqbYY7z6D5LOl9lV1WbaYXv+WzC/3d4p5PQ7NVUwf8mS7IbzHwQMEwX8Z0RtwLRevsnWKL4Ih+MKSUJhy2wiFvD1C5XynuptcAW6P884kWDFnCR0Cc=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"40cceb5237294d85b15df2e8fb0e932b"}, [
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
  '9fc848f7-b768-4b00-92c3-f8056794df44',
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
  'Thu, 25 Jun 2020 12:54:01 GMT',
  'Content-Length',
  '1338'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/CRUDCertificateName-candisableacertificate-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-candisableacertificate-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAkjogivuJ4+J1oCT6B6X+D5MpmmeZnM1S9IQHmsBNwVXd7JVG/K8SDCVvmeQHow2pK5DzXfnGx+GU3KjdYjuubLZrYiv0JPQj6z+EQE2a2d2FbPTNYq9Ug9lXMtq2fhs0PH8F3n3y/ikwYLs2rwAfu/iEVLGordjpj9CJhv5eTXTawiyLqSA3ocCxWhj9l+Ddw5UtSsWXAYhz/Ksj4pzyXVmiNBC+05j/MPQG40WyVjAhQ0BGM2hKvjrj7sFLWINIG7Sobg7zcvrKVlcjQFt1ta25WaQ/D2UVuZJQyVasYXHBrDOeMPdgQZp1iCsfBIgKOvQAsDafwN42qk7C5ViOLQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBADDXtwxC2zIgVu/VXlIzKCCgSGSo6dl0/NeHDn81E49ddmLCDtBBFaFh5hNlCxHbjIzmlDahYtur9anHn5M4mp77Q1mod1dQKQXJ7P9x88HyMrIX0n2i57LrLDCyQSCBSzAA4RhKrDyoZK+W+18WrafGaMjlMUedVyewpbs5gxbpxMDXnIJAADuj/4m38Bo5VNn6uEkcfUunZXFDcnrPly5vm+mok3v60ziBQxqbYY7z6D5LOl9lV1WbaYXv+WzC/3d4p5PQ7NVUwf8mS7IbzHwQMEwX8Z0RtwLRevsnWKL4Ih+MKSUJhy2wiFvD1C5XynuptcAW6P884kWDFnCR0Cc=","cancellation_requested":false,"status":"completed","target":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-candisableacertificate-","request_id":"40cceb5237294d85b15df2e8fb0e932b"}, [
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
  '8517fe97-6b9d-4aaa-bb8e-31e475a66fbc',
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
  'Thu, 25 Jun 2020 12:54:03 GMT',
  'Content-Length',
  '1303'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/CRUDCertificateName-candisableacertificate-/')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-candisableacertificate-/3dc1b4dceefc46669548a2585d92113f","kid":"https://keyvault_name.vault.azure.net/keys/CRUDCertificateName-candisableacertificate-/3dc1b4dceefc46669548a2585d92113f","sid":"https://keyvault_name.vault.azure.net/secrets/CRUDCertificateName-candisableacertificate-/3dc1b4dceefc46669548a2585d92113f","x5t":"EopeswUDNo3FUzhDeY_E9iep0NA","cer":"MIIDKDCCAhCgAwIBAgIQN/eV9E1/Road8iwfqIKZ+zANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjAwNjI1MTI0NDAyWhcNMjEwNjI1MTI1NDAyWjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQCSOiCK+4nj4nWgJPoHpf4PkymaZ5mczVL0hAeawE3BVd3slUb8rxIMJW+Z5AejDakrkPNd+cbH4ZTcqN1iO65stmtiK/Qk9CPrP4RATZrZ3YVs9M1ir1SD2Vcy2rZ+GzQ8fwXeffL+KTBguzavAB+7+IRUsait2OmP0ImG/l5NdNrCLIupIDehwLFaGP2X4N3DlS1KxZcBiHP8qyPinPJdWaI0EL7TmP8w9AbjRbJWMCFDQEYzaEq+OuPuwUtYg0gbtKhuDvNy+spWVyNAW3W1rblZpD8PZRW5klDJVqxhccGsM54w92BBmnWIKx8EiAo69ACwNp/A3jaqTsLlWI4tAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBRsIkSuuriWbANTHlfBwTuxHeHWizAdBgNVHQ4EFgQUbCJErrq4lmwDUx5XwcE7sR3h1oswDQYJKoZIhvcNAQELBQADggEBACSGhhN/p4+tf+C68xujXQ+PLPZGst8i5rtwrKHiippVcaIMTOfWcBXgrz0H0QYMM12Ocj70SVA/gm3nvTP1ry/wiG5CGhNV11VYB7oKW9U0M3OvNcGYDZNlRuPte9C+h2sW+htqwLRZ1/p14LSbViylNJvH1Y30WxDKHlqORVJ9zd67Q5+ji+X50FKhg1fbts5E3nK3iVuvQK5pHXq6c5u/VDBDVsb8OvGjbtAAjQOxd2XU8vLyQO2tOm/k8IzNbDeFfjRBtm1qHxUIylHczBcj87u0LetYxT9w3vA7Ag7mpwwVK1Kn0X5qYYCd+klP3lDX2aS8nuQoIZ2S21ZisIQ=","attributes":{"enabled":true,"nbf":1593089042,"exp":1624625642,"created":1593089642,"updated":1593089642,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-candisableacertificate-/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1593089629,"updated":1593089629}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-candisableacertificate-/pending"}}, [
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
  '1c8d7a38-bb2b-4db6-ba79-2a07ad2f3df6',
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
  'Thu, 25 Jun 2020 12:54:03 GMT',
  'Content-Length',
  '2580'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .patch('/certificates/CRUDCertificateName-candisableacertificate-/', {"attributes":{"enabled":false}})
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-candisableacertificate-/3dc1b4dceefc46669548a2585d92113f","kid":"https://keyvault_name.vault.azure.net/keys/CRUDCertificateName-candisableacertificate-/3dc1b4dceefc46669548a2585d92113f","sid":"https://keyvault_name.vault.azure.net/secrets/CRUDCertificateName-candisableacertificate-/3dc1b4dceefc46669548a2585d92113f","x5t":"EopeswUDNo3FUzhDeY_E9iep0NA","cer":"MIIDKDCCAhCgAwIBAgIQN/eV9E1/Road8iwfqIKZ+zANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjAwNjI1MTI0NDAyWhcNMjEwNjI1MTI1NDAyWjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQCSOiCK+4nj4nWgJPoHpf4PkymaZ5mczVL0hAeawE3BVd3slUb8rxIMJW+Z5AejDakrkPNd+cbH4ZTcqN1iO65stmtiK/Qk9CPrP4RATZrZ3YVs9M1ir1SD2Vcy2rZ+GzQ8fwXeffL+KTBguzavAB+7+IRUsait2OmP0ImG/l5NdNrCLIupIDehwLFaGP2X4N3DlS1KxZcBiHP8qyPinPJdWaI0EL7TmP8w9AbjRbJWMCFDQEYzaEq+OuPuwUtYg0gbtKhuDvNy+spWVyNAW3W1rblZpD8PZRW5klDJVqxhccGsM54w92BBmnWIKx8EiAo69ACwNp/A3jaqTsLlWI4tAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBRsIkSuuriWbANTHlfBwTuxHeHWizAdBgNVHQ4EFgQUbCJErrq4lmwDUx5XwcE7sR3h1oswDQYJKoZIhvcNAQELBQADggEBACSGhhN/p4+tf+C68xujXQ+PLPZGst8i5rtwrKHiippVcaIMTOfWcBXgrz0H0QYMM12Ocj70SVA/gm3nvTP1ry/wiG5CGhNV11VYB7oKW9U0M3OvNcGYDZNlRuPte9C+h2sW+htqwLRZ1/p14LSbViylNJvH1Y30WxDKHlqORVJ9zd67Q5+ji+X50FKhg1fbts5E3nK3iVuvQK5pHXq6c5u/VDBDVsb8OvGjbtAAjQOxd2XU8vLyQO2tOm/k8IzNbDeFfjRBtm1qHxUIylHczBcj87u0LetYxT9w3vA7Ag7mpwwVK1Kn0X5qYYCd+klP3lDX2aS8nuQoIZ2S21ZisIQ=","attributes":{"enabled":false,"nbf":1593089042,"exp":1624625642,"created":1593089642,"updated":1593089644,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-candisableacertificate-/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1593089629,"updated":1593089629}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-candisableacertificate-/pending"}}, [
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
  'e1210948-f462-4078-979f-cd753fbbf7d9',
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
  'Thu, 25 Jun 2020 12:54:03 GMT',
  'Content-Length',
  '2581'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/CRUDCertificateName-candisableacertificate-/')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-candisableacertificate-/3dc1b4dceefc46669548a2585d92113f","kid":"https://keyvault_name.vault.azure.net/keys/CRUDCertificateName-candisableacertificate-/3dc1b4dceefc46669548a2585d92113f","sid":"https://keyvault_name.vault.azure.net/secrets/CRUDCertificateName-candisableacertificate-/3dc1b4dceefc46669548a2585d92113f","x5t":"EopeswUDNo3FUzhDeY_E9iep0NA","cer":"MIIDKDCCAhCgAwIBAgIQN/eV9E1/Road8iwfqIKZ+zANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjAwNjI1MTI0NDAyWhcNMjEwNjI1MTI1NDAyWjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQCSOiCK+4nj4nWgJPoHpf4PkymaZ5mczVL0hAeawE3BVd3slUb8rxIMJW+Z5AejDakrkPNd+cbH4ZTcqN1iO65stmtiK/Qk9CPrP4RATZrZ3YVs9M1ir1SD2Vcy2rZ+GzQ8fwXeffL+KTBguzavAB+7+IRUsait2OmP0ImG/l5NdNrCLIupIDehwLFaGP2X4N3DlS1KxZcBiHP8qyPinPJdWaI0EL7TmP8w9AbjRbJWMCFDQEYzaEq+OuPuwUtYg0gbtKhuDvNy+spWVyNAW3W1rblZpD8PZRW5klDJVqxhccGsM54w92BBmnWIKx8EiAo69ACwNp/A3jaqTsLlWI4tAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBRsIkSuuriWbANTHlfBwTuxHeHWizAdBgNVHQ4EFgQUbCJErrq4lmwDUx5XwcE7sR3h1oswDQYJKoZIhvcNAQELBQADggEBACSGhhN/p4+tf+C68xujXQ+PLPZGst8i5rtwrKHiippVcaIMTOfWcBXgrz0H0QYMM12Ocj70SVA/gm3nvTP1ry/wiG5CGhNV11VYB7oKW9U0M3OvNcGYDZNlRuPte9C+h2sW+htqwLRZ1/p14LSbViylNJvH1Y30WxDKHlqORVJ9zd67Q5+ji+X50FKhg1fbts5E3nK3iVuvQK5pHXq6c5u/VDBDVsb8OvGjbtAAjQOxd2XU8vLyQO2tOm/k8IzNbDeFfjRBtm1qHxUIylHczBcj87u0LetYxT9w3vA7Ag7mpwwVK1Kn0X5qYYCd+klP3lDX2aS8nuQoIZ2S21ZisIQ=","attributes":{"enabled":false,"nbf":1593089042,"exp":1624625642,"created":1593089642,"updated":1593089644,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-candisableacertificate-/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1593089629,"updated":1593089629}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-candisableacertificate-/pending"}}, [
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
  '23871be5-913e-4404-8391-7f419b4e830f',
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
  'Thu, 25 Jun 2020 12:54:03 GMT',
  'Content-Length',
  '2581'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/certificates/CRUDCertificateName-candisableacertificate-')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/CRUDCertificateName-candisableacertificate-","deletedDate":1593089644,"scheduledPurgeDate":1600865644,"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-candisableacertificate-/3dc1b4dceefc46669548a2585d92113f","kid":"https://keyvault_name.vault.azure.net/keys/CRUDCertificateName-candisableacertificate-/3dc1b4dceefc46669548a2585d92113f","sid":"https://keyvault_name.vault.azure.net/secrets/CRUDCertificateName-candisableacertificate-/3dc1b4dceefc46669548a2585d92113f","x5t":"EopeswUDNo3FUzhDeY_E9iep0NA","cer":"MIIDKDCCAhCgAwIBAgIQN/eV9E1/Road8iwfqIKZ+zANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjAwNjI1MTI0NDAyWhcNMjEwNjI1MTI1NDAyWjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQCSOiCK+4nj4nWgJPoHpf4PkymaZ5mczVL0hAeawE3BVd3slUb8rxIMJW+Z5AejDakrkPNd+cbH4ZTcqN1iO65stmtiK/Qk9CPrP4RATZrZ3YVs9M1ir1SD2Vcy2rZ+GzQ8fwXeffL+KTBguzavAB+7+IRUsait2OmP0ImG/l5NdNrCLIupIDehwLFaGP2X4N3DlS1KxZcBiHP8qyPinPJdWaI0EL7TmP8w9AbjRbJWMCFDQEYzaEq+OuPuwUtYg0gbtKhuDvNy+spWVyNAW3W1rblZpD8PZRW5klDJVqxhccGsM54w92BBmnWIKx8EiAo69ACwNp/A3jaqTsLlWI4tAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBRsIkSuuriWbANTHlfBwTuxHeHWizAdBgNVHQ4EFgQUbCJErrq4lmwDUx5XwcE7sR3h1oswDQYJKoZIhvcNAQELBQADggEBACSGhhN/p4+tf+C68xujXQ+PLPZGst8i5rtwrKHiippVcaIMTOfWcBXgrz0H0QYMM12Ocj70SVA/gm3nvTP1ry/wiG5CGhNV11VYB7oKW9U0M3OvNcGYDZNlRuPte9C+h2sW+htqwLRZ1/p14LSbViylNJvH1Y30WxDKHlqORVJ9zd67Q5+ji+X50FKhg1fbts5E3nK3iVuvQK5pHXq6c5u/VDBDVsb8OvGjbtAAjQOxd2XU8vLyQO2tOm/k8IzNbDeFfjRBtm1qHxUIylHczBcj87u0LetYxT9w3vA7Ag7mpwwVK1Kn0X5qYYCd+klP3lDX2aS8nuQoIZ2S21ZisIQ=","attributes":{"enabled":false,"nbf":1593089042,"exp":1624625642,"created":1593089642,"updated":1593089644,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-candisableacertificate-/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1593089629,"updated":1593089629}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-candisableacertificate-/pending"}}, [
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
  '74f5faa8-0c3a-411f-b29e-a958edcfa923',
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
  'Thu, 25 Jun 2020 12:54:03 GMT',
  'Content-Length',
  '2779'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/CRUDCertificateName-candisableacertificate-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: CRUDCertificateName-candisableacertificate-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '146',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '070ff9f1-ad3d-496f-ae8b-8186fd04c6bd',
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
  'Thu, 25 Jun 2020 12:54:03 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/CRUDCertificateName-candisableacertificate-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: CRUDCertificateName-candisableacertificate-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '146',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'a5268c0b-9547-4e5c-b7fe-975713a34f85',
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
  'Thu, 25 Jun 2020 12:54:03 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/CRUDCertificateName-candisableacertificate-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: CRUDCertificateName-candisableacertificate-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '146',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'ceecb0b5-a85e-4aef-963a-f75530c399d1',
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
  'Thu, 25 Jun 2020 12:54:05 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/CRUDCertificateName-candisableacertificate-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: CRUDCertificateName-candisableacertificate-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '146',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'a61a89b7-9c93-4921-b6ef-036785f9c86e',
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
  'Thu, 25 Jun 2020 12:54:09 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/CRUDCertificateName-candisableacertificate-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: CRUDCertificateName-candisableacertificate-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '146',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '39a66086-fbcb-4a33-b432-cbd4e89a61a5',
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
  'Thu, 25 Jun 2020 12:54:11 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/CRUDCertificateName-candisableacertificate-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: CRUDCertificateName-candisableacertificate-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '146',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'f9ffd2fe-18a5-4143-b1ce-0831435295fc',
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
  'Thu, 25 Jun 2020 12:54:12 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/CRUDCertificateName-candisableacertificate-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: CRUDCertificateName-candisableacertificate-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '146',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '0077e52e-a032-47f2-82d7-0755b6a692f8',
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
  'Thu, 25 Jun 2020 12:54:15 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/CRUDCertificateName-candisableacertificate-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: CRUDCertificateName-candisableacertificate-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '146',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'badf6f35-76af-44ea-910f-c2b6803a2a33',
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
  'Thu, 25 Jun 2020 12:54:16 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/CRUDCertificateName-candisableacertificate-')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/CRUDCertificateName-candisableacertificate-","deletedDate":1593089644,"scheduledPurgeDate":1600865644,"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-candisableacertificate-/3dc1b4dceefc46669548a2585d92113f","kid":"https://keyvault_name.vault.azure.net/keys/CRUDCertificateName-candisableacertificate-/3dc1b4dceefc46669548a2585d92113f","sid":"https://keyvault_name.vault.azure.net/secrets/CRUDCertificateName-candisableacertificate-/3dc1b4dceefc46669548a2585d92113f","x5t":"EopeswUDNo3FUzhDeY_E9iep0NA","cer":"MIIDKDCCAhCgAwIBAgIQN/eV9E1/Road8iwfqIKZ+zANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjAwNjI1MTI0NDAyWhcNMjEwNjI1MTI1NDAyWjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQCSOiCK+4nj4nWgJPoHpf4PkymaZ5mczVL0hAeawE3BVd3slUb8rxIMJW+Z5AejDakrkPNd+cbH4ZTcqN1iO65stmtiK/Qk9CPrP4RATZrZ3YVs9M1ir1SD2Vcy2rZ+GzQ8fwXeffL+KTBguzavAB+7+IRUsait2OmP0ImG/l5NdNrCLIupIDehwLFaGP2X4N3DlS1KxZcBiHP8qyPinPJdWaI0EL7TmP8w9AbjRbJWMCFDQEYzaEq+OuPuwUtYg0gbtKhuDvNy+spWVyNAW3W1rblZpD8PZRW5klDJVqxhccGsM54w92BBmnWIKx8EiAo69ACwNp/A3jaqTsLlWI4tAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBRsIkSuuriWbANTHlfBwTuxHeHWizAdBgNVHQ4EFgQUbCJErrq4lmwDUx5XwcE7sR3h1oswDQYJKoZIhvcNAQELBQADggEBACSGhhN/p4+tf+C68xujXQ+PLPZGst8i5rtwrKHiippVcaIMTOfWcBXgrz0H0QYMM12Ocj70SVA/gm3nvTP1ry/wiG5CGhNV11VYB7oKW9U0M3OvNcGYDZNlRuPte9C+h2sW+htqwLRZ1/p14LSbViylNJvH1Y30WxDKHlqORVJ9zd67Q5+ji+X50FKhg1fbts5E3nK3iVuvQK5pHXq6c5u/VDBDVsb8OvGjbtAAjQOxd2XU8vLyQO2tOm/k8IzNbDeFfjRBtm1qHxUIylHczBcj87u0LetYxT9w3vA7Ag7mpwwVK1Kn0X5qYYCd+klP3lDX2aS8nuQoIZ2S21ZisIQ=","attributes":{"enabled":false,"nbf":1593089042,"exp":1624625642,"created":1593089642,"updated":1593089644,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-candisableacertificate-/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1593089629,"updated":1593089629}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-candisableacertificate-/pending"}}, [
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
  '9be17652-8069-4574-8211-e766cfb27eb0',
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
  'Thu, 25 Jun 2020 12:54:18 GMT',
  'Content-Length',
  '2779'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedcertificates/CRUDCertificateName-candisableacertificate-')
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
  '466be730-ed63-4cab-92ee-0c8062128665',
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
  'Thu, 25 Jun 2020 12:54:19 GMT'
]);

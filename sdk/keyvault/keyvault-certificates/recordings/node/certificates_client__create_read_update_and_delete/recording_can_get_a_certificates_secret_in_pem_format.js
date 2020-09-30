let nock = require('nock');

module.exports.hash = "6881173a07bb2a37f9e0f24fe98518a0";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/certificates/CRUDCertificateName-cangetacertificatessecretinPEMformat-/create')
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
  'feb0f93d-e9bf-4848-89c9-2ed1d0936dc2',
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
  'Thu, 25 Jun 2020 12:55:40 GMT'
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
  'b089d528-668e-4c4b-a761-a895ec07d800',
  'x-ms-ests-server',
  '2.1.10732.8 - NCUS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=An_cavHvzTFGpYjHxbjSbe0_aSJHAQAAAMyVhtYOAAAA; expires=Sat, 25-Jul-2020 12:55:40 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; SameSite=None; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; SameSite=None; secure; HttpOnly',
  'Date',
  'Thu, 25 Jun 2020 12:55:39 GMT',
  'Content-Length',
  '1315'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/certificates/CRUDCertificateName-cangetacertificatessecretinPEMformat-/create', {"policy":{"key_props":{},"secret_props":{"contentType":"application/x-pem-file"},"x509_props":{"subject":"cn=MyCert","sans":{}},"issuer":{"name":"Self"},"attributes":{}},"attributes":{}})
  .query(true)
  .reply(202, {"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-cangetacertificatessecretinPEMformat-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAyKSJ0CAhCb/xUcVetNQCBkW8utMUmGncFO4hBO4daxbVnHVGc08cy8mUJfBRb7XhWnr6eL884qnt842OfP1nK8qx4jhoamSDgWk2F9i/+Eaw8oIrGCfVr8CZuy5yiIr13A+sJgHCE+SGGcosi1hVm+vt4CRjtH5xC1AS/fExV6bDb1CSYQNWhxDYup2YaqXUlfg9wX5kSWai1qEj242W9CgDUDsN7h2foFbFfG7YvSrYHVan/OFLoauzxyy0lNb8fAKyhdQ4owtS2wiEwV4T9+NO4w7V5RgjQc084RGVrRJyhg0oJgLIWGlEMBisD44NcIc9ud80AydO+w9L/DlaVQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBADWtQuvCbhrjGCeziapCgvLPjmm/a782V0+EpyUrwxxHNokuoVSxJv0SlzcVoHAatZM64NJD/O8YIbW7iViXK1y2MNLyIC02MAe/46PCTUolIJ0+ifPs8i1o65WWhAiWuIdKEaiFiluKz7QZUXV/I47eRPiw5e8ye8WAzMDkChAW7XllXdmN0ehaik/2wUzmotykDKVglPW7HsDFyjkVRKeWEqRBuT88beNdQR6mz1JEZsjF1jy5tro7kXv0wz5QiiErVkxqiUiZXPliC1x2SoZ5rLYdXsPS/+XPr5vG9miYgxEhfAhAuSfwEhIuzoA7cxrbnsWm5vL8r5AIJ5N6A+A=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"3b50d3d749524b288ee0bdd4763d1424"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-cangetacertificatessecretinPEMformat-/pending?api-version=7.1&request_id=3b50d3d749524b288ee0bdd4763d1424',
  'Retry-After',
  '10',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '5313cc16-af4c-423e-aec9-0b8902304323',
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
  'Thu, 25 Jun 2020 12:55:40 GMT',
  'Content-Length',
  '1349'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/CRUDCertificateName-cangetacertificatessecretinPEMformat-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-cangetacertificatessecretinPEMformat-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAyKSJ0CAhCb/xUcVetNQCBkW8utMUmGncFO4hBO4daxbVnHVGc08cy8mUJfBRb7XhWnr6eL884qnt842OfP1nK8qx4jhoamSDgWk2F9i/+Eaw8oIrGCfVr8CZuy5yiIr13A+sJgHCE+SGGcosi1hVm+vt4CRjtH5xC1AS/fExV6bDb1CSYQNWhxDYup2YaqXUlfg9wX5kSWai1qEj242W9CgDUDsN7h2foFbFfG7YvSrYHVan/OFLoauzxyy0lNb8fAKyhdQ4owtS2wiEwV4T9+NO4w7V5RgjQc084RGVrRJyhg0oJgLIWGlEMBisD44NcIc9ud80AydO+w9L/DlaVQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBADWtQuvCbhrjGCeziapCgvLPjmm/a782V0+EpyUrwxxHNokuoVSxJv0SlzcVoHAatZM64NJD/O8YIbW7iViXK1y2MNLyIC02MAe/46PCTUolIJ0+ifPs8i1o65WWhAiWuIdKEaiFiluKz7QZUXV/I47eRPiw5e8ye8WAzMDkChAW7XllXdmN0ehaik/2wUzmotykDKVglPW7HsDFyjkVRKeWEqRBuT88beNdQR6mz1JEZsjF1jy5tro7kXv0wz5QiiErVkxqiUiZXPliC1x2SoZ5rLYdXsPS/+XPr5vG9miYgxEhfAhAuSfwEhIuzoA7cxrbnsWm5vL8r5AIJ5N6A+A=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"3b50d3d749524b288ee0bdd4763d1424"}, [
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
  '81d52a98-cc96-47e0-80cd-8371b4ecc1f8',
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
  'Thu, 25 Jun 2020 12:55:40 GMT',
  'Content-Length',
  '1349'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/CRUDCertificateName-cangetacertificatessecretinPEMformat-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-cangetacertificatessecretinPEMformat-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAyKSJ0CAhCb/xUcVetNQCBkW8utMUmGncFO4hBO4daxbVnHVGc08cy8mUJfBRb7XhWnr6eL884qnt842OfP1nK8qx4jhoamSDgWk2F9i/+Eaw8oIrGCfVr8CZuy5yiIr13A+sJgHCE+SGGcosi1hVm+vt4CRjtH5xC1AS/fExV6bDb1CSYQNWhxDYup2YaqXUlfg9wX5kSWai1qEj242W9CgDUDsN7h2foFbFfG7YvSrYHVan/OFLoauzxyy0lNb8fAKyhdQ4owtS2wiEwV4T9+NO4w7V5RgjQc084RGVrRJyhg0oJgLIWGlEMBisD44NcIc9ud80AydO+w9L/DlaVQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBADWtQuvCbhrjGCeziapCgvLPjmm/a782V0+EpyUrwxxHNokuoVSxJv0SlzcVoHAatZM64NJD/O8YIbW7iViXK1y2MNLyIC02MAe/46PCTUolIJ0+ifPs8i1o65WWhAiWuIdKEaiFiluKz7QZUXV/I47eRPiw5e8ye8WAzMDkChAW7XllXdmN0ehaik/2wUzmotykDKVglPW7HsDFyjkVRKeWEqRBuT88beNdQR6mz1JEZsjF1jy5tro7kXv0wz5QiiErVkxqiUiZXPliC1x2SoZ5rLYdXsPS/+XPr5vG9miYgxEhfAhAuSfwEhIuzoA7cxrbnsWm5vL8r5AIJ5N6A+A=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"3b50d3d749524b288ee0bdd4763d1424"}, [
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
  '18173b5a-e51c-403b-b268-b3720ce62330',
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
  'Thu, 25 Jun 2020 12:55:40 GMT',
  'Content-Length',
  '1349'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/CRUDCertificateName-cangetacertificatessecretinPEMformat-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-cangetacertificatessecretinPEMformat-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAyKSJ0CAhCb/xUcVetNQCBkW8utMUmGncFO4hBO4daxbVnHVGc08cy8mUJfBRb7XhWnr6eL884qnt842OfP1nK8qx4jhoamSDgWk2F9i/+Eaw8oIrGCfVr8CZuy5yiIr13A+sJgHCE+SGGcosi1hVm+vt4CRjtH5xC1AS/fExV6bDb1CSYQNWhxDYup2YaqXUlfg9wX5kSWai1qEj242W9CgDUDsN7h2foFbFfG7YvSrYHVan/OFLoauzxyy0lNb8fAKyhdQ4owtS2wiEwV4T9+NO4w7V5RgjQc084RGVrRJyhg0oJgLIWGlEMBisD44NcIc9ud80AydO+w9L/DlaVQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBADWtQuvCbhrjGCeziapCgvLPjmm/a782V0+EpyUrwxxHNokuoVSxJv0SlzcVoHAatZM64NJD/O8YIbW7iViXK1y2MNLyIC02MAe/46PCTUolIJ0+ifPs8i1o65WWhAiWuIdKEaiFiluKz7QZUXV/I47eRPiw5e8ye8WAzMDkChAW7XllXdmN0ehaik/2wUzmotykDKVglPW7HsDFyjkVRKeWEqRBuT88beNdQR6mz1JEZsjF1jy5tro7kXv0wz5QiiErVkxqiUiZXPliC1x2SoZ5rLYdXsPS/+XPr5vG9miYgxEhfAhAuSfwEhIuzoA7cxrbnsWm5vL8r5AIJ5N6A+A=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"3b50d3d749524b288ee0bdd4763d1424"}, [
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
  '06a03f46-2edc-4ee0-aa0a-08288df9da1b',
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
  'Thu, 25 Jun 2020 12:55:42 GMT',
  'Content-Length',
  '1349'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/CRUDCertificateName-cangetacertificatessecretinPEMformat-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-cangetacertificatessecretinPEMformat-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAyKSJ0CAhCb/xUcVetNQCBkW8utMUmGncFO4hBO4daxbVnHVGc08cy8mUJfBRb7XhWnr6eL884qnt842OfP1nK8qx4jhoamSDgWk2F9i/+Eaw8oIrGCfVr8CZuy5yiIr13A+sJgHCE+SGGcosi1hVm+vt4CRjtH5xC1AS/fExV6bDb1CSYQNWhxDYup2YaqXUlfg9wX5kSWai1qEj242W9CgDUDsN7h2foFbFfG7YvSrYHVan/OFLoauzxyy0lNb8fAKyhdQ4owtS2wiEwV4T9+NO4w7V5RgjQc084RGVrRJyhg0oJgLIWGlEMBisD44NcIc9ud80AydO+w9L/DlaVQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBADWtQuvCbhrjGCeziapCgvLPjmm/a782V0+EpyUrwxxHNokuoVSxJv0SlzcVoHAatZM64NJD/O8YIbW7iViXK1y2MNLyIC02MAe/46PCTUolIJ0+ifPs8i1o65WWhAiWuIdKEaiFiluKz7QZUXV/I47eRPiw5e8ye8WAzMDkChAW7XllXdmN0ehaik/2wUzmotykDKVglPW7HsDFyjkVRKeWEqRBuT88beNdQR6mz1JEZsjF1jy5tro7kXv0wz5QiiErVkxqiUiZXPliC1x2SoZ5rLYdXsPS/+XPr5vG9miYgxEhfAhAuSfwEhIuzoA7cxrbnsWm5vL8r5AIJ5N6A+A=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"3b50d3d749524b288ee0bdd4763d1424"}, [
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
  '07aa41ae-72a2-48c4-b5de-179b1239a258',
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
  'Thu, 25 Jun 2020 12:55:44 GMT',
  'Content-Length',
  '1349'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/CRUDCertificateName-cangetacertificatessecretinPEMformat-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-cangetacertificatessecretinPEMformat-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAyKSJ0CAhCb/xUcVetNQCBkW8utMUmGncFO4hBO4daxbVnHVGc08cy8mUJfBRb7XhWnr6eL884qnt842OfP1nK8qx4jhoamSDgWk2F9i/+Eaw8oIrGCfVr8CZuy5yiIr13A+sJgHCE+SGGcosi1hVm+vt4CRjtH5xC1AS/fExV6bDb1CSYQNWhxDYup2YaqXUlfg9wX5kSWai1qEj242W9CgDUDsN7h2foFbFfG7YvSrYHVan/OFLoauzxyy0lNb8fAKyhdQ4owtS2wiEwV4T9+NO4w7V5RgjQc084RGVrRJyhg0oJgLIWGlEMBisD44NcIc9ud80AydO+w9L/DlaVQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBADWtQuvCbhrjGCeziapCgvLPjmm/a782V0+EpyUrwxxHNokuoVSxJv0SlzcVoHAatZM64NJD/O8YIbW7iViXK1y2MNLyIC02MAe/46PCTUolIJ0+ifPs8i1o65WWhAiWuIdKEaiFiluKz7QZUXV/I47eRPiw5e8ye8WAzMDkChAW7XllXdmN0ehaik/2wUzmotykDKVglPW7HsDFyjkVRKeWEqRBuT88beNdQR6mz1JEZsjF1jy5tro7kXv0wz5QiiErVkxqiUiZXPliC1x2SoZ5rLYdXsPS/+XPr5vG9miYgxEhfAhAuSfwEhIuzoA7cxrbnsWm5vL8r5AIJ5N6A+A=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"3b50d3d749524b288ee0bdd4763d1424"}, [
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
  '01d256a5-5689-4263-9f7b-a532c87c38dd',
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
  'Thu, 25 Jun 2020 12:55:46 GMT',
  'Content-Length',
  '1349'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/CRUDCertificateName-cangetacertificatessecretinPEMformat-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-cangetacertificatessecretinPEMformat-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAyKSJ0CAhCb/xUcVetNQCBkW8utMUmGncFO4hBO4daxbVnHVGc08cy8mUJfBRb7XhWnr6eL884qnt842OfP1nK8qx4jhoamSDgWk2F9i/+Eaw8oIrGCfVr8CZuy5yiIr13A+sJgHCE+SGGcosi1hVm+vt4CRjtH5xC1AS/fExV6bDb1CSYQNWhxDYup2YaqXUlfg9wX5kSWai1qEj242W9CgDUDsN7h2foFbFfG7YvSrYHVan/OFLoauzxyy0lNb8fAKyhdQ4owtS2wiEwV4T9+NO4w7V5RgjQc084RGVrRJyhg0oJgLIWGlEMBisD44NcIc9ud80AydO+w9L/DlaVQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBADWtQuvCbhrjGCeziapCgvLPjmm/a782V0+EpyUrwxxHNokuoVSxJv0SlzcVoHAatZM64NJD/O8YIbW7iViXK1y2MNLyIC02MAe/46PCTUolIJ0+ifPs8i1o65WWhAiWuIdKEaiFiluKz7QZUXV/I47eRPiw5e8ye8WAzMDkChAW7XllXdmN0ehaik/2wUzmotykDKVglPW7HsDFyjkVRKeWEqRBuT88beNdQR6mz1JEZsjF1jy5tro7kXv0wz5QiiErVkxqiUiZXPliC1x2SoZ5rLYdXsPS/+XPr5vG9miYgxEhfAhAuSfwEhIuzoA7cxrbnsWm5vL8r5AIJ5N6A+A=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"3b50d3d749524b288ee0bdd4763d1424"}, [
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
  'c32ac814-51fc-482e-9c18-08929fef6258',
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
  'Thu, 25 Jun 2020 12:55:49 GMT',
  'Content-Length',
  '1349'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/CRUDCertificateName-cangetacertificatessecretinPEMformat-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-cangetacertificatessecretinPEMformat-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAyKSJ0CAhCb/xUcVetNQCBkW8utMUmGncFO4hBO4daxbVnHVGc08cy8mUJfBRb7XhWnr6eL884qnt842OfP1nK8qx4jhoamSDgWk2F9i/+Eaw8oIrGCfVr8CZuy5yiIr13A+sJgHCE+SGGcosi1hVm+vt4CRjtH5xC1AS/fExV6bDb1CSYQNWhxDYup2YaqXUlfg9wX5kSWai1qEj242W9CgDUDsN7h2foFbFfG7YvSrYHVan/OFLoauzxyy0lNb8fAKyhdQ4owtS2wiEwV4T9+NO4w7V5RgjQc084RGVrRJyhg0oJgLIWGlEMBisD44NcIc9ud80AydO+w9L/DlaVQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBADWtQuvCbhrjGCeziapCgvLPjmm/a782V0+EpyUrwxxHNokuoVSxJv0SlzcVoHAatZM64NJD/O8YIbW7iViXK1y2MNLyIC02MAe/46PCTUolIJ0+ifPs8i1o65WWhAiWuIdKEaiFiluKz7QZUXV/I47eRPiw5e8ye8WAzMDkChAW7XllXdmN0ehaik/2wUzmotykDKVglPW7HsDFyjkVRKeWEqRBuT88beNdQR6mz1JEZsjF1jy5tro7kXv0wz5QiiErVkxqiUiZXPliC1x2SoZ5rLYdXsPS/+XPr5vG9miYgxEhfAhAuSfwEhIuzoA7cxrbnsWm5vL8r5AIJ5N6A+A=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"3b50d3d749524b288ee0bdd4763d1424"}, [
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
  'c16a1a1e-016f-4a33-b30c-30d5eb8b6bbb',
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
  'Thu, 25 Jun 2020 12:55:51 GMT',
  'Content-Length',
  '1349'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/CRUDCertificateName-cangetacertificatessecretinPEMformat-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-cangetacertificatessecretinPEMformat-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAyKSJ0CAhCb/xUcVetNQCBkW8utMUmGncFO4hBO4daxbVnHVGc08cy8mUJfBRb7XhWnr6eL884qnt842OfP1nK8qx4jhoamSDgWk2F9i/+Eaw8oIrGCfVr8CZuy5yiIr13A+sJgHCE+SGGcosi1hVm+vt4CRjtH5xC1AS/fExV6bDb1CSYQNWhxDYup2YaqXUlfg9wX5kSWai1qEj242W9CgDUDsN7h2foFbFfG7YvSrYHVan/OFLoauzxyy0lNb8fAKyhdQ4owtS2wiEwV4T9+NO4w7V5RgjQc084RGVrRJyhg0oJgLIWGlEMBisD44NcIc9ud80AydO+w9L/DlaVQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBADWtQuvCbhrjGCeziapCgvLPjmm/a782V0+EpyUrwxxHNokuoVSxJv0SlzcVoHAatZM64NJD/O8YIbW7iViXK1y2MNLyIC02MAe/46PCTUolIJ0+ifPs8i1o65WWhAiWuIdKEaiFiluKz7QZUXV/I47eRPiw5e8ye8WAzMDkChAW7XllXdmN0ehaik/2wUzmotykDKVglPW7HsDFyjkVRKeWEqRBuT88beNdQR6mz1JEZsjF1jy5tro7kXv0wz5QiiErVkxqiUiZXPliC1x2SoZ5rLYdXsPS/+XPr5vG9miYgxEhfAhAuSfwEhIuzoA7cxrbnsWm5vL8r5AIJ5N6A+A=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"3b50d3d749524b288ee0bdd4763d1424"}, [
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
  'acaeef39-3f8e-4021-874e-476ca4202fcb',
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
  'Thu, 25 Jun 2020 12:55:53 GMT',
  'Content-Length',
  '1349'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/CRUDCertificateName-cangetacertificatessecretinPEMformat-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-cangetacertificatessecretinPEMformat-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAyKSJ0CAhCb/xUcVetNQCBkW8utMUmGncFO4hBO4daxbVnHVGc08cy8mUJfBRb7XhWnr6eL884qnt842OfP1nK8qx4jhoamSDgWk2F9i/+Eaw8oIrGCfVr8CZuy5yiIr13A+sJgHCE+SGGcosi1hVm+vt4CRjtH5xC1AS/fExV6bDb1CSYQNWhxDYup2YaqXUlfg9wX5kSWai1qEj242W9CgDUDsN7h2foFbFfG7YvSrYHVan/OFLoauzxyy0lNb8fAKyhdQ4owtS2wiEwV4T9+NO4w7V5RgjQc084RGVrRJyhg0oJgLIWGlEMBisD44NcIc9ud80AydO+w9L/DlaVQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBADWtQuvCbhrjGCeziapCgvLPjmm/a782V0+EpyUrwxxHNokuoVSxJv0SlzcVoHAatZM64NJD/O8YIbW7iViXK1y2MNLyIC02MAe/46PCTUolIJ0+ifPs8i1o65WWhAiWuIdKEaiFiluKz7QZUXV/I47eRPiw5e8ye8WAzMDkChAW7XllXdmN0ehaik/2wUzmotykDKVglPW7HsDFyjkVRKeWEqRBuT88beNdQR6mz1JEZsjF1jy5tro7kXv0wz5QiiErVkxqiUiZXPliC1x2SoZ5rLYdXsPS/+XPr5vG9miYgxEhfAhAuSfwEhIuzoA7cxrbnsWm5vL8r5AIJ5N6A+A=","cancellation_requested":false,"status":"completed","target":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-cangetacertificatessecretinPEMformat-","request_id":"3b50d3d749524b288ee0bdd4763d1424"}, [
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
  '536d214d-33f0-4866-994b-60cb27c13965',
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
  'Thu, 25 Jun 2020 12:55:54 GMT',
  'Content-Length',
  '1325'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/CRUDCertificateName-cangetacertificatessecretinPEMformat-/')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-cangetacertificatessecretinPEMformat-/1f2dc323fffd4b768634555b2d191f2e","kid":"https://keyvault_name.vault.azure.net/keys/CRUDCertificateName-cangetacertificatessecretinPEMformat-/1f2dc323fffd4b768634555b2d191f2e","sid":"https://keyvault_name.vault.azure.net/secrets/CRUDCertificateName-cangetacertificatessecretinPEMformat-/1f2dc323fffd4b768634555b2d191f2e","x5t":"hGI-5loflZ-aQpxp5ZUw2E4h_EQ","cer":"MIIDKDCCAhCgAwIBAgIQFvYBtSFYRd+nPcdeFJl1tzANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjAwNjI1MTI0NTUzWhcNMjEwNjI1MTI1NTUzWjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQDIpInQICEJv/FRxV601AIGRby60xSYadwU7iEE7h1rFtWcdUZzTxzLyZQl8FFvteFaevp4vzziqe3zjY58/WcryrHiOGhqZIOBaTYX2L/4RrDygisYJ9WvwJm7LnKIivXcD6wmAcIT5IYZyiyLWFWb6+3gJGO0fnELUBL98TFXpsNvUJJhA1aHENi6nZhqpdSV+D3BfmRJZqLWoSPbjZb0KANQOw3uHZ+gVsV8bti9KtgdVqf84Uuhq7PHLLSU1vx8ArKF1DijC1LbCITBXhP3407jDtXlGCNBzTzhEZWtEnKGDSgmAshYaUQwGKwPjg1whz253zQDJ077D0v8OVpVAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBSJkW3WvxHUuQWCmkJK+tf96gE2UzAdBgNVHQ4EFgQUiZFt1r8R1LkFgppCSvrX/eoBNlMwDQYJKoZIhvcNAQELBQADggEBAJgsYZHRAr6v3O9tqtqEobi6e7rZPjFAhqCOfQjbmBnBcmRcfn0T3bHsZPB300EEpezeyhOMg1ilCECSCFV7mbse/0YQRydwWHeFf3TFLFFRRI3x35XPnFjznoX9PYUcbxiwBfAp0OEVsnDaQau+PWvcDh09oCnyhe8cX22r7dvZFybfcQBufZjRr16rmr5dRN9MbT1fK6mVnkeOAXZL/wAXptI9h4B9Me1/V2PKJnt/sYan/ZaHKKwMjtMabKz1aTvE52yOG7Bvr/axXjh/WHujPMFMikke80FpZZONjDgDqeIxcdPWP9of1T1yK1EEWJ1JhbWYNAAOq0HAi3ECVvg=","attributes":{"enabled":true,"nbf":1593089153,"exp":1624625753,"created":1593089753,"updated":1593089753,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-cangetacertificatessecretinPEMformat-/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pem-file"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1593089740,"updated":1593089740}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-cangetacertificatessecretinPEMformat-/pending"}}, [
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
  '0fe2d51b-3618-46f0-ba99-5feed5356977',
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
  'Thu, 25 Jun 2020 12:55:54 GMT',
  'Content-Length',
  '2637'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/CRUDCertificateName-cangetacertificatessecretinPEMformat-/')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-cangetacertificatessecretinPEMformat-/1f2dc323fffd4b768634555b2d191f2e","kid":"https://keyvault_name.vault.azure.net/keys/CRUDCertificateName-cangetacertificatessecretinPEMformat-/1f2dc323fffd4b768634555b2d191f2e","sid":"https://keyvault_name.vault.azure.net/secrets/CRUDCertificateName-cangetacertificatessecretinPEMformat-/1f2dc323fffd4b768634555b2d191f2e","x5t":"hGI-5loflZ-aQpxp5ZUw2E4h_EQ","cer":"MIIDKDCCAhCgAwIBAgIQFvYBtSFYRd+nPcdeFJl1tzANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjAwNjI1MTI0NTUzWhcNMjEwNjI1MTI1NTUzWjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQDIpInQICEJv/FRxV601AIGRby60xSYadwU7iEE7h1rFtWcdUZzTxzLyZQl8FFvteFaevp4vzziqe3zjY58/WcryrHiOGhqZIOBaTYX2L/4RrDygisYJ9WvwJm7LnKIivXcD6wmAcIT5IYZyiyLWFWb6+3gJGO0fnELUBL98TFXpsNvUJJhA1aHENi6nZhqpdSV+D3BfmRJZqLWoSPbjZb0KANQOw3uHZ+gVsV8bti9KtgdVqf84Uuhq7PHLLSU1vx8ArKF1DijC1LbCITBXhP3407jDtXlGCNBzTzhEZWtEnKGDSgmAshYaUQwGKwPjg1whz253zQDJ077D0v8OVpVAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBSJkW3WvxHUuQWCmkJK+tf96gE2UzAdBgNVHQ4EFgQUiZFt1r8R1LkFgppCSvrX/eoBNlMwDQYJKoZIhvcNAQELBQADggEBAJgsYZHRAr6v3O9tqtqEobi6e7rZPjFAhqCOfQjbmBnBcmRcfn0T3bHsZPB300EEpezeyhOMg1ilCECSCFV7mbse/0YQRydwWHeFf3TFLFFRRI3x35XPnFjznoX9PYUcbxiwBfAp0OEVsnDaQau+PWvcDh09oCnyhe8cX22r7dvZFybfcQBufZjRr16rmr5dRN9MbT1fK6mVnkeOAXZL/wAXptI9h4B9Me1/V2PKJnt/sYan/ZaHKKwMjtMabKz1aTvE52yOG7Bvr/axXjh/WHujPMFMikke80FpZZONjDgDqeIxcdPWP9of1T1yK1EEWJ1JhbWYNAAOq0HAi3ECVvg=","attributes":{"enabled":true,"nbf":1593089153,"exp":1624625753,"created":1593089753,"updated":1593089753,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-cangetacertificatessecretinPEMformat-/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pem-file"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1593089740,"updated":1593089740}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-cangetacertificatessecretinPEMformat-/pending"}}, [
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
  'd6b771a2-2235-4fca-9d5d-386d1e023b88',
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
  'Thu, 25 Jun 2020 12:55:55 GMT',
  'Content-Length',
  '2637'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/secrets/CRUDCertificateName-cangetacertificatessecretinPEMformat-/')
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
  '528aeaca-41a9-4a3d-b241-94439e5c7e50',
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
  'Thu, 25 Jun 2020 12:55:54 GMT'
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
  '7983d960-d0e4-4f13-9e91-7d1d3a1cf600',
  'x-ms-ests-server',
  '2.1.10732.8 - SCUS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=An_cavHvzTFGpYjHxbjSbe0_aSJHAgAAAMyVhtYOAAAA; expires=Sat, 25-Jul-2020 12:55:56 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; SameSite=None; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; SameSite=None; secure; HttpOnly',
  'Date',
  'Thu, 25 Jun 2020 12:55:55 GMT',
  'Content-Length',
  '1315'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/secrets/CRUDCertificateName-cangetacertificatessecretinPEMformat-/')
  .query(true)
  .reply(200, {"value":"-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDIpInQICEJv/FR\nxV601AIGRby60xSYadwU7iEE7h1rFtWcdUZzTxzLyZQl8FFvteFaevp4vzziqe3z\njY58/WcryrHiOGhqZIOBaTYX2L/4RrDygisYJ9WvwJm7LnKIivXcD6wmAcIT5IYZ\nyiyLWFWb6+3gJGO0fnELUBL98TFXpsNvUJJhA1aHENi6nZhqpdSV+D3BfmRJZqLW\noSPbjZb0KANQOw3uHZ+gVsV8bti9KtgdVqf84Uuhq7PHLLSU1vx8ArKF1DijC1Lb\nCITBXhP3407jDtXlGCNBzTzhEZWtEnKGDSgmAshYaUQwGKwPjg1whz253zQDJ077\nD0v8OVpVAgMBAAECggEAC6MHXyvN3rvkKiLxWDmHmIeI56kAY8qX+hrJjXil+iUL\n5JQkruFiwSsCzaR/hKQe2tmRF1m4FUlXxK1sGzGzPyX1ZTJyU+FagzHv8jgfAi5P\navFDwJXm3dek0udhuyucENRT3qxxbift4ycHqFlKNc3cMQjLQ5elxMszHslTXEr0\nYIBO2CNNklx47uMiNOPdxaaQamVI4SG1lRf8PbhMZADRJIcPn8fMBBnvgIJQNZCo\nEFcIrOzj6L68YWcBG3mK4pnwVFApj4g3JozbvdOkO1YN0qVgYwulm4f9R/5TDp5W\n5pNMYaLO/S8UCI8nNT6CxZP5CtDEtWD/eHEnamAYzQKBgQD10aH10dBi9M3nv1DK\n+LS+AGcVqGj/XsNxRDhB3vZ+m5NdNWMmFkq6MZC3EfKb40pSsFzFZ2HTZuca9RsS\n1mlqmttWRCgn7fhMZXqw/MY2zm3KS7I7wJnqmfHEQM3wL5bunMGVIKjq3YvliRek\ncWO6gNUZZuCItxGcHyvJCmvY6wKBgQDQ8+mFKJ0u3NDUVVfouHP5Lz0ZN1gexsRq\nstWhr8YqcWtJIz+dkOALFq6lHeuFIGb6agGP4Uv1H1ASYRiI2/OBkinKJ+k6awDt\n5FhmAeyFEZkARHCJJEnpxqnp6TtKo06OsXK1PU6CFebIwQ5hgRa5TarThIKkJeqr\n9aRYnNbJvwKBgGz8+iMkWJFXWueyUl77sB9BzHK0zYDUAjF4/rxt37o4vjioUAJ2\nBcHR8gjJI1jsiGprGWbItH3ndPXl0JAkkm6apD72TxuNDfbJU4GfQT7Rfaogr7CA\nb32trZzG4sfoQbIfvFCjP2GKwtkNVHcrcv0g29q8Wzcie+NNirtDLJfrAoGBAJOX\nJaPzqwrV1/+TBJQR7YDeGAb+q5SZi1VeWj1pncyO7lvrtNyD32yVqehhOOGAoJxS\nUiYh2fgbFQDWanEJA3fLGQ98n2Wu/SoLd1EeHMVlR7ADp4WHB1pEA/J/1myC61Mp\nDb/svM5vz+KPUqwWdUmQDZB38ZsmWRr7WAlrRt+bAoGBAJ0LZnPZRgtpJEbJRu2l\nEbkKg9w3lUGgow+haXmIMWLXhY3nNgPGSugYCvGlHJIYHLRdJdBE6QPvAHGOBqdQ\nBvpDCk1Im6JB6K8GvV2d7aHkkLHch0th6v3IJPwodSWfN09BBjHSBxI7P+npKUna\nEXX8izcV3BORaB7JctK6C+Nb\n-----END PRIVATE KEY-----\n-----BEGIN CERTIFICATE-----\nMIIDKDCCAhCgAwIBAgIQFvYBtSFYRd+nPcdeFJl1tzANBgkqhkiG9w0BAQsFADAR\nMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjAwNjI1MTI0NTUzWhcNMjEwNjI1MTI1NTUz\nWjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEK\nAoIBAQDIpInQICEJv/FRxV601AIGRby60xSYadwU7iEE7h1rFtWcdUZzTxzLyZQl\n8FFvteFaevp4vzziqe3zjY58/WcryrHiOGhqZIOBaTYX2L/4RrDygisYJ9WvwJm7\nLnKIivXcD6wmAcIT5IYZyiyLWFWb6+3gJGO0fnELUBL98TFXpsNvUJJhA1aHENi6\nnZhqpdSV+D3BfmRJZqLWoSPbjZb0KANQOw3uHZ+gVsV8bti9KtgdVqf84Uuhq7PH\nLLSU1vx8ArKF1DijC1LbCITBXhP3407jDtXlGCNBzTzhEZWtEnKGDSgmAshYaUQw\nGKwPjg1whz253zQDJ077D0v8OVpVAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJ\nBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSME\nGDAWgBSJkW3WvxHUuQWCmkJK+tf96gE2UzAdBgNVHQ4EFgQUiZFt1r8R1LkFgppC\nSvrX/eoBNlMwDQYJKoZIhvcNAQELBQADggEBAJgsYZHRAr6v3O9tqtqEobi6e7rZ\nPjFAhqCOfQjbmBnBcmRcfn0T3bHsZPB300EEpezeyhOMg1ilCECSCFV7mbse/0YQ\nRydwWHeFf3TFLFFRRI3x35XPnFjznoX9PYUcbxiwBfAp0OEVsnDaQau+PWvcDh09\noCnyhe8cX22r7dvZFybfcQBufZjRr16rmr5dRN9MbT1fK6mVnkeOAXZL/wAXptI9\nh4B9Me1/V2PKJnt/sYan/ZaHKKwMjtMabKz1aTvE52yOG7Bvr/axXjh/WHujPMFM\nikke80FpZZONjDgDqeIxcdPWP9of1T1yK1EEWJ1JhbWYNAAOq0HAi3ECVvg=\n-----END CERTIFICATE-----\n","contentType":"application/x-pem-file","id":"https://keyvault_name.vault.azure.net/secrets/CRUDCertificateName-cangetacertificatessecretinPEMformat-/1f2dc323fffd4b768634555b2d191f2e","managed":true,"attributes":{"enabled":true,"nbf":1593089153,"exp":1624625753,"created":1593089753,"updated":1593089753,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90},"kid":"https://keyvault_name.vault.azure.net/keys/CRUDCertificateName-cangetacertificatessecretinPEMformat-/1f2dc323fffd4b768634555b2d191f2e"}, [
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
  '922c59aa-4f79-46f1-9e2d-8e7f45d75dcb',
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
  'Thu, 25 Jun 2020 12:55:55 GMT',
  'Content-Length',
  '3467'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/certificates/CRUDCertificateName-cangetacertificatessecretinPEMformat-')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/CRUDCertificateName-cangetacertificatessecretinPEMformat-","deletedDate":1593089756,"scheduledPurgeDate":1600865756,"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-cangetacertificatessecretinPEMformat-/1f2dc323fffd4b768634555b2d191f2e","kid":"https://keyvault_name.vault.azure.net/keys/CRUDCertificateName-cangetacertificatessecretinPEMformat-/1f2dc323fffd4b768634555b2d191f2e","sid":"https://keyvault_name.vault.azure.net/secrets/CRUDCertificateName-cangetacertificatessecretinPEMformat-/1f2dc323fffd4b768634555b2d191f2e","x5t":"hGI-5loflZ-aQpxp5ZUw2E4h_EQ","cer":"MIIDKDCCAhCgAwIBAgIQFvYBtSFYRd+nPcdeFJl1tzANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjAwNjI1MTI0NTUzWhcNMjEwNjI1MTI1NTUzWjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQDIpInQICEJv/FRxV601AIGRby60xSYadwU7iEE7h1rFtWcdUZzTxzLyZQl8FFvteFaevp4vzziqe3zjY58/WcryrHiOGhqZIOBaTYX2L/4RrDygisYJ9WvwJm7LnKIivXcD6wmAcIT5IYZyiyLWFWb6+3gJGO0fnELUBL98TFXpsNvUJJhA1aHENi6nZhqpdSV+D3BfmRJZqLWoSPbjZb0KANQOw3uHZ+gVsV8bti9KtgdVqf84Uuhq7PHLLSU1vx8ArKF1DijC1LbCITBXhP3407jDtXlGCNBzTzhEZWtEnKGDSgmAshYaUQwGKwPjg1whz253zQDJ077D0v8OVpVAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBSJkW3WvxHUuQWCmkJK+tf96gE2UzAdBgNVHQ4EFgQUiZFt1r8R1LkFgppCSvrX/eoBNlMwDQYJKoZIhvcNAQELBQADggEBAJgsYZHRAr6v3O9tqtqEobi6e7rZPjFAhqCOfQjbmBnBcmRcfn0T3bHsZPB300EEpezeyhOMg1ilCECSCFV7mbse/0YQRydwWHeFf3TFLFFRRI3x35XPnFjznoX9PYUcbxiwBfAp0OEVsnDaQau+PWvcDh09oCnyhe8cX22r7dvZFybfcQBufZjRr16rmr5dRN9MbT1fK6mVnkeOAXZL/wAXptI9h4B9Me1/V2PKJnt/sYan/ZaHKKwMjtMabKz1aTvE52yOG7Bvr/axXjh/WHujPMFMikke80FpZZONjDgDqeIxcdPWP9of1T1yK1EEWJ1JhbWYNAAOq0HAi3ECVvg=","attributes":{"enabled":true,"nbf":1593089153,"exp":1624625753,"created":1593089753,"updated":1593089753,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-cangetacertificatessecretinPEMformat-/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pem-file"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1593089740,"updated":1593089740}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-cangetacertificatessecretinPEMformat-/pending"}}, [
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
  '1a2e7f46-2815-4bcf-bdf1-bca5c50fd61a',
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
  'Thu, 25 Jun 2020 12:55:55 GMT',
  'Content-Length',
  '2846'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/CRUDCertificateName-cangetacertificatessecretinPEMformat-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: CRUDCertificateName-cangetacertificatessecretinPEMformat-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '157',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '68960412-2e5d-45ad-8669-73eceeac98f2',
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
  'Thu, 25 Jun 2020 12:55:55 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/CRUDCertificateName-cangetacertificatessecretinPEMformat-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: CRUDCertificateName-cangetacertificatessecretinPEMformat-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '157',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '4803679f-2883-4ba8-a1a4-4607c03f70b5',
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
  'Thu, 25 Jun 2020 12:55:55 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/CRUDCertificateName-cangetacertificatessecretinPEMformat-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: CRUDCertificateName-cangetacertificatessecretinPEMformat-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '157',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '5a53cc25-0743-416b-b877-0e0e6c7be055',
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
  'Thu, 25 Jun 2020 12:55:57 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/CRUDCertificateName-cangetacertificatessecretinPEMformat-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: CRUDCertificateName-cangetacertificatessecretinPEMformat-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '157',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '4bed5644-b0ce-4b00-982c-a5cb389a23e9',
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
  'Thu, 25 Jun 2020 12:56:00 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/CRUDCertificateName-cangetacertificatessecretinPEMformat-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: CRUDCertificateName-cangetacertificatessecretinPEMformat-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '157',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'f77316e4-3585-4b81-8ef5-f6e014927d85',
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
  'Thu, 25 Jun 2020 12:56:02 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/CRUDCertificateName-cangetacertificatessecretinPEMformat-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: CRUDCertificateName-cangetacertificatessecretinPEMformat-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '157',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '886aa7b5-253e-4606-9801-89d34272ec19',
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
  'Thu, 25 Jun 2020 12:56:03 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/CRUDCertificateName-cangetacertificatessecretinPEMformat-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: CRUDCertificateName-cangetacertificatessecretinPEMformat-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '157',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'b54abdc9-1ccd-4bb1-b3c9-ebe7b15f2b58',
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
  'Thu, 25 Jun 2020 12:56:06 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/CRUDCertificateName-cangetacertificatessecretinPEMformat-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: CRUDCertificateName-cangetacertificatessecretinPEMformat-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '157',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'e4baead1-f636-42df-9df6-80dd6a16dd92',
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
  'Thu, 25 Jun 2020 12:56:08 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/CRUDCertificateName-cangetacertificatessecretinPEMformat-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: CRUDCertificateName-cangetacertificatessecretinPEMformat-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '157',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'bad1b74b-5f94-4d88-abe5-9c6bb5e175c2',
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
  'Thu, 25 Jun 2020 12:56:10 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/CRUDCertificateName-cangetacertificatessecretinPEMformat-')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/CRUDCertificateName-cangetacertificatessecretinPEMformat-","deletedDate":1593089756,"scheduledPurgeDate":1600865756,"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-cangetacertificatessecretinPEMformat-/1f2dc323fffd4b768634555b2d191f2e","kid":"https://keyvault_name.vault.azure.net/keys/CRUDCertificateName-cangetacertificatessecretinPEMformat-/1f2dc323fffd4b768634555b2d191f2e","sid":"https://keyvault_name.vault.azure.net/secrets/CRUDCertificateName-cangetacertificatessecretinPEMformat-/1f2dc323fffd4b768634555b2d191f2e","x5t":"hGI-5loflZ-aQpxp5ZUw2E4h_EQ","cer":"MIIDKDCCAhCgAwIBAgIQFvYBtSFYRd+nPcdeFJl1tzANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjAwNjI1MTI0NTUzWhcNMjEwNjI1MTI1NTUzWjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQDIpInQICEJv/FRxV601AIGRby60xSYadwU7iEE7h1rFtWcdUZzTxzLyZQl8FFvteFaevp4vzziqe3zjY58/WcryrHiOGhqZIOBaTYX2L/4RrDygisYJ9WvwJm7LnKIivXcD6wmAcIT5IYZyiyLWFWb6+3gJGO0fnELUBL98TFXpsNvUJJhA1aHENi6nZhqpdSV+D3BfmRJZqLWoSPbjZb0KANQOw3uHZ+gVsV8bti9KtgdVqf84Uuhq7PHLLSU1vx8ArKF1DijC1LbCITBXhP3407jDtXlGCNBzTzhEZWtEnKGDSgmAshYaUQwGKwPjg1whz253zQDJ077D0v8OVpVAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBSJkW3WvxHUuQWCmkJK+tf96gE2UzAdBgNVHQ4EFgQUiZFt1r8R1LkFgppCSvrX/eoBNlMwDQYJKoZIhvcNAQELBQADggEBAJgsYZHRAr6v3O9tqtqEobi6e7rZPjFAhqCOfQjbmBnBcmRcfn0T3bHsZPB300EEpezeyhOMg1ilCECSCFV7mbse/0YQRydwWHeFf3TFLFFRRI3x35XPnFjznoX9PYUcbxiwBfAp0OEVsnDaQau+PWvcDh09oCnyhe8cX22r7dvZFybfcQBufZjRr16rmr5dRN9MbT1fK6mVnkeOAXZL/wAXptI9h4B9Me1/V2PKJnt/sYan/ZaHKKwMjtMabKz1aTvE52yOG7Bvr/axXjh/WHujPMFMikke80FpZZONjDgDqeIxcdPWP9of1T1yK1EEWJ1JhbWYNAAOq0HAi3ECVvg=","attributes":{"enabled":true,"nbf":1593089153,"exp":1624625753,"created":1593089753,"updated":1593089753,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-cangetacertificatessecretinPEMformat-/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pem-file"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1593089740,"updated":1593089740}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-cangetacertificatessecretinPEMformat-/pending"}}, [
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
  '70ff4b09-7576-46eb-8d6e-643241d3af58',
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
  'Thu, 25 Jun 2020 12:56:11 GMT',
  'Content-Length',
  '2846'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedcertificates/CRUDCertificateName-cangetacertificatessecretinPEMformat-')
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
  '6c4680e4-6e5c-4653-b9ba-9610d6ad25d2',
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
  'Thu, 25 Jun 2020 12:56:12 GMT'
]);

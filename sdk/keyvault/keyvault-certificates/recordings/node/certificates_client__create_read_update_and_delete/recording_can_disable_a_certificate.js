let nock = require('nock');

module.exports.hash = "712ce7c765044e3d3c7f630169a80b38";

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
  'westus2',
  'x-ms-request-id',
  '183b8552-14c7-40cc-95fb-04d22b60c8be',
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
  'Tue, 16 Feb 2021 18:57:04 GMT'
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
  '2a71e2cc-7872-406f-b5ba-97378cc8f800',
  'x-ms-ests-server',
  '2.1.11496.5 - NCUS ProdSlices',
  'Set-Cookie',
  'fpc=AufoSEQpIbxLjzJaYLa_pBMA4qsDBgAAACEMvtcOAAAA; expires=Thu, 18-Mar-2021 18:57:05 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 16 Feb 2021 18:57:04 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/certificates/CRUDCertificateName-candisableacertificate-/create', {"policy":{"key_props":{},"secret_props":{},"x509_props":{"subject":"cn=MyCert","sans":{}},"issuer":{"name":"Self"},"attributes":{}},"attributes":{}})
  .query(true)
  .reply(202, {"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-candisableacertificate-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAzSv+chlJQBI6sI32nLHfJEXD6A1TkiX6eES16kubtsUqWTIBTkYfuu7aBsVfjxtQbP3+75tqbrHKTt1gk2nG/2+wP9yPElNj7pY710GQ5aZPbwxCBpAstJR0cC4h5AdHVYOwqdKcoFGETE9CwArKz5Nr1P/Vq077FeBxs31pmVTl35VZdXgiT1JQ9F6lSwq1D1Li0ONcX4Zh/e3IEX+iYfsXUwsGP6ydrLV3gVXX42UIiwhtn/8N5B98j7C8gny7TrlDJJfeosnZLZGSA6Lx234AOGTUyYsQzeYHajWA2aKSSFrn1R/tKNFtW2TTbEPA3y1aLiD99oAW94e4Q+SOuQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAB5CF2LO4Tx519nfEG8G4aflbUumVYW9Y6m/PUdNV1+FWpFGueEIBzZB5B80m3/DtrLw1XOgXsqOpgWtWFDOog/6vDpVj6PIx9ohLj6Cl6jjeIKjv9RDSjWvtB71io02GMfcNxnDRv+f//JH/rue1j0samq9dUtkk0jkGkJzLoj8JoBBqaf36xNYYE75hKdHntLBOFKgwPDyIEy9p1F92MujfSg435Uq6B4eRk3QCEzzWDLvAJ1Me3IDSSmvUaifjosBzI+RmptTRl0zyfgJ3PkOnibCcE3tZV8CNLWB7p1xAmS4B7hgIH3C+3AJRAJNFUqSJUGBN4ttHbOn4hp0QV4=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"891c797d605e46cd9f97127fc45a0eac"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-candisableacertificate-/pending?api-version=7.2&request_id=891c797d605e46cd9f97127fc45a0eac',
  'Retry-After',
  '10',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  'a078b0d8-e9b2-4e4c-9fbe-405313253e1d',
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
  'Tue, 16 Feb 2021 18:57:04 GMT',
  'Content-Length',
  '1326'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/CRUDCertificateName-candisableacertificate-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-candisableacertificate-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAzSv+chlJQBI6sI32nLHfJEXD6A1TkiX6eES16kubtsUqWTIBTkYfuu7aBsVfjxtQbP3+75tqbrHKTt1gk2nG/2+wP9yPElNj7pY710GQ5aZPbwxCBpAstJR0cC4h5AdHVYOwqdKcoFGETE9CwArKz5Nr1P/Vq077FeBxs31pmVTl35VZdXgiT1JQ9F6lSwq1D1Li0ONcX4Zh/e3IEX+iYfsXUwsGP6ydrLV3gVXX42UIiwhtn/8N5B98j7C8gny7TrlDJJfeosnZLZGSA6Lx234AOGTUyYsQzeYHajWA2aKSSFrn1R/tKNFtW2TTbEPA3y1aLiD99oAW94e4Q+SOuQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAB5CF2LO4Tx519nfEG8G4aflbUumVYW9Y6m/PUdNV1+FWpFGueEIBzZB5B80m3/DtrLw1XOgXsqOpgWtWFDOog/6vDpVj6PIx9ohLj6Cl6jjeIKjv9RDSjWvtB71io02GMfcNxnDRv+f//JH/rue1j0samq9dUtkk0jkGkJzLoj8JoBBqaf36xNYYE75hKdHntLBOFKgwPDyIEy9p1F92MujfSg435Uq6B4eRk3QCEzzWDLvAJ1Me3IDSSmvUaifjosBzI+RmptTRl0zyfgJ3PkOnibCcE3tZV8CNLWB7p1xAmS4B7hgIH3C+3AJRAJNFUqSJUGBN4ttHbOn4hp0QV4=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"891c797d605e46cd9f97127fc45a0eac"}, [
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
  '1177e1f7-a2e2-4070-9fdb-04c20506296f',
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
  'Tue, 16 Feb 2021 18:57:04 GMT',
  'Content-Length',
  '1326'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/CRUDCertificateName-candisableacertificate-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-candisableacertificate-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAzSv+chlJQBI6sI32nLHfJEXD6A1TkiX6eES16kubtsUqWTIBTkYfuu7aBsVfjxtQbP3+75tqbrHKTt1gk2nG/2+wP9yPElNj7pY710GQ5aZPbwxCBpAstJR0cC4h5AdHVYOwqdKcoFGETE9CwArKz5Nr1P/Vq077FeBxs31pmVTl35VZdXgiT1JQ9F6lSwq1D1Li0ONcX4Zh/e3IEX+iYfsXUwsGP6ydrLV3gVXX42UIiwhtn/8N5B98j7C8gny7TrlDJJfeosnZLZGSA6Lx234AOGTUyYsQzeYHajWA2aKSSFrn1R/tKNFtW2TTbEPA3y1aLiD99oAW94e4Q+SOuQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAB5CF2LO4Tx519nfEG8G4aflbUumVYW9Y6m/PUdNV1+FWpFGueEIBzZB5B80m3/DtrLw1XOgXsqOpgWtWFDOog/6vDpVj6PIx9ohLj6Cl6jjeIKjv9RDSjWvtB71io02GMfcNxnDRv+f//JH/rue1j0samq9dUtkk0jkGkJzLoj8JoBBqaf36xNYYE75hKdHntLBOFKgwPDyIEy9p1F92MujfSg435Uq6B4eRk3QCEzzWDLvAJ1Me3IDSSmvUaifjosBzI+RmptTRl0zyfgJ3PkOnibCcE3tZV8CNLWB7p1xAmS4B7hgIH3C+3AJRAJNFUqSJUGBN4ttHbOn4hp0QV4=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"891c797d605e46cd9f97127fc45a0eac"}, [
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
  '1dc6d0ee-65e7-46a5-8510-12a562f4b7c3',
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
  'Tue, 16 Feb 2021 18:57:04 GMT',
  'Content-Length',
  '1326'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/CRUDCertificateName-candisableacertificate-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-candisableacertificate-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAzSv+chlJQBI6sI32nLHfJEXD6A1TkiX6eES16kubtsUqWTIBTkYfuu7aBsVfjxtQbP3+75tqbrHKTt1gk2nG/2+wP9yPElNj7pY710GQ5aZPbwxCBpAstJR0cC4h5AdHVYOwqdKcoFGETE9CwArKz5Nr1P/Vq077FeBxs31pmVTl35VZdXgiT1JQ9F6lSwq1D1Li0ONcX4Zh/e3IEX+iYfsXUwsGP6ydrLV3gVXX42UIiwhtn/8N5B98j7C8gny7TrlDJJfeosnZLZGSA6Lx234AOGTUyYsQzeYHajWA2aKSSFrn1R/tKNFtW2TTbEPA3y1aLiD99oAW94e4Q+SOuQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAB5CF2LO4Tx519nfEG8G4aflbUumVYW9Y6m/PUdNV1+FWpFGueEIBzZB5B80m3/DtrLw1XOgXsqOpgWtWFDOog/6vDpVj6PIx9ohLj6Cl6jjeIKjv9RDSjWvtB71io02GMfcNxnDRv+f//JH/rue1j0samq9dUtkk0jkGkJzLoj8JoBBqaf36xNYYE75hKdHntLBOFKgwPDyIEy9p1F92MujfSg435Uq6B4eRk3QCEzzWDLvAJ1Me3IDSSmvUaifjosBzI+RmptTRl0zyfgJ3PkOnibCcE3tZV8CNLWB7p1xAmS4B7hgIH3C+3AJRAJNFUqSJUGBN4ttHbOn4hp0QV4=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"891c797d605e46cd9f97127fc45a0eac"}, [
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
  'd4e2fbee-c976-42a4-807b-6a9e71f42d4a',
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
  'Tue, 16 Feb 2021 18:57:07 GMT',
  'Content-Length',
  '1326'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/CRUDCertificateName-candisableacertificate-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-candisableacertificate-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAzSv+chlJQBI6sI32nLHfJEXD6A1TkiX6eES16kubtsUqWTIBTkYfuu7aBsVfjxtQbP3+75tqbrHKTt1gk2nG/2+wP9yPElNj7pY710GQ5aZPbwxCBpAstJR0cC4h5AdHVYOwqdKcoFGETE9CwArKz5Nr1P/Vq077FeBxs31pmVTl35VZdXgiT1JQ9F6lSwq1D1Li0ONcX4Zh/e3IEX+iYfsXUwsGP6ydrLV3gVXX42UIiwhtn/8N5B98j7C8gny7TrlDJJfeosnZLZGSA6Lx234AOGTUyYsQzeYHajWA2aKSSFrn1R/tKNFtW2TTbEPA3y1aLiD99oAW94e4Q+SOuQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAB5CF2LO4Tx519nfEG8G4aflbUumVYW9Y6m/PUdNV1+FWpFGueEIBzZB5B80m3/DtrLw1XOgXsqOpgWtWFDOog/6vDpVj6PIx9ohLj6Cl6jjeIKjv9RDSjWvtB71io02GMfcNxnDRv+f//JH/rue1j0samq9dUtkk0jkGkJzLoj8JoBBqaf36xNYYE75hKdHntLBOFKgwPDyIEy9p1F92MujfSg435Uq6B4eRk3QCEzzWDLvAJ1Me3IDSSmvUaifjosBzI+RmptTRl0zyfgJ3PkOnibCcE3tZV8CNLWB7p1xAmS4B7hgIH3C+3AJRAJNFUqSJUGBN4ttHbOn4hp0QV4=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"891c797d605e46cd9f97127fc45a0eac"}, [
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
  '15ed39f1-cb0b-4279-876f-ef45a1e89a56',
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
  'Tue, 16 Feb 2021 18:57:09 GMT',
  'Content-Length',
  '1326'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/CRUDCertificateName-candisableacertificate-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-candisableacertificate-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAzSv+chlJQBI6sI32nLHfJEXD6A1TkiX6eES16kubtsUqWTIBTkYfuu7aBsVfjxtQbP3+75tqbrHKTt1gk2nG/2+wP9yPElNj7pY710GQ5aZPbwxCBpAstJR0cC4h5AdHVYOwqdKcoFGETE9CwArKz5Nr1P/Vq077FeBxs31pmVTl35VZdXgiT1JQ9F6lSwq1D1Li0ONcX4Zh/e3IEX+iYfsXUwsGP6ydrLV3gVXX42UIiwhtn/8N5B98j7C8gny7TrlDJJfeosnZLZGSA6Lx234AOGTUyYsQzeYHajWA2aKSSFrn1R/tKNFtW2TTbEPA3y1aLiD99oAW94e4Q+SOuQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAB5CF2LO4Tx519nfEG8G4aflbUumVYW9Y6m/PUdNV1+FWpFGueEIBzZB5B80m3/DtrLw1XOgXsqOpgWtWFDOog/6vDpVj6PIx9ohLj6Cl6jjeIKjv9RDSjWvtB71io02GMfcNxnDRv+f//JH/rue1j0samq9dUtkk0jkGkJzLoj8JoBBqaf36xNYYE75hKdHntLBOFKgwPDyIEy9p1F92MujfSg435Uq6B4eRk3QCEzzWDLvAJ1Me3IDSSmvUaifjosBzI+RmptTRl0zyfgJ3PkOnibCcE3tZV8CNLWB7p1xAmS4B7hgIH3C+3AJRAJNFUqSJUGBN4ttHbOn4hp0QV4=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"891c797d605e46cd9f97127fc45a0eac"}, [
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
  '6ccca2f9-8991-42b3-852c-47a4b6187c1e',
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
  'Tue, 16 Feb 2021 18:57:11 GMT',
  'Content-Length',
  '1326'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/CRUDCertificateName-candisableacertificate-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-candisableacertificate-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAzSv+chlJQBI6sI32nLHfJEXD6A1TkiX6eES16kubtsUqWTIBTkYfuu7aBsVfjxtQbP3+75tqbrHKTt1gk2nG/2+wP9yPElNj7pY710GQ5aZPbwxCBpAstJR0cC4h5AdHVYOwqdKcoFGETE9CwArKz5Nr1P/Vq077FeBxs31pmVTl35VZdXgiT1JQ9F6lSwq1D1Li0ONcX4Zh/e3IEX+iYfsXUwsGP6ydrLV3gVXX42UIiwhtn/8N5B98j7C8gny7TrlDJJfeosnZLZGSA6Lx234AOGTUyYsQzeYHajWA2aKSSFrn1R/tKNFtW2TTbEPA3y1aLiD99oAW94e4Q+SOuQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAB5CF2LO4Tx519nfEG8G4aflbUumVYW9Y6m/PUdNV1+FWpFGueEIBzZB5B80m3/DtrLw1XOgXsqOpgWtWFDOog/6vDpVj6PIx9ohLj6Cl6jjeIKjv9RDSjWvtB71io02GMfcNxnDRv+f//JH/rue1j0samq9dUtkk0jkGkJzLoj8JoBBqaf36xNYYE75hKdHntLBOFKgwPDyIEy9p1F92MujfSg435Uq6B4eRk3QCEzzWDLvAJ1Me3IDSSmvUaifjosBzI+RmptTRl0zyfgJ3PkOnibCcE3tZV8CNLWB7p1xAmS4B7hgIH3C+3AJRAJNFUqSJUGBN4ttHbOn4hp0QV4=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"891c797d605e46cd9f97127fc45a0eac"}, [
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
  'e64fb6f7-4def-45cc-9a17-72fa8a2ed330',
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
  'Tue, 16 Feb 2021 18:57:13 GMT',
  'Content-Length',
  '1326'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/CRUDCertificateName-candisableacertificate-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-candisableacertificate-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAzSv+chlJQBI6sI32nLHfJEXD6A1TkiX6eES16kubtsUqWTIBTkYfuu7aBsVfjxtQbP3+75tqbrHKTt1gk2nG/2+wP9yPElNj7pY710GQ5aZPbwxCBpAstJR0cC4h5AdHVYOwqdKcoFGETE9CwArKz5Nr1P/Vq077FeBxs31pmVTl35VZdXgiT1JQ9F6lSwq1D1Li0ONcX4Zh/e3IEX+iYfsXUwsGP6ydrLV3gVXX42UIiwhtn/8N5B98j7C8gny7TrlDJJfeosnZLZGSA6Lx234AOGTUyYsQzeYHajWA2aKSSFrn1R/tKNFtW2TTbEPA3y1aLiD99oAW94e4Q+SOuQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAB5CF2LO4Tx519nfEG8G4aflbUumVYW9Y6m/PUdNV1+FWpFGueEIBzZB5B80m3/DtrLw1XOgXsqOpgWtWFDOog/6vDpVj6PIx9ohLj6Cl6jjeIKjv9RDSjWvtB71io02GMfcNxnDRv+f//JH/rue1j0samq9dUtkk0jkGkJzLoj8JoBBqaf36xNYYE75hKdHntLBOFKgwPDyIEy9p1F92MujfSg435Uq6B4eRk3QCEzzWDLvAJ1Me3IDSSmvUaifjosBzI+RmptTRl0zyfgJ3PkOnibCcE3tZV8CNLWB7p1xAmS4B7hgIH3C+3AJRAJNFUqSJUGBN4ttHbOn4hp0QV4=","cancellation_requested":false,"status":"completed","target":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-candisableacertificate-","request_id":"891c797d605e46cd9f97127fc45a0eac"}, [
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
  'a7298375-08c7-411a-84bb-4bc02a76b4f3',
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
  'Tue, 16 Feb 2021 18:57:16 GMT',
  'Content-Length',
  '1279'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/CRUDCertificateName-candisableacertificate-/')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-candisableacertificate-/40f9d2fe2e694927a1c586d464b0574a","kid":"https://keyvault_name.vault.azure.net/keys/CRUDCertificateName-candisableacertificate-/40f9d2fe2e694927a1c586d464b0574a","sid":"https://keyvault_name.vault.azure.net/secrets/CRUDCertificateName-candisableacertificate-/40f9d2fe2e694927a1c586d464b0574a","x5t":"lU3RRj3s6mmITWsNOiTGWhoOtHA","cer":"MIIDKDCCAhCgAwIBAgIQPl/L4F2dRSeloN73hFgzkjANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjEwMjE2MTg0NzE0WhcNMjIwMjE2MTg1NzE0WjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQDNK/5yGUlAEjqwjfacsd8kRcPoDVOSJfp4RLXqS5u2xSpZMgFORh+67toGxV+PG1Bs/f7vm2puscpO3WCTacb/b7A/3I8SU2PuljvXQZDlpk9vDEIGkCy0lHRwLiHkB0dVg7Cp0pygUYRMT0LACsrPk2vU/9WrTvsV4HGzfWmZVOXflVl1eCJPUlD0XqVLCrUPUuLQ41xfhmH97cgRf6Jh+xdTCwY/rJ2stXeBVdfjZQiLCG2f/w3kH3yPsLyCfLtOuUMkl96iydktkZIDovHbfgA4ZNTJixDN5gdqNYDZopJIWufVH+0o0W1bZNNsQ8DfLVouIP32gBb3h7hD5I65AgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBRPNGQc3XKMy3dzCVBVv08AjW8GUDAdBgNVHQ4EFgQUTzRkHN1yjMt3cwlQVb9PAI1vBlAwDQYJKoZIhvcNAQELBQADggEBAKmP9CHzb4rAB8+sE6w2Rh8q3j/pd2MMQrpkx4c3ubMDwpj77PkonhBAojcw8n8rnhQ8kWkaGgZhpCU4OEgnf4H5/DB4SDlTMnVQKsUsD6lgR5pr8KvUakh7DXc2DUJ2VumGfK/1Tc8pdrnbssw9yXwHXIMVaohFthzbm8q6L/c/ytCk35cKeUgz2ezqOnGMvupBz5Nrqk+ETPQY80By+lAuu4CocnaSuwU913DG9n6nkN7vSipjQnVzTQCoR7mhfgx0BLY3w/I4RKrz0ou93dNzqTgYis9EdC3SOFddka/nDqoSSdTx36b1k2OlwwJQOtB3wDtEugshYUFj4eM/+2c=","attributes":{"enabled":true,"nbf":1613501234,"exp":1645037834,"created":1613501834,"updated":1613501834,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-candisableacertificate-/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1613501825,"updated":1613501825}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-candisableacertificate-/pending"}}, [
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
  '379ca8f0-06f8-4628-9944-13455a7c3133',
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
  'Tue, 16 Feb 2021 18:57:16 GMT',
  'Content-Length',
  '2529'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .patch('/certificates/CRUDCertificateName-candisableacertificate-/', {"attributes":{"enabled":false}})
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-candisableacertificate-/40f9d2fe2e694927a1c586d464b0574a","kid":"https://keyvault_name.vault.azure.net/keys/CRUDCertificateName-candisableacertificate-/40f9d2fe2e694927a1c586d464b0574a","sid":"https://keyvault_name.vault.azure.net/secrets/CRUDCertificateName-candisableacertificate-/40f9d2fe2e694927a1c586d464b0574a","x5t":"lU3RRj3s6mmITWsNOiTGWhoOtHA","cer":"MIIDKDCCAhCgAwIBAgIQPl/L4F2dRSeloN73hFgzkjANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjEwMjE2MTg0NzE0WhcNMjIwMjE2MTg1NzE0WjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQDNK/5yGUlAEjqwjfacsd8kRcPoDVOSJfp4RLXqS5u2xSpZMgFORh+67toGxV+PG1Bs/f7vm2puscpO3WCTacb/b7A/3I8SU2PuljvXQZDlpk9vDEIGkCy0lHRwLiHkB0dVg7Cp0pygUYRMT0LACsrPk2vU/9WrTvsV4HGzfWmZVOXflVl1eCJPUlD0XqVLCrUPUuLQ41xfhmH97cgRf6Jh+xdTCwY/rJ2stXeBVdfjZQiLCG2f/w3kH3yPsLyCfLtOuUMkl96iydktkZIDovHbfgA4ZNTJixDN5gdqNYDZopJIWufVH+0o0W1bZNNsQ8DfLVouIP32gBb3h7hD5I65AgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBRPNGQc3XKMy3dzCVBVv08AjW8GUDAdBgNVHQ4EFgQUTzRkHN1yjMt3cwlQVb9PAI1vBlAwDQYJKoZIhvcNAQELBQADggEBAKmP9CHzb4rAB8+sE6w2Rh8q3j/pd2MMQrpkx4c3ubMDwpj77PkonhBAojcw8n8rnhQ8kWkaGgZhpCU4OEgnf4H5/DB4SDlTMnVQKsUsD6lgR5pr8KvUakh7DXc2DUJ2VumGfK/1Tc8pdrnbssw9yXwHXIMVaohFthzbm8q6L/c/ytCk35cKeUgz2ezqOnGMvupBz5Nrqk+ETPQY80By+lAuu4CocnaSuwU913DG9n6nkN7vSipjQnVzTQCoR7mhfgx0BLY3w/I4RKrz0ou93dNzqTgYis9EdC3SOFddka/nDqoSSdTx36b1k2OlwwJQOtB3wDtEugshYUFj4eM/+2c=","attributes":{"enabled":false,"nbf":1613501234,"exp":1645037834,"created":1613501834,"updated":1613501836,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-candisableacertificate-/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1613501825,"updated":1613501825}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-candisableacertificate-/pending"}}, [
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
  '70d73ef7-8652-491e-9640-b53d3da1accb',
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
  'Tue, 16 Feb 2021 18:57:16 GMT',
  'Content-Length',
  '2530'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/CRUDCertificateName-candisableacertificate-/')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-candisableacertificate-/40f9d2fe2e694927a1c586d464b0574a","kid":"https://keyvault_name.vault.azure.net/keys/CRUDCertificateName-candisableacertificate-/40f9d2fe2e694927a1c586d464b0574a","sid":"https://keyvault_name.vault.azure.net/secrets/CRUDCertificateName-candisableacertificate-/40f9d2fe2e694927a1c586d464b0574a","x5t":"lU3RRj3s6mmITWsNOiTGWhoOtHA","cer":"MIIDKDCCAhCgAwIBAgIQPl/L4F2dRSeloN73hFgzkjANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjEwMjE2MTg0NzE0WhcNMjIwMjE2MTg1NzE0WjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQDNK/5yGUlAEjqwjfacsd8kRcPoDVOSJfp4RLXqS5u2xSpZMgFORh+67toGxV+PG1Bs/f7vm2puscpO3WCTacb/b7A/3I8SU2PuljvXQZDlpk9vDEIGkCy0lHRwLiHkB0dVg7Cp0pygUYRMT0LACsrPk2vU/9WrTvsV4HGzfWmZVOXflVl1eCJPUlD0XqVLCrUPUuLQ41xfhmH97cgRf6Jh+xdTCwY/rJ2stXeBVdfjZQiLCG2f/w3kH3yPsLyCfLtOuUMkl96iydktkZIDovHbfgA4ZNTJixDN5gdqNYDZopJIWufVH+0o0W1bZNNsQ8DfLVouIP32gBb3h7hD5I65AgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBRPNGQc3XKMy3dzCVBVv08AjW8GUDAdBgNVHQ4EFgQUTzRkHN1yjMt3cwlQVb9PAI1vBlAwDQYJKoZIhvcNAQELBQADggEBAKmP9CHzb4rAB8+sE6w2Rh8q3j/pd2MMQrpkx4c3ubMDwpj77PkonhBAojcw8n8rnhQ8kWkaGgZhpCU4OEgnf4H5/DB4SDlTMnVQKsUsD6lgR5pr8KvUakh7DXc2DUJ2VumGfK/1Tc8pdrnbssw9yXwHXIMVaohFthzbm8q6L/c/ytCk35cKeUgz2ezqOnGMvupBz5Nrqk+ETPQY80By+lAuu4CocnaSuwU913DG9n6nkN7vSipjQnVzTQCoR7mhfgx0BLY3w/I4RKrz0ou93dNzqTgYis9EdC3SOFddka/nDqoSSdTx36b1k2OlwwJQOtB3wDtEugshYUFj4eM/+2c=","attributes":{"enabled":false,"nbf":1613501234,"exp":1645037834,"created":1613501834,"updated":1613501836,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-candisableacertificate-/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1613501825,"updated":1613501825}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-candisableacertificate-/pending"}}, [
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
  '76bf0b8a-b00d-4bf7-852c-3890b906f95a',
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
  'Tue, 16 Feb 2021 18:57:16 GMT',
  'Content-Length',
  '2530'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/certificates/CRUDCertificateName-candisableacertificate-')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/CRUDCertificateName-candisableacertificate-","deletedDate":1613501836,"scheduledPurgeDate":1614106636,"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-candisableacertificate-/40f9d2fe2e694927a1c586d464b0574a","kid":"https://keyvault_name.vault.azure.net/keys/CRUDCertificateName-candisableacertificate-/40f9d2fe2e694927a1c586d464b0574a","sid":"https://keyvault_name.vault.azure.net/secrets/CRUDCertificateName-candisableacertificate-/40f9d2fe2e694927a1c586d464b0574a","x5t":"lU3RRj3s6mmITWsNOiTGWhoOtHA","cer":"MIIDKDCCAhCgAwIBAgIQPl/L4F2dRSeloN73hFgzkjANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjEwMjE2MTg0NzE0WhcNMjIwMjE2MTg1NzE0WjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQDNK/5yGUlAEjqwjfacsd8kRcPoDVOSJfp4RLXqS5u2xSpZMgFORh+67toGxV+PG1Bs/f7vm2puscpO3WCTacb/b7A/3I8SU2PuljvXQZDlpk9vDEIGkCy0lHRwLiHkB0dVg7Cp0pygUYRMT0LACsrPk2vU/9WrTvsV4HGzfWmZVOXflVl1eCJPUlD0XqVLCrUPUuLQ41xfhmH97cgRf6Jh+xdTCwY/rJ2stXeBVdfjZQiLCG2f/w3kH3yPsLyCfLtOuUMkl96iydktkZIDovHbfgA4ZNTJixDN5gdqNYDZopJIWufVH+0o0W1bZNNsQ8DfLVouIP32gBb3h7hD5I65AgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBRPNGQc3XKMy3dzCVBVv08AjW8GUDAdBgNVHQ4EFgQUTzRkHN1yjMt3cwlQVb9PAI1vBlAwDQYJKoZIhvcNAQELBQADggEBAKmP9CHzb4rAB8+sE6w2Rh8q3j/pd2MMQrpkx4c3ubMDwpj77PkonhBAojcw8n8rnhQ8kWkaGgZhpCU4OEgnf4H5/DB4SDlTMnVQKsUsD6lgR5pr8KvUakh7DXc2DUJ2VumGfK/1Tc8pdrnbssw9yXwHXIMVaohFthzbm8q6L/c/ytCk35cKeUgz2ezqOnGMvupBz5Nrqk+ETPQY80By+lAuu4CocnaSuwU913DG9n6nkN7vSipjQnVzTQCoR7mhfgx0BLY3w/I4RKrz0ou93dNzqTgYis9EdC3SOFddka/nDqoSSdTx36b1k2OlwwJQOtB3wDtEugshYUFj4eM/+2c=","attributes":{"enabled":false,"nbf":1613501234,"exp":1645037834,"created":1613501834,"updated":1613501836,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-candisableacertificate-/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1613501825,"updated":1613501825}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-candisableacertificate-/pending"}}, [
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
  '178030a2-db94-46c3-a467-5b0c8d200fb6',
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
  'Tue, 16 Feb 2021 18:57:16 GMT',
  'Content-Length',
  '2716'
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
  '143',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  'eb34ca8d-d179-44ad-b3c0-be75fe208813',
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
  'Tue, 16 Feb 2021 18:57:16 GMT'
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
  '143',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  'b242cc8d-8a45-41f2-a877-3bb2d6645d12',
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
  'Tue, 16 Feb 2021 18:57:16 GMT'
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
  '143',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  '25c0acb6-b905-4b38-8f77-06e97fc65765',
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
  'Tue, 16 Feb 2021 18:57:18 GMT'
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
  '143',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  '0877bb72-2e51-4fb1-9c30-86adb258f0ff',
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
  'Tue, 16 Feb 2021 18:57:20 GMT'
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
  '143',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  'd76e7f9a-2933-4851-bec6-0bd424fd741b',
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
  'Tue, 16 Feb 2021 18:57:22 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/CRUDCertificateName-candisableacertificate-')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/CRUDCertificateName-candisableacertificate-","deletedDate":1613501836,"scheduledPurgeDate":1614106636,"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-candisableacertificate-/40f9d2fe2e694927a1c586d464b0574a","kid":"https://keyvault_name.vault.azure.net/keys/CRUDCertificateName-candisableacertificate-/40f9d2fe2e694927a1c586d464b0574a","sid":"https://keyvault_name.vault.azure.net/secrets/CRUDCertificateName-candisableacertificate-/40f9d2fe2e694927a1c586d464b0574a","x5t":"lU3RRj3s6mmITWsNOiTGWhoOtHA","cer":"MIIDKDCCAhCgAwIBAgIQPl/L4F2dRSeloN73hFgzkjANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjEwMjE2MTg0NzE0WhcNMjIwMjE2MTg1NzE0WjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQDNK/5yGUlAEjqwjfacsd8kRcPoDVOSJfp4RLXqS5u2xSpZMgFORh+67toGxV+PG1Bs/f7vm2puscpO3WCTacb/b7A/3I8SU2PuljvXQZDlpk9vDEIGkCy0lHRwLiHkB0dVg7Cp0pygUYRMT0LACsrPk2vU/9WrTvsV4HGzfWmZVOXflVl1eCJPUlD0XqVLCrUPUuLQ41xfhmH97cgRf6Jh+xdTCwY/rJ2stXeBVdfjZQiLCG2f/w3kH3yPsLyCfLtOuUMkl96iydktkZIDovHbfgA4ZNTJixDN5gdqNYDZopJIWufVH+0o0W1bZNNsQ8DfLVouIP32gBb3h7hD5I65AgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBRPNGQc3XKMy3dzCVBVv08AjW8GUDAdBgNVHQ4EFgQUTzRkHN1yjMt3cwlQVb9PAI1vBlAwDQYJKoZIhvcNAQELBQADggEBAKmP9CHzb4rAB8+sE6w2Rh8q3j/pd2MMQrpkx4c3ubMDwpj77PkonhBAojcw8n8rnhQ8kWkaGgZhpCU4OEgnf4H5/DB4SDlTMnVQKsUsD6lgR5pr8KvUakh7DXc2DUJ2VumGfK/1Tc8pdrnbssw9yXwHXIMVaohFthzbm8q6L/c/ytCk35cKeUgz2ezqOnGMvupBz5Nrqk+ETPQY80By+lAuu4CocnaSuwU913DG9n6nkN7vSipjQnVzTQCoR7mhfgx0BLY3w/I4RKrz0ou93dNzqTgYis9EdC3SOFddka/nDqoSSdTx36b1k2OlwwJQOtB3wDtEugshYUFj4eM/+2c=","attributes":{"enabled":false,"nbf":1613501234,"exp":1645037834,"created":1613501834,"updated":1613501836,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-candisableacertificate-/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1613501825,"updated":1613501825}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-candisableacertificate-/pending"}}, [
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
  '05163530-21ff-4ab8-9236-ebee7e183c7f',
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
  'Tue, 16 Feb 2021 18:57:24 GMT',
  'Content-Length',
  '2716'
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
  'westus2',
  'x-ms-request-id',
  '346f6f82-eb0c-4864-b31a-e83f03a0300e',
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
  'Tue, 16 Feb 2021 18:57:24 GMT'
]);

let nock = require('nock');

module.exports.hash = "3e0943c3aeaacaa674176ccf126edc59";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/certificates/listCertificateName-canlistcertificates-0/create')
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
  '981be549-b240-42a9-8698-6e159187f131',
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
  'Tue, 16 Feb 2021 19:00:07 GMT'
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
  'c05d864a-9034-450c-a8c7-74ed9389eb00',
  'x-ms-ests-server',
  '2.1.11496.5 - EUS ProdSlices',
  'Set-Cookie',
  'fpc=AufoSEQpIbxLjzJaYLa_pBMA4qsDEwAAACEMvtcOAAAA; expires=Thu, 18-Mar-2021 19:00:07 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 16 Feb 2021 19:00:06 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/certificates/listCertificateName-canlistcertificates-0/create', {"policy":{"key_props":{},"secret_props":{},"x509_props":{"subject":"cn=MyCert","sans":{}},"issuer":{"name":"Self"},"attributes":{}},"attributes":{}})
  .query(true)
  .reply(202, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistcertificates-0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAvub0Rkcs5o+kOLTquwvZDsrgtazbYQHIvzKfMR12/XuMvS/9jOM7VHJO4Ud66loAtla3PvwPk6EfOVWVIgfgB6XSOiNE4TDOGi4FzpfPu9sQ2jgVYhoMeq4oSJBnk2B2LWV0Wm5Bate/Yu2SscF5muUvNNA9one9dMbGurCu6tre+I/8627oKKgvdQInX5+vmZRDmKF6OiL51Jjzz0tI07zp4rLdSiwrgV6UjA32QayVbFXxqDkBJOioW4KXmqtuxDLOR4TaQW6OrzoTX0VjwaC9IHe18bIQ6CGJmKHZoUgcEZ0G5Kr1kO8Ipc6o5exsHmWCZse9iYxQuAQJ2ft3nQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBABB1n6BiYenGhpJ14+XDA/nSyO5nEAhaXsPBiUT5rc1ylZ+xj3OPs+v8vVI5vAXb/9LWGuNzgrk7rtbnRqnn1DPjQlQJ04DBXZKJFR5l2AEhu8apg4f14c0EuC45ZVHQRbRowx6DDO/Gm9lJX9JlHnpHoG3gL6LFkHQDBCLvwYZpDVrFHJgWV1kvGprDptBsGmCZIhzVoo6I2xLgYDEzU/TRopfNVmlqmfIAIBoB6AmVAPEww8N5MPLgQVDyN5InKBIB46pADf2hwl2H/CfzmdC7AT6dHzZ+LxyABBwY4z4K9/biNih9H89OxE/NRAxYCSs21uWCrXnAUYgnbrT+kT0=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"1bfcc6942ea94b4ca3b69d96e37d09ba"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistcertificates-0/pending?api-version=7.2&request_id=1bfcc6942ea94b4ca3b69d96e37d09ba',
  'Retry-After',
  '10',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  '19bd6ea7-ff85-4fce-bbea-322435481009',
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
  'Tue, 16 Feb 2021 19:00:08 GMT',
  'Content-Length',
  '1323'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistcertificates-0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistcertificates-0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAvub0Rkcs5o+kOLTquwvZDsrgtazbYQHIvzKfMR12/XuMvS/9jOM7VHJO4Ud66loAtla3PvwPk6EfOVWVIgfgB6XSOiNE4TDOGi4FzpfPu9sQ2jgVYhoMeq4oSJBnk2B2LWV0Wm5Bate/Yu2SscF5muUvNNA9one9dMbGurCu6tre+I/8627oKKgvdQInX5+vmZRDmKF6OiL51Jjzz0tI07zp4rLdSiwrgV6UjA32QayVbFXxqDkBJOioW4KXmqtuxDLOR4TaQW6OrzoTX0VjwaC9IHe18bIQ6CGJmKHZoUgcEZ0G5Kr1kO8Ipc6o5exsHmWCZse9iYxQuAQJ2ft3nQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBABB1n6BiYenGhpJ14+XDA/nSyO5nEAhaXsPBiUT5rc1ylZ+xj3OPs+v8vVI5vAXb/9LWGuNzgrk7rtbnRqnn1DPjQlQJ04DBXZKJFR5l2AEhu8apg4f14c0EuC45ZVHQRbRowx6DDO/Gm9lJX9JlHnpHoG3gL6LFkHQDBCLvwYZpDVrFHJgWV1kvGprDptBsGmCZIhzVoo6I2xLgYDEzU/TRopfNVmlqmfIAIBoB6AmVAPEww8N5MPLgQVDyN5InKBIB46pADf2hwl2H/CfzmdC7AT6dHzZ+LxyABBwY4z4K9/biNih9H89OxE/NRAxYCSs21uWCrXnAUYgnbrT+kT0=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"1bfcc6942ea94b4ca3b69d96e37d09ba"}, [
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
  '97a4c085-5706-42ae-a01f-bb8ae0b62cde',
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
  'Tue, 16 Feb 2021 19:00:08 GMT',
  'Content-Length',
  '1323'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistcertificates-0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistcertificates-0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAvub0Rkcs5o+kOLTquwvZDsrgtazbYQHIvzKfMR12/XuMvS/9jOM7VHJO4Ud66loAtla3PvwPk6EfOVWVIgfgB6XSOiNE4TDOGi4FzpfPu9sQ2jgVYhoMeq4oSJBnk2B2LWV0Wm5Bate/Yu2SscF5muUvNNA9one9dMbGurCu6tre+I/8627oKKgvdQInX5+vmZRDmKF6OiL51Jjzz0tI07zp4rLdSiwrgV6UjA32QayVbFXxqDkBJOioW4KXmqtuxDLOR4TaQW6OrzoTX0VjwaC9IHe18bIQ6CGJmKHZoUgcEZ0G5Kr1kO8Ipc6o5exsHmWCZse9iYxQuAQJ2ft3nQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBABB1n6BiYenGhpJ14+XDA/nSyO5nEAhaXsPBiUT5rc1ylZ+xj3OPs+v8vVI5vAXb/9LWGuNzgrk7rtbnRqnn1DPjQlQJ04DBXZKJFR5l2AEhu8apg4f14c0EuC45ZVHQRbRowx6DDO/Gm9lJX9JlHnpHoG3gL6LFkHQDBCLvwYZpDVrFHJgWV1kvGprDptBsGmCZIhzVoo6I2xLgYDEzU/TRopfNVmlqmfIAIBoB6AmVAPEww8N5MPLgQVDyN5InKBIB46pADf2hwl2H/CfzmdC7AT6dHzZ+LxyABBwY4z4K9/biNih9H89OxE/NRAxYCSs21uWCrXnAUYgnbrT+kT0=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"1bfcc6942ea94b4ca3b69d96e37d09ba"}, [
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
  '521acf6c-ffb5-4edd-ae25-e664b3e28699',
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
  'Tue, 16 Feb 2021 19:00:08 GMT',
  'Content-Length',
  '1323'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistcertificates-0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistcertificates-0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAvub0Rkcs5o+kOLTquwvZDsrgtazbYQHIvzKfMR12/XuMvS/9jOM7VHJO4Ud66loAtla3PvwPk6EfOVWVIgfgB6XSOiNE4TDOGi4FzpfPu9sQ2jgVYhoMeq4oSJBnk2B2LWV0Wm5Bate/Yu2SscF5muUvNNA9one9dMbGurCu6tre+I/8627oKKgvdQInX5+vmZRDmKF6OiL51Jjzz0tI07zp4rLdSiwrgV6UjA32QayVbFXxqDkBJOioW4KXmqtuxDLOR4TaQW6OrzoTX0VjwaC9IHe18bIQ6CGJmKHZoUgcEZ0G5Kr1kO8Ipc6o5exsHmWCZse9iYxQuAQJ2ft3nQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBABB1n6BiYenGhpJ14+XDA/nSyO5nEAhaXsPBiUT5rc1ylZ+xj3OPs+v8vVI5vAXb/9LWGuNzgrk7rtbnRqnn1DPjQlQJ04DBXZKJFR5l2AEhu8apg4f14c0EuC45ZVHQRbRowx6DDO/Gm9lJX9JlHnpHoG3gL6LFkHQDBCLvwYZpDVrFHJgWV1kvGprDptBsGmCZIhzVoo6I2xLgYDEzU/TRopfNVmlqmfIAIBoB6AmVAPEww8N5MPLgQVDyN5InKBIB46pADf2hwl2H/CfzmdC7AT6dHzZ+LxyABBwY4z4K9/biNih9H89OxE/NRAxYCSs21uWCrXnAUYgnbrT+kT0=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"1bfcc6942ea94b4ca3b69d96e37d09ba"}, [
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
  '118f5e2b-9f2b-4e03-b776-7d4ebb10367a',
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
  'Tue, 16 Feb 2021 19:00:09 GMT',
  'Content-Length',
  '1323'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistcertificates-0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistcertificates-0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAvub0Rkcs5o+kOLTquwvZDsrgtazbYQHIvzKfMR12/XuMvS/9jOM7VHJO4Ud66loAtla3PvwPk6EfOVWVIgfgB6XSOiNE4TDOGi4FzpfPu9sQ2jgVYhoMeq4oSJBnk2B2LWV0Wm5Bate/Yu2SscF5muUvNNA9one9dMbGurCu6tre+I/8627oKKgvdQInX5+vmZRDmKF6OiL51Jjzz0tI07zp4rLdSiwrgV6UjA32QayVbFXxqDkBJOioW4KXmqtuxDLOR4TaQW6OrzoTX0VjwaC9IHe18bIQ6CGJmKHZoUgcEZ0G5Kr1kO8Ipc6o5exsHmWCZse9iYxQuAQJ2ft3nQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBABB1n6BiYenGhpJ14+XDA/nSyO5nEAhaXsPBiUT5rc1ylZ+xj3OPs+v8vVI5vAXb/9LWGuNzgrk7rtbnRqnn1DPjQlQJ04DBXZKJFR5l2AEhu8apg4f14c0EuC45ZVHQRbRowx6DDO/Gm9lJX9JlHnpHoG3gL6LFkHQDBCLvwYZpDVrFHJgWV1kvGprDptBsGmCZIhzVoo6I2xLgYDEzU/TRopfNVmlqmfIAIBoB6AmVAPEww8N5MPLgQVDyN5InKBIB46pADf2hwl2H/CfzmdC7AT6dHzZ+LxyABBwY4z4K9/biNih9H89OxE/NRAxYCSs21uWCrXnAUYgnbrT+kT0=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"1bfcc6942ea94b4ca3b69d96e37d09ba"}, [
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
  'e3fd08e9-6440-4fd3-a03b-631fe0cc0878',
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
  'Tue, 16 Feb 2021 19:00:11 GMT',
  'Content-Length',
  '1323'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistcertificates-0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistcertificates-0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAvub0Rkcs5o+kOLTquwvZDsrgtazbYQHIvzKfMR12/XuMvS/9jOM7VHJO4Ud66loAtla3PvwPk6EfOVWVIgfgB6XSOiNE4TDOGi4FzpfPu9sQ2jgVYhoMeq4oSJBnk2B2LWV0Wm5Bate/Yu2SscF5muUvNNA9one9dMbGurCu6tre+I/8627oKKgvdQInX5+vmZRDmKF6OiL51Jjzz0tI07zp4rLdSiwrgV6UjA32QayVbFXxqDkBJOioW4KXmqtuxDLOR4TaQW6OrzoTX0VjwaC9IHe18bIQ6CGJmKHZoUgcEZ0G5Kr1kO8Ipc6o5exsHmWCZse9iYxQuAQJ2ft3nQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBABB1n6BiYenGhpJ14+XDA/nSyO5nEAhaXsPBiUT5rc1ylZ+xj3OPs+v8vVI5vAXb/9LWGuNzgrk7rtbnRqnn1DPjQlQJ04DBXZKJFR5l2AEhu8apg4f14c0EuC45ZVHQRbRowx6DDO/Gm9lJX9JlHnpHoG3gL6LFkHQDBCLvwYZpDVrFHJgWV1kvGprDptBsGmCZIhzVoo6I2xLgYDEzU/TRopfNVmlqmfIAIBoB6AmVAPEww8N5MPLgQVDyN5InKBIB46pADf2hwl2H/CfzmdC7AT6dHzZ+LxyABBwY4z4K9/biNih9H89OxE/NRAxYCSs21uWCrXnAUYgnbrT+kT0=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"1bfcc6942ea94b4ca3b69d96e37d09ba"}, [
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
  'cc203139-5301-443a-befc-070a1912996d',
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
  'Tue, 16 Feb 2021 19:00:13 GMT',
  'Content-Length',
  '1323'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistcertificates-0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistcertificates-0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAvub0Rkcs5o+kOLTquwvZDsrgtazbYQHIvzKfMR12/XuMvS/9jOM7VHJO4Ud66loAtla3PvwPk6EfOVWVIgfgB6XSOiNE4TDOGi4FzpfPu9sQ2jgVYhoMeq4oSJBnk2B2LWV0Wm5Bate/Yu2SscF5muUvNNA9one9dMbGurCu6tre+I/8627oKKgvdQInX5+vmZRDmKF6OiL51Jjzz0tI07zp4rLdSiwrgV6UjA32QayVbFXxqDkBJOioW4KXmqtuxDLOR4TaQW6OrzoTX0VjwaC9IHe18bIQ6CGJmKHZoUgcEZ0G5Kr1kO8Ipc6o5exsHmWCZse9iYxQuAQJ2ft3nQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBABB1n6BiYenGhpJ14+XDA/nSyO5nEAhaXsPBiUT5rc1ylZ+xj3OPs+v8vVI5vAXb/9LWGuNzgrk7rtbnRqnn1DPjQlQJ04DBXZKJFR5l2AEhu8apg4f14c0EuC45ZVHQRbRowx6DDO/Gm9lJX9JlHnpHoG3gL6LFkHQDBCLvwYZpDVrFHJgWV1kvGprDptBsGmCZIhzVoo6I2xLgYDEzU/TRopfNVmlqmfIAIBoB6AmVAPEww8N5MPLgQVDyN5InKBIB46pADf2hwl2H/CfzmdC7AT6dHzZ+LxyABBwY4z4K9/biNih9H89OxE/NRAxYCSs21uWCrXnAUYgnbrT+kT0=","cancellation_requested":false,"status":"completed","target":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistcertificates-0","request_id":"1bfcc6942ea94b4ca3b69d96e37d09ba"}, [
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
  '5d822ba6-5d05-48ec-a1fe-666b3b5b275a',
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
  'Tue, 16 Feb 2021 19:00:16 GMT',
  'Content-Length',
  '1273'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistcertificates-0/')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistcertificates-0/1dde311c1d264a8fb4064f7aebd61f29","kid":"https://keyvault_name.vault.azure.net/keys/listCertificateName-canlistcertificates-0/1dde311c1d264a8fb4064f7aebd61f29","sid":"https://keyvault_name.vault.azure.net/secrets/listCertificateName-canlistcertificates-0/1dde311c1d264a8fb4064f7aebd61f29","x5t":"mIL26Kwv5hJW66zuGns2isdVNcU","cer":"MIIDKDCCAhCgAwIBAgIQOxLpAhSBRJufd8054l+XzjANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjEwMjE2MTg1MDE1WhcNMjIwMjE2MTkwMDE1WjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQC+5vRGRyzmj6Q4tOq7C9kOyuC1rNthAci/Mp8xHXb9e4y9L/2M4ztUck7hR3rqWgC2Vrc+/A+ToR85VZUiB+AHpdI6I0ThMM4aLgXOl8+72xDaOBViGgx6rihIkGeTYHYtZXRabkFq179i7ZKxwXma5S800D2id710xsa6sK7q2t74j/zrbugoqC91Aidfn6+ZlEOYoXo6IvnUmPPPS0jTvOnist1KLCuBXpSMDfZBrJVsVfGoOQEk6Khbgpeaq27EMs5HhNpBbo6vOhNfRWPBoL0gd7XxshDoIYmYodmhSBwRnQbkqvWQ7wilzqjl7GweZYJmx72JjFC4BAnZ+3edAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBThc4t41g8VNJgtjb3vOq4QQoJTWDAdBgNVHQ4EFgQU4XOLeNYPFTSYLY297zquEEKCU1gwDQYJKoZIhvcNAQELBQADggEBAAGKN3F+QN6rmhh2bQWpNpCogEYsHvgPtOHS45/twWn3IMPBKsZTeAP6lhGt5gAsDezhgKbyrWXNRM8FISCjQTaaNOa8pjeNDDJ7kK3Tg/qx3vUMq0FNC5zFLP1nUKlBAJuTxXcJVhTAxNmmd6ScAIO0GbgelBNVCQwFe3oOip6IZ3OjjZ9rwZe+bzcRmLsTODVTucwSERfLzHaPQ981oJPHY1euzVpqg8m/FYQcUGD1X1wyOYHlETfeFXpTaZL0e1IjOWOtM92JDPSG8LDvF//8gTMMK8KzbLeyiEQaS0jTHHOqCaqzwCpXOQqdFssEfx3PrtQDdZdawZBiYKECuds=","attributes":{"enabled":true,"nbf":1613501415,"exp":1645038015,"created":1613502015,"updated":1613502015,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistcertificates-0/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1613502007,"updated":1613502007}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistcertificates-0/pending"}}, [
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
  '860e3c8a-7a94-4852-8c7c-a2849a21f3bb',
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
  'Tue, 16 Feb 2021 19:00:16 GMT',
  'Content-Length',
  '2514'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/certificates/listCertificateName-canlistcertificates-1/create', {"policy":{"key_props":{},"secret_props":{},"x509_props":{"subject":"cn=MyCert","sans":{}},"issuer":{"name":"Self"},"attributes":{}},"attributes":{}})
  .query(true)
  .reply(202, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistcertificates-1/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA4gcnfKDrzH/r6aAwxoi7DIyRTZxphUQXWXB0FntKIoaCXOMpRV6v+/lPcFNfF5ALwGH4dU/gV4AyamcVNLAvdZqwugbl6V/POx7yMh7SZFPskDuyODFwGGRCV/hDrt7QVssZ/cEYHJEOFRxyF3P1Q9CIg7Fufmv677FzFAJslIpufw4+IrvPA/feucKqOAnzNoVWCMxpHCIyJWfhaTol49QYHsKYaIPzC+dD2h8SCgrbliR5oqQuX8PI4sNohojn3gswlDU2vYokv2+RYeFkbkjc/oMVv3toQ1yZteV34qUKimGQzUadPgna5O0bn22yxRFbdVw5zcDB70PNSNnmxQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAHfgPuM+7WJwJhZ+XMr+Dy1jKEcJMKeP6j4H+CzMk+ddy/KhFfFakVuQy8O5OlXIHHhNOUKhq8AV+XXWGW1L2oQx0469j64kVZ2cfvrQMUm3ACXKSljc0gWl3e4zbavvfIlIM4bCxNLrwf8/j16/e5tf6w0JXiYi9R/yZPWggKSRX+af7mFYQ/KqlLMpLbkg1SD5CntVZLpyH6fEJRBNCVzsS+gvJ3rVgydzUh4Q05UMuTMHqk3kyTcJp4cpyNJzHF/1oNbj8d/3g6qSCnjllataqtaUBYa6GY/X/IaASnYV9LTeKBRu5riXIPiU5gu6mNS004JQpHwRFgnIYWAjV1U=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"ccf86bc3940b40f3b93235b1069ed539"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistcertificates-1/pending?api-version=7.2&request_id=ccf86bc3940b40f3b93235b1069ed539',
  'Retry-After',
  '10',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  'cef7ae26-c569-429c-a355-11e70a801f18',
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
  'Tue, 16 Feb 2021 19:00:16 GMT',
  'Content-Length',
  '1323'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistcertificates-1/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistcertificates-1/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA4gcnfKDrzH/r6aAwxoi7DIyRTZxphUQXWXB0FntKIoaCXOMpRV6v+/lPcFNfF5ALwGH4dU/gV4AyamcVNLAvdZqwugbl6V/POx7yMh7SZFPskDuyODFwGGRCV/hDrt7QVssZ/cEYHJEOFRxyF3P1Q9CIg7Fufmv677FzFAJslIpufw4+IrvPA/feucKqOAnzNoVWCMxpHCIyJWfhaTol49QYHsKYaIPzC+dD2h8SCgrbliR5oqQuX8PI4sNohojn3gswlDU2vYokv2+RYeFkbkjc/oMVv3toQ1yZteV34qUKimGQzUadPgna5O0bn22yxRFbdVw5zcDB70PNSNnmxQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAHfgPuM+7WJwJhZ+XMr+Dy1jKEcJMKeP6j4H+CzMk+ddy/KhFfFakVuQy8O5OlXIHHhNOUKhq8AV+XXWGW1L2oQx0469j64kVZ2cfvrQMUm3ACXKSljc0gWl3e4zbavvfIlIM4bCxNLrwf8/j16/e5tf6w0JXiYi9R/yZPWggKSRX+af7mFYQ/KqlLMpLbkg1SD5CntVZLpyH6fEJRBNCVzsS+gvJ3rVgydzUh4Q05UMuTMHqk3kyTcJp4cpyNJzHF/1oNbj8d/3g6qSCnjllataqtaUBYa6GY/X/IaASnYV9LTeKBRu5riXIPiU5gu6mNS004JQpHwRFgnIYWAjV1U=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"ccf86bc3940b40f3b93235b1069ed539"}, [
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
  'b8f9b62d-de57-4228-94a3-858e8544f613',
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
  'Tue, 16 Feb 2021 19:00:16 GMT',
  'Content-Length',
  '1323'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistcertificates-1/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistcertificates-1/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA4gcnfKDrzH/r6aAwxoi7DIyRTZxphUQXWXB0FntKIoaCXOMpRV6v+/lPcFNfF5ALwGH4dU/gV4AyamcVNLAvdZqwugbl6V/POx7yMh7SZFPskDuyODFwGGRCV/hDrt7QVssZ/cEYHJEOFRxyF3P1Q9CIg7Fufmv677FzFAJslIpufw4+IrvPA/feucKqOAnzNoVWCMxpHCIyJWfhaTol49QYHsKYaIPzC+dD2h8SCgrbliR5oqQuX8PI4sNohojn3gswlDU2vYokv2+RYeFkbkjc/oMVv3toQ1yZteV34qUKimGQzUadPgna5O0bn22yxRFbdVw5zcDB70PNSNnmxQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAHfgPuM+7WJwJhZ+XMr+Dy1jKEcJMKeP6j4H+CzMk+ddy/KhFfFakVuQy8O5OlXIHHhNOUKhq8AV+XXWGW1L2oQx0469j64kVZ2cfvrQMUm3ACXKSljc0gWl3e4zbavvfIlIM4bCxNLrwf8/j16/e5tf6w0JXiYi9R/yZPWggKSRX+af7mFYQ/KqlLMpLbkg1SD5CntVZLpyH6fEJRBNCVzsS+gvJ3rVgydzUh4Q05UMuTMHqk3kyTcJp4cpyNJzHF/1oNbj8d/3g6qSCnjllataqtaUBYa6GY/X/IaASnYV9LTeKBRu5riXIPiU5gu6mNS004JQpHwRFgnIYWAjV1U=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"ccf86bc3940b40f3b93235b1069ed539"}, [
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
  '56461476-5a38-450b-aaf2-bdb2129bae0c',
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
  'Tue, 16 Feb 2021 19:00:16 GMT',
  'Content-Length',
  '1323'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistcertificates-1/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistcertificates-1/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA4gcnfKDrzH/r6aAwxoi7DIyRTZxphUQXWXB0FntKIoaCXOMpRV6v+/lPcFNfF5ALwGH4dU/gV4AyamcVNLAvdZqwugbl6V/POx7yMh7SZFPskDuyODFwGGRCV/hDrt7QVssZ/cEYHJEOFRxyF3P1Q9CIg7Fufmv677FzFAJslIpufw4+IrvPA/feucKqOAnzNoVWCMxpHCIyJWfhaTol49QYHsKYaIPzC+dD2h8SCgrbliR5oqQuX8PI4sNohojn3gswlDU2vYokv2+RYeFkbkjc/oMVv3toQ1yZteV34qUKimGQzUadPgna5O0bn22yxRFbdVw5zcDB70PNSNnmxQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAHfgPuM+7WJwJhZ+XMr+Dy1jKEcJMKeP6j4H+CzMk+ddy/KhFfFakVuQy8O5OlXIHHhNOUKhq8AV+XXWGW1L2oQx0469j64kVZ2cfvrQMUm3ACXKSljc0gWl3e4zbavvfIlIM4bCxNLrwf8/j16/e5tf6w0JXiYi9R/yZPWggKSRX+af7mFYQ/KqlLMpLbkg1SD5CntVZLpyH6fEJRBNCVzsS+gvJ3rVgydzUh4Q05UMuTMHqk3kyTcJp4cpyNJzHF/1oNbj8d/3g6qSCnjllataqtaUBYa6GY/X/IaASnYV9LTeKBRu5riXIPiU5gu6mNS004JQpHwRFgnIYWAjV1U=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"ccf86bc3940b40f3b93235b1069ed539"}, [
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
  '38a093f8-8e95-4261-837f-83bb576b3d93',
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
  'Tue, 16 Feb 2021 19:00:18 GMT',
  'Content-Length',
  '1323'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistcertificates-1/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistcertificates-1/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA4gcnfKDrzH/r6aAwxoi7DIyRTZxphUQXWXB0FntKIoaCXOMpRV6v+/lPcFNfF5ALwGH4dU/gV4AyamcVNLAvdZqwugbl6V/POx7yMh7SZFPskDuyODFwGGRCV/hDrt7QVssZ/cEYHJEOFRxyF3P1Q9CIg7Fufmv677FzFAJslIpufw4+IrvPA/feucKqOAnzNoVWCMxpHCIyJWfhaTol49QYHsKYaIPzC+dD2h8SCgrbliR5oqQuX8PI4sNohojn3gswlDU2vYokv2+RYeFkbkjc/oMVv3toQ1yZteV34qUKimGQzUadPgna5O0bn22yxRFbdVw5zcDB70PNSNnmxQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAHfgPuM+7WJwJhZ+XMr+Dy1jKEcJMKeP6j4H+CzMk+ddy/KhFfFakVuQy8O5OlXIHHhNOUKhq8AV+XXWGW1L2oQx0469j64kVZ2cfvrQMUm3ACXKSljc0gWl3e4zbavvfIlIM4bCxNLrwf8/j16/e5tf6w0JXiYi9R/yZPWggKSRX+af7mFYQ/KqlLMpLbkg1SD5CntVZLpyH6fEJRBNCVzsS+gvJ3rVgydzUh4Q05UMuTMHqk3kyTcJp4cpyNJzHF/1oNbj8d/3g6qSCnjllataqtaUBYa6GY/X/IaASnYV9LTeKBRu5riXIPiU5gu6mNS004JQpHwRFgnIYWAjV1U=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"ccf86bc3940b40f3b93235b1069ed539"}, [
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
  '8f6595a1-f959-44ca-9c5f-69d484879229',
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
  'Tue, 16 Feb 2021 19:00:20 GMT',
  'Content-Length',
  '1323'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistcertificates-1/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistcertificates-1/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA4gcnfKDrzH/r6aAwxoi7DIyRTZxphUQXWXB0FntKIoaCXOMpRV6v+/lPcFNfF5ALwGH4dU/gV4AyamcVNLAvdZqwugbl6V/POx7yMh7SZFPskDuyODFwGGRCV/hDrt7QVssZ/cEYHJEOFRxyF3P1Q9CIg7Fufmv677FzFAJslIpufw4+IrvPA/feucKqOAnzNoVWCMxpHCIyJWfhaTol49QYHsKYaIPzC+dD2h8SCgrbliR5oqQuX8PI4sNohojn3gswlDU2vYokv2+RYeFkbkjc/oMVv3toQ1yZteV34qUKimGQzUadPgna5O0bn22yxRFbdVw5zcDB70PNSNnmxQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAHfgPuM+7WJwJhZ+XMr+Dy1jKEcJMKeP6j4H+CzMk+ddy/KhFfFakVuQy8O5OlXIHHhNOUKhq8AV+XXWGW1L2oQx0469j64kVZ2cfvrQMUm3ACXKSljc0gWl3e4zbavvfIlIM4bCxNLrwf8/j16/e5tf6w0JXiYi9R/yZPWggKSRX+af7mFYQ/KqlLMpLbkg1SD5CntVZLpyH6fEJRBNCVzsS+gvJ3rVgydzUh4Q05UMuTMHqk3kyTcJp4cpyNJzHF/1oNbj8d/3g6qSCnjllataqtaUBYa6GY/X/IaASnYV9LTeKBRu5riXIPiU5gu6mNS004JQpHwRFgnIYWAjV1U=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"ccf86bc3940b40f3b93235b1069ed539"}, [
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
  'fcb9f69a-20de-4978-ac58-9b671d16fc24',
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
  'Tue, 16 Feb 2021 19:00:22 GMT',
  'Content-Length',
  '1323'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistcertificates-1/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistcertificates-1/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA4gcnfKDrzH/r6aAwxoi7DIyRTZxphUQXWXB0FntKIoaCXOMpRV6v+/lPcFNfF5ALwGH4dU/gV4AyamcVNLAvdZqwugbl6V/POx7yMh7SZFPskDuyODFwGGRCV/hDrt7QVssZ/cEYHJEOFRxyF3P1Q9CIg7Fufmv677FzFAJslIpufw4+IrvPA/feucKqOAnzNoVWCMxpHCIyJWfhaTol49QYHsKYaIPzC+dD2h8SCgrbliR5oqQuX8PI4sNohojn3gswlDU2vYokv2+RYeFkbkjc/oMVv3toQ1yZteV34qUKimGQzUadPgna5O0bn22yxRFbdVw5zcDB70PNSNnmxQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAHfgPuM+7WJwJhZ+XMr+Dy1jKEcJMKeP6j4H+CzMk+ddy/KhFfFakVuQy8O5OlXIHHhNOUKhq8AV+XXWGW1L2oQx0469j64kVZ2cfvrQMUm3ACXKSljc0gWl3e4zbavvfIlIM4bCxNLrwf8/j16/e5tf6w0JXiYi9R/yZPWggKSRX+af7mFYQ/KqlLMpLbkg1SD5CntVZLpyH6fEJRBNCVzsS+gvJ3rVgydzUh4Q05UMuTMHqk3kyTcJp4cpyNJzHF/1oNbj8d/3g6qSCnjllataqtaUBYa6GY/X/IaASnYV9LTeKBRu5riXIPiU5gu6mNS004JQpHwRFgnIYWAjV1U=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"ccf86bc3940b40f3b93235b1069ed539"}, [
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
  '7bc98e26-8bb1-4002-bd90-44dffae54e88',
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
  'Tue, 16 Feb 2021 19:00:24 GMT',
  'Content-Length',
  '1323'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistcertificates-1/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistcertificates-1/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA4gcnfKDrzH/r6aAwxoi7DIyRTZxphUQXWXB0FntKIoaCXOMpRV6v+/lPcFNfF5ALwGH4dU/gV4AyamcVNLAvdZqwugbl6V/POx7yMh7SZFPskDuyODFwGGRCV/hDrt7QVssZ/cEYHJEOFRxyF3P1Q9CIg7Fufmv677FzFAJslIpufw4+IrvPA/feucKqOAnzNoVWCMxpHCIyJWfhaTol49QYHsKYaIPzC+dD2h8SCgrbliR5oqQuX8PI4sNohojn3gswlDU2vYokv2+RYeFkbkjc/oMVv3toQ1yZteV34qUKimGQzUadPgna5O0bn22yxRFbdVw5zcDB70PNSNnmxQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAHfgPuM+7WJwJhZ+XMr+Dy1jKEcJMKeP6j4H+CzMk+ddy/KhFfFakVuQy8O5OlXIHHhNOUKhq8AV+XXWGW1L2oQx0469j64kVZ2cfvrQMUm3ACXKSljc0gWl3e4zbavvfIlIM4bCxNLrwf8/j16/e5tf6w0JXiYi9R/yZPWggKSRX+af7mFYQ/KqlLMpLbkg1SD5CntVZLpyH6fEJRBNCVzsS+gvJ3rVgydzUh4Q05UMuTMHqk3kyTcJp4cpyNJzHF/1oNbj8d/3g6qSCnjllataqtaUBYa6GY/X/IaASnYV9LTeKBRu5riXIPiU5gu6mNS004JQpHwRFgnIYWAjV1U=","cancellation_requested":false,"status":"completed","target":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistcertificates-1","request_id":"ccf86bc3940b40f3b93235b1069ed539"}, [
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
  '680ac085-ad61-4557-b947-befc9a9016ca',
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
  'Tue, 16 Feb 2021 19:00:27 GMT',
  'Content-Length',
  '1273'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistcertificates-1/')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistcertificates-1/6d542f7001b94e9fa306d50a4e79de8a","kid":"https://keyvault_name.vault.azure.net/keys/listCertificateName-canlistcertificates-1/6d542f7001b94e9fa306d50a4e79de8a","sid":"https://keyvault_name.vault.azure.net/secrets/listCertificateName-canlistcertificates-1/6d542f7001b94e9fa306d50a4e79de8a","x5t":"-RACLM3G5Fp1F3PNudWmDInuxvE","cer":"MIIDKDCCAhCgAwIBAgIQc9EPH3FtRTOd2QX4KlPdbjANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjEwMjE2MTg1MDI1WhcNMjIwMjE2MTkwMDI1WjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQDiByd8oOvMf+vpoDDGiLsMjJFNnGmFRBdZcHQWe0oihoJc4ylFXq/7+U9wU18XkAvAYfh1T+BXgDJqZxU0sC91mrC6BuXpX887HvIyHtJkU+yQO7I4MXAYZEJX+EOu3tBWyxn9wRgckQ4VHHIXc/VD0IiDsW5+a/rvsXMUAmyUim5/Dj4iu88D9965wqo4CfM2hVYIzGkcIjIlZ+FpOiXj1Bgewphog/ML50PaHxIKCtuWJHmipC5fw8jiw2iGiOfeCzCUNTa9iiS/b5Fh4WRuSNz+gxW/e2hDXJm15XfipQqKYZDNRp0+Cdrk7RufbbLFEVt1XDnNwMHvQ81I2ebFAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBT8k2Q/TF5Fn1Qk39VGj/rsQik/+jAdBgNVHQ4EFgQU/JNkP0xeRZ9UJN/VRo/67EIpP/owDQYJKoZIhvcNAQELBQADggEBAJFxj0889wowcjn6hh1PSCJV7/zXvJDcZOCzWZf9MQ8zH5rBtOyCCQjLUCDrTVIa64QapD0Byc8AHHNoXmr8Fk/d3z54oA8dM6Sby5RxMmTHKzjSaQoRIyFC69eKV4VyTJ6ktHdlPyBQAyGieUOw1LbUzS3wg+GI1zOEs/wWjFxKI5xIOea5X3PyaC2uRThllogl+frNfHdKhHivyqay2O/IlKe3IRZ/Nmvfus9B167uPvWJmQE+Zz/sMtiWiDclLgnjFXounn1Sa5quFPws0+WgIwQNP5dNFialOd3kKGwoaMeYjTqx6tq6TpH5ySO3qmMx7GCtM+cPfloa5PSMbG0=","attributes":{"enabled":true,"nbf":1613501425,"exp":1645038025,"created":1613502025,"updated":1613502025,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistcertificates-1/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1613502016,"updated":1613502016}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistcertificates-1/pending"}}, [
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
  '76e93fad-495d-43a2-9e0c-c329d513218b',
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
  'Tue, 16 Feb 2021 19:00:27 GMT',
  'Content-Length',
  '2514'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates')
  .query(true)
  .reply(200, {"value":[{"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistcertificates-0","x5t":"mIL26Kwv5hJW66zuGns2isdVNcU","attributes":{"enabled":true,"nbf":1613501415,"exp":1645038015,"created":1613502015,"updated":1613502015},"subject":""},{"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistcertificates-1","x5t":"-RACLM3G5Fp1F3PNudWmDInuxvE","attributes":{"enabled":true,"nbf":1613501425,"exp":1645038025,"created":1613502025,"updated":1613502025},"subject":""}],"nextLink":null}, [
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
  'eb7a2231-394c-4808-8ab2-2f205b0fbdd4',
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
  'Tue, 16 Feb 2021 19:00:27 GMT',
  'Content-Length',
  '563'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/certificates/listCertificateName-canlistcertificates-0')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/listCertificateName-canlistcertificates-0","deletedDate":1613502027,"scheduledPurgeDate":1614106827,"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistcertificates-0/1dde311c1d264a8fb4064f7aebd61f29","kid":"https://keyvault_name.vault.azure.net/keys/listCertificateName-canlistcertificates-0/1dde311c1d264a8fb4064f7aebd61f29","sid":"https://keyvault_name.vault.azure.net/secrets/listCertificateName-canlistcertificates-0/1dde311c1d264a8fb4064f7aebd61f29","x5t":"mIL26Kwv5hJW66zuGns2isdVNcU","cer":"MIIDKDCCAhCgAwIBAgIQOxLpAhSBRJufd8054l+XzjANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjEwMjE2MTg1MDE1WhcNMjIwMjE2MTkwMDE1WjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQC+5vRGRyzmj6Q4tOq7C9kOyuC1rNthAci/Mp8xHXb9e4y9L/2M4ztUck7hR3rqWgC2Vrc+/A+ToR85VZUiB+AHpdI6I0ThMM4aLgXOl8+72xDaOBViGgx6rihIkGeTYHYtZXRabkFq179i7ZKxwXma5S800D2id710xsa6sK7q2t74j/zrbugoqC91Aidfn6+ZlEOYoXo6IvnUmPPPS0jTvOnist1KLCuBXpSMDfZBrJVsVfGoOQEk6Khbgpeaq27EMs5HhNpBbo6vOhNfRWPBoL0gd7XxshDoIYmYodmhSBwRnQbkqvWQ7wilzqjl7GweZYJmx72JjFC4BAnZ+3edAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBThc4t41g8VNJgtjb3vOq4QQoJTWDAdBgNVHQ4EFgQU4XOLeNYPFTSYLY297zquEEKCU1gwDQYJKoZIhvcNAQELBQADggEBAAGKN3F+QN6rmhh2bQWpNpCogEYsHvgPtOHS45/twWn3IMPBKsZTeAP6lhGt5gAsDezhgKbyrWXNRM8FISCjQTaaNOa8pjeNDDJ7kK3Tg/qx3vUMq0FNC5zFLP1nUKlBAJuTxXcJVhTAxNmmd6ScAIO0GbgelBNVCQwFe3oOip6IZ3OjjZ9rwZe+bzcRmLsTODVTucwSERfLzHaPQ981oJPHY1euzVpqg8m/FYQcUGD1X1wyOYHlETfeFXpTaZL0e1IjOWOtM92JDPSG8LDvF//8gTMMK8KzbLeyiEQaS0jTHHOqCaqzwCpXOQqdFssEfx3PrtQDdZdawZBiYKECuds=","attributes":{"enabled":true,"nbf":1613501415,"exp":1645038015,"created":1613502015,"updated":1613502015,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistcertificates-0/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1613502007,"updated":1613502007}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistcertificates-0/pending"}}, [
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
  'ecdaf1e9-0741-4b41-be51-dab0dff88e9e',
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
  'Tue, 16 Feb 2021 19:00:27 GMT',
  'Content-Length',
  '2697'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistcertificates-0')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistcertificates-0"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '140',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  '4a5f35b9-ea11-4891-a9b8-b5feb10deb79',
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
  'Tue, 16 Feb 2021 19:00:27 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistcertificates-0')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistcertificates-0"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '140',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  'cdebf5f0-82d6-435a-a4f1-6446661ca88d',
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
  'Tue, 16 Feb 2021 19:00:27 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistcertificates-0')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistcertificates-0"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '140',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  '18b80237-99e9-4641-a55f-d6fa3984642d',
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
  'Tue, 16 Feb 2021 19:00:29 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistcertificates-0')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistcertificates-0"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '140',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  'bc3adb41-7107-4020-9b38-47ca1e3d140e',
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
  'Tue, 16 Feb 2021 19:00:31 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistcertificates-0')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistcertificates-0"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '140',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  'c4e52596-0e2e-4e13-a81d-c0ed638e7f8a',
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
  'Tue, 16 Feb 2021 19:00:33 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistcertificates-0')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/listCertificateName-canlistcertificates-0","deletedDate":1613502027,"scheduledPurgeDate":1614106827,"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistcertificates-0/1dde311c1d264a8fb4064f7aebd61f29","kid":"https://keyvault_name.vault.azure.net/keys/listCertificateName-canlistcertificates-0/1dde311c1d264a8fb4064f7aebd61f29","sid":"https://keyvault_name.vault.azure.net/secrets/listCertificateName-canlistcertificates-0/1dde311c1d264a8fb4064f7aebd61f29","x5t":"mIL26Kwv5hJW66zuGns2isdVNcU","cer":"MIIDKDCCAhCgAwIBAgIQOxLpAhSBRJufd8054l+XzjANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjEwMjE2MTg1MDE1WhcNMjIwMjE2MTkwMDE1WjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQC+5vRGRyzmj6Q4tOq7C9kOyuC1rNthAci/Mp8xHXb9e4y9L/2M4ztUck7hR3rqWgC2Vrc+/A+ToR85VZUiB+AHpdI6I0ThMM4aLgXOl8+72xDaOBViGgx6rihIkGeTYHYtZXRabkFq179i7ZKxwXma5S800D2id710xsa6sK7q2t74j/zrbugoqC91Aidfn6+ZlEOYoXo6IvnUmPPPS0jTvOnist1KLCuBXpSMDfZBrJVsVfGoOQEk6Khbgpeaq27EMs5HhNpBbo6vOhNfRWPBoL0gd7XxshDoIYmYodmhSBwRnQbkqvWQ7wilzqjl7GweZYJmx72JjFC4BAnZ+3edAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBThc4t41g8VNJgtjb3vOq4QQoJTWDAdBgNVHQ4EFgQU4XOLeNYPFTSYLY297zquEEKCU1gwDQYJKoZIhvcNAQELBQADggEBAAGKN3F+QN6rmhh2bQWpNpCogEYsHvgPtOHS45/twWn3IMPBKsZTeAP6lhGt5gAsDezhgKbyrWXNRM8FISCjQTaaNOa8pjeNDDJ7kK3Tg/qx3vUMq0FNC5zFLP1nUKlBAJuTxXcJVhTAxNmmd6ScAIO0GbgelBNVCQwFe3oOip6IZ3OjjZ9rwZe+bzcRmLsTODVTucwSERfLzHaPQ981oJPHY1euzVpqg8m/FYQcUGD1X1wyOYHlETfeFXpTaZL0e1IjOWOtM92JDPSG8LDvF//8gTMMK8KzbLeyiEQaS0jTHHOqCaqzwCpXOQqdFssEfx3PrtQDdZdawZBiYKECuds=","attributes":{"enabled":true,"nbf":1613501415,"exp":1645038015,"created":1613502015,"updated":1613502015,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistcertificates-0/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1613502007,"updated":1613502007}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistcertificates-0/pending"}}, [
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
  'd92fd725-b441-4578-8044-b00c1d7c915e',
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
  'Tue, 16 Feb 2021 19:00:35 GMT',
  'Content-Length',
  '2697'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedcertificates/listCertificateName-canlistcertificates-0')
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
  '91971116-234a-415b-8b36-8a0c26c1522c',
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
  'Tue, 16 Feb 2021 19:00:35 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/certificates/listCertificateName-canlistcertificates-1')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/listCertificateName-canlistcertificates-1","deletedDate":1613502035,"scheduledPurgeDate":1614106835,"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistcertificates-1/6d542f7001b94e9fa306d50a4e79de8a","kid":"https://keyvault_name.vault.azure.net/keys/listCertificateName-canlistcertificates-1/6d542f7001b94e9fa306d50a4e79de8a","sid":"https://keyvault_name.vault.azure.net/secrets/listCertificateName-canlistcertificates-1/6d542f7001b94e9fa306d50a4e79de8a","x5t":"-RACLM3G5Fp1F3PNudWmDInuxvE","cer":"MIIDKDCCAhCgAwIBAgIQc9EPH3FtRTOd2QX4KlPdbjANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjEwMjE2MTg1MDI1WhcNMjIwMjE2MTkwMDI1WjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQDiByd8oOvMf+vpoDDGiLsMjJFNnGmFRBdZcHQWe0oihoJc4ylFXq/7+U9wU18XkAvAYfh1T+BXgDJqZxU0sC91mrC6BuXpX887HvIyHtJkU+yQO7I4MXAYZEJX+EOu3tBWyxn9wRgckQ4VHHIXc/VD0IiDsW5+a/rvsXMUAmyUim5/Dj4iu88D9965wqo4CfM2hVYIzGkcIjIlZ+FpOiXj1Bgewphog/ML50PaHxIKCtuWJHmipC5fw8jiw2iGiOfeCzCUNTa9iiS/b5Fh4WRuSNz+gxW/e2hDXJm15XfipQqKYZDNRp0+Cdrk7RufbbLFEVt1XDnNwMHvQ81I2ebFAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBT8k2Q/TF5Fn1Qk39VGj/rsQik/+jAdBgNVHQ4EFgQU/JNkP0xeRZ9UJN/VRo/67EIpP/owDQYJKoZIhvcNAQELBQADggEBAJFxj0889wowcjn6hh1PSCJV7/zXvJDcZOCzWZf9MQ8zH5rBtOyCCQjLUCDrTVIa64QapD0Byc8AHHNoXmr8Fk/d3z54oA8dM6Sby5RxMmTHKzjSaQoRIyFC69eKV4VyTJ6ktHdlPyBQAyGieUOw1LbUzS3wg+GI1zOEs/wWjFxKI5xIOea5X3PyaC2uRThllogl+frNfHdKhHivyqay2O/IlKe3IRZ/Nmvfus9B167uPvWJmQE+Zz/sMtiWiDclLgnjFXounn1Sa5quFPws0+WgIwQNP5dNFialOd3kKGwoaMeYjTqx6tq6TpH5ySO3qmMx7GCtM+cPfloa5PSMbG0=","attributes":{"enabled":true,"nbf":1613501425,"exp":1645038025,"created":1613502025,"updated":1613502025,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistcertificates-1/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1613502016,"updated":1613502016}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistcertificates-1/pending"}}, [
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
  '2142e2bf-6090-4b03-9f53-86ec2669b031',
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
  'Tue, 16 Feb 2021 19:00:35 GMT',
  'Content-Length',
  '2697'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistcertificates-1')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistcertificates-1"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '140',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  'dd52d008-5fda-4d6e-bac1-9be699423976',
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
  'Tue, 16 Feb 2021 19:00:35 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistcertificates-1')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistcertificates-1"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '140',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  'f7ab7d0a-65ad-48a4-a5aa-25df43ae7b36',
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
  'Tue, 16 Feb 2021 19:00:35 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistcertificates-1')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistcertificates-1"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '140',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  '85efa415-9a25-4e48-ab46-b5cac2dd24e3',
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
  'Tue, 16 Feb 2021 19:00:37 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistcertificates-1')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistcertificates-1"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '140',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  'a71ce63f-3445-4b7e-8f41-a90db4a37bfe',
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
  'Tue, 16 Feb 2021 19:00:39 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistcertificates-1')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistcertificates-1"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '140',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  '4a2ec1ce-3019-4379-81ce-7fca386cc598',
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
  'Tue, 16 Feb 2021 19:00:42 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistcertificates-1')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistcertificates-1"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '140',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  'f8e5299f-3fb2-4995-8320-e65789bd0d75',
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
  'Tue, 16 Feb 2021 19:00:44 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistcertificates-1')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/listCertificateName-canlistcertificates-1","deletedDate":1613502035,"scheduledPurgeDate":1614106835,"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistcertificates-1/6d542f7001b94e9fa306d50a4e79de8a","kid":"https://keyvault_name.vault.azure.net/keys/listCertificateName-canlistcertificates-1/6d542f7001b94e9fa306d50a4e79de8a","sid":"https://keyvault_name.vault.azure.net/secrets/listCertificateName-canlistcertificates-1/6d542f7001b94e9fa306d50a4e79de8a","x5t":"-RACLM3G5Fp1F3PNudWmDInuxvE","cer":"MIIDKDCCAhCgAwIBAgIQc9EPH3FtRTOd2QX4KlPdbjANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjEwMjE2MTg1MDI1WhcNMjIwMjE2MTkwMDI1WjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQDiByd8oOvMf+vpoDDGiLsMjJFNnGmFRBdZcHQWe0oihoJc4ylFXq/7+U9wU18XkAvAYfh1T+BXgDJqZxU0sC91mrC6BuXpX887HvIyHtJkU+yQO7I4MXAYZEJX+EOu3tBWyxn9wRgckQ4VHHIXc/VD0IiDsW5+a/rvsXMUAmyUim5/Dj4iu88D9965wqo4CfM2hVYIzGkcIjIlZ+FpOiXj1Bgewphog/ML50PaHxIKCtuWJHmipC5fw8jiw2iGiOfeCzCUNTa9iiS/b5Fh4WRuSNz+gxW/e2hDXJm15XfipQqKYZDNRp0+Cdrk7RufbbLFEVt1XDnNwMHvQ81I2ebFAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBT8k2Q/TF5Fn1Qk39VGj/rsQik/+jAdBgNVHQ4EFgQU/JNkP0xeRZ9UJN/VRo/67EIpP/owDQYJKoZIhvcNAQELBQADggEBAJFxj0889wowcjn6hh1PSCJV7/zXvJDcZOCzWZf9MQ8zH5rBtOyCCQjLUCDrTVIa64QapD0Byc8AHHNoXmr8Fk/d3z54oA8dM6Sby5RxMmTHKzjSaQoRIyFC69eKV4VyTJ6ktHdlPyBQAyGieUOw1LbUzS3wg+GI1zOEs/wWjFxKI5xIOea5X3PyaC2uRThllogl+frNfHdKhHivyqay2O/IlKe3IRZ/Nmvfus9B167uPvWJmQE+Zz/sMtiWiDclLgnjFXounn1Sa5quFPws0+WgIwQNP5dNFialOd3kKGwoaMeYjTqx6tq6TpH5ySO3qmMx7GCtM+cPfloa5PSMbG0=","attributes":{"enabled":true,"nbf":1613501425,"exp":1645038025,"created":1613502025,"updated":1613502025,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistcertificates-1/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1613502016,"updated":1613502016}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistcertificates-1/pending"}}, [
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
  '69cef86e-21b2-4fae-8ae3-5d3394f252e5',
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
  'Tue, 16 Feb 2021 19:00:45 GMT',
  'Content-Length',
  '2697'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedcertificates/listCertificateName-canlistcertificates-1')
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
  'd7e9930f-e197-4ce3-afcc-27321664c7ef',
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
  'Tue, 16 Feb 2021 19:00:45 GMT'
]);

let nock = require('nock');

module.exports.hash = "8e1e7f639d6c80353ed565479f2db897";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/certificates/CRUDCertificateName-canupdatecertificatewithrequestOptionstimeout-/create')
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
  'eastus',
  'x-ms-request-id',
  'c6f9281a-b487-4da6-8370-4e79d0600cb1',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=70.36.51.197;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Sun, 28 Jun 2020 21:02:46 GMT'
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
  '7b924b23-1bd3-42e5-8bdd-c99bf4471300',
  'x-ms-ests-server',
  '2.1.10761.12 - WUS2 ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AsiDXxwa3lRMhIgH04dgMt8L6tuIAQAAAHf8itYOAAAA; expires=Tue, 28-Jul-2020 21:02:47 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; SameSite=None; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; SameSite=None; secure; HttpOnly',
  'Date',
  'Sun, 28 Jun 2020 21:02:46 GMT',
  'Content-Length',
  '1315'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/certificates/CRUDCertificateName-canupdatecertificatewithrequestOptionstimeout-/create', {"policy":{"key_props":{},"secret_props":{},"x509_props":{"subject":"cn=MyCert","sans":{}},"issuer":{"name":"Self"},"attributes":{}},"attributes":{}})
  .query(true)
  .reply(202, {"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-canupdatecertificatewithrequestOptionstimeout-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA4yqSuFcmpDIwbgq1BcC9YM2Gx+C+Brozf1Sm10mG8UEbTWMKItMAHkbTtdKQehdWBbJiUv69Rl6pezhi1xSF9MXK3anmKkrzj6QEShE76ma0bd6z1sr3Inq1KPP4zNIB9KMwjmY8EvkeDrefuWobI+DjxQ/lFJ7TSlgZcF4SxHvWNnbUL18DFwygKVMB3AoXeQu92w+Q4IIpbNNXb4mPKFCyH5yvduJ0R8RBtvj52OateNoUEChHk76k654zoG6kxS47zx0gquYrtI3Bh0GIe4o8PrD6OT53TZbfR9oGB+x/JPVMyP4WbbmYRyD/THqNzLwRmEZ/VMAkunA0qB0yjQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAEyelYg/PEBARsAgtZTOqtcsr7kn3tpM749B/fkYJHrTLWaRx1ASCASzEAu569qrZaBBu2deIs6AONx3ZUpWlpqI/dte7d8xzQ1+k81AIuvmBXEo8+n3BEADAJhrrFE8nMpPQV8e/8Y4w70kExV86yUhljEzCNQcwO7UN/jlCznZJZy4/qCS1yKq8Qmf90sfewH/mbBXLWn47MiFfBHs5kiPns0j/KrshYYUg/TJ2F3zTT7qV8U6uXapoNtaQnwg/IMQpgJG9dkuruJ4uwoU9Ucsxw7T/31KN5A2izbhlYbb5805fnU0aI557loY/zIIYkAJgjVJF/pu+YPYVvBzamg=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"d61bb4a8e98446eeb43e9cc430c360d3"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-canupdatecertificatewithrequestOptionstimeout-/pending?api-version=7.1-preview&request_id=d61bb4a8e98446eeb43e9cc430c360d3',
  'Retry-After',
  '10',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-request-id',
  'd0aa22d1-93dd-4f11-bca6-ba34bc552c29',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=70.36.51.197;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Sun, 28 Jun 2020 21:02:48 GMT',
  'Content-Length',
  '1355'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/CRUDCertificateName-canupdatecertificatewithrequestOptionstimeout-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-canupdatecertificatewithrequestOptionstimeout-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA4yqSuFcmpDIwbgq1BcC9YM2Gx+C+Brozf1Sm10mG8UEbTWMKItMAHkbTtdKQehdWBbJiUv69Rl6pezhi1xSF9MXK3anmKkrzj6QEShE76ma0bd6z1sr3Inq1KPP4zNIB9KMwjmY8EvkeDrefuWobI+DjxQ/lFJ7TSlgZcF4SxHvWNnbUL18DFwygKVMB3AoXeQu92w+Q4IIpbNNXb4mPKFCyH5yvduJ0R8RBtvj52OateNoUEChHk76k654zoG6kxS47zx0gquYrtI3Bh0GIe4o8PrD6OT53TZbfR9oGB+x/JPVMyP4WbbmYRyD/THqNzLwRmEZ/VMAkunA0qB0yjQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAEyelYg/PEBARsAgtZTOqtcsr7kn3tpM749B/fkYJHrTLWaRx1ASCASzEAu569qrZaBBu2deIs6AONx3ZUpWlpqI/dte7d8xzQ1+k81AIuvmBXEo8+n3BEADAJhrrFE8nMpPQV8e/8Y4w70kExV86yUhljEzCNQcwO7UN/jlCznZJZy4/qCS1yKq8Qmf90sfewH/mbBXLWn47MiFfBHs5kiPns0j/KrshYYUg/TJ2F3zTT7qV8U6uXapoNtaQnwg/IMQpgJG9dkuruJ4uwoU9Ucsxw7T/31KN5A2izbhlYbb5805fnU0aI557loY/zIIYkAJgjVJF/pu+YPYVvBzamg=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"d61bb4a8e98446eeb43e9cc430c360d3"}, [
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
  'eastus',
  'x-ms-request-id',
  'b8f60662-e46a-481b-82ca-56bc35b31c8e',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=70.36.51.197;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Sun, 28 Jun 2020 21:02:48 GMT',
  'Content-Length',
  '1355'
]);

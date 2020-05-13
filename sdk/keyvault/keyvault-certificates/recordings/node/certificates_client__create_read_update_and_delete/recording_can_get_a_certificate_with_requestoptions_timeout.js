let nock = require('nock');

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/certificates/recoverCertificateName-cangetacertificatewithrequestOptionstimeout-/create')
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
  'Server',
  'Microsoft-IIS/10.0',
  'WWW-Authenticate',
  'Bearer authorization="https://login.windows.net/azure_tenant_id", resource="https://vault.azure.net"',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '589e5088-60e9-4ff4-8e79-03efe48f25b0',
  'x-ms-keyvault-service-version',
  '1.1.0.898',
  'x-ms-keyvault-network-info',
  'addr=52.183.115.156;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 07 May 2020 20:55:46 GMT'
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
  '8267531b-d36b-40c8-b583-733fff120000',
  'x-ms-ests-server',
  '2.1.10519.9 - EUS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AggLh83Kk9RBp2G9lPJZnMM_aSJHAQAAANNsRtYOAAAA; expires=Sat, 06-Jun-2020 20:55:47 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; SameSite=None; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; SameSite=None; secure; HttpOnly',
  'Date',
  'Thu, 07 May 2020 20:55:47 GMT',
  'Content-Length',
  '1315'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/certificates/recoverCertificateName-cangetacertificatewithrequestOptionstimeout-/create', {"policy":{"key_props":{},"secret_props":{},"x509_props":{"subject":"cn=MyCert","sans":{}},"issuer":{"name":"Self"},"attributes":{}},"attributes":{}})
  .query(true)
  .reply(202, {"id":"https://keyvault_name.vault.azure.net/certificates/recoverCertificateName-cangetacertificatewithrequestOptionstimeout-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAt1TMmvWvfQx5b4CgDcGWLqHRZ0KvhMLw9MlSe7yAUgaJSe4pdo2e+9/usMTokRZkJxIARdJGWKgOorNwTPS+kxIz2hKrsHgBkVjKVwlO6Z4MLaDhdNBzViO9vi7S7HK728YuB7LtGc7x7zYz7p8rcdj9xRbBniRNWjknroXfzmzwGtYon1GQAjIsUQcMToHXAvJxtEH2sUZcBmzuFWY1hGSJrDAC/XSg5tzluoG2OHmGmYZtoO5Crd9XB/V+xnOIwh2mWu6Qdeq7NF3KgSms2q00Mii8fNOBf7aFf7W8kO65drgQA10cuUU//uKPneHQra7ufoiYuqkk2JjNN6bhfwIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBACqnyOExhiJZ7MBOjekiro+d6TOpSM9sAk1K3/obuL/dBvCu4/rofHuKUDi1H8MW9/2F0aCuY43rs4zzYJ5sbj2Gyl+xO/I85bR8l9j38OUQim7zytKI9ZmfvzVw5o2RmYe7zhEOM+IqufTjuwca4FbH3YMhOf3jqzIClvpfVb3FOZAxOkNRkDYpBmFtm4EV59kH5ThepDvUwwJKZd8h7W3lDzY0RsOaSAWc75MgzFaeyHmV5r20I5TEKmRadmy8ohpUvh+rbrH51U5v9FrPQLUEIsRUUdxnoIsc86Tsxlj4jkBDLxOFrVKxtTB0BlZUIaA917mY4qHjKebBJt8yfIM=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"52a537ac7ee64da5b0ff5fc856daae09"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://keyvault_name.vault.azure.net/certificates/recoverCertificateName-cangetacertificatewithrequestOptionstimeout-/pending?api-version=7.0&request_id=52a537ac7ee64da5b0ff5fc856daae09',
  'Retry-After',
  '10',
  'Server',
  'Microsoft-IIS/10.0',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '1d8bd54d-0333-403b-a8b8-086e8a7056c8',
  'x-ms-keyvault-service-version',
  '1.1.0.898',
  'x-ms-keyvault-network-info',
  'addr=52.183.115.156;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 07 May 2020 20:55:47 GMT',
  'Content-Length',
  '1359'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/recoverCertificateName-cangetacertificatewithrequestOptionstimeout-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/recoverCertificateName-cangetacertificatewithrequestOptionstimeout-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAt1TMmvWvfQx5b4CgDcGWLqHRZ0KvhMLw9MlSe7yAUgaJSe4pdo2e+9/usMTokRZkJxIARdJGWKgOorNwTPS+kxIz2hKrsHgBkVjKVwlO6Z4MLaDhdNBzViO9vi7S7HK728YuB7LtGc7x7zYz7p8rcdj9xRbBniRNWjknroXfzmzwGtYon1GQAjIsUQcMToHXAvJxtEH2sUZcBmzuFWY1hGSJrDAC/XSg5tzluoG2OHmGmYZtoO5Crd9XB/V+xnOIwh2mWu6Qdeq7NF3KgSms2q00Mii8fNOBf7aFf7W8kO65drgQA10cuUU//uKPneHQra7ufoiYuqkk2JjNN6bhfwIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBACqnyOExhiJZ7MBOjekiro+d6TOpSM9sAk1K3/obuL/dBvCu4/rofHuKUDi1H8MW9/2F0aCuY43rs4zzYJ5sbj2Gyl+xO/I85bR8l9j38OUQim7zytKI9ZmfvzVw5o2RmYe7zhEOM+IqufTjuwca4FbH3YMhOf3jqzIClvpfVb3FOZAxOkNRkDYpBmFtm4EV59kH5ThepDvUwwJKZd8h7W3lDzY0RsOaSAWc75MgzFaeyHmV5r20I5TEKmRadmy8ohpUvh+rbrH51U5v9FrPQLUEIsRUUdxnoIsc86Tsxlj4jkBDLxOFrVKxtTB0BlZUIaA917mY4qHjKebBJt8yfIM=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"52a537ac7ee64da5b0ff5fc856daae09"}, [
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
  'Server',
  'Microsoft-IIS/10.0',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'f2ca0bdb-0171-43e6-a988-184c66fe8e79',
  'x-ms-keyvault-service-version',
  '1.1.0.898',
  'x-ms-keyvault-network-info',
  'addr=52.183.115.156;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 07 May 2020 20:55:47 GMT',
  'Content-Length',
  '1359'
]);

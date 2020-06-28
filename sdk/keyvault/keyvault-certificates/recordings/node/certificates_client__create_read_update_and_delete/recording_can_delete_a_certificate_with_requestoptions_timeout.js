let nock = require('nock');

module.exports.hash = "a10ced1dd00b97e11dd2935e921b0cdb";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/certificates/CRUDCertificateName-candeleteacertificatewithrequestOptionstimeout-/create')
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
  '8200ed31-5d3c-47ef-a96a-838cb7dfdc55',
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
  'Sun, 28 Jun 2020 21:02:49 GMT'
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
  '8638dc78-2f63-4258-9b95-51cdc38d0500',
  'x-ms-ests-server',
  '2.1.10761.12 - SCUS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=At-ZBOpWOt9Iv11GZefC2ZcL6tuIAQAAAHr8itYOAAAA; expires=Tue, 28-Jul-2020 21:02:51 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; SameSite=None; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; SameSite=None; secure; HttpOnly',
  'Date',
  'Sun, 28 Jun 2020 21:02:51 GMT',
  'Content-Length',
  '1315'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/certificates/CRUDCertificateName-candeleteacertificatewithrequestOptionstimeout-/create', {"policy":{"key_props":{},"secret_props":{},"x509_props":{"subject":"cn=MyCert","sans":{}},"issuer":{"name":"Self"},"attributes":{}},"attributes":{}})
  .query(true)
  .reply(202, {"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-candeleteacertificatewithrequestOptionstimeout-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAr5IqNzGZVPd7NIEAlspJ7gt67ufZlmhMj0HTrstj194dXbVrHPBmavv2XSWH51UiPKFBiaMHFxeO/zrUMN3XsZWGFx6xBQQHcQcxE8j3ak6H3hWD5P5KYHoPTnW470VcMu6+W5cvjz9VZeCxmsyIMyk3PoVH3WATz3eU165pMrV8SZQta4nxAn41R26qpZwiK5pArgPhTZzUDAOh2DvEqh5NQhglnIW2sGt95aZYqi592GodivuKXQl7IepGls8Kw1xoidlXv/unccjIKbDkcCURsbQbZIoODr0d70FI3plzRawvLDU1a8ESD0LOBlg0ZP4Vr7mr1FQ/PjMsMuDnYQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAGhbnREnWUuApJxBnC7kf23bfpN2FlU8iAQYxHAJjbLh6pA0oUzo0uiv9IF2WhG5mvKVc2ST/qNrhairbsf7DgTNXihw7kjmLD6IYubCAB75VvQooomXuxY4a2nApHvYymxK4NfON3pgAnH/vQ0xtzH6Yfd3vqgwg6uGM0un1+5tQ1u6dStVtdSdYOUY6vJci/9E8AHVWqWQJ48GOekBP5/fkA+e3NZYjyR/7BY8fiEJET9rCz0wrumlDN7XxLctMkuAISvpPK9Ckui+Uhwu/IUAFKeNMJf+U3C0gE8p7Sjj+fB4XXLZ+v/eQNkthDAXGb4FwcpKfrEQeacQqKeXzu0=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"571042e6c4fd49fc804ee317901b532b"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-candeleteacertificatewithrequestOptionstimeout-/pending?api-version=7.1-preview&request_id=571042e6c4fd49fc804ee317901b532b',
  'Retry-After',
  '10',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-request-id',
  'd9e20ab8-059e-44e0-8b5d-70c46147c99d',
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
  'Sun, 28 Jun 2020 21:02:52 GMT',
  'Content-Length',
  '1359'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/CRUDCertificateName-candeleteacertificatewithrequestOptionstimeout-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-candeleteacertificatewithrequestOptionstimeout-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAr5IqNzGZVPd7NIEAlspJ7gt67ufZlmhMj0HTrstj194dXbVrHPBmavv2XSWH51UiPKFBiaMHFxeO/zrUMN3XsZWGFx6xBQQHcQcxE8j3ak6H3hWD5P5KYHoPTnW470VcMu6+W5cvjz9VZeCxmsyIMyk3PoVH3WATz3eU165pMrV8SZQta4nxAn41R26qpZwiK5pArgPhTZzUDAOh2DvEqh5NQhglnIW2sGt95aZYqi592GodivuKXQl7IepGls8Kw1xoidlXv/unccjIKbDkcCURsbQbZIoODr0d70FI3plzRawvLDU1a8ESD0LOBlg0ZP4Vr7mr1FQ/PjMsMuDnYQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAGhbnREnWUuApJxBnC7kf23bfpN2FlU8iAQYxHAJjbLh6pA0oUzo0uiv9IF2WhG5mvKVc2ST/qNrhairbsf7DgTNXihw7kjmLD6IYubCAB75VvQooomXuxY4a2nApHvYymxK4NfON3pgAnH/vQ0xtzH6Yfd3vqgwg6uGM0un1+5tQ1u6dStVtdSdYOUY6vJci/9E8AHVWqWQJ48GOekBP5/fkA+e3NZYjyR/7BY8fiEJET9rCz0wrumlDN7XxLctMkuAISvpPK9Ckui+Uhwu/IUAFKeNMJf+U3C0gE8p7Sjj+fB4XXLZ+v/eQNkthDAXGb4FwcpKfrEQeacQqKeXzu0=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"571042e6c4fd49fc804ee317901b532b"}, [
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
  '0316947f-d1e6-4d97-86f9-8db2a2ce441e',
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
  'Sun, 28 Jun 2020 21:02:52 GMT',
  'Content-Length',
  '1359'
]);

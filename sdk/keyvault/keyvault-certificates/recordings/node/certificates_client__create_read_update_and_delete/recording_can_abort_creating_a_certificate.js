let nock = require('nock');

module.exports.hash = "ecb098ab4c5e5341d2fe06be0dbe2a73";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/certificates/recoverCertificateName-canabortcreatingacertificate-/create')
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
  '7ebe61b3-6337-4b94-8fe1-16e515f07e0b',
  'x-ms-keyvault-service-version',
  '1.1.0.898',
  'x-ms-keyvault-network-info',
  'addr=52.247.203.156;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 28 Apr 2020 05:40:46 GMT'
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
  '1af9755b-f554-40f7-9071-0107b88b7a00',
  'x-ms-ests-server',
  '2.1.10433.14 - NCUS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AlC_h3c3gYNDj_L5NcvQeRc_aSJHAQAAAN-4OdYOAAAA; expires=Thu, 28-May-2020 05:40:47 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; SameSite=None; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; SameSite=None; secure; HttpOnly',
  'Date',
  'Tue, 28 Apr 2020 05:40:47 GMT',
  'Content-Length',
  '1315'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/certificates/recoverCertificateName-canabortcreatingacertificate-/create', {"policy":{"key_props":{},"secret_props":{},"x509_props":{"subject":"cn=MyCert","sans":{}},"issuer":{"name":"Self"},"attributes":{}},"attributes":{}})
  .query(true)
  .reply(202, {"id":"https://keyvault_name.vault.azure.net/certificates/recoverCertificateName-canabortcreatingacertificate-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEApKYsrZkLtd9koO/TOnUj6fLVGlMj813JJggdR8GWt3yB7RfT+fhGZfK0m4+cZuQ5f+H3pbh2rt9D8LteGhUZ/RlmiZ3YEbzRCjk9G4HA/7qov4ZYdNLWszRngW4Woz8et5kl1sohrPdX0cRf6Q9B4VvcbN/pZM4r/PhvT5o/xO8ntYznIvffOimdtzkloDCy+Tlt5EgU0zN3VBv38REiQ5Rb70kINL0TSA/IYDn6zB8YU+AEVNa+e3N7RX+IB5yXP9JPNSPRs7gTdTP3kSp+181GzeQKNb1GUaEjkk+9YtLfcj4QWBdMGhYEGkWG7Vei2QJpBkeknGuJstSNFB+RdQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBADKNMvAhQ69ryG1u5DgdxCGTxWmC3l1tnduSClNlKV7oPXFKdVfhyTGwK12Z+Qhk4MCmEKCkdx4dwCcvQXk2bpgCfXkSLxLjDPjEl8zwbLlqJAOqPaulZaZpqCOoxpmF0Fubnc1+zXDVg8ktLcMOTWbJ0Nt2g2DCObWgePZUPAomjDs5Vc8w1RDIHv9QSXJWjdHnzBzP97aEdTJxPR29hKcvEWRSwXMc6kiDIXvkV97Ra2z/K05c6k42ZJLP7RkWYX1u0e/YoRyK08q98HyEdepSREsZXJ1pZFS/uE+T9rUHtaxko5lXsQj3YeWOWaC5XQsUeXjhWujCYQ/l4ixRgZ8=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"59a1bfd754674a6f8e48ad9c5e9a3c36"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://keyvault_name.vault.azure.net/certificates/recoverCertificateName-canabortcreatingacertificate-/pending?api-version=7.1-preview&request_id=59a1bfd754674a6f8e48ad9c5e9a3c36',
  'Retry-After',
  '10',
  'Server',
  'Microsoft-IIS/10.0',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'a2b95b70-a1dd-4667-89d8-503e19e023fc',
  'x-ms-keyvault-service-version',
  '1.1.0.898',
  'x-ms-keyvault-network-info',
  'addr=52.247.203.156;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 28 Apr 2020 05:40:48 GMT',
  'Content-Length',
  '1344'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/recoverCertificateName-canabortcreatingacertificate-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/recoverCertificateName-canabortcreatingacertificate-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEApKYsrZkLtd9koO/TOnUj6fLVGlMj813JJggdR8GWt3yB7RfT+fhGZfK0m4+cZuQ5f+H3pbh2rt9D8LteGhUZ/RlmiZ3YEbzRCjk9G4HA/7qov4ZYdNLWszRngW4Woz8et5kl1sohrPdX0cRf6Q9B4VvcbN/pZM4r/PhvT5o/xO8ntYznIvffOimdtzkloDCy+Tlt5EgU0zN3VBv38REiQ5Rb70kINL0TSA/IYDn6zB8YU+AEVNa+e3N7RX+IB5yXP9JPNSPRs7gTdTP3kSp+181GzeQKNb1GUaEjkk+9YtLfcj4QWBdMGhYEGkWG7Vei2QJpBkeknGuJstSNFB+RdQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBADKNMvAhQ69ryG1u5DgdxCGTxWmC3l1tnduSClNlKV7oPXFKdVfhyTGwK12Z+Qhk4MCmEKCkdx4dwCcvQXk2bpgCfXkSLxLjDPjEl8zwbLlqJAOqPaulZaZpqCOoxpmF0Fubnc1+zXDVg8ktLcMOTWbJ0Nt2g2DCObWgePZUPAomjDs5Vc8w1RDIHv9QSXJWjdHnzBzP97aEdTJxPR29hKcvEWRSwXMc6kiDIXvkV97Ra2z/K05c6k42ZJLP7RkWYX1u0e/YoRyK08q98HyEdepSREsZXJ1pZFS/uE+T9rUHtaxko5lXsQj3YeWOWaC5XQsUeXjhWujCYQ/l4ixRgZ8=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"59a1bfd754674a6f8e48ad9c5e9a3c36"}, [
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
  'a83d5ec8-cca3-4b46-9f9f-64c856419466',
  'x-ms-keyvault-service-version',
  '1.1.0.898',
  'x-ms-keyvault-network-info',
  'addr=52.247.203.156;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 28 Apr 2020 05:40:48 GMT',
  'Content-Length',
  '1344'
]);

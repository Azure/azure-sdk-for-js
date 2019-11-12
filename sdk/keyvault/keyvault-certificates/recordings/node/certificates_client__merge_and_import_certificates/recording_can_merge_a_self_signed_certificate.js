let nock = require('nock');

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/certificates/mergeCertificateName-canmergeaselfsignedcertificate-/create')
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
  'eabb88de-44a6-4177-8b17-e6d46d9788ea',
  'x-ms-keyvault-service-version',
  '1.1.0.882',
  'x-ms-keyvault-network-info',
  'addr=52.175.209.7;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 06 Nov 2019 16:22:25 GMT'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fvault.azure.net%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":3600,"ext_expires_in":3600,"access_token":"access_token"}, [
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
  '0e540d13-6c08-41dd-9422-7d169aa41300',
  'x-ms-ests-server',
  '2.1.9645.7 - WUS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=Ajjo_h1vTIFAsr78BvqJrEM_aSJHAQAAAEHqVNUOAAAA; expires=Fri, 06-Dec-2019 16:22:26 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; SameSite=None; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; SameSite=None; secure; HttpOnly',
  'Date',
  'Wed, 06 Nov 2019 16:22:25 GMT',
  'Content-Length',
  '1231'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/certificates/mergeCertificateName-canmergeaselfsignedcertificate-/create', {"policy":{"key_props":{},"secret_props":{},"x509_props":{"subject":"cn=MyCert","sans":{}},"issuer":{"name":"Unknown","cert_transparency":false},"attributes":{}},"attributes":{}})
  .query(true)
  .reply(202, {"id":"https://keyvault_name.vault.azure.net/certificates/mergeCertificateName-canmergeaselfsignedcertificate-/pending","issuer":{"name":"Unknown"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAsrZh2Aa0DMXRxPKkGiVn48Z6yXr6nLwfdCmO22lfaIl7a28KuJCU49N78XyF5L0o9gTCAL+Oy/3dLAPAg19Bo1mnjFyjpjiUpz2vSA0ZgBeYEBFaHsJ0OWGvE7oY6T78LVNzNk3Ko1xW3KYMMCcuPkY+tBn6Pchzwg/TKAiBeh8p4UYkqE+iaqigoWJPHUQlqwCqhTiiAkVUP3eB8u4BDPCTsNkA3Dh/78bQBQ/TgjAyCLcwVUprTkhq+go7bpxDqv28X7aNN4w8wSbBJAZt9Me8SEwSCf3BFyQ6jRzQm+qsWhYteuXEi2ayOXObc9PpoNQixwt2+9iSQ6oClR2rEQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBADOJV7DHO98UrHtltNdGZkWTLsUqDTYA4raPPRZsRqkCwZScdHk0i3cvLqFjoUYSuvbbovfMojiRtmYR0wKuz/tqCTIlwM4QwjbPxQ8eby2Dr5PR+7UoOVAEUFQQLxOxly5MMywymKfqg0w0n1abLN4+x1zB/CV13VX7ua/ykwJF1/FZXkxSfGRizndy7k93pKHqn3b3NMbSJr+omKjND15UfBF5ltHmBOgIW+EeqQuHeHlb2MB5uh+8kw3VKjhx6a0iBy+9vV3p9EOZlUPiBUj5OR4w09cN/ux1YWygJbRcVxr6hKqSachMg7V1ynIItt6sV2ebgnIOJcaHuJIdTq0=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Please Perform Merge to complete the request.","request_id":"ded4ea6e274c478e8dd31b332e739bbd"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://keyvault_name.vault.azure.net/certificates/mergeCertificateName-canmergeaselfsignedcertificate-/pending?api-version=7.0&request_id=ded4ea6e274c478e8dd31b332e739bbd',
  'Retry-After',
  '10',
  'Server',
  'Microsoft-IIS/10.0',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'd5c429bf-48d9-4379-9752-a84e63d25ff1',
  'x-ms-keyvault-service-version',
  '1.1.0.882',
  'x-ms-keyvault-network-info',
  'addr=52.175.209.7;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 06 Nov 2019 16:22:26 GMT',
  'Content-Length',
  '1271'
]);

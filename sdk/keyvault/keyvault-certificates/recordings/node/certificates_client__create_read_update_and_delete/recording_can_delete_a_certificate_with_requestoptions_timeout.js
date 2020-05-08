let nock = require('nock');

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/certificates/recoverCertificateName-candeleteacertificatewithrequestOptionstimeout-/create')
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
  '24010ff9-b5c9-4b61-97fa-7b1295a1e995',
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
  'Thu, 07 May 2020 20:56:51 GMT'
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
  '436d1626-1c88-4705-8b5a-421258414100',
  'x-ms-ests-server',
  '2.1.10519.7 - NCUS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AjkiWuabKqxKi-Pr5aGpGHY_aSJHAQAAABRtRtYOAAAA; expires=Sat, 06-Jun-2020 20:56:52 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; SameSite=None; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; SameSite=None; secure; HttpOnly',
  'Date',
  'Thu, 07 May 2020 20:56:52 GMT',
  'Content-Length',
  '1315'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/certificates/recoverCertificateName-candeleteacertificatewithrequestOptionstimeout-/create', {"policy":{"key_props":{},"secret_props":{},"x509_props":{"subject":"cn=MyCert","sans":{}},"issuer":{"name":"Self"},"attributes":{}},"attributes":{}})
  .query(true)
  .reply(202, {"id":"https://keyvault_name.vault.azure.net/certificates/recoverCertificateName-candeleteacertificatewithrequestOptionstimeout-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAndvL51bhmEowPuo7D+avKsWiJCORxH5tmNOo+CFJuWYwLSDx7E1g59SadIAaa2uBQtcV8pS2tt8q8/OXJbufhujMZT5APHm16ja5tF8jckcQU2IWM6kO4ascbFPKKiAH2PHJNZg5Bnv/5GNv2uDrVc1YAQyIn6S7fiMPk8aHTrsb9WmEUbfYueqv6+FwKBcHvs+UoE97Vm5mDbYQ9VeCk7Dtw9ncVv0IK9cu0+l0f/g5dEZAbcP7eASRq2n37wzgURZVHgOcrM0hZJp/bqLOCCmufjFh+v/Dsdi/b8aC18F7KZtGNjrkIqETgwaCWTwadbkA+4Y/1F+sQ9Hx8060NQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBACv62G/XrlqFyTMCiM5dunUXId5bl+PGBw5fwefuVPzHcSLcd7XnxphT2XwV+kXrrAJ7RBlX/QB81EMiiw0GKr6/siSospA1wCEYdLzJEFUuhkMb//sC2ocjuGeKalX5hJrme0g09Ngx/dO/XZRs+WBDrzuUybF0FVX0HlytW3JXoVV6Iigqcsg5d1vuSbgFdnSVt9V8INN2c0MvtG1IxlPEKwcBaR4XahBDPGsDAMJdJUV002x+M1IHo6qqJ+zOfwx2O2S6bbzzF1Nt4epElL+iDQlXN9epP2P4wENVnSoRb4rh11IAW2m8gNuhzgtnXST0OjdHe1hoiDoYLTd8kP4=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"1a6196a2c61b4816a32c57d00db07f76"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://keyvault_name.vault.azure.net/certificates/recoverCertificateName-candeleteacertificatewithrequestOptionstimeout-/pending?api-version=7.0&request_id=1a6196a2c61b4816a32c57d00db07f76',
  'Retry-After',
  '10',
  'Server',
  'Microsoft-IIS/10.0',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'e5a58a7f-9310-4dee-b544-7133657fd06a',
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
  'Thu, 07 May 2020 20:56:52 GMT',
  'Content-Length',
  '1362'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/recoverCertificateName-candeleteacertificatewithrequestOptionstimeout-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/recoverCertificateName-candeleteacertificatewithrequestOptionstimeout-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAndvL51bhmEowPuo7D+avKsWiJCORxH5tmNOo+CFJuWYwLSDx7E1g59SadIAaa2uBQtcV8pS2tt8q8/OXJbufhujMZT5APHm16ja5tF8jckcQU2IWM6kO4ascbFPKKiAH2PHJNZg5Bnv/5GNv2uDrVc1YAQyIn6S7fiMPk8aHTrsb9WmEUbfYueqv6+FwKBcHvs+UoE97Vm5mDbYQ9VeCk7Dtw9ncVv0IK9cu0+l0f/g5dEZAbcP7eASRq2n37wzgURZVHgOcrM0hZJp/bqLOCCmufjFh+v/Dsdi/b8aC18F7KZtGNjrkIqETgwaCWTwadbkA+4Y/1F+sQ9Hx8060NQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBACv62G/XrlqFyTMCiM5dunUXId5bl+PGBw5fwefuVPzHcSLcd7XnxphT2XwV+kXrrAJ7RBlX/QB81EMiiw0GKr6/siSospA1wCEYdLzJEFUuhkMb//sC2ocjuGeKalX5hJrme0g09Ngx/dO/XZRs+WBDrzuUybF0FVX0HlytW3JXoVV6Iigqcsg5d1vuSbgFdnSVt9V8INN2c0MvtG1IxlPEKwcBaR4XahBDPGsDAMJdJUV002x+M1IHo6qqJ+zOfwx2O2S6bbzzF1Nt4epElL+iDQlXN9epP2P4wENVnSoRb4rh11IAW2m8gNuhzgtnXST0OjdHe1hoiDoYLTd8kP4=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"1a6196a2c61b4816a32c57d00db07f76"}, [
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
  'd88f1448-eed5-423a-b833-7558ebac6977',
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
  'Thu, 07 May 2020 20:56:52 GMT',
  'Content-Length',
  '1362'
]);

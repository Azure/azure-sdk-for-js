let nock = require('nock');

module.exports.hash = "c9a3e1ec8363a7c2e210d89df09bcb49";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/certificates/lroOperationCertificateName-canwaituntilacertificateiscreatedbygettingthepollerfromgetCertificateOperation-/create')
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
  'f10b1d38-bc66-424d-b0a2-c48b72046899',
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
  'Thu, 25 Jun 2020 13:06:44 GMT'
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
  'a5bef447-c5fa-4c94-a513-c0a85bb42001',
  'x-ms-ests-server',
  '2.1.10732.8 - EUS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AmF4Goz9-OVErtSY5zp4mVY_aSJHAQAAAGWYhtYOAAAA; expires=Sat, 25-Jul-2020 13:06:45 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; SameSite=None; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; SameSite=None; secure; HttpOnly',
  'Date',
  'Thu, 25 Jun 2020 13:06:45 GMT',
  'Content-Length',
  '1315'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/certificates/lroOperationCertificateName-canwaituntilacertificateiscreatedbygettingthepollerfromgetCertificateOperation-/create', {"policy":{"key_props":{},"secret_props":{},"x509_props":{"subject":"cn=MyCert","sans":{}},"issuer":{"name":"Self"},"attributes":{}},"attributes":{}})
  .query(true)
  .reply(202, {"id":"https://keyvault_name.vault.azure.net/certificates/lroOperationCertificateName-canwaituntilacertificateiscreatedbygettingthepollerfromgetCertificateOperation-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEArbvllcb3qWdIs1SwscybdRMMJQ1JpLLKuB3xFz0zJ0UMJpRaP5w30GX6JDsn6ZnKTlxhYjD3zJkSX0ub36soKofF3HqPDhQFpKgK+xKxSvOv8iI42Ybd6X06YPZvovd00r6iD3qKzTQXjKsgRzGVFmgv4Au2TM45a3tOVdzk+fYzDXwLnpmmwK6Z5IxTRzeMK8laHI/Uwfs72xRc/EhvVqLw1hPs+JTzvxNmJPnU6o14w6/Pera18lzY4H9WEBR1jdWPgWgslePmts5zTY9sSp0chFY1BwHzWokaLQvTCiJRCTicREFjI4HgoZm6pEqIDr7RHniM6UdE7hmLK1e3eQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAAXn/EyK4DdVZ89iZqVEuVk/nuckfqqeVARzR0RZPRHNHgD9tydpwE6R8R00tnBbcT4AYJWy64tDU5pEVdTSpepMS+5kob2DzEfLi3Bdza4RZhE70kCvRDBGOAn3Fyme2cSbs4g2eoSiFXuvbJeQO3/ER1sFfn8eDrrP2HJkns1NKk5ifQvXy9QeBatuUEJ3vkRi25rMY9fptLHe66u0XtsjiVU7PPUcSCpOMB/xlGsv+lNTONAYOAHS5YpABxdp1AyySjVCN/mD1ugt6vw9myX6fbNdCha29heklDioj0JBkRG9hc1ulf+Ev5VNOB+YJl2Ts1+mK+S6SSpGvDU7ZoM=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"8991c9e4e2a64a59b658e8f65b65f8e8"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://keyvault_name.vault.azure.net/certificates/lroOperationCertificateName-canwaituntilacertificateiscreatedbygettingthepollerfromgetCertificateOperation-/pending?api-version=7.1&request_id=8991c9e4e2a64a59b658e8f65b65f8e8',
  'Retry-After',
  '10',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'e3d11003-151a-4d5d-8b15-e2ac1b030655',
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
  'Thu, 25 Jun 2020 13:06:45 GMT',
  'Content-Length',
  '1399'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroOperationCertificateName-canwaituntilacertificateiscreatedbygettingthepollerfromgetCertificateOperation-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroOperationCertificateName-canwaituntilacertificateiscreatedbygettingthepollerfromgetCertificateOperation-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEArbvllcb3qWdIs1SwscybdRMMJQ1JpLLKuB3xFz0zJ0UMJpRaP5w30GX6JDsn6ZnKTlxhYjD3zJkSX0ub36soKofF3HqPDhQFpKgK+xKxSvOv8iI42Ybd6X06YPZvovd00r6iD3qKzTQXjKsgRzGVFmgv4Au2TM45a3tOVdzk+fYzDXwLnpmmwK6Z5IxTRzeMK8laHI/Uwfs72xRc/EhvVqLw1hPs+JTzvxNmJPnU6o14w6/Pera18lzY4H9WEBR1jdWPgWgslePmts5zTY9sSp0chFY1BwHzWokaLQvTCiJRCTicREFjI4HgoZm6pEqIDr7RHniM6UdE7hmLK1e3eQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAAXn/EyK4DdVZ89iZqVEuVk/nuckfqqeVARzR0RZPRHNHgD9tydpwE6R8R00tnBbcT4AYJWy64tDU5pEVdTSpepMS+5kob2DzEfLi3Bdza4RZhE70kCvRDBGOAn3Fyme2cSbs4g2eoSiFXuvbJeQO3/ER1sFfn8eDrrP2HJkns1NKk5ifQvXy9QeBatuUEJ3vkRi25rMY9fptLHe66u0XtsjiVU7PPUcSCpOMB/xlGsv+lNTONAYOAHS5YpABxdp1AyySjVCN/mD1ugt6vw9myX6fbNdCha29heklDioj0JBkRG9hc1ulf+Ev5VNOB+YJl2Ts1+mK+S6SSpGvDU7ZoM=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"8991c9e4e2a64a59b658e8f65b65f8e8"}, [
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
  '804df69f-eff1-45cf-8cd2-c0d47a963887',
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
  'Thu, 25 Jun 2020 13:06:46 GMT',
  'Content-Length',
  '1399'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroOperationCertificateName-canwaituntilacertificateiscreatedbygettingthepollerfromgetCertificateOperation-/')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroOperationCertificateName-canwaituntilacertificateiscreatedbygettingthepollerfromgetCertificateOperation-/e511b043b45e4fad9959af77a543c87a","attributes":{"enabled":false,"nbf":1593089806,"exp":1624626406,"created":1593090406,"updated":1593090406,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/lroOperationCertificateName-canwaituntilacertificateiscreatedbygettingthepollerfromgetCertificateOperation-/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1593090406,"updated":1593090406}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/lroOperationCertificateName-canwaituntilacertificateiscreatedbygettingthepollerfromgetCertificateOperation-/pending"}}, [
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
  'dada2bee-c0b4-4183-851a-128ca06f5b34',
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
  'Thu, 25 Jun 2020 13:06:46 GMT',
  'Content-Length',
  '1328'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroOperationCertificateName-canwaituntilacertificateiscreatedbygettingthepollerfromgetCertificateOperation-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroOperationCertificateName-canwaituntilacertificateiscreatedbygettingthepollerfromgetCertificateOperation-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEArbvllcb3qWdIs1SwscybdRMMJQ1JpLLKuB3xFz0zJ0UMJpRaP5w30GX6JDsn6ZnKTlxhYjD3zJkSX0ub36soKofF3HqPDhQFpKgK+xKxSvOv8iI42Ybd6X06YPZvovd00r6iD3qKzTQXjKsgRzGVFmgv4Au2TM45a3tOVdzk+fYzDXwLnpmmwK6Z5IxTRzeMK8laHI/Uwfs72xRc/EhvVqLw1hPs+JTzvxNmJPnU6o14w6/Pera18lzY4H9WEBR1jdWPgWgslePmts5zTY9sSp0chFY1BwHzWokaLQvTCiJRCTicREFjI4HgoZm6pEqIDr7RHniM6UdE7hmLK1e3eQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAAXn/EyK4DdVZ89iZqVEuVk/nuckfqqeVARzR0RZPRHNHgD9tydpwE6R8R00tnBbcT4AYJWy64tDU5pEVdTSpepMS+5kob2DzEfLi3Bdza4RZhE70kCvRDBGOAn3Fyme2cSbs4g2eoSiFXuvbJeQO3/ER1sFfn8eDrrP2HJkns1NKk5ifQvXy9QeBatuUEJ3vkRi25rMY9fptLHe66u0XtsjiVU7PPUcSCpOMB/xlGsv+lNTONAYOAHS5YpABxdp1AyySjVCN/mD1ugt6vw9myX6fbNdCha29heklDioj0JBkRG9hc1ulf+Ev5VNOB+YJl2Ts1+mK+S6SSpGvDU7ZoM=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"8991c9e4e2a64a59b658e8f65b65f8e8"}, [
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
  'cd8fb786-ab05-4c30-984c-1e783206145b',
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
  'Thu, 25 Jun 2020 13:06:46 GMT',
  'Content-Length',
  '1399'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroOperationCertificateName-canwaituntilacertificateiscreatedbygettingthepollerfromgetCertificateOperation-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroOperationCertificateName-canwaituntilacertificateiscreatedbygettingthepollerfromgetCertificateOperation-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEArbvllcb3qWdIs1SwscybdRMMJQ1JpLLKuB3xFz0zJ0UMJpRaP5w30GX6JDsn6ZnKTlxhYjD3zJkSX0ub36soKofF3HqPDhQFpKgK+xKxSvOv8iI42Ybd6X06YPZvovd00r6iD3qKzTQXjKsgRzGVFmgv4Au2TM45a3tOVdzk+fYzDXwLnpmmwK6Z5IxTRzeMK8laHI/Uwfs72xRc/EhvVqLw1hPs+JTzvxNmJPnU6o14w6/Pera18lzY4H9WEBR1jdWPgWgslePmts5zTY9sSp0chFY1BwHzWokaLQvTCiJRCTicREFjI4HgoZm6pEqIDr7RHniM6UdE7hmLK1e3eQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAAXn/EyK4DdVZ89iZqVEuVk/nuckfqqeVARzR0RZPRHNHgD9tydpwE6R8R00tnBbcT4AYJWy64tDU5pEVdTSpepMS+5kob2DzEfLi3Bdza4RZhE70kCvRDBGOAn3Fyme2cSbs4g2eoSiFXuvbJeQO3/ER1sFfn8eDrrP2HJkns1NKk5ifQvXy9QeBatuUEJ3vkRi25rMY9fptLHe66u0XtsjiVU7PPUcSCpOMB/xlGsv+lNTONAYOAHS5YpABxdp1AyySjVCN/mD1ugt6vw9myX6fbNdCha29heklDioj0JBkRG9hc1ulf+Ev5VNOB+YJl2Ts1+mK+S6SSpGvDU7ZoM=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"8991c9e4e2a64a59b658e8f65b65f8e8"}, [
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
  '555dafd9-e856-4815-8b01-2c1089487c1a',
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
  'Thu, 25 Jun 2020 13:06:46 GMT',
  'Content-Length',
  '1399'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistcertificatesbypage-4892663737593751')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistcertificatesbypage-4892663737593751"}}, [
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
  'b5440040-2b1c-4015-a08b-3112ff9c1245',
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
  'Thu, 25 Jun 2020 13:06:47 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroOperationCertificateName-canwaituntilacertificateiscreatedbygettingthepollerfromgetCertificateOperation-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroOperationCertificateName-canwaituntilacertificateiscreatedbygettingthepollerfromgetCertificateOperation-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEArbvllcb3qWdIs1SwscybdRMMJQ1JpLLKuB3xFz0zJ0UMJpRaP5w30GX6JDsn6ZnKTlxhYjD3zJkSX0ub36soKofF3HqPDhQFpKgK+xKxSvOv8iI42Ybd6X06YPZvovd00r6iD3qKzTQXjKsgRzGVFmgv4Au2TM45a3tOVdzk+fYzDXwLnpmmwK6Z5IxTRzeMK8laHI/Uwfs72xRc/EhvVqLw1hPs+JTzvxNmJPnU6o14w6/Pera18lzY4H9WEBR1jdWPgWgslePmts5zTY9sSp0chFY1BwHzWokaLQvTCiJRCTicREFjI4HgoZm6pEqIDr7RHniM6UdE7hmLK1e3eQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAAXn/EyK4DdVZ89iZqVEuVk/nuckfqqeVARzR0RZPRHNHgD9tydpwE6R8R00tnBbcT4AYJWy64tDU5pEVdTSpepMS+5kob2DzEfLi3Bdza4RZhE70kCvRDBGOAn3Fyme2cSbs4g2eoSiFXuvbJeQO3/ER1sFfn8eDrrP2HJkns1NKk5ifQvXy9QeBatuUEJ3vkRi25rMY9fptLHe66u0XtsjiVU7PPUcSCpOMB/xlGsv+lNTONAYOAHS5YpABxdp1AyySjVCN/mD1ugt6vw9myX6fbNdCha29heklDioj0JBkRG9hc1ulf+Ev5VNOB+YJl2Ts1+mK+S6SSpGvDU7ZoM=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"8991c9e4e2a64a59b658e8f65b65f8e8"}, [
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
  '3be5b7de-1b72-4532-afc7-8d6d14224026',
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
  'Thu, 25 Jun 2020 13:06:48 GMT',
  'Content-Length',
  '1399'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistcertificatesbypage-4892663737593751')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistcertificatesbypage-4892663737593751"}}, [
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
  '715b48a2-1d4c-481e-b891-01b40de68384',
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
  'Thu, 25 Jun 2020 13:06:49 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroOperationCertificateName-canwaituntilacertificateiscreatedbygettingthepollerfromgetCertificateOperation-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroOperationCertificateName-canwaituntilacertificateiscreatedbygettingthepollerfromgetCertificateOperation-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEArbvllcb3qWdIs1SwscybdRMMJQ1JpLLKuB3xFz0zJ0UMJpRaP5w30GX6JDsn6ZnKTlxhYjD3zJkSX0ub36soKofF3HqPDhQFpKgK+xKxSvOv8iI42Ybd6X06YPZvovd00r6iD3qKzTQXjKsgRzGVFmgv4Au2TM45a3tOVdzk+fYzDXwLnpmmwK6Z5IxTRzeMK8laHI/Uwfs72xRc/EhvVqLw1hPs+JTzvxNmJPnU6o14w6/Pera18lzY4H9WEBR1jdWPgWgslePmts5zTY9sSp0chFY1BwHzWokaLQvTCiJRCTicREFjI4HgoZm6pEqIDr7RHniM6UdE7hmLK1e3eQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAAXn/EyK4DdVZ89iZqVEuVk/nuckfqqeVARzR0RZPRHNHgD9tydpwE6R8R00tnBbcT4AYJWy64tDU5pEVdTSpepMS+5kob2DzEfLi3Bdza4RZhE70kCvRDBGOAn3Fyme2cSbs4g2eoSiFXuvbJeQO3/ER1sFfn8eDrrP2HJkns1NKk5ifQvXy9QeBatuUEJ3vkRi25rMY9fptLHe66u0XtsjiVU7PPUcSCpOMB/xlGsv+lNTONAYOAHS5YpABxdp1AyySjVCN/mD1ugt6vw9myX6fbNdCha29heklDioj0JBkRG9hc1ulf+Ev5VNOB+YJl2Ts1+mK+S6SSpGvDU7ZoM=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"8991c9e4e2a64a59b658e8f65b65f8e8"}, [
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
  '984fe25d-1975-4dc3-8fa4-5bbf8efaa35c',
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
  'Thu, 25 Jun 2020 13:06:50 GMT',
  'Content-Length',
  '1399'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistcertificatesbypage-4892663737593751')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistcertificatesbypage-4892663737593751"}}, [
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
  '4793fd7c-ff61-4077-9c9d-21df038b47de',
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
  'Thu, 25 Jun 2020 13:06:51 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroOperationCertificateName-canwaituntilacertificateiscreatedbygettingthepollerfromgetCertificateOperation-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroOperationCertificateName-canwaituntilacertificateiscreatedbygettingthepollerfromgetCertificateOperation-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEArbvllcb3qWdIs1SwscybdRMMJQ1JpLLKuB3xFz0zJ0UMJpRaP5w30GX6JDsn6ZnKTlxhYjD3zJkSX0ub36soKofF3HqPDhQFpKgK+xKxSvOv8iI42Ybd6X06YPZvovd00r6iD3qKzTQXjKsgRzGVFmgv4Au2TM45a3tOVdzk+fYzDXwLnpmmwK6Z5IxTRzeMK8laHI/Uwfs72xRc/EhvVqLw1hPs+JTzvxNmJPnU6o14w6/Pera18lzY4H9WEBR1jdWPgWgslePmts5zTY9sSp0chFY1BwHzWokaLQvTCiJRCTicREFjI4HgoZm6pEqIDr7RHniM6UdE7hmLK1e3eQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAAXn/EyK4DdVZ89iZqVEuVk/nuckfqqeVARzR0RZPRHNHgD9tydpwE6R8R00tnBbcT4AYJWy64tDU5pEVdTSpepMS+5kob2DzEfLi3Bdza4RZhE70kCvRDBGOAn3Fyme2cSbs4g2eoSiFXuvbJeQO3/ER1sFfn8eDrrP2HJkns1NKk5ifQvXy9QeBatuUEJ3vkRi25rMY9fptLHe66u0XtsjiVU7PPUcSCpOMB/xlGsv+lNTONAYOAHS5YpABxdp1AyySjVCN/mD1ugt6vw9myX6fbNdCha29heklDioj0JBkRG9hc1ulf+Ev5VNOB+YJl2Ts1+mK+S6SSpGvDU7ZoM=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"8991c9e4e2a64a59b658e8f65b65f8e8"}, [
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
  '248276a7-19b8-413d-9751-5ca2a90c0a57',
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
  'Thu, 25 Jun 2020 13:06:52 GMT',
  'Content-Length',
  '1399'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistcertificatesbypage-4892663737593751')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistcertificatesbypage-4892663737593751"}}, [
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
  '25b39a8d-e96a-4d13-b421-460eb4669a68',
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
  'Thu, 25 Jun 2020 13:06:52 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroOperationCertificateName-canwaituntilacertificateiscreatedbygettingthepollerfromgetCertificateOperation-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroOperationCertificateName-canwaituntilacertificateiscreatedbygettingthepollerfromgetCertificateOperation-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEArbvllcb3qWdIs1SwscybdRMMJQ1JpLLKuB3xFz0zJ0UMJpRaP5w30GX6JDsn6ZnKTlxhYjD3zJkSX0ub36soKofF3HqPDhQFpKgK+xKxSvOv8iI42Ybd6X06YPZvovd00r6iD3qKzTQXjKsgRzGVFmgv4Au2TM45a3tOVdzk+fYzDXwLnpmmwK6Z5IxTRzeMK8laHI/Uwfs72xRc/EhvVqLw1hPs+JTzvxNmJPnU6o14w6/Pera18lzY4H9WEBR1jdWPgWgslePmts5zTY9sSp0chFY1BwHzWokaLQvTCiJRCTicREFjI4HgoZm6pEqIDr7RHniM6UdE7hmLK1e3eQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAAXn/EyK4DdVZ89iZqVEuVk/nuckfqqeVARzR0RZPRHNHgD9tydpwE6R8R00tnBbcT4AYJWy64tDU5pEVdTSpepMS+5kob2DzEfLi3Bdza4RZhE70kCvRDBGOAn3Fyme2cSbs4g2eoSiFXuvbJeQO3/ER1sFfn8eDrrP2HJkns1NKk5ifQvXy9QeBatuUEJ3vkRi25rMY9fptLHe66u0XtsjiVU7PPUcSCpOMB/xlGsv+lNTONAYOAHS5YpABxdp1AyySjVCN/mD1ugt6vw9myX6fbNdCha29heklDioj0JBkRG9hc1ulf+Ev5VNOB+YJl2Ts1+mK+S6SSpGvDU7ZoM=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"8991c9e4e2a64a59b658e8f65b65f8e8"}, [
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
  'c4ebcbea-6770-471b-ac88-e26506893e23',
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
  'Thu, 25 Jun 2020 13:06:54 GMT',
  'Content-Length',
  '1399'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistcertificatesbypage-4892663737593751')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistcertificatesbypage-4892663737593751"}}, [
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
  '84f603e2-c936-4134-84ce-b455788295f3',
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
  'Thu, 25 Jun 2020 13:06:54 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroOperationCertificateName-canwaituntilacertificateiscreatedbygettingthepollerfromgetCertificateOperation-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroOperationCertificateName-canwaituntilacertificateiscreatedbygettingthepollerfromgetCertificateOperation-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEArbvllcb3qWdIs1SwscybdRMMJQ1JpLLKuB3xFz0zJ0UMJpRaP5w30GX6JDsn6ZnKTlxhYjD3zJkSX0ub36soKofF3HqPDhQFpKgK+xKxSvOv8iI42Ybd6X06YPZvovd00r6iD3qKzTQXjKsgRzGVFmgv4Au2TM45a3tOVdzk+fYzDXwLnpmmwK6Z5IxTRzeMK8laHI/Uwfs72xRc/EhvVqLw1hPs+JTzvxNmJPnU6o14w6/Pera18lzY4H9WEBR1jdWPgWgslePmts5zTY9sSp0chFY1BwHzWokaLQvTCiJRCTicREFjI4HgoZm6pEqIDr7RHniM6UdE7hmLK1e3eQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAAXn/EyK4DdVZ89iZqVEuVk/nuckfqqeVARzR0RZPRHNHgD9tydpwE6R8R00tnBbcT4AYJWy64tDU5pEVdTSpepMS+5kob2DzEfLi3Bdza4RZhE70kCvRDBGOAn3Fyme2cSbs4g2eoSiFXuvbJeQO3/ER1sFfn8eDrrP2HJkns1NKk5ifQvXy9QeBatuUEJ3vkRi25rMY9fptLHe66u0XtsjiVU7PPUcSCpOMB/xlGsv+lNTONAYOAHS5YpABxdp1AyySjVCN/mD1ugt6vw9myX6fbNdCha29heklDioj0JBkRG9hc1ulf+Ev5VNOB+YJl2Ts1+mK+S6SSpGvDU7ZoM=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"8991c9e4e2a64a59b658e8f65b65f8e8"}, [
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
  '538620d9-a2f9-49fb-b0ec-24203f291078',
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
  'Thu, 25 Jun 2020 13:06:56 GMT',
  'Content-Length',
  '1399'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistcertificatesbypage-4892663737593751')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistcertificatesbypage-4892663737593751"}}, [
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
  '3c95a074-a20f-4138-8fc9-2e2fcfa562a6',
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
  'Thu, 25 Jun 2020 13:06:56 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroOperationCertificateName-canwaituntilacertificateiscreatedbygettingthepollerfromgetCertificateOperation-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroOperationCertificateName-canwaituntilacertificateiscreatedbygettingthepollerfromgetCertificateOperation-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEArbvllcb3qWdIs1SwscybdRMMJQ1JpLLKuB3xFz0zJ0UMJpRaP5w30GX6JDsn6ZnKTlxhYjD3zJkSX0ub36soKofF3HqPDhQFpKgK+xKxSvOv8iI42Ybd6X06YPZvovd00r6iD3qKzTQXjKsgRzGVFmgv4Au2TM45a3tOVdzk+fYzDXwLnpmmwK6Z5IxTRzeMK8laHI/Uwfs72xRc/EhvVqLw1hPs+JTzvxNmJPnU6o14w6/Pera18lzY4H9WEBR1jdWPgWgslePmts5zTY9sSp0chFY1BwHzWokaLQvTCiJRCTicREFjI4HgoZm6pEqIDr7RHniM6UdE7hmLK1e3eQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAAXn/EyK4DdVZ89iZqVEuVk/nuckfqqeVARzR0RZPRHNHgD9tydpwE6R8R00tnBbcT4AYJWy64tDU5pEVdTSpepMS+5kob2DzEfLi3Bdza4RZhE70kCvRDBGOAn3Fyme2cSbs4g2eoSiFXuvbJeQO3/ER1sFfn8eDrrP2HJkns1NKk5ifQvXy9QeBatuUEJ3vkRi25rMY9fptLHe66u0XtsjiVU7PPUcSCpOMB/xlGsv+lNTONAYOAHS5YpABxdp1AyySjVCN/mD1ugt6vw9myX6fbNdCha29heklDioj0JBkRG9hc1ulf+Ev5VNOB+YJl2Ts1+mK+S6SSpGvDU7ZoM=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"8991c9e4e2a64a59b658e8f65b65f8e8"}, [
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
  '95f652b8-43c1-45ed-b493-f10a22add900',
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
  'Thu, 25 Jun 2020 13:06:58 GMT',
  'Content-Length',
  '1399'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistcertificatesbypage-4892663737593751')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistcertificatesbypage-4892663737593751"}}, [
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
  'a809c8ea-fe54-47c1-8caa-d0fe9fdca51e',
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
  'Thu, 25 Jun 2020 13:06:58 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroOperationCertificateName-canwaituntilacertificateiscreatedbygettingthepollerfromgetCertificateOperation-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroOperationCertificateName-canwaituntilacertificateiscreatedbygettingthepollerfromgetCertificateOperation-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEArbvllcb3qWdIs1SwscybdRMMJQ1JpLLKuB3xFz0zJ0UMJpRaP5w30GX6JDsn6ZnKTlxhYjD3zJkSX0ub36soKofF3HqPDhQFpKgK+xKxSvOv8iI42Ybd6X06YPZvovd00r6iD3qKzTQXjKsgRzGVFmgv4Au2TM45a3tOVdzk+fYzDXwLnpmmwK6Z5IxTRzeMK8laHI/Uwfs72xRc/EhvVqLw1hPs+JTzvxNmJPnU6o14w6/Pera18lzY4H9WEBR1jdWPgWgslePmts5zTY9sSp0chFY1BwHzWokaLQvTCiJRCTicREFjI4HgoZm6pEqIDr7RHniM6UdE7hmLK1e3eQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAAXn/EyK4DdVZ89iZqVEuVk/nuckfqqeVARzR0RZPRHNHgD9tydpwE6R8R00tnBbcT4AYJWy64tDU5pEVdTSpepMS+5kob2DzEfLi3Bdza4RZhE70kCvRDBGOAn3Fyme2cSbs4g2eoSiFXuvbJeQO3/ER1sFfn8eDrrP2HJkns1NKk5ifQvXy9QeBatuUEJ3vkRi25rMY9fptLHe66u0XtsjiVU7PPUcSCpOMB/xlGsv+lNTONAYOAHS5YpABxdp1AyySjVCN/mD1ugt6vw9myX6fbNdCha29heklDioj0JBkRG9hc1ulf+Ev5VNOB+YJl2Ts1+mK+S6SSpGvDU7ZoM=","cancellation_requested":false,"status":"completed","target":"https://keyvault_name.vault.azure.net/certificates/lroOperationCertificateName-canwaituntilacertificateiscreatedbygettingthepollerfromgetCertificateOperation-","request_id":"8991c9e4e2a64a59b658e8f65b65f8e8"}, [
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
  '39aa9449-89e8-4531-a5d6-1e2f913d37a8',
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
  'Thu, 25 Jun 2020 13:07:01 GMT',
  'Content-Length',
  '1425'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistcertificatesbypage-4892663737593751')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistcertificatesbypage-4892663737593751"}}, [
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
  '5fa4dee6-967e-425a-8350-d5042b66f0a4',
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
  'Thu, 25 Jun 2020 13:07:00 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroOperationCertificateName-canwaituntilacertificateiscreatedbygettingthepollerfromgetCertificateOperation-/')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroOperationCertificateName-canwaituntilacertificateiscreatedbygettingthepollerfromgetCertificateOperation-/bce1b5d2442b49c9b1a45ac34169fc9e","kid":"https://keyvault_name.vault.azure.net/keys/lroOperationCertificateName-canwaituntilacertificateiscreatedbygettingthepollerfromgetCertificateOperation-/bce1b5d2442b49c9b1a45ac34169fc9e","sid":"https://keyvault_name.vault.azure.net/secrets/lroOperationCertificateName-canwaituntilacertificateiscreatedbygettingthepollerfromgetCertificateOperation-/bce1b5d2442b49c9b1a45ac34169fc9e","x5t":"qEPTr07wUnRz-dSRzY3FbMhGQ8I","cer":"MIIDKDCCAhCgAwIBAgIQUDF/YnEbQxCNo5qyYqCWwTANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjAwNjI1MTI1NjU5WhcNMjEwNjI1MTMwNjU5WjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQCtu+WVxvepZ0izVLCxzJt1EwwlDUmkssq4HfEXPTMnRQwmlFo/nDfQZfokOyfpmcpOXGFiMPfMmRJfS5vfqygqh8Xceo8OFAWkqAr7ErFK86/yIjjZht3pfTpg9m+i93TSvqIPeorNNBeMqyBHMZUWaC/gC7ZMzjlre05V3OT59jMNfAuemabArpnkjFNHN4wryVocj9TB+zvbFFz8SG9WovDWE+z4lPO/E2Yk+dTqjXjDr896trXyXNjgf1YQFHWN1Y+BaCyV4+a2znNNj2xKnRyEVjUHAfNaiRotC9MKIlEJOJxEQWMjgeChmbqkSogOvtEeeIzpR0TuGYsrV7d5AgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBTQBuIwkVnEmuos/QgAfhvh0DyghzAdBgNVHQ4EFgQU0AbiMJFZxJrqLP0IAH4b4dA8oIcwDQYJKoZIhvcNAQELBQADggEBAJIFjCogj6nm7hq4NWFVCU63DuWgsEX/tJIxLCWAaRNuKv+wbTXq/n6TSeBMi3ZI+yIst0w1z+6zaFqhirkH7VvxtVbFb6nT1Z2Lq/kzCmRGl95xHKo51aBlipBYs+3zuznVOP+kdPo7tB7d3ZQeyQDyPlk1n84prpLKcbyprh/CECKlrf0H8jNIGG+JN4OEX6noyWCwsxYyVICKGBpTIGoh8U8bVP0cs8WQpz4x8P4X+CWvMqzaD9TP7IO7Dz2dP2sUaByGpVOr4566yaN00O1VnQ+QcSZHqMvnh3+Jc69KhFoTHaR0Y3hws5lGImH2DO/bgq8jNp54JL47bGFQRX8=","attributes":{"enabled":true,"nbf":1593089819,"exp":1624626419,"created":1593090419,"updated":1593090419,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/lroOperationCertificateName-canwaituntilacertificateiscreatedbygettingthepollerfromgetCertificateOperation-/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1593090406,"updated":1593090406}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/lroOperationCertificateName-canwaituntilacertificateiscreatedbygettingthepollerfromgetCertificateOperation-/pending"}}, [
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
  '6866f512-77ca-4b8e-a38b-22d892794a22',
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
  'Thu, 25 Jun 2020 13:07:01 GMT',
  'Content-Length',
  '2885'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/certificates/lroOperationCertificateName-canwaituntilacertificateiscreatedbygettingthepollerfromgetCertificateOperation-')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/lroOperationCertificateName-canwaituntilacertificateiscreatedbygettingthepollerfromgetCertificateOperation-","deletedDate":1593090421,"scheduledPurgeDate":1600866421,"id":"https://keyvault_name.vault.azure.net/certificates/lroOperationCertificateName-canwaituntilacertificateiscreatedbygettingthepollerfromgetCertificateOperation-/bce1b5d2442b49c9b1a45ac34169fc9e","kid":"https://keyvault_name.vault.azure.net/keys/lroOperationCertificateName-canwaituntilacertificateiscreatedbygettingthepollerfromgetCertificateOperation-/bce1b5d2442b49c9b1a45ac34169fc9e","sid":"https://keyvault_name.vault.azure.net/secrets/lroOperationCertificateName-canwaituntilacertificateiscreatedbygettingthepollerfromgetCertificateOperation-/bce1b5d2442b49c9b1a45ac34169fc9e","x5t":"qEPTr07wUnRz-dSRzY3FbMhGQ8I","cer":"MIIDKDCCAhCgAwIBAgIQUDF/YnEbQxCNo5qyYqCWwTANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjAwNjI1MTI1NjU5WhcNMjEwNjI1MTMwNjU5WjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQCtu+WVxvepZ0izVLCxzJt1EwwlDUmkssq4HfEXPTMnRQwmlFo/nDfQZfokOyfpmcpOXGFiMPfMmRJfS5vfqygqh8Xceo8OFAWkqAr7ErFK86/yIjjZht3pfTpg9m+i93TSvqIPeorNNBeMqyBHMZUWaC/gC7ZMzjlre05V3OT59jMNfAuemabArpnkjFNHN4wryVocj9TB+zvbFFz8SG9WovDWE+z4lPO/E2Yk+dTqjXjDr896trXyXNjgf1YQFHWN1Y+BaCyV4+a2znNNj2xKnRyEVjUHAfNaiRotC9MKIlEJOJxEQWMjgeChmbqkSogOvtEeeIzpR0TuGYsrV7d5AgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBTQBuIwkVnEmuos/QgAfhvh0DyghzAdBgNVHQ4EFgQU0AbiMJFZxJrqLP0IAH4b4dA8oIcwDQYJKoZIhvcNAQELBQADggEBAJIFjCogj6nm7hq4NWFVCU63DuWgsEX/tJIxLCWAaRNuKv+wbTXq/n6TSeBMi3ZI+yIst0w1z+6zaFqhirkH7VvxtVbFb6nT1Z2Lq/kzCmRGl95xHKo51aBlipBYs+3zuznVOP+kdPo7tB7d3ZQeyQDyPlk1n84prpLKcbyprh/CECKlrf0H8jNIGG+JN4OEX6noyWCwsxYyVICKGBpTIGoh8U8bVP0cs8WQpz4x8P4X+CWvMqzaD9TP7IO7Dz2dP2sUaByGpVOr4566yaN00O1VnQ+QcSZHqMvnh3+Jc69KhFoTHaR0Y3hws5lGImH2DO/bgq8jNp54JL47bGFQRX8=","attributes":{"enabled":true,"nbf":1593089819,"exp":1624626419,"created":1593090419,"updated":1593090419,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/lroOperationCertificateName-canwaituntilacertificateiscreatedbygettingthepollerfromgetCertificateOperation-/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1593090406,"updated":1593090406}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/lroOperationCertificateName-canwaituntilacertificateiscreatedbygettingthepollerfromgetCertificateOperation-/pending"}}, [
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
  'ba72f754-fce8-4ccd-9e2c-6865cb5f44ce',
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
  'Thu, 25 Jun 2020 13:07:01 GMT',
  'Content-Length',
  '3144'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroOperationCertificateName-canwaituntilacertificateiscreatedbygettingthepollerfromgetCertificateOperation-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroOperationCertificateName-canwaituntilacertificateiscreatedbygettingthepollerfromgetCertificateOperation-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '207',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '6a46674d-062a-4bd3-889c-95815acab1c2',
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
  'Thu, 25 Jun 2020 13:07:01 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroOperationCertificateName-canwaituntilacertificateiscreatedbygettingthepollerfromgetCertificateOperation-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroOperationCertificateName-canwaituntilacertificateiscreatedbygettingthepollerfromgetCertificateOperation-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '207',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '4c97c995-be0c-4f76-a1b2-8284a1be2908',
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
  'Thu, 25 Jun 2020 13:07:01 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistcertificatesbypage-4892663737593751')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistcertificatesbypage-4892663737593751"}}, [
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
  'ed3c610a-cdab-4114-8962-8733ae2247bd',
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
  'Thu, 25 Jun 2020 13:07:02 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroOperationCertificateName-canwaituntilacertificateiscreatedbygettingthepollerfromgetCertificateOperation-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroOperationCertificateName-canwaituntilacertificateiscreatedbygettingthepollerfromgetCertificateOperation-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '207',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '05e2b882-9bb0-40ca-99c3-8b4610176d6b',
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
  'Thu, 25 Jun 2020 13:07:03 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistcertificatesbypage-4892663737593751')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistcertificatesbypage-4892663737593751"}}, [
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
  'ce025b7f-3f37-441a-8402-b8a3a3445254',
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
  'Thu, 25 Jun 2020 13:07:05 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroOperationCertificateName-canwaituntilacertificateiscreatedbygettingthepollerfromgetCertificateOperation-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroOperationCertificateName-canwaituntilacertificateiscreatedbygettingthepollerfromgetCertificateOperation-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '207',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'fa711b9b-dfa5-4af3-990f-4d0043147231',
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
  'Thu, 25 Jun 2020 13:07:05 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistcertificatesbypage-4892663737593751')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistcertificatesbypage-4892663737593751"}}, [
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
  '708a8d42-88db-4eb3-9fe1-e192caf1355b',
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
  'Thu, 25 Jun 2020 13:07:07 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroOperationCertificateName-canwaituntilacertificateiscreatedbygettingthepollerfromgetCertificateOperation-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroOperationCertificateName-canwaituntilacertificateiscreatedbygettingthepollerfromgetCertificateOperation-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '207',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'd91af549-4aec-4daf-a316-b12deee96598',
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
  'Thu, 25 Jun 2020 13:07:07 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroOperationCertificateName-canwaituntilacertificateiscreatedbygettingthepollerfromgetCertificateOperation-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroOperationCertificateName-canwaituntilacertificateiscreatedbygettingthepollerfromgetCertificateOperation-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '207',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '85dc5d82-5eeb-46a1-8003-d674c8706468',
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
  'Thu, 25 Jun 2020 13:07:10 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistcertificatesbypage-4892663737593751')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistcertificatesbypage-4892663737593751"}}, [
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
  '58c6a9aa-a131-4d1c-997b-427ca35558b0',
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
  'Thu, 25 Jun 2020 13:07:09 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroOperationCertificateName-canwaituntilacertificateiscreatedbygettingthepollerfromgetCertificateOperation-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroOperationCertificateName-canwaituntilacertificateiscreatedbygettingthepollerfromgetCertificateOperation-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '207',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'cc484bc4-e201-46aa-8594-342f930c5593',
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
  'Thu, 25 Jun 2020 13:07:11 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistcertificatesbypage-4892663737593751')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistcertificatesbypage-4892663737593751"}}, [
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
  '397ea088-14c8-4efb-94ed-261f8d0a1725',
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
  'Thu, 25 Jun 2020 13:07:13 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroOperationCertificateName-canwaituntilacertificateiscreatedbygettingthepollerfromgetCertificateOperation-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroOperationCertificateName-canwaituntilacertificateiscreatedbygettingthepollerfromgetCertificateOperation-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '207',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'e2c45e49-f8ae-4c3a-91cb-01bd36212665',
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
  'Thu, 25 Jun 2020 13:07:13 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistcertificatesbypage-4892663737593751')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistcertificatesbypage-4892663737593751"}}, [
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
  '9ec57265-6b22-4071-bed3-21581e6e72b6',
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
  'Thu, 25 Jun 2020 13:07:15 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroOperationCertificateName-canwaituntilacertificateiscreatedbygettingthepollerfromgetCertificateOperation-')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/lroOperationCertificateName-canwaituntilacertificateiscreatedbygettingthepollerfromgetCertificateOperation-","deletedDate":1593090421,"scheduledPurgeDate":1600866421,"id":"https://keyvault_name.vault.azure.net/certificates/lroOperationCertificateName-canwaituntilacertificateiscreatedbygettingthepollerfromgetCertificateOperation-/bce1b5d2442b49c9b1a45ac34169fc9e","kid":"https://keyvault_name.vault.azure.net/keys/lroOperationCertificateName-canwaituntilacertificateiscreatedbygettingthepollerfromgetCertificateOperation-/bce1b5d2442b49c9b1a45ac34169fc9e","sid":"https://keyvault_name.vault.azure.net/secrets/lroOperationCertificateName-canwaituntilacertificateiscreatedbygettingthepollerfromgetCertificateOperation-/bce1b5d2442b49c9b1a45ac34169fc9e","x5t":"qEPTr07wUnRz-dSRzY3FbMhGQ8I","cer":"MIIDKDCCAhCgAwIBAgIQUDF/YnEbQxCNo5qyYqCWwTANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjAwNjI1MTI1NjU5WhcNMjEwNjI1MTMwNjU5WjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQCtu+WVxvepZ0izVLCxzJt1EwwlDUmkssq4HfEXPTMnRQwmlFo/nDfQZfokOyfpmcpOXGFiMPfMmRJfS5vfqygqh8Xceo8OFAWkqAr7ErFK86/yIjjZht3pfTpg9m+i93TSvqIPeorNNBeMqyBHMZUWaC/gC7ZMzjlre05V3OT59jMNfAuemabArpnkjFNHN4wryVocj9TB+zvbFFz8SG9WovDWE+z4lPO/E2Yk+dTqjXjDr896trXyXNjgf1YQFHWN1Y+BaCyV4+a2znNNj2xKnRyEVjUHAfNaiRotC9MKIlEJOJxEQWMjgeChmbqkSogOvtEeeIzpR0TuGYsrV7d5AgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBTQBuIwkVnEmuos/QgAfhvh0DyghzAdBgNVHQ4EFgQU0AbiMJFZxJrqLP0IAH4b4dA8oIcwDQYJKoZIhvcNAQELBQADggEBAJIFjCogj6nm7hq4NWFVCU63DuWgsEX/tJIxLCWAaRNuKv+wbTXq/n6TSeBMi3ZI+yIst0w1z+6zaFqhirkH7VvxtVbFb6nT1Z2Lq/kzCmRGl95xHKo51aBlipBYs+3zuznVOP+kdPo7tB7d3ZQeyQDyPlk1n84prpLKcbyprh/CECKlrf0H8jNIGG+JN4OEX6noyWCwsxYyVICKGBpTIGoh8U8bVP0cs8WQpz4x8P4X+CWvMqzaD9TP7IO7Dz2dP2sUaByGpVOr4566yaN00O1VnQ+QcSZHqMvnh3+Jc69KhFoTHaR0Y3hws5lGImH2DO/bgq8jNp54JL47bGFQRX8=","attributes":{"enabled":true,"nbf":1593089819,"exp":1624626419,"created":1593090419,"updated":1593090419,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/lroOperationCertificateName-canwaituntilacertificateiscreatedbygettingthepollerfromgetCertificateOperation-/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1593090406,"updated":1593090406}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/lroOperationCertificateName-canwaituntilacertificateiscreatedbygettingthepollerfromgetCertificateOperation-/pending"}}, [
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
  '483d293c-6c94-4b9d-90e2-42a3dfbeef68',
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
  'Thu, 25 Jun 2020 13:07:16 GMT',
  'Content-Length',
  '3144'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedcertificates/lroOperationCertificateName-canwaituntilacertificateiscreatedbygettingthepollerfromgetCertificateOperation-')
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
  '0c65672c-4d2a-4c8a-82be-bef094ffd6a0',
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
  'Thu, 25 Jun 2020 13:07:16 GMT'
]);

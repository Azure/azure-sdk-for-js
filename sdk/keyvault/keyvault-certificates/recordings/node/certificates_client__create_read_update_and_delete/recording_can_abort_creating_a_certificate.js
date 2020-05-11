let nock = require('nock');

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
  '8addd14d-31a8-42d6-9e2c-27ca0e7753fd',
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
  'Thu, 07 May 2020 20:55:03 GMT'
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
  'ac76a1cd-f5cc-4950-9874-de977dce4500',
  'x-ms-ests-server',
  '2.1.10519.7 - EUS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=Am5vRv5kGsZHj6i1nd_DSf0_aSJHAQAAAKdsRtYOAAAA; expires=Sat, 06-Jun-2020 20:55:04 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; SameSite=None; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; SameSite=None; secure; HttpOnly',
  'Date',
  'Thu, 07 May 2020 20:55:04 GMT',
  'Content-Length',
  '1315'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/certificates/recoverCertificateName-canabortcreatingacertificate-/create', {"policy":{"key_props":{},"secret_props":{},"x509_props":{"subject":"cn=MyCert","sans":{}},"issuer":{"name":"Self"},"attributes":{}},"attributes":{}})
  .query(true)
  .reply(202, {"id":"https://keyvault_name.vault.azure.net/certificates/recoverCertificateName-canabortcreatingacertificate-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAwR7o8vRsKH1PWRENjphlTfB8LDqdEf90dM36afno0tUvV6zr8m7X9Z895SgJcvqgnw6sXFM3qaAo/4tdzYaBWeyNLbfGaertYVlAzh1mjsBcdE19oH8ykRQE7/6+BdEpYOF+VN4pCjfia3GS7v+t7373MmuAdtNZyC5A8ezEY8HOAG0R/Dg67+NYKaeTP6seybp5PU/MSBOCCPcPPvh/XxguMS24A+RLz92tyaop2piw4j6F3PGuyb4416oC/zeecHmafFRDwetchrPgwhFndN0NuJk2Lur6LQtFI4bQL9etMjGDyjOBuADPIDtQqk91FQGC4yDiaHHgDKBbevSHZwIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAFCgSk27TBDpE87NH25VaEyCRwwyGWWTwGmzsH644oHKPEejHiRpVmVoG1yEslJl1S40qFyyuvXiHRPBUe0x+pyE6h0Zhe92Zd9wrwi4XCKxB5e/Fyfx0BWMcOXSyV5/qJcTaBiogxdDorFYpjlLFiXUbnCCvtK/s2AolSp2PoNx0BXpSKkiic77h8EWyv5t9dpAA8E/RWMBxL6Ge7D+57KzWxYt1JU0k9yTgI5MA8JnQiBFImRfe9KMcJ6wckWviTrb3rWwM+O310G/NpzepTFIZieY3BRf6oxPXXsf8v6S3xIgwuKfLFJZ+3O1l1MYfqwi5fpN6Kf5UiqScm47AYI=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"95b9072795fc40b99210fbc90c5770d6"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://keyvault_name.vault.azure.net/certificates/recoverCertificateName-canabortcreatingacertificate-/pending?api-version=7.0&request_id=95b9072795fc40b99210fbc90c5770d6',
  'Retry-After',
  '10',
  'Server',
  'Microsoft-IIS/10.0',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '05aa6418-b64b-4b51-b23d-a2fdac1133b6',
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
  'Thu, 07 May 2020 20:55:04 GMT',
  'Content-Length',
  '1345'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/recoverCertificateName-canabortcreatingacertificate-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/recoverCertificateName-canabortcreatingacertificate-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAwR7o8vRsKH1PWRENjphlTfB8LDqdEf90dM36afno0tUvV6zr8m7X9Z895SgJcvqgnw6sXFM3qaAo/4tdzYaBWeyNLbfGaertYVlAzh1mjsBcdE19oH8ykRQE7/6+BdEpYOF+VN4pCjfia3GS7v+t7373MmuAdtNZyC5A8ezEY8HOAG0R/Dg67+NYKaeTP6seybp5PU/MSBOCCPcPPvh/XxguMS24A+RLz92tyaop2piw4j6F3PGuyb4416oC/zeecHmafFRDwetchrPgwhFndN0NuJk2Lur6LQtFI4bQL9etMjGDyjOBuADPIDtQqk91FQGC4yDiaHHgDKBbevSHZwIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAFCgSk27TBDpE87NH25VaEyCRwwyGWWTwGmzsH644oHKPEejHiRpVmVoG1yEslJl1S40qFyyuvXiHRPBUe0x+pyE6h0Zhe92Zd9wrwi4XCKxB5e/Fyfx0BWMcOXSyV5/qJcTaBiogxdDorFYpjlLFiXUbnCCvtK/s2AolSp2PoNx0BXpSKkiic77h8EWyv5t9dpAA8E/RWMBxL6Ge7D+57KzWxYt1JU0k9yTgI5MA8JnQiBFImRfe9KMcJ6wckWviTrb3rWwM+O310G/NpzepTFIZieY3BRf6oxPXXsf8v6S3xIgwuKfLFJZ+3O1l1MYfqwi5fpN6Kf5UiqScm47AYI=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"95b9072795fc40b99210fbc90c5770d6"}, [
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
  'a9752076-14fc-4218-9f3d-4387d88e61d0',
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
  'Thu, 07 May 2020 20:55:04 GMT',
  'Content-Length',
  '1345'
]);

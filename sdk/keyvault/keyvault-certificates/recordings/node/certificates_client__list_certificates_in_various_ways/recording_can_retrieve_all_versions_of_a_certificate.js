let nock = require('nock');

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/certificates/recoverCertificateName-canretrieveallversionsofacertificate-/create')
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
  'fd933eac-236d-40e8-ba85-af778c1cb943',
  'x-ms-keyvault-service-version',
  '1.1.0.882',
  'x-ms-keyvault-network-info',
  'addr=13.66.201.96;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 05 Nov 2019 03:43:33 GMT'
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
  'ce55cfc6-0c7e-48d3-8e1d-10a9bacf0200',
  'x-ms-ests-server',
  '2.1.9624.12 - EUS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AgRNzv5fnl5HgyGa900IZUc_aSJHAQAAAObmUtUOAAAA; expires=Thu, 05-Dec-2019 03:43:34 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; SameSite=None; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; SameSite=None; secure; HttpOnly',
  'Date',
  'Tue, 05 Nov 2019 03:43:34 GMT',
  'Content-Length',
  '1231'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/certificates/recoverCertificateName-canretrieveallversionsofacertificate-/create', {"policy":{"key_props":{},"secret_props":{},"x509_props":{"subject":"cn=MyCert","sans":{}},"issuer":{"name":"Self"},"attributes":{"enabled":true}},"attributes":{"enabled":true},"tags":{"tag":"tag01"}})
  .query(true)
  .reply(202, {"id":"https://keyvault_name.vault.azure.net/certificates/recoverCertificateName-canretrieveallversionsofacertificate-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAtznNCJIuftAyC9evC/nZWtDRxfP7BU0ro8ltJNX+jMLwP8SSLyKOP2bv1LE9gF3A+0L2bMDhC78BHLHhdp52GkyADMzoXsxP8NULDnytQ2kmxPI3GED/jKYusTXjG0sOm7dZGkOZnxftKL/6B3JgsfcUPN2wKjAg2QnLzEn7ihSD+OiXR9APXz2AIX7GXk1khVv3oejdkImRQ0L5ZsFJlvMqpyvzbArrBq7yCAA9wl34ZDJzYrJz6U7mFV/cJqcIaq/18a4IirbazOSH+bUZN7aUw/qaLCnG9bv4WEwvTSw7IRN1EKSY1qU2VbrBgUHKJ4pOPNpeV4cp0u/Qmfl55wIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBALMd0H5rBLYg9tTztTTDJCcG3OvNSYdKYEuUHQrMNlDlOvV5dLmaeogByWZNicgtNhbxKMVcTIkukP0LeBsaKDXwcGI/usJdX5mxvqysKTK6BPRkQFoKurHMV61v8rFx8m8S04dvBH2dixR/ov49OwXhwbiZgKv//kito39d0a0PghnJbIDhfsspluM6+UVv3P2rx0t7BZs0qcE38IOJJ1b8Dfemd4n9WBB0ugP75B05ZxUukKe4slX/YbCwzcRnmHipuecRq0u/FQ7f8HGFwQeP6byrtazXjjwntbnMIetPJc5k6MPyOHWet3YKNxO5kqhI3mCw1VPdp3ezEXgYiaU=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"4591d538c6a94cf588b7bc33f974aadf"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://keyvault_name.vault.azure.net/certificates/recoverCertificateName-canretrieveallversionsofacertificate-/pending?api-version=7.0&request_id=4591d538c6a94cf588b7bc33f974aadf',
  'Retry-After',
  '10',
  'Server',
  'Microsoft-IIS/10.0',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '0eaeb5a1-8c26-4199-9b0e-f8ec585c8338',
  'x-ms-keyvault-service-version',
  '1.1.0.882',
  'x-ms-keyvault-network-info',
  'addr=13.66.201.96;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 05 Nov 2019 03:43:35 GMT',
  'Content-Length',
  '1345'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/recoverCertificateName-canretrieveallversionsofacertificate-/')
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
  '57f32e61-2278-4e8a-98b6-efa0edfb31bc',
  'x-ms-keyvault-service-version',
  '1.1.0.882',
  'x-ms-keyvault-network-info',
  'addr=13.66.201.96;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 05 Nov 2019 03:43:35 GMT'
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
  'db719d79-baf8-49cf-ba99-317f35cf0200',
  'x-ms-ests-server',
  '2.1.9624.12 - SCUS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AgRNzv5fnl5HgyGa900IZUc_aSJHAgAAAObmUtUOAAAA; expires=Thu, 05-Dec-2019 03:43:36 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; SameSite=None; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; SameSite=None; secure; HttpOnly',
  'Date',
  'Tue, 05 Nov 2019 03:43:35 GMT',
  'Content-Length',
  '1231'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/recoverCertificateName-canretrieveallversionsofacertificate-/')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/recoverCertificateName-canretrieveallversionsofacertificate-/98e7cb854187473fa648d9adae02ab01","attributes":{"enabled":false,"nbf":1572924815,"exp":1604547815,"created":1572925415,"updated":1572925415,"recoveryLevel":"Recoverable+Purgeable"},"tags":{"tag":"tag01"},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/recoverCertificateName-canretrieveallversionsofacertificate-/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1572925415,"updated":1572925415}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/recoverCertificateName-canretrieveallversionsofacertificate-/pending"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '4e9d97bd-b806-4c51-b6d9-8db0dd8fea7d',
  'x-ms-keyvault-service-version',
  '1.1.0.882',
  'x-ms-keyvault-network-info',
  'addr=13.66.201.96;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 05 Nov 2019 03:43:35 GMT',
  'Content-Length',
  '1168'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/certificates/recoverCertificateName-canretrieveallversionsofacertificate-/create')
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
  'fc4be7c3-314b-4beb-a802-a3b15eebd9fa',
  'x-ms-keyvault-service-version',
  '1.1.0.882',
  'x-ms-keyvault-network-info',
  'addr=13.66.201.96;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 05 Nov 2019 03:43:35 GMT'
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
  '97dee561-7482-46ec-9911-209d90a10200',
  'x-ms-ests-server',
  '2.1.9624.12 - NCUS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AgRNzv5fnl5HgyGa900IZUc_aSJHAwAAAObmUtUOAAAA; expires=Thu, 05-Dec-2019 03:43:36 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; SameSite=None; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; SameSite=None; secure; HttpOnly',
  'Date',
  'Tue, 05 Nov 2019 03:43:35 GMT',
  'Content-Length',
  '1231'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/certificates/recoverCertificateName-canretrieveallversionsofacertificate-/create', {"policy":{"key_props":{},"secret_props":{},"x509_props":{"subject":"cn=MyCert","sans":{}},"issuer":{"name":"Self"},"attributes":{"enabled":true}},"attributes":{"enabled":true},"tags":{"tag":"tag02"}})
  .query(true)
  .reply(409, {"error":{"code":"Conflict","message":"A new key vault certificate can not be created or imported while a pending key vault certificate's status is inProgress."}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '162',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '3453f805-bcde-41b1-9fcc-91cf2a85bb98',
  'x-ms-keyvault-service-version',
  '1.1.0.882',
  'x-ms-keyvault-network-info',
  'addr=13.66.201.96;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 05 Nov 2019 03:43:35 GMT'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/certificates/recoverCertificateName-canretrieveallversionsofacertificate-/create')
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
  'adae9666-49df-4198-a010-1e0b6baa50c0',
  'x-ms-keyvault-service-version',
  '1.1.0.882',
  'x-ms-keyvault-network-info',
  'addr=13.66.201.96;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 05 Nov 2019 03:43:46 GMT'
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
  'ce55cfc6-0c7e-48d3-8e1d-10a9e2d00200',
  'x-ms-ests-server',
  '2.1.9624.12 - EUS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AgRNzv5fnl5HgyGa900IZUc_aSJHBAAAAObmUtUOAAAA; expires=Thu, 05-Dec-2019 03:43:46 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; SameSite=None; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; SameSite=None; secure; HttpOnly',
  'Date',
  'Tue, 05 Nov 2019 03:43:46 GMT',
  'Content-Length',
  '1231'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/certificates/recoverCertificateName-canretrieveallversionsofacertificate-/create', {"policy":{"key_props":{},"secret_props":{},"x509_props":{"subject":"cn=MyCert","sans":{}},"issuer":{"name":"Self"},"attributes":{"enabled":true}},"attributes":{"enabled":true},"tags":{"tag":"tag02"}})
  .query(true)
  .reply(202, {"id":"https://keyvault_name.vault.azure.net/certificates/recoverCertificateName-canretrieveallversionsofacertificate-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAp4mWDqdQHiYfh5KgdZuA3Jj6U8O2+gPQNVwBUYjxhFKoTqkz21dBHhGZQScpMHPBzHNcPeM81wLR5GIsJAJg+1TNUMGksEmsZSce3nJ/os0gj8lahBc+h4GoQy5mAsnWCGs5WpdMW7j4wJBgAPHASjeUAx4P3ar7GWY3XWjDwaK0AcL7wMm40TVZxygan5aTC7NeincozOjo5TVtSins4dYT0atMH7GbM4VO4/yNg6CrvULEJABpHC4Zyk7r/g3qUTx3QbLeKBvf0IXSHD36MlZcdru2dZVpvJfA2STpc+ARJPGTUevJYuEmCL55ST3BqVGLfc5lbuVUqtDI/npEgQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAIE5y0xLnmmUqJUS/Dk+WMyU4j6eNcGI7f1XFW8HqyKfR7YlbNfjuqAs+1G3ZyrtTIA87SNJ+HIrwzv+w9xsTwIdq8ddywYBRH7c7jKRyImKRzR+4WwSe8v4qx3oK2zURbjchJoBP+q8qBPPVpiQ8b3vG7YVAJFk3Ugms9PAZS2CBI4+q3tsKBUb+MTYceT7aAsCSHaBOUtdNe3Y4a2Wywa+CKzHZ4pu7XuIgSyEaNwjmZk+RW1/svK0ldYxIrLzGfUAp5sl38L2RUCKDB5lcbFJYm0sFnysl7k8CpOH67ydZxYzFmbUtS4vpM0G7BgWFF//vPmZYXSRNh07k5KMqcY=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"0f1ac97d47154df1a56d15a298354164"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://keyvault_name.vault.azure.net/certificates/recoverCertificateName-canretrieveallversionsofacertificate-/pending?api-version=7.0&request_id=0f1ac97d47154df1a56d15a298354164',
  'Retry-After',
  '10',
  'Server',
  'Microsoft-IIS/10.0',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'd1913bb5-8d51-45b0-a08d-313d452d52b4',
  'x-ms-keyvault-service-version',
  '1.1.0.882',
  'x-ms-keyvault-network-info',
  'addr=13.66.201.96;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 05 Nov 2019 03:43:47 GMT',
  'Content-Length',
  '1345'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/recoverCertificateName-canretrieveallversionsofacertificate-/')
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
  'd4080a00-9a51-4e1d-8adb-9944bd9e789d',
  'x-ms-keyvault-service-version',
  '1.1.0.882',
  'x-ms-keyvault-network-info',
  'addr=13.66.201.96;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 05 Nov 2019 03:43:47 GMT'
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
  '0ba98561-bb6e-4449-b413-a31c77d70200',
  'x-ms-ests-server',
  '2.1.9624.12 - NCUS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AgRNzv5fnl5HgyGa900IZUc_aSJHBQAAAObmUtUOAAAA; expires=Thu, 05-Dec-2019 03:43:47 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; SameSite=None; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; SameSite=None; secure; HttpOnly',
  'Date',
  'Tue, 05 Nov 2019 03:43:47 GMT',
  'Content-Length',
  '1231'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/recoverCertificateName-canretrieveallversionsofacertificate-/')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/recoverCertificateName-canretrieveallversionsofacertificate-/6253258c353e4020b00a65750ceadc97","kid":"https://keyvault_name.vault.azure.net/keys/recoverCertificateName-canretrieveallversionsofacertificate-/6253258c353e4020b00a65750ceadc97","sid":"https://keyvault_name.vault.azure.net/secrets/recoverCertificateName-canretrieveallversionsofacertificate-/6253258c353e4020b00a65750ceadc97","x5t":"wR-VO5a4xI7LgZvR67bKRPYve5U","cer":"MIIDKDCCAhCgAwIBAgIQKFao4v0RS12ZulWPwwgmUDANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMTkxMTA1MDMzMzQ1WhcNMjAxMTA1MDM0MzQ1WjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQC3Oc0Iki5+0DIL168L+dla0NHF8/sFTSujyW0k1f6MwvA/xJIvIo4/Zu/UsT2AXcD7QvZswOELvwEcseF2nnYaTIAMzOhezE/w1QsOfK1DaSbE8jcYQP+Mpi6xNeMbSw6bt1kaQ5mfF+0ov/oHcmCx9xQ83bAqMCDZCcvMSfuKFIP46JdH0A9fPYAhfsZeTWSFW/eh6N2QiZFDQvlmwUmW8yqnK/NsCusGrvIIAD3CXfhkMnNisnPpTuYVX9wmpwhqr/XxrgiKttrM5If5tRk3tpTD+posKcb1u/hYTC9NLDshE3UQpJjWpTZVusGBQconik482l5XhynS79CZ+XnnAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBQZy3oW2Xw+eO7zhAowXVU1pUqnCDAdBgNVHQ4EFgQUGct6Ftl8Pnju84QKMF1VNaVKpwgwDQYJKoZIhvcNAQELBQADggEBAHpi1NTQ1NkMaLcjVJRWQU0MnMAhn/Mjd54Mq2t7aT+O72t5XYnMgHf1SgLPNzydLWUxWwl7EYhJ79PBqI4rL6TERrkmCdQT8NwgRX59o9MQlRtzAQGxVSxVMUrUoN1rcGtxJeywgLqx+dBSwKbcYEg3zAmzwjXVWh+9zPQZyHmf5iAkz4OHa0OKhcwVcoQY4st3Jh1aBu6fcbt+LEmR3ue5HZCL8VfrVpDL5o15W0DjcSatEn82I0YmlFSXCwMgdpHXLt0B8baoT3Pv8SrH5Qdz1p858JtLgW3WLlnO096sVnZGlKYPyFb4YtMqgUmxVWBev6j4HhLBN1LDjrmuxfI=","attributes":{"enabled":true,"nbf":1572924825,"exp":1604547825,"created":1572925425,"updated":1572925425,"recoveryLevel":"Recoverable+Purgeable"},"tags":{"tag":"tag01"},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/recoverCertificateName-canretrieveallversionsofacertificate-/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1572925415,"updated":1572925426}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/recoverCertificateName-canretrieveallversionsofacertificate-/pending"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'cde92527-b958-4a67-9e3c-12c7063e8f05',
  'x-ms-keyvault-service-version',
  '1.1.0.882',
  'x-ms-keyvault-network-info',
  'addr=13.66.201.96;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 05 Nov 2019 03:43:47 GMT',
  'Content-Length',
  '2617'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/recoverCertificateName-canretrieveallversionsofacertificate-/')
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
  '95a9715d-e752-46b3-8553-90bb2c43aa50',
  'x-ms-keyvault-service-version',
  '1.1.0.882',
  'x-ms-keyvault-network-info',
  'addr=13.66.201.96;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 05 Nov 2019 03:43:57 GMT'
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
  '5ea28de1-7a83-452a-9689-9accd0c40200',
  'x-ms-ests-server',
  '2.1.9624.12 - NCUS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AgRNzv5fnl5HgyGa900IZUc_aSJHBgAAAObmUtUOAAAA; expires=Thu, 05-Dec-2019 03:43:57 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; SameSite=None; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; SameSite=None; secure; HttpOnly',
  'Date',
  'Tue, 05 Nov 2019 03:43:57 GMT',
  'Content-Length',
  '1231'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/recoverCertificateName-canretrieveallversionsofacertificate-/')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/recoverCertificateName-canretrieveallversionsofacertificate-/6253258c353e4020b00a65750ceadc97","kid":"https://keyvault_name.vault.azure.net/keys/recoverCertificateName-canretrieveallversionsofacertificate-/6253258c353e4020b00a65750ceadc97","sid":"https://keyvault_name.vault.azure.net/secrets/recoverCertificateName-canretrieveallversionsofacertificate-/6253258c353e4020b00a65750ceadc97","x5t":"wR-VO5a4xI7LgZvR67bKRPYve5U","cer":"MIIDKDCCAhCgAwIBAgIQKFao4v0RS12ZulWPwwgmUDANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMTkxMTA1MDMzMzQ1WhcNMjAxMTA1MDM0MzQ1WjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQC3Oc0Iki5+0DIL168L+dla0NHF8/sFTSujyW0k1f6MwvA/xJIvIo4/Zu/UsT2AXcD7QvZswOELvwEcseF2nnYaTIAMzOhezE/w1QsOfK1DaSbE8jcYQP+Mpi6xNeMbSw6bt1kaQ5mfF+0ov/oHcmCx9xQ83bAqMCDZCcvMSfuKFIP46JdH0A9fPYAhfsZeTWSFW/eh6N2QiZFDQvlmwUmW8yqnK/NsCusGrvIIAD3CXfhkMnNisnPpTuYVX9wmpwhqr/XxrgiKttrM5If5tRk3tpTD+posKcb1u/hYTC9NLDshE3UQpJjWpTZVusGBQconik482l5XhynS79CZ+XnnAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBQZy3oW2Xw+eO7zhAowXVU1pUqnCDAdBgNVHQ4EFgQUGct6Ftl8Pnju84QKMF1VNaVKpwgwDQYJKoZIhvcNAQELBQADggEBAHpi1NTQ1NkMaLcjVJRWQU0MnMAhn/Mjd54Mq2t7aT+O72t5XYnMgHf1SgLPNzydLWUxWwl7EYhJ79PBqI4rL6TERrkmCdQT8NwgRX59o9MQlRtzAQGxVSxVMUrUoN1rcGtxJeywgLqx+dBSwKbcYEg3zAmzwjXVWh+9zPQZyHmf5iAkz4OHa0OKhcwVcoQY4st3Jh1aBu6fcbt+LEmR3ue5HZCL8VfrVpDL5o15W0DjcSatEn82I0YmlFSXCwMgdpHXLt0B8baoT3Pv8SrH5Qdz1p858JtLgW3WLlnO096sVnZGlKYPyFb4YtMqgUmxVWBev6j4HhLBN1LDjrmuxfI=","attributes":{"enabled":true,"nbf":1572924825,"exp":1604547825,"created":1572925425,"updated":1572925425,"recoveryLevel":"Recoverable+Purgeable"},"tags":{"tag":"tag01"},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/recoverCertificateName-canretrieveallversionsofacertificate-/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1572925415,"updated":1572925426}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/recoverCertificateName-canretrieveallversionsofacertificate-/pending"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '599c4ac0-72f8-4331-900e-7e35ba685e63',
  'x-ms-keyvault-service-version',
  '1.1.0.882',
  'x-ms-keyvault-network-info',
  'addr=13.66.201.96;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 05 Nov 2019 03:43:57 GMT',
  'Content-Length',
  '2617'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/recoverCertificateName-canretrieveallversionsofacertificate-/')
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
  'f620ddf0-a72a-4a00-8829-c30aadd867ff',
  'x-ms-keyvault-service-version',
  '1.1.0.882',
  'x-ms-keyvault-network-info',
  'addr=13.66.201.96;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 05 Nov 2019 03:44:07 GMT'
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
  '4e48c6eb-119e-4dc1-b88d-0c675b280300',
  'x-ms-ests-server',
  '2.1.9624.12 - SCUS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AgRNzv5fnl5HgyGa900IZUc_aSJHBwAAAObmUtUOAAAA; expires=Thu, 05-Dec-2019 03:44:08 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; SameSite=None; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; SameSite=None; secure; HttpOnly',
  'Date',
  'Tue, 05 Nov 2019 03:44:07 GMT',
  'Content-Length',
  '1225'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/recoverCertificateName-canretrieveallversionsofacertificate-/')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/recoverCertificateName-canretrieveallversionsofacertificate-/5a9471542c1c4e45af11e5b6a176f9d9","kid":"https://keyvault_name.vault.azure.net/keys/recoverCertificateName-canretrieveallversionsofacertificate-/5a9471542c1c4e45af11e5b6a176f9d9","sid":"https://keyvault_name.vault.azure.net/secrets/recoverCertificateName-canretrieveallversionsofacertificate-/5a9471542c1c4e45af11e5b6a176f9d9","x5t":"9cYQJ9LJp40TYogwBzxFl71hOME","cer":"MIIDKDCCAhCgAwIBAgIQFgCCP9EqTHmIpn6SL9PovDANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMTkxMTA1MDMzNDA0WhcNMjAxMTA1MDM0NDA0WjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQCniZYOp1AeJh+HkqB1m4DcmPpTw7b6A9A1XAFRiPGEUqhOqTPbV0EeEZlBJykwc8HMc1w94zzXAtHkYiwkAmD7VM1QwaSwSaxlJx7ecn+izSCPyVqEFz6HgahDLmYCydYIazlal0xbuPjAkGAA8cBKN5QDHg/dqvsZZjddaMPBorQBwvvAybjRNVnHKBqflpMLs16KdyjM6OjlNW1KKezh1hPRq0wfsZszhU7j/I2DoKu9QsQkAGkcLhnKTuv+DepRPHdBst4oG9/QhdIcPfoyVlx2u7Z1lWm8l8DZJOlz4BEk8ZNR68li4SYIvnlJPcGpUYt9zmVu5VSq0Mj+ekSBAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBR9CCt1c43dEXSwsk5WlXj+RuDK1jAdBgNVHQ4EFgQUfQgrdXON3RF0sLJOVpV4/kbgytYwDQYJKoZIhvcNAQELBQADggEBAEgUUxuT6p93kbsI7PAg144HKERJvB8XfnNvCbeqkjUYGoXkPuX1BWew0Mir3LRkNHqa26mhJNgEGx5AEkMpzJKvNNElE47pQmlSmG8bgqm7kCqIGIcoWQoITJqGh5ErkLeU1S/O9Y7IeYSRSaDzl4C151T45QESMkBDkC6Te0R421xOj3/E9CddtmOhIKduaOR16Vzwgf72P3NpPRMOc1WIzJ7BQhR0kkWUZDSjV27VOxn3Vj1Y/xnA+nbUTKQeSE/K9OOM9Iq7nBEi+rCXPbHNdMmu28bGmh9RO3IpzRfhRxqAXMv6Mcxa+jAEDuOC7AbNXiLwEz+EoxBDkNHxY6w=","attributes":{"enabled":true,"nbf":1572924844,"exp":1604547844,"created":1572925444,"updated":1572925444,"recoveryLevel":"Recoverable+Purgeable"},"tags":{"tag":"tag02"},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/recoverCertificateName-canretrieveallversionsofacertificate-/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1572925415,"updated":1572925426}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/recoverCertificateName-canretrieveallversionsofacertificate-/pending"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '54e87ba2-4bb9-4948-961a-86abfa4fe164',
  'x-ms-keyvault-service-version',
  '1.1.0.882',
  'x-ms-keyvault-network-info',
  'addr=13.66.201.96;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 05 Nov 2019 03:44:07 GMT',
  'Content-Length',
  '2617'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/certificates/recoverCertificateName-canretrieveallversionsofacertificate-/create')
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
  'e0e2bff0-6c25-4ffc-8f01-688ad9067242',
  'x-ms-keyvault-service-version',
  '1.1.0.882',
  'x-ms-keyvault-network-info',
  'addr=13.66.201.96;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 05 Nov 2019 03:44:07 GMT'
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
  '5ea28de1-7a83-452a-9689-9accabc50200',
  'x-ms-ests-server',
  '2.1.9624.12 - NCUS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AgRNzv5fnl5HgyGa900IZUc_aSJHCAAAAObmUtUOAAAA; expires=Thu, 05-Dec-2019 03:44:08 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; SameSite=None; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; SameSite=None; secure; HttpOnly',
  'Date',
  'Tue, 05 Nov 2019 03:44:08 GMT',
  'Content-Length',
  '1231'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/certificates/recoverCertificateName-canretrieveallversionsofacertificate-/create', {"policy":{"key_props":{},"secret_props":{},"x509_props":{"subject":"cn=MyCert","sans":{}},"issuer":{"name":"Self"},"attributes":{"enabled":true}},"attributes":{"enabled":true},"tags":{"tag":"tag03"}})
  .query(true)
  .reply(202, {"id":"https://keyvault_name.vault.azure.net/certificates/recoverCertificateName-canretrieveallversionsofacertificate-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAtNVUoQLHAenioG9iutlu58Tn65VHRVRHZ4nfn390EfSSEry5GdCBSHX36ZV1iisfD75IY/Tz/9L7IvSM1muKeqtNla5mMFSc3CXehXAdRiA11/fRDJFsNdznqHESAIFaTujpyoe5iOxTRffiCE5cQ4eT+Cu/5k8j4FhI5RgORElz8bygKjGHDHpfW7PwPh1e/NhTuSc0pYT3/f71wxp40BLNqCZqJOpdHZluWTz0gnLpIQQFsiBlyYdxkysPqw9XfyDJEqjznSimrr/c7T8SXDdOwGLRAhm4slpzrH3NL4V6m48S65QsQgcbQQAbHawSqWNSiMGL2VyjlxzBiuNWawIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAH1TEVoxxWNUVWEQ42Dba3DcWCDRnZJhqjM8dskdtEVIlE1KWa762TMVYbiOCDL8/VKdsfOnvV058p18AVKpoPjX/OErHsQAjhxFQsakN9Ms/UC/WSROtVMurV/MnJ+vh0WCmS4Hzk0odZtQ+LQAkP/WC9JFGCh4w81dW02+sA43oJTXon01F/00L6EhbIzkMo7Cq15JPI41zins7qBfR2A+VdkTqeNcjwQjUEkilrA328+ndaKBuQ1O9AG1Q+DQCLszwwHGNcwgcomxaiohxHHPlAmYZ5Gu6ZI7Ywrc56e3fSwUDksFZJb+5umNJb55oxROMBba4CbNQmTzR3GZYzA=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"4fab5301e5c14d128c2546a8df6f05fe"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://keyvault_name.vault.azure.net/certificates/recoverCertificateName-canretrieveallversionsofacertificate-/pending?api-version=7.0&request_id=4fab5301e5c14d128c2546a8df6f05fe',
  'Retry-After',
  '10',
  'Server',
  'Microsoft-IIS/10.0',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '9a1a2012-df91-4171-9034-fb60e265e30d',
  'x-ms-keyvault-service-version',
  '1.1.0.882',
  'x-ms-keyvault-network-info',
  'addr=13.66.201.96;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 05 Nov 2019 03:44:08 GMT',
  'Content-Length',
  '1345'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/recoverCertificateName-canretrieveallversionsofacertificate-/')
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
  '02bc6c57-e0aa-492d-9881-4d6871f7a5ee',
  'x-ms-keyvault-service-version',
  '1.1.0.882',
  'x-ms-keyvault-network-info',
  'addr=13.66.201.96;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 05 Nov 2019 03:44:08 GMT'
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
  'a3c33c3d-ec19-4243-9143-71c2d5db0200',
  'x-ms-ests-server',
  '2.1.9624.12 - NCUS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AgRNzv5fnl5HgyGa900IZUc_aSJHCQAAAObmUtUOAAAA; expires=Thu, 05-Dec-2019 03:44:09 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; SameSite=None; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; SameSite=None; secure; HttpOnly',
  'Date',
  'Tue, 05 Nov 2019 03:44:08 GMT',
  'Content-Length',
  '1231'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/recoverCertificateName-canretrieveallversionsofacertificate-/')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/recoverCertificateName-canretrieveallversionsofacertificate-/5a9471542c1c4e45af11e5b6a176f9d9","kid":"https://keyvault_name.vault.azure.net/keys/recoverCertificateName-canretrieveallversionsofacertificate-/5a9471542c1c4e45af11e5b6a176f9d9","sid":"https://keyvault_name.vault.azure.net/secrets/recoverCertificateName-canretrieveallversionsofacertificate-/5a9471542c1c4e45af11e5b6a176f9d9","x5t":"9cYQJ9LJp40TYogwBzxFl71hOME","cer":"MIIDKDCCAhCgAwIBAgIQFgCCP9EqTHmIpn6SL9PovDANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMTkxMTA1MDMzNDA0WhcNMjAxMTA1MDM0NDA0WjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQCniZYOp1AeJh+HkqB1m4DcmPpTw7b6A9A1XAFRiPGEUqhOqTPbV0EeEZlBJykwc8HMc1w94zzXAtHkYiwkAmD7VM1QwaSwSaxlJx7ecn+izSCPyVqEFz6HgahDLmYCydYIazlal0xbuPjAkGAA8cBKN5QDHg/dqvsZZjddaMPBorQBwvvAybjRNVnHKBqflpMLs16KdyjM6OjlNW1KKezh1hPRq0wfsZszhU7j/I2DoKu9QsQkAGkcLhnKTuv+DepRPHdBst4oG9/QhdIcPfoyVlx2u7Z1lWm8l8DZJOlz4BEk8ZNR68li4SYIvnlJPcGpUYt9zmVu5VSq0Mj+ekSBAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBR9CCt1c43dEXSwsk5WlXj+RuDK1jAdBgNVHQ4EFgQUfQgrdXON3RF0sLJOVpV4/kbgytYwDQYJKoZIhvcNAQELBQADggEBAEgUUxuT6p93kbsI7PAg144HKERJvB8XfnNvCbeqkjUYGoXkPuX1BWew0Mir3LRkNHqa26mhJNgEGx5AEkMpzJKvNNElE47pQmlSmG8bgqm7kCqIGIcoWQoITJqGh5ErkLeU1S/O9Y7IeYSRSaDzl4C151T45QESMkBDkC6Te0R421xOj3/E9CddtmOhIKduaOR16Vzwgf72P3NpPRMOc1WIzJ7BQhR0kkWUZDSjV27VOxn3Vj1Y/xnA+nbUTKQeSE/K9OOM9Iq7nBEi+rCXPbHNdMmu28bGmh9RO3IpzRfhRxqAXMv6Mcxa+jAEDuOC7AbNXiLwEz+EoxBDkNHxY6w=","attributes":{"enabled":true,"nbf":1572924844,"exp":1604547844,"created":1572925444,"updated":1572925444,"recoveryLevel":"Recoverable+Purgeable"},"tags":{"tag":"tag02"},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/recoverCertificateName-canretrieveallversionsofacertificate-/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1572925415,"updated":1572925448}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/recoverCertificateName-canretrieveallversionsofacertificate-/pending"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'df832ff9-ceed-490d-90b9-5d07e272da3c',
  'x-ms-keyvault-service-version',
  '1.1.0.882',
  'x-ms-keyvault-network-info',
  'addr=13.66.201.96;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 05 Nov 2019 03:44:08 GMT',
  'Content-Length',
  '2617'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/recoverCertificateName-canretrieveallversionsofacertificate-/')
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
  '81b0ed31-7313-4a77-b94a-a611ff085859',
  'x-ms-keyvault-service-version',
  '1.1.0.882',
  'x-ms-keyvault-network-info',
  'addr=13.66.201.96;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 05 Nov 2019 03:44:19 GMT'
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
  '99743dbb-4707-4f13-99c2-e70d349d0200',
  'x-ms-ests-server',
  '2.1.9645.6 - WUS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AgRNzv5fnl5HgyGa900IZUc_aSJHCgAAAObmUtUOAAAA; expires=Thu, 05-Dec-2019 03:44:19 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; SameSite=None; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; SameSite=None; secure; HttpOnly',
  'Date',
  'Tue, 05 Nov 2019 03:44:18 GMT',
  'Content-Length',
  '1231'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/recoverCertificateName-canretrieveallversionsofacertificate-/')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/recoverCertificateName-canretrieveallversionsofacertificate-/5a9471542c1c4e45af11e5b6a176f9d9","kid":"https://keyvault_name.vault.azure.net/keys/recoverCertificateName-canretrieveallversionsofacertificate-/5a9471542c1c4e45af11e5b6a176f9d9","sid":"https://keyvault_name.vault.azure.net/secrets/recoverCertificateName-canretrieveallversionsofacertificate-/5a9471542c1c4e45af11e5b6a176f9d9","x5t":"9cYQJ9LJp40TYogwBzxFl71hOME","cer":"MIIDKDCCAhCgAwIBAgIQFgCCP9EqTHmIpn6SL9PovDANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMTkxMTA1MDMzNDA0WhcNMjAxMTA1MDM0NDA0WjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQCniZYOp1AeJh+HkqB1m4DcmPpTw7b6A9A1XAFRiPGEUqhOqTPbV0EeEZlBJykwc8HMc1w94zzXAtHkYiwkAmD7VM1QwaSwSaxlJx7ecn+izSCPyVqEFz6HgahDLmYCydYIazlal0xbuPjAkGAA8cBKN5QDHg/dqvsZZjddaMPBorQBwvvAybjRNVnHKBqflpMLs16KdyjM6OjlNW1KKezh1hPRq0wfsZszhU7j/I2DoKu9QsQkAGkcLhnKTuv+DepRPHdBst4oG9/QhdIcPfoyVlx2u7Z1lWm8l8DZJOlz4BEk8ZNR68li4SYIvnlJPcGpUYt9zmVu5VSq0Mj+ekSBAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBR9CCt1c43dEXSwsk5WlXj+RuDK1jAdBgNVHQ4EFgQUfQgrdXON3RF0sLJOVpV4/kbgytYwDQYJKoZIhvcNAQELBQADggEBAEgUUxuT6p93kbsI7PAg144HKERJvB8XfnNvCbeqkjUYGoXkPuX1BWew0Mir3LRkNHqa26mhJNgEGx5AEkMpzJKvNNElE47pQmlSmG8bgqm7kCqIGIcoWQoITJqGh5ErkLeU1S/O9Y7IeYSRSaDzl4C151T45QESMkBDkC6Te0R421xOj3/E9CddtmOhIKduaOR16Vzwgf72P3NpPRMOc1WIzJ7BQhR0kkWUZDSjV27VOxn3Vj1Y/xnA+nbUTKQeSE/K9OOM9Iq7nBEi+rCXPbHNdMmu28bGmh9RO3IpzRfhRxqAXMv6Mcxa+jAEDuOC7AbNXiLwEz+EoxBDkNHxY6w=","attributes":{"enabled":true,"nbf":1572924844,"exp":1604547844,"created":1572925444,"updated":1572925444,"recoveryLevel":"Recoverable+Purgeable"},"tags":{"tag":"tag02"},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/recoverCertificateName-canretrieveallversionsofacertificate-/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1572925415,"updated":1572925448}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/recoverCertificateName-canretrieveallversionsofacertificate-/pending"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'dbc26ee0-d9cc-4c7d-ab09-c3d240bb4499',
  'x-ms-keyvault-service-version',
  '1.1.0.882',
  'x-ms-keyvault-network-info',
  'addr=13.66.201.96;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 05 Nov 2019 03:44:19 GMT',
  'Content-Length',
  '2617'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/recoverCertificateName-canretrieveallversionsofacertificate-/')
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
  '6ae3d085-e950-43b8-ae76-a55788eee38b',
  'x-ms-keyvault-service-version',
  '1.1.0.882',
  'x-ms-keyvault-network-info',
  'addr=13.66.201.96;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 05 Nov 2019 03:44:29 GMT'
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
  '5ea28de1-7a83-452a-9689-9acc7dc70200',
  'x-ms-ests-server',
  '2.1.9624.12 - NCUS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AgRNzv5fnl5HgyGa900IZUc_aSJHCwAAAObmUtUOAAAA; expires=Thu, 05-Dec-2019 03:44:30 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; SameSite=None; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; SameSite=None; secure; HttpOnly',
  'Date',
  'Tue, 05 Nov 2019 03:44:29 GMT',
  'Content-Length',
  '1231'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/recoverCertificateName-canretrieveallversionsofacertificate-/')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/recoverCertificateName-canretrieveallversionsofacertificate-/c06925240ab24c5081813921228a529d","kid":"https://keyvault_name.vault.azure.net/keys/recoverCertificateName-canretrieveallversionsofacertificate-/c06925240ab24c5081813921228a529d","sid":"https://keyvault_name.vault.azure.net/secrets/recoverCertificateName-canretrieveallversionsofacertificate-/c06925240ab24c5081813921228a529d","x5t":"YrUwxEK2mm_NC6QxpYIq2oce2j4","cer":"MIIDKDCCAhCgAwIBAgIQPFD/GuBXT7W5Erm/laHqRjANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMTkxMTA1MDMzNDIxWhcNMjAxMTA1MDM0NDIxWjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQC01VShAscB6eKgb2K62W7nxOfrlUdFVEdnid+ff3QR9JISvLkZ0IFIdffplXWKKx8Pvkhj9PP/0vsi9IzWa4p6q02VrmYwVJzcJd6FcB1GIDXX99EMkWw13OeocRIAgVpO6OnKh7mI7FNF9+IITlxDh5P4K7/mTyPgWEjlGA5ESXPxvKAqMYcMel9bs/A+HV782FO5JzSlhPf9/vXDGnjQEs2oJmok6l0dmW5ZPPSCcukhBAWyIGXJh3GTKw+rD1d/IMkSqPOdKKauv9ztPxJcN07AYtECGbiyWnOsfc0vhXqbjxLrlCxCBxtBABsdrBKpY1KIwYvZXKOXHMGK41ZrAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBRulPsn2IqUoe1QfOW7El1OnJMKxDAdBgNVHQ4EFgQUbpT7J9iKlKHtUHzluxJdTpyTCsQwDQYJKoZIhvcNAQELBQADggEBAG54IvVYAYJzUn+b4Y43RcQVHcKAjFLecXvbBo6w0baoc+ByeMlJmCCWcP/OcWlHEsyX3o4BLLu29tsxDzntgmD7c7pwrse/BTZhqaDMobtF4rEl1JMxJGqejfmtxwbFjlN5FdhX04xHUd6l6ZzWQLhAoOABwFpzOek4NuhiZFultjve5/lgvkmIFR5+zRaobaietTKqKTcoN4Pwz9uYIbjbOdnju6anG7FLrKJP5sLPQ74SY2Ks25FSqntiAB6r0EJDuAiDt3cXwDDnNokCX7jCUkX7nHyvsGdXeMW1197+RL6MAMUfL4wnhnQ6Pt1RZPIapSiCU9n2sO7xzaTIsbE=","attributes":{"enabled":true,"nbf":1572924861,"exp":1604547861,"created":1572925461,"updated":1572925461,"recoveryLevel":"Recoverable+Purgeable"},"tags":{"tag":"tag03"},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/recoverCertificateName-canretrieveallversionsofacertificate-/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1572925415,"updated":1572925448}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/recoverCertificateName-canretrieveallversionsofacertificate-/pending"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'c828a59f-1ce0-425d-9476-2e91e81fba41',
  'x-ms-keyvault-service-version',
  '1.1.0.882',
  'x-ms-keyvault-network-info',
  'addr=13.66.201.96;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 05 Nov 2019 03:44:29 GMT',
  'Content-Length',
  '2617'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/recoverCertificateName-canretrieveallversionsofacertificate-/versions')
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
  'bd9d3791-db5f-41db-9658-70f45e83b046',
  'x-ms-keyvault-service-version',
  '1.1.0.882',
  'x-ms-keyvault-network-info',
  'addr=13.66.201.96;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 05 Nov 2019 03:44:29 GMT'
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
  'ce55cfc6-0c7e-48d3-8e1d-10a94bd50200',
  'x-ms-ests-server',
  '2.1.9624.12 - EUS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AgRNzv5fnl5HgyGa900IZUc_aSJHDAAAAObmUtUOAAAA; expires=Thu, 05-Dec-2019 03:44:30 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; SameSite=None; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; SameSite=None; secure; HttpOnly',
  'Date',
  'Tue, 05 Nov 2019 03:44:29 GMT',
  'Content-Length',
  '1231'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/recoverCertificateName-canretrieveallversionsofacertificate-/versions')
  .query(true)
  .reply(200, {"value":[{"id":"https://keyvault_name.vault.azure.net/certificates/recoverCertificateName-canretrieveallversionsofacertificate-/5a9471542c1c4e45af11e5b6a176f9d9","x5t":"9cYQJ9LJp40TYogwBzxFl71hOME","attributes":{"enabled":true,"nbf":1572924844,"exp":1604547844,"created":1572925444,"updated":1572925444},"tags":{"tag":"tag02"},"subject":""},{"id":"https://keyvault_name.vault.azure.net/certificates/recoverCertificateName-canretrieveallversionsofacertificate-/6253258c353e4020b00a65750ceadc97","x5t":"wR-VO5a4xI7LgZvR67bKRPYve5U","attributes":{"enabled":true,"nbf":1572924825,"exp":1604547825,"created":1572925425,"updated":1572925425},"tags":{"tag":"tag01"},"subject":""},{"id":"https://keyvault_name.vault.azure.net/certificates/recoverCertificateName-canretrieveallversionsofacertificate-/c06925240ab24c5081813921228a529d","x5t":"YrUwxEK2mm_NC6QxpYIq2oce2j4","attributes":{"enabled":true,"nbf":1572924861,"exp":1604547861,"created":1572925461,"updated":1572925461},"tags":{"tag":"tag03"},"subject":""}],"nextLink":null}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '698b1a0f-4d75-4ab5-82d3-24fff30def8b',
  'x-ms-keyvault-service-version',
  '1.1.0.882',
  'x-ms-keyvault-network-info',
  'addr=13.66.201.96;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 05 Nov 2019 03:44:30 GMT',
  'Content-Length',
  '1065'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/recoverCertificateName-canretrieveallversionsofacertificate-/5a9471542c1c4e45af11e5b6a176f9d9')
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
  '43c8c556-830e-4dd5-801b-3b98483aa7fe',
  'x-ms-keyvault-service-version',
  '1.1.0.882',
  'x-ms-keyvault-network-info',
  'addr=13.66.201.96;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 05 Nov 2019 03:44:30 GMT'
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
  '97dee561-7482-46ec-9911-209d7ca60200',
  'x-ms-ests-server',
  '2.1.9624.12 - NCUS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AgRNzv5fnl5HgyGa900IZUc_aSJHDQAAAObmUtUOAAAA; expires=Thu, 05-Dec-2019 03:44:30 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; SameSite=None; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; SameSite=None; secure; HttpOnly',
  'Date',
  'Tue, 05 Nov 2019 03:44:29 GMT',
  'Content-Length',
  '1231'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/recoverCertificateName-canretrieveallversionsofacertificate-/5a9471542c1c4e45af11e5b6a176f9d9')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/recoverCertificateName-canretrieveallversionsofacertificate-/5a9471542c1c4e45af11e5b6a176f9d9","kid":"https://keyvault_name.vault.azure.net/keys/recoverCertificateName-canretrieveallversionsofacertificate-/5a9471542c1c4e45af11e5b6a176f9d9","sid":"https://keyvault_name.vault.azure.net/secrets/recoverCertificateName-canretrieveallversionsofacertificate-/5a9471542c1c4e45af11e5b6a176f9d9","x5t":"9cYQJ9LJp40TYogwBzxFl71hOME","cer":"MIIDKDCCAhCgAwIBAgIQFgCCP9EqTHmIpn6SL9PovDANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMTkxMTA1MDMzNDA0WhcNMjAxMTA1MDM0NDA0WjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQCniZYOp1AeJh+HkqB1m4DcmPpTw7b6A9A1XAFRiPGEUqhOqTPbV0EeEZlBJykwc8HMc1w94zzXAtHkYiwkAmD7VM1QwaSwSaxlJx7ecn+izSCPyVqEFz6HgahDLmYCydYIazlal0xbuPjAkGAA8cBKN5QDHg/dqvsZZjddaMPBorQBwvvAybjRNVnHKBqflpMLs16KdyjM6OjlNW1KKezh1hPRq0wfsZszhU7j/I2DoKu9QsQkAGkcLhnKTuv+DepRPHdBst4oG9/QhdIcPfoyVlx2u7Z1lWm8l8DZJOlz4BEk8ZNR68li4SYIvnlJPcGpUYt9zmVu5VSq0Mj+ekSBAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBR9CCt1c43dEXSwsk5WlXj+RuDK1jAdBgNVHQ4EFgQUfQgrdXON3RF0sLJOVpV4/kbgytYwDQYJKoZIhvcNAQELBQADggEBAEgUUxuT6p93kbsI7PAg144HKERJvB8XfnNvCbeqkjUYGoXkPuX1BWew0Mir3LRkNHqa26mhJNgEGx5AEkMpzJKvNNElE47pQmlSmG8bgqm7kCqIGIcoWQoITJqGh5ErkLeU1S/O9Y7IeYSRSaDzl4C151T45QESMkBDkC6Te0R421xOj3/E9CddtmOhIKduaOR16Vzwgf72P3NpPRMOc1WIzJ7BQhR0kkWUZDSjV27VOxn3Vj1Y/xnA+nbUTKQeSE/K9OOM9Iq7nBEi+rCXPbHNdMmu28bGmh9RO3IpzRfhRxqAXMv6Mcxa+jAEDuOC7AbNXiLwEz+EoxBDkNHxY6w=","attributes":{"enabled":true,"nbf":1572924844,"exp":1604547844,"created":1572925444,"updated":1572925444,"recoveryLevel":"Recoverable+Purgeable"},"tags":{"tag":"tag02"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'ec087a1d-107e-4699-8957-dd38c33bbfda',
  'x-ms-keyvault-service-version',
  '1.1.0.882',
  'x-ms-keyvault-network-info',
  'addr=13.66.201.96;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 05 Nov 2019 03:44:30 GMT',
  'Content-Length',
  '1786'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/recoverCertificateName-canretrieveallversionsofacertificate-/6253258c353e4020b00a65750ceadc97')
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
  'c0f274c3-8074-4518-9de5-b5806edb2323',
  'x-ms-keyvault-service-version',
  '1.1.0.882',
  'x-ms-keyvault-network-info',
  'addr=13.66.201.96;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 05 Nov 2019 03:44:30 GMT'
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
  '4e48c6eb-119e-4dc1-b88d-0c67b02a0300',
  'x-ms-ests-server',
  '2.1.9624.12 - SCUS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AgRNzv5fnl5HgyGa900IZUc_aSJHDgAAAObmUtUOAAAA; expires=Thu, 05-Dec-2019 03:44:31 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; SameSite=None; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; SameSite=None; secure; HttpOnly',
  'Date',
  'Tue, 05 Nov 2019 03:44:30 GMT',
  'Content-Length',
  '1231'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/recoverCertificateName-canretrieveallversionsofacertificate-/6253258c353e4020b00a65750ceadc97')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/recoverCertificateName-canretrieveallversionsofacertificate-/6253258c353e4020b00a65750ceadc97","kid":"https://keyvault_name.vault.azure.net/keys/recoverCertificateName-canretrieveallversionsofacertificate-/6253258c353e4020b00a65750ceadc97","sid":"https://keyvault_name.vault.azure.net/secrets/recoverCertificateName-canretrieveallversionsofacertificate-/6253258c353e4020b00a65750ceadc97","x5t":"wR-VO5a4xI7LgZvR67bKRPYve5U","cer":"MIIDKDCCAhCgAwIBAgIQKFao4v0RS12ZulWPwwgmUDANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMTkxMTA1MDMzMzQ1WhcNMjAxMTA1MDM0MzQ1WjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQC3Oc0Iki5+0DIL168L+dla0NHF8/sFTSujyW0k1f6MwvA/xJIvIo4/Zu/UsT2AXcD7QvZswOELvwEcseF2nnYaTIAMzOhezE/w1QsOfK1DaSbE8jcYQP+Mpi6xNeMbSw6bt1kaQ5mfF+0ov/oHcmCx9xQ83bAqMCDZCcvMSfuKFIP46JdH0A9fPYAhfsZeTWSFW/eh6N2QiZFDQvlmwUmW8yqnK/NsCusGrvIIAD3CXfhkMnNisnPpTuYVX9wmpwhqr/XxrgiKttrM5If5tRk3tpTD+posKcb1u/hYTC9NLDshE3UQpJjWpTZVusGBQconik482l5XhynS79CZ+XnnAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBQZy3oW2Xw+eO7zhAowXVU1pUqnCDAdBgNVHQ4EFgQUGct6Ftl8Pnju84QKMF1VNaVKpwgwDQYJKoZIhvcNAQELBQADggEBAHpi1NTQ1NkMaLcjVJRWQU0MnMAhn/Mjd54Mq2t7aT+O72t5XYnMgHf1SgLPNzydLWUxWwl7EYhJ79PBqI4rL6TERrkmCdQT8NwgRX59o9MQlRtzAQGxVSxVMUrUoN1rcGtxJeywgLqx+dBSwKbcYEg3zAmzwjXVWh+9zPQZyHmf5iAkz4OHa0OKhcwVcoQY4st3Jh1aBu6fcbt+LEmR3ue5HZCL8VfrVpDL5o15W0DjcSatEn82I0YmlFSXCwMgdpHXLt0B8baoT3Pv8SrH5Qdz1p858JtLgW3WLlnO096sVnZGlKYPyFb4YtMqgUmxVWBev6j4HhLBN1LDjrmuxfI=","attributes":{"enabled":true,"nbf":1572924825,"exp":1604547825,"created":1572925425,"updated":1572925425,"recoveryLevel":"Recoverable+Purgeable"},"tags":{"tag":"tag01"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '0247ecf5-a274-462a-a804-5aef001aa2e5',
  'x-ms-keyvault-service-version',
  '1.1.0.882',
  'x-ms-keyvault-network-info',
  'addr=13.66.201.96;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 05 Nov 2019 03:44:30 GMT',
  'Content-Length',
  '1786'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/recoverCertificateName-canretrieveallversionsofacertificate-/c06925240ab24c5081813921228a529d')
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
  '7f236f50-fd03-497c-bc5b-77decde1e314',
  'x-ms-keyvault-service-version',
  '1.1.0.882',
  'x-ms-keyvault-network-info',
  'addr=13.66.201.96;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 05 Nov 2019 03:44:30 GMT'
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
  'd214f327-4825-4ad7-80c8-072148a30200',
  'x-ms-ests-server',
  '2.1.9645.6 - WUS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AgRNzv5fnl5HgyGa900IZUc_aSJHDwAAAObmUtUOAAAA; expires=Thu, 05-Dec-2019 03:44:31 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; SameSite=None; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; SameSite=None; secure; HttpOnly',
  'Date',
  'Tue, 05 Nov 2019 03:44:30 GMT',
  'Content-Length',
  '1231'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/recoverCertificateName-canretrieveallversionsofacertificate-/c06925240ab24c5081813921228a529d')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/recoverCertificateName-canretrieveallversionsofacertificate-/c06925240ab24c5081813921228a529d","kid":"https://keyvault_name.vault.azure.net/keys/recoverCertificateName-canretrieveallversionsofacertificate-/c06925240ab24c5081813921228a529d","sid":"https://keyvault_name.vault.azure.net/secrets/recoverCertificateName-canretrieveallversionsofacertificate-/c06925240ab24c5081813921228a529d","x5t":"YrUwxEK2mm_NC6QxpYIq2oce2j4","cer":"MIIDKDCCAhCgAwIBAgIQPFD/GuBXT7W5Erm/laHqRjANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMTkxMTA1MDMzNDIxWhcNMjAxMTA1MDM0NDIxWjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQC01VShAscB6eKgb2K62W7nxOfrlUdFVEdnid+ff3QR9JISvLkZ0IFIdffplXWKKx8Pvkhj9PP/0vsi9IzWa4p6q02VrmYwVJzcJd6FcB1GIDXX99EMkWw13OeocRIAgVpO6OnKh7mI7FNF9+IITlxDh5P4K7/mTyPgWEjlGA5ESXPxvKAqMYcMel9bs/A+HV782FO5JzSlhPf9/vXDGnjQEs2oJmok6l0dmW5ZPPSCcukhBAWyIGXJh3GTKw+rD1d/IMkSqPOdKKauv9ztPxJcN07AYtECGbiyWnOsfc0vhXqbjxLrlCxCBxtBABsdrBKpY1KIwYvZXKOXHMGK41ZrAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBRulPsn2IqUoe1QfOW7El1OnJMKxDAdBgNVHQ4EFgQUbpT7J9iKlKHtUHzluxJdTpyTCsQwDQYJKoZIhvcNAQELBQADggEBAG54IvVYAYJzUn+b4Y43RcQVHcKAjFLecXvbBo6w0baoc+ByeMlJmCCWcP/OcWlHEsyX3o4BLLu29tsxDzntgmD7c7pwrse/BTZhqaDMobtF4rEl1JMxJGqejfmtxwbFjlN5FdhX04xHUd6l6ZzWQLhAoOABwFpzOek4NuhiZFultjve5/lgvkmIFR5+zRaobaietTKqKTcoN4Pwz9uYIbjbOdnju6anG7FLrKJP5sLPQ74SY2Ks25FSqntiAB6r0EJDuAiDt3cXwDDnNokCX7jCUkX7nHyvsGdXeMW1197+RL6MAMUfL4wnhnQ6Pt1RZPIapSiCU9n2sO7xzaTIsbE=","attributes":{"enabled":true,"nbf":1572924861,"exp":1604547861,"created":1572925461,"updated":1572925461,"recoveryLevel":"Recoverable+Purgeable"},"tags":{"tag":"tag03"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '58a84b29-9e49-4dfa-9685-2ad1ef125efe',
  'x-ms-keyvault-service-version',
  '1.1.0.882',
  'x-ms-keyvault-network-info',
  'addr=13.66.201.96;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 05 Nov 2019 03:44:31 GMT',
  'Content-Length',
  '1786'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/certificates/recoverCertificateName-canretrieveallversionsofacertificate-')
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
  '61494375-3fb3-4d78-bfcf-7ed8cba605dc',
  'x-ms-keyvault-service-version',
  '1.1.0.882',
  'x-ms-keyvault-network-info',
  'addr=13.66.201.96;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 05 Nov 2019 03:44:31 GMT'
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
  'db719d79-baf8-49cf-ba99-317f88d40200',
  'x-ms-ests-server',
  '2.1.9624.12 - SCUS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AgRNzv5fnl5HgyGa900IZUc_aSJHEAAAAObmUtUOAAAA; expires=Thu, 05-Dec-2019 03:44:31 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; SameSite=None; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; SameSite=None; secure; HttpOnly',
  'Date',
  'Tue, 05 Nov 2019 03:44:30 GMT',
  'Content-Length',
  '1231'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/certificates/recoverCertificateName-canretrieveallversionsofacertificate-')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/recoverCertificateName-canretrieveallversionsofacertificate-","deletedDate":1572925471,"scheduledPurgeDate":1580701471,"id":"https://keyvault_name.vault.azure.net/certificates/recoverCertificateName-canretrieveallversionsofacertificate-/c06925240ab24c5081813921228a529d","kid":"https://keyvault_name.vault.azure.net/keys/recoverCertificateName-canretrieveallversionsofacertificate-/c06925240ab24c5081813921228a529d","sid":"https://keyvault_name.vault.azure.net/secrets/recoverCertificateName-canretrieveallversionsofacertificate-/c06925240ab24c5081813921228a529d","x5t":"YrUwxEK2mm_NC6QxpYIq2oce2j4","cer":"MIIDKDCCAhCgAwIBAgIQPFD/GuBXT7W5Erm/laHqRjANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMTkxMTA1MDMzNDIxWhcNMjAxMTA1MDM0NDIxWjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQC01VShAscB6eKgb2K62W7nxOfrlUdFVEdnid+ff3QR9JISvLkZ0IFIdffplXWKKx8Pvkhj9PP/0vsi9IzWa4p6q02VrmYwVJzcJd6FcB1GIDXX99EMkWw13OeocRIAgVpO6OnKh7mI7FNF9+IITlxDh5P4K7/mTyPgWEjlGA5ESXPxvKAqMYcMel9bs/A+HV782FO5JzSlhPf9/vXDGnjQEs2oJmok6l0dmW5ZPPSCcukhBAWyIGXJh3GTKw+rD1d/IMkSqPOdKKauv9ztPxJcN07AYtECGbiyWnOsfc0vhXqbjxLrlCxCBxtBABsdrBKpY1KIwYvZXKOXHMGK41ZrAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBRulPsn2IqUoe1QfOW7El1OnJMKxDAdBgNVHQ4EFgQUbpT7J9iKlKHtUHzluxJdTpyTCsQwDQYJKoZIhvcNAQELBQADggEBAG54IvVYAYJzUn+b4Y43RcQVHcKAjFLecXvbBo6w0baoc+ByeMlJmCCWcP/OcWlHEsyX3o4BLLu29tsxDzntgmD7c7pwrse/BTZhqaDMobtF4rEl1JMxJGqejfmtxwbFjlN5FdhX04xHUd6l6ZzWQLhAoOABwFpzOek4NuhiZFultjve5/lgvkmIFR5+zRaobaietTKqKTcoN4Pwz9uYIbjbOdnju6anG7FLrKJP5sLPQ74SY2Ks25FSqntiAB6r0EJDuAiDt3cXwDDnNokCX7jCUkX7nHyvsGdXeMW1197+RL6MAMUfL4wnhnQ6Pt1RZPIapSiCU9n2sO7xzaTIsbE=","attributes":{"enabled":true,"nbf":1572924861,"exp":1604547861,"created":1572925461,"updated":1572925461,"recoveryLevel":"Recoverable+Purgeable"},"tags":{"tag":"tag03"},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/recoverCertificateName-canretrieveallversionsofacertificate-/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1572925415,"updated":1572925448}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/recoverCertificateName-canretrieveallversionsofacertificate-/pending"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '8bc45a6e-ef03-4f7e-a376-efa6520ca36f',
  'x-ms-keyvault-service-version',
  '1.1.0.882',
  'x-ms-keyvault-network-info',
  'addr=13.66.201.96;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 05 Nov 2019 03:44:31 GMT',
  'Content-Length',
  '2822'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedcertificates/recoverCertificateName-canretrieveallversionsofacertificate-')
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
  'bc85b79c-5607-47bc-aec8-de67a3920580',
  'x-ms-keyvault-service-version',
  '1.1.0.882',
  'x-ms-keyvault-network-info',
  'addr=13.66.201.96;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 05 Nov 2019 03:44:31 GMT'
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
  '2c4f1f66-15cb-4e04-bc5e-5103563e0300',
  'x-ms-ests-server',
  '2.1.9624.12 - EUS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AgRNzv5fnl5HgyGa900IZUc_aSJHEQAAAObmUtUOAAAA; expires=Thu, 05-Dec-2019 03:44:32 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; SameSite=None; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; SameSite=None; secure; HttpOnly',
  'Date',
  'Tue, 05 Nov 2019 03:44:31 GMT',
  'Content-Length',
  '1231'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedcertificates/recoverCertificateName-canretrieveallversionsofacertificate-')
  .query(true)
  .reply(409, {"error":{"code":"Conflict","message":"Certificate is currently being deleted.","innererror":{"code":"ObjectIsBeingDeleted"}}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '126',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '6465ce31-ee60-4a2e-8baa-e7bfecee2707',
  'x-ms-keyvault-service-version',
  '1.1.0.882',
  'x-ms-keyvault-network-info',
  'addr=13.66.201.96;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 05 Nov 2019 03:44:31 GMT'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedcertificates/recoverCertificateName-canretrieveallversionsofacertificate-')
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
  '3c3caa9c-3e38-4dd2-85c7-f0a0ef64aefe',
  'x-ms-keyvault-service-version',
  '1.1.0.882',
  'x-ms-keyvault-network-info',
  'addr=13.66.201.96;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 05 Nov 2019 03:44:41 GMT'
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
  'db719d79-baf8-49cf-ba99-317f8dd50200',
  'x-ms-ests-server',
  '2.1.9624.12 - SCUS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AgRNzv5fnl5HgyGa900IZUc_aSJHEgAAAObmUtUOAAAA; expires=Thu, 05-Dec-2019 03:44:42 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; SameSite=None; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; SameSite=None; secure; HttpOnly',
  'Date',
  'Tue, 05 Nov 2019 03:44:42 GMT',
  'Content-Length',
  '1231'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedcertificates/recoverCertificateName-canretrieveallversionsofacertificate-')
  .query(true)
  .reply(409, {"error":{"code":"Conflict","message":"Certificate is currently being deleted.","innererror":{"code":"ObjectIsBeingDeleted"}}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '126',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '3572e63b-d63f-4fea-9888-a7f3832be2a5',
  'x-ms-keyvault-service-version',
  '1.1.0.882',
  'x-ms-keyvault-network-info',
  'addr=13.66.201.96;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 05 Nov 2019 03:44:41 GMT'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedcertificates/recoverCertificateName-canretrieveallversionsofacertificate-')
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
  'c636b478-de4f-413a-8a12-b2451a269165',
  'x-ms-keyvault-service-version',
  '1.1.0.882',
  'x-ms-keyvault-network-info',
  'addr=13.66.201.96;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 05 Nov 2019 03:44:52 GMT'
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
  '2c4f1f66-15cb-4e04-bc5e-510348400300',
  'x-ms-ests-server',
  '2.1.9624.12 - EUS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AgRNzv5fnl5HgyGa900IZUc_aSJHEwAAAObmUtUOAAAA; expires=Thu, 05-Dec-2019 03:44:52 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; SameSite=None; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; SameSite=None; secure; HttpOnly',
  'Date',
  'Tue, 05 Nov 2019 03:44:52 GMT',
  'Content-Length',
  '1231'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedcertificates/recoverCertificateName-canretrieveallversionsofacertificate-')
  .query(true)
  .reply(204, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '6d95efa4-071d-4708-a70a-dee99fef9d61',
  'x-ms-keyvault-service-version',
  '1.1.0.882',
  'x-ms-keyvault-network-info',
  'addr=13.66.201.96;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 05 Nov 2019 03:44:53 GMT'
]);


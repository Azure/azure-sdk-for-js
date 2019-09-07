let nock = require('nock');

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/certificates/recoverCertificateName-canretrieveallversionsofacertificate-/create')
  .query(true)
  .reply(401, {"error":{"code":"Unauthorized","message":"Request is missing a Bearer or PoP token."}}, [ 'Cache-Control',
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
<<<<<<< HEAD
  '0db1fd70-c730-4195-a1fb-3b4a57b4806d',
=======
  '3bb5cec2-50ad-4b87-910c-bce221a52ea2',
>>>>>>> [KeyVault-Certificates] Tweaks to the tests
  'x-ms-keyvault-service-version',
  '1.1.0.878',
  'x-ms-keyvault-network-info',
<<<<<<< HEAD
  'addr=168.62.167.138;act_addr_fam=InterNetwork;',
=======
  'addr=13.92.153.51;act_addr_fam=InterNetwork;',
>>>>>>> [KeyVault-Certificates] Tweaks to the tests
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
<<<<<<< HEAD
  'Fri, 06 Sep 2019 15:14:53 GMT',
=======
  'Sat, 07 Sep 2019 17:36:32 GMT',
>>>>>>> [KeyVault-Certificates] Tweaks to the tests
  'Connection',
  'close' ]);


nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fvault.azure.net%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":3599,"ext_expires_in":3599,"access_token":"access_token"}, [ 'Cache-Control',
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
<<<<<<< HEAD
  'd71c972d-9203-499e-b8a6-fd7431bc1c00',
  'x-ms-ests-server',
  '2.1.9338.12 - NCUS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=Ai3DWwGkAfhKj7K29rKtOVw_aSJHAQAAAO1uBNUOAAAA; expires=Sun, 06-Oct-2019 15:14:53 GMT; path=/; secure; HttpOnly',
=======
  'bd2e8baa-505c-43e7-950b-f949d9e44600',
  'x-ms-ests-server',
  '2.1.9338.12 - EUS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AjE6WoYjDUNDqrpNVeQGtYU_aSJHAQAAAKDhBdUOAAAA; expires=Mon, 07-Oct-2019 17:36:33 GMT; path=/; secure; HttpOnly',
>>>>>>> [KeyVault-Certificates] Tweaks to the tests
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; HttpOnly',
  'Date',
<<<<<<< HEAD
  'Fri, 06 Sep 2019 15:14:52 GMT',
=======
  'Sat, 07 Sep 2019 17:36:32 GMT',
>>>>>>> [KeyVault-Certificates] Tweaks to the tests
  'Connection',
  'close',
  'Content-Length',
  '1231' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/certificates/recoverCertificateName-canretrieveallversionsofacertificate-/create', {"policy":{"x509_props":{"subject":"cn=MyCert"},"issuer":{"name":"Self"}},"attributes":{"enabled":true},"tags":{"tag":"tag01"}})
  .query(true)
<<<<<<< HEAD
  .reply(202, {"id":"https://keyvault_name.vault.azure.net/certificates/recoverCertificateName-canretrieveallversionsofacertificate-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAqFdWROG61HFCPsEy47fVnmiBVMlvdpssz9nD3Rc0FpJgXVa5RHor8vSQ17a4htWcwjdHX6cFjN+DqmTht7Kb7g0MKy03xtWGv8mQtVgAUQI/1PACNA5UWIFMAjqtKhtx1SHLkUPFhjxDqs+6bANEZepmBuCDmCX7T3bGq7xaS6RLokNXPOboJDS+vEMD+Xx/JCig0hG9iqvBAVBUiBsEpVmPf3Fz/VuGOL5BmxeErmgg8fkNkbBYrJuD/FohVJEidUr12vsOi0EPCugnZCbf0yNDGhYKNt1QAgeY+RDH/o0W1zHDU9DFiw2giQUzdthgv5/AWzN5iB/aNbVGaCcJQwIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBADaB6jr1rHJqxz+zXlcw4DxioKJzO+i2Q0d1SByWJ+VV19AdCpiKQ+UqLNPmOwMH5+T1R+aPFxq4v20M8hJC/IOY/pyWmx1DT3QfvYnqZJ9fChoV5maJFUSNJlNvOJTTPex1DxNHAK6fUxdTh/jOG8N6WE1ZbSzoXuAQifsXeVKclKz8vJSZ50dlMykJooKjmxnc5IsMm7lVFpfL49gsvRNKXgueGJt9rMm3h92O0r23wLFlpMIp3pwW1pjSnD5h+xPU6aaKv3ODHYQbvUegx06f5GD4SlZ2SV22ntu5+mpHyAiJo6mmcuhtBORymVj/orzSES2frlmXrwYLKyvUdsE=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"d8b7e5180dfd40bcae67ea655e0c1b32"}, [ 'Cache-Control',
=======
  .reply(202, {"id":"https://keyvault_name.vault.azure.net/certificates/recoverCertificateName-canretrieveallversionsofacertificate-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAuhDpLp8/mudVH664vmD3xLe5DvD36+226K9/9BsPAiz8Yu+l2RnkPmwbr3g7TRdyF/aEw/qKmkqW6QxEJ12qY101cg/6WCN3VTyJe51h/tOG8Y1gmWCynFTPrr47ShO66NzwOAFKyMI5x8ASlR9WjYE167Soy0K0nJ4D2eh8DAJMMe8avaWNhFwzndRK9eyJb4Mlt7Xwlwln77lMXlL80xu+2RQjIPwKM8/E2Yv27lxNnevzoujRoMSJRI43o3GjleKzPt+eqCcgOjFjaNkHq4SLH6heXRRZRjVpTZelhU5ywBhirKALMzn9rOmmLUnyxN9nsm+n06+hN44HZDB2SQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAI0xu1T3cEM9NulxmqZaGe/8bES1zTZvb5+GSV1YfK4alNQTDxmihfAY+1cPEqoXj2IePGuWqr1KtaZq0Pw+r00MPOXG1bpsbsSkV7R5W41e3AGsYqds2ZxRdSIGTVoyebLcE+ugpxz5gsPvY/qkh1tT27u9V+hb4YKBsV8c90AMg1ne/d5al1Ks7iPWbbN8qjY/v8QQahI3IqYe6BKvXj88v0nRnll8T6oqxyKSJSIXJ2blX2BrL5zvTUbuYshTkjTmKmRyfK07UGfpRh1PR071KTux6NL9IsscN+IkXdsrXbC1OOskYFHZPu+qA2XRHBUuPtE0tspGPV9FNzCt9zg=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"29dcda56c14f4eb58eff81b967231f08"}, [ 'Cache-Control',
>>>>>>> [KeyVault-Certificates] Tweaks to the tests
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
<<<<<<< HEAD
  'https://keyvault_name.vault.azure.net/certificates/recoverCertificateName-canretrieveallversionsofacertificate-/pending?api-version=7.0&request_id=d8b7e5180dfd40bcae67ea655e0c1b32',
=======
  'https://keyvault_name.vault.azure.net/certificates/recoverCertificateName-canretrieveallversionsofacertificate-/pending?api-version=7.0&request_id=29dcda56c14f4eb58eff81b967231f08',
>>>>>>> [KeyVault-Certificates] Tweaks to the tests
  'Retry-After',
  '10',
  'Server',
  'Microsoft-IIS/10.0',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
<<<<<<< HEAD
  '1a305b1d-37cf-4621-8f56-0c984f1b7551',
=======
  '2821af0b-9485-40f1-8dac-c77198e113e8',
>>>>>>> [KeyVault-Certificates] Tweaks to the tests
  'x-ms-keyvault-service-version',
  '1.1.0.878',
  'x-ms-keyvault-network-info',
<<<<<<< HEAD
  'addr=168.62.167.138;act_addr_fam=InterNetwork;',
=======
  'addr=13.92.153.51;act_addr_fam=InterNetwork;',
>>>>>>> [KeyVault-Certificates] Tweaks to the tests
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
<<<<<<< HEAD
  'Fri, 06 Sep 2019 15:14:54 GMT',
=======
  'Sat, 07 Sep 2019 17:36:33 GMT',
>>>>>>> [KeyVault-Certificates] Tweaks to the tests
  'Connection',
  'close',
  'Content-Length',
  '1345' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/recoverCertificateName-canretrieveallversionsofacertificate-/')
  .query(true)
  .reply(401, {"error":{"code":"Unauthorized","message":"Request is missing a Bearer or PoP token."}}, [ 'Cache-Control',
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
<<<<<<< HEAD
  '4595bd26-a22d-4f3a-a43b-8e3200b71bd5',
=======
  '0e574a10-99c3-44d1-bbff-aae69e401e8f',
>>>>>>> [KeyVault-Certificates] Tweaks to the tests
  'x-ms-keyvault-service-version',
  '1.1.0.878',
  'x-ms-keyvault-network-info',
<<<<<<< HEAD
  'addr=168.62.167.138;act_addr_fam=InterNetwork;',
=======
  'addr=13.92.153.51;act_addr_fam=InterNetwork;',
>>>>>>> [KeyVault-Certificates] Tweaks to the tests
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
<<<<<<< HEAD
  'Fri, 06 Sep 2019 15:14:54 GMT',
=======
  'Sat, 07 Sep 2019 17:36:33 GMT',
>>>>>>> [KeyVault-Certificates] Tweaks to the tests
  'Connection',
  'close' ]);


nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fvault.azure.net%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":3599,"ext_expires_in":3599,"access_token":"access_token"}, [ 'Cache-Control',
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
<<<<<<< HEAD
  '84e6c1d5-dbb6-405b-a6b9-75f7b8f61c00',
  'x-ms-ests-server',
  '2.1.9338.12 - SCUS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=Ai3DWwGkAfhKj7K29rKtOVw_aSJHAgAAAO1uBNUOAAAA; expires=Sun, 06-Oct-2019 15:14:55 GMT; path=/; secure; HttpOnly',
=======
  '314e5464-9629-40ef-b9fc-4579b7f64c00',
  'x-ms-ests-server',
  '2.1.9338.12 - WUS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AjE6WoYjDUNDqrpNVeQGtYU_aSJHAgAAAKDhBdUOAAAA; expires=Mon, 07-Oct-2019 17:36:34 GMT; path=/; secure; HttpOnly',
>>>>>>> [KeyVault-Certificates] Tweaks to the tests
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; HttpOnly',
  'Date',
<<<<<<< HEAD
  'Fri, 06 Sep 2019 15:14:54 GMT',
=======
  'Sat, 07 Sep 2019 17:36:33 GMT',
>>>>>>> [KeyVault-Certificates] Tweaks to the tests
  'Connection',
  'close',
  'Content-Length',
  '1231' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/recoverCertificateName-canretrieveallversionsofacertificate-/')
  .query(true)
<<<<<<< HEAD
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/recoverCertificateName-canretrieveallversionsofacertificate-/aa768d2466bf4434b5180809786c90f8","attributes":{"enabled":false,"nbf":1567782294,"exp":1599405294,"created":1567782894,"updated":1567782894,"recoveryLevel":"Recoverable+Purgeable"},"tags":{"tag":"tag01"},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/recoverCertificateName-canretrieveallversionsofacertificate-/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1567782894,"updated":1567782894}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/recoverCertificateName-canretrieveallversionsofacertificate-/pending"}}, [ 'Cache-Control',
=======
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/recoverCertificateName-canretrieveallversionsofacertificate-/8ba2a337c1f3477899b0e9aca9b0f611","attributes":{"enabled":false,"nbf":1567877193,"exp":1599500193,"created":1567877793,"updated":1567877793,"recoveryLevel":"Recoverable+Purgeable"},"tags":{"tag":"tag01"},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/recoverCertificateName-canretrieveallversionsofacertificate-/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1567877793,"updated":1567877793}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/recoverCertificateName-canretrieveallversionsofacertificate-/pending"}}, [ 'Cache-Control',
>>>>>>> [KeyVault-Certificates] Tweaks to the tests
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
<<<<<<< HEAD
  '81b84946-5cc3-4506-8b02-2f7acd62c838',
=======
  'bdd162d5-11ce-4053-8199-60435b6d128a',
>>>>>>> [KeyVault-Certificates] Tweaks to the tests
  'x-ms-keyvault-service-version',
  '1.1.0.878',
  'x-ms-keyvault-network-info',
<<<<<<< HEAD
  'addr=168.62.167.138;act_addr_fam=InterNetwork;',
=======
  'addr=13.92.153.51;act_addr_fam=InterNetwork;',
>>>>>>> [KeyVault-Certificates] Tweaks to the tests
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
<<<<<<< HEAD
  'Fri, 06 Sep 2019 15:14:55 GMT',
=======
  'Sat, 07 Sep 2019 17:36:34 GMT',
>>>>>>> [KeyVault-Certificates] Tweaks to the tests
  'Connection',
  'close',
  'Content-Length',
  '1158' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/certificates/recoverCertificateName-canretrieveallversionsofacertificate-/create')
  .query(true)
  .reply(401, {"error":{"code":"Unauthorized","message":"Request is missing a Bearer or PoP token."}}, [ 'Cache-Control',
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
<<<<<<< HEAD
  'a96fa24c-cc6a-49f9-ad5a-212f984cc8a7',
=======
  '65986b2f-68f4-4936-b774-9925b51d3da3',
>>>>>>> [KeyVault-Certificates] Tweaks to the tests
  'x-ms-keyvault-service-version',
  '1.1.0.878',
  'x-ms-keyvault-network-info',
<<<<<<< HEAD
  'addr=168.62.167.138;act_addr_fam=InterNetwork;',
=======
  'addr=13.92.153.51;act_addr_fam=InterNetwork;',
>>>>>>> [KeyVault-Certificates] Tweaks to the tests
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
<<<<<<< HEAD
  'Fri, 06 Sep 2019 15:14:55 GMT',
=======
  'Sat, 07 Sep 2019 17:36:34 GMT',
>>>>>>> [KeyVault-Certificates] Tweaks to the tests
  'Connection',
  'close' ]);


nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fvault.azure.net%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":3600,"ext_expires_in":3600,"access_token":"access_token"}, [ 'Cache-Control',
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
<<<<<<< HEAD
  '0f358fcd-6f93-4e2f-8732-43f95b371b00',
  'x-ms-ests-server',
  '2.1.9338.12 - SCUS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=Ai3DWwGkAfhKj7K29rKtOVw_aSJHAwAAAO1uBNUOAAAA; expires=Sun, 06-Oct-2019 15:14:56 GMT; path=/; secure; HttpOnly',
=======
  '1cd1d2bd-543c-4f00-a159-7b4c60404800',
  'x-ms-ests-server',
  '2.1.9338.12 - WUS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AjE6WoYjDUNDqrpNVeQGtYU_aSJHAwAAAKDhBdUOAAAA; expires=Mon, 07-Oct-2019 17:36:35 GMT; path=/; secure; HttpOnly',
>>>>>>> [KeyVault-Certificates] Tweaks to the tests
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; HttpOnly',
  'Date',
<<<<<<< HEAD
  'Fri, 06 Sep 2019 15:14:55 GMT',
=======
  'Sat, 07 Sep 2019 17:36:34 GMT',
>>>>>>> [KeyVault-Certificates] Tweaks to the tests
  'Connection',
  'close',
  'Content-Length',
  '1231' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/certificates/recoverCertificateName-canretrieveallversionsofacertificate-/create', {"policy":{"x509_props":{"subject":"cn=MyCert"},"issuer":{"name":"Self"}},"attributes":{"enabled":true},"tags":{"tag":"tag02"}})
  .query(true)
  .reply(409, {"error":{"code":"Conflict","message":"A new key vault certificate can not be created or imported while a pending key vault certificate's status is inProgress."}}, [ 'Cache-Control',
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
<<<<<<< HEAD
  'e2b2a21b-69e1-47ed-8640-f0838d535865',
=======
  '4495db67-a584-4f2b-862e-9829e826692e',
>>>>>>> [KeyVault-Certificates] Tweaks to the tests
  'x-ms-keyvault-service-version',
  '1.1.0.878',
  'x-ms-keyvault-network-info',
<<<<<<< HEAD
  'addr=168.62.167.138;act_addr_fam=InterNetwork;',
=======
  'addr=13.92.153.51;act_addr_fam=InterNetwork;',
>>>>>>> [KeyVault-Certificates] Tweaks to the tests
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
<<<<<<< HEAD
  'Fri, 06 Sep 2019 15:14:55 GMT',
=======
  'Sat, 07 Sep 2019 17:36:35 GMT',
>>>>>>> [KeyVault-Certificates] Tweaks to the tests
  'Connection',
  'close' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/certificates/recoverCertificateName-canretrieveallversionsofacertificate-/create')
  .query(true)
  .reply(401, {"error":{"code":"Unauthorized","message":"Request is missing a Bearer or PoP token."}}, [ 'Cache-Control',
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
<<<<<<< HEAD
  'c5dd9079-bf46-4244-94c6-ccbb756fa734',
=======
  '63dcae7a-cd6d-4da3-a55b-a2c4a5a3f392',
>>>>>>> [KeyVault-Certificates] Tweaks to the tests
  'x-ms-keyvault-service-version',
  '1.1.0.878',
  'x-ms-keyvault-network-info',
<<<<<<< HEAD
  'addr=168.62.167.138;act_addr_fam=InterNetwork;',
=======
  'addr=13.92.153.51;act_addr_fam=InterNetwork;',
>>>>>>> [KeyVault-Certificates] Tweaks to the tests
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
<<<<<<< HEAD
  'Fri, 06 Sep 2019 15:15:06 GMT',
=======
  'Sat, 07 Sep 2019 17:36:46 GMT',
>>>>>>> [KeyVault-Certificates] Tweaks to the tests
  'Connection',
  'close' ]);


nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fvault.azure.net%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":3600,"ext_expires_in":3600,"access_token":"access_token"}, [ 'Cache-Control',
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
<<<<<<< HEAD
  '931d470e-fe97-4136-853d-a24f2fdb1e00',
  'x-ms-ests-server',
  '2.1.9338.12 - EUS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=Ai3DWwGkAfhKj7K29rKtOVw_aSJHBAAAAO1uBNUOAAAA; expires=Sun, 06-Oct-2019 15:15:06 GMT; path=/; secure; HttpOnly',
=======
  'b191b1e5-ce64-4af2-b363-b7020b6e4500',
  'x-ms-ests-server',
  '2.1.9338.12 - NCUS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AjE6WoYjDUNDqrpNVeQGtYU_aSJHBAAAAKDhBdUOAAAA; expires=Mon, 07-Oct-2019 17:36:46 GMT; path=/; secure; HttpOnly',
>>>>>>> [KeyVault-Certificates] Tweaks to the tests
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; HttpOnly',
  'Date',
<<<<<<< HEAD
  'Fri, 06 Sep 2019 15:15:06 GMT',
=======
  'Sat, 07 Sep 2019 17:36:46 GMT',
>>>>>>> [KeyVault-Certificates] Tweaks to the tests
  'Connection',
  'close',
  'Content-Length',
  '1231' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/certificates/recoverCertificateName-canretrieveallversionsofacertificate-/create', {"policy":{"x509_props":{"subject":"cn=MyCert"},"issuer":{"name":"Self"}},"attributes":{"enabled":true},"tags":{"tag":"tag02"}})
  .query(true)
<<<<<<< HEAD
  .reply(409, {"error":{"code":"Conflict","message":"A new key vault certificate can not be created or imported while a pending key vault certificate's status is inProgress."}}, [ 'Cache-Control',
=======
  .reply(202, {"id":"https://keyvault_name.vault.azure.net/certificates/recoverCertificateName-canretrieveallversionsofacertificate-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAqPDza/Q4DAMQUoC7ryEoGATmelJ70+9aYIjbyoongkCLlaS0539rzHpMrwiboDLwpFi4v83imIjljofcP8RQXspDNuFb17kXFe1V6rBIPu8fNchY1d1qEyXILW6pDL52i4zYPhFMx2hMM5mYL6L2UzpWYcK54HtCWh5bogFjHhe2YKTkismOobWJT9fo0wgCK5sT7tZqMIbYvKYt4x56AzLL7kVOJRfv8j0GuPdjQSDuLNHRq7adNYIlRfQD2lsVQNr8ZZAtNmkHrqVXgPm9LQeAeTSX2AK4BWYOqMzh20FrnyDmgVx5YC1zsCYgq22EOKyELDq/Uk08Z1f8iea/0QIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAI9Y1Brg6WLS83RAOk51Z7MVfGYov2DgTRD+6tSHJNrFzpTF+HDULnAZKSLWyiQj7xIlTssKOe9i0WVmouYwpQwFmjiQKpo0nEqHVABNfkC0pYOHk4zUGM4Fx6Z9b1kfRtEE7deshDDLR5zfObOEDMQpout2MrgXMleNXIaOgk4wdSEWJYmF5LUkYMmlQQ66/QZ4SG+s40EPSHK7pSkXSlYcaq+e07xESugkK798HGRcFqsfKbyu244pgoSumF4myQMZRnEh43QLeM1Vi+kjnOUipar9WZlQZq/bHnjkDHsyXoCORwMoQwrIb/TLpu5J/VP1eAID69CnUmagclExKdY=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"6d0209521fc74a1ea08bd870cf76f915"}, [ 'Cache-Control',
>>>>>>> [KeyVault-Certificates] Tweaks to the tests
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '162',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
<<<<<<< HEAD
=======
  'Location',
  'https://keyvault_name.vault.azure.net/certificates/recoverCertificateName-canretrieveallversionsofacertificate-/pending?api-version=7.0&request_id=6d0209521fc74a1ea08bd870cf76f915',
  'Retry-After',
  '10',
>>>>>>> [KeyVault-Certificates] Tweaks to the tests
  'Server',
  'Microsoft-IIS/10.0',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
<<<<<<< HEAD
  '3288801b-1c4c-498f-bbc5-1e5f8e7b7436',
=======
  '1e370a69-8927-4be8-aa73-f25c55d49050',
>>>>>>> [KeyVault-Certificates] Tweaks to the tests
  'x-ms-keyvault-service-version',
  '1.1.0.878',
  'x-ms-keyvault-network-info',
<<<<<<< HEAD
  'addr=168.62.167.138;act_addr_fam=InterNetwork;',
=======
  'addr=13.92.153.51;act_addr_fam=InterNetwork;',
>>>>>>> [KeyVault-Certificates] Tweaks to the tests
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
<<<<<<< HEAD
  'Fri, 06 Sep 2019 15:15:06 GMT',
  'Connection',
  'close' ]);
=======
  'Sat, 07 Sep 2019 17:36:47 GMT',
  'Connection',
  'close',
  'Content-Length',
  '1345' ]);
>>>>>>> [KeyVault-Certificates] Tweaks to the tests


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/certificates/recoverCertificateName-canretrieveallversionsofacertificate-/create')
  .query(true)
  .reply(401, {"error":{"code":"Unauthorized","message":"Request is missing a Bearer or PoP token."}}, [ 'Cache-Control',
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
<<<<<<< HEAD
  'f2f814eb-b855-4fb3-82a0-ff9b98136d95',
=======
  '18bf633b-3740-4e57-99c0-fa36b74babf9',
>>>>>>> [KeyVault-Certificates] Tweaks to the tests
  'x-ms-keyvault-service-version',
  '1.1.0.878',
  'x-ms-keyvault-network-info',
<<<<<<< HEAD
  'addr=168.62.167.138;act_addr_fam=InterNetwork;',
=======
  'addr=13.92.153.51;act_addr_fam=InterNetwork;',
>>>>>>> [KeyVault-Certificates] Tweaks to the tests
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
<<<<<<< HEAD
  'Fri, 06 Sep 2019 15:15:17 GMT',
=======
  'Sat, 07 Sep 2019 17:36:47 GMT',
>>>>>>> [KeyVault-Certificates] Tweaks to the tests
  'Connection',
  'close' ]);


nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fvault.azure.net%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":3599,"ext_expires_in":3599,"access_token":"access_token"}, [ 'Cache-Control',
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
<<<<<<< HEAD
  '8afc129c-0bdf-4fe2-8022-ba11a3921e00',
  'x-ms-ests-server',
  '2.1.9338.12 - SCUS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=Ai3DWwGkAfhKj7K29rKtOVw_aSJHBQAAAO1uBNUOAAAA; expires=Sun, 06-Oct-2019 15:15:17 GMT; path=/; secure; HttpOnly',
=======
  '7b6c70cf-3af1-47e7-9ad1-a5b610df4800',
  'x-ms-ests-server',
  '2.1.9338.12 - NCUS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AjE6WoYjDUNDqrpNVeQGtYU_aSJHBQAAAKDhBdUOAAAA; expires=Mon, 07-Oct-2019 17:36:47 GMT; path=/; secure; HttpOnly',
>>>>>>> [KeyVault-Certificates] Tweaks to the tests
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; HttpOnly',
  'Date',
<<<<<<< HEAD
  'Fri, 06 Sep 2019 15:15:17 GMT',
=======
  'Sat, 07 Sep 2019 17:36:47 GMT',
>>>>>>> [KeyVault-Certificates] Tweaks to the tests
  'Connection',
  'close',
  'Content-Length',
  '1231' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/certificates/recoverCertificateName-canretrieveallversionsofacertificate-/create', {"policy":{"x509_props":{"subject":"cn=MyCert"},"issuer":{"name":"Self"}},"attributes":{"enabled":true},"tags":{"tag":"tag02"}})
  .query(true)
<<<<<<< HEAD
  .reply(202, {"id":"https://keyvault_name.vault.azure.net/certificates/recoverCertificateName-canretrieveallversionsofacertificate-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEApRZ2RD4jHv2FYUzdRtzoIeMBBqiuqkjm5XwdeeoyeIu0UyM+k5ehqxujTw1XPuoVFqRcR2dcBOU6UdtJpb1IQlMSDFjYyuRKloLbCm044btjyW5Bn8gpYsCIbuS6eY9qUALASUwlKxNuHOt891hHMMqMv+R3+cyyv3vN4n9cElpf5/pCEWtpeaxlAgAFzGA28aKQHeL7Pz3MqffPRClEjmvYt46Gb1wUhy1esa2LcOVfBBcGZQz+tslZ8Ffoa6Hk32W/ufqxYbR14f/Lmka0DrYzdH1L58nQyxRm21GDNQO3B7bx+6owgY+qTjuXiKYLAqA7gBtPg5zGpTTFU58RiwIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAJlK+tHADuxX+T83we5KbHdyOcnBeIOsx+nb+9Ho10bMPHaRI2q2rC/HOMmoSqxkkm+9EhPvuq0bLrRHGI2vPerHzFuhZC0VGDEX/nU3RNRAIMT1bVArvCCUhnGQvicHF4jU285A4Y5tdKshFXXF2Ec0CACg0A/qGAOWKUq+EjU3Nyz8Wt8n3Pv3PmJGlX29yXCkPLbQaqnYuP97ZZUuu54WEVUHc7F1iPt0zqydBVm3TXgKCtTVp4FRbK2bZKtzHd+zK1wQUIsenjWN5Z3kxY6twQmQ4wZrk48Gc1begu1SqS0KPRfUPMQYTZ+qWk0Fz5wpggCIkdQa1pVle+sMEps=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"89459098897643559f62bfab39b8523b"}, [ 'Cache-Control',
=======
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/recoverCertificateName-canretrieveallversionsofacertificate-/633a490cddf14e808d27bff7844e15e2","kid":"https://keyvault_name.vault.azure.net/keys/recoverCertificateName-canretrieveallversionsofacertificate-/633a490cddf14e808d27bff7844e15e2","sid":"https://keyvault_name.vault.azure.net/secrets/recoverCertificateName-canretrieveallversionsofacertificate-/633a490cddf14e808d27bff7844e15e2","x5t":"6CJ9nrwFYhIX51B8QWy-8eYPpGE","cer":"MIIDKDCCAhCgAwIBAgIQDWA9fXr2RQe4zHlJhoZ+HzANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMTkwOTA3MTcyNjM4WhcNMjAwOTA3MTczNjM4WjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQC6EOkunz+a51Ufrri+YPfEt7kO8Pfr7bbor3/0Gw8CLPxi76XZGeQ+bBuveDtNF3IX9oTD+oqaSpbpDEQnXapjXTVyD/pYI3dVPIl7nWH+04bxjWCZYLKcVM+uvjtKE7ro3PA4AUrIwjnHwBKVH1aNgTXrtKjLQrScngPZ6HwMAkwx7xq9pY2EXDOd1Er17IlvgyW3tfCXCWfvuUxeUvzTG77ZFCMg/Aozz8TZi/buXE2d6/Oi6NGgxIlEjjejcaOV4rM+356oJyA6MWNo2QerhIsfqF5dFFlGNWlNl6WFTnLAGGKsoAszOf2s6aYtSfLE32eyb6fTr6E3jgdkMHZJAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBQVVX+d2YJq6XwW780OEbNmT0ULCzAdBgNVHQ4EFgQUFVV/ndmCaul8Fu/NDhGzZk9FCwswDQYJKoZIhvcNAQELBQADggEBAJMJjyFaQzqMmN2cqZFDt1rJk74OsGahLP8VXK1t/y8dW2nACdX9IPmluZFFxPz1AnoG85ab6cMkzaM2yB7fwUjg1lUqgntgreMGWU+66ifbQ5lRQhignAHTdPwi6yMlTKlXkkC/Kxwdsh1a2KRgd4hid2FrFHq4jj/npX+W5lgLBTwvyQ9y3evr5Ynncz+LhzjdKJo93u8e8VEEO4sPqhf8y6SSR7np5oZhOKezS+GW8Kp5a5fV5AMWqm0blVqoRngrigWozYNaWpQ3mhPZU4V/BCtPhYavXI+ek2Qp+9syigYJSqk3DO5teZUyIEysgDsilk7eL1JQlsFQEXKSZW8=","attributes":{"enabled":true,"nbf":1567877198,"exp":1599500198,"created":1567877798,"updated":1567877798,"recoveryLevel":"Recoverable+Purgeable"},"tags":{"tag":"tag01"},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/recoverCertificateName-canretrieveallversionsofacertificate-/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1567877793,"updated":1567877806}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/recoverCertificateName-canretrieveallversionsofacertificate-/pending"}}, [ 'Cache-Control',
>>>>>>> [KeyVault-Certificates] Tweaks to the tests
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://keyvault_name.vault.azure.net/certificates/recoverCertificateName-canretrieveallversionsofacertificate-/pending?api-version=7.0&request_id=89459098897643559f62bfab39b8523b',
  'Retry-After',
  '10',
  'Server',
  'Microsoft-IIS/10.0',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
<<<<<<< HEAD
  '6c828c5a-1253-4f93-9a82-d26cc3eafb5b',
=======
  'ede20285-fd66-4400-b1da-b58cebd4e8b6',
>>>>>>> [KeyVault-Certificates] Tweaks to the tests
  'x-ms-keyvault-service-version',
  '1.1.0.878',
  'x-ms-keyvault-network-info',
<<<<<<< HEAD
  'addr=168.62.167.138;act_addr_fam=InterNetwork;',
=======
  'addr=13.92.153.51;act_addr_fam=InterNetwork;',
>>>>>>> [KeyVault-Certificates] Tweaks to the tests
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
<<<<<<< HEAD
  'Fri, 06 Sep 2019 15:15:18 GMT',
  'Connection',
  'close',
  'Content-Length',
  '1345' ]);
=======
  'Sat, 07 Sep 2019 17:36:47 GMT',
  'Connection',
  'close',
  'Content-Length',
  '2607' ]);
>>>>>>> [KeyVault-Certificates] Tweaks to the tests


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/recoverCertificateName-canretrieveallversionsofacertificate-/')
  .query(true)
  .reply(401, {"error":{"code":"Unauthorized","message":"Request is missing a Bearer or PoP token."}}, [ 'Cache-Control',
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
<<<<<<< HEAD
  '72261503-6a1a-4331-942d-9f1a4c2c3450',
=======
  '0e9e15a9-b966-47d2-b4e6-564c06d7bc7c',
>>>>>>> [KeyVault-Certificates] Tweaks to the tests
  'x-ms-keyvault-service-version',
  '1.1.0.878',
  'x-ms-keyvault-network-info',
<<<<<<< HEAD
  'addr=168.62.167.138;act_addr_fam=InterNetwork;',
=======
  'addr=13.92.153.51;act_addr_fam=InterNetwork;',
>>>>>>> [KeyVault-Certificates] Tweaks to the tests
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
<<<<<<< HEAD
  'Fri, 06 Sep 2019 15:15:18 GMT',
=======
  'Sat, 07 Sep 2019 17:36:57 GMT',
>>>>>>> [KeyVault-Certificates] Tweaks to the tests
  'Connection',
  'close' ]);


nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fvault.azure.net%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":3599,"ext_expires_in":3599,"access_token":"access_token"}, [ 'Cache-Control',
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
<<<<<<< HEAD
  'e810cd0a-b2b8-4456-8c0d-0aaf8ff01f00',
  'x-ms-ests-server',
  '2.1.9338.12 - EUS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=Ai3DWwGkAfhKj7K29rKtOVw_aSJHBgAAAO1uBNUOAAAA; expires=Sun, 06-Oct-2019 15:15:19 GMT; path=/; secure; HttpOnly',
=======
  '1309d948-2912-4eb2-ae8d-4c3ad0974400',
  'x-ms-ests-server',
  '2.1.9338.12 - SCUS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AjE6WoYjDUNDqrpNVeQGtYU_aSJHBgAAAKDhBdUOAAAA; expires=Mon, 07-Oct-2019 17:36:58 GMT; path=/; secure; HttpOnly',
>>>>>>> [KeyVault-Certificates] Tweaks to the tests
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; HttpOnly',
  'Date',
<<<<<<< HEAD
  'Fri, 06 Sep 2019 15:15:18 GMT',
=======
  'Sat, 07 Sep 2019 17:36:57 GMT',
>>>>>>> [KeyVault-Certificates] Tweaks to the tests
  'Connection',
  'close',
  'Content-Length',
  '1231' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/recoverCertificateName-canretrieveallversionsofacertificate-/')
  .query(true)
<<<<<<< HEAD
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/recoverCertificateName-canretrieveallversionsofacertificate-/7a10834d75bf4d5689ee16f66f541e8d","kid":"https://keyvault_name.vault.azure.net/keys/recoverCertificateName-canretrieveallversionsofacertificate-/7a10834d75bf4d5689ee16f66f541e8d","sid":"https://keyvault_name.vault.azure.net/secrets/recoverCertificateName-canretrieveallversionsofacertificate-/7a10834d75bf4d5689ee16f66f541e8d","x5t":"daWPG_gsikKnqjPcqF8IcFmIXnU","cer":"MIIDKDCCAhCgAwIBAgIQN/cdqZ6SQ7eRcpxZJIX5ZzANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMTkwOTA2MTUwNTA2WhcNMjAwOTA2MTUxNTA2WjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQCoV1ZE4brUcUI+wTLjt9WeaIFUyW92myzP2cPdFzQWkmBdVrlEeivy9JDXtriG1ZzCN0dfpwWM34OqZOG3spvuDQwrLTfG1Ya/yZC1WABRAj/U8AI0DlRYgUwCOq0qG3HVIcuRQ8WGPEOqz7psA0Rl6mYG4IOYJftPdsarvFpLpEuiQ1c85ugkNL68QwP5fH8kKKDSEb2Kq8EBUFSIGwSlWY9/cXP9W4Y4vkGbF4SuaCDx+Q2RsFism4P8WiFUkSJ1SvXa+w6LQQ8K6CdkJt/TI0MaFgo23VACB5j5EMf+jRbXMcNT0MWLDaCJBTN22GC/n8BbM3mIH9o1tUZoJwlDAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBQ9My6gr01AyYxtcd4A+y1VFSBUojAdBgNVHQ4EFgQUPTMuoK9NQMmMbXHeAPstVRUgVKIwDQYJKoZIhvcNAQELBQADggEBAEqOG74EOV56eLSm//MSml/6l690gpeTcU4IDLMXSfnAeJcOduMCvq0WLC0aIRpF2PjZHR8jLq3VnaFfImZgLi5O2Qx9+T45zFDrOLHYschI7hCuufJCGh4tZrcYSnZMtCyMh/A6YGTc+9nibQw6Hfuj12a6WJOjrfAaImlpvbJKN7VlVHlo/VyL9AuGiGs7RVcJKTULq+fiXO0g4tERM1irL7wIOih04umT/ovFk/IfX/SAKKSWDU5RHdJdItosFQWjhUsSCcA9+PDbOUiAWWrdFYivgyGmlicWUw4STy8FN+iDdktTifRloXCLr9A85YPezQ2hGWGy7Pbas99AQEc=","attributes":{"enabled":true,"nbf":1567782306,"exp":1599405306,"created":1567782907,"updated":1567782907,"recoveryLevel":"Recoverable+Purgeable"},"tags":{"tag":"tag01"},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/recoverCertificateName-canretrieveallversionsofacertificate-/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1567782894,"updated":1567782918}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/recoverCertificateName-canretrieveallversionsofacertificate-/pending"}}, [ 'Cache-Control',
=======
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/recoverCertificateName-canretrieveallversionsofacertificate-/8f744eab13a0476ab7559bd653d08ba5","kid":"https://keyvault_name.vault.azure.net/keys/recoverCertificateName-canretrieveallversionsofacertificate-/8f744eab13a0476ab7559bd653d08ba5","sid":"https://keyvault_name.vault.azure.net/secrets/recoverCertificateName-canretrieveallversionsofacertificate-/8f744eab13a0476ab7559bd653d08ba5","x5t":"D3jXPjpgGXhZTKxTK7bI-Z4gSS4","cer":"MIIDKDCCAhCgAwIBAgIQNW5h+3veQwevwhtXJ1c8PTANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMTkwOTA3MTcyNjUzWhcNMjAwOTA3MTczNjUzWjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQCo8PNr9DgMAxBSgLuvISgYBOZ6UnvT71pgiNvKiieCQIuVpLTnf2vMekyvCJugMvCkWLi/zeKYiOWOh9w/xFBeykM24VvXuRcV7VXqsEg+7x81yFjV3WoTJcgtbqkMvnaLjNg+EUzHaEwzmZgvovZTOlZhwrnge0JaHluiAWMeF7ZgpOSKyY6htYlP1+jTCAIrmxPu1mowhti8pi3jHnoDMsvuRU4lF+/yPQa492NBIO4s0dGrtp01giVF9APaWxVA2vxlkC02aQeupVeA+b0tB4B5NJfYArgFZg6ozOHbQWufIOaBXHlgLXOwJiCrbYQ4rIQsOr9STTxnV/yJ5r/RAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBRUtRBox51fO2D8josxo+FAFh9OoDAdBgNVHQ4EFgQUVLUQaMedXztg/I6LMaPhQBYfTqAwDQYJKoZIhvcNAQELBQADggEBAGOheBtBn60wI782XHVXwuCA5pkoEcIbXndWt/FJK7mFxyuNupww6OvGkAqnWnZleCvAQUCa75KSpynYvc3S6TR9TWKMWF/oY8sXXWOD+4+62uwniDT1TPnsY6UEqOutnh4f86tBdhiQrGJuJZdTzJBzxNARsyE/9aB9RPbPAHw0Sa+hPSb62+PkJrf+LQ1S35u8FWUCVPQ+5TIQJ9/GIZNt2YQRCWzuSPLV2JOLLOvL8jr9bqCrLsnGyDQfj3C8tdWSnRhf1RhLt+E6O9DwH22AAmjs0HU3q5r/fXWlhr9fyvOtU+/y219iN8g1MyttzETD+N/0MT8b1KfSAqcNrFs=","attributes":{"enabled":true,"nbf":1567877213,"exp":1599500213,"created":1567877813,"updated":1567877813,"recoveryLevel":"Recoverable+Purgeable"},"tags":{"tag":"tag02"},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/recoverCertificateName-canretrieveallversionsofacertificate-/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1567877793,"updated":1567877806}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/recoverCertificateName-canretrieveallversionsofacertificate-/pending"}}, [ 'Cache-Control',
>>>>>>> [KeyVault-Certificates] Tweaks to the tests
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
<<<<<<< HEAD
  '21e12152-6329-47c7-8aa4-f3fc98a4e58c',
=======
  'f406052e-b5bf-4417-a56e-9a05e8a93d44',
>>>>>>> [KeyVault-Certificates] Tweaks to the tests
  'x-ms-keyvault-service-version',
  '1.1.0.878',
  'x-ms-keyvault-network-info',
<<<<<<< HEAD
  'addr=168.62.167.138;act_addr_fam=InterNetwork;',
=======
  'addr=13.92.153.51;act_addr_fam=InterNetwork;',
>>>>>>> [KeyVault-Certificates] Tweaks to the tests
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
<<<<<<< HEAD
  'Fri, 06 Sep 2019 15:15:18 GMT',
=======
  'Sat, 07 Sep 2019 17:36:58 GMT',
>>>>>>> [KeyVault-Certificates] Tweaks to the tests
  'Connection',
  'close',
  'Content-Length',
  '2607' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/recoverCertificateName-canretrieveallversionsofacertificate-/')
  .query(true)
  .reply(401, {"error":{"code":"Unauthorized","message":"Request is missing a Bearer or PoP token."}}, [ 'Cache-Control',
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
<<<<<<< HEAD
  '3a461fac-2117-44f5-8155-269fa3f70b37',
=======
  '3a52d649-c330-46b7-a1a4-8ce75b303623',
>>>>>>> [KeyVault-Certificates] Tweaks to the tests
  'x-ms-keyvault-service-version',
  '1.1.0.878',
  'x-ms-keyvault-network-info',
<<<<<<< HEAD
  'addr=168.62.167.138;act_addr_fam=InterNetwork;',
=======
  'addr=13.92.153.51;act_addr_fam=InterNetwork;',
>>>>>>> [KeyVault-Certificates] Tweaks to the tests
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
<<<<<<< HEAD
  'Fri, 06 Sep 2019 15:15:29 GMT',
=======
  'Sat, 07 Sep 2019 17:36:58 GMT',
>>>>>>> [KeyVault-Certificates] Tweaks to the tests
  'Connection',
  'close' ]);


nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fvault.azure.net%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":3599,"ext_expires_in":3599,"access_token":"access_token"}, [ 'Cache-Control',
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
<<<<<<< HEAD
  '37beb416-22be-4f6d-8df7-814971f31c00',
=======
  'ad38d0a7-983e-40b7-9523-702c41414700',
>>>>>>> [KeyVault-Certificates] Tweaks to the tests
  'x-ms-ests-server',
  '2.1.9338.12 - NCUS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
<<<<<<< HEAD
  'fpc=Ai3DWwGkAfhKj7K29rKtOVw_aSJHBwAAAO1uBNUOAAAA; expires=Sun, 06-Oct-2019 15:15:29 GMT; path=/; secure; HttpOnly',
=======
  'fpc=AjE6WoYjDUNDqrpNVeQGtYU_aSJHBwAAAKDhBdUOAAAA; expires=Mon, 07-Oct-2019 17:36:59 GMT; path=/; secure; HttpOnly',
>>>>>>> [KeyVault-Certificates] Tweaks to the tests
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; HttpOnly',
  'Date',
<<<<<<< HEAD
  'Fri, 06 Sep 2019 15:15:29 GMT',
=======
  'Sat, 07 Sep 2019 17:36:58 GMT',
>>>>>>> [KeyVault-Certificates] Tweaks to the tests
  'Connection',
  'close',
  'Content-Length',
  '1231' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/recoverCertificateName-canretrieveallversionsofacertificate-/')
  .query(true)
<<<<<<< HEAD
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/recoverCertificateName-canretrieveallversionsofacertificate-/54cfd8534804490aac44993812fd98ab","kid":"https://keyvault_name.vault.azure.net/keys/recoverCertificateName-canretrieveallversionsofacertificate-/54cfd8534804490aac44993812fd98ab","sid":"https://keyvault_name.vault.azure.net/secrets/recoverCertificateName-canretrieveallversionsofacertificate-/54cfd8534804490aac44993812fd98ab","x5t":"-tF7R37w29Vnpdz5ec0MHuSxm50","cer":"MIIDKDCCAhCgAwIBAgIQMOASAZ5wTHK7aE6JwqkqtDANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMTkwOTA2MTUwNTIyWhcNMjAwOTA2MTUxNTIyWjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQClFnZEPiMe/YVhTN1G3Ogh4wEGqK6qSOblfB156jJ4i7RTIz6Tl6GrG6NPDVc+6hUWpFxHZ1wE5TpR20mlvUhCUxIMWNjK5EqWgtsKbTjhu2PJbkGfyCliwIhu5Lp5j2pQAsBJTCUrE24c63z3WEcwyoy/5Hf5zLK/e83if1wSWl/n+kIRa2l5rGUCAAXMYDbxopAd4vs/Pcyp989EKUSOa9i3joZvXBSHLV6xrYtw5V8EFwZlDP62yVnwV+hroeTfZb+5+rFhtHXh/8uaRrQOtjN0fUvnydDLFGbbUYM1A7cHtvH7qjCBj6pOO5eIpgsCoDuAG0+DnMalNMVTnxGLAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBRO63cPP8a0YJJwl9ThSPlaf7MS2zAdBgNVHQ4EFgQUTut3Dz/GtGCScJfU4Uj5Wn+zEtswDQYJKoZIhvcNAQELBQADggEBAJ+nqEGvGBOobsfct601QLZOCgevDNu5CzuIR+SReD4Rww6HQ3FalrQLNvGy4ZRGsp5RS3hrNTmDsIjW85EV0ObVVaD8xhaqbQzBsobh5IrUzcVU4UzpSJhT0kPp1UkAitVGPsODrWzdon0kev0ke0DCXW6N+waxnqbi8rFRH3opOmKO28KpEqntph0zTrPUwpkfkpjw98lwuNskCerRhlI2tuVoypd507A3uoU/P5lSw/2jjP4sx32FYtqaDTlFjL+0xIKWwynsdZyB75E6FA30pTIUG2srzofywDb9SYC1F31koCoUbhUkd4JNNn9CrbsFxe4Us+OZB1aet/tigGQ=","attributes":{"enabled":true,"nbf":1567782322,"exp":1599405322,"created":1567782922,"updated":1567782922,"recoveryLevel":"Recoverable+Purgeable"},"tags":{"tag":"tag02"},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/recoverCertificateName-canretrieveallversionsofacertificate-/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1567782894,"updated":1567782918}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/recoverCertificateName-canretrieveallversionsofacertificate-/pending"}}, [ 'Cache-Control',
=======
  .reply(202, {"id":"https://keyvault_name.vault.azure.net/certificates/recoverCertificateName-canretrieveallversionsofacertificate-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA5jAiTHikVN5szbi/pixp7R0k7U2eqj0KPdRj7c8XCMfM9aeXsl+IrLesKEnWbmR458UKuklqeHYIYl3Jd/4baxa9ak1Jpwi9ih8AAKE30IycPMwYUFHZ/CzMi05qeFlzXUYKpCPZT1lgvz7YMy1HnZFBpw2OnBjkVLDC//sSWNMjmyQGW7o7B8Obj/LQBv2QR7e1e4950M6yT4yArsl20g7wlyLZwXn4fqg68B0jypBuMzMdDziDdGHkz5Ht/Ol93iY5/Ye6/93K6QJX90KGXUPBzcY9e0xYIr0CPxLndiGdsf1tB+ppjt6sywcvlyP8uo5pBmbS+urbcO/FsaeplwIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAJGRD4ndwLoVgpvHFg6e1oG4H2qfWPqoXHMHq11pQCZghMl7BCsVveiR6nhhvMOCWwtsInIL5dX3rSUtM3VkWMv/FWnmZFYcWKSk9lU9SuBjaHXfAOc1uS+EuLZhg2auJHozCZ7DYSNqmD+GlJ9DOXd5QLL1mSea23mOABYVnniK+UVGTkdEJsITrfCmieMpOLNW/C8bunRPbbTarqehQv2hShSv22AF/kIyk6WXX7vUziBi4QIoGowwy961qkU4lqjJU3LcNU7H4H+q7047CbLSODuluRJKqTisTutqpCZomtPsS41LWbgTqSsZZjt+3jaasZbPCPspK/7PtKPCyLI=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"43730a66214e4ba895432135783a239d"}, [ 'Cache-Control',
>>>>>>> [KeyVault-Certificates] Tweaks to the tests
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
<<<<<<< HEAD
=======
  'Location',
  'https://keyvault_name.vault.azure.net/certificates/recoverCertificateName-canretrieveallversionsofacertificate-/pending?api-version=7.0&request_id=43730a66214e4ba895432135783a239d',
  'Retry-After',
  '10',
>>>>>>> [KeyVault-Certificates] Tweaks to the tests
  'Server',
  'Microsoft-IIS/10.0',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
<<<<<<< HEAD
  '72df3983-2961-4513-8d77-b2f170f521de',
=======
  '7f5aae36-8d39-440f-b477-3ebe8824c0af',
>>>>>>> [KeyVault-Certificates] Tweaks to the tests
  'x-ms-keyvault-service-version',
  '1.1.0.878',
  'x-ms-keyvault-network-info',
<<<<<<< HEAD
  'addr=168.62.167.138;act_addr_fam=InterNetwork;',
=======
  'addr=13.92.153.51;act_addr_fam=InterNetwork;',
>>>>>>> [KeyVault-Certificates] Tweaks to the tests
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
<<<<<<< HEAD
  'Fri, 06 Sep 2019 15:15:30 GMT',
  'Connection',
  'close',
  'Content-Length',
  '2607' ]);
=======
  'Sat, 07 Sep 2019 17:36:59 GMT',
  'Connection',
  'close',
  'Content-Length',
  '1345' ]);
>>>>>>> [KeyVault-Certificates] Tweaks to the tests


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/certificates/recoverCertificateName-canretrieveallversionsofacertificate-/create')
  .query(true)
  .reply(401, {"error":{"code":"Unauthorized","message":"Request is missing a Bearer or PoP token."}}, [ 'Cache-Control',
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
<<<<<<< HEAD
  'cdc7216e-9c55-4a25-a7c0-774a58282224',
=======
  '306d1be6-efdf-488e-b563-37d00aaca9d3',
>>>>>>> [KeyVault-Certificates] Tweaks to the tests
  'x-ms-keyvault-service-version',
  '1.1.0.878',
  'x-ms-keyvault-network-info',
<<<<<<< HEAD
  'addr=168.62.167.138;act_addr_fam=InterNetwork;',
=======
  'addr=13.92.153.51;act_addr_fam=InterNetwork;',
>>>>>>> [KeyVault-Certificates] Tweaks to the tests
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
<<<<<<< HEAD
  'Fri, 06 Sep 2019 15:15:30 GMT',
=======
  'Sat, 07 Sep 2019 17:37:00 GMT',
>>>>>>> [KeyVault-Certificates] Tweaks to the tests
  'Connection',
  'close' ]);


nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fvault.azure.net%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":3599,"ext_expires_in":3599,"access_token":"access_token"}, [ 'Cache-Control',
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
<<<<<<< HEAD
  'bd2e8baa-505c-43e7-950b-f949d8de1d00',
=======
  'ad200acb-a901-4f56-92df-cc1f624a4900',
>>>>>>> [KeyVault-Certificates] Tweaks to the tests
  'x-ms-ests-server',
  '2.1.9338.12 - EUS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
<<<<<<< HEAD
  'fpc=Ai3DWwGkAfhKj7K29rKtOVw_aSJHCAAAAO1uBNUOAAAA; expires=Sun, 06-Oct-2019 15:15:30 GMT; path=/; secure; HttpOnly',
=======
  'fpc=AjE6WoYjDUNDqrpNVeQGtYU_aSJHCAAAAKDhBdUOAAAA; expires=Mon, 07-Oct-2019 17:37:00 GMT; path=/; secure; HttpOnly',
>>>>>>> [KeyVault-Certificates] Tweaks to the tests
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; HttpOnly',
  'Date',
<<<<<<< HEAD
  'Fri, 06 Sep 2019 15:15:30 GMT',
=======
  'Sat, 07 Sep 2019 17:37:00 GMT',
>>>>>>> [KeyVault-Certificates] Tweaks to the tests
  'Connection',
  'close',
  'Content-Length',
  '1231' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/certificates/recoverCertificateName-canretrieveallversionsofacertificate-/create', {"policy":{"x509_props":{"subject":"cn=MyCert"},"issuer":{"name":"Self"}},"attributes":{"enabled":true},"tags":{"tag":"tag03"}})
  .query(true)
<<<<<<< HEAD
  .reply(202, {"id":"https://keyvault_name.vault.azure.net/certificates/recoverCertificateName-canretrieveallversionsofacertificate-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAvwgwyFk3LKQx0Lf+hlPQm+mY07sikeHWRxHxelRhF3KNI01m/wIxuGE6t2Nga53PXw1G3YJJ9mIO3nH9QPTw+0HDLICn/iDw0TjL2Xz0m9Hn8wyfyacXuY5RjGUNbra1wCO6tj1bwVdTx1ywW5z/zFkRxqeyriL/LpzFpSgA65iw98j02PT6qJYQLVm5bmp7/munFqCvr9hVDU2Mx7uXfdIS0tnVxdpCc1/raT4EqgWCN54X9Ek+/H1bzRK5XVHc1nHQPQhQouK9r0LmRYpEHhm2iwQ5cn07R16WjuwWiPrq4l8iqwflAROzyx15rHC9O2gXhvwU8ICgHAGvO/1ZmwIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAHM1DRCir04Pa7a3NVfn7z5VIVgZlUcryGlS99thuXUWhOofQXHO1qykeAoL8Aux9qPmsWkl0qE/OD2lV/xfQmJRTYbZ4yl1ji5Mxbhr2og9a0TsD1dn1wEfdwko07lTzfKZZ4vmbPevKdH6AuXRYkaHCXTDzxhOLyZSMxt6rupY5PTMDpe4feC8doSo8aY/xfiFyu6URLqpiyGMah6yX8/xV4HvbXTCWrLj9HGFenF0vAjddGliZZYJPnpiEaw2AfUGj3uMYcI7vkCIsOx9edHW4/D+t/JXyzgRmyTyN294LZeBc4VUUa4mnK/Nia9xq7HSttB9AgF6WXXkqIrQJ0c=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"cabf5f57b8c8475a9e2ff627604c7d6d"}, [ 'Cache-Control',
=======
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/recoverCertificateName-canretrieveallversionsofacertificate-/8f744eab13a0476ab7559bd653d08ba5","kid":"https://keyvault_name.vault.azure.net/keys/recoverCertificateName-canretrieveallversionsofacertificate-/8f744eab13a0476ab7559bd653d08ba5","sid":"https://keyvault_name.vault.azure.net/secrets/recoverCertificateName-canretrieveallversionsofacertificate-/8f744eab13a0476ab7559bd653d08ba5","x5t":"D3jXPjpgGXhZTKxTK7bI-Z4gSS4","cer":"MIIDKDCCAhCgAwIBAgIQNW5h+3veQwevwhtXJ1c8PTANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMTkwOTA3MTcyNjUzWhcNMjAwOTA3MTczNjUzWjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQCo8PNr9DgMAxBSgLuvISgYBOZ6UnvT71pgiNvKiieCQIuVpLTnf2vMekyvCJugMvCkWLi/zeKYiOWOh9w/xFBeykM24VvXuRcV7VXqsEg+7x81yFjV3WoTJcgtbqkMvnaLjNg+EUzHaEwzmZgvovZTOlZhwrnge0JaHluiAWMeF7ZgpOSKyY6htYlP1+jTCAIrmxPu1mowhti8pi3jHnoDMsvuRU4lF+/yPQa492NBIO4s0dGrtp01giVF9APaWxVA2vxlkC02aQeupVeA+b0tB4B5NJfYArgFZg6ozOHbQWufIOaBXHlgLXOwJiCrbYQ4rIQsOr9STTxnV/yJ5r/RAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBRUtRBox51fO2D8josxo+FAFh9OoDAdBgNVHQ4EFgQUVLUQaMedXztg/I6LMaPhQBYfTqAwDQYJKoZIhvcNAQELBQADggEBAGOheBtBn60wI782XHVXwuCA5pkoEcIbXndWt/FJK7mFxyuNupww6OvGkAqnWnZleCvAQUCa75KSpynYvc3S6TR9TWKMWF/oY8sXXWOD+4+62uwniDT1TPnsY6UEqOutnh4f86tBdhiQrGJuJZdTzJBzxNARsyE/9aB9RPbPAHw0Sa+hPSb62+PkJrf+LQ1S35u8FWUCVPQ+5TIQJ9/GIZNt2YQRCWzuSPLV2JOLLOvL8jr9bqCrLsnGyDQfj3C8tdWSnRhf1RhLt+E6O9DwH22AAmjs0HU3q5r/fXWlhr9fyvOtU+/y219iN8g1MyttzETD+N/0MT8b1KfSAqcNrFs=","attributes":{"enabled":true,"nbf":1567877213,"exp":1599500213,"created":1567877813,"updated":1567877813,"recoveryLevel":"Recoverable+Purgeable"},"tags":{"tag":"tag02"},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/recoverCertificateName-canretrieveallversionsofacertificate-/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1567877793,"updated":1567877819}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/recoverCertificateName-canretrieveallversionsofacertificate-/pending"}}, [ 'Cache-Control',
>>>>>>> [KeyVault-Certificates] Tweaks to the tests
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://keyvault_name.vault.azure.net/certificates/recoverCertificateName-canretrieveallversionsofacertificate-/pending?api-version=7.0&request_id=cabf5f57b8c8475a9e2ff627604c7d6d',
  'Retry-After',
  '10',
  'Server',
  'Microsoft-IIS/10.0',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
<<<<<<< HEAD
  'bb1db47c-e007-4bd4-a390-a0038381fd2d',
=======
  'c8333822-1e6c-48fb-9232-f459266897b1',
>>>>>>> [KeyVault-Certificates] Tweaks to the tests
  'x-ms-keyvault-service-version',
  '1.1.0.878',
  'x-ms-keyvault-network-info',
<<<<<<< HEAD
  'addr=168.62.167.138;act_addr_fam=InterNetwork;',
=======
  'addr=13.92.153.51;act_addr_fam=InterNetwork;',
>>>>>>> [KeyVault-Certificates] Tweaks to the tests
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
<<<<<<< HEAD
  'Fri, 06 Sep 2019 15:15:31 GMT',
  'Connection',
  'close',
  'Content-Length',
  '1345' ]);
=======
  'Sat, 07 Sep 2019 17:37:00 GMT',
  'Connection',
  'close',
  'Content-Length',
  '2607' ]);
>>>>>>> [KeyVault-Certificates] Tweaks to the tests


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/recoverCertificateName-canretrieveallversionsofacertificate-/')
  .query(true)
  .reply(401, {"error":{"code":"Unauthorized","message":"Request is missing a Bearer or PoP token."}}, [ 'Cache-Control',
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
<<<<<<< HEAD
  'b2bae253-0724-4658-ba46-d06dbc226b7f',
=======
  'ff87582b-f3a8-411e-8077-b824211170e3',
>>>>>>> [KeyVault-Certificates] Tweaks to the tests
  'x-ms-keyvault-service-version',
  '1.1.0.878',
  'x-ms-keyvault-network-info',
<<<<<<< HEAD
  'addr=168.62.167.138;act_addr_fam=InterNetwork;',
=======
  'addr=13.92.153.51;act_addr_fam=InterNetwork;',
>>>>>>> [KeyVault-Certificates] Tweaks to the tests
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
<<<<<<< HEAD
  'Fri, 06 Sep 2019 15:15:31 GMT',
=======
  'Sat, 07 Sep 2019 17:37:10 GMT',
>>>>>>> [KeyVault-Certificates] Tweaks to the tests
  'Connection',
  'close' ]);


nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fvault.azure.net%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":3599,"ext_expires_in":3599,"access_token":"access_token"}, [ 'Cache-Control',
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
<<<<<<< HEAD
  '49396a46-52da-4706-82f8-265754a61f00',
  'x-ms-ests-server',
  '2.1.9338.12 - WUS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=Ai3DWwGkAfhKj7K29rKtOVw_aSJHCQAAAO1uBNUOAAAA; expires=Sun, 06-Oct-2019 15:15:32 GMT; path=/; secure; HttpOnly',
=======
  '857fe206-70e0-4fd0-ba83-7530543e4700',
  'x-ms-ests-server',
  '2.1.9338.12 - NCUS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AjE6WoYjDUNDqrpNVeQGtYU_aSJHCQAAAKDhBdUOAAAA; expires=Mon, 07-Oct-2019 17:37:11 GMT; path=/; secure; HttpOnly',
>>>>>>> [KeyVault-Certificates] Tweaks to the tests
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; HttpOnly',
  'Date',
<<<<<<< HEAD
  'Fri, 06 Sep 2019 15:15:31 GMT',
=======
  'Sat, 07 Sep 2019 17:37:11 GMT',
>>>>>>> [KeyVault-Certificates] Tweaks to the tests
  'Connection',
  'close',
  'Content-Length',
  '1231' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/recoverCertificateName-canretrieveallversionsofacertificate-/')
  .query(true)
<<<<<<< HEAD
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/recoverCertificateName-canretrieveallversionsofacertificate-/54cfd8534804490aac44993812fd98ab","kid":"https://keyvault_name.vault.azure.net/keys/recoverCertificateName-canretrieveallversionsofacertificate-/54cfd8534804490aac44993812fd98ab","sid":"https://keyvault_name.vault.azure.net/secrets/recoverCertificateName-canretrieveallversionsofacertificate-/54cfd8534804490aac44993812fd98ab","x5t":"-tF7R37w29Vnpdz5ec0MHuSxm50","cer":"MIIDKDCCAhCgAwIBAgIQMOASAZ5wTHK7aE6JwqkqtDANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMTkwOTA2MTUwNTIyWhcNMjAwOTA2MTUxNTIyWjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQClFnZEPiMe/YVhTN1G3Ogh4wEGqK6qSOblfB156jJ4i7RTIz6Tl6GrG6NPDVc+6hUWpFxHZ1wE5TpR20mlvUhCUxIMWNjK5EqWgtsKbTjhu2PJbkGfyCliwIhu5Lp5j2pQAsBJTCUrE24c63z3WEcwyoy/5Hf5zLK/e83if1wSWl/n+kIRa2l5rGUCAAXMYDbxopAd4vs/Pcyp989EKUSOa9i3joZvXBSHLV6xrYtw5V8EFwZlDP62yVnwV+hroeTfZb+5+rFhtHXh/8uaRrQOtjN0fUvnydDLFGbbUYM1A7cHtvH7qjCBj6pOO5eIpgsCoDuAG0+DnMalNMVTnxGLAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBRO63cPP8a0YJJwl9ThSPlaf7MS2zAdBgNVHQ4EFgQUTut3Dz/GtGCScJfU4Uj5Wn+zEtswDQYJKoZIhvcNAQELBQADggEBAJ+nqEGvGBOobsfct601QLZOCgevDNu5CzuIR+SReD4Rww6HQ3FalrQLNvGy4ZRGsp5RS3hrNTmDsIjW85EV0ObVVaD8xhaqbQzBsobh5IrUzcVU4UzpSJhT0kPp1UkAitVGPsODrWzdon0kev0ke0DCXW6N+waxnqbi8rFRH3opOmKO28KpEqntph0zTrPUwpkfkpjw98lwuNskCerRhlI2tuVoypd507A3uoU/P5lSw/2jjP4sx32FYtqaDTlFjL+0xIKWwynsdZyB75E6FA30pTIUG2srzofywDb9SYC1F31koCoUbhUkd4JNNn9CrbsFxe4Us+OZB1aet/tigGQ=","attributes":{"enabled":true,"nbf":1567782322,"exp":1599405322,"created":1567782922,"updated":1567782922,"recoveryLevel":"Recoverable+Purgeable"},"tags":{"tag":"tag02"},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/recoverCertificateName-canretrieveallversionsofacertificate-/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1567782894,"updated":1567782931}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/recoverCertificateName-canretrieveallversionsofacertificate-/pending"}}, [ 'Cache-Control',
=======
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/recoverCertificateName-canretrieveallversionsofacertificate-/8f744eab13a0476ab7559bd653d08ba5","kid":"https://keyvault_name.vault.azure.net/keys/recoverCertificateName-canretrieveallversionsofacertificate-/8f744eab13a0476ab7559bd653d08ba5","sid":"https://keyvault_name.vault.azure.net/secrets/recoverCertificateName-canretrieveallversionsofacertificate-/8f744eab13a0476ab7559bd653d08ba5","x5t":"D3jXPjpgGXhZTKxTK7bI-Z4gSS4","cer":"MIIDKDCCAhCgAwIBAgIQNW5h+3veQwevwhtXJ1c8PTANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMTkwOTA3MTcyNjUzWhcNMjAwOTA3MTczNjUzWjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQCo8PNr9DgMAxBSgLuvISgYBOZ6UnvT71pgiNvKiieCQIuVpLTnf2vMekyvCJugMvCkWLi/zeKYiOWOh9w/xFBeykM24VvXuRcV7VXqsEg+7x81yFjV3WoTJcgtbqkMvnaLjNg+EUzHaEwzmZgvovZTOlZhwrnge0JaHluiAWMeF7ZgpOSKyY6htYlP1+jTCAIrmxPu1mowhti8pi3jHnoDMsvuRU4lF+/yPQa492NBIO4s0dGrtp01giVF9APaWxVA2vxlkC02aQeupVeA+b0tB4B5NJfYArgFZg6ozOHbQWufIOaBXHlgLXOwJiCrbYQ4rIQsOr9STTxnV/yJ5r/RAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBRUtRBox51fO2D8josxo+FAFh9OoDAdBgNVHQ4EFgQUVLUQaMedXztg/I6LMaPhQBYfTqAwDQYJKoZIhvcNAQELBQADggEBAGOheBtBn60wI782XHVXwuCA5pkoEcIbXndWt/FJK7mFxyuNupww6OvGkAqnWnZleCvAQUCa75KSpynYvc3S6TR9TWKMWF/oY8sXXWOD+4+62uwniDT1TPnsY6UEqOutnh4f86tBdhiQrGJuJZdTzJBzxNARsyE/9aB9RPbPAHw0Sa+hPSb62+PkJrf+LQ1S35u8FWUCVPQ+5TIQJ9/GIZNt2YQRCWzuSPLV2JOLLOvL8jr9bqCrLsnGyDQfj3C8tdWSnRhf1RhLt+E6O9DwH22AAmjs0HU3q5r/fXWlhr9fyvOtU+/y219iN8g1MyttzETD+N/0MT8b1KfSAqcNrFs=","attributes":{"enabled":true,"nbf":1567877213,"exp":1599500213,"created":1567877813,"updated":1567877813,"recoveryLevel":"Recoverable+Purgeable"},"tags":{"tag":"tag02"},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/recoverCertificateName-canretrieveallversionsofacertificate-/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1567877793,"updated":1567877819}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/recoverCertificateName-canretrieveallversionsofacertificate-/pending"}}, [ 'Cache-Control',
>>>>>>> [KeyVault-Certificates] Tweaks to the tests
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
<<<<<<< HEAD
  'c477a12c-c62c-401f-ab5d-215908b450d0',
=======
  'c2efa523-bcbe-4696-bf4d-9115b1046735',
>>>>>>> [KeyVault-Certificates] Tweaks to the tests
  'x-ms-keyvault-service-version',
  '1.1.0.878',
  'x-ms-keyvault-network-info',
<<<<<<< HEAD
  'addr=168.62.167.138;act_addr_fam=InterNetwork;',
=======
  'addr=13.92.153.51;act_addr_fam=InterNetwork;',
>>>>>>> [KeyVault-Certificates] Tweaks to the tests
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
<<<<<<< HEAD
  'Fri, 06 Sep 2019 15:15:32 GMT',
=======
  'Sat, 07 Sep 2019 17:37:12 GMT',
>>>>>>> [KeyVault-Certificates] Tweaks to the tests
  'Connection',
  'close',
  'Content-Length',
  '2607' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/recoverCertificateName-canretrieveallversionsofacertificate-/')
  .query(true)
  .reply(401, {"error":{"code":"Unauthorized","message":"Request is missing a Bearer or PoP token."}}, [ 'Cache-Control',
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
<<<<<<< HEAD
  'de5f3b84-9b57-417e-81d9-af9526724d9c',
=======
  '4ddb7344-4f2a-4889-bed2-f8b3f16c34ec',
>>>>>>> [KeyVault-Certificates] Tweaks to the tests
  'x-ms-keyvault-service-version',
  '1.1.0.878',
  'x-ms-keyvault-network-info',
<<<<<<< HEAD
  'addr=168.62.167.138;act_addr_fam=InterNetwork;',
=======
  'addr=13.92.153.51;act_addr_fam=InterNetwork;',
>>>>>>> [KeyVault-Certificates] Tweaks to the tests
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
<<<<<<< HEAD
  'Fri, 06 Sep 2019 15:15:41 GMT',
=======
  'Sat, 07 Sep 2019 17:37:21 GMT',
>>>>>>> [KeyVault-Certificates] Tweaks to the tests
  'Connection',
  'close' ]);


nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fvault.azure.net%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":3600,"ext_expires_in":3600,"access_token":"access_token"}, [ 'Cache-Control',
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
<<<<<<< HEAD
  '27e11632-e679-4c92-bf12-10c2ad622000',
  'x-ms-ests-server',
  '2.1.9338.12 - EUS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=Ai3DWwGkAfhKj7K29rKtOVw_aSJHCgAAAO1uBNUOAAAA; expires=Sun, 06-Oct-2019 15:15:43 GMT; path=/; secure; HttpOnly',
=======
  '314e5464-9629-40ef-b9fc-457947fc4c00',
  'x-ms-ests-server',
  '2.1.9338.12 - WUS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AjE6WoYjDUNDqrpNVeQGtYU_aSJHCgAAAKDhBdUOAAAA; expires=Mon, 07-Oct-2019 17:37:22 GMT; path=/; secure; HttpOnly',
>>>>>>> [KeyVault-Certificates] Tweaks to the tests
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; HttpOnly',
  'Date',
<<<<<<< HEAD
  'Fri, 06 Sep 2019 15:15:42 GMT',
=======
  'Sat, 07 Sep 2019 17:37:22 GMT',
>>>>>>> [KeyVault-Certificates] Tweaks to the tests
  'Connection',
  'close',
  'Content-Length',
  '1231' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/recoverCertificateName-canretrieveallversionsofacertificate-/')
  .query(true)
<<<<<<< HEAD
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/recoverCertificateName-canretrieveallversionsofacertificate-/6cb8005d544844439c391d9f62ebd832","kid":"https://keyvault_name.vault.azure.net/keys/recoverCertificateName-canretrieveallversionsofacertificate-/6cb8005d544844439c391d9f62ebd832","sid":"https://keyvault_name.vault.azure.net/secrets/recoverCertificateName-canretrieveallversionsofacertificate-/6cb8005d544844439c391d9f62ebd832","x5t":"cJCUCQlyvF9NkOBpv2Uhi1Jvqtg","cer":"MIIDKDCCAhCgAwIBAgIQH1iH/wWcTwC/+4HDUg4Z4zANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMTkwOTA2MTUwNTM3WhcNMjAwOTA2MTUxNTM3WjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQC/CDDIWTcspDHQt/6GU9Cb6ZjTuyKR4dZHEfF6VGEXco0jTWb/AjG4YTq3Y2Brnc9fDUbdgkn2Yg7ecf1A9PD7QcMsgKf+IPDROMvZfPSb0efzDJ/Jpxe5jlGMZQ1utrXAI7q2PVvBV1PHXLBbnP/MWRHGp7KuIv8unMWlKADrmLD3yPTY9PqolhAtWbluanv+a6cWoK+v2FUNTYzHu5d90hLS2dXF2kJzX+tpPgSqBYI3nhf0ST78fVvNErldUdzWcdA9CFCi4r2vQuZFikQeGbaLBDlyfTtHXpaO7BaI+uriXyKrB+UBE7PLHXmscL07aBeG/BTwgKAcAa87/VmbAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBQjZAZ5tPHfrvMkXNltaDmLNIYK7jAdBgNVHQ4EFgQUI2QGebTx367zJFzZbWg5izSGCu4wDQYJKoZIhvcNAQELBQADggEBAJLn07htRGm6z0sHPqHmOIySIYqKAAqzOHNQqBMpfUUt6Jbvb3IMJ9yB4a1LZMi+CtN2j8hTzCPbcazsPcfPEtz33YMJkJa5HtibtLUSlSXw8mAOEPnIdqXSJqoOZXbHLoNqiYLMCCMSnxbdb1HmQn1JCHP26OkFza1ZVeBnU1PjIE9syiLpUMqWgrtG71hhqwMH0OEQFg/tgRvPAa9Bz6mCAjK3cNcQd1hqYeX2BkhcxX0yx3jPohZSBNHDLdEBt+TAdLzXKnhhkiGqk0uMrTVmIxaq/1JNvl/iwOh6yeKQNJsfQXmdNACebTiCEovL8erSGs2/rdbXDm8J6ItWlCo=","attributes":{"enabled":true,"nbf":1567782337,"exp":1599405337,"created":1567782937,"updated":1567782937,"recoveryLevel":"Recoverable+Purgeable"},"tags":{"tag":"tag03"},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/recoverCertificateName-canretrieveallversionsofacertificate-/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1567782894,"updated":1567782931}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/recoverCertificateName-canretrieveallversionsofacertificate-/pending"}}, [ 'Cache-Control',
=======
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/recoverCertificateName-canretrieveallversionsofacertificate-/7cd7e5aa20e144969f8042b26939a227","kid":"https://keyvault_name.vault.azure.net/keys/recoverCertificateName-canretrieveallversionsofacertificate-/7cd7e5aa20e144969f8042b26939a227","sid":"https://keyvault_name.vault.azure.net/secrets/recoverCertificateName-canretrieveallversionsofacertificate-/7cd7e5aa20e144969f8042b26939a227","x5t":"u3WJIeeG6DHKUPU29yVMQnTb--c","cer":"MIIDKDCCAhCgAwIBAgIQf8J9mqJjR2ikVq0hnI2zFjANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMTkwOTA3MTcyNzEzWhcNMjAwOTA3MTczNzEzWjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQDmMCJMeKRU3mzNuL+mLGntHSTtTZ6qPQo91GPtzxcIx8z1p5eyX4ist6woSdZuZHjnxQq6SWp4dghiXcl3/htrFr1qTUmnCL2KHwAAoTfQjJw8zBhQUdn8LMyLTmp4WXNdRgqkI9lPWWC/PtgzLUedkUGnDY6cGORUsML/+xJY0yObJAZbujsHw5uP8tAG/ZBHt7V7j3nQzrJPjICuyXbSDvCXItnBefh+qDrwHSPKkG4zMx0POIN0YeTPke386X3eJjn9h7r/3crpAlf3QoZdQ8HNxj17TFgivQI/Eud2IZ2x/W0H6mmO3qzLBy+XI/y6jmkGZtL66ttw78Wxp6mXAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBTxaBuOcgIF1SK6vQzN0F6YM8i/cjAdBgNVHQ4EFgQU8WgbjnICBdUiur0MzdBemDPIv3IwDQYJKoZIhvcNAQELBQADggEBAIBBMRLSIbBXrHG9Jam0em0Oybq39hPgGlYdzYUMesZmOKjHKldApDO+Q/nz2vXS7+Np4JDuyzTCRscvZBBJUAZrOvWmf9UILTpPd/sZ4efFd5gXrw7Zg4Q6s6cKfA+Ee8DKVVeB0SC6tjG4OPpbch+NipByi5OQV7ruKHJXNpF4+jBzpv7OiEHymWxW3umcVC5jh8ZPwoAobm3fV1fPLToqePNKGLqqmTIhrFy2KcT5MjR+t54DCCFVfS8Z6wOC8kmcXBBLavS56tJlgcCOClJ+O8+8dVT6IWrbkymlBxPh/cJFchVI7q3c9nNXs1C/SM51GcpgAijOjCuSkwoY3x8=","attributes":{"enabled":true,"nbf":1567877233,"exp":1599500233,"created":1567877833,"updated":1567877833,"recoveryLevel":"Recoverable+Purgeable"},"tags":{"tag":"tag03"},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/recoverCertificateName-canretrieveallversionsofacertificate-/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1567877793,"updated":1567877819}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/recoverCertificateName-canretrieveallversionsofacertificate-/pending"}}, [ 'Cache-Control',
>>>>>>> [KeyVault-Certificates] Tweaks to the tests
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
<<<<<<< HEAD
  '23255c34-e50d-46a8-83fc-73f331e2388a',
=======
  '20da8fae-a127-42b7-8d89-14fa4aec1f9f',
>>>>>>> [KeyVault-Certificates] Tweaks to the tests
  'x-ms-keyvault-service-version',
  '1.1.0.878',
  'x-ms-keyvault-network-info',
<<<<<<< HEAD
  'addr=168.62.167.138;act_addr_fam=InterNetwork;',
=======
  'addr=13.92.153.51;act_addr_fam=InterNetwork;',
>>>>>>> [KeyVault-Certificates] Tweaks to the tests
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
<<<<<<< HEAD
  'Fri, 06 Sep 2019 15:15:42 GMT',
=======
  'Sat, 07 Sep 2019 17:37:22 GMT',
>>>>>>> [KeyVault-Certificates] Tweaks to the tests
  'Connection',
  'close',
  'Content-Length',
  '2607' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/recoverCertificateName-canretrieveallversionsofacertificate-/versions')
  .query(true)
  .reply(401, {"error":{"code":"Unauthorized","message":"Request is missing a Bearer or PoP token."}}, [ 'Cache-Control',
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
<<<<<<< HEAD
  'b056c45d-85ec-472a-8bdc-4c37616a5c61',
=======
  '05fd0bc4-7195-40d9-b9f1-e1f9cbd58ed2',
>>>>>>> [KeyVault-Certificates] Tweaks to the tests
  'x-ms-keyvault-service-version',
  '1.1.0.878',
  'x-ms-keyvault-network-info',
<<<<<<< HEAD
  'addr=168.62.167.138;act_addr_fam=InterNetwork;',
=======
  'addr=13.92.153.51;act_addr_fam=InterNetwork;',
>>>>>>> [KeyVault-Certificates] Tweaks to the tests
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
<<<<<<< HEAD
  'Fri, 06 Sep 2019 15:15:43 GMT',
=======
  'Sat, 07 Sep 2019 17:37:22 GMT',
>>>>>>> [KeyVault-Certificates] Tweaks to the tests
  'Connection',
  'close' ]);


nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fvault.azure.net%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":3600,"ext_expires_in":3600,"access_token":"access_token"}, [ 'Cache-Control',
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
<<<<<<< HEAD
  'f38c6ffd-0bcb-45b6-ac2f-ea22a3811f00',
  'x-ms-ests-server',
  '2.1.9338.12 - EUS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=Ai3DWwGkAfhKj7K29rKtOVw_aSJHCwAAAO1uBNUOAAAA; expires=Sun, 06-Oct-2019 15:15:43 GMT; path=/; secure; HttpOnly',
=======
  'f5985c66-195c-4b36-8699-af6023a25000',
  'x-ms-ests-server',
  '2.1.9338.12 - NCUS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AjE6WoYjDUNDqrpNVeQGtYU_aSJHCwAAAKDhBdUOAAAA; expires=Mon, 07-Oct-2019 17:37:23 GMT; path=/; secure; HttpOnly',
>>>>>>> [KeyVault-Certificates] Tweaks to the tests
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; HttpOnly',
  'Date',
<<<<<<< HEAD
  'Fri, 06 Sep 2019 15:15:42 GMT',
=======
  'Sat, 07 Sep 2019 17:37:22 GMT',
>>>>>>> [KeyVault-Certificates] Tweaks to the tests
  'Connection',
  'close',
  'Content-Length',
  '1231' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/recoverCertificateName-canretrieveallversionsofacertificate-/versions')
  .query(true)
<<<<<<< HEAD
  .reply(200, {"value":[{"id":"https://keyvault_name.vault.azure.net/certificates/recoverCertificateName-canretrieveallversionsofacertificate-/54cfd8534804490aac44993812fd98ab","x5t":"-tF7R37w29Vnpdz5ec0MHuSxm50","attributes":{"enabled":true,"nbf":1567782322,"exp":1599405322,"created":1567782922,"updated":1567782922},"tags":{"tag":"tag02"},"subject":""},{"id":"https://keyvault_name.vault.azure.net/certificates/recoverCertificateName-canretrieveallversionsofacertificate-/6cb8005d544844439c391d9f62ebd832","x5t":"cJCUCQlyvF9NkOBpv2Uhi1Jvqtg","attributes":{"enabled":true,"nbf":1567782337,"exp":1599405337,"created":1567782937,"updated":1567782937},"tags":{"tag":"tag03"},"subject":""},{"id":"https://keyvault_name.vault.azure.net/certificates/recoverCertificateName-canretrieveallversionsofacertificate-/7a10834d75bf4d5689ee16f66f541e8d","x5t":"daWPG_gsikKnqjPcqF8IcFmIXnU","attributes":{"enabled":true,"nbf":1567782306,"exp":1599405306,"created":1567782907,"updated":1567782907},"tags":{"tag":"tag01"},"subject":""}],"nextLink":null}, [ 'Cache-Control',
=======
  .reply(200, {"value":[{"id":"https://keyvault_name.vault.azure.net/certificates/recoverCertificateName-canretrieveallversionsofacertificate-/633a490cddf14e808d27bff7844e15e2","x5t":"6CJ9nrwFYhIX51B8QWy-8eYPpGE","attributes":{"enabled":true,"nbf":1567877198,"exp":1599500198,"created":1567877798,"updated":1567877798},"tags":{"tag":"tag01"},"subject":""},{"id":"https://keyvault_name.vault.azure.net/certificates/recoverCertificateName-canretrieveallversionsofacertificate-/7cd7e5aa20e144969f8042b26939a227","x5t":"u3WJIeeG6DHKUPU29yVMQnTb--c","attributes":{"enabled":true,"nbf":1567877233,"exp":1599500233,"created":1567877833,"updated":1567877833},"tags":{"tag":"tag03"},"subject":""},{"id":"https://keyvault_name.vault.azure.net/certificates/recoverCertificateName-canretrieveallversionsofacertificate-/8f744eab13a0476ab7559bd653d08ba5","x5t":"D3jXPjpgGXhZTKxTK7bI-Z4gSS4","attributes":{"enabled":true,"nbf":1567877213,"exp":1599500213,"created":1567877813,"updated":1567877813},"tags":{"tag":"tag02"},"subject":""}],"nextLink":null}, [ 'Cache-Control',
>>>>>>> [KeyVault-Certificates] Tweaks to the tests
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
<<<<<<< HEAD
  '91bf0565-2c4e-4e06-8484-ec434b1abb56',
=======
  '1c83e82c-ca5e-4de0-b55a-c404eb3c8ef3',
>>>>>>> [KeyVault-Certificates] Tweaks to the tests
  'x-ms-keyvault-service-version',
  '1.1.0.878',
  'x-ms-keyvault-network-info',
<<<<<<< HEAD
  'addr=168.62.167.138;act_addr_fam=InterNetwork;',
=======
  'addr=13.92.153.51;act_addr_fam=InterNetwork;',
>>>>>>> [KeyVault-Certificates] Tweaks to the tests
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
<<<<<<< HEAD
  'Fri, 06 Sep 2019 15:15:43 GMT',
=======
  'Sat, 07 Sep 2019 17:37:22 GMT',
>>>>>>> [KeyVault-Certificates] Tweaks to the tests
  'Connection',
  'close',
  'Content-Length',
  '1065' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
<<<<<<< HEAD
  .get('/certificates/recoverCertificateName-canretrieveallversionsofacertificate-/54cfd8534804490aac44993812fd98ab')
=======
  .get('/certificates/recoverCertificateName-canretrieveallversionsofacertificate-/633a490cddf14e808d27bff7844e15e2')
>>>>>>> [KeyVault-Certificates] Tweaks to the tests
  .query(true)
  .reply(401, {"error":{"code":"Unauthorized","message":"Request is missing a Bearer or PoP token."}}, [ 'Cache-Control',
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
<<<<<<< HEAD
  'b4a6dfb2-85e9-452c-913c-6b51d606e10a',
=======
  'a54b93a9-b0f5-4638-80ea-39d52c0939ff',
>>>>>>> [KeyVault-Certificates] Tweaks to the tests
  'x-ms-keyvault-service-version',
  '1.1.0.878',
  'x-ms-keyvault-network-info',
<<<<<<< HEAD
  'addr=168.62.167.138;act_addr_fam=InterNetwork;',
=======
  'addr=13.92.153.51;act_addr_fam=InterNetwork;',
>>>>>>> [KeyVault-Certificates] Tweaks to the tests
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
<<<<<<< HEAD
  'Fri, 06 Sep 2019 15:15:44 GMT',
=======
  'Sat, 07 Sep 2019 17:37:24 GMT',
>>>>>>> [KeyVault-Certificates] Tweaks to the tests
  'Connection',
  'close' ]);


nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fvault.azure.net%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":3600,"ext_expires_in":3600,"access_token":"access_token"}, [ 'Cache-Control',
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
<<<<<<< HEAD
  'aecb3f32-c828-44c2-9262-83b488072000',
  'x-ms-ests-server',
  '2.1.9338.12 - EUS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=Ai3DWwGkAfhKj7K29rKtOVw_aSJHDAAAAO1uBNUOAAAA; expires=Sun, 06-Oct-2019 15:15:44 GMT; path=/; secure; HttpOnly',
=======
  'cbc21ae9-ea86-401c-86cb-bee1f8f04800',
  'x-ms-ests-server',
  '2.1.9338.12 - WUS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AjE6WoYjDUNDqrpNVeQGtYU_aSJHDAAAAKDhBdUOAAAA; expires=Mon, 07-Oct-2019 17:37:24 GMT; path=/; secure; HttpOnly',
>>>>>>> [KeyVault-Certificates] Tweaks to the tests
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; HttpOnly',
  'Date',
<<<<<<< HEAD
  'Fri, 06 Sep 2019 15:15:44 GMT',
=======
  'Sat, 07 Sep 2019 17:37:23 GMT',
>>>>>>> [KeyVault-Certificates] Tweaks to the tests
  'Connection',
  'close',
  'Content-Length',
  '1231' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
<<<<<<< HEAD
  .get('/certificates/recoverCertificateName-canretrieveallversionsofacertificate-/54cfd8534804490aac44993812fd98ab')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/recoverCertificateName-canretrieveallversionsofacertificate-/54cfd8534804490aac44993812fd98ab","kid":"https://keyvault_name.vault.azure.net/keys/recoverCertificateName-canretrieveallversionsofacertificate-/54cfd8534804490aac44993812fd98ab","sid":"https://keyvault_name.vault.azure.net/secrets/recoverCertificateName-canretrieveallversionsofacertificate-/54cfd8534804490aac44993812fd98ab","x5t":"-tF7R37w29Vnpdz5ec0MHuSxm50","cer":"MIIDKDCCAhCgAwIBAgIQMOASAZ5wTHK7aE6JwqkqtDANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMTkwOTA2MTUwNTIyWhcNMjAwOTA2MTUxNTIyWjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQClFnZEPiMe/YVhTN1G3Ogh4wEGqK6qSOblfB156jJ4i7RTIz6Tl6GrG6NPDVc+6hUWpFxHZ1wE5TpR20mlvUhCUxIMWNjK5EqWgtsKbTjhu2PJbkGfyCliwIhu5Lp5j2pQAsBJTCUrE24c63z3WEcwyoy/5Hf5zLK/e83if1wSWl/n+kIRa2l5rGUCAAXMYDbxopAd4vs/Pcyp989EKUSOa9i3joZvXBSHLV6xrYtw5V8EFwZlDP62yVnwV+hroeTfZb+5+rFhtHXh/8uaRrQOtjN0fUvnydDLFGbbUYM1A7cHtvH7qjCBj6pOO5eIpgsCoDuAG0+DnMalNMVTnxGLAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBRO63cPP8a0YJJwl9ThSPlaf7MS2zAdBgNVHQ4EFgQUTut3Dz/GtGCScJfU4Uj5Wn+zEtswDQYJKoZIhvcNAQELBQADggEBAJ+nqEGvGBOobsfct601QLZOCgevDNu5CzuIR+SReD4Rww6HQ3FalrQLNvGy4ZRGsp5RS3hrNTmDsIjW85EV0ObVVaD8xhaqbQzBsobh5IrUzcVU4UzpSJhT0kPp1UkAitVGPsODrWzdon0kev0ke0DCXW6N+waxnqbi8rFRH3opOmKO28KpEqntph0zTrPUwpkfkpjw98lwuNskCerRhlI2tuVoypd507A3uoU/P5lSw/2jjP4sx32FYtqaDTlFjL+0xIKWwynsdZyB75E6FA30pTIUG2srzofywDb9SYC1F31koCoUbhUkd4JNNn9CrbsFxe4Us+OZB1aet/tigGQ=","attributes":{"enabled":true,"nbf":1567782322,"exp":1599405322,"created":1567782922,"updated":1567782922,"recoveryLevel":"Recoverable+Purgeable"},"tags":{"tag":"tag02"}}, [ 'Cache-Control',
=======
  .get('/certificates/recoverCertificateName-canretrieveallversionsofacertificate-/633a490cddf14e808d27bff7844e15e2')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/recoverCertificateName-canretrieveallversionsofacertificate-/633a490cddf14e808d27bff7844e15e2","kid":"https://keyvault_name.vault.azure.net/keys/recoverCertificateName-canretrieveallversionsofacertificate-/633a490cddf14e808d27bff7844e15e2","sid":"https://keyvault_name.vault.azure.net/secrets/recoverCertificateName-canretrieveallversionsofacertificate-/633a490cddf14e808d27bff7844e15e2","x5t":"6CJ9nrwFYhIX51B8QWy-8eYPpGE","cer":"MIIDKDCCAhCgAwIBAgIQDWA9fXr2RQe4zHlJhoZ+HzANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMTkwOTA3MTcyNjM4WhcNMjAwOTA3MTczNjM4WjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQC6EOkunz+a51Ufrri+YPfEt7kO8Pfr7bbor3/0Gw8CLPxi76XZGeQ+bBuveDtNF3IX9oTD+oqaSpbpDEQnXapjXTVyD/pYI3dVPIl7nWH+04bxjWCZYLKcVM+uvjtKE7ro3PA4AUrIwjnHwBKVH1aNgTXrtKjLQrScngPZ6HwMAkwx7xq9pY2EXDOd1Er17IlvgyW3tfCXCWfvuUxeUvzTG77ZFCMg/Aozz8TZi/buXE2d6/Oi6NGgxIlEjjejcaOV4rM+356oJyA6MWNo2QerhIsfqF5dFFlGNWlNl6WFTnLAGGKsoAszOf2s6aYtSfLE32eyb6fTr6E3jgdkMHZJAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBQVVX+d2YJq6XwW780OEbNmT0ULCzAdBgNVHQ4EFgQUFVV/ndmCaul8Fu/NDhGzZk9FCwswDQYJKoZIhvcNAQELBQADggEBAJMJjyFaQzqMmN2cqZFDt1rJk74OsGahLP8VXK1t/y8dW2nACdX9IPmluZFFxPz1AnoG85ab6cMkzaM2yB7fwUjg1lUqgntgreMGWU+66ifbQ5lRQhignAHTdPwi6yMlTKlXkkC/Kxwdsh1a2KRgd4hid2FrFHq4jj/npX+W5lgLBTwvyQ9y3evr5Ynncz+LhzjdKJo93u8e8VEEO4sPqhf8y6SSR7np5oZhOKezS+GW8Kp5a5fV5AMWqm0blVqoRngrigWozYNaWpQ3mhPZU4V/BCtPhYavXI+ek2Qp+9syigYJSqk3DO5teZUyIEysgDsilk7eL1JQlsFQEXKSZW8=","attributes":{"enabled":true,"nbf":1567877198,"exp":1599500198,"created":1567877798,"updated":1567877798,"recoveryLevel":"Recoverable+Purgeable"},"tags":{"tag":"tag01"}}, [ 'Cache-Control',
>>>>>>> [KeyVault-Certificates] Tweaks to the tests
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
<<<<<<< HEAD
  'be781740-f12b-4ea7-b8cc-58bf5c7a1d6f',
=======
  '8d27ce49-7791-4669-9270-7598d7f78ebe',
>>>>>>> [KeyVault-Certificates] Tweaks to the tests
  'x-ms-keyvault-service-version',
  '1.1.0.878',
  'x-ms-keyvault-network-info',
<<<<<<< HEAD
  'addr=168.62.167.138;act_addr_fam=InterNetwork;',
=======
  'addr=13.92.153.51;act_addr_fam=InterNetwork;',
>>>>>>> [KeyVault-Certificates] Tweaks to the tests
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
<<<<<<< HEAD
  'Fri, 06 Sep 2019 15:15:44 GMT',
=======
  'Sat, 07 Sep 2019 17:37:24 GMT',
>>>>>>> [KeyVault-Certificates] Tweaks to the tests
  'Connection',
  'close',
  'Content-Length',
  '1786' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
<<<<<<< HEAD
  .get('/certificates/recoverCertificateName-canretrieveallversionsofacertificate-/6cb8005d544844439c391d9f62ebd832')
=======
  .get('/certificates/recoverCertificateName-canretrieveallversionsofacertificate-/7cd7e5aa20e144969f8042b26939a227')
>>>>>>> [KeyVault-Certificates] Tweaks to the tests
  .query(true)
  .reply(401, {"error":{"code":"Unauthorized","message":"Request is missing a Bearer or PoP token."}}, [ 'Cache-Control',
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
<<<<<<< HEAD
  '4f0d854f-8337-4f56-9127-7336517bd59c',
=======
  '4a51db7d-529c-48be-b610-b9f814133f3a',
>>>>>>> [KeyVault-Certificates] Tweaks to the tests
  'x-ms-keyvault-service-version',
  '1.1.0.878',
  'x-ms-keyvault-network-info',
<<<<<<< HEAD
  'addr=168.62.167.138;act_addr_fam=InterNetwork;',
=======
  'addr=13.92.153.51;act_addr_fam=InterNetwork;',
>>>>>>> [KeyVault-Certificates] Tweaks to the tests
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
<<<<<<< HEAD
  'Fri, 06 Sep 2019 15:15:44 GMT',
=======
  'Sat, 07 Sep 2019 17:37:24 GMT',
>>>>>>> [KeyVault-Certificates] Tweaks to the tests
  'Connection',
  'close' ]);


nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fvault.azure.net%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":3600,"ext_expires_in":3600,"access_token":"access_token"}, [ 'Cache-Control',
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
<<<<<<< HEAD
  '3c8b2fab-7ecd-421c-8634-909260ef1b00',
  'x-ms-ests-server',
  '2.1.9338.12 - SCUS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=Ai3DWwGkAfhKj7K29rKtOVw_aSJHDQAAAO1uBNUOAAAA; expires=Sun, 06-Oct-2019 15:15:45 GMT; path=/; secure; HttpOnly',
=======
  '785d1d1f-fe6c-4c79-999a-8486ea204900',
  'x-ms-ests-server',
  '2.1.9338.12 - WUS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AjE6WoYjDUNDqrpNVeQGtYU_aSJHDQAAAKDhBdUOAAAA; expires=Mon, 07-Oct-2019 17:37:25 GMT; path=/; secure; HttpOnly',
>>>>>>> [KeyVault-Certificates] Tweaks to the tests
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; HttpOnly',
  'Date',
<<<<<<< HEAD
  'Fri, 06 Sep 2019 15:15:44 GMT',
=======
  'Sat, 07 Sep 2019 17:37:25 GMT',
>>>>>>> [KeyVault-Certificates] Tweaks to the tests
  'Connection',
  'close',
  'Content-Length',
  '1231' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
<<<<<<< HEAD
  .get('/certificates/recoverCertificateName-canretrieveallversionsofacertificate-/6cb8005d544844439c391d9f62ebd832')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/recoverCertificateName-canretrieveallversionsofacertificate-/6cb8005d544844439c391d9f62ebd832","kid":"https://keyvault_name.vault.azure.net/keys/recoverCertificateName-canretrieveallversionsofacertificate-/6cb8005d544844439c391d9f62ebd832","sid":"https://keyvault_name.vault.azure.net/secrets/recoverCertificateName-canretrieveallversionsofacertificate-/6cb8005d544844439c391d9f62ebd832","x5t":"cJCUCQlyvF9NkOBpv2Uhi1Jvqtg","cer":"MIIDKDCCAhCgAwIBAgIQH1iH/wWcTwC/+4HDUg4Z4zANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMTkwOTA2MTUwNTM3WhcNMjAwOTA2MTUxNTM3WjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQC/CDDIWTcspDHQt/6GU9Cb6ZjTuyKR4dZHEfF6VGEXco0jTWb/AjG4YTq3Y2Brnc9fDUbdgkn2Yg7ecf1A9PD7QcMsgKf+IPDROMvZfPSb0efzDJ/Jpxe5jlGMZQ1utrXAI7q2PVvBV1PHXLBbnP/MWRHGp7KuIv8unMWlKADrmLD3yPTY9PqolhAtWbluanv+a6cWoK+v2FUNTYzHu5d90hLS2dXF2kJzX+tpPgSqBYI3nhf0ST78fVvNErldUdzWcdA9CFCi4r2vQuZFikQeGbaLBDlyfTtHXpaO7BaI+uriXyKrB+UBE7PLHXmscL07aBeG/BTwgKAcAa87/VmbAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBQjZAZ5tPHfrvMkXNltaDmLNIYK7jAdBgNVHQ4EFgQUI2QGebTx367zJFzZbWg5izSGCu4wDQYJKoZIhvcNAQELBQADggEBAJLn07htRGm6z0sHPqHmOIySIYqKAAqzOHNQqBMpfUUt6Jbvb3IMJ9yB4a1LZMi+CtN2j8hTzCPbcazsPcfPEtz33YMJkJa5HtibtLUSlSXw8mAOEPnIdqXSJqoOZXbHLoNqiYLMCCMSnxbdb1HmQn1JCHP26OkFza1ZVeBnU1PjIE9syiLpUMqWgrtG71hhqwMH0OEQFg/tgRvPAa9Bz6mCAjK3cNcQd1hqYeX2BkhcxX0yx3jPohZSBNHDLdEBt+TAdLzXKnhhkiGqk0uMrTVmIxaq/1JNvl/iwOh6yeKQNJsfQXmdNACebTiCEovL8erSGs2/rdbXDm8J6ItWlCo=","attributes":{"enabled":true,"nbf":1567782337,"exp":1599405337,"created":1567782937,"updated":1567782937,"recoveryLevel":"Recoverable+Purgeable"},"tags":{"tag":"tag03"}}, [ 'Cache-Control',
=======
  .get('/certificates/recoverCertificateName-canretrieveallversionsofacertificate-/7cd7e5aa20e144969f8042b26939a227')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/recoverCertificateName-canretrieveallversionsofacertificate-/7cd7e5aa20e144969f8042b26939a227","kid":"https://keyvault_name.vault.azure.net/keys/recoverCertificateName-canretrieveallversionsofacertificate-/7cd7e5aa20e144969f8042b26939a227","sid":"https://keyvault_name.vault.azure.net/secrets/recoverCertificateName-canretrieveallversionsofacertificate-/7cd7e5aa20e144969f8042b26939a227","x5t":"u3WJIeeG6DHKUPU29yVMQnTb--c","cer":"MIIDKDCCAhCgAwIBAgIQf8J9mqJjR2ikVq0hnI2zFjANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMTkwOTA3MTcyNzEzWhcNMjAwOTA3MTczNzEzWjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQDmMCJMeKRU3mzNuL+mLGntHSTtTZ6qPQo91GPtzxcIx8z1p5eyX4ist6woSdZuZHjnxQq6SWp4dghiXcl3/htrFr1qTUmnCL2KHwAAoTfQjJw8zBhQUdn8LMyLTmp4WXNdRgqkI9lPWWC/PtgzLUedkUGnDY6cGORUsML/+xJY0yObJAZbujsHw5uP8tAG/ZBHt7V7j3nQzrJPjICuyXbSDvCXItnBefh+qDrwHSPKkG4zMx0POIN0YeTPke386X3eJjn9h7r/3crpAlf3QoZdQ8HNxj17TFgivQI/Eud2IZ2x/W0H6mmO3qzLBy+XI/y6jmkGZtL66ttw78Wxp6mXAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBTxaBuOcgIF1SK6vQzN0F6YM8i/cjAdBgNVHQ4EFgQU8WgbjnICBdUiur0MzdBemDPIv3IwDQYJKoZIhvcNAQELBQADggEBAIBBMRLSIbBXrHG9Jam0em0Oybq39hPgGlYdzYUMesZmOKjHKldApDO+Q/nz2vXS7+Np4JDuyzTCRscvZBBJUAZrOvWmf9UILTpPd/sZ4efFd5gXrw7Zg4Q6s6cKfA+Ee8DKVVeB0SC6tjG4OPpbch+NipByi5OQV7ruKHJXNpF4+jBzpv7OiEHymWxW3umcVC5jh8ZPwoAobm3fV1fPLToqePNKGLqqmTIhrFy2KcT5MjR+t54DCCFVfS8Z6wOC8kmcXBBLavS56tJlgcCOClJ+O8+8dVT6IWrbkymlBxPh/cJFchVI7q3c9nNXs1C/SM51GcpgAijOjCuSkwoY3x8=","attributes":{"enabled":true,"nbf":1567877233,"exp":1599500233,"created":1567877833,"updated":1567877833,"recoveryLevel":"Recoverable+Purgeable"},"tags":{"tag":"tag03"}}, [ 'Cache-Control',
>>>>>>> [KeyVault-Certificates] Tweaks to the tests
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
<<<<<<< HEAD
  '535114ff-8388-4a96-9f4b-359aac1bdee6',
=======
  '12ee304c-079f-44b2-8649-fda07ffe01d2',
>>>>>>> [KeyVault-Certificates] Tweaks to the tests
  'x-ms-keyvault-service-version',
  '1.1.0.878',
  'x-ms-keyvault-network-info',
<<<<<<< HEAD
  'addr=168.62.167.138;act_addr_fam=InterNetwork;',
=======
  'addr=13.92.153.51;act_addr_fam=InterNetwork;',
>>>>>>> [KeyVault-Certificates] Tweaks to the tests
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
<<<<<<< HEAD
  'Fri, 06 Sep 2019 15:15:45 GMT',
=======
  'Sat, 07 Sep 2019 17:37:25 GMT',
>>>>>>> [KeyVault-Certificates] Tweaks to the tests
  'Connection',
  'close',
  'Content-Length',
  '1786' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
<<<<<<< HEAD
  .get('/certificates/recoverCertificateName-canretrieveallversionsofacertificate-/7a10834d75bf4d5689ee16f66f541e8d')
=======
  .get('/certificates/recoverCertificateName-canretrieveallversionsofacertificate-/8f744eab13a0476ab7559bd653d08ba5')
>>>>>>> [KeyVault-Certificates] Tweaks to the tests
  .query(true)
  .reply(401, {"error":{"code":"Unauthorized","message":"Request is missing a Bearer or PoP token."}}, [ 'Cache-Control',
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
<<<<<<< HEAD
  '93f9cf57-042c-4d04-bc2f-08627b175f6a',
=======
  'e4397125-6484-4c76-a2ab-1aec467d2ee9',
>>>>>>> [KeyVault-Certificates] Tweaks to the tests
  'x-ms-keyvault-service-version',
  '1.1.0.878',
  'x-ms-keyvault-network-info',
<<<<<<< HEAD
  'addr=168.62.167.138;act_addr_fam=InterNetwork;',
=======
  'addr=13.92.153.51;act_addr_fam=InterNetwork;',
>>>>>>> [KeyVault-Certificates] Tweaks to the tests
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
<<<<<<< HEAD
  'Fri, 06 Sep 2019 15:15:45 GMT',
=======
  'Sat, 07 Sep 2019 17:37:25 GMT',
>>>>>>> [KeyVault-Certificates] Tweaks to the tests
  'Connection',
  'close' ]);


nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fvault.azure.net%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":3600,"ext_expires_in":3600,"access_token":"access_token"}, [ 'Cache-Control',
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
<<<<<<< HEAD
  '6fb64420-b51c-4d74-869f-57a91a3c1c00',
  'x-ms-ests-server',
  '2.1.9338.12 - EUS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=Ai3DWwGkAfhKj7K29rKtOVw_aSJHDgAAAO1uBNUOAAAA; expires=Sun, 06-Oct-2019 15:15:46 GMT; path=/; secure; HttpOnly',
=======
  '9c494c5d-d6c1-4264-8938-13bcde0a4b00',
  'x-ms-ests-server',
  '2.1.9338.12 - WUS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AjE6WoYjDUNDqrpNVeQGtYU_aSJHDgAAAKDhBdUOAAAA; expires=Mon, 07-Oct-2019 17:37:26 GMT; path=/; secure; HttpOnly',
>>>>>>> [KeyVault-Certificates] Tweaks to the tests
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; HttpOnly',
  'Date',
<<<<<<< HEAD
  'Fri, 06 Sep 2019 15:15:45 GMT',
=======
  'Sat, 07 Sep 2019 17:37:25 GMT',
>>>>>>> [KeyVault-Certificates] Tweaks to the tests
  'Connection',
  'close',
  'Content-Length',
  '1231' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
<<<<<<< HEAD
  .get('/certificates/recoverCertificateName-canretrieveallversionsofacertificate-/7a10834d75bf4d5689ee16f66f541e8d')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/recoverCertificateName-canretrieveallversionsofacertificate-/7a10834d75bf4d5689ee16f66f541e8d","kid":"https://keyvault_name.vault.azure.net/keys/recoverCertificateName-canretrieveallversionsofacertificate-/7a10834d75bf4d5689ee16f66f541e8d","sid":"https://keyvault_name.vault.azure.net/secrets/recoverCertificateName-canretrieveallversionsofacertificate-/7a10834d75bf4d5689ee16f66f541e8d","x5t":"daWPG_gsikKnqjPcqF8IcFmIXnU","cer":"MIIDKDCCAhCgAwIBAgIQN/cdqZ6SQ7eRcpxZJIX5ZzANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMTkwOTA2MTUwNTA2WhcNMjAwOTA2MTUxNTA2WjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQCoV1ZE4brUcUI+wTLjt9WeaIFUyW92myzP2cPdFzQWkmBdVrlEeivy9JDXtriG1ZzCN0dfpwWM34OqZOG3spvuDQwrLTfG1Ya/yZC1WABRAj/U8AI0DlRYgUwCOq0qG3HVIcuRQ8WGPEOqz7psA0Rl6mYG4IOYJftPdsarvFpLpEuiQ1c85ugkNL68QwP5fH8kKKDSEb2Kq8EBUFSIGwSlWY9/cXP9W4Y4vkGbF4SuaCDx+Q2RsFism4P8WiFUkSJ1SvXa+w6LQQ8K6CdkJt/TI0MaFgo23VACB5j5EMf+jRbXMcNT0MWLDaCJBTN22GC/n8BbM3mIH9o1tUZoJwlDAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBQ9My6gr01AyYxtcd4A+y1VFSBUojAdBgNVHQ4EFgQUPTMuoK9NQMmMbXHeAPstVRUgVKIwDQYJKoZIhvcNAQELBQADggEBAEqOG74EOV56eLSm//MSml/6l690gpeTcU4IDLMXSfnAeJcOduMCvq0WLC0aIRpF2PjZHR8jLq3VnaFfImZgLi5O2Qx9+T45zFDrOLHYschI7hCuufJCGh4tZrcYSnZMtCyMh/A6YGTc+9nibQw6Hfuj12a6WJOjrfAaImlpvbJKN7VlVHlo/VyL9AuGiGs7RVcJKTULq+fiXO0g4tERM1irL7wIOih04umT/ovFk/IfX/SAKKSWDU5RHdJdItosFQWjhUsSCcA9+PDbOUiAWWrdFYivgyGmlicWUw4STy8FN+iDdktTifRloXCLr9A85YPezQ2hGWGy7Pbas99AQEc=","attributes":{"enabled":true,"nbf":1567782306,"exp":1599405306,"created":1567782907,"updated":1567782907,"recoveryLevel":"Recoverable+Purgeable"},"tags":{"tag":"tag01"}}, [ 'Cache-Control',
=======
  .get('/certificates/recoverCertificateName-canretrieveallversionsofacertificate-/8f744eab13a0476ab7559bd653d08ba5')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/recoverCertificateName-canretrieveallversionsofacertificate-/8f744eab13a0476ab7559bd653d08ba5","kid":"https://keyvault_name.vault.azure.net/keys/recoverCertificateName-canretrieveallversionsofacertificate-/8f744eab13a0476ab7559bd653d08ba5","sid":"https://keyvault_name.vault.azure.net/secrets/recoverCertificateName-canretrieveallversionsofacertificate-/8f744eab13a0476ab7559bd653d08ba5","x5t":"D3jXPjpgGXhZTKxTK7bI-Z4gSS4","cer":"MIIDKDCCAhCgAwIBAgIQNW5h+3veQwevwhtXJ1c8PTANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMTkwOTA3MTcyNjUzWhcNMjAwOTA3MTczNjUzWjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQCo8PNr9DgMAxBSgLuvISgYBOZ6UnvT71pgiNvKiieCQIuVpLTnf2vMekyvCJugMvCkWLi/zeKYiOWOh9w/xFBeykM24VvXuRcV7VXqsEg+7x81yFjV3WoTJcgtbqkMvnaLjNg+EUzHaEwzmZgvovZTOlZhwrnge0JaHluiAWMeF7ZgpOSKyY6htYlP1+jTCAIrmxPu1mowhti8pi3jHnoDMsvuRU4lF+/yPQa492NBIO4s0dGrtp01giVF9APaWxVA2vxlkC02aQeupVeA+b0tB4B5NJfYArgFZg6ozOHbQWufIOaBXHlgLXOwJiCrbYQ4rIQsOr9STTxnV/yJ5r/RAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBRUtRBox51fO2D8josxo+FAFh9OoDAdBgNVHQ4EFgQUVLUQaMedXztg/I6LMaPhQBYfTqAwDQYJKoZIhvcNAQELBQADggEBAGOheBtBn60wI782XHVXwuCA5pkoEcIbXndWt/FJK7mFxyuNupww6OvGkAqnWnZleCvAQUCa75KSpynYvc3S6TR9TWKMWF/oY8sXXWOD+4+62uwniDT1TPnsY6UEqOutnh4f86tBdhiQrGJuJZdTzJBzxNARsyE/9aB9RPbPAHw0Sa+hPSb62+PkJrf+LQ1S35u8FWUCVPQ+5TIQJ9/GIZNt2YQRCWzuSPLV2JOLLOvL8jr9bqCrLsnGyDQfj3C8tdWSnRhf1RhLt+E6O9DwH22AAmjs0HU3q5r/fXWlhr9fyvOtU+/y219iN8g1MyttzETD+N/0MT8b1KfSAqcNrFs=","attributes":{"enabled":true,"nbf":1567877213,"exp":1599500213,"created":1567877813,"updated":1567877813,"recoveryLevel":"Recoverable+Purgeable"},"tags":{"tag":"tag02"}}, [ 'Cache-Control',
>>>>>>> [KeyVault-Certificates] Tweaks to the tests
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
<<<<<<< HEAD
  'cba768f1-c87d-4c42-b050-3ebece94b233',
=======
  '49e77e3e-a940-4b7d-a672-e9e7459115f7',
>>>>>>> [KeyVault-Certificates] Tweaks to the tests
  'x-ms-keyvault-service-version',
  '1.1.0.878',
  'x-ms-keyvault-network-info',
<<<<<<< HEAD
  'addr=168.62.167.138;act_addr_fam=InterNetwork;',
=======
  'addr=13.92.153.51;act_addr_fam=InterNetwork;',
>>>>>>> [KeyVault-Certificates] Tweaks to the tests
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
<<<<<<< HEAD
  'Fri, 06 Sep 2019 15:15:46 GMT',
=======
  'Sat, 07 Sep 2019 17:37:26 GMT',
>>>>>>> [KeyVault-Certificates] Tweaks to the tests
  'Connection',
  'close',
  'Content-Length',
  '1786' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/certificates/recoverCertificateName-canretrieveallversionsofacertificate-')
  .query(true)
  .reply(401, {"error":{"code":"Unauthorized","message":"Request is missing a Bearer or PoP token."}}, [ 'Cache-Control',
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
<<<<<<< HEAD
  '753ce34a-827b-4edd-ab88-f9b36e17d524',
=======
  'c1861862-e213-48ad-b7a0-08e8d8499ad0',
>>>>>>> [KeyVault-Certificates] Tweaks to the tests
  'x-ms-keyvault-service-version',
  '1.1.0.878',
  'x-ms-keyvault-network-info',
<<<<<<< HEAD
  'addr=168.62.167.138;act_addr_fam=InterNetwork;',
=======
  'addr=13.92.153.51;act_addr_fam=InterNetwork;',
>>>>>>> [KeyVault-Certificates] Tweaks to the tests
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
<<<<<<< HEAD
  'Fri, 06 Sep 2019 15:15:46 GMT',
=======
  'Sat, 07 Sep 2019 17:37:26 GMT',
>>>>>>> [KeyVault-Certificates] Tweaks to the tests
  'Connection',
  'close' ]);


nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fvault.azure.net%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":3600,"ext_expires_in":3600,"access_token":"access_token"}, [ 'Cache-Control',
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
<<<<<<< HEAD
  'a07ddf47-8b38-461b-b57c-122e1adf1b00',
=======
  '4e346326-9553-4279-beea-14e2a9164500',
>>>>>>> [KeyVault-Certificates] Tweaks to the tests
  'x-ms-ests-server',
  '2.1.9338.12 - SCUS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
<<<<<<< HEAD
  'fpc=Ai3DWwGkAfhKj7K29rKtOVw_aSJHDwAAAO1uBNUOAAAA; expires=Sun, 06-Oct-2019 15:15:47 GMT; path=/; secure; HttpOnly',
=======
  'fpc=AjE6WoYjDUNDqrpNVeQGtYU_aSJHDwAAAKDhBdUOAAAA; expires=Mon, 07-Oct-2019 17:37:27 GMT; path=/; secure; HttpOnly',
>>>>>>> [KeyVault-Certificates] Tweaks to the tests
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; HttpOnly',
  'Date',
<<<<<<< HEAD
  'Fri, 06 Sep 2019 15:15:46 GMT',
=======
  'Sat, 07 Sep 2019 17:37:26 GMT',
>>>>>>> [KeyVault-Certificates] Tweaks to the tests
  'Connection',
  'close',
  'Content-Length',
  '1231' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/certificates/recoverCertificateName-canretrieveallversionsofacertificate-')
  .query(true)
<<<<<<< HEAD
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/recoverCertificateName-canretrieveallversionsofacertificate-","deletedDate":1567782947,"scheduledPurgeDate":1575558947,"id":"https://keyvault_name.vault.azure.net/certificates/recoverCertificateName-canretrieveallversionsofacertificate-/6cb8005d544844439c391d9f62ebd832","kid":"https://keyvault_name.vault.azure.net/keys/recoverCertificateName-canretrieveallversionsofacertificate-/6cb8005d544844439c391d9f62ebd832","sid":"https://keyvault_name.vault.azure.net/secrets/recoverCertificateName-canretrieveallversionsofacertificate-/6cb8005d544844439c391d9f62ebd832","x5t":"cJCUCQlyvF9NkOBpv2Uhi1Jvqtg","cer":"MIIDKDCCAhCgAwIBAgIQH1iH/wWcTwC/+4HDUg4Z4zANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMTkwOTA2MTUwNTM3WhcNMjAwOTA2MTUxNTM3WjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQC/CDDIWTcspDHQt/6GU9Cb6ZjTuyKR4dZHEfF6VGEXco0jTWb/AjG4YTq3Y2Brnc9fDUbdgkn2Yg7ecf1A9PD7QcMsgKf+IPDROMvZfPSb0efzDJ/Jpxe5jlGMZQ1utrXAI7q2PVvBV1PHXLBbnP/MWRHGp7KuIv8unMWlKADrmLD3yPTY9PqolhAtWbluanv+a6cWoK+v2FUNTYzHu5d90hLS2dXF2kJzX+tpPgSqBYI3nhf0ST78fVvNErldUdzWcdA9CFCi4r2vQuZFikQeGbaLBDlyfTtHXpaO7BaI+uriXyKrB+UBE7PLHXmscL07aBeG/BTwgKAcAa87/VmbAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBQjZAZ5tPHfrvMkXNltaDmLNIYK7jAdBgNVHQ4EFgQUI2QGebTx367zJFzZbWg5izSGCu4wDQYJKoZIhvcNAQELBQADggEBAJLn07htRGm6z0sHPqHmOIySIYqKAAqzOHNQqBMpfUUt6Jbvb3IMJ9yB4a1LZMi+CtN2j8hTzCPbcazsPcfPEtz33YMJkJa5HtibtLUSlSXw8mAOEPnIdqXSJqoOZXbHLoNqiYLMCCMSnxbdb1HmQn1JCHP26OkFza1ZVeBnU1PjIE9syiLpUMqWgrtG71hhqwMH0OEQFg/tgRvPAa9Bz6mCAjK3cNcQd1hqYeX2BkhcxX0yx3jPohZSBNHDLdEBt+TAdLzXKnhhkiGqk0uMrTVmIxaq/1JNvl/iwOh6yeKQNJsfQXmdNACebTiCEovL8erSGs2/rdbXDm8J6ItWlCo=","attributes":{"enabled":true,"nbf":1567782337,"exp":1599405337,"created":1567782937,"updated":1567782937,"recoveryLevel":"Recoverable+Purgeable"},"tags":{"tag":"tag03"},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/recoverCertificateName-canretrieveallversionsofacertificate-/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1567782894,"updated":1567782931}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/recoverCertificateName-canretrieveallversionsofacertificate-/pending"}}, [ 'Cache-Control',
=======
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/recoverCertificateName-canretrieveallversionsofacertificate-","deletedDate":1567877847,"scheduledPurgeDate":1575653847,"id":"https://keyvault_name.vault.azure.net/certificates/recoverCertificateName-canretrieveallversionsofacertificate-/7cd7e5aa20e144969f8042b26939a227","kid":"https://keyvault_name.vault.azure.net/keys/recoverCertificateName-canretrieveallversionsofacertificate-/7cd7e5aa20e144969f8042b26939a227","sid":"https://keyvault_name.vault.azure.net/secrets/recoverCertificateName-canretrieveallversionsofacertificate-/7cd7e5aa20e144969f8042b26939a227","x5t":"u3WJIeeG6DHKUPU29yVMQnTb--c","cer":"MIIDKDCCAhCgAwIBAgIQf8J9mqJjR2ikVq0hnI2zFjANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMTkwOTA3MTcyNzEzWhcNMjAwOTA3MTczNzEzWjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQDmMCJMeKRU3mzNuL+mLGntHSTtTZ6qPQo91GPtzxcIx8z1p5eyX4ist6woSdZuZHjnxQq6SWp4dghiXcl3/htrFr1qTUmnCL2KHwAAoTfQjJw8zBhQUdn8LMyLTmp4WXNdRgqkI9lPWWC/PtgzLUedkUGnDY6cGORUsML/+xJY0yObJAZbujsHw5uP8tAG/ZBHt7V7j3nQzrJPjICuyXbSDvCXItnBefh+qDrwHSPKkG4zMx0POIN0YeTPke386X3eJjn9h7r/3crpAlf3QoZdQ8HNxj17TFgivQI/Eud2IZ2x/W0H6mmO3qzLBy+XI/y6jmkGZtL66ttw78Wxp6mXAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBTxaBuOcgIF1SK6vQzN0F6YM8i/cjAdBgNVHQ4EFgQU8WgbjnICBdUiur0MzdBemDPIv3IwDQYJKoZIhvcNAQELBQADggEBAIBBMRLSIbBXrHG9Jam0em0Oybq39hPgGlYdzYUMesZmOKjHKldApDO+Q/nz2vXS7+Np4JDuyzTCRscvZBBJUAZrOvWmf9UILTpPd/sZ4efFd5gXrw7Zg4Q6s6cKfA+Ee8DKVVeB0SC6tjG4OPpbch+NipByi5OQV7ruKHJXNpF4+jBzpv7OiEHymWxW3umcVC5jh8ZPwoAobm3fV1fPLToqePNKGLqqmTIhrFy2KcT5MjR+t54DCCFVfS8Z6wOC8kmcXBBLavS56tJlgcCOClJ+O8+8dVT6IWrbkymlBxPh/cJFchVI7q3c9nNXs1C/SM51GcpgAijOjCuSkwoY3x8=","attributes":{"enabled":true,"nbf":1567877233,"exp":1599500233,"created":1567877833,"updated":1567877833,"recoveryLevel":"Recoverable+Purgeable"},"tags":{"tag":"tag03"},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/recoverCertificateName-canretrieveallversionsofacertificate-/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1567877793,"updated":1567877819}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/recoverCertificateName-canretrieveallversionsofacertificate-/pending"}}, [ 'Cache-Control',
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
  '0d625db9-e823-4af8-badd-a869a6157fb0',
  'x-ms-keyvault-service-version',
  '1.1.0.878',
  'x-ms-keyvault-network-info',
  'addr=13.92.153.51;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Sat, 07 Sep 2019 17:37:27 GMT',
  'Connection',
  'close',
  'Content-Length',
  '2812' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedcertificates/recoverCertificateName-canretrieveallversionsofacertificate-')
  .query(true)
  .reply(401, {"error":{"code":"Unauthorized","message":"Request is missing a Bearer or PoP token."}}, [ 'Cache-Control',
>>>>>>> [KeyVault-Certificates] Tweaks to the tests
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
<<<<<<< HEAD
  '660beb8c-2a7f-4356-b95a-9fc9892fc2c3',
=======
  'febabed2-bb0e-4d30-bc6c-9d4fdde40c4e',
>>>>>>> [KeyVault-Certificates] Tweaks to the tests
  'x-ms-keyvault-service-version',
  '1.1.0.878',
  'x-ms-keyvault-network-info',
<<<<<<< HEAD
  'addr=168.62.167.138;act_addr_fam=InterNetwork;',
=======
  'addr=13.92.153.51;act_addr_fam=InterNetwork;',
>>>>>>> [KeyVault-Certificates] Tweaks to the tests
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
<<<<<<< HEAD
  'Fri, 06 Sep 2019 15:15:47 GMT',
  'Connection',
  'close',
  'Content-Length',
  '2812' ]);
=======
  'Sat, 07 Sep 2019 17:37:27 GMT',
  'Connection',
  'close' ]);


nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fvault.azure.net%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":3599,"ext_expires_in":3599,"access_token":"access_token"}, [ 'Cache-Control',
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
  '95df6926-ed5d-4088-a38f-b8fd18ba4300',
  'x-ms-ests-server',
  '2.1.9338.12 - SCUS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AjE6WoYjDUNDqrpNVeQGtYU_aSJHEAAAAKDhBdUOAAAA; expires=Mon, 07-Oct-2019 17:37:28 GMT; path=/; secure; HttpOnly',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; HttpOnly',
  'Date',
  'Sat, 07 Sep 2019 17:37:28 GMT',
  'Connection',
  'close',
  'Content-Length',
  '1231' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedcertificates/recoverCertificateName-canretrieveallversionsofacertificate-')
  .query(true)
  .reply(409, {"error":{"code":"Conflict","message":"Certificate is currently being deleted.","innererror":{"code":"ObjectIsBeingDeleted"}}}, [ 'Cache-Control',
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
  'bf94708a-2883-49a0-84be-963362f658d6',
  'x-ms-keyvault-service-version',
  '1.1.0.878',
  'x-ms-keyvault-network-info',
  'addr=13.92.153.51;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Sat, 07 Sep 2019 17:37:28 GMT',
  'Connection',
  'close' ]);
>>>>>>> [KeyVault-Certificates] Tweaks to the tests


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedcertificates/recoverCertificateName-canretrieveallversionsofacertificate-')
  .query(true)
  .reply(401, {"error":{"code":"Unauthorized","message":"Request is missing a Bearer or PoP token."}}, [ 'Cache-Control',
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
<<<<<<< HEAD
  'dbaf1d5a-106a-4a8e-bd74-589739c0b9af',
=======
  '7fd13768-e4fa-475f-b602-f661cc93a47f',
>>>>>>> [KeyVault-Certificates] Tweaks to the tests
  'x-ms-keyvault-service-version',
  '1.1.0.878',
  'x-ms-keyvault-network-info',
<<<<<<< HEAD
  'addr=168.62.167.138;act_addr_fam=InterNetwork;',
=======
  'addr=13.92.153.51;act_addr_fam=InterNetwork;',
>>>>>>> [KeyVault-Certificates] Tweaks to the tests
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
<<<<<<< HEAD
  'Fri, 06 Sep 2019 15:15:47 GMT',
=======
  'Sat, 07 Sep 2019 17:37:38 GMT',
>>>>>>> [KeyVault-Certificates] Tweaks to the tests
  'Connection',
  'close' ]);


nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fvault.azure.net%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":3599,"ext_expires_in":3599,"access_token":"access_token"}, [ 'Cache-Control',
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
<<<<<<< HEAD
  'b191b1e5-ce64-4af2-b363-b7024a241d00',
  'x-ms-ests-server',
  '2.1.9338.12 - NCUS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=Ai3DWwGkAfhKj7K29rKtOVw_aSJHEAAAAO1uBNUOAAAA; expires=Sun, 06-Oct-2019 15:15:48 GMT; path=/; secure; HttpOnly',
=======
  'bd2e8baa-505c-43e7-950b-f94969ec4600',
  'x-ms-ests-server',
  '2.1.9338.12 - EUS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AjE6WoYjDUNDqrpNVeQGtYU_aSJHEQAAAKDhBdUOAAAA; expires=Mon, 07-Oct-2019 17:37:39 GMT; path=/; secure; HttpOnly',
>>>>>>> [KeyVault-Certificates] Tweaks to the tests
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; HttpOnly',
  'Date',
<<<<<<< HEAD
  'Fri, 06 Sep 2019 15:15:47 GMT',
=======
  'Sat, 07 Sep 2019 17:37:39 GMT',
>>>>>>> [KeyVault-Certificates] Tweaks to the tests
  'Connection',
  'close',
  'Content-Length',
  '1231' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedcertificates/recoverCertificateName-canretrieveallversionsofacertificate-')
  .query(true)
  .reply(409, {"error":{"code":"Conflict","message":"Certificate is currently being deleted.","innererror":{"code":"ObjectIsBeingDeleted"}}}, [ 'Cache-Control',
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
<<<<<<< HEAD
  '5724e505-6509-4e75-ad57-b5d941d53720',
=======
  '4c4da812-3ecd-4400-b14a-9485e5575a66',
>>>>>>> [KeyVault-Certificates] Tweaks to the tests
  'x-ms-keyvault-service-version',
  '1.1.0.878',
  'x-ms-keyvault-network-info',
<<<<<<< HEAD
  'addr=168.62.167.138;act_addr_fam=InterNetwork;',
=======
  'addr=13.92.153.51;act_addr_fam=InterNetwork;',
>>>>>>> [KeyVault-Certificates] Tweaks to the tests
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
<<<<<<< HEAD
  'Fri, 06 Sep 2019 15:15:47 GMT',
=======
  'Sat, 07 Sep 2019 17:37:38 GMT',
>>>>>>> [KeyVault-Certificates] Tweaks to the tests
  'Connection',
  'close' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedcertificates/recoverCertificateName-canretrieveallversionsofacertificate-')
  .query(true)
  .reply(401, {"error":{"code":"Unauthorized","message":"Request is missing a Bearer or PoP token."}}, [ 'Cache-Control',
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
<<<<<<< HEAD
  'd57b45ec-2deb-4323-af22-dbe6f2aee858',
=======
  '511cffa8-2119-4ee5-97f9-a67f3d9e367f',
>>>>>>> [KeyVault-Certificates] Tweaks to the tests
  'x-ms-keyvault-service-version',
  '1.1.0.878',
  'x-ms-keyvault-network-info',
<<<<<<< HEAD
  'addr=168.62.167.138;act_addr_fam=InterNetwork;',
=======
  'addr=13.92.153.51;act_addr_fam=InterNetwork;',
>>>>>>> [KeyVault-Certificates] Tweaks to the tests
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
<<<<<<< HEAD
  'Fri, 06 Sep 2019 15:15:58 GMT',
=======
  'Sat, 07 Sep 2019 17:37:49 GMT',
>>>>>>> [KeyVault-Certificates] Tweaks to the tests
  'Connection',
  'close' ]);


nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fvault.azure.net%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":3599,"ext_expires_in":3599,"access_token":"access_token"}, [ 'Cache-Control',
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
<<<<<<< HEAD
  '78fe5482-6cc8-42ec-b014-c32e05802000',
  'x-ms-ests-server',
  '2.1.9338.12 - WUS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=Ai3DWwGkAfhKj7K29rKtOVw_aSJHEQAAAO1uBNUOAAAA; expires=Sun, 06-Oct-2019 15:15:58 GMT; path=/; secure; HttpOnly',
=======
  '3c5436ff-4fe8-40a7-a3e4-fa83b3d84300',
  'x-ms-ests-server',
  '2.1.9338.12 - EUS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AjE6WoYjDUNDqrpNVeQGtYU_aSJHEgAAAKDhBdUOAAAA; expires=Mon, 07-Oct-2019 17:37:50 GMT; path=/; secure; HttpOnly',
>>>>>>> [KeyVault-Certificates] Tweaks to the tests
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; HttpOnly',
  'Date',
<<<<<<< HEAD
  'Fri, 06 Sep 2019 15:15:58 GMT',
=======
  'Sat, 07 Sep 2019 17:37:49 GMT',
>>>>>>> [KeyVault-Certificates] Tweaks to the tests
  'Connection',
  'close',
  'Content-Length',
  '1231' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedcertificates/recoverCertificateName-canretrieveallversionsofacertificate-')
  .query(true)
  .reply(204, "", [ 'Cache-Control',
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
<<<<<<< HEAD
  'e49f2296-c471-4155-934f-cdf8d913d699',
=======
  'db443945-b5ef-4778-a691-c68d1f2325ec',
>>>>>>> [KeyVault-Certificates] Tweaks to the tests
  'x-ms-keyvault-service-version',
  '1.1.0.878',
  'x-ms-keyvault-network-info',
<<<<<<< HEAD
  'addr=168.62.167.138;act_addr_fam=InterNetwork;',
=======
  'addr=13.92.153.51;act_addr_fam=InterNetwork;',
>>>>>>> [KeyVault-Certificates] Tweaks to the tests
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
<<<<<<< HEAD
  'Fri, 06 Sep 2019 15:15:58 GMT',
=======
  'Sat, 07 Sep 2019 17:37:50 GMT',
>>>>>>> [KeyVault-Certificates] Tweaks to the tests
  'Connection',
  'close' ]);


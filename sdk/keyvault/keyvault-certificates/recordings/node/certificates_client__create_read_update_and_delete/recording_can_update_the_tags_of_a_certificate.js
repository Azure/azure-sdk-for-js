let nock = require('nock');

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/certificates/recoverCertificateName-canupdatethetagsofacertificate-/create')
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
  'c96c493b-ab3d-4827-b626-ba863e08a510',
=======
  '733ff603-30ef-4e38-b0d6-83dacecc674d',
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
  'Fri, 06 Sep 2019 15:10:16 GMT',
=======
  'Sat, 07 Sep 2019 17:31:51 GMT',
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
  '23fec574-5a76-4866-a92e-323747172000',
  'x-ms-ests-server',
  '2.1.9338.12 - WUS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AuAPWrnf1ZdMhGR3MbEWsjc_aSJHAQAAANhtBNUOAAAA; expires=Sun, 06-Oct-2019 15:10:16 GMT; path=/; secure; HttpOnly',
=======
  '95df6926-ed5d-4088-a38f-b8fd1f944300',
  'x-ms-ests-server',
  '2.1.9338.12 - SCUS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AkRgGcvBHklHtMaBxkbdpUU_aSJHAQAAAIfgBdUOAAAA; expires=Mon, 07-Oct-2019 17:31:51 GMT; path=/; secure; HttpOnly',
>>>>>>> [KeyVault-Certificates] Tweaks to the tests
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; HttpOnly',
  'Date',
<<<<<<< HEAD
  'Fri, 06 Sep 2019 15:10:16 GMT',
=======
  'Sat, 07 Sep 2019 17:31:51 GMT',
>>>>>>> [KeyVault-Certificates] Tweaks to the tests
  'Connection',
  'close',
  'Content-Length',
  '1231' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/certificates/recoverCertificateName-canupdatethetagsofacertificate-/create', {"policy":{"x509_props":{"subject":"cn=MyCert"},"issuer":{"name":"Self"}},"attributes":{}})
  .query(true)
<<<<<<< HEAD
  .reply(202, {"id":"https://keyvault_name.vault.azure.net/certificates/recoverCertificateName-canupdatethetagsofacertificate-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAnDUvbMTJPA+frZXePuWI5rzN/M+kREesJHxCw3LMC1luOw4fVM3Y48xMCxB3RsVXdEX5Srwk/pxwODXgtNVm1NQjTgn8Vl/CTiU8S9DL9DuK/kuwjuK1Ohqg2bGgq9ZwzuEBqs8tvQEGsaZ2vq5IfZe33deNQV1qzv8bFZv/kG4ug3Uivl+vlCTufhkGePfAiTcXxy1fWP3/e+3iaLZyZhq3NCr/tNME0K5OHjXkMNz7q2iLD629AEgtpas58PMOZbtbN2wXeu0bI0yUXzySYOq8mOpA95dHM6hbNR59gmkEDq541EmyIWqJsdpHSm9yY7A3KRVWn9owNSDMvjsdHwIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAAqEA0Vu8yafw0MfBfXrfhRRHEn+i6p/jNw3T6gx2nW6eLT1eJ/cRUPNZSoM7k8D+XV0Et7TJnhoJlnYNa96NBSgflMGOjIivIqoIJYy3HWyxKnNZCSHNb93E4IQcuKqcaZWfnMm8twbfbQaYMNOQYDbVinzByDOU1/peqleG1yMPJOukY7CWgJIOs/UWgM1zxCzCTCR0iZhudt9i+o0/VCs+XxGmVKHgvxFA9a3AzpI/KhaJ3/AZvJZZgkbWgXfGzn0Oj+L5McGjbF5BZpJNEyhM5Lddp6bbRwF7BLfVAugM5zfptESQLhS6dRxcA26b/q+hACuzd2lAL02+rLqb70=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"6d79158618414b699265d02565d3a8fc"}, [ 'Cache-Control',
=======
  .reply(202, {"id":"https://keyvault_name.vault.azure.net/certificates/recoverCertificateName-canupdatethetagsofacertificate-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAqfyyXAz1cNtiuPXaAp8H2Edj0wZtoKXsZ2nO/x4JR4gIKyXfXthkSmDOLiw15sKNWQb18jRFT9q7cgEFzws0zHOtXAC3Fdd4hN7jAeCvxmmuGBg3q88+NqMi8+/jUHotu4JKGEHVwk2f/V68dsHSqoEKV3ZtaafUEmb4W80OlKuwuiPOKBlLdYl9rV8JhJwxlOc8WU0xAyTeMrv8FBkE2Cuaqm9ziSrzzIgBPD21KiFCmK2bMm9YGEZHzSHdG5xbMtFpnGX93tppRkhu1sRxtQBlXC2JTU6Qb5q1f39s6FBqtSLC4fbI/BMRCcPPN/3SrKSI55vRFWZp7t1KsAMVJQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAJ9QmC9jfdrcLmDzTkNvCEHpeZxevImIo/+SX+qgBCfMEujw2SqX8AZX+Py1trMQ1830hO+FJVYtIyQK7JoGf4f0vyolzQFwnqMDZZrGilDdG4+mHAbEpsiMqfpBfhe7a53lNZXanwjgjyhBvcLHIceAKe1VY+8WnVCtl/GODl/wgNb2bJ90xQWu2QM2SchJYfbPdhN1hZtKHtSYBpgY5KrALC1xv5yuYbcKT3TbjcgnFTRNgUgfLz9LwMFk7W0dY+gpBa7h2E1GFu1niwfcCjtvm2gdRkZ1YoYdSLe3hFP3MyfDwdJkxfEsIFbUt/w5GZ51XVRd4eI0ctpk/sPMG5o=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"7abe987d86f847ffba3ba42da0599c9b"}, [ 'Cache-Control',
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
  'https://keyvault_name.vault.azure.net/certificates/recoverCertificateName-canupdatethetagsofacertificate-/pending?api-version=7.0&request_id=6d79158618414b699265d02565d3a8fc',
=======
  'https://keyvault_name.vault.azure.net/certificates/recoverCertificateName-canupdatethetagsofacertificate-/pending?api-version=7.0&request_id=7abe987d86f847ffba3ba42da0599c9b',
>>>>>>> [KeyVault-Certificates] Tweaks to the tests
  'Retry-After',
  '10',
  'Server',
  'Microsoft-IIS/10.0',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
<<<<<<< HEAD
  '7535c55d-0328-4b73-9f60-2942fa7e88b9',
=======
  'd5ec482a-ad11-4111-b1a9-4ec2dc62102b',
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
  'Fri, 06 Sep 2019 15:10:17 GMT',
=======
  'Sat, 07 Sep 2019 17:31:52 GMT',
>>>>>>> [KeyVault-Certificates] Tweaks to the tests
  'Connection',
  'close',
  'Content-Length',
  '1339' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .patch('/certificates/recoverCertificateName-canupdatethetagsofacertificate-/')
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
  '1c5ac40a-2c60-457e-bf54-a6555e1920d7',
=======
  'd00ff5e5-4e4e-4825-8c91-a9b819524934',
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
  'Fri, 06 Sep 2019 15:10:17 GMT',
=======
  'Sat, 07 Sep 2019 17:31:52 GMT',
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
  '8d6f6a6e-21c1-483d-ba84-97fd53481d00',
  'x-ms-ests-server',
  '2.1.9338.12 - NCUS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AuAPWrnf1ZdMhGR3MbEWsjc_aSJHAgAAANhtBNUOAAAA; expires=Sun, 06-Oct-2019 15:10:18 GMT; path=/; secure; HttpOnly',
=======
  '78fe5482-6cc8-42ec-b014-c32e3e104a00',
  'x-ms-ests-server',
  '2.1.9338.12 - WUS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AkRgGcvBHklHtMaBxkbdpUU_aSJHAgAAAIfgBdUOAAAA; expires=Mon, 07-Oct-2019 17:31:53 GMT; path=/; secure; HttpOnly',
>>>>>>> [KeyVault-Certificates] Tweaks to the tests
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; HttpOnly',
  'Date',
<<<<<<< HEAD
  'Fri, 06 Sep 2019 15:10:18 GMT',
=======
  'Sat, 07 Sep 2019 17:31:52 GMT',
>>>>>>> [KeyVault-Certificates] Tweaks to the tests
  'Connection',
  'close',
  'Content-Length',
  '1231' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .patch('/certificates/recoverCertificateName-canupdatethetagsofacertificate-/', {"tags":{"customTag":"value"}})
  .query(true)
<<<<<<< HEAD
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/recoverCertificateName-canupdatethetagsofacertificate-/ab1620f69aa54833b401d92b3667f6d3","attributes":{"enabled":false,"nbf":1567782017,"exp":1599405017,"created":1567782617,"updated":1567782618,"recoveryLevel":"Recoverable+Purgeable"},"tags":{"customTag":"value"},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/recoverCertificateName-canupdatethetagsofacertificate-/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1567782617,"updated":1567782617}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/recoverCertificateName-canupdatethetagsofacertificate-/pending"}}, [ 'Cache-Control',
=======
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/recoverCertificateName-canupdatethetagsofacertificate-/54435fcb2e3846b493261409642ad8a5","attributes":{"enabled":false,"nbf":1567876912,"exp":1599499912,"created":1567877512,"updated":1567877513,"recoveryLevel":"Recoverable+Purgeable"},"tags":{"customTag":"value"},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/recoverCertificateName-canupdatethetagsofacertificate-/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1567877512,"updated":1567877512}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/recoverCertificateName-canupdatethetagsofacertificate-/pending"}}, [ 'Cache-Control',
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
  '45bb793a-9466-4d99-8555-d014d77a5749',
=======
  'c1ee97e1-b698-4c82-ac41-39be868db137',
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
  'Fri, 06 Sep 2019 15:10:18 GMT',
=======
  'Sat, 07 Sep 2019 17:31:53 GMT',
>>>>>>> [KeyVault-Certificates] Tweaks to the tests
  'Connection',
  'close',
  'Content-Length',
  '1146' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/recoverCertificateName-canupdatethetagsofacertificate-/')
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
  '7fe24e4f-aaea-44f7-861f-9524a414f9f7',
=======
  'cdf2d3b1-4936-4db0-b72c-5770791889f6',
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
  'Fri, 06 Sep 2019 15:10:18 GMT',
=======
  'Sat, 07 Sep 2019 17:31:54 GMT',
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
  '3a6828e9-9456-4f95-90f9-26f9dbeb1c00',
  'x-ms-ests-server',
  '2.1.9338.12 - EUS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AuAPWrnf1ZdMhGR3MbEWsjc_aSJHAwAAANhtBNUOAAAA; expires=Sun, 06-Oct-2019 15:10:19 GMT; path=/; secure; HttpOnly',
=======
  '6a3a599d-3a45-4057-94eb-7b0d8e404400',
  'x-ms-ests-server',
  '2.1.9338.12 - SCUS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AkRgGcvBHklHtMaBxkbdpUU_aSJHAwAAAIfgBdUOAAAA; expires=Mon, 07-Oct-2019 17:31:54 GMT; path=/; secure; HttpOnly',
>>>>>>> [KeyVault-Certificates] Tweaks to the tests
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; HttpOnly',
  'Date',
<<<<<<< HEAD
  'Fri, 06 Sep 2019 15:10:18 GMT',
=======
  'Sat, 07 Sep 2019 17:31:54 GMT',
>>>>>>> [KeyVault-Certificates] Tweaks to the tests
  'Connection',
  'close',
  'Content-Length',
  '1231' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/recoverCertificateName-canupdatethetagsofacertificate-/')
  .query(true)
<<<<<<< HEAD
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/recoverCertificateName-canupdatethetagsofacertificate-/ab1620f69aa54833b401d92b3667f6d3","attributes":{"enabled":false,"nbf":1567782017,"exp":1599405017,"created":1567782617,"updated":1567782618,"recoveryLevel":"Recoverable+Purgeable"},"tags":{"customTag":"value"},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/recoverCertificateName-canupdatethetagsofacertificate-/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1567782617,"updated":1567782617}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/recoverCertificateName-canupdatethetagsofacertificate-/pending"}}, [ 'Cache-Control',
=======
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/recoverCertificateName-canupdatethetagsofacertificate-/54435fcb2e3846b493261409642ad8a5","attributes":{"enabled":false,"nbf":1567876912,"exp":1599499912,"created":1567877512,"updated":1567877513,"recoveryLevel":"Recoverable+Purgeable"},"tags":{"customTag":"value"},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/recoverCertificateName-canupdatethetagsofacertificate-/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1567877512,"updated":1567877512}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/recoverCertificateName-canupdatethetagsofacertificate-/pending"}}, [ 'Cache-Control',
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
  '5cf68011-9841-4c01-bdb8-2df64f503ead',
=======
  '30fc9861-8c90-490b-a7e5-a2ef4adaaf0c',
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
  'Fri, 06 Sep 2019 15:10:18 GMT',
=======
  'Sat, 07 Sep 2019 17:31:54 GMT',
>>>>>>> [KeyVault-Certificates] Tweaks to the tests
  'Connection',
  'close',
  'Content-Length',
  '1146' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/certificates/recoverCertificateName-canupdatethetagsofacertificate-')
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
  '039d4f08-9fa2-495f-9e08-c6d249629b64',
=======
  'bceff3c1-f5b7-4941-bf2a-9a4c5fece410',
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
  'Fri, 06 Sep 2019 15:10:19 GMT',
=======
  'Sat, 07 Sep 2019 17:31:54 GMT',
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
  '3ba0eeda-eacd-4f28-bed5-e720181e2200',
  'x-ms-ests-server',
  '2.1.9338.12 - WUS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AuAPWrnf1ZdMhGR3MbEWsjc_aSJHBAAAANhtBNUOAAAA; expires=Sun, 06-Oct-2019 15:10:19 GMT; path=/; secure; HttpOnly',
=======
  'f38c6ffd-0bcb-45b6-ac2f-ea228a6a4800',
  'x-ms-ests-server',
  '2.1.9338.12 - EUS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AkRgGcvBHklHtMaBxkbdpUU_aSJHBAAAAIfgBdUOAAAA; expires=Mon, 07-Oct-2019 17:31:55 GMT; path=/; secure; HttpOnly',
>>>>>>> [KeyVault-Certificates] Tweaks to the tests
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; HttpOnly',
  'Date',
<<<<<<< HEAD
  'Fri, 06 Sep 2019 15:10:19 GMT',
=======
  'Sat, 07 Sep 2019 17:31:55 GMT',
>>>>>>> [KeyVault-Certificates] Tweaks to the tests
  'Connection',
  'close',
  'Content-Length',
  '1231' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/certificates/recoverCertificateName-canupdatethetagsofacertificate-')
  .query(true)
<<<<<<< HEAD
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/recoverCertificateName-canupdatethetagsofacertificate-","deletedDate":1567782620,"scheduledPurgeDate":1575558620,"id":"https://keyvault_name.vault.azure.net/certificates/recoverCertificateName-canupdatethetagsofacertificate-/ab1620f69aa54833b401d92b3667f6d3","attributes":{"enabled":false,"nbf":1567782017,"exp":1599405017,"created":1567782617,"updated":1567782618,"recoveryLevel":"Recoverable+Purgeable"},"tags":{"customTag":"value"},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/recoverCertificateName-canupdatethetagsofacertificate-/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1567782617,"updated":1567782617}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/recoverCertificateName-canupdatethetagsofacertificate-/pending"}}, [ 'Cache-Control',
=======
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/recoverCertificateName-canupdatethetagsofacertificate-","deletedDate":1567877515,"scheduledPurgeDate":1575653515,"id":"https://keyvault_name.vault.azure.net/certificates/recoverCertificateName-canupdatethetagsofacertificate-/54435fcb2e3846b493261409642ad8a5","attributes":{"enabled":false,"nbf":1567876912,"exp":1599499912,"created":1567877512,"updated":1567877513,"recoveryLevel":"Recoverable+Purgeable"},"tags":{"customTag":"value"},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/recoverCertificateName-canupdatethetagsofacertificate-/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1567877512,"updated":1567877512}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/recoverCertificateName-canupdatethetagsofacertificate-/pending"}}, [ 'Cache-Control',
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
  'c0600665-7061-4361-b48f-ee0a1b5b2f03',
=======
  'dd9166f8-0725-4332-a4b0-5d867c090f4c',
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
  'Fri, 06 Sep 2019 15:10:19 GMT',
=======
  'Sat, 07 Sep 2019 17:31:55 GMT',
>>>>>>> [KeyVault-Certificates] Tweaks to the tests
  'Connection',
  'close',
  'Content-Length',
  '1345' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedcertificates/recoverCertificateName-canupdatethetagsofacertificate-')
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
  '77057356-9ba0-45e8-81b0-b587a29f4250',
  'x-ms-keyvault-service-version',
  '1.1.0.876',
  'x-ms-keyvault-network-info',
  'addr=168.62.167.138;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 06 Sep 2019 15:10:20 GMT',
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
  '761d3cf6-33d6-473e-8fa7-99ca89462000',
  'x-ms-ests-server',
  '2.1.9338.12 - WUS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AuAPWrnf1ZdMhGR3MbEWsjc_aSJHBQAAANhtBNUOAAAA; expires=Sun, 06-Oct-2019 15:10:20 GMT; path=/; secure; HttpOnly',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; HttpOnly',
  'Date',
  'Fri, 06 Sep 2019 15:10:20 GMT',
  'Connection',
  'close',
  'Content-Length',
  '1231' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedcertificates/recoverCertificateName-canupdatethetagsofacertificate-')
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
  '81174540-b539-4dd7-ac3f-8d23ae7b48fc',
  'x-ms-keyvault-service-version',
  '1.1.0.876',
  'x-ms-keyvault-network-info',
  'addr=168.62.167.138;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 06 Sep 2019 15:10:20 GMT',
  'Connection',
  'close' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedcertificates/recoverCertificateName-canupdatethetagsofacertificate-')
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
  '4ba6dcf6-0c10-4dc4-8fb0-7c35a86daacb',
=======
  '9d9642e2-45fd-4efe-a3e2-0cf650fcebca',
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
  'Fri, 06 Sep 2019 15:10:30 GMT',
=======
  'Sat, 07 Sep 2019 17:31:55 GMT',
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
  '4cc13b2f-9806-47c5-a334-cd1acb7b2100',
  'x-ms-ests-server',
  '2.1.9338.12 - WUS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AuAPWrnf1ZdMhGR3MbEWsjc_aSJHBgAAANhtBNUOAAAA; expires=Sun, 06-Oct-2019 15:10:31 GMT; path=/; secure; HttpOnly',
=======
  'ad38d0a7-983e-40b7-9523-702c911e4700',
  'x-ms-ests-server',
  '2.1.9338.12 - NCUS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AkRgGcvBHklHtMaBxkbdpUU_aSJHBQAAAIfgBdUOAAAA; expires=Mon, 07-Oct-2019 17:31:56 GMT; path=/; secure; HttpOnly',
>>>>>>> [KeyVault-Certificates] Tweaks to the tests
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; HttpOnly',
  'Date',
<<<<<<< HEAD
  'Fri, 06 Sep 2019 15:10:31 GMT',
=======
  'Sat, 07 Sep 2019 17:31:56 GMT',
>>>>>>> [KeyVault-Certificates] Tweaks to the tests
  'Connection',
  'close',
  'Content-Length',
  '1231' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedcertificates/recoverCertificateName-canupdatethetagsofacertificate-')
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
  '4a3239d8-7e12-479c-b160-cd3e095806bb',
=======
  '772a816a-5e04-458a-9429-6f8eb18f1a0a',
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
  'Fri, 06 Sep 2019 15:10:31 GMT',
=======
  'Sat, 07 Sep 2019 17:31:55 GMT',
>>>>>>> [KeyVault-Certificates] Tweaks to the tests
  'Connection',
  'close' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedcertificates/recoverCertificateName-canupdatethetagsofacertificate-')
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
  '3ddd860d-3ffa-44cf-ae85-831e68bac900',
=======
  '92586c24-6f3a-4c32-8c8d-46a36ac48386',
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
  'Fri, 06 Sep 2019 15:10:42 GMT',
=======
  'Sat, 07 Sep 2019 17:32:06 GMT',
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
  'dcf10f4d-e4e6-4ed9-b67e-8d213cc91f00',
  'x-ms-ests-server',
  '2.1.9338.12 - EUS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AuAPWrnf1ZdMhGR3MbEWsjc_aSJHBwAAANhtBNUOAAAA; expires=Sun, 06-Oct-2019 15:10:42 GMT; path=/; secure; HttpOnly',
=======
  '53780b96-a747-4fea-b1df-857440b04900',
  'x-ms-ests-server',
  '2.1.9338.12 - WUS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AkRgGcvBHklHtMaBxkbdpUU_aSJHBgAAAIfgBdUOAAAA; expires=Mon, 07-Oct-2019 17:32:07 GMT; path=/; secure; HttpOnly',
>>>>>>> [KeyVault-Certificates] Tweaks to the tests
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; HttpOnly',
  'Date',
<<<<<<< HEAD
  'Fri, 06 Sep 2019 15:10:42 GMT',
=======
  'Sat, 07 Sep 2019 17:32:07 GMT',
>>>>>>> [KeyVault-Certificates] Tweaks to the tests
  'Connection',
  'close',
  'Content-Length',
  '1231' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedcertificates/recoverCertificateName-canupdatethetagsofacertificate-')
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
  'e63a97b5-bba9-4e63-b659-ba41cb0c822c',
=======
  '0e848305-060e-4c78-b6d8-fd4079cdc191',
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
  'Fri, 06 Sep 2019 15:10:42 GMT',
=======
  'Sat, 07 Sep 2019 17:32:06 GMT',
>>>>>>> [KeyVault-Certificates] Tweaks to the tests
  'Connection',
  'close' ]);


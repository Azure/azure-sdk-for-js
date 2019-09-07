let nock = require('nock');

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates')
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
  '6c458e1a-8f6f-4d7c-a9f3-b8a61f195395',
=======
  'ef54ae6d-d4c5-408a-9d4b-0c64be27d7e5',
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
  'Fri, 06 Sep 2019 15:12:59 GMT',
=======
  'Sat, 07 Sep 2019 17:34:17 GMT',
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
  '08ae4a3b-9fed-4f5e-bf1a-f35b8e5b1c00',
  'x-ms-ests-server',
  '2.1.9338.12 - NCUS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AlOAtwGHNrtIiSYc9NSPxcY_aSJHAQAAAHtuBNUOAAAA; expires=Sun, 06-Oct-2019 15:13:00 GMT; path=/; secure; HttpOnly',
=======
  'a3713d4c-9d08-4b59-971d-6b2c71254900',
  'x-ms-ests-server',
  '2.1.9338.12 - EUS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AjsFSjZfDrdPmkqBhwZqeB0_aSJHAQAAABnhBdUOAAAA; expires=Mon, 07-Oct-2019 17:34:18 GMT; path=/; secure; HttpOnly',
>>>>>>> [KeyVault-Certificates] Tweaks to the tests
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; HttpOnly',
  'Date',
<<<<<<< HEAD
  'Fri, 06 Sep 2019 15:13:00 GMT',
=======
  'Sat, 07 Sep 2019 17:34:17 GMT',
>>>>>>> [KeyVault-Certificates] Tweaks to the tests
  'Connection',
  'close',
  'Content-Length',
  '1231' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates')
  .query(true)
  .reply(200, {"value":[{"id":"https://keyvault_name.vault.azure.net/certificates/recoverCertificateName-cancreatereadanddeleteacertificateissuer-7613630311703827","x5t":"wAP6VKjjeDoJ8xAthU8RVdq-fhg","attributes":{"enabled":true,"nbf":1567781607,"exp":1599404607,"created":1567782207,"updated":1567782207},"subject":""}],"nextLink":null}, [ 'Cache-Control',
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
  'c594ef74-2b01-4212-ac67-3ad31ad6efb2',
=======
  'a9c97ec5-eab9-4f00-9983-acedea4e2919',
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
  'Fri, 06 Sep 2019 15:13:00 GMT',
=======
  'Sat, 07 Sep 2019 17:34:17 GMT',
>>>>>>> [KeyVault-Certificates] Tweaks to the tests
  'Connection',
  'close',
  'Content-Length',
  '321' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/certificates/recoverCertificateName-cancreatereadanddeleteacertificateissuer-7613630311703827')
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
  'f2b4bc0e-93a8-42d3-93af-e71168acdb15',
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
  'Fri, 06 Sep 2019 15:13:00 GMT',
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
  'e6fcdc61-f680-4640-a675-6ec9c9db1f00',
  'x-ms-ests-server',
  '2.1.9338.12 - WUS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AlOAtwGHNrtIiSYc9NSPxcY_aSJHAgAAAHtuBNUOAAAA; expires=Sun, 06-Oct-2019 15:13:01 GMT; path=/; secure; HttpOnly',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; HttpOnly',
  'Date',
  'Fri, 06 Sep 2019 15:13:00 GMT',
  'Connection',
  'close',
  'Content-Length',
  '1231' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/certificates/recoverCertificateName-cancreatereadanddeleteacertificateissuer-7613630311703827')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/recoverCertificateName-cancreatereadanddeleteacertificateissuer-7613630311703827","deletedDate":1567782781,"scheduledPurgeDate":1575558781,"id":"https://keyvault_name.vault.azure.net/certificates/recoverCertificateName-cancreatereadanddeleteacertificateissuer-7613630311703827/3b9fbaa8860f41f782653b07f9be0d19","kid":"https://keyvault_name.vault.azure.net/keys/recoverCertificateName-cancreatereadanddeleteacertificateissuer-7613630311703827/3b9fbaa8860f41f782653b07f9be0d19","sid":"https://keyvault_name.vault.azure.net/secrets/recoverCertificateName-cancreatereadanddeleteacertificateissuer-7613630311703827/3b9fbaa8860f41f782653b07f9be0d19","x5t":"wAP6VKjjeDoJ8xAthU8RVdq-fhg","cer":"MIIDKDCCAhCgAwIBAgIQTTMMcxEUSxywsiAIr7FY6TANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMTkwOTA2MTQ1MzI3WhcNMjAwOTA2MTUwMzI3WjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQCX/vX28h+DvrDFFbdbGPGLUD5CMMR5WSv7XMlXNiMvqghbRO1CvTcUO9+zM/Um1gbxQlraXzW851QNkI48UjfVfuoxWVAV+JPwdsRGzp5txS2cQ6sZAK+sX0GxeAE9akxksOu8MX+8Le9JzjFlMNQhIZEcUCebRMA3zZxI0vCAsb4Vkjb/YP0zXFMzFpEACb85MDC7PIZd3xL2QVnkY3QQ7N+/WGKl0cYj+2qIQHBOAgx1v/eP4F3An46Wi8D+qWhcpvDz0Q7AQlnYZny9dTzAc2+5TMjUuQLCI+8iMpUY1cNw34fo2QsT5GmBnV2tB8zkOtDGkjMq9Zzak8ABs597AgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBSvvaTK6Q3gyZ6PoCMrjiIwQrEqjDAdBgNVHQ4EFgQUZbLzvf3NN6e7Z5FsF4gUVo+hH2MwDQYJKoZIhvcNAQELBQADggEBABHcwt+hZr7JTZnjHDxb62PViPX5lfr78QUyMnaOL1ZWa0NoQlTMwfh1piwLQ5Hf1VvgGE1FJoxlLAKTrwLLCgtYbXqPHxEZvmGl/cVxPfX2vm2GDdxA5dzfo3Z7VUzABcu+1rohl1krCPwskS4VuuCqQZDm4nO7t4762vw42tY3+qb2p9v+o1R5Ot11XQF7U6lvV4NO4VJIQfWCg1jvaOaGR1/sNZtWgBkc3czXUmfiLaSOkPHIxkIrWZTGUbo0xMMmB1BOiY9jxtZrBEjzuSDBtKs32pcqV1HcHFEWhNs3DuZfy39BgQYBF/zr7O3Y8GXe4GLpz7oOflfZ1aLfV7I=","attributes":{"enabled":true,"nbf":1567781607,"exp":1599404607,"created":1567782207,"updated":1567782207,"recoveryLevel":"Recoverable+Purgeable"},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/recoverCertificateName-cancreatereadanddeleteacertificateissuer-7613630311703827/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"recoverCertificateName-cancreatereadanddeleteacertificateissuer-7613630311703827"},"attributes":{"enabled":true,"created":1567782191,"updated":1567782191}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/recoverCertificateName-cancreatereadanddeleteacertificateissuer-7613630311703827/pending"}}, [ 'Cache-Control',
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
  '1c55e098-bcc3-4494-9625-74ea97785c16',
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
  'Fri, 06 Sep 2019 15:13:00 GMT',
  'Connection',
  'close',
  'Content-Length',
  '2889' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedcertificates/recoverCertificateName-cancreatereadanddeleteacertificateissuer-7613630311703827')
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
  '44cdfd23-3d31-41f7-bf21-a99dc4e1ebcb',
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
  'Fri, 06 Sep 2019 15:13:01 GMT',
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
  '08ae4a3b-9fed-4f5e-bf1a-f35bd25b1c00',
  'x-ms-ests-server',
  '2.1.9338.12 - NCUS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AlOAtwGHNrtIiSYc9NSPxcY_aSJHAwAAAHtuBNUOAAAA; expires=Sun, 06-Oct-2019 15:13:01 GMT; path=/; secure; HttpOnly',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; HttpOnly',
  'Date',
  'Fri, 06 Sep 2019 15:13:01 GMT',
  'Connection',
  'close',
  'Content-Length',
  '1231' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedcertificates/recoverCertificateName-cancreatereadanddeleteacertificateissuer-7613630311703827')
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
  '75f394d7-d768-4df9-9041-4e549e247fb2',
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
  'Fri, 06 Sep 2019 15:13:01 GMT',
  'Connection',
  'close' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedcertificates/recoverCertificateName-cancreatereadanddeleteacertificateissuer-7613630311703827')
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
  '9bcdc619-982d-4867-86c2-87121c1fb2d1',
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
  'Fri, 06 Sep 2019 15:13:11 GMT',
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
  'a07ddf47-8b38-461b-b57c-122e9ecc1b00',
  'x-ms-ests-server',
  '2.1.9338.12 - SCUS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AlOAtwGHNrtIiSYc9NSPxcY_aSJHBAAAAHtuBNUOAAAA; expires=Sun, 06-Oct-2019 15:13:12 GMT; path=/; secure; HttpOnly',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; HttpOnly',
  'Date',
  'Fri, 06 Sep 2019 15:13:12 GMT',
  'Connection',
  'close',
  'Content-Length',
  '1231' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedcertificates/recoverCertificateName-cancreatereadanddeleteacertificateissuer-7613630311703827')
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
  'a79d1a57-2fd1-4867-ad0d-b68ba227dfbb',
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
  'Fri, 06 Sep 2019 15:13:12 GMT',
  'Connection',
  'close' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates')
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
  '6b281db9-3622-49ef-a581-5616518abdb2',
=======
  '4f5f5ef0-13af-4fad-8a46-b99cc780a865',
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
  'Fri, 06 Sep 2019 15:13:12 GMT',
=======
  'Sat, 07 Sep 2019 17:34:18 GMT',
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
  '7e2bdb5f-2171-47b6-ac36-05b2e77e1c00',
=======
  '0f358fcd-6f93-4e2f-8732-43f9c1744200',
>>>>>>> [KeyVault-Certificates] Tweaks to the tests
  'x-ms-ests-server',
  '2.1.9338.12 - SCUS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
<<<<<<< HEAD
  'fpc=AlOAtwGHNrtIiSYc9NSPxcY_aSJHBQAAAHtuBNUOAAAA; expires=Sun, 06-Oct-2019 15:13:13 GMT; path=/; secure; HttpOnly',
=======
  'fpc=AjsFSjZfDrdPmkqBhwZqeB0_aSJHAgAAABnhBdUOAAAA; expires=Mon, 07-Oct-2019 17:34:18 GMT; path=/; secure; HttpOnly',
>>>>>>> [KeyVault-Certificates] Tweaks to the tests
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; HttpOnly',
  'Date',
<<<<<<< HEAD
  'Fri, 06 Sep 2019 15:13:13 GMT',
=======
  'Sat, 07 Sep 2019 17:34:18 GMT',
>>>>>>> [KeyVault-Certificates] Tweaks to the tests
  'Connection',
  'close',
  'Content-Length',
  '1231' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates')
  .query(true)
  .reply(200, {"value":[{"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/recoverCertificateName-canlistcertificates-83422293535813631","deletedDate":1567782111,"scheduledPurgeDate":1575558111,"id":"https://keyvault_name.vault.azure.net/certificates/recoverCertificateName-canlistcertificates-83422293535813631","x5t":"Bjq3r6R-6GCbXO5zMo89pbeBqb0","attributes":{"enabled":true,"nbf":1567781500,"exp":1599404500,"created":1567782100,"updated":1567782100,"recoveryLevel":"Recoverable+Purgeable"}}],"nextLink":null}, [ 'Cache-Control',
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
  '045ebbd1-c4b8-495a-8522-13c1ee2748ba',
=======
  'bf1e42fd-ed65-41ee-b726-93145a024f59',
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
  'Fri, 06 Sep 2019 15:13:13 GMT',
=======
  'Sat, 07 Sep 2019 17:34:18 GMT',
>>>>>>> [KeyVault-Certificates] Tweaks to the tests
  'Connection',
  'close',
  'Content-Length',
  '517' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedcertificates/recoverCertificateName-canlistcertificates-83422293535813631')
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
  '6b812ece-1cc4-445a-b878-9fb110b96953',
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
  'Fri, 06 Sep 2019 15:13:13 GMT',
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
  '5b8500cc-92b0-433f-94b8-63dfd3d41d00',
  'x-ms-ests-server',
  '2.1.9338.12 - EUS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AlOAtwGHNrtIiSYc9NSPxcY_aSJHBgAAAHtuBNUOAAAA; expires=Sun, 06-Oct-2019 15:13:14 GMT; path=/; secure; HttpOnly',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; HttpOnly',
  'Date',
  'Fri, 06 Sep 2019 15:13:13 GMT',
  'Connection',
  'close',
  'Content-Length',
  '1231' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedcertificates/recoverCertificateName-canlistcertificates-83422293535813631')
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
  'fb13f135-6d8a-4265-a3d0-6a3495b10fd8',
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
  'Fri, 06 Sep 2019 15:13:14 GMT',
  'Connection',
  'close' ]);


let nock = require('nock');

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/certificates/recoverCertificateName-canlistdeletedcertificates-0/create')
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
  'ae828bfa-8255-4cdd-b280-c5794dc04b59',
=======
  '0fcc32da-e702-4d24-8240-7b7fef9d089b',
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
  'Fri, 06 Sep 2019 15:13:44 GMT',
=======
  'Sat, 07 Sep 2019 17:35:00 GMT',
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
  '53780b96-a747-4fea-b1df-8574dd102100',
  'x-ms-ests-server',
  '2.1.9338.12 - WUS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AseIF-KNsxBHpcoWjZ3Vwug_aSJHAQAAAKhuBNUOAAAA; expires=Sun, 06-Oct-2019 15:13:44 GMT; path=/; secure; HttpOnly',
=======
  '3c8b2fab-7ecd-421c-8634-909285514400',
  'x-ms-ests-server',
  '2.1.9338.12 - SCUS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AplrJaJWW01Co34UML9hR1U_aSJHAQAAAEThBdUOAAAA; expires=Mon, 07-Oct-2019 17:35:00 GMT; path=/; secure; HttpOnly',
>>>>>>> [KeyVault-Certificates] Tweaks to the tests
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; HttpOnly',
  'Date',
<<<<<<< HEAD
  'Fri, 06 Sep 2019 15:13:44 GMT',
=======
  'Sat, 07 Sep 2019 17:35:00 GMT',
>>>>>>> [KeyVault-Certificates] Tweaks to the tests
  'Connection',
  'close',
  'Content-Length',
  '1231' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/certificates/recoverCertificateName-canlistdeletedcertificates-0/create', {"policy":{"x509_props":{"subject":"cn=MyCert"},"issuer":{"name":"Self"}},"attributes":{}})
  .query(true)
<<<<<<< HEAD
  .reply(202, {"id":"https://keyvault_name.vault.azure.net/certificates/recoverCertificateName-canlistdeletedcertificates-0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEApHS5U7+yiqSZM+CUPyCbYVhx+0FgjHv+1dWHoYxlaaWwhjOraghQy3cjylQHxbIvxz9W/oN8uxX+v/EG8b5+x0nKuO9LAfdgF+AWlT/sQ7jqBZ1+Utnm7H/EiRLWO/dCBQHQ0dtfEycoGgTFJ8U8Q5W5V1gz4WxP5DTSHdafbFYvNwc9sEa0zSfNykJu8Xf5zMQYiB2bZVXIo92fdqu/VmniZZTIwhXdaZIVT0o3LUInzNJ8Yes23HU2KTAEUO5Buv7dUBt9voiSbMCOAIBpXxf1Sa/Q5fe0mUghNpmzxA1V4djSh6857A198FHfLoK+t/N9tsL4tbl/tw0G80e7DQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAHGYRtdmqK8xNqy+S9VmmT+mONTKcVf6DDccH3cd/DXMdPiubCZq1rvp1vk7g2L685mLo6GauqeklQAKf2mKj+lGabPBu/ZnaK6oZArPgI2YZzNmyJ985t3zu8EL8TmNhJWX4AdwYZ+Edoj4PXRU8PsuWIrVI92b81zC4UKgrkklKZRQi/68Yk8UIPoNw2XuREYzzbPflHSUOiwU0Adl1HRRwlPXW50dvELgaf6YgZEHr3URAIj6GzDpsiD+hq4QxKMMGnSve2l8Yo8hli75jcptpwtQeztOrzkpbRah8LXGXfMdoy3T/o8DuCA8sI2RaI+T3oiy1qDa3zKc9peh0N8=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"09c84c9faf3943fb87939ad3943d58b2"}, [ 'Cache-Control',
=======
  .reply(202, {"id":"https://keyvault_name.vault.azure.net/certificates/recoverCertificateName-canlistdeletedcertificates-0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAwFxRJICcJn+EftEU88XgZpjaKwC80NhIUG2pJFAwcmpfAfotuW0MXHSb+uCsfo0MxRmwoRFIUa1pC8uUKrGngcNDcWJqgqv2utY3+uBaCfPcueWEGtfyMt8yIX9fVu+NhEpfcFT//KcAJsIwleTAsN4xmrjaH3ug0aGPi5JsQvl7X+2ExvTgzIed0dRWCvUxXlfHA+dnONU1xtYGh575n48q9c7GOJG8SpEEBn4Y3kLlAApG2uHX9S1d0EZ4z2JbEIvJ7u27nOVLlHKBuDBqtnYsc72yS/9ZG6XD04FcMlMbDf2Y3E4fqh2nx4jxdHxMB4zaU21/w37SGluVsFSq9QIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAIPS5374H86wGS6sx615jQcuqB0tsGISQ2lU9YlP6qMeqJatqv68236NTbZyP4hHa9QLlDVt3hgFfBWwguJCR0meh0Ng+kDCVlPGjjokWeNwlBjOB8tOJ57qdpPp8r6OCq2D4GDwuRhw6iKgx3PhXa1Iq5F35qy9Uhy+1xPYuIY31HPxQGMdIe9Hp+/nw+XZFkFlN+4G5DbIIHjJA3hTKkyw9mZhEyfKyhClMEaw+KATp/Ad/a03OUsSBJl/R8UBbrUKhFJoCV/F/3CVEQFGrLWrbD2usH5JJ6owveA34k1/eOd76nG7kqhNh8CeUB+grT63MUrZX8d3fSDZSXcbQVk=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"221f0c0f2113479994205d46755c0031"}, [ 'Cache-Control',
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
  'https://keyvault_name.vault.azure.net/certificates/recoverCertificateName-canlistdeletedcertificates-0/pending?api-version=7.0&request_id=09c84c9faf3943fb87939ad3943d58b2',
=======
  'https://keyvault_name.vault.azure.net/certificates/recoverCertificateName-canlistdeletedcertificates-0/pending?api-version=7.0&request_id=221f0c0f2113479994205d46755c0031',
>>>>>>> [KeyVault-Certificates] Tweaks to the tests
  'Retry-After',
  '10',
  'Server',
  'Microsoft-IIS/10.0',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
<<<<<<< HEAD
  '03168c01-fdf2-423d-b677-565bc3fa2fb1',
=======
  '9b0c3a9c-644c-4075-ad32-5fdbeb4e29fc',
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
  'Fri, 06 Sep 2019 15:13:45 GMT',
=======
  'Sat, 07 Sep 2019 17:35:00 GMT',
>>>>>>> [KeyVault-Certificates] Tweaks to the tests
  'Connection',
  'close',
  'Content-Length',
  '1336' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/certificates/recoverCertificateName-canlistdeletedcertificates-1/create')
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
  'e87bde25-d27c-4dce-b0e6-8dcbcb04ef9b',
=======
  'b14644f7-a993-4428-ad35-44719e344694',
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
  'Fri, 06 Sep 2019 15:13:45 GMT',
=======
  'Sat, 07 Sep 2019 17:35:01 GMT',
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
  'a17d8464-ccd2-494c-9845-a8dea2b81c00',
  'x-ms-ests-server',
  '2.1.9338.12 - NCUS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AseIF-KNsxBHpcoWjZ3Vwug_aSJHAgAAAKhuBNUOAAAA; expires=Sun, 06-Oct-2019 15:13:46 GMT; path=/; secure; HttpOnly',
=======
  'f38c6ffd-0bcb-45b6-ac2f-ea22c97f4800',
  'x-ms-ests-server',
  '2.1.9338.12 - EUS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AplrJaJWW01Co34UML9hR1U_aSJHAgAAAEThBdUOAAAA; expires=Mon, 07-Oct-2019 17:35:02 GMT; path=/; secure; HttpOnly',
>>>>>>> [KeyVault-Certificates] Tweaks to the tests
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; HttpOnly',
  'Date',
<<<<<<< HEAD
  'Fri, 06 Sep 2019 15:13:46 GMT',
=======
  'Sat, 07 Sep 2019 17:35:01 GMT',
>>>>>>> [KeyVault-Certificates] Tweaks to the tests
  'Connection',
  'close',
  'Content-Length',
  '1231' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/certificates/recoverCertificateName-canlistdeletedcertificates-1/create', {"policy":{"x509_props":{"subject":"cn=MyCert"},"issuer":{"name":"Self"}},"attributes":{}})
  .query(true)
<<<<<<< HEAD
  .reply(202, {"id":"https://keyvault_name.vault.azure.net/certificates/recoverCertificateName-canlistdeletedcertificates-1/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAvrdg1eFAHhc+P8XizDut+58W9DPVsGWUoShktmYd381S69faSmPAOQtOkvwE0/Gi1ZjifeaRbGvMuAS0UeErYLOEANwZB+eNJAncqV0A/agn10Jpn/zd1ISDuMojRXLMEmw5i3F50wjaczU/xEU667Ha3J+1aCG+Kp+Gh0MC4LA8hBMPOQ1BdckvWjCVCncxUCPxznM1TJEcPKhvuruL721EsFuVNeUFQyMqyNEMw7G58XpQcI8NGxUtZFPRl8bS9Bw8XRCOGUd6b+vNUDpRFiHNb2HrGFIeKiJRN1XagePaXPmyt9/ruo+cTgrKvV877Rb1efRQpBwsnWhGaY9NJQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBABT6Cgs+ykgl2rBBmJWNOXt8V5TIhtzHKpiuxxXbRxM8779bKIwNzZIIivolSHhzUJ8f+y1yZ4qMjfNZaivL/x6MjH+r0kjzK5q8TGvMDsM1UTK0GGVpS5m6fyH0RK5QxUPfxDziIfrNl/S+OJmX+fkW2eJ4B5Ylw/zTl9D1OrPz9dtw3vN+VeQzDyibVQEgXYaAmmUXYPI4NWxg0mfWTfGHbbczdLdiLuzB+gkAOjwqH5JSdRObBhRkSlmT5+YU9uC8Ltx0tyyq29I1gbliKj7cp/5WIt6S/yMVpscZNhf9RaFESZjFatMTQBUvJ2IiQ0US1EmqP+RRW0wdAANLu9g=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"a3c4d2cd270346bc83bb10f8e3b7aa53"}, [ 'Cache-Control',
=======
  .reply(202, {"id":"https://keyvault_name.vault.azure.net/certificates/recoverCertificateName-canlistdeletedcertificates-1/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAmHJe8dAIApihe46VNsUAqDqALMzfjUuAyyFvqgS80Ebfcdl2aKbe7xg+CWwrn6e/uWEjMNquA+pktD+WmqzsWxuouRJAkfsj6tp8/nTHqhi0NrdrMpFFm7pcUPZWYF+ZoRWlkh3maDRkNLwBw/wEIhymWyeyBah7iLmYYGwbJloR9goyzxrvXPVPU/fwbZj+5if+KlccHC+6S/as439eEBvgJDLzpF3UfZEJTXzabyD58k/sENBexHxFB15VH7PdS3/ZK2fXZnZpwZRbQx0RbYiF20rimFRp+J1mG9g6mAxPGqeYbVOTN8t8GEL7HDAUmaI5NzFYzD8i7C7OOwEwowIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAAZzzpWfXRRB9W3t8bM5VxSTGIkAkGFXAIYuQZPYBaKDj/xeheIitkpNNqNDdiuX5Nmqvh0eeaLRAn+mcJYDcnKvbP8leNIUs+4+iwKakCBJnaAA2D/GJY+F/ZGTA3UL1uobAHOY9dSUPWFqzHXSLuP+2u0TMVjSWF+HgWyaYi357DncAsnaXFV3RdPLslIguut7aIkAC81lx8b0l1R4ndCkTXiH1AWwR6CQ604eCkE2ZshoWIiIf09cRrBsVj8UKVaktnjGXDKDt7aLQxCivoTMJ4Uu1sQZvfkf7QrGdloJqoTfkCuNvTYSKshErdyDZzWCOSL3u92G+D9DyZWoR/o=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"0320abdf62f646198787504db2817e3a"}, [ 'Cache-Control',
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
  'https://keyvault_name.vault.azure.net/certificates/recoverCertificateName-canlistdeletedcertificates-1/pending?api-version=7.0&request_id=a3c4d2cd270346bc83bb10f8e3b7aa53',
=======
  'https://keyvault_name.vault.azure.net/certificates/recoverCertificateName-canlistdeletedcertificates-1/pending?api-version=7.0&request_id=0320abdf62f646198787504db2817e3a',
>>>>>>> [KeyVault-Certificates] Tweaks to the tests
  'Retry-After',
  '10',
  'Server',
  'Microsoft-IIS/10.0',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
<<<<<<< HEAD
  '7939c2a7-ed0a-4497-b4f5-5bc195825a9c',
=======
  'cc71d033-8958-455a-bbef-a3303fb28fdf',
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
  'Fri, 06 Sep 2019 15:13:46 GMT',
=======
  'Sat, 07 Sep 2019 17:35:02 GMT',
>>>>>>> [KeyVault-Certificates] Tweaks to the tests
  'Connection',
  'close',
  'Content-Length',
  '1336' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/certificates/recoverCertificateName-canlistdeletedcertificates-0')
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
  '15d4afa6-e956-4a62-8c90-167e6ba55c18',
=======
  'db3a0b3e-a44d-41fc-91e5-0f9396691a7d',
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
  'Fri, 06 Sep 2019 15:13:46 GMT',
=======
  'Sat, 07 Sep 2019 17:35:03 GMT',
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
  '08ae4a3b-9fed-4f5e-bf1a-f35b0c611c00',
  'x-ms-ests-server',
  '2.1.9338.12 - NCUS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AseIF-KNsxBHpcoWjZ3Vwug_aSJHAwAAAKhuBNUOAAAA; expires=Sun, 06-Oct-2019 15:13:47 GMT; path=/; secure; HttpOnly',
=======
  '931d470e-fe97-4136-853d-a24f961b4800',
  'x-ms-ests-server',
  '2.1.9338.12 - EUS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AplrJaJWW01Co34UML9hR1U_aSJHAwAAAEThBdUOAAAA; expires=Mon, 07-Oct-2019 17:35:03 GMT; path=/; secure; HttpOnly',
>>>>>>> [KeyVault-Certificates] Tweaks to the tests
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; HttpOnly',
  'Date',
<<<<<<< HEAD
  'Fri, 06 Sep 2019 15:13:47 GMT',
=======
  'Sat, 07 Sep 2019 17:35:02 GMT',
>>>>>>> [KeyVault-Certificates] Tweaks to the tests
  'Connection',
  'close',
  'Content-Length',
  '1231' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/certificates/recoverCertificateName-canlistdeletedcertificates-0')
  .query(true)
<<<<<<< HEAD
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/recoverCertificateName-canlistdeletedcertificates-0","deletedDate":1567782828,"scheduledPurgeDate":1575558828,"id":"https://keyvault_name.vault.azure.net/certificates/recoverCertificateName-canlistdeletedcertificates-0/552fcbdd062d4f25b270c9293ea8a5a2","attributes":{"enabled":false,"nbf":1567782225,"exp":1599405225,"created":1567782825,"updated":1567782825,"recoveryLevel":"Recoverable+Purgeable"},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/recoverCertificateName-canlistdeletedcertificates-0/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1567782825,"updated":1567782825}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/recoverCertificateName-canlistdeletedcertificates-0/pending"}}, [ 'Cache-Control',
=======
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/recoverCertificateName-canlistdeletedcertificates-0","deletedDate":1567877703,"scheduledPurgeDate":1575653703,"id":"https://keyvault_name.vault.azure.net/certificates/recoverCertificateName-canlistdeletedcertificates-0/31c18db34fd14529a707b29ca7585e30","attributes":{"enabled":false,"nbf":1567877101,"exp":1599500101,"created":1567877701,"updated":1567877701,"recoveryLevel":"Recoverable+Purgeable"},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/recoverCertificateName-canlistdeletedcertificates-0/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1567877701,"updated":1567877701}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/recoverCertificateName-canlistdeletedcertificates-0/pending"}}, [ 'Cache-Control',
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
  '1f1d808f-226f-4189-ac8f-fdc37c0737b2',
=======
  '67b93864-33c2-4d4d-8903-c15b59ad3eed',
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
  'Fri, 06 Sep 2019 15:13:47 GMT',
=======
  'Sat, 07 Sep 2019 17:35:03 GMT',
>>>>>>> [KeyVault-Certificates] Tweaks to the tests
  'Connection',
  'close',
  'Content-Length',
  '1304' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/certificates/recoverCertificateName-canlistdeletedcertificates-1')
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
  '51167e32-6cd6-4128-b1b4-ced5ab3065e4',
=======
  '2490ea86-631e-4f43-89d6-563092708445',
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
  'Fri, 06 Sep 2019 15:13:48 GMT',
=======
  'Sat, 07 Sep 2019 17:35:03 GMT',
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
  'fe28ad14-644f-4d4e-80ce-a829b4351e00',
  'x-ms-ests-server',
  '2.1.9338.12 - NCUS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AseIF-KNsxBHpcoWjZ3Vwug_aSJHBAAAAKhuBNUOAAAA; expires=Sun, 06-Oct-2019 15:13:48 GMT; path=/; secure; HttpOnly',
=======
  'a07ddf47-8b38-461b-b57c-122efccc4300',
  'x-ms-ests-server',
  '2.1.9338.12 - SCUS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AplrJaJWW01Co34UML9hR1U_aSJHBAAAAEThBdUOAAAA; expires=Mon, 07-Oct-2019 17:35:04 GMT; path=/; secure; HttpOnly',
>>>>>>> [KeyVault-Certificates] Tweaks to the tests
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; HttpOnly',
  'Date',
<<<<<<< HEAD
  'Fri, 06 Sep 2019 15:13:47 GMT',
=======
  'Sat, 07 Sep 2019 17:35:03 GMT',
>>>>>>> [KeyVault-Certificates] Tweaks to the tests
  'Connection',
  'close',
  'Content-Length',
  '1231' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/certificates/recoverCertificateName-canlistdeletedcertificates-1')
  .query(true)
<<<<<<< HEAD
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/recoverCertificateName-canlistdeletedcertificates-1","deletedDate":1567782828,"scheduledPurgeDate":1575558828,"id":"https://keyvault_name.vault.azure.net/certificates/recoverCertificateName-canlistdeletedcertificates-1/5cae92c22882470783e3478c412371fa","attributes":{"enabled":false,"nbf":1567782226,"exp":1599405226,"created":1567782826,"updated":1567782826,"recoveryLevel":"Recoverable+Purgeable"},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/recoverCertificateName-canlistdeletedcertificates-1/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1567782827,"updated":1567782827}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/recoverCertificateName-canlistdeletedcertificates-1/pending"}}, [ 'Cache-Control',
=======
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/recoverCertificateName-canlistdeletedcertificates-1","deletedDate":1567877704,"scheduledPurgeDate":1575653704,"id":"https://keyvault_name.vault.azure.net/certificates/recoverCertificateName-canlistdeletedcertificates-1/e5e7bf80b1304f80994e008930d7e00f","attributes":{"enabled":false,"nbf":1567877102,"exp":1599500102,"created":1567877702,"updated":1567877702,"recoveryLevel":"Recoverable+Purgeable"},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/recoverCertificateName-canlistdeletedcertificates-1/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1567877702,"updated":1567877702}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/recoverCertificateName-canlistdeletedcertificates-1/pending"}}, [ 'Cache-Control',
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
  '8aafb3c9-8ee2-45f4-a048-81b8836ea814',
=======
  'cf7364f3-ffea-4e4b-becc-3123847d7ff5',
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
  'Fri, 06 Sep 2019 15:13:48 GMT',
=======
  'Sat, 07 Sep 2019 17:35:04 GMT',
>>>>>>> [KeyVault-Certificates] Tweaks to the tests
  'Connection',
  'close',
  'Content-Length',
  '1304' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/recoverCertificateName-canlistdeletedcertificates-0')
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
  'cbeb3e9d-7d88-4223-bc82-78e315950d62',
=======
  '705cd66a-97ef-4525-89d6-47d10525d62f',
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
  'Fri, 06 Sep 2019 15:13:48 GMT',
=======
  'Sat, 07 Sep 2019 17:35:04 GMT',
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
  'a3713d4c-9d08-4b59-971d-6b2ce4f71e00',
=======
  '3ecd6a1c-3b6d-4adc-9a2d-cb4c73e14a00',
>>>>>>> [KeyVault-Certificates] Tweaks to the tests
  'x-ms-ests-server',
  '2.1.9338.12 - EUS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
<<<<<<< HEAD
  'fpc=AseIF-KNsxBHpcoWjZ3Vwug_aSJHBQAAAKhuBNUOAAAA; expires=Sun, 06-Oct-2019 15:13:49 GMT; path=/; secure; HttpOnly',
=======
  'fpc=AplrJaJWW01Co34UML9hR1U_aSJHBQAAAEThBdUOAAAA; expires=Mon, 07-Oct-2019 17:35:05 GMT; path=/; secure; HttpOnly',
>>>>>>> [KeyVault-Certificates] Tweaks to the tests
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; HttpOnly',
  'Date',
<<<<<<< HEAD
  'Fri, 06 Sep 2019 15:13:49 GMT',
=======
  'Sat, 07 Sep 2019 17:35:04 GMT',
>>>>>>> [KeyVault-Certificates] Tweaks to the tests
  'Connection',
  'close',
  'Content-Length',
  '1231' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/recoverCertificateName-canlistdeletedcertificates-0')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: recoverCertificateName-canlistdeletedcertificates-0"}}, [ 'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '151',
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
  'cb39fccd-724d-4038-9b90-ef2d556907a7',
=======
  '428860bf-7a03-4e4c-93e2-43a0b893362d',
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
  'Fri, 06 Sep 2019 15:13:48 GMT',
=======
  'Sat, 07 Sep 2019 17:35:05 GMT',
>>>>>>> [KeyVault-Certificates] Tweaks to the tests
  'Connection',
  'close' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/recoverCertificateName-canlistdeletedcertificates-0')
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
  'c1558868-7f39-4a23-bc87-d9b98438651f',
=======
  '02b7695a-c47f-4b92-982b-cec9ddac64d3',
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
  'Fri, 06 Sep 2019 15:13:59 GMT',
=======
  'Sat, 07 Sep 2019 17:35:15 GMT',
>>>>>>> [KeyVault-Certificates] Tweaks to the tests
  'Connection',
  'close' ]);


nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fvault.azure.net%2F.default")
<<<<<<< HEAD
  .reply(200, {"token_type":"Bearer","expires_in":3600,"ext_expires_in":3600,"access_token":"access_token"}, [ 'Cache-Control',
=======
  .reply(200, {"token_type":"Bearer","expires_in":3599,"ext_expires_in":3599,"access_token":"access_token"}, [ 'Cache-Control',
>>>>>>> [KeyVault-Certificates] Tweaks to the tests
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
  'a07ddf47-8b38-461b-b57c-122e05d21b00',
  'x-ms-ests-server',
  '2.1.9338.12 - SCUS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AseIF-KNsxBHpcoWjZ3Vwug_aSJHBgAAAKhuBNUOAAAA; expires=Sun, 06-Oct-2019 15:14:00 GMT; path=/; secure; HttpOnly',
=======
  '53780b96-a747-4fea-b1df-85741dc64900',
  'x-ms-ests-server',
  '2.1.9338.12 - WUS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AplrJaJWW01Co34UML9hR1U_aSJHBgAAAEThBdUOAAAA; expires=Mon, 07-Oct-2019 17:35:16 GMT; path=/; secure; HttpOnly',
>>>>>>> [KeyVault-Certificates] Tweaks to the tests
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; HttpOnly',
  'Date',
<<<<<<< HEAD
  'Fri, 06 Sep 2019 15:13:59 GMT',
  'Connection',
  'close',
  'Content-Length',
  '1231' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/recoverCertificateName-canlistdeletedcertificates-0')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/recoverCertificateName-canlistdeletedcertificates-0","deletedDate":1567782828,"scheduledPurgeDate":1575558828,"id":"https://keyvault_name.vault.azure.net/certificates/recoverCertificateName-canlistdeletedcertificates-0/552fcbdd062d4f25b270c9293ea8a5a2","attributes":{"enabled":false,"nbf":1567782225,"exp":1599405225,"created":1567782825,"updated":1567782825,"recoveryLevel":"Recoverable+Purgeable"},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/recoverCertificateName-canlistdeletedcertificates-0/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1567782825,"updated":1567782825}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/recoverCertificateName-canlistdeletedcertificates-0/pending"}}, [ 'Cache-Control',
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
  'afc50d5f-1400-49d0-b5a5-71c5cd79cd58',
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
  'Fri, 06 Sep 2019 15:14:00 GMT',
  'Connection',
  'close',
  'Content-Length',
=======
  'Sat, 07 Sep 2019 17:35:16 GMT',
  'Connection',
  'close',
  'Content-Length',
  '1231' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/recoverCertificateName-canlistdeletedcertificates-0')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/recoverCertificateName-canlistdeletedcertificates-0","deletedDate":1567877703,"scheduledPurgeDate":1575653703,"id":"https://keyvault_name.vault.azure.net/certificates/recoverCertificateName-canlistdeletedcertificates-0/31c18db34fd14529a707b29ca7585e30","attributes":{"enabled":false,"nbf":1567877101,"exp":1599500101,"created":1567877701,"updated":1567877701,"recoveryLevel":"Recoverable+Purgeable"},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/recoverCertificateName-canlistdeletedcertificates-0/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1567877701,"updated":1567877701}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/recoverCertificateName-canlistdeletedcertificates-0/pending"}}, [ 'Cache-Control',
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
  'c0b4245b-9f15-4222-b763-ac98f61f5e2f',
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
  'Sat, 07 Sep 2019 17:35:15 GMT',
  'Connection',
  'close',
  'Content-Length',
>>>>>>> [KeyVault-Certificates] Tweaks to the tests
  '1304' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/recoverCertificateName-canlistdeletedcertificates-1')
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
  '0f6b1f19-c26d-43fb-b8e4-33d86f85e3dd',
=======
  'f3bf48df-8fc8-44e6-9628-c20f51853815',
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
  'Fri, 06 Sep 2019 15:14:00 GMT',
=======
  'Sat, 07 Sep 2019 17:35:16 GMT',
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
  '8afc129c-0bdf-4fe2-8022-ba1197881e00',
=======
  '08555249-e534-4c17-9d86-359463f34500',
>>>>>>> [KeyVault-Certificates] Tweaks to the tests
  'x-ms-ests-server',
  '2.1.9338.12 - SCUS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
<<<<<<< HEAD
  'fpc=AseIF-KNsxBHpcoWjZ3Vwug_aSJHBwAAAKhuBNUOAAAA; expires=Sun, 06-Oct-2019 15:14:01 GMT; path=/; secure; HttpOnly',
=======
  'fpc=AplrJaJWW01Co34UML9hR1U_aSJHBwAAAEThBdUOAAAA; expires=Mon, 07-Oct-2019 17:35:17 GMT; path=/; secure; HttpOnly',
>>>>>>> [KeyVault-Certificates] Tweaks to the tests
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; HttpOnly',
  'Date',
<<<<<<< HEAD
  'Fri, 06 Sep 2019 15:14:00 GMT',
=======
  'Sat, 07 Sep 2019 17:35:16 GMT',
>>>>>>> [KeyVault-Certificates] Tweaks to the tests
  'Connection',
  'close',
  'Content-Length',
  '1231' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/recoverCertificateName-canlistdeletedcertificates-1')
  .query(true)
<<<<<<< HEAD
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/recoverCertificateName-canlistdeletedcertificates-1","deletedDate":1567782828,"scheduledPurgeDate":1575558828,"id":"https://keyvault_name.vault.azure.net/certificates/recoverCertificateName-canlistdeletedcertificates-1/5cae92c22882470783e3478c412371fa","attributes":{"enabled":false,"nbf":1567782226,"exp":1599405226,"created":1567782826,"updated":1567782826,"recoveryLevel":"Recoverable+Purgeable"},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/recoverCertificateName-canlistdeletedcertificates-1/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1567782827,"updated":1567782827}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/recoverCertificateName-canlistdeletedcertificates-1/pending"}}, [ 'Cache-Control',
=======
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/recoverCertificateName-canlistdeletedcertificates-1","deletedDate":1567877704,"scheduledPurgeDate":1575653704,"id":"https://keyvault_name.vault.azure.net/certificates/recoverCertificateName-canlistdeletedcertificates-1/e5e7bf80b1304f80994e008930d7e00f","attributes":{"enabled":false,"nbf":1567877102,"exp":1599500102,"created":1567877702,"updated":1567877702,"recoveryLevel":"Recoverable+Purgeable"},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/recoverCertificateName-canlistdeletedcertificates-1/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1567877702,"updated":1567877702}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/recoverCertificateName-canlistdeletedcertificates-1/pending"}}, [ 'Cache-Control',
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
  'b353a0f6-c909-4f4a-8f55-1828d6d79792',
=======
  '6f3700d3-2e23-4f35-bf09-b53effabe811',
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
  'Fri, 06 Sep 2019 15:14:01 GMT',
=======
  'Sat, 07 Sep 2019 17:35:16 GMT',
>>>>>>> [KeyVault-Certificates] Tweaks to the tests
  'Connection',
  'close',
  'Content-Length',
  '1304' ]);


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
  'f65b211b-4f09-417e-b155-05a2ff7dbcbc',
=======
  '8413bb30-22c7-4b91-912b-9f6b3f94a62c',
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
  'Fri, 06 Sep 2019 15:14:01 GMT',
=======
  'Sat, 07 Sep 2019 17:35:17 GMT',
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
  '84e6c1d5-dbb6-405b-a6b9-75f744ef1c00',
=======
  '7e2bdb5f-2171-47b6-ac36-05b28fca4500',
>>>>>>> [KeyVault-Certificates] Tweaks to the tests
  'x-ms-ests-server',
  '2.1.9338.12 - SCUS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
<<<<<<< HEAD
  'fpc=AseIF-KNsxBHpcoWjZ3Vwug_aSJHCAAAAKhuBNUOAAAA; expires=Sun, 06-Oct-2019 15:14:01 GMT; path=/; secure; HttpOnly',
=======
  'fpc=AplrJaJWW01Co34UML9hR1U_aSJHCAAAAEThBdUOAAAA; expires=Mon, 07-Oct-2019 17:35:18 GMT; path=/; secure; HttpOnly',
>>>>>>> [KeyVault-Certificates] Tweaks to the tests
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; HttpOnly',
  'Date',
<<<<<<< HEAD
  'Fri, 06 Sep 2019 15:14:01 GMT',
=======
  'Sat, 07 Sep 2019 17:35:17 GMT',
>>>>>>> [KeyVault-Certificates] Tweaks to the tests
  'Connection',
  'close',
  'Content-Length',
  '1231' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates')
  .query(true)
<<<<<<< HEAD
  .reply(200, {"value":[{"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/recoverCertificateName-canlistdeletedcertificates-0","deletedDate":1567782828,"scheduledPurgeDate":1575558828,"id":"https://keyvault_name.vault.azure.net/certificates/recoverCertificateName-canlistdeletedcertificates-0","attributes":{"enabled":false,"nbf":1567782225,"exp":1599405225,"created":1567782825,"updated":1567782825,"recoveryLevel":"Recoverable+Purgeable"}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/recoverCertificateName-canlistdeletedcertificates-1","deletedDate":1567782828,"scheduledPurgeDate":1575558828,"id":"https://keyvault_name.vault.azure.net/certificates/recoverCertificateName-canlistdeletedcertificates-1","attributes":{"enabled":false,"nbf":1567782226,"exp":1599405226,"created":1567782826,"updated":1567782826,"recoveryLevel":"Recoverable+Purgeable"}}],"nextLink":null}, [ 'Cache-Control',
=======
  .reply(200, {"value":[{"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/recoverCertificateName-canlistdeletedcertificates-0","deletedDate":1567877703,"scheduledPurgeDate":1575653703,"id":"https://keyvault_name.vault.azure.net/certificates/recoverCertificateName-canlistdeletedcertificates-0","attributes":{"enabled":false,"nbf":1567877101,"exp":1599500101,"created":1567877701,"updated":1567877701,"recoveryLevel":"Recoverable+Purgeable"}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/recoverCertificateName-canlistdeletedcertificates-1","deletedDate":1567877704,"scheduledPurgeDate":1575653704,"id":"https://keyvault_name.vault.azure.net/certificates/recoverCertificateName-canlistdeletedcertificates-1","attributes":{"enabled":false,"nbf":1567877102,"exp":1599500102,"created":1567877702,"updated":1567877702,"recoveryLevel":"Recoverable+Purgeable"}}],"nextLink":null}, [ 'Cache-Control',
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
  '7ab7d0ba-426e-48bd-9c10-d6768adaf716',
=======
  'a7df5cea-59a2-4ab3-b51f-6caf0ab43aeb',
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
  'Fri, 06 Sep 2019 15:14:02 GMT',
=======
  'Sat, 07 Sep 2019 17:35:18 GMT',
>>>>>>> [KeyVault-Certificates] Tweaks to the tests
  'Connection',
  'close',
  'Content-Length',
  '965' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedcertificates/recoverCertificateName-canlistdeletedcertificates-0')
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
  '34d2c130-57c4-460e-b052-a2903d057152',
=======
  '143b085b-6970-4f58-8086-6b475458b3f9',
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
  'Fri, 06 Sep 2019 15:14:02 GMT',
=======
  'Sat, 07 Sep 2019 17:35:18 GMT',
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
  'e8779958-1d7d-4561-a4a5-35ef86ce1f00',
  'x-ms-ests-server',
  '2.1.9338.12 - EUS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AseIF-KNsxBHpcoWjZ3Vwug_aSJHCQAAAKhuBNUOAAAA; expires=Sun, 06-Oct-2019 15:14:02 GMT; path=/; secure; HttpOnly',
=======
  '0ea9af95-a870-466a-8b4f-efeae9c24500',
  'x-ms-ests-server',
  '2.1.9338.12 - SCUS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AplrJaJWW01Co34UML9hR1U_aSJHCQAAAEThBdUOAAAA; expires=Mon, 07-Oct-2019 17:35:19 GMT; path=/; secure; HttpOnly',
>>>>>>> [KeyVault-Certificates] Tweaks to the tests
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; HttpOnly',
  'Date',
<<<<<<< HEAD
  'Fri, 06 Sep 2019 15:14:02 GMT',
=======
  'Sat, 07 Sep 2019 17:35:18 GMT',
>>>>>>> [KeyVault-Certificates] Tweaks to the tests
  'Connection',
  'close',
  'Content-Length',
  '1231' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedcertificates/recoverCertificateName-canlistdeletedcertificates-0')
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
  '96415194-5b7f-4ad8-a4be-866ce11a7096',
=======
  'dae067c6-76d3-43f3-946c-50c67dc887d3',
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
  'Fri, 06 Sep 2019 15:14:03 GMT',
=======
  'Sat, 07 Sep 2019 17:35:19 GMT',
>>>>>>> [KeyVault-Certificates] Tweaks to the tests
  'Connection',
  'close' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedcertificates/recoverCertificateName-canlistdeletedcertificates-1')
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
  '03d24e07-2af3-4fec-a3dc-567300f642a7',
=======
  'cbbce0ea-51a6-4960-8fe5-7072b2c1e0bd',
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
  'Fri, 06 Sep 2019 15:14:03 GMT',
=======
  'Sat, 07 Sep 2019 17:35:19 GMT',
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
  '8fb1ee05-f121-4b2d-8f7e-b89c4cdf1d00',
=======
  '7c421111-8a87-46e6-bf50-7e3c84ff4700',
>>>>>>> [KeyVault-Certificates] Tweaks to the tests
  'x-ms-ests-server',
  '2.1.9338.12 - NCUS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
<<<<<<< HEAD
  'fpc=AseIF-KNsxBHpcoWjZ3Vwug_aSJHCgAAAKhuBNUOAAAA; expires=Sun, 06-Oct-2019 15:14:03 GMT; path=/; secure; HttpOnly',
=======
  'fpc=AplrJaJWW01Co34UML9hR1U_aSJHCgAAAEThBdUOAAAA; expires=Mon, 07-Oct-2019 17:35:20 GMT; path=/; secure; HttpOnly',
>>>>>>> [KeyVault-Certificates] Tweaks to the tests
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; HttpOnly',
  'Date',
<<<<<<< HEAD
  'Fri, 06 Sep 2019 15:14:02 GMT',
=======
  'Sat, 07 Sep 2019 17:35:20 GMT',
>>>>>>> [KeyVault-Certificates] Tweaks to the tests
  'Connection',
  'close',
  'Content-Length',
  '1231' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedcertificates/recoverCertificateName-canlistdeletedcertificates-1')
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
  'af8de33e-ae0d-4af9-a3d9-7abde25b138d',
=======
  '33f8788c-c9f5-42c1-8de3-b6beff31f75a',
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
  'Fri, 06 Sep 2019 15:14:03 GMT',
=======
  'Sat, 07 Sep 2019 17:35:20 GMT',
>>>>>>> [KeyVault-Certificates] Tweaks to the tests
  'Connection',
  'close' ]);


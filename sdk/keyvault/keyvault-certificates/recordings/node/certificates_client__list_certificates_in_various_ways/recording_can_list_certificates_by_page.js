let nock = require('nock');

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/certificates/recoverCertificateName-canlistcertificatesbypage-0/create')
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
  '5c372d14-8721-4fdb-9c3e-e94410bbeb0e',
=======
  '0b717580-85a5-4e9a-b3d0-972980fcda6e',
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
  'Fri, 06 Sep 2019 15:14:04 GMT',
=======
  'Sat, 07 Sep 2019 17:35:20 GMT',
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
  'c6301e3c-1e62-4aa3-9f16-0ab1606d2100',
  'x-ms-ests-server',
  '2.1.9338.12 - WUS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AjHbbvKuUYVPg0kLWku_yIE_aSJHAQAAALtuBNUOAAAA; expires=Sun, 06-Oct-2019 15:14:04 GMT; path=/; secure; HttpOnly',
=======
  '08ae4a3b-9fed-4f5e-bf1a-f35bae4c4400',
  'x-ms-ests-server',
  '2.1.9338.12 - NCUS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=Aozbxf4HoB9Fuk6e_FBjbOw_aSJHAQAAAFjhBdUOAAAA; expires=Mon, 07-Oct-2019 17:35:21 GMT; path=/; secure; HttpOnly',
>>>>>>> [KeyVault-Certificates] Tweaks to the tests
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; HttpOnly',
  'Date',
<<<<<<< HEAD
  'Fri, 06 Sep 2019 15:14:04 GMT',
=======
  'Sat, 07 Sep 2019 17:35:21 GMT',
>>>>>>> [KeyVault-Certificates] Tweaks to the tests
  'Connection',
  'close',
  'Content-Length',
  '1231' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/certificates/recoverCertificateName-canlistcertificatesbypage-0/create', {"policy":{"x509_props":{"subject":"cn=MyCert"},"issuer":{"name":"Self"}},"attributes":{}})
  .query(true)
<<<<<<< HEAD
  .reply(202, {"id":"https://keyvault_name.vault.azure.net/certificates/recoverCertificateName-canlistcertificatesbypage-0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAteN28Z3XrWNVc+//mElLPdEP7kieaNgcckgTL2c7qKx8YHSKbIDVI/MncjSh/9anxfvLY7liRssDmjE0dekE7hnQn57Wgbah1fKxFMM1Kk7oVMtVuzb6tRfOjCRA65hlaKSYwoLs+vpFlRxIsLY30kCE5fVdoqkC3OcZnOB6GwN6dM3Diy9IHaw9+RRbEN/jbOCmF8FnTyr71W3vsrvFshbTQ75w6d8W8H/dDnvQhQYGmdnBxxBLM1rPgLixVecj3mXM+wiIqbDzUDUG0wf4Dw/CncWbu/k3rFYqZrocLThZJ4UzJB3wWO7IMny+p8PEHTe2qHRwiP8IgoZDL5yBawIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAKjqwoBBCPLkyEngRGovNCf3V0dNcLilHf+HED52/5WukLTHgNKzjh06Hf4Nju7wHKAIcRxn+yj9l1xYerkJmEAOxYKfEjpTKXu/3cQEZsSmR2stmty2ODT3iW35r3adCo2T4fpUOFpClPVTH+iXZDVatamiG3mllbLqT9KPrKry882CFzXH3l6IEoKO83pcXJmiHnsosvpdtATvH5ByoNK/XMeN2fKjbU8hqUMAkizPrkZ0ZrjM1hYOaMv/tIhXzXH88KNbMosVljFq6y4qh9MsJvanbSV7GZjP/Unsk+OQfNu7f3b56mUEEmWTKJYNvKBzfK2BSekRO0wRcZnyQfU=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"599ccbe0484244f5beb2d0cf7659d855"}, [ 'Cache-Control',
=======
  .reply(202, {"id":"https://keyvault_name.vault.azure.net/certificates/recoverCertificateName-canlistcertificatesbypage-0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA52+j2b2MdeEVgMQpxJZz6TeDuqRZ0IsL3QikFfzi+fB0JuxChW66FxatMpnFwrnqliKHgLpBAdrxfEXveWWy3Q5SQVoaqguiOmlKdF/kAAFlNeoO3Pcky3NMlOyYH1M8zA1Lgo/lu8K2HOdkKp9jXB8LetRyVC9JuINB/O9cu45UWEKjk63g32DojSIwvF+mj377+79kP7ZKJ1pwy7eZaqNlIhw+8RKqBAtQk9QGFcD1bYupFSdzEpXHWuWL9FenbCfTxFuznFDQahztZB90nOLAY/xv5BeAhx6ivRK/8x48lhCMEoWjMFEt8M+pillFNVBq3VYO2p61cu+MUsq7NwIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBABmgie3baswiiw4arJZ6Ar810kyUnNxTQjUX1kWguJdeDN8S588q6MU4eLswrVQYOQzVPYInf1ZdpUlvp1r89J+aQZRESX7RR+3iXsYH3hfseIUg+2IrITJ7oYNTSWpNn0GaR3Nkva8mlpfRoJHQi6g/whUlAY77VQ9ce2PtGHtkB47aS3fCRMEZ902pi5BQyyE0eW6nU6on9X9r7tANjmuayaDwEeoedorZ+gwjnUNvWb5c+hDgjeDGf0NGUnxKtYLko3LRgIdZHEXYELH81vnx9/9Jj0GTchcDratFalWnJjnHZZkf+yFdOM6mBi4r9gofIgZd1M5NLPuTHHrNIpo=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"982b584e4c484265b9c3690f8867b4dc"}, [ 'Cache-Control',
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
  'https://keyvault_name.vault.azure.net/certificates/recoverCertificateName-canlistcertificatesbypage-0/pending?api-version=7.0&request_id=599ccbe0484244f5beb2d0cf7659d855',
=======
  'https://keyvault_name.vault.azure.net/certificates/recoverCertificateName-canlistcertificatesbypage-0/pending?api-version=7.0&request_id=982b584e4c484265b9c3690f8867b4dc',
>>>>>>> [KeyVault-Certificates] Tweaks to the tests
  'Retry-After',
  '10',
  'Server',
  'Microsoft-IIS/10.0',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
<<<<<<< HEAD
  'df3bff85-471f-44ca-b4b1-bd58ea54e223',
=======
  '6fb7cb4f-8b42-49f0-a5a4-e383fd0c4d93',
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
  'Fri, 06 Sep 2019 15:14:04 GMT',
  'Connection',
  'close',
  'Content-Length',
  '1335' ]);
=======
  'Sat, 07 Sep 2019 17:35:22 GMT',
  'Connection',
  'close',
  'Content-Length',
  '1334' ]);
>>>>>>> [KeyVault-Certificates] Tweaks to the tests


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/certificates/recoverCertificateName-canlistcertificatesbypage-1/create')
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
  '02080371-0429-4203-8ea9-2d44acb75d7f',
=======
  '7a52a593-89c9-43c3-88d2-5a9225041301',
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
  'Fri, 06 Sep 2019 15:14:05 GMT',
=======
  'Sat, 07 Sep 2019 17:35:21 GMT',
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
  '92bf8896-cd17-4546-8e4c-6455afa61e00',
  'x-ms-ests-server',
  '2.1.9338.12 - EUS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AjHbbvKuUYVPg0kLWku_yIE_aSJHAgAAALtuBNUOAAAA; expires=Sun, 06-Oct-2019 15:14:05 GMT; path=/; secure; HttpOnly',
=======
  'cbc21ae9-ea86-401c-86cb-bee15ee34800',
  'x-ms-ests-server',
  '2.1.9338.12 - WUS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=Aozbxf4HoB9Fuk6e_FBjbOw_aSJHAgAAAFjhBdUOAAAA; expires=Mon, 07-Oct-2019 17:35:22 GMT; path=/; secure; HttpOnly',
>>>>>>> [KeyVault-Certificates] Tweaks to the tests
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; HttpOnly',
  'Date',
<<<<<<< HEAD
  'Fri, 06 Sep 2019 15:14:05 GMT',
=======
  'Sat, 07 Sep 2019 17:35:22 GMT',
>>>>>>> [KeyVault-Certificates] Tweaks to the tests
  'Connection',
  'close',
  'Content-Length',
  '1231' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/certificates/recoverCertificateName-canlistcertificatesbypage-1/create', {"policy":{"x509_props":{"subject":"cn=MyCert"},"issuer":{"name":"Self"}},"attributes":{}})
  .query(true)
<<<<<<< HEAD
  .reply(202, {"id":"https://keyvault_name.vault.azure.net/certificates/recoverCertificateName-canlistcertificatesbypage-1/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAskTrkxszEndVrUM8t0BD4eLb/2j96NN+fok1k12V4+SebINJvnlT001SIhDwopIolTzzsRvMMwn5aHwTTnqZRP8y6cHW28jUVJ2zbcE03cVZgQwV+Kdf68lWa+fZb8W76XvaeWOFUDkqGQx3r+vUensvc8NDFY6NKzMo5aCkqTQwmfq556ZynGU2IHcNvBceem6mkgDOvu0YQyx355avweZcAIjzYxlbqP/SIqy8HqEmkvb9i7x2hVw3yEUKOg0o0COOcYf/J+6nqJRXjwSOjL9bGo+cVqoOMXvFukwvVCRrjY4p3C4FDttJZFRPjL5uofQ+JbUuuXumWFeZNk5RRQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBABCP1tzHDOsqSEAwrI4sgHw4Gntsh//ujneERk5MJx4HTixEHMAtfO/8LiZ81bQ1m4Gi+8J/V7qcM8m9Q9o+Z8944rzSNCBYGNuzh/RiHRrb/3PJXMw6y5jwAMFXwfT5XVmnu2+zq6zxDInOH+8i8NAKAxLeHuXH0hGOr6PATB8db26LUDcyCIyEHiLGFzPzYsDMDJ3g5NVaRJUfM8jTT7K1f4T3j6TRVqg6w1QLv5qBZI7/kLgYcwqIchcOMav3hAItbur1EsXMCzCXYQcNCRPAuxVctWSd3ODZ6J9hwer2jy7nz6SgUknU0rY3DpJuwJTwL7zHe5CZJP4oNUAEGmU=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"a938b774bcb6482ca5afd006fdbd1b22"}, [ 'Cache-Control',
=======
  .reply(202, {"id":"https://keyvault_name.vault.azure.net/certificates/recoverCertificateName-canlistcertificatesbypage-1/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAjqX6BuwuRyb7SXveyPEEZh/CR35b5zvM7v7WyCCFA1HYhg9wWlGNBMWpbxBsjEB5ynAs79JXHSgpiVNHOWJVfr/VcN9DAnoisQJxZm0wmKEsPt1Uike4/DyXi/x5b+/YXgI3fkOrAR6M2IOICsOxT8WGQ+5JECJjWaXCP6z8WlicJ+wE1CMcf6/FV38YBKoAQAMm96GPJ/DYFVgtbJ6jXkL1HDlIw+hGFvSuySgVPK3fRN/GEvoE0515LB2LOJ+2vB2P2lGEcPHWPj55SsWjrRvdJjnrh4yVcVzVmRGO512mXFSLII/IH72vClcUZTa3BUUdmE7MiID37AoGEPuciQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAHIA6OTY9ulFr4A8854NJ+ip6Jy/or+xunrarVTIKw1+WPg3fudU1xW2/OgC++sefWUVUIfxE0kkRJYs+1bULSMCkjbGg0L9jpVNh7l8GoCW6Ui56c+4EVN++at7YrAo4D+o6zH7HO858hcpw3H59c8R9Xno/hgGvSu/4edXmXg9aRp4FUGGfYbWIffkrtW+CqVxUxI/4RrgwJNj8HY2No6eMfdUt8UXb9jsTGCCP6hYcPE/khCpq1+hKfhHZsP/0Ux3c47mh0whyp9nrUvl6o7cNVu6R2Hi8VPHMY5RZ2wYXi4OeO1yl4+5D5Dm32fvgSWd39XBW574Gyqd32YVgwY=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"f230b26f8ef84f13b2881ed940ab2203"}, [ 'Cache-Control',
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
  'https://keyvault_name.vault.azure.net/certificates/recoverCertificateName-canlistcertificatesbypage-1/pending?api-version=7.0&request_id=a938b774bcb6482ca5afd006fdbd1b22',
=======
  'https://keyvault_name.vault.azure.net/certificates/recoverCertificateName-canlistcertificatesbypage-1/pending?api-version=7.0&request_id=f230b26f8ef84f13b2881ed940ab2203',
>>>>>>> [KeyVault-Certificates] Tweaks to the tests
  'Retry-After',
  '10',
  'Server',
  'Microsoft-IIS/10.0',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
<<<<<<< HEAD
  '508beb19-47be-417a-92ad-9269b6b3c74b',
=======
  'b2c3fd6b-ad52-454f-b9f5-d6f8de3df675',
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
  'Fri, 06 Sep 2019 15:14:06 GMT',
  'Connection',
  'close',
  'Content-Length',
  '1335' ]);
=======
  'Sat, 07 Sep 2019 17:35:23 GMT',
  'Connection',
  'close',
  'Content-Length',
  '1334' ]);
>>>>>>> [KeyVault-Certificates] Tweaks to the tests


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
  '4e0d836f-b983-4d12-bdbc-93e2b3af6bfb',
=======
  'd1562a99-570a-4744-a3e7-ab8fa3084f96',
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
  'Fri, 06 Sep 2019 15:14:06 GMT',
=======
  'Sat, 07 Sep 2019 17:35:23 GMT',
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
  'f69aeabe-c772-4362-a230-4a5e8c122300',
  'x-ms-ests-server',
  '2.1.9338.12 - WUS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AjHbbvKuUYVPg0kLWku_yIE_aSJHAwAAALtuBNUOAAAA; expires=Sun, 06-Oct-2019 15:14:07 GMT; path=/; secure; HttpOnly',
=======
  '7c421111-8a87-46e6-bf50-7e3cf8ff4700',
  'x-ms-ests-server',
  '2.1.9338.12 - NCUS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=Aozbxf4HoB9Fuk6e_FBjbOw_aSJHAwAAAFjhBdUOAAAA; expires=Mon, 07-Oct-2019 17:35:24 GMT; path=/; secure; HttpOnly',
>>>>>>> [KeyVault-Certificates] Tweaks to the tests
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; HttpOnly',
  'Date',
<<<<<<< HEAD
  'Fri, 06 Sep 2019 15:14:07 GMT',
=======
  'Sat, 07 Sep 2019 17:35:24 GMT',
>>>>>>> [KeyVault-Certificates] Tweaks to the tests
  'Connection',
  'close',
  'Content-Length',
  '1231' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates')
  .query(true)
<<<<<<< HEAD
  .reply(200, {"value":[{"id":"https://keyvault_name.vault.azure.net/certificates/recoverCertificateName-canlistcertificatesbypage-0","attributes":{"enabled":false,"nbf":1567782244,"exp":1599405244,"created":1567782845,"updated":1567782845},"subject":""},{"id":"https://keyvault_name.vault.azure.net/certificates/recoverCertificateName-canlistcertificatesbypage-1","attributes":{"enabled":false,"nbf":1567782246,"exp":1599405246,"created":1567782846,"updated":1567782846},"subject":""}],"nextLink":null}, [ 'Cache-Control',
=======
  .reply(200, {"value":[{"id":"https://keyvault_name.vault.azure.net/certificates/recoverCertificateName-canlistcertificatesbypage-0","attributes":{"enabled":false,"nbf":1567877121,"exp":1599500121,"created":1567877721,"updated":1567877721},"subject":""},{"id":"https://keyvault_name.vault.azure.net/certificates/recoverCertificateName-canlistcertificatesbypage-1","attributes":{"enabled":false,"nbf":1567877123,"exp":1599500123,"created":1567877723,"updated":1567877723},"subject":""}],"nextLink":null}, [ 'Cache-Control',
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
  'a7b0d253-413b-4d7a-b570-23ee20f536de',
=======
  'd4230d96-9833-4ae9-82b8-7f5483c85a25',
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
  'Fri, 06 Sep 2019 15:14:07 GMT',
  'Connection',
  'close',
  'Content-Length',
  '517' ]);
=======
  'Sat, 07 Sep 2019 17:35:24 GMT',
  'Connection',
  'close',
  'Content-Length',
  '515' ]);
>>>>>>> [KeyVault-Certificates] Tweaks to the tests


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/certificates/recoverCertificateName-canlistcertificatesbypage-0')
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
  '41303916-632a-45ba-9080-998bc0821061',
=======
  '187b0c46-516f-44ce-ae05-abfc172cef5e',
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
  'Fri, 06 Sep 2019 15:14:07 GMT',
=======
  'Sat, 07 Sep 2019 17:35:24 GMT',
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
  '305150d6-5dfd-45ff-b31b-390cb5572100',
=======
  'ed9a51d9-73ba-4366-b882-18cb00244b00',
>>>>>>> [KeyVault-Certificates] Tweaks to the tests
  'x-ms-ests-server',
  '2.1.9338.12 - WUS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
<<<<<<< HEAD
  'fpc=AjHbbvKuUYVPg0kLWku_yIE_aSJHBAAAALtuBNUOAAAA; expires=Sun, 06-Oct-2019 15:14:08 GMT; path=/; secure; HttpOnly',
=======
  'fpc=Aozbxf4HoB9Fuk6e_FBjbOw_aSJHBAAAAFjhBdUOAAAA; expires=Mon, 07-Oct-2019 17:35:25 GMT; path=/; secure; HttpOnly',
>>>>>>> [KeyVault-Certificates] Tweaks to the tests
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; HttpOnly',
  'Date',
<<<<<<< HEAD
  'Fri, 06 Sep 2019 15:14:08 GMT',
=======
  'Sat, 07 Sep 2019 17:35:25 GMT',
>>>>>>> [KeyVault-Certificates] Tweaks to the tests
  'Connection',
  'close',
  'Content-Length',
  '1231' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/certificates/recoverCertificateName-canlistcertificatesbypage-0')
  .query(true)
<<<<<<< HEAD
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/recoverCertificateName-canlistcertificatesbypage-0","deletedDate":1567782848,"scheduledPurgeDate":1575558848,"id":"https://keyvault_name.vault.azure.net/certificates/recoverCertificateName-canlistcertificatesbypage-0/b686eadc8fd340ca94a14f8d6d5e45ca","attributes":{"enabled":false,"nbf":1567782244,"exp":1599405244,"created":1567782845,"updated":1567782845,"recoveryLevel":"Recoverable+Purgeable"},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/recoverCertificateName-canlistcertificatesbypage-0/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1567782845,"updated":1567782845}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/recoverCertificateName-canlistcertificatesbypage-0/pending"}}, [ 'Cache-Control',
=======
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/recoverCertificateName-canlistcertificatesbypage-0","deletedDate":1567877725,"scheduledPurgeDate":1575653725,"id":"https://keyvault_name.vault.azure.net/certificates/recoverCertificateName-canlistcertificatesbypage-0/ce6ba869db854664a3fce38ae1659f35","attributes":{"enabled":false,"nbf":1567877121,"exp":1599500121,"created":1567877721,"updated":1567877721,"recoveryLevel":"Recoverable+Purgeable"},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/recoverCertificateName-canlistcertificatesbypage-0/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1567877721,"updated":1567877721}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/recoverCertificateName-canlistcertificatesbypage-0/pending"}}, [ 'Cache-Control',
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
  '17643be5-48d4-42f8-94e5-e148f514d278',
=======
  'ee466121-6afb-45be-a64a-bd7e17338329',
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
  'Fri, 06 Sep 2019 15:14:07 GMT',
  'Connection',
  'close',
  'Content-Length',
  '1300' ]);
=======
  'Sat, 07 Sep 2019 17:35:25 GMT',
  'Connection',
  'close',
  'Content-Length',
  '1296' ]);
>>>>>>> [KeyVault-Certificates] Tweaks to the tests


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedcertificates/recoverCertificateName-canlistcertificatesbypage-0')
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
  '102efd6f-4a83-4c7f-8778-355365f41011',
=======
  '8446127e-657d-4c0d-9afc-ae3985a80df4',
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
  'Fri, 06 Sep 2019 15:14:08 GMT',
=======
  'Sat, 07 Sep 2019 17:35:25 GMT',
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
  'f1bb18cf-e2fb-42d7-8cac-ebb16cf41c00',
  'x-ms-ests-server',
  '2.1.9338.12 - SCUS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AjHbbvKuUYVPg0kLWku_yIE_aSJHBQAAALtuBNUOAAAA; expires=Sun, 06-Oct-2019 15:14:09 GMT; path=/; secure; HttpOnly',
=======
  'ed9a51d9-73ba-4366-b882-18cb25244b00',
  'x-ms-ests-server',
  '2.1.9338.12 - WUS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=Aozbxf4HoB9Fuk6e_FBjbOw_aSJHBQAAAFjhBdUOAAAA; expires=Mon, 07-Oct-2019 17:35:26 GMT; path=/; secure; HttpOnly',
>>>>>>> [KeyVault-Certificates] Tweaks to the tests
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; HttpOnly',
  'Date',
<<<<<<< HEAD
  'Fri, 06 Sep 2019 15:14:08 GMT',
=======
  'Sat, 07 Sep 2019 17:35:26 GMT',
>>>>>>> [KeyVault-Certificates] Tweaks to the tests
  'Connection',
  'close',
  'Content-Length',
  '1231' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedcertificates/recoverCertificateName-canlistcertificatesbypage-0')
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
  'a27985d2-6b1f-485a-aac0-54491eebb9cd',
=======
  '5c000d18-3b42-4f13-ad63-9464b8de0d8e',
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
  'Fri, 06 Sep 2019 15:14:08 GMT',
=======
  'Sat, 07 Sep 2019 17:35:26 GMT',
>>>>>>> [KeyVault-Certificates] Tweaks to the tests
  'Connection',
  'close' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedcertificates/recoverCertificateName-canlistcertificatesbypage-0')
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
  'cabfbcb7-cdf0-4a06-a623-912b3b6c6226',
=======
  '9555d00a-ce2d-43ce-a55e-428c0b958423',
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
  'Fri, 06 Sep 2019 15:14:18 GMT',
=======
  'Sat, 07 Sep 2019 17:35:36 GMT',
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
  'f69aeabe-c772-4362-a230-4a5ef0132300',
  'x-ms-ests-server',
  '2.1.9338.12 - WUS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AjHbbvKuUYVPg0kLWku_yIE_aSJHBgAAALtuBNUOAAAA; expires=Sun, 06-Oct-2019 15:14:19 GMT; path=/; secure; HttpOnly',
=======
  '70a1c9c4-cc00-4bb6-89f5-706dd5b04600',
  'x-ms-ests-server',
  '2.1.9338.12 - EUS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=Aozbxf4HoB9Fuk6e_FBjbOw_aSJHBgAAAFjhBdUOAAAA; expires=Mon, 07-Oct-2019 17:35:37 GMT; path=/; secure; HttpOnly',
>>>>>>> [KeyVault-Certificates] Tweaks to the tests
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; HttpOnly',
  'Date',
<<<<<<< HEAD
  'Fri, 06 Sep 2019 15:14:19 GMT',
=======
  'Sat, 07 Sep 2019 17:35:36 GMT',
>>>>>>> [KeyVault-Certificates] Tweaks to the tests
  'Connection',
  'close',
  'Content-Length',
  '1231' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedcertificates/recoverCertificateName-canlistcertificatesbypage-0')
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
  '0de6dfc7-acd5-4093-8d03-8953d93be316',
=======
  'b4cffaa0-f75c-4f23-8486-ad33b57db86b',
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
  'Fri, 06 Sep 2019 15:14:19 GMT',
=======
  'Sat, 07 Sep 2019 17:35:37 GMT',
>>>>>>> [KeyVault-Certificates] Tweaks to the tests
  'Connection',
  'close' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/certificates/recoverCertificateName-canlistcertificatesbypage-1')
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
  '7fcf16a5-e3c9-4da7-9e18-517a5ac206ea',
=======
  'd78381fb-694d-44e7-bd4b-d7215fb863fb',
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
  'Fri, 06 Sep 2019 15:14:20 GMT',
=======
  'Sat, 07 Sep 2019 17:35:37 GMT',
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
  '3e644561-4688-4f29-a1e8-bb6905152000',
  'x-ms-ests-server',
  '2.1.9338.12 - WUS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AjHbbvKuUYVPg0kLWku_yIE_aSJHBwAAALtuBNUOAAAA; expires=Sun, 06-Oct-2019 15:14:20 GMT; path=/; secure; HttpOnly',
=======
  'ad38d0a7-983e-40b7-9523-702c4a384700',
  'x-ms-ests-server',
  '2.1.9338.12 - NCUS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=Aozbxf4HoB9Fuk6e_FBjbOw_aSJHBwAAAFjhBdUOAAAA; expires=Mon, 07-Oct-2019 17:35:38 GMT; path=/; secure; HttpOnly',
>>>>>>> [KeyVault-Certificates] Tweaks to the tests
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; HttpOnly',
  'Date',
<<<<<<< HEAD
  'Fri, 06 Sep 2019 15:14:20 GMT',
=======
  'Sat, 07 Sep 2019 17:35:37 GMT',
>>>>>>> [KeyVault-Certificates] Tweaks to the tests
  'Connection',
  'close',
  'Content-Length',
  '1231' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/certificates/recoverCertificateName-canlistcertificatesbypage-1')
  .query(true)
<<<<<<< HEAD
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/recoverCertificateName-canlistcertificatesbypage-1","deletedDate":1567782861,"scheduledPurgeDate":1575558861,"id":"https://keyvault_name.vault.azure.net/certificates/recoverCertificateName-canlistcertificatesbypage-1/d84f5a88df854e0c83bccf07f68e89e9","kid":"https://keyvault_name.vault.azure.net/keys/recoverCertificateName-canlistcertificatesbypage-1/d84f5a88df854e0c83bccf07f68e89e9","sid":"https://keyvault_name.vault.azure.net/secrets/recoverCertificateName-canlistcertificatesbypage-1/d84f5a88df854e0c83bccf07f68e89e9","x5t":"IAq_Vfx_01SZCSWKDPUti4Ktt_E","cer":"MIIDKDCCAhCgAwIBAgIQPvkh1IhuRDCo0CcH2tEjsTANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMTkwOTA2MTUwNDE2WhcNMjAwOTA2MTUxNDE2WjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQCyROuTGzMSd1WtQzy3QEPh4tv/aP3o035+iTWTXZXj5J5sg0m+eVPTTVIiEPCikiiVPPOxG8wzCflofBNOeplE/zLpwdbbyNRUnbNtwTTdxVmBDBX4p1/ryVZr59lvxbvpe9p5Y4VQOSoZDHev69R6ey9zw0MVjo0rMyjloKSpNDCZ+rnnpnKcZTYgdw28Fx56bqaSAM6+7RhDLHfnlq/B5lwAiPNjGVuo/9IirLweoSaS9v2LvHaFXDfIRQo6DSjQI45xh/8n7qeolFePBI6Mv1saj5xWqg4xe8W6TC9UJGuNjincLgUO20lkVE+Mvm6h9D4ltS65e6ZYV5k2TlFFAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBTb/l0cmUZ6Q7aiP5BLEv/Ta0CqNDAdBgNVHQ4EFgQU2/5dHJlGekO2oj+QSxL/02tAqjQwDQYJKoZIhvcNAQELBQADggEBAGSMP9HrlmsAnfEizJgi2fXWcbmT+d34G+8lBFCOtdItRef/RMlqpiI8ZY2u831JNdQ6ayWTLGET4fgeWcBrTyaH5tKMmmVex4Rrjcs1alb1Pr+G7Poxddqi8uhx1728MFrqCK80Rl4av8HewTXg6YGVsxPYf1A51CS68eD1cRW3WU1h1RRrLU1lvomWOQ6VZEoPrW9+DHV30cDGTvPfv0fPXTBvma8WNm9xvJ4HUy0YkCLXN6dMq3jxbtJ5W0z7HVuwlPNJUO95T/MV9YrCCBr5M7HNQi+nzq+H2h+mAqXVH23iO2hA4nXrLKft9kZ0ILCm65QBy8++anoAkxEm+pY=","attributes":{"enabled":true,"nbf":1567782256,"exp":1599405256,"created":1567782856,"updated":1567782856,"recoveryLevel":"Recoverable+Purgeable"},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/recoverCertificateName-canlistcertificatesbypage-1/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1567782846,"updated":1567782846}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/recoverCertificateName-canlistcertificatesbypage-1/pending"}}, [ 'Cache-Control',
=======
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/recoverCertificateName-canlistcertificatesbypage-1","deletedDate":1567877738,"scheduledPurgeDate":1575653738,"id":"https://keyvault_name.vault.azure.net/certificates/recoverCertificateName-canlistcertificatesbypage-1/7be20bf798f048caae726fdeeedd88f0","kid":"https://keyvault_name.vault.azure.net/keys/recoverCertificateName-canlistcertificatesbypage-1/7be20bf798f048caae726fdeeedd88f0","sid":"https://keyvault_name.vault.azure.net/secrets/recoverCertificateName-canlistcertificatesbypage-1/7be20bf798f048caae726fdeeedd88f0","x5t":"0KgDx2JyMeKD0pR8SJnurjeWwjU","cer":"MIIDKDCCAhCgAwIBAgIQIK93hWU5T9GufDh4zGBo4jANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMTkwOTA3MTcyNTI3WhcNMjAwOTA3MTczNTI3WjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQCOpfoG7C5HJvtJe97I8QRmH8JHflvnO8zu/tbIIIUDUdiGD3BaUY0ExalvEGyMQHnKcCzv0lcdKCmJU0c5YlV+v9Vw30MCeiKxAnFmbTCYoSw+3VSKR7j8PJeL/Hlv79heAjd+Q6sBHozYg4gKw7FPxYZD7kkQImNZpcI/rPxaWJwn7ATUIxx/r8VXfxgEqgBAAyb3oY8n8NgVWC1snqNeQvUcOUjD6EYW9K7JKBU8rd9E38YS+gTTnXksHYs4n7a8HY/aUYRw8dY+PnlKxaOtG90mOeuHjJVxXNWZEY7nXaZcVIsgj8gfva8KVxRlNrcFRR2YTsyIgPfsCgYQ+5yJAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBRNg09ov3H7SRXYd/39uropOmE4ajAdBgNVHQ4EFgQUTYNPaL9x+0kV2Hf9/bq6KTphOGowDQYJKoZIhvcNAQELBQADggEBAIQkabeXxF/7TxKky1mFg05dtGNLJEA414ZWEgj71p3tVXprwpjaDLURzmVrvCsiNXmN8gsmKuPoQ2Bq80Bj6u1zQ+ftLLJHpSy4iD1GSGrk5drvYnQ0flDfXYPX5JqrQ2ybfFLjsbGSD4YOLgbKfvSFjge/482OYX+WRGFaJhQbZF1RQB5Skeg07qK3pTq0GondF5iCz6GQ9cqtOSR1M4xII8v7kSOh7mXeU5daro0KghDXCxh5uBXxNyqU6yNpZBNOLqZ7Wc0EICo3C2nFEsgfzsNpqrflAv2MVCutrDG0eNelzRw2hR/cGbTNET3tFac0F0V94bwdLcUI8lwu3Gk=","attributes":{"enabled":true,"nbf":1567877127,"exp":1599500127,"created":1567877728,"updated":1567877728,"recoveryLevel":"Recoverable+Purgeable"},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/recoverCertificateName-canlistcertificatesbypage-1/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1567877723,"updated":1567877723}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/recoverCertificateName-canlistcertificatesbypage-1/pending"}}, [ 'Cache-Control',
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
  'e3a77772-04b2-4b95-a997-ab122f6c9639',
=======
  '2be9404d-06a6-4e9d-8e12-66161a648844',
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
  'Fri, 06 Sep 2019 15:14:20 GMT',
  'Connection',
  'close',
  'Content-Length',
  '2729' ]);
=======
  'Sat, 07 Sep 2019 17:35:38 GMT',
  'Connection',
  'close',
  'Content-Length',
  '2723' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedcertificates/recoverCertificateName-canlistcertificatesbypage-1')
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
  'feff6bed-87d3-4057-a3ee-f56adbf66680',
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
  'Sat, 07 Sep 2019 17:35:38 GMT',
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
  '3c8b2fab-7ecd-421c-8634-909224564400',
  'x-ms-ests-server',
  '2.1.9338.12 - SCUS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=Aozbxf4HoB9Fuk6e_FBjbOw_aSJHCAAAAFjhBdUOAAAA; expires=Mon, 07-Oct-2019 17:35:39 GMT; path=/; secure; HttpOnly',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; HttpOnly',
  'Date',
  'Sat, 07 Sep 2019 17:35:38 GMT',
  'Connection',
  'close',
  'Content-Length',
  '1231' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedcertificates/recoverCertificateName-canlistcertificatesbypage-1')
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
  'd0564bbb-4532-4ffa-b299-49f9cb91c189',
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
  'Sat, 07 Sep 2019 17:35:39 GMT',
  'Connection',
  'close' ]);
>>>>>>> [KeyVault-Certificates] Tweaks to the tests


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedcertificates/recoverCertificateName-canlistcertificatesbypage-1')
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
  '069d4331-7ac1-4081-b8c5-533a9d152696',
=======
  'd69f995a-838e-461f-a479-7a7a95f2735f',
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
  'Fri, 06 Sep 2019 15:14:21 GMT',
=======
  'Sat, 07 Sep 2019 17:35:49 GMT',
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
  '3ecd6a1c-3b6d-4adc-9a2d-cb4c3f9f2000',
  'x-ms-ests-server',
  '2.1.9338.12 - EUS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AjHbbvKuUYVPg0kLWku_yIE_aSJHCAAAALtuBNUOAAAA; expires=Sun, 06-Oct-2019 15:14:21 GMT; path=/; secure; HttpOnly',
=======
  'ea6e2dcc-397a-414c-8647-5c6999174300',
  'x-ms-ests-server',
  '2.1.9338.12 - SCUS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=Aozbxf4HoB9Fuk6e_FBjbOw_aSJHCQAAAFjhBdUOAAAA; expires=Mon, 07-Oct-2019 17:35:50 GMT; path=/; secure; HttpOnly',
>>>>>>> [KeyVault-Certificates] Tweaks to the tests
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; HttpOnly',
  'Date',
<<<<<<< HEAD
  'Fri, 06 Sep 2019 15:14:21 GMT',
=======
  'Sat, 07 Sep 2019 17:35:49 GMT',
>>>>>>> [KeyVault-Certificates] Tweaks to the tests
  'Connection',
  'close',
  'Content-Length',
  '1231' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedcertificates/recoverCertificateName-canlistcertificatesbypage-1')
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
  '87d5c930-b32a-43d8-a38c-151d73123903',
=======
  '9b23f97b-eb50-46b0-b9b4-4a14ccb946c8',
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
  'Fri, 06 Sep 2019 15:14:22 GMT',
=======
  'Sat, 07 Sep 2019 17:35:49 GMT',
>>>>>>> [KeyVault-Certificates] Tweaks to the tests
  'Connection',
  'close' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedcertificates/recoverCertificateName-canlistcertificatesbypage-1')
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
  '8a575965-3947-40da-9584-cd1f96e62d65',
=======
  '038c8463-0f0c-44b3-b0ab-25b3139d89a8',
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
  'Fri, 06 Sep 2019 15:14:32 GMT',
=======
  'Sat, 07 Sep 2019 17:36:00 GMT',
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
  '857fe206-70e0-4fd0-ba83-7530a65a1e00',
=======
  '7c421111-8a87-46e6-bf50-7e3c5c044800',
>>>>>>> [KeyVault-Certificates] Tweaks to the tests
  'x-ms-ests-server',
  '2.1.9338.12 - NCUS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
<<<<<<< HEAD
  'fpc=AjHbbvKuUYVPg0kLWku_yIE_aSJHCQAAALtuBNUOAAAA; expires=Sun, 06-Oct-2019 15:14:32 GMT; path=/; secure; HttpOnly',
=======
  'fpc=Aozbxf4HoB9Fuk6e_FBjbOw_aSJHCgAAAFjhBdUOAAAA; expires=Mon, 07-Oct-2019 17:36:01 GMT; path=/; secure; HttpOnly',
>>>>>>> [KeyVault-Certificates] Tweaks to the tests
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; HttpOnly',
  'Date',
<<<<<<< HEAD
  'Fri, 06 Sep 2019 15:14:32 GMT',
=======
  'Sat, 07 Sep 2019 17:36:00 GMT',
>>>>>>> [KeyVault-Certificates] Tweaks to the tests
  'Connection',
  'close',
  'Content-Length',
  '1231' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedcertificates/recoverCertificateName-canlistcertificatesbypage-1')
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
  'e6ea0077-aaab-4f24-9208-b9b2c501c75a',
=======
  '48cd5705-4e39-41d1-a428-b000b33dbcd4',
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
  'Fri, 06 Sep 2019 15:14:32 GMT',
=======
  'Sat, 07 Sep 2019 17:36:00 GMT',
>>>>>>> [KeyVault-Certificates] Tweaks to the tests
  'Connection',
  'close' ]);


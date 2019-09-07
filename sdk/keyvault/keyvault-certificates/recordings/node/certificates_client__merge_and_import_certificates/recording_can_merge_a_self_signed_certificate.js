let nock = require('nock');

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/certificates/mergeCertificateName-canmergeaselfsignedcertificate-/create')
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
  '4f559bec-d2d6-41fc-ae45-33ef71c722e3',
=======
  '01d50945-d10c-4864-bab4-a9006f5c559f',
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
  'Fri, 06 Sep 2019 15:17:12 GMT',
=======
  'Sat, 07 Sep 2019 17:38:42 GMT',
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
  '6a3a599d-3a45-4057-94eb-7b0d939a1c00',
  'x-ms-ests-server',
  '2.1.9338.12 - SCUS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AoyyxzCytpBOnRENP4Gztq0_aSJHAQAAAHhvBNUOAAAA; expires=Sun, 06-Oct-2019 15:17:13 GMT; path=/; secure; HttpOnly',
=======
  '761d3cf6-33d6-473e-8fa7-99ca06044800',
  'x-ms-ests-server',
  '2.1.9338.12 - WUS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AsnFT4Xab9dBmr4AhttmxR8_aSJHAQAAACLiBdUOAAAA; expires=Mon, 07-Oct-2019 17:38:43 GMT; path=/; secure; HttpOnly',
>>>>>>> [KeyVault-Certificates] Tweaks to the tests
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; HttpOnly',
  'Date',
<<<<<<< HEAD
  'Fri, 06 Sep 2019 15:17:12 GMT',
=======
  'Sat, 07 Sep 2019 17:38:42 GMT',
>>>>>>> [KeyVault-Certificates] Tweaks to the tests
  'Connection',
  'close',
  'Content-Length',
  '1231' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/certificates/mergeCertificateName-canmergeaselfsignedcertificate-/create', {"policy":{"x509_props":{"subject":"cn=MyCert"},"issuer":{"name":"Unknown","cert_transparency":false}},"attributes":{}})
  .query(true)
<<<<<<< HEAD
  .reply(202, {"id":"https://keyvault_name.vault.azure.net/certificates/mergeCertificateName-canmergeaselfsignedcertificate-/pending","issuer":{"name":"Unknown"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA1XTsM6c9tMbY6FJMI8phRJastmArA8032G+vE7vvUygUZtUPiTGudUlUMp9R5iTfwgJAj1WgbnN1zL3e2lSVOK1BtjjI1MvqoYQuDnl3Om1FJUP8apdgcCYT4XnfqrGaBsb9QHymQ3gDO+312ioz18Nmc16v9pKtVxqU1ecBoanYL1ika+8bVXJTAokBrVPSgPCrekT5NwjILim4DOQhXwwHIe6W9oPHbvnoO1go6NUK562f45kl07KAg7yKz1kAAjl89AuJZ2rTw5hu6U8rtaURhrRNSG6PwqHd7F/Qpvi3zjhKhZg/bgMXzS+n+cFXNqisPuRQO0fJzDS9lpsDzQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAMxefEveIlozoeemJAbJP+vJwVr6U0nGbBmLXhg0f+yMKST1bDPOFQdvbnhEw0jIUq2LMKj8TQqFl2wnExwlqcmq7ptdeT29Y5UOZdo5RW8jcNs6PC1ANr7flCUBqkARuUYneDvlWWFrA22Eu8c8r3w8ShTMjes0ewx9zsiXiglFYPOtpwQCKm29QWVuBjmS7MWSZfLCAenpwIN4bvV7MUvfZX6+KlK+XSo3uU0jkG64NQ4aVEOS4rmyZTGJZ4gSiDz1b3beGNyono2CXlg6qE2HPGSGJmiHfSC3LOqGPW7tJmbVnYpQUeC07Zb4mQLb8lpNOUMU8v69vnufqBKsIHk=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Please Perform Merge to complete the request.","request_id":"72c7b691b009428d896c3ffdf05c535e"}, [ 'Cache-Control',
=======
  .reply(202, {"id":"https://keyvault_name.vault.azure.net/certificates/mergeCertificateName-canmergeaselfsignedcertificate-/pending","issuer":{"name":"Unknown"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAuBBYYtNTBUTlOwOY5+Ai+WKFvcf8jnSN56+IgM9zJoRKTQBNOBCk5X/RFs1DuqpH9vIvPJ4EDc2R0zF+qUhD1bkNKQfDvMDauoSpVApGYo5EEp+hVeJlykNrXAHXRBZD9HvunZOh0UBianwtl9TesT1vUbj0CU0+IOmhxr62GsbVhbMZoBoNt19yvh52to0uADLRwVdZJXsVCXYsKcwdP0Zygn7jffjuQ9VzE7YWLbQb0QYeXYhilQhk82N/+CwCi28JKldWYckCBzJb8bzTnsPYYZqMpD9CuFqOYgzoM5Dq/PEy170q2wWQS5ZKHCFOHh+tu5WaqXJuG1neqVRC2QIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAH0Mdnskr/AITBaaULNk9OYbqRLGUvrmeSpQ5vh209qGPrNTK6D7jovqSPPoLa2pcvt2KNunG+Z4c3jn2wy7crZMUa/CD8MB2L3S+uYRyqec1sSpFLA0WsOAajq3iPKYVJPZz1G7ZrRWoC+Qn3DD1ObPdnLVFO9V0P96IVRd6htoiBvfuBLSoXN/4KuvDhhFm/1gLNHqVCEWp0dGsueFHz1HI4tS/na3XIPm1nOk21RMV2rAlsvhjM2N0gjWRr3FMgYnqmyurhUlZkYDjWPXtDWpzQdHkvFVy6JoqOBOrb4DgHGylnV8x6Q7VUg7P11qTiMHhZCkmq3zvhnIrGh82jU=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Please Perform Merge to complete the request.","request_id":"ed1fb3c30de543e1adbfe1f61953af20"}, [ 'Cache-Control',
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
  'https://keyvault_name.vault.azure.net/certificates/mergeCertificateName-canmergeaselfsignedcertificate-/pending?api-version=7.0&request_id=72c7b691b009428d896c3ffdf05c535e',
=======
  'https://keyvault_name.vault.azure.net/certificates/mergeCertificateName-canmergeaselfsignedcertificate-/pending?api-version=7.0&request_id=ed1fb3c30de543e1adbfe1f61953af20',
>>>>>>> [KeyVault-Certificates] Tweaks to the tests
  'Retry-After',
  '10',
  'Server',
  'Microsoft-IIS/10.0',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
<<<<<<< HEAD
  'd0bcc927-46e9-473e-9467-93fe5d71e44f',
=======
  '42d06e6f-60e3-4b39-bd2c-fa43a096ffd4',
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
  'Fri, 06 Sep 2019 15:17:14 GMT',
  'Connection',
  'close',
  'Content-Length',
  '1271' ]);
=======
  'Sat, 07 Sep 2019 17:38:44 GMT',
  'Connection',
  'close',
  'Content-Length',
  '1269' ]);
>>>>>>> [KeyVault-Certificates] Tweaks to the tests


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/mergeCertificateName-canmergeaselfsignedcertificate-/pending')
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
  '729e1053-3397-4e1a-bfc6-2e356e2ebb9d',
=======
  '24ec9f36-cc86-4392-9647-bf53446633b4',
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
  'Fri, 06 Sep 2019 15:17:13 GMT',
=======
  'Sat, 07 Sep 2019 17:38:44 GMT',
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
  '3ba0eeda-eacd-4f28-bed5-e72014532200',
=======
  'a9546835-d6b8-4e7d-a55b-8688f3924e00',
>>>>>>> [KeyVault-Certificates] Tweaks to the tests
  'x-ms-ests-server',
  '2.1.9338.12 - WUS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
<<<<<<< HEAD
  'fpc=AoyyxzCytpBOnRENP4Gztq0_aSJHAgAAAHhvBNUOAAAA; expires=Sun, 06-Oct-2019 15:17:14 GMT; path=/; secure; HttpOnly',
=======
  'fpc=AsnFT4Xab9dBmr4AhttmxR8_aSJHAgAAACLiBdUOAAAA; expires=Mon, 07-Oct-2019 17:38:44 GMT; path=/; secure; HttpOnly',
>>>>>>> [KeyVault-Certificates] Tweaks to the tests
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; HttpOnly',
  'Date',
<<<<<<< HEAD
  'Fri, 06 Sep 2019 15:17:14 GMT',
=======
  'Sat, 07 Sep 2019 17:38:44 GMT',
>>>>>>> [KeyVault-Certificates] Tweaks to the tests
  'Connection',
  'close',
  'Content-Length',
  '1231' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/mergeCertificateName-canmergeaselfsignedcertificate-/pending')
  .query(true)
<<<<<<< HEAD
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/mergeCertificateName-canmergeaselfsignedcertificate-/pending","issuer":{"name":"Unknown"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA1XTsM6c9tMbY6FJMI8phRJastmArA8032G+vE7vvUygUZtUPiTGudUlUMp9R5iTfwgJAj1WgbnN1zL3e2lSVOK1BtjjI1MvqoYQuDnl3Om1FJUP8apdgcCYT4XnfqrGaBsb9QHymQ3gDO+312ioz18Nmc16v9pKtVxqU1ecBoanYL1ika+8bVXJTAokBrVPSgPCrekT5NwjILim4DOQhXwwHIe6W9oPHbvnoO1go6NUK562f45kl07KAg7yKz1kAAjl89AuJZ2rTw5hu6U8rtaURhrRNSG6PwqHd7F/Qpvi3zjhKhZg/bgMXzS+n+cFXNqisPuRQO0fJzDS9lpsDzQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAMxefEveIlozoeemJAbJP+vJwVr6U0nGbBmLXhg0f+yMKST1bDPOFQdvbnhEw0jIUq2LMKj8TQqFl2wnExwlqcmq7ptdeT29Y5UOZdo5RW8jcNs6PC1ANr7flCUBqkARuUYneDvlWWFrA22Eu8c8r3w8ShTMjes0ewx9zsiXiglFYPOtpwQCKm29QWVuBjmS7MWSZfLCAenpwIN4bvV7MUvfZX6+KlK+XSo3uU0jkG64NQ4aVEOS4rmyZTGJZ4gSiDz1b3beGNyono2CXlg6qE2HPGSGJmiHfSC3LOqGPW7tJmbVnYpQUeC07Zb4mQLb8lpNOUMU8v69vnufqBKsIHk=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Please Perform Merge to complete the request.","request_id":"72c7b691b009428d896c3ffdf05c535e"}, [ 'Cache-Control',
=======
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/mergeCertificateName-canmergeaselfsignedcertificate-/pending","issuer":{"name":"Unknown"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAuBBYYtNTBUTlOwOY5+Ai+WKFvcf8jnSN56+IgM9zJoRKTQBNOBCk5X/RFs1DuqpH9vIvPJ4EDc2R0zF+qUhD1bkNKQfDvMDauoSpVApGYo5EEp+hVeJlykNrXAHXRBZD9HvunZOh0UBianwtl9TesT1vUbj0CU0+IOmhxr62GsbVhbMZoBoNt19yvh52to0uADLRwVdZJXsVCXYsKcwdP0Zygn7jffjuQ9VzE7YWLbQb0QYeXYhilQhk82N/+CwCi28JKldWYckCBzJb8bzTnsPYYZqMpD9CuFqOYgzoM5Dq/PEy170q2wWQS5ZKHCFOHh+tu5WaqXJuG1neqVRC2QIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAH0Mdnskr/AITBaaULNk9OYbqRLGUvrmeSpQ5vh209qGPrNTK6D7jovqSPPoLa2pcvt2KNunG+Z4c3jn2wy7crZMUa/CD8MB2L3S+uYRyqec1sSpFLA0WsOAajq3iPKYVJPZz1G7ZrRWoC+Qn3DD1ObPdnLVFO9V0P96IVRd6htoiBvfuBLSoXN/4KuvDhhFm/1gLNHqVCEWp0dGsueFHz1HI4tS/na3XIPm1nOk21RMV2rAlsvhjM2N0gjWRr3FMgYnqmyurhUlZkYDjWPXtDWpzQdHkvFVy6JoqOBOrb4DgHGylnV8x6Q7VUg7P11qTiMHhZCkmq3zvhnIrGh82jU=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Please Perform Merge to complete the request.","request_id":"ed1fb3c30de543e1adbfe1f61953af20"}, [ 'Cache-Control',
>>>>>>> [KeyVault-Certificates] Tweaks to the tests
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
<<<<<<< HEAD
  '715ef68b-608f-45ff-9fb8-bfced2d4df00',
=======
  '6c85e25c-4937-4838-a045-3acf69a65c6b',
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
  'Fri, 06 Sep 2019 15:17:14 GMT',
  'Connection',
  'close',
  'Content-Length',
  '1271' ]);
=======
  'Sat, 07 Sep 2019 17:38:44 GMT',
  'Connection',
  'close',
  'Content-Length',
  '1269' ]);
>>>>>>> [KeyVault-Certificates] Tweaks to the tests


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/certificates/mergeCertificateName-canmergeaselfsignedcertificate-/pending/merge')
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
  'd065d060-a4e9-4982-90e0-f82e3037983d',
=======
  '2076dde4-d6bb-4d43-93c3-36466d02cf64',
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
  'Fri, 06 Sep 2019 15:17:14 GMT',
=======
  'Sat, 07 Sep 2019 17:38:45 GMT',
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
  '65a4db4e-0c17-4d8a-9bfc-1d4c1b7c1f00',
  'x-ms-ests-server',
  '2.1.9338.12 - EUS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AoyyxzCytpBOnRENP4Gztq0_aSJHAwAAAHhvBNUOAAAA; expires=Sun, 06-Oct-2019 15:17:15 GMT; path=/; secure; HttpOnly',
=======
  '19bc7856-c74f-458a-a407-00a0321d4700',
  'x-ms-ests-server',
  '2.1.9338.12 - WUS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AsnFT4Xab9dBmr4AhttmxR8_aSJHAwAAACLiBdUOAAAA; expires=Mon, 07-Oct-2019 17:38:45 GMT; path=/; secure; HttpOnly',
>>>>>>> [KeyVault-Certificates] Tweaks to the tests
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; HttpOnly',
  'Date',
<<<<<<< HEAD
  'Fri, 06 Sep 2019 15:17:15 GMT',
=======
  'Sat, 07 Sep 2019 17:38:45 GMT',
>>>>>>> [KeyVault-Certificates] Tweaks to the tests
  'Connection',
  'close',
  'Content-Length',
  '1231' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
<<<<<<< HEAD
  .post('/certificates/mergeCertificateName-canmergeaselfsignedcertificate-/pending/merge', {"x5c":["TUlJQzBqQ0NBYm9DQ1FDdldWdWMxOXF5QmpBTkJna3Foa2lHOXcwQkFRc0ZBREJGTVFzd0NRWURWUVFHRXdKQlZURVRNQkVHQTFVRUNBd0tVMjl0WlMxVGRHRjBaVEVoTUI4R0ExVUVDZ3dZU1c1MFpYSnVaWFFnVjJsa1oybDBjeUJRZEhrZ1RIUmtNQjRYRFRFNU1Ea3dOakUxTVRjeE5Wb1hEVEU1TVRBd05qRTFNVGN4TlZvd0VURVBNQTBHQTFVRUF4TUdUWGxEWlhKME1JSUJJakFOQmdrcWhraUc5dzBCQVFFRkFBT0NBUThBTUlJQkNnS0NBUUVBMVhUc002Yzl0TWJZNkZKTUk4cGhSSmFzdG1BckE4MDMyRyt2RTd2dlV5Z1VadFVQaVRHdWRVbFVNcDlSNWlUZndnSkFqMVdnYm5OMXpMM2UybFNWT0sxQnRqakkxTXZxb1lRdURubDNPbTFGSlVQOGFwZGdjQ1lUNFhuZnFyR2FCc2I5UUh5bVEzZ0RPKzMxMmlvejE4Tm1jMTZ2OXBLdFZ4cVUxZWNCb2FuWUwxaWthKzhiVlhKVEFva0JyVlBTZ1BDcmVrVDVOd2pJTGltNERPUWhYd3dISWU2VzlvUEhidm5vTzFnbzZOVUs1NjJmNDVrbDA3S0FnN3lLejFrQUFqbDg5QXVKWjJyVHc1aHU2VThydGFVUmhyUk5TRzZQd3FIZDdGL1FwdmkzempoS2haZy9iZ01YelMrbitjRlhOcWlzUHVSUU8wZkp6RFM5bHBzRHpRSURBUUFCTUEwR0NTcUdTSWIzRFFFQkN3VUFBNElCQVFCSFNHT3VCVHRwcnF3bEd6N0s3cnk2aGNlSGFLT0tncktqaTFYUWhZYm43b1kwOUxGck1UMGswdFVmcmEvMFlpcFFMSzVuZlhmQmhhblZKQnh0YWk4Z0pNUUhQZEV5aDdoOTZ3dTcyY214LzU3cWZ3OERlTk1WT1cwK3lpWHJkZ3VkaUV3OWRYSHgrUDUyUUpJN0ZsZFFCS2ZhNHZ0WHhHWm9qcHY5Z09xMjNMbENPZ3RQbUNvSkw2aXhJYkUyTkFXbnJLUUJ1RHZWMHZDM0tjblo1RFlVVU53TTdWOEl5c1RDNU9GRDZ5UzR6V1FhNUx2dFRadytESGtpZHp1Q3NuMkhkM3o2Y1pjS01PTFdGNXFsQTBMaUFVampwMWN4UmU0NFVrVEU2TWE3OWpzSVRWMXVSTTlTczdxcjd2VS9IckFMUXVmL0hOQnJ3eGZzSEN5UkE3cGotLS0tLUVORCBDRVJUSUZJQ0FURS0tLS0t"]})
  .query(true)
  .reply(201, {"id":"https://keyvault_name.vault.azure.net/certificates/mergeCertificateName-canmergeaselfsignedcertificate-/19a967fd2fcb41c9905bb6bdc6ae4053","kid":"https://keyvault_name.vault.azure.net/keys/mergeCertificateName-canmergeaselfsignedcertificate-/19a967fd2fcb41c9905bb6bdc6ae4053","sid":"https://keyvault_name.vault.azure.net/secrets/mergeCertificateName-canmergeaselfsignedcertificate-/19a967fd2fcb41c9905bb6bdc6ae4053","x5t":"nhjWL8mt4m3yufmMdBy6gKGtHik","cer":"MIIC0jCCAboCCQCvWVuc19qyBjANBgkqhkiG9w0BAQsFADBFMQswCQYDVQQGEwJBVTETMBEGA1UECAwKU29tZS1TdGF0ZTEhMB8GA1UECgwYSW50ZXJuZXQgV2lkZ2l0cyBQdHkgTHRkMB4XDTE5MDkwNjE1MTcxNVoXDTE5MTAwNjE1MTcxNVowETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA1XTsM6c9tMbY6FJMI8phRJastmArA8032G+vE7vvUygUZtUPiTGudUlUMp9R5iTfwgJAj1WgbnN1zL3e2lSVOK1BtjjI1MvqoYQuDnl3Om1FJUP8apdgcCYT4XnfqrGaBsb9QHymQ3gDO+312ioz18Nmc16v9pKtVxqU1ecBoanYL1ika+8bVXJTAokBrVPSgPCrekT5NwjILim4DOQhXwwHIe6W9oPHbvnoO1go6NUK562f45kl07KAg7yKz1kAAjl89AuJZ2rTw5hu6U8rtaURhrRNSG6PwqHd7F/Qpvi3zjhKhZg/bgMXzS+n+cFXNqisPuRQO0fJzDS9lpsDzQIDAQABMA0GCSqGSIb3DQEBCwUAA4IBAQBHSGOuBTtprqwlGz7K7ry6hceHaKOKgrKji1XQhYbn7oY09LFrMT0k0tUfra/0YipQLK5nfXfBhanVJBxtai8gJMQHPdEyh7h96wu72cmx/57qfw8DeNMVOW0+yiXrdgudiEw9dXHx+P52QJI7FldQBKfa4vtXxGZojpv9gOq23LlCOgtPmCoJL6ixIbE2NAWnrKQBuDvV0vC3KcnZ5DYUUNwM7V8IysTC5OFD6yS4zWQa5LvtTZw+DHkidzuCsn2Hd3z6cZcKMOLWF5qlA0LiAUjjp1cxRe44UkTE6Ma79jsITV1uRM9Ss7qr7vU/HrALQuf/HNBrwxfsHCyRA7pj","attributes":{"enabled":true,"nbf":1567783035,"exp":1570375035,"created":1567783036,"updated":1567783036,"recoveryLevel":"Recoverable+Purgeable"},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/mergeCertificateName-canmergeaselfsignedcertificate-/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"EmailContacts"}}],"issuer":{"name":"Unknown","cert_transparency":false},"attributes":{"enabled":true,"created":1567783034,"updated":1567783034}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/mergeCertificateName-canmergeaselfsignedcertificate-/pending"}}, [ 'Cache-Control',
=======
  .post('/certificates/mergeCertificateName-canmergeaselfsignedcertificate-/pending/merge', {"x5c":["TUlJQzBqQ0NBYm9DQ1FDdldWdWMxOXF5QnpBTkJna3Foa2lHOXcwQkFRc0ZBREJGTVFzd0NRWURWUVFHRXdKQlZURVRNQkVHQTFVRUNBd0tVMjl0WlMxVGRHRjBaVEVoTUI4R0ExVUVDZ3dZU1c1MFpYSnVaWFFnVjJsa1oybDBjeUJRZEhrZ1RIUmtNQjRYRFRFNU1Ea3dOekUzTXpnME5Wb1hEVEU1TVRBd056RTNNemcwTlZvd0VURVBNQTBHQTFVRUF4TUdUWGxEWlhKME1JSUJJakFOQmdrcWhraUc5dzBCQVFFRkFBT0NBUThBTUlJQkNnS0NBUUVBdUJCWVl0TlRCVVRsT3dPWTUrQWkrV0tGdmNmOGpuU041NitJZ005ekpvUktUUUJOT0JDazVYL1JGczFEdXFwSDl2SXZQSjRFRGMyUjB6RitxVWhEMWJrTktRZkR2TURhdW9TcFZBcEdZbzVFRXAraFZlSmx5a05yWEFIWFJCWkQ5SHZ1blpPaDBVQmlhbnd0bDlUZXNUMXZVYmowQ1UwK0lPbWh4cjYyR3NiVmhiTVpvQm9OdDE5eXZoNTJ0bzB1QURMUndWZFpKWHNWQ1hZc0tjd2RQMFp5Z243amZmanVROVZ6RTdZV0xiUWIwUVllWFloaWxRaGs4Mk4vK0N3Q2kyOEpLbGRXWWNrQ0J6SmI4YnpUbnNQWVlacU1wRDlDdUZxT1lnem9NNURxL1BFeTE3MHEyd1dRUzVaS0hDRk9IaCt0dTVXYXFYSnVHMW5lcVZSQzJRSURBUUFCTUEwR0NTcUdTSWIzRFFFQkN3VUFBNElCQVFDZ3pLTzVFM21IRGtQRTkydXZDSDNXYXlPSzh3YW1FekQyM056T1E3bkVkRlBqenQ2UktkaVVBVVNqK3hQbk5YQ2RSMlZIQ0wybTF0YXpWNll5SnVDRk5XT2FsV1h5SGFEbDdSMWhod0tRNzZKWUJvYTN3NENndDNkSlVZZVpWRHpuajUxSkt5MW51ZmNtYlNMajdtamx0ZCs0UDQ0Z1Y3SXdQNVhaOUliSHlZeUwrMTM2VGhpTENLNkdRQUlwR2l5bkFmMmFuK2RTSW5YLzhZR2pvN0UrdlVDcHQwa3pqYVBtc1RZckNCdzRrZ0dQODVNaWVreHVxdHJzR1pRdnY2bnFyMXh3S2h0YWwrSkEreU1XeHNkZCtyYndLZlZ4a0NyQjhlR3FSeUVzR0ZZbkRyUjhrcEMycUw0RVlOUHB1SU9Jam1WZmFYbHFLSXBsQ0l3MFJzSjYtLS0tLUVORCBDRVJUSUZJQ0FURS0tLS0t"]})
  .query(true)
  .reply(201, {"id":"https://keyvault_name.vault.azure.net/certificates/mergeCertificateName-canmergeaselfsignedcertificate-/a70b5c8d3918432ba9d01a0fe2a52c8b","kid":"https://keyvault_name.vault.azure.net/keys/mergeCertificateName-canmergeaselfsignedcertificate-/a70b5c8d3918432ba9d01a0fe2a52c8b","sid":"https://keyvault_name.vault.azure.net/secrets/mergeCertificateName-canmergeaselfsignedcertificate-/a70b5c8d3918432ba9d01a0fe2a52c8b","x5t":"lkTqu9UHco5q8LERMhXn8wAaVrA","cer":"MIIC0jCCAboCCQCvWVuc19qyBzANBgkqhkiG9w0BAQsFADBFMQswCQYDVQQGEwJBVTETMBEGA1UECAwKU29tZS1TdGF0ZTEhMB8GA1UECgwYSW50ZXJuZXQgV2lkZ2l0cyBQdHkgTHRkMB4XDTE5MDkwNzE3Mzg0NVoXDTE5MTAwNzE3Mzg0NVowETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAuBBYYtNTBUTlOwOY5+Ai+WKFvcf8jnSN56+IgM9zJoRKTQBNOBCk5X/RFs1DuqpH9vIvPJ4EDc2R0zF+qUhD1bkNKQfDvMDauoSpVApGYo5EEp+hVeJlykNrXAHXRBZD9HvunZOh0UBianwtl9TesT1vUbj0CU0+IOmhxr62GsbVhbMZoBoNt19yvh52to0uADLRwVdZJXsVCXYsKcwdP0Zygn7jffjuQ9VzE7YWLbQb0QYeXYhilQhk82N/+CwCi28JKldWYckCBzJb8bzTnsPYYZqMpD9CuFqOYgzoM5Dq/PEy170q2wWQS5ZKHCFOHh+tu5WaqXJuG1neqVRC2QIDAQABMA0GCSqGSIb3DQEBCwUAA4IBAQCgzKO5E3mHDkPE92uvCH3WayOK8wamEzD23NzOQ7nEdFPjzt6RKdiUAUSj+xPnNXCdR2VHCL2m1tazV6YyJuCFNWOalWXyHaDl7R1hhwKQ76JYBoa3w4Cgt3dJUYeZVDznj51JKy1nufcmbSLj7mjltd+4P44gV7IwP5XZ9IbHyYyL+136ThiLCK6GQAIpGiynAf2an+dSInX/8YGjo7E+vUCpt0kzjaPmsTYrCBw4kgGP85MiekxuqtrsGZQvv6nqr1xwKhtal+JA+yMWxsdd+rbwKfVxkCrB8eGqRyEsGFYnDrR8kpC2qL4EYNPpuIOIjmVfaXlqKIplCIw0RsJ6","attributes":{"enabled":true,"nbf":1567877925,"exp":1570469925,"created":1567877926,"updated":1567877926,"recoveryLevel":"Recoverable+Purgeable"},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/mergeCertificateName-canmergeaselfsignedcertificate-/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"EmailContacts"}}],"issuer":{"name":"Unknown","cert_transparency":false},"attributes":{"enabled":true,"created":1567877924,"updated":1567877924}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/mergeCertificateName-canmergeaselfsignedcertificate-/pending"}}, [ 'Cache-Control',
>>>>>>> [KeyVault-Certificates] Tweaks to the tests
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://keyvault_name.vault.azure.net/certificates/mergeCertificateName-canmergeaselfsignedcertificate-?api-version=7.0',
  'Server',
  'Microsoft-IIS/10.0',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
<<<<<<< HEAD
  '2810fb14-23fe-4f11-83b4-f2e9cd6f2659',
=======
  '465a8429-6c07-4885-9380-373b3538ae2f',
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
  'Fri, 06 Sep 2019 15:17:16 GMT',
  'Connection',
  'close',
  'Content-Length',
  '2466' ]);
=======
  'Sat, 07 Sep 2019 17:38:46 GMT',
  'Connection',
  'close',
  'Content-Length',
  '2456' ]);
>>>>>>> [KeyVault-Certificates] Tweaks to the tests


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/certificates/mergeCertificateName-canmergeaselfsignedcertificate-')
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
  '07975998-a4a8-4854-9c37-6e4894e6abf5',
=======
  '4b0ee813-ef6d-4940-8626-ed34d1866b40',
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
  'Fri, 06 Sep 2019 15:17:16 GMT',
=======
  'Sat, 07 Sep 2019 17:38:46 GMT',
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
  'd7443a2a-6e8f-41f1-9989-0d8766122000',
=======
  'edd2835b-033b-4465-b0b8-757066004b00',
>>>>>>> [KeyVault-Certificates] Tweaks to the tests
  'x-ms-ests-server',
  '2.1.9338.12 - EUS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
<<<<<<< HEAD
  'fpc=AoyyxzCytpBOnRENP4Gztq0_aSJHBAAAAHhvBNUOAAAA; expires=Sun, 06-Oct-2019 15:17:17 GMT; path=/; secure; HttpOnly',
=======
  'fpc=AsnFT4Xab9dBmr4AhttmxR8_aSJHBAAAACLiBdUOAAAA; expires=Mon, 07-Oct-2019 17:38:47 GMT; path=/; secure; HttpOnly',
>>>>>>> [KeyVault-Certificates] Tweaks to the tests
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; HttpOnly',
  'Date',
<<<<<<< HEAD
  'Fri, 06 Sep 2019 15:17:16 GMT',
=======
  'Sat, 07 Sep 2019 17:38:46 GMT',
>>>>>>> [KeyVault-Certificates] Tweaks to the tests
  'Connection',
  'close',
  'Content-Length',
  '1231' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/certificates/mergeCertificateName-canmergeaselfsignedcertificate-')
  .query(true)
<<<<<<< HEAD
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/mergeCertificateName-canmergeaselfsignedcertificate-","deletedDate":1567783037,"scheduledPurgeDate":1575559037,"id":"https://keyvault_name.vault.azure.net/certificates/mergeCertificateName-canmergeaselfsignedcertificate-/19a967fd2fcb41c9905bb6bdc6ae4053","kid":"https://keyvault_name.vault.azure.net/keys/mergeCertificateName-canmergeaselfsignedcertificate-/19a967fd2fcb41c9905bb6bdc6ae4053","sid":"https://keyvault_name.vault.azure.net/secrets/mergeCertificateName-canmergeaselfsignedcertificate-/19a967fd2fcb41c9905bb6bdc6ae4053","x5t":"nhjWL8mt4m3yufmMdBy6gKGtHik","cer":"MIIC0jCCAboCCQCvWVuc19qyBjANBgkqhkiG9w0BAQsFADBFMQswCQYDVQQGEwJBVTETMBEGA1UECAwKU29tZS1TdGF0ZTEhMB8GA1UECgwYSW50ZXJuZXQgV2lkZ2l0cyBQdHkgTHRkMB4XDTE5MDkwNjE1MTcxNVoXDTE5MTAwNjE1MTcxNVowETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA1XTsM6c9tMbY6FJMI8phRJastmArA8032G+vE7vvUygUZtUPiTGudUlUMp9R5iTfwgJAj1WgbnN1zL3e2lSVOK1BtjjI1MvqoYQuDnl3Om1FJUP8apdgcCYT4XnfqrGaBsb9QHymQ3gDO+312ioz18Nmc16v9pKtVxqU1ecBoanYL1ika+8bVXJTAokBrVPSgPCrekT5NwjILim4DOQhXwwHIe6W9oPHbvnoO1go6NUK562f45kl07KAg7yKz1kAAjl89AuJZ2rTw5hu6U8rtaURhrRNSG6PwqHd7F/Qpvi3zjhKhZg/bgMXzS+n+cFXNqisPuRQO0fJzDS9lpsDzQIDAQABMA0GCSqGSIb3DQEBCwUAA4IBAQBHSGOuBTtprqwlGz7K7ry6hceHaKOKgrKji1XQhYbn7oY09LFrMT0k0tUfra/0YipQLK5nfXfBhanVJBxtai8gJMQHPdEyh7h96wu72cmx/57qfw8DeNMVOW0+yiXrdgudiEw9dXHx+P52QJI7FldQBKfa4vtXxGZojpv9gOq23LlCOgtPmCoJL6ixIbE2NAWnrKQBuDvV0vC3KcnZ5DYUUNwM7V8IysTC5OFD6yS4zWQa5LvtTZw+DHkidzuCsn2Hd3z6cZcKMOLWF5qlA0LiAUjjp1cxRe44UkTE6Ma79jsITV1uRM9Ss7qr7vU/HrALQuf/HNBrwxfsHCyRA7pj","attributes":{"enabled":true,"nbf":1567783035,"exp":1570375035,"created":1567783036,"updated":1567783036,"recoveryLevel":"Recoverable+Purgeable"},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/mergeCertificateName-canmergeaselfsignedcertificate-/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"EmailContacts"}}],"issuer":{"name":"Unknown","cert_transparency":false},"attributes":{"enabled":true,"created":1567783034,"updated":1567783034}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/mergeCertificateName-canmergeaselfsignedcertificate-/pending"}}, [ 'Cache-Control',
=======
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/mergeCertificateName-canmergeaselfsignedcertificate-","deletedDate":1567877927,"scheduledPurgeDate":1575653927,"id":"https://keyvault_name.vault.azure.net/certificates/mergeCertificateName-canmergeaselfsignedcertificate-/a70b5c8d3918432ba9d01a0fe2a52c8b","kid":"https://keyvault_name.vault.azure.net/keys/mergeCertificateName-canmergeaselfsignedcertificate-/a70b5c8d3918432ba9d01a0fe2a52c8b","sid":"https://keyvault_name.vault.azure.net/secrets/mergeCertificateName-canmergeaselfsignedcertificate-/a70b5c8d3918432ba9d01a0fe2a52c8b","x5t":"lkTqu9UHco5q8LERMhXn8wAaVrA","cer":"MIIC0jCCAboCCQCvWVuc19qyBzANBgkqhkiG9w0BAQsFADBFMQswCQYDVQQGEwJBVTETMBEGA1UECAwKU29tZS1TdGF0ZTEhMB8GA1UECgwYSW50ZXJuZXQgV2lkZ2l0cyBQdHkgTHRkMB4XDTE5MDkwNzE3Mzg0NVoXDTE5MTAwNzE3Mzg0NVowETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAuBBYYtNTBUTlOwOY5+Ai+WKFvcf8jnSN56+IgM9zJoRKTQBNOBCk5X/RFs1DuqpH9vIvPJ4EDc2R0zF+qUhD1bkNKQfDvMDauoSpVApGYo5EEp+hVeJlykNrXAHXRBZD9HvunZOh0UBianwtl9TesT1vUbj0CU0+IOmhxr62GsbVhbMZoBoNt19yvh52to0uADLRwVdZJXsVCXYsKcwdP0Zygn7jffjuQ9VzE7YWLbQb0QYeXYhilQhk82N/+CwCi28JKldWYckCBzJb8bzTnsPYYZqMpD9CuFqOYgzoM5Dq/PEy170q2wWQS5ZKHCFOHh+tu5WaqXJuG1neqVRC2QIDAQABMA0GCSqGSIb3DQEBCwUAA4IBAQCgzKO5E3mHDkPE92uvCH3WayOK8wamEzD23NzOQ7nEdFPjzt6RKdiUAUSj+xPnNXCdR2VHCL2m1tazV6YyJuCFNWOalWXyHaDl7R1hhwKQ76JYBoa3w4Cgt3dJUYeZVDznj51JKy1nufcmbSLj7mjltd+4P44gV7IwP5XZ9IbHyYyL+136ThiLCK6GQAIpGiynAf2an+dSInX/8YGjo7E+vUCpt0kzjaPmsTYrCBw4kgGP85MiekxuqtrsGZQvv6nqr1xwKhtal+JA+yMWxsdd+rbwKfVxkCrB8eGqRyEsGFYnDrR8kpC2qL4EYNPpuIOIjmVfaXlqKIplCIw0RsJ6","attributes":{"enabled":true,"nbf":1567877925,"exp":1570469925,"created":1567877926,"updated":1567877926,"recoveryLevel":"Recoverable+Purgeable"},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/mergeCertificateName-canmergeaselfsignedcertificate-/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"EmailContacts"}}],"issuer":{"name":"Unknown","cert_transparency":false},"attributes":{"enabled":true,"created":1567877924,"updated":1567877924}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/mergeCertificateName-canmergeaselfsignedcertificate-/pending"}}, [ 'Cache-Control',
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
  '24c1c064-97f1-4931-9101-e0655760a56c',
=======
  '1ffeeba7-83d0-4242-93ce-82140cd9dd85',
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
  'Fri, 06 Sep 2019 15:17:17 GMT',
  'Connection',
  'close',
  'Content-Length',
  '2664' ]);
=======
  'Sat, 07 Sep 2019 17:38:46 GMT',
  'Connection',
  'close',
  'Content-Length',
  '2652' ]);
>>>>>>> [KeyVault-Certificates] Tweaks to the tests


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedcertificates/mergeCertificateName-canmergeaselfsignedcertificate-')
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
  'f8c446ae-c994-4418-a03d-abb6ed88ea37',
=======
  '2fcb8b9b-1a03-47c8-b7e9-5f377b4c31d2',
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
  'Fri, 06 Sep 2019 15:17:17 GMT',
=======
  'Sat, 07 Sep 2019 17:38:47 GMT',
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
  '2a639ed2-e7ac-4a67-8427-1beffab61e00',
  'x-ms-ests-server',
  '2.1.9338.12 - EUS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AoyyxzCytpBOnRENP4Gztq0_aSJHBQAAAHhvBNUOAAAA; expires=Sun, 06-Oct-2019 15:17:18 GMT; path=/; secure; HttpOnly',
=======
  '7e2bdb5f-2171-47b6-ac36-05b2abe14500',
  'x-ms-ests-server',
  '2.1.9338.12 - SCUS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AsnFT4Xab9dBmr4AhttmxR8_aSJHBQAAACLiBdUOAAAA; expires=Mon, 07-Oct-2019 17:38:47 GMT; path=/; secure; HttpOnly',
>>>>>>> [KeyVault-Certificates] Tweaks to the tests
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; HttpOnly',
  'Date',
<<<<<<< HEAD
  'Fri, 06 Sep 2019 15:17:18 GMT',
=======
  'Sat, 07 Sep 2019 17:38:47 GMT',
>>>>>>> [KeyVault-Certificates] Tweaks to the tests
  'Connection',
  'close',
  'Content-Length',
  '1231' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedcertificates/mergeCertificateName-canmergeaselfsignedcertificate-')
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
  'b40c2be6-bc35-47bf-a234-01b368713256',
=======
  '92e2f307-31fd-4785-a0b2-d8a9ad9768f4',
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
  'Fri, 06 Sep 2019 15:17:18 GMT',
=======
  'Sat, 07 Sep 2019 17:38:47 GMT',
>>>>>>> [KeyVault-Certificates] Tweaks to the tests
  'Connection',
  'close' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedcertificates/mergeCertificateName-canmergeaselfsignedcertificate-')
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
  'a8a659ed-5424-4639-b0a8-0e3d97a9cf0f',
=======
  '730f5aff-da79-4584-bf44-2679616eb3b2',
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
  'Fri, 06 Sep 2019 15:17:28 GMT',
=======
  'Sat, 07 Sep 2019 17:38:57 GMT',
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
  '3c5a9cb4-4bab-4b20-8a97-de325eb91d00',
  'x-ms-ests-server',
  '2.1.9338.12 - NCUS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AoyyxzCytpBOnRENP4Gztq0_aSJHBgAAAHhvBNUOAAAA; expires=Sun, 06-Oct-2019 15:17:29 GMT; path=/; secure; HttpOnly',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; HttpOnly',
  'Date',
  'Fri, 06 Sep 2019 15:17:28 GMT',
  'Connection',
  'close',
  'Content-Length',
  '1231' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedcertificates/mergeCertificateName-canmergeaselfsignedcertificate-')
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
  'd7a5cc15-68bc-4113-bc24-263951205308',
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
  'Fri, 06 Sep 2019 15:17:29 GMT',
  'Connection',
  'close' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedcertificates/mergeCertificateName-canmergeaselfsignedcertificate-')
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
  '638a9a12-5a23-4ba4-a3bd-0e6328db116c',
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
  'Fri, 06 Sep 2019 15:17:39 GMT',
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
  '39d26f4c-8923-424f-aa51-21c6c92b2100',
  'x-ms-ests-server',
  '2.1.9338.12 - WUS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AoyyxzCytpBOnRENP4Gztq0_aSJHBwAAAHhvBNUOAAAA; expires=Sun, 06-Oct-2019 15:17:40 GMT; path=/; secure; HttpOnly',
=======
  '8d6f6a6e-21c1-483d-ba84-97fd84504700',
  'x-ms-ests-server',
  '2.1.9338.12 - NCUS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AsnFT4Xab9dBmr4AhttmxR8_aSJHBgAAACLiBdUOAAAA; expires=Mon, 07-Oct-2019 17:38:58 GMT; path=/; secure; HttpOnly',
>>>>>>> [KeyVault-Certificates] Tweaks to the tests
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; HttpOnly',
  'Date',
<<<<<<< HEAD
  'Fri, 06 Sep 2019 15:17:39 GMT',
=======
  'Sat, 07 Sep 2019 17:38:58 GMT',
>>>>>>> [KeyVault-Certificates] Tweaks to the tests
  'Connection',
  'close',
  'Content-Length',
  '1231' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedcertificates/mergeCertificateName-canmergeaselfsignedcertificate-')
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
  '5127411f-afeb-4a3e-99f9-909fb1a6fd12',
=======
  'b54b9849-da8c-4cbd-a242-b93c71ca4122',
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
  'Fri, 06 Sep 2019 15:17:39 GMT',
=======
  'Sat, 07 Sep 2019 17:38:58 GMT',
>>>>>>> [KeyVault-Certificates] Tweaks to the tests
  'Connection',
  'close' ]);


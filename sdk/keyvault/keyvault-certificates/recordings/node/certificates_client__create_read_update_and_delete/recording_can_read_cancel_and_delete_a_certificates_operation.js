let nock = require('nock');

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/certificates/recoverCertificateName-canreadcancelanddeleteacertificatesoperation-/create')
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
  'dc09ab7d-91eb-49e8-9ada-516ea80210a3',
=======
  'b04cd577-58b4-45ed-8382-8ede4a0db016',
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
  'Fri, 06 Sep 2019 15:12:27 GMT',
=======
  'Sat, 07 Sep 2019 17:33:50 GMT',
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
  '27e11632-e679-4c92-bf12-10c2a14a2000',
  'x-ms-ests-server',
  '2.1.9338.12 - EUS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AjAqddJsNTNNiLQHwvLZGeQ_aSJHAQAAAFpuBNUOAAAA; expires=Sun, 06-Oct-2019 15:12:27 GMT; path=/; secure; HttpOnly',
=======
  'd4bc5fe8-dec8-4b3b-a887-d946daf54300',
  'x-ms-ests-server',
  '2.1.9338.12 - SCUS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=Aua3bGMEgAJAm5OKzuHvUiU_aSJHAQAAAP7gBdUOAAAA; expires=Mon, 07-Oct-2019 17:33:51 GMT; path=/; secure; HttpOnly',
>>>>>>> [KeyVault-Certificates] Tweaks to the tests
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; HttpOnly',
  'Date',
<<<<<<< HEAD
  'Fri, 06 Sep 2019 15:12:26 GMT',
=======
  'Sat, 07 Sep 2019 17:33:50 GMT',
>>>>>>> [KeyVault-Certificates] Tweaks to the tests
  'Connection',
  'close',
  'Content-Length',
  '1231' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/certificates/recoverCertificateName-canreadcancelanddeleteacertificatesoperation-/create', {"policy":{"x509_props":{"subject":"cn=MyCert"},"issuer":{"name":"Self"}},"attributes":{}})
  .query(true)
<<<<<<< HEAD
  .reply(202, {"id":"https://keyvault_name.vault.azure.net/certificates/recoverCertificateName-canreadcancelanddeleteacertificatesoperation-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA1Wj99ArC6MgWH87kfQ1/ZLFs/W1gxd028PHV+WfEjNdDzdLcDuFn9xeeol88rAYf1Se2DZrbNkTFUR6fhy06IMWuFQhgIG149zX4C328g4lfYaSUqvAxEgEu5dI5Pj4TghWs1hGbmL+LjVTnDVzJPU3ebIMl7HjjuU17UZtNFB68iWoQoMOlPVgyallM0FD50vUUdBgaFKgKb1Ifz63YBJrCUla3xmJTcZIhYwk9YwhNXhc9h6A1NmQmf19dbX6Rt0akspbQno1lSzxLtarP2aqXNbrKLGwO1yLaoTU6LK27IxYrYtyT3tm0iy6z80bRKJAG/Opc62f7ZSRnaVHESQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBALNUt5N8sQYm5sf0pCr7aXkRlXdCX0vak+mkzoxOn2F0rNT+16BA+bFfEAKlTK4C7LZvgRPjLSI/TfSFveEWsU7ymFSUizRX5kv6JuWvwjga9uKF/VdQGevGES5NwfVuQFUHL8dA3vYpvQwRUQ3LW8FzOeSn6qZDHHksEu7yEQxSMj4DmlAXoZR7nzuv9zvdP0vgHeu/oRSlzSJbVnpOB1CXP5KRCnbS3FtrHGQLfuyebshW9v3EoWhYUH28TPpa0MQyXQKYGwWFtCM8tW9Ac4KQRxbpGsLx5avIsB01tj6ALAd59H+drci1qaxSIb8z+iFrbbynWdf7NSUC4ioYWvs=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"40cb77f07a9947ddb7020857aef7a003"}, [ 'Cache-Control',
=======
  .reply(202, {"id":"https://keyvault_name.vault.azure.net/certificates/recoverCertificateName-canreadcancelanddeleteacertificatesoperation-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAzrzioQfRWUfNVUijWJdXax/9Mr0gctVkZ7kY2bmyUAwRkXt7pPjTfEYCASKDdHzETXOzgWIMG7vSpGr4/BqdYSGaM43k8xL1588Ebv2ElionIYDNdZRojkY2BgmvSOfgIyrqNm10jeQkxk/E1iuk4INKifjLf8tU+k5M2JBFaPY48oTHnLWs9GqbmmJKejlkjvjz3ii0CpDQut9ekJQBn0YHS2DaQAzx3V57r8yzPNnOfRjyxdp0tbe4UjlMdXVPx45Y2e/vnaYMLAZBFkowJ15w2zxbM98saUVajT8qwtrKYgDU5xh3eHLkwSVFT9205WoZsr6siMfKKGIaHgpnrQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAEvC+JMDqItq30VH6+sBY4q77cV8yv3Jma57l5UOVfZlrbGhdrzcMsdBAaEQqELH2VCavK/FCSycVSEgXYvxkqkqpdr18zBrs7MYkaFH/nIGFv/bUGQnBuu8xNikwK7akiLbCJEnmJmMUE7fR18wc1X53MH6fX7hfQN4GAjETtxpQ7e9jkluH4mMhVb7SMhgkNY1FoI+FkZEiAdLFHz7qrMY03uN048+6A1B77jRweM8kE/2nRxfCwuxatNORp1wreKpFGIB/KtUz7+fu6LRcQypIJreLKCXknSGotAAj4ffDWqO6nHw+wCSLZvjoyOXdH6bmRVFZ3omE+gnxOq1rpo=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"90a1c5357de94ff0ac92cd74703c717f"}, [ 'Cache-Control',
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
  'https://keyvault_name.vault.azure.net/certificates/recoverCertificateName-canreadcancelanddeleteacertificatesoperation-/pending?api-version=7.0&request_id=40cb77f07a9947ddb7020857aef7a003',
=======
  'https://keyvault_name.vault.azure.net/certificates/recoverCertificateName-canreadcancelanddeleteacertificatesoperation-/pending?api-version=7.0&request_id=90a1c5357de94ff0ac92cd74703c717f',
>>>>>>> [KeyVault-Certificates] Tweaks to the tests
  'Retry-After',
  '10',
  'Server',
  'Microsoft-IIS/10.0',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
<<<<<<< HEAD
  'b40f627a-ecad-41d7-a06d-0a00505a5512',
=======
  '335c1c7f-4fa1-4c7b-a763-9d37c0060fe6',
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
  'Fri, 06 Sep 2019 15:12:27 GMT',
=======
  'Sat, 07 Sep 2019 17:33:51 GMT',
>>>>>>> [KeyVault-Certificates] Tweaks to the tests
  'Connection',
  'close',
  'Content-Length',
  '1355' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/recoverCertificateName-canreadcancelanddeleteacertificatesoperation-/pending')
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
  '6773edad-9010-4882-bbcc-3b748f6d6e84',
=======
  '3f1544ef-aa85-4d94-bce2-5af7f8ef5784',
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
  'Fri, 06 Sep 2019 15:12:27 GMT',
=======
  'Sat, 07 Sep 2019 17:33:51 GMT',
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
  '681ab4b1-293f-4af3-8c7f-a60315592400',
  'x-ms-ests-server',
  '2.1.9338.12 - WUS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AjAqddJsNTNNiLQHwvLZGeQ_aSJHAgAAAFpuBNUOAAAA; expires=Sun, 06-Oct-2019 15:12:28 GMT; path=/; secure; HttpOnly',
=======
  'f5985c66-195c-4b36-8699-af6092875000',
  'x-ms-ests-server',
  '2.1.9338.12 - NCUS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=Aua3bGMEgAJAm5OKzuHvUiU_aSJHAgAAAP7gBdUOAAAA; expires=Mon, 07-Oct-2019 17:33:52 GMT; path=/; secure; HttpOnly',
>>>>>>> [KeyVault-Certificates] Tweaks to the tests
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; HttpOnly',
  'Date',
<<<<<<< HEAD
  'Fri, 06 Sep 2019 15:12:28 GMT',
=======
  'Sat, 07 Sep 2019 17:33:52 GMT',
>>>>>>> [KeyVault-Certificates] Tweaks to the tests
  'Connection',
  'close',
  'Content-Length',
  '1231' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/recoverCertificateName-canreadcancelanddeleteacertificatesoperation-/pending')
  .query(true)
<<<<<<< HEAD
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/recoverCertificateName-canreadcancelanddeleteacertificatesoperation-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA1Wj99ArC6MgWH87kfQ1/ZLFs/W1gxd028PHV+WfEjNdDzdLcDuFn9xeeol88rAYf1Se2DZrbNkTFUR6fhy06IMWuFQhgIG149zX4C328g4lfYaSUqvAxEgEu5dI5Pj4TghWs1hGbmL+LjVTnDVzJPU3ebIMl7HjjuU17UZtNFB68iWoQoMOlPVgyallM0FD50vUUdBgaFKgKb1Ifz63YBJrCUla3xmJTcZIhYwk9YwhNXhc9h6A1NmQmf19dbX6Rt0akspbQno1lSzxLtarP2aqXNbrKLGwO1yLaoTU6LK27IxYrYtyT3tm0iy6z80bRKJAG/Opc62f7ZSRnaVHESQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBALNUt5N8sQYm5sf0pCr7aXkRlXdCX0vak+mkzoxOn2F0rNT+16BA+bFfEAKlTK4C7LZvgRPjLSI/TfSFveEWsU7ymFSUizRX5kv6JuWvwjga9uKF/VdQGevGES5NwfVuQFUHL8dA3vYpvQwRUQ3LW8FzOeSn6qZDHHksEu7yEQxSMj4DmlAXoZR7nzuv9zvdP0vgHeu/oRSlzSJbVnpOB1CXP5KRCnbS3FtrHGQLfuyebshW9v3EoWhYUH28TPpa0MQyXQKYGwWFtCM8tW9Ac4KQRxbpGsLx5avIsB01tj6ALAd59H+drci1qaxSIb8z+iFrbbynWdf7NSUC4ioYWvs=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"40cb77f07a9947ddb7020857aef7a003"}, [ 'Cache-Control',
=======
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/recoverCertificateName-canreadcancelanddeleteacertificatesoperation-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAzrzioQfRWUfNVUijWJdXax/9Mr0gctVkZ7kY2bmyUAwRkXt7pPjTfEYCASKDdHzETXOzgWIMG7vSpGr4/BqdYSGaM43k8xL1588Ebv2ElionIYDNdZRojkY2BgmvSOfgIyrqNm10jeQkxk/E1iuk4INKifjLf8tU+k5M2JBFaPY48oTHnLWs9GqbmmJKejlkjvjz3ii0CpDQut9ekJQBn0YHS2DaQAzx3V57r8yzPNnOfRjyxdp0tbe4UjlMdXVPx45Y2e/vnaYMLAZBFkowJ15w2zxbM98saUVajT8qwtrKYgDU5xh3eHLkwSVFT9205WoZsr6siMfKKGIaHgpnrQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAEvC+JMDqItq30VH6+sBY4q77cV8yv3Jma57l5UOVfZlrbGhdrzcMsdBAaEQqELH2VCavK/FCSycVSEgXYvxkqkqpdr18zBrs7MYkaFH/nIGFv/bUGQnBuu8xNikwK7akiLbCJEnmJmMUE7fR18wc1X53MH6fX7hfQN4GAjETtxpQ7e9jkluH4mMhVb7SMhgkNY1FoI+FkZEiAdLFHz7qrMY03uN048+6A1B77jRweM8kE/2nRxfCwuxatNORp1wreKpFGIB/KtUz7+fu6LRcQypIJreLKCXknSGotAAj4ffDWqO6nHw+wCSLZvjoyOXdH6bmRVFZ3omE+gnxOq1rpo=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"90a1c5357de94ff0ac92cd74703c717f"}, [ 'Cache-Control',
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
  '6435306b-b5ff-48c3-9089-4607bf6f69a5',
=======
  'b26e5111-1c9c-45cc-ab16-f5a9df69816e',
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
  'Fri, 06 Sep 2019 15:12:28 GMT',
=======
  'Sat, 07 Sep 2019 17:33:52 GMT',
>>>>>>> [KeyVault-Certificates] Tweaks to the tests
  'Connection',
  'close',
  'Content-Length',
  '1355' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .patch('/certificates/recoverCertificateName-canreadcancelanddeleteacertificatesoperation-/pending')
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
  '9ae995cf-fbde-4c7b-a351-bb82d4b49c54',
=======
  '704c6a34-6297-43a9-9317-bef8f4025036',
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
  'Fri, 06 Sep 2019 15:12:29 GMT',
=======
  'Sat, 07 Sep 2019 17:33:52 GMT',
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
  '39d26f4c-8923-424f-aa51-21c646082100',
=======
  '49396a46-52da-4706-82f8-265708074700',
>>>>>>> [KeyVault-Certificates] Tweaks to the tests
  'x-ms-ests-server',
  '2.1.9338.12 - WUS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
<<<<<<< HEAD
  'fpc=AjAqddJsNTNNiLQHwvLZGeQ_aSJHAwAAAFpuBNUOAAAA; expires=Sun, 06-Oct-2019 15:12:29 GMT; path=/; secure; HttpOnly',
=======
  'fpc=Aua3bGMEgAJAm5OKzuHvUiU_aSJHAwAAAP7gBdUOAAAA; expires=Mon, 07-Oct-2019 17:33:53 GMT; path=/; secure; HttpOnly',
>>>>>>> [KeyVault-Certificates] Tweaks to the tests
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; HttpOnly',
  'Date',
<<<<<<< HEAD
  'Fri, 06 Sep 2019 15:12:29 GMT',
=======
  'Sat, 07 Sep 2019 17:33:52 GMT',
>>>>>>> [KeyVault-Certificates] Tweaks to the tests
  'Connection',
  'close',
  'Content-Length',
  '1231' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .patch('/certificates/recoverCertificateName-canreadcancelanddeleteacertificatesoperation-/pending', {"cancellation_requested":true})
  .query(true)
<<<<<<< HEAD
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/recoverCertificateName-canreadcancelanddeleteacertificatesoperation-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA1Wj99ArC6MgWH87kfQ1/ZLFs/W1gxd028PHV+WfEjNdDzdLcDuFn9xeeol88rAYf1Se2DZrbNkTFUR6fhy06IMWuFQhgIG149zX4C328g4lfYaSUqvAxEgEu5dI5Pj4TghWs1hGbmL+LjVTnDVzJPU3ebIMl7HjjuU17UZtNFB68iWoQoMOlPVgyallM0FD50vUUdBgaFKgKb1Ifz63YBJrCUla3xmJTcZIhYwk9YwhNXhc9h6A1NmQmf19dbX6Rt0akspbQno1lSzxLtarP2aqXNbrKLGwO1yLaoTU6LK27IxYrYtyT3tm0iy6z80bRKJAG/Opc62f7ZSRnaVHESQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBALNUt5N8sQYm5sf0pCr7aXkRlXdCX0vak+mkzoxOn2F0rNT+16BA+bFfEAKlTK4C7LZvgRPjLSI/TfSFveEWsU7ymFSUizRX5kv6JuWvwjga9uKF/VdQGevGES5NwfVuQFUHL8dA3vYpvQwRUQ3LW8FzOeSn6qZDHHksEu7yEQxSMj4DmlAXoZR7nzuv9zvdP0vgHeu/oRSlzSJbVnpOB1CXP5KRCnbS3FtrHGQLfuyebshW9v3EoWhYUH28TPpa0MQyXQKYGwWFtCM8tW9Ac4KQRxbpGsLx5avIsB01tj6ALAd59H+drci1qaxSIb8z+iFrbbynWdf7NSUC4ioYWvs=","cancellation_requested":true,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"40cb77f07a9947ddb7020857aef7a003"}, [ 'Cache-Control',
=======
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/recoverCertificateName-canreadcancelanddeleteacertificatesoperation-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAzrzioQfRWUfNVUijWJdXax/9Mr0gctVkZ7kY2bmyUAwRkXt7pPjTfEYCASKDdHzETXOzgWIMG7vSpGr4/BqdYSGaM43k8xL1588Ebv2ElionIYDNdZRojkY2BgmvSOfgIyrqNm10jeQkxk/E1iuk4INKifjLf8tU+k5M2JBFaPY48oTHnLWs9GqbmmJKejlkjvjz3ii0CpDQut9ekJQBn0YHS2DaQAzx3V57r8yzPNnOfRjyxdp0tbe4UjlMdXVPx45Y2e/vnaYMLAZBFkowJ15w2zxbM98saUVajT8qwtrKYgDU5xh3eHLkwSVFT9205WoZsr6siMfKKGIaHgpnrQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAEvC+JMDqItq30VH6+sBY4q77cV8yv3Jma57l5UOVfZlrbGhdrzcMsdBAaEQqELH2VCavK/FCSycVSEgXYvxkqkqpdr18zBrs7MYkaFH/nIGFv/bUGQnBuu8xNikwK7akiLbCJEnmJmMUE7fR18wc1X53MH6fX7hfQN4GAjETtxpQ7e9jkluH4mMhVb7SMhgkNY1FoI+FkZEiAdLFHz7qrMY03uN048+6A1B77jRweM8kE/2nRxfCwuxatNORp1wreKpFGIB/KtUz7+fu6LRcQypIJreLKCXknSGotAAj4ffDWqO6nHw+wCSLZvjoyOXdH6bmRVFZ3omE+gnxOq1rpo=","cancellation_requested":true,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"90a1c5357de94ff0ac92cd74703c717f"}, [ 'Cache-Control',
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
  'ecd85f70-c92e-4a08-9a1a-5835f6d7205b',
=======
  '25c31e96-537d-46e5-b750-3be435f500e2',
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
  'Fri, 06 Sep 2019 15:12:29 GMT',
=======
  'Sat, 07 Sep 2019 17:33:53 GMT',
>>>>>>> [KeyVault-Certificates] Tweaks to the tests
  'Connection',
  'close',
  'Content-Length',
  '1354' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/recoverCertificateName-canreadcancelanddeleteacertificatesoperation-/pending')
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
  '72a0a576-30f1-4353-a30d-a60815facb78',
=======
  '9c2b51ea-2ac4-473c-a971-3126d29e2c1e',
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
  'Fri, 06 Sep 2019 15:12:30 GMT',
=======
  'Sat, 07 Sep 2019 17:33:53 GMT',
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
  'b81aac8c-6804-4fca-a64f-d85baed11d00',
  'x-ms-ests-server',
  '2.1.9338.12 - NCUS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AjAqddJsNTNNiLQHwvLZGeQ_aSJHBAAAAFpuBNUOAAAA; expires=Sun, 06-Oct-2019 15:12:30 GMT; path=/; secure; HttpOnly',
=======
  '7243af85-5a0f-46a3-aa7e-28bde77e5000',
  'x-ms-ests-server',
  '2.1.9338.12 - WUS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=Aua3bGMEgAJAm5OKzuHvUiU_aSJHBAAAAP7gBdUOAAAA; expires=Mon, 07-Oct-2019 17:33:54 GMT; path=/; secure; HttpOnly',
>>>>>>> [KeyVault-Certificates] Tweaks to the tests
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; HttpOnly',
  'Date',
<<<<<<< HEAD
  'Fri, 06 Sep 2019 15:12:30 GMT',
=======
  'Sat, 07 Sep 2019 17:33:53 GMT',
>>>>>>> [KeyVault-Certificates] Tweaks to the tests
  'Connection',
  'close',
  'Content-Length',
  '1231' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/recoverCertificateName-canreadcancelanddeleteacertificatesoperation-/pending')
  .query(true)
<<<<<<< HEAD
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/recoverCertificateName-canreadcancelanddeleteacertificatesoperation-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA1Wj99ArC6MgWH87kfQ1/ZLFs/W1gxd028PHV+WfEjNdDzdLcDuFn9xeeol88rAYf1Se2DZrbNkTFUR6fhy06IMWuFQhgIG149zX4C328g4lfYaSUqvAxEgEu5dI5Pj4TghWs1hGbmL+LjVTnDVzJPU3ebIMl7HjjuU17UZtNFB68iWoQoMOlPVgyallM0FD50vUUdBgaFKgKb1Ifz63YBJrCUla3xmJTcZIhYwk9YwhNXhc9h6A1NmQmf19dbX6Rt0akspbQno1lSzxLtarP2aqXNbrKLGwO1yLaoTU6LK27IxYrYtyT3tm0iy6z80bRKJAG/Opc62f7ZSRnaVHESQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBALNUt5N8sQYm5sf0pCr7aXkRlXdCX0vak+mkzoxOn2F0rNT+16BA+bFfEAKlTK4C7LZvgRPjLSI/TfSFveEWsU7ymFSUizRX5kv6JuWvwjga9uKF/VdQGevGES5NwfVuQFUHL8dA3vYpvQwRUQ3LW8FzOeSn6qZDHHksEu7yEQxSMj4DmlAXoZR7nzuv9zvdP0vgHeu/oRSlzSJbVnpOB1CXP5KRCnbS3FtrHGQLfuyebshW9v3EoWhYUH28TPpa0MQyXQKYGwWFtCM8tW9Ac4KQRxbpGsLx5avIsB01tj6ALAd59H+drci1qaxSIb8z+iFrbbynWdf7NSUC4ioYWvs=","cancellation_requested":true,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"40cb77f07a9947ddb7020857aef7a003"}, [ 'Cache-Control',
=======
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/recoverCertificateName-canreadcancelanddeleteacertificatesoperation-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAzrzioQfRWUfNVUijWJdXax/9Mr0gctVkZ7kY2bmyUAwRkXt7pPjTfEYCASKDdHzETXOzgWIMG7vSpGr4/BqdYSGaM43k8xL1588Ebv2ElionIYDNdZRojkY2BgmvSOfgIyrqNm10jeQkxk/E1iuk4INKifjLf8tU+k5M2JBFaPY48oTHnLWs9GqbmmJKejlkjvjz3ii0CpDQut9ekJQBn0YHS2DaQAzx3V57r8yzPNnOfRjyxdp0tbe4UjlMdXVPx45Y2e/vnaYMLAZBFkowJ15w2zxbM98saUVajT8qwtrKYgDU5xh3eHLkwSVFT9205WoZsr6siMfKKGIaHgpnrQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAEvC+JMDqItq30VH6+sBY4q77cV8yv3Jma57l5UOVfZlrbGhdrzcMsdBAaEQqELH2VCavK/FCSycVSEgXYvxkqkqpdr18zBrs7MYkaFH/nIGFv/bUGQnBuu8xNikwK7akiLbCJEnmJmMUE7fR18wc1X53MH6fX7hfQN4GAjETtxpQ7e9jkluH4mMhVb7SMhgkNY1FoI+FkZEiAdLFHz7qrMY03uN048+6A1B77jRweM8kE/2nRxfCwuxatNORp1wreKpFGIB/KtUz7+fu6LRcQypIJreLKCXknSGotAAj4ffDWqO6nHw+wCSLZvjoyOXdH6bmRVFZ3omE+gnxOq1rpo=","cancellation_requested":true,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"90a1c5357de94ff0ac92cd74703c717f"}, [ 'Cache-Control',
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
  'e03f4016-d612-4e1b-b537-4cf914bd146f',
=======
  '4df59e67-82b8-458d-be2e-bba5aff21764',
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
  'Fri, 06 Sep 2019 15:12:30 GMT',
=======
  'Sat, 07 Sep 2019 17:33:54 GMT',
>>>>>>> [KeyVault-Certificates] Tweaks to the tests
  'Connection',
  'close',
  'Content-Length',
  '1354' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/certificates/recoverCertificateName-canreadcancelanddeleteacertificatesoperation-/pending')
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
  '24490fb2-8b41-40f9-a665-0632a95ad44a',
=======
  'aed07662-831c-499f-b9c2-99ed2c69b55a',
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
  'Fri, 06 Sep 2019 15:12:31 GMT',
=======
  'Sat, 07 Sep 2019 17:33:54 GMT',
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
  '53780b96-a747-4fea-b1df-85745f082100',
  'x-ms-ests-server',
  '2.1.9338.12 - WUS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AjAqddJsNTNNiLQHwvLZGeQ_aSJHBQAAAFpuBNUOAAAA; expires=Sun, 06-Oct-2019 15:12:31 GMT; path=/; secure; HttpOnly',
=======
  'a17d8464-ccd2-494c-9845-a8de8fd54300',
  'x-ms-ests-server',
  '2.1.9338.12 - NCUS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=Aua3bGMEgAJAm5OKzuHvUiU_aSJHBQAAAP7gBdUOAAAA; expires=Mon, 07-Oct-2019 17:33:55 GMT; path=/; secure; HttpOnly',
>>>>>>> [KeyVault-Certificates] Tweaks to the tests
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; HttpOnly',
  'Date',
<<<<<<< HEAD
  'Fri, 06 Sep 2019 15:12:31 GMT',
=======
  'Sat, 07 Sep 2019 17:33:55 GMT',
>>>>>>> [KeyVault-Certificates] Tweaks to the tests
  'Connection',
  'close',
  'Content-Length',
  '1231' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/certificates/recoverCertificateName-canreadcancelanddeleteacertificatesoperation-/pending')
  .query(true)
<<<<<<< HEAD
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/recoverCertificateName-canreadcancelanddeleteacertificatesoperation-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA1Wj99ArC6MgWH87kfQ1/ZLFs/W1gxd028PHV+WfEjNdDzdLcDuFn9xeeol88rAYf1Se2DZrbNkTFUR6fhy06IMWuFQhgIG149zX4C328g4lfYaSUqvAxEgEu5dI5Pj4TghWs1hGbmL+LjVTnDVzJPU3ebIMl7HjjuU17UZtNFB68iWoQoMOlPVgyallM0FD50vUUdBgaFKgKb1Ifz63YBJrCUla3xmJTcZIhYwk9YwhNXhc9h6A1NmQmf19dbX6Rt0akspbQno1lSzxLtarP2aqXNbrKLGwO1yLaoTU6LK27IxYrYtyT3tm0iy6z80bRKJAG/Opc62f7ZSRnaVHESQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBALNUt5N8sQYm5sf0pCr7aXkRlXdCX0vak+mkzoxOn2F0rNT+16BA+bFfEAKlTK4C7LZvgRPjLSI/TfSFveEWsU7ymFSUizRX5kv6JuWvwjga9uKF/VdQGevGES5NwfVuQFUHL8dA3vYpvQwRUQ3LW8FzOeSn6qZDHHksEu7yEQxSMj4DmlAXoZR7nzuv9zvdP0vgHeu/oRSlzSJbVnpOB1CXP5KRCnbS3FtrHGQLfuyebshW9v3EoWhYUH28TPpa0MQyXQKYGwWFtCM8tW9Ac4KQRxbpGsLx5avIsB01tj6ALAd59H+drci1qaxSIb8z+iFrbbynWdf7NSUC4ioYWvs=","cancellation_requested":true,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"40cb77f07a9947ddb7020857aef7a003"}, [ 'Cache-Control',
=======
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/recoverCertificateName-canreadcancelanddeleteacertificatesoperation-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAzrzioQfRWUfNVUijWJdXax/9Mr0gctVkZ7kY2bmyUAwRkXt7pPjTfEYCASKDdHzETXOzgWIMG7vSpGr4/BqdYSGaM43k8xL1588Ebv2ElionIYDNdZRojkY2BgmvSOfgIyrqNm10jeQkxk/E1iuk4INKifjLf8tU+k5M2JBFaPY48oTHnLWs9GqbmmJKejlkjvjz3ii0CpDQut9ekJQBn0YHS2DaQAzx3V57r8yzPNnOfRjyxdp0tbe4UjlMdXVPx45Y2e/vnaYMLAZBFkowJ15w2zxbM98saUVajT8qwtrKYgDU5xh3eHLkwSVFT9205WoZsr6siMfKKGIaHgpnrQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAEvC+JMDqItq30VH6+sBY4q77cV8yv3Jma57l5UOVfZlrbGhdrzcMsdBAaEQqELH2VCavK/FCSycVSEgXYvxkqkqpdr18zBrs7MYkaFH/nIGFv/bUGQnBuu8xNikwK7akiLbCJEnmJmMUE7fR18wc1X53MH6fX7hfQN4GAjETtxpQ7e9jkluH4mMhVb7SMhgkNY1FoI+FkZEiAdLFHz7qrMY03uN048+6A1B77jRweM8kE/2nRxfCwuxatNORp1wreKpFGIB/KtUz7+fu6LRcQypIJreLKCXknSGotAAj4ffDWqO6nHw+wCSLZvjoyOXdH6bmRVFZ3omE+gnxOq1rpo=","cancellation_requested":true,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"90a1c5357de94ff0ac92cd74703c717f"}, [ 'Cache-Control',
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
  '610f6be2-bcb0-48f8-8edf-232a9834e811',
=======
  '645fb8bf-0de7-4d94-b4ed-da6b17a90a89',
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
  'Fri, 06 Sep 2019 15:12:31 GMT',
=======
  'Sat, 07 Sep 2019 17:33:54 GMT',
>>>>>>> [KeyVault-Certificates] Tweaks to the tests
  'Connection',
  'close',
  'Content-Length',
  '1354' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/recoverCertificateName-canreadcancelanddeleteacertificatesoperation-/pending')
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
  'de2d3d78-9d28-474a-9d45-7101ffadf051',
=======
  '6457352b-8cb3-4927-be8b-fc1e01d864c7',
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
  'Fri, 06 Sep 2019 15:12:31 GMT',
=======
  'Sat, 07 Sep 2019 17:33:55 GMT',
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
  '4039be7e-32eb-4442-ac67-70e500dd1c00',
=======
  '37beb416-22be-4f6d-8df7-814977b64400',
>>>>>>> [KeyVault-Certificates] Tweaks to the tests
  'x-ms-ests-server',
  '2.1.9338.12 - NCUS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
<<<<<<< HEAD
  'fpc=AjAqddJsNTNNiLQHwvLZGeQ_aSJHBgAAAFpuBNUOAAAA; expires=Sun, 06-Oct-2019 15:12:32 GMT; path=/; secure; HttpOnly',
=======
  'fpc=Aua3bGMEgAJAm5OKzuHvUiU_aSJHBgAAAP7gBdUOAAAA; expires=Mon, 07-Oct-2019 17:33:56 GMT; path=/; secure; HttpOnly',
>>>>>>> [KeyVault-Certificates] Tweaks to the tests
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; HttpOnly',
  'Date',
<<<<<<< HEAD
  'Fri, 06 Sep 2019 15:12:31 GMT',
=======
  'Sat, 07 Sep 2019 17:33:55 GMT',
>>>>>>> [KeyVault-Certificates] Tweaks to the tests
  'Connection',
  'close',
  'Content-Length',
  '1231' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/recoverCertificateName-canreadcancelanddeleteacertificatesoperation-/pending')
  .query(true)
  .reply(404, {"error":{"code":"PendingCertificateNotFound","message":"Pending certificate not found: recoverCertificateName-canreadcancelanddeleteacertificatesoperation-"}}, [ 'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '177',
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
  '8edec054-6484-464d-9859-5327cbbb87aa',
=======
  '5143ec58-8081-4984-a8d9-5464deee8567',
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
  'Fri, 06 Sep 2019 15:12:31 GMT',
=======
  'Sat, 07 Sep 2019 17:33:56 GMT',
>>>>>>> [KeyVault-Certificates] Tweaks to the tests
  'Connection',
  'close' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/certificates/recoverCertificateName-canreadcancelanddeleteacertificatesoperation-')
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
  'ee0d254b-7ce4-43c1-89e3-a9c6525d77fc',
=======
  '895793cd-d71b-41e2-985b-8e5e4383a5dc',
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
  'Fri, 06 Sep 2019 15:12:32 GMT',
=======
  'Sat, 07 Sep 2019 17:33:56 GMT',
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
  '79cb38b5-32fe-416f-a0af-5ffc76ec1e00',
  'x-ms-ests-server',
  '2.1.9338.12 - EUS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AjAqddJsNTNNiLQHwvLZGeQ_aSJHBwAAAFpuBNUOAAAA; expires=Sun, 06-Oct-2019 15:12:33 GMT; path=/; secure; HttpOnly',
=======
  '19bc7856-c74f-458a-a407-00a069fd4600',
  'x-ms-ests-server',
  '2.1.9338.12 - WUS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=Aua3bGMEgAJAm5OKzuHvUiU_aSJHBwAAAP7gBdUOAAAA; expires=Mon, 07-Oct-2019 17:33:57 GMT; path=/; secure; HttpOnly',
>>>>>>> [KeyVault-Certificates] Tweaks to the tests
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; HttpOnly',
  'Date',
<<<<<<< HEAD
  'Fri, 06 Sep 2019 15:12:32 GMT',
=======
  'Sat, 07 Sep 2019 17:33:56 GMT',
>>>>>>> [KeyVault-Certificates] Tweaks to the tests
  'Connection',
  'close',
  'Content-Length',
  '1231' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/certificates/recoverCertificateName-canreadcancelanddeleteacertificatesoperation-')
  .query(true)
<<<<<<< HEAD
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/recoverCertificateName-canreadcancelanddeleteacertificatesoperation-","deletedDate":1567782753,"scheduledPurgeDate":1575558753,"id":"https://keyvault_name.vault.azure.net/certificates/recoverCertificateName-canreadcancelanddeleteacertificatesoperation-/5eec2f6e83e648f8aa4008894b662d06","attributes":{"enabled":false,"nbf":1567782147,"exp":1599405147,"created":1567782747,"updated":1567782747,"recoveryLevel":"Recoverable+Purgeable"},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/recoverCertificateName-canreadcancelanddeleteacertificatesoperation-/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1567782747,"updated":1567782747}}}, [ 'Cache-Control',
=======
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/recoverCertificateName-canreadcancelanddeleteacertificatesoperation-","deletedDate":1567877637,"scheduledPurgeDate":1575653637,"id":"https://keyvault_name.vault.azure.net/certificates/recoverCertificateName-canreadcancelanddeleteacertificatesoperation-/c86a98d8f4cd408b90d43fac5e3f52bd","attributes":{"enabled":false,"nbf":1567877031,"exp":1599500031,"created":1567877631,"updated":1567877631,"recoveryLevel":"Recoverable+Purgeable"},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/recoverCertificateName-canreadcancelanddeleteacertificatesoperation-/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1567877631,"updated":1567877631}}}, [ 'Cache-Control',
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
  'f61c4508-b93d-4091-ba40-0cefb82699cb',
=======
  'c867d8f6-e392-4f41-81b4-14ff20112385',
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
  'Fri, 06 Sep 2019 15:12:33 GMT',
=======
  'Sat, 07 Sep 2019 17:33:57 GMT',
>>>>>>> [KeyVault-Certificates] Tweaks to the tests
  'Connection',
  'close',
  'Content-Length',
  '1217' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedcertificates/recoverCertificateName-canreadcancelanddeleteacertificatesoperation-')
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
  'bbbdb7ae-0dc6-4b16-bdc8-f2b1ba3b1a39',
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
  'Fri, 06 Sep 2019 15:12:33 GMT',
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
  'ed9a51d9-73ba-4366-b882-18cbbe632100',
  'x-ms-ests-server',
  '2.1.9338.12 - WUS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AjAqddJsNTNNiLQHwvLZGeQ_aSJHCAAAAFpuBNUOAAAA; expires=Sun, 06-Oct-2019 15:12:34 GMT; path=/; secure; HttpOnly',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; HttpOnly',
  'Date',
  'Fri, 06 Sep 2019 15:12:33 GMT',
  'Connection',
  'close',
  'Content-Length',
  '1231' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedcertificates/recoverCertificateName-canreadcancelanddeleteacertificatesoperation-')
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
  '320ac706-60f9-4d29-8f5e-349c46b1559b',
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
  'Fri, 06 Sep 2019 15:12:34 GMT',
  'Connection',
  'close' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedcertificates/recoverCertificateName-canreadcancelanddeleteacertificatesoperation-')
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
  '4cd09667-aec3-4a92-90f9-8edea5467b0a',
=======
  'a8c0ee1b-8780-4921-be4b-20521dd0750b',
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
  'Fri, 06 Sep 2019 15:12:44 GMT',
=======
  'Sat, 07 Sep 2019 17:33:57 GMT',
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
  'cbc21ae9-ea86-401c-86cb-bee1f2d91f00',
  'x-ms-ests-server',
  '2.1.9338.12 - WUS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AjAqddJsNTNNiLQHwvLZGeQ_aSJHCQAAAFpuBNUOAAAA; expires=Sun, 06-Oct-2019 15:12:44 GMT; path=/; secure; HttpOnly',
=======
  '5b231445-8d4d-420c-a307-9ca26e694400',
  'x-ms-ests-server',
  '2.1.9338.12 - NCUS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=Aua3bGMEgAJAm5OKzuHvUiU_aSJHCAAAAP7gBdUOAAAA; expires=Mon, 07-Oct-2019 17:33:58 GMT; path=/; secure; HttpOnly',
>>>>>>> [KeyVault-Certificates] Tweaks to the tests
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; HttpOnly',
  'Date',
<<<<<<< HEAD
  'Fri, 06 Sep 2019 15:12:44 GMT',
=======
  'Sat, 07 Sep 2019 17:33:57 GMT',
>>>>>>> [KeyVault-Certificates] Tweaks to the tests
  'Connection',
  'close',
  'Content-Length',
  '1231' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedcertificates/recoverCertificateName-canreadcancelanddeleteacertificatesoperation-')
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
  'd3464ff3-5cfe-4448-b7f5-dc77d197a641',
=======
  '9449ad67-3cd7-43fd-96ce-957425ce6bc7',
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
  'Fri, 06 Sep 2019 15:12:45 GMT',
=======
  'Sat, 07 Sep 2019 17:33:57 GMT',
>>>>>>> [KeyVault-Certificates] Tweaks to the tests
  'Connection',
  'close' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedcertificates/recoverCertificateName-canreadcancelanddeleteacertificatesoperation-')
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
  '57168429-8173-486c-93a3-2b4309de583b',
=======
  '15a35956-7b55-4004-bef3-2c1d034e92d8',
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
  'Fri, 06 Sep 2019 15:12:55 GMT',
=======
  'Sat, 07 Sep 2019 17:34:12 GMT',
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
  '6fe599fa-9aee-4246-8d7b-44c4f6861c00',
=======
  '7b6c70cf-3af1-47e7-9ad1-a5b627cd4800',
>>>>>>> [KeyVault-Certificates] Tweaks to the tests
  'x-ms-ests-server',
  '2.1.9338.12 - NCUS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
<<<<<<< HEAD
  'fpc=AjAqddJsNTNNiLQHwvLZGeQ_aSJHCgAAAFpuBNUOAAAA; expires=Sun, 06-Oct-2019 15:12:55 GMT; path=/; secure; HttpOnly',
=======
  'fpc=Aua3bGMEgAJAm5OKzuHvUiU_aSJHCQAAAP7gBdUOAAAA; expires=Mon, 07-Oct-2019 17:34:13 GMT; path=/; secure; HttpOnly',
>>>>>>> [KeyVault-Certificates] Tweaks to the tests
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; HttpOnly',
  'Date',
<<<<<<< HEAD
  'Fri, 06 Sep 2019 15:12:55 GMT',
=======
  'Sat, 07 Sep 2019 17:34:12 GMT',
>>>>>>> [KeyVault-Certificates] Tweaks to the tests
  'Connection',
  'close',
  'Content-Length',
  '1231' ]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedcertificates/recoverCertificateName-canreadcancelanddeleteacertificatesoperation-')
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
  'bb5ea619-a269-4463-83c4-6da3d46e2ccf',
=======
  '0a0ab2e0-22bf-4b3a-934b-8bf99a06e8fd',
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
  'Fri, 06 Sep 2019 15:12:55 GMT',
=======
  'Sat, 07 Sep 2019 17:34:13 GMT',
>>>>>>> [KeyVault-Certificates] Tweaks to the tests
  'Connection',
  'close' ]);


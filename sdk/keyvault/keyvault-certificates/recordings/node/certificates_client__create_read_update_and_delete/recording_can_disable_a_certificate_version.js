let nock = require('nock');

module.exports.hash = "6642b148547d702a60858c62054b7edb";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/certificates/recoverCertificateName-candisableacertificateversion-/create')
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
  '2c01b3f7-063d-4285-a94e-d654041e831b',
  'x-ms-keyvault-service-version',
  '1.1.5.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.233.72.51;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 27 May 2020 13:18:38 GMT'
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
  'ac7be9c3-c96c-4071-be94-01c377e80900',
  'x-ms-ests-server',
  '2.1.10656.5 - WUS2 ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=ArnHxfp2qxZHjMg8-lfYXCA_aSJHAQAAAK5fYNYOAAAA; expires=Fri, 26-Jun-2020 13:18:38 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; SameSite=None; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; SameSite=None; secure; HttpOnly',
  'Date',
  'Wed, 27 May 2020 13:18:38 GMT',
  'Content-Length',
  '1310'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/certificates/recoverCertificateName-candisableacertificateversion-/create', {"policy":{"key_props":{},"secret_props":{},"x509_props":{"subject":"cn=MyCert","sans":{}},"issuer":{"name":"Self"},"attributes":{}},"attributes":{}})
  .query(true)
  .reply(202, {"id":"https://keyvault_name.vault.azure.net/certificates/recoverCertificateName-candisableacertificateversion-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA3vgH5rX6LySq6O+imhpvdLAMs9kfVPQmbZHSpDWcS2rKVgk4wA/warOCqhaOhV0kEfIHgKIvkklCEK5x40VSK5E84HlQ7/yFuo/OGTkIxtfSe5p/KY3etmRukAchAo/flERry3yty8cFBmXLcAOJrgHM4V1AsJk2NL3V3EUWJtgr4Sl5fpKnJOBIkdK78KOKYqmsO4i8gWfNQYhzbiY4lRNl1QvcoEAOyw8ExmQDwzox7eFxU/YAir1Ol2eTwCZPW6Qgep1fStc/crZXSwnhwj64RyjWN4hjIqIxAhshA+f5x9W1PsSdH+sznPshTJLlxkyH/0zfd8K8xs7X1ViPpQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAGChujG1zgYfiyG8bI7I9e7b+kS7vi4LEI+iRoC44v/WkzueDeopz2VEMIg3eqxyc+PB3df9SzBbivfQnaA053B6P2aDOseRIifXCGPbhqPl+9Cw9MmjPP5MTRagpasl4a46H/74Jm00PM7KAEtwTgjO8vBO9KusReSdK9WzCX2O5gtkWBFZ0KivBczmKHN3dq1Go5J+jxH57bot9CDYZDz27YqrWVJjLg9tV1p9DddJBg6YH9FUlQ0BHTvjDpLRor5PsHvjQ/NQqn5w9DLw4CsB820GPXQAdAxODK+WuWhV5+Ggk/qMH/y6mrRTBVYWtH/cHK2qH9lbL21T28Cwixw=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"6b53d972e3ce4395b05c4c2728e77a4b"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://keyvault_name.vault.azure.net/certificates/recoverCertificateName-candisableacertificateversion-/pending?api-version=7.1-preview&request_id=6b53d972e3ce4395b05c4c2728e77a4b',
  'Retry-After',
  '10',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'a90496f2-6bfa-48fd-b564-6b11608130f9',
  'x-ms-keyvault-service-version',
  '1.1.5.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.233.72.51;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 27 May 2020 13:18:39 GMT',
  'Content-Length',
  '1346'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/recoverCertificateName-candisableacertificateversion-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/recoverCertificateName-candisableacertificateversion-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA3vgH5rX6LySq6O+imhpvdLAMs9kfVPQmbZHSpDWcS2rKVgk4wA/warOCqhaOhV0kEfIHgKIvkklCEK5x40VSK5E84HlQ7/yFuo/OGTkIxtfSe5p/KY3etmRukAchAo/flERry3yty8cFBmXLcAOJrgHM4V1AsJk2NL3V3EUWJtgr4Sl5fpKnJOBIkdK78KOKYqmsO4i8gWfNQYhzbiY4lRNl1QvcoEAOyw8ExmQDwzox7eFxU/YAir1Ol2eTwCZPW6Qgep1fStc/crZXSwnhwj64RyjWN4hjIqIxAhshA+f5x9W1PsSdH+sznPshTJLlxkyH/0zfd8K8xs7X1ViPpQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAGChujG1zgYfiyG8bI7I9e7b+kS7vi4LEI+iRoC44v/WkzueDeopz2VEMIg3eqxyc+PB3df9SzBbivfQnaA053B6P2aDOseRIifXCGPbhqPl+9Cw9MmjPP5MTRagpasl4a46H/74Jm00PM7KAEtwTgjO8vBO9KusReSdK9WzCX2O5gtkWBFZ0KivBczmKHN3dq1Go5J+jxH57bot9CDYZDz27YqrWVJjLg9tV1p9DddJBg6YH9FUlQ0BHTvjDpLRor5PsHvjQ/NQqn5w9DLw4CsB820GPXQAdAxODK+WuWhV5+Ggk/qMH/y6mrRTBVYWtH/cHK2qH9lbL21T28Cwixw=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"6b53d972e3ce4395b05c4c2728e77a4b"}, [
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
  '0e387b24-0127-4b81-92b7-42e587250825',
  'x-ms-keyvault-service-version',
  '1.1.5.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.233.72.51;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 27 May 2020 13:18:39 GMT',
  'Content-Length',
  '1346'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/recoverCertificateName-candisableacertificateversion-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/recoverCertificateName-candisableacertificateversion-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA3vgH5rX6LySq6O+imhpvdLAMs9kfVPQmbZHSpDWcS2rKVgk4wA/warOCqhaOhV0kEfIHgKIvkklCEK5x40VSK5E84HlQ7/yFuo/OGTkIxtfSe5p/KY3etmRukAchAo/flERry3yty8cFBmXLcAOJrgHM4V1AsJk2NL3V3EUWJtgr4Sl5fpKnJOBIkdK78KOKYqmsO4i8gWfNQYhzbiY4lRNl1QvcoEAOyw8ExmQDwzox7eFxU/YAir1Ol2eTwCZPW6Qgep1fStc/crZXSwnhwj64RyjWN4hjIqIxAhshA+f5x9W1PsSdH+sznPshTJLlxkyH/0zfd8K8xs7X1ViPpQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAGChujG1zgYfiyG8bI7I9e7b+kS7vi4LEI+iRoC44v/WkzueDeopz2VEMIg3eqxyc+PB3df9SzBbivfQnaA053B6P2aDOseRIifXCGPbhqPl+9Cw9MmjPP5MTRagpasl4a46H/74Jm00PM7KAEtwTgjO8vBO9KusReSdK9WzCX2O5gtkWBFZ0KivBczmKHN3dq1Go5J+jxH57bot9CDYZDz27YqrWVJjLg9tV1p9DddJBg6YH9FUlQ0BHTvjDpLRor5PsHvjQ/NQqn5w9DLw4CsB820GPXQAdAxODK+WuWhV5+Ggk/qMH/y6mrRTBVYWtH/cHK2qH9lbL21T28Cwixw=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"6b53d972e3ce4395b05c4c2728e77a4b"}, [
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
  'dc941c1a-319a-4ed9-87f1-14e1a41ce3af',
  'x-ms-keyvault-service-version',
  '1.1.5.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.233.72.51;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 27 May 2020 13:18:39 GMT',
  'Content-Length',
  '1346'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/recoverCertificateName-candisableacertificateversion-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/recoverCertificateName-candisableacertificateversion-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA3vgH5rX6LySq6O+imhpvdLAMs9kfVPQmbZHSpDWcS2rKVgk4wA/warOCqhaOhV0kEfIHgKIvkklCEK5x40VSK5E84HlQ7/yFuo/OGTkIxtfSe5p/KY3etmRukAchAo/flERry3yty8cFBmXLcAOJrgHM4V1AsJk2NL3V3EUWJtgr4Sl5fpKnJOBIkdK78KOKYqmsO4i8gWfNQYhzbiY4lRNl1QvcoEAOyw8ExmQDwzox7eFxU/YAir1Ol2eTwCZPW6Qgep1fStc/crZXSwnhwj64RyjWN4hjIqIxAhshA+f5x9W1PsSdH+sznPshTJLlxkyH/0zfd8K8xs7X1ViPpQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAGChujG1zgYfiyG8bI7I9e7b+kS7vi4LEI+iRoC44v/WkzueDeopz2VEMIg3eqxyc+PB3df9SzBbivfQnaA053B6P2aDOseRIifXCGPbhqPl+9Cw9MmjPP5MTRagpasl4a46H/74Jm00PM7KAEtwTgjO8vBO9KusReSdK9WzCX2O5gtkWBFZ0KivBczmKHN3dq1Go5J+jxH57bot9CDYZDz27YqrWVJjLg9tV1p9DddJBg6YH9FUlQ0BHTvjDpLRor5PsHvjQ/NQqn5w9DLw4CsB820GPXQAdAxODK+WuWhV5+Ggk/qMH/y6mrRTBVYWtH/cHK2qH9lbL21T28Cwixw=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"6b53d972e3ce4395b05c4c2728e77a4b"}, [
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
  '44b6acf2-8630-4a45-967b-713d2eaceb08',
  'x-ms-keyvault-service-version',
  '1.1.5.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.233.72.51;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 27 May 2020 13:18:41 GMT',
  'Content-Length',
  '1346'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/recoverCertificateName-candisableacertificateversion-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/recoverCertificateName-candisableacertificateversion-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA3vgH5rX6LySq6O+imhpvdLAMs9kfVPQmbZHSpDWcS2rKVgk4wA/warOCqhaOhV0kEfIHgKIvkklCEK5x40VSK5E84HlQ7/yFuo/OGTkIxtfSe5p/KY3etmRukAchAo/flERry3yty8cFBmXLcAOJrgHM4V1AsJk2NL3V3EUWJtgr4Sl5fpKnJOBIkdK78KOKYqmsO4i8gWfNQYhzbiY4lRNl1QvcoEAOyw8ExmQDwzox7eFxU/YAir1Ol2eTwCZPW6Qgep1fStc/crZXSwnhwj64RyjWN4hjIqIxAhshA+f5x9W1PsSdH+sznPshTJLlxkyH/0zfd8K8xs7X1ViPpQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAGChujG1zgYfiyG8bI7I9e7b+kS7vi4LEI+iRoC44v/WkzueDeopz2VEMIg3eqxyc+PB3df9SzBbivfQnaA053B6P2aDOseRIifXCGPbhqPl+9Cw9MmjPP5MTRagpasl4a46H/74Jm00PM7KAEtwTgjO8vBO9KusReSdK9WzCX2O5gtkWBFZ0KivBczmKHN3dq1Go5J+jxH57bot9CDYZDz27YqrWVJjLg9tV1p9DddJBg6YH9FUlQ0BHTvjDpLRor5PsHvjQ/NQqn5w9DLw4CsB820GPXQAdAxODK+WuWhV5+Ggk/qMH/y6mrRTBVYWtH/cHK2qH9lbL21T28Cwixw=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"6b53d972e3ce4395b05c4c2728e77a4b"}, [
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
  'd62b3e92-13fe-46f2-a808-693ec1a93660',
  'x-ms-keyvault-service-version',
  '1.1.5.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.233.72.51;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 27 May 2020 13:18:42 GMT',
  'Content-Length',
  '1346'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/recoverCertificateName-candisableacertificateversion-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/recoverCertificateName-candisableacertificateversion-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA3vgH5rX6LySq6O+imhpvdLAMs9kfVPQmbZHSpDWcS2rKVgk4wA/warOCqhaOhV0kEfIHgKIvkklCEK5x40VSK5E84HlQ7/yFuo/OGTkIxtfSe5p/KY3etmRukAchAo/flERry3yty8cFBmXLcAOJrgHM4V1AsJk2NL3V3EUWJtgr4Sl5fpKnJOBIkdK78KOKYqmsO4i8gWfNQYhzbiY4lRNl1QvcoEAOyw8ExmQDwzox7eFxU/YAir1Ol2eTwCZPW6Qgep1fStc/crZXSwnhwj64RyjWN4hjIqIxAhshA+f5x9W1PsSdH+sznPshTJLlxkyH/0zfd8K8xs7X1ViPpQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAGChujG1zgYfiyG8bI7I9e7b+kS7vi4LEI+iRoC44v/WkzueDeopz2VEMIg3eqxyc+PB3df9SzBbivfQnaA053B6P2aDOseRIifXCGPbhqPl+9Cw9MmjPP5MTRagpasl4a46H/74Jm00PM7KAEtwTgjO8vBO9KusReSdK9WzCX2O5gtkWBFZ0KivBczmKHN3dq1Go5J+jxH57bot9CDYZDz27YqrWVJjLg9tV1p9DddJBg6YH9FUlQ0BHTvjDpLRor5PsHvjQ/NQqn5w9DLw4CsB820GPXQAdAxODK+WuWhV5+Ggk/qMH/y6mrRTBVYWtH/cHK2qH9lbL21T28Cwixw=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"6b53d972e3ce4395b05c4c2728e77a4b"}, [
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
  '3b3b7ed5-ad78-4707-912a-7fcfca3930b9',
  'x-ms-keyvault-service-version',
  '1.1.5.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.233.72.51;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 27 May 2020 13:18:45 GMT',
  'Content-Length',
  '1346'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/recoverCertificateName-candisableacertificateversion-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/recoverCertificateName-candisableacertificateversion-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA3vgH5rX6LySq6O+imhpvdLAMs9kfVPQmbZHSpDWcS2rKVgk4wA/warOCqhaOhV0kEfIHgKIvkklCEK5x40VSK5E84HlQ7/yFuo/OGTkIxtfSe5p/KY3etmRukAchAo/flERry3yty8cFBmXLcAOJrgHM4V1AsJk2NL3V3EUWJtgr4Sl5fpKnJOBIkdK78KOKYqmsO4i8gWfNQYhzbiY4lRNl1QvcoEAOyw8ExmQDwzox7eFxU/YAir1Ol2eTwCZPW6Qgep1fStc/crZXSwnhwj64RyjWN4hjIqIxAhshA+f5x9W1PsSdH+sznPshTJLlxkyH/0zfd8K8xs7X1ViPpQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAGChujG1zgYfiyG8bI7I9e7b+kS7vi4LEI+iRoC44v/WkzueDeopz2VEMIg3eqxyc+PB3df9SzBbivfQnaA053B6P2aDOseRIifXCGPbhqPl+9Cw9MmjPP5MTRagpasl4a46H/74Jm00PM7KAEtwTgjO8vBO9KusReSdK9WzCX2O5gtkWBFZ0KivBczmKHN3dq1Go5J+jxH57bot9CDYZDz27YqrWVJjLg9tV1p9DddJBg6YH9FUlQ0BHTvjDpLRor5PsHvjQ/NQqn5w9DLw4CsB820GPXQAdAxODK+WuWhV5+Ggk/qMH/y6mrRTBVYWtH/cHK2qH9lbL21T28Cwixw=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"6b53d972e3ce4395b05c4c2728e77a4b"}, [
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
  '76f50107-cab3-418b-a42e-bf4e73772d58',
  'x-ms-keyvault-service-version',
  '1.1.5.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.233.72.51;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 27 May 2020 13:18:47 GMT',
  'Content-Length',
  '1346'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/recoverCertificateName-candisableacertificateversion-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/recoverCertificateName-candisableacertificateversion-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA3vgH5rX6LySq6O+imhpvdLAMs9kfVPQmbZHSpDWcS2rKVgk4wA/warOCqhaOhV0kEfIHgKIvkklCEK5x40VSK5E84HlQ7/yFuo/OGTkIxtfSe5p/KY3etmRukAchAo/flERry3yty8cFBmXLcAOJrgHM4V1AsJk2NL3V3EUWJtgr4Sl5fpKnJOBIkdK78KOKYqmsO4i8gWfNQYhzbiY4lRNl1QvcoEAOyw8ExmQDwzox7eFxU/YAir1Ol2eTwCZPW6Qgep1fStc/crZXSwnhwj64RyjWN4hjIqIxAhshA+f5x9W1PsSdH+sznPshTJLlxkyH/0zfd8K8xs7X1ViPpQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAGChujG1zgYfiyG8bI7I9e7b+kS7vi4LEI+iRoC44v/WkzueDeopz2VEMIg3eqxyc+PB3df9SzBbivfQnaA053B6P2aDOseRIifXCGPbhqPl+9Cw9MmjPP5MTRagpasl4a46H/74Jm00PM7KAEtwTgjO8vBO9KusReSdK9WzCX2O5gtkWBFZ0KivBczmKHN3dq1Go5J+jxH57bot9CDYZDz27YqrWVJjLg9tV1p9DddJBg6YH9FUlQ0BHTvjDpLRor5PsHvjQ/NQqn5w9DLw4CsB820GPXQAdAxODK+WuWhV5+Ggk/qMH/y6mrRTBVYWtH/cHK2qH9lbL21T28Cwixw=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"6b53d972e3ce4395b05c4c2728e77a4b"}, [
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
  'a533b10b-3f6e-421d-94b0-f485ae60712f',
  'x-ms-keyvault-service-version',
  '1.1.5.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.233.72.51;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 27 May 2020 13:18:49 GMT',
  'Content-Length',
  '1346'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/recoverCertificateName-candisableacertificateversion-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/recoverCertificateName-candisableacertificateversion-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA3vgH5rX6LySq6O+imhpvdLAMs9kfVPQmbZHSpDWcS2rKVgk4wA/warOCqhaOhV0kEfIHgKIvkklCEK5x40VSK5E84HlQ7/yFuo/OGTkIxtfSe5p/KY3etmRukAchAo/flERry3yty8cFBmXLcAOJrgHM4V1AsJk2NL3V3EUWJtgr4Sl5fpKnJOBIkdK78KOKYqmsO4i8gWfNQYhzbiY4lRNl1QvcoEAOyw8ExmQDwzox7eFxU/YAir1Ol2eTwCZPW6Qgep1fStc/crZXSwnhwj64RyjWN4hjIqIxAhshA+f5x9W1PsSdH+sznPshTJLlxkyH/0zfd8K8xs7X1ViPpQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAGChujG1zgYfiyG8bI7I9e7b+kS7vi4LEI+iRoC44v/WkzueDeopz2VEMIg3eqxyc+PB3df9SzBbivfQnaA053B6P2aDOseRIifXCGPbhqPl+9Cw9MmjPP5MTRagpasl4a46H/74Jm00PM7KAEtwTgjO8vBO9KusReSdK9WzCX2O5gtkWBFZ0KivBczmKHN3dq1Go5J+jxH57bot9CDYZDz27YqrWVJjLg9tV1p9DddJBg6YH9FUlQ0BHTvjDpLRor5PsHvjQ/NQqn5w9DLw4CsB820GPXQAdAxODK+WuWhV5+Ggk/qMH/y6mrRTBVYWtH/cHK2qH9lbL21T28Cwixw=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"6b53d972e3ce4395b05c4c2728e77a4b"}, [
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
  '257ac7e3-7603-4cd9-97a8-3ca7ef37149a',
  'x-ms-keyvault-service-version',
  '1.1.5.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.233.72.51;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 27 May 2020 13:18:51 GMT',
  'Content-Length',
  '1346'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/recoverCertificateName-candisableacertificateversion-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/recoverCertificateName-candisableacertificateversion-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA3vgH5rX6LySq6O+imhpvdLAMs9kfVPQmbZHSpDWcS2rKVgk4wA/warOCqhaOhV0kEfIHgKIvkklCEK5x40VSK5E84HlQ7/yFuo/OGTkIxtfSe5p/KY3etmRukAchAo/flERry3yty8cFBmXLcAOJrgHM4V1AsJk2NL3V3EUWJtgr4Sl5fpKnJOBIkdK78KOKYqmsO4i8gWfNQYhzbiY4lRNl1QvcoEAOyw8ExmQDwzox7eFxU/YAir1Ol2eTwCZPW6Qgep1fStc/crZXSwnhwj64RyjWN4hjIqIxAhshA+f5x9W1PsSdH+sznPshTJLlxkyH/0zfd8K8xs7X1ViPpQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAGChujG1zgYfiyG8bI7I9e7b+kS7vi4LEI+iRoC44v/WkzueDeopz2VEMIg3eqxyc+PB3df9SzBbivfQnaA053B6P2aDOseRIifXCGPbhqPl+9Cw9MmjPP5MTRagpasl4a46H/74Jm00PM7KAEtwTgjO8vBO9KusReSdK9WzCX2O5gtkWBFZ0KivBczmKHN3dq1Go5J+jxH57bot9CDYZDz27YqrWVJjLg9tV1p9DddJBg6YH9FUlQ0BHTvjDpLRor5PsHvjQ/NQqn5w9DLw4CsB820GPXQAdAxODK+WuWhV5+Ggk/qMH/y6mrRTBVYWtH/cHK2qH9lbL21T28Cwixw=","cancellation_requested":false,"status":"completed","target":"https://keyvault_name.vault.azure.net/certificates/recoverCertificateName-candisableacertificateversion-","request_id":"6b53d972e3ce4395b05c4c2728e77a4b"}, [
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
  '791ceda0-8888-4d62-9a31-089fc876c922',
  'x-ms-keyvault-service-version',
  '1.1.5.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.233.72.51;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 27 May 2020 13:18:53 GMT',
  'Content-Length',
  '1319'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/recoverCertificateName-candisableacertificateversion-/')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/recoverCertificateName-candisableacertificateversion-/a27358f95acc445bb78cc6eb3d3ce4a0","kid":"https://keyvault_name.vault.azure.net/keys/recoverCertificateName-candisableacertificateversion-/a27358f95acc445bb78cc6eb3d3ce4a0","sid":"https://keyvault_name.vault.azure.net/secrets/recoverCertificateName-candisableacertificateversion-/a27358f95acc445bb78cc6eb3d3ce4a0","x5t":"VTgf6LvLaVgtK9Rm5vdvaOE9J5c","cer":"MIIDKDCCAhCgAwIBAgIQR55D2LCIRhaeV7mhDd2DGDANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjAwNTI3MTMwODUyWhcNMjEwNTI3MTMxODUyWjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQDe+AfmtfovJKro76KaGm90sAyz2R9U9CZtkdKkNZxLaspWCTjAD/Bqs4KqFo6FXSQR8geAoi+SSUIQrnHjRVIrkTzgeVDv/IW6j84ZOQjG19J7mn8pjd62ZG6QByECj9+URGvLfK3LxwUGZctwA4muAczhXUCwmTY0vdXcRRYm2CvhKXl+kqck4EiR0rvwo4piqaw7iLyBZ81BiHNuJjiVE2XVC9ygQA7LDwTGZAPDOjHt4XFT9gCKvU6XZ5PAJk9bpCB6nV9K1z9ytldLCeHCPrhHKNY3iGMiojECGyED5/nH1bU+xJ0f6zOc+yFMkuXGTIf/TN93wrzGztfVWI+lAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBSKGdSvpdcm6pwBb4T03vuDJP466zAdBgNVHQ4EFgQUihnUr6XXJuqcAW+E9N77gyT+OuswDQYJKoZIhvcNAQELBQADggEBAK+4DMHb7vnyz5rtYJjHh5bwNPKYm/K4FG7QLS+W/c3W9fnkQdhuJCXJ6LsPbWbwZdir4QRdJTlGNnlUH8NGSrBxzlDfoHYd9XmpjfZB3nThq6Lc6KvbBNS0Da8l6C3kokUFffno/CoedRiDDNbSlD3eXMalZLQliY8S/Q1+7D4HgcKuJFKDVCku/45zGQPg9k+55uCTX9hOKwO5BS/99wq/sQ5B9vKIfrXlj84f724z9ipgmTUDVWqZ4MjT+G25vI2Gitz3t+KPwiY3dowx8wAEtHxQCvAzm0bZGucyrXYMnb4v+bC3TQpufamXL+OM1aFPGp6xjFgOEkx3Fl87w1A=","attributes":{"enabled":true,"nbf":1590584932,"exp":1622121532,"created":1590585532,"updated":1590585532,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/recoverCertificateName-candisableacertificateversion-/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1590585519,"updated":1590585519}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/recoverCertificateName-candisableacertificateversion-/pending"}}, [
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
  '6841c490-9666-42c4-8107-d74f74a67401',
  'x-ms-keyvault-service-version',
  '1.1.5.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.233.72.51;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 27 May 2020 13:18:53 GMT',
  'Content-Length',
  '2620'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .patch('/certificates/recoverCertificateName-candisableacertificateversion-/a27358f95acc445bb78cc6eb3d3ce4a0', {"attributes":{"enabled":false}})
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/recoverCertificateName-candisableacertificateversion-/a27358f95acc445bb78cc6eb3d3ce4a0","kid":"https://keyvault_name.vault.azure.net/keys/recoverCertificateName-candisableacertificateversion-/a27358f95acc445bb78cc6eb3d3ce4a0","sid":"https://keyvault_name.vault.azure.net/secrets/recoverCertificateName-candisableacertificateversion-/a27358f95acc445bb78cc6eb3d3ce4a0","x5t":"VTgf6LvLaVgtK9Rm5vdvaOE9J5c","cer":"MIIDKDCCAhCgAwIBAgIQR55D2LCIRhaeV7mhDd2DGDANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjAwNTI3MTMwODUyWhcNMjEwNTI3MTMxODUyWjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQDe+AfmtfovJKro76KaGm90sAyz2R9U9CZtkdKkNZxLaspWCTjAD/Bqs4KqFo6FXSQR8geAoi+SSUIQrnHjRVIrkTzgeVDv/IW6j84ZOQjG19J7mn8pjd62ZG6QByECj9+URGvLfK3LxwUGZctwA4muAczhXUCwmTY0vdXcRRYm2CvhKXl+kqck4EiR0rvwo4piqaw7iLyBZ81BiHNuJjiVE2XVC9ygQA7LDwTGZAPDOjHt4XFT9gCKvU6XZ5PAJk9bpCB6nV9K1z9ytldLCeHCPrhHKNY3iGMiojECGyED5/nH1bU+xJ0f6zOc+yFMkuXGTIf/TN93wrzGztfVWI+lAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBSKGdSvpdcm6pwBb4T03vuDJP466zAdBgNVHQ4EFgQUihnUr6XXJuqcAW+E9N77gyT+OuswDQYJKoZIhvcNAQELBQADggEBAK+4DMHb7vnyz5rtYJjHh5bwNPKYm/K4FG7QLS+W/c3W9fnkQdhuJCXJ6LsPbWbwZdir4QRdJTlGNnlUH8NGSrBxzlDfoHYd9XmpjfZB3nThq6Lc6KvbBNS0Da8l6C3kokUFffno/CoedRiDDNbSlD3eXMalZLQliY8S/Q1+7D4HgcKuJFKDVCku/45zGQPg9k+55uCTX9hOKwO5BS/99wq/sQ5B9vKIfrXlj84f724z9ipgmTUDVWqZ4MjT+G25vI2Gitz3t+KPwiY3dowx8wAEtHxQCvAzm0bZGucyrXYMnb4v+bC3TQpufamXL+OM1aFPGp6xjFgOEkx3Fl87w1A=","attributes":{"enabled":false,"nbf":1590584932,"exp":1622121532,"created":1590585532,"updated":1590585534,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/recoverCertificateName-candisableacertificateversion-/pending"}}, [
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
  'ac56b114-6b8b-4780-96db-b5d81808f626',
  'x-ms-keyvault-service-version',
  '1.1.5.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.233.72.51;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 27 May 2020 13:18:53 GMT',
  'Content-Length',
  '1942'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/recoverCertificateName-candisableacertificateversion-/a27358f95acc445bb78cc6eb3d3ce4a0')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/recoverCertificateName-candisableacertificateversion-/a27358f95acc445bb78cc6eb3d3ce4a0","kid":"https://keyvault_name.vault.azure.net/keys/recoverCertificateName-candisableacertificateversion-/a27358f95acc445bb78cc6eb3d3ce4a0","sid":"https://keyvault_name.vault.azure.net/secrets/recoverCertificateName-candisableacertificateversion-/a27358f95acc445bb78cc6eb3d3ce4a0","x5t":"VTgf6LvLaVgtK9Rm5vdvaOE9J5c","cer":"MIIDKDCCAhCgAwIBAgIQR55D2LCIRhaeV7mhDd2DGDANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjAwNTI3MTMwODUyWhcNMjEwNTI3MTMxODUyWjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQDe+AfmtfovJKro76KaGm90sAyz2R9U9CZtkdKkNZxLaspWCTjAD/Bqs4KqFo6FXSQR8geAoi+SSUIQrnHjRVIrkTzgeVDv/IW6j84ZOQjG19J7mn8pjd62ZG6QByECj9+URGvLfK3LxwUGZctwA4muAczhXUCwmTY0vdXcRRYm2CvhKXl+kqck4EiR0rvwo4piqaw7iLyBZ81BiHNuJjiVE2XVC9ygQA7LDwTGZAPDOjHt4XFT9gCKvU6XZ5PAJk9bpCB6nV9K1z9ytldLCeHCPrhHKNY3iGMiojECGyED5/nH1bU+xJ0f6zOc+yFMkuXGTIf/TN93wrzGztfVWI+lAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBSKGdSvpdcm6pwBb4T03vuDJP466zAdBgNVHQ4EFgQUihnUr6XXJuqcAW+E9N77gyT+OuswDQYJKoZIhvcNAQELBQADggEBAK+4DMHb7vnyz5rtYJjHh5bwNPKYm/K4FG7QLS+W/c3W9fnkQdhuJCXJ6LsPbWbwZdir4QRdJTlGNnlUH8NGSrBxzlDfoHYd9XmpjfZB3nThq6Lc6KvbBNS0Da8l6C3kokUFffno/CoedRiDDNbSlD3eXMalZLQliY8S/Q1+7D4HgcKuJFKDVCku/45zGQPg9k+55uCTX9hOKwO5BS/99wq/sQ5B9vKIfrXlj84f724z9ipgmTUDVWqZ4MjT+G25vI2Gitz3t+KPwiY3dowx8wAEtHxQCvAzm0bZGucyrXYMnb4v+bC3TQpufamXL+OM1aFPGp6xjFgOEkx3Fl87w1A=","attributes":{"enabled":false,"nbf":1590584932,"exp":1622121532,"created":1590585532,"updated":1590585534,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90}}, [
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
  'eaa5580c-5360-4747-a346-716455c48db7',
  'x-ms-keyvault-service-version',
  '1.1.5.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.233.72.51;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 27 May 2020 13:18:53 GMT',
  'Content-Length',
  '1788'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/certificates/recoverCertificateName-candisableacertificateversion-')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/recoverCertificateName-candisableacertificateversion-","deletedDate":1590585534,"scheduledPurgeDate":1598361534,"id":"https://keyvault_name.vault.azure.net/certificates/recoverCertificateName-candisableacertificateversion-/a27358f95acc445bb78cc6eb3d3ce4a0","kid":"https://keyvault_name.vault.azure.net/keys/recoverCertificateName-candisableacertificateversion-/a27358f95acc445bb78cc6eb3d3ce4a0","sid":"https://keyvault_name.vault.azure.net/secrets/recoverCertificateName-candisableacertificateversion-/a27358f95acc445bb78cc6eb3d3ce4a0","x5t":"VTgf6LvLaVgtK9Rm5vdvaOE9J5c","cer":"MIIDKDCCAhCgAwIBAgIQR55D2LCIRhaeV7mhDd2DGDANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjAwNTI3MTMwODUyWhcNMjEwNTI3MTMxODUyWjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQDe+AfmtfovJKro76KaGm90sAyz2R9U9CZtkdKkNZxLaspWCTjAD/Bqs4KqFo6FXSQR8geAoi+SSUIQrnHjRVIrkTzgeVDv/IW6j84ZOQjG19J7mn8pjd62ZG6QByECj9+URGvLfK3LxwUGZctwA4muAczhXUCwmTY0vdXcRRYm2CvhKXl+kqck4EiR0rvwo4piqaw7iLyBZ81BiHNuJjiVE2XVC9ygQA7LDwTGZAPDOjHt4XFT9gCKvU6XZ5PAJk9bpCB6nV9K1z9ytldLCeHCPrhHKNY3iGMiojECGyED5/nH1bU+xJ0f6zOc+yFMkuXGTIf/TN93wrzGztfVWI+lAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBSKGdSvpdcm6pwBb4T03vuDJP466zAdBgNVHQ4EFgQUihnUr6XXJuqcAW+E9N77gyT+OuswDQYJKoZIhvcNAQELBQADggEBAK+4DMHb7vnyz5rtYJjHh5bwNPKYm/K4FG7QLS+W/c3W9fnkQdhuJCXJ6LsPbWbwZdir4QRdJTlGNnlUH8NGSrBxzlDfoHYd9XmpjfZB3nThq6Lc6KvbBNS0Da8l6C3kokUFffno/CoedRiDDNbSlD3eXMalZLQliY8S/Q1+7D4HgcKuJFKDVCku/45zGQPg9k+55uCTX9hOKwO5BS/99wq/sQ5B9vKIfrXlj84f724z9ipgmTUDVWqZ4MjT+G25vI2Gitz3t+KPwiY3dowx8wAEtHxQCvAzm0bZGucyrXYMnb4v+bC3TQpufamXL+OM1aFPGp6xjFgOEkx3Fl87w1A=","attributes":{"enabled":false,"nbf":1590584932,"exp":1622121532,"created":1590585532,"updated":1590585534,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/recoverCertificateName-candisableacertificateversion-/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1590585519,"updated":1590585519}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/recoverCertificateName-candisableacertificateversion-/pending"}}, [
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
  'e521a09a-8915-46e7-b40e-599a2e351ded',
  'x-ms-keyvault-service-version',
  '1.1.5.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.233.72.51;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 27 May 2020 13:18:53 GMT',
  'Content-Length',
  '2827'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/recoverCertificateName-candisableacertificateversion-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: recoverCertificateName-candisableacertificateversion-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '154',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'a7796335-9aa6-417b-bac6-515461608212',
  'x-ms-keyvault-service-version',
  '1.1.5.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.233.72.51;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 27 May 2020 13:18:53 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/recoverCertificateName-candisableacertificateversion-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: recoverCertificateName-candisableacertificateversion-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '154',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '54b886a6-2b29-4966-baf2-698fca9853b7',
  'x-ms-keyvault-service-version',
  '1.1.5.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.233.72.51;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 27 May 2020 13:18:53 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/recoverCertificateName-candisableacertificateversion-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: recoverCertificateName-candisableacertificateversion-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '154',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'a5b17ae7-5519-48eb-9c8a-81165681e2d1',
  'x-ms-keyvault-service-version',
  '1.1.5.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.233.72.51;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 27 May 2020 13:18:55 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/recoverCertificateName-candisableacertificateversion-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: recoverCertificateName-candisableacertificateversion-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '154',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'ddbe3c6f-aa31-431a-ad3a-4ed09e3fd7ae',
  'x-ms-keyvault-service-version',
  '1.1.5.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.233.72.51;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 27 May 2020 13:18:58 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/recoverCertificateName-candisableacertificateversion-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: recoverCertificateName-candisableacertificateversion-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '154',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'c18a2dc7-adf1-4c8d-bff2-bd784db5e479',
  'x-ms-keyvault-service-version',
  '1.1.5.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.233.72.51;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 27 May 2020 13:19:00 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/recoverCertificateName-candisableacertificateversion-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: recoverCertificateName-candisableacertificateversion-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '154',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '8375ca83-a8c2-4d63-b0ac-e8014782197c',
  'x-ms-keyvault-service-version',
  '1.1.5.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.233.72.51;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 27 May 2020 13:19:02 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/recoverCertificateName-candisableacertificateversion-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: recoverCertificateName-candisableacertificateversion-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '154',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'bb20a977-408b-4c95-a63f-c32ebf511b60',
  'x-ms-keyvault-service-version',
  '1.1.5.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.233.72.51;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 27 May 2020 13:19:04 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/recoverCertificateName-candisableacertificateversion-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: recoverCertificateName-candisableacertificateversion-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '154',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '3bce1d32-d371-40d2-a602-e5ce8b109a84',
  'x-ms-keyvault-service-version',
  '1.1.5.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.233.72.51;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 27 May 2020 13:19:07 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/recoverCertificateName-candisableacertificateversion-')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/recoverCertificateName-candisableacertificateversion-","deletedDate":1590585534,"scheduledPurgeDate":1598361534,"id":"https://keyvault_name.vault.azure.net/certificates/recoverCertificateName-candisableacertificateversion-/a27358f95acc445bb78cc6eb3d3ce4a0","kid":"https://keyvault_name.vault.azure.net/keys/recoverCertificateName-candisableacertificateversion-/a27358f95acc445bb78cc6eb3d3ce4a0","sid":"https://keyvault_name.vault.azure.net/secrets/recoverCertificateName-candisableacertificateversion-/a27358f95acc445bb78cc6eb3d3ce4a0","x5t":"VTgf6LvLaVgtK9Rm5vdvaOE9J5c","cer":"MIIDKDCCAhCgAwIBAgIQR55D2LCIRhaeV7mhDd2DGDANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjAwNTI3MTMwODUyWhcNMjEwNTI3MTMxODUyWjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQDe+AfmtfovJKro76KaGm90sAyz2R9U9CZtkdKkNZxLaspWCTjAD/Bqs4KqFo6FXSQR8geAoi+SSUIQrnHjRVIrkTzgeVDv/IW6j84ZOQjG19J7mn8pjd62ZG6QByECj9+URGvLfK3LxwUGZctwA4muAczhXUCwmTY0vdXcRRYm2CvhKXl+kqck4EiR0rvwo4piqaw7iLyBZ81BiHNuJjiVE2XVC9ygQA7LDwTGZAPDOjHt4XFT9gCKvU6XZ5PAJk9bpCB6nV9K1z9ytldLCeHCPrhHKNY3iGMiojECGyED5/nH1bU+xJ0f6zOc+yFMkuXGTIf/TN93wrzGztfVWI+lAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBSKGdSvpdcm6pwBb4T03vuDJP466zAdBgNVHQ4EFgQUihnUr6XXJuqcAW+E9N77gyT+OuswDQYJKoZIhvcNAQELBQADggEBAK+4DMHb7vnyz5rtYJjHh5bwNPKYm/K4FG7QLS+W/c3W9fnkQdhuJCXJ6LsPbWbwZdir4QRdJTlGNnlUH8NGSrBxzlDfoHYd9XmpjfZB3nThq6Lc6KvbBNS0Da8l6C3kokUFffno/CoedRiDDNbSlD3eXMalZLQliY8S/Q1+7D4HgcKuJFKDVCku/45zGQPg9k+55uCTX9hOKwO5BS/99wq/sQ5B9vKIfrXlj84f724z9ipgmTUDVWqZ4MjT+G25vI2Gitz3t+KPwiY3dowx8wAEtHxQCvAzm0bZGucyrXYMnb4v+bC3TQpufamXL+OM1aFPGp6xjFgOEkx3Fl87w1A=","attributes":{"enabled":false,"nbf":1590584932,"exp":1622121532,"created":1590585532,"updated":1590585534,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/recoverCertificateName-candisableacertificateversion-/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1590585519,"updated":1590585519}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/recoverCertificateName-candisableacertificateversion-/pending"}}, [
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
  'd1b7543e-69f5-4a08-89ce-075ebc70ffce',
  'x-ms-keyvault-service-version',
  '1.1.5.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.233.72.51;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 27 May 2020 13:19:09 GMT',
  'Content-Length',
  '2827'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedcertificates/recoverCertificateName-candisableacertificateversion-')
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
  'c21f9274-408a-4712-b627-614744942887',
  'x-ms-keyvault-service-version',
  '1.1.5.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.233.72.51;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 27 May 2020 13:19:09 GMT'
]);

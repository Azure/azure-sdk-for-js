let nock = require('nock');

module.exports.hash = "e4e0de702eed6cca52103246ef353349";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--1/create')
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
  '1ae777e1-8ec6-463c-aa70-78e4c406d480',
  'x-ms-keyvault-service-version',
  '1.2.139.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=76.121.141.80;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 15 Jan 2021 05:54:59 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0/create')
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
  '62012c36-bdee-4229-8764-6ed291134e58',
  'x-ms-keyvault-service-version',
  '1.2.139.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=76.121.141.80;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 15 Jan 2021 05:54:59 GMT'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fvault.azure.net%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":86399,"ext_expires_in":86399,"access_token":"access_token"}, [
  'Cache-Control',
  'no-store, no-cache',
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
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'x-ms-request-id',
  'e6c16c42-1cb2-4228-8925-8ecfa0cc1700',
  'x-ms-ests-server',
  '2.1.11397.13 - NCUS ProdSlices',
  'Set-Cookie',
  'fpc=AhrsiC08ORxGsSTOkFzgpwQvZXiDAQAAADMlk9cOAAAA; expires=Sun, 14-Feb-2021 05:54:59 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 15 Jan 2021 05:54:59 GMT',
  'Content-Length',
  '1315'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fvault.azure.net%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":86399,"ext_expires_in":86399,"access_token":"access_token"}, [
  'Cache-Control',
  'no-store, no-cache',
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
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'x-ms-request-id',
  '62e0ad9b-111f-44e6-804d-66ee5dbb1100',
  'x-ms-ests-server',
  '2.1.11397.13 - EUS ProdSlices',
  'Set-Cookie',
  'fpc=ArzjfLH2e9ZFonr5X3aWAl4vZXiDAQAAADMlk9cOAAAA; expires=Sun, 14-Feb-2021 05:54:59 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 15 Jan 2021 05:54:59 GMT',
  'Content-Length',
  '1315'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0/create', {"policy":{"key_props":{},"secret_props":{},"x509_props":{"subject":"cn=MyCert","sans":{}},"issuer":{"name":"Self"},"attributes":{}},"attributes":{}})
  .query(true)
  .reply(202, {"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAvTcwwqePW4koR2ATaX5S/XrXpDxe/PA3pKYRbKcsBYEvPi0x67KbSaVNk+S93OyfOyJ393aa2jdh2Tw8yDyj6XGe4ZTqPen0ujTCED1aI3CFkt6S2/ppvEfHwDBTAThD/g3RTxinKTRDcF3BeMJ0TTNDaxr2qEYUgNcBh2WSr0Z6nRkEQIct3VAwX2p1X2qSj4Otzh5DHH1OeRp5WS9HUkYGRDXIyWeiSXJ1YYlNvOqQctlN3hkjlDkt7mD781G6W8Vy2E51+BDWq4Wa9MvsECh4vaDp2NeUPsENz/jIMyV7oj4dbgwUAN/oP5yeD05S2FdhinPgsuqAsMCQwr8TyQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAEkopLYgjv1p6aoZUV3AnQn+Mv7L7VDZTVQk8NxQRUcLwN/TftMeWNxx0Fp60+3GAe9JOkberrRqAE8aycgSjKkqGr2QeT3NV+q21WfZUNaC4z9B7HcpAPawvqiHh4r4Qf+nECeAlW44PdlP/E3Z/fBfO3/2oBmgub5MMo7aObVnIIdPpLL0Gfvy7DY42mPoGUENBQ+sFpFR9HpBrWchKgIbDNjXsChRW70S44rrl2NA02ciWV+7WHbn3p+7ZDbfa6beOmvDyjtWcjJ7TIQn6y7Pxpglxw21ZO7n0RdGM0PyHTkQf9EzwNZfK5xtJu4fFlt83PV4KHpL6hxuhc48TWc=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"295769ec4f9549f4a001d6cc45a2cebd"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0/pending?api-version=7.1&request_id=295769ec4f9549f4a001d6cc45a2cebd',
  'Retry-After',
  '10',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'b975cff9-7125-4313-9282-6555fb191209',
  'x-ms-keyvault-service-version',
  '1.2.139.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=76.121.141.80;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 15 Jan 2021 05:55:01 GMT',
  'Content-Length',
  '1370'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAvTcwwqePW4koR2ATaX5S/XrXpDxe/PA3pKYRbKcsBYEvPi0x67KbSaVNk+S93OyfOyJ393aa2jdh2Tw8yDyj6XGe4ZTqPen0ujTCED1aI3CFkt6S2/ppvEfHwDBTAThD/g3RTxinKTRDcF3BeMJ0TTNDaxr2qEYUgNcBh2WSr0Z6nRkEQIct3VAwX2p1X2qSj4Otzh5DHH1OeRp5WS9HUkYGRDXIyWeiSXJ1YYlNvOqQctlN3hkjlDkt7mD781G6W8Vy2E51+BDWq4Wa9MvsECh4vaDp2NeUPsENz/jIMyV7oj4dbgwUAN/oP5yeD05S2FdhinPgsuqAsMCQwr8TyQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAEkopLYgjv1p6aoZUV3AnQn+Mv7L7VDZTVQk8NxQRUcLwN/TftMeWNxx0Fp60+3GAe9JOkberrRqAE8aycgSjKkqGr2QeT3NV+q21WfZUNaC4z9B7HcpAPawvqiHh4r4Qf+nECeAlW44PdlP/E3Z/fBfO3/2oBmgub5MMo7aObVnIIdPpLL0Gfvy7DY42mPoGUENBQ+sFpFR9HpBrWchKgIbDNjXsChRW70S44rrl2NA02ciWV+7WHbn3p+7ZDbfa6beOmvDyjtWcjJ7TIQn6y7Pxpglxw21ZO7n0RdGM0PyHTkQf9EzwNZfK5xtJu4fFlt83PV4KHpL6hxuhc48TWc=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"295769ec4f9549f4a001d6cc45a2cebd"}, [
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
  'ed77b328-b5c7-4ccd-be17-68c32db54450',
  'x-ms-keyvault-service-version',
  '1.2.139.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=76.121.141.80;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 15 Jan 2021 05:55:01 GMT',
  'Content-Length',
  '1370'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAvTcwwqePW4koR2ATaX5S/XrXpDxe/PA3pKYRbKcsBYEvPi0x67KbSaVNk+S93OyfOyJ393aa2jdh2Tw8yDyj6XGe4ZTqPen0ujTCED1aI3CFkt6S2/ppvEfHwDBTAThD/g3RTxinKTRDcF3BeMJ0TTNDaxr2qEYUgNcBh2WSr0Z6nRkEQIct3VAwX2p1X2qSj4Otzh5DHH1OeRp5WS9HUkYGRDXIyWeiSXJ1YYlNvOqQctlN3hkjlDkt7mD781G6W8Vy2E51+BDWq4Wa9MvsECh4vaDp2NeUPsENz/jIMyV7oj4dbgwUAN/oP5yeD05S2FdhinPgsuqAsMCQwr8TyQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAEkopLYgjv1p6aoZUV3AnQn+Mv7L7VDZTVQk8NxQRUcLwN/TftMeWNxx0Fp60+3GAe9JOkberrRqAE8aycgSjKkqGr2QeT3NV+q21WfZUNaC4z9B7HcpAPawvqiHh4r4Qf+nECeAlW44PdlP/E3Z/fBfO3/2oBmgub5MMo7aObVnIIdPpLL0Gfvy7DY42mPoGUENBQ+sFpFR9HpBrWchKgIbDNjXsChRW70S44rrl2NA02ciWV+7WHbn3p+7ZDbfa6beOmvDyjtWcjJ7TIQn6y7Pxpglxw21ZO7n0RdGM0PyHTkQf9EzwNZfK5xtJu4fFlt83PV4KHpL6hxuhc48TWc=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"295769ec4f9549f4a001d6cc45a2cebd"}, [
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
  '18687631-c485-4446-b5cf-ff9a2ecd34be',
  'x-ms-keyvault-service-version',
  '1.2.139.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=76.121.141.80;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 15 Jan 2021 05:55:01 GMT',
  'Content-Length',
  '1370'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--1/create', {"policy":{"key_props":{},"secret_props":{},"x509_props":{"subject":"cn=MyCert","sans":{}},"issuer":{"name":"Self"},"attributes":{}},"attributes":{}})
  .query(true)
  .reply(202, {"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--1/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA19zNqMOTG+Hc94J+pyWEt5y+yoTKmM7KMy/S80LoeMHzBSnBXhTjiP9jgY/DugpmwvuqGkAAvNeP69wmu52fWqhpzWLk6Woi6vDK71xImjuMSvW7hL8cOGtXthiaTsqH6l1R6+9PzbWUoaEtIGJy5+NL30VD0SuDyB/MCYIDIGeNVcHUzWyQGptIV2w/C6JyWG3REdCyFE+u9SLRl8smHGSficfg5aZch5ISokmvfDVkT0I1TEbXCf+pWKMsxOrrpgghuuztf9vMdjZsnUUVragVxvgBTFLiN7tBJSdSj/iCtoaXSuZIsJiude4gjKzMLNa5TPBSTqS3+X2MarJuSQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAHNEbbx1x5nG3LPYsXxumjeYY3A9oAINhj+fXznePfmglCTksINYGibb1ZVCuhY/heogPzMaIbb83QqmPQaKbJroRpWY2GtLywBHqBshRYrhlDl2TFNkEDrkT6V/C42pIaz2rCKG44yMBpdz4q4Fw4MirF4CYh2d2v0Zof0SzYKjZESiRQuGsttPjFxa5she4IbVEB0WdoSjdrR0V26OzM/lhvrTR/ky2nodXHfx/B4s2fdouSXchJn45mADRxigzfuWvvhJb2tyJ0rwQMzIWE4GipUtFTMvmKDsDyflEBnoXyFLbu8M+ENrxIqTuxvJU3HgGdSIPzSWW3rgUSwj/Ig=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"cfc3a2789a394bdfb59123c20036eba0"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--1/pending?api-version=7.1&request_id=cfc3a2789a394bdfb59123c20036eba0',
  'Retry-After',
  '10',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '9ecd9baf-7fb5-4582-b9eb-2be89d5d7d4d',
  'x-ms-keyvault-service-version',
  '1.2.139.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=76.121.141.80;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 15 Jan 2021 05:55:02 GMT',
  'Content-Length',
  '1370'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--1/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--1/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA19zNqMOTG+Hc94J+pyWEt5y+yoTKmM7KMy/S80LoeMHzBSnBXhTjiP9jgY/DugpmwvuqGkAAvNeP69wmu52fWqhpzWLk6Woi6vDK71xImjuMSvW7hL8cOGtXthiaTsqH6l1R6+9PzbWUoaEtIGJy5+NL30VD0SuDyB/MCYIDIGeNVcHUzWyQGptIV2w/C6JyWG3REdCyFE+u9SLRl8smHGSficfg5aZch5ISokmvfDVkT0I1TEbXCf+pWKMsxOrrpgghuuztf9vMdjZsnUUVragVxvgBTFLiN7tBJSdSj/iCtoaXSuZIsJiude4gjKzMLNa5TPBSTqS3+X2MarJuSQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAHNEbbx1x5nG3LPYsXxumjeYY3A9oAINhj+fXznePfmglCTksINYGibb1ZVCuhY/heogPzMaIbb83QqmPQaKbJroRpWY2GtLywBHqBshRYrhlDl2TFNkEDrkT6V/C42pIaz2rCKG44yMBpdz4q4Fw4MirF4CYh2d2v0Zof0SzYKjZESiRQuGsttPjFxa5she4IbVEB0WdoSjdrR0V26OzM/lhvrTR/ky2nodXHfx/B4s2fdouSXchJn45mADRxigzfuWvvhJb2tyJ0rwQMzIWE4GipUtFTMvmKDsDyflEBnoXyFLbu8M+ENrxIqTuxvJU3HgGdSIPzSWW3rgUSwj/Ig=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"cfc3a2789a394bdfb59123c20036eba0"}, [
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
  '9b5b20b3-3ca4-4ffe-9d98-379795067d63',
  'x-ms-keyvault-service-version',
  '1.2.139.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=76.121.141.80;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 15 Jan 2021 05:55:03 GMT',
  'Content-Length',
  '1370'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAvTcwwqePW4koR2ATaX5S/XrXpDxe/PA3pKYRbKcsBYEvPi0x67KbSaVNk+S93OyfOyJ393aa2jdh2Tw8yDyj6XGe4ZTqPen0ujTCED1aI3CFkt6S2/ppvEfHwDBTAThD/g3RTxinKTRDcF3BeMJ0TTNDaxr2qEYUgNcBh2WSr0Z6nRkEQIct3VAwX2p1X2qSj4Otzh5DHH1OeRp5WS9HUkYGRDXIyWeiSXJ1YYlNvOqQctlN3hkjlDkt7mD781G6W8Vy2E51+BDWq4Wa9MvsECh4vaDp2NeUPsENz/jIMyV7oj4dbgwUAN/oP5yeD05S2FdhinPgsuqAsMCQwr8TyQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAEkopLYgjv1p6aoZUV3AnQn+Mv7L7VDZTVQk8NxQRUcLwN/TftMeWNxx0Fp60+3GAe9JOkberrRqAE8aycgSjKkqGr2QeT3NV+q21WfZUNaC4z9B7HcpAPawvqiHh4r4Qf+nECeAlW44PdlP/E3Z/fBfO3/2oBmgub5MMo7aObVnIIdPpLL0Gfvy7DY42mPoGUENBQ+sFpFR9HpBrWchKgIbDNjXsChRW70S44rrl2NA02ciWV+7WHbn3p+7ZDbfa6beOmvDyjtWcjJ7TIQn6y7Pxpglxw21ZO7n0RdGM0PyHTkQf9EzwNZfK5xtJu4fFlt83PV4KHpL6hxuhc48TWc=","cancellation_requested":false,"status":"completed","target":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0","request_id":"295769ec4f9549f4a001d6cc45a2cebd"}, [
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
  'f34b12b5-458b-4f88-9558-f547992eee6c',
  'x-ms-keyvault-service-version',
  '1.2.139.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=76.121.141.80;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 15 Jan 2021 05:55:04 GMT',
  'Content-Length',
  '1367'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0/')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0/d81ffe42c62243118b42676806842a81","kid":"https://keyvault_name.vault.azure.net/keys/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0/d81ffe42c62243118b42676806842a81","sid":"https://keyvault_name.vault.azure.net/secrets/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0/d81ffe42c62243118b42676806842a81","x5t":"diHkLEmWEJxJu9jPJklfcvoXkLY","cer":"MIIDKDCCAhCgAwIBAgIQCkZNybZRTAKylna0bPZlkTANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjEwMTE1MDU0NTAzWhcNMjIwMTE1MDU1NTAzWjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQC9NzDCp49biShHYBNpflL9etekPF788DekphFspywFgS8+LTHrsptJpU2T5L3c7J87Inf3dpraN2HZPDzIPKPpcZ7hlOo96fS6NMIQPVojcIWS3pLb+mm8R8fAMFMBOEP+DdFPGKcpNENwXcF4wnRNM0NrGvaoRhSA1wGHZZKvRnqdGQRAhy3dUDBfanVfapKPg63OHkMcfU55GnlZL0dSRgZENcjJZ6JJcnVhiU286pBy2U3eGSOUOS3uYPvzUbpbxXLYTnX4ENarhZr0y+wQKHi9oOnY15Q+wQ3P+MgzJXuiPh1uDBQA3+g/nJ4PTlLYV2GKc+Cy6oCwwJDCvxPJAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBSBBuyWLIAhqz/tqdeSBFlqjwhQljAdBgNVHQ4EFgQUgQbsliyAIas/7anXkgRZao8IUJYwDQYJKoZIhvcNAQELBQADggEBALObQrFoLSSQXxnD9WntLcPQx/DpiQ+ZK/MYXB8wSHl2D3mD6sXYgohWyat5Eg+D2pvrbzIQ9qiv+txBK7APy7/mJHvOQjLbgtPI7zSydJMquj44MtrkPQdxBpOHhZUbosFNl6u9E0hHvU4ccH1FvAX+sKaQBsGE3DXvEzgMVSVOQvEf73gJdzhxtKut2pTtjKzKjpQrbdlImvTvAi4fHscrGjBWyzs9KWnWslVVMJ3ya2oLaEJnQq5x++WYg/a74uU+KRk0qKOT2PTkpU+q35VRnf1N3LmlihlxRd6OSLpVlnXKuSH7Eda+JzFzLXN/72pMKCjEP/djRIQYk50sgBs=","attributes":{"enabled":true,"nbf":1610689503,"exp":1642226103,"created":1610690103,"updated":1610690103,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1610690101,"updated":1610690101}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0/pending"}}, [
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
  'a58a4bdd-f30a-4807-bae3-96896806fb29',
  'x-ms-keyvault-service-version',
  '1.2.139.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=76.121.141.80;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 15 Jan 2021 05:55:05 GMT',
  'Content-Length',
  '2740'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0","deletedDate":1610690106,"scheduledPurgeDate":1618466106,"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0/d81ffe42c62243118b42676806842a81","kid":"https://keyvault_name.vault.azure.net/keys/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0/d81ffe42c62243118b42676806842a81","sid":"https://keyvault_name.vault.azure.net/secrets/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0/d81ffe42c62243118b42676806842a81","x5t":"diHkLEmWEJxJu9jPJklfcvoXkLY","cer":"MIIDKDCCAhCgAwIBAgIQCkZNybZRTAKylna0bPZlkTANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjEwMTE1MDU0NTAzWhcNMjIwMTE1MDU1NTAzWjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQC9NzDCp49biShHYBNpflL9etekPF788DekphFspywFgS8+LTHrsptJpU2T5L3c7J87Inf3dpraN2HZPDzIPKPpcZ7hlOo96fS6NMIQPVojcIWS3pLb+mm8R8fAMFMBOEP+DdFPGKcpNENwXcF4wnRNM0NrGvaoRhSA1wGHZZKvRnqdGQRAhy3dUDBfanVfapKPg63OHkMcfU55GnlZL0dSRgZENcjJZ6JJcnVhiU286pBy2U3eGSOUOS3uYPvzUbpbxXLYTnX4ENarhZr0y+wQKHi9oOnY15Q+wQ3P+MgzJXuiPh1uDBQA3+g/nJ4PTlLYV2GKc+Cy6oCwwJDCvxPJAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBSBBuyWLIAhqz/tqdeSBFlqjwhQljAdBgNVHQ4EFgQUgQbsliyAIas/7anXkgRZao8IUJYwDQYJKoZIhvcNAQELBQADggEBALObQrFoLSSQXxnD9WntLcPQx/DpiQ+ZK/MYXB8wSHl2D3mD6sXYgohWyat5Eg+D2pvrbzIQ9qiv+txBK7APy7/mJHvOQjLbgtPI7zSydJMquj44MtrkPQdxBpOHhZUbosFNl6u9E0hHvU4ccH1FvAX+sKaQBsGE3DXvEzgMVSVOQvEf73gJdzhxtKut2pTtjKzKjpQrbdlImvTvAi4fHscrGjBWyzs9KWnWslVVMJ3ya2oLaEJnQq5x++WYg/a74uU+KRk0qKOT2PTkpU+q35VRnf1N3LmlihlxRd6OSLpVlnXKuSH7Eda+JzFzLXN/72pMKCjEP/djRIQYk50sgBs=","attributes":{"enabled":true,"nbf":1610689503,"exp":1642226103,"created":1610690103,"updated":1610690103,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1610690101,"updated":1610690101}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0/pending"}}, [
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
  'b553d942-42e4-458d-8f9f-1ea7148ba03b',
  'x-ms-keyvault-service-version',
  '1.2.139.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=76.121.141.80;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 15 Jan 2021 05:55:07 GMT',
  'Content-Length',
  '2970'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '176',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '654b2386-8ef2-4896-ac45-9b1c517428f7',
  'x-ms-keyvault-service-version',
  '1.2.139.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=76.121.141.80;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 15 Jan 2021 05:55:07 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '176',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '164a5a12-821e-47a2-af7d-ba61ea8b5cf4',
  'x-ms-keyvault-service-version',
  '1.2.139.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=76.121.141.80;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 15 Jan 2021 05:55:08 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0","deletedDate":1610690106,"scheduledPurgeDate":1618466106,"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0/d81ffe42c62243118b42676806842a81","kid":"https://keyvault_name.vault.azure.net/keys/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0/d81ffe42c62243118b42676806842a81","sid":"https://keyvault_name.vault.azure.net/secrets/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0/d81ffe42c62243118b42676806842a81","x5t":"diHkLEmWEJxJu9jPJklfcvoXkLY","cer":"MIIDKDCCAhCgAwIBAgIQCkZNybZRTAKylna0bPZlkTANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjEwMTE1MDU0NTAzWhcNMjIwMTE1MDU1NTAzWjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQC9NzDCp49biShHYBNpflL9etekPF788DekphFspywFgS8+LTHrsptJpU2T5L3c7J87Inf3dpraN2HZPDzIPKPpcZ7hlOo96fS6NMIQPVojcIWS3pLb+mm8R8fAMFMBOEP+DdFPGKcpNENwXcF4wnRNM0NrGvaoRhSA1wGHZZKvRnqdGQRAhy3dUDBfanVfapKPg63OHkMcfU55GnlZL0dSRgZENcjJZ6JJcnVhiU286pBy2U3eGSOUOS3uYPvzUbpbxXLYTnX4ENarhZr0y+wQKHi9oOnY15Q+wQ3P+MgzJXuiPh1uDBQA3+g/nJ4PTlLYV2GKc+Cy6oCwwJDCvxPJAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBSBBuyWLIAhqz/tqdeSBFlqjwhQljAdBgNVHQ4EFgQUgQbsliyAIas/7anXkgRZao8IUJYwDQYJKoZIhvcNAQELBQADggEBALObQrFoLSSQXxnD9WntLcPQx/DpiQ+ZK/MYXB8wSHl2D3mD6sXYgohWyat5Eg+D2pvrbzIQ9qiv+txBK7APy7/mJHvOQjLbgtPI7zSydJMquj44MtrkPQdxBpOHhZUbosFNl6u9E0hHvU4ccH1FvAX+sKaQBsGE3DXvEzgMVSVOQvEf73gJdzhxtKut2pTtjKzKjpQrbdlImvTvAi4fHscrGjBWyzs9KWnWslVVMJ3ya2oLaEJnQq5x++WYg/a74uU+KRk0qKOT2PTkpU+q35VRnf1N3LmlihlxRd6OSLpVlnXKuSH7Eda+JzFzLXN/72pMKCjEP/djRIQYk50sgBs=","attributes":{"enabled":true,"nbf":1610689503,"exp":1642226103,"created":1610690103,"updated":1610690103,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1610690101,"updated":1610690101}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0/pending"}}, [
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
  'ec29cba6-dd9d-4bce-aa89-6585c76e226c',
  'x-ms-keyvault-service-version',
  '1.2.139.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=76.121.141.80;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 15 Jan 2021 05:55:10 GMT',
  'Content-Length',
  '2970'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedcertificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--0')
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
  '059d9b9b-08c0-49b7-a47c-1c57ea11dafd',
  'x-ms-keyvault-service-version',
  '1.2.139.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=76.121.141.80;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 15 Jan 2021 05:55:11 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--1/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--1/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA19zNqMOTG+Hc94J+pyWEt5y+yoTKmM7KMy/S80LoeMHzBSnBXhTjiP9jgY/DugpmwvuqGkAAvNeP69wmu52fWqhpzWLk6Woi6vDK71xImjuMSvW7hL8cOGtXthiaTsqH6l1R6+9PzbWUoaEtIGJy5+NL30VD0SuDyB/MCYIDIGeNVcHUzWyQGptIV2w/C6JyWG3REdCyFE+u9SLRl8smHGSficfg5aZch5ISokmvfDVkT0I1TEbXCf+pWKMsxOrrpgghuuztf9vMdjZsnUUVragVxvgBTFLiN7tBJSdSj/iCtoaXSuZIsJiude4gjKzMLNa5TPBSTqS3+X2MarJuSQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAHNEbbx1x5nG3LPYsXxumjeYY3A9oAINhj+fXznePfmglCTksINYGibb1ZVCuhY/heogPzMaIbb83QqmPQaKbJroRpWY2GtLywBHqBshRYrhlDl2TFNkEDrkT6V/C42pIaz2rCKG44yMBpdz4q4Fw4MirF4CYh2d2v0Zof0SzYKjZESiRQuGsttPjFxa5she4IbVEB0WdoSjdrR0V26OzM/lhvrTR/ky2nodXHfx/B4s2fdouSXchJn45mADRxigzfuWvvhJb2tyJ0rwQMzIWE4GipUtFTMvmKDsDyflEBnoXyFLbu8M+ENrxIqTuxvJU3HgGdSIPzSWW3rgUSwj/Ig=","cancellation_requested":false,"status":"completed","target":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--1","request_id":"cfc3a2789a394bdfb59123c20036eba0"}, [
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
  'd9d69b1d-bee0-444f-b438-0664284d87bc',
  'x-ms-keyvault-service-version',
  '1.2.139.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=76.121.141.80;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 15 Jan 2021 05:55:11 GMT',
  'Content-Length',
  '1367'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--1/')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--1/79000a32533a408b9c1ef08367aba74d","kid":"https://keyvault_name.vault.azure.net/keys/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--1/79000a32533a408b9c1ef08367aba74d","sid":"https://keyvault_name.vault.azure.net/secrets/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--1/79000a32533a408b9c1ef08367aba74d","x5t":"5FxMqP5LGgpxU8ub3PsxhaLyd0M","cer":"MIIDKDCCAhCgAwIBAgIQa2YdqJgrRfSIrsKAL9GQbDANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjEwMTE1MDU0NTAzWhcNMjIwMTE1MDU1NTAzWjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQDX3M2ow5Mb4dz3gn6nJYS3nL7KhMqYzsozL9LzQuh4wfMFKcFeFOOI/2OBj8O6CmbC+6oaQAC814/r3Ca7nZ9aqGnNYuTpaiLq8MrvXEiaO4xK9buEvxw4a1e2GJpOyofqXVHr70/NtZShoS0gYnLn40vfRUPRK4PIH8wJggMgZ41VwdTNbJAam0hXbD8LonJYbdER0LIUT671ItGXyyYcZJ+Jx+DlplyHkhKiSa98NWRPQjVMRtcJ/6lYoyzE6uumCCG67O1/28x2NmydRRWtqBXG+AFMUuI3u0ElJ1KP+IK2hpdK5kiwmK517iCMrMws1rlM8FJOpLf5fYxqsm5JAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBQreT8FjqpFjus53J5vRAOqpmv1gTAdBgNVHQ4EFgQUK3k/BY6qRY7rOdyeb0QDqqZr9YEwDQYJKoZIhvcNAQELBQADggEBAIkmXxBlHuszOa/39/TZtFr6mSySZvdchtbODglWqwt9B8aaqx94oPsYgLHh/eZYI5kv7Mj66TGDxXyBbpuXHvy+7x0pbZQt8aQxodEtf+n4x3c7wAED71ZHb07WRzcT+hDSKt7amLVC0OmLpY/y/BN2hLJX2yj+tLotY/uluaXtHkUbvfoXs0XXKoXn3oGaNHbnMuSxf9KvNaUQR+kTPmH4WnTNI4RV7UPEN8qd6eGCUu1eJrJhBtb00XnKROsaSOvrBvktYd/mhtnmhb7bQIkxwmrP5adydA9bbYDjPo6nw5Y5EICc9uhoerGVzUsb1x+CCWm9CKTRdAR0WV8L8iI=","attributes":{"enabled":true,"nbf":1610689503,"exp":1642226103,"created":1610690103,"updated":1610690103,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--1/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1610690101,"updated":1610690101}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--1/pending"}}, [
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
  '66261e0d-6e71-465f-b3d2-50d4d9600873',
  'x-ms-keyvault-service-version',
  '1.2.139.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=76.121.141.80;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 15 Jan 2021 05:55:11 GMT',
  'Content-Length',
  '2740'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--1')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--1","deletedDate":1610690112,"scheduledPurgeDate":1618466112,"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--1/79000a32533a408b9c1ef08367aba74d","kid":"https://keyvault_name.vault.azure.net/keys/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--1/79000a32533a408b9c1ef08367aba74d","sid":"https://keyvault_name.vault.azure.net/secrets/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--1/79000a32533a408b9c1ef08367aba74d","x5t":"5FxMqP5LGgpxU8ub3PsxhaLyd0M","cer":"MIIDKDCCAhCgAwIBAgIQa2YdqJgrRfSIrsKAL9GQbDANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjEwMTE1MDU0NTAzWhcNMjIwMTE1MDU1NTAzWjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQDX3M2ow5Mb4dz3gn6nJYS3nL7KhMqYzsozL9LzQuh4wfMFKcFeFOOI/2OBj8O6CmbC+6oaQAC814/r3Ca7nZ9aqGnNYuTpaiLq8MrvXEiaO4xK9buEvxw4a1e2GJpOyofqXVHr70/NtZShoS0gYnLn40vfRUPRK4PIH8wJggMgZ41VwdTNbJAam0hXbD8LonJYbdER0LIUT671ItGXyyYcZJ+Jx+DlplyHkhKiSa98NWRPQjVMRtcJ/6lYoyzE6uumCCG67O1/28x2NmydRRWtqBXG+AFMUuI3u0ElJ1KP+IK2hpdK5kiwmK517iCMrMws1rlM8FJOpLf5fYxqsm5JAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBQreT8FjqpFjus53J5vRAOqpmv1gTAdBgNVHQ4EFgQUK3k/BY6qRY7rOdyeb0QDqqZr9YEwDQYJKoZIhvcNAQELBQADggEBAIkmXxBlHuszOa/39/TZtFr6mSySZvdchtbODglWqwt9B8aaqx94oPsYgLHh/eZYI5kv7Mj66TGDxXyBbpuXHvy+7x0pbZQt8aQxodEtf+n4x3c7wAED71ZHb07WRzcT+hDSKt7amLVC0OmLpY/y/BN2hLJX2yj+tLotY/uluaXtHkUbvfoXs0XXKoXn3oGaNHbnMuSxf9KvNaUQR+kTPmH4WnTNI4RV7UPEN8qd6eGCUu1eJrJhBtb00XnKROsaSOvrBvktYd/mhtnmhb7bQIkxwmrP5adydA9bbYDjPo6nw5Y5EICc9uhoerGVzUsb1x+CCWm9CKTRdAR0WV8L8iI=","attributes":{"enabled":true,"nbf":1610689503,"exp":1642226103,"created":1610690103,"updated":1610690103,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--1/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1610690101,"updated":1610690101}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--1/pending"}}, [
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
  '0df79853-64b7-4c59-af0f-ca86edd2d5cd',
  'x-ms-keyvault-service-version',
  '1.2.139.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=76.121.141.80;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 15 Jan 2021 05:55:13 GMT',
  'Content-Length',
  '2970'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--1')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--1"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '176',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '1b89ca2a-93ff-4800-b034-c74ff68434c4',
  'x-ms-keyvault-service-version',
  '1.2.139.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=76.121.141.80;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 15 Jan 2021 05:55:12 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--1')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--1"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '176',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '77c08ae1-6a7d-4472-8783-f62e59be6f47',
  'x-ms-keyvault-service-version',
  '1.2.139.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=76.121.141.80;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 15 Jan 2021 05:55:13 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--1')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--1","deletedDate":1610690112,"scheduledPurgeDate":1618466112,"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--1/79000a32533a408b9c1ef08367aba74d","kid":"https://keyvault_name.vault.azure.net/keys/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--1/79000a32533a408b9c1ef08367aba74d","sid":"https://keyvault_name.vault.azure.net/secrets/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--1/79000a32533a408b9c1ef08367aba74d","x5t":"5FxMqP5LGgpxU8ub3PsxhaLyd0M","cer":"MIIDKDCCAhCgAwIBAgIQa2YdqJgrRfSIrsKAL9GQbDANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjEwMTE1MDU0NTAzWhcNMjIwMTE1MDU1NTAzWjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQDX3M2ow5Mb4dz3gn6nJYS3nL7KhMqYzsozL9LzQuh4wfMFKcFeFOOI/2OBj8O6CmbC+6oaQAC814/r3Ca7nZ9aqGnNYuTpaiLq8MrvXEiaO4xK9buEvxw4a1e2GJpOyofqXVHr70/NtZShoS0gYnLn40vfRUPRK4PIH8wJggMgZ41VwdTNbJAam0hXbD8LonJYbdER0LIUT671ItGXyyYcZJ+Jx+DlplyHkhKiSa98NWRPQjVMRtcJ/6lYoyzE6uumCCG67O1/28x2NmydRRWtqBXG+AFMUuI3u0ElJ1KP+IK2hpdK5kiwmK517iCMrMws1rlM8FJOpLf5fYxqsm5JAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBQreT8FjqpFjus53J5vRAOqpmv1gTAdBgNVHQ4EFgQUK3k/BY6qRY7rOdyeb0QDqqZr9YEwDQYJKoZIhvcNAQELBQADggEBAIkmXxBlHuszOa/39/TZtFr6mSySZvdchtbODglWqwt9B8aaqx94oPsYgLHh/eZYI5kv7Mj66TGDxXyBbpuXHvy+7x0pbZQt8aQxodEtf+n4x3c7wAED71ZHb07WRzcT+hDSKt7amLVC0OmLpY/y/BN2hLJX2yj+tLotY/uluaXtHkUbvfoXs0XXKoXn3oGaNHbnMuSxf9KvNaUQR+kTPmH4WnTNI4RV7UPEN8qd6eGCUu1eJrJhBtb00XnKROsaSOvrBvktYd/mhtnmhb7bQIkxwmrP5adydA9bbYDjPo6nw5Y5EICc9uhoerGVzUsb1x+CCWm9CKTRdAR0WV8L8iI=","attributes":{"enabled":true,"nbf":1610689503,"exp":1642226103,"created":1610690103,"updated":1610690103,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--1/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1610690101,"updated":1610690101}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--1/pending"}}, [
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
  '2a9f13cb-013f-4360-bd00-2db9e67ad7ca',
  'x-ms-keyvault-service-version',
  '1.2.139.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=76.121.141.80;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 15 Jan 2021 05:55:16 GMT',
  'Content-Length',
  '2970'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedcertificates/challengeAuthCertificateName-Authenticationshouldworkforparallelrequests--1')
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
  'f2a4ab4f-581c-4f1d-90e6-f54b1b8f06fc',
  'x-ms-keyvault-service-version',
  '1.2.139.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=76.121.141.80;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 15 Jan 2021 05:55:16 GMT'
]);

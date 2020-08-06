let nock = require('nock');

module.exports.hash = "e1fc9a1537b28f21d32e3c40a8cba8c5";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/certificates/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-0/create')
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
  '9ffe20a9-b833-4ea2-91df-3a58e16be170',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 13:10:17 GMT'
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
  '5687299b-29f6-47e9-a148-dd0aaff51201',
  'x-ms-ests-server',
  '2.1.10732.8 - WUS2 ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=Ag--1D7BPAhEmsdoknOMtXw_aSJHAQAAADmZhtYOAAAA; expires=Sat, 25-Jul-2020 13:10:18 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; SameSite=None; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; SameSite=None; secure; HttpOnly',
  'Date',
  'Thu, 25 Jun 2020 13:10:17 GMT',
  'Content-Length',
  '1315'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/certificates/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-0/create', {"policy":{"key_props":{},"secret_props":{},"x509_props":{"subject":"cn=MyCert","sans":{}},"issuer":{"name":"Self"},"attributes":{}},"attributes":{}})
  .query(true)
  .reply(202, {"id":"https://keyvault_name.vault.azure.net/certificates/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAobmzBFf/EbYIzWBsPAjBqOqfVbLGY1rpcx3541XHpmfenmHoF4e+HyA03YfifQiuaB3f6lOCBikeZUZIhDMO5nT7+BVFkZndShtQkfTE0oZ4y/ZGiBb+c2EsvaEGS/8FkeKV98F1ed7Q+j+NoYoEq2ne8ABVdhmpwwwRDDV5u8eaNG78MzUVDKG1vUp2MtsJkyBY0Dch6Lw1rly2mnzH7+MpefXb9ZsOhiZDhusMhzzhMfGrqMkBUVOQt2k80vIBtACTFu7sMI0s/7IebK+aajbvfRjsdWVQDcksClPi4I6dD+gCoNbpbonLGXP2iBVe7pafva2s/zF1Zk3zDoqG2wIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAC9770jcKbA7WzNDnxXyc5KGnVjjudbt5PUlbx8qz9INl7C4auHdrgcFEWTb/Zo4SUDb57YniV6p3TldYPFAFpi9ORKI896UMlH7oKEqWmXH9A77//FukE33sdB2lf5vzwe6lFoPRtiacMzTzHSlN81hWpMqD8bSKpNswtd+2vt3aTgGX4CZGlShk+snKweRflYF6U051kTSPg54Krl5rTLoByZmhcemtm2SF/JrHFhSKX4kygMFDuOaLRLHUU9EcBC4AkTVUgxJTUSREVvujC9xdAstUkzkYJi2B0XWKSN2TyIoK95bUmRf6cfX3zYaANJMrNpL+U5M5t/ZY2RRr4w=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"7d2a6fd25ecb4acb91ddb6a8a70e060e"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://keyvault_name.vault.azure.net/certificates/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-0/pending?api-version=7.1&request_id=7d2a6fd25ecb4acb91ddb6a8a70e060e',
  'Retry-After',
  '10',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'e5e4a0d2-395b-4250-aa66-280372a81caa',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 13:10:18 GMT',
  'Content-Length',
  '1370'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAobmzBFf/EbYIzWBsPAjBqOqfVbLGY1rpcx3541XHpmfenmHoF4e+HyA03YfifQiuaB3f6lOCBikeZUZIhDMO5nT7+BVFkZndShtQkfTE0oZ4y/ZGiBb+c2EsvaEGS/8FkeKV98F1ed7Q+j+NoYoEq2ne8ABVdhmpwwwRDDV5u8eaNG78MzUVDKG1vUp2MtsJkyBY0Dch6Lw1rly2mnzH7+MpefXb9ZsOhiZDhusMhzzhMfGrqMkBUVOQt2k80vIBtACTFu7sMI0s/7IebK+aajbvfRjsdWVQDcksClPi4I6dD+gCoNbpbonLGXP2iBVe7pafva2s/zF1Zk3zDoqG2wIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAC9770jcKbA7WzNDnxXyc5KGnVjjudbt5PUlbx8qz9INl7C4auHdrgcFEWTb/Zo4SUDb57YniV6p3TldYPFAFpi9ORKI896UMlH7oKEqWmXH9A77//FukE33sdB2lf5vzwe6lFoPRtiacMzTzHSlN81hWpMqD8bSKpNswtd+2vt3aTgGX4CZGlShk+snKweRflYF6U051kTSPg54Krl5rTLoByZmhcemtm2SF/JrHFhSKX4kygMFDuOaLRLHUU9EcBC4AkTVUgxJTUSREVvujC9xdAstUkzkYJi2B0XWKSN2TyIoK95bUmRf6cfX3zYaANJMrNpL+U5M5t/ZY2RRr4w=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"7d2a6fd25ecb4acb91ddb6a8a70e060e"}, [
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
  'dbac879f-95a5-4fcc-92d5-7991b63d68e6',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 13:10:19 GMT',
  'Content-Length',
  '1370'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAobmzBFf/EbYIzWBsPAjBqOqfVbLGY1rpcx3541XHpmfenmHoF4e+HyA03YfifQiuaB3f6lOCBikeZUZIhDMO5nT7+BVFkZndShtQkfTE0oZ4y/ZGiBb+c2EsvaEGS/8FkeKV98F1ed7Q+j+NoYoEq2ne8ABVdhmpwwwRDDV5u8eaNG78MzUVDKG1vUp2MtsJkyBY0Dch6Lw1rly2mnzH7+MpefXb9ZsOhiZDhusMhzzhMfGrqMkBUVOQt2k80vIBtACTFu7sMI0s/7IebK+aajbvfRjsdWVQDcksClPi4I6dD+gCoNbpbonLGXP2iBVe7pafva2s/zF1Zk3zDoqG2wIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAC9770jcKbA7WzNDnxXyc5KGnVjjudbt5PUlbx8qz9INl7C4auHdrgcFEWTb/Zo4SUDb57YniV6p3TldYPFAFpi9ORKI896UMlH7oKEqWmXH9A77//FukE33sdB2lf5vzwe6lFoPRtiacMzTzHSlN81hWpMqD8bSKpNswtd+2vt3aTgGX4CZGlShk+snKweRflYF6U051kTSPg54Krl5rTLoByZmhcemtm2SF/JrHFhSKX4kygMFDuOaLRLHUU9EcBC4AkTVUgxJTUSREVvujC9xdAstUkzkYJi2B0XWKSN2TyIoK95bUmRf6cfX3zYaANJMrNpL+U5M5t/ZY2RRr4w=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"7d2a6fd25ecb4acb91ddb6a8a70e060e"}, [
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
  '83c72066-5aff-41c7-b35b-01c8f22b6867',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 13:10:19 GMT',
  'Content-Length',
  '1370'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistcertificatesbypage-4892663737593751')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistcertificatesbypage-4892663737593751"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '146',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '6851ebae-2ba3-4090-bdac-bcdc57316c54',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 13:10:19 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAobmzBFf/EbYIzWBsPAjBqOqfVbLGY1rpcx3541XHpmfenmHoF4e+HyA03YfifQiuaB3f6lOCBikeZUZIhDMO5nT7+BVFkZndShtQkfTE0oZ4y/ZGiBb+c2EsvaEGS/8FkeKV98F1ed7Q+j+NoYoEq2ne8ABVdhmpwwwRDDV5u8eaNG78MzUVDKG1vUp2MtsJkyBY0Dch6Lw1rly2mnzH7+MpefXb9ZsOhiZDhusMhzzhMfGrqMkBUVOQt2k80vIBtACTFu7sMI0s/7IebK+aajbvfRjsdWVQDcksClPi4I6dD+gCoNbpbonLGXP2iBVe7pafva2s/zF1Zk3zDoqG2wIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAC9770jcKbA7WzNDnxXyc5KGnVjjudbt5PUlbx8qz9INl7C4auHdrgcFEWTb/Zo4SUDb57YniV6p3TldYPFAFpi9ORKI896UMlH7oKEqWmXH9A77//FukE33sdB2lf5vzwe6lFoPRtiacMzTzHSlN81hWpMqD8bSKpNswtd+2vt3aTgGX4CZGlShk+snKweRflYF6U051kTSPg54Krl5rTLoByZmhcemtm2SF/JrHFhSKX4kygMFDuOaLRLHUU9EcBC4AkTVUgxJTUSREVvujC9xdAstUkzkYJi2B0XWKSN2TyIoK95bUmRf6cfX3zYaANJMrNpL+U5M5t/ZY2RRr4w=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"7d2a6fd25ecb4acb91ddb6a8a70e060e"}, [
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
  'f478a491-eb2d-470d-994e-255b127e1009',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 13:10:21 GMT',
  'Content-Length',
  '1370'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistcertificatesbypage-4892663737593751')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistcertificatesbypage-4892663737593751"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '146',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '817e595e-637f-4f2e-9331-80d9ba1611b3',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 13:10:21 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAobmzBFf/EbYIzWBsPAjBqOqfVbLGY1rpcx3541XHpmfenmHoF4e+HyA03YfifQiuaB3f6lOCBikeZUZIhDMO5nT7+BVFkZndShtQkfTE0oZ4y/ZGiBb+c2EsvaEGS/8FkeKV98F1ed7Q+j+NoYoEq2ne8ABVdhmpwwwRDDV5u8eaNG78MzUVDKG1vUp2MtsJkyBY0Dch6Lw1rly2mnzH7+MpefXb9ZsOhiZDhusMhzzhMfGrqMkBUVOQt2k80vIBtACTFu7sMI0s/7IebK+aajbvfRjsdWVQDcksClPi4I6dD+gCoNbpbonLGXP2iBVe7pafva2s/zF1Zk3zDoqG2wIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAC9770jcKbA7WzNDnxXyc5KGnVjjudbt5PUlbx8qz9INl7C4auHdrgcFEWTb/Zo4SUDb57YniV6p3TldYPFAFpi9ORKI896UMlH7oKEqWmXH9A77//FukE33sdB2lf5vzwe6lFoPRtiacMzTzHSlN81hWpMqD8bSKpNswtd+2vt3aTgGX4CZGlShk+snKweRflYF6U051kTSPg54Krl5rTLoByZmhcemtm2SF/JrHFhSKX4kygMFDuOaLRLHUU9EcBC4AkTVUgxJTUSREVvujC9xdAstUkzkYJi2B0XWKSN2TyIoK95bUmRf6cfX3zYaANJMrNpL+U5M5t/ZY2RRr4w=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"7d2a6fd25ecb4acb91ddb6a8a70e060e"}, [
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
  '3dc2b7ea-090c-4677-a0ef-79720284b41b',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 13:10:23 GMT',
  'Content-Length',
  '1370'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistcertificatesbypage-4892663737593751')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistcertificatesbypage-4892663737593751"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '146',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'eb585721-eb00-4575-b8af-fd684bd6c8c9',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 13:10:23 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAobmzBFf/EbYIzWBsPAjBqOqfVbLGY1rpcx3541XHpmfenmHoF4e+HyA03YfifQiuaB3f6lOCBikeZUZIhDMO5nT7+BVFkZndShtQkfTE0oZ4y/ZGiBb+c2EsvaEGS/8FkeKV98F1ed7Q+j+NoYoEq2ne8ABVdhmpwwwRDDV5u8eaNG78MzUVDKG1vUp2MtsJkyBY0Dch6Lw1rly2mnzH7+MpefXb9ZsOhiZDhusMhzzhMfGrqMkBUVOQt2k80vIBtACTFu7sMI0s/7IebK+aajbvfRjsdWVQDcksClPi4I6dD+gCoNbpbonLGXP2iBVe7pafva2s/zF1Zk3zDoqG2wIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAC9770jcKbA7WzNDnxXyc5KGnVjjudbt5PUlbx8qz9INl7C4auHdrgcFEWTb/Zo4SUDb57YniV6p3TldYPFAFpi9ORKI896UMlH7oKEqWmXH9A77//FukE33sdB2lf5vzwe6lFoPRtiacMzTzHSlN81hWpMqD8bSKpNswtd+2vt3aTgGX4CZGlShk+snKweRflYF6U051kTSPg54Krl5rTLoByZmhcemtm2SF/JrHFhSKX4kygMFDuOaLRLHUU9EcBC4AkTVUgxJTUSREVvujC9xdAstUkzkYJi2B0XWKSN2TyIoK95bUmRf6cfX3zYaANJMrNpL+U5M5t/ZY2RRr4w=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"7d2a6fd25ecb4acb91ddb6a8a70e060e"}, [
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
  '14260ab0-3d6d-4eb9-9759-7d645106a43b',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 13:10:25 GMT',
  'Content-Length',
  '1370'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistcertificatesbypage-4892663737593751')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistcertificatesbypage-4892663737593751"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '146',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '4e449f78-057d-46a4-88f0-d2c1c2249ca0',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 13:10:25 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAobmzBFf/EbYIzWBsPAjBqOqfVbLGY1rpcx3541XHpmfenmHoF4e+HyA03YfifQiuaB3f6lOCBikeZUZIhDMO5nT7+BVFkZndShtQkfTE0oZ4y/ZGiBb+c2EsvaEGS/8FkeKV98F1ed7Q+j+NoYoEq2ne8ABVdhmpwwwRDDV5u8eaNG78MzUVDKG1vUp2MtsJkyBY0Dch6Lw1rly2mnzH7+MpefXb9ZsOhiZDhusMhzzhMfGrqMkBUVOQt2k80vIBtACTFu7sMI0s/7IebK+aajbvfRjsdWVQDcksClPi4I6dD+gCoNbpbonLGXP2iBVe7pafva2s/zF1Zk3zDoqG2wIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAC9770jcKbA7WzNDnxXyc5KGnVjjudbt5PUlbx8qz9INl7C4auHdrgcFEWTb/Zo4SUDb57YniV6p3TldYPFAFpi9ORKI896UMlH7oKEqWmXH9A77//FukE33sdB2lf5vzwe6lFoPRtiacMzTzHSlN81hWpMqD8bSKpNswtd+2vt3aTgGX4CZGlShk+snKweRflYF6U051kTSPg54Krl5rTLoByZmhcemtm2SF/JrHFhSKX4kygMFDuOaLRLHUU9EcBC4AkTVUgxJTUSREVvujC9xdAstUkzkYJi2B0XWKSN2TyIoK95bUmRf6cfX3zYaANJMrNpL+U5M5t/ZY2RRr4w=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"7d2a6fd25ecb4acb91ddb6a8a70e060e"}, [
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
  '6cdb66df-8e32-4e99-98de-88797aa2e92e',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 13:10:27 GMT',
  'Content-Length',
  '1370'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistcertificatesbypage-4892663737593751')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistcertificatesbypage-4892663737593751"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '146',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'a2b31263-254c-40d2-b66a-431136a6d4fc',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 13:10:27 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAobmzBFf/EbYIzWBsPAjBqOqfVbLGY1rpcx3541XHpmfenmHoF4e+HyA03YfifQiuaB3f6lOCBikeZUZIhDMO5nT7+BVFkZndShtQkfTE0oZ4y/ZGiBb+c2EsvaEGS/8FkeKV98F1ed7Q+j+NoYoEq2ne8ABVdhmpwwwRDDV5u8eaNG78MzUVDKG1vUp2MtsJkyBY0Dch6Lw1rly2mnzH7+MpefXb9ZsOhiZDhusMhzzhMfGrqMkBUVOQt2k80vIBtACTFu7sMI0s/7IebK+aajbvfRjsdWVQDcksClPi4I6dD+gCoNbpbonLGXP2iBVe7pafva2s/zF1Zk3zDoqG2wIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAC9770jcKbA7WzNDnxXyc5KGnVjjudbt5PUlbx8qz9INl7C4auHdrgcFEWTb/Zo4SUDb57YniV6p3TldYPFAFpi9ORKI896UMlH7oKEqWmXH9A77//FukE33sdB2lf5vzwe6lFoPRtiacMzTzHSlN81hWpMqD8bSKpNswtd+2vt3aTgGX4CZGlShk+snKweRflYF6U051kTSPg54Krl5rTLoByZmhcemtm2SF/JrHFhSKX4kygMFDuOaLRLHUU9EcBC4AkTVUgxJTUSREVvujC9xdAstUkzkYJi2B0XWKSN2TyIoK95bUmRf6cfX3zYaANJMrNpL+U5M5t/ZY2RRr4w=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"7d2a6fd25ecb4acb91ddb6a8a70e060e"}, [
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
  '959dceaa-470b-4050-98ad-125e4b0f898e',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 13:10:29 GMT',
  'Content-Length',
  '1370'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistcertificatesbypage-4892663737593751')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistcertificatesbypage-4892663737593751"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '146',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '960dc8ff-1135-43d2-92a4-8732d9c72a69',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 13:10:29 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAobmzBFf/EbYIzWBsPAjBqOqfVbLGY1rpcx3541XHpmfenmHoF4e+HyA03YfifQiuaB3f6lOCBikeZUZIhDMO5nT7+BVFkZndShtQkfTE0oZ4y/ZGiBb+c2EsvaEGS/8FkeKV98F1ed7Q+j+NoYoEq2ne8ABVdhmpwwwRDDV5u8eaNG78MzUVDKG1vUp2MtsJkyBY0Dch6Lw1rly2mnzH7+MpefXb9ZsOhiZDhusMhzzhMfGrqMkBUVOQt2k80vIBtACTFu7sMI0s/7IebK+aajbvfRjsdWVQDcksClPi4I6dD+gCoNbpbonLGXP2iBVe7pafva2s/zF1Zk3zDoqG2wIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAC9770jcKbA7WzNDnxXyc5KGnVjjudbt5PUlbx8qz9INl7C4auHdrgcFEWTb/Zo4SUDb57YniV6p3TldYPFAFpi9ORKI896UMlH7oKEqWmXH9A77//FukE33sdB2lf5vzwe6lFoPRtiacMzTzHSlN81hWpMqD8bSKpNswtd+2vt3aTgGX4CZGlShk+snKweRflYF6U051kTSPg54Krl5rTLoByZmhcemtm2SF/JrHFhSKX4kygMFDuOaLRLHUU9EcBC4AkTVUgxJTUSREVvujC9xdAstUkzkYJi2B0XWKSN2TyIoK95bUmRf6cfX3zYaANJMrNpL+U5M5t/ZY2RRr4w=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"7d2a6fd25ecb4acb91ddb6a8a70e060e"}, [
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
  '67deba75-c0ca-403b-b96b-ddac713043fd',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 13:10:31 GMT',
  'Content-Length',
  '1370'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistcertificatesbypage-4892663737593751')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistcertificatesbypage-4892663737593751"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '146',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'b3a46ec0-5f43-4c09-817b-823fc94527b0',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 13:10:32 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAobmzBFf/EbYIzWBsPAjBqOqfVbLGY1rpcx3541XHpmfenmHoF4e+HyA03YfifQiuaB3f6lOCBikeZUZIhDMO5nT7+BVFkZndShtQkfTE0oZ4y/ZGiBb+c2EsvaEGS/8FkeKV98F1ed7Q+j+NoYoEq2ne8ABVdhmpwwwRDDV5u8eaNG78MzUVDKG1vUp2MtsJkyBY0Dch6Lw1rly2mnzH7+MpefXb9ZsOhiZDhusMhzzhMfGrqMkBUVOQt2k80vIBtACTFu7sMI0s/7IebK+aajbvfRjsdWVQDcksClPi4I6dD+gCoNbpbonLGXP2iBVe7pafva2s/zF1Zk3zDoqG2wIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAC9770jcKbA7WzNDnxXyc5KGnVjjudbt5PUlbx8qz9INl7C4auHdrgcFEWTb/Zo4SUDb57YniV6p3TldYPFAFpi9ORKI896UMlH7oKEqWmXH9A77//FukE33sdB2lf5vzwe6lFoPRtiacMzTzHSlN81hWpMqD8bSKpNswtd+2vt3aTgGX4CZGlShk+snKweRflYF6U051kTSPg54Krl5rTLoByZmhcemtm2SF/JrHFhSKX4kygMFDuOaLRLHUU9EcBC4AkTVUgxJTUSREVvujC9xdAstUkzkYJi2B0XWKSN2TyIoK95bUmRf6cfX3zYaANJMrNpL+U5M5t/ZY2RRr4w=","cancellation_requested":false,"status":"completed","target":"https://keyvault_name.vault.azure.net/certificates/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-0","request_id":"7d2a6fd25ecb4acb91ddb6a8a70e060e"}, [
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
  'd2241da9-31c5-4542-be2c-98183bff869f',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 13:10:33 GMT',
  'Content-Length',
  '1367'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-0/')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-0/75f4250c57394daba25a0ccadfe7e10d","kid":"https://keyvault_name.vault.azure.net/keys/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-0/75f4250c57394daba25a0ccadfe7e10d","sid":"https://keyvault_name.vault.azure.net/secrets/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-0/75f4250c57394daba25a0ccadfe7e10d","x5t":"Yj07xp_eOJMn7HPlahwQbKs9Eg8","cer":"MIIDKDCCAhCgAwIBAgIQfDvNAzhSSh6HHUDV89pfITANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjAwNjI1MTMwMDMzWhcNMjEwNjI1MTMxMDMzWjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQChubMEV/8RtgjNYGw8CMGo6p9VssZjWulzHfnjVcemZ96eYegXh74fIDTdh+J9CK5oHd/qU4IGKR5lRkiEMw7mdPv4FUWRmd1KG1CR9MTShnjL9kaIFv5zYSy9oQZL/wWR4pX3wXV53tD6P42higSrad7wAFV2GanDDBEMNXm7x5o0bvwzNRUMobW9SnYy2wmTIFjQNyHovDWuXLaafMfv4yl59dv1mw6GJkOG6wyHPOEx8auoyQFRU5C3aTzS8gG0AJMW7uwwjSz/sh5sr5pqNu99GOx1ZVANySwKU+Lgjp0P6AKg1uluicsZc/aIFV7ulp+9raz/MXVmTfMOiobbAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBTjkI1VhBb9cYdl70SJH8tdOV847DAdBgNVHQ4EFgQU45CNVYQW/XGHZe9EiR/LXTlfOOwwDQYJKoZIhvcNAQELBQADggEBAGafeWghsVmVEo6/QGgBRW/hhVWq4MEfW5YOLwmNObpJL3/OEKhUDw9u9to1kWcos/aRj4u+bz3vTqIJxK+i0dEBIo///mkxJhtLLGd6Ks6rXlGgEOG1+m8GvZkUsLOaZsPAFYAgnF091iS7PcNW5VYqvpFvIWgIEVwhE0dBGCUogoBatYZyc+YqWCqbzv8mhui3NgToGoiLW1dFxXbeyeGGee5yyroSDE+6jTbMCzrdX/2fK41J2lOL3Ap/IYtHltCTKIOmlToq6uG2qSyeYGLL63bYo+4ZvpHyjN/5QYQQXS4WMyPw5o9+jcIyONNOEbJoiFUTwsm55A0diDisDlk=","attributes":{"enabled":true,"nbf":1593090033,"exp":1624626633,"created":1593090633,"updated":1593090633,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-0/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1593090618,"updated":1593090618}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-0/pending"}}, [
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
  '215b2454-1440-4fc5-a43b-51b669b11af6',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 13:10:33 GMT',
  'Content-Length',
  '2740'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/secrets/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-0/')
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
  '23f08cea-38f1-4eb0-9a7f-b982207b87d0',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 13:10:34 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistcertificatesbypage-4892663737593751')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistcertificatesbypage-4892663737593751"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '146',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '9aafb6e3-af01-490f-9e38-17deeba89c69',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 13:10:34 GMT'
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
  '497300df-9015-43b5-bae9-4e0a59333901',
  'x-ms-ests-server',
  '2.1.10732.8 - WUS2 ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=Ag--1D7BPAhEmsdoknOMtXw_aSJHAgAAADmZhtYOAAAA; expires=Sat, 25-Jul-2020 13:10:34 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; SameSite=None; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; SameSite=None; secure; HttpOnly',
  'Date',
  'Thu, 25 Jun 2020 13:10:34 GMT',
  'Content-Length',
  '1315'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/secrets/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-0/')
  .query(true)
  .reply(200, {"value":"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","contentType":"application/x-pkcs12","id":"https://keyvault_name.vault.azure.net/secrets/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-0/75f4250c57394daba25a0ccadfe7e10d","managed":true,"attributes":{"enabled":true,"nbf":1593090033,"exp":1624626633,"created":1593090633,"updated":1593090633,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90},"kid":"https://keyvault_name.vault.azure.net/keys/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-0/75f4250c57394daba25a0ccadfe7e10d"}, [
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
  '3c56d07b-9222-411b-b8ae-2197149308b8',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 13:10:34 GMT',
  'Content-Length',
  '4089'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/certificates/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-1/import', {"value":"MIIKNAIBAzCCCfQGCSqGSIb3DQEHAaCCCeUEggnhMIIJ3TCCBhYGCSqGSIb3DQEHAaCCBgcEggYDMIIF/zCCBfsGCyqGSIb3DQEMCgECoIIE/jCCBPowHAYKKoZIhvcNAQwBAzAOBAgfpTPTGedBYwICB9AEggTY6aSetgYrhYJQddKxpbxcnXHYu30CQ+jxUQFy83sskgTpq5dBTQvXUl8NN68pfuP4jaTcwaMSoAoZaQh3mwzQjgH3+rkMHUBSll+SSD2Cm9uv5dBmbtqCJMhmCmaWPkH0DKHe03JqhbzcVzNjnRM3F4ABsmbMRmYUvfm+v+GeRueucd6MqZSJSTK0rFm00QI/zuD5neeK8PGNwNWNkelQzenUWACqzUkJLe1ly1Q//YuhrGkwc3coG7GDM59pgjo5tC8gSAdi0/Uty1NgghAL0Y+4Sc4vFKIwaafvuD3iWhU/eqkbwmsOdPEYFgfYmv3q6bJGcZYEcssWs3b9rLUqB3Mxl8nh+UkY4vB7zqa6L834P9IqjLNm6JloqBMDr3MspUGzYpwjt6EbMnfNYNKVDc2GinH7P/pPvp3pQp6AocK1XK349GkKyIBqjBriC2WxRrN7S2rtCbmz8hX500U8N+H7jYjHnIEjbBkHpQXd2/jDHP+nlJzIXXR+jiQvcRBgZ8GhUep8c9eqnw+cI09nE5XafQDE8cBTuHGa3VT/VVl+B4HDXVFj5n8N02JkDEcuIGWyroA+LEOBrYPktR+M7Iok4wzycqntr1tb3UzdFvcdJn/YQw/HMsvTSrSKuQoohpVC9M0b1eSrskfxziEHQPAtHb/LRNOJB1wl584dFnqkYfLtU85q2XVDXYSigDHO9zEULcENfcjGA1fUJJ7oUU/ss56DppB0dRVYXbghf8pRJmJ1sCFezZlQvuQ2Sl2ho4zNyMr47ArIjMDS0iQ4lZ2B254Fj4Sq+gdjadXLNBybCeYCYE3hjiVQKy5CSTjNlFdUFH5CNY95r3XdEI1qIl+f2ITDucsZbX/vYBEGQtZn6uHCwxlAD9U58AFE/giecH5wRbGB1H+fPj9fskP8JZj+LGMhnJauSMwcaWMo5oApkFcH+k9tUTp2h0hbqj/0WYm6epZClvtamPlR/uga+C5uyirDYKqRfaTnh/f/9F74ATpyyCio/WZ8V1lbp/R3+kC8XF53qOuC4zVH9wZm4zSaQbweiKg00l2VnaYlVLsLdJNJwCs3ozGjPzmwQj7WSgl0VI/4Gexgq8Crq5NHO1VOKRt8C94de/9QTHoI5C1mXPGvTbeeJDrY0jv+wQJjoxacxZvNdLeZIQLdTNYyuee0GDHhU+1KgwtbwEJAkxXPsKpT3b9wexxXMNKdik+qCroO7G2S3YSECmxO2OJux16FnMoOBUuPtDGdB0GBMtS0JxY67Uedv1nTBe/VaHGviN4GOCnKi9QQcEXIZQRpPBheG3/9SmFQH9RSEMWu5lEIi7x5KhW4t0fBUlwJu5Nnnx7bN2oCaOVcQPBB/F6EVSDJp5IlVw5wA7k1Z0ghTvxqR7THMg5xEFfd6F5ZonCr0c/k2HGpzl3520qO6apT7TZ5k34yjrt4DklGNRbcb9HsOwlxbSDTgJPMszjpEhqxvR+1gO+LUkBmJ1FGrNEeGB4tgIWC6J+2fEXBY+TM0JaIxaCDIqOmOfsQwlhOHjnp7kIBAOh3w7G2nr2NCpKUVmOFbWpBPZI/EheibkpWJM3qL1hPAPmL3PDOZsgGlCpNzvsL5S9TQ63t33WVg1Pcqa063AnIcpwfFoUOEf+k7kpJ3Uv0IWWctjGB6TATBgkqhkiG9w0BCRUxBgQEAQAAADBXBgkqhkiG9w0BCRQxSh5IAGIAZAA4ADMANwA5AGMAMQAtAGEANgA1AGMALQA0ADMAZQBlAC0AOAAxADAAYQAtADUAYQAyADQAMwA0ADYAMwBmAGMAZQBjMHkGCSsGAQQBgjcRATFsHmoATQBpAGMAcgBvAHMAbwBmAHQAIABFAG4AaABhAG4AYwBlAGQAIABSAFMAQQAgAGEAbgBkACAAQQBFAFMAIABDAHIAeQBwAHQAbwBnAHIAYQBwAGgAaQBjACAAUAByAG8AdgBpAGQAZQByMIIDvwYJKoZIhvcNAQcGoIIDsDCCA6wCAQAwggOlBgkqhkiG9w0BBwEwHAYKKoZIhvcNAQwBBjAOBAjQfnDhM3d7XwICB9CAggN4Hl11Rqi43/SweDT043Lq7seDazsHLt4hV5hiD12HdgZe4sRa2Rbu5Hq1pV5S+CFWAcuQvwXfV06M4gU5ugKg87BkD5QgfOg5B6j/hsUSjLBQYaqys77n1SDH9qWg6YeTFurrUFbJ2pdCHqFNKRxe5/u+AHE7jvQN83GHuSlnyKEHaQbKyJdT09NpaE+vKNegCe9vELjqRfzfGPDU5by8EhHCcLT9+BsOqKkuTls/0vM8clPolr5UwJETwafGI9mP07AQZMt/F9Doixue7gmsbAhjRcWqrsz9AlyixhnFX1Z9bzeStaxZratMset9s/ZYmf8/7NLRy35DzQDLdXXASxDlop+Gp0TCxomN3aaH7bZkeuyrjqaYqG5SwwdgsT/94nlpxV+cgKT+GBDVey11muOHwTm13IKMg9fHR9IeqG0SyJoyT+Qi2aYbO92V42EHyekeJ/p4q0BzmI6K01UulVfUUzBgD+xGD+SGXaYXA35zehvSr5/4JI0RDJKDYXm8aKtZtadHbNOCiJS+CqVYS9LCnNqhO0Au24YdGOd9MLL5ywyK7gQmTwZNxNGOVjmEVfFEVGRGEzHDlgdBFx9fiSQJoiHthSxFp1vPD3YKMpmerjIbKsursQlF0rh+9bXci5Hy4efj/UEaIoLFPCM49nbOXY9SMGIJ3yVh4S2rGyAnJmDggMzeZg6+X82Ge1A/ETb+/BvOSz1ivWF1MpAgunhITYmkaRHCBTbI/KaVdeYUBwKurbJRI96Tc89MY3wx5vsQQx0xKDBODKp20T/4ajvFKwvzjj4P2hxwmYa+w6h0XKSIP5Czo3F2aKUG8WG2JRiOcWMyBMfAPmncj0m8sILch2rZ/wVle9IBDvCRf8v4ojf70ZyWrVOXF7DzRrTGwygvxIjf801AbsTYONAlaHEMrqu/keb/1G5w7ZqrBINeLyH39ZGlNMlusTS2jdtRQi0E+JhImOEwS3N3rAxjQJIQHEGWszlnbGpsNtRjethpdB7tWl36DJPOl80ik2X4sQJiuSC1xVcS9eeBc/kkK/TuE95RAkNxFXjj2L4mpCxrMFWphxXHhoKwQFH7u/ahMb8dWyzsFmDFwg8vCo+f62b6889Xne1E9N+MiMN7iXP2sjArokr/eL2tmjkv7sJ4P87Ce7gbKQ6Kb+OGeyVuLn6MlcmFW/oaMDcwHzAHBgUrDgMCGgQUwuuUC2zGcTM2jIv7h6JODqQAES4EFFIp13hoej1shCzMB6bv12mw6RNv"})
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-1/5763951a48df4d098a7a0211306feb0e","kid":"https://keyvault_name.vault.azure.net/keys/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-1/5763951a48df4d098a7a0211306feb0e","sid":"https://keyvault_name.vault.azure.net/secrets/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-1/5763951a48df4d098a7a0211306feb0e","x5t":"Yj07xp_eOJMn7HPlahwQbKs9Eg8","cer":"MIIDKDCCAhCgAwIBAgIQfDvNAzhSSh6HHUDV89pfITANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjAwNjI1MTMwMDMzWhcNMjEwNjI1MTMxMDMzWjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQChubMEV/8RtgjNYGw8CMGo6p9VssZjWulzHfnjVcemZ96eYegXh74fIDTdh+J9CK5oHd/qU4IGKR5lRkiEMw7mdPv4FUWRmd1KG1CR9MTShnjL9kaIFv5zYSy9oQZL/wWR4pX3wXV53tD6P42higSrad7wAFV2GanDDBEMNXm7x5o0bvwzNRUMobW9SnYy2wmTIFjQNyHovDWuXLaafMfv4yl59dv1mw6GJkOG6wyHPOEx8auoyQFRU5C3aTzS8gG0AJMW7uwwjSz/sh5sr5pqNu99GOx1ZVANySwKU+Lgjp0P6AKg1uluicsZc/aIFV7ulp+9raz/MXVmTfMOiobbAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBTjkI1VhBb9cYdl70SJH8tdOV847DAdBgNVHQ4EFgQU45CNVYQW/XGHZe9EiR/LXTlfOOwwDQYJKoZIhvcNAQELBQADggEBAGafeWghsVmVEo6/QGgBRW/hhVWq4MEfW5YOLwmNObpJL3/OEKhUDw9u9to1kWcos/aRj4u+bz3vTqIJxK+i0dEBIo///mkxJhtLLGd6Ks6rXlGgEOG1+m8GvZkUsLOaZsPAFYAgnF091iS7PcNW5VYqvpFvIWgIEVwhE0dBGCUogoBatYZyc+YqWCqbzv8mhui3NgToGoiLW1dFxXbeyeGGee5yyroSDE+6jTbMCzrdX/2fK41J2lOL3Ap/IYtHltCTKIOmlToq6uG2qSyeYGLL63bYo+4ZvpHyjN/5QYQQXS4WMyPw5o9+jcIyONNOEbJoiFUTwsm55A0diDisDlk=","attributes":{"enabled":true,"nbf":1593090033,"exp":1624626633,"created":1593090634,"updated":1593090634,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-1/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"CN=MyCert","ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":13,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"EmailContacts"}}],"issuer":{"name":"Unknown"},"attributes":{"enabled":true,"created":1593090634,"updated":1593090634}}}, [
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
  'a6cc77e6-36d3-43f5-b1cf-1fdca3c6e0e7',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 13:10:35 GMT',
  'Content-Length',
  '2559'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/certificates/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-0')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-0","deletedDate":1593090635,"scheduledPurgeDate":1600866635,"id":"https://keyvault_name.vault.azure.net/certificates/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-0/75f4250c57394daba25a0ccadfe7e10d","kid":"https://keyvault_name.vault.azure.net/keys/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-0/75f4250c57394daba25a0ccadfe7e10d","sid":"https://keyvault_name.vault.azure.net/secrets/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-0/75f4250c57394daba25a0ccadfe7e10d","x5t":"Yj07xp_eOJMn7HPlahwQbKs9Eg8","cer":"MIIDKDCCAhCgAwIBAgIQfDvNAzhSSh6HHUDV89pfITANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjAwNjI1MTMwMDMzWhcNMjEwNjI1MTMxMDMzWjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQChubMEV/8RtgjNYGw8CMGo6p9VssZjWulzHfnjVcemZ96eYegXh74fIDTdh+J9CK5oHd/qU4IGKR5lRkiEMw7mdPv4FUWRmd1KG1CR9MTShnjL9kaIFv5zYSy9oQZL/wWR4pX3wXV53tD6P42higSrad7wAFV2GanDDBEMNXm7x5o0bvwzNRUMobW9SnYy2wmTIFjQNyHovDWuXLaafMfv4yl59dv1mw6GJkOG6wyHPOEx8auoyQFRU5C3aTzS8gG0AJMW7uwwjSz/sh5sr5pqNu99GOx1ZVANySwKU+Lgjp0P6AKg1uluicsZc/aIFV7ulp+9raz/MXVmTfMOiobbAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBTjkI1VhBb9cYdl70SJH8tdOV847DAdBgNVHQ4EFgQU45CNVYQW/XGHZe9EiR/LXTlfOOwwDQYJKoZIhvcNAQELBQADggEBAGafeWghsVmVEo6/QGgBRW/hhVWq4MEfW5YOLwmNObpJL3/OEKhUDw9u9to1kWcos/aRj4u+bz3vTqIJxK+i0dEBIo///mkxJhtLLGd6Ks6rXlGgEOG1+m8GvZkUsLOaZsPAFYAgnF091iS7PcNW5VYqvpFvIWgIEVwhE0dBGCUogoBatYZyc+YqWCqbzv8mhui3NgToGoiLW1dFxXbeyeGGee5yyroSDE+6jTbMCzrdX/2fK41J2lOL3Ap/IYtHltCTKIOmlToq6uG2qSyeYGLL63bYo+4ZvpHyjN/5QYQQXS4WMyPw5o9+jcIyONNOEbJoiFUTwsm55A0diDisDlk=","attributes":{"enabled":true,"nbf":1593090033,"exp":1624626633,"created":1593090633,"updated":1593090633,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-0/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1593090618,"updated":1593090618}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-0/pending"}}, [
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
  '3607a9a3-1acd-432c-8d43-193c99933d59',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 13:10:35 GMT',
  'Content-Length',
  '2970'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-0')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-0"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '178',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'b8a05aa4-f398-4dd8-8c3a-b1fe32150205',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 13:10:35 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-0')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-0"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '178',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'c31c2e42-474a-4caa-ae9e-c78bffa59967',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 13:10:35 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistcertificatesbypage-4892663737593751')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistcertificatesbypage-4892663737593751"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '146',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '497247b2-418e-4b2f-a9c9-95dc4ad28902',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 13:10:36 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-0')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-0"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '178',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'e066cd5d-c7e2-4677-bbf3-ee1bf2e6a0b8',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 13:10:37 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistcertificatesbypage-4892663737593751')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistcertificatesbypage-4892663737593751"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '146',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'a1fb75e8-fe4e-47a5-a8fe-5bdfa8c96dd7',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 13:10:38 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-0')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-0"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '178',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'dd8d6178-bf07-4ded-b64a-b0fbf6bd50c2',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 13:10:39 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistcertificatesbypage-4892663737593751')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistcertificatesbypage-4892663737593751"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '146',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '163c57ef-4385-46c7-9911-15cf40d4d21b',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 13:10:40 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-0')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-0"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '178',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '2107b560-d7c2-42bc-89a6-2b3bf4cab654',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 13:10:41 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistcertificatesbypage-4892663737593751')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistcertificatesbypage-4892663737593751"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '146',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '44f637f5-40fa-4e66-bc1c-3a9d498585e1',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 13:10:42 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-0')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-0"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '178',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '3b5d0f73-13a7-4d39-8418-d500d3db98aa',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 13:10:43 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistcertificatesbypage-4892663737593751')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistcertificatesbypage-4892663737593751"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '146',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'a66788ea-7d30-49d5-b8e3-da04d0e30aa2',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 13:10:44 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-0')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-0"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '178',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '071b9739-97fe-45cf-9d03-ff1578cd3b87',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 13:10:45 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistcertificatesbypage-4892663737593751')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistcertificatesbypage-4892663737593751"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '146',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '147a2354-9d11-44d7-85da-a925211ef288',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 13:10:46 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-0')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-0"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '178',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '5833cc6d-a9ff-4aa6-a67c-f9a66c8da30f',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 13:10:47 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistcertificatesbypage-4892663737593751')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistcertificatesbypage-4892663737593751"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '146',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '72e0ed90-e5d3-43c6-8224-62012e19a7a2',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 13:10:48 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-0')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-0","deletedDate":1593090635,"scheduledPurgeDate":1600866635,"id":"https://keyvault_name.vault.azure.net/certificates/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-0/75f4250c57394daba25a0ccadfe7e10d","kid":"https://keyvault_name.vault.azure.net/keys/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-0/75f4250c57394daba25a0ccadfe7e10d","sid":"https://keyvault_name.vault.azure.net/secrets/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-0/75f4250c57394daba25a0ccadfe7e10d","x5t":"Yj07xp_eOJMn7HPlahwQbKs9Eg8","cer":"MIIDKDCCAhCgAwIBAgIQfDvNAzhSSh6HHUDV89pfITANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjAwNjI1MTMwMDMzWhcNMjEwNjI1MTMxMDMzWjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQChubMEV/8RtgjNYGw8CMGo6p9VssZjWulzHfnjVcemZ96eYegXh74fIDTdh+J9CK5oHd/qU4IGKR5lRkiEMw7mdPv4FUWRmd1KG1CR9MTShnjL9kaIFv5zYSy9oQZL/wWR4pX3wXV53tD6P42higSrad7wAFV2GanDDBEMNXm7x5o0bvwzNRUMobW9SnYy2wmTIFjQNyHovDWuXLaafMfv4yl59dv1mw6GJkOG6wyHPOEx8auoyQFRU5C3aTzS8gG0AJMW7uwwjSz/sh5sr5pqNu99GOx1ZVANySwKU+Lgjp0P6AKg1uluicsZc/aIFV7ulp+9raz/MXVmTfMOiobbAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBTjkI1VhBb9cYdl70SJH8tdOV847DAdBgNVHQ4EFgQU45CNVYQW/XGHZe9EiR/LXTlfOOwwDQYJKoZIhvcNAQELBQADggEBAGafeWghsVmVEo6/QGgBRW/hhVWq4MEfW5YOLwmNObpJL3/OEKhUDw9u9to1kWcos/aRj4u+bz3vTqIJxK+i0dEBIo///mkxJhtLLGd6Ks6rXlGgEOG1+m8GvZkUsLOaZsPAFYAgnF091iS7PcNW5VYqvpFvIWgIEVwhE0dBGCUogoBatYZyc+YqWCqbzv8mhui3NgToGoiLW1dFxXbeyeGGee5yyroSDE+6jTbMCzrdX/2fK41J2lOL3Ap/IYtHltCTKIOmlToq6uG2qSyeYGLL63bYo+4ZvpHyjN/5QYQQXS4WMyPw5o9+jcIyONNOEbJoiFUTwsm55A0diDisDlk=","attributes":{"enabled":true,"nbf":1593090033,"exp":1624626633,"created":1593090633,"updated":1593090633,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-0/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1593090618,"updated":1593090618}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-0/pending"}}, [
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
  'b98b384e-dc85-4abc-8e81-fabd20e647a6',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 13:10:49 GMT',
  'Content-Length',
  '2970'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedcertificates/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-0')
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
  '35ae4a68-0518-4ca8-b47b-06f00ad57ba2',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 13:10:49 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/certificates/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-1')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-1","deletedDate":1593090649,"scheduledPurgeDate":1600866649,"id":"https://keyvault_name.vault.azure.net/certificates/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-1/5763951a48df4d098a7a0211306feb0e","kid":"https://keyvault_name.vault.azure.net/keys/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-1/5763951a48df4d098a7a0211306feb0e","sid":"https://keyvault_name.vault.azure.net/secrets/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-1/5763951a48df4d098a7a0211306feb0e","x5t":"Yj07xp_eOJMn7HPlahwQbKs9Eg8","cer":"MIIDKDCCAhCgAwIBAgIQfDvNAzhSSh6HHUDV89pfITANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjAwNjI1MTMwMDMzWhcNMjEwNjI1MTMxMDMzWjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQChubMEV/8RtgjNYGw8CMGo6p9VssZjWulzHfnjVcemZ96eYegXh74fIDTdh+J9CK5oHd/qU4IGKR5lRkiEMw7mdPv4FUWRmd1KG1CR9MTShnjL9kaIFv5zYSy9oQZL/wWR4pX3wXV53tD6P42higSrad7wAFV2GanDDBEMNXm7x5o0bvwzNRUMobW9SnYy2wmTIFjQNyHovDWuXLaafMfv4yl59dv1mw6GJkOG6wyHPOEx8auoyQFRU5C3aTzS8gG0AJMW7uwwjSz/sh5sr5pqNu99GOx1ZVANySwKU+Lgjp0P6AKg1uluicsZc/aIFV7ulp+9raz/MXVmTfMOiobbAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBTjkI1VhBb9cYdl70SJH8tdOV847DAdBgNVHQ4EFgQU45CNVYQW/XGHZe9EiR/LXTlfOOwwDQYJKoZIhvcNAQELBQADggEBAGafeWghsVmVEo6/QGgBRW/hhVWq4MEfW5YOLwmNObpJL3/OEKhUDw9u9to1kWcos/aRj4u+bz3vTqIJxK+i0dEBIo///mkxJhtLLGd6Ks6rXlGgEOG1+m8GvZkUsLOaZsPAFYAgnF091iS7PcNW5VYqvpFvIWgIEVwhE0dBGCUogoBatYZyc+YqWCqbzv8mhui3NgToGoiLW1dFxXbeyeGGee5yyroSDE+6jTbMCzrdX/2fK41J2lOL3Ap/IYtHltCTKIOmlToq6uG2qSyeYGLL63bYo+4ZvpHyjN/5QYQQXS4WMyPw5o9+jcIyONNOEbJoiFUTwsm55A0diDisDlk=","attributes":{"enabled":true,"nbf":1593090033,"exp":1624626633,"created":1593090634,"updated":1593090634,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-1/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"CN=MyCert","ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":13,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"EmailContacts"}}],"issuer":{"name":"Unknown"},"attributes":{"enabled":true,"created":1593090634,"updated":1593090634}}}, [
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
  'dcc686eb-7b24-42e2-a502-594ac9cae8e2',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 13:10:49 GMT',
  'Content-Length',
  '2789'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-1')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-1"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '178',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'e13c8702-2235-4990-ae17-12d22e403c9b',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 13:10:49 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-1')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-1"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '178',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '438bb9c9-b37e-416c-9000-75b88acf76f3',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 13:10:49 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistcertificatesbypage-4892663737593751')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistcertificatesbypage-4892663737593751"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '146',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'e2ebd8fa-7780-4ab8-a9a1-57d550a03ad4',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 13:10:50 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-1')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-1"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '178',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '74946bf5-f0e1-4237-89d8-71b6aef40dfb',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 13:10:51 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistcertificatesbypage-4892663737593751')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistcertificatesbypage-4892663737593751"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '146',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'c742db96-2bf4-4c21-9af6-c50f85eef447',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 13:10:53 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-1')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-1"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '178',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '57f1d8a2-7eba-4692-aac2-6995c4be6f69',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 13:10:53 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistcertificatesbypage-4892663737593751')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistcertificatesbypage-4892663737593751"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '146',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '7b4bab16-a9ba-4573-9bb1-5a1a10f001bf',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 13:10:55 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-1')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-1"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '178',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '150ea2b8-0bc6-4e99-bfc7-dc9349f9e557',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 13:10:56 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistcertificatesbypage-4892663737593751')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistcertificatesbypage-4892663737593751"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '146',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '16034f2f-caf5-4e79-9360-17da72c54e48',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 13:10:57 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-1')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-1"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '178',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'e1ad02b3-1a12-4454-88a0-3d456ea11c4c',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 13:10:58 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistcertificatesbypage-4892663737593751')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistcertificatesbypage-4892663737593751"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '146',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '99a9e454-00b0-4879-86ac-1e114ac61ef5',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 13:10:59 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-1')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-1"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '178',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'db9a884f-eb9a-46c6-822a-e79d63857245',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 13:10:59 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistcertificatesbypage-4892663737593751')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistcertificatesbypage-4892663737593751"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '146',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '9402aee1-2c2f-43f3-85fc-fd9edb34715c',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 13:11:01 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-1')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-1"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '178',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '054e6b6d-e796-44cc-8a0f-d7a3203b379c',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 13:11:01 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistcertificatesbypage-4892663737593751')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistcertificatesbypage-4892663737593751"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '146',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '4277687c-61d0-48d7-a0b8-022a4da14655',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 13:11:02 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-1')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-1"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '178',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '00b873f6-6b1e-4ac9-b73a-84f1294d1693',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 13:11:03 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistcertificatesbypage-4892663737593751')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistcertificatesbypage-4892663737593751"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '146',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '4a69a3c1-afe3-45fb-b3ad-9abc13d73384',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 13:11:04 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-1')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-1"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '178',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'd85db74a-d650-43bd-918d-214669eb98c8',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 13:11:05 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistcertificatesbypage-4892663737593751')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistcertificatesbypage-4892663737593751"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '146',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'a2b1727b-e790-4ea0-8158-6aa83dd597f9',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 13:11:06 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-1')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-1","deletedDate":1593090649,"scheduledPurgeDate":1600866649,"id":"https://keyvault_name.vault.azure.net/certificates/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-1/5763951a48df4d098a7a0211306feb0e","kid":"https://keyvault_name.vault.azure.net/keys/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-1/5763951a48df4d098a7a0211306feb0e","sid":"https://keyvault_name.vault.azure.net/secrets/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-1/5763951a48df4d098a7a0211306feb0e","x5t":"Yj07xp_eOJMn7HPlahwQbKs9Eg8","cer":"MIIDKDCCAhCgAwIBAgIQfDvNAzhSSh6HHUDV89pfITANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjAwNjI1MTMwMDMzWhcNMjEwNjI1MTMxMDMzWjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQChubMEV/8RtgjNYGw8CMGo6p9VssZjWulzHfnjVcemZ96eYegXh74fIDTdh+J9CK5oHd/qU4IGKR5lRkiEMw7mdPv4FUWRmd1KG1CR9MTShnjL9kaIFv5zYSy9oQZL/wWR4pX3wXV53tD6P42higSrad7wAFV2GanDDBEMNXm7x5o0bvwzNRUMobW9SnYy2wmTIFjQNyHovDWuXLaafMfv4yl59dv1mw6GJkOG6wyHPOEx8auoyQFRU5C3aTzS8gG0AJMW7uwwjSz/sh5sr5pqNu99GOx1ZVANySwKU+Lgjp0P6AKg1uluicsZc/aIFV7ulp+9raz/MXVmTfMOiobbAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBTjkI1VhBb9cYdl70SJH8tdOV847DAdBgNVHQ4EFgQU45CNVYQW/XGHZe9EiR/LXTlfOOwwDQYJKoZIhvcNAQELBQADggEBAGafeWghsVmVEo6/QGgBRW/hhVWq4MEfW5YOLwmNObpJL3/OEKhUDw9u9to1kWcos/aRj4u+bz3vTqIJxK+i0dEBIo///mkxJhtLLGd6Ks6rXlGgEOG1+m8GvZkUsLOaZsPAFYAgnF091iS7PcNW5VYqvpFvIWgIEVwhE0dBGCUogoBatYZyc+YqWCqbzv8mhui3NgToGoiLW1dFxXbeyeGGee5yyroSDE+6jTbMCzrdX/2fK41J2lOL3Ap/IYtHltCTKIOmlToq6uG2qSyeYGLL63bYo+4ZvpHyjN/5QYQQXS4WMyPw5o9+jcIyONNOEbJoiFUTwsm55A0diDisDlk=","attributes":{"enabled":true,"nbf":1593090033,"exp":1624626633,"created":1593090634,"updated":1593090634,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-1/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"CN=MyCert","ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":13,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"EmailContacts"}}],"issuer":{"name":"Unknown"},"attributes":{"enabled":true,"created":1593090634,"updated":1593090634}}}, [
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
  '5fd2a364-466a-4b12-90f4-855038732f09',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 13:11:08 GMT',
  'Content-Length',
  '2789'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedcertificates/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-1')
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
  'ef80f06b-d695-4f00-8f04-e4f6a1d386ea',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 13:11:08 GMT'
]);

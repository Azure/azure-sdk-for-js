let nock = require('nock');

module.exports.hash = "4516d5e44da484f1c640d285850ff50b";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0/create')
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
  'c9611bb8-d653-473f-a21b-ace3a18b24d1',
  'x-ms-keyvault-service-version',
  '1.1.5.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.18.165;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 26 May 2020 13:05:27 GMT'
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
  'a1fd9e87-6bad-4040-a848-32821cad1201',
  'x-ms-ests-server',
  '2.1.10571.11 - SCUS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AgJKe1UKgWVEsv_pX9yoPk0_aSJHAQAAABcLX9YOAAAA; expires=Thu, 25-Jun-2020 13:05:27 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; SameSite=None; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; SameSite=None; secure; HttpOnly',
  'Date',
  'Tue, 26 May 2020 13:05:26 GMT',
  'Content-Length',
  '1315'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0/create', {"policy":{"key_props":{},"secret_props":{},"x509_props":{"subject":"cn=MyCert","sans":{}},"issuer":{"name":"Self"},"attributes":{}},"attributes":{}})
  .query(true)
  .reply(202, {"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAqAVOBPrWas++grk/C87hxjWY5uen9RSQEHeS13EglzQR+45oEXj4i0Fonb8uK+gjiAuMAZZYuhNd1QqC0BmlI1fOaOfoiAVndQQgGFX+MbR1Vzxml87U/S+/7v6Q9dCiXPi24pi7O9pS09rIzcS/rr9CLog9NHZ5d2tEsmZTogQIwvnu7ryYLikegRmD1vXdw+hTj/ogyIDMMqguRDIZihr/r0FeZr2bDSDe1QclNWVM3JPEjsaAnXomEyjIAQ8RdQ6Y99SSbpw/jHuMtmjVBGBUzKJkfyLFx32LYOmVKY7E7DSm4nUoTGjqQrGvFhVKVbVrROjGF3WNHvgoYEOYjQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAGIg867G9fRJ9A5OEUdiutqHaz1MZum7VhtTtvbruTS78IWMT4/BKYWhE+M7MBXWda8pgspN2SdAoc7DgiEl7sxMC7z3i902nGu+X4CfUlGQECChqliIGYg//gMAUtv04w9X7+0P4dqq4KZDtFoPNum704/AOsPB6+frXDbwulXwvFSj30Uo3/v4qvepBoyZ3U+Oetd6byVdre5fA+AZZ3KMIUf8qpE6fctrgjHCfqqMgX43dQ8inJS/yscqLlVnmr1BeyDTf7V7ig7TISznpsmB8RAHgJ2/v2ys8QXshkCB/8hTP+uWmnN6NaEXCup0nelyz7ptZ1pZ1L/jOx8nQbU=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"19373e837bd644c9ae7586056050136c"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0/pending?api-version=7.1-preview&request_id=19373e837bd644c9ae7586056050136c',
  'Retry-After',
  '10',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '9c77fbcf-219c-456e-a17a-da5a87118da2',
  'x-ms-keyvault-service-version',
  '1.1.5.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.18.165;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 26 May 2020 13:05:28 GMT',
  'Content-Length',
  '1379'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAqAVOBPrWas++grk/C87hxjWY5uen9RSQEHeS13EglzQR+45oEXj4i0Fonb8uK+gjiAuMAZZYuhNd1QqC0BmlI1fOaOfoiAVndQQgGFX+MbR1Vzxml87U/S+/7v6Q9dCiXPi24pi7O9pS09rIzcS/rr9CLog9NHZ5d2tEsmZTogQIwvnu7ryYLikegRmD1vXdw+hTj/ogyIDMMqguRDIZihr/r0FeZr2bDSDe1QclNWVM3JPEjsaAnXomEyjIAQ8RdQ6Y99SSbpw/jHuMtmjVBGBUzKJkfyLFx32LYOmVKY7E7DSm4nUoTGjqQrGvFhVKVbVrROjGF3WNHvgoYEOYjQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAGIg867G9fRJ9A5OEUdiutqHaz1MZum7VhtTtvbruTS78IWMT4/BKYWhE+M7MBXWda8pgspN2SdAoc7DgiEl7sxMC7z3i902nGu+X4CfUlGQECChqliIGYg//gMAUtv04w9X7+0P4dqq4KZDtFoPNum704/AOsPB6+frXDbwulXwvFSj30Uo3/v4qvepBoyZ3U+Oetd6byVdre5fA+AZZ3KMIUf8qpE6fctrgjHCfqqMgX43dQ8inJS/yscqLlVnmr1BeyDTf7V7ig7TISznpsmB8RAHgJ2/v2ys8QXshkCB/8hTP+uWmnN6NaEXCup0nelyz7ptZ1pZ1L/jOx8nQbU=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"19373e837bd644c9ae7586056050136c"}, [
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
  '5b67d60e-c7db-43ec-a7fa-22d8ef6b05ae',
  'x-ms-keyvault-service-version',
  '1.1.5.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.18.165;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 26 May 2020 13:05:28 GMT',
  'Content-Length',
  '1379'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAqAVOBPrWas++grk/C87hxjWY5uen9RSQEHeS13EglzQR+45oEXj4i0Fonb8uK+gjiAuMAZZYuhNd1QqC0BmlI1fOaOfoiAVndQQgGFX+MbR1Vzxml87U/S+/7v6Q9dCiXPi24pi7O9pS09rIzcS/rr9CLog9NHZ5d2tEsmZTogQIwvnu7ryYLikegRmD1vXdw+hTj/ogyIDMMqguRDIZihr/r0FeZr2bDSDe1QclNWVM3JPEjsaAnXomEyjIAQ8RdQ6Y99SSbpw/jHuMtmjVBGBUzKJkfyLFx32LYOmVKY7E7DSm4nUoTGjqQrGvFhVKVbVrROjGF3WNHvgoYEOYjQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAGIg867G9fRJ9A5OEUdiutqHaz1MZum7VhtTtvbruTS78IWMT4/BKYWhE+M7MBXWda8pgspN2SdAoc7DgiEl7sxMC7z3i902nGu+X4CfUlGQECChqliIGYg//gMAUtv04w9X7+0P4dqq4KZDtFoPNum704/AOsPB6+frXDbwulXwvFSj30Uo3/v4qvepBoyZ3U+Oetd6byVdre5fA+AZZ3KMIUf8qpE6fctrgjHCfqqMgX43dQ8inJS/yscqLlVnmr1BeyDTf7V7ig7TISznpsmB8RAHgJ2/v2ys8QXshkCB/8hTP+uWmnN6NaEXCup0nelyz7ptZ1pZ1L/jOx8nQbU=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"19373e837bd644c9ae7586056050136c"}, [
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
  '5cc4e7af-5cf6-4c22-ac7b-11113cbfc904',
  'x-ms-keyvault-service-version',
  '1.1.5.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.18.165;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 26 May 2020 13:05:28 GMT',
  'Content-Length',
  '1379'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAqAVOBPrWas++grk/C87hxjWY5uen9RSQEHeS13EglzQR+45oEXj4i0Fonb8uK+gjiAuMAZZYuhNd1QqC0BmlI1fOaOfoiAVndQQgGFX+MbR1Vzxml87U/S+/7v6Q9dCiXPi24pi7O9pS09rIzcS/rr9CLog9NHZ5d2tEsmZTogQIwvnu7ryYLikegRmD1vXdw+hTj/ogyIDMMqguRDIZihr/r0FeZr2bDSDe1QclNWVM3JPEjsaAnXomEyjIAQ8RdQ6Y99SSbpw/jHuMtmjVBGBUzKJkfyLFx32LYOmVKY7E7DSm4nUoTGjqQrGvFhVKVbVrROjGF3WNHvgoYEOYjQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAGIg867G9fRJ9A5OEUdiutqHaz1MZum7VhtTtvbruTS78IWMT4/BKYWhE+M7MBXWda8pgspN2SdAoc7DgiEl7sxMC7z3i902nGu+X4CfUlGQECChqliIGYg//gMAUtv04w9X7+0P4dqq4KZDtFoPNum704/AOsPB6+frXDbwulXwvFSj30Uo3/v4qvepBoyZ3U+Oetd6byVdre5fA+AZZ3KMIUf8qpE6fctrgjHCfqqMgX43dQ8inJS/yscqLlVnmr1BeyDTf7V7ig7TISznpsmB8RAHgJ2/v2ys8QXshkCB/8hTP+uWmnN6NaEXCup0nelyz7ptZ1pZ1L/jOx8nQbU=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"19373e837bd644c9ae7586056050136c"}, [
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
  '6bc4a4ba-06bc-487f-a778-d58e6da38cc0',
  'x-ms-keyvault-service-version',
  '1.1.5.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.18.165;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 26 May 2020 13:05:30 GMT',
  'Content-Length',
  '1379'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAqAVOBPrWas++grk/C87hxjWY5uen9RSQEHeS13EglzQR+45oEXj4i0Fonb8uK+gjiAuMAZZYuhNd1QqC0BmlI1fOaOfoiAVndQQgGFX+MbR1Vzxml87U/S+/7v6Q9dCiXPi24pi7O9pS09rIzcS/rr9CLog9NHZ5d2tEsmZTogQIwvnu7ryYLikegRmD1vXdw+hTj/ogyIDMMqguRDIZihr/r0FeZr2bDSDe1QclNWVM3JPEjsaAnXomEyjIAQ8RdQ6Y99SSbpw/jHuMtmjVBGBUzKJkfyLFx32LYOmVKY7E7DSm4nUoTGjqQrGvFhVKVbVrROjGF3WNHvgoYEOYjQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAGIg867G9fRJ9A5OEUdiutqHaz1MZum7VhtTtvbruTS78IWMT4/BKYWhE+M7MBXWda8pgspN2SdAoc7DgiEl7sxMC7z3i902nGu+X4CfUlGQECChqliIGYg//gMAUtv04w9X7+0P4dqq4KZDtFoPNum704/AOsPB6+frXDbwulXwvFSj30Uo3/v4qvepBoyZ3U+Oetd6byVdre5fA+AZZ3KMIUf8qpE6fctrgjHCfqqMgX43dQ8inJS/yscqLlVnmr1BeyDTf7V7ig7TISznpsmB8RAHgJ2/v2ys8QXshkCB/8hTP+uWmnN6NaEXCup0nelyz7ptZ1pZ1L/jOx8nQbU=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"19373e837bd644c9ae7586056050136c"}, [
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
  'a436f912-5f5a-4322-af8a-068fdd7d619a',
  'x-ms-keyvault-service-version',
  '1.1.5.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.18.165;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 26 May 2020 13:05:32 GMT',
  'Content-Length',
  '1379'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAqAVOBPrWas++grk/C87hxjWY5uen9RSQEHeS13EglzQR+45oEXj4i0Fonb8uK+gjiAuMAZZYuhNd1QqC0BmlI1fOaOfoiAVndQQgGFX+MbR1Vzxml87U/S+/7v6Q9dCiXPi24pi7O9pS09rIzcS/rr9CLog9NHZ5d2tEsmZTogQIwvnu7ryYLikegRmD1vXdw+hTj/ogyIDMMqguRDIZihr/r0FeZr2bDSDe1QclNWVM3JPEjsaAnXomEyjIAQ8RdQ6Y99SSbpw/jHuMtmjVBGBUzKJkfyLFx32LYOmVKY7E7DSm4nUoTGjqQrGvFhVKVbVrROjGF3WNHvgoYEOYjQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAGIg867G9fRJ9A5OEUdiutqHaz1MZum7VhtTtvbruTS78IWMT4/BKYWhE+M7MBXWda8pgspN2SdAoc7DgiEl7sxMC7z3i902nGu+X4CfUlGQECChqliIGYg//gMAUtv04w9X7+0P4dqq4KZDtFoPNum704/AOsPB6+frXDbwulXwvFSj30Uo3/v4qvepBoyZ3U+Oetd6byVdre5fA+AZZ3KMIUf8qpE6fctrgjHCfqqMgX43dQ8inJS/yscqLlVnmr1BeyDTf7V7ig7TISznpsmB8RAHgJ2/v2ys8QXshkCB/8hTP+uWmnN6NaEXCup0nelyz7ptZ1pZ1L/jOx8nQbU=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"19373e837bd644c9ae7586056050136c"}, [
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
  '00f8a011-2882-4739-8fb4-2272f5ffb922',
  'x-ms-keyvault-service-version',
  '1.1.5.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.18.165;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 26 May 2020 13:05:34 GMT',
  'Content-Length',
  '1379'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAqAVOBPrWas++grk/C87hxjWY5uen9RSQEHeS13EglzQR+45oEXj4i0Fonb8uK+gjiAuMAZZYuhNd1QqC0BmlI1fOaOfoiAVndQQgGFX+MbR1Vzxml87U/S+/7v6Q9dCiXPi24pi7O9pS09rIzcS/rr9CLog9NHZ5d2tEsmZTogQIwvnu7ryYLikegRmD1vXdw+hTj/ogyIDMMqguRDIZihr/r0FeZr2bDSDe1QclNWVM3JPEjsaAnXomEyjIAQ8RdQ6Y99SSbpw/jHuMtmjVBGBUzKJkfyLFx32LYOmVKY7E7DSm4nUoTGjqQrGvFhVKVbVrROjGF3WNHvgoYEOYjQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAGIg867G9fRJ9A5OEUdiutqHaz1MZum7VhtTtvbruTS78IWMT4/BKYWhE+M7MBXWda8pgspN2SdAoc7DgiEl7sxMC7z3i902nGu+X4CfUlGQECChqliIGYg//gMAUtv04w9X7+0P4dqq4KZDtFoPNum704/AOsPB6+frXDbwulXwvFSj30Uo3/v4qvepBoyZ3U+Oetd6byVdre5fA+AZZ3KMIUf8qpE6fctrgjHCfqqMgX43dQ8inJS/yscqLlVnmr1BeyDTf7V7ig7TISznpsmB8RAHgJ2/v2ys8QXshkCB/8hTP+uWmnN6NaEXCup0nelyz7ptZ1pZ1L/jOx8nQbU=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"19373e837bd644c9ae7586056050136c"}, [
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
  '5d50de6c-b6d5-4d89-8a6c-b58a1e67420b',
  'x-ms-keyvault-service-version',
  '1.1.5.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.18.165;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 26 May 2020 13:05:36 GMT',
  'Content-Length',
  '1379'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAqAVOBPrWas++grk/C87hxjWY5uen9RSQEHeS13EglzQR+45oEXj4i0Fonb8uK+gjiAuMAZZYuhNd1QqC0BmlI1fOaOfoiAVndQQgGFX+MbR1Vzxml87U/S+/7v6Q9dCiXPi24pi7O9pS09rIzcS/rr9CLog9NHZ5d2tEsmZTogQIwvnu7ryYLikegRmD1vXdw+hTj/ogyIDMMqguRDIZihr/r0FeZr2bDSDe1QclNWVM3JPEjsaAnXomEyjIAQ8RdQ6Y99SSbpw/jHuMtmjVBGBUzKJkfyLFx32LYOmVKY7E7DSm4nUoTGjqQrGvFhVKVbVrROjGF3WNHvgoYEOYjQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAGIg867G9fRJ9A5OEUdiutqHaz1MZum7VhtTtvbruTS78IWMT4/BKYWhE+M7MBXWda8pgspN2SdAoc7DgiEl7sxMC7z3i902nGu+X4CfUlGQECChqliIGYg//gMAUtv04w9X7+0P4dqq4KZDtFoPNum704/AOsPB6+frXDbwulXwvFSj30Uo3/v4qvepBoyZ3U+Oetd6byVdre5fA+AZZ3KMIUf8qpE6fctrgjHCfqqMgX43dQ8inJS/yscqLlVnmr1BeyDTf7V7ig7TISznpsmB8RAHgJ2/v2ys8QXshkCB/8hTP+uWmnN6NaEXCup0nelyz7ptZ1pZ1L/jOx8nQbU=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"19373e837bd644c9ae7586056050136c"}, [
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
  'd515ee96-8a31-4c26-ab8b-bd93b9f4f6c6',
  'x-ms-keyvault-service-version',
  '1.1.5.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.18.165;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 26 May 2020 13:05:39 GMT',
  'Content-Length',
  '1379'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAqAVOBPrWas++grk/C87hxjWY5uen9RSQEHeS13EglzQR+45oEXj4i0Fonb8uK+gjiAuMAZZYuhNd1QqC0BmlI1fOaOfoiAVndQQgGFX+MbR1Vzxml87U/S+/7v6Q9dCiXPi24pi7O9pS09rIzcS/rr9CLog9NHZ5d2tEsmZTogQIwvnu7ryYLikegRmD1vXdw+hTj/ogyIDMMqguRDIZihr/r0FeZr2bDSDe1QclNWVM3JPEjsaAnXomEyjIAQ8RdQ6Y99SSbpw/jHuMtmjVBGBUzKJkfyLFx32LYOmVKY7E7DSm4nUoTGjqQrGvFhVKVbVrROjGF3WNHvgoYEOYjQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAGIg867G9fRJ9A5OEUdiutqHaz1MZum7VhtTtvbruTS78IWMT4/BKYWhE+M7MBXWda8pgspN2SdAoc7DgiEl7sxMC7z3i902nGu+X4CfUlGQECChqliIGYg//gMAUtv04w9X7+0P4dqq4KZDtFoPNum704/AOsPB6+frXDbwulXwvFSj30Uo3/v4qvepBoyZ3U+Oetd6byVdre5fA+AZZ3KMIUf8qpE6fctrgjHCfqqMgX43dQ8inJS/yscqLlVnmr1BeyDTf7V7ig7TISznpsmB8RAHgJ2/v2ys8QXshkCB/8hTP+uWmnN6NaEXCup0nelyz7ptZ1pZ1L/jOx8nQbU=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"19373e837bd644c9ae7586056050136c"}, [
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
  'bdee8445-6c0f-431d-85c2-2b56c4188a1e',
  'x-ms-keyvault-service-version',
  '1.1.5.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.18.165;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 26 May 2020 13:05:40 GMT',
  'Content-Length',
  '1379'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAqAVOBPrWas++grk/C87hxjWY5uen9RSQEHeS13EglzQR+45oEXj4i0Fonb8uK+gjiAuMAZZYuhNd1QqC0BmlI1fOaOfoiAVndQQgGFX+MbR1Vzxml87U/S+/7v6Q9dCiXPi24pi7O9pS09rIzcS/rr9CLog9NHZ5d2tEsmZTogQIwvnu7ryYLikegRmD1vXdw+hTj/ogyIDMMqguRDIZihr/r0FeZr2bDSDe1QclNWVM3JPEjsaAnXomEyjIAQ8RdQ6Y99SSbpw/jHuMtmjVBGBUzKJkfyLFx32LYOmVKY7E7DSm4nUoTGjqQrGvFhVKVbVrROjGF3WNHvgoYEOYjQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAGIg867G9fRJ9A5OEUdiutqHaz1MZum7VhtTtvbruTS78IWMT4/BKYWhE+M7MBXWda8pgspN2SdAoc7DgiEl7sxMC7z3i902nGu+X4CfUlGQECChqliIGYg//gMAUtv04w9X7+0P4dqq4KZDtFoPNum704/AOsPB6+frXDbwulXwvFSj30Uo3/v4qvepBoyZ3U+Oetd6byVdre5fA+AZZ3KMIUf8qpE6fctrgjHCfqqMgX43dQ8inJS/yscqLlVnmr1BeyDTf7V7ig7TISznpsmB8RAHgJ2/v2ys8QXshkCB/8hTP+uWmnN6NaEXCup0nelyz7ptZ1pZ1L/jOx8nQbU=","cancellation_requested":false,"status":"completed","target":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0","request_id":"19373e837bd644c9ae7586056050136c"}, [
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
  'd5dd5a6e-a9b6-4865-8d30-6c96d05e66a2',
  'x-ms-keyvault-service-version',
  '1.1.5.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.18.165;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 26 May 2020 13:05:42 GMT',
  'Content-Length',
  '1385'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0/')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0/4542684ff47d40df9c8a48adc9122af7","kid":"https://keyvault_name.vault.azure.net/keys/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0/4542684ff47d40df9c8a48adc9122af7","sid":"https://keyvault_name.vault.azure.net/secrets/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0/4542684ff47d40df9c8a48adc9122af7","x5t":"43rtUzoB5-XjM4OfzoFvl1SHifk","cer":"MIIDKDCCAhCgAwIBAgIQYDvv1usIRROW7T9hRX8FeTANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjAwNTI2MTI1NTQyWhcNMjEwNTI2MTMwNTQyWjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQCoBU4E+tZqz76CuT8LzuHGNZjm56f1FJAQd5LXcSCXNBH7jmgRePiLQWidvy4r6COIC4wBlli6E13VCoLQGaUjV85o5+iIBWd1BCAYVf4xtHVXPGaXztT9L7/u/pD10KJc+LbimLs72lLT2sjNxL+uv0IuiD00dnl3a0SyZlOiBAjC+e7uvJguKR6BGYPW9d3D6FOP+iDIgMwyqC5EMhmKGv+vQV5mvZsNIN7VByU1ZUzck8SOxoCdeiYTKMgBDxF1Dpj31JJunD+Me4y2aNUEYFTMomR/IsXHfYtg6ZUpjsTsNKbidShMaOpCsa8WFUpVtWtE6MYXdY0e+ChgQ5iNAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBQYs0ck9Zo6ji/eTNa3rHzpGfMAOzAdBgNVHQ4EFgQUGLNHJPWaOo4v3kzWt6x86RnzADswDQYJKoZIhvcNAQELBQADggEBAHNvQKCDuDk2QWfHeGnvgtGADuy5japSXIDPYynE3Vd/f3Hvv4G0cfyH7oALpc+6myd1Kka/lUAFtkQHXpkWaFtuDv1FEqqXRzzOQU+Rh5siLnUQC8zVbZ2//PvwXOTccArwwpBef4h+esj+iIgGy94W5vdgI2I3IG0UId8OYf1GMDsfFHXeaVKs9aj4nFy5k41xttD3+2TqpgJQbddrDd6mIMAeX8wzjkYyPyZVwLQCKPfDRwBJGmBQd0wHE3HZXBQ0TI0z+LtlFBkgG7ZULH0dlrrcqQWuKdA3pWi0bozXQrWDwndKUhz9bz68DpPQXmtgt2jjkBIYNYRMlIfYp+4=","attributes":{"enabled":true,"nbf":1590497742,"exp":1622034342,"created":1590498342,"updated":1590498342,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1590498328,"updated":1590498328}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0/pending"}}, [
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
  '11ea2927-f5e6-4255-9149-db7971c3f4f7',
  'x-ms-keyvault-service-version',
  '1.1.5.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.18.165;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 26 May 2020 13:05:42 GMT',
  'Content-Length',
  '2785'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1/create', {"policy":{"key_props":{},"secret_props":{},"x509_props":{"subject":"cn=MyCert","sans":{}},"issuer":{"name":"Self"},"attributes":{}},"attributes":{}})
  .query(true)
  .reply(202, {"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAyd0r3J8MCXfXaPS4qzfwo2WEBy9z4SP6kDwa/ohX5PiklthsN7SKE+CVQP20RPC2hZm3LYIT1hgdSi9oHxI3Ln7NzdmejKciN3Dn9ffueO9+zwC5iEi7W7CMWrKwOshJFhf/ZKKEJqcF83d8NDzpWjLesoeUSCR/NwwL329P4HUzNTS0hUV4kiRMD0/wuTISssT/zoqSXEx7P57yYLX0AM1WWgvHEaFqSYjjxY1Z4B3FysPE19iWs/nUGbVbogUWePLqy/X2smeFCTh7z/aAXM5FcawSF3GddMxpDERUkYLKNVNmKkWAgL1XVCk/1IQI5Nxy6qBLxZ1pY7OEsmKCLQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBABhObNnvZ20L4ikwo3m4+QGqnFX/Oa1p/mjnNi7d24U7Tcm6LV46KW28EBHEzqe15K2BugTrqNmumVT1GVnXMJjIqyECAn2rXZTrPzmonXeGSyNJLx8IVTfn1vBwm1nxLJA61PLMBjwZbbbVo4ECkpAcxU15F0cExI52cBgEL6tNKQ+PzObphycPAaipQoUvBNCyqTSNqf9A3M6rp/skEnbfOz8K56pap1JRHwlmoN3teWLHqcOhED0iD48A+vzPJXc6rTjW4luMt5ywzWWOICqjzAvJUsxTApORPtvt8rJYsFA2JqbzKHOWfHt0ZmRmtZ4thWlVVP2ig2izHUA9XuI=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"db142cbd5c474b39b160af8748d4126d"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1/pending?api-version=7.1-preview&request_id=db142cbd5c474b39b160af8748d4126d',
  'Retry-After',
  '10',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '100e1b7c-cb10-4b5a-844f-c40107593e06',
  'x-ms-keyvault-service-version',
  '1.1.5.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.18.165;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 26 May 2020 13:05:43 GMT',
  'Content-Length',
  '1379'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAyd0r3J8MCXfXaPS4qzfwo2WEBy9z4SP6kDwa/ohX5PiklthsN7SKE+CVQP20RPC2hZm3LYIT1hgdSi9oHxI3Ln7NzdmejKciN3Dn9ffueO9+zwC5iEi7W7CMWrKwOshJFhf/ZKKEJqcF83d8NDzpWjLesoeUSCR/NwwL329P4HUzNTS0hUV4kiRMD0/wuTISssT/zoqSXEx7P57yYLX0AM1WWgvHEaFqSYjjxY1Z4B3FysPE19iWs/nUGbVbogUWePLqy/X2smeFCTh7z/aAXM5FcawSF3GddMxpDERUkYLKNVNmKkWAgL1XVCk/1IQI5Nxy6qBLxZ1pY7OEsmKCLQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBABhObNnvZ20L4ikwo3m4+QGqnFX/Oa1p/mjnNi7d24U7Tcm6LV46KW28EBHEzqe15K2BugTrqNmumVT1GVnXMJjIqyECAn2rXZTrPzmonXeGSyNJLx8IVTfn1vBwm1nxLJA61PLMBjwZbbbVo4ECkpAcxU15F0cExI52cBgEL6tNKQ+PzObphycPAaipQoUvBNCyqTSNqf9A3M6rp/skEnbfOz8K56pap1JRHwlmoN3teWLHqcOhED0iD48A+vzPJXc6rTjW4luMt5ywzWWOICqjzAvJUsxTApORPtvt8rJYsFA2JqbzKHOWfHt0ZmRmtZ4thWlVVP2ig2izHUA9XuI=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"db142cbd5c474b39b160af8748d4126d"}, [
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
  'f130abdd-bab1-4c71-bebb-347319abd5d4',
  'x-ms-keyvault-service-version',
  '1.1.5.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.18.165;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 26 May 2020 13:05:43 GMT',
  'Content-Length',
  '1379'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAyd0r3J8MCXfXaPS4qzfwo2WEBy9z4SP6kDwa/ohX5PiklthsN7SKE+CVQP20RPC2hZm3LYIT1hgdSi9oHxI3Ln7NzdmejKciN3Dn9ffueO9+zwC5iEi7W7CMWrKwOshJFhf/ZKKEJqcF83d8NDzpWjLesoeUSCR/NwwL329P4HUzNTS0hUV4kiRMD0/wuTISssT/zoqSXEx7P57yYLX0AM1WWgvHEaFqSYjjxY1Z4B3FysPE19iWs/nUGbVbogUWePLqy/X2smeFCTh7z/aAXM5FcawSF3GddMxpDERUkYLKNVNmKkWAgL1XVCk/1IQI5Nxy6qBLxZ1pY7OEsmKCLQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBABhObNnvZ20L4ikwo3m4+QGqnFX/Oa1p/mjnNi7d24U7Tcm6LV46KW28EBHEzqe15K2BugTrqNmumVT1GVnXMJjIqyECAn2rXZTrPzmonXeGSyNJLx8IVTfn1vBwm1nxLJA61PLMBjwZbbbVo4ECkpAcxU15F0cExI52cBgEL6tNKQ+PzObphycPAaipQoUvBNCyqTSNqf9A3M6rp/skEnbfOz8K56pap1JRHwlmoN3teWLHqcOhED0iD48A+vzPJXc6rTjW4luMt5ywzWWOICqjzAvJUsxTApORPtvt8rJYsFA2JqbzKHOWfHt0ZmRmtZ4thWlVVP2ig2izHUA9XuI=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"db142cbd5c474b39b160af8748d4126d"}, [
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
  '03baf0e8-cdaf-4879-9c6a-1ed34c16d3ca',
  'x-ms-keyvault-service-version',
  '1.1.5.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.18.165;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 26 May 2020 13:05:43 GMT',
  'Content-Length',
  '1379'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAyd0r3J8MCXfXaPS4qzfwo2WEBy9z4SP6kDwa/ohX5PiklthsN7SKE+CVQP20RPC2hZm3LYIT1hgdSi9oHxI3Ln7NzdmejKciN3Dn9ffueO9+zwC5iEi7W7CMWrKwOshJFhf/ZKKEJqcF83d8NDzpWjLesoeUSCR/NwwL329P4HUzNTS0hUV4kiRMD0/wuTISssT/zoqSXEx7P57yYLX0AM1WWgvHEaFqSYjjxY1Z4B3FysPE19iWs/nUGbVbogUWePLqy/X2smeFCTh7z/aAXM5FcawSF3GddMxpDERUkYLKNVNmKkWAgL1XVCk/1IQI5Nxy6qBLxZ1pY7OEsmKCLQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBABhObNnvZ20L4ikwo3m4+QGqnFX/Oa1p/mjnNi7d24U7Tcm6LV46KW28EBHEzqe15K2BugTrqNmumVT1GVnXMJjIqyECAn2rXZTrPzmonXeGSyNJLx8IVTfn1vBwm1nxLJA61PLMBjwZbbbVo4ECkpAcxU15F0cExI52cBgEL6tNKQ+PzObphycPAaipQoUvBNCyqTSNqf9A3M6rp/skEnbfOz8K56pap1JRHwlmoN3teWLHqcOhED0iD48A+vzPJXc6rTjW4luMt5ywzWWOICqjzAvJUsxTApORPtvt8rJYsFA2JqbzKHOWfHt0ZmRmtZ4thWlVVP2ig2izHUA9XuI=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"db142cbd5c474b39b160af8748d4126d"}, [
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
  '8499a157-c604-4b77-962f-44dbd01160c6',
  'x-ms-keyvault-service-version',
  '1.1.5.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.18.165;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 26 May 2020 13:05:45 GMT',
  'Content-Length',
  '1379'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAyd0r3J8MCXfXaPS4qzfwo2WEBy9z4SP6kDwa/ohX5PiklthsN7SKE+CVQP20RPC2hZm3LYIT1hgdSi9oHxI3Ln7NzdmejKciN3Dn9ffueO9+zwC5iEi7W7CMWrKwOshJFhf/ZKKEJqcF83d8NDzpWjLesoeUSCR/NwwL329P4HUzNTS0hUV4kiRMD0/wuTISssT/zoqSXEx7P57yYLX0AM1WWgvHEaFqSYjjxY1Z4B3FysPE19iWs/nUGbVbogUWePLqy/X2smeFCTh7z/aAXM5FcawSF3GddMxpDERUkYLKNVNmKkWAgL1XVCk/1IQI5Nxy6qBLxZ1pY7OEsmKCLQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBABhObNnvZ20L4ikwo3m4+QGqnFX/Oa1p/mjnNi7d24U7Tcm6LV46KW28EBHEzqe15K2BugTrqNmumVT1GVnXMJjIqyECAn2rXZTrPzmonXeGSyNJLx8IVTfn1vBwm1nxLJA61PLMBjwZbbbVo4ECkpAcxU15F0cExI52cBgEL6tNKQ+PzObphycPAaipQoUvBNCyqTSNqf9A3M6rp/skEnbfOz8K56pap1JRHwlmoN3teWLHqcOhED0iD48A+vzPJXc6rTjW4luMt5ywzWWOICqjzAvJUsxTApORPtvt8rJYsFA2JqbzKHOWfHt0ZmRmtZ4thWlVVP2ig2izHUA9XuI=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"db142cbd5c474b39b160af8748d4126d"}, [
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
  '822e5674-d64e-4c89-a91a-6ad8e6e0feab',
  'x-ms-keyvault-service-version',
  '1.1.5.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.18.165;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 26 May 2020 13:05:47 GMT',
  'Content-Length',
  '1379'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAyd0r3J8MCXfXaPS4qzfwo2WEBy9z4SP6kDwa/ohX5PiklthsN7SKE+CVQP20RPC2hZm3LYIT1hgdSi9oHxI3Ln7NzdmejKciN3Dn9ffueO9+zwC5iEi7W7CMWrKwOshJFhf/ZKKEJqcF83d8NDzpWjLesoeUSCR/NwwL329P4HUzNTS0hUV4kiRMD0/wuTISssT/zoqSXEx7P57yYLX0AM1WWgvHEaFqSYjjxY1Z4B3FysPE19iWs/nUGbVbogUWePLqy/X2smeFCTh7z/aAXM5FcawSF3GddMxpDERUkYLKNVNmKkWAgL1XVCk/1IQI5Nxy6qBLxZ1pY7OEsmKCLQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBABhObNnvZ20L4ikwo3m4+QGqnFX/Oa1p/mjnNi7d24U7Tcm6LV46KW28EBHEzqe15K2BugTrqNmumVT1GVnXMJjIqyECAn2rXZTrPzmonXeGSyNJLx8IVTfn1vBwm1nxLJA61PLMBjwZbbbVo4ECkpAcxU15F0cExI52cBgEL6tNKQ+PzObphycPAaipQoUvBNCyqTSNqf9A3M6rp/skEnbfOz8K56pap1JRHwlmoN3teWLHqcOhED0iD48A+vzPJXc6rTjW4luMt5ywzWWOICqjzAvJUsxTApORPtvt8rJYsFA2JqbzKHOWfHt0ZmRmtZ4thWlVVP2ig2izHUA9XuI=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"db142cbd5c474b39b160af8748d4126d"}, [
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
  'bda3c861-de2a-4c98-8194-ebbcca7d0e51',
  'x-ms-keyvault-service-version',
  '1.1.5.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.18.165;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 26 May 2020 13:05:49 GMT',
  'Content-Length',
  '1379'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAyd0r3J8MCXfXaPS4qzfwo2WEBy9z4SP6kDwa/ohX5PiklthsN7SKE+CVQP20RPC2hZm3LYIT1hgdSi9oHxI3Ln7NzdmejKciN3Dn9ffueO9+zwC5iEi7W7CMWrKwOshJFhf/ZKKEJqcF83d8NDzpWjLesoeUSCR/NwwL329P4HUzNTS0hUV4kiRMD0/wuTISssT/zoqSXEx7P57yYLX0AM1WWgvHEaFqSYjjxY1Z4B3FysPE19iWs/nUGbVbogUWePLqy/X2smeFCTh7z/aAXM5FcawSF3GddMxpDERUkYLKNVNmKkWAgL1XVCk/1IQI5Nxy6qBLxZ1pY7OEsmKCLQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBABhObNnvZ20L4ikwo3m4+QGqnFX/Oa1p/mjnNi7d24U7Tcm6LV46KW28EBHEzqe15K2BugTrqNmumVT1GVnXMJjIqyECAn2rXZTrPzmonXeGSyNJLx8IVTfn1vBwm1nxLJA61PLMBjwZbbbVo4ECkpAcxU15F0cExI52cBgEL6tNKQ+PzObphycPAaipQoUvBNCyqTSNqf9A3M6rp/skEnbfOz8K56pap1JRHwlmoN3teWLHqcOhED0iD48A+vzPJXc6rTjW4luMt5ywzWWOICqjzAvJUsxTApORPtvt8rJYsFA2JqbzKHOWfHt0ZmRmtZ4thWlVVP2ig2izHUA9XuI=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"db142cbd5c474b39b160af8748d4126d"}, [
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
  '985bc5f5-fac0-4e95-b410-013c77196c87',
  'x-ms-keyvault-service-version',
  '1.1.5.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.18.165;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 26 May 2020 13:05:52 GMT',
  'Content-Length',
  '1379'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAyd0r3J8MCXfXaPS4qzfwo2WEBy9z4SP6kDwa/ohX5PiklthsN7SKE+CVQP20RPC2hZm3LYIT1hgdSi9oHxI3Ln7NzdmejKciN3Dn9ffueO9+zwC5iEi7W7CMWrKwOshJFhf/ZKKEJqcF83d8NDzpWjLesoeUSCR/NwwL329P4HUzNTS0hUV4kiRMD0/wuTISssT/zoqSXEx7P57yYLX0AM1WWgvHEaFqSYjjxY1Z4B3FysPE19iWs/nUGbVbogUWePLqy/X2smeFCTh7z/aAXM5FcawSF3GddMxpDERUkYLKNVNmKkWAgL1XVCk/1IQI5Nxy6qBLxZ1pY7OEsmKCLQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBABhObNnvZ20L4ikwo3m4+QGqnFX/Oa1p/mjnNi7d24U7Tcm6LV46KW28EBHEzqe15K2BugTrqNmumVT1GVnXMJjIqyECAn2rXZTrPzmonXeGSyNJLx8IVTfn1vBwm1nxLJA61PLMBjwZbbbVo4ECkpAcxU15F0cExI52cBgEL6tNKQ+PzObphycPAaipQoUvBNCyqTSNqf9A3M6rp/skEnbfOz8K56pap1JRHwlmoN3teWLHqcOhED0iD48A+vzPJXc6rTjW4luMt5ywzWWOICqjzAvJUsxTApORPtvt8rJYsFA2JqbzKHOWfHt0ZmRmtZ4thWlVVP2ig2izHUA9XuI=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"db142cbd5c474b39b160af8748d4126d"}, [
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
  '8b7c9fa6-42d3-4912-8384-a69e94556f0b',
  'x-ms-keyvault-service-version',
  '1.1.5.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.18.165;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 26 May 2020 13:05:53 GMT',
  'Content-Length',
  '1379'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAyd0r3J8MCXfXaPS4qzfwo2WEBy9z4SP6kDwa/ohX5PiklthsN7SKE+CVQP20RPC2hZm3LYIT1hgdSi9oHxI3Ln7NzdmejKciN3Dn9ffueO9+zwC5iEi7W7CMWrKwOshJFhf/ZKKEJqcF83d8NDzpWjLesoeUSCR/NwwL329P4HUzNTS0hUV4kiRMD0/wuTISssT/zoqSXEx7P57yYLX0AM1WWgvHEaFqSYjjxY1Z4B3FysPE19iWs/nUGbVbogUWePLqy/X2smeFCTh7z/aAXM5FcawSF3GddMxpDERUkYLKNVNmKkWAgL1XVCk/1IQI5Nxy6qBLxZ1pY7OEsmKCLQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBABhObNnvZ20L4ikwo3m4+QGqnFX/Oa1p/mjnNi7d24U7Tcm6LV46KW28EBHEzqe15K2BugTrqNmumVT1GVnXMJjIqyECAn2rXZTrPzmonXeGSyNJLx8IVTfn1vBwm1nxLJA61PLMBjwZbbbVo4ECkpAcxU15F0cExI52cBgEL6tNKQ+PzObphycPAaipQoUvBNCyqTSNqf9A3M6rp/skEnbfOz8K56pap1JRHwlmoN3teWLHqcOhED0iD48A+vzPJXc6rTjW4luMt5ywzWWOICqjzAvJUsxTApORPtvt8rJYsFA2JqbzKHOWfHt0ZmRmtZ4thWlVVP2ig2izHUA9XuI=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"db142cbd5c474b39b160af8748d4126d"}, [
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
  'a91bc63b-4550-4cb9-9b92-a893c3eae1a7',
  'x-ms-keyvault-service-version',
  '1.1.5.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.18.165;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 26 May 2020 13:05:55 GMT',
  'Content-Length',
  '1379'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAyd0r3J8MCXfXaPS4qzfwo2WEBy9z4SP6kDwa/ohX5PiklthsN7SKE+CVQP20RPC2hZm3LYIT1hgdSi9oHxI3Ln7NzdmejKciN3Dn9ffueO9+zwC5iEi7W7CMWrKwOshJFhf/ZKKEJqcF83d8NDzpWjLesoeUSCR/NwwL329P4HUzNTS0hUV4kiRMD0/wuTISssT/zoqSXEx7P57yYLX0AM1WWgvHEaFqSYjjxY1Z4B3FysPE19iWs/nUGbVbogUWePLqy/X2smeFCTh7z/aAXM5FcawSF3GddMxpDERUkYLKNVNmKkWAgL1XVCk/1IQI5Nxy6qBLxZ1pY7OEsmKCLQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBABhObNnvZ20L4ikwo3m4+QGqnFX/Oa1p/mjnNi7d24U7Tcm6LV46KW28EBHEzqe15K2BugTrqNmumVT1GVnXMJjIqyECAn2rXZTrPzmonXeGSyNJLx8IVTfn1vBwm1nxLJA61PLMBjwZbbbVo4ECkpAcxU15F0cExI52cBgEL6tNKQ+PzObphycPAaipQoUvBNCyqTSNqf9A3M6rp/skEnbfOz8K56pap1JRHwlmoN3teWLHqcOhED0iD48A+vzPJXc6rTjW4luMt5ywzWWOICqjzAvJUsxTApORPtvt8rJYsFA2JqbzKHOWfHt0ZmRmtZ4thWlVVP2ig2izHUA9XuI=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"db142cbd5c474b39b160af8748d4126d"}, [
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
  'c1fff38b-d6f0-4061-95f7-ed2fad7f451e',
  'x-ms-keyvault-service-version',
  '1.1.5.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.18.165;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 26 May 2020 13:05:57 GMT',
  'Content-Length',
  '1379'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAyd0r3J8MCXfXaPS4qzfwo2WEBy9z4SP6kDwa/ohX5PiklthsN7SKE+CVQP20RPC2hZm3LYIT1hgdSi9oHxI3Ln7NzdmejKciN3Dn9ffueO9+zwC5iEi7W7CMWrKwOshJFhf/ZKKEJqcF83d8NDzpWjLesoeUSCR/NwwL329P4HUzNTS0hUV4kiRMD0/wuTISssT/zoqSXEx7P57yYLX0AM1WWgvHEaFqSYjjxY1Z4B3FysPE19iWs/nUGbVbogUWePLqy/X2smeFCTh7z/aAXM5FcawSF3GddMxpDERUkYLKNVNmKkWAgL1XVCk/1IQI5Nxy6qBLxZ1pY7OEsmKCLQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBABhObNnvZ20L4ikwo3m4+QGqnFX/Oa1p/mjnNi7d24U7Tcm6LV46KW28EBHEzqe15K2BugTrqNmumVT1GVnXMJjIqyECAn2rXZTrPzmonXeGSyNJLx8IVTfn1vBwm1nxLJA61PLMBjwZbbbVo4ECkpAcxU15F0cExI52cBgEL6tNKQ+PzObphycPAaipQoUvBNCyqTSNqf9A3M6rp/skEnbfOz8K56pap1JRHwlmoN3teWLHqcOhED0iD48A+vzPJXc6rTjW4luMt5ywzWWOICqjzAvJUsxTApORPtvt8rJYsFA2JqbzKHOWfHt0ZmRmtZ4thWlVVP2ig2izHUA9XuI=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"db142cbd5c474b39b160af8748d4126d"}, [
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
  'da467b26-3c8a-4c24-8ac7-093ecf9f08c5',
  'x-ms-keyvault-service-version',
  '1.1.5.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.18.165;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 26 May 2020 13:05:59 GMT',
  'Content-Length',
  '1379'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAyd0r3J8MCXfXaPS4qzfwo2WEBy9z4SP6kDwa/ohX5PiklthsN7SKE+CVQP20RPC2hZm3LYIT1hgdSi9oHxI3Ln7NzdmejKciN3Dn9ffueO9+zwC5iEi7W7CMWrKwOshJFhf/ZKKEJqcF83d8NDzpWjLesoeUSCR/NwwL329P4HUzNTS0hUV4kiRMD0/wuTISssT/zoqSXEx7P57yYLX0AM1WWgvHEaFqSYjjxY1Z4B3FysPE19iWs/nUGbVbogUWePLqy/X2smeFCTh7z/aAXM5FcawSF3GddMxpDERUkYLKNVNmKkWAgL1XVCk/1IQI5Nxy6qBLxZ1pY7OEsmKCLQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBABhObNnvZ20L4ikwo3m4+QGqnFX/Oa1p/mjnNi7d24U7Tcm6LV46KW28EBHEzqe15K2BugTrqNmumVT1GVnXMJjIqyECAn2rXZTrPzmonXeGSyNJLx8IVTfn1vBwm1nxLJA61PLMBjwZbbbVo4ECkpAcxU15F0cExI52cBgEL6tNKQ+PzObphycPAaipQoUvBNCyqTSNqf9A3M6rp/skEnbfOz8K56pap1JRHwlmoN3teWLHqcOhED0iD48A+vzPJXc6rTjW4luMt5ywzWWOICqjzAvJUsxTApORPtvt8rJYsFA2JqbzKHOWfHt0ZmRmtZ4thWlVVP2ig2izHUA9XuI=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"db142cbd5c474b39b160af8748d4126d"}, [
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
  '584ec407-0428-49f2-b5df-401c5740dac1',
  'x-ms-keyvault-service-version',
  '1.1.5.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.18.165;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 26 May 2020 13:06:01 GMT',
  'Content-Length',
  '1379'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAyd0r3J8MCXfXaPS4qzfwo2WEBy9z4SP6kDwa/ohX5PiklthsN7SKE+CVQP20RPC2hZm3LYIT1hgdSi9oHxI3Ln7NzdmejKciN3Dn9ffueO9+zwC5iEi7W7CMWrKwOshJFhf/ZKKEJqcF83d8NDzpWjLesoeUSCR/NwwL329P4HUzNTS0hUV4kiRMD0/wuTISssT/zoqSXEx7P57yYLX0AM1WWgvHEaFqSYjjxY1Z4B3FysPE19iWs/nUGbVbogUWePLqy/X2smeFCTh7z/aAXM5FcawSF3GddMxpDERUkYLKNVNmKkWAgL1XVCk/1IQI5Nxy6qBLxZ1pY7OEsmKCLQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBABhObNnvZ20L4ikwo3m4+QGqnFX/Oa1p/mjnNi7d24U7Tcm6LV46KW28EBHEzqe15K2BugTrqNmumVT1GVnXMJjIqyECAn2rXZTrPzmonXeGSyNJLx8IVTfn1vBwm1nxLJA61PLMBjwZbbbVo4ECkpAcxU15F0cExI52cBgEL6tNKQ+PzObphycPAaipQoUvBNCyqTSNqf9A3M6rp/skEnbfOz8K56pap1JRHwlmoN3teWLHqcOhED0iD48A+vzPJXc6rTjW4luMt5ywzWWOICqjzAvJUsxTApORPtvt8rJYsFA2JqbzKHOWfHt0ZmRmtZ4thWlVVP2ig2izHUA9XuI=","cancellation_requested":false,"status":"completed","target":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1","request_id":"db142cbd5c474b39b160af8748d4126d"}, [
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
  '7a9c038d-9767-412c-bdb3-92bdecc9d2c0',
  'x-ms-keyvault-service-version',
  '1.1.5.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.18.165;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 26 May 2020 13:06:04 GMT',
  'Content-Length',
  '1385'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1/')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1/547efcd1d08447eead0778ffd9a70147","kid":"https://keyvault_name.vault.azure.net/keys/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1/547efcd1d08447eead0778ffd9a70147","sid":"https://keyvault_name.vault.azure.net/secrets/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1/547efcd1d08447eead0778ffd9a70147","x5t":"o8f6g96f8IKS6OIPjgeQiUuPp_g","cer":"MIIDKDCCAhCgAwIBAgIQftQQ5FJZTEqws0x3bS+fbjANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjAwNTI2MTI1NjAxWhcNMjEwNTI2MTMwNjAxWjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQDJ3SvcnwwJd9do9LirN/CjZYQHL3PhI/qQPBr+iFfk+KSW2Gw3tIoT4JVA/bRE8LaFmbctghPWGB1KL2gfEjcufs3N2Z6MpyI3cOf19+54737PALmISLtbsIxasrA6yEkWF/9kooQmpwXzd3w0POlaMt6yh5RIJH83DAvfb0/gdTM1NLSFRXiSJEwPT/C5MhKyxP/OipJcTHs/nvJgtfQAzVZaC8cRoWpJiOPFjVngHcXKw8TX2Jaz+dQZtVuiBRZ48urL9fayZ4UJOHvP9oBczkVxrBIXcZ10zGkMRFSRgso1U2YqRYCAvVdUKT/UhAjk3HLqoEvFnWljs4SyYoItAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBRJLPVCQEh86toYqCF3BJTHBEnFeDAdBgNVHQ4EFgQUSSz1QkBIfOraGKghdwSUxwRJxXgwDQYJKoZIhvcNAQELBQADggEBAFhTaaIds41+jb8FJbzgiVcv88bNsUlnB5BCm70j3vdyWKULAZI6L0x/fLYcIQqQwtw2Rk+kc2dctZUCxZ68diLFyzlkUpGZX8UZwxr+zCgrNSe2AtXsE1dDTq7I7+JhN2cNzQ77FASC8yVK49XA+hyp+82Gme7lwQ6ZNNjWMZFrpVDeh78MOBHL/33+PQs2JPPIhfaB4OZ7A3DjBmiMOpDn7P5wfaoILivFaJODLWNMPlMmSUKT8OjUD3hMMe2SZ5KvuTmgyYUHm7DLics/+z8q27J5FiE1OQuirxIignaBlY867WBApiYgCu/gUQGat/a5+9r10Jio0ndvAXw7gEw=","attributes":{"enabled":true,"nbf":1590497761,"exp":1622034361,"created":1590498361,"updated":1590498361,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1590498343,"updated":1590498343}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1/pending"}}, [
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
  '3c03ccd7-6658-4030-bfba-2258bc1a75ab',
  'x-ms-keyvault-service-version',
  '1.1.5.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.18.165;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 26 May 2020 13:06:04 GMT',
  'Content-Length',
  '2785'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0","deletedDate":1590498364,"scheduledPurgeDate":1598274364,"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0/4542684ff47d40df9c8a48adc9122af7","kid":"https://keyvault_name.vault.azure.net/keys/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0/4542684ff47d40df9c8a48adc9122af7","sid":"https://keyvault_name.vault.azure.net/secrets/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0/4542684ff47d40df9c8a48adc9122af7","x5t":"43rtUzoB5-XjM4OfzoFvl1SHifk","cer":"MIIDKDCCAhCgAwIBAgIQYDvv1usIRROW7T9hRX8FeTANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjAwNTI2MTI1NTQyWhcNMjEwNTI2MTMwNTQyWjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQCoBU4E+tZqz76CuT8LzuHGNZjm56f1FJAQd5LXcSCXNBH7jmgRePiLQWidvy4r6COIC4wBlli6E13VCoLQGaUjV85o5+iIBWd1BCAYVf4xtHVXPGaXztT9L7/u/pD10KJc+LbimLs72lLT2sjNxL+uv0IuiD00dnl3a0SyZlOiBAjC+e7uvJguKR6BGYPW9d3D6FOP+iDIgMwyqC5EMhmKGv+vQV5mvZsNIN7VByU1ZUzck8SOxoCdeiYTKMgBDxF1Dpj31JJunD+Me4y2aNUEYFTMomR/IsXHfYtg6ZUpjsTsNKbidShMaOpCsa8WFUpVtWtE6MYXdY0e+ChgQ5iNAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBQYs0ck9Zo6ji/eTNa3rHzpGfMAOzAdBgNVHQ4EFgQUGLNHJPWaOo4v3kzWt6x86RnzADswDQYJKoZIhvcNAQELBQADggEBAHNvQKCDuDk2QWfHeGnvgtGADuy5japSXIDPYynE3Vd/f3Hvv4G0cfyH7oALpc+6myd1Kka/lUAFtkQHXpkWaFtuDv1FEqqXRzzOQU+Rh5siLnUQC8zVbZ2//PvwXOTccArwwpBef4h+esj+iIgGy94W5vdgI2I3IG0UId8OYf1GMDsfFHXeaVKs9aj4nFy5k41xttD3+2TqpgJQbddrDd6mIMAeX8wzjkYyPyZVwLQCKPfDRwBJGmBQd0wHE3HZXBQ0TI0z+LtlFBkgG7ZULH0dlrrcqQWuKdA3pWi0bozXQrWDwndKUhz9bz68DpPQXmtgt2jjkBIYNYRMlIfYp+4=","attributes":{"enabled":true,"nbf":1590497742,"exp":1622034342,"created":1590498342,"updated":1590498342,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1590498328,"updated":1590498328}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0/pending"}}, [
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
  'a37c5d54-278a-443a-810f-4b0bfa275a8e',
  'x-ms-keyvault-service-version',
  '1.1.5.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.18.165;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 26 May 2020 13:06:04 GMT',
  'Content-Length',
  '3024'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '187',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '378846f2-8a25-4690-b4f6-6089d711f53c',
  'x-ms-keyvault-service-version',
  '1.1.5.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.18.165;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 26 May 2020 13:06:04 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '187',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'e082fde2-4eb8-4bce-914f-bbfa6b3ae99b',
  'x-ms-keyvault-service-version',
  '1.1.5.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.18.165;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 26 May 2020 13:06:04 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '187',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'e47d7a21-97bd-4852-8142-5f9cbb790988',
  'x-ms-keyvault-service-version',
  '1.1.5.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.18.165;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 26 May 2020 13:06:06 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '187',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'c072adcc-02f9-48b4-86a4-f3e96e07c595',
  'x-ms-keyvault-service-version',
  '1.1.5.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.18.165;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 26 May 2020 13:06:08 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '187',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '02d6c286-1f51-4c9c-abfa-2c3ae627f015',
  'x-ms-keyvault-service-version',
  '1.1.5.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.18.165;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 26 May 2020 13:06:10 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0","deletedDate":1590498364,"scheduledPurgeDate":1598274364,"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0/4542684ff47d40df9c8a48adc9122af7","kid":"https://keyvault_name.vault.azure.net/keys/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0/4542684ff47d40df9c8a48adc9122af7","sid":"https://keyvault_name.vault.azure.net/secrets/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0/4542684ff47d40df9c8a48adc9122af7","x5t":"43rtUzoB5-XjM4OfzoFvl1SHifk","cer":"MIIDKDCCAhCgAwIBAgIQYDvv1usIRROW7T9hRX8FeTANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjAwNTI2MTI1NTQyWhcNMjEwNTI2MTMwNTQyWjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQCoBU4E+tZqz76CuT8LzuHGNZjm56f1FJAQd5LXcSCXNBH7jmgRePiLQWidvy4r6COIC4wBlli6E13VCoLQGaUjV85o5+iIBWd1BCAYVf4xtHVXPGaXztT9L7/u/pD10KJc+LbimLs72lLT2sjNxL+uv0IuiD00dnl3a0SyZlOiBAjC+e7uvJguKR6BGYPW9d3D6FOP+iDIgMwyqC5EMhmKGv+vQV5mvZsNIN7VByU1ZUzck8SOxoCdeiYTKMgBDxF1Dpj31JJunD+Me4y2aNUEYFTMomR/IsXHfYtg6ZUpjsTsNKbidShMaOpCsa8WFUpVtWtE6MYXdY0e+ChgQ5iNAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBQYs0ck9Zo6ji/eTNa3rHzpGfMAOzAdBgNVHQ4EFgQUGLNHJPWaOo4v3kzWt6x86RnzADswDQYJKoZIhvcNAQELBQADggEBAHNvQKCDuDk2QWfHeGnvgtGADuy5japSXIDPYynE3Vd/f3Hvv4G0cfyH7oALpc+6myd1Kka/lUAFtkQHXpkWaFtuDv1FEqqXRzzOQU+Rh5siLnUQC8zVbZ2//PvwXOTccArwwpBef4h+esj+iIgGy94W5vdgI2I3IG0UId8OYf1GMDsfFHXeaVKs9aj4nFy5k41xttD3+2TqpgJQbddrDd6mIMAeX8wzjkYyPyZVwLQCKPfDRwBJGmBQd0wHE3HZXBQ0TI0z+LtlFBkgG7ZULH0dlrrcqQWuKdA3pWi0bozXQrWDwndKUhz9bz68DpPQXmtgt2jjkBIYNYRMlIfYp+4=","attributes":{"enabled":true,"nbf":1590497742,"exp":1622034342,"created":1590498342,"updated":1590498342,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1590498328,"updated":1590498328}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0/pending"}}, [
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
  '389714dc-2833-4520-9b0d-14412408bbd4',
  'x-ms-keyvault-service-version',
  '1.1.5.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.18.165;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 26 May 2020 13:06:12 GMT',
  'Content-Length',
  '3024'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedcertificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0')
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
  '3bef7c0b-54b0-43aa-bd7d-8356b28911e4',
  'x-ms-keyvault-service-version',
  '1.1.5.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.18.165;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 26 May 2020 13:06:12 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1","deletedDate":1590498373,"scheduledPurgeDate":1598274373,"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1/547efcd1d08447eead0778ffd9a70147","kid":"https://keyvault_name.vault.azure.net/keys/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1/547efcd1d08447eead0778ffd9a70147","sid":"https://keyvault_name.vault.azure.net/secrets/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1/547efcd1d08447eead0778ffd9a70147","x5t":"o8f6g96f8IKS6OIPjgeQiUuPp_g","cer":"MIIDKDCCAhCgAwIBAgIQftQQ5FJZTEqws0x3bS+fbjANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjAwNTI2MTI1NjAxWhcNMjEwNTI2MTMwNjAxWjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQDJ3SvcnwwJd9do9LirN/CjZYQHL3PhI/qQPBr+iFfk+KSW2Gw3tIoT4JVA/bRE8LaFmbctghPWGB1KL2gfEjcufs3N2Z6MpyI3cOf19+54737PALmISLtbsIxasrA6yEkWF/9kooQmpwXzd3w0POlaMt6yh5RIJH83DAvfb0/gdTM1NLSFRXiSJEwPT/C5MhKyxP/OipJcTHs/nvJgtfQAzVZaC8cRoWpJiOPFjVngHcXKw8TX2Jaz+dQZtVuiBRZ48urL9fayZ4UJOHvP9oBczkVxrBIXcZ10zGkMRFSRgso1U2YqRYCAvVdUKT/UhAjk3HLqoEvFnWljs4SyYoItAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBRJLPVCQEh86toYqCF3BJTHBEnFeDAdBgNVHQ4EFgQUSSz1QkBIfOraGKghdwSUxwRJxXgwDQYJKoZIhvcNAQELBQADggEBAFhTaaIds41+jb8FJbzgiVcv88bNsUlnB5BCm70j3vdyWKULAZI6L0x/fLYcIQqQwtw2Rk+kc2dctZUCxZ68diLFyzlkUpGZX8UZwxr+zCgrNSe2AtXsE1dDTq7I7+JhN2cNzQ77FASC8yVK49XA+hyp+82Gme7lwQ6ZNNjWMZFrpVDeh78MOBHL/33+PQs2JPPIhfaB4OZ7A3DjBmiMOpDn7P5wfaoILivFaJODLWNMPlMmSUKT8OjUD3hMMe2SZ5KvuTmgyYUHm7DLics/+z8q27J5FiE1OQuirxIignaBlY867WBApiYgCu/gUQGat/a5+9r10Jio0ndvAXw7gEw=","attributes":{"enabled":true,"nbf":1590497761,"exp":1622034361,"created":1590498361,"updated":1590498361,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1590498343,"updated":1590498343}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1/pending"}}, [
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
  '0b268204-0833-41b0-926b-cc5e8f138fe3',
  'x-ms-keyvault-service-version',
  '1.1.5.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.18.165;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 26 May 2020 13:06:12 GMT',
  'Content-Length',
  '3024'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '187',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'a574a8a3-7624-4e36-a101-269dd532108d',
  'x-ms-keyvault-service-version',
  '1.1.5.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.18.165;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 26 May 2020 13:06:12 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '187',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'ec11a2cb-e738-4126-ad3d-5517d5578577',
  'x-ms-keyvault-service-version',
  '1.1.5.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.18.165;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 26 May 2020 13:06:12 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '187',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '0281614a-8eeb-4a8f-b598-4b84c2e60527',
  'x-ms-keyvault-service-version',
  '1.1.5.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.18.165;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 26 May 2020 13:06:15 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '187',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'd949e382-088c-460a-93e2-03093eaece89',
  'x-ms-keyvault-service-version',
  '1.1.5.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.18.165;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 26 May 2020 13:06:17 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '187',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '6c8ff434-2781-4ebf-b332-93634dba57c1',
  'x-ms-keyvault-service-version',
  '1.1.5.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.18.165;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 26 May 2020 13:06:19 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '187',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'eb81b578-2967-4614-9193-14e65ef3d84b',
  'x-ms-keyvault-service-version',
  '1.1.5.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.18.165;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 26 May 2020 13:06:21 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '187',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '030f3643-b6c7-4400-a6d0-972356f4f521',
  'x-ms-keyvault-service-version',
  '1.1.5.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.18.165;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 26 May 2020 13:06:23 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '187',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'b7487bee-d0b6-4c95-808f-8394c61c9bcf',
  'x-ms-keyvault-service-version',
  '1.1.5.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.18.165;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 26 May 2020 13:06:25 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '187',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '56259769-2607-4644-b80d-969c332a861a',
  'x-ms-keyvault-service-version',
  '1.1.5.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.18.165;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 26 May 2020 13:06:27 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1","deletedDate":1590498373,"scheduledPurgeDate":1598274373,"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1/547efcd1d08447eead0778ffd9a70147","kid":"https://keyvault_name.vault.azure.net/keys/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1/547efcd1d08447eead0778ffd9a70147","sid":"https://keyvault_name.vault.azure.net/secrets/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1/547efcd1d08447eead0778ffd9a70147","x5t":"o8f6g96f8IKS6OIPjgeQiUuPp_g","cer":"MIIDKDCCAhCgAwIBAgIQftQQ5FJZTEqws0x3bS+fbjANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjAwNTI2MTI1NjAxWhcNMjEwNTI2MTMwNjAxWjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQDJ3SvcnwwJd9do9LirN/CjZYQHL3PhI/qQPBr+iFfk+KSW2Gw3tIoT4JVA/bRE8LaFmbctghPWGB1KL2gfEjcufs3N2Z6MpyI3cOf19+54737PALmISLtbsIxasrA6yEkWF/9kooQmpwXzd3w0POlaMt6yh5RIJH83DAvfb0/gdTM1NLSFRXiSJEwPT/C5MhKyxP/OipJcTHs/nvJgtfQAzVZaC8cRoWpJiOPFjVngHcXKw8TX2Jaz+dQZtVuiBRZ48urL9fayZ4UJOHvP9oBczkVxrBIXcZ10zGkMRFSRgso1U2YqRYCAvVdUKT/UhAjk3HLqoEvFnWljs4SyYoItAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBRJLPVCQEh86toYqCF3BJTHBEnFeDAdBgNVHQ4EFgQUSSz1QkBIfOraGKghdwSUxwRJxXgwDQYJKoZIhvcNAQELBQADggEBAFhTaaIds41+jb8FJbzgiVcv88bNsUlnB5BCm70j3vdyWKULAZI6L0x/fLYcIQqQwtw2Rk+kc2dctZUCxZ68diLFyzlkUpGZX8UZwxr+zCgrNSe2AtXsE1dDTq7I7+JhN2cNzQ77FASC8yVK49XA+hyp+82Gme7lwQ6ZNNjWMZFrpVDeh78MOBHL/33+PQs2JPPIhfaB4OZ7A3DjBmiMOpDn7P5wfaoILivFaJODLWNMPlMmSUKT8OjUD3hMMe2SZ5KvuTmgyYUHm7DLics/+z8q27J5FiE1OQuirxIignaBlY867WBApiYgCu/gUQGat/a5+9r10Jio0ndvAXw7gEw=","attributes":{"enabled":true,"nbf":1590497761,"exp":1622034361,"created":1590498361,"updated":1590498361,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1590498343,"updated":1590498343}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1/pending"}}, [
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
  'f02b3f30-3cd3-4de0-8d3b-da0127caf373',
  'x-ms-keyvault-service-version',
  '1.1.5.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.18.165;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 26 May 2020 13:06:29 GMT',
  'Content-Length',
  '3024'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedcertificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1')
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
  '4fb89009-7d7a-4a44-a14e-6afe74241322',
  'x-ms-keyvault-service-version',
  '1.1.5.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.18.165;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 26 May 2020 13:06:29 GMT'
]);

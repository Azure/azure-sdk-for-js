let nock = require('nock');

module.exports.hash = "d2824b4cd8ecf65fcf255702ace7ac50";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/certificates/lroRecoverCertificateName-canresumefromastoppedpoller-/create')
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
  '76bf3917-b830-469b-a91f-e3a4687b682b',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.123.117;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 02 Jul 2020 18:44:58 GMT'
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
  '0a15349b-cc41-4681-9c3d-26bc9b065600',
  'x-ms-ests-server',
  '2.1.10761.15 - WUS2 ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AoGTrmpMKwRMiH6jOqFRnls_aSJHAQAAACoikNYOAAAA; expires=Sat, 01-Aug-2020 18:44:59 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; SameSite=None; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; SameSite=None; secure; HttpOnly',
  'Date',
  'Thu, 02 Jul 2020 18:44:58 GMT',
  'Content-Length',
  '1315'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/certificates/lroRecoverCertificateName-canresumefromastoppedpoller-/create', {"policy":{"key_props":{},"secret_props":{},"x509_props":{"subject":"cn=MyCert","sans":{}},"issuer":{"name":"Self"},"attributes":{}},"attributes":{}})
  .query(true)
  .reply(202, {"id":"https://keyvault_name.vault.azure.net/certificates/lroRecoverCertificateName-canresumefromastoppedpoller-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAtanVyXd8KyD9YJa3TwuJ15orF5D5W6LCT3/I43zyhScfqLAPmwzRuKsCqe+UzFR2ZX0lWwKLSRU0RhWXKjjG4czX4GSCD1Zkpp/CdosR9JG1mUsaI/Dv9HAhtTYCLB1v6cQJZ4WSINCSyGCAjBUi/cTngltm/a/+FzPvnstGrVyuaWmRx2G4WXLGLZPn1gaY/ayfvlU9WR7wOkBvT6L14CXG7cSCsbraE7hIQLdSKb3pn3BWrb+Ta2IdllXhBz3a9gE5XwGAasJGfpClmVAEJ/LVt7Z8T2cmdyyZd3jArBuwJ/gS/sTJvzFe+g3cDhRVXM8w+0hppSepMxTZV4lGSwIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAKCjtkoVi6W6/m49lGLcpOnwUutmZNoNFSyrKodsQSYK1rg++/ZwyFB5HyGWWea4XJrJXHo11TG1zw6ONiWjownQmKaT3zlgA58ZMTo7wPDGpRDA5gVqJ7chyQuTEPtVmQpMe8qLk45GtN3Sgjj0ylEmbDGM99/ng8nthVG7KpiQO/YVgUDNf2/0CwrJuQ3AiCzFLygxMSM9hkYeLRO9Rj2E+YKOB3SrqL6XJ9/JEBUTelpgCqTuoiKzxnf4CEzz05wuo2VeMD2VjCxm5VGY8/Bz5X3gNkLCZNnU78s26noh3IVd4IQ6ONTFxY+lkfrNbX75X2IlwvTEazo8RofePlU=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"f87344b1b2d045a896504533e7cde0c3"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://keyvault_name.vault.azure.net/certificates/lroRecoverCertificateName-canresumefromastoppedpoller-/pending?api-version=7.1&request_id=f87344b1b2d045a896504533e7cde0c3',
  'Retry-After',
  '10',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'fe104177-9c05-407a-aa01-c10bfe465ebd',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.123.117;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 02 Jul 2020 18:44:59 GMT',
  'Content-Length',
  '1347'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroRecoverCertificateName-canresumefromastoppedpoller-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroRecoverCertificateName-canresumefromastoppedpoller-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAtanVyXd8KyD9YJa3TwuJ15orF5D5W6LCT3/I43zyhScfqLAPmwzRuKsCqe+UzFR2ZX0lWwKLSRU0RhWXKjjG4czX4GSCD1Zkpp/CdosR9JG1mUsaI/Dv9HAhtTYCLB1v6cQJZ4WSINCSyGCAjBUi/cTngltm/a/+FzPvnstGrVyuaWmRx2G4WXLGLZPn1gaY/ayfvlU9WR7wOkBvT6L14CXG7cSCsbraE7hIQLdSKb3pn3BWrb+Ta2IdllXhBz3a9gE5XwGAasJGfpClmVAEJ/LVt7Z8T2cmdyyZd3jArBuwJ/gS/sTJvzFe+g3cDhRVXM8w+0hppSepMxTZV4lGSwIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAKCjtkoVi6W6/m49lGLcpOnwUutmZNoNFSyrKodsQSYK1rg++/ZwyFB5HyGWWea4XJrJXHo11TG1zw6ONiWjownQmKaT3zlgA58ZMTo7wPDGpRDA5gVqJ7chyQuTEPtVmQpMe8qLk45GtN3Sgjj0ylEmbDGM99/ng8nthVG7KpiQO/YVgUDNf2/0CwrJuQ3AiCzFLygxMSM9hkYeLRO9Rj2E+YKOB3SrqL6XJ9/JEBUTelpgCqTuoiKzxnf4CEzz05wuo2VeMD2VjCxm5VGY8/Bz5X3gNkLCZNnU78s26noh3IVd4IQ6ONTFxY+lkfrNbX75X2IlwvTEazo8RofePlU=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"f87344b1b2d045a896504533e7cde0c3"}, [
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
  '1676b763-26d2-4c90-b197-dadf2dab4272',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.123.117;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 02 Jul 2020 18:44:59 GMT',
  'Content-Length',
  '1347'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroRecoverCertificateName-canresumefromastoppedpoller-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroRecoverCertificateName-canresumefromastoppedpoller-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAtanVyXd8KyD9YJa3TwuJ15orF5D5W6LCT3/I43zyhScfqLAPmwzRuKsCqe+UzFR2ZX0lWwKLSRU0RhWXKjjG4czX4GSCD1Zkpp/CdosR9JG1mUsaI/Dv9HAhtTYCLB1v6cQJZ4WSINCSyGCAjBUi/cTngltm/a/+FzPvnstGrVyuaWmRx2G4WXLGLZPn1gaY/ayfvlU9WR7wOkBvT6L14CXG7cSCsbraE7hIQLdSKb3pn3BWrb+Ta2IdllXhBz3a9gE5XwGAasJGfpClmVAEJ/LVt7Z8T2cmdyyZd3jArBuwJ/gS/sTJvzFe+g3cDhRVXM8w+0hppSepMxTZV4lGSwIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAKCjtkoVi6W6/m49lGLcpOnwUutmZNoNFSyrKodsQSYK1rg++/ZwyFB5HyGWWea4XJrJXHo11TG1zw6ONiWjownQmKaT3zlgA58ZMTo7wPDGpRDA5gVqJ7chyQuTEPtVmQpMe8qLk45GtN3Sgjj0ylEmbDGM99/ng8nthVG7KpiQO/YVgUDNf2/0CwrJuQ3AiCzFLygxMSM9hkYeLRO9Rj2E+YKOB3SrqL6XJ9/JEBUTelpgCqTuoiKzxnf4CEzz05wuo2VeMD2VjCxm5VGY8/Bz5X3gNkLCZNnU78s26noh3IVd4IQ6ONTFxY+lkfrNbX75X2IlwvTEazo8RofePlU=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"f87344b1b2d045a896504533e7cde0c3"}, [
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
  '12c310f5-8c70-4577-ba64-5d25c7dc2a19',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.123.117;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 02 Jul 2020 18:44:59 GMT',
  'Content-Length',
  '1347'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroRecoverCertificateName-canresumefromastoppedpoller-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroRecoverCertificateName-canresumefromastoppedpoller-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAtanVyXd8KyD9YJa3TwuJ15orF5D5W6LCT3/I43zyhScfqLAPmwzRuKsCqe+UzFR2ZX0lWwKLSRU0RhWXKjjG4czX4GSCD1Zkpp/CdosR9JG1mUsaI/Dv9HAhtTYCLB1v6cQJZ4WSINCSyGCAjBUi/cTngltm/a/+FzPvnstGrVyuaWmRx2G4WXLGLZPn1gaY/ayfvlU9WR7wOkBvT6L14CXG7cSCsbraE7hIQLdSKb3pn3BWrb+Ta2IdllXhBz3a9gE5XwGAasJGfpClmVAEJ/LVt7Z8T2cmdyyZd3jArBuwJ/gS/sTJvzFe+g3cDhRVXM8w+0hppSepMxTZV4lGSwIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAKCjtkoVi6W6/m49lGLcpOnwUutmZNoNFSyrKodsQSYK1rg++/ZwyFB5HyGWWea4XJrJXHo11TG1zw6ONiWjownQmKaT3zlgA58ZMTo7wPDGpRDA5gVqJ7chyQuTEPtVmQpMe8qLk45GtN3Sgjj0ylEmbDGM99/ng8nthVG7KpiQO/YVgUDNf2/0CwrJuQ3AiCzFLygxMSM9hkYeLRO9Rj2E+YKOB3SrqL6XJ9/JEBUTelpgCqTuoiKzxnf4CEzz05wuo2VeMD2VjCxm5VGY8/Bz5X3gNkLCZNnU78s26noh3IVd4IQ6ONTFxY+lkfrNbX75X2IlwvTEazo8RofePlU=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"f87344b1b2d045a896504533e7cde0c3"}, [
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
  '665e435b-d6b4-4c2c-92c6-7e73b390d95e',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.123.117;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 02 Jul 2020 18:45:01 GMT',
  'Content-Length',
  '1347'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroRecoverCertificateName-canresumefromastoppedpoller-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroRecoverCertificateName-canresumefromastoppedpoller-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAtanVyXd8KyD9YJa3TwuJ15orF5D5W6LCT3/I43zyhScfqLAPmwzRuKsCqe+UzFR2ZX0lWwKLSRU0RhWXKjjG4czX4GSCD1Zkpp/CdosR9JG1mUsaI/Dv9HAhtTYCLB1v6cQJZ4WSINCSyGCAjBUi/cTngltm/a/+FzPvnstGrVyuaWmRx2G4WXLGLZPn1gaY/ayfvlU9WR7wOkBvT6L14CXG7cSCsbraE7hIQLdSKb3pn3BWrb+Ta2IdllXhBz3a9gE5XwGAasJGfpClmVAEJ/LVt7Z8T2cmdyyZd3jArBuwJ/gS/sTJvzFe+g3cDhRVXM8w+0hppSepMxTZV4lGSwIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAKCjtkoVi6W6/m49lGLcpOnwUutmZNoNFSyrKodsQSYK1rg++/ZwyFB5HyGWWea4XJrJXHo11TG1zw6ONiWjownQmKaT3zlgA58ZMTo7wPDGpRDA5gVqJ7chyQuTEPtVmQpMe8qLk45GtN3Sgjj0ylEmbDGM99/ng8nthVG7KpiQO/YVgUDNf2/0CwrJuQ3AiCzFLygxMSM9hkYeLRO9Rj2E+YKOB3SrqL6XJ9/JEBUTelpgCqTuoiKzxnf4CEzz05wuo2VeMD2VjCxm5VGY8/Bz5X3gNkLCZNnU78s26noh3IVd4IQ6ONTFxY+lkfrNbX75X2IlwvTEazo8RofePlU=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"f87344b1b2d045a896504533e7cde0c3"}, [
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
  '2b46b50e-ae93-4736-a70d-06e83bb3bf7b',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.123.117;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 02 Jul 2020 18:45:03 GMT',
  'Content-Length',
  '1347'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroRecoverCertificateName-canresumefromastoppedpoller-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroRecoverCertificateName-canresumefromastoppedpoller-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAtanVyXd8KyD9YJa3TwuJ15orF5D5W6LCT3/I43zyhScfqLAPmwzRuKsCqe+UzFR2ZX0lWwKLSRU0RhWXKjjG4czX4GSCD1Zkpp/CdosR9JG1mUsaI/Dv9HAhtTYCLB1v6cQJZ4WSINCSyGCAjBUi/cTngltm/a/+FzPvnstGrVyuaWmRx2G4WXLGLZPn1gaY/ayfvlU9WR7wOkBvT6L14CXG7cSCsbraE7hIQLdSKb3pn3BWrb+Ta2IdllXhBz3a9gE5XwGAasJGfpClmVAEJ/LVt7Z8T2cmdyyZd3jArBuwJ/gS/sTJvzFe+g3cDhRVXM8w+0hppSepMxTZV4lGSwIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAKCjtkoVi6W6/m49lGLcpOnwUutmZNoNFSyrKodsQSYK1rg++/ZwyFB5HyGWWea4XJrJXHo11TG1zw6ONiWjownQmKaT3zlgA58ZMTo7wPDGpRDA5gVqJ7chyQuTEPtVmQpMe8qLk45GtN3Sgjj0ylEmbDGM99/ng8nthVG7KpiQO/YVgUDNf2/0CwrJuQ3AiCzFLygxMSM9hkYeLRO9Rj2E+YKOB3SrqL6XJ9/JEBUTelpgCqTuoiKzxnf4CEzz05wuo2VeMD2VjCxm5VGY8/Bz5X3gNkLCZNnU78s26noh3IVd4IQ6ONTFxY+lkfrNbX75X2IlwvTEazo8RofePlU=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"f87344b1b2d045a896504533e7cde0c3"}, [
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
  'e1e02fe7-282c-473d-845f-11a2ac158534',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.123.117;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 02 Jul 2020 18:45:05 GMT',
  'Content-Length',
  '1347'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroRecoverCertificateName-canresumefromastoppedpoller-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroRecoverCertificateName-canresumefromastoppedpoller-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAtanVyXd8KyD9YJa3TwuJ15orF5D5W6LCT3/I43zyhScfqLAPmwzRuKsCqe+UzFR2ZX0lWwKLSRU0RhWXKjjG4czX4GSCD1Zkpp/CdosR9JG1mUsaI/Dv9HAhtTYCLB1v6cQJZ4WSINCSyGCAjBUi/cTngltm/a/+FzPvnstGrVyuaWmRx2G4WXLGLZPn1gaY/ayfvlU9WR7wOkBvT6L14CXG7cSCsbraE7hIQLdSKb3pn3BWrb+Ta2IdllXhBz3a9gE5XwGAasJGfpClmVAEJ/LVt7Z8T2cmdyyZd3jArBuwJ/gS/sTJvzFe+g3cDhRVXM8w+0hppSepMxTZV4lGSwIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAKCjtkoVi6W6/m49lGLcpOnwUutmZNoNFSyrKodsQSYK1rg++/ZwyFB5HyGWWea4XJrJXHo11TG1zw6ONiWjownQmKaT3zlgA58ZMTo7wPDGpRDA5gVqJ7chyQuTEPtVmQpMe8qLk45GtN3Sgjj0ylEmbDGM99/ng8nthVG7KpiQO/YVgUDNf2/0CwrJuQ3AiCzFLygxMSM9hkYeLRO9Rj2E+YKOB3SrqL6XJ9/JEBUTelpgCqTuoiKzxnf4CEzz05wuo2VeMD2VjCxm5VGY8/Bz5X3gNkLCZNnU78s26noh3IVd4IQ6ONTFxY+lkfrNbX75X2IlwvTEazo8RofePlU=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"f87344b1b2d045a896504533e7cde0c3"}, [
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
  '41d3ddb5-ae45-47a2-8aca-c8163b10537e',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.123.117;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 02 Jul 2020 18:45:07 GMT',
  'Content-Length',
  '1347'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroRecoverCertificateName-canresumefromastoppedpoller-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroRecoverCertificateName-canresumefromastoppedpoller-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAtanVyXd8KyD9YJa3TwuJ15orF5D5W6LCT3/I43zyhScfqLAPmwzRuKsCqe+UzFR2ZX0lWwKLSRU0RhWXKjjG4czX4GSCD1Zkpp/CdosR9JG1mUsaI/Dv9HAhtTYCLB1v6cQJZ4WSINCSyGCAjBUi/cTngltm/a/+FzPvnstGrVyuaWmRx2G4WXLGLZPn1gaY/ayfvlU9WR7wOkBvT6L14CXG7cSCsbraE7hIQLdSKb3pn3BWrb+Ta2IdllXhBz3a9gE5XwGAasJGfpClmVAEJ/LVt7Z8T2cmdyyZd3jArBuwJ/gS/sTJvzFe+g3cDhRVXM8w+0hppSepMxTZV4lGSwIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAKCjtkoVi6W6/m49lGLcpOnwUutmZNoNFSyrKodsQSYK1rg++/ZwyFB5HyGWWea4XJrJXHo11TG1zw6ONiWjownQmKaT3zlgA58ZMTo7wPDGpRDA5gVqJ7chyQuTEPtVmQpMe8qLk45GtN3Sgjj0ylEmbDGM99/ng8nthVG7KpiQO/YVgUDNf2/0CwrJuQ3AiCzFLygxMSM9hkYeLRO9Rj2E+YKOB3SrqL6XJ9/JEBUTelpgCqTuoiKzxnf4CEzz05wuo2VeMD2VjCxm5VGY8/Bz5X3gNkLCZNnU78s26noh3IVd4IQ6ONTFxY+lkfrNbX75X2IlwvTEazo8RofePlU=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"f87344b1b2d045a896504533e7cde0c3"}, [
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
  '12d3051b-fc4c-4b0c-bbd0-2859ae9d22dd',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.123.117;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 02 Jul 2020 18:45:10 GMT',
  'Content-Length',
  '1347'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroRecoverCertificateName-canresumefromastoppedpoller-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroRecoverCertificateName-canresumefromastoppedpoller-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAtanVyXd8KyD9YJa3TwuJ15orF5D5W6LCT3/I43zyhScfqLAPmwzRuKsCqe+UzFR2ZX0lWwKLSRU0RhWXKjjG4czX4GSCD1Zkpp/CdosR9JG1mUsaI/Dv9HAhtTYCLB1v6cQJZ4WSINCSyGCAjBUi/cTngltm/a/+FzPvnstGrVyuaWmRx2G4WXLGLZPn1gaY/ayfvlU9WR7wOkBvT6L14CXG7cSCsbraE7hIQLdSKb3pn3BWrb+Ta2IdllXhBz3a9gE5XwGAasJGfpClmVAEJ/LVt7Z8T2cmdyyZd3jArBuwJ/gS/sTJvzFe+g3cDhRVXM8w+0hppSepMxTZV4lGSwIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAKCjtkoVi6W6/m49lGLcpOnwUutmZNoNFSyrKodsQSYK1rg++/ZwyFB5HyGWWea4XJrJXHo11TG1zw6ONiWjownQmKaT3zlgA58ZMTo7wPDGpRDA5gVqJ7chyQuTEPtVmQpMe8qLk45GtN3Sgjj0ylEmbDGM99/ng8nthVG7KpiQO/YVgUDNf2/0CwrJuQ3AiCzFLygxMSM9hkYeLRO9Rj2E+YKOB3SrqL6XJ9/JEBUTelpgCqTuoiKzxnf4CEzz05wuo2VeMD2VjCxm5VGY8/Bz5X3gNkLCZNnU78s26noh3IVd4IQ6ONTFxY+lkfrNbX75X2IlwvTEazo8RofePlU=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"f87344b1b2d045a896504533e7cde0c3"}, [
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
  '4aa4b75d-4df8-4d0f-98bd-15e976eab2a7',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.123.117;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 02 Jul 2020 18:45:12 GMT',
  'Content-Length',
  '1347'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroRecoverCertificateName-canresumefromastoppedpoller-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroRecoverCertificateName-canresumefromastoppedpoller-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAtanVyXd8KyD9YJa3TwuJ15orF5D5W6LCT3/I43zyhScfqLAPmwzRuKsCqe+UzFR2ZX0lWwKLSRU0RhWXKjjG4czX4GSCD1Zkpp/CdosR9JG1mUsaI/Dv9HAhtTYCLB1v6cQJZ4WSINCSyGCAjBUi/cTngltm/a/+FzPvnstGrVyuaWmRx2G4WXLGLZPn1gaY/ayfvlU9WR7wOkBvT6L14CXG7cSCsbraE7hIQLdSKb3pn3BWrb+Ta2IdllXhBz3a9gE5XwGAasJGfpClmVAEJ/LVt7Z8T2cmdyyZd3jArBuwJ/gS/sTJvzFe+g3cDhRVXM8w+0hppSepMxTZV4lGSwIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAKCjtkoVi6W6/m49lGLcpOnwUutmZNoNFSyrKodsQSYK1rg++/ZwyFB5HyGWWea4XJrJXHo11TG1zw6ONiWjownQmKaT3zlgA58ZMTo7wPDGpRDA5gVqJ7chyQuTEPtVmQpMe8qLk45GtN3Sgjj0ylEmbDGM99/ng8nthVG7KpiQO/YVgUDNf2/0CwrJuQ3AiCzFLygxMSM9hkYeLRO9Rj2E+YKOB3SrqL6XJ9/JEBUTelpgCqTuoiKzxnf4CEzz05wuo2VeMD2VjCxm5VGY8/Bz5X3gNkLCZNnU78s26noh3IVd4IQ6ONTFxY+lkfrNbX75X2IlwvTEazo8RofePlU=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"f87344b1b2d045a896504533e7cde0c3"}, [
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
  'd64a0af1-24f2-4e62-a7c3-7b0e878b09b8',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.123.117;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 02 Jul 2020 18:45:14 GMT',
  'Content-Length',
  '1347'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroRecoverCertificateName-canresumefromastoppedpoller-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroRecoverCertificateName-canresumefromastoppedpoller-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAtanVyXd8KyD9YJa3TwuJ15orF5D5W6LCT3/I43zyhScfqLAPmwzRuKsCqe+UzFR2ZX0lWwKLSRU0RhWXKjjG4czX4GSCD1Zkpp/CdosR9JG1mUsaI/Dv9HAhtTYCLB1v6cQJZ4WSINCSyGCAjBUi/cTngltm/a/+FzPvnstGrVyuaWmRx2G4WXLGLZPn1gaY/ayfvlU9WR7wOkBvT6L14CXG7cSCsbraE7hIQLdSKb3pn3BWrb+Ta2IdllXhBz3a9gE5XwGAasJGfpClmVAEJ/LVt7Z8T2cmdyyZd3jArBuwJ/gS/sTJvzFe+g3cDhRVXM8w+0hppSepMxTZV4lGSwIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAKCjtkoVi6W6/m49lGLcpOnwUutmZNoNFSyrKodsQSYK1rg++/ZwyFB5HyGWWea4XJrJXHo11TG1zw6ONiWjownQmKaT3zlgA58ZMTo7wPDGpRDA5gVqJ7chyQuTEPtVmQpMe8qLk45GtN3Sgjj0ylEmbDGM99/ng8nthVG7KpiQO/YVgUDNf2/0CwrJuQ3AiCzFLygxMSM9hkYeLRO9Rj2E+YKOB3SrqL6XJ9/JEBUTelpgCqTuoiKzxnf4CEzz05wuo2VeMD2VjCxm5VGY8/Bz5X3gNkLCZNnU78s26noh3IVd4IQ6ONTFxY+lkfrNbX75X2IlwvTEazo8RofePlU=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"f87344b1b2d045a896504533e7cde0c3"}, [
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
  '4b4082d7-2e46-4c36-9f8d-e2517ae6685b',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.123.117;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 02 Jul 2020 18:45:16 GMT',
  'Content-Length',
  '1347'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroRecoverCertificateName-canresumefromastoppedpoller-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroRecoverCertificateName-canresumefromastoppedpoller-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAtanVyXd8KyD9YJa3TwuJ15orF5D5W6LCT3/I43zyhScfqLAPmwzRuKsCqe+UzFR2ZX0lWwKLSRU0RhWXKjjG4czX4GSCD1Zkpp/CdosR9JG1mUsaI/Dv9HAhtTYCLB1v6cQJZ4WSINCSyGCAjBUi/cTngltm/a/+FzPvnstGrVyuaWmRx2G4WXLGLZPn1gaY/ayfvlU9WR7wOkBvT6L14CXG7cSCsbraE7hIQLdSKb3pn3BWrb+Ta2IdllXhBz3a9gE5XwGAasJGfpClmVAEJ/LVt7Z8T2cmdyyZd3jArBuwJ/gS/sTJvzFe+g3cDhRVXM8w+0hppSepMxTZV4lGSwIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAKCjtkoVi6W6/m49lGLcpOnwUutmZNoNFSyrKodsQSYK1rg++/ZwyFB5HyGWWea4XJrJXHo11TG1zw6ONiWjownQmKaT3zlgA58ZMTo7wPDGpRDA5gVqJ7chyQuTEPtVmQpMe8qLk45GtN3Sgjj0ylEmbDGM99/ng8nthVG7KpiQO/YVgUDNf2/0CwrJuQ3AiCzFLygxMSM9hkYeLRO9Rj2E+YKOB3SrqL6XJ9/JEBUTelpgCqTuoiKzxnf4CEzz05wuo2VeMD2VjCxm5VGY8/Bz5X3gNkLCZNnU78s26noh3IVd4IQ6ONTFxY+lkfrNbX75X2IlwvTEazo8RofePlU=","cancellation_requested":false,"status":"completed","target":"https://keyvault_name.vault.azure.net/certificates/lroRecoverCertificateName-canresumefromastoppedpoller-","request_id":"f87344b1b2d045a896504533e7cde0c3"}, [
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
  '45c1bbe3-0272-4d6f-83dc-34d42395cd9f',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.123.117;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 02 Jul 2020 18:45:17 GMT',
  'Content-Length',
  '1321'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroRecoverCertificateName-canresumefromastoppedpoller-/')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroRecoverCertificateName-canresumefromastoppedpoller-/e0f93ab7b9d841f08dc43bb0ebc7c75d","kid":"https://keyvault_name.vault.azure.net/keys/lroRecoverCertificateName-canresumefromastoppedpoller-/e0f93ab7b9d841f08dc43bb0ebc7c75d","sid":"https://keyvault_name.vault.azure.net/secrets/lroRecoverCertificateName-canresumefromastoppedpoller-/e0f93ab7b9d841f08dc43bb0ebc7c75d","x5t":"7KQqwtl1LfGcTJE4Cbi9fIjSX-w","cer":"MIIDKDCCAhCgAwIBAgIQSFKhtMLURDuBKk4wb+rxsjANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjAwNzAyMTgzNTE2WhcNMjEwNzAyMTg0NTE2WjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQC1qdXJd3wrIP1glrdPC4nXmisXkPlbosJPf8jjfPKFJx+osA+bDNG4qwKp75TMVHZlfSVbAotJFTRGFZcqOMbhzNfgZIIPVmSmn8J2ixH0kbWZSxoj8O/0cCG1NgIsHW/pxAlnhZIg0JLIYICMFSL9xOeCW2b9r/4XM++ey0atXK5paZHHYbhZcsYtk+fWBpj9rJ++VT1ZHvA6QG9PovXgJcbtxIKxutoTuEhAt1IpvemfcFatv5NrYh2WVeEHPdr2ATlfAYBqwkZ+kKWZUAQn8tW3tnxPZyZ3LJl3eMCsG7An+BL+xMm/MV76DdwOFFVczzD7SGmlJ6kzFNlXiUZLAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBQ7m30YRyGSNzTldTa6JvrrLte6QjAdBgNVHQ4EFgQUO5t9GEchkjc05XU2uib66y7XukIwDQYJKoZIhvcNAQELBQADggEBAB9GbQupqhdU4bOhoSZ3SIUEk+tAsA25rrHYmJpjpZTZttjPx0mZ8YdbhpSIuRcSdj2IaTzG2C8DZQC+EfN+Gw/O1JIRlwpB+VLBfhwB9rvtbxKP5OEDIGlZhZbMw8N1dorYrkuxcLiEBDU9WQLCO1XmxhlSq0bTjDndOtgH5xDpLIoWYOJyTtcMmvztuYKoZWLtreAp8x+nCnglBr20fjamepqbDgNE5wpRskCbMLj6Dk2H77A+dRlr2R77wu+0nDXJyU8I8iUVm2+bkGag6kSDVFt0h4xZjMB4QrI0u5hqs4LIhTzf9xio2LLjOaOJbZeU2mKegVygmTRVCkp7sE0=","attributes":{"enabled":true,"nbf":1593714916,"exp":1625251516,"created":1593715517,"updated":1593715517,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/lroRecoverCertificateName-canresumefromastoppedpoller-/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1593715499,"updated":1593715499}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/lroRecoverCertificateName-canresumefromastoppedpoller-/pending"}}, [
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
  '8f37c7e4-1245-437b-a777-38d3f831e096',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.123.117;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 02 Jul 2020 18:45:18 GMT',
  'Content-Length',
  '2625'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/certificates/lroRecoverCertificateName-canresumefromastoppedpoller-')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/lroRecoverCertificateName-canresumefromastoppedpoller-","deletedDate":1593715518,"scheduledPurgeDate":1601491518,"id":"https://keyvault_name.vault.azure.net/certificates/lroRecoverCertificateName-canresumefromastoppedpoller-/e0f93ab7b9d841f08dc43bb0ebc7c75d","kid":"https://keyvault_name.vault.azure.net/keys/lroRecoverCertificateName-canresumefromastoppedpoller-/e0f93ab7b9d841f08dc43bb0ebc7c75d","sid":"https://keyvault_name.vault.azure.net/secrets/lroRecoverCertificateName-canresumefromastoppedpoller-/e0f93ab7b9d841f08dc43bb0ebc7c75d","x5t":"7KQqwtl1LfGcTJE4Cbi9fIjSX-w","cer":"MIIDKDCCAhCgAwIBAgIQSFKhtMLURDuBKk4wb+rxsjANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjAwNzAyMTgzNTE2WhcNMjEwNzAyMTg0NTE2WjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQC1qdXJd3wrIP1glrdPC4nXmisXkPlbosJPf8jjfPKFJx+osA+bDNG4qwKp75TMVHZlfSVbAotJFTRGFZcqOMbhzNfgZIIPVmSmn8J2ixH0kbWZSxoj8O/0cCG1NgIsHW/pxAlnhZIg0JLIYICMFSL9xOeCW2b9r/4XM++ey0atXK5paZHHYbhZcsYtk+fWBpj9rJ++VT1ZHvA6QG9PovXgJcbtxIKxutoTuEhAt1IpvemfcFatv5NrYh2WVeEHPdr2ATlfAYBqwkZ+kKWZUAQn8tW3tnxPZyZ3LJl3eMCsG7An+BL+xMm/MV76DdwOFFVczzD7SGmlJ6kzFNlXiUZLAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBQ7m30YRyGSNzTldTa6JvrrLte6QjAdBgNVHQ4EFgQUO5t9GEchkjc05XU2uib66y7XukIwDQYJKoZIhvcNAQELBQADggEBAB9GbQupqhdU4bOhoSZ3SIUEk+tAsA25rrHYmJpjpZTZttjPx0mZ8YdbhpSIuRcSdj2IaTzG2C8DZQC+EfN+Gw/O1JIRlwpB+VLBfhwB9rvtbxKP5OEDIGlZhZbMw8N1dorYrkuxcLiEBDU9WQLCO1XmxhlSq0bTjDndOtgH5xDpLIoWYOJyTtcMmvztuYKoZWLtreAp8x+nCnglBr20fjamepqbDgNE5wpRskCbMLj6Dk2H77A+dRlr2R77wu+0nDXJyU8I8iUVm2+bkGag6kSDVFt0h4xZjMB4QrI0u5hqs4LIhTzf9xio2LLjOaOJbZeU2mKegVygmTRVCkp7sE0=","attributes":{"enabled":true,"nbf":1593714916,"exp":1625251516,"created":1593715517,"updated":1593715517,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/lroRecoverCertificateName-canresumefromastoppedpoller-/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1593715499,"updated":1593715499}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/lroRecoverCertificateName-canresumefromastoppedpoller-/pending"}}, [
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
  '1c4e8714-251a-4330-a153-e5facc5d6d7d',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.123.117;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 02 Jul 2020 18:45:18 GMT',
  'Content-Length',
  '2832'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroRecoverCertificateName-canresumefromastoppedpoller-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroRecoverCertificateName-canresumefromastoppedpoller-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '155',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '23375f43-0ab4-454c-a462-2f26b0806c5a',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.123.117;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 02 Jul 2020 18:45:18 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroRecoverCertificateName-canresumefromastoppedpoller-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroRecoverCertificateName-canresumefromastoppedpoller-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '155',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'ae95656b-a7e2-4513-8f43-36e1cd83d27e',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.123.117;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 02 Jul 2020 18:45:18 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroRecoverCertificateName-canresumefromastoppedpoller-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroRecoverCertificateName-canresumefromastoppedpoller-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '155',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '3473b787-5a93-4f65-a17c-370ba5dc0e4e',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.123.117;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 02 Jul 2020 18:45:20 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroRecoverCertificateName-canresumefromastoppedpoller-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroRecoverCertificateName-canresumefromastoppedpoller-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '155',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '985c22e7-244f-4615-9e44-c54ac3184f09',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.123.117;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 02 Jul 2020 18:45:22 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroRecoverCertificateName-canresumefromastoppedpoller-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroRecoverCertificateName-canresumefromastoppedpoller-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '155',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'ff2bc792-13f1-4e63-952f-1e71493f7c8a',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.123.117;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 02 Jul 2020 18:45:24 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroRecoverCertificateName-canresumefromastoppedpoller-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroRecoverCertificateName-canresumefromastoppedpoller-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '155',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '8f3868ec-1ab5-47c0-84f8-471ba9170f5e',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.123.117;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 02 Jul 2020 18:45:26 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroRecoverCertificateName-canresumefromastoppedpoller-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroRecoverCertificateName-canresumefromastoppedpoller-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '155',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '82f98ff8-8d48-4e1d-a363-ce251351c5de',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.123.117;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 02 Jul 2020 18:45:28 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroRecoverCertificateName-canresumefromastoppedpoller-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroRecoverCertificateName-canresumefromastoppedpoller-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '155',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'cd13aec9-6cfd-4d71-b53a-5c904926111f',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.123.117;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 02 Jul 2020 18:45:30 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroRecoverCertificateName-canresumefromastoppedpoller-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroRecoverCertificateName-canresumefromastoppedpoller-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '155',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '159887a0-e939-4b62-acf4-df7cdf662cd4',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.123.117;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 02 Jul 2020 18:45:32 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroRecoverCertificateName-canresumefromastoppedpoller-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroRecoverCertificateName-canresumefromastoppedpoller-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '155',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'd8224d43-c72b-4ff7-b50b-fc0d991aa63f',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.123.117;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 02 Jul 2020 18:45:34 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroRecoverCertificateName-canresumefromastoppedpoller-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroRecoverCertificateName-canresumefromastoppedpoller-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '155',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'afdc7eb6-20c3-42de-87a8-e0cb57afc72e',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.123.117;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 02 Jul 2020 18:45:36 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroRecoverCertificateName-canresumefromastoppedpoller-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroRecoverCertificateName-canresumefromastoppedpoller-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '155',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '812e071e-f594-458d-b6a5-30f611833291',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.123.117;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 02 Jul 2020 18:45:38 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroRecoverCertificateName-canresumefromastoppedpoller-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroRecoverCertificateName-canresumefromastoppedpoller-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '155',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'b7fe4405-7bad-4dee-a2c5-8fae818889e6',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.123.117;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 02 Jul 2020 18:45:40 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroRecoverCertificateName-canresumefromastoppedpoller-')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/lroRecoverCertificateName-canresumefromastoppedpoller-","deletedDate":1593715518,"scheduledPurgeDate":1601491518,"id":"https://keyvault_name.vault.azure.net/certificates/lroRecoverCertificateName-canresumefromastoppedpoller-/e0f93ab7b9d841f08dc43bb0ebc7c75d","kid":"https://keyvault_name.vault.azure.net/keys/lroRecoverCertificateName-canresumefromastoppedpoller-/e0f93ab7b9d841f08dc43bb0ebc7c75d","sid":"https://keyvault_name.vault.azure.net/secrets/lroRecoverCertificateName-canresumefromastoppedpoller-/e0f93ab7b9d841f08dc43bb0ebc7c75d","x5t":"7KQqwtl1LfGcTJE4Cbi9fIjSX-w","cer":"MIIDKDCCAhCgAwIBAgIQSFKhtMLURDuBKk4wb+rxsjANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjAwNzAyMTgzNTE2WhcNMjEwNzAyMTg0NTE2WjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQC1qdXJd3wrIP1glrdPC4nXmisXkPlbosJPf8jjfPKFJx+osA+bDNG4qwKp75TMVHZlfSVbAotJFTRGFZcqOMbhzNfgZIIPVmSmn8J2ixH0kbWZSxoj8O/0cCG1NgIsHW/pxAlnhZIg0JLIYICMFSL9xOeCW2b9r/4XM++ey0atXK5paZHHYbhZcsYtk+fWBpj9rJ++VT1ZHvA6QG9PovXgJcbtxIKxutoTuEhAt1IpvemfcFatv5NrYh2WVeEHPdr2ATlfAYBqwkZ+kKWZUAQn8tW3tnxPZyZ3LJl3eMCsG7An+BL+xMm/MV76DdwOFFVczzD7SGmlJ6kzFNlXiUZLAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBQ7m30YRyGSNzTldTa6JvrrLte6QjAdBgNVHQ4EFgQUO5t9GEchkjc05XU2uib66y7XukIwDQYJKoZIhvcNAQELBQADggEBAB9GbQupqhdU4bOhoSZ3SIUEk+tAsA25rrHYmJpjpZTZttjPx0mZ8YdbhpSIuRcSdj2IaTzG2C8DZQC+EfN+Gw/O1JIRlwpB+VLBfhwB9rvtbxKP5OEDIGlZhZbMw8N1dorYrkuxcLiEBDU9WQLCO1XmxhlSq0bTjDndOtgH5xDpLIoWYOJyTtcMmvztuYKoZWLtreAp8x+nCnglBr20fjamepqbDgNE5wpRskCbMLj6Dk2H77A+dRlr2R77wu+0nDXJyU8I8iUVm2+bkGag6kSDVFt0h4xZjMB4QrI0u5hqs4LIhTzf9xio2LLjOaOJbZeU2mKegVygmTRVCkp7sE0=","attributes":{"enabled":true,"nbf":1593714916,"exp":1625251516,"created":1593715517,"updated":1593715517,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/lroRecoverCertificateName-canresumefromastoppedpoller-/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1593715499,"updated":1593715499}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/lroRecoverCertificateName-canresumefromastoppedpoller-/pending"}}, [
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
  'f1130c12-bab3-4308-a164-c7aec690cb22',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.123.117;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 02 Jul 2020 18:45:42 GMT',
  'Content-Length',
  '2832'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroRecoverCertificateName-canresumefromastoppedpoller-/')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"A certificate with (name/id) lroRecoverCertificateName-canresumefromastoppedpoller- was not found in this key vault. If you recently deleted this certificate you may be able to recover it using the correct recovery command. For help resolving this issue, please see https://go.microsoft.com/fwlink/?linkid=2125182"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '383',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '7970dd9c-4f92-4b96-b172-fc4de186ab9b',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.123.117;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 02 Jul 2020 18:45:42 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/deletedcertificates/lroRecoverCertificateName-canresumefromastoppedpoller-/recover')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroRecoverCertificateName-canresumefromastoppedpoller-/e0f93ab7b9d841f08dc43bb0ebc7c75d","kid":"https://keyvault_name.vault.azure.net/keys/lroRecoverCertificateName-canresumefromastoppedpoller-/e0f93ab7b9d841f08dc43bb0ebc7c75d","sid":"https://keyvault_name.vault.azure.net/secrets/lroRecoverCertificateName-canresumefromastoppedpoller-/e0f93ab7b9d841f08dc43bb0ebc7c75d","x5t":"7KQqwtl1LfGcTJE4Cbi9fIjSX-w","cer":"MIIDKDCCAhCgAwIBAgIQSFKhtMLURDuBKk4wb+rxsjANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjAwNzAyMTgzNTE2WhcNMjEwNzAyMTg0NTE2WjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQC1qdXJd3wrIP1glrdPC4nXmisXkPlbosJPf8jjfPKFJx+osA+bDNG4qwKp75TMVHZlfSVbAotJFTRGFZcqOMbhzNfgZIIPVmSmn8J2ixH0kbWZSxoj8O/0cCG1NgIsHW/pxAlnhZIg0JLIYICMFSL9xOeCW2b9r/4XM++ey0atXK5paZHHYbhZcsYtk+fWBpj9rJ++VT1ZHvA6QG9PovXgJcbtxIKxutoTuEhAt1IpvemfcFatv5NrYh2WVeEHPdr2ATlfAYBqwkZ+kKWZUAQn8tW3tnxPZyZ3LJl3eMCsG7An+BL+xMm/MV76DdwOFFVczzD7SGmlJ6kzFNlXiUZLAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBQ7m30YRyGSNzTldTa6JvrrLte6QjAdBgNVHQ4EFgQUO5t9GEchkjc05XU2uib66y7XukIwDQYJKoZIhvcNAQELBQADggEBAB9GbQupqhdU4bOhoSZ3SIUEk+tAsA25rrHYmJpjpZTZttjPx0mZ8YdbhpSIuRcSdj2IaTzG2C8DZQC+EfN+Gw/O1JIRlwpB+VLBfhwB9rvtbxKP5OEDIGlZhZbMw8N1dorYrkuxcLiEBDU9WQLCO1XmxhlSq0bTjDndOtgH5xDpLIoWYOJyTtcMmvztuYKoZWLtreAp8x+nCnglBr20fjamepqbDgNE5wpRskCbMLj6Dk2H77A+dRlr2R77wu+0nDXJyU8I8iUVm2+bkGag6kSDVFt0h4xZjMB4QrI0u5hqs4LIhTzf9xio2LLjOaOJbZeU2mKegVygmTRVCkp7sE0=","attributes":{"enabled":true,"nbf":1593714916,"exp":1625251516,"created":1593715517,"updated":1593715517,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/lroRecoverCertificateName-canresumefromastoppedpoller-/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1593715499,"updated":1593715499}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/lroRecoverCertificateName-canresumefromastoppedpoller-/pending"}}, [
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
  'd7970fcb-7979-4f95-b793-2112dae4dc71',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.123.117;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 02 Jul 2020 18:45:42 GMT',
  'Content-Length',
  '2625'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroRecoverCertificateName-canresumefromastoppedpoller-/')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"A certificate with (name/id) lroRecoverCertificateName-canresumefromastoppedpoller- was not found in this key vault. If you recently deleted this certificate you may be able to recover it using the correct recovery command. For help resolving this issue, please see https://go.microsoft.com/fwlink/?linkid=2125182"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '383',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '1ea78d47-1179-4398-ab3b-8be5494df44d',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.123.117;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 02 Jul 2020 18:45:42 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroRecoverCertificateName-canresumefromastoppedpoller-/')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"A certificate with (name/id) lroRecoverCertificateName-canresumefromastoppedpoller- was not found in this key vault. If you recently deleted this certificate you may be able to recover it using the correct recovery command. For help resolving this issue, please see https://go.microsoft.com/fwlink/?linkid=2125182"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '383',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '38b33387-50bf-40b6-9bb7-cdd75869e834',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.123.117;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 02 Jul 2020 18:45:42 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroRecoverCertificateName-canresumefromastoppedpoller-/')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"A certificate with (name/id) lroRecoverCertificateName-canresumefromastoppedpoller- was not found in this key vault. If you recently deleted this certificate you may be able to recover it using the correct recovery command. For help resolving this issue, please see https://go.microsoft.com/fwlink/?linkid=2125182"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '383',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '8678e078-4c85-4747-b563-8acebc2940fe',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.123.117;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 02 Jul 2020 18:45:42 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroRecoverCertificateName-canresumefromastoppedpoller-/')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"A certificate with (name/id) lroRecoverCertificateName-canresumefromastoppedpoller- was not found in this key vault. If you recently deleted this certificate you may be able to recover it using the correct recovery command. For help resolving this issue, please see https://go.microsoft.com/fwlink/?linkid=2125182"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '383',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'c8d21887-9b18-49ae-b9ed-f8ea55eb5e9b',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.123.117;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 02 Jul 2020 18:45:42 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroRecoverCertificateName-canresumefromastoppedpoller-/')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"A certificate with (name/id) lroRecoverCertificateName-canresumefromastoppedpoller- was not found in this key vault. If you recently deleted this certificate you may be able to recover it using the correct recovery command. For help resolving this issue, please see https://go.microsoft.com/fwlink/?linkid=2125182"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '383',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '0cdc739f-4118-4b07-bcea-71f806e8863a',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.123.117;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 02 Jul 2020 18:45:44 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroRecoverCertificateName-canresumefromastoppedpoller-/')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"A certificate with (name/id) lroRecoverCertificateName-canresumefromastoppedpoller- was not found in this key vault. If you recently deleted this certificate you may be able to recover it using the correct recovery command. For help resolving this issue, please see https://go.microsoft.com/fwlink/?linkid=2125182"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '383',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '13defdfe-6bf4-4dcd-93ed-2bd5baa3c526',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.123.117;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 02 Jul 2020 18:45:47 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroRecoverCertificateName-canresumefromastoppedpoller-/')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"A certificate with (name/id) lroRecoverCertificateName-canresumefromastoppedpoller- was not found in this key vault. If you recently deleted this certificate you may be able to recover it using the correct recovery command. For help resolving this issue, please see https://go.microsoft.com/fwlink/?linkid=2125182"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '383',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '869930eb-5b4c-4bbc-adfd-335c97541726',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.123.117;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 02 Jul 2020 18:45:49 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroRecoverCertificateName-canresumefromastoppedpoller-/')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"A certificate with (name/id) lroRecoverCertificateName-canresumefromastoppedpoller- was not found in this key vault. If you recently deleted this certificate you may be able to recover it using the correct recovery command. For help resolving this issue, please see https://go.microsoft.com/fwlink/?linkid=2125182"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '383',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'aee5cf7d-2e5c-4ac6-ad8b-3728aeed5562',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.123.117;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 02 Jul 2020 18:45:51 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroRecoverCertificateName-canresumefromastoppedpoller-/')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"A certificate with (name/id) lroRecoverCertificateName-canresumefromastoppedpoller- was not found in this key vault. If you recently deleted this certificate you may be able to recover it using the correct recovery command. For help resolving this issue, please see https://go.microsoft.com/fwlink/?linkid=2125182"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '383',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '89d79cc3-a9ec-4e2b-9225-0fdd4e05f7f6',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.123.117;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 02 Jul 2020 18:45:53 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroRecoverCertificateName-canresumefromastoppedpoller-/')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"A certificate with (name/id) lroRecoverCertificateName-canresumefromastoppedpoller- was not found in this key vault. If you recently deleted this certificate you may be able to recover it using the correct recovery command. For help resolving this issue, please see https://go.microsoft.com/fwlink/?linkid=2125182"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '383',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '75f71de0-f957-49be-843b-bf769fdf9ec9',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.123.117;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 02 Jul 2020 18:45:55 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroRecoverCertificateName-canresumefromastoppedpoller-/')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"A certificate with (name/id) lroRecoverCertificateName-canresumefromastoppedpoller- was not found in this key vault. If you recently deleted this certificate you may be able to recover it using the correct recovery command. For help resolving this issue, please see https://go.microsoft.com/fwlink/?linkid=2125182"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '383',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'f7453119-c8ca-4e6c-a9c2-0e42191482c9',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.123.117;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 02 Jul 2020 18:45:57 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroRecoverCertificateName-canresumefromastoppedpoller-/')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"A certificate with (name/id) lroRecoverCertificateName-canresumefromastoppedpoller- was not found in this key vault. If you recently deleted this certificate you may be able to recover it using the correct recovery command. For help resolving this issue, please see https://go.microsoft.com/fwlink/?linkid=2125182"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '383',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'f7b323d2-1451-4598-b06b-dcf5446e81d1',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.123.117;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 02 Jul 2020 18:45:59 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroRecoverCertificateName-canresumefromastoppedpoller-/')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"A certificate with (name/id) lroRecoverCertificateName-canresumefromastoppedpoller- was not found in this key vault. If you recently deleted this certificate you may be able to recover it using the correct recovery command. For help resolving this issue, please see https://go.microsoft.com/fwlink/?linkid=2125182"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '383',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '0b2c433f-fc5f-489a-a34b-f03918cdf1f3',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.123.117;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 02 Jul 2020 18:46:01 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroRecoverCertificateName-canresumefromastoppedpoller-/')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"A certificate with (name/id) lroRecoverCertificateName-canresumefromastoppedpoller- was not found in this key vault. If you recently deleted this certificate you may be able to recover it using the correct recovery command. For help resolving this issue, please see https://go.microsoft.com/fwlink/?linkid=2125182"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '383',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'daf959b0-b699-4458-bde3-b1209d55ebd7',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.123.117;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 02 Jul 2020 18:46:03 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroRecoverCertificateName-canresumefromastoppedpoller-/')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroRecoverCertificateName-canresumefromastoppedpoller-/e0f93ab7b9d841f08dc43bb0ebc7c75d","kid":"https://keyvault_name.vault.azure.net/keys/lroRecoverCertificateName-canresumefromastoppedpoller-/e0f93ab7b9d841f08dc43bb0ebc7c75d","sid":"https://keyvault_name.vault.azure.net/secrets/lroRecoverCertificateName-canresumefromastoppedpoller-/e0f93ab7b9d841f08dc43bb0ebc7c75d","x5t":"7KQqwtl1LfGcTJE4Cbi9fIjSX-w","cer":"MIIDKDCCAhCgAwIBAgIQSFKhtMLURDuBKk4wb+rxsjANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjAwNzAyMTgzNTE2WhcNMjEwNzAyMTg0NTE2WjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQC1qdXJd3wrIP1glrdPC4nXmisXkPlbosJPf8jjfPKFJx+osA+bDNG4qwKp75TMVHZlfSVbAotJFTRGFZcqOMbhzNfgZIIPVmSmn8J2ixH0kbWZSxoj8O/0cCG1NgIsHW/pxAlnhZIg0JLIYICMFSL9xOeCW2b9r/4XM++ey0atXK5paZHHYbhZcsYtk+fWBpj9rJ++VT1ZHvA6QG9PovXgJcbtxIKxutoTuEhAt1IpvemfcFatv5NrYh2WVeEHPdr2ATlfAYBqwkZ+kKWZUAQn8tW3tnxPZyZ3LJl3eMCsG7An+BL+xMm/MV76DdwOFFVczzD7SGmlJ6kzFNlXiUZLAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBQ7m30YRyGSNzTldTa6JvrrLte6QjAdBgNVHQ4EFgQUO5t9GEchkjc05XU2uib66y7XukIwDQYJKoZIhvcNAQELBQADggEBAB9GbQupqhdU4bOhoSZ3SIUEk+tAsA25rrHYmJpjpZTZttjPx0mZ8YdbhpSIuRcSdj2IaTzG2C8DZQC+EfN+Gw/O1JIRlwpB+VLBfhwB9rvtbxKP5OEDIGlZhZbMw8N1dorYrkuxcLiEBDU9WQLCO1XmxhlSq0bTjDndOtgH5xDpLIoWYOJyTtcMmvztuYKoZWLtreAp8x+nCnglBr20fjamepqbDgNE5wpRskCbMLj6Dk2H77A+dRlr2R77wu+0nDXJyU8I8iUVm2+bkGag6kSDVFt0h4xZjMB4QrI0u5hqs4LIhTzf9xio2LLjOaOJbZeU2mKegVygmTRVCkp7sE0=","attributes":{"enabled":true,"nbf":1593714916,"exp":1625251516,"created":1593715517,"updated":1593715517,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/lroRecoverCertificateName-canresumefromastoppedpoller-/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1593715499,"updated":1593715499}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/lroRecoverCertificateName-canresumefromastoppedpoller-/pending"}}, [
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
  'a74f97f3-4c58-4328-9784-63d2c70b76ba',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.123.117;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 02 Jul 2020 18:46:06 GMT',
  'Content-Length',
  '2625'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/certificates/lroRecoverCertificateName-canresumefromastoppedpoller-')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/lroRecoverCertificateName-canresumefromastoppedpoller-","deletedDate":1593715566,"scheduledPurgeDate":1601491566,"id":"https://keyvault_name.vault.azure.net/certificates/lroRecoverCertificateName-canresumefromastoppedpoller-/e0f93ab7b9d841f08dc43bb0ebc7c75d","kid":"https://keyvault_name.vault.azure.net/keys/lroRecoverCertificateName-canresumefromastoppedpoller-/e0f93ab7b9d841f08dc43bb0ebc7c75d","sid":"https://keyvault_name.vault.azure.net/secrets/lroRecoverCertificateName-canresumefromastoppedpoller-/e0f93ab7b9d841f08dc43bb0ebc7c75d","x5t":"7KQqwtl1LfGcTJE4Cbi9fIjSX-w","cer":"MIIDKDCCAhCgAwIBAgIQSFKhtMLURDuBKk4wb+rxsjANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjAwNzAyMTgzNTE2WhcNMjEwNzAyMTg0NTE2WjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQC1qdXJd3wrIP1glrdPC4nXmisXkPlbosJPf8jjfPKFJx+osA+bDNG4qwKp75TMVHZlfSVbAotJFTRGFZcqOMbhzNfgZIIPVmSmn8J2ixH0kbWZSxoj8O/0cCG1NgIsHW/pxAlnhZIg0JLIYICMFSL9xOeCW2b9r/4XM++ey0atXK5paZHHYbhZcsYtk+fWBpj9rJ++VT1ZHvA6QG9PovXgJcbtxIKxutoTuEhAt1IpvemfcFatv5NrYh2WVeEHPdr2ATlfAYBqwkZ+kKWZUAQn8tW3tnxPZyZ3LJl3eMCsG7An+BL+xMm/MV76DdwOFFVczzD7SGmlJ6kzFNlXiUZLAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBQ7m30YRyGSNzTldTa6JvrrLte6QjAdBgNVHQ4EFgQUO5t9GEchkjc05XU2uib66y7XukIwDQYJKoZIhvcNAQELBQADggEBAB9GbQupqhdU4bOhoSZ3SIUEk+tAsA25rrHYmJpjpZTZttjPx0mZ8YdbhpSIuRcSdj2IaTzG2C8DZQC+EfN+Gw/O1JIRlwpB+VLBfhwB9rvtbxKP5OEDIGlZhZbMw8N1dorYrkuxcLiEBDU9WQLCO1XmxhlSq0bTjDndOtgH5xDpLIoWYOJyTtcMmvztuYKoZWLtreAp8x+nCnglBr20fjamepqbDgNE5wpRskCbMLj6Dk2H77A+dRlr2R77wu+0nDXJyU8I8iUVm2+bkGag6kSDVFt0h4xZjMB4QrI0u5hqs4LIhTzf9xio2LLjOaOJbZeU2mKegVygmTRVCkp7sE0=","attributes":{"enabled":true,"nbf":1593714916,"exp":1625251516,"created":1593715517,"updated":1593715517,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/lroRecoverCertificateName-canresumefromastoppedpoller-/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1593715499,"updated":1593715499}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/lroRecoverCertificateName-canresumefromastoppedpoller-/pending"}}, [
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
  'e0e32bcb-d60c-41c1-87f0-261d2023ec3c',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.123.117;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 02 Jul 2020 18:46:06 GMT',
  'Content-Length',
  '2832'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroRecoverCertificateName-canresumefromastoppedpoller-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroRecoverCertificateName-canresumefromastoppedpoller-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '155',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '2c03c0b4-f608-4457-9aed-04d39bc1506f',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.123.117;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 02 Jul 2020 18:46:06 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroRecoverCertificateName-canresumefromastoppedpoller-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroRecoverCertificateName-canresumefromastoppedpoller-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '155',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '020f03da-9c31-45f9-9c23-dfa3f7888896',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.123.117;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 02 Jul 2020 18:46:06 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroRecoverCertificateName-canresumefromastoppedpoller-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroRecoverCertificateName-canresumefromastoppedpoller-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '155',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'e4443ffe-4a7b-41b4-9d56-0bc4bdcf19ec',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.123.117;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 02 Jul 2020 18:46:08 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroRecoverCertificateName-canresumefromastoppedpoller-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroRecoverCertificateName-canresumefromastoppedpoller-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '155',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '47d4fa4d-7b6e-4ff1-a39b-f0b78a98a0b1',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.123.117;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 02 Jul 2020 18:46:10 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroRecoverCertificateName-canresumefromastoppedpoller-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroRecoverCertificateName-canresumefromastoppedpoller-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '155',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '9b94338c-f0b7-4e5e-99e1-e3b4bc6d5ab8',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.123.117;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 02 Jul 2020 18:46:11 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroRecoverCertificateName-canresumefromastoppedpoller-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroRecoverCertificateName-canresumefromastoppedpoller-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '155',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'a87510d8-5ec5-4ca6-a152-0498d310160d',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.123.117;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 02 Jul 2020 18:46:14 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroRecoverCertificateName-canresumefromastoppedpoller-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroRecoverCertificateName-canresumefromastoppedpoller-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '155',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'f883b6f7-d5b4-4984-96cb-6e48fa1d85e2',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.123.117;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 02 Jul 2020 18:46:16 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroRecoverCertificateName-canresumefromastoppedpoller-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroRecoverCertificateName-canresumefromastoppedpoller-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '155',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '25609600-5361-4207-b585-876c0799bd34',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.123.117;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 02 Jul 2020 18:46:17 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroRecoverCertificateName-canresumefromastoppedpoller-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroRecoverCertificateName-canresumefromastoppedpoller-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '155',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'b2798ec8-24e8-44ca-8e24-30a8f87cb746',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.123.117;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 02 Jul 2020 18:46:19 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroRecoverCertificateName-canresumefromastoppedpoller-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroRecoverCertificateName-canresumefromastoppedpoller-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '155',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '5364ec3f-02af-44e9-a799-4c3b83595849',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.123.117;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 02 Jul 2020 18:46:22 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroRecoverCertificateName-canresumefromastoppedpoller-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroRecoverCertificateName-canresumefromastoppedpoller-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '155',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '57653665-c0fa-4564-b847-8ddd32bcdb8b',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.123.117;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 02 Jul 2020 18:46:24 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroRecoverCertificateName-canresumefromastoppedpoller-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroRecoverCertificateName-canresumefromastoppedpoller-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '155',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '9d580fce-4a9c-4f07-bac9-e851e125f859',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.123.117;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 02 Jul 2020 18:46:26 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroRecoverCertificateName-canresumefromastoppedpoller-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroRecoverCertificateName-canresumefromastoppedpoller-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '155',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'af61a0ea-1cdc-4eee-a81f-b90f8637f5f4',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.123.117;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 02 Jul 2020 18:46:28 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroRecoverCertificateName-canresumefromastoppedpoller-')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/lroRecoverCertificateName-canresumefromastoppedpoller-","deletedDate":1593715566,"scheduledPurgeDate":1601491566,"id":"https://keyvault_name.vault.azure.net/certificates/lroRecoverCertificateName-canresumefromastoppedpoller-/e0f93ab7b9d841f08dc43bb0ebc7c75d","kid":"https://keyvault_name.vault.azure.net/keys/lroRecoverCertificateName-canresumefromastoppedpoller-/e0f93ab7b9d841f08dc43bb0ebc7c75d","sid":"https://keyvault_name.vault.azure.net/secrets/lroRecoverCertificateName-canresumefromastoppedpoller-/e0f93ab7b9d841f08dc43bb0ebc7c75d","x5t":"7KQqwtl1LfGcTJE4Cbi9fIjSX-w","cer":"MIIDKDCCAhCgAwIBAgIQSFKhtMLURDuBKk4wb+rxsjANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjAwNzAyMTgzNTE2WhcNMjEwNzAyMTg0NTE2WjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQC1qdXJd3wrIP1glrdPC4nXmisXkPlbosJPf8jjfPKFJx+osA+bDNG4qwKp75TMVHZlfSVbAotJFTRGFZcqOMbhzNfgZIIPVmSmn8J2ixH0kbWZSxoj8O/0cCG1NgIsHW/pxAlnhZIg0JLIYICMFSL9xOeCW2b9r/4XM++ey0atXK5paZHHYbhZcsYtk+fWBpj9rJ++VT1ZHvA6QG9PovXgJcbtxIKxutoTuEhAt1IpvemfcFatv5NrYh2WVeEHPdr2ATlfAYBqwkZ+kKWZUAQn8tW3tnxPZyZ3LJl3eMCsG7An+BL+xMm/MV76DdwOFFVczzD7SGmlJ6kzFNlXiUZLAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBQ7m30YRyGSNzTldTa6JvrrLte6QjAdBgNVHQ4EFgQUO5t9GEchkjc05XU2uib66y7XukIwDQYJKoZIhvcNAQELBQADggEBAB9GbQupqhdU4bOhoSZ3SIUEk+tAsA25rrHYmJpjpZTZttjPx0mZ8YdbhpSIuRcSdj2IaTzG2C8DZQC+EfN+Gw/O1JIRlwpB+VLBfhwB9rvtbxKP5OEDIGlZhZbMw8N1dorYrkuxcLiEBDU9WQLCO1XmxhlSq0bTjDndOtgH5xDpLIoWYOJyTtcMmvztuYKoZWLtreAp8x+nCnglBr20fjamepqbDgNE5wpRskCbMLj6Dk2H77A+dRlr2R77wu+0nDXJyU8I8iUVm2+bkGag6kSDVFt0h4xZjMB4QrI0u5hqs4LIhTzf9xio2LLjOaOJbZeU2mKegVygmTRVCkp7sE0=","attributes":{"enabled":true,"nbf":1593714916,"exp":1625251516,"created":1593715517,"updated":1593715517,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/lroRecoverCertificateName-canresumefromastoppedpoller-/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1593715499,"updated":1593715499}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/lroRecoverCertificateName-canresumefromastoppedpoller-/pending"}}, [
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
  '6b039289-1a18-4e26-9de4-63bf87f157c6',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.123.117;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 02 Jul 2020 18:46:30 GMT',
  'Content-Length',
  '2832'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedcertificates/lroRecoverCertificateName-canresumefromastoppedpoller-')
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
  '5c68f723-d208-4fb3-b77a-68226d552691',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.123.117;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 02 Jul 2020 18:46:30 GMT'
]);

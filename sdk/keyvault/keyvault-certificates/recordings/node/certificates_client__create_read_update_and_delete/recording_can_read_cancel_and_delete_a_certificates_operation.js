let nock = require('nock');

module.exports.hash = "c5cf0d5faa45aaa436fdd6d7c55b6830";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/certificates/CRUDCertificateName-canreadcancelanddeleteacertificatesoperation-/create')
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
  'westus2',
  'x-ms-request-id',
  '07d2b094-9cc4-498a-aa48-a07dbf99b010',
  'x-ms-keyvault-service-version',
  '1.2.164.2',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 16 Feb 2021 18:59:24 GMT'
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
  '7d87d169-c68d-40b7-93d5-3c11e1ca2f00',
  'x-ms-ests-server',
  '2.1.11496.6 - WUS2 ProdSlices',
  'Set-Cookie',
  'fpc=AufoSEQpIbxLjzJaYLa_pBMA4qsDEAAAACEMvtcOAAAA; expires=Thu, 18-Mar-2021 18:59:25 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 16 Feb 2021 18:59:24 GMT',
  'Content-Length',
  '1315'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/certificates/CRUDCertificateName-canreadcancelanddeleteacertificatesoperation-/create', {"policy":{"key_props":{},"secret_props":{},"x509_props":{"subject":"cn=MyCert","sans":{}},"issuer":{"name":"Self"},"attributes":{}},"attributes":{}})
  .query(true)
  .reply(202, {"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-canreadcancelanddeleteacertificatesoperation-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA3MAk0MZnGnSu9dKuuk4BH5cTgWtB6zFwN9jVBYiRI9b1FVRF2QoCbxGGM9DNXVn1qXpS7SJ1BX+FbP6ImJavrfOQ5iAyNS2SQaDngB25/kn6ytKfatjH8MKwceCteHRACmEuarBfl8ISBtNAxLdRbBpIJ6DCRIXxrq3NE5105BP/lD/iMFrRFijFlC14OmMUhG4ECH9IqPJ8NoHL3O4BS0v7aS2zjydBLuiZBfnNB9I5i0DT/Bs9yQNzMPeqZseW8miwHlLmXsY64TjjeocoMja/4TWl+d16HeWgUgbXxLlv4HtV+68bzQIZlAiTvBP4WX34CyjdaTVHoR/gHuCmOQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAEu3Q95kKq4yirALG1fxGTsPGqJOC2WLtsJC0F8cRfIKMxzyxaywlv/2mJuth55Iq3tKiopWgInHrIzjH8HOuKPaBKKu4Zj8W++bvis1gyJ/2MV5IZXsWYCoCPcGbxxwrExxSSnKczrV7d7sITkVUqy2tduRmwoISn+iph5IthapL4cVg03+77B138RZ+kAlkaTeJnxYJEYInwUR6CN0d7j9uQNqFLkKDpgoYc2l7sf6+wWMUksruX6Izh67YfJFyPMWxLYV1b4BBW9kpqBEacKAKmSvNDw+D5H03tuT1vKrwPs7/7tkb7pgNjLD/SZ92gxPf8goGD5Kas3e+teHSt8=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"1b0127faa085437e8321fe614d90cf9a"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-canreadcancelanddeleteacertificatesoperation-/pending?api-version=7.2&request_id=1b0127faa085437e8321fe614d90cf9a',
  'Retry-After',
  '10',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  'a9e490d1-bafd-4f2e-bb63-4c15fe349be3',
  'x-ms-keyvault-service-version',
  '1.2.164.2',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 16 Feb 2021 18:59:25 GMT',
  'Content-Length',
  '1348'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/CRUDCertificateName-canreadcancelanddeleteacertificatesoperation-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-canreadcancelanddeleteacertificatesoperation-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA3MAk0MZnGnSu9dKuuk4BH5cTgWtB6zFwN9jVBYiRI9b1FVRF2QoCbxGGM9DNXVn1qXpS7SJ1BX+FbP6ImJavrfOQ5iAyNS2SQaDngB25/kn6ytKfatjH8MKwceCteHRACmEuarBfl8ISBtNAxLdRbBpIJ6DCRIXxrq3NE5105BP/lD/iMFrRFijFlC14OmMUhG4ECH9IqPJ8NoHL3O4BS0v7aS2zjydBLuiZBfnNB9I5i0DT/Bs9yQNzMPeqZseW8miwHlLmXsY64TjjeocoMja/4TWl+d16HeWgUgbXxLlv4HtV+68bzQIZlAiTvBP4WX34CyjdaTVHoR/gHuCmOQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAEu3Q95kKq4yirALG1fxGTsPGqJOC2WLtsJC0F8cRfIKMxzyxaywlv/2mJuth55Iq3tKiopWgInHrIzjH8HOuKPaBKKu4Zj8W++bvis1gyJ/2MV5IZXsWYCoCPcGbxxwrExxSSnKczrV7d7sITkVUqy2tduRmwoISn+iph5IthapL4cVg03+77B138RZ+kAlkaTeJnxYJEYInwUR6CN0d7j9uQNqFLkKDpgoYc2l7sf6+wWMUksruX6Izh67YfJFyPMWxLYV1b4BBW9kpqBEacKAKmSvNDw+D5H03tuT1vKrwPs7/7tkb7pgNjLD/SZ92gxPf8goGD5Kas3e+teHSt8=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"1b0127faa085437e8321fe614d90cf9a"}, [
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
  'westus2',
  'x-ms-request-id',
  'e8c872b2-336c-418d-a307-b9cbe3a59cd3',
  'x-ms-keyvault-service-version',
  '1.2.164.2',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 16 Feb 2021 18:59:25 GMT',
  'Content-Length',
  '1348'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/CRUDCertificateName-canreadcancelanddeleteacertificatesoperation-/')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-canreadcancelanddeleteacertificatesoperation-/c28c10315afe4c57a2a43be038906be5","attributes":{"enabled":false,"nbf":1613501365,"exp":1645037965,"created":1613501965,"updated":1613501965,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-canreadcancelanddeleteacertificatesoperation-/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1613501965,"updated":1613501965}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-canreadcancelanddeleteacertificatesoperation-/pending"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  '7e6683f5-b5d2-48cc-9dfb-5453314fd0f3',
  'x-ms-keyvault-service-version',
  '1.2.164.2',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 16 Feb 2021 18:59:25 GMT',
  'Content-Length',
  '1184'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/CRUDCertificateName-canreadcancelanddeleteacertificatesoperation-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-canreadcancelanddeleteacertificatesoperation-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA3MAk0MZnGnSu9dKuuk4BH5cTgWtB6zFwN9jVBYiRI9b1FVRF2QoCbxGGM9DNXVn1qXpS7SJ1BX+FbP6ImJavrfOQ5iAyNS2SQaDngB25/kn6ytKfatjH8MKwceCteHRACmEuarBfl8ISBtNAxLdRbBpIJ6DCRIXxrq3NE5105BP/lD/iMFrRFijFlC14OmMUhG4ECH9IqPJ8NoHL3O4BS0v7aS2zjydBLuiZBfnNB9I5i0DT/Bs9yQNzMPeqZseW8miwHlLmXsY64TjjeocoMja/4TWl+d16HeWgUgbXxLlv4HtV+68bzQIZlAiTvBP4WX34CyjdaTVHoR/gHuCmOQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAEu3Q95kKq4yirALG1fxGTsPGqJOC2WLtsJC0F8cRfIKMxzyxaywlv/2mJuth55Iq3tKiopWgInHrIzjH8HOuKPaBKKu4Zj8W++bvis1gyJ/2MV5IZXsWYCoCPcGbxxwrExxSSnKczrV7d7sITkVUqy2tduRmwoISn+iph5IthapL4cVg03+77B138RZ+kAlkaTeJnxYJEYInwUR6CN0d7j9uQNqFLkKDpgoYc2l7sf6+wWMUksruX6Izh67YfJFyPMWxLYV1b4BBW9kpqBEacKAKmSvNDw+D5H03tuT1vKrwPs7/7tkb7pgNjLD/SZ92gxPf8goGD5Kas3e+teHSt8=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"1b0127faa085437e8321fe614d90cf9a"}, [
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
  'westus2',
  'x-ms-request-id',
  'a4114a3d-f15d-4e74-9a59-e0eccacf4420',
  'x-ms-keyvault-service-version',
  '1.2.164.2',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 16 Feb 2021 18:59:25 GMT',
  'Content-Length',
  '1348'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .patch('/certificates/CRUDCertificateName-canreadcancelanddeleteacertificatesoperation-/pending', {"cancellation_requested":true})
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-canreadcancelanddeleteacertificatesoperation-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA3MAk0MZnGnSu9dKuuk4BH5cTgWtB6zFwN9jVBYiRI9b1FVRF2QoCbxGGM9DNXVn1qXpS7SJ1BX+FbP6ImJavrfOQ5iAyNS2SQaDngB25/kn6ytKfatjH8MKwceCteHRACmEuarBfl8ISBtNAxLdRbBpIJ6DCRIXxrq3NE5105BP/lD/iMFrRFijFlC14OmMUhG4ECH9IqPJ8NoHL3O4BS0v7aS2zjydBLuiZBfnNB9I5i0DT/Bs9yQNzMPeqZseW8miwHlLmXsY64TjjeocoMja/4TWl+d16HeWgUgbXxLlv4HtV+68bzQIZlAiTvBP4WX34CyjdaTVHoR/gHuCmOQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAEu3Q95kKq4yirALG1fxGTsPGqJOC2WLtsJC0F8cRfIKMxzyxaywlv/2mJuth55Iq3tKiopWgInHrIzjH8HOuKPaBKKu4Zj8W++bvis1gyJ/2MV5IZXsWYCoCPcGbxxwrExxSSnKczrV7d7sITkVUqy2tduRmwoISn+iph5IthapL4cVg03+77B138RZ+kAlkaTeJnxYJEYInwUR6CN0d7j9uQNqFLkKDpgoYc2l7sf6+wWMUksruX6Izh67YfJFyPMWxLYV1b4BBW9kpqBEacKAKmSvNDw+D5H03tuT1vKrwPs7/7tkb7pgNjLD/SZ92gxPf8goGD5Kas3e+teHSt8=","cancellation_requested":true,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"1b0127faa085437e8321fe614d90cf9a"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  'bd8f188d-3fce-4d35-a3c6-32af6dad6787',
  'x-ms-keyvault-service-version',
  '1.2.164.2',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 16 Feb 2021 18:59:25 GMT',
  'Content-Length',
  '1347'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/certificates/CRUDCertificateName-canreadcancelanddeleteacertificatesoperation-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-canreadcancelanddeleteacertificatesoperation-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA3MAk0MZnGnSu9dKuuk4BH5cTgWtB6zFwN9jVBYiRI9b1FVRF2QoCbxGGM9DNXVn1qXpS7SJ1BX+FbP6ImJavrfOQ5iAyNS2SQaDngB25/kn6ytKfatjH8MKwceCteHRACmEuarBfl8ISBtNAxLdRbBpIJ6DCRIXxrq3NE5105BP/lD/iMFrRFijFlC14OmMUhG4ECH9IqPJ8NoHL3O4BS0v7aS2zjydBLuiZBfnNB9I5i0DT/Bs9yQNzMPeqZseW8miwHlLmXsY64TjjeocoMja/4TWl+d16HeWgUgbXxLlv4HtV+68bzQIZlAiTvBP4WX34CyjdaTVHoR/gHuCmOQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAEu3Q95kKq4yirALG1fxGTsPGqJOC2WLtsJC0F8cRfIKMxzyxaywlv/2mJuth55Iq3tKiopWgInHrIzjH8HOuKPaBKKu4Zj8W++bvis1gyJ/2MV5IZXsWYCoCPcGbxxwrExxSSnKczrV7d7sITkVUqy2tduRmwoISn+iph5IthapL4cVg03+77B138RZ+kAlkaTeJnxYJEYInwUR6CN0d7j9uQNqFLkKDpgoYc2l7sf6+wWMUksruX6Izh67YfJFyPMWxLYV1b4BBW9kpqBEacKAKmSvNDw+D5H03tuT1vKrwPs7/7tkb7pgNjLD/SZ92gxPf8goGD5Kas3e+teHSt8=","cancellation_requested":true,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"1b0127faa085437e8321fe614d90cf9a"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  'efa0b757-d028-4ce5-b79c-f19228bb8219',
  'x-ms-keyvault-service-version',
  '1.2.164.2',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 16 Feb 2021 18:59:26 GMT',
  'Content-Length',
  '1347'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/CRUDCertificateName-canreadcancelanddeleteacertificatesoperation-/')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-canreadcancelanddeleteacertificatesoperation-/c28c10315afe4c57a2a43be038906be5","attributes":{"enabled":false,"nbf":1613501365,"exp":1645037965,"created":1613501965,"updated":1613501965,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-canreadcancelanddeleteacertificatesoperation-/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1613501965,"updated":1613501965}}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  '64444876-9f5b-4d65-a733-7bddf46f97e7',
  'x-ms-keyvault-service-version',
  '1.2.164.2',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 16 Feb 2021 18:59:26 GMT',
  'Content-Length',
  '1028'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/CRUDCertificateName-canreadcancelanddeleteacertificatesoperation-/pending')
  .query(true)
  .reply(404, {"error":{"code":"PendingCertificateNotFound","message":"Pending certificate not found: CRUDCertificateName-canreadcancelanddeleteacertificatesoperation-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '172',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  '7afc4d88-b3c6-4a18-9a71-cd1afd134fd5',
  'x-ms-keyvault-service-version',
  '1.2.164.2',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 16 Feb 2021 18:59:26 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/certificates/CRUDCertificateName-canreadcancelanddeleteacertificatesoperation-')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/CRUDCertificateName-canreadcancelanddeleteacertificatesoperation-","deletedDate":1613501966,"scheduledPurgeDate":1614106766,"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-canreadcancelanddeleteacertificatesoperation-/c28c10315afe4c57a2a43be038906be5","attributes":{"enabled":false,"nbf":1613501365,"exp":1645037965,"created":1613501965,"updated":1613501965,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-canreadcancelanddeleteacertificatesoperation-/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1613501965,"updated":1613501965}}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  '74ae029d-7027-4147-be59-1b5b2cf6c163',
  'x-ms-keyvault-service-version',
  '1.2.164.2',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 16 Feb 2021 18:59:26 GMT',
  'Content-Length',
  '1236'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/CRUDCertificateName-canreadcancelanddeleteacertificatesoperation-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: CRUDCertificateName-canreadcancelanddeleteacertificatesoperation-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '165',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  '59921c6c-06e9-483c-afcb-e2d954a21357',
  'x-ms-keyvault-service-version',
  '1.2.164.2',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 16 Feb 2021 18:59:26 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/CRUDCertificateName-canreadcancelanddeleteacertificatesoperation-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: CRUDCertificateName-canreadcancelanddeleteacertificatesoperation-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '165',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  '0ea1c959-f22e-4726-a0cc-aab0a64b25ff',
  'x-ms-keyvault-service-version',
  '1.2.164.2',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 16 Feb 2021 18:59:26 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/CRUDCertificateName-canreadcancelanddeleteacertificatesoperation-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: CRUDCertificateName-canreadcancelanddeleteacertificatesoperation-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '165',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  '60129d4f-dfc7-4e8b-8096-24422ed8a602',
  'x-ms-keyvault-service-version',
  '1.2.164.2',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 16 Feb 2021 18:59:28 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/CRUDCertificateName-canreadcancelanddeleteacertificatesoperation-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: CRUDCertificateName-canreadcancelanddeleteacertificatesoperation-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '165',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  '601dba7f-6587-4d65-8b57-cbd0f6a17ccd',
  'x-ms-keyvault-service-version',
  '1.2.164.2',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 16 Feb 2021 18:59:30 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/CRUDCertificateName-canreadcancelanddeleteacertificatesoperation-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: CRUDCertificateName-canreadcancelanddeleteacertificatesoperation-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '165',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  '6aa71218-4e5f-4be5-8f31-f27e33ad71fb',
  'x-ms-keyvault-service-version',
  '1.2.164.2',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 16 Feb 2021 18:59:31 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/CRUDCertificateName-canreadcancelanddeleteacertificatesoperation-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: CRUDCertificateName-canreadcancelanddeleteacertificatesoperation-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '165',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  '788a0cc5-ec38-4563-9e79-6486146c1ee3',
  'x-ms-keyvault-service-version',
  '1.2.164.2',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 16 Feb 2021 18:59:33 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/CRUDCertificateName-canreadcancelanddeleteacertificatesoperation-')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/CRUDCertificateName-canreadcancelanddeleteacertificatesoperation-","deletedDate":1613501966,"scheduledPurgeDate":1614106766,"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-canreadcancelanddeleteacertificatesoperation-/c28c10315afe4c57a2a43be038906be5","attributes":{"enabled":false,"nbf":1613501365,"exp":1645037965,"created":1613501965,"updated":1613501965,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-canreadcancelanddeleteacertificatesoperation-/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1613501965,"updated":1613501965}}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  '0213ca14-4dd7-42a0-8f45-7db43bc1adaf',
  'x-ms-keyvault-service-version',
  '1.2.164.2',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 16 Feb 2021 18:59:36 GMT',
  'Content-Length',
  '1236'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedcertificates/CRUDCertificateName-canreadcancelanddeleteacertificatesoperation-')
  .query(true)
  .reply(204, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  '5eed8665-c592-45d0-96af-85f0bc38b52b',
  'x-ms-keyvault-service-version',
  '1.2.164.2',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 16 Feb 2021 18:59:36 GMT'
]);

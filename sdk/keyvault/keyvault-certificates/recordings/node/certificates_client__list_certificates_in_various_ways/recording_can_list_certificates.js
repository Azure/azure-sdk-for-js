let nock = require('nock');

module.exports.hash = "11ece8d0409cdba9231cccbc31d11b86";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/certificates/listCertificateName-canlistcertificates-0/create')
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
  'ff8a71e8-5065-4c70-a63f-93e93194ccc7',
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
  'Thu, 02 Jul 2020 18:36:53 GMT'
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
  '918b3b22-0f83-41ce-a7d3-5b088a354b00',
  'x-ms-ests-server',
  '2.1.10761.15 - SCUS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AqGzhhKIucRAmTt028dUl7c_aSJHAQAAAEYgkNYOAAAA; expires=Sat, 01-Aug-2020 18:36:54 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; SameSite=None; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; SameSite=None; secure; HttpOnly',
  'Date',
  'Thu, 02 Jul 2020 18:36:54 GMT',
  'Content-Length',
  '1315'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/certificates/listCertificateName-canlistcertificates-0/create', {"policy":{"key_props":{},"secret_props":{},"x509_props":{"subject":"cn=MyCert","sans":{}},"issuer":{"name":"Self"},"attributes":{}},"attributes":{}})
  .query(true)
  .reply(202, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistcertificates-0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA7H+5iiiBawD2sYH0Hp7VFV1c46rWtkMxJQPXo5lCOvbbVUqMQvCRw/lcaRQPdN0rNzFywa40mxzyKYaWi3/wNKM9vCI1XiOyO6sn/Mz5lcX0i0rw5GZix+SUWDAJs95c2SGgKH4mf0gjoGtLLmcWZrz3Q1YgJPCi9ULFRoHrm0C1ChVWGIVIcfUQyeLctAtURGtt1p+S5o9KKHUxz37/EgeWpCOM8Uhebg1Yd5xCvilInq+4/QwSdB/pc0l4iSr6HbpHe85QXqBB28Wez2COWMzismcB1rLFgeNlTLJNNq+wqnVbdf3LbI4XBTY5ypRqUJ67NME51JQC37aV0msDowIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAGJ7DO7+JIXZG5sjeZYMm69eJUQRjii1ccV/IGcMvOLWxsKXfCMpS9GBaS67PIK1MjPH9AARYe3k2eFu2VP8Y220F5pLCeN3wCgOkXEbwzsOMfSbIiZUdym5Wplo/qIb7TPUS2ecBeLvUeEYvvAnh/7b6TA1NegKCm4vsoPQYWUStJCRDNSozUvqMmFJvbfhiVuN5sqpo3ezrIsdP1KXlqArijxgx4+bjJoKYMmSmn8bE87mj/gUDzBj670dG6pkMByz/TLvEYKES0+5ZXsqCWMXcfB00UzEwYKF/XqjJWVw0g1nu5G7DeHsJxf74wdnquSYnK3rnQDQXTTz9wsvPw4=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"d557068b9a2e48df9ba15f17dc42633b"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistcertificates-0/pending?api-version=7.1&request_id=d557068b9a2e48df9ba15f17dc42633b',
  'Retry-After',
  '10',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'bd53b1fa-f36a-458a-ab47-e1f28444e136',
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
  'Thu, 02 Jul 2020 18:36:54 GMT',
  'Content-Length',
  '1333'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistcertificates-0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistcertificates-0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA7H+5iiiBawD2sYH0Hp7VFV1c46rWtkMxJQPXo5lCOvbbVUqMQvCRw/lcaRQPdN0rNzFywa40mxzyKYaWi3/wNKM9vCI1XiOyO6sn/Mz5lcX0i0rw5GZix+SUWDAJs95c2SGgKH4mf0gjoGtLLmcWZrz3Q1YgJPCi9ULFRoHrm0C1ChVWGIVIcfUQyeLctAtURGtt1p+S5o9KKHUxz37/EgeWpCOM8Uhebg1Yd5xCvilInq+4/QwSdB/pc0l4iSr6HbpHe85QXqBB28Wez2COWMzismcB1rLFgeNlTLJNNq+wqnVbdf3LbI4XBTY5ypRqUJ67NME51JQC37aV0msDowIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAGJ7DO7+JIXZG5sjeZYMm69eJUQRjii1ccV/IGcMvOLWxsKXfCMpS9GBaS67PIK1MjPH9AARYe3k2eFu2VP8Y220F5pLCeN3wCgOkXEbwzsOMfSbIiZUdym5Wplo/qIb7TPUS2ecBeLvUeEYvvAnh/7b6TA1NegKCm4vsoPQYWUStJCRDNSozUvqMmFJvbfhiVuN5sqpo3ezrIsdP1KXlqArijxgx4+bjJoKYMmSmn8bE87mj/gUDzBj670dG6pkMByz/TLvEYKES0+5ZXsqCWMXcfB00UzEwYKF/XqjJWVw0g1nu5G7DeHsJxf74wdnquSYnK3rnQDQXTTz9wsvPw4=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"d557068b9a2e48df9ba15f17dc42633b"}, [
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
  '56c30457-e561-4493-af0b-25c40ecdb008',
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
  'Thu, 02 Jul 2020 18:36:54 GMT',
  'Content-Length',
  '1333'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistcertificates-0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistcertificates-0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA7H+5iiiBawD2sYH0Hp7VFV1c46rWtkMxJQPXo5lCOvbbVUqMQvCRw/lcaRQPdN0rNzFywa40mxzyKYaWi3/wNKM9vCI1XiOyO6sn/Mz5lcX0i0rw5GZix+SUWDAJs95c2SGgKH4mf0gjoGtLLmcWZrz3Q1YgJPCi9ULFRoHrm0C1ChVWGIVIcfUQyeLctAtURGtt1p+S5o9KKHUxz37/EgeWpCOM8Uhebg1Yd5xCvilInq+4/QwSdB/pc0l4iSr6HbpHe85QXqBB28Wez2COWMzismcB1rLFgeNlTLJNNq+wqnVbdf3LbI4XBTY5ypRqUJ67NME51JQC37aV0msDowIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAGJ7DO7+JIXZG5sjeZYMm69eJUQRjii1ccV/IGcMvOLWxsKXfCMpS9GBaS67PIK1MjPH9AARYe3k2eFu2VP8Y220F5pLCeN3wCgOkXEbwzsOMfSbIiZUdym5Wplo/qIb7TPUS2ecBeLvUeEYvvAnh/7b6TA1NegKCm4vsoPQYWUStJCRDNSozUvqMmFJvbfhiVuN5sqpo3ezrIsdP1KXlqArijxgx4+bjJoKYMmSmn8bE87mj/gUDzBj670dG6pkMByz/TLvEYKES0+5ZXsqCWMXcfB00UzEwYKF/XqjJWVw0g1nu5G7DeHsJxf74wdnquSYnK3rnQDQXTTz9wsvPw4=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"d557068b9a2e48df9ba15f17dc42633b"}, [
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
  '7ba2430a-4676-4fbc-b72c-e695ba23cc82',
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
  'Thu, 02 Jul 2020 18:36:54 GMT',
  'Content-Length',
  '1333'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistcertificates-0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistcertificates-0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA7H+5iiiBawD2sYH0Hp7VFV1c46rWtkMxJQPXo5lCOvbbVUqMQvCRw/lcaRQPdN0rNzFywa40mxzyKYaWi3/wNKM9vCI1XiOyO6sn/Mz5lcX0i0rw5GZix+SUWDAJs95c2SGgKH4mf0gjoGtLLmcWZrz3Q1YgJPCi9ULFRoHrm0C1ChVWGIVIcfUQyeLctAtURGtt1p+S5o9KKHUxz37/EgeWpCOM8Uhebg1Yd5xCvilInq+4/QwSdB/pc0l4iSr6HbpHe85QXqBB28Wez2COWMzismcB1rLFgeNlTLJNNq+wqnVbdf3LbI4XBTY5ypRqUJ67NME51JQC37aV0msDowIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAGJ7DO7+JIXZG5sjeZYMm69eJUQRjii1ccV/IGcMvOLWxsKXfCMpS9GBaS67PIK1MjPH9AARYe3k2eFu2VP8Y220F5pLCeN3wCgOkXEbwzsOMfSbIiZUdym5Wplo/qIb7TPUS2ecBeLvUeEYvvAnh/7b6TA1NegKCm4vsoPQYWUStJCRDNSozUvqMmFJvbfhiVuN5sqpo3ezrIsdP1KXlqArijxgx4+bjJoKYMmSmn8bE87mj/gUDzBj670dG6pkMByz/TLvEYKES0+5ZXsqCWMXcfB00UzEwYKF/XqjJWVw0g1nu5G7DeHsJxf74wdnquSYnK3rnQDQXTTz9wsvPw4=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"d557068b9a2e48df9ba15f17dc42633b"}, [
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
  '08797f29-2107-418c-8b58-c556d5ba2dae',
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
  'Thu, 02 Jul 2020 18:36:56 GMT',
  'Content-Length',
  '1333'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistcertificates-0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistcertificates-0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA7H+5iiiBawD2sYH0Hp7VFV1c46rWtkMxJQPXo5lCOvbbVUqMQvCRw/lcaRQPdN0rNzFywa40mxzyKYaWi3/wNKM9vCI1XiOyO6sn/Mz5lcX0i0rw5GZix+SUWDAJs95c2SGgKH4mf0gjoGtLLmcWZrz3Q1YgJPCi9ULFRoHrm0C1ChVWGIVIcfUQyeLctAtURGtt1p+S5o9KKHUxz37/EgeWpCOM8Uhebg1Yd5xCvilInq+4/QwSdB/pc0l4iSr6HbpHe85QXqBB28Wez2COWMzismcB1rLFgeNlTLJNNq+wqnVbdf3LbI4XBTY5ypRqUJ67NME51JQC37aV0msDowIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAGJ7DO7+JIXZG5sjeZYMm69eJUQRjii1ccV/IGcMvOLWxsKXfCMpS9GBaS67PIK1MjPH9AARYe3k2eFu2VP8Y220F5pLCeN3wCgOkXEbwzsOMfSbIiZUdym5Wplo/qIb7TPUS2ecBeLvUeEYvvAnh/7b6TA1NegKCm4vsoPQYWUStJCRDNSozUvqMmFJvbfhiVuN5sqpo3ezrIsdP1KXlqArijxgx4+bjJoKYMmSmn8bE87mj/gUDzBj670dG6pkMByz/TLvEYKES0+5ZXsqCWMXcfB00UzEwYKF/XqjJWVw0g1nu5G7DeHsJxf74wdnquSYnK3rnQDQXTTz9wsvPw4=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"d557068b9a2e48df9ba15f17dc42633b"}, [
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
  '06034cb1-6d59-4b6a-81dd-d53b7e7c6b0a',
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
  'Thu, 02 Jul 2020 18:36:58 GMT',
  'Content-Length',
  '1333'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistcertificates-0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistcertificates-0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA7H+5iiiBawD2sYH0Hp7VFV1c46rWtkMxJQPXo5lCOvbbVUqMQvCRw/lcaRQPdN0rNzFywa40mxzyKYaWi3/wNKM9vCI1XiOyO6sn/Mz5lcX0i0rw5GZix+SUWDAJs95c2SGgKH4mf0gjoGtLLmcWZrz3Q1YgJPCi9ULFRoHrm0C1ChVWGIVIcfUQyeLctAtURGtt1p+S5o9KKHUxz37/EgeWpCOM8Uhebg1Yd5xCvilInq+4/QwSdB/pc0l4iSr6HbpHe85QXqBB28Wez2COWMzismcB1rLFgeNlTLJNNq+wqnVbdf3LbI4XBTY5ypRqUJ67NME51JQC37aV0msDowIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAGJ7DO7+JIXZG5sjeZYMm69eJUQRjii1ccV/IGcMvOLWxsKXfCMpS9GBaS67PIK1MjPH9AARYe3k2eFu2VP8Y220F5pLCeN3wCgOkXEbwzsOMfSbIiZUdym5Wplo/qIb7TPUS2ecBeLvUeEYvvAnh/7b6TA1NegKCm4vsoPQYWUStJCRDNSozUvqMmFJvbfhiVuN5sqpo3ezrIsdP1KXlqArijxgx4+bjJoKYMmSmn8bE87mj/gUDzBj670dG6pkMByz/TLvEYKES0+5ZXsqCWMXcfB00UzEwYKF/XqjJWVw0g1nu5G7DeHsJxf74wdnquSYnK3rnQDQXTTz9wsvPw4=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"d557068b9a2e48df9ba15f17dc42633b"}, [
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
  'd8ddc6d2-6d32-4077-b055-98d9091f5fa4',
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
  'Thu, 02 Jul 2020 18:37:01 GMT',
  'Content-Length',
  '1333'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistcertificates-0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistcertificates-0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA7H+5iiiBawD2sYH0Hp7VFV1c46rWtkMxJQPXo5lCOvbbVUqMQvCRw/lcaRQPdN0rNzFywa40mxzyKYaWi3/wNKM9vCI1XiOyO6sn/Mz5lcX0i0rw5GZix+SUWDAJs95c2SGgKH4mf0gjoGtLLmcWZrz3Q1YgJPCi9ULFRoHrm0C1ChVWGIVIcfUQyeLctAtURGtt1p+S5o9KKHUxz37/EgeWpCOM8Uhebg1Yd5xCvilInq+4/QwSdB/pc0l4iSr6HbpHe85QXqBB28Wez2COWMzismcB1rLFgeNlTLJNNq+wqnVbdf3LbI4XBTY5ypRqUJ67NME51JQC37aV0msDowIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAGJ7DO7+JIXZG5sjeZYMm69eJUQRjii1ccV/IGcMvOLWxsKXfCMpS9GBaS67PIK1MjPH9AARYe3k2eFu2VP8Y220F5pLCeN3wCgOkXEbwzsOMfSbIiZUdym5Wplo/qIb7TPUS2ecBeLvUeEYvvAnh/7b6TA1NegKCm4vsoPQYWUStJCRDNSozUvqMmFJvbfhiVuN5sqpo3ezrIsdP1KXlqArijxgx4+bjJoKYMmSmn8bE87mj/gUDzBj670dG6pkMByz/TLvEYKES0+5ZXsqCWMXcfB00UzEwYKF/XqjJWVw0g1nu5G7DeHsJxf74wdnquSYnK3rnQDQXTTz9wsvPw4=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"d557068b9a2e48df9ba15f17dc42633b"}, [
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
  '30a9cf3c-63ce-48e9-98bd-8566d725c6c3',
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
  'Thu, 02 Jul 2020 18:37:03 GMT',
  'Content-Length',
  '1333'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistcertificates-0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistcertificates-0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA7H+5iiiBawD2sYH0Hp7VFV1c46rWtkMxJQPXo5lCOvbbVUqMQvCRw/lcaRQPdN0rNzFywa40mxzyKYaWi3/wNKM9vCI1XiOyO6sn/Mz5lcX0i0rw5GZix+SUWDAJs95c2SGgKH4mf0gjoGtLLmcWZrz3Q1YgJPCi9ULFRoHrm0C1ChVWGIVIcfUQyeLctAtURGtt1p+S5o9KKHUxz37/EgeWpCOM8Uhebg1Yd5xCvilInq+4/QwSdB/pc0l4iSr6HbpHe85QXqBB28Wez2COWMzismcB1rLFgeNlTLJNNq+wqnVbdf3LbI4XBTY5ypRqUJ67NME51JQC37aV0msDowIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAGJ7DO7+JIXZG5sjeZYMm69eJUQRjii1ccV/IGcMvOLWxsKXfCMpS9GBaS67PIK1MjPH9AARYe3k2eFu2VP8Y220F5pLCeN3wCgOkXEbwzsOMfSbIiZUdym5Wplo/qIb7TPUS2ecBeLvUeEYvvAnh/7b6TA1NegKCm4vsoPQYWUStJCRDNSozUvqMmFJvbfhiVuN5sqpo3ezrIsdP1KXlqArijxgx4+bjJoKYMmSmn8bE87mj/gUDzBj670dG6pkMByz/TLvEYKES0+5ZXsqCWMXcfB00UzEwYKF/XqjJWVw0g1nu5G7DeHsJxf74wdnquSYnK3rnQDQXTTz9wsvPw4=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"d557068b9a2e48df9ba15f17dc42633b"}, [
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
  '0070260c-5821-46b9-b0c6-4d0bd1b5dc0b',
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
  'Thu, 02 Jul 2020 18:37:05 GMT',
  'Content-Length',
  '1333'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistcertificates-0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistcertificates-0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA7H+5iiiBawD2sYH0Hp7VFV1c46rWtkMxJQPXo5lCOvbbVUqMQvCRw/lcaRQPdN0rNzFywa40mxzyKYaWi3/wNKM9vCI1XiOyO6sn/Mz5lcX0i0rw5GZix+SUWDAJs95c2SGgKH4mf0gjoGtLLmcWZrz3Q1YgJPCi9ULFRoHrm0C1ChVWGIVIcfUQyeLctAtURGtt1p+S5o9KKHUxz37/EgeWpCOM8Uhebg1Yd5xCvilInq+4/QwSdB/pc0l4iSr6HbpHe85QXqBB28Wez2COWMzismcB1rLFgeNlTLJNNq+wqnVbdf3LbI4XBTY5ypRqUJ67NME51JQC37aV0msDowIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAGJ7DO7+JIXZG5sjeZYMm69eJUQRjii1ccV/IGcMvOLWxsKXfCMpS9GBaS67PIK1MjPH9AARYe3k2eFu2VP8Y220F5pLCeN3wCgOkXEbwzsOMfSbIiZUdym5Wplo/qIb7TPUS2ecBeLvUeEYvvAnh/7b6TA1NegKCm4vsoPQYWUStJCRDNSozUvqMmFJvbfhiVuN5sqpo3ezrIsdP1KXlqArijxgx4+bjJoKYMmSmn8bE87mj/gUDzBj670dG6pkMByz/TLvEYKES0+5ZXsqCWMXcfB00UzEwYKF/XqjJWVw0g1nu5G7DeHsJxf74wdnquSYnK3rnQDQXTTz9wsvPw4=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"d557068b9a2e48df9ba15f17dc42633b"}, [
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
  'f7260895-13ea-4871-908a-454e996c2861',
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
  'Thu, 02 Jul 2020 18:37:07 GMT',
  'Content-Length',
  '1333'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistcertificates-0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistcertificates-0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA7H+5iiiBawD2sYH0Hp7VFV1c46rWtkMxJQPXo5lCOvbbVUqMQvCRw/lcaRQPdN0rNzFywa40mxzyKYaWi3/wNKM9vCI1XiOyO6sn/Mz5lcX0i0rw5GZix+SUWDAJs95c2SGgKH4mf0gjoGtLLmcWZrz3Q1YgJPCi9ULFRoHrm0C1ChVWGIVIcfUQyeLctAtURGtt1p+S5o9KKHUxz37/EgeWpCOM8Uhebg1Yd5xCvilInq+4/QwSdB/pc0l4iSr6HbpHe85QXqBB28Wez2COWMzismcB1rLFgeNlTLJNNq+wqnVbdf3LbI4XBTY5ypRqUJ67NME51JQC37aV0msDowIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAGJ7DO7+JIXZG5sjeZYMm69eJUQRjii1ccV/IGcMvOLWxsKXfCMpS9GBaS67PIK1MjPH9AARYe3k2eFu2VP8Y220F5pLCeN3wCgOkXEbwzsOMfSbIiZUdym5Wplo/qIb7TPUS2ecBeLvUeEYvvAnh/7b6TA1NegKCm4vsoPQYWUStJCRDNSozUvqMmFJvbfhiVuN5sqpo3ezrIsdP1KXlqArijxgx4+bjJoKYMmSmn8bE87mj/gUDzBj670dG6pkMByz/TLvEYKES0+5ZXsqCWMXcfB00UzEwYKF/XqjJWVw0g1nu5G7DeHsJxf74wdnquSYnK3rnQDQXTTz9wsvPw4=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"d557068b9a2e48df9ba15f17dc42633b"}, [
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
  'f73cb18e-0236-4067-b321-d777bc66ab34',
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
  'Thu, 02 Jul 2020 18:37:09 GMT',
  'Content-Length',
  '1333'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistcertificates-0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistcertificates-0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA7H+5iiiBawD2sYH0Hp7VFV1c46rWtkMxJQPXo5lCOvbbVUqMQvCRw/lcaRQPdN0rNzFywa40mxzyKYaWi3/wNKM9vCI1XiOyO6sn/Mz5lcX0i0rw5GZix+SUWDAJs95c2SGgKH4mf0gjoGtLLmcWZrz3Q1YgJPCi9ULFRoHrm0C1ChVWGIVIcfUQyeLctAtURGtt1p+S5o9KKHUxz37/EgeWpCOM8Uhebg1Yd5xCvilInq+4/QwSdB/pc0l4iSr6HbpHe85QXqBB28Wez2COWMzismcB1rLFgeNlTLJNNq+wqnVbdf3LbI4XBTY5ypRqUJ67NME51JQC37aV0msDowIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAGJ7DO7+JIXZG5sjeZYMm69eJUQRjii1ccV/IGcMvOLWxsKXfCMpS9GBaS67PIK1MjPH9AARYe3k2eFu2VP8Y220F5pLCeN3wCgOkXEbwzsOMfSbIiZUdym5Wplo/qIb7TPUS2ecBeLvUeEYvvAnh/7b6TA1NegKCm4vsoPQYWUStJCRDNSozUvqMmFJvbfhiVuN5sqpo3ezrIsdP1KXlqArijxgx4+bjJoKYMmSmn8bE87mj/gUDzBj670dG6pkMByz/TLvEYKES0+5ZXsqCWMXcfB00UzEwYKF/XqjJWVw0g1nu5G7DeHsJxf74wdnquSYnK3rnQDQXTTz9wsvPw4=","cancellation_requested":false,"status":"completed","target":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistcertificates-0","request_id":"d557068b9a2e48df9ba15f17dc42633b"}, [
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
  '991152ed-fad3-4235-9ed7-0618ad69793b',
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
  'Thu, 02 Jul 2020 18:37:11 GMT',
  'Content-Length',
  '1293'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistcertificates-0/')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistcertificates-0/22053a2366c8498f8d9958cfa2be2038","kid":"https://keyvault_name.vault.azure.net/keys/listCertificateName-canlistcertificates-0/22053a2366c8498f8d9958cfa2be2038","sid":"https://keyvault_name.vault.azure.net/secrets/listCertificateName-canlistcertificates-0/22053a2366c8498f8d9958cfa2be2038","x5t":"YMTSNXYNGWVlHzg4Q4F884-khmY","cer":"MIIDKDCCAhCgAwIBAgIQTm26rHoKRbylzjTJBhkWuzANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjAwNzAyMTgyNzA5WhcNMjEwNzAyMTgzNzA5WjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQDsf7mKKIFrAPaxgfQentUVXVzjqta2QzElA9ejmUI69ttVSoxC8JHD+VxpFA903Ss3MXLBrjSbHPIphpaLf/A0oz28IjVeI7I7qyf8zPmVxfSLSvDkZmLH5JRYMAmz3lzZIaAofiZ/SCOga0suZxZmvPdDViAk8KL1QsVGgeubQLUKFVYYhUhx9RDJ4ty0C1REa23Wn5Lmj0oodTHPfv8SB5akI4zxSF5uDVh3nEK+KUier7j9DBJ0H+lzSXiJKvodukd7zlBeoEHbxZ7PYI5YzOKyZwHWssWB42VMsk02r7CqdVt1/ctsjhcFNjnKlGpQnrs0wTnUlALftpXSawOjAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBTiHR4FGV57TElVhXkx6oqXhtAF7jAdBgNVHQ4EFgQU4h0eBRlee0xJVYV5MeqKl4bQBe4wDQYJKoZIhvcNAQELBQADggEBAHlCYFSBTGOpSqIggtLr7MFSxKjaIhIY2C+3K/NFf71Hes6LnakTY55fiIlzSJGuLtmzxeyOJHrojXX74+55UhvScgUiWmDGLETEhR9+USgLu2OOyw/uQmpuRkq9Vu/g9T4S8kpEi81+a5VlWa2sEBjmH8a5lSGkuGekNSi1/2l85ZZRtAflXibtB389qZknFD0o7WT4OIBY42HZKm8oIkDCVXPT6Fp9oz37KZr//DaHGXjvpusvpqEBo9hJghEDbUsOBZrQJOBHlCcyyKH9Zm+uvGWCsT8R/M8iBpbvInii5q2UKGdgs+FkQo8TpkZ8791IBM+j6QMi51pwcyuHgb0=","attributes":{"enabled":true,"nbf":1593714429,"exp":1625251029,"created":1593715029,"updated":1593715029,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistcertificates-0/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1593715015,"updated":1593715015}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistcertificates-0/pending"}}, [
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
  'ece3a95e-e752-4390-a0be-08165d7d23d1',
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
  'Thu, 02 Jul 2020 18:37:11 GMT',
  'Content-Length',
  '2555'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/certificates/listCertificateName-canlistcertificates-1/create', {"policy":{"key_props":{},"secret_props":{},"x509_props":{"subject":"cn=MyCert","sans":{}},"issuer":{"name":"Self"},"attributes":{}},"attributes":{}})
  .query(true)
  .reply(202, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistcertificates-1/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAreh+5TVlU3LSJ7JiPtL+w/87AVv0gEcaqcUCbk9lhWZxtcX189EHmCpC/hCsfHoZh37iAAGvaZ3nfJwdm8nfqvPQDTQd81A9rNXo0AnpqTpxesCAm3dQPD/ASZOyUZJIce8hmiZs7pIiyUDfEhA087Pxgz0uapLiyMFCJ/9mhGOexmBP3JeVKNixdf/asw4Qt7IMqCr0BmMGf0DsFq9Cq4JEvOWGNcuLaiaGCXv7cV7mM5yy4B7+XCeA328BxUi0igVlXuN0c8vjkGkhdDJ5YS0aTDs3rs2IpMWKoX4c8la4bdnJmCSrsddpzCqU1WtxUErt/UQSN43W0ge0HZTEdQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAKAJj0B9doUrwXP4VEoRpV+p02WwyieoAxd+IuSqgTkiFqPdkJVMGy5S/4iWGuMKkoRVqJayNK+ODIkiNtdiWbyhRLTnaKvWXOtJ+gv8MkIjbw1hMqEYnTS8xmwLzFwopKeDB2w6pUgIzAEGj8QtXsT057GH8HaMdCF+Yzln/mI/Yf1o5frQk3T6dWVTk8BFcAv819fgsXKFQDvW+qNLFZXHdrXha57QCm1ywz+1P0y1TJCfAOOlxmC+wihS33vlntBJiC4V4GvfRoIRD3DVP4MHMAuK+PKYHiBfkddL6sYKntkxnmHUrf7OY0pHClQYhKf3xQ/AHqBGzpT4V0efhSA=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"3d2a1149d7ba476b86253a0cd6ed74d9"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistcertificates-1/pending?api-version=7.1&request_id=3d2a1149d7ba476b86253a0cd6ed74d9',
  'Retry-After',
  '10',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '51aff7d6-cf63-4a2b-b6cc-c54225af93c0',
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
  'Thu, 02 Jul 2020 18:37:11 GMT',
  'Content-Length',
  '1333'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistcertificates-1/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistcertificates-1/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAreh+5TVlU3LSJ7JiPtL+w/87AVv0gEcaqcUCbk9lhWZxtcX189EHmCpC/hCsfHoZh37iAAGvaZ3nfJwdm8nfqvPQDTQd81A9rNXo0AnpqTpxesCAm3dQPD/ASZOyUZJIce8hmiZs7pIiyUDfEhA087Pxgz0uapLiyMFCJ/9mhGOexmBP3JeVKNixdf/asw4Qt7IMqCr0BmMGf0DsFq9Cq4JEvOWGNcuLaiaGCXv7cV7mM5yy4B7+XCeA328BxUi0igVlXuN0c8vjkGkhdDJ5YS0aTDs3rs2IpMWKoX4c8la4bdnJmCSrsddpzCqU1WtxUErt/UQSN43W0ge0HZTEdQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAKAJj0B9doUrwXP4VEoRpV+p02WwyieoAxd+IuSqgTkiFqPdkJVMGy5S/4iWGuMKkoRVqJayNK+ODIkiNtdiWbyhRLTnaKvWXOtJ+gv8MkIjbw1hMqEYnTS8xmwLzFwopKeDB2w6pUgIzAEGj8QtXsT057GH8HaMdCF+Yzln/mI/Yf1o5frQk3T6dWVTk8BFcAv819fgsXKFQDvW+qNLFZXHdrXha57QCm1ywz+1P0y1TJCfAOOlxmC+wihS33vlntBJiC4V4GvfRoIRD3DVP4MHMAuK+PKYHiBfkddL6sYKntkxnmHUrf7OY0pHClQYhKf3xQ/AHqBGzpT4V0efhSA=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"3d2a1149d7ba476b86253a0cd6ed74d9"}, [
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
  '0bdb7b43-3705-4d68-98bb-c70de3aec692',
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
  'Thu, 02 Jul 2020 18:37:11 GMT',
  'Content-Length',
  '1333'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistcertificates-1/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistcertificates-1/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAreh+5TVlU3LSJ7JiPtL+w/87AVv0gEcaqcUCbk9lhWZxtcX189EHmCpC/hCsfHoZh37iAAGvaZ3nfJwdm8nfqvPQDTQd81A9rNXo0AnpqTpxesCAm3dQPD/ASZOyUZJIce8hmiZs7pIiyUDfEhA087Pxgz0uapLiyMFCJ/9mhGOexmBP3JeVKNixdf/asw4Qt7IMqCr0BmMGf0DsFq9Cq4JEvOWGNcuLaiaGCXv7cV7mM5yy4B7+XCeA328BxUi0igVlXuN0c8vjkGkhdDJ5YS0aTDs3rs2IpMWKoX4c8la4bdnJmCSrsddpzCqU1WtxUErt/UQSN43W0ge0HZTEdQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAKAJj0B9doUrwXP4VEoRpV+p02WwyieoAxd+IuSqgTkiFqPdkJVMGy5S/4iWGuMKkoRVqJayNK+ODIkiNtdiWbyhRLTnaKvWXOtJ+gv8MkIjbw1hMqEYnTS8xmwLzFwopKeDB2w6pUgIzAEGj8QtXsT057GH8HaMdCF+Yzln/mI/Yf1o5frQk3T6dWVTk8BFcAv819fgsXKFQDvW+qNLFZXHdrXha57QCm1ywz+1P0y1TJCfAOOlxmC+wihS33vlntBJiC4V4GvfRoIRD3DVP4MHMAuK+PKYHiBfkddL6sYKntkxnmHUrf7OY0pHClQYhKf3xQ/AHqBGzpT4V0efhSA=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"3d2a1149d7ba476b86253a0cd6ed74d9"}, [
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
  '164aff7f-9051-49df-9d62-9be52d90de22',
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
  'Thu, 02 Jul 2020 18:37:12 GMT',
  'Content-Length',
  '1333'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistcertificates-1/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistcertificates-1/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAreh+5TVlU3LSJ7JiPtL+w/87AVv0gEcaqcUCbk9lhWZxtcX189EHmCpC/hCsfHoZh37iAAGvaZ3nfJwdm8nfqvPQDTQd81A9rNXo0AnpqTpxesCAm3dQPD/ASZOyUZJIce8hmiZs7pIiyUDfEhA087Pxgz0uapLiyMFCJ/9mhGOexmBP3JeVKNixdf/asw4Qt7IMqCr0BmMGf0DsFq9Cq4JEvOWGNcuLaiaGCXv7cV7mM5yy4B7+XCeA328BxUi0igVlXuN0c8vjkGkhdDJ5YS0aTDs3rs2IpMWKoX4c8la4bdnJmCSrsddpzCqU1WtxUErt/UQSN43W0ge0HZTEdQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAKAJj0B9doUrwXP4VEoRpV+p02WwyieoAxd+IuSqgTkiFqPdkJVMGy5S/4iWGuMKkoRVqJayNK+ODIkiNtdiWbyhRLTnaKvWXOtJ+gv8MkIjbw1hMqEYnTS8xmwLzFwopKeDB2w6pUgIzAEGj8QtXsT057GH8HaMdCF+Yzln/mI/Yf1o5frQk3T6dWVTk8BFcAv819fgsXKFQDvW+qNLFZXHdrXha57QCm1ywz+1P0y1TJCfAOOlxmC+wihS33vlntBJiC4V4GvfRoIRD3DVP4MHMAuK+PKYHiBfkddL6sYKntkxnmHUrf7OY0pHClQYhKf3xQ/AHqBGzpT4V0efhSA=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"3d2a1149d7ba476b86253a0cd6ed74d9"}, [
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
  '462eaf21-4112-44c0-8ffa-af3ec5ec0470',
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
  'Thu, 02 Jul 2020 18:37:13 GMT',
  'Content-Length',
  '1333'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistcertificates-1/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistcertificates-1/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAreh+5TVlU3LSJ7JiPtL+w/87AVv0gEcaqcUCbk9lhWZxtcX189EHmCpC/hCsfHoZh37iAAGvaZ3nfJwdm8nfqvPQDTQd81A9rNXo0AnpqTpxesCAm3dQPD/ASZOyUZJIce8hmiZs7pIiyUDfEhA087Pxgz0uapLiyMFCJ/9mhGOexmBP3JeVKNixdf/asw4Qt7IMqCr0BmMGf0DsFq9Cq4JEvOWGNcuLaiaGCXv7cV7mM5yy4B7+XCeA328BxUi0igVlXuN0c8vjkGkhdDJ5YS0aTDs3rs2IpMWKoX4c8la4bdnJmCSrsddpzCqU1WtxUErt/UQSN43W0ge0HZTEdQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAKAJj0B9doUrwXP4VEoRpV+p02WwyieoAxd+IuSqgTkiFqPdkJVMGy5S/4iWGuMKkoRVqJayNK+ODIkiNtdiWbyhRLTnaKvWXOtJ+gv8MkIjbw1hMqEYnTS8xmwLzFwopKeDB2w6pUgIzAEGj8QtXsT057GH8HaMdCF+Yzln/mI/Yf1o5frQk3T6dWVTk8BFcAv819fgsXKFQDvW+qNLFZXHdrXha57QCm1ywz+1P0y1TJCfAOOlxmC+wihS33vlntBJiC4V4GvfRoIRD3DVP4MHMAuK+PKYHiBfkddL6sYKntkxnmHUrf7OY0pHClQYhKf3xQ/AHqBGzpT4V0efhSA=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"3d2a1149d7ba476b86253a0cd6ed74d9"}, [
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
  'a781ffe3-9b80-40e5-bdad-69d03b442bed',
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
  'Thu, 02 Jul 2020 18:37:15 GMT',
  'Content-Length',
  '1333'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistcertificates-1/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistcertificates-1/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAreh+5TVlU3LSJ7JiPtL+w/87AVv0gEcaqcUCbk9lhWZxtcX189EHmCpC/hCsfHoZh37iAAGvaZ3nfJwdm8nfqvPQDTQd81A9rNXo0AnpqTpxesCAm3dQPD/ASZOyUZJIce8hmiZs7pIiyUDfEhA087Pxgz0uapLiyMFCJ/9mhGOexmBP3JeVKNixdf/asw4Qt7IMqCr0BmMGf0DsFq9Cq4JEvOWGNcuLaiaGCXv7cV7mM5yy4B7+XCeA328BxUi0igVlXuN0c8vjkGkhdDJ5YS0aTDs3rs2IpMWKoX4c8la4bdnJmCSrsddpzCqU1WtxUErt/UQSN43W0ge0HZTEdQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAKAJj0B9doUrwXP4VEoRpV+p02WwyieoAxd+IuSqgTkiFqPdkJVMGy5S/4iWGuMKkoRVqJayNK+ODIkiNtdiWbyhRLTnaKvWXOtJ+gv8MkIjbw1hMqEYnTS8xmwLzFwopKeDB2w6pUgIzAEGj8QtXsT057GH8HaMdCF+Yzln/mI/Yf1o5frQk3T6dWVTk8BFcAv819fgsXKFQDvW+qNLFZXHdrXha57QCm1ywz+1P0y1TJCfAOOlxmC+wihS33vlntBJiC4V4GvfRoIRD3DVP4MHMAuK+PKYHiBfkddL6sYKntkxnmHUrf7OY0pHClQYhKf3xQ/AHqBGzpT4V0efhSA=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"3d2a1149d7ba476b86253a0cd6ed74d9"}, [
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
  '6ae937fe-ceb6-4164-b89a-8511b59b04d8',
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
  'Thu, 02 Jul 2020 18:37:18 GMT',
  'Content-Length',
  '1333'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistcertificates-1/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistcertificates-1/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAreh+5TVlU3LSJ7JiPtL+w/87AVv0gEcaqcUCbk9lhWZxtcX189EHmCpC/hCsfHoZh37iAAGvaZ3nfJwdm8nfqvPQDTQd81A9rNXo0AnpqTpxesCAm3dQPD/ASZOyUZJIce8hmiZs7pIiyUDfEhA087Pxgz0uapLiyMFCJ/9mhGOexmBP3JeVKNixdf/asw4Qt7IMqCr0BmMGf0DsFq9Cq4JEvOWGNcuLaiaGCXv7cV7mM5yy4B7+XCeA328BxUi0igVlXuN0c8vjkGkhdDJ5YS0aTDs3rs2IpMWKoX4c8la4bdnJmCSrsddpzCqU1WtxUErt/UQSN43W0ge0HZTEdQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAKAJj0B9doUrwXP4VEoRpV+p02WwyieoAxd+IuSqgTkiFqPdkJVMGy5S/4iWGuMKkoRVqJayNK+ODIkiNtdiWbyhRLTnaKvWXOtJ+gv8MkIjbw1hMqEYnTS8xmwLzFwopKeDB2w6pUgIzAEGj8QtXsT057GH8HaMdCF+Yzln/mI/Yf1o5frQk3T6dWVTk8BFcAv819fgsXKFQDvW+qNLFZXHdrXha57QCm1ywz+1P0y1TJCfAOOlxmC+wihS33vlntBJiC4V4GvfRoIRD3DVP4MHMAuK+PKYHiBfkddL6sYKntkxnmHUrf7OY0pHClQYhKf3xQ/AHqBGzpT4V0efhSA=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"3d2a1149d7ba476b86253a0cd6ed74d9"}, [
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
  'd8bf90fa-b330-4d12-bb10-fcf9d39f63e6',
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
  'Thu, 02 Jul 2020 18:37:20 GMT',
  'Content-Length',
  '1333'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistcertificates-1/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistcertificates-1/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAreh+5TVlU3LSJ7JiPtL+w/87AVv0gEcaqcUCbk9lhWZxtcX189EHmCpC/hCsfHoZh37iAAGvaZ3nfJwdm8nfqvPQDTQd81A9rNXo0AnpqTpxesCAm3dQPD/ASZOyUZJIce8hmiZs7pIiyUDfEhA087Pxgz0uapLiyMFCJ/9mhGOexmBP3JeVKNixdf/asw4Qt7IMqCr0BmMGf0DsFq9Cq4JEvOWGNcuLaiaGCXv7cV7mM5yy4B7+XCeA328BxUi0igVlXuN0c8vjkGkhdDJ5YS0aTDs3rs2IpMWKoX4c8la4bdnJmCSrsddpzCqU1WtxUErt/UQSN43W0ge0HZTEdQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAKAJj0B9doUrwXP4VEoRpV+p02WwyieoAxd+IuSqgTkiFqPdkJVMGy5S/4iWGuMKkoRVqJayNK+ODIkiNtdiWbyhRLTnaKvWXOtJ+gv8MkIjbw1hMqEYnTS8xmwLzFwopKeDB2w6pUgIzAEGj8QtXsT057GH8HaMdCF+Yzln/mI/Yf1o5frQk3T6dWVTk8BFcAv819fgsXKFQDvW+qNLFZXHdrXha57QCm1ywz+1P0y1TJCfAOOlxmC+wihS33vlntBJiC4V4GvfRoIRD3DVP4MHMAuK+PKYHiBfkddL6sYKntkxnmHUrf7OY0pHClQYhKf3xQ/AHqBGzpT4V0efhSA=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"3d2a1149d7ba476b86253a0cd6ed74d9"}, [
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
  '7720c648-daa6-478e-a117-4e42a3471f9c',
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
  'Thu, 02 Jul 2020 18:37:22 GMT',
  'Content-Length',
  '1333'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistcertificates-1/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistcertificates-1/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAreh+5TVlU3LSJ7JiPtL+w/87AVv0gEcaqcUCbk9lhWZxtcX189EHmCpC/hCsfHoZh37iAAGvaZ3nfJwdm8nfqvPQDTQd81A9rNXo0AnpqTpxesCAm3dQPD/ASZOyUZJIce8hmiZs7pIiyUDfEhA087Pxgz0uapLiyMFCJ/9mhGOexmBP3JeVKNixdf/asw4Qt7IMqCr0BmMGf0DsFq9Cq4JEvOWGNcuLaiaGCXv7cV7mM5yy4B7+XCeA328BxUi0igVlXuN0c8vjkGkhdDJ5YS0aTDs3rs2IpMWKoX4c8la4bdnJmCSrsddpzCqU1WtxUErt/UQSN43W0ge0HZTEdQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAKAJj0B9doUrwXP4VEoRpV+p02WwyieoAxd+IuSqgTkiFqPdkJVMGy5S/4iWGuMKkoRVqJayNK+ODIkiNtdiWbyhRLTnaKvWXOtJ+gv8MkIjbw1hMqEYnTS8xmwLzFwopKeDB2w6pUgIzAEGj8QtXsT057GH8HaMdCF+Yzln/mI/Yf1o5frQk3T6dWVTk8BFcAv819fgsXKFQDvW+qNLFZXHdrXha57QCm1ywz+1P0y1TJCfAOOlxmC+wihS33vlntBJiC4V4GvfRoIRD3DVP4MHMAuK+PKYHiBfkddL6sYKntkxnmHUrf7OY0pHClQYhKf3xQ/AHqBGzpT4V0efhSA=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"3d2a1149d7ba476b86253a0cd6ed74d9"}, [
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
  '4c8c4e60-032e-4cc0-880b-725cf5230ee0',
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
  'Thu, 02 Jul 2020 18:37:24 GMT',
  'Content-Length',
  '1333'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistcertificates-1/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistcertificates-1/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAreh+5TVlU3LSJ7JiPtL+w/87AVv0gEcaqcUCbk9lhWZxtcX189EHmCpC/hCsfHoZh37iAAGvaZ3nfJwdm8nfqvPQDTQd81A9rNXo0AnpqTpxesCAm3dQPD/ASZOyUZJIce8hmiZs7pIiyUDfEhA087Pxgz0uapLiyMFCJ/9mhGOexmBP3JeVKNixdf/asw4Qt7IMqCr0BmMGf0DsFq9Cq4JEvOWGNcuLaiaGCXv7cV7mM5yy4B7+XCeA328BxUi0igVlXuN0c8vjkGkhdDJ5YS0aTDs3rs2IpMWKoX4c8la4bdnJmCSrsddpzCqU1WtxUErt/UQSN43W0ge0HZTEdQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAKAJj0B9doUrwXP4VEoRpV+p02WwyieoAxd+IuSqgTkiFqPdkJVMGy5S/4iWGuMKkoRVqJayNK+ODIkiNtdiWbyhRLTnaKvWXOtJ+gv8MkIjbw1hMqEYnTS8xmwLzFwopKeDB2w6pUgIzAEGj8QtXsT057GH8HaMdCF+Yzln/mI/Yf1o5frQk3T6dWVTk8BFcAv819fgsXKFQDvW+qNLFZXHdrXha57QCm1ywz+1P0y1TJCfAOOlxmC+wihS33vlntBJiC4V4GvfRoIRD3DVP4MHMAuK+PKYHiBfkddL6sYKntkxnmHUrf7OY0pHClQYhKf3xQ/AHqBGzpT4V0efhSA=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"3d2a1149d7ba476b86253a0cd6ed74d9"}, [
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
  '5ed99c83-969a-45da-bcdc-e2246e9b0573',
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
  'Thu, 02 Jul 2020 18:37:26 GMT',
  'Content-Length',
  '1333'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistcertificates-1/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistcertificates-1/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAreh+5TVlU3LSJ7JiPtL+w/87AVv0gEcaqcUCbk9lhWZxtcX189EHmCpC/hCsfHoZh37iAAGvaZ3nfJwdm8nfqvPQDTQd81A9rNXo0AnpqTpxesCAm3dQPD/ASZOyUZJIce8hmiZs7pIiyUDfEhA087Pxgz0uapLiyMFCJ/9mhGOexmBP3JeVKNixdf/asw4Qt7IMqCr0BmMGf0DsFq9Cq4JEvOWGNcuLaiaGCXv7cV7mM5yy4B7+XCeA328BxUi0igVlXuN0c8vjkGkhdDJ5YS0aTDs3rs2IpMWKoX4c8la4bdnJmCSrsddpzCqU1WtxUErt/UQSN43W0ge0HZTEdQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAKAJj0B9doUrwXP4VEoRpV+p02WwyieoAxd+IuSqgTkiFqPdkJVMGy5S/4iWGuMKkoRVqJayNK+ODIkiNtdiWbyhRLTnaKvWXOtJ+gv8MkIjbw1hMqEYnTS8xmwLzFwopKeDB2w6pUgIzAEGj8QtXsT057GH8HaMdCF+Yzln/mI/Yf1o5frQk3T6dWVTk8BFcAv819fgsXKFQDvW+qNLFZXHdrXha57QCm1ywz+1P0y1TJCfAOOlxmC+wihS33vlntBJiC4V4GvfRoIRD3DVP4MHMAuK+PKYHiBfkddL6sYKntkxnmHUrf7OY0pHClQYhKf3xQ/AHqBGzpT4V0efhSA=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"3d2a1149d7ba476b86253a0cd6ed74d9"}, [
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
  '2a5de4f3-d007-431e-9753-9b37e42bf1c1',
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
  'Thu, 02 Jul 2020 18:37:28 GMT',
  'Content-Length',
  '1333'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistcertificates-1/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistcertificates-1/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAreh+5TVlU3LSJ7JiPtL+w/87AVv0gEcaqcUCbk9lhWZxtcX189EHmCpC/hCsfHoZh37iAAGvaZ3nfJwdm8nfqvPQDTQd81A9rNXo0AnpqTpxesCAm3dQPD/ASZOyUZJIce8hmiZs7pIiyUDfEhA087Pxgz0uapLiyMFCJ/9mhGOexmBP3JeVKNixdf/asw4Qt7IMqCr0BmMGf0DsFq9Cq4JEvOWGNcuLaiaGCXv7cV7mM5yy4B7+XCeA328BxUi0igVlXuN0c8vjkGkhdDJ5YS0aTDs3rs2IpMWKoX4c8la4bdnJmCSrsddpzCqU1WtxUErt/UQSN43W0ge0HZTEdQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAKAJj0B9doUrwXP4VEoRpV+p02WwyieoAxd+IuSqgTkiFqPdkJVMGy5S/4iWGuMKkoRVqJayNK+ODIkiNtdiWbyhRLTnaKvWXOtJ+gv8MkIjbw1hMqEYnTS8xmwLzFwopKeDB2w6pUgIzAEGj8QtXsT057GH8HaMdCF+Yzln/mI/Yf1o5frQk3T6dWVTk8BFcAv819fgsXKFQDvW+qNLFZXHdrXha57QCm1ywz+1P0y1TJCfAOOlxmC+wihS33vlntBJiC4V4GvfRoIRD3DVP4MHMAuK+PKYHiBfkddL6sYKntkxnmHUrf7OY0pHClQYhKf3xQ/AHqBGzpT4V0efhSA=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"3d2a1149d7ba476b86253a0cd6ed74d9"}, [
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
  'c1780cdf-b13e-4200-81e3-8ee6cc37807c',
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
  'Thu, 02 Jul 2020 18:37:30 GMT',
  'Content-Length',
  '1333'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistcertificates-1/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistcertificates-1/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAreh+5TVlU3LSJ7JiPtL+w/87AVv0gEcaqcUCbk9lhWZxtcX189EHmCpC/hCsfHoZh37iAAGvaZ3nfJwdm8nfqvPQDTQd81A9rNXo0AnpqTpxesCAm3dQPD/ASZOyUZJIce8hmiZs7pIiyUDfEhA087Pxgz0uapLiyMFCJ/9mhGOexmBP3JeVKNixdf/asw4Qt7IMqCr0BmMGf0DsFq9Cq4JEvOWGNcuLaiaGCXv7cV7mM5yy4B7+XCeA328BxUi0igVlXuN0c8vjkGkhdDJ5YS0aTDs3rs2IpMWKoX4c8la4bdnJmCSrsddpzCqU1WtxUErt/UQSN43W0ge0HZTEdQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAKAJj0B9doUrwXP4VEoRpV+p02WwyieoAxd+IuSqgTkiFqPdkJVMGy5S/4iWGuMKkoRVqJayNK+ODIkiNtdiWbyhRLTnaKvWXOtJ+gv8MkIjbw1hMqEYnTS8xmwLzFwopKeDB2w6pUgIzAEGj8QtXsT057GH8HaMdCF+Yzln/mI/Yf1o5frQk3T6dWVTk8BFcAv819fgsXKFQDvW+qNLFZXHdrXha57QCm1ywz+1P0y1TJCfAOOlxmC+wihS33vlntBJiC4V4GvfRoIRD3DVP4MHMAuK+PKYHiBfkddL6sYKntkxnmHUrf7OY0pHClQYhKf3xQ/AHqBGzpT4V0efhSA=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"3d2a1149d7ba476b86253a0cd6ed74d9"}, [
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
  '2bc0de6f-8820-4858-bbc0-7188f3b894ea',
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
  'Thu, 02 Jul 2020 18:37:32 GMT',
  'Content-Length',
  '1333'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistcertificates-1/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistcertificates-1/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAreh+5TVlU3LSJ7JiPtL+w/87AVv0gEcaqcUCbk9lhWZxtcX189EHmCpC/hCsfHoZh37iAAGvaZ3nfJwdm8nfqvPQDTQd81A9rNXo0AnpqTpxesCAm3dQPD/ASZOyUZJIce8hmiZs7pIiyUDfEhA087Pxgz0uapLiyMFCJ/9mhGOexmBP3JeVKNixdf/asw4Qt7IMqCr0BmMGf0DsFq9Cq4JEvOWGNcuLaiaGCXv7cV7mM5yy4B7+XCeA328BxUi0igVlXuN0c8vjkGkhdDJ5YS0aTDs3rs2IpMWKoX4c8la4bdnJmCSrsddpzCqU1WtxUErt/UQSN43W0ge0HZTEdQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAKAJj0B9doUrwXP4VEoRpV+p02WwyieoAxd+IuSqgTkiFqPdkJVMGy5S/4iWGuMKkoRVqJayNK+ODIkiNtdiWbyhRLTnaKvWXOtJ+gv8MkIjbw1hMqEYnTS8xmwLzFwopKeDB2w6pUgIzAEGj8QtXsT057GH8HaMdCF+Yzln/mI/Yf1o5frQk3T6dWVTk8BFcAv819fgsXKFQDvW+qNLFZXHdrXha57QCm1ywz+1P0y1TJCfAOOlxmC+wihS33vlntBJiC4V4GvfRoIRD3DVP4MHMAuK+PKYHiBfkddL6sYKntkxnmHUrf7OY0pHClQYhKf3xQ/AHqBGzpT4V0efhSA=","cancellation_requested":false,"status":"completed","target":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistcertificates-1","request_id":"3d2a1149d7ba476b86253a0cd6ed74d9"}, [
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
  '6fcda354-1137-4cda-a734-50da7dc219c5',
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
  'Thu, 02 Jul 2020 18:37:35 GMT',
  'Content-Length',
  '1293'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistcertificates-1/')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistcertificates-1/e620996f27344101a180253550510179","kid":"https://keyvault_name.vault.azure.net/keys/listCertificateName-canlistcertificates-1/e620996f27344101a180253550510179","sid":"https://keyvault_name.vault.azure.net/secrets/listCertificateName-canlistcertificates-1/e620996f27344101a180253550510179","x5t":"DvMa2zOf1EeBzfHbn6JCQEAgFCE","cer":"MIIDKDCCAhCgAwIBAgIQNVHQeTZCSBeksfzY/oVA5DANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjAwNzAyMTgyNzMzWhcNMjEwNzAyMTgzNzMzWjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQCt6H7lNWVTctInsmI+0v7D/zsBW/SARxqpxQJuT2WFZnG1xfXz0QeYKkL+EKx8ehmHfuIAAa9pned8nB2byd+q89ANNB3zUD2s1ejQCempOnF6wICbd1A8P8BJk7JRkkhx7yGaJmzukiLJQN8SEDTzs/GDPS5qkuLIwUIn/2aEY57GYE/cl5Uo2LF1/9qzDhC3sgyoKvQGYwZ/QOwWr0KrgkS85YY1y4tqJoYJe/txXuYznLLgHv5cJ4DfbwHFSLSKBWVe43Rzy+OQaSF0MnlhLRpMOzeuzYikxYqhfhzyVrht2cmYJKux12nMKpTVa3FQSu39RBI3jdbSB7QdlMR1AgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBTaWSz9ODq3tObelr61leeEetn1RzAdBgNVHQ4EFgQU2lks/Tg6t7Tm3pa+tZXnhHrZ9UcwDQYJKoZIhvcNAQELBQADggEBAJUwgbV4a8UBPOfc+O3hGZLOwYUX1aRCPC+MD2PzjpjNaa46volOv8dfzgW2+7Fqiyoy9Mk7qrB3/+6AanSP8E6uiXQAyspI435XpubOh3o5AU+78xp0Q6eeyCMyhUaSo7iuR9jjj3wzasT6jN2wwB+2Ye2k0T/nNLkN2XUdtFF0FWDRJ3mFCJbpZdvls9J2JScJqNkvcGn21rlseSYf1yOlJXIjdKe3eNghTOTh5wa4CxgqPdxo/QIy00Vi9UMuk3kiU7GBWrrDUeqc0MXIvAcIBhfmNBI+o++tY8pGFaMPc1AVeWch/4KkFQooTyUvTjwR4d71bXvssRAxvOIOtEE=","attributes":{"enabled":true,"nbf":1593714453,"exp":1625251053,"created":1593715053,"updated":1593715053,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistcertificates-1/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1593715032,"updated":1593715032}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistcertificates-1/pending"}}, [
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
  '6a8f5676-5abe-4502-94c4-dcfba75fd67f',
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
  'Thu, 02 Jul 2020 18:37:35 GMT',
  'Content-Length',
  '2555'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates')
  .query(true)
  .reply(200, {"value":[{"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistcertificates-0","x5t":"YMTSNXYNGWVlHzg4Q4F884-khmY","attributes":{"enabled":true,"nbf":1593714429,"exp":1625251029,"created":1593715029,"updated":1593715029},"subject":""},{"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistcertificates-1","x5t":"DvMa2zOf1EeBzfHbn6JCQEAgFCE","attributes":{"enabled":true,"nbf":1593714453,"exp":1625251053,"created":1593715053,"updated":1593715053},"subject":""}],"nextLink":null}, [
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
  'd0a42e2c-a5ae-42c6-a69a-4a4a3ecbd061',
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
  'Thu, 02 Jul 2020 18:37:35 GMT',
  'Content-Length',
  '583'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/certificates/listCertificateName-canlistcertificates-0')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/listCertificateName-canlistcertificates-0","deletedDate":1593715055,"scheduledPurgeDate":1601491055,"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistcertificates-0/22053a2366c8498f8d9958cfa2be2038","kid":"https://keyvault_name.vault.azure.net/keys/listCertificateName-canlistcertificates-0/22053a2366c8498f8d9958cfa2be2038","sid":"https://keyvault_name.vault.azure.net/secrets/listCertificateName-canlistcertificates-0/22053a2366c8498f8d9958cfa2be2038","x5t":"YMTSNXYNGWVlHzg4Q4F884-khmY","cer":"MIIDKDCCAhCgAwIBAgIQTm26rHoKRbylzjTJBhkWuzANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjAwNzAyMTgyNzA5WhcNMjEwNzAyMTgzNzA5WjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQDsf7mKKIFrAPaxgfQentUVXVzjqta2QzElA9ejmUI69ttVSoxC8JHD+VxpFA903Ss3MXLBrjSbHPIphpaLf/A0oz28IjVeI7I7qyf8zPmVxfSLSvDkZmLH5JRYMAmz3lzZIaAofiZ/SCOga0suZxZmvPdDViAk8KL1QsVGgeubQLUKFVYYhUhx9RDJ4ty0C1REa23Wn5Lmj0oodTHPfv8SB5akI4zxSF5uDVh3nEK+KUier7j9DBJ0H+lzSXiJKvodukd7zlBeoEHbxZ7PYI5YzOKyZwHWssWB42VMsk02r7CqdVt1/ctsjhcFNjnKlGpQnrs0wTnUlALftpXSawOjAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBTiHR4FGV57TElVhXkx6oqXhtAF7jAdBgNVHQ4EFgQU4h0eBRlee0xJVYV5MeqKl4bQBe4wDQYJKoZIhvcNAQELBQADggEBAHlCYFSBTGOpSqIggtLr7MFSxKjaIhIY2C+3K/NFf71Hes6LnakTY55fiIlzSJGuLtmzxeyOJHrojXX74+55UhvScgUiWmDGLETEhR9+USgLu2OOyw/uQmpuRkq9Vu/g9T4S8kpEi81+a5VlWa2sEBjmH8a5lSGkuGekNSi1/2l85ZZRtAflXibtB389qZknFD0o7WT4OIBY42HZKm8oIkDCVXPT6Fp9oz37KZr//DaHGXjvpusvpqEBo9hJghEDbUsOBZrQJOBHlCcyyKH9Zm+uvGWCsT8R/M8iBpbvInii5q2UKGdgs+FkQo8TpkZ8791IBM+j6QMi51pwcyuHgb0=","attributes":{"enabled":true,"nbf":1593714429,"exp":1625251029,"created":1593715029,"updated":1593715029,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistcertificates-0/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1593715015,"updated":1593715015}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistcertificates-0/pending"}}, [
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
  '84d7e525-4d08-4b16-af15-834c98e423a3',
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
  'Thu, 02 Jul 2020 18:37:36 GMT',
  'Content-Length',
  '2748'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistcertificates-0')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistcertificates-0"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '141',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'e91de090-d5b2-458a-9423-eab0d91e6178',
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
  'Thu, 02 Jul 2020 18:37:36 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistcertificates-0')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistcertificates-0"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '141',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '9bb706c3-fad7-40d0-a4be-28ce02182c76',
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
  'Thu, 02 Jul 2020 18:37:36 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistcertificates-0')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistcertificates-0"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '141',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '560905f6-3457-43c6-98b9-8dab79a12543',
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
  'Thu, 02 Jul 2020 18:37:37 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistcertificates-0')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistcertificates-0"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '141',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'ff9b8af0-d6c6-455e-9b05-b7ecbf6c8c92',
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
  'Thu, 02 Jul 2020 18:37:39 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistcertificates-0')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistcertificates-0"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '141',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '9b9fc48e-02e8-4b99-ae4e-7c877cfe1ca4',
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
  'Thu, 02 Jul 2020 18:37:41 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistcertificates-0')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistcertificates-0"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '141',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '1d1aebeb-a994-4661-8415-4541528daa65',
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
  'Thu, 02 Jul 2020 18:37:43 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistcertificates-0')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistcertificates-0"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '141',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'd02dbcfd-a498-4d37-929b-0a75ac273b37',
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
  'Thu, 02 Jul 2020 18:37:45 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistcertificates-0')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/listCertificateName-canlistcertificates-0","deletedDate":1593715055,"scheduledPurgeDate":1601491055,"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistcertificates-0/22053a2366c8498f8d9958cfa2be2038","kid":"https://keyvault_name.vault.azure.net/keys/listCertificateName-canlistcertificates-0/22053a2366c8498f8d9958cfa2be2038","sid":"https://keyvault_name.vault.azure.net/secrets/listCertificateName-canlistcertificates-0/22053a2366c8498f8d9958cfa2be2038","x5t":"YMTSNXYNGWVlHzg4Q4F884-khmY","cer":"MIIDKDCCAhCgAwIBAgIQTm26rHoKRbylzjTJBhkWuzANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjAwNzAyMTgyNzA5WhcNMjEwNzAyMTgzNzA5WjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQDsf7mKKIFrAPaxgfQentUVXVzjqta2QzElA9ejmUI69ttVSoxC8JHD+VxpFA903Ss3MXLBrjSbHPIphpaLf/A0oz28IjVeI7I7qyf8zPmVxfSLSvDkZmLH5JRYMAmz3lzZIaAofiZ/SCOga0suZxZmvPdDViAk8KL1QsVGgeubQLUKFVYYhUhx9RDJ4ty0C1REa23Wn5Lmj0oodTHPfv8SB5akI4zxSF5uDVh3nEK+KUier7j9DBJ0H+lzSXiJKvodukd7zlBeoEHbxZ7PYI5YzOKyZwHWssWB42VMsk02r7CqdVt1/ctsjhcFNjnKlGpQnrs0wTnUlALftpXSawOjAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBTiHR4FGV57TElVhXkx6oqXhtAF7jAdBgNVHQ4EFgQU4h0eBRlee0xJVYV5MeqKl4bQBe4wDQYJKoZIhvcNAQELBQADggEBAHlCYFSBTGOpSqIggtLr7MFSxKjaIhIY2C+3K/NFf71Hes6LnakTY55fiIlzSJGuLtmzxeyOJHrojXX74+55UhvScgUiWmDGLETEhR9+USgLu2OOyw/uQmpuRkq9Vu/g9T4S8kpEi81+a5VlWa2sEBjmH8a5lSGkuGekNSi1/2l85ZZRtAflXibtB389qZknFD0o7WT4OIBY42HZKm8oIkDCVXPT6Fp9oz37KZr//DaHGXjvpusvpqEBo9hJghEDbUsOBZrQJOBHlCcyyKH9Zm+uvGWCsT8R/M8iBpbvInii5q2UKGdgs+FkQo8TpkZ8791IBM+j6QMi51pwcyuHgb0=","attributes":{"enabled":true,"nbf":1593714429,"exp":1625251029,"created":1593715029,"updated":1593715029,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistcertificates-0/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1593715015,"updated":1593715015}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistcertificates-0/pending"}}, [
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
  '6e897635-d497-4e13-bf11-953264247b6d',
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
  'Thu, 02 Jul 2020 18:37:47 GMT',
  'Content-Length',
  '2748'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedcertificates/listCertificateName-canlistcertificates-0')
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
  '10abef7e-9404-4e84-85a5-fea94d4d24be',
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
  'Thu, 02 Jul 2020 18:37:48 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/certificates/listCertificateName-canlistcertificates-1')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/listCertificateName-canlistcertificates-1","deletedDate":1593715068,"scheduledPurgeDate":1601491068,"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistcertificates-1/e620996f27344101a180253550510179","kid":"https://keyvault_name.vault.azure.net/keys/listCertificateName-canlistcertificates-1/e620996f27344101a180253550510179","sid":"https://keyvault_name.vault.azure.net/secrets/listCertificateName-canlistcertificates-1/e620996f27344101a180253550510179","x5t":"DvMa2zOf1EeBzfHbn6JCQEAgFCE","cer":"MIIDKDCCAhCgAwIBAgIQNVHQeTZCSBeksfzY/oVA5DANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjAwNzAyMTgyNzMzWhcNMjEwNzAyMTgzNzMzWjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQCt6H7lNWVTctInsmI+0v7D/zsBW/SARxqpxQJuT2WFZnG1xfXz0QeYKkL+EKx8ehmHfuIAAa9pned8nB2byd+q89ANNB3zUD2s1ejQCempOnF6wICbd1A8P8BJk7JRkkhx7yGaJmzukiLJQN8SEDTzs/GDPS5qkuLIwUIn/2aEY57GYE/cl5Uo2LF1/9qzDhC3sgyoKvQGYwZ/QOwWr0KrgkS85YY1y4tqJoYJe/txXuYznLLgHv5cJ4DfbwHFSLSKBWVe43Rzy+OQaSF0MnlhLRpMOzeuzYikxYqhfhzyVrht2cmYJKux12nMKpTVa3FQSu39RBI3jdbSB7QdlMR1AgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBTaWSz9ODq3tObelr61leeEetn1RzAdBgNVHQ4EFgQU2lks/Tg6t7Tm3pa+tZXnhHrZ9UcwDQYJKoZIhvcNAQELBQADggEBAJUwgbV4a8UBPOfc+O3hGZLOwYUX1aRCPC+MD2PzjpjNaa46volOv8dfzgW2+7Fqiyoy9Mk7qrB3/+6AanSP8E6uiXQAyspI435XpubOh3o5AU+78xp0Q6eeyCMyhUaSo7iuR9jjj3wzasT6jN2wwB+2Ye2k0T/nNLkN2XUdtFF0FWDRJ3mFCJbpZdvls9J2JScJqNkvcGn21rlseSYf1yOlJXIjdKe3eNghTOTh5wa4CxgqPdxo/QIy00Vi9UMuk3kiU7GBWrrDUeqc0MXIvAcIBhfmNBI+o++tY8pGFaMPc1AVeWch/4KkFQooTyUvTjwR4d71bXvssRAxvOIOtEE=","attributes":{"enabled":true,"nbf":1593714453,"exp":1625251053,"created":1593715053,"updated":1593715053,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistcertificates-1/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1593715032,"updated":1593715032}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistcertificates-1/pending"}}, [
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
  '0bf0bfd0-72cb-4e26-b2ca-080d9ed4b6d5',
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
  'Thu, 02 Jul 2020 18:37:48 GMT',
  'Content-Length',
  '2748'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistcertificates-1')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistcertificates-1"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '141',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '98764c4b-efb8-4962-a634-3156dc949241',
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
  'Thu, 02 Jul 2020 18:37:48 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistcertificates-1')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistcertificates-1"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '141',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '6e3a72bc-f3e9-49ec-87a8-22d035e35ba3',
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
  'Thu, 02 Jul 2020 18:37:48 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistcertificates-1')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistcertificates-1"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '141',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '36be67a6-cb0b-4302-9fd6-5215b81daa52',
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
  'Thu, 02 Jul 2020 18:37:50 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistcertificates-1')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistcertificates-1"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '141',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'ee704069-aa99-428d-ab5f-784822a5cdef',
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
  'Thu, 02 Jul 2020 18:37:53 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistcertificates-1')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistcertificates-1"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '141',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '313bf60f-7295-4aba-98ba-d7788db1a4df',
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
  'Thu, 02 Jul 2020 18:37:54 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistcertificates-1')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistcertificates-1"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '141',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '4ce8a6e5-7af7-46d0-b9fe-066e1ce221a0',
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
  'Thu, 02 Jul 2020 18:37:56 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistcertificates-1')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistcertificates-1"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '141',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '51c012e7-57fa-4789-8b4a-82528b3db88b',
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
  'Thu, 02 Jul 2020 18:37:58 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistcertificates-1')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistcertificates-1"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '141',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'ef38cada-79fe-4133-92bb-17c17e3d5c71',
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
  'Thu, 02 Jul 2020 18:38:00 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistcertificates-1')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistcertificates-1"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '141',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '02be225b-80cb-4655-8121-791800b2e017',
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
  'Thu, 02 Jul 2020 18:38:02 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistcertificates-1')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistcertificates-1"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '141',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '1ac8d368-500a-4be3-998b-af1469c36c72',
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
  'Thu, 02 Jul 2020 18:38:05 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistcertificates-1')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/listCertificateName-canlistcertificates-1","deletedDate":1593715068,"scheduledPurgeDate":1601491068,"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistcertificates-1/e620996f27344101a180253550510179","kid":"https://keyvault_name.vault.azure.net/keys/listCertificateName-canlistcertificates-1/e620996f27344101a180253550510179","sid":"https://keyvault_name.vault.azure.net/secrets/listCertificateName-canlistcertificates-1/e620996f27344101a180253550510179","x5t":"DvMa2zOf1EeBzfHbn6JCQEAgFCE","cer":"MIIDKDCCAhCgAwIBAgIQNVHQeTZCSBeksfzY/oVA5DANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjAwNzAyMTgyNzMzWhcNMjEwNzAyMTgzNzMzWjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQCt6H7lNWVTctInsmI+0v7D/zsBW/SARxqpxQJuT2WFZnG1xfXz0QeYKkL+EKx8ehmHfuIAAa9pned8nB2byd+q89ANNB3zUD2s1ejQCempOnF6wICbd1A8P8BJk7JRkkhx7yGaJmzukiLJQN8SEDTzs/GDPS5qkuLIwUIn/2aEY57GYE/cl5Uo2LF1/9qzDhC3sgyoKvQGYwZ/QOwWr0KrgkS85YY1y4tqJoYJe/txXuYznLLgHv5cJ4DfbwHFSLSKBWVe43Rzy+OQaSF0MnlhLRpMOzeuzYikxYqhfhzyVrht2cmYJKux12nMKpTVa3FQSu39RBI3jdbSB7QdlMR1AgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBTaWSz9ODq3tObelr61leeEetn1RzAdBgNVHQ4EFgQU2lks/Tg6t7Tm3pa+tZXnhHrZ9UcwDQYJKoZIhvcNAQELBQADggEBAJUwgbV4a8UBPOfc+O3hGZLOwYUX1aRCPC+MD2PzjpjNaa46volOv8dfzgW2+7Fqiyoy9Mk7qrB3/+6AanSP8E6uiXQAyspI435XpubOh3o5AU+78xp0Q6eeyCMyhUaSo7iuR9jjj3wzasT6jN2wwB+2Ye2k0T/nNLkN2XUdtFF0FWDRJ3mFCJbpZdvls9J2JScJqNkvcGn21rlseSYf1yOlJXIjdKe3eNghTOTh5wa4CxgqPdxo/QIy00Vi9UMuk3kiU7GBWrrDUeqc0MXIvAcIBhfmNBI+o++tY8pGFaMPc1AVeWch/4KkFQooTyUvTjwR4d71bXvssRAxvOIOtEE=","attributes":{"enabled":true,"nbf":1593714453,"exp":1625251053,"created":1593715053,"updated":1593715053,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistcertificates-1/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1593715032,"updated":1593715032}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistcertificates-1/pending"}}, [
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
  '06737d5b-88f6-4535-b9e1-3b43dec2dba6',
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
  'Thu, 02 Jul 2020 18:38:07 GMT',
  'Content-Length',
  '2748'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedcertificates/listCertificateName-canlistcertificates-1')
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
  'cfdeaafa-26e5-4d2c-9e10-96a0e2b4fb0a',
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
  'Thu, 02 Jul 2020 18:38:07 GMT'
]);

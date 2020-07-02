let nock = require('nock');

module.exports.hash = "56607d58909523c0d571d68eb81d07c3";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/certificates/listCertificateName-canlistdeletedcertificatesbypage-0/create')
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
  'be5a5e45-79df-4fcf-93c9-70d00ebf624c',
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
  'Thu, 25 Jun 2020 14:26:04 GMT'
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
  'c96ed92b-4b1c-47f9-8837-4dcb903e2401',
  'x-ms-ests-server',
  '2.1.10732.8 - NCUS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AvW-mk1J4xdDqBtNBhiJm4o_aSJHAQAAAPuqhtYOAAAA; expires=Sat, 25-Jul-2020 14:26:04 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; SameSite=None; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; SameSite=None; secure; HttpOnly',
  'Date',
  'Thu, 25 Jun 2020 14:26:04 GMT',
  'Content-Length',
  '1315'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/certificates/listCertificateName-canlistdeletedcertificatesbypage-0/create', {"policy":{"key_props":{},"secret_props":{},"x509_props":{"subject":"cn=MyCert","sans":{}},"issuer":{"name":"Self"},"attributes":{}},"attributes":{}})
  .query(true)
  .reply(202, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificatesbypage-0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEApvbOxEF0ePZhD4uCAEPFg1LmICLECxRHUT0Gdg5AbwTo5GdavgjEhlUkSwRj7ahD0oVFeRy2zqKvcsuFbf6iRtQs9G7vErn6liAXre0uikvBa9NNgvDHldEyFfQpk9K1FfToS9iMv+6Mbf0xOnUJueK4iMyxYHG6bDJ36R/jY6pq1riSFQOWs/AC85wrtGmmKJQyn6OR8OYArgebhDHSRzGoI3uGfR0oAV8wdk75ETq6RdlzDKiFb40CU3GSDE1r/7SOsgAuFew0upoK7Xnh+NvGJr55fGBuGZACXTRpP94WCWvzrWfIayJXnJRNAlWxD1fIxWX5GBUYfZY5rj5KXwIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBABAcfEcyDPBEjAbrE6DU1LRT+q0gPqcJNy+1J7d7v3BU59MCjdTgkYJdI4KTILtsi+PHKb5caagRK92I7ENlDz6nOzBuhIA2B5g0XAEEt9mumKLz9eaAaJel58UJOsRG/YsFf1AlU8oc//KUO01LLvAP673MqTmUOms4kmnKwPUJoIKapPBnKt1SBUi4DIIjPMbYj11/rP4ErNpy2iNF7ooZ/+5Im2WMMOMUaZCE0hnN1QD1yAJIiVF1XmJL+ghk3WXtYDwP/MLBOWxo50tjTfEoHM+RH9Wy3aN/ZpRIM89awyG40DO+G7ikocdOZlrYjlWIycU3ZE+5k4JzIwDr+ew=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"084305290a714ad19fbce65d5d136e79"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificatesbypage-0/pending?api-version=7.1-preview&request_id=084305290a714ad19fbce65d5d136e79',
  'Retry-After',
  '10',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'b163054b-8e62-4cae-8e1f-8b25b40c7072',
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
  'Thu, 25 Jun 2020 14:26:05 GMT',
  'Content-Length',
  '1346'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistdeletedcertificatesbypage-0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificatesbypage-0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEApvbOxEF0ePZhD4uCAEPFg1LmICLECxRHUT0Gdg5AbwTo5GdavgjEhlUkSwRj7ahD0oVFeRy2zqKvcsuFbf6iRtQs9G7vErn6liAXre0uikvBa9NNgvDHldEyFfQpk9K1FfToS9iMv+6Mbf0xOnUJueK4iMyxYHG6bDJ36R/jY6pq1riSFQOWs/AC85wrtGmmKJQyn6OR8OYArgebhDHSRzGoI3uGfR0oAV8wdk75ETq6RdlzDKiFb40CU3GSDE1r/7SOsgAuFew0upoK7Xnh+NvGJr55fGBuGZACXTRpP94WCWvzrWfIayJXnJRNAlWxD1fIxWX5GBUYfZY5rj5KXwIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBABAcfEcyDPBEjAbrE6DU1LRT+q0gPqcJNy+1J7d7v3BU59MCjdTgkYJdI4KTILtsi+PHKb5caagRK92I7ENlDz6nOzBuhIA2B5g0XAEEt9mumKLz9eaAaJel58UJOsRG/YsFf1AlU8oc//KUO01LLvAP673MqTmUOms4kmnKwPUJoIKapPBnKt1SBUi4DIIjPMbYj11/rP4ErNpy2iNF7ooZ/+5Im2WMMOMUaZCE0hnN1QD1yAJIiVF1XmJL+ghk3WXtYDwP/MLBOWxo50tjTfEoHM+RH9Wy3aN/ZpRIM89awyG40DO+G7ikocdOZlrYjlWIycU3ZE+5k4JzIwDr+ew=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"084305290a714ad19fbce65d5d136e79"}, [
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
  '72419607-a190-4d93-9ccf-4ecc5f943162',
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
  'Thu, 25 Jun 2020 14:26:05 GMT',
  'Content-Length',
  '1346'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/certificates/listCertificateName-canlistdeletedcertificatesbypage-1/create', {"policy":{"key_props":{},"secret_props":{},"x509_props":{"subject":"cn=MyCert","sans":{}},"issuer":{"name":"Self"},"attributes":{}},"attributes":{}})
  .query(true)
  .reply(202, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificatesbypage-1/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAyzUbjUhXrfiIUtlw4oXJBN7i0dphgOaM6YchfTc/yGORKzmVbiD2KcB644NDJRYuaDM9mQRcK+/SS7r6CUs3BnNhvXC0LaSfDYGytkHblPZOMWeWLpkRMrHr7b0woZLmb/II9KT4qmpkHka0vT0vaKBf5b8IbI9Y7F6Rj78kdpIbsoX42Gwy42sk+daPD+r7KxRfHLtpGFVRkMIA0LoWf4XXIpX7vsrjudpNg0V3h/mQfFOkl7GOvP2ZF65fe7/VAoI808TjdNd1TfYiiBBPomlyZoMTIhDdaOrvAB3HDFw+KxMsPyQGQE/WOAOmYpoSP48+14svtgNOKpAEP8Mr5QIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAL6bxfIs/N++VHl3keeW94HsNlNCCi9+e1GCThHn46FdMRGgEWn6/lMBPrCG+q9tpWubrQODsVT0+rg5xTnXO0JrTJ5UANB9lc27D3CSIvwT4OtDoJEzrsPz1ZszB/QKvdIdi3TUdX99wKgR9fo5/2KELJ9l5Q6Bdw0srtCwsYSnd3ZNGPS0l7uX3R33vczMypRWGuqomNSW4KE/2iaarsKgUn9xzRNODOJQnpI7GdcsF73WUo9BJFKePZ8Q1U1LeqbwcXCqFagduVQvy7e5mkXBPPXCSiCkOsFYk+X8H6JPWy9Pg9q2yn+ul9X9TntpYqUDlevBTnT9TkkZmIToroo=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"c9cffc009ebe4e6a9654077473c7018b"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificatesbypage-1/pending?api-version=7.1-preview&request_id=c9cffc009ebe4e6a9654077473c7018b',
  'Retry-After',
  '10',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '9d6eee64-3c33-4278-a09b-5b2201eb376b',
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
  'Thu, 25 Jun 2020 14:26:06 GMT',
  'Content-Length',
  '1346'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistdeletedcertificatesbypage-1/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificatesbypage-1/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAyzUbjUhXrfiIUtlw4oXJBN7i0dphgOaM6YchfTc/yGORKzmVbiD2KcB644NDJRYuaDM9mQRcK+/SS7r6CUs3BnNhvXC0LaSfDYGytkHblPZOMWeWLpkRMrHr7b0woZLmb/II9KT4qmpkHka0vT0vaKBf5b8IbI9Y7F6Rj78kdpIbsoX42Gwy42sk+daPD+r7KxRfHLtpGFVRkMIA0LoWf4XXIpX7vsrjudpNg0V3h/mQfFOkl7GOvP2ZF65fe7/VAoI808TjdNd1TfYiiBBPomlyZoMTIhDdaOrvAB3HDFw+KxMsPyQGQE/WOAOmYpoSP48+14svtgNOKpAEP8Mr5QIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAL6bxfIs/N++VHl3keeW94HsNlNCCi9+e1GCThHn46FdMRGgEWn6/lMBPrCG+q9tpWubrQODsVT0+rg5xTnXO0JrTJ5UANB9lc27D3CSIvwT4OtDoJEzrsPz1ZszB/QKvdIdi3TUdX99wKgR9fo5/2KELJ9l5Q6Bdw0srtCwsYSnd3ZNGPS0l7uX3R33vczMypRWGuqomNSW4KE/2iaarsKgUn9xzRNODOJQnpI7GdcsF73WUo9BJFKePZ8Q1U1LeqbwcXCqFagduVQvy7e5mkXBPPXCSiCkOsFYk+X8H6JPWy9Pg9q2yn+ul9X9TntpYqUDlevBTnT9TkkZmIToroo=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"c9cffc009ebe4e6a9654077473c7018b"}, [
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
  '7b88e395-843d-4324-a74c-f065ca12508f',
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
  'Thu, 25 Jun 2020 14:26:06 GMT',
  'Content-Length',
  '1346'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/certificates/listCertificateName-canlistdeletedcertificatesbypage-0')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/listCertificateName-canlistdeletedcertificatesbypage-0","deletedDate":1593095166,"scheduledPurgeDate":1600871166,"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificatesbypage-0/6dd105c89ab044dda16acdc4848e4af0","attributes":{"enabled":false,"nbf":1593094564,"exp":1624631164,"created":1593095164,"updated":1593095164,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificatesbypage-0/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1593095165,"updated":1593095165}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificatesbypage-0/pending"}}, [
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
  '0f307e3c-341c-41db-a807-c1959621a315',
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
  'Thu, 25 Jun 2020 14:26:06 GMT',
  'Content-Length',
  '1375'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistdeletedcertificatesbypage-0')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistdeletedcertificatesbypage-0"}}, [
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
  '8771caa5-27a7-438e-b341-4b24d342e3da',
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
  'Thu, 25 Jun 2020 14:26:06 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistdeletedcertificatesbypage-0')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistdeletedcertificatesbypage-0"}}, [
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
  'de1ed800-1544-455a-99b3-2200a8f9b5fe',
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
  'Thu, 25 Jun 2020 14:26:06 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistdeletedcertificatesbypage-0')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistdeletedcertificatesbypage-0"}}, [
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
  'eeae7c28-ed88-43b4-a695-04937aad9fca',
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
  'Thu, 25 Jun 2020 14:26:08 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistdeletedcertificatesbypage-0')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistdeletedcertificatesbypage-0"}}, [
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
  '8e58e5ce-fdf4-4323-910e-cdba7c1cf11f',
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
  'Thu, 25 Jun 2020 14:26:10 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistdeletedcertificatesbypage-0')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistdeletedcertificatesbypage-0"}}, [
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
  'e3b63a42-6ad1-4c82-8ff9-84ea6b694fc6',
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
  'Thu, 25 Jun 2020 14:26:12 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistdeletedcertificatesbypage-0')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistdeletedcertificatesbypage-0"}}, [
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
  'c322c8a1-4c19-470a-b11b-5d5e861a274b',
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
  'Thu, 25 Jun 2020 14:26:13 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistdeletedcertificatesbypage-0')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistdeletedcertificatesbypage-0"}}, [
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
  '0d53afe4-ac0b-4f05-8356-57d872103d02',
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
  'Thu, 25 Jun 2020 14:26:16 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistdeletedcertificatesbypage-0')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistdeletedcertificatesbypage-0"}}, [
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
  '46f07f5e-68d0-4c7b-9434-20e8054d566d',
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
  'Thu, 25 Jun 2020 14:26:18 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistdeletedcertificatesbypage-0')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/listCertificateName-canlistdeletedcertificatesbypage-0","deletedDate":1593095166,"scheduledPurgeDate":1600871166,"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificatesbypage-0/6dd105c89ab044dda16acdc4848e4af0","attributes":{"enabled":false,"nbf":1593094564,"exp":1624631164,"created":1593095164,"updated":1593095164,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificatesbypage-0/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1593095165,"updated":1593095165}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificatesbypage-0/pending"}}, [
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
  '12aedab5-0912-4616-b69d-9136366123ef',
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
  'Thu, 25 Jun 2020 14:26:20 GMT',
  'Content-Length',
  '1375'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/certificates/listCertificateName-canlistdeletedcertificatesbypage-1')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/listCertificateName-canlistdeletedcertificatesbypage-1","deletedDate":1593095180,"scheduledPurgeDate":1600871180,"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificatesbypage-1/74cc2ccb3db547a797d19883380955cd","kid":"https://keyvault_name.vault.azure.net/keys/listCertificateName-canlistdeletedcertificatesbypage-1/74cc2ccb3db547a797d19883380955cd","sid":"https://keyvault_name.vault.azure.net/secrets/listCertificateName-canlistdeletedcertificatesbypage-1/74cc2ccb3db547a797d19883380955cd","x5t":"LXWUldiEo4I60eWy01LHXgUJHGg","cer":"MIIDKDCCAhCgAwIBAgIQCAe3W/rbQJKN7rVjhCE1+jANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjAwNjI1MTQxNjE5WhcNMjEwNjI1MTQyNjE5WjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQDLNRuNSFet+IhS2XDihckE3uLR2mGA5ozphyF9Nz/IY5ErOZVuIPYpwHrjg0MlFi5oMz2ZBFwr79JLuvoJSzcGc2G9cLQtpJ8NgbK2QduU9k4xZ5YumREysevtvTChkuZv8gj0pPiqamQeRrS9PS9ooF/lvwhsj1jsXpGPvyR2khuyhfjYbDLjayT51o8P6vsrFF8cu2kYVVGQwgDQuhZ/hdcilfu+yuO52k2DRXeH+ZB8U6SXsY68/ZkXrl97v9UCgjzTxON013VN9iKIEE+iaXJmgxMiEN1o6u8AHccMXD4rEyw/JAZAT9Y4A6ZimhI/jz7Xiy+2A04qkAQ/wyvlAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBQYhGaG9AfHItkSSEp7huy8z0fbmjAdBgNVHQ4EFgQUGIRmhvQHxyLZEkhKe4bsvM9H25owDQYJKoZIhvcNAQELBQADggEBAJR8ERkugHfdQEOGjuHIZBGolMndNqdTtrBmt+NcRyMHqA1P7FBGDU/98T8rQK/op6qv0gjxgv0u9BCsQyFsWQ4WmKGDWFljJMtms6/79cdLrk+CoDIVoNXDdeKba1hL5WhaNOxagYjxmhRNO1d6WMR82h6zepG23d1CvcGt+tn84IJnnwgN9YJws+o/v9g+4vujjBOt0wTFmv+immsGtbOdOZ5VezCpmDaelh6mfGRj3Wz4ZBS/L3ecynK8FKMfocu0R+cOo5qkMuy0HBnBYriKnLgkbycGZydRWqpyuaZZjq55pL09/qG/OkdOdS8ib6734UYwZn3kAB/vGwq96sY=","attributes":{"enabled":true,"nbf":1593094579,"exp":1624631179,"created":1593095179,"updated":1593095179,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificatesbypage-1/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1593095165,"updated":1593095165}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificatesbypage-1/pending"}}, [
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
  '07ace452-4208-47d8-aa7f-2476c930fb84',
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
  'Thu, 25 Jun 2020 14:26:20 GMT',
  'Content-Length',
  '2826'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistdeletedcertificatesbypage-1')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistdeletedcertificatesbypage-1"}}, [
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
  '00cb5561-4a4a-41e8-815e-5fdcf5f93262',
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
  'Thu, 25 Jun 2020 14:26:20 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistdeletedcertificatesbypage-1')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistdeletedcertificatesbypage-1"}}, [
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
  '0e9f778e-c86a-484b-8275-69f8e30c5827',
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
  'Thu, 25 Jun 2020 14:26:20 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistdeletedcertificatesbypage-1')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistdeletedcertificatesbypage-1"}}, [
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
  'bf2360cf-4050-4c67-bfcc-df36eda417f1',
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
  'Thu, 25 Jun 2020 14:26:22 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistdeletedcertificatesbypage-1')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistdeletedcertificatesbypage-1"}}, [
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
  'e475c94e-70d0-4674-a6f8-3fc262a3a66c',
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
  'Thu, 25 Jun 2020 14:26:24 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistdeletedcertificatesbypage-1')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistdeletedcertificatesbypage-1"}}, [
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
  '7357edc2-38e3-45c6-8682-d902880e9a05',
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
  'Thu, 25 Jun 2020 14:26:26 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistdeletedcertificatesbypage-1')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/listCertificateName-canlistdeletedcertificatesbypage-1","deletedDate":1593095180,"scheduledPurgeDate":1600871180,"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificatesbypage-1/74cc2ccb3db547a797d19883380955cd","kid":"https://keyvault_name.vault.azure.net/keys/listCertificateName-canlistdeletedcertificatesbypage-1/74cc2ccb3db547a797d19883380955cd","sid":"https://keyvault_name.vault.azure.net/secrets/listCertificateName-canlistdeletedcertificatesbypage-1/74cc2ccb3db547a797d19883380955cd","x5t":"LXWUldiEo4I60eWy01LHXgUJHGg","cer":"MIIDKDCCAhCgAwIBAgIQCAe3W/rbQJKN7rVjhCE1+jANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjAwNjI1MTQxNjE5WhcNMjEwNjI1MTQyNjE5WjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQDLNRuNSFet+IhS2XDihckE3uLR2mGA5ozphyF9Nz/IY5ErOZVuIPYpwHrjg0MlFi5oMz2ZBFwr79JLuvoJSzcGc2G9cLQtpJ8NgbK2QduU9k4xZ5YumREysevtvTChkuZv8gj0pPiqamQeRrS9PS9ooF/lvwhsj1jsXpGPvyR2khuyhfjYbDLjayT51o8P6vsrFF8cu2kYVVGQwgDQuhZ/hdcilfu+yuO52k2DRXeH+ZB8U6SXsY68/ZkXrl97v9UCgjzTxON013VN9iKIEE+iaXJmgxMiEN1o6u8AHccMXD4rEyw/JAZAT9Y4A6ZimhI/jz7Xiy+2A04qkAQ/wyvlAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBQYhGaG9AfHItkSSEp7huy8z0fbmjAdBgNVHQ4EFgQUGIRmhvQHxyLZEkhKe4bsvM9H25owDQYJKoZIhvcNAQELBQADggEBAJR8ERkugHfdQEOGjuHIZBGolMndNqdTtrBmt+NcRyMHqA1P7FBGDU/98T8rQK/op6qv0gjxgv0u9BCsQyFsWQ4WmKGDWFljJMtms6/79cdLrk+CoDIVoNXDdeKba1hL5WhaNOxagYjxmhRNO1d6WMR82h6zepG23d1CvcGt+tn84IJnnwgN9YJws+o/v9g+4vujjBOt0wTFmv+immsGtbOdOZ5VezCpmDaelh6mfGRj3Wz4ZBS/L3ecynK8FKMfocu0R+cOo5qkMuy0HBnBYriKnLgkbycGZydRWqpyuaZZjq55pL09/qG/OkdOdS8ib6734UYwZn3kAB/vGwq96sY=","attributes":{"enabled":true,"nbf":1593094579,"exp":1624631179,"created":1593095179,"updated":1593095179,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificatesbypage-1/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1593095165,"updated":1593095165}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificatesbypage-1/pending"}}, [
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
  'fba447ea-d4b2-4bcf-93f8-ef28972ead6e',
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
  'Thu, 25 Jun 2020 14:26:28 GMT',
  'Content-Length',
  '2826'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates')
  .query(true)
  .reply(200, {"value":[{"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/listCertificateName-canlistdeletedcertificatesbypage-0","deletedDate":1593095166,"scheduledPurgeDate":1600871166,"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificatesbypage-0","attributes":{"enabled":false,"nbf":1593094564,"exp":1624631164,"created":1593095164,"updated":1593095164,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/listCertificateName-canlistdeletedcertificatesbypage-1","deletedDate":1593095180,"scheduledPurgeDate":1600871180,"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificatesbypage-1","x5t":"LXWUldiEo4I60eWy01LHXgUJHGg","attributes":{"enabled":true,"nbf":1593094579,"exp":1624631179,"created":1593095179,"updated":1593095179,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90}}],"nextLink":null}, [
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
  '83df5393-8c51-49b6-a354-1efa38784ab7',
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
  'Thu, 25 Jun 2020 14:26:29 GMT',
  'Content-Length',
  '1082'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedcertificates/listCertificateName-canlistdeletedcertificatesbypage-0')
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
  'ebcd5eea-016a-4dfa-ad63-43a2911d1fd2',
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
  'Thu, 25 Jun 2020 14:26:29 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedcertificates/listCertificateName-canlistdeletedcertificatesbypage-1')
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
  'c76dee17-a98a-4d78-a408-12b4a05a4cd4',
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
  'Thu, 25 Jun 2020 14:26:29 GMT'
]);

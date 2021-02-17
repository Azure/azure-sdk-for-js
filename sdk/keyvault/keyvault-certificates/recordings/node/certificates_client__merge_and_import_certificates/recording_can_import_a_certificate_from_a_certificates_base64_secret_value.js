let nock = require('nock');

module.exports.hash = "5331b4776b9344d07d0cb5e06ccbb160";

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
  'westus2',
  'x-ms-request-id',
  'ba8ce45a-3f2b-4da0-bb87-a9a5a3e685ee',
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
  'Wed, 17 Feb 2021 01:50:30 GMT'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fvault.azure.net%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":86399,"ext_expires_in":86399,"access_token":"access_token"}, [
  'Cache-Control',
  'no-store, no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '1315',
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
  'cef11ea9-67e4-487b-b628-6809686a5f00',
  'x-ms-ests-server',
  '2.1.11496.5 - NCUS ProdSlices',
  'Set-Cookie',
  'fpc=Ajplj7PlMRhAr_GaBOho6B4A4qsDAQAAAGZtvtcOAAAA; expires=Fri, 19-Mar-2021 01:50:31 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 17 Feb 2021 01:50:30 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/certificates/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-0/create', {"policy":{"key_props":{},"secret_props":{},"x509_props":{"subject":"cn=MyCert","sans":{}},"issuer":{"name":"Self"},"attributes":{}},"attributes":{}})
  .query(true)
  .reply(202, {"id":"https://keyvault_name.vault.azure.net/certificates/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAtENzN4IvorDp6eBi+D7K0jO7o2yg1t7Uj71e77s/aoOKVGKTYrv7tUh1rfsIpdSnrUUgw2LaLz4geHXohWLWJwqeuM2IbfJLRt3BLuKXJhaAjMrb/JvuuhCt4m/n79ZOJl2kjppEleJ5k+txBvG9fnoZEe3x+LmClZNqi6KSrWZPJyClu7LqsseKkbgL9m0VNYk5fx7wbmxRh7h7m7Wbguggd/q8ps0KBPih8nWWU2d6voNS0g6ziw93D3ZCz5rxYgBA3Oc4vnxbzn5xwFpj+vCV1/rtXcflR0G2Y5pHrOopQsnXvoyRAItARwznwOabY4F0NLoR/sBk5Wl4cvxCAQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAEz1EBaaq4DFBpKqjC8M3n5v+mrUONOIJ76QbDJ1BKjMAvH71L4codvKLshdCLUqWyIjbhbUeNyGKZfSYsvKr/bSGoHkBWvmbuvje0wxk8sHcxGz7DsxWpwNmrNwSHWZXygKykw/XOT9yvd7QsT3znqXUA3d0eR93I072JggacYQXc4oAHTEIhky5pgZhwwwRnk8iQR8dDKQqizYkXMvojbDZ5LjceoXX+XyLqyB4gt5/oFPrpJsPTG0KfQkbPfEYFM48F2oGSHeBxd6GoU+a8gRZKKYcrK1XX8Jxfb9nVWdKFa0EeGsu8BdJmnt2ALuaOrtDPaqOXiXWQyNtp8fINI=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"89aa48874e1b4485bd5deb781a46be74"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://keyvault_name.vault.azure.net/certificates/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-0/pending?api-version=7.2&request_id=89aa48874e1b4485bd5deb781a46be74',
  'Retry-After',
  '10',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  '38e84384-4d65-43fb-aa11-3a3a491ef114',
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
  'Wed, 17 Feb 2021 01:50:31 GMT',
  'Content-Length',
  '1360'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAtENzN4IvorDp6eBi+D7K0jO7o2yg1t7Uj71e77s/aoOKVGKTYrv7tUh1rfsIpdSnrUUgw2LaLz4geHXohWLWJwqeuM2IbfJLRt3BLuKXJhaAjMrb/JvuuhCt4m/n79ZOJl2kjppEleJ5k+txBvG9fnoZEe3x+LmClZNqi6KSrWZPJyClu7LqsseKkbgL9m0VNYk5fx7wbmxRh7h7m7Wbguggd/q8ps0KBPih8nWWU2d6voNS0g6ziw93D3ZCz5rxYgBA3Oc4vnxbzn5xwFpj+vCV1/rtXcflR0G2Y5pHrOopQsnXvoyRAItARwznwOabY4F0NLoR/sBk5Wl4cvxCAQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAEz1EBaaq4DFBpKqjC8M3n5v+mrUONOIJ76QbDJ1BKjMAvH71L4codvKLshdCLUqWyIjbhbUeNyGKZfSYsvKr/bSGoHkBWvmbuvje0wxk8sHcxGz7DsxWpwNmrNwSHWZXygKykw/XOT9yvd7QsT3znqXUA3d0eR93I072JggacYQXc4oAHTEIhky5pgZhwwwRnk8iQR8dDKQqizYkXMvojbDZ5LjceoXX+XyLqyB4gt5/oFPrpJsPTG0KfQkbPfEYFM48F2oGSHeBxd6GoU+a8gRZKKYcrK1XX8Jxfb9nVWdKFa0EeGsu8BdJmnt2ALuaOrtDPaqOXiXWQyNtp8fINI=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"89aa48874e1b4485bd5deb781a46be74"}, [
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
  'd90b1c65-56be-4f5f-8f54-04d86657ff23',
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
  'Wed, 17 Feb 2021 01:50:31 GMT',
  'Content-Length',
  '1360'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAtENzN4IvorDp6eBi+D7K0jO7o2yg1t7Uj71e77s/aoOKVGKTYrv7tUh1rfsIpdSnrUUgw2LaLz4geHXohWLWJwqeuM2IbfJLRt3BLuKXJhaAjMrb/JvuuhCt4m/n79ZOJl2kjppEleJ5k+txBvG9fnoZEe3x+LmClZNqi6KSrWZPJyClu7LqsseKkbgL9m0VNYk5fx7wbmxRh7h7m7Wbguggd/q8ps0KBPih8nWWU2d6voNS0g6ziw93D3ZCz5rxYgBA3Oc4vnxbzn5xwFpj+vCV1/rtXcflR0G2Y5pHrOopQsnXvoyRAItARwznwOabY4F0NLoR/sBk5Wl4cvxCAQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAEz1EBaaq4DFBpKqjC8M3n5v+mrUONOIJ76QbDJ1BKjMAvH71L4codvKLshdCLUqWyIjbhbUeNyGKZfSYsvKr/bSGoHkBWvmbuvje0wxk8sHcxGz7DsxWpwNmrNwSHWZXygKykw/XOT9yvd7QsT3znqXUA3d0eR93I072JggacYQXc4oAHTEIhky5pgZhwwwRnk8iQR8dDKQqizYkXMvojbDZ5LjceoXX+XyLqyB4gt5/oFPrpJsPTG0KfQkbPfEYFM48F2oGSHeBxd6GoU+a8gRZKKYcrK1XX8Jxfb9nVWdKFa0EeGsu8BdJmnt2ALuaOrtDPaqOXiXWQyNtp8fINI=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"89aa48874e1b4485bd5deb781a46be74"}, [
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
  '353928b4-9835-4590-acd1-5ea587ed864e',
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
  'Wed, 17 Feb 2021 01:50:31 GMT',
  'Content-Length',
  '1360'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAtENzN4IvorDp6eBi+D7K0jO7o2yg1t7Uj71e77s/aoOKVGKTYrv7tUh1rfsIpdSnrUUgw2LaLz4geHXohWLWJwqeuM2IbfJLRt3BLuKXJhaAjMrb/JvuuhCt4m/n79ZOJl2kjppEleJ5k+txBvG9fnoZEe3x+LmClZNqi6KSrWZPJyClu7LqsseKkbgL9m0VNYk5fx7wbmxRh7h7m7Wbguggd/q8ps0KBPih8nWWU2d6voNS0g6ziw93D3ZCz5rxYgBA3Oc4vnxbzn5xwFpj+vCV1/rtXcflR0G2Y5pHrOopQsnXvoyRAItARwznwOabY4F0NLoR/sBk5Wl4cvxCAQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAEz1EBaaq4DFBpKqjC8M3n5v+mrUONOIJ76QbDJ1BKjMAvH71L4codvKLshdCLUqWyIjbhbUeNyGKZfSYsvKr/bSGoHkBWvmbuvje0wxk8sHcxGz7DsxWpwNmrNwSHWZXygKykw/XOT9yvd7QsT3znqXUA3d0eR93I072JggacYQXc4oAHTEIhky5pgZhwwwRnk8iQR8dDKQqizYkXMvojbDZ5LjceoXX+XyLqyB4gt5/oFPrpJsPTG0KfQkbPfEYFM48F2oGSHeBxd6GoU+a8gRZKKYcrK1XX8Jxfb9nVWdKFa0EeGsu8BdJmnt2ALuaOrtDPaqOXiXWQyNtp8fINI=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"89aa48874e1b4485bd5deb781a46be74"}, [
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
  'b94ffdf9-ce04-4e1c-8670-1c7ec7eca7ce',
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
  'Wed, 17 Feb 2021 01:50:34 GMT',
  'Content-Length',
  '1360'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAtENzN4IvorDp6eBi+D7K0jO7o2yg1t7Uj71e77s/aoOKVGKTYrv7tUh1rfsIpdSnrUUgw2LaLz4geHXohWLWJwqeuM2IbfJLRt3BLuKXJhaAjMrb/JvuuhCt4m/n79ZOJl2kjppEleJ5k+txBvG9fnoZEe3x+LmClZNqi6KSrWZPJyClu7LqsseKkbgL9m0VNYk5fx7wbmxRh7h7m7Wbguggd/q8ps0KBPih8nWWU2d6voNS0g6ziw93D3ZCz5rxYgBA3Oc4vnxbzn5xwFpj+vCV1/rtXcflR0G2Y5pHrOopQsnXvoyRAItARwznwOabY4F0NLoR/sBk5Wl4cvxCAQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAEz1EBaaq4DFBpKqjC8M3n5v+mrUONOIJ76QbDJ1BKjMAvH71L4codvKLshdCLUqWyIjbhbUeNyGKZfSYsvKr/bSGoHkBWvmbuvje0wxk8sHcxGz7DsxWpwNmrNwSHWZXygKykw/XOT9yvd7QsT3znqXUA3d0eR93I072JggacYQXc4oAHTEIhky5pgZhwwwRnk8iQR8dDKQqizYkXMvojbDZ5LjceoXX+XyLqyB4gt5/oFPrpJsPTG0KfQkbPfEYFM48F2oGSHeBxd6GoU+a8gRZKKYcrK1XX8Jxfb9nVWdKFa0EeGsu8BdJmnt2ALuaOrtDPaqOXiXWQyNtp8fINI=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"89aa48874e1b4485bd5deb781a46be74"}, [
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
  'aaa18b5b-2aa5-41d0-aa78-b45d455e743e',
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
  'Wed, 17 Feb 2021 01:50:36 GMT',
  'Content-Length',
  '1360'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAtENzN4IvorDp6eBi+D7K0jO7o2yg1t7Uj71e77s/aoOKVGKTYrv7tUh1rfsIpdSnrUUgw2LaLz4geHXohWLWJwqeuM2IbfJLRt3BLuKXJhaAjMrb/JvuuhCt4m/n79ZOJl2kjppEleJ5k+txBvG9fnoZEe3x+LmClZNqi6KSrWZPJyClu7LqsseKkbgL9m0VNYk5fx7wbmxRh7h7m7Wbguggd/q8ps0KBPih8nWWU2d6voNS0g6ziw93D3ZCz5rxYgBA3Oc4vnxbzn5xwFpj+vCV1/rtXcflR0G2Y5pHrOopQsnXvoyRAItARwznwOabY4F0NLoR/sBk5Wl4cvxCAQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAEz1EBaaq4DFBpKqjC8M3n5v+mrUONOIJ76QbDJ1BKjMAvH71L4codvKLshdCLUqWyIjbhbUeNyGKZfSYsvKr/bSGoHkBWvmbuvje0wxk8sHcxGz7DsxWpwNmrNwSHWZXygKykw/XOT9yvd7QsT3znqXUA3d0eR93I072JggacYQXc4oAHTEIhky5pgZhwwwRnk8iQR8dDKQqizYkXMvojbDZ5LjceoXX+XyLqyB4gt5/oFPrpJsPTG0KfQkbPfEYFM48F2oGSHeBxd6GoU+a8gRZKKYcrK1XX8Jxfb9nVWdKFa0EeGsu8BdJmnt2ALuaOrtDPaqOXiXWQyNtp8fINI=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"89aa48874e1b4485bd5deb781a46be74"}, [
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
  'e0d936bd-3318-44c0-b11c-a135342a6a42',
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
  'Wed, 17 Feb 2021 01:50:38 GMT',
  'Content-Length',
  '1360'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAtENzN4IvorDp6eBi+D7K0jO7o2yg1t7Uj71e77s/aoOKVGKTYrv7tUh1rfsIpdSnrUUgw2LaLz4geHXohWLWJwqeuM2IbfJLRt3BLuKXJhaAjMrb/JvuuhCt4m/n79ZOJl2kjppEleJ5k+txBvG9fnoZEe3x+LmClZNqi6KSrWZPJyClu7LqsseKkbgL9m0VNYk5fx7wbmxRh7h7m7Wbguggd/q8ps0KBPih8nWWU2d6voNS0g6ziw93D3ZCz5rxYgBA3Oc4vnxbzn5xwFpj+vCV1/rtXcflR0G2Y5pHrOopQsnXvoyRAItARwznwOabY4F0NLoR/sBk5Wl4cvxCAQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAEz1EBaaq4DFBpKqjC8M3n5v+mrUONOIJ76QbDJ1BKjMAvH71L4codvKLshdCLUqWyIjbhbUeNyGKZfSYsvKr/bSGoHkBWvmbuvje0wxk8sHcxGz7DsxWpwNmrNwSHWZXygKykw/XOT9yvd7QsT3znqXUA3d0eR93I072JggacYQXc4oAHTEIhky5pgZhwwwRnk8iQR8dDKQqizYkXMvojbDZ5LjceoXX+XyLqyB4gt5/oFPrpJsPTG0KfQkbPfEYFM48F2oGSHeBxd6GoU+a8gRZKKYcrK1XX8Jxfb9nVWdKFa0EeGsu8BdJmnt2ALuaOrtDPaqOXiXWQyNtp8fINI=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"89aa48874e1b4485bd5deb781a46be74"}, [
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
  'c086650c-dc94-4fd5-83f9-8a8bd75d1672',
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
  'Wed, 17 Feb 2021 01:50:40 GMT',
  'Content-Length',
  '1360'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAtENzN4IvorDp6eBi+D7K0jO7o2yg1t7Uj71e77s/aoOKVGKTYrv7tUh1rfsIpdSnrUUgw2LaLz4geHXohWLWJwqeuM2IbfJLRt3BLuKXJhaAjMrb/JvuuhCt4m/n79ZOJl2kjppEleJ5k+txBvG9fnoZEe3x+LmClZNqi6KSrWZPJyClu7LqsseKkbgL9m0VNYk5fx7wbmxRh7h7m7Wbguggd/q8ps0KBPih8nWWU2d6voNS0g6ziw93D3ZCz5rxYgBA3Oc4vnxbzn5xwFpj+vCV1/rtXcflR0G2Y5pHrOopQsnXvoyRAItARwznwOabY4F0NLoR/sBk5Wl4cvxCAQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAEz1EBaaq4DFBpKqjC8M3n5v+mrUONOIJ76QbDJ1BKjMAvH71L4codvKLshdCLUqWyIjbhbUeNyGKZfSYsvKr/bSGoHkBWvmbuvje0wxk8sHcxGz7DsxWpwNmrNwSHWZXygKykw/XOT9yvd7QsT3znqXUA3d0eR93I072JggacYQXc4oAHTEIhky5pgZhwwwRnk8iQR8dDKQqizYkXMvojbDZ5LjceoXX+XyLqyB4gt5/oFPrpJsPTG0KfQkbPfEYFM48F2oGSHeBxd6GoU+a8gRZKKYcrK1XX8Jxfb9nVWdKFa0EeGsu8BdJmnt2ALuaOrtDPaqOXiXWQyNtp8fINI=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"89aa48874e1b4485bd5deb781a46be74"}, [
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
  '127d2abb-3dbf-490c-ba85-173d1006abea',
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
  'Wed, 17 Feb 2021 01:50:42 GMT',
  'Content-Length',
  '1360'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAtENzN4IvorDp6eBi+D7K0jO7o2yg1t7Uj71e77s/aoOKVGKTYrv7tUh1rfsIpdSnrUUgw2LaLz4geHXohWLWJwqeuM2IbfJLRt3BLuKXJhaAjMrb/JvuuhCt4m/n79ZOJl2kjppEleJ5k+txBvG9fnoZEe3x+LmClZNqi6KSrWZPJyClu7LqsseKkbgL9m0VNYk5fx7wbmxRh7h7m7Wbguggd/q8ps0KBPih8nWWU2d6voNS0g6ziw93D3ZCz5rxYgBA3Oc4vnxbzn5xwFpj+vCV1/rtXcflR0G2Y5pHrOopQsnXvoyRAItARwznwOabY4F0NLoR/sBk5Wl4cvxCAQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAEz1EBaaq4DFBpKqjC8M3n5v+mrUONOIJ76QbDJ1BKjMAvH71L4codvKLshdCLUqWyIjbhbUeNyGKZfSYsvKr/bSGoHkBWvmbuvje0wxk8sHcxGz7DsxWpwNmrNwSHWZXygKykw/XOT9yvd7QsT3znqXUA3d0eR93I072JggacYQXc4oAHTEIhky5pgZhwwwRnk8iQR8dDKQqizYkXMvojbDZ5LjceoXX+XyLqyB4gt5/oFPrpJsPTG0KfQkbPfEYFM48F2oGSHeBxd6GoU+a8gRZKKYcrK1XX8Jxfb9nVWdKFa0EeGsu8BdJmnt2ALuaOrtDPaqOXiXWQyNtp8fINI=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"89aa48874e1b4485bd5deb781a46be74"}, [
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
  '7f26e96b-8760-438e-9a5e-fe6e7d7bdaa2',
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
  'Wed, 17 Feb 2021 01:50:43 GMT',
  'Content-Length',
  '1360'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAtENzN4IvorDp6eBi+D7K0jO7o2yg1t7Uj71e77s/aoOKVGKTYrv7tUh1rfsIpdSnrUUgw2LaLz4geHXohWLWJwqeuM2IbfJLRt3BLuKXJhaAjMrb/JvuuhCt4m/n79ZOJl2kjppEleJ5k+txBvG9fnoZEe3x+LmClZNqi6KSrWZPJyClu7LqsseKkbgL9m0VNYk5fx7wbmxRh7h7m7Wbguggd/q8ps0KBPih8nWWU2d6voNS0g6ziw93D3ZCz5rxYgBA3Oc4vnxbzn5xwFpj+vCV1/rtXcflR0G2Y5pHrOopQsnXvoyRAItARwznwOabY4F0NLoR/sBk5Wl4cvxCAQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAEz1EBaaq4DFBpKqjC8M3n5v+mrUONOIJ76QbDJ1BKjMAvH71L4codvKLshdCLUqWyIjbhbUeNyGKZfSYsvKr/bSGoHkBWvmbuvje0wxk8sHcxGz7DsxWpwNmrNwSHWZXygKykw/XOT9yvd7QsT3znqXUA3d0eR93I072JggacYQXc4oAHTEIhky5pgZhwwwRnk8iQR8dDKQqizYkXMvojbDZ5LjceoXX+XyLqyB4gt5/oFPrpJsPTG0KfQkbPfEYFM48F2oGSHeBxd6GoU+a8gRZKKYcrK1XX8Jxfb9nVWdKFa0EeGsu8BdJmnt2ALuaOrtDPaqOXiXWQyNtp8fINI=","cancellation_requested":false,"status":"completed","target":"https://keyvault_name.vault.azure.net/certificates/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-0","request_id":"89aa48874e1b4485bd5deb781a46be74"}, [
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
  '88f2d177-4852-4ade-bfe0-04a6988643a9',
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
  'Wed, 17 Feb 2021 01:50:45 GMT',
  'Content-Length',
  '1347'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-0/')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-0/206f46f6ce314d1898b0a989b2f37c8d","kid":"https://keyvault_name.vault.azure.net/keys/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-0/206f46f6ce314d1898b0a989b2f37c8d","sid":"https://keyvault_name.vault.azure.net/secrets/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-0/206f46f6ce314d1898b0a989b2f37c8d","x5t":"q_RvEU8m6RjDjaZW_YWARMVna-Q","cer":"MIIDKDCCAhCgAwIBAgIQPNWNp2AURQmpRuu++ZPZlDANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjEwMjE3MDE0MDQ0WhcNMjIwMjE3MDE1MDQ0WjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQC0Q3M3gi+isOnp4GL4PsrSM7ujbKDW3tSPvV7vuz9qg4pUYpNiu/u1SHWt+wil1KetRSDDYtovPiB4deiFYtYnCp64zYht8ktG3cEu4pcmFoCMytv8m+66EK3ib+fv1k4mXaSOmkSV4nmT63EG8b1+ehkR7fH4uYKVk2qLopKtZk8nIKW7suqyx4qRuAv2bRU1iTl/HvBubFGHuHubtZuC6CB3+rymzQoE+KHydZZTZ3q+g1LSDrOLD3cPdkLPmvFiAEDc5zi+fFvOfnHAWmP68JXX+u1dx+VHQbZjmkes6ilCyde+jJEAi0BHDOfA5ptjgXQ0uhH+wGTlaXhy/EIBAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBSOmiYdp7RJytN4AAkG+I0cfSTKZjAdBgNVHQ4EFgQUjpomHae0ScrTeAAJBviNHH0kymYwDQYJKoZIhvcNAQELBQADggEBAFSumIf4V3ki6aoD+ii3I3jC22l+F5npZsdPqOuLRwWnklMGBE4b4L4K8/XgIsuk9LSqNHOfGtcE6rEHHehcnNnl07CARmjH+MC/t1AfDBre9S56EZY/MFegdGzGfOcsZcrI+BjHvlW/GE63T6sTyXmBXqDORmZDKgG0PILfU+UezeJW5Orlo/bf8FJ0XG2cxlNXt6DK2C6vEIiVdZ6lUoX4VzkBHNngoq2Yd43aRfj3WBgMWEPiqFULYV5NNSEPRcYsx3xd/h7DTP5QUIRsJr9OaAnW6m8zU90NMPMiehh/779TMOFTeQ5sBEd83xlpBjzvtkKCasAXvU41CcypZ5c=","attributes":{"enabled":true,"nbf":1613526044,"exp":1645062644,"created":1613526644,"updated":1613526644,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-0/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1613526631,"updated":1613526631}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-0/pending"}}, [
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
  '606ba1f1-3081-4864-a157-a0861d26149b',
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
  'Wed, 17 Feb 2021 01:50:45 GMT',
  'Content-Length',
  '2699'
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
  'westus2',
  'x-ms-request-id',
  '9be41a9d-87f9-4922-b45b-2f6cdc35f824',
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
  'Wed, 17 Feb 2021 01:50:45 GMT'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fvault.azure.net%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":86399,"ext_expires_in":86399,"access_token":"access_token"}, [
  'Cache-Control',
  'no-store, no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '1315',
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
  '5cf07c85-0ec3-49e2-8bc2-a63908884900',
  'x-ms-ests-server',
  '2.1.11496.6 - WUS2 ProdSlices',
  'Set-Cookie',
  'fpc=Ajplj7PlMRhAr_GaBOho6B4A4qsDAgAAAGZtvtcOAAAA; expires=Fri, 19-Mar-2021 01:50:46 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 17 Feb 2021 01:50:45 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/secrets/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-0/')
  .query(true)
  .reply(200, {"value":"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","contentType":"application/x-pkcs12","id":"https://keyvault_name.vault.azure.net/secrets/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-0/206f46f6ce314d1898b0a989b2f37c8d","managed":true,"attributes":{"enabled":true,"nbf":1613526044,"exp":1645062644,"created":1613526644,"updated":1613526644,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7},"kid":"https://keyvault_name.vault.azure.net/keys/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-0/206f46f6ce314d1898b0a989b2f37c8d"}, [
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
  '88310b72-4a14-4868-bf4a-61410da7f931',
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
  'Wed, 17 Feb 2021 01:50:45 GMT',
  'Content-Length',
  '4086'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/certificates/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-1/import', {"value":"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"})
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-1/eb05ec0d6e584401a50d86992d0c1c0b","kid":"https://keyvault_name.vault.azure.net/keys/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-1/eb05ec0d6e584401a50d86992d0c1c0b","sid":"https://keyvault_name.vault.azure.net/secrets/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-1/eb05ec0d6e584401a50d86992d0c1c0b","x5t":"q_RvEU8m6RjDjaZW_YWARMVna-Q","cer":"MIIDKDCCAhCgAwIBAgIQPNWNp2AURQmpRuu++ZPZlDANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjEwMjE3MDE0MDQ0WhcNMjIwMjE3MDE1MDQ0WjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQC0Q3M3gi+isOnp4GL4PsrSM7ujbKDW3tSPvV7vuz9qg4pUYpNiu/u1SHWt+wil1KetRSDDYtovPiB4deiFYtYnCp64zYht8ktG3cEu4pcmFoCMytv8m+66EK3ib+fv1k4mXaSOmkSV4nmT63EG8b1+ehkR7fH4uYKVk2qLopKtZk8nIKW7suqyx4qRuAv2bRU1iTl/HvBubFGHuHubtZuC6CB3+rymzQoE+KHydZZTZ3q+g1LSDrOLD3cPdkLPmvFiAEDc5zi+fFvOfnHAWmP68JXX+u1dx+VHQbZjmkes6ilCyde+jJEAi0BHDOfA5ptjgXQ0uhH+wGTlaXhy/EIBAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBSOmiYdp7RJytN4AAkG+I0cfSTKZjAdBgNVHQ4EFgQUjpomHae0ScrTeAAJBviNHH0kymYwDQYJKoZIhvcNAQELBQADggEBAFSumIf4V3ki6aoD+ii3I3jC22l+F5npZsdPqOuLRwWnklMGBE4b4L4K8/XgIsuk9LSqNHOfGtcE6rEHHehcnNnl07CARmjH+MC/t1AfDBre9S56EZY/MFegdGzGfOcsZcrI+BjHvlW/GE63T6sTyXmBXqDORmZDKgG0PILfU+UezeJW5Orlo/bf8FJ0XG2cxlNXt6DK2C6vEIiVdZ6lUoX4VzkBHNngoq2Yd43aRfj3WBgMWEPiqFULYV5NNSEPRcYsx3xd/h7DTP5QUIRsJr9OaAnW6m8zU90NMPMiehh/779TMOFTeQ5sBEd83xlpBjzvtkKCasAXvU41CcypZ5c=","attributes":{"enabled":true,"nbf":1613526044,"exp":1645062644,"created":1613526646,"updated":1613526646,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-1/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"CN=MyCert","ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":13,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"EmailContacts"}}],"issuer":{"name":"Unknown"},"attributes":{"enabled":true,"created":1613526646,"updated":1613526646}}}, [
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
  '5aeedd41-1ccb-4039-8413-95ec1ab03a0a',
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
  'Wed, 17 Feb 2021 01:50:47 GMT',
  'Content-Length',
  '2528'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/certificates/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-0')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-0","deletedDate":1613526647,"scheduledPurgeDate":1614131447,"id":"https://keyvault_name.vault.azure.net/certificates/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-0/206f46f6ce314d1898b0a989b2f37c8d","kid":"https://keyvault_name.vault.azure.net/keys/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-0/206f46f6ce314d1898b0a989b2f37c8d","sid":"https://keyvault_name.vault.azure.net/secrets/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-0/206f46f6ce314d1898b0a989b2f37c8d","x5t":"q_RvEU8m6RjDjaZW_YWARMVna-Q","cer":"MIIDKDCCAhCgAwIBAgIQPNWNp2AURQmpRuu++ZPZlDANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjEwMjE3MDE0MDQ0WhcNMjIwMjE3MDE1MDQ0WjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQC0Q3M3gi+isOnp4GL4PsrSM7ujbKDW3tSPvV7vuz9qg4pUYpNiu/u1SHWt+wil1KetRSDDYtovPiB4deiFYtYnCp64zYht8ktG3cEu4pcmFoCMytv8m+66EK3ib+fv1k4mXaSOmkSV4nmT63EG8b1+ehkR7fH4uYKVk2qLopKtZk8nIKW7suqyx4qRuAv2bRU1iTl/HvBubFGHuHubtZuC6CB3+rymzQoE+KHydZZTZ3q+g1LSDrOLD3cPdkLPmvFiAEDc5zi+fFvOfnHAWmP68JXX+u1dx+VHQbZjmkes6ilCyde+jJEAi0BHDOfA5ptjgXQ0uhH+wGTlaXhy/EIBAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBSOmiYdp7RJytN4AAkG+I0cfSTKZjAdBgNVHQ4EFgQUjpomHae0ScrTeAAJBviNHH0kymYwDQYJKoZIhvcNAQELBQADggEBAFSumIf4V3ki6aoD+ii3I3jC22l+F5npZsdPqOuLRwWnklMGBE4b4L4K8/XgIsuk9LSqNHOfGtcE6rEHHehcnNnl07CARmjH+MC/t1AfDBre9S56EZY/MFegdGzGfOcsZcrI+BjHvlW/GE63T6sTyXmBXqDORmZDKgG0PILfU+UezeJW5Orlo/bf8FJ0XG2cxlNXt6DK2C6vEIiVdZ6lUoX4VzkBHNngoq2Yd43aRfj3WBgMWEPiqFULYV5NNSEPRcYsx3xd/h7DTP5QUIRsJr9OaAnW6m8zU90NMPMiehh/779TMOFTeQ5sBEd83xlpBjzvtkKCasAXvU41CcypZ5c=","attributes":{"enabled":true,"nbf":1613526044,"exp":1645062644,"created":1613526644,"updated":1613526644,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-0/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1613526631,"updated":1613526631}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-0/pending"}}, [
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
  'b00f9094-a069-4ca5-ae57-a9aa1d8cfce3',
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
  'Wed, 17 Feb 2021 01:50:47 GMT',
  'Content-Length',
  '2919'
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
  '177',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  '61d1bb6d-a7f5-4c5d-bbfd-4af5d70bc27b',
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
  'Wed, 17 Feb 2021 01:50:47 GMT'
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
  '177',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  'f9e56cba-755c-47b5-ab3c-8c3ba2727516',
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
  'Wed, 17 Feb 2021 01:50:47 GMT'
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
  '177',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  '437d1a64-1a3e-4b88-a8d5-c9da246285ba',
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
  'Wed, 17 Feb 2021 01:50:49 GMT'
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
  '177',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  '5d4d25c3-a465-4058-b45f-2f34a548a69f',
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
  'Wed, 17 Feb 2021 01:50:51 GMT'
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
  '177',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  '93e9faa4-7cf4-44b8-9f4e-eb9468b888d2',
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
  'Wed, 17 Feb 2021 01:50:53 GMT'
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
  '177',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  'f7f9450d-f530-4eca-a28f-d4f2536d6542',
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
  'Wed, 17 Feb 2021 01:50:55 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-0')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-0","deletedDate":1613526647,"scheduledPurgeDate":1614131447,"id":"https://keyvault_name.vault.azure.net/certificates/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-0/206f46f6ce314d1898b0a989b2f37c8d","kid":"https://keyvault_name.vault.azure.net/keys/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-0/206f46f6ce314d1898b0a989b2f37c8d","sid":"https://keyvault_name.vault.azure.net/secrets/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-0/206f46f6ce314d1898b0a989b2f37c8d","x5t":"q_RvEU8m6RjDjaZW_YWARMVna-Q","cer":"MIIDKDCCAhCgAwIBAgIQPNWNp2AURQmpRuu++ZPZlDANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjEwMjE3MDE0MDQ0WhcNMjIwMjE3MDE1MDQ0WjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQC0Q3M3gi+isOnp4GL4PsrSM7ujbKDW3tSPvV7vuz9qg4pUYpNiu/u1SHWt+wil1KetRSDDYtovPiB4deiFYtYnCp64zYht8ktG3cEu4pcmFoCMytv8m+66EK3ib+fv1k4mXaSOmkSV4nmT63EG8b1+ehkR7fH4uYKVk2qLopKtZk8nIKW7suqyx4qRuAv2bRU1iTl/HvBubFGHuHubtZuC6CB3+rymzQoE+KHydZZTZ3q+g1LSDrOLD3cPdkLPmvFiAEDc5zi+fFvOfnHAWmP68JXX+u1dx+VHQbZjmkes6ilCyde+jJEAi0BHDOfA5ptjgXQ0uhH+wGTlaXhy/EIBAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBSOmiYdp7RJytN4AAkG+I0cfSTKZjAdBgNVHQ4EFgQUjpomHae0ScrTeAAJBviNHH0kymYwDQYJKoZIhvcNAQELBQADggEBAFSumIf4V3ki6aoD+ii3I3jC22l+F5npZsdPqOuLRwWnklMGBE4b4L4K8/XgIsuk9LSqNHOfGtcE6rEHHehcnNnl07CARmjH+MC/t1AfDBre9S56EZY/MFegdGzGfOcsZcrI+BjHvlW/GE63T6sTyXmBXqDORmZDKgG0PILfU+UezeJW5Orlo/bf8FJ0XG2cxlNXt6DK2C6vEIiVdZ6lUoX4VzkBHNngoq2Yd43aRfj3WBgMWEPiqFULYV5NNSEPRcYsx3xd/h7DTP5QUIRsJr9OaAnW6m8zU90NMPMiehh/779TMOFTeQ5sBEd83xlpBjzvtkKCasAXvU41CcypZ5c=","attributes":{"enabled":true,"nbf":1613526044,"exp":1645062644,"created":1613526644,"updated":1613526644,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-0/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1613526631,"updated":1613526631}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-0/pending"}}, [
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
  'b994b803-04b1-44a0-9391-135b35515fe2',
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
  'Wed, 17 Feb 2021 01:50:57 GMT',
  'Content-Length',
  '2919'
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
  'westus2',
  'x-ms-request-id',
  '9a99dd11-d169-4a2b-a6ef-32cb70e75d70',
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
  'Wed, 17 Feb 2021 01:50:57 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/certificates/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-1')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-1","deletedDate":1613526658,"scheduledPurgeDate":1614131458,"id":"https://keyvault_name.vault.azure.net/certificates/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-1/eb05ec0d6e584401a50d86992d0c1c0b","kid":"https://keyvault_name.vault.azure.net/keys/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-1/eb05ec0d6e584401a50d86992d0c1c0b","sid":"https://keyvault_name.vault.azure.net/secrets/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-1/eb05ec0d6e584401a50d86992d0c1c0b","x5t":"q_RvEU8m6RjDjaZW_YWARMVna-Q","cer":"MIIDKDCCAhCgAwIBAgIQPNWNp2AURQmpRuu++ZPZlDANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjEwMjE3MDE0MDQ0WhcNMjIwMjE3MDE1MDQ0WjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQC0Q3M3gi+isOnp4GL4PsrSM7ujbKDW3tSPvV7vuz9qg4pUYpNiu/u1SHWt+wil1KetRSDDYtovPiB4deiFYtYnCp64zYht8ktG3cEu4pcmFoCMytv8m+66EK3ib+fv1k4mXaSOmkSV4nmT63EG8b1+ehkR7fH4uYKVk2qLopKtZk8nIKW7suqyx4qRuAv2bRU1iTl/HvBubFGHuHubtZuC6CB3+rymzQoE+KHydZZTZ3q+g1LSDrOLD3cPdkLPmvFiAEDc5zi+fFvOfnHAWmP68JXX+u1dx+VHQbZjmkes6ilCyde+jJEAi0BHDOfA5ptjgXQ0uhH+wGTlaXhy/EIBAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBSOmiYdp7RJytN4AAkG+I0cfSTKZjAdBgNVHQ4EFgQUjpomHae0ScrTeAAJBviNHH0kymYwDQYJKoZIhvcNAQELBQADggEBAFSumIf4V3ki6aoD+ii3I3jC22l+F5npZsdPqOuLRwWnklMGBE4b4L4K8/XgIsuk9LSqNHOfGtcE6rEHHehcnNnl07CARmjH+MC/t1AfDBre9S56EZY/MFegdGzGfOcsZcrI+BjHvlW/GE63T6sTyXmBXqDORmZDKgG0PILfU+UezeJW5Orlo/bf8FJ0XG2cxlNXt6DK2C6vEIiVdZ6lUoX4VzkBHNngoq2Yd43aRfj3WBgMWEPiqFULYV5NNSEPRcYsx3xd/h7DTP5QUIRsJr9OaAnW6m8zU90NMPMiehh/779TMOFTeQ5sBEd83xlpBjzvtkKCasAXvU41CcypZ5c=","attributes":{"enabled":true,"nbf":1613526044,"exp":1645062644,"created":1613526646,"updated":1613526646,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-1/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"CN=MyCert","ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":13,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"EmailContacts"}}],"issuer":{"name":"Unknown"},"attributes":{"enabled":true,"created":1613526646,"updated":1613526646}}}, [
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
  'b0cc9da1-11cf-4e8f-969e-1555db7fe7d2',
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
  'Wed, 17 Feb 2021 01:50:57 GMT',
  'Content-Length',
  '2748'
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
  '177',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  'ed76c17a-2b63-4258-98e1-7a1b6a854ec8',
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
  'Wed, 17 Feb 2021 01:50:57 GMT'
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
  '177',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  '70fd27f7-7c5f-43e9-baa0-8efe3f7ab99b',
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
  'Wed, 17 Feb 2021 01:50:57 GMT'
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
  '177',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  'a3b8c34b-d24a-4a09-88a4-936330b741a1',
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
  'Wed, 17 Feb 2021 01:50:59 GMT'
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
  '177',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  '0a103289-57ab-4bb0-99e5-3a0ade2398ae',
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
  'Wed, 17 Feb 2021 01:51:01 GMT'
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
  '177',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  '3041ee83-a15e-4598-a75a-ea259eb3b525',
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
  'Wed, 17 Feb 2021 01:51:03 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-1')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-1","deletedDate":1613526658,"scheduledPurgeDate":1614131458,"id":"https://keyvault_name.vault.azure.net/certificates/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-1/eb05ec0d6e584401a50d86992d0c1c0b","kid":"https://keyvault_name.vault.azure.net/keys/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-1/eb05ec0d6e584401a50d86992d0c1c0b","sid":"https://keyvault_name.vault.azure.net/secrets/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-1/eb05ec0d6e584401a50d86992d0c1c0b","x5t":"q_RvEU8m6RjDjaZW_YWARMVna-Q","cer":"MIIDKDCCAhCgAwIBAgIQPNWNp2AURQmpRuu++ZPZlDANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjEwMjE3MDE0MDQ0WhcNMjIwMjE3MDE1MDQ0WjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQC0Q3M3gi+isOnp4GL4PsrSM7ujbKDW3tSPvV7vuz9qg4pUYpNiu/u1SHWt+wil1KetRSDDYtovPiB4deiFYtYnCp64zYht8ktG3cEu4pcmFoCMytv8m+66EK3ib+fv1k4mXaSOmkSV4nmT63EG8b1+ehkR7fH4uYKVk2qLopKtZk8nIKW7suqyx4qRuAv2bRU1iTl/HvBubFGHuHubtZuC6CB3+rymzQoE+KHydZZTZ3q+g1LSDrOLD3cPdkLPmvFiAEDc5zi+fFvOfnHAWmP68JXX+u1dx+VHQbZjmkes6ilCyde+jJEAi0BHDOfA5ptjgXQ0uhH+wGTlaXhy/EIBAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBSOmiYdp7RJytN4AAkG+I0cfSTKZjAdBgNVHQ4EFgQUjpomHae0ScrTeAAJBviNHH0kymYwDQYJKoZIhvcNAQELBQADggEBAFSumIf4V3ki6aoD+ii3I3jC22l+F5npZsdPqOuLRwWnklMGBE4b4L4K8/XgIsuk9LSqNHOfGtcE6rEHHehcnNnl07CARmjH+MC/t1AfDBre9S56EZY/MFegdGzGfOcsZcrI+BjHvlW/GE63T6sTyXmBXqDORmZDKgG0PILfU+UezeJW5Orlo/bf8FJ0XG2cxlNXt6DK2C6vEIiVdZ6lUoX4VzkBHNngoq2Yd43aRfj3WBgMWEPiqFULYV5NNSEPRcYsx3xd/h7DTP5QUIRsJr9OaAnW6m8zU90NMPMiehh/779TMOFTeQ5sBEd83xlpBjzvtkKCasAXvU41CcypZ5c=","attributes":{"enabled":true,"nbf":1613526044,"exp":1645062644,"created":1613526646,"updated":1613526646,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-1/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"CN=MyCert","ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":13,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"EmailContacts"}}],"issuer":{"name":"Unknown"},"attributes":{"enabled":true,"created":1613526646,"updated":1613526646}}}, [
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
  '0fc2b1d1-1bbf-4d4a-90bb-7ce6283cc6d1',
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
  'Wed, 17 Feb 2021 01:51:06 GMT',
  'Content-Length',
  '2748'
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
  'westus2',
  'x-ms-request-id',
  'fd7d8387-05d3-427a-a63f-db92e7e646fe',
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
  'Wed, 17 Feb 2021 01:51:06 GMT'
]);

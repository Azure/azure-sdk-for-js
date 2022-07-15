let nock = require('nock');

module.exports.hash = "401f019fc2bbb3cb587af9cd0ad8b30a";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/certificates/CRUDCertificateName-canabortcreatingacertificate-/create')
  .query(true)
  .reply(401, {"error":{"code":"Unauthorized","message":"AKV10000: Request is missing a Bearer or PoP token."}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '97',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'WWW-Authenticate',
  'Bearer authorization="https://login.windows.net/12345678-1234-1234-1234-123456789012", resource="https://vault.azure.net"',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  '55ff9e77-8dc4-4a1b-afbe-33b9827e56a8',
  'x-ms-request-id',
  '5b3c2348-00d9-4b59-b2d2-0951940cb8d3',
  'x-ms-keyvault-service-version',
  '1.9.378.1',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=131.107.147.44;act_addr_fam=InterNetwork;',
  'X-Content-Type-Options',
  'nosniff',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'Date',
  'Thu, 28 Apr 2022 00:03:16 GMT'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .get('/common/discovery/instance')
  .query(true)
  .reply(200, {"tenant_discovery_endpoint":"https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/v2.0/.well-known/openid-configuration","api-version":"1.1","metadata":[{"preferred_network":"login.microsoftonline.com","preferred_cache":"login.windows.net","aliases":["login.microsoftonline.com","login.windows.net","login.microsoft.com","sts.windows.net"]},{"preferred_network":"login.partner.microsoftonline.cn","preferred_cache":"login.partner.microsoftonline.cn","aliases":["login.partner.microsoftonline.cn","login.chinacloudapi.cn"]},{"preferred_network":"login.microsoftonline.de","preferred_cache":"login.microsoftonline.de","aliases":["login.microsoftonline.de"]},{"preferred_network":"login.microsoftonline.us","preferred_cache":"login.microsoftonline.us","aliases":["login.microsoftonline.us","login.usgovcloudapi.net"]},{"preferred_network":"login-us.microsoftonline.com","preferred_cache":"login-us.microsoftonline.com","aliases":["login-us.microsoftonline.com"]}]}, [
  'Cache-Control',
  'max-age=86400, private',
  'Content-Type',
  'application/json; charset=utf-8',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Access-Control-Allow-Origin',
  '*',
  'Access-Control-Allow-Methods',
  'GET, OPTIONS',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'x-ms-request-id',
  'e8e32ebf-9233-4a5f-b61e-532d3aa70702',
  'x-ms-ests-server',
  '2.1.12651.7 - WUS2 ProdSlices',
  'X-XSS-Protection',
  '0',
  'Set-Cookie',
  'fpc=AspbZfZlyldBikG4LJtwnu8; expires=Sat, 28-May-2022 00:03:16 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevre6s6WFMvvdXOHzqJvkz1a0PwAuY8ejl6Vd5KZ8_flAR0ZWLSRV4x08bImPpLIEAzNGJ1Ydq9pt7af7WdDH5gIri0tFdyuzhdxnR23tBUWvSnNQfuKiBkyEB9ShCLz1gDZgYsvPAuMp3CLXl39Vz1ODxfO9ZR0CW6hnWoLH9Hlm8gAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 28 Apr 2022 00:03:16 GMT',
  'Content-Length',
  '980'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .get('/12345678-1234-1234-1234-123456789012/v2.0/.well-known/openid-configuration')
  .reply(200, {"token_endpoint":"https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/oauth2/v2.0/token","token_endpoint_auth_methods_supported":["client_secret_post","private_key_jwt","client_secret_basic"],"jwks_uri":"https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/discovery/v2.0/keys","response_modes_supported":["query","fragment","form_post"],"subject_types_supported":["pairwise"],"id_token_signing_alg_values_supported":["RS256"],"response_types_supported":["code","id_token","code id_token","id_token token"],"scopes_supported":["openid","profile","email","offline_access"],"issuer":"https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/v2.0","request_uri_parameter_supported":false,"userinfo_endpoint":"https://graph.microsoft.com/oidc/userinfo","authorization_endpoint":"https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/oauth2/v2.0/authorize","device_authorization_endpoint":"https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/oauth2/v2.0/devicecode","http_logout_supported":true,"frontchannel_logout_supported":true,"end_session_endpoint":"https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/oauth2/v2.0/logout","claims_supported":["sub","iss","cloud_instance_name","cloud_instance_host_name","cloud_graph_host_name","msgraph_host","aud","exp","iat","auth_time","acr","nonce","preferred_username","name","tid","ver","at_hash","c_hash","email"],"kerberos_endpoint":"https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/kerberos","tenant_region_scope":"WW","cloud_instance_name":"microsoftonline.com","cloud_graph_host_name":"graph.windows.net","msgraph_host":"graph.microsoft.com","rbac_url":"https://pas.windows.net"}, [
  'Cache-Control',
  'max-age=86400, private',
  'Content-Type',
  'application/json; charset=utf-8',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Access-Control-Allow-Origin',
  '*',
  'Access-Control-Allow-Methods',
  'GET, OPTIONS',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'x-ms-request-id',
  'a8bc98f9-aba0-44bd-a0a2-c5ad98f72700',
  'x-ms-ests-server',
  '2.1.12707.9 - NCUS ProdSlices',
  'X-XSS-Protection',
  '0',
  'Set-Cookie',
  'fpc=AoPb4PcRW79ButyG0_b2bgY; expires=Sat, 28-May-2022 00:03:17 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevr3O15Vcq0V8mIOX0Z60z01cY2H1p3m7-yxUUyEyU4oGD9Rti05df0zCaD--Cn1A_ONG9DJZgGvpPdIC3tjAevekoDmeThEOQTVBlGUEmoSB_f0s4wAaog-br3vV-P6CLy01ITMvHUZg1gTB1MImbUv1JEiX8sAj-qyGSsnN1AdUkgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 28 Apr 2022 00:03:16 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/12345678-1234-1234-1234-123456789012/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.7.0&x-client-OS=win32&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=0dd5eaeb-3a5e-4a94-884e-5c22bcdbb6b5&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22cp1%22%5D%7D%7D%7D")
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
  'a8bc98f9-aba0-44bd-a0a2-c5ad9bf72700',
  'x-ms-ests-server',
  '2.1.12707.9 - NCUS ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'X-XSS-Protection',
  '0',
  'Set-Cookie',
  'fpc=Am1w_UL9cWZHs7ppRk1P8elPlvakAQAAAMTQ-9kOAAAA; expires=Sat, 28-May-2022 00:03:17 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 28 Apr 2022 00:03:16 GMT',
  'Content-Length',
  '1315'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/certificates/CRUDCertificateName-canabortcreatingacertificate-/create', {"policy":{"key_props":{},"secret_props":{},"x509_props":{"subject":"cn=MyCert","sans":{}},"issuer":{"name":"Self"},"attributes":{}},"attributes":{}})
  .query(true)
  .reply(202, {"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-canabortcreatingacertificate-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAx/3eVsrSNFZDSnDOd1C6Bc8GS0hGneaXeKVK8m/GXKzFz8iexZ94N7ZyvqtBIOYTMQbY7LFwYX/ycPdg+AruC+uCCZGig3kT/ZGdBRniHRIA+0p56/Yj9qkb1EfryFGxhID35pzhl2ediYPme7XEoa1Zv/U2vyPiS2DBcCXArBpsKJ4h2ass432uEYnVDDttAcHXXoraoUqYtZEfVYZ5HPkiH3Psm9OylWYBLb1UZctx3xHQnRwvzu5gzxjQphhmPqYFHBjBfIFqyjlaHVpHh2YfNhZ1YlbT/W7RasVwP9rUTyWZCF0ydCUCEFTTU/qNmt+gfPlp6CNNhfBsLfoe7QIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBADemuca61nxEGkZ3v78OJMSFGiNWhtlHtUMiZMwFVMkWWop/DlRLs/UCPJTHeUHymHFDAFBCwdikwGMxNP+K3CrQz5UCaFjmwUJtLaUDn6fNtO1KX5lw79gsE8EctUJqoUcB/nXP5MfL9k/FL5Kw4MWq9arbysmNUSomZuJ66EhUbnbYArjQcYyqj0cRx/pqJ0jiAc6hbEnGBABKJJp58kQPGncZty2Fmt7jhhdGgpte4SjmUWINlYg+ubE7wbAkVJN9WlDYCmG64vUMThAlpTFglKtztalx8GACQn0G0uyJO5AWxa6c/nbP/T0Vf7+GTSJ2Wr4Vh+AVHHSLccHKUZY=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"e838402e870442ac8a52503351a18e0a"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-canabortcreatingacertificate-/pending?api-version=7.3&request_id=e838402e870442ac8a52503351a18e0a',
  'Retry-After',
  '0',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  '55ff9e77-8dc4-4a1b-afbe-33b9827e56a8',
  'x-ms-request-id',
  'cb276b69-2703-41b9-846c-3bd24cc20d85',
  'x-ms-keyvault-service-version',
  '1.9.378.1',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=131.107.147.44;act_addr_fam=InterNetwork;',
  'x-ms-keyvault-rbac-assignment-id',
  '0cc3cf84-3de1-5005-ab06-0ef4d04fa1de',
  'x-ms-keyvault-rbac-cache',
  'ra_age=1030;da_age=1030;rd_age=1030;brd_age=11823;ra_notif_age=1500;dec_lev=1;',
  'X-Content-Type-Options',
  'nosniff',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'Date',
  'Thu, 28 Apr 2022 00:03:17 GMT',
  'Content-Length',
  '1340'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/CRUDCertificateName-canabortcreatingacertificate-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-canabortcreatingacertificate-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAx/3eVsrSNFZDSnDOd1C6Bc8GS0hGneaXeKVK8m/GXKzFz8iexZ94N7ZyvqtBIOYTMQbY7LFwYX/ycPdg+AruC+uCCZGig3kT/ZGdBRniHRIA+0p56/Yj9qkb1EfryFGxhID35pzhl2ediYPme7XEoa1Zv/U2vyPiS2DBcCXArBpsKJ4h2ass432uEYnVDDttAcHXXoraoUqYtZEfVYZ5HPkiH3Psm9OylWYBLb1UZctx3xHQnRwvzu5gzxjQphhmPqYFHBjBfIFqyjlaHVpHh2YfNhZ1YlbT/W7RasVwP9rUTyWZCF0ydCUCEFTTU/qNmt+gfPlp6CNNhfBsLfoe7QIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBADemuca61nxEGkZ3v78OJMSFGiNWhtlHtUMiZMwFVMkWWop/DlRLs/UCPJTHeUHymHFDAFBCwdikwGMxNP+K3CrQz5UCaFjmwUJtLaUDn6fNtO1KX5lw79gsE8EctUJqoUcB/nXP5MfL9k/FL5Kw4MWq9arbysmNUSomZuJ66EhUbnbYArjQcYyqj0cRx/pqJ0jiAc6hbEnGBABKJJp58kQPGncZty2Fmt7jhhdGgpte4SjmUWINlYg+ubE7wbAkVJN9WlDYCmG64vUMThAlpTFglKtztalx8GACQn0G0uyJO5AWxa6c/nbP/T0Vf7+GTSJ2Wr4Vh+AVHHSLccHKUZY=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"e838402e870442ac8a52503351a18e0a"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Retry-After',
  '0',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  '95a296fc-0c80-454f-b510-e48252a47b6e',
  'x-ms-request-id',
  'ead0aa3a-088f-46b2-ae01-bd23fcae571e',
  'x-ms-keyvault-service-version',
  '1.9.378.1',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=131.107.147.44;act_addr_fam=InterNetwork;',
  'x-ms-keyvault-rbac-assignment-id',
  '0cc3cf84-3de1-5005-ab06-0ef4d04fa1de',
  'x-ms-keyvault-rbac-cache',
  'ra_age=1030;da_age=1030;rd_age=1030;brd_age=11824;ra_notif_age=1500;dec_lev=0;',
  'X-Content-Type-Options',
  'nosniff',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'Date',
  'Thu, 28 Apr 2022 00:03:17 GMT',
  'Content-Length',
  '1340'
]);

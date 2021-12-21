let nock = require('nock');

module.exports.hash = "c940e16789f3519297262bdf6bee26a5";

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
  'Bearer authorization="https://login.windows.net/12345678-1234-1234-1234-123456789012", resource="https://vault.azure.net"',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'b4435f42-3241-4ce6-aa77-e1161ad745f9',
  'x-ms-request-id',
  '596e7eb8-925d-40c9-ba53-09b232271d3e',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:42:50 GMT'
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
  '9230c1eb-f519-4251-a23b-a94906dd1501',
  'x-ms-ests-server',
  '2.1.11654.16 - EUS ProdSlices',
  'Set-Cookie',
  'fpc=AnNSRUQLOatNlCiPG0dKq_I; expires=Fri, 28-May-2021 22:42:50 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevr4t3KxtkRhEFv4vAjnl1_oEEOkh4sofMYjfdnDY05_uSxJHRS7erG_S5dwrqBeyMVmQUHbD9Wt_PGkmXwbZusWSo0xPQWk9aOmfLLxK_HB9paU3QsdrjCc-Bfah8bvdgDDsYUZ0pDNWRtGp55HgLgn1TS7bA9djYkACdLVxtbTFQgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 28 Apr 2021 22:42:49 GMT',
  'Content-Length',
  '980'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .get('/12345678-1234-1234-1234-123456789012/v2.0/.well-known/openid-configuration')
  .reply(200, {"token_endpoint":"https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/oauth2/v2.0/token","token_endpoint_auth_methods_supported":["client_secret_post","private_key_jwt","client_secret_basic"],"jwks_uri":"https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/discovery/v2.0/keys","response_modes_supported":["query","fragment","form_post"],"subject_types_supported":["pairwise"],"id_token_signing_alg_values_supported":["RS256"],"response_types_supported":["code","id_token","code id_token","id_token token"],"scopes_supported":["openid","profile","email","offline_access"],"issuer":"https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/v2.0","request_uri_parameter_supported":false,"userinfo_endpoint":"https://graph.microsoft.com/oidc/userinfo","authorization_endpoint":"https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/oauth2/v2.0/authorize","device_authorization_endpoint":"https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/oauth2/v2.0/devicecode","http_logout_supported":true,"frontchannel_logout_supported":true,"end_session_endpoint":"https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/oauth2/v2.0/logout","claims_supported":["sub","iss","cloud_instance_name","cloud_instance_host_name","cloud_graph_host_name","msgraph_host","aud","exp","iat","auth_time","acr","nonce","preferred_username","name","tid","ver","at_hash","c_hash","email"],"tenant_region_scope":"NA","cloud_instance_name":"microsoftonline.com","cloud_graph_host_name":"graph.windows.net","msgraph_host":"graph.microsoft.com","rbac_url":"https://pas.windows.net"}, [
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
  'ffa75b47-b002-488d-b5a2-bf05d7a3e100',
  'x-ms-ests-server',
  '2.1.11654.16 - SCUS ProdSlices',
  'Set-Cookie',
  'fpc=AnNSRUQLOatNlCiPG0dKq_I; expires=Fri, 28-May-2021 22:42:50 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevrt8eLuEXB7Kw_mwPJwOjVhe7SnKCGzFWU2LZHu7tlu2zy8hZ_2EBU6mcxkSrETbf_ws_pQxRtWj5Rc24eE4e7jZwwJeHSPIViAzwKpH-lPRUmfie4dxNDxU9KW6VOrz09TPjckPGAS5coCIZMB475HAKQOUr8T5KvO8M0wsQXXTwgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 28 Apr 2021 22:42:49 GMT',
  'Content-Length',
  '1651'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .filteringRequestBody(function (body) {
            return body.replace(/client-request-id=[^&]*/g, "client-request-id=client-request-id");
        })
  .post('/12345678-1234-1234-1234-123456789012/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fvault.azure.net%2F.default%20openid%20profile%20offline_access&grant_type=client_credentials&client-request-id=client-request-id&client_secret=azure_client_secret")
  .reply(200, {"token_type":"Bearer","expires_in":3599,"ext_expires_in":3599,"access_token":"access_token"}, [
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
  '01737d7b-1b97-44f9-ad7f-f424af852701',
  'x-ms-ests-server',
  '2.1.11654.16 - WUS2 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=AnNSRUQLOatNlCiPG0dKq_LmR1YbAQAAAOrbG9gOAAAA; expires=Fri, 28-May-2021 22:42:50 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 28 Apr 2021 22:42:49 GMT',
  'Content-Length',
  '1313'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/certificates/listCertificateName-canlistdeletedcertificatesbypage-0/create', {"policy":{"key_props":{},"secret_props":{},"x509_props":{"subject":"cn=MyCert","sans":{}},"issuer":{"name":"Self"},"attributes":{}},"attributes":{}})
  .query(true)
  .reply(202, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificatesbypage-0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAop/a9ct2IeX7GI6Fq+61WvIDJC5V7yJHdgB1v0gTCm2t3nvHnxw+hCyaQypAtGcIOg5A7di6ltGXhqIzFjWXkzagNpUiQCV2D9hVx9u8yMz7LptGmoXsoukpTgHZchA//cuEFW86K+Sr4L5H27jAmCfsCsY9/XvfHoiniGham6T9c325ORpWC1GprKNhgpEzfqTnus2RkE4Hgu5Ry3ADBAOsyOwMCAKRzL+WrD1unw/3HdEl4xSLVe9z8ViaZNt73iDIUK0yXfEVFZCkAHQ6Wm+Iy0q8L1iqD4/6m+so75H5X4DMmjsBFXunKBSwIBiawOYdmHnzSfVn1ON+OtSzlQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAHXRa7f23ByKNmuwrAyIIT3lYnLcz51wr0YcU8pwiJyOibJPT6foYmmI1BD+hMx+sGXvKipiRTSYbp4j9ephC/W+DCj15NNBSL0HBXF2EZBxePBYLdpjAanXsKgKTRqnkjt4PKWhct8vAaur0+xLnh1huW3TnNQapxfsD6gTt5KHijCciXEqn8fj4jf6EOcMffm6demaaCHKQqev/MGYTEbOL25yGrgUrWVjUng6C9dxerMbq9RX2kGXkz4/GYYkWZ+j7L+nrCRxIAkKB5UfpaDD1jbU+Qo/+l4O0fCsZLSe6xhImjBLC63druIV6HLd8TnXoapYGVtLSrgUUBWi0Zw=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"e1cbe5a4bb12415e8923d2e870d99f9f"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificatesbypage-0/pending?api-version=7.2&request_id=e1cbe5a4bb12415e8923d2e870d99f9f',
  'Retry-After',
  '0',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'b4435f42-3241-4ce6-aa77-e1161ad745f9',
  'x-ms-request-id',
  '5bd740b1-382f-47f3-9f2c-ba7d93329418',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:42:51 GMT',
  'Content-Length',
  '1346'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistdeletedcertificatesbypage-0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificatesbypage-0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAop/a9ct2IeX7GI6Fq+61WvIDJC5V7yJHdgB1v0gTCm2t3nvHnxw+hCyaQypAtGcIOg5A7di6ltGXhqIzFjWXkzagNpUiQCV2D9hVx9u8yMz7LptGmoXsoukpTgHZchA//cuEFW86K+Sr4L5H27jAmCfsCsY9/XvfHoiniGham6T9c325ORpWC1GprKNhgpEzfqTnus2RkE4Hgu5Ry3ADBAOsyOwMCAKRzL+WrD1unw/3HdEl4xSLVe9z8ViaZNt73iDIUK0yXfEVFZCkAHQ6Wm+Iy0q8L1iqD4/6m+so75H5X4DMmjsBFXunKBSwIBiawOYdmHnzSfVn1ON+OtSzlQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAHXRa7f23ByKNmuwrAyIIT3lYnLcz51wr0YcU8pwiJyOibJPT6foYmmI1BD+hMx+sGXvKipiRTSYbp4j9ephC/W+DCj15NNBSL0HBXF2EZBxePBYLdpjAanXsKgKTRqnkjt4PKWhct8vAaur0+xLnh1huW3TnNQapxfsD6gTt5KHijCciXEqn8fj4jf6EOcMffm6demaaCHKQqev/MGYTEbOL25yGrgUrWVjUng6C9dxerMbq9RX2kGXkz4/GYYkWZ+j7L+nrCRxIAkKB5UfpaDD1jbU+Qo/+l4O0fCsZLSe6xhImjBLC63druIV6HLd8TnXoapYGVtLSrgUUBWi0Zw=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"e1cbe5a4bb12415e8923d2e870d99f9f"}, [
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
  'eastus',
  'x-ms-client-request-id',
  '67b15b02-525a-4230-b6ac-0d300ea62da8',
  'x-ms-request-id',
  '6c005168-87fc-4bfc-8d94-fe1d08e171e6',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:42:51 GMT',
  'Content-Length',
  '1346'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistdeletedcertificatesbypage-0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificatesbypage-0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAop/a9ct2IeX7GI6Fq+61WvIDJC5V7yJHdgB1v0gTCm2t3nvHnxw+hCyaQypAtGcIOg5A7di6ltGXhqIzFjWXkzagNpUiQCV2D9hVx9u8yMz7LptGmoXsoukpTgHZchA//cuEFW86K+Sr4L5H27jAmCfsCsY9/XvfHoiniGham6T9c325ORpWC1GprKNhgpEzfqTnus2RkE4Hgu5Ry3ADBAOsyOwMCAKRzL+WrD1unw/3HdEl4xSLVe9z8ViaZNt73iDIUK0yXfEVFZCkAHQ6Wm+Iy0q8L1iqD4/6m+so75H5X4DMmjsBFXunKBSwIBiawOYdmHnzSfVn1ON+OtSzlQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAHXRa7f23ByKNmuwrAyIIT3lYnLcz51wr0YcU8pwiJyOibJPT6foYmmI1BD+hMx+sGXvKipiRTSYbp4j9ephC/W+DCj15NNBSL0HBXF2EZBxePBYLdpjAanXsKgKTRqnkjt4PKWhct8vAaur0+xLnh1huW3TnNQapxfsD6gTt5KHijCciXEqn8fj4jf6EOcMffm6demaaCHKQqev/MGYTEbOL25yGrgUrWVjUng6C9dxerMbq9RX2kGXkz4/GYYkWZ+j7L+nrCRxIAkKB5UfpaDD1jbU+Qo/+l4O0fCsZLSe6xhImjBLC63druIV6HLd8TnXoapYGVtLSrgUUBWi0Zw=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"e1cbe5a4bb12415e8923d2e870d99f9f"}, [
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
  'eastus',
  'x-ms-client-request-id',
  'b0b96ae5-9e6e-4b83-8bc1-dd27f1089b3b',
  'x-ms-request-id',
  '42373fdb-d5c1-4a48-859c-88d7b0e6a149',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:42:51 GMT',
  'Content-Length',
  '1346'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistdeletedcertificatesbypage-0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificatesbypage-0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAop/a9ct2IeX7GI6Fq+61WvIDJC5V7yJHdgB1v0gTCm2t3nvHnxw+hCyaQypAtGcIOg5A7di6ltGXhqIzFjWXkzagNpUiQCV2D9hVx9u8yMz7LptGmoXsoukpTgHZchA//cuEFW86K+Sr4L5H27jAmCfsCsY9/XvfHoiniGham6T9c325ORpWC1GprKNhgpEzfqTnus2RkE4Hgu5Ry3ADBAOsyOwMCAKRzL+WrD1unw/3HdEl4xSLVe9z8ViaZNt73iDIUK0yXfEVFZCkAHQ6Wm+Iy0q8L1iqD4/6m+so75H5X4DMmjsBFXunKBSwIBiawOYdmHnzSfVn1ON+OtSzlQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAHXRa7f23ByKNmuwrAyIIT3lYnLcz51wr0YcU8pwiJyOibJPT6foYmmI1BD+hMx+sGXvKipiRTSYbp4j9ephC/W+DCj15NNBSL0HBXF2EZBxePBYLdpjAanXsKgKTRqnkjt4PKWhct8vAaur0+xLnh1huW3TnNQapxfsD6gTt5KHijCciXEqn8fj4jf6EOcMffm6demaaCHKQqev/MGYTEbOL25yGrgUrWVjUng6C9dxerMbq9RX2kGXkz4/GYYkWZ+j7L+nrCRxIAkKB5UfpaDD1jbU+Qo/+l4O0fCsZLSe6xhImjBLC63druIV6HLd8TnXoapYGVtLSrgUUBWi0Zw=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"e1cbe5a4bb12415e8923d2e870d99f9f"}, [
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
  'eastus',
  'x-ms-client-request-id',
  'd95f7ff6-c57b-46e3-8baf-da18ebbd7975',
  'x-ms-request-id',
  '2065f5d3-62db-4494-b8dc-2fe3bc13de36',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:42:53 GMT',
  'Content-Length',
  '1346'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistdeletedcertificatesbypage-0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificatesbypage-0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAop/a9ct2IeX7GI6Fq+61WvIDJC5V7yJHdgB1v0gTCm2t3nvHnxw+hCyaQypAtGcIOg5A7di6ltGXhqIzFjWXkzagNpUiQCV2D9hVx9u8yMz7LptGmoXsoukpTgHZchA//cuEFW86K+Sr4L5H27jAmCfsCsY9/XvfHoiniGham6T9c325ORpWC1GprKNhgpEzfqTnus2RkE4Hgu5Ry3ADBAOsyOwMCAKRzL+WrD1unw/3HdEl4xSLVe9z8ViaZNt73iDIUK0yXfEVFZCkAHQ6Wm+Iy0q8L1iqD4/6m+so75H5X4DMmjsBFXunKBSwIBiawOYdmHnzSfVn1ON+OtSzlQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAHXRa7f23ByKNmuwrAyIIT3lYnLcz51wr0YcU8pwiJyOibJPT6foYmmI1BD+hMx+sGXvKipiRTSYbp4j9ephC/W+DCj15NNBSL0HBXF2EZBxePBYLdpjAanXsKgKTRqnkjt4PKWhct8vAaur0+xLnh1huW3TnNQapxfsD6gTt5KHijCciXEqn8fj4jf6EOcMffm6demaaCHKQqev/MGYTEbOL25yGrgUrWVjUng6C9dxerMbq9RX2kGXkz4/GYYkWZ+j7L+nrCRxIAkKB5UfpaDD1jbU+Qo/+l4O0fCsZLSe6xhImjBLC63druIV6HLd8TnXoapYGVtLSrgUUBWi0Zw=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"e1cbe5a4bb12415e8923d2e870d99f9f"}, [
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
  'eastus',
  'x-ms-client-request-id',
  '025d9dc3-4037-4190-b50f-3e881475f846',
  'x-ms-request-id',
  'd90a9c7f-6e72-4683-bc57-b0dbeb42a422',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:42:55 GMT',
  'Content-Length',
  '1346'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistdeletedcertificatesbypage-0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificatesbypage-0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAop/a9ct2IeX7GI6Fq+61WvIDJC5V7yJHdgB1v0gTCm2t3nvHnxw+hCyaQypAtGcIOg5A7di6ltGXhqIzFjWXkzagNpUiQCV2D9hVx9u8yMz7LptGmoXsoukpTgHZchA//cuEFW86K+Sr4L5H27jAmCfsCsY9/XvfHoiniGham6T9c325ORpWC1GprKNhgpEzfqTnus2RkE4Hgu5Ry3ADBAOsyOwMCAKRzL+WrD1unw/3HdEl4xSLVe9z8ViaZNt73iDIUK0yXfEVFZCkAHQ6Wm+Iy0q8L1iqD4/6m+so75H5X4DMmjsBFXunKBSwIBiawOYdmHnzSfVn1ON+OtSzlQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAHXRa7f23ByKNmuwrAyIIT3lYnLcz51wr0YcU8pwiJyOibJPT6foYmmI1BD+hMx+sGXvKipiRTSYbp4j9ephC/W+DCj15NNBSL0HBXF2EZBxePBYLdpjAanXsKgKTRqnkjt4PKWhct8vAaur0+xLnh1huW3TnNQapxfsD6gTt5KHijCciXEqn8fj4jf6EOcMffm6demaaCHKQqev/MGYTEbOL25yGrgUrWVjUng6C9dxerMbq9RX2kGXkz4/GYYkWZ+j7L+nrCRxIAkKB5UfpaDD1jbU+Qo/+l4O0fCsZLSe6xhImjBLC63druIV6HLd8TnXoapYGVtLSrgUUBWi0Zw=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"e1cbe5a4bb12415e8923d2e870d99f9f"}, [
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
  'eastus',
  'x-ms-client-request-id',
  '06fea114-fd19-4603-802b-30c75bae9543',
  'x-ms-request-id',
  '323c4363-9fe7-410e-979d-f8b49df6d7a8',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:42:57 GMT',
  'Content-Length',
  '1346'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistdeletedcertificatesbypage-0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificatesbypage-0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAop/a9ct2IeX7GI6Fq+61WvIDJC5V7yJHdgB1v0gTCm2t3nvHnxw+hCyaQypAtGcIOg5A7di6ltGXhqIzFjWXkzagNpUiQCV2D9hVx9u8yMz7LptGmoXsoukpTgHZchA//cuEFW86K+Sr4L5H27jAmCfsCsY9/XvfHoiniGham6T9c325ORpWC1GprKNhgpEzfqTnus2RkE4Hgu5Ry3ADBAOsyOwMCAKRzL+WrD1unw/3HdEl4xSLVe9z8ViaZNt73iDIUK0yXfEVFZCkAHQ6Wm+Iy0q8L1iqD4/6m+so75H5X4DMmjsBFXunKBSwIBiawOYdmHnzSfVn1ON+OtSzlQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAHXRa7f23ByKNmuwrAyIIT3lYnLcz51wr0YcU8pwiJyOibJPT6foYmmI1BD+hMx+sGXvKipiRTSYbp4j9ephC/W+DCj15NNBSL0HBXF2EZBxePBYLdpjAanXsKgKTRqnkjt4PKWhct8vAaur0+xLnh1huW3TnNQapxfsD6gTt5KHijCciXEqn8fj4jf6EOcMffm6demaaCHKQqev/MGYTEbOL25yGrgUrWVjUng6C9dxerMbq9RX2kGXkz4/GYYkWZ+j7L+nrCRxIAkKB5UfpaDD1jbU+Qo/+l4O0fCsZLSe6xhImjBLC63druIV6HLd8TnXoapYGVtLSrgUUBWi0Zw=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"e1cbe5a4bb12415e8923d2e870d99f9f"}, [
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
  'eastus',
  'x-ms-client-request-id',
  'c8e74070-e409-4dd1-9948-9fded66b68cb',
  'x-ms-request-id',
  '4e9cb8c7-7844-4581-9939-2cb1b9ac3a4e',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:42:59 GMT',
  'Content-Length',
  '1346'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistdeletedcertificatesbypage-0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificatesbypage-0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAop/a9ct2IeX7GI6Fq+61WvIDJC5V7yJHdgB1v0gTCm2t3nvHnxw+hCyaQypAtGcIOg5A7di6ltGXhqIzFjWXkzagNpUiQCV2D9hVx9u8yMz7LptGmoXsoukpTgHZchA//cuEFW86K+Sr4L5H27jAmCfsCsY9/XvfHoiniGham6T9c325ORpWC1GprKNhgpEzfqTnus2RkE4Hgu5Ry3ADBAOsyOwMCAKRzL+WrD1unw/3HdEl4xSLVe9z8ViaZNt73iDIUK0yXfEVFZCkAHQ6Wm+Iy0q8L1iqD4/6m+so75H5X4DMmjsBFXunKBSwIBiawOYdmHnzSfVn1ON+OtSzlQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAHXRa7f23ByKNmuwrAyIIT3lYnLcz51wr0YcU8pwiJyOibJPT6foYmmI1BD+hMx+sGXvKipiRTSYbp4j9ephC/W+DCj15NNBSL0HBXF2EZBxePBYLdpjAanXsKgKTRqnkjt4PKWhct8vAaur0+xLnh1huW3TnNQapxfsD6gTt5KHijCciXEqn8fj4jf6EOcMffm6demaaCHKQqev/MGYTEbOL25yGrgUrWVjUng6C9dxerMbq9RX2kGXkz4/GYYkWZ+j7L+nrCRxIAkKB5UfpaDD1jbU+Qo/+l4O0fCsZLSe6xhImjBLC63druIV6HLd8TnXoapYGVtLSrgUUBWi0Zw=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"e1cbe5a4bb12415e8923d2e870d99f9f"}, [
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
  'eastus',
  'x-ms-client-request-id',
  'a5cb57ec-c57c-4679-9c24-e8fab6091d3a',
  'x-ms-request-id',
  '68e7931e-5b57-4bf3-ac54-eb175bbd6c5e',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:43:01 GMT',
  'Content-Length',
  '1346'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistdeletedcertificatesbypage-0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificatesbypage-0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAop/a9ct2IeX7GI6Fq+61WvIDJC5V7yJHdgB1v0gTCm2t3nvHnxw+hCyaQypAtGcIOg5A7di6ltGXhqIzFjWXkzagNpUiQCV2D9hVx9u8yMz7LptGmoXsoukpTgHZchA//cuEFW86K+Sr4L5H27jAmCfsCsY9/XvfHoiniGham6T9c325ORpWC1GprKNhgpEzfqTnus2RkE4Hgu5Ry3ADBAOsyOwMCAKRzL+WrD1unw/3HdEl4xSLVe9z8ViaZNt73iDIUK0yXfEVFZCkAHQ6Wm+Iy0q8L1iqD4/6m+so75H5X4DMmjsBFXunKBSwIBiawOYdmHnzSfVn1ON+OtSzlQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAHXRa7f23ByKNmuwrAyIIT3lYnLcz51wr0YcU8pwiJyOibJPT6foYmmI1BD+hMx+sGXvKipiRTSYbp4j9ephC/W+DCj15NNBSL0HBXF2EZBxePBYLdpjAanXsKgKTRqnkjt4PKWhct8vAaur0+xLnh1huW3TnNQapxfsD6gTt5KHijCciXEqn8fj4jf6EOcMffm6demaaCHKQqev/MGYTEbOL25yGrgUrWVjUng6C9dxerMbq9RX2kGXkz4/GYYkWZ+j7L+nrCRxIAkKB5UfpaDD1jbU+Qo/+l4O0fCsZLSe6xhImjBLC63druIV6HLd8TnXoapYGVtLSrgUUBWi0Zw=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"e1cbe5a4bb12415e8923d2e870d99f9f"}, [
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
  'eastus',
  'x-ms-client-request-id',
  '0e5a55a4-3dd8-43c2-b36e-490dbb24e6f5',
  'x-ms-request-id',
  'a31d21e5-8c48-41b9-96cf-90f0b974348b',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:43:03 GMT',
  'Content-Length',
  '1346'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistdeletedcertificatesbypage-0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificatesbypage-0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAop/a9ct2IeX7GI6Fq+61WvIDJC5V7yJHdgB1v0gTCm2t3nvHnxw+hCyaQypAtGcIOg5A7di6ltGXhqIzFjWXkzagNpUiQCV2D9hVx9u8yMz7LptGmoXsoukpTgHZchA//cuEFW86K+Sr4L5H27jAmCfsCsY9/XvfHoiniGham6T9c325ORpWC1GprKNhgpEzfqTnus2RkE4Hgu5Ry3ADBAOsyOwMCAKRzL+WrD1unw/3HdEl4xSLVe9z8ViaZNt73iDIUK0yXfEVFZCkAHQ6Wm+Iy0q8L1iqD4/6m+so75H5X4DMmjsBFXunKBSwIBiawOYdmHnzSfVn1ON+OtSzlQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAHXRa7f23ByKNmuwrAyIIT3lYnLcz51wr0YcU8pwiJyOibJPT6foYmmI1BD+hMx+sGXvKipiRTSYbp4j9ephC/W+DCj15NNBSL0HBXF2EZBxePBYLdpjAanXsKgKTRqnkjt4PKWhct8vAaur0+xLnh1huW3TnNQapxfsD6gTt5KHijCciXEqn8fj4jf6EOcMffm6demaaCHKQqev/MGYTEbOL25yGrgUrWVjUng6C9dxerMbq9RX2kGXkz4/GYYkWZ+j7L+nrCRxIAkKB5UfpaDD1jbU+Qo/+l4O0fCsZLSe6xhImjBLC63druIV6HLd8TnXoapYGVtLSrgUUBWi0Zw=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"e1cbe5a4bb12415e8923d2e870d99f9f"}, [
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
  'eastus',
  'x-ms-client-request-id',
  'd5b61223-0ba7-4dfb-9631-c4a66e167885',
  'x-ms-request-id',
  'd9a56072-7fea-49dd-bac4-8776ff8e9746',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:43:05 GMT',
  'Content-Length',
  '1346'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistdeletedcertificatesbypage-0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificatesbypage-0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAop/a9ct2IeX7GI6Fq+61WvIDJC5V7yJHdgB1v0gTCm2t3nvHnxw+hCyaQypAtGcIOg5A7di6ltGXhqIzFjWXkzagNpUiQCV2D9hVx9u8yMz7LptGmoXsoukpTgHZchA//cuEFW86K+Sr4L5H27jAmCfsCsY9/XvfHoiniGham6T9c325ORpWC1GprKNhgpEzfqTnus2RkE4Hgu5Ry3ADBAOsyOwMCAKRzL+WrD1unw/3HdEl4xSLVe9z8ViaZNt73iDIUK0yXfEVFZCkAHQ6Wm+Iy0q8L1iqD4/6m+so75H5X4DMmjsBFXunKBSwIBiawOYdmHnzSfVn1ON+OtSzlQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAHXRa7f23ByKNmuwrAyIIT3lYnLcz51wr0YcU8pwiJyOibJPT6foYmmI1BD+hMx+sGXvKipiRTSYbp4j9ephC/W+DCj15NNBSL0HBXF2EZBxePBYLdpjAanXsKgKTRqnkjt4PKWhct8vAaur0+xLnh1huW3TnNQapxfsD6gTt5KHijCciXEqn8fj4jf6EOcMffm6demaaCHKQqev/MGYTEbOL25yGrgUrWVjUng6C9dxerMbq9RX2kGXkz4/GYYkWZ+j7L+nrCRxIAkKB5UfpaDD1jbU+Qo/+l4O0fCsZLSe6xhImjBLC63druIV6HLd8TnXoapYGVtLSrgUUBWi0Zw=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"e1cbe5a4bb12415e8923d2e870d99f9f"}, [
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
  'eastus',
  'x-ms-client-request-id',
  'df736932-4f6d-40db-93bb-c2d80525cb6d',
  'x-ms-request-id',
  'ee33a606-7f53-47a4-b135-bc8db3429cac',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:43:08 GMT',
  'Content-Length',
  '1346'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistdeletedcertificatesbypage-0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificatesbypage-0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAop/a9ct2IeX7GI6Fq+61WvIDJC5V7yJHdgB1v0gTCm2t3nvHnxw+hCyaQypAtGcIOg5A7di6ltGXhqIzFjWXkzagNpUiQCV2D9hVx9u8yMz7LptGmoXsoukpTgHZchA//cuEFW86K+Sr4L5H27jAmCfsCsY9/XvfHoiniGham6T9c325ORpWC1GprKNhgpEzfqTnus2RkE4Hgu5Ry3ADBAOsyOwMCAKRzL+WrD1unw/3HdEl4xSLVe9z8ViaZNt73iDIUK0yXfEVFZCkAHQ6Wm+Iy0q8L1iqD4/6m+so75H5X4DMmjsBFXunKBSwIBiawOYdmHnzSfVn1ON+OtSzlQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAHXRa7f23ByKNmuwrAyIIT3lYnLcz51wr0YcU8pwiJyOibJPT6foYmmI1BD+hMx+sGXvKipiRTSYbp4j9ephC/W+DCj15NNBSL0HBXF2EZBxePBYLdpjAanXsKgKTRqnkjt4PKWhct8vAaur0+xLnh1huW3TnNQapxfsD6gTt5KHijCciXEqn8fj4jf6EOcMffm6demaaCHKQqev/MGYTEbOL25yGrgUrWVjUng6C9dxerMbq9RX2kGXkz4/GYYkWZ+j7L+nrCRxIAkKB5UfpaDD1jbU+Qo/+l4O0fCsZLSe6xhImjBLC63druIV6HLd8TnXoapYGVtLSrgUUBWi0Zw=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"e1cbe5a4bb12415e8923d2e870d99f9f"}, [
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
  'eastus',
  'x-ms-client-request-id',
  'e3061944-9d3b-455a-ac67-1c75fd3b003a',
  'x-ms-request-id',
  '63c90584-4a9b-4e9c-94f8-25e7332e857a',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:43:10 GMT',
  'Content-Length',
  '1346'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistdeletedcertificatesbypage-0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificatesbypage-0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAop/a9ct2IeX7GI6Fq+61WvIDJC5V7yJHdgB1v0gTCm2t3nvHnxw+hCyaQypAtGcIOg5A7di6ltGXhqIzFjWXkzagNpUiQCV2D9hVx9u8yMz7LptGmoXsoukpTgHZchA//cuEFW86K+Sr4L5H27jAmCfsCsY9/XvfHoiniGham6T9c325ORpWC1GprKNhgpEzfqTnus2RkE4Hgu5Ry3ADBAOsyOwMCAKRzL+WrD1unw/3HdEl4xSLVe9z8ViaZNt73iDIUK0yXfEVFZCkAHQ6Wm+Iy0q8L1iqD4/6m+so75H5X4DMmjsBFXunKBSwIBiawOYdmHnzSfVn1ON+OtSzlQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAHXRa7f23ByKNmuwrAyIIT3lYnLcz51wr0YcU8pwiJyOibJPT6foYmmI1BD+hMx+sGXvKipiRTSYbp4j9ephC/W+DCj15NNBSL0HBXF2EZBxePBYLdpjAanXsKgKTRqnkjt4PKWhct8vAaur0+xLnh1huW3TnNQapxfsD6gTt5KHijCciXEqn8fj4jf6EOcMffm6demaaCHKQqev/MGYTEbOL25yGrgUrWVjUng6C9dxerMbq9RX2kGXkz4/GYYkWZ+j7L+nrCRxIAkKB5UfpaDD1jbU+Qo/+l4O0fCsZLSe6xhImjBLC63druIV6HLd8TnXoapYGVtLSrgUUBWi0Zw=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"e1cbe5a4bb12415e8923d2e870d99f9f"}, [
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
  'eastus',
  'x-ms-client-request-id',
  '23eb3fa5-4c5c-4d47-acbb-902272706770',
  'x-ms-request-id',
  'd36cd5e1-63d5-44cb-976d-f2c11c70d463',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:43:12 GMT',
  'Content-Length',
  '1346'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistdeletedcertificatesbypage-0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificatesbypage-0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAop/a9ct2IeX7GI6Fq+61WvIDJC5V7yJHdgB1v0gTCm2t3nvHnxw+hCyaQypAtGcIOg5A7di6ltGXhqIzFjWXkzagNpUiQCV2D9hVx9u8yMz7LptGmoXsoukpTgHZchA//cuEFW86K+Sr4L5H27jAmCfsCsY9/XvfHoiniGham6T9c325ORpWC1GprKNhgpEzfqTnus2RkE4Hgu5Ry3ADBAOsyOwMCAKRzL+WrD1unw/3HdEl4xSLVe9z8ViaZNt73iDIUK0yXfEVFZCkAHQ6Wm+Iy0q8L1iqD4/6m+so75H5X4DMmjsBFXunKBSwIBiawOYdmHnzSfVn1ON+OtSzlQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAHXRa7f23ByKNmuwrAyIIT3lYnLcz51wr0YcU8pwiJyOibJPT6foYmmI1BD+hMx+sGXvKipiRTSYbp4j9ephC/W+DCj15NNBSL0HBXF2EZBxePBYLdpjAanXsKgKTRqnkjt4PKWhct8vAaur0+xLnh1huW3TnNQapxfsD6gTt5KHijCciXEqn8fj4jf6EOcMffm6demaaCHKQqev/MGYTEbOL25yGrgUrWVjUng6C9dxerMbq9RX2kGXkz4/GYYkWZ+j7L+nrCRxIAkKB5UfpaDD1jbU+Qo/+l4O0fCsZLSe6xhImjBLC63druIV6HLd8TnXoapYGVtLSrgUUBWi0Zw=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"e1cbe5a4bb12415e8923d2e870d99f9f"}, [
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
  'eastus',
  'x-ms-client-request-id',
  '34df978c-551f-4f1e-8e3e-c23fb96c7d7b',
  'x-ms-request-id',
  '20de9c3d-a0c4-4d8f-b995-1ccf0fa64958',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:43:14 GMT',
  'Content-Length',
  '1346'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistdeletedcertificatesbypage-0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificatesbypage-0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAop/a9ct2IeX7GI6Fq+61WvIDJC5V7yJHdgB1v0gTCm2t3nvHnxw+hCyaQypAtGcIOg5A7di6ltGXhqIzFjWXkzagNpUiQCV2D9hVx9u8yMz7LptGmoXsoukpTgHZchA//cuEFW86K+Sr4L5H27jAmCfsCsY9/XvfHoiniGham6T9c325ORpWC1GprKNhgpEzfqTnus2RkE4Hgu5Ry3ADBAOsyOwMCAKRzL+WrD1unw/3HdEl4xSLVe9z8ViaZNt73iDIUK0yXfEVFZCkAHQ6Wm+Iy0q8L1iqD4/6m+so75H5X4DMmjsBFXunKBSwIBiawOYdmHnzSfVn1ON+OtSzlQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAHXRa7f23ByKNmuwrAyIIT3lYnLcz51wr0YcU8pwiJyOibJPT6foYmmI1BD+hMx+sGXvKipiRTSYbp4j9ephC/W+DCj15NNBSL0HBXF2EZBxePBYLdpjAanXsKgKTRqnkjt4PKWhct8vAaur0+xLnh1huW3TnNQapxfsD6gTt5KHijCciXEqn8fj4jf6EOcMffm6demaaCHKQqev/MGYTEbOL25yGrgUrWVjUng6C9dxerMbq9RX2kGXkz4/GYYkWZ+j7L+nrCRxIAkKB5UfpaDD1jbU+Qo/+l4O0fCsZLSe6xhImjBLC63druIV6HLd8TnXoapYGVtLSrgUUBWi0Zw=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"e1cbe5a4bb12415e8923d2e870d99f9f"}, [
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
  'eastus',
  'x-ms-client-request-id',
  '34c60ec8-5c83-4491-b07b-c9aa7e440f69',
  'x-ms-request-id',
  '6e030ddd-45bf-4f1e-bfee-f2a8507c374e',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:43:16 GMT',
  'Content-Length',
  '1346'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistdeletedcertificatesbypage-0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificatesbypage-0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAop/a9ct2IeX7GI6Fq+61WvIDJC5V7yJHdgB1v0gTCm2t3nvHnxw+hCyaQypAtGcIOg5A7di6ltGXhqIzFjWXkzagNpUiQCV2D9hVx9u8yMz7LptGmoXsoukpTgHZchA//cuEFW86K+Sr4L5H27jAmCfsCsY9/XvfHoiniGham6T9c325ORpWC1GprKNhgpEzfqTnus2RkE4Hgu5Ry3ADBAOsyOwMCAKRzL+WrD1unw/3HdEl4xSLVe9z8ViaZNt73iDIUK0yXfEVFZCkAHQ6Wm+Iy0q8L1iqD4/6m+so75H5X4DMmjsBFXunKBSwIBiawOYdmHnzSfVn1ON+OtSzlQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAHXRa7f23ByKNmuwrAyIIT3lYnLcz51wr0YcU8pwiJyOibJPT6foYmmI1BD+hMx+sGXvKipiRTSYbp4j9ephC/W+DCj15NNBSL0HBXF2EZBxePBYLdpjAanXsKgKTRqnkjt4PKWhct8vAaur0+xLnh1huW3TnNQapxfsD6gTt5KHijCciXEqn8fj4jf6EOcMffm6demaaCHKQqev/MGYTEbOL25yGrgUrWVjUng6C9dxerMbq9RX2kGXkz4/GYYkWZ+j7L+nrCRxIAkKB5UfpaDD1jbU+Qo/+l4O0fCsZLSe6xhImjBLC63druIV6HLd8TnXoapYGVtLSrgUUBWi0Zw=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"e1cbe5a4bb12415e8923d2e870d99f9f"}, [
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
  'eastus',
  'x-ms-client-request-id',
  '80d41852-8a5a-42dd-aa16-6e59265519be',
  'x-ms-request-id',
  'b48b4b9b-6ade-4121-9446-483df5a498ed',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:43:18 GMT',
  'Content-Length',
  '1346'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistdeletedcertificatesbypage-0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificatesbypage-0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAop/a9ct2IeX7GI6Fq+61WvIDJC5V7yJHdgB1v0gTCm2t3nvHnxw+hCyaQypAtGcIOg5A7di6ltGXhqIzFjWXkzagNpUiQCV2D9hVx9u8yMz7LptGmoXsoukpTgHZchA//cuEFW86K+Sr4L5H27jAmCfsCsY9/XvfHoiniGham6T9c325ORpWC1GprKNhgpEzfqTnus2RkE4Hgu5Ry3ADBAOsyOwMCAKRzL+WrD1unw/3HdEl4xSLVe9z8ViaZNt73iDIUK0yXfEVFZCkAHQ6Wm+Iy0q8L1iqD4/6m+so75H5X4DMmjsBFXunKBSwIBiawOYdmHnzSfVn1ON+OtSzlQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAHXRa7f23ByKNmuwrAyIIT3lYnLcz51wr0YcU8pwiJyOibJPT6foYmmI1BD+hMx+sGXvKipiRTSYbp4j9ephC/W+DCj15NNBSL0HBXF2EZBxePBYLdpjAanXsKgKTRqnkjt4PKWhct8vAaur0+xLnh1huW3TnNQapxfsD6gTt5KHijCciXEqn8fj4jf6EOcMffm6demaaCHKQqev/MGYTEbOL25yGrgUrWVjUng6C9dxerMbq9RX2kGXkz4/GYYkWZ+j7L+nrCRxIAkKB5UfpaDD1jbU+Qo/+l4O0fCsZLSe6xhImjBLC63druIV6HLd8TnXoapYGVtLSrgUUBWi0Zw=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"e1cbe5a4bb12415e8923d2e870d99f9f"}, [
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
  'eastus',
  'x-ms-client-request-id',
  'af04b0f7-051b-4e87-ab0d-3f715338e613',
  'x-ms-request-id',
  '749e8e23-c770-49e7-addc-eb58133fe8dc',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:43:19 GMT',
  'Content-Length',
  '1346'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistdeletedcertificatesbypage-0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificatesbypage-0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAop/a9ct2IeX7GI6Fq+61WvIDJC5V7yJHdgB1v0gTCm2t3nvHnxw+hCyaQypAtGcIOg5A7di6ltGXhqIzFjWXkzagNpUiQCV2D9hVx9u8yMz7LptGmoXsoukpTgHZchA//cuEFW86K+Sr4L5H27jAmCfsCsY9/XvfHoiniGham6T9c325ORpWC1GprKNhgpEzfqTnus2RkE4Hgu5Ry3ADBAOsyOwMCAKRzL+WrD1unw/3HdEl4xSLVe9z8ViaZNt73iDIUK0yXfEVFZCkAHQ6Wm+Iy0q8L1iqD4/6m+so75H5X4DMmjsBFXunKBSwIBiawOYdmHnzSfVn1ON+OtSzlQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAHXRa7f23ByKNmuwrAyIIT3lYnLcz51wr0YcU8pwiJyOibJPT6foYmmI1BD+hMx+sGXvKipiRTSYbp4j9ephC/W+DCj15NNBSL0HBXF2EZBxePBYLdpjAanXsKgKTRqnkjt4PKWhct8vAaur0+xLnh1huW3TnNQapxfsD6gTt5KHijCciXEqn8fj4jf6EOcMffm6demaaCHKQqev/MGYTEbOL25yGrgUrWVjUng6C9dxerMbq9RX2kGXkz4/GYYkWZ+j7L+nrCRxIAkKB5UfpaDD1jbU+Qo/+l4O0fCsZLSe6xhImjBLC63druIV6HLd8TnXoapYGVtLSrgUUBWi0Zw=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"e1cbe5a4bb12415e8923d2e870d99f9f"}, [
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
  'eastus',
  'x-ms-client-request-id',
  'a63dc36e-aa96-4cdb-8816-ce6f78766fc6',
  'x-ms-request-id',
  '4927d552-42f0-4e83-8d92-e2eb9e751ef3',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:43:22 GMT',
  'Content-Length',
  '1346'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistdeletedcertificatesbypage-0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificatesbypage-0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAop/a9ct2IeX7GI6Fq+61WvIDJC5V7yJHdgB1v0gTCm2t3nvHnxw+hCyaQypAtGcIOg5A7di6ltGXhqIzFjWXkzagNpUiQCV2D9hVx9u8yMz7LptGmoXsoukpTgHZchA//cuEFW86K+Sr4L5H27jAmCfsCsY9/XvfHoiniGham6T9c325ORpWC1GprKNhgpEzfqTnus2RkE4Hgu5Ry3ADBAOsyOwMCAKRzL+WrD1unw/3HdEl4xSLVe9z8ViaZNt73iDIUK0yXfEVFZCkAHQ6Wm+Iy0q8L1iqD4/6m+so75H5X4DMmjsBFXunKBSwIBiawOYdmHnzSfVn1ON+OtSzlQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAHXRa7f23ByKNmuwrAyIIT3lYnLcz51wr0YcU8pwiJyOibJPT6foYmmI1BD+hMx+sGXvKipiRTSYbp4j9ephC/W+DCj15NNBSL0HBXF2EZBxePBYLdpjAanXsKgKTRqnkjt4PKWhct8vAaur0+xLnh1huW3TnNQapxfsD6gTt5KHijCciXEqn8fj4jf6EOcMffm6demaaCHKQqev/MGYTEbOL25yGrgUrWVjUng6C9dxerMbq9RX2kGXkz4/GYYkWZ+j7L+nrCRxIAkKB5UfpaDD1jbU+Qo/+l4O0fCsZLSe6xhImjBLC63druIV6HLd8TnXoapYGVtLSrgUUBWi0Zw=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"e1cbe5a4bb12415e8923d2e870d99f9f"}, [
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
  'eastus',
  'x-ms-client-request-id',
  'e2b904cf-60e0-4ef5-9c33-39959861321f',
  'x-ms-request-id',
  'f3478429-5b51-4e20-b52a-00a22b7ae59e',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:43:24 GMT',
  'Content-Length',
  '1346'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistdeletedcertificatesbypage-0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificatesbypage-0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAop/a9ct2IeX7GI6Fq+61WvIDJC5V7yJHdgB1v0gTCm2t3nvHnxw+hCyaQypAtGcIOg5A7di6ltGXhqIzFjWXkzagNpUiQCV2D9hVx9u8yMz7LptGmoXsoukpTgHZchA//cuEFW86K+Sr4L5H27jAmCfsCsY9/XvfHoiniGham6T9c325ORpWC1GprKNhgpEzfqTnus2RkE4Hgu5Ry3ADBAOsyOwMCAKRzL+WrD1unw/3HdEl4xSLVe9z8ViaZNt73iDIUK0yXfEVFZCkAHQ6Wm+Iy0q8L1iqD4/6m+so75H5X4DMmjsBFXunKBSwIBiawOYdmHnzSfVn1ON+OtSzlQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAHXRa7f23ByKNmuwrAyIIT3lYnLcz51wr0YcU8pwiJyOibJPT6foYmmI1BD+hMx+sGXvKipiRTSYbp4j9ephC/W+DCj15NNBSL0HBXF2EZBxePBYLdpjAanXsKgKTRqnkjt4PKWhct8vAaur0+xLnh1huW3TnNQapxfsD6gTt5KHijCciXEqn8fj4jf6EOcMffm6demaaCHKQqev/MGYTEbOL25yGrgUrWVjUng6C9dxerMbq9RX2kGXkz4/GYYkWZ+j7L+nrCRxIAkKB5UfpaDD1jbU+Qo/+l4O0fCsZLSe6xhImjBLC63druIV6HLd8TnXoapYGVtLSrgUUBWi0Zw=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"e1cbe5a4bb12415e8923d2e870d99f9f"}, [
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
  'eastus',
  'x-ms-client-request-id',
  '622449fd-564a-4272-8099-66b1740aeee2',
  'x-ms-request-id',
  '261c6452-7225-49fc-ae67-26c4750a64a6',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:43:27 GMT',
  'Content-Length',
  '1346'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistdeletedcertificatesbypage-0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificatesbypage-0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAop/a9ct2IeX7GI6Fq+61WvIDJC5V7yJHdgB1v0gTCm2t3nvHnxw+hCyaQypAtGcIOg5A7di6ltGXhqIzFjWXkzagNpUiQCV2D9hVx9u8yMz7LptGmoXsoukpTgHZchA//cuEFW86K+Sr4L5H27jAmCfsCsY9/XvfHoiniGham6T9c325ORpWC1GprKNhgpEzfqTnus2RkE4Hgu5Ry3ADBAOsyOwMCAKRzL+WrD1unw/3HdEl4xSLVe9z8ViaZNt73iDIUK0yXfEVFZCkAHQ6Wm+Iy0q8L1iqD4/6m+so75H5X4DMmjsBFXunKBSwIBiawOYdmHnzSfVn1ON+OtSzlQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAHXRa7f23ByKNmuwrAyIIT3lYnLcz51wr0YcU8pwiJyOibJPT6foYmmI1BD+hMx+sGXvKipiRTSYbp4j9ephC/W+DCj15NNBSL0HBXF2EZBxePBYLdpjAanXsKgKTRqnkjt4PKWhct8vAaur0+xLnh1huW3TnNQapxfsD6gTt5KHijCciXEqn8fj4jf6EOcMffm6demaaCHKQqev/MGYTEbOL25yGrgUrWVjUng6C9dxerMbq9RX2kGXkz4/GYYkWZ+j7L+nrCRxIAkKB5UfpaDD1jbU+Qo/+l4O0fCsZLSe6xhImjBLC63druIV6HLd8TnXoapYGVtLSrgUUBWi0Zw=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"e1cbe5a4bb12415e8923d2e870d99f9f"}, [
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
  'eastus',
  'x-ms-client-request-id',
  'ac189100-14c1-4b89-9af0-29b8be4640d4',
  'x-ms-request-id',
  'a90e2e5f-6a5a-4f9a-96a4-7bdd1e3460c1',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:43:29 GMT',
  'Content-Length',
  '1346'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistdeletedcertificatesbypage-0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificatesbypage-0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAop/a9ct2IeX7GI6Fq+61WvIDJC5V7yJHdgB1v0gTCm2t3nvHnxw+hCyaQypAtGcIOg5A7di6ltGXhqIzFjWXkzagNpUiQCV2D9hVx9u8yMz7LptGmoXsoukpTgHZchA//cuEFW86K+Sr4L5H27jAmCfsCsY9/XvfHoiniGham6T9c325ORpWC1GprKNhgpEzfqTnus2RkE4Hgu5Ry3ADBAOsyOwMCAKRzL+WrD1unw/3HdEl4xSLVe9z8ViaZNt73iDIUK0yXfEVFZCkAHQ6Wm+Iy0q8L1iqD4/6m+so75H5X4DMmjsBFXunKBSwIBiawOYdmHnzSfVn1ON+OtSzlQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAHXRa7f23ByKNmuwrAyIIT3lYnLcz51wr0YcU8pwiJyOibJPT6foYmmI1BD+hMx+sGXvKipiRTSYbp4j9ephC/W+DCj15NNBSL0HBXF2EZBxePBYLdpjAanXsKgKTRqnkjt4PKWhct8vAaur0+xLnh1huW3TnNQapxfsD6gTt5KHijCciXEqn8fj4jf6EOcMffm6demaaCHKQqev/MGYTEbOL25yGrgUrWVjUng6C9dxerMbq9RX2kGXkz4/GYYkWZ+j7L+nrCRxIAkKB5UfpaDD1jbU+Qo/+l4O0fCsZLSe6xhImjBLC63druIV6HLd8TnXoapYGVtLSrgUUBWi0Zw=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"e1cbe5a4bb12415e8923d2e870d99f9f"}, [
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
  'eastus',
  'x-ms-client-request-id',
  'f8e4a555-3962-427c-a4cd-313842ce1595',
  'x-ms-request-id',
  'e5636ce6-26ec-4e09-a9b1-c7f23dc4b407',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:43:30 GMT',
  'Content-Length',
  '1346'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistdeletedcertificatesbypage-0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificatesbypage-0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAop/a9ct2IeX7GI6Fq+61WvIDJC5V7yJHdgB1v0gTCm2t3nvHnxw+hCyaQypAtGcIOg5A7di6ltGXhqIzFjWXkzagNpUiQCV2D9hVx9u8yMz7LptGmoXsoukpTgHZchA//cuEFW86K+Sr4L5H27jAmCfsCsY9/XvfHoiniGham6T9c325ORpWC1GprKNhgpEzfqTnus2RkE4Hgu5Ry3ADBAOsyOwMCAKRzL+WrD1unw/3HdEl4xSLVe9z8ViaZNt73iDIUK0yXfEVFZCkAHQ6Wm+Iy0q8L1iqD4/6m+so75H5X4DMmjsBFXunKBSwIBiawOYdmHnzSfVn1ON+OtSzlQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAHXRa7f23ByKNmuwrAyIIT3lYnLcz51wr0YcU8pwiJyOibJPT6foYmmI1BD+hMx+sGXvKipiRTSYbp4j9ephC/W+DCj15NNBSL0HBXF2EZBxePBYLdpjAanXsKgKTRqnkjt4PKWhct8vAaur0+xLnh1huW3TnNQapxfsD6gTt5KHijCciXEqn8fj4jf6EOcMffm6demaaCHKQqev/MGYTEbOL25yGrgUrWVjUng6C9dxerMbq9RX2kGXkz4/GYYkWZ+j7L+nrCRxIAkKB5UfpaDD1jbU+Qo/+l4O0fCsZLSe6xhImjBLC63druIV6HLd8TnXoapYGVtLSrgUUBWi0Zw=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"e1cbe5a4bb12415e8923d2e870d99f9f"}, [
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
  'eastus',
  'x-ms-client-request-id',
  'afb14d6a-3148-41ad-a80c-548a21b12bf0',
  'x-ms-request-id',
  '94021759-3a10-4fdb-8e2f-d786e1791b55',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:43:32 GMT',
  'Content-Length',
  '1346'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistdeletedcertificatesbypage-0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificatesbypage-0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAop/a9ct2IeX7GI6Fq+61WvIDJC5V7yJHdgB1v0gTCm2t3nvHnxw+hCyaQypAtGcIOg5A7di6ltGXhqIzFjWXkzagNpUiQCV2D9hVx9u8yMz7LptGmoXsoukpTgHZchA//cuEFW86K+Sr4L5H27jAmCfsCsY9/XvfHoiniGham6T9c325ORpWC1GprKNhgpEzfqTnus2RkE4Hgu5Ry3ADBAOsyOwMCAKRzL+WrD1unw/3HdEl4xSLVe9z8ViaZNt73iDIUK0yXfEVFZCkAHQ6Wm+Iy0q8L1iqD4/6m+so75H5X4DMmjsBFXunKBSwIBiawOYdmHnzSfVn1ON+OtSzlQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAHXRa7f23ByKNmuwrAyIIT3lYnLcz51wr0YcU8pwiJyOibJPT6foYmmI1BD+hMx+sGXvKipiRTSYbp4j9ephC/W+DCj15NNBSL0HBXF2EZBxePBYLdpjAanXsKgKTRqnkjt4PKWhct8vAaur0+xLnh1huW3TnNQapxfsD6gTt5KHijCciXEqn8fj4jf6EOcMffm6demaaCHKQqev/MGYTEbOL25yGrgUrWVjUng6C9dxerMbq9RX2kGXkz4/GYYkWZ+j7L+nrCRxIAkKB5UfpaDD1jbU+Qo/+l4O0fCsZLSe6xhImjBLC63druIV6HLd8TnXoapYGVtLSrgUUBWi0Zw=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"e1cbe5a4bb12415e8923d2e870d99f9f"}, [
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
  'eastus',
  'x-ms-client-request-id',
  '36ccac8d-1d60-4636-9f6e-a6474df02efb',
  'x-ms-request-id',
  'cf4b7880-0da7-49d1-af78-c6577f379927',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:43:34 GMT',
  'Content-Length',
  '1346'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistdeletedcertificatesbypage-0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificatesbypage-0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAop/a9ct2IeX7GI6Fq+61WvIDJC5V7yJHdgB1v0gTCm2t3nvHnxw+hCyaQypAtGcIOg5A7di6ltGXhqIzFjWXkzagNpUiQCV2D9hVx9u8yMz7LptGmoXsoukpTgHZchA//cuEFW86K+Sr4L5H27jAmCfsCsY9/XvfHoiniGham6T9c325ORpWC1GprKNhgpEzfqTnus2RkE4Hgu5Ry3ADBAOsyOwMCAKRzL+WrD1unw/3HdEl4xSLVe9z8ViaZNt73iDIUK0yXfEVFZCkAHQ6Wm+Iy0q8L1iqD4/6m+so75H5X4DMmjsBFXunKBSwIBiawOYdmHnzSfVn1ON+OtSzlQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAHXRa7f23ByKNmuwrAyIIT3lYnLcz51wr0YcU8pwiJyOibJPT6foYmmI1BD+hMx+sGXvKipiRTSYbp4j9ephC/W+DCj15NNBSL0HBXF2EZBxePBYLdpjAanXsKgKTRqnkjt4PKWhct8vAaur0+xLnh1huW3TnNQapxfsD6gTt5KHijCciXEqn8fj4jf6EOcMffm6demaaCHKQqev/MGYTEbOL25yGrgUrWVjUng6C9dxerMbq9RX2kGXkz4/GYYkWZ+j7L+nrCRxIAkKB5UfpaDD1jbU+Qo/+l4O0fCsZLSe6xhImjBLC63druIV6HLd8TnXoapYGVtLSrgUUBWi0Zw=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"e1cbe5a4bb12415e8923d2e870d99f9f"}, [
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
  'eastus',
  'x-ms-client-request-id',
  '1412da09-e281-4f15-af05-3cc533f0c872',
  'x-ms-request-id',
  '590a4e38-93a3-43bb-a3dc-90f03e5a0fe3',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:43:37 GMT',
  'Content-Length',
  '1346'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistdeletedcertificatesbypage-0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificatesbypage-0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAop/a9ct2IeX7GI6Fq+61WvIDJC5V7yJHdgB1v0gTCm2t3nvHnxw+hCyaQypAtGcIOg5A7di6ltGXhqIzFjWXkzagNpUiQCV2D9hVx9u8yMz7LptGmoXsoukpTgHZchA//cuEFW86K+Sr4L5H27jAmCfsCsY9/XvfHoiniGham6T9c325ORpWC1GprKNhgpEzfqTnus2RkE4Hgu5Ry3ADBAOsyOwMCAKRzL+WrD1unw/3HdEl4xSLVe9z8ViaZNt73iDIUK0yXfEVFZCkAHQ6Wm+Iy0q8L1iqD4/6m+so75H5X4DMmjsBFXunKBSwIBiawOYdmHnzSfVn1ON+OtSzlQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAHXRa7f23ByKNmuwrAyIIT3lYnLcz51wr0YcU8pwiJyOibJPT6foYmmI1BD+hMx+sGXvKipiRTSYbp4j9ephC/W+DCj15NNBSL0HBXF2EZBxePBYLdpjAanXsKgKTRqnkjt4PKWhct8vAaur0+xLnh1huW3TnNQapxfsD6gTt5KHijCciXEqn8fj4jf6EOcMffm6demaaCHKQqev/MGYTEbOL25yGrgUrWVjUng6C9dxerMbq9RX2kGXkz4/GYYkWZ+j7L+nrCRxIAkKB5UfpaDD1jbU+Qo/+l4O0fCsZLSe6xhImjBLC63druIV6HLd8TnXoapYGVtLSrgUUBWi0Zw=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"e1cbe5a4bb12415e8923d2e870d99f9f"}, [
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
  'eastus',
  'x-ms-client-request-id',
  '77b6890f-6606-4b19-97fb-4122cd30c74b',
  'x-ms-request-id',
  '445620e0-0ca6-4bd4-ad5c-001dffca4055',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:43:39 GMT',
  'Content-Length',
  '1346'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistdeletedcertificatesbypage-0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificatesbypage-0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAop/a9ct2IeX7GI6Fq+61WvIDJC5V7yJHdgB1v0gTCm2t3nvHnxw+hCyaQypAtGcIOg5A7di6ltGXhqIzFjWXkzagNpUiQCV2D9hVx9u8yMz7LptGmoXsoukpTgHZchA//cuEFW86K+Sr4L5H27jAmCfsCsY9/XvfHoiniGham6T9c325ORpWC1GprKNhgpEzfqTnus2RkE4Hgu5Ry3ADBAOsyOwMCAKRzL+WrD1unw/3HdEl4xSLVe9z8ViaZNt73iDIUK0yXfEVFZCkAHQ6Wm+Iy0q8L1iqD4/6m+so75H5X4DMmjsBFXunKBSwIBiawOYdmHnzSfVn1ON+OtSzlQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAHXRa7f23ByKNmuwrAyIIT3lYnLcz51wr0YcU8pwiJyOibJPT6foYmmI1BD+hMx+sGXvKipiRTSYbp4j9ephC/W+DCj15NNBSL0HBXF2EZBxePBYLdpjAanXsKgKTRqnkjt4PKWhct8vAaur0+xLnh1huW3TnNQapxfsD6gTt5KHijCciXEqn8fj4jf6EOcMffm6demaaCHKQqev/MGYTEbOL25yGrgUrWVjUng6C9dxerMbq9RX2kGXkz4/GYYkWZ+j7L+nrCRxIAkKB5UfpaDD1jbU+Qo/+l4O0fCsZLSe6xhImjBLC63druIV6HLd8TnXoapYGVtLSrgUUBWi0Zw=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"e1cbe5a4bb12415e8923d2e870d99f9f"}, [
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
  'eastus',
  'x-ms-client-request-id',
  '7005ec5e-a0d5-4d81-91fe-f10124ecb434',
  'x-ms-request-id',
  'fc433828-830a-4cb7-b672-e2f5deeb79eb',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:43:41 GMT',
  'Content-Length',
  '1346'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistdeletedcertificatesbypage-0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificatesbypage-0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAop/a9ct2IeX7GI6Fq+61WvIDJC5V7yJHdgB1v0gTCm2t3nvHnxw+hCyaQypAtGcIOg5A7di6ltGXhqIzFjWXkzagNpUiQCV2D9hVx9u8yMz7LptGmoXsoukpTgHZchA//cuEFW86K+Sr4L5H27jAmCfsCsY9/XvfHoiniGham6T9c325ORpWC1GprKNhgpEzfqTnus2RkE4Hgu5Ry3ADBAOsyOwMCAKRzL+WrD1unw/3HdEl4xSLVe9z8ViaZNt73iDIUK0yXfEVFZCkAHQ6Wm+Iy0q8L1iqD4/6m+so75H5X4DMmjsBFXunKBSwIBiawOYdmHnzSfVn1ON+OtSzlQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAHXRa7f23ByKNmuwrAyIIT3lYnLcz51wr0YcU8pwiJyOibJPT6foYmmI1BD+hMx+sGXvKipiRTSYbp4j9ephC/W+DCj15NNBSL0HBXF2EZBxePBYLdpjAanXsKgKTRqnkjt4PKWhct8vAaur0+xLnh1huW3TnNQapxfsD6gTt5KHijCciXEqn8fj4jf6EOcMffm6demaaCHKQqev/MGYTEbOL25yGrgUrWVjUng6C9dxerMbq9RX2kGXkz4/GYYkWZ+j7L+nrCRxIAkKB5UfpaDD1jbU+Qo/+l4O0fCsZLSe6xhImjBLC63druIV6HLd8TnXoapYGVtLSrgUUBWi0Zw=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"e1cbe5a4bb12415e8923d2e870d99f9f"}, [
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
  'eastus',
  'x-ms-client-request-id',
  '9659ddc0-21fb-4d14-9ebe-9ee905ba7f57',
  'x-ms-request-id',
  'e166ab2b-d4b4-43de-a91f-e327743ffeba',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:43:44 GMT',
  'Content-Length',
  '1346'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistdeletedcertificatesbypage-0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificatesbypage-0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAop/a9ct2IeX7GI6Fq+61WvIDJC5V7yJHdgB1v0gTCm2t3nvHnxw+hCyaQypAtGcIOg5A7di6ltGXhqIzFjWXkzagNpUiQCV2D9hVx9u8yMz7LptGmoXsoukpTgHZchA//cuEFW86K+Sr4L5H27jAmCfsCsY9/XvfHoiniGham6T9c325ORpWC1GprKNhgpEzfqTnus2RkE4Hgu5Ry3ADBAOsyOwMCAKRzL+WrD1unw/3HdEl4xSLVe9z8ViaZNt73iDIUK0yXfEVFZCkAHQ6Wm+Iy0q8L1iqD4/6m+so75H5X4DMmjsBFXunKBSwIBiawOYdmHnzSfVn1ON+OtSzlQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAHXRa7f23ByKNmuwrAyIIT3lYnLcz51wr0YcU8pwiJyOibJPT6foYmmI1BD+hMx+sGXvKipiRTSYbp4j9ephC/W+DCj15NNBSL0HBXF2EZBxePBYLdpjAanXsKgKTRqnkjt4PKWhct8vAaur0+xLnh1huW3TnNQapxfsD6gTt5KHijCciXEqn8fj4jf6EOcMffm6demaaCHKQqev/MGYTEbOL25yGrgUrWVjUng6C9dxerMbq9RX2kGXkz4/GYYkWZ+j7L+nrCRxIAkKB5UfpaDD1jbU+Qo/+l4O0fCsZLSe6xhImjBLC63druIV6HLd8TnXoapYGVtLSrgUUBWi0Zw=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"e1cbe5a4bb12415e8923d2e870d99f9f"}, [
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
  'eastus',
  'x-ms-client-request-id',
  '99edda01-fdf1-45cc-b6da-79d4c5495581',
  'x-ms-request-id',
  'f594215b-aa66-4dc4-939f-c2a9f6ec8999',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:43:46 GMT',
  'Content-Length',
  '1346'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistdeletedcertificatesbypage-0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificatesbypage-0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAop/a9ct2IeX7GI6Fq+61WvIDJC5V7yJHdgB1v0gTCm2t3nvHnxw+hCyaQypAtGcIOg5A7di6ltGXhqIzFjWXkzagNpUiQCV2D9hVx9u8yMz7LptGmoXsoukpTgHZchA//cuEFW86K+Sr4L5H27jAmCfsCsY9/XvfHoiniGham6T9c325ORpWC1GprKNhgpEzfqTnus2RkE4Hgu5Ry3ADBAOsyOwMCAKRzL+WrD1unw/3HdEl4xSLVe9z8ViaZNt73iDIUK0yXfEVFZCkAHQ6Wm+Iy0q8L1iqD4/6m+so75H5X4DMmjsBFXunKBSwIBiawOYdmHnzSfVn1ON+OtSzlQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAHXRa7f23ByKNmuwrAyIIT3lYnLcz51wr0YcU8pwiJyOibJPT6foYmmI1BD+hMx+sGXvKipiRTSYbp4j9ephC/W+DCj15NNBSL0HBXF2EZBxePBYLdpjAanXsKgKTRqnkjt4PKWhct8vAaur0+xLnh1huW3TnNQapxfsD6gTt5KHijCciXEqn8fj4jf6EOcMffm6demaaCHKQqev/MGYTEbOL25yGrgUrWVjUng6C9dxerMbq9RX2kGXkz4/GYYkWZ+j7L+nrCRxIAkKB5UfpaDD1jbU+Qo/+l4O0fCsZLSe6xhImjBLC63druIV6HLd8TnXoapYGVtLSrgUUBWi0Zw=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"e1cbe5a4bb12415e8923d2e870d99f9f"}, [
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
  'eastus',
  'x-ms-client-request-id',
  'f1bba4ca-2d1c-4fa2-8ef3-e6b963fffe5b',
  'x-ms-request-id',
  'd30823bf-48e4-460f-98ae-f1c2f5e9dade',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:43:48 GMT',
  'Content-Length',
  '1346'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistdeletedcertificatesbypage-0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificatesbypage-0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAop/a9ct2IeX7GI6Fq+61WvIDJC5V7yJHdgB1v0gTCm2t3nvHnxw+hCyaQypAtGcIOg5A7di6ltGXhqIzFjWXkzagNpUiQCV2D9hVx9u8yMz7LptGmoXsoukpTgHZchA//cuEFW86K+Sr4L5H27jAmCfsCsY9/XvfHoiniGham6T9c325ORpWC1GprKNhgpEzfqTnus2RkE4Hgu5Ry3ADBAOsyOwMCAKRzL+WrD1unw/3HdEl4xSLVe9z8ViaZNt73iDIUK0yXfEVFZCkAHQ6Wm+Iy0q8L1iqD4/6m+so75H5X4DMmjsBFXunKBSwIBiawOYdmHnzSfVn1ON+OtSzlQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAHXRa7f23ByKNmuwrAyIIT3lYnLcz51wr0YcU8pwiJyOibJPT6foYmmI1BD+hMx+sGXvKipiRTSYbp4j9ephC/W+DCj15NNBSL0HBXF2EZBxePBYLdpjAanXsKgKTRqnkjt4PKWhct8vAaur0+xLnh1huW3TnNQapxfsD6gTt5KHijCciXEqn8fj4jf6EOcMffm6demaaCHKQqev/MGYTEbOL25yGrgUrWVjUng6C9dxerMbq9RX2kGXkz4/GYYkWZ+j7L+nrCRxIAkKB5UfpaDD1jbU+Qo/+l4O0fCsZLSe6xhImjBLC63druIV6HLd8TnXoapYGVtLSrgUUBWi0Zw=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"e1cbe5a4bb12415e8923d2e870d99f9f"}, [
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
  'eastus',
  'x-ms-client-request-id',
  '130a8e5c-cb00-4027-a9d9-b48bf9381f10',
  'x-ms-request-id',
  '33f5fab4-44a8-4c5e-87e3-1a77afebaff1',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:43:49 GMT',
  'Content-Length',
  '1346'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistdeletedcertificatesbypage-0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificatesbypage-0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAop/a9ct2IeX7GI6Fq+61WvIDJC5V7yJHdgB1v0gTCm2t3nvHnxw+hCyaQypAtGcIOg5A7di6ltGXhqIzFjWXkzagNpUiQCV2D9hVx9u8yMz7LptGmoXsoukpTgHZchA//cuEFW86K+Sr4L5H27jAmCfsCsY9/XvfHoiniGham6T9c325ORpWC1GprKNhgpEzfqTnus2RkE4Hgu5Ry3ADBAOsyOwMCAKRzL+WrD1unw/3HdEl4xSLVe9z8ViaZNt73iDIUK0yXfEVFZCkAHQ6Wm+Iy0q8L1iqD4/6m+so75H5X4DMmjsBFXunKBSwIBiawOYdmHnzSfVn1ON+OtSzlQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAHXRa7f23ByKNmuwrAyIIT3lYnLcz51wr0YcU8pwiJyOibJPT6foYmmI1BD+hMx+sGXvKipiRTSYbp4j9ephC/W+DCj15NNBSL0HBXF2EZBxePBYLdpjAanXsKgKTRqnkjt4PKWhct8vAaur0+xLnh1huW3TnNQapxfsD6gTt5KHijCciXEqn8fj4jf6EOcMffm6demaaCHKQqev/MGYTEbOL25yGrgUrWVjUng6C9dxerMbq9RX2kGXkz4/GYYkWZ+j7L+nrCRxIAkKB5UfpaDD1jbU+Qo/+l4O0fCsZLSe6xhImjBLC63druIV6HLd8TnXoapYGVtLSrgUUBWi0Zw=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"e1cbe5a4bb12415e8923d2e870d99f9f"}, [
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
  'eastus',
  'x-ms-client-request-id',
  '8e9cb111-2996-4045-9675-21176cbf3e76',
  'x-ms-request-id',
  '6b733750-9807-4586-8ae7-86549e0cf220',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:43:51 GMT',
  'Content-Length',
  '1346'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistdeletedcertificatesbypage-0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificatesbypage-0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAop/a9ct2IeX7GI6Fq+61WvIDJC5V7yJHdgB1v0gTCm2t3nvHnxw+hCyaQypAtGcIOg5A7di6ltGXhqIzFjWXkzagNpUiQCV2D9hVx9u8yMz7LptGmoXsoukpTgHZchA//cuEFW86K+Sr4L5H27jAmCfsCsY9/XvfHoiniGham6T9c325ORpWC1GprKNhgpEzfqTnus2RkE4Hgu5Ry3ADBAOsyOwMCAKRzL+WrD1unw/3HdEl4xSLVe9z8ViaZNt73iDIUK0yXfEVFZCkAHQ6Wm+Iy0q8L1iqD4/6m+so75H5X4DMmjsBFXunKBSwIBiawOYdmHnzSfVn1ON+OtSzlQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAHXRa7f23ByKNmuwrAyIIT3lYnLcz51wr0YcU8pwiJyOibJPT6foYmmI1BD+hMx+sGXvKipiRTSYbp4j9ephC/W+DCj15NNBSL0HBXF2EZBxePBYLdpjAanXsKgKTRqnkjt4PKWhct8vAaur0+xLnh1huW3TnNQapxfsD6gTt5KHijCciXEqn8fj4jf6EOcMffm6demaaCHKQqev/MGYTEbOL25yGrgUrWVjUng6C9dxerMbq9RX2kGXkz4/GYYkWZ+j7L+nrCRxIAkKB5UfpaDD1jbU+Qo/+l4O0fCsZLSe6xhImjBLC63druIV6HLd8TnXoapYGVtLSrgUUBWi0Zw=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"e1cbe5a4bb12415e8923d2e870d99f9f"}, [
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
  'eastus',
  'x-ms-client-request-id',
  '74a8d6c0-de3e-47bf-83eb-1ad3110f154a',
  'x-ms-request-id',
  'edba772b-e842-40f3-a293-205236f832be',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:43:53 GMT',
  'Content-Length',
  '1346'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistdeletedcertificatesbypage-0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificatesbypage-0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAop/a9ct2IeX7GI6Fq+61WvIDJC5V7yJHdgB1v0gTCm2t3nvHnxw+hCyaQypAtGcIOg5A7di6ltGXhqIzFjWXkzagNpUiQCV2D9hVx9u8yMz7LptGmoXsoukpTgHZchA//cuEFW86K+Sr4L5H27jAmCfsCsY9/XvfHoiniGham6T9c325ORpWC1GprKNhgpEzfqTnus2RkE4Hgu5Ry3ADBAOsyOwMCAKRzL+WrD1unw/3HdEl4xSLVe9z8ViaZNt73iDIUK0yXfEVFZCkAHQ6Wm+Iy0q8L1iqD4/6m+so75H5X4DMmjsBFXunKBSwIBiawOYdmHnzSfVn1ON+OtSzlQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAHXRa7f23ByKNmuwrAyIIT3lYnLcz51wr0YcU8pwiJyOibJPT6foYmmI1BD+hMx+sGXvKipiRTSYbp4j9ephC/W+DCj15NNBSL0HBXF2EZBxePBYLdpjAanXsKgKTRqnkjt4PKWhct8vAaur0+xLnh1huW3TnNQapxfsD6gTt5KHijCciXEqn8fj4jf6EOcMffm6demaaCHKQqev/MGYTEbOL25yGrgUrWVjUng6C9dxerMbq9RX2kGXkz4/GYYkWZ+j7L+nrCRxIAkKB5UfpaDD1jbU+Qo/+l4O0fCsZLSe6xhImjBLC63druIV6HLd8TnXoapYGVtLSrgUUBWi0Zw=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"e1cbe5a4bb12415e8923d2e870d99f9f"}, [
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
  'eastus',
  'x-ms-client-request-id',
  'cf50ce45-fbbb-4069-9fd4-bc445587ed21',
  'x-ms-request-id',
  'c7a64af5-ea61-47cb-bee9-ea6284b29ede',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:43:55 GMT',
  'Content-Length',
  '1346'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistdeletedcertificatesbypage-0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificatesbypage-0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAop/a9ct2IeX7GI6Fq+61WvIDJC5V7yJHdgB1v0gTCm2t3nvHnxw+hCyaQypAtGcIOg5A7di6ltGXhqIzFjWXkzagNpUiQCV2D9hVx9u8yMz7LptGmoXsoukpTgHZchA//cuEFW86K+Sr4L5H27jAmCfsCsY9/XvfHoiniGham6T9c325ORpWC1GprKNhgpEzfqTnus2RkE4Hgu5Ry3ADBAOsyOwMCAKRzL+WrD1unw/3HdEl4xSLVe9z8ViaZNt73iDIUK0yXfEVFZCkAHQ6Wm+Iy0q8L1iqD4/6m+so75H5X4DMmjsBFXunKBSwIBiawOYdmHnzSfVn1ON+OtSzlQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAHXRa7f23ByKNmuwrAyIIT3lYnLcz51wr0YcU8pwiJyOibJPT6foYmmI1BD+hMx+sGXvKipiRTSYbp4j9ephC/W+DCj15NNBSL0HBXF2EZBxePBYLdpjAanXsKgKTRqnkjt4PKWhct8vAaur0+xLnh1huW3TnNQapxfsD6gTt5KHijCciXEqn8fj4jf6EOcMffm6demaaCHKQqev/MGYTEbOL25yGrgUrWVjUng6C9dxerMbq9RX2kGXkz4/GYYkWZ+j7L+nrCRxIAkKB5UfpaDD1jbU+Qo/+l4O0fCsZLSe6xhImjBLC63druIV6HLd8TnXoapYGVtLSrgUUBWi0Zw=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"e1cbe5a4bb12415e8923d2e870d99f9f"}, [
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
  'eastus',
  'x-ms-client-request-id',
  'e5ac085b-df63-458c-97a2-285fd4c9a3ab',
  'x-ms-request-id',
  '91fd3d71-8279-4a93-9ad8-65c6840657e8',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:43:58 GMT',
  'Content-Length',
  '1346'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistdeletedcertificatesbypage-0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificatesbypage-0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAop/a9ct2IeX7GI6Fq+61WvIDJC5V7yJHdgB1v0gTCm2t3nvHnxw+hCyaQypAtGcIOg5A7di6ltGXhqIzFjWXkzagNpUiQCV2D9hVx9u8yMz7LptGmoXsoukpTgHZchA//cuEFW86K+Sr4L5H27jAmCfsCsY9/XvfHoiniGham6T9c325ORpWC1GprKNhgpEzfqTnus2RkE4Hgu5Ry3ADBAOsyOwMCAKRzL+WrD1unw/3HdEl4xSLVe9z8ViaZNt73iDIUK0yXfEVFZCkAHQ6Wm+Iy0q8L1iqD4/6m+so75H5X4DMmjsBFXunKBSwIBiawOYdmHnzSfVn1ON+OtSzlQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAHXRa7f23ByKNmuwrAyIIT3lYnLcz51wr0YcU8pwiJyOibJPT6foYmmI1BD+hMx+sGXvKipiRTSYbp4j9ephC/W+DCj15NNBSL0HBXF2EZBxePBYLdpjAanXsKgKTRqnkjt4PKWhct8vAaur0+xLnh1huW3TnNQapxfsD6gTt5KHijCciXEqn8fj4jf6EOcMffm6demaaCHKQqev/MGYTEbOL25yGrgUrWVjUng6C9dxerMbq9RX2kGXkz4/GYYkWZ+j7L+nrCRxIAkKB5UfpaDD1jbU+Qo/+l4O0fCsZLSe6xhImjBLC63druIV6HLd8TnXoapYGVtLSrgUUBWi0Zw=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"e1cbe5a4bb12415e8923d2e870d99f9f"}, [
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
  'eastus',
  'x-ms-client-request-id',
  '631de3c6-b94e-48bf-bf5f-f6310f84d8d8',
  'x-ms-request-id',
  '3d1c41b8-af46-4707-90bd-8ed8e6eac53e',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:44:00 GMT',
  'Content-Length',
  '1346'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistdeletedcertificatesbypage-0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificatesbypage-0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAop/a9ct2IeX7GI6Fq+61WvIDJC5V7yJHdgB1v0gTCm2t3nvHnxw+hCyaQypAtGcIOg5A7di6ltGXhqIzFjWXkzagNpUiQCV2D9hVx9u8yMz7LptGmoXsoukpTgHZchA//cuEFW86K+Sr4L5H27jAmCfsCsY9/XvfHoiniGham6T9c325ORpWC1GprKNhgpEzfqTnus2RkE4Hgu5Ry3ADBAOsyOwMCAKRzL+WrD1unw/3HdEl4xSLVe9z8ViaZNt73iDIUK0yXfEVFZCkAHQ6Wm+Iy0q8L1iqD4/6m+so75H5X4DMmjsBFXunKBSwIBiawOYdmHnzSfVn1ON+OtSzlQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAHXRa7f23ByKNmuwrAyIIT3lYnLcz51wr0YcU8pwiJyOibJPT6foYmmI1BD+hMx+sGXvKipiRTSYbp4j9ephC/W+DCj15NNBSL0HBXF2EZBxePBYLdpjAanXsKgKTRqnkjt4PKWhct8vAaur0+xLnh1huW3TnNQapxfsD6gTt5KHijCciXEqn8fj4jf6EOcMffm6demaaCHKQqev/MGYTEbOL25yGrgUrWVjUng6C9dxerMbq9RX2kGXkz4/GYYkWZ+j7L+nrCRxIAkKB5UfpaDD1jbU+Qo/+l4O0fCsZLSe6xhImjBLC63druIV6HLd8TnXoapYGVtLSrgUUBWi0Zw=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"e1cbe5a4bb12415e8923d2e870d99f9f"}, [
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
  'eastus',
  'x-ms-client-request-id',
  '581abdbd-0a32-4f35-990f-54173b0c2609',
  'x-ms-request-id',
  '028bc438-518c-41f9-86e6-1a2faf3cb2f8',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:44:02 GMT',
  'Content-Length',
  '1346'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistdeletedcertificatesbypage-0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificatesbypage-0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAop/a9ct2IeX7GI6Fq+61WvIDJC5V7yJHdgB1v0gTCm2t3nvHnxw+hCyaQypAtGcIOg5A7di6ltGXhqIzFjWXkzagNpUiQCV2D9hVx9u8yMz7LptGmoXsoukpTgHZchA//cuEFW86K+Sr4L5H27jAmCfsCsY9/XvfHoiniGham6T9c325ORpWC1GprKNhgpEzfqTnus2RkE4Hgu5Ry3ADBAOsyOwMCAKRzL+WrD1unw/3HdEl4xSLVe9z8ViaZNt73iDIUK0yXfEVFZCkAHQ6Wm+Iy0q8L1iqD4/6m+so75H5X4DMmjsBFXunKBSwIBiawOYdmHnzSfVn1ON+OtSzlQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAHXRa7f23ByKNmuwrAyIIT3lYnLcz51wr0YcU8pwiJyOibJPT6foYmmI1BD+hMx+sGXvKipiRTSYbp4j9ephC/W+DCj15NNBSL0HBXF2EZBxePBYLdpjAanXsKgKTRqnkjt4PKWhct8vAaur0+xLnh1huW3TnNQapxfsD6gTt5KHijCciXEqn8fj4jf6EOcMffm6demaaCHKQqev/MGYTEbOL25yGrgUrWVjUng6C9dxerMbq9RX2kGXkz4/GYYkWZ+j7L+nrCRxIAkKB5UfpaDD1jbU+Qo/+l4O0fCsZLSe6xhImjBLC63druIV6HLd8TnXoapYGVtLSrgUUBWi0Zw=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"e1cbe5a4bb12415e8923d2e870d99f9f"}, [
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
  'eastus',
  'x-ms-client-request-id',
  '807a19fb-1574-4a7d-9c3d-240391864b4c',
  'x-ms-request-id',
  'd42f82c0-5a43-42ff-bb25-9a8b0f62a07e',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:44:04 GMT',
  'Content-Length',
  '1346'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistdeletedcertificatesbypage-0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificatesbypage-0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAop/a9ct2IeX7GI6Fq+61WvIDJC5V7yJHdgB1v0gTCm2t3nvHnxw+hCyaQypAtGcIOg5A7di6ltGXhqIzFjWXkzagNpUiQCV2D9hVx9u8yMz7LptGmoXsoukpTgHZchA//cuEFW86K+Sr4L5H27jAmCfsCsY9/XvfHoiniGham6T9c325ORpWC1GprKNhgpEzfqTnus2RkE4Hgu5Ry3ADBAOsyOwMCAKRzL+WrD1unw/3HdEl4xSLVe9z8ViaZNt73iDIUK0yXfEVFZCkAHQ6Wm+Iy0q8L1iqD4/6m+so75H5X4DMmjsBFXunKBSwIBiawOYdmHnzSfVn1ON+OtSzlQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAHXRa7f23ByKNmuwrAyIIT3lYnLcz51wr0YcU8pwiJyOibJPT6foYmmI1BD+hMx+sGXvKipiRTSYbp4j9ephC/W+DCj15NNBSL0HBXF2EZBxePBYLdpjAanXsKgKTRqnkjt4PKWhct8vAaur0+xLnh1huW3TnNQapxfsD6gTt5KHijCciXEqn8fj4jf6EOcMffm6demaaCHKQqev/MGYTEbOL25yGrgUrWVjUng6C9dxerMbq9RX2kGXkz4/GYYkWZ+j7L+nrCRxIAkKB5UfpaDD1jbU+Qo/+l4O0fCsZLSe6xhImjBLC63druIV6HLd8TnXoapYGVtLSrgUUBWi0Zw=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"e1cbe5a4bb12415e8923d2e870d99f9f"}, [
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
  'eastus',
  'x-ms-client-request-id',
  '2070febe-91bc-492f-850f-b19a912fedde',
  'x-ms-request-id',
  '2c451dd0-db7f-4cec-bfe6-73e454badbf4',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:44:06 GMT',
  'Content-Length',
  '1346'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistdeletedcertificatesbypage-0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificatesbypage-0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAop/a9ct2IeX7GI6Fq+61WvIDJC5V7yJHdgB1v0gTCm2t3nvHnxw+hCyaQypAtGcIOg5A7di6ltGXhqIzFjWXkzagNpUiQCV2D9hVx9u8yMz7LptGmoXsoukpTgHZchA//cuEFW86K+Sr4L5H27jAmCfsCsY9/XvfHoiniGham6T9c325ORpWC1GprKNhgpEzfqTnus2RkE4Hgu5Ry3ADBAOsyOwMCAKRzL+WrD1unw/3HdEl4xSLVe9z8ViaZNt73iDIUK0yXfEVFZCkAHQ6Wm+Iy0q8L1iqD4/6m+so75H5X4DMmjsBFXunKBSwIBiawOYdmHnzSfVn1ON+OtSzlQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAHXRa7f23ByKNmuwrAyIIT3lYnLcz51wr0YcU8pwiJyOibJPT6foYmmI1BD+hMx+sGXvKipiRTSYbp4j9ephC/W+DCj15NNBSL0HBXF2EZBxePBYLdpjAanXsKgKTRqnkjt4PKWhct8vAaur0+xLnh1huW3TnNQapxfsD6gTt5KHijCciXEqn8fj4jf6EOcMffm6demaaCHKQqev/MGYTEbOL25yGrgUrWVjUng6C9dxerMbq9RX2kGXkz4/GYYkWZ+j7L+nrCRxIAkKB5UfpaDD1jbU+Qo/+l4O0fCsZLSe6xhImjBLC63druIV6HLd8TnXoapYGVtLSrgUUBWi0Zw=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"e1cbe5a4bb12415e8923d2e870d99f9f"}, [
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
  'eastus',
  'x-ms-client-request-id',
  '7da28cd0-5e7a-4780-8fd6-99ea949ca6b5',
  'x-ms-request-id',
  '52cbe775-870f-4e5c-a2ef-b4a9c974def3',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:44:08 GMT',
  'Content-Length',
  '1346'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistdeletedcertificatesbypage-0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificatesbypage-0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAop/a9ct2IeX7GI6Fq+61WvIDJC5V7yJHdgB1v0gTCm2t3nvHnxw+hCyaQypAtGcIOg5A7di6ltGXhqIzFjWXkzagNpUiQCV2D9hVx9u8yMz7LptGmoXsoukpTgHZchA//cuEFW86K+Sr4L5H27jAmCfsCsY9/XvfHoiniGham6T9c325ORpWC1GprKNhgpEzfqTnus2RkE4Hgu5Ry3ADBAOsyOwMCAKRzL+WrD1unw/3HdEl4xSLVe9z8ViaZNt73iDIUK0yXfEVFZCkAHQ6Wm+Iy0q8L1iqD4/6m+so75H5X4DMmjsBFXunKBSwIBiawOYdmHnzSfVn1ON+OtSzlQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAHXRa7f23ByKNmuwrAyIIT3lYnLcz51wr0YcU8pwiJyOibJPT6foYmmI1BD+hMx+sGXvKipiRTSYbp4j9ephC/W+DCj15NNBSL0HBXF2EZBxePBYLdpjAanXsKgKTRqnkjt4PKWhct8vAaur0+xLnh1huW3TnNQapxfsD6gTt5KHijCciXEqn8fj4jf6EOcMffm6demaaCHKQqev/MGYTEbOL25yGrgUrWVjUng6C9dxerMbq9RX2kGXkz4/GYYkWZ+j7L+nrCRxIAkKB5UfpaDD1jbU+Qo/+l4O0fCsZLSe6xhImjBLC63druIV6HLd8TnXoapYGVtLSrgUUBWi0Zw=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"e1cbe5a4bb12415e8923d2e870d99f9f"}, [
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
  'eastus',
  'x-ms-client-request-id',
  '8b6b3494-5517-4716-8e28-fe553e435e57',
  'x-ms-request-id',
  'df0ce07a-e642-4ab1-bb66-60ff13d0c529',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:44:10 GMT',
  'Content-Length',
  '1346'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistdeletedcertificatesbypage-0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificatesbypage-0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAop/a9ct2IeX7GI6Fq+61WvIDJC5V7yJHdgB1v0gTCm2t3nvHnxw+hCyaQypAtGcIOg5A7di6ltGXhqIzFjWXkzagNpUiQCV2D9hVx9u8yMz7LptGmoXsoukpTgHZchA//cuEFW86K+Sr4L5H27jAmCfsCsY9/XvfHoiniGham6T9c325ORpWC1GprKNhgpEzfqTnus2RkE4Hgu5Ry3ADBAOsyOwMCAKRzL+WrD1unw/3HdEl4xSLVe9z8ViaZNt73iDIUK0yXfEVFZCkAHQ6Wm+Iy0q8L1iqD4/6m+so75H5X4DMmjsBFXunKBSwIBiawOYdmHnzSfVn1ON+OtSzlQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAHXRa7f23ByKNmuwrAyIIT3lYnLcz51wr0YcU8pwiJyOibJPT6foYmmI1BD+hMx+sGXvKipiRTSYbp4j9ephC/W+DCj15NNBSL0HBXF2EZBxePBYLdpjAanXsKgKTRqnkjt4PKWhct8vAaur0+xLnh1huW3TnNQapxfsD6gTt5KHijCciXEqn8fj4jf6EOcMffm6demaaCHKQqev/MGYTEbOL25yGrgUrWVjUng6C9dxerMbq9RX2kGXkz4/GYYkWZ+j7L+nrCRxIAkKB5UfpaDD1jbU+Qo/+l4O0fCsZLSe6xhImjBLC63druIV6HLd8TnXoapYGVtLSrgUUBWi0Zw=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"e1cbe5a4bb12415e8923d2e870d99f9f"}, [
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
  'eastus',
  'x-ms-client-request-id',
  '333c12e4-d42d-4bef-b78a-e47b136dbd88',
  'x-ms-request-id',
  '23908b60-15cf-44fb-b6bd-53beb69a58e1',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:44:12 GMT',
  'Content-Length',
  '1346'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistdeletedcertificatesbypage-0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificatesbypage-0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAop/a9ct2IeX7GI6Fq+61WvIDJC5V7yJHdgB1v0gTCm2t3nvHnxw+hCyaQypAtGcIOg5A7di6ltGXhqIzFjWXkzagNpUiQCV2D9hVx9u8yMz7LptGmoXsoukpTgHZchA//cuEFW86K+Sr4L5H27jAmCfsCsY9/XvfHoiniGham6T9c325ORpWC1GprKNhgpEzfqTnus2RkE4Hgu5Ry3ADBAOsyOwMCAKRzL+WrD1unw/3HdEl4xSLVe9z8ViaZNt73iDIUK0yXfEVFZCkAHQ6Wm+Iy0q8L1iqD4/6m+so75H5X4DMmjsBFXunKBSwIBiawOYdmHnzSfVn1ON+OtSzlQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAHXRa7f23ByKNmuwrAyIIT3lYnLcz51wr0YcU8pwiJyOibJPT6foYmmI1BD+hMx+sGXvKipiRTSYbp4j9ephC/W+DCj15NNBSL0HBXF2EZBxePBYLdpjAanXsKgKTRqnkjt4PKWhct8vAaur0+xLnh1huW3TnNQapxfsD6gTt5KHijCciXEqn8fj4jf6EOcMffm6demaaCHKQqev/MGYTEbOL25yGrgUrWVjUng6C9dxerMbq9RX2kGXkz4/GYYkWZ+j7L+nrCRxIAkKB5UfpaDD1jbU+Qo/+l4O0fCsZLSe6xhImjBLC63druIV6HLd8TnXoapYGVtLSrgUUBWi0Zw=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"e1cbe5a4bb12415e8923d2e870d99f9f"}, [
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
  'eastus',
  'x-ms-client-request-id',
  '69f7e929-0dc6-48c7-bf1a-d29975b5864d',
  'x-ms-request-id',
  'c132a6e5-0b52-44b7-971b-9e6336ea1764',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:44:15 GMT',
  'Content-Length',
  '1346'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistdeletedcertificatesbypage-0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificatesbypage-0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAop/a9ct2IeX7GI6Fq+61WvIDJC5V7yJHdgB1v0gTCm2t3nvHnxw+hCyaQypAtGcIOg5A7di6ltGXhqIzFjWXkzagNpUiQCV2D9hVx9u8yMz7LptGmoXsoukpTgHZchA//cuEFW86K+Sr4L5H27jAmCfsCsY9/XvfHoiniGham6T9c325ORpWC1GprKNhgpEzfqTnus2RkE4Hgu5Ry3ADBAOsyOwMCAKRzL+WrD1unw/3HdEl4xSLVe9z8ViaZNt73iDIUK0yXfEVFZCkAHQ6Wm+Iy0q8L1iqD4/6m+so75H5X4DMmjsBFXunKBSwIBiawOYdmHnzSfVn1ON+OtSzlQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAHXRa7f23ByKNmuwrAyIIT3lYnLcz51wr0YcU8pwiJyOibJPT6foYmmI1BD+hMx+sGXvKipiRTSYbp4j9ephC/W+DCj15NNBSL0HBXF2EZBxePBYLdpjAanXsKgKTRqnkjt4PKWhct8vAaur0+xLnh1huW3TnNQapxfsD6gTt5KHijCciXEqn8fj4jf6EOcMffm6demaaCHKQqev/MGYTEbOL25yGrgUrWVjUng6C9dxerMbq9RX2kGXkz4/GYYkWZ+j7L+nrCRxIAkKB5UfpaDD1jbU+Qo/+l4O0fCsZLSe6xhImjBLC63druIV6HLd8TnXoapYGVtLSrgUUBWi0Zw=","cancellation_requested":false,"status":"completed","target":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificatesbypage-0","request_id":"e1cbe5a4bb12415e8923d2e870d99f9f"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '3881dd32-5035-45ec-a27e-52f845a661e0',
  'x-ms-request-id',
  'bd654901-de8b-4c93-85d2-4c42ca4e1005',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:44:17 GMT',
  'Content-Length',
  '1319'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistdeletedcertificatesbypage-0/')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificatesbypage-0/ad32fa5a88e54ee6889add26a761aa06","kid":"https://keyvault_name.vault.azure.net/keys/listCertificateName-canlistdeletedcertificatesbypage-0/ad32fa5a88e54ee6889add26a761aa06","sid":"https://keyvault_name.vault.azure.net/secrets/listCertificateName-canlistdeletedcertificatesbypage-0/ad32fa5a88e54ee6889add26a761aa06","x5t":"VxKvuifqKx5xk4Z_tR5L4yqmsMI","cer":"MIIDKDCCAhCgAwIBAgIQHzOhrvUKRQygiEgJpcmi3jANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjEwNDI4MjIzNDE1WhcNMjIwNDI4MjI0NDE1WjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQCin9r1y3Yh5fsYjoWr7rVa8gMkLlXvIkd2AHW/SBMKba3ee8efHD6ELJpDKkC0Zwg6DkDt2LqW0ZeGojMWNZeTNqA2lSJAJXYP2FXH27zIzPsum0aaheyi6SlOAdlyED/9y4QVbzor5KvgvkfbuMCYJ+wKxj39e98eiKeIaFqbpP1zfbk5GlYLUamso2GCkTN+pOe6zZGQTgeC7lHLcAMEA6zI7AwIApHMv5asPW6fD/cd0SXjFItV73PxWJpk23veIMhQrTJd8RUVkKQAdDpab4jLSrwvWKoPj/qb6yjvkflfgMyaOwEVe6coFLAgGJrA5h2YefNJ9WfU43461LOVAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBRXCxtPSmnR648StPJkpmi2rLP3rzAdBgNVHQ4EFgQUVwsbT0pp0euPErTyZKZotqyz968wDQYJKoZIhvcNAQELBQADggEBAJi80OPiN6GaqPGK9F6Rxoq8iuD8rjWcdMLaIqek4ni2fQgRz9Pv3JNfzUK4tngxx7xJKwUkKdRUaNqxpmOZh2A5NuTUClEEvoXtGVX4n9HpL+ueglM+mAuMzOl/a7pkPbq4ePdqkQIFqDJ0K7cxSJUkqSGBudZ9NwZTvFZcSnUC4S7m9EHbynfdf1fgUfOPIryP51btjELgJVVXYQm2YUFa6iNub/uCXoDl13RvCGmEOIcxzWSgeVdArRQWsDbVQEwPT61iVqk0lx9dO/5EOPnCX9C9Bvg3XpMvHW9rxyIBpKz5lvswgZFXu6aWzW1356pkXmpcInn2iN3dbSNUDuI=","attributes":{"enabled":true,"nbf":1619649255,"exp":1651185855,"created":1619649855,"updated":1619649855,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificatesbypage-0/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1619649771,"updated":1619649771}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificatesbypage-0/pending"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '63fcfe1a-0f40-4fbd-b705-08b4f682a9c5',
  'x-ms-request-id',
  'fc837dff-726f-4928-8223-101b64a3f391',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:44:17 GMT',
  'Content-Length',
  '2620'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/certificates/listCertificateName-canlistdeletedcertificatesbypage-1/create', {"policy":{"key_props":{},"secret_props":{},"x509_props":{"subject":"cn=MyCert","sans":{}},"issuer":{"name":"Self"},"attributes":{}},"attributes":{}})
  .query(true)
  .reply(202, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificatesbypage-1/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAwjvAuw97b0N5YqDy1r5oni95p2UCcKjraa2IHZ9Jhq3pwarxAivzNrY+pSZ+MGS1Yzdeyqetr/Ge//U9JGIcaA+7ujt0A4FRSt0Jih3ceavB0vChEQKefGldMKxzT+J3Vc4lFBKJnkHMdEELVOzOaMMgXPjy5fF61Fqs5cVDF+gMjGhxFPldc3aytX3AceEPbNT6s3HnMT0wogIV3OiHpNNZRhjF/iy7Y6Drewq26OjuKGPJE3K+44OwBxO0XZ7wZHF6k7q3j9aWsV7u+S0+3Vl7akNSnKzSOq5CFB0fuQ81wHmMjBUKl7XG470n2yQ0L3n1L7vRGRrIRCYU+LSrkQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAGI1nansusgmS0xfzlJYXtZHBzBZZFq9Wy6xMkuA20JTIg42YxXPmYadPPvZX26CPWdBu3xqjQlKDY7ZMXvdzsUY2/0GVeMSJOFM5o02hUDsZVnyBfzp7XeiP+65bc710dGNJl3Hpdsf8JN4fs1UFok9snT3DWZPRgiPpaSDYlxVYFFOdD+ksu3El1URuNvB6eC0M8AaeQ9M60+YxxhcOma7c1wRVdgNKpxYz46MruUS6KXx1GzS9y/OKFnMrTrfBRdp/rPgb6LCNbObGtYrxxat7Hud4n770vDFXWm5TlnWK/Nr2C/A3i1gyK5EDC7ABsE/XsscS58ORKzOSTHeRD4=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"3fd374b5e9e34061a41eaf5b93ff848d"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificatesbypage-1/pending?api-version=7.2&request_id=3fd374b5e9e34061a41eaf5b93ff848d',
  'Retry-After',
  '0',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '50b580b0-361d-4a8b-accb-9c7e18a6e524',
  'x-ms-request-id',
  '06397e21-e29d-40d5-a0df-6a198c26f812',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:44:18 GMT',
  'Content-Length',
  '1346'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistdeletedcertificatesbypage-1/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificatesbypage-1/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAwjvAuw97b0N5YqDy1r5oni95p2UCcKjraa2IHZ9Jhq3pwarxAivzNrY+pSZ+MGS1Yzdeyqetr/Ge//U9JGIcaA+7ujt0A4FRSt0Jih3ceavB0vChEQKefGldMKxzT+J3Vc4lFBKJnkHMdEELVOzOaMMgXPjy5fF61Fqs5cVDF+gMjGhxFPldc3aytX3AceEPbNT6s3HnMT0wogIV3OiHpNNZRhjF/iy7Y6Drewq26OjuKGPJE3K+44OwBxO0XZ7wZHF6k7q3j9aWsV7u+S0+3Vl7akNSnKzSOq5CFB0fuQ81wHmMjBUKl7XG470n2yQ0L3n1L7vRGRrIRCYU+LSrkQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAGI1nansusgmS0xfzlJYXtZHBzBZZFq9Wy6xMkuA20JTIg42YxXPmYadPPvZX26CPWdBu3xqjQlKDY7ZMXvdzsUY2/0GVeMSJOFM5o02hUDsZVnyBfzp7XeiP+65bc710dGNJl3Hpdsf8JN4fs1UFok9snT3DWZPRgiPpaSDYlxVYFFOdD+ksu3El1URuNvB6eC0M8AaeQ9M60+YxxhcOma7c1wRVdgNKpxYz46MruUS6KXx1GzS9y/OKFnMrTrfBRdp/rPgb6LCNbObGtYrxxat7Hud4n770vDFXWm5TlnWK/Nr2C/A3i1gyK5EDC7ABsE/XsscS58ORKzOSTHeRD4=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"3fd374b5e9e34061a41eaf5b93ff848d"}, [
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
  'eastus',
  'x-ms-client-request-id',
  '8cfd7601-f0b7-4df3-847d-c7faff60911e',
  'x-ms-request-id',
  '8b23e01a-9a4b-43e8-b6fa-587b542dc471',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:44:18 GMT',
  'Content-Length',
  '1346'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistdeletedcertificatesbypage-1/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificatesbypage-1/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAwjvAuw97b0N5YqDy1r5oni95p2UCcKjraa2IHZ9Jhq3pwarxAivzNrY+pSZ+MGS1Yzdeyqetr/Ge//U9JGIcaA+7ujt0A4FRSt0Jih3ceavB0vChEQKefGldMKxzT+J3Vc4lFBKJnkHMdEELVOzOaMMgXPjy5fF61Fqs5cVDF+gMjGhxFPldc3aytX3AceEPbNT6s3HnMT0wogIV3OiHpNNZRhjF/iy7Y6Drewq26OjuKGPJE3K+44OwBxO0XZ7wZHF6k7q3j9aWsV7u+S0+3Vl7akNSnKzSOq5CFB0fuQ81wHmMjBUKl7XG470n2yQ0L3n1L7vRGRrIRCYU+LSrkQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAGI1nansusgmS0xfzlJYXtZHBzBZZFq9Wy6xMkuA20JTIg42YxXPmYadPPvZX26CPWdBu3xqjQlKDY7ZMXvdzsUY2/0GVeMSJOFM5o02hUDsZVnyBfzp7XeiP+65bc710dGNJl3Hpdsf8JN4fs1UFok9snT3DWZPRgiPpaSDYlxVYFFOdD+ksu3El1URuNvB6eC0M8AaeQ9M60+YxxhcOma7c1wRVdgNKpxYz46MruUS6KXx1GzS9y/OKFnMrTrfBRdp/rPgb6LCNbObGtYrxxat7Hud4n770vDFXWm5TlnWK/Nr2C/A3i1gyK5EDC7ABsE/XsscS58ORKzOSTHeRD4=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"3fd374b5e9e34061a41eaf5b93ff848d"}, [
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
  'eastus',
  'x-ms-client-request-id',
  '9d8d81a4-862d-476e-829b-57df1929fb5a',
  'x-ms-request-id',
  '9149b3cb-a277-4e9f-b866-8cf2de2506f5',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:44:18 GMT',
  'Content-Length',
  '1346'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistdeletedcertificatesbypage-1/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificatesbypage-1/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAwjvAuw97b0N5YqDy1r5oni95p2UCcKjraa2IHZ9Jhq3pwarxAivzNrY+pSZ+MGS1Yzdeyqetr/Ge//U9JGIcaA+7ujt0A4FRSt0Jih3ceavB0vChEQKefGldMKxzT+J3Vc4lFBKJnkHMdEELVOzOaMMgXPjy5fF61Fqs5cVDF+gMjGhxFPldc3aytX3AceEPbNT6s3HnMT0wogIV3OiHpNNZRhjF/iy7Y6Drewq26OjuKGPJE3K+44OwBxO0XZ7wZHF6k7q3j9aWsV7u+S0+3Vl7akNSnKzSOq5CFB0fuQ81wHmMjBUKl7XG470n2yQ0L3n1L7vRGRrIRCYU+LSrkQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAGI1nansusgmS0xfzlJYXtZHBzBZZFq9Wy6xMkuA20JTIg42YxXPmYadPPvZX26CPWdBu3xqjQlKDY7ZMXvdzsUY2/0GVeMSJOFM5o02hUDsZVnyBfzp7XeiP+65bc710dGNJl3Hpdsf8JN4fs1UFok9snT3DWZPRgiPpaSDYlxVYFFOdD+ksu3El1URuNvB6eC0M8AaeQ9M60+YxxhcOma7c1wRVdgNKpxYz46MruUS6KXx1GzS9y/OKFnMrTrfBRdp/rPgb6LCNbObGtYrxxat7Hud4n770vDFXWm5TlnWK/Nr2C/A3i1gyK5EDC7ABsE/XsscS58ORKzOSTHeRD4=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"3fd374b5e9e34061a41eaf5b93ff848d"}, [
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
  'eastus',
  'x-ms-client-request-id',
  'b678fb60-1df3-4aef-884a-99cb64e54af9',
  'x-ms-request-id',
  '191f8910-2636-4a0a-abbf-94808f40c89d',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:44:20 GMT',
  'Content-Length',
  '1346'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistdeletedcertificatesbypage-1/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificatesbypage-1/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAwjvAuw97b0N5YqDy1r5oni95p2UCcKjraa2IHZ9Jhq3pwarxAivzNrY+pSZ+MGS1Yzdeyqetr/Ge//U9JGIcaA+7ujt0A4FRSt0Jih3ceavB0vChEQKefGldMKxzT+J3Vc4lFBKJnkHMdEELVOzOaMMgXPjy5fF61Fqs5cVDF+gMjGhxFPldc3aytX3AceEPbNT6s3HnMT0wogIV3OiHpNNZRhjF/iy7Y6Drewq26OjuKGPJE3K+44OwBxO0XZ7wZHF6k7q3j9aWsV7u+S0+3Vl7akNSnKzSOq5CFB0fuQ81wHmMjBUKl7XG470n2yQ0L3n1L7vRGRrIRCYU+LSrkQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAGI1nansusgmS0xfzlJYXtZHBzBZZFq9Wy6xMkuA20JTIg42YxXPmYadPPvZX26CPWdBu3xqjQlKDY7ZMXvdzsUY2/0GVeMSJOFM5o02hUDsZVnyBfzp7XeiP+65bc710dGNJl3Hpdsf8JN4fs1UFok9snT3DWZPRgiPpaSDYlxVYFFOdD+ksu3El1URuNvB6eC0M8AaeQ9M60+YxxhcOma7c1wRVdgNKpxYz46MruUS6KXx1GzS9y/OKFnMrTrfBRdp/rPgb6LCNbObGtYrxxat7Hud4n770vDFXWm5TlnWK/Nr2C/A3i1gyK5EDC7ABsE/XsscS58ORKzOSTHeRD4=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"3fd374b5e9e34061a41eaf5b93ff848d"}, [
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
  'eastus',
  'x-ms-client-request-id',
  '7948f4c8-6d5c-426a-8493-3ec218ce261a',
  'x-ms-request-id',
  '741e1e75-2a89-4ddb-9a82-c0776af4d359',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:44:23 GMT',
  'Content-Length',
  '1346'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistdeletedcertificatesbypage-1/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificatesbypage-1/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAwjvAuw97b0N5YqDy1r5oni95p2UCcKjraa2IHZ9Jhq3pwarxAivzNrY+pSZ+MGS1Yzdeyqetr/Ge//U9JGIcaA+7ujt0A4FRSt0Jih3ceavB0vChEQKefGldMKxzT+J3Vc4lFBKJnkHMdEELVOzOaMMgXPjy5fF61Fqs5cVDF+gMjGhxFPldc3aytX3AceEPbNT6s3HnMT0wogIV3OiHpNNZRhjF/iy7Y6Drewq26OjuKGPJE3K+44OwBxO0XZ7wZHF6k7q3j9aWsV7u+S0+3Vl7akNSnKzSOq5CFB0fuQ81wHmMjBUKl7XG470n2yQ0L3n1L7vRGRrIRCYU+LSrkQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAGI1nansusgmS0xfzlJYXtZHBzBZZFq9Wy6xMkuA20JTIg42YxXPmYadPPvZX26CPWdBu3xqjQlKDY7ZMXvdzsUY2/0GVeMSJOFM5o02hUDsZVnyBfzp7XeiP+65bc710dGNJl3Hpdsf8JN4fs1UFok9snT3DWZPRgiPpaSDYlxVYFFOdD+ksu3El1URuNvB6eC0M8AaeQ9M60+YxxhcOma7c1wRVdgNKpxYz46MruUS6KXx1GzS9y/OKFnMrTrfBRdp/rPgb6LCNbObGtYrxxat7Hud4n770vDFXWm5TlnWK/Nr2C/A3i1gyK5EDC7ABsE/XsscS58ORKzOSTHeRD4=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"3fd374b5e9e34061a41eaf5b93ff848d"}, [
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
  'eastus',
  'x-ms-client-request-id',
  'cc14b91d-06bb-49df-8f22-b2756fed0874',
  'x-ms-request-id',
  'fe2b4bc2-f219-4db5-9968-3528db72dbff',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:44:25 GMT',
  'Content-Length',
  '1346'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistdeletedcertificatesbypage-1/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificatesbypage-1/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAwjvAuw97b0N5YqDy1r5oni95p2UCcKjraa2IHZ9Jhq3pwarxAivzNrY+pSZ+MGS1Yzdeyqetr/Ge//U9JGIcaA+7ujt0A4FRSt0Jih3ceavB0vChEQKefGldMKxzT+J3Vc4lFBKJnkHMdEELVOzOaMMgXPjy5fF61Fqs5cVDF+gMjGhxFPldc3aytX3AceEPbNT6s3HnMT0wogIV3OiHpNNZRhjF/iy7Y6Drewq26OjuKGPJE3K+44OwBxO0XZ7wZHF6k7q3j9aWsV7u+S0+3Vl7akNSnKzSOq5CFB0fuQ81wHmMjBUKl7XG470n2yQ0L3n1L7vRGRrIRCYU+LSrkQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAGI1nansusgmS0xfzlJYXtZHBzBZZFq9Wy6xMkuA20JTIg42YxXPmYadPPvZX26CPWdBu3xqjQlKDY7ZMXvdzsUY2/0GVeMSJOFM5o02hUDsZVnyBfzp7XeiP+65bc710dGNJl3Hpdsf8JN4fs1UFok9snT3DWZPRgiPpaSDYlxVYFFOdD+ksu3El1URuNvB6eC0M8AaeQ9M60+YxxhcOma7c1wRVdgNKpxYz46MruUS6KXx1GzS9y/OKFnMrTrfBRdp/rPgb6LCNbObGtYrxxat7Hud4n770vDFXWm5TlnWK/Nr2C/A3i1gyK5EDC7ABsE/XsscS58ORKzOSTHeRD4=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"3fd374b5e9e34061a41eaf5b93ff848d"}, [
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
  'eastus',
  'x-ms-client-request-id',
  '50bfef7c-fa27-445e-bc98-e84f3fd29e37',
  'x-ms-request-id',
  '114fc5b9-33eb-43f5-9b3f-e4260bb00a90',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:44:26 GMT',
  'Content-Length',
  '1346'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistdeletedcertificatesbypage-1/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificatesbypage-1/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAwjvAuw97b0N5YqDy1r5oni95p2UCcKjraa2IHZ9Jhq3pwarxAivzNrY+pSZ+MGS1Yzdeyqetr/Ge//U9JGIcaA+7ujt0A4FRSt0Jih3ceavB0vChEQKefGldMKxzT+J3Vc4lFBKJnkHMdEELVOzOaMMgXPjy5fF61Fqs5cVDF+gMjGhxFPldc3aytX3AceEPbNT6s3HnMT0wogIV3OiHpNNZRhjF/iy7Y6Drewq26OjuKGPJE3K+44OwBxO0XZ7wZHF6k7q3j9aWsV7u+S0+3Vl7akNSnKzSOq5CFB0fuQ81wHmMjBUKl7XG470n2yQ0L3n1L7vRGRrIRCYU+LSrkQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAGI1nansusgmS0xfzlJYXtZHBzBZZFq9Wy6xMkuA20JTIg42YxXPmYadPPvZX26CPWdBu3xqjQlKDY7ZMXvdzsUY2/0GVeMSJOFM5o02hUDsZVnyBfzp7XeiP+65bc710dGNJl3Hpdsf8JN4fs1UFok9snT3DWZPRgiPpaSDYlxVYFFOdD+ksu3El1URuNvB6eC0M8AaeQ9M60+YxxhcOma7c1wRVdgNKpxYz46MruUS6KXx1GzS9y/OKFnMrTrfBRdp/rPgb6LCNbObGtYrxxat7Hud4n770vDFXWm5TlnWK/Nr2C/A3i1gyK5EDC7ABsE/XsscS58ORKzOSTHeRD4=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"3fd374b5e9e34061a41eaf5b93ff848d"}, [
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
  'eastus',
  'x-ms-client-request-id',
  '2fe8bfbd-7a84-4a39-a737-1680a89b144b',
  'x-ms-request-id',
  'ea5d8fd5-da72-4d87-8ec7-1b7e594b82da',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:44:28 GMT',
  'Content-Length',
  '1346'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistdeletedcertificatesbypage-1/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificatesbypage-1/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAwjvAuw97b0N5YqDy1r5oni95p2UCcKjraa2IHZ9Jhq3pwarxAivzNrY+pSZ+MGS1Yzdeyqetr/Ge//U9JGIcaA+7ujt0A4FRSt0Jih3ceavB0vChEQKefGldMKxzT+J3Vc4lFBKJnkHMdEELVOzOaMMgXPjy5fF61Fqs5cVDF+gMjGhxFPldc3aytX3AceEPbNT6s3HnMT0wogIV3OiHpNNZRhjF/iy7Y6Drewq26OjuKGPJE3K+44OwBxO0XZ7wZHF6k7q3j9aWsV7u+S0+3Vl7akNSnKzSOq5CFB0fuQ81wHmMjBUKl7XG470n2yQ0L3n1L7vRGRrIRCYU+LSrkQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAGI1nansusgmS0xfzlJYXtZHBzBZZFq9Wy6xMkuA20JTIg42YxXPmYadPPvZX26CPWdBu3xqjQlKDY7ZMXvdzsUY2/0GVeMSJOFM5o02hUDsZVnyBfzp7XeiP+65bc710dGNJl3Hpdsf8JN4fs1UFok9snT3DWZPRgiPpaSDYlxVYFFOdD+ksu3El1URuNvB6eC0M8AaeQ9M60+YxxhcOma7c1wRVdgNKpxYz46MruUS6KXx1GzS9y/OKFnMrTrfBRdp/rPgb6LCNbObGtYrxxat7Hud4n770vDFXWm5TlnWK/Nr2C/A3i1gyK5EDC7ABsE/XsscS58ORKzOSTHeRD4=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"3fd374b5e9e34061a41eaf5b93ff848d"}, [
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
  'eastus',
  'x-ms-client-request-id',
  '961f9d27-fba4-43f9-9cc7-e61c7b04adca',
  'x-ms-request-id',
  '2a42a5e3-3175-4222-a368-0f98cf352c8d',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:44:30 GMT',
  'Content-Length',
  '1346'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistdeletedcertificatesbypage-1/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificatesbypage-1/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAwjvAuw97b0N5YqDy1r5oni95p2UCcKjraa2IHZ9Jhq3pwarxAivzNrY+pSZ+MGS1Yzdeyqetr/Ge//U9JGIcaA+7ujt0A4FRSt0Jih3ceavB0vChEQKefGldMKxzT+J3Vc4lFBKJnkHMdEELVOzOaMMgXPjy5fF61Fqs5cVDF+gMjGhxFPldc3aytX3AceEPbNT6s3HnMT0wogIV3OiHpNNZRhjF/iy7Y6Drewq26OjuKGPJE3K+44OwBxO0XZ7wZHF6k7q3j9aWsV7u+S0+3Vl7akNSnKzSOq5CFB0fuQ81wHmMjBUKl7XG470n2yQ0L3n1L7vRGRrIRCYU+LSrkQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAGI1nansusgmS0xfzlJYXtZHBzBZZFq9Wy6xMkuA20JTIg42YxXPmYadPPvZX26CPWdBu3xqjQlKDY7ZMXvdzsUY2/0GVeMSJOFM5o02hUDsZVnyBfzp7XeiP+65bc710dGNJl3Hpdsf8JN4fs1UFok9snT3DWZPRgiPpaSDYlxVYFFOdD+ksu3El1URuNvB6eC0M8AaeQ9M60+YxxhcOma7c1wRVdgNKpxYz46MruUS6KXx1GzS9y/OKFnMrTrfBRdp/rPgb6LCNbObGtYrxxat7Hud4n770vDFXWm5TlnWK/Nr2C/A3i1gyK5EDC7ABsE/XsscS58ORKzOSTHeRD4=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"3fd374b5e9e34061a41eaf5b93ff848d"}, [
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
  'eastus',
  'x-ms-client-request-id',
  'cadb746b-3f9a-44b0-a2b3-9f36e1adaf0d',
  'x-ms-request-id',
  '128063ed-ba90-4d9e-a69a-df7ecab92434',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:44:32 GMT',
  'Content-Length',
  '1346'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistdeletedcertificatesbypage-1/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificatesbypage-1/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAwjvAuw97b0N5YqDy1r5oni95p2UCcKjraa2IHZ9Jhq3pwarxAivzNrY+pSZ+MGS1Yzdeyqetr/Ge//U9JGIcaA+7ujt0A4FRSt0Jih3ceavB0vChEQKefGldMKxzT+J3Vc4lFBKJnkHMdEELVOzOaMMgXPjy5fF61Fqs5cVDF+gMjGhxFPldc3aytX3AceEPbNT6s3HnMT0wogIV3OiHpNNZRhjF/iy7Y6Drewq26OjuKGPJE3K+44OwBxO0XZ7wZHF6k7q3j9aWsV7u+S0+3Vl7akNSnKzSOq5CFB0fuQ81wHmMjBUKl7XG470n2yQ0L3n1L7vRGRrIRCYU+LSrkQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAGI1nansusgmS0xfzlJYXtZHBzBZZFq9Wy6xMkuA20JTIg42YxXPmYadPPvZX26CPWdBu3xqjQlKDY7ZMXvdzsUY2/0GVeMSJOFM5o02hUDsZVnyBfzp7XeiP+65bc710dGNJl3Hpdsf8JN4fs1UFok9snT3DWZPRgiPpaSDYlxVYFFOdD+ksu3El1URuNvB6eC0M8AaeQ9M60+YxxhcOma7c1wRVdgNKpxYz46MruUS6KXx1GzS9y/OKFnMrTrfBRdp/rPgb6LCNbObGtYrxxat7Hud4n770vDFXWm5TlnWK/Nr2C/A3i1gyK5EDC7ABsE/XsscS58ORKzOSTHeRD4=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"3fd374b5e9e34061a41eaf5b93ff848d"}, [
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
  'eastus',
  'x-ms-client-request-id',
  '7611b3e9-1fe2-4d7f-beb8-c300d0e813e2',
  'x-ms-request-id',
  '6630a184-de0c-4ce7-9da6-f192d1c78c6c',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:44:35 GMT',
  'Content-Length',
  '1346'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistdeletedcertificatesbypage-1/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificatesbypage-1/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAwjvAuw97b0N5YqDy1r5oni95p2UCcKjraa2IHZ9Jhq3pwarxAivzNrY+pSZ+MGS1Yzdeyqetr/Ge//U9JGIcaA+7ujt0A4FRSt0Jih3ceavB0vChEQKefGldMKxzT+J3Vc4lFBKJnkHMdEELVOzOaMMgXPjy5fF61Fqs5cVDF+gMjGhxFPldc3aytX3AceEPbNT6s3HnMT0wogIV3OiHpNNZRhjF/iy7Y6Drewq26OjuKGPJE3K+44OwBxO0XZ7wZHF6k7q3j9aWsV7u+S0+3Vl7akNSnKzSOq5CFB0fuQ81wHmMjBUKl7XG470n2yQ0L3n1L7vRGRrIRCYU+LSrkQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAGI1nansusgmS0xfzlJYXtZHBzBZZFq9Wy6xMkuA20JTIg42YxXPmYadPPvZX26CPWdBu3xqjQlKDY7ZMXvdzsUY2/0GVeMSJOFM5o02hUDsZVnyBfzp7XeiP+65bc710dGNJl3Hpdsf8JN4fs1UFok9snT3DWZPRgiPpaSDYlxVYFFOdD+ksu3El1URuNvB6eC0M8AaeQ9M60+YxxhcOma7c1wRVdgNKpxYz46MruUS6KXx1GzS9y/OKFnMrTrfBRdp/rPgb6LCNbObGtYrxxat7Hud4n770vDFXWm5TlnWK/Nr2C/A3i1gyK5EDC7ABsE/XsscS58ORKzOSTHeRD4=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"3fd374b5e9e34061a41eaf5b93ff848d"}, [
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
  'eastus',
  'x-ms-client-request-id',
  '03808ba8-2406-4d95-bc9a-1a51a00d58c0',
  'x-ms-request-id',
  '5fbcb1e0-5216-4d1c-ae01-c88b9fcd7238',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:44:37 GMT',
  'Content-Length',
  '1346'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistdeletedcertificatesbypage-1/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificatesbypage-1/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAwjvAuw97b0N5YqDy1r5oni95p2UCcKjraa2IHZ9Jhq3pwarxAivzNrY+pSZ+MGS1Yzdeyqetr/Ge//U9JGIcaA+7ujt0A4FRSt0Jih3ceavB0vChEQKefGldMKxzT+J3Vc4lFBKJnkHMdEELVOzOaMMgXPjy5fF61Fqs5cVDF+gMjGhxFPldc3aytX3AceEPbNT6s3HnMT0wogIV3OiHpNNZRhjF/iy7Y6Drewq26OjuKGPJE3K+44OwBxO0XZ7wZHF6k7q3j9aWsV7u+S0+3Vl7akNSnKzSOq5CFB0fuQ81wHmMjBUKl7XG470n2yQ0L3n1L7vRGRrIRCYU+LSrkQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAGI1nansusgmS0xfzlJYXtZHBzBZZFq9Wy6xMkuA20JTIg42YxXPmYadPPvZX26CPWdBu3xqjQlKDY7ZMXvdzsUY2/0GVeMSJOFM5o02hUDsZVnyBfzp7XeiP+65bc710dGNJl3Hpdsf8JN4fs1UFok9snT3DWZPRgiPpaSDYlxVYFFOdD+ksu3El1URuNvB6eC0M8AaeQ9M60+YxxhcOma7c1wRVdgNKpxYz46MruUS6KXx1GzS9y/OKFnMrTrfBRdp/rPgb6LCNbObGtYrxxat7Hud4n770vDFXWm5TlnWK/Nr2C/A3i1gyK5EDC7ABsE/XsscS58ORKzOSTHeRD4=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"3fd374b5e9e34061a41eaf5b93ff848d"}, [
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
  'eastus',
  'x-ms-client-request-id',
  '1ec8c3aa-32c9-4163-b47d-65ad6fd7b173',
  'x-ms-request-id',
  '8cc3b6bc-f6a8-43b8-9530-1e493f940d89',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:44:39 GMT',
  'Content-Length',
  '1346'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistdeletedcertificatesbypage-1/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificatesbypage-1/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAwjvAuw97b0N5YqDy1r5oni95p2UCcKjraa2IHZ9Jhq3pwarxAivzNrY+pSZ+MGS1Yzdeyqetr/Ge//U9JGIcaA+7ujt0A4FRSt0Jih3ceavB0vChEQKefGldMKxzT+J3Vc4lFBKJnkHMdEELVOzOaMMgXPjy5fF61Fqs5cVDF+gMjGhxFPldc3aytX3AceEPbNT6s3HnMT0wogIV3OiHpNNZRhjF/iy7Y6Drewq26OjuKGPJE3K+44OwBxO0XZ7wZHF6k7q3j9aWsV7u+S0+3Vl7akNSnKzSOq5CFB0fuQ81wHmMjBUKl7XG470n2yQ0L3n1L7vRGRrIRCYU+LSrkQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAGI1nansusgmS0xfzlJYXtZHBzBZZFq9Wy6xMkuA20JTIg42YxXPmYadPPvZX26CPWdBu3xqjQlKDY7ZMXvdzsUY2/0GVeMSJOFM5o02hUDsZVnyBfzp7XeiP+65bc710dGNJl3Hpdsf8JN4fs1UFok9snT3DWZPRgiPpaSDYlxVYFFOdD+ksu3El1URuNvB6eC0M8AaeQ9M60+YxxhcOma7c1wRVdgNKpxYz46MruUS6KXx1GzS9y/OKFnMrTrfBRdp/rPgb6LCNbObGtYrxxat7Hud4n770vDFXWm5TlnWK/Nr2C/A3i1gyK5EDC7ABsE/XsscS58ORKzOSTHeRD4=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"3fd374b5e9e34061a41eaf5b93ff848d"}, [
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
  'eastus',
  'x-ms-client-request-id',
  'a03eba28-4d2b-4dd5-a9a4-cb3d5bef931f',
  'x-ms-request-id',
  '3f48b4c7-5c4c-483a-89c2-2481d0d7ac22',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:44:41 GMT',
  'Content-Length',
  '1346'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistdeletedcertificatesbypage-1/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificatesbypage-1/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAwjvAuw97b0N5YqDy1r5oni95p2UCcKjraa2IHZ9Jhq3pwarxAivzNrY+pSZ+MGS1Yzdeyqetr/Ge//U9JGIcaA+7ujt0A4FRSt0Jih3ceavB0vChEQKefGldMKxzT+J3Vc4lFBKJnkHMdEELVOzOaMMgXPjy5fF61Fqs5cVDF+gMjGhxFPldc3aytX3AceEPbNT6s3HnMT0wogIV3OiHpNNZRhjF/iy7Y6Drewq26OjuKGPJE3K+44OwBxO0XZ7wZHF6k7q3j9aWsV7u+S0+3Vl7akNSnKzSOq5CFB0fuQ81wHmMjBUKl7XG470n2yQ0L3n1L7vRGRrIRCYU+LSrkQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAGI1nansusgmS0xfzlJYXtZHBzBZZFq9Wy6xMkuA20JTIg42YxXPmYadPPvZX26CPWdBu3xqjQlKDY7ZMXvdzsUY2/0GVeMSJOFM5o02hUDsZVnyBfzp7XeiP+65bc710dGNJl3Hpdsf8JN4fs1UFok9snT3DWZPRgiPpaSDYlxVYFFOdD+ksu3El1URuNvB6eC0M8AaeQ9M60+YxxhcOma7c1wRVdgNKpxYz46MruUS6KXx1GzS9y/OKFnMrTrfBRdp/rPgb6LCNbObGtYrxxat7Hud4n770vDFXWm5TlnWK/Nr2C/A3i1gyK5EDC7ABsE/XsscS58ORKzOSTHeRD4=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"3fd374b5e9e34061a41eaf5b93ff848d"}, [
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
  'eastus',
  'x-ms-client-request-id',
  '01f631f5-1663-45ae-af3a-3321f8df8ddf',
  'x-ms-request-id',
  'b6825f69-98ec-44b0-ade6-aac2210d43ea',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:44:43 GMT',
  'Content-Length',
  '1346'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistdeletedcertificatesbypage-1/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificatesbypage-1/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAwjvAuw97b0N5YqDy1r5oni95p2UCcKjraa2IHZ9Jhq3pwarxAivzNrY+pSZ+MGS1Yzdeyqetr/Ge//U9JGIcaA+7ujt0A4FRSt0Jih3ceavB0vChEQKefGldMKxzT+J3Vc4lFBKJnkHMdEELVOzOaMMgXPjy5fF61Fqs5cVDF+gMjGhxFPldc3aytX3AceEPbNT6s3HnMT0wogIV3OiHpNNZRhjF/iy7Y6Drewq26OjuKGPJE3K+44OwBxO0XZ7wZHF6k7q3j9aWsV7u+S0+3Vl7akNSnKzSOq5CFB0fuQ81wHmMjBUKl7XG470n2yQ0L3n1L7vRGRrIRCYU+LSrkQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAGI1nansusgmS0xfzlJYXtZHBzBZZFq9Wy6xMkuA20JTIg42YxXPmYadPPvZX26CPWdBu3xqjQlKDY7ZMXvdzsUY2/0GVeMSJOFM5o02hUDsZVnyBfzp7XeiP+65bc710dGNJl3Hpdsf8JN4fs1UFok9snT3DWZPRgiPpaSDYlxVYFFOdD+ksu3El1URuNvB6eC0M8AaeQ9M60+YxxhcOma7c1wRVdgNKpxYz46MruUS6KXx1GzS9y/OKFnMrTrfBRdp/rPgb6LCNbObGtYrxxat7Hud4n770vDFXWm5TlnWK/Nr2C/A3i1gyK5EDC7ABsE/XsscS58ORKzOSTHeRD4=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"3fd374b5e9e34061a41eaf5b93ff848d"}, [
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
  'eastus',
  'x-ms-client-request-id',
  '68f220ef-114b-4921-bd13-d504474a9589',
  'x-ms-request-id',
  '98874d63-943e-42a8-a212-71f34d2bc933',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:44:46 GMT',
  'Content-Length',
  '1346'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistdeletedcertificatesbypage-1/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificatesbypage-1/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAwjvAuw97b0N5YqDy1r5oni95p2UCcKjraa2IHZ9Jhq3pwarxAivzNrY+pSZ+MGS1Yzdeyqetr/Ge//U9JGIcaA+7ujt0A4FRSt0Jih3ceavB0vChEQKefGldMKxzT+J3Vc4lFBKJnkHMdEELVOzOaMMgXPjy5fF61Fqs5cVDF+gMjGhxFPldc3aytX3AceEPbNT6s3HnMT0wogIV3OiHpNNZRhjF/iy7Y6Drewq26OjuKGPJE3K+44OwBxO0XZ7wZHF6k7q3j9aWsV7u+S0+3Vl7akNSnKzSOq5CFB0fuQ81wHmMjBUKl7XG470n2yQ0L3n1L7vRGRrIRCYU+LSrkQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAGI1nansusgmS0xfzlJYXtZHBzBZZFq9Wy6xMkuA20JTIg42YxXPmYadPPvZX26CPWdBu3xqjQlKDY7ZMXvdzsUY2/0GVeMSJOFM5o02hUDsZVnyBfzp7XeiP+65bc710dGNJl3Hpdsf8JN4fs1UFok9snT3DWZPRgiPpaSDYlxVYFFOdD+ksu3El1URuNvB6eC0M8AaeQ9M60+YxxhcOma7c1wRVdgNKpxYz46MruUS6KXx1GzS9y/OKFnMrTrfBRdp/rPgb6LCNbObGtYrxxat7Hud4n770vDFXWm5TlnWK/Nr2C/A3i1gyK5EDC7ABsE/XsscS58ORKzOSTHeRD4=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"3fd374b5e9e34061a41eaf5b93ff848d"}, [
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
  'eastus',
  'x-ms-client-request-id',
  '9ee20839-7e8b-4938-96d0-e642681b44e6',
  'x-ms-request-id',
  'f1b5a1a7-bb50-4373-9eac-0c1a75efa451',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:44:48 GMT',
  'Content-Length',
  '1346'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistdeletedcertificatesbypage-1/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificatesbypage-1/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAwjvAuw97b0N5YqDy1r5oni95p2UCcKjraa2IHZ9Jhq3pwarxAivzNrY+pSZ+MGS1Yzdeyqetr/Ge//U9JGIcaA+7ujt0A4FRSt0Jih3ceavB0vChEQKefGldMKxzT+J3Vc4lFBKJnkHMdEELVOzOaMMgXPjy5fF61Fqs5cVDF+gMjGhxFPldc3aytX3AceEPbNT6s3HnMT0wogIV3OiHpNNZRhjF/iy7Y6Drewq26OjuKGPJE3K+44OwBxO0XZ7wZHF6k7q3j9aWsV7u+S0+3Vl7akNSnKzSOq5CFB0fuQ81wHmMjBUKl7XG470n2yQ0L3n1L7vRGRrIRCYU+LSrkQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAGI1nansusgmS0xfzlJYXtZHBzBZZFq9Wy6xMkuA20JTIg42YxXPmYadPPvZX26CPWdBu3xqjQlKDY7ZMXvdzsUY2/0GVeMSJOFM5o02hUDsZVnyBfzp7XeiP+65bc710dGNJl3Hpdsf8JN4fs1UFok9snT3DWZPRgiPpaSDYlxVYFFOdD+ksu3El1URuNvB6eC0M8AaeQ9M60+YxxhcOma7c1wRVdgNKpxYz46MruUS6KXx1GzS9y/OKFnMrTrfBRdp/rPgb6LCNbObGtYrxxat7Hud4n770vDFXWm5TlnWK/Nr2C/A3i1gyK5EDC7ABsE/XsscS58ORKzOSTHeRD4=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"3fd374b5e9e34061a41eaf5b93ff848d"}, [
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
  'eastus',
  'x-ms-client-request-id',
  'e01dfed1-f3de-49d9-9a5e-6fda2b189d09',
  'x-ms-request-id',
  'c5864394-db22-4271-9064-35764702218b',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:44:50 GMT',
  'Content-Length',
  '1346'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistdeletedcertificatesbypage-1/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificatesbypage-1/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAwjvAuw97b0N5YqDy1r5oni95p2UCcKjraa2IHZ9Jhq3pwarxAivzNrY+pSZ+MGS1Yzdeyqetr/Ge//U9JGIcaA+7ujt0A4FRSt0Jih3ceavB0vChEQKefGldMKxzT+J3Vc4lFBKJnkHMdEELVOzOaMMgXPjy5fF61Fqs5cVDF+gMjGhxFPldc3aytX3AceEPbNT6s3HnMT0wogIV3OiHpNNZRhjF/iy7Y6Drewq26OjuKGPJE3K+44OwBxO0XZ7wZHF6k7q3j9aWsV7u+S0+3Vl7akNSnKzSOq5CFB0fuQ81wHmMjBUKl7XG470n2yQ0L3n1L7vRGRrIRCYU+LSrkQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAGI1nansusgmS0xfzlJYXtZHBzBZZFq9Wy6xMkuA20JTIg42YxXPmYadPPvZX26CPWdBu3xqjQlKDY7ZMXvdzsUY2/0GVeMSJOFM5o02hUDsZVnyBfzp7XeiP+65bc710dGNJl3Hpdsf8JN4fs1UFok9snT3DWZPRgiPpaSDYlxVYFFOdD+ksu3El1URuNvB6eC0M8AaeQ9M60+YxxhcOma7c1wRVdgNKpxYz46MruUS6KXx1GzS9y/OKFnMrTrfBRdp/rPgb6LCNbObGtYrxxat7Hud4n770vDFXWm5TlnWK/Nr2C/A3i1gyK5EDC7ABsE/XsscS58ORKzOSTHeRD4=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"3fd374b5e9e34061a41eaf5b93ff848d"}, [
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
  'eastus',
  'x-ms-client-request-id',
  '698b0d61-31a0-430a-b32a-32fd9de815d1',
  'x-ms-request-id',
  '16e940cb-54cf-43b1-8e91-b827915c815a',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:44:51 GMT',
  'Content-Length',
  '1346'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistdeletedcertificatesbypage-1/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificatesbypage-1/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAwjvAuw97b0N5YqDy1r5oni95p2UCcKjraa2IHZ9Jhq3pwarxAivzNrY+pSZ+MGS1Yzdeyqetr/Ge//U9JGIcaA+7ujt0A4FRSt0Jih3ceavB0vChEQKefGldMKxzT+J3Vc4lFBKJnkHMdEELVOzOaMMgXPjy5fF61Fqs5cVDF+gMjGhxFPldc3aytX3AceEPbNT6s3HnMT0wogIV3OiHpNNZRhjF/iy7Y6Drewq26OjuKGPJE3K+44OwBxO0XZ7wZHF6k7q3j9aWsV7u+S0+3Vl7akNSnKzSOq5CFB0fuQ81wHmMjBUKl7XG470n2yQ0L3n1L7vRGRrIRCYU+LSrkQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAGI1nansusgmS0xfzlJYXtZHBzBZZFq9Wy6xMkuA20JTIg42YxXPmYadPPvZX26CPWdBu3xqjQlKDY7ZMXvdzsUY2/0GVeMSJOFM5o02hUDsZVnyBfzp7XeiP+65bc710dGNJl3Hpdsf8JN4fs1UFok9snT3DWZPRgiPpaSDYlxVYFFOdD+ksu3El1URuNvB6eC0M8AaeQ9M60+YxxhcOma7c1wRVdgNKpxYz46MruUS6KXx1GzS9y/OKFnMrTrfBRdp/rPgb6LCNbObGtYrxxat7Hud4n770vDFXWm5TlnWK/Nr2C/A3i1gyK5EDC7ABsE/XsscS58ORKzOSTHeRD4=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"3fd374b5e9e34061a41eaf5b93ff848d"}, [
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
  'eastus',
  'x-ms-client-request-id',
  'd53fe4b3-213b-47e8-afca-8e274707fd34',
  'x-ms-request-id',
  '5acfbbc8-87c3-45b5-a019-2711276442be',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:44:54 GMT',
  'Content-Length',
  '1346'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistdeletedcertificatesbypage-1/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificatesbypage-1/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAwjvAuw97b0N5YqDy1r5oni95p2UCcKjraa2IHZ9Jhq3pwarxAivzNrY+pSZ+MGS1Yzdeyqetr/Ge//U9JGIcaA+7ujt0A4FRSt0Jih3ceavB0vChEQKefGldMKxzT+J3Vc4lFBKJnkHMdEELVOzOaMMgXPjy5fF61Fqs5cVDF+gMjGhxFPldc3aytX3AceEPbNT6s3HnMT0wogIV3OiHpNNZRhjF/iy7Y6Drewq26OjuKGPJE3K+44OwBxO0XZ7wZHF6k7q3j9aWsV7u+S0+3Vl7akNSnKzSOq5CFB0fuQ81wHmMjBUKl7XG470n2yQ0L3n1L7vRGRrIRCYU+LSrkQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAGI1nansusgmS0xfzlJYXtZHBzBZZFq9Wy6xMkuA20JTIg42YxXPmYadPPvZX26CPWdBu3xqjQlKDY7ZMXvdzsUY2/0GVeMSJOFM5o02hUDsZVnyBfzp7XeiP+65bc710dGNJl3Hpdsf8JN4fs1UFok9snT3DWZPRgiPpaSDYlxVYFFOdD+ksu3El1URuNvB6eC0M8AaeQ9M60+YxxhcOma7c1wRVdgNKpxYz46MruUS6KXx1GzS9y/OKFnMrTrfBRdp/rPgb6LCNbObGtYrxxat7Hud4n770vDFXWm5TlnWK/Nr2C/A3i1gyK5EDC7ABsE/XsscS58ORKzOSTHeRD4=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"3fd374b5e9e34061a41eaf5b93ff848d"}, [
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
  'eastus',
  'x-ms-client-request-id',
  '76738deb-1fd9-4a60-b3fc-8a918f92fd9d',
  'x-ms-request-id',
  'b1da292c-de26-4fb1-9b5a-535535b76c65',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:44:56 GMT',
  'Content-Length',
  '1346'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistdeletedcertificatesbypage-1/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificatesbypage-1/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAwjvAuw97b0N5YqDy1r5oni95p2UCcKjraa2IHZ9Jhq3pwarxAivzNrY+pSZ+MGS1Yzdeyqetr/Ge//U9JGIcaA+7ujt0A4FRSt0Jih3ceavB0vChEQKefGldMKxzT+J3Vc4lFBKJnkHMdEELVOzOaMMgXPjy5fF61Fqs5cVDF+gMjGhxFPldc3aytX3AceEPbNT6s3HnMT0wogIV3OiHpNNZRhjF/iy7Y6Drewq26OjuKGPJE3K+44OwBxO0XZ7wZHF6k7q3j9aWsV7u+S0+3Vl7akNSnKzSOq5CFB0fuQ81wHmMjBUKl7XG470n2yQ0L3n1L7vRGRrIRCYU+LSrkQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAGI1nansusgmS0xfzlJYXtZHBzBZZFq9Wy6xMkuA20JTIg42YxXPmYadPPvZX26CPWdBu3xqjQlKDY7ZMXvdzsUY2/0GVeMSJOFM5o02hUDsZVnyBfzp7XeiP+65bc710dGNJl3Hpdsf8JN4fs1UFok9snT3DWZPRgiPpaSDYlxVYFFOdD+ksu3El1URuNvB6eC0M8AaeQ9M60+YxxhcOma7c1wRVdgNKpxYz46MruUS6KXx1GzS9y/OKFnMrTrfBRdp/rPgb6LCNbObGtYrxxat7Hud4n770vDFXWm5TlnWK/Nr2C/A3i1gyK5EDC7ABsE/XsscS58ORKzOSTHeRD4=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"3fd374b5e9e34061a41eaf5b93ff848d"}, [
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
  'eastus',
  'x-ms-client-request-id',
  '00838ec5-09fb-4cbc-ac3a-920e4b5447fb',
  'x-ms-request-id',
  'b9a7103a-1c15-4217-8ea9-d3e4cd580f11',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:44:58 GMT',
  'Content-Length',
  '1346'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistdeletedcertificatesbypage-1/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificatesbypage-1/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAwjvAuw97b0N5YqDy1r5oni95p2UCcKjraa2IHZ9Jhq3pwarxAivzNrY+pSZ+MGS1Yzdeyqetr/Ge//U9JGIcaA+7ujt0A4FRSt0Jih3ceavB0vChEQKefGldMKxzT+J3Vc4lFBKJnkHMdEELVOzOaMMgXPjy5fF61Fqs5cVDF+gMjGhxFPldc3aytX3AceEPbNT6s3HnMT0wogIV3OiHpNNZRhjF/iy7Y6Drewq26OjuKGPJE3K+44OwBxO0XZ7wZHF6k7q3j9aWsV7u+S0+3Vl7akNSnKzSOq5CFB0fuQ81wHmMjBUKl7XG470n2yQ0L3n1L7vRGRrIRCYU+LSrkQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAGI1nansusgmS0xfzlJYXtZHBzBZZFq9Wy6xMkuA20JTIg42YxXPmYadPPvZX26CPWdBu3xqjQlKDY7ZMXvdzsUY2/0GVeMSJOFM5o02hUDsZVnyBfzp7XeiP+65bc710dGNJl3Hpdsf8JN4fs1UFok9snT3DWZPRgiPpaSDYlxVYFFOdD+ksu3El1URuNvB6eC0M8AaeQ9M60+YxxhcOma7c1wRVdgNKpxYz46MruUS6KXx1GzS9y/OKFnMrTrfBRdp/rPgb6LCNbObGtYrxxat7Hud4n770vDFXWm5TlnWK/Nr2C/A3i1gyK5EDC7ABsE/XsscS58ORKzOSTHeRD4=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"3fd374b5e9e34061a41eaf5b93ff848d"}, [
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
  'eastus',
  'x-ms-client-request-id',
  'd7ef4c5e-2ab3-46e7-b382-f0d1b16f74f4',
  'x-ms-request-id',
  'b06222e0-ea06-4f06-90cc-2ca018d1d311',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:45:00 GMT',
  'Content-Length',
  '1346'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistdeletedcertificatesbypage-1/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificatesbypage-1/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAwjvAuw97b0N5YqDy1r5oni95p2UCcKjraa2IHZ9Jhq3pwarxAivzNrY+pSZ+MGS1Yzdeyqetr/Ge//U9JGIcaA+7ujt0A4FRSt0Jih3ceavB0vChEQKefGldMKxzT+J3Vc4lFBKJnkHMdEELVOzOaMMgXPjy5fF61Fqs5cVDF+gMjGhxFPldc3aytX3AceEPbNT6s3HnMT0wogIV3OiHpNNZRhjF/iy7Y6Drewq26OjuKGPJE3K+44OwBxO0XZ7wZHF6k7q3j9aWsV7u+S0+3Vl7akNSnKzSOq5CFB0fuQ81wHmMjBUKl7XG470n2yQ0L3n1L7vRGRrIRCYU+LSrkQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAGI1nansusgmS0xfzlJYXtZHBzBZZFq9Wy6xMkuA20JTIg42YxXPmYadPPvZX26CPWdBu3xqjQlKDY7ZMXvdzsUY2/0GVeMSJOFM5o02hUDsZVnyBfzp7XeiP+65bc710dGNJl3Hpdsf8JN4fs1UFok9snT3DWZPRgiPpaSDYlxVYFFOdD+ksu3El1URuNvB6eC0M8AaeQ9M60+YxxhcOma7c1wRVdgNKpxYz46MruUS6KXx1GzS9y/OKFnMrTrfBRdp/rPgb6LCNbObGtYrxxat7Hud4n770vDFXWm5TlnWK/Nr2C/A3i1gyK5EDC7ABsE/XsscS58ORKzOSTHeRD4=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"3fd374b5e9e34061a41eaf5b93ff848d"}, [
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
  'eastus',
  'x-ms-client-request-id',
  'c3e1838c-8ac4-44d7-b803-1933344ede75',
  'x-ms-request-id',
  '89aba3ba-f315-4f48-ac55-f11f05969175',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:45:01 GMT',
  'Content-Length',
  '1346'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistdeletedcertificatesbypage-1/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificatesbypage-1/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAwjvAuw97b0N5YqDy1r5oni95p2UCcKjraa2IHZ9Jhq3pwarxAivzNrY+pSZ+MGS1Yzdeyqetr/Ge//U9JGIcaA+7ujt0A4FRSt0Jih3ceavB0vChEQKefGldMKxzT+J3Vc4lFBKJnkHMdEELVOzOaMMgXPjy5fF61Fqs5cVDF+gMjGhxFPldc3aytX3AceEPbNT6s3HnMT0wogIV3OiHpNNZRhjF/iy7Y6Drewq26OjuKGPJE3K+44OwBxO0XZ7wZHF6k7q3j9aWsV7u+S0+3Vl7akNSnKzSOq5CFB0fuQ81wHmMjBUKl7XG470n2yQ0L3n1L7vRGRrIRCYU+LSrkQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAGI1nansusgmS0xfzlJYXtZHBzBZZFq9Wy6xMkuA20JTIg42YxXPmYadPPvZX26CPWdBu3xqjQlKDY7ZMXvdzsUY2/0GVeMSJOFM5o02hUDsZVnyBfzp7XeiP+65bc710dGNJl3Hpdsf8JN4fs1UFok9snT3DWZPRgiPpaSDYlxVYFFOdD+ksu3El1URuNvB6eC0M8AaeQ9M60+YxxhcOma7c1wRVdgNKpxYz46MruUS6KXx1GzS9y/OKFnMrTrfBRdp/rPgb6LCNbObGtYrxxat7Hud4n770vDFXWm5TlnWK/Nr2C/A3i1gyK5EDC7ABsE/XsscS58ORKzOSTHeRD4=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"3fd374b5e9e34061a41eaf5b93ff848d"}, [
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
  'eastus',
  'x-ms-client-request-id',
  'a1477ba6-25d0-44e0-8dff-c2ec45225289',
  'x-ms-request-id',
  'a8a3be85-b01d-40d1-9ab6-870d5e72a7a8',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:45:04 GMT',
  'Content-Length',
  '1346'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistdeletedcertificatesbypage-1/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificatesbypage-1/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAwjvAuw97b0N5YqDy1r5oni95p2UCcKjraa2IHZ9Jhq3pwarxAivzNrY+pSZ+MGS1Yzdeyqetr/Ge//U9JGIcaA+7ujt0A4FRSt0Jih3ceavB0vChEQKefGldMKxzT+J3Vc4lFBKJnkHMdEELVOzOaMMgXPjy5fF61Fqs5cVDF+gMjGhxFPldc3aytX3AceEPbNT6s3HnMT0wogIV3OiHpNNZRhjF/iy7Y6Drewq26OjuKGPJE3K+44OwBxO0XZ7wZHF6k7q3j9aWsV7u+S0+3Vl7akNSnKzSOq5CFB0fuQ81wHmMjBUKl7XG470n2yQ0L3n1L7vRGRrIRCYU+LSrkQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAGI1nansusgmS0xfzlJYXtZHBzBZZFq9Wy6xMkuA20JTIg42YxXPmYadPPvZX26CPWdBu3xqjQlKDY7ZMXvdzsUY2/0GVeMSJOFM5o02hUDsZVnyBfzp7XeiP+65bc710dGNJl3Hpdsf8JN4fs1UFok9snT3DWZPRgiPpaSDYlxVYFFOdD+ksu3El1URuNvB6eC0M8AaeQ9M60+YxxhcOma7c1wRVdgNKpxYz46MruUS6KXx1GzS9y/OKFnMrTrfBRdp/rPgb6LCNbObGtYrxxat7Hud4n770vDFXWm5TlnWK/Nr2C/A3i1gyK5EDC7ABsE/XsscS58ORKzOSTHeRD4=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"3fd374b5e9e34061a41eaf5b93ff848d"}, [
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
  'eastus',
  'x-ms-client-request-id',
  '1fc6b786-d208-42f1-9f40-748d8c67bf6f',
  'x-ms-request-id',
  '561c57e8-3f33-419f-a952-69ba7641c518',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:45:06 GMT',
  'Content-Length',
  '1346'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistdeletedcertificatesbypage-1/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificatesbypage-1/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAwjvAuw97b0N5YqDy1r5oni95p2UCcKjraa2IHZ9Jhq3pwarxAivzNrY+pSZ+MGS1Yzdeyqetr/Ge//U9JGIcaA+7ujt0A4FRSt0Jih3ceavB0vChEQKefGldMKxzT+J3Vc4lFBKJnkHMdEELVOzOaMMgXPjy5fF61Fqs5cVDF+gMjGhxFPldc3aytX3AceEPbNT6s3HnMT0wogIV3OiHpNNZRhjF/iy7Y6Drewq26OjuKGPJE3K+44OwBxO0XZ7wZHF6k7q3j9aWsV7u+S0+3Vl7akNSnKzSOq5CFB0fuQ81wHmMjBUKl7XG470n2yQ0L3n1L7vRGRrIRCYU+LSrkQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAGI1nansusgmS0xfzlJYXtZHBzBZZFq9Wy6xMkuA20JTIg42YxXPmYadPPvZX26CPWdBu3xqjQlKDY7ZMXvdzsUY2/0GVeMSJOFM5o02hUDsZVnyBfzp7XeiP+65bc710dGNJl3Hpdsf8JN4fs1UFok9snT3DWZPRgiPpaSDYlxVYFFOdD+ksu3El1URuNvB6eC0M8AaeQ9M60+YxxhcOma7c1wRVdgNKpxYz46MruUS6KXx1GzS9y/OKFnMrTrfBRdp/rPgb6LCNbObGtYrxxat7Hud4n770vDFXWm5TlnWK/Nr2C/A3i1gyK5EDC7ABsE/XsscS58ORKzOSTHeRD4=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"3fd374b5e9e34061a41eaf5b93ff848d"}, [
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
  'eastus',
  'x-ms-client-request-id',
  'be3e8287-3ad6-4244-93a6-464063fdccdf',
  'x-ms-request-id',
  '1b6c3ea4-903a-4f56-8fa3-8fa43fdb4804',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:45:08 GMT',
  'Content-Length',
  '1346'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistdeletedcertificatesbypage-1/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificatesbypage-1/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAwjvAuw97b0N5YqDy1r5oni95p2UCcKjraa2IHZ9Jhq3pwarxAivzNrY+pSZ+MGS1Yzdeyqetr/Ge//U9JGIcaA+7ujt0A4FRSt0Jih3ceavB0vChEQKefGldMKxzT+J3Vc4lFBKJnkHMdEELVOzOaMMgXPjy5fF61Fqs5cVDF+gMjGhxFPldc3aytX3AceEPbNT6s3HnMT0wogIV3OiHpNNZRhjF/iy7Y6Drewq26OjuKGPJE3K+44OwBxO0XZ7wZHF6k7q3j9aWsV7u+S0+3Vl7akNSnKzSOq5CFB0fuQ81wHmMjBUKl7XG470n2yQ0L3n1L7vRGRrIRCYU+LSrkQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAGI1nansusgmS0xfzlJYXtZHBzBZZFq9Wy6xMkuA20JTIg42YxXPmYadPPvZX26CPWdBu3xqjQlKDY7ZMXvdzsUY2/0GVeMSJOFM5o02hUDsZVnyBfzp7XeiP+65bc710dGNJl3Hpdsf8JN4fs1UFok9snT3DWZPRgiPpaSDYlxVYFFOdD+ksu3El1URuNvB6eC0M8AaeQ9M60+YxxhcOma7c1wRVdgNKpxYz46MruUS6KXx1GzS9y/OKFnMrTrfBRdp/rPgb6LCNbObGtYrxxat7Hud4n770vDFXWm5TlnWK/Nr2C/A3i1gyK5EDC7ABsE/XsscS58ORKzOSTHeRD4=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"3fd374b5e9e34061a41eaf5b93ff848d"}, [
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
  'eastus',
  'x-ms-client-request-id',
  '3fb4a6d0-3cb6-4e35-815e-109ae1fcd097',
  'x-ms-request-id',
  '26a635c5-df1a-4919-90ba-9ff38e82e8b7',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:45:10 GMT',
  'Content-Length',
  '1346'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistdeletedcertificatesbypage-1/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificatesbypage-1/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAwjvAuw97b0N5YqDy1r5oni95p2UCcKjraa2IHZ9Jhq3pwarxAivzNrY+pSZ+MGS1Yzdeyqetr/Ge//U9JGIcaA+7ujt0A4FRSt0Jih3ceavB0vChEQKefGldMKxzT+J3Vc4lFBKJnkHMdEELVOzOaMMgXPjy5fF61Fqs5cVDF+gMjGhxFPldc3aytX3AceEPbNT6s3HnMT0wogIV3OiHpNNZRhjF/iy7Y6Drewq26OjuKGPJE3K+44OwBxO0XZ7wZHF6k7q3j9aWsV7u+S0+3Vl7akNSnKzSOq5CFB0fuQ81wHmMjBUKl7XG470n2yQ0L3n1L7vRGRrIRCYU+LSrkQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAGI1nansusgmS0xfzlJYXtZHBzBZZFq9Wy6xMkuA20JTIg42YxXPmYadPPvZX26CPWdBu3xqjQlKDY7ZMXvdzsUY2/0GVeMSJOFM5o02hUDsZVnyBfzp7XeiP+65bc710dGNJl3Hpdsf8JN4fs1UFok9snT3DWZPRgiPpaSDYlxVYFFOdD+ksu3El1URuNvB6eC0M8AaeQ9M60+YxxhcOma7c1wRVdgNKpxYz46MruUS6KXx1GzS9y/OKFnMrTrfBRdp/rPgb6LCNbObGtYrxxat7Hud4n770vDFXWm5TlnWK/Nr2C/A3i1gyK5EDC7ABsE/XsscS58ORKzOSTHeRD4=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"3fd374b5e9e34061a41eaf5b93ff848d"}, [
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
  'eastus',
  'x-ms-client-request-id',
  '3a739b68-6a31-44c3-b626-3cb7651f7399',
  'x-ms-request-id',
  '76a99bc1-e6c4-411e-9447-0976259ddfcc',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:45:12 GMT',
  'Content-Length',
  '1346'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistdeletedcertificatesbypage-1/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificatesbypage-1/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAwjvAuw97b0N5YqDy1r5oni95p2UCcKjraa2IHZ9Jhq3pwarxAivzNrY+pSZ+MGS1Yzdeyqetr/Ge//U9JGIcaA+7ujt0A4FRSt0Jih3ceavB0vChEQKefGldMKxzT+J3Vc4lFBKJnkHMdEELVOzOaMMgXPjy5fF61Fqs5cVDF+gMjGhxFPldc3aytX3AceEPbNT6s3HnMT0wogIV3OiHpNNZRhjF/iy7Y6Drewq26OjuKGPJE3K+44OwBxO0XZ7wZHF6k7q3j9aWsV7u+S0+3Vl7akNSnKzSOq5CFB0fuQ81wHmMjBUKl7XG470n2yQ0L3n1L7vRGRrIRCYU+LSrkQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAGI1nansusgmS0xfzlJYXtZHBzBZZFq9Wy6xMkuA20JTIg42YxXPmYadPPvZX26CPWdBu3xqjQlKDY7ZMXvdzsUY2/0GVeMSJOFM5o02hUDsZVnyBfzp7XeiP+65bc710dGNJl3Hpdsf8JN4fs1UFok9snT3DWZPRgiPpaSDYlxVYFFOdD+ksu3El1URuNvB6eC0M8AaeQ9M60+YxxhcOma7c1wRVdgNKpxYz46MruUS6KXx1GzS9y/OKFnMrTrfBRdp/rPgb6LCNbObGtYrxxat7Hud4n770vDFXWm5TlnWK/Nr2C/A3i1gyK5EDC7ABsE/XsscS58ORKzOSTHeRD4=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"3fd374b5e9e34061a41eaf5b93ff848d"}, [
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
  'eastus',
  'x-ms-client-request-id',
  '10cf72d3-e25c-4442-ae1b-7dfbd72516d2',
  'x-ms-request-id',
  '69095214-1a3c-4809-b03f-c982f49aecd9',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:45:15 GMT',
  'Content-Length',
  '1346'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistdeletedcertificatesbypage-1/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificatesbypage-1/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAwjvAuw97b0N5YqDy1r5oni95p2UCcKjraa2IHZ9Jhq3pwarxAivzNrY+pSZ+MGS1Yzdeyqetr/Ge//U9JGIcaA+7ujt0A4FRSt0Jih3ceavB0vChEQKefGldMKxzT+J3Vc4lFBKJnkHMdEELVOzOaMMgXPjy5fF61Fqs5cVDF+gMjGhxFPldc3aytX3AceEPbNT6s3HnMT0wogIV3OiHpNNZRhjF/iy7Y6Drewq26OjuKGPJE3K+44OwBxO0XZ7wZHF6k7q3j9aWsV7u+S0+3Vl7akNSnKzSOq5CFB0fuQ81wHmMjBUKl7XG470n2yQ0L3n1L7vRGRrIRCYU+LSrkQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAGI1nansusgmS0xfzlJYXtZHBzBZZFq9Wy6xMkuA20JTIg42YxXPmYadPPvZX26CPWdBu3xqjQlKDY7ZMXvdzsUY2/0GVeMSJOFM5o02hUDsZVnyBfzp7XeiP+65bc710dGNJl3Hpdsf8JN4fs1UFok9snT3DWZPRgiPpaSDYlxVYFFOdD+ksu3El1URuNvB6eC0M8AaeQ9M60+YxxhcOma7c1wRVdgNKpxYz46MruUS6KXx1GzS9y/OKFnMrTrfBRdp/rPgb6LCNbObGtYrxxat7Hud4n770vDFXWm5TlnWK/Nr2C/A3i1gyK5EDC7ABsE/XsscS58ORKzOSTHeRD4=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"3fd374b5e9e34061a41eaf5b93ff848d"}, [
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
  'eastus',
  'x-ms-client-request-id',
  'd4c8f2b2-6d4b-4c46-b9bf-5d8ffb7cc277',
  'x-ms-request-id',
  '9e85c22d-a1af-4d33-a819-449fdff2f5f8',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:45:17 GMT',
  'Content-Length',
  '1346'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistdeletedcertificatesbypage-1/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificatesbypage-1/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAwjvAuw97b0N5YqDy1r5oni95p2UCcKjraa2IHZ9Jhq3pwarxAivzNrY+pSZ+MGS1Yzdeyqetr/Ge//U9JGIcaA+7ujt0A4FRSt0Jih3ceavB0vChEQKefGldMKxzT+J3Vc4lFBKJnkHMdEELVOzOaMMgXPjy5fF61Fqs5cVDF+gMjGhxFPldc3aytX3AceEPbNT6s3HnMT0wogIV3OiHpNNZRhjF/iy7Y6Drewq26OjuKGPJE3K+44OwBxO0XZ7wZHF6k7q3j9aWsV7u+S0+3Vl7akNSnKzSOq5CFB0fuQ81wHmMjBUKl7XG470n2yQ0L3n1L7vRGRrIRCYU+LSrkQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAGI1nansusgmS0xfzlJYXtZHBzBZZFq9Wy6xMkuA20JTIg42YxXPmYadPPvZX26CPWdBu3xqjQlKDY7ZMXvdzsUY2/0GVeMSJOFM5o02hUDsZVnyBfzp7XeiP+65bc710dGNJl3Hpdsf8JN4fs1UFok9snT3DWZPRgiPpaSDYlxVYFFOdD+ksu3El1URuNvB6eC0M8AaeQ9M60+YxxhcOma7c1wRVdgNKpxYz46MruUS6KXx1GzS9y/OKFnMrTrfBRdp/rPgb6LCNbObGtYrxxat7Hud4n770vDFXWm5TlnWK/Nr2C/A3i1gyK5EDC7ABsE/XsscS58ORKzOSTHeRD4=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"3fd374b5e9e34061a41eaf5b93ff848d"}, [
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
  'eastus',
  'x-ms-client-request-id',
  '2ad320bc-6e34-4a34-b1ec-859b3d3af3f6',
  'x-ms-request-id',
  '3a858ef2-1715-43d4-a0ff-2e43043150ea',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:45:19 GMT',
  'Content-Length',
  '1346'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistdeletedcertificatesbypage-1/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificatesbypage-1/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAwjvAuw97b0N5YqDy1r5oni95p2UCcKjraa2IHZ9Jhq3pwarxAivzNrY+pSZ+MGS1Yzdeyqetr/Ge//U9JGIcaA+7ujt0A4FRSt0Jih3ceavB0vChEQKefGldMKxzT+J3Vc4lFBKJnkHMdEELVOzOaMMgXPjy5fF61Fqs5cVDF+gMjGhxFPldc3aytX3AceEPbNT6s3HnMT0wogIV3OiHpNNZRhjF/iy7Y6Drewq26OjuKGPJE3K+44OwBxO0XZ7wZHF6k7q3j9aWsV7u+S0+3Vl7akNSnKzSOq5CFB0fuQ81wHmMjBUKl7XG470n2yQ0L3n1L7vRGRrIRCYU+LSrkQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAGI1nansusgmS0xfzlJYXtZHBzBZZFq9Wy6xMkuA20JTIg42YxXPmYadPPvZX26CPWdBu3xqjQlKDY7ZMXvdzsUY2/0GVeMSJOFM5o02hUDsZVnyBfzp7XeiP+65bc710dGNJl3Hpdsf8JN4fs1UFok9snT3DWZPRgiPpaSDYlxVYFFOdD+ksu3El1URuNvB6eC0M8AaeQ9M60+YxxhcOma7c1wRVdgNKpxYz46MruUS6KXx1GzS9y/OKFnMrTrfBRdp/rPgb6LCNbObGtYrxxat7Hud4n770vDFXWm5TlnWK/Nr2C/A3i1gyK5EDC7ABsE/XsscS58ORKzOSTHeRD4=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"3fd374b5e9e34061a41eaf5b93ff848d"}, [
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
  'eastus',
  'x-ms-client-request-id',
  'b9eeceb6-ca73-48f0-a6d4-083e0b46428b',
  'x-ms-request-id',
  '76ac5d84-ea0a-4758-9961-a64eb49a7879',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:45:20 GMT',
  'Content-Length',
  '1346'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistdeletedcertificatesbypage-1/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificatesbypage-1/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAwjvAuw97b0N5YqDy1r5oni95p2UCcKjraa2IHZ9Jhq3pwarxAivzNrY+pSZ+MGS1Yzdeyqetr/Ge//U9JGIcaA+7ujt0A4FRSt0Jih3ceavB0vChEQKefGldMKxzT+J3Vc4lFBKJnkHMdEELVOzOaMMgXPjy5fF61Fqs5cVDF+gMjGhxFPldc3aytX3AceEPbNT6s3HnMT0wogIV3OiHpNNZRhjF/iy7Y6Drewq26OjuKGPJE3K+44OwBxO0XZ7wZHF6k7q3j9aWsV7u+S0+3Vl7akNSnKzSOq5CFB0fuQ81wHmMjBUKl7XG470n2yQ0L3n1L7vRGRrIRCYU+LSrkQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAGI1nansusgmS0xfzlJYXtZHBzBZZFq9Wy6xMkuA20JTIg42YxXPmYadPPvZX26CPWdBu3xqjQlKDY7ZMXvdzsUY2/0GVeMSJOFM5o02hUDsZVnyBfzp7XeiP+65bc710dGNJl3Hpdsf8JN4fs1UFok9snT3DWZPRgiPpaSDYlxVYFFOdD+ksu3El1URuNvB6eC0M8AaeQ9M60+YxxhcOma7c1wRVdgNKpxYz46MruUS6KXx1GzS9y/OKFnMrTrfBRdp/rPgb6LCNbObGtYrxxat7Hud4n770vDFXWm5TlnWK/Nr2C/A3i1gyK5EDC7ABsE/XsscS58ORKzOSTHeRD4=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"3fd374b5e9e34061a41eaf5b93ff848d"}, [
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
  'eastus',
  'x-ms-client-request-id',
  '5031e85e-add8-47c6-bc94-56e20edb8652',
  'x-ms-request-id',
  '9e3e4cd3-fee4-4396-8ee2-e4c9ea3f97e0',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:45:23 GMT',
  'Content-Length',
  '1346'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistdeletedcertificatesbypage-1/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificatesbypage-1/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAwjvAuw97b0N5YqDy1r5oni95p2UCcKjraa2IHZ9Jhq3pwarxAivzNrY+pSZ+MGS1Yzdeyqetr/Ge//U9JGIcaA+7ujt0A4FRSt0Jih3ceavB0vChEQKefGldMKxzT+J3Vc4lFBKJnkHMdEELVOzOaMMgXPjy5fF61Fqs5cVDF+gMjGhxFPldc3aytX3AceEPbNT6s3HnMT0wogIV3OiHpNNZRhjF/iy7Y6Drewq26OjuKGPJE3K+44OwBxO0XZ7wZHF6k7q3j9aWsV7u+S0+3Vl7akNSnKzSOq5CFB0fuQ81wHmMjBUKl7XG470n2yQ0L3n1L7vRGRrIRCYU+LSrkQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAGI1nansusgmS0xfzlJYXtZHBzBZZFq9Wy6xMkuA20JTIg42YxXPmYadPPvZX26CPWdBu3xqjQlKDY7ZMXvdzsUY2/0GVeMSJOFM5o02hUDsZVnyBfzp7XeiP+65bc710dGNJl3Hpdsf8JN4fs1UFok9snT3DWZPRgiPpaSDYlxVYFFOdD+ksu3El1URuNvB6eC0M8AaeQ9M60+YxxhcOma7c1wRVdgNKpxYz46MruUS6KXx1GzS9y/OKFnMrTrfBRdp/rPgb6LCNbObGtYrxxat7Hud4n770vDFXWm5TlnWK/Nr2C/A3i1gyK5EDC7ABsE/XsscS58ORKzOSTHeRD4=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"3fd374b5e9e34061a41eaf5b93ff848d"}, [
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
  'eastus',
  'x-ms-client-request-id',
  'b8e0c986-ce9c-4c18-9bc6-97bf42f4f79a',
  'x-ms-request-id',
  'a6a95d9e-862e-4feb-868f-d4d3a3540ecc',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:45:25 GMT',
  'Content-Length',
  '1346'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistdeletedcertificatesbypage-1/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificatesbypage-1/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAwjvAuw97b0N5YqDy1r5oni95p2UCcKjraa2IHZ9Jhq3pwarxAivzNrY+pSZ+MGS1Yzdeyqetr/Ge//U9JGIcaA+7ujt0A4FRSt0Jih3ceavB0vChEQKefGldMKxzT+J3Vc4lFBKJnkHMdEELVOzOaMMgXPjy5fF61Fqs5cVDF+gMjGhxFPldc3aytX3AceEPbNT6s3HnMT0wogIV3OiHpNNZRhjF/iy7Y6Drewq26OjuKGPJE3K+44OwBxO0XZ7wZHF6k7q3j9aWsV7u+S0+3Vl7akNSnKzSOq5CFB0fuQ81wHmMjBUKl7XG470n2yQ0L3n1L7vRGRrIRCYU+LSrkQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAGI1nansusgmS0xfzlJYXtZHBzBZZFq9Wy6xMkuA20JTIg42YxXPmYadPPvZX26CPWdBu3xqjQlKDY7ZMXvdzsUY2/0GVeMSJOFM5o02hUDsZVnyBfzp7XeiP+65bc710dGNJl3Hpdsf8JN4fs1UFok9snT3DWZPRgiPpaSDYlxVYFFOdD+ksu3El1URuNvB6eC0M8AaeQ9M60+YxxhcOma7c1wRVdgNKpxYz46MruUS6KXx1GzS9y/OKFnMrTrfBRdp/rPgb6LCNbObGtYrxxat7Hud4n770vDFXWm5TlnWK/Nr2C/A3i1gyK5EDC7ABsE/XsscS58ORKzOSTHeRD4=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"3fd374b5e9e34061a41eaf5b93ff848d"}, [
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
  'eastus',
  'x-ms-client-request-id',
  'f1c21cf7-8576-4b54-a190-b5feca75aedc',
  'x-ms-request-id',
  'c0cce738-e558-4ef3-a2fa-0e880754ba4a',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:45:27 GMT',
  'Content-Length',
  '1346'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistdeletedcertificatesbypage-1/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificatesbypage-1/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAwjvAuw97b0N5YqDy1r5oni95p2UCcKjraa2IHZ9Jhq3pwarxAivzNrY+pSZ+MGS1Yzdeyqetr/Ge//U9JGIcaA+7ujt0A4FRSt0Jih3ceavB0vChEQKefGldMKxzT+J3Vc4lFBKJnkHMdEELVOzOaMMgXPjy5fF61Fqs5cVDF+gMjGhxFPldc3aytX3AceEPbNT6s3HnMT0wogIV3OiHpNNZRhjF/iy7Y6Drewq26OjuKGPJE3K+44OwBxO0XZ7wZHF6k7q3j9aWsV7u+S0+3Vl7akNSnKzSOq5CFB0fuQ81wHmMjBUKl7XG470n2yQ0L3n1L7vRGRrIRCYU+LSrkQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAGI1nansusgmS0xfzlJYXtZHBzBZZFq9Wy6xMkuA20JTIg42YxXPmYadPPvZX26CPWdBu3xqjQlKDY7ZMXvdzsUY2/0GVeMSJOFM5o02hUDsZVnyBfzp7XeiP+65bc710dGNJl3Hpdsf8JN4fs1UFok9snT3DWZPRgiPpaSDYlxVYFFOdD+ksu3El1URuNvB6eC0M8AaeQ9M60+YxxhcOma7c1wRVdgNKpxYz46MruUS6KXx1GzS9y/OKFnMrTrfBRdp/rPgb6LCNbObGtYrxxat7Hud4n770vDFXWm5TlnWK/Nr2C/A3i1gyK5EDC7ABsE/XsscS58ORKzOSTHeRD4=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"3fd374b5e9e34061a41eaf5b93ff848d"}, [
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
  'eastus',
  'x-ms-client-request-id',
  '51c2aa55-8e3c-4cd0-ada3-5935b0f37f06',
  'x-ms-request-id',
  '7937bc23-5483-4baa-816c-c64c9c087093',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:45:29 GMT',
  'Content-Length',
  '1346'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistdeletedcertificatesbypage-1/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificatesbypage-1/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAwjvAuw97b0N5YqDy1r5oni95p2UCcKjraa2IHZ9Jhq3pwarxAivzNrY+pSZ+MGS1Yzdeyqetr/Ge//U9JGIcaA+7ujt0A4FRSt0Jih3ceavB0vChEQKefGldMKxzT+J3Vc4lFBKJnkHMdEELVOzOaMMgXPjy5fF61Fqs5cVDF+gMjGhxFPldc3aytX3AceEPbNT6s3HnMT0wogIV3OiHpNNZRhjF/iy7Y6Drewq26OjuKGPJE3K+44OwBxO0XZ7wZHF6k7q3j9aWsV7u+S0+3Vl7akNSnKzSOq5CFB0fuQ81wHmMjBUKl7XG470n2yQ0L3n1L7vRGRrIRCYU+LSrkQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAGI1nansusgmS0xfzlJYXtZHBzBZZFq9Wy6xMkuA20JTIg42YxXPmYadPPvZX26CPWdBu3xqjQlKDY7ZMXvdzsUY2/0GVeMSJOFM5o02hUDsZVnyBfzp7XeiP+65bc710dGNJl3Hpdsf8JN4fs1UFok9snT3DWZPRgiPpaSDYlxVYFFOdD+ksu3El1URuNvB6eC0M8AaeQ9M60+YxxhcOma7c1wRVdgNKpxYz46MruUS6KXx1GzS9y/OKFnMrTrfBRdp/rPgb6LCNbObGtYrxxat7Hud4n770vDFXWm5TlnWK/Nr2C/A3i1gyK5EDC7ABsE/XsscS58ORKzOSTHeRD4=","cancellation_requested":false,"status":"completed","target":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificatesbypage-1","request_id":"3fd374b5e9e34061a41eaf5b93ff848d"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'ffff99dd-0a42-4370-90fb-067d9d15c995',
  'x-ms-request-id',
  '6a6ee2e1-5f68-4db5-9552-ef471c30d805',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:45:32 GMT',
  'Content-Length',
  '1319'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistdeletedcertificatesbypage-1/')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificatesbypage-1/4eb4be72e51e470db4b07dc5c2a37df2","kid":"https://keyvault_name.vault.azure.net/keys/listCertificateName-canlistdeletedcertificatesbypage-1/4eb4be72e51e470db4b07dc5c2a37df2","sid":"https://keyvault_name.vault.azure.net/secrets/listCertificateName-canlistdeletedcertificatesbypage-1/4eb4be72e51e470db4b07dc5c2a37df2","x5t":"S_rL2PVgAqc1C3OOcRlSppK_1N0","cer":"MIIDKDCCAhCgAwIBAgIQeHrT8N+5SyWHb5sd01ODaDANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjEwNDI4MjIzNTMxWhcNMjIwNDI4MjI0NTMxWjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQDCO8C7D3tvQ3lioPLWvmieL3mnZQJwqOtprYgdn0mGrenBqvECK/M2tj6lJn4wZLVjN17Kp62v8Z7/9T0kYhxoD7u6O3QDgVFK3QmKHdx5q8HS8KERAp58aV0wrHNP4ndVziUUEomeQcx0QQtU7M5owyBc+PLl8XrUWqzlxUMX6AyMaHEU+V1zdrK1fcBx4Q9s1PqzcecxPTCiAhXc6Iek01lGGMX+LLtjoOt7Crbo6O4oY8kTcr7jg7AHE7RdnvBkcXqTureP1paxXu75LT7dWXtqQ1KcrNI6rkIUHR+5DzXAeYyMFQqXtcbjvSfbJDQvefUvu9EZGshEJhT4tKuRAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBSTgpiS/i9jRPUMP8Sgp755Pkdx+jAdBgNVHQ4EFgQUk4KYkv4vY0T1DD/EoKe+eT5HcfowDQYJKoZIhvcNAQELBQADggEBAL0rkDJC+/SGVKUJBeP+V8gBFpyGwdcpXClqQCC6kdKLrn59YJjhkCC9vk4yjOFFQdnTXLHRoIQ51HwuWAsudX5e94BvRFeWJmW8Z23kUV5H5kya2KbDdfgAJ/JcBosRJ+ILVJghhfT1MePolijF5pEqddE/ZiZ7yNnSuAmeCKvdZohiqeW4WCoPLgqJPCgl20zAbGN5SNO9hJaazk+NM4jiib3SzL+Fmk5UWAo10Gh60D08ICpzT7i1iW31ZT8Dxx8WXmGsyHmx7ns/OSg6/cb/a977PuCFYTamQAO6XH4noJ+pTV/Bj245jK3z4Q793x+25R4RRbviCnqZmFWoEDk=","attributes":{"enabled":true,"nbf":1619649331,"exp":1651185931,"created":1619649931,"updated":1619649931,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificatesbypage-1/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1619649858,"updated":1619649858}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificatesbypage-1/pending"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '8bb3f71b-fd5c-41a6-8ef1-82be6211f75c',
  'x-ms-request-id',
  '91db014b-77ff-4df0-8707-4369bd1fe7b7',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:45:32 GMT',
  'Content-Length',
  '2620'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/certificates/listCertificateName-canlistdeletedcertificatesbypage-0')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/listCertificateName-canlistdeletedcertificatesbypage-0","deletedDate":1619649932,"scheduledPurgeDate":1627425932,"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificatesbypage-0/ad32fa5a88e54ee6889add26a761aa06","kid":"https://keyvault_name.vault.azure.net/keys/listCertificateName-canlistdeletedcertificatesbypage-0/ad32fa5a88e54ee6889add26a761aa06","sid":"https://keyvault_name.vault.azure.net/secrets/listCertificateName-canlistdeletedcertificatesbypage-0/ad32fa5a88e54ee6889add26a761aa06","x5t":"VxKvuifqKx5xk4Z_tR5L4yqmsMI","cer":"MIIDKDCCAhCgAwIBAgIQHzOhrvUKRQygiEgJpcmi3jANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjEwNDI4MjIzNDE1WhcNMjIwNDI4MjI0NDE1WjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQCin9r1y3Yh5fsYjoWr7rVa8gMkLlXvIkd2AHW/SBMKba3ee8efHD6ELJpDKkC0Zwg6DkDt2LqW0ZeGojMWNZeTNqA2lSJAJXYP2FXH27zIzPsum0aaheyi6SlOAdlyED/9y4QVbzor5KvgvkfbuMCYJ+wKxj39e98eiKeIaFqbpP1zfbk5GlYLUamso2GCkTN+pOe6zZGQTgeC7lHLcAMEA6zI7AwIApHMv5asPW6fD/cd0SXjFItV73PxWJpk23veIMhQrTJd8RUVkKQAdDpab4jLSrwvWKoPj/qb6yjvkflfgMyaOwEVe6coFLAgGJrA5h2YefNJ9WfU43461LOVAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBRXCxtPSmnR648StPJkpmi2rLP3rzAdBgNVHQ4EFgQUVwsbT0pp0euPErTyZKZotqyz968wDQYJKoZIhvcNAQELBQADggEBAJi80OPiN6GaqPGK9F6Rxoq8iuD8rjWcdMLaIqek4ni2fQgRz9Pv3JNfzUK4tngxx7xJKwUkKdRUaNqxpmOZh2A5NuTUClEEvoXtGVX4n9HpL+ueglM+mAuMzOl/a7pkPbq4ePdqkQIFqDJ0K7cxSJUkqSGBudZ9NwZTvFZcSnUC4S7m9EHbynfdf1fgUfOPIryP51btjELgJVVXYQm2YUFa6iNub/uCXoDl13RvCGmEOIcxzWSgeVdArRQWsDbVQEwPT61iVqk0lx9dO/5EOPnCX9C9Bvg3XpMvHW9rxyIBpKz5lvswgZFXu6aWzW1356pkXmpcInn2iN3dbSNUDuI=","attributes":{"enabled":true,"nbf":1619649255,"exp":1651185855,"created":1619649855,"updated":1619649855,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificatesbypage-0/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1619649771,"updated":1619649771}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificatesbypage-0/pending"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '7a4deecc-0860-478c-850a-fb899f2d7c7c',
  'x-ms-request-id',
  '5febcd21-e2a1-4508-bbe7-fb700d6a2e0f',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:45:32 GMT',
  'Content-Length',
  '2826'
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
  '153',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'c5eecb2f-be85-4ee0-8ab5-d79cc066d995',
  'x-ms-request-id',
  'cdefc692-bb3e-448e-8bd8-4b8a588a0b69',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:45:32 GMT'
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
  '153',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '8cdca896-5ba7-4874-b082-aa13e2b2a454',
  'x-ms-request-id',
  '09da445c-a4a7-4e90-a20a-bef7bb02eb9a',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:45:32 GMT'
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
  '153',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'ca51ce76-ee1a-4193-90fd-4bbd2d3d9432',
  'x-ms-request-id',
  '309bbdc3-1c9e-4ac2-8895-5595001ac269',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:45:34 GMT'
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
  '153',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '5c255198-7144-492f-bca3-9196d3606303',
  'x-ms-request-id',
  '835257cf-dfd3-4354-aedd-9a61171d02cf',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:45:36 GMT'
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
  '153',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'f8180675-cf5d-424a-9848-30760ed4ab43',
  'x-ms-request-id',
  '22b2b477-3990-43bf-b80b-d7d1b520951f',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:45:38 GMT'
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
  '153',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'be70686f-80c4-4c43-b2f3-537515f9da41',
  'x-ms-request-id',
  'cc705955-e3c8-4ea3-b1f3-05e7de2816b5',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:45:40 GMT'
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
  '153',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '5d45ae47-0af0-4e09-b926-d319834b6afb',
  'x-ms-request-id',
  '79e55f10-d160-44a1-a940-1e510d63ac1a',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:45:42 GMT'
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
  '153',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'fc358b66-49dc-4490-b45c-13bf2027ebd5',
  'x-ms-request-id',
  '430c3466-eae4-4fe1-acf9-d43cc6906734',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:45:44 GMT'
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
  '153',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '62e2b329-5b97-41a3-851b-93d27c6a5afc',
  'x-ms-request-id',
  '9d3f6f70-67f9-494c-b3b5-f156aad91669',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:45:46 GMT'
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
  '153',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'f37ed9cc-233e-4d9e-892a-8b33b5b0a5ed',
  'x-ms-request-id',
  '368e1e60-4010-47cd-a3ce-e2acf43cd414',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:45:48 GMT'
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
  '153',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'd1a5b180-30b6-4faa-938f-c13d7fb84a72',
  'x-ms-request-id',
  '97d579cf-7f51-4d4d-9519-bb5458f96a07',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:45:51 GMT'
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
  '153',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '17a84c06-590d-4ff0-b4c7-97f20ea47c3f',
  'x-ms-request-id',
  'fc06ebb5-632e-4b62-94a1-8322fd4a77ab',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:45:52 GMT'
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
  '153',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '26c42538-9985-466d-a2e1-3e216f97e8bb',
  'x-ms-request-id',
  'a80a59ca-3e5a-4689-bd35-9d1addadf954',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:45:55 GMT'
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
  '153',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '9994694f-512f-4e0d-a666-b2ca579550ec',
  'x-ms-request-id',
  'f5e8b852-d6c0-4195-836c-08e2537ebac3',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:45:57 GMT'
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
  '153',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'e3b6ac83-1ca7-42f7-905f-177eb8b9eeb3',
  'x-ms-request-id',
  '26f09f56-07f0-4a46-aafe-69591ce9fc3f',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:45:59 GMT'
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
  '153',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '89dcad42-9c6c-4b2b-bf5c-fdad8d325731',
  'x-ms-request-id',
  '5315e2dc-9d9a-4494-b2e6-3c0186ed5b31',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:46:01 GMT'
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
  '153',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '2c02eb67-2a42-4c11-a13e-3495671e80ff',
  'x-ms-request-id',
  '03d34cb5-4a83-4998-92cb-54282c03a45d',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:46:03 GMT'
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
  '153',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '52fe0ff3-a04c-479d-9ae4-24cea2aaa1fd',
  'x-ms-request-id',
  '0ba24f33-dfc2-4db2-8e1c-e81a1c1fb24c',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:46:05 GMT'
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
  '153',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '06ad72bf-d914-4299-aa9d-43df15ed0e1d',
  'x-ms-request-id',
  'a2dee784-e1cc-44fa-8567-0de9d171429e',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:46:07 GMT'
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
  '153',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '3949240f-288e-495d-9b8b-dce6e3c57bfc',
  'x-ms-request-id',
  '5e12358e-232c-456c-94df-be69dca8d9b3',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:46:09 GMT'
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
  '153',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '4a3c659b-586d-4495-8f37-b7ab71991459',
  'x-ms-request-id',
  '64b4526e-a684-4290-93a7-146ab5082b7e',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:46:12 GMT'
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
  '153',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '385cdd56-a5ca-40c5-b01a-e184ff50e060',
  'x-ms-request-id',
  '137c5ea4-f6e8-42a1-92fe-e737ecdfe5fc',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:46:14 GMT'
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
  '153',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'd94800d2-3154-4948-b836-ac5c008ebe8f',
  'x-ms-request-id',
  'f3624768-5eb5-4063-bc8a-e9390ee6d72e',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:46:16 GMT'
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
  '153',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'd72ae89f-883f-4b8d-8106-6abf4442fae9',
  'x-ms-request-id',
  'bdc13aa2-3056-49bb-b15a-44de9913d3c7',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:46:18 GMT'
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
  '153',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '74ad33c8-5cc5-4765-99c4-d98fd33921c5',
  'x-ms-request-id',
  'f07b7036-25c4-406e-876a-613e4604bf69',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:46:19 GMT'
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
  '153',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'd4c46eed-ee45-43a0-bbc0-091968e1c9e4',
  'x-ms-request-id',
  'db7d4a58-f3ed-4d4c-8021-af2389706dda',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:46:22 GMT'
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
  '153',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '49dbbebc-e09e-4a0f-bde7-b9ae07d4a38b',
  'x-ms-request-id',
  'a2834348-571e-4a70-8d74-d870d56ef500',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:46:24 GMT'
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
  '153',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '44de6cb2-3fb6-4ff3-a64a-74b1714ff6bd',
  'x-ms-request-id',
  '69cf015b-f396-4e15-902b-8682c75db994',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:46:26 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistdeletedcertificatesbypage-0')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/listCertificateName-canlistdeletedcertificatesbypage-0","deletedDate":1619649932,"scheduledPurgeDate":1627425932,"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificatesbypage-0/ad32fa5a88e54ee6889add26a761aa06","kid":"https://keyvault_name.vault.azure.net/keys/listCertificateName-canlistdeletedcertificatesbypage-0/ad32fa5a88e54ee6889add26a761aa06","sid":"https://keyvault_name.vault.azure.net/secrets/listCertificateName-canlistdeletedcertificatesbypage-0/ad32fa5a88e54ee6889add26a761aa06","x5t":"VxKvuifqKx5xk4Z_tR5L4yqmsMI","cer":"MIIDKDCCAhCgAwIBAgIQHzOhrvUKRQygiEgJpcmi3jANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjEwNDI4MjIzNDE1WhcNMjIwNDI4MjI0NDE1WjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQCin9r1y3Yh5fsYjoWr7rVa8gMkLlXvIkd2AHW/SBMKba3ee8efHD6ELJpDKkC0Zwg6DkDt2LqW0ZeGojMWNZeTNqA2lSJAJXYP2FXH27zIzPsum0aaheyi6SlOAdlyED/9y4QVbzor5KvgvkfbuMCYJ+wKxj39e98eiKeIaFqbpP1zfbk5GlYLUamso2GCkTN+pOe6zZGQTgeC7lHLcAMEA6zI7AwIApHMv5asPW6fD/cd0SXjFItV73PxWJpk23veIMhQrTJd8RUVkKQAdDpab4jLSrwvWKoPj/qb6yjvkflfgMyaOwEVe6coFLAgGJrA5h2YefNJ9WfU43461LOVAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBRXCxtPSmnR648StPJkpmi2rLP3rzAdBgNVHQ4EFgQUVwsbT0pp0euPErTyZKZotqyz968wDQYJKoZIhvcNAQELBQADggEBAJi80OPiN6GaqPGK9F6Rxoq8iuD8rjWcdMLaIqek4ni2fQgRz9Pv3JNfzUK4tngxx7xJKwUkKdRUaNqxpmOZh2A5NuTUClEEvoXtGVX4n9HpL+ueglM+mAuMzOl/a7pkPbq4ePdqkQIFqDJ0K7cxSJUkqSGBudZ9NwZTvFZcSnUC4S7m9EHbynfdf1fgUfOPIryP51btjELgJVVXYQm2YUFa6iNub/uCXoDl13RvCGmEOIcxzWSgeVdArRQWsDbVQEwPT61iVqk0lx9dO/5EOPnCX9C9Bvg3XpMvHW9rxyIBpKz5lvswgZFXu6aWzW1356pkXmpcInn2iN3dbSNUDuI=","attributes":{"enabled":true,"nbf":1619649255,"exp":1651185855,"created":1619649855,"updated":1619649855,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificatesbypage-0/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1619649771,"updated":1619649771}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificatesbypage-0/pending"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'a99db24c-f530-415a-888d-d772de056089',
  'x-ms-request-id',
  '10a48c5c-334e-448d-8aae-fe6fbf7f204c',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:46:28 GMT',
  'Content-Length',
  '2826'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/certificates/listCertificateName-canlistdeletedcertificatesbypage-1')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/listCertificateName-canlistdeletedcertificatesbypage-1","deletedDate":1619649989,"scheduledPurgeDate":1627425989,"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificatesbypage-1/4eb4be72e51e470db4b07dc5c2a37df2","kid":"https://keyvault_name.vault.azure.net/keys/listCertificateName-canlistdeletedcertificatesbypage-1/4eb4be72e51e470db4b07dc5c2a37df2","sid":"https://keyvault_name.vault.azure.net/secrets/listCertificateName-canlistdeletedcertificatesbypage-1/4eb4be72e51e470db4b07dc5c2a37df2","x5t":"S_rL2PVgAqc1C3OOcRlSppK_1N0","cer":"MIIDKDCCAhCgAwIBAgIQeHrT8N+5SyWHb5sd01ODaDANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjEwNDI4MjIzNTMxWhcNMjIwNDI4MjI0NTMxWjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQDCO8C7D3tvQ3lioPLWvmieL3mnZQJwqOtprYgdn0mGrenBqvECK/M2tj6lJn4wZLVjN17Kp62v8Z7/9T0kYhxoD7u6O3QDgVFK3QmKHdx5q8HS8KERAp58aV0wrHNP4ndVziUUEomeQcx0QQtU7M5owyBc+PLl8XrUWqzlxUMX6AyMaHEU+V1zdrK1fcBx4Q9s1PqzcecxPTCiAhXc6Iek01lGGMX+LLtjoOt7Crbo6O4oY8kTcr7jg7AHE7RdnvBkcXqTureP1paxXu75LT7dWXtqQ1KcrNI6rkIUHR+5DzXAeYyMFQqXtcbjvSfbJDQvefUvu9EZGshEJhT4tKuRAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBSTgpiS/i9jRPUMP8Sgp755Pkdx+jAdBgNVHQ4EFgQUk4KYkv4vY0T1DD/EoKe+eT5HcfowDQYJKoZIhvcNAQELBQADggEBAL0rkDJC+/SGVKUJBeP+V8gBFpyGwdcpXClqQCC6kdKLrn59YJjhkCC9vk4yjOFFQdnTXLHRoIQ51HwuWAsudX5e94BvRFeWJmW8Z23kUV5H5kya2KbDdfgAJ/JcBosRJ+ILVJghhfT1MePolijF5pEqddE/ZiZ7yNnSuAmeCKvdZohiqeW4WCoPLgqJPCgl20zAbGN5SNO9hJaazk+NM4jiib3SzL+Fmk5UWAo10Gh60D08ICpzT7i1iW31ZT8Dxx8WXmGsyHmx7ns/OSg6/cb/a977PuCFYTamQAO6XH4noJ+pTV/Bj245jK3z4Q793x+25R4RRbviCnqZmFWoEDk=","attributes":{"enabled":true,"nbf":1619649331,"exp":1651185931,"created":1619649931,"updated":1619649931,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificatesbypage-1/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1619649858,"updated":1619649858}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificatesbypage-1/pending"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '1a7a86d3-6fe3-4eb0-8929-5d016e1d9a96',
  'x-ms-request-id',
  '1ec85940-d15c-4eb5-88d6-410c39658ddd',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:46:28 GMT',
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
  '153',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '63dd66f5-68c8-40f2-a0cc-eae00379537f',
  'x-ms-request-id',
  'f0af0d50-babe-418b-80e7-916900c0ce0b',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:46:28 GMT'
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
  '153',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '7ff01e6e-0e11-4adc-99e8-e44818492696',
  'x-ms-request-id',
  '0e69402e-7867-4758-9d4c-2d1b48bc185c',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:46:28 GMT'
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
  '153',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '26b650fb-d7bc-42ee-9aae-8ff4dc46d4b4',
  'x-ms-request-id',
  'eb9c1003-0abd-4fa7-a41d-b5d9752c5392',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:46:31 GMT'
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
  '153',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '238ccd97-c539-47e6-a2fa-44431807e298',
  'x-ms-request-id',
  '22444887-a48b-41c6-be3b-050ae04ade71',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:46:33 GMT'
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
  '153',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '9030bc95-4d6c-4bc0-90d2-d92237b8d0e1',
  'x-ms-request-id',
  '07387d50-57f2-49b0-8f3c-ac5ddf65bb51',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:46:35 GMT'
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
  '153',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'f0db69dd-34eb-4ab6-9068-feac3836cf61',
  'x-ms-request-id',
  'e112e8a2-38af-4f8e-adf7-de779f26a3bb',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:46:37 GMT'
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
  '153',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'd91a27eb-b956-4ba6-a3c4-5deb8181a6f4',
  'x-ms-request-id',
  '16fcab54-d11c-48b0-88a0-997181a365ec',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:46:39 GMT'
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
  '153',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'd2ff6d1b-f54d-408c-8335-61707283a872',
  'x-ms-request-id',
  '8b2d751d-eb5e-47b5-8fd7-114dff1d0b2f',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:46:41 GMT'
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
  '153',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '05cb5fdd-d571-4bd5-833a-de4d512e5b3e',
  'x-ms-request-id',
  '565adf79-a434-4635-b5ce-0b48153a883d',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:46:44 GMT'
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
  '153',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '26af28df-35a9-428e-92c3-61116b10da33',
  'x-ms-request-id',
  '50d4596c-8728-4bea-89a5-a51ca86d39c3',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:46:46 GMT'
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
  '153',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'cec79dfc-adad-410d-b759-0dbedda90923',
  'x-ms-request-id',
  '21c49fe7-21e0-4f77-914f-eb421bba01b7',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:46:48 GMT'
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
  '153',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'e9d12218-9498-4bf2-ad9b-e18e632ed2da',
  'x-ms-request-id',
  '4cebe5ba-b18f-4150-a5ba-d99b4fc725a1',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:46:50 GMT'
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
  '153',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '71031fde-bbf4-47f3-bf60-5c3eaa8f6c3d',
  'x-ms-request-id',
  '72dee764-d28d-41ab-8f32-c5f827b8284a',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:46:51 GMT'
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
  '153',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '262cd902-81f9-4246-a2ee-392e50c78570',
  'x-ms-request-id',
  'a7fc1a54-5260-42ea-95ca-54c9d7df4605',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:46:54 GMT'
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
  '153',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '1e633140-635c-4593-a348-f2518683ce45',
  'x-ms-request-id',
  '607f9b11-76c2-42c1-873d-403a2027f128',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:46:56 GMT'
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
  '153',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'd7d20ff6-0ddc-4851-b6b3-1891a647bd5c',
  'x-ms-request-id',
  '1e350569-f425-483c-9615-36ff04f5b48c',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:46:58 GMT'
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
  '153',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '22340ec0-bef7-4c2d-89a7-47c7c46988c4',
  'x-ms-request-id',
  '5f237cda-03ef-4111-ba52-d9f51d139baa',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:47:00 GMT'
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
  '153',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'd96f7c8e-ac53-4c80-a640-e734805f452b',
  'x-ms-request-id',
  '05d207d3-4319-4cbb-b0df-16c499d41333',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:47:02 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistdeletedcertificatesbypage-1')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/listCertificateName-canlistdeletedcertificatesbypage-1","deletedDate":1619649989,"scheduledPurgeDate":1627425989,"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificatesbypage-1/4eb4be72e51e470db4b07dc5c2a37df2","kid":"https://keyvault_name.vault.azure.net/keys/listCertificateName-canlistdeletedcertificatesbypage-1/4eb4be72e51e470db4b07dc5c2a37df2","sid":"https://keyvault_name.vault.azure.net/secrets/listCertificateName-canlistdeletedcertificatesbypage-1/4eb4be72e51e470db4b07dc5c2a37df2","x5t":"S_rL2PVgAqc1C3OOcRlSppK_1N0","cer":"MIIDKDCCAhCgAwIBAgIQeHrT8N+5SyWHb5sd01ODaDANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjEwNDI4MjIzNTMxWhcNMjIwNDI4MjI0NTMxWjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQDCO8C7D3tvQ3lioPLWvmieL3mnZQJwqOtprYgdn0mGrenBqvECK/M2tj6lJn4wZLVjN17Kp62v8Z7/9T0kYhxoD7u6O3QDgVFK3QmKHdx5q8HS8KERAp58aV0wrHNP4ndVziUUEomeQcx0QQtU7M5owyBc+PLl8XrUWqzlxUMX6AyMaHEU+V1zdrK1fcBx4Q9s1PqzcecxPTCiAhXc6Iek01lGGMX+LLtjoOt7Crbo6O4oY8kTcr7jg7AHE7RdnvBkcXqTureP1paxXu75LT7dWXtqQ1KcrNI6rkIUHR+5DzXAeYyMFQqXtcbjvSfbJDQvefUvu9EZGshEJhT4tKuRAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBSTgpiS/i9jRPUMP8Sgp755Pkdx+jAdBgNVHQ4EFgQUk4KYkv4vY0T1DD/EoKe+eT5HcfowDQYJKoZIhvcNAQELBQADggEBAL0rkDJC+/SGVKUJBeP+V8gBFpyGwdcpXClqQCC6kdKLrn59YJjhkCC9vk4yjOFFQdnTXLHRoIQ51HwuWAsudX5e94BvRFeWJmW8Z23kUV5H5kya2KbDdfgAJ/JcBosRJ+ILVJghhfT1MePolijF5pEqddE/ZiZ7yNnSuAmeCKvdZohiqeW4WCoPLgqJPCgl20zAbGN5SNO9hJaazk+NM4jiib3SzL+Fmk5UWAo10Gh60D08ICpzT7i1iW31ZT8Dxx8WXmGsyHmx7ns/OSg6/cb/a977PuCFYTamQAO6XH4noJ+pTV/Bj245jK3z4Q793x+25R4RRbviCnqZmFWoEDk=","attributes":{"enabled":true,"nbf":1619649331,"exp":1651185931,"created":1619649931,"updated":1619649931,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificatesbypage-1/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1619649858,"updated":1619649858}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificatesbypage-1/pending"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '9c1f4f70-4286-476f-b481-f1a23a0d3880',
  'x-ms-request-id',
  '9434fd7f-e102-4785-b9b4-e6f17428cb5d',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:47:04 GMT',
  'Content-Length',
  '2826'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates')
  .query(true)
  .reply(200, {"value":[{"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/listCertificateName-canlistdeletedcertificatesbypage-0","deletedDate":1619649932,"scheduledPurgeDate":1627425932,"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificatesbypage-0","x5t":"VxKvuifqKx5xk4Z_tR5L4yqmsMI","attributes":{"enabled":true,"nbf":1619649255,"exp":1651185855,"created":1619649855,"updated":1619649855,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/listCertificateName-canlistdeletedcertificatesbypage-1","deletedDate":1619649989,"scheduledPurgeDate":1627425989,"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificatesbypage-1","x5t":"S_rL2PVgAqc1C3OOcRlSppK_1N0","attributes":{"enabled":true,"nbf":1619649331,"exp":1651185931,"created":1619649931,"updated":1619649931,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90}}],"nextLink":null}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '1880b759-81f5-40e8-84c5-7b971d2cde56',
  'x-ms-request-id',
  'aee6f777-3656-446f-9d8c-78a85e82103a',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:47:04 GMT',
  'Content-Length',
  '1117'
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
  'eastus',
  'x-ms-client-request-id',
  '24ab63c5-e5c7-45a7-838a-07fffb24de98',
  'x-ms-request-id',
  'f27bf475-0c93-47cd-aa2e-dd01c89d5af7',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:47:05 GMT'
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
  'eastus',
  'x-ms-client-request-id',
  '37e29cd2-ad8b-4c46-a49c-15a9a1edd294',
  'x-ms-request-id',
  '8a44de5b-f268-4f9b-bdb5-6379258710f9',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:47:05 GMT'
]);

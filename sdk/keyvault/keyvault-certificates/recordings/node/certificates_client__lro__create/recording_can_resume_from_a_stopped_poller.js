let nock = require('nock');

module.exports.hash = "132e3c380d32f3862ce3b54e17dd6023";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/certificates/lroCreateCertificateName-canresumefromastoppedpoller-/create')
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
  '0e41b698-0896-4d01-86ae-f5e4a4bbb56a',
  'x-ms-request-id',
  '143edff7-9393-43b1-a4e2-1a558ba57892',
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
  'Wed, 28 Apr 2021 20:59:42 GMT'
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
  '109d8dc7-dc31-405e-946a-6eca6cd56b01',
  'x-ms-ests-server',
  '2.1.11654.16 - EUS ProdSlices',
  'Set-Cookie',
  'fpc=ApDQRp_1bOJGvyZBmEPP0xDmR1YbAgAAALTCG9gOAAAA; expires=Fri, 28-May-2021 20:59:43 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrOtmK_MB-MtbEGQrdbsM3v_zBlmH-ipcvlmZZM4QI6CW_WtqkZmIxYxDg_2lYuq9TM7uu0oTOwJD6ePz9efk0fxHwEU_Y-KNyGB5gisbsCho3p3nO4lOh023ZXS2r1Pm1A51YU_NXQkMOSoCtgrSIj4nWI7WP4WReCNHKTRS0gNwgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 28 Apr 2021 20:59:42 GMT',
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
  '085f4f7d-8c01-4e13-9607-f708f09e1401',
  'x-ms-ests-server',
  '2.1.11654.16 - WUS2 ProdSlices',
  'Set-Cookie',
  'fpc=ApDQRp_1bOJGvyZBmEPP0xDmR1YbAgAAALTCG9gOAAAA; expires=Fri, 28-May-2021 20:59:43 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrgunAFUDpiUvUWCbn8GDoYBNlUty8krPJ3tTVYnkKKewWlINlC1JBjG9hKT9UeyV8DnbrWQH9BV5Mwg0JKC7BH-Spf6gpBDPC-1XquiEV0MlnamHeK1d-PMD2bZzdP7JdaFAxXIYT7btbWD5hoZKC4lBXLyscpdFttiMlB15gdmIgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 28 Apr 2021 20:59:43 GMT',
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
  '085f4f7d-8c01-4e13-9607-f708fb9e1401',
  'x-ms-ests-server',
  '2.1.11654.16 - WUS2 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=ApDQRp_1bOJGvyZBmEPP0xDmR1YbAgAAALTCG9gOAAAA; expires=Fri, 28-May-2021 20:59:43 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 28 Apr 2021 20:59:43 GMT',
  'Content-Length',
  '1313'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/certificates/lroCreateCertificateName-canresumefromastoppedpoller-/create', {"policy":{"key_props":{},"secret_props":{},"x509_props":{"subject":"cn=MyCert","sans":{}},"issuer":{"name":"Self"},"attributes":{}},"attributes":{}})
  .query(true)
  .reply(202, {"id":"https://keyvault_name.vault.azure.net/certificates/lroCreateCertificateName-canresumefromastoppedpoller-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAo4j194+vy8hvLov0ltKVuK29/UL+Kmd885ZlurR65KBz6PyCnvNdeupr8iN0gfq4tVQ9ItokLACmMR+hsKlHldSEayQMxDM5/GG7TYOtU1PNqvGN99GITEwH02b1NuoNID0LK1klf1gL2n+KTWh1wKei7kcXTVEgG9GST1Z8Wq2jfTkEeekoW3xqyqOD9QQaE+2cOVDrDXeDpYAUqs6mgwnIxZ6BnpKXn20UcrvArXtkXl/1zvuXUPF/90taTykCa2YTsYMczMjw5qY72f5N/RSqQFIbH8A9G5eyHWElOWY4OmfUtOD5PmgkIFseXmD2grMsMfp2gC76pNO+wMwy+QIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAG4mhUZkdxniYndIADv85YO1KrOxefOVkyl7SymMBp9ZMIhGP5Lnpga5yVyGF05r7SCWkKLuATtbxluI4UB3prF8W7nN6KrfL0opX94rov/4iwJ+S58WK8GOcfrTr5MCGQRhabUOOU3QppqqG4GlHTKN9YYBlJ+NgSzT4EGYZyZUNAH3gcILAhWgiL86d9LfdKcPe47d7jZYXvco5L0oTwHoduhbmXB7bDw9JdW5PoDP8gc94b0Gy211lJDngDVdocTNq9+3JJeG/SyQuiMu58E67hesQI9Eaazq52hji22g3HRjIXF0pn+46MO3Tgzyv947vlr6aU24/PCkQV/G1JE=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"c24a8bc7b2e5460997379040f6bbb35b"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://keyvault_name.vault.azure.net/certificates/lroCreateCertificateName-canresumefromastoppedpoller-/pending?api-version=7.2&request_id=c24a8bc7b2e5460997379040f6bbb35b',
  'Retry-After',
  '0',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '0e41b698-0896-4d01-86ae-f5e4a4bbb56a',
  'x-ms-request-id',
  '1ab9a059-b223-404f-8bf3-35c2e50a8086',
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
  'Wed, 28 Apr 2021 20:59:43 GMT',
  'Content-Length',
  '1346'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroCreateCertificateName-canresumefromastoppedpoller-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroCreateCertificateName-canresumefromastoppedpoller-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAo4j194+vy8hvLov0ltKVuK29/UL+Kmd885ZlurR65KBz6PyCnvNdeupr8iN0gfq4tVQ9ItokLACmMR+hsKlHldSEayQMxDM5/GG7TYOtU1PNqvGN99GITEwH02b1NuoNID0LK1klf1gL2n+KTWh1wKei7kcXTVEgG9GST1Z8Wq2jfTkEeekoW3xqyqOD9QQaE+2cOVDrDXeDpYAUqs6mgwnIxZ6BnpKXn20UcrvArXtkXl/1zvuXUPF/90taTykCa2YTsYMczMjw5qY72f5N/RSqQFIbH8A9G5eyHWElOWY4OmfUtOD5PmgkIFseXmD2grMsMfp2gC76pNO+wMwy+QIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAG4mhUZkdxniYndIADv85YO1KrOxefOVkyl7SymMBp9ZMIhGP5Lnpga5yVyGF05r7SCWkKLuATtbxluI4UB3prF8W7nN6KrfL0opX94rov/4iwJ+S58WK8GOcfrTr5MCGQRhabUOOU3QppqqG4GlHTKN9YYBlJ+NgSzT4EGYZyZUNAH3gcILAhWgiL86d9LfdKcPe47d7jZYXvco5L0oTwHoduhbmXB7bDw9JdW5PoDP8gc94b0Gy211lJDngDVdocTNq9+3JJeG/SyQuiMu58E67hesQI9Eaazq52hji22g3HRjIXF0pn+46MO3Tgzyv947vlr6aU24/PCkQV/G1JE=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"c24a8bc7b2e5460997379040f6bbb35b"}, [
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
  'a04e7fc0-5ea1-475f-98a4-a17fad5eb9df',
  'x-ms-request-id',
  'c8198d46-4ceb-4110-9ef3-9ba2c7e94e87',
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
  'Wed, 28 Apr 2021 20:59:43 GMT',
  'Content-Length',
  '1346'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroCreateCertificateName-canresumefromastoppedpoller-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroCreateCertificateName-canresumefromastoppedpoller-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAo4j194+vy8hvLov0ltKVuK29/UL+Kmd885ZlurR65KBz6PyCnvNdeupr8iN0gfq4tVQ9ItokLACmMR+hsKlHldSEayQMxDM5/GG7TYOtU1PNqvGN99GITEwH02b1NuoNID0LK1klf1gL2n+KTWh1wKei7kcXTVEgG9GST1Z8Wq2jfTkEeekoW3xqyqOD9QQaE+2cOVDrDXeDpYAUqs6mgwnIxZ6BnpKXn20UcrvArXtkXl/1zvuXUPF/90taTykCa2YTsYMczMjw5qY72f5N/RSqQFIbH8A9G5eyHWElOWY4OmfUtOD5PmgkIFseXmD2grMsMfp2gC76pNO+wMwy+QIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAG4mhUZkdxniYndIADv85YO1KrOxefOVkyl7SymMBp9ZMIhGP5Lnpga5yVyGF05r7SCWkKLuATtbxluI4UB3prF8W7nN6KrfL0opX94rov/4iwJ+S58WK8GOcfrTr5MCGQRhabUOOU3QppqqG4GlHTKN9YYBlJ+NgSzT4EGYZyZUNAH3gcILAhWgiL86d9LfdKcPe47d7jZYXvco5L0oTwHoduhbmXB7bDw9JdW5PoDP8gc94b0Gy211lJDngDVdocTNq9+3JJeG/SyQuiMu58E67hesQI9Eaazq52hji22g3HRjIXF0pn+46MO3Tgzyv947vlr6aU24/PCkQV/G1JE=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"c24a8bc7b2e5460997379040f6bbb35b"}, [
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
  '7bb1ce2a-e8a8-49f1-a8af-4f5c7cf34d04',
  'x-ms-request-id',
  '0ecabab7-61d2-4aa4-8cf2-16b34345fd4a',
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
  'Wed, 28 Apr 2021 20:59:43 GMT',
  'Content-Length',
  '1346'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroCreateCertificateName-canresumefromastoppedpoller-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroCreateCertificateName-canresumefromastoppedpoller-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAo4j194+vy8hvLov0ltKVuK29/UL+Kmd885ZlurR65KBz6PyCnvNdeupr8iN0gfq4tVQ9ItokLACmMR+hsKlHldSEayQMxDM5/GG7TYOtU1PNqvGN99GITEwH02b1NuoNID0LK1klf1gL2n+KTWh1wKei7kcXTVEgG9GST1Z8Wq2jfTkEeekoW3xqyqOD9QQaE+2cOVDrDXeDpYAUqs6mgwnIxZ6BnpKXn20UcrvArXtkXl/1zvuXUPF/90taTykCa2YTsYMczMjw5qY72f5N/RSqQFIbH8A9G5eyHWElOWY4OmfUtOD5PmgkIFseXmD2grMsMfp2gC76pNO+wMwy+QIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAG4mhUZkdxniYndIADv85YO1KrOxefOVkyl7SymMBp9ZMIhGP5Lnpga5yVyGF05r7SCWkKLuATtbxluI4UB3prF8W7nN6KrfL0opX94rov/4iwJ+S58WK8GOcfrTr5MCGQRhabUOOU3QppqqG4GlHTKN9YYBlJ+NgSzT4EGYZyZUNAH3gcILAhWgiL86d9LfdKcPe47d7jZYXvco5L0oTwHoduhbmXB7bDw9JdW5PoDP8gc94b0Gy211lJDngDVdocTNq9+3JJeG/SyQuiMu58E67hesQI9Eaazq52hji22g3HRjIXF0pn+46MO3Tgzyv947vlr6aU24/PCkQV/G1JE=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"c24a8bc7b2e5460997379040f6bbb35b"}, [
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
  '618a3209-ede8-4484-ba2c-076a2f38b793',
  'x-ms-request-id',
  'c0ea6470-02b1-454f-9d42-0c729321df75',
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
  'Wed, 28 Apr 2021 20:59:44 GMT',
  'Content-Length',
  '1346'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroCreateCertificateName-canresumefromastoppedpoller-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroCreateCertificateName-canresumefromastoppedpoller-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAo4j194+vy8hvLov0ltKVuK29/UL+Kmd885ZlurR65KBz6PyCnvNdeupr8iN0gfq4tVQ9ItokLACmMR+hsKlHldSEayQMxDM5/GG7TYOtU1PNqvGN99GITEwH02b1NuoNID0LK1klf1gL2n+KTWh1wKei7kcXTVEgG9GST1Z8Wq2jfTkEeekoW3xqyqOD9QQaE+2cOVDrDXeDpYAUqs6mgwnIxZ6BnpKXn20UcrvArXtkXl/1zvuXUPF/90taTykCa2YTsYMczMjw5qY72f5N/RSqQFIbH8A9G5eyHWElOWY4OmfUtOD5PmgkIFseXmD2grMsMfp2gC76pNO+wMwy+QIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAG4mhUZkdxniYndIADv85YO1KrOxefOVkyl7SymMBp9ZMIhGP5Lnpga5yVyGF05r7SCWkKLuATtbxluI4UB3prF8W7nN6KrfL0opX94rov/4iwJ+S58WK8GOcfrTr5MCGQRhabUOOU3QppqqG4GlHTKN9YYBlJ+NgSzT4EGYZyZUNAH3gcILAhWgiL86d9LfdKcPe47d7jZYXvco5L0oTwHoduhbmXB7bDw9JdW5PoDP8gc94b0Gy211lJDngDVdocTNq9+3JJeG/SyQuiMu58E67hesQI9Eaazq52hji22g3HRjIXF0pn+46MO3Tgzyv947vlr6aU24/PCkQV/G1JE=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"c24a8bc7b2e5460997379040f6bbb35b"}, [
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
  '2555cc96-7f9d-465c-825c-f66808fdc7aa',
  'x-ms-request-id',
  '2aeb519c-22c9-4913-a582-7901df968f06',
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
  'Wed, 28 Apr 2021 20:59:43 GMT',
  'Content-Length',
  '1346'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroCreateCertificateName-canresumefromastoppedpoller-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroCreateCertificateName-canresumefromastoppedpoller-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAo4j194+vy8hvLov0ltKVuK29/UL+Kmd885ZlurR65KBz6PyCnvNdeupr8iN0gfq4tVQ9ItokLACmMR+hsKlHldSEayQMxDM5/GG7TYOtU1PNqvGN99GITEwH02b1NuoNID0LK1klf1gL2n+KTWh1wKei7kcXTVEgG9GST1Z8Wq2jfTkEeekoW3xqyqOD9QQaE+2cOVDrDXeDpYAUqs6mgwnIxZ6BnpKXn20UcrvArXtkXl/1zvuXUPF/90taTykCa2YTsYMczMjw5qY72f5N/RSqQFIbH8A9G5eyHWElOWY4OmfUtOD5PmgkIFseXmD2grMsMfp2gC76pNO+wMwy+QIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAG4mhUZkdxniYndIADv85YO1KrOxefOVkyl7SymMBp9ZMIhGP5Lnpga5yVyGF05r7SCWkKLuATtbxluI4UB3prF8W7nN6KrfL0opX94rov/4iwJ+S58WK8GOcfrTr5MCGQRhabUOOU3QppqqG4GlHTKN9YYBlJ+NgSzT4EGYZyZUNAH3gcILAhWgiL86d9LfdKcPe47d7jZYXvco5L0oTwHoduhbmXB7bDw9JdW5PoDP8gc94b0Gy211lJDngDVdocTNq9+3JJeG/SyQuiMu58E67hesQI9Eaazq52hji22g3HRjIXF0pn+46MO3Tgzyv947vlr6aU24/PCkQV/G1JE=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"c24a8bc7b2e5460997379040f6bbb35b"}, [
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
  'a4651e46-d67a-4b53-92b9-bd3214d640f0',
  'x-ms-request-id',
  '6239df32-9e72-48e2-9bb2-b1cff33acc6d',
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
  'Wed, 28 Apr 2021 20:59:46 GMT',
  'Content-Length',
  '1346'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroCreateCertificateName-canresumefromastoppedpoller-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroCreateCertificateName-canresumefromastoppedpoller-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAo4j194+vy8hvLov0ltKVuK29/UL+Kmd885ZlurR65KBz6PyCnvNdeupr8iN0gfq4tVQ9ItokLACmMR+hsKlHldSEayQMxDM5/GG7TYOtU1PNqvGN99GITEwH02b1NuoNID0LK1klf1gL2n+KTWh1wKei7kcXTVEgG9GST1Z8Wq2jfTkEeekoW3xqyqOD9QQaE+2cOVDrDXeDpYAUqs6mgwnIxZ6BnpKXn20UcrvArXtkXl/1zvuXUPF/90taTykCa2YTsYMczMjw5qY72f5N/RSqQFIbH8A9G5eyHWElOWY4OmfUtOD5PmgkIFseXmD2grMsMfp2gC76pNO+wMwy+QIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAG4mhUZkdxniYndIADv85YO1KrOxefOVkyl7SymMBp9ZMIhGP5Lnpga5yVyGF05r7SCWkKLuATtbxluI4UB3prF8W7nN6KrfL0opX94rov/4iwJ+S58WK8GOcfrTr5MCGQRhabUOOU3QppqqG4GlHTKN9YYBlJ+NgSzT4EGYZyZUNAH3gcILAhWgiL86d9LfdKcPe47d7jZYXvco5L0oTwHoduhbmXB7bDw9JdW5PoDP8gc94b0Gy211lJDngDVdocTNq9+3JJeG/SyQuiMu58E67hesQI9Eaazq52hji22g3HRjIXF0pn+46MO3Tgzyv947vlr6aU24/PCkQV/G1JE=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"c24a8bc7b2e5460997379040f6bbb35b"}, [
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
  'fcb630ae-d3d7-4d88-a0cb-9f17afc4c1cd',
  'x-ms-request-id',
  '86b8984d-9288-4a46-8bbd-86912881412b',
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
  'Wed, 28 Apr 2021 20:59:48 GMT',
  'Content-Length',
  '1346'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroCreateCertificateName-canresumefromastoppedpoller-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroCreateCertificateName-canresumefromastoppedpoller-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAo4j194+vy8hvLov0ltKVuK29/UL+Kmd885ZlurR65KBz6PyCnvNdeupr8iN0gfq4tVQ9ItokLACmMR+hsKlHldSEayQMxDM5/GG7TYOtU1PNqvGN99GITEwH02b1NuoNID0LK1klf1gL2n+KTWh1wKei7kcXTVEgG9GST1Z8Wq2jfTkEeekoW3xqyqOD9QQaE+2cOVDrDXeDpYAUqs6mgwnIxZ6BnpKXn20UcrvArXtkXl/1zvuXUPF/90taTykCa2YTsYMczMjw5qY72f5N/RSqQFIbH8A9G5eyHWElOWY4OmfUtOD5PmgkIFseXmD2grMsMfp2gC76pNO+wMwy+QIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAG4mhUZkdxniYndIADv85YO1KrOxefOVkyl7SymMBp9ZMIhGP5Lnpga5yVyGF05r7SCWkKLuATtbxluI4UB3prF8W7nN6KrfL0opX94rov/4iwJ+S58WK8GOcfrTr5MCGQRhabUOOU3QppqqG4GlHTKN9YYBlJ+NgSzT4EGYZyZUNAH3gcILAhWgiL86d9LfdKcPe47d7jZYXvco5L0oTwHoduhbmXB7bDw9JdW5PoDP8gc94b0Gy211lJDngDVdocTNq9+3JJeG/SyQuiMu58E67hesQI9Eaazq52hji22g3HRjIXF0pn+46MO3Tgzyv947vlr6aU24/PCkQV/G1JE=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"c24a8bc7b2e5460997379040f6bbb35b"}, [
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
  '61dfabb1-0812-4706-a777-682d3acde031',
  'x-ms-request-id',
  '31be1cf2-017e-48a9-bfce-595a95cd480f',
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
  'Wed, 28 Apr 2021 20:59:50 GMT',
  'Content-Length',
  '1346'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroCreateCertificateName-canresumefromastoppedpoller-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroCreateCertificateName-canresumefromastoppedpoller-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAo4j194+vy8hvLov0ltKVuK29/UL+Kmd885ZlurR65KBz6PyCnvNdeupr8iN0gfq4tVQ9ItokLACmMR+hsKlHldSEayQMxDM5/GG7TYOtU1PNqvGN99GITEwH02b1NuoNID0LK1klf1gL2n+KTWh1wKei7kcXTVEgG9GST1Z8Wq2jfTkEeekoW3xqyqOD9QQaE+2cOVDrDXeDpYAUqs6mgwnIxZ6BnpKXn20UcrvArXtkXl/1zvuXUPF/90taTykCa2YTsYMczMjw5qY72f5N/RSqQFIbH8A9G5eyHWElOWY4OmfUtOD5PmgkIFseXmD2grMsMfp2gC76pNO+wMwy+QIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAG4mhUZkdxniYndIADv85YO1KrOxefOVkyl7SymMBp9ZMIhGP5Lnpga5yVyGF05r7SCWkKLuATtbxluI4UB3prF8W7nN6KrfL0opX94rov/4iwJ+S58WK8GOcfrTr5MCGQRhabUOOU3QppqqG4GlHTKN9YYBlJ+NgSzT4EGYZyZUNAH3gcILAhWgiL86d9LfdKcPe47d7jZYXvco5L0oTwHoduhbmXB7bDw9JdW5PoDP8gc94b0Gy211lJDngDVdocTNq9+3JJeG/SyQuiMu58E67hesQI9Eaazq52hji22g3HRjIXF0pn+46MO3Tgzyv947vlr6aU24/PCkQV/G1JE=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"c24a8bc7b2e5460997379040f6bbb35b"}, [
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
  '51746552-8e1d-4931-8a84-b2c5794301b6',
  'x-ms-request-id',
  'e46e233a-2b7a-4cf6-aa74-0474a44baadc',
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
  'Wed, 28 Apr 2021 20:59:52 GMT',
  'Content-Length',
  '1346'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroCreateCertificateName-canresumefromastoppedpoller-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroCreateCertificateName-canresumefromastoppedpoller-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAo4j194+vy8hvLov0ltKVuK29/UL+Kmd885ZlurR65KBz6PyCnvNdeupr8iN0gfq4tVQ9ItokLACmMR+hsKlHldSEayQMxDM5/GG7TYOtU1PNqvGN99GITEwH02b1NuoNID0LK1klf1gL2n+KTWh1wKei7kcXTVEgG9GST1Z8Wq2jfTkEeekoW3xqyqOD9QQaE+2cOVDrDXeDpYAUqs6mgwnIxZ6BnpKXn20UcrvArXtkXl/1zvuXUPF/90taTykCa2YTsYMczMjw5qY72f5N/RSqQFIbH8A9G5eyHWElOWY4OmfUtOD5PmgkIFseXmD2grMsMfp2gC76pNO+wMwy+QIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAG4mhUZkdxniYndIADv85YO1KrOxefOVkyl7SymMBp9ZMIhGP5Lnpga5yVyGF05r7SCWkKLuATtbxluI4UB3prF8W7nN6KrfL0opX94rov/4iwJ+S58WK8GOcfrTr5MCGQRhabUOOU3QppqqG4GlHTKN9YYBlJ+NgSzT4EGYZyZUNAH3gcILAhWgiL86d9LfdKcPe47d7jZYXvco5L0oTwHoduhbmXB7bDw9JdW5PoDP8gc94b0Gy211lJDngDVdocTNq9+3JJeG/SyQuiMu58E67hesQI9Eaazq52hji22g3HRjIXF0pn+46MO3Tgzyv947vlr6aU24/PCkQV/G1JE=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"c24a8bc7b2e5460997379040f6bbb35b"}, [
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
  '5805077e-a165-48d6-80d1-783d1b55dceb',
  'x-ms-request-id',
  '742ad031-4f07-4652-842d-3bebe55bde4f',
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
  'Wed, 28 Apr 2021 20:59:54 GMT',
  'Content-Length',
  '1346'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroCreateCertificateName-canresumefromastoppedpoller-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroCreateCertificateName-canresumefromastoppedpoller-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAo4j194+vy8hvLov0ltKVuK29/UL+Kmd885ZlurR65KBz6PyCnvNdeupr8iN0gfq4tVQ9ItokLACmMR+hsKlHldSEayQMxDM5/GG7TYOtU1PNqvGN99GITEwH02b1NuoNID0LK1klf1gL2n+KTWh1wKei7kcXTVEgG9GST1Z8Wq2jfTkEeekoW3xqyqOD9QQaE+2cOVDrDXeDpYAUqs6mgwnIxZ6BnpKXn20UcrvArXtkXl/1zvuXUPF/90taTykCa2YTsYMczMjw5qY72f5N/RSqQFIbH8A9G5eyHWElOWY4OmfUtOD5PmgkIFseXmD2grMsMfp2gC76pNO+wMwy+QIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAG4mhUZkdxniYndIADv85YO1KrOxefOVkyl7SymMBp9ZMIhGP5Lnpga5yVyGF05r7SCWkKLuATtbxluI4UB3prF8W7nN6KrfL0opX94rov/4iwJ+S58WK8GOcfrTr5MCGQRhabUOOU3QppqqG4GlHTKN9YYBlJ+NgSzT4EGYZyZUNAH3gcILAhWgiL86d9LfdKcPe47d7jZYXvco5L0oTwHoduhbmXB7bDw9JdW5PoDP8gc94b0Gy211lJDngDVdocTNq9+3JJeG/SyQuiMu58E67hesQI9Eaazq52hji22g3HRjIXF0pn+46MO3Tgzyv947vlr6aU24/PCkQV/G1JE=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"c24a8bc7b2e5460997379040f6bbb35b"}, [
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
  '26cbd83b-dd32-4d63-a180-413f875359ac',
  'x-ms-request-id',
  '442c02d7-e954-4668-ba21-c9f2baff81cc',
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
  'Wed, 28 Apr 2021 20:59:56 GMT',
  'Content-Length',
  '1346'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroCreateCertificateName-canresumefromastoppedpoller-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroCreateCertificateName-canresumefromastoppedpoller-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAo4j194+vy8hvLov0ltKVuK29/UL+Kmd885ZlurR65KBz6PyCnvNdeupr8iN0gfq4tVQ9ItokLACmMR+hsKlHldSEayQMxDM5/GG7TYOtU1PNqvGN99GITEwH02b1NuoNID0LK1klf1gL2n+KTWh1wKei7kcXTVEgG9GST1Z8Wq2jfTkEeekoW3xqyqOD9QQaE+2cOVDrDXeDpYAUqs6mgwnIxZ6BnpKXn20UcrvArXtkXl/1zvuXUPF/90taTykCa2YTsYMczMjw5qY72f5N/RSqQFIbH8A9G5eyHWElOWY4OmfUtOD5PmgkIFseXmD2grMsMfp2gC76pNO+wMwy+QIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAG4mhUZkdxniYndIADv85YO1KrOxefOVkyl7SymMBp9ZMIhGP5Lnpga5yVyGF05r7SCWkKLuATtbxluI4UB3prF8W7nN6KrfL0opX94rov/4iwJ+S58WK8GOcfrTr5MCGQRhabUOOU3QppqqG4GlHTKN9YYBlJ+NgSzT4EGYZyZUNAH3gcILAhWgiL86d9LfdKcPe47d7jZYXvco5L0oTwHoduhbmXB7bDw9JdW5PoDP8gc94b0Gy211lJDngDVdocTNq9+3JJeG/SyQuiMu58E67hesQI9Eaazq52hji22g3HRjIXF0pn+46MO3Tgzyv947vlr6aU24/PCkQV/G1JE=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"c24a8bc7b2e5460997379040f6bbb35b"}, [
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
  '9993ae6b-79fe-4ec2-bf0d-374ee6044413',
  'x-ms-request-id',
  '7df7620d-a9c8-4626-9473-87fb3c2494d8',
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
  'Wed, 28 Apr 2021 20:59:58 GMT',
  'Content-Length',
  '1346'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroCreateCertificateName-canresumefromastoppedpoller-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroCreateCertificateName-canresumefromastoppedpoller-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAo4j194+vy8hvLov0ltKVuK29/UL+Kmd885ZlurR65KBz6PyCnvNdeupr8iN0gfq4tVQ9ItokLACmMR+hsKlHldSEayQMxDM5/GG7TYOtU1PNqvGN99GITEwH02b1NuoNID0LK1klf1gL2n+KTWh1wKei7kcXTVEgG9GST1Z8Wq2jfTkEeekoW3xqyqOD9QQaE+2cOVDrDXeDpYAUqs6mgwnIxZ6BnpKXn20UcrvArXtkXl/1zvuXUPF/90taTykCa2YTsYMczMjw5qY72f5N/RSqQFIbH8A9G5eyHWElOWY4OmfUtOD5PmgkIFseXmD2grMsMfp2gC76pNO+wMwy+QIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAG4mhUZkdxniYndIADv85YO1KrOxefOVkyl7SymMBp9ZMIhGP5Lnpga5yVyGF05r7SCWkKLuATtbxluI4UB3prF8W7nN6KrfL0opX94rov/4iwJ+S58WK8GOcfrTr5MCGQRhabUOOU3QppqqG4GlHTKN9YYBlJ+NgSzT4EGYZyZUNAH3gcILAhWgiL86d9LfdKcPe47d7jZYXvco5L0oTwHoduhbmXB7bDw9JdW5PoDP8gc94b0Gy211lJDngDVdocTNq9+3JJeG/SyQuiMu58E67hesQI9Eaazq52hji22g3HRjIXF0pn+46MO3Tgzyv947vlr6aU24/PCkQV/G1JE=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"c24a8bc7b2e5460997379040f6bbb35b"}, [
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
  '19512324-eac3-4f91-843e-49f36cd00e42',
  'x-ms-request-id',
  '0075ae47-bf12-4d64-804d-3a2c28ac6e05',
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
  'Wed, 28 Apr 2021 21:00:01 GMT',
  'Content-Length',
  '1346'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroCreateCertificateName-canresumefromastoppedpoller-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroCreateCertificateName-canresumefromastoppedpoller-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAo4j194+vy8hvLov0ltKVuK29/UL+Kmd885ZlurR65KBz6PyCnvNdeupr8iN0gfq4tVQ9ItokLACmMR+hsKlHldSEayQMxDM5/GG7TYOtU1PNqvGN99GITEwH02b1NuoNID0LK1klf1gL2n+KTWh1wKei7kcXTVEgG9GST1Z8Wq2jfTkEeekoW3xqyqOD9QQaE+2cOVDrDXeDpYAUqs6mgwnIxZ6BnpKXn20UcrvArXtkXl/1zvuXUPF/90taTykCa2YTsYMczMjw5qY72f5N/RSqQFIbH8A9G5eyHWElOWY4OmfUtOD5PmgkIFseXmD2grMsMfp2gC76pNO+wMwy+QIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAG4mhUZkdxniYndIADv85YO1KrOxefOVkyl7SymMBp9ZMIhGP5Lnpga5yVyGF05r7SCWkKLuATtbxluI4UB3prF8W7nN6KrfL0opX94rov/4iwJ+S58WK8GOcfrTr5MCGQRhabUOOU3QppqqG4GlHTKN9YYBlJ+NgSzT4EGYZyZUNAH3gcILAhWgiL86d9LfdKcPe47d7jZYXvco5L0oTwHoduhbmXB7bDw9JdW5PoDP8gc94b0Gy211lJDngDVdocTNq9+3JJeG/SyQuiMu58E67hesQI9Eaazq52hji22g3HRjIXF0pn+46MO3Tgzyv947vlr6aU24/PCkQV/G1JE=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"c24a8bc7b2e5460997379040f6bbb35b"}, [
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
  '2ab5fd23-08f0-4349-9913-9b045e7dcbbc',
  'x-ms-request-id',
  '57afc6b6-c22b-4c66-95ec-546a2ea81c09',
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
  'Wed, 28 Apr 2021 21:00:03 GMT',
  'Content-Length',
  '1346'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroCreateCertificateName-canresumefromastoppedpoller-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroCreateCertificateName-canresumefromastoppedpoller-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAo4j194+vy8hvLov0ltKVuK29/UL+Kmd885ZlurR65KBz6PyCnvNdeupr8iN0gfq4tVQ9ItokLACmMR+hsKlHldSEayQMxDM5/GG7TYOtU1PNqvGN99GITEwH02b1NuoNID0LK1klf1gL2n+KTWh1wKei7kcXTVEgG9GST1Z8Wq2jfTkEeekoW3xqyqOD9QQaE+2cOVDrDXeDpYAUqs6mgwnIxZ6BnpKXn20UcrvArXtkXl/1zvuXUPF/90taTykCa2YTsYMczMjw5qY72f5N/RSqQFIbH8A9G5eyHWElOWY4OmfUtOD5PmgkIFseXmD2grMsMfp2gC76pNO+wMwy+QIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAG4mhUZkdxniYndIADv85YO1KrOxefOVkyl7SymMBp9ZMIhGP5Lnpga5yVyGF05r7SCWkKLuATtbxluI4UB3prF8W7nN6KrfL0opX94rov/4iwJ+S58WK8GOcfrTr5MCGQRhabUOOU3QppqqG4GlHTKN9YYBlJ+NgSzT4EGYZyZUNAH3gcILAhWgiL86d9LfdKcPe47d7jZYXvco5L0oTwHoduhbmXB7bDw9JdW5PoDP8gc94b0Gy211lJDngDVdocTNq9+3JJeG/SyQuiMu58E67hesQI9Eaazq52hji22g3HRjIXF0pn+46MO3Tgzyv947vlr6aU24/PCkQV/G1JE=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"c24a8bc7b2e5460997379040f6bbb35b"}, [
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
  '542e174b-1524-4dc5-9efe-344be2962902',
  'x-ms-request-id',
  'c0f9e5a7-5cf3-4bfd-a440-eca99b87b414',
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
  'Wed, 28 Apr 2021 21:00:05 GMT',
  'Content-Length',
  '1346'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroCreateCertificateName-canresumefromastoppedpoller-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroCreateCertificateName-canresumefromastoppedpoller-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAo4j194+vy8hvLov0ltKVuK29/UL+Kmd885ZlurR65KBz6PyCnvNdeupr8iN0gfq4tVQ9ItokLACmMR+hsKlHldSEayQMxDM5/GG7TYOtU1PNqvGN99GITEwH02b1NuoNID0LK1klf1gL2n+KTWh1wKei7kcXTVEgG9GST1Z8Wq2jfTkEeekoW3xqyqOD9QQaE+2cOVDrDXeDpYAUqs6mgwnIxZ6BnpKXn20UcrvArXtkXl/1zvuXUPF/90taTykCa2YTsYMczMjw5qY72f5N/RSqQFIbH8A9G5eyHWElOWY4OmfUtOD5PmgkIFseXmD2grMsMfp2gC76pNO+wMwy+QIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAG4mhUZkdxniYndIADv85YO1KrOxefOVkyl7SymMBp9ZMIhGP5Lnpga5yVyGF05r7SCWkKLuATtbxluI4UB3prF8W7nN6KrfL0opX94rov/4iwJ+S58WK8GOcfrTr5MCGQRhabUOOU3QppqqG4GlHTKN9YYBlJ+NgSzT4EGYZyZUNAH3gcILAhWgiL86d9LfdKcPe47d7jZYXvco5L0oTwHoduhbmXB7bDw9JdW5PoDP8gc94b0Gy211lJDngDVdocTNq9+3JJeG/SyQuiMu58E67hesQI9Eaazq52hji22g3HRjIXF0pn+46MO3Tgzyv947vlr6aU24/PCkQV/G1JE=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"c24a8bc7b2e5460997379040f6bbb35b"}, [
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
  'fc4f4261-faa4-41a9-9f74-98bb754ed65b',
  'x-ms-request-id',
  '67c2447e-529c-4c8f-ad26-efc0b7858fe6',
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
  'Wed, 28 Apr 2021 21:00:07 GMT',
  'Content-Length',
  '1346'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroCreateCertificateName-canresumefromastoppedpoller-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroCreateCertificateName-canresumefromastoppedpoller-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAo4j194+vy8hvLov0ltKVuK29/UL+Kmd885ZlurR65KBz6PyCnvNdeupr8iN0gfq4tVQ9ItokLACmMR+hsKlHldSEayQMxDM5/GG7TYOtU1PNqvGN99GITEwH02b1NuoNID0LK1klf1gL2n+KTWh1wKei7kcXTVEgG9GST1Z8Wq2jfTkEeekoW3xqyqOD9QQaE+2cOVDrDXeDpYAUqs6mgwnIxZ6BnpKXn20UcrvArXtkXl/1zvuXUPF/90taTykCa2YTsYMczMjw5qY72f5N/RSqQFIbH8A9G5eyHWElOWY4OmfUtOD5PmgkIFseXmD2grMsMfp2gC76pNO+wMwy+QIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAG4mhUZkdxniYndIADv85YO1KrOxefOVkyl7SymMBp9ZMIhGP5Lnpga5yVyGF05r7SCWkKLuATtbxluI4UB3prF8W7nN6KrfL0opX94rov/4iwJ+S58WK8GOcfrTr5MCGQRhabUOOU3QppqqG4GlHTKN9YYBlJ+NgSzT4EGYZyZUNAH3gcILAhWgiL86d9LfdKcPe47d7jZYXvco5L0oTwHoduhbmXB7bDw9JdW5PoDP8gc94b0Gy211lJDngDVdocTNq9+3JJeG/SyQuiMu58E67hesQI9Eaazq52hji22g3HRjIXF0pn+46MO3Tgzyv947vlr6aU24/PCkQV/G1JE=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"c24a8bc7b2e5460997379040f6bbb35b"}, [
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
  '9545f00d-afa9-46dc-a77e-bafea55fda3e',
  'x-ms-request-id',
  'a30b93c0-141a-4af7-8708-3a630ab3ef01',
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
  'Wed, 28 Apr 2021 21:00:09 GMT',
  'Content-Length',
  '1346'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroCreateCertificateName-canresumefromastoppedpoller-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroCreateCertificateName-canresumefromastoppedpoller-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAo4j194+vy8hvLov0ltKVuK29/UL+Kmd885ZlurR65KBz6PyCnvNdeupr8iN0gfq4tVQ9ItokLACmMR+hsKlHldSEayQMxDM5/GG7TYOtU1PNqvGN99GITEwH02b1NuoNID0LK1klf1gL2n+KTWh1wKei7kcXTVEgG9GST1Z8Wq2jfTkEeekoW3xqyqOD9QQaE+2cOVDrDXeDpYAUqs6mgwnIxZ6BnpKXn20UcrvArXtkXl/1zvuXUPF/90taTykCa2YTsYMczMjw5qY72f5N/RSqQFIbH8A9G5eyHWElOWY4OmfUtOD5PmgkIFseXmD2grMsMfp2gC76pNO+wMwy+QIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAG4mhUZkdxniYndIADv85YO1KrOxefOVkyl7SymMBp9ZMIhGP5Lnpga5yVyGF05r7SCWkKLuATtbxluI4UB3prF8W7nN6KrfL0opX94rov/4iwJ+S58WK8GOcfrTr5MCGQRhabUOOU3QppqqG4GlHTKN9YYBlJ+NgSzT4EGYZyZUNAH3gcILAhWgiL86d9LfdKcPe47d7jZYXvco5L0oTwHoduhbmXB7bDw9JdW5PoDP8gc94b0Gy211lJDngDVdocTNq9+3JJeG/SyQuiMu58E67hesQI9Eaazq52hji22g3HRjIXF0pn+46MO3Tgzyv947vlr6aU24/PCkQV/G1JE=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"c24a8bc7b2e5460997379040f6bbb35b"}, [
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
  '6601b061-29f6-4674-8558-fa5d19d99333',
  'x-ms-request-id',
  '65e8604c-2510-4783-8297-1afdd885f71d',
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
  'Wed, 28 Apr 2021 21:00:11 GMT',
  'Content-Length',
  '1346'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroCreateCertificateName-canresumefromastoppedpoller-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroCreateCertificateName-canresumefromastoppedpoller-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAo4j194+vy8hvLov0ltKVuK29/UL+Kmd885ZlurR65KBz6PyCnvNdeupr8iN0gfq4tVQ9ItokLACmMR+hsKlHldSEayQMxDM5/GG7TYOtU1PNqvGN99GITEwH02b1NuoNID0LK1klf1gL2n+KTWh1wKei7kcXTVEgG9GST1Z8Wq2jfTkEeekoW3xqyqOD9QQaE+2cOVDrDXeDpYAUqs6mgwnIxZ6BnpKXn20UcrvArXtkXl/1zvuXUPF/90taTykCa2YTsYMczMjw5qY72f5N/RSqQFIbH8A9G5eyHWElOWY4OmfUtOD5PmgkIFseXmD2grMsMfp2gC76pNO+wMwy+QIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAG4mhUZkdxniYndIADv85YO1KrOxefOVkyl7SymMBp9ZMIhGP5Lnpga5yVyGF05r7SCWkKLuATtbxluI4UB3prF8W7nN6KrfL0opX94rov/4iwJ+S58WK8GOcfrTr5MCGQRhabUOOU3QppqqG4GlHTKN9YYBlJ+NgSzT4EGYZyZUNAH3gcILAhWgiL86d9LfdKcPe47d7jZYXvco5L0oTwHoduhbmXB7bDw9JdW5PoDP8gc94b0Gy211lJDngDVdocTNq9+3JJeG/SyQuiMu58E67hesQI9Eaazq52hji22g3HRjIXF0pn+46MO3Tgzyv947vlr6aU24/PCkQV/G1JE=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"c24a8bc7b2e5460997379040f6bbb35b"}, [
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
  'b383afe8-cec6-4c01-ad94-adabdefefe1c',
  'x-ms-request-id',
  '0bdf3a73-249d-4c0e-8ecf-51c055d4318d',
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
  'Wed, 28 Apr 2021 21:00:14 GMT',
  'Content-Length',
  '1346'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroCreateCertificateName-canresumefromastoppedpoller-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroCreateCertificateName-canresumefromastoppedpoller-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAo4j194+vy8hvLov0ltKVuK29/UL+Kmd885ZlurR65KBz6PyCnvNdeupr8iN0gfq4tVQ9ItokLACmMR+hsKlHldSEayQMxDM5/GG7TYOtU1PNqvGN99GITEwH02b1NuoNID0LK1klf1gL2n+KTWh1wKei7kcXTVEgG9GST1Z8Wq2jfTkEeekoW3xqyqOD9QQaE+2cOVDrDXeDpYAUqs6mgwnIxZ6BnpKXn20UcrvArXtkXl/1zvuXUPF/90taTykCa2YTsYMczMjw5qY72f5N/RSqQFIbH8A9G5eyHWElOWY4OmfUtOD5PmgkIFseXmD2grMsMfp2gC76pNO+wMwy+QIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAG4mhUZkdxniYndIADv85YO1KrOxefOVkyl7SymMBp9ZMIhGP5Lnpga5yVyGF05r7SCWkKLuATtbxluI4UB3prF8W7nN6KrfL0opX94rov/4iwJ+S58WK8GOcfrTr5MCGQRhabUOOU3QppqqG4GlHTKN9YYBlJ+NgSzT4EGYZyZUNAH3gcILAhWgiL86d9LfdKcPe47d7jZYXvco5L0oTwHoduhbmXB7bDw9JdW5PoDP8gc94b0Gy211lJDngDVdocTNq9+3JJeG/SyQuiMu58E67hesQI9Eaazq52hji22g3HRjIXF0pn+46MO3Tgzyv947vlr6aU24/PCkQV/G1JE=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"c24a8bc7b2e5460997379040f6bbb35b"}, [
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
  'e2cbd68e-7f27-4dee-800a-a478025dc2f7',
  'x-ms-request-id',
  '26d5ad7f-068a-4072-a2b0-86b30e5f19ae',
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
  'Wed, 28 Apr 2021 21:00:15 GMT',
  'Content-Length',
  '1346'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroCreateCertificateName-canresumefromastoppedpoller-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroCreateCertificateName-canresumefromastoppedpoller-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAo4j194+vy8hvLov0ltKVuK29/UL+Kmd885ZlurR65KBz6PyCnvNdeupr8iN0gfq4tVQ9ItokLACmMR+hsKlHldSEayQMxDM5/GG7TYOtU1PNqvGN99GITEwH02b1NuoNID0LK1klf1gL2n+KTWh1wKei7kcXTVEgG9GST1Z8Wq2jfTkEeekoW3xqyqOD9QQaE+2cOVDrDXeDpYAUqs6mgwnIxZ6BnpKXn20UcrvArXtkXl/1zvuXUPF/90taTykCa2YTsYMczMjw5qY72f5N/RSqQFIbH8A9G5eyHWElOWY4OmfUtOD5PmgkIFseXmD2grMsMfp2gC76pNO+wMwy+QIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAG4mhUZkdxniYndIADv85YO1KrOxefOVkyl7SymMBp9ZMIhGP5Lnpga5yVyGF05r7SCWkKLuATtbxluI4UB3prF8W7nN6KrfL0opX94rov/4iwJ+S58WK8GOcfrTr5MCGQRhabUOOU3QppqqG4GlHTKN9YYBlJ+NgSzT4EGYZyZUNAH3gcILAhWgiL86d9LfdKcPe47d7jZYXvco5L0oTwHoduhbmXB7bDw9JdW5PoDP8gc94b0Gy211lJDngDVdocTNq9+3JJeG/SyQuiMu58E67hesQI9Eaazq52hji22g3HRjIXF0pn+46MO3Tgzyv947vlr6aU24/PCkQV/G1JE=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"c24a8bc7b2e5460997379040f6bbb35b"}, [
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
  '530635b0-8d3b-49a8-bcf5-5faa2f0d2f02',
  'x-ms-request-id',
  '674fad46-0aeb-4ac8-82ca-278bb08fb3a0',
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
  'Wed, 28 Apr 2021 21:00:17 GMT',
  'Content-Length',
  '1346'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroCreateCertificateName-canresumefromastoppedpoller-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroCreateCertificateName-canresumefromastoppedpoller-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAo4j194+vy8hvLov0ltKVuK29/UL+Kmd885ZlurR65KBz6PyCnvNdeupr8iN0gfq4tVQ9ItokLACmMR+hsKlHldSEayQMxDM5/GG7TYOtU1PNqvGN99GITEwH02b1NuoNID0LK1klf1gL2n+KTWh1wKei7kcXTVEgG9GST1Z8Wq2jfTkEeekoW3xqyqOD9QQaE+2cOVDrDXeDpYAUqs6mgwnIxZ6BnpKXn20UcrvArXtkXl/1zvuXUPF/90taTykCa2YTsYMczMjw5qY72f5N/RSqQFIbH8A9G5eyHWElOWY4OmfUtOD5PmgkIFseXmD2grMsMfp2gC76pNO+wMwy+QIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAG4mhUZkdxniYndIADv85YO1KrOxefOVkyl7SymMBp9ZMIhGP5Lnpga5yVyGF05r7SCWkKLuATtbxluI4UB3prF8W7nN6KrfL0opX94rov/4iwJ+S58WK8GOcfrTr5MCGQRhabUOOU3QppqqG4GlHTKN9YYBlJ+NgSzT4EGYZyZUNAH3gcILAhWgiL86d9LfdKcPe47d7jZYXvco5L0oTwHoduhbmXB7bDw9JdW5PoDP8gc94b0Gy211lJDngDVdocTNq9+3JJeG/SyQuiMu58E67hesQI9Eaazq52hji22g3HRjIXF0pn+46MO3Tgzyv947vlr6aU24/PCkQV/G1JE=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"c24a8bc7b2e5460997379040f6bbb35b"}, [
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
  'e91ccaeb-9908-4aae-824b-0a0cd09135b0',
  'x-ms-request-id',
  'f57d1ab0-4631-4d83-913a-ccbe012643da',
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
  'Wed, 28 Apr 2021 21:00:20 GMT',
  'Content-Length',
  '1346'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroCreateCertificateName-canresumefromastoppedpoller-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroCreateCertificateName-canresumefromastoppedpoller-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAo4j194+vy8hvLov0ltKVuK29/UL+Kmd885ZlurR65KBz6PyCnvNdeupr8iN0gfq4tVQ9ItokLACmMR+hsKlHldSEayQMxDM5/GG7TYOtU1PNqvGN99GITEwH02b1NuoNID0LK1klf1gL2n+KTWh1wKei7kcXTVEgG9GST1Z8Wq2jfTkEeekoW3xqyqOD9QQaE+2cOVDrDXeDpYAUqs6mgwnIxZ6BnpKXn20UcrvArXtkXl/1zvuXUPF/90taTykCa2YTsYMczMjw5qY72f5N/RSqQFIbH8A9G5eyHWElOWY4OmfUtOD5PmgkIFseXmD2grMsMfp2gC76pNO+wMwy+QIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAG4mhUZkdxniYndIADv85YO1KrOxefOVkyl7SymMBp9ZMIhGP5Lnpga5yVyGF05r7SCWkKLuATtbxluI4UB3prF8W7nN6KrfL0opX94rov/4iwJ+S58WK8GOcfrTr5MCGQRhabUOOU3QppqqG4GlHTKN9YYBlJ+NgSzT4EGYZyZUNAH3gcILAhWgiL86d9LfdKcPe47d7jZYXvco5L0oTwHoduhbmXB7bDw9JdW5PoDP8gc94b0Gy211lJDngDVdocTNq9+3JJeG/SyQuiMu58E67hesQI9Eaazq52hji22g3HRjIXF0pn+46MO3Tgzyv947vlr6aU24/PCkQV/G1JE=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"c24a8bc7b2e5460997379040f6bbb35b"}, [
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
  '9f31c168-4b05-4723-89f9-f95feb310b39',
  'x-ms-request-id',
  '8d5f72b5-dbf6-42f5-a37f-bec1fe411818',
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
  'Wed, 28 Apr 2021 21:00:22 GMT',
  'Content-Length',
  '1346'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroCreateCertificateName-canresumefromastoppedpoller-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroCreateCertificateName-canresumefromastoppedpoller-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAo4j194+vy8hvLov0ltKVuK29/UL+Kmd885ZlurR65KBz6PyCnvNdeupr8iN0gfq4tVQ9ItokLACmMR+hsKlHldSEayQMxDM5/GG7TYOtU1PNqvGN99GITEwH02b1NuoNID0LK1klf1gL2n+KTWh1wKei7kcXTVEgG9GST1Z8Wq2jfTkEeekoW3xqyqOD9QQaE+2cOVDrDXeDpYAUqs6mgwnIxZ6BnpKXn20UcrvArXtkXl/1zvuXUPF/90taTykCa2YTsYMczMjw5qY72f5N/RSqQFIbH8A9G5eyHWElOWY4OmfUtOD5PmgkIFseXmD2grMsMfp2gC76pNO+wMwy+QIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAG4mhUZkdxniYndIADv85YO1KrOxefOVkyl7SymMBp9ZMIhGP5Lnpga5yVyGF05r7SCWkKLuATtbxluI4UB3prF8W7nN6KrfL0opX94rov/4iwJ+S58WK8GOcfrTr5MCGQRhabUOOU3QppqqG4GlHTKN9YYBlJ+NgSzT4EGYZyZUNAH3gcILAhWgiL86d9LfdKcPe47d7jZYXvco5L0oTwHoduhbmXB7bDw9JdW5PoDP8gc94b0Gy211lJDngDVdocTNq9+3JJeG/SyQuiMu58E67hesQI9Eaazq52hji22g3HRjIXF0pn+46MO3Tgzyv947vlr6aU24/PCkQV/G1JE=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"c24a8bc7b2e5460997379040f6bbb35b"}, [
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
  '8393bbc2-ecd8-4584-a58c-8f2d08a13fcd',
  'x-ms-request-id',
  '1af41857-fe09-469d-8479-1eda31dc0263',
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
  'Wed, 28 Apr 2021 21:00:24 GMT',
  'Content-Length',
  '1346'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroCreateCertificateName-canresumefromastoppedpoller-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroCreateCertificateName-canresumefromastoppedpoller-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAo4j194+vy8hvLov0ltKVuK29/UL+Kmd885ZlurR65KBz6PyCnvNdeupr8iN0gfq4tVQ9ItokLACmMR+hsKlHldSEayQMxDM5/GG7TYOtU1PNqvGN99GITEwH02b1NuoNID0LK1klf1gL2n+KTWh1wKei7kcXTVEgG9GST1Z8Wq2jfTkEeekoW3xqyqOD9QQaE+2cOVDrDXeDpYAUqs6mgwnIxZ6BnpKXn20UcrvArXtkXl/1zvuXUPF/90taTykCa2YTsYMczMjw5qY72f5N/RSqQFIbH8A9G5eyHWElOWY4OmfUtOD5PmgkIFseXmD2grMsMfp2gC76pNO+wMwy+QIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAG4mhUZkdxniYndIADv85YO1KrOxefOVkyl7SymMBp9ZMIhGP5Lnpga5yVyGF05r7SCWkKLuATtbxluI4UB3prF8W7nN6KrfL0opX94rov/4iwJ+S58WK8GOcfrTr5MCGQRhabUOOU3QppqqG4GlHTKN9YYBlJ+NgSzT4EGYZyZUNAH3gcILAhWgiL86d9LfdKcPe47d7jZYXvco5L0oTwHoduhbmXB7bDw9JdW5PoDP8gc94b0Gy211lJDngDVdocTNq9+3JJeG/SyQuiMu58E67hesQI9Eaazq52hji22g3HRjIXF0pn+46MO3Tgzyv947vlr6aU24/PCkQV/G1JE=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"c24a8bc7b2e5460997379040f6bbb35b"}, [
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
  'f990e62b-ec8e-4e24-a6fe-a48f8a97ac4b',
  'x-ms-request-id',
  '04a070c6-50c1-4b9d-91d7-e3c531284fd6',
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
  'Wed, 28 Apr 2021 21:00:26 GMT',
  'Content-Length',
  '1346'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroCreateCertificateName-canresumefromastoppedpoller-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroCreateCertificateName-canresumefromastoppedpoller-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAo4j194+vy8hvLov0ltKVuK29/UL+Kmd885ZlurR65KBz6PyCnvNdeupr8iN0gfq4tVQ9ItokLACmMR+hsKlHldSEayQMxDM5/GG7TYOtU1PNqvGN99GITEwH02b1NuoNID0LK1klf1gL2n+KTWh1wKei7kcXTVEgG9GST1Z8Wq2jfTkEeekoW3xqyqOD9QQaE+2cOVDrDXeDpYAUqs6mgwnIxZ6BnpKXn20UcrvArXtkXl/1zvuXUPF/90taTykCa2YTsYMczMjw5qY72f5N/RSqQFIbH8A9G5eyHWElOWY4OmfUtOD5PmgkIFseXmD2grMsMfp2gC76pNO+wMwy+QIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAG4mhUZkdxniYndIADv85YO1KrOxefOVkyl7SymMBp9ZMIhGP5Lnpga5yVyGF05r7SCWkKLuATtbxluI4UB3prF8W7nN6KrfL0opX94rov/4iwJ+S58WK8GOcfrTr5MCGQRhabUOOU3QppqqG4GlHTKN9YYBlJ+NgSzT4EGYZyZUNAH3gcILAhWgiL86d9LfdKcPe47d7jZYXvco5L0oTwHoduhbmXB7bDw9JdW5PoDP8gc94b0Gy211lJDngDVdocTNq9+3JJeG/SyQuiMu58E67hesQI9Eaazq52hji22g3HRjIXF0pn+46MO3Tgzyv947vlr6aU24/PCkQV/G1JE=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"c24a8bc7b2e5460997379040f6bbb35b"}, [
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
  '764c4b02-3904-4a5d-ad31-8469a0792d19',
  'x-ms-request-id',
  '8c464eed-8e43-4fe5-a6e7-a77e91559099',
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
  'Wed, 28 Apr 2021 21:00:28 GMT',
  'Content-Length',
  '1346'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroCreateCertificateName-canresumefromastoppedpoller-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroCreateCertificateName-canresumefromastoppedpoller-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAo4j194+vy8hvLov0ltKVuK29/UL+Kmd885ZlurR65KBz6PyCnvNdeupr8iN0gfq4tVQ9ItokLACmMR+hsKlHldSEayQMxDM5/GG7TYOtU1PNqvGN99GITEwH02b1NuoNID0LK1klf1gL2n+KTWh1wKei7kcXTVEgG9GST1Z8Wq2jfTkEeekoW3xqyqOD9QQaE+2cOVDrDXeDpYAUqs6mgwnIxZ6BnpKXn20UcrvArXtkXl/1zvuXUPF/90taTykCa2YTsYMczMjw5qY72f5N/RSqQFIbH8A9G5eyHWElOWY4OmfUtOD5PmgkIFseXmD2grMsMfp2gC76pNO+wMwy+QIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAG4mhUZkdxniYndIADv85YO1KrOxefOVkyl7SymMBp9ZMIhGP5Lnpga5yVyGF05r7SCWkKLuATtbxluI4UB3prF8W7nN6KrfL0opX94rov/4iwJ+S58WK8GOcfrTr5MCGQRhabUOOU3QppqqG4GlHTKN9YYBlJ+NgSzT4EGYZyZUNAH3gcILAhWgiL86d9LfdKcPe47d7jZYXvco5L0oTwHoduhbmXB7bDw9JdW5PoDP8gc94b0Gy211lJDngDVdocTNq9+3JJeG/SyQuiMu58E67hesQI9Eaazq52hji22g3HRjIXF0pn+46MO3Tgzyv947vlr6aU24/PCkQV/G1JE=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"c24a8bc7b2e5460997379040f6bbb35b"}, [
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
  '81a303b6-a9b0-4a0b-9e5e-a84fa24b4f4d',
  'x-ms-request-id',
  'bae3d2d3-3e4e-4515-a8c7-942fb5992c8a',
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
  'Wed, 28 Apr 2021 21:00:30 GMT',
  'Content-Length',
  '1346'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroCreateCertificateName-canresumefromastoppedpoller-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroCreateCertificateName-canresumefromastoppedpoller-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAo4j194+vy8hvLov0ltKVuK29/UL+Kmd885ZlurR65KBz6PyCnvNdeupr8iN0gfq4tVQ9ItokLACmMR+hsKlHldSEayQMxDM5/GG7TYOtU1PNqvGN99GITEwH02b1NuoNID0LK1klf1gL2n+KTWh1wKei7kcXTVEgG9GST1Z8Wq2jfTkEeekoW3xqyqOD9QQaE+2cOVDrDXeDpYAUqs6mgwnIxZ6BnpKXn20UcrvArXtkXl/1zvuXUPF/90taTykCa2YTsYMczMjw5qY72f5N/RSqQFIbH8A9G5eyHWElOWY4OmfUtOD5PmgkIFseXmD2grMsMfp2gC76pNO+wMwy+QIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAG4mhUZkdxniYndIADv85YO1KrOxefOVkyl7SymMBp9ZMIhGP5Lnpga5yVyGF05r7SCWkKLuATtbxluI4UB3prF8W7nN6KrfL0opX94rov/4iwJ+S58WK8GOcfrTr5MCGQRhabUOOU3QppqqG4GlHTKN9YYBlJ+NgSzT4EGYZyZUNAH3gcILAhWgiL86d9LfdKcPe47d7jZYXvco5L0oTwHoduhbmXB7bDw9JdW5PoDP8gc94b0Gy211lJDngDVdocTNq9+3JJeG/SyQuiMu58E67hesQI9Eaazq52hji22g3HRjIXF0pn+46MO3Tgzyv947vlr6aU24/PCkQV/G1JE=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"c24a8bc7b2e5460997379040f6bbb35b"}, [
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
  '8206d4b5-31e9-46d2-addd-2d7ed228195a',
  'x-ms-request-id',
  '15b3a324-a35b-4e1b-881d-f3786ca4241e',
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
  'Wed, 28 Apr 2021 21:00:32 GMT',
  'Content-Length',
  '1346'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroCreateCertificateName-canresumefromastoppedpoller-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroCreateCertificateName-canresumefromastoppedpoller-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAo4j194+vy8hvLov0ltKVuK29/UL+Kmd885ZlurR65KBz6PyCnvNdeupr8iN0gfq4tVQ9ItokLACmMR+hsKlHldSEayQMxDM5/GG7TYOtU1PNqvGN99GITEwH02b1NuoNID0LK1klf1gL2n+KTWh1wKei7kcXTVEgG9GST1Z8Wq2jfTkEeekoW3xqyqOD9QQaE+2cOVDrDXeDpYAUqs6mgwnIxZ6BnpKXn20UcrvArXtkXl/1zvuXUPF/90taTykCa2YTsYMczMjw5qY72f5N/RSqQFIbH8A9G5eyHWElOWY4OmfUtOD5PmgkIFseXmD2grMsMfp2gC76pNO+wMwy+QIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAG4mhUZkdxniYndIADv85YO1KrOxefOVkyl7SymMBp9ZMIhGP5Lnpga5yVyGF05r7SCWkKLuATtbxluI4UB3prF8W7nN6KrfL0opX94rov/4iwJ+S58WK8GOcfrTr5MCGQRhabUOOU3QppqqG4GlHTKN9YYBlJ+NgSzT4EGYZyZUNAH3gcILAhWgiL86d9LfdKcPe47d7jZYXvco5L0oTwHoduhbmXB7bDw9JdW5PoDP8gc94b0Gy211lJDngDVdocTNq9+3JJeG/SyQuiMu58E67hesQI9Eaazq52hji22g3HRjIXF0pn+46MO3Tgzyv947vlr6aU24/PCkQV/G1JE=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"c24a8bc7b2e5460997379040f6bbb35b"}, [
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
  '2854d974-9bae-427a-a8b9-574bc8a78cca',
  'x-ms-request-id',
  '9a81eff3-a5aa-48d6-9313-0feb08397af3',
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
  'Wed, 28 Apr 2021 21:00:34 GMT',
  'Content-Length',
  '1346'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroCreateCertificateName-canresumefromastoppedpoller-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroCreateCertificateName-canresumefromastoppedpoller-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAo4j194+vy8hvLov0ltKVuK29/UL+Kmd885ZlurR65KBz6PyCnvNdeupr8iN0gfq4tVQ9ItokLACmMR+hsKlHldSEayQMxDM5/GG7TYOtU1PNqvGN99GITEwH02b1NuoNID0LK1klf1gL2n+KTWh1wKei7kcXTVEgG9GST1Z8Wq2jfTkEeekoW3xqyqOD9QQaE+2cOVDrDXeDpYAUqs6mgwnIxZ6BnpKXn20UcrvArXtkXl/1zvuXUPF/90taTykCa2YTsYMczMjw5qY72f5N/RSqQFIbH8A9G5eyHWElOWY4OmfUtOD5PmgkIFseXmD2grMsMfp2gC76pNO+wMwy+QIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAG4mhUZkdxniYndIADv85YO1KrOxefOVkyl7SymMBp9ZMIhGP5Lnpga5yVyGF05r7SCWkKLuATtbxluI4UB3prF8W7nN6KrfL0opX94rov/4iwJ+S58WK8GOcfrTr5MCGQRhabUOOU3QppqqG4GlHTKN9YYBlJ+NgSzT4EGYZyZUNAH3gcILAhWgiL86d9LfdKcPe47d7jZYXvco5L0oTwHoduhbmXB7bDw9JdW5PoDP8gc94b0Gy211lJDngDVdocTNq9+3JJeG/SyQuiMu58E67hesQI9Eaazq52hji22g3HRjIXF0pn+46MO3Tgzyv947vlr6aU24/PCkQV/G1JE=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"c24a8bc7b2e5460997379040f6bbb35b"}, [
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
  'e0508489-7944-4c49-af8e-6c2a69229e74',
  'x-ms-request-id',
  'b3a0d557-642d-43fc-9ae6-4b8d12fcf891',
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
  'Wed, 28 Apr 2021 21:00:36 GMT',
  'Content-Length',
  '1346'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroCreateCertificateName-canresumefromastoppedpoller-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroCreateCertificateName-canresumefromastoppedpoller-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAo4j194+vy8hvLov0ltKVuK29/UL+Kmd885ZlurR65KBz6PyCnvNdeupr8iN0gfq4tVQ9ItokLACmMR+hsKlHldSEayQMxDM5/GG7TYOtU1PNqvGN99GITEwH02b1NuoNID0LK1klf1gL2n+KTWh1wKei7kcXTVEgG9GST1Z8Wq2jfTkEeekoW3xqyqOD9QQaE+2cOVDrDXeDpYAUqs6mgwnIxZ6BnpKXn20UcrvArXtkXl/1zvuXUPF/90taTykCa2YTsYMczMjw5qY72f5N/RSqQFIbH8A9G5eyHWElOWY4OmfUtOD5PmgkIFseXmD2grMsMfp2gC76pNO+wMwy+QIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAG4mhUZkdxniYndIADv85YO1KrOxefOVkyl7SymMBp9ZMIhGP5Lnpga5yVyGF05r7SCWkKLuATtbxluI4UB3prF8W7nN6KrfL0opX94rov/4iwJ+S58WK8GOcfrTr5MCGQRhabUOOU3QppqqG4GlHTKN9YYBlJ+NgSzT4EGYZyZUNAH3gcILAhWgiL86d9LfdKcPe47d7jZYXvco5L0oTwHoduhbmXB7bDw9JdW5PoDP8gc94b0Gy211lJDngDVdocTNq9+3JJeG/SyQuiMu58E67hesQI9Eaazq52hji22g3HRjIXF0pn+46MO3Tgzyv947vlr6aU24/PCkQV/G1JE=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"c24a8bc7b2e5460997379040f6bbb35b"}, [
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
  'a7984a01-ad04-4d9a-be48-b370c5aa1a29',
  'x-ms-request-id',
  'db9b7fb1-19f3-4ab9-98d5-9e3e3e000d19',
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
  'Wed, 28 Apr 2021 21:00:39 GMT',
  'Content-Length',
  '1346'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroCreateCertificateName-canresumefromastoppedpoller-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroCreateCertificateName-canresumefromastoppedpoller-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAo4j194+vy8hvLov0ltKVuK29/UL+Kmd885ZlurR65KBz6PyCnvNdeupr8iN0gfq4tVQ9ItokLACmMR+hsKlHldSEayQMxDM5/GG7TYOtU1PNqvGN99GITEwH02b1NuoNID0LK1klf1gL2n+KTWh1wKei7kcXTVEgG9GST1Z8Wq2jfTkEeekoW3xqyqOD9QQaE+2cOVDrDXeDpYAUqs6mgwnIxZ6BnpKXn20UcrvArXtkXl/1zvuXUPF/90taTykCa2YTsYMczMjw5qY72f5N/RSqQFIbH8A9G5eyHWElOWY4OmfUtOD5PmgkIFseXmD2grMsMfp2gC76pNO+wMwy+QIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAG4mhUZkdxniYndIADv85YO1KrOxefOVkyl7SymMBp9ZMIhGP5Lnpga5yVyGF05r7SCWkKLuATtbxluI4UB3prF8W7nN6KrfL0opX94rov/4iwJ+S58WK8GOcfrTr5MCGQRhabUOOU3QppqqG4GlHTKN9YYBlJ+NgSzT4EGYZyZUNAH3gcILAhWgiL86d9LfdKcPe47d7jZYXvco5L0oTwHoduhbmXB7bDw9JdW5PoDP8gc94b0Gy211lJDngDVdocTNq9+3JJeG/SyQuiMu58E67hesQI9Eaazq52hji22g3HRjIXF0pn+46MO3Tgzyv947vlr6aU24/PCkQV/G1JE=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"c24a8bc7b2e5460997379040f6bbb35b"}, [
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
  '8944d30d-a84b-4647-8176-63aa2e2c2614',
  'x-ms-request-id',
  '07562d55-9066-4a16-9a75-0cc441d94a47',
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
  'Wed, 28 Apr 2021 21:00:41 GMT',
  'Content-Length',
  '1346'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroCreateCertificateName-canresumefromastoppedpoller-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroCreateCertificateName-canresumefromastoppedpoller-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAo4j194+vy8hvLov0ltKVuK29/UL+Kmd885ZlurR65KBz6PyCnvNdeupr8iN0gfq4tVQ9ItokLACmMR+hsKlHldSEayQMxDM5/GG7TYOtU1PNqvGN99GITEwH02b1NuoNID0LK1klf1gL2n+KTWh1wKei7kcXTVEgG9GST1Z8Wq2jfTkEeekoW3xqyqOD9QQaE+2cOVDrDXeDpYAUqs6mgwnIxZ6BnpKXn20UcrvArXtkXl/1zvuXUPF/90taTykCa2YTsYMczMjw5qY72f5N/RSqQFIbH8A9G5eyHWElOWY4OmfUtOD5PmgkIFseXmD2grMsMfp2gC76pNO+wMwy+QIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAG4mhUZkdxniYndIADv85YO1KrOxefOVkyl7SymMBp9ZMIhGP5Lnpga5yVyGF05r7SCWkKLuATtbxluI4UB3prF8W7nN6KrfL0opX94rov/4iwJ+S58WK8GOcfrTr5MCGQRhabUOOU3QppqqG4GlHTKN9YYBlJ+NgSzT4EGYZyZUNAH3gcILAhWgiL86d9LfdKcPe47d7jZYXvco5L0oTwHoduhbmXB7bDw9JdW5PoDP8gc94b0Gy211lJDngDVdocTNq9+3JJeG/SyQuiMu58E67hesQI9Eaazq52hji22g3HRjIXF0pn+46MO3Tgzyv947vlr6aU24/PCkQV/G1JE=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"c24a8bc7b2e5460997379040f6bbb35b"}, [
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
  '7eafe9ed-2a46-4e66-8c61-f3d72014e532',
  'x-ms-request-id',
  '5fffb665-875d-4629-8ddb-8361b6c797d3',
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
  'Wed, 28 Apr 2021 21:00:43 GMT',
  'Content-Length',
  '1346'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroCreateCertificateName-canresumefromastoppedpoller-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroCreateCertificateName-canresumefromastoppedpoller-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAo4j194+vy8hvLov0ltKVuK29/UL+Kmd885ZlurR65KBz6PyCnvNdeupr8iN0gfq4tVQ9ItokLACmMR+hsKlHldSEayQMxDM5/GG7TYOtU1PNqvGN99GITEwH02b1NuoNID0LK1klf1gL2n+KTWh1wKei7kcXTVEgG9GST1Z8Wq2jfTkEeekoW3xqyqOD9QQaE+2cOVDrDXeDpYAUqs6mgwnIxZ6BnpKXn20UcrvArXtkXl/1zvuXUPF/90taTykCa2YTsYMczMjw5qY72f5N/RSqQFIbH8A9G5eyHWElOWY4OmfUtOD5PmgkIFseXmD2grMsMfp2gC76pNO+wMwy+QIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAG4mhUZkdxniYndIADv85YO1KrOxefOVkyl7SymMBp9ZMIhGP5Lnpga5yVyGF05r7SCWkKLuATtbxluI4UB3prF8W7nN6KrfL0opX94rov/4iwJ+S58WK8GOcfrTr5MCGQRhabUOOU3QppqqG4GlHTKN9YYBlJ+NgSzT4EGYZyZUNAH3gcILAhWgiL86d9LfdKcPe47d7jZYXvco5L0oTwHoduhbmXB7bDw9JdW5PoDP8gc94b0Gy211lJDngDVdocTNq9+3JJeG/SyQuiMu58E67hesQI9Eaazq52hji22g3HRjIXF0pn+46MO3Tgzyv947vlr6aU24/PCkQV/G1JE=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"c24a8bc7b2e5460997379040f6bbb35b"}, [
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
  'ae826bc7-4819-4c2a-8c17-bc7bfdf700d9',
  'x-ms-request-id',
  '2c7190c9-6e59-4a45-a1d8-4a87483fb2d9',
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
  'Wed, 28 Apr 2021 21:00:45 GMT',
  'Content-Length',
  '1346'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroCreateCertificateName-canresumefromastoppedpoller-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroCreateCertificateName-canresumefromastoppedpoller-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAo4j194+vy8hvLov0ltKVuK29/UL+Kmd885ZlurR65KBz6PyCnvNdeupr8iN0gfq4tVQ9ItokLACmMR+hsKlHldSEayQMxDM5/GG7TYOtU1PNqvGN99GITEwH02b1NuoNID0LK1klf1gL2n+KTWh1wKei7kcXTVEgG9GST1Z8Wq2jfTkEeekoW3xqyqOD9QQaE+2cOVDrDXeDpYAUqs6mgwnIxZ6BnpKXn20UcrvArXtkXl/1zvuXUPF/90taTykCa2YTsYMczMjw5qY72f5N/RSqQFIbH8A9G5eyHWElOWY4OmfUtOD5PmgkIFseXmD2grMsMfp2gC76pNO+wMwy+QIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAG4mhUZkdxniYndIADv85YO1KrOxefOVkyl7SymMBp9ZMIhGP5Lnpga5yVyGF05r7SCWkKLuATtbxluI4UB3prF8W7nN6KrfL0opX94rov/4iwJ+S58WK8GOcfrTr5MCGQRhabUOOU3QppqqG4GlHTKN9YYBlJ+NgSzT4EGYZyZUNAH3gcILAhWgiL86d9LfdKcPe47d7jZYXvco5L0oTwHoduhbmXB7bDw9JdW5PoDP8gc94b0Gy211lJDngDVdocTNq9+3JJeG/SyQuiMu58E67hesQI9Eaazq52hji22g3HRjIXF0pn+46MO3Tgzyv947vlr6aU24/PCkQV/G1JE=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"c24a8bc7b2e5460997379040f6bbb35b"}, [
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
  '751ad182-67ac-4940-9ff9-0eeebe14bdac',
  'x-ms-request-id',
  '2f2659bb-83f9-4ad0-95bb-222af23ac9bc',
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
  'Wed, 28 Apr 2021 21:00:47 GMT',
  'Content-Length',
  '1346'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroCreateCertificateName-canresumefromastoppedpoller-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroCreateCertificateName-canresumefromastoppedpoller-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAo4j194+vy8hvLov0ltKVuK29/UL+Kmd885ZlurR65KBz6PyCnvNdeupr8iN0gfq4tVQ9ItokLACmMR+hsKlHldSEayQMxDM5/GG7TYOtU1PNqvGN99GITEwH02b1NuoNID0LK1klf1gL2n+KTWh1wKei7kcXTVEgG9GST1Z8Wq2jfTkEeekoW3xqyqOD9QQaE+2cOVDrDXeDpYAUqs6mgwnIxZ6BnpKXn20UcrvArXtkXl/1zvuXUPF/90taTykCa2YTsYMczMjw5qY72f5N/RSqQFIbH8A9G5eyHWElOWY4OmfUtOD5PmgkIFseXmD2grMsMfp2gC76pNO+wMwy+QIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAG4mhUZkdxniYndIADv85YO1KrOxefOVkyl7SymMBp9ZMIhGP5Lnpga5yVyGF05r7SCWkKLuATtbxluI4UB3prF8W7nN6KrfL0opX94rov/4iwJ+S58WK8GOcfrTr5MCGQRhabUOOU3QppqqG4GlHTKN9YYBlJ+NgSzT4EGYZyZUNAH3gcILAhWgiL86d9LfdKcPe47d7jZYXvco5L0oTwHoduhbmXB7bDw9JdW5PoDP8gc94b0Gy211lJDngDVdocTNq9+3JJeG/SyQuiMu58E67hesQI9Eaazq52hji22g3HRjIXF0pn+46MO3Tgzyv947vlr6aU24/PCkQV/G1JE=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"c24a8bc7b2e5460997379040f6bbb35b"}, [
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
  '5f480c2e-a004-45bf-b870-4f7bcd3b4139',
  'x-ms-request-id',
  '20a851d7-2265-4879-9c8a-d47173ba6e02',
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
  'Wed, 28 Apr 2021 21:00:49 GMT',
  'Content-Length',
  '1346'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroCreateCertificateName-canresumefromastoppedpoller-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroCreateCertificateName-canresumefromastoppedpoller-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAo4j194+vy8hvLov0ltKVuK29/UL+Kmd885ZlurR65KBz6PyCnvNdeupr8iN0gfq4tVQ9ItokLACmMR+hsKlHldSEayQMxDM5/GG7TYOtU1PNqvGN99GITEwH02b1NuoNID0LK1klf1gL2n+KTWh1wKei7kcXTVEgG9GST1Z8Wq2jfTkEeekoW3xqyqOD9QQaE+2cOVDrDXeDpYAUqs6mgwnIxZ6BnpKXn20UcrvArXtkXl/1zvuXUPF/90taTykCa2YTsYMczMjw5qY72f5N/RSqQFIbH8A9G5eyHWElOWY4OmfUtOD5PmgkIFseXmD2grMsMfp2gC76pNO+wMwy+QIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAG4mhUZkdxniYndIADv85YO1KrOxefOVkyl7SymMBp9ZMIhGP5Lnpga5yVyGF05r7SCWkKLuATtbxluI4UB3prF8W7nN6KrfL0opX94rov/4iwJ+S58WK8GOcfrTr5MCGQRhabUOOU3QppqqG4GlHTKN9YYBlJ+NgSzT4EGYZyZUNAH3gcILAhWgiL86d9LfdKcPe47d7jZYXvco5L0oTwHoduhbmXB7bDw9JdW5PoDP8gc94b0Gy211lJDngDVdocTNq9+3JJeG/SyQuiMu58E67hesQI9Eaazq52hji22g3HRjIXF0pn+46MO3Tgzyv947vlr6aU24/PCkQV/G1JE=","cancellation_requested":false,"status":"completed","target":"https://keyvault_name.vault.azure.net/certificates/lroCreateCertificateName-canresumefromastoppedpoller-","request_id":"c24a8bc7b2e5460997379040f6bbb35b"}, [
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
  '462b09c9-6489-419b-b1f3-df5013052134',
  'x-ms-request-id',
  'af1a2140-1e79-4181-bf88-e72c720c2f71',
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
  'Wed, 28 Apr 2021 21:00:51 GMT',
  'Content-Length',
  '1319'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroCreateCertificateName-canresumefromastoppedpoller-/')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroCreateCertificateName-canresumefromastoppedpoller-/7081fd92df6c43cab3b12bc9f6e9034b","kid":"https://keyvault_name.vault.azure.net/keys/lroCreateCertificateName-canresumefromastoppedpoller-/7081fd92df6c43cab3b12bc9f6e9034b","sid":"https://keyvault_name.vault.azure.net/secrets/lroCreateCertificateName-canresumefromastoppedpoller-/7081fd92df6c43cab3b12bc9f6e9034b","x5t":"pEwJMrf7vGms98vMddXOlswwzAI","cer":"MIIDKDCCAhCgAwIBAgIQGtoVO+W4TPul6TVtXO5SkTANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjEwNDI4MjA1MDQ5WhcNMjIwNDI4MjEwMDQ5WjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQCjiPX3j6/LyG8ui/SW0pW4rb39Qv4qZ3zzlmW6tHrkoHPo/IKe81166mvyI3SB+ri1VD0i2iQsAKYxH6GwqUeV1IRrJAzEMzn8YbtNg61TU82q8Y330YhMTAfTZvU26g0gPQsrWSV/WAvaf4pNaHXAp6LuRxdNUSAb0ZJPVnxaraN9OQR56ShbfGrKo4P1BBoT7Zw5UOsNd4OlgBSqzqaDCcjFnoGekpefbRRyu8Cte2ReX/XO+5dQ8X/3S1pPKQJrZhOxgxzMyPDmpjvZ/k39FKpAUhsfwD0bl7IdYSU5Zjg6Z9S04Pk+aCQgWx5eYPaCsywx+naALvqk077AzDL5AgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBQ9keNvLdbLDvuFIHO3ETIQrkmtpDAdBgNVHQ4EFgQUPZHjby3Wyw77hSBztxEyEK5JraQwDQYJKoZIhvcNAQELBQADggEBAHZ9ilKLC0d2YBD0p9Vs3jmbApL+zY45fJjQefmBxRq2yQbydo3iQROENQCdna3BYgiYDxtQSwvketWxxcqOMMMJn+QJnT0dP3XK8XdJnPK/DkfgxQFmGT+BZ8cQSIIhLnumxT8AFQo6jlnyhIFldmd5ty1ayGk4y8TVeJJapJylCO+d7x0xi5z3dqDpAxyTrxJ4w71zM/q0U+HSMr1nsHuHFu3dbFcEOskAJHRwzlvzeihcQz6L1L6dApdA/jrfQN4utlhytkV78m+CVw7z8GX20RbVNKKbveksF8SfSzj+haeYPCbmoRNnij+feNWao8VnFIaCSGkoCvYupeK5Tlo=","attributes":{"enabled":true,"nbf":1619643049,"exp":1651179649,"created":1619643649,"updated":1619643649,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/lroCreateCertificateName-canresumefromastoppedpoller-/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1619643583,"updated":1619643583}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/lroCreateCertificateName-canresumefromastoppedpoller-/pending"}}, [
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
  '14f57455-455a-4d7b-902f-ef5110859482',
  'x-ms-request-id',
  '81a0f247-3826-467d-85d8-16e4df82f05c',
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
  'Wed, 28 Apr 2021 21:00:51 GMT',
  'Content-Length',
  '2620'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/certificates/lroCreateCertificateName-canresumefromastoppedpoller-')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/lroCreateCertificateName-canresumefromastoppedpoller-","deletedDate":1619643652,"scheduledPurgeDate":1627419652,"id":"https://keyvault_name.vault.azure.net/certificates/lroCreateCertificateName-canresumefromastoppedpoller-/7081fd92df6c43cab3b12bc9f6e9034b","kid":"https://keyvault_name.vault.azure.net/keys/lroCreateCertificateName-canresumefromastoppedpoller-/7081fd92df6c43cab3b12bc9f6e9034b","sid":"https://keyvault_name.vault.azure.net/secrets/lroCreateCertificateName-canresumefromastoppedpoller-/7081fd92df6c43cab3b12bc9f6e9034b","x5t":"pEwJMrf7vGms98vMddXOlswwzAI","cer":"MIIDKDCCAhCgAwIBAgIQGtoVO+W4TPul6TVtXO5SkTANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjEwNDI4MjA1MDQ5WhcNMjIwNDI4MjEwMDQ5WjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQCjiPX3j6/LyG8ui/SW0pW4rb39Qv4qZ3zzlmW6tHrkoHPo/IKe81166mvyI3SB+ri1VD0i2iQsAKYxH6GwqUeV1IRrJAzEMzn8YbtNg61TU82q8Y330YhMTAfTZvU26g0gPQsrWSV/WAvaf4pNaHXAp6LuRxdNUSAb0ZJPVnxaraN9OQR56ShbfGrKo4P1BBoT7Zw5UOsNd4OlgBSqzqaDCcjFnoGekpefbRRyu8Cte2ReX/XO+5dQ8X/3S1pPKQJrZhOxgxzMyPDmpjvZ/k39FKpAUhsfwD0bl7IdYSU5Zjg6Z9S04Pk+aCQgWx5eYPaCsywx+naALvqk077AzDL5AgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBQ9keNvLdbLDvuFIHO3ETIQrkmtpDAdBgNVHQ4EFgQUPZHjby3Wyw77hSBztxEyEK5JraQwDQYJKoZIhvcNAQELBQADggEBAHZ9ilKLC0d2YBD0p9Vs3jmbApL+zY45fJjQefmBxRq2yQbydo3iQROENQCdna3BYgiYDxtQSwvketWxxcqOMMMJn+QJnT0dP3XK8XdJnPK/DkfgxQFmGT+BZ8cQSIIhLnumxT8AFQo6jlnyhIFldmd5ty1ayGk4y8TVeJJapJylCO+d7x0xi5z3dqDpAxyTrxJ4w71zM/q0U+HSMr1nsHuHFu3dbFcEOskAJHRwzlvzeihcQz6L1L6dApdA/jrfQN4utlhytkV78m+CVw7z8GX20RbVNKKbveksF8SfSzj+haeYPCbmoRNnij+feNWao8VnFIaCSGkoCvYupeK5Tlo=","attributes":{"enabled":true,"nbf":1619643049,"exp":1651179649,"created":1619643649,"updated":1619643649,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/lroCreateCertificateName-canresumefromastoppedpoller-/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1619643583,"updated":1619643583}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/lroCreateCertificateName-canresumefromastoppedpoller-/pending"}}, [
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
  'a250d6cb-601e-45ff-a36f-3679b687efd4',
  'x-ms-request-id',
  'e669b1e4-f270-44ba-adfa-8d6942225967',
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
  'Wed, 28 Apr 2021 21:00:51 GMT',
  'Content-Length',
  '2826'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroCreateCertificateName-canresumefromastoppedpoller-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroCreateCertificateName-canresumefromastoppedpoller-"}}, [
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
  'b9f371f9-9952-41e7-ae68-f2e27abb87b4',
  'x-ms-request-id',
  '84f5a60b-5f95-40a1-9c64-795a92facaa1',
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
  'Wed, 28 Apr 2021 21:00:51 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroCreateCertificateName-canresumefromastoppedpoller-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroCreateCertificateName-canresumefromastoppedpoller-"}}, [
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
  '7cb78f12-8440-4e4f-a61d-998043b3a627',
  'x-ms-request-id',
  '7d4a4a27-6028-4cec-94bd-45be2c38ed69',
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
  'Wed, 28 Apr 2021 21:00:51 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroCreateCertificateName-canresumefromastoppedpoller-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroCreateCertificateName-canresumefromastoppedpoller-"}}, [
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
  '7d17285c-6e02-49be-a28d-01181b6474bc',
  'x-ms-request-id',
  '29369263-d649-47d4-b8f3-638e4dc22037',
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
  'Wed, 28 Apr 2021 21:00:53 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroCreateCertificateName-canresumefromastoppedpoller-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroCreateCertificateName-canresumefromastoppedpoller-"}}, [
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
  'b7da0d8d-e709-4559-9766-cff4dc817a68',
  'x-ms-request-id',
  'c1aa64f4-b027-4295-8319-969dfd3ac3fb',
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
  'Wed, 28 Apr 2021 21:00:55 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroCreateCertificateName-canresumefromastoppedpoller-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroCreateCertificateName-canresumefromastoppedpoller-"}}, [
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
  'e0a738ad-721d-461d-969b-27858161d1fc',
  'x-ms-request-id',
  '2cb3ff98-128d-4e8f-9a71-937bda72d948',
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
  'Wed, 28 Apr 2021 21:00:57 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroCreateCertificateName-canresumefromastoppedpoller-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroCreateCertificateName-canresumefromastoppedpoller-"}}, [
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
  'ae6a8a17-0ae7-4793-8d7d-95f569ed0bba',
  'x-ms-request-id',
  '99a2485b-4d41-4081-9251-83f8b009b9b6',
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
  'Wed, 28 Apr 2021 21:00:59 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroCreateCertificateName-canresumefromastoppedpoller-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroCreateCertificateName-canresumefromastoppedpoller-"}}, [
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
  'a7d6bbef-bee2-4977-8cec-4d880a56d25e',
  'x-ms-request-id',
  '0621ce97-ab81-4e6b-a725-ea127bf19cb7',
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
  'Wed, 28 Apr 2021 21:01:01 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroCreateCertificateName-canresumefromastoppedpoller-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroCreateCertificateName-canresumefromastoppedpoller-"}}, [
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
  '3320b7b5-4e0a-4a63-a0a9-d4206700bdab',
  'x-ms-request-id',
  'a5c40766-c0b7-4bff-9d7f-292e9c26ced4',
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
  'Wed, 28 Apr 2021 21:01:03 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroCreateCertificateName-canresumefromastoppedpoller-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroCreateCertificateName-canresumefromastoppedpoller-"}}, [
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
  '81942531-49de-4ca2-90fa-6b6515ddb5ea',
  'x-ms-request-id',
  '47dd4950-e172-451c-8026-ce9711ec1804',
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
  'Wed, 28 Apr 2021 21:01:07 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroCreateCertificateName-canresumefromastoppedpoller-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroCreateCertificateName-canresumefromastoppedpoller-"}}, [
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
  'd492f340-5827-4b90-81ee-59abfaaf548d',
  'x-ms-request-id',
  '67a98d4c-26ab-451e-a916-d6ad6e775d88',
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
  'Wed, 28 Apr 2021 21:01:08 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroCreateCertificateName-canresumefromastoppedpoller-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroCreateCertificateName-canresumefromastoppedpoller-"}}, [
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
  'bb1e4f9e-9b50-4887-87f5-76495d602d74',
  'x-ms-request-id',
  '2c205a70-6ab3-45ef-957e-a290ab1fc06e',
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
  'Wed, 28 Apr 2021 21:01:11 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroCreateCertificateName-canresumefromastoppedpoller-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroCreateCertificateName-canresumefromastoppedpoller-"}}, [
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
  'c63abaad-a685-4e76-9f55-a6aa2e8dfa0f',
  'x-ms-request-id',
  'ec670076-2f48-4951-8d7e-a74a0b45d06e',
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
  'Wed, 28 Apr 2021 21:01:13 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroCreateCertificateName-canresumefromastoppedpoller-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroCreateCertificateName-canresumefromastoppedpoller-"}}, [
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
  '2bb84578-fd33-404d-a636-6adc7adfd5a9',
  'x-ms-request-id',
  'a6d25a6e-05cd-4ead-ad10-3dc20122b52b',
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
  'Wed, 28 Apr 2021 21:01:15 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroCreateCertificateName-canresumefromastoppedpoller-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroCreateCertificateName-canresumefromastoppedpoller-"}}, [
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
  '83fd529b-f7df-4e3f-9934-e410506929fc',
  'x-ms-request-id',
  '7e6c7815-0c6b-49d2-953c-330f76b80bd0',
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
  'Wed, 28 Apr 2021 21:01:17 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroCreateCertificateName-canresumefromastoppedpoller-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroCreateCertificateName-canresumefromastoppedpoller-"}}, [
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
  '360268c8-1c6a-4d5e-b88b-a7d7e8bd5454',
  'x-ms-request-id',
  '886885b2-7840-4281-912c-cc7e300c0c53',
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
  'Wed, 28 Apr 2021 21:01:19 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroCreateCertificateName-canresumefromastoppedpoller-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroCreateCertificateName-canresumefromastoppedpoller-"}}, [
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
  'cf1ca3ac-5523-4fd2-a0a7-25005bc4b639',
  'x-ms-request-id',
  'c62ea2d9-3005-4b83-bf40-d82499149765',
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
  'Wed, 28 Apr 2021 21:01:20 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroCreateCertificateName-canresumefromastoppedpoller-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroCreateCertificateName-canresumefromastoppedpoller-"}}, [
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
  '15a1b555-bfd1-409f-a4cd-43fba352d70d',
  'x-ms-request-id',
  '577351f9-4be7-46fb-9809-dbf820d01f96',
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
  'Wed, 28 Apr 2021 21:01:23 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroCreateCertificateName-canresumefromastoppedpoller-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroCreateCertificateName-canresumefromastoppedpoller-"}}, [
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
  'f1aaedc3-b50f-4185-9734-92e039627c90',
  'x-ms-request-id',
  '087aa853-68a0-416a-9568-d65e2d9d29d1',
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
  'Wed, 28 Apr 2021 21:01:25 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroCreateCertificateName-canresumefromastoppedpoller-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroCreateCertificateName-canresumefromastoppedpoller-"}}, [
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
  '4fed89de-739d-4f2f-b6a1-70a316ee918e',
  'x-ms-request-id',
  'b98e3552-9c25-4236-be25-4a88a533cf00',
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
  'Wed, 28 Apr 2021 21:01:27 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroCreateCertificateName-canresumefromastoppedpoller-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroCreateCertificateName-canresumefromastoppedpoller-"}}, [
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
  '231997f5-86b6-4aeb-9b8c-00ca2ba0a98b',
  'x-ms-request-id',
  '3b8508df-502a-44df-bc22-f6d3c0326c56',
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
  'Wed, 28 Apr 2021 21:01:29 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroCreateCertificateName-canresumefromastoppedpoller-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroCreateCertificateName-canresumefromastoppedpoller-"}}, [
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
  'bfbc6c2f-66ce-4fd0-9ed9-b8ec8222a309',
  'x-ms-request-id',
  'f4052647-f577-4fe9-99a1-c4484e48d31d',
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
  'Wed, 28 Apr 2021 21:01:31 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroCreateCertificateName-canresumefromastoppedpoller-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroCreateCertificateName-canresumefromastoppedpoller-"}}, [
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
  'b7e4fafe-fd00-41fc-9723-3145529cf5d1',
  'x-ms-request-id',
  'c33972ff-b191-42ff-be9f-a57f3d1a480b',
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
  'Wed, 28 Apr 2021 21:01:34 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroCreateCertificateName-canresumefromastoppedpoller-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroCreateCertificateName-canresumefromastoppedpoller-"}}, [
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
  '115a8630-f867-46a0-bf03-1c2ad9f50a1b',
  'x-ms-request-id',
  '6553e82d-bbc2-44ad-a0c9-4b439624391f',
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
  'Wed, 28 Apr 2021 21:01:36 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroCreateCertificateName-canresumefromastoppedpoller-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroCreateCertificateName-canresumefromastoppedpoller-"}}, [
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
  '778e3e14-4e63-453a-abcc-01e9b9e965e1',
  'x-ms-request-id',
  '6c0da709-e862-44a5-893c-3f718e0d81dc',
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
  'Wed, 28 Apr 2021 21:01:38 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroCreateCertificateName-canresumefromastoppedpoller-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroCreateCertificateName-canresumefromastoppedpoller-"}}, [
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
  'ff044445-c1f8-4966-9b1e-db55a30ddcf3',
  'x-ms-request-id',
  '8dcea97a-5846-4452-8c8b-7a674993100c',
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
  'Wed, 28 Apr 2021 21:01:40 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroCreateCertificateName-canresumefromastoppedpoller-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroCreateCertificateName-canresumefromastoppedpoller-"}}, [
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
  'ebc2c62e-ce5b-4bee-9c9b-b9a0d48c248c',
  'x-ms-request-id',
  '90274e9d-99e8-4f3d-9a45-87ecc73cc3de',
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
  'Wed, 28 Apr 2021 21:01:42 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroCreateCertificateName-canresumefromastoppedpoller-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroCreateCertificateName-canresumefromastoppedpoller-"}}, [
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
  'a5c0421e-f992-4159-8515-45692265bbc5',
  'x-ms-request-id',
  '9b1b6fbf-ecef-427c-aede-f3520ec2d363',
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
  'Wed, 28 Apr 2021 21:01:44 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroCreateCertificateName-canresumefromastoppedpoller-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroCreateCertificateName-canresumefromastoppedpoller-"}}, [
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
  '6968aa97-5087-44c0-9c0c-d1ec788c2ec3',
  'x-ms-request-id',
  '6061e6ab-6372-49dd-a0e2-c7203c244951',
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
  'Wed, 28 Apr 2021 21:01:46 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroCreateCertificateName-canresumefromastoppedpoller-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroCreateCertificateName-canresumefromastoppedpoller-"}}, [
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
  '8d339e16-0818-46cd-884c-0a14276ffd7e',
  'x-ms-request-id',
  '5688174d-db2d-43e8-bbf6-47e9f5cd4cda',
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
  'Wed, 28 Apr 2021 21:01:48 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroCreateCertificateName-canresumefromastoppedpoller-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroCreateCertificateName-canresumefromastoppedpoller-"}}, [
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
  'b9d178f2-8ba8-48f8-8e5a-645b3632353e',
  'x-ms-request-id',
  '44ce8428-3e06-442b-87c4-e661d5ddf80f',
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
  'Wed, 28 Apr 2021 21:01:51 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroCreateCertificateName-canresumefromastoppedpoller-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroCreateCertificateName-canresumefromastoppedpoller-"}}, [
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
  '20d0c7c1-8669-41de-9936-70456f8ce683',
  'x-ms-request-id',
  '9aafbc19-7046-4c86-a909-77b19492c0a0',
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
  'Wed, 28 Apr 2021 21:01:53 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroCreateCertificateName-canresumefromastoppedpoller-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroCreateCertificateName-canresumefromastoppedpoller-"}}, [
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
  'c7925318-7cea-4a95-b02f-0a8a047cbd10',
  'x-ms-request-id',
  '4f0e19ba-0d1b-4033-966c-c58f50b3c345',
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
  'Wed, 28 Apr 2021 21:01:55 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroCreateCertificateName-canresumefromastoppedpoller-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroCreateCertificateName-canresumefromastoppedpoller-"}}, [
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
  'aad60c5c-1be8-43c4-a728-7961e3aa4f7d',
  'x-ms-request-id',
  '3e4e9a4d-d92d-458e-ae04-7cfdd0086882',
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
  'Wed, 28 Apr 2021 21:01:57 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroCreateCertificateName-canresumefromastoppedpoller-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroCreateCertificateName-canresumefromastoppedpoller-"}}, [
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
  '4df652f8-865d-470c-8585-bd8e791d248e',
  'x-ms-request-id',
  'c4bee212-92e4-44bf-8575-7970956282e5',
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
  'Wed, 28 Apr 2021 21:01:59 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroCreateCertificateName-canresumefromastoppedpoller-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroCreateCertificateName-canresumefromastoppedpoller-"}}, [
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
  'ba1f6d1a-88b3-42ec-9774-2f50e3e50788',
  'x-ms-request-id',
  'c6f6aa8b-7559-4626-b38e-b54429ebc8d2',
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
  'Wed, 28 Apr 2021 21:02:00 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroCreateCertificateName-canresumefromastoppedpoller-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroCreateCertificateName-canresumefromastoppedpoller-"}}, [
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
  '9159d543-16f1-41c1-8ce2-553af3cca4a6',
  'x-ms-request-id',
  '951fa706-8b2c-4d17-abbb-841d67a94170',
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
  'Wed, 28 Apr 2021 21:02:03 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroCreateCertificateName-canresumefromastoppedpoller-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroCreateCertificateName-canresumefromastoppedpoller-"}}, [
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
  'a11d6cc2-f6bd-401e-aaf4-f3f09ac26679',
  'x-ms-request-id',
  '067a4fbf-6b87-4852-a1dc-8af2c985c41f',
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
  'Wed, 28 Apr 2021 21:02:05 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroCreateCertificateName-canresumefromastoppedpoller-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroCreateCertificateName-canresumefromastoppedpoller-"}}, [
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
  '77eb8262-a067-4f5c-95d8-4244e4abb740',
  'x-ms-request-id',
  'ca568d46-0a55-401b-b446-5de37cca3d35',
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
  'Wed, 28 Apr 2021 21:02:07 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroCreateCertificateName-canresumefromastoppedpoller-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroCreateCertificateName-canresumefromastoppedpoller-"}}, [
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
  'b7cdfe09-48f6-499f-bce5-be0e0f562c01',
  'x-ms-request-id',
  '9e33df52-93f1-4a0b-ba8d-45acff7d29fe',
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
  'Wed, 28 Apr 2021 21:02:09 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroCreateCertificateName-canresumefromastoppedpoller-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroCreateCertificateName-canresumefromastoppedpoller-"}}, [
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
  '5bef96a9-e0ee-46eb-abf5-b08f877db907',
  'x-ms-request-id',
  'bb3ba351-f6e7-4e12-a5cd-e118a62ee01a',
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
  'Wed, 28 Apr 2021 21:02:11 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroCreateCertificateName-canresumefromastoppedpoller-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroCreateCertificateName-canresumefromastoppedpoller-"}}, [
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
  'ee5db1c7-a82d-496a-8b53-a371909a0510',
  'x-ms-request-id',
  '70f87ad9-6cfe-4aef-99c4-56245ed11aa0',
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
  'Wed, 28 Apr 2021 21:02:13 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroCreateCertificateName-canresumefromastoppedpoller-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroCreateCertificateName-canresumefromastoppedpoller-"}}, [
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
  '56bc2791-a277-450c-95fd-72a707cc6953',
  'x-ms-request-id',
  '3e787a84-c16c-485d-bb95-8e58a62804c8',
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
  'Wed, 28 Apr 2021 21:02:15 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroCreateCertificateName-canresumefromastoppedpoller-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroCreateCertificateName-canresumefromastoppedpoller-"}}, [
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
  '5a2ada63-3200-4478-b386-6327380d5466',
  'x-ms-request-id',
  'c89b52f6-d17c-4e62-adbf-9053ae307660',
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
  'Wed, 28 Apr 2021 21:02:18 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroCreateCertificateName-canresumefromastoppedpoller-')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/lroCreateCertificateName-canresumefromastoppedpoller-","deletedDate":1619643652,"scheduledPurgeDate":1627419652,"id":"https://keyvault_name.vault.azure.net/certificates/lroCreateCertificateName-canresumefromastoppedpoller-/7081fd92df6c43cab3b12bc9f6e9034b","kid":"https://keyvault_name.vault.azure.net/keys/lroCreateCertificateName-canresumefromastoppedpoller-/7081fd92df6c43cab3b12bc9f6e9034b","sid":"https://keyvault_name.vault.azure.net/secrets/lroCreateCertificateName-canresumefromastoppedpoller-/7081fd92df6c43cab3b12bc9f6e9034b","x5t":"pEwJMrf7vGms98vMddXOlswwzAI","cer":"MIIDKDCCAhCgAwIBAgIQGtoVO+W4TPul6TVtXO5SkTANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjEwNDI4MjA1MDQ5WhcNMjIwNDI4MjEwMDQ5WjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQCjiPX3j6/LyG8ui/SW0pW4rb39Qv4qZ3zzlmW6tHrkoHPo/IKe81166mvyI3SB+ri1VD0i2iQsAKYxH6GwqUeV1IRrJAzEMzn8YbtNg61TU82q8Y330YhMTAfTZvU26g0gPQsrWSV/WAvaf4pNaHXAp6LuRxdNUSAb0ZJPVnxaraN9OQR56ShbfGrKo4P1BBoT7Zw5UOsNd4OlgBSqzqaDCcjFnoGekpefbRRyu8Cte2ReX/XO+5dQ8X/3S1pPKQJrZhOxgxzMyPDmpjvZ/k39FKpAUhsfwD0bl7IdYSU5Zjg6Z9S04Pk+aCQgWx5eYPaCsywx+naALvqk077AzDL5AgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBQ9keNvLdbLDvuFIHO3ETIQrkmtpDAdBgNVHQ4EFgQUPZHjby3Wyw77hSBztxEyEK5JraQwDQYJKoZIhvcNAQELBQADggEBAHZ9ilKLC0d2YBD0p9Vs3jmbApL+zY45fJjQefmBxRq2yQbydo3iQROENQCdna3BYgiYDxtQSwvketWxxcqOMMMJn+QJnT0dP3XK8XdJnPK/DkfgxQFmGT+BZ8cQSIIhLnumxT8AFQo6jlnyhIFldmd5ty1ayGk4y8TVeJJapJylCO+d7x0xi5z3dqDpAxyTrxJ4w71zM/q0U+HSMr1nsHuHFu3dbFcEOskAJHRwzlvzeihcQz6L1L6dApdA/jrfQN4utlhytkV78m+CVw7z8GX20RbVNKKbveksF8SfSzj+haeYPCbmoRNnij+feNWao8VnFIaCSGkoCvYupeK5Tlo=","attributes":{"enabled":true,"nbf":1619643049,"exp":1651179649,"created":1619643649,"updated":1619643649,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/lroCreateCertificateName-canresumefromastoppedpoller-/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1619643583,"updated":1619643583}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/lroCreateCertificateName-canresumefromastoppedpoller-/pending"}}, [
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
  'b9d2cf42-196e-4e96-87fd-73fed3c23e72',
  'x-ms-request-id',
  '35ed4908-76fd-4486-abaf-276f299381be',
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
  'Wed, 28 Apr 2021 21:02:19 GMT',
  'Content-Length',
  '2826'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedcertificates/lroCreateCertificateName-canresumefromastoppedpoller-')
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
  '819ab760-9c22-461e-8795-b4bef8053b33',
  'x-ms-request-id',
  'e47d2a65-6126-4f86-b68d-82cd43c598fd',
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
  'Wed, 28 Apr 2021 21:02:20 GMT'
]);

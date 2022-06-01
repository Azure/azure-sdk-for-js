let nock = require('nock');

module.exports.hash = "764d8feb2ec586a1fe8c3d051fdccea8";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/certificates/lroCreateCertificateName-canwaituntilacertificateiscreated-/create')
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
  '63cd62cc-6b02-4f1c-8f0f-46c7c3930d38',
  'x-ms-request-id',
  '60f6a28b-00c9-4a65-b079-5f11a20f5c40',
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
  'Wed, 28 Apr 2021 20:58:24 GMT'
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
  '1c4c4ace-0acb-4bcc-9345-395168a33901',
  'x-ms-ests-server',
  '2.1.11654.16 - SCUS ProdSlices',
  'Set-Cookie',
  'fpc=ApDQRp_1bOJGvyZBmEPP0xDmR1YbAQAAALTCG9gOAAAA; expires=Fri, 28-May-2021 20:58:25 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrWYoDiUyDtzntN4nUniMOoghbErFdJBe5RPF6Ha-1TdUGJU1sEsSK4VZTfIqwEhOQCnbLG7GnSF8sR_y1xU6sbGx2kWus_PYNQncH-P0g2N5t9LuBtjmewRZpHKnimwZ7WJgGaBzbtsBu7e7WQMTx3ypqwuBaXCyuuP_76cDGlVogAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 28 Apr 2021 20:58:25 GMT',
  'Content-Length',
  '980'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .get('/12345678-1234-1234-1234-123456789012/v2.0/.well-known/openid-configuration')
  .reply(200, {"token_endpoint":"https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/oauth2/v2.0/token","token_endpoint_auth_methods_supported":["client_secret_post","private_key_jwt","client_secret_basic"],"jwks_uri":"https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/discovery/v2.0/keys","response_modes_supported":["query","fragment","form_post"],"subject_types_supported":["pairwise"],"id_token_signing_alg_values_supported":["RS256"],"response_types_supported":["code","id_token","code id_token","id_token token"],"scopes_supported":["openid","profile","email","offline_access"],"issuer":"https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/v2.0","request_uri_parameter_supported":false,"userinfo_endpoint":"https://graph.microsoft.com/oidc/userinfo","authorization_endpoint":"https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/oauth2/v2.0/authorize","device_authorization_endpoint":"https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/oauth2/v2.0/devicecode","http_logout_supported":true,"frontchannel_logout_supported":true,"end_session_endpoint":"https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/oauth2/v2.0/logout","claims_supported":["sub","iss","cloud_instance_name","cloud_instance_host_name","cloud_graph_host_name","msgraph_host","aud","exp","iat","auth_time","acr","nonce","preferred_username","name","tid","ver","at_hash","c_hash","email"],"tenant_region_scope":"NA","cloud_instance_name":"microsoftonline.com","cloud_graph_host_name":"graph.windows.net","msgraph_host":"graph.microsoft.com","rbac_url":"https://pas.windows.net"}, [
  'Cache-Control',
  'max-age=86400, private',
  'Content-Length',
  '1651',
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
  '64fd1052-6375-4f05-8dba-d8a5d3150101',
  'x-ms-ests-server',
  '2.1.11654.16 - EUS ProdSlices',
  'Set-Cookie',
  'fpc=ApDQRp_1bOJGvyZBmEPP0xDmR1YbAQAAALTCG9gOAAAA; expires=Fri, 28-May-2021 20:58:26 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevrq9wDRMZKEAfGc8QMbtFmq4scoEoFN1K2piF_stn1pyWob63pC53_9f6BRzYwnmJZpdI7zdQxmcxcM0B0CzDoDbKqGEBfPuh7adJRpz9KIqkrSksPXh1fBwBGlxzpCk3U2HKQ-KyNfehMf2kbikKPppTabX6ISj8kPYKEhGgCia0gAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 28 Apr 2021 20:58:25 GMT'
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
  '085f4f7d-8c01-4e13-9607-f708ca891401',
  'x-ms-ests-server',
  '2.1.11654.16 - WUS2 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=ApDQRp_1bOJGvyZBmEPP0xDmR1YbAgAAALTCG9gOAAAA; expires=Fri, 28-May-2021 20:58:26 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 28 Apr 2021 20:58:26 GMT',
  'Content-Length',
  '1313'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/certificates/lroCreateCertificateName-canwaituntilacertificateiscreated-/create', {"policy":{"key_props":{},"secret_props":{},"x509_props":{"subject":"cn=MyCert","sans":{}},"issuer":{"name":"Self"},"attributes":{}},"attributes":{}})
  .query(true)
  .reply(202, {"id":"https://keyvault_name.vault.azure.net/certificates/lroCreateCertificateName-canwaituntilacertificateiscreated-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEApqDGzSacJ+KpHSxTAyQJwpu+pHOI1aHY6duG8uHCFfukS0S8YMapuRX7Z9cpDyAhOEOMidw0mfCXv0RTdxLHEd0YxNN6x+WOhZfUibW4hrkEcJJ8YF1W9iUTs5vEjofIDKkgORHRS+/noHmaT1F2lGpctgTJmXXcVI7Dyqx761/+ThJGNlTmKLRYux2uRIRJPgyhtIOlmEtha4YH7lenh43k1RV9D0aa9iinZp3m/sjvcuQRUu+BT6CZ38mKyLxK3b2C1dRdQh+oqml3Fqs2qRz8X9tegznypsybJfmxH77cMEywfGfNT9QbYJLZOBVNBuL9PvxoaYPliDX1Kzvg0QIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAERwfK76y+OD53KMy15aqWfxi9xvEIdaVQE4xL3kaan9gTVyOh3qvRvxJV/z5nJQKN+sfgKCrpsdDTQctCYKYWmakQWQpZ++kSgTXgksATDa7t7mZRwH2hyirQk8YUeeGoqc8gA06UjNqGJiiuSSA9zbXWETYIGvQ+00+wtdiB0FDg+lvDzoNiPHaMFuxL9SJpruqDwaMgTY/1uhs0KPIxgvPT61MvP/DxZ0asX5dXLSf1MTcCLDhVKV/LH4gRsSlJY2Y0FH+cgeT1CL5RCWNwcnxVSrkOke4blaXys3hRhhoXj/5fOvS15eyC2hAfOprUTdBs5sHQSf4EFB9L0+Ij0=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"582bf30409924c5c9e5f09df190453b2"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://keyvault_name.vault.azure.net/certificates/lroCreateCertificateName-canwaituntilacertificateiscreated-/pending?api-version=7.2&request_id=582bf30409924c5c9e5f09df190453b2',
  'Retry-After',
  '0',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '63cd62cc-6b02-4f1c-8f0f-46c7c3930d38',
  'x-ms-request-id',
  'bd18f06b-7b15-4368-892f-6a45f7f51de9',
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
  'Wed, 28 Apr 2021 20:58:25 GMT',
  'Content-Length',
  '1352'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroCreateCertificateName-canwaituntilacertificateiscreated-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroCreateCertificateName-canwaituntilacertificateiscreated-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEApqDGzSacJ+KpHSxTAyQJwpu+pHOI1aHY6duG8uHCFfukS0S8YMapuRX7Z9cpDyAhOEOMidw0mfCXv0RTdxLHEd0YxNN6x+WOhZfUibW4hrkEcJJ8YF1W9iUTs5vEjofIDKkgORHRS+/noHmaT1F2lGpctgTJmXXcVI7Dyqx761/+ThJGNlTmKLRYux2uRIRJPgyhtIOlmEtha4YH7lenh43k1RV9D0aa9iinZp3m/sjvcuQRUu+BT6CZ38mKyLxK3b2C1dRdQh+oqml3Fqs2qRz8X9tegznypsybJfmxH77cMEywfGfNT9QbYJLZOBVNBuL9PvxoaYPliDX1Kzvg0QIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAERwfK76y+OD53KMy15aqWfxi9xvEIdaVQE4xL3kaan9gTVyOh3qvRvxJV/z5nJQKN+sfgKCrpsdDTQctCYKYWmakQWQpZ++kSgTXgksATDa7t7mZRwH2hyirQk8YUeeGoqc8gA06UjNqGJiiuSSA9zbXWETYIGvQ+00+wtdiB0FDg+lvDzoNiPHaMFuxL9SJpruqDwaMgTY/1uhs0KPIxgvPT61MvP/DxZ0asX5dXLSf1MTcCLDhVKV/LH4gRsSlJY2Y0FH+cgeT1CL5RCWNwcnxVSrkOke4blaXys3hRhhoXj/5fOvS15eyC2hAfOprUTdBs5sHQSf4EFB9L0+Ij0=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"582bf30409924c5c9e5f09df190453b2"}, [
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
  '20eb89d8-a090-4daf-9281-87c97eb438ee',
  'x-ms-request-id',
  'b7cb82aa-b1d7-4fd5-9df4-d2f7a1f612bb',
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
  'Wed, 28 Apr 2021 20:58:25 GMT',
  'Content-Length',
  '1352'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroCreateCertificateName-canwaituntilacertificateiscreated-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroCreateCertificateName-canwaituntilacertificateiscreated-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEApqDGzSacJ+KpHSxTAyQJwpu+pHOI1aHY6duG8uHCFfukS0S8YMapuRX7Z9cpDyAhOEOMidw0mfCXv0RTdxLHEd0YxNN6x+WOhZfUibW4hrkEcJJ8YF1W9iUTs5vEjofIDKkgORHRS+/noHmaT1F2lGpctgTJmXXcVI7Dyqx761/+ThJGNlTmKLRYux2uRIRJPgyhtIOlmEtha4YH7lenh43k1RV9D0aa9iinZp3m/sjvcuQRUu+BT6CZ38mKyLxK3b2C1dRdQh+oqml3Fqs2qRz8X9tegznypsybJfmxH77cMEywfGfNT9QbYJLZOBVNBuL9PvxoaYPliDX1Kzvg0QIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAERwfK76y+OD53KMy15aqWfxi9xvEIdaVQE4xL3kaan9gTVyOh3qvRvxJV/z5nJQKN+sfgKCrpsdDTQctCYKYWmakQWQpZ++kSgTXgksATDa7t7mZRwH2hyirQk8YUeeGoqc8gA06UjNqGJiiuSSA9zbXWETYIGvQ+00+wtdiB0FDg+lvDzoNiPHaMFuxL9SJpruqDwaMgTY/1uhs0KPIxgvPT61MvP/DxZ0asX5dXLSf1MTcCLDhVKV/LH4gRsSlJY2Y0FH+cgeT1CL5RCWNwcnxVSrkOke4blaXys3hRhhoXj/5fOvS15eyC2hAfOprUTdBs5sHQSf4EFB9L0+Ij0=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"582bf30409924c5c9e5f09df190453b2"}, [
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
  'cec0dcb8-5c9e-48bf-b46a-9d162339cee0',
  'x-ms-request-id',
  '65896003-e044-446b-a509-9dbc0a93f96a',
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
  'Wed, 28 Apr 2021 20:58:26 GMT',
  'Content-Length',
  '1352'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroCreateCertificateName-canwaituntilacertificateiscreated-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroCreateCertificateName-canwaituntilacertificateiscreated-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEApqDGzSacJ+KpHSxTAyQJwpu+pHOI1aHY6duG8uHCFfukS0S8YMapuRX7Z9cpDyAhOEOMidw0mfCXv0RTdxLHEd0YxNN6x+WOhZfUibW4hrkEcJJ8YF1W9iUTs5vEjofIDKkgORHRS+/noHmaT1F2lGpctgTJmXXcVI7Dyqx761/+ThJGNlTmKLRYux2uRIRJPgyhtIOlmEtha4YH7lenh43k1RV9D0aa9iinZp3m/sjvcuQRUu+BT6CZ38mKyLxK3b2C1dRdQh+oqml3Fqs2qRz8X9tegznypsybJfmxH77cMEywfGfNT9QbYJLZOBVNBuL9PvxoaYPliDX1Kzvg0QIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAERwfK76y+OD53KMy15aqWfxi9xvEIdaVQE4xL3kaan9gTVyOh3qvRvxJV/z5nJQKN+sfgKCrpsdDTQctCYKYWmakQWQpZ++kSgTXgksATDa7t7mZRwH2hyirQk8YUeeGoqc8gA06UjNqGJiiuSSA9zbXWETYIGvQ+00+wtdiB0FDg+lvDzoNiPHaMFuxL9SJpruqDwaMgTY/1uhs0KPIxgvPT61MvP/DxZ0asX5dXLSf1MTcCLDhVKV/LH4gRsSlJY2Y0FH+cgeT1CL5RCWNwcnxVSrkOke4blaXys3hRhhoXj/5fOvS15eyC2hAfOprUTdBs5sHQSf4EFB9L0+Ij0=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"582bf30409924c5c9e5f09df190453b2"}, [
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
  'b6c1515e-8f98-4a98-b053-44d6b1eb7f93',
  'x-ms-request-id',
  'b9ee702c-10eb-4e78-8dec-3b7c9a849d2d',
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
  'Wed, 28 Apr 2021 20:58:29 GMT',
  'Content-Length',
  '1352'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroCreateCertificateName-canwaituntilacertificateiscreated-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroCreateCertificateName-canwaituntilacertificateiscreated-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEApqDGzSacJ+KpHSxTAyQJwpu+pHOI1aHY6duG8uHCFfukS0S8YMapuRX7Z9cpDyAhOEOMidw0mfCXv0RTdxLHEd0YxNN6x+WOhZfUibW4hrkEcJJ8YF1W9iUTs5vEjofIDKkgORHRS+/noHmaT1F2lGpctgTJmXXcVI7Dyqx761/+ThJGNlTmKLRYux2uRIRJPgyhtIOlmEtha4YH7lenh43k1RV9D0aa9iinZp3m/sjvcuQRUu+BT6CZ38mKyLxK3b2C1dRdQh+oqml3Fqs2qRz8X9tegznypsybJfmxH77cMEywfGfNT9QbYJLZOBVNBuL9PvxoaYPliDX1Kzvg0QIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAERwfK76y+OD53KMy15aqWfxi9xvEIdaVQE4xL3kaan9gTVyOh3qvRvxJV/z5nJQKN+sfgKCrpsdDTQctCYKYWmakQWQpZ++kSgTXgksATDa7t7mZRwH2hyirQk8YUeeGoqc8gA06UjNqGJiiuSSA9zbXWETYIGvQ+00+wtdiB0FDg+lvDzoNiPHaMFuxL9SJpruqDwaMgTY/1uhs0KPIxgvPT61MvP/DxZ0asX5dXLSf1MTcCLDhVKV/LH4gRsSlJY2Y0FH+cgeT1CL5RCWNwcnxVSrkOke4blaXys3hRhhoXj/5fOvS15eyC2hAfOprUTdBs5sHQSf4EFB9L0+Ij0=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"582bf30409924c5c9e5f09df190453b2"}, [
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
  'bd7709de-f3f3-4191-82b9-119d192ce030',
  'x-ms-request-id',
  '31583956-ff42-4934-84fe-fb338cdbc21e',
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
  'Wed, 28 Apr 2021 20:58:31 GMT',
  'Content-Length',
  '1352'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroCreateCertificateName-canwaituntilacertificateiscreated-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroCreateCertificateName-canwaituntilacertificateiscreated-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEApqDGzSacJ+KpHSxTAyQJwpu+pHOI1aHY6duG8uHCFfukS0S8YMapuRX7Z9cpDyAhOEOMidw0mfCXv0RTdxLHEd0YxNN6x+WOhZfUibW4hrkEcJJ8YF1W9iUTs5vEjofIDKkgORHRS+/noHmaT1F2lGpctgTJmXXcVI7Dyqx761/+ThJGNlTmKLRYux2uRIRJPgyhtIOlmEtha4YH7lenh43k1RV9D0aa9iinZp3m/sjvcuQRUu+BT6CZ38mKyLxK3b2C1dRdQh+oqml3Fqs2qRz8X9tegznypsybJfmxH77cMEywfGfNT9QbYJLZOBVNBuL9PvxoaYPliDX1Kzvg0QIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAERwfK76y+OD53KMy15aqWfxi9xvEIdaVQE4xL3kaan9gTVyOh3qvRvxJV/z5nJQKN+sfgKCrpsdDTQctCYKYWmakQWQpZ++kSgTXgksATDa7t7mZRwH2hyirQk8YUeeGoqc8gA06UjNqGJiiuSSA9zbXWETYIGvQ+00+wtdiB0FDg+lvDzoNiPHaMFuxL9SJpruqDwaMgTY/1uhs0KPIxgvPT61MvP/DxZ0asX5dXLSf1MTcCLDhVKV/LH4gRsSlJY2Y0FH+cgeT1CL5RCWNwcnxVSrkOke4blaXys3hRhhoXj/5fOvS15eyC2hAfOprUTdBs5sHQSf4EFB9L0+Ij0=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"582bf30409924c5c9e5f09df190453b2"}, [
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
  'a98b20fd-0a03-4a03-8751-c7f7152b1134',
  'x-ms-request-id',
  '6a24105e-6528-4d8a-beb3-1967f086f5a9',
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
  'Wed, 28 Apr 2021 20:58:33 GMT',
  'Content-Length',
  '1352'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroCreateCertificateName-canwaituntilacertificateiscreated-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroCreateCertificateName-canwaituntilacertificateiscreated-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEApqDGzSacJ+KpHSxTAyQJwpu+pHOI1aHY6duG8uHCFfukS0S8YMapuRX7Z9cpDyAhOEOMidw0mfCXv0RTdxLHEd0YxNN6x+WOhZfUibW4hrkEcJJ8YF1W9iUTs5vEjofIDKkgORHRS+/noHmaT1F2lGpctgTJmXXcVI7Dyqx761/+ThJGNlTmKLRYux2uRIRJPgyhtIOlmEtha4YH7lenh43k1RV9D0aa9iinZp3m/sjvcuQRUu+BT6CZ38mKyLxK3b2C1dRdQh+oqml3Fqs2qRz8X9tegznypsybJfmxH77cMEywfGfNT9QbYJLZOBVNBuL9PvxoaYPliDX1Kzvg0QIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAERwfK76y+OD53KMy15aqWfxi9xvEIdaVQE4xL3kaan9gTVyOh3qvRvxJV/z5nJQKN+sfgKCrpsdDTQctCYKYWmakQWQpZ++kSgTXgksATDa7t7mZRwH2hyirQk8YUeeGoqc8gA06UjNqGJiiuSSA9zbXWETYIGvQ+00+wtdiB0FDg+lvDzoNiPHaMFuxL9SJpruqDwaMgTY/1uhs0KPIxgvPT61MvP/DxZ0asX5dXLSf1MTcCLDhVKV/LH4gRsSlJY2Y0FH+cgeT1CL5RCWNwcnxVSrkOke4blaXys3hRhhoXj/5fOvS15eyC2hAfOprUTdBs5sHQSf4EFB9L0+Ij0=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"582bf30409924c5c9e5f09df190453b2"}, [
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
  'ff20760b-44fa-4167-81fd-b786b5d32db4',
  'x-ms-request-id',
  'cab1d935-892f-488b-a765-4d9afa97b294',
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
  'Wed, 28 Apr 2021 20:58:35 GMT',
  'Content-Length',
  '1352'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroCreateCertificateName-canwaituntilacertificateiscreated-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroCreateCertificateName-canwaituntilacertificateiscreated-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEApqDGzSacJ+KpHSxTAyQJwpu+pHOI1aHY6duG8uHCFfukS0S8YMapuRX7Z9cpDyAhOEOMidw0mfCXv0RTdxLHEd0YxNN6x+WOhZfUibW4hrkEcJJ8YF1W9iUTs5vEjofIDKkgORHRS+/noHmaT1F2lGpctgTJmXXcVI7Dyqx761/+ThJGNlTmKLRYux2uRIRJPgyhtIOlmEtha4YH7lenh43k1RV9D0aa9iinZp3m/sjvcuQRUu+BT6CZ38mKyLxK3b2C1dRdQh+oqml3Fqs2qRz8X9tegznypsybJfmxH77cMEywfGfNT9QbYJLZOBVNBuL9PvxoaYPliDX1Kzvg0QIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAERwfK76y+OD53KMy15aqWfxi9xvEIdaVQE4xL3kaan9gTVyOh3qvRvxJV/z5nJQKN+sfgKCrpsdDTQctCYKYWmakQWQpZ++kSgTXgksATDa7t7mZRwH2hyirQk8YUeeGoqc8gA06UjNqGJiiuSSA9zbXWETYIGvQ+00+wtdiB0FDg+lvDzoNiPHaMFuxL9SJpruqDwaMgTY/1uhs0KPIxgvPT61MvP/DxZ0asX5dXLSf1MTcCLDhVKV/LH4gRsSlJY2Y0FH+cgeT1CL5RCWNwcnxVSrkOke4blaXys3hRhhoXj/5fOvS15eyC2hAfOprUTdBs5sHQSf4EFB9L0+Ij0=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"582bf30409924c5c9e5f09df190453b2"}, [
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
  'c9dc03b9-1487-4a1d-a827-935fd83b4b8a',
  'x-ms-request-id',
  '603ba57c-fc5c-43ab-882e-a28bdfa17744',
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
  'Wed, 28 Apr 2021 20:58:37 GMT',
  'Content-Length',
  '1352'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroCreateCertificateName-canwaituntilacertificateiscreated-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroCreateCertificateName-canwaituntilacertificateiscreated-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEApqDGzSacJ+KpHSxTAyQJwpu+pHOI1aHY6duG8uHCFfukS0S8YMapuRX7Z9cpDyAhOEOMidw0mfCXv0RTdxLHEd0YxNN6x+WOhZfUibW4hrkEcJJ8YF1W9iUTs5vEjofIDKkgORHRS+/noHmaT1F2lGpctgTJmXXcVI7Dyqx761/+ThJGNlTmKLRYux2uRIRJPgyhtIOlmEtha4YH7lenh43k1RV9D0aa9iinZp3m/sjvcuQRUu+BT6CZ38mKyLxK3b2C1dRdQh+oqml3Fqs2qRz8X9tegznypsybJfmxH77cMEywfGfNT9QbYJLZOBVNBuL9PvxoaYPliDX1Kzvg0QIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAERwfK76y+OD53KMy15aqWfxi9xvEIdaVQE4xL3kaan9gTVyOh3qvRvxJV/z5nJQKN+sfgKCrpsdDTQctCYKYWmakQWQpZ++kSgTXgksATDa7t7mZRwH2hyirQk8YUeeGoqc8gA06UjNqGJiiuSSA9zbXWETYIGvQ+00+wtdiB0FDg+lvDzoNiPHaMFuxL9SJpruqDwaMgTY/1uhs0KPIxgvPT61MvP/DxZ0asX5dXLSf1MTcCLDhVKV/LH4gRsSlJY2Y0FH+cgeT1CL5RCWNwcnxVSrkOke4blaXys3hRhhoXj/5fOvS15eyC2hAfOprUTdBs5sHQSf4EFB9L0+Ij0=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"582bf30409924c5c9e5f09df190453b2"}, [
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
  '65ec706b-ceda-429f-9a7e-26053647c608',
  'x-ms-request-id',
  'ee4a62cf-2f78-4fc6-bb92-a87b62ce5f37',
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
  'Wed, 28 Apr 2021 20:58:39 GMT',
  'Content-Length',
  '1352'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroCreateCertificateName-canwaituntilacertificateiscreated-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroCreateCertificateName-canwaituntilacertificateiscreated-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEApqDGzSacJ+KpHSxTAyQJwpu+pHOI1aHY6duG8uHCFfukS0S8YMapuRX7Z9cpDyAhOEOMidw0mfCXv0RTdxLHEd0YxNN6x+WOhZfUibW4hrkEcJJ8YF1W9iUTs5vEjofIDKkgORHRS+/noHmaT1F2lGpctgTJmXXcVI7Dyqx761/+ThJGNlTmKLRYux2uRIRJPgyhtIOlmEtha4YH7lenh43k1RV9D0aa9iinZp3m/sjvcuQRUu+BT6CZ38mKyLxK3b2C1dRdQh+oqml3Fqs2qRz8X9tegznypsybJfmxH77cMEywfGfNT9QbYJLZOBVNBuL9PvxoaYPliDX1Kzvg0QIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAERwfK76y+OD53KMy15aqWfxi9xvEIdaVQE4xL3kaan9gTVyOh3qvRvxJV/z5nJQKN+sfgKCrpsdDTQctCYKYWmakQWQpZ++kSgTXgksATDa7t7mZRwH2hyirQk8YUeeGoqc8gA06UjNqGJiiuSSA9zbXWETYIGvQ+00+wtdiB0FDg+lvDzoNiPHaMFuxL9SJpruqDwaMgTY/1uhs0KPIxgvPT61MvP/DxZ0asX5dXLSf1MTcCLDhVKV/LH4gRsSlJY2Y0FH+cgeT1CL5RCWNwcnxVSrkOke4blaXys3hRhhoXj/5fOvS15eyC2hAfOprUTdBs5sHQSf4EFB9L0+Ij0=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"582bf30409924c5c9e5f09df190453b2"}, [
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
  '2c8e9add-0acd-48a1-a6b6-47b8019b557a',
  'x-ms-request-id',
  'cd61425c-95c0-4675-acd9-e90cfee21f1d',
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
  'Wed, 28 Apr 2021 20:58:41 GMT',
  'Content-Length',
  '1352'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroCreateCertificateName-canwaituntilacertificateiscreated-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroCreateCertificateName-canwaituntilacertificateiscreated-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEApqDGzSacJ+KpHSxTAyQJwpu+pHOI1aHY6duG8uHCFfukS0S8YMapuRX7Z9cpDyAhOEOMidw0mfCXv0RTdxLHEd0YxNN6x+WOhZfUibW4hrkEcJJ8YF1W9iUTs5vEjofIDKkgORHRS+/noHmaT1F2lGpctgTJmXXcVI7Dyqx761/+ThJGNlTmKLRYux2uRIRJPgyhtIOlmEtha4YH7lenh43k1RV9D0aa9iinZp3m/sjvcuQRUu+BT6CZ38mKyLxK3b2C1dRdQh+oqml3Fqs2qRz8X9tegznypsybJfmxH77cMEywfGfNT9QbYJLZOBVNBuL9PvxoaYPliDX1Kzvg0QIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAERwfK76y+OD53KMy15aqWfxi9xvEIdaVQE4xL3kaan9gTVyOh3qvRvxJV/z5nJQKN+sfgKCrpsdDTQctCYKYWmakQWQpZ++kSgTXgksATDa7t7mZRwH2hyirQk8YUeeGoqc8gA06UjNqGJiiuSSA9zbXWETYIGvQ+00+wtdiB0FDg+lvDzoNiPHaMFuxL9SJpruqDwaMgTY/1uhs0KPIxgvPT61MvP/DxZ0asX5dXLSf1MTcCLDhVKV/LH4gRsSlJY2Y0FH+cgeT1CL5RCWNwcnxVSrkOke4blaXys3hRhhoXj/5fOvS15eyC2hAfOprUTdBs5sHQSf4EFB9L0+Ij0=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"582bf30409924c5c9e5f09df190453b2"}, [
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
  '9b3d0ef0-71ac-4c0c-adce-ea2264459ccc',
  'x-ms-request-id',
  'd15105f5-abc7-401b-9bb6-98dd7e4f59ba',
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
  'Wed, 28 Apr 2021 20:58:43 GMT',
  'Content-Length',
  '1352'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroCreateCertificateName-canwaituntilacertificateiscreated-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroCreateCertificateName-canwaituntilacertificateiscreated-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEApqDGzSacJ+KpHSxTAyQJwpu+pHOI1aHY6duG8uHCFfukS0S8YMapuRX7Z9cpDyAhOEOMidw0mfCXv0RTdxLHEd0YxNN6x+WOhZfUibW4hrkEcJJ8YF1W9iUTs5vEjofIDKkgORHRS+/noHmaT1F2lGpctgTJmXXcVI7Dyqx761/+ThJGNlTmKLRYux2uRIRJPgyhtIOlmEtha4YH7lenh43k1RV9D0aa9iinZp3m/sjvcuQRUu+BT6CZ38mKyLxK3b2C1dRdQh+oqml3Fqs2qRz8X9tegznypsybJfmxH77cMEywfGfNT9QbYJLZOBVNBuL9PvxoaYPliDX1Kzvg0QIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAERwfK76y+OD53KMy15aqWfxi9xvEIdaVQE4xL3kaan9gTVyOh3qvRvxJV/z5nJQKN+sfgKCrpsdDTQctCYKYWmakQWQpZ++kSgTXgksATDa7t7mZRwH2hyirQk8YUeeGoqc8gA06UjNqGJiiuSSA9zbXWETYIGvQ+00+wtdiB0FDg+lvDzoNiPHaMFuxL9SJpruqDwaMgTY/1uhs0KPIxgvPT61MvP/DxZ0asX5dXLSf1MTcCLDhVKV/LH4gRsSlJY2Y0FH+cgeT1CL5RCWNwcnxVSrkOke4blaXys3hRhhoXj/5fOvS15eyC2hAfOprUTdBs5sHQSf4EFB9L0+Ij0=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"582bf30409924c5c9e5f09df190453b2"}, [
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
  '9107a3c7-99f6-4bdf-9bb5-33681587f141',
  'x-ms-request-id',
  '5bd4a083-f741-4b0f-84be-2f1f6617f983',
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
  'Wed, 28 Apr 2021 20:58:45 GMT',
  'Content-Length',
  '1352'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroCreateCertificateName-canwaituntilacertificateiscreated-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroCreateCertificateName-canwaituntilacertificateiscreated-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEApqDGzSacJ+KpHSxTAyQJwpu+pHOI1aHY6duG8uHCFfukS0S8YMapuRX7Z9cpDyAhOEOMidw0mfCXv0RTdxLHEd0YxNN6x+WOhZfUibW4hrkEcJJ8YF1W9iUTs5vEjofIDKkgORHRS+/noHmaT1F2lGpctgTJmXXcVI7Dyqx761/+ThJGNlTmKLRYux2uRIRJPgyhtIOlmEtha4YH7lenh43k1RV9D0aa9iinZp3m/sjvcuQRUu+BT6CZ38mKyLxK3b2C1dRdQh+oqml3Fqs2qRz8X9tegznypsybJfmxH77cMEywfGfNT9QbYJLZOBVNBuL9PvxoaYPliDX1Kzvg0QIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAERwfK76y+OD53KMy15aqWfxi9xvEIdaVQE4xL3kaan9gTVyOh3qvRvxJV/z5nJQKN+sfgKCrpsdDTQctCYKYWmakQWQpZ++kSgTXgksATDa7t7mZRwH2hyirQk8YUeeGoqc8gA06UjNqGJiiuSSA9zbXWETYIGvQ+00+wtdiB0FDg+lvDzoNiPHaMFuxL9SJpruqDwaMgTY/1uhs0KPIxgvPT61MvP/DxZ0asX5dXLSf1MTcCLDhVKV/LH4gRsSlJY2Y0FH+cgeT1CL5RCWNwcnxVSrkOke4blaXys3hRhhoXj/5fOvS15eyC2hAfOprUTdBs5sHQSf4EFB9L0+Ij0=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"582bf30409924c5c9e5f09df190453b2"}, [
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
  '9c2e76a6-95e2-49e1-be17-34d0ba3e8b14',
  'x-ms-request-id',
  '691641d1-556d-44c5-8db2-fa2015143035',
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
  'Wed, 28 Apr 2021 20:58:47 GMT',
  'Content-Length',
  '1352'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroCreateCertificateName-canwaituntilacertificateiscreated-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroCreateCertificateName-canwaituntilacertificateiscreated-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEApqDGzSacJ+KpHSxTAyQJwpu+pHOI1aHY6duG8uHCFfukS0S8YMapuRX7Z9cpDyAhOEOMidw0mfCXv0RTdxLHEd0YxNN6x+WOhZfUibW4hrkEcJJ8YF1W9iUTs5vEjofIDKkgORHRS+/noHmaT1F2lGpctgTJmXXcVI7Dyqx761/+ThJGNlTmKLRYux2uRIRJPgyhtIOlmEtha4YH7lenh43k1RV9D0aa9iinZp3m/sjvcuQRUu+BT6CZ38mKyLxK3b2C1dRdQh+oqml3Fqs2qRz8X9tegznypsybJfmxH77cMEywfGfNT9QbYJLZOBVNBuL9PvxoaYPliDX1Kzvg0QIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAERwfK76y+OD53KMy15aqWfxi9xvEIdaVQE4xL3kaan9gTVyOh3qvRvxJV/z5nJQKN+sfgKCrpsdDTQctCYKYWmakQWQpZ++kSgTXgksATDa7t7mZRwH2hyirQk8YUeeGoqc8gA06UjNqGJiiuSSA9zbXWETYIGvQ+00+wtdiB0FDg+lvDzoNiPHaMFuxL9SJpruqDwaMgTY/1uhs0KPIxgvPT61MvP/DxZ0asX5dXLSf1MTcCLDhVKV/LH4gRsSlJY2Y0FH+cgeT1CL5RCWNwcnxVSrkOke4blaXys3hRhhoXj/5fOvS15eyC2hAfOprUTdBs5sHQSf4EFB9L0+Ij0=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"582bf30409924c5c9e5f09df190453b2"}, [
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
  'a500ef51-0815-4711-ae2d-ccbb1fa1c580',
  'x-ms-request-id',
  '29507e5e-9d79-410b-8561-9f2184875da0',
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
  'Wed, 28 Apr 2021 20:58:50 GMT',
  'Content-Length',
  '1352'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroCreateCertificateName-canwaituntilacertificateiscreated-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroCreateCertificateName-canwaituntilacertificateiscreated-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEApqDGzSacJ+KpHSxTAyQJwpu+pHOI1aHY6duG8uHCFfukS0S8YMapuRX7Z9cpDyAhOEOMidw0mfCXv0RTdxLHEd0YxNN6x+WOhZfUibW4hrkEcJJ8YF1W9iUTs5vEjofIDKkgORHRS+/noHmaT1F2lGpctgTJmXXcVI7Dyqx761/+ThJGNlTmKLRYux2uRIRJPgyhtIOlmEtha4YH7lenh43k1RV9D0aa9iinZp3m/sjvcuQRUu+BT6CZ38mKyLxK3b2C1dRdQh+oqml3Fqs2qRz8X9tegznypsybJfmxH77cMEywfGfNT9QbYJLZOBVNBuL9PvxoaYPliDX1Kzvg0QIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAERwfK76y+OD53KMy15aqWfxi9xvEIdaVQE4xL3kaan9gTVyOh3qvRvxJV/z5nJQKN+sfgKCrpsdDTQctCYKYWmakQWQpZ++kSgTXgksATDa7t7mZRwH2hyirQk8YUeeGoqc8gA06UjNqGJiiuSSA9zbXWETYIGvQ+00+wtdiB0FDg+lvDzoNiPHaMFuxL9SJpruqDwaMgTY/1uhs0KPIxgvPT61MvP/DxZ0asX5dXLSf1MTcCLDhVKV/LH4gRsSlJY2Y0FH+cgeT1CL5RCWNwcnxVSrkOke4blaXys3hRhhoXj/5fOvS15eyC2hAfOprUTdBs5sHQSf4EFB9L0+Ij0=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"582bf30409924c5c9e5f09df190453b2"}, [
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
  '0e297dd6-0852-491c-900d-eb69c703775d',
  'x-ms-request-id',
  '4c510cac-7c96-4aa9-ac07-a17dd30387de',
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
  'Wed, 28 Apr 2021 20:58:52 GMT',
  'Content-Length',
  '1352'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroCreateCertificateName-canwaituntilacertificateiscreated-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroCreateCertificateName-canwaituntilacertificateiscreated-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEApqDGzSacJ+KpHSxTAyQJwpu+pHOI1aHY6duG8uHCFfukS0S8YMapuRX7Z9cpDyAhOEOMidw0mfCXv0RTdxLHEd0YxNN6x+WOhZfUibW4hrkEcJJ8YF1W9iUTs5vEjofIDKkgORHRS+/noHmaT1F2lGpctgTJmXXcVI7Dyqx761/+ThJGNlTmKLRYux2uRIRJPgyhtIOlmEtha4YH7lenh43k1RV9D0aa9iinZp3m/sjvcuQRUu+BT6CZ38mKyLxK3b2C1dRdQh+oqml3Fqs2qRz8X9tegznypsybJfmxH77cMEywfGfNT9QbYJLZOBVNBuL9PvxoaYPliDX1Kzvg0QIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAERwfK76y+OD53KMy15aqWfxi9xvEIdaVQE4xL3kaan9gTVyOh3qvRvxJV/z5nJQKN+sfgKCrpsdDTQctCYKYWmakQWQpZ++kSgTXgksATDa7t7mZRwH2hyirQk8YUeeGoqc8gA06UjNqGJiiuSSA9zbXWETYIGvQ+00+wtdiB0FDg+lvDzoNiPHaMFuxL9SJpruqDwaMgTY/1uhs0KPIxgvPT61MvP/DxZ0asX5dXLSf1MTcCLDhVKV/LH4gRsSlJY2Y0FH+cgeT1CL5RCWNwcnxVSrkOke4blaXys3hRhhoXj/5fOvS15eyC2hAfOprUTdBs5sHQSf4EFB9L0+Ij0=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"582bf30409924c5c9e5f09df190453b2"}, [
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
  '63b9c850-5bce-4ffa-9e4e-0fa447e7d351',
  'x-ms-request-id',
  'bfe5af15-7d54-4922-ae23-f4576e73942f',
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
  'Wed, 28 Apr 2021 20:58:54 GMT',
  'Content-Length',
  '1352'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroCreateCertificateName-canwaituntilacertificateiscreated-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroCreateCertificateName-canwaituntilacertificateiscreated-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEApqDGzSacJ+KpHSxTAyQJwpu+pHOI1aHY6duG8uHCFfukS0S8YMapuRX7Z9cpDyAhOEOMidw0mfCXv0RTdxLHEd0YxNN6x+WOhZfUibW4hrkEcJJ8YF1W9iUTs5vEjofIDKkgORHRS+/noHmaT1F2lGpctgTJmXXcVI7Dyqx761/+ThJGNlTmKLRYux2uRIRJPgyhtIOlmEtha4YH7lenh43k1RV9D0aa9iinZp3m/sjvcuQRUu+BT6CZ38mKyLxK3b2C1dRdQh+oqml3Fqs2qRz8X9tegznypsybJfmxH77cMEywfGfNT9QbYJLZOBVNBuL9PvxoaYPliDX1Kzvg0QIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAERwfK76y+OD53KMy15aqWfxi9xvEIdaVQE4xL3kaan9gTVyOh3qvRvxJV/z5nJQKN+sfgKCrpsdDTQctCYKYWmakQWQpZ++kSgTXgksATDa7t7mZRwH2hyirQk8YUeeGoqc8gA06UjNqGJiiuSSA9zbXWETYIGvQ+00+wtdiB0FDg+lvDzoNiPHaMFuxL9SJpruqDwaMgTY/1uhs0KPIxgvPT61MvP/DxZ0asX5dXLSf1MTcCLDhVKV/LH4gRsSlJY2Y0FH+cgeT1CL5RCWNwcnxVSrkOke4blaXys3hRhhoXj/5fOvS15eyC2hAfOprUTdBs5sHQSf4EFB9L0+Ij0=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"582bf30409924c5c9e5f09df190453b2"}, [
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
  '7574657c-fb74-4ea2-b40e-80e02b96ee5e',
  'x-ms-request-id',
  '5d9e2d01-cb9f-4deb-9b71-8407cc1d05ec',
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
  'Wed, 28 Apr 2021 20:58:56 GMT',
  'Content-Length',
  '1352'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroCreateCertificateName-canwaituntilacertificateiscreated-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroCreateCertificateName-canwaituntilacertificateiscreated-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEApqDGzSacJ+KpHSxTAyQJwpu+pHOI1aHY6duG8uHCFfukS0S8YMapuRX7Z9cpDyAhOEOMidw0mfCXv0RTdxLHEd0YxNN6x+WOhZfUibW4hrkEcJJ8YF1W9iUTs5vEjofIDKkgORHRS+/noHmaT1F2lGpctgTJmXXcVI7Dyqx761/+ThJGNlTmKLRYux2uRIRJPgyhtIOlmEtha4YH7lenh43k1RV9D0aa9iinZp3m/sjvcuQRUu+BT6CZ38mKyLxK3b2C1dRdQh+oqml3Fqs2qRz8X9tegznypsybJfmxH77cMEywfGfNT9QbYJLZOBVNBuL9PvxoaYPliDX1Kzvg0QIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAERwfK76y+OD53KMy15aqWfxi9xvEIdaVQE4xL3kaan9gTVyOh3qvRvxJV/z5nJQKN+sfgKCrpsdDTQctCYKYWmakQWQpZ++kSgTXgksATDa7t7mZRwH2hyirQk8YUeeGoqc8gA06UjNqGJiiuSSA9zbXWETYIGvQ+00+wtdiB0FDg+lvDzoNiPHaMFuxL9SJpruqDwaMgTY/1uhs0KPIxgvPT61MvP/DxZ0asX5dXLSf1MTcCLDhVKV/LH4gRsSlJY2Y0FH+cgeT1CL5RCWNwcnxVSrkOke4blaXys3hRhhoXj/5fOvS15eyC2hAfOprUTdBs5sHQSf4EFB9L0+Ij0=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"582bf30409924c5c9e5f09df190453b2"}, [
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
  'bae33a0e-880f-4027-82a6-599aa1195ba6',
  'x-ms-request-id',
  '1555b8be-b5dd-4dda-aa4d-d763d4102efa',
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
  'Wed, 28 Apr 2021 20:58:58 GMT',
  'Content-Length',
  '1352'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroCreateCertificateName-canwaituntilacertificateiscreated-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroCreateCertificateName-canwaituntilacertificateiscreated-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEApqDGzSacJ+KpHSxTAyQJwpu+pHOI1aHY6duG8uHCFfukS0S8YMapuRX7Z9cpDyAhOEOMidw0mfCXv0RTdxLHEd0YxNN6x+WOhZfUibW4hrkEcJJ8YF1W9iUTs5vEjofIDKkgORHRS+/noHmaT1F2lGpctgTJmXXcVI7Dyqx761/+ThJGNlTmKLRYux2uRIRJPgyhtIOlmEtha4YH7lenh43k1RV9D0aa9iinZp3m/sjvcuQRUu+BT6CZ38mKyLxK3b2C1dRdQh+oqml3Fqs2qRz8X9tegznypsybJfmxH77cMEywfGfNT9QbYJLZOBVNBuL9PvxoaYPliDX1Kzvg0QIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAERwfK76y+OD53KMy15aqWfxi9xvEIdaVQE4xL3kaan9gTVyOh3qvRvxJV/z5nJQKN+sfgKCrpsdDTQctCYKYWmakQWQpZ++kSgTXgksATDa7t7mZRwH2hyirQk8YUeeGoqc8gA06UjNqGJiiuSSA9zbXWETYIGvQ+00+wtdiB0FDg+lvDzoNiPHaMFuxL9SJpruqDwaMgTY/1uhs0KPIxgvPT61MvP/DxZ0asX5dXLSf1MTcCLDhVKV/LH4gRsSlJY2Y0FH+cgeT1CL5RCWNwcnxVSrkOke4blaXys3hRhhoXj/5fOvS15eyC2hAfOprUTdBs5sHQSf4EFB9L0+Ij0=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"582bf30409924c5c9e5f09df190453b2"}, [
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
  'd95d5d7e-4a46-4e8e-aba9-627ab88543cf',
  'x-ms-request-id',
  'c2c2c48d-91ed-42bc-a0b8-5948bfcea60a',
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
  'Wed, 28 Apr 2021 20:58:59 GMT',
  'Content-Length',
  '1352'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroCreateCertificateName-canwaituntilacertificateiscreated-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroCreateCertificateName-canwaituntilacertificateiscreated-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEApqDGzSacJ+KpHSxTAyQJwpu+pHOI1aHY6duG8uHCFfukS0S8YMapuRX7Z9cpDyAhOEOMidw0mfCXv0RTdxLHEd0YxNN6x+WOhZfUibW4hrkEcJJ8YF1W9iUTs5vEjofIDKkgORHRS+/noHmaT1F2lGpctgTJmXXcVI7Dyqx761/+ThJGNlTmKLRYux2uRIRJPgyhtIOlmEtha4YH7lenh43k1RV9D0aa9iinZp3m/sjvcuQRUu+BT6CZ38mKyLxK3b2C1dRdQh+oqml3Fqs2qRz8X9tegznypsybJfmxH77cMEywfGfNT9QbYJLZOBVNBuL9PvxoaYPliDX1Kzvg0QIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAERwfK76y+OD53KMy15aqWfxi9xvEIdaVQE4xL3kaan9gTVyOh3qvRvxJV/z5nJQKN+sfgKCrpsdDTQctCYKYWmakQWQpZ++kSgTXgksATDa7t7mZRwH2hyirQk8YUeeGoqc8gA06UjNqGJiiuSSA9zbXWETYIGvQ+00+wtdiB0FDg+lvDzoNiPHaMFuxL9SJpruqDwaMgTY/1uhs0KPIxgvPT61MvP/DxZ0asX5dXLSf1MTcCLDhVKV/LH4gRsSlJY2Y0FH+cgeT1CL5RCWNwcnxVSrkOke4blaXys3hRhhoXj/5fOvS15eyC2hAfOprUTdBs5sHQSf4EFB9L0+Ij0=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"582bf30409924c5c9e5f09df190453b2"}, [
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
  'aff9ca90-1829-4eee-8028-4d4fdb573e4c',
  'x-ms-request-id',
  'ddcc8b9c-02e2-452f-8b62-fc520e513b1c',
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
  'Wed, 28 Apr 2021 20:59:01 GMT',
  'Content-Length',
  '1352'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroCreateCertificateName-canwaituntilacertificateiscreated-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroCreateCertificateName-canwaituntilacertificateiscreated-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEApqDGzSacJ+KpHSxTAyQJwpu+pHOI1aHY6duG8uHCFfukS0S8YMapuRX7Z9cpDyAhOEOMidw0mfCXv0RTdxLHEd0YxNN6x+WOhZfUibW4hrkEcJJ8YF1W9iUTs5vEjofIDKkgORHRS+/noHmaT1F2lGpctgTJmXXcVI7Dyqx761/+ThJGNlTmKLRYux2uRIRJPgyhtIOlmEtha4YH7lenh43k1RV9D0aa9iinZp3m/sjvcuQRUu+BT6CZ38mKyLxK3b2C1dRdQh+oqml3Fqs2qRz8X9tegznypsybJfmxH77cMEywfGfNT9QbYJLZOBVNBuL9PvxoaYPliDX1Kzvg0QIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAERwfK76y+OD53KMy15aqWfxi9xvEIdaVQE4xL3kaan9gTVyOh3qvRvxJV/z5nJQKN+sfgKCrpsdDTQctCYKYWmakQWQpZ++kSgTXgksATDa7t7mZRwH2hyirQk8YUeeGoqc8gA06UjNqGJiiuSSA9zbXWETYIGvQ+00+wtdiB0FDg+lvDzoNiPHaMFuxL9SJpruqDwaMgTY/1uhs0KPIxgvPT61MvP/DxZ0asX5dXLSf1MTcCLDhVKV/LH4gRsSlJY2Y0FH+cgeT1CL5RCWNwcnxVSrkOke4blaXys3hRhhoXj/5fOvS15eyC2hAfOprUTdBs5sHQSf4EFB9L0+Ij0=","cancellation_requested":false,"status":"completed","target":"https://keyvault_name.vault.azure.net/certificates/lroCreateCertificateName-canwaituntilacertificateiscreated-","request_id":"582bf30409924c5c9e5f09df190453b2"}, [
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
  '79b0f3bd-28e4-4f24-b2f4-22487bcb4b79',
  'x-ms-request-id',
  'ae785e1b-a939-4252-a4c3-808e1e674ccf',
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
  'Wed, 28 Apr 2021 20:59:03 GMT',
  'Content-Length',
  '1331'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroCreateCertificateName-canwaituntilacertificateiscreated-/')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroCreateCertificateName-canwaituntilacertificateiscreated-/5b19998dd0074efbb32e6b9f780a6f92","kid":"https://keyvault_name.vault.azure.net/keys/lroCreateCertificateName-canwaituntilacertificateiscreated-/5b19998dd0074efbb32e6b9f780a6f92","sid":"https://keyvault_name.vault.azure.net/secrets/lroCreateCertificateName-canwaituntilacertificateiscreated-/5b19998dd0074efbb32e6b9f780a6f92","x5t":"tcTTGzL2CfBTCtKFKV0GrRTPVCA","cer":"MIIDKDCCAhCgAwIBAgIQEvwFZlVGQ8KSRjVx1UcRtzANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjEwNDI4MjA0OTAyWhcNMjIwNDI4MjA1OTAyWjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQCmoMbNJpwn4qkdLFMDJAnCm76kc4jVodjp24by4cIV+6RLRLxgxqm5Fftn1ykPICE4Q4yJ3DSZ8Je/RFN3EscR3RjE03rH5Y6Fl9SJtbiGuQRwknxgXVb2JROzm8SOh8gMqSA5EdFL7+egeZpPUXaUaly2BMmZddxUjsPKrHvrX/5OEkY2VOYotFi7Ha5EhEk+DKG0g6WYS2FrhgfuV6eHjeTVFX0PRpr2KKdmneb+yO9y5BFS74FPoJnfyYrIvErdvYLV1F1CH6iqaXcWqzapHPxf216DOfKmzJsl+bEfvtwwTLB8Z81P1Btgktk4FU0G4v0+/Ghpg+WINfUrO+DRAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBR2zX/oOLdryLIdrpvPRSdv8JGPVjAdBgNVHQ4EFgQUds1/6Di3a8iyHa6bz0Unb/CRj1YwDQYJKoZIhvcNAQELBQADggEBAFQXVMpQYk9Br2zvMMV5zvbbVM9u4pqX4ZdhlRLVl/MR6Cj5/Bcg4wSr54Ww9tfUAGGI5sZ2YXC8kKzyZPqqSmz2v46dzd2XdTmVa4rpDggGZrgPX8N7SnsSMQrOzxe41hQngAL3yuBjtE61CZkSNiFIGnIkfLxJSud7VLKkzvqlUWzzCFuhK7O8tlYuvsCkttOvq4FE5WuwcCDjrUZyKtKMy6nwZQeaSjgMSyyFPBnJ/h3KrxoB5/Qzi/nfU/MgJXHw9n/p7h1wtVxSIhz5XQYEaaLi0pzuWPasvGB24m1MoHoijHIss0CIvgIcojNPFvWjgUNKyI5JGzwPdRQABE0=","attributes":{"enabled":true,"nbf":1619642942,"exp":1651179542,"created":1619643542,"updated":1619643542,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/lroCreateCertificateName-canwaituntilacertificateiscreated-/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1619643506,"updated":1619643506}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/lroCreateCertificateName-canwaituntilacertificateiscreated-/pending"}}, [
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
  'ad19812a-3a96-43dc-8f7e-35d640e6dd63',
  'x-ms-request-id',
  '1645f89f-a2a4-4aaf-b7fa-6d1da87cde69',
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
  'Wed, 28 Apr 2021 20:59:04 GMT',
  'Content-Length',
  '2650'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/certificates/lroCreateCertificateName-canwaituntilacertificateiscreated-')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/lroCreateCertificateName-canwaituntilacertificateiscreated-","deletedDate":1619643544,"scheduledPurgeDate":1627419544,"id":"https://keyvault_name.vault.azure.net/certificates/lroCreateCertificateName-canwaituntilacertificateiscreated-/5b19998dd0074efbb32e6b9f780a6f92","kid":"https://keyvault_name.vault.azure.net/keys/lroCreateCertificateName-canwaituntilacertificateiscreated-/5b19998dd0074efbb32e6b9f780a6f92","sid":"https://keyvault_name.vault.azure.net/secrets/lroCreateCertificateName-canwaituntilacertificateiscreated-/5b19998dd0074efbb32e6b9f780a6f92","x5t":"tcTTGzL2CfBTCtKFKV0GrRTPVCA","cer":"MIIDKDCCAhCgAwIBAgIQEvwFZlVGQ8KSRjVx1UcRtzANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjEwNDI4MjA0OTAyWhcNMjIwNDI4MjA1OTAyWjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQCmoMbNJpwn4qkdLFMDJAnCm76kc4jVodjp24by4cIV+6RLRLxgxqm5Fftn1ykPICE4Q4yJ3DSZ8Je/RFN3EscR3RjE03rH5Y6Fl9SJtbiGuQRwknxgXVb2JROzm8SOh8gMqSA5EdFL7+egeZpPUXaUaly2BMmZddxUjsPKrHvrX/5OEkY2VOYotFi7Ha5EhEk+DKG0g6WYS2FrhgfuV6eHjeTVFX0PRpr2KKdmneb+yO9y5BFS74FPoJnfyYrIvErdvYLV1F1CH6iqaXcWqzapHPxf216DOfKmzJsl+bEfvtwwTLB8Z81P1Btgktk4FU0G4v0+/Ghpg+WINfUrO+DRAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBR2zX/oOLdryLIdrpvPRSdv8JGPVjAdBgNVHQ4EFgQUds1/6Di3a8iyHa6bz0Unb/CRj1YwDQYJKoZIhvcNAQELBQADggEBAFQXVMpQYk9Br2zvMMV5zvbbVM9u4pqX4ZdhlRLVl/MR6Cj5/Bcg4wSr54Ww9tfUAGGI5sZ2YXC8kKzyZPqqSmz2v46dzd2XdTmVa4rpDggGZrgPX8N7SnsSMQrOzxe41hQngAL3yuBjtE61CZkSNiFIGnIkfLxJSud7VLKkzvqlUWzzCFuhK7O8tlYuvsCkttOvq4FE5WuwcCDjrUZyKtKMy6nwZQeaSjgMSyyFPBnJ/h3KrxoB5/Qzi/nfU/MgJXHw9n/p7h1wtVxSIhz5XQYEaaLi0pzuWPasvGB24m1MoHoijHIss0CIvgIcojNPFvWjgUNKyI5JGzwPdRQABE0=","attributes":{"enabled":true,"nbf":1619642942,"exp":1651179542,"created":1619643542,"updated":1619643542,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/lroCreateCertificateName-canwaituntilacertificateiscreated-/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1619643506,"updated":1619643506}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/lroCreateCertificateName-canwaituntilacertificateiscreated-/pending"}}, [
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
  '81d350fd-9bd3-4ae5-be48-d3c77fb44d6f',
  'x-ms-request-id',
  '2c2e6aca-946f-4340-893b-2c94924fc3cb',
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
  'Wed, 28 Apr 2021 20:59:04 GMT',
  'Content-Length',
  '2862'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroCreateCertificateName-canwaituntilacertificateiscreated-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroCreateCertificateName-canwaituntilacertificateiscreated-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '159',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '010ae147-d969-4bb8-9f1e-cfcff9adb9c3',
  'x-ms-request-id',
  'a88baa90-39be-4963-962e-64d366a411a3',
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
  'Wed, 28 Apr 2021 20:59:04 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroCreateCertificateName-canwaituntilacertificateiscreated-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroCreateCertificateName-canwaituntilacertificateiscreated-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '159',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '0cfe1c4d-546a-4586-8520-6fa21f0df1fa',
  'x-ms-request-id',
  'eaf46ada-17a1-4b76-990c-609fd5f27d91',
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
  'Wed, 28 Apr 2021 20:59:04 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroCreateCertificateName-canwaituntilacertificateiscreated-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroCreateCertificateName-canwaituntilacertificateiscreated-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '159',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'cb9a505f-01db-4fd2-ab57-038adb07f18b',
  'x-ms-request-id',
  '4906873d-68f6-47b6-b3c8-c6b21b5e575d',
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
  'Wed, 28 Apr 2021 20:59:07 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroCreateCertificateName-canwaituntilacertificateiscreated-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroCreateCertificateName-canwaituntilacertificateiscreated-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '159',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '3f48d49f-85f6-4a49-9499-77c060cae6d2',
  'x-ms-request-id',
  '632a23c7-5b76-42b5-ba83-97217cc09f85',
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
  'Wed, 28 Apr 2021 20:59:08 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroCreateCertificateName-canwaituntilacertificateiscreated-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroCreateCertificateName-canwaituntilacertificateiscreated-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '159',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '1b1ff69b-4662-47b6-893b-9c188d59695f',
  'x-ms-request-id',
  'fb7f37be-9378-49c9-a6fe-467e291eac7a',
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
  'Wed, 28 Apr 2021 20:59:11 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroCreateCertificateName-canwaituntilacertificateiscreated-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroCreateCertificateName-canwaituntilacertificateiscreated-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '159',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'ef67f3a0-3efc-4c70-8a75-50161dc656e6',
  'x-ms-request-id',
  '194ebdad-b02d-4e97-93f4-b2adff306991',
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
  'Wed, 28 Apr 2021 20:59:13 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroCreateCertificateName-canwaituntilacertificateiscreated-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroCreateCertificateName-canwaituntilacertificateiscreated-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '159',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'cd55958b-45fc-40f1-8d39-d0007cb5190e',
  'x-ms-request-id',
  '15790df0-d163-4ebf-8ce1-74d0fb8288c2',
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
  'Wed, 28 Apr 2021 20:59:15 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroCreateCertificateName-canwaituntilacertificateiscreated-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroCreateCertificateName-canwaituntilacertificateiscreated-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '159',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '8f3e575d-d284-4492-b50e-e4a56af0f199',
  'x-ms-request-id',
  '341de960-984c-43a9-91ca-3368caaf9891',
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
  'Wed, 28 Apr 2021 20:59:17 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroCreateCertificateName-canwaituntilacertificateiscreated-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroCreateCertificateName-canwaituntilacertificateiscreated-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '159',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '5a986c0b-3f13-4a96-b97d-0e6f0644f3be',
  'x-ms-request-id',
  'ff253f41-e781-4d4e-9d24-de6a177e23d1',
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
  'Wed, 28 Apr 2021 20:59:19 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroCreateCertificateName-canwaituntilacertificateiscreated-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroCreateCertificateName-canwaituntilacertificateiscreated-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '159',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '7633acb6-211f-485b-9c6c-1c4a4569e1a6',
  'x-ms-request-id',
  '4552dcbf-c5cb-4965-9781-13c559a4b4c2',
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
  'Wed, 28 Apr 2021 20:59:21 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroCreateCertificateName-canwaituntilacertificateiscreated-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroCreateCertificateName-canwaituntilacertificateiscreated-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '159',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '8afbe034-3858-4357-8f25-7f7da04d3a95',
  'x-ms-request-id',
  '3360af1b-aed3-4e64-a7d1-4be621b9d642',
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
  'Wed, 28 Apr 2021 20:59:23 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroCreateCertificateName-canwaituntilacertificateiscreated-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroCreateCertificateName-canwaituntilacertificateiscreated-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '159',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'e67fb23d-4a5a-418f-a3f2-5128aa93109e',
  'x-ms-request-id',
  '121c1a5b-7bef-4d0a-9f7e-33b911e90809',
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
  'Wed, 28 Apr 2021 20:59:26 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroCreateCertificateName-canwaituntilacertificateiscreated-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroCreateCertificateName-canwaituntilacertificateiscreated-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '159',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'ae0f3591-3d66-48eb-8e5a-d6ec20702da3',
  'x-ms-request-id',
  '8309119b-524c-4556-ab57-e6a86aae6491',
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
  'Wed, 28 Apr 2021 20:59:28 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroCreateCertificateName-canwaituntilacertificateiscreated-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroCreateCertificateName-canwaituntilacertificateiscreated-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '159',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '88e6d9d7-f30e-4af1-91c3-6cd79b132abd',
  'x-ms-request-id',
  'd5fc843d-8ac3-4195-b55e-5ebafd812dab',
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
  'Wed, 28 Apr 2021 20:59:30 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroCreateCertificateName-canwaituntilacertificateiscreated-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroCreateCertificateName-canwaituntilacertificateiscreated-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '159',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'edb0436c-a888-4f54-964b-2235d23d654b',
  'x-ms-request-id',
  '9173f1cc-e96e-4480-917c-f6cae0bc2899',
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
  'Wed, 28 Apr 2021 20:59:32 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroCreateCertificateName-canwaituntilacertificateiscreated-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroCreateCertificateName-canwaituntilacertificateiscreated-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '159',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '2da517ed-a539-47f6-9734-77ce10dec743',
  'x-ms-request-id',
  '25e4ecd3-9c97-49a3-8d8a-3fad148984dc',
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
  'Wed, 28 Apr 2021 20:59:34 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroCreateCertificateName-canwaituntilacertificateiscreated-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroCreateCertificateName-canwaituntilacertificateiscreated-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '159',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '0c23201f-5bb6-40a1-89c4-7d3d6844edb3',
  'x-ms-request-id',
  'eaf4f153-512f-45fc-afa1-414808eb4914',
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
  'Wed, 28 Apr 2021 20:59:36 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroCreateCertificateName-canwaituntilacertificateiscreated-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroCreateCertificateName-canwaituntilacertificateiscreated-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '159',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'c181cdbb-3a6e-41d9-a145-8ae6b727c865',
  'x-ms-request-id',
  'fcedd6df-211d-42d9-9640-de7fb3f2b48f',
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
  'Wed, 28 Apr 2021 20:59:38 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroCreateCertificateName-canwaituntilacertificateiscreated-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroCreateCertificateName-canwaituntilacertificateiscreated-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '159',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '6b8ac2db-5742-4f4f-8bfd-55ec0c4b3830',
  'x-ms-request-id',
  'a33d5691-4efb-4771-995b-bcc119ed29d8',
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
  'Wed, 28 Apr 2021 20:59:40 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroCreateCertificateName-canwaituntilacertificateiscreated-')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/lroCreateCertificateName-canwaituntilacertificateiscreated-","deletedDate":1619643544,"scheduledPurgeDate":1627419544,"id":"https://keyvault_name.vault.azure.net/certificates/lroCreateCertificateName-canwaituntilacertificateiscreated-/5b19998dd0074efbb32e6b9f780a6f92","kid":"https://keyvault_name.vault.azure.net/keys/lroCreateCertificateName-canwaituntilacertificateiscreated-/5b19998dd0074efbb32e6b9f780a6f92","sid":"https://keyvault_name.vault.azure.net/secrets/lroCreateCertificateName-canwaituntilacertificateiscreated-/5b19998dd0074efbb32e6b9f780a6f92","x5t":"tcTTGzL2CfBTCtKFKV0GrRTPVCA","cer":"MIIDKDCCAhCgAwIBAgIQEvwFZlVGQ8KSRjVx1UcRtzANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjEwNDI4MjA0OTAyWhcNMjIwNDI4MjA1OTAyWjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQCmoMbNJpwn4qkdLFMDJAnCm76kc4jVodjp24by4cIV+6RLRLxgxqm5Fftn1ykPICE4Q4yJ3DSZ8Je/RFN3EscR3RjE03rH5Y6Fl9SJtbiGuQRwknxgXVb2JROzm8SOh8gMqSA5EdFL7+egeZpPUXaUaly2BMmZddxUjsPKrHvrX/5OEkY2VOYotFi7Ha5EhEk+DKG0g6WYS2FrhgfuV6eHjeTVFX0PRpr2KKdmneb+yO9y5BFS74FPoJnfyYrIvErdvYLV1F1CH6iqaXcWqzapHPxf216DOfKmzJsl+bEfvtwwTLB8Z81P1Btgktk4FU0G4v0+/Ghpg+WINfUrO+DRAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBR2zX/oOLdryLIdrpvPRSdv8JGPVjAdBgNVHQ4EFgQUds1/6Di3a8iyHa6bz0Unb/CRj1YwDQYJKoZIhvcNAQELBQADggEBAFQXVMpQYk9Br2zvMMV5zvbbVM9u4pqX4ZdhlRLVl/MR6Cj5/Bcg4wSr54Ww9tfUAGGI5sZ2YXC8kKzyZPqqSmz2v46dzd2XdTmVa4rpDggGZrgPX8N7SnsSMQrOzxe41hQngAL3yuBjtE61CZkSNiFIGnIkfLxJSud7VLKkzvqlUWzzCFuhK7O8tlYuvsCkttOvq4FE5WuwcCDjrUZyKtKMy6nwZQeaSjgMSyyFPBnJ/h3KrxoB5/Qzi/nfU/MgJXHw9n/p7h1wtVxSIhz5XQYEaaLi0pzuWPasvGB24m1MoHoijHIss0CIvgIcojNPFvWjgUNKyI5JGzwPdRQABE0=","attributes":{"enabled":true,"nbf":1619642942,"exp":1651179542,"created":1619643542,"updated":1619643542,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/lroCreateCertificateName-canwaituntilacertificateiscreated-/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1619643506,"updated":1619643506}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/lroCreateCertificateName-canwaituntilacertificateiscreated-/pending"}}, [
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
  '854e87c4-603b-426b-90bd-9ae84ee0fb7e',
  'x-ms-request-id',
  'b8530bee-2110-45eb-92f0-c83560d7314d',
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
  'Wed, 28 Apr 2021 20:59:42 GMT',
  'Content-Length',
  '2862'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedcertificates/lroCreateCertificateName-canwaituntilacertificateiscreated-')
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
  'eca7d21d-7a36-4deb-9278-cd14be49f824',
  'x-ms-request-id',
  '846bda01-045b-4d13-864e-a29ad21463db',
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

let nock = require('nock');

module.exports.hash = "52c4d719413e16cee69a104b93be4c77";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/certificates/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-0/create')
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
  '7ead83f2-6297-4c1a-bec6-8843b69fa1c3',
  'x-ms-request-id',
  '40991503-bfa3-4c68-a69c-2ad978287998',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:42:58 GMT'
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
  '528188e0-f90a-4263-b307-ab2f06632d00',
  'x-ms-ests-server',
  '2.1.11654.16 - SCUS ProdSlices',
  'Set-Cookie',
  'fpc=ArwmQ1W5Q_pEig-aUDD0fZjmR1YbAQAAAOnMG9gOAAAA; expires=Fri, 28-May-2021 21:42:59 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevr4Q9IvI2BB-vmKZ9IzK4MrkrolIIjvW-SGQRYUW8eYBrM7dDmYxlDvK6BXDfYXWu0fiSoZE4OsmZI-fSwwwvcs4AOrm3wbtsEla4LwJ_aklzMO6A5-_LpWwFrpoMmpLklpI7YDNffg9ePPdjTfFiuWYWoPNWcJPAZc-ZCaQ-04qcgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 28 Apr 2021 21:42:59 GMT',
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
  '9bc96623-8741-4c72-883e-0d2e196f1d01',
  'x-ms-ests-server',
  '2.1.11654.16 - EUS ProdSlices',
  'Set-Cookie',
  'fpc=ArwmQ1W5Q_pEig-aUDD0fZjmR1YbAQAAAOnMG9gOAAAA; expires=Fri, 28-May-2021 21:42:59 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrnmjlJOF8fWdnXTou61G_PzNqkfW0xBBgbdvLjgXkupqamwwIHTeYUH78-NKMoC_mmj_1X5ynu69N5_WGIaUYOhCMk_pf69H5D3TK3M0Vm4O3Dq3qntMEcRIyQXyhe_l6u-mkSee1DNLRegT465eZbLwnpKh3Ybs3fMTJJTqQfgUgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 28 Apr 2021 21:42:59 GMT',
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
  'Content-Length',
  '1313',
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
  'a26f508e-f64b-4c9e-98b8-dbb7cdf31f01',
  'x-ms-ests-server',
  '2.1.11654.16 - EUS ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=ArwmQ1W5Q_pEig-aUDD0fZjmR1YbAgAAAOnMG9gOAAAA; expires=Fri, 28-May-2021 21:42:59 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 28 Apr 2021 21:42:59 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/certificates/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-0/create', {"policy":{"key_props":{},"secret_props":{},"x509_props":{"subject":"cn=MyCert","sans":{}},"issuer":{"name":"Self"},"attributes":{}},"attributes":{}})
  .query(true)
  .reply(202, {"id":"https://keyvault_name.vault.azure.net/certificates/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEApoyAjbyccefJTky58ux0ZY218vW4TFCnokzNBQw6xYGAFmVm6YCmj6w16iFFcLgbUeG6zzuz8nSms5vRI21gVnBR/jNbukeLs9Hgrd6JqAObjIvB6XepfbB3j5sJrbxASq3pkcVBHpyuOSd9tg/EZIbjw3Ygm8uEjruAe4gGgUFPtgSmgTsxXUkHZcRe5TwQUMdvMUFRwSn8rc23Gfxv6j3fDB08QmPSKhOoJjXT1kI9nA9l1kpyEmv9chCE4Cl7H27Crel3vK96Qb4A/UUnXTHMfqCc4z1GayXsUw8wzwqJamjKClkpMYegSt8kWM9M2Ptz/Tr31kWGk1EVgRfUlQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAF80JndNLkbWGQssaDao1lYjHNHCsNdlzxBJUlaUboXjrHfAyxIBOwl32w2bU8a3ekZuYY1vd8Hw5n1O02e06376cIJIxVzDLiavNZ0JhpOMXDPZKXMGxEtAplQaa6ctaRnv352Ost9gJmv0CuhkDZ8fHmGfl0wqevqCx+CbRhRDGm7o3umloAQGMJKazNbVNUzyiAi04o73cjTe821osPu7dKN29gxDzy2P4syKnwTm2kjt9kOhJb1GTrb244SmlDmUkF33pbhyJFcvfrcaftShniyLnm9A23EtiqpFPcndm8FSyO8+Ag3fyxpTwzBaqYnDrSVHtSx8fOHHpCylCbI=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"4d3d7f80e15d4b7994aeac13d2cb33e8"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://keyvault_name.vault.azure.net/certificates/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-0/pending?api-version=7.2&request_id=4d3d7f80e15d4b7994aeac13d2cb33e8',
  'Retry-After',
  '10',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '7ead83f2-6297-4c1a-bec6-8843b69fa1c3',
  'x-ms-request-id',
  '2aa7a7db-765d-43e1-992a-96542b6bf7fc',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:42:59 GMT',
  'Content-Length',
  '1374'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEApoyAjbyccefJTky58ux0ZY218vW4TFCnokzNBQw6xYGAFmVm6YCmj6w16iFFcLgbUeG6zzuz8nSms5vRI21gVnBR/jNbukeLs9Hgrd6JqAObjIvB6XepfbB3j5sJrbxASq3pkcVBHpyuOSd9tg/EZIbjw3Ygm8uEjruAe4gGgUFPtgSmgTsxXUkHZcRe5TwQUMdvMUFRwSn8rc23Gfxv6j3fDB08QmPSKhOoJjXT1kI9nA9l1kpyEmv9chCE4Cl7H27Crel3vK96Qb4A/UUnXTHMfqCc4z1GayXsUw8wzwqJamjKClkpMYegSt8kWM9M2Ptz/Tr31kWGk1EVgRfUlQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAF80JndNLkbWGQssaDao1lYjHNHCsNdlzxBJUlaUboXjrHfAyxIBOwl32w2bU8a3ekZuYY1vd8Hw5n1O02e06376cIJIxVzDLiavNZ0JhpOMXDPZKXMGxEtAplQaa6ctaRnv352Ost9gJmv0CuhkDZ8fHmGfl0wqevqCx+CbRhRDGm7o3umloAQGMJKazNbVNUzyiAi04o73cjTe821osPu7dKN29gxDzy2P4syKnwTm2kjt9kOhJb1GTrb244SmlDmUkF33pbhyJFcvfrcaftShniyLnm9A23EtiqpFPcndm8FSyO8+Ag3fyxpTwzBaqYnDrSVHtSx8fOHHpCylCbI=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"4d3d7f80e15d4b7994aeac13d2cb33e8"}, [
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
  'eastus',
  'x-ms-client-request-id',
  'd039e406-8813-4d8f-ab34-5c0b4c9484e7',
  'x-ms-request-id',
  'aa78f23b-23bd-4d0e-a1e6-57f5aa93b226',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:42:59 GMT',
  'Content-Length',
  '1374'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEApoyAjbyccefJTky58ux0ZY218vW4TFCnokzNBQw6xYGAFmVm6YCmj6w16iFFcLgbUeG6zzuz8nSms5vRI21gVnBR/jNbukeLs9Hgrd6JqAObjIvB6XepfbB3j5sJrbxASq3pkcVBHpyuOSd9tg/EZIbjw3Ygm8uEjruAe4gGgUFPtgSmgTsxXUkHZcRe5TwQUMdvMUFRwSn8rc23Gfxv6j3fDB08QmPSKhOoJjXT1kI9nA9l1kpyEmv9chCE4Cl7H27Crel3vK96Qb4A/UUnXTHMfqCc4z1GayXsUw8wzwqJamjKClkpMYegSt8kWM9M2Ptz/Tr31kWGk1EVgRfUlQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAF80JndNLkbWGQssaDao1lYjHNHCsNdlzxBJUlaUboXjrHfAyxIBOwl32w2bU8a3ekZuYY1vd8Hw5n1O02e06376cIJIxVzDLiavNZ0JhpOMXDPZKXMGxEtAplQaa6ctaRnv352Ost9gJmv0CuhkDZ8fHmGfl0wqevqCx+CbRhRDGm7o3umloAQGMJKazNbVNUzyiAi04o73cjTe821osPu7dKN29gxDzy2P4syKnwTm2kjt9kOhJb1GTrb244SmlDmUkF33pbhyJFcvfrcaftShniyLnm9A23EtiqpFPcndm8FSyO8+Ag3fyxpTwzBaqYnDrSVHtSx8fOHHpCylCbI=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"4d3d7f80e15d4b7994aeac13d2cb33e8"}, [
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
  'eastus',
  'x-ms-client-request-id',
  '75b47196-c264-48fa-90ab-c3d07a4f1421',
  'x-ms-request-id',
  '7b94977d-81ec-4dc8-87f3-c75d89df8fe5',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:43:00 GMT',
  'Content-Length',
  '1374'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroRecoverCertificateName-canresumefromastoppedpoller-5397121714514135')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroRecoverCertificateName-canresumefromastoppedpoller-5397121714514135"}}, [
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
  'eastus',
  'x-ms-client-request-id',
  'e76e1870-6854-44ea-84c0-da7147004572',
  'x-ms-request-id',
  'fdd1ecbe-7199-43f4-abfd-0a6677d14bdd',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:43:00 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEApoyAjbyccefJTky58ux0ZY218vW4TFCnokzNBQw6xYGAFmVm6YCmj6w16iFFcLgbUeG6zzuz8nSms5vRI21gVnBR/jNbukeLs9Hgrd6JqAObjIvB6XepfbB3j5sJrbxASq3pkcVBHpyuOSd9tg/EZIbjw3Ygm8uEjruAe4gGgUFPtgSmgTsxXUkHZcRe5TwQUMdvMUFRwSn8rc23Gfxv6j3fDB08QmPSKhOoJjXT1kI9nA9l1kpyEmv9chCE4Cl7H27Crel3vK96Qb4A/UUnXTHMfqCc4z1GayXsUw8wzwqJamjKClkpMYegSt8kWM9M2Ptz/Tr31kWGk1EVgRfUlQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAF80JndNLkbWGQssaDao1lYjHNHCsNdlzxBJUlaUboXjrHfAyxIBOwl32w2bU8a3ekZuYY1vd8Hw5n1O02e06376cIJIxVzDLiavNZ0JhpOMXDPZKXMGxEtAplQaa6ctaRnv352Ost9gJmv0CuhkDZ8fHmGfl0wqevqCx+CbRhRDGm7o3umloAQGMJKazNbVNUzyiAi04o73cjTe821osPu7dKN29gxDzy2P4syKnwTm2kjt9kOhJb1GTrb244SmlDmUkF33pbhyJFcvfrcaftShniyLnm9A23EtiqpFPcndm8FSyO8+Ag3fyxpTwzBaqYnDrSVHtSx8fOHHpCylCbI=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"4d3d7f80e15d4b7994aeac13d2cb33e8"}, [
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
  'eastus',
  'x-ms-client-request-id',
  '95105994-a4d3-4897-9f1d-4c758102752b',
  'x-ms-request-id',
  '3f36f723-b704-47ec-b1af-72532feb030c',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:43:02 GMT',
  'Content-Length',
  '1374'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroRecoverCertificateName-canresumefromastoppedpoller-5397121714514135')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroRecoverCertificateName-canresumefromastoppedpoller-5397121714514135"}}, [
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
  'eastus',
  'x-ms-client-request-id',
  '7ce9a40b-0cf5-4b78-8050-7089e2f731f2',
  'x-ms-request-id',
  '674d577f-5bd5-476b-a49e-eee444922f25',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:43:02 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEApoyAjbyccefJTky58ux0ZY218vW4TFCnokzNBQw6xYGAFmVm6YCmj6w16iFFcLgbUeG6zzuz8nSms5vRI21gVnBR/jNbukeLs9Hgrd6JqAObjIvB6XepfbB3j5sJrbxASq3pkcVBHpyuOSd9tg/EZIbjw3Ygm8uEjruAe4gGgUFPtgSmgTsxXUkHZcRe5TwQUMdvMUFRwSn8rc23Gfxv6j3fDB08QmPSKhOoJjXT1kI9nA9l1kpyEmv9chCE4Cl7H27Crel3vK96Qb4A/UUnXTHMfqCc4z1GayXsUw8wzwqJamjKClkpMYegSt8kWM9M2Ptz/Tr31kWGk1EVgRfUlQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAF80JndNLkbWGQssaDao1lYjHNHCsNdlzxBJUlaUboXjrHfAyxIBOwl32w2bU8a3ekZuYY1vd8Hw5n1O02e06376cIJIxVzDLiavNZ0JhpOMXDPZKXMGxEtAplQaa6ctaRnv352Ost9gJmv0CuhkDZ8fHmGfl0wqevqCx+CbRhRDGm7o3umloAQGMJKazNbVNUzyiAi04o73cjTe821osPu7dKN29gxDzy2P4syKnwTm2kjt9kOhJb1GTrb244SmlDmUkF33pbhyJFcvfrcaftShniyLnm9A23EtiqpFPcndm8FSyO8+Ag3fyxpTwzBaqYnDrSVHtSx8fOHHpCylCbI=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"4d3d7f80e15d4b7994aeac13d2cb33e8"}, [
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
  'eastus',
  'x-ms-client-request-id',
  '51f786df-a366-4def-8cc6-17e23703b8a8',
  'x-ms-request-id',
  '5bf4ce62-75cc-4c79-82c4-b57ad5e8cc5f',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:43:04 GMT',
  'Content-Length',
  '1374'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroRecoverCertificateName-canresumefromastoppedpoller-5397121714514135')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroRecoverCertificateName-canresumefromastoppedpoller-5397121714514135"}}, [
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
  'eastus',
  'x-ms-client-request-id',
  '0100bf83-ab99-4ee2-a035-08a01b05b6ba',
  'x-ms-request-id',
  '11a92bee-5bc4-4c21-bbdb-42db629d3853',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:43:05 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEApoyAjbyccefJTky58ux0ZY218vW4TFCnokzNBQw6xYGAFmVm6YCmj6w16iFFcLgbUeG6zzuz8nSms5vRI21gVnBR/jNbukeLs9Hgrd6JqAObjIvB6XepfbB3j5sJrbxASq3pkcVBHpyuOSd9tg/EZIbjw3Ygm8uEjruAe4gGgUFPtgSmgTsxXUkHZcRe5TwQUMdvMUFRwSn8rc23Gfxv6j3fDB08QmPSKhOoJjXT1kI9nA9l1kpyEmv9chCE4Cl7H27Crel3vK96Qb4A/UUnXTHMfqCc4z1GayXsUw8wzwqJamjKClkpMYegSt8kWM9M2Ptz/Tr31kWGk1EVgRfUlQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAF80JndNLkbWGQssaDao1lYjHNHCsNdlzxBJUlaUboXjrHfAyxIBOwl32w2bU8a3ekZuYY1vd8Hw5n1O02e06376cIJIxVzDLiavNZ0JhpOMXDPZKXMGxEtAplQaa6ctaRnv352Ost9gJmv0CuhkDZ8fHmGfl0wqevqCx+CbRhRDGm7o3umloAQGMJKazNbVNUzyiAi04o73cjTe821osPu7dKN29gxDzy2P4syKnwTm2kjt9kOhJb1GTrb244SmlDmUkF33pbhyJFcvfrcaftShniyLnm9A23EtiqpFPcndm8FSyO8+Ag3fyxpTwzBaqYnDrSVHtSx8fOHHpCylCbI=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"4d3d7f80e15d4b7994aeac13d2cb33e8"}, [
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
  'eastus',
  'x-ms-client-request-id',
  'cde7b782-7867-4c2e-87a4-7471361f7331',
  'x-ms-request-id',
  '0c9bb18e-eaa2-4862-9e12-ff893e36494e',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:43:06 GMT',
  'Content-Length',
  '1374'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroRecoverCertificateName-canresumefromastoppedpoller-5397121714514135')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroRecoverCertificateName-canresumefromastoppedpoller-5397121714514135"}}, [
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
  'eastus',
  'x-ms-client-request-id',
  '562b74a9-7ff1-464b-8c7d-5afc08b72603',
  'x-ms-request-id',
  'a7a7334e-3e03-48ca-b56d-219ce606f2ca',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:43:07 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEApoyAjbyccefJTky58ux0ZY218vW4TFCnokzNBQw6xYGAFmVm6YCmj6w16iFFcLgbUeG6zzuz8nSms5vRI21gVnBR/jNbukeLs9Hgrd6JqAObjIvB6XepfbB3j5sJrbxASq3pkcVBHpyuOSd9tg/EZIbjw3Ygm8uEjruAe4gGgUFPtgSmgTsxXUkHZcRe5TwQUMdvMUFRwSn8rc23Gfxv6j3fDB08QmPSKhOoJjXT1kI9nA9l1kpyEmv9chCE4Cl7H27Crel3vK96Qb4A/UUnXTHMfqCc4z1GayXsUw8wzwqJamjKClkpMYegSt8kWM9M2Ptz/Tr31kWGk1EVgRfUlQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAF80JndNLkbWGQssaDao1lYjHNHCsNdlzxBJUlaUboXjrHfAyxIBOwl32w2bU8a3ekZuYY1vd8Hw5n1O02e06376cIJIxVzDLiavNZ0JhpOMXDPZKXMGxEtAplQaa6ctaRnv352Ost9gJmv0CuhkDZ8fHmGfl0wqevqCx+CbRhRDGm7o3umloAQGMJKazNbVNUzyiAi04o73cjTe821osPu7dKN29gxDzy2P4syKnwTm2kjt9kOhJb1GTrb244SmlDmUkF33pbhyJFcvfrcaftShniyLnm9A23EtiqpFPcndm8FSyO8+Ag3fyxpTwzBaqYnDrSVHtSx8fOHHpCylCbI=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"4d3d7f80e15d4b7994aeac13d2cb33e8"}, [
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
  'eastus',
  'x-ms-client-request-id',
  'c1d28469-b066-44bf-b0b1-ef79e6b59e85',
  'x-ms-request-id',
  '769674c9-c34c-4947-be62-cab1d6afb652',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:43:08 GMT',
  'Content-Length',
  '1374'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroRecoverCertificateName-canresumefromastoppedpoller-5397121714514135')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroRecoverCertificateName-canresumefromastoppedpoller-5397121714514135"}}, [
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
  'eastus',
  'x-ms-client-request-id',
  '4d5787ed-d529-4284-93e1-179501ea85fe',
  'x-ms-request-id',
  'c6efdf53-4d1d-47fc-933b-dfea2bcbcc44',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:43:08 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEApoyAjbyccefJTky58ux0ZY218vW4TFCnokzNBQw6xYGAFmVm6YCmj6w16iFFcLgbUeG6zzuz8nSms5vRI21gVnBR/jNbukeLs9Hgrd6JqAObjIvB6XepfbB3j5sJrbxASq3pkcVBHpyuOSd9tg/EZIbjw3Ygm8uEjruAe4gGgUFPtgSmgTsxXUkHZcRe5TwQUMdvMUFRwSn8rc23Gfxv6j3fDB08QmPSKhOoJjXT1kI9nA9l1kpyEmv9chCE4Cl7H27Crel3vK96Qb4A/UUnXTHMfqCc4z1GayXsUw8wzwqJamjKClkpMYegSt8kWM9M2Ptz/Tr31kWGk1EVgRfUlQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAF80JndNLkbWGQssaDao1lYjHNHCsNdlzxBJUlaUboXjrHfAyxIBOwl32w2bU8a3ekZuYY1vd8Hw5n1O02e06376cIJIxVzDLiavNZ0JhpOMXDPZKXMGxEtAplQaa6ctaRnv352Ost9gJmv0CuhkDZ8fHmGfl0wqevqCx+CbRhRDGm7o3umloAQGMJKazNbVNUzyiAi04o73cjTe821osPu7dKN29gxDzy2P4syKnwTm2kjt9kOhJb1GTrb244SmlDmUkF33pbhyJFcvfrcaftShniyLnm9A23EtiqpFPcndm8FSyO8+Ag3fyxpTwzBaqYnDrSVHtSx8fOHHpCylCbI=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"4d3d7f80e15d4b7994aeac13d2cb33e8"}, [
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
  'eastus',
  'x-ms-client-request-id',
  '0224f365-0290-486f-bd0c-552989c25167',
  'x-ms-request-id',
  '7f8747d5-66e9-4205-ac10-be871584d0c0',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:43:11 GMT',
  'Content-Length',
  '1374'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroRecoverCertificateName-canresumefromastoppedpoller-5397121714514135')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroRecoverCertificateName-canresumefromastoppedpoller-5397121714514135"}}, [
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
  'eastus',
  'x-ms-client-request-id',
  'f909ae6a-6afa-4604-aa9a-d3ac893fdc31',
  'x-ms-request-id',
  '0f20b75c-5cfa-4ad2-9d76-457d6facf787',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:43:10 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEApoyAjbyccefJTky58ux0ZY218vW4TFCnokzNBQw6xYGAFmVm6YCmj6w16iFFcLgbUeG6zzuz8nSms5vRI21gVnBR/jNbukeLs9Hgrd6JqAObjIvB6XepfbB3j5sJrbxASq3pkcVBHpyuOSd9tg/EZIbjw3Ygm8uEjruAe4gGgUFPtgSmgTsxXUkHZcRe5TwQUMdvMUFRwSn8rc23Gfxv6j3fDB08QmPSKhOoJjXT1kI9nA9l1kpyEmv9chCE4Cl7H27Crel3vK96Qb4A/UUnXTHMfqCc4z1GayXsUw8wzwqJamjKClkpMYegSt8kWM9M2Ptz/Tr31kWGk1EVgRfUlQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAF80JndNLkbWGQssaDao1lYjHNHCsNdlzxBJUlaUboXjrHfAyxIBOwl32w2bU8a3ekZuYY1vd8Hw5n1O02e06376cIJIxVzDLiavNZ0JhpOMXDPZKXMGxEtAplQaa6ctaRnv352Ost9gJmv0CuhkDZ8fHmGfl0wqevqCx+CbRhRDGm7o3umloAQGMJKazNbVNUzyiAi04o73cjTe821osPu7dKN29gxDzy2P4syKnwTm2kjt9kOhJb1GTrb244SmlDmUkF33pbhyJFcvfrcaftShniyLnm9A23EtiqpFPcndm8FSyO8+Ag3fyxpTwzBaqYnDrSVHtSx8fOHHpCylCbI=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"4d3d7f80e15d4b7994aeac13d2cb33e8"}, [
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
  'eastus',
  'x-ms-client-request-id',
  '0e73f4ec-23ef-4a96-9256-5cd75f705214',
  'x-ms-request-id',
  'a28bb4da-341c-4155-8646-4961b359ec88',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:43:13 GMT',
  'Content-Length',
  '1374'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroRecoverCertificateName-canresumefromastoppedpoller-5397121714514135')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroRecoverCertificateName-canresumefromastoppedpoller-5397121714514135"}}, [
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
  'eastus',
  'x-ms-client-request-id',
  'c78742cb-67b8-41bb-8762-d2d593a4fd50',
  'x-ms-request-id',
  '2916ebf0-0327-4de6-8935-e6cdcb1bae98',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:43:13 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEApoyAjbyccefJTky58ux0ZY218vW4TFCnokzNBQw6xYGAFmVm6YCmj6w16iFFcLgbUeG6zzuz8nSms5vRI21gVnBR/jNbukeLs9Hgrd6JqAObjIvB6XepfbB3j5sJrbxASq3pkcVBHpyuOSd9tg/EZIbjw3Ygm8uEjruAe4gGgUFPtgSmgTsxXUkHZcRe5TwQUMdvMUFRwSn8rc23Gfxv6j3fDB08QmPSKhOoJjXT1kI9nA9l1kpyEmv9chCE4Cl7H27Crel3vK96Qb4A/UUnXTHMfqCc4z1GayXsUw8wzwqJamjKClkpMYegSt8kWM9M2Ptz/Tr31kWGk1EVgRfUlQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAF80JndNLkbWGQssaDao1lYjHNHCsNdlzxBJUlaUboXjrHfAyxIBOwl32w2bU8a3ekZuYY1vd8Hw5n1O02e06376cIJIxVzDLiavNZ0JhpOMXDPZKXMGxEtAplQaa6ctaRnv352Ost9gJmv0CuhkDZ8fHmGfl0wqevqCx+CbRhRDGm7o3umloAQGMJKazNbVNUzyiAi04o73cjTe821osPu7dKN29gxDzy2P4syKnwTm2kjt9kOhJb1GTrb244SmlDmUkF33pbhyJFcvfrcaftShniyLnm9A23EtiqpFPcndm8FSyO8+Ag3fyxpTwzBaqYnDrSVHtSx8fOHHpCylCbI=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"4d3d7f80e15d4b7994aeac13d2cb33e8"}, [
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
  'eastus',
  'x-ms-client-request-id',
  '752cd17c-5f48-45de-9d6b-dbf4bf37af53',
  'x-ms-request-id',
  'ce46190e-fc51-4d86-9062-32604a748072',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:43:14 GMT',
  'Content-Length',
  '1374'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroRecoverCertificateName-canresumefromastoppedpoller-5397121714514135')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroRecoverCertificateName-canresumefromastoppedpoller-5397121714514135"}}, [
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
  'eastus',
  'x-ms-client-request-id',
  'ecd117f4-0abb-4d97-a15a-b8e07f13abcb',
  'x-ms-request-id',
  '0ca6a4ae-1fcf-4550-a484-e32f96bd741d',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:43:15 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEApoyAjbyccefJTky58ux0ZY218vW4TFCnokzNBQw6xYGAFmVm6YCmj6w16iFFcLgbUeG6zzuz8nSms5vRI21gVnBR/jNbukeLs9Hgrd6JqAObjIvB6XepfbB3j5sJrbxASq3pkcVBHpyuOSd9tg/EZIbjw3Ygm8uEjruAe4gGgUFPtgSmgTsxXUkHZcRe5TwQUMdvMUFRwSn8rc23Gfxv6j3fDB08QmPSKhOoJjXT1kI9nA9l1kpyEmv9chCE4Cl7H27Crel3vK96Qb4A/UUnXTHMfqCc4z1GayXsUw8wzwqJamjKClkpMYegSt8kWM9M2Ptz/Tr31kWGk1EVgRfUlQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAF80JndNLkbWGQssaDao1lYjHNHCsNdlzxBJUlaUboXjrHfAyxIBOwl32w2bU8a3ekZuYY1vd8Hw5n1O02e06376cIJIxVzDLiavNZ0JhpOMXDPZKXMGxEtAplQaa6ctaRnv352Ost9gJmv0CuhkDZ8fHmGfl0wqevqCx+CbRhRDGm7o3umloAQGMJKazNbVNUzyiAi04o73cjTe821osPu7dKN29gxDzy2P4syKnwTm2kjt9kOhJb1GTrb244SmlDmUkF33pbhyJFcvfrcaftShniyLnm9A23EtiqpFPcndm8FSyO8+Ag3fyxpTwzBaqYnDrSVHtSx8fOHHpCylCbI=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"4d3d7f80e15d4b7994aeac13d2cb33e8"}, [
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
  'eastus',
  'x-ms-client-request-id',
  'bb431c65-0dfb-4bc8-bac9-5e85e3e881d5',
  'x-ms-request-id',
  'a25bfd1e-67d0-4134-85e4-f572f70e0a20',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:43:16 GMT',
  'Content-Length',
  '1374'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroRecoverCertificateName-canresumefromastoppedpoller-5397121714514135')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroRecoverCertificateName-canresumefromastoppedpoller-5397121714514135"}}, [
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
  'eastus',
  'x-ms-client-request-id',
  '41659e5c-2356-4a26-b9ed-ee12ab1646ae',
  'x-ms-request-id',
  '33920258-c136-4b8e-889a-a4a5524df4da',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:43:17 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEApoyAjbyccefJTky58ux0ZY218vW4TFCnokzNBQw6xYGAFmVm6YCmj6w16iFFcLgbUeG6zzuz8nSms5vRI21gVnBR/jNbukeLs9Hgrd6JqAObjIvB6XepfbB3j5sJrbxASq3pkcVBHpyuOSd9tg/EZIbjw3Ygm8uEjruAe4gGgUFPtgSmgTsxXUkHZcRe5TwQUMdvMUFRwSn8rc23Gfxv6j3fDB08QmPSKhOoJjXT1kI9nA9l1kpyEmv9chCE4Cl7H27Crel3vK96Qb4A/UUnXTHMfqCc4z1GayXsUw8wzwqJamjKClkpMYegSt8kWM9M2Ptz/Tr31kWGk1EVgRfUlQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAF80JndNLkbWGQssaDao1lYjHNHCsNdlzxBJUlaUboXjrHfAyxIBOwl32w2bU8a3ekZuYY1vd8Hw5n1O02e06376cIJIxVzDLiavNZ0JhpOMXDPZKXMGxEtAplQaa6ctaRnv352Ost9gJmv0CuhkDZ8fHmGfl0wqevqCx+CbRhRDGm7o3umloAQGMJKazNbVNUzyiAi04o73cjTe821osPu7dKN29gxDzy2P4syKnwTm2kjt9kOhJb1GTrb244SmlDmUkF33pbhyJFcvfrcaftShniyLnm9A23EtiqpFPcndm8FSyO8+Ag3fyxpTwzBaqYnDrSVHtSx8fOHHpCylCbI=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"4d3d7f80e15d4b7994aeac13d2cb33e8"}, [
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
  'eastus',
  'x-ms-client-request-id',
  'b69b4e69-ed60-4e72-a56f-5fc18646d204',
  'x-ms-request-id',
  '83413b8f-e669-4532-9339-218f3d51eb5b',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:43:19 GMT',
  'Content-Length',
  '1374'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroRecoverCertificateName-canresumefromastoppedpoller-5397121714514135')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroRecoverCertificateName-canresumefromastoppedpoller-5397121714514135"}}, [
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
  'eastus',
  'x-ms-client-request-id',
  '62b3ee42-9171-4498-926a-fdadf0c97037',
  'x-ms-request-id',
  'ec5d8e3c-d0a9-4358-a796-18280fbd044c',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:43:20 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEApoyAjbyccefJTky58ux0ZY218vW4TFCnokzNBQw6xYGAFmVm6YCmj6w16iFFcLgbUeG6zzuz8nSms5vRI21gVnBR/jNbukeLs9Hgrd6JqAObjIvB6XepfbB3j5sJrbxASq3pkcVBHpyuOSd9tg/EZIbjw3Ygm8uEjruAe4gGgUFPtgSmgTsxXUkHZcRe5TwQUMdvMUFRwSn8rc23Gfxv6j3fDB08QmPSKhOoJjXT1kI9nA9l1kpyEmv9chCE4Cl7H27Crel3vK96Qb4A/UUnXTHMfqCc4z1GayXsUw8wzwqJamjKClkpMYegSt8kWM9M2Ptz/Tr31kWGk1EVgRfUlQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAF80JndNLkbWGQssaDao1lYjHNHCsNdlzxBJUlaUboXjrHfAyxIBOwl32w2bU8a3ekZuYY1vd8Hw5n1O02e06376cIJIxVzDLiavNZ0JhpOMXDPZKXMGxEtAplQaa6ctaRnv352Ost9gJmv0CuhkDZ8fHmGfl0wqevqCx+CbRhRDGm7o3umloAQGMJKazNbVNUzyiAi04o73cjTe821osPu7dKN29gxDzy2P4syKnwTm2kjt9kOhJb1GTrb244SmlDmUkF33pbhyJFcvfrcaftShniyLnm9A23EtiqpFPcndm8FSyO8+Ag3fyxpTwzBaqYnDrSVHtSx8fOHHpCylCbI=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"4d3d7f80e15d4b7994aeac13d2cb33e8"}, [
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
  'eastus',
  'x-ms-client-request-id',
  '3dc0bb55-fab5-423b-b0dc-fb6a88cfbe1e',
  'x-ms-request-id',
  'e1e63e87-d7b1-4672-8a9b-a0b191e011e8',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:43:21 GMT',
  'Content-Length',
  '1374'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroRecoverCertificateName-canresumefromastoppedpoller-5397121714514135')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroRecoverCertificateName-canresumefromastoppedpoller-5397121714514135"}}, [
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
  'eastus',
  'x-ms-client-request-id',
  '82665985-d66b-4eef-b007-bc1e1fa5509c',
  'x-ms-request-id',
  'cc94981f-335a-441c-a551-2ed65dc45403',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:43:21 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEApoyAjbyccefJTky58ux0ZY218vW4TFCnokzNBQw6xYGAFmVm6YCmj6w16iFFcLgbUeG6zzuz8nSms5vRI21gVnBR/jNbukeLs9Hgrd6JqAObjIvB6XepfbB3j5sJrbxASq3pkcVBHpyuOSd9tg/EZIbjw3Ygm8uEjruAe4gGgUFPtgSmgTsxXUkHZcRe5TwQUMdvMUFRwSn8rc23Gfxv6j3fDB08QmPSKhOoJjXT1kI9nA9l1kpyEmv9chCE4Cl7H27Crel3vK96Qb4A/UUnXTHMfqCc4z1GayXsUw8wzwqJamjKClkpMYegSt8kWM9M2Ptz/Tr31kWGk1EVgRfUlQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAF80JndNLkbWGQssaDao1lYjHNHCsNdlzxBJUlaUboXjrHfAyxIBOwl32w2bU8a3ekZuYY1vd8Hw5n1O02e06376cIJIxVzDLiavNZ0JhpOMXDPZKXMGxEtAplQaa6ctaRnv352Ost9gJmv0CuhkDZ8fHmGfl0wqevqCx+CbRhRDGm7o3umloAQGMJKazNbVNUzyiAi04o73cjTe821osPu7dKN29gxDzy2P4syKnwTm2kjt9kOhJb1GTrb244SmlDmUkF33pbhyJFcvfrcaftShniyLnm9A23EtiqpFPcndm8FSyO8+Ag3fyxpTwzBaqYnDrSVHtSx8fOHHpCylCbI=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"4d3d7f80e15d4b7994aeac13d2cb33e8"}, [
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
  'eastus',
  'x-ms-client-request-id',
  'a9075ef4-1586-4316-867b-f978e2b41cfc',
  'x-ms-request-id',
  '3817a93e-4cf4-460e-9eac-5fb035d29cbe',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:43:23 GMT',
  'Content-Length',
  '1374'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroRecoverCertificateName-canresumefromastoppedpoller-5397121714514135')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroRecoverCertificateName-canresumefromastoppedpoller-5397121714514135"}}, [
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
  'eastus',
  'x-ms-client-request-id',
  '80e295f8-ddb4-4956-ba6b-1fef32ca12b1',
  'x-ms-request-id',
  '10cdbc2b-fc22-421a-b725-6821222eb250',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:43:23 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEApoyAjbyccefJTky58ux0ZY218vW4TFCnokzNBQw6xYGAFmVm6YCmj6w16iFFcLgbUeG6zzuz8nSms5vRI21gVnBR/jNbukeLs9Hgrd6JqAObjIvB6XepfbB3j5sJrbxASq3pkcVBHpyuOSd9tg/EZIbjw3Ygm8uEjruAe4gGgUFPtgSmgTsxXUkHZcRe5TwQUMdvMUFRwSn8rc23Gfxv6j3fDB08QmPSKhOoJjXT1kI9nA9l1kpyEmv9chCE4Cl7H27Crel3vK96Qb4A/UUnXTHMfqCc4z1GayXsUw8wzwqJamjKClkpMYegSt8kWM9M2Ptz/Tr31kWGk1EVgRfUlQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAF80JndNLkbWGQssaDao1lYjHNHCsNdlzxBJUlaUboXjrHfAyxIBOwl32w2bU8a3ekZuYY1vd8Hw5n1O02e06376cIJIxVzDLiavNZ0JhpOMXDPZKXMGxEtAplQaa6ctaRnv352Ost9gJmv0CuhkDZ8fHmGfl0wqevqCx+CbRhRDGm7o3umloAQGMJKazNbVNUzyiAi04o73cjTe821osPu7dKN29gxDzy2P4syKnwTm2kjt9kOhJb1GTrb244SmlDmUkF33pbhyJFcvfrcaftShniyLnm9A23EtiqpFPcndm8FSyO8+Ag3fyxpTwzBaqYnDrSVHtSx8fOHHpCylCbI=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"4d3d7f80e15d4b7994aeac13d2cb33e8"}, [
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
  'eastus',
  'x-ms-client-request-id',
  'e175d609-b681-4c84-834f-ff14bf120c47',
  'x-ms-request-id',
  'a27b2959-8267-4d78-876b-36d1e1138369',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:43:24 GMT',
  'Content-Length',
  '1374'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroRecoverCertificateName-canresumefromastoppedpoller-5397121714514135')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroRecoverCertificateName-canresumefromastoppedpoller-5397121714514135"}}, [
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
  'eastus',
  'x-ms-client-request-id',
  '19f245ef-995f-4f78-a1d9-222716e01b06',
  'x-ms-request-id',
  '26772cbd-fb44-4fa3-a688-ea1da8115cf8',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:43:25 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEApoyAjbyccefJTky58ux0ZY218vW4TFCnokzNBQw6xYGAFmVm6YCmj6w16iFFcLgbUeG6zzuz8nSms5vRI21gVnBR/jNbukeLs9Hgrd6JqAObjIvB6XepfbB3j5sJrbxASq3pkcVBHpyuOSd9tg/EZIbjw3Ygm8uEjruAe4gGgUFPtgSmgTsxXUkHZcRe5TwQUMdvMUFRwSn8rc23Gfxv6j3fDB08QmPSKhOoJjXT1kI9nA9l1kpyEmv9chCE4Cl7H27Crel3vK96Qb4A/UUnXTHMfqCc4z1GayXsUw8wzwqJamjKClkpMYegSt8kWM9M2Ptz/Tr31kWGk1EVgRfUlQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAF80JndNLkbWGQssaDao1lYjHNHCsNdlzxBJUlaUboXjrHfAyxIBOwl32w2bU8a3ekZuYY1vd8Hw5n1O02e06376cIJIxVzDLiavNZ0JhpOMXDPZKXMGxEtAplQaa6ctaRnv352Ost9gJmv0CuhkDZ8fHmGfl0wqevqCx+CbRhRDGm7o3umloAQGMJKazNbVNUzyiAi04o73cjTe821osPu7dKN29gxDzy2P4syKnwTm2kjt9kOhJb1GTrb244SmlDmUkF33pbhyJFcvfrcaftShniyLnm9A23EtiqpFPcndm8FSyO8+Ag3fyxpTwzBaqYnDrSVHtSx8fOHHpCylCbI=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"4d3d7f80e15d4b7994aeac13d2cb33e8"}, [
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
  'eastus',
  'x-ms-client-request-id',
  '5ac5bdef-7a13-418c-94ff-c21cc92f3226',
  'x-ms-request-id',
  'd7b99e22-59fa-4d3b-8765-d874ed46539f',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:43:27 GMT',
  'Content-Length',
  '1374'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroRecoverCertificateName-canresumefromastoppedpoller-5397121714514135')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroRecoverCertificateName-canresumefromastoppedpoller-5397121714514135"}}, [
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
  'eastus',
  'x-ms-client-request-id',
  '1fc50655-2643-4337-80ca-859b09a5d79e',
  'x-ms-request-id',
  '0d2916ec-47fd-423a-adea-ff60faf3c570',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:43:28 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEApoyAjbyccefJTky58ux0ZY218vW4TFCnokzNBQw6xYGAFmVm6YCmj6w16iFFcLgbUeG6zzuz8nSms5vRI21gVnBR/jNbukeLs9Hgrd6JqAObjIvB6XepfbB3j5sJrbxASq3pkcVBHpyuOSd9tg/EZIbjw3Ygm8uEjruAe4gGgUFPtgSmgTsxXUkHZcRe5TwQUMdvMUFRwSn8rc23Gfxv6j3fDB08QmPSKhOoJjXT1kI9nA9l1kpyEmv9chCE4Cl7H27Crel3vK96Qb4A/UUnXTHMfqCc4z1GayXsUw8wzwqJamjKClkpMYegSt8kWM9M2Ptz/Tr31kWGk1EVgRfUlQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAF80JndNLkbWGQssaDao1lYjHNHCsNdlzxBJUlaUboXjrHfAyxIBOwl32w2bU8a3ekZuYY1vd8Hw5n1O02e06376cIJIxVzDLiavNZ0JhpOMXDPZKXMGxEtAplQaa6ctaRnv352Ost9gJmv0CuhkDZ8fHmGfl0wqevqCx+CbRhRDGm7o3umloAQGMJKazNbVNUzyiAi04o73cjTe821osPu7dKN29gxDzy2P4syKnwTm2kjt9kOhJb1GTrb244SmlDmUkF33pbhyJFcvfrcaftShniyLnm9A23EtiqpFPcndm8FSyO8+Ag3fyxpTwzBaqYnDrSVHtSx8fOHHpCylCbI=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"4d3d7f80e15d4b7994aeac13d2cb33e8"}, [
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
  'eastus',
  'x-ms-client-request-id',
  '0afd9158-41d4-4eeb-9b0d-5842309531ac',
  'x-ms-request-id',
  '7b653ef5-2b0a-49f6-8a78-f8e546e827cf',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:43:30 GMT',
  'Content-Length',
  '1374'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroRecoverCertificateName-canresumefromastoppedpoller-5397121714514135')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroRecoverCertificateName-canresumefromastoppedpoller-5397121714514135"}}, [
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
  'eastus',
  'x-ms-client-request-id',
  'f794f6db-76c8-48b2-bc89-36996d0ccc0b',
  'x-ms-request-id',
  '29418158-1008-4bbf-b21c-dfd0feccc01c',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:43:30 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEApoyAjbyccefJTky58ux0ZY218vW4TFCnokzNBQw6xYGAFmVm6YCmj6w16iFFcLgbUeG6zzuz8nSms5vRI21gVnBR/jNbukeLs9Hgrd6JqAObjIvB6XepfbB3j5sJrbxASq3pkcVBHpyuOSd9tg/EZIbjw3Ygm8uEjruAe4gGgUFPtgSmgTsxXUkHZcRe5TwQUMdvMUFRwSn8rc23Gfxv6j3fDB08QmPSKhOoJjXT1kI9nA9l1kpyEmv9chCE4Cl7H27Crel3vK96Qb4A/UUnXTHMfqCc4z1GayXsUw8wzwqJamjKClkpMYegSt8kWM9M2Ptz/Tr31kWGk1EVgRfUlQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAF80JndNLkbWGQssaDao1lYjHNHCsNdlzxBJUlaUboXjrHfAyxIBOwl32w2bU8a3ekZuYY1vd8Hw5n1O02e06376cIJIxVzDLiavNZ0JhpOMXDPZKXMGxEtAplQaa6ctaRnv352Ost9gJmv0CuhkDZ8fHmGfl0wqevqCx+CbRhRDGm7o3umloAQGMJKazNbVNUzyiAi04o73cjTe821osPu7dKN29gxDzy2P4syKnwTm2kjt9kOhJb1GTrb244SmlDmUkF33pbhyJFcvfrcaftShniyLnm9A23EtiqpFPcndm8FSyO8+Ag3fyxpTwzBaqYnDrSVHtSx8fOHHpCylCbI=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"4d3d7f80e15d4b7994aeac13d2cb33e8"}, [
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
  'eastus',
  'x-ms-client-request-id',
  'acf58dfa-03ef-4116-b692-3e8c70dcee81',
  'x-ms-request-id',
  'adac5a5c-5ee4-4a1a-9567-c06ee5e00080',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:43:31 GMT',
  'Content-Length',
  '1374'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroRecoverCertificateName-canresumefromastoppedpoller-5397121714514135')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroRecoverCertificateName-canresumefromastoppedpoller-5397121714514135"}}, [
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
  'eastus',
  'x-ms-client-request-id',
  'b73d2501-aa04-4999-a751-84d7fe37963b',
  'x-ms-request-id',
  'e49c4b9e-1817-4e21-bcb7-b84989ac3ff6',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:43:32 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEApoyAjbyccefJTky58ux0ZY218vW4TFCnokzNBQw6xYGAFmVm6YCmj6w16iFFcLgbUeG6zzuz8nSms5vRI21gVnBR/jNbukeLs9Hgrd6JqAObjIvB6XepfbB3j5sJrbxASq3pkcVBHpyuOSd9tg/EZIbjw3Ygm8uEjruAe4gGgUFPtgSmgTsxXUkHZcRe5TwQUMdvMUFRwSn8rc23Gfxv6j3fDB08QmPSKhOoJjXT1kI9nA9l1kpyEmv9chCE4Cl7H27Crel3vK96Qb4A/UUnXTHMfqCc4z1GayXsUw8wzwqJamjKClkpMYegSt8kWM9M2Ptz/Tr31kWGk1EVgRfUlQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAF80JndNLkbWGQssaDao1lYjHNHCsNdlzxBJUlaUboXjrHfAyxIBOwl32w2bU8a3ekZuYY1vd8Hw5n1O02e06376cIJIxVzDLiavNZ0JhpOMXDPZKXMGxEtAplQaa6ctaRnv352Ost9gJmv0CuhkDZ8fHmGfl0wqevqCx+CbRhRDGm7o3umloAQGMJKazNbVNUzyiAi04o73cjTe821osPu7dKN29gxDzy2P4syKnwTm2kjt9kOhJb1GTrb244SmlDmUkF33pbhyJFcvfrcaftShniyLnm9A23EtiqpFPcndm8FSyO8+Ag3fyxpTwzBaqYnDrSVHtSx8fOHHpCylCbI=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"4d3d7f80e15d4b7994aeac13d2cb33e8"}, [
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
  'eastus',
  'x-ms-client-request-id',
  'f4a9ebe4-7d34-4b8f-8b71-86f3e30dcbb9',
  'x-ms-request-id',
  '4cdefb4c-0614-4ee9-9bca-045616bee57f',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:43:34 GMT',
  'Content-Length',
  '1374'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroRecoverCertificateName-canresumefromastoppedpoller-5397121714514135')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroRecoverCertificateName-canresumefromastoppedpoller-5397121714514135"}}, [
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
  'eastus',
  'x-ms-client-request-id',
  '1674c9d8-58be-4e49-9eef-77fa56ceafdb',
  'x-ms-request-id',
  '94042902-e5a8-41d5-ac98-0e9971580ee7',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:43:34 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEApoyAjbyccefJTky58ux0ZY218vW4TFCnokzNBQw6xYGAFmVm6YCmj6w16iFFcLgbUeG6zzuz8nSms5vRI21gVnBR/jNbukeLs9Hgrd6JqAObjIvB6XepfbB3j5sJrbxASq3pkcVBHpyuOSd9tg/EZIbjw3Ygm8uEjruAe4gGgUFPtgSmgTsxXUkHZcRe5TwQUMdvMUFRwSn8rc23Gfxv6j3fDB08QmPSKhOoJjXT1kI9nA9l1kpyEmv9chCE4Cl7H27Crel3vK96Qb4A/UUnXTHMfqCc4z1GayXsUw8wzwqJamjKClkpMYegSt8kWM9M2Ptz/Tr31kWGk1EVgRfUlQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAF80JndNLkbWGQssaDao1lYjHNHCsNdlzxBJUlaUboXjrHfAyxIBOwl32w2bU8a3ekZuYY1vd8Hw5n1O02e06376cIJIxVzDLiavNZ0JhpOMXDPZKXMGxEtAplQaa6ctaRnv352Ost9gJmv0CuhkDZ8fHmGfl0wqevqCx+CbRhRDGm7o3umloAQGMJKazNbVNUzyiAi04o73cjTe821osPu7dKN29gxDzy2P4syKnwTm2kjt9kOhJb1GTrb244SmlDmUkF33pbhyJFcvfrcaftShniyLnm9A23EtiqpFPcndm8FSyO8+Ag3fyxpTwzBaqYnDrSVHtSx8fOHHpCylCbI=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"4d3d7f80e15d4b7994aeac13d2cb33e8"}, [
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
  'eastus',
  'x-ms-client-request-id',
  'c47f7f0c-3735-4045-bfb6-939d9b4515e1',
  'x-ms-request-id',
  '79195608-cf98-45b8-859e-8a40cc3afca0',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:43:36 GMT',
  'Content-Length',
  '1374'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroRecoverCertificateName-canresumefromastoppedpoller-5397121714514135')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/lroRecoverCertificateName-canresumefromastoppedpoller-5397121714514135","deletedDate":1619646113,"scheduledPurgeDate":1627422113,"id":"https://keyvault_name.vault.azure.net/certificates/lroRecoverCertificateName-canresumefromastoppedpoller-5397121714514135/dbfd29f48ad54b3eaa060965e487d503","kid":"https://keyvault_name.vault.azure.net/keys/lroRecoverCertificateName-canresumefromastoppedpoller-5397121714514135/dbfd29f48ad54b3eaa060965e487d503","sid":"https://keyvault_name.vault.azure.net/secrets/lroRecoverCertificateName-canresumefromastoppedpoller-5397121714514135/dbfd29f48ad54b3eaa060965e487d503","x5t":"WTGsg_FDpY1m2L8p-r-Alo6QTGw","cer":"MIIDKDCCAhCgAwIBAgIQJY8DuWdmS1iDmpy/61Ek6TANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjEwNDI4MjEzMDIxWhcNMjIwNDI4MjE0MDIxWjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQC8tyiJk0zYRQIqfOw9l9niE5/f7OVAulVC0CWIIuZyL0nl1hWlqXCbTmvd2GpYIu7XZmE2D9S5hoQAw8nib5quQXklJbghl1ScqVTKjENa5VgWARPdY8j36BX0B+iv0kLcbeqIzcn5DIHeOnDCvmSu7fLAU+MiygZwtBBd979pNEVhndqGDDCOptW7lv11k7gY1j/HLh8zp6aeFzsgzj/IAwCda/82TtO65zageSqkFzF7bbhoniwYeJLAB0c0PS8sG4Y9cuU99AIOpcWDfRGK5+CqK7qkV9+OGi4NbVdSkRAZExFr4i6w0T8h0V4notDh0XZUveZuiWyUd9dajGCtAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBS04Okd5dXgKcsLc+niGn1PVm5hqjAdBgNVHQ4EFgQUtODpHeXV4CnLC3Pp4hp9T1ZuYaowDQYJKoZIhvcNAQELBQADggEBABgKjkIyvBUtZiOAcLcq+/An5np8MfEPBk6u6/IjlmhNZPw2iNukRJb2+uxVdI330XXV1RF2OMasSy97JEDvyfQ6u5cmTjiIKZ8rK3k40LYIElwN3Cc23Hs0pMfAz/mh57SPI89QvTi3wfk8Eov3bJBDdwMCnfB0QSUBhum/IOQyv++kBqqTb24VN/Ws5XlOuzfPJJuIWBpMBcB63i9InkJAfOkv148ZUKk8ZTSFgGFP2BipYEnFXTjf/kB/zOZwpbyPeik8ov71FzpuU02XKulvi8V04FFGKRcBFtj9edObdre3CWXLOeTINiaHyDnmJwQB7U0ni7dspeoSdi2hDkI=","attributes":{"enabled":true,"nbf":1619645421,"exp":1651182021,"created":1619646021,"updated":1619646021,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/lroRecoverCertificateName-canresumefromastoppedpoller-5397121714514135/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1619645930,"updated":1619645930}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/lroRecoverCertificateName-canresumefromastoppedpoller-5397121714514135/pending"}}, [
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
  'c4175f24-d2a3-4ac8-9acf-b7073d858900',
  'x-ms-request-id',
  'dd955bf6-7b10-49de-bcb5-d4b109f9213e',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:43:36 GMT',
  'Content-Length',
  '2832'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedcertificates/lroRecoverCertificateName-canresumefromastoppedpoller-5397121714514135')
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
  '0da9ce10-4fcb-46ca-b157-acd8e3c6ae17',
  'x-ms-request-id',
  '25dac034-a887-4bd9-b6ec-a3215b6ac1b9',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:43:37 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEApoyAjbyccefJTky58ux0ZY218vW4TFCnokzNBQw6xYGAFmVm6YCmj6w16iFFcLgbUeG6zzuz8nSms5vRI21gVnBR/jNbukeLs9Hgrd6JqAObjIvB6XepfbB3j5sJrbxASq3pkcVBHpyuOSd9tg/EZIbjw3Ygm8uEjruAe4gGgUFPtgSmgTsxXUkHZcRe5TwQUMdvMUFRwSn8rc23Gfxv6j3fDB08QmPSKhOoJjXT1kI9nA9l1kpyEmv9chCE4Cl7H27Crel3vK96Qb4A/UUnXTHMfqCc4z1GayXsUw8wzwqJamjKClkpMYegSt8kWM9M2Ptz/Tr31kWGk1EVgRfUlQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAF80JndNLkbWGQssaDao1lYjHNHCsNdlzxBJUlaUboXjrHfAyxIBOwl32w2bU8a3ekZuYY1vd8Hw5n1O02e06376cIJIxVzDLiavNZ0JhpOMXDPZKXMGxEtAplQaa6ctaRnv352Ost9gJmv0CuhkDZ8fHmGfl0wqevqCx+CbRhRDGm7o3umloAQGMJKazNbVNUzyiAi04o73cjTe821osPu7dKN29gxDzy2P4syKnwTm2kjt9kOhJb1GTrb244SmlDmUkF33pbhyJFcvfrcaftShniyLnm9A23EtiqpFPcndm8FSyO8+Ag3fyxpTwzBaqYnDrSVHtSx8fOHHpCylCbI=","cancellation_requested":false,"status":"completed","target":"https://keyvault_name.vault.azure.net/certificates/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-0","request_id":"4d3d7f80e15d4b7994aeac13d2cb33e8"}, [
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
  'aa1906fd-4cbf-43f8-89b1-c910266d513d',
  'x-ms-request-id',
  '4374319f-cfa3-4ddc-a642-576becc0e0cf',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:43:38 GMT',
  'Content-Length',
  '1375'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-0/')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-0/96951399d611454b983fbee45cb41d34","kid":"https://keyvault_name.vault.azure.net/keys/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-0/96951399d611454b983fbee45cb41d34","sid":"https://keyvault_name.vault.azure.net/secrets/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-0/96951399d611454b983fbee45cb41d34","x5t":"1ZdlBt7u07PgctY-tmJMFgSjyCA","cer":"MIIDKDCCAhCgAwIBAgIQML1o1Mx9SlaJuFYL9gcDtjANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjEwNDI4MjEzMzM2WhcNMjIwNDI4MjE0MzM2WjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQCmjICNvJxx58lOTLny7HRljbXy9bhMUKeiTM0FDDrFgYAWZWbpgKaPrDXqIUVwuBtR4brPO7PydKazm9EjbWBWcFH+M1u6R4uz0eCt3omoA5uMi8Hpd6l9sHePmwmtvEBKremRxUEenK45J322D8RkhuPDdiCby4SOu4B7iAaBQU+2BKaBOzFdSQdlxF7lPBBQx28xQVHBKfytzbcZ/G/qPd8MHTxCY9IqE6gmNdPWQj2cD2XWSnISa/1yEITgKXsfbsKt6Xe8r3pBvgD9RSddMcx+oJzjPUZrJexTDzDPColqaMoKWSkxh6BK3yRYz0zY+3P9OvfWRYaTURWBF9SVAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBSyotVhYcLkCbduuQ9/tTiYgYLz+DAdBgNVHQ4EFgQUsqLVYWHC5Am3brkPf7U4mIGC8/gwDQYJKoZIhvcNAQELBQADggEBADOlEsvd0ob48dX1xFA6HSeTCC5IQxFWqBz3FoYYd9cq8IzHRiNfrHIxrwPRW1OsDMmDvx/rqUWaSFmMitgBseS4w6byVaTusA4JA+8R6L9j3ZCgwK2YHxY8rarGHuIzHYoFm4pbQicgtk2kM0atS6UFOLIhnRK2APxjTDbjdNgBmhFiZrM+Y5y4tVCkILtbRVTfik5HxPsibQYyXYmYWSKL61ByhuS6B2Mmy6ouIMxme5kn4fN7VpUWK4FrOhZVtPlQxa4V+7Hi07U99D0xTtbCR3+cNBC8QEAJYw1h/zeQ1hfUw8P8hzk0t1oFU1+XrVPM3MSDAYL3Z/1X8xmKI/U=","attributes":{"enabled":true,"nbf":1619645616,"exp":1651182216,"created":1619646216,"updated":1619646216,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-0/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1619646180,"updated":1619646180}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-0/pending"}}, [
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
  'f4f12429-a1fa-44e4-8507-ca7e97c098dd',
  'x-ms-request-id',
  '572f8fd5-81c0-476e-85de-a1f01fab1684',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:43:38 GMT',
  'Content-Length',
  '2760'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/secrets/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-0/')
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
  'dbd23b1b-533c-4426-bd0e-95076686b22a',
  'x-ms-request-id',
  'da1c0032-747f-4037-946b-dd8347a64eff',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:43:38 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/secrets/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-0/')
  .query(true)
  .reply(200, {"value":"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","contentType":"application/x-pkcs12","id":"https://keyvault_name.vault.azure.net/secrets/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-0/96951399d611454b983fbee45cb41d34","managed":true,"attributes":{"enabled":true,"nbf":1619645616,"exp":1651182216,"created":1619646216,"updated":1619646216,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90},"kid":"https://keyvault_name.vault.azure.net/keys/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-0/96951399d611454b983fbee45cb41d34"}, [
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
  'dbd23b1b-533c-4426-bd0e-95076686b22a',
  'x-ms-request-id',
  'd143b8e7-03f5-4ba3-aafc-37e27f3591ad',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:43:38 GMT',
  'Content-Length',
  '4105'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/certificates/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-1/import', {"value":"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"})
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-1/7f9eff9b646249a2865075a294cf4ce3","kid":"https://keyvault_name.vault.azure.net/keys/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-1/7f9eff9b646249a2865075a294cf4ce3","sid":"https://keyvault_name.vault.azure.net/secrets/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-1/7f9eff9b646249a2865075a294cf4ce3","x5t":"1ZdlBt7u07PgctY-tmJMFgSjyCA","cer":"MIIDKDCCAhCgAwIBAgIQML1o1Mx9SlaJuFYL9gcDtjANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjEwNDI4MjEzMzM2WhcNMjIwNDI4MjE0MzM2WjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQCmjICNvJxx58lOTLny7HRljbXy9bhMUKeiTM0FDDrFgYAWZWbpgKaPrDXqIUVwuBtR4brPO7PydKazm9EjbWBWcFH+M1u6R4uz0eCt3omoA5uMi8Hpd6l9sHePmwmtvEBKremRxUEenK45J322D8RkhuPDdiCby4SOu4B7iAaBQU+2BKaBOzFdSQdlxF7lPBBQx28xQVHBKfytzbcZ/G/qPd8MHTxCY9IqE6gmNdPWQj2cD2XWSnISa/1yEITgKXsfbsKt6Xe8r3pBvgD9RSddMcx+oJzjPUZrJexTDzDPColqaMoKWSkxh6BK3yRYz0zY+3P9OvfWRYaTURWBF9SVAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBSyotVhYcLkCbduuQ9/tTiYgYLz+DAdBgNVHQ4EFgQUsqLVYWHC5Am3brkPf7U4mIGC8/gwDQYJKoZIhvcNAQELBQADggEBADOlEsvd0ob48dX1xFA6HSeTCC5IQxFWqBz3FoYYd9cq8IzHRiNfrHIxrwPRW1OsDMmDvx/rqUWaSFmMitgBseS4w6byVaTusA4JA+8R6L9j3ZCgwK2YHxY8rarGHuIzHYoFm4pbQicgtk2kM0atS6UFOLIhnRK2APxjTDbjdNgBmhFiZrM+Y5y4tVCkILtbRVTfik5HxPsibQYyXYmYWSKL61ByhuS6B2Mmy6ouIMxme5kn4fN7VpUWK4FrOhZVtPlQxa4V+7Hi07U99D0xTtbCR3+cNBC8QEAJYw1h/zeQ1hfUw8P8hzk0t1oFU1+XrVPM3MSDAYL3Z/1X8xmKI/U=","attributes":{"enabled":true,"nbf":1619645616,"exp":1651182216,"created":1619646219,"updated":1619646219,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-1/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"CN=MyCert","ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":13,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"EmailContacts"}}],"issuer":{"name":"Unknown"},"attributes":{"enabled":true,"created":1619646219,"updated":1619646219}}}, [
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
  'b228cf29-fe7f-4456-9d44-2fb5099ccb45',
  'x-ms-request-id',
  '0d3223aa-28a2-4edf-aaa9-d70b012dcf1b',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:43:39 GMT',
  'Content-Length',
  '2575'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/certificates/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-0')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-0","deletedDate":1619646219,"scheduledPurgeDate":1627422219,"id":"https://keyvault_name.vault.azure.net/certificates/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-0/96951399d611454b983fbee45cb41d34","kid":"https://keyvault_name.vault.azure.net/keys/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-0/96951399d611454b983fbee45cb41d34","sid":"https://keyvault_name.vault.azure.net/secrets/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-0/96951399d611454b983fbee45cb41d34","x5t":"1ZdlBt7u07PgctY-tmJMFgSjyCA","cer":"MIIDKDCCAhCgAwIBAgIQML1o1Mx9SlaJuFYL9gcDtjANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjEwNDI4MjEzMzM2WhcNMjIwNDI4MjE0MzM2WjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQCmjICNvJxx58lOTLny7HRljbXy9bhMUKeiTM0FDDrFgYAWZWbpgKaPrDXqIUVwuBtR4brPO7PydKazm9EjbWBWcFH+M1u6R4uz0eCt3omoA5uMi8Hpd6l9sHePmwmtvEBKremRxUEenK45J322D8RkhuPDdiCby4SOu4B7iAaBQU+2BKaBOzFdSQdlxF7lPBBQx28xQVHBKfytzbcZ/G/qPd8MHTxCY9IqE6gmNdPWQj2cD2XWSnISa/1yEITgKXsfbsKt6Xe8r3pBvgD9RSddMcx+oJzjPUZrJexTDzDPColqaMoKWSkxh6BK3yRYz0zY+3P9OvfWRYaTURWBF9SVAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBSyotVhYcLkCbduuQ9/tTiYgYLz+DAdBgNVHQ4EFgQUsqLVYWHC5Am3brkPf7U4mIGC8/gwDQYJKoZIhvcNAQELBQADggEBADOlEsvd0ob48dX1xFA6HSeTCC5IQxFWqBz3FoYYd9cq8IzHRiNfrHIxrwPRW1OsDMmDvx/rqUWaSFmMitgBseS4w6byVaTusA4JA+8R6L9j3ZCgwK2YHxY8rarGHuIzHYoFm4pbQicgtk2kM0atS6UFOLIhnRK2APxjTDbjdNgBmhFiZrM+Y5y4tVCkILtbRVTfik5HxPsibQYyXYmYWSKL61ByhuS6B2Mmy6ouIMxme5kn4fN7VpUWK4FrOhZVtPlQxa4V+7Hi07U99D0xTtbCR3+cNBC8QEAJYw1h/zeQ1hfUw8P8hzk0t1oFU1+XrVPM3MSDAYL3Z/1X8xmKI/U=","attributes":{"enabled":true,"nbf":1619645616,"exp":1651182216,"created":1619646216,"updated":1619646216,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-0/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1619646180,"updated":1619646180}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-0/pending"}}, [
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
  '9bf0e5ab-17d0-44f8-ad0d-83dd42d75398',
  'x-ms-request-id',
  '1b5df1f8-ba6c-484f-8364-69f1664a648f',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:43:39 GMT',
  'Content-Length',
  '2994'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-0')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-0"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '181',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '7dc1783e-634e-44a2-af90-8cec8319c7d3',
  'x-ms-request-id',
  '00ba34df-ed00-40c9-980e-67c87dcabb9e',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:43:39 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-0')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-0"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '181',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '59856634-90bf-4cbb-80c6-4e29887a9e2b',
  'x-ms-request-id',
  '6d13ac61-a693-4e64-9ca9-d9587a89c52b',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:43:39 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-0')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-0"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '181',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '61a45dfe-e939-49b1-a9e9-ba2f55a06100',
  'x-ms-request-id',
  '99c9e8bf-4579-4be4-bb96-1ca2a8ed8a23',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:43:41 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-0')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-0"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '181',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '76aeb3ee-a50b-4ba3-be0d-342866accb4e',
  'x-ms-request-id',
  'a4d91d70-4f12-43fb-90ef-9ee3d6e2300c',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:43:43 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-0')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-0"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '181',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '2d3124d2-348d-4b53-922e-9594b9e910f9',
  'x-ms-request-id',
  '7a786b85-ac10-4ba0-a69b-0dc177854607',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:43:45 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-0')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-0"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '181',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '44902ce0-fdfe-4e60-acf4-e051f0101924',
  'x-ms-request-id',
  '3f89e6c3-30e5-4601-952b-cacc39e12a1d',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:43:47 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-0')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-0"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '181',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '73d44e24-9e2a-40a9-911d-ebaf9645f089',
  'x-ms-request-id',
  'ca4c462a-9fb2-45b3-bfca-0e763012ca6c',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:43:50 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-0')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-0"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '181',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'b1005915-e46a-42ea-be1f-b4e3aa88b886',
  'x-ms-request-id',
  '9f7f993f-a076-4f20-9249-d09d09e2ff40',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:43:52 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-0')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-0"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '181',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'fec7f9b8-4386-4fc5-8cc9-22c9d2bbde5b',
  'x-ms-request-id',
  '9f15487b-aa1c-4551-93db-7fa39061fa79',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:43:53 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-0')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-0"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '181',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '96180dfc-e496-400b-9da9-1a794cea658e',
  'x-ms-request-id',
  '3dc7acc2-44e9-478c-91c0-685d6f164dbb',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:43:56 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-0')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-0"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '181',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '50522b3a-a12b-4909-982f-3986ef340c46',
  'x-ms-request-id',
  'a54ee2b1-3695-48b1-add9-4e82409086aa',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:43:57 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-0')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-0"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '181',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'c23083ac-d2e8-4b57-817a-3778f41a92b7',
  'x-ms-request-id',
  '376533bf-e120-42de-a80d-c7d2766816d4',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:44:00 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-0')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-0"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '181',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'bfce9670-f3a7-40b1-9e8f-3429495a9ef0',
  'x-ms-request-id',
  '3a669189-0e1a-4b83-bcb9-7137c5356dfb',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:44:02 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-0')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-0"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '181',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'e36c7eee-7ac1-468e-8854-a1bab9471c6a',
  'x-ms-request-id',
  'ca7653d0-170f-482b-ba33-bebec1a38431',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:44:04 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-0')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-0"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '181',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '38da60ad-3942-4147-90ed-b7900c2135bb',
  'x-ms-request-id',
  '0f0e33b4-0702-45af-8bfa-95abf61635a7',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:44:05 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-0')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-0"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '181',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '70a5480e-e047-4a19-b06a-a8b7f7eda619',
  'x-ms-request-id',
  '607bb0b7-fe29-44a5-88e2-d86e2796b5ea',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:44:08 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-0')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-0"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '181',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '38bc3727-3798-4c0c-a4b8-ba1040ac93a3',
  'x-ms-request-id',
  '3cfebdb8-0b93-414c-bf1c-018c558fd987',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:44:10 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-0')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-0"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '181',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '5c40adca-12b2-45a3-b602-85271250f171',
  'x-ms-request-id',
  '4d8de923-b7ae-43ac-a464-a33f271e8d93',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:44:12 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-0')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-0"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '181',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '736a8969-1a36-4593-9dd9-7a205193dfde',
  'x-ms-request-id',
  '9a55728d-8397-4973-a807-9a716542b994',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:44:15 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-0')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-0"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '181',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '93501c5d-cad7-4eb5-bd39-29427f798c71',
  'x-ms-request-id',
  '52326aa8-2f40-4680-9f84-1bbc874bc0b0',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:44:17 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-0')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-0","deletedDate":1619646219,"scheduledPurgeDate":1627422219,"id":"https://keyvault_name.vault.azure.net/certificates/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-0/96951399d611454b983fbee45cb41d34","kid":"https://keyvault_name.vault.azure.net/keys/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-0/96951399d611454b983fbee45cb41d34","sid":"https://keyvault_name.vault.azure.net/secrets/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-0/96951399d611454b983fbee45cb41d34","x5t":"1ZdlBt7u07PgctY-tmJMFgSjyCA","cer":"MIIDKDCCAhCgAwIBAgIQML1o1Mx9SlaJuFYL9gcDtjANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjEwNDI4MjEzMzM2WhcNMjIwNDI4MjE0MzM2WjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQCmjICNvJxx58lOTLny7HRljbXy9bhMUKeiTM0FDDrFgYAWZWbpgKaPrDXqIUVwuBtR4brPO7PydKazm9EjbWBWcFH+M1u6R4uz0eCt3omoA5uMi8Hpd6l9sHePmwmtvEBKremRxUEenK45J322D8RkhuPDdiCby4SOu4B7iAaBQU+2BKaBOzFdSQdlxF7lPBBQx28xQVHBKfytzbcZ/G/qPd8MHTxCY9IqE6gmNdPWQj2cD2XWSnISa/1yEITgKXsfbsKt6Xe8r3pBvgD9RSddMcx+oJzjPUZrJexTDzDPColqaMoKWSkxh6BK3yRYz0zY+3P9OvfWRYaTURWBF9SVAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBSyotVhYcLkCbduuQ9/tTiYgYLz+DAdBgNVHQ4EFgQUsqLVYWHC5Am3brkPf7U4mIGC8/gwDQYJKoZIhvcNAQELBQADggEBADOlEsvd0ob48dX1xFA6HSeTCC5IQxFWqBz3FoYYd9cq8IzHRiNfrHIxrwPRW1OsDMmDvx/rqUWaSFmMitgBseS4w6byVaTusA4JA+8R6L9j3ZCgwK2YHxY8rarGHuIzHYoFm4pbQicgtk2kM0atS6UFOLIhnRK2APxjTDbjdNgBmhFiZrM+Y5y4tVCkILtbRVTfik5HxPsibQYyXYmYWSKL61ByhuS6B2Mmy6ouIMxme5kn4fN7VpUWK4FrOhZVtPlQxa4V+7Hi07U99D0xTtbCR3+cNBC8QEAJYw1h/zeQ1hfUw8P8hzk0t1oFU1+XrVPM3MSDAYL3Z/1X8xmKI/U=","attributes":{"enabled":true,"nbf":1619645616,"exp":1651182216,"created":1619646216,"updated":1619646216,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-0/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1619646180,"updated":1619646180}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-0/pending"}}, [
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
  '9b904598-efd4-442c-bd9f-475de521ad67',
  'x-ms-request-id',
  '4095c3c8-eb02-41df-aa27-1e51925cfff8',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:44:18 GMT',
  'Content-Length',
  '2994'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedcertificates/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-0')
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
  '57514133-7577-4232-8c0e-f99b96b343cb',
  'x-ms-request-id',
  'a8f8472b-e7af-43f4-ba2f-72d862848530',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:44:19 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/certificates/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-1')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-1","deletedDate":1619646259,"scheduledPurgeDate":1627422259,"id":"https://keyvault_name.vault.azure.net/certificates/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-1/7f9eff9b646249a2865075a294cf4ce3","kid":"https://keyvault_name.vault.azure.net/keys/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-1/7f9eff9b646249a2865075a294cf4ce3","sid":"https://keyvault_name.vault.azure.net/secrets/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-1/7f9eff9b646249a2865075a294cf4ce3","x5t":"1ZdlBt7u07PgctY-tmJMFgSjyCA","cer":"MIIDKDCCAhCgAwIBAgIQML1o1Mx9SlaJuFYL9gcDtjANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjEwNDI4MjEzMzM2WhcNMjIwNDI4MjE0MzM2WjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQCmjICNvJxx58lOTLny7HRljbXy9bhMUKeiTM0FDDrFgYAWZWbpgKaPrDXqIUVwuBtR4brPO7PydKazm9EjbWBWcFH+M1u6R4uz0eCt3omoA5uMi8Hpd6l9sHePmwmtvEBKremRxUEenK45J322D8RkhuPDdiCby4SOu4B7iAaBQU+2BKaBOzFdSQdlxF7lPBBQx28xQVHBKfytzbcZ/G/qPd8MHTxCY9IqE6gmNdPWQj2cD2XWSnISa/1yEITgKXsfbsKt6Xe8r3pBvgD9RSddMcx+oJzjPUZrJexTDzDPColqaMoKWSkxh6BK3yRYz0zY+3P9OvfWRYaTURWBF9SVAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBSyotVhYcLkCbduuQ9/tTiYgYLz+DAdBgNVHQ4EFgQUsqLVYWHC5Am3brkPf7U4mIGC8/gwDQYJKoZIhvcNAQELBQADggEBADOlEsvd0ob48dX1xFA6HSeTCC5IQxFWqBz3FoYYd9cq8IzHRiNfrHIxrwPRW1OsDMmDvx/rqUWaSFmMitgBseS4w6byVaTusA4JA+8R6L9j3ZCgwK2YHxY8rarGHuIzHYoFm4pbQicgtk2kM0atS6UFOLIhnRK2APxjTDbjdNgBmhFiZrM+Y5y4tVCkILtbRVTfik5HxPsibQYyXYmYWSKL61ByhuS6B2Mmy6ouIMxme5kn4fN7VpUWK4FrOhZVtPlQxa4V+7Hi07U99D0xTtbCR3+cNBC8QEAJYw1h/zeQ1hfUw8P8hzk0t1oFU1+XrVPM3MSDAYL3Z/1X8xmKI/U=","attributes":{"enabled":true,"nbf":1619645616,"exp":1651182216,"created":1619646219,"updated":1619646219,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-1/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"CN=MyCert","ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":13,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"EmailContacts"}}],"issuer":{"name":"Unknown"},"attributes":{"enabled":true,"created":1619646219,"updated":1619646219}}}, [
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
  '346a5a8e-a144-4b61-bc24-365b346f6953',
  'x-ms-request-id',
  '6a85b720-7321-429d-abf8-8eba36162c8c',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:44:19 GMT',
  'Content-Length',
  '2809'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-1')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-1"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '181',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '9dce227f-f98e-4887-a685-b4d66f3b455b',
  'x-ms-request-id',
  'f2d6d77b-5e71-4ea5-a387-1ce5679b813e',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:44:19 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-1')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-1"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '181',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '995c51f3-3fa4-4ecd-ae9f-229cd66bc8f2',
  'x-ms-request-id',
  '8e47ec9f-043c-48ac-adf6-866d3adef910',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:44:19 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-1')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-1"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '181',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '6a4fce93-1a16-4a35-8c0e-c0caf6b825e2',
  'x-ms-request-id',
  '8d764d76-991b-4543-bf07-ad627f95a72c',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:44:22 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-1')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-1"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '181',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'ea37da27-03ed-4bf5-a5f8-b50a3afe6295',
  'x-ms-request-id',
  'c8571c8d-0851-418c-8dbb-d9449a08b80e',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:44:24 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-1')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-1"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '181',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '6789f207-8106-486b-bcb9-e5f5bc677992',
  'x-ms-request-id',
  '2c5bf8f5-2848-43f0-95dc-c6b11f61119a',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:44:25 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-1')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-1"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '181',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '626b2868-fb1d-48fc-b5cd-afd939fbfa39',
  'x-ms-request-id',
  'fe5996f6-6e9a-4b63-9191-63cfdac15561',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:44:28 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-1')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-1"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '181',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '31f50f1d-4a9c-4399-bee0-892cb174793f',
  'x-ms-request-id',
  'da102807-6f12-4e37-b107-74dc229f4b79',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:44:30 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-1')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-1"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '181',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '85da76b2-4fd3-44d4-8105-a431a4df6388',
  'x-ms-request-id',
  'dd9b3d64-80d8-4bc1-8bce-70d8d759f4d5',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:44:32 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-1')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-1"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '181',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '20ba0a08-8231-4d7f-91ed-e93eb9abfbc2',
  'x-ms-request-id',
  '693293b3-7c90-4d30-af71-77a98b6a4e6e',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:44:34 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-1')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-1"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '181',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'cab09bdf-2bf2-43d9-81c6-a0daedef1bea',
  'x-ms-request-id',
  '061aafaf-4e7b-4510-bb5e-55c86a3d7795',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:44:36 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-1')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-1"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '181',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'e920e5ab-5d9d-421e-b520-c94efc715b2d',
  'x-ms-request-id',
  '794a84d8-d49e-4e30-8b00-a564bb80d015',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:44:38 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-1')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-1"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '181',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '76f41628-8b51-469b-a2cd-f8115ec54980',
  'x-ms-request-id',
  'e6d1ac8c-3a71-4f8c-abcf-f11da0780cc7',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:44:40 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-1')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-1"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '181',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '6ef5f1c0-a71d-4c8c-b335-2ee7bd15792b',
  'x-ms-request-id',
  'a89a9f97-4212-49ac-9948-053fce7bdcf3',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:44:42 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-1')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-1"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '181',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'd60e562a-9d7c-4a75-95f9-cb9904a8137a',
  'x-ms-request-id',
  'ed705dfd-da2d-4772-81bb-545bf13a10a7',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:44:44 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-1')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-1"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '181',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'c6910099-2b27-49d5-8da4-57cc0f7440cc',
  'x-ms-request-id',
  '7f7ca873-e50a-414c-9956-274568030ab1',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:44:46 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-1')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-1"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '181',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '51100d7b-e460-4723-8781-1ba054b03679',
  'x-ms-request-id',
  'ac471a9e-9f7c-4395-9910-03ff7c18768b',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:44:49 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-1')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-1"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '181',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '8ca8be2b-cc76-49a2-ba0b-dc27e30834c9',
  'x-ms-request-id',
  '4af3d882-c865-4df2-8fd3-3155ff4358ab',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:44:51 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-1')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-1"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '181',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'a898d942-e79f-448c-b5f9-eba5252b5cb9',
  'x-ms-request-id',
  'fcc877d3-fdb1-44aa-bd96-7647abc95f72',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:44:53 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-1')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-1"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '181',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '0c88ccea-70d6-4c0d-86ee-053cf1dd0aac',
  'x-ms-request-id',
  '04191aa4-1fd3-43da-bd05-35924cefcbf2',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:44:54 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-1')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-1"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '181',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '51801a37-eb43-4032-bdb4-9538369bb97b',
  'x-ms-request-id',
  '06cac462-fb1c-41db-b3c5-a2a89f800ae9',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:44:57 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-1')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-1","deletedDate":1619646259,"scheduledPurgeDate":1627422259,"id":"https://keyvault_name.vault.azure.net/certificates/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-1/7f9eff9b646249a2865075a294cf4ce3","kid":"https://keyvault_name.vault.azure.net/keys/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-1/7f9eff9b646249a2865075a294cf4ce3","sid":"https://keyvault_name.vault.azure.net/secrets/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-1/7f9eff9b646249a2865075a294cf4ce3","x5t":"1ZdlBt7u07PgctY-tmJMFgSjyCA","cer":"MIIDKDCCAhCgAwIBAgIQML1o1Mx9SlaJuFYL9gcDtjANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjEwNDI4MjEzMzM2WhcNMjIwNDI4MjE0MzM2WjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQCmjICNvJxx58lOTLny7HRljbXy9bhMUKeiTM0FDDrFgYAWZWbpgKaPrDXqIUVwuBtR4brPO7PydKazm9EjbWBWcFH+M1u6R4uz0eCt3omoA5uMi8Hpd6l9sHePmwmtvEBKremRxUEenK45J322D8RkhuPDdiCby4SOu4B7iAaBQU+2BKaBOzFdSQdlxF7lPBBQx28xQVHBKfytzbcZ/G/qPd8MHTxCY9IqE6gmNdPWQj2cD2XWSnISa/1yEITgKXsfbsKt6Xe8r3pBvgD9RSddMcx+oJzjPUZrJexTDzDPColqaMoKWSkxh6BK3yRYz0zY+3P9OvfWRYaTURWBF9SVAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBSyotVhYcLkCbduuQ9/tTiYgYLz+DAdBgNVHQ4EFgQUsqLVYWHC5Am3brkPf7U4mIGC8/gwDQYJKoZIhvcNAQELBQADggEBADOlEsvd0ob48dX1xFA6HSeTCC5IQxFWqBz3FoYYd9cq8IzHRiNfrHIxrwPRW1OsDMmDvx/rqUWaSFmMitgBseS4w6byVaTusA4JA+8R6L9j3ZCgwK2YHxY8rarGHuIzHYoFm4pbQicgtk2kM0atS6UFOLIhnRK2APxjTDbjdNgBmhFiZrM+Y5y4tVCkILtbRVTfik5HxPsibQYyXYmYWSKL61ByhuS6B2Mmy6ouIMxme5kn4fN7VpUWK4FrOhZVtPlQxa4V+7Hi07U99D0xTtbCR3+cNBC8QEAJYw1h/zeQ1hfUw8P8hzk0t1oFU1+XrVPM3MSDAYL3Z/1X8xmKI/U=","attributes":{"enabled":true,"nbf":1619645616,"exp":1651182216,"created":1619646219,"updated":1619646219,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-1/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"CN=MyCert","ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":13,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"EmailContacts"}}],"issuer":{"name":"Unknown"},"attributes":{"enabled":true,"created":1619646219,"updated":1619646219}}}, [
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
  'a9929bfc-95a6-4919-b0dd-6b78eee0bf33',
  'x-ms-request-id',
  '54b821cd-d6ac-4b36-9bde-5641743697e4',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:44:59 GMT',
  'Content-Length',
  '2809'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedcertificates/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-1')
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
  '54d17d40-d403-43e9-b06a-821ecdbd91df',
  'x-ms-request-id',
  '38dec8ac-cfe1-41f6-9707-5cb307bf9055',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:44:59 GMT'
]);

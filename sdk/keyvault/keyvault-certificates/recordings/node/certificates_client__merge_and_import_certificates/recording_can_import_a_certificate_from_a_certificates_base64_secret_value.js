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
  'Bearer authorization="https://login.windows.net/12345678-1234-1234-1234-123456789012", resource="https://vault.azure.net"',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '5cad1fdc-52e0-47a6-a56a-1ecb16dd1a56',
  'x-ms-request-id',
  'ed46f075-95fd-490b-9227-40bd6d444a8b',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
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
  '861ba13d-cda3-4f92-b935-9e551aece602',
  'x-ms-ests-server',
  '2.1.11654.16 - WUS2 ProdSlices',
  'Set-Cookie',
  'fpc=ArwmQ1W5Q_pEig-aUDD0fZjmR1YbAgAAAOnMG9gOAAAA; expires=Fri, 28-May-2021 21:45:00 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrwtVZgS4KE8bRnOMmi5IDvIukQtD9qxHqQW8flyJjPeG5YWnMbWJTTKhuPsGcElp_qza23w88sk0mOiXoi2Jggf2MZTax4peoVCQbFaMsWRsyUS4M7cnyvW_oiZcxx7mYFSD50xrKItxmh0YQgcwR5BK6Cam-Noi32-pqL3F_M7AgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 28 Apr 2021 21:44:59 GMT',
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
  'e83837f2-463c-4291-a76b-dd8108581d01',
  'x-ms-ests-server',
  '2.1.11654.16 - WUS2 ProdSlices',
  'Set-Cookie',
  'fpc=ArwmQ1W5Q_pEig-aUDD0fZjmR1YbAgAAAOnMG9gOAAAA; expires=Fri, 28-May-2021 21:45:00 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrhDtl7ZWhu9smMSXyIgMIa6y6G-ePXEtzmGqh22qo-aVn2qSX5mn8-8GCZbN9g3EBWO5zt_qerBCVgL-oBxpD-ozQ1QEwOUjC92bcNw84XXl6XpiwqOmQmerjV-kok4haTW3ZcJXQ6-88x0xNYZXicHohZSqKLncL59fFeHOhi8kgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 28 Apr 2021 21:44:59 GMT',
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
  'e83837f2-463c-4291-a76b-dd810b581d01',
  'x-ms-ests-server',
  '2.1.11654.16 - WUS2 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=ArwmQ1W5Q_pEig-aUDD0fZjmR1YbAQAAABXOG9gOAAAA; expires=Fri, 28-May-2021 21:45:00 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 28 Apr 2021 21:44:59 GMT',
  'Content-Length',
  '1313'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/certificates/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-0/create', {"policy":{"key_props":{},"secret_props":{},"x509_props":{"subject":"cn=MyCert","sans":{}},"issuer":{"name":"Self"},"attributes":{}},"attributes":{}})
  .query(true)
  .reply(202, {"id":"https://keyvault_name.vault.azure.net/certificates/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAuzRkr5DktVJkZvgSW35Y/B+HLLw1FyiyXgbiQ3Ete0DIJPgMF1Rf5ZoUzgcfqt0qJUiLF3rjt0duOsYPGqNhWr8Sz9oRbzfrGqI+MOzOVnBgk32MJVoSo9aFxg2OTyJfD7q8VZQQ/FDbzgv5gILgi5AIWbcPmJFk9kI1i9CK7QnY22Ml2r8dnYaPNnbn8mIrd3vvAxtQEpUqNwWctLOPA/AewzC/cQOijpYDU9O2ujbqfad+zTiZUm4axsc7DEy8kr1YS2em135ERv2KZRaxnMHZ1RgQEG3fbktR8ACZVceAHq0ATsbiTCV6ErlzPT4ED4BitTwc7L3yXS/geH+uVQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAGsNJI14LRdajbwembuft/ZZeHuj8ILLubhx0yLcsTY0M79rGRuMW7kqd5YMaWsNukIM54l3oLLUu+o3onN+7O7KPdNVeQlp0enO4X9+/Vf3S34i9Af6UCSbgdAbhB4vq5KCQxepUw1cddCiE0hoQhy+cH0G2ljvSTT00Rw4gqGMzzBlRaDs9ipwUloVbBf2JAU8lIiIvv3eE8cgjBj8emJSSz3MWvkNnELd+vTDilV/jwuDzu/iWbBkXxelJfaunNhPt6///QDmiXOGKW0RuOHE4/ABuPOd/R+T7kLROmGChv3TotrCw4HYcH5RDlLV9kLzwlxYsNK+0xT3CXCJDxI=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"54904f8d86f54b1da8c925f4b684c87a"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://keyvault_name.vault.azure.net/certificates/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-0/pending?api-version=7.2&request_id=54904f8d86f54b1da8c925f4b684c87a',
  'Retry-After',
  '10',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '5cad1fdc-52e0-47a6-a56a-1ecb16dd1a56',
  'x-ms-request-id',
  'a951e405-3a2c-4873-93f2-8484f9eecdf5',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:45:00 GMT',
  'Content-Length',
  '1371'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAuzRkr5DktVJkZvgSW35Y/B+HLLw1FyiyXgbiQ3Ete0DIJPgMF1Rf5ZoUzgcfqt0qJUiLF3rjt0duOsYPGqNhWr8Sz9oRbzfrGqI+MOzOVnBgk32MJVoSo9aFxg2OTyJfD7q8VZQQ/FDbzgv5gILgi5AIWbcPmJFk9kI1i9CK7QnY22Ml2r8dnYaPNnbn8mIrd3vvAxtQEpUqNwWctLOPA/AewzC/cQOijpYDU9O2ujbqfad+zTiZUm4axsc7DEy8kr1YS2em135ERv2KZRaxnMHZ1RgQEG3fbktR8ACZVceAHq0ATsbiTCV6ErlzPT4ED4BitTwc7L3yXS/geH+uVQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAGsNJI14LRdajbwembuft/ZZeHuj8ILLubhx0yLcsTY0M79rGRuMW7kqd5YMaWsNukIM54l3oLLUu+o3onN+7O7KPdNVeQlp0enO4X9+/Vf3S34i9Af6UCSbgdAbhB4vq5KCQxepUw1cddCiE0hoQhy+cH0G2ljvSTT00Rw4gqGMzzBlRaDs9ipwUloVbBf2JAU8lIiIvv3eE8cgjBj8emJSSz3MWvkNnELd+vTDilV/jwuDzu/iWbBkXxelJfaunNhPt6///QDmiXOGKW0RuOHE4/ABuPOd/R+T7kLROmGChv3TotrCw4HYcH5RDlLV9kLzwlxYsNK+0xT3CXCJDxI=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"54904f8d86f54b1da8c925f4b684c87a"}, [
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
  'c9b85355-650b-4ad5-a201-af60c253965a',
  'x-ms-request-id',
  'a782d6b3-f771-45ef-b1c0-9574c7bca098',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:45:00 GMT',
  'Content-Length',
  '1371'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAuzRkr5DktVJkZvgSW35Y/B+HLLw1FyiyXgbiQ3Ete0DIJPgMF1Rf5ZoUzgcfqt0qJUiLF3rjt0duOsYPGqNhWr8Sz9oRbzfrGqI+MOzOVnBgk32MJVoSo9aFxg2OTyJfD7q8VZQQ/FDbzgv5gILgi5AIWbcPmJFk9kI1i9CK7QnY22Ml2r8dnYaPNnbn8mIrd3vvAxtQEpUqNwWctLOPA/AewzC/cQOijpYDU9O2ujbqfad+zTiZUm4axsc7DEy8kr1YS2em135ERv2KZRaxnMHZ1RgQEG3fbktR8ACZVceAHq0ATsbiTCV6ErlzPT4ED4BitTwc7L3yXS/geH+uVQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAGsNJI14LRdajbwembuft/ZZeHuj8ILLubhx0yLcsTY0M79rGRuMW7kqd5YMaWsNukIM54l3oLLUu+o3onN+7O7KPdNVeQlp0enO4X9+/Vf3S34i9Af6UCSbgdAbhB4vq5KCQxepUw1cddCiE0hoQhy+cH0G2ljvSTT00Rw4gqGMzzBlRaDs9ipwUloVbBf2JAU8lIiIvv3eE8cgjBj8emJSSz3MWvkNnELd+vTDilV/jwuDzu/iWbBkXxelJfaunNhPt6///QDmiXOGKW0RuOHE4/ABuPOd/R+T7kLROmGChv3TotrCw4HYcH5RDlLV9kLzwlxYsNK+0xT3CXCJDxI=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"54904f8d86f54b1da8c925f4b684c87a"}, [
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
  'beef268e-abe9-4ec1-bd21-a4e7f12c7e35',
  'x-ms-request-id',
  '4efee2bb-5771-4004-aa81-d33e731a655a',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:45:00 GMT',
  'Content-Length',
  '1371'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAuzRkr5DktVJkZvgSW35Y/B+HLLw1FyiyXgbiQ3Ete0DIJPgMF1Rf5ZoUzgcfqt0qJUiLF3rjt0duOsYPGqNhWr8Sz9oRbzfrGqI+MOzOVnBgk32MJVoSo9aFxg2OTyJfD7q8VZQQ/FDbzgv5gILgi5AIWbcPmJFk9kI1i9CK7QnY22Ml2r8dnYaPNnbn8mIrd3vvAxtQEpUqNwWctLOPA/AewzC/cQOijpYDU9O2ujbqfad+zTiZUm4axsc7DEy8kr1YS2em135ERv2KZRaxnMHZ1RgQEG3fbktR8ACZVceAHq0ATsbiTCV6ErlzPT4ED4BitTwc7L3yXS/geH+uVQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAGsNJI14LRdajbwembuft/ZZeHuj8ILLubhx0yLcsTY0M79rGRuMW7kqd5YMaWsNukIM54l3oLLUu+o3onN+7O7KPdNVeQlp0enO4X9+/Vf3S34i9Af6UCSbgdAbhB4vq5KCQxepUw1cddCiE0hoQhy+cH0G2ljvSTT00Rw4gqGMzzBlRaDs9ipwUloVbBf2JAU8lIiIvv3eE8cgjBj8emJSSz3MWvkNnELd+vTDilV/jwuDzu/iWbBkXxelJfaunNhPt6///QDmiXOGKW0RuOHE4/ABuPOd/R+T7kLROmGChv3TotrCw4HYcH5RDlLV9kLzwlxYsNK+0xT3CXCJDxI=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"54904f8d86f54b1da8c925f4b684c87a"}, [
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
  '3521b081-e445-4ee9-943a-c4ecfb149ba5',
  'x-ms-request-id',
  'e03d719b-98cf-4c6f-82e2-520566eceba2',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:45:02 GMT',
  'Content-Length',
  '1371'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAuzRkr5DktVJkZvgSW35Y/B+HLLw1FyiyXgbiQ3Ete0DIJPgMF1Rf5ZoUzgcfqt0qJUiLF3rjt0duOsYPGqNhWr8Sz9oRbzfrGqI+MOzOVnBgk32MJVoSo9aFxg2OTyJfD7q8VZQQ/FDbzgv5gILgi5AIWbcPmJFk9kI1i9CK7QnY22Ml2r8dnYaPNnbn8mIrd3vvAxtQEpUqNwWctLOPA/AewzC/cQOijpYDU9O2ujbqfad+zTiZUm4axsc7DEy8kr1YS2em135ERv2KZRaxnMHZ1RgQEG3fbktR8ACZVceAHq0ATsbiTCV6ErlzPT4ED4BitTwc7L3yXS/geH+uVQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAGsNJI14LRdajbwembuft/ZZeHuj8ILLubhx0yLcsTY0M79rGRuMW7kqd5YMaWsNukIM54l3oLLUu+o3onN+7O7KPdNVeQlp0enO4X9+/Vf3S34i9Af6UCSbgdAbhB4vq5KCQxepUw1cddCiE0hoQhy+cH0G2ljvSTT00Rw4gqGMzzBlRaDs9ipwUloVbBf2JAU8lIiIvv3eE8cgjBj8emJSSz3MWvkNnELd+vTDilV/jwuDzu/iWbBkXxelJfaunNhPt6///QDmiXOGKW0RuOHE4/ABuPOd/R+T7kLROmGChv3TotrCw4HYcH5RDlLV9kLzwlxYsNK+0xT3CXCJDxI=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"54904f8d86f54b1da8c925f4b684c87a"}, [
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
  '0d603386-eafa-4831-92e9-8b6b5ae67be4',
  'x-ms-request-id',
  '0dcd3c78-8117-4736-b7ac-7a28725e612d',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:45:05 GMT',
  'Content-Length',
  '1371'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAuzRkr5DktVJkZvgSW35Y/B+HLLw1FyiyXgbiQ3Ete0DIJPgMF1Rf5ZoUzgcfqt0qJUiLF3rjt0duOsYPGqNhWr8Sz9oRbzfrGqI+MOzOVnBgk32MJVoSo9aFxg2OTyJfD7q8VZQQ/FDbzgv5gILgi5AIWbcPmJFk9kI1i9CK7QnY22Ml2r8dnYaPNnbn8mIrd3vvAxtQEpUqNwWctLOPA/AewzC/cQOijpYDU9O2ujbqfad+zTiZUm4axsc7DEy8kr1YS2em135ERv2KZRaxnMHZ1RgQEG3fbktR8ACZVceAHq0ATsbiTCV6ErlzPT4ED4BitTwc7L3yXS/geH+uVQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAGsNJI14LRdajbwembuft/ZZeHuj8ILLubhx0yLcsTY0M79rGRuMW7kqd5YMaWsNukIM54l3oLLUu+o3onN+7O7KPdNVeQlp0enO4X9+/Vf3S34i9Af6UCSbgdAbhB4vq5KCQxepUw1cddCiE0hoQhy+cH0G2ljvSTT00Rw4gqGMzzBlRaDs9ipwUloVbBf2JAU8lIiIvv3eE8cgjBj8emJSSz3MWvkNnELd+vTDilV/jwuDzu/iWbBkXxelJfaunNhPt6///QDmiXOGKW0RuOHE4/ABuPOd/R+T7kLROmGChv3TotrCw4HYcH5RDlLV9kLzwlxYsNK+0xT3CXCJDxI=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"54904f8d86f54b1da8c925f4b684c87a"}, [
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
  'f49dc78a-dc68-416a-9e2e-4668ac346a6e',
  'x-ms-request-id',
  '042a615f-1d0c-444b-920c-0f1d59e9ca9f',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:45:06 GMT',
  'Content-Length',
  '1371'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAuzRkr5DktVJkZvgSW35Y/B+HLLw1FyiyXgbiQ3Ete0DIJPgMF1Rf5ZoUzgcfqt0qJUiLF3rjt0duOsYPGqNhWr8Sz9oRbzfrGqI+MOzOVnBgk32MJVoSo9aFxg2OTyJfD7q8VZQQ/FDbzgv5gILgi5AIWbcPmJFk9kI1i9CK7QnY22Ml2r8dnYaPNnbn8mIrd3vvAxtQEpUqNwWctLOPA/AewzC/cQOijpYDU9O2ujbqfad+zTiZUm4axsc7DEy8kr1YS2em135ERv2KZRaxnMHZ1RgQEG3fbktR8ACZVceAHq0ATsbiTCV6ErlzPT4ED4BitTwc7L3yXS/geH+uVQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAGsNJI14LRdajbwembuft/ZZeHuj8ILLubhx0yLcsTY0M79rGRuMW7kqd5YMaWsNukIM54l3oLLUu+o3onN+7O7KPdNVeQlp0enO4X9+/Vf3S34i9Af6UCSbgdAbhB4vq5KCQxepUw1cddCiE0hoQhy+cH0G2ljvSTT00Rw4gqGMzzBlRaDs9ipwUloVbBf2JAU8lIiIvv3eE8cgjBj8emJSSz3MWvkNnELd+vTDilV/jwuDzu/iWbBkXxelJfaunNhPt6///QDmiXOGKW0RuOHE4/ABuPOd/R+T7kLROmGChv3TotrCw4HYcH5RDlLV9kLzwlxYsNK+0xT3CXCJDxI=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"54904f8d86f54b1da8c925f4b684c87a"}, [
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
  '5cb3c295-6205-4f5f-baf3-d9f173a54c4b',
  'x-ms-request-id',
  '562f2162-b48e-410f-8839-d50204e3802a',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:45:09 GMT',
  'Content-Length',
  '1371'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAuzRkr5DktVJkZvgSW35Y/B+HLLw1FyiyXgbiQ3Ete0DIJPgMF1Rf5ZoUzgcfqt0qJUiLF3rjt0duOsYPGqNhWr8Sz9oRbzfrGqI+MOzOVnBgk32MJVoSo9aFxg2OTyJfD7q8VZQQ/FDbzgv5gILgi5AIWbcPmJFk9kI1i9CK7QnY22Ml2r8dnYaPNnbn8mIrd3vvAxtQEpUqNwWctLOPA/AewzC/cQOijpYDU9O2ujbqfad+zTiZUm4axsc7DEy8kr1YS2em135ERv2KZRaxnMHZ1RgQEG3fbktR8ACZVceAHq0ATsbiTCV6ErlzPT4ED4BitTwc7L3yXS/geH+uVQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAGsNJI14LRdajbwembuft/ZZeHuj8ILLubhx0yLcsTY0M79rGRuMW7kqd5YMaWsNukIM54l3oLLUu+o3onN+7O7KPdNVeQlp0enO4X9+/Vf3S34i9Af6UCSbgdAbhB4vq5KCQxepUw1cddCiE0hoQhy+cH0G2ljvSTT00Rw4gqGMzzBlRaDs9ipwUloVbBf2JAU8lIiIvv3eE8cgjBj8emJSSz3MWvkNnELd+vTDilV/jwuDzu/iWbBkXxelJfaunNhPt6///QDmiXOGKW0RuOHE4/ABuPOd/R+T7kLROmGChv3TotrCw4HYcH5RDlLV9kLzwlxYsNK+0xT3CXCJDxI=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"54904f8d86f54b1da8c925f4b684c87a"}, [
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
  '63405bb5-8b38-49c2-a9c0-499307107f97',
  'x-ms-request-id',
  '6822980b-10f4-422e-be04-714f359a13b5',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:45:11 GMT',
  'Content-Length',
  '1371'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAuzRkr5DktVJkZvgSW35Y/B+HLLw1FyiyXgbiQ3Ete0DIJPgMF1Rf5ZoUzgcfqt0qJUiLF3rjt0duOsYPGqNhWr8Sz9oRbzfrGqI+MOzOVnBgk32MJVoSo9aFxg2OTyJfD7q8VZQQ/FDbzgv5gILgi5AIWbcPmJFk9kI1i9CK7QnY22Ml2r8dnYaPNnbn8mIrd3vvAxtQEpUqNwWctLOPA/AewzC/cQOijpYDU9O2ujbqfad+zTiZUm4axsc7DEy8kr1YS2em135ERv2KZRaxnMHZ1RgQEG3fbktR8ACZVceAHq0ATsbiTCV6ErlzPT4ED4BitTwc7L3yXS/geH+uVQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAGsNJI14LRdajbwembuft/ZZeHuj8ILLubhx0yLcsTY0M79rGRuMW7kqd5YMaWsNukIM54l3oLLUu+o3onN+7O7KPdNVeQlp0enO4X9+/Vf3S34i9Af6UCSbgdAbhB4vq5KCQxepUw1cddCiE0hoQhy+cH0G2ljvSTT00Rw4gqGMzzBlRaDs9ipwUloVbBf2JAU8lIiIvv3eE8cgjBj8emJSSz3MWvkNnELd+vTDilV/jwuDzu/iWbBkXxelJfaunNhPt6///QDmiXOGKW0RuOHE4/ABuPOd/R+T7kLROmGChv3TotrCw4HYcH5RDlLV9kLzwlxYsNK+0xT3CXCJDxI=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"54904f8d86f54b1da8c925f4b684c87a"}, [
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
  'b9884fa2-fffa-4fb3-8227-6b6b014c173c',
  'x-ms-request-id',
  '476d5b87-097c-4ad3-a6e1-d60874a1d0d3',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:45:13 GMT',
  'Content-Length',
  '1371'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAuzRkr5DktVJkZvgSW35Y/B+HLLw1FyiyXgbiQ3Ete0DIJPgMF1Rf5ZoUzgcfqt0qJUiLF3rjt0duOsYPGqNhWr8Sz9oRbzfrGqI+MOzOVnBgk32MJVoSo9aFxg2OTyJfD7q8VZQQ/FDbzgv5gILgi5AIWbcPmJFk9kI1i9CK7QnY22Ml2r8dnYaPNnbn8mIrd3vvAxtQEpUqNwWctLOPA/AewzC/cQOijpYDU9O2ujbqfad+zTiZUm4axsc7DEy8kr1YS2em135ERv2KZRaxnMHZ1RgQEG3fbktR8ACZVceAHq0ATsbiTCV6ErlzPT4ED4BitTwc7L3yXS/geH+uVQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAGsNJI14LRdajbwembuft/ZZeHuj8ILLubhx0yLcsTY0M79rGRuMW7kqd5YMaWsNukIM54l3oLLUu+o3onN+7O7KPdNVeQlp0enO4X9+/Vf3S34i9Af6UCSbgdAbhB4vq5KCQxepUw1cddCiE0hoQhy+cH0G2ljvSTT00Rw4gqGMzzBlRaDs9ipwUloVbBf2JAU8lIiIvv3eE8cgjBj8emJSSz3MWvkNnELd+vTDilV/jwuDzu/iWbBkXxelJfaunNhPt6///QDmiXOGKW0RuOHE4/ABuPOd/R+T7kLROmGChv3TotrCw4HYcH5RDlLV9kLzwlxYsNK+0xT3CXCJDxI=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"54904f8d86f54b1da8c925f4b684c87a"}, [
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
  '5211b217-879b-4bbf-9734-cc3c90f255d0',
  'x-ms-request-id',
  '6fad3686-dbe3-4771-8fed-99fb16149041',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:45:15 GMT',
  'Content-Length',
  '1371'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAuzRkr5DktVJkZvgSW35Y/B+HLLw1FyiyXgbiQ3Ete0DIJPgMF1Rf5ZoUzgcfqt0qJUiLF3rjt0duOsYPGqNhWr8Sz9oRbzfrGqI+MOzOVnBgk32MJVoSo9aFxg2OTyJfD7q8VZQQ/FDbzgv5gILgi5AIWbcPmJFk9kI1i9CK7QnY22Ml2r8dnYaPNnbn8mIrd3vvAxtQEpUqNwWctLOPA/AewzC/cQOijpYDU9O2ujbqfad+zTiZUm4axsc7DEy8kr1YS2em135ERv2KZRaxnMHZ1RgQEG3fbktR8ACZVceAHq0ATsbiTCV6ErlzPT4ED4BitTwc7L3yXS/geH+uVQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAGsNJI14LRdajbwembuft/ZZeHuj8ILLubhx0yLcsTY0M79rGRuMW7kqd5YMaWsNukIM54l3oLLUu+o3onN+7O7KPdNVeQlp0enO4X9+/Vf3S34i9Af6UCSbgdAbhB4vq5KCQxepUw1cddCiE0hoQhy+cH0G2ljvSTT00Rw4gqGMzzBlRaDs9ipwUloVbBf2JAU8lIiIvv3eE8cgjBj8emJSSz3MWvkNnELd+vTDilV/jwuDzu/iWbBkXxelJfaunNhPt6///QDmiXOGKW0RuOHE4/ABuPOd/R+T7kLROmGChv3TotrCw4HYcH5RDlLV9kLzwlxYsNK+0xT3CXCJDxI=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"54904f8d86f54b1da8c925f4b684c87a"}, [
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
  '73d9fd7f-dd9e-44af-9ffa-6b1fb66afa66',
  'x-ms-request-id',
  '206f8afc-4937-4caa-8a4c-a3605910d747',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:45:17 GMT',
  'Content-Length',
  '1371'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAuzRkr5DktVJkZvgSW35Y/B+HLLw1FyiyXgbiQ3Ete0DIJPgMF1Rf5ZoUzgcfqt0qJUiLF3rjt0duOsYPGqNhWr8Sz9oRbzfrGqI+MOzOVnBgk32MJVoSo9aFxg2OTyJfD7q8VZQQ/FDbzgv5gILgi5AIWbcPmJFk9kI1i9CK7QnY22Ml2r8dnYaPNnbn8mIrd3vvAxtQEpUqNwWctLOPA/AewzC/cQOijpYDU9O2ujbqfad+zTiZUm4axsc7DEy8kr1YS2em135ERv2KZRaxnMHZ1RgQEG3fbktR8ACZVceAHq0ATsbiTCV6ErlzPT4ED4BitTwc7L3yXS/geH+uVQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAGsNJI14LRdajbwembuft/ZZeHuj8ILLubhx0yLcsTY0M79rGRuMW7kqd5YMaWsNukIM54l3oLLUu+o3onN+7O7KPdNVeQlp0enO4X9+/Vf3S34i9Af6UCSbgdAbhB4vq5KCQxepUw1cddCiE0hoQhy+cH0G2ljvSTT00Rw4gqGMzzBlRaDs9ipwUloVbBf2JAU8lIiIvv3eE8cgjBj8emJSSz3MWvkNnELd+vTDilV/jwuDzu/iWbBkXxelJfaunNhPt6///QDmiXOGKW0RuOHE4/ABuPOd/R+T7kLROmGChv3TotrCw4HYcH5RDlLV9kLzwlxYsNK+0xT3CXCJDxI=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"54904f8d86f54b1da8c925f4b684c87a"}, [
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
  '865e2208-327c-489d-b1c1-c85f10869721',
  'x-ms-request-id',
  'b9b3d72b-7534-405b-9325-06ebb6ca5ada',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:45:19 GMT',
  'Content-Length',
  '1371'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAuzRkr5DktVJkZvgSW35Y/B+HLLw1FyiyXgbiQ3Ete0DIJPgMF1Rf5ZoUzgcfqt0qJUiLF3rjt0duOsYPGqNhWr8Sz9oRbzfrGqI+MOzOVnBgk32MJVoSo9aFxg2OTyJfD7q8VZQQ/FDbzgv5gILgi5AIWbcPmJFk9kI1i9CK7QnY22Ml2r8dnYaPNnbn8mIrd3vvAxtQEpUqNwWctLOPA/AewzC/cQOijpYDU9O2ujbqfad+zTiZUm4axsc7DEy8kr1YS2em135ERv2KZRaxnMHZ1RgQEG3fbktR8ACZVceAHq0ATsbiTCV6ErlzPT4ED4BitTwc7L3yXS/geH+uVQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAGsNJI14LRdajbwembuft/ZZeHuj8ILLubhx0yLcsTY0M79rGRuMW7kqd5YMaWsNukIM54l3oLLUu+o3onN+7O7KPdNVeQlp0enO4X9+/Vf3S34i9Af6UCSbgdAbhB4vq5KCQxepUw1cddCiE0hoQhy+cH0G2ljvSTT00Rw4gqGMzzBlRaDs9ipwUloVbBf2JAU8lIiIvv3eE8cgjBj8emJSSz3MWvkNnELd+vTDilV/jwuDzu/iWbBkXxelJfaunNhPt6///QDmiXOGKW0RuOHE4/ABuPOd/R+T7kLROmGChv3TotrCw4HYcH5RDlLV9kLzwlxYsNK+0xT3CXCJDxI=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"54904f8d86f54b1da8c925f4b684c87a"}, [
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
  '20c2e177-ba3d-4396-9505-9cf5cc66d0c2',
  'x-ms-request-id',
  '6b53b5b9-b2e8-48c3-8144-0e1fb4d9e6d0',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:45:21 GMT',
  'Content-Length',
  '1371'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAuzRkr5DktVJkZvgSW35Y/B+HLLw1FyiyXgbiQ3Ete0DIJPgMF1Rf5ZoUzgcfqt0qJUiLF3rjt0duOsYPGqNhWr8Sz9oRbzfrGqI+MOzOVnBgk32MJVoSo9aFxg2OTyJfD7q8VZQQ/FDbzgv5gILgi5AIWbcPmJFk9kI1i9CK7QnY22Ml2r8dnYaPNnbn8mIrd3vvAxtQEpUqNwWctLOPA/AewzC/cQOijpYDU9O2ujbqfad+zTiZUm4axsc7DEy8kr1YS2em135ERv2KZRaxnMHZ1RgQEG3fbktR8ACZVceAHq0ATsbiTCV6ErlzPT4ED4BitTwc7L3yXS/geH+uVQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAGsNJI14LRdajbwembuft/ZZeHuj8ILLubhx0yLcsTY0M79rGRuMW7kqd5YMaWsNukIM54l3oLLUu+o3onN+7O7KPdNVeQlp0enO4X9+/Vf3S34i9Af6UCSbgdAbhB4vq5KCQxepUw1cddCiE0hoQhy+cH0G2ljvSTT00Rw4gqGMzzBlRaDs9ipwUloVbBf2JAU8lIiIvv3eE8cgjBj8emJSSz3MWvkNnELd+vTDilV/jwuDzu/iWbBkXxelJfaunNhPt6///QDmiXOGKW0RuOHE4/ABuPOd/R+T7kLROmGChv3TotrCw4HYcH5RDlLV9kLzwlxYsNK+0xT3CXCJDxI=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"54904f8d86f54b1da8c925f4b684c87a"}, [
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
  '2b30b150-445b-4d1a-8820-077d73b98962',
  'x-ms-request-id',
  '0d449cfa-79f9-4ead-8d67-efc748650119',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:45:24 GMT',
  'Content-Length',
  '1371'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAuzRkr5DktVJkZvgSW35Y/B+HLLw1FyiyXgbiQ3Ete0DIJPgMF1Rf5ZoUzgcfqt0qJUiLF3rjt0duOsYPGqNhWr8Sz9oRbzfrGqI+MOzOVnBgk32MJVoSo9aFxg2OTyJfD7q8VZQQ/FDbzgv5gILgi5AIWbcPmJFk9kI1i9CK7QnY22Ml2r8dnYaPNnbn8mIrd3vvAxtQEpUqNwWctLOPA/AewzC/cQOijpYDU9O2ujbqfad+zTiZUm4axsc7DEy8kr1YS2em135ERv2KZRaxnMHZ1RgQEG3fbktR8ACZVceAHq0ATsbiTCV6ErlzPT4ED4BitTwc7L3yXS/geH+uVQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAGsNJI14LRdajbwembuft/ZZeHuj8ILLubhx0yLcsTY0M79rGRuMW7kqd5YMaWsNukIM54l3oLLUu+o3onN+7O7KPdNVeQlp0enO4X9+/Vf3S34i9Af6UCSbgdAbhB4vq5KCQxepUw1cddCiE0hoQhy+cH0G2ljvSTT00Rw4gqGMzzBlRaDs9ipwUloVbBf2JAU8lIiIvv3eE8cgjBj8emJSSz3MWvkNnELd+vTDilV/jwuDzu/iWbBkXxelJfaunNhPt6///QDmiXOGKW0RuOHE4/ABuPOd/R+T7kLROmGChv3TotrCw4HYcH5RDlLV9kLzwlxYsNK+0xT3CXCJDxI=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"54904f8d86f54b1da8c925f4b684c87a"}, [
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
  '9f97ebf2-24b5-4f8e-9f10-b419be010634',
  'x-ms-request-id',
  '2cf21348-9caf-44df-9f7b-9b12d9cf5e33',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:45:26 GMT',
  'Content-Length',
  '1371'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAuzRkr5DktVJkZvgSW35Y/B+HLLw1FyiyXgbiQ3Ete0DIJPgMF1Rf5ZoUzgcfqt0qJUiLF3rjt0duOsYPGqNhWr8Sz9oRbzfrGqI+MOzOVnBgk32MJVoSo9aFxg2OTyJfD7q8VZQQ/FDbzgv5gILgi5AIWbcPmJFk9kI1i9CK7QnY22Ml2r8dnYaPNnbn8mIrd3vvAxtQEpUqNwWctLOPA/AewzC/cQOijpYDU9O2ujbqfad+zTiZUm4axsc7DEy8kr1YS2em135ERv2KZRaxnMHZ1RgQEG3fbktR8ACZVceAHq0ATsbiTCV6ErlzPT4ED4BitTwc7L3yXS/geH+uVQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAGsNJI14LRdajbwembuft/ZZeHuj8ILLubhx0yLcsTY0M79rGRuMW7kqd5YMaWsNukIM54l3oLLUu+o3onN+7O7KPdNVeQlp0enO4X9+/Vf3S34i9Af6UCSbgdAbhB4vq5KCQxepUw1cddCiE0hoQhy+cH0G2ljvSTT00Rw4gqGMzzBlRaDs9ipwUloVbBf2JAU8lIiIvv3eE8cgjBj8emJSSz3MWvkNnELd+vTDilV/jwuDzu/iWbBkXxelJfaunNhPt6///QDmiXOGKW0RuOHE4/ABuPOd/R+T7kLROmGChv3TotrCw4HYcH5RDlLV9kLzwlxYsNK+0xT3CXCJDxI=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"54904f8d86f54b1da8c925f4b684c87a"}, [
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
  '2303673a-4227-472c-964b-68d37633b350',
  'x-ms-request-id',
  '9461f50c-c3a3-4b7e-850e-4372d5c7fdb0',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:45:27 GMT',
  'Content-Length',
  '1371'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAuzRkr5DktVJkZvgSW35Y/B+HLLw1FyiyXgbiQ3Ete0DIJPgMF1Rf5ZoUzgcfqt0qJUiLF3rjt0duOsYPGqNhWr8Sz9oRbzfrGqI+MOzOVnBgk32MJVoSo9aFxg2OTyJfD7q8VZQQ/FDbzgv5gILgi5AIWbcPmJFk9kI1i9CK7QnY22Ml2r8dnYaPNnbn8mIrd3vvAxtQEpUqNwWctLOPA/AewzC/cQOijpYDU9O2ujbqfad+zTiZUm4axsc7DEy8kr1YS2em135ERv2KZRaxnMHZ1RgQEG3fbktR8ACZVceAHq0ATsbiTCV6ErlzPT4ED4BitTwc7L3yXS/geH+uVQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAGsNJI14LRdajbwembuft/ZZeHuj8ILLubhx0yLcsTY0M79rGRuMW7kqd5YMaWsNukIM54l3oLLUu+o3onN+7O7KPdNVeQlp0enO4X9+/Vf3S34i9Af6UCSbgdAbhB4vq5KCQxepUw1cddCiE0hoQhy+cH0G2ljvSTT00Rw4gqGMzzBlRaDs9ipwUloVbBf2JAU8lIiIvv3eE8cgjBj8emJSSz3MWvkNnELd+vTDilV/jwuDzu/iWbBkXxelJfaunNhPt6///QDmiXOGKW0RuOHE4/ABuPOd/R+T7kLROmGChv3TotrCw4HYcH5RDlLV9kLzwlxYsNK+0xT3CXCJDxI=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"54904f8d86f54b1da8c925f4b684c87a"}, [
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
  'c6f63f50-b8b2-4b00-bed1-ca78fa5178c7',
  'x-ms-request-id',
  '1906b266-6c38-4b8b-b2b1-d3286d644973',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:45:30 GMT',
  'Content-Length',
  '1371'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAuzRkr5DktVJkZvgSW35Y/B+HLLw1FyiyXgbiQ3Ete0DIJPgMF1Rf5ZoUzgcfqt0qJUiLF3rjt0duOsYPGqNhWr8Sz9oRbzfrGqI+MOzOVnBgk32MJVoSo9aFxg2OTyJfD7q8VZQQ/FDbzgv5gILgi5AIWbcPmJFk9kI1i9CK7QnY22Ml2r8dnYaPNnbn8mIrd3vvAxtQEpUqNwWctLOPA/AewzC/cQOijpYDU9O2ujbqfad+zTiZUm4axsc7DEy8kr1YS2em135ERv2KZRaxnMHZ1RgQEG3fbktR8ACZVceAHq0ATsbiTCV6ErlzPT4ED4BitTwc7L3yXS/geH+uVQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAGsNJI14LRdajbwembuft/ZZeHuj8ILLubhx0yLcsTY0M79rGRuMW7kqd5YMaWsNukIM54l3oLLUu+o3onN+7O7KPdNVeQlp0enO4X9+/Vf3S34i9Af6UCSbgdAbhB4vq5KCQxepUw1cddCiE0hoQhy+cH0G2ljvSTT00Rw4gqGMzzBlRaDs9ipwUloVbBf2JAU8lIiIvv3eE8cgjBj8emJSSz3MWvkNnELd+vTDilV/jwuDzu/iWbBkXxelJfaunNhPt6///QDmiXOGKW0RuOHE4/ABuPOd/R+T7kLROmGChv3TotrCw4HYcH5RDlLV9kLzwlxYsNK+0xT3CXCJDxI=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"54904f8d86f54b1da8c925f4b684c87a"}, [
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
  'e5fec780-2ca3-45c0-af6b-18ce3225bdd0',
  'x-ms-request-id',
  '1ac1aa87-8b26-421d-8a23-a6c569c676de',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:45:31 GMT',
  'Content-Length',
  '1371'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAuzRkr5DktVJkZvgSW35Y/B+HLLw1FyiyXgbiQ3Ete0DIJPgMF1Rf5ZoUzgcfqt0qJUiLF3rjt0duOsYPGqNhWr8Sz9oRbzfrGqI+MOzOVnBgk32MJVoSo9aFxg2OTyJfD7q8VZQQ/FDbzgv5gILgi5AIWbcPmJFk9kI1i9CK7QnY22Ml2r8dnYaPNnbn8mIrd3vvAxtQEpUqNwWctLOPA/AewzC/cQOijpYDU9O2ujbqfad+zTiZUm4axsc7DEy8kr1YS2em135ERv2KZRaxnMHZ1RgQEG3fbktR8ACZVceAHq0ATsbiTCV6ErlzPT4ED4BitTwc7L3yXS/geH+uVQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAGsNJI14LRdajbwembuft/ZZeHuj8ILLubhx0yLcsTY0M79rGRuMW7kqd5YMaWsNukIM54l3oLLUu+o3onN+7O7KPdNVeQlp0enO4X9+/Vf3S34i9Af6UCSbgdAbhB4vq5KCQxepUw1cddCiE0hoQhy+cH0G2ljvSTT00Rw4gqGMzzBlRaDs9ipwUloVbBf2JAU8lIiIvv3eE8cgjBj8emJSSz3MWvkNnELd+vTDilV/jwuDzu/iWbBkXxelJfaunNhPt6///QDmiXOGKW0RuOHE4/ABuPOd/R+T7kLROmGChv3TotrCw4HYcH5RDlLV9kLzwlxYsNK+0xT3CXCJDxI=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"54904f8d86f54b1da8c925f4b684c87a"}, [
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
  '68fb7a18-9247-4f49-8eb8-0ed528453274',
  'x-ms-request-id',
  'bf998293-d8df-4141-948d-f72d405c2605',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:45:33 GMT',
  'Content-Length',
  '1371'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAuzRkr5DktVJkZvgSW35Y/B+HLLw1FyiyXgbiQ3Ete0DIJPgMF1Rf5ZoUzgcfqt0qJUiLF3rjt0duOsYPGqNhWr8Sz9oRbzfrGqI+MOzOVnBgk32MJVoSo9aFxg2OTyJfD7q8VZQQ/FDbzgv5gILgi5AIWbcPmJFk9kI1i9CK7QnY22Ml2r8dnYaPNnbn8mIrd3vvAxtQEpUqNwWctLOPA/AewzC/cQOijpYDU9O2ujbqfad+zTiZUm4axsc7DEy8kr1YS2em135ERv2KZRaxnMHZ1RgQEG3fbktR8ACZVceAHq0ATsbiTCV6ErlzPT4ED4BitTwc7L3yXS/geH+uVQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAGsNJI14LRdajbwembuft/ZZeHuj8ILLubhx0yLcsTY0M79rGRuMW7kqd5YMaWsNukIM54l3oLLUu+o3onN+7O7KPdNVeQlp0enO4X9+/Vf3S34i9Af6UCSbgdAbhB4vq5KCQxepUw1cddCiE0hoQhy+cH0G2ljvSTT00Rw4gqGMzzBlRaDs9ipwUloVbBf2JAU8lIiIvv3eE8cgjBj8emJSSz3MWvkNnELd+vTDilV/jwuDzu/iWbBkXxelJfaunNhPt6///QDmiXOGKW0RuOHE4/ABuPOd/R+T7kLROmGChv3TotrCw4HYcH5RDlLV9kLzwlxYsNK+0xT3CXCJDxI=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"54904f8d86f54b1da8c925f4b684c87a"}, [
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
  '5cf2c3ba-b7b3-4375-b1bf-2370625065c4',
  'x-ms-request-id',
  '2703e183-99ec-4eb6-a99f-aa49f18bb94a',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:45:36 GMT',
  'Content-Length',
  '1371'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAuzRkr5DktVJkZvgSW35Y/B+HLLw1FyiyXgbiQ3Ete0DIJPgMF1Rf5ZoUzgcfqt0qJUiLF3rjt0duOsYPGqNhWr8Sz9oRbzfrGqI+MOzOVnBgk32MJVoSo9aFxg2OTyJfD7q8VZQQ/FDbzgv5gILgi5AIWbcPmJFk9kI1i9CK7QnY22Ml2r8dnYaPNnbn8mIrd3vvAxtQEpUqNwWctLOPA/AewzC/cQOijpYDU9O2ujbqfad+zTiZUm4axsc7DEy8kr1YS2em135ERv2KZRaxnMHZ1RgQEG3fbktR8ACZVceAHq0ATsbiTCV6ErlzPT4ED4BitTwc7L3yXS/geH+uVQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAGsNJI14LRdajbwembuft/ZZeHuj8ILLubhx0yLcsTY0M79rGRuMW7kqd5YMaWsNukIM54l3oLLUu+o3onN+7O7KPdNVeQlp0enO4X9+/Vf3S34i9Af6UCSbgdAbhB4vq5KCQxepUw1cddCiE0hoQhy+cH0G2ljvSTT00Rw4gqGMzzBlRaDs9ipwUloVbBf2JAU8lIiIvv3eE8cgjBj8emJSSz3MWvkNnELd+vTDilV/jwuDzu/iWbBkXxelJfaunNhPt6///QDmiXOGKW0RuOHE4/ABuPOd/R+T7kLROmGChv3TotrCw4HYcH5RDlLV9kLzwlxYsNK+0xT3CXCJDxI=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"54904f8d86f54b1da8c925f4b684c87a"}, [
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
  '8d3f0d6f-d0e8-4195-b3a1-defadd20c4e6',
  'x-ms-request-id',
  '9e515cfb-383e-4d89-bcf6-b5438e9ce362',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:45:38 GMT',
  'Content-Length',
  '1371'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAuzRkr5DktVJkZvgSW35Y/B+HLLw1FyiyXgbiQ3Ete0DIJPgMF1Rf5ZoUzgcfqt0qJUiLF3rjt0duOsYPGqNhWr8Sz9oRbzfrGqI+MOzOVnBgk32MJVoSo9aFxg2OTyJfD7q8VZQQ/FDbzgv5gILgi5AIWbcPmJFk9kI1i9CK7QnY22Ml2r8dnYaPNnbn8mIrd3vvAxtQEpUqNwWctLOPA/AewzC/cQOijpYDU9O2ujbqfad+zTiZUm4axsc7DEy8kr1YS2em135ERv2KZRaxnMHZ1RgQEG3fbktR8ACZVceAHq0ATsbiTCV6ErlzPT4ED4BitTwc7L3yXS/geH+uVQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAGsNJI14LRdajbwembuft/ZZeHuj8ILLubhx0yLcsTY0M79rGRuMW7kqd5YMaWsNukIM54l3oLLUu+o3onN+7O7KPdNVeQlp0enO4X9+/Vf3S34i9Af6UCSbgdAbhB4vq5KCQxepUw1cddCiE0hoQhy+cH0G2ljvSTT00Rw4gqGMzzBlRaDs9ipwUloVbBf2JAU8lIiIvv3eE8cgjBj8emJSSz3MWvkNnELd+vTDilV/jwuDzu/iWbBkXxelJfaunNhPt6///QDmiXOGKW0RuOHE4/ABuPOd/R+T7kLROmGChv3TotrCw4HYcH5RDlLV9kLzwlxYsNK+0xT3CXCJDxI=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"54904f8d86f54b1da8c925f4b684c87a"}, [
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
  '8c10044e-c7e0-46c7-840b-2345472cb426',
  'x-ms-request-id',
  '2639f93e-eac4-4de2-976e-f37fe093fd9b',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:45:40 GMT',
  'Content-Length',
  '1371'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAuzRkr5DktVJkZvgSW35Y/B+HLLw1FyiyXgbiQ3Ete0DIJPgMF1Rf5ZoUzgcfqt0qJUiLF3rjt0duOsYPGqNhWr8Sz9oRbzfrGqI+MOzOVnBgk32MJVoSo9aFxg2OTyJfD7q8VZQQ/FDbzgv5gILgi5AIWbcPmJFk9kI1i9CK7QnY22Ml2r8dnYaPNnbn8mIrd3vvAxtQEpUqNwWctLOPA/AewzC/cQOijpYDU9O2ujbqfad+zTiZUm4axsc7DEy8kr1YS2em135ERv2KZRaxnMHZ1RgQEG3fbktR8ACZVceAHq0ATsbiTCV6ErlzPT4ED4BitTwc7L3yXS/geH+uVQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAGsNJI14LRdajbwembuft/ZZeHuj8ILLubhx0yLcsTY0M79rGRuMW7kqd5YMaWsNukIM54l3oLLUu+o3onN+7O7KPdNVeQlp0enO4X9+/Vf3S34i9Af6UCSbgdAbhB4vq5KCQxepUw1cddCiE0hoQhy+cH0G2ljvSTT00Rw4gqGMzzBlRaDs9ipwUloVbBf2JAU8lIiIvv3eE8cgjBj8emJSSz3MWvkNnELd+vTDilV/jwuDzu/iWbBkXxelJfaunNhPt6///QDmiXOGKW0RuOHE4/ABuPOd/R+T7kLROmGChv3TotrCw4HYcH5RDlLV9kLzwlxYsNK+0xT3CXCJDxI=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"54904f8d86f54b1da8c925f4b684c87a"}, [
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
  '88b85a4b-b913-48bd-9d3f-9a138c124d8e',
  'x-ms-request-id',
  'adfa6977-1fd1-4daf-9a53-7c6e3b7a918b',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:45:42 GMT',
  'Content-Length',
  '1371'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAuzRkr5DktVJkZvgSW35Y/B+HLLw1FyiyXgbiQ3Ete0DIJPgMF1Rf5ZoUzgcfqt0qJUiLF3rjt0duOsYPGqNhWr8Sz9oRbzfrGqI+MOzOVnBgk32MJVoSo9aFxg2OTyJfD7q8VZQQ/FDbzgv5gILgi5AIWbcPmJFk9kI1i9CK7QnY22Ml2r8dnYaPNnbn8mIrd3vvAxtQEpUqNwWctLOPA/AewzC/cQOijpYDU9O2ujbqfad+zTiZUm4axsc7DEy8kr1YS2em135ERv2KZRaxnMHZ1RgQEG3fbktR8ACZVceAHq0ATsbiTCV6ErlzPT4ED4BitTwc7L3yXS/geH+uVQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAGsNJI14LRdajbwembuft/ZZeHuj8ILLubhx0yLcsTY0M79rGRuMW7kqd5YMaWsNukIM54l3oLLUu+o3onN+7O7KPdNVeQlp0enO4X9+/Vf3S34i9Af6UCSbgdAbhB4vq5KCQxepUw1cddCiE0hoQhy+cH0G2ljvSTT00Rw4gqGMzzBlRaDs9ipwUloVbBf2JAU8lIiIvv3eE8cgjBj8emJSSz3MWvkNnELd+vTDilV/jwuDzu/iWbBkXxelJfaunNhPt6///QDmiXOGKW0RuOHE4/ABuPOd/R+T7kLROmGChv3TotrCw4HYcH5RDlLV9kLzwlxYsNK+0xT3CXCJDxI=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"54904f8d86f54b1da8c925f4b684c87a"}, [
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
  '94650228-ddf7-47e2-aff6-1c1be5f17d43',
  'x-ms-request-id',
  'd238ebc0-e01e-4e4b-95d3-8711482d6ab2',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:45:44 GMT',
  'Content-Length',
  '1371'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAuzRkr5DktVJkZvgSW35Y/B+HLLw1FyiyXgbiQ3Ete0DIJPgMF1Rf5ZoUzgcfqt0qJUiLF3rjt0duOsYPGqNhWr8Sz9oRbzfrGqI+MOzOVnBgk32MJVoSo9aFxg2OTyJfD7q8VZQQ/FDbzgv5gILgi5AIWbcPmJFk9kI1i9CK7QnY22Ml2r8dnYaPNnbn8mIrd3vvAxtQEpUqNwWctLOPA/AewzC/cQOijpYDU9O2ujbqfad+zTiZUm4axsc7DEy8kr1YS2em135ERv2KZRaxnMHZ1RgQEG3fbktR8ACZVceAHq0ATsbiTCV6ErlzPT4ED4BitTwc7L3yXS/geH+uVQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAGsNJI14LRdajbwembuft/ZZeHuj8ILLubhx0yLcsTY0M79rGRuMW7kqd5YMaWsNukIM54l3oLLUu+o3onN+7O7KPdNVeQlp0enO4X9+/Vf3S34i9Af6UCSbgdAbhB4vq5KCQxepUw1cddCiE0hoQhy+cH0G2ljvSTT00Rw4gqGMzzBlRaDs9ipwUloVbBf2JAU8lIiIvv3eE8cgjBj8emJSSz3MWvkNnELd+vTDilV/jwuDzu/iWbBkXxelJfaunNhPt6///QDmiXOGKW0RuOHE4/ABuPOd/R+T7kLROmGChv3TotrCw4HYcH5RDlLV9kLzwlxYsNK+0xT3CXCJDxI=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"54904f8d86f54b1da8c925f4b684c87a"}, [
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
  '53f875fa-4a76-42c0-8968-6b1442593cfd',
  'x-ms-request-id',
  '9a77e8bb-e1ee-4307-813a-ba9000a109e0',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:45:46 GMT',
  'Content-Length',
  '1371'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAuzRkr5DktVJkZvgSW35Y/B+HLLw1FyiyXgbiQ3Ete0DIJPgMF1Rf5ZoUzgcfqt0qJUiLF3rjt0duOsYPGqNhWr8Sz9oRbzfrGqI+MOzOVnBgk32MJVoSo9aFxg2OTyJfD7q8VZQQ/FDbzgv5gILgi5AIWbcPmJFk9kI1i9CK7QnY22Ml2r8dnYaPNnbn8mIrd3vvAxtQEpUqNwWctLOPA/AewzC/cQOijpYDU9O2ujbqfad+zTiZUm4axsc7DEy8kr1YS2em135ERv2KZRaxnMHZ1RgQEG3fbktR8ACZVceAHq0ATsbiTCV6ErlzPT4ED4BitTwc7L3yXS/geH+uVQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAGsNJI14LRdajbwembuft/ZZeHuj8ILLubhx0yLcsTY0M79rGRuMW7kqd5YMaWsNukIM54l3oLLUu+o3onN+7O7KPdNVeQlp0enO4X9+/Vf3S34i9Af6UCSbgdAbhB4vq5KCQxepUw1cddCiE0hoQhy+cH0G2ljvSTT00Rw4gqGMzzBlRaDs9ipwUloVbBf2JAU8lIiIvv3eE8cgjBj8emJSSz3MWvkNnELd+vTDilV/jwuDzu/iWbBkXxelJfaunNhPt6///QDmiXOGKW0RuOHE4/ABuPOd/R+T7kLROmGChv3TotrCw4HYcH5RDlLV9kLzwlxYsNK+0xT3CXCJDxI=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"54904f8d86f54b1da8c925f4b684c87a"}, [
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
  '27a91656-7df2-4b96-a3bc-3a3ee899f6c4',
  'x-ms-request-id',
  'a4db32c9-fef9-4c40-9bde-36c4ee4fb17a',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:45:48 GMT',
  'Content-Length',
  '1371'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAuzRkr5DktVJkZvgSW35Y/B+HLLw1FyiyXgbiQ3Ete0DIJPgMF1Rf5ZoUzgcfqt0qJUiLF3rjt0duOsYPGqNhWr8Sz9oRbzfrGqI+MOzOVnBgk32MJVoSo9aFxg2OTyJfD7q8VZQQ/FDbzgv5gILgi5AIWbcPmJFk9kI1i9CK7QnY22Ml2r8dnYaPNnbn8mIrd3vvAxtQEpUqNwWctLOPA/AewzC/cQOijpYDU9O2ujbqfad+zTiZUm4axsc7DEy8kr1YS2em135ERv2KZRaxnMHZ1RgQEG3fbktR8ACZVceAHq0ATsbiTCV6ErlzPT4ED4BitTwc7L3yXS/geH+uVQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAGsNJI14LRdajbwembuft/ZZeHuj8ILLubhx0yLcsTY0M79rGRuMW7kqd5YMaWsNukIM54l3oLLUu+o3onN+7O7KPdNVeQlp0enO4X9+/Vf3S34i9Af6UCSbgdAbhB4vq5KCQxepUw1cddCiE0hoQhy+cH0G2ljvSTT00Rw4gqGMzzBlRaDs9ipwUloVbBf2JAU8lIiIvv3eE8cgjBj8emJSSz3MWvkNnELd+vTDilV/jwuDzu/iWbBkXxelJfaunNhPt6///QDmiXOGKW0RuOHE4/ABuPOd/R+T7kLROmGChv3TotrCw4HYcH5RDlLV9kLzwlxYsNK+0xT3CXCJDxI=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"54904f8d86f54b1da8c925f4b684c87a"}, [
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
  '1bf9131c-9eeb-4054-9b79-54a5260db829',
  'x-ms-request-id',
  'e5a44418-c4b1-44b6-b16d-cf9d7897e3d9',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:45:51 GMT',
  'Content-Length',
  '1371'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAuzRkr5DktVJkZvgSW35Y/B+HLLw1FyiyXgbiQ3Ete0DIJPgMF1Rf5ZoUzgcfqt0qJUiLF3rjt0duOsYPGqNhWr8Sz9oRbzfrGqI+MOzOVnBgk32MJVoSo9aFxg2OTyJfD7q8VZQQ/FDbzgv5gILgi5AIWbcPmJFk9kI1i9CK7QnY22Ml2r8dnYaPNnbn8mIrd3vvAxtQEpUqNwWctLOPA/AewzC/cQOijpYDU9O2ujbqfad+zTiZUm4axsc7DEy8kr1YS2em135ERv2KZRaxnMHZ1RgQEG3fbktR8ACZVceAHq0ATsbiTCV6ErlzPT4ED4BitTwc7L3yXS/geH+uVQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAGsNJI14LRdajbwembuft/ZZeHuj8ILLubhx0yLcsTY0M79rGRuMW7kqd5YMaWsNukIM54l3oLLUu+o3onN+7O7KPdNVeQlp0enO4X9+/Vf3S34i9Af6UCSbgdAbhB4vq5KCQxepUw1cddCiE0hoQhy+cH0G2ljvSTT00Rw4gqGMzzBlRaDs9ipwUloVbBf2JAU8lIiIvv3eE8cgjBj8emJSSz3MWvkNnELd+vTDilV/jwuDzu/iWbBkXxelJfaunNhPt6///QDmiXOGKW0RuOHE4/ABuPOd/R+T7kLROmGChv3TotrCw4HYcH5RDlLV9kLzwlxYsNK+0xT3CXCJDxI=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"54904f8d86f54b1da8c925f4b684c87a"}, [
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
  'bfb65166-380e-49a0-8c6c-c46f2167ad06',
  'x-ms-request-id',
  '66f65ed6-63ac-4fc5-81c8-854e006e0481',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:45:53 GMT',
  'Content-Length',
  '1371'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAuzRkr5DktVJkZvgSW35Y/B+HLLw1FyiyXgbiQ3Ete0DIJPgMF1Rf5ZoUzgcfqt0qJUiLF3rjt0duOsYPGqNhWr8Sz9oRbzfrGqI+MOzOVnBgk32MJVoSo9aFxg2OTyJfD7q8VZQQ/FDbzgv5gILgi5AIWbcPmJFk9kI1i9CK7QnY22Ml2r8dnYaPNnbn8mIrd3vvAxtQEpUqNwWctLOPA/AewzC/cQOijpYDU9O2ujbqfad+zTiZUm4axsc7DEy8kr1YS2em135ERv2KZRaxnMHZ1RgQEG3fbktR8ACZVceAHq0ATsbiTCV6ErlzPT4ED4BitTwc7L3yXS/geH+uVQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAGsNJI14LRdajbwembuft/ZZeHuj8ILLubhx0yLcsTY0M79rGRuMW7kqd5YMaWsNukIM54l3oLLUu+o3onN+7O7KPdNVeQlp0enO4X9+/Vf3S34i9Af6UCSbgdAbhB4vq5KCQxepUw1cddCiE0hoQhy+cH0G2ljvSTT00Rw4gqGMzzBlRaDs9ipwUloVbBf2JAU8lIiIvv3eE8cgjBj8emJSSz3MWvkNnELd+vTDilV/jwuDzu/iWbBkXxelJfaunNhPt6///QDmiXOGKW0RuOHE4/ABuPOd/R+T7kLROmGChv3TotrCw4HYcH5RDlLV9kLzwlxYsNK+0xT3CXCJDxI=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"54904f8d86f54b1da8c925f4b684c87a"}, [
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
  'c2ed9ff0-1ae0-4a4e-8142-3db13eca7208',
  'x-ms-request-id',
  '37e104a2-53dc-48b0-b113-ed14a25547d2',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:45:55 GMT',
  'Content-Length',
  '1371'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAuzRkr5DktVJkZvgSW35Y/B+HLLw1FyiyXgbiQ3Ete0DIJPgMF1Rf5ZoUzgcfqt0qJUiLF3rjt0duOsYPGqNhWr8Sz9oRbzfrGqI+MOzOVnBgk32MJVoSo9aFxg2OTyJfD7q8VZQQ/FDbzgv5gILgi5AIWbcPmJFk9kI1i9CK7QnY22Ml2r8dnYaPNnbn8mIrd3vvAxtQEpUqNwWctLOPA/AewzC/cQOijpYDU9O2ujbqfad+zTiZUm4axsc7DEy8kr1YS2em135ERv2KZRaxnMHZ1RgQEG3fbktR8ACZVceAHq0ATsbiTCV6ErlzPT4ED4BitTwc7L3yXS/geH+uVQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAGsNJI14LRdajbwembuft/ZZeHuj8ILLubhx0yLcsTY0M79rGRuMW7kqd5YMaWsNukIM54l3oLLUu+o3onN+7O7KPdNVeQlp0enO4X9+/Vf3S34i9Af6UCSbgdAbhB4vq5KCQxepUw1cddCiE0hoQhy+cH0G2ljvSTT00Rw4gqGMzzBlRaDs9ipwUloVbBf2JAU8lIiIvv3eE8cgjBj8emJSSz3MWvkNnELd+vTDilV/jwuDzu/iWbBkXxelJfaunNhPt6///QDmiXOGKW0RuOHE4/ABuPOd/R+T7kLROmGChv3TotrCw4HYcH5RDlLV9kLzwlxYsNK+0xT3CXCJDxI=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"54904f8d86f54b1da8c925f4b684c87a"}, [
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
  '34277e34-9057-4e0d-a579-8631740561d6',
  'x-ms-request-id',
  '5a71f6e7-5078-4eb0-88ff-50457088b4d9',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:45:57 GMT',
  'Content-Length',
  '1371'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAuzRkr5DktVJkZvgSW35Y/B+HLLw1FyiyXgbiQ3Ete0DIJPgMF1Rf5ZoUzgcfqt0qJUiLF3rjt0duOsYPGqNhWr8Sz9oRbzfrGqI+MOzOVnBgk32MJVoSo9aFxg2OTyJfD7q8VZQQ/FDbzgv5gILgi5AIWbcPmJFk9kI1i9CK7QnY22Ml2r8dnYaPNnbn8mIrd3vvAxtQEpUqNwWctLOPA/AewzC/cQOijpYDU9O2ujbqfad+zTiZUm4axsc7DEy8kr1YS2em135ERv2KZRaxnMHZ1RgQEG3fbktR8ACZVceAHq0ATsbiTCV6ErlzPT4ED4BitTwc7L3yXS/geH+uVQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAGsNJI14LRdajbwembuft/ZZeHuj8ILLubhx0yLcsTY0M79rGRuMW7kqd5YMaWsNukIM54l3oLLUu+o3onN+7O7KPdNVeQlp0enO4X9+/Vf3S34i9Af6UCSbgdAbhB4vq5KCQxepUw1cddCiE0hoQhy+cH0G2ljvSTT00Rw4gqGMzzBlRaDs9ipwUloVbBf2JAU8lIiIvv3eE8cgjBj8emJSSz3MWvkNnELd+vTDilV/jwuDzu/iWbBkXxelJfaunNhPt6///QDmiXOGKW0RuOHE4/ABuPOd/R+T7kLROmGChv3TotrCw4HYcH5RDlLV9kLzwlxYsNK+0xT3CXCJDxI=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"54904f8d86f54b1da8c925f4b684c87a"}, [
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
  '7606b423-3569-4c8f-8c27-ec72eed6bef0',
  'x-ms-request-id',
  '24f788a3-148c-48ca-bf32-3af7a30b1f74',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:45:59 GMT',
  'Content-Length',
  '1371'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAuzRkr5DktVJkZvgSW35Y/B+HLLw1FyiyXgbiQ3Ete0DIJPgMF1Rf5ZoUzgcfqt0qJUiLF3rjt0duOsYPGqNhWr8Sz9oRbzfrGqI+MOzOVnBgk32MJVoSo9aFxg2OTyJfD7q8VZQQ/FDbzgv5gILgi5AIWbcPmJFk9kI1i9CK7QnY22Ml2r8dnYaPNnbn8mIrd3vvAxtQEpUqNwWctLOPA/AewzC/cQOijpYDU9O2ujbqfad+zTiZUm4axsc7DEy8kr1YS2em135ERv2KZRaxnMHZ1RgQEG3fbktR8ACZVceAHq0ATsbiTCV6ErlzPT4ED4BitTwc7L3yXS/geH+uVQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAGsNJI14LRdajbwembuft/ZZeHuj8ILLubhx0yLcsTY0M79rGRuMW7kqd5YMaWsNukIM54l3oLLUu+o3onN+7O7KPdNVeQlp0enO4X9+/Vf3S34i9Af6UCSbgdAbhB4vq5KCQxepUw1cddCiE0hoQhy+cH0G2ljvSTT00Rw4gqGMzzBlRaDs9ipwUloVbBf2JAU8lIiIvv3eE8cgjBj8emJSSz3MWvkNnELd+vTDilV/jwuDzu/iWbBkXxelJfaunNhPt6///QDmiXOGKW0RuOHE4/ABuPOd/R+T7kLROmGChv3TotrCw4HYcH5RDlLV9kLzwlxYsNK+0xT3CXCJDxI=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"54904f8d86f54b1da8c925f4b684c87a"}, [
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
  'a859bdac-50cf-40ba-8691-2bbfc3f6f443',
  'x-ms-request-id',
  'd5978501-2cfc-421b-bdb4-20f20cd72d59',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:46:01 GMT',
  'Content-Length',
  '1371'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAuzRkr5DktVJkZvgSW35Y/B+HLLw1FyiyXgbiQ3Ete0DIJPgMF1Rf5ZoUzgcfqt0qJUiLF3rjt0duOsYPGqNhWr8Sz9oRbzfrGqI+MOzOVnBgk32MJVoSo9aFxg2OTyJfD7q8VZQQ/FDbzgv5gILgi5AIWbcPmJFk9kI1i9CK7QnY22Ml2r8dnYaPNnbn8mIrd3vvAxtQEpUqNwWctLOPA/AewzC/cQOijpYDU9O2ujbqfad+zTiZUm4axsc7DEy8kr1YS2em135ERv2KZRaxnMHZ1RgQEG3fbktR8ACZVceAHq0ATsbiTCV6ErlzPT4ED4BitTwc7L3yXS/geH+uVQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAGsNJI14LRdajbwembuft/ZZeHuj8ILLubhx0yLcsTY0M79rGRuMW7kqd5YMaWsNukIM54l3oLLUu+o3onN+7O7KPdNVeQlp0enO4X9+/Vf3S34i9Af6UCSbgdAbhB4vq5KCQxepUw1cddCiE0hoQhy+cH0G2ljvSTT00Rw4gqGMzzBlRaDs9ipwUloVbBf2JAU8lIiIvv3eE8cgjBj8emJSSz3MWvkNnELd+vTDilV/jwuDzu/iWbBkXxelJfaunNhPt6///QDmiXOGKW0RuOHE4/ABuPOd/R+T7kLROmGChv3TotrCw4HYcH5RDlLV9kLzwlxYsNK+0xT3CXCJDxI=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"54904f8d86f54b1da8c925f4b684c87a"}, [
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
  'c07c3b85-62df-402f-8ed1-84f8e35d71eb',
  'x-ms-request-id',
  '0348f75b-dc4c-43dc-9141-bc44a2adcfe6',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:46:03 GMT',
  'Content-Length',
  '1371'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAuzRkr5DktVJkZvgSW35Y/B+HLLw1FyiyXgbiQ3Ete0DIJPgMF1Rf5ZoUzgcfqt0qJUiLF3rjt0duOsYPGqNhWr8Sz9oRbzfrGqI+MOzOVnBgk32MJVoSo9aFxg2OTyJfD7q8VZQQ/FDbzgv5gILgi5AIWbcPmJFk9kI1i9CK7QnY22Ml2r8dnYaPNnbn8mIrd3vvAxtQEpUqNwWctLOPA/AewzC/cQOijpYDU9O2ujbqfad+zTiZUm4axsc7DEy8kr1YS2em135ERv2KZRaxnMHZ1RgQEG3fbktR8ACZVceAHq0ATsbiTCV6ErlzPT4ED4BitTwc7L3yXS/geH+uVQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAGsNJI14LRdajbwembuft/ZZeHuj8ILLubhx0yLcsTY0M79rGRuMW7kqd5YMaWsNukIM54l3oLLUu+o3onN+7O7KPdNVeQlp0enO4X9+/Vf3S34i9Af6UCSbgdAbhB4vq5KCQxepUw1cddCiE0hoQhy+cH0G2ljvSTT00Rw4gqGMzzBlRaDs9ipwUloVbBf2JAU8lIiIvv3eE8cgjBj8emJSSz3MWvkNnELd+vTDilV/jwuDzu/iWbBkXxelJfaunNhPt6///QDmiXOGKW0RuOHE4/ABuPOd/R+T7kLROmGChv3TotrCw4HYcH5RDlLV9kLzwlxYsNK+0xT3CXCJDxI=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"54904f8d86f54b1da8c925f4b684c87a"}, [
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
  '0874c944-2d02-47e5-8030-1573f71acbb0',
  'x-ms-request-id',
  '365789a3-efe2-4904-bdf4-987443ee5f4a',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:46:06 GMT',
  'Content-Length',
  '1371'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAuzRkr5DktVJkZvgSW35Y/B+HLLw1FyiyXgbiQ3Ete0DIJPgMF1Rf5ZoUzgcfqt0qJUiLF3rjt0duOsYPGqNhWr8Sz9oRbzfrGqI+MOzOVnBgk32MJVoSo9aFxg2OTyJfD7q8VZQQ/FDbzgv5gILgi5AIWbcPmJFk9kI1i9CK7QnY22Ml2r8dnYaPNnbn8mIrd3vvAxtQEpUqNwWctLOPA/AewzC/cQOijpYDU9O2ujbqfad+zTiZUm4axsc7DEy8kr1YS2em135ERv2KZRaxnMHZ1RgQEG3fbktR8ACZVceAHq0ATsbiTCV6ErlzPT4ED4BitTwc7L3yXS/geH+uVQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAGsNJI14LRdajbwembuft/ZZeHuj8ILLubhx0yLcsTY0M79rGRuMW7kqd5YMaWsNukIM54l3oLLUu+o3onN+7O7KPdNVeQlp0enO4X9+/Vf3S34i9Af6UCSbgdAbhB4vq5KCQxepUw1cddCiE0hoQhy+cH0G2ljvSTT00Rw4gqGMzzBlRaDs9ipwUloVbBf2JAU8lIiIvv3eE8cgjBj8emJSSz3MWvkNnELd+vTDilV/jwuDzu/iWbBkXxelJfaunNhPt6///QDmiXOGKW0RuOHE4/ABuPOd/R+T7kLROmGChv3TotrCw4HYcH5RDlLV9kLzwlxYsNK+0xT3CXCJDxI=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"54904f8d86f54b1da8c925f4b684c87a"}, [
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
  'de7a57e3-99e3-4602-81bf-f00e12bdf182',
  'x-ms-request-id',
  'eb694981-98d4-44bd-85da-f37e628c9d75',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:46:07 GMT',
  'Content-Length',
  '1371'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAuzRkr5DktVJkZvgSW35Y/B+HLLw1FyiyXgbiQ3Ete0DIJPgMF1Rf5ZoUzgcfqt0qJUiLF3rjt0duOsYPGqNhWr8Sz9oRbzfrGqI+MOzOVnBgk32MJVoSo9aFxg2OTyJfD7q8VZQQ/FDbzgv5gILgi5AIWbcPmJFk9kI1i9CK7QnY22Ml2r8dnYaPNnbn8mIrd3vvAxtQEpUqNwWctLOPA/AewzC/cQOijpYDU9O2ujbqfad+zTiZUm4axsc7DEy8kr1YS2em135ERv2KZRaxnMHZ1RgQEG3fbktR8ACZVceAHq0ATsbiTCV6ErlzPT4ED4BitTwc7L3yXS/geH+uVQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAGsNJI14LRdajbwembuft/ZZeHuj8ILLubhx0yLcsTY0M79rGRuMW7kqd5YMaWsNukIM54l3oLLUu+o3onN+7O7KPdNVeQlp0enO4X9+/Vf3S34i9Af6UCSbgdAbhB4vq5KCQxepUw1cddCiE0hoQhy+cH0G2ljvSTT00Rw4gqGMzzBlRaDs9ipwUloVbBf2JAU8lIiIvv3eE8cgjBj8emJSSz3MWvkNnELd+vTDilV/jwuDzu/iWbBkXxelJfaunNhPt6///QDmiXOGKW0RuOHE4/ABuPOd/R+T7kLROmGChv3TotrCw4HYcH5RDlLV9kLzwlxYsNK+0xT3CXCJDxI=","cancellation_requested":false,"status":"completed","target":"https://keyvault_name.vault.azure.net/certificates/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-0","request_id":"54904f8d86f54b1da8c925f4b684c87a"}, [
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
  'e8f6558c-37d3-4b8e-b197-f3b494e81d02',
  'x-ms-request-id',
  'c0f4ae7b-ff4c-4cc2-bede-f779bcbdd103',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:46:10 GMT',
  'Content-Length',
  '1369'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-0/')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-0/e44268f76ef546be9a2e544dccf30ed9","kid":"https://keyvault_name.vault.azure.net/keys/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-0/e44268f76ef546be9a2e544dccf30ed9","sid":"https://keyvault_name.vault.azure.net/secrets/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-0/e44268f76ef546be9a2e544dccf30ed9","x5t":"j9NTE7KcMDi1l6IE9L578pmEhQY","cer":"MIIDKDCCAhCgAwIBAgIQX68anSu+TKCaG5vbottnbTANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjEwNDI4MjEzNjA5WhcNMjIwNDI4MjE0NjA5WjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQC7NGSvkOS1UmRm+BJbflj8H4csvDUXKLJeBuJDcS17QMgk+AwXVF/lmhTOBx+q3SolSIsXeuO3R246xg8ao2FavxLP2hFvN+saoj4w7M5WcGCTfYwlWhKj1oXGDY5PIl8PurxVlBD8UNvOC/mAguCLkAhZtw+YkWT2QjWL0IrtCdjbYyXavx2dho82dufyYit3e+8DG1ASlSo3BZy0s48D8B7DML9xA6KOlgNT07a6Nup9p37NOJlSbhrGxzsMTLySvVhLZ6bXfkRG/YplFrGcwdnVGBAQbd9uS1HwAJlVx4AerQBOxuJMJXoSuXM9PgQPgGK1PBzsvfJdL+B4f65VAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBThf30kcegk7Fxov+9gxquUt/WCTjAdBgNVHQ4EFgQU4X99JHHoJOxcaL/vYMarlLf1gk4wDQYJKoZIhvcNAQELBQADggEBAE9xdygTFhjQ+HWyERX31zNe5KJ2g1ktSl4On3nAB6rokwV/R+ImA721NncrDJ6B1f4r+1c/egBcDkrZS47HE+4Eu1rkAuRSnYZrFhOUXAr1IQvOe2i4hl/3UfzFGWTYc/3KPOn5vPdGtoo9sQ6uVZ7tldU464R5tRb0WOsxeeqiBn9aQ2UcOEiDpjNKlyimxmBVvWAObKmf4qvrQlcsoHdEdBrcybJmtNpdcxu0Exar7E4kq//2aF9X1QRNcBBUZfooRMFidi9EupgK0sz5ub1BU4E5pMPVP8VQejfgmR6qMtuIzGZZQZbY0J6nQ6o+RIxyFwokuYQL+K9h3ukH5hc=","attributes":{"enabled":true,"nbf":1619645769,"exp":1651182369,"created":1619646369,"updated":1619646369,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-0/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1619646300,"updated":1619646300}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-0/pending"}}, [
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
  '01f62126-c27f-4cd9-99e0-1c18b3bfc553',
  'x-ms-request-id',
  'a6bc0074-5219-46e6-87b1-0a6d338b6915',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:46:09 GMT',
  'Content-Length',
  '2745'
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
  'Bearer authorization="https://login.windows.net/12345678-1234-1234-1234-123456789012", resource="https://vault.azure.net"',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'ff5cd620-0b3a-4f1e-8efa-b3babd4b6d60',
  'x-ms-request-id',
  '38763149-2716-4487-aafc-cd0a70d2fef1',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:46:10 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/secrets/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-0/')
  .query(true)
  .reply(200, {"value":"MIIKMAIBAzCCCewGCSqGSIb3DQEHAaCCCd0EggnZMIIJ1TCCBg4GCSqGSIb3DQEHAaCCBf8EggX7MIIF9zCCBfMGCyqGSIb3DQEMCgECoIIE9jCCBPIwHAYKKoZIhvcNAQwBAzAOBAhXcnxSyiRrQwICB9AEggTQMpyqXPAfOwmuKrYMZA2U/fIZoWDXVd0hwbExct5iSkjEG9TDEFOcrfamEWcDN6QnW7i1K/Q6VCokx7T9FG6ZtziwUC9MxaWfi0LnMu4IxaEHtZe6elKVo+lkCJNGiTvVQVkWK8rZPvlt2VyFBS7SKVyiOCEEifKRZjSW8eEW3pO25bMEjG+JF7c49dAQ0vTaBJL3Qn3g/PSwkRrHy0bGWcerU5g9W749DDvHZP4ep81RFrtm2ZwWgJpy77DxqCJ3tQFXJT3BGjte0sseURLdVSFTEUdt1JDPXQIQgom5S+mQRNgSMiAaLgboAlnWTbyg+Ksg6ATwjtpuD//3qzDzlOTIg4JamYPKpIPdGGVK+6NCuh2SByeNJIAkxjJ4rqLf1BV+BZHWMLNs2L7VA87pwD0grG5iFqs/LiY3vfzQb+wZ0EZIEYJxf3CWSEBXXga834TCr7BQJLrIjKRVetTVp20/+YTKL7qDsAxRStRQUx+mpPESwBQWqitqufxgcil71Z/AurRykJL+V7Ol2595xnM+TkptSnNuyhMaC0Nij63gGqwM2iQZylW0N35zuALy1He4dJO9qjdgXebVxSWPuOxYVBxqfCVGA5xHwdiyUyxcs/6D8h2I2oL4Uua2/qgY5cwlWnLzELwLMizx9iH9HZLhztf8mWMwtG+6NOihUeAUVxlHn8BFX82RZvuT/0t+lfvrgaCdFAOLWSDfw1+ce0u5uzy6bAmPgqq4bm8rT8ktNWKrJFAw3nt1oq9svVjLylLBNyI3oDutwUWV1rV/ic+TpP2HV+irF7o3gCJ+lDOoUpe/gTtUmJlZxoWtseLL+MGRTWAsh2RWDcYfhZ5JuJAz5qsOT6jwsV1w0NryQ5qHxLD1PyiqwEm2gnjY+Gdm5wCQXPEh7209VyEPg/mmdciClr9bSVvZg3XqL5A4SgBNySrcb2rPVtsZHxqT7s7wTtmfur9gJ5CdbS6jexoWJa7cGEjapLctUgZBwRhwNvKmLpDFyZ63Wr7ANdf/IEFsyAMBlSXtOTVowE+egQPC6EqegTeNP7SiWGUATovKM8qcbmg5jYKch2Pvs3piG+RxTHsuqzyvHq/wVwi8Q2Hj9MMHXcKbLuMIOEIGvhKqbjVwnRS1xPvAUboUX9V5tAWLjU+aIKMaT0VS4/2LRFYcKibvb+L5bPcQUTsC8+417oLXi6HlUXnC14QSlFKEyz7rZc2viemgM0JE9e5KDMtdZiUKun0ZqlPfyj/M15oJsfm5guxlsvLpuApqV6Fba2yghHhldPPbXTZV/UBunGgv28ukydwkzg1pFWb8FuoL7dA/aQE/V/r1zZYV7QGLkmeY833Ecc4cxltemd6QVvk3L3lB9C870rhnc/is4bken6wyXtBaKLjDW7yWTi3hXf6jrV7Bfk35VIkqc3TLymolG+VXd8CN6nOA73G3ZrsbbLSfOz78s5bqjxV84zU8Jxt1xsigLgIyHPcQWgu+csKAFy0onVFDL2omUdNh3nxv/bR53m3nryITmTB2ASuWUW457qC6ddefUaXxd8ioZM3AOaV/QxJMi9dcUskP2NifgMgXm9DUgX86He67BpVau1daIgqmWq3Chptta1V5wfdp0n2PT+TfQnTeVoC5y0mldyIxgekwEwYJKoZIhvcNAQkVMQYEBAEAAAAwVwYJKoZIhvcNAQkUMUoeSAA3ADYAMQAyAGEAOQBhADgALQAwAGUAMwBlAC0ANABmAGQAOAAtAGIAOAA4AGQALQA4AGMAYgA1ADcAZgA3ADAAYgAxADUAODB5BgkrBgEEAYI3EQExbB5qAE0AaQBjAHIAbwBzAG8AZgB0ACAARQBuAGgAYQBuAGMAZQBkACAAUgBTAEEAIABhAG4AZAAgAEEARQBTACAAQwByAHkAcAB0AG8AZwByAGEAcABoAGkAYwAgAFAAcgBvAHYAaQBkAGUAcjCCA78GCSqGSIb3DQEHBqCCA7AwggOsAgEAMIIDpQYJKoZIhvcNAQcBMBwGCiqGSIb3DQEMAQMwDgQIDCY6fpSxRbUCAgfQgIIDeFj7sMLvDQBVSnDCWtFkljvzbdknOAC7ohVODDniz6oaKIYP7jQjETsEHXSe0/govG5gwEqtN/N2tbhWZGtKgQRa5E0cL3+EDMTCFxvutHMrehbIVIT5INaQQKjlvSOqCgA0YT5u0D/AZcM2kb0EMp6qW/TKf0IPafjdiHqySEBi4umo7LH3gpHnfFXuf8Tl2O3hrvSQqR0SOCIbeg8bteV79tPdJZr3Rp6rIGdQUfhJvM8woHqfs+I1C+5cx/WK88zKthreXq/GiQRitvO8ke1KDAAkPci907+rl+I6QRMXlbJEHHlwNbefVRn/fl28l1MSLqm6HXNMkBPhT/0byrXqcydXSGyJDrxHsnq3SYaHCq6aR3c7E4BXAE75vmKqFHOOyBRrtjreBMnKb//x2sJUKHVq4VlStSRWB4dyUcct9gb2659l8PA2Jbj8c9ssfUGlkFdkhyXNEYrtRWC2h9gOADvQxjtK+aNBoy4yLJFMN5u2nC9Fi5hAtUbpYkvzfZ4DxAIZq7rOriCulz+pLDXIIL12QMQyG7jpb4bib+qIsCHI3flw+ff5dFrXwavLD2anB2WBajIL169RfdpeYG9ToXOANxeWobX1B1mNt9nRWHC06U8GdDVmZDEo6vjq1wyuqUInD29n1uo4FyXEWmrYSW2HG+n4b/tt4bypCjoFrpilDt3CRYhxK4CcSvWEEoJp7hTQEORVwEM/CDobv07eWg/pwiGAc9PQEpj9e3Dc9skYQEBtWwjzRQG4WEDkjT8CzRastMtDSpprl6vw9otCDjcEP/TixapLgrlJbuyZrJYtGHtMsvbGPqcS3dnLJsz6VcgotA3i7ZVabn/2otRuba9EHR24aJbJc3FSEtQi92T7JJ6RTtCECY/p3tcH0tJBBR2inTu4gfkmOXdwPE2B79CsK3lZJngivYMshPQ6yykSI5N3losVWC/PYCWzjYrgUlDIoFA6IxjckMUPg5TLtmqhkSDj8xGTqtHe074SyyQKMCNvZ29OK605QcLWbyTn/2FLM43CqjFjkUReZhtU5sLCTIWaS0d15NO1m86AFrobhinCC6pHxXTi5Img1MuF7rE8Rw+hMOvK5Yb+4QNBCG0ADdHQMeqMd5cKPrXAHh8zJsE8EASbIjB1Ximg0ED/b2/tFjlM1L4XX78fN7INcRK+fgFPvjA7MB8wBwYFKw4DAhoEFEwnCmjbDkPbz3vYON6tpw5e5eEgBBQ4j6aebBXniK9BvZMp5/Xe2rKDigICB9A=","contentType":"application/x-pkcs12","id":"https://keyvault_name.vault.azure.net/secrets/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-0/e44268f76ef546be9a2e544dccf30ed9","managed":true,"attributes":{"enabled":true,"nbf":1619645769,"exp":1651182369,"created":1619646369,"updated":1619646369,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90},"kid":"https://keyvault_name.vault.azure.net/keys/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-0/e44268f76ef546be9a2e544dccf30ed9"}, [
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
  'ff5cd620-0b3a-4f1e-8efa-b3babd4b6d60',
  'x-ms-request-id',
  '85c5ea8d-f3a8-4d75-8ccd-c852b1e79592',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:46:09 GMT',
  'Content-Length',
  '4087'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/certificates/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-1/import', {"value":"MIIKMAIBAzCCCewGCSqGSIb3DQEHAaCCCd0EggnZMIIJ1TCCBg4GCSqGSIb3DQEHAaCCBf8EggX7MIIF9zCCBfMGCyqGSIb3DQEMCgECoIIE9jCCBPIwHAYKKoZIhvcNAQwBAzAOBAhXcnxSyiRrQwICB9AEggTQMpyqXPAfOwmuKrYMZA2U/fIZoWDXVd0hwbExct5iSkjEG9TDEFOcrfamEWcDN6QnW7i1K/Q6VCokx7T9FG6ZtziwUC9MxaWfi0LnMu4IxaEHtZe6elKVo+lkCJNGiTvVQVkWK8rZPvlt2VyFBS7SKVyiOCEEifKRZjSW8eEW3pO25bMEjG+JF7c49dAQ0vTaBJL3Qn3g/PSwkRrHy0bGWcerU5g9W749DDvHZP4ep81RFrtm2ZwWgJpy77DxqCJ3tQFXJT3BGjte0sseURLdVSFTEUdt1JDPXQIQgom5S+mQRNgSMiAaLgboAlnWTbyg+Ksg6ATwjtpuD//3qzDzlOTIg4JamYPKpIPdGGVK+6NCuh2SByeNJIAkxjJ4rqLf1BV+BZHWMLNs2L7VA87pwD0grG5iFqs/LiY3vfzQb+wZ0EZIEYJxf3CWSEBXXga834TCr7BQJLrIjKRVetTVp20/+YTKL7qDsAxRStRQUx+mpPESwBQWqitqufxgcil71Z/AurRykJL+V7Ol2595xnM+TkptSnNuyhMaC0Nij63gGqwM2iQZylW0N35zuALy1He4dJO9qjdgXebVxSWPuOxYVBxqfCVGA5xHwdiyUyxcs/6D8h2I2oL4Uua2/qgY5cwlWnLzELwLMizx9iH9HZLhztf8mWMwtG+6NOihUeAUVxlHn8BFX82RZvuT/0t+lfvrgaCdFAOLWSDfw1+ce0u5uzy6bAmPgqq4bm8rT8ktNWKrJFAw3nt1oq9svVjLylLBNyI3oDutwUWV1rV/ic+TpP2HV+irF7o3gCJ+lDOoUpe/gTtUmJlZxoWtseLL+MGRTWAsh2RWDcYfhZ5JuJAz5qsOT6jwsV1w0NryQ5qHxLD1PyiqwEm2gnjY+Gdm5wCQXPEh7209VyEPg/mmdciClr9bSVvZg3XqL5A4SgBNySrcb2rPVtsZHxqT7s7wTtmfur9gJ5CdbS6jexoWJa7cGEjapLctUgZBwRhwNvKmLpDFyZ63Wr7ANdf/IEFsyAMBlSXtOTVowE+egQPC6EqegTeNP7SiWGUATovKM8qcbmg5jYKch2Pvs3piG+RxTHsuqzyvHq/wVwi8Q2Hj9MMHXcKbLuMIOEIGvhKqbjVwnRS1xPvAUboUX9V5tAWLjU+aIKMaT0VS4/2LRFYcKibvb+L5bPcQUTsC8+417oLXi6HlUXnC14QSlFKEyz7rZc2viemgM0JE9e5KDMtdZiUKun0ZqlPfyj/M15oJsfm5guxlsvLpuApqV6Fba2yghHhldPPbXTZV/UBunGgv28ukydwkzg1pFWb8FuoL7dA/aQE/V/r1zZYV7QGLkmeY833Ecc4cxltemd6QVvk3L3lB9C870rhnc/is4bken6wyXtBaKLjDW7yWTi3hXf6jrV7Bfk35VIkqc3TLymolG+VXd8CN6nOA73G3ZrsbbLSfOz78s5bqjxV84zU8Jxt1xsigLgIyHPcQWgu+csKAFy0onVFDL2omUdNh3nxv/bR53m3nryITmTB2ASuWUW457qC6ddefUaXxd8ioZM3AOaV/QxJMi9dcUskP2NifgMgXm9DUgX86He67BpVau1daIgqmWq3Chptta1V5wfdp0n2PT+TfQnTeVoC5y0mldyIxgekwEwYJKoZIhvcNAQkVMQYEBAEAAAAwVwYJKoZIhvcNAQkUMUoeSAA3ADYAMQAyAGEAOQBhADgALQAwAGUAMwBlAC0ANABmAGQAOAAtAGIAOAA4AGQALQA4AGMAYgA1ADcAZgA3ADAAYgAxADUAODB5BgkrBgEEAYI3EQExbB5qAE0AaQBjAHIAbwBzAG8AZgB0ACAARQBuAGgAYQBuAGMAZQBkACAAUgBTAEEAIABhAG4AZAAgAEEARQBTACAAQwByAHkAcAB0AG8AZwByAGEAcABoAGkAYwAgAFAAcgBvAHYAaQBkAGUAcjCCA78GCSqGSIb3DQEHBqCCA7AwggOsAgEAMIIDpQYJKoZIhvcNAQcBMBwGCiqGSIb3DQEMAQMwDgQIDCY6fpSxRbUCAgfQgIIDeFj7sMLvDQBVSnDCWtFkljvzbdknOAC7ohVODDniz6oaKIYP7jQjETsEHXSe0/govG5gwEqtN/N2tbhWZGtKgQRa5E0cL3+EDMTCFxvutHMrehbIVIT5INaQQKjlvSOqCgA0YT5u0D/AZcM2kb0EMp6qW/TKf0IPafjdiHqySEBi4umo7LH3gpHnfFXuf8Tl2O3hrvSQqR0SOCIbeg8bteV79tPdJZr3Rp6rIGdQUfhJvM8woHqfs+I1C+5cx/WK88zKthreXq/GiQRitvO8ke1KDAAkPci907+rl+I6QRMXlbJEHHlwNbefVRn/fl28l1MSLqm6HXNMkBPhT/0byrXqcydXSGyJDrxHsnq3SYaHCq6aR3c7E4BXAE75vmKqFHOOyBRrtjreBMnKb//x2sJUKHVq4VlStSRWB4dyUcct9gb2659l8PA2Jbj8c9ssfUGlkFdkhyXNEYrtRWC2h9gOADvQxjtK+aNBoy4yLJFMN5u2nC9Fi5hAtUbpYkvzfZ4DxAIZq7rOriCulz+pLDXIIL12QMQyG7jpb4bib+qIsCHI3flw+ff5dFrXwavLD2anB2WBajIL169RfdpeYG9ToXOANxeWobX1B1mNt9nRWHC06U8GdDVmZDEo6vjq1wyuqUInD29n1uo4FyXEWmrYSW2HG+n4b/tt4bypCjoFrpilDt3CRYhxK4CcSvWEEoJp7hTQEORVwEM/CDobv07eWg/pwiGAc9PQEpj9e3Dc9skYQEBtWwjzRQG4WEDkjT8CzRastMtDSpprl6vw9otCDjcEP/TixapLgrlJbuyZrJYtGHtMsvbGPqcS3dnLJsz6VcgotA3i7ZVabn/2otRuba9EHR24aJbJc3FSEtQi92T7JJ6RTtCECY/p3tcH0tJBBR2inTu4gfkmOXdwPE2B79CsK3lZJngivYMshPQ6yykSI5N3losVWC/PYCWzjYrgUlDIoFA6IxjckMUPg5TLtmqhkSDj8xGTqtHe074SyyQKMCNvZ29OK605QcLWbyTn/2FLM43CqjFjkUReZhtU5sLCTIWaS0d15NO1m86AFrobhinCC6pHxXTi5Img1MuF7rE8Rw+hMOvK5Yb+4QNBCG0ADdHQMeqMd5cKPrXAHh8zJsE8EASbIjB1Ximg0ED/b2/tFjlM1L4XX78fN7INcRK+fgFPvjA7MB8wBwYFKw4DAhoEFEwnCmjbDkPbz3vYON6tpw5e5eEgBBQ4j6aebBXniK9BvZMp5/Xe2rKDigICB9A="})
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-1/1dd4f7f8ef48442ca9a5e972eb5ba895","kid":"https://keyvault_name.vault.azure.net/keys/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-1/1dd4f7f8ef48442ca9a5e972eb5ba895","sid":"https://keyvault_name.vault.azure.net/secrets/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-1/1dd4f7f8ef48442ca9a5e972eb5ba895","x5t":"j9NTE7KcMDi1l6IE9L578pmEhQY","cer":"MIIDKDCCAhCgAwIBAgIQX68anSu+TKCaG5vbottnbTANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjEwNDI4MjEzNjA5WhcNMjIwNDI4MjE0NjA5WjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQC7NGSvkOS1UmRm+BJbflj8H4csvDUXKLJeBuJDcS17QMgk+AwXVF/lmhTOBx+q3SolSIsXeuO3R246xg8ao2FavxLP2hFvN+saoj4w7M5WcGCTfYwlWhKj1oXGDY5PIl8PurxVlBD8UNvOC/mAguCLkAhZtw+YkWT2QjWL0IrtCdjbYyXavx2dho82dufyYit3e+8DG1ASlSo3BZy0s48D8B7DML9xA6KOlgNT07a6Nup9p37NOJlSbhrGxzsMTLySvVhLZ6bXfkRG/YplFrGcwdnVGBAQbd9uS1HwAJlVx4AerQBOxuJMJXoSuXM9PgQPgGK1PBzsvfJdL+B4f65VAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBThf30kcegk7Fxov+9gxquUt/WCTjAdBgNVHQ4EFgQU4X99JHHoJOxcaL/vYMarlLf1gk4wDQYJKoZIhvcNAQELBQADggEBAE9xdygTFhjQ+HWyERX31zNe5KJ2g1ktSl4On3nAB6rokwV/R+ImA721NncrDJ6B1f4r+1c/egBcDkrZS47HE+4Eu1rkAuRSnYZrFhOUXAr1IQvOe2i4hl/3UfzFGWTYc/3KPOn5vPdGtoo9sQ6uVZ7tldU464R5tRb0WOsxeeqiBn9aQ2UcOEiDpjNKlyimxmBVvWAObKmf4qvrQlcsoHdEdBrcybJmtNpdcxu0Exar7E4kq//2aF9X1QRNcBBUZfooRMFidi9EupgK0sz5ub1BU4E5pMPVP8VQejfgmR6qMtuIzGZZQZbY0J6nQ6o+RIxyFwokuYQL+K9h3ukH5hc=","attributes":{"enabled":true,"nbf":1619645769,"exp":1651182369,"created":1619646370,"updated":1619646370,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-1/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"CN=MyCert","ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":13,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"EmailContacts"}}],"issuer":{"name":"Unknown"},"attributes":{"enabled":true,"created":1619646370,"updated":1619646370}}}, [
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
  '0210c136-06a4-44d7-875a-ea3ed7a50bb0',
  'x-ms-request-id',
  'd7ff34c5-fa96-4552-9336-12f389e2ca85',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:46:10 GMT',
  'Content-Length',
  '2563'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/certificates/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-0')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-0","deletedDate":1619646371,"scheduledPurgeDate":1627422371,"id":"https://keyvault_name.vault.azure.net/certificates/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-0/e44268f76ef546be9a2e544dccf30ed9","kid":"https://keyvault_name.vault.azure.net/keys/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-0/e44268f76ef546be9a2e544dccf30ed9","sid":"https://keyvault_name.vault.azure.net/secrets/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-0/e44268f76ef546be9a2e544dccf30ed9","x5t":"j9NTE7KcMDi1l6IE9L578pmEhQY","cer":"MIIDKDCCAhCgAwIBAgIQX68anSu+TKCaG5vbottnbTANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjEwNDI4MjEzNjA5WhcNMjIwNDI4MjE0NjA5WjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQC7NGSvkOS1UmRm+BJbflj8H4csvDUXKLJeBuJDcS17QMgk+AwXVF/lmhTOBx+q3SolSIsXeuO3R246xg8ao2FavxLP2hFvN+saoj4w7M5WcGCTfYwlWhKj1oXGDY5PIl8PurxVlBD8UNvOC/mAguCLkAhZtw+YkWT2QjWL0IrtCdjbYyXavx2dho82dufyYit3e+8DG1ASlSo3BZy0s48D8B7DML9xA6KOlgNT07a6Nup9p37NOJlSbhrGxzsMTLySvVhLZ6bXfkRG/YplFrGcwdnVGBAQbd9uS1HwAJlVx4AerQBOxuJMJXoSuXM9PgQPgGK1PBzsvfJdL+B4f65VAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBThf30kcegk7Fxov+9gxquUt/WCTjAdBgNVHQ4EFgQU4X99JHHoJOxcaL/vYMarlLf1gk4wDQYJKoZIhvcNAQELBQADggEBAE9xdygTFhjQ+HWyERX31zNe5KJ2g1ktSl4On3nAB6rokwV/R+ImA721NncrDJ6B1f4r+1c/egBcDkrZS47HE+4Eu1rkAuRSnYZrFhOUXAr1IQvOe2i4hl/3UfzFGWTYc/3KPOn5vPdGtoo9sQ6uVZ7tldU464R5tRb0WOsxeeqiBn9aQ2UcOEiDpjNKlyimxmBVvWAObKmf4qvrQlcsoHdEdBrcybJmtNpdcxu0Exar7E4kq//2aF9X1QRNcBBUZfooRMFidi9EupgK0sz5ub1BU4E5pMPVP8VQejfgmR6qMtuIzGZZQZbY0J6nQ6o+RIxyFwokuYQL+K9h3ukH5hc=","attributes":{"enabled":true,"nbf":1619645769,"exp":1651182369,"created":1619646369,"updated":1619646369,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-0/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1619646300,"updated":1619646300}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-0/pending"}}, [
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
  'f9cb70d7-d0b4-4447-b97f-7db2d5d5f899',
  'x-ms-request-id',
  'c0ceac4a-b7a6-4f5e-b7bf-0fa8d1942f98',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:46:10 GMT',
  'Content-Length',
  '2976'
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
  '178',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '31e3e2fa-589d-4e55-ba19-24b8364d8564',
  'x-ms-request-id',
  '49c1f154-bed0-4625-84f6-fab536eb52ea',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:46:11 GMT'
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
  '178',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '0e41c6a4-4415-4918-ba45-970823931ebf',
  'x-ms-request-id',
  '68e947e0-fddd-4cb8-8776-9eaaff82fe35',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:46:10 GMT'
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
  '178',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '08764a38-04d8-4ef7-8e93-f9606683d519',
  'x-ms-request-id',
  '6ff7ebbf-41c4-4d60-8619-9761d9e84519',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:46:13 GMT'
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
  '178',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'de182fe5-aa94-46a6-b468-7e9f2da13540',
  'x-ms-request-id',
  '37925f69-5008-47c4-9836-fc19f0eeb060',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:46:15 GMT'
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
  '178',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '5630d774-90b0-40b8-b677-889e60150206',
  'x-ms-request-id',
  '5385a463-0e74-4b55-9b74-969bd83657ff',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:46:17 GMT'
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
  '178',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '5ad5447e-cb57-4085-b4fc-bc401d7fd57c',
  'x-ms-request-id',
  'f9358f9d-7cda-4a5a-aed3-9e6cd1b5b12b',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:46:19 GMT'
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
  '178',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'ca9b6b93-a16e-40a3-930b-f72f331846b5',
  'x-ms-request-id',
  'e1536d07-12af-4b67-b9dd-8c8f224c04e9',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:46:21 GMT'
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
  '178',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'ecf75b15-43bf-406e-adb6-46e420d3293f',
  'x-ms-request-id',
  '9ed5e492-7b19-44b8-b292-43ea7921a1a3',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:46:24 GMT'
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
  '178',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '071d595c-ed64-4f87-8d3e-261ff86b27c3',
  'x-ms-request-id',
  '00893d85-5678-4823-b58e-50b3a3501118',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:46:26 GMT'
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
  '178',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '7fb46498-e8d1-466b-9d4f-cb32e940a3a0',
  'x-ms-request-id',
  '655f051d-546e-4572-8346-11c5a9c6fe6f',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:46:27 GMT'
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
  '178',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '7adf9d21-62e8-487b-95c2-83e5b6f0b165',
  'x-ms-request-id',
  'c516c163-5221-42c4-855f-9832d7eb5503',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:46:30 GMT'
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
  '178',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '502c7abe-c18c-40be-a906-0b43bd2fe5b0',
  'x-ms-request-id',
  'e40454bc-0f21-4f5f-aef3-4f5a88063125',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:46:32 GMT'
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
  '178',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'b27baf3e-372b-4922-a6db-b68489715308',
  'x-ms-request-id',
  'c5ccc062-ebb5-4bd4-96bc-df2ec5b5bf2e',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:46:33 GMT'
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
  '178',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '1d248b10-7f19-4aeb-ab16-f7e528ae5f22',
  'x-ms-request-id',
  'fc3728d7-2e7d-4668-9216-bf9bec65feff',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:46:36 GMT'
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
  '178',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '7124fc4b-6fda-4c5f-a450-2cb703978464',
  'x-ms-request-id',
  '991f7fe6-9fbe-4c18-9e7e-05c4b387763b',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:46:38 GMT'
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
  '178',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'eba6d943-72f8-4551-b2ee-8cbbc48327fa',
  'x-ms-request-id',
  'b1095e58-6524-4378-8c0b-8a394650521b',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:46:40 GMT'
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
  '178',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'c0ab9d4f-aff5-4f09-be4e-b0b2369666c5',
  'x-ms-request-id',
  '59654f9b-b247-447b-b591-962c1143ee27',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:46:42 GMT'
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
  '178',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'fc180ebc-d02f-4ec7-b478-0dfb1425f7a4',
  'x-ms-request-id',
  'd567671c-8be5-412a-9b5e-a462c3b81165',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:46:44 GMT'
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
  '178',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'ec561643-dfb4-4655-88ff-5b88920db1be',
  'x-ms-request-id',
  '72cc1d5f-e334-438e-b92b-8e51e2d7246a',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:46:47 GMT'
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
  '178',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '8a37b62f-defb-4c60-914b-83c96e2780c2',
  'x-ms-request-id',
  '3f28e603-d64c-4470-80c4-cea4517e1100',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:46:48 GMT'
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
  '178',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '89768717-58c0-4061-a0bd-283629a036b5',
  'x-ms-request-id',
  '8849e799-6cac-4fa9-be61-b5bb8f912f53',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:46:50 GMT'
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
  '178',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'e9c7a64e-db26-4e0a-933d-69f8a57649e1',
  'x-ms-request-id',
  'd7737843-2479-4989-9b72-0eb7dabae99f',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:46:53 GMT'
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
  '178',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '001dde8c-50f1-4f87-8a71-86e9d8e2e1a2',
  'x-ms-request-id',
  'a1973c06-f654-408f-8534-8a6db27f7241',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:46:54 GMT'
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
  '178',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '0cdc6b70-6698-49e0-a81d-53222908114a',
  'x-ms-request-id',
  'c8162a0d-ef8f-4520-a3d8-1081adec3519',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:46:56 GMT'
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
  '178',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'fe8bae04-fa3a-4164-a5a6-6e29e7c19594',
  'x-ms-request-id',
  '2266df6e-28f8-4d3a-aed8-f50ac0662c9d',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:46:59 GMT'
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
  '178',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '142ae7a0-0a38-41a6-ba9a-39cdd7f6db54',
  'x-ms-request-id',
  '763e1d7c-9ed9-4e8a-83c4-6c5ce3fe2685',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:47:01 GMT'
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
  '178',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '3baf17ab-28bc-45ea-a9ae-968bc57f4589',
  'x-ms-request-id',
  '1449d44f-3efa-452e-a74f-f82872876e67',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:47:03 GMT'
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
  '178',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'cbc55d87-9e4f-49ef-95f7-1b18ba045b05',
  'x-ms-request-id',
  '25d1df0f-aa45-4886-a568-b0fa0e8fc358',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:47:05 GMT'
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
  '178',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '6624682d-38e8-49ee-82f5-257cc910f069',
  'x-ms-request-id',
  '297edd29-1764-4c93-9599-6849812cf7ac',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:47:07 GMT'
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
  '178',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '16950247-2475-4073-beb0-b5aee7c55f33',
  'x-ms-request-id',
  'd223a982-f508-4b93-a336-035c9bf1d31f',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:47:09 GMT'
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
  '178',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'a5492c60-74e6-4b33-ad9f-a58fb237bc00',
  'x-ms-request-id',
  '953ec8cd-50e8-4a68-b1d4-e7a90b91853a',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:47:11 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-0')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-0","deletedDate":1619646371,"scheduledPurgeDate":1627422371,"id":"https://keyvault_name.vault.azure.net/certificates/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-0/e44268f76ef546be9a2e544dccf30ed9","kid":"https://keyvault_name.vault.azure.net/keys/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-0/e44268f76ef546be9a2e544dccf30ed9","sid":"https://keyvault_name.vault.azure.net/secrets/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-0/e44268f76ef546be9a2e544dccf30ed9","x5t":"j9NTE7KcMDi1l6IE9L578pmEhQY","cer":"MIIDKDCCAhCgAwIBAgIQX68anSu+TKCaG5vbottnbTANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjEwNDI4MjEzNjA5WhcNMjIwNDI4MjE0NjA5WjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQC7NGSvkOS1UmRm+BJbflj8H4csvDUXKLJeBuJDcS17QMgk+AwXVF/lmhTOBx+q3SolSIsXeuO3R246xg8ao2FavxLP2hFvN+saoj4w7M5WcGCTfYwlWhKj1oXGDY5PIl8PurxVlBD8UNvOC/mAguCLkAhZtw+YkWT2QjWL0IrtCdjbYyXavx2dho82dufyYit3e+8DG1ASlSo3BZy0s48D8B7DML9xA6KOlgNT07a6Nup9p37NOJlSbhrGxzsMTLySvVhLZ6bXfkRG/YplFrGcwdnVGBAQbd9uS1HwAJlVx4AerQBOxuJMJXoSuXM9PgQPgGK1PBzsvfJdL+B4f65VAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBThf30kcegk7Fxov+9gxquUt/WCTjAdBgNVHQ4EFgQU4X99JHHoJOxcaL/vYMarlLf1gk4wDQYJKoZIhvcNAQELBQADggEBAE9xdygTFhjQ+HWyERX31zNe5KJ2g1ktSl4On3nAB6rokwV/R+ImA721NncrDJ6B1f4r+1c/egBcDkrZS47HE+4Eu1rkAuRSnYZrFhOUXAr1IQvOe2i4hl/3UfzFGWTYc/3KPOn5vPdGtoo9sQ6uVZ7tldU464R5tRb0WOsxeeqiBn9aQ2UcOEiDpjNKlyimxmBVvWAObKmf4qvrQlcsoHdEdBrcybJmtNpdcxu0Exar7E4kq//2aF9X1QRNcBBUZfooRMFidi9EupgK0sz5ub1BU4E5pMPVP8VQejfgmR6qMtuIzGZZQZbY0J6nQ6o+RIxyFwokuYQL+K9h3ukH5hc=","attributes":{"enabled":true,"nbf":1619645769,"exp":1651182369,"created":1619646369,"updated":1619646369,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-0/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1619646300,"updated":1619646300}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-0/pending"}}, [
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
  'f2ceafb5-dc47-4d16-8f7c-e6a663bfe901',
  'x-ms-request-id',
  '8a9dec28-8a4f-4d56-8163-b57b41c4d2fc',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:47:13 GMT',
  'Content-Length',
  '2976'
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
  'eastus',
  'x-ms-client-request-id',
  'a2a5ec53-9386-4622-b19a-2fdbc13a3020',
  'x-ms-request-id',
  'a6056c4e-5dfb-4852-bae1-581b6de14055',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:47:14 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/certificates/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-1')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-1","deletedDate":1619646434,"scheduledPurgeDate":1627422434,"id":"https://keyvault_name.vault.azure.net/certificates/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-1/1dd4f7f8ef48442ca9a5e972eb5ba895","kid":"https://keyvault_name.vault.azure.net/keys/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-1/1dd4f7f8ef48442ca9a5e972eb5ba895","sid":"https://keyvault_name.vault.azure.net/secrets/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-1/1dd4f7f8ef48442ca9a5e972eb5ba895","x5t":"j9NTE7KcMDi1l6IE9L578pmEhQY","cer":"MIIDKDCCAhCgAwIBAgIQX68anSu+TKCaG5vbottnbTANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjEwNDI4MjEzNjA5WhcNMjIwNDI4MjE0NjA5WjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQC7NGSvkOS1UmRm+BJbflj8H4csvDUXKLJeBuJDcS17QMgk+AwXVF/lmhTOBx+q3SolSIsXeuO3R246xg8ao2FavxLP2hFvN+saoj4w7M5WcGCTfYwlWhKj1oXGDY5PIl8PurxVlBD8UNvOC/mAguCLkAhZtw+YkWT2QjWL0IrtCdjbYyXavx2dho82dufyYit3e+8DG1ASlSo3BZy0s48D8B7DML9xA6KOlgNT07a6Nup9p37NOJlSbhrGxzsMTLySvVhLZ6bXfkRG/YplFrGcwdnVGBAQbd9uS1HwAJlVx4AerQBOxuJMJXoSuXM9PgQPgGK1PBzsvfJdL+B4f65VAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBThf30kcegk7Fxov+9gxquUt/WCTjAdBgNVHQ4EFgQU4X99JHHoJOxcaL/vYMarlLf1gk4wDQYJKoZIhvcNAQELBQADggEBAE9xdygTFhjQ+HWyERX31zNe5KJ2g1ktSl4On3nAB6rokwV/R+ImA721NncrDJ6B1f4r+1c/egBcDkrZS47HE+4Eu1rkAuRSnYZrFhOUXAr1IQvOe2i4hl/3UfzFGWTYc/3KPOn5vPdGtoo9sQ6uVZ7tldU464R5tRb0WOsxeeqiBn9aQ2UcOEiDpjNKlyimxmBVvWAObKmf4qvrQlcsoHdEdBrcybJmtNpdcxu0Exar7E4kq//2aF9X1QRNcBBUZfooRMFidi9EupgK0sz5ub1BU4E5pMPVP8VQejfgmR6qMtuIzGZZQZbY0J6nQ6o+RIxyFwokuYQL+K9h3ukH5hc=","attributes":{"enabled":true,"nbf":1619645769,"exp":1651182369,"created":1619646370,"updated":1619646370,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-1/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"CN=MyCert","ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":13,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"EmailContacts"}}],"issuer":{"name":"Unknown"},"attributes":{"enabled":true,"created":1619646370,"updated":1619646370}}}, [
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
  '70c92291-6dd2-49c7-949d-2ae6bbcad95c',
  'x-ms-request-id',
  '555aefe4-9352-4283-911e-2a70a93c1bf4',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:47:13 GMT',
  'Content-Length',
  '2794'
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
  '178',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '4b9351fc-0d6f-4d95-9a16-5ae95ea6278c',
  'x-ms-request-id',
  '2856a7ac-6bbf-48a1-9559-a69e47e640db',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:47:14 GMT'
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
  '178',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'b6fb914e-3fdf-4531-a6af-33ffeae301fe',
  'x-ms-request-id',
  '6bc5021f-6a3f-487d-bad2-1a98e9ef0885',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:47:14 GMT'
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
  '178',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'a6c92a0b-05b1-418a-a0bd-9e793660b185',
  'x-ms-request-id',
  'a87be597-352f-4dd4-baab-3c107682d57f',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:47:16 GMT'
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
  '178',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'c0bb6edc-93e6-466f-857b-d8874512ba7f',
  'x-ms-request-id',
  '85e1b464-947f-4be1-96e7-d7686497fe8f',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:47:18 GMT'
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
  '178',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '6c0452b5-ec0f-4cdf-8e3d-93155e73edfd',
  'x-ms-request-id',
  '8d7fd5bb-629d-4bf5-b4d0-9dc670e8e5d9',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:47:20 GMT'
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
  '178',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'fdf99780-e776-4ee4-8005-863f135dda7c',
  'x-ms-request-id',
  'c9631b70-b513-42a0-af71-e0fb2456d49c',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:47:23 GMT'
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
  '178',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '10b29de9-9e63-4a3a-9a53-ec02fa6bf52b',
  'x-ms-request-id',
  'c8abe612-3ec7-4be9-875b-0ae88836363c',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:47:25 GMT'
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
  '178',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'fac74ea1-4bfb-4a19-9465-f499bd740cce',
  'x-ms-request-id',
  '693479a4-9612-49df-97d4-6ba2629ffc55',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:47:26 GMT'
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
  '178',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'f8474914-027b-447c-bb47-0e00c1d667fc',
  'x-ms-request-id',
  '681d8847-caf8-43b4-bc90-c23985a43cd4',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:47:28 GMT'
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
  '178',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'ff1b4b30-296f-45d8-a1a9-f4bdeb19c3ad',
  'x-ms-request-id',
  '5f8f1f96-4691-4e0e-8d00-92f5b1d5104e',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:47:31 GMT'
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
  '178',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'ce92c615-9bed-4f84-86f9-0a76bb962726',
  'x-ms-request-id',
  'dc81e057-5205-48ef-887c-a9b7b4b0f03b',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:47:32 GMT'
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
  '178',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '42174970-f1b7-416c-b53d-aacf963d550d',
  'x-ms-request-id',
  'c9418be4-f51f-4138-ac90-ea5847519262',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:47:35 GMT'
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
  '178',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '22410fdd-e4ee-4e9f-8b74-f2c95c577333',
  'x-ms-request-id',
  'b18dc419-0fad-4fef-a6df-b53b9c208b59',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:47:37 GMT'
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
  '178',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '6c95a56c-2d97-48e8-83de-04552e695cea',
  'x-ms-request-id',
  '29b8e6d0-3156-4f16-a419-47a3c285a1bb',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:47:39 GMT'
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
  '178',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'd840ed0d-9a1f-46f5-ba84-67d5ce4590af',
  'x-ms-request-id',
  'd49fd370-e5bc-48d0-8dfa-d352c68a85bd',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:47:40 GMT'
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
  '178',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '96e82781-ae80-463f-bdb2-b3907a862e6c',
  'x-ms-request-id',
  '76a855cc-da09-4dd5-b61e-8c46cafbeea3',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:47:44 GMT'
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
  '178',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'c1b8a27d-adf0-443c-bc9b-7cb35ed8cc95',
  'x-ms-request-id',
  '6f1e8cd0-a449-490a-bbe8-8d5f4232bcb1',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:47:45 GMT'
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
  '178',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '7021359d-000a-4a30-bd9d-409e62584448',
  'x-ms-request-id',
  'cb6bd502-619b-4d1f-8181-1a9de6959df2',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:47:48 GMT'
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
  '178',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'd45f619b-8252-4642-97e8-5109546cbad1',
  'x-ms-request-id',
  '637a3a7f-19d8-443a-b35b-c27933ada717',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:47:50 GMT'
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
  '178',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'c022d982-c323-4fda-b2c5-560d33d37ba1',
  'x-ms-request-id',
  'f60204de-a193-45bf-bfdb-f40858d469df',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:47:51 GMT'
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
  '178',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '96d42900-a3dd-463c-9fac-16337f51dd0c',
  'x-ms-request-id',
  '27a035ca-248f-4ad0-aa83-c51bc9010c0e',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:47:53 GMT'
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
  '178',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'e3bfc552-9068-4975-98fa-036cf03f811e',
  'x-ms-request-id',
  '9576a770-4799-41ad-a0ba-debc1809e52b',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:47:56 GMT'
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
  '178',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '4d619ac4-4127-491e-a425-b43acaeb2dce',
  'x-ms-request-id',
  '0869189a-f923-4c3d-a190-3be67a37fd06',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:47:57 GMT'
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
  '178',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '20a420d2-1435-4eb4-a0d3-12d395c7d2a1',
  'x-ms-request-id',
  'e1be31a0-22b5-479c-a5c2-372d5483cce0',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:48:00 GMT'
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
  '178',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'f6522066-0811-40b6-b2bb-1f10c6cf8c20',
  'x-ms-request-id',
  'de8649cb-2da0-46ce-9f7a-499864c94aad',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:48:02 GMT'
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
  '178',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '72d982bc-0d7f-458f-9e1a-1cf56f038855',
  'x-ms-request-id',
  '5b2db191-e771-435d-9b44-952fe17bc811',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:48:04 GMT'
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
  '178',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '8638d4a9-73c5-4b4e-a11d-2b2602e1ed4c',
  'x-ms-request-id',
  '8b5c92f9-a469-4486-b024-a88cabfee99c',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:48:06 GMT'
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
  '178',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'cbe02ab6-f7b0-4f9e-adf5-90379cba2423',
  'x-ms-request-id',
  '8e13eba0-236f-4cde-a2cf-b3e68d8f3e25',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:48:08 GMT'
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
  '178',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'b9283a39-06b7-4fa1-9954-f5cd905968f4',
  'x-ms-request-id',
  'e2ef8627-a957-47f5-a86c-939a40f7d966',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:48:11 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-1')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-1","deletedDate":1619646434,"scheduledPurgeDate":1627422434,"id":"https://keyvault_name.vault.azure.net/certificates/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-1/1dd4f7f8ef48442ca9a5e972eb5ba895","kid":"https://keyvault_name.vault.azure.net/keys/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-1/1dd4f7f8ef48442ca9a5e972eb5ba895","sid":"https://keyvault_name.vault.azure.net/secrets/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-1/1dd4f7f8ef48442ca9a5e972eb5ba895","x5t":"j9NTE7KcMDi1l6IE9L578pmEhQY","cer":"MIIDKDCCAhCgAwIBAgIQX68anSu+TKCaG5vbottnbTANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjEwNDI4MjEzNjA5WhcNMjIwNDI4MjE0NjA5WjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQC7NGSvkOS1UmRm+BJbflj8H4csvDUXKLJeBuJDcS17QMgk+AwXVF/lmhTOBx+q3SolSIsXeuO3R246xg8ao2FavxLP2hFvN+saoj4w7M5WcGCTfYwlWhKj1oXGDY5PIl8PurxVlBD8UNvOC/mAguCLkAhZtw+YkWT2QjWL0IrtCdjbYyXavx2dho82dufyYit3e+8DG1ASlSo3BZy0s48D8B7DML9xA6KOlgNT07a6Nup9p37NOJlSbhrGxzsMTLySvVhLZ6bXfkRG/YplFrGcwdnVGBAQbd9uS1HwAJlVx4AerQBOxuJMJXoSuXM9PgQPgGK1PBzsvfJdL+B4f65VAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBThf30kcegk7Fxov+9gxquUt/WCTjAdBgNVHQ4EFgQU4X99JHHoJOxcaL/vYMarlLf1gk4wDQYJKoZIhvcNAQELBQADggEBAE9xdygTFhjQ+HWyERX31zNe5KJ2g1ktSl4On3nAB6rokwV/R+ImA721NncrDJ6B1f4r+1c/egBcDkrZS47HE+4Eu1rkAuRSnYZrFhOUXAr1IQvOe2i4hl/3UfzFGWTYc/3KPOn5vPdGtoo9sQ6uVZ7tldU464R5tRb0WOsxeeqiBn9aQ2UcOEiDpjNKlyimxmBVvWAObKmf4qvrQlcsoHdEdBrcybJmtNpdcxu0Exar7E4kq//2aF9X1QRNcBBUZfooRMFidi9EupgK0sz5ub1BU4E5pMPVP8VQejfgmR6qMtuIzGZZQZbY0J6nQ6o+RIxyFwokuYQL+K9h3ukH5hc=","attributes":{"enabled":true,"nbf":1619645769,"exp":1651182369,"created":1619646370,"updated":1619646370,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-1/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"CN=MyCert","ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":13,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"EmailContacts"}}],"issuer":{"name":"Unknown"},"attributes":{"enabled":true,"created":1619646370,"updated":1619646370}}}, [
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
  '6e03a91c-a4e5-4fb9-8b74-e6bc4a52144a',
  'x-ms-request-id',
  '60897e7a-2545-4574-8324-ede59ad847b2',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:48:12 GMT',
  'Content-Length',
  '2794'
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
  'eastus',
  'x-ms-client-request-id',
  '685df236-7867-47dc-9843-889988b1f276',
  'x-ms-request-id',
  '38a29ade-4897-44b1-864b-589f4f3d1e7b',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:48:13 GMT'
]);

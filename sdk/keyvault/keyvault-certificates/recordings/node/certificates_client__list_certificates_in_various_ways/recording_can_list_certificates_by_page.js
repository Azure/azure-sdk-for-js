let nock = require('nock');

module.exports.hash = "256eced09da590aa04a35aa6c4ba10d6";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/certificates/listCertificateName-canlistcertificatesbypage-0/create')
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
  'a9b80a28-40c0-46e9-b488-674ed785e1ae',
  'x-ms-request-id',
  '163710b8-62f7-49c9-87e5-622f441461bf',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:34:50 GMT'
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
  '95c11677-1979-4aec-b4a2-3d103aeb5d01',
  'x-ms-ests-server',
  '2.1.11654.16 - EUS ProdSlices',
  'Set-Cookie',
  'fpc=AnWlGQoM0KlJkXfu9C0SA8k; expires=Fri, 28-May-2021 22:34:51 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevr0o0qCqUsSJcFaQCWKPDXT9Rvu9FTC8rN-oKv84bqvIfFQYDYbHrtElG4L2lFKlW_SIgnXE5IG8WY3BEfXqOjcXmocbtShH5IHLpIhug5oe9msKVPV5POIfIiiyQKd_xDGtAxtUzAIW-PxtJsaG8qM8fZCUYxhPMSa1g0tM0QmAIgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 28 Apr 2021 22:34:50 GMT',
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
  '841e02f5-71c6-42f5-b6ff-965b6cfa4100',
  'x-ms-ests-server',
  '2.1.11654.16 - SCUS ProdSlices',
  'Set-Cookie',
  'fpc=AnWlGQoM0KlJkXfu9C0SA8k; expires=Fri, 28-May-2021 22:34:51 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrH6yKvpnaS0LwN5hrrGjACYtJmeifkQ9idbnOmucIrsLkXkBikeMlr8OYL8HR1Xtg4N2Eqvn2UoDTKVz-dplu5kvw2DmAjjaN493l0dbs9eFdEtSbrpGQuvBuA4Wj6TQIZfhMyfqQQSO0AlNq2h_SBl6PeRw40uHqg-qMomG9jIsgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 28 Apr 2021 22:34:50 GMT',
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
  'e83837f2-463c-4291-a76b-dd81506d2001',
  'x-ms-ests-server',
  '2.1.11654.16 - WUS2 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=AnWlGQoM0KlJkXfu9C0SA8nmR1YbAQAAAAraG9gOAAAA; expires=Fri, 28-May-2021 22:34:51 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 28 Apr 2021 22:34:51 GMT',
  'Content-Length',
  '1313'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/certificates/listCertificateName-canlistcertificatesbypage-0/create', {"policy":{"key_props":{},"secret_props":{},"x509_props":{"subject":"cn=MyCert","sans":{}},"issuer":{"name":"Self"},"attributes":{}},"attributes":{}})
  .query(true)
  .reply(202, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistcertificatesbypage-0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAxrxSr6oGfBmZr2hitPpYbSqmnHYGNbahB2VjToUv06nshL5T2CD0Ky7CPJ7SDtUUH07be2d5Uruz/zXrH7ooLq5NLMa5g5GbU20dQSCQnkijlLO3noBw+5AwGN45UPS1Z8YObRM+Ss2wEvjxcbDXmRSlkSRPmnCaFwJfsCDnBHADAG/9gz6kEvwW/edVxaURBcmZInTw+0YWfHBEMhBGFuAmJ0MXChpaBzivDI1ZeV1csktQRBbtnGweSmVyVYhRjyBsuLekwC2lBhE+VkEHOM1y2r6v793EO9C8FSUgOEjp5Zf4gErs1Fpngr9lTEqklerAI+FNHAMGS83MwSu3KQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBACtS0YGOHNoE1OQogaCFCXSMtvo7QfZxQFMPwrC4ugNSbrGfJptpIocCOlsoyWC6MS2KB7OiGqPjScyLeqVAa/0LKwlwLMQefkT4eqRImLcqEfydTo3adiQAGk8eOtj/IHuovMquvUhDQz4yOY2p9k4Ao0kzxM+CI/tgfRAwfQ8ZrNrTSa9b6fF5F4QuBM1qtFlsEGMZ8Dnm/2ONvY9WvmApB7UdPRl5YQCWYLyxS5Heboa0rI7myLh5JLkEP3vYcgsxPCNpZSDrtGrYO9p7cI0mJZcNsh56SUTttoEfU3rCndNSs/IhC+xCxGiKQ6ez/Ad5E77g8hU71Yt0ERPj6mE=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"070d3e63b8e34861bc9d8bfaa689e7cd"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistcertificatesbypage-0/pending?api-version=7.2&request_id=070d3e63b8e34861bc9d8bfaa689e7cd',
  'Retry-After',
  '0',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'a9b80a28-40c0-46e9-b488-674ed785e1ae',
  'x-ms-request-id',
  '0e632b00-77f4-42c2-93ca-ebf5e4bbd86d',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:34:52 GMT',
  'Content-Length',
  '1338'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistcertificatesbypage-0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistcertificatesbypage-0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAxrxSr6oGfBmZr2hitPpYbSqmnHYGNbahB2VjToUv06nshL5T2CD0Ky7CPJ7SDtUUH07be2d5Uruz/zXrH7ooLq5NLMa5g5GbU20dQSCQnkijlLO3noBw+5AwGN45UPS1Z8YObRM+Ss2wEvjxcbDXmRSlkSRPmnCaFwJfsCDnBHADAG/9gz6kEvwW/edVxaURBcmZInTw+0YWfHBEMhBGFuAmJ0MXChpaBzivDI1ZeV1csktQRBbtnGweSmVyVYhRjyBsuLekwC2lBhE+VkEHOM1y2r6v793EO9C8FSUgOEjp5Zf4gErs1Fpngr9lTEqklerAI+FNHAMGS83MwSu3KQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBACtS0YGOHNoE1OQogaCFCXSMtvo7QfZxQFMPwrC4ugNSbrGfJptpIocCOlsoyWC6MS2KB7OiGqPjScyLeqVAa/0LKwlwLMQefkT4eqRImLcqEfydTo3adiQAGk8eOtj/IHuovMquvUhDQz4yOY2p9k4Ao0kzxM+CI/tgfRAwfQ8ZrNrTSa9b6fF5F4QuBM1qtFlsEGMZ8Dnm/2ONvY9WvmApB7UdPRl5YQCWYLyxS5Heboa0rI7myLh5JLkEP3vYcgsxPCNpZSDrtGrYO9p7cI0mJZcNsh56SUTttoEfU3rCndNSs/IhC+xCxGiKQ6ez/Ad5E77g8hU71Yt0ERPj6mE=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"070d3e63b8e34861bc9d8bfaa689e7cd"}, [
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
  'c3853e6e-8bf6-4035-936d-4a178289bd6e',
  'x-ms-request-id',
  '8e556d40-110d-4a25-834b-61d21b6a1aaf',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:34:52 GMT',
  'Content-Length',
  '1338'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistcertificatesbypage-0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistcertificatesbypage-0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAxrxSr6oGfBmZr2hitPpYbSqmnHYGNbahB2VjToUv06nshL5T2CD0Ky7CPJ7SDtUUH07be2d5Uruz/zXrH7ooLq5NLMa5g5GbU20dQSCQnkijlLO3noBw+5AwGN45UPS1Z8YObRM+Ss2wEvjxcbDXmRSlkSRPmnCaFwJfsCDnBHADAG/9gz6kEvwW/edVxaURBcmZInTw+0YWfHBEMhBGFuAmJ0MXChpaBzivDI1ZeV1csktQRBbtnGweSmVyVYhRjyBsuLekwC2lBhE+VkEHOM1y2r6v793EO9C8FSUgOEjp5Zf4gErs1Fpngr9lTEqklerAI+FNHAMGS83MwSu3KQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBACtS0YGOHNoE1OQogaCFCXSMtvo7QfZxQFMPwrC4ugNSbrGfJptpIocCOlsoyWC6MS2KB7OiGqPjScyLeqVAa/0LKwlwLMQefkT4eqRImLcqEfydTo3adiQAGk8eOtj/IHuovMquvUhDQz4yOY2p9k4Ao0kzxM+CI/tgfRAwfQ8ZrNrTSa9b6fF5F4QuBM1qtFlsEGMZ8Dnm/2ONvY9WvmApB7UdPRl5YQCWYLyxS5Heboa0rI7myLh5JLkEP3vYcgsxPCNpZSDrtGrYO9p7cI0mJZcNsh56SUTttoEfU3rCndNSs/IhC+xCxGiKQ6ez/Ad5E77g8hU71Yt0ERPj6mE=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"070d3e63b8e34861bc9d8bfaa689e7cd"}, [
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
  '46ce5b35-e07f-42d7-8e0d-adc2b424cc43',
  'x-ms-request-id',
  '90becb06-e0b0-4846-b923-8ec7df73314b',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:34:52 GMT',
  'Content-Length',
  '1338'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistcertificatesbypage-0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistcertificatesbypage-0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAxrxSr6oGfBmZr2hitPpYbSqmnHYGNbahB2VjToUv06nshL5T2CD0Ky7CPJ7SDtUUH07be2d5Uruz/zXrH7ooLq5NLMa5g5GbU20dQSCQnkijlLO3noBw+5AwGN45UPS1Z8YObRM+Ss2wEvjxcbDXmRSlkSRPmnCaFwJfsCDnBHADAG/9gz6kEvwW/edVxaURBcmZInTw+0YWfHBEMhBGFuAmJ0MXChpaBzivDI1ZeV1csktQRBbtnGweSmVyVYhRjyBsuLekwC2lBhE+VkEHOM1y2r6v793EO9C8FSUgOEjp5Zf4gErs1Fpngr9lTEqklerAI+FNHAMGS83MwSu3KQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBACtS0YGOHNoE1OQogaCFCXSMtvo7QfZxQFMPwrC4ugNSbrGfJptpIocCOlsoyWC6MS2KB7OiGqPjScyLeqVAa/0LKwlwLMQefkT4eqRImLcqEfydTo3adiQAGk8eOtj/IHuovMquvUhDQz4yOY2p9k4Ao0kzxM+CI/tgfRAwfQ8ZrNrTSa9b6fF5F4QuBM1qtFlsEGMZ8Dnm/2ONvY9WvmApB7UdPRl5YQCWYLyxS5Heboa0rI7myLh5JLkEP3vYcgsxPCNpZSDrtGrYO9p7cI0mJZcNsh56SUTttoEfU3rCndNSs/IhC+xCxGiKQ6ez/Ad5E77g8hU71Yt0ERPj6mE=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"070d3e63b8e34861bc9d8bfaa689e7cd"}, [
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
  '46a236c6-6503-4c16-95a7-68dba797aa4d',
  'x-ms-request-id',
  'a09bb53b-f25e-4344-b619-94a39276b17a',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:34:54 GMT',
  'Content-Length',
  '1338'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistcertificatesbypage-0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistcertificatesbypage-0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAxrxSr6oGfBmZr2hitPpYbSqmnHYGNbahB2VjToUv06nshL5T2CD0Ky7CPJ7SDtUUH07be2d5Uruz/zXrH7ooLq5NLMa5g5GbU20dQSCQnkijlLO3noBw+5AwGN45UPS1Z8YObRM+Ss2wEvjxcbDXmRSlkSRPmnCaFwJfsCDnBHADAG/9gz6kEvwW/edVxaURBcmZInTw+0YWfHBEMhBGFuAmJ0MXChpaBzivDI1ZeV1csktQRBbtnGweSmVyVYhRjyBsuLekwC2lBhE+VkEHOM1y2r6v793EO9C8FSUgOEjp5Zf4gErs1Fpngr9lTEqklerAI+FNHAMGS83MwSu3KQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBACtS0YGOHNoE1OQogaCFCXSMtvo7QfZxQFMPwrC4ugNSbrGfJptpIocCOlsoyWC6MS2KB7OiGqPjScyLeqVAa/0LKwlwLMQefkT4eqRImLcqEfydTo3adiQAGk8eOtj/IHuovMquvUhDQz4yOY2p9k4Ao0kzxM+CI/tgfRAwfQ8ZrNrTSa9b6fF5F4QuBM1qtFlsEGMZ8Dnm/2ONvY9WvmApB7UdPRl5YQCWYLyxS5Heboa0rI7myLh5JLkEP3vYcgsxPCNpZSDrtGrYO9p7cI0mJZcNsh56SUTttoEfU3rCndNSs/IhC+xCxGiKQ6ez/Ad5E77g8hU71Yt0ERPj6mE=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"070d3e63b8e34861bc9d8bfaa689e7cd"}, [
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
  'a84a9a1c-803c-4d82-86e4-3ef5562784c0',
  'x-ms-request-id',
  'f2574c28-2c75-4ab5-8434-01d5d20e8f48',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:34:56 GMT',
  'Content-Length',
  '1338'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistcertificatesbypage-0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistcertificatesbypage-0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAxrxSr6oGfBmZr2hitPpYbSqmnHYGNbahB2VjToUv06nshL5T2CD0Ky7CPJ7SDtUUH07be2d5Uruz/zXrH7ooLq5NLMa5g5GbU20dQSCQnkijlLO3noBw+5AwGN45UPS1Z8YObRM+Ss2wEvjxcbDXmRSlkSRPmnCaFwJfsCDnBHADAG/9gz6kEvwW/edVxaURBcmZInTw+0YWfHBEMhBGFuAmJ0MXChpaBzivDI1ZeV1csktQRBbtnGweSmVyVYhRjyBsuLekwC2lBhE+VkEHOM1y2r6v793EO9C8FSUgOEjp5Zf4gErs1Fpngr9lTEqklerAI+FNHAMGS83MwSu3KQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBACtS0YGOHNoE1OQogaCFCXSMtvo7QfZxQFMPwrC4ugNSbrGfJptpIocCOlsoyWC6MS2KB7OiGqPjScyLeqVAa/0LKwlwLMQefkT4eqRImLcqEfydTo3adiQAGk8eOtj/IHuovMquvUhDQz4yOY2p9k4Ao0kzxM+CI/tgfRAwfQ8ZrNrTSa9b6fF5F4QuBM1qtFlsEGMZ8Dnm/2ONvY9WvmApB7UdPRl5YQCWYLyxS5Heboa0rI7myLh5JLkEP3vYcgsxPCNpZSDrtGrYO9p7cI0mJZcNsh56SUTttoEfU3rCndNSs/IhC+xCxGiKQ6ez/Ad5E77g8hU71Yt0ERPj6mE=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"070d3e63b8e34861bc9d8bfaa689e7cd"}, [
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
  '6e29456a-4281-4b68-bf2c-25f9b7dda0fc',
  'x-ms-request-id',
  '1bb3f26a-e1d8-4ab5-8258-549190a1f07b',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:34:58 GMT',
  'Content-Length',
  '1338'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistcertificatesbypage-0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistcertificatesbypage-0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAxrxSr6oGfBmZr2hitPpYbSqmnHYGNbahB2VjToUv06nshL5T2CD0Ky7CPJ7SDtUUH07be2d5Uruz/zXrH7ooLq5NLMa5g5GbU20dQSCQnkijlLO3noBw+5AwGN45UPS1Z8YObRM+Ss2wEvjxcbDXmRSlkSRPmnCaFwJfsCDnBHADAG/9gz6kEvwW/edVxaURBcmZInTw+0YWfHBEMhBGFuAmJ0MXChpaBzivDI1ZeV1csktQRBbtnGweSmVyVYhRjyBsuLekwC2lBhE+VkEHOM1y2r6v793EO9C8FSUgOEjp5Zf4gErs1Fpngr9lTEqklerAI+FNHAMGS83MwSu3KQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBACtS0YGOHNoE1OQogaCFCXSMtvo7QfZxQFMPwrC4ugNSbrGfJptpIocCOlsoyWC6MS2KB7OiGqPjScyLeqVAa/0LKwlwLMQefkT4eqRImLcqEfydTo3adiQAGk8eOtj/IHuovMquvUhDQz4yOY2p9k4Ao0kzxM+CI/tgfRAwfQ8ZrNrTSa9b6fF5F4QuBM1qtFlsEGMZ8Dnm/2ONvY9WvmApB7UdPRl5YQCWYLyxS5Heboa0rI7myLh5JLkEP3vYcgsxPCNpZSDrtGrYO9p7cI0mJZcNsh56SUTttoEfU3rCndNSs/IhC+xCxGiKQ6ez/Ad5E77g8hU71Yt0ERPj6mE=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"070d3e63b8e34861bc9d8bfaa689e7cd"}, [
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
  '6e41c84c-94f5-457e-bb0c-89df0920e1b0',
  'x-ms-request-id',
  '1da110f1-b4e1-444b-ad1a-44fb92e7495f',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:34:59 GMT',
  'Content-Length',
  '1338'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistcertificatesbypage-0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistcertificatesbypage-0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAxrxSr6oGfBmZr2hitPpYbSqmnHYGNbahB2VjToUv06nshL5T2CD0Ky7CPJ7SDtUUH07be2d5Uruz/zXrH7ooLq5NLMa5g5GbU20dQSCQnkijlLO3noBw+5AwGN45UPS1Z8YObRM+Ss2wEvjxcbDXmRSlkSRPmnCaFwJfsCDnBHADAG/9gz6kEvwW/edVxaURBcmZInTw+0YWfHBEMhBGFuAmJ0MXChpaBzivDI1ZeV1csktQRBbtnGweSmVyVYhRjyBsuLekwC2lBhE+VkEHOM1y2r6v793EO9C8FSUgOEjp5Zf4gErs1Fpngr9lTEqklerAI+FNHAMGS83MwSu3KQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBACtS0YGOHNoE1OQogaCFCXSMtvo7QfZxQFMPwrC4ugNSbrGfJptpIocCOlsoyWC6MS2KB7OiGqPjScyLeqVAa/0LKwlwLMQefkT4eqRImLcqEfydTo3adiQAGk8eOtj/IHuovMquvUhDQz4yOY2p9k4Ao0kzxM+CI/tgfRAwfQ8ZrNrTSa9b6fF5F4QuBM1qtFlsEGMZ8Dnm/2ONvY9WvmApB7UdPRl5YQCWYLyxS5Heboa0rI7myLh5JLkEP3vYcgsxPCNpZSDrtGrYO9p7cI0mJZcNsh56SUTttoEfU3rCndNSs/IhC+xCxGiKQ6ez/Ad5E77g8hU71Yt0ERPj6mE=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"070d3e63b8e34861bc9d8bfaa689e7cd"}, [
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
  '937ef86d-b46f-4856-a7cd-54a82f85a0f5',
  'x-ms-request-id',
  'bbcc5a79-634c-4662-b9f7-4b30b925640d',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:35:01 GMT',
  'Content-Length',
  '1338'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistcertificatesbypage-0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistcertificatesbypage-0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAxrxSr6oGfBmZr2hitPpYbSqmnHYGNbahB2VjToUv06nshL5T2CD0Ky7CPJ7SDtUUH07be2d5Uruz/zXrH7ooLq5NLMa5g5GbU20dQSCQnkijlLO3noBw+5AwGN45UPS1Z8YObRM+Ss2wEvjxcbDXmRSlkSRPmnCaFwJfsCDnBHADAG/9gz6kEvwW/edVxaURBcmZInTw+0YWfHBEMhBGFuAmJ0MXChpaBzivDI1ZeV1csktQRBbtnGweSmVyVYhRjyBsuLekwC2lBhE+VkEHOM1y2r6v793EO9C8FSUgOEjp5Zf4gErs1Fpngr9lTEqklerAI+FNHAMGS83MwSu3KQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBACtS0YGOHNoE1OQogaCFCXSMtvo7QfZxQFMPwrC4ugNSbrGfJptpIocCOlsoyWC6MS2KB7OiGqPjScyLeqVAa/0LKwlwLMQefkT4eqRImLcqEfydTo3adiQAGk8eOtj/IHuovMquvUhDQz4yOY2p9k4Ao0kzxM+CI/tgfRAwfQ8ZrNrTSa9b6fF5F4QuBM1qtFlsEGMZ8Dnm/2ONvY9WvmApB7UdPRl5YQCWYLyxS5Heboa0rI7myLh5JLkEP3vYcgsxPCNpZSDrtGrYO9p7cI0mJZcNsh56SUTttoEfU3rCndNSs/IhC+xCxGiKQ6ez/Ad5E77g8hU71Yt0ERPj6mE=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"070d3e63b8e34861bc9d8bfaa689e7cd"}, [
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
  '2b9570d5-cd64-4d2b-86de-6b13a9b18890',
  'x-ms-request-id',
  '76e63fa4-b566-4072-b38a-046a85f0537b',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:35:04 GMT',
  'Content-Length',
  '1338'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistcertificatesbypage-0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistcertificatesbypage-0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAxrxSr6oGfBmZr2hitPpYbSqmnHYGNbahB2VjToUv06nshL5T2CD0Ky7CPJ7SDtUUH07be2d5Uruz/zXrH7ooLq5NLMa5g5GbU20dQSCQnkijlLO3noBw+5AwGN45UPS1Z8YObRM+Ss2wEvjxcbDXmRSlkSRPmnCaFwJfsCDnBHADAG/9gz6kEvwW/edVxaURBcmZInTw+0YWfHBEMhBGFuAmJ0MXChpaBzivDI1ZeV1csktQRBbtnGweSmVyVYhRjyBsuLekwC2lBhE+VkEHOM1y2r6v793EO9C8FSUgOEjp5Zf4gErs1Fpngr9lTEqklerAI+FNHAMGS83MwSu3KQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBACtS0YGOHNoE1OQogaCFCXSMtvo7QfZxQFMPwrC4ugNSbrGfJptpIocCOlsoyWC6MS2KB7OiGqPjScyLeqVAa/0LKwlwLMQefkT4eqRImLcqEfydTo3adiQAGk8eOtj/IHuovMquvUhDQz4yOY2p9k4Ao0kzxM+CI/tgfRAwfQ8ZrNrTSa9b6fF5F4QuBM1qtFlsEGMZ8Dnm/2ONvY9WvmApB7UdPRl5YQCWYLyxS5Heboa0rI7myLh5JLkEP3vYcgsxPCNpZSDrtGrYO9p7cI0mJZcNsh56SUTttoEfU3rCndNSs/IhC+xCxGiKQ6ez/Ad5E77g8hU71Yt0ERPj6mE=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"070d3e63b8e34861bc9d8bfaa689e7cd"}, [
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
  '7fa2fe9b-f028-40bd-b033-556df656ba63',
  'x-ms-request-id',
  '8cdc1e7f-a173-4578-999c-eb167912ab65',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:35:06 GMT',
  'Content-Length',
  '1338'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistcertificatesbypage-0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistcertificatesbypage-0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAxrxSr6oGfBmZr2hitPpYbSqmnHYGNbahB2VjToUv06nshL5T2CD0Ky7CPJ7SDtUUH07be2d5Uruz/zXrH7ooLq5NLMa5g5GbU20dQSCQnkijlLO3noBw+5AwGN45UPS1Z8YObRM+Ss2wEvjxcbDXmRSlkSRPmnCaFwJfsCDnBHADAG/9gz6kEvwW/edVxaURBcmZInTw+0YWfHBEMhBGFuAmJ0MXChpaBzivDI1ZeV1csktQRBbtnGweSmVyVYhRjyBsuLekwC2lBhE+VkEHOM1y2r6v793EO9C8FSUgOEjp5Zf4gErs1Fpngr9lTEqklerAI+FNHAMGS83MwSu3KQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBACtS0YGOHNoE1OQogaCFCXSMtvo7QfZxQFMPwrC4ugNSbrGfJptpIocCOlsoyWC6MS2KB7OiGqPjScyLeqVAa/0LKwlwLMQefkT4eqRImLcqEfydTo3adiQAGk8eOtj/IHuovMquvUhDQz4yOY2p9k4Ao0kzxM+CI/tgfRAwfQ8ZrNrTSa9b6fF5F4QuBM1qtFlsEGMZ8Dnm/2ONvY9WvmApB7UdPRl5YQCWYLyxS5Heboa0rI7myLh5JLkEP3vYcgsxPCNpZSDrtGrYO9p7cI0mJZcNsh56SUTttoEfU3rCndNSs/IhC+xCxGiKQ6ez/Ad5E77g8hU71Yt0ERPj6mE=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"070d3e63b8e34861bc9d8bfaa689e7cd"}, [
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
  '86bb19ed-da98-4b01-bbb7-c59a5cc02178',
  'x-ms-request-id',
  '1d1b49fb-c859-4cba-b15c-e53c9ee4da2a',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:35:08 GMT',
  'Content-Length',
  '1338'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistcertificatesbypage-0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistcertificatesbypage-0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAxrxSr6oGfBmZr2hitPpYbSqmnHYGNbahB2VjToUv06nshL5T2CD0Ky7CPJ7SDtUUH07be2d5Uruz/zXrH7ooLq5NLMa5g5GbU20dQSCQnkijlLO3noBw+5AwGN45UPS1Z8YObRM+Ss2wEvjxcbDXmRSlkSRPmnCaFwJfsCDnBHADAG/9gz6kEvwW/edVxaURBcmZInTw+0YWfHBEMhBGFuAmJ0MXChpaBzivDI1ZeV1csktQRBbtnGweSmVyVYhRjyBsuLekwC2lBhE+VkEHOM1y2r6v793EO9C8FSUgOEjp5Zf4gErs1Fpngr9lTEqklerAI+FNHAMGS83MwSu3KQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBACtS0YGOHNoE1OQogaCFCXSMtvo7QfZxQFMPwrC4ugNSbrGfJptpIocCOlsoyWC6MS2KB7OiGqPjScyLeqVAa/0LKwlwLMQefkT4eqRImLcqEfydTo3adiQAGk8eOtj/IHuovMquvUhDQz4yOY2p9k4Ao0kzxM+CI/tgfRAwfQ8ZrNrTSa9b6fF5F4QuBM1qtFlsEGMZ8Dnm/2ONvY9WvmApB7UdPRl5YQCWYLyxS5Heboa0rI7myLh5JLkEP3vYcgsxPCNpZSDrtGrYO9p7cI0mJZcNsh56SUTttoEfU3rCndNSs/IhC+xCxGiKQ6ez/Ad5E77g8hU71Yt0ERPj6mE=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"070d3e63b8e34861bc9d8bfaa689e7cd"}, [
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
  '4a96ec03-f6e1-471d-bd90-55513bc241fe',
  'x-ms-request-id',
  'c29db7e4-95e0-4fee-b5c6-7075ea1b312e',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:35:10 GMT',
  'Content-Length',
  '1338'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistcertificatesbypage-0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistcertificatesbypage-0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAxrxSr6oGfBmZr2hitPpYbSqmnHYGNbahB2VjToUv06nshL5T2CD0Ky7CPJ7SDtUUH07be2d5Uruz/zXrH7ooLq5NLMa5g5GbU20dQSCQnkijlLO3noBw+5AwGN45UPS1Z8YObRM+Ss2wEvjxcbDXmRSlkSRPmnCaFwJfsCDnBHADAG/9gz6kEvwW/edVxaURBcmZInTw+0YWfHBEMhBGFuAmJ0MXChpaBzivDI1ZeV1csktQRBbtnGweSmVyVYhRjyBsuLekwC2lBhE+VkEHOM1y2r6v793EO9C8FSUgOEjp5Zf4gErs1Fpngr9lTEqklerAI+FNHAMGS83MwSu3KQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBACtS0YGOHNoE1OQogaCFCXSMtvo7QfZxQFMPwrC4ugNSbrGfJptpIocCOlsoyWC6MS2KB7OiGqPjScyLeqVAa/0LKwlwLMQefkT4eqRImLcqEfydTo3adiQAGk8eOtj/IHuovMquvUhDQz4yOY2p9k4Ao0kzxM+CI/tgfRAwfQ8ZrNrTSa9b6fF5F4QuBM1qtFlsEGMZ8Dnm/2ONvY9WvmApB7UdPRl5YQCWYLyxS5Heboa0rI7myLh5JLkEP3vYcgsxPCNpZSDrtGrYO9p7cI0mJZcNsh56SUTttoEfU3rCndNSs/IhC+xCxGiKQ6ez/Ad5E77g8hU71Yt0ERPj6mE=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"070d3e63b8e34861bc9d8bfaa689e7cd"}, [
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
  '3be77b5f-c74b-492f-bc2e-05c8db7004de',
  'x-ms-request-id',
  '683d92f2-ea53-46c8-843b-00040b7c5ccc',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:35:12 GMT',
  'Content-Length',
  '1338'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistcertificatesbypage-0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistcertificatesbypage-0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAxrxSr6oGfBmZr2hitPpYbSqmnHYGNbahB2VjToUv06nshL5T2CD0Ky7CPJ7SDtUUH07be2d5Uruz/zXrH7ooLq5NLMa5g5GbU20dQSCQnkijlLO3noBw+5AwGN45UPS1Z8YObRM+Ss2wEvjxcbDXmRSlkSRPmnCaFwJfsCDnBHADAG/9gz6kEvwW/edVxaURBcmZInTw+0YWfHBEMhBGFuAmJ0MXChpaBzivDI1ZeV1csktQRBbtnGweSmVyVYhRjyBsuLekwC2lBhE+VkEHOM1y2r6v793EO9C8FSUgOEjp5Zf4gErs1Fpngr9lTEqklerAI+FNHAMGS83MwSu3KQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBACtS0YGOHNoE1OQogaCFCXSMtvo7QfZxQFMPwrC4ugNSbrGfJptpIocCOlsoyWC6MS2KB7OiGqPjScyLeqVAa/0LKwlwLMQefkT4eqRImLcqEfydTo3adiQAGk8eOtj/IHuovMquvUhDQz4yOY2p9k4Ao0kzxM+CI/tgfRAwfQ8ZrNrTSa9b6fF5F4QuBM1qtFlsEGMZ8Dnm/2ONvY9WvmApB7UdPRl5YQCWYLyxS5Heboa0rI7myLh5JLkEP3vYcgsxPCNpZSDrtGrYO9p7cI0mJZcNsh56SUTttoEfU3rCndNSs/IhC+xCxGiKQ6ez/Ad5E77g8hU71Yt0ERPj6mE=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"070d3e63b8e34861bc9d8bfaa689e7cd"}, [
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
  'c5dfe586-5758-4b0d-add5-5f995a57fb29',
  'x-ms-request-id',
  '30716fd3-af31-4b61-bd93-e4d8179d7f65',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:35:15 GMT',
  'Content-Length',
  '1338'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistcertificatesbypage-0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistcertificatesbypage-0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAxrxSr6oGfBmZr2hitPpYbSqmnHYGNbahB2VjToUv06nshL5T2CD0Ky7CPJ7SDtUUH07be2d5Uruz/zXrH7ooLq5NLMa5g5GbU20dQSCQnkijlLO3noBw+5AwGN45UPS1Z8YObRM+Ss2wEvjxcbDXmRSlkSRPmnCaFwJfsCDnBHADAG/9gz6kEvwW/edVxaURBcmZInTw+0YWfHBEMhBGFuAmJ0MXChpaBzivDI1ZeV1csktQRBbtnGweSmVyVYhRjyBsuLekwC2lBhE+VkEHOM1y2r6v793EO9C8FSUgOEjp5Zf4gErs1Fpngr9lTEqklerAI+FNHAMGS83MwSu3KQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBACtS0YGOHNoE1OQogaCFCXSMtvo7QfZxQFMPwrC4ugNSbrGfJptpIocCOlsoyWC6MS2KB7OiGqPjScyLeqVAa/0LKwlwLMQefkT4eqRImLcqEfydTo3adiQAGk8eOtj/IHuovMquvUhDQz4yOY2p9k4Ao0kzxM+CI/tgfRAwfQ8ZrNrTSa9b6fF5F4QuBM1qtFlsEGMZ8Dnm/2ONvY9WvmApB7UdPRl5YQCWYLyxS5Heboa0rI7myLh5JLkEP3vYcgsxPCNpZSDrtGrYO9p7cI0mJZcNsh56SUTttoEfU3rCndNSs/IhC+xCxGiKQ6ez/Ad5E77g8hU71Yt0ERPj6mE=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"070d3e63b8e34861bc9d8bfaa689e7cd"}, [
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
  'f485061b-5bd6-4d1a-8238-3058a85b1d96',
  'x-ms-request-id',
  '15fc966f-7c4c-4cf5-b30c-c9946b604836',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:35:17 GMT',
  'Content-Length',
  '1338'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistcertificatesbypage-0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistcertificatesbypage-0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAxrxSr6oGfBmZr2hitPpYbSqmnHYGNbahB2VjToUv06nshL5T2CD0Ky7CPJ7SDtUUH07be2d5Uruz/zXrH7ooLq5NLMa5g5GbU20dQSCQnkijlLO3noBw+5AwGN45UPS1Z8YObRM+Ss2wEvjxcbDXmRSlkSRPmnCaFwJfsCDnBHADAG/9gz6kEvwW/edVxaURBcmZInTw+0YWfHBEMhBGFuAmJ0MXChpaBzivDI1ZeV1csktQRBbtnGweSmVyVYhRjyBsuLekwC2lBhE+VkEHOM1y2r6v793EO9C8FSUgOEjp5Zf4gErs1Fpngr9lTEqklerAI+FNHAMGS83MwSu3KQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBACtS0YGOHNoE1OQogaCFCXSMtvo7QfZxQFMPwrC4ugNSbrGfJptpIocCOlsoyWC6MS2KB7OiGqPjScyLeqVAa/0LKwlwLMQefkT4eqRImLcqEfydTo3adiQAGk8eOtj/IHuovMquvUhDQz4yOY2p9k4Ao0kzxM+CI/tgfRAwfQ8ZrNrTSa9b6fF5F4QuBM1qtFlsEGMZ8Dnm/2ONvY9WvmApB7UdPRl5YQCWYLyxS5Heboa0rI7myLh5JLkEP3vYcgsxPCNpZSDrtGrYO9p7cI0mJZcNsh56SUTttoEfU3rCndNSs/IhC+xCxGiKQ6ez/Ad5E77g8hU71Yt0ERPj6mE=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"070d3e63b8e34861bc9d8bfaa689e7cd"}, [
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
  'dd271819-0fe3-4ecf-894e-724afe63e66a',
  'x-ms-request-id',
  'f5118289-eb2e-4176-a41f-5cf9f3287543',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:35:19 GMT',
  'Content-Length',
  '1338'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistcertificatesbypage-0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistcertificatesbypage-0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAxrxSr6oGfBmZr2hitPpYbSqmnHYGNbahB2VjToUv06nshL5T2CD0Ky7CPJ7SDtUUH07be2d5Uruz/zXrH7ooLq5NLMa5g5GbU20dQSCQnkijlLO3noBw+5AwGN45UPS1Z8YObRM+Ss2wEvjxcbDXmRSlkSRPmnCaFwJfsCDnBHADAG/9gz6kEvwW/edVxaURBcmZInTw+0YWfHBEMhBGFuAmJ0MXChpaBzivDI1ZeV1csktQRBbtnGweSmVyVYhRjyBsuLekwC2lBhE+VkEHOM1y2r6v793EO9C8FSUgOEjp5Zf4gErs1Fpngr9lTEqklerAI+FNHAMGS83MwSu3KQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBACtS0YGOHNoE1OQogaCFCXSMtvo7QfZxQFMPwrC4ugNSbrGfJptpIocCOlsoyWC6MS2KB7OiGqPjScyLeqVAa/0LKwlwLMQefkT4eqRImLcqEfydTo3adiQAGk8eOtj/IHuovMquvUhDQz4yOY2p9k4Ao0kzxM+CI/tgfRAwfQ8ZrNrTSa9b6fF5F4QuBM1qtFlsEGMZ8Dnm/2ONvY9WvmApB7UdPRl5YQCWYLyxS5Heboa0rI7myLh5JLkEP3vYcgsxPCNpZSDrtGrYO9p7cI0mJZcNsh56SUTttoEfU3rCndNSs/IhC+xCxGiKQ6ez/Ad5E77g8hU71Yt0ERPj6mE=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"070d3e63b8e34861bc9d8bfaa689e7cd"}, [
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
  '4e19ef38-69e7-47a9-9be9-c1bbd0ea0ab8',
  'x-ms-request-id',
  'd202e32e-a0e4-474e-ad51-301b62f972be',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:35:21 GMT',
  'Content-Length',
  '1338'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistcertificatesbypage-0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistcertificatesbypage-0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAxrxSr6oGfBmZr2hitPpYbSqmnHYGNbahB2VjToUv06nshL5T2CD0Ky7CPJ7SDtUUH07be2d5Uruz/zXrH7ooLq5NLMa5g5GbU20dQSCQnkijlLO3noBw+5AwGN45UPS1Z8YObRM+Ss2wEvjxcbDXmRSlkSRPmnCaFwJfsCDnBHADAG/9gz6kEvwW/edVxaURBcmZInTw+0YWfHBEMhBGFuAmJ0MXChpaBzivDI1ZeV1csktQRBbtnGweSmVyVYhRjyBsuLekwC2lBhE+VkEHOM1y2r6v793EO9C8FSUgOEjp5Zf4gErs1Fpngr9lTEqklerAI+FNHAMGS83MwSu3KQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBACtS0YGOHNoE1OQogaCFCXSMtvo7QfZxQFMPwrC4ugNSbrGfJptpIocCOlsoyWC6MS2KB7OiGqPjScyLeqVAa/0LKwlwLMQefkT4eqRImLcqEfydTo3adiQAGk8eOtj/IHuovMquvUhDQz4yOY2p9k4Ao0kzxM+CI/tgfRAwfQ8ZrNrTSa9b6fF5F4QuBM1qtFlsEGMZ8Dnm/2ONvY9WvmApB7UdPRl5YQCWYLyxS5Heboa0rI7myLh5JLkEP3vYcgsxPCNpZSDrtGrYO9p7cI0mJZcNsh56SUTttoEfU3rCndNSs/IhC+xCxGiKQ6ez/Ad5E77g8hU71Yt0ERPj6mE=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"070d3e63b8e34861bc9d8bfaa689e7cd"}, [
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
  '828332c1-4e57-4150-a8a4-a859a5afaace',
  'x-ms-request-id',
  'b3e2922b-0996-45c7-a368-5213c686899e',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:35:23 GMT',
  'Content-Length',
  '1338'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistcertificatesbypage-0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistcertificatesbypage-0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAxrxSr6oGfBmZr2hitPpYbSqmnHYGNbahB2VjToUv06nshL5T2CD0Ky7CPJ7SDtUUH07be2d5Uruz/zXrH7ooLq5NLMa5g5GbU20dQSCQnkijlLO3noBw+5AwGN45UPS1Z8YObRM+Ss2wEvjxcbDXmRSlkSRPmnCaFwJfsCDnBHADAG/9gz6kEvwW/edVxaURBcmZInTw+0YWfHBEMhBGFuAmJ0MXChpaBzivDI1ZeV1csktQRBbtnGweSmVyVYhRjyBsuLekwC2lBhE+VkEHOM1y2r6v793EO9C8FSUgOEjp5Zf4gErs1Fpngr9lTEqklerAI+FNHAMGS83MwSu3KQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBACtS0YGOHNoE1OQogaCFCXSMtvo7QfZxQFMPwrC4ugNSbrGfJptpIocCOlsoyWC6MS2KB7OiGqPjScyLeqVAa/0LKwlwLMQefkT4eqRImLcqEfydTo3adiQAGk8eOtj/IHuovMquvUhDQz4yOY2p9k4Ao0kzxM+CI/tgfRAwfQ8ZrNrTSa9b6fF5F4QuBM1qtFlsEGMZ8Dnm/2ONvY9WvmApB7UdPRl5YQCWYLyxS5Heboa0rI7myLh5JLkEP3vYcgsxPCNpZSDrtGrYO9p7cI0mJZcNsh56SUTttoEfU3rCndNSs/IhC+xCxGiKQ6ez/Ad5E77g8hU71Yt0ERPj6mE=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"070d3e63b8e34861bc9d8bfaa689e7cd"}, [
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
  '02f2c81a-875f-407c-b279-6d02a8902ea0',
  'x-ms-request-id',
  'cef261c7-996a-4d9c-ae04-800ad249c296',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:35:25 GMT',
  'Content-Length',
  '1338'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistcertificatesbypage-0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistcertificatesbypage-0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAxrxSr6oGfBmZr2hitPpYbSqmnHYGNbahB2VjToUv06nshL5T2CD0Ky7CPJ7SDtUUH07be2d5Uruz/zXrH7ooLq5NLMa5g5GbU20dQSCQnkijlLO3noBw+5AwGN45UPS1Z8YObRM+Ss2wEvjxcbDXmRSlkSRPmnCaFwJfsCDnBHADAG/9gz6kEvwW/edVxaURBcmZInTw+0YWfHBEMhBGFuAmJ0MXChpaBzivDI1ZeV1csktQRBbtnGweSmVyVYhRjyBsuLekwC2lBhE+VkEHOM1y2r6v793EO9C8FSUgOEjp5Zf4gErs1Fpngr9lTEqklerAI+FNHAMGS83MwSu3KQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBACtS0YGOHNoE1OQogaCFCXSMtvo7QfZxQFMPwrC4ugNSbrGfJptpIocCOlsoyWC6MS2KB7OiGqPjScyLeqVAa/0LKwlwLMQefkT4eqRImLcqEfydTo3adiQAGk8eOtj/IHuovMquvUhDQz4yOY2p9k4Ao0kzxM+CI/tgfRAwfQ8ZrNrTSa9b6fF5F4QuBM1qtFlsEGMZ8Dnm/2ONvY9WvmApB7UdPRl5YQCWYLyxS5Heboa0rI7myLh5JLkEP3vYcgsxPCNpZSDrtGrYO9p7cI0mJZcNsh56SUTttoEfU3rCndNSs/IhC+xCxGiKQ6ez/Ad5E77g8hU71Yt0ERPj6mE=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"070d3e63b8e34861bc9d8bfaa689e7cd"}, [
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
  'f13a7087-c441-4911-9b3c-3943e7c76486',
  'x-ms-request-id',
  'dc22ece9-992c-4705-a499-6c3169f24ce7',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:35:27 GMT',
  'Content-Length',
  '1338'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistcertificatesbypage-0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistcertificatesbypage-0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAxrxSr6oGfBmZr2hitPpYbSqmnHYGNbahB2VjToUv06nshL5T2CD0Ky7CPJ7SDtUUH07be2d5Uruz/zXrH7ooLq5NLMa5g5GbU20dQSCQnkijlLO3noBw+5AwGN45UPS1Z8YObRM+Ss2wEvjxcbDXmRSlkSRPmnCaFwJfsCDnBHADAG/9gz6kEvwW/edVxaURBcmZInTw+0YWfHBEMhBGFuAmJ0MXChpaBzivDI1ZeV1csktQRBbtnGweSmVyVYhRjyBsuLekwC2lBhE+VkEHOM1y2r6v793EO9C8FSUgOEjp5Zf4gErs1Fpngr9lTEqklerAI+FNHAMGS83MwSu3KQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBACtS0YGOHNoE1OQogaCFCXSMtvo7QfZxQFMPwrC4ugNSbrGfJptpIocCOlsoyWC6MS2KB7OiGqPjScyLeqVAa/0LKwlwLMQefkT4eqRImLcqEfydTo3adiQAGk8eOtj/IHuovMquvUhDQz4yOY2p9k4Ao0kzxM+CI/tgfRAwfQ8ZrNrTSa9b6fF5F4QuBM1qtFlsEGMZ8Dnm/2ONvY9WvmApB7UdPRl5YQCWYLyxS5Heboa0rI7myLh5JLkEP3vYcgsxPCNpZSDrtGrYO9p7cI0mJZcNsh56SUTttoEfU3rCndNSs/IhC+xCxGiKQ6ez/Ad5E77g8hU71Yt0ERPj6mE=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"070d3e63b8e34861bc9d8bfaa689e7cd"}, [
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
  '7e7bdb69-6eff-4ebc-9a0f-9cf9c942b076',
  'x-ms-request-id',
  'c94da095-f898-4c74-bd20-a3e39940fb03',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:35:29 GMT',
  'Content-Length',
  '1338'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistcertificatesbypage-0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistcertificatesbypage-0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAxrxSr6oGfBmZr2hitPpYbSqmnHYGNbahB2VjToUv06nshL5T2CD0Ky7CPJ7SDtUUH07be2d5Uruz/zXrH7ooLq5NLMa5g5GbU20dQSCQnkijlLO3noBw+5AwGN45UPS1Z8YObRM+Ss2wEvjxcbDXmRSlkSRPmnCaFwJfsCDnBHADAG/9gz6kEvwW/edVxaURBcmZInTw+0YWfHBEMhBGFuAmJ0MXChpaBzivDI1ZeV1csktQRBbtnGweSmVyVYhRjyBsuLekwC2lBhE+VkEHOM1y2r6v793EO9C8FSUgOEjp5Zf4gErs1Fpngr9lTEqklerAI+FNHAMGS83MwSu3KQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBACtS0YGOHNoE1OQogaCFCXSMtvo7QfZxQFMPwrC4ugNSbrGfJptpIocCOlsoyWC6MS2KB7OiGqPjScyLeqVAa/0LKwlwLMQefkT4eqRImLcqEfydTo3adiQAGk8eOtj/IHuovMquvUhDQz4yOY2p9k4Ao0kzxM+CI/tgfRAwfQ8ZrNrTSa9b6fF5F4QuBM1qtFlsEGMZ8Dnm/2ONvY9WvmApB7UdPRl5YQCWYLyxS5Heboa0rI7myLh5JLkEP3vYcgsxPCNpZSDrtGrYO9p7cI0mJZcNsh56SUTttoEfU3rCndNSs/IhC+xCxGiKQ6ez/Ad5E77g8hU71Yt0ERPj6mE=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"070d3e63b8e34861bc9d8bfaa689e7cd"}, [
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
  'db592f78-0cb3-4bd5-8478-52ca79c0632c',
  'x-ms-request-id',
  'fdeb6f19-6eb9-4d0c-9950-7cc01605af33',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:35:32 GMT',
  'Content-Length',
  '1338'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistcertificatesbypage-0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistcertificatesbypage-0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAxrxSr6oGfBmZr2hitPpYbSqmnHYGNbahB2VjToUv06nshL5T2CD0Ky7CPJ7SDtUUH07be2d5Uruz/zXrH7ooLq5NLMa5g5GbU20dQSCQnkijlLO3noBw+5AwGN45UPS1Z8YObRM+Ss2wEvjxcbDXmRSlkSRPmnCaFwJfsCDnBHADAG/9gz6kEvwW/edVxaURBcmZInTw+0YWfHBEMhBGFuAmJ0MXChpaBzivDI1ZeV1csktQRBbtnGweSmVyVYhRjyBsuLekwC2lBhE+VkEHOM1y2r6v793EO9C8FSUgOEjp5Zf4gErs1Fpngr9lTEqklerAI+FNHAMGS83MwSu3KQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBACtS0YGOHNoE1OQogaCFCXSMtvo7QfZxQFMPwrC4ugNSbrGfJptpIocCOlsoyWC6MS2KB7OiGqPjScyLeqVAa/0LKwlwLMQefkT4eqRImLcqEfydTo3adiQAGk8eOtj/IHuovMquvUhDQz4yOY2p9k4Ao0kzxM+CI/tgfRAwfQ8ZrNrTSa9b6fF5F4QuBM1qtFlsEGMZ8Dnm/2ONvY9WvmApB7UdPRl5YQCWYLyxS5Heboa0rI7myLh5JLkEP3vYcgsxPCNpZSDrtGrYO9p7cI0mJZcNsh56SUTttoEfU3rCndNSs/IhC+xCxGiKQ6ez/Ad5E77g8hU71Yt0ERPj6mE=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"070d3e63b8e34861bc9d8bfaa689e7cd"}, [
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
  '2f28879c-d7c5-4c45-a766-4172ad3ec9d5',
  'x-ms-request-id',
  'a1b2cf12-55c9-4bf8-aebe-1b9496465058',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:35:34 GMT',
  'Content-Length',
  '1338'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistcertificatesbypage-0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistcertificatesbypage-0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAxrxSr6oGfBmZr2hitPpYbSqmnHYGNbahB2VjToUv06nshL5T2CD0Ky7CPJ7SDtUUH07be2d5Uruz/zXrH7ooLq5NLMa5g5GbU20dQSCQnkijlLO3noBw+5AwGN45UPS1Z8YObRM+Ss2wEvjxcbDXmRSlkSRPmnCaFwJfsCDnBHADAG/9gz6kEvwW/edVxaURBcmZInTw+0YWfHBEMhBGFuAmJ0MXChpaBzivDI1ZeV1csktQRBbtnGweSmVyVYhRjyBsuLekwC2lBhE+VkEHOM1y2r6v793EO9C8FSUgOEjp5Zf4gErs1Fpngr9lTEqklerAI+FNHAMGS83MwSu3KQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBACtS0YGOHNoE1OQogaCFCXSMtvo7QfZxQFMPwrC4ugNSbrGfJptpIocCOlsoyWC6MS2KB7OiGqPjScyLeqVAa/0LKwlwLMQefkT4eqRImLcqEfydTo3adiQAGk8eOtj/IHuovMquvUhDQz4yOY2p9k4Ao0kzxM+CI/tgfRAwfQ8ZrNrTSa9b6fF5F4QuBM1qtFlsEGMZ8Dnm/2ONvY9WvmApB7UdPRl5YQCWYLyxS5Heboa0rI7myLh5JLkEP3vYcgsxPCNpZSDrtGrYO9p7cI0mJZcNsh56SUTttoEfU3rCndNSs/IhC+xCxGiKQ6ez/Ad5E77g8hU71Yt0ERPj6mE=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"070d3e63b8e34861bc9d8bfaa689e7cd"}, [
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
  '91f400e9-886c-4c2d-9c3c-1d03d7b1b0a1',
  'x-ms-request-id',
  'c93b06a8-76b1-4486-b833-a78d92b0b002',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:35:35 GMT',
  'Content-Length',
  '1338'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistcertificatesbypage-0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistcertificatesbypage-0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAxrxSr6oGfBmZr2hitPpYbSqmnHYGNbahB2VjToUv06nshL5T2CD0Ky7CPJ7SDtUUH07be2d5Uruz/zXrH7ooLq5NLMa5g5GbU20dQSCQnkijlLO3noBw+5AwGN45UPS1Z8YObRM+Ss2wEvjxcbDXmRSlkSRPmnCaFwJfsCDnBHADAG/9gz6kEvwW/edVxaURBcmZInTw+0YWfHBEMhBGFuAmJ0MXChpaBzivDI1ZeV1csktQRBbtnGweSmVyVYhRjyBsuLekwC2lBhE+VkEHOM1y2r6v793EO9C8FSUgOEjp5Zf4gErs1Fpngr9lTEqklerAI+FNHAMGS83MwSu3KQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBACtS0YGOHNoE1OQogaCFCXSMtvo7QfZxQFMPwrC4ugNSbrGfJptpIocCOlsoyWC6MS2KB7OiGqPjScyLeqVAa/0LKwlwLMQefkT4eqRImLcqEfydTo3adiQAGk8eOtj/IHuovMquvUhDQz4yOY2p9k4Ao0kzxM+CI/tgfRAwfQ8ZrNrTSa9b6fF5F4QuBM1qtFlsEGMZ8Dnm/2ONvY9WvmApB7UdPRl5YQCWYLyxS5Heboa0rI7myLh5JLkEP3vYcgsxPCNpZSDrtGrYO9p7cI0mJZcNsh56SUTttoEfU3rCndNSs/IhC+xCxGiKQ6ez/Ad5E77g8hU71Yt0ERPj6mE=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"070d3e63b8e34861bc9d8bfaa689e7cd"}, [
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
  '68f9554b-f371-4223-8b46-906987c87748',
  'x-ms-request-id',
  'e97dded9-47f5-4adb-8af2-137e044fec38',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:35:37 GMT',
  'Content-Length',
  '1338'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistcertificatesbypage-0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistcertificatesbypage-0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAxrxSr6oGfBmZr2hitPpYbSqmnHYGNbahB2VjToUv06nshL5T2CD0Ky7CPJ7SDtUUH07be2d5Uruz/zXrH7ooLq5NLMa5g5GbU20dQSCQnkijlLO3noBw+5AwGN45UPS1Z8YObRM+Ss2wEvjxcbDXmRSlkSRPmnCaFwJfsCDnBHADAG/9gz6kEvwW/edVxaURBcmZInTw+0YWfHBEMhBGFuAmJ0MXChpaBzivDI1ZeV1csktQRBbtnGweSmVyVYhRjyBsuLekwC2lBhE+VkEHOM1y2r6v793EO9C8FSUgOEjp5Zf4gErs1Fpngr9lTEqklerAI+FNHAMGS83MwSu3KQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBACtS0YGOHNoE1OQogaCFCXSMtvo7QfZxQFMPwrC4ugNSbrGfJptpIocCOlsoyWC6MS2KB7OiGqPjScyLeqVAa/0LKwlwLMQefkT4eqRImLcqEfydTo3adiQAGk8eOtj/IHuovMquvUhDQz4yOY2p9k4Ao0kzxM+CI/tgfRAwfQ8ZrNrTSa9b6fF5F4QuBM1qtFlsEGMZ8Dnm/2ONvY9WvmApB7UdPRl5YQCWYLyxS5Heboa0rI7myLh5JLkEP3vYcgsxPCNpZSDrtGrYO9p7cI0mJZcNsh56SUTttoEfU3rCndNSs/IhC+xCxGiKQ6ez/Ad5E77g8hU71Yt0ERPj6mE=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"070d3e63b8e34861bc9d8bfaa689e7cd"}, [
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
  '2dca6224-e3f6-41f9-b7aa-f2a7049875e3',
  'x-ms-request-id',
  '18f85410-6a25-466a-9290-5b7be14ec73c',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:35:39 GMT',
  'Content-Length',
  '1338'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistcertificatesbypage-0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistcertificatesbypage-0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAxrxSr6oGfBmZr2hitPpYbSqmnHYGNbahB2VjToUv06nshL5T2CD0Ky7CPJ7SDtUUH07be2d5Uruz/zXrH7ooLq5NLMa5g5GbU20dQSCQnkijlLO3noBw+5AwGN45UPS1Z8YObRM+Ss2wEvjxcbDXmRSlkSRPmnCaFwJfsCDnBHADAG/9gz6kEvwW/edVxaURBcmZInTw+0YWfHBEMhBGFuAmJ0MXChpaBzivDI1ZeV1csktQRBbtnGweSmVyVYhRjyBsuLekwC2lBhE+VkEHOM1y2r6v793EO9C8FSUgOEjp5Zf4gErs1Fpngr9lTEqklerAI+FNHAMGS83MwSu3KQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBACtS0YGOHNoE1OQogaCFCXSMtvo7QfZxQFMPwrC4ugNSbrGfJptpIocCOlsoyWC6MS2KB7OiGqPjScyLeqVAa/0LKwlwLMQefkT4eqRImLcqEfydTo3adiQAGk8eOtj/IHuovMquvUhDQz4yOY2p9k4Ao0kzxM+CI/tgfRAwfQ8ZrNrTSa9b6fF5F4QuBM1qtFlsEGMZ8Dnm/2ONvY9WvmApB7UdPRl5YQCWYLyxS5Heboa0rI7myLh5JLkEP3vYcgsxPCNpZSDrtGrYO9p7cI0mJZcNsh56SUTttoEfU3rCndNSs/IhC+xCxGiKQ6ez/Ad5E77g8hU71Yt0ERPj6mE=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"070d3e63b8e34861bc9d8bfaa689e7cd"}, [
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
  '7fae4420-0129-498f-9477-26ff71e7e5cb',
  'x-ms-request-id',
  '3a8329c6-2492-4665-b1ee-8405bfc53f82',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:35:41 GMT',
  'Content-Length',
  '1338'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistcertificatesbypage-0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistcertificatesbypage-0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAxrxSr6oGfBmZr2hitPpYbSqmnHYGNbahB2VjToUv06nshL5T2CD0Ky7CPJ7SDtUUH07be2d5Uruz/zXrH7ooLq5NLMa5g5GbU20dQSCQnkijlLO3noBw+5AwGN45UPS1Z8YObRM+Ss2wEvjxcbDXmRSlkSRPmnCaFwJfsCDnBHADAG/9gz6kEvwW/edVxaURBcmZInTw+0YWfHBEMhBGFuAmJ0MXChpaBzivDI1ZeV1csktQRBbtnGweSmVyVYhRjyBsuLekwC2lBhE+VkEHOM1y2r6v793EO9C8FSUgOEjp5Zf4gErs1Fpngr9lTEqklerAI+FNHAMGS83MwSu3KQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBACtS0YGOHNoE1OQogaCFCXSMtvo7QfZxQFMPwrC4ugNSbrGfJptpIocCOlsoyWC6MS2KB7OiGqPjScyLeqVAa/0LKwlwLMQefkT4eqRImLcqEfydTo3adiQAGk8eOtj/IHuovMquvUhDQz4yOY2p9k4Ao0kzxM+CI/tgfRAwfQ8ZrNrTSa9b6fF5F4QuBM1qtFlsEGMZ8Dnm/2ONvY9WvmApB7UdPRl5YQCWYLyxS5Heboa0rI7myLh5JLkEP3vYcgsxPCNpZSDrtGrYO9p7cI0mJZcNsh56SUTttoEfU3rCndNSs/IhC+xCxGiKQ6ez/Ad5E77g8hU71Yt0ERPj6mE=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"070d3e63b8e34861bc9d8bfaa689e7cd"}, [
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
  '97b1f687-a94e-4747-9407-9b868ddbe208',
  'x-ms-request-id',
  '84edb338-96e5-47aa-b3dc-89568a16fe08',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:35:44 GMT',
  'Content-Length',
  '1338'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistcertificatesbypage-0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistcertificatesbypage-0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAxrxSr6oGfBmZr2hitPpYbSqmnHYGNbahB2VjToUv06nshL5T2CD0Ky7CPJ7SDtUUH07be2d5Uruz/zXrH7ooLq5NLMa5g5GbU20dQSCQnkijlLO3noBw+5AwGN45UPS1Z8YObRM+Ss2wEvjxcbDXmRSlkSRPmnCaFwJfsCDnBHADAG/9gz6kEvwW/edVxaURBcmZInTw+0YWfHBEMhBGFuAmJ0MXChpaBzivDI1ZeV1csktQRBbtnGweSmVyVYhRjyBsuLekwC2lBhE+VkEHOM1y2r6v793EO9C8FSUgOEjp5Zf4gErs1Fpngr9lTEqklerAI+FNHAMGS83MwSu3KQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBACtS0YGOHNoE1OQogaCFCXSMtvo7QfZxQFMPwrC4ugNSbrGfJptpIocCOlsoyWC6MS2KB7OiGqPjScyLeqVAa/0LKwlwLMQefkT4eqRImLcqEfydTo3adiQAGk8eOtj/IHuovMquvUhDQz4yOY2p9k4Ao0kzxM+CI/tgfRAwfQ8ZrNrTSa9b6fF5F4QuBM1qtFlsEGMZ8Dnm/2ONvY9WvmApB7UdPRl5YQCWYLyxS5Heboa0rI7myLh5JLkEP3vYcgsxPCNpZSDrtGrYO9p7cI0mJZcNsh56SUTttoEfU3rCndNSs/IhC+xCxGiKQ6ez/Ad5E77g8hU71Yt0ERPj6mE=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"070d3e63b8e34861bc9d8bfaa689e7cd"}, [
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
  '4944a0a5-f350-45b1-a92d-d2fa7a479f96',
  'x-ms-request-id',
  '370ccc5f-1135-4186-8ad4-202b6add134b',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:35:46 GMT',
  'Content-Length',
  '1338'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistcertificatesbypage-0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistcertificatesbypage-0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAxrxSr6oGfBmZr2hitPpYbSqmnHYGNbahB2VjToUv06nshL5T2CD0Ky7CPJ7SDtUUH07be2d5Uruz/zXrH7ooLq5NLMa5g5GbU20dQSCQnkijlLO3noBw+5AwGN45UPS1Z8YObRM+Ss2wEvjxcbDXmRSlkSRPmnCaFwJfsCDnBHADAG/9gz6kEvwW/edVxaURBcmZInTw+0YWfHBEMhBGFuAmJ0MXChpaBzivDI1ZeV1csktQRBbtnGweSmVyVYhRjyBsuLekwC2lBhE+VkEHOM1y2r6v793EO9C8FSUgOEjp5Zf4gErs1Fpngr9lTEqklerAI+FNHAMGS83MwSu3KQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBACtS0YGOHNoE1OQogaCFCXSMtvo7QfZxQFMPwrC4ugNSbrGfJptpIocCOlsoyWC6MS2KB7OiGqPjScyLeqVAa/0LKwlwLMQefkT4eqRImLcqEfydTo3adiQAGk8eOtj/IHuovMquvUhDQz4yOY2p9k4Ao0kzxM+CI/tgfRAwfQ8ZrNrTSa9b6fF5F4QuBM1qtFlsEGMZ8Dnm/2ONvY9WvmApB7UdPRl5YQCWYLyxS5Heboa0rI7myLh5JLkEP3vYcgsxPCNpZSDrtGrYO9p7cI0mJZcNsh56SUTttoEfU3rCndNSs/IhC+xCxGiKQ6ez/Ad5E77g8hU71Yt0ERPj6mE=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"070d3e63b8e34861bc9d8bfaa689e7cd"}, [
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
  '5cdc2bd4-2eb2-443d-a3df-ad3942d08b5a',
  'x-ms-request-id',
  'dd1b5255-edc0-422d-b2a5-89d2dc9140e4',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:35:47 GMT',
  'Content-Length',
  '1338'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistcertificatesbypage-0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistcertificatesbypage-0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAxrxSr6oGfBmZr2hitPpYbSqmnHYGNbahB2VjToUv06nshL5T2CD0Ky7CPJ7SDtUUH07be2d5Uruz/zXrH7ooLq5NLMa5g5GbU20dQSCQnkijlLO3noBw+5AwGN45UPS1Z8YObRM+Ss2wEvjxcbDXmRSlkSRPmnCaFwJfsCDnBHADAG/9gz6kEvwW/edVxaURBcmZInTw+0YWfHBEMhBGFuAmJ0MXChpaBzivDI1ZeV1csktQRBbtnGweSmVyVYhRjyBsuLekwC2lBhE+VkEHOM1y2r6v793EO9C8FSUgOEjp5Zf4gErs1Fpngr9lTEqklerAI+FNHAMGS83MwSu3KQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBACtS0YGOHNoE1OQogaCFCXSMtvo7QfZxQFMPwrC4ugNSbrGfJptpIocCOlsoyWC6MS2KB7OiGqPjScyLeqVAa/0LKwlwLMQefkT4eqRImLcqEfydTo3adiQAGk8eOtj/IHuovMquvUhDQz4yOY2p9k4Ao0kzxM+CI/tgfRAwfQ8ZrNrTSa9b6fF5F4QuBM1qtFlsEGMZ8Dnm/2ONvY9WvmApB7UdPRl5YQCWYLyxS5Heboa0rI7myLh5JLkEP3vYcgsxPCNpZSDrtGrYO9p7cI0mJZcNsh56SUTttoEfU3rCndNSs/IhC+xCxGiKQ6ez/Ad5E77g8hU71Yt0ERPj6mE=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"070d3e63b8e34861bc9d8bfaa689e7cd"}, [
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
  'aa8ab985-37f6-4fca-a384-e657e6c331df',
  'x-ms-request-id',
  '4412d480-103e-4ab4-a88d-bd3653fb2088',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:35:50 GMT',
  'Content-Length',
  '1338'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistcertificatesbypage-0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistcertificatesbypage-0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAxrxSr6oGfBmZr2hitPpYbSqmnHYGNbahB2VjToUv06nshL5T2CD0Ky7CPJ7SDtUUH07be2d5Uruz/zXrH7ooLq5NLMa5g5GbU20dQSCQnkijlLO3noBw+5AwGN45UPS1Z8YObRM+Ss2wEvjxcbDXmRSlkSRPmnCaFwJfsCDnBHADAG/9gz6kEvwW/edVxaURBcmZInTw+0YWfHBEMhBGFuAmJ0MXChpaBzivDI1ZeV1csktQRBbtnGweSmVyVYhRjyBsuLekwC2lBhE+VkEHOM1y2r6v793EO9C8FSUgOEjp5Zf4gErs1Fpngr9lTEqklerAI+FNHAMGS83MwSu3KQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBACtS0YGOHNoE1OQogaCFCXSMtvo7QfZxQFMPwrC4ugNSbrGfJptpIocCOlsoyWC6MS2KB7OiGqPjScyLeqVAa/0LKwlwLMQefkT4eqRImLcqEfydTo3adiQAGk8eOtj/IHuovMquvUhDQz4yOY2p9k4Ao0kzxM+CI/tgfRAwfQ8ZrNrTSa9b6fF5F4QuBM1qtFlsEGMZ8Dnm/2ONvY9WvmApB7UdPRl5YQCWYLyxS5Heboa0rI7myLh5JLkEP3vYcgsxPCNpZSDrtGrYO9p7cI0mJZcNsh56SUTttoEfU3rCndNSs/IhC+xCxGiKQ6ez/Ad5E77g8hU71Yt0ERPj6mE=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"070d3e63b8e34861bc9d8bfaa689e7cd"}, [
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
  '62c27da9-a32d-4e7b-8985-4765067d2a91',
  'x-ms-request-id',
  'f8a53a95-4195-4746-b7a8-0adcda77cf96',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:35:52 GMT',
  'Content-Length',
  '1338'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistcertificatesbypage-0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistcertificatesbypage-0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAxrxSr6oGfBmZr2hitPpYbSqmnHYGNbahB2VjToUv06nshL5T2CD0Ky7CPJ7SDtUUH07be2d5Uruz/zXrH7ooLq5NLMa5g5GbU20dQSCQnkijlLO3noBw+5AwGN45UPS1Z8YObRM+Ss2wEvjxcbDXmRSlkSRPmnCaFwJfsCDnBHADAG/9gz6kEvwW/edVxaURBcmZInTw+0YWfHBEMhBGFuAmJ0MXChpaBzivDI1ZeV1csktQRBbtnGweSmVyVYhRjyBsuLekwC2lBhE+VkEHOM1y2r6v793EO9C8FSUgOEjp5Zf4gErs1Fpngr9lTEqklerAI+FNHAMGS83MwSu3KQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBACtS0YGOHNoE1OQogaCFCXSMtvo7QfZxQFMPwrC4ugNSbrGfJptpIocCOlsoyWC6MS2KB7OiGqPjScyLeqVAa/0LKwlwLMQefkT4eqRImLcqEfydTo3adiQAGk8eOtj/IHuovMquvUhDQz4yOY2p9k4Ao0kzxM+CI/tgfRAwfQ8ZrNrTSa9b6fF5F4QuBM1qtFlsEGMZ8Dnm/2ONvY9WvmApB7UdPRl5YQCWYLyxS5Heboa0rI7myLh5JLkEP3vYcgsxPCNpZSDrtGrYO9p7cI0mJZcNsh56SUTttoEfU3rCndNSs/IhC+xCxGiKQ6ez/Ad5E77g8hU71Yt0ERPj6mE=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"070d3e63b8e34861bc9d8bfaa689e7cd"}, [
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
  '1f974600-8c63-48ff-9725-4de1b0d45040',
  'x-ms-request-id',
  '1b9adddb-a91a-4e40-8b79-cf9c52e39103',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:35:54 GMT',
  'Content-Length',
  '1338'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistcertificatesbypage-0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistcertificatesbypage-0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAxrxSr6oGfBmZr2hitPpYbSqmnHYGNbahB2VjToUv06nshL5T2CD0Ky7CPJ7SDtUUH07be2d5Uruz/zXrH7ooLq5NLMa5g5GbU20dQSCQnkijlLO3noBw+5AwGN45UPS1Z8YObRM+Ss2wEvjxcbDXmRSlkSRPmnCaFwJfsCDnBHADAG/9gz6kEvwW/edVxaURBcmZInTw+0YWfHBEMhBGFuAmJ0MXChpaBzivDI1ZeV1csktQRBbtnGweSmVyVYhRjyBsuLekwC2lBhE+VkEHOM1y2r6v793EO9C8FSUgOEjp5Zf4gErs1Fpngr9lTEqklerAI+FNHAMGS83MwSu3KQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBACtS0YGOHNoE1OQogaCFCXSMtvo7QfZxQFMPwrC4ugNSbrGfJptpIocCOlsoyWC6MS2KB7OiGqPjScyLeqVAa/0LKwlwLMQefkT4eqRImLcqEfydTo3adiQAGk8eOtj/IHuovMquvUhDQz4yOY2p9k4Ao0kzxM+CI/tgfRAwfQ8ZrNrTSa9b6fF5F4QuBM1qtFlsEGMZ8Dnm/2ONvY9WvmApB7UdPRl5YQCWYLyxS5Heboa0rI7myLh5JLkEP3vYcgsxPCNpZSDrtGrYO9p7cI0mJZcNsh56SUTttoEfU3rCndNSs/IhC+xCxGiKQ6ez/Ad5E77g8hU71Yt0ERPj6mE=","cancellation_requested":false,"status":"completed","target":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistcertificatesbypage-0","request_id":"070d3e63b8e34861bc9d8bfaa689e7cd"}, [
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
  '31d31bdd-c49b-4d56-afa3-500ee2ac51fb',
  'x-ms-request-id',
  'b8eba8fe-31e7-4e3f-905c-1d2f647a3a42',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:35:56 GMT',
  'Content-Length',
  '1303'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistcertificatesbypage-0/')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistcertificatesbypage-0/00959cf387174b8d8a09cfff90eab30c","kid":"https://keyvault_name.vault.azure.net/keys/listCertificateName-canlistcertificatesbypage-0/00959cf387174b8d8a09cfff90eab30c","sid":"https://keyvault_name.vault.azure.net/secrets/listCertificateName-canlistcertificatesbypage-0/00959cf387174b8d8a09cfff90eab30c","x5t":"c6yT8DBTTyam36tlOFLIEjLBAC0","cer":"MIIDKDCCAhCgAwIBAgIQRT1mqvmISwKMh0BYoa4gCzANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjEwNDI4MjIyNTU0WhcNMjIwNDI4MjIzNTU0WjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQDGvFKvqgZ8GZmvaGK0+lhtKqacdgY1tqEHZWNOhS/TqeyEvlPYIPQrLsI8ntIO1RQfTtt7Z3lSu7P/Nesfuigurk0sxrmDkZtTbR1BIJCeSKOUs7eegHD7kDAY3jlQ9LVnxg5tEz5KzbAS+PFxsNeZFKWRJE+acJoXAl+wIOcEcAMAb/2DPqQS/Bb951XFpREFyZkidPD7RhZ8cEQyEEYW4CYnQxcKGloHOK8MjVl5XVyyS1BEFu2cbB5KZXJViFGPIGy4t6TALaUGET5WQQc4zXLavq/v3cQ70LwVJSA4SOnll/iASuzUWmeCv2VMSqSV6sAj4U0cAwZLzczBK7cpAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBS5iZXYLLPGgcijBOBjt2qJyMjdQzAdBgNVHQ4EFgQUuYmV2CyzxoHIowTgY7dqicjI3UMwDQYJKoZIhvcNAQELBQADggEBAL+uj+hWzWq0C4885Hk04L4oOXawgW2ir1c9bydPohbCuOg66EZ1H+e56fSLxW5WBNfRL24QPZIIxp2XUB3ZLuK6VbQSrAWy9scblTG2iOnfEF/4IL8Jo1vQ75iZiHkP7HH9iqe77jUlwnpFgqkuy4moLNpG7ygUV4ja5GHEi+SzsbTPapjZirti/xN57IWbixbbvkkyMR6hMS6QdPKCObXiC6na0CGJIp2qTwrtToMG/juCICHWHqAp5VhA8pOoiiqyJw3hs/N453lG9X0NvwmylaYi2DqwymCnL/+x50MVWV9eHno3nexxJDtoiYpCNL3DEoc0WUjsuvSL8qy3Ry8=","attributes":{"enabled":true,"nbf":1619648754,"exp":1651185354,"created":1619649354,"updated":1619649354,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistcertificatesbypage-0/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1619649291,"updated":1619649291}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistcertificatesbypage-0/pending"}}, [
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
  '53c61003-befb-4fbb-aa85-1754919348d6',
  'x-ms-request-id',
  '249de695-a769-401a-8f65-3f9cfd08e636',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:35:56 GMT',
  'Content-Length',
  '2580'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/certificates/listCertificateName-canlistcertificatesbypage-1/create', {"policy":{"key_props":{},"secret_props":{},"x509_props":{"subject":"cn=MyCert","sans":{}},"issuer":{"name":"Self"},"attributes":{}},"attributes":{}})
  .query(true)
  .reply(202, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistcertificatesbypage-1/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAyDKurmraccZmvWZ/rnwKKnzCjpyx9BDlQToUKMYB8qOcEJYxfZ5vwiwtT3z9IhspO4iOT0jgiZ68JZcKGALnFG65wnwoNpfFiHGwTPxZc9jF1BZ3u0HOWV4OSp+PGpisKA5sDhUEP18El7hmCCAOWUDSJYNVvBylUbineC7TZnLaZXxfjfooPOmGxdQI9DQMHDCn3r4kQmMGw3HF/699J0/vrwPBqQE2Sa0k5b3teVcbHugT3HpQXAUnD5fg0zmkKIGZqn9nEMeh9JQmuL63dJRKoBOJSy9x89DuiFj4cT3OQK7rgn7JJOFzRCAeh/gxW+/G8v3Ihr8J5mrb+panLQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAJDRwhCUPhMir86m3DUolGf6W/95uPN3eX4zrUSmkBID/rMBlbgxg8tbmRMaVI7sp+yqx0LbYYXSUMQ1TfOT7BT2KCrpJ4wx/r+NV9EAi+PS97cS4Gqlc+R7eXe+OU0w1GPGSckbCX5K2o6rA8tOxPXGm5uVtnJl0z6jj9JC2HQ55PAA0529JFJhjPfgvibU0jK7ftUD9EIWd1aC4T42UmSIPSeJpLISEk4slyXOnzZ/jmAQBcISsh2e2JCwZ3TtoDgZRX9E2Lvyj8c94GJfo0nsZjj0Ed5t2GdbBo3qjdYNSJoIWudTK76kBTQBNF1dJs3jHPnWt8099JAwu4rTK+k=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"7392eecefd004eb2a88cbf6e3f809e8f"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistcertificatesbypage-1/pending?api-version=7.2&request_id=7392eecefd004eb2a88cbf6e3f809e8f',
  'Retry-After',
  '0',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'de2a02ac-16e5-4e72-8d74-516dac3d3cb7',
  'x-ms-request-id',
  'b84e31af-3e82-47d6-ad2f-a41231898d08',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:35:57 GMT',
  'Content-Length',
  '1338'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistcertificatesbypage-1/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistcertificatesbypage-1/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAyDKurmraccZmvWZ/rnwKKnzCjpyx9BDlQToUKMYB8qOcEJYxfZ5vwiwtT3z9IhspO4iOT0jgiZ68JZcKGALnFG65wnwoNpfFiHGwTPxZc9jF1BZ3u0HOWV4OSp+PGpisKA5sDhUEP18El7hmCCAOWUDSJYNVvBylUbineC7TZnLaZXxfjfooPOmGxdQI9DQMHDCn3r4kQmMGw3HF/699J0/vrwPBqQE2Sa0k5b3teVcbHugT3HpQXAUnD5fg0zmkKIGZqn9nEMeh9JQmuL63dJRKoBOJSy9x89DuiFj4cT3OQK7rgn7JJOFzRCAeh/gxW+/G8v3Ihr8J5mrb+panLQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAJDRwhCUPhMir86m3DUolGf6W/95uPN3eX4zrUSmkBID/rMBlbgxg8tbmRMaVI7sp+yqx0LbYYXSUMQ1TfOT7BT2KCrpJ4wx/r+NV9EAi+PS97cS4Gqlc+R7eXe+OU0w1GPGSckbCX5K2o6rA8tOxPXGm5uVtnJl0z6jj9JC2HQ55PAA0529JFJhjPfgvibU0jK7ftUD9EIWd1aC4T42UmSIPSeJpLISEk4slyXOnzZ/jmAQBcISsh2e2JCwZ3TtoDgZRX9E2Lvyj8c94GJfo0nsZjj0Ed5t2GdbBo3qjdYNSJoIWudTK76kBTQBNF1dJs3jHPnWt8099JAwu4rTK+k=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"7392eecefd004eb2a88cbf6e3f809e8f"}, [
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
  'f180eb3b-8f04-44cb-bff1-28fa523a4a7a',
  'x-ms-request-id',
  'da97068e-ef47-4632-a891-b53b6feaa5aa',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:35:57 GMT',
  'Content-Length',
  '1338'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistcertificatesbypage-1/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistcertificatesbypage-1/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAyDKurmraccZmvWZ/rnwKKnzCjpyx9BDlQToUKMYB8qOcEJYxfZ5vwiwtT3z9IhspO4iOT0jgiZ68JZcKGALnFG65wnwoNpfFiHGwTPxZc9jF1BZ3u0HOWV4OSp+PGpisKA5sDhUEP18El7hmCCAOWUDSJYNVvBylUbineC7TZnLaZXxfjfooPOmGxdQI9DQMHDCn3r4kQmMGw3HF/699J0/vrwPBqQE2Sa0k5b3teVcbHugT3HpQXAUnD5fg0zmkKIGZqn9nEMeh9JQmuL63dJRKoBOJSy9x89DuiFj4cT3OQK7rgn7JJOFzRCAeh/gxW+/G8v3Ihr8J5mrb+panLQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAJDRwhCUPhMir86m3DUolGf6W/95uPN3eX4zrUSmkBID/rMBlbgxg8tbmRMaVI7sp+yqx0LbYYXSUMQ1TfOT7BT2KCrpJ4wx/r+NV9EAi+PS97cS4Gqlc+R7eXe+OU0w1GPGSckbCX5K2o6rA8tOxPXGm5uVtnJl0z6jj9JC2HQ55PAA0529JFJhjPfgvibU0jK7ftUD9EIWd1aC4T42UmSIPSeJpLISEk4slyXOnzZ/jmAQBcISsh2e2JCwZ3TtoDgZRX9E2Lvyj8c94GJfo0nsZjj0Ed5t2GdbBo3qjdYNSJoIWudTK76kBTQBNF1dJs3jHPnWt8099JAwu4rTK+k=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"7392eecefd004eb2a88cbf6e3f809e8f"}, [
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
  'cab646b4-d9aa-4a50-899e-6a40d5509eb5',
  'x-ms-request-id',
  '1cd87814-bbe0-470f-a77e-ebd501748c74',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:35:57 GMT',
  'Content-Length',
  '1338'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistcertificatesbypage-1/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistcertificatesbypage-1/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAyDKurmraccZmvWZ/rnwKKnzCjpyx9BDlQToUKMYB8qOcEJYxfZ5vwiwtT3z9IhspO4iOT0jgiZ68JZcKGALnFG65wnwoNpfFiHGwTPxZc9jF1BZ3u0HOWV4OSp+PGpisKA5sDhUEP18El7hmCCAOWUDSJYNVvBylUbineC7TZnLaZXxfjfooPOmGxdQI9DQMHDCn3r4kQmMGw3HF/699J0/vrwPBqQE2Sa0k5b3teVcbHugT3HpQXAUnD5fg0zmkKIGZqn9nEMeh9JQmuL63dJRKoBOJSy9x89DuiFj4cT3OQK7rgn7JJOFzRCAeh/gxW+/G8v3Ihr8J5mrb+panLQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAJDRwhCUPhMir86m3DUolGf6W/95uPN3eX4zrUSmkBID/rMBlbgxg8tbmRMaVI7sp+yqx0LbYYXSUMQ1TfOT7BT2KCrpJ4wx/r+NV9EAi+PS97cS4Gqlc+R7eXe+OU0w1GPGSckbCX5K2o6rA8tOxPXGm5uVtnJl0z6jj9JC2HQ55PAA0529JFJhjPfgvibU0jK7ftUD9EIWd1aC4T42UmSIPSeJpLISEk4slyXOnzZ/jmAQBcISsh2e2JCwZ3TtoDgZRX9E2Lvyj8c94GJfo0nsZjj0Ed5t2GdbBo3qjdYNSJoIWudTK76kBTQBNF1dJs3jHPnWt8099JAwu4rTK+k=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"7392eecefd004eb2a88cbf6e3f809e8f"}, [
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
  'b74f7407-fca5-466c-b90d-bc5c5bfdc14e',
  'x-ms-request-id',
  'a1a56177-3f53-4f6b-818d-fc01873bebcc',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:36:00 GMT',
  'Content-Length',
  '1338'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistcertificatesbypage-1/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistcertificatesbypage-1/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAyDKurmraccZmvWZ/rnwKKnzCjpyx9BDlQToUKMYB8qOcEJYxfZ5vwiwtT3z9IhspO4iOT0jgiZ68JZcKGALnFG65wnwoNpfFiHGwTPxZc9jF1BZ3u0HOWV4OSp+PGpisKA5sDhUEP18El7hmCCAOWUDSJYNVvBylUbineC7TZnLaZXxfjfooPOmGxdQI9DQMHDCn3r4kQmMGw3HF/699J0/vrwPBqQE2Sa0k5b3teVcbHugT3HpQXAUnD5fg0zmkKIGZqn9nEMeh9JQmuL63dJRKoBOJSy9x89DuiFj4cT3OQK7rgn7JJOFzRCAeh/gxW+/G8v3Ihr8J5mrb+panLQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAJDRwhCUPhMir86m3DUolGf6W/95uPN3eX4zrUSmkBID/rMBlbgxg8tbmRMaVI7sp+yqx0LbYYXSUMQ1TfOT7BT2KCrpJ4wx/r+NV9EAi+PS97cS4Gqlc+R7eXe+OU0w1GPGSckbCX5K2o6rA8tOxPXGm5uVtnJl0z6jj9JC2HQ55PAA0529JFJhjPfgvibU0jK7ftUD9EIWd1aC4T42UmSIPSeJpLISEk4slyXOnzZ/jmAQBcISsh2e2JCwZ3TtoDgZRX9E2Lvyj8c94GJfo0nsZjj0Ed5t2GdbBo3qjdYNSJoIWudTK76kBTQBNF1dJs3jHPnWt8099JAwu4rTK+k=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"7392eecefd004eb2a88cbf6e3f809e8f"}, [
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
  'fd405424-307a-4aac-a296-1eeaef8f9d1b',
  'x-ms-request-id',
  '7f6e3e29-1744-469d-8ead-09036a840c55',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:36:01 GMT',
  'Content-Length',
  '1338'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistcertificatesbypage-1/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistcertificatesbypage-1/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAyDKurmraccZmvWZ/rnwKKnzCjpyx9BDlQToUKMYB8qOcEJYxfZ5vwiwtT3z9IhspO4iOT0jgiZ68JZcKGALnFG65wnwoNpfFiHGwTPxZc9jF1BZ3u0HOWV4OSp+PGpisKA5sDhUEP18El7hmCCAOWUDSJYNVvBylUbineC7TZnLaZXxfjfooPOmGxdQI9DQMHDCn3r4kQmMGw3HF/699J0/vrwPBqQE2Sa0k5b3teVcbHugT3HpQXAUnD5fg0zmkKIGZqn9nEMeh9JQmuL63dJRKoBOJSy9x89DuiFj4cT3OQK7rgn7JJOFzRCAeh/gxW+/G8v3Ihr8J5mrb+panLQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAJDRwhCUPhMir86m3DUolGf6W/95uPN3eX4zrUSmkBID/rMBlbgxg8tbmRMaVI7sp+yqx0LbYYXSUMQ1TfOT7BT2KCrpJ4wx/r+NV9EAi+PS97cS4Gqlc+R7eXe+OU0w1GPGSckbCX5K2o6rA8tOxPXGm5uVtnJl0z6jj9JC2HQ55PAA0529JFJhjPfgvibU0jK7ftUD9EIWd1aC4T42UmSIPSeJpLISEk4slyXOnzZ/jmAQBcISsh2e2JCwZ3TtoDgZRX9E2Lvyj8c94GJfo0nsZjj0Ed5t2GdbBo3qjdYNSJoIWudTK76kBTQBNF1dJs3jHPnWt8099JAwu4rTK+k=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"7392eecefd004eb2a88cbf6e3f809e8f"}, [
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
  'e1fa9fe0-1ef5-4d93-a0ec-be26c205b3b3',
  'x-ms-request-id',
  'f1f5241c-b9d7-4361-9a82-515c7b7cf933',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:36:03 GMT',
  'Content-Length',
  '1338'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistcertificatesbypage-1/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistcertificatesbypage-1/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAyDKurmraccZmvWZ/rnwKKnzCjpyx9BDlQToUKMYB8qOcEJYxfZ5vwiwtT3z9IhspO4iOT0jgiZ68JZcKGALnFG65wnwoNpfFiHGwTPxZc9jF1BZ3u0HOWV4OSp+PGpisKA5sDhUEP18El7hmCCAOWUDSJYNVvBylUbineC7TZnLaZXxfjfooPOmGxdQI9DQMHDCn3r4kQmMGw3HF/699J0/vrwPBqQE2Sa0k5b3teVcbHugT3HpQXAUnD5fg0zmkKIGZqn9nEMeh9JQmuL63dJRKoBOJSy9x89DuiFj4cT3OQK7rgn7JJOFzRCAeh/gxW+/G8v3Ihr8J5mrb+panLQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAJDRwhCUPhMir86m3DUolGf6W/95uPN3eX4zrUSmkBID/rMBlbgxg8tbmRMaVI7sp+yqx0LbYYXSUMQ1TfOT7BT2KCrpJ4wx/r+NV9EAi+PS97cS4Gqlc+R7eXe+OU0w1GPGSckbCX5K2o6rA8tOxPXGm5uVtnJl0z6jj9JC2HQ55PAA0529JFJhjPfgvibU0jK7ftUD9EIWd1aC4T42UmSIPSeJpLISEk4slyXOnzZ/jmAQBcISsh2e2JCwZ3TtoDgZRX9E2Lvyj8c94GJfo0nsZjj0Ed5t2GdbBo3qjdYNSJoIWudTK76kBTQBNF1dJs3jHPnWt8099JAwu4rTK+k=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"7392eecefd004eb2a88cbf6e3f809e8f"}, [
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
  '8e807259-0517-4de5-9647-11b7366f23c7',
  'x-ms-request-id',
  '731c3c34-1ed9-4162-ab70-982a8e15957a',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:36:05 GMT',
  'Content-Length',
  '1338'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistcertificatesbypage-1/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistcertificatesbypage-1/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAyDKurmraccZmvWZ/rnwKKnzCjpyx9BDlQToUKMYB8qOcEJYxfZ5vwiwtT3z9IhspO4iOT0jgiZ68JZcKGALnFG65wnwoNpfFiHGwTPxZc9jF1BZ3u0HOWV4OSp+PGpisKA5sDhUEP18El7hmCCAOWUDSJYNVvBylUbineC7TZnLaZXxfjfooPOmGxdQI9DQMHDCn3r4kQmMGw3HF/699J0/vrwPBqQE2Sa0k5b3teVcbHugT3HpQXAUnD5fg0zmkKIGZqn9nEMeh9JQmuL63dJRKoBOJSy9x89DuiFj4cT3OQK7rgn7JJOFzRCAeh/gxW+/G8v3Ihr8J5mrb+panLQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAJDRwhCUPhMir86m3DUolGf6W/95uPN3eX4zrUSmkBID/rMBlbgxg8tbmRMaVI7sp+yqx0LbYYXSUMQ1TfOT7BT2KCrpJ4wx/r+NV9EAi+PS97cS4Gqlc+R7eXe+OU0w1GPGSckbCX5K2o6rA8tOxPXGm5uVtnJl0z6jj9JC2HQ55PAA0529JFJhjPfgvibU0jK7ftUD9EIWd1aC4T42UmSIPSeJpLISEk4slyXOnzZ/jmAQBcISsh2e2JCwZ3TtoDgZRX9E2Lvyj8c94GJfo0nsZjj0Ed5t2GdbBo3qjdYNSJoIWudTK76kBTQBNF1dJs3jHPnWt8099JAwu4rTK+k=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"7392eecefd004eb2a88cbf6e3f809e8f"}, [
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
  '631676d1-6c79-432e-ae62-85104e6b456f',
  'x-ms-request-id',
  '18377b88-869e-4d27-8739-75e62c1274f0',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:36:08 GMT',
  'Content-Length',
  '1338'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistcertificatesbypage-1/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistcertificatesbypage-1/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAyDKurmraccZmvWZ/rnwKKnzCjpyx9BDlQToUKMYB8qOcEJYxfZ5vwiwtT3z9IhspO4iOT0jgiZ68JZcKGALnFG65wnwoNpfFiHGwTPxZc9jF1BZ3u0HOWV4OSp+PGpisKA5sDhUEP18El7hmCCAOWUDSJYNVvBylUbineC7TZnLaZXxfjfooPOmGxdQI9DQMHDCn3r4kQmMGw3HF/699J0/vrwPBqQE2Sa0k5b3teVcbHugT3HpQXAUnD5fg0zmkKIGZqn9nEMeh9JQmuL63dJRKoBOJSy9x89DuiFj4cT3OQK7rgn7JJOFzRCAeh/gxW+/G8v3Ihr8J5mrb+panLQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAJDRwhCUPhMir86m3DUolGf6W/95uPN3eX4zrUSmkBID/rMBlbgxg8tbmRMaVI7sp+yqx0LbYYXSUMQ1TfOT7BT2KCrpJ4wx/r+NV9EAi+PS97cS4Gqlc+R7eXe+OU0w1GPGSckbCX5K2o6rA8tOxPXGm5uVtnJl0z6jj9JC2HQ55PAA0529JFJhjPfgvibU0jK7ftUD9EIWd1aC4T42UmSIPSeJpLISEk4slyXOnzZ/jmAQBcISsh2e2JCwZ3TtoDgZRX9E2Lvyj8c94GJfo0nsZjj0Ed5t2GdbBo3qjdYNSJoIWudTK76kBTQBNF1dJs3jHPnWt8099JAwu4rTK+k=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"7392eecefd004eb2a88cbf6e3f809e8f"}, [
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
  '401838f8-7dae-4473-b663-f83ab727de91',
  'x-ms-request-id',
  '7ac34883-ef6c-4f11-bd0c-6befe0d6e7f8',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:36:10 GMT',
  'Content-Length',
  '1338'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistcertificatesbypage-1/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistcertificatesbypage-1/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAyDKurmraccZmvWZ/rnwKKnzCjpyx9BDlQToUKMYB8qOcEJYxfZ5vwiwtT3z9IhspO4iOT0jgiZ68JZcKGALnFG65wnwoNpfFiHGwTPxZc9jF1BZ3u0HOWV4OSp+PGpisKA5sDhUEP18El7hmCCAOWUDSJYNVvBylUbineC7TZnLaZXxfjfooPOmGxdQI9DQMHDCn3r4kQmMGw3HF/699J0/vrwPBqQE2Sa0k5b3teVcbHugT3HpQXAUnD5fg0zmkKIGZqn9nEMeh9JQmuL63dJRKoBOJSy9x89DuiFj4cT3OQK7rgn7JJOFzRCAeh/gxW+/G8v3Ihr8J5mrb+panLQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAJDRwhCUPhMir86m3DUolGf6W/95uPN3eX4zrUSmkBID/rMBlbgxg8tbmRMaVI7sp+yqx0LbYYXSUMQ1TfOT7BT2KCrpJ4wx/r+NV9EAi+PS97cS4Gqlc+R7eXe+OU0w1GPGSckbCX5K2o6rA8tOxPXGm5uVtnJl0z6jj9JC2HQ55PAA0529JFJhjPfgvibU0jK7ftUD9EIWd1aC4T42UmSIPSeJpLISEk4slyXOnzZ/jmAQBcISsh2e2JCwZ3TtoDgZRX9E2Lvyj8c94GJfo0nsZjj0Ed5t2GdbBo3qjdYNSJoIWudTK76kBTQBNF1dJs3jHPnWt8099JAwu4rTK+k=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"7392eecefd004eb2a88cbf6e3f809e8f"}, [
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
  'bd12964d-ae11-48ea-bc94-dd14473f73b1',
  'x-ms-request-id',
  '224b35c0-f29f-4af9-9bf6-f4c5d7ed5b16',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:36:12 GMT',
  'Content-Length',
  '1338'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistcertificatesbypage-1/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistcertificatesbypage-1/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAyDKurmraccZmvWZ/rnwKKnzCjpyx9BDlQToUKMYB8qOcEJYxfZ5vwiwtT3z9IhspO4iOT0jgiZ68JZcKGALnFG65wnwoNpfFiHGwTPxZc9jF1BZ3u0HOWV4OSp+PGpisKA5sDhUEP18El7hmCCAOWUDSJYNVvBylUbineC7TZnLaZXxfjfooPOmGxdQI9DQMHDCn3r4kQmMGw3HF/699J0/vrwPBqQE2Sa0k5b3teVcbHugT3HpQXAUnD5fg0zmkKIGZqn9nEMeh9JQmuL63dJRKoBOJSy9x89DuiFj4cT3OQK7rgn7JJOFzRCAeh/gxW+/G8v3Ihr8J5mrb+panLQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAJDRwhCUPhMir86m3DUolGf6W/95uPN3eX4zrUSmkBID/rMBlbgxg8tbmRMaVI7sp+yqx0LbYYXSUMQ1TfOT7BT2KCrpJ4wx/r+NV9EAi+PS97cS4Gqlc+R7eXe+OU0w1GPGSckbCX5K2o6rA8tOxPXGm5uVtnJl0z6jj9JC2HQ55PAA0529JFJhjPfgvibU0jK7ftUD9EIWd1aC4T42UmSIPSeJpLISEk4slyXOnzZ/jmAQBcISsh2e2JCwZ3TtoDgZRX9E2Lvyj8c94GJfo0nsZjj0Ed5t2GdbBo3qjdYNSJoIWudTK76kBTQBNF1dJs3jHPnWt8099JAwu4rTK+k=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"7392eecefd004eb2a88cbf6e3f809e8f"}, [
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
  '3de72b71-0103-41b8-8fae-e34cc5f58ab2',
  'x-ms-request-id',
  '96b6e631-1613-4bca-8f20-1c5a4eda0c62',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:36:14 GMT',
  'Content-Length',
  '1338'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistcertificatesbypage-1/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistcertificatesbypage-1/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAyDKurmraccZmvWZ/rnwKKnzCjpyx9BDlQToUKMYB8qOcEJYxfZ5vwiwtT3z9IhspO4iOT0jgiZ68JZcKGALnFG65wnwoNpfFiHGwTPxZc9jF1BZ3u0HOWV4OSp+PGpisKA5sDhUEP18El7hmCCAOWUDSJYNVvBylUbineC7TZnLaZXxfjfooPOmGxdQI9DQMHDCn3r4kQmMGw3HF/699J0/vrwPBqQE2Sa0k5b3teVcbHugT3HpQXAUnD5fg0zmkKIGZqn9nEMeh9JQmuL63dJRKoBOJSy9x89DuiFj4cT3OQK7rgn7JJOFzRCAeh/gxW+/G8v3Ihr8J5mrb+panLQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAJDRwhCUPhMir86m3DUolGf6W/95uPN3eX4zrUSmkBID/rMBlbgxg8tbmRMaVI7sp+yqx0LbYYXSUMQ1TfOT7BT2KCrpJ4wx/r+NV9EAi+PS97cS4Gqlc+R7eXe+OU0w1GPGSckbCX5K2o6rA8tOxPXGm5uVtnJl0z6jj9JC2HQ55PAA0529JFJhjPfgvibU0jK7ftUD9EIWd1aC4T42UmSIPSeJpLISEk4slyXOnzZ/jmAQBcISsh2e2JCwZ3TtoDgZRX9E2Lvyj8c94GJfo0nsZjj0Ed5t2GdbBo3qjdYNSJoIWudTK76kBTQBNF1dJs3jHPnWt8099JAwu4rTK+k=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"7392eecefd004eb2a88cbf6e3f809e8f"}, [
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
  '08319a29-992c-4738-bab3-8671e43ca8bd',
  'x-ms-request-id',
  '13574163-0483-467a-b8cd-9f21bbe9b661',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:36:16 GMT',
  'Content-Length',
  '1338'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistcertificatesbypage-1/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistcertificatesbypage-1/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAyDKurmraccZmvWZ/rnwKKnzCjpyx9BDlQToUKMYB8qOcEJYxfZ5vwiwtT3z9IhspO4iOT0jgiZ68JZcKGALnFG65wnwoNpfFiHGwTPxZc9jF1BZ3u0HOWV4OSp+PGpisKA5sDhUEP18El7hmCCAOWUDSJYNVvBylUbineC7TZnLaZXxfjfooPOmGxdQI9DQMHDCn3r4kQmMGw3HF/699J0/vrwPBqQE2Sa0k5b3teVcbHugT3HpQXAUnD5fg0zmkKIGZqn9nEMeh9JQmuL63dJRKoBOJSy9x89DuiFj4cT3OQK7rgn7JJOFzRCAeh/gxW+/G8v3Ihr8J5mrb+panLQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAJDRwhCUPhMir86m3DUolGf6W/95uPN3eX4zrUSmkBID/rMBlbgxg8tbmRMaVI7sp+yqx0LbYYXSUMQ1TfOT7BT2KCrpJ4wx/r+NV9EAi+PS97cS4Gqlc+R7eXe+OU0w1GPGSckbCX5K2o6rA8tOxPXGm5uVtnJl0z6jj9JC2HQ55PAA0529JFJhjPfgvibU0jK7ftUD9EIWd1aC4T42UmSIPSeJpLISEk4slyXOnzZ/jmAQBcISsh2e2JCwZ3TtoDgZRX9E2Lvyj8c94GJfo0nsZjj0Ed5t2GdbBo3qjdYNSJoIWudTK76kBTQBNF1dJs3jHPnWt8099JAwu4rTK+k=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"7392eecefd004eb2a88cbf6e3f809e8f"}, [
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
  '1a397654-e13e-4699-b9b2-bdb9edd1303e',
  'x-ms-request-id',
  '386326b5-6d3a-4909-9a4e-9dfe555e3ac4',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:36:18 GMT',
  'Content-Length',
  '1338'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistcertificatesbypage-1/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistcertificatesbypage-1/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAyDKurmraccZmvWZ/rnwKKnzCjpyx9BDlQToUKMYB8qOcEJYxfZ5vwiwtT3z9IhspO4iOT0jgiZ68JZcKGALnFG65wnwoNpfFiHGwTPxZc9jF1BZ3u0HOWV4OSp+PGpisKA5sDhUEP18El7hmCCAOWUDSJYNVvBylUbineC7TZnLaZXxfjfooPOmGxdQI9DQMHDCn3r4kQmMGw3HF/699J0/vrwPBqQE2Sa0k5b3teVcbHugT3HpQXAUnD5fg0zmkKIGZqn9nEMeh9JQmuL63dJRKoBOJSy9x89DuiFj4cT3OQK7rgn7JJOFzRCAeh/gxW+/G8v3Ihr8J5mrb+panLQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAJDRwhCUPhMir86m3DUolGf6W/95uPN3eX4zrUSmkBID/rMBlbgxg8tbmRMaVI7sp+yqx0LbYYXSUMQ1TfOT7BT2KCrpJ4wx/r+NV9EAi+PS97cS4Gqlc+R7eXe+OU0w1GPGSckbCX5K2o6rA8tOxPXGm5uVtnJl0z6jj9JC2HQ55PAA0529JFJhjPfgvibU0jK7ftUD9EIWd1aC4T42UmSIPSeJpLISEk4slyXOnzZ/jmAQBcISsh2e2JCwZ3TtoDgZRX9E2Lvyj8c94GJfo0nsZjj0Ed5t2GdbBo3qjdYNSJoIWudTK76kBTQBNF1dJs3jHPnWt8099JAwu4rTK+k=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"7392eecefd004eb2a88cbf6e3f809e8f"}, [
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
  '985478a9-6640-48e1-9a48-b2c45f73036a',
  'x-ms-request-id',
  'ce003811-0975-42fa-b590-0b202ffd30b4',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:36:20 GMT',
  'Content-Length',
  '1338'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistcertificatesbypage-1/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistcertificatesbypage-1/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAyDKurmraccZmvWZ/rnwKKnzCjpyx9BDlQToUKMYB8qOcEJYxfZ5vwiwtT3z9IhspO4iOT0jgiZ68JZcKGALnFG65wnwoNpfFiHGwTPxZc9jF1BZ3u0HOWV4OSp+PGpisKA5sDhUEP18El7hmCCAOWUDSJYNVvBylUbineC7TZnLaZXxfjfooPOmGxdQI9DQMHDCn3r4kQmMGw3HF/699J0/vrwPBqQE2Sa0k5b3teVcbHugT3HpQXAUnD5fg0zmkKIGZqn9nEMeh9JQmuL63dJRKoBOJSy9x89DuiFj4cT3OQK7rgn7JJOFzRCAeh/gxW+/G8v3Ihr8J5mrb+panLQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAJDRwhCUPhMir86m3DUolGf6W/95uPN3eX4zrUSmkBID/rMBlbgxg8tbmRMaVI7sp+yqx0LbYYXSUMQ1TfOT7BT2KCrpJ4wx/r+NV9EAi+PS97cS4Gqlc+R7eXe+OU0w1GPGSckbCX5K2o6rA8tOxPXGm5uVtnJl0z6jj9JC2HQ55PAA0529JFJhjPfgvibU0jK7ftUD9EIWd1aC4T42UmSIPSeJpLISEk4slyXOnzZ/jmAQBcISsh2e2JCwZ3TtoDgZRX9E2Lvyj8c94GJfo0nsZjj0Ed5t2GdbBo3qjdYNSJoIWudTK76kBTQBNF1dJs3jHPnWt8099JAwu4rTK+k=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"7392eecefd004eb2a88cbf6e3f809e8f"}, [
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
  '4235c34f-71a9-4140-b4ab-0b0a43c28d79',
  'x-ms-request-id',
  '0e6fd375-1242-42d9-8661-799e8744646f',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:36:22 GMT',
  'Content-Length',
  '1338'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistcertificatesbypage-1/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistcertificatesbypage-1/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAyDKurmraccZmvWZ/rnwKKnzCjpyx9BDlQToUKMYB8qOcEJYxfZ5vwiwtT3z9IhspO4iOT0jgiZ68JZcKGALnFG65wnwoNpfFiHGwTPxZc9jF1BZ3u0HOWV4OSp+PGpisKA5sDhUEP18El7hmCCAOWUDSJYNVvBylUbineC7TZnLaZXxfjfooPOmGxdQI9DQMHDCn3r4kQmMGw3HF/699J0/vrwPBqQE2Sa0k5b3teVcbHugT3HpQXAUnD5fg0zmkKIGZqn9nEMeh9JQmuL63dJRKoBOJSy9x89DuiFj4cT3OQK7rgn7JJOFzRCAeh/gxW+/G8v3Ihr8J5mrb+panLQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAJDRwhCUPhMir86m3DUolGf6W/95uPN3eX4zrUSmkBID/rMBlbgxg8tbmRMaVI7sp+yqx0LbYYXSUMQ1TfOT7BT2KCrpJ4wx/r+NV9EAi+PS97cS4Gqlc+R7eXe+OU0w1GPGSckbCX5K2o6rA8tOxPXGm5uVtnJl0z6jj9JC2HQ55PAA0529JFJhjPfgvibU0jK7ftUD9EIWd1aC4T42UmSIPSeJpLISEk4slyXOnzZ/jmAQBcISsh2e2JCwZ3TtoDgZRX9E2Lvyj8c94GJfo0nsZjj0Ed5t2GdbBo3qjdYNSJoIWudTK76kBTQBNF1dJs3jHPnWt8099JAwu4rTK+k=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"7392eecefd004eb2a88cbf6e3f809e8f"}, [
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
  'e4e55249-fff8-4161-a9b2-a97525569b58',
  'x-ms-request-id',
  'f49418e4-c45d-4679-b68b-1d4952fb4b55',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:36:24 GMT',
  'Content-Length',
  '1338'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistcertificatesbypage-1/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistcertificatesbypage-1/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAyDKurmraccZmvWZ/rnwKKnzCjpyx9BDlQToUKMYB8qOcEJYxfZ5vwiwtT3z9IhspO4iOT0jgiZ68JZcKGALnFG65wnwoNpfFiHGwTPxZc9jF1BZ3u0HOWV4OSp+PGpisKA5sDhUEP18El7hmCCAOWUDSJYNVvBylUbineC7TZnLaZXxfjfooPOmGxdQI9DQMHDCn3r4kQmMGw3HF/699J0/vrwPBqQE2Sa0k5b3teVcbHugT3HpQXAUnD5fg0zmkKIGZqn9nEMeh9JQmuL63dJRKoBOJSy9x89DuiFj4cT3OQK7rgn7JJOFzRCAeh/gxW+/G8v3Ihr8J5mrb+panLQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAJDRwhCUPhMir86m3DUolGf6W/95uPN3eX4zrUSmkBID/rMBlbgxg8tbmRMaVI7sp+yqx0LbYYXSUMQ1TfOT7BT2KCrpJ4wx/r+NV9EAi+PS97cS4Gqlc+R7eXe+OU0w1GPGSckbCX5K2o6rA8tOxPXGm5uVtnJl0z6jj9JC2HQ55PAA0529JFJhjPfgvibU0jK7ftUD9EIWd1aC4T42UmSIPSeJpLISEk4slyXOnzZ/jmAQBcISsh2e2JCwZ3TtoDgZRX9E2Lvyj8c94GJfo0nsZjj0Ed5t2GdbBo3qjdYNSJoIWudTK76kBTQBNF1dJs3jHPnWt8099JAwu4rTK+k=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"7392eecefd004eb2a88cbf6e3f809e8f"}, [
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
  '8561033d-333b-4be1-8dd4-e0144477dd12',
  'x-ms-request-id',
  '6a21d02a-df18-45c1-a42c-00daff14d2f6',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:36:27 GMT',
  'Content-Length',
  '1338'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistcertificatesbypage-1/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistcertificatesbypage-1/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAyDKurmraccZmvWZ/rnwKKnzCjpyx9BDlQToUKMYB8qOcEJYxfZ5vwiwtT3z9IhspO4iOT0jgiZ68JZcKGALnFG65wnwoNpfFiHGwTPxZc9jF1BZ3u0HOWV4OSp+PGpisKA5sDhUEP18El7hmCCAOWUDSJYNVvBylUbineC7TZnLaZXxfjfooPOmGxdQI9DQMHDCn3r4kQmMGw3HF/699J0/vrwPBqQE2Sa0k5b3teVcbHugT3HpQXAUnD5fg0zmkKIGZqn9nEMeh9JQmuL63dJRKoBOJSy9x89DuiFj4cT3OQK7rgn7JJOFzRCAeh/gxW+/G8v3Ihr8J5mrb+panLQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAJDRwhCUPhMir86m3DUolGf6W/95uPN3eX4zrUSmkBID/rMBlbgxg8tbmRMaVI7sp+yqx0LbYYXSUMQ1TfOT7BT2KCrpJ4wx/r+NV9EAi+PS97cS4Gqlc+R7eXe+OU0w1GPGSckbCX5K2o6rA8tOxPXGm5uVtnJl0z6jj9JC2HQ55PAA0529JFJhjPfgvibU0jK7ftUD9EIWd1aC4T42UmSIPSeJpLISEk4slyXOnzZ/jmAQBcISsh2e2JCwZ3TtoDgZRX9E2Lvyj8c94GJfo0nsZjj0Ed5t2GdbBo3qjdYNSJoIWudTK76kBTQBNF1dJs3jHPnWt8099JAwu4rTK+k=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"7392eecefd004eb2a88cbf6e3f809e8f"}, [
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
  'b9846662-8bd9-4fce-ab6c-1995e94422be',
  'x-ms-request-id',
  '2593132f-07de-4768-b2c7-fe907d8a8cf0',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:36:28 GMT',
  'Content-Length',
  '1338'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistcertificatesbypage-1/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistcertificatesbypage-1/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAyDKurmraccZmvWZ/rnwKKnzCjpyx9BDlQToUKMYB8qOcEJYxfZ5vwiwtT3z9IhspO4iOT0jgiZ68JZcKGALnFG65wnwoNpfFiHGwTPxZc9jF1BZ3u0HOWV4OSp+PGpisKA5sDhUEP18El7hmCCAOWUDSJYNVvBylUbineC7TZnLaZXxfjfooPOmGxdQI9DQMHDCn3r4kQmMGw3HF/699J0/vrwPBqQE2Sa0k5b3teVcbHugT3HpQXAUnD5fg0zmkKIGZqn9nEMeh9JQmuL63dJRKoBOJSy9x89DuiFj4cT3OQK7rgn7JJOFzRCAeh/gxW+/G8v3Ihr8J5mrb+panLQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAJDRwhCUPhMir86m3DUolGf6W/95uPN3eX4zrUSmkBID/rMBlbgxg8tbmRMaVI7sp+yqx0LbYYXSUMQ1TfOT7BT2KCrpJ4wx/r+NV9EAi+PS97cS4Gqlc+R7eXe+OU0w1GPGSckbCX5K2o6rA8tOxPXGm5uVtnJl0z6jj9JC2HQ55PAA0529JFJhjPfgvibU0jK7ftUD9EIWd1aC4T42UmSIPSeJpLISEk4slyXOnzZ/jmAQBcISsh2e2JCwZ3TtoDgZRX9E2Lvyj8c94GJfo0nsZjj0Ed5t2GdbBo3qjdYNSJoIWudTK76kBTQBNF1dJs3jHPnWt8099JAwu4rTK+k=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"7392eecefd004eb2a88cbf6e3f809e8f"}, [
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
  'f8f54c56-1e91-45b8-bbc6-5a0057bcec20',
  'x-ms-request-id',
  '388a38ab-c7bb-4dfc-88ed-fc1fba89fe07',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:36:30 GMT',
  'Content-Length',
  '1338'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistcertificatesbypage-1/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistcertificatesbypage-1/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAyDKurmraccZmvWZ/rnwKKnzCjpyx9BDlQToUKMYB8qOcEJYxfZ5vwiwtT3z9IhspO4iOT0jgiZ68JZcKGALnFG65wnwoNpfFiHGwTPxZc9jF1BZ3u0HOWV4OSp+PGpisKA5sDhUEP18El7hmCCAOWUDSJYNVvBylUbineC7TZnLaZXxfjfooPOmGxdQI9DQMHDCn3r4kQmMGw3HF/699J0/vrwPBqQE2Sa0k5b3teVcbHugT3HpQXAUnD5fg0zmkKIGZqn9nEMeh9JQmuL63dJRKoBOJSy9x89DuiFj4cT3OQK7rgn7JJOFzRCAeh/gxW+/G8v3Ihr8J5mrb+panLQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAJDRwhCUPhMir86m3DUolGf6W/95uPN3eX4zrUSmkBID/rMBlbgxg8tbmRMaVI7sp+yqx0LbYYXSUMQ1TfOT7BT2KCrpJ4wx/r+NV9EAi+PS97cS4Gqlc+R7eXe+OU0w1GPGSckbCX5K2o6rA8tOxPXGm5uVtnJl0z6jj9JC2HQ55PAA0529JFJhjPfgvibU0jK7ftUD9EIWd1aC4T42UmSIPSeJpLISEk4slyXOnzZ/jmAQBcISsh2e2JCwZ3TtoDgZRX9E2Lvyj8c94GJfo0nsZjj0Ed5t2GdbBo3qjdYNSJoIWudTK76kBTQBNF1dJs3jHPnWt8099JAwu4rTK+k=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"7392eecefd004eb2a88cbf6e3f809e8f"}, [
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
  '01ea74a4-f3b2-4491-b36f-581d04954651',
  'x-ms-request-id',
  '5c97c1bb-12fa-49ff-b2c9-897398e2ccb1',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:36:32 GMT',
  'Content-Length',
  '1338'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistcertificatesbypage-1/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistcertificatesbypage-1/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAyDKurmraccZmvWZ/rnwKKnzCjpyx9BDlQToUKMYB8qOcEJYxfZ5vwiwtT3z9IhspO4iOT0jgiZ68JZcKGALnFG65wnwoNpfFiHGwTPxZc9jF1BZ3u0HOWV4OSp+PGpisKA5sDhUEP18El7hmCCAOWUDSJYNVvBylUbineC7TZnLaZXxfjfooPOmGxdQI9DQMHDCn3r4kQmMGw3HF/699J0/vrwPBqQE2Sa0k5b3teVcbHugT3HpQXAUnD5fg0zmkKIGZqn9nEMeh9JQmuL63dJRKoBOJSy9x89DuiFj4cT3OQK7rgn7JJOFzRCAeh/gxW+/G8v3Ihr8J5mrb+panLQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAJDRwhCUPhMir86m3DUolGf6W/95uPN3eX4zrUSmkBID/rMBlbgxg8tbmRMaVI7sp+yqx0LbYYXSUMQ1TfOT7BT2KCrpJ4wx/r+NV9EAi+PS97cS4Gqlc+R7eXe+OU0w1GPGSckbCX5K2o6rA8tOxPXGm5uVtnJl0z6jj9JC2HQ55PAA0529JFJhjPfgvibU0jK7ftUD9EIWd1aC4T42UmSIPSeJpLISEk4slyXOnzZ/jmAQBcISsh2e2JCwZ3TtoDgZRX9E2Lvyj8c94GJfo0nsZjj0Ed5t2GdbBo3qjdYNSJoIWudTK76kBTQBNF1dJs3jHPnWt8099JAwu4rTK+k=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"7392eecefd004eb2a88cbf6e3f809e8f"}, [
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
  'c6766440-f848-4422-8e9d-cc606ed4e925',
  'x-ms-request-id',
  '63ea1f75-ced0-4212-be0e-97181d405464',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:36:34 GMT',
  'Content-Length',
  '1338'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistcertificatesbypage-1/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistcertificatesbypage-1/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAyDKurmraccZmvWZ/rnwKKnzCjpyx9BDlQToUKMYB8qOcEJYxfZ5vwiwtT3z9IhspO4iOT0jgiZ68JZcKGALnFG65wnwoNpfFiHGwTPxZc9jF1BZ3u0HOWV4OSp+PGpisKA5sDhUEP18El7hmCCAOWUDSJYNVvBylUbineC7TZnLaZXxfjfooPOmGxdQI9DQMHDCn3r4kQmMGw3HF/699J0/vrwPBqQE2Sa0k5b3teVcbHugT3HpQXAUnD5fg0zmkKIGZqn9nEMeh9JQmuL63dJRKoBOJSy9x89DuiFj4cT3OQK7rgn7JJOFzRCAeh/gxW+/G8v3Ihr8J5mrb+panLQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAJDRwhCUPhMir86m3DUolGf6W/95uPN3eX4zrUSmkBID/rMBlbgxg8tbmRMaVI7sp+yqx0LbYYXSUMQ1TfOT7BT2KCrpJ4wx/r+NV9EAi+PS97cS4Gqlc+R7eXe+OU0w1GPGSckbCX5K2o6rA8tOxPXGm5uVtnJl0z6jj9JC2HQ55PAA0529JFJhjPfgvibU0jK7ftUD9EIWd1aC4T42UmSIPSeJpLISEk4slyXOnzZ/jmAQBcISsh2e2JCwZ3TtoDgZRX9E2Lvyj8c94GJfo0nsZjj0Ed5t2GdbBo3qjdYNSJoIWudTK76kBTQBNF1dJs3jHPnWt8099JAwu4rTK+k=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"7392eecefd004eb2a88cbf6e3f809e8f"}, [
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
  '9c8480a5-ee5e-4eec-8ea4-0cbd099bac2b',
  'x-ms-request-id',
  '0c76f78c-1c73-4675-a99a-186ead971e68',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:36:36 GMT',
  'Content-Length',
  '1338'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistcertificatesbypage-1/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistcertificatesbypage-1/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAyDKurmraccZmvWZ/rnwKKnzCjpyx9BDlQToUKMYB8qOcEJYxfZ5vwiwtT3z9IhspO4iOT0jgiZ68JZcKGALnFG65wnwoNpfFiHGwTPxZc9jF1BZ3u0HOWV4OSp+PGpisKA5sDhUEP18El7hmCCAOWUDSJYNVvBylUbineC7TZnLaZXxfjfooPOmGxdQI9DQMHDCn3r4kQmMGw3HF/699J0/vrwPBqQE2Sa0k5b3teVcbHugT3HpQXAUnD5fg0zmkKIGZqn9nEMeh9JQmuL63dJRKoBOJSy9x89DuiFj4cT3OQK7rgn7JJOFzRCAeh/gxW+/G8v3Ihr8J5mrb+panLQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAJDRwhCUPhMir86m3DUolGf6W/95uPN3eX4zrUSmkBID/rMBlbgxg8tbmRMaVI7sp+yqx0LbYYXSUMQ1TfOT7BT2KCrpJ4wx/r+NV9EAi+PS97cS4Gqlc+R7eXe+OU0w1GPGSckbCX5K2o6rA8tOxPXGm5uVtnJl0z6jj9JC2HQ55PAA0529JFJhjPfgvibU0jK7ftUD9EIWd1aC4T42UmSIPSeJpLISEk4slyXOnzZ/jmAQBcISsh2e2JCwZ3TtoDgZRX9E2Lvyj8c94GJfo0nsZjj0Ed5t2GdbBo3qjdYNSJoIWudTK76kBTQBNF1dJs3jHPnWt8099JAwu4rTK+k=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"7392eecefd004eb2a88cbf6e3f809e8f"}, [
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
  '20f31839-6a30-40c3-b786-3e367e0a974e',
  'x-ms-request-id',
  '35f28ce9-5cc8-401d-bc21-cbb15c0add5e',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:36:38 GMT',
  'Content-Length',
  '1338'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistcertificatesbypage-1/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistcertificatesbypage-1/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAyDKurmraccZmvWZ/rnwKKnzCjpyx9BDlQToUKMYB8qOcEJYxfZ5vwiwtT3z9IhspO4iOT0jgiZ68JZcKGALnFG65wnwoNpfFiHGwTPxZc9jF1BZ3u0HOWV4OSp+PGpisKA5sDhUEP18El7hmCCAOWUDSJYNVvBylUbineC7TZnLaZXxfjfooPOmGxdQI9DQMHDCn3r4kQmMGw3HF/699J0/vrwPBqQE2Sa0k5b3teVcbHugT3HpQXAUnD5fg0zmkKIGZqn9nEMeh9JQmuL63dJRKoBOJSy9x89DuiFj4cT3OQK7rgn7JJOFzRCAeh/gxW+/G8v3Ihr8J5mrb+panLQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAJDRwhCUPhMir86m3DUolGf6W/95uPN3eX4zrUSmkBID/rMBlbgxg8tbmRMaVI7sp+yqx0LbYYXSUMQ1TfOT7BT2KCrpJ4wx/r+NV9EAi+PS97cS4Gqlc+R7eXe+OU0w1GPGSckbCX5K2o6rA8tOxPXGm5uVtnJl0z6jj9JC2HQ55PAA0529JFJhjPfgvibU0jK7ftUD9EIWd1aC4T42UmSIPSeJpLISEk4slyXOnzZ/jmAQBcISsh2e2JCwZ3TtoDgZRX9E2Lvyj8c94GJfo0nsZjj0Ed5t2GdbBo3qjdYNSJoIWudTK76kBTQBNF1dJs3jHPnWt8099JAwu4rTK+k=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"7392eecefd004eb2a88cbf6e3f809e8f"}, [
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
  'b1385e4f-6835-40f3-93a9-2f3c3e6c54bd',
  'x-ms-request-id',
  'bde7c108-e500-4b2b-866a-e0d592eec18c',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:36:41 GMT',
  'Content-Length',
  '1338'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistcertificatesbypage-1/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistcertificatesbypage-1/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAyDKurmraccZmvWZ/rnwKKnzCjpyx9BDlQToUKMYB8qOcEJYxfZ5vwiwtT3z9IhspO4iOT0jgiZ68JZcKGALnFG65wnwoNpfFiHGwTPxZc9jF1BZ3u0HOWV4OSp+PGpisKA5sDhUEP18El7hmCCAOWUDSJYNVvBylUbineC7TZnLaZXxfjfooPOmGxdQI9DQMHDCn3r4kQmMGw3HF/699J0/vrwPBqQE2Sa0k5b3teVcbHugT3HpQXAUnD5fg0zmkKIGZqn9nEMeh9JQmuL63dJRKoBOJSy9x89DuiFj4cT3OQK7rgn7JJOFzRCAeh/gxW+/G8v3Ihr8J5mrb+panLQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAJDRwhCUPhMir86m3DUolGf6W/95uPN3eX4zrUSmkBID/rMBlbgxg8tbmRMaVI7sp+yqx0LbYYXSUMQ1TfOT7BT2KCrpJ4wx/r+NV9EAi+PS97cS4Gqlc+R7eXe+OU0w1GPGSckbCX5K2o6rA8tOxPXGm5uVtnJl0z6jj9JC2HQ55PAA0529JFJhjPfgvibU0jK7ftUD9EIWd1aC4T42UmSIPSeJpLISEk4slyXOnzZ/jmAQBcISsh2e2JCwZ3TtoDgZRX9E2Lvyj8c94GJfo0nsZjj0Ed5t2GdbBo3qjdYNSJoIWudTK76kBTQBNF1dJs3jHPnWt8099JAwu4rTK+k=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"7392eecefd004eb2a88cbf6e3f809e8f"}, [
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
  '9e5e0743-2ebd-4c0d-a10f-5095a6d4d227',
  'x-ms-request-id',
  '0b96f370-de19-4e99-a847-3c32a250ffc3',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:36:43 GMT',
  'Content-Length',
  '1338'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistcertificatesbypage-1/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistcertificatesbypage-1/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAyDKurmraccZmvWZ/rnwKKnzCjpyx9BDlQToUKMYB8qOcEJYxfZ5vwiwtT3z9IhspO4iOT0jgiZ68JZcKGALnFG65wnwoNpfFiHGwTPxZc9jF1BZ3u0HOWV4OSp+PGpisKA5sDhUEP18El7hmCCAOWUDSJYNVvBylUbineC7TZnLaZXxfjfooPOmGxdQI9DQMHDCn3r4kQmMGw3HF/699J0/vrwPBqQE2Sa0k5b3teVcbHugT3HpQXAUnD5fg0zmkKIGZqn9nEMeh9JQmuL63dJRKoBOJSy9x89DuiFj4cT3OQK7rgn7JJOFzRCAeh/gxW+/G8v3Ihr8J5mrb+panLQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAJDRwhCUPhMir86m3DUolGf6W/95uPN3eX4zrUSmkBID/rMBlbgxg8tbmRMaVI7sp+yqx0LbYYXSUMQ1TfOT7BT2KCrpJ4wx/r+NV9EAi+PS97cS4Gqlc+R7eXe+OU0w1GPGSckbCX5K2o6rA8tOxPXGm5uVtnJl0z6jj9JC2HQ55PAA0529JFJhjPfgvibU0jK7ftUD9EIWd1aC4T42UmSIPSeJpLISEk4slyXOnzZ/jmAQBcISsh2e2JCwZ3TtoDgZRX9E2Lvyj8c94GJfo0nsZjj0Ed5t2GdbBo3qjdYNSJoIWudTK76kBTQBNF1dJs3jHPnWt8099JAwu4rTK+k=","cancellation_requested":false,"status":"completed","target":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistcertificatesbypage-1","request_id":"7392eecefd004eb2a88cbf6e3f809e8f"}, [
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
  'c632f8c1-0883-4fb9-a672-248b9140b939',
  'x-ms-request-id',
  '199b5857-a2bc-4608-accf-e43274f063e3',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:36:45 GMT',
  'Content-Length',
  '1303'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistcertificatesbypage-1/')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistcertificatesbypage-1/87297cd8470c4f12809465cafbb203e6","kid":"https://keyvault_name.vault.azure.net/keys/listCertificateName-canlistcertificatesbypage-1/87297cd8470c4f12809465cafbb203e6","sid":"https://keyvault_name.vault.azure.net/secrets/listCertificateName-canlistcertificatesbypage-1/87297cd8470c4f12809465cafbb203e6","x5t":"G00DUzgj2cnunIfYtaSSmfyBTok","cer":"MIIDKDCCAhCgAwIBAgIQar2al4NNTYiq2hLKPjPU5DANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjEwNDI4MjIyNjQ0WhcNMjIwNDI4MjIzNjQ0WjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQDIMq6uatpxxma9Zn+ufAoqfMKOnLH0EOVBOhQoxgHyo5wQljF9nm/CLC1PfP0iGyk7iI5PSOCJnrwllwoYAucUbrnCfCg2l8WIcbBM/Flz2MXUFne7Qc5ZXg5Kn48amKwoDmwOFQQ/XwSXuGYIIA5ZQNIlg1W8HKVRuKd4LtNmctplfF+N+ig86YbF1Aj0NAwcMKfeviRCYwbDccX/r30nT++vA8GpATZJrSTlve15Vxse6BPcelBcBScPl+DTOaQogZmqf2cQx6H0lCa4vrd0lEqgE4lLL3Hz0O6IWPhxPc5AruuCfskk4XNEIB6H+DFb78by/ciGvwnmatv6lqctAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBTfyb1cbCmXoMtfZ2fHcM0vuu8A5TAdBgNVHQ4EFgQU38m9XGwpl6DLX2dnx3DNL7rvAOUwDQYJKoZIhvcNAQELBQADggEBAL7n2GQ+BvUwu7XuNkOgWiyoty196FnJwE03vzuT8U5dnYRPoQ3NfbXyBLUCU6c+VV/6hqjakAImR7ra1kH9maDnrNLUVuv8TDd3thdcTwyBJYqClzhVGUTYiS3rv/WWVKYTcHpyvLhW+kIs0qpd8XQMDooXxzs3vI3jv3p8L86PuY1+1DNvDOf8Ka263N+bg7TSVkydkiXNKSCdPt1RTY0ZW66lzBVRhaK5/jF6BX/qSIJ+/2H5WchkMNWwQZ/zyJ8+bIiCfl6/1AVbM+AjCCXPoq3JyZMCnHPPV/UDotLPw73XGyY3eyVe4GwNV1nPlRcoxMxEXGhmrqfaI1DNFOQ=","attributes":{"enabled":true,"nbf":1619648804,"exp":1651185404,"created":1619649404,"updated":1619649404,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistcertificatesbypage-1/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1619649357,"updated":1619649357}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistcertificatesbypage-1/pending"}}, [
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
  'd5e3dc4e-2494-452f-bd8a-2484d9b08d7b',
  'x-ms-request-id',
  '24ab0795-e2a9-4029-9f81-5cd21504fccd',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:36:45 GMT',
  'Content-Length',
  '2580'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates')
  .query(true)
  .reply(200, {"value":[{"id":"https://keyvault_name.vault.azure.net/certificates/backupRestoreCertificateName-canrestoreacertificate-6825509809597385","x5t":"YL4mJv6iHUJa4i9wEwcK59heguA","attributes":{"enabled":true,"nbf":1619646699,"exp":1651183299,"created":1619647299,"updated":1619647299},"subject":""},{"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistcertificatesbypage-0","x5t":"c6yT8DBTTyam36tlOFLIEjLBAC0","attributes":{"enabled":true,"nbf":1619648754,"exp":1651185354,"created":1619649354,"updated":1619649354},"subject":""},{"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistcertificatesbypage-1","x5t":"G00DUzgj2cnunIfYtaSSmfyBTok","attributes":{"enabled":true,"nbf":1619648804,"exp":1651185404,"created":1619649404,"updated":1619649404},"subject":""},{"id":"https://keyvault_name.vault.azure.net/certificates/lroRecoverCertificateName-canwaituntilacertificateisrecovered-9336745946322729","x5t":"CrnDEQjk2GkEYF9uL_b1hv8Xw5o","attributes":{"enabled":true,"nbf":1619643710,"exp":1651180310,"created":1619644310,"updated":1619644310},"subject":""}],"nextLink":null}, [
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
  'ec4b0130-c0b4-4e61-9ee8-80fcd6ca7af0',
  'x-ms-request-id',
  'ff6178eb-1949-48ef-b152-62f9b2fae443',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:36:45 GMT',
  'Content-Length',
  '1183'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/certificates/listCertificateName-canlistcertificatesbypage-0')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/listCertificateName-canlistcertificatesbypage-0","deletedDate":1619649406,"scheduledPurgeDate":1627425406,"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistcertificatesbypage-0/00959cf387174b8d8a09cfff90eab30c","kid":"https://keyvault_name.vault.azure.net/keys/listCertificateName-canlistcertificatesbypage-0/00959cf387174b8d8a09cfff90eab30c","sid":"https://keyvault_name.vault.azure.net/secrets/listCertificateName-canlistcertificatesbypage-0/00959cf387174b8d8a09cfff90eab30c","x5t":"c6yT8DBTTyam36tlOFLIEjLBAC0","cer":"MIIDKDCCAhCgAwIBAgIQRT1mqvmISwKMh0BYoa4gCzANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjEwNDI4MjIyNTU0WhcNMjIwNDI4MjIzNTU0WjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQDGvFKvqgZ8GZmvaGK0+lhtKqacdgY1tqEHZWNOhS/TqeyEvlPYIPQrLsI8ntIO1RQfTtt7Z3lSu7P/Nesfuigurk0sxrmDkZtTbR1BIJCeSKOUs7eegHD7kDAY3jlQ9LVnxg5tEz5KzbAS+PFxsNeZFKWRJE+acJoXAl+wIOcEcAMAb/2DPqQS/Bb951XFpREFyZkidPD7RhZ8cEQyEEYW4CYnQxcKGloHOK8MjVl5XVyyS1BEFu2cbB5KZXJViFGPIGy4t6TALaUGET5WQQc4zXLavq/v3cQ70LwVJSA4SOnll/iASuzUWmeCv2VMSqSV6sAj4U0cAwZLzczBK7cpAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBS5iZXYLLPGgcijBOBjt2qJyMjdQzAdBgNVHQ4EFgQUuYmV2CyzxoHIowTgY7dqicjI3UMwDQYJKoZIhvcNAQELBQADggEBAL+uj+hWzWq0C4885Hk04L4oOXawgW2ir1c9bydPohbCuOg66EZ1H+e56fSLxW5WBNfRL24QPZIIxp2XUB3ZLuK6VbQSrAWy9scblTG2iOnfEF/4IL8Jo1vQ75iZiHkP7HH9iqe77jUlwnpFgqkuy4moLNpG7ygUV4ja5GHEi+SzsbTPapjZirti/xN57IWbixbbvkkyMR6hMS6QdPKCObXiC6na0CGJIp2qTwrtToMG/juCICHWHqAp5VhA8pOoiiqyJw3hs/N453lG9X0NvwmylaYi2DqwymCnL/+x50MVWV9eHno3nexxJDtoiYpCNL3DEoc0WUjsuvSL8qy3Ry8=","attributes":{"enabled":true,"nbf":1619648754,"exp":1651185354,"created":1619649354,"updated":1619649354,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistcertificatesbypage-0/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1619649291,"updated":1619649291}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistcertificatesbypage-0/pending"}}, [
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
  'fbdf2f81-b2f1-4d94-8610-d440552a71f1',
  'x-ms-request-id',
  'ee9307da-a6ea-4411-a0c1-0b7d51cf1fdd',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:36:46 GMT',
  'Content-Length',
  '2778'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistcertificatesbypage-0')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistcertificatesbypage-0"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '145',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'a66d45bc-a630-4006-921b-243ec036769a',
  'x-ms-request-id',
  'f91d10ce-4a9b-4a21-8196-bc680ae5ab01',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:36:46 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistcertificatesbypage-0')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistcertificatesbypage-0"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '145',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'e0e63355-b440-43cf-8357-cf4502e62b15',
  'x-ms-request-id',
  'eb794ad1-374f-4285-b450-623138197728',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:36:46 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistcertificatesbypage-0')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistcertificatesbypage-0"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '145',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '98475b61-f410-4b63-97ab-891b80caf8ea',
  'x-ms-request-id',
  '63af01e6-4bb9-42a7-bc32-67b66f4d61ca',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:36:48 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistcertificatesbypage-0')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistcertificatesbypage-0"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '145',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'f7a87b24-3230-4573-8698-2a39c08317c4',
  'x-ms-request-id',
  '5ee8a69c-d123-450a-bd85-59355c941083',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:36:50 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistcertificatesbypage-0')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistcertificatesbypage-0"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '145',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'f9c37623-4c72-46af-b595-609cceaea513',
  'x-ms-request-id',
  'a15410d4-a129-462f-aa19-1cef4cdc8913',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:36:52 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistcertificatesbypage-0')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistcertificatesbypage-0"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '145',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'e362219f-ce75-43ab-9d1b-cbf0bebfcfb9',
  'x-ms-request-id',
  'f5ba0feb-5adb-4488-99cd-4424d5125185',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:36:54 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistcertificatesbypage-0')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistcertificatesbypage-0"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '145',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '8641ba2f-0a61-4947-b6f7-1916e7dbc33a',
  'x-ms-request-id',
  '781f7ebc-9901-4017-86e0-a883b9097135',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:36:56 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistcertificatesbypage-0')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistcertificatesbypage-0"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '145',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '99336f83-003e-4bd0-bc25-7ded31387bd7',
  'x-ms-request-id',
  'a1a62cfb-fc54-4f16-9789-d74287e4acdd',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:36:58 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistcertificatesbypage-0')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistcertificatesbypage-0"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '145',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '5e5fcb34-1698-4e37-9d4b-2413cb0780b9',
  'x-ms-request-id',
  '27254b07-c596-44d6-b8da-9214abf5531b',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:37:00 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistcertificatesbypage-0')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistcertificatesbypage-0"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '145',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '79e16731-9541-4953-885c-a2b0d793d00b',
  'x-ms-request-id',
  '3d3bf3e1-de37-44ee-9378-f49191593d16',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:37:02 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistcertificatesbypage-0')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistcertificatesbypage-0"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '145',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '915660d4-bf1b-4cc9-b3e7-1c70a51b040e',
  'x-ms-request-id',
  '8b308587-4052-47ec-bb17-9626bedd101a',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:37:04 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistcertificatesbypage-0')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistcertificatesbypage-0"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '145',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '68e8e8ec-aa19-4cfd-a9e5-cde9203a2201',
  'x-ms-request-id',
  'a54bebe4-d1ad-45a2-a977-8c32460d573a',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:37:07 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistcertificatesbypage-0')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistcertificatesbypage-0"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '145',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '6569e7f0-817e-460f-9280-2ad4d1f64697',
  'x-ms-request-id',
  '150b3471-0ca0-4b68-9fb6-8670336438cc',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:37:09 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistcertificatesbypage-0')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistcertificatesbypage-0"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '145',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'bb4d241b-8dec-49b5-b585-95a0fa4f8ac5',
  'x-ms-request-id',
  'c669a6b6-8817-4bb0-9eec-c8a5e8a76363',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:37:11 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistcertificatesbypage-0')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistcertificatesbypage-0"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '145',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'aabe8ac3-a16d-4d39-8be1-bd4770104d50',
  'x-ms-request-id',
  'e24092e9-192d-443b-89df-837efe4edd5b',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:37:13 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistcertificatesbypage-0')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistcertificatesbypage-0"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '145',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'ee4472cf-517c-4566-9e75-059a643fd421',
  'x-ms-request-id',
  'a2bce57d-e101-4aa6-9144-0f924cbfcacc',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:37:15 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistcertificatesbypage-0')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistcertificatesbypage-0"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '145',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '4bd9c6b6-265b-4372-874e-99e88614ba1a',
  'x-ms-request-id',
  'c6660b0d-db23-452e-a8e2-ac8062d063f2',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:37:17 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistcertificatesbypage-0')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistcertificatesbypage-0"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '145',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'd9da5a8b-b515-419c-911e-346608dc459b',
  'x-ms-request-id',
  '49746b4b-ff83-4307-b20a-4b4b00026043',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:37:19 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistcertificatesbypage-0')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistcertificatesbypage-0"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '145',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'ec9a0001-48c8-47a4-a85f-b9519a580022',
  'x-ms-request-id',
  '72b3fe1b-1d5d-43b2-9940-065c31a2f0b4',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:37:21 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistcertificatesbypage-0')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistcertificatesbypage-0"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '145',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '9b2c1836-37cb-4176-b7ce-604fd8d696f8',
  'x-ms-request-id',
  'd80be647-60d1-4fc2-8e13-28b1a35cfa49',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:37:24 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistcertificatesbypage-0')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistcertificatesbypage-0"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '145',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '6d01eeef-bad4-4c87-bc16-4eb3d03d23fc',
  'x-ms-request-id',
  'fb8bf086-b38f-434d-99df-e878ea9e697d',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:37:26 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistcertificatesbypage-0')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistcertificatesbypage-0"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '145',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'a10e3719-7a59-4aa0-83fc-50438d0eb79b',
  'x-ms-request-id',
  'c0a411aa-543a-4984-97a0-ed5aadbd09a5',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:37:27 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistcertificatesbypage-0')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistcertificatesbypage-0"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '145',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '9953e501-54ae-4baf-b604-a72b559c7dde',
  'x-ms-request-id',
  '24b3c7c1-7c04-41ce-8e7e-86790c1f1cdb',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:37:30 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistcertificatesbypage-0')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistcertificatesbypage-0"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '145',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '59e58490-0d90-4e5d-ae90-cadbbdf998a9',
  'x-ms-request-id',
  '10d23f59-7918-4aed-a998-64c35308f8f6',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:37:31 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistcertificatesbypage-0')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/listCertificateName-canlistcertificatesbypage-0","deletedDate":1619649406,"scheduledPurgeDate":1627425406,"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistcertificatesbypage-0/00959cf387174b8d8a09cfff90eab30c","kid":"https://keyvault_name.vault.azure.net/keys/listCertificateName-canlistcertificatesbypage-0/00959cf387174b8d8a09cfff90eab30c","sid":"https://keyvault_name.vault.azure.net/secrets/listCertificateName-canlistcertificatesbypage-0/00959cf387174b8d8a09cfff90eab30c","x5t":"c6yT8DBTTyam36tlOFLIEjLBAC0","cer":"MIIDKDCCAhCgAwIBAgIQRT1mqvmISwKMh0BYoa4gCzANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjEwNDI4MjIyNTU0WhcNMjIwNDI4MjIzNTU0WjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQDGvFKvqgZ8GZmvaGK0+lhtKqacdgY1tqEHZWNOhS/TqeyEvlPYIPQrLsI8ntIO1RQfTtt7Z3lSu7P/Nesfuigurk0sxrmDkZtTbR1BIJCeSKOUs7eegHD7kDAY3jlQ9LVnxg5tEz5KzbAS+PFxsNeZFKWRJE+acJoXAl+wIOcEcAMAb/2DPqQS/Bb951XFpREFyZkidPD7RhZ8cEQyEEYW4CYnQxcKGloHOK8MjVl5XVyyS1BEFu2cbB5KZXJViFGPIGy4t6TALaUGET5WQQc4zXLavq/v3cQ70LwVJSA4SOnll/iASuzUWmeCv2VMSqSV6sAj4U0cAwZLzczBK7cpAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBS5iZXYLLPGgcijBOBjt2qJyMjdQzAdBgNVHQ4EFgQUuYmV2CyzxoHIowTgY7dqicjI3UMwDQYJKoZIhvcNAQELBQADggEBAL+uj+hWzWq0C4885Hk04L4oOXawgW2ir1c9bydPohbCuOg66EZ1H+e56fSLxW5WBNfRL24QPZIIxp2XUB3ZLuK6VbQSrAWy9scblTG2iOnfEF/4IL8Jo1vQ75iZiHkP7HH9iqe77jUlwnpFgqkuy4moLNpG7ygUV4ja5GHEi+SzsbTPapjZirti/xN57IWbixbbvkkyMR6hMS6QdPKCObXiC6na0CGJIp2qTwrtToMG/juCICHWHqAp5VhA8pOoiiqyJw3hs/N453lG9X0NvwmylaYi2DqwymCnL/+x50MVWV9eHno3nexxJDtoiYpCNL3DEoc0WUjsuvSL8qy3Ry8=","attributes":{"enabled":true,"nbf":1619648754,"exp":1651185354,"created":1619649354,"updated":1619649354,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistcertificatesbypage-0/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1619649291,"updated":1619649291}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistcertificatesbypage-0/pending"}}, [
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
  '5162a65d-1a53-442c-801d-0b3af7e1e83e',
  'x-ms-request-id',
  'f48ea429-435c-4d62-a919-ab6593a06a52',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:37:34 GMT',
  'Content-Length',
  '2778'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedcertificates/listCertificateName-canlistcertificatesbypage-0')
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
  '37ad5a2c-9df2-42f3-b3ad-5bf27855d826',
  'x-ms-request-id',
  '03abe7b5-82a2-4319-ba24-c8350d4f8917',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:37:34 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/certificates/listCertificateName-canlistcertificatesbypage-1')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/listCertificateName-canlistcertificatesbypage-1","deletedDate":1619649455,"scheduledPurgeDate":1627425455,"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistcertificatesbypage-1/87297cd8470c4f12809465cafbb203e6","kid":"https://keyvault_name.vault.azure.net/keys/listCertificateName-canlistcertificatesbypage-1/87297cd8470c4f12809465cafbb203e6","sid":"https://keyvault_name.vault.azure.net/secrets/listCertificateName-canlistcertificatesbypage-1/87297cd8470c4f12809465cafbb203e6","x5t":"G00DUzgj2cnunIfYtaSSmfyBTok","cer":"MIIDKDCCAhCgAwIBAgIQar2al4NNTYiq2hLKPjPU5DANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjEwNDI4MjIyNjQ0WhcNMjIwNDI4MjIzNjQ0WjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQDIMq6uatpxxma9Zn+ufAoqfMKOnLH0EOVBOhQoxgHyo5wQljF9nm/CLC1PfP0iGyk7iI5PSOCJnrwllwoYAucUbrnCfCg2l8WIcbBM/Flz2MXUFne7Qc5ZXg5Kn48amKwoDmwOFQQ/XwSXuGYIIA5ZQNIlg1W8HKVRuKd4LtNmctplfF+N+ig86YbF1Aj0NAwcMKfeviRCYwbDccX/r30nT++vA8GpATZJrSTlve15Vxse6BPcelBcBScPl+DTOaQogZmqf2cQx6H0lCa4vrd0lEqgE4lLL3Hz0O6IWPhxPc5AruuCfskk4XNEIB6H+DFb78by/ciGvwnmatv6lqctAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBTfyb1cbCmXoMtfZ2fHcM0vuu8A5TAdBgNVHQ4EFgQU38m9XGwpl6DLX2dnx3DNL7rvAOUwDQYJKoZIhvcNAQELBQADggEBAL7n2GQ+BvUwu7XuNkOgWiyoty196FnJwE03vzuT8U5dnYRPoQ3NfbXyBLUCU6c+VV/6hqjakAImR7ra1kH9maDnrNLUVuv8TDd3thdcTwyBJYqClzhVGUTYiS3rv/WWVKYTcHpyvLhW+kIs0qpd8XQMDooXxzs3vI3jv3p8L86PuY1+1DNvDOf8Ka263N+bg7TSVkydkiXNKSCdPt1RTY0ZW66lzBVRhaK5/jF6BX/qSIJ+/2H5WchkMNWwQZ/zyJ8+bIiCfl6/1AVbM+AjCCXPoq3JyZMCnHPPV/UDotLPw73XGyY3eyVe4GwNV1nPlRcoxMxEXGhmrqfaI1DNFOQ=","attributes":{"enabled":true,"nbf":1619648804,"exp":1651185404,"created":1619649404,"updated":1619649404,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistcertificatesbypage-1/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1619649357,"updated":1619649357}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistcertificatesbypage-1/pending"}}, [
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
  '1b9853fb-9a0b-4174-afbe-bae9def24ea3',
  'x-ms-request-id',
  'd8576114-8010-4fb5-b4a9-5b720087ec90',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:37:35 GMT',
  'Content-Length',
  '2778'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistcertificatesbypage-1')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistcertificatesbypage-1"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '145',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '103a8597-7009-45fe-96f7-c112fe7e6b69',
  'x-ms-request-id',
  '95157a07-b7a8-4343-8070-092afe9944cf',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:37:35 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistcertificatesbypage-1')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistcertificatesbypage-1"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '145',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '80c5f6ed-89ba-4b92-99f1-eb4c4fd93be6',
  'x-ms-request-id',
  '6b4825e4-f8c2-423a-b2fe-ffd1ca6c9361',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:37:35 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistcertificatesbypage-1')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistcertificatesbypage-1"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '145',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '2e3fcf55-1a82-444a-8c21-a8fe1f5fdd47',
  'x-ms-request-id',
  'eee2f5f5-78ea-4e87-921f-6bab70669d90',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:37:37 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistcertificatesbypage-1')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistcertificatesbypage-1"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '145',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '3c50c622-0d8c-42ea-97d4-8d0ec084b08b',
  'x-ms-request-id',
  'f301d03d-87de-4259-a13b-a6a488c2da60',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:37:39 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistcertificatesbypage-1')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistcertificatesbypage-1"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '145',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '05cf2c9b-9008-4c4b-ab36-5f700665e924',
  'x-ms-request-id',
  'baf5cc8b-f7cf-42d5-9a20-820d095bb726',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:37:41 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistcertificatesbypage-1')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistcertificatesbypage-1"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '145',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'df926347-00a2-44bb-af41-72686f92d810',
  'x-ms-request-id',
  'cb7bb24c-5167-41d5-ba26-23e5af67ea4c',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:37:43 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistcertificatesbypage-1')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistcertificatesbypage-1"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '145',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'c67a1eec-d921-4a4b-85fe-8975951fd581',
  'x-ms-request-id',
  '494a44b3-1199-4ff1-8a13-e94063546318',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:37:45 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistcertificatesbypage-1')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistcertificatesbypage-1"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '145',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'cac2c843-4d92-45aa-80e8-38b01c79a868',
  'x-ms-request-id',
  '448db0bd-c3ff-465d-87ff-047c5b353f5f',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:37:47 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistcertificatesbypage-1')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistcertificatesbypage-1"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '145',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'fab9e33b-965b-41bd-bc15-c4a88e5b6945',
  'x-ms-request-id',
  '88461279-feb6-4270-b68c-a4d4353add13',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:37:49 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistcertificatesbypage-1')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistcertificatesbypage-1"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '145',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '1013d2de-e3ad-4655-a6fb-4411bc7dd22f',
  'x-ms-request-id',
  '770bde27-121d-4bd9-b9b0-bf3b501b084f',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:37:51 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistcertificatesbypage-1')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistcertificatesbypage-1"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '145',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '60983f0f-8be2-44c9-b768-dfc6c0e43cd3',
  'x-ms-request-id',
  '06e45cf7-850d-48fb-af5f-f7e72ebb32f3',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:37:53 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistcertificatesbypage-1')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistcertificatesbypage-1"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '145',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '95e45ad3-6951-4487-9033-681572f10988',
  'x-ms-request-id',
  'bbf81ee8-7118-41d6-9455-aeb129a4712c',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:37:56 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistcertificatesbypage-1')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistcertificatesbypage-1"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '145',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '0e8c4639-8663-4b3a-82e5-fc931ff9019c',
  'x-ms-request-id',
  '7af24a6c-87c8-4f10-9c82-7ff71b0d1585',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:37:58 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistcertificatesbypage-1')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistcertificatesbypage-1"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '145',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '6bcaa55f-3763-46d1-b4f8-06eed9732116',
  'x-ms-request-id',
  'e6cbaae4-81d1-4f61-b611-70492c690351',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:38:00 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistcertificatesbypage-1')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistcertificatesbypage-1"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '145',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '3c819b01-36c7-43e0-a6a4-b15fdda5e67d',
  'x-ms-request-id',
  'b63c702c-90aa-4547-a1ce-1f1bedfd4c33',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:38:02 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistcertificatesbypage-1')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistcertificatesbypage-1"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '145',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'bfc2d874-9b87-4b24-9c91-92c371247104',
  'x-ms-request-id',
  '27736e25-37fb-4e76-8e77-5639b5bcd8d8',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:38:04 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistcertificatesbypage-1')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistcertificatesbypage-1"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '145',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '33b665f9-f017-4bb8-8139-b649a6e6a748',
  'x-ms-request-id',
  'cb108344-006f-4c56-ae3d-fa09022b818c',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:38:06 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistcertificatesbypage-1')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistcertificatesbypage-1"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '145',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '2bfdc49e-4d60-48cd-9644-24d130008cb7',
  'x-ms-request-id',
  'f11edfa8-bc21-40f0-b695-b4c745ef1933',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:38:08 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistcertificatesbypage-1')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistcertificatesbypage-1"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '145',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'f3cb3991-41fb-4c97-9a77-955b57c8fffe',
  'x-ms-request-id',
  'a1ca204c-8acf-407d-b404-d6e28226e685',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:38:10 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistcertificatesbypage-1')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/listCertificateName-canlistcertificatesbypage-1","deletedDate":1619649455,"scheduledPurgeDate":1627425455,"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistcertificatesbypage-1/87297cd8470c4f12809465cafbb203e6","kid":"https://keyvault_name.vault.azure.net/keys/listCertificateName-canlistcertificatesbypage-1/87297cd8470c4f12809465cafbb203e6","sid":"https://keyvault_name.vault.azure.net/secrets/listCertificateName-canlistcertificatesbypage-1/87297cd8470c4f12809465cafbb203e6","x5t":"G00DUzgj2cnunIfYtaSSmfyBTok","cer":"MIIDKDCCAhCgAwIBAgIQar2al4NNTYiq2hLKPjPU5DANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjEwNDI4MjIyNjQ0WhcNMjIwNDI4MjIzNjQ0WjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQDIMq6uatpxxma9Zn+ufAoqfMKOnLH0EOVBOhQoxgHyo5wQljF9nm/CLC1PfP0iGyk7iI5PSOCJnrwllwoYAucUbrnCfCg2l8WIcbBM/Flz2MXUFne7Qc5ZXg5Kn48amKwoDmwOFQQ/XwSXuGYIIA5ZQNIlg1W8HKVRuKd4LtNmctplfF+N+ig86YbF1Aj0NAwcMKfeviRCYwbDccX/r30nT++vA8GpATZJrSTlve15Vxse6BPcelBcBScPl+DTOaQogZmqf2cQx6H0lCa4vrd0lEqgE4lLL3Hz0O6IWPhxPc5AruuCfskk4XNEIB6H+DFb78by/ciGvwnmatv6lqctAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBTfyb1cbCmXoMtfZ2fHcM0vuu8A5TAdBgNVHQ4EFgQU38m9XGwpl6DLX2dnx3DNL7rvAOUwDQYJKoZIhvcNAQELBQADggEBAL7n2GQ+BvUwu7XuNkOgWiyoty196FnJwE03vzuT8U5dnYRPoQ3NfbXyBLUCU6c+VV/6hqjakAImR7ra1kH9maDnrNLUVuv8TDd3thdcTwyBJYqClzhVGUTYiS3rv/WWVKYTcHpyvLhW+kIs0qpd8XQMDooXxzs3vI3jv3p8L86PuY1+1DNvDOf8Ka263N+bg7TSVkydkiXNKSCdPt1RTY0ZW66lzBVRhaK5/jF6BX/qSIJ+/2H5WchkMNWwQZ/zyJ8+bIiCfl6/1AVbM+AjCCXPoq3JyZMCnHPPV/UDotLPw73XGyY3eyVe4GwNV1nPlRcoxMxEXGhmrqfaI1DNFOQ=","attributes":{"enabled":true,"nbf":1619648804,"exp":1651185404,"created":1619649404,"updated":1619649404,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistcertificatesbypage-1/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1619649357,"updated":1619649357}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistcertificatesbypage-1/pending"}}, [
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
  'fdb80e3d-56d9-4c48-9ca9-a11c6f1eec3e',
  'x-ms-request-id',
  '869aa719-9810-4d86-b5d0-9d5675a9e6d6',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:38:12 GMT',
  'Content-Length',
  '2778'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedcertificates/listCertificateName-canlistcertificatesbypage-1')
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
  'bf409729-93c8-4967-bcc6-04ed9f54b216',
  'x-ms-request-id',
  'd483b2a1-701f-45e0-937a-77e7139c6cca',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:38:12 GMT'
]);

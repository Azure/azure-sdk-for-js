let nock = require('nock');

module.exports.hash = "35fd6052a732b933829192abc583c67e";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/certificates/CRUDCertificateName-candisableacertificate-/create')
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
  '760dcc39-6e30-4aa5-8a6b-6db81c4e7599',
  'x-ms-request-id',
  '084e822b-00c7-4c98-b60d-a533a8a548a1',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:21:51 GMT'
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
  'c637fc73-229a-4392-89b5-dbb6179f3b00',
  'x-ms-ests-server',
  '2.1.11654.16 - SCUS ProdSlices',
  'Set-Cookie',
  'fpc=ApDQRp_1bOJGvyZBmEPP0xDmR1YbAgAAAIC6G9gOAAAA; expires=Fri, 28-May-2021 20:21:51 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrXbfVdiAXWKGCzNHFpjXfL5t411FjHJpRYW-8HMv-GJyGrHV58fjDHQpFRbQJH-YUCGEXZZCbX68O8NOMoV8hTI-KT-VuDmaKvYsuY9UVGjjlCKA-hCeF_ba6gFZrHj4mNzE-B6fp8cpHdN9Ke2QGihC3CQBCdwI3rjNNTN-hZxogAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 28 Apr 2021 20:21:51 GMT',
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
  'a26f508e-f64b-4c9e-98b8-dbb7e75a1901',
  'x-ms-ests-server',
  '2.1.11654.16 - EUS ProdSlices',
  'Set-Cookie',
  'fpc=ApDQRp_1bOJGvyZBmEPP0xDmR1YbAgAAAIC6G9gOAAAA; expires=Fri, 28-May-2021 20:21:51 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrH1U3-VPoDAr9D3Avf8P7CCuM13Coq1TKxoKkkiUJGckyWPcsP4dqaQ7i29vgxMn3qSDCjeKaI-8vvGCL6hF01piaAcD1zYQJ7Uej_6s03FVkjVTotpzUT73DsAGbAQ3GCIxjDSutm5oFtyzNMiJpiib03L6MFrTNvov6bEol8_cgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 28 Apr 2021 20:21:51 GMT',
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
  '398c972d-05d9-435d-b5c1-eb009f4e3f00',
  'x-ms-ests-server',
  '2.1.11654.16 - SCUS ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=ApDQRp_1bOJGvyZBmEPP0xDmR1YbAgAAAIC6G9gOAAAA; expires=Fri, 28-May-2021 20:21:51 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 28 Apr 2021 20:21:51 GMT',
  'Content-Length',
  '1313'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/certificates/CRUDCertificateName-candisableacertificate-/create', {"policy":{"key_props":{},"secret_props":{},"x509_props":{"subject":"cn=MyCert","sans":{}},"issuer":{"name":"Self"},"attributes":{}},"attributes":{}})
  .query(true)
  .reply(202, {"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-candisableacertificate-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAq6qpudaoZIBkaBo0lkJPcTct7DVN568+vmUCtszoIacA9sO4c5DzvcBxhuUdmaeMulQLbTbyDY9DZzEcWoYv0Rv5a3vG/COapm0bqWqtYltgH2gwChUITJ72qVTHhfjf1nTs6eYy+6kuFoNLFW0X9NHDlW6ETPcZPGGi20MJVEf5egbiofb3v178mHMNBSq/WWbDSA0wjm/5DT4/C9lskL72NdcNiGqCB+BtJInaYvITXkPzG5Ku2MzNSpB1MTfjFt7w3CiCGIRcQyvT/27sXMHHV1hJMg91A9tubYd5McyDSKPhW+Rq5cRPeay0Rzkl/8IQMVHkWgSlLzGvYx7nXQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAAn0FmoJPCB+2/LkythTJpR4NSojaed9lJCS4k5GOqEWYN9kmswv6ExWWRclVGOashx0fPip0/45pY0sr6nOb23bj0ZVTqDuB+XvByTaRVZgezclu8EMpZd0rozr4p9eQN4xYHHCjE5ChQlm3bN/6iyxd8oiN+MzQEiQE45fghgtfvuw4JwOk2CtK32tRZMjM6wS2zhdMiwHeTycdNiY/DyH8TO9b+8SMgK5JvjIw3aspQPoYiLAz8YT86mGutlMAOl5rAXU/RRIsmsPDdpIhgSjl7MNYEVPMmSNbZEKnhngXKK+QC/8VyID+pWM6wl/DOeZig/kaNp9Ih/5i3nzHlc=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"2893014a1c1346898c7aec9b67c90340"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-candisableacertificate-/pending?api-version=7.2&request_id=2893014a1c1346898c7aec9b67c90340',
  'Retry-After',
  '0',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '760dcc39-6e30-4aa5-8a6b-6db81c4e7599',
  'x-ms-request-id',
  '62763854-9ae0-4c94-a25e-1848d31d4665',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:21:52 GMT',
  'Content-Length',
  '1336'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/CRUDCertificateName-candisableacertificate-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-candisableacertificate-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAq6qpudaoZIBkaBo0lkJPcTct7DVN568+vmUCtszoIacA9sO4c5DzvcBxhuUdmaeMulQLbTbyDY9DZzEcWoYv0Rv5a3vG/COapm0bqWqtYltgH2gwChUITJ72qVTHhfjf1nTs6eYy+6kuFoNLFW0X9NHDlW6ETPcZPGGi20MJVEf5egbiofb3v178mHMNBSq/WWbDSA0wjm/5DT4/C9lskL72NdcNiGqCB+BtJInaYvITXkPzG5Ku2MzNSpB1MTfjFt7w3CiCGIRcQyvT/27sXMHHV1hJMg91A9tubYd5McyDSKPhW+Rq5cRPeay0Rzkl/8IQMVHkWgSlLzGvYx7nXQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAAn0FmoJPCB+2/LkythTJpR4NSojaed9lJCS4k5GOqEWYN9kmswv6ExWWRclVGOashx0fPip0/45pY0sr6nOb23bj0ZVTqDuB+XvByTaRVZgezclu8EMpZd0rozr4p9eQN4xYHHCjE5ChQlm3bN/6iyxd8oiN+MzQEiQE45fghgtfvuw4JwOk2CtK32tRZMjM6wS2zhdMiwHeTycdNiY/DyH8TO9b+8SMgK5JvjIw3aspQPoYiLAz8YT86mGutlMAOl5rAXU/RRIsmsPDdpIhgSjl7MNYEVPMmSNbZEKnhngXKK+QC/8VyID+pWM6wl/DOeZig/kaNp9Ih/5i3nzHlc=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"2893014a1c1346898c7aec9b67c90340"}, [
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
  '3851def5-3e92-4271-aa3a-9f6bb58acae4',
  'x-ms-request-id',
  'f895ed80-f9fe-40d3-add8-93fb10699c02',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:21:52 GMT',
  'Content-Length',
  '1336'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/CRUDCertificateName-candisableacertificate-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-candisableacertificate-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAq6qpudaoZIBkaBo0lkJPcTct7DVN568+vmUCtszoIacA9sO4c5DzvcBxhuUdmaeMulQLbTbyDY9DZzEcWoYv0Rv5a3vG/COapm0bqWqtYltgH2gwChUITJ72qVTHhfjf1nTs6eYy+6kuFoNLFW0X9NHDlW6ETPcZPGGi20MJVEf5egbiofb3v178mHMNBSq/WWbDSA0wjm/5DT4/C9lskL72NdcNiGqCB+BtJInaYvITXkPzG5Ku2MzNSpB1MTfjFt7w3CiCGIRcQyvT/27sXMHHV1hJMg91A9tubYd5McyDSKPhW+Rq5cRPeay0Rzkl/8IQMVHkWgSlLzGvYx7nXQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAAn0FmoJPCB+2/LkythTJpR4NSojaed9lJCS4k5GOqEWYN9kmswv6ExWWRclVGOashx0fPip0/45pY0sr6nOb23bj0ZVTqDuB+XvByTaRVZgezclu8EMpZd0rozr4p9eQN4xYHHCjE5ChQlm3bN/6iyxd8oiN+MzQEiQE45fghgtfvuw4JwOk2CtK32tRZMjM6wS2zhdMiwHeTycdNiY/DyH8TO9b+8SMgK5JvjIw3aspQPoYiLAz8YT86mGutlMAOl5rAXU/RRIsmsPDdpIhgSjl7MNYEVPMmSNbZEKnhngXKK+QC/8VyID+pWM6wl/DOeZig/kaNp9Ih/5i3nzHlc=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"2893014a1c1346898c7aec9b67c90340"}, [
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
  'ef1cc8da-2098-46dd-85fb-907152e8e35d',
  'x-ms-request-id',
  'b60fd225-018d-4958-ad23-974dd1df2ab7',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:21:52 GMT',
  'Content-Length',
  '1336'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/CRUDCertificateName-candisableacertificate-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-candisableacertificate-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAq6qpudaoZIBkaBo0lkJPcTct7DVN568+vmUCtszoIacA9sO4c5DzvcBxhuUdmaeMulQLbTbyDY9DZzEcWoYv0Rv5a3vG/COapm0bqWqtYltgH2gwChUITJ72qVTHhfjf1nTs6eYy+6kuFoNLFW0X9NHDlW6ETPcZPGGi20MJVEf5egbiofb3v178mHMNBSq/WWbDSA0wjm/5DT4/C9lskL72NdcNiGqCB+BtJInaYvITXkPzG5Ku2MzNSpB1MTfjFt7w3CiCGIRcQyvT/27sXMHHV1hJMg91A9tubYd5McyDSKPhW+Rq5cRPeay0Rzkl/8IQMVHkWgSlLzGvYx7nXQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAAn0FmoJPCB+2/LkythTJpR4NSojaed9lJCS4k5GOqEWYN9kmswv6ExWWRclVGOashx0fPip0/45pY0sr6nOb23bj0ZVTqDuB+XvByTaRVZgezclu8EMpZd0rozr4p9eQN4xYHHCjE5ChQlm3bN/6iyxd8oiN+MzQEiQE45fghgtfvuw4JwOk2CtK32tRZMjM6wS2zhdMiwHeTycdNiY/DyH8TO9b+8SMgK5JvjIw3aspQPoYiLAz8YT86mGutlMAOl5rAXU/RRIsmsPDdpIhgSjl7MNYEVPMmSNbZEKnhngXKK+QC/8VyID+pWM6wl/DOeZig/kaNp9Ih/5i3nzHlc=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"2893014a1c1346898c7aec9b67c90340"}, [
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
  '1653535f-c874-4e89-9468-e5af042bee1c',
  'x-ms-request-id',
  '04f584ea-1c19-4228-bbab-e0ffba92b971',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:21:54 GMT',
  'Content-Length',
  '1336'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/CRUDCertificateName-candisableacertificate-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-candisableacertificate-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAq6qpudaoZIBkaBo0lkJPcTct7DVN568+vmUCtszoIacA9sO4c5DzvcBxhuUdmaeMulQLbTbyDY9DZzEcWoYv0Rv5a3vG/COapm0bqWqtYltgH2gwChUITJ72qVTHhfjf1nTs6eYy+6kuFoNLFW0X9NHDlW6ETPcZPGGi20MJVEf5egbiofb3v178mHMNBSq/WWbDSA0wjm/5DT4/C9lskL72NdcNiGqCB+BtJInaYvITXkPzG5Ku2MzNSpB1MTfjFt7w3CiCGIRcQyvT/27sXMHHV1hJMg91A9tubYd5McyDSKPhW+Rq5cRPeay0Rzkl/8IQMVHkWgSlLzGvYx7nXQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAAn0FmoJPCB+2/LkythTJpR4NSojaed9lJCS4k5GOqEWYN9kmswv6ExWWRclVGOashx0fPip0/45pY0sr6nOb23bj0ZVTqDuB+XvByTaRVZgezclu8EMpZd0rozr4p9eQN4xYHHCjE5ChQlm3bN/6iyxd8oiN+MzQEiQE45fghgtfvuw4JwOk2CtK32tRZMjM6wS2zhdMiwHeTycdNiY/DyH8TO9b+8SMgK5JvjIw3aspQPoYiLAz8YT86mGutlMAOl5rAXU/RRIsmsPDdpIhgSjl7MNYEVPMmSNbZEKnhngXKK+QC/8VyID+pWM6wl/DOeZig/kaNp9Ih/5i3nzHlc=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"2893014a1c1346898c7aec9b67c90340"}, [
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
  '6855f731-e205-43df-b72e-8bdae9822c66',
  'x-ms-request-id',
  'bc35d811-838c-43c4-b2a5-3a40b485972a',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:21:56 GMT',
  'Content-Length',
  '1336'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/CRUDCertificateName-candisableacertificate-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-candisableacertificate-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAq6qpudaoZIBkaBo0lkJPcTct7DVN568+vmUCtszoIacA9sO4c5DzvcBxhuUdmaeMulQLbTbyDY9DZzEcWoYv0Rv5a3vG/COapm0bqWqtYltgH2gwChUITJ72qVTHhfjf1nTs6eYy+6kuFoNLFW0X9NHDlW6ETPcZPGGi20MJVEf5egbiofb3v178mHMNBSq/WWbDSA0wjm/5DT4/C9lskL72NdcNiGqCB+BtJInaYvITXkPzG5Ku2MzNSpB1MTfjFt7w3CiCGIRcQyvT/27sXMHHV1hJMg91A9tubYd5McyDSKPhW+Rq5cRPeay0Rzkl/8IQMVHkWgSlLzGvYx7nXQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAAn0FmoJPCB+2/LkythTJpR4NSojaed9lJCS4k5GOqEWYN9kmswv6ExWWRclVGOashx0fPip0/45pY0sr6nOb23bj0ZVTqDuB+XvByTaRVZgezclu8EMpZd0rozr4p9eQN4xYHHCjE5ChQlm3bN/6iyxd8oiN+MzQEiQE45fghgtfvuw4JwOk2CtK32tRZMjM6wS2zhdMiwHeTycdNiY/DyH8TO9b+8SMgK5JvjIw3aspQPoYiLAz8YT86mGutlMAOl5rAXU/RRIsmsPDdpIhgSjl7MNYEVPMmSNbZEKnhngXKK+QC/8VyID+pWM6wl/DOeZig/kaNp9Ih/5i3nzHlc=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"2893014a1c1346898c7aec9b67c90340"}, [
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
  'af4a1a40-d2e7-4a2a-9642-769a0ae2ab94',
  'x-ms-request-id',
  'aa99566d-7bc6-4005-8259-2adc0e2acea9',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:21:58 GMT',
  'Content-Length',
  '1336'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/CRUDCertificateName-candisableacertificate-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-candisableacertificate-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAq6qpudaoZIBkaBo0lkJPcTct7DVN568+vmUCtszoIacA9sO4c5DzvcBxhuUdmaeMulQLbTbyDY9DZzEcWoYv0Rv5a3vG/COapm0bqWqtYltgH2gwChUITJ72qVTHhfjf1nTs6eYy+6kuFoNLFW0X9NHDlW6ETPcZPGGi20MJVEf5egbiofb3v178mHMNBSq/WWbDSA0wjm/5DT4/C9lskL72NdcNiGqCB+BtJInaYvITXkPzG5Ku2MzNSpB1MTfjFt7w3CiCGIRcQyvT/27sXMHHV1hJMg91A9tubYd5McyDSKPhW+Rq5cRPeay0Rzkl/8IQMVHkWgSlLzGvYx7nXQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAAn0FmoJPCB+2/LkythTJpR4NSojaed9lJCS4k5GOqEWYN9kmswv6ExWWRclVGOashx0fPip0/45pY0sr6nOb23bj0ZVTqDuB+XvByTaRVZgezclu8EMpZd0rozr4p9eQN4xYHHCjE5ChQlm3bN/6iyxd8oiN+MzQEiQE45fghgtfvuw4JwOk2CtK32tRZMjM6wS2zhdMiwHeTycdNiY/DyH8TO9b+8SMgK5JvjIw3aspQPoYiLAz8YT86mGutlMAOl5rAXU/RRIsmsPDdpIhgSjl7MNYEVPMmSNbZEKnhngXKK+QC/8VyID+pWM6wl/DOeZig/kaNp9Ih/5i3nzHlc=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"2893014a1c1346898c7aec9b67c90340"}, [
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
  'cbec2069-846e-4498-8863-c8f24c5470f6',
  'x-ms-request-id',
  '8870c573-d3a3-4c84-8ef1-cf3704e1449c',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:22:00 GMT',
  'Content-Length',
  '1336'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/CRUDCertificateName-candisableacertificate-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-candisableacertificate-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAq6qpudaoZIBkaBo0lkJPcTct7DVN568+vmUCtszoIacA9sO4c5DzvcBxhuUdmaeMulQLbTbyDY9DZzEcWoYv0Rv5a3vG/COapm0bqWqtYltgH2gwChUITJ72qVTHhfjf1nTs6eYy+6kuFoNLFW0X9NHDlW6ETPcZPGGi20MJVEf5egbiofb3v178mHMNBSq/WWbDSA0wjm/5DT4/C9lskL72NdcNiGqCB+BtJInaYvITXkPzG5Ku2MzNSpB1MTfjFt7w3CiCGIRcQyvT/27sXMHHV1hJMg91A9tubYd5McyDSKPhW+Rq5cRPeay0Rzkl/8IQMVHkWgSlLzGvYx7nXQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAAn0FmoJPCB+2/LkythTJpR4NSojaed9lJCS4k5GOqEWYN9kmswv6ExWWRclVGOashx0fPip0/45pY0sr6nOb23bj0ZVTqDuB+XvByTaRVZgezclu8EMpZd0rozr4p9eQN4xYHHCjE5ChQlm3bN/6iyxd8oiN+MzQEiQE45fghgtfvuw4JwOk2CtK32tRZMjM6wS2zhdMiwHeTycdNiY/DyH8TO9b+8SMgK5JvjIw3aspQPoYiLAz8YT86mGutlMAOl5rAXU/RRIsmsPDdpIhgSjl7MNYEVPMmSNbZEKnhngXKK+QC/8VyID+pWM6wl/DOeZig/kaNp9Ih/5i3nzHlc=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"2893014a1c1346898c7aec9b67c90340"}, [
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
  '0d211d2f-2dd2-4149-a173-99212931b50e',
  'x-ms-request-id',
  'ff2231de-4164-4e37-9ffb-02fd9f6fd81c',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:22:02 GMT',
  'Content-Length',
  '1336'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/CRUDCertificateName-candisableacertificate-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-candisableacertificate-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAq6qpudaoZIBkaBo0lkJPcTct7DVN568+vmUCtszoIacA9sO4c5DzvcBxhuUdmaeMulQLbTbyDY9DZzEcWoYv0Rv5a3vG/COapm0bqWqtYltgH2gwChUITJ72qVTHhfjf1nTs6eYy+6kuFoNLFW0X9NHDlW6ETPcZPGGi20MJVEf5egbiofb3v178mHMNBSq/WWbDSA0wjm/5DT4/C9lskL72NdcNiGqCB+BtJInaYvITXkPzG5Ku2MzNSpB1MTfjFt7w3CiCGIRcQyvT/27sXMHHV1hJMg91A9tubYd5McyDSKPhW+Rq5cRPeay0Rzkl/8IQMVHkWgSlLzGvYx7nXQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAAn0FmoJPCB+2/LkythTJpR4NSojaed9lJCS4k5GOqEWYN9kmswv6ExWWRclVGOashx0fPip0/45pY0sr6nOb23bj0ZVTqDuB+XvByTaRVZgezclu8EMpZd0rozr4p9eQN4xYHHCjE5ChQlm3bN/6iyxd8oiN+MzQEiQE45fghgtfvuw4JwOk2CtK32tRZMjM6wS2zhdMiwHeTycdNiY/DyH8TO9b+8SMgK5JvjIw3aspQPoYiLAz8YT86mGutlMAOl5rAXU/RRIsmsPDdpIhgSjl7MNYEVPMmSNbZEKnhngXKK+QC/8VyID+pWM6wl/DOeZig/kaNp9Ih/5i3nzHlc=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"2893014a1c1346898c7aec9b67c90340"}, [
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
  '0962a81e-c24e-4644-bb03-858aeab26aa4',
  'x-ms-request-id',
  'e70165d1-a0d7-4252-b8f3-2d18a78f0834',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:22:04 GMT',
  'Content-Length',
  '1336'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/CRUDCertificateName-candisableacertificate-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-candisableacertificate-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAq6qpudaoZIBkaBo0lkJPcTct7DVN568+vmUCtszoIacA9sO4c5DzvcBxhuUdmaeMulQLbTbyDY9DZzEcWoYv0Rv5a3vG/COapm0bqWqtYltgH2gwChUITJ72qVTHhfjf1nTs6eYy+6kuFoNLFW0X9NHDlW6ETPcZPGGi20MJVEf5egbiofb3v178mHMNBSq/WWbDSA0wjm/5DT4/C9lskL72NdcNiGqCB+BtJInaYvITXkPzG5Ku2MzNSpB1MTfjFt7w3CiCGIRcQyvT/27sXMHHV1hJMg91A9tubYd5McyDSKPhW+Rq5cRPeay0Rzkl/8IQMVHkWgSlLzGvYx7nXQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAAn0FmoJPCB+2/LkythTJpR4NSojaed9lJCS4k5GOqEWYN9kmswv6ExWWRclVGOashx0fPip0/45pY0sr6nOb23bj0ZVTqDuB+XvByTaRVZgezclu8EMpZd0rozr4p9eQN4xYHHCjE5ChQlm3bN/6iyxd8oiN+MzQEiQE45fghgtfvuw4JwOk2CtK32tRZMjM6wS2zhdMiwHeTycdNiY/DyH8TO9b+8SMgK5JvjIw3aspQPoYiLAz8YT86mGutlMAOl5rAXU/RRIsmsPDdpIhgSjl7MNYEVPMmSNbZEKnhngXKK+QC/8VyID+pWM6wl/DOeZig/kaNp9Ih/5i3nzHlc=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"2893014a1c1346898c7aec9b67c90340"}, [
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
  '928df1ca-81a4-4611-9c2e-d76b9f887cc8',
  'x-ms-request-id',
  '0c164949-8100-4187-be23-132a9ab40e91',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:22:06 GMT',
  'Content-Length',
  '1336'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/CRUDCertificateName-candisableacertificate-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-candisableacertificate-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAq6qpudaoZIBkaBo0lkJPcTct7DVN568+vmUCtszoIacA9sO4c5DzvcBxhuUdmaeMulQLbTbyDY9DZzEcWoYv0Rv5a3vG/COapm0bqWqtYltgH2gwChUITJ72qVTHhfjf1nTs6eYy+6kuFoNLFW0X9NHDlW6ETPcZPGGi20MJVEf5egbiofb3v178mHMNBSq/WWbDSA0wjm/5DT4/C9lskL72NdcNiGqCB+BtJInaYvITXkPzG5Ku2MzNSpB1MTfjFt7w3CiCGIRcQyvT/27sXMHHV1hJMg91A9tubYd5McyDSKPhW+Rq5cRPeay0Rzkl/8IQMVHkWgSlLzGvYx7nXQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAAn0FmoJPCB+2/LkythTJpR4NSojaed9lJCS4k5GOqEWYN9kmswv6ExWWRclVGOashx0fPip0/45pY0sr6nOb23bj0ZVTqDuB+XvByTaRVZgezclu8EMpZd0rozr4p9eQN4xYHHCjE5ChQlm3bN/6iyxd8oiN+MzQEiQE45fghgtfvuw4JwOk2CtK32tRZMjM6wS2zhdMiwHeTycdNiY/DyH8TO9b+8SMgK5JvjIw3aspQPoYiLAz8YT86mGutlMAOl5rAXU/RRIsmsPDdpIhgSjl7MNYEVPMmSNbZEKnhngXKK+QC/8VyID+pWM6wl/DOeZig/kaNp9Ih/5i3nzHlc=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"2893014a1c1346898c7aec9b67c90340"}, [
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
  'fcdc8618-b281-4b82-acd7-bd87dba0ab05',
  'x-ms-request-id',
  'b2fe56e9-59b6-40b4-814d-ee68682d3f44',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:22:08 GMT',
  'Content-Length',
  '1336'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/CRUDCertificateName-candisableacertificate-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-candisableacertificate-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAq6qpudaoZIBkaBo0lkJPcTct7DVN568+vmUCtszoIacA9sO4c5DzvcBxhuUdmaeMulQLbTbyDY9DZzEcWoYv0Rv5a3vG/COapm0bqWqtYltgH2gwChUITJ72qVTHhfjf1nTs6eYy+6kuFoNLFW0X9NHDlW6ETPcZPGGi20MJVEf5egbiofb3v178mHMNBSq/WWbDSA0wjm/5DT4/C9lskL72NdcNiGqCB+BtJInaYvITXkPzG5Ku2MzNSpB1MTfjFt7w3CiCGIRcQyvT/27sXMHHV1hJMg91A9tubYd5McyDSKPhW+Rq5cRPeay0Rzkl/8IQMVHkWgSlLzGvYx7nXQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAAn0FmoJPCB+2/LkythTJpR4NSojaed9lJCS4k5GOqEWYN9kmswv6ExWWRclVGOashx0fPip0/45pY0sr6nOb23bj0ZVTqDuB+XvByTaRVZgezclu8EMpZd0rozr4p9eQN4xYHHCjE5ChQlm3bN/6iyxd8oiN+MzQEiQE45fghgtfvuw4JwOk2CtK32tRZMjM6wS2zhdMiwHeTycdNiY/DyH8TO9b+8SMgK5JvjIw3aspQPoYiLAz8YT86mGutlMAOl5rAXU/RRIsmsPDdpIhgSjl7MNYEVPMmSNbZEKnhngXKK+QC/8VyID+pWM6wl/DOeZig/kaNp9Ih/5i3nzHlc=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"2893014a1c1346898c7aec9b67c90340"}, [
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
  '9d6d7074-b803-40ea-8fc1-4bb095a2de17',
  'x-ms-request-id',
  '2700a4e0-db6a-4672-999a-bece0b9e5803',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:22:11 GMT',
  'Content-Length',
  '1336'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/CRUDCertificateName-candisableacertificate-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-candisableacertificate-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAq6qpudaoZIBkaBo0lkJPcTct7DVN568+vmUCtszoIacA9sO4c5DzvcBxhuUdmaeMulQLbTbyDY9DZzEcWoYv0Rv5a3vG/COapm0bqWqtYltgH2gwChUITJ72qVTHhfjf1nTs6eYy+6kuFoNLFW0X9NHDlW6ETPcZPGGi20MJVEf5egbiofb3v178mHMNBSq/WWbDSA0wjm/5DT4/C9lskL72NdcNiGqCB+BtJInaYvITXkPzG5Ku2MzNSpB1MTfjFt7w3CiCGIRcQyvT/27sXMHHV1hJMg91A9tubYd5McyDSKPhW+Rq5cRPeay0Rzkl/8IQMVHkWgSlLzGvYx7nXQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAAn0FmoJPCB+2/LkythTJpR4NSojaed9lJCS4k5GOqEWYN9kmswv6ExWWRclVGOashx0fPip0/45pY0sr6nOb23bj0ZVTqDuB+XvByTaRVZgezclu8EMpZd0rozr4p9eQN4xYHHCjE5ChQlm3bN/6iyxd8oiN+MzQEiQE45fghgtfvuw4JwOk2CtK32tRZMjM6wS2zhdMiwHeTycdNiY/DyH8TO9b+8SMgK5JvjIw3aspQPoYiLAz8YT86mGutlMAOl5rAXU/RRIsmsPDdpIhgSjl7MNYEVPMmSNbZEKnhngXKK+QC/8VyID+pWM6wl/DOeZig/kaNp9Ih/5i3nzHlc=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"2893014a1c1346898c7aec9b67c90340"}, [
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
  'bc10ab59-9da3-4c6a-b07a-4e98b1b7f53a',
  'x-ms-request-id',
  '3cb808db-bd25-4479-a647-079ee425a43e',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:22:13 GMT',
  'Content-Length',
  '1336'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/CRUDCertificateName-candisableacertificate-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-candisableacertificate-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAq6qpudaoZIBkaBo0lkJPcTct7DVN568+vmUCtszoIacA9sO4c5DzvcBxhuUdmaeMulQLbTbyDY9DZzEcWoYv0Rv5a3vG/COapm0bqWqtYltgH2gwChUITJ72qVTHhfjf1nTs6eYy+6kuFoNLFW0X9NHDlW6ETPcZPGGi20MJVEf5egbiofb3v178mHMNBSq/WWbDSA0wjm/5DT4/C9lskL72NdcNiGqCB+BtJInaYvITXkPzG5Ku2MzNSpB1MTfjFt7w3CiCGIRcQyvT/27sXMHHV1hJMg91A9tubYd5McyDSKPhW+Rq5cRPeay0Rzkl/8IQMVHkWgSlLzGvYx7nXQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAAn0FmoJPCB+2/LkythTJpR4NSojaed9lJCS4k5GOqEWYN9kmswv6ExWWRclVGOashx0fPip0/45pY0sr6nOb23bj0ZVTqDuB+XvByTaRVZgezclu8EMpZd0rozr4p9eQN4xYHHCjE5ChQlm3bN/6iyxd8oiN+MzQEiQE45fghgtfvuw4JwOk2CtK32tRZMjM6wS2zhdMiwHeTycdNiY/DyH8TO9b+8SMgK5JvjIw3aspQPoYiLAz8YT86mGutlMAOl5rAXU/RRIsmsPDdpIhgSjl7MNYEVPMmSNbZEKnhngXKK+QC/8VyID+pWM6wl/DOeZig/kaNp9Ih/5i3nzHlc=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"2893014a1c1346898c7aec9b67c90340"}, [
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
  'ce567411-50d5-44b5-9e1d-017fca8aff37',
  'x-ms-request-id',
  '8a637234-519c-4e8c-ada1-0ef38dc7876e',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:22:15 GMT',
  'Content-Length',
  '1336'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/CRUDCertificateName-candisableacertificate-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-candisableacertificate-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAq6qpudaoZIBkaBo0lkJPcTct7DVN568+vmUCtszoIacA9sO4c5DzvcBxhuUdmaeMulQLbTbyDY9DZzEcWoYv0Rv5a3vG/COapm0bqWqtYltgH2gwChUITJ72qVTHhfjf1nTs6eYy+6kuFoNLFW0X9NHDlW6ETPcZPGGi20MJVEf5egbiofb3v178mHMNBSq/WWbDSA0wjm/5DT4/C9lskL72NdcNiGqCB+BtJInaYvITXkPzG5Ku2MzNSpB1MTfjFt7w3CiCGIRcQyvT/27sXMHHV1hJMg91A9tubYd5McyDSKPhW+Rq5cRPeay0Rzkl/8IQMVHkWgSlLzGvYx7nXQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAAn0FmoJPCB+2/LkythTJpR4NSojaed9lJCS4k5GOqEWYN9kmswv6ExWWRclVGOashx0fPip0/45pY0sr6nOb23bj0ZVTqDuB+XvByTaRVZgezclu8EMpZd0rozr4p9eQN4xYHHCjE5ChQlm3bN/6iyxd8oiN+MzQEiQE45fghgtfvuw4JwOk2CtK32tRZMjM6wS2zhdMiwHeTycdNiY/DyH8TO9b+8SMgK5JvjIw3aspQPoYiLAz8YT86mGutlMAOl5rAXU/RRIsmsPDdpIhgSjl7MNYEVPMmSNbZEKnhngXKK+QC/8VyID+pWM6wl/DOeZig/kaNp9Ih/5i3nzHlc=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"2893014a1c1346898c7aec9b67c90340"}, [
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
  '7fe7bdbe-b751-4c7f-9794-0a30ed09ff4e',
  'x-ms-request-id',
  '5049ed07-feff-4125-b284-7780a8500f3c',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:22:17 GMT',
  'Content-Length',
  '1336'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/CRUDCertificateName-candisableacertificate-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-candisableacertificate-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAq6qpudaoZIBkaBo0lkJPcTct7DVN568+vmUCtszoIacA9sO4c5DzvcBxhuUdmaeMulQLbTbyDY9DZzEcWoYv0Rv5a3vG/COapm0bqWqtYltgH2gwChUITJ72qVTHhfjf1nTs6eYy+6kuFoNLFW0X9NHDlW6ETPcZPGGi20MJVEf5egbiofb3v178mHMNBSq/WWbDSA0wjm/5DT4/C9lskL72NdcNiGqCB+BtJInaYvITXkPzG5Ku2MzNSpB1MTfjFt7w3CiCGIRcQyvT/27sXMHHV1hJMg91A9tubYd5McyDSKPhW+Rq5cRPeay0Rzkl/8IQMVHkWgSlLzGvYx7nXQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAAn0FmoJPCB+2/LkythTJpR4NSojaed9lJCS4k5GOqEWYN9kmswv6ExWWRclVGOashx0fPip0/45pY0sr6nOb23bj0ZVTqDuB+XvByTaRVZgezclu8EMpZd0rozr4p9eQN4xYHHCjE5ChQlm3bN/6iyxd8oiN+MzQEiQE45fghgtfvuw4JwOk2CtK32tRZMjM6wS2zhdMiwHeTycdNiY/DyH8TO9b+8SMgK5JvjIw3aspQPoYiLAz8YT86mGutlMAOl5rAXU/RRIsmsPDdpIhgSjl7MNYEVPMmSNbZEKnhngXKK+QC/8VyID+pWM6wl/DOeZig/kaNp9Ih/5i3nzHlc=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"2893014a1c1346898c7aec9b67c90340"}, [
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
  '18669783-8abd-42ee-a126-536a2d1cd17a',
  'x-ms-request-id',
  '71891fc9-22df-4103-8d6d-889dea1e387b',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:22:19 GMT',
  'Content-Length',
  '1336'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/CRUDCertificateName-candisableacertificate-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-candisableacertificate-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAq6qpudaoZIBkaBo0lkJPcTct7DVN568+vmUCtszoIacA9sO4c5DzvcBxhuUdmaeMulQLbTbyDY9DZzEcWoYv0Rv5a3vG/COapm0bqWqtYltgH2gwChUITJ72qVTHhfjf1nTs6eYy+6kuFoNLFW0X9NHDlW6ETPcZPGGi20MJVEf5egbiofb3v178mHMNBSq/WWbDSA0wjm/5DT4/C9lskL72NdcNiGqCB+BtJInaYvITXkPzG5Ku2MzNSpB1MTfjFt7w3CiCGIRcQyvT/27sXMHHV1hJMg91A9tubYd5McyDSKPhW+Rq5cRPeay0Rzkl/8IQMVHkWgSlLzGvYx7nXQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAAn0FmoJPCB+2/LkythTJpR4NSojaed9lJCS4k5GOqEWYN9kmswv6ExWWRclVGOashx0fPip0/45pY0sr6nOb23bj0ZVTqDuB+XvByTaRVZgezclu8EMpZd0rozr4p9eQN4xYHHCjE5ChQlm3bN/6iyxd8oiN+MzQEiQE45fghgtfvuw4JwOk2CtK32tRZMjM6wS2zhdMiwHeTycdNiY/DyH8TO9b+8SMgK5JvjIw3aspQPoYiLAz8YT86mGutlMAOl5rAXU/RRIsmsPDdpIhgSjl7MNYEVPMmSNbZEKnhngXKK+QC/8VyID+pWM6wl/DOeZig/kaNp9Ih/5i3nzHlc=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"2893014a1c1346898c7aec9b67c90340"}, [
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
  '6598300c-f018-4820-ad7f-a6b70f751e95',
  'x-ms-request-id',
  'db04d3b9-16e6-4f29-a7e1-6a2eec6e02b0',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:22:22 GMT',
  'Content-Length',
  '1336'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/CRUDCertificateName-candisableacertificate-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-candisableacertificate-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAq6qpudaoZIBkaBo0lkJPcTct7DVN568+vmUCtszoIacA9sO4c5DzvcBxhuUdmaeMulQLbTbyDY9DZzEcWoYv0Rv5a3vG/COapm0bqWqtYltgH2gwChUITJ72qVTHhfjf1nTs6eYy+6kuFoNLFW0X9NHDlW6ETPcZPGGi20MJVEf5egbiofb3v178mHMNBSq/WWbDSA0wjm/5DT4/C9lskL72NdcNiGqCB+BtJInaYvITXkPzG5Ku2MzNSpB1MTfjFt7w3CiCGIRcQyvT/27sXMHHV1hJMg91A9tubYd5McyDSKPhW+Rq5cRPeay0Rzkl/8IQMVHkWgSlLzGvYx7nXQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAAn0FmoJPCB+2/LkythTJpR4NSojaed9lJCS4k5GOqEWYN9kmswv6ExWWRclVGOashx0fPip0/45pY0sr6nOb23bj0ZVTqDuB+XvByTaRVZgezclu8EMpZd0rozr4p9eQN4xYHHCjE5ChQlm3bN/6iyxd8oiN+MzQEiQE45fghgtfvuw4JwOk2CtK32tRZMjM6wS2zhdMiwHeTycdNiY/DyH8TO9b+8SMgK5JvjIw3aspQPoYiLAz8YT86mGutlMAOl5rAXU/RRIsmsPDdpIhgSjl7MNYEVPMmSNbZEKnhngXKK+QC/8VyID+pWM6wl/DOeZig/kaNp9Ih/5i3nzHlc=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"2893014a1c1346898c7aec9b67c90340"}, [
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
  'd3403564-23df-4e2a-a80c-6c7e5c92511a',
  'x-ms-request-id',
  'b61a3656-286f-46e7-b1ad-a759bce233b2',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:22:24 GMT',
  'Content-Length',
  '1336'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/CRUDCertificateName-candisableacertificate-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-candisableacertificate-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAq6qpudaoZIBkaBo0lkJPcTct7DVN568+vmUCtszoIacA9sO4c5DzvcBxhuUdmaeMulQLbTbyDY9DZzEcWoYv0Rv5a3vG/COapm0bqWqtYltgH2gwChUITJ72qVTHhfjf1nTs6eYy+6kuFoNLFW0X9NHDlW6ETPcZPGGi20MJVEf5egbiofb3v178mHMNBSq/WWbDSA0wjm/5DT4/C9lskL72NdcNiGqCB+BtJInaYvITXkPzG5Ku2MzNSpB1MTfjFt7w3CiCGIRcQyvT/27sXMHHV1hJMg91A9tubYd5McyDSKPhW+Rq5cRPeay0Rzkl/8IQMVHkWgSlLzGvYx7nXQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAAn0FmoJPCB+2/LkythTJpR4NSojaed9lJCS4k5GOqEWYN9kmswv6ExWWRclVGOashx0fPip0/45pY0sr6nOb23bj0ZVTqDuB+XvByTaRVZgezclu8EMpZd0rozr4p9eQN4xYHHCjE5ChQlm3bN/6iyxd8oiN+MzQEiQE45fghgtfvuw4JwOk2CtK32tRZMjM6wS2zhdMiwHeTycdNiY/DyH8TO9b+8SMgK5JvjIw3aspQPoYiLAz8YT86mGutlMAOl5rAXU/RRIsmsPDdpIhgSjl7MNYEVPMmSNbZEKnhngXKK+QC/8VyID+pWM6wl/DOeZig/kaNp9Ih/5i3nzHlc=","cancellation_requested":false,"status":"completed","target":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-candisableacertificate-","request_id":"2893014a1c1346898c7aec9b67c90340"}, [
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
  'e3e7a678-0fb5-4f37-93dd-4e8f47db6b4d',
  'x-ms-request-id',
  'ff01e4c9-14fb-405a-8818-fa62c35af9ea',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:22:25 GMT',
  'Content-Length',
  '1299'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/CRUDCertificateName-candisableacertificate-/')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-candisableacertificate-/aed62bfa8d7a4d299815ac9af279b271","kid":"https://keyvault_name.vault.azure.net/keys/CRUDCertificateName-candisableacertificate-/aed62bfa8d7a4d299815ac9af279b271","sid":"https://keyvault_name.vault.azure.net/secrets/CRUDCertificateName-candisableacertificate-/aed62bfa8d7a4d299815ac9af279b271","x5t":"7CwQWjjGf0uF39So2kmqFQIhjK8","cer":"MIIDKDCCAhCgAwIBAgIQH/EG+4sURNG0driHr5GsszANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjEwNDI4MjAxMjIzWhcNMjIwNDI4MjAyMjIzWjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQCrqqm51qhkgGRoGjSWQk9xNy3sNU3nrz6+ZQK2zOghpwD2w7hzkPO9wHGG5R2Zp4y6VAttNvINj0NnMRxahi/RG/lre8b8I5qmbRupaq1iW2AfaDAKFQhMnvapVMeF+N/WdOzp5jL7qS4Wg0sVbRf00cOVboRM9xk8YaLbQwlUR/l6BuKh9ve/XvyYcw0FKr9ZZsNIDTCOb/kNPj8L2WyQvvY11w2IaoIH4G0kidpi8hNeQ/Mbkq7YzM1KkHUxN+MW3vDcKIIYhFxDK9P/buxcwcdXWEkyD3UD225th3kxzINIo+Fb5GrlxE95rLRHOSX/whAxUeRaBKUvMa9jHuddAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBTMMhGHIZmDHOp7ZHe/EISkqIdvAjAdBgNVHQ4EFgQUzDIRhyGZgxzqe2R3vxCEpKiHbwIwDQYJKoZIhvcNAQELBQADggEBAJy7sHNkqrSm0ffoa8Xhr34/kiuxZ+odjSvvArWu5dU/a1bpQaNoVT0kVY5OxH5hI1UIYL3qdF6JqB7uZPpDgAwJLS0L2GM9MHOPVvdXhnIuwe9iYQsUx10+1fxnD/xPLW0woj5dovfjOD8BeEmhMD5Hb6nXQNVKkeKy2hHdj/HcWJv0lRaogV01YBVwXjud3LW6P9kkQEAn6NeyBQnHlh3hwLUMvJVRKMrtjxEExiRhrLFbdHHszxd7A7tfwvtXFlkEbbVoKCc6YZfD0bz+1rfd4NKmlLTWtZ1fNp/jeAxv7KhsM1qYcRrXAGLaqhU0LpWCiE/nmycPO/8dOpnuanc=","attributes":{"enabled":true,"nbf":1619640743,"exp":1651177343,"created":1619641344,"updated":1619641344,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-candisableacertificate-/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1619641312,"updated":1619641312}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-candisableacertificate-/pending"}}, [
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
  '35dba49d-4f4f-405c-a377-2e405665d269',
  'x-ms-request-id',
  '09e01b78-b255-448d-9dd5-60190c02e5dd',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:22:25 GMT',
  'Content-Length',
  '2570'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .patch('/certificates/CRUDCertificateName-candisableacertificate-/', {"attributes":{"enabled":false}})
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-candisableacertificate-/aed62bfa8d7a4d299815ac9af279b271","kid":"https://keyvault_name.vault.azure.net/keys/CRUDCertificateName-candisableacertificate-/aed62bfa8d7a4d299815ac9af279b271","sid":"https://keyvault_name.vault.azure.net/secrets/CRUDCertificateName-candisableacertificate-/aed62bfa8d7a4d299815ac9af279b271","x5t":"7CwQWjjGf0uF39So2kmqFQIhjK8","cer":"MIIDKDCCAhCgAwIBAgIQH/EG+4sURNG0driHr5GsszANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjEwNDI4MjAxMjIzWhcNMjIwNDI4MjAyMjIzWjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQCrqqm51qhkgGRoGjSWQk9xNy3sNU3nrz6+ZQK2zOghpwD2w7hzkPO9wHGG5R2Zp4y6VAttNvINj0NnMRxahi/RG/lre8b8I5qmbRupaq1iW2AfaDAKFQhMnvapVMeF+N/WdOzp5jL7qS4Wg0sVbRf00cOVboRM9xk8YaLbQwlUR/l6BuKh9ve/XvyYcw0FKr9ZZsNIDTCOb/kNPj8L2WyQvvY11w2IaoIH4G0kidpi8hNeQ/Mbkq7YzM1KkHUxN+MW3vDcKIIYhFxDK9P/buxcwcdXWEkyD3UD225th3kxzINIo+Fb5GrlxE95rLRHOSX/whAxUeRaBKUvMa9jHuddAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBTMMhGHIZmDHOp7ZHe/EISkqIdvAjAdBgNVHQ4EFgQUzDIRhyGZgxzqe2R3vxCEpKiHbwIwDQYJKoZIhvcNAQELBQADggEBAJy7sHNkqrSm0ffoa8Xhr34/kiuxZ+odjSvvArWu5dU/a1bpQaNoVT0kVY5OxH5hI1UIYL3qdF6JqB7uZPpDgAwJLS0L2GM9MHOPVvdXhnIuwe9iYQsUx10+1fxnD/xPLW0woj5dovfjOD8BeEmhMD5Hb6nXQNVKkeKy2hHdj/HcWJv0lRaogV01YBVwXjud3LW6P9kkQEAn6NeyBQnHlh3hwLUMvJVRKMrtjxEExiRhrLFbdHHszxd7A7tfwvtXFlkEbbVoKCc6YZfD0bz+1rfd4NKmlLTWtZ1fNp/jeAxv7KhsM1qYcRrXAGLaqhU0LpWCiE/nmycPO/8dOpnuanc=","attributes":{"enabled":false,"nbf":1619640743,"exp":1651177343,"created":1619641344,"updated":1619641346,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-candisableacertificate-/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1619641312,"updated":1619641312}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-candisableacertificate-/pending"}}, [
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
  'fed17f55-af4e-4737-bcc2-01349b858aea',
  'x-ms-request-id',
  '97372635-8c9b-46ad-a7fb-3b7f67f068f5',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:22:26 GMT',
  'Content-Length',
  '2571'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/CRUDCertificateName-candisableacertificate-/')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-candisableacertificate-/aed62bfa8d7a4d299815ac9af279b271","kid":"https://keyvault_name.vault.azure.net/keys/CRUDCertificateName-candisableacertificate-/aed62bfa8d7a4d299815ac9af279b271","sid":"https://keyvault_name.vault.azure.net/secrets/CRUDCertificateName-candisableacertificate-/aed62bfa8d7a4d299815ac9af279b271","x5t":"7CwQWjjGf0uF39So2kmqFQIhjK8","cer":"MIIDKDCCAhCgAwIBAgIQH/EG+4sURNG0driHr5GsszANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjEwNDI4MjAxMjIzWhcNMjIwNDI4MjAyMjIzWjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQCrqqm51qhkgGRoGjSWQk9xNy3sNU3nrz6+ZQK2zOghpwD2w7hzkPO9wHGG5R2Zp4y6VAttNvINj0NnMRxahi/RG/lre8b8I5qmbRupaq1iW2AfaDAKFQhMnvapVMeF+N/WdOzp5jL7qS4Wg0sVbRf00cOVboRM9xk8YaLbQwlUR/l6BuKh9ve/XvyYcw0FKr9ZZsNIDTCOb/kNPj8L2WyQvvY11w2IaoIH4G0kidpi8hNeQ/Mbkq7YzM1KkHUxN+MW3vDcKIIYhFxDK9P/buxcwcdXWEkyD3UD225th3kxzINIo+Fb5GrlxE95rLRHOSX/whAxUeRaBKUvMa9jHuddAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBTMMhGHIZmDHOp7ZHe/EISkqIdvAjAdBgNVHQ4EFgQUzDIRhyGZgxzqe2R3vxCEpKiHbwIwDQYJKoZIhvcNAQELBQADggEBAJy7sHNkqrSm0ffoa8Xhr34/kiuxZ+odjSvvArWu5dU/a1bpQaNoVT0kVY5OxH5hI1UIYL3qdF6JqB7uZPpDgAwJLS0L2GM9MHOPVvdXhnIuwe9iYQsUx10+1fxnD/xPLW0woj5dovfjOD8BeEmhMD5Hb6nXQNVKkeKy2hHdj/HcWJv0lRaogV01YBVwXjud3LW6P9kkQEAn6NeyBQnHlh3hwLUMvJVRKMrtjxEExiRhrLFbdHHszxd7A7tfwvtXFlkEbbVoKCc6YZfD0bz+1rfd4NKmlLTWtZ1fNp/jeAxv7KhsM1qYcRrXAGLaqhU0LpWCiE/nmycPO/8dOpnuanc=","attributes":{"enabled":false,"nbf":1619640743,"exp":1651177343,"created":1619641344,"updated":1619641346,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-candisableacertificate-/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1619641312,"updated":1619641312}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-candisableacertificate-/pending"}}, [
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
  'bcdb348e-df4a-4522-8595-16c254d390b0',
  'x-ms-request-id',
  'a0239052-3375-4e71-b2cf-75413236068f',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:22:26 GMT',
  'Content-Length',
  '2571'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/certificates/CRUDCertificateName-candisableacertificate-')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/CRUDCertificateName-candisableacertificate-","deletedDate":1619641346,"scheduledPurgeDate":1627417346,"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-candisableacertificate-/aed62bfa8d7a4d299815ac9af279b271","kid":"https://keyvault_name.vault.azure.net/keys/CRUDCertificateName-candisableacertificate-/aed62bfa8d7a4d299815ac9af279b271","sid":"https://keyvault_name.vault.azure.net/secrets/CRUDCertificateName-candisableacertificate-/aed62bfa8d7a4d299815ac9af279b271","x5t":"7CwQWjjGf0uF39So2kmqFQIhjK8","cer":"MIIDKDCCAhCgAwIBAgIQH/EG+4sURNG0driHr5GsszANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjEwNDI4MjAxMjIzWhcNMjIwNDI4MjAyMjIzWjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQCrqqm51qhkgGRoGjSWQk9xNy3sNU3nrz6+ZQK2zOghpwD2w7hzkPO9wHGG5R2Zp4y6VAttNvINj0NnMRxahi/RG/lre8b8I5qmbRupaq1iW2AfaDAKFQhMnvapVMeF+N/WdOzp5jL7qS4Wg0sVbRf00cOVboRM9xk8YaLbQwlUR/l6BuKh9ve/XvyYcw0FKr9ZZsNIDTCOb/kNPj8L2WyQvvY11w2IaoIH4G0kidpi8hNeQ/Mbkq7YzM1KkHUxN+MW3vDcKIIYhFxDK9P/buxcwcdXWEkyD3UD225th3kxzINIo+Fb5GrlxE95rLRHOSX/whAxUeRaBKUvMa9jHuddAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBTMMhGHIZmDHOp7ZHe/EISkqIdvAjAdBgNVHQ4EFgQUzDIRhyGZgxzqe2R3vxCEpKiHbwIwDQYJKoZIhvcNAQELBQADggEBAJy7sHNkqrSm0ffoa8Xhr34/kiuxZ+odjSvvArWu5dU/a1bpQaNoVT0kVY5OxH5hI1UIYL3qdF6JqB7uZPpDgAwJLS0L2GM9MHOPVvdXhnIuwe9iYQsUx10+1fxnD/xPLW0woj5dovfjOD8BeEmhMD5Hb6nXQNVKkeKy2hHdj/HcWJv0lRaogV01YBVwXjud3LW6P9kkQEAn6NeyBQnHlh3hwLUMvJVRKMrtjxEExiRhrLFbdHHszxd7A7tfwvtXFlkEbbVoKCc6YZfD0bz+1rfd4NKmlLTWtZ1fNp/jeAxv7KhsM1qYcRrXAGLaqhU0LpWCiE/nmycPO/8dOpnuanc=","attributes":{"enabled":false,"nbf":1619640743,"exp":1651177343,"created":1619641344,"updated":1619641346,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-candisableacertificate-/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1619641312,"updated":1619641312}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-candisableacertificate-/pending"}}, [
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
  '434ce363-2cd9-482f-ad05-598a4367e760',
  'x-ms-request-id',
  '316d8e94-e4e5-40ac-b67d-788ecd7782c3',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:22:26 GMT',
  'Content-Length',
  '2767'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/CRUDCertificateName-candisableacertificate-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: CRUDCertificateName-candisableacertificate-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '143',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '2468fbd8-d71e-4a4e-ac6c-d05c2f857bce',
  'x-ms-request-id',
  '6c1d498d-3eaa-43a5-8da7-9d3dd49c0f86',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:22:26 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/CRUDCertificateName-candisableacertificate-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: CRUDCertificateName-candisableacertificate-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '143',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'bc748d9e-b912-4634-a289-fe9fc71be3eb',
  'x-ms-request-id',
  '17cb6055-5e45-4692-8766-940ded626b9d',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:22:26 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/CRUDCertificateName-candisableacertificate-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: CRUDCertificateName-candisableacertificate-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '143',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '7a066e92-a21c-4feb-a1b1-51500d5516f0',
  'x-ms-request-id',
  '34a419e3-76ee-411a-9ba6-5c0614b304be',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:22:28 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/CRUDCertificateName-candisableacertificate-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: CRUDCertificateName-candisableacertificate-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '143',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '2e83607d-bb14-48d2-bdd0-364475d27661',
  'x-ms-request-id',
  '7fbf1b02-1297-41fc-b977-57b8c0aaf26e',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:22:30 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/CRUDCertificateName-candisableacertificate-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: CRUDCertificateName-candisableacertificate-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '143',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '7976022e-4fe0-45cc-a6c7-906c6f9161de',
  'x-ms-request-id',
  '49c2f4fa-a848-47c4-bd4c-4afcde1e8a7d',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:22:32 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/CRUDCertificateName-candisableacertificate-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: CRUDCertificateName-candisableacertificate-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '143',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'c669b6a6-0b7e-41ea-bb0b-6c8b09fafbca',
  'x-ms-request-id',
  '894bf01e-10f2-417d-88ab-8ffbb49b846a',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:22:34 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/CRUDCertificateName-candisableacertificate-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: CRUDCertificateName-candisableacertificate-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '143',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'b00fc75d-1817-4b2d-b04e-c6292d8a51f5',
  'x-ms-request-id',
  'fb86043c-f3ac-448e-84df-dfb17f7849e6',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:22:36 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/CRUDCertificateName-candisableacertificate-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: CRUDCertificateName-candisableacertificate-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '143',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'e7dc38ec-06a1-489e-b2c9-fb575d362286',
  'x-ms-request-id',
  '01f5d474-da40-48d0-b901-4fcbb415ee36',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:22:39 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/CRUDCertificateName-candisableacertificate-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: CRUDCertificateName-candisableacertificate-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '143',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '43bafcf5-4c7a-413c-8052-8dc1603cf407',
  'x-ms-request-id',
  '61096894-8759-497c-a71e-b7ec07ea639e',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:22:41 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/CRUDCertificateName-candisableacertificate-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: CRUDCertificateName-candisableacertificate-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '143',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '0c126449-136b-4756-b13e-a9e20eb525be',
  'x-ms-request-id',
  'ba6dd45e-3a24-4bab-a665-6ece22551451',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:22:43 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/CRUDCertificateName-candisableacertificate-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: CRUDCertificateName-candisableacertificate-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '143',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'b417742b-7238-4996-8a6d-63739c78980a',
  'x-ms-request-id',
  '54aea433-53dd-45ef-90d2-52b00f465742',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:22:45 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/CRUDCertificateName-candisableacertificate-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: CRUDCertificateName-candisableacertificate-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '143',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '0740c063-7130-437d-94af-84a30d48f7c8',
  'x-ms-request-id',
  '05f92887-d5f6-43c1-aafb-36a65c0e9ce5',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:22:47 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/CRUDCertificateName-candisableacertificate-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: CRUDCertificateName-candisableacertificate-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '143',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'e2c9aad4-2486-4c89-a5f1-a2f834adb562',
  'x-ms-request-id',
  '0c00ad9e-e542-449f-9eae-c11860374935',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:22:49 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/CRUDCertificateName-candisableacertificate-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: CRUDCertificateName-candisableacertificate-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '143',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'c69253e0-a3bf-4bfe-b3ff-dd5bfb8cd89d',
  'x-ms-request-id',
  '46b50d3d-4716-4ca9-8d06-843cede2730e',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:22:51 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/CRUDCertificateName-candisableacertificate-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: CRUDCertificateName-candisableacertificate-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '143',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '0029a174-786c-48ac-adc0-bfe7829db4f7',
  'x-ms-request-id',
  '452dd4e2-1b84-41f3-99e2-24e38b1c4dd9',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:22:53 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/CRUDCertificateName-candisableacertificate-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: CRUDCertificateName-candisableacertificate-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '143',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '3d75f6af-7703-4ba6-b6a2-4c4280d2fcc2',
  'x-ms-request-id',
  '6bfeb7e3-8e90-48c2-a149-0b8c1bb65116',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:22:55 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/CRUDCertificateName-candisableacertificate-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: CRUDCertificateName-candisableacertificate-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '143',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'a1011def-4077-41ba-8e5c-873ff5d82772',
  'x-ms-request-id',
  '3be3c41d-94bb-4fc3-b0b4-1458b6b63177',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:22:58 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/CRUDCertificateName-candisableacertificate-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: CRUDCertificateName-candisableacertificate-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '143',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '4afe31db-446e-4c2a-8337-1ccd379e21b8',
  'x-ms-request-id',
  '00b7d586-3be1-426a-a4a4-f6a874cfaf8b',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:23:00 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/CRUDCertificateName-candisableacertificate-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: CRUDCertificateName-candisableacertificate-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '143',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'e2ba0bdd-8188-4014-b7bd-bb6df531a171',
  'x-ms-request-id',
  'c947ad5a-c1cf-4c96-9fbd-2bccbdd5b335',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:23:02 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/CRUDCertificateName-candisableacertificate-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: CRUDCertificateName-candisableacertificate-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '143',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'bbc81faf-043f-4f12-971b-cb4158fd9cc4',
  'x-ms-request-id',
  '20d9e23f-cb81-4db7-aef5-39c849cf235f',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:23:04 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/CRUDCertificateName-candisableacertificate-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: CRUDCertificateName-candisableacertificate-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '143',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'e3bed557-71a3-4eb5-8061-991b84b38189',
  'x-ms-request-id',
  '917b83f9-fe50-470f-9b05-e7d3c4efe510',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:23:05 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/CRUDCertificateName-candisableacertificate-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: CRUDCertificateName-candisableacertificate-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '143',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'c0b62307-7bde-4d82-b14e-57a39d308522',
  'x-ms-request-id',
  '47dbb679-479b-4697-85b0-cf42d58a1f19',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:23:08 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/CRUDCertificateName-candisableacertificate-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: CRUDCertificateName-candisableacertificate-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '143',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'a62bbbd2-5bdd-4979-8246-912cd1fe6e19',
  'x-ms-request-id',
  'd7e4def9-4b78-4331-94a0-b9a280fec260',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:23:10 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/CRUDCertificateName-candisableacertificate-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: CRUDCertificateName-candisableacertificate-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '143',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '6b903610-6768-4ef7-8a25-c8d033f58f6c',
  'x-ms-request-id',
  'b08e7883-cd9e-42bd-a2ec-6ba7d76cf812',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:23:12 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/CRUDCertificateName-candisableacertificate-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: CRUDCertificateName-candisableacertificate-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '143',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'cbd92592-9ae9-4045-885e-4eb5a79e00fa',
  'x-ms-request-id',
  '14de287f-b112-4461-9058-c5f80c36a19b',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:23:14 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/CRUDCertificateName-candisableacertificate-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: CRUDCertificateName-candisableacertificate-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '143',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '5c730b5b-63a6-49c5-a50a-c0a231646aca',
  'x-ms-request-id',
  'b8571215-eea0-4693-ae79-5b773eaf838c',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:23:16 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/CRUDCertificateName-candisableacertificate-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: CRUDCertificateName-candisableacertificate-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '143',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '7477d1ac-432e-4716-b535-5f5efa6e5ea0',
  'x-ms-request-id',
  '07683322-3edf-4035-beac-2f2a9b8e21d9',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:23:18 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/CRUDCertificateName-candisableacertificate-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: CRUDCertificateName-candisableacertificate-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '143',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '7805d50a-e5d9-49b1-b83a-73abc7f026da',
  'x-ms-request-id',
  '0e052657-f2aa-4fcf-9ac9-cc9404b77637',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:23:20 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/CRUDCertificateName-candisableacertificate-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: CRUDCertificateName-candisableacertificate-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '143',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'de33296b-477a-4a37-8321-237a3809f51a',
  'x-ms-request-id',
  '997b8cb8-8521-49b5-8082-c262521f9382',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:23:22 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/CRUDCertificateName-candisableacertificate-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: CRUDCertificateName-candisableacertificate-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '143',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'f0d9df08-5681-4bdd-9ac4-94213637d117',
  'x-ms-request-id',
  'fc675540-093c-42c9-b9bb-7f918cfa8895',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:23:25 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/CRUDCertificateName-candisableacertificate-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: CRUDCertificateName-candisableacertificate-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '143',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '4546ab14-0256-4cea-8170-79e3211c6b1c',
  'x-ms-request-id',
  '3065f37c-f803-4136-bd46-fe9c31e4d080',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:23:27 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/CRUDCertificateName-candisableacertificate-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: CRUDCertificateName-candisableacertificate-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '143',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'd080e322-aa9e-4865-afc9-87e4115d710f',
  'x-ms-request-id',
  'fbb2681f-6730-4679-9277-e67e7299f0db',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:23:29 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/CRUDCertificateName-candisableacertificate-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: CRUDCertificateName-candisableacertificate-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '143',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '68dfc4b5-cf0b-4922-8631-85a86d2377f1',
  'x-ms-request-id',
  'd16d7d95-c8af-4156-bc95-be7559543322',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:23:31 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/CRUDCertificateName-candisableacertificate-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: CRUDCertificateName-candisableacertificate-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '143',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '85b6756c-f2b8-4268-bbb2-60c82eb89260',
  'x-ms-request-id',
  '6a365699-20d4-4495-b06d-919dec03497d',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:23:33 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/CRUDCertificateName-candisableacertificate-')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/CRUDCertificateName-candisableacertificate-","deletedDate":1619641346,"scheduledPurgeDate":1627417346,"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-candisableacertificate-/aed62bfa8d7a4d299815ac9af279b271","kid":"https://keyvault_name.vault.azure.net/keys/CRUDCertificateName-candisableacertificate-/aed62bfa8d7a4d299815ac9af279b271","sid":"https://keyvault_name.vault.azure.net/secrets/CRUDCertificateName-candisableacertificate-/aed62bfa8d7a4d299815ac9af279b271","x5t":"7CwQWjjGf0uF39So2kmqFQIhjK8","cer":"MIIDKDCCAhCgAwIBAgIQH/EG+4sURNG0driHr5GsszANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjEwNDI4MjAxMjIzWhcNMjIwNDI4MjAyMjIzWjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQCrqqm51qhkgGRoGjSWQk9xNy3sNU3nrz6+ZQK2zOghpwD2w7hzkPO9wHGG5R2Zp4y6VAttNvINj0NnMRxahi/RG/lre8b8I5qmbRupaq1iW2AfaDAKFQhMnvapVMeF+N/WdOzp5jL7qS4Wg0sVbRf00cOVboRM9xk8YaLbQwlUR/l6BuKh9ve/XvyYcw0FKr9ZZsNIDTCOb/kNPj8L2WyQvvY11w2IaoIH4G0kidpi8hNeQ/Mbkq7YzM1KkHUxN+MW3vDcKIIYhFxDK9P/buxcwcdXWEkyD3UD225th3kxzINIo+Fb5GrlxE95rLRHOSX/whAxUeRaBKUvMa9jHuddAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBTMMhGHIZmDHOp7ZHe/EISkqIdvAjAdBgNVHQ4EFgQUzDIRhyGZgxzqe2R3vxCEpKiHbwIwDQYJKoZIhvcNAQELBQADggEBAJy7sHNkqrSm0ffoa8Xhr34/kiuxZ+odjSvvArWu5dU/a1bpQaNoVT0kVY5OxH5hI1UIYL3qdF6JqB7uZPpDgAwJLS0L2GM9MHOPVvdXhnIuwe9iYQsUx10+1fxnD/xPLW0woj5dovfjOD8BeEmhMD5Hb6nXQNVKkeKy2hHdj/HcWJv0lRaogV01YBVwXjud3LW6P9kkQEAn6NeyBQnHlh3hwLUMvJVRKMrtjxEExiRhrLFbdHHszxd7A7tfwvtXFlkEbbVoKCc6YZfD0bz+1rfd4NKmlLTWtZ1fNp/jeAxv7KhsM1qYcRrXAGLaqhU0LpWCiE/nmycPO/8dOpnuanc=","attributes":{"enabled":false,"nbf":1619640743,"exp":1651177343,"created":1619641344,"updated":1619641346,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-candisableacertificate-/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1619641312,"updated":1619641312}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-candisableacertificate-/pending"}}, [
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
  '6ec7d1ee-6c7a-45f4-8d14-16bbe8c3fdce',
  'x-ms-request-id',
  '84dda63c-fff7-46d9-af32-1f220d39f2d7',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:23:35 GMT',
  'Content-Length',
  '2767'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedcertificates/CRUDCertificateName-candisableacertificate-')
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
  '69ba1ec2-92ca-479a-a525-504489d95483',
  'x-ms-request-id',
  '6ef6824d-a8a3-46e7-b2e2-2de608052ce7',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:23:35 GMT'
]);

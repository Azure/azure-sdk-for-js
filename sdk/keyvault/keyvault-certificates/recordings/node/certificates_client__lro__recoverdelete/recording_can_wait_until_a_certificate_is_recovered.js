let nock = require('nock');

module.exports.hash = "a1d96e510acbbd46c70cf3fa627a273c";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/certificates/lroRecoverCertificateName-canwaituntilacertificateisrecovered-/create')
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
  '10f5d73b-4b12-405a-aa95-e01f4a34300d',
  'x-ms-request-id',
  'dac8497e-5e58-43d8-82d2-8a834765fd44',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:23:23 GMT'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .get('/common/discovery/instance')
  .query(true)
  .reply(200, {"tenant_discovery_endpoint":"https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/v2.0/.well-known/openid-configuration","api-version":"1.1","metadata":[{"preferred_network":"login.microsoftonline.com","preferred_cache":"login.windows.net","aliases":["login.microsoftonline.com","login.windows.net","login.microsoft.com","sts.windows.net"]},{"preferred_network":"login.partner.microsoftonline.cn","preferred_cache":"login.partner.microsoftonline.cn","aliases":["login.partner.microsoftonline.cn","login.chinacloudapi.cn"]},{"preferred_network":"login.microsoftonline.de","preferred_cache":"login.microsoftonline.de","aliases":["login.microsoftonline.de"]},{"preferred_network":"login.microsoftonline.us","preferred_cache":"login.microsoftonline.us","aliases":["login.microsoftonline.us","login.usgovcloudapi.net"]},{"preferred_network":"login-us.microsoftonline.com","preferred_cache":"login-us.microsoftonline.com","aliases":["login-us.microsoftonline.com"]}]}, [
  'Cache-Control',
  'max-age=86400, private',
  'Content-Length',
  '980',
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
  'd42bbdd1-2725-48a7-bc07-5367a77f6f01',
  'x-ms-ests-server',
  '2.1.11654.16 - EUS ProdSlices',
  'Set-Cookie',
  'fpc=Al6ZDC79ZexBixMjAhGpxj8; expires=Fri, 28-May-2021 21:23:23 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrKOvPglgy8ZXpTmFv7D88M-sJ0X9aWVg1HANKXTx4iqT0ZrRJuF4lWBmmD1kiJWYl_OXIuaFj3mPHDS_f5rJ2s48vpG7dghwoF9hlJ8L9MsyTY2Fe2_BwcTRKAQFCFJ8duLansLPt0afMGwvV2fDeaz2oXDd01zpqir98ovoleHMgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 28 Apr 2021 21:23:23 GMT'
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
  '4c246855-8f5f-44ba-bb51-37d7d24f1201',
  'x-ms-ests-server',
  '2.1.11654.16 - WUS2 ProdSlices',
  'Set-Cookie',
  'fpc=Al6ZDC79ZexBixMjAhGpxj8; expires=Fri, 28-May-2021 21:23:23 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrKB9ZJ9YUrDtk2D-RWN0P839ZCOlDzhBgYh0DUbtqXzSxAHch68o58bbeG2f50s6cA6Ou5fyV1Um37iLCBN8evMi1U4REcMI2Rfgo1cEICbOEOz8nk5VXcaQ-z8qy1o1CtjtOqg1u45RnyIV2kAHekvV5NbckmhLrvuO0WT8Iuk8gAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 28 Apr 2021 21:23:23 GMT',
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
  '95a96d6c-b9cf-4027-bf1c-e32a32d4fb00',
  'x-ms-ests-server',
  '2.1.11654.16 - SCUS ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=Al6ZDC79ZexBixMjAhGpxj_mR1YbAQAAAEvJG9gOAAAA; expires=Fri, 28-May-2021 21:23:23 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 28 Apr 2021 21:23:23 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/certificates/lroRecoverCertificateName-canwaituntilacertificateisrecovered-/create', {"policy":{"key_props":{},"secret_props":{},"x509_props":{"subject":"cn=MyCert","sans":{}},"issuer":{"name":"Self"},"attributes":{}},"attributes":{}})
  .query(true)
  .reply(202, {"id":"https://keyvault_name.vault.azure.net/certificates/lroRecoverCertificateName-canwaituntilacertificateisrecovered-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAvlo3LGOMORNejhhv1dZvjiP1aFPqojKZEeUVcVhjAstCLeHjO+P+SPC1L35awSEAhGcP/vSKtLtdJwqJ7I1timi4MvGy5QVfY1e1vPtv5MJVXbbL0wX19NHtZX+lHaUr5sk9ys5wkA9JTJ92BCQTlkAi8PDR3tpWpDK2Ush/RMAxzQLbVAm7MFEYpj/hLZ4g+6PI+j6GfrTPu/Q0G/x6+YRKOHTt2ad69k+Q/fXDfx/oqXXHIDyhEfIsgcX80s2DD8b8NbEAd641ATfli6biLBF8v6wmY0Wgzya1YEdoJZZ4eWroi0alONoXqxGxX9zvRezND7cn/9q65hDycCHC/QIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAHlnvL8FcG0ygJAe/yDGfjpuTglcNQNvIEWx0fDB8fuHSJenm9MlMJjQh0eRLzwDHa/jbvP9ahwO7zhnHpfV4/hw1sg45Gy6NszIhXZDgU4Y7HDLhn2oOR9BU8lwaPf3UOKL7ddtU37Zaq6hL/crGHteFZETZ3Qwxbv7Me5GzBAOOe+IoFaPT4rffb88S2mygen1cOO6kUamb+wTwbmX5OaZChZv17zs2X1EaLP54XhkaQSBnNx9TB0ihkmjFQ2huS8m0AIg1GwOQ9H2wbPRrWsQRn4dwFLnhz2zMI3nR8Mt5Lyf0QdQVDSpdiY/jEuv3prbzuFgbMWKI6ZFDjA0dIo=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"d0d6d1e9d15c4c87a83f54164fac456c"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://keyvault_name.vault.azure.net/certificates/lroRecoverCertificateName-canwaituntilacertificateisrecovered-/pending?api-version=7.2&request_id=d0d6d1e9d15c4c87a83f54164fac456c',
  'Retry-After',
  '0',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '10f5d73b-4b12-405a-aa95-e01f4a34300d',
  'x-ms-request-id',
  '2b101c77-1800-425b-88ea-0bbc69a417f1',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:23:24 GMT',
  'Content-Length',
  '1354'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroRecoverCertificateName-canwaituntilacertificateisrecovered-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroRecoverCertificateName-canwaituntilacertificateisrecovered-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAvlo3LGOMORNejhhv1dZvjiP1aFPqojKZEeUVcVhjAstCLeHjO+P+SPC1L35awSEAhGcP/vSKtLtdJwqJ7I1timi4MvGy5QVfY1e1vPtv5MJVXbbL0wX19NHtZX+lHaUr5sk9ys5wkA9JTJ92BCQTlkAi8PDR3tpWpDK2Ush/RMAxzQLbVAm7MFEYpj/hLZ4g+6PI+j6GfrTPu/Q0G/x6+YRKOHTt2ad69k+Q/fXDfx/oqXXHIDyhEfIsgcX80s2DD8b8NbEAd641ATfli6biLBF8v6wmY0Wgzya1YEdoJZZ4eWroi0alONoXqxGxX9zvRezND7cn/9q65hDycCHC/QIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAHlnvL8FcG0ygJAe/yDGfjpuTglcNQNvIEWx0fDB8fuHSJenm9MlMJjQh0eRLzwDHa/jbvP9ahwO7zhnHpfV4/hw1sg45Gy6NszIhXZDgU4Y7HDLhn2oOR9BU8lwaPf3UOKL7ddtU37Zaq6hL/crGHteFZETZ3Qwxbv7Me5GzBAOOe+IoFaPT4rffb88S2mygen1cOO6kUamb+wTwbmX5OaZChZv17zs2X1EaLP54XhkaQSBnNx9TB0ihkmjFQ2huS8m0AIg1GwOQ9H2wbPRrWsQRn4dwFLnhz2zMI3nR8Mt5Lyf0QdQVDSpdiY/jEuv3prbzuFgbMWKI6ZFDjA0dIo=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"d0d6d1e9d15c4c87a83f54164fac456c"}, [
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
  'b9c18c2c-3808-4b41-b381-6c95cc8859c9',
  'x-ms-request-id',
  '419a8585-1b1f-469f-88f8-c1ed827ad110',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:23:24 GMT',
  'Content-Length',
  '1354'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroRecoverCertificateName-canwaituntilacertificateisrecovered-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroRecoverCertificateName-canwaituntilacertificateisrecovered-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAvlo3LGOMORNejhhv1dZvjiP1aFPqojKZEeUVcVhjAstCLeHjO+P+SPC1L35awSEAhGcP/vSKtLtdJwqJ7I1timi4MvGy5QVfY1e1vPtv5MJVXbbL0wX19NHtZX+lHaUr5sk9ys5wkA9JTJ92BCQTlkAi8PDR3tpWpDK2Ush/RMAxzQLbVAm7MFEYpj/hLZ4g+6PI+j6GfrTPu/Q0G/x6+YRKOHTt2ad69k+Q/fXDfx/oqXXHIDyhEfIsgcX80s2DD8b8NbEAd641ATfli6biLBF8v6wmY0Wgzya1YEdoJZZ4eWroi0alONoXqxGxX9zvRezND7cn/9q65hDycCHC/QIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAHlnvL8FcG0ygJAe/yDGfjpuTglcNQNvIEWx0fDB8fuHSJenm9MlMJjQh0eRLzwDHa/jbvP9ahwO7zhnHpfV4/hw1sg45Gy6NszIhXZDgU4Y7HDLhn2oOR9BU8lwaPf3UOKL7ddtU37Zaq6hL/crGHteFZETZ3Qwxbv7Me5GzBAOOe+IoFaPT4rffb88S2mygen1cOO6kUamb+wTwbmX5OaZChZv17zs2X1EaLP54XhkaQSBnNx9TB0ihkmjFQ2huS8m0AIg1GwOQ9H2wbPRrWsQRn4dwFLnhz2zMI3nR8Mt5Lyf0QdQVDSpdiY/jEuv3prbzuFgbMWKI6ZFDjA0dIo=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"d0d6d1e9d15c4c87a83f54164fac456c"}, [
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
  'a4ea1cfb-0054-4820-a7b3-01ef7c40a533',
  'x-ms-request-id',
  'f3a883c6-8681-4a0c-99dc-59f987b966ab',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:23:24 GMT',
  'Content-Length',
  '1354'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroRecoverCertificateName-canwaituntilacertificateisrecovered-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroRecoverCertificateName-canwaituntilacertificateisrecovered-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAvlo3LGOMORNejhhv1dZvjiP1aFPqojKZEeUVcVhjAstCLeHjO+P+SPC1L35awSEAhGcP/vSKtLtdJwqJ7I1timi4MvGy5QVfY1e1vPtv5MJVXbbL0wX19NHtZX+lHaUr5sk9ys5wkA9JTJ92BCQTlkAi8PDR3tpWpDK2Ush/RMAxzQLbVAm7MFEYpj/hLZ4g+6PI+j6GfrTPu/Q0G/x6+YRKOHTt2ad69k+Q/fXDfx/oqXXHIDyhEfIsgcX80s2DD8b8NbEAd641ATfli6biLBF8v6wmY0Wgzya1YEdoJZZ4eWroi0alONoXqxGxX9zvRezND7cn/9q65hDycCHC/QIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAHlnvL8FcG0ygJAe/yDGfjpuTglcNQNvIEWx0fDB8fuHSJenm9MlMJjQh0eRLzwDHa/jbvP9ahwO7zhnHpfV4/hw1sg45Gy6NszIhXZDgU4Y7HDLhn2oOR9BU8lwaPf3UOKL7ddtU37Zaq6hL/crGHteFZETZ3Qwxbv7Me5GzBAOOe+IoFaPT4rffb88S2mygen1cOO6kUamb+wTwbmX5OaZChZv17zs2X1EaLP54XhkaQSBnNx9TB0ihkmjFQ2huS8m0AIg1GwOQ9H2wbPRrWsQRn4dwFLnhz2zMI3nR8Mt5Lyf0QdQVDSpdiY/jEuv3prbzuFgbMWKI6ZFDjA0dIo=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"d0d6d1e9d15c4c87a83f54164fac456c"}, [
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
  'b3e92def-de63-43b6-94f1-1eec4d7b5f1a',
  'x-ms-request-id',
  'e20bd449-0305-41c5-b71a-9014ea4b41ea',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:23:26 GMT',
  'Content-Length',
  '1354'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroRecoverCertificateName-canwaituntilacertificateisrecovered-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroRecoverCertificateName-canwaituntilacertificateisrecovered-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAvlo3LGOMORNejhhv1dZvjiP1aFPqojKZEeUVcVhjAstCLeHjO+P+SPC1L35awSEAhGcP/vSKtLtdJwqJ7I1timi4MvGy5QVfY1e1vPtv5MJVXbbL0wX19NHtZX+lHaUr5sk9ys5wkA9JTJ92BCQTlkAi8PDR3tpWpDK2Ush/RMAxzQLbVAm7MFEYpj/hLZ4g+6PI+j6GfrTPu/Q0G/x6+YRKOHTt2ad69k+Q/fXDfx/oqXXHIDyhEfIsgcX80s2DD8b8NbEAd641ATfli6biLBF8v6wmY0Wgzya1YEdoJZZ4eWroi0alONoXqxGxX9zvRezND7cn/9q65hDycCHC/QIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAHlnvL8FcG0ygJAe/yDGfjpuTglcNQNvIEWx0fDB8fuHSJenm9MlMJjQh0eRLzwDHa/jbvP9ahwO7zhnHpfV4/hw1sg45Gy6NszIhXZDgU4Y7HDLhn2oOR9BU8lwaPf3UOKL7ddtU37Zaq6hL/crGHteFZETZ3Qwxbv7Me5GzBAOOe+IoFaPT4rffb88S2mygen1cOO6kUamb+wTwbmX5OaZChZv17zs2X1EaLP54XhkaQSBnNx9TB0ihkmjFQ2huS8m0AIg1GwOQ9H2wbPRrWsQRn4dwFLnhz2zMI3nR8Mt5Lyf0QdQVDSpdiY/jEuv3prbzuFgbMWKI6ZFDjA0dIo=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"d0d6d1e9d15c4c87a83f54164fac456c"}, [
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
  'b66ac572-7992-4863-a66a-7f4b7b0b3289',
  'x-ms-request-id',
  'ea60d83a-c86d-4851-add5-2ac763adcbb0',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:23:28 GMT',
  'Content-Length',
  '1354'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroRecoverCertificateName-canwaituntilacertificateisrecovered-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroRecoverCertificateName-canwaituntilacertificateisrecovered-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAvlo3LGOMORNejhhv1dZvjiP1aFPqojKZEeUVcVhjAstCLeHjO+P+SPC1L35awSEAhGcP/vSKtLtdJwqJ7I1timi4MvGy5QVfY1e1vPtv5MJVXbbL0wX19NHtZX+lHaUr5sk9ys5wkA9JTJ92BCQTlkAi8PDR3tpWpDK2Ush/RMAxzQLbVAm7MFEYpj/hLZ4g+6PI+j6GfrTPu/Q0G/x6+YRKOHTt2ad69k+Q/fXDfx/oqXXHIDyhEfIsgcX80s2DD8b8NbEAd641ATfli6biLBF8v6wmY0Wgzya1YEdoJZZ4eWroi0alONoXqxGxX9zvRezND7cn/9q65hDycCHC/QIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAHlnvL8FcG0ygJAe/yDGfjpuTglcNQNvIEWx0fDB8fuHSJenm9MlMJjQh0eRLzwDHa/jbvP9ahwO7zhnHpfV4/hw1sg45Gy6NszIhXZDgU4Y7HDLhn2oOR9BU8lwaPf3UOKL7ddtU37Zaq6hL/crGHteFZETZ3Qwxbv7Me5GzBAOOe+IoFaPT4rffb88S2mygen1cOO6kUamb+wTwbmX5OaZChZv17zs2X1EaLP54XhkaQSBnNx9TB0ihkmjFQ2huS8m0AIg1GwOQ9H2wbPRrWsQRn4dwFLnhz2zMI3nR8Mt5Lyf0QdQVDSpdiY/jEuv3prbzuFgbMWKI6ZFDjA0dIo=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"d0d6d1e9d15c4c87a83f54164fac456c"}, [
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
  '72468a0d-489b-4e8b-aa02-a817ddcedba4',
  'x-ms-request-id',
  '6856d7fe-4c2b-4880-8094-3af23770fcc1',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:23:30 GMT',
  'Content-Length',
  '1354'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroRecoverCertificateName-canwaituntilacertificateisrecovered-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroRecoverCertificateName-canwaituntilacertificateisrecovered-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAvlo3LGOMORNejhhv1dZvjiP1aFPqojKZEeUVcVhjAstCLeHjO+P+SPC1L35awSEAhGcP/vSKtLtdJwqJ7I1timi4MvGy5QVfY1e1vPtv5MJVXbbL0wX19NHtZX+lHaUr5sk9ys5wkA9JTJ92BCQTlkAi8PDR3tpWpDK2Ush/RMAxzQLbVAm7MFEYpj/hLZ4g+6PI+j6GfrTPu/Q0G/x6+YRKOHTt2ad69k+Q/fXDfx/oqXXHIDyhEfIsgcX80s2DD8b8NbEAd641ATfli6biLBF8v6wmY0Wgzya1YEdoJZZ4eWroi0alONoXqxGxX9zvRezND7cn/9q65hDycCHC/QIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAHlnvL8FcG0ygJAe/yDGfjpuTglcNQNvIEWx0fDB8fuHSJenm9MlMJjQh0eRLzwDHa/jbvP9ahwO7zhnHpfV4/hw1sg45Gy6NszIhXZDgU4Y7HDLhn2oOR9BU8lwaPf3UOKL7ddtU37Zaq6hL/crGHteFZETZ3Qwxbv7Me5GzBAOOe+IoFaPT4rffb88S2mygen1cOO6kUamb+wTwbmX5OaZChZv17zs2X1EaLP54XhkaQSBnNx9TB0ihkmjFQ2huS8m0AIg1GwOQ9H2wbPRrWsQRn4dwFLnhz2zMI3nR8Mt5Lyf0QdQVDSpdiY/jEuv3prbzuFgbMWKI6ZFDjA0dIo=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"d0d6d1e9d15c4c87a83f54164fac456c"}, [
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
  'cb0e038d-5ee0-48d0-afa8-dfaf47ab54dd',
  'x-ms-request-id',
  '4d3c00cf-4659-4035-8fd2-8b3537319b7f',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:23:32 GMT',
  'Content-Length',
  '1354'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroRecoverCertificateName-canwaituntilacertificateisrecovered-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroRecoverCertificateName-canwaituntilacertificateisrecovered-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAvlo3LGOMORNejhhv1dZvjiP1aFPqojKZEeUVcVhjAstCLeHjO+P+SPC1L35awSEAhGcP/vSKtLtdJwqJ7I1timi4MvGy5QVfY1e1vPtv5MJVXbbL0wX19NHtZX+lHaUr5sk9ys5wkA9JTJ92BCQTlkAi8PDR3tpWpDK2Ush/RMAxzQLbVAm7MFEYpj/hLZ4g+6PI+j6GfrTPu/Q0G/x6+YRKOHTt2ad69k+Q/fXDfx/oqXXHIDyhEfIsgcX80s2DD8b8NbEAd641ATfli6biLBF8v6wmY0Wgzya1YEdoJZZ4eWroi0alONoXqxGxX9zvRezND7cn/9q65hDycCHC/QIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAHlnvL8FcG0ygJAe/yDGfjpuTglcNQNvIEWx0fDB8fuHSJenm9MlMJjQh0eRLzwDHa/jbvP9ahwO7zhnHpfV4/hw1sg45Gy6NszIhXZDgU4Y7HDLhn2oOR9BU8lwaPf3UOKL7ddtU37Zaq6hL/crGHteFZETZ3Qwxbv7Me5GzBAOOe+IoFaPT4rffb88S2mygen1cOO6kUamb+wTwbmX5OaZChZv17zs2X1EaLP54XhkaQSBnNx9TB0ihkmjFQ2huS8m0AIg1GwOQ9H2wbPRrWsQRn4dwFLnhz2zMI3nR8Mt5Lyf0QdQVDSpdiY/jEuv3prbzuFgbMWKI6ZFDjA0dIo=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"d0d6d1e9d15c4c87a83f54164fac456c"}, [
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
  '8ba74ab3-ee20-434d-9398-d4b1d134c54f',
  'x-ms-request-id',
  'a5f99717-b2d1-4e58-bc7c-93719408c852',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:23:34 GMT',
  'Content-Length',
  '1354'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroRecoverCertificateName-canwaituntilacertificateisrecovered-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroRecoverCertificateName-canwaituntilacertificateisrecovered-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAvlo3LGOMORNejhhv1dZvjiP1aFPqojKZEeUVcVhjAstCLeHjO+P+SPC1L35awSEAhGcP/vSKtLtdJwqJ7I1timi4MvGy5QVfY1e1vPtv5MJVXbbL0wX19NHtZX+lHaUr5sk9ys5wkA9JTJ92BCQTlkAi8PDR3tpWpDK2Ush/RMAxzQLbVAm7MFEYpj/hLZ4g+6PI+j6GfrTPu/Q0G/x6+YRKOHTt2ad69k+Q/fXDfx/oqXXHIDyhEfIsgcX80s2DD8b8NbEAd641ATfli6biLBF8v6wmY0Wgzya1YEdoJZZ4eWroi0alONoXqxGxX9zvRezND7cn/9q65hDycCHC/QIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAHlnvL8FcG0ygJAe/yDGfjpuTglcNQNvIEWx0fDB8fuHSJenm9MlMJjQh0eRLzwDHa/jbvP9ahwO7zhnHpfV4/hw1sg45Gy6NszIhXZDgU4Y7HDLhn2oOR9BU8lwaPf3UOKL7ddtU37Zaq6hL/crGHteFZETZ3Qwxbv7Me5GzBAOOe+IoFaPT4rffb88S2mygen1cOO6kUamb+wTwbmX5OaZChZv17zs2X1EaLP54XhkaQSBnNx9TB0ihkmjFQ2huS8m0AIg1GwOQ9H2wbPRrWsQRn4dwFLnhz2zMI3nR8Mt5Lyf0QdQVDSpdiY/jEuv3prbzuFgbMWKI6ZFDjA0dIo=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"d0d6d1e9d15c4c87a83f54164fac456c"}, [
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
  'c42c2e76-4cc4-480d-8dc7-71df55c99aa8',
  'x-ms-request-id',
  '433c569e-0c5d-4628-96bb-860a852cd3a7',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:23:36 GMT',
  'Content-Length',
  '1354'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroRecoverCertificateName-canwaituntilacertificateisrecovered-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroRecoverCertificateName-canwaituntilacertificateisrecovered-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAvlo3LGOMORNejhhv1dZvjiP1aFPqojKZEeUVcVhjAstCLeHjO+P+SPC1L35awSEAhGcP/vSKtLtdJwqJ7I1timi4MvGy5QVfY1e1vPtv5MJVXbbL0wX19NHtZX+lHaUr5sk9ys5wkA9JTJ92BCQTlkAi8PDR3tpWpDK2Ush/RMAxzQLbVAm7MFEYpj/hLZ4g+6PI+j6GfrTPu/Q0G/x6+YRKOHTt2ad69k+Q/fXDfx/oqXXHIDyhEfIsgcX80s2DD8b8NbEAd641ATfli6biLBF8v6wmY0Wgzya1YEdoJZZ4eWroi0alONoXqxGxX9zvRezND7cn/9q65hDycCHC/QIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAHlnvL8FcG0ygJAe/yDGfjpuTglcNQNvIEWx0fDB8fuHSJenm9MlMJjQh0eRLzwDHa/jbvP9ahwO7zhnHpfV4/hw1sg45Gy6NszIhXZDgU4Y7HDLhn2oOR9BU8lwaPf3UOKL7ddtU37Zaq6hL/crGHteFZETZ3Qwxbv7Me5GzBAOOe+IoFaPT4rffb88S2mygen1cOO6kUamb+wTwbmX5OaZChZv17zs2X1EaLP54XhkaQSBnNx9TB0ihkmjFQ2huS8m0AIg1GwOQ9H2wbPRrWsQRn4dwFLnhz2zMI3nR8Mt5Lyf0QdQVDSpdiY/jEuv3prbzuFgbMWKI6ZFDjA0dIo=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"d0d6d1e9d15c4c87a83f54164fac456c"}, [
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
  'd2fd15fe-ebdc-4c4b-a326-35fa497e0da7',
  'x-ms-request-id',
  'ec66ddef-55dd-407b-a640-3f1500cd0922',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:23:38 GMT',
  'Content-Length',
  '1354'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroRecoverCertificateName-canwaituntilacertificateisrecovered-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroRecoverCertificateName-canwaituntilacertificateisrecovered-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAvlo3LGOMORNejhhv1dZvjiP1aFPqojKZEeUVcVhjAstCLeHjO+P+SPC1L35awSEAhGcP/vSKtLtdJwqJ7I1timi4MvGy5QVfY1e1vPtv5MJVXbbL0wX19NHtZX+lHaUr5sk9ys5wkA9JTJ92BCQTlkAi8PDR3tpWpDK2Ush/RMAxzQLbVAm7MFEYpj/hLZ4g+6PI+j6GfrTPu/Q0G/x6+YRKOHTt2ad69k+Q/fXDfx/oqXXHIDyhEfIsgcX80s2DD8b8NbEAd641ATfli6biLBF8v6wmY0Wgzya1YEdoJZZ4eWroi0alONoXqxGxX9zvRezND7cn/9q65hDycCHC/QIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAHlnvL8FcG0ygJAe/yDGfjpuTglcNQNvIEWx0fDB8fuHSJenm9MlMJjQh0eRLzwDHa/jbvP9ahwO7zhnHpfV4/hw1sg45Gy6NszIhXZDgU4Y7HDLhn2oOR9BU8lwaPf3UOKL7ddtU37Zaq6hL/crGHteFZETZ3Qwxbv7Me5GzBAOOe+IoFaPT4rffb88S2mygen1cOO6kUamb+wTwbmX5OaZChZv17zs2X1EaLP54XhkaQSBnNx9TB0ihkmjFQ2huS8m0AIg1GwOQ9H2wbPRrWsQRn4dwFLnhz2zMI3nR8Mt5Lyf0QdQVDSpdiY/jEuv3prbzuFgbMWKI6ZFDjA0dIo=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"d0d6d1e9d15c4c87a83f54164fac456c"}, [
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
  'b27c3da1-a067-427b-92cf-3929547fdef4',
  'x-ms-request-id',
  '6a58bbf7-b135-4d13-9145-0290915a8e19',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:23:40 GMT',
  'Content-Length',
  '1354'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroRecoverCertificateName-canwaituntilacertificateisrecovered-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroRecoverCertificateName-canwaituntilacertificateisrecovered-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAvlo3LGOMORNejhhv1dZvjiP1aFPqojKZEeUVcVhjAstCLeHjO+P+SPC1L35awSEAhGcP/vSKtLtdJwqJ7I1timi4MvGy5QVfY1e1vPtv5MJVXbbL0wX19NHtZX+lHaUr5sk9ys5wkA9JTJ92BCQTlkAi8PDR3tpWpDK2Ush/RMAxzQLbVAm7MFEYpj/hLZ4g+6PI+j6GfrTPu/Q0G/x6+YRKOHTt2ad69k+Q/fXDfx/oqXXHIDyhEfIsgcX80s2DD8b8NbEAd641ATfli6biLBF8v6wmY0Wgzya1YEdoJZZ4eWroi0alONoXqxGxX9zvRezND7cn/9q65hDycCHC/QIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAHlnvL8FcG0ygJAe/yDGfjpuTglcNQNvIEWx0fDB8fuHSJenm9MlMJjQh0eRLzwDHa/jbvP9ahwO7zhnHpfV4/hw1sg45Gy6NszIhXZDgU4Y7HDLhn2oOR9BU8lwaPf3UOKL7ddtU37Zaq6hL/crGHteFZETZ3Qwxbv7Me5GzBAOOe+IoFaPT4rffb88S2mygen1cOO6kUamb+wTwbmX5OaZChZv17zs2X1EaLP54XhkaQSBnNx9TB0ihkmjFQ2huS8m0AIg1GwOQ9H2wbPRrWsQRn4dwFLnhz2zMI3nR8Mt5Lyf0QdQVDSpdiY/jEuv3prbzuFgbMWKI6ZFDjA0dIo=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"d0d6d1e9d15c4c87a83f54164fac456c"}, [
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
  'fd95ba90-8d74-495e-a18a-ecfc4f78c4bf',
  'x-ms-request-id',
  'b1100ac2-6381-4b69-b193-59cd19b5e557',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:23:42 GMT',
  'Content-Length',
  '1354'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroRecoverCertificateName-canwaituntilacertificateisrecovered-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroRecoverCertificateName-canwaituntilacertificateisrecovered-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAvlo3LGOMORNejhhv1dZvjiP1aFPqojKZEeUVcVhjAstCLeHjO+P+SPC1L35awSEAhGcP/vSKtLtdJwqJ7I1timi4MvGy5QVfY1e1vPtv5MJVXbbL0wX19NHtZX+lHaUr5sk9ys5wkA9JTJ92BCQTlkAi8PDR3tpWpDK2Ush/RMAxzQLbVAm7MFEYpj/hLZ4g+6PI+j6GfrTPu/Q0G/x6+YRKOHTt2ad69k+Q/fXDfx/oqXXHIDyhEfIsgcX80s2DD8b8NbEAd641ATfli6biLBF8v6wmY0Wgzya1YEdoJZZ4eWroi0alONoXqxGxX9zvRezND7cn/9q65hDycCHC/QIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAHlnvL8FcG0ygJAe/yDGfjpuTglcNQNvIEWx0fDB8fuHSJenm9MlMJjQh0eRLzwDHa/jbvP9ahwO7zhnHpfV4/hw1sg45Gy6NszIhXZDgU4Y7HDLhn2oOR9BU8lwaPf3UOKL7ddtU37Zaq6hL/crGHteFZETZ3Qwxbv7Me5GzBAOOe+IoFaPT4rffb88S2mygen1cOO6kUamb+wTwbmX5OaZChZv17zs2X1EaLP54XhkaQSBnNx9TB0ihkmjFQ2huS8m0AIg1GwOQ9H2wbPRrWsQRn4dwFLnhz2zMI3nR8Mt5Lyf0QdQVDSpdiY/jEuv3prbzuFgbMWKI6ZFDjA0dIo=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"d0d6d1e9d15c4c87a83f54164fac456c"}, [
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
  '011b0740-1467-4d2b-a3fa-fdd4d41334eb',
  'x-ms-request-id',
  'd543e9a3-bbe0-4876-bb61-52e14cd4b5de',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:23:45 GMT',
  'Content-Length',
  '1354'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroRecoverCertificateName-canwaituntilacertificateisrecovered-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroRecoverCertificateName-canwaituntilacertificateisrecovered-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAvlo3LGOMORNejhhv1dZvjiP1aFPqojKZEeUVcVhjAstCLeHjO+P+SPC1L35awSEAhGcP/vSKtLtdJwqJ7I1timi4MvGy5QVfY1e1vPtv5MJVXbbL0wX19NHtZX+lHaUr5sk9ys5wkA9JTJ92BCQTlkAi8PDR3tpWpDK2Ush/RMAxzQLbVAm7MFEYpj/hLZ4g+6PI+j6GfrTPu/Q0G/x6+YRKOHTt2ad69k+Q/fXDfx/oqXXHIDyhEfIsgcX80s2DD8b8NbEAd641ATfli6biLBF8v6wmY0Wgzya1YEdoJZZ4eWroi0alONoXqxGxX9zvRezND7cn/9q65hDycCHC/QIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAHlnvL8FcG0ygJAe/yDGfjpuTglcNQNvIEWx0fDB8fuHSJenm9MlMJjQh0eRLzwDHa/jbvP9ahwO7zhnHpfV4/hw1sg45Gy6NszIhXZDgU4Y7HDLhn2oOR9BU8lwaPf3UOKL7ddtU37Zaq6hL/crGHteFZETZ3Qwxbv7Me5GzBAOOe+IoFaPT4rffb88S2mygen1cOO6kUamb+wTwbmX5OaZChZv17zs2X1EaLP54XhkaQSBnNx9TB0ihkmjFQ2huS8m0AIg1GwOQ9H2wbPRrWsQRn4dwFLnhz2zMI3nR8Mt5Lyf0QdQVDSpdiY/jEuv3prbzuFgbMWKI6ZFDjA0dIo=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"d0d6d1e9d15c4c87a83f54164fac456c"}, [
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
  'c7f26ebb-6a3e-48d4-b616-77af3f97a8c8',
  'x-ms-request-id',
  'a7250e05-85b6-42e0-b407-4d9e38b5a118',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:23:47 GMT',
  'Content-Length',
  '1354'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroRecoverCertificateName-canwaituntilacertificateisrecovered-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroRecoverCertificateName-canwaituntilacertificateisrecovered-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAvlo3LGOMORNejhhv1dZvjiP1aFPqojKZEeUVcVhjAstCLeHjO+P+SPC1L35awSEAhGcP/vSKtLtdJwqJ7I1timi4MvGy5QVfY1e1vPtv5MJVXbbL0wX19NHtZX+lHaUr5sk9ys5wkA9JTJ92BCQTlkAi8PDR3tpWpDK2Ush/RMAxzQLbVAm7MFEYpj/hLZ4g+6PI+j6GfrTPu/Q0G/x6+YRKOHTt2ad69k+Q/fXDfx/oqXXHIDyhEfIsgcX80s2DD8b8NbEAd641ATfli6biLBF8v6wmY0Wgzya1YEdoJZZ4eWroi0alONoXqxGxX9zvRezND7cn/9q65hDycCHC/QIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAHlnvL8FcG0ygJAe/yDGfjpuTglcNQNvIEWx0fDB8fuHSJenm9MlMJjQh0eRLzwDHa/jbvP9ahwO7zhnHpfV4/hw1sg45Gy6NszIhXZDgU4Y7HDLhn2oOR9BU8lwaPf3UOKL7ddtU37Zaq6hL/crGHteFZETZ3Qwxbv7Me5GzBAOOe+IoFaPT4rffb88S2mygen1cOO6kUamb+wTwbmX5OaZChZv17zs2X1EaLP54XhkaQSBnNx9TB0ihkmjFQ2huS8m0AIg1GwOQ9H2wbPRrWsQRn4dwFLnhz2zMI3nR8Mt5Lyf0QdQVDSpdiY/jEuv3prbzuFgbMWKI6ZFDjA0dIo=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"d0d6d1e9d15c4c87a83f54164fac456c"}, [
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
  '5570b710-d366-485f-9900-ca3fbbc4f909',
  'x-ms-request-id',
  '181ef268-2d96-47cd-8707-a204fb533ebd',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:23:49 GMT',
  'Content-Length',
  '1354'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroRecoverCertificateName-canwaituntilacertificateisrecovered-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroRecoverCertificateName-canwaituntilacertificateisrecovered-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAvlo3LGOMORNejhhv1dZvjiP1aFPqojKZEeUVcVhjAstCLeHjO+P+SPC1L35awSEAhGcP/vSKtLtdJwqJ7I1timi4MvGy5QVfY1e1vPtv5MJVXbbL0wX19NHtZX+lHaUr5sk9ys5wkA9JTJ92BCQTlkAi8PDR3tpWpDK2Ush/RMAxzQLbVAm7MFEYpj/hLZ4g+6PI+j6GfrTPu/Q0G/x6+YRKOHTt2ad69k+Q/fXDfx/oqXXHIDyhEfIsgcX80s2DD8b8NbEAd641ATfli6biLBF8v6wmY0Wgzya1YEdoJZZ4eWroi0alONoXqxGxX9zvRezND7cn/9q65hDycCHC/QIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAHlnvL8FcG0ygJAe/yDGfjpuTglcNQNvIEWx0fDB8fuHSJenm9MlMJjQh0eRLzwDHa/jbvP9ahwO7zhnHpfV4/hw1sg45Gy6NszIhXZDgU4Y7HDLhn2oOR9BU8lwaPf3UOKL7ddtU37Zaq6hL/crGHteFZETZ3Qwxbv7Me5GzBAOOe+IoFaPT4rffb88S2mygen1cOO6kUamb+wTwbmX5OaZChZv17zs2X1EaLP54XhkaQSBnNx9TB0ihkmjFQ2huS8m0AIg1GwOQ9H2wbPRrWsQRn4dwFLnhz2zMI3nR8Mt5Lyf0QdQVDSpdiY/jEuv3prbzuFgbMWKI6ZFDjA0dIo=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"d0d6d1e9d15c4c87a83f54164fac456c"}, [
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
  'fa346d00-acfe-4f6a-8d73-8853a6c92ab1',
  'x-ms-request-id',
  '50b9872e-3d88-4ec4-962c-8be0b30d60c5',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:23:51 GMT',
  'Content-Length',
  '1354'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroRecoverCertificateName-canwaituntilacertificateisrecovered-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroRecoverCertificateName-canwaituntilacertificateisrecovered-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAvlo3LGOMORNejhhv1dZvjiP1aFPqojKZEeUVcVhjAstCLeHjO+P+SPC1L35awSEAhGcP/vSKtLtdJwqJ7I1timi4MvGy5QVfY1e1vPtv5MJVXbbL0wX19NHtZX+lHaUr5sk9ys5wkA9JTJ92BCQTlkAi8PDR3tpWpDK2Ush/RMAxzQLbVAm7MFEYpj/hLZ4g+6PI+j6GfrTPu/Q0G/x6+YRKOHTt2ad69k+Q/fXDfx/oqXXHIDyhEfIsgcX80s2DD8b8NbEAd641ATfli6biLBF8v6wmY0Wgzya1YEdoJZZ4eWroi0alONoXqxGxX9zvRezND7cn/9q65hDycCHC/QIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAHlnvL8FcG0ygJAe/yDGfjpuTglcNQNvIEWx0fDB8fuHSJenm9MlMJjQh0eRLzwDHa/jbvP9ahwO7zhnHpfV4/hw1sg45Gy6NszIhXZDgU4Y7HDLhn2oOR9BU8lwaPf3UOKL7ddtU37Zaq6hL/crGHteFZETZ3Qwxbv7Me5GzBAOOe+IoFaPT4rffb88S2mygen1cOO6kUamb+wTwbmX5OaZChZv17zs2X1EaLP54XhkaQSBnNx9TB0ihkmjFQ2huS8m0AIg1GwOQ9H2wbPRrWsQRn4dwFLnhz2zMI3nR8Mt5Lyf0QdQVDSpdiY/jEuv3prbzuFgbMWKI6ZFDjA0dIo=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"d0d6d1e9d15c4c87a83f54164fac456c"}, [
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
  '44a09c59-45ed-4ed9-97ae-23db9287b780',
  'x-ms-request-id',
  '41b49a6b-00c2-4525-bb2e-daee89c3583d',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:23:53 GMT',
  'Content-Length',
  '1354'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroRecoverCertificateName-canwaituntilacertificateisrecovered-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroRecoverCertificateName-canwaituntilacertificateisrecovered-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAvlo3LGOMORNejhhv1dZvjiP1aFPqojKZEeUVcVhjAstCLeHjO+P+SPC1L35awSEAhGcP/vSKtLtdJwqJ7I1timi4MvGy5QVfY1e1vPtv5MJVXbbL0wX19NHtZX+lHaUr5sk9ys5wkA9JTJ92BCQTlkAi8PDR3tpWpDK2Ush/RMAxzQLbVAm7MFEYpj/hLZ4g+6PI+j6GfrTPu/Q0G/x6+YRKOHTt2ad69k+Q/fXDfx/oqXXHIDyhEfIsgcX80s2DD8b8NbEAd641ATfli6biLBF8v6wmY0Wgzya1YEdoJZZ4eWroi0alONoXqxGxX9zvRezND7cn/9q65hDycCHC/QIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAHlnvL8FcG0ygJAe/yDGfjpuTglcNQNvIEWx0fDB8fuHSJenm9MlMJjQh0eRLzwDHa/jbvP9ahwO7zhnHpfV4/hw1sg45Gy6NszIhXZDgU4Y7HDLhn2oOR9BU8lwaPf3UOKL7ddtU37Zaq6hL/crGHteFZETZ3Qwxbv7Me5GzBAOOe+IoFaPT4rffb88S2mygen1cOO6kUamb+wTwbmX5OaZChZv17zs2X1EaLP54XhkaQSBnNx9TB0ihkmjFQ2huS8m0AIg1GwOQ9H2wbPRrWsQRn4dwFLnhz2zMI3nR8Mt5Lyf0QdQVDSpdiY/jEuv3prbzuFgbMWKI6ZFDjA0dIo=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"d0d6d1e9d15c4c87a83f54164fac456c"}, [
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
  'f56cc1ba-0d23-4472-821f-e94d66d759b0',
  'x-ms-request-id',
  'e353638f-0b37-4276-abdd-8d3ea9e850d2',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:23:55 GMT',
  'Content-Length',
  '1354'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroRecoverCertificateName-canwaituntilacertificateisrecovered-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroRecoverCertificateName-canwaituntilacertificateisrecovered-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAvlo3LGOMORNejhhv1dZvjiP1aFPqojKZEeUVcVhjAstCLeHjO+P+SPC1L35awSEAhGcP/vSKtLtdJwqJ7I1timi4MvGy5QVfY1e1vPtv5MJVXbbL0wX19NHtZX+lHaUr5sk9ys5wkA9JTJ92BCQTlkAi8PDR3tpWpDK2Ush/RMAxzQLbVAm7MFEYpj/hLZ4g+6PI+j6GfrTPu/Q0G/x6+YRKOHTt2ad69k+Q/fXDfx/oqXXHIDyhEfIsgcX80s2DD8b8NbEAd641ATfli6biLBF8v6wmY0Wgzya1YEdoJZZ4eWroi0alONoXqxGxX9zvRezND7cn/9q65hDycCHC/QIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAHlnvL8FcG0ygJAe/yDGfjpuTglcNQNvIEWx0fDB8fuHSJenm9MlMJjQh0eRLzwDHa/jbvP9ahwO7zhnHpfV4/hw1sg45Gy6NszIhXZDgU4Y7HDLhn2oOR9BU8lwaPf3UOKL7ddtU37Zaq6hL/crGHteFZETZ3Qwxbv7Me5GzBAOOe+IoFaPT4rffb88S2mygen1cOO6kUamb+wTwbmX5OaZChZv17zs2X1EaLP54XhkaQSBnNx9TB0ihkmjFQ2huS8m0AIg1GwOQ9H2wbPRrWsQRn4dwFLnhz2zMI3nR8Mt5Lyf0QdQVDSpdiY/jEuv3prbzuFgbMWKI6ZFDjA0dIo=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"d0d6d1e9d15c4c87a83f54164fac456c"}, [
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
  '87dd2321-a2ff-4a10-9371-22fd5f2ca5f9',
  'x-ms-request-id',
  '15d05a3b-bd65-4ea6-ba42-c3c4d5097eba',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:23:57 GMT',
  'Content-Length',
  '1354'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroRecoverCertificateName-canwaituntilacertificateisrecovered-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroRecoverCertificateName-canwaituntilacertificateisrecovered-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAvlo3LGOMORNejhhv1dZvjiP1aFPqojKZEeUVcVhjAstCLeHjO+P+SPC1L35awSEAhGcP/vSKtLtdJwqJ7I1timi4MvGy5QVfY1e1vPtv5MJVXbbL0wX19NHtZX+lHaUr5sk9ys5wkA9JTJ92BCQTlkAi8PDR3tpWpDK2Ush/RMAxzQLbVAm7MFEYpj/hLZ4g+6PI+j6GfrTPu/Q0G/x6+YRKOHTt2ad69k+Q/fXDfx/oqXXHIDyhEfIsgcX80s2DD8b8NbEAd641ATfli6biLBF8v6wmY0Wgzya1YEdoJZZ4eWroi0alONoXqxGxX9zvRezND7cn/9q65hDycCHC/QIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAHlnvL8FcG0ygJAe/yDGfjpuTglcNQNvIEWx0fDB8fuHSJenm9MlMJjQh0eRLzwDHa/jbvP9ahwO7zhnHpfV4/hw1sg45Gy6NszIhXZDgU4Y7HDLhn2oOR9BU8lwaPf3UOKL7ddtU37Zaq6hL/crGHteFZETZ3Qwxbv7Me5GzBAOOe+IoFaPT4rffb88S2mygen1cOO6kUamb+wTwbmX5OaZChZv17zs2X1EaLP54XhkaQSBnNx9TB0ihkmjFQ2huS8m0AIg1GwOQ9H2wbPRrWsQRn4dwFLnhz2zMI3nR8Mt5Lyf0QdQVDSpdiY/jEuv3prbzuFgbMWKI6ZFDjA0dIo=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"d0d6d1e9d15c4c87a83f54164fac456c"}, [
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
  '016c40d3-d17c-4a97-bed9-86e8cba8dfb8',
  'x-ms-request-id',
  '52a68095-f8aa-46fe-a63e-191f30952395',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:23:59 GMT',
  'Content-Length',
  '1354'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroRecoverCertificateName-canwaituntilacertificateisrecovered-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroRecoverCertificateName-canwaituntilacertificateisrecovered-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAvlo3LGOMORNejhhv1dZvjiP1aFPqojKZEeUVcVhjAstCLeHjO+P+SPC1L35awSEAhGcP/vSKtLtdJwqJ7I1timi4MvGy5QVfY1e1vPtv5MJVXbbL0wX19NHtZX+lHaUr5sk9ys5wkA9JTJ92BCQTlkAi8PDR3tpWpDK2Ush/RMAxzQLbVAm7MFEYpj/hLZ4g+6PI+j6GfrTPu/Q0G/x6+YRKOHTt2ad69k+Q/fXDfx/oqXXHIDyhEfIsgcX80s2DD8b8NbEAd641ATfli6biLBF8v6wmY0Wgzya1YEdoJZZ4eWroi0alONoXqxGxX9zvRezND7cn/9q65hDycCHC/QIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAHlnvL8FcG0ygJAe/yDGfjpuTglcNQNvIEWx0fDB8fuHSJenm9MlMJjQh0eRLzwDHa/jbvP9ahwO7zhnHpfV4/hw1sg45Gy6NszIhXZDgU4Y7HDLhn2oOR9BU8lwaPf3UOKL7ddtU37Zaq6hL/crGHteFZETZ3Qwxbv7Me5GzBAOOe+IoFaPT4rffb88S2mygen1cOO6kUamb+wTwbmX5OaZChZv17zs2X1EaLP54XhkaQSBnNx9TB0ihkmjFQ2huS8m0AIg1GwOQ9H2wbPRrWsQRn4dwFLnhz2zMI3nR8Mt5Lyf0QdQVDSpdiY/jEuv3prbzuFgbMWKI6ZFDjA0dIo=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"d0d6d1e9d15c4c87a83f54164fac456c"}, [
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
  '4c3ffcbf-0b8a-4395-a489-127f8759f29f',
  'x-ms-request-id',
  'a16cd25f-654a-4f06-b745-d63f3ab3987e',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:24:01 GMT',
  'Content-Length',
  '1354'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroRecoverCertificateName-canwaituntilacertificateisrecovered-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroRecoverCertificateName-canwaituntilacertificateisrecovered-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAvlo3LGOMORNejhhv1dZvjiP1aFPqojKZEeUVcVhjAstCLeHjO+P+SPC1L35awSEAhGcP/vSKtLtdJwqJ7I1timi4MvGy5QVfY1e1vPtv5MJVXbbL0wX19NHtZX+lHaUr5sk9ys5wkA9JTJ92BCQTlkAi8PDR3tpWpDK2Ush/RMAxzQLbVAm7MFEYpj/hLZ4g+6PI+j6GfrTPu/Q0G/x6+YRKOHTt2ad69k+Q/fXDfx/oqXXHIDyhEfIsgcX80s2DD8b8NbEAd641ATfli6biLBF8v6wmY0Wgzya1YEdoJZZ4eWroi0alONoXqxGxX9zvRezND7cn/9q65hDycCHC/QIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAHlnvL8FcG0ygJAe/yDGfjpuTglcNQNvIEWx0fDB8fuHSJenm9MlMJjQh0eRLzwDHa/jbvP9ahwO7zhnHpfV4/hw1sg45Gy6NszIhXZDgU4Y7HDLhn2oOR9BU8lwaPf3UOKL7ddtU37Zaq6hL/crGHteFZETZ3Qwxbv7Me5GzBAOOe+IoFaPT4rffb88S2mygen1cOO6kUamb+wTwbmX5OaZChZv17zs2X1EaLP54XhkaQSBnNx9TB0ihkmjFQ2huS8m0AIg1GwOQ9H2wbPRrWsQRn4dwFLnhz2zMI3nR8Mt5Lyf0QdQVDSpdiY/jEuv3prbzuFgbMWKI6ZFDjA0dIo=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"d0d6d1e9d15c4c87a83f54164fac456c"}, [
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
  '86f4928c-69df-472b-af3d-6d4b933a45dd',
  'x-ms-request-id',
  '80791943-7c61-4c84-b91b-f5510a991ee3',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:24:03 GMT',
  'Content-Length',
  '1354'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroRecoverCertificateName-canwaituntilacertificateisrecovered-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroRecoverCertificateName-canwaituntilacertificateisrecovered-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAvlo3LGOMORNejhhv1dZvjiP1aFPqojKZEeUVcVhjAstCLeHjO+P+SPC1L35awSEAhGcP/vSKtLtdJwqJ7I1timi4MvGy5QVfY1e1vPtv5MJVXbbL0wX19NHtZX+lHaUr5sk9ys5wkA9JTJ92BCQTlkAi8PDR3tpWpDK2Ush/RMAxzQLbVAm7MFEYpj/hLZ4g+6PI+j6GfrTPu/Q0G/x6+YRKOHTt2ad69k+Q/fXDfx/oqXXHIDyhEfIsgcX80s2DD8b8NbEAd641ATfli6biLBF8v6wmY0Wgzya1YEdoJZZ4eWroi0alONoXqxGxX9zvRezND7cn/9q65hDycCHC/QIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAHlnvL8FcG0ygJAe/yDGfjpuTglcNQNvIEWx0fDB8fuHSJenm9MlMJjQh0eRLzwDHa/jbvP9ahwO7zhnHpfV4/hw1sg45Gy6NszIhXZDgU4Y7HDLhn2oOR9BU8lwaPf3UOKL7ddtU37Zaq6hL/crGHteFZETZ3Qwxbv7Me5GzBAOOe+IoFaPT4rffb88S2mygen1cOO6kUamb+wTwbmX5OaZChZv17zs2X1EaLP54XhkaQSBnNx9TB0ihkmjFQ2huS8m0AIg1GwOQ9H2wbPRrWsQRn4dwFLnhz2zMI3nR8Mt5Lyf0QdQVDSpdiY/jEuv3prbzuFgbMWKI6ZFDjA0dIo=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"d0d6d1e9d15c4c87a83f54164fac456c"}, [
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
  'd9e7b203-36b4-4332-a416-bade11e43180',
  'x-ms-request-id',
  'b6622f78-c9ca-4395-aad7-ec3cfc74cd1c',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:24:05 GMT',
  'Content-Length',
  '1354'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroRecoverCertificateName-canwaituntilacertificateisrecovered-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroRecoverCertificateName-canwaituntilacertificateisrecovered-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAvlo3LGOMORNejhhv1dZvjiP1aFPqojKZEeUVcVhjAstCLeHjO+P+SPC1L35awSEAhGcP/vSKtLtdJwqJ7I1timi4MvGy5QVfY1e1vPtv5MJVXbbL0wX19NHtZX+lHaUr5sk9ys5wkA9JTJ92BCQTlkAi8PDR3tpWpDK2Ush/RMAxzQLbVAm7MFEYpj/hLZ4g+6PI+j6GfrTPu/Q0G/x6+YRKOHTt2ad69k+Q/fXDfx/oqXXHIDyhEfIsgcX80s2DD8b8NbEAd641ATfli6biLBF8v6wmY0Wgzya1YEdoJZZ4eWroi0alONoXqxGxX9zvRezND7cn/9q65hDycCHC/QIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAHlnvL8FcG0ygJAe/yDGfjpuTglcNQNvIEWx0fDB8fuHSJenm9MlMJjQh0eRLzwDHa/jbvP9ahwO7zhnHpfV4/hw1sg45Gy6NszIhXZDgU4Y7HDLhn2oOR9BU8lwaPf3UOKL7ddtU37Zaq6hL/crGHteFZETZ3Qwxbv7Me5GzBAOOe+IoFaPT4rffb88S2mygen1cOO6kUamb+wTwbmX5OaZChZv17zs2X1EaLP54XhkaQSBnNx9TB0ihkmjFQ2huS8m0AIg1GwOQ9H2wbPRrWsQRn4dwFLnhz2zMI3nR8Mt5Lyf0QdQVDSpdiY/jEuv3prbzuFgbMWKI6ZFDjA0dIo=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"d0d6d1e9d15c4c87a83f54164fac456c"}, [
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
  'c25aa13d-a4df-46fb-8fd4-0926abfdd5ae',
  'x-ms-request-id',
  'b1621f39-bbae-4067-b3eb-dc1b354e41dd',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:24:08 GMT',
  'Content-Length',
  '1354'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroRecoverCertificateName-canwaituntilacertificateisrecovered-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroRecoverCertificateName-canwaituntilacertificateisrecovered-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAvlo3LGOMORNejhhv1dZvjiP1aFPqojKZEeUVcVhjAstCLeHjO+P+SPC1L35awSEAhGcP/vSKtLtdJwqJ7I1timi4MvGy5QVfY1e1vPtv5MJVXbbL0wX19NHtZX+lHaUr5sk9ys5wkA9JTJ92BCQTlkAi8PDR3tpWpDK2Ush/RMAxzQLbVAm7MFEYpj/hLZ4g+6PI+j6GfrTPu/Q0G/x6+YRKOHTt2ad69k+Q/fXDfx/oqXXHIDyhEfIsgcX80s2DD8b8NbEAd641ATfli6biLBF8v6wmY0Wgzya1YEdoJZZ4eWroi0alONoXqxGxX9zvRezND7cn/9q65hDycCHC/QIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAHlnvL8FcG0ygJAe/yDGfjpuTglcNQNvIEWx0fDB8fuHSJenm9MlMJjQh0eRLzwDHa/jbvP9ahwO7zhnHpfV4/hw1sg45Gy6NszIhXZDgU4Y7HDLhn2oOR9BU8lwaPf3UOKL7ddtU37Zaq6hL/crGHteFZETZ3Qwxbv7Me5GzBAOOe+IoFaPT4rffb88S2mygen1cOO6kUamb+wTwbmX5OaZChZv17zs2X1EaLP54XhkaQSBnNx9TB0ihkmjFQ2huS8m0AIg1GwOQ9H2wbPRrWsQRn4dwFLnhz2zMI3nR8Mt5Lyf0QdQVDSpdiY/jEuv3prbzuFgbMWKI6ZFDjA0dIo=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"d0d6d1e9d15c4c87a83f54164fac456c"}, [
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
  '5c2828e2-622c-434c-881b-40b3c34f4882',
  'x-ms-request-id',
  '81e2d8ca-8cff-4d40-8aa9-9e08ebf3ee17',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:24:10 GMT',
  'Content-Length',
  '1354'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroRecoverCertificateName-canwaituntilacertificateisrecovered-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroRecoverCertificateName-canwaituntilacertificateisrecovered-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAvlo3LGOMORNejhhv1dZvjiP1aFPqojKZEeUVcVhjAstCLeHjO+P+SPC1L35awSEAhGcP/vSKtLtdJwqJ7I1timi4MvGy5QVfY1e1vPtv5MJVXbbL0wX19NHtZX+lHaUr5sk9ys5wkA9JTJ92BCQTlkAi8PDR3tpWpDK2Ush/RMAxzQLbVAm7MFEYpj/hLZ4g+6PI+j6GfrTPu/Q0G/x6+YRKOHTt2ad69k+Q/fXDfx/oqXXHIDyhEfIsgcX80s2DD8b8NbEAd641ATfli6biLBF8v6wmY0Wgzya1YEdoJZZ4eWroi0alONoXqxGxX9zvRezND7cn/9q65hDycCHC/QIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAHlnvL8FcG0ygJAe/yDGfjpuTglcNQNvIEWx0fDB8fuHSJenm9MlMJjQh0eRLzwDHa/jbvP9ahwO7zhnHpfV4/hw1sg45Gy6NszIhXZDgU4Y7HDLhn2oOR9BU8lwaPf3UOKL7ddtU37Zaq6hL/crGHteFZETZ3Qwxbv7Me5GzBAOOe+IoFaPT4rffb88S2mygen1cOO6kUamb+wTwbmX5OaZChZv17zs2X1EaLP54XhkaQSBnNx9TB0ihkmjFQ2huS8m0AIg1GwOQ9H2wbPRrWsQRn4dwFLnhz2zMI3nR8Mt5Lyf0QdQVDSpdiY/jEuv3prbzuFgbMWKI6ZFDjA0dIo=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"d0d6d1e9d15c4c87a83f54164fac456c"}, [
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
  'f8f5da9a-7cf9-4b92-9a05-af37c3f1d7fd',
  'x-ms-request-id',
  '3eb590d0-1b2b-4526-84ae-bafbc3ea4e50',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:24:11 GMT',
  'Content-Length',
  '1354'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroRecoverCertificateName-canwaituntilacertificateisrecovered-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroRecoverCertificateName-canwaituntilacertificateisrecovered-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAvlo3LGOMORNejhhv1dZvjiP1aFPqojKZEeUVcVhjAstCLeHjO+P+SPC1L35awSEAhGcP/vSKtLtdJwqJ7I1timi4MvGy5QVfY1e1vPtv5MJVXbbL0wX19NHtZX+lHaUr5sk9ys5wkA9JTJ92BCQTlkAi8PDR3tpWpDK2Ush/RMAxzQLbVAm7MFEYpj/hLZ4g+6PI+j6GfrTPu/Q0G/x6+YRKOHTt2ad69k+Q/fXDfx/oqXXHIDyhEfIsgcX80s2DD8b8NbEAd641ATfli6biLBF8v6wmY0Wgzya1YEdoJZZ4eWroi0alONoXqxGxX9zvRezND7cn/9q65hDycCHC/QIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAHlnvL8FcG0ygJAe/yDGfjpuTglcNQNvIEWx0fDB8fuHSJenm9MlMJjQh0eRLzwDHa/jbvP9ahwO7zhnHpfV4/hw1sg45Gy6NszIhXZDgU4Y7HDLhn2oOR9BU8lwaPf3UOKL7ddtU37Zaq6hL/crGHteFZETZ3Qwxbv7Me5GzBAOOe+IoFaPT4rffb88S2mygen1cOO6kUamb+wTwbmX5OaZChZv17zs2X1EaLP54XhkaQSBnNx9TB0ihkmjFQ2huS8m0AIg1GwOQ9H2wbPRrWsQRn4dwFLnhz2zMI3nR8Mt5Lyf0QdQVDSpdiY/jEuv3prbzuFgbMWKI6ZFDjA0dIo=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"d0d6d1e9d15c4c87a83f54164fac456c"}, [
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
  'f94bdb1e-956a-4688-bc20-ef28ed990c6a',
  'x-ms-request-id',
  '539fffdd-27fe-45c6-8530-abe82b9c1afe',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:24:14 GMT',
  'Content-Length',
  '1354'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroRecoverCertificateName-canwaituntilacertificateisrecovered-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroRecoverCertificateName-canwaituntilacertificateisrecovered-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAvlo3LGOMORNejhhv1dZvjiP1aFPqojKZEeUVcVhjAstCLeHjO+P+SPC1L35awSEAhGcP/vSKtLtdJwqJ7I1timi4MvGy5QVfY1e1vPtv5MJVXbbL0wX19NHtZX+lHaUr5sk9ys5wkA9JTJ92BCQTlkAi8PDR3tpWpDK2Ush/RMAxzQLbVAm7MFEYpj/hLZ4g+6PI+j6GfrTPu/Q0G/x6+YRKOHTt2ad69k+Q/fXDfx/oqXXHIDyhEfIsgcX80s2DD8b8NbEAd641ATfli6biLBF8v6wmY0Wgzya1YEdoJZZ4eWroi0alONoXqxGxX9zvRezND7cn/9q65hDycCHC/QIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAHlnvL8FcG0ygJAe/yDGfjpuTglcNQNvIEWx0fDB8fuHSJenm9MlMJjQh0eRLzwDHa/jbvP9ahwO7zhnHpfV4/hw1sg45Gy6NszIhXZDgU4Y7HDLhn2oOR9BU8lwaPf3UOKL7ddtU37Zaq6hL/crGHteFZETZ3Qwxbv7Me5GzBAOOe+IoFaPT4rffb88S2mygen1cOO6kUamb+wTwbmX5OaZChZv17zs2X1EaLP54XhkaQSBnNx9TB0ihkmjFQ2huS8m0AIg1GwOQ9H2wbPRrWsQRn4dwFLnhz2zMI3nR8Mt5Lyf0QdQVDSpdiY/jEuv3prbzuFgbMWKI6ZFDjA0dIo=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"d0d6d1e9d15c4c87a83f54164fac456c"}, [
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
  '5aa2b824-f622-4a4d-865e-71d11453f075',
  'x-ms-request-id',
  '8fa26766-fb44-47dd-95f9-e1090b2d230f',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:24:16 GMT',
  'Content-Length',
  '1354'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroRecoverCertificateName-canwaituntilacertificateisrecovered-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroRecoverCertificateName-canwaituntilacertificateisrecovered-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAvlo3LGOMORNejhhv1dZvjiP1aFPqojKZEeUVcVhjAstCLeHjO+P+SPC1L35awSEAhGcP/vSKtLtdJwqJ7I1timi4MvGy5QVfY1e1vPtv5MJVXbbL0wX19NHtZX+lHaUr5sk9ys5wkA9JTJ92BCQTlkAi8PDR3tpWpDK2Ush/RMAxzQLbVAm7MFEYpj/hLZ4g+6PI+j6GfrTPu/Q0G/x6+YRKOHTt2ad69k+Q/fXDfx/oqXXHIDyhEfIsgcX80s2DD8b8NbEAd641ATfli6biLBF8v6wmY0Wgzya1YEdoJZZ4eWroi0alONoXqxGxX9zvRezND7cn/9q65hDycCHC/QIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAHlnvL8FcG0ygJAe/yDGfjpuTglcNQNvIEWx0fDB8fuHSJenm9MlMJjQh0eRLzwDHa/jbvP9ahwO7zhnHpfV4/hw1sg45Gy6NszIhXZDgU4Y7HDLhn2oOR9BU8lwaPf3UOKL7ddtU37Zaq6hL/crGHteFZETZ3Qwxbv7Me5GzBAOOe+IoFaPT4rffb88S2mygen1cOO6kUamb+wTwbmX5OaZChZv17zs2X1EaLP54XhkaQSBnNx9TB0ihkmjFQ2huS8m0AIg1GwOQ9H2wbPRrWsQRn4dwFLnhz2zMI3nR8Mt5Lyf0QdQVDSpdiY/jEuv3prbzuFgbMWKI6ZFDjA0dIo=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"d0d6d1e9d15c4c87a83f54164fac456c"}, [
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
  '3f637734-78ba-4f3a-b8b1-2bef2ce13a61',
  'x-ms-request-id',
  '8028e316-9be5-4c83-8ab2-18dfa9715679',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:24:17 GMT',
  'Content-Length',
  '1354'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroRecoverCertificateName-canwaituntilacertificateisrecovered-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroRecoverCertificateName-canwaituntilacertificateisrecovered-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAvlo3LGOMORNejhhv1dZvjiP1aFPqojKZEeUVcVhjAstCLeHjO+P+SPC1L35awSEAhGcP/vSKtLtdJwqJ7I1timi4MvGy5QVfY1e1vPtv5MJVXbbL0wX19NHtZX+lHaUr5sk9ys5wkA9JTJ92BCQTlkAi8PDR3tpWpDK2Ush/RMAxzQLbVAm7MFEYpj/hLZ4g+6PI+j6GfrTPu/Q0G/x6+YRKOHTt2ad69k+Q/fXDfx/oqXXHIDyhEfIsgcX80s2DD8b8NbEAd641ATfli6biLBF8v6wmY0Wgzya1YEdoJZZ4eWroi0alONoXqxGxX9zvRezND7cn/9q65hDycCHC/QIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAHlnvL8FcG0ygJAe/yDGfjpuTglcNQNvIEWx0fDB8fuHSJenm9MlMJjQh0eRLzwDHa/jbvP9ahwO7zhnHpfV4/hw1sg45Gy6NszIhXZDgU4Y7HDLhn2oOR9BU8lwaPf3UOKL7ddtU37Zaq6hL/crGHteFZETZ3Qwxbv7Me5GzBAOOe+IoFaPT4rffb88S2mygen1cOO6kUamb+wTwbmX5OaZChZv17zs2X1EaLP54XhkaQSBnNx9TB0ihkmjFQ2huS8m0AIg1GwOQ9H2wbPRrWsQRn4dwFLnhz2zMI3nR8Mt5Lyf0QdQVDSpdiY/jEuv3prbzuFgbMWKI6ZFDjA0dIo=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"d0d6d1e9d15c4c87a83f54164fac456c"}, [
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
  '1f90070c-5607-4884-ad9b-673b3c7022e5',
  'x-ms-request-id',
  '5a273730-25a0-46e0-af46-470ec31940bf',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:24:20 GMT',
  'Content-Length',
  '1354'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroRecoverCertificateName-canwaituntilacertificateisrecovered-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroRecoverCertificateName-canwaituntilacertificateisrecovered-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAvlo3LGOMORNejhhv1dZvjiP1aFPqojKZEeUVcVhjAstCLeHjO+P+SPC1L35awSEAhGcP/vSKtLtdJwqJ7I1timi4MvGy5QVfY1e1vPtv5MJVXbbL0wX19NHtZX+lHaUr5sk9ys5wkA9JTJ92BCQTlkAi8PDR3tpWpDK2Ush/RMAxzQLbVAm7MFEYpj/hLZ4g+6PI+j6GfrTPu/Q0G/x6+YRKOHTt2ad69k+Q/fXDfx/oqXXHIDyhEfIsgcX80s2DD8b8NbEAd641ATfli6biLBF8v6wmY0Wgzya1YEdoJZZ4eWroi0alONoXqxGxX9zvRezND7cn/9q65hDycCHC/QIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAHlnvL8FcG0ygJAe/yDGfjpuTglcNQNvIEWx0fDB8fuHSJenm9MlMJjQh0eRLzwDHa/jbvP9ahwO7zhnHpfV4/hw1sg45Gy6NszIhXZDgU4Y7HDLhn2oOR9BU8lwaPf3UOKL7ddtU37Zaq6hL/crGHteFZETZ3Qwxbv7Me5GzBAOOe+IoFaPT4rffb88S2mygen1cOO6kUamb+wTwbmX5OaZChZv17zs2X1EaLP54XhkaQSBnNx9TB0ihkmjFQ2huS8m0AIg1GwOQ9H2wbPRrWsQRn4dwFLnhz2zMI3nR8Mt5Lyf0QdQVDSpdiY/jEuv3prbzuFgbMWKI6ZFDjA0dIo=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"d0d6d1e9d15c4c87a83f54164fac456c"}, [
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
  'bd0b0ff2-6a4f-4bc8-ab74-7cb5f49070f2',
  'x-ms-request-id',
  '81acfef2-c430-4bfd-b35e-89360afcaa56',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:24:22 GMT',
  'Content-Length',
  '1354'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroRecoverCertificateName-canwaituntilacertificateisrecovered-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroRecoverCertificateName-canwaituntilacertificateisrecovered-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAvlo3LGOMORNejhhv1dZvjiP1aFPqojKZEeUVcVhjAstCLeHjO+P+SPC1L35awSEAhGcP/vSKtLtdJwqJ7I1timi4MvGy5QVfY1e1vPtv5MJVXbbL0wX19NHtZX+lHaUr5sk9ys5wkA9JTJ92BCQTlkAi8PDR3tpWpDK2Ush/RMAxzQLbVAm7MFEYpj/hLZ4g+6PI+j6GfrTPu/Q0G/x6+YRKOHTt2ad69k+Q/fXDfx/oqXXHIDyhEfIsgcX80s2DD8b8NbEAd641ATfli6biLBF8v6wmY0Wgzya1YEdoJZZ4eWroi0alONoXqxGxX9zvRezND7cn/9q65hDycCHC/QIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAHlnvL8FcG0ygJAe/yDGfjpuTglcNQNvIEWx0fDB8fuHSJenm9MlMJjQh0eRLzwDHa/jbvP9ahwO7zhnHpfV4/hw1sg45Gy6NszIhXZDgU4Y7HDLhn2oOR9BU8lwaPf3UOKL7ddtU37Zaq6hL/crGHteFZETZ3Qwxbv7Me5GzBAOOe+IoFaPT4rffb88S2mygen1cOO6kUamb+wTwbmX5OaZChZv17zs2X1EaLP54XhkaQSBnNx9TB0ihkmjFQ2huS8m0AIg1GwOQ9H2wbPRrWsQRn4dwFLnhz2zMI3nR8Mt5Lyf0QdQVDSpdiY/jEuv3prbzuFgbMWKI6ZFDjA0dIo=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"d0d6d1e9d15c4c87a83f54164fac456c"}, [
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
  '2c28a08d-f913-44ec-9af2-f75ab3e67943',
  'x-ms-request-id',
  '334cff39-6379-4fd1-b7ec-a9447b97127d',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:24:24 GMT',
  'Content-Length',
  '1354'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroRecoverCertificateName-canwaituntilacertificateisrecovered-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroRecoverCertificateName-canwaituntilacertificateisrecovered-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAvlo3LGOMORNejhhv1dZvjiP1aFPqojKZEeUVcVhjAstCLeHjO+P+SPC1L35awSEAhGcP/vSKtLtdJwqJ7I1timi4MvGy5QVfY1e1vPtv5MJVXbbL0wX19NHtZX+lHaUr5sk9ys5wkA9JTJ92BCQTlkAi8PDR3tpWpDK2Ush/RMAxzQLbVAm7MFEYpj/hLZ4g+6PI+j6GfrTPu/Q0G/x6+YRKOHTt2ad69k+Q/fXDfx/oqXXHIDyhEfIsgcX80s2DD8b8NbEAd641ATfli6biLBF8v6wmY0Wgzya1YEdoJZZ4eWroi0alONoXqxGxX9zvRezND7cn/9q65hDycCHC/QIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAHlnvL8FcG0ygJAe/yDGfjpuTglcNQNvIEWx0fDB8fuHSJenm9MlMJjQh0eRLzwDHa/jbvP9ahwO7zhnHpfV4/hw1sg45Gy6NszIhXZDgU4Y7HDLhn2oOR9BU8lwaPf3UOKL7ddtU37Zaq6hL/crGHteFZETZ3Qwxbv7Me5GzBAOOe+IoFaPT4rffb88S2mygen1cOO6kUamb+wTwbmX5OaZChZv17zs2X1EaLP54XhkaQSBnNx9TB0ihkmjFQ2huS8m0AIg1GwOQ9H2wbPRrWsQRn4dwFLnhz2zMI3nR8Mt5Lyf0QdQVDSpdiY/jEuv3prbzuFgbMWKI6ZFDjA0dIo=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"d0d6d1e9d15c4c87a83f54164fac456c"}, [
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
  '78d8b409-fb1a-4fb7-9030-4d6b5d447b31',
  'x-ms-request-id',
  'e1a48b77-443c-44b2-a00a-cd315f605451',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:24:26 GMT',
  'Content-Length',
  '1354'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroRecoverCertificateName-canwaituntilacertificateisrecovered-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroRecoverCertificateName-canwaituntilacertificateisrecovered-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAvlo3LGOMORNejhhv1dZvjiP1aFPqojKZEeUVcVhjAstCLeHjO+P+SPC1L35awSEAhGcP/vSKtLtdJwqJ7I1timi4MvGy5QVfY1e1vPtv5MJVXbbL0wX19NHtZX+lHaUr5sk9ys5wkA9JTJ92BCQTlkAi8PDR3tpWpDK2Ush/RMAxzQLbVAm7MFEYpj/hLZ4g+6PI+j6GfrTPu/Q0G/x6+YRKOHTt2ad69k+Q/fXDfx/oqXXHIDyhEfIsgcX80s2DD8b8NbEAd641ATfli6biLBF8v6wmY0Wgzya1YEdoJZZ4eWroi0alONoXqxGxX9zvRezND7cn/9q65hDycCHC/QIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAHlnvL8FcG0ygJAe/yDGfjpuTglcNQNvIEWx0fDB8fuHSJenm9MlMJjQh0eRLzwDHa/jbvP9ahwO7zhnHpfV4/hw1sg45Gy6NszIhXZDgU4Y7HDLhn2oOR9BU8lwaPf3UOKL7ddtU37Zaq6hL/crGHteFZETZ3Qwxbv7Me5GzBAOOe+IoFaPT4rffb88S2mygen1cOO6kUamb+wTwbmX5OaZChZv17zs2X1EaLP54XhkaQSBnNx9TB0ihkmjFQ2huS8m0AIg1GwOQ9H2wbPRrWsQRn4dwFLnhz2zMI3nR8Mt5Lyf0QdQVDSpdiY/jEuv3prbzuFgbMWKI6ZFDjA0dIo=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"d0d6d1e9d15c4c87a83f54164fac456c"}, [
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
  '5513b2bd-236b-48f0-8019-a8f43d6b6753',
  'x-ms-request-id',
  '92e920b5-c3d1-45d3-90b3-74bf666f5f85',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:24:28 GMT',
  'Content-Length',
  '1354'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroRecoverCertificateName-canwaituntilacertificateisrecovered-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroRecoverCertificateName-canwaituntilacertificateisrecovered-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAvlo3LGOMORNejhhv1dZvjiP1aFPqojKZEeUVcVhjAstCLeHjO+P+SPC1L35awSEAhGcP/vSKtLtdJwqJ7I1timi4MvGy5QVfY1e1vPtv5MJVXbbL0wX19NHtZX+lHaUr5sk9ys5wkA9JTJ92BCQTlkAi8PDR3tpWpDK2Ush/RMAxzQLbVAm7MFEYpj/hLZ4g+6PI+j6GfrTPu/Q0G/x6+YRKOHTt2ad69k+Q/fXDfx/oqXXHIDyhEfIsgcX80s2DD8b8NbEAd641ATfli6biLBF8v6wmY0Wgzya1YEdoJZZ4eWroi0alONoXqxGxX9zvRezND7cn/9q65hDycCHC/QIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAHlnvL8FcG0ygJAe/yDGfjpuTglcNQNvIEWx0fDB8fuHSJenm9MlMJjQh0eRLzwDHa/jbvP9ahwO7zhnHpfV4/hw1sg45Gy6NszIhXZDgU4Y7HDLhn2oOR9BU8lwaPf3UOKL7ddtU37Zaq6hL/crGHteFZETZ3Qwxbv7Me5GzBAOOe+IoFaPT4rffb88S2mygen1cOO6kUamb+wTwbmX5OaZChZv17zs2X1EaLP54XhkaQSBnNx9TB0ihkmjFQ2huS8m0AIg1GwOQ9H2wbPRrWsQRn4dwFLnhz2zMI3nR8Mt5Lyf0QdQVDSpdiY/jEuv3prbzuFgbMWKI6ZFDjA0dIo=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"d0d6d1e9d15c4c87a83f54164fac456c"}, [
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
  'a1e05e6d-1590-4404-a48b-bb2e56630c83',
  'x-ms-request-id',
  'e8e16b20-3046-49f4-9865-bf0e96f0f0f1',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:24:31 GMT',
  'Content-Length',
  '1354'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroRecoverCertificateName-canwaituntilacertificateisrecovered-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroRecoverCertificateName-canwaituntilacertificateisrecovered-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAvlo3LGOMORNejhhv1dZvjiP1aFPqojKZEeUVcVhjAstCLeHjO+P+SPC1L35awSEAhGcP/vSKtLtdJwqJ7I1timi4MvGy5QVfY1e1vPtv5MJVXbbL0wX19NHtZX+lHaUr5sk9ys5wkA9JTJ92BCQTlkAi8PDR3tpWpDK2Ush/RMAxzQLbVAm7MFEYpj/hLZ4g+6PI+j6GfrTPu/Q0G/x6+YRKOHTt2ad69k+Q/fXDfx/oqXXHIDyhEfIsgcX80s2DD8b8NbEAd641ATfli6biLBF8v6wmY0Wgzya1YEdoJZZ4eWroi0alONoXqxGxX9zvRezND7cn/9q65hDycCHC/QIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAHlnvL8FcG0ygJAe/yDGfjpuTglcNQNvIEWx0fDB8fuHSJenm9MlMJjQh0eRLzwDHa/jbvP9ahwO7zhnHpfV4/hw1sg45Gy6NszIhXZDgU4Y7HDLhn2oOR9BU8lwaPf3UOKL7ddtU37Zaq6hL/crGHteFZETZ3Qwxbv7Me5GzBAOOe+IoFaPT4rffb88S2mygen1cOO6kUamb+wTwbmX5OaZChZv17zs2X1EaLP54XhkaQSBnNx9TB0ihkmjFQ2huS8m0AIg1GwOQ9H2wbPRrWsQRn4dwFLnhz2zMI3nR8Mt5Lyf0QdQVDSpdiY/jEuv3prbzuFgbMWKI6ZFDjA0dIo=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"d0d6d1e9d15c4c87a83f54164fac456c"}, [
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
  '7cf6048f-3941-4adf-8ddf-cb86cec59c75',
  'x-ms-request-id',
  'ca6b75fa-66ae-4304-9e15-064fd25999ed',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:24:33 GMT',
  'Content-Length',
  '1354'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroRecoverCertificateName-canwaituntilacertificateisrecovered-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroRecoverCertificateName-canwaituntilacertificateisrecovered-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAvlo3LGOMORNejhhv1dZvjiP1aFPqojKZEeUVcVhjAstCLeHjO+P+SPC1L35awSEAhGcP/vSKtLtdJwqJ7I1timi4MvGy5QVfY1e1vPtv5MJVXbbL0wX19NHtZX+lHaUr5sk9ys5wkA9JTJ92BCQTlkAi8PDR3tpWpDK2Ush/RMAxzQLbVAm7MFEYpj/hLZ4g+6PI+j6GfrTPu/Q0G/x6+YRKOHTt2ad69k+Q/fXDfx/oqXXHIDyhEfIsgcX80s2DD8b8NbEAd641ATfli6biLBF8v6wmY0Wgzya1YEdoJZZ4eWroi0alONoXqxGxX9zvRezND7cn/9q65hDycCHC/QIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAHlnvL8FcG0ygJAe/yDGfjpuTglcNQNvIEWx0fDB8fuHSJenm9MlMJjQh0eRLzwDHa/jbvP9ahwO7zhnHpfV4/hw1sg45Gy6NszIhXZDgU4Y7HDLhn2oOR9BU8lwaPf3UOKL7ddtU37Zaq6hL/crGHteFZETZ3Qwxbv7Me5GzBAOOe+IoFaPT4rffb88S2mygen1cOO6kUamb+wTwbmX5OaZChZv17zs2X1EaLP54XhkaQSBnNx9TB0ihkmjFQ2huS8m0AIg1GwOQ9H2wbPRrWsQRn4dwFLnhz2zMI3nR8Mt5Lyf0QdQVDSpdiY/jEuv3prbzuFgbMWKI6ZFDjA0dIo=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"d0d6d1e9d15c4c87a83f54164fac456c"}, [
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
  '5dd5bc48-a7ce-4481-9a21-d532c8f2efae',
  'x-ms-request-id',
  '670496fe-ae0e-4d31-986f-354040d4cc16',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:24:35 GMT',
  'Content-Length',
  '1354'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroRecoverCertificateName-canwaituntilacertificateisrecovered-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroRecoverCertificateName-canwaituntilacertificateisrecovered-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAvlo3LGOMORNejhhv1dZvjiP1aFPqojKZEeUVcVhjAstCLeHjO+P+SPC1L35awSEAhGcP/vSKtLtdJwqJ7I1timi4MvGy5QVfY1e1vPtv5MJVXbbL0wX19NHtZX+lHaUr5sk9ys5wkA9JTJ92BCQTlkAi8PDR3tpWpDK2Ush/RMAxzQLbVAm7MFEYpj/hLZ4g+6PI+j6GfrTPu/Q0G/x6+YRKOHTt2ad69k+Q/fXDfx/oqXXHIDyhEfIsgcX80s2DD8b8NbEAd641ATfli6biLBF8v6wmY0Wgzya1YEdoJZZ4eWroi0alONoXqxGxX9zvRezND7cn/9q65hDycCHC/QIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAHlnvL8FcG0ygJAe/yDGfjpuTglcNQNvIEWx0fDB8fuHSJenm9MlMJjQh0eRLzwDHa/jbvP9ahwO7zhnHpfV4/hw1sg45Gy6NszIhXZDgU4Y7HDLhn2oOR9BU8lwaPf3UOKL7ddtU37Zaq6hL/crGHteFZETZ3Qwxbv7Me5GzBAOOe+IoFaPT4rffb88S2mygen1cOO6kUamb+wTwbmX5OaZChZv17zs2X1EaLP54XhkaQSBnNx9TB0ihkmjFQ2huS8m0AIg1GwOQ9H2wbPRrWsQRn4dwFLnhz2zMI3nR8Mt5Lyf0QdQVDSpdiY/jEuv3prbzuFgbMWKI6ZFDjA0dIo=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"d0d6d1e9d15c4c87a83f54164fac456c"}, [
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
  'e59c9aa9-4fc9-47ea-812d-5e61af3874e6',
  'x-ms-request-id',
  'a9d0a1c1-de86-423e-a455-851c35dfe17f',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:24:36 GMT',
  'Content-Length',
  '1354'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroRecoverCertificateName-canwaituntilacertificateisrecovered-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroRecoverCertificateName-canwaituntilacertificateisrecovered-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAvlo3LGOMORNejhhv1dZvjiP1aFPqojKZEeUVcVhjAstCLeHjO+P+SPC1L35awSEAhGcP/vSKtLtdJwqJ7I1timi4MvGy5QVfY1e1vPtv5MJVXbbL0wX19NHtZX+lHaUr5sk9ys5wkA9JTJ92BCQTlkAi8PDR3tpWpDK2Ush/RMAxzQLbVAm7MFEYpj/hLZ4g+6PI+j6GfrTPu/Q0G/x6+YRKOHTt2ad69k+Q/fXDfx/oqXXHIDyhEfIsgcX80s2DD8b8NbEAd641ATfli6biLBF8v6wmY0Wgzya1YEdoJZZ4eWroi0alONoXqxGxX9zvRezND7cn/9q65hDycCHC/QIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAHlnvL8FcG0ygJAe/yDGfjpuTglcNQNvIEWx0fDB8fuHSJenm9MlMJjQh0eRLzwDHa/jbvP9ahwO7zhnHpfV4/hw1sg45Gy6NszIhXZDgU4Y7HDLhn2oOR9BU8lwaPf3UOKL7ddtU37Zaq6hL/crGHteFZETZ3Qwxbv7Me5GzBAOOe+IoFaPT4rffb88S2mygen1cOO6kUamb+wTwbmX5OaZChZv17zs2X1EaLP54XhkaQSBnNx9TB0ihkmjFQ2huS8m0AIg1GwOQ9H2wbPRrWsQRn4dwFLnhz2zMI3nR8Mt5Lyf0QdQVDSpdiY/jEuv3prbzuFgbMWKI6ZFDjA0dIo=","cancellation_requested":false,"status":"completed","target":"https://keyvault_name.vault.azure.net/certificates/lroRecoverCertificateName-canwaituntilacertificateisrecovered-","request_id":"d0d6d1e9d15c4c87a83f54164fac456c"}, [
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
  '8994bbc5-0512-44f3-912a-4b64c1856f03',
  'x-ms-request-id',
  '7f712c4e-fe82-4e6d-8944-fd4505bdceaf',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:24:39 GMT',
  'Content-Length',
  '1335'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroRecoverCertificateName-canwaituntilacertificateisrecovered-/')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroRecoverCertificateName-canwaituntilacertificateisrecovered-/f1d8bd15b274427981d3915209543053","kid":"https://keyvault_name.vault.azure.net/keys/lroRecoverCertificateName-canwaituntilacertificateisrecovered-/f1d8bd15b274427981d3915209543053","sid":"https://keyvault_name.vault.azure.net/secrets/lroRecoverCertificateName-canwaituntilacertificateisrecovered-/f1d8bd15b274427981d3915209543053","x5t":"MBTSLLV27gaAUAf4kdpPmQaoUHA","cer":"MIIDKDCCAhCgAwIBAgIQSUj4tEoiQBq14EJn2XPMeTANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjEwNDI4MjExNDM5WhcNMjIwNDI4MjEyNDM5WjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQC+WjcsY4w5E16OGG/V1m+OI/VoU+qiMpkR5RVxWGMCy0It4eM74/5I8LUvflrBIQCEZw/+9Iq0u10nConsjW2KaLgy8bLlBV9jV7W8+2/kwlVdtsvTBfX00e1lf6UdpSvmyT3KznCQD0lMn3YEJBOWQCLw8NHe2lakMrZSyH9EwDHNAttUCbswURimP+EtniD7o8j6PoZ+tM+79DQb/Hr5hEo4dO3Zp3r2T5D99cN/H+ipdccgPKER8iyBxfzSzYMPxvw1sQB3rjUBN+WLpuIsEXy/rCZjRaDPJrVgR2gllnh5auiLRqU42herEbFf3O9F7M0Ptyf/2rrmEPJwIcL9AgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBTWEu2E10027FycEyH0OYPc7H/vPjAdBgNVHQ4EFgQU1hLthNdNNuxcnBMh9DmD3Ox/7z4wDQYJKoZIhvcNAQELBQADggEBAKQmL6gHkt7El5u1fJumIE3cJXcfFQ0t5jybLYbNbd7XQtTajli9TZAH5mcqYAl5S1MP9ycMgAmjzMCxz6dDdC6Kx1HzySXUShO2jIY5Ac66gGQT0Hc6NOAGHsn5gr25Z1Pxz5ZWJSGcMrG09kbgIyqfRvWf4Bhm9KNOJFuqm/ZROt93/Nrpv50ikqUSfO5UO0XwgJchs9OpH10N/XURHdizVozZsxXasK+y/cG+WVS9BJlzYtHOr37qRKm0evckCJZr0eNPPacrZ+kBq0sqbOs4oLXaOfGHL4mNT/nVcciCQo4fLpP0ip03GHvUtOtzxIBuWtHP8ru/wS8RjNqo/lo=","attributes":{"enabled":true,"nbf":1619644479,"exp":1651181079,"created":1619645079,"updated":1619645079,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/lroRecoverCertificateName-canwaituntilacertificateisrecovered-/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1619645003,"updated":1619645003}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/lroRecoverCertificateName-canwaituntilacertificateisrecovered-/pending"}}, [
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
  '96a11953-b5a9-45e1-9335-3b12e0a87689',
  'x-ms-request-id',
  '12f759bc-bfe3-4c73-9b5f-d99a867fb0a4',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:24:39 GMT',
  'Content-Length',
  '2660'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/certificates/lroRecoverCertificateName-canwaituntilacertificateisrecovered-')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/lroRecoverCertificateName-canwaituntilacertificateisrecovered-","deletedDate":1619645079,"scheduledPurgeDate":1627421079,"id":"https://keyvault_name.vault.azure.net/certificates/lroRecoverCertificateName-canwaituntilacertificateisrecovered-/f1d8bd15b274427981d3915209543053","kid":"https://keyvault_name.vault.azure.net/keys/lroRecoverCertificateName-canwaituntilacertificateisrecovered-/f1d8bd15b274427981d3915209543053","sid":"https://keyvault_name.vault.azure.net/secrets/lroRecoverCertificateName-canwaituntilacertificateisrecovered-/f1d8bd15b274427981d3915209543053","x5t":"MBTSLLV27gaAUAf4kdpPmQaoUHA","cer":"MIIDKDCCAhCgAwIBAgIQSUj4tEoiQBq14EJn2XPMeTANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjEwNDI4MjExNDM5WhcNMjIwNDI4MjEyNDM5WjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQC+WjcsY4w5E16OGG/V1m+OI/VoU+qiMpkR5RVxWGMCy0It4eM74/5I8LUvflrBIQCEZw/+9Iq0u10nConsjW2KaLgy8bLlBV9jV7W8+2/kwlVdtsvTBfX00e1lf6UdpSvmyT3KznCQD0lMn3YEJBOWQCLw8NHe2lakMrZSyH9EwDHNAttUCbswURimP+EtniD7o8j6PoZ+tM+79DQb/Hr5hEo4dO3Zp3r2T5D99cN/H+ipdccgPKER8iyBxfzSzYMPxvw1sQB3rjUBN+WLpuIsEXy/rCZjRaDPJrVgR2gllnh5auiLRqU42herEbFf3O9F7M0Ptyf/2rrmEPJwIcL9AgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBTWEu2E10027FycEyH0OYPc7H/vPjAdBgNVHQ4EFgQU1hLthNdNNuxcnBMh9DmD3Ox/7z4wDQYJKoZIhvcNAQELBQADggEBAKQmL6gHkt7El5u1fJumIE3cJXcfFQ0t5jybLYbNbd7XQtTajli9TZAH5mcqYAl5S1MP9ycMgAmjzMCxz6dDdC6Kx1HzySXUShO2jIY5Ac66gGQT0Hc6NOAGHsn5gr25Z1Pxz5ZWJSGcMrG09kbgIyqfRvWf4Bhm9KNOJFuqm/ZROt93/Nrpv50ikqUSfO5UO0XwgJchs9OpH10N/XURHdizVozZsxXasK+y/cG+WVS9BJlzYtHOr37qRKm0evckCJZr0eNPPacrZ+kBq0sqbOs4oLXaOfGHL4mNT/nVcciCQo4fLpP0ip03GHvUtOtzxIBuWtHP8ru/wS8RjNqo/lo=","attributes":{"enabled":true,"nbf":1619644479,"exp":1651181079,"created":1619645079,"updated":1619645079,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/lroRecoverCertificateName-canwaituntilacertificateisrecovered-/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1619645003,"updated":1619645003}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/lroRecoverCertificateName-canwaituntilacertificateisrecovered-/pending"}}, [
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
  'e65894bf-dfa7-4b27-a8a1-67d5bb093929',
  'x-ms-request-id',
  'add17603-d003-470d-8adc-62680f750507',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:24:39 GMT',
  'Content-Length',
  '2874'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroRecoverCertificateName-canwaituntilacertificateisrecovered-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroRecoverCertificateName-canwaituntilacertificateisrecovered-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '161',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '586ea4de-25c7-48bf-869f-4ab5865f03d7',
  'x-ms-request-id',
  'ce623d57-f14a-4114-bee3-86d2f3aa7e77',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:24:39 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroRecoverCertificateName-canwaituntilacertificateisrecovered-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroRecoverCertificateName-canwaituntilacertificateisrecovered-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '161',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'd1132e29-84b9-4d9f-9132-e7e4f02b1902',
  'x-ms-request-id',
  'da72abd4-ffa2-4dde-a3f6-4917b5d7829b',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:24:39 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroRecoverCertificateName-canwaituntilacertificateisrecovered-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroRecoverCertificateName-canwaituntilacertificateisrecovered-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '161',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'b2769b19-8db2-41a3-82f4-8a386276f9e5',
  'x-ms-request-id',
  'df1ec478-29e3-4892-b7ea-431eb1be0c12',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:24:41 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroRecoverCertificateName-canwaituntilacertificateisrecovered-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroRecoverCertificateName-canwaituntilacertificateisrecovered-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '161',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'b7dd2c11-c438-493b-b850-c3c96eda8e16',
  'x-ms-request-id',
  'e901b91d-6862-42f5-b690-0259c102f429',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:24:43 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroRecoverCertificateName-canwaituntilacertificateisrecovered-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroRecoverCertificateName-canwaituntilacertificateisrecovered-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '161',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '61e68883-671c-4ebd-8a7a-49d0aa2b762b',
  'x-ms-request-id',
  'de670dd0-cd97-4447-9142-f1b8abc68d35',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:24:46 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroRecoverCertificateName-canwaituntilacertificateisrecovered-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroRecoverCertificateName-canwaituntilacertificateisrecovered-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '161',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'b3f778f2-924b-4e6d-949b-c10bfb699cd4',
  'x-ms-request-id',
  'b9a6c7c0-e485-443e-9adb-b0d94cd2994d',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:24:48 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroRecoverCertificateName-canwaituntilacertificateisrecovered-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroRecoverCertificateName-canwaituntilacertificateisrecovered-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '161',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '1c8a24bf-179b-412d-a31d-53f1b9e2e44d',
  'x-ms-request-id',
  'b140582d-1dfe-45f4-8682-d901bc806f6c',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:24:50 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroRecoverCertificateName-canwaituntilacertificateisrecovered-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroRecoverCertificateName-canwaituntilacertificateisrecovered-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '161',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'bd81dcde-de16-4f58-87cb-81a4165db379',
  'x-ms-request-id',
  'e33b1799-ac89-4c52-9a75-952319ca62e0',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:24:51 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroRecoverCertificateName-canwaituntilacertificateisrecovered-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroRecoverCertificateName-canwaituntilacertificateisrecovered-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '161',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '7dd9b60f-a619-4277-a434-29dd60207a98',
  'x-ms-request-id',
  'cb9a9040-4126-4055-92fc-4573cb71cabb',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:24:54 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroRecoverCertificateName-canwaituntilacertificateisrecovered-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroRecoverCertificateName-canwaituntilacertificateisrecovered-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '161',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'c299070f-5890-42dc-a016-7ea6703d53ab',
  'x-ms-request-id',
  'cb647986-fb16-4777-ac4c-0804ccde0bea',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:24:55 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroRecoverCertificateName-canwaituntilacertificateisrecovered-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroRecoverCertificateName-canwaituntilacertificateisrecovered-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '161',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '19d3e417-e6ff-442b-9ea6-d1c982ea5c42',
  'x-ms-request-id',
  '0a472587-c73c-4ac7-8490-8b4d8b51480d',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:24:58 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroRecoverCertificateName-canwaituntilacertificateisrecovered-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroRecoverCertificateName-canwaituntilacertificateisrecovered-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '161',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '1e114713-9014-49d8-85f3-2fa48d44b195',
  'x-ms-request-id',
  '66ff6f49-89d4-4dc5-8c76-453dd6841555',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:25:00 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroRecoverCertificateName-canwaituntilacertificateisrecovered-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroRecoverCertificateName-canwaituntilacertificateisrecovered-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '161',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '09653bdd-f1ad-41ff-b6dc-2ddd312d82ea',
  'x-ms-request-id',
  '3adeb1d5-ee0c-4b50-a8d6-a1fed891998e',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:25:02 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroRecoverCertificateName-canwaituntilacertificateisrecovered-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroRecoverCertificateName-canwaituntilacertificateisrecovered-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '161',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '1b4a8f28-96c4-4c8b-baa9-2ed5db0097a0',
  'x-ms-request-id',
  '2c3a6478-0461-4a03-9998-1b5a29d508ec',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:25:04 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroRecoverCertificateName-canwaituntilacertificateisrecovered-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroRecoverCertificateName-canwaituntilacertificateisrecovered-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '161',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '9a633942-0583-4455-86b6-55c218bfa696',
  'x-ms-request-id',
  '1ced7adc-e81d-4989-ab76-cf5fcfd39fdd',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:25:07 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroRecoverCertificateName-canwaituntilacertificateisrecovered-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroRecoverCertificateName-canwaituntilacertificateisrecovered-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '161',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '17f52591-93bb-4f51-878d-1aac2dbd5bbc',
  'x-ms-request-id',
  '68c49911-7133-42bd-945d-453fbe7ddc7c',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:25:09 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroRecoverCertificateName-canwaituntilacertificateisrecovered-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroRecoverCertificateName-canwaituntilacertificateisrecovered-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '161',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'a446d4c8-734a-4e1a-8b79-aff9ce7eb223',
  'x-ms-request-id',
  '2e80ae7f-088d-4a69-b3f5-f1f6bd0ec511',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:25:11 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroRecoverCertificateName-canwaituntilacertificateisrecovered-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroRecoverCertificateName-canwaituntilacertificateisrecovered-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '161',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'b36d468d-574d-4956-bbb3-8917ee2ce2f0',
  'x-ms-request-id',
  '66283fc5-b30c-4fb2-a404-53ca13a1b311',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:25:12 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroRecoverCertificateName-canwaituntilacertificateisrecovered-')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/lroRecoverCertificateName-canwaituntilacertificateisrecovered-","deletedDate":1619645079,"scheduledPurgeDate":1627421079,"id":"https://keyvault_name.vault.azure.net/certificates/lroRecoverCertificateName-canwaituntilacertificateisrecovered-/f1d8bd15b274427981d3915209543053","kid":"https://keyvault_name.vault.azure.net/keys/lroRecoverCertificateName-canwaituntilacertificateisrecovered-/f1d8bd15b274427981d3915209543053","sid":"https://keyvault_name.vault.azure.net/secrets/lroRecoverCertificateName-canwaituntilacertificateisrecovered-/f1d8bd15b274427981d3915209543053","x5t":"MBTSLLV27gaAUAf4kdpPmQaoUHA","cer":"MIIDKDCCAhCgAwIBAgIQSUj4tEoiQBq14EJn2XPMeTANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjEwNDI4MjExNDM5WhcNMjIwNDI4MjEyNDM5WjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQC+WjcsY4w5E16OGG/V1m+OI/VoU+qiMpkR5RVxWGMCy0It4eM74/5I8LUvflrBIQCEZw/+9Iq0u10nConsjW2KaLgy8bLlBV9jV7W8+2/kwlVdtsvTBfX00e1lf6UdpSvmyT3KznCQD0lMn3YEJBOWQCLw8NHe2lakMrZSyH9EwDHNAttUCbswURimP+EtniD7o8j6PoZ+tM+79DQb/Hr5hEo4dO3Zp3r2T5D99cN/H+ipdccgPKER8iyBxfzSzYMPxvw1sQB3rjUBN+WLpuIsEXy/rCZjRaDPJrVgR2gllnh5auiLRqU42herEbFf3O9F7M0Ptyf/2rrmEPJwIcL9AgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBTWEu2E10027FycEyH0OYPc7H/vPjAdBgNVHQ4EFgQU1hLthNdNNuxcnBMh9DmD3Ox/7z4wDQYJKoZIhvcNAQELBQADggEBAKQmL6gHkt7El5u1fJumIE3cJXcfFQ0t5jybLYbNbd7XQtTajli9TZAH5mcqYAl5S1MP9ycMgAmjzMCxz6dDdC6Kx1HzySXUShO2jIY5Ac66gGQT0Hc6NOAGHsn5gr25Z1Pxz5ZWJSGcMrG09kbgIyqfRvWf4Bhm9KNOJFuqm/ZROt93/Nrpv50ikqUSfO5UO0XwgJchs9OpH10N/XURHdizVozZsxXasK+y/cG+WVS9BJlzYtHOr37qRKm0evckCJZr0eNPPacrZ+kBq0sqbOs4oLXaOfGHL4mNT/nVcciCQo4fLpP0ip03GHvUtOtzxIBuWtHP8ru/wS8RjNqo/lo=","attributes":{"enabled":true,"nbf":1619644479,"exp":1651181079,"created":1619645079,"updated":1619645079,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/lroRecoverCertificateName-canwaituntilacertificateisrecovered-/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1619645003,"updated":1619645003}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/lroRecoverCertificateName-canwaituntilacertificateisrecovered-/pending"}}, [
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
  '3eadc866-04ea-4a00-b0b6-d73f7b5e8a6f',
  'x-ms-request-id',
  '824e6fb0-b7ed-47c9-940d-f34d450e417a',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:25:14 GMT',
  'Content-Length',
  '2874'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroRecoverCertificateName-canwaituntilacertificateisrecovered-/')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"A certificate with (name/id) lroRecoverCertificateName-canwaituntilacertificateisrecovered- was not found in this key vault. If you recently deleted this certificate you may be able to recover it using the correct recovery command. For help resolving this issue, please see https://go.microsoft.com/fwlink/?linkid=2125182"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '389',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '1f3b7ea4-118a-4572-8fa5-f03a9230ce00',
  'x-ms-request-id',
  '43ec3342-866b-4aeb-9a36-178f036b82de',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:25:14 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/deletedcertificates/lroRecoverCertificateName-canwaituntilacertificateisrecovered-/recover')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroRecoverCertificateName-canwaituntilacertificateisrecovered-/f1d8bd15b274427981d3915209543053","kid":"https://keyvault_name.vault.azure.net/keys/lroRecoverCertificateName-canwaituntilacertificateisrecovered-/f1d8bd15b274427981d3915209543053","sid":"https://keyvault_name.vault.azure.net/secrets/lroRecoverCertificateName-canwaituntilacertificateisrecovered-/f1d8bd15b274427981d3915209543053","x5t":"MBTSLLV27gaAUAf4kdpPmQaoUHA","cer":"MIIDKDCCAhCgAwIBAgIQSUj4tEoiQBq14EJn2XPMeTANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjEwNDI4MjExNDM5WhcNMjIwNDI4MjEyNDM5WjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQC+WjcsY4w5E16OGG/V1m+OI/VoU+qiMpkR5RVxWGMCy0It4eM74/5I8LUvflrBIQCEZw/+9Iq0u10nConsjW2KaLgy8bLlBV9jV7W8+2/kwlVdtsvTBfX00e1lf6UdpSvmyT3KznCQD0lMn3YEJBOWQCLw8NHe2lakMrZSyH9EwDHNAttUCbswURimP+EtniD7o8j6PoZ+tM+79DQb/Hr5hEo4dO3Zp3r2T5D99cN/H+ipdccgPKER8iyBxfzSzYMPxvw1sQB3rjUBN+WLpuIsEXy/rCZjRaDPJrVgR2gllnh5auiLRqU42herEbFf3O9F7M0Ptyf/2rrmEPJwIcL9AgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBTWEu2E10027FycEyH0OYPc7H/vPjAdBgNVHQ4EFgQU1hLthNdNNuxcnBMh9DmD3Ox/7z4wDQYJKoZIhvcNAQELBQADggEBAKQmL6gHkt7El5u1fJumIE3cJXcfFQ0t5jybLYbNbd7XQtTajli9TZAH5mcqYAl5S1MP9ycMgAmjzMCxz6dDdC6Kx1HzySXUShO2jIY5Ac66gGQT0Hc6NOAGHsn5gr25Z1Pxz5ZWJSGcMrG09kbgIyqfRvWf4Bhm9KNOJFuqm/ZROt93/Nrpv50ikqUSfO5UO0XwgJchs9OpH10N/XURHdizVozZsxXasK+y/cG+WVS9BJlzYtHOr37qRKm0evckCJZr0eNPPacrZ+kBq0sqbOs4oLXaOfGHL4mNT/nVcciCQo4fLpP0ip03GHvUtOtzxIBuWtHP8ru/wS8RjNqo/lo=","attributes":{"enabled":true,"nbf":1619644479,"exp":1651181079,"created":1619645079,"updated":1619645079,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/lroRecoverCertificateName-canwaituntilacertificateisrecovered-/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1619645003,"updated":1619645003}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/lroRecoverCertificateName-canwaituntilacertificateisrecovered-/pending"}}, [
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
  'c59f5eb8-8b88-4642-baec-b69d7ce90a53',
  'x-ms-request-id',
  '3d756ffd-52fd-465e-a660-51c7bf1883b8',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:25:16 GMT',
  'Content-Length',
  '2660'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroRecoverCertificateName-canwaituntilacertificateisrecovered-/')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"A certificate with (name/id) lroRecoverCertificateName-canwaituntilacertificateisrecovered- was not found in this key vault. If you recently deleted this certificate you may be able to recover it using the correct recovery command. For help resolving this issue, please see https://go.microsoft.com/fwlink/?linkid=2125182"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '389',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '1c34ffc3-bd59-4d24-bcd8-14a4689a5733',
  'x-ms-request-id',
  'c0c9355a-eea9-4910-a3d3-b99d3eba9e50',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:25:16 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroRecoverCertificateName-canwaituntilacertificateisrecovered-/')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"A certificate with (name/id) lroRecoverCertificateName-canwaituntilacertificateisrecovered- was not found in this key vault. If you recently deleted this certificate you may be able to recover it using the correct recovery command. For help resolving this issue, please see https://go.microsoft.com/fwlink/?linkid=2125182"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '389',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'fa1bf43e-0dd4-4cc6-8fb2-912da483f9dc',
  'x-ms-request-id',
  '6096fbdd-cfc9-4a5f-a32b-6bcf0c72db92',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:25:16 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroRecoverCertificateName-canwaituntilacertificateisrecovered-/')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"A certificate with (name/id) lroRecoverCertificateName-canwaituntilacertificateisrecovered- was not found in this key vault. If you recently deleted this certificate you may be able to recover it using the correct recovery command. For help resolving this issue, please see https://go.microsoft.com/fwlink/?linkid=2125182"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '389',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'e8ce4c16-81ef-4878-b8b8-8d136e150581',
  'x-ms-request-id',
  '1fae5eb0-e211-4849-86da-54e9f3255dba',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:25:18 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroRecoverCertificateName-canwaituntilacertificateisrecovered-/')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"A certificate with (name/id) lroRecoverCertificateName-canwaituntilacertificateisrecovered- was not found in this key vault. If you recently deleted this certificate you may be able to recover it using the correct recovery command. For help resolving this issue, please see https://go.microsoft.com/fwlink/?linkid=2125182"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '389',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '1998a8f1-bdf1-4805-bad6-e83af9dfb5e4',
  'x-ms-request-id',
  'edccbf40-10f5-42c9-b40f-d53abb2b8bf0',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:25:20 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroRecoverCertificateName-canwaituntilacertificateisrecovered-/')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"A certificate with (name/id) lroRecoverCertificateName-canwaituntilacertificateisrecovered- was not found in this key vault. If you recently deleted this certificate you may be able to recover it using the correct recovery command. For help resolving this issue, please see https://go.microsoft.com/fwlink/?linkid=2125182"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '389',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '3b19cd4b-9e8f-45a5-b25c-2dca38f82244',
  'x-ms-request-id',
  '18c786e1-c79d-4c0a-832c-c5adc2ea5c4c',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:25:22 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroRecoverCertificateName-canwaituntilacertificateisrecovered-/')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"A certificate with (name/id) lroRecoverCertificateName-canwaituntilacertificateisrecovered- was not found in this key vault. If you recently deleted this certificate you may be able to recover it using the correct recovery command. For help resolving this issue, please see https://go.microsoft.com/fwlink/?linkid=2125182"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '389',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'e05ae620-3502-4e92-83f0-ad34b386fc16',
  'x-ms-request-id',
  '8f182a46-2a15-4a22-adbf-92beed0a5b6e',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:25:23 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroRecoverCertificateName-canwaituntilacertificateisrecovered-/')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"A certificate with (name/id) lroRecoverCertificateName-canwaituntilacertificateisrecovered- was not found in this key vault. If you recently deleted this certificate you may be able to recover it using the correct recovery command. For help resolving this issue, please see https://go.microsoft.com/fwlink/?linkid=2125182"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '389',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'dcc94983-5c6d-460d-8979-8f840ae6582a',
  'x-ms-request-id',
  'd5fd21ac-7fad-41b5-bf89-eef8a0482f2b',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:25:25 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroRecoverCertificateName-canwaituntilacertificateisrecovered-/')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"A certificate with (name/id) lroRecoverCertificateName-canwaituntilacertificateisrecovered- was not found in this key vault. If you recently deleted this certificate you may be able to recover it using the correct recovery command. For help resolving this issue, please see https://go.microsoft.com/fwlink/?linkid=2125182"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '389',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '4a648fb5-049b-4713-9fbc-972faa3bb264',
  'x-ms-request-id',
  'ae8e6ed8-806f-4b7c-832f-4ad895735bec',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:25:28 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroRecoverCertificateName-canwaituntilacertificateisrecovered-/')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"A certificate with (name/id) lroRecoverCertificateName-canwaituntilacertificateisrecovered- was not found in this key vault. If you recently deleted this certificate you may be able to recover it using the correct recovery command. For help resolving this issue, please see https://go.microsoft.com/fwlink/?linkid=2125182"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '389',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '49db60ff-b939-444e-b744-92cf5df17ec7',
  'x-ms-request-id',
  '9a049552-6fc4-4969-82bf-fe29e237831e',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:25:30 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroRecoverCertificateName-canwaituntilacertificateisrecovered-/')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"A certificate with (name/id) lroRecoverCertificateName-canwaituntilacertificateisrecovered- was not found in this key vault. If you recently deleted this certificate you may be able to recover it using the correct recovery command. For help resolving this issue, please see https://go.microsoft.com/fwlink/?linkid=2125182"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '389',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '7699bd12-e955-4fff-97b9-157b5249e035',
  'x-ms-request-id',
  'adc8530b-2d48-4912-8f3a-7c1d84bcc96d',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:25:32 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroRecoverCertificateName-canwaituntilacertificateisrecovered-/')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"A certificate with (name/id) lroRecoverCertificateName-canwaituntilacertificateisrecovered- was not found in this key vault. If you recently deleted this certificate you may be able to recover it using the correct recovery command. For help resolving this issue, please see https://go.microsoft.com/fwlink/?linkid=2125182"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '389',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '32d2acc6-d2fa-4867-9dfa-4272da74aa71',
  'x-ms-request-id',
  'b92fc8de-84fe-4239-8142-b330b47aa15a',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:25:34 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroRecoverCertificateName-canwaituntilacertificateisrecovered-/')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"A certificate with (name/id) lroRecoverCertificateName-canwaituntilacertificateisrecovered- was not found in this key vault. If you recently deleted this certificate you may be able to recover it using the correct recovery command. For help resolving this issue, please see https://go.microsoft.com/fwlink/?linkid=2125182"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '389',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '0f11404f-951a-4d1e-8619-76287c04b70c',
  'x-ms-request-id',
  'abbfb40e-a2f3-4ddf-bfb9-312d6d56da96',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:25:36 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroRecoverCertificateName-canwaituntilacertificateisrecovered-/')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"A certificate with (name/id) lroRecoverCertificateName-canwaituntilacertificateisrecovered- was not found in this key vault. If you recently deleted this certificate you may be able to recover it using the correct recovery command. For help resolving this issue, please see https://go.microsoft.com/fwlink/?linkid=2125182"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '389',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'b33371bf-2aac-4479-bfb2-977f56fda2ce',
  'x-ms-request-id',
  '52aeef0b-2fc4-438c-a3c7-f7f5986cf79e',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:25:38 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroRecoverCertificateName-canwaituntilacertificateisrecovered-/')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"A certificate with (name/id) lroRecoverCertificateName-canwaituntilacertificateisrecovered- was not found in this key vault. If you recently deleted this certificate you may be able to recover it using the correct recovery command. For help resolving this issue, please see https://go.microsoft.com/fwlink/?linkid=2125182"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '389',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'ceede188-e697-4380-9d84-1ddc2763068a',
  'x-ms-request-id',
  'ee4387fe-a6b2-4d9e-b8f9-79e16e3d831a',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:25:41 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroRecoverCertificateName-canwaituntilacertificateisrecovered-/')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"A certificate with (name/id) lroRecoverCertificateName-canwaituntilacertificateisrecovered- was not found in this key vault. If you recently deleted this certificate you may be able to recover it using the correct recovery command. For help resolving this issue, please see https://go.microsoft.com/fwlink/?linkid=2125182"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '389',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'ac0d18b0-2c15-4e4d-9f9e-340c1184d1cd',
  'x-ms-request-id',
  '142b058a-c578-4260-95b8-029b29aeb907',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:25:43 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroRecoverCertificateName-canwaituntilacertificateisrecovered-/')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"A certificate with (name/id) lroRecoverCertificateName-canwaituntilacertificateisrecovered- was not found in this key vault. If you recently deleted this certificate you may be able to recover it using the correct recovery command. For help resolving this issue, please see https://go.microsoft.com/fwlink/?linkid=2125182"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '389',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '0b481588-2246-4480-832b-e32d90c573eb',
  'x-ms-request-id',
  '133e003b-2962-42f4-966e-c8430c8d7fe7',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:25:45 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroRecoverCertificateName-canwaituntilacertificateisrecovered-/')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"A certificate with (name/id) lroRecoverCertificateName-canwaituntilacertificateisrecovered- was not found in this key vault. If you recently deleted this certificate you may be able to recover it using the correct recovery command. For help resolving this issue, please see https://go.microsoft.com/fwlink/?linkid=2125182"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '389',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '1e63300d-f989-437f-b591-e85a7e7e640f',
  'x-ms-request-id',
  '79e34a52-b8b5-4e00-acea-6f2e52d5732a',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:25:47 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroRecoverCertificateName-canwaituntilacertificateisrecovered-/')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"A certificate with (name/id) lroRecoverCertificateName-canwaituntilacertificateisrecovered- was not found in this key vault. If you recently deleted this certificate you may be able to recover it using the correct recovery command. For help resolving this issue, please see https://go.microsoft.com/fwlink/?linkid=2125182"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '389',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'dc3662c2-4176-4195-9f19-7fca4e9706bb',
  'x-ms-request-id',
  '343090f9-d2ca-48ec-bd5b-fafad324d68f',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:25:48 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroRecoverCertificateName-canwaituntilacertificateisrecovered-/')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"A certificate with (name/id) lroRecoverCertificateName-canwaituntilacertificateisrecovered- was not found in this key vault. If you recently deleted this certificate you may be able to recover it using the correct recovery command. For help resolving this issue, please see https://go.microsoft.com/fwlink/?linkid=2125182"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '389',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '93d46094-4ad8-4ad0-a443-e7ba23601105',
  'x-ms-request-id',
  '9ee3fd8a-d416-4277-bf72-de80cbe139c8',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:25:50 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroRecoverCertificateName-canwaituntilacertificateisrecovered-/')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"A certificate with (name/id) lroRecoverCertificateName-canwaituntilacertificateisrecovered- was not found in this key vault. If you recently deleted this certificate you may be able to recover it using the correct recovery command. For help resolving this issue, please see https://go.microsoft.com/fwlink/?linkid=2125182"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '389',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '4b233e49-f062-4438-b3f0-3b132bbdcc16',
  'x-ms-request-id',
  '5dd4f3e0-efde-4af9-97a8-f08753f12333',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:25:53 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroRecoverCertificateName-canwaituntilacertificateisrecovered-/')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"A certificate with (name/id) lroRecoverCertificateName-canwaituntilacertificateisrecovered- was not found in this key vault. If you recently deleted this certificate you may be able to recover it using the correct recovery command. For help resolving this issue, please see https://go.microsoft.com/fwlink/?linkid=2125182"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '389',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '13d35295-0440-4ea8-ae61-bf20bb3a2615',
  'x-ms-request-id',
  '40d01a18-2c9e-4761-a929-e3bc921a5a44',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:25:55 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroRecoverCertificateName-canwaituntilacertificateisrecovered-/')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"A certificate with (name/id) lroRecoverCertificateName-canwaituntilacertificateisrecovered- was not found in this key vault. If you recently deleted this certificate you may be able to recover it using the correct recovery command. For help resolving this issue, please see https://go.microsoft.com/fwlink/?linkid=2125182"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '389',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '80a24f4c-3e6f-4f9a-8a2d-0add7932ba80',
  'x-ms-request-id',
  'caa86256-688f-4089-922a-4344a20a5ad1',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:25:57 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroRecoverCertificateName-canwaituntilacertificateisrecovered-/')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"A certificate with (name/id) lroRecoverCertificateName-canwaituntilacertificateisrecovered- was not found in this key vault. If you recently deleted this certificate you may be able to recover it using the correct recovery command. For help resolving this issue, please see https://go.microsoft.com/fwlink/?linkid=2125182"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '389',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'a270e263-133a-4c31-a397-1d3e51ac0a69',
  'x-ms-request-id',
  'd4819549-f728-4329-9aa7-2adad6713049',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:25:59 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroRecoverCertificateName-canwaituntilacertificateisrecovered-/')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"A certificate with (name/id) lroRecoverCertificateName-canwaituntilacertificateisrecovered- was not found in this key vault. If you recently deleted this certificate you may be able to recover it using the correct recovery command. For help resolving this issue, please see https://go.microsoft.com/fwlink/?linkid=2125182"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '389',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'f5224711-bc8f-4975-ae48-a46f1c6422dd',
  'x-ms-request-id',
  '0f3b6180-49d7-469b-86cd-9dbd7b98f415',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:26:01 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroRecoverCertificateName-canwaituntilacertificateisrecovered-/')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroRecoverCertificateName-canwaituntilacertificateisrecovered-/f1d8bd15b274427981d3915209543053","kid":"https://keyvault_name.vault.azure.net/keys/lroRecoverCertificateName-canwaituntilacertificateisrecovered-/f1d8bd15b274427981d3915209543053","sid":"https://keyvault_name.vault.azure.net/secrets/lroRecoverCertificateName-canwaituntilacertificateisrecovered-/f1d8bd15b274427981d3915209543053","x5t":"MBTSLLV27gaAUAf4kdpPmQaoUHA","cer":"MIIDKDCCAhCgAwIBAgIQSUj4tEoiQBq14EJn2XPMeTANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjEwNDI4MjExNDM5WhcNMjIwNDI4MjEyNDM5WjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQC+WjcsY4w5E16OGG/V1m+OI/VoU+qiMpkR5RVxWGMCy0It4eM74/5I8LUvflrBIQCEZw/+9Iq0u10nConsjW2KaLgy8bLlBV9jV7W8+2/kwlVdtsvTBfX00e1lf6UdpSvmyT3KznCQD0lMn3YEJBOWQCLw8NHe2lakMrZSyH9EwDHNAttUCbswURimP+EtniD7o8j6PoZ+tM+79DQb/Hr5hEo4dO3Zp3r2T5D99cN/H+ipdccgPKER8iyBxfzSzYMPxvw1sQB3rjUBN+WLpuIsEXy/rCZjRaDPJrVgR2gllnh5auiLRqU42herEbFf3O9F7M0Ptyf/2rrmEPJwIcL9AgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBTWEu2E10027FycEyH0OYPc7H/vPjAdBgNVHQ4EFgQU1hLthNdNNuxcnBMh9DmD3Ox/7z4wDQYJKoZIhvcNAQELBQADggEBAKQmL6gHkt7El5u1fJumIE3cJXcfFQ0t5jybLYbNbd7XQtTajli9TZAH5mcqYAl5S1MP9ycMgAmjzMCxz6dDdC6Kx1HzySXUShO2jIY5Ac66gGQT0Hc6NOAGHsn5gr25Z1Pxz5ZWJSGcMrG09kbgIyqfRvWf4Bhm9KNOJFuqm/ZROt93/Nrpv50ikqUSfO5UO0XwgJchs9OpH10N/XURHdizVozZsxXasK+y/cG+WVS9BJlzYtHOr37qRKm0evckCJZr0eNPPacrZ+kBq0sqbOs4oLXaOfGHL4mNT/nVcciCQo4fLpP0ip03GHvUtOtzxIBuWtHP8ru/wS8RjNqo/lo=","attributes":{"enabled":true,"nbf":1619644479,"exp":1651181079,"created":1619645079,"updated":1619645079,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/lroRecoverCertificateName-canwaituntilacertificateisrecovered-/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1619645003,"updated":1619645003}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/lroRecoverCertificateName-canwaituntilacertificateisrecovered-/pending"}}, [
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
  '69250df7-5f60-4c9d-b5e4-fcb003fcfc68',
  'x-ms-request-id',
  'a706d29d-c840-4b13-a8d5-ab79711de03f',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:26:04 GMT',
  'Content-Length',
  '2660'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/certificates/lroRecoverCertificateName-canwaituntilacertificateisrecovered-')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/lroRecoverCertificateName-canwaituntilacertificateisrecovered-","deletedDate":1619645164,"scheduledPurgeDate":1627421164,"id":"https://keyvault_name.vault.azure.net/certificates/lroRecoverCertificateName-canwaituntilacertificateisrecovered-/f1d8bd15b274427981d3915209543053","kid":"https://keyvault_name.vault.azure.net/keys/lroRecoverCertificateName-canwaituntilacertificateisrecovered-/f1d8bd15b274427981d3915209543053","sid":"https://keyvault_name.vault.azure.net/secrets/lroRecoverCertificateName-canwaituntilacertificateisrecovered-/f1d8bd15b274427981d3915209543053","x5t":"MBTSLLV27gaAUAf4kdpPmQaoUHA","cer":"MIIDKDCCAhCgAwIBAgIQSUj4tEoiQBq14EJn2XPMeTANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjEwNDI4MjExNDM5WhcNMjIwNDI4MjEyNDM5WjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQC+WjcsY4w5E16OGG/V1m+OI/VoU+qiMpkR5RVxWGMCy0It4eM74/5I8LUvflrBIQCEZw/+9Iq0u10nConsjW2KaLgy8bLlBV9jV7W8+2/kwlVdtsvTBfX00e1lf6UdpSvmyT3KznCQD0lMn3YEJBOWQCLw8NHe2lakMrZSyH9EwDHNAttUCbswURimP+EtniD7o8j6PoZ+tM+79DQb/Hr5hEo4dO3Zp3r2T5D99cN/H+ipdccgPKER8iyBxfzSzYMPxvw1sQB3rjUBN+WLpuIsEXy/rCZjRaDPJrVgR2gllnh5auiLRqU42herEbFf3O9F7M0Ptyf/2rrmEPJwIcL9AgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBTWEu2E10027FycEyH0OYPc7H/vPjAdBgNVHQ4EFgQU1hLthNdNNuxcnBMh9DmD3Ox/7z4wDQYJKoZIhvcNAQELBQADggEBAKQmL6gHkt7El5u1fJumIE3cJXcfFQ0t5jybLYbNbd7XQtTajli9TZAH5mcqYAl5S1MP9ycMgAmjzMCxz6dDdC6Kx1HzySXUShO2jIY5Ac66gGQT0Hc6NOAGHsn5gr25Z1Pxz5ZWJSGcMrG09kbgIyqfRvWf4Bhm9KNOJFuqm/ZROt93/Nrpv50ikqUSfO5UO0XwgJchs9OpH10N/XURHdizVozZsxXasK+y/cG+WVS9BJlzYtHOr37qRKm0evckCJZr0eNPPacrZ+kBq0sqbOs4oLXaOfGHL4mNT/nVcciCQo4fLpP0ip03GHvUtOtzxIBuWtHP8ru/wS8RjNqo/lo=","attributes":{"enabled":true,"nbf":1619644479,"exp":1651181079,"created":1619645079,"updated":1619645079,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/lroRecoverCertificateName-canwaituntilacertificateisrecovered-/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1619645003,"updated":1619645003}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/lroRecoverCertificateName-canwaituntilacertificateisrecovered-/pending"}}, [
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
  'd14923ac-7d10-4a92-a7b7-b5a1040ea5b5',
  'x-ms-request-id',
  '9f60c7f1-4afb-41b4-8f1b-2746ef3f0560',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:26:04 GMT',
  'Content-Length',
  '2874'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroRecoverCertificateName-canwaituntilacertificateisrecovered-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroRecoverCertificateName-canwaituntilacertificateisrecovered-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '161',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '1d7950b7-a494-4c9a-82dc-3eed10c23e72',
  'x-ms-request-id',
  'd24a3d80-967d-42db-a8d0-96acebd6f906',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:26:04 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroRecoverCertificateName-canwaituntilacertificateisrecovered-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroRecoverCertificateName-canwaituntilacertificateisrecovered-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '161',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '7d2e29de-8f31-44b8-b809-b40b7e948cb8',
  'x-ms-request-id',
  'b1335a36-d61e-4a69-a94a-d0b68a2757c9',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:26:04 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroRecoverCertificateName-canwaituntilacertificateisrecovered-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroRecoverCertificateName-canwaituntilacertificateisrecovered-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '161',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '284ad5e4-f694-4218-8285-bb0ec08cc0f9',
  'x-ms-request-id',
  '6e66af0c-6b4c-45fb-972e-74d5a41346fe',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:26:06 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroRecoverCertificateName-canwaituntilacertificateisrecovered-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroRecoverCertificateName-canwaituntilacertificateisrecovered-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '161',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'f133b776-a5c8-4393-a503-3c066ddbe72c',
  'x-ms-request-id',
  '11502360-9e89-4916-a7ab-227e6d3ca6e6',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:26:08 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroRecoverCertificateName-canwaituntilacertificateisrecovered-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroRecoverCertificateName-canwaituntilacertificateisrecovered-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '161',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'e5845c42-2577-4931-b079-2ce0da9dc9d6',
  'x-ms-request-id',
  'f5abc530-49d4-4c6c-a9cb-f963cd580a6a',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:26:10 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroRecoverCertificateName-canwaituntilacertificateisrecovered-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroRecoverCertificateName-canwaituntilacertificateisrecovered-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '161',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '11512ca3-7d7f-4f5b-8cba-9a0eee2ce441',
  'x-ms-request-id',
  '8af3fbe8-a38d-4527-b674-b9ee58ca5f79',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:26:12 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroRecoverCertificateName-canwaituntilacertificateisrecovered-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroRecoverCertificateName-canwaituntilacertificateisrecovered-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '161',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '170967bc-a6a4-43fe-9f29-698fbe8f9919',
  'x-ms-request-id',
  'c04cd2d4-41e9-4698-95e5-f9b86b1902f3',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:26:14 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroRecoverCertificateName-canwaituntilacertificateisrecovered-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroRecoverCertificateName-canwaituntilacertificateisrecovered-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '161',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'ee93ff3f-6dcf-4c51-a48d-e4b4acabbcd6',
  'x-ms-request-id',
  '0f310c6a-4506-4066-aef1-63175a357bf9',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:26:16 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroRecoverCertificateName-canwaituntilacertificateisrecovered-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroRecoverCertificateName-canwaituntilacertificateisrecovered-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '161',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'a3e735bd-a9a3-4d4e-af87-d3094c0a8cae',
  'x-ms-request-id',
  '7a1cb330-17c4-4607-826e-651064660ff6',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:26:18 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroRecoverCertificateName-canwaituntilacertificateisrecovered-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroRecoverCertificateName-canwaituntilacertificateisrecovered-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '161',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '8b1f04c3-53c0-40ec-8780-e5b62d1daadd',
  'x-ms-request-id',
  'f334f79b-302b-44c5-9f56-4036cfbb618b',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:26:20 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroRecoverCertificateName-canwaituntilacertificateisrecovered-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroRecoverCertificateName-canwaituntilacertificateisrecovered-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '161',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'b2e5219e-1b48-44ad-b752-e5deb17d014a',
  'x-ms-request-id',
  '92534f42-ea54-46a1-a98b-b49f196e5dc8',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:26:22 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroRecoverCertificateName-canwaituntilacertificateisrecovered-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroRecoverCertificateName-canwaituntilacertificateisrecovered-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '161',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'a6a863ec-54bc-4e05-8859-278dde80516a',
  'x-ms-request-id',
  '1659be50-180b-4aa3-86ec-d46a6a590de7',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:26:25 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroRecoverCertificateName-canwaituntilacertificateisrecovered-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroRecoverCertificateName-canwaituntilacertificateisrecovered-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '161',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '2bbc11ee-e59f-4420-b066-b19027258efa',
  'x-ms-request-id',
  '7b09eb09-2005-471f-957b-1b067502bb23',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:26:27 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroRecoverCertificateName-canwaituntilacertificateisrecovered-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroRecoverCertificateName-canwaituntilacertificateisrecovered-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '161',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '500a5132-26bc-403e-b98b-cee139298667',
  'x-ms-request-id',
  '6fd5f50e-5edd-48d7-835e-fd5aca9cdb42',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:26:29 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroRecoverCertificateName-canwaituntilacertificateisrecovered-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroRecoverCertificateName-canwaituntilacertificateisrecovered-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '161',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'd0206c7d-ca66-49f1-8c1c-a307be5c804d',
  'x-ms-request-id',
  '6f9dc289-0009-4242-b8df-74f1e709e590',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:26:31 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroRecoverCertificateName-canwaituntilacertificateisrecovered-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroRecoverCertificateName-canwaituntilacertificateisrecovered-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '161',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '7afb0fbd-7109-466a-8e43-d2a9938a90f1',
  'x-ms-request-id',
  '4addb432-17c9-4bbe-8684-9f6e4626f695',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:26:33 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroRecoverCertificateName-canwaituntilacertificateisrecovered-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroRecoverCertificateName-canwaituntilacertificateisrecovered-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '161',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'fa3cd952-f5e1-4339-8ef7-e0cadfcbe90e',
  'x-ms-request-id',
  'aeb8e78b-e330-4a16-b146-048624ddc232',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:26:34 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroRecoverCertificateName-canwaituntilacertificateisrecovered-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroRecoverCertificateName-canwaituntilacertificateisrecovered-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '161',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '59e5cd49-c84a-4616-a850-b3c7839dcf64',
  'x-ms-request-id',
  'f140e238-ac13-4238-985d-3f1fc0520bae',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:26:37 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroRecoverCertificateName-canwaituntilacertificateisrecovered-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroRecoverCertificateName-canwaituntilacertificateisrecovered-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '161',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '4ab33317-d00b-4321-9728-bb4c8ad421f5',
  'x-ms-request-id',
  '0b1e3ea1-1517-4203-8583-13d6aed59afc',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:26:39 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroRecoverCertificateName-canwaituntilacertificateisrecovered-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroRecoverCertificateName-canwaituntilacertificateisrecovered-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '161',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '138cb430-9a38-49d6-8508-f33dcae8bbd5',
  'x-ms-request-id',
  '1f5d556b-6a0a-4ad2-aefc-df6356c3a426',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:26:41 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroRecoverCertificateName-canwaituntilacertificateisrecovered-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroRecoverCertificateName-canwaituntilacertificateisrecovered-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '161',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '077aa959-fbb5-4e7a-9063-2543909e90ed',
  'x-ms-request-id',
  'a99f11be-0ecd-4e51-85d1-9448fdc82b82',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:26:43 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroRecoverCertificateName-canwaituntilacertificateisrecovered-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroRecoverCertificateName-canwaituntilacertificateisrecovered-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '161',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '8548b443-ccdd-4001-910a-99e72d68fd14',
  'x-ms-request-id',
  '9da1598a-f5f8-482c-b0c3-55a942febac0',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:26:45 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroRecoverCertificateName-canwaituntilacertificateisrecovered-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroRecoverCertificateName-canwaituntilacertificateisrecovered-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '161',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '91465804-c5cc-46c6-9ce0-4978971a9193',
  'x-ms-request-id',
  'e46f8f96-a534-4811-9f3b-39f9d89c8e32',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:26:47 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroRecoverCertificateName-canwaituntilacertificateisrecovered-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroRecoverCertificateName-canwaituntilacertificateisrecovered-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '161',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '5647db61-b504-45c2-a28a-881da6eadd3f',
  'x-ms-request-id',
  'fea2344d-977b-4a68-a588-4fa7dd53f085',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:26:49 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroRecoverCertificateName-canwaituntilacertificateisrecovered-')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/lroRecoverCertificateName-canwaituntilacertificateisrecovered-","deletedDate":1619645164,"scheduledPurgeDate":1627421164,"id":"https://keyvault_name.vault.azure.net/certificates/lroRecoverCertificateName-canwaituntilacertificateisrecovered-/f1d8bd15b274427981d3915209543053","kid":"https://keyvault_name.vault.azure.net/keys/lroRecoverCertificateName-canwaituntilacertificateisrecovered-/f1d8bd15b274427981d3915209543053","sid":"https://keyvault_name.vault.azure.net/secrets/lroRecoverCertificateName-canwaituntilacertificateisrecovered-/f1d8bd15b274427981d3915209543053","x5t":"MBTSLLV27gaAUAf4kdpPmQaoUHA","cer":"MIIDKDCCAhCgAwIBAgIQSUj4tEoiQBq14EJn2XPMeTANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjEwNDI4MjExNDM5WhcNMjIwNDI4MjEyNDM5WjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQC+WjcsY4w5E16OGG/V1m+OI/VoU+qiMpkR5RVxWGMCy0It4eM74/5I8LUvflrBIQCEZw/+9Iq0u10nConsjW2KaLgy8bLlBV9jV7W8+2/kwlVdtsvTBfX00e1lf6UdpSvmyT3KznCQD0lMn3YEJBOWQCLw8NHe2lakMrZSyH9EwDHNAttUCbswURimP+EtniD7o8j6PoZ+tM+79DQb/Hr5hEo4dO3Zp3r2T5D99cN/H+ipdccgPKER8iyBxfzSzYMPxvw1sQB3rjUBN+WLpuIsEXy/rCZjRaDPJrVgR2gllnh5auiLRqU42herEbFf3O9F7M0Ptyf/2rrmEPJwIcL9AgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBTWEu2E10027FycEyH0OYPc7H/vPjAdBgNVHQ4EFgQU1hLthNdNNuxcnBMh9DmD3Ox/7z4wDQYJKoZIhvcNAQELBQADggEBAKQmL6gHkt7El5u1fJumIE3cJXcfFQ0t5jybLYbNbd7XQtTajli9TZAH5mcqYAl5S1MP9ycMgAmjzMCxz6dDdC6Kx1HzySXUShO2jIY5Ac66gGQT0Hc6NOAGHsn5gr25Z1Pxz5ZWJSGcMrG09kbgIyqfRvWf4Bhm9KNOJFuqm/ZROt93/Nrpv50ikqUSfO5UO0XwgJchs9OpH10N/XURHdizVozZsxXasK+y/cG+WVS9BJlzYtHOr37qRKm0evckCJZr0eNPPacrZ+kBq0sqbOs4oLXaOfGHL4mNT/nVcciCQo4fLpP0ip03GHvUtOtzxIBuWtHP8ru/wS8RjNqo/lo=","attributes":{"enabled":true,"nbf":1619644479,"exp":1651181079,"created":1619645079,"updated":1619645079,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/lroRecoverCertificateName-canwaituntilacertificateisrecovered-/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1619645003,"updated":1619645003}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/lroRecoverCertificateName-canwaituntilacertificateisrecovered-/pending"}}, [
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
  '289d869a-26c3-4553-a9b3-6583256e67f5',
  'x-ms-request-id',
  'bf55b874-d838-4ef8-834e-51ccb1a1441a',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:26:52 GMT',
  'Content-Length',
  '2874'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedcertificates/lroRecoverCertificateName-canwaituntilacertificateisrecovered-')
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
  '14709936-7d3a-432c-bbc6-31dbcc9a7198',
  'x-ms-request-id',
  '87d018bd-3e7f-44e5-a196-6c6f5b777429',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:26:52 GMT'
]);

let nock = require('nock');

module.exports.hash = "7034a5a9e147ceca3905c05a9159b4b8";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/certificates/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-0/create')
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
  'eastus',
  'x-ms-client-request-id',
  '87572551-cc7c-4a6f-8dfb-bc3e6f769201',
  'x-ms-request-id',
  'e9b8f97c-1898-4148-a01b-eb6bfd19fff7',
  'x-ms-keyvault-service-version',
  '1.9.79.2',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.250.57.79;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 13 Sep 2021 19:24:14 GMT'
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
  '28db88cd-39b2-42fc-9996-b6aeeff3ab00',
  'x-ms-ests-server',
  '2.1.12025.15 - WUS2 ProdSlices',
  'Set-Cookie',
  'fpc=AplITJqbuTlLoudu1bOig-k; expires=Wed, 13-Oct-2021 19:24:14 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrspSKbrvLReD2zQus5h7EDi0I_Tv1yCukTAZINKFKz4chpd2lPUFu1uc8im5JaRgXZyc3eXdEsvLeSvA2UtMMV_agRBqSqWjBJ2TZ-S5mlB95oXKThh5VffR-5qzTbp22NCF-I3k8ElUAceG2VEsCP1kgPXRzt5matvkYwfmJasogAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Mon, 13 Sep 2021 19:24:14 GMT',
  'Content-Length',
  '980'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .get('/12345678-1234-1234-1234-123456789012/v2.0/.well-known/openid-configuration')
  .reply(200, {"token_endpoint":"https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/oauth2/v2.0/token","token_endpoint_auth_methods_supported":["client_secret_post","private_key_jwt","client_secret_basic"],"jwks_uri":"https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/discovery/v2.0/keys","response_modes_supported":["query","fragment","form_post"],"subject_types_supported":["pairwise"],"id_token_signing_alg_values_supported":["RS256"],"response_types_supported":["code","id_token","code id_token","id_token token"],"scopes_supported":["openid","profile","email","offline_access"],"issuer":"https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/v2.0","request_uri_parameter_supported":false,"userinfo_endpoint":"https://graph.microsoft.com/oidc/userinfo","authorization_endpoint":"https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/oauth2/v2.0/authorize","device_authorization_endpoint":"https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/oauth2/v2.0/devicecode","http_logout_supported":true,"frontchannel_logout_supported":true,"end_session_endpoint":"https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/oauth2/v2.0/logout","claims_supported":["sub","iss","cloud_instance_name","cloud_instance_host_name","cloud_graph_host_name","msgraph_host","aud","exp","iat","auth_time","acr","nonce","preferred_username","name","tid","ver","at_hash","c_hash","email"],"kerberos_endpoint":"https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/kerberos","tenant_region_scope":"WW","cloud_instance_name":"microsoftonline.com","cloud_graph_host_name":"graph.windows.net","msgraph_host":"graph.microsoft.com","rbac_url":"https://pas.windows.net"}, [
  'Cache-Control',
  'max-age=86400, private',
  'Content-Length',
  '1753',
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
  '00c55a65-3566-407f-928d-27bafb1e1c01',
  'x-ms-ests-server',
  '2.1.12025.15 - EUS ProdSlices',
  'Set-Cookie',
  'fpc=As-bytXHgKBGuqxmsjJnlt4; expires=Wed, 13-Oct-2021 19:24:15 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevr4ZIdG7pD-4Wv4Y2xNPCEAIug4fGVZzr0XzRHzas9foOgoFJKTqC_eACfUmO8FX_T-LskxUjzOk-JnxDfNppyaG29DYCPF3up85OslS_h0RQ_4sorn1V0_rs4jk77W14qM5JtlS9Y4DNLLKE4UEsZG3phP95zZ1c4JLlgUG-zSEAgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Mon, 13 Sep 2021 19:24:14 GMT'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/12345678-1234-1234-1234-123456789012/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.3.0&x-client-OS=linux&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=70965b19-4d84-4808-9ea3-7a15089aea93&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22CP1%22%5D%7D%7D%7D")
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
  '8c5e8880-3b54-49cf-a0fa-4dc38e260101',
  'x-ms-ests-server',
  '2.1.12025.15 - EUS ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=AjBVoOQUvI9Ih2PR81IMhHobdhqxAQAAAF6c0dgOAAAA; expires=Wed, 13-Oct-2021 19:24:15 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Mon, 13 Sep 2021 19:24:15 GMT',
  'Content-Length',
  '1315'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/certificates/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-0/create', {"policy":{"key_props":{},"secret_props":{},"x509_props":{"subject":"cn=MyCert","sans":{}},"issuer":{"name":"Self"},"attributes":{}},"attributes":{}})
  .query(true)
  .reply(202, {"id":"https://keyvault_name.vault.azure.net/certificates/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAo6RsyL0ER8zRVYmwsGf7WuwGC00NUq8ihlK7p9jEwsJ66hPR2d+wQaRAq5aJeXjDFMcuVH/40NAebF3UDqZtjJZ+PHx+adoFd14BnTcSip9Bwzq4ICnce7nAZXl9gUndP88amRoh0hNJsrGd0FmEC5BrO3bP5MPQUmtYqcCfUHFxzNQwxMA7tORjQu44zBW8uLfBFz2OpvhUSDr4WNvR7aNOgm9+hlrKGBDRnysXI7JpNtTZ4cF2dajz+FjyW9iqhvGBaKN8wHwCb29qqyAT4nY4wTRJKHmCdXU1hDacHzoTER30Gt9PwHLitaAP4RpRGfW0UoqleteiQ7ul7T2DbQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAB2TZP6jRL7se4d/2lc2oi2I8IXYXB0YUC0cMpLdmPus0RXtGniApZKdiX7fB26xqklRocdDfLXc3wOZdadW6CLQPNLuNwFFY4kA4ZzDSWn8Y9gSbrwQo/W1J5BRxybegbLhEy36cFLUQ7h0NGx9icVF0y7eanhKTybWN5Ngae7O2S2D2Vr1LCxC8RKNwqDSVwXgjb/H4O/C+tkr7zkJ9UvxgOB4yDz8ijtH92/0v18DHwh2iQsiiFFMYefuqo/yCTRw7UqwUpwjlI9z6mZySnU8RXZsqYaVINSeVcqIm5NJVIyumHBo58hlE/rlNqHbaNGQwH12ExBE5K4v73iuAUs=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"d28c7ea84d114f7294b8b9d4e48fe2f5"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://keyvault_name.vault.azure.net/certificates/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-0/pending?api-version=7.2&request_id=d28c7ea84d114f7294b8b9d4e48fe2f5',
  'Retry-After',
  '0',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '87572551-cc7c-4a6f-8dfb-bc3e6f769201',
  'x-ms-request-id',
  '8306cb32-1160-42d9-8d07-2e682fad2428',
  'x-ms-keyvault-service-version',
  '1.9.79.2',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.250.57.79;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 13 Sep 2021 19:24:15 GMT',
  'Content-Length',
  '1366'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAo6RsyL0ER8zRVYmwsGf7WuwGC00NUq8ihlK7p9jEwsJ66hPR2d+wQaRAq5aJeXjDFMcuVH/40NAebF3UDqZtjJZ+PHx+adoFd14BnTcSip9Bwzq4ICnce7nAZXl9gUndP88amRoh0hNJsrGd0FmEC5BrO3bP5MPQUmtYqcCfUHFxzNQwxMA7tORjQu44zBW8uLfBFz2OpvhUSDr4WNvR7aNOgm9+hlrKGBDRnysXI7JpNtTZ4cF2dajz+FjyW9iqhvGBaKN8wHwCb29qqyAT4nY4wTRJKHmCdXU1hDacHzoTER30Gt9PwHLitaAP4RpRGfW0UoqleteiQ7ul7T2DbQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAB2TZP6jRL7se4d/2lc2oi2I8IXYXB0YUC0cMpLdmPus0RXtGniApZKdiX7fB26xqklRocdDfLXc3wOZdadW6CLQPNLuNwFFY4kA4ZzDSWn8Y9gSbrwQo/W1J5BRxybegbLhEy36cFLUQ7h0NGx9icVF0y7eanhKTybWN5Ngae7O2S2D2Vr1LCxC8RKNwqDSVwXgjb/H4O/C+tkr7zkJ9UvxgOB4yDz8ijtH92/0v18DHwh2iQsiiFFMYefuqo/yCTRw7UqwUpwjlI9z6mZySnU8RXZsqYaVINSeVcqIm5NJVIyumHBo58hlE/rlNqHbaNGQwH12ExBE5K4v73iuAUs=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"d28c7ea84d114f7294b8b9d4e48fe2f5"}, [
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
  '7c2eee17-eb3e-4dbf-be86-35d27d1d7bbb',
  'x-ms-request-id',
  '7e932192-8c7b-4782-b208-fbc89f9d25a3',
  'x-ms-keyvault-service-version',
  '1.9.79.2',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.250.57.79;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 13 Sep 2021 19:24:15 GMT',
  'Content-Length',
  '1366'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAo6RsyL0ER8zRVYmwsGf7WuwGC00NUq8ihlK7p9jEwsJ66hPR2d+wQaRAq5aJeXjDFMcuVH/40NAebF3UDqZtjJZ+PHx+adoFd14BnTcSip9Bwzq4ICnce7nAZXl9gUndP88amRoh0hNJsrGd0FmEC5BrO3bP5MPQUmtYqcCfUHFxzNQwxMA7tORjQu44zBW8uLfBFz2OpvhUSDr4WNvR7aNOgm9+hlrKGBDRnysXI7JpNtTZ4cF2dajz+FjyW9iqhvGBaKN8wHwCb29qqyAT4nY4wTRJKHmCdXU1hDacHzoTER30Gt9PwHLitaAP4RpRGfW0UoqleteiQ7ul7T2DbQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAB2TZP6jRL7se4d/2lc2oi2I8IXYXB0YUC0cMpLdmPus0RXtGniApZKdiX7fB26xqklRocdDfLXc3wOZdadW6CLQPNLuNwFFY4kA4ZzDSWn8Y9gSbrwQo/W1J5BRxybegbLhEy36cFLUQ7h0NGx9icVF0y7eanhKTybWN5Ngae7O2S2D2Vr1LCxC8RKNwqDSVwXgjb/H4O/C+tkr7zkJ9UvxgOB4yDz8ijtH92/0v18DHwh2iQsiiFFMYefuqo/yCTRw7UqwUpwjlI9z6mZySnU8RXZsqYaVINSeVcqIm5NJVIyumHBo58hlE/rlNqHbaNGQwH12ExBE5K4v73iuAUs=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"d28c7ea84d114f7294b8b9d4e48fe2f5"}, [
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
  '73c32b1f-34e8-4ecd-a106-c8cc1994bf4a',
  'x-ms-request-id',
  '3e3c0f22-5379-43e7-98ef-2e1cf5e37b10',
  'x-ms-keyvault-service-version',
  '1.9.79.2',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.250.57.79;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 13 Sep 2021 19:24:15 GMT',
  'Content-Length',
  '1366'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAo6RsyL0ER8zRVYmwsGf7WuwGC00NUq8ihlK7p9jEwsJ66hPR2d+wQaRAq5aJeXjDFMcuVH/40NAebF3UDqZtjJZ+PHx+adoFd14BnTcSip9Bwzq4ICnce7nAZXl9gUndP88amRoh0hNJsrGd0FmEC5BrO3bP5MPQUmtYqcCfUHFxzNQwxMA7tORjQu44zBW8uLfBFz2OpvhUSDr4WNvR7aNOgm9+hlrKGBDRnysXI7JpNtTZ4cF2dajz+FjyW9iqhvGBaKN8wHwCb29qqyAT4nY4wTRJKHmCdXU1hDacHzoTER30Gt9PwHLitaAP4RpRGfW0UoqleteiQ7ul7T2DbQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAB2TZP6jRL7se4d/2lc2oi2I8IXYXB0YUC0cMpLdmPus0RXtGniApZKdiX7fB26xqklRocdDfLXc3wOZdadW6CLQPNLuNwFFY4kA4ZzDSWn8Y9gSbrwQo/W1J5BRxybegbLhEy36cFLUQ7h0NGx9icVF0y7eanhKTybWN5Ngae7O2S2D2Vr1LCxC8RKNwqDSVwXgjb/H4O/C+tkr7zkJ9UvxgOB4yDz8ijtH92/0v18DHwh2iQsiiFFMYefuqo/yCTRw7UqwUpwjlI9z6mZySnU8RXZsqYaVINSeVcqIm5NJVIyumHBo58hlE/rlNqHbaNGQwH12ExBE5K4v73iuAUs=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"d28c7ea84d114f7294b8b9d4e48fe2f5"}, [
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
  '4c012cad-cf05-4d40-a362-72884a57cd47',
  'x-ms-request-id',
  '02cc78d3-034e-4c2d-89e4-af629b632fe7',
  'x-ms-keyvault-service-version',
  '1.9.79.2',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.250.57.79;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 13 Sep 2021 19:24:18 GMT',
  'Content-Length',
  '1366'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAo6RsyL0ER8zRVYmwsGf7WuwGC00NUq8ihlK7p9jEwsJ66hPR2d+wQaRAq5aJeXjDFMcuVH/40NAebF3UDqZtjJZ+PHx+adoFd14BnTcSip9Bwzq4ICnce7nAZXl9gUndP88amRoh0hNJsrGd0FmEC5BrO3bP5MPQUmtYqcCfUHFxzNQwxMA7tORjQu44zBW8uLfBFz2OpvhUSDr4WNvR7aNOgm9+hlrKGBDRnysXI7JpNtTZ4cF2dajz+FjyW9iqhvGBaKN8wHwCb29qqyAT4nY4wTRJKHmCdXU1hDacHzoTER30Gt9PwHLitaAP4RpRGfW0UoqleteiQ7ul7T2DbQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAB2TZP6jRL7se4d/2lc2oi2I8IXYXB0YUC0cMpLdmPus0RXtGniApZKdiX7fB26xqklRocdDfLXc3wOZdadW6CLQPNLuNwFFY4kA4ZzDSWn8Y9gSbrwQo/W1J5BRxybegbLhEy36cFLUQ7h0NGx9icVF0y7eanhKTybWN5Ngae7O2S2D2Vr1LCxC8RKNwqDSVwXgjb/H4O/C+tkr7zkJ9UvxgOB4yDz8ijtH92/0v18DHwh2iQsiiFFMYefuqo/yCTRw7UqwUpwjlI9z6mZySnU8RXZsqYaVINSeVcqIm5NJVIyumHBo58hlE/rlNqHbaNGQwH12ExBE5K4v73iuAUs=","cancellation_requested":false,"status":"completed","target":"https://keyvault_name.vault.azure.net/certificates/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-0","request_id":"d28c7ea84d114f7294b8b9d4e48fe2f5"}, [
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
  'e584bc54-02ce-4bd4-84a1-d90d2844ebe8',
  'x-ms-request-id',
  'eb52143c-9f9e-4aeb-a3d7-c9562c256348',
  'x-ms-keyvault-service-version',
  '1.9.79.2',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.250.57.79;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 13 Sep 2021 19:24:20 GMT',
  'Content-Length',
  '1359'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-0/')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-0/4fb3b4001e1c4c90b8e70d9d315215c9","kid":"https://keyvault_name.vault.azure.net/keys/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-0/4fb3b4001e1c4c90b8e70d9d315215c9","sid":"https://keyvault_name.vault.azure.net/secrets/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-0/4fb3b4001e1c4c90b8e70d9d315215c9","x5t":"2VbobgumulLRMBX_3Ib-lTZJNgY","cer":"MIIDKDCCAhCgAwIBAgIQA8najpAuTauo296stR/MMjANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjEwOTEzMTkxNDE5WhcNMjIwOTEzMTkyNDE5WjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQCjpGzIvQRHzNFVibCwZ/ta7AYLTQ1SryKGUrun2MTCwnrqE9HZ37BBpECrlol5eMMUxy5Uf/jQ0B5sXdQOpm2Mln48fH5p2gV3XgGdNxKKn0HDOrggKdx7ucBleX2BSd0/zxqZGiHSE0mysZ3QWYQLkGs7ds/kw9BSa1ipwJ9QcXHM1DDEwDu05GNC7jjMFby4t8EXPY6m+FRIOvhY29Hto06Cb36GWsoYENGfKxcjsmk21NnhwXZ1qPP4WPJb2KqG8YFoo3zAfAJvb2qrIBPidjjBNEkoeYJ1dTWENpwfOhMRHfQa30/AcuK1oA/hGlEZ9bRSiqV616JDu6XtPYNtAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBQIUujzC3kIIiexDLDZ7vKqEiWebjAdBgNVHQ4EFgQUCFLo8wt5CCInsQyw2e7yqhIlnm4wDQYJKoZIhvcNAQELBQADggEBADXxKxvChTGrw78I+lgjTcz4inDOiHELPx4Wc+7ex/De+x/BAsMhkLPk7YtPNoewe542Kjmd0K2ACEzNJ3I6sq3MI4D1/Fwnci5TesoD653Dlk5bzA+tRO8QizJhiJ0CD7Q8aXZ6239NCyB3ZwJAFhkObj70hKtgVx+wsFSKSBx7ET0OvvkWcfSFZbDCvix0NXXEtndvJlQRWzYue9dqxvlR02Mz8OuIeVsAgjzcopqF/60J/OTc9riJzUMf/n4XaDRDorTeYkfxJeL+IKfUykhVVwCp9dqCXuO5qydUFlReHrgeJtuhcDff1n2d/sjQl9ARoUZ94r34JwPOCShzWeA=","attributes":{"enabled":true,"nbf":1631560459,"exp":1663097059,"created":1631561059,"updated":1631561059,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-0/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1631561055,"updated":1631561055}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-0/pending"}}, [
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
  '2ef32df5-b4e3-47cc-8ba3-0dc48debcdbd',
  'x-ms-request-id',
  '732a7629-5bc9-424b-913c-6bcd07202985',
  'x-ms-keyvault-service-version',
  '1.9.79.2',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.250.57.79;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 13 Sep 2021 19:24:20 GMT',
  'Content-Length',
  '2720'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/secrets/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-0/')
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
  'eastus',
  'x-ms-client-request-id',
  'f0ea0fa7-d86a-4808-af0f-b48aae7e5346',
  'x-ms-request-id',
  'a27ef946-901f-48bc-940b-e3aeef051d07',
  'x-ms-keyvault-service-version',
  '1.9.79.2',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.250.57.79;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 13 Sep 2021 19:24:20 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/secrets/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-0/')
  .query(true)
  .reply(200, {"value":"YmFzZTY0X3BsYWNlaG9sZGVy","contentType":"application/x-pkcs12","id":"https://keyvault_name.vault.azure.net/secrets/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-0/4fb3b4001e1c4c90b8e70d9d315215c9","managed":true,"attributes":{"enabled":true,"nbf":1631560459,"exp":1663097059,"created":1631561059,"updated":1631561059,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90},"kid":"https://keyvault_name.vault.azure.net/keys/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-0/4fb3b4001e1c4c90b8e70d9d315215c9"}, [
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
  'f0ea0fa7-d86a-4808-af0f-b48aae7e5346',
  'x-ms-request-id',
  '686146ee-c1df-449e-b07d-6df2d436f561',
  'x-ms-keyvault-service-version',
  '1.9.79.2',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.250.57.79;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 13 Sep 2021 19:24:20 GMT',
  'Content-Length',
  '4089'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/certificates/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-1/import', {"value":"YmFzZTY0X3BsYWNlaG9sZGVy"})
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-1/7f71a0eaad434a259632842267a4a87f","kid":"https://keyvault_name.vault.azure.net/keys/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-1/7f71a0eaad434a259632842267a4a87f","sid":"https://keyvault_name.vault.azure.net/secrets/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-1/7f71a0eaad434a259632842267a4a87f","x5t":"2VbobgumulLRMBX_3Ib-lTZJNgY","cer":"MIIDKDCCAhCgAwIBAgIQA8najpAuTauo296stR/MMjANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjEwOTEzMTkxNDE5WhcNMjIwOTEzMTkyNDE5WjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQCjpGzIvQRHzNFVibCwZ/ta7AYLTQ1SryKGUrun2MTCwnrqE9HZ37BBpECrlol5eMMUxy5Uf/jQ0B5sXdQOpm2Mln48fH5p2gV3XgGdNxKKn0HDOrggKdx7ucBleX2BSd0/zxqZGiHSE0mysZ3QWYQLkGs7ds/kw9BSa1ipwJ9QcXHM1DDEwDu05GNC7jjMFby4t8EXPY6m+FRIOvhY29Hto06Cb36GWsoYENGfKxcjsmk21NnhwXZ1qPP4WPJb2KqG8YFoo3zAfAJvb2qrIBPidjjBNEkoeYJ1dTWENpwfOhMRHfQa30/AcuK1oA/hGlEZ9bRSiqV616JDu6XtPYNtAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBQIUujzC3kIIiexDLDZ7vKqEiWebjAdBgNVHQ4EFgQUCFLo8wt5CCInsQyw2e7yqhIlnm4wDQYJKoZIhvcNAQELBQADggEBADXxKxvChTGrw78I+lgjTcz4inDOiHELPx4Wc+7ex/De+x/BAsMhkLPk7YtPNoewe542Kjmd0K2ACEzNJ3I6sq3MI4D1/Fwnci5TesoD653Dlk5bzA+tRO8QizJhiJ0CD7Q8aXZ6239NCyB3ZwJAFhkObj70hKtgVx+wsFSKSBx7ET0OvvkWcfSFZbDCvix0NXXEtndvJlQRWzYue9dqxvlR02Mz8OuIeVsAgjzcopqF/60J/OTc9riJzUMf/n4XaDRDorTeYkfxJeL+IKfUykhVVwCp9dqCXuO5qydUFlReHrgeJtuhcDff1n2d/sjQl9ARoUZ94r34JwPOCShzWeA=","attributes":{"enabled":true,"nbf":1631560459,"exp":1663097059,"created":1631561060,"updated":1631561060,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-1/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"CN=MyCert","ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":13,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"EmailContacts"}}],"issuer":{"name":"Unknown"},"attributes":{"enabled":true,"created":1631561060,"updated":1631561060}}}, [
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
  '66e4099c-b34f-4195-9ec3-9d95367f4e5c',
  'x-ms-request-id',
  '5a06b778-2350-4a5a-9748-4fd95cf5e625',
  'x-ms-keyvault-service-version',
  '1.9.79.2',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.250.57.79;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 13 Sep 2021 19:24:20 GMT',
  'Content-Length',
  '2543'
]);

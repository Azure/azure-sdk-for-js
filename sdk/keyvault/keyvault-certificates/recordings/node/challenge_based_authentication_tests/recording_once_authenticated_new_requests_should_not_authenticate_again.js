let nock = require('nock');

module.exports.hash = "c7be8fd8843b9e9838652a8cf6be155e";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0/create')
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
  '1f23d91c-40eb-4b50-a8f1-c164b720acf0',
  'x-ms-request-id',
  'aaec1d0f-745d-4b8f-a3ff-2729cd26f43d',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:28:09 GMT'
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
  '563a1888-d30a-41bc-b107-03674ac14f01',
  'x-ms-ests-server',
  '2.1.11654.16 - EUS ProdSlices',
  'Set-Cookie',
  'fpc=Aip9r52J29tElGir6pFMwgnmR1YbAQAAAKDXG9gOAAAA; expires=Fri, 28-May-2021 22:28:09 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrLIhyWNtFOIIJj92jG6rAkPZGSB7l-6zrW0QAhGf_jan0zVq8UzSu6Vj9c1_C63IT4OL2hacc9lEA7ZRBBuKjcFaAg9THSTN4swhQDsP_pbsyjP7BFS2GcC4wNEjKu5nFHiJxtvuDUDhhX8FggRMekWkcPIGGaDxx_7UpwMi_goAgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 28 Apr 2021 22:28:09 GMT',
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
  'd62a9d98-dda8-4974-b0cd-baeeace41001',
  'x-ms-ests-server',
  '2.1.11654.16 - EUS ProdSlices',
  'Set-Cookie',
  'fpc=Aip9r52J29tElGir6pFMwgnmR1YbAQAAAKDXG9gOAAAA; expires=Fri, 28-May-2021 22:28:09 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevrq0p_ou8dX8FvuZFWZfgNHDMUr9vtDQ7lUrRAYT-FOZ6NZAto984R6bxbuH-eCmXq5Iw2f-UE2OGGMGl_O8YtYdvsSBH7RENxlUVecvuLNz8qzSWB915AKgzE9rwu-Ygz5vfp9uvjtkduTfid1Id6jUIJHV8mshiWM7fYqZSB1H4gAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 28 Apr 2021 22:28:09 GMT',
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
  '31061063-f98b-4365-a7d0-37a79ee36a00',
  'x-ms-ests-server',
  '2.1.11654.16 - WUS2 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=Aip9r52J29tElGir6pFMwgnmR1YbAgAAAKDXG9gOAAAA; expires=Fri, 28-May-2021 22:28:09 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 28 Apr 2021 22:28:09 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0/create', {"policy":{"key_props":{},"secret_props":{},"x509_props":{"subject":"cn=MyCert","sans":{}},"issuer":{"name":"Self"},"attributes":{}},"attributes":{}})
  .query(true)
  .reply(202, {"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAmKZ45I6QalllaFaQzcQKbu2V/i9T/4cBXGKCU/QN2uyMhgXVMGvkTD07nPLwJ0bqURDIYBUhr88pPuJiBXbEgu+hhZyK02P3R9YwpNAqOjF+Zv1CH9q/Kx9SP48NMm56fzsLsed8Ee5F89Fn6cCEzU507/8onkK/qK9k0qj6/gqZ5KerLRLbnhGuDZ+gqRdpUL3hsyqDiKVRATtU91jKniOueBlb70/MA/TsUgIkls5SxrfW2HWP4Ou2p7PWE8rNx15K6WwpuvNP0whMqAdmKUJQ13jg7AF/TGIZE/WBALk5gPAq4oYoWpCvNdHnRLT8xZITIFKL/eJYBxo4HU8FPQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAAoOZTcw+JP6eYGWmTw9Iw6KG5dd0TWjXDl5wvEr/tRI5hJgcuKkAA/c24UDr+sxoRDXWaelbUZFgRY1HOv3GH9DML74F5V4O/CqlFxmNBdLVYoEJfJwombioFV8m2KrOYT0xx2LCpM83e/Q0wr+znUyQU0RuoyUvtLO+MdXsYmSEzKVItOZJVqVB5HQ5L/4/7hbAH+joOgkKoC3p+rK5edTV3v31h0J2VygfNon6oJZckvZmFVQBhlG6/j11+WZ9piPu4BsEUJmfVM+CV1AgTg3TVRcusP0f4ErtlM5sT9mv6Uzm03MawGRkrxw0h1Kf3cZXCCZXRUcOWgLoNeu7TU=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"5d5cdd876f1d47099001572377ecce2a"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0/pending?api-version=7.2&request_id=5d5cdd876f1d47099001572377ecce2a',
  'Retry-After',
  '0',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '1f23d91c-40eb-4b50-a8f1-c164b720acf0',
  'x-ms-request-id',
  '27502cdb-7361-4400-b973-ee50e0645382',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:28:10 GMT',
  'Content-Length',
  '1379'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAmKZ45I6QalllaFaQzcQKbu2V/i9T/4cBXGKCU/QN2uyMhgXVMGvkTD07nPLwJ0bqURDIYBUhr88pPuJiBXbEgu+hhZyK02P3R9YwpNAqOjF+Zv1CH9q/Kx9SP48NMm56fzsLsed8Ee5F89Fn6cCEzU507/8onkK/qK9k0qj6/gqZ5KerLRLbnhGuDZ+gqRdpUL3hsyqDiKVRATtU91jKniOueBlb70/MA/TsUgIkls5SxrfW2HWP4Ou2p7PWE8rNx15K6WwpuvNP0whMqAdmKUJQ13jg7AF/TGIZE/WBALk5gPAq4oYoWpCvNdHnRLT8xZITIFKL/eJYBxo4HU8FPQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAAoOZTcw+JP6eYGWmTw9Iw6KG5dd0TWjXDl5wvEr/tRI5hJgcuKkAA/c24UDr+sxoRDXWaelbUZFgRY1HOv3GH9DML74F5V4O/CqlFxmNBdLVYoEJfJwombioFV8m2KrOYT0xx2LCpM83e/Q0wr+znUyQU0RuoyUvtLO+MdXsYmSEzKVItOZJVqVB5HQ5L/4/7hbAH+joOgkKoC3p+rK5edTV3v31h0J2VygfNon6oJZckvZmFVQBhlG6/j11+WZ9piPu4BsEUJmfVM+CV1AgTg3TVRcusP0f4ErtlM5sT9mv6Uzm03MawGRkrxw0h1Kf3cZXCCZXRUcOWgLoNeu7TU=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"5d5cdd876f1d47099001572377ecce2a"}, [
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
  '19045b28-90d6-4120-8e67-f2fbbb09cefd',
  'x-ms-request-id',
  'd24f98c9-de95-4ab8-9226-978c0362b9e8',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:28:10 GMT',
  'Content-Length',
  '1379'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAmKZ45I6QalllaFaQzcQKbu2V/i9T/4cBXGKCU/QN2uyMhgXVMGvkTD07nPLwJ0bqURDIYBUhr88pPuJiBXbEgu+hhZyK02P3R9YwpNAqOjF+Zv1CH9q/Kx9SP48NMm56fzsLsed8Ee5F89Fn6cCEzU507/8onkK/qK9k0qj6/gqZ5KerLRLbnhGuDZ+gqRdpUL3hsyqDiKVRATtU91jKniOueBlb70/MA/TsUgIkls5SxrfW2HWP4Ou2p7PWE8rNx15K6WwpuvNP0whMqAdmKUJQ13jg7AF/TGIZE/WBALk5gPAq4oYoWpCvNdHnRLT8xZITIFKL/eJYBxo4HU8FPQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAAoOZTcw+JP6eYGWmTw9Iw6KG5dd0TWjXDl5wvEr/tRI5hJgcuKkAA/c24UDr+sxoRDXWaelbUZFgRY1HOv3GH9DML74F5V4O/CqlFxmNBdLVYoEJfJwombioFV8m2KrOYT0xx2LCpM83e/Q0wr+znUyQU0RuoyUvtLO+MdXsYmSEzKVItOZJVqVB5HQ5L/4/7hbAH+joOgkKoC3p+rK5edTV3v31h0J2VygfNon6oJZckvZmFVQBhlG6/j11+WZ9piPu4BsEUJmfVM+CV1AgTg3TVRcusP0f4ErtlM5sT9mv6Uzm03MawGRkrxw0h1Kf3cZXCCZXRUcOWgLoNeu7TU=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"5d5cdd876f1d47099001572377ecce2a"}, [
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
  'f3d86d7d-ca0c-4bef-abab-786de12bc560',
  'x-ms-request-id',
  'ab90655a-8ac6-4b21-9968-27a83381ec50',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:28:10 GMT',
  'Content-Length',
  '1379'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAmKZ45I6QalllaFaQzcQKbu2V/i9T/4cBXGKCU/QN2uyMhgXVMGvkTD07nPLwJ0bqURDIYBUhr88pPuJiBXbEgu+hhZyK02P3R9YwpNAqOjF+Zv1CH9q/Kx9SP48NMm56fzsLsed8Ee5F89Fn6cCEzU507/8onkK/qK9k0qj6/gqZ5KerLRLbnhGuDZ+gqRdpUL3hsyqDiKVRATtU91jKniOueBlb70/MA/TsUgIkls5SxrfW2HWP4Ou2p7PWE8rNx15K6WwpuvNP0whMqAdmKUJQ13jg7AF/TGIZE/WBALk5gPAq4oYoWpCvNdHnRLT8xZITIFKL/eJYBxo4HU8FPQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAAoOZTcw+JP6eYGWmTw9Iw6KG5dd0TWjXDl5wvEr/tRI5hJgcuKkAA/c24UDr+sxoRDXWaelbUZFgRY1HOv3GH9DML74F5V4O/CqlFxmNBdLVYoEJfJwombioFV8m2KrOYT0xx2LCpM83e/Q0wr+znUyQU0RuoyUvtLO+MdXsYmSEzKVItOZJVqVB5HQ5L/4/7hbAH+joOgkKoC3p+rK5edTV3v31h0J2VygfNon6oJZckvZmFVQBhlG6/j11+WZ9piPu4BsEUJmfVM+CV1AgTg3TVRcusP0f4ErtlM5sT9mv6Uzm03MawGRkrxw0h1Kf3cZXCCZXRUcOWgLoNeu7TU=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"5d5cdd876f1d47099001572377ecce2a"}, [
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
  '5337a371-9f20-4b67-b862-f7fc9b2565ab',
  'x-ms-request-id',
  '88fc700f-5a03-4848-ab49-a3b183c10fd1',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:28:12 GMT',
  'Content-Length',
  '1379'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAmKZ45I6QalllaFaQzcQKbu2V/i9T/4cBXGKCU/QN2uyMhgXVMGvkTD07nPLwJ0bqURDIYBUhr88pPuJiBXbEgu+hhZyK02P3R9YwpNAqOjF+Zv1CH9q/Kx9SP48NMm56fzsLsed8Ee5F89Fn6cCEzU507/8onkK/qK9k0qj6/gqZ5KerLRLbnhGuDZ+gqRdpUL3hsyqDiKVRATtU91jKniOueBlb70/MA/TsUgIkls5SxrfW2HWP4Ou2p7PWE8rNx15K6WwpuvNP0whMqAdmKUJQ13jg7AF/TGIZE/WBALk5gPAq4oYoWpCvNdHnRLT8xZITIFKL/eJYBxo4HU8FPQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAAoOZTcw+JP6eYGWmTw9Iw6KG5dd0TWjXDl5wvEr/tRI5hJgcuKkAA/c24UDr+sxoRDXWaelbUZFgRY1HOv3GH9DML74F5V4O/CqlFxmNBdLVYoEJfJwombioFV8m2KrOYT0xx2LCpM83e/Q0wr+znUyQU0RuoyUvtLO+MdXsYmSEzKVItOZJVqVB5HQ5L/4/7hbAH+joOgkKoC3p+rK5edTV3v31h0J2VygfNon6oJZckvZmFVQBhlG6/j11+WZ9piPu4BsEUJmfVM+CV1AgTg3TVRcusP0f4ErtlM5sT9mv6Uzm03MawGRkrxw0h1Kf3cZXCCZXRUcOWgLoNeu7TU=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"5d5cdd876f1d47099001572377ecce2a"}, [
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
  'cb8cd853-8978-4099-9c03-7aabcbe56b3b',
  'x-ms-request-id',
  '868935f7-7c65-4181-b814-1df98650d7ec',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:28:14 GMT',
  'Content-Length',
  '1379'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAmKZ45I6QalllaFaQzcQKbu2V/i9T/4cBXGKCU/QN2uyMhgXVMGvkTD07nPLwJ0bqURDIYBUhr88pPuJiBXbEgu+hhZyK02P3R9YwpNAqOjF+Zv1CH9q/Kx9SP48NMm56fzsLsed8Ee5F89Fn6cCEzU507/8onkK/qK9k0qj6/gqZ5KerLRLbnhGuDZ+gqRdpUL3hsyqDiKVRATtU91jKniOueBlb70/MA/TsUgIkls5SxrfW2HWP4Ou2p7PWE8rNx15K6WwpuvNP0whMqAdmKUJQ13jg7AF/TGIZE/WBALk5gPAq4oYoWpCvNdHnRLT8xZITIFKL/eJYBxo4HU8FPQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAAoOZTcw+JP6eYGWmTw9Iw6KG5dd0TWjXDl5wvEr/tRI5hJgcuKkAA/c24UDr+sxoRDXWaelbUZFgRY1HOv3GH9DML74F5V4O/CqlFxmNBdLVYoEJfJwombioFV8m2KrOYT0xx2LCpM83e/Q0wr+znUyQU0RuoyUvtLO+MdXsYmSEzKVItOZJVqVB5HQ5L/4/7hbAH+joOgkKoC3p+rK5edTV3v31h0J2VygfNon6oJZckvZmFVQBhlG6/j11+WZ9piPu4BsEUJmfVM+CV1AgTg3TVRcusP0f4ErtlM5sT9mv6Uzm03MawGRkrxw0h1Kf3cZXCCZXRUcOWgLoNeu7TU=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"5d5cdd876f1d47099001572377ecce2a"}, [
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
  'fd293f3f-e9b3-4dd7-809c-e2d4f4ee2021',
  'x-ms-request-id',
  'fc11a547-b692-4e23-bca3-17a545bb4b82',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:28:16 GMT',
  'Content-Length',
  '1379'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAmKZ45I6QalllaFaQzcQKbu2V/i9T/4cBXGKCU/QN2uyMhgXVMGvkTD07nPLwJ0bqURDIYBUhr88pPuJiBXbEgu+hhZyK02P3R9YwpNAqOjF+Zv1CH9q/Kx9SP48NMm56fzsLsed8Ee5F89Fn6cCEzU507/8onkK/qK9k0qj6/gqZ5KerLRLbnhGuDZ+gqRdpUL3hsyqDiKVRATtU91jKniOueBlb70/MA/TsUgIkls5SxrfW2HWP4Ou2p7PWE8rNx15K6WwpuvNP0whMqAdmKUJQ13jg7AF/TGIZE/WBALk5gPAq4oYoWpCvNdHnRLT8xZITIFKL/eJYBxo4HU8FPQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAAoOZTcw+JP6eYGWmTw9Iw6KG5dd0TWjXDl5wvEr/tRI5hJgcuKkAA/c24UDr+sxoRDXWaelbUZFgRY1HOv3GH9DML74F5V4O/CqlFxmNBdLVYoEJfJwombioFV8m2KrOYT0xx2LCpM83e/Q0wr+znUyQU0RuoyUvtLO+MdXsYmSEzKVItOZJVqVB5HQ5L/4/7hbAH+joOgkKoC3p+rK5edTV3v31h0J2VygfNon6oJZckvZmFVQBhlG6/j11+WZ9piPu4BsEUJmfVM+CV1AgTg3TVRcusP0f4ErtlM5sT9mv6Uzm03MawGRkrxw0h1Kf3cZXCCZXRUcOWgLoNeu7TU=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"5d5cdd876f1d47099001572377ecce2a"}, [
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
  '2c5e8e39-a864-4fe3-8517-01bdd42fcf6d',
  'x-ms-request-id',
  '546f19b7-0e19-4739-9f5a-f0d28197e9df',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:28:18 GMT',
  'Content-Length',
  '1379'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAmKZ45I6QalllaFaQzcQKbu2V/i9T/4cBXGKCU/QN2uyMhgXVMGvkTD07nPLwJ0bqURDIYBUhr88pPuJiBXbEgu+hhZyK02P3R9YwpNAqOjF+Zv1CH9q/Kx9SP48NMm56fzsLsed8Ee5F89Fn6cCEzU507/8onkK/qK9k0qj6/gqZ5KerLRLbnhGuDZ+gqRdpUL3hsyqDiKVRATtU91jKniOueBlb70/MA/TsUgIkls5SxrfW2HWP4Ou2p7PWE8rNx15K6WwpuvNP0whMqAdmKUJQ13jg7AF/TGIZE/WBALk5gPAq4oYoWpCvNdHnRLT8xZITIFKL/eJYBxo4HU8FPQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAAoOZTcw+JP6eYGWmTw9Iw6KG5dd0TWjXDl5wvEr/tRI5hJgcuKkAA/c24UDr+sxoRDXWaelbUZFgRY1HOv3GH9DML74F5V4O/CqlFxmNBdLVYoEJfJwombioFV8m2KrOYT0xx2LCpM83e/Q0wr+znUyQU0RuoyUvtLO+MdXsYmSEzKVItOZJVqVB5HQ5L/4/7hbAH+joOgkKoC3p+rK5edTV3v31h0J2VygfNon6oJZckvZmFVQBhlG6/j11+WZ9piPu4BsEUJmfVM+CV1AgTg3TVRcusP0f4ErtlM5sT9mv6Uzm03MawGRkrxw0h1Kf3cZXCCZXRUcOWgLoNeu7TU=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"5d5cdd876f1d47099001572377ecce2a"}, [
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
  'b164d916-8386-4176-bfd1-10f697123ada',
  'x-ms-request-id',
  '033caf12-1e44-4f55-a04d-dae9b2f504e2',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:28:21 GMT',
  'Content-Length',
  '1379'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAmKZ45I6QalllaFaQzcQKbu2V/i9T/4cBXGKCU/QN2uyMhgXVMGvkTD07nPLwJ0bqURDIYBUhr88pPuJiBXbEgu+hhZyK02P3R9YwpNAqOjF+Zv1CH9q/Kx9SP48NMm56fzsLsed8Ee5F89Fn6cCEzU507/8onkK/qK9k0qj6/gqZ5KerLRLbnhGuDZ+gqRdpUL3hsyqDiKVRATtU91jKniOueBlb70/MA/TsUgIkls5SxrfW2HWP4Ou2p7PWE8rNx15K6WwpuvNP0whMqAdmKUJQ13jg7AF/TGIZE/WBALk5gPAq4oYoWpCvNdHnRLT8xZITIFKL/eJYBxo4HU8FPQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAAoOZTcw+JP6eYGWmTw9Iw6KG5dd0TWjXDl5wvEr/tRI5hJgcuKkAA/c24UDr+sxoRDXWaelbUZFgRY1HOv3GH9DML74F5V4O/CqlFxmNBdLVYoEJfJwombioFV8m2KrOYT0xx2LCpM83e/Q0wr+znUyQU0RuoyUvtLO+MdXsYmSEzKVItOZJVqVB5HQ5L/4/7hbAH+joOgkKoC3p+rK5edTV3v31h0J2VygfNon6oJZckvZmFVQBhlG6/j11+WZ9piPu4BsEUJmfVM+CV1AgTg3TVRcusP0f4ErtlM5sT9mv6Uzm03MawGRkrxw0h1Kf3cZXCCZXRUcOWgLoNeu7TU=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"5d5cdd876f1d47099001572377ecce2a"}, [
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
  '3d766eab-7879-4b22-ac6c-2e0da7b1ae88',
  'x-ms-request-id',
  '8b37bcf6-2b26-476c-8696-90fb5256d35f',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:28:23 GMT',
  'Content-Length',
  '1379'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAmKZ45I6QalllaFaQzcQKbu2V/i9T/4cBXGKCU/QN2uyMhgXVMGvkTD07nPLwJ0bqURDIYBUhr88pPuJiBXbEgu+hhZyK02P3R9YwpNAqOjF+Zv1CH9q/Kx9SP48NMm56fzsLsed8Ee5F89Fn6cCEzU507/8onkK/qK9k0qj6/gqZ5KerLRLbnhGuDZ+gqRdpUL3hsyqDiKVRATtU91jKniOueBlb70/MA/TsUgIkls5SxrfW2HWP4Ou2p7PWE8rNx15K6WwpuvNP0whMqAdmKUJQ13jg7AF/TGIZE/WBALk5gPAq4oYoWpCvNdHnRLT8xZITIFKL/eJYBxo4HU8FPQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAAoOZTcw+JP6eYGWmTw9Iw6KG5dd0TWjXDl5wvEr/tRI5hJgcuKkAA/c24UDr+sxoRDXWaelbUZFgRY1HOv3GH9DML74F5V4O/CqlFxmNBdLVYoEJfJwombioFV8m2KrOYT0xx2LCpM83e/Q0wr+znUyQU0RuoyUvtLO+MdXsYmSEzKVItOZJVqVB5HQ5L/4/7hbAH+joOgkKoC3p+rK5edTV3v31h0J2VygfNon6oJZckvZmFVQBhlG6/j11+WZ9piPu4BsEUJmfVM+CV1AgTg3TVRcusP0f4ErtlM5sT9mv6Uzm03MawGRkrxw0h1Kf3cZXCCZXRUcOWgLoNeu7TU=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"5d5cdd876f1d47099001572377ecce2a"}, [
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
  'f8e9f30d-51b9-4e70-9c13-4ae249e5e237',
  'x-ms-request-id',
  'ee721a4e-b40b-4c8e-90a1-fbd5023cffea',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:28:24 GMT',
  'Content-Length',
  '1379'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAmKZ45I6QalllaFaQzcQKbu2V/i9T/4cBXGKCU/QN2uyMhgXVMGvkTD07nPLwJ0bqURDIYBUhr88pPuJiBXbEgu+hhZyK02P3R9YwpNAqOjF+Zv1CH9q/Kx9SP48NMm56fzsLsed8Ee5F89Fn6cCEzU507/8onkK/qK9k0qj6/gqZ5KerLRLbnhGuDZ+gqRdpUL3hsyqDiKVRATtU91jKniOueBlb70/MA/TsUgIkls5SxrfW2HWP4Ou2p7PWE8rNx15K6WwpuvNP0whMqAdmKUJQ13jg7AF/TGIZE/WBALk5gPAq4oYoWpCvNdHnRLT8xZITIFKL/eJYBxo4HU8FPQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAAoOZTcw+JP6eYGWmTw9Iw6KG5dd0TWjXDl5wvEr/tRI5hJgcuKkAA/c24UDr+sxoRDXWaelbUZFgRY1HOv3GH9DML74F5V4O/CqlFxmNBdLVYoEJfJwombioFV8m2KrOYT0xx2LCpM83e/Q0wr+znUyQU0RuoyUvtLO+MdXsYmSEzKVItOZJVqVB5HQ5L/4/7hbAH+joOgkKoC3p+rK5edTV3v31h0J2VygfNon6oJZckvZmFVQBhlG6/j11+WZ9piPu4BsEUJmfVM+CV1AgTg3TVRcusP0f4ErtlM5sT9mv6Uzm03MawGRkrxw0h1Kf3cZXCCZXRUcOWgLoNeu7TU=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"5d5cdd876f1d47099001572377ecce2a"}, [
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
  '65b60fab-6cec-4b36-8177-9479dcb6cf22',
  'x-ms-request-id',
  '92056b2b-f16e-47f4-bb49-3d206380b056',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:28:26 GMT',
  'Content-Length',
  '1379'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAmKZ45I6QalllaFaQzcQKbu2V/i9T/4cBXGKCU/QN2uyMhgXVMGvkTD07nPLwJ0bqURDIYBUhr88pPuJiBXbEgu+hhZyK02P3R9YwpNAqOjF+Zv1CH9q/Kx9SP48NMm56fzsLsed8Ee5F89Fn6cCEzU507/8onkK/qK9k0qj6/gqZ5KerLRLbnhGuDZ+gqRdpUL3hsyqDiKVRATtU91jKniOueBlb70/MA/TsUgIkls5SxrfW2HWP4Ou2p7PWE8rNx15K6WwpuvNP0whMqAdmKUJQ13jg7AF/TGIZE/WBALk5gPAq4oYoWpCvNdHnRLT8xZITIFKL/eJYBxo4HU8FPQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAAoOZTcw+JP6eYGWmTw9Iw6KG5dd0TWjXDl5wvEr/tRI5hJgcuKkAA/c24UDr+sxoRDXWaelbUZFgRY1HOv3GH9DML74F5V4O/CqlFxmNBdLVYoEJfJwombioFV8m2KrOYT0xx2LCpM83e/Q0wr+znUyQU0RuoyUvtLO+MdXsYmSEzKVItOZJVqVB5HQ5L/4/7hbAH+joOgkKoC3p+rK5edTV3v31h0J2VygfNon6oJZckvZmFVQBhlG6/j11+WZ9piPu4BsEUJmfVM+CV1AgTg3TVRcusP0f4ErtlM5sT9mv6Uzm03MawGRkrxw0h1Kf3cZXCCZXRUcOWgLoNeu7TU=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"5d5cdd876f1d47099001572377ecce2a"}, [
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
  '3c03ec7d-63b6-4794-b143-8b3cd00b6236',
  'x-ms-request-id',
  'e18b4d5f-7a8e-403a-b1fc-d00364d7f77e',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:28:29 GMT',
  'Content-Length',
  '1379'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAmKZ45I6QalllaFaQzcQKbu2V/i9T/4cBXGKCU/QN2uyMhgXVMGvkTD07nPLwJ0bqURDIYBUhr88pPuJiBXbEgu+hhZyK02P3R9YwpNAqOjF+Zv1CH9q/Kx9SP48NMm56fzsLsed8Ee5F89Fn6cCEzU507/8onkK/qK9k0qj6/gqZ5KerLRLbnhGuDZ+gqRdpUL3hsyqDiKVRATtU91jKniOueBlb70/MA/TsUgIkls5SxrfW2HWP4Ou2p7PWE8rNx15K6WwpuvNP0whMqAdmKUJQ13jg7AF/TGIZE/WBALk5gPAq4oYoWpCvNdHnRLT8xZITIFKL/eJYBxo4HU8FPQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAAoOZTcw+JP6eYGWmTw9Iw6KG5dd0TWjXDl5wvEr/tRI5hJgcuKkAA/c24UDr+sxoRDXWaelbUZFgRY1HOv3GH9DML74F5V4O/CqlFxmNBdLVYoEJfJwombioFV8m2KrOYT0xx2LCpM83e/Q0wr+znUyQU0RuoyUvtLO+MdXsYmSEzKVItOZJVqVB5HQ5L/4/7hbAH+joOgkKoC3p+rK5edTV3v31h0J2VygfNon6oJZckvZmFVQBhlG6/j11+WZ9piPu4BsEUJmfVM+CV1AgTg3TVRcusP0f4ErtlM5sT9mv6Uzm03MawGRkrxw0h1Kf3cZXCCZXRUcOWgLoNeu7TU=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"5d5cdd876f1d47099001572377ecce2a"}, [
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
  'c71ee65f-bc79-43ec-9899-3af561b2f056',
  'x-ms-request-id',
  '71d78b22-2949-45da-a246-e2da9667e736',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:28:31 GMT',
  'Content-Length',
  '1379'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAmKZ45I6QalllaFaQzcQKbu2V/i9T/4cBXGKCU/QN2uyMhgXVMGvkTD07nPLwJ0bqURDIYBUhr88pPuJiBXbEgu+hhZyK02P3R9YwpNAqOjF+Zv1CH9q/Kx9SP48NMm56fzsLsed8Ee5F89Fn6cCEzU507/8onkK/qK9k0qj6/gqZ5KerLRLbnhGuDZ+gqRdpUL3hsyqDiKVRATtU91jKniOueBlb70/MA/TsUgIkls5SxrfW2HWP4Ou2p7PWE8rNx15K6WwpuvNP0whMqAdmKUJQ13jg7AF/TGIZE/WBALk5gPAq4oYoWpCvNdHnRLT8xZITIFKL/eJYBxo4HU8FPQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAAoOZTcw+JP6eYGWmTw9Iw6KG5dd0TWjXDl5wvEr/tRI5hJgcuKkAA/c24UDr+sxoRDXWaelbUZFgRY1HOv3GH9DML74F5V4O/CqlFxmNBdLVYoEJfJwombioFV8m2KrOYT0xx2LCpM83e/Q0wr+znUyQU0RuoyUvtLO+MdXsYmSEzKVItOZJVqVB5HQ5L/4/7hbAH+joOgkKoC3p+rK5edTV3v31h0J2VygfNon6oJZckvZmFVQBhlG6/j11+WZ9piPu4BsEUJmfVM+CV1AgTg3TVRcusP0f4ErtlM5sT9mv6Uzm03MawGRkrxw0h1Kf3cZXCCZXRUcOWgLoNeu7TU=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"5d5cdd876f1d47099001572377ecce2a"}, [
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
  '635d400b-5b71-4958-8404-006e295db690',
  'x-ms-request-id',
  '8f45e720-a971-4126-86a7-ce257e9e0c11',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:28:33 GMT',
  'Content-Length',
  '1379'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAmKZ45I6QalllaFaQzcQKbu2V/i9T/4cBXGKCU/QN2uyMhgXVMGvkTD07nPLwJ0bqURDIYBUhr88pPuJiBXbEgu+hhZyK02P3R9YwpNAqOjF+Zv1CH9q/Kx9SP48NMm56fzsLsed8Ee5F89Fn6cCEzU507/8onkK/qK9k0qj6/gqZ5KerLRLbnhGuDZ+gqRdpUL3hsyqDiKVRATtU91jKniOueBlb70/MA/TsUgIkls5SxrfW2HWP4Ou2p7PWE8rNx15K6WwpuvNP0whMqAdmKUJQ13jg7AF/TGIZE/WBALk5gPAq4oYoWpCvNdHnRLT8xZITIFKL/eJYBxo4HU8FPQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAAoOZTcw+JP6eYGWmTw9Iw6KG5dd0TWjXDl5wvEr/tRI5hJgcuKkAA/c24UDr+sxoRDXWaelbUZFgRY1HOv3GH9DML74F5V4O/CqlFxmNBdLVYoEJfJwombioFV8m2KrOYT0xx2LCpM83e/Q0wr+znUyQU0RuoyUvtLO+MdXsYmSEzKVItOZJVqVB5HQ5L/4/7hbAH+joOgkKoC3p+rK5edTV3v31h0J2VygfNon6oJZckvZmFVQBhlG6/j11+WZ9piPu4BsEUJmfVM+CV1AgTg3TVRcusP0f4ErtlM5sT9mv6Uzm03MawGRkrxw0h1Kf3cZXCCZXRUcOWgLoNeu7TU=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"5d5cdd876f1d47099001572377ecce2a"}, [
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
  'a34a704b-9120-4cac-9e96-ae62bcddd718',
  'x-ms-request-id',
  '858d5116-8270-4f97-ae3b-232329d70da8',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:28:35 GMT',
  'Content-Length',
  '1379'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAmKZ45I6QalllaFaQzcQKbu2V/i9T/4cBXGKCU/QN2uyMhgXVMGvkTD07nPLwJ0bqURDIYBUhr88pPuJiBXbEgu+hhZyK02P3R9YwpNAqOjF+Zv1CH9q/Kx9SP48NMm56fzsLsed8Ee5F89Fn6cCEzU507/8onkK/qK9k0qj6/gqZ5KerLRLbnhGuDZ+gqRdpUL3hsyqDiKVRATtU91jKniOueBlb70/MA/TsUgIkls5SxrfW2HWP4Ou2p7PWE8rNx15K6WwpuvNP0whMqAdmKUJQ13jg7AF/TGIZE/WBALk5gPAq4oYoWpCvNdHnRLT8xZITIFKL/eJYBxo4HU8FPQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAAoOZTcw+JP6eYGWmTw9Iw6KG5dd0TWjXDl5wvEr/tRI5hJgcuKkAA/c24UDr+sxoRDXWaelbUZFgRY1HOv3GH9DML74F5V4O/CqlFxmNBdLVYoEJfJwombioFV8m2KrOYT0xx2LCpM83e/Q0wr+znUyQU0RuoyUvtLO+MdXsYmSEzKVItOZJVqVB5HQ5L/4/7hbAH+joOgkKoC3p+rK5edTV3v31h0J2VygfNon6oJZckvZmFVQBhlG6/j11+WZ9piPu4BsEUJmfVM+CV1AgTg3TVRcusP0f4ErtlM5sT9mv6Uzm03MawGRkrxw0h1Kf3cZXCCZXRUcOWgLoNeu7TU=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"5d5cdd876f1d47099001572377ecce2a"}, [
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
  'eab7aaf3-9912-43ba-ac48-b73075db8e67',
  'x-ms-request-id',
  '60ed87b0-d1f6-42f9-800d-34aca179c2b6',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:28:38 GMT',
  'Content-Length',
  '1379'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAmKZ45I6QalllaFaQzcQKbu2V/i9T/4cBXGKCU/QN2uyMhgXVMGvkTD07nPLwJ0bqURDIYBUhr88pPuJiBXbEgu+hhZyK02P3R9YwpNAqOjF+Zv1CH9q/Kx9SP48NMm56fzsLsed8Ee5F89Fn6cCEzU507/8onkK/qK9k0qj6/gqZ5KerLRLbnhGuDZ+gqRdpUL3hsyqDiKVRATtU91jKniOueBlb70/MA/TsUgIkls5SxrfW2HWP4Ou2p7PWE8rNx15K6WwpuvNP0whMqAdmKUJQ13jg7AF/TGIZE/WBALk5gPAq4oYoWpCvNdHnRLT8xZITIFKL/eJYBxo4HU8FPQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAAoOZTcw+JP6eYGWmTw9Iw6KG5dd0TWjXDl5wvEr/tRI5hJgcuKkAA/c24UDr+sxoRDXWaelbUZFgRY1HOv3GH9DML74F5V4O/CqlFxmNBdLVYoEJfJwombioFV8m2KrOYT0xx2LCpM83e/Q0wr+znUyQU0RuoyUvtLO+MdXsYmSEzKVItOZJVqVB5HQ5L/4/7hbAH+joOgkKoC3p+rK5edTV3v31h0J2VygfNon6oJZckvZmFVQBhlG6/j11+WZ9piPu4BsEUJmfVM+CV1AgTg3TVRcusP0f4ErtlM5sT9mv6Uzm03MawGRkrxw0h1Kf3cZXCCZXRUcOWgLoNeu7TU=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"5d5cdd876f1d47099001572377ecce2a"}, [
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
  '2b3d1d6d-9ee0-4a14-b3d4-971e37e0170a',
  'x-ms-request-id',
  '10137a6f-cb11-4196-9572-fec047570020',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:28:40 GMT',
  'Content-Length',
  '1379'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAmKZ45I6QalllaFaQzcQKbu2V/i9T/4cBXGKCU/QN2uyMhgXVMGvkTD07nPLwJ0bqURDIYBUhr88pPuJiBXbEgu+hhZyK02P3R9YwpNAqOjF+Zv1CH9q/Kx9SP48NMm56fzsLsed8Ee5F89Fn6cCEzU507/8onkK/qK9k0qj6/gqZ5KerLRLbnhGuDZ+gqRdpUL3hsyqDiKVRATtU91jKniOueBlb70/MA/TsUgIkls5SxrfW2HWP4Ou2p7PWE8rNx15K6WwpuvNP0whMqAdmKUJQ13jg7AF/TGIZE/WBALk5gPAq4oYoWpCvNdHnRLT8xZITIFKL/eJYBxo4HU8FPQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAAoOZTcw+JP6eYGWmTw9Iw6KG5dd0TWjXDl5wvEr/tRI5hJgcuKkAA/c24UDr+sxoRDXWaelbUZFgRY1HOv3GH9DML74F5V4O/CqlFxmNBdLVYoEJfJwombioFV8m2KrOYT0xx2LCpM83e/Q0wr+znUyQU0RuoyUvtLO+MdXsYmSEzKVItOZJVqVB5HQ5L/4/7hbAH+joOgkKoC3p+rK5edTV3v31h0J2VygfNon6oJZckvZmFVQBhlG6/j11+WZ9piPu4BsEUJmfVM+CV1AgTg3TVRcusP0f4ErtlM5sT9mv6Uzm03MawGRkrxw0h1Kf3cZXCCZXRUcOWgLoNeu7TU=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"5d5cdd876f1d47099001572377ecce2a"}, [
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
  'ac78c98f-c2b5-4d62-83cc-bbcd2be54b82',
  'x-ms-request-id',
  '1a7c77ae-3729-44d0-9440-394c143ac0f3',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:28:41 GMT',
  'Content-Length',
  '1379'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAmKZ45I6QalllaFaQzcQKbu2V/i9T/4cBXGKCU/QN2uyMhgXVMGvkTD07nPLwJ0bqURDIYBUhr88pPuJiBXbEgu+hhZyK02P3R9YwpNAqOjF+Zv1CH9q/Kx9SP48NMm56fzsLsed8Ee5F89Fn6cCEzU507/8onkK/qK9k0qj6/gqZ5KerLRLbnhGuDZ+gqRdpUL3hsyqDiKVRATtU91jKniOueBlb70/MA/TsUgIkls5SxrfW2HWP4Ou2p7PWE8rNx15K6WwpuvNP0whMqAdmKUJQ13jg7AF/TGIZE/WBALk5gPAq4oYoWpCvNdHnRLT8xZITIFKL/eJYBxo4HU8FPQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAAoOZTcw+JP6eYGWmTw9Iw6KG5dd0TWjXDl5wvEr/tRI5hJgcuKkAA/c24UDr+sxoRDXWaelbUZFgRY1HOv3GH9DML74F5V4O/CqlFxmNBdLVYoEJfJwombioFV8m2KrOYT0xx2LCpM83e/Q0wr+znUyQU0RuoyUvtLO+MdXsYmSEzKVItOZJVqVB5HQ5L/4/7hbAH+joOgkKoC3p+rK5edTV3v31h0J2VygfNon6oJZckvZmFVQBhlG6/j11+WZ9piPu4BsEUJmfVM+CV1AgTg3TVRcusP0f4ErtlM5sT9mv6Uzm03MawGRkrxw0h1Kf3cZXCCZXRUcOWgLoNeu7TU=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"5d5cdd876f1d47099001572377ecce2a"}, [
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
  'd8d365c3-4998-4017-878e-98c364459c48',
  'x-ms-request-id',
  '6484e953-d372-4670-906e-ff71d9b9b51e',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:28:43 GMT',
  'Content-Length',
  '1379'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAmKZ45I6QalllaFaQzcQKbu2V/i9T/4cBXGKCU/QN2uyMhgXVMGvkTD07nPLwJ0bqURDIYBUhr88pPuJiBXbEgu+hhZyK02P3R9YwpNAqOjF+Zv1CH9q/Kx9SP48NMm56fzsLsed8Ee5F89Fn6cCEzU507/8onkK/qK9k0qj6/gqZ5KerLRLbnhGuDZ+gqRdpUL3hsyqDiKVRATtU91jKniOueBlb70/MA/TsUgIkls5SxrfW2HWP4Ou2p7PWE8rNx15K6WwpuvNP0whMqAdmKUJQ13jg7AF/TGIZE/WBALk5gPAq4oYoWpCvNdHnRLT8xZITIFKL/eJYBxo4HU8FPQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAAoOZTcw+JP6eYGWmTw9Iw6KG5dd0TWjXDl5wvEr/tRI5hJgcuKkAA/c24UDr+sxoRDXWaelbUZFgRY1HOv3GH9DML74F5V4O/CqlFxmNBdLVYoEJfJwombioFV8m2KrOYT0xx2LCpM83e/Q0wr+znUyQU0RuoyUvtLO+MdXsYmSEzKVItOZJVqVB5HQ5L/4/7hbAH+joOgkKoC3p+rK5edTV3v31h0J2VygfNon6oJZckvZmFVQBhlG6/j11+WZ9piPu4BsEUJmfVM+CV1AgTg3TVRcusP0f4ErtlM5sT9mv6Uzm03MawGRkrxw0h1Kf3cZXCCZXRUcOWgLoNeu7TU=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"5d5cdd876f1d47099001572377ecce2a"}, [
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
  'ac6ad11d-6280-4dc0-86c3-1fed1301d302',
  'x-ms-request-id',
  '93f218fd-583a-4180-91d4-ab81219a9803',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:28:46 GMT',
  'Content-Length',
  '1379'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAmKZ45I6QalllaFaQzcQKbu2V/i9T/4cBXGKCU/QN2uyMhgXVMGvkTD07nPLwJ0bqURDIYBUhr88pPuJiBXbEgu+hhZyK02P3R9YwpNAqOjF+Zv1CH9q/Kx9SP48NMm56fzsLsed8Ee5F89Fn6cCEzU507/8onkK/qK9k0qj6/gqZ5KerLRLbnhGuDZ+gqRdpUL3hsyqDiKVRATtU91jKniOueBlb70/MA/TsUgIkls5SxrfW2HWP4Ou2p7PWE8rNx15K6WwpuvNP0whMqAdmKUJQ13jg7AF/TGIZE/WBALk5gPAq4oYoWpCvNdHnRLT8xZITIFKL/eJYBxo4HU8FPQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAAoOZTcw+JP6eYGWmTw9Iw6KG5dd0TWjXDl5wvEr/tRI5hJgcuKkAA/c24UDr+sxoRDXWaelbUZFgRY1HOv3GH9DML74F5V4O/CqlFxmNBdLVYoEJfJwombioFV8m2KrOYT0xx2LCpM83e/Q0wr+znUyQU0RuoyUvtLO+MdXsYmSEzKVItOZJVqVB5HQ5L/4/7hbAH+joOgkKoC3p+rK5edTV3v31h0J2VygfNon6oJZckvZmFVQBhlG6/j11+WZ9piPu4BsEUJmfVM+CV1AgTg3TVRcusP0f4ErtlM5sT9mv6Uzm03MawGRkrxw0h1Kf3cZXCCZXRUcOWgLoNeu7TU=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"5d5cdd876f1d47099001572377ecce2a"}, [
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
  'b649e205-54d0-4196-9813-120328e391fa',
  'x-ms-request-id',
  'e6b4a2bb-3b87-4565-b9fc-dcf0a5262abb',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:28:48 GMT',
  'Content-Length',
  '1379'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAmKZ45I6QalllaFaQzcQKbu2V/i9T/4cBXGKCU/QN2uyMhgXVMGvkTD07nPLwJ0bqURDIYBUhr88pPuJiBXbEgu+hhZyK02P3R9YwpNAqOjF+Zv1CH9q/Kx9SP48NMm56fzsLsed8Ee5F89Fn6cCEzU507/8onkK/qK9k0qj6/gqZ5KerLRLbnhGuDZ+gqRdpUL3hsyqDiKVRATtU91jKniOueBlb70/MA/TsUgIkls5SxrfW2HWP4Ou2p7PWE8rNx15K6WwpuvNP0whMqAdmKUJQ13jg7AF/TGIZE/WBALk5gPAq4oYoWpCvNdHnRLT8xZITIFKL/eJYBxo4HU8FPQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAAoOZTcw+JP6eYGWmTw9Iw6KG5dd0TWjXDl5wvEr/tRI5hJgcuKkAA/c24UDr+sxoRDXWaelbUZFgRY1HOv3GH9DML74F5V4O/CqlFxmNBdLVYoEJfJwombioFV8m2KrOYT0xx2LCpM83e/Q0wr+znUyQU0RuoyUvtLO+MdXsYmSEzKVItOZJVqVB5HQ5L/4/7hbAH+joOgkKoC3p+rK5edTV3v31h0J2VygfNon6oJZckvZmFVQBhlG6/j11+WZ9piPu4BsEUJmfVM+CV1AgTg3TVRcusP0f4ErtlM5sT9mv6Uzm03MawGRkrxw0h1Kf3cZXCCZXRUcOWgLoNeu7TU=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"5d5cdd876f1d47099001572377ecce2a"}, [
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
  '792ced16-2e03-471c-8e40-e05d32e48a7d',
  'x-ms-request-id',
  'd1949518-37da-412f-983c-f0d277c418a7',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:28:50 GMT',
  'Content-Length',
  '1379'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAmKZ45I6QalllaFaQzcQKbu2V/i9T/4cBXGKCU/QN2uyMhgXVMGvkTD07nPLwJ0bqURDIYBUhr88pPuJiBXbEgu+hhZyK02P3R9YwpNAqOjF+Zv1CH9q/Kx9SP48NMm56fzsLsed8Ee5F89Fn6cCEzU507/8onkK/qK9k0qj6/gqZ5KerLRLbnhGuDZ+gqRdpUL3hsyqDiKVRATtU91jKniOueBlb70/MA/TsUgIkls5SxrfW2HWP4Ou2p7PWE8rNx15K6WwpuvNP0whMqAdmKUJQ13jg7AF/TGIZE/WBALk5gPAq4oYoWpCvNdHnRLT8xZITIFKL/eJYBxo4HU8FPQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAAoOZTcw+JP6eYGWmTw9Iw6KG5dd0TWjXDl5wvEr/tRI5hJgcuKkAA/c24UDr+sxoRDXWaelbUZFgRY1HOv3GH9DML74F5V4O/CqlFxmNBdLVYoEJfJwombioFV8m2KrOYT0xx2LCpM83e/Q0wr+znUyQU0RuoyUvtLO+MdXsYmSEzKVItOZJVqVB5HQ5L/4/7hbAH+joOgkKoC3p+rK5edTV3v31h0J2VygfNon6oJZckvZmFVQBhlG6/j11+WZ9piPu4BsEUJmfVM+CV1AgTg3TVRcusP0f4ErtlM5sT9mv6Uzm03MawGRkrxw0h1Kf3cZXCCZXRUcOWgLoNeu7TU=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"5d5cdd876f1d47099001572377ecce2a"}, [
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
  '30151a81-5e69-4895-b6a7-76692f0b6018',
  'x-ms-request-id',
  '99ba2602-5de9-43bf-a96c-d2972bea3c5a',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:28:51 GMT',
  'Content-Length',
  '1379'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAmKZ45I6QalllaFaQzcQKbu2V/i9T/4cBXGKCU/QN2uyMhgXVMGvkTD07nPLwJ0bqURDIYBUhr88pPuJiBXbEgu+hhZyK02P3R9YwpNAqOjF+Zv1CH9q/Kx9SP48NMm56fzsLsed8Ee5F89Fn6cCEzU507/8onkK/qK9k0qj6/gqZ5KerLRLbnhGuDZ+gqRdpUL3hsyqDiKVRATtU91jKniOueBlb70/MA/TsUgIkls5SxrfW2HWP4Ou2p7PWE8rNx15K6WwpuvNP0whMqAdmKUJQ13jg7AF/TGIZE/WBALk5gPAq4oYoWpCvNdHnRLT8xZITIFKL/eJYBxo4HU8FPQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAAoOZTcw+JP6eYGWmTw9Iw6KG5dd0TWjXDl5wvEr/tRI5hJgcuKkAA/c24UDr+sxoRDXWaelbUZFgRY1HOv3GH9DML74F5V4O/CqlFxmNBdLVYoEJfJwombioFV8m2KrOYT0xx2LCpM83e/Q0wr+znUyQU0RuoyUvtLO+MdXsYmSEzKVItOZJVqVB5HQ5L/4/7hbAH+joOgkKoC3p+rK5edTV3v31h0J2VygfNon6oJZckvZmFVQBhlG6/j11+WZ9piPu4BsEUJmfVM+CV1AgTg3TVRcusP0f4ErtlM5sT9mv6Uzm03MawGRkrxw0h1Kf3cZXCCZXRUcOWgLoNeu7TU=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"5d5cdd876f1d47099001572377ecce2a"}, [
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
  '8cc028c3-1aa0-4095-87c4-c94bf897ac93',
  'x-ms-request-id',
  'db366eec-4eca-4b39-9795-0e93f157185b',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:28:54 GMT',
  'Content-Length',
  '1379'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAmKZ45I6QalllaFaQzcQKbu2V/i9T/4cBXGKCU/QN2uyMhgXVMGvkTD07nPLwJ0bqURDIYBUhr88pPuJiBXbEgu+hhZyK02P3R9YwpNAqOjF+Zv1CH9q/Kx9SP48NMm56fzsLsed8Ee5F89Fn6cCEzU507/8onkK/qK9k0qj6/gqZ5KerLRLbnhGuDZ+gqRdpUL3hsyqDiKVRATtU91jKniOueBlb70/MA/TsUgIkls5SxrfW2HWP4Ou2p7PWE8rNx15K6WwpuvNP0whMqAdmKUJQ13jg7AF/TGIZE/WBALk5gPAq4oYoWpCvNdHnRLT8xZITIFKL/eJYBxo4HU8FPQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAAoOZTcw+JP6eYGWmTw9Iw6KG5dd0TWjXDl5wvEr/tRI5hJgcuKkAA/c24UDr+sxoRDXWaelbUZFgRY1HOv3GH9DML74F5V4O/CqlFxmNBdLVYoEJfJwombioFV8m2KrOYT0xx2LCpM83e/Q0wr+znUyQU0RuoyUvtLO+MdXsYmSEzKVItOZJVqVB5HQ5L/4/7hbAH+joOgkKoC3p+rK5edTV3v31h0J2VygfNon6oJZckvZmFVQBhlG6/j11+WZ9piPu4BsEUJmfVM+CV1AgTg3TVRcusP0f4ErtlM5sT9mv6Uzm03MawGRkrxw0h1Kf3cZXCCZXRUcOWgLoNeu7TU=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"5d5cdd876f1d47099001572377ecce2a"}, [
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
  '3937bc55-acb5-4939-9792-15a99418b549',
  'x-ms-request-id',
  'a0b5577e-7d94-4474-adea-16f0e62beb01',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:28:56 GMT',
  'Content-Length',
  '1379'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAmKZ45I6QalllaFaQzcQKbu2V/i9T/4cBXGKCU/QN2uyMhgXVMGvkTD07nPLwJ0bqURDIYBUhr88pPuJiBXbEgu+hhZyK02P3R9YwpNAqOjF+Zv1CH9q/Kx9SP48NMm56fzsLsed8Ee5F89Fn6cCEzU507/8onkK/qK9k0qj6/gqZ5KerLRLbnhGuDZ+gqRdpUL3hsyqDiKVRATtU91jKniOueBlb70/MA/TsUgIkls5SxrfW2HWP4Ou2p7PWE8rNx15K6WwpuvNP0whMqAdmKUJQ13jg7AF/TGIZE/WBALk5gPAq4oYoWpCvNdHnRLT8xZITIFKL/eJYBxo4HU8FPQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAAoOZTcw+JP6eYGWmTw9Iw6KG5dd0TWjXDl5wvEr/tRI5hJgcuKkAA/c24UDr+sxoRDXWaelbUZFgRY1HOv3GH9DML74F5V4O/CqlFxmNBdLVYoEJfJwombioFV8m2KrOYT0xx2LCpM83e/Q0wr+znUyQU0RuoyUvtLO+MdXsYmSEzKVItOZJVqVB5HQ5L/4/7hbAH+joOgkKoC3p+rK5edTV3v31h0J2VygfNon6oJZckvZmFVQBhlG6/j11+WZ9piPu4BsEUJmfVM+CV1AgTg3TVRcusP0f4ErtlM5sT9mv6Uzm03MawGRkrxw0h1Kf3cZXCCZXRUcOWgLoNeu7TU=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"5d5cdd876f1d47099001572377ecce2a"}, [
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
  'daedf25c-286d-4b89-9fa3-ce70f71b8195',
  'x-ms-request-id',
  '78514077-e81b-4e8e-aec7-b4a2240b9fc2',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:28:58 GMT',
  'Content-Length',
  '1379'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAmKZ45I6QalllaFaQzcQKbu2V/i9T/4cBXGKCU/QN2uyMhgXVMGvkTD07nPLwJ0bqURDIYBUhr88pPuJiBXbEgu+hhZyK02P3R9YwpNAqOjF+Zv1CH9q/Kx9SP48NMm56fzsLsed8Ee5F89Fn6cCEzU507/8onkK/qK9k0qj6/gqZ5KerLRLbnhGuDZ+gqRdpUL3hsyqDiKVRATtU91jKniOueBlb70/MA/TsUgIkls5SxrfW2HWP4Ou2p7PWE8rNx15K6WwpuvNP0whMqAdmKUJQ13jg7AF/TGIZE/WBALk5gPAq4oYoWpCvNdHnRLT8xZITIFKL/eJYBxo4HU8FPQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAAoOZTcw+JP6eYGWmTw9Iw6KG5dd0TWjXDl5wvEr/tRI5hJgcuKkAA/c24UDr+sxoRDXWaelbUZFgRY1HOv3GH9DML74F5V4O/CqlFxmNBdLVYoEJfJwombioFV8m2KrOYT0xx2LCpM83e/Q0wr+znUyQU0RuoyUvtLO+MdXsYmSEzKVItOZJVqVB5HQ5L/4/7hbAH+joOgkKoC3p+rK5edTV3v31h0J2VygfNon6oJZckvZmFVQBhlG6/j11+WZ9piPu4BsEUJmfVM+CV1AgTg3TVRcusP0f4ErtlM5sT9mv6Uzm03MawGRkrxw0h1Kf3cZXCCZXRUcOWgLoNeu7TU=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"5d5cdd876f1d47099001572377ecce2a"}, [
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
  'efd2117e-f564-4772-b81c-b44c30351730',
  'x-ms-request-id',
  '7dd9dbe7-dada-4b1a-b7f3-34e9aa5fd252',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:29:00 GMT',
  'Content-Length',
  '1379'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAmKZ45I6QalllaFaQzcQKbu2V/i9T/4cBXGKCU/QN2uyMhgXVMGvkTD07nPLwJ0bqURDIYBUhr88pPuJiBXbEgu+hhZyK02P3R9YwpNAqOjF+Zv1CH9q/Kx9SP48NMm56fzsLsed8Ee5F89Fn6cCEzU507/8onkK/qK9k0qj6/gqZ5KerLRLbnhGuDZ+gqRdpUL3hsyqDiKVRATtU91jKniOueBlb70/MA/TsUgIkls5SxrfW2HWP4Ou2p7PWE8rNx15K6WwpuvNP0whMqAdmKUJQ13jg7AF/TGIZE/WBALk5gPAq4oYoWpCvNdHnRLT8xZITIFKL/eJYBxo4HU8FPQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAAoOZTcw+JP6eYGWmTw9Iw6KG5dd0TWjXDl5wvEr/tRI5hJgcuKkAA/c24UDr+sxoRDXWaelbUZFgRY1HOv3GH9DML74F5V4O/CqlFxmNBdLVYoEJfJwombioFV8m2KrOYT0xx2LCpM83e/Q0wr+znUyQU0RuoyUvtLO+MdXsYmSEzKVItOZJVqVB5HQ5L/4/7hbAH+joOgkKoC3p+rK5edTV3v31h0J2VygfNon6oJZckvZmFVQBhlG6/j11+WZ9piPu4BsEUJmfVM+CV1AgTg3TVRcusP0f4ErtlM5sT9mv6Uzm03MawGRkrxw0h1Kf3cZXCCZXRUcOWgLoNeu7TU=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"5d5cdd876f1d47099001572377ecce2a"}, [
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
  'c526acdc-8fc8-4490-a7fb-c75b1b09c1b0',
  'x-ms-request-id',
  'd40e3a6d-a34e-4377-8374-28748a55e854',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:29:02 GMT',
  'Content-Length',
  '1379'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAmKZ45I6QalllaFaQzcQKbu2V/i9T/4cBXGKCU/QN2uyMhgXVMGvkTD07nPLwJ0bqURDIYBUhr88pPuJiBXbEgu+hhZyK02P3R9YwpNAqOjF+Zv1CH9q/Kx9SP48NMm56fzsLsed8Ee5F89Fn6cCEzU507/8onkK/qK9k0qj6/gqZ5KerLRLbnhGuDZ+gqRdpUL3hsyqDiKVRATtU91jKniOueBlb70/MA/TsUgIkls5SxrfW2HWP4Ou2p7PWE8rNx15K6WwpuvNP0whMqAdmKUJQ13jg7AF/TGIZE/WBALk5gPAq4oYoWpCvNdHnRLT8xZITIFKL/eJYBxo4HU8FPQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAAoOZTcw+JP6eYGWmTw9Iw6KG5dd0TWjXDl5wvEr/tRI5hJgcuKkAA/c24UDr+sxoRDXWaelbUZFgRY1HOv3GH9DML74F5V4O/CqlFxmNBdLVYoEJfJwombioFV8m2KrOYT0xx2LCpM83e/Q0wr+znUyQU0RuoyUvtLO+MdXsYmSEzKVItOZJVqVB5HQ5L/4/7hbAH+joOgkKoC3p+rK5edTV3v31h0J2VygfNon6oJZckvZmFVQBhlG6/j11+WZ9piPu4BsEUJmfVM+CV1AgTg3TVRcusP0f4ErtlM5sT9mv6Uzm03MawGRkrxw0h1Kf3cZXCCZXRUcOWgLoNeu7TU=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"5d5cdd876f1d47099001572377ecce2a"}, [
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
  'be19eb88-f47d-4ff6-b06d-204329a5f956',
  'x-ms-request-id',
  '1b11df3d-a48f-417e-a920-5b08ade4aaa5',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:29:04 GMT',
  'Content-Length',
  '1379'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAmKZ45I6QalllaFaQzcQKbu2V/i9T/4cBXGKCU/QN2uyMhgXVMGvkTD07nPLwJ0bqURDIYBUhr88pPuJiBXbEgu+hhZyK02P3R9YwpNAqOjF+Zv1CH9q/Kx9SP48NMm56fzsLsed8Ee5F89Fn6cCEzU507/8onkK/qK9k0qj6/gqZ5KerLRLbnhGuDZ+gqRdpUL3hsyqDiKVRATtU91jKniOueBlb70/MA/TsUgIkls5SxrfW2HWP4Ou2p7PWE8rNx15K6WwpuvNP0whMqAdmKUJQ13jg7AF/TGIZE/WBALk5gPAq4oYoWpCvNdHnRLT8xZITIFKL/eJYBxo4HU8FPQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAAoOZTcw+JP6eYGWmTw9Iw6KG5dd0TWjXDl5wvEr/tRI5hJgcuKkAA/c24UDr+sxoRDXWaelbUZFgRY1HOv3GH9DML74F5V4O/CqlFxmNBdLVYoEJfJwombioFV8m2KrOYT0xx2LCpM83e/Q0wr+znUyQU0RuoyUvtLO+MdXsYmSEzKVItOZJVqVB5HQ5L/4/7hbAH+joOgkKoC3p+rK5edTV3v31h0J2VygfNon6oJZckvZmFVQBhlG6/j11+WZ9piPu4BsEUJmfVM+CV1AgTg3TVRcusP0f4ErtlM5sT9mv6Uzm03MawGRkrxw0h1Kf3cZXCCZXRUcOWgLoNeu7TU=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"5d5cdd876f1d47099001572377ecce2a"}, [
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
  '55d75da9-bd4a-486a-8b12-a4df9a535c1c',
  'x-ms-request-id',
  'c7dccd42-d024-40e8-8784-5aa1dc0deb78',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:29:06 GMT',
  'Content-Length',
  '1379'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAmKZ45I6QalllaFaQzcQKbu2V/i9T/4cBXGKCU/QN2uyMhgXVMGvkTD07nPLwJ0bqURDIYBUhr88pPuJiBXbEgu+hhZyK02P3R9YwpNAqOjF+Zv1CH9q/Kx9SP48NMm56fzsLsed8Ee5F89Fn6cCEzU507/8onkK/qK9k0qj6/gqZ5KerLRLbnhGuDZ+gqRdpUL3hsyqDiKVRATtU91jKniOueBlb70/MA/TsUgIkls5SxrfW2HWP4Ou2p7PWE8rNx15K6WwpuvNP0whMqAdmKUJQ13jg7AF/TGIZE/WBALk5gPAq4oYoWpCvNdHnRLT8xZITIFKL/eJYBxo4HU8FPQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAAoOZTcw+JP6eYGWmTw9Iw6KG5dd0TWjXDl5wvEr/tRI5hJgcuKkAA/c24UDr+sxoRDXWaelbUZFgRY1HOv3GH9DML74F5V4O/CqlFxmNBdLVYoEJfJwombioFV8m2KrOYT0xx2LCpM83e/Q0wr+znUyQU0RuoyUvtLO+MdXsYmSEzKVItOZJVqVB5HQ5L/4/7hbAH+joOgkKoC3p+rK5edTV3v31h0J2VygfNon6oJZckvZmFVQBhlG6/j11+WZ9piPu4BsEUJmfVM+CV1AgTg3TVRcusP0f4ErtlM5sT9mv6Uzm03MawGRkrxw0h1Kf3cZXCCZXRUcOWgLoNeu7TU=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"5d5cdd876f1d47099001572377ecce2a"}, [
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
  'e7c58f47-0c83-4d8e-baf7-46aebe75016e',
  'x-ms-request-id',
  '910e9b42-9d2f-442a-abc9-a469900541cf',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:29:08 GMT',
  'Content-Length',
  '1379'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAmKZ45I6QalllaFaQzcQKbu2V/i9T/4cBXGKCU/QN2uyMhgXVMGvkTD07nPLwJ0bqURDIYBUhr88pPuJiBXbEgu+hhZyK02P3R9YwpNAqOjF+Zv1CH9q/Kx9SP48NMm56fzsLsed8Ee5F89Fn6cCEzU507/8onkK/qK9k0qj6/gqZ5KerLRLbnhGuDZ+gqRdpUL3hsyqDiKVRATtU91jKniOueBlb70/MA/TsUgIkls5SxrfW2HWP4Ou2p7PWE8rNx15K6WwpuvNP0whMqAdmKUJQ13jg7AF/TGIZE/WBALk5gPAq4oYoWpCvNdHnRLT8xZITIFKL/eJYBxo4HU8FPQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAAoOZTcw+JP6eYGWmTw9Iw6KG5dd0TWjXDl5wvEr/tRI5hJgcuKkAA/c24UDr+sxoRDXWaelbUZFgRY1HOv3GH9DML74F5V4O/CqlFxmNBdLVYoEJfJwombioFV8m2KrOYT0xx2LCpM83e/Q0wr+znUyQU0RuoyUvtLO+MdXsYmSEzKVItOZJVqVB5HQ5L/4/7hbAH+joOgkKoC3p+rK5edTV3v31h0J2VygfNon6oJZckvZmFVQBhlG6/j11+WZ9piPu4BsEUJmfVM+CV1AgTg3TVRcusP0f4ErtlM5sT9mv6Uzm03MawGRkrxw0h1Kf3cZXCCZXRUcOWgLoNeu7TU=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"5d5cdd876f1d47099001572377ecce2a"}, [
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
  '58bab9fb-faa3-47a1-b318-e20e217ede36',
  'x-ms-request-id',
  '2c120e0b-ee40-4c8e-a50e-dcd96a9b3db3',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:29:11 GMT',
  'Content-Length',
  '1379'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAmKZ45I6QalllaFaQzcQKbu2V/i9T/4cBXGKCU/QN2uyMhgXVMGvkTD07nPLwJ0bqURDIYBUhr88pPuJiBXbEgu+hhZyK02P3R9YwpNAqOjF+Zv1CH9q/Kx9SP48NMm56fzsLsed8Ee5F89Fn6cCEzU507/8onkK/qK9k0qj6/gqZ5KerLRLbnhGuDZ+gqRdpUL3hsyqDiKVRATtU91jKniOueBlb70/MA/TsUgIkls5SxrfW2HWP4Ou2p7PWE8rNx15K6WwpuvNP0whMqAdmKUJQ13jg7AF/TGIZE/WBALk5gPAq4oYoWpCvNdHnRLT8xZITIFKL/eJYBxo4HU8FPQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAAoOZTcw+JP6eYGWmTw9Iw6KG5dd0TWjXDl5wvEr/tRI5hJgcuKkAA/c24UDr+sxoRDXWaelbUZFgRY1HOv3GH9DML74F5V4O/CqlFxmNBdLVYoEJfJwombioFV8m2KrOYT0xx2LCpM83e/Q0wr+znUyQU0RuoyUvtLO+MdXsYmSEzKVItOZJVqVB5HQ5L/4/7hbAH+joOgkKoC3p+rK5edTV3v31h0J2VygfNon6oJZckvZmFVQBhlG6/j11+WZ9piPu4BsEUJmfVM+CV1AgTg3TVRcusP0f4ErtlM5sT9mv6Uzm03MawGRkrxw0h1Kf3cZXCCZXRUcOWgLoNeu7TU=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"5d5cdd876f1d47099001572377ecce2a"}, [
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
  '53f10ce6-5af5-4006-8a31-2d994da67906',
  'x-ms-request-id',
  'f04193e0-74ce-45ea-a276-2da03d1f0744',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:29:13 GMT',
  'Content-Length',
  '1379'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAmKZ45I6QalllaFaQzcQKbu2V/i9T/4cBXGKCU/QN2uyMhgXVMGvkTD07nPLwJ0bqURDIYBUhr88pPuJiBXbEgu+hhZyK02P3R9YwpNAqOjF+Zv1CH9q/Kx9SP48NMm56fzsLsed8Ee5F89Fn6cCEzU507/8onkK/qK9k0qj6/gqZ5KerLRLbnhGuDZ+gqRdpUL3hsyqDiKVRATtU91jKniOueBlb70/MA/TsUgIkls5SxrfW2HWP4Ou2p7PWE8rNx15K6WwpuvNP0whMqAdmKUJQ13jg7AF/TGIZE/WBALk5gPAq4oYoWpCvNdHnRLT8xZITIFKL/eJYBxo4HU8FPQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAAoOZTcw+JP6eYGWmTw9Iw6KG5dd0TWjXDl5wvEr/tRI5hJgcuKkAA/c24UDr+sxoRDXWaelbUZFgRY1HOv3GH9DML74F5V4O/CqlFxmNBdLVYoEJfJwombioFV8m2KrOYT0xx2LCpM83e/Q0wr+znUyQU0RuoyUvtLO+MdXsYmSEzKVItOZJVqVB5HQ5L/4/7hbAH+joOgkKoC3p+rK5edTV3v31h0J2VygfNon6oJZckvZmFVQBhlG6/j11+WZ9piPu4BsEUJmfVM+CV1AgTg3TVRcusP0f4ErtlM5sT9mv6Uzm03MawGRkrxw0h1Kf3cZXCCZXRUcOWgLoNeu7TU=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"5d5cdd876f1d47099001572377ecce2a"}, [
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
  '7421f328-fbb0-4943-b814-bcc86045c1e3',
  'x-ms-request-id',
  '1588e36a-c50c-4977-826c-223067f70bc3',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:29:15 GMT',
  'Content-Length',
  '1379'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAmKZ45I6QalllaFaQzcQKbu2V/i9T/4cBXGKCU/QN2uyMhgXVMGvkTD07nPLwJ0bqURDIYBUhr88pPuJiBXbEgu+hhZyK02P3R9YwpNAqOjF+Zv1CH9q/Kx9SP48NMm56fzsLsed8Ee5F89Fn6cCEzU507/8onkK/qK9k0qj6/gqZ5KerLRLbnhGuDZ+gqRdpUL3hsyqDiKVRATtU91jKniOueBlb70/MA/TsUgIkls5SxrfW2HWP4Ou2p7PWE8rNx15K6WwpuvNP0whMqAdmKUJQ13jg7AF/TGIZE/WBALk5gPAq4oYoWpCvNdHnRLT8xZITIFKL/eJYBxo4HU8FPQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAAoOZTcw+JP6eYGWmTw9Iw6KG5dd0TWjXDl5wvEr/tRI5hJgcuKkAA/c24UDr+sxoRDXWaelbUZFgRY1HOv3GH9DML74F5V4O/CqlFxmNBdLVYoEJfJwombioFV8m2KrOYT0xx2LCpM83e/Q0wr+znUyQU0RuoyUvtLO+MdXsYmSEzKVItOZJVqVB5HQ5L/4/7hbAH+joOgkKoC3p+rK5edTV3v31h0J2VygfNon6oJZckvZmFVQBhlG6/j11+WZ9piPu4BsEUJmfVM+CV1AgTg3TVRcusP0f4ErtlM5sT9mv6Uzm03MawGRkrxw0h1Kf3cZXCCZXRUcOWgLoNeu7TU=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"5d5cdd876f1d47099001572377ecce2a"}, [
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
  '5954efed-cc62-4b52-866c-e7189f696808',
  'x-ms-request-id',
  'e9887cc1-8bbc-4b8a-8c1c-b0b8036c0fae',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:29:17 GMT',
  'Content-Length',
  '1379'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAmKZ45I6QalllaFaQzcQKbu2V/i9T/4cBXGKCU/QN2uyMhgXVMGvkTD07nPLwJ0bqURDIYBUhr88pPuJiBXbEgu+hhZyK02P3R9YwpNAqOjF+Zv1CH9q/Kx9SP48NMm56fzsLsed8Ee5F89Fn6cCEzU507/8onkK/qK9k0qj6/gqZ5KerLRLbnhGuDZ+gqRdpUL3hsyqDiKVRATtU91jKniOueBlb70/MA/TsUgIkls5SxrfW2HWP4Ou2p7PWE8rNx15K6WwpuvNP0whMqAdmKUJQ13jg7AF/TGIZE/WBALk5gPAq4oYoWpCvNdHnRLT8xZITIFKL/eJYBxo4HU8FPQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAAoOZTcw+JP6eYGWmTw9Iw6KG5dd0TWjXDl5wvEr/tRI5hJgcuKkAA/c24UDr+sxoRDXWaelbUZFgRY1HOv3GH9DML74F5V4O/CqlFxmNBdLVYoEJfJwombioFV8m2KrOYT0xx2LCpM83e/Q0wr+znUyQU0RuoyUvtLO+MdXsYmSEzKVItOZJVqVB5HQ5L/4/7hbAH+joOgkKoC3p+rK5edTV3v31h0J2VygfNon6oJZckvZmFVQBhlG6/j11+WZ9piPu4BsEUJmfVM+CV1AgTg3TVRcusP0f4ErtlM5sT9mv6Uzm03MawGRkrxw0h1Kf3cZXCCZXRUcOWgLoNeu7TU=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"5d5cdd876f1d47099001572377ecce2a"}, [
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
  'c1644f41-5818-47a1-8c2a-8c73eba44301',
  'x-ms-request-id',
  '4315c915-8418-47c7-9e48-2b9589a1d7b3',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:29:19 GMT',
  'Content-Length',
  '1379'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAmKZ45I6QalllaFaQzcQKbu2V/i9T/4cBXGKCU/QN2uyMhgXVMGvkTD07nPLwJ0bqURDIYBUhr88pPuJiBXbEgu+hhZyK02P3R9YwpNAqOjF+Zv1CH9q/Kx9SP48NMm56fzsLsed8Ee5F89Fn6cCEzU507/8onkK/qK9k0qj6/gqZ5KerLRLbnhGuDZ+gqRdpUL3hsyqDiKVRATtU91jKniOueBlb70/MA/TsUgIkls5SxrfW2HWP4Ou2p7PWE8rNx15K6WwpuvNP0whMqAdmKUJQ13jg7AF/TGIZE/WBALk5gPAq4oYoWpCvNdHnRLT8xZITIFKL/eJYBxo4HU8FPQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAAoOZTcw+JP6eYGWmTw9Iw6KG5dd0TWjXDl5wvEr/tRI5hJgcuKkAA/c24UDr+sxoRDXWaelbUZFgRY1HOv3GH9DML74F5V4O/CqlFxmNBdLVYoEJfJwombioFV8m2KrOYT0xx2LCpM83e/Q0wr+znUyQU0RuoyUvtLO+MdXsYmSEzKVItOZJVqVB5HQ5L/4/7hbAH+joOgkKoC3p+rK5edTV3v31h0J2VygfNon6oJZckvZmFVQBhlG6/j11+WZ9piPu4BsEUJmfVM+CV1AgTg3TVRcusP0f4ErtlM5sT9mv6Uzm03MawGRkrxw0h1Kf3cZXCCZXRUcOWgLoNeu7TU=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"5d5cdd876f1d47099001572377ecce2a"}, [
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
  'b6043f6f-252f-4133-83d6-1af41ff30363',
  'x-ms-request-id',
  'b39571d0-b44a-4b2b-b1c0-fc7f67d88b24',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:29:21 GMT',
  'Content-Length',
  '1379'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAmKZ45I6QalllaFaQzcQKbu2V/i9T/4cBXGKCU/QN2uyMhgXVMGvkTD07nPLwJ0bqURDIYBUhr88pPuJiBXbEgu+hhZyK02P3R9YwpNAqOjF+Zv1CH9q/Kx9SP48NMm56fzsLsed8Ee5F89Fn6cCEzU507/8onkK/qK9k0qj6/gqZ5KerLRLbnhGuDZ+gqRdpUL3hsyqDiKVRATtU91jKniOueBlb70/MA/TsUgIkls5SxrfW2HWP4Ou2p7PWE8rNx15K6WwpuvNP0whMqAdmKUJQ13jg7AF/TGIZE/WBALk5gPAq4oYoWpCvNdHnRLT8xZITIFKL/eJYBxo4HU8FPQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAAoOZTcw+JP6eYGWmTw9Iw6KG5dd0TWjXDl5wvEr/tRI5hJgcuKkAA/c24UDr+sxoRDXWaelbUZFgRY1HOv3GH9DML74F5V4O/CqlFxmNBdLVYoEJfJwombioFV8m2KrOYT0xx2LCpM83e/Q0wr+znUyQU0RuoyUvtLO+MdXsYmSEzKVItOZJVqVB5HQ5L/4/7hbAH+joOgkKoC3p+rK5edTV3v31h0J2VygfNon6oJZckvZmFVQBhlG6/j11+WZ9piPu4BsEUJmfVM+CV1AgTg3TVRcusP0f4ErtlM5sT9mv6Uzm03MawGRkrxw0h1Kf3cZXCCZXRUcOWgLoNeu7TU=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"5d5cdd876f1d47099001572377ecce2a"}, [
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
  '163f34ab-2965-4646-ada7-56bcdc6db678',
  'x-ms-request-id',
  '15c17ed4-b9af-4fd5-b8a6-9a8528d8c57f',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:29:23 GMT',
  'Content-Length',
  '1379'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAmKZ45I6QalllaFaQzcQKbu2V/i9T/4cBXGKCU/QN2uyMhgXVMGvkTD07nPLwJ0bqURDIYBUhr88pPuJiBXbEgu+hhZyK02P3R9YwpNAqOjF+Zv1CH9q/Kx9SP48NMm56fzsLsed8Ee5F89Fn6cCEzU507/8onkK/qK9k0qj6/gqZ5KerLRLbnhGuDZ+gqRdpUL3hsyqDiKVRATtU91jKniOueBlb70/MA/TsUgIkls5SxrfW2HWP4Ou2p7PWE8rNx15K6WwpuvNP0whMqAdmKUJQ13jg7AF/TGIZE/WBALk5gPAq4oYoWpCvNdHnRLT8xZITIFKL/eJYBxo4HU8FPQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAAoOZTcw+JP6eYGWmTw9Iw6KG5dd0TWjXDl5wvEr/tRI5hJgcuKkAA/c24UDr+sxoRDXWaelbUZFgRY1HOv3GH9DML74F5V4O/CqlFxmNBdLVYoEJfJwombioFV8m2KrOYT0xx2LCpM83e/Q0wr+znUyQU0RuoyUvtLO+MdXsYmSEzKVItOZJVqVB5HQ5L/4/7hbAH+joOgkKoC3p+rK5edTV3v31h0J2VygfNon6oJZckvZmFVQBhlG6/j11+WZ9piPu4BsEUJmfVM+CV1AgTg3TVRcusP0f4ErtlM5sT9mv6Uzm03MawGRkrxw0h1Kf3cZXCCZXRUcOWgLoNeu7TU=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"5d5cdd876f1d47099001572377ecce2a"}, [
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
  '80486240-6cf2-4eda-b89e-7806d18a4b06',
  'x-ms-request-id',
  '879bf10a-1e7a-4da9-9259-4491300bf67b',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:29:26 GMT',
  'Content-Length',
  '1379'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAmKZ45I6QalllaFaQzcQKbu2V/i9T/4cBXGKCU/QN2uyMhgXVMGvkTD07nPLwJ0bqURDIYBUhr88pPuJiBXbEgu+hhZyK02P3R9YwpNAqOjF+Zv1CH9q/Kx9SP48NMm56fzsLsed8Ee5F89Fn6cCEzU507/8onkK/qK9k0qj6/gqZ5KerLRLbnhGuDZ+gqRdpUL3hsyqDiKVRATtU91jKniOueBlb70/MA/TsUgIkls5SxrfW2HWP4Ou2p7PWE8rNx15K6WwpuvNP0whMqAdmKUJQ13jg7AF/TGIZE/WBALk5gPAq4oYoWpCvNdHnRLT8xZITIFKL/eJYBxo4HU8FPQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAAoOZTcw+JP6eYGWmTw9Iw6KG5dd0TWjXDl5wvEr/tRI5hJgcuKkAA/c24UDr+sxoRDXWaelbUZFgRY1HOv3GH9DML74F5V4O/CqlFxmNBdLVYoEJfJwombioFV8m2KrOYT0xx2LCpM83e/Q0wr+znUyQU0RuoyUvtLO+MdXsYmSEzKVItOZJVqVB5HQ5L/4/7hbAH+joOgkKoC3p+rK5edTV3v31h0J2VygfNon6oJZckvZmFVQBhlG6/j11+WZ9piPu4BsEUJmfVM+CV1AgTg3TVRcusP0f4ErtlM5sT9mv6Uzm03MawGRkrxw0h1Kf3cZXCCZXRUcOWgLoNeu7TU=","cancellation_requested":false,"status":"completed","target":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0","request_id":"5d5cdd876f1d47099001572377ecce2a"}, [
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
  'bc17082f-f0f2-48bc-be9b-079d0c098fd3',
  'x-ms-request-id',
  'e70521a0-4153-4128-9ee3-bf43db0d1692',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:29:28 GMT',
  'Content-Length',
  '1385'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0/')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0/55e1fad307de4fcb8f343aa3263684c8","kid":"https://keyvault_name.vault.azure.net/keys/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0/55e1fad307de4fcb8f343aa3263684c8","sid":"https://keyvault_name.vault.azure.net/secrets/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0/55e1fad307de4fcb8f343aa3263684c8","x5t":"Crme8PobQqngQY75ye-eCBQE600","cer":"MIIDKDCCAhCgAwIBAgIQA5UX7cjBQ0y15XgIm8XfSDANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjEwNDI4MjIxOTI3WhcNMjIwNDI4MjIyOTI3WjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQCYpnjkjpBqWWVoVpDNxApu7ZX+L1P/hwFcYoJT9A3a7IyGBdUwa+RMPTuc8vAnRupREMhgFSGvzyk+4mIFdsSC76GFnIrTY/dH1jCk0Co6MX5m/UIf2r8rH1I/jw0ybnp/Owux53wR7kXz0WfpwITNTnTv/yieQr+or2TSqPr+Cpnkp6stEtueEa4Nn6CpF2lQveGzKoOIpVEBO1T3WMqeI654GVvvT8wD9OxSAiSWzlLGt9bYdY/g67ans9YTys3HXkrpbCm680/TCEyoB2YpQlDXeODsAX9MYhkT9YEAuTmA8CrihihakK810edEtPzFkhMgUov94lgHGjgdTwU9AgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBQSBlsH1mXwFAFL/vhGCnhasJkrDjAdBgNVHQ4EFgQUEgZbB9Zl8BQBS/74Rgp4WrCZKw4wDQYJKoZIhvcNAQELBQADggEBAESdby4+MaxiWz4MHlPYcvnw/NHZCN6hUzyPnXmElqZB4DRevQsqulYWZCLrgVIqUKYwKKr/freAQUnMg8VHgBb5XqWMpGiN9LEhc4k19Ysf2i2MAH6M/sRxlWIbuXCCH4zNangTEQs/muY3XxJVDPIkLcY2Ky6gfxNQHcCtYODRox8euvaMdHE7rE1FIBM2ZbvDtLJSACe8hdeJ15uCfRF6bZNBkqDY8qs5p5algH1VhbC2Rd0+vDbroKCbs+PytwE/kx30x8dSjLLeE1BQoFg0GDBaWDoGW1vkN63UODDR5A6vBY3A6RJknjRf1kyM6CiKSP2H/oq+KlXUqKaYm5o=","attributes":{"enabled":true,"nbf":1619648367,"exp":1651184967,"created":1619648967,"updated":1619648967,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1619648890,"updated":1619648890}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0/pending"}}, [
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
  '13e36dde-ad51-47f5-b533-35b8d1710520',
  'x-ms-request-id',
  'dc5cea78-5351-4109-b0ff-d78f25476257',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:29:28 GMT',
  'Content-Length',
  '2785'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1/create', {"policy":{"key_props":{},"secret_props":{},"x509_props":{"subject":"cn=MyCert","sans":{}},"issuer":{"name":"Self"},"attributes":{}},"attributes":{}})
  .query(true)
  .reply(202, {"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAqkk542XVAH9alOK461Uc0ca3zgQg7TsrMSqOFJ1QoeYFGQZ3TBqAMtsnsCa3BZuLo6Si6O+Cem3w9YjS2wLGFpTRN+palY7JFalogsRIdP3U4+yXOsZIeIDjVFfeZsWKfW8h83ROZb8MdVmVxQqvhMgutVD87n+RUCjsNdfgiN0NXzY3ZKeqcJ0F+0sJy14FRvPvaKffJZca6I5BGWEfKpm8aijMRQyxkFdqiX5eayXxWgQfSiSr815HuW0gp9Wu5+6AW1nArs3TWNe6Y45moqQc/2UBLcCoW3HGYgcvP+/cuUmmj/N2K3Z9MNyJmsRy2fq4xNoUax76VXojbeH7rQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAD7oGmCZlbE9iTvGPbGtxgpTrHCrmPVzyik+r2Ms3A00SyU/4RIOiRgmBDjXeMitYhaFtYO+4BMdKE1kzo0AWwO/BDw0gYRhmzYrAMeexXPrT6DPCcHRHsQcD9fMTiL0MUagjlATaGZgWKDcj1OSYDhCY61iMCu3pW82b5lEx8oJdK11SG+nXrgFsS8bd5/nmmJdeLiGNJ9L+2YsmDCcwPBpaS76YKxChKBrD4p7UY87EkphuX7bSTYrexe15d7g5ebvxqSEnktW5eGtpswsGSZjMEB3lyA1AmjfpemaWK+7ljZh5i/iZkEMoLJVqj7iysmKFM2bunhB+7ybjSyvntI=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"a0e4169ee4ba41d5aceeff5ed61df201"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1/pending?api-version=7.2&request_id=a0e4169ee4ba41d5aceeff5ed61df201',
  'Retry-After',
  '0',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'e6d4730e-5c7d-477c-bfea-b68a46309390',
  'x-ms-request-id',
  'f168297b-9571-47a9-a634-9fda1a519f4e',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:29:28 GMT',
  'Content-Length',
  '1379'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAqkk542XVAH9alOK461Uc0ca3zgQg7TsrMSqOFJ1QoeYFGQZ3TBqAMtsnsCa3BZuLo6Si6O+Cem3w9YjS2wLGFpTRN+palY7JFalogsRIdP3U4+yXOsZIeIDjVFfeZsWKfW8h83ROZb8MdVmVxQqvhMgutVD87n+RUCjsNdfgiN0NXzY3ZKeqcJ0F+0sJy14FRvPvaKffJZca6I5BGWEfKpm8aijMRQyxkFdqiX5eayXxWgQfSiSr815HuW0gp9Wu5+6AW1nArs3TWNe6Y45moqQc/2UBLcCoW3HGYgcvP+/cuUmmj/N2K3Z9MNyJmsRy2fq4xNoUax76VXojbeH7rQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAD7oGmCZlbE9iTvGPbGtxgpTrHCrmPVzyik+r2Ms3A00SyU/4RIOiRgmBDjXeMitYhaFtYO+4BMdKE1kzo0AWwO/BDw0gYRhmzYrAMeexXPrT6DPCcHRHsQcD9fMTiL0MUagjlATaGZgWKDcj1OSYDhCY61iMCu3pW82b5lEx8oJdK11SG+nXrgFsS8bd5/nmmJdeLiGNJ9L+2YsmDCcwPBpaS76YKxChKBrD4p7UY87EkphuX7bSTYrexe15d7g5ebvxqSEnktW5eGtpswsGSZjMEB3lyA1AmjfpemaWK+7ljZh5i/iZkEMoLJVqj7iysmKFM2bunhB+7ybjSyvntI=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"a0e4169ee4ba41d5aceeff5ed61df201"}, [
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
  '54a41dd3-39a9-4288-a23f-989338270ce3',
  'x-ms-request-id',
  '7bdf86ea-a90d-4edd-8679-c1b72385514f',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:29:28 GMT',
  'Content-Length',
  '1379'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAqkk542XVAH9alOK461Uc0ca3zgQg7TsrMSqOFJ1QoeYFGQZ3TBqAMtsnsCa3BZuLo6Si6O+Cem3w9YjS2wLGFpTRN+palY7JFalogsRIdP3U4+yXOsZIeIDjVFfeZsWKfW8h83ROZb8MdVmVxQqvhMgutVD87n+RUCjsNdfgiN0NXzY3ZKeqcJ0F+0sJy14FRvPvaKffJZca6I5BGWEfKpm8aijMRQyxkFdqiX5eayXxWgQfSiSr815HuW0gp9Wu5+6AW1nArs3TWNe6Y45moqQc/2UBLcCoW3HGYgcvP+/cuUmmj/N2K3Z9MNyJmsRy2fq4xNoUax76VXojbeH7rQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAD7oGmCZlbE9iTvGPbGtxgpTrHCrmPVzyik+r2Ms3A00SyU/4RIOiRgmBDjXeMitYhaFtYO+4BMdKE1kzo0AWwO/BDw0gYRhmzYrAMeexXPrT6DPCcHRHsQcD9fMTiL0MUagjlATaGZgWKDcj1OSYDhCY61iMCu3pW82b5lEx8oJdK11SG+nXrgFsS8bd5/nmmJdeLiGNJ9L+2YsmDCcwPBpaS76YKxChKBrD4p7UY87EkphuX7bSTYrexe15d7g5ebvxqSEnktW5eGtpswsGSZjMEB3lyA1AmjfpemaWK+7ljZh5i/iZkEMoLJVqj7iysmKFM2bunhB+7ybjSyvntI=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"a0e4169ee4ba41d5aceeff5ed61df201"}, [
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
  'b3832d88-6711-487b-9739-802c866c9a2d',
  'x-ms-request-id',
  '7fc7c109-fb48-4b38-9ce6-5cc4af1530d1',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:29:28 GMT',
  'Content-Length',
  '1379'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAqkk542XVAH9alOK461Uc0ca3zgQg7TsrMSqOFJ1QoeYFGQZ3TBqAMtsnsCa3BZuLo6Si6O+Cem3w9YjS2wLGFpTRN+palY7JFalogsRIdP3U4+yXOsZIeIDjVFfeZsWKfW8h83ROZb8MdVmVxQqvhMgutVD87n+RUCjsNdfgiN0NXzY3ZKeqcJ0F+0sJy14FRvPvaKffJZca6I5BGWEfKpm8aijMRQyxkFdqiX5eayXxWgQfSiSr815HuW0gp9Wu5+6AW1nArs3TWNe6Y45moqQc/2UBLcCoW3HGYgcvP+/cuUmmj/N2K3Z9MNyJmsRy2fq4xNoUax76VXojbeH7rQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAD7oGmCZlbE9iTvGPbGtxgpTrHCrmPVzyik+r2Ms3A00SyU/4RIOiRgmBDjXeMitYhaFtYO+4BMdKE1kzo0AWwO/BDw0gYRhmzYrAMeexXPrT6DPCcHRHsQcD9fMTiL0MUagjlATaGZgWKDcj1OSYDhCY61iMCu3pW82b5lEx8oJdK11SG+nXrgFsS8bd5/nmmJdeLiGNJ9L+2YsmDCcwPBpaS76YKxChKBrD4p7UY87EkphuX7bSTYrexe15d7g5ebvxqSEnktW5eGtpswsGSZjMEB3lyA1AmjfpemaWK+7ljZh5i/iZkEMoLJVqj7iysmKFM2bunhB+7ybjSyvntI=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"a0e4169ee4ba41d5aceeff5ed61df201"}, [
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
  '5b2cbe32-7cce-4c68-a459-49c3290e91f8',
  'x-ms-request-id',
  '8aea7011-b80c-4ba5-985b-afea4b8ec478',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:29:30 GMT',
  'Content-Length',
  '1379'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAqkk542XVAH9alOK461Uc0ca3zgQg7TsrMSqOFJ1QoeYFGQZ3TBqAMtsnsCa3BZuLo6Si6O+Cem3w9YjS2wLGFpTRN+palY7JFalogsRIdP3U4+yXOsZIeIDjVFfeZsWKfW8h83ROZb8MdVmVxQqvhMgutVD87n+RUCjsNdfgiN0NXzY3ZKeqcJ0F+0sJy14FRvPvaKffJZca6I5BGWEfKpm8aijMRQyxkFdqiX5eayXxWgQfSiSr815HuW0gp9Wu5+6AW1nArs3TWNe6Y45moqQc/2UBLcCoW3HGYgcvP+/cuUmmj/N2K3Z9MNyJmsRy2fq4xNoUax76VXojbeH7rQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAD7oGmCZlbE9iTvGPbGtxgpTrHCrmPVzyik+r2Ms3A00SyU/4RIOiRgmBDjXeMitYhaFtYO+4BMdKE1kzo0AWwO/BDw0gYRhmzYrAMeexXPrT6DPCcHRHsQcD9fMTiL0MUagjlATaGZgWKDcj1OSYDhCY61iMCu3pW82b5lEx8oJdK11SG+nXrgFsS8bd5/nmmJdeLiGNJ9L+2YsmDCcwPBpaS76YKxChKBrD4p7UY87EkphuX7bSTYrexe15d7g5ebvxqSEnktW5eGtpswsGSZjMEB3lyA1AmjfpemaWK+7ljZh5i/iZkEMoLJVqj7iysmKFM2bunhB+7ybjSyvntI=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"a0e4169ee4ba41d5aceeff5ed61df201"}, [
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
  '0ab913c4-e828-4dc5-9fcb-cf9728e85861',
  'x-ms-request-id',
  '92401173-e833-453c-a43e-660a40234fd9',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:29:32 GMT',
  'Content-Length',
  '1379'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAqkk542XVAH9alOK461Uc0ca3zgQg7TsrMSqOFJ1QoeYFGQZ3TBqAMtsnsCa3BZuLo6Si6O+Cem3w9YjS2wLGFpTRN+palY7JFalogsRIdP3U4+yXOsZIeIDjVFfeZsWKfW8h83ROZb8MdVmVxQqvhMgutVD87n+RUCjsNdfgiN0NXzY3ZKeqcJ0F+0sJy14FRvPvaKffJZca6I5BGWEfKpm8aijMRQyxkFdqiX5eayXxWgQfSiSr815HuW0gp9Wu5+6AW1nArs3TWNe6Y45moqQc/2UBLcCoW3HGYgcvP+/cuUmmj/N2K3Z9MNyJmsRy2fq4xNoUax76VXojbeH7rQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAD7oGmCZlbE9iTvGPbGtxgpTrHCrmPVzyik+r2Ms3A00SyU/4RIOiRgmBDjXeMitYhaFtYO+4BMdKE1kzo0AWwO/BDw0gYRhmzYrAMeexXPrT6DPCcHRHsQcD9fMTiL0MUagjlATaGZgWKDcj1OSYDhCY61iMCu3pW82b5lEx8oJdK11SG+nXrgFsS8bd5/nmmJdeLiGNJ9L+2YsmDCcwPBpaS76YKxChKBrD4p7UY87EkphuX7bSTYrexe15d7g5ebvxqSEnktW5eGtpswsGSZjMEB3lyA1AmjfpemaWK+7ljZh5i/iZkEMoLJVqj7iysmKFM2bunhB+7ybjSyvntI=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"a0e4169ee4ba41d5aceeff5ed61df201"}, [
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
  '7ebce8b2-fe20-49fc-a99f-b28ae6d4677d',
  'x-ms-request-id',
  '84097c62-247a-4f50-8364-583bb5cfbe94',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:29:35 GMT',
  'Content-Length',
  '1379'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAqkk542XVAH9alOK461Uc0ca3zgQg7TsrMSqOFJ1QoeYFGQZ3TBqAMtsnsCa3BZuLo6Si6O+Cem3w9YjS2wLGFpTRN+palY7JFalogsRIdP3U4+yXOsZIeIDjVFfeZsWKfW8h83ROZb8MdVmVxQqvhMgutVD87n+RUCjsNdfgiN0NXzY3ZKeqcJ0F+0sJy14FRvPvaKffJZca6I5BGWEfKpm8aijMRQyxkFdqiX5eayXxWgQfSiSr815HuW0gp9Wu5+6AW1nArs3TWNe6Y45moqQc/2UBLcCoW3HGYgcvP+/cuUmmj/N2K3Z9MNyJmsRy2fq4xNoUax76VXojbeH7rQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAD7oGmCZlbE9iTvGPbGtxgpTrHCrmPVzyik+r2Ms3A00SyU/4RIOiRgmBDjXeMitYhaFtYO+4BMdKE1kzo0AWwO/BDw0gYRhmzYrAMeexXPrT6DPCcHRHsQcD9fMTiL0MUagjlATaGZgWKDcj1OSYDhCY61iMCu3pW82b5lEx8oJdK11SG+nXrgFsS8bd5/nmmJdeLiGNJ9L+2YsmDCcwPBpaS76YKxChKBrD4p7UY87EkphuX7bSTYrexe15d7g5ebvxqSEnktW5eGtpswsGSZjMEB3lyA1AmjfpemaWK+7ljZh5i/iZkEMoLJVqj7iysmKFM2bunhB+7ybjSyvntI=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"a0e4169ee4ba41d5aceeff5ed61df201"}, [
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
  'b244e318-5cc3-462a-a580-db5aa9b5140a',
  'x-ms-request-id',
  '9eff2782-92cd-47ca-a91d-36c8f8717fe8',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:29:37 GMT',
  'Content-Length',
  '1379'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAqkk542XVAH9alOK461Uc0ca3zgQg7TsrMSqOFJ1QoeYFGQZ3TBqAMtsnsCa3BZuLo6Si6O+Cem3w9YjS2wLGFpTRN+palY7JFalogsRIdP3U4+yXOsZIeIDjVFfeZsWKfW8h83ROZb8MdVmVxQqvhMgutVD87n+RUCjsNdfgiN0NXzY3ZKeqcJ0F+0sJy14FRvPvaKffJZca6I5BGWEfKpm8aijMRQyxkFdqiX5eayXxWgQfSiSr815HuW0gp9Wu5+6AW1nArs3TWNe6Y45moqQc/2UBLcCoW3HGYgcvP+/cuUmmj/N2K3Z9MNyJmsRy2fq4xNoUax76VXojbeH7rQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAD7oGmCZlbE9iTvGPbGtxgpTrHCrmPVzyik+r2Ms3A00SyU/4RIOiRgmBDjXeMitYhaFtYO+4BMdKE1kzo0AWwO/BDw0gYRhmzYrAMeexXPrT6DPCcHRHsQcD9fMTiL0MUagjlATaGZgWKDcj1OSYDhCY61iMCu3pW82b5lEx8oJdK11SG+nXrgFsS8bd5/nmmJdeLiGNJ9L+2YsmDCcwPBpaS76YKxChKBrD4p7UY87EkphuX7bSTYrexe15d7g5ebvxqSEnktW5eGtpswsGSZjMEB3lyA1AmjfpemaWK+7ljZh5i/iZkEMoLJVqj7iysmKFM2bunhB+7ybjSyvntI=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"a0e4169ee4ba41d5aceeff5ed61df201"}, [
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
  'ad3a10d7-16b8-4800-934c-0f667df947b6',
  'x-ms-request-id',
  '06edfe3a-2481-41e7-b984-de163d10ab70',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:29:39 GMT',
  'Content-Length',
  '1379'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAqkk542XVAH9alOK461Uc0ca3zgQg7TsrMSqOFJ1QoeYFGQZ3TBqAMtsnsCa3BZuLo6Si6O+Cem3w9YjS2wLGFpTRN+palY7JFalogsRIdP3U4+yXOsZIeIDjVFfeZsWKfW8h83ROZb8MdVmVxQqvhMgutVD87n+RUCjsNdfgiN0NXzY3ZKeqcJ0F+0sJy14FRvPvaKffJZca6I5BGWEfKpm8aijMRQyxkFdqiX5eayXxWgQfSiSr815HuW0gp9Wu5+6AW1nArs3TWNe6Y45moqQc/2UBLcCoW3HGYgcvP+/cuUmmj/N2K3Z9MNyJmsRy2fq4xNoUax76VXojbeH7rQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAD7oGmCZlbE9iTvGPbGtxgpTrHCrmPVzyik+r2Ms3A00SyU/4RIOiRgmBDjXeMitYhaFtYO+4BMdKE1kzo0AWwO/BDw0gYRhmzYrAMeexXPrT6DPCcHRHsQcD9fMTiL0MUagjlATaGZgWKDcj1OSYDhCY61iMCu3pW82b5lEx8oJdK11SG+nXrgFsS8bd5/nmmJdeLiGNJ9L+2YsmDCcwPBpaS76YKxChKBrD4p7UY87EkphuX7bSTYrexe15d7g5ebvxqSEnktW5eGtpswsGSZjMEB3lyA1AmjfpemaWK+7ljZh5i/iZkEMoLJVqj7iysmKFM2bunhB+7ybjSyvntI=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"a0e4169ee4ba41d5aceeff5ed61df201"}, [
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
  '6a051ab4-8f2c-4a74-b487-692610667d52',
  'x-ms-request-id',
  '33eac3d4-d072-4470-a69d-4f70b1bf92ce',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:29:41 GMT',
  'Content-Length',
  '1379'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAqkk542XVAH9alOK461Uc0ca3zgQg7TsrMSqOFJ1QoeYFGQZ3TBqAMtsnsCa3BZuLo6Si6O+Cem3w9YjS2wLGFpTRN+palY7JFalogsRIdP3U4+yXOsZIeIDjVFfeZsWKfW8h83ROZb8MdVmVxQqvhMgutVD87n+RUCjsNdfgiN0NXzY3ZKeqcJ0F+0sJy14FRvPvaKffJZca6I5BGWEfKpm8aijMRQyxkFdqiX5eayXxWgQfSiSr815HuW0gp9Wu5+6AW1nArs3TWNe6Y45moqQc/2UBLcCoW3HGYgcvP+/cuUmmj/N2K3Z9MNyJmsRy2fq4xNoUax76VXojbeH7rQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAD7oGmCZlbE9iTvGPbGtxgpTrHCrmPVzyik+r2Ms3A00SyU/4RIOiRgmBDjXeMitYhaFtYO+4BMdKE1kzo0AWwO/BDw0gYRhmzYrAMeexXPrT6DPCcHRHsQcD9fMTiL0MUagjlATaGZgWKDcj1OSYDhCY61iMCu3pW82b5lEx8oJdK11SG+nXrgFsS8bd5/nmmJdeLiGNJ9L+2YsmDCcwPBpaS76YKxChKBrD4p7UY87EkphuX7bSTYrexe15d7g5ebvxqSEnktW5eGtpswsGSZjMEB3lyA1AmjfpemaWK+7ljZh5i/iZkEMoLJVqj7iysmKFM2bunhB+7ybjSyvntI=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"a0e4169ee4ba41d5aceeff5ed61df201"}, [
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
  '32c0d141-bb2b-4949-8fef-5110745c53c2',
  'x-ms-request-id',
  '715df6c6-44df-46d5-ba41-69cfff54e49f',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:29:43 GMT',
  'Content-Length',
  '1379'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAqkk542XVAH9alOK461Uc0ca3zgQg7TsrMSqOFJ1QoeYFGQZ3TBqAMtsnsCa3BZuLo6Si6O+Cem3w9YjS2wLGFpTRN+palY7JFalogsRIdP3U4+yXOsZIeIDjVFfeZsWKfW8h83ROZb8MdVmVxQqvhMgutVD87n+RUCjsNdfgiN0NXzY3ZKeqcJ0F+0sJy14FRvPvaKffJZca6I5BGWEfKpm8aijMRQyxkFdqiX5eayXxWgQfSiSr815HuW0gp9Wu5+6AW1nArs3TWNe6Y45moqQc/2UBLcCoW3HGYgcvP+/cuUmmj/N2K3Z9MNyJmsRy2fq4xNoUax76VXojbeH7rQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAD7oGmCZlbE9iTvGPbGtxgpTrHCrmPVzyik+r2Ms3A00SyU/4RIOiRgmBDjXeMitYhaFtYO+4BMdKE1kzo0AWwO/BDw0gYRhmzYrAMeexXPrT6DPCcHRHsQcD9fMTiL0MUagjlATaGZgWKDcj1OSYDhCY61iMCu3pW82b5lEx8oJdK11SG+nXrgFsS8bd5/nmmJdeLiGNJ9L+2YsmDCcwPBpaS76YKxChKBrD4p7UY87EkphuX7bSTYrexe15d7g5ebvxqSEnktW5eGtpswsGSZjMEB3lyA1AmjfpemaWK+7ljZh5i/iZkEMoLJVqj7iysmKFM2bunhB+7ybjSyvntI=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"a0e4169ee4ba41d5aceeff5ed61df201"}, [
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
  '5ef98bb2-e660-4f71-a128-1e4503f8376d',
  'x-ms-request-id',
  '943c3707-7d57-4013-b7d3-99fd9461e960',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:29:46 GMT',
  'Content-Length',
  '1379'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAqkk542XVAH9alOK461Uc0ca3zgQg7TsrMSqOFJ1QoeYFGQZ3TBqAMtsnsCa3BZuLo6Si6O+Cem3w9YjS2wLGFpTRN+palY7JFalogsRIdP3U4+yXOsZIeIDjVFfeZsWKfW8h83ROZb8MdVmVxQqvhMgutVD87n+RUCjsNdfgiN0NXzY3ZKeqcJ0F+0sJy14FRvPvaKffJZca6I5BGWEfKpm8aijMRQyxkFdqiX5eayXxWgQfSiSr815HuW0gp9Wu5+6AW1nArs3TWNe6Y45moqQc/2UBLcCoW3HGYgcvP+/cuUmmj/N2K3Z9MNyJmsRy2fq4xNoUax76VXojbeH7rQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAD7oGmCZlbE9iTvGPbGtxgpTrHCrmPVzyik+r2Ms3A00SyU/4RIOiRgmBDjXeMitYhaFtYO+4BMdKE1kzo0AWwO/BDw0gYRhmzYrAMeexXPrT6DPCcHRHsQcD9fMTiL0MUagjlATaGZgWKDcj1OSYDhCY61iMCu3pW82b5lEx8oJdK11SG+nXrgFsS8bd5/nmmJdeLiGNJ9L+2YsmDCcwPBpaS76YKxChKBrD4p7UY87EkphuX7bSTYrexe15d7g5ebvxqSEnktW5eGtpswsGSZjMEB3lyA1AmjfpemaWK+7ljZh5i/iZkEMoLJVqj7iysmKFM2bunhB+7ybjSyvntI=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"a0e4169ee4ba41d5aceeff5ed61df201"}, [
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
  'ab076a17-8b2c-4662-8c04-b0fc5cc528b8',
  'x-ms-request-id',
  'a484cf18-535c-4c04-b468-fabbbbf9bc55',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:29:47 GMT',
  'Content-Length',
  '1379'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAqkk542XVAH9alOK461Uc0ca3zgQg7TsrMSqOFJ1QoeYFGQZ3TBqAMtsnsCa3BZuLo6Si6O+Cem3w9YjS2wLGFpTRN+palY7JFalogsRIdP3U4+yXOsZIeIDjVFfeZsWKfW8h83ROZb8MdVmVxQqvhMgutVD87n+RUCjsNdfgiN0NXzY3ZKeqcJ0F+0sJy14FRvPvaKffJZca6I5BGWEfKpm8aijMRQyxkFdqiX5eayXxWgQfSiSr815HuW0gp9Wu5+6AW1nArs3TWNe6Y45moqQc/2UBLcCoW3HGYgcvP+/cuUmmj/N2K3Z9MNyJmsRy2fq4xNoUax76VXojbeH7rQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAD7oGmCZlbE9iTvGPbGtxgpTrHCrmPVzyik+r2Ms3A00SyU/4RIOiRgmBDjXeMitYhaFtYO+4BMdKE1kzo0AWwO/BDw0gYRhmzYrAMeexXPrT6DPCcHRHsQcD9fMTiL0MUagjlATaGZgWKDcj1OSYDhCY61iMCu3pW82b5lEx8oJdK11SG+nXrgFsS8bd5/nmmJdeLiGNJ9L+2YsmDCcwPBpaS76YKxChKBrD4p7UY87EkphuX7bSTYrexe15d7g5ebvxqSEnktW5eGtpswsGSZjMEB3lyA1AmjfpemaWK+7ljZh5i/iZkEMoLJVqj7iysmKFM2bunhB+7ybjSyvntI=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"a0e4169ee4ba41d5aceeff5ed61df201"}, [
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
  '7f581ffd-b6e5-4603-af59-2f33616f2b06',
  'x-ms-request-id',
  'e6339168-363f-4ff9-8e2e-1538fbe8fc6c',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:29:49 GMT',
  'Content-Length',
  '1379'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAqkk542XVAH9alOK461Uc0ca3zgQg7TsrMSqOFJ1QoeYFGQZ3TBqAMtsnsCa3BZuLo6Si6O+Cem3w9YjS2wLGFpTRN+palY7JFalogsRIdP3U4+yXOsZIeIDjVFfeZsWKfW8h83ROZb8MdVmVxQqvhMgutVD87n+RUCjsNdfgiN0NXzY3ZKeqcJ0F+0sJy14FRvPvaKffJZca6I5BGWEfKpm8aijMRQyxkFdqiX5eayXxWgQfSiSr815HuW0gp9Wu5+6AW1nArs3TWNe6Y45moqQc/2UBLcCoW3HGYgcvP+/cuUmmj/N2K3Z9MNyJmsRy2fq4xNoUax76VXojbeH7rQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAD7oGmCZlbE9iTvGPbGtxgpTrHCrmPVzyik+r2Ms3A00SyU/4RIOiRgmBDjXeMitYhaFtYO+4BMdKE1kzo0AWwO/BDw0gYRhmzYrAMeexXPrT6DPCcHRHsQcD9fMTiL0MUagjlATaGZgWKDcj1OSYDhCY61iMCu3pW82b5lEx8oJdK11SG+nXrgFsS8bd5/nmmJdeLiGNJ9L+2YsmDCcwPBpaS76YKxChKBrD4p7UY87EkphuX7bSTYrexe15d7g5ebvxqSEnktW5eGtpswsGSZjMEB3lyA1AmjfpemaWK+7ljZh5i/iZkEMoLJVqj7iysmKFM2bunhB+7ybjSyvntI=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"a0e4169ee4ba41d5aceeff5ed61df201"}, [
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
  '933b2d56-13f4-42e7-b09f-22e6582eafb3',
  'x-ms-request-id',
  'fabefe8a-a259-4636-a859-71b9607efccb',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:29:51 GMT',
  'Content-Length',
  '1379'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAqkk542XVAH9alOK461Uc0ca3zgQg7TsrMSqOFJ1QoeYFGQZ3TBqAMtsnsCa3BZuLo6Si6O+Cem3w9YjS2wLGFpTRN+palY7JFalogsRIdP3U4+yXOsZIeIDjVFfeZsWKfW8h83ROZb8MdVmVxQqvhMgutVD87n+RUCjsNdfgiN0NXzY3ZKeqcJ0F+0sJy14FRvPvaKffJZca6I5BGWEfKpm8aijMRQyxkFdqiX5eayXxWgQfSiSr815HuW0gp9Wu5+6AW1nArs3TWNe6Y45moqQc/2UBLcCoW3HGYgcvP+/cuUmmj/N2K3Z9MNyJmsRy2fq4xNoUax76VXojbeH7rQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAD7oGmCZlbE9iTvGPbGtxgpTrHCrmPVzyik+r2Ms3A00SyU/4RIOiRgmBDjXeMitYhaFtYO+4BMdKE1kzo0AWwO/BDw0gYRhmzYrAMeexXPrT6DPCcHRHsQcD9fMTiL0MUagjlATaGZgWKDcj1OSYDhCY61iMCu3pW82b5lEx8oJdK11SG+nXrgFsS8bd5/nmmJdeLiGNJ9L+2YsmDCcwPBpaS76YKxChKBrD4p7UY87EkphuX7bSTYrexe15d7g5ebvxqSEnktW5eGtpswsGSZjMEB3lyA1AmjfpemaWK+7ljZh5i/iZkEMoLJVqj7iysmKFM2bunhB+7ybjSyvntI=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"a0e4169ee4ba41d5aceeff5ed61df201"}, [
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
  'd65cdb75-51e3-42b1-b672-ea75a6828d8e',
  'x-ms-request-id',
  '5511a11f-2ede-4197-a7a6-12885c393516',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:29:53 GMT',
  'Content-Length',
  '1379'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAqkk542XVAH9alOK461Uc0ca3zgQg7TsrMSqOFJ1QoeYFGQZ3TBqAMtsnsCa3BZuLo6Si6O+Cem3w9YjS2wLGFpTRN+palY7JFalogsRIdP3U4+yXOsZIeIDjVFfeZsWKfW8h83ROZb8MdVmVxQqvhMgutVD87n+RUCjsNdfgiN0NXzY3ZKeqcJ0F+0sJy14FRvPvaKffJZca6I5BGWEfKpm8aijMRQyxkFdqiX5eayXxWgQfSiSr815HuW0gp9Wu5+6AW1nArs3TWNe6Y45moqQc/2UBLcCoW3HGYgcvP+/cuUmmj/N2K3Z9MNyJmsRy2fq4xNoUax76VXojbeH7rQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAD7oGmCZlbE9iTvGPbGtxgpTrHCrmPVzyik+r2Ms3A00SyU/4RIOiRgmBDjXeMitYhaFtYO+4BMdKE1kzo0AWwO/BDw0gYRhmzYrAMeexXPrT6DPCcHRHsQcD9fMTiL0MUagjlATaGZgWKDcj1OSYDhCY61iMCu3pW82b5lEx8oJdK11SG+nXrgFsS8bd5/nmmJdeLiGNJ9L+2YsmDCcwPBpaS76YKxChKBrD4p7UY87EkphuX7bSTYrexe15d7g5ebvxqSEnktW5eGtpswsGSZjMEB3lyA1AmjfpemaWK+7ljZh5i/iZkEMoLJVqj7iysmKFM2bunhB+7ybjSyvntI=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"a0e4169ee4ba41d5aceeff5ed61df201"}, [
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
  '8ff3d6f0-d1da-419d-8a0d-f6e869352ed6',
  'x-ms-request-id',
  '0b74446a-8ec6-4225-9abf-947f4fa6e13e',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:29:56 GMT',
  'Content-Length',
  '1379'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAqkk542XVAH9alOK461Uc0ca3zgQg7TsrMSqOFJ1QoeYFGQZ3TBqAMtsnsCa3BZuLo6Si6O+Cem3w9YjS2wLGFpTRN+palY7JFalogsRIdP3U4+yXOsZIeIDjVFfeZsWKfW8h83ROZb8MdVmVxQqvhMgutVD87n+RUCjsNdfgiN0NXzY3ZKeqcJ0F+0sJy14FRvPvaKffJZca6I5BGWEfKpm8aijMRQyxkFdqiX5eayXxWgQfSiSr815HuW0gp9Wu5+6AW1nArs3TWNe6Y45moqQc/2UBLcCoW3HGYgcvP+/cuUmmj/N2K3Z9MNyJmsRy2fq4xNoUax76VXojbeH7rQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAD7oGmCZlbE9iTvGPbGtxgpTrHCrmPVzyik+r2Ms3A00SyU/4RIOiRgmBDjXeMitYhaFtYO+4BMdKE1kzo0AWwO/BDw0gYRhmzYrAMeexXPrT6DPCcHRHsQcD9fMTiL0MUagjlATaGZgWKDcj1OSYDhCY61iMCu3pW82b5lEx8oJdK11SG+nXrgFsS8bd5/nmmJdeLiGNJ9L+2YsmDCcwPBpaS76YKxChKBrD4p7UY87EkphuX7bSTYrexe15d7g5ebvxqSEnktW5eGtpswsGSZjMEB3lyA1AmjfpemaWK+7ljZh5i/iZkEMoLJVqj7iysmKFM2bunhB+7ybjSyvntI=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"a0e4169ee4ba41d5aceeff5ed61df201"}, [
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
  '46bb1828-edba-49f4-89a8-e504bf65722f',
  'x-ms-request-id',
  'e6a16330-0d43-45e0-b33c-5602c99fcde0',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:29:58 GMT',
  'Content-Length',
  '1379'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAqkk542XVAH9alOK461Uc0ca3zgQg7TsrMSqOFJ1QoeYFGQZ3TBqAMtsnsCa3BZuLo6Si6O+Cem3w9YjS2wLGFpTRN+palY7JFalogsRIdP3U4+yXOsZIeIDjVFfeZsWKfW8h83ROZb8MdVmVxQqvhMgutVD87n+RUCjsNdfgiN0NXzY3ZKeqcJ0F+0sJy14FRvPvaKffJZca6I5BGWEfKpm8aijMRQyxkFdqiX5eayXxWgQfSiSr815HuW0gp9Wu5+6AW1nArs3TWNe6Y45moqQc/2UBLcCoW3HGYgcvP+/cuUmmj/N2K3Z9MNyJmsRy2fq4xNoUax76VXojbeH7rQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAD7oGmCZlbE9iTvGPbGtxgpTrHCrmPVzyik+r2Ms3A00SyU/4RIOiRgmBDjXeMitYhaFtYO+4BMdKE1kzo0AWwO/BDw0gYRhmzYrAMeexXPrT6DPCcHRHsQcD9fMTiL0MUagjlATaGZgWKDcj1OSYDhCY61iMCu3pW82b5lEx8oJdK11SG+nXrgFsS8bd5/nmmJdeLiGNJ9L+2YsmDCcwPBpaS76YKxChKBrD4p7UY87EkphuX7bSTYrexe15d7g5ebvxqSEnktW5eGtpswsGSZjMEB3lyA1AmjfpemaWK+7ljZh5i/iZkEMoLJVqj7iysmKFM2bunhB+7ybjSyvntI=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"a0e4169ee4ba41d5aceeff5ed61df201"}, [
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
  'f3731ce7-0e2b-4db1-bf70-e68474de261a',
  'x-ms-request-id',
  'c9643af4-eda1-436a-aedf-d57b55256f83',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:29:59 GMT',
  'Content-Length',
  '1379'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAqkk542XVAH9alOK461Uc0ca3zgQg7TsrMSqOFJ1QoeYFGQZ3TBqAMtsnsCa3BZuLo6Si6O+Cem3w9YjS2wLGFpTRN+palY7JFalogsRIdP3U4+yXOsZIeIDjVFfeZsWKfW8h83ROZb8MdVmVxQqvhMgutVD87n+RUCjsNdfgiN0NXzY3ZKeqcJ0F+0sJy14FRvPvaKffJZca6I5BGWEfKpm8aijMRQyxkFdqiX5eayXxWgQfSiSr815HuW0gp9Wu5+6AW1nArs3TWNe6Y45moqQc/2UBLcCoW3HGYgcvP+/cuUmmj/N2K3Z9MNyJmsRy2fq4xNoUax76VXojbeH7rQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAD7oGmCZlbE9iTvGPbGtxgpTrHCrmPVzyik+r2Ms3A00SyU/4RIOiRgmBDjXeMitYhaFtYO+4BMdKE1kzo0AWwO/BDw0gYRhmzYrAMeexXPrT6DPCcHRHsQcD9fMTiL0MUagjlATaGZgWKDcj1OSYDhCY61iMCu3pW82b5lEx8oJdK11SG+nXrgFsS8bd5/nmmJdeLiGNJ9L+2YsmDCcwPBpaS76YKxChKBrD4p7UY87EkphuX7bSTYrexe15d7g5ebvxqSEnktW5eGtpswsGSZjMEB3lyA1AmjfpemaWK+7ljZh5i/iZkEMoLJVqj7iysmKFM2bunhB+7ybjSyvntI=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"a0e4169ee4ba41d5aceeff5ed61df201"}, [
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
  'bb4f3c7f-3a6c-46eb-8ab7-d7165f6b568b',
  'x-ms-request-id',
  '10277bf3-d4b3-4555-8508-52ffa4ddad6b',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:30:02 GMT',
  'Content-Length',
  '1379'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAqkk542XVAH9alOK461Uc0ca3zgQg7TsrMSqOFJ1QoeYFGQZ3TBqAMtsnsCa3BZuLo6Si6O+Cem3w9YjS2wLGFpTRN+palY7JFalogsRIdP3U4+yXOsZIeIDjVFfeZsWKfW8h83ROZb8MdVmVxQqvhMgutVD87n+RUCjsNdfgiN0NXzY3ZKeqcJ0F+0sJy14FRvPvaKffJZca6I5BGWEfKpm8aijMRQyxkFdqiX5eayXxWgQfSiSr815HuW0gp9Wu5+6AW1nArs3TWNe6Y45moqQc/2UBLcCoW3HGYgcvP+/cuUmmj/N2K3Z9MNyJmsRy2fq4xNoUax76VXojbeH7rQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAD7oGmCZlbE9iTvGPbGtxgpTrHCrmPVzyik+r2Ms3A00SyU/4RIOiRgmBDjXeMitYhaFtYO+4BMdKE1kzo0AWwO/BDw0gYRhmzYrAMeexXPrT6DPCcHRHsQcD9fMTiL0MUagjlATaGZgWKDcj1OSYDhCY61iMCu3pW82b5lEx8oJdK11SG+nXrgFsS8bd5/nmmJdeLiGNJ9L+2YsmDCcwPBpaS76YKxChKBrD4p7UY87EkphuX7bSTYrexe15d7g5ebvxqSEnktW5eGtpswsGSZjMEB3lyA1AmjfpemaWK+7ljZh5i/iZkEMoLJVqj7iysmKFM2bunhB+7ybjSyvntI=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"a0e4169ee4ba41d5aceeff5ed61df201"}, [
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
  'bb933bb8-6307-4d00-ac62-0955f04e6eb2',
  'x-ms-request-id',
  'c0cef93e-8a8d-4740-b497-3c3b5d6a1b65',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:30:03 GMT',
  'Content-Length',
  '1379'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAqkk542XVAH9alOK461Uc0ca3zgQg7TsrMSqOFJ1QoeYFGQZ3TBqAMtsnsCa3BZuLo6Si6O+Cem3w9YjS2wLGFpTRN+palY7JFalogsRIdP3U4+yXOsZIeIDjVFfeZsWKfW8h83ROZb8MdVmVxQqvhMgutVD87n+RUCjsNdfgiN0NXzY3ZKeqcJ0F+0sJy14FRvPvaKffJZca6I5BGWEfKpm8aijMRQyxkFdqiX5eayXxWgQfSiSr815HuW0gp9Wu5+6AW1nArs3TWNe6Y45moqQc/2UBLcCoW3HGYgcvP+/cuUmmj/N2K3Z9MNyJmsRy2fq4xNoUax76VXojbeH7rQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAD7oGmCZlbE9iTvGPbGtxgpTrHCrmPVzyik+r2Ms3A00SyU/4RIOiRgmBDjXeMitYhaFtYO+4BMdKE1kzo0AWwO/BDw0gYRhmzYrAMeexXPrT6DPCcHRHsQcD9fMTiL0MUagjlATaGZgWKDcj1OSYDhCY61iMCu3pW82b5lEx8oJdK11SG+nXrgFsS8bd5/nmmJdeLiGNJ9L+2YsmDCcwPBpaS76YKxChKBrD4p7UY87EkphuX7bSTYrexe15d7g5ebvxqSEnktW5eGtpswsGSZjMEB3lyA1AmjfpemaWK+7ljZh5i/iZkEMoLJVqj7iysmKFM2bunhB+7ybjSyvntI=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"a0e4169ee4ba41d5aceeff5ed61df201"}, [
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
  '0540c77b-ffe6-4921-b661-9591ae6b3bae',
  'x-ms-request-id',
  '4f89777c-25ef-4300-a4cb-50c4ab648560',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:30:06 GMT',
  'Content-Length',
  '1379'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAqkk542XVAH9alOK461Uc0ca3zgQg7TsrMSqOFJ1QoeYFGQZ3TBqAMtsnsCa3BZuLo6Si6O+Cem3w9YjS2wLGFpTRN+palY7JFalogsRIdP3U4+yXOsZIeIDjVFfeZsWKfW8h83ROZb8MdVmVxQqvhMgutVD87n+RUCjsNdfgiN0NXzY3ZKeqcJ0F+0sJy14FRvPvaKffJZca6I5BGWEfKpm8aijMRQyxkFdqiX5eayXxWgQfSiSr815HuW0gp9Wu5+6AW1nArs3TWNe6Y45moqQc/2UBLcCoW3HGYgcvP+/cuUmmj/N2K3Z9MNyJmsRy2fq4xNoUax76VXojbeH7rQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAD7oGmCZlbE9iTvGPbGtxgpTrHCrmPVzyik+r2Ms3A00SyU/4RIOiRgmBDjXeMitYhaFtYO+4BMdKE1kzo0AWwO/BDw0gYRhmzYrAMeexXPrT6DPCcHRHsQcD9fMTiL0MUagjlATaGZgWKDcj1OSYDhCY61iMCu3pW82b5lEx8oJdK11SG+nXrgFsS8bd5/nmmJdeLiGNJ9L+2YsmDCcwPBpaS76YKxChKBrD4p7UY87EkphuX7bSTYrexe15d7g5ebvxqSEnktW5eGtpswsGSZjMEB3lyA1AmjfpemaWK+7ljZh5i/iZkEMoLJVqj7iysmKFM2bunhB+7ybjSyvntI=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"a0e4169ee4ba41d5aceeff5ed61df201"}, [
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
  '1d51019b-8885-4c75-b174-f2b6d0119ed0',
  'x-ms-request-id',
  '4ceff73f-479e-4172-833a-9d158b273b7b',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:30:08 GMT',
  'Content-Length',
  '1379'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAqkk542XVAH9alOK461Uc0ca3zgQg7TsrMSqOFJ1QoeYFGQZ3TBqAMtsnsCa3BZuLo6Si6O+Cem3w9YjS2wLGFpTRN+palY7JFalogsRIdP3U4+yXOsZIeIDjVFfeZsWKfW8h83ROZb8MdVmVxQqvhMgutVD87n+RUCjsNdfgiN0NXzY3ZKeqcJ0F+0sJy14FRvPvaKffJZca6I5BGWEfKpm8aijMRQyxkFdqiX5eayXxWgQfSiSr815HuW0gp9Wu5+6AW1nArs3TWNe6Y45moqQc/2UBLcCoW3HGYgcvP+/cuUmmj/N2K3Z9MNyJmsRy2fq4xNoUax76VXojbeH7rQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAD7oGmCZlbE9iTvGPbGtxgpTrHCrmPVzyik+r2Ms3A00SyU/4RIOiRgmBDjXeMitYhaFtYO+4BMdKE1kzo0AWwO/BDw0gYRhmzYrAMeexXPrT6DPCcHRHsQcD9fMTiL0MUagjlATaGZgWKDcj1OSYDhCY61iMCu3pW82b5lEx8oJdK11SG+nXrgFsS8bd5/nmmJdeLiGNJ9L+2YsmDCcwPBpaS76YKxChKBrD4p7UY87EkphuX7bSTYrexe15d7g5ebvxqSEnktW5eGtpswsGSZjMEB3lyA1AmjfpemaWK+7ljZh5i/iZkEMoLJVqj7iysmKFM2bunhB+7ybjSyvntI=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"a0e4169ee4ba41d5aceeff5ed61df201"}, [
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
  '05bf3cd5-3298-4085-aaf8-676407a41974',
  'x-ms-request-id',
  '0a28b5fb-e7b1-421f-b3df-829faac5370e',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:30:11 GMT',
  'Content-Length',
  '1379'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAqkk542XVAH9alOK461Uc0ca3zgQg7TsrMSqOFJ1QoeYFGQZ3TBqAMtsnsCa3BZuLo6Si6O+Cem3w9YjS2wLGFpTRN+palY7JFalogsRIdP3U4+yXOsZIeIDjVFfeZsWKfW8h83ROZb8MdVmVxQqvhMgutVD87n+RUCjsNdfgiN0NXzY3ZKeqcJ0F+0sJy14FRvPvaKffJZca6I5BGWEfKpm8aijMRQyxkFdqiX5eayXxWgQfSiSr815HuW0gp9Wu5+6AW1nArs3TWNe6Y45moqQc/2UBLcCoW3HGYgcvP+/cuUmmj/N2K3Z9MNyJmsRy2fq4xNoUax76VXojbeH7rQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAD7oGmCZlbE9iTvGPbGtxgpTrHCrmPVzyik+r2Ms3A00SyU/4RIOiRgmBDjXeMitYhaFtYO+4BMdKE1kzo0AWwO/BDw0gYRhmzYrAMeexXPrT6DPCcHRHsQcD9fMTiL0MUagjlATaGZgWKDcj1OSYDhCY61iMCu3pW82b5lEx8oJdK11SG+nXrgFsS8bd5/nmmJdeLiGNJ9L+2YsmDCcwPBpaS76YKxChKBrD4p7UY87EkphuX7bSTYrexe15d7g5ebvxqSEnktW5eGtpswsGSZjMEB3lyA1AmjfpemaWK+7ljZh5i/iZkEMoLJVqj7iysmKFM2bunhB+7ybjSyvntI=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"a0e4169ee4ba41d5aceeff5ed61df201"}, [
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
  'c9b48c1f-bce1-4572-8da9-4567a51d05d7',
  'x-ms-request-id',
  '5930bec6-b7f2-488c-8533-cd5182558c12',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:30:12 GMT',
  'Content-Length',
  '1379'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAqkk542XVAH9alOK461Uc0ca3zgQg7TsrMSqOFJ1QoeYFGQZ3TBqAMtsnsCa3BZuLo6Si6O+Cem3w9YjS2wLGFpTRN+palY7JFalogsRIdP3U4+yXOsZIeIDjVFfeZsWKfW8h83ROZb8MdVmVxQqvhMgutVD87n+RUCjsNdfgiN0NXzY3ZKeqcJ0F+0sJy14FRvPvaKffJZca6I5BGWEfKpm8aijMRQyxkFdqiX5eayXxWgQfSiSr815HuW0gp9Wu5+6AW1nArs3TWNe6Y45moqQc/2UBLcCoW3HGYgcvP+/cuUmmj/N2K3Z9MNyJmsRy2fq4xNoUax76VXojbeH7rQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAD7oGmCZlbE9iTvGPbGtxgpTrHCrmPVzyik+r2Ms3A00SyU/4RIOiRgmBDjXeMitYhaFtYO+4BMdKE1kzo0AWwO/BDw0gYRhmzYrAMeexXPrT6DPCcHRHsQcD9fMTiL0MUagjlATaGZgWKDcj1OSYDhCY61iMCu3pW82b5lEx8oJdK11SG+nXrgFsS8bd5/nmmJdeLiGNJ9L+2YsmDCcwPBpaS76YKxChKBrD4p7UY87EkphuX7bSTYrexe15d7g5ebvxqSEnktW5eGtpswsGSZjMEB3lyA1AmjfpemaWK+7ljZh5i/iZkEMoLJVqj7iysmKFM2bunhB+7ybjSyvntI=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"a0e4169ee4ba41d5aceeff5ed61df201"}, [
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
  '624defe0-307a-4f82-9d3a-a5d690f33e59',
  'x-ms-request-id',
  'e28ff6a1-cd27-473a-aa18-f45246111f08',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:30:14 GMT',
  'Content-Length',
  '1379'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAqkk542XVAH9alOK461Uc0ca3zgQg7TsrMSqOFJ1QoeYFGQZ3TBqAMtsnsCa3BZuLo6Si6O+Cem3w9YjS2wLGFpTRN+palY7JFalogsRIdP3U4+yXOsZIeIDjVFfeZsWKfW8h83ROZb8MdVmVxQqvhMgutVD87n+RUCjsNdfgiN0NXzY3ZKeqcJ0F+0sJy14FRvPvaKffJZca6I5BGWEfKpm8aijMRQyxkFdqiX5eayXxWgQfSiSr815HuW0gp9Wu5+6AW1nArs3TWNe6Y45moqQc/2UBLcCoW3HGYgcvP+/cuUmmj/N2K3Z9MNyJmsRy2fq4xNoUax76VXojbeH7rQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAD7oGmCZlbE9iTvGPbGtxgpTrHCrmPVzyik+r2Ms3A00SyU/4RIOiRgmBDjXeMitYhaFtYO+4BMdKE1kzo0AWwO/BDw0gYRhmzYrAMeexXPrT6DPCcHRHsQcD9fMTiL0MUagjlATaGZgWKDcj1OSYDhCY61iMCu3pW82b5lEx8oJdK11SG+nXrgFsS8bd5/nmmJdeLiGNJ9L+2YsmDCcwPBpaS76YKxChKBrD4p7UY87EkphuX7bSTYrexe15d7g5ebvxqSEnktW5eGtpswsGSZjMEB3lyA1AmjfpemaWK+7ljZh5i/iZkEMoLJVqj7iysmKFM2bunhB+7ybjSyvntI=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"a0e4169ee4ba41d5aceeff5ed61df201"}, [
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
  'a3ee073e-0962-497a-a2c9-f601f3c7ab2a',
  'x-ms-request-id',
  '9ebffd72-af9c-45de-8954-4bce83737a18',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:30:17 GMT',
  'Content-Length',
  '1379'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAqkk542XVAH9alOK461Uc0ca3zgQg7TsrMSqOFJ1QoeYFGQZ3TBqAMtsnsCa3BZuLo6Si6O+Cem3w9YjS2wLGFpTRN+palY7JFalogsRIdP3U4+yXOsZIeIDjVFfeZsWKfW8h83ROZb8MdVmVxQqvhMgutVD87n+RUCjsNdfgiN0NXzY3ZKeqcJ0F+0sJy14FRvPvaKffJZca6I5BGWEfKpm8aijMRQyxkFdqiX5eayXxWgQfSiSr815HuW0gp9Wu5+6AW1nArs3TWNe6Y45moqQc/2UBLcCoW3HGYgcvP+/cuUmmj/N2K3Z9MNyJmsRy2fq4xNoUax76VXojbeH7rQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAD7oGmCZlbE9iTvGPbGtxgpTrHCrmPVzyik+r2Ms3A00SyU/4RIOiRgmBDjXeMitYhaFtYO+4BMdKE1kzo0AWwO/BDw0gYRhmzYrAMeexXPrT6DPCcHRHsQcD9fMTiL0MUagjlATaGZgWKDcj1OSYDhCY61iMCu3pW82b5lEx8oJdK11SG+nXrgFsS8bd5/nmmJdeLiGNJ9L+2YsmDCcwPBpaS76YKxChKBrD4p7UY87EkphuX7bSTYrexe15d7g5ebvxqSEnktW5eGtpswsGSZjMEB3lyA1AmjfpemaWK+7ljZh5i/iZkEMoLJVqj7iysmKFM2bunhB+7ybjSyvntI=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"a0e4169ee4ba41d5aceeff5ed61df201"}, [
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
  'f840acf9-f3b2-4734-923f-2c3fa0d00fbe',
  'x-ms-request-id',
  'a72cdc00-8688-4e5a-afa3-8957f3ccdf17',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:30:19 GMT',
  'Content-Length',
  '1379'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAqkk542XVAH9alOK461Uc0ca3zgQg7TsrMSqOFJ1QoeYFGQZ3TBqAMtsnsCa3BZuLo6Si6O+Cem3w9YjS2wLGFpTRN+palY7JFalogsRIdP3U4+yXOsZIeIDjVFfeZsWKfW8h83ROZb8MdVmVxQqvhMgutVD87n+RUCjsNdfgiN0NXzY3ZKeqcJ0F+0sJy14FRvPvaKffJZca6I5BGWEfKpm8aijMRQyxkFdqiX5eayXxWgQfSiSr815HuW0gp9Wu5+6AW1nArs3TWNe6Y45moqQc/2UBLcCoW3HGYgcvP+/cuUmmj/N2K3Z9MNyJmsRy2fq4xNoUax76VXojbeH7rQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAD7oGmCZlbE9iTvGPbGtxgpTrHCrmPVzyik+r2Ms3A00SyU/4RIOiRgmBDjXeMitYhaFtYO+4BMdKE1kzo0AWwO/BDw0gYRhmzYrAMeexXPrT6DPCcHRHsQcD9fMTiL0MUagjlATaGZgWKDcj1OSYDhCY61iMCu3pW82b5lEx8oJdK11SG+nXrgFsS8bd5/nmmJdeLiGNJ9L+2YsmDCcwPBpaS76YKxChKBrD4p7UY87EkphuX7bSTYrexe15d7g5ebvxqSEnktW5eGtpswsGSZjMEB3lyA1AmjfpemaWK+7ljZh5i/iZkEMoLJVqj7iysmKFM2bunhB+7ybjSyvntI=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"a0e4169ee4ba41d5aceeff5ed61df201"}, [
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
  '99ed9da3-ce60-4838-bd4b-78dc1a1464d7',
  'x-ms-request-id',
  '401242e5-e8ef-4454-b8d2-79eb8727ffe8',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:30:20 GMT',
  'Content-Length',
  '1379'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAqkk542XVAH9alOK461Uc0ca3zgQg7TsrMSqOFJ1QoeYFGQZ3TBqAMtsnsCa3BZuLo6Si6O+Cem3w9YjS2wLGFpTRN+palY7JFalogsRIdP3U4+yXOsZIeIDjVFfeZsWKfW8h83ROZb8MdVmVxQqvhMgutVD87n+RUCjsNdfgiN0NXzY3ZKeqcJ0F+0sJy14FRvPvaKffJZca6I5BGWEfKpm8aijMRQyxkFdqiX5eayXxWgQfSiSr815HuW0gp9Wu5+6AW1nArs3TWNe6Y45moqQc/2UBLcCoW3HGYgcvP+/cuUmmj/N2K3Z9MNyJmsRy2fq4xNoUax76VXojbeH7rQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAD7oGmCZlbE9iTvGPbGtxgpTrHCrmPVzyik+r2Ms3A00SyU/4RIOiRgmBDjXeMitYhaFtYO+4BMdKE1kzo0AWwO/BDw0gYRhmzYrAMeexXPrT6DPCcHRHsQcD9fMTiL0MUagjlATaGZgWKDcj1OSYDhCY61iMCu3pW82b5lEx8oJdK11SG+nXrgFsS8bd5/nmmJdeLiGNJ9L+2YsmDCcwPBpaS76YKxChKBrD4p7UY87EkphuX7bSTYrexe15d7g5ebvxqSEnktW5eGtpswsGSZjMEB3lyA1AmjfpemaWK+7ljZh5i/iZkEMoLJVqj7iysmKFM2bunhB+7ybjSyvntI=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"a0e4169ee4ba41d5aceeff5ed61df201"}, [
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
  '08025e3b-8f50-42f2-8e29-e3cd7ac2277c',
  'x-ms-request-id',
  '389ab633-8fd3-4a58-a79d-8f298b8d03e2',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:30:22 GMT',
  'Content-Length',
  '1379'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAqkk542XVAH9alOK461Uc0ca3zgQg7TsrMSqOFJ1QoeYFGQZ3TBqAMtsnsCa3BZuLo6Si6O+Cem3w9YjS2wLGFpTRN+palY7JFalogsRIdP3U4+yXOsZIeIDjVFfeZsWKfW8h83ROZb8MdVmVxQqvhMgutVD87n+RUCjsNdfgiN0NXzY3ZKeqcJ0F+0sJy14FRvPvaKffJZca6I5BGWEfKpm8aijMRQyxkFdqiX5eayXxWgQfSiSr815HuW0gp9Wu5+6AW1nArs3TWNe6Y45moqQc/2UBLcCoW3HGYgcvP+/cuUmmj/N2K3Z9MNyJmsRy2fq4xNoUax76VXojbeH7rQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAD7oGmCZlbE9iTvGPbGtxgpTrHCrmPVzyik+r2Ms3A00SyU/4RIOiRgmBDjXeMitYhaFtYO+4BMdKE1kzo0AWwO/BDw0gYRhmzYrAMeexXPrT6DPCcHRHsQcD9fMTiL0MUagjlATaGZgWKDcj1OSYDhCY61iMCu3pW82b5lEx8oJdK11SG+nXrgFsS8bd5/nmmJdeLiGNJ9L+2YsmDCcwPBpaS76YKxChKBrD4p7UY87EkphuX7bSTYrexe15d7g5ebvxqSEnktW5eGtpswsGSZjMEB3lyA1AmjfpemaWK+7ljZh5i/iZkEMoLJVqj7iysmKFM2bunhB+7ybjSyvntI=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"a0e4169ee4ba41d5aceeff5ed61df201"}, [
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
  '636e582d-7552-408a-81f4-0216882da119',
  'x-ms-request-id',
  '36017273-679e-4849-b537-1ed2cd41a4e9',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:30:25 GMT',
  'Content-Length',
  '1379'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAqkk542XVAH9alOK461Uc0ca3zgQg7TsrMSqOFJ1QoeYFGQZ3TBqAMtsnsCa3BZuLo6Si6O+Cem3w9YjS2wLGFpTRN+palY7JFalogsRIdP3U4+yXOsZIeIDjVFfeZsWKfW8h83ROZb8MdVmVxQqvhMgutVD87n+RUCjsNdfgiN0NXzY3ZKeqcJ0F+0sJy14FRvPvaKffJZca6I5BGWEfKpm8aijMRQyxkFdqiX5eayXxWgQfSiSr815HuW0gp9Wu5+6AW1nArs3TWNe6Y45moqQc/2UBLcCoW3HGYgcvP+/cuUmmj/N2K3Z9MNyJmsRy2fq4xNoUax76VXojbeH7rQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAD7oGmCZlbE9iTvGPbGtxgpTrHCrmPVzyik+r2Ms3A00SyU/4RIOiRgmBDjXeMitYhaFtYO+4BMdKE1kzo0AWwO/BDw0gYRhmzYrAMeexXPrT6DPCcHRHsQcD9fMTiL0MUagjlATaGZgWKDcj1OSYDhCY61iMCu3pW82b5lEx8oJdK11SG+nXrgFsS8bd5/nmmJdeLiGNJ9L+2YsmDCcwPBpaS76YKxChKBrD4p7UY87EkphuX7bSTYrexe15d7g5ebvxqSEnktW5eGtpswsGSZjMEB3lyA1AmjfpemaWK+7ljZh5i/iZkEMoLJVqj7iysmKFM2bunhB+7ybjSyvntI=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"a0e4169ee4ba41d5aceeff5ed61df201"}, [
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
  'a4118340-e044-45a0-8ed8-e4ea8503f722',
  'x-ms-request-id',
  '7db64f7e-20fa-4675-89da-a4a4fa38e514',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:30:27 GMT',
  'Content-Length',
  '1379'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAqkk542XVAH9alOK461Uc0ca3zgQg7TsrMSqOFJ1QoeYFGQZ3TBqAMtsnsCa3BZuLo6Si6O+Cem3w9YjS2wLGFpTRN+palY7JFalogsRIdP3U4+yXOsZIeIDjVFfeZsWKfW8h83ROZb8MdVmVxQqvhMgutVD87n+RUCjsNdfgiN0NXzY3ZKeqcJ0F+0sJy14FRvPvaKffJZca6I5BGWEfKpm8aijMRQyxkFdqiX5eayXxWgQfSiSr815HuW0gp9Wu5+6AW1nArs3TWNe6Y45moqQc/2UBLcCoW3HGYgcvP+/cuUmmj/N2K3Z9MNyJmsRy2fq4xNoUax76VXojbeH7rQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAD7oGmCZlbE9iTvGPbGtxgpTrHCrmPVzyik+r2Ms3A00SyU/4RIOiRgmBDjXeMitYhaFtYO+4BMdKE1kzo0AWwO/BDw0gYRhmzYrAMeexXPrT6DPCcHRHsQcD9fMTiL0MUagjlATaGZgWKDcj1OSYDhCY61iMCu3pW82b5lEx8oJdK11SG+nXrgFsS8bd5/nmmJdeLiGNJ9L+2YsmDCcwPBpaS76YKxChKBrD4p7UY87EkphuX7bSTYrexe15d7g5ebvxqSEnktW5eGtpswsGSZjMEB3lyA1AmjfpemaWK+7ljZh5i/iZkEMoLJVqj7iysmKFM2bunhB+7ybjSyvntI=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"a0e4169ee4ba41d5aceeff5ed61df201"}, [
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
  'ba91ae26-6c09-4c3a-be8f-1772cdfe0977',
  'x-ms-request-id',
  'cac467d6-bd1b-4906-a71c-1a178c4e26d9',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:30:29 GMT',
  'Content-Length',
  '1379'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAqkk542XVAH9alOK461Uc0ca3zgQg7TsrMSqOFJ1QoeYFGQZ3TBqAMtsnsCa3BZuLo6Si6O+Cem3w9YjS2wLGFpTRN+palY7JFalogsRIdP3U4+yXOsZIeIDjVFfeZsWKfW8h83ROZb8MdVmVxQqvhMgutVD87n+RUCjsNdfgiN0NXzY3ZKeqcJ0F+0sJy14FRvPvaKffJZca6I5BGWEfKpm8aijMRQyxkFdqiX5eayXxWgQfSiSr815HuW0gp9Wu5+6AW1nArs3TWNe6Y45moqQc/2UBLcCoW3HGYgcvP+/cuUmmj/N2K3Z9MNyJmsRy2fq4xNoUax76VXojbeH7rQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAD7oGmCZlbE9iTvGPbGtxgpTrHCrmPVzyik+r2Ms3A00SyU/4RIOiRgmBDjXeMitYhaFtYO+4BMdKE1kzo0AWwO/BDw0gYRhmzYrAMeexXPrT6DPCcHRHsQcD9fMTiL0MUagjlATaGZgWKDcj1OSYDhCY61iMCu3pW82b5lEx8oJdK11SG+nXrgFsS8bd5/nmmJdeLiGNJ9L+2YsmDCcwPBpaS76YKxChKBrD4p7UY87EkphuX7bSTYrexe15d7g5ebvxqSEnktW5eGtpswsGSZjMEB3lyA1AmjfpemaWK+7ljZh5i/iZkEMoLJVqj7iysmKFM2bunhB+7ybjSyvntI=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"a0e4169ee4ba41d5aceeff5ed61df201"}, [
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
  'cd90c253-cadc-4a78-a173-6b57ff192f7a',
  'x-ms-request-id',
  '8c8850a2-e58b-4710-adbc-16c7f5b83ebc',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:30:31 GMT',
  'Content-Length',
  '1379'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAqkk542XVAH9alOK461Uc0ca3zgQg7TsrMSqOFJ1QoeYFGQZ3TBqAMtsnsCa3BZuLo6Si6O+Cem3w9YjS2wLGFpTRN+palY7JFalogsRIdP3U4+yXOsZIeIDjVFfeZsWKfW8h83ROZb8MdVmVxQqvhMgutVD87n+RUCjsNdfgiN0NXzY3ZKeqcJ0F+0sJy14FRvPvaKffJZca6I5BGWEfKpm8aijMRQyxkFdqiX5eayXxWgQfSiSr815HuW0gp9Wu5+6AW1nArs3TWNe6Y45moqQc/2UBLcCoW3HGYgcvP+/cuUmmj/N2K3Z9MNyJmsRy2fq4xNoUax76VXojbeH7rQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAD7oGmCZlbE9iTvGPbGtxgpTrHCrmPVzyik+r2Ms3A00SyU/4RIOiRgmBDjXeMitYhaFtYO+4BMdKE1kzo0AWwO/BDw0gYRhmzYrAMeexXPrT6DPCcHRHsQcD9fMTiL0MUagjlATaGZgWKDcj1OSYDhCY61iMCu3pW82b5lEx8oJdK11SG+nXrgFsS8bd5/nmmJdeLiGNJ9L+2YsmDCcwPBpaS76YKxChKBrD4p7UY87EkphuX7bSTYrexe15d7g5ebvxqSEnktW5eGtpswsGSZjMEB3lyA1AmjfpemaWK+7ljZh5i/iZkEMoLJVqj7iysmKFM2bunhB+7ybjSyvntI=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"a0e4169ee4ba41d5aceeff5ed61df201"}, [
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
  '5239be82-53dc-4bc2-9807-91a027a00788',
  'x-ms-request-id',
  'cf795a45-af52-47fb-a687-aa70965f0b33',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:30:33 GMT',
  'Content-Length',
  '1379'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAqkk542XVAH9alOK461Uc0ca3zgQg7TsrMSqOFJ1QoeYFGQZ3TBqAMtsnsCa3BZuLo6Si6O+Cem3w9YjS2wLGFpTRN+palY7JFalogsRIdP3U4+yXOsZIeIDjVFfeZsWKfW8h83ROZb8MdVmVxQqvhMgutVD87n+RUCjsNdfgiN0NXzY3ZKeqcJ0F+0sJy14FRvPvaKffJZca6I5BGWEfKpm8aijMRQyxkFdqiX5eayXxWgQfSiSr815HuW0gp9Wu5+6AW1nArs3TWNe6Y45moqQc/2UBLcCoW3HGYgcvP+/cuUmmj/N2K3Z9MNyJmsRy2fq4xNoUax76VXojbeH7rQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAD7oGmCZlbE9iTvGPbGtxgpTrHCrmPVzyik+r2Ms3A00SyU/4RIOiRgmBDjXeMitYhaFtYO+4BMdKE1kzo0AWwO/BDw0gYRhmzYrAMeexXPrT6DPCcHRHsQcD9fMTiL0MUagjlATaGZgWKDcj1OSYDhCY61iMCu3pW82b5lEx8oJdK11SG+nXrgFsS8bd5/nmmJdeLiGNJ9L+2YsmDCcwPBpaS76YKxChKBrD4p7UY87EkphuX7bSTYrexe15d7g5ebvxqSEnktW5eGtpswsGSZjMEB3lyA1AmjfpemaWK+7ljZh5i/iZkEMoLJVqj7iysmKFM2bunhB+7ybjSyvntI=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"a0e4169ee4ba41d5aceeff5ed61df201"}, [
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
  '287d660f-7e89-40bb-a200-659e0664d191',
  'x-ms-request-id',
  '9d3e8b0b-781d-4ccf-80eb-f1ca82a82e58',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:30:36 GMT',
  'Content-Length',
  '1379'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAqkk542XVAH9alOK461Uc0ca3zgQg7TsrMSqOFJ1QoeYFGQZ3TBqAMtsnsCa3BZuLo6Si6O+Cem3w9YjS2wLGFpTRN+palY7JFalogsRIdP3U4+yXOsZIeIDjVFfeZsWKfW8h83ROZb8MdVmVxQqvhMgutVD87n+RUCjsNdfgiN0NXzY3ZKeqcJ0F+0sJy14FRvPvaKffJZca6I5BGWEfKpm8aijMRQyxkFdqiX5eayXxWgQfSiSr815HuW0gp9Wu5+6AW1nArs3TWNe6Y45moqQc/2UBLcCoW3HGYgcvP+/cuUmmj/N2K3Z9MNyJmsRy2fq4xNoUax76VXojbeH7rQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAD7oGmCZlbE9iTvGPbGtxgpTrHCrmPVzyik+r2Ms3A00SyU/4RIOiRgmBDjXeMitYhaFtYO+4BMdKE1kzo0AWwO/BDw0gYRhmzYrAMeexXPrT6DPCcHRHsQcD9fMTiL0MUagjlATaGZgWKDcj1OSYDhCY61iMCu3pW82b5lEx8oJdK11SG+nXrgFsS8bd5/nmmJdeLiGNJ9L+2YsmDCcwPBpaS76YKxChKBrD4p7UY87EkphuX7bSTYrexe15d7g5ebvxqSEnktW5eGtpswsGSZjMEB3lyA1AmjfpemaWK+7ljZh5i/iZkEMoLJVqj7iysmKFM2bunhB+7ybjSyvntI=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"a0e4169ee4ba41d5aceeff5ed61df201"}, [
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
  '96ea82cd-2652-44a8-b100-eda93c0eeb36',
  'x-ms-request-id',
  'dbd0d033-e73f-49dd-a035-4e45c893180f',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:30:37 GMT',
  'Content-Length',
  '1379'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAqkk542XVAH9alOK461Uc0ca3zgQg7TsrMSqOFJ1QoeYFGQZ3TBqAMtsnsCa3BZuLo6Si6O+Cem3w9YjS2wLGFpTRN+palY7JFalogsRIdP3U4+yXOsZIeIDjVFfeZsWKfW8h83ROZb8MdVmVxQqvhMgutVD87n+RUCjsNdfgiN0NXzY3ZKeqcJ0F+0sJy14FRvPvaKffJZca6I5BGWEfKpm8aijMRQyxkFdqiX5eayXxWgQfSiSr815HuW0gp9Wu5+6AW1nArs3TWNe6Y45moqQc/2UBLcCoW3HGYgcvP+/cuUmmj/N2K3Z9MNyJmsRy2fq4xNoUax76VXojbeH7rQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAD7oGmCZlbE9iTvGPbGtxgpTrHCrmPVzyik+r2Ms3A00SyU/4RIOiRgmBDjXeMitYhaFtYO+4BMdKE1kzo0AWwO/BDw0gYRhmzYrAMeexXPrT6DPCcHRHsQcD9fMTiL0MUagjlATaGZgWKDcj1OSYDhCY61iMCu3pW82b5lEx8oJdK11SG+nXrgFsS8bd5/nmmJdeLiGNJ9L+2YsmDCcwPBpaS76YKxChKBrD4p7UY87EkphuX7bSTYrexe15d7g5ebvxqSEnktW5eGtpswsGSZjMEB3lyA1AmjfpemaWK+7ljZh5i/iZkEMoLJVqj7iysmKFM2bunhB+7ybjSyvntI=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"a0e4169ee4ba41d5aceeff5ed61df201"}, [
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
  '41b6b382-18cb-44cb-970e-66d54c3fb328',
  'x-ms-request-id',
  'd1835049-6623-458e-b554-53b358fe6ee1',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:30:40 GMT',
  'Content-Length',
  '1379'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAqkk542XVAH9alOK461Uc0ca3zgQg7TsrMSqOFJ1QoeYFGQZ3TBqAMtsnsCa3BZuLo6Si6O+Cem3w9YjS2wLGFpTRN+palY7JFalogsRIdP3U4+yXOsZIeIDjVFfeZsWKfW8h83ROZb8MdVmVxQqvhMgutVD87n+RUCjsNdfgiN0NXzY3ZKeqcJ0F+0sJy14FRvPvaKffJZca6I5BGWEfKpm8aijMRQyxkFdqiX5eayXxWgQfSiSr815HuW0gp9Wu5+6AW1nArs3TWNe6Y45moqQc/2UBLcCoW3HGYgcvP+/cuUmmj/N2K3Z9MNyJmsRy2fq4xNoUax76VXojbeH7rQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAD7oGmCZlbE9iTvGPbGtxgpTrHCrmPVzyik+r2Ms3A00SyU/4RIOiRgmBDjXeMitYhaFtYO+4BMdKE1kzo0AWwO/BDw0gYRhmzYrAMeexXPrT6DPCcHRHsQcD9fMTiL0MUagjlATaGZgWKDcj1OSYDhCY61iMCu3pW82b5lEx8oJdK11SG+nXrgFsS8bd5/nmmJdeLiGNJ9L+2YsmDCcwPBpaS76YKxChKBrD4p7UY87EkphuX7bSTYrexe15d7g5ebvxqSEnktW5eGtpswsGSZjMEB3lyA1AmjfpemaWK+7ljZh5i/iZkEMoLJVqj7iysmKFM2bunhB+7ybjSyvntI=","cancellation_requested":false,"status":"completed","target":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1","request_id":"a0e4169ee4ba41d5aceeff5ed61df201"}, [
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
  '5cf33a59-370c-4a8e-a64d-840ac86d772d',
  'x-ms-request-id',
  '13cfce1d-f930-4452-8703-d407d991ae92',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:30:42 GMT',
  'Content-Length',
  '1385'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1/')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1/6cfb692a881b4c338b41de2abe1f7af7","kid":"https://keyvault_name.vault.azure.net/keys/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1/6cfb692a881b4c338b41de2abe1f7af7","sid":"https://keyvault_name.vault.azure.net/secrets/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1/6cfb692a881b4c338b41de2abe1f7af7","x5t":"Knu3KcHBOE5OWZCphh5wN8pg87k","cer":"MIIDKDCCAhCgAwIBAgIQGWV6dxALR/mlT7Rw2w4lRDANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjEwNDI4MjIyMDQxWhcNMjIwNDI4MjIzMDQxWjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQCqSTnjZdUAf1qU4rjrVRzRxrfOBCDtOysxKo4UnVCh5gUZBndMGoAy2yewJrcFm4ujpKLo74J6bfD1iNLbAsYWlNE36lqVjskVqWiCxEh0/dTj7Jc6xkh4gONUV95mxYp9byHzdE5lvwx1WZXFCq+EyC61UPzuf5FQKOw11+CI3Q1fNjdkp6pwnQX7SwnLXgVG8+9op98llxrojkEZYR8qmbxqKMxFDLGQV2qJfl5rJfFaBB9KJKvzXke5bSCn1a7n7oBbWcCuzdNY17pjjmaipBz/ZQEtwKhbccZiBy8/79y5SaaP83Yrdn0w3ImaxHLZ+rjE2hRrHvpVeiNt4futAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBQc2DN7VPyEBTNuKGo6q9oTLSFPqDAdBgNVHQ4EFgQUHNgze1T8hAUzbihqOqvaEy0hT6gwDQYJKoZIhvcNAQELBQADggEBADQhp3DPD4e/P7GTET2KX3O1WGY6MkXSMGHb74YoSxaGerRUw+G9utwdZqhIWROCO2hU1N8UMrqFyAkiSdx48ukGdgmEe0qdFKOr4qshaxv1wAgQwQF1HWZBj1VvOUTvzeLXrd2mNUgkcdwZuT4RaPcdDrnevVee/zAim9Fbx6siZU/+q4IZ4N17z6vQ08B1zuWmNpTgA3D73UYPIpU8I4Ydb1rnkw+kvOwn+Wg5l5YxiPTx6i+7iRQCcxIQVJTn0zGUuk4vz25nqoMAF7VhaLZn0xpODUhMVXHtpaw4VgV4r2tJ6qtS39QEbENGDELXAQ6ejLpkJzWf8tttSrhnc8s=","attributes":{"enabled":true,"nbf":1619648441,"exp":1651185041,"created":1619649041,"updated":1619649041,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1619648968,"updated":1619648968}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1/pending"}}, [
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
  'bb64c004-bf90-408f-b2cb-cd5399e2ccd4',
  'x-ms-request-id',
  'ced17b3e-5187-42fb-94e3-9a7bd73bcb1e',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:30:42 GMT',
  'Content-Length',
  '2785'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0","deletedDate":1619649042,"scheduledPurgeDate":1627425042,"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0/55e1fad307de4fcb8f343aa3263684c8","kid":"https://keyvault_name.vault.azure.net/keys/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0/55e1fad307de4fcb8f343aa3263684c8","sid":"https://keyvault_name.vault.azure.net/secrets/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0/55e1fad307de4fcb8f343aa3263684c8","x5t":"Crme8PobQqngQY75ye-eCBQE600","cer":"MIIDKDCCAhCgAwIBAgIQA5UX7cjBQ0y15XgIm8XfSDANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjEwNDI4MjIxOTI3WhcNMjIwNDI4MjIyOTI3WjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQCYpnjkjpBqWWVoVpDNxApu7ZX+L1P/hwFcYoJT9A3a7IyGBdUwa+RMPTuc8vAnRupREMhgFSGvzyk+4mIFdsSC76GFnIrTY/dH1jCk0Co6MX5m/UIf2r8rH1I/jw0ybnp/Owux53wR7kXz0WfpwITNTnTv/yieQr+or2TSqPr+Cpnkp6stEtueEa4Nn6CpF2lQveGzKoOIpVEBO1T3WMqeI654GVvvT8wD9OxSAiSWzlLGt9bYdY/g67ans9YTys3HXkrpbCm680/TCEyoB2YpQlDXeODsAX9MYhkT9YEAuTmA8CrihihakK810edEtPzFkhMgUov94lgHGjgdTwU9AgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBQSBlsH1mXwFAFL/vhGCnhasJkrDjAdBgNVHQ4EFgQUEgZbB9Zl8BQBS/74Rgp4WrCZKw4wDQYJKoZIhvcNAQELBQADggEBAESdby4+MaxiWz4MHlPYcvnw/NHZCN6hUzyPnXmElqZB4DRevQsqulYWZCLrgVIqUKYwKKr/freAQUnMg8VHgBb5XqWMpGiN9LEhc4k19Ysf2i2MAH6M/sRxlWIbuXCCH4zNangTEQs/muY3XxJVDPIkLcY2Ky6gfxNQHcCtYODRox8euvaMdHE7rE1FIBM2ZbvDtLJSACe8hdeJ15uCfRF6bZNBkqDY8qs5p5algH1VhbC2Rd0+vDbroKCbs+PytwE/kx30x8dSjLLeE1BQoFg0GDBaWDoGW1vkN63UODDR5A6vBY3A6RJknjRf1kyM6CiKSP2H/oq+KlXUqKaYm5o=","attributes":{"enabled":true,"nbf":1619648367,"exp":1651184967,"created":1619648967,"updated":1619648967,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1619648890,"updated":1619648890}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0/pending"}}, [
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
  '5a09062d-2880-41eb-8b08-685e8310897d',
  'x-ms-request-id',
  'ba5cf7a6-965b-4424-9737-e3c62cb97e3c',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:30:42 GMT',
  'Content-Length',
  '3024'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '186',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '1f3bb276-5a6e-416a-b9cd-0270301d3b69',
  'x-ms-request-id',
  'f526732d-1169-4519-832a-68b1607a3491',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:30:42 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '186',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '14436508-6b61-49ff-976c-7538e1e4e00d',
  'x-ms-request-id',
  '4442270a-87e7-4c07-88d2-30dafe1f3f08',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:30:42 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '186',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'cff00e2e-5fdf-42a5-acb0-2474f9406a9f',
  'x-ms-request-id',
  '85e66b53-1708-4dd3-9b84-b1fe24865567',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:30:45 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '186',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '183520ac-cb2a-4496-8bf3-8f0cb4887ed5',
  'x-ms-request-id',
  'edd11a8e-8ab6-4c10-be6e-424c451c803f',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:30:46 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '186',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'b9c65f2a-30d1-4120-b1db-9c2947000cb7',
  'x-ms-request-id',
  'a834f2b2-a4cd-460c-aae0-3284800f19a9',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:30:49 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '186',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '03958e28-f625-4e07-8bbe-cd25ab90648a',
  'x-ms-request-id',
  '2f6f4398-0010-4145-8f6e-542da7733207',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:30:50 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '186',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'c1015b6f-aaf4-4a42-b348-3ea08c26bccc',
  'x-ms-request-id',
  '064783ec-8db0-488e-862a-88b107d40907',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:30:53 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '186',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '80755d78-7445-4b4f-8bf4-22e24f5254a0',
  'x-ms-request-id',
  '0be92903-8c10-424f-92e0-ebb5881c8108',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:30:55 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '186',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '92ce6721-0095-4b80-bd21-60d346eeea69',
  'x-ms-request-id',
  '082d5806-c720-4afc-bc7d-908d902f135d',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:30:57 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '186',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'cc83135c-830a-40e4-a9a9-dacb9cb21beb',
  'x-ms-request-id',
  '9db6d498-cefc-4c8b-87be-073c6fa68c72',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:30:59 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '186',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'b121829d-9aa1-4e5c-814f-7c4b005fed6f',
  'x-ms-request-id',
  '3eb43332-43d1-451e-959c-9d358268ea38',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:31:01 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '186',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '8445d7c5-dcc0-4344-abab-e9b6536a89a7',
  'x-ms-request-id',
  '0afd234a-38b8-499d-8d40-b745205a47a8',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:31:03 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '186',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '6d6309a8-c91c-49ab-a143-bed2a2de0602',
  'x-ms-request-id',
  '44339f7e-6fdb-41c7-ab65-2e8bdab6741a',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:31:05 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '186',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '06ca43a0-4a27-4dad-94aa-23094c6e7113',
  'x-ms-request-id',
  '7b0f5733-5ec7-40a1-b37f-2ab62b94cc53',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:31:07 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '186',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '46c1807f-19b3-46fa-8803-77cb7d2c6d72',
  'x-ms-request-id',
  '0de23ba2-b53e-4d7a-83dc-87ff736c8a86',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:31:09 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '186',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'e33a32bf-a2a8-4da2-ab40-5ec12cf6aeaa',
  'x-ms-request-id',
  'd64a4c7c-ffc9-44ea-b4f8-4f8b14e241b3',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:31:11 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '186',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '6baf91ca-a8df-49fb-ba00-8611ca4a769f',
  'x-ms-request-id',
  'd140862c-0aa6-4516-9949-39db155a4490',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:31:13 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '186',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '5d0505ac-2007-458b-acdf-efd9036905d0',
  'x-ms-request-id',
  'b2aa8e15-6495-4cd3-93ff-4dda809ee8e6',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:31:15 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '186',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '9e5f258a-22b3-4f3f-b54b-2f5976d8b2b5',
  'x-ms-request-id',
  'f319af22-567c-4ead-a37f-3315409ad45e',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:31:18 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '186',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '28bc9918-4c15-4074-bedc-488e9b6d4d4a',
  'x-ms-request-id',
  '4101a7dd-1616-48f6-9452-c797fb2c67e4',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:31:20 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0","deletedDate":1619649042,"scheduledPurgeDate":1627425042,"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0/55e1fad307de4fcb8f343aa3263684c8","kid":"https://keyvault_name.vault.azure.net/keys/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0/55e1fad307de4fcb8f343aa3263684c8","sid":"https://keyvault_name.vault.azure.net/secrets/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0/55e1fad307de4fcb8f343aa3263684c8","x5t":"Crme8PobQqngQY75ye-eCBQE600","cer":"MIIDKDCCAhCgAwIBAgIQA5UX7cjBQ0y15XgIm8XfSDANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjEwNDI4MjIxOTI3WhcNMjIwNDI4MjIyOTI3WjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQCYpnjkjpBqWWVoVpDNxApu7ZX+L1P/hwFcYoJT9A3a7IyGBdUwa+RMPTuc8vAnRupREMhgFSGvzyk+4mIFdsSC76GFnIrTY/dH1jCk0Co6MX5m/UIf2r8rH1I/jw0ybnp/Owux53wR7kXz0WfpwITNTnTv/yieQr+or2TSqPr+Cpnkp6stEtueEa4Nn6CpF2lQveGzKoOIpVEBO1T3WMqeI654GVvvT8wD9OxSAiSWzlLGt9bYdY/g67ans9YTys3HXkrpbCm680/TCEyoB2YpQlDXeODsAX9MYhkT9YEAuTmA8CrihihakK810edEtPzFkhMgUov94lgHGjgdTwU9AgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBQSBlsH1mXwFAFL/vhGCnhasJkrDjAdBgNVHQ4EFgQUEgZbB9Zl8BQBS/74Rgp4WrCZKw4wDQYJKoZIhvcNAQELBQADggEBAESdby4+MaxiWz4MHlPYcvnw/NHZCN6hUzyPnXmElqZB4DRevQsqulYWZCLrgVIqUKYwKKr/freAQUnMg8VHgBb5XqWMpGiN9LEhc4k19Ysf2i2MAH6M/sRxlWIbuXCCH4zNangTEQs/muY3XxJVDPIkLcY2Ky6gfxNQHcCtYODRox8euvaMdHE7rE1FIBM2ZbvDtLJSACe8hdeJ15uCfRF6bZNBkqDY8qs5p5algH1VhbC2Rd0+vDbroKCbs+PytwE/kx30x8dSjLLeE1BQoFg0GDBaWDoGW1vkN63UODDR5A6vBY3A6RJknjRf1kyM6CiKSP2H/oq+KlXUqKaYm5o=","attributes":{"enabled":true,"nbf":1619648367,"exp":1651184967,"created":1619648967,"updated":1619648967,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1619648890,"updated":1619648890}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0/pending"}}, [
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
  '43131c3e-02c3-4185-8147-a59afb08ce6f',
  'x-ms-request-id',
  '32035602-7794-4a95-b561-44a7f830bf9e',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:31:22 GMT',
  'Content-Length',
  '3024'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedcertificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--0')
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
  '46ae1c0d-93c3-4d03-980d-c65f25299627',
  'x-ms-request-id',
  '8dc7d2bd-1198-40fc-a896-87574071dc86',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:31:22 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1","deletedDate":1619649083,"scheduledPurgeDate":1627425083,"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1/6cfb692a881b4c338b41de2abe1f7af7","kid":"https://keyvault_name.vault.azure.net/keys/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1/6cfb692a881b4c338b41de2abe1f7af7","sid":"https://keyvault_name.vault.azure.net/secrets/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1/6cfb692a881b4c338b41de2abe1f7af7","x5t":"Knu3KcHBOE5OWZCphh5wN8pg87k","cer":"MIIDKDCCAhCgAwIBAgIQGWV6dxALR/mlT7Rw2w4lRDANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjEwNDI4MjIyMDQxWhcNMjIwNDI4MjIzMDQxWjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQCqSTnjZdUAf1qU4rjrVRzRxrfOBCDtOysxKo4UnVCh5gUZBndMGoAy2yewJrcFm4ujpKLo74J6bfD1iNLbAsYWlNE36lqVjskVqWiCxEh0/dTj7Jc6xkh4gONUV95mxYp9byHzdE5lvwx1WZXFCq+EyC61UPzuf5FQKOw11+CI3Q1fNjdkp6pwnQX7SwnLXgVG8+9op98llxrojkEZYR8qmbxqKMxFDLGQV2qJfl5rJfFaBB9KJKvzXke5bSCn1a7n7oBbWcCuzdNY17pjjmaipBz/ZQEtwKhbccZiBy8/79y5SaaP83Yrdn0w3ImaxHLZ+rjE2hRrHvpVeiNt4futAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBQc2DN7VPyEBTNuKGo6q9oTLSFPqDAdBgNVHQ4EFgQUHNgze1T8hAUzbihqOqvaEy0hT6gwDQYJKoZIhvcNAQELBQADggEBADQhp3DPD4e/P7GTET2KX3O1WGY6MkXSMGHb74YoSxaGerRUw+G9utwdZqhIWROCO2hU1N8UMrqFyAkiSdx48ukGdgmEe0qdFKOr4qshaxv1wAgQwQF1HWZBj1VvOUTvzeLXrd2mNUgkcdwZuT4RaPcdDrnevVee/zAim9Fbx6siZU/+q4IZ4N17z6vQ08B1zuWmNpTgA3D73UYPIpU8I4Ydb1rnkw+kvOwn+Wg5l5YxiPTx6i+7iRQCcxIQVJTn0zGUuk4vz25nqoMAF7VhaLZn0xpODUhMVXHtpaw4VgV4r2tJ6qtS39QEbENGDELXAQ6ejLpkJzWf8tttSrhnc8s=","attributes":{"enabled":true,"nbf":1619648441,"exp":1651185041,"created":1619649041,"updated":1619649041,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1619648968,"updated":1619648968}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1/pending"}}, [
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
  '551aec8e-538a-493e-a9cc-4c94a5372a75',
  'x-ms-request-id',
  'cd93f257-6645-4a1b-938e-75ce1d17d75e',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:31:22 GMT',
  'Content-Length',
  '3024'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '186',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'a940b3a7-390c-4d1d-8647-556b839dafa1',
  'x-ms-request-id',
  'd8878376-2f5c-4eec-b8d5-110f801f588b',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:31:23 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '186',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '75e5b1b2-6617-4588-9f34-b361299e332c',
  'x-ms-request-id',
  '49198361-a9e8-449f-bd66-1a3db52eda55',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:31:22 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '186',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'a9f9e658-202f-4e44-985c-c0a029c163a0',
  'x-ms-request-id',
  'cfc29a6c-160c-414d-afad-ac4794ed4c39',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:31:25 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '186',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'f485ffeb-0597-4502-889f-ccd1ccf2d643',
  'x-ms-request-id',
  'f2e802b7-8e07-4bdc-88a2-b7b39aef388a',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:31:26 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '186',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '191e555e-4af9-46f7-8783-52f0492e698d',
  'x-ms-request-id',
  '598f40ec-d8d1-47e9-9bda-5b7845f54925',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:31:29 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '186',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '87611f7f-23d3-45ce-9b15-bd992eecea2a',
  'x-ms-request-id',
  'fb75cdc9-3036-46ee-8242-76af50bd3a04',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:31:31 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '186',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '2d6692a9-bcf5-4875-bc6f-e7d5bdef4851',
  'x-ms-request-id',
  '32103d5e-4a99-43d2-9db7-aad222a5f3bc',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:31:33 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '186',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '6051e68b-3572-4a76-851d-48737b88e65e',
  'x-ms-request-id',
  '76b8ac51-525f-4232-9000-aed57a301a0b',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:31:35 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '186',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'c65d03ef-7999-4ff5-abe9-5941c1fc043e',
  'x-ms-request-id',
  'bab9cf60-a0e0-4573-9d4e-7db0a3a67f1d',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:31:37 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '186',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '3e720c20-3c38-4c63-bdfb-b37f68e252f0',
  'x-ms-request-id',
  '75e29cc1-a479-4257-856f-ccc2dcaacca9',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:31:39 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '186',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '92cacb04-e8be-4bc4-84c3-f6a1855b6262',
  'x-ms-request-id',
  '3ec461f7-9bef-4a44-8f92-d6bffd782270',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:31:41 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '186',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '888d5009-a1ce-44c7-ada7-3992767be79f',
  'x-ms-request-id',
  '5140d268-5b57-41a8-b69b-09600a6a6221',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:31:44 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '186',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '8faf9495-a972-4fc8-8dbf-c261b0f602e4',
  'x-ms-request-id',
  '2edf7d7d-d577-47c0-9c18-1856ef8461e2',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:31:46 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '186',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '7ca88a2d-66c7-4e10-9c06-8115e28d82fc',
  'x-ms-request-id',
  '189550ff-9201-4078-b6ca-a3d216412946',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:31:48 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '186',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '605bafd9-4fc5-49f5-87bc-7f52e72cd887',
  'x-ms-request-id',
  '1b279df9-6723-45e7-871e-372c6756c2dc',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:31:50 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '186',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'b727b06d-27c3-460f-8433-c7e3be7548cd',
  'x-ms-request-id',
  'ef217f27-647b-495e-98ac-b8554cb9b374',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:31:52 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '186',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '3be8dfce-4f9c-414e-91c6-ddf4c694ca7a',
  'x-ms-request-id',
  '4caf4493-5128-4f69-adde-dfc85b809037',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:31:54 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '186',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '6d257047-7fc4-4302-9fb3-22f2de3a8ad5',
  'x-ms-request-id',
  'fe0f3ab4-1f63-4de2-bedd-adf3eaef118b',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:31:56 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '186',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'b84df37e-a394-4a08-a6f8-80c73e8e34ec',
  'x-ms-request-id',
  '2469b6fb-e964-4412-8187-9db101b1d2e0',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:31:58 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1","deletedDate":1619649083,"scheduledPurgeDate":1627425083,"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1/6cfb692a881b4c338b41de2abe1f7af7","kid":"https://keyvault_name.vault.azure.net/keys/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1/6cfb692a881b4c338b41de2abe1f7af7","sid":"https://keyvault_name.vault.azure.net/secrets/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1/6cfb692a881b4c338b41de2abe1f7af7","x5t":"Knu3KcHBOE5OWZCphh5wN8pg87k","cer":"MIIDKDCCAhCgAwIBAgIQGWV6dxALR/mlT7Rw2w4lRDANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjEwNDI4MjIyMDQxWhcNMjIwNDI4MjIzMDQxWjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQCqSTnjZdUAf1qU4rjrVRzRxrfOBCDtOysxKo4UnVCh5gUZBndMGoAy2yewJrcFm4ujpKLo74J6bfD1iNLbAsYWlNE36lqVjskVqWiCxEh0/dTj7Jc6xkh4gONUV95mxYp9byHzdE5lvwx1WZXFCq+EyC61UPzuf5FQKOw11+CI3Q1fNjdkp6pwnQX7SwnLXgVG8+9op98llxrojkEZYR8qmbxqKMxFDLGQV2qJfl5rJfFaBB9KJKvzXke5bSCn1a7n7oBbWcCuzdNY17pjjmaipBz/ZQEtwKhbccZiBy8/79y5SaaP83Yrdn0w3ImaxHLZ+rjE2hRrHvpVeiNt4futAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBQc2DN7VPyEBTNuKGo6q9oTLSFPqDAdBgNVHQ4EFgQUHNgze1T8hAUzbihqOqvaEy0hT6gwDQYJKoZIhvcNAQELBQADggEBADQhp3DPD4e/P7GTET2KX3O1WGY6MkXSMGHb74YoSxaGerRUw+G9utwdZqhIWROCO2hU1N8UMrqFyAkiSdx48ukGdgmEe0qdFKOr4qshaxv1wAgQwQF1HWZBj1VvOUTvzeLXrd2mNUgkcdwZuT4RaPcdDrnevVee/zAim9Fbx6siZU/+q4IZ4N17z6vQ08B1zuWmNpTgA3D73UYPIpU8I4Ydb1rnkw+kvOwn+Wg5l5YxiPTx6i+7iRQCcxIQVJTn0zGUuk4vz25nqoMAF7VhaLZn0xpODUhMVXHtpaw4VgV4r2tJ6qtS39QEbENGDELXAQ6ejLpkJzWf8tttSrhnc8s=","attributes":{"enabled":true,"nbf":1619648441,"exp":1651185041,"created":1619649041,"updated":1619649041,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1619648968,"updated":1619648968}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1/pending"}}, [
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
  '0c9ad192-c1f1-414b-96b2-01c85b7173e2',
  'x-ms-request-id',
  '6ca32509-2fbe-4a7b-b6ca-e1323a8070c6',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:32:00 GMT',
  'Content-Length',
  '3024'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedcertificates/challengeAuthCertificateName-Onceauthenticatednewrequestsshouldnotauthenticateagain--1')
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
  'a7fe9404-d3ed-463c-b783-1a09d33faeca',
  'x-ms-request-id',
  'c02fcdc3-672f-45aa-b50e-787979331692',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:32:00 GMT'
]);

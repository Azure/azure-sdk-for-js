let nock = require('nock');

module.exports.hash = "8eb734b62d5efd0196adb683f8800301";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/certificates/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-0/create')
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
  'b4dd5448-6e7e-4fac-a1fa-15ea7e093e2c',
  'x-ms-request-id',
  '54a82c21-65af-4344-a2e9-d2583371fb79',
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
  '20e3062e-61ad-4fcf-8278-6a23b1010200',
  'x-ms-ests-server',
  '2.1.12025.15 - WUS2 ProdSlices',
  'Set-Cookie',
  'fpc=AmPkxcV5kxdBn88Tks60m_0; expires=Wed, 13-Oct-2021 19:24:20 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrcekiMddMqjEJh4vF00puA9s8Lq5LouqxBwt3vG8NXqLqqzwrLQml6LEyunmbq0Nf8v7tlNNQuO2uBxh502Ok5dA338zGP23kLDJxuauuHSbnQ0NknZhW44cimSnjOESdd6td5VjI5Uee20PpQpwI5W6Et6fzGdTWIlZLYeSCA5EgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Mon, 13 Sep 2021 19:24:20 GMT',
  'Content-Length',
  '980'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .get('/12345678-1234-1234-1234-123456789012/v2.0/.well-known/openid-configuration')
  .reply(200, {"token_endpoint":"https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/oauth2/v2.0/token","token_endpoint_auth_methods_supported":["client_secret_post","private_key_jwt","client_secret_basic"],"jwks_uri":"https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/discovery/v2.0/keys","response_modes_supported":["query","fragment","form_post"],"subject_types_supported":["pairwise"],"id_token_signing_alg_values_supported":["RS256"],"response_types_supported":["code","id_token","code id_token","id_token token"],"scopes_supported":["openid","profile","email","offline_access"],"issuer":"https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/v2.0","request_uri_parameter_supported":false,"userinfo_endpoint":"https://graph.microsoft.com/oidc/userinfo","authorization_endpoint":"https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/oauth2/v2.0/authorize","device_authorization_endpoint":"https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/oauth2/v2.0/devicecode","http_logout_supported":true,"frontchannel_logout_supported":true,"end_session_endpoint":"https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/oauth2/v2.0/logout","claims_supported":["sub","iss","cloud_instance_name","cloud_instance_host_name","cloud_graph_host_name","msgraph_host","aud","exp","iat","auth_time","acr","nonce","preferred_username","name","tid","ver","at_hash","c_hash","email"],"kerberos_endpoint":"https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/kerberos","tenant_region_scope":"WW","cloud_instance_name":"microsoftonline.com","cloud_graph_host_name":"graph.windows.net","msgraph_host":"graph.microsoft.com","rbac_url":"https://pas.windows.net"}, [
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
  'ac4cc44b-215b-4885-81c1-46e2d3412201',
  'x-ms-ests-server',
  '2.1.12025.15 - SCUS ProdSlices',
  'Set-Cookie',
  'fpc=ApT_yTtK3k9Nk-QlCnbpo_U; expires=Wed, 13-Oct-2021 19:24:20 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevrej1ivdu7dLOB6O-gu9bla9luJghCecT-jBTSlH3IUlkjYUNCBVIdzW7iF1hrhyFxZfk9bW3_uDjojae4RfcVkzBHj3txlvskdf8T4H-AMV0QaTiSxbo1l0eaPfqqsxG0bI5tzQznHLLdU6KxNjlnw35XtMM1vYvm5WlYDhPQ_tkgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Mon, 13 Sep 2021 19:24:20 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/12345678-1234-1234-1234-123456789012/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.3.0&x-client-OS=linux&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=2a09e9c2-b5cd-406d-b23a-409a0fa2a1bf&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22CP1%22%5D%7D%7D%7D")
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
  '1b071775-520b-47f3-8bb7-be4c4657e600',
  'x-ms-ests-server',
  '2.1.12025.15 - EUS ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=AnJ4cNni9ghFgRZTtc3UIeUbdhqxAQAAAGWc0dgOAAAA; expires=Wed, 13-Oct-2021 19:24:21 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Mon, 13 Sep 2021 19:24:20 GMT',
  'Content-Length',
  '1315'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/certificates/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-0/create', {"policy":{"key_props":{},"secret_props":{},"x509_props":{"subject":"cn=MyCert","sans":{}},"issuer":{"name":"Self"},"attributes":{}},"attributes":{}})
  .query(true)
  .reply(202, {"id":"https://keyvault_name.vault.azure.net/certificates/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAxlh/fQb+fpOD1H2a0dV+lnIkuqBuuuFsBcLkrovr7epuMuHwEknuoxvI6QecrrkHyVk4A9EvvxrhwNoju/iZK7+exNfgAXSMAAynrsNEgH41w56QBo5kjNAk8zcmWiGkwGGUOE49maE3hSoHmCRFeLNpA17mI0Z4C/gFhRRm460LwULjYIQosHakG0zg0jp0RCQ7QjVo+279Vtfj+xDhHGPMIL7LF5vCwqv/Ia63ZcjFClHOJ8CSRnViad4MWQXmV55mvX1d9YehQ5RMa77L8EN3Je/4e1pMq/SZF3wR/vuSH7COLW3t8DClXcvg6sknnmIZHoIOSvQtj8NhBTUZnQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBACjqPS8S3JHHMMtk/+8P502xlyZQVUINS8noX5/7u5hl7dM1SpiSDenxuwB5fG/V1sgqBkOQT2Ii1tg3dACZU7JZ9W+ceJpvCnnqABFPyHJ6NvEBXAPjbACCQ1dxJCN3tfI92PE87Z7fF5ofycCiVUvnzdhoGsgcCu+P6zKF6R8l78vHdxx5oJVWpyJqo0C3NYbkqFSniTYOIH6MPcd4JhE21qlm1RQgKJ1RqxAiD5p+yE1Aque/V6uBMHlZPUwpo9EXErhe46K99YT6zgQB2vX8sIGZ2573o28RQtY/6HDo2Usma24CJr6v/4koG63Spf1/bH/kmz64HLygU05C1eU=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"b7d0361d69754a938a3d15947e6d0ceb"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://keyvault_name.vault.azure.net/certificates/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-0/pending?api-version=7.2&request_id=b7d0361d69754a938a3d15947e6d0ceb',
  'Retry-After',
  '0',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'b4dd5448-6e7e-4fac-a1fa-15ea7e093e2c',
  'x-ms-request-id',
  'e8c57a57-1a06-41a9-af31-3b979c4b2682',
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
  'Mon, 13 Sep 2021 19:24:21 GMT',
  'Content-Length',
  '1362'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAxlh/fQb+fpOD1H2a0dV+lnIkuqBuuuFsBcLkrovr7epuMuHwEknuoxvI6QecrrkHyVk4A9EvvxrhwNoju/iZK7+exNfgAXSMAAynrsNEgH41w56QBo5kjNAk8zcmWiGkwGGUOE49maE3hSoHmCRFeLNpA17mI0Z4C/gFhRRm460LwULjYIQosHakG0zg0jp0RCQ7QjVo+279Vtfj+xDhHGPMIL7LF5vCwqv/Ia63ZcjFClHOJ8CSRnViad4MWQXmV55mvX1d9YehQ5RMa77L8EN3Je/4e1pMq/SZF3wR/vuSH7COLW3t8DClXcvg6sknnmIZHoIOSvQtj8NhBTUZnQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBACjqPS8S3JHHMMtk/+8P502xlyZQVUINS8noX5/7u5hl7dM1SpiSDenxuwB5fG/V1sgqBkOQT2Ii1tg3dACZU7JZ9W+ceJpvCnnqABFPyHJ6NvEBXAPjbACCQ1dxJCN3tfI92PE87Z7fF5ofycCiVUvnzdhoGsgcCu+P6zKF6R8l78vHdxx5oJVWpyJqo0C3NYbkqFSniTYOIH6MPcd4JhE21qlm1RQgKJ1RqxAiD5p+yE1Aque/V6uBMHlZPUwpo9EXErhe46K99YT6zgQB2vX8sIGZ2573o28RQtY/6HDo2Usma24CJr6v/4koG63Spf1/bH/kmz64HLygU05C1eU=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"b7d0361d69754a938a3d15947e6d0ceb"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Retry-After',
  '0',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '60da7c9f-4c05-46fb-9d78-8fab844d2a38',
  'x-ms-request-id',
  '9a9e4c95-acff-405e-a112-a06a009b8e60',
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
  'Mon, 13 Sep 2021 19:24:21 GMT',
  'Content-Length',
  '1362'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAxlh/fQb+fpOD1H2a0dV+lnIkuqBuuuFsBcLkrovr7epuMuHwEknuoxvI6QecrrkHyVk4A9EvvxrhwNoju/iZK7+exNfgAXSMAAynrsNEgH41w56QBo5kjNAk8zcmWiGkwGGUOE49maE3hSoHmCRFeLNpA17mI0Z4C/gFhRRm460LwULjYIQosHakG0zg0jp0RCQ7QjVo+279Vtfj+xDhHGPMIL7LF5vCwqv/Ia63ZcjFClHOJ8CSRnViad4MWQXmV55mvX1d9YehQ5RMa77L8EN3Je/4e1pMq/SZF3wR/vuSH7COLW3t8DClXcvg6sknnmIZHoIOSvQtj8NhBTUZnQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBACjqPS8S3JHHMMtk/+8P502xlyZQVUINS8noX5/7u5hl7dM1SpiSDenxuwB5fG/V1sgqBkOQT2Ii1tg3dACZU7JZ9W+ceJpvCnnqABFPyHJ6NvEBXAPjbACCQ1dxJCN3tfI92PE87Z7fF5ofycCiVUvnzdhoGsgcCu+P6zKF6R8l78vHdxx5oJVWpyJqo0C3NYbkqFSniTYOIH6MPcd4JhE21qlm1RQgKJ1RqxAiD5p+yE1Aque/V6uBMHlZPUwpo9EXErhe46K99YT6zgQB2vX8sIGZ2573o28RQtY/6HDo2Usma24CJr6v/4koG63Spf1/bH/kmz64HLygU05C1eU=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"b7d0361d69754a938a3d15947e6d0ceb"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Retry-After',
  '0',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'c5e80bb5-295e-4094-ba99-380a02d079f7',
  'x-ms-request-id',
  '3231ccd7-87a7-4c60-8f19-746ffbea973c',
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
  'Mon, 13 Sep 2021 19:24:21 GMT',
  'Content-Length',
  '1362'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAxlh/fQb+fpOD1H2a0dV+lnIkuqBuuuFsBcLkrovr7epuMuHwEknuoxvI6QecrrkHyVk4A9EvvxrhwNoju/iZK7+exNfgAXSMAAynrsNEgH41w56QBo5kjNAk8zcmWiGkwGGUOE49maE3hSoHmCRFeLNpA17mI0Z4C/gFhRRm460LwULjYIQosHakG0zg0jp0RCQ7QjVo+279Vtfj+xDhHGPMIL7LF5vCwqv/Ia63ZcjFClHOJ8CSRnViad4MWQXmV55mvX1d9YehQ5RMa77L8EN3Je/4e1pMq/SZF3wR/vuSH7COLW3t8DClXcvg6sknnmIZHoIOSvQtj8NhBTUZnQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBACjqPS8S3JHHMMtk/+8P502xlyZQVUINS8noX5/7u5hl7dM1SpiSDenxuwB5fG/V1sgqBkOQT2Ii1tg3dACZU7JZ9W+ceJpvCnnqABFPyHJ6NvEBXAPjbACCQ1dxJCN3tfI92PE87Z7fF5ofycCiVUvnzdhoGsgcCu+P6zKF6R8l78vHdxx5oJVWpyJqo0C3NYbkqFSniTYOIH6MPcd4JhE21qlm1RQgKJ1RqxAiD5p+yE1Aque/V6uBMHlZPUwpo9EXErhe46K99YT6zgQB2vX8sIGZ2573o28RQtY/6HDo2Usma24CJr6v/4koG63Spf1/bH/kmz64HLygU05C1eU=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"b7d0361d69754a938a3d15947e6d0ceb"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Retry-After',
  '0',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '7c410164-39b5-4690-ada4-342365bcd446',
  'x-ms-request-id',
  'c0d6047b-2c96-4376-a06b-6068d28b74d9',
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
  'Mon, 13 Sep 2021 19:24:23 GMT',
  'Content-Length',
  '1362'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAxlh/fQb+fpOD1H2a0dV+lnIkuqBuuuFsBcLkrovr7epuMuHwEknuoxvI6QecrrkHyVk4A9EvvxrhwNoju/iZK7+exNfgAXSMAAynrsNEgH41w56QBo5kjNAk8zcmWiGkwGGUOE49maE3hSoHmCRFeLNpA17mI0Z4C/gFhRRm460LwULjYIQosHakG0zg0jp0RCQ7QjVo+279Vtfj+xDhHGPMIL7LF5vCwqv/Ia63ZcjFClHOJ8CSRnViad4MWQXmV55mvX1d9YehQ5RMa77L8EN3Je/4e1pMq/SZF3wR/vuSH7COLW3t8DClXcvg6sknnmIZHoIOSvQtj8NhBTUZnQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBACjqPS8S3JHHMMtk/+8P502xlyZQVUINS8noX5/7u5hl7dM1SpiSDenxuwB5fG/V1sgqBkOQT2Ii1tg3dACZU7JZ9W+ceJpvCnnqABFPyHJ6NvEBXAPjbACCQ1dxJCN3tfI92PE87Z7fF5ofycCiVUvnzdhoGsgcCu+P6zKF6R8l78vHdxx5oJVWpyJqo0C3NYbkqFSniTYOIH6MPcd4JhE21qlm1RQgKJ1RqxAiD5p+yE1Aque/V6uBMHlZPUwpo9EXErhe46K99YT6zgQB2vX8sIGZ2573o28RQtY/6HDo2Usma24CJr6v/4koG63Spf1/bH/kmz64HLygU05C1eU=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"b7d0361d69754a938a3d15947e6d0ceb"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Retry-After',
  '0',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '70cba48c-2d78-4a37-b17f-13a3030321ba',
  'x-ms-request-id',
  '42e13d7e-c6bb-4dc2-8eaf-4f925310b820',
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
  'Mon, 13 Sep 2021 19:24:25 GMT',
  'Content-Length',
  '1362'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAxlh/fQb+fpOD1H2a0dV+lnIkuqBuuuFsBcLkrovr7epuMuHwEknuoxvI6QecrrkHyVk4A9EvvxrhwNoju/iZK7+exNfgAXSMAAynrsNEgH41w56QBo5kjNAk8zcmWiGkwGGUOE49maE3hSoHmCRFeLNpA17mI0Z4C/gFhRRm460LwULjYIQosHakG0zg0jp0RCQ7QjVo+279Vtfj+xDhHGPMIL7LF5vCwqv/Ia63ZcjFClHOJ8CSRnViad4MWQXmV55mvX1d9YehQ5RMa77L8EN3Je/4e1pMq/SZF3wR/vuSH7COLW3t8DClXcvg6sknnmIZHoIOSvQtj8NhBTUZnQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBACjqPS8S3JHHMMtk/+8P502xlyZQVUINS8noX5/7u5hl7dM1SpiSDenxuwB5fG/V1sgqBkOQT2Ii1tg3dACZU7JZ9W+ceJpvCnnqABFPyHJ6NvEBXAPjbACCQ1dxJCN3tfI92PE87Z7fF5ofycCiVUvnzdhoGsgcCu+P6zKF6R8l78vHdxx5oJVWpyJqo0C3NYbkqFSniTYOIH6MPcd4JhE21qlm1RQgKJ1RqxAiD5p+yE1Aque/V6uBMHlZPUwpo9EXErhe46K99YT6zgQB2vX8sIGZ2573o28RQtY/6HDo2Usma24CJr6v/4koG63Spf1/bH/kmz64HLygU05C1eU=","cancellation_requested":false,"status":"completed","target":"https://keyvault_name.vault.azure.net/certificates/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-0","request_id":"b7d0361d69754a938a3d15947e6d0ceb"}, [
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
  '7c740dd0-03a9-4aa5-9a1b-2dcdcc8fdd0e',
  'x-ms-request-id',
  'd4648636-acb0-45f5-85f3-90fa3b0dc24d',
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
  'Mon, 13 Sep 2021 19:24:27 GMT',
  'Content-Length',
  '1351'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-0/')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-0/7e38eb9c8b554567aaf9966a7bbc0764","kid":"https://keyvault_name.vault.azure.net/keys/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-0/7e38eb9c8b554567aaf9966a7bbc0764","sid":"https://keyvault_name.vault.azure.net/secrets/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-0/7e38eb9c8b554567aaf9966a7bbc0764","x5t":"wZ0wGHU5R1v-JiS--_xq3UvH69o","cer":"MIIDKDCCAhCgAwIBAgIQOEWzeNEKQECRONcuNomsIjANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjEwOTEzMTkxNDI3WhcNMjIwOTEzMTkyNDI3WjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQDGWH99Bv5+k4PUfZrR1X6WciS6oG664WwFwuSui+vt6m4y4fASSe6jG8jpB5yuuQfJWTgD0S+/GuHA2iO7+Jkrv57E1+ABdIwADKeuw0SAfjXDnpAGjmSM0CTzNyZaIaTAYZQ4Tj2ZoTeFKgeYJEV4s2kDXuYjRngL+AWFFGbjrQvBQuNghCiwdqQbTODSOnREJDtCNWj7bv1W1+P7EOEcY8wgvssXm8LCq/8hrrdlyMUKUc4nwJJGdWJp3gxZBeZXnma9fV31h6FDlExrvsvwQ3cl7/h7Wkyr9JkXfBH++5IfsI4tbe3wMKVdy+DqySeeYhkegg5K9C2Pw2EFNRmdAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBSn6dbzDdWOJX5nnZUjJHIBhlFv5jAdBgNVHQ4EFgQUp+nW8w3VjiV+Z52VIyRyAYZRb+YwDQYJKoZIhvcNAQELBQADggEBAMXZovds+umepDNu7tjz9nG7XW7ZiPXsIWysDpAh+1uh/AyfqjZDeBn0ewQ4JyQIYAtxkPwJ3JD3lTK4ILgqw8VPuAV4jhAkvuIJf2i6ryPdNET+oYJ5pMLR2bdNQ61yLxGeoWGAZykhG303B+pI9Wdml32q282lRciFHxhh42o0rAOVpstoo80wl3yGGbSkazGMeNdgNLYOdImF3ArRPt9N/4+5Eq2ADB0Qo0oeHOjoa5VGxB991GHEBEfxPWKeZzHj1Mzfb8lh6nsCMRI3PsNab03TKg3IYzR0HQDPfksZeTR67oPzBGLNqGRatBkThguvbJ1vnyApe9ux6fAy4V8=","attributes":{"enabled":true,"nbf":1631560467,"exp":1663097067,"created":1631561067,"updated":1631561067,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-0/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1631561061,"updated":1631561061}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-0/pending"}}, [
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
  '34e97bef-2eac-450c-862c-2c555d1de4dd',
  'x-ms-request-id',
  '34a5ee14-7027-4c6b-a817-e97a435fcee0',
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
  'Mon, 13 Sep 2021 19:24:27 GMT',
  'Content-Length',
  '2700'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/secrets/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-0/')
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
  'c2ceee84-1b33-46fb-b11b-81cce5815c06',
  'x-ms-request-id',
  'f5ff4558-2adc-49d0-8d7e-568e04868855',
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
  'Mon, 13 Sep 2021 19:24:27 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/secrets/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-0/')
  .query(true)
  .reply(200, {"value":"YmFzZTY0X3BsYWNlaG9sZGVy","contentType":"application/x-pkcs12","id":"https://keyvault_name.vault.azure.net/secrets/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-0/7e38eb9c8b554567aaf9966a7bbc0764","managed":true,"attributes":{"enabled":true,"nbf":1631560467,"exp":1663097067,"created":1631561067,"updated":1631561067,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90},"kid":"https://keyvault_name.vault.azure.net/keys/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-0/7e38eb9c8b554567aaf9966a7bbc0764"}, [
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
  'c2ceee84-1b33-46fb-b11b-81cce5815c06',
  'x-ms-request-id',
  '59966bc9-0d85-4275-bc13-790cdeb49d77',
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
  'Mon, 13 Sep 2021 19:24:27 GMT',
  'Content-Length',
  '4081'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/certificates/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-1/import', {"value":"YmFzZTY0X3BsYWNlaG9sZGVy"})
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-1/b008898cd8fd41389b504334bc095326","kid":"https://keyvault_name.vault.azure.net/keys/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-1/b008898cd8fd41389b504334bc095326","sid":"https://keyvault_name.vault.azure.net/secrets/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-1/b008898cd8fd41389b504334bc095326","x5t":"wZ0wGHU5R1v-JiS--_xq3UvH69o","cer":"MIIDKDCCAhCgAwIBAgIQOEWzeNEKQECRONcuNomsIjANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjEwOTEzMTkxNDI3WhcNMjIwOTEzMTkyNDI3WjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQDGWH99Bv5+k4PUfZrR1X6WciS6oG664WwFwuSui+vt6m4y4fASSe6jG8jpB5yuuQfJWTgD0S+/GuHA2iO7+Jkrv57E1+ABdIwADKeuw0SAfjXDnpAGjmSM0CTzNyZaIaTAYZQ4Tj2ZoTeFKgeYJEV4s2kDXuYjRngL+AWFFGbjrQvBQuNghCiwdqQbTODSOnREJDtCNWj7bv1W1+P7EOEcY8wgvssXm8LCq/8hrrdlyMUKUc4nwJJGdWJp3gxZBeZXnma9fV31h6FDlExrvsvwQ3cl7/h7Wkyr9JkXfBH++5IfsI4tbe3wMKVdy+DqySeeYhkegg5K9C2Pw2EFNRmdAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBSn6dbzDdWOJX5nnZUjJHIBhlFv5jAdBgNVHQ4EFgQUp+nW8w3VjiV+Z52VIyRyAYZRb+YwDQYJKoZIhvcNAQELBQADggEBAMXZovds+umepDNu7tjz9nG7XW7ZiPXsIWysDpAh+1uh/AyfqjZDeBn0ewQ4JyQIYAtxkPwJ3JD3lTK4ILgqw8VPuAV4jhAkvuIJf2i6ryPdNET+oYJ5pMLR2bdNQ61yLxGeoWGAZykhG303B+pI9Wdml32q282lRciFHxhh42o0rAOVpstoo80wl3yGGbSkazGMeNdgNLYOdImF3ArRPt9N/4+5Eq2ADB0Qo0oeHOjoa5VGxB991GHEBEfxPWKeZzHj1Mzfb8lh6nsCMRI3PsNab03TKg3IYzR0HQDPfksZeTR67oPzBGLNqGRatBkThguvbJ1vnyApe9ux6fAy4V8=","attributes":{"enabled":true,"nbf":1631560467,"exp":1663097067,"created":1631561068,"updated":1631561068,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/mergeCertificateName-canimportacertificatefromacertificatesbase64secretvalue-1/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"CN=MyCert","ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":13,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"EmailContacts"}}],"issuer":{"name":"Unknown"},"attributes":{"enabled":true,"created":1631561068,"updated":1631561068}}}, [
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
  'f60cacb9-5676-4259-af56-f14e350ca00e',
  'x-ms-request-id',
  'e08004dc-babc-49de-9018-ffe315764614',
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
  'Mon, 13 Sep 2021 19:24:28 GMT',
  'Content-Length',
  '2527'
]);

let nock = require('nock');

module.exports.hash = "903781a6afbfb5fa87e40e4f90b5500e";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/certificates/lroOperationCertificateName-canresumefromastoppedpoller-/create')
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
  '5550d8df-e878-4859-8825-83420b54168e',
  'x-ms-request-id',
  'b4a60885-8c87-4ae2-ae22-5231023f78a0',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:08:05 GMT'
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
  '841e02f5-71c6-42f5-b6ff-965bfd063d00',
  'x-ms-ests-server',
  '2.1.11654.16 - SCUS ProdSlices',
  'Set-Cookie',
  'fpc=ApDQRp_1bOJGvyZBmEPP0xDmR1YbAgAAAODDG9gOAAAA; expires=Fri, 28-May-2021 21:08:05 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrkoK6VCCr6zqpfYuHawebnOTLlB8V7Li86iL6y7WI3IMdOzy1fO3ptZRn3Ky7a1vK5v5SJEHTSQXUia60bzmmTBJa9bpT50QcfRJPqfT9n-kov_22-XpAfehy4ZYORRe4RAI1BGaP8ELyuqdgZ7Qv7JazPRUsdmgAjWDacEb2drkgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 28 Apr 2021 21:08:04 GMT',
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
  '0a20a69a-273e-45a4-82b2-fbb6aad61f01',
  'x-ms-ests-server',
  '2.1.11654.16 - WUS2 ProdSlices',
  'Set-Cookie',
  'fpc=ApDQRp_1bOJGvyZBmEPP0xDmR1YbAgAAAODDG9gOAAAA; expires=Fri, 28-May-2021 21:08:05 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrY2P50yRa8WMj_mMhN69YeLirc6793n9WR_NGzgzh9R4VmWibfrjzaDOB6ya5U2-hZp8mI_VTdv9Ss4FfUa3y0sMfhzZPL4XLxy3T-kC6RQdIKMMi0f7L2vTL7tAbjxsd7LFnvy-OPrTSLkOe4CqzaLlOEAZ7iLDCT-rhI2yE69sgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 28 Apr 2021 21:08:04 GMT'
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
  '3762338d-4aff-4754-983b-21699b965d00',
  'x-ms-ests-server',
  '2.1.11654.16 - WUS2 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=ApDQRp_1bOJGvyZBmEPP0xDmR1YbAQAAAAzFG9gOAAAA; expires=Fri, 28-May-2021 21:08:05 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 28 Apr 2021 21:08:04 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/certificates/lroOperationCertificateName-canresumefromastoppedpoller-/create', {"policy":{"key_props":{},"secret_props":{},"x509_props":{"subject":"cn=MyCert","sans":{}},"issuer":{"name":"Self"},"attributes":{}},"attributes":{}})
  .query(true)
  .reply(202, {"id":"https://keyvault_name.vault.azure.net/certificates/lroOperationCertificateName-canresumefromastoppedpoller-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAr3NUhTG+Z92g6VmSZ8gOgTxTxj9JhgJupSXmyjXkhY0ESsdHocCeAvydzfLQY3JuFTHeg1SPj0xsDmKRmgBEgs3fnHsRoicZGh8NHCrZkzhw4S7h9UBWaoKHX3Iimy1xfy1A+4j2PYOBJJ8y5bMLP5LH81XhZ1kylYjczw6QSBVHhePY37eig1SZLFvU8lstkHahfDbMpv/IcXH0ir226oSkgoU0DAcV+Z6Y9BoCfWjXcwAUiKxPy1nQoDeXt/kcLjXzrYxa3vddPJjfQWkYKTLp4CsOgBOu5fv2wHvDjHsvgh5XTO5UzU7XsIBjqXmpWKQT7sam+TNpCl/aYzh1sQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAFXkEOz9AMWxvcQq0s3oEbzPHZEmjRfgNVQhHjFlW1R41MY5+ilNfKeZkQ5OjbCq+xaYesAPOGeE2XrrxrJgfjt3ha/AQfVXG+6Y3Y+Qjd98zhR/5Jk6NsMaXZGeLDZ2ZVCbDbGWpN15YMU9ElL28bdUJTb4mz6xDAqVZ+/MJ1A08bo8EerANg/QkoFuJlkAlwblh8Lt5sgMjsOM3CdGt3h4W7+dTT8J0MR+64g5iDSwrTr5ZdaFLRhLIgkxLB+RxUxlPyyRb8L+yDbkCDrk+V4Yp4XlTxGuV1yLMdfH7jW7sESx4SzW9zvt1Itx4Qb7tg4uWqaX8II1dhzfgO6Czn4=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"d84197fc58ee4a3bad8db1194425f3a1"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://keyvault_name.vault.azure.net/certificates/lroOperationCertificateName-canresumefromastoppedpoller-/pending?api-version=7.2&request_id=d84197fc58ee4a3bad8db1194425f3a1',
  'Retry-After',
  '0',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '5550d8df-e878-4859-8825-83420b54168e',
  'x-ms-request-id',
  'c9648f3c-dcc9-4421-9148-6a72321a9c6e',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:08:05 GMT',
  'Content-Length',
  '1350'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroOperationCertificateName-canresumefromastoppedpoller-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroOperationCertificateName-canresumefromastoppedpoller-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAr3NUhTG+Z92g6VmSZ8gOgTxTxj9JhgJupSXmyjXkhY0ESsdHocCeAvydzfLQY3JuFTHeg1SPj0xsDmKRmgBEgs3fnHsRoicZGh8NHCrZkzhw4S7h9UBWaoKHX3Iimy1xfy1A+4j2PYOBJJ8y5bMLP5LH81XhZ1kylYjczw6QSBVHhePY37eig1SZLFvU8lstkHahfDbMpv/IcXH0ir226oSkgoU0DAcV+Z6Y9BoCfWjXcwAUiKxPy1nQoDeXt/kcLjXzrYxa3vddPJjfQWkYKTLp4CsOgBOu5fv2wHvDjHsvgh5XTO5UzU7XsIBjqXmpWKQT7sam+TNpCl/aYzh1sQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAFXkEOz9AMWxvcQq0s3oEbzPHZEmjRfgNVQhHjFlW1R41MY5+ilNfKeZkQ5OjbCq+xaYesAPOGeE2XrrxrJgfjt3ha/AQfVXG+6Y3Y+Qjd98zhR/5Jk6NsMaXZGeLDZ2ZVCbDbGWpN15YMU9ElL28bdUJTb4mz6xDAqVZ+/MJ1A08bo8EerANg/QkoFuJlkAlwblh8Lt5sgMjsOM3CdGt3h4W7+dTT8J0MR+64g5iDSwrTr5ZdaFLRhLIgkxLB+RxUxlPyyRb8L+yDbkCDrk+V4Yp4XlTxGuV1yLMdfH7jW7sESx4SzW9zvt1Itx4Qb7tg4uWqaX8II1dhzfgO6Czn4=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"d84197fc58ee4a3bad8db1194425f3a1"}, [
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
  'a94bd8c9-b6a4-4226-b508-e8622680af56',
  'x-ms-request-id',
  'e81d095b-18b4-4457-aa88-2ac4cfe1b157',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:08:05 GMT',
  'Content-Length',
  '1350'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroOperationCertificateName-canresumefromastoppedpoller-/')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroOperationCertificateName-canresumefromastoppedpoller-/fbf1f6ad5d3044c2894ce1104556a6e7","attributes":{"enabled":false,"nbf":1619643485,"exp":1651180085,"created":1619644086,"updated":1619644086,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/lroOperationCertificateName-canresumefromastoppedpoller-/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1619644086,"updated":1619644086}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/lroOperationCertificateName-canresumefromastoppedpoller-/pending"}}, [
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
  '34333ff9-fc18-4d68-9adf-f18a121f7920',
  'x-ms-request-id',
  '0e49945a-fefd-461c-a071-6e936cdd4fad',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:08:05 GMT',
  'Content-Length',
  '1181'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroOperationCertificateName-canresumefromastoppedpoller-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroOperationCertificateName-canresumefromastoppedpoller-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAr3NUhTG+Z92g6VmSZ8gOgTxTxj9JhgJupSXmyjXkhY0ESsdHocCeAvydzfLQY3JuFTHeg1SPj0xsDmKRmgBEgs3fnHsRoicZGh8NHCrZkzhw4S7h9UBWaoKHX3Iimy1xfy1A+4j2PYOBJJ8y5bMLP5LH81XhZ1kylYjczw6QSBVHhePY37eig1SZLFvU8lstkHahfDbMpv/IcXH0ir226oSkgoU0DAcV+Z6Y9BoCfWjXcwAUiKxPy1nQoDeXt/kcLjXzrYxa3vddPJjfQWkYKTLp4CsOgBOu5fv2wHvDjHsvgh5XTO5UzU7XsIBjqXmpWKQT7sam+TNpCl/aYzh1sQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAFXkEOz9AMWxvcQq0s3oEbzPHZEmjRfgNVQhHjFlW1R41MY5+ilNfKeZkQ5OjbCq+xaYesAPOGeE2XrrxrJgfjt3ha/AQfVXG+6Y3Y+Qjd98zhR/5Jk6NsMaXZGeLDZ2ZVCbDbGWpN15YMU9ElL28bdUJTb4mz6xDAqVZ+/MJ1A08bo8EerANg/QkoFuJlkAlwblh8Lt5sgMjsOM3CdGt3h4W7+dTT8J0MR+64g5iDSwrTr5ZdaFLRhLIgkxLB+RxUxlPyyRb8L+yDbkCDrk+V4Yp4XlTxGuV1yLMdfH7jW7sESx4SzW9zvt1Itx4Qb7tg4uWqaX8II1dhzfgO6Czn4=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"d84197fc58ee4a3bad8db1194425f3a1"}, [
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
  '45ac0ddb-b026-48e0-b116-3ad4f6da333c',
  'x-ms-request-id',
  '9706cb26-08bb-4a69-ae4e-ebde78711498',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:08:06 GMT',
  'Content-Length',
  '1350'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroOperationCertificateName-canresumefromastoppedpoller-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroOperationCertificateName-canresumefromastoppedpoller-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAr3NUhTG+Z92g6VmSZ8gOgTxTxj9JhgJupSXmyjXkhY0ESsdHocCeAvydzfLQY3JuFTHeg1SPj0xsDmKRmgBEgs3fnHsRoicZGh8NHCrZkzhw4S7h9UBWaoKHX3Iimy1xfy1A+4j2PYOBJJ8y5bMLP5LH81XhZ1kylYjczw6QSBVHhePY37eig1SZLFvU8lstkHahfDbMpv/IcXH0ir226oSkgoU0DAcV+Z6Y9BoCfWjXcwAUiKxPy1nQoDeXt/kcLjXzrYxa3vddPJjfQWkYKTLp4CsOgBOu5fv2wHvDjHsvgh5XTO5UzU7XsIBjqXmpWKQT7sam+TNpCl/aYzh1sQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAFXkEOz9AMWxvcQq0s3oEbzPHZEmjRfgNVQhHjFlW1R41MY5+ilNfKeZkQ5OjbCq+xaYesAPOGeE2XrrxrJgfjt3ha/AQfVXG+6Y3Y+Qjd98zhR/5Jk6NsMaXZGeLDZ2ZVCbDbGWpN15YMU9ElL28bdUJTb4mz6xDAqVZ+/MJ1A08bo8EerANg/QkoFuJlkAlwblh8Lt5sgMjsOM3CdGt3h4W7+dTT8J0MR+64g5iDSwrTr5ZdaFLRhLIgkxLB+RxUxlPyyRb8L+yDbkCDrk+V4Yp4XlTxGuV1yLMdfH7jW7sESx4SzW9zvt1Itx4Qb7tg4uWqaX8II1dhzfgO6Czn4=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"d84197fc58ee4a3bad8db1194425f3a1"}, [
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
  'ae76aed4-2ba5-4942-9966-499ff8dffe5f',
  'x-ms-request-id',
  'a85cae2c-4ce1-4cba-9673-28655f535155',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:08:05 GMT',
  'Content-Length',
  '1350'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroOperationCertificateName-canresumefromastoppedpoller-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroOperationCertificateName-canresumefromastoppedpoller-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAr3NUhTG+Z92g6VmSZ8gOgTxTxj9JhgJupSXmyjXkhY0ESsdHocCeAvydzfLQY3JuFTHeg1SPj0xsDmKRmgBEgs3fnHsRoicZGh8NHCrZkzhw4S7h9UBWaoKHX3Iimy1xfy1A+4j2PYOBJJ8y5bMLP5LH81XhZ1kylYjczw6QSBVHhePY37eig1SZLFvU8lstkHahfDbMpv/IcXH0ir226oSkgoU0DAcV+Z6Y9BoCfWjXcwAUiKxPy1nQoDeXt/kcLjXzrYxa3vddPJjfQWkYKTLp4CsOgBOu5fv2wHvDjHsvgh5XTO5UzU7XsIBjqXmpWKQT7sam+TNpCl/aYzh1sQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAFXkEOz9AMWxvcQq0s3oEbzPHZEmjRfgNVQhHjFlW1R41MY5+ilNfKeZkQ5OjbCq+xaYesAPOGeE2XrrxrJgfjt3ha/AQfVXG+6Y3Y+Qjd98zhR/5Jk6NsMaXZGeLDZ2ZVCbDbGWpN15YMU9ElL28bdUJTb4mz6xDAqVZ+/MJ1A08bo8EerANg/QkoFuJlkAlwblh8Lt5sgMjsOM3CdGt3h4W7+dTT8J0MR+64g5iDSwrTr5ZdaFLRhLIgkxLB+RxUxlPyyRb8L+yDbkCDrk+V4Yp4XlTxGuV1yLMdfH7jW7sESx4SzW9zvt1Itx4Qb7tg4uWqaX8II1dhzfgO6Czn4=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"d84197fc58ee4a3bad8db1194425f3a1"}, [
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
  'a46f2241-c6a6-4613-93d4-3cdce725986c',
  'x-ms-request-id',
  '71be5d43-f292-4fbe-b4c7-5b69d3669e8c',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:08:06 GMT',
  'Content-Length',
  '1350'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroOperationCertificateName-canresumefromastoppedpoller-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroOperationCertificateName-canresumefromastoppedpoller-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAr3NUhTG+Z92g6VmSZ8gOgTxTxj9JhgJupSXmyjXkhY0ESsdHocCeAvydzfLQY3JuFTHeg1SPj0xsDmKRmgBEgs3fnHsRoicZGh8NHCrZkzhw4S7h9UBWaoKHX3Iimy1xfy1A+4j2PYOBJJ8y5bMLP5LH81XhZ1kylYjczw6QSBVHhePY37eig1SZLFvU8lstkHahfDbMpv/IcXH0ir226oSkgoU0DAcV+Z6Y9BoCfWjXcwAUiKxPy1nQoDeXt/kcLjXzrYxa3vddPJjfQWkYKTLp4CsOgBOu5fv2wHvDjHsvgh5XTO5UzU7XsIBjqXmpWKQT7sam+TNpCl/aYzh1sQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAFXkEOz9AMWxvcQq0s3oEbzPHZEmjRfgNVQhHjFlW1R41MY5+ilNfKeZkQ5OjbCq+xaYesAPOGeE2XrrxrJgfjt3ha/AQfVXG+6Y3Y+Qjd98zhR/5Jk6NsMaXZGeLDZ2ZVCbDbGWpN15YMU9ElL28bdUJTb4mz6xDAqVZ+/MJ1A08bo8EerANg/QkoFuJlkAlwblh8Lt5sgMjsOM3CdGt3h4W7+dTT8J0MR+64g5iDSwrTr5ZdaFLRhLIgkxLB+RxUxlPyyRb8L+yDbkCDrk+V4Yp4XlTxGuV1yLMdfH7jW7sESx4SzW9zvt1Itx4Qb7tg4uWqaX8II1dhzfgO6Czn4=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"d84197fc58ee4a3bad8db1194425f3a1"}, [
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
  '5cba8318-ac87-4539-bf9a-5329d7548a4f',
  'x-ms-request-id',
  '9654ad27-ee61-4928-8430-753d187254de',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:08:08 GMT',
  'Content-Length',
  '1350'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroOperationCertificateName-canresumefromastoppedpoller-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroOperationCertificateName-canresumefromastoppedpoller-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAr3NUhTG+Z92g6VmSZ8gOgTxTxj9JhgJupSXmyjXkhY0ESsdHocCeAvydzfLQY3JuFTHeg1SPj0xsDmKRmgBEgs3fnHsRoicZGh8NHCrZkzhw4S7h9UBWaoKHX3Iimy1xfy1A+4j2PYOBJJ8y5bMLP5LH81XhZ1kylYjczw6QSBVHhePY37eig1SZLFvU8lstkHahfDbMpv/IcXH0ir226oSkgoU0DAcV+Z6Y9BoCfWjXcwAUiKxPy1nQoDeXt/kcLjXzrYxa3vddPJjfQWkYKTLp4CsOgBOu5fv2wHvDjHsvgh5XTO5UzU7XsIBjqXmpWKQT7sam+TNpCl/aYzh1sQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAFXkEOz9AMWxvcQq0s3oEbzPHZEmjRfgNVQhHjFlW1R41MY5+ilNfKeZkQ5OjbCq+xaYesAPOGeE2XrrxrJgfjt3ha/AQfVXG+6Y3Y+Qjd98zhR/5Jk6NsMaXZGeLDZ2ZVCbDbGWpN15YMU9ElL28bdUJTb4mz6xDAqVZ+/MJ1A08bo8EerANg/QkoFuJlkAlwblh8Lt5sgMjsOM3CdGt3h4W7+dTT8J0MR+64g5iDSwrTr5ZdaFLRhLIgkxLB+RxUxlPyyRb8L+yDbkCDrk+V4Yp4XlTxGuV1yLMdfH7jW7sESx4SzW9zvt1Itx4Qb7tg4uWqaX8II1dhzfgO6Czn4=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"d84197fc58ee4a3bad8db1194425f3a1"}, [
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
  '110a6215-96d5-4156-9218-1cf281d04727',
  'x-ms-request-id',
  'b48a1115-d06b-4bc3-9d40-7c8302f20235',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:08:10 GMT',
  'Content-Length',
  '1350'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroOperationCertificateName-canresumefromastoppedpoller-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroOperationCertificateName-canresumefromastoppedpoller-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAr3NUhTG+Z92g6VmSZ8gOgTxTxj9JhgJupSXmyjXkhY0ESsdHocCeAvydzfLQY3JuFTHeg1SPj0xsDmKRmgBEgs3fnHsRoicZGh8NHCrZkzhw4S7h9UBWaoKHX3Iimy1xfy1A+4j2PYOBJJ8y5bMLP5LH81XhZ1kylYjczw6QSBVHhePY37eig1SZLFvU8lstkHahfDbMpv/IcXH0ir226oSkgoU0DAcV+Z6Y9BoCfWjXcwAUiKxPy1nQoDeXt/kcLjXzrYxa3vddPJjfQWkYKTLp4CsOgBOu5fv2wHvDjHsvgh5XTO5UzU7XsIBjqXmpWKQT7sam+TNpCl/aYzh1sQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAFXkEOz9AMWxvcQq0s3oEbzPHZEmjRfgNVQhHjFlW1R41MY5+ilNfKeZkQ5OjbCq+xaYesAPOGeE2XrrxrJgfjt3ha/AQfVXG+6Y3Y+Qjd98zhR/5Jk6NsMaXZGeLDZ2ZVCbDbGWpN15YMU9ElL28bdUJTb4mz6xDAqVZ+/MJ1A08bo8EerANg/QkoFuJlkAlwblh8Lt5sgMjsOM3CdGt3h4W7+dTT8J0MR+64g5iDSwrTr5ZdaFLRhLIgkxLB+RxUxlPyyRb8L+yDbkCDrk+V4Yp4XlTxGuV1yLMdfH7jW7sESx4SzW9zvt1Itx4Qb7tg4uWqaX8II1dhzfgO6Czn4=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"d84197fc58ee4a3bad8db1194425f3a1"}, [
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
  '9708fda0-bce8-486b-83c5-5e2c2da3e585',
  'x-ms-request-id',
  'f07aae43-bce8-4891-9c46-0a5ccc436dbb',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:08:12 GMT',
  'Content-Length',
  '1350'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroOperationCertificateName-canresumefromastoppedpoller-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroOperationCertificateName-canresumefromastoppedpoller-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAr3NUhTG+Z92g6VmSZ8gOgTxTxj9JhgJupSXmyjXkhY0ESsdHocCeAvydzfLQY3JuFTHeg1SPj0xsDmKRmgBEgs3fnHsRoicZGh8NHCrZkzhw4S7h9UBWaoKHX3Iimy1xfy1A+4j2PYOBJJ8y5bMLP5LH81XhZ1kylYjczw6QSBVHhePY37eig1SZLFvU8lstkHahfDbMpv/IcXH0ir226oSkgoU0DAcV+Z6Y9BoCfWjXcwAUiKxPy1nQoDeXt/kcLjXzrYxa3vddPJjfQWkYKTLp4CsOgBOu5fv2wHvDjHsvgh5XTO5UzU7XsIBjqXmpWKQT7sam+TNpCl/aYzh1sQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAFXkEOz9AMWxvcQq0s3oEbzPHZEmjRfgNVQhHjFlW1R41MY5+ilNfKeZkQ5OjbCq+xaYesAPOGeE2XrrxrJgfjt3ha/AQfVXG+6Y3Y+Qjd98zhR/5Jk6NsMaXZGeLDZ2ZVCbDbGWpN15YMU9ElL28bdUJTb4mz6xDAqVZ+/MJ1A08bo8EerANg/QkoFuJlkAlwblh8Lt5sgMjsOM3CdGt3h4W7+dTT8J0MR+64g5iDSwrTr5ZdaFLRhLIgkxLB+RxUxlPyyRb8L+yDbkCDrk+V4Yp4XlTxGuV1yLMdfH7jW7sESx4SzW9zvt1Itx4Qb7tg4uWqaX8II1dhzfgO6Czn4=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"d84197fc58ee4a3bad8db1194425f3a1"}, [
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
  'e3e4d07d-09fe-4b27-896c-d41e9b3b75db',
  'x-ms-request-id',
  '4a5ad9a2-d9a6-4bdf-a32e-c061f225ee0d',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:08:15 GMT',
  'Content-Length',
  '1350'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroOperationCertificateName-canresumefromastoppedpoller-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroOperationCertificateName-canresumefromastoppedpoller-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAr3NUhTG+Z92g6VmSZ8gOgTxTxj9JhgJupSXmyjXkhY0ESsdHocCeAvydzfLQY3JuFTHeg1SPj0xsDmKRmgBEgs3fnHsRoicZGh8NHCrZkzhw4S7h9UBWaoKHX3Iimy1xfy1A+4j2PYOBJJ8y5bMLP5LH81XhZ1kylYjczw6QSBVHhePY37eig1SZLFvU8lstkHahfDbMpv/IcXH0ir226oSkgoU0DAcV+Z6Y9BoCfWjXcwAUiKxPy1nQoDeXt/kcLjXzrYxa3vddPJjfQWkYKTLp4CsOgBOu5fv2wHvDjHsvgh5XTO5UzU7XsIBjqXmpWKQT7sam+TNpCl/aYzh1sQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAFXkEOz9AMWxvcQq0s3oEbzPHZEmjRfgNVQhHjFlW1R41MY5+ilNfKeZkQ5OjbCq+xaYesAPOGeE2XrrxrJgfjt3ha/AQfVXG+6Y3Y+Qjd98zhR/5Jk6NsMaXZGeLDZ2ZVCbDbGWpN15YMU9ElL28bdUJTb4mz6xDAqVZ+/MJ1A08bo8EerANg/QkoFuJlkAlwblh8Lt5sgMjsOM3CdGt3h4W7+dTT8J0MR+64g5iDSwrTr5ZdaFLRhLIgkxLB+RxUxlPyyRb8L+yDbkCDrk+V4Yp4XlTxGuV1yLMdfH7jW7sESx4SzW9zvt1Itx4Qb7tg4uWqaX8II1dhzfgO6Czn4=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"d84197fc58ee4a3bad8db1194425f3a1"}, [
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
  '888e83c9-336c-4743-9403-5ea25ac0a262',
  'x-ms-request-id',
  '084e968a-45d2-4dbd-8c54-500c24a6a720',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:08:16 GMT',
  'Content-Length',
  '1350'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroOperationCertificateName-canresumefromastoppedpoller-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroOperationCertificateName-canresumefromastoppedpoller-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAr3NUhTG+Z92g6VmSZ8gOgTxTxj9JhgJupSXmyjXkhY0ESsdHocCeAvydzfLQY3JuFTHeg1SPj0xsDmKRmgBEgs3fnHsRoicZGh8NHCrZkzhw4S7h9UBWaoKHX3Iimy1xfy1A+4j2PYOBJJ8y5bMLP5LH81XhZ1kylYjczw6QSBVHhePY37eig1SZLFvU8lstkHahfDbMpv/IcXH0ir226oSkgoU0DAcV+Z6Y9BoCfWjXcwAUiKxPy1nQoDeXt/kcLjXzrYxa3vddPJjfQWkYKTLp4CsOgBOu5fv2wHvDjHsvgh5XTO5UzU7XsIBjqXmpWKQT7sam+TNpCl/aYzh1sQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAFXkEOz9AMWxvcQq0s3oEbzPHZEmjRfgNVQhHjFlW1R41MY5+ilNfKeZkQ5OjbCq+xaYesAPOGeE2XrrxrJgfjt3ha/AQfVXG+6Y3Y+Qjd98zhR/5Jk6NsMaXZGeLDZ2ZVCbDbGWpN15YMU9ElL28bdUJTb4mz6xDAqVZ+/MJ1A08bo8EerANg/QkoFuJlkAlwblh8Lt5sgMjsOM3CdGt3h4W7+dTT8J0MR+64g5iDSwrTr5ZdaFLRhLIgkxLB+RxUxlPyyRb8L+yDbkCDrk+V4Yp4XlTxGuV1yLMdfH7jW7sESx4SzW9zvt1Itx4Qb7tg4uWqaX8II1dhzfgO6Czn4=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"d84197fc58ee4a3bad8db1194425f3a1"}, [
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
  'a50d219c-c5c2-4cda-bb28-73796c9836ca',
  'x-ms-request-id',
  '79895f27-ca0c-42fb-8a4d-ae37753312bb',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:08:19 GMT',
  'Content-Length',
  '1350'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroOperationCertificateName-canresumefromastoppedpoller-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroOperationCertificateName-canresumefromastoppedpoller-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAr3NUhTG+Z92g6VmSZ8gOgTxTxj9JhgJupSXmyjXkhY0ESsdHocCeAvydzfLQY3JuFTHeg1SPj0xsDmKRmgBEgs3fnHsRoicZGh8NHCrZkzhw4S7h9UBWaoKHX3Iimy1xfy1A+4j2PYOBJJ8y5bMLP5LH81XhZ1kylYjczw6QSBVHhePY37eig1SZLFvU8lstkHahfDbMpv/IcXH0ir226oSkgoU0DAcV+Z6Y9BoCfWjXcwAUiKxPy1nQoDeXt/kcLjXzrYxa3vddPJjfQWkYKTLp4CsOgBOu5fv2wHvDjHsvgh5XTO5UzU7XsIBjqXmpWKQT7sam+TNpCl/aYzh1sQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAFXkEOz9AMWxvcQq0s3oEbzPHZEmjRfgNVQhHjFlW1R41MY5+ilNfKeZkQ5OjbCq+xaYesAPOGeE2XrrxrJgfjt3ha/AQfVXG+6Y3Y+Qjd98zhR/5Jk6NsMaXZGeLDZ2ZVCbDbGWpN15YMU9ElL28bdUJTb4mz6xDAqVZ+/MJ1A08bo8EerANg/QkoFuJlkAlwblh8Lt5sgMjsOM3CdGt3h4W7+dTT8J0MR+64g5iDSwrTr5ZdaFLRhLIgkxLB+RxUxlPyyRb8L+yDbkCDrk+V4Yp4XlTxGuV1yLMdfH7jW7sESx4SzW9zvt1Itx4Qb7tg4uWqaX8II1dhzfgO6Czn4=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"d84197fc58ee4a3bad8db1194425f3a1"}, [
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
  '73ec5924-ccf7-43d0-8d7e-8ffd66f10b79',
  'x-ms-request-id',
  '54e2c393-fb9b-48a8-98f3-3090092d6d50',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:08:20 GMT',
  'Content-Length',
  '1350'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroOperationCertificateName-canresumefromastoppedpoller-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroOperationCertificateName-canresumefromastoppedpoller-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAr3NUhTG+Z92g6VmSZ8gOgTxTxj9JhgJupSXmyjXkhY0ESsdHocCeAvydzfLQY3JuFTHeg1SPj0xsDmKRmgBEgs3fnHsRoicZGh8NHCrZkzhw4S7h9UBWaoKHX3Iimy1xfy1A+4j2PYOBJJ8y5bMLP5LH81XhZ1kylYjczw6QSBVHhePY37eig1SZLFvU8lstkHahfDbMpv/IcXH0ir226oSkgoU0DAcV+Z6Y9BoCfWjXcwAUiKxPy1nQoDeXt/kcLjXzrYxa3vddPJjfQWkYKTLp4CsOgBOu5fv2wHvDjHsvgh5XTO5UzU7XsIBjqXmpWKQT7sam+TNpCl/aYzh1sQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAFXkEOz9AMWxvcQq0s3oEbzPHZEmjRfgNVQhHjFlW1R41MY5+ilNfKeZkQ5OjbCq+xaYesAPOGeE2XrrxrJgfjt3ha/AQfVXG+6Y3Y+Qjd98zhR/5Jk6NsMaXZGeLDZ2ZVCbDbGWpN15YMU9ElL28bdUJTb4mz6xDAqVZ+/MJ1A08bo8EerANg/QkoFuJlkAlwblh8Lt5sgMjsOM3CdGt3h4W7+dTT8J0MR+64g5iDSwrTr5ZdaFLRhLIgkxLB+RxUxlPyyRb8L+yDbkCDrk+V4Yp4XlTxGuV1yLMdfH7jW7sESx4SzW9zvt1Itx4Qb7tg4uWqaX8II1dhzfgO6Czn4=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"d84197fc58ee4a3bad8db1194425f3a1"}, [
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
  'c9688c72-a43f-466e-bebf-d66dc68a8b0c',
  'x-ms-request-id',
  '8c2b56c2-8e54-4acb-bb5a-4c5496c2b3b5',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:08:22 GMT',
  'Content-Length',
  '1350'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroOperationCertificateName-canresumefromastoppedpoller-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroOperationCertificateName-canresumefromastoppedpoller-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAr3NUhTG+Z92g6VmSZ8gOgTxTxj9JhgJupSXmyjXkhY0ESsdHocCeAvydzfLQY3JuFTHeg1SPj0xsDmKRmgBEgs3fnHsRoicZGh8NHCrZkzhw4S7h9UBWaoKHX3Iimy1xfy1A+4j2PYOBJJ8y5bMLP5LH81XhZ1kylYjczw6QSBVHhePY37eig1SZLFvU8lstkHahfDbMpv/IcXH0ir226oSkgoU0DAcV+Z6Y9BoCfWjXcwAUiKxPy1nQoDeXt/kcLjXzrYxa3vddPJjfQWkYKTLp4CsOgBOu5fv2wHvDjHsvgh5XTO5UzU7XsIBjqXmpWKQT7sam+TNpCl/aYzh1sQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAFXkEOz9AMWxvcQq0s3oEbzPHZEmjRfgNVQhHjFlW1R41MY5+ilNfKeZkQ5OjbCq+xaYesAPOGeE2XrrxrJgfjt3ha/AQfVXG+6Y3Y+Qjd98zhR/5Jk6NsMaXZGeLDZ2ZVCbDbGWpN15YMU9ElL28bdUJTb4mz6xDAqVZ+/MJ1A08bo8EerANg/QkoFuJlkAlwblh8Lt5sgMjsOM3CdGt3h4W7+dTT8J0MR+64g5iDSwrTr5ZdaFLRhLIgkxLB+RxUxlPyyRb8L+yDbkCDrk+V4Yp4XlTxGuV1yLMdfH7jW7sESx4SzW9zvt1Itx4Qb7tg4uWqaX8II1dhzfgO6Czn4=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"d84197fc58ee4a3bad8db1194425f3a1"}, [
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
  'd60a62ec-386e-487d-8b89-3f171d84cc69',
  'x-ms-request-id',
  '8f902400-bd49-4c86-ad27-c4fdfc8e1f0d',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:08:24 GMT',
  'Content-Length',
  '1350'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroOperationCertificateName-canresumefromastoppedpoller-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroOperationCertificateName-canresumefromastoppedpoller-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAr3NUhTG+Z92g6VmSZ8gOgTxTxj9JhgJupSXmyjXkhY0ESsdHocCeAvydzfLQY3JuFTHeg1SPj0xsDmKRmgBEgs3fnHsRoicZGh8NHCrZkzhw4S7h9UBWaoKHX3Iimy1xfy1A+4j2PYOBJJ8y5bMLP5LH81XhZ1kylYjczw6QSBVHhePY37eig1SZLFvU8lstkHahfDbMpv/IcXH0ir226oSkgoU0DAcV+Z6Y9BoCfWjXcwAUiKxPy1nQoDeXt/kcLjXzrYxa3vddPJjfQWkYKTLp4CsOgBOu5fv2wHvDjHsvgh5XTO5UzU7XsIBjqXmpWKQT7sam+TNpCl/aYzh1sQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAFXkEOz9AMWxvcQq0s3oEbzPHZEmjRfgNVQhHjFlW1R41MY5+ilNfKeZkQ5OjbCq+xaYesAPOGeE2XrrxrJgfjt3ha/AQfVXG+6Y3Y+Qjd98zhR/5Jk6NsMaXZGeLDZ2ZVCbDbGWpN15YMU9ElL28bdUJTb4mz6xDAqVZ+/MJ1A08bo8EerANg/QkoFuJlkAlwblh8Lt5sgMjsOM3CdGt3h4W7+dTT8J0MR+64g5iDSwrTr5ZdaFLRhLIgkxLB+RxUxlPyyRb8L+yDbkCDrk+V4Yp4XlTxGuV1yLMdfH7jW7sESx4SzW9zvt1Itx4Qb7tg4uWqaX8II1dhzfgO6Czn4=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"d84197fc58ee4a3bad8db1194425f3a1"}, [
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
  '751af462-e2b6-4bf9-8062-312876f1f85b',
  'x-ms-request-id',
  'ed8c83d2-e6f5-4b76-91aa-39db504f24d0',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:08:27 GMT',
  'Content-Length',
  '1350'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroOperationCertificateName-canresumefromastoppedpoller-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroOperationCertificateName-canresumefromastoppedpoller-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAr3NUhTG+Z92g6VmSZ8gOgTxTxj9JhgJupSXmyjXkhY0ESsdHocCeAvydzfLQY3JuFTHeg1SPj0xsDmKRmgBEgs3fnHsRoicZGh8NHCrZkzhw4S7h9UBWaoKHX3Iimy1xfy1A+4j2PYOBJJ8y5bMLP5LH81XhZ1kylYjczw6QSBVHhePY37eig1SZLFvU8lstkHahfDbMpv/IcXH0ir226oSkgoU0DAcV+Z6Y9BoCfWjXcwAUiKxPy1nQoDeXt/kcLjXzrYxa3vddPJjfQWkYKTLp4CsOgBOu5fv2wHvDjHsvgh5XTO5UzU7XsIBjqXmpWKQT7sam+TNpCl/aYzh1sQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAFXkEOz9AMWxvcQq0s3oEbzPHZEmjRfgNVQhHjFlW1R41MY5+ilNfKeZkQ5OjbCq+xaYesAPOGeE2XrrxrJgfjt3ha/AQfVXG+6Y3Y+Qjd98zhR/5Jk6NsMaXZGeLDZ2ZVCbDbGWpN15YMU9ElL28bdUJTb4mz6xDAqVZ+/MJ1A08bo8EerANg/QkoFuJlkAlwblh8Lt5sgMjsOM3CdGt3h4W7+dTT8J0MR+64g5iDSwrTr5ZdaFLRhLIgkxLB+RxUxlPyyRb8L+yDbkCDrk+V4Yp4XlTxGuV1yLMdfH7jW7sESx4SzW9zvt1Itx4Qb7tg4uWqaX8II1dhzfgO6Czn4=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"d84197fc58ee4a3bad8db1194425f3a1"}, [
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
  '5b9e3dd9-8564-4a52-b9aa-224841790dcb',
  'x-ms-request-id',
  'b4af358d-bc65-4010-a9e8-06ac239bb75d',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:08:29 GMT',
  'Content-Length',
  '1350'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroOperationCertificateName-canresumefromastoppedpoller-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroOperationCertificateName-canresumefromastoppedpoller-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAr3NUhTG+Z92g6VmSZ8gOgTxTxj9JhgJupSXmyjXkhY0ESsdHocCeAvydzfLQY3JuFTHeg1SPj0xsDmKRmgBEgs3fnHsRoicZGh8NHCrZkzhw4S7h9UBWaoKHX3Iimy1xfy1A+4j2PYOBJJ8y5bMLP5LH81XhZ1kylYjczw6QSBVHhePY37eig1SZLFvU8lstkHahfDbMpv/IcXH0ir226oSkgoU0DAcV+Z6Y9BoCfWjXcwAUiKxPy1nQoDeXt/kcLjXzrYxa3vddPJjfQWkYKTLp4CsOgBOu5fv2wHvDjHsvgh5XTO5UzU7XsIBjqXmpWKQT7sam+TNpCl/aYzh1sQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAFXkEOz9AMWxvcQq0s3oEbzPHZEmjRfgNVQhHjFlW1R41MY5+ilNfKeZkQ5OjbCq+xaYesAPOGeE2XrrxrJgfjt3ha/AQfVXG+6Y3Y+Qjd98zhR/5Jk6NsMaXZGeLDZ2ZVCbDbGWpN15YMU9ElL28bdUJTb4mz6xDAqVZ+/MJ1A08bo8EerANg/QkoFuJlkAlwblh8Lt5sgMjsOM3CdGt3h4W7+dTT8J0MR+64g5iDSwrTr5ZdaFLRhLIgkxLB+RxUxlPyyRb8L+yDbkCDrk+V4Yp4XlTxGuV1yLMdfH7jW7sESx4SzW9zvt1Itx4Qb7tg4uWqaX8II1dhzfgO6Czn4=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"d84197fc58ee4a3bad8db1194425f3a1"}, [
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
  'c1700596-4a4b-4b0a-a707-7b4fec0dfdc6',
  'x-ms-request-id',
  '7edbedf5-be18-4737-a206-c868228b6dd1',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:08:31 GMT',
  'Content-Length',
  '1350'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroOperationCertificateName-canresumefromastoppedpoller-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroOperationCertificateName-canresumefromastoppedpoller-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAr3NUhTG+Z92g6VmSZ8gOgTxTxj9JhgJupSXmyjXkhY0ESsdHocCeAvydzfLQY3JuFTHeg1SPj0xsDmKRmgBEgs3fnHsRoicZGh8NHCrZkzhw4S7h9UBWaoKHX3Iimy1xfy1A+4j2PYOBJJ8y5bMLP5LH81XhZ1kylYjczw6QSBVHhePY37eig1SZLFvU8lstkHahfDbMpv/IcXH0ir226oSkgoU0DAcV+Z6Y9BoCfWjXcwAUiKxPy1nQoDeXt/kcLjXzrYxa3vddPJjfQWkYKTLp4CsOgBOu5fv2wHvDjHsvgh5XTO5UzU7XsIBjqXmpWKQT7sam+TNpCl/aYzh1sQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAFXkEOz9AMWxvcQq0s3oEbzPHZEmjRfgNVQhHjFlW1R41MY5+ilNfKeZkQ5OjbCq+xaYesAPOGeE2XrrxrJgfjt3ha/AQfVXG+6Y3Y+Qjd98zhR/5Jk6NsMaXZGeLDZ2ZVCbDbGWpN15YMU9ElL28bdUJTb4mz6xDAqVZ+/MJ1A08bo8EerANg/QkoFuJlkAlwblh8Lt5sgMjsOM3CdGt3h4W7+dTT8J0MR+64g5iDSwrTr5ZdaFLRhLIgkxLB+RxUxlPyyRb8L+yDbkCDrk+V4Yp4XlTxGuV1yLMdfH7jW7sESx4SzW9zvt1Itx4Qb7tg4uWqaX8II1dhzfgO6Czn4=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"d84197fc58ee4a3bad8db1194425f3a1"}, [
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
  '91fcb14c-3507-40b5-bf54-633e53ee8ff5',
  'x-ms-request-id',
  '77059261-97e1-45fc-899e-32abdc367fb2',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:08:33 GMT',
  'Content-Length',
  '1350'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroOperationCertificateName-canresumefromastoppedpoller-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroOperationCertificateName-canresumefromastoppedpoller-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAr3NUhTG+Z92g6VmSZ8gOgTxTxj9JhgJupSXmyjXkhY0ESsdHocCeAvydzfLQY3JuFTHeg1SPj0xsDmKRmgBEgs3fnHsRoicZGh8NHCrZkzhw4S7h9UBWaoKHX3Iimy1xfy1A+4j2PYOBJJ8y5bMLP5LH81XhZ1kylYjczw6QSBVHhePY37eig1SZLFvU8lstkHahfDbMpv/IcXH0ir226oSkgoU0DAcV+Z6Y9BoCfWjXcwAUiKxPy1nQoDeXt/kcLjXzrYxa3vddPJjfQWkYKTLp4CsOgBOu5fv2wHvDjHsvgh5XTO5UzU7XsIBjqXmpWKQT7sam+TNpCl/aYzh1sQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAFXkEOz9AMWxvcQq0s3oEbzPHZEmjRfgNVQhHjFlW1R41MY5+ilNfKeZkQ5OjbCq+xaYesAPOGeE2XrrxrJgfjt3ha/AQfVXG+6Y3Y+Qjd98zhR/5Jk6NsMaXZGeLDZ2ZVCbDbGWpN15YMU9ElL28bdUJTb4mz6xDAqVZ+/MJ1A08bo8EerANg/QkoFuJlkAlwblh8Lt5sgMjsOM3CdGt3h4W7+dTT8J0MR+64g5iDSwrTr5ZdaFLRhLIgkxLB+RxUxlPyyRb8L+yDbkCDrk+V4Yp4XlTxGuV1yLMdfH7jW7sESx4SzW9zvt1Itx4Qb7tg4uWqaX8II1dhzfgO6Czn4=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"d84197fc58ee4a3bad8db1194425f3a1"}, [
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
  '6756da96-2bf0-4587-b67f-9e1a3b96210c',
  'x-ms-request-id',
  'c7fabb31-a68b-4084-9f74-c0585c529ee3',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:08:36 GMT',
  'Content-Length',
  '1350'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroOperationCertificateName-canresumefromastoppedpoller-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroOperationCertificateName-canresumefromastoppedpoller-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAr3NUhTG+Z92g6VmSZ8gOgTxTxj9JhgJupSXmyjXkhY0ESsdHocCeAvydzfLQY3JuFTHeg1SPj0xsDmKRmgBEgs3fnHsRoicZGh8NHCrZkzhw4S7h9UBWaoKHX3Iimy1xfy1A+4j2PYOBJJ8y5bMLP5LH81XhZ1kylYjczw6QSBVHhePY37eig1SZLFvU8lstkHahfDbMpv/IcXH0ir226oSkgoU0DAcV+Z6Y9BoCfWjXcwAUiKxPy1nQoDeXt/kcLjXzrYxa3vddPJjfQWkYKTLp4CsOgBOu5fv2wHvDjHsvgh5XTO5UzU7XsIBjqXmpWKQT7sam+TNpCl/aYzh1sQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAFXkEOz9AMWxvcQq0s3oEbzPHZEmjRfgNVQhHjFlW1R41MY5+ilNfKeZkQ5OjbCq+xaYesAPOGeE2XrrxrJgfjt3ha/AQfVXG+6Y3Y+Qjd98zhR/5Jk6NsMaXZGeLDZ2ZVCbDbGWpN15YMU9ElL28bdUJTb4mz6xDAqVZ+/MJ1A08bo8EerANg/QkoFuJlkAlwblh8Lt5sgMjsOM3CdGt3h4W7+dTT8J0MR+64g5iDSwrTr5ZdaFLRhLIgkxLB+RxUxlPyyRb8L+yDbkCDrk+V4Yp4XlTxGuV1yLMdfH7jW7sESx4SzW9zvt1Itx4Qb7tg4uWqaX8II1dhzfgO6Czn4=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"d84197fc58ee4a3bad8db1194425f3a1"}, [
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
  '9dddb3fb-6998-4375-a2ba-e8ed82d8a52f',
  'x-ms-request-id',
  'fbc4acb8-cf48-48cf-bab7-db60385dba3c',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:08:37 GMT',
  'Content-Length',
  '1350'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroOperationCertificateName-canresumefromastoppedpoller-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroOperationCertificateName-canresumefromastoppedpoller-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAr3NUhTG+Z92g6VmSZ8gOgTxTxj9JhgJupSXmyjXkhY0ESsdHocCeAvydzfLQY3JuFTHeg1SPj0xsDmKRmgBEgs3fnHsRoicZGh8NHCrZkzhw4S7h9UBWaoKHX3Iimy1xfy1A+4j2PYOBJJ8y5bMLP5LH81XhZ1kylYjczw6QSBVHhePY37eig1SZLFvU8lstkHahfDbMpv/IcXH0ir226oSkgoU0DAcV+Z6Y9BoCfWjXcwAUiKxPy1nQoDeXt/kcLjXzrYxa3vddPJjfQWkYKTLp4CsOgBOu5fv2wHvDjHsvgh5XTO5UzU7XsIBjqXmpWKQT7sam+TNpCl/aYzh1sQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAFXkEOz9AMWxvcQq0s3oEbzPHZEmjRfgNVQhHjFlW1R41MY5+ilNfKeZkQ5OjbCq+xaYesAPOGeE2XrrxrJgfjt3ha/AQfVXG+6Y3Y+Qjd98zhR/5Jk6NsMaXZGeLDZ2ZVCbDbGWpN15YMU9ElL28bdUJTb4mz6xDAqVZ+/MJ1A08bo8EerANg/QkoFuJlkAlwblh8Lt5sgMjsOM3CdGt3h4W7+dTT8J0MR+64g5iDSwrTr5ZdaFLRhLIgkxLB+RxUxlPyyRb8L+yDbkCDrk+V4Yp4XlTxGuV1yLMdfH7jW7sESx4SzW9zvt1Itx4Qb7tg4uWqaX8II1dhzfgO6Czn4=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"d84197fc58ee4a3bad8db1194425f3a1"}, [
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
  '13b8e36c-049c-412b-a437-0eb5211c562c',
  'x-ms-request-id',
  'ec42f205-fb35-431d-b9b3-cea5f4302555',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:08:39 GMT',
  'Content-Length',
  '1350'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroOperationCertificateName-canresumefromastoppedpoller-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroOperationCertificateName-canresumefromastoppedpoller-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAr3NUhTG+Z92g6VmSZ8gOgTxTxj9JhgJupSXmyjXkhY0ESsdHocCeAvydzfLQY3JuFTHeg1SPj0xsDmKRmgBEgs3fnHsRoicZGh8NHCrZkzhw4S7h9UBWaoKHX3Iimy1xfy1A+4j2PYOBJJ8y5bMLP5LH81XhZ1kylYjczw6QSBVHhePY37eig1SZLFvU8lstkHahfDbMpv/IcXH0ir226oSkgoU0DAcV+Z6Y9BoCfWjXcwAUiKxPy1nQoDeXt/kcLjXzrYxa3vddPJjfQWkYKTLp4CsOgBOu5fv2wHvDjHsvgh5XTO5UzU7XsIBjqXmpWKQT7sam+TNpCl/aYzh1sQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAFXkEOz9AMWxvcQq0s3oEbzPHZEmjRfgNVQhHjFlW1R41MY5+ilNfKeZkQ5OjbCq+xaYesAPOGeE2XrrxrJgfjt3ha/AQfVXG+6Y3Y+Qjd98zhR/5Jk6NsMaXZGeLDZ2ZVCbDbGWpN15YMU9ElL28bdUJTb4mz6xDAqVZ+/MJ1A08bo8EerANg/QkoFuJlkAlwblh8Lt5sgMjsOM3CdGt3h4W7+dTT8J0MR+64g5iDSwrTr5ZdaFLRhLIgkxLB+RxUxlPyyRb8L+yDbkCDrk+V4Yp4XlTxGuV1yLMdfH7jW7sESx4SzW9zvt1Itx4Qb7tg4uWqaX8II1dhzfgO6Czn4=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"d84197fc58ee4a3bad8db1194425f3a1"}, [
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
  'd8badf0a-10d1-4e62-89ba-761bfa2ea48e',
  'x-ms-request-id',
  'db3add9f-1e97-4545-bcba-291fe538a2d9',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:08:42 GMT',
  'Content-Length',
  '1350'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroOperationCertificateName-canresumefromastoppedpoller-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroOperationCertificateName-canresumefromastoppedpoller-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAr3NUhTG+Z92g6VmSZ8gOgTxTxj9JhgJupSXmyjXkhY0ESsdHocCeAvydzfLQY3JuFTHeg1SPj0xsDmKRmgBEgs3fnHsRoicZGh8NHCrZkzhw4S7h9UBWaoKHX3Iimy1xfy1A+4j2PYOBJJ8y5bMLP5LH81XhZ1kylYjczw6QSBVHhePY37eig1SZLFvU8lstkHahfDbMpv/IcXH0ir226oSkgoU0DAcV+Z6Y9BoCfWjXcwAUiKxPy1nQoDeXt/kcLjXzrYxa3vddPJjfQWkYKTLp4CsOgBOu5fv2wHvDjHsvgh5XTO5UzU7XsIBjqXmpWKQT7sam+TNpCl/aYzh1sQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAFXkEOz9AMWxvcQq0s3oEbzPHZEmjRfgNVQhHjFlW1R41MY5+ilNfKeZkQ5OjbCq+xaYesAPOGeE2XrrxrJgfjt3ha/AQfVXG+6Y3Y+Qjd98zhR/5Jk6NsMaXZGeLDZ2ZVCbDbGWpN15YMU9ElL28bdUJTb4mz6xDAqVZ+/MJ1A08bo8EerANg/QkoFuJlkAlwblh8Lt5sgMjsOM3CdGt3h4W7+dTT8J0MR+64g5iDSwrTr5ZdaFLRhLIgkxLB+RxUxlPyyRb8L+yDbkCDrk+V4Yp4XlTxGuV1yLMdfH7jW7sESx4SzW9zvt1Itx4Qb7tg4uWqaX8II1dhzfgO6Czn4=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"d84197fc58ee4a3bad8db1194425f3a1"}, [
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
  'd5e1446a-4c44-4957-af48-790e778291a1',
  'x-ms-request-id',
  '0d2331a8-4f19-4e1b-924a-428fb392ed1d',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:08:43 GMT',
  'Content-Length',
  '1350'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroOperationCertificateName-canresumefromastoppedpoller-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroOperationCertificateName-canresumefromastoppedpoller-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAr3NUhTG+Z92g6VmSZ8gOgTxTxj9JhgJupSXmyjXkhY0ESsdHocCeAvydzfLQY3JuFTHeg1SPj0xsDmKRmgBEgs3fnHsRoicZGh8NHCrZkzhw4S7h9UBWaoKHX3Iimy1xfy1A+4j2PYOBJJ8y5bMLP5LH81XhZ1kylYjczw6QSBVHhePY37eig1SZLFvU8lstkHahfDbMpv/IcXH0ir226oSkgoU0DAcV+Z6Y9BoCfWjXcwAUiKxPy1nQoDeXt/kcLjXzrYxa3vddPJjfQWkYKTLp4CsOgBOu5fv2wHvDjHsvgh5XTO5UzU7XsIBjqXmpWKQT7sam+TNpCl/aYzh1sQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAFXkEOz9AMWxvcQq0s3oEbzPHZEmjRfgNVQhHjFlW1R41MY5+ilNfKeZkQ5OjbCq+xaYesAPOGeE2XrrxrJgfjt3ha/AQfVXG+6Y3Y+Qjd98zhR/5Jk6NsMaXZGeLDZ2ZVCbDbGWpN15YMU9ElL28bdUJTb4mz6xDAqVZ+/MJ1A08bo8EerANg/QkoFuJlkAlwblh8Lt5sgMjsOM3CdGt3h4W7+dTT8J0MR+64g5iDSwrTr5ZdaFLRhLIgkxLB+RxUxlPyyRb8L+yDbkCDrk+V4Yp4XlTxGuV1yLMdfH7jW7sESx4SzW9zvt1Itx4Qb7tg4uWqaX8II1dhzfgO6Czn4=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"d84197fc58ee4a3bad8db1194425f3a1"}, [
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
  'ace586fe-df9f-4733-b3b0-c6d469cb9c0a',
  'x-ms-request-id',
  '73acd66d-ce77-4815-bc63-f50645c3ee5f',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:08:46 GMT',
  'Content-Length',
  '1350'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroOperationCertificateName-canresumefromastoppedpoller-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroOperationCertificateName-canresumefromastoppedpoller-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAr3NUhTG+Z92g6VmSZ8gOgTxTxj9JhgJupSXmyjXkhY0ESsdHocCeAvydzfLQY3JuFTHeg1SPj0xsDmKRmgBEgs3fnHsRoicZGh8NHCrZkzhw4S7h9UBWaoKHX3Iimy1xfy1A+4j2PYOBJJ8y5bMLP5LH81XhZ1kylYjczw6QSBVHhePY37eig1SZLFvU8lstkHahfDbMpv/IcXH0ir226oSkgoU0DAcV+Z6Y9BoCfWjXcwAUiKxPy1nQoDeXt/kcLjXzrYxa3vddPJjfQWkYKTLp4CsOgBOu5fv2wHvDjHsvgh5XTO5UzU7XsIBjqXmpWKQT7sam+TNpCl/aYzh1sQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAFXkEOz9AMWxvcQq0s3oEbzPHZEmjRfgNVQhHjFlW1R41MY5+ilNfKeZkQ5OjbCq+xaYesAPOGeE2XrrxrJgfjt3ha/AQfVXG+6Y3Y+Qjd98zhR/5Jk6NsMaXZGeLDZ2ZVCbDbGWpN15YMU9ElL28bdUJTb4mz6xDAqVZ+/MJ1A08bo8EerANg/QkoFuJlkAlwblh8Lt5sgMjsOM3CdGt3h4W7+dTT8J0MR+64g5iDSwrTr5ZdaFLRhLIgkxLB+RxUxlPyyRb8L+yDbkCDrk+V4Yp4XlTxGuV1yLMdfH7jW7sESx4SzW9zvt1Itx4Qb7tg4uWqaX8II1dhzfgO6Czn4=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"d84197fc58ee4a3bad8db1194425f3a1"}, [
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
  '09827fe2-4785-4d03-9139-4f8857e79f9b',
  'x-ms-request-id',
  'b803a007-4076-4611-9863-294a6e6407dc',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:08:47 GMT',
  'Content-Length',
  '1350'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroOperationCertificateName-canresumefromastoppedpoller-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroOperationCertificateName-canresumefromastoppedpoller-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAr3NUhTG+Z92g6VmSZ8gOgTxTxj9JhgJupSXmyjXkhY0ESsdHocCeAvydzfLQY3JuFTHeg1SPj0xsDmKRmgBEgs3fnHsRoicZGh8NHCrZkzhw4S7h9UBWaoKHX3Iimy1xfy1A+4j2PYOBJJ8y5bMLP5LH81XhZ1kylYjczw6QSBVHhePY37eig1SZLFvU8lstkHahfDbMpv/IcXH0ir226oSkgoU0DAcV+Z6Y9BoCfWjXcwAUiKxPy1nQoDeXt/kcLjXzrYxa3vddPJjfQWkYKTLp4CsOgBOu5fv2wHvDjHsvgh5XTO5UzU7XsIBjqXmpWKQT7sam+TNpCl/aYzh1sQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAFXkEOz9AMWxvcQq0s3oEbzPHZEmjRfgNVQhHjFlW1R41MY5+ilNfKeZkQ5OjbCq+xaYesAPOGeE2XrrxrJgfjt3ha/AQfVXG+6Y3Y+Qjd98zhR/5Jk6NsMaXZGeLDZ2ZVCbDbGWpN15YMU9ElL28bdUJTb4mz6xDAqVZ+/MJ1A08bo8EerANg/QkoFuJlkAlwblh8Lt5sgMjsOM3CdGt3h4W7+dTT8J0MR+64g5iDSwrTr5ZdaFLRhLIgkxLB+RxUxlPyyRb8L+yDbkCDrk+V4Yp4XlTxGuV1yLMdfH7jW7sESx4SzW9zvt1Itx4Qb7tg4uWqaX8II1dhzfgO6Czn4=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"d84197fc58ee4a3bad8db1194425f3a1"}, [
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
  '6bfa5e17-7eb6-4bb6-8f81-652d45da56a7',
  'x-ms-request-id',
  '99b534de-3295-413e-b568-0153d16ee900',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:08:50 GMT',
  'Content-Length',
  '1350'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroOperationCertificateName-canresumefromastoppedpoller-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroOperationCertificateName-canresumefromastoppedpoller-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAr3NUhTG+Z92g6VmSZ8gOgTxTxj9JhgJupSXmyjXkhY0ESsdHocCeAvydzfLQY3JuFTHeg1SPj0xsDmKRmgBEgs3fnHsRoicZGh8NHCrZkzhw4S7h9UBWaoKHX3Iimy1xfy1A+4j2PYOBJJ8y5bMLP5LH81XhZ1kylYjczw6QSBVHhePY37eig1SZLFvU8lstkHahfDbMpv/IcXH0ir226oSkgoU0DAcV+Z6Y9BoCfWjXcwAUiKxPy1nQoDeXt/kcLjXzrYxa3vddPJjfQWkYKTLp4CsOgBOu5fv2wHvDjHsvgh5XTO5UzU7XsIBjqXmpWKQT7sam+TNpCl/aYzh1sQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAFXkEOz9AMWxvcQq0s3oEbzPHZEmjRfgNVQhHjFlW1R41MY5+ilNfKeZkQ5OjbCq+xaYesAPOGeE2XrrxrJgfjt3ha/AQfVXG+6Y3Y+Qjd98zhR/5Jk6NsMaXZGeLDZ2ZVCbDbGWpN15YMU9ElL28bdUJTb4mz6xDAqVZ+/MJ1A08bo8EerANg/QkoFuJlkAlwblh8Lt5sgMjsOM3CdGt3h4W7+dTT8J0MR+64g5iDSwrTr5ZdaFLRhLIgkxLB+RxUxlPyyRb8L+yDbkCDrk+V4Yp4XlTxGuV1yLMdfH7jW7sESx4SzW9zvt1Itx4Qb7tg4uWqaX8II1dhzfgO6Czn4=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"d84197fc58ee4a3bad8db1194425f3a1"}, [
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
  '47cea168-c2e6-4303-aeef-3b960c0f7959',
  'x-ms-request-id',
  '3ff47403-14a8-438c-b670-bd7336fdf09d',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:08:52 GMT',
  'Content-Length',
  '1350'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroOperationCertificateName-canresumefromastoppedpoller-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroOperationCertificateName-canresumefromastoppedpoller-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAr3NUhTG+Z92g6VmSZ8gOgTxTxj9JhgJupSXmyjXkhY0ESsdHocCeAvydzfLQY3JuFTHeg1SPj0xsDmKRmgBEgs3fnHsRoicZGh8NHCrZkzhw4S7h9UBWaoKHX3Iimy1xfy1A+4j2PYOBJJ8y5bMLP5LH81XhZ1kylYjczw6QSBVHhePY37eig1SZLFvU8lstkHahfDbMpv/IcXH0ir226oSkgoU0DAcV+Z6Y9BoCfWjXcwAUiKxPy1nQoDeXt/kcLjXzrYxa3vddPJjfQWkYKTLp4CsOgBOu5fv2wHvDjHsvgh5XTO5UzU7XsIBjqXmpWKQT7sam+TNpCl/aYzh1sQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAFXkEOz9AMWxvcQq0s3oEbzPHZEmjRfgNVQhHjFlW1R41MY5+ilNfKeZkQ5OjbCq+xaYesAPOGeE2XrrxrJgfjt3ha/AQfVXG+6Y3Y+Qjd98zhR/5Jk6NsMaXZGeLDZ2ZVCbDbGWpN15YMU9ElL28bdUJTb4mz6xDAqVZ+/MJ1A08bo8EerANg/QkoFuJlkAlwblh8Lt5sgMjsOM3CdGt3h4W7+dTT8J0MR+64g5iDSwrTr5ZdaFLRhLIgkxLB+RxUxlPyyRb8L+yDbkCDrk+V4Yp4XlTxGuV1yLMdfH7jW7sESx4SzW9zvt1Itx4Qb7tg4uWqaX8II1dhzfgO6Czn4=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"d84197fc58ee4a3bad8db1194425f3a1"}, [
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
  'a8be5ffe-7ecd-4070-b3b6-2f4de154e968',
  'x-ms-request-id',
  'f83e9482-1f23-463b-baa9-c6f5692fb093',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:08:54 GMT',
  'Content-Length',
  '1350'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroOperationCertificateName-canresumefromastoppedpoller-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroOperationCertificateName-canresumefromastoppedpoller-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAr3NUhTG+Z92g6VmSZ8gOgTxTxj9JhgJupSXmyjXkhY0ESsdHocCeAvydzfLQY3JuFTHeg1SPj0xsDmKRmgBEgs3fnHsRoicZGh8NHCrZkzhw4S7h9UBWaoKHX3Iimy1xfy1A+4j2PYOBJJ8y5bMLP5LH81XhZ1kylYjczw6QSBVHhePY37eig1SZLFvU8lstkHahfDbMpv/IcXH0ir226oSkgoU0DAcV+Z6Y9BoCfWjXcwAUiKxPy1nQoDeXt/kcLjXzrYxa3vddPJjfQWkYKTLp4CsOgBOu5fv2wHvDjHsvgh5XTO5UzU7XsIBjqXmpWKQT7sam+TNpCl/aYzh1sQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAFXkEOz9AMWxvcQq0s3oEbzPHZEmjRfgNVQhHjFlW1R41MY5+ilNfKeZkQ5OjbCq+xaYesAPOGeE2XrrxrJgfjt3ha/AQfVXG+6Y3Y+Qjd98zhR/5Jk6NsMaXZGeLDZ2ZVCbDbGWpN15YMU9ElL28bdUJTb4mz6xDAqVZ+/MJ1A08bo8EerANg/QkoFuJlkAlwblh8Lt5sgMjsOM3CdGt3h4W7+dTT8J0MR+64g5iDSwrTr5ZdaFLRhLIgkxLB+RxUxlPyyRb8L+yDbkCDrk+V4Yp4XlTxGuV1yLMdfH7jW7sESx4SzW9zvt1Itx4Qb7tg4uWqaX8II1dhzfgO6Czn4=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"d84197fc58ee4a3bad8db1194425f3a1"}, [
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
  'e3481ce6-7d2d-4f03-89b6-9342b9c8e4c9',
  'x-ms-request-id',
  '5ec2afd0-5aa4-483f-8bf4-dd13355e75e9',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:08:57 GMT',
  'Content-Length',
  '1350'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroOperationCertificateName-canresumefromastoppedpoller-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroOperationCertificateName-canresumefromastoppedpoller-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAr3NUhTG+Z92g6VmSZ8gOgTxTxj9JhgJupSXmyjXkhY0ESsdHocCeAvydzfLQY3JuFTHeg1SPj0xsDmKRmgBEgs3fnHsRoicZGh8NHCrZkzhw4S7h9UBWaoKHX3Iimy1xfy1A+4j2PYOBJJ8y5bMLP5LH81XhZ1kylYjczw6QSBVHhePY37eig1SZLFvU8lstkHahfDbMpv/IcXH0ir226oSkgoU0DAcV+Z6Y9BoCfWjXcwAUiKxPy1nQoDeXt/kcLjXzrYxa3vddPJjfQWkYKTLp4CsOgBOu5fv2wHvDjHsvgh5XTO5UzU7XsIBjqXmpWKQT7sam+TNpCl/aYzh1sQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAFXkEOz9AMWxvcQq0s3oEbzPHZEmjRfgNVQhHjFlW1R41MY5+ilNfKeZkQ5OjbCq+xaYesAPOGeE2XrrxrJgfjt3ha/AQfVXG+6Y3Y+Qjd98zhR/5Jk6NsMaXZGeLDZ2ZVCbDbGWpN15YMU9ElL28bdUJTb4mz6xDAqVZ+/MJ1A08bo8EerANg/QkoFuJlkAlwblh8Lt5sgMjsOM3CdGt3h4W7+dTT8J0MR+64g5iDSwrTr5ZdaFLRhLIgkxLB+RxUxlPyyRb8L+yDbkCDrk+V4Yp4XlTxGuV1yLMdfH7jW7sESx4SzW9zvt1Itx4Qb7tg4uWqaX8II1dhzfgO6Czn4=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"d84197fc58ee4a3bad8db1194425f3a1"}, [
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
  '620861d6-7e0b-4fa2-9f83-5956b130ab35',
  'x-ms-request-id',
  'ac792ca4-0711-440b-9a94-b9deaab625c6',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:08:58 GMT',
  'Content-Length',
  '1350'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroOperationCertificateName-canresumefromastoppedpoller-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroOperationCertificateName-canresumefromastoppedpoller-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAr3NUhTG+Z92g6VmSZ8gOgTxTxj9JhgJupSXmyjXkhY0ESsdHocCeAvydzfLQY3JuFTHeg1SPj0xsDmKRmgBEgs3fnHsRoicZGh8NHCrZkzhw4S7h9UBWaoKHX3Iimy1xfy1A+4j2PYOBJJ8y5bMLP5LH81XhZ1kylYjczw6QSBVHhePY37eig1SZLFvU8lstkHahfDbMpv/IcXH0ir226oSkgoU0DAcV+Z6Y9BoCfWjXcwAUiKxPy1nQoDeXt/kcLjXzrYxa3vddPJjfQWkYKTLp4CsOgBOu5fv2wHvDjHsvgh5XTO5UzU7XsIBjqXmpWKQT7sam+TNpCl/aYzh1sQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAFXkEOz9AMWxvcQq0s3oEbzPHZEmjRfgNVQhHjFlW1R41MY5+ilNfKeZkQ5OjbCq+xaYesAPOGeE2XrrxrJgfjt3ha/AQfVXG+6Y3Y+Qjd98zhR/5Jk6NsMaXZGeLDZ2ZVCbDbGWpN15YMU9ElL28bdUJTb4mz6xDAqVZ+/MJ1A08bo8EerANg/QkoFuJlkAlwblh8Lt5sgMjsOM3CdGt3h4W7+dTT8J0MR+64g5iDSwrTr5ZdaFLRhLIgkxLB+RxUxlPyyRb8L+yDbkCDrk+V4Yp4XlTxGuV1yLMdfH7jW7sESx4SzW9zvt1Itx4Qb7tg4uWqaX8II1dhzfgO6Czn4=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"d84197fc58ee4a3bad8db1194425f3a1"}, [
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
  '79a4c419-2adc-4899-a0a4-31aacc3ad610',
  'x-ms-request-id',
  'afacf264-aee6-4bd2-aea8-f7be678c1b77',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:09:01 GMT',
  'Content-Length',
  '1350'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroOperationCertificateName-canresumefromastoppedpoller-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroOperationCertificateName-canresumefromastoppedpoller-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAr3NUhTG+Z92g6VmSZ8gOgTxTxj9JhgJupSXmyjXkhY0ESsdHocCeAvydzfLQY3JuFTHeg1SPj0xsDmKRmgBEgs3fnHsRoicZGh8NHCrZkzhw4S7h9UBWaoKHX3Iimy1xfy1A+4j2PYOBJJ8y5bMLP5LH81XhZ1kylYjczw6QSBVHhePY37eig1SZLFvU8lstkHahfDbMpv/IcXH0ir226oSkgoU0DAcV+Z6Y9BoCfWjXcwAUiKxPy1nQoDeXt/kcLjXzrYxa3vddPJjfQWkYKTLp4CsOgBOu5fv2wHvDjHsvgh5XTO5UzU7XsIBjqXmpWKQT7sam+TNpCl/aYzh1sQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAFXkEOz9AMWxvcQq0s3oEbzPHZEmjRfgNVQhHjFlW1R41MY5+ilNfKeZkQ5OjbCq+xaYesAPOGeE2XrrxrJgfjt3ha/AQfVXG+6Y3Y+Qjd98zhR/5Jk6NsMaXZGeLDZ2ZVCbDbGWpN15YMU9ElL28bdUJTb4mz6xDAqVZ+/MJ1A08bo8EerANg/QkoFuJlkAlwblh8Lt5sgMjsOM3CdGt3h4W7+dTT8J0MR+64g5iDSwrTr5ZdaFLRhLIgkxLB+RxUxlPyyRb8L+yDbkCDrk+V4Yp4XlTxGuV1yLMdfH7jW7sESx4SzW9zvt1Itx4Qb7tg4uWqaX8II1dhzfgO6Czn4=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"d84197fc58ee4a3bad8db1194425f3a1"}, [
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
  '5a938d25-2516-4400-8bf6-2a5fd01caae7',
  'x-ms-request-id',
  '10f76ce2-8257-4bbe-8973-21d3059fd695',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:09:03 GMT',
  'Content-Length',
  '1350'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroOperationCertificateName-canresumefromastoppedpoller-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroOperationCertificateName-canresumefromastoppedpoller-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAr3NUhTG+Z92g6VmSZ8gOgTxTxj9JhgJupSXmyjXkhY0ESsdHocCeAvydzfLQY3JuFTHeg1SPj0xsDmKRmgBEgs3fnHsRoicZGh8NHCrZkzhw4S7h9UBWaoKHX3Iimy1xfy1A+4j2PYOBJJ8y5bMLP5LH81XhZ1kylYjczw6QSBVHhePY37eig1SZLFvU8lstkHahfDbMpv/IcXH0ir226oSkgoU0DAcV+Z6Y9BoCfWjXcwAUiKxPy1nQoDeXt/kcLjXzrYxa3vddPJjfQWkYKTLp4CsOgBOu5fv2wHvDjHsvgh5XTO5UzU7XsIBjqXmpWKQT7sam+TNpCl/aYzh1sQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAFXkEOz9AMWxvcQq0s3oEbzPHZEmjRfgNVQhHjFlW1R41MY5+ilNfKeZkQ5OjbCq+xaYesAPOGeE2XrrxrJgfjt3ha/AQfVXG+6Y3Y+Qjd98zhR/5Jk6NsMaXZGeLDZ2ZVCbDbGWpN15YMU9ElL28bdUJTb4mz6xDAqVZ+/MJ1A08bo8EerANg/QkoFuJlkAlwblh8Lt5sgMjsOM3CdGt3h4W7+dTT8J0MR+64g5iDSwrTr5ZdaFLRhLIgkxLB+RxUxlPyyRb8L+yDbkCDrk+V4Yp4XlTxGuV1yLMdfH7jW7sESx4SzW9zvt1Itx4Qb7tg4uWqaX8II1dhzfgO6Czn4=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"d84197fc58ee4a3bad8db1194425f3a1"}, [
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
  '66d48205-4f05-4c67-bc85-899611010327',
  'x-ms-request-id',
  'eebd8a1e-7ebe-49cd-ad34-51291eb2a3f1',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:09:05 GMT',
  'Content-Length',
  '1350'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroOperationCertificateName-canresumefromastoppedpoller-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroOperationCertificateName-canresumefromastoppedpoller-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAr3NUhTG+Z92g6VmSZ8gOgTxTxj9JhgJupSXmyjXkhY0ESsdHocCeAvydzfLQY3JuFTHeg1SPj0xsDmKRmgBEgs3fnHsRoicZGh8NHCrZkzhw4S7h9UBWaoKHX3Iimy1xfy1A+4j2PYOBJJ8y5bMLP5LH81XhZ1kylYjczw6QSBVHhePY37eig1SZLFvU8lstkHahfDbMpv/IcXH0ir226oSkgoU0DAcV+Z6Y9BoCfWjXcwAUiKxPy1nQoDeXt/kcLjXzrYxa3vddPJjfQWkYKTLp4CsOgBOu5fv2wHvDjHsvgh5XTO5UzU7XsIBjqXmpWKQT7sam+TNpCl/aYzh1sQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAFXkEOz9AMWxvcQq0s3oEbzPHZEmjRfgNVQhHjFlW1R41MY5+ilNfKeZkQ5OjbCq+xaYesAPOGeE2XrrxrJgfjt3ha/AQfVXG+6Y3Y+Qjd98zhR/5Jk6NsMaXZGeLDZ2ZVCbDbGWpN15YMU9ElL28bdUJTb4mz6xDAqVZ+/MJ1A08bo8EerANg/QkoFuJlkAlwblh8Lt5sgMjsOM3CdGt3h4W7+dTT8J0MR+64g5iDSwrTr5ZdaFLRhLIgkxLB+RxUxlPyyRb8L+yDbkCDrk+V4Yp4XlTxGuV1yLMdfH7jW7sESx4SzW9zvt1Itx4Qb7tg4uWqaX8II1dhzfgO6Czn4=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"d84197fc58ee4a3bad8db1194425f3a1"}, [
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
  'b096289b-86e7-4156-b801-0708279b7d32',
  'x-ms-request-id',
  'ccd62192-60ac-4bba-b846-161e2cc3e876',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:09:07 GMT',
  'Content-Length',
  '1350'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroOperationCertificateName-canresumefromastoppedpoller-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroOperationCertificateName-canresumefromastoppedpoller-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAr3NUhTG+Z92g6VmSZ8gOgTxTxj9JhgJupSXmyjXkhY0ESsdHocCeAvydzfLQY3JuFTHeg1SPj0xsDmKRmgBEgs3fnHsRoicZGh8NHCrZkzhw4S7h9UBWaoKHX3Iimy1xfy1A+4j2PYOBJJ8y5bMLP5LH81XhZ1kylYjczw6QSBVHhePY37eig1SZLFvU8lstkHahfDbMpv/IcXH0ir226oSkgoU0DAcV+Z6Y9BoCfWjXcwAUiKxPy1nQoDeXt/kcLjXzrYxa3vddPJjfQWkYKTLp4CsOgBOu5fv2wHvDjHsvgh5XTO5UzU7XsIBjqXmpWKQT7sam+TNpCl/aYzh1sQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAFXkEOz9AMWxvcQq0s3oEbzPHZEmjRfgNVQhHjFlW1R41MY5+ilNfKeZkQ5OjbCq+xaYesAPOGeE2XrrxrJgfjt3ha/AQfVXG+6Y3Y+Qjd98zhR/5Jk6NsMaXZGeLDZ2ZVCbDbGWpN15YMU9ElL28bdUJTb4mz6xDAqVZ+/MJ1A08bo8EerANg/QkoFuJlkAlwblh8Lt5sgMjsOM3CdGt3h4W7+dTT8J0MR+64g5iDSwrTr5ZdaFLRhLIgkxLB+RxUxlPyyRb8L+yDbkCDrk+V4Yp4XlTxGuV1yLMdfH7jW7sESx4SzW9zvt1Itx4Qb7tg4uWqaX8II1dhzfgO6Czn4=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"d84197fc58ee4a3bad8db1194425f3a1"}, [
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
  '3ae2ecd3-9752-4029-8839-16e4fbecbd67',
  'x-ms-request-id',
  '53afe92b-a05c-4635-87e8-1fdb34bcf9a9',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:09:08 GMT',
  'Content-Length',
  '1350'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroOperationCertificateName-canresumefromastoppedpoller-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroOperationCertificateName-canresumefromastoppedpoller-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAr3NUhTG+Z92g6VmSZ8gOgTxTxj9JhgJupSXmyjXkhY0ESsdHocCeAvydzfLQY3JuFTHeg1SPj0xsDmKRmgBEgs3fnHsRoicZGh8NHCrZkzhw4S7h9UBWaoKHX3Iimy1xfy1A+4j2PYOBJJ8y5bMLP5LH81XhZ1kylYjczw6QSBVHhePY37eig1SZLFvU8lstkHahfDbMpv/IcXH0ir226oSkgoU0DAcV+Z6Y9BoCfWjXcwAUiKxPy1nQoDeXt/kcLjXzrYxa3vddPJjfQWkYKTLp4CsOgBOu5fv2wHvDjHsvgh5XTO5UzU7XsIBjqXmpWKQT7sam+TNpCl/aYzh1sQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAFXkEOz9AMWxvcQq0s3oEbzPHZEmjRfgNVQhHjFlW1R41MY5+ilNfKeZkQ5OjbCq+xaYesAPOGeE2XrrxrJgfjt3ha/AQfVXG+6Y3Y+Qjd98zhR/5Jk6NsMaXZGeLDZ2ZVCbDbGWpN15YMU9ElL28bdUJTb4mz6xDAqVZ+/MJ1A08bo8EerANg/QkoFuJlkAlwblh8Lt5sgMjsOM3CdGt3h4W7+dTT8J0MR+64g5iDSwrTr5ZdaFLRhLIgkxLB+RxUxlPyyRb8L+yDbkCDrk+V4Yp4XlTxGuV1yLMdfH7jW7sESx4SzW9zvt1Itx4Qb7tg4uWqaX8II1dhzfgO6Czn4=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"d84197fc58ee4a3bad8db1194425f3a1"}, [
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
  '8acf2974-f746-4e00-a997-797fcbae88d8',
  'x-ms-request-id',
  '5d7a524b-030c-4ddf-8cba-15dfd446c367',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:09:11 GMT',
  'Content-Length',
  '1350'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroOperationCertificateName-canresumefromastoppedpoller-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroOperationCertificateName-canresumefromastoppedpoller-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAr3NUhTG+Z92g6VmSZ8gOgTxTxj9JhgJupSXmyjXkhY0ESsdHocCeAvydzfLQY3JuFTHeg1SPj0xsDmKRmgBEgs3fnHsRoicZGh8NHCrZkzhw4S7h9UBWaoKHX3Iimy1xfy1A+4j2PYOBJJ8y5bMLP5LH81XhZ1kylYjczw6QSBVHhePY37eig1SZLFvU8lstkHahfDbMpv/IcXH0ir226oSkgoU0DAcV+Z6Y9BoCfWjXcwAUiKxPy1nQoDeXt/kcLjXzrYxa3vddPJjfQWkYKTLp4CsOgBOu5fv2wHvDjHsvgh5XTO5UzU7XsIBjqXmpWKQT7sam+TNpCl/aYzh1sQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAFXkEOz9AMWxvcQq0s3oEbzPHZEmjRfgNVQhHjFlW1R41MY5+ilNfKeZkQ5OjbCq+xaYesAPOGeE2XrrxrJgfjt3ha/AQfVXG+6Y3Y+Qjd98zhR/5Jk6NsMaXZGeLDZ2ZVCbDbGWpN15YMU9ElL28bdUJTb4mz6xDAqVZ+/MJ1A08bo8EerANg/QkoFuJlkAlwblh8Lt5sgMjsOM3CdGt3h4W7+dTT8J0MR+64g5iDSwrTr5ZdaFLRhLIgkxLB+RxUxlPyyRb8L+yDbkCDrk+V4Yp4XlTxGuV1yLMdfH7jW7sESx4SzW9zvt1Itx4Qb7tg4uWqaX8II1dhzfgO6Czn4=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"d84197fc58ee4a3bad8db1194425f3a1"}, [
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
  'f2b20b6b-9166-4501-ab5b-fe4582b144db',
  'x-ms-request-id',
  '1c5d2f4f-b626-4010-aa32-020cc7afedb1',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:09:13 GMT',
  'Content-Length',
  '1350'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroOperationCertificateName-canresumefromastoppedpoller-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroOperationCertificateName-canresumefromastoppedpoller-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAr3NUhTG+Z92g6VmSZ8gOgTxTxj9JhgJupSXmyjXkhY0ESsdHocCeAvydzfLQY3JuFTHeg1SPj0xsDmKRmgBEgs3fnHsRoicZGh8NHCrZkzhw4S7h9UBWaoKHX3Iimy1xfy1A+4j2PYOBJJ8y5bMLP5LH81XhZ1kylYjczw6QSBVHhePY37eig1SZLFvU8lstkHahfDbMpv/IcXH0ir226oSkgoU0DAcV+Z6Y9BoCfWjXcwAUiKxPy1nQoDeXt/kcLjXzrYxa3vddPJjfQWkYKTLp4CsOgBOu5fv2wHvDjHsvgh5XTO5UzU7XsIBjqXmpWKQT7sam+TNpCl/aYzh1sQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAFXkEOz9AMWxvcQq0s3oEbzPHZEmjRfgNVQhHjFlW1R41MY5+ilNfKeZkQ5OjbCq+xaYesAPOGeE2XrrxrJgfjt3ha/AQfVXG+6Y3Y+Qjd98zhR/5Jk6NsMaXZGeLDZ2ZVCbDbGWpN15YMU9ElL28bdUJTb4mz6xDAqVZ+/MJ1A08bo8EerANg/QkoFuJlkAlwblh8Lt5sgMjsOM3CdGt3h4W7+dTT8J0MR+64g5iDSwrTr5ZdaFLRhLIgkxLB+RxUxlPyyRb8L+yDbkCDrk+V4Yp4XlTxGuV1yLMdfH7jW7sESx4SzW9zvt1Itx4Qb7tg4uWqaX8II1dhzfgO6Czn4=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"d84197fc58ee4a3bad8db1194425f3a1"}, [
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
  '85401955-6c95-4baa-9a77-ca589764429f',
  'x-ms-request-id',
  'accd7290-28ec-4344-a586-42cfdc0aa267',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:09:15 GMT',
  'Content-Length',
  '1350'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroOperationCertificateName-canresumefromastoppedpoller-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroOperationCertificateName-canresumefromastoppedpoller-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAr3NUhTG+Z92g6VmSZ8gOgTxTxj9JhgJupSXmyjXkhY0ESsdHocCeAvydzfLQY3JuFTHeg1SPj0xsDmKRmgBEgs3fnHsRoicZGh8NHCrZkzhw4S7h9UBWaoKHX3Iimy1xfy1A+4j2PYOBJJ8y5bMLP5LH81XhZ1kylYjczw6QSBVHhePY37eig1SZLFvU8lstkHahfDbMpv/IcXH0ir226oSkgoU0DAcV+Z6Y9BoCfWjXcwAUiKxPy1nQoDeXt/kcLjXzrYxa3vddPJjfQWkYKTLp4CsOgBOu5fv2wHvDjHsvgh5XTO5UzU7XsIBjqXmpWKQT7sam+TNpCl/aYzh1sQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAFXkEOz9AMWxvcQq0s3oEbzPHZEmjRfgNVQhHjFlW1R41MY5+ilNfKeZkQ5OjbCq+xaYesAPOGeE2XrrxrJgfjt3ha/AQfVXG+6Y3Y+Qjd98zhR/5Jk6NsMaXZGeLDZ2ZVCbDbGWpN15YMU9ElL28bdUJTb4mz6xDAqVZ+/MJ1A08bo8EerANg/QkoFuJlkAlwblh8Lt5sgMjsOM3CdGt3h4W7+dTT8J0MR+64g5iDSwrTr5ZdaFLRhLIgkxLB+RxUxlPyyRb8L+yDbkCDrk+V4Yp4XlTxGuV1yLMdfH7jW7sESx4SzW9zvt1Itx4Qb7tg4uWqaX8II1dhzfgO6Czn4=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"d84197fc58ee4a3bad8db1194425f3a1"}, [
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
  '02c9962a-d29e-4723-829c-b5c9ea35dab7',
  'x-ms-request-id',
  '3de16b78-c958-4484-bf1e-c400da11842f',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:09:17 GMT',
  'Content-Length',
  '1350'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroOperationCertificateName-canresumefromastoppedpoller-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroOperationCertificateName-canresumefromastoppedpoller-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAr3NUhTG+Z92g6VmSZ8gOgTxTxj9JhgJupSXmyjXkhY0ESsdHocCeAvydzfLQY3JuFTHeg1SPj0xsDmKRmgBEgs3fnHsRoicZGh8NHCrZkzhw4S7h9UBWaoKHX3Iimy1xfy1A+4j2PYOBJJ8y5bMLP5LH81XhZ1kylYjczw6QSBVHhePY37eig1SZLFvU8lstkHahfDbMpv/IcXH0ir226oSkgoU0DAcV+Z6Y9BoCfWjXcwAUiKxPy1nQoDeXt/kcLjXzrYxa3vddPJjfQWkYKTLp4CsOgBOu5fv2wHvDjHsvgh5XTO5UzU7XsIBjqXmpWKQT7sam+TNpCl/aYzh1sQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAFXkEOz9AMWxvcQq0s3oEbzPHZEmjRfgNVQhHjFlW1R41MY5+ilNfKeZkQ5OjbCq+xaYesAPOGeE2XrrxrJgfjt3ha/AQfVXG+6Y3Y+Qjd98zhR/5Jk6NsMaXZGeLDZ2ZVCbDbGWpN15YMU9ElL28bdUJTb4mz6xDAqVZ+/MJ1A08bo8EerANg/QkoFuJlkAlwblh8Lt5sgMjsOM3CdGt3h4W7+dTT8J0MR+64g5iDSwrTr5ZdaFLRhLIgkxLB+RxUxlPyyRb8L+yDbkCDrk+V4Yp4XlTxGuV1yLMdfH7jW7sESx4SzW9zvt1Itx4Qb7tg4uWqaX8II1dhzfgO6Czn4=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"d84197fc58ee4a3bad8db1194425f3a1"}, [
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
  '00887680-0195-4236-8c10-dad208e9918c',
  'x-ms-request-id',
  '98d6f13e-a233-44a1-a9cc-6bd59fdef763',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:09:20 GMT',
  'Content-Length',
  '1350'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroOperationCertificateName-canresumefromastoppedpoller-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroOperationCertificateName-canresumefromastoppedpoller-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAr3NUhTG+Z92g6VmSZ8gOgTxTxj9JhgJupSXmyjXkhY0ESsdHocCeAvydzfLQY3JuFTHeg1SPj0xsDmKRmgBEgs3fnHsRoicZGh8NHCrZkzhw4S7h9UBWaoKHX3Iimy1xfy1A+4j2PYOBJJ8y5bMLP5LH81XhZ1kylYjczw6QSBVHhePY37eig1SZLFvU8lstkHahfDbMpv/IcXH0ir226oSkgoU0DAcV+Z6Y9BoCfWjXcwAUiKxPy1nQoDeXt/kcLjXzrYxa3vddPJjfQWkYKTLp4CsOgBOu5fv2wHvDjHsvgh5XTO5UzU7XsIBjqXmpWKQT7sam+TNpCl/aYzh1sQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAFXkEOz9AMWxvcQq0s3oEbzPHZEmjRfgNVQhHjFlW1R41MY5+ilNfKeZkQ5OjbCq+xaYesAPOGeE2XrrxrJgfjt3ha/AQfVXG+6Y3Y+Qjd98zhR/5Jk6NsMaXZGeLDZ2ZVCbDbGWpN15YMU9ElL28bdUJTb4mz6xDAqVZ+/MJ1A08bo8EerANg/QkoFuJlkAlwblh8Lt5sgMjsOM3CdGt3h4W7+dTT8J0MR+64g5iDSwrTr5ZdaFLRhLIgkxLB+RxUxlPyyRb8L+yDbkCDrk+V4Yp4XlTxGuV1yLMdfH7jW7sESx4SzW9zvt1Itx4Qb7tg4uWqaX8II1dhzfgO6Czn4=","cancellation_requested":false,"status":"completed","target":"https://keyvault_name.vault.azure.net/certificates/lroOperationCertificateName-canresumefromastoppedpoller-","request_id":"d84197fc58ee4a3bad8db1194425f3a1"}, [
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
  '7cc954b7-a154-4afb-bced-b7ee0818d4a3',
  'x-ms-request-id',
  'ad154d2a-92af-4866-93cf-40880c5fb4a7',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:09:22 GMT',
  'Content-Length',
  '1327'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroOperationCertificateName-canresumefromastoppedpoller-/')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroOperationCertificateName-canresumefromastoppedpoller-/5a8af9f604984be4a8ad0e05b16f16b4","kid":"https://keyvault_name.vault.azure.net/keys/lroOperationCertificateName-canresumefromastoppedpoller-/5a8af9f604984be4a8ad0e05b16f16b4","sid":"https://keyvault_name.vault.azure.net/secrets/lroOperationCertificateName-canresumefromastoppedpoller-/5a8af9f604984be4a8ad0e05b16f16b4","x5t":"-SANvgqLdXq57XJh4RzmO-wXA6c","cer":"MIIDKDCCAhCgAwIBAgIQIoBOKlQESfmYso5wtX3S9zANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjEwNDI4MjA1OTIwWhcNMjIwNDI4MjEwOTIwWjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQCvc1SFMb5n3aDpWZJnyA6BPFPGP0mGAm6lJebKNeSFjQRKx0ehwJ4C/J3N8tBjcm4VMd6DVI+PTGwOYpGaAESCzd+cexGiJxkaHw0cKtmTOHDhLuH1QFZqgodfciKbLXF/LUD7iPY9g4EknzLlsws/ksfzVeFnWTKViNzPDpBIFUeF49jft6KDVJksW9TyWy2QdqF8Nsym/8hxcfSKvbbqhKSChTQMBxX5npj0GgJ9aNdzABSIrE/LWdCgN5e3+RwuNfOtjFre9108mN9BaRgpMungKw6AE67l+/bAe8OMey+CHldM7lTNTtewgGOpealYpBPuxqb5M2kKX9pjOHWxAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBRJPMM0vSL5CAwQsQqs9u+czASKDjAdBgNVHQ4EFgQUSTzDNL0i+QgMELEKrPbvnMwEig4wDQYJKoZIhvcNAQELBQADggEBAAxqUPKHbDwhG/mSV1RNesx8obi4ofRUAzK3V6CfAmzRLuTzuVpWGYCTiA9m6Hl/R6c4vvgyK/of8Zvx7OP7/d1TvI5OyasQoY6qT5KyWPJxLb1cfo+CaQuQ+IeO2EPFPwtoiXZMKckLbXQU3kV8iDbtUJkfLR/nKn/kkOTZty1fZqUwqRewaEHR7ER8xXL+BYHFQ0w3eaX61bmoT7+rpXaZxXDMmRwWQVhhEIPBP835tAQA86pYRHFaxMJnv52S76i5MhXuQLJViFFaSX08SdOzAU2CwiSb0hTeV006V6M643mNYE3aJVNbtDSANMVV05pWlpCcHhjBq47pKFhTTrk=","attributes":{"enabled":true,"nbf":1619643560,"exp":1651180160,"created":1619644161,"updated":1619644161,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/lroOperationCertificateName-canresumefromastoppedpoller-/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1619644086,"updated":1619644086}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/lroOperationCertificateName-canresumefromastoppedpoller-/pending"}}, [
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
  '64804fb0-981a-4236-94f7-bb7af2f7fc29',
  'x-ms-request-id',
  '2cc6ab9e-3ba0-409f-8458-8bc9e4e1c23c',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:09:22 GMT',
  'Content-Length',
  '2640'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/certificates/lroOperationCertificateName-canresumefromastoppedpoller-')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/lroOperationCertificateName-canresumefromastoppedpoller-","deletedDate":1619644162,"scheduledPurgeDate":1627420162,"id":"https://keyvault_name.vault.azure.net/certificates/lroOperationCertificateName-canresumefromastoppedpoller-/5a8af9f604984be4a8ad0e05b16f16b4","kid":"https://keyvault_name.vault.azure.net/keys/lroOperationCertificateName-canresumefromastoppedpoller-/5a8af9f604984be4a8ad0e05b16f16b4","sid":"https://keyvault_name.vault.azure.net/secrets/lroOperationCertificateName-canresumefromastoppedpoller-/5a8af9f604984be4a8ad0e05b16f16b4","x5t":"-SANvgqLdXq57XJh4RzmO-wXA6c","cer":"MIIDKDCCAhCgAwIBAgIQIoBOKlQESfmYso5wtX3S9zANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjEwNDI4MjA1OTIwWhcNMjIwNDI4MjEwOTIwWjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQCvc1SFMb5n3aDpWZJnyA6BPFPGP0mGAm6lJebKNeSFjQRKx0ehwJ4C/J3N8tBjcm4VMd6DVI+PTGwOYpGaAESCzd+cexGiJxkaHw0cKtmTOHDhLuH1QFZqgodfciKbLXF/LUD7iPY9g4EknzLlsws/ksfzVeFnWTKViNzPDpBIFUeF49jft6KDVJksW9TyWy2QdqF8Nsym/8hxcfSKvbbqhKSChTQMBxX5npj0GgJ9aNdzABSIrE/LWdCgN5e3+RwuNfOtjFre9108mN9BaRgpMungKw6AE67l+/bAe8OMey+CHldM7lTNTtewgGOpealYpBPuxqb5M2kKX9pjOHWxAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBRJPMM0vSL5CAwQsQqs9u+czASKDjAdBgNVHQ4EFgQUSTzDNL0i+QgMELEKrPbvnMwEig4wDQYJKoZIhvcNAQELBQADggEBAAxqUPKHbDwhG/mSV1RNesx8obi4ofRUAzK3V6CfAmzRLuTzuVpWGYCTiA9m6Hl/R6c4vvgyK/of8Zvx7OP7/d1TvI5OyasQoY6qT5KyWPJxLb1cfo+CaQuQ+IeO2EPFPwtoiXZMKckLbXQU3kV8iDbtUJkfLR/nKn/kkOTZty1fZqUwqRewaEHR7ER8xXL+BYHFQ0w3eaX61bmoT7+rpXaZxXDMmRwWQVhhEIPBP835tAQA86pYRHFaxMJnv52S76i5MhXuQLJViFFaSX08SdOzAU2CwiSb0hTeV006V6M643mNYE3aJVNbtDSANMVV05pWlpCcHhjBq47pKFhTTrk=","attributes":{"enabled":true,"nbf":1619643560,"exp":1651180160,"created":1619644161,"updated":1619644161,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/lroOperationCertificateName-canresumefromastoppedpoller-/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1619644086,"updated":1619644086}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/lroOperationCertificateName-canresumefromastoppedpoller-/pending"}}, [
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
  '927cbbdc-000f-4ff1-a7a5-67ed4926584b',
  'x-ms-request-id',
  '03bf4d84-14d9-404c-8b4f-f7209b31efdd',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:09:22 GMT',
  'Content-Length',
  '2850'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroOperationCertificateName-canresumefromastoppedpoller-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroOperationCertificateName-canresumefromastoppedpoller-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '157',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'c3e990ca-1a8e-4c1e-8bef-94b9ad7fc2c8',
  'x-ms-request-id',
  '5169aeef-7879-4663-a819-f6f211863f8a',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:09:22 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroOperationCertificateName-canresumefromastoppedpoller-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroOperationCertificateName-canresumefromastoppedpoller-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '157',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '7aed8561-17a3-4edc-801b-e3634e2c2d13',
  'x-ms-request-id',
  'f6252b26-c26f-464a-990c-43d47e8e53fd',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:09:22 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroOperationCertificateName-canresumefromastoppedpoller-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroOperationCertificateName-canresumefromastoppedpoller-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '157',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '25bb521e-5aaf-43b6-b942-7d7b140404a3',
  'x-ms-request-id',
  '8284bccb-c168-48fe-8e76-4ee823917564',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:09:24 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroOperationCertificateName-canresumefromastoppedpoller-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroOperationCertificateName-canresumefromastoppedpoller-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '157',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '195b4ba7-8962-4dc0-b0ad-fb9ff0a995e7',
  'x-ms-request-id',
  '59f5ea09-652c-4d2f-9ab1-2b11c536f13b',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:09:26 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroOperationCertificateName-canresumefromastoppedpoller-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroOperationCertificateName-canresumefromastoppedpoller-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '157',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'a6b9d464-d63b-4b7d-b883-eb846ba48f86',
  'x-ms-request-id',
  'a221e1c7-64a4-46bb-b471-c6b0e9c66337',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:09:28 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroOperationCertificateName-canresumefromastoppedpoller-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroOperationCertificateName-canresumefromastoppedpoller-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '157',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'd17df2fc-3ed0-48e9-b6f3-a9ef8a55c9bb',
  'x-ms-request-id',
  '60d38716-943a-4cb8-9e70-e4fd96609963',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:09:30 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroOperationCertificateName-canresumefromastoppedpoller-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroOperationCertificateName-canresumefromastoppedpoller-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '157',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '56c27a82-345e-4e9b-8c2c-52f9dcf2db4a',
  'x-ms-request-id',
  '64f3b98e-88b2-49fa-bb7c-7550daf4a171',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:09:32 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroOperationCertificateName-canresumefromastoppedpoller-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroOperationCertificateName-canresumefromastoppedpoller-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '157',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '35ebf9e2-cebf-4652-a240-9bf17d308f9d',
  'x-ms-request-id',
  '28124a57-d033-4288-a3c3-aedda7b90e5d',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:09:35 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroOperationCertificateName-canresumefromastoppedpoller-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroOperationCertificateName-canresumefromastoppedpoller-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '157',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '97df7e35-0d46-41bd-aaee-83a6fe50edc6',
  'x-ms-request-id',
  'b2cbce66-2367-451f-aa37-4b79577b4556',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:09:37 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroOperationCertificateName-canresumefromastoppedpoller-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroOperationCertificateName-canresumefromastoppedpoller-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '157',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '172bfa10-3acf-4c18-855c-77263165fbe0',
  'x-ms-request-id',
  'c446d1ab-2956-4601-86b3-babd375e1483',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:09:39 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroOperationCertificateName-canresumefromastoppedpoller-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroOperationCertificateName-canresumefromastoppedpoller-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '157',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '1a6816f1-197f-4ef8-aa93-e134ed511600',
  'x-ms-request-id',
  'dcf47ae8-b99c-464a-a62d-bd6ea93ab035',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:09:41 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroOperationCertificateName-canresumefromastoppedpoller-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroOperationCertificateName-canresumefromastoppedpoller-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '157',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '2cdb3cb4-76b3-4114-9f8c-332b96bd9527',
  'x-ms-request-id',
  '7bf17f4d-94e8-42f4-9376-a13030907397',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:09:43 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroOperationCertificateName-canresumefromastoppedpoller-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroOperationCertificateName-canresumefromastoppedpoller-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '157',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '5242b9b7-28e4-4e56-bd37-c5815bba0030',
  'x-ms-request-id',
  'd5fa2195-a493-406a-909d-5ffe363f554d',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:09:45 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroOperationCertificateName-canresumefromastoppedpoller-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroOperationCertificateName-canresumefromastoppedpoller-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '157',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '2be9c7a5-ad05-426a-abd4-ceb46bfd12f7',
  'x-ms-request-id',
  '844b9f1e-0d23-43b3-a33a-ba6c6387fc4b',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:09:47 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroOperationCertificateName-canresumefromastoppedpoller-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroOperationCertificateName-canresumefromastoppedpoller-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '157',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '089b33eb-d450-411d-8e9c-8de0dc05a0a2',
  'x-ms-request-id',
  'ce29bbe0-d1e6-4d7b-94fb-cb1311e31f64',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:09:49 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroOperationCertificateName-canresumefromastoppedpoller-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroOperationCertificateName-canresumefromastoppedpoller-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '157',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'e653ea2e-706f-4f1b-ba02-66b8a55d8571',
  'x-ms-request-id',
  '70dfa4d2-3796-4125-a252-73fe21d34e4c',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:09:52 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroOperationCertificateName-canresumefromastoppedpoller-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroOperationCertificateName-canresumefromastoppedpoller-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '157',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '865d9966-ca52-4471-abfd-32040b3dba0c',
  'x-ms-request-id',
  '95b00343-19ef-46a7-bc69-0a3b7477788f',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:09:53 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroOperationCertificateName-canresumefromastoppedpoller-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroOperationCertificateName-canresumefromastoppedpoller-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '157',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '053a7290-8fea-4877-af6d-47961385f9c3',
  'x-ms-request-id',
  '68950907-4bd1-4e9f-b93b-360355107014',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:09:55 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroOperationCertificateName-canresumefromastoppedpoller-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroOperationCertificateName-canresumefromastoppedpoller-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '157',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'df0a14d0-aaa6-4c46-8b68-8e72cd0af311',
  'x-ms-request-id',
  '12e31c0e-1c61-4e07-b936-80dec2a5d449',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:09:58 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroOperationCertificateName-canresumefromastoppedpoller-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroOperationCertificateName-canresumefromastoppedpoller-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '157',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '4757391e-643f-4a40-9686-f7e0a5d3f816',
  'x-ms-request-id',
  'e9d5e7af-5f4f-491e-8783-8c9f093983fd',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:09:59 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroOperationCertificateName-canresumefromastoppedpoller-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroOperationCertificateName-canresumefromastoppedpoller-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '157',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'e3090e2b-7ebc-4f6f-b548-ffab26188554',
  'x-ms-request-id',
  'e912445c-9d84-49d9-a05b-55e7389ca42e',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:10:02 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroOperationCertificateName-canresumefromastoppedpoller-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroOperationCertificateName-canresumefromastoppedpoller-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '157',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'bcf60ae2-894f-41ae-901b-6cecfc41363d',
  'x-ms-request-id',
  '248ea4d6-370e-4501-9c01-6af32e990e9e',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:10:04 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroOperationCertificateName-canresumefromastoppedpoller-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroOperationCertificateName-canresumefromastoppedpoller-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '157',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'a635d299-b42e-4278-b79c-09dfae388233',
  'x-ms-request-id',
  'f90ba7e8-05c2-436c-9a61-46f9293f8791',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:10:06 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroOperationCertificateName-canresumefromastoppedpoller-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroOperationCertificateName-canresumefromastoppedpoller-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '157',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'c5f6140f-dd05-467a-8c33-3af71790895d',
  'x-ms-request-id',
  '1478061c-ccfa-4a28-b1a4-dc34062eeea2',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:10:08 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroOperationCertificateName-canresumefromastoppedpoller-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroOperationCertificateName-canresumefromastoppedpoller-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '157',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'd89b3902-d00d-48a3-a646-092b6f9c6b7c',
  'x-ms-request-id',
  'cf0a0c0c-7b59-49c8-8329-dc6019695514',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:10:10 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroOperationCertificateName-canresumefromastoppedpoller-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroOperationCertificateName-canresumefromastoppedpoller-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '157',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '5db779ce-12c0-4de7-9ce0-8e601df287fa',
  'x-ms-request-id',
  'a8db20a0-51bd-4f3b-97ec-dc6da7816e70',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:10:13 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroOperationCertificateName-canresumefromastoppedpoller-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroOperationCertificateName-canresumefromastoppedpoller-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '157',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'ebc5b012-5aea-430d-908c-22d13dc83fea',
  'x-ms-request-id',
  '440c44a8-b206-452c-a5e3-42fc58c23471',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:10:14 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroOperationCertificateName-canresumefromastoppedpoller-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroOperationCertificateName-canresumefromastoppedpoller-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '157',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'bbf2509a-8383-466a-a0b4-96ecd24a0979',
  'x-ms-request-id',
  '11c2deaa-699d-486b-81e5-1f41d76e3444',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:10:16 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroOperationCertificateName-canresumefromastoppedpoller-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroOperationCertificateName-canresumefromastoppedpoller-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '157',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '11e15b64-4c78-4bd1-b199-20ae3fdda543',
  'x-ms-request-id',
  '80dc026c-12e4-4346-8587-b3adcd1b371a',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:10:18 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroOperationCertificateName-canresumefromastoppedpoller-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroOperationCertificateName-canresumefromastoppedpoller-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '157',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'a824b38f-b170-4541-affa-85f6f517032e',
  'x-ms-request-id',
  '4f1a5428-fba4-4cb6-acf0-f407d062f592',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:10:21 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroOperationCertificateName-canresumefromastoppedpoller-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroOperationCertificateName-canresumefromastoppedpoller-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '157',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '110c0947-de5c-46f0-9cfa-6b420943e404',
  'x-ms-request-id',
  '7f91fe31-693c-4287-b447-1fa1e41d3739',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:10:23 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroOperationCertificateName-canresumefromastoppedpoller-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroOperationCertificateName-canresumefromastoppedpoller-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '157',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '0aea6187-e1ec-4e7e-8c9e-470547262c28',
  'x-ms-request-id',
  'f620d853-ce36-4574-bbe9-26db198b3330',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:10:24 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroOperationCertificateName-canresumefromastoppedpoller-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroOperationCertificateName-canresumefromastoppedpoller-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '157',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'f8538da1-0691-4daa-a95f-0aa68f685865',
  'x-ms-request-id',
  '85b133e5-a6f2-47fb-9b11-31d5117590c5',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:10:27 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroOperationCertificateName-canresumefromastoppedpoller-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroOperationCertificateName-canresumefromastoppedpoller-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '157',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '2e066957-8362-43c8-b8cb-f71864a5329d',
  'x-ms-request-id',
  '42d53e23-b337-4d2c-82be-a48395e2be9c',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:10:29 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroOperationCertificateName-canresumefromastoppedpoller-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroOperationCertificateName-canresumefromastoppedpoller-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '157',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'b6a9deb0-8dda-43d5-8518-18a69e303a90',
  'x-ms-request-id',
  'a24447bc-f0b9-4b38-bafc-1b3671ebcf38',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:10:32 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroOperationCertificateName-canresumefromastoppedpoller-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroOperationCertificateName-canresumefromastoppedpoller-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '157',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '86e76f7e-a3d8-4a1f-a0eb-b272357a38a4',
  'x-ms-request-id',
  '4cc63721-dfea-4500-9f3e-fa58d2867363',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:10:34 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroOperationCertificateName-canresumefromastoppedpoller-')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/lroOperationCertificateName-canresumefromastoppedpoller-","deletedDate":1619644162,"scheduledPurgeDate":1627420162,"id":"https://keyvault_name.vault.azure.net/certificates/lroOperationCertificateName-canresumefromastoppedpoller-/5a8af9f604984be4a8ad0e05b16f16b4","kid":"https://keyvault_name.vault.azure.net/keys/lroOperationCertificateName-canresumefromastoppedpoller-/5a8af9f604984be4a8ad0e05b16f16b4","sid":"https://keyvault_name.vault.azure.net/secrets/lroOperationCertificateName-canresumefromastoppedpoller-/5a8af9f604984be4a8ad0e05b16f16b4","x5t":"-SANvgqLdXq57XJh4RzmO-wXA6c","cer":"MIIDKDCCAhCgAwIBAgIQIoBOKlQESfmYso5wtX3S9zANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjEwNDI4MjA1OTIwWhcNMjIwNDI4MjEwOTIwWjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQCvc1SFMb5n3aDpWZJnyA6BPFPGP0mGAm6lJebKNeSFjQRKx0ehwJ4C/J3N8tBjcm4VMd6DVI+PTGwOYpGaAESCzd+cexGiJxkaHw0cKtmTOHDhLuH1QFZqgodfciKbLXF/LUD7iPY9g4EknzLlsws/ksfzVeFnWTKViNzPDpBIFUeF49jft6KDVJksW9TyWy2QdqF8Nsym/8hxcfSKvbbqhKSChTQMBxX5npj0GgJ9aNdzABSIrE/LWdCgN5e3+RwuNfOtjFre9108mN9BaRgpMungKw6AE67l+/bAe8OMey+CHldM7lTNTtewgGOpealYpBPuxqb5M2kKX9pjOHWxAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBRJPMM0vSL5CAwQsQqs9u+czASKDjAdBgNVHQ4EFgQUSTzDNL0i+QgMELEKrPbvnMwEig4wDQYJKoZIhvcNAQELBQADggEBAAxqUPKHbDwhG/mSV1RNesx8obi4ofRUAzK3V6CfAmzRLuTzuVpWGYCTiA9m6Hl/R6c4vvgyK/of8Zvx7OP7/d1TvI5OyasQoY6qT5KyWPJxLb1cfo+CaQuQ+IeO2EPFPwtoiXZMKckLbXQU3kV8iDbtUJkfLR/nKn/kkOTZty1fZqUwqRewaEHR7ER8xXL+BYHFQ0w3eaX61bmoT7+rpXaZxXDMmRwWQVhhEIPBP835tAQA86pYRHFaxMJnv52S76i5MhXuQLJViFFaSX08SdOzAU2CwiSb0hTeV006V6M643mNYE3aJVNbtDSANMVV05pWlpCcHhjBq47pKFhTTrk=","attributes":{"enabled":true,"nbf":1619643560,"exp":1651180160,"created":1619644161,"updated":1619644161,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/lroOperationCertificateName-canresumefromastoppedpoller-/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1619644086,"updated":1619644086}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/lroOperationCertificateName-canresumefromastoppedpoller-/pending"}}, [
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
  '9a6dab0d-c8ef-4310-91ab-51fc503c4cad',
  'x-ms-request-id',
  'a7879db6-f234-4003-bd93-1b72ffeece1d',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:10:35 GMT',
  'Content-Length',
  '2850'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedcertificates/lroOperationCertificateName-canresumefromastoppedpoller-')
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
  '06fe8014-0019-49f1-8451-5c4d4363a7de',
  'x-ms-request-id',
  '743696f8-5dbd-4b6d-a0ff-4d9b9ae31166',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:10:36 GMT'
]);

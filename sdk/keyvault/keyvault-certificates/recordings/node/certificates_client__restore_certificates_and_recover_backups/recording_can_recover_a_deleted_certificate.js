let nock = require('nock');

module.exports.hash = "9267be851770ae08910f30e97cd90f5c";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/certificates/backupRestoreCertificateName-canrecoveradeletedcertificate-/create')
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
  '7d33ce15-a76c-47b1-b649-bee76df0fe7a',
  'x-ms-request-id',
  'f20bcfb0-f674-476c-b4a5-ba21e5f6e6f9',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:01:31 GMT'
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
  '916aa140-b328-4977-9558-729d30e23400',
  'x-ms-ests-server',
  '2.1.11654.16 - WUS2 ProdSlices',
  'Set-Cookie',
  'fpc=AkYfunN1y51PqJRFyUsIEG4; expires=Fri, 28-May-2021 22:01:31 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrRtuyC0gA7Bou-I8Kl1s_W1rOVDwhRshzlcGaTeYk5__xKMlbFQoHPUYkX3932K8xU4XvaQauxTUNfK_J7ikKCvzWYBMuU3pAzEK9U3zlzl_5CVJy5bJ7jrDwsh6gQh5dvOmFMgKWFLBCWrnaFqn0S8knR5_TvyKi-UilRsDsjJ8gAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 28 Apr 2021 22:01:30 GMT',
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
  '398c972d-05d9-435d-b5c1-eb000d274600',
  'x-ms-ests-server',
  '2.1.11654.16 - SCUS ProdSlices',
  'Set-Cookie',
  'fpc=AkYfunN1y51PqJRFyUsIEG4; expires=Fri, 28-May-2021 22:01:31 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrOLhb4zn4xiuEJU7qCHFvHwrz-TzUUlAq2YDqw8LOcGgUAKwam3ZsZ06qJ8n-BDtNvXiIWoPvM5d8h88slr932LwKEzfjP2ebgh3u1ybs1axqXL7eHjkwdRcHfL0nEK2bo-mvsy3dFqUDbcDs4gjNpHcg6R-yqzF5igQAU8zsR74gAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 28 Apr 2021 22:01:30 GMT'
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
  '076e25e2-b1ae-43ce-89f1-08ddc4f22601',
  'x-ms-ests-server',
  '2.1.11654.16 - EUS ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=AkYfunN1y51PqJRFyUsIEG7mR1YbAQAAADrSG9gOAAAA; expires=Fri, 28-May-2021 22:01:31 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 28 Apr 2021 22:01:31 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/certificates/backupRestoreCertificateName-canrecoveradeletedcertificate-/create', {"policy":{"key_props":{},"secret_props":{},"x509_props":{"subject":"cn=MyCert","sans":{}},"issuer":{"name":"Self"},"attributes":{}},"attributes":{}})
  .query(true)
  .reply(202, {"id":"https://keyvault_name.vault.azure.net/certificates/backupRestoreCertificateName-canrecoveradeletedcertificate-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAzapIIiw3DzOa6BpsyIGSKdztq0vIbXt2jpRP1rvrMilgZpZxNc4Q/+MyTlLeqPwjtDBAT/y1VM2YS+UoNtYWv5wG4LBItZhrBQCrQvInfyVZPCZRN3+jYFcPpTJVZnXtyLY6pJeOk2SD2gKyh61iTzLfna7I7VKwkx3A7HJxMbdjG+WuGYrcOsGGtJsTp6EvFTw7jByRHYdEHmRIxWyYfxk0N1SXPKtyaHgK43dLAMaSNle0wpQRrRhND0CiV0DxD6UjRNBnsv5ZREUy34r9Rax5ACB0eZVwwE1sz0bhfIUb4eU8jERiqJ17vIQ6wPS5Sya8C1ckYIsZP/qL559mYQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAEgRbKLeX881adEx4CLfDRrHfOnjvL8mfyYEjXFuOZ2mBlUA+MWk5xd7230PLdd8hSms6I9JmxtwEL3uCb97wdg3QENLaWyR/TX6j6/nlGePGtabb/H5LAe3PPGDu17lG7jZeqM5VPhytZghCcI20SrA8/Zi/OHdzmX4bHOqIZ0p2zwv9btFtAolFoSyilmlt1POr+/pJcuQaEtGkrMNl/29EeZjZnNwUVQEH95588AtDwocMEw8iVYeAWFxllbqANqY9qYu6zEZowFDELgOtHKSOAnY9EbAzIQ6tEMLGD+IZzA+rqCkWudTYZEXvAZI8IjnpMFcvNk27+QnEkwHmnI=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"4bf7409db9f94c008c644cc8c98198ea"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://keyvault_name.vault.azure.net/certificates/backupRestoreCertificateName-canrecoveradeletedcertificate-/pending?api-version=7.2&request_id=4bf7409db9f94c008c644cc8c98198ea',
  'Retry-After',
  '0',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '7d33ce15-a76c-47b1-b649-bee76df0fe7a',
  'x-ms-request-id',
  'b612abe7-7f87-4978-974c-23551d262491',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:01:32 GMT',
  'Content-Length',
  '1352'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/backupRestoreCertificateName-canrecoveradeletedcertificate-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/backupRestoreCertificateName-canrecoveradeletedcertificate-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAzapIIiw3DzOa6BpsyIGSKdztq0vIbXt2jpRP1rvrMilgZpZxNc4Q/+MyTlLeqPwjtDBAT/y1VM2YS+UoNtYWv5wG4LBItZhrBQCrQvInfyVZPCZRN3+jYFcPpTJVZnXtyLY6pJeOk2SD2gKyh61iTzLfna7I7VKwkx3A7HJxMbdjG+WuGYrcOsGGtJsTp6EvFTw7jByRHYdEHmRIxWyYfxk0N1SXPKtyaHgK43dLAMaSNle0wpQRrRhND0CiV0DxD6UjRNBnsv5ZREUy34r9Rax5ACB0eZVwwE1sz0bhfIUb4eU8jERiqJ17vIQ6wPS5Sya8C1ckYIsZP/qL559mYQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAEgRbKLeX881adEx4CLfDRrHfOnjvL8mfyYEjXFuOZ2mBlUA+MWk5xd7230PLdd8hSms6I9JmxtwEL3uCb97wdg3QENLaWyR/TX6j6/nlGePGtabb/H5LAe3PPGDu17lG7jZeqM5VPhytZghCcI20SrA8/Zi/OHdzmX4bHOqIZ0p2zwv9btFtAolFoSyilmlt1POr+/pJcuQaEtGkrMNl/29EeZjZnNwUVQEH95588AtDwocMEw8iVYeAWFxllbqANqY9qYu6zEZowFDELgOtHKSOAnY9EbAzIQ6tEMLGD+IZzA+rqCkWudTYZEXvAZI8IjnpMFcvNk27+QnEkwHmnI=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"4bf7409db9f94c008c644cc8c98198ea"}, [
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
  '6020cc70-00ed-4324-9ad3-30091d441121',
  'x-ms-request-id',
  '5da42d0a-55e9-4feb-a21c-39344a2f187b',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:01:32 GMT',
  'Content-Length',
  '1352'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/backupRestoreCertificateName-canrecoveradeletedcertificate-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/backupRestoreCertificateName-canrecoveradeletedcertificate-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAzapIIiw3DzOa6BpsyIGSKdztq0vIbXt2jpRP1rvrMilgZpZxNc4Q/+MyTlLeqPwjtDBAT/y1VM2YS+UoNtYWv5wG4LBItZhrBQCrQvInfyVZPCZRN3+jYFcPpTJVZnXtyLY6pJeOk2SD2gKyh61iTzLfna7I7VKwkx3A7HJxMbdjG+WuGYrcOsGGtJsTp6EvFTw7jByRHYdEHmRIxWyYfxk0N1SXPKtyaHgK43dLAMaSNle0wpQRrRhND0CiV0DxD6UjRNBnsv5ZREUy34r9Rax5ACB0eZVwwE1sz0bhfIUb4eU8jERiqJ17vIQ6wPS5Sya8C1ckYIsZP/qL559mYQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAEgRbKLeX881adEx4CLfDRrHfOnjvL8mfyYEjXFuOZ2mBlUA+MWk5xd7230PLdd8hSms6I9JmxtwEL3uCb97wdg3QENLaWyR/TX6j6/nlGePGtabb/H5LAe3PPGDu17lG7jZeqM5VPhytZghCcI20SrA8/Zi/OHdzmX4bHOqIZ0p2zwv9btFtAolFoSyilmlt1POr+/pJcuQaEtGkrMNl/29EeZjZnNwUVQEH95588AtDwocMEw8iVYeAWFxllbqANqY9qYu6zEZowFDELgOtHKSOAnY9EbAzIQ6tEMLGD+IZzA+rqCkWudTYZEXvAZI8IjnpMFcvNk27+QnEkwHmnI=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"4bf7409db9f94c008c644cc8c98198ea"}, [
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
  '9e4c996b-3e49-4997-b352-d3032c338e31',
  'x-ms-request-id',
  '695aaf89-9306-41b1-8377-c16ebe05d149',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:01:32 GMT',
  'Content-Length',
  '1352'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/backupRestoreCertificateName-canrecoveradeletedcertificate-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/backupRestoreCertificateName-canrecoveradeletedcertificate-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAzapIIiw3DzOa6BpsyIGSKdztq0vIbXt2jpRP1rvrMilgZpZxNc4Q/+MyTlLeqPwjtDBAT/y1VM2YS+UoNtYWv5wG4LBItZhrBQCrQvInfyVZPCZRN3+jYFcPpTJVZnXtyLY6pJeOk2SD2gKyh61iTzLfna7I7VKwkx3A7HJxMbdjG+WuGYrcOsGGtJsTp6EvFTw7jByRHYdEHmRIxWyYfxk0N1SXPKtyaHgK43dLAMaSNle0wpQRrRhND0CiV0DxD6UjRNBnsv5ZREUy34r9Rax5ACB0eZVwwE1sz0bhfIUb4eU8jERiqJ17vIQ6wPS5Sya8C1ckYIsZP/qL559mYQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAEgRbKLeX881adEx4CLfDRrHfOnjvL8mfyYEjXFuOZ2mBlUA+MWk5xd7230PLdd8hSms6I9JmxtwEL3uCb97wdg3QENLaWyR/TX6j6/nlGePGtabb/H5LAe3PPGDu17lG7jZeqM5VPhytZghCcI20SrA8/Zi/OHdzmX4bHOqIZ0p2zwv9btFtAolFoSyilmlt1POr+/pJcuQaEtGkrMNl/29EeZjZnNwUVQEH95588AtDwocMEw8iVYeAWFxllbqANqY9qYu6zEZowFDELgOtHKSOAnY9EbAzIQ6tEMLGD+IZzA+rqCkWudTYZEXvAZI8IjnpMFcvNk27+QnEkwHmnI=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"4bf7409db9f94c008c644cc8c98198ea"}, [
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
  'f87a14a0-684c-432c-805c-94de09f3d127',
  'x-ms-request-id',
  '9c4d96cd-bd48-4ba3-b20f-4f1325484ab2',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:01:34 GMT',
  'Content-Length',
  '1352'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/backupRestoreCertificateName-canrecoveradeletedcertificate-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/backupRestoreCertificateName-canrecoveradeletedcertificate-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAzapIIiw3DzOa6BpsyIGSKdztq0vIbXt2jpRP1rvrMilgZpZxNc4Q/+MyTlLeqPwjtDBAT/y1VM2YS+UoNtYWv5wG4LBItZhrBQCrQvInfyVZPCZRN3+jYFcPpTJVZnXtyLY6pJeOk2SD2gKyh61iTzLfna7I7VKwkx3A7HJxMbdjG+WuGYrcOsGGtJsTp6EvFTw7jByRHYdEHmRIxWyYfxk0N1SXPKtyaHgK43dLAMaSNle0wpQRrRhND0CiV0DxD6UjRNBnsv5ZREUy34r9Rax5ACB0eZVwwE1sz0bhfIUb4eU8jERiqJ17vIQ6wPS5Sya8C1ckYIsZP/qL559mYQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAEgRbKLeX881adEx4CLfDRrHfOnjvL8mfyYEjXFuOZ2mBlUA+MWk5xd7230PLdd8hSms6I9JmxtwEL3uCb97wdg3QENLaWyR/TX6j6/nlGePGtabb/H5LAe3PPGDu17lG7jZeqM5VPhytZghCcI20SrA8/Zi/OHdzmX4bHOqIZ0p2zwv9btFtAolFoSyilmlt1POr+/pJcuQaEtGkrMNl/29EeZjZnNwUVQEH95588AtDwocMEw8iVYeAWFxllbqANqY9qYu6zEZowFDELgOtHKSOAnY9EbAzIQ6tEMLGD+IZzA+rqCkWudTYZEXvAZI8IjnpMFcvNk27+QnEkwHmnI=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"4bf7409db9f94c008c644cc8c98198ea"}, [
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
  '9714334d-342d-4e45-95a6-2a2fc0086e99',
  'x-ms-request-id',
  '916054b6-ab4e-43a4-90aa-239167553f1a',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:01:36 GMT',
  'Content-Length',
  '1352'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/backupRestoreCertificateName-canrecoveradeletedcertificate-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/backupRestoreCertificateName-canrecoveradeletedcertificate-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAzapIIiw3DzOa6BpsyIGSKdztq0vIbXt2jpRP1rvrMilgZpZxNc4Q/+MyTlLeqPwjtDBAT/y1VM2YS+UoNtYWv5wG4LBItZhrBQCrQvInfyVZPCZRN3+jYFcPpTJVZnXtyLY6pJeOk2SD2gKyh61iTzLfna7I7VKwkx3A7HJxMbdjG+WuGYrcOsGGtJsTp6EvFTw7jByRHYdEHmRIxWyYfxk0N1SXPKtyaHgK43dLAMaSNle0wpQRrRhND0CiV0DxD6UjRNBnsv5ZREUy34r9Rax5ACB0eZVwwE1sz0bhfIUb4eU8jERiqJ17vIQ6wPS5Sya8C1ckYIsZP/qL559mYQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAEgRbKLeX881adEx4CLfDRrHfOnjvL8mfyYEjXFuOZ2mBlUA+MWk5xd7230PLdd8hSms6I9JmxtwEL3uCb97wdg3QENLaWyR/TX6j6/nlGePGtabb/H5LAe3PPGDu17lG7jZeqM5VPhytZghCcI20SrA8/Zi/OHdzmX4bHOqIZ0p2zwv9btFtAolFoSyilmlt1POr+/pJcuQaEtGkrMNl/29EeZjZnNwUVQEH95588AtDwocMEw8iVYeAWFxllbqANqY9qYu6zEZowFDELgOtHKSOAnY9EbAzIQ6tEMLGD+IZzA+rqCkWudTYZEXvAZI8IjnpMFcvNk27+QnEkwHmnI=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"4bf7409db9f94c008c644cc8c98198ea"}, [
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
  'd1ab2e5e-f7ad-4ba2-acf8-2123539c0f40',
  'x-ms-request-id',
  'd211faa3-dbfc-4917-ae97-9c08b096004d',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:01:38 GMT',
  'Content-Length',
  '1352'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/backupRestoreCertificateName-canrecoveradeletedcertificate-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/backupRestoreCertificateName-canrecoveradeletedcertificate-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAzapIIiw3DzOa6BpsyIGSKdztq0vIbXt2jpRP1rvrMilgZpZxNc4Q/+MyTlLeqPwjtDBAT/y1VM2YS+UoNtYWv5wG4LBItZhrBQCrQvInfyVZPCZRN3+jYFcPpTJVZnXtyLY6pJeOk2SD2gKyh61iTzLfna7I7VKwkx3A7HJxMbdjG+WuGYrcOsGGtJsTp6EvFTw7jByRHYdEHmRIxWyYfxk0N1SXPKtyaHgK43dLAMaSNle0wpQRrRhND0CiV0DxD6UjRNBnsv5ZREUy34r9Rax5ACB0eZVwwE1sz0bhfIUb4eU8jERiqJ17vIQ6wPS5Sya8C1ckYIsZP/qL559mYQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAEgRbKLeX881adEx4CLfDRrHfOnjvL8mfyYEjXFuOZ2mBlUA+MWk5xd7230PLdd8hSms6I9JmxtwEL3uCb97wdg3QENLaWyR/TX6j6/nlGePGtabb/H5LAe3PPGDu17lG7jZeqM5VPhytZghCcI20SrA8/Zi/OHdzmX4bHOqIZ0p2zwv9btFtAolFoSyilmlt1POr+/pJcuQaEtGkrMNl/29EeZjZnNwUVQEH95588AtDwocMEw8iVYeAWFxllbqANqY9qYu6zEZowFDELgOtHKSOAnY9EbAzIQ6tEMLGD+IZzA+rqCkWudTYZEXvAZI8IjnpMFcvNk27+QnEkwHmnI=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"4bf7409db9f94c008c644cc8c98198ea"}, [
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
  '1e331150-b2e1-440e-ad1b-f761a6b1f117',
  'x-ms-request-id',
  '679fca57-f2f1-4350-b0ff-38c8c27ac522',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:01:40 GMT',
  'Content-Length',
  '1352'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/backupRestoreCertificateName-canrecoveradeletedcertificate-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/backupRestoreCertificateName-canrecoveradeletedcertificate-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAzapIIiw3DzOa6BpsyIGSKdztq0vIbXt2jpRP1rvrMilgZpZxNc4Q/+MyTlLeqPwjtDBAT/y1VM2YS+UoNtYWv5wG4LBItZhrBQCrQvInfyVZPCZRN3+jYFcPpTJVZnXtyLY6pJeOk2SD2gKyh61iTzLfna7I7VKwkx3A7HJxMbdjG+WuGYrcOsGGtJsTp6EvFTw7jByRHYdEHmRIxWyYfxk0N1SXPKtyaHgK43dLAMaSNle0wpQRrRhND0CiV0DxD6UjRNBnsv5ZREUy34r9Rax5ACB0eZVwwE1sz0bhfIUb4eU8jERiqJ17vIQ6wPS5Sya8C1ckYIsZP/qL559mYQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAEgRbKLeX881adEx4CLfDRrHfOnjvL8mfyYEjXFuOZ2mBlUA+MWk5xd7230PLdd8hSms6I9JmxtwEL3uCb97wdg3QENLaWyR/TX6j6/nlGePGtabb/H5LAe3PPGDu17lG7jZeqM5VPhytZghCcI20SrA8/Zi/OHdzmX4bHOqIZ0p2zwv9btFtAolFoSyilmlt1POr+/pJcuQaEtGkrMNl/29EeZjZnNwUVQEH95588AtDwocMEw8iVYeAWFxllbqANqY9qYu6zEZowFDELgOtHKSOAnY9EbAzIQ6tEMLGD+IZzA+rqCkWudTYZEXvAZI8IjnpMFcvNk27+QnEkwHmnI=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"4bf7409db9f94c008c644cc8c98198ea"}, [
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
  '140f795f-a5d0-44f6-b5d8-2e566153855a',
  'x-ms-request-id',
  '7bee75b6-6672-4584-a6a2-77238f426fb7',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:01:42 GMT',
  'Content-Length',
  '1352'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/backupRestoreCertificateName-canrecoveradeletedcertificate-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/backupRestoreCertificateName-canrecoveradeletedcertificate-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAzapIIiw3DzOa6BpsyIGSKdztq0vIbXt2jpRP1rvrMilgZpZxNc4Q/+MyTlLeqPwjtDBAT/y1VM2YS+UoNtYWv5wG4LBItZhrBQCrQvInfyVZPCZRN3+jYFcPpTJVZnXtyLY6pJeOk2SD2gKyh61iTzLfna7I7VKwkx3A7HJxMbdjG+WuGYrcOsGGtJsTp6EvFTw7jByRHYdEHmRIxWyYfxk0N1SXPKtyaHgK43dLAMaSNle0wpQRrRhND0CiV0DxD6UjRNBnsv5ZREUy34r9Rax5ACB0eZVwwE1sz0bhfIUb4eU8jERiqJ17vIQ6wPS5Sya8C1ckYIsZP/qL559mYQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAEgRbKLeX881adEx4CLfDRrHfOnjvL8mfyYEjXFuOZ2mBlUA+MWk5xd7230PLdd8hSms6I9JmxtwEL3uCb97wdg3QENLaWyR/TX6j6/nlGePGtabb/H5LAe3PPGDu17lG7jZeqM5VPhytZghCcI20SrA8/Zi/OHdzmX4bHOqIZ0p2zwv9btFtAolFoSyilmlt1POr+/pJcuQaEtGkrMNl/29EeZjZnNwUVQEH95588AtDwocMEw8iVYeAWFxllbqANqY9qYu6zEZowFDELgOtHKSOAnY9EbAzIQ6tEMLGD+IZzA+rqCkWudTYZEXvAZI8IjnpMFcvNk27+QnEkwHmnI=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"4bf7409db9f94c008c644cc8c98198ea"}, [
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
  '26cfbed6-b09d-44e8-9af7-96a9c9a584b9',
  'x-ms-request-id',
  '4deebf64-b5ec-4870-9bf1-873cd0d08aa7',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:01:44 GMT',
  'Content-Length',
  '1352'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/backupRestoreCertificateName-canrecoveradeletedcertificate-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/backupRestoreCertificateName-canrecoveradeletedcertificate-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAzapIIiw3DzOa6BpsyIGSKdztq0vIbXt2jpRP1rvrMilgZpZxNc4Q/+MyTlLeqPwjtDBAT/y1VM2YS+UoNtYWv5wG4LBItZhrBQCrQvInfyVZPCZRN3+jYFcPpTJVZnXtyLY6pJeOk2SD2gKyh61iTzLfna7I7VKwkx3A7HJxMbdjG+WuGYrcOsGGtJsTp6EvFTw7jByRHYdEHmRIxWyYfxk0N1SXPKtyaHgK43dLAMaSNle0wpQRrRhND0CiV0DxD6UjRNBnsv5ZREUy34r9Rax5ACB0eZVwwE1sz0bhfIUb4eU8jERiqJ17vIQ6wPS5Sya8C1ckYIsZP/qL559mYQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAEgRbKLeX881adEx4CLfDRrHfOnjvL8mfyYEjXFuOZ2mBlUA+MWk5xd7230PLdd8hSms6I9JmxtwEL3uCb97wdg3QENLaWyR/TX6j6/nlGePGtabb/H5LAe3PPGDu17lG7jZeqM5VPhytZghCcI20SrA8/Zi/OHdzmX4bHOqIZ0p2zwv9btFtAolFoSyilmlt1POr+/pJcuQaEtGkrMNl/29EeZjZnNwUVQEH95588AtDwocMEw8iVYeAWFxllbqANqY9qYu6zEZowFDELgOtHKSOAnY9EbAzIQ6tEMLGD+IZzA+rqCkWudTYZEXvAZI8IjnpMFcvNk27+QnEkwHmnI=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"4bf7409db9f94c008c644cc8c98198ea"}, [
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
  'dced00f8-c6e2-411b-a4d0-2272b6ed161c',
  'x-ms-request-id',
  '724ae3cd-2e70-4ae8-9b0b-f97043022ba8',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:01:47 GMT',
  'Content-Length',
  '1352'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/backupRestoreCertificateName-canrecoveradeletedcertificate-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/backupRestoreCertificateName-canrecoveradeletedcertificate-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAzapIIiw3DzOa6BpsyIGSKdztq0vIbXt2jpRP1rvrMilgZpZxNc4Q/+MyTlLeqPwjtDBAT/y1VM2YS+UoNtYWv5wG4LBItZhrBQCrQvInfyVZPCZRN3+jYFcPpTJVZnXtyLY6pJeOk2SD2gKyh61iTzLfna7I7VKwkx3A7HJxMbdjG+WuGYrcOsGGtJsTp6EvFTw7jByRHYdEHmRIxWyYfxk0N1SXPKtyaHgK43dLAMaSNle0wpQRrRhND0CiV0DxD6UjRNBnsv5ZREUy34r9Rax5ACB0eZVwwE1sz0bhfIUb4eU8jERiqJ17vIQ6wPS5Sya8C1ckYIsZP/qL559mYQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAEgRbKLeX881adEx4CLfDRrHfOnjvL8mfyYEjXFuOZ2mBlUA+MWk5xd7230PLdd8hSms6I9JmxtwEL3uCb97wdg3QENLaWyR/TX6j6/nlGePGtabb/H5LAe3PPGDu17lG7jZeqM5VPhytZghCcI20SrA8/Zi/OHdzmX4bHOqIZ0p2zwv9btFtAolFoSyilmlt1POr+/pJcuQaEtGkrMNl/29EeZjZnNwUVQEH95588AtDwocMEw8iVYeAWFxllbqANqY9qYu6zEZowFDELgOtHKSOAnY9EbAzIQ6tEMLGD+IZzA+rqCkWudTYZEXvAZI8IjnpMFcvNk27+QnEkwHmnI=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"4bf7409db9f94c008c644cc8c98198ea"}, [
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
  '9d88ae47-c33a-41a1-8b8a-91f45dc0f02e',
  'x-ms-request-id',
  '296b8749-c5c2-4397-b163-610474d224e5',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:01:49 GMT',
  'Content-Length',
  '1352'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/backupRestoreCertificateName-canrecoveradeletedcertificate-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/backupRestoreCertificateName-canrecoveradeletedcertificate-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAzapIIiw3DzOa6BpsyIGSKdztq0vIbXt2jpRP1rvrMilgZpZxNc4Q/+MyTlLeqPwjtDBAT/y1VM2YS+UoNtYWv5wG4LBItZhrBQCrQvInfyVZPCZRN3+jYFcPpTJVZnXtyLY6pJeOk2SD2gKyh61iTzLfna7I7VKwkx3A7HJxMbdjG+WuGYrcOsGGtJsTp6EvFTw7jByRHYdEHmRIxWyYfxk0N1SXPKtyaHgK43dLAMaSNle0wpQRrRhND0CiV0DxD6UjRNBnsv5ZREUy34r9Rax5ACB0eZVwwE1sz0bhfIUb4eU8jERiqJ17vIQ6wPS5Sya8C1ckYIsZP/qL559mYQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAEgRbKLeX881adEx4CLfDRrHfOnjvL8mfyYEjXFuOZ2mBlUA+MWk5xd7230PLdd8hSms6I9JmxtwEL3uCb97wdg3QENLaWyR/TX6j6/nlGePGtabb/H5LAe3PPGDu17lG7jZeqM5VPhytZghCcI20SrA8/Zi/OHdzmX4bHOqIZ0p2zwv9btFtAolFoSyilmlt1POr+/pJcuQaEtGkrMNl/29EeZjZnNwUVQEH95588AtDwocMEw8iVYeAWFxllbqANqY9qYu6zEZowFDELgOtHKSOAnY9EbAzIQ6tEMLGD+IZzA+rqCkWudTYZEXvAZI8IjnpMFcvNk27+QnEkwHmnI=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"4bf7409db9f94c008c644cc8c98198ea"}, [
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
  '367e6472-10cc-418e-94fb-57608deba154',
  'x-ms-request-id',
  '0ccbd86a-4db2-4955-acae-c16cedafc5f1',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:01:51 GMT',
  'Content-Length',
  '1352'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/backupRestoreCertificateName-canrecoveradeletedcertificate-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/backupRestoreCertificateName-canrecoveradeletedcertificate-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAzapIIiw3DzOa6BpsyIGSKdztq0vIbXt2jpRP1rvrMilgZpZxNc4Q/+MyTlLeqPwjtDBAT/y1VM2YS+UoNtYWv5wG4LBItZhrBQCrQvInfyVZPCZRN3+jYFcPpTJVZnXtyLY6pJeOk2SD2gKyh61iTzLfna7I7VKwkx3A7HJxMbdjG+WuGYrcOsGGtJsTp6EvFTw7jByRHYdEHmRIxWyYfxk0N1SXPKtyaHgK43dLAMaSNle0wpQRrRhND0CiV0DxD6UjRNBnsv5ZREUy34r9Rax5ACB0eZVwwE1sz0bhfIUb4eU8jERiqJ17vIQ6wPS5Sya8C1ckYIsZP/qL559mYQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAEgRbKLeX881adEx4CLfDRrHfOnjvL8mfyYEjXFuOZ2mBlUA+MWk5xd7230PLdd8hSms6I9JmxtwEL3uCb97wdg3QENLaWyR/TX6j6/nlGePGtabb/H5LAe3PPGDu17lG7jZeqM5VPhytZghCcI20SrA8/Zi/OHdzmX4bHOqIZ0p2zwv9btFtAolFoSyilmlt1POr+/pJcuQaEtGkrMNl/29EeZjZnNwUVQEH95588AtDwocMEw8iVYeAWFxllbqANqY9qYu6zEZowFDELgOtHKSOAnY9EbAzIQ6tEMLGD+IZzA+rqCkWudTYZEXvAZI8IjnpMFcvNk27+QnEkwHmnI=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"4bf7409db9f94c008c644cc8c98198ea"}, [
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
  'beffd319-0f87-4f0b-a482-e871701370a5',
  'x-ms-request-id',
  'c2ededa2-73d4-44ab-a954-1096ac48f849',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:01:53 GMT',
  'Content-Length',
  '1352'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/backupRestoreCertificateName-canrecoveradeletedcertificate-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/backupRestoreCertificateName-canrecoveradeletedcertificate-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAzapIIiw3DzOa6BpsyIGSKdztq0vIbXt2jpRP1rvrMilgZpZxNc4Q/+MyTlLeqPwjtDBAT/y1VM2YS+UoNtYWv5wG4LBItZhrBQCrQvInfyVZPCZRN3+jYFcPpTJVZnXtyLY6pJeOk2SD2gKyh61iTzLfna7I7VKwkx3A7HJxMbdjG+WuGYrcOsGGtJsTp6EvFTw7jByRHYdEHmRIxWyYfxk0N1SXPKtyaHgK43dLAMaSNle0wpQRrRhND0CiV0DxD6UjRNBnsv5ZREUy34r9Rax5ACB0eZVwwE1sz0bhfIUb4eU8jERiqJ17vIQ6wPS5Sya8C1ckYIsZP/qL559mYQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAEgRbKLeX881adEx4CLfDRrHfOnjvL8mfyYEjXFuOZ2mBlUA+MWk5xd7230PLdd8hSms6I9JmxtwEL3uCb97wdg3QENLaWyR/TX6j6/nlGePGtabb/H5LAe3PPGDu17lG7jZeqM5VPhytZghCcI20SrA8/Zi/OHdzmX4bHOqIZ0p2zwv9btFtAolFoSyilmlt1POr+/pJcuQaEtGkrMNl/29EeZjZnNwUVQEH95588AtDwocMEw8iVYeAWFxllbqANqY9qYu6zEZowFDELgOtHKSOAnY9EbAzIQ6tEMLGD+IZzA+rqCkWudTYZEXvAZI8IjnpMFcvNk27+QnEkwHmnI=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"4bf7409db9f94c008c644cc8c98198ea"}, [
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
  '1623d31a-d6db-4ed7-91d7-9009a0b8eca8',
  'x-ms-request-id',
  'e77f4ad1-dcca-4767-93ed-e34737bb8ae5',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:01:56 GMT',
  'Content-Length',
  '1352'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/backupRestoreCertificateName-canrecoveradeletedcertificate-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/backupRestoreCertificateName-canrecoveradeletedcertificate-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAzapIIiw3DzOa6BpsyIGSKdztq0vIbXt2jpRP1rvrMilgZpZxNc4Q/+MyTlLeqPwjtDBAT/y1VM2YS+UoNtYWv5wG4LBItZhrBQCrQvInfyVZPCZRN3+jYFcPpTJVZnXtyLY6pJeOk2SD2gKyh61iTzLfna7I7VKwkx3A7HJxMbdjG+WuGYrcOsGGtJsTp6EvFTw7jByRHYdEHmRIxWyYfxk0N1SXPKtyaHgK43dLAMaSNle0wpQRrRhND0CiV0DxD6UjRNBnsv5ZREUy34r9Rax5ACB0eZVwwE1sz0bhfIUb4eU8jERiqJ17vIQ6wPS5Sya8C1ckYIsZP/qL559mYQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAEgRbKLeX881adEx4CLfDRrHfOnjvL8mfyYEjXFuOZ2mBlUA+MWk5xd7230PLdd8hSms6I9JmxtwEL3uCb97wdg3QENLaWyR/TX6j6/nlGePGtabb/H5LAe3PPGDu17lG7jZeqM5VPhytZghCcI20SrA8/Zi/OHdzmX4bHOqIZ0p2zwv9btFtAolFoSyilmlt1POr+/pJcuQaEtGkrMNl/29EeZjZnNwUVQEH95588AtDwocMEw8iVYeAWFxllbqANqY9qYu6zEZowFDELgOtHKSOAnY9EbAzIQ6tEMLGD+IZzA+rqCkWudTYZEXvAZI8IjnpMFcvNk27+QnEkwHmnI=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"4bf7409db9f94c008c644cc8c98198ea"}, [
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
  '2cd1a782-1a65-46fc-90bd-50c50c6a8988',
  'x-ms-request-id',
  'c373e2f4-3327-4007-808f-023bbe294ef5',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:01:57 GMT',
  'Content-Length',
  '1352'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/backupRestoreCertificateName-canrecoveradeletedcertificate-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/backupRestoreCertificateName-canrecoveradeletedcertificate-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAzapIIiw3DzOa6BpsyIGSKdztq0vIbXt2jpRP1rvrMilgZpZxNc4Q/+MyTlLeqPwjtDBAT/y1VM2YS+UoNtYWv5wG4LBItZhrBQCrQvInfyVZPCZRN3+jYFcPpTJVZnXtyLY6pJeOk2SD2gKyh61iTzLfna7I7VKwkx3A7HJxMbdjG+WuGYrcOsGGtJsTp6EvFTw7jByRHYdEHmRIxWyYfxk0N1SXPKtyaHgK43dLAMaSNle0wpQRrRhND0CiV0DxD6UjRNBnsv5ZREUy34r9Rax5ACB0eZVwwE1sz0bhfIUb4eU8jERiqJ17vIQ6wPS5Sya8C1ckYIsZP/qL559mYQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAEgRbKLeX881adEx4CLfDRrHfOnjvL8mfyYEjXFuOZ2mBlUA+MWk5xd7230PLdd8hSms6I9JmxtwEL3uCb97wdg3QENLaWyR/TX6j6/nlGePGtabb/H5LAe3PPGDu17lG7jZeqM5VPhytZghCcI20SrA8/Zi/OHdzmX4bHOqIZ0p2zwv9btFtAolFoSyilmlt1POr+/pJcuQaEtGkrMNl/29EeZjZnNwUVQEH95588AtDwocMEw8iVYeAWFxllbqANqY9qYu6zEZowFDELgOtHKSOAnY9EbAzIQ6tEMLGD+IZzA+rqCkWudTYZEXvAZI8IjnpMFcvNk27+QnEkwHmnI=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"4bf7409db9f94c008c644cc8c98198ea"}, [
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
  'd387fd5d-a60f-42f2-802e-c91e2c9b55d4',
  'x-ms-request-id',
  'c860f4ef-e33f-4c96-b2b2-22db51919cff',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:01:59 GMT',
  'Content-Length',
  '1352'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/backupRestoreCertificateName-canrecoveradeletedcertificate-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/backupRestoreCertificateName-canrecoveradeletedcertificate-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAzapIIiw3DzOa6BpsyIGSKdztq0vIbXt2jpRP1rvrMilgZpZxNc4Q/+MyTlLeqPwjtDBAT/y1VM2YS+UoNtYWv5wG4LBItZhrBQCrQvInfyVZPCZRN3+jYFcPpTJVZnXtyLY6pJeOk2SD2gKyh61iTzLfna7I7VKwkx3A7HJxMbdjG+WuGYrcOsGGtJsTp6EvFTw7jByRHYdEHmRIxWyYfxk0N1SXPKtyaHgK43dLAMaSNle0wpQRrRhND0CiV0DxD6UjRNBnsv5ZREUy34r9Rax5ACB0eZVwwE1sz0bhfIUb4eU8jERiqJ17vIQ6wPS5Sya8C1ckYIsZP/qL559mYQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAEgRbKLeX881adEx4CLfDRrHfOnjvL8mfyYEjXFuOZ2mBlUA+MWk5xd7230PLdd8hSms6I9JmxtwEL3uCb97wdg3QENLaWyR/TX6j6/nlGePGtabb/H5LAe3PPGDu17lG7jZeqM5VPhytZghCcI20SrA8/Zi/OHdzmX4bHOqIZ0p2zwv9btFtAolFoSyilmlt1POr+/pJcuQaEtGkrMNl/29EeZjZnNwUVQEH95588AtDwocMEw8iVYeAWFxllbqANqY9qYu6zEZowFDELgOtHKSOAnY9EbAzIQ6tEMLGD+IZzA+rqCkWudTYZEXvAZI8IjnpMFcvNk27+QnEkwHmnI=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"4bf7409db9f94c008c644cc8c98198ea"}, [
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
  '32febbd5-de6b-4fe4-9ae4-ec5bcda6bb25',
  'x-ms-request-id',
  '5580d03e-e44a-4bed-a631-3186468b6d21',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:02:01 GMT',
  'Content-Length',
  '1352'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/backupRestoreCertificateName-canrecoveradeletedcertificate-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/backupRestoreCertificateName-canrecoveradeletedcertificate-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAzapIIiw3DzOa6BpsyIGSKdztq0vIbXt2jpRP1rvrMilgZpZxNc4Q/+MyTlLeqPwjtDBAT/y1VM2YS+UoNtYWv5wG4LBItZhrBQCrQvInfyVZPCZRN3+jYFcPpTJVZnXtyLY6pJeOk2SD2gKyh61iTzLfna7I7VKwkx3A7HJxMbdjG+WuGYrcOsGGtJsTp6EvFTw7jByRHYdEHmRIxWyYfxk0N1SXPKtyaHgK43dLAMaSNle0wpQRrRhND0CiV0DxD6UjRNBnsv5ZREUy34r9Rax5ACB0eZVwwE1sz0bhfIUb4eU8jERiqJ17vIQ6wPS5Sya8C1ckYIsZP/qL559mYQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAEgRbKLeX881adEx4CLfDRrHfOnjvL8mfyYEjXFuOZ2mBlUA+MWk5xd7230PLdd8hSms6I9JmxtwEL3uCb97wdg3QENLaWyR/TX6j6/nlGePGtabb/H5LAe3PPGDu17lG7jZeqM5VPhytZghCcI20SrA8/Zi/OHdzmX4bHOqIZ0p2zwv9btFtAolFoSyilmlt1POr+/pJcuQaEtGkrMNl/29EeZjZnNwUVQEH95588AtDwocMEw8iVYeAWFxllbqANqY9qYu6zEZowFDELgOtHKSOAnY9EbAzIQ6tEMLGD+IZzA+rqCkWudTYZEXvAZI8IjnpMFcvNk27+QnEkwHmnI=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"4bf7409db9f94c008c644cc8c98198ea"}, [
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
  'a2b0bd1b-f45a-4843-9b8b-71340d3af822',
  'x-ms-request-id',
  '3cb2781f-b4af-4e25-9b0c-f46c51fcf57b',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:02:03 GMT',
  'Content-Length',
  '1352'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/backupRestoreCertificateName-canrecoveradeletedcertificate-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/backupRestoreCertificateName-canrecoveradeletedcertificate-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAzapIIiw3DzOa6BpsyIGSKdztq0vIbXt2jpRP1rvrMilgZpZxNc4Q/+MyTlLeqPwjtDBAT/y1VM2YS+UoNtYWv5wG4LBItZhrBQCrQvInfyVZPCZRN3+jYFcPpTJVZnXtyLY6pJeOk2SD2gKyh61iTzLfna7I7VKwkx3A7HJxMbdjG+WuGYrcOsGGtJsTp6EvFTw7jByRHYdEHmRIxWyYfxk0N1SXPKtyaHgK43dLAMaSNle0wpQRrRhND0CiV0DxD6UjRNBnsv5ZREUy34r9Rax5ACB0eZVwwE1sz0bhfIUb4eU8jERiqJ17vIQ6wPS5Sya8C1ckYIsZP/qL559mYQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAEgRbKLeX881adEx4CLfDRrHfOnjvL8mfyYEjXFuOZ2mBlUA+MWk5xd7230PLdd8hSms6I9JmxtwEL3uCb97wdg3QENLaWyR/TX6j6/nlGePGtabb/H5LAe3PPGDu17lG7jZeqM5VPhytZghCcI20SrA8/Zi/OHdzmX4bHOqIZ0p2zwv9btFtAolFoSyilmlt1POr+/pJcuQaEtGkrMNl/29EeZjZnNwUVQEH95588AtDwocMEw8iVYeAWFxllbqANqY9qYu6zEZowFDELgOtHKSOAnY9EbAzIQ6tEMLGD+IZzA+rqCkWudTYZEXvAZI8IjnpMFcvNk27+QnEkwHmnI=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"4bf7409db9f94c008c644cc8c98198ea"}, [
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
  'd984aff9-3330-4467-b52c-efb9a0482d76',
  'x-ms-request-id',
  'a253163f-39bb-458d-805e-26f83fe9519a',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:02:05 GMT',
  'Content-Length',
  '1352'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/backupRestoreCertificateName-canrecoveradeletedcertificate-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/backupRestoreCertificateName-canrecoveradeletedcertificate-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAzapIIiw3DzOa6BpsyIGSKdztq0vIbXt2jpRP1rvrMilgZpZxNc4Q/+MyTlLeqPwjtDBAT/y1VM2YS+UoNtYWv5wG4LBItZhrBQCrQvInfyVZPCZRN3+jYFcPpTJVZnXtyLY6pJeOk2SD2gKyh61iTzLfna7I7VKwkx3A7HJxMbdjG+WuGYrcOsGGtJsTp6EvFTw7jByRHYdEHmRIxWyYfxk0N1SXPKtyaHgK43dLAMaSNle0wpQRrRhND0CiV0DxD6UjRNBnsv5ZREUy34r9Rax5ACB0eZVwwE1sz0bhfIUb4eU8jERiqJ17vIQ6wPS5Sya8C1ckYIsZP/qL559mYQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAEgRbKLeX881adEx4CLfDRrHfOnjvL8mfyYEjXFuOZ2mBlUA+MWk5xd7230PLdd8hSms6I9JmxtwEL3uCb97wdg3QENLaWyR/TX6j6/nlGePGtabb/H5LAe3PPGDu17lG7jZeqM5VPhytZghCcI20SrA8/Zi/OHdzmX4bHOqIZ0p2zwv9btFtAolFoSyilmlt1POr+/pJcuQaEtGkrMNl/29EeZjZnNwUVQEH95588AtDwocMEw8iVYeAWFxllbqANqY9qYu6zEZowFDELgOtHKSOAnY9EbAzIQ6tEMLGD+IZzA+rqCkWudTYZEXvAZI8IjnpMFcvNk27+QnEkwHmnI=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"4bf7409db9f94c008c644cc8c98198ea"}, [
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
  'e55b753f-5c20-413e-a50d-3757d210d3c6',
  'x-ms-request-id',
  'a544f39a-1dd1-4052-8f5c-e7703ae4a4c5',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:02:08 GMT',
  'Content-Length',
  '1352'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/backupRestoreCertificateName-canrecoveradeletedcertificate-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/backupRestoreCertificateName-canrecoveradeletedcertificate-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAzapIIiw3DzOa6BpsyIGSKdztq0vIbXt2jpRP1rvrMilgZpZxNc4Q/+MyTlLeqPwjtDBAT/y1VM2YS+UoNtYWv5wG4LBItZhrBQCrQvInfyVZPCZRN3+jYFcPpTJVZnXtyLY6pJeOk2SD2gKyh61iTzLfna7I7VKwkx3A7HJxMbdjG+WuGYrcOsGGtJsTp6EvFTw7jByRHYdEHmRIxWyYfxk0N1SXPKtyaHgK43dLAMaSNle0wpQRrRhND0CiV0DxD6UjRNBnsv5ZREUy34r9Rax5ACB0eZVwwE1sz0bhfIUb4eU8jERiqJ17vIQ6wPS5Sya8C1ckYIsZP/qL559mYQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAEgRbKLeX881adEx4CLfDRrHfOnjvL8mfyYEjXFuOZ2mBlUA+MWk5xd7230PLdd8hSms6I9JmxtwEL3uCb97wdg3QENLaWyR/TX6j6/nlGePGtabb/H5LAe3PPGDu17lG7jZeqM5VPhytZghCcI20SrA8/Zi/OHdzmX4bHOqIZ0p2zwv9btFtAolFoSyilmlt1POr+/pJcuQaEtGkrMNl/29EeZjZnNwUVQEH95588AtDwocMEw8iVYeAWFxllbqANqY9qYu6zEZowFDELgOtHKSOAnY9EbAzIQ6tEMLGD+IZzA+rqCkWudTYZEXvAZI8IjnpMFcvNk27+QnEkwHmnI=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"4bf7409db9f94c008c644cc8c98198ea"}, [
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
  '420ff51f-ffb9-49c5-9644-657ece5700a8',
  'x-ms-request-id',
  'f8b3e544-f898-46c0-be03-fe8b707314f6',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:02:10 GMT',
  'Content-Length',
  '1352'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/backupRestoreCertificateName-canrecoveradeletedcertificate-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/backupRestoreCertificateName-canrecoveradeletedcertificate-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAzapIIiw3DzOa6BpsyIGSKdztq0vIbXt2jpRP1rvrMilgZpZxNc4Q/+MyTlLeqPwjtDBAT/y1VM2YS+UoNtYWv5wG4LBItZhrBQCrQvInfyVZPCZRN3+jYFcPpTJVZnXtyLY6pJeOk2SD2gKyh61iTzLfna7I7VKwkx3A7HJxMbdjG+WuGYrcOsGGtJsTp6EvFTw7jByRHYdEHmRIxWyYfxk0N1SXPKtyaHgK43dLAMaSNle0wpQRrRhND0CiV0DxD6UjRNBnsv5ZREUy34r9Rax5ACB0eZVwwE1sz0bhfIUb4eU8jERiqJ17vIQ6wPS5Sya8C1ckYIsZP/qL559mYQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAEgRbKLeX881adEx4CLfDRrHfOnjvL8mfyYEjXFuOZ2mBlUA+MWk5xd7230PLdd8hSms6I9JmxtwEL3uCb97wdg3QENLaWyR/TX6j6/nlGePGtabb/H5LAe3PPGDu17lG7jZeqM5VPhytZghCcI20SrA8/Zi/OHdzmX4bHOqIZ0p2zwv9btFtAolFoSyilmlt1POr+/pJcuQaEtGkrMNl/29EeZjZnNwUVQEH95588AtDwocMEw8iVYeAWFxllbqANqY9qYu6zEZowFDELgOtHKSOAnY9EbAzIQ6tEMLGD+IZzA+rqCkWudTYZEXvAZI8IjnpMFcvNk27+QnEkwHmnI=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"4bf7409db9f94c008c644cc8c98198ea"}, [
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
  '82a2b6b6-4347-42b8-84f2-d78984018592',
  'x-ms-request-id',
  'c9ec95a9-4c94-40c4-a6c6-5684151f7241',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:02:12 GMT',
  'Content-Length',
  '1352'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/backupRestoreCertificateName-canrecoveradeletedcertificate-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/backupRestoreCertificateName-canrecoveradeletedcertificate-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAzapIIiw3DzOa6BpsyIGSKdztq0vIbXt2jpRP1rvrMilgZpZxNc4Q/+MyTlLeqPwjtDBAT/y1VM2YS+UoNtYWv5wG4LBItZhrBQCrQvInfyVZPCZRN3+jYFcPpTJVZnXtyLY6pJeOk2SD2gKyh61iTzLfna7I7VKwkx3A7HJxMbdjG+WuGYrcOsGGtJsTp6EvFTw7jByRHYdEHmRIxWyYfxk0N1SXPKtyaHgK43dLAMaSNle0wpQRrRhND0CiV0DxD6UjRNBnsv5ZREUy34r9Rax5ACB0eZVwwE1sz0bhfIUb4eU8jERiqJ17vIQ6wPS5Sya8C1ckYIsZP/qL559mYQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAEgRbKLeX881adEx4CLfDRrHfOnjvL8mfyYEjXFuOZ2mBlUA+MWk5xd7230PLdd8hSms6I9JmxtwEL3uCb97wdg3QENLaWyR/TX6j6/nlGePGtabb/H5LAe3PPGDu17lG7jZeqM5VPhytZghCcI20SrA8/Zi/OHdzmX4bHOqIZ0p2zwv9btFtAolFoSyilmlt1POr+/pJcuQaEtGkrMNl/29EeZjZnNwUVQEH95588AtDwocMEw8iVYeAWFxllbqANqY9qYu6zEZowFDELgOtHKSOAnY9EbAzIQ6tEMLGD+IZzA+rqCkWudTYZEXvAZI8IjnpMFcvNk27+QnEkwHmnI=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"4bf7409db9f94c008c644cc8c98198ea"}, [
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
  '2603b5ef-b50c-4abe-a7e0-47285c044cd0',
  'x-ms-request-id',
  'a4dff2a3-4733-4cb4-93b0-44e3b1a01f78',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:02:14 GMT',
  'Content-Length',
  '1352'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/backupRestoreCertificateName-canrecoveradeletedcertificate-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/backupRestoreCertificateName-canrecoveradeletedcertificate-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAzapIIiw3DzOa6BpsyIGSKdztq0vIbXt2jpRP1rvrMilgZpZxNc4Q/+MyTlLeqPwjtDBAT/y1VM2YS+UoNtYWv5wG4LBItZhrBQCrQvInfyVZPCZRN3+jYFcPpTJVZnXtyLY6pJeOk2SD2gKyh61iTzLfna7I7VKwkx3A7HJxMbdjG+WuGYrcOsGGtJsTp6EvFTw7jByRHYdEHmRIxWyYfxk0N1SXPKtyaHgK43dLAMaSNle0wpQRrRhND0CiV0DxD6UjRNBnsv5ZREUy34r9Rax5ACB0eZVwwE1sz0bhfIUb4eU8jERiqJ17vIQ6wPS5Sya8C1ckYIsZP/qL559mYQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAEgRbKLeX881adEx4CLfDRrHfOnjvL8mfyYEjXFuOZ2mBlUA+MWk5xd7230PLdd8hSms6I9JmxtwEL3uCb97wdg3QENLaWyR/TX6j6/nlGePGtabb/H5LAe3PPGDu17lG7jZeqM5VPhytZghCcI20SrA8/Zi/OHdzmX4bHOqIZ0p2zwv9btFtAolFoSyilmlt1POr+/pJcuQaEtGkrMNl/29EeZjZnNwUVQEH95588AtDwocMEw8iVYeAWFxllbqANqY9qYu6zEZowFDELgOtHKSOAnY9EbAzIQ6tEMLGD+IZzA+rqCkWudTYZEXvAZI8IjnpMFcvNk27+QnEkwHmnI=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"4bf7409db9f94c008c644cc8c98198ea"}, [
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
  '4a002fca-cfd7-44fe-9c43-3b3f7f836773',
  'x-ms-request-id',
  '932876a7-1106-427a-b486-dfdb129b09df',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:02:16 GMT',
  'Content-Length',
  '1352'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/backupRestoreCertificateName-canrecoveradeletedcertificate-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/backupRestoreCertificateName-canrecoveradeletedcertificate-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAzapIIiw3DzOa6BpsyIGSKdztq0vIbXt2jpRP1rvrMilgZpZxNc4Q/+MyTlLeqPwjtDBAT/y1VM2YS+UoNtYWv5wG4LBItZhrBQCrQvInfyVZPCZRN3+jYFcPpTJVZnXtyLY6pJeOk2SD2gKyh61iTzLfna7I7VKwkx3A7HJxMbdjG+WuGYrcOsGGtJsTp6EvFTw7jByRHYdEHmRIxWyYfxk0N1SXPKtyaHgK43dLAMaSNle0wpQRrRhND0CiV0DxD6UjRNBnsv5ZREUy34r9Rax5ACB0eZVwwE1sz0bhfIUb4eU8jERiqJ17vIQ6wPS5Sya8C1ckYIsZP/qL559mYQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAEgRbKLeX881adEx4CLfDRrHfOnjvL8mfyYEjXFuOZ2mBlUA+MWk5xd7230PLdd8hSms6I9JmxtwEL3uCb97wdg3QENLaWyR/TX6j6/nlGePGtabb/H5LAe3PPGDu17lG7jZeqM5VPhytZghCcI20SrA8/Zi/OHdzmX4bHOqIZ0p2zwv9btFtAolFoSyilmlt1POr+/pJcuQaEtGkrMNl/29EeZjZnNwUVQEH95588AtDwocMEw8iVYeAWFxllbqANqY9qYu6zEZowFDELgOtHKSOAnY9EbAzIQ6tEMLGD+IZzA+rqCkWudTYZEXvAZI8IjnpMFcvNk27+QnEkwHmnI=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"4bf7409db9f94c008c644cc8c98198ea"}, [
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
  '9f2ef5eb-f4b8-43c9-ba84-f9a0a8db4fe8',
  'x-ms-request-id',
  'ec3665bb-6f5c-4980-b35a-2b6ecb25c05c',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:02:18 GMT',
  'Content-Length',
  '1352'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/backupRestoreCertificateName-canrecoveradeletedcertificate-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/backupRestoreCertificateName-canrecoveradeletedcertificate-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAzapIIiw3DzOa6BpsyIGSKdztq0vIbXt2jpRP1rvrMilgZpZxNc4Q/+MyTlLeqPwjtDBAT/y1VM2YS+UoNtYWv5wG4LBItZhrBQCrQvInfyVZPCZRN3+jYFcPpTJVZnXtyLY6pJeOk2SD2gKyh61iTzLfna7I7VKwkx3A7HJxMbdjG+WuGYrcOsGGtJsTp6EvFTw7jByRHYdEHmRIxWyYfxk0N1SXPKtyaHgK43dLAMaSNle0wpQRrRhND0CiV0DxD6UjRNBnsv5ZREUy34r9Rax5ACB0eZVwwE1sz0bhfIUb4eU8jERiqJ17vIQ6wPS5Sya8C1ckYIsZP/qL559mYQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAEgRbKLeX881adEx4CLfDRrHfOnjvL8mfyYEjXFuOZ2mBlUA+MWk5xd7230PLdd8hSms6I9JmxtwEL3uCb97wdg3QENLaWyR/TX6j6/nlGePGtabb/H5LAe3PPGDu17lG7jZeqM5VPhytZghCcI20SrA8/Zi/OHdzmX4bHOqIZ0p2zwv9btFtAolFoSyilmlt1POr+/pJcuQaEtGkrMNl/29EeZjZnNwUVQEH95588AtDwocMEw8iVYeAWFxllbqANqY9qYu6zEZowFDELgOtHKSOAnY9EbAzIQ6tEMLGD+IZzA+rqCkWudTYZEXvAZI8IjnpMFcvNk27+QnEkwHmnI=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"4bf7409db9f94c008c644cc8c98198ea"}, [
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
  '3cbae034-db5c-4c52-a827-f3eccabb6b1c',
  'x-ms-request-id',
  '76f84edc-5032-4bf1-b586-58955fdfc95c',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:02:21 GMT',
  'Content-Length',
  '1352'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/backupRestoreCertificateName-canrecoveradeletedcertificate-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/backupRestoreCertificateName-canrecoveradeletedcertificate-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAzapIIiw3DzOa6BpsyIGSKdztq0vIbXt2jpRP1rvrMilgZpZxNc4Q/+MyTlLeqPwjtDBAT/y1VM2YS+UoNtYWv5wG4LBItZhrBQCrQvInfyVZPCZRN3+jYFcPpTJVZnXtyLY6pJeOk2SD2gKyh61iTzLfna7I7VKwkx3A7HJxMbdjG+WuGYrcOsGGtJsTp6EvFTw7jByRHYdEHmRIxWyYfxk0N1SXPKtyaHgK43dLAMaSNle0wpQRrRhND0CiV0DxD6UjRNBnsv5ZREUy34r9Rax5ACB0eZVwwE1sz0bhfIUb4eU8jERiqJ17vIQ6wPS5Sya8C1ckYIsZP/qL559mYQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAEgRbKLeX881adEx4CLfDRrHfOnjvL8mfyYEjXFuOZ2mBlUA+MWk5xd7230PLdd8hSms6I9JmxtwEL3uCb97wdg3QENLaWyR/TX6j6/nlGePGtabb/H5LAe3PPGDu17lG7jZeqM5VPhytZghCcI20SrA8/Zi/OHdzmX4bHOqIZ0p2zwv9btFtAolFoSyilmlt1POr+/pJcuQaEtGkrMNl/29EeZjZnNwUVQEH95588AtDwocMEw8iVYeAWFxllbqANqY9qYu6zEZowFDELgOtHKSOAnY9EbAzIQ6tEMLGD+IZzA+rqCkWudTYZEXvAZI8IjnpMFcvNk27+QnEkwHmnI=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"4bf7409db9f94c008c644cc8c98198ea"}, [
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
  '222a8f09-77ef-49b1-a990-d5c725f07b19',
  'x-ms-request-id',
  '01a0eacd-679d-48ca-9541-869ac60f2c9e',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:02:23 GMT',
  'Content-Length',
  '1352'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/backupRestoreCertificateName-canrecoveradeletedcertificate-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/backupRestoreCertificateName-canrecoveradeletedcertificate-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAzapIIiw3DzOa6BpsyIGSKdztq0vIbXt2jpRP1rvrMilgZpZxNc4Q/+MyTlLeqPwjtDBAT/y1VM2YS+UoNtYWv5wG4LBItZhrBQCrQvInfyVZPCZRN3+jYFcPpTJVZnXtyLY6pJeOk2SD2gKyh61iTzLfna7I7VKwkx3A7HJxMbdjG+WuGYrcOsGGtJsTp6EvFTw7jByRHYdEHmRIxWyYfxk0N1SXPKtyaHgK43dLAMaSNle0wpQRrRhND0CiV0DxD6UjRNBnsv5ZREUy34r9Rax5ACB0eZVwwE1sz0bhfIUb4eU8jERiqJ17vIQ6wPS5Sya8C1ckYIsZP/qL559mYQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAEgRbKLeX881adEx4CLfDRrHfOnjvL8mfyYEjXFuOZ2mBlUA+MWk5xd7230PLdd8hSms6I9JmxtwEL3uCb97wdg3QENLaWyR/TX6j6/nlGePGtabb/H5LAe3PPGDu17lG7jZeqM5VPhytZghCcI20SrA8/Zi/OHdzmX4bHOqIZ0p2zwv9btFtAolFoSyilmlt1POr+/pJcuQaEtGkrMNl/29EeZjZnNwUVQEH95588AtDwocMEw8iVYeAWFxllbqANqY9qYu6zEZowFDELgOtHKSOAnY9EbAzIQ6tEMLGD+IZzA+rqCkWudTYZEXvAZI8IjnpMFcvNk27+QnEkwHmnI=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"4bf7409db9f94c008c644cc8c98198ea"}, [
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
  'e12cda62-910b-4aad-92d2-402dfde433db',
  'x-ms-request-id',
  '35116521-080f-4656-b091-ad59c45ed8a8',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:02:24 GMT',
  'Content-Length',
  '1352'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/backupRestoreCertificateName-canrecoveradeletedcertificate-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/backupRestoreCertificateName-canrecoveradeletedcertificate-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAzapIIiw3DzOa6BpsyIGSKdztq0vIbXt2jpRP1rvrMilgZpZxNc4Q/+MyTlLeqPwjtDBAT/y1VM2YS+UoNtYWv5wG4LBItZhrBQCrQvInfyVZPCZRN3+jYFcPpTJVZnXtyLY6pJeOk2SD2gKyh61iTzLfna7I7VKwkx3A7HJxMbdjG+WuGYrcOsGGtJsTp6EvFTw7jByRHYdEHmRIxWyYfxk0N1SXPKtyaHgK43dLAMaSNle0wpQRrRhND0CiV0DxD6UjRNBnsv5ZREUy34r9Rax5ACB0eZVwwE1sz0bhfIUb4eU8jERiqJ17vIQ6wPS5Sya8C1ckYIsZP/qL559mYQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAEgRbKLeX881adEx4CLfDRrHfOnjvL8mfyYEjXFuOZ2mBlUA+MWk5xd7230PLdd8hSms6I9JmxtwEL3uCb97wdg3QENLaWyR/TX6j6/nlGePGtabb/H5LAe3PPGDu17lG7jZeqM5VPhytZghCcI20SrA8/Zi/OHdzmX4bHOqIZ0p2zwv9btFtAolFoSyilmlt1POr+/pJcuQaEtGkrMNl/29EeZjZnNwUVQEH95588AtDwocMEw8iVYeAWFxllbqANqY9qYu6zEZowFDELgOtHKSOAnY9EbAzIQ6tEMLGD+IZzA+rqCkWudTYZEXvAZI8IjnpMFcvNk27+QnEkwHmnI=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"4bf7409db9f94c008c644cc8c98198ea"}, [
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
  '514ae656-fa1d-41f8-920d-d56bc95898e1',
  'x-ms-request-id',
  'd411a7ac-fa07-4c06-b4e7-a80bb0e1b757',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:02:26 GMT',
  'Content-Length',
  '1352'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/backupRestoreCertificateName-canrecoveradeletedcertificate-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/backupRestoreCertificateName-canrecoveradeletedcertificate-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAzapIIiw3DzOa6BpsyIGSKdztq0vIbXt2jpRP1rvrMilgZpZxNc4Q/+MyTlLeqPwjtDBAT/y1VM2YS+UoNtYWv5wG4LBItZhrBQCrQvInfyVZPCZRN3+jYFcPpTJVZnXtyLY6pJeOk2SD2gKyh61iTzLfna7I7VKwkx3A7HJxMbdjG+WuGYrcOsGGtJsTp6EvFTw7jByRHYdEHmRIxWyYfxk0N1SXPKtyaHgK43dLAMaSNle0wpQRrRhND0CiV0DxD6UjRNBnsv5ZREUy34r9Rax5ACB0eZVwwE1sz0bhfIUb4eU8jERiqJ17vIQ6wPS5Sya8C1ckYIsZP/qL559mYQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAEgRbKLeX881adEx4CLfDRrHfOnjvL8mfyYEjXFuOZ2mBlUA+MWk5xd7230PLdd8hSms6I9JmxtwEL3uCb97wdg3QENLaWyR/TX6j6/nlGePGtabb/H5LAe3PPGDu17lG7jZeqM5VPhytZghCcI20SrA8/Zi/OHdzmX4bHOqIZ0p2zwv9btFtAolFoSyilmlt1POr+/pJcuQaEtGkrMNl/29EeZjZnNwUVQEH95588AtDwocMEw8iVYeAWFxllbqANqY9qYu6zEZowFDELgOtHKSOAnY9EbAzIQ6tEMLGD+IZzA+rqCkWudTYZEXvAZI8IjnpMFcvNk27+QnEkwHmnI=","cancellation_requested":false,"status":"completed","target":"https://keyvault_name.vault.azure.net/certificates/backupRestoreCertificateName-canrecoveradeletedcertificate-","request_id":"4bf7409db9f94c008c644cc8c98198ea"}, [
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
  'a1d2108b-2215-40f2-bfdb-434d5f616027',
  'x-ms-request-id',
  '0d78ec5a-2a30-4965-b76c-dd6a553b0ccf',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:02:29 GMT',
  'Content-Length',
  '1331'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/backupRestoreCertificateName-canrecoveradeletedcertificate-/')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/backupRestoreCertificateName-canrecoveradeletedcertificate-/8ee145d8787f4621b031894703a0ebd2","kid":"https://keyvault_name.vault.azure.net/keys/backupRestoreCertificateName-canrecoveradeletedcertificate-/8ee145d8787f4621b031894703a0ebd2","sid":"https://keyvault_name.vault.azure.net/secrets/backupRestoreCertificateName-canrecoveradeletedcertificate-/8ee145d8787f4621b031894703a0ebd2","x5t":"1FqgqATojzlfVuOt89URQ9MUm-w","cer":"MIIDKDCCAhCgAwIBAgIQHSblvH1sQyWinAgzcOJRDDANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjEwNDI4MjE1MjI3WhcNMjIwNDI4MjIwMjI3WjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQDNqkgiLDcPM5roGmzIgZIp3O2rS8hte3aOlE/Wu+syKWBmlnE1zhD/4zJOUt6o/CO0MEBP/LVUzZhL5Sg21ha/nAbgsEi1mGsFAKtC8id/JVk8JlE3f6NgVw+lMlVmde3Itjqkl46TZIPaArKHrWJPMt+drsjtUrCTHcDscnExt2Mb5a4Zitw6wYa0mxOnoS8VPDuMHJEdh0QeZEjFbJh/GTQ3VJc8q3JoeArjd0sAxpI2V7TClBGtGE0PQKJXQPEPpSNE0Gey/llERTLfiv1FrHkAIHR5lXDATWzPRuF8hRvh5TyMRGKonXu8hDrA9LlLJrwLVyRgixk/+ovnn2ZhAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBQstMezHlP9GX7eD/qa5N2PgfgDdDAdBgNVHQ4EFgQULLTHsx5T/Rl+3g/6muTdj4H4A3QwDQYJKoZIhvcNAQELBQADggEBAAqCavqCVDnrCltPi+MQfhTg2onJ8m6jBjby6PN0MuSCRjGfNdJobZ4wDv6Dj4raFWlbaSXPMR4aFf//CIQjLaG37/TOJWcMBYVWQ8ZWQSwAoM3Crjj2Y0U9v/w1tRW278GXcWHd1LEJlQBVVNzNH6JphE1a9jLHrmXxlyBjF2tvfhbfsPYIslXxwHbgVTnpKyJDr9uLYmPEYW5HzK9hSYnHBnOBEhFIDtC2atvVL6ZOy8SAgc7A4Z7x+sQbbuSfVvqiZlTuHhvwx028veMmQtGKpzJrR+03tkbt1kFiJ5pmO1KZDm2gnYyisWn/L7eI6rbuwUcKFCOAYB/LlnvqKOg=","attributes":{"enabled":true,"nbf":1619646747,"exp":1651183347,"created":1619647347,"updated":1619647347,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/backupRestoreCertificateName-canrecoveradeletedcertificate-/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1619647292,"updated":1619647292}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/backupRestoreCertificateName-canrecoveradeletedcertificate-/pending"}}, [
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
  'dbbe7cae-e8df-4119-871a-633b4d8bfc66',
  'x-ms-request-id',
  '78aca97e-5ba3-49eb-a840-17de5cdeca51',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:02:29 GMT',
  'Content-Length',
  '2650'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/certificates/backupRestoreCertificateName-canrecoveradeletedcertificate-')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/backupRestoreCertificateName-canrecoveradeletedcertificate-","deletedDate":1619647350,"scheduledPurgeDate":1627423350,"id":"https://keyvault_name.vault.azure.net/certificates/backupRestoreCertificateName-canrecoveradeletedcertificate-/8ee145d8787f4621b031894703a0ebd2","kid":"https://keyvault_name.vault.azure.net/keys/backupRestoreCertificateName-canrecoveradeletedcertificate-/8ee145d8787f4621b031894703a0ebd2","sid":"https://keyvault_name.vault.azure.net/secrets/backupRestoreCertificateName-canrecoveradeletedcertificate-/8ee145d8787f4621b031894703a0ebd2","x5t":"1FqgqATojzlfVuOt89URQ9MUm-w","cer":"MIIDKDCCAhCgAwIBAgIQHSblvH1sQyWinAgzcOJRDDANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjEwNDI4MjE1MjI3WhcNMjIwNDI4MjIwMjI3WjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQDNqkgiLDcPM5roGmzIgZIp3O2rS8hte3aOlE/Wu+syKWBmlnE1zhD/4zJOUt6o/CO0MEBP/LVUzZhL5Sg21ha/nAbgsEi1mGsFAKtC8id/JVk8JlE3f6NgVw+lMlVmde3Itjqkl46TZIPaArKHrWJPMt+drsjtUrCTHcDscnExt2Mb5a4Zitw6wYa0mxOnoS8VPDuMHJEdh0QeZEjFbJh/GTQ3VJc8q3JoeArjd0sAxpI2V7TClBGtGE0PQKJXQPEPpSNE0Gey/llERTLfiv1FrHkAIHR5lXDATWzPRuF8hRvh5TyMRGKonXu8hDrA9LlLJrwLVyRgixk/+ovnn2ZhAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBQstMezHlP9GX7eD/qa5N2PgfgDdDAdBgNVHQ4EFgQULLTHsx5T/Rl+3g/6muTdj4H4A3QwDQYJKoZIhvcNAQELBQADggEBAAqCavqCVDnrCltPi+MQfhTg2onJ8m6jBjby6PN0MuSCRjGfNdJobZ4wDv6Dj4raFWlbaSXPMR4aFf//CIQjLaG37/TOJWcMBYVWQ8ZWQSwAoM3Crjj2Y0U9v/w1tRW278GXcWHd1LEJlQBVVNzNH6JphE1a9jLHrmXxlyBjF2tvfhbfsPYIslXxwHbgVTnpKyJDr9uLYmPEYW5HzK9hSYnHBnOBEhFIDtC2atvVL6ZOy8SAgc7A4Z7x+sQbbuSfVvqiZlTuHhvwx028veMmQtGKpzJrR+03tkbt1kFiJ5pmO1KZDm2gnYyisWn/L7eI6rbuwUcKFCOAYB/LlnvqKOg=","attributes":{"enabled":true,"nbf":1619646747,"exp":1651183347,"created":1619647347,"updated":1619647347,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/backupRestoreCertificateName-canrecoveradeletedcertificate-/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1619647292,"updated":1619647292}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/backupRestoreCertificateName-canrecoveradeletedcertificate-/pending"}}, [
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
  '4c294f4d-2e33-46fa-9cf0-c76c8b5563d9',
  'x-ms-request-id',
  'a94de960-52f2-4526-8ec5-54c01f021c25',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:02:29 GMT',
  'Content-Length',
  '2862'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/backupRestoreCertificateName-canrecoveradeletedcertificate-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: backupRestoreCertificateName-canrecoveradeletedcertificate-"}}, [
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
  '901015cf-56cc-41e9-9574-e0344cb3b663',
  'x-ms-request-id',
  '6875f924-1888-4626-b036-72a6132da156',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:02:29 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/backupRestoreCertificateName-canrecoveradeletedcertificate-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: backupRestoreCertificateName-canrecoveradeletedcertificate-"}}, [
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
  'a5f92a8f-3c1c-4974-9b7b-29faedfecc80',
  'x-ms-request-id',
  '6a2cbb02-8005-4174-ab4c-20c1f5165ff4',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:02:29 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/backupRestoreCertificateName-canrecoveradeletedcertificate-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: backupRestoreCertificateName-canrecoveradeletedcertificate-"}}, [
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
  'c7966c90-676c-4831-b9ba-7850d9aee328',
  'x-ms-request-id',
  '22cbd86b-fa1c-4da8-8c56-1f6db5180fc2',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:02:31 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/backupRestoreCertificateName-canrecoveradeletedcertificate-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: backupRestoreCertificateName-canrecoveradeletedcertificate-"}}, [
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
  '19536301-5608-4d6e-a697-7f2059aa5761',
  'x-ms-request-id',
  'f4eb159b-7c7d-481e-a68e-2ef2fa28d633',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:02:34 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/backupRestoreCertificateName-canrecoveradeletedcertificate-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: backupRestoreCertificateName-canrecoveradeletedcertificate-"}}, [
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
  '7c6ce069-79b3-4e81-af41-c89012919778',
  'x-ms-request-id',
  '3797d96c-08e5-41d8-a964-4a2082e4fea4',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:02:36 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/backupRestoreCertificateName-canrecoveradeletedcertificate-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: backupRestoreCertificateName-canrecoveradeletedcertificate-"}}, [
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
  'f4517f80-b0d5-4cda-acac-385af1b39855',
  'x-ms-request-id',
  '8f8149bf-13ae-4a71-a2b8-87b4942c8061',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:02:38 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/backupRestoreCertificateName-canrecoveradeletedcertificate-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: backupRestoreCertificateName-canrecoveradeletedcertificate-"}}, [
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
  '35914405-deb7-440c-8deb-06153c2a6a6e',
  'x-ms-request-id',
  '32d09924-c4a7-4e88-8075-d157e40bd4ab',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:02:40 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/backupRestoreCertificateName-canrecoveradeletedcertificate-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: backupRestoreCertificateName-canrecoveradeletedcertificate-"}}, [
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
  '7755a967-7160-43b5-8021-b69cb82b6417',
  'x-ms-request-id',
  'bdefbac1-c26f-4128-a2af-6e78f62bb425',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:02:42 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/backupRestoreCertificateName-canrecoveradeletedcertificate-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: backupRestoreCertificateName-canrecoveradeletedcertificate-"}}, [
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
  '73e5b209-d734-44f1-8d8f-135cdc5cae1a',
  'x-ms-request-id',
  'cf1af752-2d2b-4d95-a0c1-f688aedfdabb',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:02:44 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/backupRestoreCertificateName-canrecoveradeletedcertificate-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: backupRestoreCertificateName-canrecoveradeletedcertificate-"}}, [
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
  '99b34588-99ab-44fc-9fd9-a116a1b0707f',
  'x-ms-request-id',
  'ab4c82f2-8aba-4c2f-a518-41523d6057ae',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:02:46 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/backupRestoreCertificateName-canrecoveradeletedcertificate-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: backupRestoreCertificateName-canrecoveradeletedcertificate-"}}, [
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
  '88b2ea23-9f2f-4abf-919b-876e4c284f20',
  'x-ms-request-id',
  'd510c5b4-53c5-4055-8389-c7d0c2af7d12',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:02:49 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/backupRestoreCertificateName-canrecoveradeletedcertificate-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: backupRestoreCertificateName-canrecoveradeletedcertificate-"}}, [
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
  '118dd85c-4ba2-4b26-8fcd-19bcd4314217',
  'x-ms-request-id',
  'bb49c3f4-7238-4ef6-81fd-96a92c48988f',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:02:50 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/backupRestoreCertificateName-canrecoveradeletedcertificate-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: backupRestoreCertificateName-canrecoveradeletedcertificate-"}}, [
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
  'bb7ce6f7-9689-4b7e-9519-cbd3cfbe3776',
  'x-ms-request-id',
  'abcc246f-1a0c-4953-8b19-5a3a3b0e823d',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:02:52 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/backupRestoreCertificateName-canrecoveradeletedcertificate-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: backupRestoreCertificateName-canrecoveradeletedcertificate-"}}, [
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
  '517f3f81-562b-4bb6-8b66-531340a5c868',
  'x-ms-request-id',
  'aee8c9ff-074d-4377-a7a6-c98e7788a00e',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:02:54 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/backupRestoreCertificateName-canrecoveradeletedcertificate-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: backupRestoreCertificateName-canrecoveradeletedcertificate-"}}, [
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
  '321c6690-9ad9-4eee-a896-050ff3e3e4c8',
  'x-ms-request-id',
  '31310a42-c4f4-42e1-aa56-acd06f59e1d4',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:02:57 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/backupRestoreCertificateName-canrecoveradeletedcertificate-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: backupRestoreCertificateName-canrecoveradeletedcertificate-"}}, [
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
  '4635e362-36ff-438f-a486-50ee4d2f5b20',
  'x-ms-request-id',
  '563ec517-c4e5-4971-ad30-60335b50af37',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:02:59 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/backupRestoreCertificateName-canrecoveradeletedcertificate-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: backupRestoreCertificateName-canrecoveradeletedcertificate-"}}, [
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
  '0e9ee1a5-ad0d-47b8-80b9-70333f3014f5',
  'x-ms-request-id',
  '78802953-6bae-4c45-b670-1c5b762f7043',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:03:01 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/backupRestoreCertificateName-canrecoveradeletedcertificate-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: backupRestoreCertificateName-canrecoveradeletedcertificate-"}}, [
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
  'f5e42672-3705-49b3-9b5e-7f0693090501',
  'x-ms-request-id',
  '703adac7-9b07-4a11-8560-c09878168239',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:03:03 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/backupRestoreCertificateName-canrecoveradeletedcertificate-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: backupRestoreCertificateName-canrecoveradeletedcertificate-"}}, [
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
  'cc71f74a-24e1-4646-b741-a7be552bd4c4',
  'x-ms-request-id',
  'd634ff7f-11bc-4f79-80b7-aed4ec261da6',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:03:05 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/backupRestoreCertificateName-canrecoveradeletedcertificate-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: backupRestoreCertificateName-canrecoveradeletedcertificate-"}}, [
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
  'bda171c7-69df-42c0-82f5-e6ab8845a5f3',
  'x-ms-request-id',
  '7c0c4f06-5672-480d-8baf-cc7eaa6fc818',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:03:07 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/backupRestoreCertificateName-canrecoveradeletedcertificate-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: backupRestoreCertificateName-canrecoveradeletedcertificate-"}}, [
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
  '1fcd8cd9-faf8-429d-913e-56b7f8174a2a',
  'x-ms-request-id',
  '6e8f7a74-4fd9-4061-a3d7-c8bc11b5a6c1',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:03:09 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/backupRestoreCertificateName-canrecoveradeletedcertificate-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: backupRestoreCertificateName-canrecoveradeletedcertificate-"}}, [
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
  '8a2913fb-8dbd-4219-975c-02b106bd966f',
  'x-ms-request-id',
  '6aeddc7d-adf0-401f-a1b4-0814e3dd0614',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:03:12 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/backupRestoreCertificateName-canrecoveradeletedcertificate-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: backupRestoreCertificateName-canrecoveradeletedcertificate-"}}, [
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
  '351da77e-7140-4d83-a65d-e7c44756a79a',
  'x-ms-request-id',
  '2c13a7fb-0a7c-48c0-ab93-7c40bf60f58a',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:03:14 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/backupRestoreCertificateName-canrecoveradeletedcertificate-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: backupRestoreCertificateName-canrecoveradeletedcertificate-"}}, [
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
  'edc31a63-630b-452e-98b3-dc360d3ba5c1',
  'x-ms-request-id',
  '45148087-bb59-416d-a466-cddcc8a4d360',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:03:16 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/backupRestoreCertificateName-canrecoveradeletedcertificate-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: backupRestoreCertificateName-canrecoveradeletedcertificate-"}}, [
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
  '5877bd50-b655-44d4-9ae2-1cb41485efef',
  'x-ms-request-id',
  '390f3695-aa1a-4649-acea-762caab8c676',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:03:18 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/backupRestoreCertificateName-canrecoveradeletedcertificate-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: backupRestoreCertificateName-canrecoveradeletedcertificate-"}}, [
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
  '9527237d-65d6-4769-9f83-f1bb6e9cc8fb',
  'x-ms-request-id',
  '71493d82-16cf-4c03-ab08-c62f63e1bb02',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:03:20 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/backupRestoreCertificateName-canrecoveradeletedcertificate-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: backupRestoreCertificateName-canrecoveradeletedcertificate-"}}, [
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
  'bb3095c2-f6ec-48fa-a53e-8939d9a769bf',
  'x-ms-request-id',
  '7144be6d-a8c7-4fde-acd9-394087c931ab',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:03:22 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/backupRestoreCertificateName-canrecoveradeletedcertificate-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: backupRestoreCertificateName-canrecoveradeletedcertificate-"}}, [
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
  '61eb66bc-3762-454b-a345-29bc7e4bfe1e',
  'x-ms-request-id',
  '0f16d1bc-62c9-4082-83a3-3c50b04d3429',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:03:24 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/backupRestoreCertificateName-canrecoveradeletedcertificate-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: backupRestoreCertificateName-canrecoveradeletedcertificate-"}}, [
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
  '278d27b7-bcde-4bb1-84f9-7f90074a76a6',
  'x-ms-request-id',
  'c813d85d-67d9-4c58-80fa-90c7a7bc60d4',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:03:26 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/backupRestoreCertificateName-canrecoveradeletedcertificate-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: backupRestoreCertificateName-canrecoveradeletedcertificate-"}}, [
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
  'e7afb22f-c6df-463e-a68e-1fb94fde86d8',
  'x-ms-request-id',
  '1d382475-85bf-40c0-8dd4-7fcd38c06ca6',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:03:29 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/backupRestoreCertificateName-canrecoveradeletedcertificate-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: backupRestoreCertificateName-canrecoveradeletedcertificate-"}}, [
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
  '060fa089-5f89-4108-bd98-9fb5aad43f3c',
  'x-ms-request-id',
  '27ac7f1a-db75-4b96-98c5-2d4724efa3b2',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:03:30 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/backupRestoreCertificateName-canrecoveradeletedcertificate-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: backupRestoreCertificateName-canrecoveradeletedcertificate-"}}, [
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
  'c320ba99-0321-4c0b-a63a-5d3e2be5fd8e',
  'x-ms-request-id',
  '6bd01474-bc5f-4dd7-bbed-1cbf18981162',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:03:32 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/backupRestoreCertificateName-canrecoveradeletedcertificate-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: backupRestoreCertificateName-canrecoveradeletedcertificate-"}}, [
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
  'c1200fec-3b09-4da2-a2ae-db86f99da925',
  'x-ms-request-id',
  'e6af578d-c1b6-4084-a773-0f8f4e6a40e0',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:03:34 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/backupRestoreCertificateName-canrecoveradeletedcertificate-')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/backupRestoreCertificateName-canrecoveradeletedcertificate-","deletedDate":1619647350,"scheduledPurgeDate":1627423350,"id":"https://keyvault_name.vault.azure.net/certificates/backupRestoreCertificateName-canrecoveradeletedcertificate-/8ee145d8787f4621b031894703a0ebd2","kid":"https://keyvault_name.vault.azure.net/keys/backupRestoreCertificateName-canrecoveradeletedcertificate-/8ee145d8787f4621b031894703a0ebd2","sid":"https://keyvault_name.vault.azure.net/secrets/backupRestoreCertificateName-canrecoveradeletedcertificate-/8ee145d8787f4621b031894703a0ebd2","x5t":"1FqgqATojzlfVuOt89URQ9MUm-w","cer":"MIIDKDCCAhCgAwIBAgIQHSblvH1sQyWinAgzcOJRDDANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjEwNDI4MjE1MjI3WhcNMjIwNDI4MjIwMjI3WjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQDNqkgiLDcPM5roGmzIgZIp3O2rS8hte3aOlE/Wu+syKWBmlnE1zhD/4zJOUt6o/CO0MEBP/LVUzZhL5Sg21ha/nAbgsEi1mGsFAKtC8id/JVk8JlE3f6NgVw+lMlVmde3Itjqkl46TZIPaArKHrWJPMt+drsjtUrCTHcDscnExt2Mb5a4Zitw6wYa0mxOnoS8VPDuMHJEdh0QeZEjFbJh/GTQ3VJc8q3JoeArjd0sAxpI2V7TClBGtGE0PQKJXQPEPpSNE0Gey/llERTLfiv1FrHkAIHR5lXDATWzPRuF8hRvh5TyMRGKonXu8hDrA9LlLJrwLVyRgixk/+ovnn2ZhAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBQstMezHlP9GX7eD/qa5N2PgfgDdDAdBgNVHQ4EFgQULLTHsx5T/Rl+3g/6muTdj4H4A3QwDQYJKoZIhvcNAQELBQADggEBAAqCavqCVDnrCltPi+MQfhTg2onJ8m6jBjby6PN0MuSCRjGfNdJobZ4wDv6Dj4raFWlbaSXPMR4aFf//CIQjLaG37/TOJWcMBYVWQ8ZWQSwAoM3Crjj2Y0U9v/w1tRW278GXcWHd1LEJlQBVVNzNH6JphE1a9jLHrmXxlyBjF2tvfhbfsPYIslXxwHbgVTnpKyJDr9uLYmPEYW5HzK9hSYnHBnOBEhFIDtC2atvVL6ZOy8SAgc7A4Z7x+sQbbuSfVvqiZlTuHhvwx028veMmQtGKpzJrR+03tkbt1kFiJ5pmO1KZDm2gnYyisWn/L7eI6rbuwUcKFCOAYB/LlnvqKOg=","attributes":{"enabled":true,"nbf":1619646747,"exp":1651183347,"created":1619647347,"updated":1619647347,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/backupRestoreCertificateName-canrecoveradeletedcertificate-/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1619647292,"updated":1619647292}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/backupRestoreCertificateName-canrecoveradeletedcertificate-/pending"}}, [
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
  'cbf11cbc-972b-44f0-af53-43f79c4b5ccd',
  'x-ms-request-id',
  '5af8e03d-0220-43d3-90df-7ba2f13b6d04',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:03:36 GMT',
  'Content-Length',
  '2862'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/backupRestoreCertificateName-canrecoveradeletedcertificate-/')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"A certificate with (name/id) backupRestoreCertificateName-canrecoveradeletedcertificate- was not found in this key vault. If you recently deleted this certificate you may be able to recover it using the correct recovery command. For help resolving this issue, please see https://go.microsoft.com/fwlink/?linkid=2125182"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '387',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '58f465cd-a1c8-4a68-8455-6e349cc9aa91',
  'x-ms-request-id',
  '5089e15b-b6c8-4751-a594-473a9331bc66',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:03:36 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/deletedcertificates/backupRestoreCertificateName-canrecoveradeletedcertificate-/recover')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/backupRestoreCertificateName-canrecoveradeletedcertificate-/8ee145d8787f4621b031894703a0ebd2","kid":"https://keyvault_name.vault.azure.net/keys/backupRestoreCertificateName-canrecoveradeletedcertificate-/8ee145d8787f4621b031894703a0ebd2","sid":"https://keyvault_name.vault.azure.net/secrets/backupRestoreCertificateName-canrecoveradeletedcertificate-/8ee145d8787f4621b031894703a0ebd2","x5t":"1FqgqATojzlfVuOt89URQ9MUm-w","cer":"MIIDKDCCAhCgAwIBAgIQHSblvH1sQyWinAgzcOJRDDANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjEwNDI4MjE1MjI3WhcNMjIwNDI4MjIwMjI3WjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQDNqkgiLDcPM5roGmzIgZIp3O2rS8hte3aOlE/Wu+syKWBmlnE1zhD/4zJOUt6o/CO0MEBP/LVUzZhL5Sg21ha/nAbgsEi1mGsFAKtC8id/JVk8JlE3f6NgVw+lMlVmde3Itjqkl46TZIPaArKHrWJPMt+drsjtUrCTHcDscnExt2Mb5a4Zitw6wYa0mxOnoS8VPDuMHJEdh0QeZEjFbJh/GTQ3VJc8q3JoeArjd0sAxpI2V7TClBGtGE0PQKJXQPEPpSNE0Gey/llERTLfiv1FrHkAIHR5lXDATWzPRuF8hRvh5TyMRGKonXu8hDrA9LlLJrwLVyRgixk/+ovnn2ZhAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBQstMezHlP9GX7eD/qa5N2PgfgDdDAdBgNVHQ4EFgQULLTHsx5T/Rl+3g/6muTdj4H4A3QwDQYJKoZIhvcNAQELBQADggEBAAqCavqCVDnrCltPi+MQfhTg2onJ8m6jBjby6PN0MuSCRjGfNdJobZ4wDv6Dj4raFWlbaSXPMR4aFf//CIQjLaG37/TOJWcMBYVWQ8ZWQSwAoM3Crjj2Y0U9v/w1tRW278GXcWHd1LEJlQBVVNzNH6JphE1a9jLHrmXxlyBjF2tvfhbfsPYIslXxwHbgVTnpKyJDr9uLYmPEYW5HzK9hSYnHBnOBEhFIDtC2atvVL6ZOy8SAgc7A4Z7x+sQbbuSfVvqiZlTuHhvwx028veMmQtGKpzJrR+03tkbt1kFiJ5pmO1KZDm2gnYyisWn/L7eI6rbuwUcKFCOAYB/LlnvqKOg=","attributes":{"enabled":true,"nbf":1619646747,"exp":1651183347,"created":1619647347,"updated":1619647347,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/backupRestoreCertificateName-canrecoveradeletedcertificate-/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1619647292,"updated":1619647292}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/backupRestoreCertificateName-canrecoveradeletedcertificate-/pending"}}, [
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
  'e42873e4-6544-4fcf-8de5-f91895d26b32',
  'x-ms-request-id',
  '7a3e2797-713a-4309-8de9-397ced9145e4',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:03:36 GMT',
  'Content-Length',
  '2650'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/backupRestoreCertificateName-canrecoveradeletedcertificate-/')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"A certificate with (name/id) backupRestoreCertificateName-canrecoveradeletedcertificate- was not found in this key vault. If you recently deleted this certificate you may be able to recover it using the correct recovery command. For help resolving this issue, please see https://go.microsoft.com/fwlink/?linkid=2125182"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '387',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '66713b70-1992-454c-9df0-155b69e92aa4',
  'x-ms-request-id',
  'b85523b2-4927-428d-b58b-f60a7dfcced2',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:03:36 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/backupRestoreCertificateName-canrecoveradeletedcertificate-/')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"A certificate with (name/id) backupRestoreCertificateName-canrecoveradeletedcertificate- was not found in this key vault. If you recently deleted this certificate you may be able to recover it using the correct recovery command. For help resolving this issue, please see https://go.microsoft.com/fwlink/?linkid=2125182"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '387',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'cbbc577d-acee-4d99-92d4-b3f3d1a34c28',
  'x-ms-request-id',
  'c032f525-a196-4b76-8a15-30dcbd5941a9',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:03:36 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/backupRestoreCertificateName-canrecoveradeletedcertificate-/')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"A certificate with (name/id) backupRestoreCertificateName-canrecoveradeletedcertificate- was not found in this key vault. If you recently deleted this certificate you may be able to recover it using the correct recovery command. For help resolving this issue, please see https://go.microsoft.com/fwlink/?linkid=2125182"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '387',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'c4e787b3-c8ee-40ed-ae4d-4e3327c24b8d',
  'x-ms-request-id',
  'a6f72f14-0cad-4567-9efb-09b802ad55e4',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:03:39 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/backupRestoreCertificateName-canrecoveradeletedcertificate-/')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"A certificate with (name/id) backupRestoreCertificateName-canrecoveradeletedcertificate- was not found in this key vault. If you recently deleted this certificate you may be able to recover it using the correct recovery command. For help resolving this issue, please see https://go.microsoft.com/fwlink/?linkid=2125182"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '387',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '5b097d59-c746-45f2-b98c-85eab794f02b',
  'x-ms-request-id',
  '286f155d-b25c-49c9-8e14-76df269c5d05',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:03:41 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/backupRestoreCertificateName-canrecoveradeletedcertificate-/')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"A certificate with (name/id) backupRestoreCertificateName-canrecoveradeletedcertificate- was not found in this key vault. If you recently deleted this certificate you may be able to recover it using the correct recovery command. For help resolving this issue, please see https://go.microsoft.com/fwlink/?linkid=2125182"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '387',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '8236ab43-c941-4e1a-a267-2eb376cb53f3',
  'x-ms-request-id',
  '677f9ac6-b575-4b1f-8ec2-7035d08f4bd8',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:03:43 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/backupRestoreCertificateName-canrecoveradeletedcertificate-/')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"A certificate with (name/id) backupRestoreCertificateName-canrecoveradeletedcertificate- was not found in this key vault. If you recently deleted this certificate you may be able to recover it using the correct recovery command. For help resolving this issue, please see https://go.microsoft.com/fwlink/?linkid=2125182"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '387',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '8d47ae3c-97e4-4db1-a280-10817715aefa',
  'x-ms-request-id',
  'da9c99cd-88b8-4c30-94eb-dcae0abf0f47',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:03:45 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/backupRestoreCertificateName-canrecoveradeletedcertificate-/')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"A certificate with (name/id) backupRestoreCertificateName-canrecoveradeletedcertificate- was not found in this key vault. If you recently deleted this certificate you may be able to recover it using the correct recovery command. For help resolving this issue, please see https://go.microsoft.com/fwlink/?linkid=2125182"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '387',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '4706cf2f-d4c0-4907-a044-c45bc60e2442',
  'x-ms-request-id',
  'ab8e2fb3-624b-495b-b548-7012fe402735',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:03:48 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/backupRestoreCertificateName-canrecoveradeletedcertificate-/')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"A certificate with (name/id) backupRestoreCertificateName-canrecoveradeletedcertificate- was not found in this key vault. If you recently deleted this certificate you may be able to recover it using the correct recovery command. For help resolving this issue, please see https://go.microsoft.com/fwlink/?linkid=2125182"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '387',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '07826c1c-d3fa-4f31-94e3-a113dde716bd',
  'x-ms-request-id',
  '369e0153-d05f-4f55-bd26-7a67bfabe59c',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:03:50 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/backupRestoreCertificateName-canrecoveradeletedcertificate-/')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"A certificate with (name/id) backupRestoreCertificateName-canrecoveradeletedcertificate- was not found in this key vault. If you recently deleted this certificate you may be able to recover it using the correct recovery command. For help resolving this issue, please see https://go.microsoft.com/fwlink/?linkid=2125182"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '387',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '7de7d6d8-7559-4e2a-a90c-586938a9e5ef',
  'x-ms-request-id',
  '8b90f36a-2b2e-4a79-8d9e-13f9431a28ed',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:03:52 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/backupRestoreCertificateName-canrecoveradeletedcertificate-/')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"A certificate with (name/id) backupRestoreCertificateName-canrecoveradeletedcertificate- was not found in this key vault. If you recently deleted this certificate you may be able to recover it using the correct recovery command. For help resolving this issue, please see https://go.microsoft.com/fwlink/?linkid=2125182"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '387',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '49ea5504-91b2-43d2-a304-a2a3b53061d1',
  'x-ms-request-id',
  '95de23be-cbfc-43e9-a53b-bcdf6dec07f5',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:03:54 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/backupRestoreCertificateName-canrecoveradeletedcertificate-/')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"A certificate with (name/id) backupRestoreCertificateName-canrecoveradeletedcertificate- was not found in this key vault. If you recently deleted this certificate you may be able to recover it using the correct recovery command. For help resolving this issue, please see https://go.microsoft.com/fwlink/?linkid=2125182"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '387',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '0db54295-0a4b-4330-8a4d-6a7f64b4f001',
  'x-ms-request-id',
  '8e207d0d-f405-4480-8990-2629047295c0',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:03:56 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/backupRestoreCertificateName-canrecoveradeletedcertificate-/')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"A certificate with (name/id) backupRestoreCertificateName-canrecoveradeletedcertificate- was not found in this key vault. If you recently deleted this certificate you may be able to recover it using the correct recovery command. For help resolving this issue, please see https://go.microsoft.com/fwlink/?linkid=2125182"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '387',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '775fddc3-a2c2-4529-9bb1-8175195faca3',
  'x-ms-request-id',
  'f5ed6b33-00ac-44ba-98fe-99073cf2b132',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:03:58 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/backupRestoreCertificateName-canrecoveradeletedcertificate-/')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"A certificate with (name/id) backupRestoreCertificateName-canrecoveradeletedcertificate- was not found in this key vault. If you recently deleted this certificate you may be able to recover it using the correct recovery command. For help resolving this issue, please see https://go.microsoft.com/fwlink/?linkid=2125182"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '387',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'a678c0ce-9faf-40e0-8a1f-29ad882f033f',
  'x-ms-request-id',
  '0b3d1d7d-4dd0-473c-b482-31da7cb050d8',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:03:59 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/backupRestoreCertificateName-canrecoveradeletedcertificate-/')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"A certificate with (name/id) backupRestoreCertificateName-canrecoveradeletedcertificate- was not found in this key vault. If you recently deleted this certificate you may be able to recover it using the correct recovery command. For help resolving this issue, please see https://go.microsoft.com/fwlink/?linkid=2125182"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '387',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'b226333c-e2f5-461f-9bcc-c07c454c7f15',
  'x-ms-request-id',
  'd7ec7144-9ef2-4c1c-b75e-80748dea76bb',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:04:02 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/backupRestoreCertificateName-canrecoveradeletedcertificate-/')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"A certificate with (name/id) backupRestoreCertificateName-canrecoveradeletedcertificate- was not found in this key vault. If you recently deleted this certificate you may be able to recover it using the correct recovery command. For help resolving this issue, please see https://go.microsoft.com/fwlink/?linkid=2125182"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '387',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '152c522e-f382-4279-b268-06633ddf0d62',
  'x-ms-request-id',
  '7b53810b-0e28-4cfd-9cb2-4c84ba56f641',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:04:04 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/backupRestoreCertificateName-canrecoveradeletedcertificate-/')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"A certificate with (name/id) backupRestoreCertificateName-canrecoveradeletedcertificate- was not found in this key vault. If you recently deleted this certificate you may be able to recover it using the correct recovery command. For help resolving this issue, please see https://go.microsoft.com/fwlink/?linkid=2125182"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '387',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'afbd1924-9291-4b9c-8df9-541f2ba2c249',
  'x-ms-request-id',
  '4b4382e4-8ab4-4c31-b594-efdc88695a21',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:04:06 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/backupRestoreCertificateName-canrecoveradeletedcertificate-/')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"A certificate with (name/id) backupRestoreCertificateName-canrecoveradeletedcertificate- was not found in this key vault. If you recently deleted this certificate you may be able to recover it using the correct recovery command. For help resolving this issue, please see https://go.microsoft.com/fwlink/?linkid=2125182"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '387',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'baeba817-71f8-4ec1-80a1-752aee7599d3',
  'x-ms-request-id',
  '4e8c9e3f-63ee-402a-95f1-775ea6cc4ea3',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:04:08 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/backupRestoreCertificateName-canrecoveradeletedcertificate-/')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"A certificate with (name/id) backupRestoreCertificateName-canrecoveradeletedcertificate- was not found in this key vault. If you recently deleted this certificate you may be able to recover it using the correct recovery command. For help resolving this issue, please see https://go.microsoft.com/fwlink/?linkid=2125182"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '387',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '10be1220-b533-4487-8090-fca8e900c53a',
  'x-ms-request-id',
  '4e061ab5-af65-4054-83df-369399300215',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:04:10 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/backupRestoreCertificateName-canrecoveradeletedcertificate-/')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"A certificate with (name/id) backupRestoreCertificateName-canrecoveradeletedcertificate- was not found in this key vault. If you recently deleted this certificate you may be able to recover it using the correct recovery command. For help resolving this issue, please see https://go.microsoft.com/fwlink/?linkid=2125182"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '387',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '97abb83e-ba92-481d-aab6-5bad1b81b9f4',
  'x-ms-request-id',
  '1d83a9f9-41d5-4737-80a1-61d06acee1be',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:04:12 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/backupRestoreCertificateName-canrecoveradeletedcertificate-/')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/backupRestoreCertificateName-canrecoveradeletedcertificate-/8ee145d8787f4621b031894703a0ebd2","kid":"https://keyvault_name.vault.azure.net/keys/backupRestoreCertificateName-canrecoveradeletedcertificate-/8ee145d8787f4621b031894703a0ebd2","sid":"https://keyvault_name.vault.azure.net/secrets/backupRestoreCertificateName-canrecoveradeletedcertificate-/8ee145d8787f4621b031894703a0ebd2","x5t":"1FqgqATojzlfVuOt89URQ9MUm-w","cer":"MIIDKDCCAhCgAwIBAgIQHSblvH1sQyWinAgzcOJRDDANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjEwNDI4MjE1MjI3WhcNMjIwNDI4MjIwMjI3WjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQDNqkgiLDcPM5roGmzIgZIp3O2rS8hte3aOlE/Wu+syKWBmlnE1zhD/4zJOUt6o/CO0MEBP/LVUzZhL5Sg21ha/nAbgsEi1mGsFAKtC8id/JVk8JlE3f6NgVw+lMlVmde3Itjqkl46TZIPaArKHrWJPMt+drsjtUrCTHcDscnExt2Mb5a4Zitw6wYa0mxOnoS8VPDuMHJEdh0QeZEjFbJh/GTQ3VJc8q3JoeArjd0sAxpI2V7TClBGtGE0PQKJXQPEPpSNE0Gey/llERTLfiv1FrHkAIHR5lXDATWzPRuF8hRvh5TyMRGKonXu8hDrA9LlLJrwLVyRgixk/+ovnn2ZhAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBQstMezHlP9GX7eD/qa5N2PgfgDdDAdBgNVHQ4EFgQULLTHsx5T/Rl+3g/6muTdj4H4A3QwDQYJKoZIhvcNAQELBQADggEBAAqCavqCVDnrCltPi+MQfhTg2onJ8m6jBjby6PN0MuSCRjGfNdJobZ4wDv6Dj4raFWlbaSXPMR4aFf//CIQjLaG37/TOJWcMBYVWQ8ZWQSwAoM3Crjj2Y0U9v/w1tRW278GXcWHd1LEJlQBVVNzNH6JphE1a9jLHrmXxlyBjF2tvfhbfsPYIslXxwHbgVTnpKyJDr9uLYmPEYW5HzK9hSYnHBnOBEhFIDtC2atvVL6ZOy8SAgc7A4Z7x+sQbbuSfVvqiZlTuHhvwx028veMmQtGKpzJrR+03tkbt1kFiJ5pmO1KZDm2gnYyisWn/L7eI6rbuwUcKFCOAYB/LlnvqKOg=","attributes":{"enabled":true,"nbf":1619646747,"exp":1651183347,"created":1619647347,"updated":1619647347,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/backupRestoreCertificateName-canrecoveradeletedcertificate-/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1619647292,"updated":1619647292}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/backupRestoreCertificateName-canrecoveradeletedcertificate-/pending"}}, [
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
  '1f4aae6e-a8fc-471f-a133-2ab31fb3efff',
  'x-ms-request-id',
  'ad5adf60-d130-4ae9-937c-81d38fdeac15',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:04:15 GMT',
  'Content-Length',
  '2650'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/certificates/backupRestoreCertificateName-canrecoveradeletedcertificate-')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/backupRestoreCertificateName-canrecoveradeletedcertificate-","deletedDate":1619647455,"scheduledPurgeDate":1627423455,"id":"https://keyvault_name.vault.azure.net/certificates/backupRestoreCertificateName-canrecoveradeletedcertificate-/8ee145d8787f4621b031894703a0ebd2","kid":"https://keyvault_name.vault.azure.net/keys/backupRestoreCertificateName-canrecoveradeletedcertificate-/8ee145d8787f4621b031894703a0ebd2","sid":"https://keyvault_name.vault.azure.net/secrets/backupRestoreCertificateName-canrecoveradeletedcertificate-/8ee145d8787f4621b031894703a0ebd2","x5t":"1FqgqATojzlfVuOt89URQ9MUm-w","cer":"MIIDKDCCAhCgAwIBAgIQHSblvH1sQyWinAgzcOJRDDANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjEwNDI4MjE1MjI3WhcNMjIwNDI4MjIwMjI3WjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQDNqkgiLDcPM5roGmzIgZIp3O2rS8hte3aOlE/Wu+syKWBmlnE1zhD/4zJOUt6o/CO0MEBP/LVUzZhL5Sg21ha/nAbgsEi1mGsFAKtC8id/JVk8JlE3f6NgVw+lMlVmde3Itjqkl46TZIPaArKHrWJPMt+drsjtUrCTHcDscnExt2Mb5a4Zitw6wYa0mxOnoS8VPDuMHJEdh0QeZEjFbJh/GTQ3VJc8q3JoeArjd0sAxpI2V7TClBGtGE0PQKJXQPEPpSNE0Gey/llERTLfiv1FrHkAIHR5lXDATWzPRuF8hRvh5TyMRGKonXu8hDrA9LlLJrwLVyRgixk/+ovnn2ZhAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBQstMezHlP9GX7eD/qa5N2PgfgDdDAdBgNVHQ4EFgQULLTHsx5T/Rl+3g/6muTdj4H4A3QwDQYJKoZIhvcNAQELBQADggEBAAqCavqCVDnrCltPi+MQfhTg2onJ8m6jBjby6PN0MuSCRjGfNdJobZ4wDv6Dj4raFWlbaSXPMR4aFf//CIQjLaG37/TOJWcMBYVWQ8ZWQSwAoM3Crjj2Y0U9v/w1tRW278GXcWHd1LEJlQBVVNzNH6JphE1a9jLHrmXxlyBjF2tvfhbfsPYIslXxwHbgVTnpKyJDr9uLYmPEYW5HzK9hSYnHBnOBEhFIDtC2atvVL6ZOy8SAgc7A4Z7x+sQbbuSfVvqiZlTuHhvwx028veMmQtGKpzJrR+03tkbt1kFiJ5pmO1KZDm2gnYyisWn/L7eI6rbuwUcKFCOAYB/LlnvqKOg=","attributes":{"enabled":true,"nbf":1619646747,"exp":1651183347,"created":1619647347,"updated":1619647347,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/backupRestoreCertificateName-canrecoveradeletedcertificate-/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1619647292,"updated":1619647292}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/backupRestoreCertificateName-canrecoveradeletedcertificate-/pending"}}, [
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
  'a71e0427-a135-40a7-9ee2-03d9f734ca83',
  'x-ms-request-id',
  '28736819-e0d9-4232-bb33-8ca8a39c34a0',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:04:15 GMT',
  'Content-Length',
  '2862'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/backupRestoreCertificateName-canrecoveradeletedcertificate-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: backupRestoreCertificateName-canrecoveradeletedcertificate-"}}, [
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
  '09a672ee-c497-4d1d-bcec-ec94c5081f3b',
  'x-ms-request-id',
  '1dc6f6b2-e3f2-4d4b-8d23-43f2b96045a6',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:04:15 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/backupRestoreCertificateName-canrecoveradeletedcertificate-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: backupRestoreCertificateName-canrecoveradeletedcertificate-"}}, [
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
  '756ab61d-30ce-4f16-9946-2a12a116eec3',
  'x-ms-request-id',
  'dc1d4279-1c69-4096-83e5-af89c33e6036',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:04:15 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/backupRestoreCertificateName-canrecoveradeletedcertificate-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: backupRestoreCertificateName-canrecoveradeletedcertificate-"}}, [
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
  'f6fc6bfc-9fb4-4dc4-ae0f-dae4c2842d55',
  'x-ms-request-id',
  'b002b97f-8eaf-475f-aacd-5e0d6f54b545',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:04:17 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/backupRestoreCertificateName-canrecoveradeletedcertificate-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: backupRestoreCertificateName-canrecoveradeletedcertificate-"}}, [
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
  '640e63e9-f07e-40b9-afaa-ebdadb347b83',
  'x-ms-request-id',
  '6df6c3d4-fe75-4c9c-b09b-7bac5f7a8201',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:04:19 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/backupRestoreCertificateName-canrecoveradeletedcertificate-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: backupRestoreCertificateName-canrecoveradeletedcertificate-"}}, [
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
  'b83d1c76-a3c5-4818-9394-251d9a46101f',
  'x-ms-request-id',
  'e5ef4541-7185-4a34-8cff-d9cecdcc15f7',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:04:21 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/backupRestoreCertificateName-canrecoveradeletedcertificate-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: backupRestoreCertificateName-canrecoveradeletedcertificate-"}}, [
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
  '767db840-cd2f-4e21-9a65-ee86abe64c65',
  'x-ms-request-id',
  '90201c5b-4cda-4899-a8a5-6c15b1f83f60',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:04:23 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/backupRestoreCertificateName-canrecoveradeletedcertificate-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: backupRestoreCertificateName-canrecoveradeletedcertificate-"}}, [
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
  '7999c438-47af-4122-baac-2646a0c1975f',
  'x-ms-request-id',
  '230f8755-f92c-400e-85f3-6004336c965d',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:04:25 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/backupRestoreCertificateName-canrecoveradeletedcertificate-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: backupRestoreCertificateName-canrecoveradeletedcertificate-"}}, [
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
  'bbd20e4b-fb8a-4a96-832a-144e0c8e234e',
  'x-ms-request-id',
  '0d83e416-cd5b-421d-94b0-6abe700b373d',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:04:27 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/backupRestoreCertificateName-canrecoveradeletedcertificate-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: backupRestoreCertificateName-canrecoveradeletedcertificate-"}}, [
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
  'ecaeb5d1-5513-4fc8-941c-b89f48a8054f',
  'x-ms-request-id',
  'f4ab2765-e8c0-4e1f-a44e-bbfe40ff5ee3',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:04:30 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/backupRestoreCertificateName-canrecoveradeletedcertificate-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: backupRestoreCertificateName-canrecoveradeletedcertificate-"}}, [
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
  '9aaef187-ae47-481c-b101-22e4b45d2522',
  'x-ms-request-id',
  '05091e7f-8e34-44de-a810-4a0d01f6826f',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:04:32 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/backupRestoreCertificateName-canrecoveradeletedcertificate-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: backupRestoreCertificateName-canrecoveradeletedcertificate-"}}, [
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
  'a037aab7-06d6-49eb-beb2-cea8a478a100',
  'x-ms-request-id',
  'a961c2bc-d561-4d61-95d9-197a93e1c2ec',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:04:34 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/backupRestoreCertificateName-canrecoveradeletedcertificate-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: backupRestoreCertificateName-canrecoveradeletedcertificate-"}}, [
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
  'e4a7c8fe-4b45-4732-86b6-d5760c9390f2',
  'x-ms-request-id',
  'ce10aa08-5559-473f-bd84-ad40be3af2eb',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:04:35 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/backupRestoreCertificateName-canrecoveradeletedcertificate-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: backupRestoreCertificateName-canrecoveradeletedcertificate-"}}, [
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
  '2f047ef9-5229-44f4-abda-c8e3892df6eb',
  'x-ms-request-id',
  'e88e3565-c7c2-49c0-af40-cd13630768a4',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:04:37 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/backupRestoreCertificateName-canrecoveradeletedcertificate-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: backupRestoreCertificateName-canrecoveradeletedcertificate-"}}, [
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
  'c0d146a6-0a9a-41a8-a202-c7f8f4636776',
  'x-ms-request-id',
  'b85f6a5a-5c10-4d58-a935-e16a7a868677',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:04:39 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/backupRestoreCertificateName-canrecoveradeletedcertificate-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: backupRestoreCertificateName-canrecoveradeletedcertificate-"}}, [
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
  '88bafcd8-11d1-4785-9e10-a1b3a0c28529',
  'x-ms-request-id',
  '7c68400e-5027-40ff-8139-c57125894eac',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:04:41 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/backupRestoreCertificateName-canrecoveradeletedcertificate-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: backupRestoreCertificateName-canrecoveradeletedcertificate-"}}, [
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
  'f6d507d8-009f-48ac-98b1-f714ec31d180',
  'x-ms-request-id',
  '20454aaa-76fa-4512-9ca6-a2448a59ebba',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:04:44 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/backupRestoreCertificateName-canrecoveradeletedcertificate-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: backupRestoreCertificateName-canrecoveradeletedcertificate-"}}, [
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
  '7f368f63-0fff-4b2e-9a0d-264bfc0a7e41',
  'x-ms-request-id',
  '652ee8f9-adda-4ed4-8c3c-a2b5d7e4651f',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:04:46 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/backupRestoreCertificateName-canrecoveradeletedcertificate-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: backupRestoreCertificateName-canrecoveradeletedcertificate-"}}, [
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
  '48b7b01b-375a-495f-8a10-ca6ecd96621a',
  'x-ms-request-id',
  '00b4009a-75a7-42dd-b622-62528c63d4ec',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:04:48 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/backupRestoreCertificateName-canrecoveradeletedcertificate-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: backupRestoreCertificateName-canrecoveradeletedcertificate-"}}, [
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
  '72ab084b-82d3-4be6-948f-e45cae3ed6a4',
  'x-ms-request-id',
  'dda72709-2843-4603-bd8c-aa880e9d9d6f',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:04:50 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/backupRestoreCertificateName-canrecoveradeletedcertificate-')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/backupRestoreCertificateName-canrecoveradeletedcertificate-","deletedDate":1619647455,"scheduledPurgeDate":1627423455,"id":"https://keyvault_name.vault.azure.net/certificates/backupRestoreCertificateName-canrecoveradeletedcertificate-/8ee145d8787f4621b031894703a0ebd2","kid":"https://keyvault_name.vault.azure.net/keys/backupRestoreCertificateName-canrecoveradeletedcertificate-/8ee145d8787f4621b031894703a0ebd2","sid":"https://keyvault_name.vault.azure.net/secrets/backupRestoreCertificateName-canrecoveradeletedcertificate-/8ee145d8787f4621b031894703a0ebd2","x5t":"1FqgqATojzlfVuOt89URQ9MUm-w","cer":"MIIDKDCCAhCgAwIBAgIQHSblvH1sQyWinAgzcOJRDDANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjEwNDI4MjE1MjI3WhcNMjIwNDI4MjIwMjI3WjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQDNqkgiLDcPM5roGmzIgZIp3O2rS8hte3aOlE/Wu+syKWBmlnE1zhD/4zJOUt6o/CO0MEBP/LVUzZhL5Sg21ha/nAbgsEi1mGsFAKtC8id/JVk8JlE3f6NgVw+lMlVmde3Itjqkl46TZIPaArKHrWJPMt+drsjtUrCTHcDscnExt2Mb5a4Zitw6wYa0mxOnoS8VPDuMHJEdh0QeZEjFbJh/GTQ3VJc8q3JoeArjd0sAxpI2V7TClBGtGE0PQKJXQPEPpSNE0Gey/llERTLfiv1FrHkAIHR5lXDATWzPRuF8hRvh5TyMRGKonXu8hDrA9LlLJrwLVyRgixk/+ovnn2ZhAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBQstMezHlP9GX7eD/qa5N2PgfgDdDAdBgNVHQ4EFgQULLTHsx5T/Rl+3g/6muTdj4H4A3QwDQYJKoZIhvcNAQELBQADggEBAAqCavqCVDnrCltPi+MQfhTg2onJ8m6jBjby6PN0MuSCRjGfNdJobZ4wDv6Dj4raFWlbaSXPMR4aFf//CIQjLaG37/TOJWcMBYVWQ8ZWQSwAoM3Crjj2Y0U9v/w1tRW278GXcWHd1LEJlQBVVNzNH6JphE1a9jLHrmXxlyBjF2tvfhbfsPYIslXxwHbgVTnpKyJDr9uLYmPEYW5HzK9hSYnHBnOBEhFIDtC2atvVL6ZOy8SAgc7A4Z7x+sQbbuSfVvqiZlTuHhvwx028veMmQtGKpzJrR+03tkbt1kFiJ5pmO1KZDm2gnYyisWn/L7eI6rbuwUcKFCOAYB/LlnvqKOg=","attributes":{"enabled":true,"nbf":1619646747,"exp":1651183347,"created":1619647347,"updated":1619647347,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/backupRestoreCertificateName-canrecoveradeletedcertificate-/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1619647292,"updated":1619647292}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/backupRestoreCertificateName-canrecoveradeletedcertificate-/pending"}}, [
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
  '8b87f34e-f23f-4a56-9ed8-7235e1644865',
  'x-ms-request-id',
  '72c31094-a217-4c50-81bb-dcd68cf74223',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:04:53 GMT',
  'Content-Length',
  '2862'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedcertificates/backupRestoreCertificateName-canrecoveradeletedcertificate-')
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
  'e835bbae-05f3-406e-abb1-68078f4cac84',
  'x-ms-request-id',
  'cecbbe21-3cb1-4bb1-a920-257fec12d2b7',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 22:04:53 GMT'
]);

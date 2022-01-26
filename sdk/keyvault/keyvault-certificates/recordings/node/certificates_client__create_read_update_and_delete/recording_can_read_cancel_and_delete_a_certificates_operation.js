let nock = require('nock');

module.exports.hash = "97931df48510b2b9037261d370f8dfef";

module.exports.testInfo = {"uniqueName":{"crudcertoperation":"crudcertoperation163217582585603322"},"newDate":{}}

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/certificates/crudcertoperation163217582585603322/create')
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
  'westus2',
  'x-ms-client-request-id',
  '3a423d9d-b2b6-490a-9660-9e5705d41939',
  'x-ms-request-id',
  '4d736683-48db-4c0a-a7e7-5c9fc8a1651a',
  'x-ms-keyvault-service-version',
  '1.9.79.2',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 20 Sep 2021 22:10:26 GMT'
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
  'a2ea8086-d757-4d4f-9f8b-1c11a4f86b00',
  'x-ms-ests-server',
  '2.1.12025.15 - NCUS ProdSlices',
  'Set-Cookie',
  'fpc=AtSSgjqs29NOiHgx9X1CxH8; expires=Wed, 20-Oct-2021 22:10:26 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrDpaXJXTyljgicR53KfVn_rwQ0w2fRjvOlQPeZl8hzMPAndzo-h_vxQh9NTcoZjtkg_mna4HwFL1nAOGRPzHKKNQnfBop_SLWspzEdE4E2W0BjzKSx0UgRYmJmlU_jzJudtzDXxd2fMyK_SEnxQThJfIX0r8BhBnNgSanrkZuHSsgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Mon, 20 Sep 2021 22:10:26 GMT',
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
  'abac040e-0c8a-42ae-98a1-19b8869f6b00',
  'x-ms-ests-server',
  '2.1.12071.7 - NCUS ProdSlices',
  'Set-Cookie',
  'fpc=Aktt_JgaUpBDrJbPoVUK1zU; expires=Wed, 20-Oct-2021 22:10:26 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrhxYqqKxsz_LGRlwgstv6uwvwEj6EDteKcEA2mb-9VaHQj49jY8ALFElfAfbxiUm9ehiSMrf5BcHwYxGLJeQMiM4y6hrdYHPzRfn4SwQCoHlmL6NLPdByCTlfph8yybf9IYyUw6z49Tzp6O9HJqix6dISLs381mVQOBOPtITE008gAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Mon, 20 Sep 2021 22:10:26 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/12345678-1234-1234-1234-123456789012/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.3.1&x-client-OS=linux&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=b22304b3-6bc2-4180-8264-883ee03e107f&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22CP1%22%5D%7D%7D%7D")
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
  '88defdb2-8005-44b7-b27b-a3d1b70db100',
  'x-ms-ests-server',
  '2.1.12071.7 - SCUS ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=AsrSLnNu6nJLkxryK4fkByqmCNGhAQAAANH92tgOAAAA; expires=Wed, 20-Oct-2021 22:10:26 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Mon, 20 Sep 2021 22:10:26 GMT',
  'Content-Length',
  '1315'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/certificates/crudcertoperation163217582585603322/create', {"policy":{"key_props":{},"secret_props":{},"x509_props":{"subject":"cn=MyCert","sans":{}},"issuer":{"name":"Self"},"attributes":{}},"attributes":{}})
  .query(true)
  .reply(202, {"id":"https://keyvault_name.vault.azure.net/certificates/crudcertoperation163217582585603322/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAsyKMqBkKG2iPqCcHDKn0bDTCq+oc0eRfFOa87ZJSEnoY4y4rY24SF/YfGg3xsb277bH9E6I9Ddd/hVVb1W90+AFmWTfjmO5085MZqMzvu22ZSMgs+HSmVfjF8IpBM87Jv9T+ldASoQVh1I4cLPi14IeMNx1jnTpeVresjgiOfEhr8mTG9smsrcK+EVvY4EEQ5id614BemSrY6HW6FVgbHhae76sLVjZkmUcD3hOOMX0ldUhyo4lQ5efX67v7PEGh/cwdpRYPgp9ilLsEeTz0+nVAEtKSaaHRC8Dmcqqf3ghHXTx70LXhz4eym/RDgpdeH85Q8GKttA9cb0j7uWJ1OQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAFQ3a8iRtaSoNOjTPA+eH8gkfjvvVy1BvTMyJ3AgQKgAJIG1IIN+npA4qZgZ1A92xXCJsKaYFm5gxvrsGiXkVDn5MFK0eUxEVmmT3zDpcF3EipadoZOcx5GNARd0s3tQmyILoWOokwE3JstuM689Hii1aOnjAM/3nY8A83bLrPp5CmFFlW1FCafm70ZqLeHt8Z4JeOcPmFlDIAVaB5Ie9yeZOySVejyU4Y8RN9E7Es+YwmY9j2G+zgm84tnoVKsNSExkX/SP8z1O+Es5WCnz0QrUdBmD9PglM1sHw3aj0rqKBp7Kb2hNcmLs7O5r2Vfyczi6ta5o3gNVHUSjvd4HAoc=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"b07519002560445299b63865c6e36c58"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://keyvault_name.vault.azure.net/certificates/crudcertoperation163217582585603322/pending?api-version=7.2&request_id=b07519002560445299b63865c6e36c58',
  'Retry-After',
  '0',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  '3a423d9d-b2b6-490a-9660-9e5705d41939',
  'x-ms-request-id',
  '0fd31cc6-b2d9-4c1d-8103-8cf2d4c7105e',
  'x-ms-keyvault-service-version',
  '1.9.79.2',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 20 Sep 2021 22:10:26 GMT',
  'Content-Length',
  '1302'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/crudcertoperation163217582585603322/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/crudcertoperation163217582585603322/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAsyKMqBkKG2iPqCcHDKn0bDTCq+oc0eRfFOa87ZJSEnoY4y4rY24SF/YfGg3xsb277bH9E6I9Ddd/hVVb1W90+AFmWTfjmO5085MZqMzvu22ZSMgs+HSmVfjF8IpBM87Jv9T+ldASoQVh1I4cLPi14IeMNx1jnTpeVresjgiOfEhr8mTG9smsrcK+EVvY4EEQ5id614BemSrY6HW6FVgbHhae76sLVjZkmUcD3hOOMX0ldUhyo4lQ5efX67v7PEGh/cwdpRYPgp9ilLsEeTz0+nVAEtKSaaHRC8Dmcqqf3ghHXTx70LXhz4eym/RDgpdeH85Q8GKttA9cb0j7uWJ1OQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAFQ3a8iRtaSoNOjTPA+eH8gkfjvvVy1BvTMyJ3AgQKgAJIG1IIN+npA4qZgZ1A92xXCJsKaYFm5gxvrsGiXkVDn5MFK0eUxEVmmT3zDpcF3EipadoZOcx5GNARd0s3tQmyILoWOokwE3JstuM689Hii1aOnjAM/3nY8A83bLrPp5CmFFlW1FCafm70ZqLeHt8Z4JeOcPmFlDIAVaB5Ie9yeZOySVejyU4Y8RN9E7Es+YwmY9j2G+zgm84tnoVKsNSExkX/SP8z1O+Es5WCnz0QrUdBmD9PglM1sHw3aj0rqKBp7Kb2hNcmLs7O5r2Vfyczi6ta5o3gNVHUSjvd4HAoc=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"b07519002560445299b63865c6e36c58"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Retry-After',
  '0',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  'fe2a47e5-ce8e-4b73-9a9f-13d0b291f50a',
  'x-ms-request-id',
  'ce7dfc86-49db-464c-8a07-3674445953bf',
  'x-ms-keyvault-service-version',
  '1.9.79.2',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 20 Sep 2021 22:10:26 GMT',
  'Content-Length',
  '1302'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/crudcertoperation163217582585603322/')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/crudcertoperation163217582585603322/7b6db81563e048a395d93aab7de5d155","attributes":{"enabled":false,"nbf":1632175226,"exp":1663711826,"created":1632175826,"updated":1632175826,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/crudcertoperation163217582585603322/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1632175827,"updated":1632175827}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/crudcertoperation163217582585603322/pending"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  '86c12dec-d880-40b8-8464-282f4166e1fd',
  'x-ms-request-id',
  '0365969d-24fb-4626-9063-c1ff45bd4f03',
  'x-ms-keyvault-service-version',
  '1.9.79.2',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 20 Sep 2021 22:10:26 GMT',
  'Content-Length',
  '1046'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/crudcertoperation163217582585603322/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/crudcertoperation163217582585603322/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAsyKMqBkKG2iPqCcHDKn0bDTCq+oc0eRfFOa87ZJSEnoY4y4rY24SF/YfGg3xsb277bH9E6I9Ddd/hVVb1W90+AFmWTfjmO5085MZqMzvu22ZSMgs+HSmVfjF8IpBM87Jv9T+ldASoQVh1I4cLPi14IeMNx1jnTpeVresjgiOfEhr8mTG9smsrcK+EVvY4EEQ5id614BemSrY6HW6FVgbHhae76sLVjZkmUcD3hOOMX0ldUhyo4lQ5efX67v7PEGh/cwdpRYPgp9ilLsEeTz0+nVAEtKSaaHRC8Dmcqqf3ghHXTx70LXhz4eym/RDgpdeH85Q8GKttA9cb0j7uWJ1OQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAFQ3a8iRtaSoNOjTPA+eH8gkfjvvVy1BvTMyJ3AgQKgAJIG1IIN+npA4qZgZ1A92xXCJsKaYFm5gxvrsGiXkVDn5MFK0eUxEVmmT3zDpcF3EipadoZOcx5GNARd0s3tQmyILoWOokwE3JstuM689Hii1aOnjAM/3nY8A83bLrPp5CmFFlW1FCafm70ZqLeHt8Z4JeOcPmFlDIAVaB5Ie9yeZOySVejyU4Y8RN9E7Es+YwmY9j2G+zgm84tnoVKsNSExkX/SP8z1O+Es5WCnz0QrUdBmD9PglM1sHw3aj0rqKBp7Kb2hNcmLs7O5r2Vfyczi6ta5o3gNVHUSjvd4HAoc=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"b07519002560445299b63865c6e36c58"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Retry-After',
  '0',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  'f09f87e4-e31f-49c7-9347-0b3bf6c1f16c',
  'x-ms-request-id',
  '23af398f-1dac-4a62-a1c9-4814acb0aceb',
  'x-ms-keyvault-service-version',
  '1.9.79.2',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 20 Sep 2021 22:10:27 GMT',
  'Content-Length',
  '1302'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .patch('/certificates/crudcertoperation163217582585603322/pending', {"cancellation_requested":true})
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/crudcertoperation163217582585603322/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAsyKMqBkKG2iPqCcHDKn0bDTCq+oc0eRfFOa87ZJSEnoY4y4rY24SF/YfGg3xsb277bH9E6I9Ddd/hVVb1W90+AFmWTfjmO5085MZqMzvu22ZSMgs+HSmVfjF8IpBM87Jv9T+ldASoQVh1I4cLPi14IeMNx1jnTpeVresjgiOfEhr8mTG9smsrcK+EVvY4EEQ5id614BemSrY6HW6FVgbHhae76sLVjZkmUcD3hOOMX0ldUhyo4lQ5efX67v7PEGh/cwdpRYPgp9ilLsEeTz0+nVAEtKSaaHRC8Dmcqqf3ghHXTx70LXhz4eym/RDgpdeH85Q8GKttA9cb0j7uWJ1OQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAFQ3a8iRtaSoNOjTPA+eH8gkfjvvVy1BvTMyJ3AgQKgAJIG1IIN+npA4qZgZ1A92xXCJsKaYFm5gxvrsGiXkVDn5MFK0eUxEVmmT3zDpcF3EipadoZOcx5GNARd0s3tQmyILoWOokwE3JstuM689Hii1aOnjAM/3nY8A83bLrPp5CmFFlW1FCafm70ZqLeHt8Z4JeOcPmFlDIAVaB5Ie9yeZOySVejyU4Y8RN9E7Es+YwmY9j2G+zgm84tnoVKsNSExkX/SP8z1O+Es5WCnz0QrUdBmD9PglM1sHw3aj0rqKBp7Kb2hNcmLs7O5r2Vfyczi6ta5o3gNVHUSjvd4HAoc=","cancellation_requested":true,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"b07519002560445299b63865c6e36c58"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  'd9f62039-d151-46b8-9519-483491c0f789',
  'x-ms-request-id',
  '079b42c4-7850-489b-bbae-3a5ddb7384f9',
  'x-ms-keyvault-service-version',
  '1.9.79.2',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 20 Sep 2021 22:10:27 GMT',
  'Content-Length',
  '1301'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/certificates/crudcertoperation163217582585603322/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/crudcertoperation163217582585603322/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAsyKMqBkKG2iPqCcHDKn0bDTCq+oc0eRfFOa87ZJSEnoY4y4rY24SF/YfGg3xsb277bH9E6I9Ddd/hVVb1W90+AFmWTfjmO5085MZqMzvu22ZSMgs+HSmVfjF8IpBM87Jv9T+ldASoQVh1I4cLPi14IeMNx1jnTpeVresjgiOfEhr8mTG9smsrcK+EVvY4EEQ5id614BemSrY6HW6FVgbHhae76sLVjZkmUcD3hOOMX0ldUhyo4lQ5efX67v7PEGh/cwdpRYPgp9ilLsEeTz0+nVAEtKSaaHRC8Dmcqqf3ghHXTx70LXhz4eym/RDgpdeH85Q8GKttA9cb0j7uWJ1OQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAFQ3a8iRtaSoNOjTPA+eH8gkfjvvVy1BvTMyJ3AgQKgAJIG1IIN+npA4qZgZ1A92xXCJsKaYFm5gxvrsGiXkVDn5MFK0eUxEVmmT3zDpcF3EipadoZOcx5GNARd0s3tQmyILoWOokwE3JstuM689Hii1aOnjAM/3nY8A83bLrPp5CmFFlW1FCafm70ZqLeHt8Z4JeOcPmFlDIAVaB5Ie9yeZOySVejyU4Y8RN9E7Es+YwmY9j2G+zgm84tnoVKsNSExkX/SP8z1O+Es5WCnz0QrUdBmD9PglM1sHw3aj0rqKBp7Kb2hNcmLs7O5r2Vfyczi6ta5o3gNVHUSjvd4HAoc=","cancellation_requested":true,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"b07519002560445299b63865c6e36c58"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  '89cdb365-d1f9-491c-9273-28af64ea08a6',
  'x-ms-request-id',
  '75db12df-9f31-4783-98f9-a8b6698a5319',
  'x-ms-keyvault-service-version',
  '1.9.79.2',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 20 Sep 2021 22:10:27 GMT',
  'Content-Length',
  '1301'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/crudcertoperation163217582585603322/')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/crudcertoperation163217582585603322/7b6db81563e048a395d93aab7de5d155","attributes":{"enabled":false,"nbf":1632175226,"exp":1663711826,"created":1632175826,"updated":1632175826,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/crudcertoperation163217582585603322/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1632175827,"updated":1632175827}}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  '28a10ac5-2598-4586-90ec-4551ff1ee7a6',
  'x-ms-request-id',
  'eca137f0-008e-4470-97da-6edd39bae983',
  'x-ms-keyvault-service-version',
  '1.9.79.2',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 20 Sep 2021 22:10:27 GMT',
  'Content-Length',
  '936'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/crudcertoperation163217582585603322/pending')
  .query(true)
  .reply(404, {"error":{"code":"PendingCertificateNotFound","message":"Pending certificate not found: crudcertoperation163217582585603322"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '126',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  '23c0460a-3245-431b-a5af-4e5d0769464e',
  'x-ms-request-id',
  '56e7e288-1995-435c-9dc4-f4c5aafe706a',
  'x-ms-keyvault-service-version',
  '1.9.79.2',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 20 Sep 2021 22:10:27 GMT'
]);

let nock = require('nock');

module.exports.hash = "db72d498f2fa1b5cf7ee42cd5051bdda";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/certificates/CRUDCertificateName-cangetacertificatessecretinPKCS12format-/create')
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
  'a3f04b93-6cd3-4e79-a2b9-b735797ad7d2',
  'x-ms-request-id',
  '85b77ab3-7b4b-4bdc-92c7-d6843a47eaff',
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
  'Mon, 13 Sep 2021 19:24:06 GMT'
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
  'db2722c7-8726-46c9-91eb-dbe25401ab00',
  'x-ms-ests-server',
  '2.1.12025.15 - EUS ProdSlices',
  'Set-Cookie',
  'fpc=ArVkcfPYwwdGo-iRjuhRkhs; expires=Wed, 13-Oct-2021 19:24:06 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrsQv5Om2wkxwUpr0v9ttIJlZgx_0DWgw8yNRMu8L8YmaBuSfFYR01pOK1CPtw-O6zyxXy45B7Ctf3eFHILtU5Lt33pFSk4lkSQDQDqZpqZiDACWOcXCnIYluHRqCgGT2aV2EPG0rekTmK90liGSJrui9L5bFuXTCZtpPVBz7en5UgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Mon, 13 Sep 2021 19:24:06 GMT',
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
  '0369644f-ec75-407a-a2c7-b1916c98ed00',
  'x-ms-ests-server',
  '2.1.12025.15 - WUS2 ProdSlices',
  'Set-Cookie',
  'fpc=AofMcwWrK_lIlbcxGs_enP4; expires=Wed, 13-Oct-2021 19:24:07 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevriCvcGHbJGrVBKoowRJK63d49p2NU79WmAFymF2_umo5lszoNaeMWjkG8DARv58WUJTWb7ky7hd3aoqJZIFI0r0saIp98suBEN9apn6rmnL-9DWO0WnT7yrSEqIUXU2dFAR0vWkYd7enpbmyf2nMPYFEc1jaFuD2WsunlZeI9BFggAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Mon, 13 Sep 2021 19:24:06 GMT'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/12345678-1234-1234-1234-123456789012/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.3.0&x-client-OS=linux&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=5f3f5081-e3cf-457e-abc0-88ff3a452d79&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22CP1%22%5D%7D%7D%7D")
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
  '76bce4ab-91af-4968-a0b9-10dd6028da00',
  'x-ms-ests-server',
  '2.1.12025.15 - NCUS ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=AlWNJR6ipKVNlbD8tUScemIbdhqxAQAAAFac0dgOAAAA; expires=Wed, 13-Oct-2021 19:24:07 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Mon, 13 Sep 2021 19:24:07 GMT',
  'Content-Length',
  '1315'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/certificates/CRUDCertificateName-cangetacertificatessecretinPKCS12format-/create', {"policy":{"key_props":{},"secret_props":{},"x509_props":{"subject":"cn=MyCert","sans":{}},"issuer":{"name":"Self"},"attributes":{}},"attributes":{}})
  .query(true)
  .reply(202, {"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-cangetacertificatessecretinPKCS12format-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAzWsCezdEvXotL/bh7bVXGZsmHwCUfw2GpP9P+UeGyn2+lO8tqWxxBQDVWDjWX9WkPNt0pSfgzvbTE171aifJa9QhG/NjnD/13PtkCBg/tTn9NQ4+NowtbccG7CMCx7lzIOQD1ESkn49HdfeQfLUkOBrrLukupa+4uvQpQ5BmqdubsDrdr8KeOSIgud/fl9v5D4cz11e/A1kRdFKL1BpaqL6bMuyPbsTaeCpzCf/hW339zaFmL0y6W1uSH7dLGhND/yuwGYGrnNUxQHXFBbN3iPC1yK45F4zWyKJp+jm13ItZ/cnu/F2d0NB46ZIijmDChgYZmIIClXwIkSrmUtZiVQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAAPcOvxSwVUa5SWtreiExM0LUQdHgXq2WW4vAP3r5RpEw5mDZ95wMQIlLdHYup8BIQ996v+IrcoDrMPjiGh1c/HklXNe242qMBQuKRXkMLk44q2lk+vA7ayvH3VpNgTdc72VqhBhWN2QOtkNXI+EoOPeJpM2JqeLDkDF4shCSnAbmWJnVIhcMBmkSXhmcnGtpuX5YZDmNSrmLZo/nfBh3tc4bWZIhqDcijGIn/oMNEVCyMHf3KDPnEliX1j64sYpkGQk8JpjiXM1p8gi1JPRNixhr4afWnPXdU5XB57BOkmraGyVn2nLCJLjGQFRYHSyPhUls+2BS8hdIWyqFdhrr00=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"431d6ebaa1c94256973a3c37ba69c4fc"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-cangetacertificatessecretinPKCS12format-/pending?api-version=7.2&request_id=431d6ebaa1c94256973a3c37ba69c4fc',
  'Retry-After',
  '10',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'a3f04b93-6cd3-4e79-a2b9-b735797ad7d2',
  'x-ms-request-id',
  '2f5fc1da-9467-48d3-af84-f6ac16d3ef26',
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
  'Mon, 13 Sep 2021 19:24:07 GMT',
  'Content-Length',
  '1344'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/CRUDCertificateName-cangetacertificatessecretinPKCS12format-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-cangetacertificatessecretinPKCS12format-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAzWsCezdEvXotL/bh7bVXGZsmHwCUfw2GpP9P+UeGyn2+lO8tqWxxBQDVWDjWX9WkPNt0pSfgzvbTE171aifJa9QhG/NjnD/13PtkCBg/tTn9NQ4+NowtbccG7CMCx7lzIOQD1ESkn49HdfeQfLUkOBrrLukupa+4uvQpQ5BmqdubsDrdr8KeOSIgud/fl9v5D4cz11e/A1kRdFKL1BpaqL6bMuyPbsTaeCpzCf/hW339zaFmL0y6W1uSH7dLGhND/yuwGYGrnNUxQHXFBbN3iPC1yK45F4zWyKJp+jm13ItZ/cnu/F2d0NB46ZIijmDChgYZmIIClXwIkSrmUtZiVQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAAPcOvxSwVUa5SWtreiExM0LUQdHgXq2WW4vAP3r5RpEw5mDZ95wMQIlLdHYup8BIQ996v+IrcoDrMPjiGh1c/HklXNe242qMBQuKRXkMLk44q2lk+vA7ayvH3VpNgTdc72VqhBhWN2QOtkNXI+EoOPeJpM2JqeLDkDF4shCSnAbmWJnVIhcMBmkSXhmcnGtpuX5YZDmNSrmLZo/nfBh3tc4bWZIhqDcijGIn/oMNEVCyMHf3KDPnEliX1j64sYpkGQk8JpjiXM1p8gi1JPRNixhr4afWnPXdU5XB57BOkmraGyVn2nLCJLjGQFRYHSyPhUls+2BS8hdIWyqFdhrr00=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"431d6ebaa1c94256973a3c37ba69c4fc"}, [
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
  'f9a2c874-a083-4963-a856-d82ce6e3b229',
  'x-ms-request-id',
  'd421b3be-9b6e-42c6-9268-51ec3e1472a9',
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
  'Mon, 13 Sep 2021 19:24:07 GMT',
  'Content-Length',
  '1344'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/CRUDCertificateName-cangetacertificatessecretinPKCS12format-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-cangetacertificatessecretinPKCS12format-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAzWsCezdEvXotL/bh7bVXGZsmHwCUfw2GpP9P+UeGyn2+lO8tqWxxBQDVWDjWX9WkPNt0pSfgzvbTE171aifJa9QhG/NjnD/13PtkCBg/tTn9NQ4+NowtbccG7CMCx7lzIOQD1ESkn49HdfeQfLUkOBrrLukupa+4uvQpQ5BmqdubsDrdr8KeOSIgud/fl9v5D4cz11e/A1kRdFKL1BpaqL6bMuyPbsTaeCpzCf/hW339zaFmL0y6W1uSH7dLGhND/yuwGYGrnNUxQHXFBbN3iPC1yK45F4zWyKJp+jm13ItZ/cnu/F2d0NB46ZIijmDChgYZmIIClXwIkSrmUtZiVQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAAPcOvxSwVUa5SWtreiExM0LUQdHgXq2WW4vAP3r5RpEw5mDZ95wMQIlLdHYup8BIQ996v+IrcoDrMPjiGh1c/HklXNe242qMBQuKRXkMLk44q2lk+vA7ayvH3VpNgTdc72VqhBhWN2QOtkNXI+EoOPeJpM2JqeLDkDF4shCSnAbmWJnVIhcMBmkSXhmcnGtpuX5YZDmNSrmLZo/nfBh3tc4bWZIhqDcijGIn/oMNEVCyMHf3KDPnEliX1j64sYpkGQk8JpjiXM1p8gi1JPRNixhr4afWnPXdU5XB57BOkmraGyVn2nLCJLjGQFRYHSyPhUls+2BS8hdIWyqFdhrr00=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"431d6ebaa1c94256973a3c37ba69c4fc"}, [
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
  '7d859bb0-c3e9-4a8d-933a-97ca8f4e293a',
  'x-ms-request-id',
  '045ae852-cd35-4544-8876-950aae416b06',
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
  'Mon, 13 Sep 2021 19:24:07 GMT',
  'Content-Length',
  '1344'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/CRUDCertificateName-cangetacertificatessecretinPKCS12format-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-cangetacertificatessecretinPKCS12format-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAzWsCezdEvXotL/bh7bVXGZsmHwCUfw2GpP9P+UeGyn2+lO8tqWxxBQDVWDjWX9WkPNt0pSfgzvbTE171aifJa9QhG/NjnD/13PtkCBg/tTn9NQ4+NowtbccG7CMCx7lzIOQD1ESkn49HdfeQfLUkOBrrLukupa+4uvQpQ5BmqdubsDrdr8KeOSIgud/fl9v5D4cz11e/A1kRdFKL1BpaqL6bMuyPbsTaeCpzCf/hW339zaFmL0y6W1uSH7dLGhND/yuwGYGrnNUxQHXFBbN3iPC1yK45F4zWyKJp+jm13ItZ/cnu/F2d0NB46ZIijmDChgYZmIIClXwIkSrmUtZiVQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAAPcOvxSwVUa5SWtreiExM0LUQdHgXq2WW4vAP3r5RpEw5mDZ95wMQIlLdHYup8BIQ996v+IrcoDrMPjiGh1c/HklXNe242qMBQuKRXkMLk44q2lk+vA7ayvH3VpNgTdc72VqhBhWN2QOtkNXI+EoOPeJpM2JqeLDkDF4shCSnAbmWJnVIhcMBmkSXhmcnGtpuX5YZDmNSrmLZo/nfBh3tc4bWZIhqDcijGIn/oMNEVCyMHf3KDPnEliX1j64sYpkGQk8JpjiXM1p8gi1JPRNixhr4afWnPXdU5XB57BOkmraGyVn2nLCJLjGQFRYHSyPhUls+2BS8hdIWyqFdhrr00=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"431d6ebaa1c94256973a3c37ba69c4fc"}, [
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
  '5eacaf3e-91cb-42de-a8db-2e173150b0a9',
  'x-ms-request-id',
  '3da92358-1cac-4ff3-ba5f-a4bd552a0783',
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
  'Mon, 13 Sep 2021 19:24:09 GMT',
  'Content-Length',
  '1344'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/CRUDCertificateName-cangetacertificatessecretinPKCS12format-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-cangetacertificatessecretinPKCS12format-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAzWsCezdEvXotL/bh7bVXGZsmHwCUfw2GpP9P+UeGyn2+lO8tqWxxBQDVWDjWX9WkPNt0pSfgzvbTE171aifJa9QhG/NjnD/13PtkCBg/tTn9NQ4+NowtbccG7CMCx7lzIOQD1ESkn49HdfeQfLUkOBrrLukupa+4uvQpQ5BmqdubsDrdr8KeOSIgud/fl9v5D4cz11e/A1kRdFKL1BpaqL6bMuyPbsTaeCpzCf/hW339zaFmL0y6W1uSH7dLGhND/yuwGYGrnNUxQHXFBbN3iPC1yK45F4zWyKJp+jm13ItZ/cnu/F2d0NB46ZIijmDChgYZmIIClXwIkSrmUtZiVQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAAPcOvxSwVUa5SWtreiExM0LUQdHgXq2WW4vAP3r5RpEw5mDZ95wMQIlLdHYup8BIQ996v+IrcoDrMPjiGh1c/HklXNe242qMBQuKRXkMLk44q2lk+vA7ayvH3VpNgTdc72VqhBhWN2QOtkNXI+EoOPeJpM2JqeLDkDF4shCSnAbmWJnVIhcMBmkSXhmcnGtpuX5YZDmNSrmLZo/nfBh3tc4bWZIhqDcijGIn/oMNEVCyMHf3KDPnEliX1j64sYpkGQk8JpjiXM1p8gi1JPRNixhr4afWnPXdU5XB57BOkmraGyVn2nLCJLjGQFRYHSyPhUls+2BS8hdIWyqFdhrr00=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"431d6ebaa1c94256973a3c37ba69c4fc"}, [
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
  '73d4bed6-534d-4e07-a1e0-e4f57964bbd7',
  'x-ms-request-id',
  'cc984ce6-1ff0-439b-8c33-76e4f35a8854',
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
  'Mon, 13 Sep 2021 19:24:11 GMT',
  'Content-Length',
  '1344'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/CRUDCertificateName-cangetacertificatessecretinPKCS12format-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-cangetacertificatessecretinPKCS12format-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAzWsCezdEvXotL/bh7bVXGZsmHwCUfw2GpP9P+UeGyn2+lO8tqWxxBQDVWDjWX9WkPNt0pSfgzvbTE171aifJa9QhG/NjnD/13PtkCBg/tTn9NQ4+NowtbccG7CMCx7lzIOQD1ESkn49HdfeQfLUkOBrrLukupa+4uvQpQ5BmqdubsDrdr8KeOSIgud/fl9v5D4cz11e/A1kRdFKL1BpaqL6bMuyPbsTaeCpzCf/hW339zaFmL0y6W1uSH7dLGhND/yuwGYGrnNUxQHXFBbN3iPC1yK45F4zWyKJp+jm13ItZ/cnu/F2d0NB46ZIijmDChgYZmIIClXwIkSrmUtZiVQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAAPcOvxSwVUa5SWtreiExM0LUQdHgXq2WW4vAP3r5RpEw5mDZ95wMQIlLdHYup8BIQ996v+IrcoDrMPjiGh1c/HklXNe242qMBQuKRXkMLk44q2lk+vA7ayvH3VpNgTdc72VqhBhWN2QOtkNXI+EoOPeJpM2JqeLDkDF4shCSnAbmWJnVIhcMBmkSXhmcnGtpuX5YZDmNSrmLZo/nfBh3tc4bWZIhqDcijGIn/oMNEVCyMHf3KDPnEliX1j64sYpkGQk8JpjiXM1p8gi1JPRNixhr4afWnPXdU5XB57BOkmraGyVn2nLCJLjGQFRYHSyPhUls+2BS8hdIWyqFdhrr00=","cancellation_requested":false,"status":"completed","target":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-cangetacertificatessecretinPKCS12format-","request_id":"431d6ebaa1c94256973a3c37ba69c4fc"}, [
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
  '2ef6a62e-a1d7-449a-a707-918baac711ea',
  'x-ms-request-id',
  '3b58cf65-d1e3-421a-8991-fb09bdb58b5e',
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
  'Mon, 13 Sep 2021 19:24:14 GMT',
  'Content-Length',
  '1315'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/CRUDCertificateName-cangetacertificatessecretinPKCS12format-/')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-cangetacertificatessecretinPKCS12format-/08be22f5f85a42809d2df03cef6908c4","kid":"https://keyvault_name.vault.azure.net/keys/CRUDCertificateName-cangetacertificatessecretinPKCS12format-/08be22f5f85a42809d2df03cef6908c4","sid":"https://keyvault_name.vault.azure.net/secrets/CRUDCertificateName-cangetacertificatessecretinPKCS12format-/08be22f5f85a42809d2df03cef6908c4","x5t":"X3amtD34PDzLVN1yklsoLfi-Qko","cer":"MIIDKDCCAhCgAwIBAgIQMho6bL15SUqGQASiCrInLzANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjEwOTEzMTkxNDEzWhcNMjIwOTEzMTkyNDEzWjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQDNawJ7N0S9ei0v9uHttVcZmyYfAJR/DYak/0/5R4bKfb6U7y2pbHEFANVYONZf1aQ823SlJ+DO9tMTXvVqJ8lr1CEb82OcP/Xc+2QIGD+1Of01Dj42jC1txwbsIwLHuXMg5APURKSfj0d195B8tSQ4Gusu6S6lr7i69ClDkGap25uwOt2vwp45IiC539+X2/kPhzPXV78DWRF0UovUGlqovpsy7I9uxNp4KnMJ/+Fbff3NoWYvTLpbW5Ift0saE0P/K7AZgauc1TFAdcUFs3eI8LXIrjkXjNbIomn6ObXci1n9ye78XZ3Q0HjpkiKOYMKGBhmYggKVfAiRKuZS1mJVAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBTLKmvL26Mf1GXCSlnMKtGfg0D5rjAdBgNVHQ4EFgQUyypry9ujH9RlwkpZzCrRn4NA+a4wDQYJKoZIhvcNAQELBQADggEBAImEgqO1CZK+EXeq3KEBXVKRxKa2mx2Q7aC941hxrzI/c1MAV0Yf+QWtwX3g3UvEkcxsyZMyLiYmMkO9RqEtZP9nNa1YZpcl/Ab0yOKMllxxs1hcMAk+BROKGpJArmOXaxnjzR/nicsOMXptuu5JuBVW4MBPLlCyIr+FDbgeF91a2skjwdnpcaaJp6O1T7Jlj8xeIOINlOx2GYE8/BmUg85Mz88rDOe3cIc25N3aPdNBUL1c5lquq5cX4UHFEaE252g3182PsIGt6jF0flEF6Ah1RruiC4mys84usT6dRz9raushCRUCnLm6oYi2Yrn6A/PGjMfIlf5ndshf7SXu89U=","attributes":{"enabled":true,"nbf":1631560453,"exp":1663097053,"created":1631561053,"updated":1631561053,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-cangetacertificatessecretinPKCS12format-/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1631561047,"updated":1631561047}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-cangetacertificatessecretinPKCS12format-/pending"}}, [
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
  '30e8e567-5d95-480f-acb4-64c267a06fcf',
  'x-ms-request-id',
  'be0db606-e3b4-4255-8bd8-622420e18d72',
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
  'Mon, 13 Sep 2021 19:24:14 GMT',
  'Content-Length',
  '2610'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/CRUDCertificateName-cangetacertificatessecretinPKCS12format-/')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-cangetacertificatessecretinPKCS12format-/08be22f5f85a42809d2df03cef6908c4","kid":"https://keyvault_name.vault.azure.net/keys/CRUDCertificateName-cangetacertificatessecretinPKCS12format-/08be22f5f85a42809d2df03cef6908c4","sid":"https://keyvault_name.vault.azure.net/secrets/CRUDCertificateName-cangetacertificatessecretinPKCS12format-/08be22f5f85a42809d2df03cef6908c4","x5t":"X3amtD34PDzLVN1yklsoLfi-Qko","cer":"MIIDKDCCAhCgAwIBAgIQMho6bL15SUqGQASiCrInLzANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjEwOTEzMTkxNDEzWhcNMjIwOTEzMTkyNDEzWjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQDNawJ7N0S9ei0v9uHttVcZmyYfAJR/DYak/0/5R4bKfb6U7y2pbHEFANVYONZf1aQ823SlJ+DO9tMTXvVqJ8lr1CEb82OcP/Xc+2QIGD+1Of01Dj42jC1txwbsIwLHuXMg5APURKSfj0d195B8tSQ4Gusu6S6lr7i69ClDkGap25uwOt2vwp45IiC539+X2/kPhzPXV78DWRF0UovUGlqovpsy7I9uxNp4KnMJ/+Fbff3NoWYvTLpbW5Ift0saE0P/K7AZgauc1TFAdcUFs3eI8LXIrjkXjNbIomn6ObXci1n9ye78XZ3Q0HjpkiKOYMKGBhmYggKVfAiRKuZS1mJVAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBTLKmvL26Mf1GXCSlnMKtGfg0D5rjAdBgNVHQ4EFgQUyypry9ujH9RlwkpZzCrRn4NA+a4wDQYJKoZIhvcNAQELBQADggEBAImEgqO1CZK+EXeq3KEBXVKRxKa2mx2Q7aC941hxrzI/c1MAV0Yf+QWtwX3g3UvEkcxsyZMyLiYmMkO9RqEtZP9nNa1YZpcl/Ab0yOKMllxxs1hcMAk+BROKGpJArmOXaxnjzR/nicsOMXptuu5JuBVW4MBPLlCyIr+FDbgeF91a2skjwdnpcaaJp6O1T7Jlj8xeIOINlOx2GYE8/BmUg85Mz88rDOe3cIc25N3aPdNBUL1c5lquq5cX4UHFEaE252g3182PsIGt6jF0flEF6Ah1RruiC4mys84usT6dRz9raushCRUCnLm6oYi2Yrn6A/PGjMfIlf5ndshf7SXu89U=","attributes":{"enabled":true,"nbf":1631560453,"exp":1663097053,"created":1631561053,"updated":1631561053,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-cangetacertificatessecretinPKCS12format-/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1631561047,"updated":1631561047}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-cangetacertificatessecretinPKCS12format-/pending"}}, [
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
  'b3493392-42ea-4dee-9b00-70000097fc3d',
  'x-ms-request-id',
  'c09e8a8b-dfeb-4888-8020-7aa8e4a473a2',
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
  'Mon, 13 Sep 2021 19:24:14 GMT',
  'Content-Length',
  '2610'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/secrets/CRUDCertificateName-cangetacertificatessecretinPKCS12format-/')
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
  'f1142a05-e65c-4141-8f34-6a6663fa6715',
  'x-ms-request-id',
  '003ad8f5-e6ea-4ccd-9561-b9b46d5387d2',
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

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/secrets/CRUDCertificateName-cangetacertificatessecretinPKCS12format-/')
  .query(true)
  .reply(200, {"value":"YmFzZTY0X3BsYWNlaG9sZGVy","contentType":"application/x-pkcs12","id":"https://keyvault_name.vault.azure.net/secrets/CRUDCertificateName-cangetacertificatessecretinPKCS12format-/08be22f5f85a42809d2df03cef6908c4","managed":true,"attributes":{"enabled":true,"nbf":1631560453,"exp":1663097053,"created":1631561053,"updated":1631561053,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90},"kid":"https://keyvault_name.vault.azure.net/keys/CRUDCertificateName-cangetacertificatessecretinPKCS12format-/08be22f5f85a42809d2df03cef6908c4"}, [
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
  'f1142a05-e65c-4141-8f34-6a6663fa6715',
  'x-ms-request-id',
  '90a4ea43-801e-454e-aa33-a1b4b0c4e978',
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
  'Mon, 13 Sep 2021 19:24:14 GMT',
  'Content-Length',
  '4045'
]);

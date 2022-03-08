let nock = require('nock');

module.exports.hash = "6ae18b34d8710190b92a646a1d3760a3";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/certificates/CRUDCertificateName-cangetacertificatessecretinPEMformat-/create')
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
  '3e78bcea-3ee7-4bb9-b73d-31f71cb69d8c',
  'x-ms-request-id',
  'e746f0a4-5047-4cc9-a17f-c86f87aeb21f',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:29:20 GMT'
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
  '89d99e8e-8fb3-47b4-9f8d-18e085604a00',
  'x-ms-ests-server',
  '2.1.11654.16 - WUS2 ProdSlices',
  'Set-Cookie',
  'fpc=ApDQRp_1bOJGvyZBmEPP0xDmR1YbAQAAAKy7G9gOAAAA; expires=Fri, 28-May-2021 20:29:20 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrYu0_0RAhbTUG8kyrjW0Waj1Scxim1qzLzwwpNOqnLKgFTh7OGkeWqmpEPFSVYp8switwqFE-Do_maTMY0fdf_r8LGBFhRmdaoYTPylbtPzI5uaMHJu6UIbHlQJXKcBafgCxKbV15MvU2e1v0bK-wql6kKGps3JpDXwt560acAw0gAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 28 Apr 2021 20:29:19 GMT'
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
  '4d731feb-cc14-459b-8810-d65cec910d01',
  'x-ms-ests-server',
  '2.1.11654.16 - EUS ProdSlices',
  'Set-Cookie',
  'fpc=ApDQRp_1bOJGvyZBmEPP0xDmR1YbAQAAAKy7G9gOAAAA; expires=Fri, 28-May-2021 20:29:20 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrR-kcXWIEP6zNm-BmHw8KU5N7fxkfVORCQ92ZwucQbYjPAYPUJ6OsYXqiukx01p8DXWi8h_600YYYhJUsn6P9KR5e0tY-5wqs5JbX2ibj3Oa5FAEFEPlr8J02vkWO7oLmvuzyP4izaS9ul_kBjlKfrqOVWRoKfdPoee6bejCs_HUgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 28 Apr 2021 20:29:19 GMT'
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
  '64fd1052-6375-4f05-8dba-d8a53ee8fe00',
  'x-ms-ests-server',
  '2.1.11654.16 - EUS ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=ApDQRp_1bOJGvyZBmEPP0xDmR1YbAgAAAKy7G9gOAAAA; expires=Fri, 28-May-2021 20:29:20 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 28 Apr 2021 20:29:19 GMT',
  'Content-Length',
  '1313'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/certificates/CRUDCertificateName-cangetacertificatessecretinPEMformat-/create', {"policy":{"key_props":{},"secret_props":{"contentType":"application/x-pem-file"},"x509_props":{"subject":"cn=MyCert","sans":{}},"issuer":{"name":"Self"},"attributes":{}},"attributes":{}})
  .query(true)
  .reply(202, {"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-cangetacertificatessecretinPEMformat-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA032N3u+5ELjo1OWyWq69iC5A/n+IuqdiERWj6ApcNFp3rSoG6o9TDZPLJq/4U6BX+nEyByVPCm8MV/NH29V9RaiCvxlXEfWNBPJlLomkBDZwAWrqNoU+gHvdxAPxXlT2SyDNClBQ2colLCvMRuHH/S8oSkxO+toIht7t6gqTF0NRMvXrpmww3Pu0NiR11I3mbJ4FAmx7i05lR7W1V5nFftGT0ogmrOF2x/SLz6jN0R/cinLNYqr3KjWcQ1/0MoDDlar6c8TH7NnZ00a9p2ohagCVi55j7xIAZztf80sYvgCpTk/rMxuQllhn0gYWPF9dbkcZDx1gbhHXp7SCtvxKiQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAFc2BYkLgzhu9biVI5bGSKa9LWUJYhvqERg6QGL00XV3IBi0H5tE6LUxLwWtgD871Js+ZD/7mUDuYJ4IJpWr1/fYRaUBMPZc/00Kgo48URrxd3Z6rXr+4/BlyjjwJoUstr+Gtiwm8Lqzt+XDtI1VAnzd1kz0ez11QOEApjquER9Khu7gGGaFgkrscspjP84PQ2oq4AzvlV5KaVtVWG69g2QPCnLhWZoXthplBWQujCceLNO02CJTK1zgqTvikQE7pTB5omtH5MnfWoVQ5EEyowYaxUhehBHfD5LC0llHNs7vWx1NShC1S72CTcOqMoaQkRr3Vt+HgSd3Sjf1Ys5ORKo=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"56601cb13429492195a6ae8407d0b2db"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-cangetacertificatessecretinPEMformat-/pending?api-version=7.2&request_id=56601cb13429492195a6ae8407d0b2db',
  'Retry-After',
  '0',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '3e78bcea-3ee7-4bb9-b73d-31f71cb69d8c',
  'x-ms-request-id',
  '945c4f4d-5af1-48d6-8f68-c9bf264b82f1',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:29:21 GMT',
  'Content-Length',
  '1350'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/CRUDCertificateName-cangetacertificatessecretinPEMformat-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-cangetacertificatessecretinPEMformat-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA032N3u+5ELjo1OWyWq69iC5A/n+IuqdiERWj6ApcNFp3rSoG6o9TDZPLJq/4U6BX+nEyByVPCm8MV/NH29V9RaiCvxlXEfWNBPJlLomkBDZwAWrqNoU+gHvdxAPxXlT2SyDNClBQ2colLCvMRuHH/S8oSkxO+toIht7t6gqTF0NRMvXrpmww3Pu0NiR11I3mbJ4FAmx7i05lR7W1V5nFftGT0ogmrOF2x/SLz6jN0R/cinLNYqr3KjWcQ1/0MoDDlar6c8TH7NnZ00a9p2ohagCVi55j7xIAZztf80sYvgCpTk/rMxuQllhn0gYWPF9dbkcZDx1gbhHXp7SCtvxKiQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAFc2BYkLgzhu9biVI5bGSKa9LWUJYhvqERg6QGL00XV3IBi0H5tE6LUxLwWtgD871Js+ZD/7mUDuYJ4IJpWr1/fYRaUBMPZc/00Kgo48URrxd3Z6rXr+4/BlyjjwJoUstr+Gtiwm8Lqzt+XDtI1VAnzd1kz0ez11QOEApjquER9Khu7gGGaFgkrscspjP84PQ2oq4AzvlV5KaVtVWG69g2QPCnLhWZoXthplBWQujCceLNO02CJTK1zgqTvikQE7pTB5omtH5MnfWoVQ5EEyowYaxUhehBHfD5LC0llHNs7vWx1NShC1S72CTcOqMoaQkRr3Vt+HgSd3Sjf1Ys5ORKo=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"56601cb13429492195a6ae8407d0b2db"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Retry-After',
  '0',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '36dd02ef-d0c3-4971-a755-092e773be220',
  'x-ms-request-id',
  '036592e4-e78d-4bc1-8b4d-28479beae917',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:29:21 GMT',
  'Content-Length',
  '1350'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/CRUDCertificateName-cangetacertificatessecretinPEMformat-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-cangetacertificatessecretinPEMformat-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA032N3u+5ELjo1OWyWq69iC5A/n+IuqdiERWj6ApcNFp3rSoG6o9TDZPLJq/4U6BX+nEyByVPCm8MV/NH29V9RaiCvxlXEfWNBPJlLomkBDZwAWrqNoU+gHvdxAPxXlT2SyDNClBQ2colLCvMRuHH/S8oSkxO+toIht7t6gqTF0NRMvXrpmww3Pu0NiR11I3mbJ4FAmx7i05lR7W1V5nFftGT0ogmrOF2x/SLz6jN0R/cinLNYqr3KjWcQ1/0MoDDlar6c8TH7NnZ00a9p2ohagCVi55j7xIAZztf80sYvgCpTk/rMxuQllhn0gYWPF9dbkcZDx1gbhHXp7SCtvxKiQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAFc2BYkLgzhu9biVI5bGSKa9LWUJYhvqERg6QGL00XV3IBi0H5tE6LUxLwWtgD871Js+ZD/7mUDuYJ4IJpWr1/fYRaUBMPZc/00Kgo48URrxd3Z6rXr+4/BlyjjwJoUstr+Gtiwm8Lqzt+XDtI1VAnzd1kz0ez11QOEApjquER9Khu7gGGaFgkrscspjP84PQ2oq4AzvlV5KaVtVWG69g2QPCnLhWZoXthplBWQujCceLNO02CJTK1zgqTvikQE7pTB5omtH5MnfWoVQ5EEyowYaxUhehBHfD5LC0llHNs7vWx1NShC1S72CTcOqMoaQkRr3Vt+HgSd3Sjf1Ys5ORKo=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"56601cb13429492195a6ae8407d0b2db"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Retry-After',
  '0',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'c6e4ea1e-3406-421c-8077-b81d68bbfcf5',
  'x-ms-request-id',
  '8d2259b4-919d-4e96-92f6-de46e917e7b1',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:29:21 GMT',
  'Content-Length',
  '1350'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/CRUDCertificateName-cangetacertificatessecretinPEMformat-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-cangetacertificatessecretinPEMformat-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA032N3u+5ELjo1OWyWq69iC5A/n+IuqdiERWj6ApcNFp3rSoG6o9TDZPLJq/4U6BX+nEyByVPCm8MV/NH29V9RaiCvxlXEfWNBPJlLomkBDZwAWrqNoU+gHvdxAPxXlT2SyDNClBQ2colLCvMRuHH/S8oSkxO+toIht7t6gqTF0NRMvXrpmww3Pu0NiR11I3mbJ4FAmx7i05lR7W1V5nFftGT0ogmrOF2x/SLz6jN0R/cinLNYqr3KjWcQ1/0MoDDlar6c8TH7NnZ00a9p2ohagCVi55j7xIAZztf80sYvgCpTk/rMxuQllhn0gYWPF9dbkcZDx1gbhHXp7SCtvxKiQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAFc2BYkLgzhu9biVI5bGSKa9LWUJYhvqERg6QGL00XV3IBi0H5tE6LUxLwWtgD871Js+ZD/7mUDuYJ4IJpWr1/fYRaUBMPZc/00Kgo48URrxd3Z6rXr+4/BlyjjwJoUstr+Gtiwm8Lqzt+XDtI1VAnzd1kz0ez11QOEApjquER9Khu7gGGaFgkrscspjP84PQ2oq4AzvlV5KaVtVWG69g2QPCnLhWZoXthplBWQujCceLNO02CJTK1zgqTvikQE7pTB5omtH5MnfWoVQ5EEyowYaxUhehBHfD5LC0llHNs7vWx1NShC1S72CTcOqMoaQkRr3Vt+HgSd3Sjf1Ys5ORKo=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"56601cb13429492195a6ae8407d0b2db"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Retry-After',
  '0',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'e12a6d9a-d05d-4467-b4fc-cd91f4074688',
  'x-ms-request-id',
  '905a0c3a-9266-4374-adef-bd44855eed2d',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:29:22 GMT',
  'Content-Length',
  '1350'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/CRUDCertificateName-cangetacertificatessecretinPEMformat-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-cangetacertificatessecretinPEMformat-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA032N3u+5ELjo1OWyWq69iC5A/n+IuqdiERWj6ApcNFp3rSoG6o9TDZPLJq/4U6BX+nEyByVPCm8MV/NH29V9RaiCvxlXEfWNBPJlLomkBDZwAWrqNoU+gHvdxAPxXlT2SyDNClBQ2colLCvMRuHH/S8oSkxO+toIht7t6gqTF0NRMvXrpmww3Pu0NiR11I3mbJ4FAmx7i05lR7W1V5nFftGT0ogmrOF2x/SLz6jN0R/cinLNYqr3KjWcQ1/0MoDDlar6c8TH7NnZ00a9p2ohagCVi55j7xIAZztf80sYvgCpTk/rMxuQllhn0gYWPF9dbkcZDx1gbhHXp7SCtvxKiQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAFc2BYkLgzhu9biVI5bGSKa9LWUJYhvqERg6QGL00XV3IBi0H5tE6LUxLwWtgD871Js+ZD/7mUDuYJ4IJpWr1/fYRaUBMPZc/00Kgo48URrxd3Z6rXr+4/BlyjjwJoUstr+Gtiwm8Lqzt+XDtI1VAnzd1kz0ez11QOEApjquER9Khu7gGGaFgkrscspjP84PQ2oq4AzvlV5KaVtVWG69g2QPCnLhWZoXthplBWQujCceLNO02CJTK1zgqTvikQE7pTB5omtH5MnfWoVQ5EEyowYaxUhehBHfD5LC0llHNs7vWx1NShC1S72CTcOqMoaQkRr3Vt+HgSd3Sjf1Ys5ORKo=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"56601cb13429492195a6ae8407d0b2db"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Retry-After',
  '0',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'd7c8f445-6440-4737-9402-84f7d208f306',
  'x-ms-request-id',
  '01d62e54-8ee7-42ca-87c6-e95815a880e2',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:29:25 GMT',
  'Content-Length',
  '1350'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/CRUDCertificateName-cangetacertificatessecretinPEMformat-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-cangetacertificatessecretinPEMformat-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA032N3u+5ELjo1OWyWq69iC5A/n+IuqdiERWj6ApcNFp3rSoG6o9TDZPLJq/4U6BX+nEyByVPCm8MV/NH29V9RaiCvxlXEfWNBPJlLomkBDZwAWrqNoU+gHvdxAPxXlT2SyDNClBQ2colLCvMRuHH/S8oSkxO+toIht7t6gqTF0NRMvXrpmww3Pu0NiR11I3mbJ4FAmx7i05lR7W1V5nFftGT0ogmrOF2x/SLz6jN0R/cinLNYqr3KjWcQ1/0MoDDlar6c8TH7NnZ00a9p2ohagCVi55j7xIAZztf80sYvgCpTk/rMxuQllhn0gYWPF9dbkcZDx1gbhHXp7SCtvxKiQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAFc2BYkLgzhu9biVI5bGSKa9LWUJYhvqERg6QGL00XV3IBi0H5tE6LUxLwWtgD871Js+ZD/7mUDuYJ4IJpWr1/fYRaUBMPZc/00Kgo48URrxd3Z6rXr+4/BlyjjwJoUstr+Gtiwm8Lqzt+XDtI1VAnzd1kz0ez11QOEApjquER9Khu7gGGaFgkrscspjP84PQ2oq4AzvlV5KaVtVWG69g2QPCnLhWZoXthplBWQujCceLNO02CJTK1zgqTvikQE7pTB5omtH5MnfWoVQ5EEyowYaxUhehBHfD5LC0llHNs7vWx1NShC1S72CTcOqMoaQkRr3Vt+HgSd3Sjf1Ys5ORKo=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"56601cb13429492195a6ae8407d0b2db"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Retry-After',
  '0',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '7bbece77-a4ae-452a-8326-abcfef9a3cab',
  'x-ms-request-id',
  'd1c4c25a-2ac5-4f94-9c25-f7b3c854ed7a',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:29:27 GMT',
  'Content-Length',
  '1350'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/CRUDCertificateName-cangetacertificatessecretinPEMformat-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-cangetacertificatessecretinPEMformat-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA032N3u+5ELjo1OWyWq69iC5A/n+IuqdiERWj6ApcNFp3rSoG6o9TDZPLJq/4U6BX+nEyByVPCm8MV/NH29V9RaiCvxlXEfWNBPJlLomkBDZwAWrqNoU+gHvdxAPxXlT2SyDNClBQ2colLCvMRuHH/S8oSkxO+toIht7t6gqTF0NRMvXrpmww3Pu0NiR11I3mbJ4FAmx7i05lR7W1V5nFftGT0ogmrOF2x/SLz6jN0R/cinLNYqr3KjWcQ1/0MoDDlar6c8TH7NnZ00a9p2ohagCVi55j7xIAZztf80sYvgCpTk/rMxuQllhn0gYWPF9dbkcZDx1gbhHXp7SCtvxKiQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAFc2BYkLgzhu9biVI5bGSKa9LWUJYhvqERg6QGL00XV3IBi0H5tE6LUxLwWtgD871Js+ZD/7mUDuYJ4IJpWr1/fYRaUBMPZc/00Kgo48URrxd3Z6rXr+4/BlyjjwJoUstr+Gtiwm8Lqzt+XDtI1VAnzd1kz0ez11QOEApjquER9Khu7gGGaFgkrscspjP84PQ2oq4AzvlV5KaVtVWG69g2QPCnLhWZoXthplBWQujCceLNO02CJTK1zgqTvikQE7pTB5omtH5MnfWoVQ5EEyowYaxUhehBHfD5LC0llHNs7vWx1NShC1S72CTcOqMoaQkRr3Vt+HgSd3Sjf1Ys5ORKo=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"56601cb13429492195a6ae8407d0b2db"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Retry-After',
  '0',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'fef3dafc-ce8e-43e3-a062-d19f8803d78d',
  'x-ms-request-id',
  'd57dca5c-1416-4236-93da-1abb1ed0c747',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:29:29 GMT',
  'Content-Length',
  '1350'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/CRUDCertificateName-cangetacertificatessecretinPEMformat-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-cangetacertificatessecretinPEMformat-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA032N3u+5ELjo1OWyWq69iC5A/n+IuqdiERWj6ApcNFp3rSoG6o9TDZPLJq/4U6BX+nEyByVPCm8MV/NH29V9RaiCvxlXEfWNBPJlLomkBDZwAWrqNoU+gHvdxAPxXlT2SyDNClBQ2colLCvMRuHH/S8oSkxO+toIht7t6gqTF0NRMvXrpmww3Pu0NiR11I3mbJ4FAmx7i05lR7W1V5nFftGT0ogmrOF2x/SLz6jN0R/cinLNYqr3KjWcQ1/0MoDDlar6c8TH7NnZ00a9p2ohagCVi55j7xIAZztf80sYvgCpTk/rMxuQllhn0gYWPF9dbkcZDx1gbhHXp7SCtvxKiQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAFc2BYkLgzhu9biVI5bGSKa9LWUJYhvqERg6QGL00XV3IBi0H5tE6LUxLwWtgD871Js+ZD/7mUDuYJ4IJpWr1/fYRaUBMPZc/00Kgo48URrxd3Z6rXr+4/BlyjjwJoUstr+Gtiwm8Lqzt+XDtI1VAnzd1kz0ez11QOEApjquER9Khu7gGGaFgkrscspjP84PQ2oq4AzvlV5KaVtVWG69g2QPCnLhWZoXthplBWQujCceLNO02CJTK1zgqTvikQE7pTB5omtH5MnfWoVQ5EEyowYaxUhehBHfD5LC0llHNs7vWx1NShC1S72CTcOqMoaQkRr3Vt+HgSd3Sjf1Ys5ORKo=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"56601cb13429492195a6ae8407d0b2db"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Retry-After',
  '0',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '416c0868-64be-4d83-869d-aba8dd58b6c9',
  'x-ms-request-id',
  '147268bd-c50a-4ae2-84c5-3c97c03db013',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:29:30 GMT',
  'Content-Length',
  '1350'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/CRUDCertificateName-cangetacertificatessecretinPEMformat-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-cangetacertificatessecretinPEMformat-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA032N3u+5ELjo1OWyWq69iC5A/n+IuqdiERWj6ApcNFp3rSoG6o9TDZPLJq/4U6BX+nEyByVPCm8MV/NH29V9RaiCvxlXEfWNBPJlLomkBDZwAWrqNoU+gHvdxAPxXlT2SyDNClBQ2colLCvMRuHH/S8oSkxO+toIht7t6gqTF0NRMvXrpmww3Pu0NiR11I3mbJ4FAmx7i05lR7W1V5nFftGT0ogmrOF2x/SLz6jN0R/cinLNYqr3KjWcQ1/0MoDDlar6c8TH7NnZ00a9p2ohagCVi55j7xIAZztf80sYvgCpTk/rMxuQllhn0gYWPF9dbkcZDx1gbhHXp7SCtvxKiQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAFc2BYkLgzhu9biVI5bGSKa9LWUJYhvqERg6QGL00XV3IBi0H5tE6LUxLwWtgD871Js+ZD/7mUDuYJ4IJpWr1/fYRaUBMPZc/00Kgo48URrxd3Z6rXr+4/BlyjjwJoUstr+Gtiwm8Lqzt+XDtI1VAnzd1kz0ez11QOEApjquER9Khu7gGGaFgkrscspjP84PQ2oq4AzvlV5KaVtVWG69g2QPCnLhWZoXthplBWQujCceLNO02CJTK1zgqTvikQE7pTB5omtH5MnfWoVQ5EEyowYaxUhehBHfD5LC0llHNs7vWx1NShC1S72CTcOqMoaQkRr3Vt+HgSd3Sjf1Ys5ORKo=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"56601cb13429492195a6ae8407d0b2db"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Retry-After',
  '0',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'eb831e13-573e-499b-8fba-11aaa9143e0d',
  'x-ms-request-id',
  '5b86e4bb-48fe-4468-af06-95f7efaa7d0b',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:29:33 GMT',
  'Content-Length',
  '1350'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/CRUDCertificateName-cangetacertificatessecretinPEMformat-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-cangetacertificatessecretinPEMformat-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA032N3u+5ELjo1OWyWq69iC5A/n+IuqdiERWj6ApcNFp3rSoG6o9TDZPLJq/4U6BX+nEyByVPCm8MV/NH29V9RaiCvxlXEfWNBPJlLomkBDZwAWrqNoU+gHvdxAPxXlT2SyDNClBQ2colLCvMRuHH/S8oSkxO+toIht7t6gqTF0NRMvXrpmww3Pu0NiR11I3mbJ4FAmx7i05lR7W1V5nFftGT0ogmrOF2x/SLz6jN0R/cinLNYqr3KjWcQ1/0MoDDlar6c8TH7NnZ00a9p2ohagCVi55j7xIAZztf80sYvgCpTk/rMxuQllhn0gYWPF9dbkcZDx1gbhHXp7SCtvxKiQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAFc2BYkLgzhu9biVI5bGSKa9LWUJYhvqERg6QGL00XV3IBi0H5tE6LUxLwWtgD871Js+ZD/7mUDuYJ4IJpWr1/fYRaUBMPZc/00Kgo48URrxd3Z6rXr+4/BlyjjwJoUstr+Gtiwm8Lqzt+XDtI1VAnzd1kz0ez11QOEApjquER9Khu7gGGaFgkrscspjP84PQ2oq4AzvlV5KaVtVWG69g2QPCnLhWZoXthplBWQujCceLNO02CJTK1zgqTvikQE7pTB5omtH5MnfWoVQ5EEyowYaxUhehBHfD5LC0llHNs7vWx1NShC1S72CTcOqMoaQkRr3Vt+HgSd3Sjf1Ys5ORKo=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"56601cb13429492195a6ae8407d0b2db"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Retry-After',
  '0',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '50b162b9-ba21-4f00-87c3-60fa83256eed',
  'x-ms-request-id',
  '5491bcf2-af3b-4032-a9ed-fba5a8021618',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:29:35 GMT',
  'Content-Length',
  '1350'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/CRUDCertificateName-cangetacertificatessecretinPEMformat-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-cangetacertificatessecretinPEMformat-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA032N3u+5ELjo1OWyWq69iC5A/n+IuqdiERWj6ApcNFp3rSoG6o9TDZPLJq/4U6BX+nEyByVPCm8MV/NH29V9RaiCvxlXEfWNBPJlLomkBDZwAWrqNoU+gHvdxAPxXlT2SyDNClBQ2colLCvMRuHH/S8oSkxO+toIht7t6gqTF0NRMvXrpmww3Pu0NiR11I3mbJ4FAmx7i05lR7W1V5nFftGT0ogmrOF2x/SLz6jN0R/cinLNYqr3KjWcQ1/0MoDDlar6c8TH7NnZ00a9p2ohagCVi55j7xIAZztf80sYvgCpTk/rMxuQllhn0gYWPF9dbkcZDx1gbhHXp7SCtvxKiQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAFc2BYkLgzhu9biVI5bGSKa9LWUJYhvqERg6QGL00XV3IBi0H5tE6LUxLwWtgD871Js+ZD/7mUDuYJ4IJpWr1/fYRaUBMPZc/00Kgo48URrxd3Z6rXr+4/BlyjjwJoUstr+Gtiwm8Lqzt+XDtI1VAnzd1kz0ez11QOEApjquER9Khu7gGGaFgkrscspjP84PQ2oq4AzvlV5KaVtVWG69g2QPCnLhWZoXthplBWQujCceLNO02CJTK1zgqTvikQE7pTB5omtH5MnfWoVQ5EEyowYaxUhehBHfD5LC0llHNs7vWx1NShC1S72CTcOqMoaQkRr3Vt+HgSd3Sjf1Ys5ORKo=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"56601cb13429492195a6ae8407d0b2db"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Retry-After',
  '0',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'b134c46b-49e0-4357-8b79-3f1ff582f314',
  'x-ms-request-id',
  '12c2aa8c-9665-4802-9b7a-c09d31caef93',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:29:37 GMT',
  'Content-Length',
  '1350'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/CRUDCertificateName-cangetacertificatessecretinPEMformat-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-cangetacertificatessecretinPEMformat-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA032N3u+5ELjo1OWyWq69iC5A/n+IuqdiERWj6ApcNFp3rSoG6o9TDZPLJq/4U6BX+nEyByVPCm8MV/NH29V9RaiCvxlXEfWNBPJlLomkBDZwAWrqNoU+gHvdxAPxXlT2SyDNClBQ2colLCvMRuHH/S8oSkxO+toIht7t6gqTF0NRMvXrpmww3Pu0NiR11I3mbJ4FAmx7i05lR7W1V5nFftGT0ogmrOF2x/SLz6jN0R/cinLNYqr3KjWcQ1/0MoDDlar6c8TH7NnZ00a9p2ohagCVi55j7xIAZztf80sYvgCpTk/rMxuQllhn0gYWPF9dbkcZDx1gbhHXp7SCtvxKiQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAFc2BYkLgzhu9biVI5bGSKa9LWUJYhvqERg6QGL00XV3IBi0H5tE6LUxLwWtgD871Js+ZD/7mUDuYJ4IJpWr1/fYRaUBMPZc/00Kgo48URrxd3Z6rXr+4/BlyjjwJoUstr+Gtiwm8Lqzt+XDtI1VAnzd1kz0ez11QOEApjquER9Khu7gGGaFgkrscspjP84PQ2oq4AzvlV5KaVtVWG69g2QPCnLhWZoXthplBWQujCceLNO02CJTK1zgqTvikQE7pTB5omtH5MnfWoVQ5EEyowYaxUhehBHfD5LC0llHNs7vWx1NShC1S72CTcOqMoaQkRr3Vt+HgSd3Sjf1Ys5ORKo=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"56601cb13429492195a6ae8407d0b2db"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Retry-After',
  '0',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '83a55c66-bae0-4b30-8df2-ae079939807a',
  'x-ms-request-id',
  '3df243ca-c3b2-4418-9768-264230d4ea8f',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:29:39 GMT',
  'Content-Length',
  '1350'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/CRUDCertificateName-cangetacertificatessecretinPEMformat-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-cangetacertificatessecretinPEMformat-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA032N3u+5ELjo1OWyWq69iC5A/n+IuqdiERWj6ApcNFp3rSoG6o9TDZPLJq/4U6BX+nEyByVPCm8MV/NH29V9RaiCvxlXEfWNBPJlLomkBDZwAWrqNoU+gHvdxAPxXlT2SyDNClBQ2colLCvMRuHH/S8oSkxO+toIht7t6gqTF0NRMvXrpmww3Pu0NiR11I3mbJ4FAmx7i05lR7W1V5nFftGT0ogmrOF2x/SLz6jN0R/cinLNYqr3KjWcQ1/0MoDDlar6c8TH7NnZ00a9p2ohagCVi55j7xIAZztf80sYvgCpTk/rMxuQllhn0gYWPF9dbkcZDx1gbhHXp7SCtvxKiQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAFc2BYkLgzhu9biVI5bGSKa9LWUJYhvqERg6QGL00XV3IBi0H5tE6LUxLwWtgD871Js+ZD/7mUDuYJ4IJpWr1/fYRaUBMPZc/00Kgo48URrxd3Z6rXr+4/BlyjjwJoUstr+Gtiwm8Lqzt+XDtI1VAnzd1kz0ez11QOEApjquER9Khu7gGGaFgkrscspjP84PQ2oq4AzvlV5KaVtVWG69g2QPCnLhWZoXthplBWQujCceLNO02CJTK1zgqTvikQE7pTB5omtH5MnfWoVQ5EEyowYaxUhehBHfD5LC0llHNs7vWx1NShC1S72CTcOqMoaQkRr3Vt+HgSd3Sjf1Ys5ORKo=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"56601cb13429492195a6ae8407d0b2db"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Retry-After',
  '0',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '8ff4630d-296d-47a1-a887-cbfb6545191d',
  'x-ms-request-id',
  '44759455-5441-40cb-ad7c-3c062313b839',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:29:42 GMT',
  'Content-Length',
  '1350'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/CRUDCertificateName-cangetacertificatessecretinPEMformat-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-cangetacertificatessecretinPEMformat-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA032N3u+5ELjo1OWyWq69iC5A/n+IuqdiERWj6ApcNFp3rSoG6o9TDZPLJq/4U6BX+nEyByVPCm8MV/NH29V9RaiCvxlXEfWNBPJlLomkBDZwAWrqNoU+gHvdxAPxXlT2SyDNClBQ2colLCvMRuHH/S8oSkxO+toIht7t6gqTF0NRMvXrpmww3Pu0NiR11I3mbJ4FAmx7i05lR7W1V5nFftGT0ogmrOF2x/SLz6jN0R/cinLNYqr3KjWcQ1/0MoDDlar6c8TH7NnZ00a9p2ohagCVi55j7xIAZztf80sYvgCpTk/rMxuQllhn0gYWPF9dbkcZDx1gbhHXp7SCtvxKiQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAFc2BYkLgzhu9biVI5bGSKa9LWUJYhvqERg6QGL00XV3IBi0H5tE6LUxLwWtgD871Js+ZD/7mUDuYJ4IJpWr1/fYRaUBMPZc/00Kgo48URrxd3Z6rXr+4/BlyjjwJoUstr+Gtiwm8Lqzt+XDtI1VAnzd1kz0ez11QOEApjquER9Khu7gGGaFgkrscspjP84PQ2oq4AzvlV5KaVtVWG69g2QPCnLhWZoXthplBWQujCceLNO02CJTK1zgqTvikQE7pTB5omtH5MnfWoVQ5EEyowYaxUhehBHfD5LC0llHNs7vWx1NShC1S72CTcOqMoaQkRr3Vt+HgSd3Sjf1Ys5ORKo=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"56601cb13429492195a6ae8407d0b2db"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Retry-After',
  '0',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '99d675f3-cd74-4490-9d3f-a9745c5a80bd',
  'x-ms-request-id',
  'e1d45162-4481-4580-b164-cc761ffaa135',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:29:44 GMT',
  'Content-Length',
  '1350'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/CRUDCertificateName-cangetacertificatessecretinPEMformat-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-cangetacertificatessecretinPEMformat-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA032N3u+5ELjo1OWyWq69iC5A/n+IuqdiERWj6ApcNFp3rSoG6o9TDZPLJq/4U6BX+nEyByVPCm8MV/NH29V9RaiCvxlXEfWNBPJlLomkBDZwAWrqNoU+gHvdxAPxXlT2SyDNClBQ2colLCvMRuHH/S8oSkxO+toIht7t6gqTF0NRMvXrpmww3Pu0NiR11I3mbJ4FAmx7i05lR7W1V5nFftGT0ogmrOF2x/SLz6jN0R/cinLNYqr3KjWcQ1/0MoDDlar6c8TH7NnZ00a9p2ohagCVi55j7xIAZztf80sYvgCpTk/rMxuQllhn0gYWPF9dbkcZDx1gbhHXp7SCtvxKiQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAFc2BYkLgzhu9biVI5bGSKa9LWUJYhvqERg6QGL00XV3IBi0H5tE6LUxLwWtgD871Js+ZD/7mUDuYJ4IJpWr1/fYRaUBMPZc/00Kgo48URrxd3Z6rXr+4/BlyjjwJoUstr+Gtiwm8Lqzt+XDtI1VAnzd1kz0ez11QOEApjquER9Khu7gGGaFgkrscspjP84PQ2oq4AzvlV5KaVtVWG69g2QPCnLhWZoXthplBWQujCceLNO02CJTK1zgqTvikQE7pTB5omtH5MnfWoVQ5EEyowYaxUhehBHfD5LC0llHNs7vWx1NShC1S72CTcOqMoaQkRr3Vt+HgSd3Sjf1Ys5ORKo=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"56601cb13429492195a6ae8407d0b2db"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Retry-After',
  '0',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '9181d691-bf0c-4a98-b34c-f09dc47a83d4',
  'x-ms-request-id',
  '3ba1366d-f015-409d-ad9f-9cd79b82bd7f',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:29:46 GMT',
  'Content-Length',
  '1350'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/CRUDCertificateName-cangetacertificatessecretinPEMformat-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-cangetacertificatessecretinPEMformat-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA032N3u+5ELjo1OWyWq69iC5A/n+IuqdiERWj6ApcNFp3rSoG6o9TDZPLJq/4U6BX+nEyByVPCm8MV/NH29V9RaiCvxlXEfWNBPJlLomkBDZwAWrqNoU+gHvdxAPxXlT2SyDNClBQ2colLCvMRuHH/S8oSkxO+toIht7t6gqTF0NRMvXrpmww3Pu0NiR11I3mbJ4FAmx7i05lR7W1V5nFftGT0ogmrOF2x/SLz6jN0R/cinLNYqr3KjWcQ1/0MoDDlar6c8TH7NnZ00a9p2ohagCVi55j7xIAZztf80sYvgCpTk/rMxuQllhn0gYWPF9dbkcZDx1gbhHXp7SCtvxKiQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAFc2BYkLgzhu9biVI5bGSKa9LWUJYhvqERg6QGL00XV3IBi0H5tE6LUxLwWtgD871Js+ZD/7mUDuYJ4IJpWr1/fYRaUBMPZc/00Kgo48URrxd3Z6rXr+4/BlyjjwJoUstr+Gtiwm8Lqzt+XDtI1VAnzd1kz0ez11QOEApjquER9Khu7gGGaFgkrscspjP84PQ2oq4AzvlV5KaVtVWG69g2QPCnLhWZoXthplBWQujCceLNO02CJTK1zgqTvikQE7pTB5omtH5MnfWoVQ5EEyowYaxUhehBHfD5LC0llHNs7vWx1NShC1S72CTcOqMoaQkRr3Vt+HgSd3Sjf1Ys5ORKo=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"56601cb13429492195a6ae8407d0b2db"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Retry-After',
  '0',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'a55ee2a7-9786-47d9-a31c-ed27829ce43a',
  'x-ms-request-id',
  '8bbf1659-1a07-4382-ba86-689a4522617b',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:29:47 GMT',
  'Content-Length',
  '1350'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/CRUDCertificateName-cangetacertificatessecretinPEMformat-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-cangetacertificatessecretinPEMformat-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA032N3u+5ELjo1OWyWq69iC5A/n+IuqdiERWj6ApcNFp3rSoG6o9TDZPLJq/4U6BX+nEyByVPCm8MV/NH29V9RaiCvxlXEfWNBPJlLomkBDZwAWrqNoU+gHvdxAPxXlT2SyDNClBQ2colLCvMRuHH/S8oSkxO+toIht7t6gqTF0NRMvXrpmww3Pu0NiR11I3mbJ4FAmx7i05lR7W1V5nFftGT0ogmrOF2x/SLz6jN0R/cinLNYqr3KjWcQ1/0MoDDlar6c8TH7NnZ00a9p2ohagCVi55j7xIAZztf80sYvgCpTk/rMxuQllhn0gYWPF9dbkcZDx1gbhHXp7SCtvxKiQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAFc2BYkLgzhu9biVI5bGSKa9LWUJYhvqERg6QGL00XV3IBi0H5tE6LUxLwWtgD871Js+ZD/7mUDuYJ4IJpWr1/fYRaUBMPZc/00Kgo48URrxd3Z6rXr+4/BlyjjwJoUstr+Gtiwm8Lqzt+XDtI1VAnzd1kz0ez11QOEApjquER9Khu7gGGaFgkrscspjP84PQ2oq4AzvlV5KaVtVWG69g2QPCnLhWZoXthplBWQujCceLNO02CJTK1zgqTvikQE7pTB5omtH5MnfWoVQ5EEyowYaxUhehBHfD5LC0llHNs7vWx1NShC1S72CTcOqMoaQkRr3Vt+HgSd3Sjf1Ys5ORKo=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"56601cb13429492195a6ae8407d0b2db"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Retry-After',
  '0',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '729aa60a-93f7-45f8-81f2-9da6e3d64a2c',
  'x-ms-request-id',
  'd653c135-4db6-42d9-b283-ce5844f7ed1f',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:29:50 GMT',
  'Content-Length',
  '1350'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/CRUDCertificateName-cangetacertificatessecretinPEMformat-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-cangetacertificatessecretinPEMformat-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA032N3u+5ELjo1OWyWq69iC5A/n+IuqdiERWj6ApcNFp3rSoG6o9TDZPLJq/4U6BX+nEyByVPCm8MV/NH29V9RaiCvxlXEfWNBPJlLomkBDZwAWrqNoU+gHvdxAPxXlT2SyDNClBQ2colLCvMRuHH/S8oSkxO+toIht7t6gqTF0NRMvXrpmww3Pu0NiR11I3mbJ4FAmx7i05lR7W1V5nFftGT0ogmrOF2x/SLz6jN0R/cinLNYqr3KjWcQ1/0MoDDlar6c8TH7NnZ00a9p2ohagCVi55j7xIAZztf80sYvgCpTk/rMxuQllhn0gYWPF9dbkcZDx1gbhHXp7SCtvxKiQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAFc2BYkLgzhu9biVI5bGSKa9LWUJYhvqERg6QGL00XV3IBi0H5tE6LUxLwWtgD871Js+ZD/7mUDuYJ4IJpWr1/fYRaUBMPZc/00Kgo48URrxd3Z6rXr+4/BlyjjwJoUstr+Gtiwm8Lqzt+XDtI1VAnzd1kz0ez11QOEApjquER9Khu7gGGaFgkrscspjP84PQ2oq4AzvlV5KaVtVWG69g2QPCnLhWZoXthplBWQujCceLNO02CJTK1zgqTvikQE7pTB5omtH5MnfWoVQ5EEyowYaxUhehBHfD5LC0llHNs7vWx1NShC1S72CTcOqMoaQkRr3Vt+HgSd3Sjf1Ys5ORKo=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"56601cb13429492195a6ae8407d0b2db"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Retry-After',
  '0',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '0aa40dd8-c7d2-49bf-9bf7-13176e5c22e7',
  'x-ms-request-id',
  'ffbc928f-368e-4e95-99dc-3e70bb05988e',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:29:52 GMT',
  'Content-Length',
  '1350'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/CRUDCertificateName-cangetacertificatessecretinPEMformat-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-cangetacertificatessecretinPEMformat-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA032N3u+5ELjo1OWyWq69iC5A/n+IuqdiERWj6ApcNFp3rSoG6o9TDZPLJq/4U6BX+nEyByVPCm8MV/NH29V9RaiCvxlXEfWNBPJlLomkBDZwAWrqNoU+gHvdxAPxXlT2SyDNClBQ2colLCvMRuHH/S8oSkxO+toIht7t6gqTF0NRMvXrpmww3Pu0NiR11I3mbJ4FAmx7i05lR7W1V5nFftGT0ogmrOF2x/SLz6jN0R/cinLNYqr3KjWcQ1/0MoDDlar6c8TH7NnZ00a9p2ohagCVi55j7xIAZztf80sYvgCpTk/rMxuQllhn0gYWPF9dbkcZDx1gbhHXp7SCtvxKiQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAFc2BYkLgzhu9biVI5bGSKa9LWUJYhvqERg6QGL00XV3IBi0H5tE6LUxLwWtgD871Js+ZD/7mUDuYJ4IJpWr1/fYRaUBMPZc/00Kgo48URrxd3Z6rXr+4/BlyjjwJoUstr+Gtiwm8Lqzt+XDtI1VAnzd1kz0ez11QOEApjquER9Khu7gGGaFgkrscspjP84PQ2oq4AzvlV5KaVtVWG69g2QPCnLhWZoXthplBWQujCceLNO02CJTK1zgqTvikQE7pTB5omtH5MnfWoVQ5EEyowYaxUhehBHfD5LC0llHNs7vWx1NShC1S72CTcOqMoaQkRr3Vt+HgSd3Sjf1Ys5ORKo=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"56601cb13429492195a6ae8407d0b2db"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Retry-After',
  '0',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'ef182a28-7490-4915-b350-7a6986581d73',
  'x-ms-request-id',
  '9589646f-7700-4a17-8f9a-56cd22525009',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:29:54 GMT',
  'Content-Length',
  '1350'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/CRUDCertificateName-cangetacertificatessecretinPEMformat-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-cangetacertificatessecretinPEMformat-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA032N3u+5ELjo1OWyWq69iC5A/n+IuqdiERWj6ApcNFp3rSoG6o9TDZPLJq/4U6BX+nEyByVPCm8MV/NH29V9RaiCvxlXEfWNBPJlLomkBDZwAWrqNoU+gHvdxAPxXlT2SyDNClBQ2colLCvMRuHH/S8oSkxO+toIht7t6gqTF0NRMvXrpmww3Pu0NiR11I3mbJ4FAmx7i05lR7W1V5nFftGT0ogmrOF2x/SLz6jN0R/cinLNYqr3KjWcQ1/0MoDDlar6c8TH7NnZ00a9p2ohagCVi55j7xIAZztf80sYvgCpTk/rMxuQllhn0gYWPF9dbkcZDx1gbhHXp7SCtvxKiQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAFc2BYkLgzhu9biVI5bGSKa9LWUJYhvqERg6QGL00XV3IBi0H5tE6LUxLwWtgD871Js+ZD/7mUDuYJ4IJpWr1/fYRaUBMPZc/00Kgo48URrxd3Z6rXr+4/BlyjjwJoUstr+Gtiwm8Lqzt+XDtI1VAnzd1kz0ez11QOEApjquER9Khu7gGGaFgkrscspjP84PQ2oq4AzvlV5KaVtVWG69g2QPCnLhWZoXthplBWQujCceLNO02CJTK1zgqTvikQE7pTB5omtH5MnfWoVQ5EEyowYaxUhehBHfD5LC0llHNs7vWx1NShC1S72CTcOqMoaQkRr3Vt+HgSd3Sjf1Ys5ORKo=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"56601cb13429492195a6ae8407d0b2db"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Retry-After',
  '0',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '3129196d-3706-45c7-90b0-79ee2d2e5ec9',
  'x-ms-request-id',
  '19d59524-b04a-43d8-b208-a3428abe2261',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:29:56 GMT',
  'Content-Length',
  '1350'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/CRUDCertificateName-cangetacertificatessecretinPEMformat-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-cangetacertificatessecretinPEMformat-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA032N3u+5ELjo1OWyWq69iC5A/n+IuqdiERWj6ApcNFp3rSoG6o9TDZPLJq/4U6BX+nEyByVPCm8MV/NH29V9RaiCvxlXEfWNBPJlLomkBDZwAWrqNoU+gHvdxAPxXlT2SyDNClBQ2colLCvMRuHH/S8oSkxO+toIht7t6gqTF0NRMvXrpmww3Pu0NiR11I3mbJ4FAmx7i05lR7W1V5nFftGT0ogmrOF2x/SLz6jN0R/cinLNYqr3KjWcQ1/0MoDDlar6c8TH7NnZ00a9p2ohagCVi55j7xIAZztf80sYvgCpTk/rMxuQllhn0gYWPF9dbkcZDx1gbhHXp7SCtvxKiQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAFc2BYkLgzhu9biVI5bGSKa9LWUJYhvqERg6QGL00XV3IBi0H5tE6LUxLwWtgD871Js+ZD/7mUDuYJ4IJpWr1/fYRaUBMPZc/00Kgo48URrxd3Z6rXr+4/BlyjjwJoUstr+Gtiwm8Lqzt+XDtI1VAnzd1kz0ez11QOEApjquER9Khu7gGGaFgkrscspjP84PQ2oq4AzvlV5KaVtVWG69g2QPCnLhWZoXthplBWQujCceLNO02CJTK1zgqTvikQE7pTB5omtH5MnfWoVQ5EEyowYaxUhehBHfD5LC0llHNs7vWx1NShC1S72CTcOqMoaQkRr3Vt+HgSd3Sjf1Ys5ORKo=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"56601cb13429492195a6ae8407d0b2db"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Retry-After',
  '0',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '3a2a0425-f733-4a22-b325-2072fa929bb8',
  'x-ms-request-id',
  '5aadeae6-3d54-4aa0-8edc-0e54f71fe729',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:29:58 GMT',
  'Content-Length',
  '1350'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/CRUDCertificateName-cangetacertificatessecretinPEMformat-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-cangetacertificatessecretinPEMformat-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA032N3u+5ELjo1OWyWq69iC5A/n+IuqdiERWj6ApcNFp3rSoG6o9TDZPLJq/4U6BX+nEyByVPCm8MV/NH29V9RaiCvxlXEfWNBPJlLomkBDZwAWrqNoU+gHvdxAPxXlT2SyDNClBQ2colLCvMRuHH/S8oSkxO+toIht7t6gqTF0NRMvXrpmww3Pu0NiR11I3mbJ4FAmx7i05lR7W1V5nFftGT0ogmrOF2x/SLz6jN0R/cinLNYqr3KjWcQ1/0MoDDlar6c8TH7NnZ00a9p2ohagCVi55j7xIAZztf80sYvgCpTk/rMxuQllhn0gYWPF9dbkcZDx1gbhHXp7SCtvxKiQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAFc2BYkLgzhu9biVI5bGSKa9LWUJYhvqERg6QGL00XV3IBi0H5tE6LUxLwWtgD871Js+ZD/7mUDuYJ4IJpWr1/fYRaUBMPZc/00Kgo48URrxd3Z6rXr+4/BlyjjwJoUstr+Gtiwm8Lqzt+XDtI1VAnzd1kz0ez11QOEApjquER9Khu7gGGaFgkrscspjP84PQ2oq4AzvlV5KaVtVWG69g2QPCnLhWZoXthplBWQujCceLNO02CJTK1zgqTvikQE7pTB5omtH5MnfWoVQ5EEyowYaxUhehBHfD5LC0llHNs7vWx1NShC1S72CTcOqMoaQkRr3Vt+HgSd3Sjf1Ys5ORKo=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"56601cb13429492195a6ae8407d0b2db"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Retry-After',
  '0',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '58fd252b-560f-4967-92a1-18596dce2499',
  'x-ms-request-id',
  'f8cf74f0-d35c-421d-ac36-1ddcc3515b7a',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:30:01 GMT',
  'Content-Length',
  '1350'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/CRUDCertificateName-cangetacertificatessecretinPEMformat-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-cangetacertificatessecretinPEMformat-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA032N3u+5ELjo1OWyWq69iC5A/n+IuqdiERWj6ApcNFp3rSoG6o9TDZPLJq/4U6BX+nEyByVPCm8MV/NH29V9RaiCvxlXEfWNBPJlLomkBDZwAWrqNoU+gHvdxAPxXlT2SyDNClBQ2colLCvMRuHH/S8oSkxO+toIht7t6gqTF0NRMvXrpmww3Pu0NiR11I3mbJ4FAmx7i05lR7W1V5nFftGT0ogmrOF2x/SLz6jN0R/cinLNYqr3KjWcQ1/0MoDDlar6c8TH7NnZ00a9p2ohagCVi55j7xIAZztf80sYvgCpTk/rMxuQllhn0gYWPF9dbkcZDx1gbhHXp7SCtvxKiQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAFc2BYkLgzhu9biVI5bGSKa9LWUJYhvqERg6QGL00XV3IBi0H5tE6LUxLwWtgD871Js+ZD/7mUDuYJ4IJpWr1/fYRaUBMPZc/00Kgo48URrxd3Z6rXr+4/BlyjjwJoUstr+Gtiwm8Lqzt+XDtI1VAnzd1kz0ez11QOEApjquER9Khu7gGGaFgkrscspjP84PQ2oq4AzvlV5KaVtVWG69g2QPCnLhWZoXthplBWQujCceLNO02CJTK1zgqTvikQE7pTB5omtH5MnfWoVQ5EEyowYaxUhehBHfD5LC0llHNs7vWx1NShC1S72CTcOqMoaQkRr3Vt+HgSd3Sjf1Ys5ORKo=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"56601cb13429492195a6ae8407d0b2db"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Retry-After',
  '0',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '8d6c2bee-9c3c-4abb-a70b-c88cd7fac15e',
  'x-ms-request-id',
  '8c8116d9-dcac-4d54-adf2-6a0f8d23d262',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:30:02 GMT',
  'Content-Length',
  '1350'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/CRUDCertificateName-cangetacertificatessecretinPEMformat-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-cangetacertificatessecretinPEMformat-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA032N3u+5ELjo1OWyWq69iC5A/n+IuqdiERWj6ApcNFp3rSoG6o9TDZPLJq/4U6BX+nEyByVPCm8MV/NH29V9RaiCvxlXEfWNBPJlLomkBDZwAWrqNoU+gHvdxAPxXlT2SyDNClBQ2colLCvMRuHH/S8oSkxO+toIht7t6gqTF0NRMvXrpmww3Pu0NiR11I3mbJ4FAmx7i05lR7W1V5nFftGT0ogmrOF2x/SLz6jN0R/cinLNYqr3KjWcQ1/0MoDDlar6c8TH7NnZ00a9p2ohagCVi55j7xIAZztf80sYvgCpTk/rMxuQllhn0gYWPF9dbkcZDx1gbhHXp7SCtvxKiQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAFc2BYkLgzhu9biVI5bGSKa9LWUJYhvqERg6QGL00XV3IBi0H5tE6LUxLwWtgD871Js+ZD/7mUDuYJ4IJpWr1/fYRaUBMPZc/00Kgo48URrxd3Z6rXr+4/BlyjjwJoUstr+Gtiwm8Lqzt+XDtI1VAnzd1kz0ez11QOEApjquER9Khu7gGGaFgkrscspjP84PQ2oq4AzvlV5KaVtVWG69g2QPCnLhWZoXthplBWQujCceLNO02CJTK1zgqTvikQE7pTB5omtH5MnfWoVQ5EEyowYaxUhehBHfD5LC0llHNs7vWx1NShC1S72CTcOqMoaQkRr3Vt+HgSd3Sjf1Ys5ORKo=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"56601cb13429492195a6ae8407d0b2db"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Retry-After',
  '0',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '05aaa5ad-ec30-47ac-881a-252174cf5a2b',
  'x-ms-request-id',
  'b7538bc2-9f56-4a3a-9fa0-4230ca755b20',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:30:05 GMT',
  'Content-Length',
  '1350'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/CRUDCertificateName-cangetacertificatessecretinPEMformat-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-cangetacertificatessecretinPEMformat-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA032N3u+5ELjo1OWyWq69iC5A/n+IuqdiERWj6ApcNFp3rSoG6o9TDZPLJq/4U6BX+nEyByVPCm8MV/NH29V9RaiCvxlXEfWNBPJlLomkBDZwAWrqNoU+gHvdxAPxXlT2SyDNClBQ2colLCvMRuHH/S8oSkxO+toIht7t6gqTF0NRMvXrpmww3Pu0NiR11I3mbJ4FAmx7i05lR7W1V5nFftGT0ogmrOF2x/SLz6jN0R/cinLNYqr3KjWcQ1/0MoDDlar6c8TH7NnZ00a9p2ohagCVi55j7xIAZztf80sYvgCpTk/rMxuQllhn0gYWPF9dbkcZDx1gbhHXp7SCtvxKiQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAFc2BYkLgzhu9biVI5bGSKa9LWUJYhvqERg6QGL00XV3IBi0H5tE6LUxLwWtgD871Js+ZD/7mUDuYJ4IJpWr1/fYRaUBMPZc/00Kgo48URrxd3Z6rXr+4/BlyjjwJoUstr+Gtiwm8Lqzt+XDtI1VAnzd1kz0ez11QOEApjquER9Khu7gGGaFgkrscspjP84PQ2oq4AzvlV5KaVtVWG69g2QPCnLhWZoXthplBWQujCceLNO02CJTK1zgqTvikQE7pTB5omtH5MnfWoVQ5EEyowYaxUhehBHfD5LC0llHNs7vWx1NShC1S72CTcOqMoaQkRr3Vt+HgSd3Sjf1Ys5ORKo=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"56601cb13429492195a6ae8407d0b2db"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Retry-After',
  '0',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '80a70547-d7bc-413f-b682-cf92f7a5cbef',
  'x-ms-request-id',
  '1142375f-5ba6-410f-a7e8-5e83ed43224f',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:30:07 GMT',
  'Content-Length',
  '1350'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/CRUDCertificateName-cangetacertificatessecretinPEMformat-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-cangetacertificatessecretinPEMformat-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA032N3u+5ELjo1OWyWq69iC5A/n+IuqdiERWj6ApcNFp3rSoG6o9TDZPLJq/4U6BX+nEyByVPCm8MV/NH29V9RaiCvxlXEfWNBPJlLomkBDZwAWrqNoU+gHvdxAPxXlT2SyDNClBQ2colLCvMRuHH/S8oSkxO+toIht7t6gqTF0NRMvXrpmww3Pu0NiR11I3mbJ4FAmx7i05lR7W1V5nFftGT0ogmrOF2x/SLz6jN0R/cinLNYqr3KjWcQ1/0MoDDlar6c8TH7NnZ00a9p2ohagCVi55j7xIAZztf80sYvgCpTk/rMxuQllhn0gYWPF9dbkcZDx1gbhHXp7SCtvxKiQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAFc2BYkLgzhu9biVI5bGSKa9LWUJYhvqERg6QGL00XV3IBi0H5tE6LUxLwWtgD871Js+ZD/7mUDuYJ4IJpWr1/fYRaUBMPZc/00Kgo48URrxd3Z6rXr+4/BlyjjwJoUstr+Gtiwm8Lqzt+XDtI1VAnzd1kz0ez11QOEApjquER9Khu7gGGaFgkrscspjP84PQ2oq4AzvlV5KaVtVWG69g2QPCnLhWZoXthplBWQujCceLNO02CJTK1zgqTvikQE7pTB5omtH5MnfWoVQ5EEyowYaxUhehBHfD5LC0llHNs7vWx1NShC1S72CTcOqMoaQkRr3Vt+HgSd3Sjf1Ys5ORKo=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"56601cb13429492195a6ae8407d0b2db"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Retry-After',
  '0',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'd01b9569-f36f-403d-9caa-e6538d929d97',
  'x-ms-request-id',
  '858e89a4-7099-4c8d-9086-026e07964b86',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:30:09 GMT',
  'Content-Length',
  '1350'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/CRUDCertificateName-cangetacertificatessecretinPEMformat-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-cangetacertificatessecretinPEMformat-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA032N3u+5ELjo1OWyWq69iC5A/n+IuqdiERWj6ApcNFp3rSoG6o9TDZPLJq/4U6BX+nEyByVPCm8MV/NH29V9RaiCvxlXEfWNBPJlLomkBDZwAWrqNoU+gHvdxAPxXlT2SyDNClBQ2colLCvMRuHH/S8oSkxO+toIht7t6gqTF0NRMvXrpmww3Pu0NiR11I3mbJ4FAmx7i05lR7W1V5nFftGT0ogmrOF2x/SLz6jN0R/cinLNYqr3KjWcQ1/0MoDDlar6c8TH7NnZ00a9p2ohagCVi55j7xIAZztf80sYvgCpTk/rMxuQllhn0gYWPF9dbkcZDx1gbhHXp7SCtvxKiQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAFc2BYkLgzhu9biVI5bGSKa9LWUJYhvqERg6QGL00XV3IBi0H5tE6LUxLwWtgD871Js+ZD/7mUDuYJ4IJpWr1/fYRaUBMPZc/00Kgo48URrxd3Z6rXr+4/BlyjjwJoUstr+Gtiwm8Lqzt+XDtI1VAnzd1kz0ez11QOEApjquER9Khu7gGGaFgkrscspjP84PQ2oq4AzvlV5KaVtVWG69g2QPCnLhWZoXthplBWQujCceLNO02CJTK1zgqTvikQE7pTB5omtH5MnfWoVQ5EEyowYaxUhehBHfD5LC0llHNs7vWx1NShC1S72CTcOqMoaQkRr3Vt+HgSd3Sjf1Ys5ORKo=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"56601cb13429492195a6ae8407d0b2db"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Retry-After',
  '0',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '897116a8-1942-43e5-bf34-92f98f676d44',
  'x-ms-request-id',
  'be3a8620-2e91-4c74-918a-d03fe80f9b1d',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:30:12 GMT',
  'Content-Length',
  '1350'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/CRUDCertificateName-cangetacertificatessecretinPEMformat-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-cangetacertificatessecretinPEMformat-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA032N3u+5ELjo1OWyWq69iC5A/n+IuqdiERWj6ApcNFp3rSoG6o9TDZPLJq/4U6BX+nEyByVPCm8MV/NH29V9RaiCvxlXEfWNBPJlLomkBDZwAWrqNoU+gHvdxAPxXlT2SyDNClBQ2colLCvMRuHH/S8oSkxO+toIht7t6gqTF0NRMvXrpmww3Pu0NiR11I3mbJ4FAmx7i05lR7W1V5nFftGT0ogmrOF2x/SLz6jN0R/cinLNYqr3KjWcQ1/0MoDDlar6c8TH7NnZ00a9p2ohagCVi55j7xIAZztf80sYvgCpTk/rMxuQllhn0gYWPF9dbkcZDx1gbhHXp7SCtvxKiQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAFc2BYkLgzhu9biVI5bGSKa9LWUJYhvqERg6QGL00XV3IBi0H5tE6LUxLwWtgD871Js+ZD/7mUDuYJ4IJpWr1/fYRaUBMPZc/00Kgo48URrxd3Z6rXr+4/BlyjjwJoUstr+Gtiwm8Lqzt+XDtI1VAnzd1kz0ez11QOEApjquER9Khu7gGGaFgkrscspjP84PQ2oq4AzvlV5KaVtVWG69g2QPCnLhWZoXthplBWQujCceLNO02CJTK1zgqTvikQE7pTB5omtH5MnfWoVQ5EEyowYaxUhehBHfD5LC0llHNs7vWx1NShC1S72CTcOqMoaQkRr3Vt+HgSd3Sjf1Ys5ORKo=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"56601cb13429492195a6ae8407d0b2db"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Retry-After',
  '0',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'adb62f0a-e14b-4b95-ba6e-1e7edfcb23be',
  'x-ms-request-id',
  '186ce893-c81e-45d1-9eeb-fb248422b7bd',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:30:14 GMT',
  'Content-Length',
  '1350'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/CRUDCertificateName-cangetacertificatessecretinPEMformat-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-cangetacertificatessecretinPEMformat-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA032N3u+5ELjo1OWyWq69iC5A/n+IuqdiERWj6ApcNFp3rSoG6o9TDZPLJq/4U6BX+nEyByVPCm8MV/NH29V9RaiCvxlXEfWNBPJlLomkBDZwAWrqNoU+gHvdxAPxXlT2SyDNClBQ2colLCvMRuHH/S8oSkxO+toIht7t6gqTF0NRMvXrpmww3Pu0NiR11I3mbJ4FAmx7i05lR7W1V5nFftGT0ogmrOF2x/SLz6jN0R/cinLNYqr3KjWcQ1/0MoDDlar6c8TH7NnZ00a9p2ohagCVi55j7xIAZztf80sYvgCpTk/rMxuQllhn0gYWPF9dbkcZDx1gbhHXp7SCtvxKiQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAFc2BYkLgzhu9biVI5bGSKa9LWUJYhvqERg6QGL00XV3IBi0H5tE6LUxLwWtgD871Js+ZD/7mUDuYJ4IJpWr1/fYRaUBMPZc/00Kgo48URrxd3Z6rXr+4/BlyjjwJoUstr+Gtiwm8Lqzt+XDtI1VAnzd1kz0ez11QOEApjquER9Khu7gGGaFgkrscspjP84PQ2oq4AzvlV5KaVtVWG69g2QPCnLhWZoXthplBWQujCceLNO02CJTK1zgqTvikQE7pTB5omtH5MnfWoVQ5EEyowYaxUhehBHfD5LC0llHNs7vWx1NShC1S72CTcOqMoaQkRr3Vt+HgSd3Sjf1Ys5ORKo=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"56601cb13429492195a6ae8407d0b2db"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Retry-After',
  '0',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'b1fa6a13-0756-4f6c-9d81-f2e8403f4fe7',
  'x-ms-request-id',
  '65765de0-210a-40fe-bc0b-70689bb26b7e',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:30:16 GMT',
  'Content-Length',
  '1350'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/CRUDCertificateName-cangetacertificatessecretinPEMformat-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-cangetacertificatessecretinPEMformat-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA032N3u+5ELjo1OWyWq69iC5A/n+IuqdiERWj6ApcNFp3rSoG6o9TDZPLJq/4U6BX+nEyByVPCm8MV/NH29V9RaiCvxlXEfWNBPJlLomkBDZwAWrqNoU+gHvdxAPxXlT2SyDNClBQ2colLCvMRuHH/S8oSkxO+toIht7t6gqTF0NRMvXrpmww3Pu0NiR11I3mbJ4FAmx7i05lR7W1V5nFftGT0ogmrOF2x/SLz6jN0R/cinLNYqr3KjWcQ1/0MoDDlar6c8TH7NnZ00a9p2ohagCVi55j7xIAZztf80sYvgCpTk/rMxuQllhn0gYWPF9dbkcZDx1gbhHXp7SCtvxKiQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAFc2BYkLgzhu9biVI5bGSKa9LWUJYhvqERg6QGL00XV3IBi0H5tE6LUxLwWtgD871Js+ZD/7mUDuYJ4IJpWr1/fYRaUBMPZc/00Kgo48URrxd3Z6rXr+4/BlyjjwJoUstr+Gtiwm8Lqzt+XDtI1VAnzd1kz0ez11QOEApjquER9Khu7gGGaFgkrscspjP84PQ2oq4AzvlV5KaVtVWG69g2QPCnLhWZoXthplBWQujCceLNO02CJTK1zgqTvikQE7pTB5omtH5MnfWoVQ5EEyowYaxUhehBHfD5LC0llHNs7vWx1NShC1S72CTcOqMoaQkRr3Vt+HgSd3Sjf1Ys5ORKo=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"56601cb13429492195a6ae8407d0b2db"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Retry-After',
  '0',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '2c251de0-1162-4e20-9bcc-733ea04eb616',
  'x-ms-request-id',
  '29899a85-a1a0-43c0-bdf7-5d3719b9178c',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:30:18 GMT',
  'Content-Length',
  '1350'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/CRUDCertificateName-cangetacertificatessecretinPEMformat-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-cangetacertificatessecretinPEMformat-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA032N3u+5ELjo1OWyWq69iC5A/n+IuqdiERWj6ApcNFp3rSoG6o9TDZPLJq/4U6BX+nEyByVPCm8MV/NH29V9RaiCvxlXEfWNBPJlLomkBDZwAWrqNoU+gHvdxAPxXlT2SyDNClBQ2colLCvMRuHH/S8oSkxO+toIht7t6gqTF0NRMvXrpmww3Pu0NiR11I3mbJ4FAmx7i05lR7W1V5nFftGT0ogmrOF2x/SLz6jN0R/cinLNYqr3KjWcQ1/0MoDDlar6c8TH7NnZ00a9p2ohagCVi55j7xIAZztf80sYvgCpTk/rMxuQllhn0gYWPF9dbkcZDx1gbhHXp7SCtvxKiQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAFc2BYkLgzhu9biVI5bGSKa9LWUJYhvqERg6QGL00XV3IBi0H5tE6LUxLwWtgD871Js+ZD/7mUDuYJ4IJpWr1/fYRaUBMPZc/00Kgo48URrxd3Z6rXr+4/BlyjjwJoUstr+Gtiwm8Lqzt+XDtI1VAnzd1kz0ez11QOEApjquER9Khu7gGGaFgkrscspjP84PQ2oq4AzvlV5KaVtVWG69g2QPCnLhWZoXthplBWQujCceLNO02CJTK1zgqTvikQE7pTB5omtH5MnfWoVQ5EEyowYaxUhehBHfD5LC0llHNs7vWx1NShC1S72CTcOqMoaQkRr3Vt+HgSd3Sjf1Ys5ORKo=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"56601cb13429492195a6ae8407d0b2db"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Retry-After',
  '0',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'bbe0f562-5f02-418a-9eba-af0dc5beb9da',
  'x-ms-request-id',
  '621a22b5-b171-47f0-b342-a5b155630784',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:30:20 GMT',
  'Content-Length',
  '1350'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/CRUDCertificateName-cangetacertificatessecretinPEMformat-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-cangetacertificatessecretinPEMformat-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA032N3u+5ELjo1OWyWq69iC5A/n+IuqdiERWj6ApcNFp3rSoG6o9TDZPLJq/4U6BX+nEyByVPCm8MV/NH29V9RaiCvxlXEfWNBPJlLomkBDZwAWrqNoU+gHvdxAPxXlT2SyDNClBQ2colLCvMRuHH/S8oSkxO+toIht7t6gqTF0NRMvXrpmww3Pu0NiR11I3mbJ4FAmx7i05lR7W1V5nFftGT0ogmrOF2x/SLz6jN0R/cinLNYqr3KjWcQ1/0MoDDlar6c8TH7NnZ00a9p2ohagCVi55j7xIAZztf80sYvgCpTk/rMxuQllhn0gYWPF9dbkcZDx1gbhHXp7SCtvxKiQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAFc2BYkLgzhu9biVI5bGSKa9LWUJYhvqERg6QGL00XV3IBi0H5tE6LUxLwWtgD871Js+ZD/7mUDuYJ4IJpWr1/fYRaUBMPZc/00Kgo48URrxd3Z6rXr+4/BlyjjwJoUstr+Gtiwm8Lqzt+XDtI1VAnzd1kz0ez11QOEApjquER9Khu7gGGaFgkrscspjP84PQ2oq4AzvlV5KaVtVWG69g2QPCnLhWZoXthplBWQujCceLNO02CJTK1zgqTvikQE7pTB5omtH5MnfWoVQ5EEyowYaxUhehBHfD5LC0llHNs7vWx1NShC1S72CTcOqMoaQkRr3Vt+HgSd3Sjf1Ys5ORKo=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"56601cb13429492195a6ae8407d0b2db"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Retry-After',
  '0',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '495ee36f-ea90-4f61-99d7-0bd675ab8039',
  'x-ms-request-id',
  'f80ceb3b-8b14-4d1e-a1e1-4fb96cb0be85',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:30:21 GMT',
  'Content-Length',
  '1350'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/CRUDCertificateName-cangetacertificatessecretinPEMformat-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-cangetacertificatessecretinPEMformat-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA032N3u+5ELjo1OWyWq69iC5A/n+IuqdiERWj6ApcNFp3rSoG6o9TDZPLJq/4U6BX+nEyByVPCm8MV/NH29V9RaiCvxlXEfWNBPJlLomkBDZwAWrqNoU+gHvdxAPxXlT2SyDNClBQ2colLCvMRuHH/S8oSkxO+toIht7t6gqTF0NRMvXrpmww3Pu0NiR11I3mbJ4FAmx7i05lR7W1V5nFftGT0ogmrOF2x/SLz6jN0R/cinLNYqr3KjWcQ1/0MoDDlar6c8TH7NnZ00a9p2ohagCVi55j7xIAZztf80sYvgCpTk/rMxuQllhn0gYWPF9dbkcZDx1gbhHXp7SCtvxKiQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAFc2BYkLgzhu9biVI5bGSKa9LWUJYhvqERg6QGL00XV3IBi0H5tE6LUxLwWtgD871Js+ZD/7mUDuYJ4IJpWr1/fYRaUBMPZc/00Kgo48URrxd3Z6rXr+4/BlyjjwJoUstr+Gtiwm8Lqzt+XDtI1VAnzd1kz0ez11QOEApjquER9Khu7gGGaFgkrscspjP84PQ2oq4AzvlV5KaVtVWG69g2QPCnLhWZoXthplBWQujCceLNO02CJTK1zgqTvikQE7pTB5omtH5MnfWoVQ5EEyowYaxUhehBHfD5LC0llHNs7vWx1NShC1S72CTcOqMoaQkRr3Vt+HgSd3Sjf1Ys5ORKo=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"56601cb13429492195a6ae8407d0b2db"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Retry-After',
  '0',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '9e94e283-86a2-45fd-87fe-7166ad36b1d7',
  'x-ms-request-id',
  'a567507d-342a-42ed-bb01-04c43fdc1054',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:30:23 GMT',
  'Content-Length',
  '1350'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/CRUDCertificateName-cangetacertificatessecretinPEMformat-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-cangetacertificatessecretinPEMformat-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA032N3u+5ELjo1OWyWq69iC5A/n+IuqdiERWj6ApcNFp3rSoG6o9TDZPLJq/4U6BX+nEyByVPCm8MV/NH29V9RaiCvxlXEfWNBPJlLomkBDZwAWrqNoU+gHvdxAPxXlT2SyDNClBQ2colLCvMRuHH/S8oSkxO+toIht7t6gqTF0NRMvXrpmww3Pu0NiR11I3mbJ4FAmx7i05lR7W1V5nFftGT0ogmrOF2x/SLz6jN0R/cinLNYqr3KjWcQ1/0MoDDlar6c8TH7NnZ00a9p2ohagCVi55j7xIAZztf80sYvgCpTk/rMxuQllhn0gYWPF9dbkcZDx1gbhHXp7SCtvxKiQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAFc2BYkLgzhu9biVI5bGSKa9LWUJYhvqERg6QGL00XV3IBi0H5tE6LUxLwWtgD871Js+ZD/7mUDuYJ4IJpWr1/fYRaUBMPZc/00Kgo48URrxd3Z6rXr+4/BlyjjwJoUstr+Gtiwm8Lqzt+XDtI1VAnzd1kz0ez11QOEApjquER9Khu7gGGaFgkrscspjP84PQ2oq4AzvlV5KaVtVWG69g2QPCnLhWZoXthplBWQujCceLNO02CJTK1zgqTvikQE7pTB5omtH5MnfWoVQ5EEyowYaxUhehBHfD5LC0llHNs7vWx1NShC1S72CTcOqMoaQkRr3Vt+HgSd3Sjf1Ys5ORKo=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"56601cb13429492195a6ae8407d0b2db"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Retry-After',
  '0',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '2d45353a-9635-4ac3-8028-ebd921d3f72c',
  'x-ms-request-id',
  'd320591d-5746-42b5-9a63-00eaf18c2dcd',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:30:26 GMT',
  'Content-Length',
  '1350'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/CRUDCertificateName-cangetacertificatessecretinPEMformat-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-cangetacertificatessecretinPEMformat-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA032N3u+5ELjo1OWyWq69iC5A/n+IuqdiERWj6ApcNFp3rSoG6o9TDZPLJq/4U6BX+nEyByVPCm8MV/NH29V9RaiCvxlXEfWNBPJlLomkBDZwAWrqNoU+gHvdxAPxXlT2SyDNClBQ2colLCvMRuHH/S8oSkxO+toIht7t6gqTF0NRMvXrpmww3Pu0NiR11I3mbJ4FAmx7i05lR7W1V5nFftGT0ogmrOF2x/SLz6jN0R/cinLNYqr3KjWcQ1/0MoDDlar6c8TH7NnZ00a9p2ohagCVi55j7xIAZztf80sYvgCpTk/rMxuQllhn0gYWPF9dbkcZDx1gbhHXp7SCtvxKiQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAFc2BYkLgzhu9biVI5bGSKa9LWUJYhvqERg6QGL00XV3IBi0H5tE6LUxLwWtgD871Js+ZD/7mUDuYJ4IJpWr1/fYRaUBMPZc/00Kgo48URrxd3Z6rXr+4/BlyjjwJoUstr+Gtiwm8Lqzt+XDtI1VAnzd1kz0ez11QOEApjquER9Khu7gGGaFgkrscspjP84PQ2oq4AzvlV5KaVtVWG69g2QPCnLhWZoXthplBWQujCceLNO02CJTK1zgqTvikQE7pTB5omtH5MnfWoVQ5EEyowYaxUhehBHfD5LC0llHNs7vWx1NShC1S72CTcOqMoaQkRr3Vt+HgSd3Sjf1Ys5ORKo=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"56601cb13429492195a6ae8407d0b2db"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Retry-After',
  '0',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '6f9e311a-301c-45d4-a824-913507d40fd5',
  'x-ms-request-id',
  'dbfbd134-8e8e-48df-a543-876dd26a601e',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:30:28 GMT',
  'Content-Length',
  '1350'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/CRUDCertificateName-cangetacertificatessecretinPEMformat-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-cangetacertificatessecretinPEMformat-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA032N3u+5ELjo1OWyWq69iC5A/n+IuqdiERWj6ApcNFp3rSoG6o9TDZPLJq/4U6BX+nEyByVPCm8MV/NH29V9RaiCvxlXEfWNBPJlLomkBDZwAWrqNoU+gHvdxAPxXlT2SyDNClBQ2colLCvMRuHH/S8oSkxO+toIht7t6gqTF0NRMvXrpmww3Pu0NiR11I3mbJ4FAmx7i05lR7W1V5nFftGT0ogmrOF2x/SLz6jN0R/cinLNYqr3KjWcQ1/0MoDDlar6c8TH7NnZ00a9p2ohagCVi55j7xIAZztf80sYvgCpTk/rMxuQllhn0gYWPF9dbkcZDx1gbhHXp7SCtvxKiQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAFc2BYkLgzhu9biVI5bGSKa9LWUJYhvqERg6QGL00XV3IBi0H5tE6LUxLwWtgD871Js+ZD/7mUDuYJ4IJpWr1/fYRaUBMPZc/00Kgo48URrxd3Z6rXr+4/BlyjjwJoUstr+Gtiwm8Lqzt+XDtI1VAnzd1kz0ez11QOEApjquER9Khu7gGGaFgkrscspjP84PQ2oq4AzvlV5KaVtVWG69g2QPCnLhWZoXthplBWQujCceLNO02CJTK1zgqTvikQE7pTB5omtH5MnfWoVQ5EEyowYaxUhehBHfD5LC0llHNs7vWx1NShC1S72CTcOqMoaQkRr3Vt+HgSd3Sjf1Ys5ORKo=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"56601cb13429492195a6ae8407d0b2db"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Retry-After',
  '0',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'c44cff85-d1c3-4c49-abb4-eb42f87f4a82',
  'x-ms-request-id',
  'd8aabfc6-0ebc-4727-88e4-07907ac24471',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:30:30 GMT',
  'Content-Length',
  '1350'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/CRUDCertificateName-cangetacertificatessecretinPEMformat-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-cangetacertificatessecretinPEMformat-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA032N3u+5ELjo1OWyWq69iC5A/n+IuqdiERWj6ApcNFp3rSoG6o9TDZPLJq/4U6BX+nEyByVPCm8MV/NH29V9RaiCvxlXEfWNBPJlLomkBDZwAWrqNoU+gHvdxAPxXlT2SyDNClBQ2colLCvMRuHH/S8oSkxO+toIht7t6gqTF0NRMvXrpmww3Pu0NiR11I3mbJ4FAmx7i05lR7W1V5nFftGT0ogmrOF2x/SLz6jN0R/cinLNYqr3KjWcQ1/0MoDDlar6c8TH7NnZ00a9p2ohagCVi55j7xIAZztf80sYvgCpTk/rMxuQllhn0gYWPF9dbkcZDx1gbhHXp7SCtvxKiQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAFc2BYkLgzhu9biVI5bGSKa9LWUJYhvqERg6QGL00XV3IBi0H5tE6LUxLwWtgD871Js+ZD/7mUDuYJ4IJpWr1/fYRaUBMPZc/00Kgo48URrxd3Z6rXr+4/BlyjjwJoUstr+Gtiwm8Lqzt+XDtI1VAnzd1kz0ez11QOEApjquER9Khu7gGGaFgkrscspjP84PQ2oq4AzvlV5KaVtVWG69g2QPCnLhWZoXthplBWQujCceLNO02CJTK1zgqTvikQE7pTB5omtH5MnfWoVQ5EEyowYaxUhehBHfD5LC0llHNs7vWx1NShC1S72CTcOqMoaQkRr3Vt+HgSd3Sjf1Ys5ORKo=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"56601cb13429492195a6ae8407d0b2db"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Retry-After',
  '0',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'ead2cb99-e470-43d9-9ce8-75111871aa29',
  'x-ms-request-id',
  'c84e244e-fcc1-4381-abb5-06717a92ffea',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:30:32 GMT',
  'Content-Length',
  '1350'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/CRUDCertificateName-cangetacertificatessecretinPEMformat-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-cangetacertificatessecretinPEMformat-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA032N3u+5ELjo1OWyWq69iC5A/n+IuqdiERWj6ApcNFp3rSoG6o9TDZPLJq/4U6BX+nEyByVPCm8MV/NH29V9RaiCvxlXEfWNBPJlLomkBDZwAWrqNoU+gHvdxAPxXlT2SyDNClBQ2colLCvMRuHH/S8oSkxO+toIht7t6gqTF0NRMvXrpmww3Pu0NiR11I3mbJ4FAmx7i05lR7W1V5nFftGT0ogmrOF2x/SLz6jN0R/cinLNYqr3KjWcQ1/0MoDDlar6c8TH7NnZ00a9p2ohagCVi55j7xIAZztf80sYvgCpTk/rMxuQllhn0gYWPF9dbkcZDx1gbhHXp7SCtvxKiQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAFc2BYkLgzhu9biVI5bGSKa9LWUJYhvqERg6QGL00XV3IBi0H5tE6LUxLwWtgD871Js+ZD/7mUDuYJ4IJpWr1/fYRaUBMPZc/00Kgo48URrxd3Z6rXr+4/BlyjjwJoUstr+Gtiwm8Lqzt+XDtI1VAnzd1kz0ez11QOEApjquER9Khu7gGGaFgkrscspjP84PQ2oq4AzvlV5KaVtVWG69g2QPCnLhWZoXthplBWQujCceLNO02CJTK1zgqTvikQE7pTB5omtH5MnfWoVQ5EEyowYaxUhehBHfD5LC0llHNs7vWx1NShC1S72CTcOqMoaQkRr3Vt+HgSd3Sjf1Ys5ORKo=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"56601cb13429492195a6ae8407d0b2db"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Retry-After',
  '0',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '9ce24a2c-8661-4145-9a0f-14ef76590232',
  'x-ms-request-id',
  '21258be1-f3d1-4c2e-93bd-9a8c813ec8ed',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:30:34 GMT',
  'Content-Length',
  '1350'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/CRUDCertificateName-cangetacertificatessecretinPEMformat-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-cangetacertificatessecretinPEMformat-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA032N3u+5ELjo1OWyWq69iC5A/n+IuqdiERWj6ApcNFp3rSoG6o9TDZPLJq/4U6BX+nEyByVPCm8MV/NH29V9RaiCvxlXEfWNBPJlLomkBDZwAWrqNoU+gHvdxAPxXlT2SyDNClBQ2colLCvMRuHH/S8oSkxO+toIht7t6gqTF0NRMvXrpmww3Pu0NiR11I3mbJ4FAmx7i05lR7W1V5nFftGT0ogmrOF2x/SLz6jN0R/cinLNYqr3KjWcQ1/0MoDDlar6c8TH7NnZ00a9p2ohagCVi55j7xIAZztf80sYvgCpTk/rMxuQllhn0gYWPF9dbkcZDx1gbhHXp7SCtvxKiQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAFc2BYkLgzhu9biVI5bGSKa9LWUJYhvqERg6QGL00XV3IBi0H5tE6LUxLwWtgD871Js+ZD/7mUDuYJ4IJpWr1/fYRaUBMPZc/00Kgo48URrxd3Z6rXr+4/BlyjjwJoUstr+Gtiwm8Lqzt+XDtI1VAnzd1kz0ez11QOEApjquER9Khu7gGGaFgkrscspjP84PQ2oq4AzvlV5KaVtVWG69g2QPCnLhWZoXthplBWQujCceLNO02CJTK1zgqTvikQE7pTB5omtH5MnfWoVQ5EEyowYaxUhehBHfD5LC0llHNs7vWx1NShC1S72CTcOqMoaQkRr3Vt+HgSd3Sjf1Ys5ORKo=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"56601cb13429492195a6ae8407d0b2db"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Retry-After',
  '0',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '225cffff-c33c-4edf-9a34-aeca9343d0ac',
  'x-ms-request-id',
  'e87f4401-dbc7-4736-b559-14dc72e28c2f',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:30:36 GMT',
  'Content-Length',
  '1350'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/CRUDCertificateName-cangetacertificatessecretinPEMformat-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-cangetacertificatessecretinPEMformat-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA032N3u+5ELjo1OWyWq69iC5A/n+IuqdiERWj6ApcNFp3rSoG6o9TDZPLJq/4U6BX+nEyByVPCm8MV/NH29V9RaiCvxlXEfWNBPJlLomkBDZwAWrqNoU+gHvdxAPxXlT2SyDNClBQ2colLCvMRuHH/S8oSkxO+toIht7t6gqTF0NRMvXrpmww3Pu0NiR11I3mbJ4FAmx7i05lR7W1V5nFftGT0ogmrOF2x/SLz6jN0R/cinLNYqr3KjWcQ1/0MoDDlar6c8TH7NnZ00a9p2ohagCVi55j7xIAZztf80sYvgCpTk/rMxuQllhn0gYWPF9dbkcZDx1gbhHXp7SCtvxKiQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAFc2BYkLgzhu9biVI5bGSKa9LWUJYhvqERg6QGL00XV3IBi0H5tE6LUxLwWtgD871Js+ZD/7mUDuYJ4IJpWr1/fYRaUBMPZc/00Kgo48URrxd3Z6rXr+4/BlyjjwJoUstr+Gtiwm8Lqzt+XDtI1VAnzd1kz0ez11QOEApjquER9Khu7gGGaFgkrscspjP84PQ2oq4AzvlV5KaVtVWG69g2QPCnLhWZoXthplBWQujCceLNO02CJTK1zgqTvikQE7pTB5omtH5MnfWoVQ5EEyowYaxUhehBHfD5LC0llHNs7vWx1NShC1S72CTcOqMoaQkRr3Vt+HgSd3Sjf1Ys5ORKo=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"56601cb13429492195a6ae8407d0b2db"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Retry-After',
  '0',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '1e8bf494-1779-40ce-937c-f44df2c8f137',
  'x-ms-request-id',
  'eefcbb51-b83d-4d17-9817-6566db04f3af',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:30:39 GMT',
  'Content-Length',
  '1350'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/CRUDCertificateName-cangetacertificatessecretinPEMformat-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-cangetacertificatessecretinPEMformat-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA032N3u+5ELjo1OWyWq69iC5A/n+IuqdiERWj6ApcNFp3rSoG6o9TDZPLJq/4U6BX+nEyByVPCm8MV/NH29V9RaiCvxlXEfWNBPJlLomkBDZwAWrqNoU+gHvdxAPxXlT2SyDNClBQ2colLCvMRuHH/S8oSkxO+toIht7t6gqTF0NRMvXrpmww3Pu0NiR11I3mbJ4FAmx7i05lR7W1V5nFftGT0ogmrOF2x/SLz6jN0R/cinLNYqr3KjWcQ1/0MoDDlar6c8TH7NnZ00a9p2ohagCVi55j7xIAZztf80sYvgCpTk/rMxuQllhn0gYWPF9dbkcZDx1gbhHXp7SCtvxKiQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAFc2BYkLgzhu9biVI5bGSKa9LWUJYhvqERg6QGL00XV3IBi0H5tE6LUxLwWtgD871Js+ZD/7mUDuYJ4IJpWr1/fYRaUBMPZc/00Kgo48URrxd3Z6rXr+4/BlyjjwJoUstr+Gtiwm8Lqzt+XDtI1VAnzd1kz0ez11QOEApjquER9Khu7gGGaFgkrscspjP84PQ2oq4AzvlV5KaVtVWG69g2QPCnLhWZoXthplBWQujCceLNO02CJTK1zgqTvikQE7pTB5omtH5MnfWoVQ5EEyowYaxUhehBHfD5LC0llHNs7vWx1NShC1S72CTcOqMoaQkRr3Vt+HgSd3Sjf1Ys5ORKo=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"56601cb13429492195a6ae8407d0b2db"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Retry-After',
  '0',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '8d81edad-d152-4e14-b828-609573cca278',
  'x-ms-request-id',
  'db62f265-3342-4f94-8ede-f36dfbfaa65a',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:30:41 GMT',
  'Content-Length',
  '1350'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/CRUDCertificateName-cangetacertificatessecretinPEMformat-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-cangetacertificatessecretinPEMformat-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA032N3u+5ELjo1OWyWq69iC5A/n+IuqdiERWj6ApcNFp3rSoG6o9TDZPLJq/4U6BX+nEyByVPCm8MV/NH29V9RaiCvxlXEfWNBPJlLomkBDZwAWrqNoU+gHvdxAPxXlT2SyDNClBQ2colLCvMRuHH/S8oSkxO+toIht7t6gqTF0NRMvXrpmww3Pu0NiR11I3mbJ4FAmx7i05lR7W1V5nFftGT0ogmrOF2x/SLz6jN0R/cinLNYqr3KjWcQ1/0MoDDlar6c8TH7NnZ00a9p2ohagCVi55j7xIAZztf80sYvgCpTk/rMxuQllhn0gYWPF9dbkcZDx1gbhHXp7SCtvxKiQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAFc2BYkLgzhu9biVI5bGSKa9LWUJYhvqERg6QGL00XV3IBi0H5tE6LUxLwWtgD871Js+ZD/7mUDuYJ4IJpWr1/fYRaUBMPZc/00Kgo48URrxd3Z6rXr+4/BlyjjwJoUstr+Gtiwm8Lqzt+XDtI1VAnzd1kz0ez11QOEApjquER9Khu7gGGaFgkrscspjP84PQ2oq4AzvlV5KaVtVWG69g2QPCnLhWZoXthplBWQujCceLNO02CJTK1zgqTvikQE7pTB5omtH5MnfWoVQ5EEyowYaxUhehBHfD5LC0llHNs7vWx1NShC1S72CTcOqMoaQkRr3Vt+HgSd3Sjf1Ys5ORKo=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"56601cb13429492195a6ae8407d0b2db"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Retry-After',
  '0',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '0940179d-71a1-4865-b201-466ac3f4326f',
  'x-ms-request-id',
  '17b92378-4202-4abe-887b-f8a417ad5052',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:30:43 GMT',
  'Content-Length',
  '1350'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/CRUDCertificateName-cangetacertificatessecretinPEMformat-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-cangetacertificatessecretinPEMformat-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA032N3u+5ELjo1OWyWq69iC5A/n+IuqdiERWj6ApcNFp3rSoG6o9TDZPLJq/4U6BX+nEyByVPCm8MV/NH29V9RaiCvxlXEfWNBPJlLomkBDZwAWrqNoU+gHvdxAPxXlT2SyDNClBQ2colLCvMRuHH/S8oSkxO+toIht7t6gqTF0NRMvXrpmww3Pu0NiR11I3mbJ4FAmx7i05lR7W1V5nFftGT0ogmrOF2x/SLz6jN0R/cinLNYqr3KjWcQ1/0MoDDlar6c8TH7NnZ00a9p2ohagCVi55j7xIAZztf80sYvgCpTk/rMxuQllhn0gYWPF9dbkcZDx1gbhHXp7SCtvxKiQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAFc2BYkLgzhu9biVI5bGSKa9LWUJYhvqERg6QGL00XV3IBi0H5tE6LUxLwWtgD871Js+ZD/7mUDuYJ4IJpWr1/fYRaUBMPZc/00Kgo48URrxd3Z6rXr+4/BlyjjwJoUstr+Gtiwm8Lqzt+XDtI1VAnzd1kz0ez11QOEApjquER9Khu7gGGaFgkrscspjP84PQ2oq4AzvlV5KaVtVWG69g2QPCnLhWZoXthplBWQujCceLNO02CJTK1zgqTvikQE7pTB5omtH5MnfWoVQ5EEyowYaxUhehBHfD5LC0llHNs7vWx1NShC1S72CTcOqMoaQkRr3Vt+HgSd3Sjf1Ys5ORKo=","cancellation_requested":false,"status":"completed","target":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-cangetacertificatessecretinPEMformat-","request_id":"56601cb13429492195a6ae8407d0b2db"}, [
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
  '196d17da-a2ee-48e0-ac55-768b491154d7',
  'x-ms-request-id',
  '15316022-f95d-422a-99b6-288f4f48df5b',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:30:45 GMT',
  'Content-Length',
  '1327'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/CRUDCertificateName-cangetacertificatessecretinPEMformat-/')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-cangetacertificatessecretinPEMformat-/841ddc574dc84f259fbd9bb193bc3af4","kid":"https://keyvault_name.vault.azure.net/keys/CRUDCertificateName-cangetacertificatessecretinPEMformat-/841ddc574dc84f259fbd9bb193bc3af4","sid":"https://keyvault_name.vault.azure.net/secrets/CRUDCertificateName-cangetacertificatessecretinPEMformat-/841ddc574dc84f259fbd9bb193bc3af4","x5t":"wK6DWByBYdHkmBR2SKhQ2Oq8m0A","cer":"MIIDKDCCAhCgAwIBAgIQKvmE3HDJSei3T5uVrH3NaDANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjEwNDI4MjAyMDQ0WhcNMjIwNDI4MjAzMDQ0WjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQDTfY3e77kQuOjU5bJarr2ILkD+f4i6p2IRFaPoClw0WnetKgbqj1MNk8smr/hToFf6cTIHJU8KbwxX80fb1X1FqIK/GVcR9Y0E8mUuiaQENnABauo2hT6Ae93EA/FeVPZLIM0KUFDZyiUsK8xG4cf9LyhKTE762giG3u3qCpMXQ1Ey9eumbDDc+7Q2JHXUjeZsngUCbHuLTmVHtbVXmcV+0ZPSiCas4XbH9IvPqM3RH9yKcs1iqvcqNZxDX/QygMOVqvpzxMfs2dnTRr2naiFqAJWLnmPvEgBnO1/zSxi+AKlOT+szG5CWWGfSBhY8X11uRxkPHWBuEdentIK2/EqJAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBSdone7CK6N7izBFsbm3cGG+5i5xDAdBgNVHQ4EFgQUnaJ3uwiuje4swRbG5t3BhvuYucQwDQYJKoZIhvcNAQELBQADggEBAHCuGOSryZ6vhFXwuDbgdz7KKtJc7ueskdmPqNW9Udb52p2LNzfQSSOwvdaYZNb4NO4HCfED3JrkrUddV0Pyy29qqQBzZr99QN7p9kWItFQ++NYoyr9vaydtPZr8yDcUSuvDvsC81nokF2nE6HL1E3u4VkB2yCstV0AFTA6kjP5GvUYWMIhHdVLtG8Lfg9m2xWO8e4dsSujWAJ5iK3E6NX9/Fib5eNZwu7j5ub/J2Nw3q4hpL/781T85aVA3A/XUsYUKXt5VAaZGcuGWVzDE/OKMbdgFwX8aMXgEzRjwAqw5PBc5/MVN5kRS5qGNVibiYtW+dKCVQ1sfHOmHDgOQ7po=","attributes":{"enabled":true,"nbf":1619641244,"exp":1651177844,"created":1619641844,"updated":1619641844,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-cangetacertificatessecretinPEMformat-/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pem-file"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1619641760,"updated":1619641760}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-cangetacertificatessecretinPEMformat-/pending"}}, [
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
  'ac81f5ca-4d34-487a-904f-54bf0d4dc536',
  'x-ms-request-id',
  'd35de42e-44f0-45fe-a2dd-24fff55b3965',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:30:45 GMT',
  'Content-Length',
  '2642'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/CRUDCertificateName-cangetacertificatessecretinPEMformat-/')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-cangetacertificatessecretinPEMformat-/841ddc574dc84f259fbd9bb193bc3af4","kid":"https://keyvault_name.vault.azure.net/keys/CRUDCertificateName-cangetacertificatessecretinPEMformat-/841ddc574dc84f259fbd9bb193bc3af4","sid":"https://keyvault_name.vault.azure.net/secrets/CRUDCertificateName-cangetacertificatessecretinPEMformat-/841ddc574dc84f259fbd9bb193bc3af4","x5t":"wK6DWByBYdHkmBR2SKhQ2Oq8m0A","cer":"MIIDKDCCAhCgAwIBAgIQKvmE3HDJSei3T5uVrH3NaDANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjEwNDI4MjAyMDQ0WhcNMjIwNDI4MjAzMDQ0WjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQDTfY3e77kQuOjU5bJarr2ILkD+f4i6p2IRFaPoClw0WnetKgbqj1MNk8smr/hToFf6cTIHJU8KbwxX80fb1X1FqIK/GVcR9Y0E8mUuiaQENnABauo2hT6Ae93EA/FeVPZLIM0KUFDZyiUsK8xG4cf9LyhKTE762giG3u3qCpMXQ1Ey9eumbDDc+7Q2JHXUjeZsngUCbHuLTmVHtbVXmcV+0ZPSiCas4XbH9IvPqM3RH9yKcs1iqvcqNZxDX/QygMOVqvpzxMfs2dnTRr2naiFqAJWLnmPvEgBnO1/zSxi+AKlOT+szG5CWWGfSBhY8X11uRxkPHWBuEdentIK2/EqJAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBSdone7CK6N7izBFsbm3cGG+5i5xDAdBgNVHQ4EFgQUnaJ3uwiuje4swRbG5t3BhvuYucQwDQYJKoZIhvcNAQELBQADggEBAHCuGOSryZ6vhFXwuDbgdz7KKtJc7ueskdmPqNW9Udb52p2LNzfQSSOwvdaYZNb4NO4HCfED3JrkrUddV0Pyy29qqQBzZr99QN7p9kWItFQ++NYoyr9vaydtPZr8yDcUSuvDvsC81nokF2nE6HL1E3u4VkB2yCstV0AFTA6kjP5GvUYWMIhHdVLtG8Lfg9m2xWO8e4dsSujWAJ5iK3E6NX9/Fib5eNZwu7j5ub/J2Nw3q4hpL/781T85aVA3A/XUsYUKXt5VAaZGcuGWVzDE/OKMbdgFwX8aMXgEzRjwAqw5PBc5/MVN5kRS5qGNVibiYtW+dKCVQ1sfHOmHDgOQ7po=","attributes":{"enabled":true,"nbf":1619641244,"exp":1651177844,"created":1619641844,"updated":1619641844,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-cangetacertificatessecretinPEMformat-/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pem-file"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1619641760,"updated":1619641760}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-cangetacertificatessecretinPEMformat-/pending"}}, [
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
  'dc36cb10-653d-4c08-99ca-cd985118b3c4',
  'x-ms-request-id',
  '4d150c8b-29a3-4f0e-a981-eea363c37c29',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:30:45 GMT',
  'Content-Length',
  '2642'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/secrets/CRUDCertificateName-cangetacertificatessecretinPEMformat-/')
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
  '10814e0c-b620-44ed-97b1-d0dbb872311a',
  'x-ms-request-id',
  'e7ea7d5e-d966-430a-a08c-2a94b7add23c',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:30:45 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/secrets/CRUDCertificateName-cangetacertificatessecretinPEMformat-/')
  .query(true)
  .reply(200, {"value":"-----BEGIN PRIVATE KEY-----\nplaceholder\n-----END PRIVATE KEY-----\n-----BEGIN CERTIFICATE-----\nMIIDKDCCAhCgAwIBAgIQKvmE3HDJSei3T5uVrH3NaDANBgkqhkiG9w0BAQsFADAR\nMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjEwNDI4MjAyMDQ0WhcNMjIwNDI4MjAzMDQ0\nWjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEK\nAoIBAQDTfY3e77kQuOjU5bJarr2ILkD+f4i6p2IRFaPoClw0WnetKgbqj1MNk8sm\nr/hToFf6cTIHJU8KbwxX80fb1X1FqIK/GVcR9Y0E8mUuiaQENnABauo2hT6Ae93E\nA/FeVPZLIM0KUFDZyiUsK8xG4cf9LyhKTE762giG3u3qCpMXQ1Ey9eumbDDc+7Q2\nJHXUjeZsngUCbHuLTmVHtbVXmcV+0ZPSiCas4XbH9IvPqM3RH9yKcs1iqvcqNZxD\nX/QygMOVqvpzxMfs2dnTRr2naiFqAJWLnmPvEgBnO1/zSxi+AKlOT+szG5CWWGfS\nBhY8X11uRxkPHWBuEdentIK2/EqJAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJ\nBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSME\nGDAWgBSdone7CK6N7izBFsbm3cGG+5i5xDAdBgNVHQ4EFgQUnaJ3uwiuje4swRbG\n5t3BhvuYucQwDQYJKoZIhvcNAQELBQADggEBAHCuGOSryZ6vhFXwuDbgdz7KKtJc\n7ueskdmPqNW9Udb52p2LNzfQSSOwvdaYZNb4NO4HCfED3JrkrUddV0Pyy29qqQBz\nZr99QN7p9kWItFQ++NYoyr9vaydtPZr8yDcUSuvDvsC81nokF2nE6HL1E3u4VkB2\nyCstV0AFTA6kjP5GvUYWMIhHdVLtG8Lfg9m2xWO8e4dsSujWAJ5iK3E6NX9/Fib5\neNZwu7j5ub/J2Nw3q4hpL/781T85aVA3A/XUsYUKXt5VAaZGcuGWVzDE/OKMbdgF\nwX8aMXgEzRjwAqw5PBc5/MVN5kRS5qGNVibiYtW+dKCVQ1sfHOmHDgOQ7po=\n-----END CERTIFICATE-----\n","contentType":"application/x-pem-file","id":"https://keyvault_name.vault.azure.net/secrets/CRUDCertificateName-cangetacertificatessecretinPEMformat-/841ddc574dc84f259fbd9bb193bc3af4","managed":true,"attributes":{"enabled":true,"nbf":1619641244,"exp":1651177844,"created":1619641844,"updated":1619641844,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90},"kid":"https://keyvault_name.vault.azure.net/keys/CRUDCertificateName-cangetacertificatessecretinPEMformat-/841ddc574dc84f259fbd9bb193bc3af4"}, [
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
  '10814e0c-b620-44ed-97b1-d0dbb872311a',
  'x-ms-request-id',
  'ce8c4944-85a3-4274-8284-44f0bdb7d335',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:30:45 GMT',
  'Content-Length',
  '3469'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/certificates/CRUDCertificateName-cangetacertificatessecretinPEMformat-')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/CRUDCertificateName-cangetacertificatessecretinPEMformat-","deletedDate":1619641846,"scheduledPurgeDate":1627417846,"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-cangetacertificatessecretinPEMformat-/841ddc574dc84f259fbd9bb193bc3af4","kid":"https://keyvault_name.vault.azure.net/keys/CRUDCertificateName-cangetacertificatessecretinPEMformat-/841ddc574dc84f259fbd9bb193bc3af4","sid":"https://keyvault_name.vault.azure.net/secrets/CRUDCertificateName-cangetacertificatessecretinPEMformat-/841ddc574dc84f259fbd9bb193bc3af4","x5t":"wK6DWByBYdHkmBR2SKhQ2Oq8m0A","cer":"MIIDKDCCAhCgAwIBAgIQKvmE3HDJSei3T5uVrH3NaDANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjEwNDI4MjAyMDQ0WhcNMjIwNDI4MjAzMDQ0WjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQDTfY3e77kQuOjU5bJarr2ILkD+f4i6p2IRFaPoClw0WnetKgbqj1MNk8smr/hToFf6cTIHJU8KbwxX80fb1X1FqIK/GVcR9Y0E8mUuiaQENnABauo2hT6Ae93EA/FeVPZLIM0KUFDZyiUsK8xG4cf9LyhKTE762giG3u3qCpMXQ1Ey9eumbDDc+7Q2JHXUjeZsngUCbHuLTmVHtbVXmcV+0ZPSiCas4XbH9IvPqM3RH9yKcs1iqvcqNZxDX/QygMOVqvpzxMfs2dnTRr2naiFqAJWLnmPvEgBnO1/zSxi+AKlOT+szG5CWWGfSBhY8X11uRxkPHWBuEdentIK2/EqJAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBSdone7CK6N7izBFsbm3cGG+5i5xDAdBgNVHQ4EFgQUnaJ3uwiuje4swRbG5t3BhvuYucQwDQYJKoZIhvcNAQELBQADggEBAHCuGOSryZ6vhFXwuDbgdz7KKtJc7ueskdmPqNW9Udb52p2LNzfQSSOwvdaYZNb4NO4HCfED3JrkrUddV0Pyy29qqQBzZr99QN7p9kWItFQ++NYoyr9vaydtPZr8yDcUSuvDvsC81nokF2nE6HL1E3u4VkB2yCstV0AFTA6kjP5GvUYWMIhHdVLtG8Lfg9m2xWO8e4dsSujWAJ5iK3E6NX9/Fib5eNZwu7j5ub/J2Nw3q4hpL/781T85aVA3A/XUsYUKXt5VAaZGcuGWVzDE/OKMbdgFwX8aMXgEzRjwAqw5PBc5/MVN5kRS5qGNVibiYtW+dKCVQ1sfHOmHDgOQ7po=","attributes":{"enabled":true,"nbf":1619641244,"exp":1651177844,"created":1619641844,"updated":1619641844,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-cangetacertificatessecretinPEMformat-/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pem-file"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1619641760,"updated":1619641760}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-cangetacertificatessecretinPEMformat-/pending"}}, [
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
  '5df7dafd-e592-4246-a26f-76b61d1a2a18',
  'x-ms-request-id',
  'bfaede48-395e-4c00-b52e-8480b59f3066',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:30:46 GMT',
  'Content-Length',
  '2852'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/CRUDCertificateName-cangetacertificatessecretinPEMformat-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: CRUDCertificateName-cangetacertificatessecretinPEMformat-"}}, [
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
  'a681c6e6-b510-43c0-9ad9-c4af8f4d2857',
  'x-ms-request-id',
  '6e2949f0-9e3c-4e95-9e52-6e76c0f25924',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:30:46 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/CRUDCertificateName-cangetacertificatessecretinPEMformat-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: CRUDCertificateName-cangetacertificatessecretinPEMformat-"}}, [
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
  '869fa942-88a3-45eb-9fc9-48d9f99f0e99',
  'x-ms-request-id',
  '0d12ae2d-5224-4454-9bbe-578356a7b7cb',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:30:46 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/CRUDCertificateName-cangetacertificatessecretinPEMformat-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: CRUDCertificateName-cangetacertificatessecretinPEMformat-"}}, [
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
  'df262d49-9102-4527-a0e4-1b24ec504151',
  'x-ms-request-id',
  '906c9ad3-11bd-445f-879e-dd3f7593b4a8',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:30:48 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/CRUDCertificateName-cangetacertificatessecretinPEMformat-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: CRUDCertificateName-cangetacertificatessecretinPEMformat-"}}, [
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
  '2ea17e46-01de-4cb4-82e9-2f3d8192e706',
  'x-ms-request-id',
  'ca10aa2d-d730-40d0-adfe-ddcc767577a2',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:30:50 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/CRUDCertificateName-cangetacertificatessecretinPEMformat-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: CRUDCertificateName-cangetacertificatessecretinPEMformat-"}}, [
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
  '279e760d-9fb4-47cd-a55c-1f5fed44fe53',
  'x-ms-request-id',
  'b5899373-713c-4ea1-a0a1-9906e76131dd',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:30:51 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/CRUDCertificateName-cangetacertificatessecretinPEMformat-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: CRUDCertificateName-cangetacertificatessecretinPEMformat-"}}, [
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
  '301e86c1-c24a-40a3-a669-aa2274619144',
  'x-ms-request-id',
  'c7029d7a-e252-4b07-9619-8d8053bcfc4a',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:30:53 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/CRUDCertificateName-cangetacertificatessecretinPEMformat-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: CRUDCertificateName-cangetacertificatessecretinPEMformat-"}}, [
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
  '7eb2bc5c-df13-4c5a-9205-4f57f5ac0976',
  'x-ms-request-id',
  '7d687813-b5cf-4557-9d63-4800b2fd14c0',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:30:55 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/CRUDCertificateName-cangetacertificatessecretinPEMformat-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: CRUDCertificateName-cangetacertificatessecretinPEMformat-"}}, [
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
  '21f4383e-ee9b-4987-84f1-0c63a5f8df57',
  'x-ms-request-id',
  'c760ec4a-dec4-41c4-885d-bac12b643b14',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:30:58 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/CRUDCertificateName-cangetacertificatessecretinPEMformat-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: CRUDCertificateName-cangetacertificatessecretinPEMformat-"}}, [
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
  '4e7a404a-2087-4266-a8ee-2e0f18a31df0',
  'x-ms-request-id',
  '39429358-87b2-4ac8-bbe8-e3161154112e',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:31:01 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/CRUDCertificateName-cangetacertificatessecretinPEMformat-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: CRUDCertificateName-cangetacertificatessecretinPEMformat-"}}, [
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
  '7cf928d4-6d07-49d4-a9c4-a7d31c118e0f',
  'x-ms-request-id',
  'e9c7e024-9bcd-4b9a-ac71-4f8fd11e7dea',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:31:03 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/CRUDCertificateName-cangetacertificatessecretinPEMformat-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: CRUDCertificateName-cangetacertificatessecretinPEMformat-"}}, [
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
  'f5685700-0edb-40c5-809d-bba465a8fe3b',
  'x-ms-request-id',
  'ecd2f44b-2fe4-4a26-a220-efcf0ce479f9',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:31:05 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/CRUDCertificateName-cangetacertificatessecretinPEMformat-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: CRUDCertificateName-cangetacertificatessecretinPEMformat-"}}, [
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
  '926eb10c-9dbe-4b7a-8ab3-3d36cfba454b',
  'x-ms-request-id',
  '3af5db2a-451f-4b05-b478-3849a16009ba',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:31:07 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/CRUDCertificateName-cangetacertificatessecretinPEMformat-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: CRUDCertificateName-cangetacertificatessecretinPEMformat-"}}, [
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
  '8ea9c8ca-3c99-4e49-9a75-dafdc4431c46',
  'x-ms-request-id',
  'e5978da4-6506-44a2-9431-008ec0515f42',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:31:09 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/CRUDCertificateName-cangetacertificatessecretinPEMformat-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: CRUDCertificateName-cangetacertificatessecretinPEMformat-"}}, [
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
  'c01041f4-0bec-4626-a17b-4f350c3442a8',
  'x-ms-request-id',
  '8073b897-3e24-45fd-b044-be3c89254952',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:31:11 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/CRUDCertificateName-cangetacertificatessecretinPEMformat-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: CRUDCertificateName-cangetacertificatessecretinPEMformat-"}}, [
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
  '7870eefc-66e0-4452-badc-e9ba6673178a',
  'x-ms-request-id',
  '8178c30f-56ff-45dd-99d3-e6e3b426d72c',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:31:13 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/CRUDCertificateName-cangetacertificatessecretinPEMformat-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: CRUDCertificateName-cangetacertificatessecretinPEMformat-"}}, [
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
  'e56ceed2-0948-45b0-ad4a-f1a34766615f',
  'x-ms-request-id',
  'c8f3636b-e4db-4d8a-87f7-540a1f10019a',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:31:15 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/CRUDCertificateName-cangetacertificatessecretinPEMformat-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: CRUDCertificateName-cangetacertificatessecretinPEMformat-"}}, [
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
  '4bc897b6-921f-41b3-9e7b-28aaf2104916',
  'x-ms-request-id',
  '346942e7-75c9-4dc0-a3ce-8985c5301abc',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:31:17 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/CRUDCertificateName-cangetacertificatessecretinPEMformat-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: CRUDCertificateName-cangetacertificatessecretinPEMformat-"}}, [
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
  '9fcca13c-a80a-4be1-b69e-221fdb69becf',
  'x-ms-request-id',
  'a880939e-62b4-4b45-9701-1cfad9d0e14f',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:31:19 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/CRUDCertificateName-cangetacertificatessecretinPEMformat-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: CRUDCertificateName-cangetacertificatessecretinPEMformat-"}}, [
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
  '3451f45c-d4bd-4347-9664-3a0105217e64',
  'x-ms-request-id',
  '816f7842-e93f-40f9-8298-6d67068d935e',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:31:21 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/CRUDCertificateName-cangetacertificatessecretinPEMformat-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: CRUDCertificateName-cangetacertificatessecretinPEMformat-"}}, [
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
  '56856cad-a873-4b7b-bb43-c79757d8ff16',
  'x-ms-request-id',
  'eb9e2d63-dfb9-458d-836a-561f8abdb920',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:31:23 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/CRUDCertificateName-cangetacertificatessecretinPEMformat-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: CRUDCertificateName-cangetacertificatessecretinPEMformat-"}}, [
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
  '3abdfd0e-3452-42a1-a6a7-9394fc9b86f9',
  'x-ms-request-id',
  '812fed7a-e7b0-4fde-b567-a8833ca97b56',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:31:25 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/CRUDCertificateName-cangetacertificatessecretinPEMformat-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: CRUDCertificateName-cangetacertificatessecretinPEMformat-"}}, [
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
  'e06633d6-71b8-420c-a1e3-66cdcf47922c',
  'x-ms-request-id',
  '4aac4328-8e6e-4366-aaad-ad35b581841b',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:31:27 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/CRUDCertificateName-cangetacertificatessecretinPEMformat-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: CRUDCertificateName-cangetacertificatessecretinPEMformat-"}}, [
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
  'dbc37d8a-bd91-42a4-8651-db38e834c241',
  'x-ms-request-id',
  'ef982b67-69af-40c9-97dd-e97d4889d1c7',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:31:30 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/CRUDCertificateName-cangetacertificatessecretinPEMformat-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: CRUDCertificateName-cangetacertificatessecretinPEMformat-"}}, [
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
  'e7c3e871-865f-4f6a-aa41-f7c39a171291',
  'x-ms-request-id',
  '6f7221f7-8c20-4c36-a5ff-1e7ad1a07acc',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:31:32 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/CRUDCertificateName-cangetacertificatessecretinPEMformat-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: CRUDCertificateName-cangetacertificatessecretinPEMformat-"}}, [
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
  'da7a6b76-00d7-4fd3-8a59-01218c8656e5',
  'x-ms-request-id',
  '934329ef-3b32-4b3f-860c-7450c8e8f45f',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:31:34 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/CRUDCertificateName-cangetacertificatessecretinPEMformat-')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/CRUDCertificateName-cangetacertificatessecretinPEMformat-","deletedDate":1619641846,"scheduledPurgeDate":1627417846,"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-cangetacertificatessecretinPEMformat-/841ddc574dc84f259fbd9bb193bc3af4","kid":"https://keyvault_name.vault.azure.net/keys/CRUDCertificateName-cangetacertificatessecretinPEMformat-/841ddc574dc84f259fbd9bb193bc3af4","sid":"https://keyvault_name.vault.azure.net/secrets/CRUDCertificateName-cangetacertificatessecretinPEMformat-/841ddc574dc84f259fbd9bb193bc3af4","x5t":"wK6DWByBYdHkmBR2SKhQ2Oq8m0A","cer":"MIIDKDCCAhCgAwIBAgIQKvmE3HDJSei3T5uVrH3NaDANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjEwNDI4MjAyMDQ0WhcNMjIwNDI4MjAzMDQ0WjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQDTfY3e77kQuOjU5bJarr2ILkD+f4i6p2IRFaPoClw0WnetKgbqj1MNk8smr/hToFf6cTIHJU8KbwxX80fb1X1FqIK/GVcR9Y0E8mUuiaQENnABauo2hT6Ae93EA/FeVPZLIM0KUFDZyiUsK8xG4cf9LyhKTE762giG3u3qCpMXQ1Ey9eumbDDc+7Q2JHXUjeZsngUCbHuLTmVHtbVXmcV+0ZPSiCas4XbH9IvPqM3RH9yKcs1iqvcqNZxDX/QygMOVqvpzxMfs2dnTRr2naiFqAJWLnmPvEgBnO1/zSxi+AKlOT+szG5CWWGfSBhY8X11uRxkPHWBuEdentIK2/EqJAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBSdone7CK6N7izBFsbm3cGG+5i5xDAdBgNVHQ4EFgQUnaJ3uwiuje4swRbG5t3BhvuYucQwDQYJKoZIhvcNAQELBQADggEBAHCuGOSryZ6vhFXwuDbgdz7KKtJc7ueskdmPqNW9Udb52p2LNzfQSSOwvdaYZNb4NO4HCfED3JrkrUddV0Pyy29qqQBzZr99QN7p9kWItFQ++NYoyr9vaydtPZr8yDcUSuvDvsC81nokF2nE6HL1E3u4VkB2yCstV0AFTA6kjP5GvUYWMIhHdVLtG8Lfg9m2xWO8e4dsSujWAJ5iK3E6NX9/Fib5eNZwu7j5ub/J2Nw3q4hpL/781T85aVA3A/XUsYUKXt5VAaZGcuGWVzDE/OKMbdgFwX8aMXgEzRjwAqw5PBc5/MVN5kRS5qGNVibiYtW+dKCVQ1sfHOmHDgOQ7po=","attributes":{"enabled":true,"nbf":1619641244,"exp":1651177844,"created":1619641844,"updated":1619641844,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-cangetacertificatessecretinPEMformat-/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pem-file"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1619641760,"updated":1619641760}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-cangetacertificatessecretinPEMformat-/pending"}}, [
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
  '6574f9c8-dd43-4074-9b0b-ee8ae179967b',
  'x-ms-request-id',
  '6ec6b4aa-f895-48bb-938b-282b36a4741f',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:31:36 GMT',
  'Content-Length',
  '2852'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedcertificates/CRUDCertificateName-cangetacertificatessecretinPEMformat-')
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
  '2ec85055-9e74-4b6f-ad02-0044aa19d120',
  'x-ms-request-id',
  '31b26f21-ed8d-41ed-84c9-e8530b9f91ba',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:31:36 GMT'
]);

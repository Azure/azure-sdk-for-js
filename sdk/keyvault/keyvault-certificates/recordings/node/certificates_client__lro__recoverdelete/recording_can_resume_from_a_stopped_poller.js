let nock = require('nock');

module.exports.hash = "dcf66f9980cc8edac2cc0d2ae1b852b7";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/certificates/lroRecoverCertificateName-canresumefromastoppedpoller-/create')
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
  '0532f285-4733-441b-aa7b-c3d14826831a',
  'x-ms-request-id',
  '1cc128b3-67e4-479d-b95d-424bc6c7f72d',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:49:49 GMT'
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
  '32187e9a-a705-4271-bb13-2072a4bb4b02',
  'x-ms-ests-server',
  '2.1.11654.16 - EUS ProdSlices',
  'Set-Cookie',
  'fpc=AgYQsNIdSRpJsFzh7khx4Mk; expires=Fri, 28-May-2021 21:49:49 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevr0n_XpF_kqfCFjPdOCMGHYmgl8Al282kVCPB1YICIqFyi1KmkWxY1nglgIX-MjUC2iQ1Lvkk8l078B2zaF0pk-UmzjDljuN-VQbWqzHLT78nk2jbJWTbq702pBvTEP1T4TVG8KMew7hRqnrvX6ICx9SeTbyLKlVjbxs2LBN66azkgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 28 Apr 2021 21:49:48 GMT',
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
  '286ced7a-3a15-407a-9461-6026d0fd2e01',
  'x-ms-ests-server',
  '2.1.11654.16 - WUS2 ProdSlices',
  'Set-Cookie',
  'fpc=AgYQsNIdSRpJsFzh7khx4Mk; expires=Fri, 28-May-2021 21:49:49 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevrpr8DXkinbme_0W0xM6EuGaTYoGYjebm9GHq4lZRNgPUJSXSEeqs5lJVHiqavKndnLFqsdZJvUSPfsyHpBsOr-9JUJSULjK6SilY6kNFjjXqf6n9dR0rxlkZSdtiFk_U_DbRQep27ddaA6jkxcbF4XqIUi0ngb97yocgk0XZhsNogAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 28 Apr 2021 21:49:48 GMT',
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
  '66eb627d-31f2-4c37-b661-d1ed969b3300',
  'x-ms-ests-server',
  '2.1.11654.16 - SCUS ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=AgYQsNIdSRpJsFzh7khx4MnmR1YbAQAAAHzPG9gOAAAA; expires=Fri, 28-May-2021 21:49:49 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 28 Apr 2021 21:49:48 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/certificates/lroRecoverCertificateName-canresumefromastoppedpoller-/create', {"policy":{"key_props":{},"secret_props":{},"x509_props":{"subject":"cn=MyCert","sans":{}},"issuer":{"name":"Self"},"attributes":{}},"attributes":{}})
  .query(true)
  .reply(202, {"id":"https://keyvault_name.vault.azure.net/certificates/lroRecoverCertificateName-canresumefromastoppedpoller-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAooDVwSkv+Fyts5HRCWkszcqtRV/4fa1RQ9Fup17WE3YwD5KkVKtJyZp4ggW+U1FlHjTlNMqlbHXx6y3ONOvQzFm2mnkloYN/Qz5bciPnISjH5vEb4CLQPAAS5rthhvIaznSiKLysDybG88bLW39rpmKNyaxl/ifaOgasbuqg1Ipq8fH+7WSG2sbSG7zg0SUikysD5Np5OlfktzC+pn1p+4FjAminx/0Vv/EBwQuXPH3bHdRicCIcnTat9NWtmZNNbGrDgfqkrepBxd5ko1zOjkO7duqE87mbKfVJqjsWrQ+oXxQ8gZHkTfydTvZygzJZCHY1jO00u+8YhCkf8rZ6TQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAI1timTHBnmfB3TWpXNPwwVwF1YpVAaKkcc8zA7CdcV/jVcfgK54Xb/Imy8kJRQEpjXl7wz05JtjuIZBOgRnRcxFQ9mmAcmQ2ijAcsUPHZgczZTqHeWWNfFQvljH7a5mbtW//lx7xQhGZG5Vn4v7Skl9L2IaiblQffr056WCN//zASz0CUvrGcr63UEVJMzEyaWToRZXBmCTg02fvh2PSiUtdvDh6+GEAMMnE8R3kvq6k6qAGugPULAI8VXDd3Wln6s8pe7X1uzY/+PJDO9NdIMcZw5e6u0RhwkbES9xtyrDoU8GJgvSYNXZnEqA+eOnIhkgAGadMkzgQ0g8xLnrCrI=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"943a4eb922f446a0ab699598f04fb423"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://keyvault_name.vault.azure.net/certificates/lroRecoverCertificateName-canresumefromastoppedpoller-/pending?api-version=7.2&request_id=943a4eb922f446a0ab699598f04fb423',
  'Retry-After',
  '0',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '0532f285-4733-441b-aa7b-c3d14826831a',
  'x-ms-request-id',
  '260507b3-9d08-460e-8d9f-969a74d30457',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:49:50 GMT',
  'Content-Length',
  '1348'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroRecoverCertificateName-canresumefromastoppedpoller-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroRecoverCertificateName-canresumefromastoppedpoller-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAooDVwSkv+Fyts5HRCWkszcqtRV/4fa1RQ9Fup17WE3YwD5KkVKtJyZp4ggW+U1FlHjTlNMqlbHXx6y3ONOvQzFm2mnkloYN/Qz5bciPnISjH5vEb4CLQPAAS5rthhvIaznSiKLysDybG88bLW39rpmKNyaxl/ifaOgasbuqg1Ipq8fH+7WSG2sbSG7zg0SUikysD5Np5OlfktzC+pn1p+4FjAminx/0Vv/EBwQuXPH3bHdRicCIcnTat9NWtmZNNbGrDgfqkrepBxd5ko1zOjkO7duqE87mbKfVJqjsWrQ+oXxQ8gZHkTfydTvZygzJZCHY1jO00u+8YhCkf8rZ6TQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAI1timTHBnmfB3TWpXNPwwVwF1YpVAaKkcc8zA7CdcV/jVcfgK54Xb/Imy8kJRQEpjXl7wz05JtjuIZBOgRnRcxFQ9mmAcmQ2ijAcsUPHZgczZTqHeWWNfFQvljH7a5mbtW//lx7xQhGZG5Vn4v7Skl9L2IaiblQffr056WCN//zASz0CUvrGcr63UEVJMzEyaWToRZXBmCTg02fvh2PSiUtdvDh6+GEAMMnE8R3kvq6k6qAGugPULAI8VXDd3Wln6s8pe7X1uzY/+PJDO9NdIMcZw5e6u0RhwkbES9xtyrDoU8GJgvSYNXZnEqA+eOnIhkgAGadMkzgQ0g8xLnrCrI=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"943a4eb922f446a0ab699598f04fb423"}, [
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
  'daa82548-0fea-4efa-8620-108145489238',
  'x-ms-request-id',
  '20457a1a-6f94-48f7-b44d-6e5d4fbd3cf3',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:49:50 GMT',
  'Content-Length',
  '1348'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroRecoverCertificateName-canresumefromastoppedpoller-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroRecoverCertificateName-canresumefromastoppedpoller-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAooDVwSkv+Fyts5HRCWkszcqtRV/4fa1RQ9Fup17WE3YwD5KkVKtJyZp4ggW+U1FlHjTlNMqlbHXx6y3ONOvQzFm2mnkloYN/Qz5bciPnISjH5vEb4CLQPAAS5rthhvIaznSiKLysDybG88bLW39rpmKNyaxl/ifaOgasbuqg1Ipq8fH+7WSG2sbSG7zg0SUikysD5Np5OlfktzC+pn1p+4FjAminx/0Vv/EBwQuXPH3bHdRicCIcnTat9NWtmZNNbGrDgfqkrepBxd5ko1zOjkO7duqE87mbKfVJqjsWrQ+oXxQ8gZHkTfydTvZygzJZCHY1jO00u+8YhCkf8rZ6TQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAI1timTHBnmfB3TWpXNPwwVwF1YpVAaKkcc8zA7CdcV/jVcfgK54Xb/Imy8kJRQEpjXl7wz05JtjuIZBOgRnRcxFQ9mmAcmQ2ijAcsUPHZgczZTqHeWWNfFQvljH7a5mbtW//lx7xQhGZG5Vn4v7Skl9L2IaiblQffr056WCN//zASz0CUvrGcr63UEVJMzEyaWToRZXBmCTg02fvh2PSiUtdvDh6+GEAMMnE8R3kvq6k6qAGugPULAI8VXDd3Wln6s8pe7X1uzY/+PJDO9NdIMcZw5e6u0RhwkbES9xtyrDoU8GJgvSYNXZnEqA+eOnIhkgAGadMkzgQ0g8xLnrCrI=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"943a4eb922f446a0ab699598f04fb423"}, [
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
  '4dbbd380-529c-4579-bb58-d6ab74caaac4',
  'x-ms-request-id',
  '2a345cd6-87f0-4c18-93e5-d2170f7bd0f7',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:49:50 GMT',
  'Content-Length',
  '1348'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroRecoverCertificateName-canresumefromastoppedpoller-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroRecoverCertificateName-canresumefromastoppedpoller-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAooDVwSkv+Fyts5HRCWkszcqtRV/4fa1RQ9Fup17WE3YwD5KkVKtJyZp4ggW+U1FlHjTlNMqlbHXx6y3ONOvQzFm2mnkloYN/Qz5bciPnISjH5vEb4CLQPAAS5rthhvIaznSiKLysDybG88bLW39rpmKNyaxl/ifaOgasbuqg1Ipq8fH+7WSG2sbSG7zg0SUikysD5Np5OlfktzC+pn1p+4FjAminx/0Vv/EBwQuXPH3bHdRicCIcnTat9NWtmZNNbGrDgfqkrepBxd5ko1zOjkO7duqE87mbKfVJqjsWrQ+oXxQ8gZHkTfydTvZygzJZCHY1jO00u+8YhCkf8rZ6TQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAI1timTHBnmfB3TWpXNPwwVwF1YpVAaKkcc8zA7CdcV/jVcfgK54Xb/Imy8kJRQEpjXl7wz05JtjuIZBOgRnRcxFQ9mmAcmQ2ijAcsUPHZgczZTqHeWWNfFQvljH7a5mbtW//lx7xQhGZG5Vn4v7Skl9L2IaiblQffr056WCN//zASz0CUvrGcr63UEVJMzEyaWToRZXBmCTg02fvh2PSiUtdvDh6+GEAMMnE8R3kvq6k6qAGugPULAI8VXDd3Wln6s8pe7X1uzY/+PJDO9NdIMcZw5e6u0RhwkbES9xtyrDoU8GJgvSYNXZnEqA+eOnIhkgAGadMkzgQ0g8xLnrCrI=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"943a4eb922f446a0ab699598f04fb423"}, [
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
  '774d5fb4-8454-4ed6-94c0-32ce79a94c8b',
  'x-ms-request-id',
  'd24ef09b-069f-475a-bbaa-f2ec78e05213',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:49:52 GMT',
  'Content-Length',
  '1348'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroRecoverCertificateName-canresumefromastoppedpoller-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroRecoverCertificateName-canresumefromastoppedpoller-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAooDVwSkv+Fyts5HRCWkszcqtRV/4fa1RQ9Fup17WE3YwD5KkVKtJyZp4ggW+U1FlHjTlNMqlbHXx6y3ONOvQzFm2mnkloYN/Qz5bciPnISjH5vEb4CLQPAAS5rthhvIaznSiKLysDybG88bLW39rpmKNyaxl/ifaOgasbuqg1Ipq8fH+7WSG2sbSG7zg0SUikysD5Np5OlfktzC+pn1p+4FjAminx/0Vv/EBwQuXPH3bHdRicCIcnTat9NWtmZNNbGrDgfqkrepBxd5ko1zOjkO7duqE87mbKfVJqjsWrQ+oXxQ8gZHkTfydTvZygzJZCHY1jO00u+8YhCkf8rZ6TQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAI1timTHBnmfB3TWpXNPwwVwF1YpVAaKkcc8zA7CdcV/jVcfgK54Xb/Imy8kJRQEpjXl7wz05JtjuIZBOgRnRcxFQ9mmAcmQ2ijAcsUPHZgczZTqHeWWNfFQvljH7a5mbtW//lx7xQhGZG5Vn4v7Skl9L2IaiblQffr056WCN//zASz0CUvrGcr63UEVJMzEyaWToRZXBmCTg02fvh2PSiUtdvDh6+GEAMMnE8R3kvq6k6qAGugPULAI8VXDd3Wln6s8pe7X1uzY/+PJDO9NdIMcZw5e6u0RhwkbES9xtyrDoU8GJgvSYNXZnEqA+eOnIhkgAGadMkzgQ0g8xLnrCrI=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"943a4eb922f446a0ab699598f04fb423"}, [
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
  '5b2f9f6c-ea5a-48e0-92b7-803a4b515102',
  'x-ms-request-id',
  'e3628b53-0085-45c2-b83b-e93c90964666',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:49:54 GMT',
  'Content-Length',
  '1348'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroRecoverCertificateName-canresumefromastoppedpoller-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroRecoverCertificateName-canresumefromastoppedpoller-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAooDVwSkv+Fyts5HRCWkszcqtRV/4fa1RQ9Fup17WE3YwD5KkVKtJyZp4ggW+U1FlHjTlNMqlbHXx6y3ONOvQzFm2mnkloYN/Qz5bciPnISjH5vEb4CLQPAAS5rthhvIaznSiKLysDybG88bLW39rpmKNyaxl/ifaOgasbuqg1Ipq8fH+7WSG2sbSG7zg0SUikysD5Np5OlfktzC+pn1p+4FjAminx/0Vv/EBwQuXPH3bHdRicCIcnTat9NWtmZNNbGrDgfqkrepBxd5ko1zOjkO7duqE87mbKfVJqjsWrQ+oXxQ8gZHkTfydTvZygzJZCHY1jO00u+8YhCkf8rZ6TQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAI1timTHBnmfB3TWpXNPwwVwF1YpVAaKkcc8zA7CdcV/jVcfgK54Xb/Imy8kJRQEpjXl7wz05JtjuIZBOgRnRcxFQ9mmAcmQ2ijAcsUPHZgczZTqHeWWNfFQvljH7a5mbtW//lx7xQhGZG5Vn4v7Skl9L2IaiblQffr056WCN//zASz0CUvrGcr63UEVJMzEyaWToRZXBmCTg02fvh2PSiUtdvDh6+GEAMMnE8R3kvq6k6qAGugPULAI8VXDd3Wln6s8pe7X1uzY/+PJDO9NdIMcZw5e6u0RhwkbES9xtyrDoU8GJgvSYNXZnEqA+eOnIhkgAGadMkzgQ0g8xLnrCrI=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"943a4eb922f446a0ab699598f04fb423"}, [
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
  '27091fb3-f532-42d7-a2eb-802f0fc376b9',
  'x-ms-request-id',
  'e1b8fb00-99a5-4009-b00c-5a481dd6f06e',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:49:56 GMT',
  'Content-Length',
  '1348'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroRecoverCertificateName-canresumefromastoppedpoller-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroRecoverCertificateName-canresumefromastoppedpoller-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAooDVwSkv+Fyts5HRCWkszcqtRV/4fa1RQ9Fup17WE3YwD5KkVKtJyZp4ggW+U1FlHjTlNMqlbHXx6y3ONOvQzFm2mnkloYN/Qz5bciPnISjH5vEb4CLQPAAS5rthhvIaznSiKLysDybG88bLW39rpmKNyaxl/ifaOgasbuqg1Ipq8fH+7WSG2sbSG7zg0SUikysD5Np5OlfktzC+pn1p+4FjAminx/0Vv/EBwQuXPH3bHdRicCIcnTat9NWtmZNNbGrDgfqkrepBxd5ko1zOjkO7duqE87mbKfVJqjsWrQ+oXxQ8gZHkTfydTvZygzJZCHY1jO00u+8YhCkf8rZ6TQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAI1timTHBnmfB3TWpXNPwwVwF1YpVAaKkcc8zA7CdcV/jVcfgK54Xb/Imy8kJRQEpjXl7wz05JtjuIZBOgRnRcxFQ9mmAcmQ2ijAcsUPHZgczZTqHeWWNfFQvljH7a5mbtW//lx7xQhGZG5Vn4v7Skl9L2IaiblQffr056WCN//zASz0CUvrGcr63UEVJMzEyaWToRZXBmCTg02fvh2PSiUtdvDh6+GEAMMnE8R3kvq6k6qAGugPULAI8VXDd3Wln6s8pe7X1uzY/+PJDO9NdIMcZw5e6u0RhwkbES9xtyrDoU8GJgvSYNXZnEqA+eOnIhkgAGadMkzgQ0g8xLnrCrI=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"943a4eb922f446a0ab699598f04fb423"}, [
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
  '77836940-dbee-4410-85d4-b47c880061e7',
  'x-ms-request-id',
  '333fd7e2-a0c0-45ee-8a23-739dba793f85',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:49:58 GMT',
  'Content-Length',
  '1348'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroRecoverCertificateName-canresumefromastoppedpoller-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroRecoverCertificateName-canresumefromastoppedpoller-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAooDVwSkv+Fyts5HRCWkszcqtRV/4fa1RQ9Fup17WE3YwD5KkVKtJyZp4ggW+U1FlHjTlNMqlbHXx6y3ONOvQzFm2mnkloYN/Qz5bciPnISjH5vEb4CLQPAAS5rthhvIaznSiKLysDybG88bLW39rpmKNyaxl/ifaOgasbuqg1Ipq8fH+7WSG2sbSG7zg0SUikysD5Np5OlfktzC+pn1p+4FjAminx/0Vv/EBwQuXPH3bHdRicCIcnTat9NWtmZNNbGrDgfqkrepBxd5ko1zOjkO7duqE87mbKfVJqjsWrQ+oXxQ8gZHkTfydTvZygzJZCHY1jO00u+8YhCkf8rZ6TQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAI1timTHBnmfB3TWpXNPwwVwF1YpVAaKkcc8zA7CdcV/jVcfgK54Xb/Imy8kJRQEpjXl7wz05JtjuIZBOgRnRcxFQ9mmAcmQ2ijAcsUPHZgczZTqHeWWNfFQvljH7a5mbtW//lx7xQhGZG5Vn4v7Skl9L2IaiblQffr056WCN//zASz0CUvrGcr63UEVJMzEyaWToRZXBmCTg02fvh2PSiUtdvDh6+GEAMMnE8R3kvq6k6qAGugPULAI8VXDd3Wln6s8pe7X1uzY/+PJDO9NdIMcZw5e6u0RhwkbES9xtyrDoU8GJgvSYNXZnEqA+eOnIhkgAGadMkzgQ0g8xLnrCrI=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"943a4eb922f446a0ab699598f04fb423"}, [
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
  'e02c1491-3f39-4362-8154-0438deb174a3',
  'x-ms-request-id',
  'ce96b6de-e6cf-4f29-aee7-30db754aef63',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:50:00 GMT',
  'Content-Length',
  '1348'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroRecoverCertificateName-canresumefromastoppedpoller-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroRecoverCertificateName-canresumefromastoppedpoller-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAooDVwSkv+Fyts5HRCWkszcqtRV/4fa1RQ9Fup17WE3YwD5KkVKtJyZp4ggW+U1FlHjTlNMqlbHXx6y3ONOvQzFm2mnkloYN/Qz5bciPnISjH5vEb4CLQPAAS5rthhvIaznSiKLysDybG88bLW39rpmKNyaxl/ifaOgasbuqg1Ipq8fH+7WSG2sbSG7zg0SUikysD5Np5OlfktzC+pn1p+4FjAminx/0Vv/EBwQuXPH3bHdRicCIcnTat9NWtmZNNbGrDgfqkrepBxd5ko1zOjkO7duqE87mbKfVJqjsWrQ+oXxQ8gZHkTfydTvZygzJZCHY1jO00u+8YhCkf8rZ6TQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAI1timTHBnmfB3TWpXNPwwVwF1YpVAaKkcc8zA7CdcV/jVcfgK54Xb/Imy8kJRQEpjXl7wz05JtjuIZBOgRnRcxFQ9mmAcmQ2ijAcsUPHZgczZTqHeWWNfFQvljH7a5mbtW//lx7xQhGZG5Vn4v7Skl9L2IaiblQffr056WCN//zASz0CUvrGcr63UEVJMzEyaWToRZXBmCTg02fvh2PSiUtdvDh6+GEAMMnE8R3kvq6k6qAGugPULAI8VXDd3Wln6s8pe7X1uzY/+PJDO9NdIMcZw5e6u0RhwkbES9xtyrDoU8GJgvSYNXZnEqA+eOnIhkgAGadMkzgQ0g8xLnrCrI=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"943a4eb922f446a0ab699598f04fb423"}, [
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
  'ef101f8f-fb59-48fa-b122-6a6cbbfd4bf2',
  'x-ms-request-id',
  'c4acda61-2195-42a3-ae16-3d7ae65964da',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:50:02 GMT',
  'Content-Length',
  '1348'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroRecoverCertificateName-canresumefromastoppedpoller-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroRecoverCertificateName-canresumefromastoppedpoller-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAooDVwSkv+Fyts5HRCWkszcqtRV/4fa1RQ9Fup17WE3YwD5KkVKtJyZp4ggW+U1FlHjTlNMqlbHXx6y3ONOvQzFm2mnkloYN/Qz5bciPnISjH5vEb4CLQPAAS5rthhvIaznSiKLysDybG88bLW39rpmKNyaxl/ifaOgasbuqg1Ipq8fH+7WSG2sbSG7zg0SUikysD5Np5OlfktzC+pn1p+4FjAminx/0Vv/EBwQuXPH3bHdRicCIcnTat9NWtmZNNbGrDgfqkrepBxd5ko1zOjkO7duqE87mbKfVJqjsWrQ+oXxQ8gZHkTfydTvZygzJZCHY1jO00u+8YhCkf8rZ6TQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAI1timTHBnmfB3TWpXNPwwVwF1YpVAaKkcc8zA7CdcV/jVcfgK54Xb/Imy8kJRQEpjXl7wz05JtjuIZBOgRnRcxFQ9mmAcmQ2ijAcsUPHZgczZTqHeWWNfFQvljH7a5mbtW//lx7xQhGZG5Vn4v7Skl9L2IaiblQffr056WCN//zASz0CUvrGcr63UEVJMzEyaWToRZXBmCTg02fvh2PSiUtdvDh6+GEAMMnE8R3kvq6k6qAGugPULAI8VXDd3Wln6s8pe7X1uzY/+PJDO9NdIMcZw5e6u0RhwkbES9xtyrDoU8GJgvSYNXZnEqA+eOnIhkgAGadMkzgQ0g8xLnrCrI=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"943a4eb922f446a0ab699598f04fb423"}, [
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
  '006b6a63-58d0-4860-bc38-a6ff169b0975',
  'x-ms-request-id',
  '5ce5e137-a474-4a5e-bd24-cf180c24fae2',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:50:05 GMT',
  'Content-Length',
  '1348'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroRecoverCertificateName-canresumefromastoppedpoller-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroRecoverCertificateName-canresumefromastoppedpoller-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAooDVwSkv+Fyts5HRCWkszcqtRV/4fa1RQ9Fup17WE3YwD5KkVKtJyZp4ggW+U1FlHjTlNMqlbHXx6y3ONOvQzFm2mnkloYN/Qz5bciPnISjH5vEb4CLQPAAS5rthhvIaznSiKLysDybG88bLW39rpmKNyaxl/ifaOgasbuqg1Ipq8fH+7WSG2sbSG7zg0SUikysD5Np5OlfktzC+pn1p+4FjAminx/0Vv/EBwQuXPH3bHdRicCIcnTat9NWtmZNNbGrDgfqkrepBxd5ko1zOjkO7duqE87mbKfVJqjsWrQ+oXxQ8gZHkTfydTvZygzJZCHY1jO00u+8YhCkf8rZ6TQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAI1timTHBnmfB3TWpXNPwwVwF1YpVAaKkcc8zA7CdcV/jVcfgK54Xb/Imy8kJRQEpjXl7wz05JtjuIZBOgRnRcxFQ9mmAcmQ2ijAcsUPHZgczZTqHeWWNfFQvljH7a5mbtW//lx7xQhGZG5Vn4v7Skl9L2IaiblQffr056WCN//zASz0CUvrGcr63UEVJMzEyaWToRZXBmCTg02fvh2PSiUtdvDh6+GEAMMnE8R3kvq6k6qAGugPULAI8VXDd3Wln6s8pe7X1uzY/+PJDO9NdIMcZw5e6u0RhwkbES9xtyrDoU8GJgvSYNXZnEqA+eOnIhkgAGadMkzgQ0g8xLnrCrI=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"943a4eb922f446a0ab699598f04fb423"}, [
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
  '1d1ddfe6-d140-4ddf-a744-b550ecf85b9f',
  'x-ms-request-id',
  '9b573dba-9f50-4bcf-855a-da767da3a961',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:50:07 GMT',
  'Content-Length',
  '1348'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroRecoverCertificateName-canresumefromastoppedpoller-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroRecoverCertificateName-canresumefromastoppedpoller-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAooDVwSkv+Fyts5HRCWkszcqtRV/4fa1RQ9Fup17WE3YwD5KkVKtJyZp4ggW+U1FlHjTlNMqlbHXx6y3ONOvQzFm2mnkloYN/Qz5bciPnISjH5vEb4CLQPAAS5rthhvIaznSiKLysDybG88bLW39rpmKNyaxl/ifaOgasbuqg1Ipq8fH+7WSG2sbSG7zg0SUikysD5Np5OlfktzC+pn1p+4FjAminx/0Vv/EBwQuXPH3bHdRicCIcnTat9NWtmZNNbGrDgfqkrepBxd5ko1zOjkO7duqE87mbKfVJqjsWrQ+oXxQ8gZHkTfydTvZygzJZCHY1jO00u+8YhCkf8rZ6TQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAI1timTHBnmfB3TWpXNPwwVwF1YpVAaKkcc8zA7CdcV/jVcfgK54Xb/Imy8kJRQEpjXl7wz05JtjuIZBOgRnRcxFQ9mmAcmQ2ijAcsUPHZgczZTqHeWWNfFQvljH7a5mbtW//lx7xQhGZG5Vn4v7Skl9L2IaiblQffr056WCN//zASz0CUvrGcr63UEVJMzEyaWToRZXBmCTg02fvh2PSiUtdvDh6+GEAMMnE8R3kvq6k6qAGugPULAI8VXDd3Wln6s8pe7X1uzY/+PJDO9NdIMcZw5e6u0RhwkbES9xtyrDoU8GJgvSYNXZnEqA+eOnIhkgAGadMkzgQ0g8xLnrCrI=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"943a4eb922f446a0ab699598f04fb423"}, [
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
  'ef97c6b0-d1f9-4190-9d69-d7c7203ed519',
  'x-ms-request-id',
  '7b2d1f1f-eaab-4d12-a21c-8cf7afee8c22',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:50:09 GMT',
  'Content-Length',
  '1348'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroRecoverCertificateName-canresumefromastoppedpoller-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroRecoverCertificateName-canresumefromastoppedpoller-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAooDVwSkv+Fyts5HRCWkszcqtRV/4fa1RQ9Fup17WE3YwD5KkVKtJyZp4ggW+U1FlHjTlNMqlbHXx6y3ONOvQzFm2mnkloYN/Qz5bciPnISjH5vEb4CLQPAAS5rthhvIaznSiKLysDybG88bLW39rpmKNyaxl/ifaOgasbuqg1Ipq8fH+7WSG2sbSG7zg0SUikysD5Np5OlfktzC+pn1p+4FjAminx/0Vv/EBwQuXPH3bHdRicCIcnTat9NWtmZNNbGrDgfqkrepBxd5ko1zOjkO7duqE87mbKfVJqjsWrQ+oXxQ8gZHkTfydTvZygzJZCHY1jO00u+8YhCkf8rZ6TQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAI1timTHBnmfB3TWpXNPwwVwF1YpVAaKkcc8zA7CdcV/jVcfgK54Xb/Imy8kJRQEpjXl7wz05JtjuIZBOgRnRcxFQ9mmAcmQ2ijAcsUPHZgczZTqHeWWNfFQvljH7a5mbtW//lx7xQhGZG5Vn4v7Skl9L2IaiblQffr056WCN//zASz0CUvrGcr63UEVJMzEyaWToRZXBmCTg02fvh2PSiUtdvDh6+GEAMMnE8R3kvq6k6qAGugPULAI8VXDd3Wln6s8pe7X1uzY/+PJDO9NdIMcZw5e6u0RhwkbES9xtyrDoU8GJgvSYNXZnEqA+eOnIhkgAGadMkzgQ0g8xLnrCrI=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"943a4eb922f446a0ab699598f04fb423"}, [
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
  '7a84a460-8c03-4997-bfc5-3bb2b9079d15',
  'x-ms-request-id',
  '7c429f26-d348-4303-8d94-a48ba83b1859',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:50:11 GMT',
  'Content-Length',
  '1348'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroRecoverCertificateName-canresumefromastoppedpoller-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroRecoverCertificateName-canresumefromastoppedpoller-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAooDVwSkv+Fyts5HRCWkszcqtRV/4fa1RQ9Fup17WE3YwD5KkVKtJyZp4ggW+U1FlHjTlNMqlbHXx6y3ONOvQzFm2mnkloYN/Qz5bciPnISjH5vEb4CLQPAAS5rthhvIaznSiKLysDybG88bLW39rpmKNyaxl/ifaOgasbuqg1Ipq8fH+7WSG2sbSG7zg0SUikysD5Np5OlfktzC+pn1p+4FjAminx/0Vv/EBwQuXPH3bHdRicCIcnTat9NWtmZNNbGrDgfqkrepBxd5ko1zOjkO7duqE87mbKfVJqjsWrQ+oXxQ8gZHkTfydTvZygzJZCHY1jO00u+8YhCkf8rZ6TQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAI1timTHBnmfB3TWpXNPwwVwF1YpVAaKkcc8zA7CdcV/jVcfgK54Xb/Imy8kJRQEpjXl7wz05JtjuIZBOgRnRcxFQ9mmAcmQ2ijAcsUPHZgczZTqHeWWNfFQvljH7a5mbtW//lx7xQhGZG5Vn4v7Skl9L2IaiblQffr056WCN//zASz0CUvrGcr63UEVJMzEyaWToRZXBmCTg02fvh2PSiUtdvDh6+GEAMMnE8R3kvq6k6qAGugPULAI8VXDd3Wln6s8pe7X1uzY/+PJDO9NdIMcZw5e6u0RhwkbES9xtyrDoU8GJgvSYNXZnEqA+eOnIhkgAGadMkzgQ0g8xLnrCrI=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"943a4eb922f446a0ab699598f04fb423"}, [
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
  '62dfed8e-4388-46ac-a7cc-82eb4fe37aee',
  'x-ms-request-id',
  'a150c2a0-8c9b-411e-b375-5d064dc493ae',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:50:13 GMT',
  'Content-Length',
  '1348'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroRecoverCertificateName-canresumefromastoppedpoller-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroRecoverCertificateName-canresumefromastoppedpoller-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAooDVwSkv+Fyts5HRCWkszcqtRV/4fa1RQ9Fup17WE3YwD5KkVKtJyZp4ggW+U1FlHjTlNMqlbHXx6y3ONOvQzFm2mnkloYN/Qz5bciPnISjH5vEb4CLQPAAS5rthhvIaznSiKLysDybG88bLW39rpmKNyaxl/ifaOgasbuqg1Ipq8fH+7WSG2sbSG7zg0SUikysD5Np5OlfktzC+pn1p+4FjAminx/0Vv/EBwQuXPH3bHdRicCIcnTat9NWtmZNNbGrDgfqkrepBxd5ko1zOjkO7duqE87mbKfVJqjsWrQ+oXxQ8gZHkTfydTvZygzJZCHY1jO00u+8YhCkf8rZ6TQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAI1timTHBnmfB3TWpXNPwwVwF1YpVAaKkcc8zA7CdcV/jVcfgK54Xb/Imy8kJRQEpjXl7wz05JtjuIZBOgRnRcxFQ9mmAcmQ2ijAcsUPHZgczZTqHeWWNfFQvljH7a5mbtW//lx7xQhGZG5Vn4v7Skl9L2IaiblQffr056WCN//zASz0CUvrGcr63UEVJMzEyaWToRZXBmCTg02fvh2PSiUtdvDh6+GEAMMnE8R3kvq6k6qAGugPULAI8VXDd3Wln6s8pe7X1uzY/+PJDO9NdIMcZw5e6u0RhwkbES9xtyrDoU8GJgvSYNXZnEqA+eOnIhkgAGadMkzgQ0g8xLnrCrI=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"943a4eb922f446a0ab699598f04fb423"}, [
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
  'ea258de5-119c-4210-95e2-93d0acd4698b',
  'x-ms-request-id',
  '81988093-44fb-49a1-9a51-92457c47943f',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:50:15 GMT',
  'Content-Length',
  '1348'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroRecoverCertificateName-canresumefromastoppedpoller-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroRecoverCertificateName-canresumefromastoppedpoller-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAooDVwSkv+Fyts5HRCWkszcqtRV/4fa1RQ9Fup17WE3YwD5KkVKtJyZp4ggW+U1FlHjTlNMqlbHXx6y3ONOvQzFm2mnkloYN/Qz5bciPnISjH5vEb4CLQPAAS5rthhvIaznSiKLysDybG88bLW39rpmKNyaxl/ifaOgasbuqg1Ipq8fH+7WSG2sbSG7zg0SUikysD5Np5OlfktzC+pn1p+4FjAminx/0Vv/EBwQuXPH3bHdRicCIcnTat9NWtmZNNbGrDgfqkrepBxd5ko1zOjkO7duqE87mbKfVJqjsWrQ+oXxQ8gZHkTfydTvZygzJZCHY1jO00u+8YhCkf8rZ6TQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAI1timTHBnmfB3TWpXNPwwVwF1YpVAaKkcc8zA7CdcV/jVcfgK54Xb/Imy8kJRQEpjXl7wz05JtjuIZBOgRnRcxFQ9mmAcmQ2ijAcsUPHZgczZTqHeWWNfFQvljH7a5mbtW//lx7xQhGZG5Vn4v7Skl9L2IaiblQffr056WCN//zASz0CUvrGcr63UEVJMzEyaWToRZXBmCTg02fvh2PSiUtdvDh6+GEAMMnE8R3kvq6k6qAGugPULAI8VXDd3Wln6s8pe7X1uzY/+PJDO9NdIMcZw5e6u0RhwkbES9xtyrDoU8GJgvSYNXZnEqA+eOnIhkgAGadMkzgQ0g8xLnrCrI=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"943a4eb922f446a0ab699598f04fb423"}, [
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
  'bb0b3043-7c72-455a-ab3f-a87d46ebb18f',
  'x-ms-request-id',
  '4d8073aa-3507-45ce-8165-a691cda6db8b',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:50:17 GMT',
  'Content-Length',
  '1348'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroRecoverCertificateName-canresumefromastoppedpoller-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroRecoverCertificateName-canresumefromastoppedpoller-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAooDVwSkv+Fyts5HRCWkszcqtRV/4fa1RQ9Fup17WE3YwD5KkVKtJyZp4ggW+U1FlHjTlNMqlbHXx6y3ONOvQzFm2mnkloYN/Qz5bciPnISjH5vEb4CLQPAAS5rthhvIaznSiKLysDybG88bLW39rpmKNyaxl/ifaOgasbuqg1Ipq8fH+7WSG2sbSG7zg0SUikysD5Np5OlfktzC+pn1p+4FjAminx/0Vv/EBwQuXPH3bHdRicCIcnTat9NWtmZNNbGrDgfqkrepBxd5ko1zOjkO7duqE87mbKfVJqjsWrQ+oXxQ8gZHkTfydTvZygzJZCHY1jO00u+8YhCkf8rZ6TQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAI1timTHBnmfB3TWpXNPwwVwF1YpVAaKkcc8zA7CdcV/jVcfgK54Xb/Imy8kJRQEpjXl7wz05JtjuIZBOgRnRcxFQ9mmAcmQ2ijAcsUPHZgczZTqHeWWNfFQvljH7a5mbtW//lx7xQhGZG5Vn4v7Skl9L2IaiblQffr056WCN//zASz0CUvrGcr63UEVJMzEyaWToRZXBmCTg02fvh2PSiUtdvDh6+GEAMMnE8R3kvq6k6qAGugPULAI8VXDd3Wln6s8pe7X1uzY/+PJDO9NdIMcZw5e6u0RhwkbES9xtyrDoU8GJgvSYNXZnEqA+eOnIhkgAGadMkzgQ0g8xLnrCrI=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"943a4eb922f446a0ab699598f04fb423"}, [
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
  '418ffd88-e1c0-4d51-a914-0d0c6a229833',
  'x-ms-request-id',
  'd50b60d8-3a16-450e-a5d4-ea4d40c5bac9',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:50:19 GMT',
  'Content-Length',
  '1348'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroRecoverCertificateName-canresumefromastoppedpoller-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroRecoverCertificateName-canresumefromastoppedpoller-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAooDVwSkv+Fyts5HRCWkszcqtRV/4fa1RQ9Fup17WE3YwD5KkVKtJyZp4ggW+U1FlHjTlNMqlbHXx6y3ONOvQzFm2mnkloYN/Qz5bciPnISjH5vEb4CLQPAAS5rthhvIaznSiKLysDybG88bLW39rpmKNyaxl/ifaOgasbuqg1Ipq8fH+7WSG2sbSG7zg0SUikysD5Np5OlfktzC+pn1p+4FjAminx/0Vv/EBwQuXPH3bHdRicCIcnTat9NWtmZNNbGrDgfqkrepBxd5ko1zOjkO7duqE87mbKfVJqjsWrQ+oXxQ8gZHkTfydTvZygzJZCHY1jO00u+8YhCkf8rZ6TQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAI1timTHBnmfB3TWpXNPwwVwF1YpVAaKkcc8zA7CdcV/jVcfgK54Xb/Imy8kJRQEpjXl7wz05JtjuIZBOgRnRcxFQ9mmAcmQ2ijAcsUPHZgczZTqHeWWNfFQvljH7a5mbtW//lx7xQhGZG5Vn4v7Skl9L2IaiblQffr056WCN//zASz0CUvrGcr63UEVJMzEyaWToRZXBmCTg02fvh2PSiUtdvDh6+GEAMMnE8R3kvq6k6qAGugPULAI8VXDd3Wln6s8pe7X1uzY/+PJDO9NdIMcZw5e6u0RhwkbES9xtyrDoU8GJgvSYNXZnEqA+eOnIhkgAGadMkzgQ0g8xLnrCrI=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"943a4eb922f446a0ab699598f04fb423"}, [
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
  'abd137d2-d60a-4fc0-9945-28813b784cb6',
  'x-ms-request-id',
  'a7b3f97e-498b-4fb3-b477-42202ef0acf9',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:50:21 GMT',
  'Content-Length',
  '1348'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroRecoverCertificateName-canresumefromastoppedpoller-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroRecoverCertificateName-canresumefromastoppedpoller-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAooDVwSkv+Fyts5HRCWkszcqtRV/4fa1RQ9Fup17WE3YwD5KkVKtJyZp4ggW+U1FlHjTlNMqlbHXx6y3ONOvQzFm2mnkloYN/Qz5bciPnISjH5vEb4CLQPAAS5rthhvIaznSiKLysDybG88bLW39rpmKNyaxl/ifaOgasbuqg1Ipq8fH+7WSG2sbSG7zg0SUikysD5Np5OlfktzC+pn1p+4FjAminx/0Vv/EBwQuXPH3bHdRicCIcnTat9NWtmZNNbGrDgfqkrepBxd5ko1zOjkO7duqE87mbKfVJqjsWrQ+oXxQ8gZHkTfydTvZygzJZCHY1jO00u+8YhCkf8rZ6TQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAI1timTHBnmfB3TWpXNPwwVwF1YpVAaKkcc8zA7CdcV/jVcfgK54Xb/Imy8kJRQEpjXl7wz05JtjuIZBOgRnRcxFQ9mmAcmQ2ijAcsUPHZgczZTqHeWWNfFQvljH7a5mbtW//lx7xQhGZG5Vn4v7Skl9L2IaiblQffr056WCN//zASz0CUvrGcr63UEVJMzEyaWToRZXBmCTg02fvh2PSiUtdvDh6+GEAMMnE8R3kvq6k6qAGugPULAI8VXDd3Wln6s8pe7X1uzY/+PJDO9NdIMcZw5e6u0RhwkbES9xtyrDoU8GJgvSYNXZnEqA+eOnIhkgAGadMkzgQ0g8xLnrCrI=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"943a4eb922f446a0ab699598f04fb423"}, [
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
  '801e4efc-5b14-46a7-9b89-5a2ec3e5b1a5',
  'x-ms-request-id',
  '505d8c39-c109-4fd6-9d39-b447b4159063',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:50:24 GMT',
  'Content-Length',
  '1348'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroRecoverCertificateName-canresumefromastoppedpoller-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroRecoverCertificateName-canresumefromastoppedpoller-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAooDVwSkv+Fyts5HRCWkszcqtRV/4fa1RQ9Fup17WE3YwD5KkVKtJyZp4ggW+U1FlHjTlNMqlbHXx6y3ONOvQzFm2mnkloYN/Qz5bciPnISjH5vEb4CLQPAAS5rthhvIaznSiKLysDybG88bLW39rpmKNyaxl/ifaOgasbuqg1Ipq8fH+7WSG2sbSG7zg0SUikysD5Np5OlfktzC+pn1p+4FjAminx/0Vv/EBwQuXPH3bHdRicCIcnTat9NWtmZNNbGrDgfqkrepBxd5ko1zOjkO7duqE87mbKfVJqjsWrQ+oXxQ8gZHkTfydTvZygzJZCHY1jO00u+8YhCkf8rZ6TQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAI1timTHBnmfB3TWpXNPwwVwF1YpVAaKkcc8zA7CdcV/jVcfgK54Xb/Imy8kJRQEpjXl7wz05JtjuIZBOgRnRcxFQ9mmAcmQ2ijAcsUPHZgczZTqHeWWNfFQvljH7a5mbtW//lx7xQhGZG5Vn4v7Skl9L2IaiblQffr056WCN//zASz0CUvrGcr63UEVJMzEyaWToRZXBmCTg02fvh2PSiUtdvDh6+GEAMMnE8R3kvq6k6qAGugPULAI8VXDd3Wln6s8pe7X1uzY/+PJDO9NdIMcZw5e6u0RhwkbES9xtyrDoU8GJgvSYNXZnEqA+eOnIhkgAGadMkzgQ0g8xLnrCrI=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"943a4eb922f446a0ab699598f04fb423"}, [
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
  '72d8ca3d-4d2a-4b70-9ca0-8158749f7344',
  'x-ms-request-id',
  '9fcce7c6-c01e-4995-995d-a3174d242120',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:50:26 GMT',
  'Content-Length',
  '1348'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroRecoverCertificateName-canresumefromastoppedpoller-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroRecoverCertificateName-canresumefromastoppedpoller-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAooDVwSkv+Fyts5HRCWkszcqtRV/4fa1RQ9Fup17WE3YwD5KkVKtJyZp4ggW+U1FlHjTlNMqlbHXx6y3ONOvQzFm2mnkloYN/Qz5bciPnISjH5vEb4CLQPAAS5rthhvIaznSiKLysDybG88bLW39rpmKNyaxl/ifaOgasbuqg1Ipq8fH+7WSG2sbSG7zg0SUikysD5Np5OlfktzC+pn1p+4FjAminx/0Vv/EBwQuXPH3bHdRicCIcnTat9NWtmZNNbGrDgfqkrepBxd5ko1zOjkO7duqE87mbKfVJqjsWrQ+oXxQ8gZHkTfydTvZygzJZCHY1jO00u+8YhCkf8rZ6TQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAI1timTHBnmfB3TWpXNPwwVwF1YpVAaKkcc8zA7CdcV/jVcfgK54Xb/Imy8kJRQEpjXl7wz05JtjuIZBOgRnRcxFQ9mmAcmQ2ijAcsUPHZgczZTqHeWWNfFQvljH7a5mbtW//lx7xQhGZG5Vn4v7Skl9L2IaiblQffr056WCN//zASz0CUvrGcr63UEVJMzEyaWToRZXBmCTg02fvh2PSiUtdvDh6+GEAMMnE8R3kvq6k6qAGugPULAI8VXDd3Wln6s8pe7X1uzY/+PJDO9NdIMcZw5e6u0RhwkbES9xtyrDoU8GJgvSYNXZnEqA+eOnIhkgAGadMkzgQ0g8xLnrCrI=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"943a4eb922f446a0ab699598f04fb423"}, [
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
  '68b33e89-0e79-454f-921d-8987ff55721f',
  'x-ms-request-id',
  'f94275ca-eba3-4037-9f7b-f35bf54a9e58',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:50:28 GMT',
  'Content-Length',
  '1348'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroRecoverCertificateName-canresumefromastoppedpoller-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroRecoverCertificateName-canresumefromastoppedpoller-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAooDVwSkv+Fyts5HRCWkszcqtRV/4fa1RQ9Fup17WE3YwD5KkVKtJyZp4ggW+U1FlHjTlNMqlbHXx6y3ONOvQzFm2mnkloYN/Qz5bciPnISjH5vEb4CLQPAAS5rthhvIaznSiKLysDybG88bLW39rpmKNyaxl/ifaOgasbuqg1Ipq8fH+7WSG2sbSG7zg0SUikysD5Np5OlfktzC+pn1p+4FjAminx/0Vv/EBwQuXPH3bHdRicCIcnTat9NWtmZNNbGrDgfqkrepBxd5ko1zOjkO7duqE87mbKfVJqjsWrQ+oXxQ8gZHkTfydTvZygzJZCHY1jO00u+8YhCkf8rZ6TQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAI1timTHBnmfB3TWpXNPwwVwF1YpVAaKkcc8zA7CdcV/jVcfgK54Xb/Imy8kJRQEpjXl7wz05JtjuIZBOgRnRcxFQ9mmAcmQ2ijAcsUPHZgczZTqHeWWNfFQvljH7a5mbtW//lx7xQhGZG5Vn4v7Skl9L2IaiblQffr056WCN//zASz0CUvrGcr63UEVJMzEyaWToRZXBmCTg02fvh2PSiUtdvDh6+GEAMMnE8R3kvq6k6qAGugPULAI8VXDd3Wln6s8pe7X1uzY/+PJDO9NdIMcZw5e6u0RhwkbES9xtyrDoU8GJgvSYNXZnEqA+eOnIhkgAGadMkzgQ0g8xLnrCrI=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"943a4eb922f446a0ab699598f04fb423"}, [
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
  'ff933300-2d23-4bb5-a02b-ed5179e3776d',
  'x-ms-request-id',
  '28ddb602-4e4b-47e4-9402-218d62858197',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:50:30 GMT',
  'Content-Length',
  '1348'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroRecoverCertificateName-canresumefromastoppedpoller-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroRecoverCertificateName-canresumefromastoppedpoller-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAooDVwSkv+Fyts5HRCWkszcqtRV/4fa1RQ9Fup17WE3YwD5KkVKtJyZp4ggW+U1FlHjTlNMqlbHXx6y3ONOvQzFm2mnkloYN/Qz5bciPnISjH5vEb4CLQPAAS5rthhvIaznSiKLysDybG88bLW39rpmKNyaxl/ifaOgasbuqg1Ipq8fH+7WSG2sbSG7zg0SUikysD5Np5OlfktzC+pn1p+4FjAminx/0Vv/EBwQuXPH3bHdRicCIcnTat9NWtmZNNbGrDgfqkrepBxd5ko1zOjkO7duqE87mbKfVJqjsWrQ+oXxQ8gZHkTfydTvZygzJZCHY1jO00u+8YhCkf8rZ6TQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAI1timTHBnmfB3TWpXNPwwVwF1YpVAaKkcc8zA7CdcV/jVcfgK54Xb/Imy8kJRQEpjXl7wz05JtjuIZBOgRnRcxFQ9mmAcmQ2ijAcsUPHZgczZTqHeWWNfFQvljH7a5mbtW//lx7xQhGZG5Vn4v7Skl9L2IaiblQffr056WCN//zASz0CUvrGcr63UEVJMzEyaWToRZXBmCTg02fvh2PSiUtdvDh6+GEAMMnE8R3kvq6k6qAGugPULAI8VXDd3Wln6s8pe7X1uzY/+PJDO9NdIMcZw5e6u0RhwkbES9xtyrDoU8GJgvSYNXZnEqA+eOnIhkgAGadMkzgQ0g8xLnrCrI=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"943a4eb922f446a0ab699598f04fb423"}, [
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
  '92e6cf3d-360b-42e8-bd17-3c6d600f9692',
  'x-ms-request-id',
  'f0a80957-d38b-49fd-b577-afe670eedfa0',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:50:32 GMT',
  'Content-Length',
  '1348'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroRecoverCertificateName-canresumefromastoppedpoller-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroRecoverCertificateName-canresumefromastoppedpoller-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAooDVwSkv+Fyts5HRCWkszcqtRV/4fa1RQ9Fup17WE3YwD5KkVKtJyZp4ggW+U1FlHjTlNMqlbHXx6y3ONOvQzFm2mnkloYN/Qz5bciPnISjH5vEb4CLQPAAS5rthhvIaznSiKLysDybG88bLW39rpmKNyaxl/ifaOgasbuqg1Ipq8fH+7WSG2sbSG7zg0SUikysD5Np5OlfktzC+pn1p+4FjAminx/0Vv/EBwQuXPH3bHdRicCIcnTat9NWtmZNNbGrDgfqkrepBxd5ko1zOjkO7duqE87mbKfVJqjsWrQ+oXxQ8gZHkTfydTvZygzJZCHY1jO00u+8YhCkf8rZ6TQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAI1timTHBnmfB3TWpXNPwwVwF1YpVAaKkcc8zA7CdcV/jVcfgK54Xb/Imy8kJRQEpjXl7wz05JtjuIZBOgRnRcxFQ9mmAcmQ2ijAcsUPHZgczZTqHeWWNfFQvljH7a5mbtW//lx7xQhGZG5Vn4v7Skl9L2IaiblQffr056WCN//zASz0CUvrGcr63UEVJMzEyaWToRZXBmCTg02fvh2PSiUtdvDh6+GEAMMnE8R3kvq6k6qAGugPULAI8VXDd3Wln6s8pe7X1uzY/+PJDO9NdIMcZw5e6u0RhwkbES9xtyrDoU8GJgvSYNXZnEqA+eOnIhkgAGadMkzgQ0g8xLnrCrI=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"943a4eb922f446a0ab699598f04fb423"}, [
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
  '060f7d27-2150-48ba-be14-dfb5a43e093c',
  'x-ms-request-id',
  'b31fbdc5-c151-4c83-ab2c-a16205a30c61',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:50:34 GMT',
  'Content-Length',
  '1348'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroRecoverCertificateName-canresumefromastoppedpoller-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroRecoverCertificateName-canresumefromastoppedpoller-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAooDVwSkv+Fyts5HRCWkszcqtRV/4fa1RQ9Fup17WE3YwD5KkVKtJyZp4ggW+U1FlHjTlNMqlbHXx6y3ONOvQzFm2mnkloYN/Qz5bciPnISjH5vEb4CLQPAAS5rthhvIaznSiKLysDybG88bLW39rpmKNyaxl/ifaOgasbuqg1Ipq8fH+7WSG2sbSG7zg0SUikysD5Np5OlfktzC+pn1p+4FjAminx/0Vv/EBwQuXPH3bHdRicCIcnTat9NWtmZNNbGrDgfqkrepBxd5ko1zOjkO7duqE87mbKfVJqjsWrQ+oXxQ8gZHkTfydTvZygzJZCHY1jO00u+8YhCkf8rZ6TQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAI1timTHBnmfB3TWpXNPwwVwF1YpVAaKkcc8zA7CdcV/jVcfgK54Xb/Imy8kJRQEpjXl7wz05JtjuIZBOgRnRcxFQ9mmAcmQ2ijAcsUPHZgczZTqHeWWNfFQvljH7a5mbtW//lx7xQhGZG5Vn4v7Skl9L2IaiblQffr056WCN//zASz0CUvrGcr63UEVJMzEyaWToRZXBmCTg02fvh2PSiUtdvDh6+GEAMMnE8R3kvq6k6qAGugPULAI8VXDd3Wln6s8pe7X1uzY/+PJDO9NdIMcZw5e6u0RhwkbES9xtyrDoU8GJgvSYNXZnEqA+eOnIhkgAGadMkzgQ0g8xLnrCrI=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"943a4eb922f446a0ab699598f04fb423"}, [
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
  '28f965bb-2e80-494b-a9c0-9c2e4421d0eb',
  'x-ms-request-id',
  '9069e1fe-41e7-450e-b0a0-394aaa81d307',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:50:36 GMT',
  'Content-Length',
  '1348'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroRecoverCertificateName-canresumefromastoppedpoller-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroRecoverCertificateName-canresumefromastoppedpoller-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAooDVwSkv+Fyts5HRCWkszcqtRV/4fa1RQ9Fup17WE3YwD5KkVKtJyZp4ggW+U1FlHjTlNMqlbHXx6y3ONOvQzFm2mnkloYN/Qz5bciPnISjH5vEb4CLQPAAS5rthhvIaznSiKLysDybG88bLW39rpmKNyaxl/ifaOgasbuqg1Ipq8fH+7WSG2sbSG7zg0SUikysD5Np5OlfktzC+pn1p+4FjAminx/0Vv/EBwQuXPH3bHdRicCIcnTat9NWtmZNNbGrDgfqkrepBxd5ko1zOjkO7duqE87mbKfVJqjsWrQ+oXxQ8gZHkTfydTvZygzJZCHY1jO00u+8YhCkf8rZ6TQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAI1timTHBnmfB3TWpXNPwwVwF1YpVAaKkcc8zA7CdcV/jVcfgK54Xb/Imy8kJRQEpjXl7wz05JtjuIZBOgRnRcxFQ9mmAcmQ2ijAcsUPHZgczZTqHeWWNfFQvljH7a5mbtW//lx7xQhGZG5Vn4v7Skl9L2IaiblQffr056WCN//zASz0CUvrGcr63UEVJMzEyaWToRZXBmCTg02fvh2PSiUtdvDh6+GEAMMnE8R3kvq6k6qAGugPULAI8VXDd3Wln6s8pe7X1uzY/+PJDO9NdIMcZw5e6u0RhwkbES9xtyrDoU8GJgvSYNXZnEqA+eOnIhkgAGadMkzgQ0g8xLnrCrI=","cancellation_requested":false,"status":"completed","target":"https://keyvault_name.vault.azure.net/certificates/lroRecoverCertificateName-canresumefromastoppedpoller-","request_id":"943a4eb922f446a0ab699598f04fb423"}, [
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
  '6a75434e-78f4-46ae-9c1a-a68aac3a5987',
  'x-ms-request-id',
  '999045cd-7cb8-4ad3-91c9-b9f793af165b',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:50:39 GMT',
  'Content-Length',
  '1323'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroRecoverCertificateName-canresumefromastoppedpoller-/')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroRecoverCertificateName-canresumefromastoppedpoller-/9811f348e5cb4e99a004242d1ce6a8db","kid":"https://keyvault_name.vault.azure.net/keys/lroRecoverCertificateName-canresumefromastoppedpoller-/9811f348e5cb4e99a004242d1ce6a8db","sid":"https://keyvault_name.vault.azure.net/secrets/lroRecoverCertificateName-canresumefromastoppedpoller-/9811f348e5cb4e99a004242d1ce6a8db","x5t":"EhdirwHssRlU22T37bWzWgCGJKA","cer":"MIIDKDCCAhCgAwIBAgIQdudGBYphTTOfERNLst+bYTANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjEwNDI4MjE0MDM2WhcNMjIwNDI4MjE1MDM2WjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQCigNXBKS/4XK2zkdEJaSzNyq1FX/h9rVFD0W6nXtYTdjAPkqRUq0nJmniCBb5TUWUeNOU0yqVsdfHrLc4069DMWbaaeSWhg39DPltyI+chKMfm8RvgItA8ABLmu2GG8hrOdKIovKwPJsbzxstbf2umYo3JrGX+J9o6Bqxu6qDUimrx8f7tZIbaxtIbvODRJSKTKwPk2nk6V+S3ML6mfWn7gWMCaKfH/RW/8QHBC5c8fdsd1GJwIhydNq301a2Zk01sasOB+qSt6kHF3mSjXM6OQ7t26oTzuZsp9UmqOxatD6hfFDyBkeRN/J1O9nKDMlkIdjWM7TS77xiEKR/ytnpNAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBQtOSj/jOe/s06rK7ethUpKBNeXeDAdBgNVHQ4EFgQULTko/4znv7NOqyu3rYVKSgTXl3gwDQYJKoZIhvcNAQELBQADggEBAI57dm2K9GykGzxc9vGdRwnMzjJmqakjLjmKgEltP+DxPviCCe22BGB1cX/wrTbHFp/wzTkOB4tDier5bL9M2xWWOKPcLWhOv6dWpHAaRV/hZ4Kp0iyZcqPM5WREDWOv6xT8yNFSmQ4pOnmeZ3y/pXzLuEhT22lpCxIPP1M9/x0WK329qrFcj0euInF69JPVsphfrXpqKxk8hX0NdbPtcuNDJPr91v19zbiZP5yRx61XuOK3AzoFki5t9aEWUc2DvuErJRZdgTI60q5bX7iSDcM6RS+eM1QVsW+v7n4NukAmeVW/hbmTe/R7c9fbK0Ckt6Q1sUKELdKYKouZBg/jWHI=","attributes":{"enabled":true,"nbf":1619646036,"exp":1651182636,"created":1619646637,"updated":1619646637,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/lroRecoverCertificateName-canresumefromastoppedpoller-/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1619646590,"updated":1619646590}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/lroRecoverCertificateName-canresumefromastoppedpoller-/pending"}}, [
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
  'd811f62d-5c52-4df6-a42e-fbf25de85a04',
  'x-ms-request-id',
  '205fe2e1-a9e5-454e-ae60-c42fe0317647',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:50:39 GMT',
  'Content-Length',
  '2630'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/certificates/lroRecoverCertificateName-canresumefromastoppedpoller-')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/lroRecoverCertificateName-canresumefromastoppedpoller-","deletedDate":1619646639,"scheduledPurgeDate":1627422639,"id":"https://keyvault_name.vault.azure.net/certificates/lroRecoverCertificateName-canresumefromastoppedpoller-/9811f348e5cb4e99a004242d1ce6a8db","kid":"https://keyvault_name.vault.azure.net/keys/lroRecoverCertificateName-canresumefromastoppedpoller-/9811f348e5cb4e99a004242d1ce6a8db","sid":"https://keyvault_name.vault.azure.net/secrets/lroRecoverCertificateName-canresumefromastoppedpoller-/9811f348e5cb4e99a004242d1ce6a8db","x5t":"EhdirwHssRlU22T37bWzWgCGJKA","cer":"MIIDKDCCAhCgAwIBAgIQdudGBYphTTOfERNLst+bYTANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjEwNDI4MjE0MDM2WhcNMjIwNDI4MjE1MDM2WjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQCigNXBKS/4XK2zkdEJaSzNyq1FX/h9rVFD0W6nXtYTdjAPkqRUq0nJmniCBb5TUWUeNOU0yqVsdfHrLc4069DMWbaaeSWhg39DPltyI+chKMfm8RvgItA8ABLmu2GG8hrOdKIovKwPJsbzxstbf2umYo3JrGX+J9o6Bqxu6qDUimrx8f7tZIbaxtIbvODRJSKTKwPk2nk6V+S3ML6mfWn7gWMCaKfH/RW/8QHBC5c8fdsd1GJwIhydNq301a2Zk01sasOB+qSt6kHF3mSjXM6OQ7t26oTzuZsp9UmqOxatD6hfFDyBkeRN/J1O9nKDMlkIdjWM7TS77xiEKR/ytnpNAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBQtOSj/jOe/s06rK7ethUpKBNeXeDAdBgNVHQ4EFgQULTko/4znv7NOqyu3rYVKSgTXl3gwDQYJKoZIhvcNAQELBQADggEBAI57dm2K9GykGzxc9vGdRwnMzjJmqakjLjmKgEltP+DxPviCCe22BGB1cX/wrTbHFp/wzTkOB4tDier5bL9M2xWWOKPcLWhOv6dWpHAaRV/hZ4Kp0iyZcqPM5WREDWOv6xT8yNFSmQ4pOnmeZ3y/pXzLuEhT22lpCxIPP1M9/x0WK329qrFcj0euInF69JPVsphfrXpqKxk8hX0NdbPtcuNDJPr91v19zbiZP5yRx61XuOK3AzoFki5t9aEWUc2DvuErJRZdgTI60q5bX7iSDcM6RS+eM1QVsW+v7n4NukAmeVW/hbmTe/R7c9fbK0Ckt6Q1sUKELdKYKouZBg/jWHI=","attributes":{"enabled":true,"nbf":1619646036,"exp":1651182636,"created":1619646637,"updated":1619646637,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/lroRecoverCertificateName-canresumefromastoppedpoller-/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1619646590,"updated":1619646590}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/lroRecoverCertificateName-canresumefromastoppedpoller-/pending"}}, [
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
  '9a93b611-c232-4e53-aeb0-c02899cca933',
  'x-ms-request-id',
  'e6475f6b-dfcd-4d71-bdf2-b0fac059bf64',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:50:39 GMT',
  'Content-Length',
  '2838'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroRecoverCertificateName-canresumefromastoppedpoller-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroRecoverCertificateName-canresumefromastoppedpoller-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '155',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'bafba142-7cdb-48f9-97e3-54b8e79a894b',
  'x-ms-request-id',
  '0e6be94f-4939-4f94-a3a6-c94025d732a8',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:50:39 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroRecoverCertificateName-canresumefromastoppedpoller-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroRecoverCertificateName-canresumefromastoppedpoller-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '155',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '0a4e4bab-423e-4ed3-bf0e-d1dd92586a4c',
  'x-ms-request-id',
  '3942ea81-85d8-48d9-96f2-00e53b5a1601',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:50:39 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroRecoverCertificateName-canresumefromastoppedpoller-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroRecoverCertificateName-canresumefromastoppedpoller-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '155',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'efa79b55-fcb6-44a6-98e8-6fd03ea9f70a',
  'x-ms-request-id',
  'b1657c6e-1808-414d-be45-c822cdf50650',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:50:41 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroRecoverCertificateName-canresumefromastoppedpoller-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroRecoverCertificateName-canresumefromastoppedpoller-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '155',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '187f8ad3-0942-46ab-9775-36a51062697b',
  'x-ms-request-id',
  'f9544ea5-6a59-4cad-9abf-cdd53bf55af6',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:50:43 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroRecoverCertificateName-canresumefromastoppedpoller-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroRecoverCertificateName-canresumefromastoppedpoller-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '155',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '1f50653e-8878-42a4-8df2-556710e41dc6',
  'x-ms-request-id',
  '9104b3a8-7f3f-416a-ac4a-1bf66b91ab84',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:50:45 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroRecoverCertificateName-canresumefromastoppedpoller-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroRecoverCertificateName-canresumefromastoppedpoller-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '155',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '67faecd3-6ccf-45af-a167-62ab26bdd02c',
  'x-ms-request-id',
  '80207604-23bf-4ac5-92f3-c06350e8c2dc',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:50:47 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroRecoverCertificateName-canresumefromastoppedpoller-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroRecoverCertificateName-canresumefromastoppedpoller-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '155',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '82ee1b50-4d43-4f8e-8495-0fb280268936',
  'x-ms-request-id',
  'eb604d8e-05cc-4f01-b787-1bfc32ac1ae7',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:50:49 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroRecoverCertificateName-canresumefromastoppedpoller-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroRecoverCertificateName-canresumefromastoppedpoller-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '155',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'd1cb4e20-42ce-49bc-aa2e-7f6efc7dcaeb',
  'x-ms-request-id',
  '556c453f-ba37-47c8-a3ca-7ab385ca5d97',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:50:51 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroRecoverCertificateName-canresumefromastoppedpoller-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroRecoverCertificateName-canresumefromastoppedpoller-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '155',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '4a7ce347-9443-4e5c-8074-34e25b50a2ec',
  'x-ms-request-id',
  '051b4b60-1519-4004-b8fd-2a8157f58854',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:50:53 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroRecoverCertificateName-canresumefromastoppedpoller-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroRecoverCertificateName-canresumefromastoppedpoller-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '155',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '16c1dfdd-c606-4d75-99e0-e847cb374fa1',
  'x-ms-request-id',
  '9d1dd424-fbae-4823-8413-88b1b4be64af',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:50:56 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroRecoverCertificateName-canresumefromastoppedpoller-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroRecoverCertificateName-canresumefromastoppedpoller-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '155',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'cac9f85e-8c26-422f-ae9a-62e6967c8e12',
  'x-ms-request-id',
  'f6487f74-bd1f-4de3-9ab5-f88d81ac763a',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:50:58 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroRecoverCertificateName-canresumefromastoppedpoller-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroRecoverCertificateName-canresumefromastoppedpoller-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '155',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '848ee57e-2c3c-49f6-abef-fc90f4920c85',
  'x-ms-request-id',
  'bfb05e15-d28a-483d-898d-65b11dca44e1',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:51:00 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroRecoverCertificateName-canresumefromastoppedpoller-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroRecoverCertificateName-canresumefromastoppedpoller-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '155',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '95726202-3659-45d2-9ef9-80e5945bd472',
  'x-ms-request-id',
  'a56a0f7d-16b8-4e7f-aa16-68b22119ac74',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:51:02 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroRecoverCertificateName-canresumefromastoppedpoller-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroRecoverCertificateName-canresumefromastoppedpoller-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '155',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '4a14b21a-b2f8-43ab-8dff-217ef98f2e2b',
  'x-ms-request-id',
  '7299ada5-38f0-44da-85c6-f5073d201fa2',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:51:04 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroRecoverCertificateName-canresumefromastoppedpoller-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroRecoverCertificateName-canresumefromastoppedpoller-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '155',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'f4196e56-6de2-4e66-a060-b025b30112e9',
  'x-ms-request-id',
  'be052e51-1622-41af-967e-ed43922373fc',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:51:06 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroRecoverCertificateName-canresumefromastoppedpoller-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroRecoverCertificateName-canresumefromastoppedpoller-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '155',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '9c858f08-4d13-4f75-8c36-ecbd5f6c3674',
  'x-ms-request-id',
  '8d126219-b171-4dfb-bafc-4c3b6a720ef7',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:51:08 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroRecoverCertificateName-canresumefromastoppedpoller-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroRecoverCertificateName-canresumefromastoppedpoller-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '155',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '140d744f-2a9d-4879-a6fe-3b0e3833defa',
  'x-ms-request-id',
  '154f1fb3-02f2-4b51-8dfa-ddd483343f0e',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:51:10 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroRecoverCertificateName-canresumefromastoppedpoller-')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/lroRecoverCertificateName-canresumefromastoppedpoller-","deletedDate":1619646639,"scheduledPurgeDate":1627422639,"id":"https://keyvault_name.vault.azure.net/certificates/lroRecoverCertificateName-canresumefromastoppedpoller-/9811f348e5cb4e99a004242d1ce6a8db","kid":"https://keyvault_name.vault.azure.net/keys/lroRecoverCertificateName-canresumefromastoppedpoller-/9811f348e5cb4e99a004242d1ce6a8db","sid":"https://keyvault_name.vault.azure.net/secrets/lroRecoverCertificateName-canresumefromastoppedpoller-/9811f348e5cb4e99a004242d1ce6a8db","x5t":"EhdirwHssRlU22T37bWzWgCGJKA","cer":"MIIDKDCCAhCgAwIBAgIQdudGBYphTTOfERNLst+bYTANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjEwNDI4MjE0MDM2WhcNMjIwNDI4MjE1MDM2WjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQCigNXBKS/4XK2zkdEJaSzNyq1FX/h9rVFD0W6nXtYTdjAPkqRUq0nJmniCBb5TUWUeNOU0yqVsdfHrLc4069DMWbaaeSWhg39DPltyI+chKMfm8RvgItA8ABLmu2GG8hrOdKIovKwPJsbzxstbf2umYo3JrGX+J9o6Bqxu6qDUimrx8f7tZIbaxtIbvODRJSKTKwPk2nk6V+S3ML6mfWn7gWMCaKfH/RW/8QHBC5c8fdsd1GJwIhydNq301a2Zk01sasOB+qSt6kHF3mSjXM6OQ7t26oTzuZsp9UmqOxatD6hfFDyBkeRN/J1O9nKDMlkIdjWM7TS77xiEKR/ytnpNAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBQtOSj/jOe/s06rK7ethUpKBNeXeDAdBgNVHQ4EFgQULTko/4znv7NOqyu3rYVKSgTXl3gwDQYJKoZIhvcNAQELBQADggEBAI57dm2K9GykGzxc9vGdRwnMzjJmqakjLjmKgEltP+DxPviCCe22BGB1cX/wrTbHFp/wzTkOB4tDier5bL9M2xWWOKPcLWhOv6dWpHAaRV/hZ4Kp0iyZcqPM5WREDWOv6xT8yNFSmQ4pOnmeZ3y/pXzLuEhT22lpCxIPP1M9/x0WK329qrFcj0euInF69JPVsphfrXpqKxk8hX0NdbPtcuNDJPr91v19zbiZP5yRx61XuOK3AzoFki5t9aEWUc2DvuErJRZdgTI60q5bX7iSDcM6RS+eM1QVsW+v7n4NukAmeVW/hbmTe/R7c9fbK0Ckt6Q1sUKELdKYKouZBg/jWHI=","attributes":{"enabled":true,"nbf":1619646036,"exp":1651182636,"created":1619646637,"updated":1619646637,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/lroRecoverCertificateName-canresumefromastoppedpoller-/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1619646590,"updated":1619646590}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/lroRecoverCertificateName-canresumefromastoppedpoller-/pending"}}, [
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
  '3e7e9a25-3fd9-45c6-bb04-42eafd56d1f7',
  'x-ms-request-id',
  '5a9758a1-e02d-46d4-9bd7-935519d38fa2',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:51:13 GMT',
  'Content-Length',
  '2838'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroRecoverCertificateName-canresumefromastoppedpoller-/')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"A certificate with (name/id) lroRecoverCertificateName-canresumefromastoppedpoller- was not found in this key vault. If you recently deleted this certificate you may be able to recover it using the correct recovery command. For help resolving this issue, please see https://go.microsoft.com/fwlink/?linkid=2125182"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '383',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '53978b0e-10cc-4e9e-926c-c5421a150161',
  'x-ms-request-id',
  'e986dab6-9fae-4137-814d-9790ae4d7a77',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:51:13 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/deletedcertificates/lroRecoverCertificateName-canresumefromastoppedpoller-/recover')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroRecoverCertificateName-canresumefromastoppedpoller-/9811f348e5cb4e99a004242d1ce6a8db","kid":"https://keyvault_name.vault.azure.net/keys/lroRecoverCertificateName-canresumefromastoppedpoller-/9811f348e5cb4e99a004242d1ce6a8db","sid":"https://keyvault_name.vault.azure.net/secrets/lroRecoverCertificateName-canresumefromastoppedpoller-/9811f348e5cb4e99a004242d1ce6a8db","x5t":"EhdirwHssRlU22T37bWzWgCGJKA","cer":"MIIDKDCCAhCgAwIBAgIQdudGBYphTTOfERNLst+bYTANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjEwNDI4MjE0MDM2WhcNMjIwNDI4MjE1MDM2WjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQCigNXBKS/4XK2zkdEJaSzNyq1FX/h9rVFD0W6nXtYTdjAPkqRUq0nJmniCBb5TUWUeNOU0yqVsdfHrLc4069DMWbaaeSWhg39DPltyI+chKMfm8RvgItA8ABLmu2GG8hrOdKIovKwPJsbzxstbf2umYo3JrGX+J9o6Bqxu6qDUimrx8f7tZIbaxtIbvODRJSKTKwPk2nk6V+S3ML6mfWn7gWMCaKfH/RW/8QHBC5c8fdsd1GJwIhydNq301a2Zk01sasOB+qSt6kHF3mSjXM6OQ7t26oTzuZsp9UmqOxatD6hfFDyBkeRN/J1O9nKDMlkIdjWM7TS77xiEKR/ytnpNAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBQtOSj/jOe/s06rK7ethUpKBNeXeDAdBgNVHQ4EFgQULTko/4znv7NOqyu3rYVKSgTXl3gwDQYJKoZIhvcNAQELBQADggEBAI57dm2K9GykGzxc9vGdRwnMzjJmqakjLjmKgEltP+DxPviCCe22BGB1cX/wrTbHFp/wzTkOB4tDier5bL9M2xWWOKPcLWhOv6dWpHAaRV/hZ4Kp0iyZcqPM5WREDWOv6xT8yNFSmQ4pOnmeZ3y/pXzLuEhT22lpCxIPP1M9/x0WK329qrFcj0euInF69JPVsphfrXpqKxk8hX0NdbPtcuNDJPr91v19zbiZP5yRx61XuOK3AzoFki5t9aEWUc2DvuErJRZdgTI60q5bX7iSDcM6RS+eM1QVsW+v7n4NukAmeVW/hbmTe/R7c9fbK0Ckt6Q1sUKELdKYKouZBg/jWHI=","attributes":{"enabled":true,"nbf":1619646036,"exp":1651182636,"created":1619646637,"updated":1619646637,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/lroRecoverCertificateName-canresumefromastoppedpoller-/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1619646590,"updated":1619646590}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/lroRecoverCertificateName-canresumefromastoppedpoller-/pending"}}, [
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
  'e0706d39-aad1-41a2-ba03-8a4257209c66',
  'x-ms-request-id',
  'b7b03515-b5c1-4f5d-afde-3c61728a16af',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:51:13 GMT',
  'Content-Length',
  '2630'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroRecoverCertificateName-canresumefromastoppedpoller-/')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"A certificate with (name/id) lroRecoverCertificateName-canresumefromastoppedpoller- was not found in this key vault. If you recently deleted this certificate you may be able to recover it using the correct recovery command. For help resolving this issue, please see https://go.microsoft.com/fwlink/?linkid=2125182"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '383',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '0bc52b2d-003d-4b0d-bb36-e434547473c4',
  'x-ms-request-id',
  'acd3b0ad-e468-4c03-90a9-7833954d9828',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:51:13 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroRecoverCertificateName-canresumefromastoppedpoller-/')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"A certificate with (name/id) lroRecoverCertificateName-canresumefromastoppedpoller- was not found in this key vault. If you recently deleted this certificate you may be able to recover it using the correct recovery command. For help resolving this issue, please see https://go.microsoft.com/fwlink/?linkid=2125182"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '383',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '3e0abde9-81f8-4b42-a117-f43fc000db2f',
  'x-ms-request-id',
  '9d3b803c-f25a-4615-9736-f7ad9e6c73c1',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:51:13 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroRecoverCertificateName-canresumefromastoppedpoller-/')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"A certificate with (name/id) lroRecoverCertificateName-canresumefromastoppedpoller- was not found in this key vault. If you recently deleted this certificate you may be able to recover it using the correct recovery command. For help resolving this issue, please see https://go.microsoft.com/fwlink/?linkid=2125182"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '383',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'f65e6571-d19e-49e0-af7f-5be2dad5bbc4',
  'x-ms-request-id',
  '4a808911-4ea4-45ea-8b57-a1e6014f2f04',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:51:13 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroRecoverCertificateName-canresumefromastoppedpoller-/')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"A certificate with (name/id) lroRecoverCertificateName-canresumefromastoppedpoller- was not found in this key vault. If you recently deleted this certificate you may be able to recover it using the correct recovery command. For help resolving this issue, please see https://go.microsoft.com/fwlink/?linkid=2125182"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '383',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'f55c8a38-8490-4d3c-8c3f-b70afcc5b9c9',
  'x-ms-request-id',
  '1b74a01b-0c86-48b8-9add-2e0c1fd0ac4e',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:51:14 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroRecoverCertificateName-canresumefromastoppedpoller-/')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"A certificate with (name/id) lroRecoverCertificateName-canresumefromastoppedpoller- was not found in this key vault. If you recently deleted this certificate you may be able to recover it using the correct recovery command. For help resolving this issue, please see https://go.microsoft.com/fwlink/?linkid=2125182"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '383',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '67435f85-8621-4c9c-b343-8cf15696f7bb',
  'x-ms-request-id',
  'be98ffbd-6d72-4853-b7d3-0cc340b93d7d',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:51:16 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroRecoverCertificateName-canresumefromastoppedpoller-/')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"A certificate with (name/id) lroRecoverCertificateName-canresumefromastoppedpoller- was not found in this key vault. If you recently deleted this certificate you may be able to recover it using the correct recovery command. For help resolving this issue, please see https://go.microsoft.com/fwlink/?linkid=2125182"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '383',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '4c9b5c14-1dc9-4b49-ad91-2f7cfee081da',
  'x-ms-request-id',
  '6e6820fb-5ea8-40d6-8acf-4b57f6cd18ce',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:51:17 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroRecoverCertificateName-canresumefromastoppedpoller-/')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"A certificate with (name/id) lroRecoverCertificateName-canresumefromastoppedpoller- was not found in this key vault. If you recently deleted this certificate you may be able to recover it using the correct recovery command. For help resolving this issue, please see https://go.microsoft.com/fwlink/?linkid=2125182"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '383',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'a3b8ec51-c981-4fae-8f85-324838fad227',
  'x-ms-request-id',
  '069ab082-273e-4fc2-92d1-eb95c493b797',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:51:19 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroRecoverCertificateName-canresumefromastoppedpoller-/')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"A certificate with (name/id) lroRecoverCertificateName-canresumefromastoppedpoller- was not found in this key vault. If you recently deleted this certificate you may be able to recover it using the correct recovery command. For help resolving this issue, please see https://go.microsoft.com/fwlink/?linkid=2125182"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '383',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '43ef8507-f2f2-4ba4-a54a-1fa1d13f2234',
  'x-ms-request-id',
  '6114c649-123e-4abe-aece-cf0a1862d669',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:51:22 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroRecoverCertificateName-canresumefromastoppedpoller-/')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"A certificate with (name/id) lroRecoverCertificateName-canresumefromastoppedpoller- was not found in this key vault. If you recently deleted this certificate you may be able to recover it using the correct recovery command. For help resolving this issue, please see https://go.microsoft.com/fwlink/?linkid=2125182"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '383',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '3ea63413-7a52-4cbd-b81e-a7b8f9ee2c88',
  'x-ms-request-id',
  'b963241d-c137-4d4e-bfa3-df75142966f4',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:51:24 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroRecoverCertificateName-canresumefromastoppedpoller-/')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"A certificate with (name/id) lroRecoverCertificateName-canresumefromastoppedpoller- was not found in this key vault. If you recently deleted this certificate you may be able to recover it using the correct recovery command. For help resolving this issue, please see https://go.microsoft.com/fwlink/?linkid=2125182"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '383',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'f88b9b7b-37de-42b7-8940-bc41a664a81f',
  'x-ms-request-id',
  '4143836a-fe57-4d11-9778-51508fbe5ef0',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:51:26 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroRecoverCertificateName-canresumefromastoppedpoller-/')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"A certificate with (name/id) lroRecoverCertificateName-canresumefromastoppedpoller- was not found in this key vault. If you recently deleted this certificate you may be able to recover it using the correct recovery command. For help resolving this issue, please see https://go.microsoft.com/fwlink/?linkid=2125182"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '383',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '28b97266-c08d-4476-bb34-8fd30fcd7e3b',
  'x-ms-request-id',
  '54402f48-9eb1-402b-8207-fbdd66cd5691',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:51:28 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroRecoverCertificateName-canresumefromastoppedpoller-/')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"A certificate with (name/id) lroRecoverCertificateName-canresumefromastoppedpoller- was not found in this key vault. If you recently deleted this certificate you may be able to recover it using the correct recovery command. For help resolving this issue, please see https://go.microsoft.com/fwlink/?linkid=2125182"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '383',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '7028f005-336d-4f9e-b8e5-8a01bfd32134',
  'x-ms-request-id',
  '04353427-b830-483b-b433-00ef9b34efc1',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:51:30 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroRecoverCertificateName-canresumefromastoppedpoller-/')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"A certificate with (name/id) lroRecoverCertificateName-canresumefromastoppedpoller- was not found in this key vault. If you recently deleted this certificate you may be able to recover it using the correct recovery command. For help resolving this issue, please see https://go.microsoft.com/fwlink/?linkid=2125182"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '383',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '15ff2414-e91f-40fd-b94c-2bd161b6b682',
  'x-ms-request-id',
  '3efb90f9-dbba-4836-9db1-32ffd2eee5a7',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:51:32 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroRecoverCertificateName-canresumefromastoppedpoller-/')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"A certificate with (name/id) lroRecoverCertificateName-canresumefromastoppedpoller- was not found in this key vault. If you recently deleted this certificate you may be able to recover it using the correct recovery command. For help resolving this issue, please see https://go.microsoft.com/fwlink/?linkid=2125182"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '383',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'da479b3d-64ef-4d19-9c16-426edc5b5ca8',
  'x-ms-request-id',
  '39e447f3-320b-4b6d-9e90-6b4155767af8',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:51:35 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroRecoverCertificateName-canresumefromastoppedpoller-/')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"A certificate with (name/id) lroRecoverCertificateName-canresumefromastoppedpoller- was not found in this key vault. If you recently deleted this certificate you may be able to recover it using the correct recovery command. For help resolving this issue, please see https://go.microsoft.com/fwlink/?linkid=2125182"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '383',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '4ad14d80-bb7d-4de0-a351-91c29fb1d95a',
  'x-ms-request-id',
  'c70571da-fd79-4bb7-a2d4-9bdf9af41632',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:51:37 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroRecoverCertificateName-canresumefromastoppedpoller-/')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"A certificate with (name/id) lroRecoverCertificateName-canresumefromastoppedpoller- was not found in this key vault. If you recently deleted this certificate you may be able to recover it using the correct recovery command. For help resolving this issue, please see https://go.microsoft.com/fwlink/?linkid=2125182"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '383',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'a941f639-481a-48c0-8c1a-ae7f839a639f',
  'x-ms-request-id',
  'd02bc109-52bf-4ba1-ac62-146f98a5f6ad',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:51:39 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroRecoverCertificateName-canresumefromastoppedpoller-/')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"A certificate with (name/id) lroRecoverCertificateName-canresumefromastoppedpoller- was not found in this key vault. If you recently deleted this certificate you may be able to recover it using the correct recovery command. For help resolving this issue, please see https://go.microsoft.com/fwlink/?linkid=2125182"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '383',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '78f516a9-da0f-40a3-b340-5aa98d8c6a6d',
  'x-ms-request-id',
  '76340ef5-4bc0-4a19-8546-e85fac38f129',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:51:41 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroRecoverCertificateName-canresumefromastoppedpoller-/')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"A certificate with (name/id) lroRecoverCertificateName-canresumefromastoppedpoller- was not found in this key vault. If you recently deleted this certificate you may be able to recover it using the correct recovery command. For help resolving this issue, please see https://go.microsoft.com/fwlink/?linkid=2125182"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '383',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'b58e15d5-657a-410a-a65d-14427acdaf99',
  'x-ms-request-id',
  '3802f57a-95cb-423d-b1ca-a82632e00ef5',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:51:43 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroRecoverCertificateName-canresumefromastoppedpoller-/')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"A certificate with (name/id) lroRecoverCertificateName-canresumefromastoppedpoller- was not found in this key vault. If you recently deleted this certificate you may be able to recover it using the correct recovery command. For help resolving this issue, please see https://go.microsoft.com/fwlink/?linkid=2125182"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '383',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'eabb9159-576c-49ec-8b2d-486f54aea4ab',
  'x-ms-request-id',
  'bd2d89cd-b371-4fd3-9035-ed0a6048a4bf',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:51:45 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroRecoverCertificateName-canresumefromastoppedpoller-/')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroRecoverCertificateName-canresumefromastoppedpoller-/9811f348e5cb4e99a004242d1ce6a8db","kid":"https://keyvault_name.vault.azure.net/keys/lroRecoverCertificateName-canresumefromastoppedpoller-/9811f348e5cb4e99a004242d1ce6a8db","sid":"https://keyvault_name.vault.azure.net/secrets/lroRecoverCertificateName-canresumefromastoppedpoller-/9811f348e5cb4e99a004242d1ce6a8db","x5t":"EhdirwHssRlU22T37bWzWgCGJKA","cer":"MIIDKDCCAhCgAwIBAgIQdudGBYphTTOfERNLst+bYTANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjEwNDI4MjE0MDM2WhcNMjIwNDI4MjE1MDM2WjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQCigNXBKS/4XK2zkdEJaSzNyq1FX/h9rVFD0W6nXtYTdjAPkqRUq0nJmniCBb5TUWUeNOU0yqVsdfHrLc4069DMWbaaeSWhg39DPltyI+chKMfm8RvgItA8ABLmu2GG8hrOdKIovKwPJsbzxstbf2umYo3JrGX+J9o6Bqxu6qDUimrx8f7tZIbaxtIbvODRJSKTKwPk2nk6V+S3ML6mfWn7gWMCaKfH/RW/8QHBC5c8fdsd1GJwIhydNq301a2Zk01sasOB+qSt6kHF3mSjXM6OQ7t26oTzuZsp9UmqOxatD6hfFDyBkeRN/J1O9nKDMlkIdjWM7TS77xiEKR/ytnpNAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBQtOSj/jOe/s06rK7ethUpKBNeXeDAdBgNVHQ4EFgQULTko/4znv7NOqyu3rYVKSgTXl3gwDQYJKoZIhvcNAQELBQADggEBAI57dm2K9GykGzxc9vGdRwnMzjJmqakjLjmKgEltP+DxPviCCe22BGB1cX/wrTbHFp/wzTkOB4tDier5bL9M2xWWOKPcLWhOv6dWpHAaRV/hZ4Kp0iyZcqPM5WREDWOv6xT8yNFSmQ4pOnmeZ3y/pXzLuEhT22lpCxIPP1M9/x0WK329qrFcj0euInF69JPVsphfrXpqKxk8hX0NdbPtcuNDJPr91v19zbiZP5yRx61XuOK3AzoFki5t9aEWUc2DvuErJRZdgTI60q5bX7iSDcM6RS+eM1QVsW+v7n4NukAmeVW/hbmTe/R7c9fbK0Ckt6Q1sUKELdKYKouZBg/jWHI=","attributes":{"enabled":true,"nbf":1619646036,"exp":1651182636,"created":1619646637,"updated":1619646637,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/lroRecoverCertificateName-canresumefromastoppedpoller-/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1619646590,"updated":1619646590}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/lroRecoverCertificateName-canresumefromastoppedpoller-/pending"}}, [
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
  '222afa65-a122-4334-bfdb-1b9d470ffec4',
  'x-ms-request-id',
  '5a14cd3f-d5d9-43eb-8315-eb9433002707',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:51:47 GMT',
  'Content-Length',
  '2630'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/certificates/lroRecoverCertificateName-canresumefromastoppedpoller-')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/lroRecoverCertificateName-canresumefromastoppedpoller-","deletedDate":1619646707,"scheduledPurgeDate":1627422707,"id":"https://keyvault_name.vault.azure.net/certificates/lroRecoverCertificateName-canresumefromastoppedpoller-/9811f348e5cb4e99a004242d1ce6a8db","kid":"https://keyvault_name.vault.azure.net/keys/lroRecoverCertificateName-canresumefromastoppedpoller-/9811f348e5cb4e99a004242d1ce6a8db","sid":"https://keyvault_name.vault.azure.net/secrets/lroRecoverCertificateName-canresumefromastoppedpoller-/9811f348e5cb4e99a004242d1ce6a8db","x5t":"EhdirwHssRlU22T37bWzWgCGJKA","cer":"MIIDKDCCAhCgAwIBAgIQdudGBYphTTOfERNLst+bYTANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjEwNDI4MjE0MDM2WhcNMjIwNDI4MjE1MDM2WjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQCigNXBKS/4XK2zkdEJaSzNyq1FX/h9rVFD0W6nXtYTdjAPkqRUq0nJmniCBb5TUWUeNOU0yqVsdfHrLc4069DMWbaaeSWhg39DPltyI+chKMfm8RvgItA8ABLmu2GG8hrOdKIovKwPJsbzxstbf2umYo3JrGX+J9o6Bqxu6qDUimrx8f7tZIbaxtIbvODRJSKTKwPk2nk6V+S3ML6mfWn7gWMCaKfH/RW/8QHBC5c8fdsd1GJwIhydNq301a2Zk01sasOB+qSt6kHF3mSjXM6OQ7t26oTzuZsp9UmqOxatD6hfFDyBkeRN/J1O9nKDMlkIdjWM7TS77xiEKR/ytnpNAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBQtOSj/jOe/s06rK7ethUpKBNeXeDAdBgNVHQ4EFgQULTko/4znv7NOqyu3rYVKSgTXl3gwDQYJKoZIhvcNAQELBQADggEBAI57dm2K9GykGzxc9vGdRwnMzjJmqakjLjmKgEltP+DxPviCCe22BGB1cX/wrTbHFp/wzTkOB4tDier5bL9M2xWWOKPcLWhOv6dWpHAaRV/hZ4Kp0iyZcqPM5WREDWOv6xT8yNFSmQ4pOnmeZ3y/pXzLuEhT22lpCxIPP1M9/x0WK329qrFcj0euInF69JPVsphfrXpqKxk8hX0NdbPtcuNDJPr91v19zbiZP5yRx61XuOK3AzoFki5t9aEWUc2DvuErJRZdgTI60q5bX7iSDcM6RS+eM1QVsW+v7n4NukAmeVW/hbmTe/R7c9fbK0Ckt6Q1sUKELdKYKouZBg/jWHI=","attributes":{"enabled":true,"nbf":1619646036,"exp":1651182636,"created":1619646637,"updated":1619646637,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/lroRecoverCertificateName-canresumefromastoppedpoller-/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1619646590,"updated":1619646590}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/lroRecoverCertificateName-canresumefromastoppedpoller-/pending"}}, [
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
  'f82aa753-2ab4-40cf-97ac-f70912acb8ac',
  'x-ms-request-id',
  '98706901-2148-47c6-a55a-0b8c23bacf36',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:51:47 GMT',
  'Content-Length',
  '2838'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroRecoverCertificateName-canresumefromastoppedpoller-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroRecoverCertificateName-canresumefromastoppedpoller-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '155',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'e10d6d62-f712-431f-afbd-f6d760ba8d10',
  'x-ms-request-id',
  'e4737946-de98-406d-adc1-8af1ecccf5be',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:51:47 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroRecoverCertificateName-canresumefromastoppedpoller-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroRecoverCertificateName-canresumefromastoppedpoller-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '155',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '7bf9efa4-a05c-457e-8d11-714a5a02312b',
  'x-ms-request-id',
  '754b030c-fe68-49dd-8efd-6f57e1a32b42',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:51:47 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroRecoverCertificateName-canresumefromastoppedpoller-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroRecoverCertificateName-canresumefromastoppedpoller-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '155',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '1b4f6f95-e549-46ec-b254-97b5437396b0',
  'x-ms-request-id',
  '74e08a63-4c0c-4617-a241-11ff3f5969b6',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:51:49 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroRecoverCertificateName-canresumefromastoppedpoller-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroRecoverCertificateName-canresumefromastoppedpoller-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '155',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '06d6ff8a-6b44-4984-8d10-888d6ff1aec4',
  'x-ms-request-id',
  'c68ba428-9a54-44d0-a0a1-b011b9712b33',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:51:52 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroRecoverCertificateName-canresumefromastoppedpoller-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroRecoverCertificateName-canresumefromastoppedpoller-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '155',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '035d3502-be8c-4a8c-a835-bb0d69bdde3c',
  'x-ms-request-id',
  'b6f901fa-c969-4327-852d-c0a14d7c57c7',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:51:54 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroRecoverCertificateName-canresumefromastoppedpoller-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroRecoverCertificateName-canresumefromastoppedpoller-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '155',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '7a15b42b-3f06-4f6c-95b1-adf3b2f4a624',
  'x-ms-request-id',
  '481832c3-2d99-4c11-ba2b-2ab30fa2a4bd',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:51:56 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroRecoverCertificateName-canresumefromastoppedpoller-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroRecoverCertificateName-canresumefromastoppedpoller-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '155',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '49aae717-6c90-4312-9659-d46c45f66be2',
  'x-ms-request-id',
  '01d7ad02-0452-4877-b91e-de09cfc5b3a6',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:51:58 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroRecoverCertificateName-canresumefromastoppedpoller-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroRecoverCertificateName-canresumefromastoppedpoller-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '155',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '944597f8-66ba-4fe7-b1e3-c5b0a7b6c901',
  'x-ms-request-id',
  'ee168fff-71fa-4ef1-930c-8bacf2640a00',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:52:00 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroRecoverCertificateName-canresumefromastoppedpoller-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroRecoverCertificateName-canresumefromastoppedpoller-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '155',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'e51b4bcd-5cf8-4452-bf65-29f83a0b115d',
  'x-ms-request-id',
  '48789790-d15d-4749-bbcf-4ec8d77230d5',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:52:02 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroRecoverCertificateName-canresumefromastoppedpoller-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroRecoverCertificateName-canresumefromastoppedpoller-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '155',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '5e074613-e15b-4535-8cd2-3f2fe30f17e2',
  'x-ms-request-id',
  'fc7f4060-afba-4717-b23e-dd3343e8cf37',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:52:03 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroRecoverCertificateName-canresumefromastoppedpoller-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroRecoverCertificateName-canresumefromastoppedpoller-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '155',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'e01a62aa-8e14-4367-b4d9-fe8872ffcb90',
  'x-ms-request-id',
  '23c0e991-23ee-467f-a88f-15e5c98893b1',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:52:06 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroRecoverCertificateName-canresumefromastoppedpoller-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroRecoverCertificateName-canresumefromastoppedpoller-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '155',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '78dfd56b-a6c7-47d8-95ae-c5fb91070dad',
  'x-ms-request-id',
  'a9152a78-ab05-47e7-8d17-8e97e8d4f38f',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:52:08 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroRecoverCertificateName-canresumefromastoppedpoller-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroRecoverCertificateName-canresumefromastoppedpoller-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '155',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '25552cd7-5fa2-4abd-9c25-7c67c95bded6',
  'x-ms-request-id',
  '72c6bc1e-c6ba-43b3-bb3a-1b34c9d03b49',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:52:10 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroRecoverCertificateName-canresumefromastoppedpoller-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroRecoverCertificateName-canresumefromastoppedpoller-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '155',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'e3771eb6-ca5b-4b41-91b4-0b43e5816ac2',
  'x-ms-request-id',
  '00277791-0fa5-41e2-b48a-cbad471d026a',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:52:12 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroRecoverCertificateName-canresumefromastoppedpoller-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroRecoverCertificateName-canresumefromastoppedpoller-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '155',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'b669a4ac-5dae-4683-97f8-ca2fcaef3d9f',
  'x-ms-request-id',
  '3747d685-77cc-4cf6-954c-69ee6b2ed405',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:52:14 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroRecoverCertificateName-canresumefromastoppedpoller-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroRecoverCertificateName-canresumefromastoppedpoller-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '155',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '388cbbcc-39ad-4bf0-84d7-b36330272fde',
  'x-ms-request-id',
  '64188d61-d03f-412d-b8a1-c906a35a8769',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:52:16 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroRecoverCertificateName-canresumefromastoppedpoller-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroRecoverCertificateName-canresumefromastoppedpoller-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '155',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'f69675f1-20a0-49b2-9cb1-15ba5ac9460c',
  'x-ms-request-id',
  'e3074978-9db4-4104-93ff-447cf8cf85c8',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:52:18 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroRecoverCertificateName-canresumefromastoppedpoller-')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/lroRecoverCertificateName-canresumefromastoppedpoller-","deletedDate":1619646707,"scheduledPurgeDate":1627422707,"id":"https://keyvault_name.vault.azure.net/certificates/lroRecoverCertificateName-canresumefromastoppedpoller-/9811f348e5cb4e99a004242d1ce6a8db","kid":"https://keyvault_name.vault.azure.net/keys/lroRecoverCertificateName-canresumefromastoppedpoller-/9811f348e5cb4e99a004242d1ce6a8db","sid":"https://keyvault_name.vault.azure.net/secrets/lroRecoverCertificateName-canresumefromastoppedpoller-/9811f348e5cb4e99a004242d1ce6a8db","x5t":"EhdirwHssRlU22T37bWzWgCGJKA","cer":"MIIDKDCCAhCgAwIBAgIQdudGBYphTTOfERNLst+bYTANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjEwNDI4MjE0MDM2WhcNMjIwNDI4MjE1MDM2WjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQCigNXBKS/4XK2zkdEJaSzNyq1FX/h9rVFD0W6nXtYTdjAPkqRUq0nJmniCBb5TUWUeNOU0yqVsdfHrLc4069DMWbaaeSWhg39DPltyI+chKMfm8RvgItA8ABLmu2GG8hrOdKIovKwPJsbzxstbf2umYo3JrGX+J9o6Bqxu6qDUimrx8f7tZIbaxtIbvODRJSKTKwPk2nk6V+S3ML6mfWn7gWMCaKfH/RW/8QHBC5c8fdsd1GJwIhydNq301a2Zk01sasOB+qSt6kHF3mSjXM6OQ7t26oTzuZsp9UmqOxatD6hfFDyBkeRN/J1O9nKDMlkIdjWM7TS77xiEKR/ytnpNAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBQtOSj/jOe/s06rK7ethUpKBNeXeDAdBgNVHQ4EFgQULTko/4znv7NOqyu3rYVKSgTXl3gwDQYJKoZIhvcNAQELBQADggEBAI57dm2K9GykGzxc9vGdRwnMzjJmqakjLjmKgEltP+DxPviCCe22BGB1cX/wrTbHFp/wzTkOB4tDier5bL9M2xWWOKPcLWhOv6dWpHAaRV/hZ4Kp0iyZcqPM5WREDWOv6xT8yNFSmQ4pOnmeZ3y/pXzLuEhT22lpCxIPP1M9/x0WK329qrFcj0euInF69JPVsphfrXpqKxk8hX0NdbPtcuNDJPr91v19zbiZP5yRx61XuOK3AzoFki5t9aEWUc2DvuErJRZdgTI60q5bX7iSDcM6RS+eM1QVsW+v7n4NukAmeVW/hbmTe/R7c9fbK0Ckt6Q1sUKELdKYKouZBg/jWHI=","attributes":{"enabled":true,"nbf":1619646036,"exp":1651182636,"created":1619646637,"updated":1619646637,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/lroRecoverCertificateName-canresumefromastoppedpoller-/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1619646590,"updated":1619646590}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/lroRecoverCertificateName-canresumefromastoppedpoller-/pending"}}, [
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
  '1db78e23-20ea-41ef-9a9b-7a3bfee99a1e',
  'x-ms-request-id',
  '0bbeca9c-c2e6-4b61-8db0-3bc463211ebf',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:52:21 GMT',
  'Content-Length',
  '2838'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedcertificates/lroRecoverCertificateName-canresumefromastoppedpoller-')
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
  'b1c81205-9025-4265-97a5-545a10092d38',
  'x-ms-request-id',
  '99491b84-73a6-40e1-bb3a-fcfcdac87c28',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:52:21 GMT'
]);

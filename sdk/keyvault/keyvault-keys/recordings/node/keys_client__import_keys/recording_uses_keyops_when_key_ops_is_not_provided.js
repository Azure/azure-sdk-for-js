let nock = require('nock');

module.exports.hash = "bb2fb23c73e3c86706f7187bafcebbea";

module.exports.testInfo = {"uniqueName":{"keyops":"keyops163477354153107821"},"newDate":{}}

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .put('/keys/keyops163477354153107821')
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
  'f770dfdd-b9a7-4b47-989d-38261433c025',
  'x-ms-request-id',
  '9354c2b4-3872-4c8f-86d5-eaf1b7adf9bf',
  'x-ms-keyvault-service-version',
  '1.9.150.1',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 20 Oct 2021 23:45:39 GMT'
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
  '24ce9361-04fe-4df2-9ccb-5bea03255700',
  'x-ms-ests-server',
  '2.1.12158.6 - EUS ProdSlices',
  'Set-Cookie',
  'fpc=AtV1EjK9S-tAkhMw1pQeyK0; expires=Fri, 19-Nov-2021 23:45:40 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrgrIEyW51dalQDp-RHjaCuCqauJZup5mNAamM3qXw10t1Wv-4SirwEyB6xAcYeF8xPOuxamCn--8_z5K5nvlSDJlKeP67_Nn5JemEJR6Suk9zwjrahMuUBBSx5AGiCSK8s0OrWQrgHLhfcxXN2O97Ik3scfZUB65gpAzD1iLAQ_sgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 20 Oct 2021 23:45:40 GMT',
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
  'c641e876-9f13-4f57-a451-bb0336d72301',
  'x-ms-ests-server',
  '2.1.12158.6 - SCUS ProdSlices',
  'Set-Cookie',
  'fpc=AgvMDMibNPxHuBdb1B7wCdM; expires=Fri, 19-Nov-2021 23:45:40 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevr7hRpEBWvuBZcYDOL5Spasp6mH83lhd3-jIq1WaFPKanH1AZXcils3Sx8U46ghtgAvpy1yo4UQZD9ioxONL5xlyHR-pjc2SaWCRyBJaxVn-z_Q30gXZDazUUS_IPi0Z5slYQ4x-gormQkT0IOpkdX2Llzi7KdKScGvAq03LCFEjcgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 20 Oct 2021 23:45:40 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/12345678-1234-1234-1234-123456789012/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.3.2&x-client-OS=linux&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=d56fac40-086e-4f44-b6f3-3c7442a5bd2e&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22CP1%22%5D%7D%7D%7D")
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
  '708f578a-685a-4a67-8a57-af642e460501',
  'x-ms-ests-server',
  '2.1.12158.6 - NCUS ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=AicuQGYJoWRFg2NHOBFRiVsW-HEQAQAAACOhAtkOAAAA; expires=Fri, 19-Nov-2021 23:45:40 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 20 Oct 2021 23:45:40 GMT',
  'Content-Length',
  '1315'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .put('/keys/keyops163477354153107821', {"key":{"kty":"RSA","key_ops":["sign","verify"],"n":"AKCRTQAjSsaDshtMFdW-2Ie9yVnC5Xr1Suc06PAHINd10nXkVSB-N4TO62ClCkZV3XKnqU0nHo7o95WaZpym53W_DiO62umRtFKdl4UotL2QUh0y3SZWeWuoK2u_x2aMj17rUFN0f9GZMZ0pqEQNCPRBLVJ_-TEe2nGCWSC0exxGsRqz6R1zFkB-icfzQPe4WjQELOUXQ7J9RxhAPTTHtDivYYG-BeTRHrmF04JT1_6b9T_C8bAC0i0teT-nmlBLarQtBJKATXBx1yegbPOoiTqlQrFQP4MrKWNxtnB9Tcbjcvj-Z9je0ckI_eRc4DvAhqcUh_p15Dqg4GeaoNIO_jU","e":"AQAB","d":"Ynx9JGaBSP4iUsf6ZJ6opantRNdcdmzaQrKbZg6ZQE8Ohi1FYabJWvaoPSE-CiJEsDzShXZHMhUHN4X7Bn8BXaGQhK3p9HXgiwQKmix7oAJTu4ElUIyd8UC3UWHSZr40el4PaQD-HYu_eMzCXus34MnRiNbh_BUWm6T-Eidhk9d3kNIyaSi9YNDQHW6tjWrEhhq63O7JU1j9ZonFChZxpKk20jdkQKQURVAdpOdL-5j4I70ZxFuU6wHZj8DS8oRQfwGOvZKbgYDb5jgf3UNL_7eACqq92XPVX56vm7iKbqeyjCqAIx5y3hrSRIJtZlWCwjYnYQGd4unxDLi8wmJWSQ","dp":"AMmhWb5yZcu6vJr8xJZ-t0_likxJRUMZAtEULaWZt2DgODj4y9JrZDJP6mvckzhQP0WXk2NuWbU2HR5pUeCN2wieG1B76VKoH76vfnaJDqT1NuJVBcP2SLHog3ffwZtMME5zjfygchG3kihqOSpwTQ9ETAqAJTkRC38fEhwAz_Cp","dq":"AKC9TAo9n2RDaggjdLXK8kiLrBVoaWFTpqXkzYXRhtsx4vWPAkxhfSnze05rVMl6HiXv7FnE0f0wYawzUJzoyuXBH0zS6D9BqCZPeF543AmWB27iPf38Q9Z8Rjr6oBgMSnGDV_mm8nDVQkeaDyE4cOZh-5UKvKShTKKQVwunmDNH","qi":"AJ_nrkLpK8BPzVeARkvSHQyKwMWZ-a8CD95qsKfn0dOZAvXY-2xhQYTEwbED-0bpTNEKbIpA-ZkaHygmnzJkNbbFAnb9pkkzU8ZQqDP3JNgMfVIroWx58Oth9nJza2j7i-MkPRCUPEq3Ao0J52z7WJIiLji8TTVYW_NaiM1oxzsH","p":"ANHerI1o3dLB_VLVmZZVss8VZSYN5SaeQ_0qhfOSgOFwj__waCFmy2EG7l6l6f_Z-Y0L7Mn_LNov68lyWSFa2EuQUeVj4UoFHc5Di8ZUGiSsTwFM-XMtNuv8HmGgDYLL5BIJD3eTz71LdgW-Ez38OZH34b7VeG8zfeUDb8Hi30zz","q":"AMPcZrZBqbc82DO8Q5zTT8ZXRGWrW36KktMllaIk1W2RHnRiQiW0jBWmcCgqUcQNHa1LwumjyNqwx28QBS37BTvG7ULGUoio6LrOeoiBGEMj-U19sX6m37plEhj5Mak7j3OPPY_T9rohjTW5aGGg9YSwq4jdz0RrmBX00ofYOjI3"}})
  .query(true)
  .reply(200, {"key":{"kid":"https://keyvault_name.vault.azure.net/keys/keyops163477354153107821/8350d8cd5d4f4761ac9b93d26658ac65","kty":"RSA","key_ops":["sign","verify"],"n":"oJFNACNKxoOyG0wV1b7Yh73JWcLlevVK5zTo8Acg13XSdeRVIH43hM7rYKUKRlXdcqepTScejuj3lZpmnKbndb8OI7ra6ZG0Up2XhSi0vZBSHTLdJlZ5a6gra7_HZoyPXutQU3R_0ZkxnSmoRA0I9EEtUn_5MR7acYJZILR7HEaxGrPpHXMWQH6Jx_NA97haNAQs5RdDsn1HGEA9NMe0OK9hgb4F5NEeuYXTglPX_pv1P8LxsALSLS15P6eaUEtqtC0EkoBNcHHXJ6Bs86iJOqVCsVA_gyspY3G2cH1NxuNy-P5n2N7RyQj95FzgO8CGpxSH-nXkOqDgZ5qg0g7-NQ","e":"AQAB"},"attributes":{"enabled":true,"created":1634773540,"updated":1634773540,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7}}, [
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
  'f770dfdd-b9a7-4b47-989d-38261433c025',
  'x-ms-request-id',
  '5ca6faed-49ec-4626-9a05-bf59fe3cd0a3',
  'x-ms-keyvault-service-version',
  '1.9.150.1',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 20 Oct 2021 23:45:40 GMT',
  'Content-Length',
  '662'
]);

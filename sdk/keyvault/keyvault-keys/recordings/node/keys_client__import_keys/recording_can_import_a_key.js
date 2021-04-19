let nock = require('nock');

module.exports.hash = "752b83a6a49a7f25f825dc706cf1e6c8";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .put('/keys/importKeyName-canimportakey-')
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
  'Bearer authorization="https://login.windows.net/azuretenantid", resource="https://vault.azure.net"',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '3d6b6abe-981d-460f-9b29-3483d989ca43',
  'x-ms-request-id',
  '5f1b761c-f11f-4949-869e-4fe40a230043',
  'x-ms-keyvault-service-version',
  '1.2.236.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=20.94.195.230;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 19 Apr 2021 22:32:26 GMT'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .get('/common/discovery/instance')
  .query(true)
  .reply(200, {"tenant_discovery_endpoint":"https://login.microsoftonline.com/azuretenantid/v2.0/.well-known/openid-configuration","api-version":"1.1","metadata":[{"preferred_network":"login.microsoftonline.com","preferred_cache":"login.windows.net","aliases":["login.microsoftonline.com","login.windows.net","login.microsoft.com","sts.windows.net"]},{"preferred_network":"login.partner.microsoftonline.cn","preferred_cache":"login.partner.microsoftonline.cn","aliases":["login.partner.microsoftonline.cn","login.chinacloudapi.cn"]},{"preferred_network":"login.microsoftonline.de","preferred_cache":"login.microsoftonline.de","aliases":["login.microsoftonline.de"]},{"preferred_network":"login.microsoftonline.us","preferred_cache":"login.microsoftonline.us","aliases":["login.microsoftonline.us","login.usgovcloudapi.net"]},{"preferred_network":"login-us.microsoftonline.com","preferred_cache":"login-us.microsoftonline.com","aliases":["login-us.microsoftonline.com"]}]}, [
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
  'd05d9f61-187c-4191-95e1-d81a8a8b7e00',
  'x-ms-ests-server',
  '2.1.11654.13 - EUS ProdSlices',
  'Set-Cookie',
  'fpc=Am4P9qXnsuVOnZ-0fdcw79ML6tuIBQAAAK36D9gOAAAA; expires=Wed, 19-May-2021 22:32:26 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrUfeOTAjv4JTn57bKx0LMqdHIMTtgt_F_GPZj43zyJRydEMl_HaAMlPmADHA0MPGuLr7MyplDQGOL_qKdxuIvbkbPlLG7vYLoUJitl3XPRb8BTd-d8aZXrvK09qfXVA88E58qC2w_QIbTWk6S-0spaXi-cbrIQdKrFp4getw8-NIgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Mon, 19 Apr 2021 22:32:25 GMT',
  'Content-Length',
  '980'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .get('/azuretenantid/v2.0/.well-known/openid-configuration')
  .reply(200, {"token_endpoint":"https://login.microsoftonline.com/azuretenantid/oauth2/v2.0/token","token_endpoint_auth_methods_supported":["client_secret_post","private_key_jwt","client_secret_basic"],"jwks_uri":"https://login.microsoftonline.com/azuretenantid/discovery/v2.0/keys","response_modes_supported":["query","fragment","form_post"],"subject_types_supported":["pairwise"],"id_token_signing_alg_values_supported":["RS256"],"response_types_supported":["code","id_token","code id_token","id_token token"],"scopes_supported":["openid","profile","email","offline_access"],"issuer":"https://login.microsoftonline.com/azuretenantid/v2.0","request_uri_parameter_supported":false,"userinfo_endpoint":"https://graph.microsoft.com/oidc/userinfo","authorization_endpoint":"https://login.microsoftonline.com/azuretenantid/oauth2/v2.0/authorize","device_authorization_endpoint":"https://login.microsoftonline.com/azuretenantid/oauth2/v2.0/devicecode","http_logout_supported":true,"frontchannel_logout_supported":true,"end_session_endpoint":"https://login.microsoftonline.com/azuretenantid/oauth2/v2.0/logout","claims_supported":["sub","iss","cloud_instance_name","cloud_instance_host_name","cloud_graph_host_name","msgraph_host","aud","exp","iat","auth_time","acr","nonce","preferred_username","name","tid","ver","at_hash","c_hash","email"],"tenant_region_scope":"WW","cloud_instance_name":"microsoftonline.com","cloud_graph_host_name":"graph.windows.net","msgraph_host":"graph.microsoft.com","rbac_url":"https://pas.windows.net"}, [
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
  '74de1575-bc6e-4cfd-9d48-b99f04620500',
  'x-ms-ests-server',
  '2.1.11654.16 - NCUS ProdSlices',
  'Set-Cookie',
  'fpc=Am4P9qXnsuVOnZ-0fdcw79ML6tuIBQAAAK36D9gOAAAA; expires=Wed, 19-May-2021 22:32:26 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevryFu6AqSpSeqOWcRBp4STdXz9CyYM1Rc92usDJwsSWrlRWX05xsTpePqd_bqZvi3bMT6h02-Hgw65k2vB7H1dHt_MzfCrORPwjkQCQ7JOCftFZ03kB2bPVlODH9duOLux8YRbPR_Q99x0yQdyFnzomfnfS7-dn7BW2nL6aUErttIgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Mon, 19 Apr 2021 22:32:26 GMT',
  'Content-Length',
  '1651'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .filteringRequestBody(function (body) {
            return body.replace(/client-request-id=[^&]*/g, "client-request-id=client-request-id");
        })
  .post('/azuretenantid/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fvault.azure.net%2F.default%20openid%20profile%20offline_access&grant_type=client_credentials&client-request-id=client-request-id&client_secret=azure_client_secret")
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
  '91ace131-1ae8-40a9-be8a-7aa7c9050600',
  'x-ms-ests-server',
  '2.1.11654.16 - EUS ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=Am4P9qXnsuVOnZ-0fdcw79ML6tuIAQAAANn7D9gOAAAA; expires=Wed, 19-May-2021 22:32:26 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Mon, 19 Apr 2021 22:32:26 GMT',
  'Content-Length',
  '1315'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .put('/keys/importKeyName-canimportakey-', {"key":{"kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"AKCRTQAjSsaDshtMFdW-2Ie9yVnC5Xr1Suc06PAHINd10nXkVSB-N4TO62ClCkZV3XKnqU0nHo7o95WaZpym53W_DiO62umRtFKdl4UotL2QUh0y3SZWeWuoK2u_x2aMj17rUFN0f9GZMZ0pqEQNCPRBLVJ_-TEe2nGCWSC0exxGsRqz6R1zFkB-icfzQPe4WjQELOUXQ7J9RxhAPTTHtDivYYG-BeTRHrmF04JT1_6b9T_C8bAC0i0teT-nmlBLarQtBJKATXBx1yegbPOoiTqlQrFQP4MrKWNxtnB9Tcbjcvj-Z9je0ckI_eRc4DvAhqcUh_p15Dqg4GeaoNIO_jU","e":"AQAB","d":"Ynx9JGaBSP4iUsf6ZJ6opantRNdcdmzaQrKbZg6ZQE8Ohi1FYabJWvaoPSE-CiJEsDzShXZHMhUHN4X7Bn8BXaGQhK3p9HXgiwQKmix7oAJTu4ElUIyd8UC3UWHSZr40el4PaQD-HYu_eMzCXus34MnRiNbh_BUWm6T-Eidhk9d3kNIyaSi9YNDQHW6tjWrEhhq63O7JU1j9ZonFChZxpKk20jdkQKQURVAdpOdL-5j4I70ZxFuU6wHZj8DS8oRQfwGOvZKbgYDb5jgf3UNL_7eACqq92XPVX56vm7iKbqeyjCqAIx5y3hrSRIJtZlWCwjYnYQGd4unxDLi8wmJWSQ","dp":"AMmhWb5yZcu6vJr8xJZ-t0_likxJRUMZAtEULaWZt2DgODj4y9JrZDJP6mvckzhQP0WXk2NuWbU2HR5pUeCN2wieG1B76VKoH76vfnaJDqT1NuJVBcP2SLHog3ffwZtMME5zjfygchG3kihqOSpwTQ9ETAqAJTkRC38fEhwAz_Cp","dq":"AKC9TAo9n2RDaggjdLXK8kiLrBVoaWFTpqXkzYXRhtsx4vWPAkxhfSnze05rVMl6HiXv7FnE0f0wYawzUJzoyuXBH0zS6D9BqCZPeF543AmWB27iPf38Q9Z8Rjr6oBgMSnGDV_mm8nDVQkeaDyE4cOZh-5UKvKShTKKQVwunmDNH","qi":"AJ_nrkLpK8BPzVeARkvSHQyKwMWZ-a8CD95qsKfn0dOZAvXY-2xhQYTEwbED-0bpTNEKbIpA-ZkaHygmnzJkNbbFAnb9pkkzU8ZQqDP3JNgMfVIroWx58Oth9nJza2j7i-MkPRCUPEq3Ao0J52z7WJIiLji8TTVYW_NaiM1oxzsH","p":"ANHerI1o3dLB_VLVmZZVss8VZSYN5SaeQ_0qhfOSgOFwj__waCFmy2EG7l6l6f_Z-Y0L7Mn_LNov68lyWSFa2EuQUeVj4UoFHc5Di8ZUGiSsTwFM-XMtNuv8HmGgDYLL5BIJD3eTz71LdgW-Ez38OZH34b7VeG8zfeUDb8Hi30zz","q":"AMPcZrZBqbc82DO8Q5zTT8ZXRGWrW36KktMllaIk1W2RHnRiQiW0jBWmcCgqUcQNHa1LwumjyNqwx28QBS37BTvG7ULGUoio6LrOeoiBGEMj-U19sX6m37plEhj5Mak7j3OPPY_T9rohjTW5aGGg9YSwq4jdz0RrmBX00ofYOjI3"}})
  .query(true)
  .reply(200, {"key":{"kid":"https://keyvault_name.vault.azure.net/keys/importKeyName-canimportakey-/12ec209e2f8b4ca98a2bccf4372e0bab","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"oJFNACNKxoOyG0wV1b7Yh73JWcLlevVK5zTo8Acg13XSdeRVIH43hM7rYKUKRlXdcqepTScejuj3lZpmnKbndb8OI7ra6ZG0Up2XhSi0vZBSHTLdJlZ5a6gra7_HZoyPXutQU3R_0ZkxnSmoRA0I9EEtUn_5MR7acYJZILR7HEaxGrPpHXMWQH6Jx_NA97haNAQs5RdDsn1HGEA9NMe0OK9hgb4F5NEeuYXTglPX_pv1P8LxsALSLS15P6eaUEtqtC0EkoBNcHHXJ6Bs86iJOqVCsVA_gyspY3G2cH1NxuNy-P5n2N7RyQj95FzgO8CGpxSH-nXkOqDgZ5qg0g7-NQ","e":"AQAB"},"attributes":{"enabled":true,"created":1618871546,"updated":1618871546,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90}}, [
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
  '3d6b6abe-981d-460f-9b29-3483d989ca43',
  'x-ms-request-id',
  'bb919bbf-dbe5-4b7a-8454-1f6d3d348dd9',
  'x-ms-keyvault-service-version',
  '1.2.236.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=20.94.195.230;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 19 Apr 2021 22:32:26 GMT',
  'Content-Length',
  '713'
]);

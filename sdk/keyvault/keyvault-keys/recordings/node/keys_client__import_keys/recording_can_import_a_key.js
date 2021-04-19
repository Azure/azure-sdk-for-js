let nock = require('nock');

module.exports.hash = "fbee07e4429b228ee9680d56fd32681e";

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
  'Bearer authorization="https://login.windows.net/azure_tenant_id", resource="https://vault.azure.net"',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  '21ddde69-404d-4b77-97de-f740816ef422',
  'x-ms-keyvault-service-version',
  '1.2.164.2',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 16 Feb 2021 18:15:05 GMT'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fvault.azure.net%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":86399,"ext_expires_in":86399,"access_token":"access_token"}, [
  'Cache-Control',
  'no-store, no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '1315',
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
  '1990b1a5-2ff7-4a65-a815-252d8e282b00',
  'x-ms-ests-server',
  '2.1.11496.6 - WUS2 ProdSlices',
  'Set-Cookie',
  'fpc=AlYh5w5_onJDnZLEqg70g4sA4qsDEQAAAIACvtcOAAAA; expires=Thu, 18-Mar-2021 18:15:06 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 16 Feb 2021 18:15:05 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .put('/keys/importKeyName-canimportakey-', {"key":{"kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"AKCRTQAjSsaDshtMFdW-2Ie9yVnC5Xr1Suc06PAHINd10nXkVSB-N4TO62ClCkZV3XKnqU0nHo7o95WaZpym53W_DiO62umRtFKdl4UotL2QUh0y3SZWeWuoK2u_x2aMj17rUFN0f9GZMZ0pqEQNCPRBLVJ_-TEe2nGCWSC0exxGsRqz6R1zFkB-icfzQPe4WjQELOUXQ7J9RxhAPTTHtDivYYG-BeTRHrmF04JT1_6b9T_C8bAC0i0teT-nmlBLarQtBJKATXBx1yegbPOoiTqlQrFQP4MrKWNxtnB9Tcbjcvj-Z9je0ckI_eRc4DvAhqcUh_p15Dqg4GeaoNIO_jU","e":"AQAB","d":"Ynx9JGaBSP4iUsf6ZJ6opantRNdcdmzaQrKbZg6ZQE8Ohi1FYabJWvaoPSE-CiJEsDzShXZHMhUHN4X7Bn8BXaGQhK3p9HXgiwQKmix7oAJTu4ElUIyd8UC3UWHSZr40el4PaQD-HYu_eMzCXus34MnRiNbh_BUWm6T-Eidhk9d3kNIyaSi9YNDQHW6tjWrEhhq63O7JU1j9ZonFChZxpKk20jdkQKQURVAdpOdL-5j4I70ZxFuU6wHZj8DS8oRQfwGOvZKbgYDb5jgf3UNL_7eACqq92XPVX56vm7iKbqeyjCqAIx5y3hrSRIJtZlWCwjYnYQGd4unxDLi8wmJWSQ","dp":"AMmhWb5yZcu6vJr8xJZ-t0_likxJRUMZAtEULaWZt2DgODj4y9JrZDJP6mvckzhQP0WXk2NuWbU2HR5pUeCN2wieG1B76VKoH76vfnaJDqT1NuJVBcP2SLHog3ffwZtMME5zjfygchG3kihqOSpwTQ9ETAqAJTkRC38fEhwAz_Cp","dq":"AKC9TAo9n2RDaggjdLXK8kiLrBVoaWFTpqXkzYXRhtsx4vWPAkxhfSnze05rVMl6HiXv7FnE0f0wYawzUJzoyuXBH0zS6D9BqCZPeF543AmWB27iPf38Q9Z8Rjr6oBgMSnGDV_mm8nDVQkeaDyE4cOZh-5UKvKShTKKQVwunmDNH","qi":"AJ_nrkLpK8BPzVeARkvSHQyKwMWZ-a8CD95qsKfn0dOZAvXY-2xhQYTEwbED-0bpTNEKbIpA-ZkaHygmnzJkNbbFAnb9pkkzU8ZQqDP3JNgMfVIroWx58Oth9nJza2j7i-MkPRCUPEq3Ao0J52z7WJIiLji8TTVYW_NaiM1oxzsH","p":"ANHerI1o3dLB_VLVmZZVss8VZSYN5SaeQ_0qhfOSgOFwj__waCFmy2EG7l6l6f_Z-Y0L7Mn_LNov68lyWSFa2EuQUeVj4UoFHc5Di8ZUGiSsTwFM-XMtNuv8HmGgDYLL5BIJD3eTz71LdgW-Ez38OZH34b7VeG8zfeUDb8Hi30zz","q":"AMPcZrZBqbc82DO8Q5zTT8ZXRGWrW36KktMllaIk1W2RHnRiQiW0jBWmcCgqUcQNHa1LwumjyNqwx28QBS37BTvG7ULGUoio6LrOeoiBGEMj-U19sX6m37plEhj5Mak7j3OPPY_T9rohjTW5aGGg9YSwq4jdz0RrmBX00ofYOjI3"}})
  .query(true)
  .reply(200, {"key":{"kid":"https://keyvault_name.vault.azure.net/keys/importKeyName-canimportakey-/b9e923786df4469fba7858c5245e37ac","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"oJFNACNKxoOyG0wV1b7Yh73JWcLlevVK5zTo8Acg13XSdeRVIH43hM7rYKUKRlXdcqepTScejuj3lZpmnKbndb8OI7ra6ZG0Up2XhSi0vZBSHTLdJlZ5a6gra7_HZoyPXutQU3R_0ZkxnSmoRA0I9EEtUn_5MR7acYJZILR7HEaxGrPpHXMWQH6Jx_NA97haNAQs5RdDsn1HGEA9NMe0OK9hgb4F5NEeuYXTglPX_pv1P8LxsALSLS15P6eaUEtqtC0EkoBNcHHXJ6Bs86iJOqVCsVA_gyspY3G2cH1NxuNy-P5n2N7RyQj95FzgO8CGpxSH-nXkOqDgZ5qg0g7-NQ","e":"AQAB"},"attributes":{"enabled":true,"created":1613499306,"updated":1613499306,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7}}, [
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
  'x-ms-request-id',
  'af030754-e7b6-4ee8-bd7f-4072e4e545cd',
  'x-ms-keyvault-service-version',
  '1.2.164.2',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 16 Feb 2021 18:15:05 GMT',
  'Content-Length',
  '718'
]);

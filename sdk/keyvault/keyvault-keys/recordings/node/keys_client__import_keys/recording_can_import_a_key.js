let nock = require('nock');

module.exports.hash = "afc57d84e01560e4843326a13e4a5ebf";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .put('/keys/mergeKeyName-canimportakey-')
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
  'Server',
  'Microsoft-IIS/10.0',
  'WWW-Authenticate',
  'Bearer authorization="https://login.windows.net/azure_tenant_id", resource="https://vault.azure.net"',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'baf32ea3-ef31-4d37-b8fb-cc7b1d9c6798',
  'x-ms-keyvault-service-version',
  '1.1.0.897',
  'x-ms-keyvault-network-info',
  'addr=52.250.6.200;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 06 Mar 2020 22:29:17 GMT'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fvault.azure.net%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":3599,"ext_expires_in":3599,"access_token":"access_token"}, [
  'Cache-Control',
  'no-cache, no-store',
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
  'x-ms-request-id',
  '31c27aac-ddc6-4cc5-b694-c2771e471100',
  'x-ms-ests-server',
  '2.1.10155.16 - WST ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AjiRZXnnh0BBoHe-QucQrw0_aSJHAQAAAL7F9NUOAAAA; expires=Sun, 05-Apr-2020 22:29:18 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=prod; path=/; SameSite=None; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=ests; path=/; SameSite=None; secure; HttpOnly',
  'Date',
  'Fri, 06 Mar 2020 22:29:18 GMT',
  'Content-Length',
  '1231'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .put('/keys/mergeKeyName-canimportakey-', {"key":{"kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"AKCRTQAjSsaDshtMFdW-2Ie9yVnC5Xr1Suc06PAHINd10nXkVSB-N4TO62ClCkZV3XKnqU0nHo7o95WaZpym53W_DiO62umRtFKdl4UotL2QUh0y3SZWeWuoK2u_x2aMj17rUFN0f9GZMZ0pqEQNCPRBLVJ_-TEe2nGCWSC0exxGsRqz6R1zFkB-icfzQPe4WjQELOUXQ7J9RxhAPTTHtDivYYG-BeTRHrmF04JT1_6b9T_C8bAC0i0teT-nmlBLarQtBJKATXBx1yegbPOoiTqlQrFQP4MrKWNxtnB9Tcbjcvj-Z9je0ckI_eRc4DvAhqcUh_p15Dqg4GeaoNIO_jU","e":"AQAB","d":"Ynx9JGaBSP4iUsf6ZJ6opantRNdcdmzaQrKbZg6ZQE8Ohi1FYabJWvaoPSE-CiJEsDzShXZHMhUHN4X7Bn8BXaGQhK3p9HXgiwQKmix7oAJTu4ElUIyd8UC3UWHSZr40el4PaQD-HYu_eMzCXus34MnRiNbh_BUWm6T-Eidhk9d3kNIyaSi9YNDQHW6tjWrEhhq63O7JU1j9ZonFChZxpKk20jdkQKQURVAdpOdL-5j4I70ZxFuU6wHZj8DS8oRQfwGOvZKbgYDb5jgf3UNL_7eACqq92XPVX56vm7iKbqeyjCqAIx5y3hrSRIJtZlWCwjYnYQGd4unxDLi8wmJWSQ","dp":"AMmhWb5yZcu6vJr8xJZ-t0_likxJRUMZAtEULaWZt2DgODj4y9JrZDJP6mvckzhQP0WXk2NuWbU2HR5pUeCN2wieG1B76VKoH76vfnaJDqT1NuJVBcP2SLHog3ffwZtMME5zjfygchG3kihqOSpwTQ9ETAqAJTkRC38fEhwAz_Cp","dq":"AKC9TAo9n2RDaggjdLXK8kiLrBVoaWFTpqXkzYXRhtsx4vWPAkxhfSnze05rVMl6HiXv7FnE0f0wYawzUJzoyuXBH0zS6D9BqCZPeF543AmWB27iPf38Q9Z8Rjr6oBgMSnGDV_mm8nDVQkeaDyE4cOZh-5UKvKShTKKQVwunmDNH","qi":"AJ_nrkLpK8BPzVeARkvSHQyKwMWZ-a8CD95qsKfn0dOZAvXY-2xhQYTEwbED-0bpTNEKbIpA-ZkaHygmnzJkNbbFAnb9pkkzU8ZQqDP3JNgMfVIroWx58Oth9nJza2j7i-MkPRCUPEq3Ao0J52z7WJIiLji8TTVYW_NaiM1oxzsH","p":"ANHerI1o3dLB_VLVmZZVss8VZSYN5SaeQ_0qhfOSgOFwj__waCFmy2EG7l6l6f_Z-Y0L7Mn_LNov68lyWSFa2EuQUeVj4UoFHc5Di8ZUGiSsTwFM-XMtNuv8HmGgDYLL5BIJD3eTz71LdgW-Ez38OZH34b7VeG8zfeUDb8Hi30zz","q":"AMPcZrZBqbc82DO8Q5zTT8ZXRGWrW36KktMllaIk1W2RHnRiQiW0jBWmcCgqUcQNHa1LwumjyNqwx28QBS37BTvG7ULGUoio6LrOeoiBGEMj-U19sX6m37plEhj5Mak7j3OPPY_T9rohjTW5aGGg9YSwq4jdz0RrmBX00ofYOjI3"}})
  .query(true)
  .reply(200, {"key":{"kid":"https://keyvault_name.vault.azure.net/keys/mergeKeyName-canimportakey-/afd7f684958048e8969f8bb7b22e1f3d","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"AKCRTQAjSsaDshtMFdW-2Ie9yVnC5Xr1Suc06PAHINd10nXkVSB-N4TO62ClCkZV3XKnqU0nHo7o95WaZpym53W_DiO62umRtFKdl4UotL2QUh0y3SZWeWuoK2u_x2aMj17rUFN0f9GZMZ0pqEQNCPRBLVJ_-TEe2nGCWSC0exxGsRqz6R1zFkB-icfzQPe4WjQELOUXQ7J9RxhAPTTHtDivYYG-BeTRHrmF04JT1_6b9T_C8bAC0i0teT-nmlBLarQtBJKATXBx1yegbPOoiTqlQrFQP4MrKWNxtnB9Tcbjcvj-Z9je0ckI_eRc4DvAhqcUh_p15Dqg4GeaoNIO_jU","e":"AQAB"},"attributes":{"enabled":true,"created":1583533758,"updated":1583533758,"recoveryLevel":"Recoverable+Purgeable"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '4ba34493-4e6a-4535-9637-eb8e8570aca2',
  'x-ms-keyvault-service-version',
  '1.1.0.897',
  'x-ms-keyvault-network-info',
  'addr=52.250.6.200;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 06 Mar 2020 22:29:18 GMT',
  'Content-Length',
  '697'
]);
